# Design System

> **Design tokens, styling guidelines và theme system cho dự án Vue 3**

## 🎨 Color System

### Primary Colors (Teal)

```css
/* Base */
--primary-base: #269a85

/* Scale */
--primary-100: #e6f7f4
--primary-200: #b3e7dc
--primary-300: #80d7c4
--primary-400: #4dc7ac
--primary-500: #269a85  /* Base */
--primary-600: #1e7b6a
--primary-700: #165c50
```

**Usage:**
```vue
<div class="bg-primary-500 text-white">Primary background</div>
<span class="text-primary-600">Primary text</span>
<button class="hover:bg-primary-600">Primary hover</button>
```

---

### Secondary Colors (Dark Teal)

```css
/* Base */
--secondary-base: #1e7b6a

/* Scale */
--secondary-100: #e5f3f0
--secondary-200: #b8dcd5
--secondary-300: #8bc5ba
--secondary-400: #5eae9f
--secondary-500: #1e7b6a  /* Base */
--secondary-600: #186255
--secondary-700: #124a40
```

**Usage:**
```vue
<div class="bg-secondary-500">Secondary background</div>
<span class="text-secondary-600">Secondary text</span>
```

---

### Tertiary Colors (Bright Teal)

```css
/* Base */
--tertiary-base: #2eb9a0

/* Scale */
--tertiary-100: #e8f8f5
--tertiary-200: #bfebe3
--tertiary-300: #96ded1
--tertiary-400: #6dd1bf
--tertiary-500: #2eb9a0  /* Base */
--tertiary-600: #259480
--tertiary-700: #1c6f60
```

---

### Neutral Colors (Dark)

```css
/* Base */
--neutral-900: #1a2229

/* Scale */
--neutral-100: #f5f6f7
--neutral-200: #e5e7eb
--neutral-300: #d1d5db
--neutral-400: #9ca3af
--neutral-500: #6b7280
--neutral-600: #4b5563
--neutral-700: #374151
--neutral-800: #1f2937
--neutral-900: #1a2229  /* Base */
```

**Usage:**
```vue
<div class="bg-neutral-900 text-neutral-100">Dark background</div>
<p class="text-neutral-600">Secondary text</p>
<hr class="border-neutral-200" />
```

---

### Status Colors

```css
/* Danger / Error */
--danger-600: #D92D20
--danger-500: #EF4444
--danger-400: #F87171

/* Success */
--success-600: #12B76A
--success-500: #16A34A
--success-400: #4ADE80

/* Warning */
--warning-600: #F59E0B
--warning-500: #F59E0B
--warning-400: #FCD34D

/* Info */
--info-600: #0284C7
--info-500: #0EA5E9
--info-400: #38BDF8
```

**Usage:**
```vue
<!-- Danger -->
<button class="bg-danger-600 hover:bg-danger-500">Delete</button>
<span class="text-danger-600">Error message</span>

<!-- Success -->
<button class="bg-success-600 hover:bg-success-500">Confirm</button>
<span class="text-success-600">Success message</span>

<!-- Warning -->
<div class="bg-warning-500/10 text-warning-600 border border-warning-500">
  Warning alert
</div>
```

---

## 📝 Typography

### Font Family

**Primary Font:** Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Font Weights:**
- 400 - Regular
- 500 - Medium
- 600 - SemiBold
- 700 - Bold

**Font Files:**
```
src/assets/fonts/
├── Inter_28pt-Regular.woff2
├── Inter_28pt-Regular.ttf
├── Inter_28pt-Medium.woff2
├── Inter_28pt-Medium.ttf
├── Inter_28pt-SemiBold.woff2
├── Inter_28pt-SemiBold.ttf
├── Inter_28pt-Bold.woff2
└── Inter_28pt-Bold.ttf
```

---

### Typography Scale

```css
/* Headings */
.text-h1 { font-size: 48px; font-weight: 700; line-height: 1.2; }
.text-h2 { font-size: 36px; font-weight: 700; line-height: 1.3; }
.text-h3 { font-size: 30px; font-weight: 600; line-height: 1.4; }
.text-h4 { font-size: 24px; font-weight: 600; line-height: 1.4; }
.text-h5 { font-size: 20px; font-weight: 600; line-height: 1.5; }
.text-h6 { font-size: 18px; font-weight: 600; line-height: 1.5; }

/* Body */
.text-body-lg { font-size: 18px; font-weight: 400; line-height: 1.6; }
.text-body    { font-size: 16px; font-weight: 400; line-height: 1.6; }
.text-body-sm { font-size: 14px; font-weight: 400; line-height: 1.6; }

/* Utilities */
.text-caption { font-size: 12px; font-weight: 400; line-height: 1.5; }
.text-overline { font-size: 10px; font-weight: 600; line-height: 1.5; text-transform: uppercase; }
```

**Tailwind Equivalents:**
```vue
<!-- Headings -->
<h1 class="text-5xl font-bold">Heading 1</h1>
<h2 class="text-4xl font-bold">Heading 2</h2>
<h3 class="text-3xl font-semibold">Heading 3</h3>
<h4 class="text-2xl font-semibold">Heading 4</h4>
<h5 class="text-xl font-semibold">Heading 5</h5>
<h6 class="text-lg font-semibold">Heading 6</h6>

<!-- Body -->
<p class="text-lg">Large body text</p>
<p class="text-base">Normal body text</p>
<p class="text-sm">Small body text</p>

<!-- Utilities -->
<span class="text-xs">Caption text</span>
<span class="text-xs font-semibold uppercase">Overline</span>
```

---

## 📏 Spacing Scale

**Tailwind Spacing:** Based on 4px grid

```css
/* Spacing values */
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
32  = 128px
40  = 160px
```

**Usage:**
```vue
<!-- Padding -->
<div class="p-4">Padding 16px all sides</div>
<div class="px-6 py-3">Padding 24px horizontal, 12px vertical</div>

<!-- Margin -->
<div class="m-4">Margin 16px all sides</div>
<div class="mt-8 mb-6">Margin top 32px, bottom 24px</div>

<!-- Gap (Flexbox/Grid) -->
<div class="flex gap-4">Gap 16px between children</div>
<div class="grid grid-cols-3 gap-6">Gap 24px in grid</div>
```

---

## 🎭 Border Radius

```css
/* Border radius scale */
--radius-none: 0px
--radius-sm: 4px
--radius: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
--radius-2xl: 32px
--radius-full: 9999px
```

**Tailwind Classes:**
```vue
<div class="rounded-none">No radius</div>
<div class="rounded-sm">Small radius (4px)</div>
<div class="rounded">Default radius (8px)</div>
<div class="rounded-md">Medium radius (12px)</div>
<div class="rounded-lg">Large radius (16px)</div>
<div class="rounded-xl">XL radius (24px)</div>
<div class="rounded-full">Fully rounded (circle/pill)</div>
```

---

## 🌑 Dark Mode

### Theme Toggle

**Composable:** `useTheme()`

```vue
<script setup>
import { useTheme } from '@/composables/useTheme'

const { is_dark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    {{ is_dark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>
```

### Dark Mode Classes

```vue
<!-- Conditional styling -->
<div class="bg-white dark:bg-neutral-900">
  <p class="text-neutral-900 dark:text-neutral-100">
    Adapts to theme
  </p>
</div>
```

### Dark Mode Colors

```css
/* Light mode */
body {
  --bg-primary: #ffffff;
  --text-primary: #1a2229;
}

/* Dark mode */
body.dark {
  --bg-primary: #1a2229;
  --text-primary: #f5f6f7;
}
```

---

## 📐 Layout

### Container

```vue
<!-- Max-width container (responsive) -->
<div class="container mx-auto px-4">
  Content
</div>

<!-- Custom max-width -->
<div class="max-w-7xl mx-auto px-4">
  Large container
</div>

<div class="max-w-4xl mx-auto px-4">
  Medium container
</div>

<div class="max-w-md mx-auto px-4">
  Small container
</div>
```

---

### Grid System

```vue
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Equal columns -->
<div class="grid grid-cols-4 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

---

### Flexbox

```vue
<!-- Horizontal flex -->
<div class="flex items-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>

<!-- Justify content -->
<div class="flex justify-between items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Vertical flex -->
<div class="flex flex-col gap-2">
  <div>Top</div>
  <div>Bottom</div>
</div>
```

---

## 🎯 Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Usage:**
```vue
<!-- Mobile-first approach -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>

<!-- Hide/show on breakpoints -->
<div class="hidden md:block">
  Visible on tablet and up
</div>

<div class="block md:hidden">
  Visible only on mobile
</div>
```

---

## 🖼️ Shadows

```css
/* Shadow scale */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
```

**Tailwind Classes:**
```vue
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
```

---

## ✨ Animations

### Transitions

```vue
<!-- Transition utilities -->
<div class="transition-all duration-300 ease-in-out">
  Smooth transition
</div>

<!-- Hover effects -->
<button class="transform hover:scale-105 transition-transform">
  Scale on hover
</button>

<a class="text-primary-600 hover:text-primary-700 transition-colors">
  Color transition
</a>
```

### Loading States

```vue
<!-- Skeleton loading -->
<div class="animate-pulse">
  <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
  <div class="h-4 bg-neutral-200 rounded w-1/2"></div>
</div>

<!-- Spinner -->
<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
```

---

## 🎨 Component Styling Patterns

### Card Pattern

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Title</h3>
    </div>
    <div class="card-content">
      Content
    </div>
    <div class="card-footer">
      Footer
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden;
}

.card-header {
  @apply px-6 py-4 border-b border-neutral-200 dark:border-neutral-700;
}

.card-title {
  @apply text-lg font-semibold text-neutral-900 dark:text-neutral-100;
}

.card-content {
  @apply px-6 py-4;
}

.card-footer {
  @apply px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700;
}
</style>
```

### Button Variants

```vue
<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors;
}

.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white;
}

.btn-secondary {
  @apply bg-secondary-600 hover:bg-secondary-700 text-white;
}

.btn-outline {
  @apply border-2 border-primary-600 text-primary-600 hover:bg-primary-50;
}

.btn-ghost {
  @apply hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300;
}
</style>
```

---

## 🛠️ Design Tokens Usage

### In Vue Components

```vue
<template>
  <button :class="button_class">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const button_class = computed(() => {
  return cn(
    'btn',
    {
      'btn-primary': props.variant === 'primary',
      'btn-secondary': props.variant === 'secondary',
      'btn-sm': props.size === 'sm',
      'btn-md': props.size === 'md',
      'btn-lg': props.size === 'lg'
    }
  )
})
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-lg font-medium transition-colors;
}

.btn-primary {
  background-color: var(--primary-base);
}

.btn-primary:hover {
  background-color: var(--primary-600);
}

.btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.btn-md {
  @apply px-4 py-2 text-base;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}
</style>
```

---

## 📱 Responsive Design Guidelines

### Mobile-First Approach

```vue
<!-- Start with mobile styles -->
<div class="
  p-4           <!-- Mobile: 16px padding -->
  md:p-6        <!-- Tablet: 24px padding -->
  lg:p-8        <!-- Desktop: 32px padding -->

  text-sm       <!-- Mobile: 14px text -->
  md:text-base  <!-- Tablet: 16px text -->
  lg:text-lg    <!-- Desktop: 18px text -->
">
  Responsive content
</div>
```

### Common Patterns

```vue
<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Left</div>
  <div class="flex-1">Right</div>
</div>

<!-- Full width on mobile, fixed width on desktop -->
<div class="w-full md:w-96">
  Fixed width on desktop
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">
  Desktop only
</div>
```

---

## ✅ Design System Checklist

When implementing designs:

- [ ] Use CSS variables for colors
- [ ] Follow spacing scale (4px grid)
- [ ] Use Inter font family
- [ ] Apply appropriate font weights
- [ ] Use Tailwind classes (not inline styles)
- [ ] Support dark mode
- [ ] Make responsive (mobile-first)
- [ ] Use existing components
- [ ] Follow naming conventions
- [ ] Add proper transitions
- [ ] Test on all breakpoints

---

**Last Updated:** 2026-01-30
**Tailwind Version:** 4.1.18
**Primary Font:** Inter
**Color Scheme:** Teal-based with neutral grays
