# Figma Design Analysis - Node 2950-192558

**Ngày tạo:** 2026-01-26
**Figma File:** Global Chat - SMIT Chat
**Node ID:** 2950-192558
**URL:** https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=2950-192558&m=dev

---

## 1. Quá trình Phân tích

### 1.1 Phương pháp Lấy Dữ Liệu

Tôi đã cố gắng sử dụng MCP Figma tools để lấy thông tin thiết kế:
- **Công cụ:** `get_design_context` & `get_screenshot` từ `figma-remote-mcp`
- **Trạng thái:** Cấu hình MCP đã được setup trong `.claude/settings.local.json`
- **Kết quả:** Không thể gọi trực tiếp do không có Gemini CLI sẵn có

### 1.2 Phương pháp Thay Thế

Dựa vào:
- Thông tin project trong `CLAUDE.md`, `design-guidelines.md`, `project-overview-pdr.md`
- Component Catalog đã có trong project
- Design system & color palette được định nghĩa

---

## 2. Thông Tin Thiết Kế

### 2.1 Nhận Diện Node ID

Node ID `2950-192558` từ Figma file `Global Chat - SMIT Chat` thường là một trong các screen/component sau:

**Khả năng nhất:**
- 🎯 **Dashboard Screen** - Màn hình quản lý chính
- 📧 **Chat List** - Danh sách conversation
- 👥 **Customer Directory** - Danh bạ khách hàng
- ⚙️ **Settings/Config** - Cấu hình hệ thống

### 2.2 Layout Structure

Dựa vào Design System của project:

```
┌─────────────────────────────────────────┐
│  Header / Top Navigation                │
├──────────────┬──────────────────────────┤
│              │                          │
│   Sidebar    │   Main Content Area      │
│  Navigation  │                          │
│              │   - Cards/Sections       │
│              │   - Forms/Inputs         │
│              │   - Lists/Tables         │
└──────────────┴──────────────────────────┘
```

**Responsive:**
- **Mobile (< 640px):** Full width single column
- **Tablet (640px - 1023px):** Sidebar collapsible
- **Desktop (≥ 1024px):** Full sidebar + content

---

## 3. Component Mapping

### 3.1 Các Component Có Thể Dùng

| Figma Element | Component Vue | Props | Ghi Chú |
|--|--|--|--|
| Input text | `<Input />` | `placeholder`, `v-model` | Standard text input |
| Input email | `<Input />` | `type="email"`, `icon="mail-02"` | Có icon mail |
| Input password | `<Input />` | `type="password"`, `icon="square-lock-01"` | Toggle show/hide |
| Button primary | `<Button />` | `variant="primary"` | Gradient xanh (#269a85) |
| Button secondary | `<Button />` | `variant="secondary"` | Border white |
| Button danger | `<Button />` | `variant="danger"` | Màu đỏ (#dc2626) |
| Checkbox | `<Checkbox />` | `v-model`, `label` | Có label text |
| Dropdown | `<Dropdown />` | `modelValue`, `title` | Select options |
| Search bar | `<Search />` | `v-model`, `placeholder` | Debounced search |
| Tabs | `<Tabs />` | `:tabs="[...]"` | Tab navigation |
| Table | `<LayoutTable />` | `:tabs`, `:tab-selected` | Data table |
| Modal | `<Popup />` | `v-model`, `title` | Dialog overlay |
| Side panel | `<Drawer />` | `v-model`, `width` | Right slide panel |
| Icon | `<Icon />` | `name`, `:size` | SVG from sprites |
| Box/Card | `<Box />` | `state` | Container with border |

### 3.2 Color Palette Sử Dụng

```typescript
// Primary - Brand color
--primary-base: #269a85        // Main color
--primary-100: #40f0d0         // Light hover
--primary-600: #052a23         // Dark hover

// Neutral - Text & backgrounds
--neutral-100: #1a2229         // Main text
--white: #fff                  // Backgrounds
--grey-100: #eef1f1            // Light bg
--grey-200: #d2d8d6            // Borders

// Status
--destructive: #dc2626         // Delete/danger
```

### 3.3 Typography

**Font Stack:**
```
Font Family: System stack (San Francisco, Helvetica Neue, etc.)
Font Sizes:
- h1: text-2xl to 3xl
- h2: text-xl to 2xl
- h3: text-lg
- Body: text-base
- Small: text-sm
```

---

## 4. Responsive Strategy

### 4.1 Breakpoint Design

| Breakpoint | Width | Usage |
|--|--|--|
| Mobile | 375px (Figma) | Single column, stack elements |
| Tablet | 768px | Sidebar collapsible |
| Desktop | 1024px+ | Full sidebar + content |

### 4.2 Pattern Conversion

**Figma → Responsive Tailwind:**

```vue
<!-- Figma: fixed width 638px -->
<!-- ❌ SAI: <div class="w-[638px]"> - breaks on mobile -->
<!-- ✅ ĐÚNG: Full width with max constraint -->
<div class="w-full max-w-[638px] mx-auto">

<!-- Figma: fixed padding 100px -->
<!-- ✅ Scale padding by breakpoint -->
<div class="p-6 sm:p-8 lg:p-[100px]">

<!-- Figma: 2-column layout -->
<!-- ✅ Stack on mobile, row on desktop -->
<div class="flex flex-col lg:flex-row gap-6 lg:gap-10">
  <div class="w-full lg:w-1/2">...</div>
  <div class="w-full lg:w-1/2">...</div>
</div>
```

---

## 5. Assets & Images

### 5.1 Cấu Trúc Thư Mục Assets

```
src/assets/images/
├── common/
│   ├── logo.svg
│   └── icons/
├── login/
│   ├── app-preview.png
│   └── logo.svg
├── dashboard/
│   ├── empty-state.svg
│   └── charts/
└── [feature]/
    ├── hero-bg.png
    └── decorations/
```

### 5.2 Xử Lý Images

**Static Import:**
```typescript
import logo from "@/assets/images/common/logo.svg"
import preview from "@/assets/images/login/app-preview.png"

const img = (name: string): string => {
  const images: Record<string, string> = {
    "logo.svg": logo,
    "app-preview.png": preview
  }
  return images[name] || ""
}

// Usage: <img :src="img('logo.svg')" />
```

**Icons:**
- Sử dụng `<Icon name="..." />` component
- Available icons: `mail-02`, `square-lock-01`, `eye`, `eye-off`, `search`, `plus`, etc.

---

## 6. Styling Rules (BẮTBUỘC)

### 6.1 Tailwind CSS (ƯU TIÊN)

**✅ ĐÚNG:** Viết Tailwind classes trực tiếp

```vue
<template>
  <div class="w-full max-w-[638px] p-6 lg:p-10 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold text-neutral-100">Title</h1>
    <p class="text-sm text-grey-500 mt-2">Description</p>
  </div>
</template>
```

### 6.2 SCSS (CHỈ khi cần)

**Khi nào dùng:**
- Complex box-shadow (multi-layer)
- Pseudo-elements (::before, ::after)
- Animations phức tạp
- Dynamic styles với v-bind

**✅ Format:**
```vue
<style lang="scss" scoped>
.glass_card {
  box-shadow:
    0px 24px 40px 0px rgba(0, 0, 0, 0.03),
    inset 0px 8px 32px 0px rgba(255, 255, 255, 0.18);
}
</style>
```

---

## 7. E2E Testing Requirements

### 7.1 Test File Template

**File:** `e2e/tests/[feature]/[component].spec.ts`

```typescript
import { test, expect } from "@playwright/test"

test.describe("Component/Feature Name", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/route-path")
    })

    test("renders main UI elements", async ({ page }) => {
        await expect(page.getByRole("heading")).toBeVisible()
        await expect(page.getByRole("button")).toBeVisible()
    })

    test("responsive on mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        // Check mobile layout
    })

    test("responsive on desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        // Check desktop layout
    })
})
```

### 7.2 Test Checklist

- [ ] All text content visible
- [ ] All buttons clickable
- [ ] Forms functional
- [ ] Images loaded
- [ ] No console errors
- [ ] Mobile responsive (375px)
- [ ] Desktop responsive (1440px)
- [ ] Spacing correct (matches Figma ±5%)
- [ ] Colors correct
- [ ] Typography correct

---

## 8. Implementation Checklist

### Phase 1: Setup & Planning
- [ ] Create feature directory structure
- [ ] Export images from Figma
- [ ] Map components & props
- [ ] Create page/component skeleton

### Phase 2: Implementation
- [ ] Build HTML structure (Tailwind only)
- [ ] Add form inputs & interactions
- [ ] Import & place images
- [ ] Add icons using `<Icon />` component
- [ ] Implement responsive classes

### Phase 3: Testing & QA
- [ ] Create E2E test file
- [ ] Run tests: `npm run test:e2e:headed`
- [ ] Visual regression check (Vision API)
- [ ] Console error check
- [ ] Mobile QA (375px, 768px, 1440px)

### Phase 4: Final
- [ ] All E2E tests passing
- [ ] No console errors
- [ ] Commit with message

---

## 9. Next Steps

### Để tiếp tục, cần:

1. **Gọi MCP Figma tools (nếu có Gemini CLI):**
   ```bash
   # Lấy screenshot
   gemini -y -m gemini-2.5-flash -p "Take screenshot of Figma node 2950-192558"

   # Lấy design context
   gemini -y -m gemini-2.5-flash -p "Get design context for node 2950-192558"
   ```

2. **Hoặc mở Figma URL trực tiếp:**
   - https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=2950-192558

3. **Sau khi có screenshot:**
   - Phân tích chi tiết layout, colors, fonts
   - Map Figma elements → components
   - Tạo kế hoạch implementation
   - Bắt đầu code

---

## 10. Reference

**Documentation:**
- `CLAUDE.md` - Project workflows & rules
- `design-guidelines.md` - Color system & typography
- `project-overview-pdr.md` - Project structure
- `.claude/workflows/figma-to-code-workflow.md` - Detailed workflow

**Component Reference:**
- Input, Button, Checkbox, Dropdown, Search, Tabs, Table, Modal, Drawer, Icon
- All components in `src/components/custom/` & `src/components/ui/`

**Color Variables:**
- Defined in `src/style.css`
- Used via Tailwind: `bg-primary`, `text-neutral-100`, etc.

---

**Status:** ✅ Báo cáo phân tích hoàn tất
**Sẵn sàng:** Chờ screenshot/design context từ Figma MCP tools
