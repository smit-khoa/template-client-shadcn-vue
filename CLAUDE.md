# CLAUDE.md - SMIT Chat Project

## 🔄 Workflows (BẮT BUỘC)

### Figma to Code Workflow

**TỰ ĐỘNG ÁP DỤNG** khi user yêu cầu triển khai giao diện từ Figma.

**Trigger keywords:** figma, thiết kế, design, giao diện, implement UI, triển khai màn hình

**⚡ ClaudeKit Commands (ưu tiên sử dụng):**
- `/plan` → Lên kế hoạch implementation
- `/cook` → Thực hiện code
- `/test` → Kiểm tra sau implementation
- `/fix` → Sửa lỗi phát sinh

**Quy trình 6 bước:**

1. **Đọc & Phân tích Figma**
   - Sử dụng MCP Figma tools (`get_design_context`, `get_screenshot`)
   - Phát hiện components có thể áp dụng
   - Liệt kê images/icons cần xử lý
   - Phân tích responsive strategy

2. **Lên Kế hoạch**
   - Map Figma elements → components có sẵn (xem Component Catalog bên dưới)
   - Images: export vào `src/assets/images/[feature]/`
   - Icons: kiểm tra `sprites.svg`, thêm nếu chưa có
   - Responsive: KHÔNG copy số px cố định, luôn convert sang responsive classes

3. **Implementation** (Nguyên tắc code)
   - **Clean Code**: Tuân thủ DRY và SOLID
   - **No Inline Styles**: CHỈ sử dụng Tailwind classes
   - **Type Safety**: Luôn định nghĩa Type cho props, data, emits
   - **Performance**: Tối ưu render và kích thước ảnh

4. **⚠️ E2E Testing với Playwright (BẮT BUỘC)**
   - **Tạo test file**: `e2e/tests/[feature]/[page].spec.ts`
   - **Chạy tests**: `npm run test:e2e:headed -- tests/[feature]/[page].spec.ts`
   - **Test cases cần có**: UI elements visible, form actions, responsive
   - **⛔ KHÔNG được báo hoàn thành nếu chưa chạy E2E tests**

5. **Visual Verification** (Kiểm chứng Thị giác)
   - **Visual Regression**: So sánh screenshot code vs Figma bằng Vision
   - **Checklist**: Spacing, Colors, Console errors, Responsive (375px & 1440px)
   - **Self-Correction**: Sai lệch > 5% → TỰ ĐỘNG SỬA trước khi bàn giao

6. **Hoàn thành**
   - Report files created/modified
   - Confirm responsive works
   - No console errors
   - **E2E tests pass** ✅

### ⚠️ Complex Design (tia sáng, cầu vồng, floating elements)

Khi gặp design phức tạp với effects đặc biệt:

| Loại Element | Xử lý |
|--------------|-------|
| Tia sáng, cầu vồng, gradients phức tạp | Export PNG/SVG → `src/assets/images/[feature]/decorations/` |
| Floating dashboard previews | Absolute positioning + exported images |
| Blur/glow effects | CSS `backdrop-filter: blur()`, `filter: blur()` |
| Complex animations | CSS animations hoặc Lottie |

**Testing cho Complex Design:**
- Dùng tolerance 10-15% thay vì 5%
- Test từng component riêng biệt (navbar, cards, hero)
- **Manual visual QA bắt buộc** cho overall look
- Decorations có thể ẩn hoặc scale nhỏ trên mobile

**Chi tiết đầy đủ:** `.claude/workflows/figma-to-code-workflow.md`

---

## ⚠️ E2E Testing với Playwright (BẮT BUỘC)

**CRITICAL:** Sau MỖI implementation từ Figma, PHẢI thực hiện E2E testing.

### Quy trình bắt buộc:

```bash
# 1. Tạo test file
# File: e2e/tests/[feature]/[page].spec.ts

# 2. Chạy test
npm run test:e2e:headed -- tests/[feature]/[page].spec.ts

# 3. Nếu fail → fix → chạy lại
```

### Template test file:

```typescript
import { test, expect } from "@playwright/test"

test.describe("[Page Name]", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/[route]")
    })

    test("hiển thị đúng UI elements", async ({ page }) => {
        await expect(page.getByRole("heading")).toBeVisible()
        await expect(page.getByRole("button")).toBeVisible()
    })

    test("form hoạt động đúng", async ({ page }) => {
        await page.getByPlaceholder("Email").fill("test@example.com")
        await page.getByRole("button", { name: "Submit" }).click()
    })
})
```

### ⛔ KHÔNG được báo "Hoàn thành" nếu:
- Chưa tạo E2E test file
- Chưa chạy `npm run test:e2e`
- Tests đang fail

---

## Figma to Code - Component Mapping Rules

**QUAN TRỌNG:** Khi đọc thiết kế từ Figma, AI PHẢI tự động phát hiện và map các element sang component có sẵn.

### Auto-Detection Rules

| Figma Element | Component | Cách nhận biết |
|---------------|-----------|----------------|
| Input field với icon | `<Input icon="..." />` | Có icon bên trái + text field |
| Input field không icon | `<Input />` | Text field đơn giản |
| Password field | `<Input type="password" icon="square-lock-01" />` | Có icon lock, dots/hidden text |
| Email field | `<Input type="email" icon="mail-02" />` | Có icon mail/envelope |
| Search bar | `<Search />` | Có icon search + placeholder "Tìm kiếm" |
| Button gradient | `<Button variant="primary" />` | Nền gradient xanh, text trắng |
| Button outline/white | `<Button variant="secondary" />` | Nền trắng, có border |
| Button text only | `<Button variant="noborder" />` | Không có background/border |
| Button đỏ | `<Button variant="danger" />` | Màu đỏ/hồng |
| Checkbox | `<Checkbox />` | Ô vuông tick |
| Dropdown/Select | `<Dropdown />` | Có arrow down, expandable list |
| Tab navigation | `<Tabs />` | Multiple options ngang, 1 selected |
| Side panel | `<Drawer />` | Panel trượt từ phải |
| Modal/Dialog | `<Popup />` | Overlay + centered box |
| Confirm dialog | `<Confirm />` | Modal với 2 buttons Hủy/Xác nhận |
| Tooltip | `<Tooltip />` | Hover text bubble |
| Data table | `<Table />` | Grid với headers + rows |
| Pagination | `<Paging />` | Page numbers + arrows |
| Card/Box | `<Box />` | Container có border, rounded |
| Icon | `<Icon name="..." />` | Bất kỳ icon SVG nào |

---

## Component Reference

### Input
```vue
import { Input } from "@/components/custom/input"

<!-- Text input -->
<Input v-model="value" placeholder="Nhập thông tin" />

<!-- With prefix icon -->
<Input v-model="email" icon="mail-02" placeholder="Email" />

<!-- Password (auto show/hide toggle) -->
<Input v-model="password" type="password" icon="square-lock-01" placeholder="Mật khẩu" />

<!-- Currency formatting -->
<Input v-model="amount" type="currency" placeholder="Số tiền" />

<!-- With validation error -->
<Input v-model="value" :error="true" error-message="Lỗi validation" />

<!-- With suffix text -->
<Input v-model="value" suffix="VND" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string \| number | - | v-model binding |
| type | string | "text" | text, email, password, number, currency |
| icon | string | - | Icon name (prefix) |
| placeholder | string | "Nhập thông tin" | Placeholder text |
| disabled | boolean | false | Disabled state |
| error | boolean | false | Error state |
| errorMessage | string | - | Error message |
| suffix | string | - | Suffix text |

---

### Button
```vue
import { Button } from "@/components/custom/button"

<!-- Primary (gradient background) -->
<Button variant="primary" @click="handle">Đăng nhập</Button>

<!-- Secondary (white background) -->
<Button variant="secondary">Hủy</Button>

<!-- No border (text only) -->
<Button variant="noborder">Xem thêm</Button>

<!-- Danger -->
<Button variant="danger">Xóa</Button>

<!-- With loading -->
<Button variant="primary" :loading="isLoading">Đang xử lý</Button>

<!-- With icon -->
<Button variant="primary" icon="plus">Thêm mới</Button>

<!-- Sizes -->
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | "primary" | primary, secondary, noborder, danger, error, success |
| size | string | "default" | sm, default, lg |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Loading state |
| icon | string | - | Icon name |

---

### Search
```vue
import { Search } from "@/components/custom/search"

<Search
    v-model="searchTerm"
    placeholder="Tìm kiếm..."
    :debounce="300"
    @search="handleSearch"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string | - | v-model binding |
| placeholder | string | "Tìm kiếm" | Placeholder |
| debounce | number | 300 | Debounce time (ms) |
| disabled | boolean | false | Disabled state |

**Events:** `@search`, `@enter`, `@focus`, `@blur`

---

### Checkbox
```vue
import { Checkbox } from "@/components/custom/checkbox"

<!-- Basic -->
<Checkbox v-model="isChecked" label="Ghi nhớ đăng nhập" />

<!-- Radio mode -->
<Checkbox v-model="selected" type="radio" value="option1" label="Option 1" />

<!-- Array values -->
<Checkbox v-model="selectedItems" :value="item.id" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | boolean \| array | - | v-model binding |
| value | any | - | Value for array mode |
| label | string | - | Label text |
| type | string | "checkbox" | checkbox, radio |
| disabled | boolean | false | Disabled state |

---

### Dropdown
```vue
import { Dropdown, DropdownItem } from "@/components/custom/dropdown"

<Dropdown v-model="isOpen" title="Chọn option" position="bottom-start">
    <DropdownItem value="1" @click="select(1)">Option 1</DropdownItem>
    <DropdownItem value="2" icon="user-circle">Option 2</DropdownItem>
    <DropdownItem value="3" state="disabled">Option 3</DropdownItem>
</Dropdown>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | boolean | - | Open state |
| title | string | "Chọn" | Dropdown title |
| position | string | "bottom-start" | bottom, top, left, right, bottom-start, bottom-end, top-start, top-end |
| disabled | boolean | false | Disabled state |
| icon | string | - | Title icon |

---

### Tabs
```vue
import { Tabs } from "@/components/custom/tabs"

<Tabs
    v-model="activeTab"
    :tabs="[
        { key: 'tab1', title: 'Tab 1', icon: 'user-circle' },
        { key: 'tab2', title: 'Tab 2' },
        { key: 'tab3', title: 'Tab 3' }
    ]"
/>
```

---

### Drawer
```vue
import { Drawer } from "@/components/custom/drawer"

<Drawer v-model="isOpen" width="400px">
    <template #header>Header</template>
    <template #content>Body content</template>
    <template #footer>Footer buttons</template>
</Drawer>
```

**Props:** `modelValue`, `width`, `isPriority`, `isConfirm`
**Slots:** `header`, `content`, `footer`

---

### Popup (Modal)
```vue
import { Popup } from "@/components/custom/popup"

<Popup v-model="isOpen" title="Tiêu đề" width="500px">
    <p>Nội dung modal</p>
    <template #footer>
        <Button variant="secondary" @click="isOpen = false">Hủy</Button>
        <Button variant="primary" @click="save">Lưu</Button>
    </template>
</Popup>
```

---

### Confirm
```vue
import { Confirm } from "@/components/custom/confirm"

<Confirm
    v-model="showConfirm"
    title="Xác nhận xóa"
    content="Bạn có chắc muốn xóa?"
    @confirm="handleDelete"
/>
```

---

### Tooltip
```vue
import { Tooltip } from "@/components/custom/tooltip"

<Tooltip content="Tooltip text">
    <Button>Hover me</Button>
</Tooltip>
```

---

### Table
```vue
import { LayoutTable } from "@/components/custom/table"

<LayoutTable
    :tabs="[{ key: 'all', title: 'Tất cả' }]"
    :tab-selected="activeTab"
    @change-tab="handleTabChange"
>
    <template #left>Left header</template>
    <template #right>Right actions</template>
    <!-- Table content -->
</LayoutTable>
```

---

### Paging
```vue
import { Paging } from "@/components/custom/paging"

<Paging
    :total="100"
    :items-per-page="10"
    :default-page="1"
    @update:page="handlePageChange"
/>
```

---

### Box
```vue
import { Box } from "@/components/custom/box"

<Box state="default">Content</Box>
<Box state="selected">Selected item</Box>
<Box state="disabled">Disabled item</Box>
```

---

### Icon
```vue
import { Icon } from "@/components/custom/icon"

<Icon name="mail-02" :size="16" color="#1a2229" />
```

**Available Icons:**
`mail-02`, `square-lock-01`, `eye`, `eye-off`, `search`, `plus`, `x`, `chevron-left`, `chevron-right`, `user-circle`, `settings`, `send`, `users`, `briefcase`, `file-text`, `filter-horizontal`, `more-vertical`, `cancel-01`, `ticket`, `license`, `coins-01`, `bill`, `checked`, `Icon-zalo`, `building-06`, `list`, `user-check`

---

## UI Checkbox (Reka UI)

Nếu cần checkbox đơn giản không có label:
```vue
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox v-model:checked="isChecked" />
```

---

## UI Technology Stack & Styling Rules

### ⚠️ QUAN TRỌNG: Thứ tự ưu tiên styling

| Ưu tiên | Cách dùng | Khi nào |
|---------|-----------|---------|
| **1. TailwindCSS** | Classes trực tiếp trong `class=""` | **MẶC ĐỊNH - LUÔN DÙNG** |
| **2. CSS Module** | `:class="$style.name"` trong `<style module>` | CHỈ khi cần dynamic binding hoặc styles không thể viết bằng Tailwind |

### ✅ ĐÚNG - Sử dụng TailwindCSS trực tiếp

```vue
<template>
    <!-- TailwindCSS classes trực tiếp trong template -->
    <div class="min-h-screen w-full bg-[#f2f2f4] flex items-center justify-center p-4">
        <div class="w-full max-w-[500px] lg:w-[638px] p-6 sm:p-10 bg-white rounded-2xl shadow-lg">
            <h1 class="text-[#1a2229] text-xl sm:text-2xl font-bold">Title</h1>
            <p class="text-[#495366] text-sm font-medium mt-2">Description</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* CHỈ dùng SCSS cho những gì Tailwind không hỗ trợ */
.glass_card {
    box-shadow:
        0px 24px 40px rgba(0, 0, 0, 0.03),
        inset 0px 8px 32px rgba(255, 255, 255, 0.18);
}
</style>
```

### ❌ SAI - Không viết CSS/SCSS khi có thể dùng Tailwind

```vue
<!-- ❌ SAI: Không viết như này -->
<template>
    <div class="auth-page">
        <div class="glass-panel">...</div>
    </div>
</template>

<!-- ❌ SAI: Không dùng CSS thuần, phải dùng lang="scss" -->
<style scoped>
.auth-page {
    @apply min-h-screen w-full;  /* ❌ Nên viết trực tiếp trong class */
    background: #f2f2f4;
}
</style>

<!-- ❌ SAI: Dù dùng SCSS nhưng vẫn sai vì nên dùng Tailwind -->
<style lang="scss" scoped>
.glass-panel {
    @apply flex items-center;    /* ❌ Không cần viết CSS */
    width: 638px;
}
</style>
```

### Khi nào cần viết SCSS

Chỉ viết SCSS khi Tailwind không hỗ trợ:
1. **Complex box-shadow** - Multi-layer shadows
2. **Dynamic styles** - v-bind hoặc computed styles
3. **Pseudo-elements** - `::before`, `::after` với content phức tạp
4. **Animations phức tạp** - Keyframes custom
5. **Deep selectors** - `:deep()` cho child components

#### ✅ Scoped SCSS (ưu tiên - dùng khi không cần dynamic binding)

```vue
<template>
    <div class="glass_card w-full max-w-[638px] p-10 bg-gradient-to-b from-white to-white/10 rounded-2xl">
        Content
    </div>
</template>

<style lang="scss" scoped>
.glass_card {
    box-shadow:
        0px 24px 40px 0px rgba(0, 0, 0, 0.03),
        inset 0px 8px 32px 0px rgba(255, 255, 255, 0.18);
}
</style>
```

#### ✅ Module SCSS (dùng khi cần dynamic class binding)

```vue
<template>
    <div
        class="w-full max-w-[638px] p-10 bg-gradient-to-b from-white to-white/10 rounded-2xl"
        :class="$style.glass_card"
    >
        Content
    </div>
</template>

<style lang="scss" module>
.glass_card {
    box-shadow:
        0px 24px 40px 0px rgba(0, 0, 0, 0.03),
        inset 0px 8px 32px 0px rgba(255, 255, 255, 0.18);
}
</style>
```

#### ❌ SAI - Không dùng CSS thuần

```vue
<!-- ❌ KHÔNG viết như này -->
<style>
.my-class { ... }
</style>

<style module>
.my-class { ... }
</style>
```

### Image Helper Function

Mỗi page/feature có thư mục images riêng. Sử dụng pattern sau để load images:

```typescript
// 1. Import images trực tiếp từ thư mục feature
import logo_img from "@/assets/images/login/logo.svg"
import preview_img from "@/assets/images/login/app-preview.png"

// 2. Tạo helper function để map tên → import
const img = (name: string): string => {
    const images: Record<string, string> = {
        "logo.svg": logo_img,
        "app-preview.png": preview_img
    }
    return images[name] || ""
}

// 3. Sử dụng trong template
<img :src="img('logo.svg')" alt="Logo" />
<img :src="img('app-preview.png')" alt="Preview" />
```

**Lưu ý:** Pattern này đảm bảo TypeScript type-safe và Vite bundling hoạt động đúng.

**Cấu trúc thư mục images:**
```
src/assets/images/
├── common/           # Shared images (logo, icons)
├── login/            # Login page images
├── dashboard/        # Dashboard images
├── chat/             # Chat feature images
└── ...
```

### Responsive Design Rules

#### ⚠️ NGUYÊN TẮC QUAN TRỌNG: Chuyển đổi Figma → Responsive

Figma design có kích thước cố định (ví dụ: 638px, 920px). **KHÔNG** copy trực tiếp sang code. Thay vào đó:

| Figma Design | Responsive Code | Giải thích |
|--------------|-----------------|------------|
| `width: 638px` | `w-full max-w-[638px]` | Full width trên mobile, max ở desktop |
| `height: 920px` | `min-h-screen lg:h-[920px]` | Auto height mobile, fixed ở desktop |
| `padding: 100px` | `p-6 sm:p-10 lg:p-[100px]` | Padding giảm dần theo màn hình |
| `gap: 40px` | `gap-6 lg:gap-10` | Gap nhỏ hơn trên mobile |
| Element cạnh nhau | `flex-col lg:flex-row` | Stack trên mobile, row ở desktop |
| Element ẩn trên mobile | `hidden lg:block` | Ẩn hoàn toàn trên mobile |

#### ✅ ĐÚNG - Responsive Pattern

```vue
<template>
    <!-- Full-screen layout với 2 panels -->
    <div class="min-h-screen w-full bg-[#f2f2f4]">
        <!-- Container: stack trên mobile, row trên desktop -->
        <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen p-4 lg:p-5 max-w-[1440px] mx-auto gap-5">

            <!-- Panel chính: full width mobile, fixed max-width desktop -->
            <div class="w-full max-w-[638px] min-h-[500px] lg:h-[920px] p-6 sm:p-10 lg:p-[100px]">
                <!-- Content -->
            </div>

            <!-- Panel phụ: ẩn trên mobile/tablet -->
            <div class="hidden xl:block w-[746px] h-[920px]">
                <!-- Secondary content -->
            </div>
        </div>
    </div>
</template>
```

#### ❌ SAI - Copy trực tiếp từ Figma

```vue
<!-- ❌ KHÔNG làm như này -->
<div class="w-[638px] h-[920px] p-[100px]">
    <!-- Sẽ vỡ layout trên mobile -->
</div>
```

#### Quy trình chuyển đổi Figma → Code

1. **Xác định breakpoint ẩn/hiện**: Element nào ẩn trên mobile? → `hidden lg:block`
2. **Layout direction**: Row hay column trên mobile? → `flex-col lg:flex-row`
3. **Width**: Dùng `w-full max-w-[X]` thay vì `w-[X]`
4. **Height**: Dùng `min-h-[X]` hoặc `h-auto lg:h-[X]` thay vì `h-[X]`
5. **Padding/Gap**: Giảm 40-60% cho mobile → `p-6 lg:p-[100px]`
6. **Font size**: Giảm 1-2 bậc cho mobile → `text-lg lg:text-2xl`

### Breakpoint Reference

| Breakpoint | Min Width | Usage | Figma Frame |
|------------|-----------|-------|-------------|
| (default) | 0px | Mobile phones | 375px - 639px |
| `sm:` | 640px | Large phones | 640px - 767px |
| `md:` | 768px | Tablets | 768px - 1023px |
| `lg:` | 1024px | Laptops | 1024px - 1279px |
| `xl:` | 1280px | Desktops | 1280px - 1535px |
| `2xl:` | 1536px | Large screens | 1536px+ |

### Common Responsive Patterns

```vue
<!-- Full-screen centered content -->
<div class="min-h-screen flex items-center justify-center p-4 lg:p-8">
    <div class="w-full max-w-md lg:max-w-lg">...</div>
</div>

<!-- Two-column layout (stack on mobile) -->
<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
    <div class="w-full lg:w-1/2">...</div>
    <div class="w-full lg:w-1/2">...</div>
</div>

<!-- Hide on mobile -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>

<!-- Responsive text -->
<h1 class="text-xl sm:text-2xl lg:text-3xl font-bold">Title</h1>

<!-- Responsive spacing -->
<div class="p-4 sm:p-6 lg:p-10 gap-4 lg:gap-8">...</div>
```

---

## Coding Rules

### Styling (QUAN TRỌNG)
1. **LUÔN** viết TailwindCSS classes **TRỰC TIẾP trong `class=""`** - KHÔNG viết CSS riêng
2. **KHÔNG** dùng `@apply` trong CSS - viết Tailwind classes trong template
3. **CHỈ** dùng `<style>` khi Tailwind không hỗ trợ (complex shadows, animations)
4. **KHÔNG** tạo class names như `.auth-page`, `.glass-panel` rồi viết CSS - dùng Tailwind trực tiếp

### CSS/SCSS Rules (KHI CẦN VIẾT STYLES)
5. **LUÔN** dùng `lang="scss"` khi viết styles
6. **ƯU TIÊN** dùng `scoped` để tránh style leak ra global
7. Dùng `module` khi cần dynamic class binding với `$style`
8. Thứ tự ưu tiên: `<style lang="scss" scoped>` > `<style lang="scss" module>` > `<style lang="scss">`

### Colors (BẮT BUỘC)
5. **LUÔN** sử dụng màu từ CSS Variables đã khai báo trong `src/style.css`
6. **KHÔNG** hardcode màu hex trừ khi màu đó chưa có trong design system
7. Khi gặp màu mới từ Figma → kiểm tra `style.css` trước, nếu có màu tương tự thì dùng CSS variable

### Components (BẮT BUỘC - AUTO-DETECT)
8. **BẮT BUỘC** kiểm tra và sử dụng components có sẵn trước khi viết code mới
9. **LUÔN** import component từ `@/components/custom/` hoặc `@/components/ui/`
10. **KHÔNG** viết inline SVG - sử dụng `<Icon name="..." />`
11. **KHÔNG** viết custom HTML cho các UI patterns đã có component

### Other
12. **LUÔN** thiết kế responsive mobile-first với Tailwind breakpoints (`sm:`, `md:`, `lg:`)
13. **LUÔN** sử dụng `img()` helper function để load images từ thư mục feature
14. Tuân thủ naming convention: `snake_case` cho variables, `camelCase` cho functions

---

## ⚠️ Component Auto-Detection (BẮT BUỘC)

Trước khi viết UI, **BẮT BUỘC** kiểm tra components có sẵn và sử dụng nếu có chức năng tương tự.

### Available Components Catalog

| UI Pattern | Component Path | Sử dụng khi |
|------------|----------------|-------------|
| **Popup/Modal** | `@/components/ui/dialog` | Dialog, popup, modal overlay |
| **Alert Dialog** | `@/components/ui/alert-dialog` | Confirm dialogs, warnings |
| **Drawer** | `@/components/ui/drawer` hoặc `@/components/custom/drawer` | Side panels, mobile menus |
| **Sheet** | `@/components/ui/sheet` | Side panels (alternative to drawer) |
| **Dropdown** | `@/components/ui/dropdown-menu` | Context menus, action menus |
| **Button** | `@/components/custom/button` hoặc `@/components/ui/button` | Tất cả buttons |
| **Input** | `@/components/custom/input` | Text inputs, password, email, currency |
| **Checkbox** | `@/components/custom/checkbox` hoặc `@/components/ui/checkbox` | Checkboxes |
| **Switch** | `@/components/ui/switch` | Toggle switches |
| **Icon** | `@/components/custom/icon` | Tất cả icons |
| **Toast** | `@/components/custom/toast` hoặc `@/components/ui/sonner` | Notifications |
| **Tooltip** | `@/components/custom/tooltip` | Hover tooltips |
| **Accordion** | `@/components/ui/accordion` | Expandable sections |
| **Tabs** | `@/components/custom/tabs` | Tab navigation |
| **Table** | `@/components/custom/table` | Data tables |
| **Pagination** | `@/components/ui/pagination` hoặc `@/components/custom/paging` | Page navigation |
| **Search** | `@/components/custom/search` | Search inputs |
| **Loading** | `@/components/custom/loading` | Loading states |
| **Skeleton** | `@/components/ui/skeleton` | Loading placeholders |
| **Scroll Area** | `@/components/ui/scroll-area` | Custom scrollbars |
| **Stepper** | `@/components/ui/stepper` | Multi-step forms |
| **Label** | `@/components/ui/label` | Form labels |

### Quy trình Auto-Detection

```
1. Nhận yêu cầu UI từ Figma/user
2. Xác định UI patterns cần dùng (popup? dropdown? button? input?)
3. Kiểm tra Component Catalog ở trên
4. Nếu có component phù hợp → BẮT BUỘC sử dụng
5. Nếu không có → mới được viết custom code
```

### ❌ SAI - Viết custom khi có component

```vue
<!-- ❌ KHÔNG viết popup custom -->
<div class="fixed inset-0 bg-black/50 z-50">
    <div class="bg-white rounded-lg p-6">...</div>
</div>

<!-- ❌ KHÔNG viết button custom -->
<button class="bg-primary text-white px-4 py-2 rounded-lg">Submit</button>

<!-- ❌ KHÔNG viết dropdown custom -->
<div class="relative">
    <button @click="open = !open">Menu</button>
    <div v-if="open" class="absolute top-full">...</div>
</div>
```

### ✅ ĐÚNG - Sử dụng components có sẵn

```vue
<!-- ✅ Sử dụng Dialog component -->
<Dialog v-model:open="is_open">
    <DialogTrigger as-child>
        <Button>Open</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <!-- Content -->
    </DialogContent>
</Dialog>

<!-- ✅ Sử dụng Button component -->
<Button variant="primary" @click="handleSubmit">Submit</Button>

<!-- ✅ Sử dụng DropdownMenu component -->
<DropdownMenu>
    <DropdownMenuTrigger as-child>
        <Button variant="ghost">Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
```

---

## 🎨 Color System (BẮT BUỘC)

**LUÔN** sử dụng CSS Variables từ `src/style.css`. **KHÔNG** hardcode màu hex.

### Color Palette

| Category | CSS Variable | Hex Value | Tailwind Class |
|----------|--------------|-----------|----------------|
| **Primary** | `--primary-base` | #269a85 | `text-primary` / `bg-primary` |
| | `--primary-100` | #40f0d0 | `text-primary-100` / `bg-primary-100` |
| | `--primary-200` | #33c4aa | `text-primary-200` / `bg-primary-200` |
| | `--primary-300` | #269a85 | `text-primary-300` / `bg-primary-300` |
| | `--primary-400` | #1a7262 | `text-primary-400` / `bg-primary-400` |
| | `--primary-500` | #0e4d41 | `text-primary-500` / `bg-primary-500` |
| | `--primary-600` | #052a23 | `text-primary-600` / `bg-primary-600` |
| | `--primary-700` | #011410 | `text-primary-700` / `bg-primary-700` |
| **Secondary** | `--secondary-base` | #1e7b6a | `text-secondary` / `bg-secondary` |
| | `--secondary-100` | #47fad9 | `text-secondary-100` / `bg-secondary-100` |
| | `--secondary-200` → `700` | ... | `text-secondary-{n}` / `bg-secondary-{n}` |
| **Tertiary** | `--tertiary-base` | #2eb9a0 | `text-tertiary` / `bg-tertiary` |
| | `--tertiary-100` | #bcfeed | `text-tertiary-100` / `bg-tertiary-100` |
| | `--tertiary-200` → `700` | ... | `text-tertiary-{n}` / `bg-tertiary-{n}` |
| **Grey** | `--grey-100` | #eef1f1 | `text-grey-100` / `bg-grey-100` |
| | `--grey-200` | #d2d8d6 | `text-grey-200` / `bg-grey-200` |
| | `--grey-300` | #abb0af | `text-grey-300` / `bg-grey-300` |
| | `--grey-400` | #868a89 | `text-grey-400` / `bg-grey-400` |
| | `--grey-500` | #636665 | `text-grey-500` / `bg-grey-500` |
| | `--grey-600` | #424443 | `text-grey-600` / `bg-grey-600` |
| | `--grey-700` | #232424 | `text-grey-700` / `bg-grey-700` |
| **Neutral** | `--neutral-100` | #1a2229 | `text-neutral-100` / `bg-neutral-100` |
| **Status** | `--destructive` | #dc2626 | `text-destructive` / `bg-destructive` |
| **Base** | `--white` | #fff | `text-white` / `bg-white` |
| | `--black` | #213547 | `text-black` / `bg-black` |
| **Gradient** | `--gradient` | radial-gradient(...) | Dùng CSS variable trực tiếp |

### Semantic Colors (Shadcn/Tailwind)

| Semantic | Usage | Tailwind Class |
|----------|-------|----------------|
| `--background` | Page background | `bg-background` |
| `--foreground` | Text color | `text-foreground` |
| `--muted` | Muted backgrounds | `bg-muted` |
| `--muted-foreground` | Muted text | `text-muted-foreground` |
| `--border` | Borders | `border-border` |
| `--ring` | Focus rings | `ring-ring` |

### ❌ SAI - Hardcode màu

```vue
<!-- ❌ KHÔNG hardcode màu có trong palette -->
<div class="text-[#1a2229]">Text</div>
<div class="bg-[#269a85]">Background</div>
<button class="bg-[#dc2626]">Delete</button>
```

### ✅ ĐÚNG - Dùng CSS Variables

```vue
<!-- ✅ Sử dụng Tailwind classes với CSS variables -->
<div class="text-neutral-100">Text</div>
<div class="bg-primary">Background</div>
<button class="bg-destructive">Delete</button>

<!-- ✅ Hoặc dùng semantic colors -->
<div class="text-foreground">Text</div>
<div class="bg-muted">Muted background</div>
```

### Khi nào được dùng màu hex trực tiếp?

Chỉ khi màu đó **CHƯA CÓ** trong design system:
```vue
<!-- ✅ OK - màu mới từ Figma chưa có trong palette -->
<div class="text-[#0069fe]">Link màu xanh dương (chưa có trong palette)</div>
<div class="bg-[#f2f2f4]">Background màu xám nhạt đặc biệt</div>
```

---

## Example: Figma to Vue Conversion

**Khi thấy trong Figma:**
- Input với icon mail → `<Input icon="mail-02" type="email" />`
- Input với icon lock và dots → `<Input icon="square-lock-01" type="password" />`
- Button gradient xanh → `<Button variant="primary" />`
- Button trắng có border → `<Button variant="secondary" />`
- Checkbox với text → `<Checkbox label="..." />` hoặc `<label><Checkbox /> Text</label>`
- Text link màu xanh dương → `<a class="text-[#0069fe]">Link</a>`
- Divider với text "Hoặc" → Dùng flex + border + text

**Pattern chung:**
```vue
<script setup>
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import { Checkbox } from "@/components/custom/checkbox"
// hoặc import { Checkbox } from "@/components/ui/checkbox" nếu không cần label
</script>
```
