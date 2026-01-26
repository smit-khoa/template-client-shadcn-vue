# Checkbox & Radio Component

Component checkbox và radio button theo thiết kế mới, hỗ trợ các trạng thái checked, unchecked, disabled và hover.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| string \| number \| any[]` | `false` | Giá trị binding (v-model). Hỗ trợ array cho multi-select checkbox |
| `value` | `string \| number` | `undefined` | Giá trị cho radio button hoặc checkbox trong array mode |
| `label` | `string` | `undefined` | Label hiển thị bên cạnh checkbox/radio |
| `disabled` | `boolean` | `false` | Vô hiệu hóa input |
| `type` | `'checkbox' \| 'radio'` | `'checkbox'` | Loại input |
| `name` | `string` | `undefined` | Tên của input (bắt buộc cho radio group) |
| `class` | `string` | `''` | CSS class bổ sung |

## Usage

### Basic Checkbox

```vue
<script setup>
import { ref } from 'vue';
import { Checkbox } from '@/components/custom/checkbox';

const isChecked = ref(false);
</script>

<template>
  <Checkbox v-model="isChecked" label="Accept terms and conditions" />
</template>
```

### Checkbox States

```vue
<!-- Unchecked -->
<Checkbox :modelValue="false" label="Unchecked" />

<!-- Checked -->
<Checkbox :modelValue="true" label="Checked" />

<!-- Disabled unchecked -->
<Checkbox :modelValue="false" :disabled="true" label="Disabled unchecked" />

<!-- Disabled checked -->
<Checkbox :modelValue="true" :disabled="true" label="Disabled checked" />
```

### Without Label

```vue
<Checkbox v-model="isChecked" />
```

### Radio Button

```vue
<script setup>
import { ref } from 'vue';
import { Checkbox } from '@/components/custom/checkbox';

const selectedOption = ref('option1');
</script>

<template>
  <div class="space-y-2">
    <Checkbox 
      type="radio" 
      v-model="selectedOption" 
      value="option1" 
      name="radio-group" 
      label="Option 1" 
    />
    <Checkbox 
      type="radio" 
      v-model="selectedOption" 
      value="option2" 
      name="radio-group" 
      label="Option 2" 
    />
    <Checkbox 
      type="radio" 
      v-model="selectedOption" 
      value="option3" 
      name="radio-group" 
      label="Option 3" 
    />
  </div>
</template>
```

### Multiple Checkbox Group

```vue
<script setup>
import { ref } from 'vue';

const preferences = ref({
  newsletter: false,
  updates: false,
  marketing: false
});
</script>

<template>
  <div class="space-y-2">
    <h3>Email Preferences:</h3>
    <Checkbox v-model="preferences.newsletter" label="Newsletter" />
    <Checkbox v-model="preferences.updates" label="Product updates" />
    <Checkbox v-model="preferences.marketing" label="Marketing emails" />
  </div>
</template>
```

### Checkbox with Array (Multi-select)

Component hỗ trợ array v-model để quản lý nhiều lựa chọn:

```vue
<script setup>
import { ref } from 'vue';

const selectedFruits = ref(['apple', 'banana']);
</script>

<template>
  <div class="space-y-2">
    <h3>Chọn trái cây:</h3>
    <Checkbox v-model="selectedFruits" value="apple" label="Táo" />
    <Checkbox v-model="selectedFruits" value="orange" label="Cam" />
    <Checkbox v-model="selectedFruits" value="banana" label="Chuối" />
    <Checkbox v-model="selectedFruits" value="grape" label="Nho" />
  </div>
  <p>Đã chọn: {{ selectedFruits.join(', ') }}</p>
</template>
```

### Checkbox with Number Values

Array mode cũng hỗ trợ number values:

```vue
<script setup>
import { ref } from 'vue';

const selectedNumbers = ref([1, 3]);
</script>

<template>
  <div class="space-y-2">
    <Checkbox v-model="selectedNumbers" :value="1" label="Số 1" />
    <Checkbox v-model="selectedNumbers" :value="2" label="Số 2" />
    <Checkbox v-model="selectedNumbers" :value="3" label="Số 3" />
    <Checkbox v-model="selectedNumbers" :value="4" label="Số 4" />
  </div>
  <p>Tổng: {{ selectedNumbers.reduce((sum, num) => sum + num, 0) }}</p>
</template>
```

### Form Example

```vue
<script setup>
import { ref } from 'vue';

const form = ref({
  agree: false,
  plan: 'basic'
});

const handleSubmit = () => {
  console.log('Form data:', form.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Checkbox -->
    <Checkbox 
      v-model="form.agree" 
      label="I agree to the terms and conditions" 
    />
    
    <!-- Radio group -->
    <div class="mt-4 space-y-2">
      <h4>Choose your plan:</h4>
      <Checkbox 
        type="radio" 
        v-model="form.plan" 
        value="basic" 
        name="plan" 
        label="Basic - Free" 
      />
      <Checkbox 
        type="radio" 
        v-model="form.plan" 
        value="pro" 
        name="plan" 
        label="Pro - $9/month" 
      />
      <Checkbox 
        type="radio" 
        v-model="form.plan" 
        value="enterprise" 
        name="plan" 
        label="Enterprise - $29/month" 
      />
    </div>
    
    <button type="submit" :disabled="!form.agree">
      Submit
    </button>
  </form>
</template>
```

## Events

Component emit các events sau:

- `update:modelValue`: Khi giá trị thay đổi (cho v-model)
- `change`: Khi người dùng click checkbox/radio

```vue
<Checkbox 
  v-model="isChecked" 
  @change="handleChange"
  label="Option" 
/>
```

## Styling

Component sử dụng các màu từ thiết kế:
- Primary color: `#0cc096` (checked state)
- Border color: `#718096` (unchecked)
- Hover background: `#e7fdf8`
- Disabled background: `#e1ecf4`

## Accessibility

- Input được ẩn với class `sr-only` nhưng vẫn accessible
- Label có cursor pointer và click vào label sẽ toggle checkbox/radio
- Hỗ trợ keyboard navigation
- Proper disabled state handling

## Notes

- Checkbox hỗ trợ hover effect với background màu xanh nhạt
- Radio button có animation smooth khi chuyển state
- Component tự động handle v-model cho cả checkbox và radio
- Radio buttons cần có `name` prop giống nhau để group lại