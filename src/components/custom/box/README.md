# Box Component

Component Box đơn giản với border, hỗ trợ các trạng thái default, selected và disabled. Thường được sử dụng cho các selection list, cards hoặc container.

## Props

| Prop    | Type                                    | Default     | Description        |
| ------- | --------------------------------------- | ----------- | ------------------ |
| `state` | `'default' \| 'selected' \| 'disabled'` | `'default'` | Trạng thái của box |
| `class` | `string`                                | `''`        | CSS class bổ sung  |

## Usage

### Basic Usage

```vue
<script setup>
import { Box } from "@/components/custom/box";
</script>

<template>
    <Box> Nội dung của box </Box>
</template>
```

### States

```vue
<!-- Default state -->
<Box state="default">
  Default state box
</Box>

<!-- Selected state -->
<Box state="selected">
  Selected state box
</Box>

<!-- Disabled state -->
<Box state="disabled">
  Disabled state box
</Box>
```

### With Icons

```vue
<Box>
  <div class="flex items-center gap-2">
    <Icon name="book" size="20" />
    <span>Box với icon</span>
  </div>
</Box>
```

### Custom Content

Box component sử dụng slot cho nội dung, có thể truyền bất kỳ nội dung nào:

```vue
<Box state="selected">
  <div class="flex justify-between items-center">
    <span>Left aligned text</span>
    <span class="text-sm text-gray-500">Right text</span>
  </div>
</Box>

<Box>
  <div>
    <p class="font-semibold">Title</p>
    <p class="text-sm text-gray-600">Description text</p>
  </div>
</Box>
```

### Selection List Example

```vue
<script setup>
import { ref } from "vue";
import { Box } from "@/components/custom/box";

const selectedOption = ref("option1");

const options = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" }
];
</script>

<template>
    <div class="space-y-3">
        <Box v-for="option in options" :key="option.id" :state="selectedOption === option.id ? 'selected' : 'default'" @click="selectedOption = option.id">
            {{ option.label }}
        </Box>
    </div>
</template>
```

### Multi-select Example

```vue
<script setup>
import { ref } from "vue";

const selectedItems = ref([]);

const toggleItem = id => {
    const index = selectedItems.value.indexOf(id);
    if (index > -1) {
        selectedItems.value.splice(index, 1);
    } else {
        selectedItems.value.push(id);
    }
};

const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
];
</script>

<template>
    <div class="space-y-3">
        <Box v-for="item in items" :key="item.id" :state="selectedItems.includes(item.id) ? 'selected' : 'default'" @click="toggleItem(item.id)">
            {{ item.name }}
        </Box>
    </div>
</template>
```

### With Custom Width

```vue
<!-- Narrow box -->
<Box class="max-w-xs">
  Narrow width box
</Box>

<!-- Wide box -->
<Box class="max-w-2xl">
  Wide box with more content
</Box>

<!-- With shadow -->
<Box class="shadow-lg">
  Box with shadow
</Box>
```

## Styling

Component sử dụng các CSS variables:

-   Default: Border `var(--border)` (#e1ecf4)
-   Selected: Background `#e7fdf8`, border `var(--border-primary)` (#0ff0bb)
-   Disabled: Opacity 40%, cursor not-allowed

## Features

-   Smooth transitions với duration 200ms
-   Click handling (cursor pointer cho default và selected states)
-   Disabled state với opacity và cursor not-allowed
-   Flexible content với slot
-   Responsive với padding px-[12px] py-[10px]
-   Border radius xl (rounded-xl)

## Notes

-   Default state có hover effect: background `var(--button-secondary-bg-hover)`
-   Khi disabled, box vẫn có thể nhận click event nhưng cursor sẽ hiển thị not-allowed
-   Sử dụng CSS variables cho màu border để dễ dàng customize
-   Padding và border-radius cố định theo thiết kế (px-12px py-10px, rounded-xl)
