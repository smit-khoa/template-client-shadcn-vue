# Code Standards - SMIT Chat

## 1. Naming Conventions (BẮT BUỘC)

### 1.1 Variables & Properties
```typescript
// ✅ ĐÚNG: snake_case
const user_name = "John"
const total_count = 0
const is_active = true
let api_response = null

// ❌ SAI: camelCase, PascalCase
const userName = "John"
const TotalCount = 0
```

### 1.2 Functions
```typescript
// ✅ ĐÚNG: camelCase
function getUserById(id: string) {}
function calculateTotal(items: any[]) {}
const validateEmail = (email: string): boolean => {}

// ❌ SAI: snake_case, PascalCase
function get_user_by_id(id: string) {}
function CalculateTotal(items: any[]) {}
```

### 1.3 Classes & Components
```typescript
// ✅ ĐÚNG: PascalCase
class UserService {}
class OrderController {}
export default defineComponent({ name: "UserProfile" })
<script setup lang="ts"></script> // Implicit PascalCase from filename

// ❌ SAI: snake_case, camelCase
class user_service {}
class orderController {}
```

### 1.4 Constants
```typescript
// ✅ ĐÚNG: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3
const API_BASE_URL = "https://api.example.com"
const DEFAULT_TIMEOUT = 5000

// ❌ SAI: camelCase
const maxRetries = 3
const apiBaseUrl = "https://api.example.com"
```

### 1.5 Vue Components
```typescript
// ✅ ĐÚNG: PascalCase file name = PascalCase component
// File: UserProfile.vue
export default defineComponent({ name: "UserProfile" })

// ❌ SAI: kebab-case file name
// File: user-profile.vue (sai)

// Import usage:
import UserProfile from "@/components/UserProfile.vue"
<UserProfile :user="user_data" />
```

### 1.6 CSS Classes (TailwindCSS)
```vue
<!-- ✅ ĐÚNG: Tailwind classes + scoped CSS -->
<div class="w-full max-w-[638px] p-6 lg:p-10 bg-white rounded-lg">
    Content
</div>

<style lang="scss" scoped>
.glass_card {  /* Custom class: snake_case */
    box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.03);
}
</style>

<!-- ❌ SAI: camelCase class names -->
<style scoped>
.glassCard { /* Nên dùng snake_case */
    ...
}
</style>
```

## 2. File Structure & Organization

### 2.1 Folder Organization
```
src/
├── components/
│   ├── ui/              # Shadcn/UI base (import from here)
│   ├── custom/          # Custom wrappers
│   │   ├── input/
│   │   │   ├── Input.vue        # Main component
│   │   │   ├── index.ts         # Export
│   │   │   └── Input.scss
│   │   └── button/
│   │       ├── Button.vue
│   │       ├── index.ts
│   │       └── Button.scss
│   ├── app/             # Feature components
│   │   ├── authentication/
│   │   │   ├── Login.vue
│   │   │   └── Register.vue
│   │   └── staff/
│   │       ├── StaffList.vue
│   │       └── StaffDetail.vue
│   └── shared/          # Utilities
│
├── pages/               # Page-level components (route)
│   ├── Auth.vue
│   ├── Staff.vue
│   └── ...
│
├── store/               # Pinia
│   └── user.ts
│
├── router/              # Routes
│   └── index.ts
│
├── controllers/         # API layer
│   └── global.js
│
├── common/              # Utilities
│   └── index.ts
│
├── lib/                 # TypeScript utilities
│   └── utils.ts
│
└── assets/              # Images, fonts
    ├── fonts/
    ├── images/
    │   ├── login/
    │   ├── dashboard/
    │   └── ...
    └── icons/
```

### 2.2 Component File Organization
```vue
<template>
  <!-- Template content here -->
</template>

<script setup lang="ts">
// Imports
import { ref } from "vue"
import { Button } from "@/components/custom/button"

// Types
interface Props {
  user_id: string
}

// Props
defineProps<Props>()

// State
const is_loading = ref(false)

// Functions
function handleClick() {
  // Implementation
}
</script>

<style lang="scss" scoped>
/* Scoped styles only */
.component_class {
  /* ... */
}
</style>
```

## 3. TypeScript Rules

### 3.1 Type Definitions
```typescript
// ✅ ĐÚNG: Always type your variables
interface User {
  user_id: string
  user_name: string
  email: string
}

type ApiResponse<T> = {
  error: boolean
  data?: T
  message?: string
}

// Function with types
function getUser(user_id: string): Promise<User> {}

// Variable types
const user: User = { user_id: "1", user_name: "John", email: "john@example.com" }

// ❌ SAI: Any type
const user: any = {} // Avoid!
function getUser(user_id) {} // Missing return type
```

### 3.2 Strict Mode (Required)
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,           // All strict flags
    "noImplicitAny": true,    // No implicit any
    "strictNullChecks": true, // Strict null/undefined
    "strictFunctionTypes": true,
    "noUnusedLocals": true,   // Warn unused variables
    "noUnusedParameters": true // Warn unused params
  }
}
```

### 3.3 Generics
```typescript
// ✅ ĐÚNG: Generic types for flexibility
function createStore<T>(initial_value: T) {
  return { value: ref<T>(initial_value) }
}

type ApiResponse<T> = {
  error: boolean
  data: T
}

const response: ApiResponse<User> = { error: false, data: user }
```

## 4. Vue Component Patterns

### 4.1 Script Setup (REQUIRED)
```vue
<!-- ✅ ĐÚNG: Use <script setup> -->
<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/custom/button"

interface Props {
  user_name: string
  is_active?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ update: [value: string] }>()

const input_value = ref("")

function handleSubmit() {
  emit("update", input_value.value)
}
</script>

<!-- ❌ SAI: Old Options API -->
<script>
export default {
  props: { userName: String },
  data() { return { inputValue: "" } },
  methods: { handleSubmit() {} }
}
</script>
```

### 4.2 Props Definition
```typescript
// ✅ ĐÚNG: TypeScript types (most strict)
interface Props {
  user_id: string
  is_active: boolean
  items?: string[]
}
const props = defineProps<Props>()

// Props without defaults
const props = withDefaults(
  defineProps<{
    user_name: string
    is_active?: boolean
    items?: string[]
  }>(),
  {
    is_active: false,
    items: () => []
  }
)
```

### 4.3 Emits Definition
```typescript
// ✅ ĐÚNG: Typed emits
const emit = defineEmits<{
  update: [value: string]
  submit: [user_id: string, email: string]
  close: []
}>()

emit("update", "new value")
emit("submit", "123", "john@example.com")
```

### 4.4 Computed & Watchers
```typescript
// ✅ ĐÚNG: Typed
import { computed, watch } from "vue"

const full_name = computed<string>(() => {
  return `${props.first_name} ${props.last_name}`
})

watch(
  () => props.user_id,
  (new_id: string, old_id: string) => {
    // Handle change
  }
)
```

## 5. Styling Guidelines

### 5.1 Tailwind CSS (PRIMARY)
```vue
<!-- ✅ ĐÚNG: Tailwind classes directly in template -->
<template>
  <div class="w-full max-w-[638px] p-6 lg:p-10 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-neutral-100">Title</h1>
    <p class="text-sm text-grey-500 mt-2">Description</p>
  </div>
</template>

<!-- ❌ SAI: Custom CSS for what Tailwind can do -->
<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
```

### 5.2 CSS Variables (COLOR SYSTEM)
```vue
<!-- ✅ ĐÚNG: Use CSS Variable classes -->
<button class="bg-primary text-white">Primary</button>
<button class="bg-destructive text-white">Delete</button>
<div class="text-neutral-100">Dark text</div>
<div class="bg-grey-100">Light background</div>

<!-- ❌ SAI: Hardcode colors (unless new color) -->
<button class="bg-[#269a85] text-white">Primary</button>
```

### 5.3 SCSS (ONLY WHEN NEEDED)
```vue
<!-- ✅ ĐÚNG: SCSS for complex styles -->
<template>
  <div :class="$style.glass_card">Content</div>
</template>

<style lang="scss" scoped>
.glass_card {
  box-shadow:
    0px 24px 40px rgba(0, 0, 0, 0.03),
    inset 0px 8px 32px rgba(255, 255, 255, 0.18);

  @media (max-width: 768px) {
    padding: 1rem;
  }
}
</style>

<!-- ❌ SAI: SCSS for simple styles -->
<style lang="scss">
.card {
  @apply w-full p-4 bg-white; /* Wrong! Use Tailwind */
}
</style>
```

### 5.4 Responsive Design
```vue
<!-- ✅ ĐÚNG: Mobile-first approach -->
<template>
  <div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
    <!-- Stack on mobile, row on desktop -->
    <div class="w-full lg:w-1/2 p-4 lg:p-6">Panel 1</div>
    <div class="w-full lg:w-1/2 p-4 lg:p-6">Panel 2</div>
  </div>

  <!-- Hide on mobile -->
  <div class="hidden lg:block">Desktop only</div>

  <!-- Responsive text sizes -->
  <h1 class="text-xl lg:text-3xl font-bold">Title</h1>
</template>

<!-- ❌ SAI: Desktop-first -->
<div class="lg:flex flex-col">Desktop first</div>
```

### 5.5 Color Palette Reference
```css
/* Primary Colors */
--primary-base: #269a85      (Tailwind: text-primary, bg-primary)
--primary-100: #40f0d0
--primary-200: #33c4aa
--primary-300: #269a85
--primary-400: #1a7262
--primary-500: #0e4d41
--primary-600: #052a23
--primary-700: #011410

/* Secondary */
--secondary-base: #1e7b6a    (Tailwind: text-secondary, bg-secondary)
--secondary-100: #47fad9
--secondary-200: #39ceb2
/* ... */

/* Tertiary */
--tertiary-base: #2eb9a0     (Tailwind: text-tertiary, bg-tertiary)
--tertiary-100: #bcfeed
/* ... */

/* Neutral & Text */
--neutral-100: #1a2229       (Main text color)
--white: #fff
--black: #213547

/* Status */
--destructive: #dc2626       (Error/Delete)

/* Grey Scale */
--grey-100: #eef1f1          (Lightest)
--grey-200: #d2d8d6
--grey-300: #abb0af
--grey-400: #868a89
--grey-500: #636665
--grey-600: #424443
--grey-700: #232424          (Darkest)
```

## 6. Component Patterns

### 6.1 Custom Input Pattern
```vue
<template>
  <div class="input_wrapper">
    <div class="relative w-full">
      <!-- Icon prefix -->
      <Icon v-if="props.icon" :name="props.icon" class="absolute left-3 top-1/2 transform -translate-y-1/2" />

      <!-- Input -->
      <input
        :value="props.model_value"
        :type="input_type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :class="[
          'w-full px-4 py-2 rounded-lg border',
          props.icon ? 'pl-10' : '',
          props.error ? 'border-destructive' : 'border-grey-200',
          'focus:outline-none focus:ring-2 focus:ring-primary'
        ]"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />

      <!-- Show/Hide toggle for password -->
      <button v-if="is_password_field" @click="is_password_visible = !is_password_visible" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Icon :name="is_password_visible ? 'eye' : 'eye-off'" />
      </button>
    </div>

    <!-- Error message -->
    <p v-if="props.error" class="text-destructive text-xs mt-1">{{ props.error_message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Icon } from "@/components/custom/icon"

interface Props {
  model_value: string | number
  type?: "text" | "email" | "password" | "number" | "currency"
  placeholder?: string
  icon?: string
  disabled?: boolean
  error?: boolean
  error_message?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "Nhập thông tin",
  disabled: false,
  error: false
})

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
}>()

const is_password_visible = ref(false)

const is_password_field = computed(() => props.type === "password")

const input_type = computed(() => {
  if (props.type === "password") {
    return is_password_visible.value ? "text" : "password"
  }
  return props.type
})
</script>

<style lang="scss" scoped>
.input_wrapper {
  width: 100%;
}
</style>
```

### 6.2 Custom Button Pattern
```vue
<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "danger" | "noborder"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "default",
  disabled: false,
  loading: false
})

const button_class = computed(() => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-600",
    secondary: "bg-white text-neutral-100 border border-grey-200 hover:bg-grey-100",
    danger: "bg-destructive text-white hover:bg-destructive/90",
    noborder: "bg-transparent text-primary hover:bg-primary/10"
  }

  const sizes = {
    sm: "px-3 py-1 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return [
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
    variants[props.variant],
    sizes[props.size],
    props.disabled || props.loading ? "opacity-50 cursor-not-allowed" : ""
  ]
})
</script>
```

## 7. API Integration Patterns

### 7.1 API Calls
```typescript
// ✅ ĐÚNG: Use global api() function
import { api } from "@/controllers/global"

// Simple GET
const response = await api({
  url: "/api/v1/users",
  method: "GET"
})

// With params
const response = await api({
  url: "/api/v1/users",
  method: "GET",
  params: { page: 1, limit: 10 }
})

// POST with data
const response = await api({
  url: "/api/v1/users",
  method: "POST",
  data: { user_name: "John", email: "john@example.com" }
})

// Custom error handling
const response = await api({
  url: "/api/v1/users",
  method: "GET",
  toast: false  // Don't auto-show error toast
})
if (response.error) {
  console.error("Error:", response.message)
}
```

### 7.2 Error Handling
```typescript
// ✅ ĐÚNG: Always check for error
if (response.error) {
  console.error("API Error:", response.message)
  return
}

// Use TypeScript for type safety
interface UserResponse {
  user_id: string
  user_name: string
}

const response = await api<UserResponse>({
  url: "/api/v1/users/me",
  method: "GET"
})

if (!response.error && response.data) {
  const user_name = response.data.user_name
}
```

## 8. Store (Pinia) Patterns

### 8.1 Store Definition
```typescript
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    current_user: null as User | null,
    is_loading: false,
    error_message: ""
  }),

  getters: {
    is_authenticated: (state) => state.current_user !== null,
    user_name: (state) => state.current_user?.user_name || ""
  },

  actions: {
    async fetchUser(user_id: string) {
      this.is_loading = true
      try {
        const response = await api<User>({
          url: `/api/v1/users/${user_id}`,
          method: "GET"
        })
        if (!response.error) {
          this.current_user = response.data || null
        }
      } catch (error) {
        this.error_message = "Failed to fetch user"
      } finally {
        this.is_loading = false
      }
    },

    setUser(user: User) {
      this.current_user = user
    }
  }
})
```

### 8.2 Store Usage in Components
```vue
<script setup lang="ts">
import { user } from "@/store"

const user_store = user()  // Get store instance

// Use state
console.log(user_store.current_user)

// Use getters
console.log(user_store.is_authenticated)

// Use actions
user_store.fetchUser("123")
user_store.setUser(new_user)
</script>
```

## 9. Common Utilities

### 9.1 Formatting Functions
```typescript
import { formatCurrency, formatDate, formatNumber, image } from "@/common"

// Format currency (VND)
formatCurrency(1000000)  // 1.000.000₫

// Format date
formatDate({ date: new Date(), format: "DD/MM/YYYY" })  // 03/01/2026
formatDate({ date: new Date(), fromNow: true })  // 5 phút trước

// Format number
formatNumber(1000000)  // 1.000.000

// Load image
const logo = image("logo.svg")
const preview = image("preview.png")
```

### 9.2 Utility Functions
```typescript
import { copy, randomString } from "@/common"

// Copy to clipboard
copy("text to copy")

// Generate random string
randomString(10)  // "aB3cD5eF7g"
```

## 10. Git & Version Control

### 10.1 Branch Naming
```
main              - Production ready
dev-*             - Development features
feat/feature-name - Feature branches
fix/bug-name      - Bug fix branches
refactor/*        - Refactoring
docs/*            - Documentation
```

### 10.2 Commit Message Format
```
feat: add new feature
fix: fix bug
refactor: refactor code
docs: update documentation
style: formatting changes
test: add/update tests

Example:
feat: add staff management page
fix: fix token validation error
docs: update README
```

### 10.3 PR Template
```markdown
## Description
Brief description of changes

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
Describe testing done

## Checklist
- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## 11. Performance Best Practices

### 11.1 Code Splitting
```typescript
// ✅ ĐÚNG: Lazy load routes
const Staff = () => import("@/pages/Staff.vue")
const Platforms = () => import("@/pages/Platforms.vue")

const routes = [
  { path: "/staff", component: Staff },
  { path: "/platforms", component: Platforms }
]
```

### 11.2 Image Optimization
```vue
<!-- ✅ ĐÚNG: Use optimized image helper -->
<template>
  <img :src="image('logo.svg')" alt="Logo" class="w-8 h-8" />
</template>

<!-- Use srcset for responsive images -->
<img :srcset="`${image('logo.svg')} 1x, ${image('logo-2x.svg')} 2x`" />
```

### 11.3 List Virtualization (For large lists)
```typescript
// If using virtual scrolling library
import { useVirtualList } from "@vueuse/core"

const { list, containerProps, wrapperProps } = useVirtualList(
  users,
  { itemHeight: 50 }
)
```

## 12. Testing Strategy

### 12.1 Unit Tests (Utilities)
```typescript
import { describe, it, expect } from "vitest"
import { formatCurrency, formatDate } from "@/common"

describe("formatCurrency", () => {
  it("formats VND currency", () => {
    expect(formatCurrency(1000000)).toBe("1.000.000₫")
  })
})
```

### 12.2 Component Tests
```typescript
import { mount } from "@vue/test-utils"
import Button from "@/components/custom/button/Button.vue"

describe("Button Component", () => {
  it("emits click event", async () => {
    const wrapper = mount(Button)
    await wrapper.trigger("click")
    expect(wrapper.emitted("click")).toBeTruthy()
  })
})
```

## 13. Security Guidelines

### 13.1 Input Validation
```typescript
// ✅ ĐÚNG: Always validate input
function validateEmail(email: string): boolean {
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email_regex.test(email)
}

// Server-side validation (critical)
// Never trust client-side validation alone
```

### 13.2 Token Management
```typescript
// ✅ ĐÚNG: Always use Bearer token
const token = localStorage.getItem("accessToken")
headers: {
  Authorization: `Bearer ${token}`
}

// Never expose token in URL
// Always use HTTPS for API calls
// Clear token on logout
localStorage.removeItem("accessToken")
```

### 13.3 XSS Prevention
```vue
<!-- ✅ ĐÚNG: Vue auto-escapes data binding -->
<p>{{ user_name }}</p>  <!-- Safe - auto escaped -->

<!-- ❌ SAI: Never use v-html with untrusted data -->
<p v-html="user_input"></p>  <!-- Dangerous -->
```

---

**Document Version:** 1.0
**Last Updated:** 2026-01-03
**Owner:** Development Team
