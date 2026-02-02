# Component Library Reference

> **Thư viện components Vue 3 cho dự án - Shadcn/Vue + Custom Components**

## 🚨 QUAN TRỌNG: Component Priority

**LUÔN LUÔN sử dụng components từ `src/components/custom` TRƯỚC:**

```typescript
// ✅ Correct - Import từ custom
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Icon } from '@/components/custom/icon'

// ❌ Wrong - Không dùng UI nếu custom đã có
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
```

**Priority Matrix:**
```
1. Custom Components (@/components/custom)  ← ALWAYS FIRST
2. UI Components (@/components/ui)          ← Only if custom doesn't have
3. Create New Component                     ← Last resort
```

## 📚 Tổng quan

Dự án sử dụng 2 tầng components:
1. **Custom Components** - 26 folders (47 files) - **PRIORITY FIRST** ⭐
2. **UI Components** - 21 folders (94 files) - Shadcn primitives (only if needed)

**Total:** 141 component files

---

## 📖 Documentation Links

- **[Custom Components Usage Guide](./custom-components-usage.md)** - Complete usage guide với examples
- **[Design System](./design-system.md)** - Design tokens & styling guidelines
- **[Figma Workflow](./figma-to-code-workflow.md)** - Automation workflow

---

## 🎯 UI Components (Shadcn/Reka UI Primitives)

Location: `src/components/ui/`

### Button
**Path:** `src/components/ui/button/`
**Usage:**
```vue
<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="default" size="default">
    Click me
  </Button>
</template>
```

**Variants:** default, destructive, outline, secondary, ghost, link
**Sizes:** default, sm, lg, icon

---

### Input
**Path:** `src/components/ui/input/`
**Usage:**
```vue
<script setup>
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <Input
    v-model="value"
    type="text"
    placeholder="Enter text"
  />
</template>
```

---

### Checkbox
**Path:** `src/components/ui/checkbox/`
**Usage:**
```vue
<script setup>
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <Checkbox v-model:checked="checked" />
</template>
```

---

### Dialog
**Path:** `src/components/ui/dialog/`
**Usage:**
```vue
<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
```

---

### Dropdown Menu
**Path:** `src/components/ui/dropdown-menu/`
**Usage:**
```vue
<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem>Item 2</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

---

### Altri UI Components

**Available:**
- Accordion - Expandable sections
- Alert Dialog - Confirmation dialogs
- Drawer - Side panels
- Label - Form labels
- Pagination - Page navigation
- Scroll Area - Custom scrollbars
- Sheet - Off-canvas panel
- Skeleton - Loading placeholder
- Spinner - Loading indicator
- Stepper - Step progress
- Switch - Toggle control
- Tabs - Tab navigation
- Tags Input - Tag/chip input
- Tooltip - Hover info

---

## 🎨 Custom Components

Location: `src/components/custom/`

### Button (Custom)
**Path:** `src/components/custom/button/Button.vue`

**Key Features:**
- 7 variants (primary, secondary, noborder, danger, error, success, tool)
- 5 sizes (default, sm, lg, mini, tiny)
- Loading state
- Icon support (prefix/suffix)
- Tooltip integration
- Gradient support via CSS variables

**Props Interface:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'noborder' | 'danger' | 'error' | 'success' | 'tool'
  size?: 'default' | 'sm' | 'lg' | 'mini' | 'tiny'
  disabled?: boolean
  loading?: boolean
  only_icon?: boolean
  icon?: string
  icon_color?: string
  icon_hover_color?: string
  tooltip?: string
  tooltip_position?: 'top' | 'bottom' | 'left' | 'right'
}
```

**Usage:**
```vue
<script setup>
import { Button } from '@/components/custom/button'
</script>

<template>
  <!-- Primary button with loading -->
  <Button
    variant="primary"
    size="lg"
    :loading="is_loading"
    @click="handleClick"
  >
    Submit
  </Button>

  <!-- Icon-only button with tooltip -->
  <Button
    variant="tool"
    size="mini"
    only_icon
    icon="settings"
    tooltip="Settings"
  />

  <!-- Button with icon -->
  <Button
    variant="success"
    icon="check"
  >
    Confirm
  </Button>
</template>
```

**CSS Variables:**
```css
--button-gradient-from: #269a85
--button-gradient-to: #2eb9a0
--button-bg: var(--primary-base)
```

---

### Input (Custom)
**Path:** `src/components/custom/input/Input.vue`

**Key Features:**
- Multiple types (text, password, currency, normal)
- Icon prefix/suffix
- Currency formatting (VND)
- Password visibility toggle
- Error state
- Label support

**Props Interface:**
```typescript
interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'currency' | 'normal'
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  prefix_icon?: string
  suffix_icon?: string
  locale?: string  // Default: 'vi-VN'
}
```

**Usage:**
```vue
<script setup>
import { Input } from '@/components/custom/input'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const amount = ref(0)
</script>

<template>
  <!-- Text input with icon -->
  <Input
    v-model="email"
    type="text"
    label="Email"
    placeholder="Enter your email"
    prefix_icon="mail"
  />

  <!-- Password input -->
  <Input
    v-model="password"
    type="password"
    label="Password"
    placeholder="Enter password"
  />

  <!-- Currency input -->
  <Input
    v-model="amount"
    type="currency"
    label="Amount"
    locale="vi-VN"
  />

  <!-- Input with error -->
  <Input
    v-model="email"
    type="text"
    error="Email is required"
  />
</template>
```

---

### Table (LayoutTable)
**Path:** `src/components/custom/layout-table/LayoutTable.vue`

**⚠️ Most Complex Component:** 4137 lines!

**Key Features:**
- Frozen columns (left/right)
- Horizontal & vertical scrolling
- Custom column configuration
- Row selection (checkbox)
- Toolbar (refresh, filter, export, zoom)
- Pagination
- Group by rows
- Sorting
- Column width management

**Props Interface:**
```typescript
interface TableProps {
  columns: Array<ColumnConfig>
  data: Array<any>
  frozen_left?: number   // Number of left frozen columns
  frozen_right?: number  // Number of right frozen columns
  row_height?: number
  show_toolbar?: boolean
  show_pagination?: boolean
  selectable?: boolean   // Enable row selection
  sortable?: boolean
  page_size?: number
}

interface ColumnConfig {
  key: string
  label: string
  width?: number
  sortable?: boolean
  render?: (row: any) => VNode
}
```

**Usage:**
```vue
<script setup>
import { LayoutTable } from '@/components/custom/layout-table'
import { ref } from 'vue'

const columns = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'name', label: 'Name', width: 200 },
  { key: 'email', label: 'Email', width: 250 },
  { key: 'role', label: 'Role', width: 150 }
]

const data = ref([
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' }
])

const selected_rows = ref([])
</script>

<template>
  <LayoutTable
    :columns="columns"
    :data="data"
    :frozen_left="1"
    :row_height="48"
    show_toolbar
    show_pagination
    selectable
    v-model:selected="selected_rows"
  />
</template>
```

---

### Icon (Custom)
**Path:** `src/components/custom/icon/Icon.vue`

**Key Features:**
- SVG sprite-based rendering
- Gradient icon support
- Dynamic colors
- Hover colors
- Size customization

**Props Interface:**
```typescript
interface IconProps {
  name: string
  size?: number | string
  color?: string
  hover_color?: string
  gradient?: boolean
}
```

**Usage:**
```vue
<script setup>
import { Icon } from '@/components/custom/icon'
</script>

<template>
  <!-- Simple icon -->
  <Icon name="home" :size="24" />

  <!-- Icon with color -->
  <Icon
    name="user"
    color="var(--primary-base)"
  />

  <!-- Gradient icon -->
  <Icon
    name="star"
    :size="32"
    gradient
  />

  <!-- Icon with hover color -->
  <Icon
    name="settings"
    color="#666"
    hover_color="var(--primary-base)"
  />
</template>
```

**Available Icons:** 94 icons in `assets/icons/sprites.svg`

Common icons: home, user, settings, mail, phone, search, filter, download, upload, edit, delete, check, close, arrow-left, arrow-right, etc.

---

### Checkbox (Custom)
**Path:** `src/components/custom/checkbox/Checkbox.vue`

**Usage:**
```vue
<script setup>
import { Checkbox } from '@/components/custom/checkbox'
import { ref } from 'vue'

const agreed = ref(false)
</script>

<template>
  <Checkbox v-model="agreed">
    I agree to terms and conditions
  </Checkbox>
</template>
```

---

### Switch (Custom)
**Path:** `src/components/custom/switch/Switch.vue`

**Usage:**
```vue
<script setup>
import { Switch } from '@/components/custom/switch'
import { ref } from 'vue'

const is_enabled = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="is_enabled" />
    <span>Enable notifications</span>
  </div>
</template>
```

---

### Dropdown (Custom)
**Path:** `src/components/custom/dropdown/Dropdown.vue`

**Usage:**
```vue
<script setup>
import { Dropdown } from '@/components/custom/dropdown'
</script>

<template>
  <Dropdown>
    <template #trigger>
      <button>Open Menu</button>
    </template>

    <template #content>
      <div class="dropdown-menu">
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
      </div>
    </template>
  </Dropdown>
</template>
```

---

### Toast
**Path:** `src/components/custom/toast/Toast.vue`

**Usage via composable:**
```vue
<script setup>
import { toast } from 'vue-sonner'

function showSuccess() {
  toast.success('Operation successful!')
}

function showError() {
  toast.error('Something went wrong')
}

function showInfo() {
  toast.info('Information message')
}

function showWarning() {
  toast.warning('Warning message')
}
</script>

<template>
  <button @click="showSuccess">Show Success</button>
</template>
```

---

### Pagination (Custom)
**Path:** `src/components/custom/pagination/Pagination.vue`

**Props:**
```typescript
interface PaginationProps {
  total: number
  page_size: number
  current_page: number
}
```

**Usage:**
```vue
<script setup>
import { Pagination } from '@/components/custom/pagination'
import { ref } from 'vue'

const current_page = ref(1)
const page_size = 20
const total_items = 100
</script>

<template>
  <Pagination
    :total="total_items"
    :page_size="page_size"
    v-model:current_page="current_page"
  />
</template>
```

---

### Card Components

**Employee Card:**
```vue
<script setup>
import { EmployeeCard } from '@/components/custom/employee-card'
</script>

<template>
  <EmployeeCard
    :employee="{
      name: 'John Doe',
      role: 'Developer',
      avatar: '/path/to/avatar.jpg',
      email: 'john@example.com'
    }"
  />
</template>
```

---

## 🔍 Component Selection Guide

### When to use which component?

**Buttons:**
- Simple button → `@/components/ui/button`
- Button with variants/icons → `@/components/custom/button` ✅

**Inputs:**
- Basic text input → `@/components/ui/input`
- Input with icons/validation → `@/components/custom/input` ✅

**Data Display:**
- Simple table → HTML `<table>`
- Advanced table with features → `@/components/custom/layout-table` ✅

**Icons:**
- Always use → `@/components/custom/icon` ✅

**Form Controls:**
- Checkbox → `@/components/custom/checkbox`
- Switch → `@/components/custom/switch`

**Feedback:**
- Toast notifications → `vue-sonner` toast()
- Modal dialogs → `@/components/ui/dialog`
- Drawers → `@/components/ui/drawer`

---

## 📦 Import Patterns

**Named exports:**
```typescript
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Icon } from '@/components/custom/icon'
```

**Multiple components:**
```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
```

---

## 🎯 Component Reuse Priority

When implementing Figma designs:

1. **Check Custom Components first** (src/components/custom/)
   - More feature-rich
   - Project-specific styling

2. **Check UI Components** (src/components/ui/)
   - Unstyled primitives
   - Highly customizable

3. **Create New Component** only if:
   - No existing component matches (< 50% similarity)
   - Unique functionality required
   - Design significantly different

---

## 🧪 Component Testing

All components have test files in `src/__tests__/components/`

**Run tests:**
```bash
npm run test            # Watch mode
npm run test:run        # Single run
npm run test:coverage   # With coverage
```

---

## 📝 Creating New Components

**Guidelines:**
1. Follow naming conventions (PascalCase for file)
2. Create folder structure:
   ```
   src/components/custom/my-component/
   ├── MyComponent.vue
   └── index.ts
   ```
3. Use TypeScript for props
4. Use Composition API
5. Add tests
6. Update this documentation

**Template:**
```vue
<template>
  <div class="my-component">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style scoped>
.my-component {
  @apply flex items-center gap-2;
}
</style>
```

---

**Last Updated:** 2026-01-30
**Total Components:** 141 files (21 UI + 26 Custom folders)
