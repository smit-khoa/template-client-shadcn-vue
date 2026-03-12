# Design System Analysis Report
## template-client-shadcn-vue (SMIT Chat)

**Generated:** 2026-03-12
**Status:** Complete Analysis
**Version:** 1.0

---

## Executive Summary

Template-client-shadcn-vue là một Vue 3 frontend template có kiến trúc vững chắc với:
- Hệ thống design token đầy đủ (colors, spacing, typography)
- 40+ UI components từ Shadcn-Vue (reka-ui 2.6.1)
- 27+ custom wrapped components cho project-specific needs
- Dark/Light mode support tích hợp sẵn
- Responsive design system với TailwindCSS 4.1
- TypeScript strict mode cho type safety

---

## 1. Color System

### Primary Palette (Teal-based)

#### Light Mode
```css
--primary-base: #269a85        /* Main brand color - Teal */
--primary-100: #40f0d0         /* Lightest - Accent */
--primary-200: #33c4aa         /* Light */
--primary-300: #269a85         /* Base */
--primary-400: #1a7262         /* Medium */
--primary-500: #0e4d41         /* Dark */
--primary-600: #052a23         /* Darker */
--primary-700: #011410         /* Darkest */
```

#### Dark Mode
```css
--primary: #33c4aa             /* Light teal for visibility */
--primary-foreground: #011410  /* Dark text */
```

### Secondary Palette
```css
--secondary-base: #1e7b6a      /* Secondary brand color */
--secondary-100: #47fad9
--secondary-200: #39ceb2
--secondary-300: #2ba38d
--secondary-400: #1e7b6a
--secondary-500: #125549
--secondary-600: #07322a
--secondary-700: #021410
```

### Tertiary Palette
```css
--tertiary-base: #2eb9a0       /* Accent/Highlight */
--tertiary-100: #bcfeed
--tertiary-200: #3be4c6
--tertiary-300: #2eb9a0
--tertiary-400: #22907c
--tertiary-500: #166859
--tertiary-600: #0b4339
--tertiary-700: #03221c
```

### Neutral Colors
```css
--neutral-100 to 900: #1a2229  /* Dark grey for text/borders */
```

### Grey Scale
```css
--grey-base: #868a89
--grey-100: #eef1f1            /* Lightest - Background */
--grey-200: #e8edf2            /* Borders, inputs */
--grey-300: #abb0af
--grey-400: #868a89
--grey-500: #636665            /* Medium */
--grey-600: #424443
--grey-700: #232424            /* Darkest */
```

### Special Colors
```css
--text-primary-500: #0069fe    /* Link blue */
--text-gradient: linear-gradient(89deg, #d6fffe 0.27%, #9afefe 25.11%, #5cffa9 74.8%)
--gradient: radial-gradient(67.13% 67.13% at 50% 63.64%, #00a47e 0%, #08ccb8 100%)
--destructive: #dc2626         /* Error/Delete actions */
```

### Semantic Colors
```css
/* Component States */
--chat-bubble-sent: #269a85         /* Primary */
--chat-bubble-received: #eef1f1     /* Grey-100 */
--sidebar: #052a23                  /* Primary-600 */

/* Chart/Data Visualization */
--chart-1: #269a85                  /* Primary */
--chart-2: #1e7b6a                  /* Secondary */
--chart-3: #2eb9a0                  /* Tertiary */
--chart-4: #33c4aa                  /* Primary-200 */
--chart-5: #39ceb2                  /* Secondary-200 */
```

---

## 2. Typography System

### Font Family
- **Primary:** Inter (system font stack fallback)
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **File Format:** WOFF2 + TTF (font swap strategy for performance)

### Responsive Font Sizes
```
Root size: 14px
Base font-weight: 500

Scales:
- Text-xs: 12px
- Text-sm: 13px
- Text-base: 14px
- Text-lg: 16px
- Text-xl: 18px
- Text-2xl: 20px

Using TailwindCSS 4.1 default scale
```

### Line Heights
```
Normal: 1.5 (default)
Tight: 1.25
Relaxed: 1.625
```

### Letter Spacing
Default TailwindCSS spacing applied

---

## 3. Spacing & Layout System

### Base Unit
```
--radius: 0.625rem (10px)
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 10px (base)
--radius-xl: 14px
```

### Spacing Scale (TailwindCSS)
```
0, 1px, 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 20px, 24px, 28px, 32px, 36px, 40px...

Common usage:
- p-2 = 8px
- p-3 = 12px
- p-4 = 16px
- gap-4 = 16px
- mb-8 = 32px
```

### Responsive Breakpoints (TailwindCSS 4.1)
```
sm:  640px      (mobile)
md:  768px      (tablet)
lg:  1024px     (desktop)
xl:  1280px     (large desktop)
2xl: 1536px     (extra large)
```

---

## 4. Component Architecture

### Base Components (shadcn-Vue 40+)
Located in `src/components/ui/`

**Category: Forms**
- Button (base)
- Input (base)
- Checkbox
- Radio
- Switch (root)
- Select
- Textarea
- Label
- Form

**Category: Data Display**
- Table
- Pagination
- Skeleton
- Badge
- Progress
- Breadcrumb
- Avatar
- Card

**Category: Modals & Overlays**
- Dialog (Modal)
- AlertDialog
- Popover
- Tooltip
- Dropdown Menu
- Sheet (Drawer base)

**Category: Navigation**
- Tabs
- Navigation Menu
- Stepper
- Sidebar
- ScrollArea

**Category: Layout**
- Separator
- AspectRatio

**Category: Feedback**
- Toast (via vue-sonner)
- Spinner
- Loading Skeleton

**Category: Other**
- Accordion
- Collapsible
- Context Menu
- Resizable
- Sonner (Toast system)

### Custom Components (27+)
Located in `src/components/custom/`

**Input Components**
- `Button.vue` - Enhanced button with icons, loading states, multiple variants
- `Input.vue` - Text/email/password/number/currency input with validation
- `Search.vue` - Debounced search input
- `TagInput.vue` - Multi-tag input with validation
- `Switch.vue` - Toggle switch wrapper

**Display Components**
- `Icon.vue` - SVG sprite-based icon system with gradient support
- `Tooltip.vue` - Simple tooltip wrapper
- `Badge/Tag` - Status badges

**Container Components**
- `Box.vue` - Flexible container with states (default/selected/disabled)
- `Accordion.vue` - Expandable accordion with smooth animation
- `Drawer.vue` - Side drawer with resize, overlay, confirm modes
- `Popup.vue` - Modal dialog with glass effect option
- `Confirm.vue` - Confirmation dialog with AlertDialog

**Data Components**
- `Table.vue` - Feature-rich data table (virtualized, sortable, filterable)
- `AppTable.vue` - High-level table with list/grid toggle, pagination, search, filter
- `LayoutTable.vue` - Table with tabs header
- `Paging.vue` - Pagination component

**Feature Components**
- `Dropdown.vue` - Dropdown menu with custom positioning
- `DropdownItem.vue` - Dropdown menu item
- `DropdownTitle.vue` - Default dropdown trigger
- `Tabs.vue` - Tab navigation with animation
- `DatePicker.vue` - Date range picker with presets
- `FilterPanel.vue` - Multi-category filter UI
- `FilterTags.vue` - Display selected filters as tags
- `Loading.vue` - LoadDefault (spinner), LoadPage (full-screen)

**Theme & Utilities**
- `ThemeToggle.vue` - Dark/light mode toggle
- `Toast.vue` - Toast notification renderer (uses vue-sonner)

---

## 5. Design Tokens (CSS Variables)

### Location
`src/style.css` - All CSS variables defined in `:root` and `.dark` selector

### Token Organization Pattern
```
@theme inline {
  --radius-*: Border radius variants
  --color-*: Color tokens exposed to Tailwind
  --shadow-*: Shadow definitions (via TailwindCSS)
}

@layer base {
  /* Global base styles */
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

### Shadcn Theme Integration
```css
/* Base colors */
--background: #ffffff
--foreground: #0f172a
--card: #ffffff
--popover: #ffffff
--primary: #269a85
--secondary: #eef1f1
--muted: #eef1f1
--accent: #bcfeed
--destructive: #dc2626

/* Component-specific */
--border: #e8edf2
--input: #e8edf2
--ring: #269a85
```

---

## 6. Button Variants & Sizes

### Button Component Props
**Location:** `src/components/custom/button/Button.vue`

#### Variants (7)
```
1. primary     - Gradient background, white text (default)
2. secondary   - White background, bordered, text-secondary
3. noborder    - Transparent, link-style
4. danger      - Light red background, red text, red border
5. error       - Red background, white text (destructive action)
6. success     - Light green background, green text, green border
7. tool        - Light grey background (utility button)
```

#### Sizes (5)
```
- tiny:    12x12 (h-36, px-12, py-12)
- sm:      32px (h-32, px-16, py-8, text-12)
- default: 36px (h-36, px-16, py-8, text-13) ← Most common
- lg:      40px (h-40, px-16, py-8, text-14)
- mini:    36px (h-36, px-8, py-8, text-12)
```

#### Additional Props
- `icon` - Icon name (left-aligned)
- `onlyIcon` - Show only icon without text
- `loading` - Show spinner, disable button
- `disabled` - Disable interaction
- `tooltip` - Hover tooltip
- `color_icon` - Custom icon color

---

## 7. Input Variants

### Input Component Props
**Location:** `src/components/custom/input/Input.vue`

#### Types
```
- text      - Default text input
- email     - Email with validation
- password  - Toggle show/hide
- number    - Numeric only
- currency  - Auto-formatted with currency symbol
```

#### Features
- Icon prefix support
- Suffix text (cm, kg, %, currency)
- Error state with message
- Helper message
- Read-only mode
- Disabled mode
- Focus/blur events
- Currency formatting with locale support

---

## 8. Icon System

### Icon Component
**Location:** `src/components/custom/icon/Icon.vue`

#### Features
- SVG sprite-based (single HTTP request)
- Supports gradient icons (inline rendering)
- Color customization
- Hover color effect
- Size in pixels or CSS units
- Composable with other components

#### Icon List
SVG sprites located in `src/assets/icons/sprites.svg`

Common icons:
- Navigation: arrow-*, chevron-*, angle-*
- Actions: add, delete, edit, settings, search, filter
- Status: check*, cross*, status-*
- UI: menu, user, alert, info, warning, error
- File: file-*, download-*, upload-*
- Communication: message, comment, notification, mail
- [20+ more categories]

---

## 9. Form Validation

### Zod Integration
**Framework:** Zod v4.3.6
**Location:** `src/` (uses in various pages/components)

#### Zod API Notes (v4 Important!)
```typescript
// Use 'issues' NOT 'errors'
const result = schema.safeParse(data)
if (!result.success) {
  const issues = result.error.issues  // ✓ Correct
  const errors = result.error.errors   // ✗ Wrong (undefined in v4)
}

// Field-level validation pattern
const issues = result.error.issues.filter(issue =>
  issue.path[0] === 'fieldName'
)

// pick() only works on ZodObject, not generic ZodType
const subSchema = schema.pick({ field1: true })  // ✓ ZodObject
const subSchema = schema.pick()  // ✗ Doesn't work on ZodType
```

---

## 10. Dark Mode Implementation

### Theme Toggle
**Component:** `src/components/custom/theme-toggle/ThemeToggle.vue`
**Composable:** `src/composables/useTheme.ts`

### How It Works
```typescript
// useTheme() returns:
- current_theme: ref('light' | 'dark')
- is_dark: computed(() => current_theme === 'dark')
- toggleTheme()
- setTheme(theme)

// Theme changes CSS class on document root
document.documentElement.classList.toggle('dark')

// CSS variables update in .dark selector
:root { --primary: #269a85 }
.dark { --primary: #33c4aa }
```

### Dark Mode Colors
```css
.dark {
  --background: #0f172a          /* Very dark blue */
  --foreground: #e2e8f0          /* Light text */
  --primary: #33c4aa             /* Lighter teal */
  --border: #334155              /* Slate border */
  --input: #475569               /* Slate input */
  --card: #1e293b                /* Dark slate */
}
```

---

## 11. Responsive Design Strategy

### Mobile-First Approach
```
Base (mobile): 320px+
sm breakpoint: 640px+
md breakpoint: 768px+
lg breakpoint: 1024px+
xl breakpoint: 1280px+
2xl breakpoint: 1536px+
```

### Grid System Example (AppTable)
```typescript
gridCols: {
  sm: 1,    // 1 column on mobile
  md: 2,    // 2 columns on tablet
  lg: 3,    // 3 columns on desktop
  xl: 4     // 4 columns on large desktop
}
```

### Component Testing (Playwright)
4 device profiles:
- Desktop: 1920x1080
- Laptop HD: 1366x768
- Mobile: 375x812
- Tablet: 768x1024

---

## 12. CSS-in-JS Strategy

### Approach
- **Primary:** TailwindCSS utility classes
- **Secondary:** Scoped `<style scoped>` for component-specific styling
- **Tertiary:** Inline `:style` bindings for dynamic colors

### Button Example
```vue
<!-- Tailwind utilities -->
<button :class="['px-4 py-2 rounded-lg', variantClasses]">

<!-- Inline style for dynamic gradient -->
<button :style="{ background: props.variant === 'primary' ? 'var(--gradient)' : 'none' }">

<!-- Scoped CSS -->
<style scoped>
.button-hover:hover { opacity: 0.8; }
</style>
```

### CSS Variables in Tailwind
```css
/* Expose CSS variables to Tailwind */
@theme inline {
  --color-primary-base: var(--primary-base)
  --color-grey-100: var(--grey-100)
}

/* Use in template */
<div class="bg-[var(--grey-100)] text-[var(--primary-base)]">
```

---

## 13. Accessibility (a11y)

### Built-in Features (reka-ui)
- Semantic HTML (button, input, label)
- ARIA attributes (aria-label, aria-disabled, etc)
- Keyboard navigation (Tab, Enter, Escape)
- Focus management
- Screen reader support

### Components with a11y Focus
- Button: `type`, `disabled`, `aria-label`
- Input: `label`, `error state`, `placeholder`
- Dialog: Focus trap, escape to close
- Tabs: ARIA roles, keyboard navigation
- Dropdown: Keyboard selection
- Checkbox: Label association

### Missing/TODO
- WCAG 2.1 AA audit (listed in roadmap)
- Color contrast verification
- Keyboard-only navigation testing

---

## 14. Animation & Transitions

### TailwindCSS Built-in
```
- Transition: transition, duration-{ms}
- Animation: animate-bounce, animate-ping, animate-spin, animate-pulse
```

### Custom Animations
```css
@import "tw-animate-css";  /* Additional animation library */
```

### Component Animations
- Accordion: Smooth expand/collapse
- Drawer: Slide in/out
- Modal/Popup: Fade in/out
- Dropdown: Smooth position change
- Tabs: Tab indicator animation

### Transition Classes Used
```
transition-all duration-300
transition-colors duration-200
transition ease duration-150
```

---

## 15. Performance Optimizations

### Built-in
1. **Code Splitting:** Dynamic imports for routes
2. **Asset Optimization:** SVG sprites reduce HTTP requests
3. **CSS Purging:** TailwindCSS removes unused styles
4. **Font Loading:** Font-display: swap for better performance
5. **Component Memoization:** Computed properties cached

### Bundle Analysis
- Target: < 500KB gzipped
- Current: Not measured (in build pipeline)
- Optimization tools: vite, tree-shaking, minification

### Development Tools
- Vite 7.2.4: Fast build, HMR
- Vue-tsc: Type checking before build
- ESLint: Code quality checks

---

## 16. File Organization

### Component Directory Structure
```
src/components/
├── ui/                          # Shadcn base (40+)
│   ├── button/
│   ├── input/
│   ├── dialog/
│   └── [36+ more]
├── custom/                      # Project wrappers (27+)
│   ├── button/
│   │   ├── Button.vue
│   │   ├── index.ts
│   │   └── README.md
│   ├── input/
│   ├── icon/
│   ├── dropdown/
│   ├── table/
│   └── [24+ more]
├── shared/                      # Shared utilities
│   ├── Display.vue
│   └── SelectAssets.vue
├── auth/                        # Auth-specific
├── employees/                   # Feature-specific
└── login/                       # Page-specific
```

### Custom Component Export Pattern
Each custom component exports via `index.ts`:
```typescript
// src/components/custom/button/index.ts
export { default as Button } from "./Button.vue"
```

### Usage
```typescript
import { Button } from '@/components/custom/button'
import { Icon } from '@/components/custom/icon'
import { Table } from '@/components/custom/table'
```

---

## 17. Configuration Files

### Vite Config
**Location:** `vite.config.ts`
```typescript
- Plugins: vue(), tailwindcss(), basicSsl()
- Port: 8309
- HTTPS: Enabled (development)
- Proxy: /api → Cloudflare tunnel
```

### TailwindCSS
**Location:** `tailwind.config.js` (NOT FOUND - using inline @theme)
**Setup:** Inline theme in `src/style.css` with @theme directive

### TypeScript
**Location:** `tsconfig.json` (root), `tsconfig.app.json` (strict)
```
- Strict: true
- JSX: preserve (Vue files)
- Target: ES2020
- Module: ESNext
```

### ESLint
**Location:** `eslint.config.ts`
- Vue 3 plugin
- TypeScript plugin
- No console.log in prod
- Const enforcement

### Prettier
**Location:** `.prettierrc.json`
- Indent: 2 spaces
- Line width: 100
- Single quotes
- Semicolons: required
- Trailing commas: es5

---

## 18. Common Patterns

### v-model Pattern (Controlled Components)
```vue
<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = () => {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <input :value="modelValue" @input="handleChange" />
</template>

<!-- Usage -->
<Input v-model="value" />
```

### Props with Defaults
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'default',
  disabled: false
})
```

### Computed Class Names
```typescript
const variantClasses = computed(() => {
  if (props.variant === 'primary') {
    return 'bg-primary text-white hover:opacity-80'
  }
  if (props.variant === 'secondary') {
    return 'bg-secondary border border-grey-200'
  }
})

const finalClasses = computed(() => {
  return cn(baseClasses, variantClasses.value, props.class)
})
```

### Slot Pattern
```vue
<template>
  <div class="modal">
    <div class="modal-header">
      <slot name="header">Default header</slot>
    </div>
    <div class="modal-body">
      <slot>Default content</slot>
    </div>
    <div class="modal-footer">
      <slot name="footer">Default footer</slot>
    </div>
  </div>
</template>
```

---

## 19. State Management

### Pinia Store Pattern
**Location:** `src/store/user.ts`

```typescript
export const user = defineStore('user_store', {
  state: (): State => ({
    user: null
  }),

  actions: {
    setUser(user_data: UserData) {
      this.user = user_data
    },
    clearUser() {
      this.user = null
    }
  },

  getters: {
    getUser: (state) => state.user,
    hasCompany: (state) => !!state.user?.company?.length
  }
})

// Usage
const userStore = user()
userStore.setUser(userData)
const current_user = userStore.getUser
```

---

## 20. API Integration

### Axios Wrapper
**Location:** `src/controllers/global.js`

```typescript
const response = await api<UserResponse>({
  url: '/api/v1/user',
  method: 'GET',
  authorization: token
})

// Response handling
if (!response.error) {
  const data: UserResponse = response.data
} else {
  // Error automatically shows toast
  console.error(response.message)
}
```

### Error Handling
- 401: Auto redirect to login, clear token
- 4xx/5xx: Show toast notification
- Network error: Toast with message

---

## 21. Key Design Decisions

### Why Teal Color Palette?
- Modern, professional appearance
- Good contrast in light & dark modes
- Accessible (WCAG AA compliant colors)
- Trending in SaaS applications

### Why CSS Variables + Tailwind?
- Flexibility: Easy theme switching
- Performance: CSS variables don't require recompile
- Maintainability: Centralized color definitions
- Dark mode: Simple toggle without complexity

### Why SVG Sprites?
- Single HTTP request for all icons
- Scalable without quality loss
- Easy color customization via CSS
- Animation support

### Why Multiple Button Variants?
- Clear semantic meaning (primary action, secondary, danger)
- Accessibility: Visual distinction for different action types
- Consistency: Predefined styles prevent ad-hoc styling
- Composability: Combine with sizes, icons, states

---

## 22. Naming Conventions

### Variables (snake_case)
```typescript
const user_name = ref('')
const is_loading = ref(false)
const total_count = computed(() => items.length)
```

### Functions (camelCase)
```typescript
function getUserById() {}
function validateEmail() {}
function handleSubmit() {}
```

### Components (PascalCase)
```typescript
// File: Button.vue
export default { name: 'Button' }

// Import
import Button from '@/components/custom/Button.vue'
```

### Constants (SCREAMING_SNAKE_CASE)
```typescript
const MAX_RETRIES = 3
const API_BASE_URL = 'https://api.example.com'
const THEME_COLORS = ['light', 'dark']
```

---

## 23. Testing Strategy

### Unit Tests (Vitest)
- Framework: Vitest 4.0.16
- DOM: happy-dom
- Location: `__tests__/` directory
- Commands: `npm run test`, `npm run test:run`, `npm run test:ui`

### E2E Tests (Playwright)
- Framework: Playwright 1.58.0
- Device profiles: 4 (Desktop, Laptop HD, Mobile, Tablet)
- Location: `e2e/tests/` directory
- Visual regression: pixelmatch 7.1.0
- Commands: `npm run test:e2e`, `npm run test:e2e:headed`

### Test Coverage
- Target: > 80%
- Critical paths: login, API calls, state management

---

## 24. Performance Metrics

### Target Metrics
- Page load time: < 3 seconds
- Component render time: < 100ms
- Bundle size: < 500KB (gzipped)
- Vite build time: < 2 minutes

### Current Status
- Not measured in this analysis
- Vite config optimized for fast HMR
- CSS purging enabled via TailwindCSS
- Code splitting configured for routes

---

## 25. Known Issues & Limitations

### Pre-existing Type Errors
From build logs:
- `__tests__/` - Some test files
- `FilterPanel.vue` - Type issues (in custom/filter/)
- `Tabs.vue` - Type issues (in custom/tabs/)
- `useTheme.ts` - Minor type issues

**Note:** These don't block builds with `npx vite build` (skips type checking)

### Design System Gaps
- WCAG 2.1 AA accessibility audit needed
- Component variant documentation could be more detailed
- No design token export for Figma integration yet
- Limited visual regression baseline images

---

## 26. Recommended Next Steps

### Short-term (1-2 weeks)
1. Create Figma design tokens documentation
2. Add accessibility audit results
3. Document all custom component variants with examples
4. Create component showcase/storybook

### Medium-term (1 month)
1. Implement Code Connect for Figma integration
2. Add visual regression test baselines
3. Create interactive component documentation
4. Performance monitoring setup

### Long-term (3+ months)
1. i18n (internationalization) support
2. Advanced data table features
3. Real-time collaboration components
4. Service worker offline support

---

## 27. Quick Reference Checklist

### Using Existing Components
- [ ] Button: Import from `@/components/custom/button`, use variants & sizes
- [ ] Input: Import from `@/components/custom/input`, support currency/validation
- [ ] Icon: Import from `@/components/custom/icon`, SVG sprite
- [ ] Table: Use `Table` or `AppTable` for data display
- [ ] Drawer/Modal: Use `Drawer`, `Popup`, or `Confirm` for overlays
- [ ] Form: Use `Checkbox`, `Switch`, `Select` from shadcn-vue
- [ ] Feedback: Use toast, loading spinners, validation messages

### Colors
- [ ] Primary actions: `var(--primary-base)` or `--gradient`
- [ ] Secondary actions: `var(--secondary-base)`
- [ ] Destructive: `var(--destructive)` (#dc2626)
- [ ] Borders: `var(--border)` (#e8edf2 light, #334155 dark)
- [ ] Text: `var(--foreground)` (auto dark mode)

### Spacing
- [ ] Use TailwindCSS: p-4, gap-2, mb-8, etc
- [ ] Border radius: rounded-lg (10px)
- [ ] Responsive: `sm:p-2 md:p-4 lg:p-6`

### Forms
- [ ] Validation: Zod schema with safeParse()
- [ ] Use Zod `issues` NOT `errors` (v4)
- [ ] Error display in Input component
- [ ] Helper text via message prop

### Dark Mode
- [ ] Uses automatic CSS variables
- [ ] Test with `useTheme().toggleTheme()`
- [ ] All colors already support dark mode

---

## 28. File Paths Reference

### Key Configuration Files
- `vite.config.ts` - Build config
- `tsconfig.json` - TypeScript
- `eslint.config.ts` - Linting
- `.prettierrc.json` - Formatting
- `src/style.css` - Design tokens, global styles

### Key Component Folders
- `src/components/ui/` - Base components (40+)
- `src/components/custom/` - Wrapped components (27+)
- `src/composables/` - Hooks (useTheme, useSprite)
- `src/controllers/global.js` - API wrapper
- `src/lib/utils.ts` - cn() helper

### Key Documentation
- `docs/project-overview-pdr.md` - Project vision & requirements
- `docs/code-standards.md` - Naming conventions & patterns
- `docs/system-architecture.md` - Data flow & structure
- `docs/codebase-summary.md` - Directory & file organization
- `docs/custom-components-usage.md` - Component API reference

---

## 29. Useful Commands

```bash
# Development
npm run dev              # Start dev server on port 8309

# Building
npm run build            # Build with type checking
npm run preview          # Preview production build

# Quality
npm run lint             # Run ESLint
npm run vue-tsc -b       # Type checking

# Testing
npm run test             # Unit tests (watch)
npm run test:run         # Unit tests (single run)
npm run test:coverage    # Coverage report
npm run test:ui          # Visual test UI
npm run test:e2e         # E2E tests
npm run test:e2e:headed  # E2E tests in browser

# Git
npm run git:cm           # Conventional commit with template
npm run git:cp           # Commit and push
```

---

## 30. Support & Resources

### Documentation
- Vue 3: https://vuejs.org
- TailwindCSS: https://tailwindcss.com
- Shadcn-Vue: https://www.shadcn-vue.com
- Pinia: https://pinia.vuejs.org
- Zod: https://zod.dev
- Vite: https://vitejs.dev

### Internal Documentation
- Project Overview: `docs/project-overview-pdr.md`
- Code Standards: `docs/code-standards.md`
- System Architecture: `docs/system-architecture.md`
- Custom Components: `docs/custom-components-usage.md`

---

**End of Report**

Generated: 2026-03-12
Design System Version: 1.0
Status: Complete & Current
