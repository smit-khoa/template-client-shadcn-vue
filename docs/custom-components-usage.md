# Custom Components Usage Guide

> **Hướng dẫn sử dụng chi tiết các components trong `src/components/custom`**

## 🎯 Quy tắc quan trọng

**LUÔN LUÔN sử dụng components từ `src/components/custom` thay vì `src/components/ui`**

Lý do:
- ✅ Đã được tùy chỉnh sẵn cho project
- ✅ Có styling và variants phù hợp với design system
- ✅ Tích hợp sẵn icons, tooltips, loading states
- ✅ Props interface rõ ràng và dễ sử dụng
- ✅ Đã test và stable

---

## 📦 Import Pattern

```typescript
// ✅ Correct - Import từ custom
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Icon } from '@/components/custom/icon'
import { Checkbox } from '@/components/custom/checkbox'

// ❌ Wrong - Không dùng UI components trừ khi custom không có
import { Button } from '@/components/ui/button'
```

---

## 🔘 Button Component

**Path:** `@/components/custom/button`

### Props Interface

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'noborder' | 'danger' | 'error' | 'success' | 'tool'
  size?: 'default' | 'sm' | 'lg' | 'mini' | 'tiny'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: string           // Icon name từ sprite
  onlyIcon?: boolean      // Chỉ hiển thị icon, hide text
  tooltip?: string        // Tooltip text khi hover
  color_icon?: string     // Custom icon color
}
```

### Variants

#### Primary Button
```vue
<script setup>
import { Button } from '@/components/custom/button'
</script>

<template>
  <Button variant="primary">
    Đăng nhập
  </Button>
</template>
```

**Style:** Gradient teal background, white text

#### Secondary Button
```vue
<Button variant="secondary">
  Hủy
</Button>
```

**Style:** White background, border, hover effect

#### Danger Button
```vue
<Button variant="danger">
  Xóa
</Button>
```

**Style:** Red background/border, destructive action

#### No Border Button
```vue
<Button variant="noborder">
  Bỏ qua
</Button>
```

**Style:** Transparent, text only

### Sizes

```vue
<!-- Tiny - Rất nhỏ -->
<Button size="tiny">Tiny</Button>

<!-- Mini - Nhỏ -->
<Button size="mini">Mini</Button>

<!-- Small -->
<Button size="sm">Small</Button>

<!-- Default -->
<Button size="default">Default</Button>

<!-- Large -->
<Button size="lg">Large Button</Button>
```

### With Icon

```vue
<!-- Icon + Text -->
<Button icon="check">
  Xác nhận
</Button>

<!-- Icon only -->
<Button icon="settings" onlyIcon tooltip="Cài đặt" />

<!-- Icon với custom color -->
<Button
  icon="heart"
  color_icon="#ff0000"
>
  Yêu thích
</Button>
```

### States

```vue
<!-- Loading state -->
<Button :loading="is_loading">
  Đang xử lý...
</Button>

<!-- Disabled -->
<Button :disabled="true">
  Không khả dụng
</Button>
```

### Complete Example

```vue
<script setup>
import { ref } from 'vue'
import { Button } from '@/components/custom/button'

const is_submitting = ref(false)

async function handleSubmit() {
  is_submitting.value = true
  try {
    await submitForm()
  } finally {
    is_submitting.value = false
  }
}
</script>

<template>
  <div class="flex gap-4">
    <!-- Primary action -->
    <Button
      variant="primary"
      size="lg"
      type="submit"
      :loading="is_submitting"
      icon="check"
      @click="handleSubmit"
    >
      Lưu thay đổi
    </Button>

    <!-- Secondary action -->
    <Button
      variant="secondary"
      @click="$emit('cancel')"
    >
      Hủy
    </Button>

    <!-- Icon only với tooltip -->
    <Button
      variant="tool"
      size="mini"
      icon="info"
      onlyIcon
      tooltip="Thông tin thêm"
    />
  </div>
</template>
```

---

## 📝 Input Component

**Path:** `@/components/custom/input`

### Props Interface

```typescript
interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'currency' | 'normal'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  message?: string        // Helper message
  error?: boolean         // Error state
  errorMessage?: string   // Error message
  currency?: string       // Currency symbol (default: VND)
  locale?: string         // Locale for formatting (default: vi-VN)
  suffix?: string         // Custom suffix text
  icon?: string           // Prefix icon
}
```

### Basic Input

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'

const email = ref('')
</script>

<template>
  <Input
    v-model="email"
    type="text"
    placeholder="Nhập email của bạn"
  />
</template>
```

### With Icon

```vue
<!-- Email với icon -->
<Input
  v-model="email"
  type="text"
  icon="mail"
  placeholder="Email"
/>

<!-- Phone với icon -->
<Input
  v-model="phone"
  type="text"
  icon="phone"
  placeholder="Số điện thoại"
/>

<!-- Search với icon -->
<Input
  v-model="search_query"
  type="text"
  icon="search"
  placeholder="Tìm kiếm..."
/>
```

### Password Input

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'

const password = ref('')
</script>

<template>
  <!-- Auto show/hide password toggle -->
  <Input
    v-model="password"
    type="password"
    placeholder="Mật khẩu"
  />
</template>
```

**Features:**
- Tự động hiện button show/hide password
- Icon eye/eye-off toggle

### Currency Input

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'

const amount = ref(0)
</script>

<template>
  <Input
    v-model="amount"
    type="currency"
    currency="VND"
    locale="vi-VN"
    placeholder="Nhập số tiền"
  />
</template>
```

**Features:**
- Tự động format số theo locale
- Hiển thị currency suffix (VND, USD, etc.)
- Support thousand separators

### With Error

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'

const username = ref('')
const username_error = ref('Tên đăng nhập đã tồn tại')
</script>

<template>
  <Input
    v-model="username"
    type="text"
    :error="true"
    :errorMessage="username_error"
    placeholder="Tên đăng nhập"
  />
</template>
```

### With Helper Message

```vue
<Input
  v-model="password"
  type="password"
  message="Mật khẩu phải có ít nhất 8 ký tự"
  placeholder="Mật khẩu"
/>
```

### Complete Form Example

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'
import { Button } from '@/components/custom/button'

const form = ref({
  email: '',
  password: '',
  amount: 0
})

const errors = ref({
  email: '',
  password: ''
})

function validateForm() {
  if (!form.value.email) {
    errors.value.email = 'Email là bắt buộc'
  }
  if (!form.value.password) {
    errors.value.password = 'Mật khẩu là bắt buộc'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Email input -->
    <Input
      v-model="form.email"
      type="text"
      icon="mail"
      placeholder="Email"
      :error="!!errors.email"
      :errorMessage="errors.email"
    />

    <!-- Password input -->
    <Input
      v-model="form.password"
      type="password"
      placeholder="Mật khẩu"
      :error="!!errors.password"
      :errorMessage="errors.password"
      message="Tối thiểu 8 ký tự"
    />

    <!-- Currency input -->
    <Input
      v-model="form.amount"
      type="currency"
      placeholder="Số tiền"
    />

    <!-- Submit -->
    <Button
      variant="primary"
      @click="validateForm"
    >
      Đăng nhập
    </Button>
  </div>
</template>
```

---

## ✅ Checkbox Component

**Path:** `@/components/custom/checkbox`

### Props Interface

```typescript
interface CheckboxProps {
  modelValue?: boolean | string | number | any[]
  value?: string | number | boolean
  label?: string
  disabled?: boolean
  type?: 'checkbox' | 'radio'
  name?: string
}
```

### Basic Checkbox

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox } from '@/components/custom/checkbox'

const agreed = ref(false)
</script>

<template>
  <Checkbox v-model="agreed" label="Tôi đồng ý với điều khoản" />
</template>
```

### Radio Button

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox } from '@/components/custom/checkbox'

const selected_gender = ref('male')
</script>

<template>
  <div class="space-y-2">
    <Checkbox
      v-model="selected_gender"
      type="radio"
      value="male"
      label="Nam"
    />
    <Checkbox
      v-model="selected_gender"
      type="radio"
      value="female"
      label="Nữ"
    />
  </div>
</template>
```

### Multiple Checkboxes

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox } from '@/components/custom/checkbox'

const selected_features = ref([])
</script>

<template>
  <div class="space-y-2">
    <Checkbox
      v-model="selected_features"
      value="feature1"
      label="Tính năng 1"
    />
    <Checkbox
      v-model="selected_features"
      value="feature2"
      label="Tính năng 2"
    />
    <Checkbox
      v-model="selected_features"
      value="feature3"
      label="Tính năng 3"
    />
  </div>
</template>
```

---

## 🎨 Icon Component

**Path:** `@/components/custom/icon`

### Props Interface

```typescript
interface IconProps {
  name: string          // Icon name từ sprites.svg
  size?: number | string
  color?: string
  hoverColor?: string   // Color khi hover
  gradient?: boolean    // Use gradient fill
}
```

### Basic Icon

```vue
<script setup>
import { Icon } from '@/components/custom/icon'
</script>

<template>
  <Icon name="home" :size="24" />
</template>
```

### With Color

```vue
<!-- Custom color -->
<Icon name="user" color="#269a85" :size="32" />

<!-- With hover color -->
<Icon
  name="heart"
  color="#999"
  hoverColor="#ff0000"
  :size="24"
/>
```

### Gradient Icon

```vue
<Icon
  name="star"
  :size="48"
  gradient
/>
```

### Icon List Example

```vue
<template>
  <div class="flex gap-4">
    <Icon name="home" :size="24" />
    <Icon name="user" :size="24" />
    <Icon name="settings" :size="24" />
    <Icon name="mail" :size="24" />
    <Icon name="phone" :size="24" />
    <Icon name="search" :size="24" />
    <Icon name="filter" :size="24" />
    <Icon name="download" :size="24" />
    <Icon name="upload" :size="24" />
    <Icon name="edit" :size="24" />
    <Icon name="delete" :size="24" />
    <Icon name="check" :size="24" />
    <Icon name="close" :size="24" />
  </div>
</template>
```

**Available Icons:** 94 icons trong `src/assets/icons/sprites.svg`

---

## 🔄 Switch Component

**Path:** `@/components/custom/switch`

```vue
<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/custom/switch'

const notifications_enabled = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="notifications_enabled" />
    <span>Bật thông báo</span>
  </div>
</template>
```

---

## 📋 Dropdown Component

**Path:** `@/components/custom/dropdown`

```vue
<script setup>
import { Dropdown } from '@/components/custom/dropdown'
</script>

<template>
  <Dropdown>
    <template #trigger>
      <button>Menu</button>
    </template>

    <template #content>
      <div class="dropdown-menu">
        <a href="/profile">Hồ sơ</a>
        <a href="/settings">Cài đặt</a>
        <a href="/logout">Đăng xuất</a>
      </div>
    </template>
  </Dropdown>
</template>
```

---

## 🗂️ Tabs Component

**Path:** `@/components/custom/tabs`

```vue
<script setup>
import { ref } from 'vue'
import { Tabs } from '@/components/custom/tabs'

const active_tab = ref('tab1')
</script>

<template>
  <Tabs v-model="active_tab">
    <template #tab1>
      Nội dung tab 1
    </template>

    <template #tab2>
      Nội dung tab 2
    </template>

    <template #tab3>
      Nội dung tab 3
    </template>
  </Tabs>
</template>
```

---

## 🍞 Toast Notifications

**Path:** `@/components/custom/toast`

**Note:** Sử dụng `vue-sonner` để hiển thị toast

```vue
<script setup>
import { toast } from 'vue-sonner'

function showSuccess() {
  toast.success('Thao tác thành công!')
}

function showError() {
  toast.error('Có lỗi xảy ra!')
}

function showInfo() {
  toast.info('Thông tin quan trọng')
}

function showWarning() {
  toast.warning('Cảnh báo!')
}
</script>

<template>
  <div class="flex gap-2">
    <button @click="showSuccess">Success</button>
    <button @click="showError">Error</button>
    <button @click="showInfo">Info</button>
    <button @click="showWarning">Warning</button>
  </div>
</template>
```

---

## 💡 Tooltip Component

**Path:** `@/components/custom/tooltip`

```vue
<script setup>
import { Tooltip } from '@/components/custom/tooltip'
</script>

<template>
  <Tooltip content="Tooltip text here">
    <button>Hover me</button>
  </Tooltip>
</template>
```

---

## 📦 Complete Page Example

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Checkbox } from '@/components/custom/checkbox'
import { Icon } from '@/components/custom/icon'
import { toast } from 'vue-sonner'

const form = reactive({
  email: '',
  password: '',
  remember_me: false
})

const errors = reactive({
  email: '',
  password: ''
})

const is_loading = ref(false)

function validateForm() {
  // Reset errors
  errors.email = ''
  errors.password = ''

  // Validate
  if (!form.email) {
    errors.email = 'Email là bắt buộc'
    return false
  }

  if (!form.password) {
    errors.password = 'Mật khẩu là bắt buộc'
    return false
  }

  return true
}

async function handleLogin() {
  if (!validateForm()) return

  is_loading.value = true

  try {
    // API call
    await loginAPI(form.email, form.password)

    toast.success('Đăng nhập thành công!')

    // Redirect
    router.push('/dashboard')
  } catch (error) {
    toast.error('Đăng nhập thất bại. Vui lòng thử lại.')
  } finally {
    is_loading.value = false
  }
}
</script>

<template>
  <div class="login-page min-h-screen flex items-center justify-center p-4">
    <div class="login-card max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <Icon name="logo" :size="64" />
      </div>

      <!-- Heading -->
      <h1 class="text-3xl font-bold text-center mb-2">
        Đăng nhập tài khoản
      </h1>
      <p class="text-neutral-600 text-center mb-8">
        Nhập thông tin để tiếp tục
      </p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <Input
          v-model="form.email"
          type="text"
          icon="mail"
          placeholder="Email"
          :error="!!errors.email"
          :errorMessage="errors.email"
        />

        <!-- Password -->
        <Input
          v-model="form.password"
          type="password"
          placeholder="Mật khẩu"
          :error="!!errors.password"
          :errorMessage="errors.password"
        />

        <!-- Remember me -->
        <div class="flex items-center justify-between">
          <Checkbox
            v-model="form.remember_me"
            label="Ghi nhớ đăng nhập"
          />

          <a href="/forgot-password" class="text-sm text-primary-600 hover:text-primary-700">
            Quên mật khẩu?
          </a>
        </div>

        <!-- Submit -->
        <Button
          variant="primary"
          size="lg"
          type="submit"
          :loading="is_loading"
          class="w-full"
        >
          Đăng nhập
        </Button>

        <!-- Google Login -->
        <Button
          variant="secondary"
          size="lg"
          icon="google"
          class="w-full"
        >
          Đăng nhập với Google
        </Button>
      </form>

      <!-- Sign up link -->
      <p class="text-center mt-6 text-sm text-neutral-600">
        Chưa có tài khoản?
        <a href="/register" class="text-primary-600 hover:text-primary-700 font-medium">
          Đăng ký ngay
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
</style>
```

---

## 🎯 Component Priority Matrix

Khi implement Figma design, sử dụng theo thứ tự:

### 1. Form Components
```
Button       → @/components/custom/button       ✅ ALWAYS
Input        → @/components/custom/input        ✅ ALWAYS
Checkbox     → @/components/custom/checkbox     ✅ ALWAYS
Switch       → @/components/custom/switch       ✅ ALWAYS
```

### 2. Display Components
```
Icon         → @/components/custom/icon         ✅ ALWAYS
Tooltip      → @/components/custom/tooltip      ✅ ALWAYS
```

### 3. Layout Components
```
Tabs         → @/components/custom/tabs         ✅ ALWAYS
Dropdown     → @/components/custom/dropdown     ✅ ALWAYS
Drawer       → @/components/custom/drawer       ✅ ALWAYS
```

### 4. Feedback Components
```
Toast        → vue-sonner (imported globally)   ✅ ALWAYS
Loading      → @/components/custom/loading      ✅ ALWAYS
```

### 5. Khi nào dùng UI Components?

Chỉ khi:
- Custom component không tồn tại
- Cần unstyled primitive để build custom
- Cần Shadcn component không có trong custom

Example: Dialog, Alert Dialog, Scroll Area, Skeleton - có thể dùng từ UI nếu custom không có.

---

## 📝 Best Practices

### 1. Always Import từ Custom First

```typescript
// ✅ Correct
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'

// ❌ Wrong
import { Button } from '@/components/ui/button'
```

### 2. Use Proper Props

```vue
<!-- ✅ Correct - Full typed props -->
<Button
  variant="primary"
  size="lg"
  :loading="is_loading"
  icon="check"
>
  Submit
</Button>

<!-- ❌ Wrong - Missing props -->
<button class="btn-primary">Submit</button>
```

### 3. Handle States Properly

```vue
<script setup>
const is_loading = ref(false)
const has_error = ref(false)
const error_message = ref('')

async function handleSubmit() {
  is_loading.value = true
  has_error.value = false

  try {
    await submitForm()
  } catch (error) {
    has_error.value = true
    error_message.value = error.message
  } finally {
    is_loading.value = false
  }
}
</script>

<template>
  <Input
    v-model="form.email"
    :error="has_error"
    :errorMessage="error_message"
  />

  <Button
    :loading="is_loading"
    @click="handleSubmit"
  >
    Submit
  </Button>
</template>
```

---

**Last Updated:** 2026-01-30
**Priority:** Custom Components ALWAYS
