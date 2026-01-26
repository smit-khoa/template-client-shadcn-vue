# Popup Component

Component Popup/Modal đa năng với header, body và footer có thể tùy chỉnh hoàn toàn.

## Tính năng

- ✅ Header có thể tùy chỉnh với icon, title và extra content
- ✅ Footer tùy chọn cho các action buttons
- ✅ Hỗ trợ scroll cho nội dung dài
- ✅ Có thể cấu hình đóng khi click bên ngoài
- ✅ Responsive với max-width và max-height
- ✅ Hỗ trợ width và height tùy chỉnh
- ✅ Animation mượt mà khi mở/đóng
- ✅ Accessible với các thuộc tính ARIA phù hợp

## Cài đặt

```typescript
import { Popup } from '@/components/custom/popup'
```

## Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------------|
| `modelValue` | `boolean` | **required** | Trạng thái hiển thị/ẩn của popup (v-model) |
| `title` | `string` | `""` | Tiêu đề hiển thị ở header |
| `width` | `string` | `"max-content"` | Chiều rộng của popup (CSS value như "600px", "50vw", "max-content") |
| `height` | `string` | `"max-content"` | Chiều cao của popup (CSS value như "400px", "80vh", "max-content") |
| `closeOnClickOutside` | `boolean` | `true` | Có đóng popup khi click bên ngoài không |
| `isCustom` | `boolean` | `false` | Render hoàn toàn custom content, bỏ qua header/body/footer structure |

## Events

| Event | Payload | Mô tả |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emit khi trạng thái hiển thị thay đổi |

## Slots

| Slot | Mô tả |
|------|-------------|
| `default` | Nội dung chính của popup (body) |
| `header-icon` | Icon hiển thị bên trái title trong header |
| `header-title` | Nội dung title tùy chỉnh (ghi đè prop title) |
| `header-extra` | Nội dung bổ sung bên phải header (trước nút close) |
| `footer` | Nội dung footer. Footer chỉ hiển thị khi slot này có nội dung |

## Sử dụng cơ bản

### Popup đơn giản

```vue
<template>
  <Button @click="showPopup = true">Mở Popup</Button>
  
  <Popup 
    v-model="showPopup"
    title="Thông báo"
  >
    <p>Đây là nội dung thông báo.</p>
  </Popup>
</template>

<script setup>
import { ref } from 'vue';
import { Popup } from '@/components/custom/popup';

const showPopup = ref(false);
</script>
```

### Popup với Footer

```vue
<template>
  <Popup 
    v-model="showConfirm"
    title="Xác nhận xóa"
  >
    <p>Bạn có chắc chắn muốn xóa mục này?</p>
    <p class="text-sm text-gray-500 mt-2">
      Hành động này không thể hoàn tác.
    </p>
    
    <template #footer>
      <div class="flex gap-2 justify-end">
        <Button variant="outline" @click="showConfirm = false">
          Hủy
        </Button>
        <Button variant="destructive" @click="handleDelete">
          Xóa
        </Button>
      </div>
    </template>
  </Popup>
</template>
```

### Header tùy chỉnh

```vue
<template>
  <Popup v-model="showCustom" width="600px">
    <template #header-icon>
      <WarningIcon class="w-5 h-5 text-amber-500" />
    </template>
    
    <template #header-title>
      <span class="text-amber-600 font-semibold">
        Cảnh báo bảo mật
      </span>
    </template>
    
    <template #header-extra>
      <Badge variant="warning">Quan trọng</Badge>
    </template>
    
    <div class="p-4">
      <p>Nội dung cảnh báo...</p>
    </div>
  </Popup>
</template>
```

### Form trong Popup

```vue
<template>
  <Popup 
    v-model="showForm"
    title="Đăng ký tài khoản"
    width="500px"
    :close-on-click-outside="false"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">
          Email
        </label>
        <input 
          type="email" 
          v-model="formData.email"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">
          Mật khẩu
        </label>
        <input 
          type="password" 
          v-model="formData.password"
          class="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
    </form>
    
    <template #footer>
      <div class="flex gap-2 justify-between w-full">
        <Button variant="ghost" @click="showForm = false">
          Đã có tài khoản?
        </Button>
        <div class="flex gap-2">
          <Button variant="outline" @click="showForm = false">
            Hủy
          </Button>
          <Button @click="handleSubmit">
            Đăng ký
          </Button>
        </div>
      </div>
    </template>
  </Popup>
</template>
```

### Nội dung có scroll

```vue
<template>
  <Popup 
    v-model="showList"
    title="Danh sách sản phẩm"
    width="600px"
    height="500px"
  >
    <div class="space-y-2">
      <div 
        v-for="item in 100" 
        :key="item"
        class="p-3 border rounded hover:bg-gray-50"
      >
        Sản phẩm {{ item }}
      </div>
    </div>
    
    <template #footer>
      <Button @click="showList = false">Đóng</Button>
    </template>
  </Popup>
</template>
```

### Modal quan trọng (không đóng khi click ngoài)

```vue
<template>
  <Popup 
    v-model="showImportant"
    title="Điều khoản sử dụng"
    width="700px"
    :close-on-click-outside="false"
  >
    <div class="prose max-w-none">
      <p>Vui lòng đọc kỹ điều khoản trước khi tiếp tục...</p>
      <!-- Nội dung điều khoản -->
    </div>
    
    <template #footer>
      <div class="flex gap-2 justify-end">
        <Button variant="outline" @click="handleDecline">
          Từ chối
        </Button>
        <Button @click="handleAccept">
          Chấp nhận
        </Button>
      </div>
    </template>
  </Popup>
</template>
```

## Styling

Component sử dụng CSS utility classes (Tailwind CSS) và có thể tùy chỉnh thêm thông qua các class:

### Layout classes
- Container: Sử dụng `Dialog` và `DialogContent` từ UI library
- Header: `px-6 py-[22px] border-b`
- Body: `flex-1 overflow-y-auto px-6 py-6`
- Footer: `px-6 py-4 border-t`

### Tùy chỉnh style

```vue
<template>
  <Popup v-model="showStyled" title="Custom Styled">
    <div class="custom-popup-content">
      <!-- Nội dung với style tùy chỉnh -->
    </div>
  </Popup>
</template>

<style>
.custom-popup-content {
  background: linear-gradient(to bottom, #f0f9ff, #e0f2fe);
  padding: 2rem;
  border-radius: 8px;
}
</style>
```

## Best Practices

1. **Sử dụng v-model**: Luôn sử dụng `v-model` để quản lý state hiển thị
2. **Loading states**: Hiển thị loading spinner khi xử lý async operations
3. **Error handling**: Hiển thị lỗi rõ ràng trong popup
4. **Keyboard navigation**: Component hỗ trợ ESC để đóng (khi `closeOnClickOutside=true`)
5. **Mobile responsive**: Test trên các kích thước màn hình khác nhau
6. **Accessibility**: Thêm aria-label cho các button không có text

## Kích thước

### Giá trị mặc định
- Width: `"max-content"` - Tự động theo nội dung
- Height: `"max-content"` - Tự động theo nội dung

### Giá trị có thể sử dụng
- Pixel: `"600px"`, `"400px"`
- Viewport: `"80vw"`, `"90vh"`
- Percentage: `"50%"`, `"100%"`
- CSS values: `"max-content"`, `"min-content"`, `"fit-content"`

### Giới hạn tối đa
- Max width: `calc(100vw - 40px)`
- Max height: `calc(100vh - 40px)`

Điều này đảm bảo popup luôn hiển thị tốt trên mọi kích thước màn hình.

### Ví dụ kích thước

```vue
<!-- Kích thước cố định -->
<Popup width="800px" height="600px" />

<!-- Responsive với viewport -->
<Popup width="90vw" height="80vh" />

<!-- Chỉ định width, height tự động -->
<Popup width="600px" />

<!-- Mặc định - tự động theo nội dung -->
<Popup />
```

### Custom Content Mode

Khi sử dụng `isCustom=true`, component sẽ render hoàn toàn nội dung từ slot default, bỏ qua cấu trúc header/body/footer:

```vue
<template>
  <Popup 
    v-model="showCustom" 
    :isCustom="true"
    width="500px"
    height="400px"
  >
    <!-- Toàn bộ nội dung tùy chỉnh -->
    <div class="custom-popup">
      <div class="custom-header">
        <h2>Custom Header</h2>
        <button @click="showCustom = false">✕</button>
      </div>
      <div class="custom-body">
        <p>Nội dung hoàn toàn tùy chỉnh</p>
      </div>
      <div class="custom-footer">
        <button @click="handleAction">Action</button>
      </div>
    </div>
  </Popup>
</template>

<style>
.custom-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.custom-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}
.custom-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
.custom-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>
```

## Migration từ version cũ

Nếu bạn đang sử dụng component popup cũ, cần lưu ý:

1. Thay `visible` prop bằng `v-model`
2. Thay `onClose` event bằng `@update:modelValue`
3. Footer giờ là slot thay vì prop
4. Header có thể tùy chỉnh hoàn toàn qua slots