# Button Component

Component button với 3 variants theo thiết kế mới, hỗ trợ các trạng thái loading, disabled và hover.

## Props

| Prop       | Type                                     | Default     | Description                   |
| ---------- | ---------------------------------------- | ----------- | ----------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'noborder'` | `'primary'` | Style variant của button      |
| `size`     | `'default' \| 'sm' \| 'lg'`              | `'default'` | Kích thước button             |
| `disabled` | `boolean`                                | `false`     | Vô hiệu hóa button            |
| `loading`  | `boolean`                                | `false`     | Hiển thị loading spinner      |
| `type`     | `'button' \| 'submit' \| 'reset'`        | `'button'`  | HTML button type              |
| `icon`     | `string`                                 | `undefined` | Tên icon để hiển thị (nếu có) |
| `class`    | `string`                                 | `''`        | CSS class bổ sung             |

## Variants

### Primary

Button chính với gradient xanh lá, dùng cho các action quan trọng nhất.

```vue
<Button variant="primary">Thêm tài sản</Button>
```

### Secondary

Button phụ với nền xám nhạt và viền, dùng cho các action phụ.

```vue
<Button variant="secondary">Button</Button>
```

### No Border

Button không viền với text màu xanh dương, dùng cho các action text-only.

```vue
<Button variant="noborder">Button</Button>
```

## Sizes

```vue
<Button size="sm">Small (12px)</Button>
<Button size="default">Default (13px)</Button>
<Button size="lg">Large (14px)</Button>
```

## States

### Default State

```vue
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="noborder">No Border</Button>
```

### Hover State

-   Primary: opacity 0.8
-   Secondary: background đậm hơn
-   No Border: opacity 0.8

### Disabled State

```vue
<Button :disabled="true">Disabled Primary</Button>
<Button variant="secondary" :disabled="true">Disabled Secondary</Button>
<Button variant="noborder" :disabled="true">Disabled No Border</Button>
```

### Loading State

Khi loading, button sẽ hiển thị icon "book" với animation xoay (animate-spin).

```vue
<Button :loading="true">Loading...</Button>
<Button variant="secondary" :loading="true">Processing</Button>
<Button variant="noborder" :loading="true">Please wait</Button>
```

## With Icons

Button hỗ trợ hiển thị icon thông qua prop `icon`. Kích thước icon tự động điều chỉnh theo size của button:

-   Size `sm`: icon 16px
-   Size `default`: icon 20px
-   Size `lg`: icon 20px
-   Variant `noborder`: luôn dùng icon 16px

```vue
<Button icon="add">Thêm tài sản</Button>
<Button variant="secondary" icon="tag">Button</Button>
<Button variant="noborder" icon="add">Button</Button>
```

## Width Options

```vue
<!-- Max-content (default) -->
<Button>Auto Width</Button>

<!-- Full width using Tailwind class -->
<Button class="w-full">Full Width Button</Button>
```

## Form Usage

```vue
<form @submit.prevent="handleSubmit">
  <Button type="submit">Submit</Button>
  <Button type="reset" variant="secondary">Reset</Button>
  <Button type="button" variant="noborder">Cancel</Button>
</form>
```

## Examples

### Interactive Button

```vue
<script setup>
import { ref } from "vue"

const isLoading = ref(false)

const handleClick = async () => {
    isLoading.value = true
    // Do async work
    await someAsyncOperation()
    isLoading.value = false
}
</script>

<template>
    <Button @click="handleClick" :loading="isLoading">
        {{ isLoading ? "Saving..." : "Save" }}
    </Button>
</template>
```

### Button Group

```vue
<div class="flex gap-2">
  <Button>Save</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="noborder">Help</Button>
</div>
```

## Styling

Button sử dụng các biến CSS global từ `globals.css`:

-   `--gradient`: Gradient cho button primary
-   `--button-secondary-bg`: Background cho button secondary
-   `--text-primary`, `--text-secondary`, `--text-link`: Màu text

## Notes

-   Button tự động disabled khi loading
-   Hỗ trợ tất cả native button attributes thông qua `v-bind="$attrs"`
-   Icon sử dụng component Icon có sẵn
-   Responsive và accessible
-   Transition mượt mà cho hover states
