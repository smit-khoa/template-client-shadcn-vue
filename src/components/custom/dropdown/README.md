# Dropdown Component

Bộ component dropdown gồm 3 phần: Dropdown (container), DropdownTitle (trigger mặc định), và DropdownItem (các mục trong
dropdown).

## Components

### 1. Dropdown

Component chính chứa logic dropdown với trigger và content.

#### Props

| Prop         | Type       | Default          | Description                                        |
| ------------ | ---------- | ---------------- | -------------------------------------------------- |
| `v-model`    | `boolean`  | `false`          | Trạng thái mở/đóng của dropdown                    |
| `disabled`   | `boolean`  | `false`          | Vô hiệu hóa dropdown                               |
| `bodyHeight` | `string`   | `'fit-content'`  | Chiều cao của dropdown content                     |
| `position`   | `Position` | `'bottom-start'` | Vị trí hiển thị dropdown                           |
| `priority`   | `boolean`  | `false`          | Ngăn đóng khi click bên ngoài                      |
| `showArrow`  | `boolean`  | `true`           | Hiển thị mũi tên trong trigger mặc định            |
| `titleWidth` | `string`   | `'fit-content'`  | Chiều rộng của trigger (`'100%'`, `'300px'`, etc.) |
| `bodyWidth`  | `string`   | `'fit-content'`  | Chiều rộng dropdown (`'auto'` để match trigger)    |

#### Position Values

-   `'bottom'`, `'top'`, `'left'`, `'right'`
-   `'bottom-start'`, `'bottom-end'`
-   `'top-start'`, `'top-end'`

#### Events

| Event   | Description            |
| ------- | ---------------------- |
| `open`  | Emit khi dropdown mở   |
| `close` | Emit khi dropdown đóng |

#### Slots

| Slot      | Description            |
| --------- | ---------------------- |
| `trigger` | Custom trigger element |
| `default` | Nội dung dropdown      |

### 2. DropdownTitle

Component trigger mặc định với style chuẩn.

#### Props

| Prop    | Type      | Default  | Description                          |
| ------- | --------- | -------- | ------------------------------------ |
| `title` | `string`  | `'Chọn'` | Text hiển thị                        |
| `icon`  | `string`  | `''`     | Icon name (nếu có)                   |
| `open`  | `boolean` | `false`  | Trạng thái mở/đóng (để xoay mũi tên) |

### 3. DropdownItem

Component cho các item trong dropdown.

#### Props

| Prop    | Type                                    | Default     | Description         |
| ------- | --------------------------------------- | ----------- | ------------------- |
| `value` | `any`                                   | `'Chọn'`    | Text/value hiển thị |
| `icon`  | `string`                                | `''`        | Icon name (nếu có)  |
| `state` | `'default' \| 'selected' \| 'disabled'` | `'default'` | Trạng thái của item |

## Sử dụng

### Basic Dropdown

```vue
<template>
    <Dropdown v-model="isOpen">
        <template #trigger>
            <DropdownTitle title="Chọn một tùy chọn" :open="isOpen" />
        </template>
        <DropdownItem value="Tùy chọn 1" />
        <DropdownItem value="Tùy chọn 2" />
        <DropdownItem value="Tùy chọn 3" />
    </Dropdown>
</template>

<script setup>
import { ref } from "vue"
import { Dropdown, DropdownTitle, DropdownItem } from "@/components/custom/dropdown"

const isOpen = ref(false)
</script>
```

### Dropdown với các state

```vue
<Dropdown>
  <template #trigger>
    <DropdownTitle title="Chọn trạng thái" icon="settings" />
  </template>
  <DropdownItem value="Mặc định" />
  <DropdownItem value="Đã chọn" state="selected" icon="checked" />
  <DropdownItem value="Vô hiệu hóa" state="disabled" icon="lock" />
</Dropdown>
```

### Custom Trigger

```vue
<Dropdown v-model="isOpen">
  <template #trigger>
    <button class="custom-button">
      Custom Trigger Button
    </button>
  </template>
  <DropdownItem value="Item 1" />
  <DropdownItem value="Item 2" />
</Dropdown>
```

### Full Width Dropdown

```vue
<Dropdown titleWidth="100%" bodyWidth="auto">
  <template #trigger>
    <DropdownTitle title="Full width dropdown" />
  </template>
  <DropdownItem value="Item 1" />
  <DropdownItem value="Item 2" />
</Dropdown>
```

### Fixed Size Dropdown

```vue
<Dropdown bodyWidth="400px" bodyHeight="200px" position="bottom-end">
  <template #trigger>
    <DropdownTitle title="Fixed size" />
  </template>
  <DropdownItem value="Item 1" />
  <DropdownItem value="Item 2" />
  <!-- Nhiều items sẽ có scroll -->
</Dropdown>
```

### Priority Mode (không đóng khi click outside)

```vue
<Dropdown :priority="true" v-model="isOpen">
  <template #trigger>
    <DropdownTitle title="Priority dropdown" :open="isOpen" />
  </template>
  <DropdownItem value="Click outside sẽ không đóng" />
  <DropdownItem @click="isOpen = false" value="Click để đóng" />
</Dropdown>
```

### Các vị trí khác nhau

```vue
<!-- Hiển thị phía trên -->
<Dropdown position="top-start">
  <template #trigger>
    <DropdownTitle title="Top Start" />
  </template>
  <DropdownItem value="Item 1" />
</Dropdown>

<!-- Hiển thị bên phải -->
<Dropdown position="right">
  <template #trigger>
    <DropdownTitle title="Right" />
  </template>
  <DropdownItem value="Item 1" />
</Dropdown>
```

### Kết hợp với form

```vue
<template>
    <form @submit.prevent="handleSubmit">
        <label>Chọn quốc gia:</label>
        <Dropdown v-model="dropdownOpen">
            <template #trigger>
                <DropdownTitle :title="selectedCountry || 'Chọn quốc gia'" :open="dropdownOpen" />
            </template>
            <DropdownItem
                v-for="country in countries"
                :key="country"
                :value="country"
                :state="selectedCountry === country ? 'selected' : 'default'"
                @click="selectCountry(country)" />
        </Dropdown>
    </form>
</template>

<script setup>
import { ref } from "vue"

const dropdownOpen = ref(false)
const selectedCountry = ref("")
const countries = ["Việt Nam", "Thailand", "Singapore", "Malaysia"]

const selectCountry = country => {
    selectedCountry.value = country
    dropdownOpen.value = false
}
</script>
```

## Styling

Các component sử dụng Tailwind CSS với các biến CSS cho màu sắc:

-   Border: `#E1ECF4`
-   Background hover: `var(--button-secondary-bg-hover)`
-   Shadow: `0px 2px 4px 0px rgba(105,105,105,0.1)`
-   Text selected: gradient `var(--gradient)`
-   Icon selected: `#17c098`

## Notes

-   Dropdown tự động điều chỉnh vị trí để tránh bị che khuất (collision detection)
-   Khi `bodyWidth="auto"`, dropdown sẽ có chiều rộng bằng với trigger
-   DropdownItem có thể wrap trong slot để custom hoàn toàn
-   Icon sử dụng component Icon từ `@/components/custom/icon`
-   `titleWidth` và `bodyWidth` có thể không hoạt động chính xác với Tailwind dynamic classes
-   Component sử dụng DropdownMenu từ UI library (radix-ui)
