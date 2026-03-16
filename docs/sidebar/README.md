# Sidebar Navigation Component

## Tổng quan

Sidebar Navigation là component chính của ứng dụng, cung cấp bộ lọc và điều hướng chính cho người dùng. Component hỗ trợ 2 trạng thái: collapsed (56px) và expanded (200px) với hiệu ứng smooth hover-to-expand, sliding active indicator, và glass effect background.

**Figma Design:** https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=619-66353&m=dev

## Cấu trúc Files

| File | Đường dẫn | Mô tả |
|------|-----------|-------|
| **AppSidebar.vue** | `src/components/sidebar/AppSidebar.vue` | Component sidebar chính, quản lý state expand/collapse, render logo, nav items, sliding indicator, user info |
| **SidebarItem.vue** | `src/components/sidebar/SidebarItem.vue` | Nav item component, icon + label + RouterLink, tooltip khi collapsed |
| **index.ts** | `src/components/sidebar/index.ts` | Barrel export cho components |
| **useSidebar.ts** | `src/composables/useSidebar.ts` | Composable quản lý sidebar state (is_expanded, is_locked, active_index, event handlers) |
| **Chat/Connect/Contacts/History/Staff/Settings Page** | `src/pages/app/*Page.vue` | 6 placeholder pages cho routes |

## Components & Features

### 1. AppSidebar.vue (Component Chính)

**Props:** Không có

**Template Structure:**
```
<aside>
  ├── Logo Section (height: 56px)
  │   ├── Icon "logo" (32px)
  │   └── Text "SMIT CHAT" (fade animation)
  │
  ├── Navigation Nav
  │   ├── Sliding Active Indicator (44px height, gradient bg)
  │   └── SidebarItem x 6 (loop)
  │
  └── User Info Section
      ├── Avatar Icon (8x8px, white bg)
      └── User Name & Role (fade animation)
```

**Key Features:**
- **Width transition:** 56px (collapsed) ↔ 200px (expanded), 300ms easing
- **Hover-to-expand:** 500ms delay (configurable in useSidebar)
- **Lock toggle:** Giữ sidebar expanded when locked
- **Sliding indicator:** translateY animation theo active_index
- **Label fade:** opacity + maxWidth transition cho text labels
- **Glass effect:** transparent bg, z-index 20 để overlay

**Styling:**
- Background: `bg-transparent` (glass effect được set bằng CSS global)
- Sliding indicator: `bg-[var(--primary-base)]` (dynamic color)
- Width transition: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth easing)
- Z-index: 20 (ensure on top of content)

**State Management:**
```typescript
const { is_expanded, active_index, handleMouseEnter, handleMouseLeave } = useSidebar()
```

### 2. SidebarItem.vue (Nav Item Component)

**Props:**
```typescript
interface Props {
  icon: string           // Icon name từ sprites.svg
  label: string          // Display text
  to: string             // Route path
  is_expanded: boolean   // Từ parent (AppSidebar)
  is_active: boolean     // Từ parent (AppSidebar)
}
```

**Features:**
- **RouterLink:** Nested inside để active route tracking
- **Icon + Label:** Icon luôn visible, label fade in/out
- **Tooltip:** Hiển thị label khi collapsed (hover on icon)
- **Active state:** White text + không có background
- **Hover state:** White/60 → White, bg-white/10 (khi inactive)
- **Important override:** `!text-white` để override global CSS `a { color }` rule

**Styling:**
- Height: 44px (match sliding indicator height)
- Gap: 3px (icon to label spacing)
- Padding: px-[14px] (icon centering)
- Label transition: opacity + maxWidth duration-300
- No underline: `no-underline` class

### 3. useSidebar() Composable

**Return Interface:**
```typescript
interface SidebarReturn {
  is_expanded: Ref<boolean>
  is_locked: Ref<boolean>
  active_index: Ref<number>
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  toggleLock: () => void
}
```

**Logic:**
- **is_expanded:** Ref, default false
- **is_locked:** Ref, default false
- **active_index:** Computed, tìm matching route từ ROUTE_PATHS
  - Default active index = 1 (/app/chat) khi không match
- **handleMouseEnter():** Start 500ms timer, expand sidebar (nếu not locked)
- **handleMouseLeave():** Cancel timer, collapse sidebar (nếu not locked)
- **toggleLock():** Toggle lock state, auto-expand khi lock enabled

**Route Paths Mapping:**
```javascript
const ROUTE_PATHS = [
  "/app/connect",    // index 0: Kết nối nền tảng
  "/app/chat",       // index 1: Chat (default)
  "/app/contacts",   // index 2: Danh bạ
  "/app/history",    // index 3: Lịch sử
  "/app/staff",      // index 4: Nhân viên
  "/app/settings",   // index 5: Cài đặt
]
```

## Navigation Items Mapping

| Icon | Label | Route | Purpose |
|------|-------|-------|---------|
| `global` | Kết nối nền tảng | `/app/connect` | Platform integration/connections |
| `chatting-01` | Chat | `/app/chat` | Main messaging interface |
| `contact-01` | Danh bạ | `/app/contacts` | Contact management |
| `history` | Lịch sử | `/app/history` | Chat history/archive |
| `user-multiple` | Nhân viên | `/app/staff` | Staff/team management |
| `setting-01` | Cài đặt | `/app/settings` | Application settings |

## Components Sử Dụng

### Icon Component
```typescript
import { Icon } from "@/components/custom/icon"

<Icon name="logo" :size="32" class="flex-shrink-0" />
```
- Props: `name` (icon key), `size` (px), `class` (tailwind)
- Icons từ `src/assets/icons/sprites.svg`
- Uses SVG sprite với `currentColor` inherit

### Tooltip Component
```typescript
import { Tooltip } from "@/components/custom/tooltip"

<Tooltip :content="!is_expanded ? label : ''">
  <!-- content -->
</Tooltip>
```
- Props: `content` (text), `side` (default: 'right')
- Triggers on hover
- Helpful for showing labels when collapsed

### RouterLink
```typescript
<RouterLink :to="to" class="...">
  <!-- link content -->
</RouterLink>
```
- Native Vue Router component
- Handles active state tracking
- No special props needed

## Icons Added to Sprites

Các icon cần có trong `src/assets/icons/sprites.svg`:

```xml
<!-- Logo Icon (32px) -->
<symbol id="logo" viewBox="0 0 32 32">
  <!-- SVG path -->
</symbol>

<!-- Global Icon (20px) -->
<symbol id="global" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>

<!-- Chat Icon (20px) -->
<symbol id="chatting-01" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>

<!-- Contact Icon (20px) -->
<symbol id="contact-01" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>

<!-- History Icon (20px) -->
<symbol id="history" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>

<!-- User Multiple Icon (20px) -->
<symbol id="user-multiple" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>

<!-- Settings Icon (20px) -->
<symbol id="setting-01" viewBox="0 0 20 20">
  <!-- SVG path -->
</symbol>
```

**Entry in iconConfig.js:**
```javascript
const ICONS_WITH_DEFS = ['logo', 'global', 'chatting-01', 'contact-01', 'history', 'user-multiple', 'setting-01']
```

## Luồng Hoạt động

### 1. Initial Load
1. User visits `/app/*` page
2. Layout component renders AppSidebar
3. useSidebar() initializes: is_expanded=false, is_locked=false
4. Active index computed từ route.path matching
5. Sidebar rendered collapsed (56px width)

### 2. Hover-to-Expand
```
Mouse Enter → (500ms delay) → is_expanded = true → width animate to 200px
                                                   → label text fade in
Mouse Leave → is_expanded = false → width animate to 56px
                                  → label text fade out
```

### 3. Lock Toggle
```
User clicks lock icon → toggleLock() → is_locked = !is_locked
If locked: is_expanded = true (auto-expand + stay expanded)
If unlocked: revert to hover behavior
```

### 4. Navigation
```
User clicks nav item → RouterLink navigates → route.path changes
                    → active_index recomputed
                    → sliding indicator translateY to new position (300ms)
```

### 5. Active State
- Sliding indicator: smooth translateY animation
- Current nav item: white text
- Other items: white/60 text + hover effect

## Assets

### Icons in sprites.svg
- **logo:** 32px square (used in header + user avatar)
- **global:** 20px (platform connections)
- **chatting-01:** 20px (chat/messaging)
- **contact-01:** 20px (contacts)
- **history:** 20px (history)
- **user-multiple:** 20px (staff/team)
- **setting-01:** 20px (settings)

### Image Assets
- Logo SVG trong sprites (không cần file riêng)
- User avatar reuse logo icon (tạm thời)

## Files Updated

### src/router/index.ts
- Thêm 6 children routes cho `/app`:
  - `/app/connect` → ConnectPage.vue
  - `/app/chat` → ChatPage.vue (default redirect)
  - `/app/contacts` → ContactsPage.vue
  - `/app/history` → HistoryPage.vue
  - `/app/staff` → StaffPage.vue
  - `/app/settings` → SettingsPage.vue

### src/layout/index.vue
- Import AppSidebar component
- Render `<AppSidebar />` trước main content
- Add `min-w-0` class to main element (flex bug prevention)

### src/components/custom/icon/iconConfig.js
- Thêm "logo" vào ICONS_WITH_DEFS array

## Ghi chú Phát triển

### CSS Overrides
- **Text color override:** RouterLink có default CSS `a { color: ... }` global rule. Dùng `!text-white` (important) để override, đặc biệt cho active state.
- **Icon color:** Icon component dùng `fill: currentColor`, inherit từ parent text color.
- **Glass effect:** Transparent background + blur được set bằng CSS global variables.

### TypeScript
- **useSidebar:** Return type strictly typed
- **SidebarItem props:** Interface Props definition
- **Computed routes:** Route paths hardcoded trong composable, phải update nếu add routes

### Performance
- **Sidebar width:** Uses `willChange: 'transform'` cho sliding indicator optimization
- **Label animation:** maxWidth + opacity (GPU-friendly)
- **No rerenders:** Computed active_index tự động track route changes

### Edge Cases
1. **Route mismatch:** Nếu user visit route không in ROUTE_PATHS, default active_index = 1 (Chat)
2. **Lock while hovering:** Mouse leave ignored nếu locked
3. **Rapid navigation:** Indicator smooth animate ngay cả khi rapid clicks
4. **Narrow viewport:** Sidebar collapse width (56px) fit small screens

### Testing
- Test hover delay timer (500ms)
- Test lock/unlock toggle behavior
- Test active index computation
- Test label fade in/out timing
- Test sliding indicator translateY calculations

## Usage Examples

### In Layout
```vue
<template>
  <div class="flex h-screen">
    <AppSidebar />
    <main class="flex-1 min-w-0 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { AppSidebar } from '@/components/sidebar'
</script>
```

### Using useSidebar in Custom Component
```vue
<script setup>
import { useSidebar } from '@/composables/useSidebar'

const { is_expanded, active_index, toggleLock } = useSidebar()
</script>
```

## Related Documentation

- **Icon Component:** `src/components/custom/icon/`
- **Tooltip Component:** `src/components/custom/tooltip/`
- **Router Config:** `src/router/index.ts`
- **Layout:** `src/layout/index.vue`

## Phiên bản & Cập nhật

- **v1.0.0** (2026-03-16): Initial implementation
  - 2-state sidebar (56px/200px)
  - Hover-to-expand + lock feature
  - Sliding active indicator
  - 6 navigation items
  - User profile section

## Checklists cho Maintain

- [ ] Icons xuất hiện đúng trong sprites.svg
- [ ] Hover delay 500ms hoạt động smooth
- [ ] Lock toggle giữ sidebar expanded
- [ ] Sliding indicator animate mượt (300ms)
- [ ] Label text fade in/out đúng timing
- [ ] Active route highlight đúng
- [ ] Tooltip hiện khi collapsed
- [ ] Responsive trên mobile (56px width)
- [ ] Glass effect visible trên dark background
