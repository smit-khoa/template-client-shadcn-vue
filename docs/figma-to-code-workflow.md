# Figma-to-Code Workflow Documentation

> **Hướng dẫn sử dụng quy trình tự động chuyển đổi thiết kế Figma sang code Vue**

## 🎯 Tổng quan

Workflow này tự động hóa hoàn toàn việc chuyển đổi thiết kế Figma thành code Vue 3 + TypeScript + Tailwind CSS production-ready với độ chính xác > 95%.

## 🚀 Cách sử dụng

### Bước 1: Chuẩn bị Figma Design

1. Mở design trong Figma
2. Click vào frame/component muốn convert
3. Copy URL từ thanh địa chỉ

**URL format:**
```
https://figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
```

**Ví dụ:**
```
https://figma.com/design/abc123/LoginPage?node-id=1-2
```

### Bước 2: Chạy lệnh automation

```bash
/design:figma https://figma.com/design/abc123/LoginPage?node-id=1-2
```

### Bước 3: Chờ AI xử lý

AI sẽ tự động:
1. ✅ Phân tích thiết kế Figma
2. ✅ Map components với thư viện hiện có
3. ✅ Generate code Vue + Tailwind
4. ✅ Test visual similarity
5. ✅ Tự động fix nếu không khớp (max 3 lần)

**Thời gian:** 5-10 phút

### Bước 4: Review kết quả

AI sẽ báo cáo:
```markdown
✅ Generated: src/pages/Login.vue
✅ Visual similarity: 97.8%
✅ Components used: Button, Input, Checkbox
✅ New components: 0
✅ Iterations: 2
✅ Time: 6 minutes
```

---

## 📋 Quy trình 5 bước chi tiết

### Phase 1: Phân tích Figma

**AI sẽ làm:**
- Fetch design context từ Figma
- Lấy screenshot thiết kế gốc
- Extract metadata (structure, hierarchy)
- Get design tokens (colors, fonts, spacing)
- Phân tích components và variants

**Output:**
- Design data (JSON)
- Reference screenshot (PNG)
- Component list
- Design tokens

### Phase 2: Component Mapping

**AI sẽ làm:**
- Scan toàn bộ components hiện có trong dự án
- So sánh components Figma với Vue components
- Tính similarity score (0-100%)
- Quyết định reuse hoặc create new

**Decision Matrix:**
```
Similarity >= 90% → Dùng component hiện có
Similarity 70-89% → Dùng với customization nhỏ
Similarity 50-69% → Cân nhắc tạo variant
Similarity < 50%  → Tạo component mới
```

**Ví dụ mapping:**
```typescript
Figma "Primary Button" → src/components/custom/button/Button.vue
  - Confidence: 95%
  - Customization: Chỉnh variant prop

Figma "Email Input" → src/components/custom/input/Input.vue
  - Confidence: 88%
  - Customization: Add icon prefix

Figma "Stats Card" → [NEW COMPONENT NEEDED]
  - Confidence: 35%
  - Reason: Không có component tương tự
```

### Phase 3: Generate Code

**AI sẽ làm:**
- Tạo Vue SFC file
- Import components cần thiết
- Viết template với Tailwind classes
- Add TypeScript types
- Implement interactions

**Code structure:**
```vue
<template>
  <!-- HTML với Tailwind classes -->
</template>

<script setup lang="ts">
// Imports
// Props interface
// Reactive state
// Methods
</script>

<style scoped>
/* Custom styles nếu cần */
</style>
```

**Tuân thủ:**
- ✅ Composition API (`<script setup>`)
- ✅ TypeScript strict mode
- ✅ Naming conventions (snake_case, camelCase, PascalCase)
- ✅ Tailwind CSS only (no inline styles)
- ✅ Component reuse priority

### Phase 4: Visual Testing

**AI sẽ làm:**
- Start dev server (https://localhost:8309)
- Navigate đến component mới
- Capture screenshot
- So sánh với Figma design
- Tính similarity score

**Testing tools:**
- Playwright - Browser automation
- Pixelmatch - Image comparison
- Sharp - Image processing

**Pass criteria:**
```
Visual similarity >= 95%
```

### Phase 5: Iteration

**Nếu similarity < 95%:**

1. AI phân tích differences:
   - Color mismatches
   - Spacing issues
   - Typography differences
   - Layout shifts

2. AI tự động fix:
   - Adjust Tailwind classes
   - Update CSS variables
   - Modify component props

3. Re-run Phase 4 (max 3 lần)

**Nếu sau 3 lần vẫn < 95%:**
- AI request human review
- Generate detailed report
- Suggest manual fixes

---

## 🎨 Component Mapping Examples

### Example 1: Button

**Figma component:**
```
Primary Button
- Text: "Submit"
- Background: #269a85
- Padding: 16px 24px
- Border radius: 8px
- Font: Inter 600, 16px
```

**Mapped to:**
```vue
<Button
  variant="primary"
  size="lg"
>
  Submit
</Button>
```

**Match confidence:** 98%

### Example 2: Input Field

**Figma component:**
```
Email Input
- Label: "Email address"
- Placeholder: "Enter your email"
- Icon: Mail icon (left)
- Border: 1px solid #E5E7EB
```

**Mapped to:**
```vue
<Input
  v-model="email"
  type="text"
  label="Email address"
  placeholder="Enter your email"
  prefix-icon="mail"
/>
```

**Match confidence:** 92%

### Example 3: Card (New Component)

**Figma component:**
```
Stats Card
- Icon (top-left)
- Title
- Value (large number)
- Change indicator (+/-)
- Trend chart (bottom)
```

**Decision:** Create new component
```vue
<!-- src/components/custom/stats-card/StatsCard.vue -->
<template>
  <div class="stats-card">
    <Icon :name="icon" />
    <h3>{{ title }}</h3>
    <p class="value">{{ value }}</p>
    <span :class="change_class">{{ change }}</span>
  </div>
</template>
```

**Reason:** No similar component exists (confidence: 35%)

---

## 🧪 Visual Testing Details

### Screenshot Comparison

**Process:**
1. Capture Figma design (from Figma API)
2. Capture generated page (from browser)
3. Resize to same dimensions
4. Compare pixel-by-pixel
5. Calculate similarity score

**Algorithm:**
```typescript
similarity = (matching_pixels / total_pixels) * 100
```

**Threshold:**
```
>= 95% → Pass ✅
< 95%  → Iterate 🔄
```

### Common Differences

**Color variations:**
```diff
- Expected: #269a85
+ Actual:   #269a86
→ Fix: Update Tailwind color
```

**Spacing issues:**
```diff
- Expected: padding 16px
+ Actual:   padding 12px
→ Fix: Change px-3 to px-4
```

**Font weight:**
```diff
- Expected: font-weight 600
+ Actual:   font-weight 500
→ Fix: Change font-medium to font-semibold
```

---

## 📊 Success Metrics

### Quality Targets
- ✅ Visual similarity: >= 95%
- ✅ Component reuse: >= 80%
- ✅ First-pass success: >= 60%
- ✅ TypeScript coverage: 100%

### Performance Targets
- ⏱️ Total time: < 10 minutes
- ⏱️ Iterations: <= 3
- 🎯 Manual review rate: < 20%

---

## 🛠️ Troubleshooting

### Issue: Similarity < 95% sau 3 iterations

**Possible causes:**
- Complex gradients không match Tailwind
- Custom fonts không khả dụng
- Advanced animations không support
- Thiết kế có elements dynamic

**Solution:**
1. Review AI report
2. Check suggested fixes
3. Manual adjustments
4. Update component library nếu cần

### Issue: Component mapping sai

**Possible causes:**
- Component tên không rõ ràng trong Figma
- Component có nhiều variants khác nhau
- Thiết kế mới, chưa có trong library

**Solution:**
1. Rename Figma components rõ ràng hơn
2. Add variant documentation trong Figma
3. Pre-create components nếu design mới hoàn toàn

### Issue: Code generation lỗi syntax

**Possible causes:**
- Figma structure phức tạp
- Nested components quá sâu
- Special characters trong tên

**Solution:**
1. Simplify Figma structure
2. Flatten nested groups
3. Rename layers với special chars

---

## 💡 Best Practices

### Trong Figma

1. **Naming convention rõ ràng**
   ```
   ✅ Button/Primary
   ✅ Input/Email
   ❌ Frame 1
   ❌ Rectangle 42
   ```

2. **Use Auto Layout**
   - Giúp AI hiểu spacing chính xác
   - Easier to convert to Flexbox/Grid

3. **Component variants**
   - Tạo variants cho states khác nhau
   - AI sẽ map vào props Vue

4. **Design tokens**
   - Sử dụng Color/Text styles
   - AI sẽ extract thành CSS variables

### Trong Code

1. **Keep components simple**
   - Single responsibility
   - Reusable và composable
   - Props interface rõ ràng

2. **Use existing components**
   - Check library trước khi tạo mới
   - Extend thay vì duplicate

3. **Follow naming conventions**
   - snake_case for variables
   - camelCase for functions
   - PascalCase for components

---

## 📝 Example Workflow

### Real example: Login Page

**Input:**
```bash
/design:figma https://figma.com/design/abc123/Login?node-id=1-2
```

**AI Analysis:**
```
Figma components detected:
1. Logo image
2. Heading "Welcome back"
3. Email input
4. Password input
5. Remember me checkbox
6. Submit button
7. Forgot password link
```

**Component mapping:**
```
Logo → <img> tag
Heading → <h1> with Tailwind
Email input → <Input type="text" />
Password input → <Input type="password" />
Checkbox → <Checkbox />
Button → <Button variant="primary" />
Link → <a> tag
```

**Generated code:**
```vue
<template>
  <div class="login-page">
    <img src="@/assets/images/logo.png" alt="Logo" class="logo" />

    <h1 class="text-3xl font-bold text-neutral-900">
      Welcome back
    </h1>

    <form @submit.prevent="handleSubmit" class="login-form">
      <Input
        v-model="email"
        type="text"
        label="Email"
        placeholder="Enter your email"
      />

      <Input
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />

      <Checkbox v-model="remember_me">
        Remember me
      </Checkbox>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        :loading="is_loading"
        class="w-full"
      >
        Sign in
      </Button>

      <a href="/forgot-password" class="forgot-link">
        Forgot password?
      </a>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/custom/input'
import { Button } from '@/components/custom/button'
import { Checkbox } from '@/components/custom/checkbox'

const email = ref('')
const password = ref('')
const remember_me = ref(false)
const is_loading = ref(false)

async function handleSubmit() {
  is_loading.value = true
  // Login logic
}
</script>

<style scoped>
.login-page {
  @apply flex flex-col items-center justify-center min-h-screen p-4;
}

.logo {
  @apply w-24 h-24 mb-8;
}

.login-form {
  @apply w-full max-w-md space-y-4;
}

.forgot-link {
  @apply text-sm text-primary-600 hover:text-primary-700;
}
</style>
```

**Visual test:**
```
Screenshot captured
Similarity: 96.8%
Status: ✅ Passed
```

**Result:**
```
✅ File created: src/pages/Login.vue
✅ Components reused: 3 (Input, Button, Checkbox)
✅ New components: 0
✅ Visual similarity: 96.8%
✅ Time: 7 minutes
```

---

## 🔗 Related Documentation

- [Development Rules](../.claude/workflows/development-rules.md) - Coding standards
- [Component Library](./component-library.md) - Available components
- [Design System](./design-system.md) - Design tokens

---

## 📞 Support

**Issues với workflow:**
1. Check AI error messages
2. Review generated reports
3. Consult documentation
4. Request human review nếu cần

**Questions:**
- Workflow không chạy → Check Figma URL format
- Similarity thấp → Review Figma design structure
- Component không map → Check component library

---

**Last Updated:** 2026-01-30
**Version:** 1.0.0
