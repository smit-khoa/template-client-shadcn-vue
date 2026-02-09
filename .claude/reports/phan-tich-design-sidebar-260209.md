# BÁO CÁO PHÂN TÍCH THIẾT KẾ SIDEBAR - SMIT CHAT

**Ngày:** 09/02/2026
**Figma URL:** https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=619-66353
**Node ID:** 619:66353

---

## 1. TỔNG QUAN

Sidebar có 2 trạng thái chính:
- **Collapsed (Đóng):** Chỉ hiển thị icons, width = 56px
- **Expanded (Mở):** Hiển thị icons + text labels, width = 200px

### Hành vi tương tác:
- Hover sidebar một khoảng thời gian → sidebar tự động expand
- Click vào menu item → active state với gradient background
- Background sidebar và menu items: transparent (trong suốt)

---

## 2. CẤU TRÚC COMPONENT

### 2.1 Sidebar Container
```
- Width (Collapsed): 56px
- Width (Expanded): 200px
- Height: 960px (full viewport)
- Padding: 20px 12px 26px 12px (top, horizontal, bottom)
- Background: Transparent
- Display: flex, flex-direction: column
- Justify: space-between
```

### 2.2 Top Section
**Logo + Menu Items**

**Logo:**
- Logo icon: 28x28px (Gate logo với gradient colors)
- Logo text (expanded): "SMIT CHAT"
  - Font: Inter Tight SemiBold
  - Size: 18px
  - Color: White (#ffffff)
  - Line height: 20px

**Gap spacing:**
- Logo → Menu items: 36px
- Between menu items: 16px

### 2.3 Menu Items

Sidebar có 6 menu items:
1. **Kết nối nền tảng** (Platform Connection)
2. **Chat**
3. **Danh bạ** (Contacts)
4. **Lịch sử** (History)
5. **Nhân viên** (Staff/Team)
6. **Cài đặt** (Settings)

---

## 3. MENU ITEM STATES

### 3.1 Normal State (Collapsed)
```css
{
  background: #e8edf2; /* Neutral/200 */
  padding: 8px;
  border-radius: 6px;
  width: 32px;
  height: 32px;
}
```

### 3.2 Normal State (Expanded)
```css
{
  background: white; /* Base/White */
  padding: 6px 12px;
  border-radius: 8px;
  width: 100%; /* 176px inside 200px container */
  height: 32px;
  gap: 6px;
}
```

**Icon:**
- Size: 24x24px
- Color: Neutral (dark tones)

**Text:**
- Font: Inter 28pt Medium
- Size: 14px
- Weight: 500
- Line height: 20px
- Color: #1a2229 (Text/Neutral 900)

### 3.3 Hover State (Expanded)
- Giống normal state nhưng có thể có subtle hover effect
- Background: white (không đổi)

### 3.4 Active State (Expanded)
```css
{
  background: radial-gradient(
    circle at center,
    rgba(0, 164, 126, 1) 0%,
    rgba(8, 204, 184, 1) 100%
  );
  padding: 6px 12px;
  border-radius: 8px;
  width: 100%;
  height: 32px;
  gap: 6px;
}
```

**Icon (Active):**
- Size: 24x24px
- Color: White (#ffffff)

**Text (Active):**
- Font: Inter 28pt SemiBold
- Size: 14px
- Weight: 600 (bold)
- Line height: 20px
- Color: White (#ffffff)

### 3.5 Active State (Collapsed)
```css
{
  background: Gradient (teal/cyan);
  padding: 8px;
  border-radius: 6px;
  width: 32px;
  height: 32px;
}
```
**Icon:** White color

---

## 4. BOTTOM SECTION - AVATAR & USER INFO

### 4.1 Collapsed State
```css
{
  size: 32x32px;
  border-radius: 999px; /* circular */
  background: white;
}
```

**Status indicator:**
- Size: 8x8px
- Position: bottom-right corner
- Color: Green (online status)

### 4.2 Expanded State
```css
{
  padding: 8px;
  border-radius: 10px;
  gap: 8px;
  width: 176px;
  display: flex;
  align-items: center;
}
```

**Avatar:** 32x32px (same as collapsed)

**User Info:**
- Name: "SMIT"
  - Font: Inter 28pt SemiBold
  - Size: 13px
  - Weight: 600
  - Line height: 16px
  - Color: White

- Role: "Nhân viên"
  - Font: Inter 28pt Regular
  - Size: 11px
  - Weight: 400
  - Line height: 14px
  - Color: White

**Gap between avatar and text:** 12px

---

## 5. DESIGN TOKENS & VARIABLES

### 5.1 Colors
```javascript
{
  // Icon colors
  "Icon/Neutral 0": "#ffffff",
  "Icon/Neutral 900": "#1a2229",

  // Primary
  "primary/base": "#269a85",

  // Background
  "Dark": "#141B34",
  "Base/White": "#ffffff",
  "Base/Overlay Light 20": "#ffffff33", // 20% opacity
  "Neutral/200": "#e8edf2",

  // Text
  "Text/White": "#ffffff",
  "Text/Neutral 50": "#ffffff",
  "Text/Neutral 900": "#1a2229",

  // Gradient (Active state)
  "Gradient": "radial-gradient from (0,164,126) to (8,204,184)"
}
```

### 5.2 Typography
```javascript
{
  "Body Medium 14/SemiBold": {
    family: "Inter 28pt",
    style: "SemiBold",
    size: 14,
    weight: 600,
    lineHeight: 20,
    letterSpacing: 0
  },

  "Body Medium 14/Medium": {
    family: "Inter 28pt",
    style: "Medium",
    size: 14,
    weight: 500,
    lineHeight: 20,
    letterSpacing: 0
  },

  "Body Medium 13/Semibold": {
    family: "Inter 28pt",
    style: "SemiBold",
    size: 13,
    weight: 600,
    lineHeight: 16,
    letterSpacing: 0
  },

  "Body Small 11/Regular": {
    family: "Inter 28pt",
    style: "Regular",
    size: 11,
    weight: 400,
    lineHeight: 14,
    letterSpacing: 0
  }
}
```

### 5.3 Spacing
```javascript
{
  "Logo to Menu": "36px",
  "Menu item gap": "16px",
  "Menu padding (collapsed)": "8px",
  "Menu padding (expanded)": "6px 12px",
  "Container padding": "20px 12px 26px 12px",
  "Avatar section padding": "8px",
  "Icon to text gap": "6px",
  "Avatar to text gap": "12px"
}
```

### 5.4 Border Radius
```javascript
{
  "Menu item (collapsed)": "6px",
  "Menu item (expanded)": "8px",
  "Avatar container": "10px",
  "Avatar image": "999px", // circular
  "Status indicator": "999px" // circular
}
```

---

## 6. ICONS & ASSETS ANALYSIS

### 6.1 Icons Sử Dụng Trong Design

Từ screenshot và design context, sidebar sử dụng các icons sau:

1. **Logo icon** - Gate logo (custom gradient SVG)
2. **Menu item icons** (24x24px):
   - `layers-01` hoặc `connection` (Kết nối nền tảng)
   - `message-circle` hoặc `chat` (Chat)
   - `users` hoặc `contacts` (Danh bạ)
   - `clock-01` (Lịch sử) - **ĐÃ CÓ TRONG sprites.svg**
   - `users-02` hoặc `staff` (Nhân viên) - **ĐÃ CÓ TRONG sprites.svg**
   - `settings-01` hoặc `setting` (Cài đặt) - **ĐÃ CÓ TRONG sprites.svg**

3. **Alert/indicator icons**:
   - `alert-circle` (hiển thị trong expanded buttons)

### 6.2 Icons Đã Có Trong `src/assets/icons/sprites.svg`

Từ kiểm tra file sprites.svg, đã có các icons:
- ✅ `setting` (Settings)
- ✅ `staff` (Nhân viên)
- ✅ `notification` (có thể dùng cho alerts)
- ✅ `logo` (Gate logo)

### 6.3 Icons Cần Bổ Sung

Cần thêm vào sprites.svg:
- ❌ `layers-01` hoặc `connection` icon (Platform connection)
- ❌ `message-circle` hoặc `chat` icon
- ❌ `users` hoặc `contacts` icon (Contacts)
- ❌ `clock-01` icon (History) - **NẾU CHƯA CÓ**
- ❌ `alert-circle` icon

**Lưu ý:** Tất cả icons phải có 2 variants:
- Color version (for normal state)
- White version (for active/hover state)

### 6.4 Image Assets

**Avatar images:**
- Format: JPG hoặc PNG
- Size: 32x32px (displayed), có thể dùng 64x64px (2x for retina)
- Source: User profile photos (dynamic)

**Status indicator:**
- 8x8px circular dot
- Colors: Green (#00C853 - online), Gray (#9E9E9E - offline), Yellow (#FFC107 - away)

---

## 7. ANIMATIONS & INTERACTIONS

### 7.1 Sidebar Expand/Collapse
```css
{
  transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  hover-delay: "500ms" /* hover 500ms thì mới expand */
}
```

### 7.2 Menu Item Hover
```css
{
  transition: "background-color 150ms ease-in-out",
  scale: "1.02" /* subtle scale on hover */
}
```

### 7.3 Active State Transition
```css
{
  transition: "all 200ms ease-in-out"
}
```

---

## 8. RESPONSIVE BEHAVIOR

### 8.1 Desktop (>= 1024px)
- Sidebar fixed position, left side
- Default: Collapsed (56px)
- Hover to expand (200px)

### 8.2 Tablet (768px - 1023px)
- Có thể giữ collapsed mode
- Touch to expand (toggle)

### 8.3 Mobile (< 768px)
- Sidebar ẩn hoàn toàn
- Hiển thị qua hamburger menu
- Overlay mode khi mở (full width hoặc 200px slide-in)

---

## 9. IMPLEMENTATION NOTES

### 9.1 Component Structure đề xuất (Vue 3)

```
src/components/layout/
├── Sidebar.vue (Main component)
├── SidebarMenuItem.vue (Menu item component)
├── SidebarAvatar.vue (Avatar section)
└── useSidebar.ts (Composable for state management)
```

### 9.2 Props & State

**Sidebar.vue:**
```typescript
interface SidebarProps {
  defaultCollapsed?: boolean;
  hoverDelay?: number; // ms
}

interface SidebarState {
  isCollapsed: boolean;
  activeMenuItem: string | null;
  hoverTimeout: number | null;
}
```

**SidebarMenuItem.vue:**
```typescript
interface MenuItemProps {
  icon: string;
  label: string;
  value: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}
```

### 9.3 Styling Approach

- Sử dụng CSS modules hoặc scoped styles
- Design tokens → CSS variables
- Gradient active state → CSS gradient hoặc SVG
- Hover delay → JavaScript setTimeout
- Icons → SVG sprites (existing system)

### 9.4 Accessibility

- ARIA labels cho collapsed icons
- Keyboard navigation support
- Focus indicators
- Screen reader announcements

---

## 10. TÓM TẮT CÁC COMPONENTS CÓ THỂ TÁI SỬ DỤNG

### 10.1 Từ shadcn-vue (đã có trong project)

- ✅ **Button** - có thể dùng cho menu items
- ✅ **Avatar** - dùng cho user avatar
- ✅ **Tooltip** - hiển thị label khi sidebar collapsed
- ❌ **Sidebar component** - CHƯA CÓ, cần implement mới

### 10.2 Custom Components cần tạo

1. **AppSidebar.vue** - Main sidebar wrapper
2. **SidebarMenuItem.vue** - Menu item với states
3. **SidebarUserSection.vue** - Bottom user info section
4. **SidebarLogo.vue** - Logo component

### 10.3 Composables cần tạo

1. **useSidebar.ts** - State management (collapsed/expanded)
2. **useSidebarHover.ts** - Hover delay logic
3. **useActiveMenuItem.ts** - Active menu tracking

---

## 11. GRADIENT ACTIVE STATE - CHI TIẾT

### 11.1 CSS Gradient (Active menu item)

```css
.menu-item-active {
  background: radial-gradient(
    circle,
    rgba(0, 164, 126, 1) 0%,
    rgba(8, 204, 184, 1) 100%
  );

  /* Alternative linear gradient approach */
  background: linear-gradient(
    135deg,
    rgba(0, 164, 126, 1) 0%,
    rgba(8, 204, 184, 1) 100%
  );
}
```

### 11.2 SVG Gradient (từ Figma)

Figma sử dụng radial gradient với transform matrix:
```
gradientTransform: matrix(-1.0227, -2.1455, 20.114, -0.10909, 150, 20.364)
```

Có thể đơn giản hóa thành CSS gradient như trên.

---

## 12. KẾT LUẬN & NEXT STEPS

### 12.1 Các điểm chính cần lưu ý:

1. ✅ Sidebar transparent background (dark overlay)
2. ✅ 2 states: collapsed (56px) và expanded (200px)
3. ✅ Hover delay 500ms trước khi expand
4. ✅ Active state có gradient background (teal/cyan)
5. ✅ 6 menu items + user section at bottom
6. ✅ Icons: 24x24px (menu), 28x28px (logo)
7. ⚠️ Cần bổ sung một số icons vào sprites.svg

### 12.2 Icons cần bổ sung:

- [ ] `layers-01` hoặc `connection` (Kết nối nền tảng)
- [ ] `message-circle` hoặc `chat` (Chat)
- [ ] `users` hoặc `contacts` (Danh bạ)
- [ ] `clock-01` (Lịch sử) - kiểm tra lại
- [ ] `alert-circle` (Indicator)

### 12.3 Implementation priority:

1. **Phase 1:** Base sidebar structure (collapsed/expanded states)
2. **Phase 2:** Menu items với normal/active states
3. **Phase 3:** Hover interactions & animations
4. **Phase 4:** User section & avatar
5. **Phase 5:** Responsive behavior & accessibility

### 12.4 Câu hỏi chưa giải quyết:

- Navigation routing: Vue Router integration?
- User data source: API endpoint hay mock data?
- Permission-based menu visibility?
- Multi-language support cho menu labels?

---

**Báo cáo này cung cấp đầy đủ thông tin để agent implementation có thể coding sidebar component theo đúng thiết kế Figma.**
