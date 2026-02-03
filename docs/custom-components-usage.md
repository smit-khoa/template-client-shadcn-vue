# Custom Components Usage Guide

> **Hướng dẫn sử dụng chi tiết các components trong `src/components/custom`**

## Quy tắc quan trọng

**LUON LUON su dung components tu `src/components/custom` thay vi `src/components/ui`**

Ly do:
- Da duoc tuy chinh san cho project
- Co styling va variants phu hop voi design system
- Tich hop san icons, tooltips, loading states
- Props interface ro rang va de su dung
- Da test va stable

---

## Import Pattern

```typescript
// CORRECT - Import tu custom
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'
import { Icon } from '@/components/custom/icon'
import { Checkbox, CheckboxBlock } from '@/components/custom/checkbox'
import { Switch } from '@/components/custom/switch'
import { Tabs } from '@/components/custom/tabs'
import { Dropdown, DropdownItem, DropdownTitle } from '@/components/custom/dropdown'
import { Popup } from '@/components/custom/popup'
import { Confirm } from '@/components/custom/confirm'
import { Drawer } from '@/components/custom/drawer'
import { Search } from '@/components/custom/search'
import { Tooltip } from '@/components/custom/tooltip'
import { Toast, toast } from '@/components/custom/toast'
import { DatePicker } from '@/components/custom/datepicker'
import { TagInput } from '@/components/custom/tag-input'
import { FilterPanel, FilterTags } from '@/components/custom/filter'
import { Table, LayoutTable } from '@/components/custom/table'
import { AppTable } from '@/components/custom/app-table'
import { Accordion } from '@/components/custom/accordion'
import { Box } from '@/components/custom/box'
import { LoadDefault, LoadPage } from '@/components/custom/loading'
import { ThemeToggle } from '@/components/custom/theme-toggle'
import { Paging } from '@/components/custom/paging'

// WRONG - Khong dung UI components truc tiep
import { Button } from '@/components/ui/button' // BANNED
```

---

## 1. BUTTON

**Import:** `import { Button } from '@/components/custom/button'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `variant` | `"primary" \| "secondary" \| "noborder" \| "danger" \| "error" \| "success" \| "tool"` | `"primary"` | Kieu nut |
| `size` | `"default" \| "sm" \| "lg" \| "mini" \| "tiny"` | `"default"` | Kich thuoc |
| `disabled` | `boolean` | `false` | Vo hieu hoa nut |
| `loading` | `boolean` | `false` | Trang thai dang tai (hien spinner) |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Loai button HTML |
| `icon` | `string` | - | Ten icon hien thi ben trai text |
| `onlyIcon` | `boolean` | `false` | Chi hien thi icon, an text |
| `tooltip` | `string` | `""` | Noi dung tooltip khi hover |
| `color_icon` | `string` | `""` | Mau tuy chinh cho icon |
| `class` | `string` | - | CSS class tuy chinh |

### Emits

Khong dinh nghia emit. Support tat ca event cua `<button>` HTML thong qua `v-bind="$attrs"`

### Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung text cua button |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Button } from '@/components/custom/button'

const is_loading = ref(false)
</script>

<template>
  <!-- Primary button voi icon -->
  <Button variant="primary" size="lg" icon="check">
    Xac nhan
  </Button>

  <!-- Secondary button -->
  <Button variant="secondary" @click="handleCancel">
    Huy
  </Button>

  <!-- Danger button voi loading -->
  <Button variant="danger" :loading="is_loading">
    Xoa
  </Button>

  <!-- Icon only voi tooltip -->
  <Button
    variant="tool"
    size="mini"
    icon="settings"
    onlyIcon
    tooltip="Cai dat"
  />

  <!-- Icon voi custom color -->
  <Button icon="heart" color_icon="#ff0000">
    Yeu thich
  </Button>
</template>
```

---

## 2. INPUT

**Import:** `import { Input } from '@/components/custom/input'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `string \| number` | - | Gia tri input (v-model) |
| `type` | `"text" \| "number" \| "password" \| "currency"` | `"text"` | Loai input |
| `placeholder` | `string` | `"Nhap thong tin"` | Placeholder text |
| `disabled` | `boolean` | `false` | Vo hieu hoa input |
| `readonly` | `boolean` | `false` | Chi doc |
| `message` | `string` | `""` | Thong bao ho tro ben duoi input |
| `error` | `boolean` | `false` | Trang thai loi |
| `errorMessage` | `string` | `""` | Thong bao loi |
| `currency` | `string` | `"VND"` | Ky hieu tien te (khi type="currency") |
| `locale` | `string` | `"vi-VN"` | Locale de format currency |
| `suffix` | `string` | `""` | Hau to hien thi ben phai input |
| `icon` | `string` | `""` | Ten icon hien thi ben trai |
| `class` | `string` | - | CSS class tuy chinh |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `string \| number` | Cap nhat gia tri |
| `focus` | `FocusEvent` | Khi focus vao input |
| `blur` | `FocusEvent` | Khi blur ra khoi input |

### Slots

Khong co slots

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@/components/custom/input'

const email = ref('')
const password = ref('')
const amount = ref(0)
const has_error = ref(false)
</script>

<template>
  <!-- Basic input voi icon -->
  <Input
    v-model="email"
    type="text"
    icon="mail"
    placeholder="Nhap email"
  />

  <!-- Password input (tu dong co toggle show/hide) -->
  <Input
    v-model="password"
    type="password"
    placeholder="Mat khau"
    message="Toi thieu 8 ky tu"
  />

  <!-- Currency input -->
  <Input
    v-model="amount"
    type="currency"
    currency="VND"
    locale="vi-VN"
    placeholder="Nhap so tien"
  />

  <!-- Input voi error -->
  <Input
    v-model="email"
    :error="has_error"
    errorMessage="Email khong hop le"
    placeholder="Email"
  />

  <!-- Input voi suffix -->
  <Input
    v-model="weight"
    type="number"
    suffix="kg"
    placeholder="Can nang"
  />
</template>
```

---

## 3. CHECKBOX & CHECKBOXBLOCK

**Import:** `import { Checkbox, CheckboxBlock } from '@/components/custom/checkbox'`

### Checkbox Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean \| string \| number \| any[]` | `false` | Gia tri duoc chon (v-model) |
| `value` | `string \| number \| boolean` | - | Gia tri cua checkbox (dung voi mang) |
| `label` | `string` | `""` | Nhan hien thi ben canh checkbox |
| `disabled` | `boolean` | `false` | Vo hieu hoa checkbox |
| `type` | `"checkbox" \| "radio"` | `"checkbox"` | Loai input |
| `name` | `string` | `""` | Thuoc tinh name HTML |
| `class` | `string` | - | CSS class tuy chinh |

### Checkbox Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean \| string \| number \| any[]` | Cap nhat gia tri |
| `change` | `boolean \| string \| number \| any[]` | Khi gia tri thay doi |

### CheckboxBlock Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean \| string \| number \| any[]` | `false` | Gia tri duoc chon (v-model) |
| `label` | `string` | `""` | Nhan hien thi |
| `disabled` | `boolean` | `false` | Vo hieu hoa |
| `tooltip` | `string` | `""` | Tooltip khi hover |
| `type` | `"checkbox" \| "radio"` | `"checkbox"` | Loai input |
| `value` | `string \| number \| boolean` | `""` | Gia tri cua item |
| `class` | `string` | - | CSS class tuy chinh |

### CheckboxBlock Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean \| string \| number \| any[]` | Cap nhat gia tri |
| `click` | `MouseEvent` | Khi click vao |

### CheckboxBlock Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung label tuy chinh (thay the props.label) |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Checkbox, CheckboxBlock } from '@/components/custom/checkbox'

const agreed = ref(false)
const gender = ref('male')
const tags = ref([])
const plan = ref('basic')
</script>

<template>
  <!-- Checkbox don -->
  <Checkbox v-model="agreed" label="Toi dong y voi dieu khoan" />

  <!-- Radio buttons -->
  <Checkbox v-model="gender" type="radio" value="male" label="Nam" />
  <Checkbox v-model="gender" type="radio" value="female" label="Nu" />

  <!-- Multiple checkboxes (mang) -->
  <Checkbox v-model="tags" value="vue" label="Vue.js" />
  <Checkbox v-model="tags" value="react" label="React.js" />
  <Checkbox v-model="tags" value="angular" label="Angular" />

  <!-- CheckboxBlock -->
  <CheckboxBlock v-model="plan" value="basic" label="Goi co ban" />
  <CheckboxBlock v-model="plan" value="premium" label="Goi Premium" tooltip="Truy cap them tinh nang" />

  <!-- CheckboxBlock voi custom slot -->
  <CheckboxBlock v-model="favorite" value="star">
    <span class="flex items-center gap-2">
      <Icon name="star" />
      Yeu thich
    </span>
  </CheckboxBlock>
</template>
```

---

## 4. SWITCH

**Import:** `import { Switch } from '@/components/custom/switch'`

### Props

Ke thua tat ca props tu `SwitchRootProps` (Reka UI):

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | `false` | Trang thai bat/tat (v-model) |
| `disabled` | `boolean` | `false` | Vo hieu hoa |
| `defaultChecked` | `boolean` | - | Gia tri mac dinh khi chua control |
| `class` | `string` | - | CSS class tuy chinh |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean` | Cap nhat gia tri |

### Slots

| Slot | Mo ta |
|------|-------|
| `thumb` | Noi dung ben trong nut switch |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/custom/switch'

const is_dark = ref(false)
const notifications = ref(true)
</script>

<template>
  <!-- Switch co ban -->
  <Switch v-model="is_dark" />

  <!-- Voi label -->
  <label class="flex items-center gap-2">
    Che do toi
    <Switch v-model="is_dark" />
  </label>

  <!-- Disabled -->
  <Switch v-model="notifications" :disabled="true" />

  <!-- Custom thumb slot -->
  <Switch v-model="active">
    <template #thumb>
      <Icon v-if="active" name="check" class="text-white" :size="12" />
    </template>
  </Switch>
</template>
```

---

## 5. ICON

**Import:** `import { Icon } from '@/components/custom/icon'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `name` | `string` | **required** | Ten cua icon trong sprite SVG |
| `size` | `number \| string` | `24` | Kich thuoc icon (px hoac CSS value) |
| `color` | `string` | `"currentColor"` | Mau sac cua icon |
| `hoverColor` | `string` | `""` | Mau khi hover |
| `className` | `string` | `""` | CSS class bo sung |

### Emits

Khong co

### Slots

Khong co

### Vi du

```vue
<script setup>
import { Icon } from '@/components/custom/icon'
</script>

<template>
  <!-- Basic icon -->
  <Icon name="home" :size="24" />

  <!-- Custom color -->
  <Icon name="user" color="#269a85" :size="32" />

  <!-- Voi hover color -->
  <Icon
    name="heart"
    color="#999"
    hoverColor="#ff0000"
    :size="24"
  />

  <!-- Icon list -->
  <div class="flex gap-4">
    <Icon name="home" :size="24" />
    <Icon name="user" :size="24" />
    <Icon name="settings" :size="24" />
    <Icon name="mail" :size="24" />
    <Icon name="phone" :size="24" />
    <Icon name="search" :size="24" />
    <Icon name="filter" :size="24" />
    <Icon name="edit" :size="24" />
    <Icon name="delete" :size="24" />
    <Icon name="check" :size="24" />
    <Icon name="close" :size="24" />
  </div>
</template>
```

**Available Icons:** 94 icons trong `src/assets/icons/sprites.svg`

---

## 6. TOOLTIP

**Import:** `import { Tooltip } from '@/components/custom/tooltip'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `content` | `string` | `""` | Noi dung tooltip (dong text) |
| `class` | `string` | `""` | CSS class bo sung cho trigger element |

### Emits

Khong co

### Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung trigger (element ma hover vao) |
| `content` | Custom noi dung tooltip thay the `content` prop |

### Vi du

```vue
<script setup>
import { Tooltip } from '@/components/custom/tooltip'
</script>

<template>
  <!-- Basic tooltip -->
  <Tooltip content="Xoa muc nay">
    <button>Delete</button>
  </Tooltip>

  <!-- Voi custom slot -->
  <Tooltip>
    <button>More</button>
    <template #content>
      <span class="text-red-500">Xoa muc</span>
    </template>
  </Tooltip>
</template>
```

---

## 7. TOAST

**Import:** `import { Toast, toast } from '@/components/custom/toast'`

### Component Toast

**Props:** Khong co (wrapper component)

**Emits:** Khong co

**Slots:** Khong co

### toast API

```typescript
toast.success(message: string, options?: { description?: string })
toast.error(message: string, options?: { description?: string })
toast.warning(message: string, options?: { description?: string })
toast.info(message: string, options?: { description?: string })
```

**Cau hinh:** Duration = 4000ms, Position = top-right, Close button = co

### Vi du

```vue
<script setup>
import { Toast, toast } from '@/components/custom/toast'

function showSuccess() {
  toast.success('Thanh cong!', { description: 'Muc da duoc luu' })
}

function showError() {
  toast.error('Loi!', { description: 'Co loi xay ra' })
}

function showWarning() {
  toast.warning('Canh bao!', { description: 'Vui long kiem tra lai' })
}

function showInfo() {
  toast.info('Thong tin', { description: 'Thao tac hoan tat' })
}
</script>

<template>
  <!-- Render Toaster provider (dat trong App.vue) -->
  <Toast />

  <!-- Trigger toast -->
  <div class="flex gap-2">
    <button @click="showSuccess">Success</button>
    <button @click="showError">Error</button>
    <button @click="showWarning">Warning</button>
    <button @click="showInfo">Info</button>
  </div>
</template>
```

---

## 8. LOADING

**Import:** `import { LoadDefault, LoadPage } from '@/components/custom/loading'`

### LoadDefault

**Mo ta:** Loading spinner 9 cham xoay, kich thuoc 24x24px

**Props:** Khong co

**Vi du:**

```vue
<div style="--gradient: #269a85">
  <LoadDefault />
</div>
```

### LoadPage

**Mo ta:** Loading animation voi chu "LOADING"

**Props:** Khong co

**Vi du:**

```vue
<div class="flex justify-center items-center h-screen bg-white">
  <LoadPage />
</div>
```

---

## 9. TABS

**Import:** `import { Tabs } from '@/components/custom/tabs'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `tabs` | `{ key: string, title: string, icon?: string }[]` | `[]` | Mang cac tab |
| `modelValue` | `string` | `""` | Gia tri tab duoc chon (v-model) |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `string` | Phat khi nguoi dung chuyen doi tab |

### Slots

Khong co named slots - Component su dung du lieu tu props `tabs`

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Tabs } from '@/components/custom/tabs'

const active_tab = ref('tab1')
</script>

<template>
  <Tabs
    v-model="active_tab"
    :tabs="[
      { key: 'tab1', title: 'Tab 1', icon: 'home' },
      { key: 'tab2', title: 'Tab 2', icon: 'settings' }
    ]"
  />
</template>
```

---

## 10. ACCORDION

**Import:** `import { Accordion } from '@/components/custom/accordion'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | - | Trang thai mo/dong (v-model) |
| `disabled` | `boolean` | `false` | Vo hieu hoa kha nang mo/dong |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `open` | - | Phat khi accordion mo |
| `close` | - | Phat khi accordion dong |

### Slots

| Slot | Mo ta |
|------|-------|
| `title` | Phan tieu de accordion (co the click de mo/dong) |
| `content` | Phan noi dung hien thi khi accordion mo |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Accordion } from '@/components/custom/accordion'

const is_open = ref(false)
</script>

<template>
  <Accordion
    v-model="is_open"
    @open="console.log('Opened')"
    @close="console.log('Closed')"
  >
    <template #title>
      <h3>Tieu de Accordion</h3>
    </template>
    <template #content>
      <p>Noi dung accordion se hien thi o day</p>
    </template>
  </Accordion>
</template>
```

---

## 11. BOX

**Import:** `import { Box } from '@/components/custom/box'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `state` | `"default" \| "selected" \| "disabled"` | `"default"` | Trang thai hien thi |
| `class` | `string` | `""` | Lop CSS bo sung |

**States:**
- `default`: Border xam, hover hieu ung
- `selected`: Nen xanh nhat (#e7fdf8), border primary
- `disabled`: Opacity 40%, khong the tuong tac

### Emits

Khong co emits

### Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung ben trong box |

### Vi du

```vue
<script setup>
import { Box } from '@/components/custom/box'
</script>

<template>
  <Box state="default">
    <p>Noi dung mac dinh</p>
  </Box>

  <Box state="selected" class="cursor-pointer">
    <p>Box duoc chon</p>
  </Box>

  <Box state="disabled">
    <p>Box bi vo hieu hoa</p>
  </Box>
</template>
```

---

## 12. DRAWER

**Import:** `import { Drawer } from '@/components/custom/drawer'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | `false` | Trang thai mo/dong drawer (v-model) |
| `isPriority` | `boolean` | `false` | Ngan dong khi click ben ngoai |
| `isConfirm` | `boolean` | `false` | Yeu cau xac nhan truoc khi dong |
| `class` | `string` | `""` | Lop CSS bo sung |
| `width` | `string` | `"max-content"` | Chieu rong drawer |
| `hideClose` | `boolean` | `false` | An nut dong |
| `side` | `"left" \| "right"` | `"right"` | Vi tri drawer |
| `hasOverlay` | `boolean` | `false` | Co wrapper overlay ben trong |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean` | Cap nhat trang thai mo/dong |
| `confirm-close` | - | Phat khi nguoi dung co dong drawer voi `isConfirm=true` |
| `open` | - | Phat khi drawer mo |
| `close` | - | Phat khi drawer dong |

### Slots

| Slot | Mo ta |
|------|-------|
| `default` | Toan bo noi dung custom |
| `header` | Phan tieu de (tu dong co padding) |
| `content` | Phan noi dung chinh (overflow-y-auto) |
| `footer` | Phan footer voi border-top |

### Exposed Methods

| Method | Mo ta |
|--------|-------|
| `open()` | Mo drawer theo chuong trinh |
| `close()` | Dong drawer theo chuong trinh |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Drawer } from '@/components/custom/drawer'

const is_drawer_open = ref(false)
const drawer_ref = ref()
</script>

<template>
  <button @click="drawer_ref?.open()">Mo Drawer</button>

  <Drawer
    ref="drawer_ref"
    v-model="is_drawer_open"
    side="right"
    width="400px"
    :has-overlay="true"
    @open="console.log('Opened')"
    @close="console.log('Closed')"
  >
    <template #header>
      <h2>Tieu de Drawer</h2>
    </template>

    <template #content>
      <p>Noi dung Drawer</p>
    </template>

    <template #footer>
      <Button @click="is_drawer_open = false">Dong</Button>
    </template>
  </Drawer>
</template>
```

---

## 13. DROPDOWN

**Import:** `import { Dropdown, DropdownItem, DropdownTitle } from '@/components/custom/dropdown'`

### Dropdown Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | - | Trang thai mo/dong dropdown |
| `disabled` | `boolean` | `false` | Vo hieu hoa dropdown |
| `bodyHeight` | `string` | `"fit-content"` | Chieu cao noi dung |
| `position` | `"bottom" \| "top" \| "left" \| "right" \| "bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Vi tri hien thi |
| `priority` | `boolean` | `false` | Ngan chan dong khi click ben ngoai |
| `titleWidth` | `string` | `"fit-content"` | Chieu rong trigger button |
| `bodyWidth` | `string` | `"fit-content"` | Chieu rong noi dung |
| `title` | `string` | `"Chon"` | Tieu de dropdown |
| `class` | `string` | `""` | Class CSS custom cho trigger |
| `icon` | `string` | `""` | Ten icon hien thi |
| `noPadding` | `boolean` | `false` | Bo padding noi dung |
| `contentClass` | `string` | `""` | Class CSS custom cho noi dung |

### Dropdown Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `open` | - | Phat khi dropdown mo |
| `close` | - | Phat khi dropdown dong |
| `update:modelValue` | `boolean` | Cap nhat trang thai mo/dong |

### Dropdown Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung dropdown (DropdownItem) |
| `trigger` | Custom trigger button |

### DropdownItem Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `value` | `any` | `"Chon"` | Noi dung hien thi |
| `icon` | `string` | `""` | Ten icon |
| `state` | `"default" \| "selected" \| "disabled"` | `"default"` | Trang thai item |
| `tooltip` | `string` | `""` | Tooltip khi hover |
| `colorIcon` | `string` | `"currentColor"` | Mau icon |

### DropdownItem Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `click` | `MouseEvent` | Phat khi click item (khong phat neu disabled) |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Dropdown, DropdownItem } from '@/components/custom/dropdown'

const is_open = ref(false)
const selected = ref('')

function select(value) {
  selected.value = value
  is_open.value = false
}
</script>

<template>
  <Dropdown
    v-model="is_open"
    title="Chon tuy chon"
    icon="settings"
    position="bottom-start"
    bodyWidth="200px"
    @open="console.log('Opened')"
    @close="console.log('Closed')"
  >
    <DropdownItem value="Option 1" icon="check" @click="select('op1')" />
    <DropdownItem value="Option 2" state="selected" @click="select('op2')" />
    <DropdownItem value="Option 3" state="disabled" />
  </Dropdown>
</template>
```

---

## 14. POPUP

**Import:** `import { Popup } from '@/components/custom/popup'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | **required** | Trang thai mo/dong popup |
| `title` | `string` | `""` | Tieu de popup |
| `width` | `string` | `"max-content"` | Chieu rong noi dung |
| `height` | `string` | `"max-content"` | Chieu cao noi dung |
| `closeOnClickOutside` | `boolean` | `true` | Dong popup khi click ben ngoai |
| `isCustom` | `boolean` | `false` | Custom toan bo noi dung (bo header/footer mac dinh) |
| `hasWrapper` | `boolean` | `false` | Them glass effect wrapper ben ngoai |
| `rounded` | `string` | `"16px"` | Do cong goc |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean` | Cap nhat trang thai |
| `close` | - | Phat khi popup dong |

### Slots

| Slot | Mo ta |
|------|-------|
| `default` | Noi dung body (khi khong dung isCustom) |
| `header-icon` | Icon o header |
| `header-title` | Custom title o header |
| `footer` | Noi dung footer |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Popup } from '@/components/custom/popup'
import { Button } from '@/components/custom/button'

const show_popup = ref(false)
</script>

<template>
  <Button @click="show_popup = true">Mo Popup</Button>

  <Popup
    v-model="show_popup"
    title="Chi tiet"
    width="500px"
    height="400px"
    :closeOnClickOutside="true"
    @close="console.log('Closed')"
  >
    <!-- Body content -->
    <div class="p-4">Noi dung chinh</div>

    <!-- Footer -->
    <template #footer>
      <Button variant="primary" @click="save">Luu</Button>
      <Button variant="secondary" @click="show_popup = false">Huy</Button>
    </template>
  </Popup>
</template>
```

---

## 15. CONFIRM

**Import:** `import { Confirm } from '@/components/custom/confirm'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `boolean` | **required** | Trang thai mo/dong dialog |
| `title` | `string` | `"Thong bao"` | Tieu de dialog |
| `content` | `string` | `""` | Noi dung mo ta |
| `width` | `string \| number` | `400` | Chieu rong dialog (px) |
| `image` | `string` | `""` | URL anh hien thi tren cung |
| `loading` | `boolean` | `false` | Trang thai loading (disable cancel button) |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `boolean` | Cap nhat trang thai |
| `confirm` | - | Phat khi click nut "Xac nhan" |

### Slots

| Slot | Mo ta |
|------|-------|
| `content` | Custom content thay cho text `content` |
| `footer` | Custom footer buttons (mac dinh: Huy + Xac nhan) |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Confirm } from '@/components/custom/confirm'

const show_confirm = ref(false)
const is_loading = ref(false)

async function handleConfirm() {
  is_loading.value = true
  try {
    await deleteItem()
    show_confirm.value = false
  } finally {
    is_loading.value = false
  }
}
</script>

<template>
  <Confirm
    v-model="show_confirm"
    title="Xoa muc nay?"
    content="Ban chac chan muon xoa muc nay khong? Hanh dong nay khong the hoan tac."
    :width="400"
    :loading="is_loading"
    image="/images/warning.png"
    @confirm="handleConfirm"
  />
</template>
```

---

## 16. SEARCH

**Import:** `import { Search } from '@/components/custom/search'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `string` | `""` | Gia tri input (v-model) |
| `placeholder` | `string` | `"Tim kiem"` | Placeholder text |
| `disabled` | `boolean` | `false` | Vo hieu hoa input |
| `readonly` | `boolean` | `false` | Input chi doc |
| `debounce` | `number` | `300` | Thoi gian debounce (ms) truoc khi phat event `search` |
| `type` | `string` | `"text"` | Loai input |
| `class` | `string` | `""` | Class CSS custom |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `string` | Phat moi khi input thay doi |
| `search` | `string` | Phat voi delay debounce |
| `focus` | `FocusEvent` | Phat khi input focus |
| `blur` | `FocusEvent` | Phat khi input blur |
| `enter` | `string` | Phat khi nhan Enter |

### Exposed Methods

| Method | Mo ta |
|--------|-------|
| `focus()` | Focus input |
| `blur()` | Blur input |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Search } from '@/components/custom/search'

const keyword = ref('')
const search_ref = ref()

function handleSearch(value) {
  console.log('Searching:', value)
  // API call
}
</script>

<template>
  <Search
    ref="search_ref"
    v-model="keyword"
    placeholder="Tim kiem nguoi dung..."
    :debounce="300"
    @search="handleSearch"
    @enter="handleSearch"
  />

  <!-- Focus tu component khac -->
  <button @click="search_ref?.focus()">Focus Search</button>
</template>
```

---

## 17. DATEPICKER

**Import:** `import { DatePicker } from '@/components/custom/datepicker'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `{ start: Date \| null, end: Date \| null }` | `{ start: null, end: null }` | Khoang ngay duoc chon |
| `position` | `"bottom" \| "top" \| "bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Vi tri dropdown |
| `disabled` | `boolean` | `false` | Vo hieu hoa component |
| `class` | `string` | `""` | Custom CSS classes |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `{ start: Date \| null, end: Date \| null }` | Phat ra khi cap nhat khoang ngay |
| `confirm` | `{ start: Date \| null, end: Date \| null }` | Phat ra khi nhan nut Cap nhat |
| `cancel` | - | Phat ra khi nhan nut Huy |

### Slots

| Slot | Props | Mo ta |
|------|-------|-------|
| `trigger` | `{ startDate, endDate, displayText }` | Custom trigger button |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@/components/custom/datepicker'

const date_range = ref({ start: null, end: null })

function handleConfirm(value) {
  console.log('Confirmed:', value)
}
</script>

<template>
  <DatePicker
    v-model="date_range"
    position="bottom-start"
    @confirm="handleConfirm"
  >
    <template #trigger="{ displayText }">
      <button>{{ displayText }}</button>
    </template>
  </DatePicker>
</template>
```

---

## 18. TAGINPUT

**Import:** `import { TagInput } from '@/components/custom/tag-input'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `modelValue` | `string[]` | `[]` | Danh sach cac tag |
| `placeholder` | `string` | `"Nhap va nhan Enter..."` | Placeholder text |
| `disabled` | `boolean` | `false` | Vo hieu hoa component |
| `error` | `boolean` | `false` | Hien thi trang thai loi |
| `errorMessage` | `string` | - | Thong bao loi |
| `addOnPaste` | `boolean` | `true` | Tu dong them tag tu paste |
| `delimiter` | `RegExp \| string` | `/[,\s\n\t]+/` | Ky tu phan cach |
| `showAvatar` | `boolean` | `true` | Hien thi avatar tu ky tu dau tien |
| `validate` | `(value: string) => boolean` | - | Ham validate tag |
| `checkDuplicate` | `(value: string) => boolean` | - | Kiem tra trung lap tuy chinh |
| `class` | `string` | - | Custom CSS classes |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `update:modelValue` | `string[]` | Phat ra khi cap nhat danh sach tag |
| `add` | `string` | Phat ra khi them tag |
| `remove` | `string` | Phat ra khi xoa tag |
| `invalid` | `string` | Phat ra khi tag khong hop le |
| `duplicate` | `string` | Phat ra khi phat hien tag trung lap |

### Exposed Methods

| Method | Mo ta |
|--------|-------|
| `focus()` | Focus vao input |
| `clear()` | Xoa tat ca tag |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { TagInput } from '@/components/custom/tag-input'

const tags = ref(['Vue', 'TypeScript'])
const tag_input_ref = ref()

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
</script>

<template>
  <TagInput
    ref="tag_input_ref"
    v-model="tags"
    placeholder="Nhap email..."
    :validate="validateEmail"
    @add="tag => console.log('Added:', tag)"
    @duplicate="tag => console.error('Duplicate:', tag)"
  />
</template>
```

---

## 19. FILTER (FilterPanel & FilterTags)

**Import:** `import { FilterPanel, FilterTags } from '@/components/custom/filter'`

### Types

```typescript
interface FilterOption {
  value: string
  label: string
}

interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
}

interface FilterCategory {
  key: string
  label: string
  icon: string
  groups: FilterGroup[]
}
```

### FilterPanel Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `categories` | `FilterCategory[]` | `[]` | Mang cac danh muc bo loc |
| `selected` | `Record<string, string[]>` | `{}` | Cac bo loc da chon |

### FilterPanel Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `change` | `Record<string, string[]>` | Phat ra khi ap dung bo loc |
| `clear` | - | Phat ra khi xoa bo loc |

### FilterTags Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `categories` | `FilterCategory[]` | - | Danh muc bo loc (de lay icon va label) |
| `selected` | `Record<string, string[]>` | - | Cac bo loc da chon |

### FilterTags Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `remove` | `categoryKey: string, value: string` | Phat ra khi xoa mot tag |
| `clear-all` | - | Phat ra khi xoa tat ca tag |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { FilterPanel, FilterTags } from '@/components/custom/filter'

const selected = ref({})

const categories = [
  {
    key: 'status',
    label: 'Trang thai',
    icon: 'check-circle',
    groups: [
      {
        key: 'group1',
        label: 'Tong quat',
        options: [
          { value: 'active', label: 'Hoat dong' },
          { value: 'inactive', label: 'Khong hoat dong' }
        ]
      }
    ]
  }
]

function handleFilterChange(filters) {
  selected.value = filters
}

function handleRemoveTag(categoryKey, value) {
  const index = selected.value[categoryKey].indexOf(value)
  if (index > -1) {
    selected.value[categoryKey].splice(index, 1)
  }
}
</script>

<template>
  <FilterPanel
    :categories="categories"
    :selected="selected"
    @change="handleFilterChange"
  />

  <FilterTags
    :categories="categories"
    :selected="selected"
    @remove="handleRemoveTag"
    @clear-all="selected = {}"
  />
</template>
```

---

## 20. TABLE

**Import:** `import { Table, LayoutTable } from '@/components/custom/table'`

### Table Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `data` | `RowData[]` | **required** | Mang du lieu hang |
| `columns` | `Column[]` | **required** | Cau hinh cot |
| `showToolbar` | `boolean` | `true` | Hien thi thanh cong cu tren cung |
| `showGlobalFilter` | `boolean` | `true` | Hien thi bo loc toan cuc |
| `showFrozenControls` | `boolean` | `true` | Cho phep dong bang cot |
| `showCheckbox` | `boolean` | `false` | Hien thi checkbox chon hang |
| `showSorting` | `boolean` | `true` | Cho phep sap xep cot |
| `showColumnFilters` | `boolean` | `true` | Hien thi bo loc cot |
| `showColumnResize` | `boolean` | `true` | Cho phep thay doi kich thuoc cot |
| `showColorHighlighting` | `boolean` | `true` | To mau hang |
| `defaultRowGroups` | `string[]` | `[]` | Nhom hang mac dinh theo truong nay |
| `rowHeight` | `number` | `50` | Chieu cao hang (px) |
| `stripe` | `boolean` | `false` | Hang soc xen ke |
| `checkedConfig` | `{ selected: string[]; is_select_all: boolean }` | `{}` | Trang thai checkbox |
| `paging` | `{ page: number; limit: number; total: number; has_next_page: boolean }` | `{}` | Cau hinh phan trang |
| `showPaging` | `boolean` | `true` | Hien thi phan trang |
| `showTotal` | `boolean` | `false` | Hien thi tong cong |
| `loading` | `boolean` | `false` | Trang thai tai |
| `table_info` | `{ name: string; key_id: string }` | `{}` | Thong tin bang |
| `tools` | `string[]` | `[]` | Cong cu hien thi (refresh, custom-column, zoom, group) |
| `isBorder` | `boolean` | `false` | Vien bang |
| `pivotMode` | `boolean` | `false` | Bat che do pivot/tong hop |

### Table Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `row-select` | `{ rowId, selected, allSelected }` | Chon hang |
| `row-select-all` | `{ selected, allSelected }` | Chon tat ca hang |
| `sort-change` | `{ field, direction }` | Thay doi sap xep |
| `filter-change` | `{ field, value }` | Thay doi bo loc |
| `column-toggle` | `{ field, visible }` | Hien thi/an cot |
| `column-resize` | `{ field, width, action }` | Thay doi kich thuoc cot |
| `change-paging` | `{ page, limit }` | Thay doi phan trang |
| `refresh` | - | Lam moi du lieu |

### Types

```typescript
interface RowData {
  [key: string]: any
  id: number | string
  height?: number
  parentId?: string | null
  level?: number
  isSummary?: boolean
}

interface Column {
  field: string
  name: string
  width: number
  frozen?: boolean
  position?: "left" | "center" | "right"
  is_dimension?: boolean
  loading?: boolean
}
```

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { Table } from '@/components/custom/table'

const table_data = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
]

const table_columns = [
  { field: 'name', name: 'Ten', width: 150 },
  { field: 'email', name: 'Email', width: 200 }
]
</script>

<template>
  <Table
    :data="table_data"
    :columns="table_columns"
    :show-checkbox="true"
    :show-toolbar="true"
    :tools="['refresh', 'custom-column', 'zoom']"
    :paging="{ page: 1, limit: 25, total: 100, has_next_page: true }"
    @row-select="console.log"
    @sort-change="console.log"
    @change-paging="console.log"
  />
</template>
```

---

## 21. APPTABLE

**Import:** `import { AppTable } from '@/components/custom/app-table'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `data` | `any[]` | `[]` | Mang du lieu |
| `columns` | `Column[]` | `[]` | Cau hinh cot |
| `keyField` | `string` | `"id"` | Truong khoa chinh |
| `tableName` | `string` | `"app-table"` | Ten bang |
| `showLayoutToggle` | `boolean` | `false` | Hien thi nut chuyen doi layout |
| `defaultLayout` | `"list" \| "grid"` | `"grid"` | Layout mac dinh |
| `gridCols` | `number \| { sm?: number; md?: number; lg?: number; xl?: number }` | `{ sm: 2, md: 2, lg: 3, xl: 4 }` | So cot grid responsive |
| `showPagination` | `boolean` | `true` | Hien thi phan trang |
| `total` | `number` | `0` | Tong so muc |
| `itemsPerPage` | `number` | `20` | So muc moi trang |
| `currentPage` | `number` | `1` | Trang hien tai |
| `itemLabel` | `string` | `"tai khoan"` | Nhan muc |
| `itemsPerPageOptions` | `number[]` | `[20, 50, 100, 200, 500]` | Danh sach tuy chon so muc moi trang |
| `showCheckbox` | `boolean` | `false` | Hien thi checkbox |
| `loading` | `boolean` | `false` | Trang thai tai |
| `emptyImage` | `string` | `"/src/assets/images/no-data.png"` | Hinh anh trong |
| `emptyTitle` | `string` | `"Khong co du lieu"` | Tieu de trong |
| `emptyDescription` | `string` | `""` | Mo ta trong |
| `filterCategories` | `FilterCategory[]` | `[]` | Danh sach bo loc |
| `filterSelected` | `Record<string, string[]>` | `{}` | Bo loc duoc chon |
| `tools_use` | `string[]` | `[]` | Cong cu su dung (filter, export, search) |

### Emits

| Event | Payload | Mo ta |
|-------|---------|-------|
| `change-layout` | `"list" \| "grid"` | Thay doi layout |
| `change-page` | `number` | Thay doi trang |
| `change-items-per-page` | `number` | Thay doi so muc moi trang |
| `row-select` | `{ rowId, selected, allSelected }` | Chon hang |
| `row-select-all` | `{ selected, allSelected }` | Chon tat ca |
| `search` | `string` | Tim kiem |
| `refresh` | - | Lam moi |
| `filter-change` | `Record<string, string[]>` | Thay doi bo loc |
| `filter-clear` | - | Xoa bo loc |

### Slots

| Slot | Props | Mo ta |
|------|-------|-------|
| `header-left` | - | Slot ben trai thanh header |
| `platform-tabs` | - | Slot cho tabs nen tang |
| `actions-right` | - | Slot ben phai cac hanh dong |
| `grid-item` | `{ item, index }` | Slot cho moi muc grid |
| `col-{field}` | `slotProps` | Slot cho moi cot |

### Vi du

```vue
<script setup>
import { ref } from 'vue'
import { AppTable } from '@/components/custom/app-table'

const items = ref([])
const current_page = ref(1)
const total_items = ref(0)

const columns = [
  { field: 'name', name: 'Ten', width: 150 },
  { field: 'email', name: 'Email', width: 200 }
]
</script>

<template>
  <AppTable
    :data="items"
    :columns="columns"
    :show-layout-toggle="true"
    :default-layout="'grid'"
    :grid-cols="{ sm: 2, md: 3, lg: 4 }"
    :total="total_items"
    :current-page="current_page"
    :tools_use="['search', 'filter', 'export']"
    @change-layout="layout = $event"
    @change-page="current_page = $event"
    @search="handleSearch"
    @filter-change="handleFilterChange"
  >
    <template #header-left>
      <Tabs :tabs="['all', 'active']" />
    </template>

    <template #grid-item="{ item, index }">
      <Card :item="item" />
    </template>

    <template #col-name="{ value }">
      <span class="font-semibold">{{ value }}</span>
    </template>
  </AppTable>
</template>
```

---

## 22. THEMETOGGLE

**Import:** `import { ThemeToggle } from '@/components/custom/theme-toggle'`

### Props

Khong co props

### Emits

Khong co emits

### Slots

Khong co slot

### Vi du

```vue
<script setup>
import { ThemeToggle } from '@/components/custom/theme-toggle'
</script>

<template>
  <div class="flex items-center gap-4">
    <span>Che do giao dien:</span>
    <ThemeToggle />
  </div>
</template>
```

---

## 23. PAGING

**Import:** `import { Paging } from '@/components/custom/paging'`

### Props

| Prop | Type | Default | Mo ta |
|------|------|---------|-------|
| `itemsPerPage` | `number` | **required** | So muc moi trang |
| `total` | `number` | **required** | Tong so muc |
| `defaultPage` | `number` | **required** | Trang mac dinh |

### Vi du

```vue
<script setup>
import { Paging } from '@/components/custom/paging'
</script>

<template>
  <Paging :items-per-page="10" :total="100" :default-page="1" />
</template>
```

---

## Component Priority Matrix

Khi implement Figma design, su dung theo thu tu:

### Form Components
```
Button       -> @/components/custom/button       ALWAYS
Input        -> @/components/custom/input        ALWAYS
Checkbox     -> @/components/custom/checkbox     ALWAYS
Switch       -> @/components/custom/switch       ALWAYS
Search       -> @/components/custom/search       ALWAYS
TagInput     -> @/components/custom/tag-input    ALWAYS
DatePicker   -> @/components/custom/datepicker   ALWAYS
```

### Display Components
```
Icon         -> @/components/custom/icon         ALWAYS
Tooltip      -> @/components/custom/tooltip      ALWAYS
Table        -> @/components/custom/table        ALWAYS
AppTable     -> @/components/custom/app-table    ALWAYS
```

### Layout Components
```
Tabs         -> @/components/custom/tabs         ALWAYS
Accordion    -> @/components/custom/accordion    ALWAYS
Box          -> @/components/custom/box          ALWAYS
Dropdown     -> @/components/custom/dropdown     ALWAYS
Drawer       -> @/components/custom/drawer       ALWAYS
```

### Feedback Components
```
Toast        -> @/components/custom/toast        ALWAYS
Loading      -> @/components/custom/loading      ALWAYS
Popup        -> @/components/custom/popup        ALWAYS
Confirm      -> @/components/custom/confirm      ALWAYS
```

### Filter Components
```
FilterPanel  -> @/components/custom/filter       ALWAYS
FilterTags   -> @/components/custom/filter       ALWAYS
```

### Utility Components
```
ThemeToggle  -> @/components/custom/theme-toggle ALWAYS
Paging       -> @/components/custom/paging       ALWAYS
```

---

## Best Practices

### 1. Always Import tu Custom First

```typescript
// CORRECT
import { Button } from '@/components/custom/button'
import { Input } from '@/components/custom/input'

// WRONG
import { Button } from '@/components/ui/button'
```

### 2. Use Proper Props

```vue
<!-- CORRECT - Full typed props -->
<Button
  variant="primary"
  size="lg"
  :loading="is_loading"
  icon="check"
>
  Submit
</Button>

<!-- WRONG - Missing props -->
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

### 4. Use snake_case for Variables

```typescript
// CORRECT
const user_name = ref('')
const is_loading = ref(false)
const selected_items = ref([])

// WRONG
const userName = ref('')
const isLoading = ref(false)
```

### 5. Use camelCase for Functions

```typescript
// CORRECT
function handleSubmit() {}
function getUserById(id) {}
function validateForm() {}

// WRONG
function handle_submit() {}
function get_user_by_id(id) {}
```

---

**Last Updated:** 2026-02-03
**Total Components:** 23
**Priority:** Custom Components ALWAYS
