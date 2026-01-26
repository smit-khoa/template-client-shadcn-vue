# Accordion Component

Component Accordion cho phép hiển thị và ẩn nội dung với hiệu ứng slide up/down khi người dùng click vào tiêu đề.

## Cài đặt

```typescript
import { Accordion } from '@/components/custom/accordion'
```

## Sử dụng cơ bản

```vue
<template>
  <Accordion>
    <template #title>
      <h3>Tiêu đề Accordion</h3>
    </template>
    <template #content>
      <p>Nội dung bên trong accordion</p>
    </template>
  </Accordion>
</template>

<script setup>
import { Accordion } from '@/components/custom/accordion'
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Vô hiệu hóa khả năng toggle của accordion |
| `v-model` | `boolean` | `undefined` | Binding hai chiều để control trạng thái open/close |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `open` | `void` | Emit khi accordion được mở |
| `close` | `void` | Emit khi accordion được đóng |

## Slots

Component Accordion có 2 slots:

### `title`
- **Mô tả**: Nội dung hiển thị trong phần header của accordion, luôn hiển thị
- **Mặc định**: Không có

### `content`
- **Mô tả**: Nội dung sẽ được hiển thị/ẩn khi toggle accordion
- **Mặc định**: Không có

## Ví dụ nâng cao

### Accordion với v-model

```vue
<template>
  <div>
    <button @click="isOpen = !isOpen">
      Toggle từ bên ngoài
    </button>
    
    <Accordion v-model="isOpen">
      <template #title>
        <h3>Accordion với v-model</h3>
      </template>
      <template #content>
        <p>Accordion này có thể được control từ bên ngoài</p>
      </template>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Accordion } from '@/components/custom/accordion'

const isOpen = ref(false)
</script>
```

### Accordion với disabled state

```vue
<template>
  <Accordion :disabled="true">
    <template #title>
      <h3>Accordion bị vô hiệu hóa</h3>
    </template>
    <template #content>
      <p>Nội dung này không thể được xem vì accordion bị disabled</p>
    </template>
  </Accordion>
</template>
```

### Accordion với events

```vue
<template>
  <Accordion @open="handleOpen" @close="handleClose">
    <template #title>
      <h3>Accordion với event handlers</h3>
    </template>
    <template #content>
      <p>Check console để xem events</p>
    </template>
  </Accordion>
</template>

<script setup>
import { Accordion } from '@/components/custom/accordion'

const handleOpen = () => {
  console.log('Accordion đã được mở')
}

const handleClose = () => {
  console.log('Accordion đã được đóng')
}
</script>
```

### Accordion với icon và style tùy chỉnh

```vue
<template>
  <Accordion>
    <template #title>
      <div class="custom-header">
        <Icon name="chevron-right" />
        <span>Câu hỏi thường gặp</span>
      </div>
    </template>
    <template #content>
      <div class="custom-content">
        <p>Đây là nội dung trả lời cho câu hỏi...</p>
      </div>
    </template>
  </Accordion>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.custom-content {
  padding: 10px 16px;
  color: #666;
}
</style>
```

### Nhiều Accordion

```vue
<template>
  <div class="accordion-list">
    <Accordion v-for="(item, index) in faqs" :key="index">
      <template #title>
        {{ item.question }}
      </template>
      <template #content>
        <div style="padding: 0 16px 16px 16px;">
          {{ item.answer }}
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script setup>
import { Accordion } from '@/components/custom/accordion'

const faqs = [
  {
    question: 'Làm thế nào để sử dụng component này?',
    answer: 'Bạn chỉ cần import và sử dụng với 2 slots: title và content'
  },
  {
    question: 'Component có hỗ trợ animation không?',
    answer: 'Có, component có hiệu ứng slide up/down khi toggle'
  }
]
</script>

<style scoped>
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

## Styling

Component Accordion có cấu trúc HTML như sau:

```html
<div class="border rounded-[16px] overflow-hidden">
  <!-- Header (title slot) -->
  <div class="bg-white p-[16px] cursor-pointer">
    <!-- title slot content -->
  </div>
  
  <!-- Content (với transition) -->
  <div class="overflow-hidden">
    <div class="bg-white">
      <!-- content slot content -->
    </div>
  </div>
</div>
```

### Tùy chỉnh style

```vue
<template>
  <Accordion class="my-accordion">
    <!-- content -->
  </Accordion>
</template>

<style>
/* Override border và border-radius */
.my-accordion {
  border: 2px solid #007bff !important;
  border-radius: 8px !important;
}

/* Style cho header */
.my-accordion > div:first-child {
  background-color: #007bff !important;
  color: white;
}

/* Hover effect cho header */
.my-accordion > div:first-child:hover {
  background-color: #0056b3 !important;
}
</style>
```

## Tính năng

- ✅ Toggle mở/đóng khi click vào header
- ✅ Hiệu ứng slide up/down mượt mà (0.3s open, 0.2s close)
- ✅ Hỗ trợ v-model để control từ bên ngoài
- ✅ Hỗ trợ disabled state
- ✅ Emit events khi open/close
- ✅ Hỗ trợ nội dung tùy chỉnh qua slots
- ✅ Responsive và thân thiện với mobile
- ✅ Có thể style tùy chỉnh dễ dàng

## Animation Details

Component sử dụng Vue transition với các timing sau:
- **Open animation**: 0.3s ease-out
- **Close animation**: 0.2s ease-in
- **Max-height transition**: 0 → 100vh (open), 100vh → 0 (close)

## Browser Support

Component này hỗ trợ tất cả các trình duyệt hiện đại.