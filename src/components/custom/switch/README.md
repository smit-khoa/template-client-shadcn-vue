# Switch Component

Component switch toggle được xây dựng trên Reka UI với thiết kế tùy chỉnh theo Figma.

## Props

Component kế thừa tất cả props từ Reka UI SwitchRoot:

| Prop         | Type      | Default | Description                             |
| ------------ | --------- | ------- | --------------------------------------- |
| `modelValue` | `boolean` | `false` | Trạng thái bật/tắt của switch (v-model) |
| `disabled`   | `boolean` | `false` | Vô hiệu hóa switch                      |
| `required`   | `boolean` | `false` | Yêu cầu switch phải được bật            |
| `name`       | `string`  | -       | Name attribute cho form submission      |
| `id`         | `string`  | -       | ID cho element                          |
| `value`      | `string`  | `'on'`  | Value khi submit form                   |
| `class`      | `string`  | -       | CSS classes tùy chỉnh                   |

## Events

| Event            | Payload   | Description                         |
| ---------------- | --------- | ----------------------------------- |
| `update:checked` | `boolean` | Emit khi trạng thái switch thay đổi |

## Styling

Component sử dụng các biến CSS cho màu sắc:

-   `--gradient`: Gradient màu cho trạng thái checked (bật)
-   `--neutral`: Màu nền cho trạng thái unchecked (tắt)

### Kích thước

-   Container: 36x20px
-   Thumb: 16x16px
-   Border radius: Fully rounded

### Trạng thái

1. **Unchecked (Off)**: Background sử dụng `var(--neutral)`
2. **Checked (On)**: Background sử dụng `var(--gradient)`
3. **Disabled**: Opacity 50% và cursor not-allowed
4. **Focus**: Ring indicator với focus-visible

## Sử dụng

### Basic

```vue
<template>
    <Switch v-model="isEnabled" />
</template>

<script setup>
import { ref } from "vue"
import { Switch } from "@/components/custom/switch"

const isEnabled = ref(false)
</script>
```

### Với label

```vue
<template>
    <label class="flex items-center gap-2 cursor-pointer">
        <Switch v-model="notifications" id="notifications" />
        <span>Bật thông báo</span>
    </label>
</template>
```

### Disabled state

```vue
<!-- Disabled khi tắt -->
<Switch :modelValue="false" :disabled="true" />

<!-- Disabled khi bật -->
<Switch :modelValue="true" :disabled="true" />
```

### Trong form

```vue
<template>
    <form @submit.prevent="handleSubmit">
        <div class="flex items-center justify-between">
            <label for="emailNotif">Nhận email thông báo</label>
            <Switch v-model="settings.emailNotifications" id="emailNotif" name="emailNotifications" />
        </div>
    </form>
</template>
```

### Controlled component

```vue
<template>
    <div>
        <Switch :modelValue="isOn" @update:checked="handleUpdate" />
        <button @click="toggle">Toggle</button>
    </div>
</template>

<script setup>
import { ref } from "vue"

const isOn = ref(false)

const handleUpdate = value => {
    isOn.value = value
    console.log("Switch changed to:", value)
}

const toggle = () => {
    isOn.value = !isOn.value
}
</script>
```

### Custom thumb với slot

```vue
<template>
    <Switch v-model="value">
        <template #thumb>
            <div class="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </template>
    </Switch>
</template>
```

### Với custom class

```vue
<!-- Custom focus ring color -->
<Switch v-model="value" class="focus-visible:ring-blue-500 focus-visible:ring-offset-blue-100" />
```

## CSS Variables

Đảm bảo định nghĩa các biến CSS trong root hoặc component cha:

```css
:root {
    --gradient: linear-gradient(180deg, #0ff0bb 14.803%, #0cc096 43.219%, #09906a 100%);
    --neutral: #718096;
}
```

## Accessibility

-   Component hỗ trợ đầy đủ keyboard navigation (Space/Enter để toggle)
-   ARIA attributes được quản lý tự động bởi Reka UI
-   Hỗ trợ screen readers
-   Focus visible indicator cho keyboard users
-   Có thể sử dụng với label element thông qua id/for attributes

## Browser Support

Component hoạt động trên tất cả browsers hiện đại hỗ trợ:

-   CSS custom properties
-   CSS gradients
-   Flexbox
-   Transform và transition

## Notes

-   Component được xây dựng trên Reka UI's Switch primitive
-   Tự động xử lý form integration
-   Animation mượt mà với transition 200ms
-   Dark mode ready với Tailwind classes
-   Không sử dụng border để giữ thiết kế clean
