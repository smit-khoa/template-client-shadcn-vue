# Loading Components

Bộ component Loading gồm 2 loại: LoadDefault (spinner đơn giản) và LoadPage (text animation).

## Components

### 1. LoadDefault

Component loading spinner đơn giản, phù hợp cho loading trong các component nhỏ.

#### Đặc điểm
- Spinner tròn xoay liên tục
- Kích thước: 40x40px
- Màu sắc: Border xám (#f3f3f3) với top border xanh (#3498db)
- Animation: Xoay 360 độ trong 1s
- Padding: 20px xung quanh

#### Sử dụng

```vue
<template>
  <LoadDefault />
</template>

<script setup>
import { LoadDefault } from '@/components/custom/loading';
</script>
```

### 2. LoadPage

Component loading với text "LOADING" có hiệu ứng animation, phù hợp cho loading toàn trang.

#### Đặc điểm
- Text "LOADING" với từng chữ cái có animation riêng
- Hiệu ứng wave với delay tuần tự cho mỗi chữ
- Animation: hideAndSeek với cubic-bezier easing
- **Yêu cầu background màu hoặc gradient** (text trong suốt)

#### Sử dụng

```vue
<template>
  <!-- Cần background màu để text hiển thị -->
  <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-screen flex items-center justify-center">
    <LoadPage />
  </div>
</template>

<script setup>
import { LoadPage } from '@/components/custom/loading';
</script>
```

## Usage Examples

### Loading trong Button

```vue
<template>
  <button class="px-4 py-2 bg-blue-500 text-white rounded" :disabled="isLoading">
    <LoadDefault v-if="isLoading" class="inline-block w-4 h-4" />
    <span v-else>Submit</span>
  </button>
</template>
```

### Loading trong Card

```vue
<template>
  <div class="card">
    <div v-if="loading" class="p-8">
      <LoadDefault />
      <p class="text-center mt-4">Đang tải dữ liệu...</p>
    </div>
    <div v-else>
      <!-- Content -->
    </div>
  </div>
</template>
```

### Full Page Loading

```vue
<template>
  <div>
    <!-- Main content -->
    <div class="content">
      <!-- ... -->
    </div>
    
    <!-- Full page loading overlay -->
    <div 
      v-if="pageLoading"
      class="fixed inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center z-50"
    >
      <LoadPage />
    </div>
  </div>
</template>
```

### Loading trong Table

```vue
<template>
  <div class="table-container">
    <table v-if="!loading">
      <!-- Table content -->
    </table>
    <div v-else class="py-8">
      <LoadDefault />
      <p class="text-center text-gray-500 mt-4">Loading data...</p>
    </div>
  </div>
</template>
```

### Loading trong Modal

```vue
<template>
  <div class="modal">
    <div class="modal-header">
      <h3>Processing</h3>
    </div>
    <div class="modal-body">
      <LoadDefault />
      <p class="text-center mt-4">Please wait...</p>
    </div>
  </div>
</template>
```

### Loading với Skeleton

```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="i in 3" :key="i" class="card">
      <div class="h-32 bg-gray-200 animate-pulse mb-4"></div>
      <LoadDefault />
    </div>
  </div>
</template>
```

## Styling

### LoadDefault Styles

```scss
// Cấu trúc
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

// Spinner
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### LoadPage Styles

```css
/* Animation delay cho mỗi chữ */
--ANIMATION-DELAY-MULTIPLIER: 70ms;

/* L: delay 0ms */
/* O: delay 70ms */
/* A: delay 140ms */
/* D: delay 210ms */
/* I: delay 280ms */
/* N: delay 350ms */
/* G: delay 420ms */
```

## Custom Loading Spinner

Ví dụ tạo custom spinner:

```vue
<template>
  <div class="custom-spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style scoped>
.custom-spinner {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #3498db;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
```

## Performance Tips

1. **Lazy Loading**: Import loading components khi cần
```javascript
const LoadDefault = () => import('@/components/custom/loading/LoadDefault.vue');
```

2. **v-show vs v-if**: Dùng `v-show` cho loading thường xuyên toggle
```vue
<LoadDefault v-show="loading" />
```

3. **Debounce**: Tránh hiển thị loading cho request nhanh
```javascript
const showLoading = ref(false);
let loadingTimeout;

const startLoading = () => {
  loadingTimeout = setTimeout(() => {
    showLoading.value = true;
  }, 200); // Chỉ show sau 200ms
};

const stopLoading = () => {
  clearTimeout(loadingTimeout);
  showLoading.value = false;
};
```

## Accessibility

- Thêm `aria-label` cho screen readers
- Sử dụng `role="status"` cho loading indicators
- Thêm text description cho loading state

```vue
<div role="status" aria-label="Loading">
  <LoadDefault />
  <span class="sr-only">Loading...</span>
</div>
```

## Notes

- **LoadDefault**: Phù hợp cho mọi background, không yêu cầu đặc biệt
- **LoadPage**: Yêu cầu background màu/gradient vì text trong suốt
- Cả hai đều có animation smooth, không ảnh hưởng performance
- LoadPage animation có easing curve cho hiệu ứng tự nhiên
- Có thể tùy chỉnh màu sắc và kích thước qua CSS override