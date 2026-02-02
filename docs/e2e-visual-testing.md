# E2E + Visual Testing Guide

> **Hướng dẫn test cả logic và visual regression với Playwright**

## 🎯 Tổng quan

Hệ thống E2E testing tích hợp sẵn visual regression testing để đảm bảo:
1. ✅ **Logic testing** - Components hoạt động đúng
2. ✅ **Visual testing** - Giao diện khớp 100% với Figma design
3. ✅ **Performance testing** - Metrics đạt chuẩn
4. ✅ **Accessibility testing** - Không có issues
5. ✅ **Responsive testing** - Hoạt động tốt trên mọi breakpoints

---

## 🏗️ Architecture

```
e2e/
├── utils/
│   ├── visual-testing.ts           # Visual comparison utilities
│   └── figma-test-helper.ts        # Figma testing framework
├── tests/
│   ├── login.spec.ts              # Basic tests
│   └── login-enhanced.spec.ts     # E2E + Visual tests
├── screenshots/
│   ├── baselines/                 # Figma screenshots (reference)
│   ├── current/                   # Generated code screenshots
│   └── diff/                      # Difference images
├── reports/
│   ├── html/                      # Playwright HTML reports
│   └── *.md                       # Markdown test reports
└── playwright.config.ts           # Playwright configuration
```

---

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install --save-dev pixelmatch pngjs @types/pixelmatch @types/pngjs
```

### 2. Chạy E2E tests

```bash
# Run all tests
npm run test:e2e

# Run with UI mode (visual debugging)
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/tests/login-enhanced.spec.ts

# Generate HTML report
npx playwright test --reporter=html
```

### 3. View test results

```bash
# Open HTML report
npx playwright show-report e2e/reports/html

# View screenshots
open e2e/screenshots/diff/[component]-diff.png
```

---

## 📝 Writing Tests

### Basic E2E Test

```typescript
import { test, expect } from '@playwright/test'

test('Login page works', async ({ page }) => {
  await page.goto('/login')

  // Test logic
  await expect(page.locator('h1')).toContainText('Login')
  await expect(page.locator('input[type="email"]')).toBeVisible()
  await expect(page.locator('button')).toBeEnabled()
})
```

### Enhanced Test với Figma Helper

```typescript
import { test } from '@playwright/test'
import { createFigmaTest } from '../utils/figma-test-helper'

const FIGMA_CONFIG = {
  figma_url: 'https://figma.com/design/...',
  figma_screenshot_url: 'https://figma.com/screenshot/...',
  page_route: '/login',
  test_name: 'login-page'
}

test('Login - Complete test', async ({ page }) => {
  await page.goto(FIGMA_CONFIG.page_route)

  const helper = createFigmaTest(page, FIGMA_CONFIG)

  const result = await helper.runFigmaTest({
    logic_tests: [
      // Test components
      async () => {
        await helper.testComponents([
          {
            selector: 'button.primary',
            name: 'Login Button',
            tests: {
              visible: true,
              enabled: true,
              clickable: true
            }
          }
        ])
      },

      // Test form
      async () => {
        await helper.testForm({
          inputs: [
            { selector: 'input[type="email"]', value: 'test@test.com' }
          ],
          submit_button: 'button[type="submit"]'
        })
      }
    ],
    visual_options: {
      threshold: 0.05,
      full_page: true
    }
  })

  expect(result.logic_passed).toBe(true)
  expect(result.visual_result?.similarity_score).toBeGreaterThanOrEqual(95)
})
```

---

## 🧪 Test Helpers API

### FigmaTestHelper

Main testing helper với tất cả utilities.

#### testComponent()

Test một component với các assertions.

```typescript
await helper.testComponent({
  selector: 'button.primary',
  name: 'Primary Button',
  tests: {
    visible: true,           // Must be visible
    enabled: true,           // Must be enabled
    text_contains: 'Submit', // Contains text
    clickable: true,         // Can be clicked
    has_hover_state: true,   // Has hover effect
    interaction: async (el) => {
      // Custom interaction
      await el.click()
      await page.waitForTimeout(200)
    }
  }
})
```

#### testComponents()

Test multiple components.

```typescript
await helper.testComponents([
  { selector: 'h1', name: 'Heading', tests: { visible: true } },
  { selector: 'input', name: 'Input', tests: { enabled: true } },
  { selector: 'button', name: 'Button', tests: { clickable: true } }
])
```

#### testForm()

Test form submission.

```typescript
await helper.testForm({
  inputs: [
    { selector: 'input[name="email"]', value: 'test@example.com' },
    { selector: 'input[name="password"]', value: 'password123' }
  ],
  submit_button: 'button[type="submit"]',
  on_submit: async () => {
    // Custom validation after submit
    await expect(page.locator('.success')).toBeVisible()
  }
})
```

#### testNavigation()

Test navigation links.

```typescript
await helper.testNavigation([
  { selector: 'a.nav-home', expected_url: '/home' },
  { selector: 'a.nav-about', expected_url: '/about' }
])
```

#### testResponsive()

Test responsive design.

```typescript
await helper.testResponsive([
  { width: 1920, height: 1080, name: 'Desktop FHD' },
  { width: 1366, height: 768, name: 'Desktop HD' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 375, height: 667, name: 'Mobile' }
])
```

#### testAccessibility()

Test basic accessibility.

```typescript
await helper.testAccessibility()
// Checks:
// - Images have alt text
// - Form inputs have labels
// - No console errors
```

#### testPerformance()

Measure performance metrics.

```typescript
const metrics = await helper.testPerformance()
// Returns: { fcp, lcp, cls }

expect(metrics.fcp).toBeLessThan(2000) // FCP < 2s
expect(metrics.lcp).toBeLessThan(4000) // LCP < 4s
```

#### runFigmaTest()

Complete test: Logic + Visual.

```typescript
const result = await helper.runFigmaTest({
  logic_tests: [
    // Array of test functions
  ],
  visual_options: {
    threshold: 0.05,        // 95% similarity
    full_page: true,
    mask_selectors: [       // Hide dynamic elements
      '.loading-spinner',
      '.timestamp'
    ]
  },
  skip_visual: false
})

// Returns:
// {
//   logic_passed: boolean
//   visual_result?: VisualTestResult
//   report: string
// }
```

---

## 🎨 Visual Testing API

### captureScreenshot()

Capture screenshot của page.

```typescript
import { captureScreenshot } from '../utils/visual-testing'

await captureScreenshot(page, 'output.png', {
  full_page: true,
  mask_selectors: ['.dynamic-element']
})
```

### compareScreenshots()

So sánh 2 screenshots.

```typescript
import { compareScreenshots } from '../utils/visual-testing'

const result = await compareScreenshots(
  'baseline.png',
  'current.png',
  'diff.png',
  { threshold: 0.05 }
)

// Returns:
// {
//   similarity_score: 97.8,  // percentage
//   passed: true,
//   diff_pixels: 2341,
//   total_pixels: 2073600,
//   diff_image_path: 'diff.png'
// }
```

### testVisualRegression()

Complete visual regression test.

```typescript
import { testVisualRegression } from '../utils/visual-testing'

const result = await testVisualRegression(
  page,
  'login-page',
  'baselines/login-figma.png',
  {
    threshold: 0.05,
    full_page: true
  }
)

expect(result.passed).toBe(true)
expect(result.similarity_score).toBeGreaterThanOrEqual(95)
```

---

## 📊 Test Reports

### Markdown Report

```markdown
# Test Report: login-page

**Status:** ✅ PASSED
**Test Date:** 2026-01-30T10:30:00Z
**Figma URL:** https://figma.com/design/...

## Logic Testing
- Status: ✅ Passed

## Visual Testing
- Similarity Score: **97.8%**
- Required: ≥ 95%
- Status: ✅ Passed
- Diff Pixels: 2,341 / 2,073,600

### Diff Image
![Visual Diff](e2e/screenshots/diff/login-page-diff.png)
```

### JSON Report

```json
{
  "test_name": "login-page",
  "timestamp": "2026-01-30T10:30:00Z",
  "logic": {
    "passed": true,
    "tests_run": 6,
    "tests_passed": 6
  },
  "visual": {
    "passed": true,
    "similarity_score": 97.8,
    "threshold": 95.0,
    "diff_pixels": 2341
  },
  "status": "PASSED"
}
```

---

## 🔧 Configuration

### Playwright Config

```typescript
// e2e/playwright.config.ts
export default defineConfig({
  use: {
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },
    viewport: { width: 1920, height: 1080 }
  },

  expect: {
    toMatchSnapshot: {
      threshold: 0.05,      // 95% similarity
      maxDiffPixels: 100
    }
  },

  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'mobile', use: devices['iPhone 14'] }
  ]
})
```

### Environment Variables

```bash
# Set Figma screenshot URL (auto-set trong workflow)
export FIGMA_SCREENSHOT_URL="https://figma.com/screenshot/..."

# Run tests
npm run test:e2e
```

---

## 🎯 Best Practices

### 1. Structure Tests Properly

```typescript
test.describe('Component Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
    await page.goto('/route')
  })

  test('Logic: Interactions', async ({ page }) => {
    // Test logic only
  })

  test('Visual: Screenshot comparison', async ({ page }) => {
    // Test visual only
  })

  test('Complete: Logic + Visual', async ({ page }) => {
    // Test both
  })
})
```

### 2. Use Descriptive Test Names

```typescript
✅ test('✅ Login form submits correctly')
✅ test('✅ Button has hover state')
✅ test('✅ Visual: Matches Figma design 95%+')

❌ test('test1')
❌ test('it works')
```

### 3. Mask Dynamic Elements

```typescript
await helper.runFigmaTest({
  visual_options: {
    mask_selectors: [
      '.timestamp',
      '.loading-spinner',
      '.animated-element',
      '[data-dynamic]'
    ]
  }
})
```

### 4. Test All Breakpoints

```typescript
const breakpoints = [
  { width: 1920, height: 1080, name: 'Desktop FHD' },
  { width: 1366, height: 768, name: 'Desktop HD' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 414, height: 896, name: 'Mobile Large' },
  { width: 375, height: 667, name: 'Mobile Medium' },
  { width: 320, height: 568, name: 'Mobile Small' }
]

await helper.testResponsive(breakpoints)
```

### 5. Handle Async Operations

```typescript
// Wait for network requests
await page.waitForLoadState('networkidle')

// Wait for specific element
await page.waitForSelector('.loaded-content')

// Wait for animations
await page.waitForTimeout(500)
```

---

## 🐛 Troubleshooting

### Issue: Visual test fails (< 95%)

**Causes:**
- Fonts not loaded
- Images not loaded
- Animations still running
- Viewport size mismatch

**Solutions:**
```typescript
// Wait for fonts
await page.waitForLoadState('networkidle')
await page.waitForTimeout(500)

// Disable animations
await page.addStyleTag({
  content: '* { animation: none !important; transition: none !important; }'
})

// Set exact viewport
await page.setViewportSize({ width: 1920, height: 1080 })
```

### Issue: Test flaky (sometimes pass, sometimes fail)

**Causes:**
- Network timing
- Animations
- Dynamic content

**Solutions:**
```typescript
// Increase wait times
await page.waitForLoadState('networkidle')
await page.waitForTimeout(1000)

// Mask dynamic elements
visual_options: {
  mask_selectors: ['.timestamp', '.loading']
}

// Retry failed tests
retries: 2  // In playwright.config.ts
```

### Issue: Screenshots dimensions mismatch

**Causes:**
- Viewport size different
- Scrollbars appearing

**Solutions:**
```typescript
// Set consistent viewport
await page.setViewportSize({ width: 1920, height: 1080 })

// Hide scrollbars
await page.addStyleTag({
  content: '::-webkit-scrollbar { display: none; }'
})
```

---

## 📈 Performance Budgets

Recommended limits:

```typescript
// Performance metrics
expect(metrics.fcp).toBeLessThan(2000)  // FCP < 2s
expect(metrics.lcp).toBeLessThan(4000)  // LCP < 4s
expect(metrics.cls).toBeLessThan(0.1)   // CLS < 0.1

// Visual similarity
expect(similarity).toBeGreaterThanOrEqual(95)  // >= 95%

// Accessibility
expect(missing_alt_texts).toBe(0)
expect(missing_labels).toBe(0)
```

---

## 🔗 Related Documentation

- [Playwright Official Docs](https://playwright.dev)
- [Visual Testing Guide](https://playwright.dev/docs/test-snapshots)
- [Figma-to-Code Workflow](./figma-to-code-workflow.md)
- [Component Library](./component-library.md)

---

## 📝 Example Workflow

```bash
# 1. Generate code từ Figma
/design:figma https://figma.com/design/...

# 2. AI auto-generates E2E test file
# → e2e/tests/login-page.spec.ts

# 3. Run tests
npm run test:e2e

# 4. Check results
npx playwright show-report

# 5. View visual diff (if failed)
open e2e/screenshots/diff/login-page-diff.png

# 6. Fix issues và re-run
npm run test:e2e

# 7. All pass → Done! ✅
```

---

**Last Updated:** 2026-01-30
**Version:** 1.0.0
