# Drawer Component

Component drawer mở từ bên phải dựa trên Sheet component với các tùy chọn điều khiển đóng.

## Features

- ✨ Mở từ bên phải màn hình với animation mượt mà
- 📱 Responsive design với margin 10px xung quanh
- 🎯 Hỗ trợ priority mode và confirm mode
- 💅 Tùy chỉnh styling linh hoạt
- 📜 Content area có scrollbar tự động khi nội dung dài
- 🚪 Hỗ trợ slot structured hoặc custom layout
- 🔄 Hỗ trợ resize bằng cách kéo cạnh trái của drawer

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Trạng thái mở/đóng của drawer (v-model) |
| `width` | `string` | `"max-content"` | Chiều rộng của drawer (CSS width value) |
| `class` | `string` | `""` | CSS class tùy chỉnh cho drawer content |
| `isPriority` | `boolean` | `false` | Không cho phép đóng khi click outside hoặc ESC |
| `isConfirm` | `boolean` | `false` | Yêu cầu xác nhận trước khi đóng |

## Events

| Event | Description |
|-------|-------------|
| `update:modelValue` | Emit khi drawer mở/đóng |
| `confirm-close` | Emit khi cần xác nhận đóng (khi `isConfirm=true`) |
| `open` | Emit khi drawer mở |
| `close` | Emit khi drawer đóng |

## Slots

Component hỗ trợ 2 cách sử dụng slots:

### 1. Structured Slots
- `header`: Phần header của drawer
- `content`: Phần nội dung chính (có scrollbar nếu content dài)
- `footer`: Phần footer (thường chứa các buttons)

### 2. Default Slot
- Sử dụng slot mặc định để có toàn quyền kiểm soát layout

## Methods

Component expose các methods sau thông qua ref:
- `open()`: Mở drawer
- `close()`: Đóng drawer

## Sử dụng

### Basic Drawer
```vue
<template>
  <button @click="isOpen = true">Open Drawer</button>
  
  <Drawer v-model="isOpen">
    <template #header>
      <h3 class="text-lg font-semibold">Drawer Title</h3>
    </template>
    <template #content>
      <p>Your content here</p>
    </template>
    <template #footer>
      <button @click="isOpen = false">Close</button>
    </template>
  </Drawer>
</template>

<script setup>
import { ref } from 'vue'
import { Drawer } from './index'

const isOpen = ref(false)
</script>
```

### Custom Width Drawer
```vue
<Drawer 
  v-model="isOpen" 
  width="600px"
>
  <template #content>
    <p>This drawer has a custom width of 600px!</p>
  </template>
</Drawer>
```

### Priority Mode
```vue
<Drawer 
  v-model="isOpen" 
  :isPriority="true"
>
  <template #content>
    <p>This drawer cannot be closed by clicking outside!</p>
    <p>ESC key is also disabled.</p>
  </template>
  <template #footer>
    <button @click="isOpen = false">Close</button>
  </template>
</Drawer>
```

### Confirm Before Close
```vue
<template>
  <Drawer 
    v-model="isOpen" 
    :isConfirm="true"
    @confirm-close="handleConfirmClose"
  >
    <template #content>
      <p>Content with unsaved changes...</p>
    </template>
  </Drawer>
</template>

<script setup>
const handleConfirmClose = () => {
  if (confirm('You have unsaved changes. Close anyway?')) {
    isOpen.value = false
  }
}
</script>
```

### Custom Styling
```vue
<Drawer 
  v-model="isOpen"
  class="custom-drawer-class"
  width="500px"
>
  <template #content>
    <p>Drawer with custom styling via CSS classes</p>
  </template>
</Drawer>
```

### Using Default Slot
```vue
<Drawer v-model="isOpen">
  <div class="h-full flex flex-col">
    <div class="p-4 bg-primary text-white">
      <h3>Custom Header</h3>
    </div>
    <div class="flex-1 p-4">
      <p>Custom content layout</p>
    </div>
    <div class="p-4 border-t">
      <button @click="isOpen = false">Close</button>
    </div>
  </div>
</Drawer>
```

### Control via Ref
```vue
<template>
  <button @click="openDrawer">Open</button>
  <button @click="closeDrawer">Close</button>
  
  <Drawer ref="drawerRef" v-model="isOpen">
    <template #content>
      <p>Controlled via ref methods</p>
    </template>
  </Drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawerRef = ref()
const isOpen = ref(false)

const openDrawer = () => {
  drawerRef.value?.open()
}

const closeDrawer = () => {
  drawerRef.value?.close()
}
</script>
```


### Scrollable Content
```vue
<Drawer v-model="isOpen">
  <template #header>
    <h3>Long Content</h3>
  </template>
  <template #content>
    <div class="space-y-4">
      <div v-for="i in 20" :key="i" class="p-4 bg-gray-100 rounded">
        <h4>Item {{ i }}</h4>
        <p>Long content that will make the drawer scrollable...</p>
      </div>
    </div>
  </template>
</Drawer>
```

## Styling

### Kích thước mặc định
- Width: max-content (tự động theo nội dung)
- Height: calc(100vh - 20px) với margin 10px
- Border radius: 16px
- Max width: calc(100vw - 20px)

### Layout Structure
```
┌─────────────────────────┐
│ Header (optional)       │
├─────────────────────────┤
│ Content (scrollable)    │
│ flex-1 overflow-y-auto  │
├─────────────────────────┤
│ Footer (optional)       │
└─────────────────────────┘
```

### Animations
- Slide in từ phải sang trái
- Smooth transitions với duration 300ms
- Content area fade in/out

### Custom CSS Classes
- `.drawer-header`: Padding 24px horizontal, 10px vertical
- `.drawer-content`: Flex-1, scrollable, padding 24px horizontal, 10px vertical
- `.drawer-footer`: Padding 24px horizontal, 10px vertical, border-top
- `.sm-drawer-content`: Custom class cho sheet content với transparent background

## Resize Feature

Drawer hỗ trợ tính năng resize bằng cách kéo:
- Di chuột vào cạnh trái của drawer sẽ xuất hiện thanh resize
- Click và kéo để thay đổi kích thước drawer
- Kích thước tối thiểu: 250px
- Kích thước tối đa: calc(100vw - 20px)

## Notes

- Component sử dụng Sheet components từ UI library
- Chỉ mở từ bên phải màn hình
- Tự động lock scroll khi drawer mở
- Hỗ trợ ESC để đóng (trừ khi `isPriority=true` hoặc `isConfirm=true`)
- Content area có custom scrollbar cho nội dung dài
- Responsive với margin 10px xung quanh drawer
- Background trắng với shadow-lg
- Width prop có thể không hoạt động chính xác với Tailwind dynamic classes do cách Tailwind xử lý