# Tabs Component

Component tabs với hiệu ứng glass morphism và animation "water drop" khi chuyển tab.

## Tính năng

- ✅ Glass morphism effect với backdrop blur
- ✅ Animation mượt mà kiểu "water drop" khi chuyển tab
- ✅ Thanh trượt tự động điều chỉnh kích thước
- ✅ Hỗ trợ icons thông qua component Icon
- ✅ Two-way binding với v-model
- ✅ Responsive và tự động điều chỉnh width
- ✅ Cubic-bezier animation tự nhiên

## Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `tabs` | `Array<Tab>` | `[]` | Mảng các tab items |
| `modelValue` | `string` | `""` | Key của tab được chọn (v-model) |

### Tab Interface

```typescript
interface Tab {
  key: string;    // Unique identifier cho tab
  title: string;  // Text hiển thị trên tab
  icon?: string;  // Tên icon (optional)
}
```

## Events

| Event | Payload | Mô tả |
|-------|---------|-------|
| `update:modelValue` | `string` | Emit khi tab được chọn thay đổi (được trigger từ changeTab method) |

## Internal Implementation

### Computed Properties

#### selectedStyle
Computed style để định vị thanh trượt (slider) dưới tab được chọn:
```javascript
const selectedStyle = computed(() => ({
    left: `${posLeft.value}px`,  // Vị trí left của slider
    width: `${width.value}px`    // Chiều rộng của slider
}));
```

#### animationClass
Computed class để trigger animation khi chuyển tab:
```javascript
const animationClass = computed(() => ({
    "is-animating": isAnimating.value  // Thêm class khi đang animate
}));
```

### Internal Methods

#### changeTab (Internal)
Method nội bộ được gọi khi radio input thay đổi (không phải event public).
Được trigger bởi `@change` event của `<input type="radio">` bên trong component:
```javascript
const changeTab = () => {
    emit("update:modelValue", selected.value);
    
    // Xác định loại animation dựa trên vị trí tab
    const selectedIndex = props.tabs.findIndex(tab => tab.key === selected.value);
    
    if (selectedIndex === 0) {
        animationType.value = "left-edge";
    } else if (selectedIndex === props.tabs.length - 1) {
        animationType.value = "right-edge";
    } else {
        animationType.value = "normal";
    }
    
    // Trigger animation
    isAnimating.value = true;
    updateSliderPosition();
    
    // Reset animation state sau 800ms
    setTimeout(() => {
        isAnimating.value = false;
    }, 800);
};
```

#### updateSliderPosition
Cập nhật vị trí và kích thước của thanh trượt:
```javascript
const updateSliderPosition = async () => {
    await nextTick();
    const selectedIndex = props.tabs.findIndex(tab => tab.key === selected.value);
    if (selectedIndex !== -1 && itemRefs.value[selectedIndex]) {
        const el = itemRefs.value[selectedIndex];
        posLeft.value = el.offsetLeft;     // Lấy vị trí left của tab
        width.value = el.offsetWidth;      // Lấy chiều rộng của tab
    }
};
```

## Sử dụng

### Basic tabs

```vue
<template>
  <Tabs v-model="selectedTab" :tabs="tabs" />
  
  <!-- Hiển thị tab được chọn -->
  <p>Tab hiện tại: {{ selectedTab }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { Tabs } from '@/components/custom/tabs';

const selectedTab = ref('tab1');
const tabs = [
  { key: 'tab1', title: 'Tab 1' },
  { key: 'tab2', title: 'Tab 2' },
  { key: 'tab3', title: 'Tab 3' },
];

// Component tự động cập nhật selectedTab khi user chọn tab khác
// Không cần listen event, chỉ cần sử dụng v-model
</script>
```

### Tabs với icons

```vue
<template>
  <Tabs v-model="activeTab" :tabs="iconTabs" />
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('home');
const iconTabs = [
  { key: 'home', title: 'Home', icon: 'home' },
  { key: 'user', title: 'Profile', icon: 'user' },
  { key: 'settings', title: 'Settings', icon: 'settings' },
];
</script>
```

### Tabs với content panels

```vue
<template>
  <div>
    <Tabs v-model="currentTab" :tabs="tabs" />
    
    <div class="tab-content">
      <div v-if="currentTab === 'profile'">
        <h2>Profile Content</h2>
        <!-- Profile content here -->
      </div>
      <div v-else-if="currentTab === 'settings'">
        <h2>Settings Content</h2>
        <!-- Settings content here -->
      </div>
      <div v-else-if="currentTab === 'security'">
        <h2>Security Content</h2>
        <!-- Security content here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentTab = ref('profile');
const tabs = [
  { key: 'profile', title: 'Profile' },
  { key: 'settings', title: 'Settings' },
  { key: 'security', title: 'Security' },
];
</script>
```

### Dynamic tabs

```vue
<template>
  <div>
    <button @click="addTab">Add Tab</button>
    <button @click="removeTab">Remove Tab</button>
    
    <Tabs v-model="selectedTab" :tabs="dynamicTabs" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedTab = ref('tab1');
const dynamicTabs = ref([
  { key: 'tab1', title: 'Tab 1' },
]);

let counter = 2;

const addTab = () => {
  const newKey = `tab${counter}`;
  dynamicTabs.value.push({
    key: newKey,
    title: `Tab ${counter}`,
  });
  selectedTab.value = newKey;
  counter++;
};

const removeTab = () => {
  if (dynamicTabs.value.length > 1) {
    dynamicTabs.value.pop();
    selectedTab.value = dynamicTabs.value[0].key;
  }
};
</script>
```

### Controlled từ bên ngoài

```vue
<template>
  <div>
    <Tabs v-model="activeTab" :tabs="tabs" />
    
    <div class="controls">
      <button @click="activeTab = 'tab1'">Go to Tab 1</button>
      <button @click="activeTab = 'tab2'">Go to Tab 2</button>
      <button @click="activeTab = 'tab3'">Go to Tab 3</button>
    </div>
  </div>
</template>
```

## Styling

### CSS Variables

Component sử dụng các CSS variables cho glass effect:

```scss
--c-glass: #bbbbbc;      // Màu base cho glass effect
--c-light: #fff;         // Màu sáng cho highlights
--c-dark: #000;          // Màu tối cho shadows
--saturation: 150%;      // Độ bão hòa cho backdrop-filter
```

### Dimensions

- Container height: 46px
- Padding: 4px
- Border radius: 16px
- Tab item height: 42px
- Tab padding: 0 20px
- Slider margin: 4px từ container edges

### Animation

Component sử dụng nhiều cubic-bezier animations:

1. **Thanh trượt di chuyển**:
   - Left: `cubic-bezier(0.66, 0.1, 0.44, 1.04)` - 600ms
   - Width: `cubic-bezier(0, 0, 0.54, 1.1)` - 600ms
   - Transform: `cubic-bezier(0.34, 1.56, 0.64, 1)` - 600ms

2. **Water drop effect**:
   - Animation duration: 800ms
   - Easing: ease-out
   - Có 3 loại animation dựa trên vị trí: normal, left-edge, right-edge

### Glass Morphism Effect

```scss
background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);
backdrop-filter: blur(8px) saturate(var(--saturation));
```

## Advanced Features

### Custom animation timing

Component tự động detect vị trí tab và áp dụng animation phù hợp:
- Tab đầu tiên: `left-edge` animation
- Tab cuối cùng: `right-edge` animation
- Các tab khác: `normal` animation

### Previous state tracking

Component track tab trước đó thông qua attribute `c-previous` để có thể tạo animation phức tạp hơn nếu cần.

## Browser Support

Component yêu cầu browser hỗ trợ:
- CSS `backdrop-filter`
- CSS `color-mix()`
- CSS custom properties
- Modern flexbox

## Best Practices

1. **Unique keys**: Đảm bảo mỗi tab có key unique
2. **Reasonable count**: Tránh có quá nhiều tabs (recommend < 6)
3. **Icon consistency**: Sử dụng icons cùng style/size
4. **Content loading**: Load content lazy khi cần cho performance
5. **Accessibility**: Thêm aria-labels cho screen readers khi cần

## Ví dụ Full-featured

```vue
<template>
  <div class="dashboard">
    <Tabs 
      v-model="activeSection" 
      :tabs="sections"
      class="mb-6"
    />
    
    <transition name="fade" mode="out-in">
      <component 
        :is="currentComponent" 
        :key="activeSection"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Tabs } from '@/components/custom/tabs';
import DashboardOverview from './DashboardOverview.vue';
import DashboardAnalytics from './DashboardAnalytics.vue';
import DashboardReports from './DashboardReports.vue';

const activeSection = ref('overview');

const sections = [
  { key: 'overview', title: 'Overview', icon: 'chart-bar' },
  { key: 'analytics', title: 'Analytics', icon: 'chart-line' },
  { key: 'reports', title: 'Reports', icon: 'document' },
];

const currentComponent = computed(() => {
  const components = {
    overview: DashboardOverview,
    analytics: DashboardAnalytics,
    reports: DashboardReports,
  };
  return components[activeSection.value];
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## Notes

- Component sử dụng `fieldset` và `radio inputs` để đảm bảo semantic HTML
- Radio inputs được ẩn visual nhưng vẫn accessible
- Animation được trigger thông qua class `is-animating`
- Component tự động chọn tab đầu tiên nếu không có modelValue
- Width của tabs tự động điều chỉnh theo nội dung (fit-content)