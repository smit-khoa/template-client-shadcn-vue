# Code Standards & Naming Conventions

**Last Updated:** 2026-02-04

## Naming Conventions

Dự án theo dõi các naming conventions nghiêm ngặt để đảm bảo consistency và readability.

### Variables & Constants

| Type | Convention | Example | Usage |
|------|-----------|---------|-------|
| **Variables** | `snake_case` | `user_name`, `total_count`, `is_active` | Local, component data, store state |
| **Constants** | `SCREAMING_SNAKE_CASE` | `MAX_RETRIES`, `API_BASE_URL`, `THEME_COLORS` | Global constants, config values |
| **Booleans** | Prefix with `is_`, `has_`, `can_` | `is_loading`, `has_company`, `can_delete` | Boolean flags in state |

### Functions & Methods

| Type | Convention | Example | Notes |
|------|-----------|---------|-------|
| **Functions** | `camelCase` | `getUserById()`, `calculateTotal()`, `validateInput()` | Composables, utilities, store actions |
| **Event Handlers** | Prefix with `handle` | `handleClick()`, `handleSubmit()`, `handleThemeChange()` | Component methods |
| **Async Functions** | `camelCase` | `fetchUserData()`, `saveCompanyInfo()` | API calls, async operations |
| **Getters** | No prefix | `getUser`, `getCompanyList` | Computed properties, store getters |

### Classes & Components

| Type | Convention | Example | Notes |
|------|-----------|---------|-------|
| **Vue Components** | `PascalCase` | `UserProfile.vue`, `CompanyCard.vue` | File names match component names |
| **TypeScript Classes** | `PascalCase` | `UserService`, `OrderController` | Service classes, controllers |
| **Interfaces** | `PascalCase` | `UserData`, `ApiResponse`, `CompanyInfo` | Type definitions, interfaces |
| **Enum** | `PascalCase` | `ThemeMode`, `UserRole` | Enumeration types |

### File Organization

| Type | Convention | Example |
|------|-----------|---------|
| **Vue Components** | PascalCase | `/components/Button.vue`, `/pages/HomePage.vue` |
| **Composables** | `use` prefix, camelCase | `/composables/useTheme.ts`, `/composables/useSprite.ts` |
| **Stores** | camelCase + `.ts` | `/store/user.ts`, `/store/company.ts` |
| **Utilities** | camelCase + `.ts` | `/lib/utils.ts`, `/common/index.ts` |
| **Controllers** | lowercase + `.js` | `/controllers/global.js` |

## Component Structure Patterns

### Vue Single File Component (SFC) Pattern

```vue
<script setup lang="ts">
// 1. Imports (external, then internal)
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import Button from '@/components/Button.vue'

// 2. Interface definitions
interface Props {
  title: string
  disabled?: boolean
}

interface Emits {
  onSubmit: (value: string) => void
  onCancel: () => void
}

// 3. Props & Emits
const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

// 4. Composables & stores
const store = useStore()

// 5. Reactive state (ref, reactive)
const input_value = ref('')
const is_loading = ref(false)

// 6. Computed properties
const is_valid = computed(() => input_value.value.length > 0)

// 7. Event handlers
const handleSubmit = () => {
  is_loading.value = true
  try {
    // logic
    emit('onSubmit', input_value.value)
  } finally {
    is_loading.value = false
  }
}

// 8. Lifecycle hooks
onMounted(() => {
  // initialization
})
</script>

<template>
  <div class="component-wrapper">
    <h1>{{ title }}</h1>
    <input v-model="input_value" />
    <Button @click="handleSubmit" :disabled="is_loading || !is_valid">
      Submit
    </Button>
  </div>
</template>

<style scoped>
.component-wrapper {
  padding: 1rem;
}
</style>
```

### Composable Pattern

```typescript
// composables/useTheme.ts

import { ref, computed } from 'vue'

type Theme = 'light' | 'dark'

export function useTheme() {
  // Reactive state
  const current_theme = ref<Theme>('light')

  // Computed
  const is_dark = computed(() => current_theme.value === 'dark')

  // Methods
  const toggleTheme = () => {
    current_theme.value = current_theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (theme: Theme) => {
    current_theme.value = theme
  }

  return {
    current_theme,
    is_dark,
    toggleTheme,
    setTheme
  }
}
```

### Store Pattern (Pinia)

```typescript
// store/user.ts

import { defineStore } from 'pinia'

interface Company {
  user_id: string
  company_id: string
  company_name: string
}

interface UserData {
  user_name: string
  email: string
  company: Company[]
}

interface State {
  user: UserData | null
}

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
```

## TypeScript Usage Guidelines

### Type Definitions

```typescript
// ✅ Good: Explicit typing
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface UserResponse {
  user_name: string
  email: string
  created_at: string
}

// ✅ Use Union types for constrained values
type Theme = 'light' | 'dark'
type UserRole = 'admin' | 'user' | 'guest'

// ✅ Generic utilities
function handleSuccess<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: 'Success'
  }
}
```

### Props Typing

```typescript
// ✅ Good: Full type definition
interface Props {
  title: string
  is_active?: boolean
  disabled?: boolean
  on_click?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  is_active: false,
  disabled: false
})

// ❌ Avoid: Basic prop syntax without types
```

### Event Typing

```typescript
// ✅ Good: Typed emits
interface Emits {
  onSubmit: (value: string) => void
  onCancel: () => void
  onError: (error: Error) => void
}

const emit = defineEmits<Emits>()

// Usage
emit('onSubmit', 'data')
```

## File Organization Conventions

### Component Directory Structure

```
src/components/
├── ui/                          # Shadcn base components
│   ├── button/
│   │   ├── Button.vue
│   │   └── index.ts
│   ├── input/
│   │   ├── Input.vue
│   │   └── index.ts
│   └── ...
├── custom/                      # Project-specific custom components
│   ├── AppButton.vue
│   ├── AppInput.vue
│   └── ...
├── shared/                      # Shared across app
│   ├── Header.vue
│   ├── Footer.vue
│   └── ...
├── auth/
│   ├── LoginForm.vue
│   └── ...
└── [feature]/                   # Feature-specific components
    ├── FeatureHeader.vue
    └── ...
```

### Utility & Helper Structure

```
src/
├── composables/                 # Vue composables (use* prefix)
│   ├── useTheme.ts
│   ├── useSprite.ts
│   └── index.ts
├── controllers/                 # API controllers
│   └── global.js               # Main API wrapper
├── lib/                        # Utility functions
│   └── utils.ts                # cn() helper
├── common/                     # Common utilities (formatting, etc)
│   └── index.ts
└── store/                      # Pinia stores
    ├── user.ts
    └── index.ts
```

## CSS & Styling Standards

### TailwindCSS Usage

```vue
<!-- ✅ Good: Use Tailwind utility classes -->
<template>
  <div class="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg">
    <h1 class="text-2xl font-semibold text-slate-900">Title</h1>
    <Button @click="handleClick">Click me</Button>
  </div>
</template>

<!-- ❌ Avoid: Inline styles -->
<template>
  <div style="display: flex; justify-content: space-between;">
    <h1 style="font-size: 24px;">Title</h1>
  </div>
</template>
```

### CSS Variables (Color System)

```css
/* Primary teal color scheme */
--primary-base: #269a85
--secondary-base: #1e7b6a
--tertiary-base: #2eb9a0

/* Usage in components */
.button-primary {
  background-color: var(--primary-base);
}

.button-secondary {
  background-color: var(--secondary-base);
}
```

### Scoped Styles in Components

```vue
<style scoped>
/* Use scoped styles for component-specific styling */
.component-wrapper {
  @apply flex flex-col gap-4;
}

.component-title {
  @apply text-xl font-semibold text-slate-900;
}

/* Responsive */
@media (max-width: 768px) {
  .component-wrapper {
    @apply flex-col;
  }
}
</style>
```

## Testing Standards

### Unit Test File Organization

```typescript
// src/__tests__/components/Button.spec.ts

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button Component', () => {
  it('renders button with label', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### E2E Test File Organization

```typescript
// e2e/tests/auth.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/')
    await page.fill('input[type=email]', 'user@example.com')
    await page.fill('input[type=password]', 'password')
    await page.click('button[type=submit]')
    await expect(page).toHaveURL('/app/staff')
  })
})
```

## Import Organization

### Order of Imports

```typescript
// 1. Vue and framework imports
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 2. External library imports
import axios from 'axios'
import { toast } from 'vue-sonner'

// 3. Internal imports (absolute path with @/)
import { user } from '@/store'
import Button from '@/components/Button.vue'
import { cn } from '@/lib/utils'

// 4. Type imports (if using separate imports)
import type { UserData } from '@/types'
```

## Code Quality

### ESLint Rules

- Enforce `const` over `let` and `var`
- No console.log in production code
- TypeScript strict mode enabled
- Unused variables/imports flagged

### Prettier Configuration

- Indent: 2 spaces
- Line width: 100 characters
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line objects

## API Response Handling

### Typed API Responses

```typescript
// controllers/global.ts pattern
interface ApiErrorResponse {
  error: true
  status: number
  message: string
}

interface ApiSuccessResponse<T> {
  error: false
  data: T
  status: number
}

type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>

// Usage in components
const response = await api<UserResponse>({
  url: '/api/v1/user',
  method: 'GET'
})

if (!isApiError(response)) {
  const user_data: UserResponse = response.data
}
```

## Version Control Conventions

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`

Example:
```
feat(auth): add login form validation

Implement email and password validation in LoginForm component.
Add toast notification for validation errors.

Closes #123
```

## Documentation Standards

### Inline Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Delay to ensure DOM update before animation starts
setTimeout(() => {
  element.classList.add('animate-in')
}, 100)

// ❌ Bad: Obvious from code
// Set timeout
setTimeout(() => { ... }, 100)
```

### Component Documentation

Every component should have a JSDoc comment:

```typescript
/**
 * Button component for user interactions
 *
 * @example
 * <Button label="Click me" @click="handleClick" />
 *
 * @props {string} label - Button text content
 * @props {boolean} [disabled=false] - Disable button
 * @props {string} [variant='primary'] - Button style variant
 *
 * @emits {void} click - Fired when button is clicked
 */
```

## Best Practices Checklist

- [ ] All variables are `snake_case`
- [ ] All functions are `camelCase`
- [ ] All classes/components are `PascalCase`
- [ ] All constants are `SCREAMING_SNAKE_CASE`
- [ ] TypeScript strict mode enabled
- [ ] Props are fully typed with interfaces
- [ ] Events are typed with Emits interface
- [ ] Components are properly scoped
- [ ] No console.log in production code
- [ ] Tests exist for critical logic
- [ ] All public APIs documented
- [ ] Imports are organized and sorted
- [ ] ESLint passes without warnings

## Enforcement

Run these commands before committing:

```bash
# Type checking
npm run vue-tsc -b

# Linting
npm run lint

# Testing
npm run test:run

# Building
npm run build
```
