# Components & UI Architecture Analysis - SMIT Chat

**Dự án:** SMIT Chat - Unified Messaging Platform  
**Ngày:** 2026-01-27  
**Phiên bản:** 0.0.0 (MVP)

---

## Tóm tắt

Dự án sử dụng **4-layer component architecture** với:
- **26 custom components** (wrappers + utilities)
- **21 Shadcn/UI base components**  
- **Tailwind CSS + SCSS + CSS Variables** cho styling
- **Vue 3.5.24** + **Vue Router 4.6.4** + **Pinia 3.0.3**

---

## I. Cấu trúc Layers

```
┌─────────────────────────────────────────┐
│ Layer 1: Page Components                │
│ (src/pages/ - Home.vue)                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ Layer 2: Feature Components             │
│ (Layout, Navbar, UserSettings, etc)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ Layer 3: Custom Components              │
│ Input, Button, Dropdown, Drawer, Table  │
│ (src/components/custom/ - 26 files)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│ Layer 1: UI Base (Shadcn/UI)            │
│ Dialog, Input, Checkbox, Button, etc    │
│ (src/components/ui/ - 21 files)         │
└─────────────────────────────────────────┘
```

---

## II. Custom Components (26 total)

### A. Form Inputs (5 components)

| Component | Path | Mô tả | Props chính |
|-----------|------|-------|-------------|
| **Input** | `custom/input/Input.vue` | Multi-type input (text, email, password, currency) | modelValue, type, icon, disabled, error |
| **Search** | `custom/search/Search.vue` | Search input với debounce | modelValue, debounce, placeholder |
| **Checkbox** | `custom/checkbox/Checkbox.vue` | Checkbox + Radio buttons | modelValue, type, label, disabled |
| **TagInput** | `custom/tag-input/` | Tag input cho multiple values | modelValue |
| **Switch** | `custom/switch/` | Toggle switch | modelValue |

**Input Features:**
```vue
<!-- Currency formatting -->
<Input v-model="amount" type="currency" icon="coins" />
<!-- Output: 1.000.000 VND -->

<!-- Password with toggle -->
<Input v-model="password" type="password" icon="lock" />

<!-- Email validation -->
<Input v-model="email" type="email" icon="mail" error errorMessage="Invalid email" />
```

### B. Buttons & Actions (1 component)

| Component | Variants | Sizes |
|-----------|----------|-------|
| **Button** | primary, secondary, noborder, danger, error, success, tool | default, sm, lg, mini, tiny |

**Features:** loading state, icon support, tooltip, 7 variants

### C. Modals & Overlays (3 components)

| Component | Mô tả | Slots |
|-----------|-------|-------|
| **Popup** | Modal dialog | default, header-icon, header-title, footer |
| **Drawer** | Resizable side panel | header, content, footer |
| **Confirm** | Confirmation dialog | content, footer |

**Drawer Features:**
- Mouse-drag resizable width
- Glass effect overlay option
- Priority mode (prevent close)
- Smooth animations

### D. Data Display (4 components)

| Component | Mô tả |
|-----------|-------|
| **Table** | Data table (Table, LayoutTable, CustomColumn, Pagination) |
| **Tabs** | Tab navigation với animated indicator |
| **Accordion** | Expandable sections |
| **Box** | Container với state styling (default, selected, disabled) |

### E. Dropdowns & Menus (1 component)

**Dropdown**
- 8 positions: bottom, top, left, right, bottom-start, bottom-end, top-start, top-end
- Auto-width matching
- Custom trigger slot
- Child: DropdownItem, DropdownTitle

### F. Loading & Feedback (2 components)

| Component | Mô tả |
|-----------|-------|
| **LoadPage** | Animated "LOADING" text |
| **LoadDefault** | Default spinner |

### G. Utilities (5 components)

| Component | Mô tả |
|-----------|-------|
| **Icon** | SVG sprite/inline rendering, hover color, dynamic size |
| **Tooltip** | Hover tooltip wrapper |
| **Paging** | Pagination (Shadcn wrapper) |
| **Toast** | Vue Sonner notification provider |
| **ThemeToggle** | Dark/light theme toggle |

### H. Specialized (3 components)

| Component | Mô tả |
|-----------|-------|
| **DatePicker** | Date selection (DatePicker + CalendarGrid) |
| **Filter** | FilterPanel + FilterTags |
| **AppTable** | Advanced data table |
| **FanpageCard** | Social media card |

---

## III. Design Patterns

### 1. V-Model Components (8)
Input, Search, Checkbox, Tabs, Dropdown, Popup, Drawer, Confirm

```typescript
const value = ref("")
<Input v-model="value" />
```

### 2. Slot Patterns
- **Trigger slot:** Dropdown, Popup - custom trigger button
- **Content slot:** Popup, Drawer, Tooltip - main content area
- **Footer slot:** Popup, Drawer, Confirm - action buttons
- **Icon slot:** Dropdown, Popup - header icons

### 3. State-Based Styling
```typescript
// Input states: disabled, error, focused, hovered
// Dropdown: open, closed, disabled
// Box: default, selected, disabled
```

### 4. Event Patterns
```typescript
// Open/Close events
@open, @close - for Dropdown, Drawer, Popup, Confirm

// Value change events
@update:modelValue - for Input, Search, Checkbox, Tabs

// Custom events
@search (debounced) - Search component
@confirm - Confirm component
```

### 5. Composables
- `useSprite()` - Icon sprite loading
- `useTheme()` - Theme management (dark/light)
- `cn()` - Class name utility from clsx

---

## IV. Color System

**50+ CSS variables** defined in `src/style.css`

### Primary Palette
```css
--primary-base: #269a85
--primary-100: #40f0d0  /* lightest */
--primary-200: #33c4aa
--primary-300: #269a85
--primary-400: #1a7262
--primary-500: #0e4d41
--primary-600: #052a23
--primary-700: #011410  /* darkest */
```

### Status Colors
```css
--destructive: #dc2626   /* delete/error */
--success: #12b76a       /* success */
--warning: #fdb022       /* warning */
--error: #ff3a3a         /* error toast */
```

### Neutral/Text Colors
```css
--neutral-100: #1a2229  /* primary text */
--text-secondary: #7d91a6
--border: #e8edf2        /* borders */
```

### Usage
```vue
<!-- Using CSS variable via Tailwind -->
<div class="text-neutral-100 bg-primary border-border">
  Content
</div>

<!-- Using variable directly -->
<div style="color: var(--primary-base); border: 1px solid var(--border)">
  Content
</div>
```

---

## V. Styling Architecture

### Priority
1. **TailwindCSS** (primary) - utility classes in templates
2. **CSS Variables** - color tokens and design system
3. **SCSS** (secondary) - animations, shadows, dynamic styles

### Examples

```vue
<!-- ✅ Tailwind (PRIMARY) -->
<div class="w-full max-w-[638px] p-6 lg:p-10 bg-white rounded-lg">
  <h1 class="text-2xl font-bold text-neutral-100">Title</h1>
</div>

<!-- ✅ SCSS (only for complex styles) -->
<style lang="scss" scoped>
.glass_card {
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.03);
}
</style>

<!-- ✅ Responsive Design -->
<div class="flex flex-col lg:flex-row gap-4 lg:gap-8 p-6 lg:p-10">
  <!-- Content -->
</div>
```

---

## VI. Responsive Design

### Tailwind Breakpoints
```
default (mobile): 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Common Patterns
```vue
<!-- Full width with max-width -->
<div class="w-full max-w-[638px]">

<!-- Stack to row layout -->
<div class="flex flex-col lg:flex-row">

<!-- Hide on mobile -->
<div class="hidden lg:block">

<!-- Responsive spacing -->
<div class="p-6 sm:p-8 lg:p-10">

<!-- Responsive text sizes -->
<h1 class="text-lg sm:text-xl lg:text-2xl">
```

---

## VII. Key Features by Component

### Input
- Currency formatting (1,000,000₫)
- Password show/hide toggle
- Prefix icon
- State-based styling
- Error validation
- Cursor position preservation on format

### Button
- 7 variants (primary, secondary, noborder, danger, error, success, tool)
- 5 sizes (default, sm, lg, mini, tiny)
- Loading state
- Icon support (prefix)
- Tooltip on hover
- Disabled state

### Dropdown
- 8 positions (8 directions)
- Auto-width matching trigger width
- Custom trigger slot
- Collapse outside
- Smooth positioning
- Icon support

### Drawer
- Resizable width (mouse drag from edge)
- Glass effect overlay mode
- Priority mode (prevent outside close)
- Smooth animations
- Custom scrollbar
- Left/right positioning

### Popup
- Customizable layout
- Wrapper mode (glass effect)
- Header/Footer slots
- Glass background
- Smooth animations

### Tabs
- Animated light slide indicator
- Icon support
- Smooth transitions
- Keyboard accessible

### Icon
- SVG sprite rendering (efficient)
- Inline SVG for gradients
- Hover color support
- Dynamic sizing
- Smooth color transitions

---

## VIII. Main Layout Structure

**File:** `src/layout/index.vue`

Components:
- **Navbar** - Navigation sidebar
- **Header** - Top bar with route name, theme toggle, user dropdown
- **Main Content** - RouterView with page transitions
- **User Dropdown** - Profile, settings, logout
- **Logout Confirm** - Confirmation dialog
- **User Settings Popup** - Settings modal

**Features:**
- Page loading animation
- Route-based page transitions (scale + fade + blur)
- User menu with avatar
- Theme toggle
- Logout confirmation

---

## IX. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | snake_case | user_name, is_active, total_count |
| Functions | camelCase | getUserById, handleSubmit, calculateTotal |
| Classes | PascalCase | UserService, ButtonComponent, LoginPage |
| Constants | SCREAMING_SNAKE_CASE | MAX_RETRIES, API_BASE_URL |
| Components | PascalCase | Input, Button, UserCard, SearchBar |
| Events | camelCase | update:modelValue, @search, @confirm |
| CSS Classes | kebab-case | text-primary, bg-white, border-border |

---

## X. Component Hierarchy & Relationships

```
Input
  ├─ Icon (prefix icon)
  └─ ValidationMessage

Button
  ├─ Icon (optional)
  ├─ Spinner (loading)
  └─ Tooltip

Dropdown
  ├─ DropdownTitle (default trigger)
  ├─ DropdownMenu (Shadcn)
  │  └─ DropdownMenuContent
  │     └─ DropdownItem []

Popup
  ├─ Dialog (Shadcn)
  │  └─ DialogContent
  │     ├─ Header
  │     ├─ Content (scrollable)
  │     └─ Footer

Drawer
  ├─ Sheet (Shadcn)
  │  └─ SheetContent
  │     ├─ Header
  │     ├─ Content (resizable, scrollable)
  │     └─ Footer

Table
  ├─ LayoutTable (wrapper)
  ├─ Table (grid)
  ├─ Pagination (Shadcn wrapper)
  └─ CustomColumn

Toast
  └─ Toaster (vue-sonner)

Tabs
  └─ Radio inputs (hidden)

Icon
  ├─ SVG sprite (normal)
  └─ Inline SVG (gradients)
```

---

## XI. API Integration Pattern

**Centralized wrapper:** `src/controllers/global`

```typescript
import { api } from "@/controllers/global"

// GET
const users = await api({
  url: "/api/v1/users",
  method: "GET"
})

// POST with data
const response = await api({
  url: "/api/v1/login",
  method: "POST",
  data: { email, password }
})

// Features
- Auto Bearer token injection
- Auto toast error notifications
- Timezone header auto-detection
- TypeScript type safety
```

---

## XII. State Management (Pinia)

**Store:** `src/store/`

```typescript
import { user } from "@/store"

const user_store = user()

// Get user
const current_user = user_store.getUser

// Set user
user_store.setUser({ userName: "John", email: "john@example.com" })
```

---

## XIII. Asset Loading Pattern

**Image helper function** - Type-safe asset loading

```typescript
import logo_img from "@/assets/images/login/logo.svg"
import preview_img from "@/assets/images/login/app-preview.png"

const img = (name: string): string => {
  const images: Record<string, string> = {
    "logo.svg": logo_img,
    "app-preview.png": preview_img
  }
  return images[name] || ""
}

// Usage
<img :src="img('logo.svg')" alt="Logo" />
```

---

## XIV. Utility Functions

**From:** `src/common/`

```typescript
formatCurrency(1000000)        // "1.000.000₫"
formatDate({ date: new Date() })  // "03/01/2026"
formatNumber(1000000)          // "1.000.000"
image("logo.svg")              // Load image asset
copy("text")                   // Copy to clipboard
randomString(length)           // Generate random string
```

---

## XV. Composables

### useTheme
```typescript
import { useTheme } from "@/composables/useTheme"

const { initTheme } = useTheme()
initTheme() // Initialize theme from storage
```

### useSprite
```typescript
import { useSprite } from "@/composables/useSprite"

useSprite() // Auto-load icon sprites
```

---

## XVI. Summary Statistics

| Metric | Value |
|--------|-------|
| **Total Custom Components** | 26 |
| **Total UI Base Components** | 21 |
| **CSS Variables** | 50+ |
| **Color Palettes** | 4 (Primary, Secondary, Tertiary, Status) |
| **Button Variants** | 7 |
| **Button Sizes** | 5 |
| **Responsive Breakpoints** | 6 |
| **Main Layout File** | src/layout/index.vue |
| **Pages** | 1 (Home.vue) |
| **Composables** | 2+ |
| **Design Approach** | 4-layer component architecture |
| **Styling** | Tailwind + SCSS + CSS Variables |
| **Framework** | Vue 3.5.24 + Vue Router 4.6.4 + Pinia 3.0.3 |

---

## XVII. Quick Reference

### Import Patterns
```typescript
// Custom components
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import { Dropdown, DropdownItem } from "@/components/custom/dropdown"

// UI base components
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button as UIButton } from "@/components/ui/button"

// Utilities
import { api } from "@/controllers/global"
import { formatCurrency, formatDate, image } from "@/common"
import { user } from "@/store"
```

### Component Usage Examples
```vue
<!-- Input with currency -->
<Input v-model="amount" type="currency" icon="coins-01" placeholder="Nhập số tiền" />

<!-- Button with loading -->
<Button variant="primary" :loading="is_loading" @click="submit">
  Gửi
</Button>

<!-- Dropdown -->
<Dropdown v-model="is_open" position="bottom-end">
  <DropdownItem @click="edit">Edit</DropdownItem>
  <DropdownItem @click="delete">Delete</DropdownItem>
</Dropdown>

<!-- Popup dialog -->
<Popup v-model="show_popup" title="Xác nhận" width="400px">
  Bạn có chắc chắn?
  <template #footer>
    <Button variant="secondary" @click="show_popup = false">Hủy</Button>
    <Button variant="primary" @click="confirm">Xác nhận</Button>
  </template>
</Popup>

<!-- Search with debounce -->
<Search v-model="search_term" @search="handleSearch" debounce="300" />

<!-- Checkbox array mode -->
<Checkbox v-model="selected_items" :value="item.id" :label="item.name" />
```

---

## XVIII. Files Generated

**Analysis Report:** `COMPONENTS_ANALYSIS.json` (20KB)  
**Summary:** `COMPONENTS_SUMMARY.md` (this file)

---

**Generated:** 2026-01-27  
**Status:** Complete Analysis  
**Component Count:** 47 (26 custom + 21 base)
