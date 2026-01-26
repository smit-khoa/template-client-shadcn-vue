# Confirm Component

Component Confirm Dialog dựa trên AlertDialog của shadcn/ui, được tùy chỉnh để dễ sử dụng cho các xác nhận từ người dùng.

## Cài đặt

```typescript
import { Confirm } from '@/components/custom/confirm'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Trạng thái hiển thị dialog (v-model) |
| `title` | `string` | `"Thông báo"` | Tiêu đề của dialog |
| `content` | `string` | `undefined` | Nội dung thông báo |
| `width` | `string \| number` | `425` | Chiều rộng dialog (px hoặc string với đơn vị) |
| `height` | `string \| number` | `250` | Chiều cao dialog (px hoặc string với đơn vị) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emit khi dialog mở/đóng |

## Slots

### `footer`
Slot để tùy chỉnh các nút action trong footer. Nếu không cung cấp, sẽ hiển thị nút Cancel và Continue mặc định.

## Sử dụng cơ bản

### Basic Confirm

```vue
<template>
  <Button @click="showConfirm = true">Open Confirm</Button>
  
  <Confirm 
    v-model="showConfirm"
    title="Xác nhận xóa"
    content="Bạn có chắc chắn muốn xóa mục này không?"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Confirm } from '@/components/custom/confirm';
import { Button } from '@/components/custom/button';

const showConfirm = ref(false);
</script>
```

### Custom Size

```vue
<template>
  <!-- Small dialog -->
  <Confirm 
    v-model="showSmall"
    title="Small Dialog"
    content="Nội dung ngắn"
    :width="300"
    :height="200"
  />
  
  <!-- Large dialog -->
  <Confirm 
    v-model="showLarge"
    title="Large Dialog"
    content="Nội dung dài hơn với nhiều thông tin chi tiết..."
    :width="600"
    :height="400"
  />
</template>
```

### Custom Footer Actions

```vue
<template>
  <Confirm 
    v-model="showDialog"
    title="Lưu thay đổi?"
    content="Bạn có muốn lưu các thay đổi trước khi thoát?"
  >
    <template #footer>
      <AlertDialogCancel @click="handleDontSave">Không lưu</AlertDialogCancel>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
      <AlertDialogAction @click="handleSave">Lưu</AlertDialogAction>
    </template>
  </Confirm>
</template>

<script setup>
import { ref } from 'vue';
import { Confirm } from '@/components/custom/confirm';
import {
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

const showDialog = ref(false);

const handleSave = () => {
  // Logic lưu
  console.log('Saving...');
  showDialog.value = false;
};

const handleDontSave = () => {
  // Logic không lưu
  console.log('Not saving');
  showDialog.value = false;
};
</script>
```

### Delete Confirmation

```vue
<template>
  <Button @click="confirmDelete">Delete Item</Button>
  
  <Confirm 
    v-model="showDeleteConfirm"
    title="Xác nhận xóa"
    content="Hành động này không thể hoàn tác. Bạn có chắc chắn?"
  >
    <template #footer>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
      <AlertDialogAction @click="handleDelete" class="bg-red-500 hover:bg-red-600">
        Xóa
      </AlertDialogAction>
    </template>
  </Confirm>
</template>

<script setup>
import { ref } from 'vue';
import { Confirm } from '@/components/custom/confirm';
import { Button } from '@/components/custom/button';
import {
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

const showDeleteConfirm = ref(false);

const confirmDelete = () => {
  showDeleteConfirm.value = true;
};

const handleDelete = async () => {
  // Thực hiện xóa
  // await deleteItem(); // Thay thế với logic xóa thực tế
  showDeleteConfirm.value = false;
  console.log('Item deleted');
};
</script>
```

### Warning Dialog

```vue
<template>
  <Confirm 
    v-model="showWarning"
    title="⚠️ Cảnh báo"
    content="Đây là một cảnh báo quan trọng. Vui lòng đọc kỹ trước khi tiếp tục."
  >
    <template #footer>
      <AlertDialogAction @click="showWarning = false">Đã hiểu</AlertDialogAction>
    </template>
  </Confirm>
</template>

<script setup>
import { ref } from 'vue';
import { Confirm } from '@/components/custom/confirm';
import { AlertDialogAction } from '@/components/ui/alert-dialog';

const showWarning = ref(false);
</script>
```

### Success Dialog

```vue
<template>
  <Confirm 
    v-model="showSuccess"
    title="✅ Thành công"
    content="Thao tác đã được thực hiện thành công!"
    :width="400"
    :height="200"
  >
    <template #footer>
      <AlertDialogAction @click="showSuccess = false">OK</AlertDialogAction>
    </template>
  </Confirm>
</template>

<script setup>
import { ref } from 'vue';
import { Confirm } from '@/components/custom/confirm';
import { AlertDialogAction } from '@/components/ui/alert-dialog';

const showSuccess = ref(false);
</script>
```

## Dynamic Content

```vue
<template>
  <Confirm 
    v-model="showDialog"
    :title="dynamicTitle"
    :content="dynamicContent"
  />
</template>

<script setup>
import { ref, computed } from 'vue';

const itemName = ref('Document.pdf');
const showDialog = ref(false);

const dynamicTitle = computed(() => `Xóa ${itemName.value}?`);
const dynamicContent = computed(() => 
  `Bạn có chắc chắn muốn xóa "${itemName.value}" không?`
);
</script>
```

## Composable Pattern

Bạn có thể tạo một composable để quản lý confirm dialog:

```vue
<script>
// useConfirm.js
import { ref } from 'vue';

export function useConfirm() {
  const isOpen = ref(false);
  const title = ref('');
  const content = ref('');
  const onConfirm = ref(() => {});
  
  const confirm = (options) => {
    title.value = options.title || 'Xác nhận';
    content.value = options.content || '';
    onConfirm.value = options.onConfirm || (() => {});
    isOpen.value = true;
  };
  
  const handleConfirm = () => {
    onConfirm.value();
    isOpen.value = false;
  };
  
  return {
    isOpen,
    title,
    content,
    confirm,
    handleConfirm
  };
}
</script>
```

Sử dụng composable:

```vue
<template>
  <Button @click="deleteItem">Delete</Button>
  
  <Confirm 
    v-model="isOpen"
    :title="title"
    :content="content"
  >
    <template #footer>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
      <AlertDialogAction @click="handleConfirm">Xác nhận</AlertDialogAction>
    </template>
  </Confirm>
</template>

<script setup>
import { useConfirm } from './useConfirm';

const { isOpen, title, content, confirm, handleConfirm } = useConfirm();

const deleteItem = () => {
  confirm({
    title: 'Xóa mục',
    content: 'Bạn có chắc chắn muốn xóa mục này?',
    onConfirm: () => {
      // Logic xóa
      console.log('Item deleted');
    }
  });
};
</script>
```

## Styling

Component sử dụng AlertDialog components từ shadcn/ui, do đó styling tuân theo theme của shadcn/ui. Bạn có thể tùy chỉnh thêm bằng cách:

1. Override CSS classes trong các component con (AlertDialogAction, AlertDialogCancel)
2. Sử dụng Tailwind classes trực tiếp trong slot footer
3. Điều chỉnh width/height thông qua props

## Notes

- Component sử dụng v-model để quản lý trạng thái open/close
- Width và height có thể truyền dạng number (tự động thêm px) hoặc string với đơn vị
- Footer slot cho phép tùy chỉnh hoàn toàn các action buttons
- Nên import AlertDialogAction và AlertDialogCancel từ `@/components/ui/alert-dialog` khi custom footer
- Dialog tự động đóng khi click vào backdrop hoặc nút Cancel (behavior của AlertDialog)
- Nội dung trong `height` prop có thể không hoạt động chính xác do cách Tailwind xử lý dynamic classes

## Dependencies

Component này phụ thuộc vào:
- `@/components/ui/alert-dialog` (từ shadcn/ui)
- Vue 3 Composition API