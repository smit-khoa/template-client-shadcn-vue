# Search Component

Component search input với icon và các trạng thái theo thiết kế Figma.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Giá trị của input (v-model) |
| `placeholder` | `string` | `'Tìm kiếm'` | Placeholder text |
| `disabled` | `boolean` | `false` | Vô hiệu hóa input |
| `readonly` | `boolean` | `false` | Chỉ đọc |
| `debounce` | `number` | `300` | Delay (ms) trước khi emit search event |
| `type` | `string` | `'text'` | HTML input type |
| `class` | `string` | `''` | CSS class cho input element |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emit khi giá trị thay đổi |
| `search` | `string` | Emit sau khi debounce delay |
| `focus` | `FocusEvent` | Emit khi input được focus |
| `blur` | `FocusEvent` | Emit khi input mất focus |
| `enter` | `string` | Emit khi nhấn Enter |

## Methods

Component expose các methods sau thông qua ref:

| Method | Description |
|--------|-------------|
| `focus()` | Focus vào input |
| `blur()` | Blur khỏi input |

## Sử dụng

### Basic
```vue
<template>
  <Search v-model="searchTerm" @search="handleSearch" />
</template>

<script setup>
import { ref } from 'vue';
const searchTerm = ref('');

const handleSearch = (value) => {
  console.log('Searching for:', value);
};
</script>
```

### Các trạng thái

Component có 4 trạng thái chính:

1. **Default**: Border `#e1ecf4`, background trắng
2. **Hover**: Background `rgba(218,230,244,0.7)`, border `#e1ecf4`
3. **Focus/Active**: Border `#0ff0bb` (Primary/500), background trắng
4. **Typing**: Hiển thị cursor animate màu `#0FF0BB` khi focus và có nội dung

```vue
<Search placeholder="Tìm kiếm" />
```

### Ví dụ tìm kiếm thời gian thực
```vue
<Search 
  v-model="searchTerm" 
  placeholder="Nhập thông tin"
  @search="performSearch"
/>
```

### Custom debounce
```vue
<!-- No debounce -->
<Search :debounce="0" @search="instantSearch" />

<!-- Long debounce (1 second) -->
<Search :debounce="1000" @search="delayedSearch" />
```

### Disabled và Readonly
```vue
<!-- Disabled state -->
<Search :disabled="true" placeholder="Tìm kiếm" />

<!-- Readonly state -->
<Search :readonly="true" model-value="Chỉ đọc" />
```

### Custom styling
```vue
<!-- Wrap in container for width control -->
<div class="max-w-md">
  <Search 
    class="border-2 border-blue-500"
    placeholder="Custom border"
  />
</div>

<!-- Custom rounded corners -->
<Search 
  class="rounded-full"
  placeholder="Rounded full"
/>
```

### Using methods
```vue
<template>
  <div>
    <Search ref="searchRef" v-model="searchTerm" />
    <Button @click="focusSearch">Focus Search</Button>
    <Button @click="clearSearch">Clear Search</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchRef = ref();
const searchTerm = ref('');

const focusSearch = () => {
  searchRef.value?.focus();
};

const clearSearch = () => {
  searchTerm.value = '';
};
</script>
```

### Handle Enter key
```vue
<Search 
  v-model="searchTerm"
  @enter="submitSearch"
  placeholder="Press Enter to search"
/>
```

### Ví dụ đầy đủ
```vue
<template>
  <div class="p-4">
    <Search
      v-model="searchQuery"
      :debounce="500"
      placeholder="Tìm kiếm sản phẩm..."
      @search="handleSearch"
      @enter="handleEnter"
    />
    
    <div v-if="results.length" class="mt-4">
      <h3>Kết quả tìm kiếm:</h3>
      <ul>
        <li v-for="item in results" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const results = ref([]);

const handleSearch = async (query) => {
  if (!query) {
    results.value = [];
    return;
  }
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  results.value = [
    { id: 1, name: `Result for "${query}" 1` },
    { id: 2, name: `Result for "${query}" 2` },
  ];
};

const handleEnter = (query) => {
  console.log('Submit search:', query);
};
</script>
```

## Styling Details

### Dimensions
- Height: 36px cố định
- Padding: 10px vertical, 12px right, 40px left (cho icon)
- Border radius: 12px (rounded-xl)
- Icon size: 20x20px, vị trí absolute left 10px

### Colors & States
- **Default**: 
  - Border: `#e1ecf4`
  - Text: `#718096`
  - Background: white
- **Hover**: 
  - Background: `rgba(218,230,244,0.7)`
  - Border: `#e1ecf4`
  - Text: `#718096`
- **Focus**: 
  - Border: `#0ff0bb` (Primary/500)
  - Text: `#0d0d0d`
  - Background: white
- **Disabled**: 
  - Opacity: 40%
  - Cursor: not-allowed

### Typography
- Font family: Inter Tight
- Font weight: 500 (medium)
- Font size: 14px
- Line height: 20px

## Ghi chú

- Icon search luôn hiển thị bên trái, không thể ẩn hoặc thay đổi
- Component tự động focus/blur khi được gọi method tương ứng
- Hỗ trợ tất cả native input attributes thông qua `v-bind="$attrs"`
- Debounce mặc định 300ms, có thể tùy chỉnh hoặc tắt bằng `debounce="0"`
- Không có nút clear built-in, cần clear value thủ công qua v-model
- Width mặc định 100% của container cha