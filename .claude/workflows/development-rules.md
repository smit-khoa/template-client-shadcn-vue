# Development Rules

> **Quy tắc phát triển và coding standards cho dự án Vue 3 + TypeScript**

## 🎯 Core Principles

1. **Component Reuse First** - Always check existing components before creating new ones
2. **Type Safety** - Full TypeScript coverage with strict mode
3. **Composition API** - Use `<script setup>` syntax exclusively
4. **Utility-First CSS** - Tailwind CSS only, no inline styles
5. **Naming Consistency** - Follow conventions strictly

---

## 📝 Naming Conventions

### Variables & Constants
```typescript
// ✅ Correct - snake_case for variables
const user_name = 'John'
const total_count = 100
const is_active = true

// ❌ Wrong - camelCase for variables
const userName = 'John'
const totalCount = 100
const isActive = true

// ✅ Correct - SCREAMING_SNAKE_CASE for constants
const MAX_RETRIES = 3
const API_BASE_URL = 'https://api.example.com'

// ❌ Wrong - lowercase for constants
const max_retries = 3
const apiBaseUrl = 'https://api.example.com'
```

### Functions & Methods
```typescript
// ✅ Correct - camelCase
function getUserById(id: number) {}
function calculateTotal(items: any[]) {}
function validateInput(value: string) {}

// ❌ Wrong - snake_case
function get_user_by_id(id: number) {}
function calculate_total(items: any[]) {}
```

### Classes & Interfaces
```typescript
// ✅ Correct - PascalCase
class UserService {}
interface ComponentProps {}
type UserData = {}

// ❌ Wrong - camelCase or snake_case
class userService {}
interface component_props {}
```

### Components & Files
```typescript
// ✅ Correct - PascalCase for components
Button.vue
UserCard.vue
LoginForm.vue

// ✅ Correct - kebab-case for folders
components/custom-button/
pages/user-profile/

// ❌ Wrong - snake_case for components
button.vue
user_card.vue
```

---

## 🏗️ Component Structure

### Vue SFC Template
```vue
<template>
  <div class="component-wrapper">
    <!-- Template content -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentType } from '@/types'

// Props interface
interface Props {
  modelValue?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md'
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// Reactive state
const internal_value = ref('')

// Computed properties
const computed_class = computed(() => {
  return `base-class ${props.size}`
})

// Methods
function handleChange(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.component-wrapper {
  @apply flex items-center gap-2;
}
</style>
```

### Component Export Pattern
```typescript
// components/custom/button/index.ts
export { default as Button } from './Button.vue'

// ✅ CORRECT - Usage in pages/features
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Checkbox } from '@/components/custom/checkbox'

// ❌ FORBIDDEN - NEVER import from ui
import { Button } from '@/components/ui/button'  // ❌ BANNED
```

### 🚨 Component Import Rule (MANDATORY)

**ONLY** import from `@/components/custom/*`. The `src/components/ui/` folder is **INTERNAL ONLY** - used for building custom components, **NEVER** for direct import in pages or features.

---

## 🎨 Styling Rules

### Tailwind CSS v4 - Inline Classes Only

**🚨 CRITICAL:** Tailwind CSS v4 `@apply` **KHÔNG HOẠT ĐỘNG** trong `<style scoped>` của Vue SFC.

```vue
<!-- ✅ CORRECT - Inline Tailwind classes trong template -->
<template>
  <div class="flex items-center justify-between p-4 bg-primary text-white rounded-lg">
    <span class="text-lg font-semibold">Title</span>
  </div>
</template>

<!-- ❌ WRONG - @apply trong <style scoped> (KHÔNG HOẠT ĐỘNG với Tailwind v4) -->
<style scoped>
.container {
  @apply flex items-center p-4; /* ❌ SẼ KHÔNG HOẠT ĐỘNG */
}
</style>

<!-- ❌ WRONG - inline styles -->
<div style="display: flex; padding: 16px; background: #269a85;">
  <span style="font-size: 18px; font-weight: 600;">Title</span>
</div>
```

### Quy tắc Styling (MANDATORY)

1. **LUÔN** dùng inline Tailwind classes trong `<template>`
2. **KHÔNG** dùng `@apply` trong `<style scoped>` - nó không hoạt động với Tailwind v4
3. **KHÔNG** dùng inline styles (`style="..."`)
4. **CHỈ** dùng `<style scoped>` cho CSS thuần (không Tailwind) như animations, pseudo-elements phức tạp

### CSS Variables (Chỉ khi cần CSS thuần)
```vue
<!-- ✅ PREFERRED - Dùng Tailwind color classes -->
<template>
  <div class="text-primary bg-neutral-100">Content</div>
</template>

<!-- ⚠️ ONLY IF NEEDED - CSS thuần cho cases đặc biệt -->
<style scoped>
.special-gradient {
  /* CSS thuần cho gradient phức tạp */
  background: radial-gradient(ellipse at center, rgba(87, 227, 197, 0.2) 0%, transparent 70%);
}
</style>
```

### Conditional Classes
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'sm',
  disabled: false
})

// ✅ Correct - Use cn() utility
const button_class = computed(() => {
  return cn(
    'base-button-class',
    {
      'bg-primary-500': props.variant === 'primary',
      'bg-secondary-500': props.variant === 'secondary',
      'px-4 py-2': props.size === 'sm',
      'px-6 py-3': props.size === 'lg',
      'opacity-50 cursor-not-allowed': props.disabled
    }
  )
})
</script>

<template>
  <button :class="button_class">
    <slot />
  </button>
</template>
```

---

## 🔒 TypeScript Rules

### Strict Type Safety
```typescript
// ✅ Correct - Full type definitions
interface UserData {
  id: number
  name: string
  email: string
  company?: Company[]
}

function getUserById(id: number): Promise<UserData> {
  return api<UserData>({
    url: `/users/${id}`,
    method: 'GET'
  })
}

// ❌ Wrong - Using 'any'
function getUserById(id: any): any {
  return api({ url: `/users/${id}` })
}
```

### Props Type Definitions
```vue
<script setup lang="ts">
// ✅ Correct - Interface for props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: MouseEvent) => void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

// ❌ Wrong - No type definitions
const props = defineProps({
  variant: String,
  size: String,
  disabled: Boolean
})
</script>
```

### Emits Type Safety
```vue
<script setup lang="ts">
// ✅ Correct - Typed emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, oldValue: string]
  submit: [data: FormData]
}>()

// ❌ Wrong - Untyped emits
const emit = defineEmits(['update:modelValue', 'change', 'submit'])
</script>
```

---

## 🗂️ File Organization

### Directory Structure
```
src/
├── pages/              # Route pages (PascalCase)
│   ├── Home.vue
│   ├── Login.vue
│   └── Dashboard.vue
├── components/
│   ├── ui/            # ❌ INTERNAL ONLY - DO NOT IMPORT (Shadcn primitives)
│   │   └── (Only for building custom components)
│   └── custom/        # ✅ MANDATORY - ONLY USE THIS (kebab-case folders)
│       ├── button/
│       │   ├── Button.vue
│       │   └── index.ts
│       ├── input/
│       │   ├── Input.vue
│       │   └── index.ts
│       └── user-card/
│           ├── UserCard.vue
│           └── index.ts
├── composables/       # Vue composables (camelCase files)
│   ├── useTheme.ts
│   └── useSprite.ts
├── store/             # Pinia stores (kebab-case files)
│   ├── index.ts
│   └── user.ts
├── router/
│   └── index.ts
├── controllers/       # API client (kebab-case)
│   ├── global.js
│   └── global.d.ts
├── common/            # Utilities (kebab-case)
│   ├── format.js
│   ├── date.js
│   └── image.js
├── lib/               # Library utilities
│   └── utils.ts
└── types/             # TypeScript types
    └── index.d.ts
```

---

## 🔌 API Communication

### API Client Pattern
```typescript
// ✅ Correct - Type-safe API calls
import { api, isApiError } from '@/controllers/global'

interface LoginResponse {
  access_token: string
  user: UserData
}

async function login(email: string, password: string) {
  const res = await api<LoginResponse>({
    url: '/api/v1/auth/login',
    method: 'POST',
    data: { email, password },
    toast: true,  // Show error toast on failure
    authorization: null  // No token needed for login
  })

  if (isApiError(res)) {
    // Handle error
    console.error('Login failed:', res.message)
    return null
  }

  // Success - res.data is typed as LoginResponse
  return res.data
}

// ❌ Wrong - Untyped, no error handling
async function login(email, password) {
  const res = await axios.post('/api/v1/auth/login', {
    email,
    password
  })
  return res.data
}
```

### Error Handling
```typescript
// ✅ Correct - Proper error handling
const res = await api<UserData>({
  url: '/users/123',
  method: 'GET',
  toast: true
})

if (isApiError(res)) {
  // Error already shown via toast
  return
}

// Type-safe access to data
console.log(res.data.name)

// ❌ Wrong - Try-catch without type safety
try {
  const res = await axios.get('/users/123')
  console.log(res.data.name)
} catch (error) {
  console.error(error)
}
```

---

## 📦 State Management (Pinia)

### Store Definition
```typescript
// store/user.ts
import { defineStore } from 'pinia'

interface UserData {
  userName: string
  email: string
  company?: Company[]
}

interface UserState {
  user: UserData | null
}

// ✅ Correct - Type-safe store
export const useUserStore = defineStore('user_store', {
  state: (): UserState => ({
    user: null
  }),

  actions: {
    setUser(user: UserData | null) {
      this.user = user
    },

    clearUser() {
      this.user = null
    }
  },

  getters: {
    getUser: (state): UserData | null => state.user,

    hasCompany: (state): boolean => {
      return state.user?.company ? state.user.company.length > 0 : false
    },

    userName: (state): string => state.user?.userName || 'Guest'
  }
})

// ❌ Wrong - Untyped store
export const useUserStore = defineStore('user_store', {
  state: () => ({
    user: null
  }),

  actions: {
    setUser(user) {
      this.user = user
    }
  }
})
```

### Store Usage
```vue
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

// ✅ Correct - Typed store access
const user_store = useUserStore()

const user_name = computed(() => user_store.userName)
const has_company = computed(() => user_store.hasCompany)

function logout() {
  user_store.clearUser()
}
</script>
```

---

## 🧩 Component Composition

### Composables Pattern
```typescript
// composables/useTheme.ts
import { ref, computed, watch, onMounted } from 'vue'

export function useTheme() {
  const is_dark = ref(false)

  const current_theme = computed(() => {
    return is_dark.value ? 'dark' : 'light'
  })

  function setTheme(theme: 'light' | 'dark') {
    is_dark.value = theme === 'dark'
    document.documentElement.classList.toggle('dark', is_dark.value)
    localStorage.setItem('theme', theme)
  }

  function toggleTheme() {
    setTheme(is_dark.value ? 'light' : 'dark')
  }

  function initTheme() {
    const saved_theme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const system_theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(saved_theme || system_theme)
  }

  onMounted(() => {
    initTheme()
  })

  return {
    is_dark,
    current_theme,
    setTheme,
    toggleTheme,
    initTheme
  }
}
```

### Using Composables
```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// ✅ Correct - Destructure only what you need
const { is_dark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    {{ is_dark ? '🌙' : '☀️' }}
  </button>
</template>
```

---

## 🧪 Testing Rules

### Unit Test Structure
```typescript
// __tests__/components/Button.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '@/components/custom/button'

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('base-button-class')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary-500')
  })
})
```

### E2E Test Commands

```bash
# ⚡ FASTEST - Headless (CI/CD, automation)
npm run test:e2e

# 🎯 RECOMMENDED - UI Mode (debug tốt nhất)
npm run test:e2e:ui

# 👀 VISUAL - Headed mode (xem browser real-time)
npm run test:e2e:headed

# 🐛 DEBUG - Debug mode
npm run test:e2e:debug

# Chạy file cụ thể
npm run test:e2e:headed -- e2e/tests/[name].spec.ts
```

### E2E Test Structure
```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
  await page.goto('https://localhost:8309')

  // Fill form
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')

  // Submit
  await page.click('button[type="submit"]')

  // Assert redirect
  await expect(page).toHaveURL('/app/dashboard')
})
```

### 🔄 Visual Test FAIL → BẮT BUỘC CODE LẠI

**Quy trình khi visual test không match:**

```
1. Chạy test: npm run test:e2e:headed
   ↓
2. Test FAIL → Xem diff image
   Location: e2e/tests/[name].spec.ts-snapshots/
   - *-actual.png: Code hiện tại
   - *-expected.png: Figma baseline
   - *-diff.png: Vùng khác biệt (màu đỏ)
   ↓
3. SỬA CODE - Chỉnh inline Tailwind classes
   - Spacing: p-4 → p-6, gap-2 → gap-4
   - Color: bg-primary → bg-primary-300
   - Font: text-base → text-lg
   - Layout: flex → grid, items-start → items-center
   ↓
4. Chạy lại: npm run test:e2e:headed
   ↓
5. Lặp lại cho đến khi PASS (max 3 iterations)
```

**🚨 MANDATORY:** Khi visual test FAIL, BẮT BUỘC phải code lại cho giống Figma. KHÔNG được bỏ qua.

---

## 🚫 Common Mistakes to Avoid

### ❌ Don't Create Redundant Components
```vue
<!-- ❌ Wrong - Creating new button when one exists -->
<template>
  <button class="custom-btn">
    Click me
  </button>
</template>

<!-- ✅ Correct - Use existing Button component -->
<template>
  <Button variant="primary">
    Click me
  </Button>
</template>
```

### ❌ Don't Use Options API
```vue
<!-- ❌ Wrong - Options API -->
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- ✅ Correct - Composition API -->
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

### ❌ Don't Mix Naming Conventions
```typescript
// ❌ Wrong - Inconsistent naming
const userName = 'John'
function get_user_data() {}
class user_service {}

// ✅ Correct - Consistent conventions
const user_name = 'John'
function getUserData() {}
class UserService {}
```

---

## ✅ Pre-commit Checklist

Before committing code, ensure:

- [ ] All variables use `snake_case`
- [ ] All functions use `camelCase`
- [ ] All classes/interfaces use `PascalCase`
- [ ] All constants use `SCREAMING_SNAKE_CASE`
- [ ] TypeScript strict mode passes (no `any` types)
- [ ] Composition API (`<script setup>`) used
- [ ] Tailwind CSS inline classes only (NO `@apply` trong `<style scoped>`)
- [ ] **🚨 ONLY imports from `@/components/custom/*` (NO `@/components/ui/*`)**
- [ ] Existing components reused where possible
- [ ] Tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)

---

**Last Updated:** 2026-01-30
**Version:** 1.0.0
