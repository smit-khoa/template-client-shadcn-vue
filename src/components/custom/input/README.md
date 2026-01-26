# Input Component

Component Input với các trạng thái: default, hover, focus, typing, disabled, active, error theo thiết kế Figma. Hỗ trợ format tiền tệ, suffix text và nhiều loại input khác nhau.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | `undefined` | Giá trị của input (v-model) |
| `type` | `string` | `'text'` | Loại input (text, email, password, number, currency, etc.) |
| `placeholder` | `string` | `'Nhập thông tin'` | Placeholder text |
| `disabled` | `boolean` | `false` | Vô hiệu hóa input |
| `readonly` | `boolean` | `false` | Chỉ đọc, không cho phép chỉnh sửa |
| `message` | `string` | `undefined` | Thông báo hiển thị dưới input |
| `error` | `boolean` | `false` | Trạng thái lỗi |
| `errorMessage` | `string` | `undefined` | Thông báo lỗi (hiển thị khi error=true) |
| `currency` | `string` | `'VND'` | Đơn vị tiền tệ (dùng khi type='currency') |
| `locale` | `string` | `'vi-VN'` | Locale format số (dùng khi type='currency') |
| `suffix` | `string` | `undefined` | Text mô tả hiển thị ở cuối input |
| `class` | `string` | `undefined` | CSS class bổ sung |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Phát ra khi giá trị thay đổi |
| `focus` | `FocusEvent` | Phát ra khi input được focus |
| `blur` | `FocusEvent` | Phát ra khi input mất focus |

## Usage

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';
import { Input } from '@/components/custom/input';

const value = ref('');
</script>

<template>
  <Input v-model="value" placeholder="Nhập thông tin" />
</template>
```

### States

#### Default State
```vue
<Input v-model="value" placeholder="Nhập thông tin" />
```

#### Hover State
Input sẽ tự động có hover state khi di chuột vào. Background sẽ chuyển sang màu `rgba(218,230,244,0.7)`.

#### Focus State
Khi click vào input, border sẽ chuyển sang màu `#0ff0bb` (primary color).

#### Typing State
Khi focus và có nội dung, một cursor màu xanh sẽ nhấp nháy ở cuối input.

#### Disabled State
```vue
<Input v-model="value" :disabled="true" placeholder="Input bị vô hiệu hóa" />
```

#### Active State
Input có nội dung sẽ tự động ở trạng thái active với text màu `#0d0d0d`.

#### Error State
```vue
<Input 
  v-model="value" 
  :error="true"
  errorMessage="Trường này là bắt buộc"
  placeholder="Nhập thông tin" 
/>
```

### Different Input Types

```vue
<!-- Text input -->
<Input v-model="text" type="text" placeholder="Nhập văn bản" />

<!-- Email input -->
<Input v-model="email" type="email" placeholder="email@example.com" />

<!-- Password input -->
<Input v-model="password" type="password" placeholder="Nhập mật khẩu" />

<!-- Number input -->
<Input v-model="number" type="number" placeholder="Nhập số" />
```

### Input với Suffix

```vue
<!-- Nhập tuổi -->
<Input 
  v-model="age" 
  type="number" 
  suffix="tuổi"
  placeholder="0" 
/>

<!-- Chiều cao -->
<Input 
  v-model="height" 
  type="number" 
  suffix="cm"
  placeholder="0" 
/>

<!-- Phần trăm -->
<Input 
  v-model="percent" 
  type="number" 
  suffix="%"
  placeholder="0" 
/>
```

### Currency Input

```vue
<!-- VND Currency -->
<Input 
  v-model="amount" 
  type="currency"
  currency="VND"
  placeholder="0" 
/>

<!-- USD Currency -->
<Input 
  v-model="usdAmount" 
  type="currency"
  currency="USD"
  locale="en-US"
  placeholder="0" 
/>

<!-- EUR Currency -->
<Input 
  v-model="eurAmount" 
  type="currency"
  currency="EUR"
  locale="de-DE"
  placeholder="0" 
/>
```

### With Messages

```vue
<!-- Normal message -->
<Input 
  v-model="value" 
  placeholder="Nhập họ và tên"
  message="Vui lòng nhập đầy đủ họ và tên" 
/>

<!-- Error message -->
<Input 
  v-model="value" 
  :error="true"
  errorMessage="Email không đúng định dạng"
  placeholder="Nhập email" 
/>
```

### Readonly Input

```vue
<Input 
  v-model="value" 
  :readonly="true"
  placeholder="Không thể chỉnh sửa" 
/>
```

### Handle Events

```vue
<script setup>
const handleFocus = (event) => {
  console.log('Input focused', event);
};

const handleBlur = (event) => {
  console.log('Input blurred', event);
};
</script>

<template>
  <Input 
    v-model="value" 
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
```

### Form Validation Example

```vue
<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !email.value || emailRegex.test(email.value);
});
</script>

<template>
  <Input 
    v-model="email" 
    type="email"
    placeholder="Nhập email"
    :error="!isValidEmail"
    :errorMessage="!isValidEmail ? 'Email không đúng định dạng' : ''"
  />
</template>
```

### Custom Styling

```vue
<!-- Custom width -->
<Input v-model="value" class="max-w-xs" />

<!-- In a form -->
<div class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-2">Email</label>
    <Input v-model="email" type="email" placeholder="email@example.com" />
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-2">Tuổi</label>
    <Input v-model="age" type="number" suffix="tuổi" placeholder="0" />
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-2">Số tiền</label>
    <Input v-model="amount" type="currency" currency="VND" placeholder="0" />
  </div>
</div>
```

## Visual States

Component có các trạng thái visual sau:

1. **Default**: Border màu `#e1ecf4`, text màu `#718096`
2. **Hover**: Background chuyển sang `rgba(218,230,244,0.7)`
3. **Focus**: Border chuyển sang `#0ff0bb`, text màu `#0d0d0d`
4. **Typing**: Hiển thị cursor nhấp nháy màu `#0ff0bb` khi có nội dung và đang focus
5. **Disabled**: Opacity 40%, cursor not-allowed
6. **Active**: Text màu `#0d0d0d` khi có nội dung
7. **Error**: Border màu `#dc2626` (đỏ), hiển thị error message màu đỏ

## Design Specs

- Font: Inter Tight
- Font size: 14px
- Font weight: 500 (medium)
- Line height: 20px
- Padding: 12px horizontal, 10px vertical
- Padding right: 50px (khi có suffix hoặc currency)
- Border radius: 12px (rounded-xl)
- Border width: 1px
- Transition: 200ms tất cả thuộc tính

## Suffix Features

- Hiển thị text mô tả ở cuối input
- Màu text: `#718096`
- Font size: 14px, font weight: 500
- Position: absolute, right 12px
- Chỉ hiển thị khi prop `suffix` được truyền
- Tự động điều chỉnh padding-right của input

## Currency Input Features

- Tự động format số khi nhập realtime
- Hiển thị đơn vị tiền tệ ở cuối input
- Format ngay lập tức khi nhập
- Hỗ trợ nhiều loại tiền tệ: VND, USD, EUR, v.v.
- Cursor position được giữ nguyên khi format
- Chỉ cho phép nhập số

## Number Input Features

- Chỉ cho phép nhập số
- Hỗ trợ số âm và số thập phân
- Tự động loại bỏ ký tự không hợp lệ

## Cursor Animation

Cursor typing indicator:
- Width: 1.5px
- Height: 20px
- Color: `#0ff0bb`
- Animation: Blink 1s infinite
- Position: Right 12px (text) hoặc 50px (currency/suffix)
- Chỉ hiển thị khi: focused + có nội dung + không disabled + không readonly

## Accessibility

- Input hỗ trợ tất cả attributes HTML5 thông qua `v-bind="$attrs"`
- Có thể sử dụng với label thông qua `id` attribute
- Keyboard navigation hoạt động bình thường
- Screen reader friendly với placeholder và message

## Notes

- Sử dụng CSS variables từ globals.css cho theming
- Currency input sử dụng Intl.NumberFormat để format số
- Error message có độ ưu tiên cao hơn normal message
- Message hiển thị với font-size 12px
- Suffix và currency suffix có cùng styling và position