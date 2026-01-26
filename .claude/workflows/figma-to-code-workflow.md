# Figma to Code Workflow

## Kích hoạt

Workflow này **TỰ ĐỘNG** được áp dụng khi:
- User cung cấp link Figma design
- User yêu cầu triển khai/implement giao diện từ Figma
- User đề cập "figma", "thiết kế", "design", "giao diện" kèm link hoặc node ID

---

## ⚡ ClaudeKit Commands (ƯU TIÊN SỬ DỤNG)

**QUAN TRỌNG:** Trong mỗi bước, ƯU TIÊN sử dụng ClaudeKit commands thay vì thực hiện thủ công.

| Bước | ClaudeKit Command | Mục đích |
|------|-------------------|----------|
| **Lên kế hoạch** | `/plan` hoặc `/plan:hard` | Tạo implementation plan chi tiết |
| **Implementation** | `/cook` hoặc `/code` | Thực hiện code theo plan |
| **Fix lỗi** | `/fix` hoặc `/debug` | Debug và sửa lỗi phát sinh |
| **Unit Testing** | `/test` | Chạy unit tests |
| **E2E Testing** | `/test:ui` | **BẮT BUỘC** - Chạy Playwright E2E tests |

**Quy trình tích hợp ClaudeKit:**

```
1. Phân tích Figma → Thu thập thông tin
   ↓
2. /plan → Tạo implementation plan
   ↓
3. /cook → Thực hiện code
   ↓
4. /test → Unit tests
   ↓
5. /test:ui → ⚠️ BẮT BUỘC: E2E tests với Playwright
   ↓
6. /fix (nếu cần) → Sửa lỗi
   ↓
7. Hoàn thành
```

**⚠️ CẢNH BÁO:** Không được báo "Hoàn thành" nếu chưa chạy `/test:ui` hoặc `npm run test:e2e`

---

## Xử lý Design Phức Tạp (Complex Designs)

Áp dụng khi thiết kế có: tia sáng, cầu vồng, floating elements, blur effects, animations phức tạp.

### Phân loại Elements

| Loại | Ví dụ | Cách xử lý |
|------|-------|------------|
| **Code-able** | Navbar, buttons, cards, text, forms | Code bằng Tailwind + Components |
| **Export as Image** | Tia sáng, cầu vồng, complex gradients | Export PNG/SVG từ Figma |
| **CSS Effects** | Blur, glow, shadows | CSS filters + backdrop-filter |
| **Floating Elements** | Dashboard previews | Absolute positioning + images |

### Quy trình cho Complex Design

```
1. Phân tích Figma → Tách layers
   ↓
2. Xác định: Code được vs Export image
   ↓
3. Export decorative elements (tia sáng, cầu vồng)
   → src/assets/images/[feature]/decorations/
   ↓
4. Code layout chính + import images
   ↓
5. Test TỪNG COMPONENT (không full page)
   ↓
6. Manual visual QA cho overall look
```

### Visual Testing cho Complex Design

```typescript
// Dùng tolerance cao hơn (10-15%)
test("hero section", async ({ page }) => {
    await expect(page.locator(".hero")).toHaveScreenshot("hero.png", {
        maxDiffPixelRatio: 0.15,  // 15% tolerance
        threshold: 0.3
    })
})

// Test từng component riêng
test("navbar", async ({ page }) => {
    await expect(page.locator("nav")).toHaveScreenshot("navbar.png")
})

test("feature cards", async ({ page }) => {
    await expect(page.locator(".feature-cards")).toHaveScreenshot("cards.png")
})
```

### Checklist cho Complex Design

- [ ] Tách layers: code-able vs export image
- [ ] Export decorative images (PNG/SVG)
- [ ] Code layout chính với Tailwind
- [ ] Import decorative images với absolute/relative positioning
- [ ] Test từng component riêng biệt
- [ ] Manual visual QA cho overall look
- [ ] Responsive: decorations ẩn hoặc scale trên mobile

---

## Quy trình 6 bước

### Bước 1: Đọc và Phân tích Thiết kế

**Hành động:**
1. Sử dụng MCP Figma tool để lấy design context:
   ```
   mcp__figma-remote-mcp__get_design_context(nodeId, fileKey)
   ```

2. Nếu cần screenshot để xem tổng quan:
   ```
   mcp__figma-remote-mcp__get_screenshot(nodeId, fileKey)
   ```

**Phân tích:**
- [ ] **Components detection**: Xác định UI patterns → map sang components có sẵn
- [ ] **Images/Icons detection**: Liệt kê tất cả assets cần export
- [ ] **Responsive analysis**: Phân tích layout cho mobile/tablet/desktop
- [ ] **Colors extraction**: Kiểm tra màu sắc có trong design system không
- [ ] **Typography**: Font sizes, weights, line heights

**Output Bước 1:**
```markdown
## Phân tích Figma Design

### Components phát hiện:
| Figma Element | Component áp dụng | Ghi chú |
|---------------|-------------------|---------|
| Input với icon mail | `<Input icon="mail-02" />` | |
| Button gradient | `<Button variant="primary" />` | |
| ... | ... | |

### Assets cần xử lý:
- Images: [danh sách]
- Icons: [danh sách - kiểm tra sprites.svg]

### Responsive Strategy:
- Mobile: [mô tả]
- Tablet: [mô tả]
- Desktop: [mô tả]
```

---

### Bước 2: Lên Kế hoạch

**⚡ ClaudeKit:** Sử dụng `/plan` hoặc `/plan:hard` để tạo implementation plan chi tiết.

**2.1 Component Mapping:**
- Đọc documentation của component trong `CLAUDE.md` hoặc demo files
- Xác định props cần sử dụng
- Nếu component chưa có → ghi nhận để tạo mới

**2.2 Assets Handling:**

**Images:**
```bash
# Cấu trúc thư mục
src/assets/images/
├── common/           # Shared images
├── [feature-name]/   # Feature-specific images
│   ├── image1.png
│   └── image2.svg
```

- Kiểm tra ảnh đã có trong `src/assets/images/[feature-name]/` chưa, nếu đã có thì sử dụng lại
- Nếu có ảnh từ Figma → export vào `src/assets/images/[feature-name]/`
- Nếu chưa có ảnh → tạo placeholder với kích thước tương ứng hoặc dùng comment

**Icons:**
```bash
# Kiểm tra icon trong sprites.svg
grep -i "id=\"icon-name\"" src/assets/icons/sprites.svg
```

- Nếu icon có trong `sprites.svg` → sử dụng `<Icon name="icon-name" />`
- Nếu chưa có → thêm icon vào `sprites.svg` theo format:
```xml
<symbol id="icon-name" viewBox="0 0 24 24" fill="none">
    <!-- SVG paths -->
</symbol>
```

**2.3 Responsive Layout Strategy:**

| Figma Value | Responsive Conversion |
|-------------|----------------------|
| `width: 638px` | `w-full max-w-[638px]` |
| `height: 920px` | `min-h-screen lg:h-[920px]` |
| `padding: 100px` | `p-6 sm:p-10 lg:p-[100px]` |
| `gap: 40px` | `gap-6 lg:gap-10` |
| Fixed position side-by-side | `flex-col lg:flex-row` |
| Element ẩn trên mobile | `hidden lg:block` |

**KHÔNG BAO GIỜ** copy trực tiếp số px cố định từ Figma!

**Output Bước 2:**
```markdown
## Kế hoạch Implementation

### File structure:
- `src/pages/[feature]/[Page].vue` - Main page
- `src/assets/images/[feature]/` - Images folder

### Components sử dụng:
1. `Input` - email, password fields
2. `Button` - primary, secondary variants
3. `Checkbox` - remember me
4. ...

### Icons cần thêm vào sprites.svg:
- [ ] icon-name-1
- [ ] icon-name-2

### Responsive breakpoints:
- Default (mobile): ...
- `sm:` (640px+): ...
- `lg:` (1024px+): ...
- `xl:` (1280px+): ...
```

---

### Bước 3: Implementation

**⚡ ClaudeKit:** Sử dụng `/cook` hoặc `/code` để thực hiện implementation theo plan.

**⚠️ Nguyên tắc Code (BẮT BUỘC):**

| Nguyên tắc | Mô tả |
|------------|-------|
| **Clean Code** | Tuân thủ DRY (Don't Repeat Yourself) và SOLID principles |
| **No Inline Styles** | CHỈ sử dụng Tailwind classes, KHÔNG dùng `style=""` |
| **Type Safety** | Luôn định nghĩa TypeScript Type cho mọi props, data, emits |
| **Performance** | Tối ưu render (v-memo, computed), lazy load images, optimize assets |

---

**Quy tắc chi tiết:**

1. **Styling - TailwindCSS ONLY:**
```vue
<!-- ✅ ĐÚNG -->
<div class="min-h-screen w-full bg-[#f2f2f4] flex items-center justify-center p-4">

<!-- ❌ SAI - không viết CSS riêng -->
<div class="auth-page">

<!-- ❌ SAI - không dùng inline style -->
<div style="padding: 20px;">
```

2. **Components - Sử dụng có sẵn:**
```vue
<script setup lang="ts">
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import { Icon } from "@/components/custom/icon"
</script>
```

3. **Type Safety - Định nghĩa types:**
```typescript
// ✅ ĐÚNG - Luôn define types
interface FormData {
    email: string
    password: string
    remember_me: boolean
}

const form_data = ref<FormData>({
    email: "",
    password: "",
    remember_me: false
})

// Props với types
interface Props {
    title: string
    items: Array<{ id: number; name: string }>
}
const props = defineProps<Props>()

// Emits với types
interface Emits {
    (e: "submit", data: FormData): void
    (e: "cancel"): void
}
const emit = defineEmits<Emits>()
```

4. **Images - Helper function pattern + Optimization:**
```typescript
import logo_img from "@/assets/images/[feature]/logo.svg"

const img = (name: string): string => {
    const images: Record<string, string> = {
        "logo.svg": logo_img,
    }
    return images[name] || ""
}

// Lazy load cho images lớn
<img :src="img('hero.png')" loading="lazy" alt="Hero" />
```

5. **Colors - CSS Variables:**
```vue
<!-- ✅ ĐÚNG -->
<div class="text-neutral-100 bg-primary">

<!-- ❌ SAI -->
<div class="text-[#1a2229] bg-[#269a85]">
```

6. **Responsive - Mobile first:**
```vue
<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
    <div class="w-full lg:w-1/2">...</div>
</div>
```

7. **DRY - Tránh lặp code:**
```vue
<!-- ❌ SAI - Lặp code -->
<Button variant="primary" class="w-full">Button 1</Button>
<Button variant="primary" class="w-full">Button 2</Button>
<Button variant="primary" class="w-full">Button 3</Button>

<!-- ✅ ĐÚNG - Dùng v-for -->
<Button
    v-for="btn in buttons"
    :key="btn.id"
    variant="primary"
    class="w-full"
>
    {{ btn.label }}
</Button>
```

8. **Performance - Optimize rendering:**
```vue
<!-- Dùng v-memo cho lists không thay đổi thường xuyên -->
<div v-for="item in items" :key="item.id" v-memo="[item.id, item.updated_at]">
    {{ item.name }}
</div>

<!-- Dùng computed thay vì methods trong template -->
<script setup lang="ts">
const filtered_items = computed(() =>
    items.value.filter(item => item.active)
)
</script>
```

---

### Bước 4: Testing & Verification (Kiểm chứng Thị giác)

**⚠️ BẮT BUỘC:** Sau khi implement xong, PHẢI thực hiện các bước sau:

```bash
# 1. Tạo E2E test file cho feature mới
# File: e2e/tests/[feature]/[page].spec.ts

# 2. Chạy E2E tests
npm run test:e2e:headed -- tests/[feature]/[page].spec.ts

# 3. Nếu tests fail → sửa code → chạy lại
```

**⚡ ClaudeKit:** Sử dụng `/test` để chạy unit tests, `/fix` hoặc `/debug` nếu phát hiện lỗi.

**4.1 Visual Regression Testing:**

Sử dụng **Vision capability** để so sánh ảnh chụp màn hình code với ảnh gốc Figma.

**Quy trình:**
1. Chụp screenshot từ code (Playwright hoặc Chrome DevTools)
2. Lấy screenshot từ Figma (`get_screenshot`)
3. So sánh visual bằng Vision capability
4. Xác định sai lệch

**Option A: Playwright E2E Tests (recommended)**

Sau khi implement UI từ Figma, **BẮT BUỘC** tạo E2E tests để verify.

**1. Tạo test file:**
```bash
# Tạo file test cho feature mới
e2e/tests/[feature]/[page].spec.ts
```

**2. Template test file:**
```typescript
// e2e/tests/[feature]/[page].spec.ts
import { test, expect } from "@playwright/test"
import { loginAsTestUser } from "../../fixtures/auth.fixture"

test.describe("[Feature Name]", () => {
    test.beforeEach(async ({ page }) => {
        // Login nếu cần
        await loginAsTestUser(page)
        await page.goto("/[route]")
    })

    // Visual regression test
    test("visual regression - mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await expect(page).toHaveScreenshot("[page]-mobile.png")
    })

    test("visual regression - desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await expect(page).toHaveScreenshot("[page]-desktop.png")
    })

    // Functional tests
    test("hiển thị đúng UI elements", async ({ page }) => {
        await expect(page.getByRole("heading")).toBeVisible()
        await expect(page.getByRole("button", { name: "Submit" })).toBeVisible()
    })

    test("form submission works", async ({ page }) => {
        await page.getByPlaceholder("Email").fill("test@example.com")
        await page.getByRole("button", { name: "Submit" }).click()
        await expect(page.getByText("Success")).toBeVisible()
    })
})
```

**3. Chạy tests:**
```bash
# Chạy test cụ thể
npm run test:e2e -- tests/[feature]/[page].spec.ts

# Chạy với UI mode để debug
npm run test:e2e:ui

# Update screenshots baseline
npm run test:e2e -- --update-snapshots
```

**4. Test checklist cho Figma implementation:**
| Test Type | Mô tả | Bắt buộc |
|-----------|-------|----------|
| Visual Mobile | Screenshot 375px | ✅ |
| Visual Desktop | Screenshot 1440px | ✅ |
| UI Elements | Verify components render | ✅ |
| Form Actions | Test inputs, buttons | ✅ nếu có form |
| Navigation | Test links, redirects | ✅ nếu có links |
| Responsive | Layout không vỡ | ✅ |

**Option B: Chrome DevTools MCP**
```
1. Chạy dev server: npm run dev
2. Capture screenshot qua Chrome MCP
3. So sánh với Figma design bằng Vision
```

---

**4.2 Verification Checklist (BẮT BUỘC):**

| Hạng mục | Kiểm tra | Pass/Fail |
|----------|----------|-----------|
| **Spacing** | Khoảng cách có đúng tỉ lệ với Figma không? | ☐ |
| **Colors** | Màu sắc có đúng Design Tokens không? | ☐ |
| **Console** | Console có lỗi hay cảnh báo nào không? | ☐ |
| **Responsive 375px** | Layout mobile có bị vỡ không? | ☐ |
| **Responsive 1440px** | Layout desktop có đúng không? | ☐ |
| **Typography** | Font size, weight, line-height đúng không? | ☐ |
| **Images** | Ảnh load đúng, không bị méo/vỡ? | ☐ |
| **Icons** | Icons hiển thị đúng, đúng màu? | ☐ |

**Breakpoint Testing (BẮT BUỘC test cả 2):**

```markdown
## Mobile (375px)
- [ ] Layout stack đúng
- [ ] Text không bị cắt
- [ ] Touch targets >= 44px
- [ ] Scroll hoạt động tốt

## Desktop (1440px)
- [ ] Layout matches Figma 1:1
- [ ] Spacing chính xác
- [ ] Không có whitespace thừa
```

---

**4.3 Self-Correction (Tự động sửa lỗi):**

⚠️ **NGUYÊN TẮC:** Nếu phát hiện sai lệch > 5%, **PHẢI TỰ ĐỘNG SỬA** trước khi bàn giao.

**Quy trình Self-Correction:**

```
1. Phát hiện sai lệch
   ↓
2. Xác định nguyên nhân (spacing? color? layout?)
   ↓
3. Brainstorm giải pháp
   ↓
4. Sửa code
   ↓
5. Test lại
   ↓
6. Lặp lại cho đến khi sai lệch < 5%
```

**Các lỗi thường gặp và cách sửa:**

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Spacing sai | Copy px cố định | Convert sang responsive classes |
| Màu không khớp | Hardcode hex | Dùng CSS variables |
| Layout vỡ mobile | Không test responsive | Thêm breakpoint classes |
| Text bị cắt | Container quá nhỏ | Dùng `truncate` hoặc tăng width |
| Image méo | Không giữ aspect ratio | Thêm `object-cover` hoặc `aspect-*` |

---

**4.4 Console Check:**

```bash
# Mở DevTools và kiểm tra:
# - Không có errors (red)
# - Không có warnings quan trọng (yellow)
# - Network requests thành công (200)
```

**Nếu có lỗi:**
- TypeScript error → Fix type definitions
- Vue warning → Fix component usage
- Network error → Check API/asset paths

---

### Bước 5: Hoàn thành

**Checklist cuối:**
- [ ] Code follows project conventions
- [ ] All components imported correctly
- [ ] Responsive works on all breakpoints
- [ ] No hardcoded colors (use CSS variables)
- [ ] No hardcoded dimensions (use responsive classes)
- [ ] Icons added to sprites.svg (if new)
- [ ] Images in correct folder
- [ ] No console errors
- [ ] Visual matches Figma design
- [ ] **E2E tests created** (`e2e/tests/[feature]/[page].spec.ts`)
- [ ] **E2E tests pass** (`npm run test:e2e`)

**Report format:**
```markdown
## ✅ Implementation Complete

### Files created/modified:
- `src/pages/[feature]/[Page].vue` - [description]
- `src/assets/images/[feature]/` - [X images]
- `src/assets/icons/sprites.svg` - [X icons added]

### Components used:
- Input, Button, Checkbox, Icon, ...

### Responsive:
- ✅ Mobile (default)
- ✅ Tablet (md:)
- ✅ Desktop (lg:, xl:)

### E2E Tests:
- `e2e/tests/[feature]/[page].spec.ts` - [X test cases]
- ✅ Visual regression (mobile + desktop)
- ✅ Functional tests pass

### Notes:
- [Any implementation notes]
```

---

## Quick Reference

### Component Detection Map

| Figma Element | Component | Import |
|---------------|-----------|--------|
| Text input | `<Input />` | `@/components/custom/input` |
| Password input | `<Input type="password" icon="square-lock-01" />` | `@/components/custom/input` |
| Email input | `<Input type="email" icon="mail-02" />` | `@/components/custom/input` |
| Primary button | `<Button variant="primary" />` | `@/components/custom/button` |
| Secondary button | `<Button variant="secondary" />` | `@/components/custom/button` |
| Checkbox | `<Checkbox />` | `@/components/custom/checkbox` |
| Dropdown | `<Dropdown />` | `@/components/custom/dropdown` |
| Modal/Popup | `<Popup />` | `@/components/custom/popup` |
| Drawer | `<Drawer />` | `@/components/custom/drawer` |
| Tabs | `<Tabs />` | `@/components/custom/tabs` |
| Table | `<Table />` | `@/components/custom/table` |
| Icon | `<Icon name="..." />` | `@/components/custom/icon` |
| Search | `<Search />` | `@/components/custom/search` |
| Loading | `<LoadDefault />` | `@/components/custom/loading` |
| Tooltip | `<Tooltip />` | `@/components/custom/tooltip` |
| Switch | `<Switch />` | `@/components/custom/switch` |
| DatePicker | `<DatePicker />` | `@/components/custom/datepicker` |
| Confirm dialog | `<Confirm />` | `@/components/custom/confirm` |
| Accordion | `<Accordion />` | `@/components/custom/accordion` |

### Icon Check Command
```bash
# Kiểm tra icon có trong sprites.svg
grep -i 'id="icon-name"' src/assets/icons/sprites.svg
```

### Sprites.svg Format
```xml
<symbol id="new-icon-name" viewBox="0 0 24 24" fill="none">
    <path d="..." fill="currentColor"/>
</symbol>
```
