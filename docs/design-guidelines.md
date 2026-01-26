# Design Guidelines - SMIT Chat

Hướng dẫn toàn diện về hệ thống thiết kế, component patterns, và styling rules cho SMIT Chat.

---

## 1. Color System (CSS Variables)

### 1.1 Primary Palette (Brand Colors)

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--primary-base` | #269a85 | `text-primary`, `bg-primary` | Primary CTA, brand color |
| `--primary-100` | #40f0d0 | `text-primary-100`, `bg-primary-100` | Light hover state |
| `--primary-200` | #33c4aa | `text-primary-200`, `bg-primary-200` | Light background |
| `--primary-300` | #269a85 | `text-primary-300`, `bg-primary-300` | Medium shade |
| `--primary-400` | #1a7262 | `text-primary-400`, `bg-primary-400` | Dark hover |
| `--primary-500` | #0e4d41 | `text-primary-500`, `bg-primary-500` | Darker |
| `--primary-600` | #052a23 | `text-primary-600`, `bg-primary-600` | Darkest |
| `--primary-700` | #011410 | `text-primary-700`, `bg-primary-700` | Darkest variant |

**Usage:**
```vue
<!-- Primary button -->
<button class="bg-primary text-white">Primary</button>

<!-- Light background -->
<div class="bg-primary-100">Light background</div>

<!-- Hover state -->
<button class="bg-primary hover:bg-primary-600">Hover</button>
```

### 1.2 Secondary Palette

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--secondary-base` | #1e7b6a | `text-secondary`, `bg-secondary` | Secondary actions |
| `--secondary-100` | #47fad9 | - | Light variant |
| `--secondary-200` | #39ceb2 | - | Medium light |
| `--secondary-300` | #2ca09a | - | Medium |
| `--secondary-400` | #1f7282 | - | Dark |
| `--secondary-500` | #12446a | - | Darker |
| `--secondary-600` | #051652 | - | Darkest |
| `--secondary-700` | - | - | Reserved |

### 1.3 Tertiary Palette

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--tertiary-base` | #2eb9a0 | `text-tertiary`, `bg-tertiary` | Accent color |
| `--tertiary-100` | #bcfeed | - | Light |
| `--tertiary-200` | #95e8dd | - | Medium light |
| `--tertiary-300` | #6ee2cc | - | Medium |
| Continues... | ... | - | - |

### 1.4 Neutral & Text Colors

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--neutral-100` | #1a2229 | `text-neutral-100` | Main text color |
| `--white` | #fff | `text-white`, `bg-white` | White background |
| `--black` | #213547 | `text-black`, `bg-black` | Black (backup) |

### 1.5 Status & Semantic Colors

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--destructive` | #dc2626 | `bg-destructive`, `text-destructive` | Errors, delete, danger |
| `--success` | - | - | Success messages |
| `--warning` | - | - | Warning messages |
| `--info` | - | - | Info messages |

### 1.6 Grey Scale

| Variable | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| `--grey-100` | #eef1f1 | `bg-grey-100`, `text-grey-100` | Lightest background |
| `--grey-200` | #d2d8d6 | - | Light borders |
| `--grey-300` | #abb0af | - | Medium light |
| `--grey-400` | #868a89 | - | Medium |
| `--grey-500` | #636665 | - | Medium dark |
| `--grey-600` | #424443 | - | Dark |
| `--grey-700` | #232424 | - | Darkest grey |

### 1.7 CSS Variables Implementation

```css
/* File: src/style.css */
:root {
  /* Primary */
  --primary-base: #269a85;
  --primary-100: #40f0d0;
  --primary-200: #33c4aa;
  /* ... rest of colors ... */

  /* Semantic */
  --background: #ffffff;
  --foreground: #1a2229;
  --border: #d2d8d6;
}
```

### 1.8 Color Usage Rules

#### ✅ CORRECT - Use CSS Variables via Tailwind

```vue
<!-- Primary button -->
<button class="bg-primary text-white hover:bg-primary-600">Save</button>

<!-- Text color -->
<p class="text-neutral-100">Main text</p>

<!-- Error state -->
<div class="border border-destructive">Error field</div>

<!-- Light background -->
<div class="bg-grey-100">Card background</div>
```

#### ❌ INCORRECT - Hardcode colors

```vue
<!-- Wrong: Hardcoded hex -->
<button class="bg-[#269a85]">Bad</button>

<!-- Wrong: Inconsistent colors -->
<button class="bg-green-500">Wrong</button>

<!-- Wrong: Using arbitrary values -->
<div class="text-[#1a2229]">Bad</div>
```

---

## 2. Typography System

### 2.1 Font Stack

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 2.2 Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Labels, secondary text |
| Semi-bold | 600 | Subheadings, emphasis |
| Bold | 700 | Headings, titles |

### 2.3 Font Sizes & Line Heights

| Size | Tailwind | Usage |
|------|----------|-------|
| 12px | `text-xs` | Small captions, hints |
| 14px | `text-sm` | Body text, labels |
| 16px | `text-base` | Default body |
| 18px | `text-lg` | Subheadings |
| 20px | `text-xl` | Section titles |
| 24px | `text-2xl` | Page titles |
| 28px | `text-3xl` | Hero titles |
| 32px | `text-4xl` | Large titles |

### 2.4 Typography Patterns

```vue
<!-- Page Title -->
<h1 class="text-3xl lg:text-4xl font-bold text-neutral-100">Page Title</h1>

<!-- Section Heading -->
<h2 class="text-2xl font-semibold text-neutral-100 mt-8">Section</h2>

<!-- Body Text -->
<p class="text-base text-neutral-100 leading-relaxed">Paragraph content</p>

<!-- Small Caption -->
<span class="text-xs text-grey-500">Hint text</span>

<!-- Label -->
<label class="text-sm font-medium text-neutral-100">Field Label</label>
```

---

## 3. Spacing System

### 3.1 Spacing Scale

| Tailwind | Pixels | Usage |
|----------|--------|-------|
| `p-1` | 4px | Tiny spacing |
| `p-2` | 8px | Small padding |
| `p-3` | 12px | Button padding |
| `p-4` | 16px | Default padding |
| `p-6` | 24px | Card padding |
| `p-8` | 32px | Section padding |
| `p-10` | 40px | Large padding |
| `p-12` | 48px | Page padding |

### 3.2 Margin Scale

```vue
<!-- Consistent spacing -->
<div class="space-y-4">  <!-- 16px gap between children -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Horizontal gap -->
<div class="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

<!-- Custom margins -->
<h2 class="mt-8 mb-4">Title with spacing</h2>
```

---

## 4. Component Patterns

### 4.1 Button Component

**Props:**
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "noborder"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  icon?: string
}
```

**Usage:**

```vue
<!-- Primary button (CTA) -->
<Button variant="primary" @click="handleSave">Save Changes</Button>

<!-- Secondary button -->
<Button variant="secondary">Cancel</Button>

<!-- Danger button -->
<Button variant="danger" @click="handleDelete">Delete</Button>

<!-- Icon button -->
<Button variant="primary" icon="plus">Add New</Button>

<!-- Disabled state -->
<Button disabled>Unavailable</Button>

<!-- Loading state -->
<Button :loading="isLoading">Processing...</Button>

<!-- Size variants -->
<Button size="sm">Small</Button>
<Button size="default">Normal</Button>
<Button size="lg">Large</Button>
```

### 4.2 Input Component

**Props:**
```typescript
interface InputProps {
  modelValue: string | number
  type?: "text" | "email" | "password" | "number" | "currency"
  placeholder?: string
  icon?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
}
```

**Usage:**

```vue
<!-- Basic input -->
<Input v-model="username" placeholder="Username" />

<!-- With icon -->
<Input v-model="email" type="email" icon="mail-02" placeholder="Email" />

<!-- Password input (auto show/hide) -->
<Input v-model="password" type="password" icon="square-lock-01" placeholder="Password" />

<!-- Currency input -->
<Input v-model="amount" type="currency" placeholder="Amount" />

<!-- With validation error -->
<Input v-model="value" :error="!!error" :errorMessage="error" />

<!-- Disabled state -->
<Input v-model="value" disabled />
```

### 4.3 Checkbox Component

**Usage:**

```vue
<!-- Basic checkbox -->
<Checkbox v-model="is_checked" label="Remember me" />

<!-- Radio mode -->
<Checkbox v-model="selected" type="radio" value="option1" label="Option 1" />
<Checkbox v-model="selected" type="radio" value="option2" label="Option 2" />

<!-- Array mode (multiple select) -->
<Checkbox v-model="selected_items" :value="item.id" :label="item.name" />
```

### 4.4 Dropdown Component

**Usage:**

```vue
<Dropdown v-model="isOpen" title="Select Action" position="bottom-start">
  <DropdownItem value="1" @click="handleAction1">Action 1</DropdownItem>
  <DropdownItem value="2" icon="edit">Action 2</DropdownItem>
  <DropdownItem value="3" state="disabled">Disabled Action</DropdownItem>
</Dropdown>
```

### 4.5 Modal/Popup Component

**Usage:**

```vue
<Popup v-model="isOpen" title="Confirm Action" width="500px">
  <p>Are you sure you want to proceed?</p>

  <template #footer>
    <Button variant="secondary" @click="isOpen = false">Cancel</Button>
    <Button variant="primary" @click="handleConfirm">Confirm</Button>
  </template>
</Popup>
```

### 4.6 Table Component

**Usage:**

```vue
<LayoutTable
  :tabs="[{ key: 'all', title: 'All Items' }]"
  :tab-selected="activeTab"
  @change-tab="handleTabChange"
>
  <template #left>
    <h2>Items List</h2>
  </template>

  <template #right>
    <Button variant="primary" icon="plus">Add New</Button>
  </template>
</LayoutTable>
```

---

## 5. Responsive Design

### 5.1 Breakpoints

| Breakpoint | Min Width | Device | Tailwind |
|-----------|-----------|--------|----------|
| Base | 0px | Mobile | Default |
| `sm:` | 640px | Large phone | Tablet landscape |
| `md:` | 768px | Tablet | Small tablet |
| `lg:` | 1024px | Laptop | Desktop |
| `xl:` | 1280px | Desktop | Large desktop |
| `2xl:` | 1536px | Large screen | - |

### 5.2 Responsive Patterns

#### Pattern 1: Stack on Mobile, Row on Desktop

```vue
<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
  <div class="w-full lg:w-1/2">Left panel</div>
  <div class="w-full lg:w-1/2">Right panel</div>
</div>
```

#### Pattern 2: Hide on Mobile

```vue
<!-- Hidden on mobile, visible on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Visible on mobile, hidden on desktop -->
<div class="lg:hidden">Mobile only</div>
```

#### Pattern 3: Responsive Padding

```vue
<!-- Small padding on mobile, large on desktop -->
<div class="p-4 lg:p-8">Content</div>

<!-- Specific breakpoints -->
<div class="p-4 md:p-6 lg:p-8 xl:p-10">Content</div>
```

#### Pattern 4: Responsive Text Size

```vue
<!-- Larger text on desktop -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">Title</h1>

<!-- Font weight responsive -->
<p class="font-normal md:font-medium lg:font-semibold">Text</p>
```

#### Pattern 5: Responsive Grid

```vue
<!-- 1 column mobile, 2 columns tablet, 3 columns desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

---

## 6. Elevation & Shadows

### 6.1 Shadow Layers

| Level | CSS | Usage |
|-------|-----|-------|
| Shadow-sm | 0 1px 2px rgba(...) | Subtle, interactive elements |
| Shadow | 0 4px 6px rgba(...) | Cards, modals |
| Shadow-md | 0 10px 15px rgba(...) | Dropdown, tooltip |
| Shadow-lg | 0 20px 25px rgba(...) | Modal overlay |
| Shadow-xl | 0 25px 50px rgba(...) | Hero sections |

### 6.2 Usage

```vue
<!-- Card with standard shadow -->
<div class="bg-white rounded-lg shadow-md p-6">Card content</div>

<!-- Hoverable element -->
<div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
  Hover for elevation
</div>

<!-- Glass effect with custom shadow -->
<div class="backdrop-blur-md bg-white/80 shadow-lg rounded-lg">Glass card</div>
```

---

## 7. Rounded Corners

| Tailwind | Radius | Usage |
|----------|--------|-------|
| `rounded-sm` | 2px | Subtle corners |
| `rounded` | 4px | Buttons, small elements |
| `rounded-md` | 6px | Cards, inputs |
| `rounded-lg` | 8px | Larger cards |
| `rounded-xl` | 12px | Prominent cards |
| `rounded-2xl` | 16px | Hero sections |
| `rounded-full` | 9999px | Circles, avatars |

### Usage

```vue
<!-- Input with subtle rounding -->
<input class="rounded-md" />

<!-- Card with prominent rounding -->
<div class="rounded-lg bg-white p-6">Card</div>

<!-- Pill-shaped button -->
<button class="rounded-full px-6 py-2">Pill Button</button>

<!-- Avatar circle -->
<img class="rounded-full w-12 h-12" :src="avatar" />
```

---

## 8. Borders & Dividers

### 8.1 Border Styles

```vue
<!-- Basic border -->
<div class="border border-grey-200">Content</div>

<!-- Border sides -->
<div class="border-t border-grey-200">Top border</div>
<div class="border-b border-grey-300">Bottom border</div>

<!-- Border width -->
<div class="border-2 border-primary">Thick border</div>

<!-- Colored borders -->
<div class="border border-destructive">Error border</div>
<div class="border border-primary">Primary border</div>
```

### 8.2 Dividers

```vue
<!-- Horizontal divider -->
<hr class="border-t border-grey-200 my-6" />

<!-- Vertical divider -->
<div class="border-l border-grey-200 h-8"></div>

<!-- Divider with text -->
<div class="flex items-center gap-4">
  <div class="flex-1 border-t border-grey-200"></div>
  <span class="text-grey-500">OR</span>
  <div class="flex-1 border-t border-grey-200"></div>
</div>
```

---

## 9. Animations & Transitions

### 9.1 Transition Classes

```vue
<!-- Basic transition -->
<div class="transition-colors hover:bg-primary-100">Hover effect</div>

<!-- Custom duration -->
<div class="transition-all duration-300 hover:scale-105">Scale effect</div>

<!-- Opacity transition -->
<div class="transition-opacity duration-200" :class="isVisible ? 'opacity-100' : 'opacity-0'">
  Fade in/out
</div>
```

### 9.2 Custom Animations (SCSS)

```vue
<template>
  <div :class="$style.fade_in">Animated content</div>
</template>

<style lang="scss" module>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade_in {
  animation: fadeIn 0.3s ease-out;
}
</style>
```

---

## 10. Accessibility Guidelines

### 10.1 Color Contrast

- **Minimum ratio:** 4.5:1 for normal text
- **Large text:** 3:1 ratio acceptable
- **Test using:** WebAIM contrast checker

### 10.2 Focus States

```vue
<!-- Always provide visible focus state -->
<button class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible button
</button>

<!-- Input focus -->
<input class="focus:ring-2 focus:ring-primary focus:border-transparent" />
```

### 10.3 ARIA Labels

```vue
<!-- Button with label -->
<button aria-label="Close menu" @click="closeMenu">
  <Icon name="x" />
</button>

<!-- Form label -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- Status text -->
<div role="status" aria-live="polite">{{ message }}</div>
```

---

## 11. Dark Mode (Future)

### 11.1 Dark Mode Classes

```vue
<!-- Responsive to dark mode -->
<div class="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content adapts to light/dark
</div>

<!-- Icon color changes -->
<Icon name="sun" class="dark:hidden" />
<Icon name="moon" class="hidden dark:block" />
```

### 11.2 CSS Variables for Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --foreground: #ffffff;
    --border: #333333;
  }
}
```

---

## 12. Design System Best Practices

### ✅ DO's

- ✅ Use CSS Variables for colors
- ✅ Use Tailwind classes directly in template
- ✅ Maintain consistent spacing
- ✅ Test responsive behavior
- ✅ Use semantic HTML
- ✅ Provide focus states
- ✅ Use meaningful alt text
- ✅ Keep design consistent

### ❌ DON'Ts

- ❌ Hardcode colors (use CSS variables)
- ❌ Write custom CSS for basic styling
- ❌ Mix tailwind + custom CSS classes
- ❌ Use `!important` in SCSS
- ❌ Skip focus states
- ❌ Use arbitrary pixel values
- ❌ Create new button variants
- ❌ Ignore accessibility

---

## 13. Design System References

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Shadcn/UI Components:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Document Version:** 1.0
**Last Updated:** 2026-01-26
**Design System Owner:** Design Team
**Status:** Active - MVP Phase
