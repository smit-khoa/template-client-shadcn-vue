# Design System - Quick Reference Card

**Project:** template-client-shadcn-vue (SMIT Chat)
**Last Updated:** 2026-03-12

---

## Colors At a Glance

| Name | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Primary | `#269a85` (Teal) | `#33c4aa` | Main brand, buttons, links |
| Secondary | `#1e7b6a` | `#39ceb2` | Secondary actions |
| Tertiary | `#2eb9a0` | `#0b4339` | Highlights, accents |
| Destructive | `#dc2626` | `#ef4444` | Delete, error actions |
| Border | `#e8edf2` | `#334155` | Lines, dividers |
| Background | `#ffffff` | `#0f172a` | Page/card backgrounds |
| Text | `#1a2229` | `#e2e8f0` | Primary text |

---

## Spacing Quick Lookup

```
p-2 = 8px    | p-4 = 16px   | p-6 = 24px   | p-8 = 32px
gap-1 = 4px  | gap-2 = 8px  | gap-3 = 12px | gap-4 = 16px
m-0 = 0px    | m-4 = 16px   | m-8 = 32px   | m-12 = 48px
```

---

## Typography

**Font:** Inter (system fallback)
**Base Size:** 14px
**Weights:** 400, 500 (default), 600, 700

| Use Case | Size | Weight | Example |
|----------|------|--------|---------|
| Page Title | 24px (text-2xl) | 700 | H1 headers |
| Section Title | 18px (text-lg) | 600 | Card titles |
| Normal Text | 14px (text-base) | 400 | Body text |
| Small Text | 12px (text-xs) | 500 | Labels, hints |

---

## Button Variants

| Variant | Use Case | Style |
|---------|----------|-------|
| `primary` | Main action | Gradient bg, white text |
| `secondary` | Secondary action | White bg, border |
| `danger` | Destructive warning | Light red bg, red text |
| `error` | Final confirm delete | Red bg, white text |
| `success` | Confirmation/approval | Light green bg, green text |
| `noborder` | Link-style action | Transparent, text color |
| `tool` | Utility button | Light grey bg |

## Button Sizes

| Size | Height | Font Size | Use Case |
|------|--------|-----------|----------|
| `tiny` | 36px | 13px | Compact toolbar |
| `sm` | 32px | 12px | Small inputs |
| `default` | 36px | 13px | Most common |
| `lg` | 40px | 14px | Primary CTAs |
| `mini` | 36px | 12px | Compact action |

---

## Input Types

| Type | Features | Example |
|------|----------|---------|
| `text` | Basic text input | Names, titles |
| `email` | Email validation | Email fields |
| `password` | Show/hide toggle | Password entry |
| `number` | Numeric only | Quantities, ages |
| `currency` | Auto-format with symbol | Prices, amounts |

---

## Responsive Breakpoints

```
sm:  640px   (mobile phones)
md:  768px   (tablets)
lg:  1024px  (desktops)
xl:  1280px  (large screens)
2xl: 1536px  (ultra-wide)
```

Example: `sm:w-full md:w-1/2 lg:w-1/3`

---

## Component Import Paths

```typescript
// Buttons
import { Button } from '@/components/custom/button'

// Inputs
import { Input, Search, TagInput } from '@/components/custom/input'
import { Checkbox, CheckboxBlock } from '@/components/custom/checkbox'
import { Switch } from '@/components/custom/switch'

// Icons
import { Icon } from '@/components/custom/icon'

// Dropdowns & Menus
import { Dropdown, DropdownItem, DropdownTitle } from '@/components/custom/dropdown'

// Tables
import { Table } from '@/components/custom/table'
import { AppTable } from '@/components/custom/app-table'

// Overlays
import { Drawer } from '@/components/custom/drawer'
import { Popup } from '@/components/custom/popup'
import { Confirm } from '@/components/custom/confirm'

// Data
import { DatePicker } from '@/components/custom/datepicker'
import { FilterPanel, FilterTags } from '@/components/custom/filter'
import { Tabs } from '@/components/custom/tabs'

// Feedback
import { Toast, toast } from '@/components/custom/toast'
import { Tooltip } from '@/components/custom/tooltip'
import { LoadDefault, LoadPage } from '@/components/custom/loading'

// Theme
import { ThemeToggle } from '@/components/custom/theme-toggle'
import { useTheme } from '@/composables/useTheme'
```

---

## Common CSS Classes

### Flexbox
```
flex items-center justify-between
flex-col gap-4
flex-1 (grow to fill)
```

### Sizing
```
w-full, w-1/2, w-1/3
h-screen, h-full
max-w-2xl
```

### Spacing
```
p-4 (padding all)
px-4 py-2 (sides, top/bottom)
gap-2 (between items)
mt-8, ml-4, etc
```

### Text
```
text-sm, text-lg
font-semibold, font-medium
text-center, text-right
truncate (ellipsis), line-clamp-3
```

### Colors
```
bg-primary, bg-secondary
text-foreground, text-muted-foreground
border border-border
rounded-lg
```

### States
```
hover:opacity-80
disabled:opacity-50
dark:bg-slate-800 (dark mode)
```

---

## Icon Names (Common)

```
Search icons:    search, search-add, search-remove
Add/Delete:      add, trash-01, delete-02
Edit:            edit-02, pencil, settings
Navigation:      arrow-left, arrow-right, chevron-down, menu
Status:          check, cross, alert, info, warning
User:            user, user-add, profile
File:            file-add, download-01, upload-01
Communication:   message, comment, mail-01
Time:            calendar-03, clock-01, alarm-clock
```

See `src/assets/icons/sprites.svg` for full list.

---

## Form Validation (Zod v4)

```typescript
import { z } from 'zod'

// Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18)
})

// Validate
const result = schema.safeParse(data)

// Check result (v4 IMPORTANT!)
if (!result.success) {
  // Use 'issues' not 'errors'
  result.error.issues.forEach(issue => {
    console.log(issue.path[0])  // field name
    console.log(issue.message)  // error message
  })
}

// Get field-specific errors
const emailErrors = result.error?.issues
  .filter(i => i.path[0] === 'email')
  .map(i => i.message)
```

---

## Dark Mode

### Check Current Theme
```typescript
import { useTheme } from '@/composables/useTheme'

const { current_theme, is_dark, toggleTheme } = useTheme()

const isDarkMode = is_dark.value  // computed true/false
toggleTheme()  // switch to other mode
```

### Theme Component
```vue
<template>
  <ThemeToggle />  <!-- Built-in toggle button -->
</template>
```

All colors automatically respect dark mode via CSS variables.

---

## State Management (Pinia)

```typescript
import { defineStore } from 'pinia'
import { user } from '@/store/user'

// In component:
const userStore = user()
const current_user = userStore.getUser
userStore.setUser(userData)
```

---

## API Calls

```typescript
import { api } from '@/controllers/global'

// Call API
const response = await api<UserResponse>({
  url: '/api/v1/user',
  method: 'GET',
  authorization: token  // optional
})

// Handle response
if (!response.error) {
  const data = response.data
} else {
  // Auto toast notification shown
  console.log(response.message)
}
```

---

## v-model Pattern

All controlled components use standard v-model:

```vue
<!-- Simple v-model -->
<Input v-model="email" />
<Checkbox v-model="agreed" />
<Switch v-model="darkMode" />

<!-- With event listener -->
<Input
  v-model="search"
  @focus="handleFocus"
  @blur="handleBlur"
/>

<!-- Disabled state -->
<Input v-model="value" :disabled="true" />

<!-- Error state -->
<Input
  v-model="email"
  :error="!isValid"
  errorMessage="Invalid email"
/>
```

---

## Slots Pattern

```vue
<Dropdown>
  <!-- Custom trigger -->
  <template #trigger>
    <Button icon="settings">Options</Button>
  </template>
  <!-- Menu items -->
  <DropdownItem value="Edit" @click="handleEdit" />
</Dropdown>

<Drawer>
  <template #header>Header Content</template>
  <template #content>Main Content</template>
  <template #footer>Buttons</template>
</Drawer>

<Table :data="data">
  <template #col-name="{ value }">
    <span class="font-bold">{{ value }}</span>
  </template>
</Table>
```

---

## Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build          # Type-checks + builds
npx vite build        # Skip type checking

# Preview
npm run preview

# Type checking only
npm run vue-tsc -b
```

---

## Common Pitfalls

1. **Zod v4:** Use `.error.issues` not `.error.errors`
2. **Button gradient:** Use `:style` binding for primary variant
3. **Icons:** Use `Icon` component with sprite, not `img` tags
4. **Dark mode:** Don't hardcode colors, use CSS variables
5. **Form validation:** Always use interfaces for props/events

---

## Performance Tips

1. Use dynamic imports for large components
2. Implement v-if for conditional rendering (not v-show unless necessary)
3. Use computed properties instead of methods in templates
4. Avoid inline functions in event handlers
5. Use `:key` in v-for loops

---

## Links

- Full Design System: `docs/DESIGN-SYSTEM-ANALYSIS.md`
- Code Standards: `docs/code-standards.md`
- Components Usage: `docs/custom-components-usage.md`
- Project Overview: `docs/project-overview-pdr.md`

---

**Quick Answer Cheatsheet** ✓
Keep this open while developing!
