# Sidebar Navigation

## Tổng quan

Sidebar navigation là component chính trong layout của hệ thống SMIT Chat. Cung cấp điều hướng giữa các trang chính và hiển thị thông tin user hiện tại.

**Trạng thái:**
- **Mở rộng (200px):** Icon + label text
- **Thu gọn (56px):** Icon only
- **Hover-to-expand:** 300ms delay, tự động thu lại khi rời chuột
- **Sliding active indicator:** Smooth animation giữa menu items

**Design:** [SMIT Chat Figma](https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=619-66353)

---

## Cấu trúc Files

| File | Mục đích |
|------|---------|
| `src/components/sidebar/Sidebar.vue` | Component chính, quản lý state, hover logic, indicator position |
| `src/components/sidebar/SidebarItem.vue` | Component menu item (không sử dụng trực tiếp - đã inline vào Sidebar.vue) |
| `src/layout/index.vue` | Import và render Sidebar |
| `src/router/index.ts` | 6 routes con cho `/app` (connect, chat, contacts, history, staff, settings) |
| `src/pages/app/` | 6 placeholder pages cho mỗi route |

---

## Menu Items

| Label | Icon | Route | Component |
|-------|------|-------|-----------|
| Kết nối nền tảng | layers-01 | `/app/connect` | ConnectPage.vue |
| Chat | chatting-01 | `/app/chat` | ChatPage.vue |
| Danh bạ | contact-01 | `/app/contacts` | ContactsPage.vue |
| Lịch sử | clock-01 | `/app/history` | HistoryPage.vue |
| Nhân viên | user-multiple | `/app/staff` | StaffPage.vue |
| Cài đặt | setting-01 | `/app/settings` | SettingsPage.vue |

Default route: `/app/chat`

---

## Components Sử Dụng

### Icon Component
- **Import:** `src/components/custom/icon/Icon.vue`
- **Props:**
  - `name: string` - Tên icon (e.g., "layers-01", "chatting-01")
  - `size?: number` - Kích thước (default 16)
  - `color?: string` - Màu sắc (default "white")
- **Icons dùng:** logo, layers-01, chatting-01, contact-01, clock-01, user-multiple, setting-01

### Router Link (Vue Router)
- **Tag:** `<router-link>`
- **Props:**
  - `to: string` - Route destination
- **Class:** `router-link-active` (Vue Router tự động thêm khi route match)

---

## Luồng Hoạt Động

### 1. Khởi tạo
```
Sidebar.vue mounted
→ MENU_ITEMS config
→ active_index computed (từ route path)
→ updateIndicatorPosition() tính toán vị trí indicator
```

### 2. Hover Expand/Collapse
```
@mouseenter
  → Trigger setTimeout 300ms
  → is_expanded.value = true (width: 200px, text opacity: 100%)

@mouseleave
  → clearTimeout
  → is_expanded.value = false (width: 56px, text opacity: 0%)
```

### 3. Route Change
```
route.path thay đổi
→ active_index computed update
→ Watch active_index trigger
→ updateIndicatorPosition()
→ Indicator slide với transform: translateY(...)
```

### 4. Indicator Position Calculation
```
const container_rect = container.getBoundingClientRect()
const item_rect = active_item.getBoundingClientRect()
indicator_top = item_rect.top - container_rect.top
→ CSS: transform: translateY(${indicator_top}px)
```

---

## Kỹ Thuật Chính

### Sliding Indicator
- **HTML:** `<div class="sidebar-indicator">`
- **Position:** Absolute, covers active item
- **Animation:** `transform: translateY()` + CSS transition 300ms
- **Width:** Dynamic (full width khi expanded, 32px khi collapsed)
- **Background:** CSS var `--gradient` (từ design system)
- **Z-index:** 0 (behind items với z-10)

### State Management
- **is_expanded:** ref<boolean> - Sidebar expand/collapse state
- **active_index:** computed - Tính từ route path
- **indicator_top:** ref<number> - Y position tính từ DOM

### Event Handling
- **Hover:** setTimeout 300ms, clearTimeout on leave
- **Route change:** Watch active_index, nextTick updateIndicatorPosition
- **Resize:** updateIndicatorPosition on is_expanded watch
- **Cleanup:** clearTimeout onBeforeUnmount

### CSS Transitions
```css
.sidebar-nav {
  transition: width 300ms, padding-bottom 300ms;
}

.sidebar-text {
  transition: opacity 300ms;
}

.sidebar-indicator {
  transition: transform 300ms, width 300ms;
}
```

### Text Fade (Opacity)
- **Mở rộng:** `opacity: 100%` (visible)
- **Thu gọn:** `opacity: 0%` (hidden nhưng occupy space)
- **Container:** `overflow: hidden` auto-clip text

### Link Override
```css
.sidebar-nav a,
.sidebar-nav a:hover,
.sidebar-nav a:focus,
.sidebar-nav a:active {
  text-decoration: none !important;
  color: white !important;
}
```

---

## Assets

### Icons (src/assets/icons/sprites.svg)
Tất cả icons sử dụng SVG sprite, không cần import riêng:
- `layers-01` - Platform connections icon
- `chatting-01` - Chat icon
- `contact-01` - Contacts icon
- `clock-01` - History icon
- `user-multiple` - Staff icon
- `setting-01` - Settings icon
- `logo` - SMIT logo (inline với gradient defs)

---

## Ghi Chú Phát Triển

### Current Implementation
- User data (name, avatar, role) là mock:
  ```javascript
  const user_name = "SMIT"
  const user_role = "Nhân viên"
  const user_avatar = "https://ui-avatars.com/api/?name=SMIT&..."
  ```
- Cần kết nối với auth store để lấy thông tin user thực

### Edge Cases
1. **Fast hover:** Hover + quickly move away
   - Handled bởi hover_timer clear
2. **Route mismatch:** Route không match MENU_ITEMS
   - Fallback: active_index = 0 (default)
3. **DOM not ready:** refs null khi mounted
   - Fallback: Tính toán thủ công (active_index * 48)
4. **Window resize:** Indicator position có thể sai
   - TODO: Add window resize listener nếu cần

### Future Enhancements
- [ ] Kết nối auth store cho user data
- [ ] Thêm lock toggle (giữ sidebar expanded)
- [ ] Collapsible sub-menu items
- [ ] Drag-to-reorder menu items
- [ ] Custom icon badges (unread count)
- [ ] Keyboard shortcuts
- [ ] Keyboard navigation (arrow keys)

### Testing
- Visual test: `/e2e/tests/ui.spec.ts`
- Component test: `/__tests__/components/Sidebar.spec.ts` (todo)
- Route navigation test: `/__tests__/router/navigation.spec.ts` (todo)

---

## Layout Integration

**File:** `src/layout/index.vue`

```vue
<template>
  <div class="flex">
    <Sidebar />              <!-- 56-200px width -->
    <main class="flex-1">
      <RouterView />         <!-- Page content -->
    </main>
  </div>
</template>
```

**Background:** Full viewport background image, sidebar overlay transparent

---

## Responsive Considerations

- **Desktop (1024px+):** Full sidebar with text
- **Tablet (768px+):** Sidebar với text nhỏ hơn
- **Mobile:** Drawer sidebar (future - currently desktop only)

Current responsive: Tailwind breakpoints sử dụng, nhưng sidebar luôn visible

---

## Performance

- **No extra re-renders:** Indicator position tính từ refs, không trong template
- **Efficient animations:** CSS transitions, không JavaScript animations
- **Bundle size:** Icon sprite giảm requests
- **Memory:** Refs cleaned up onBeforeUnmount

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Indicator vị trí sai | Check menu_container_ref & item_refs assigned đúng |
| Text không fade | Check sidebar-text class và opacity transition |
| Expand delay không hoạt động | Check hover_timer & setTimeout 300ms |
| Icons không hiện | Check Icon component & sprite.svg loaded |
| Route active sai | Check MENU_ITEMS config & route.path |
