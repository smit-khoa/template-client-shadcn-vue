# AppHeader - Thanh Header Hệ Thống

## Tổng quan

AppHeader là component header chính trong layout của hệ thống SMIT Chat. Hiển thị tên tính năng hiện tại (dynamic theo route), tool buttons (help, theme toggle, avatar).

**Thông tin chính:**
- **Height:** 60px (min-h-[60px])
- **Layout:** Flex, justify-between (title bên trái, tools bên phải)
- **Background:** Transparent (inherit từ layout)
- **Styling:** Gradient text title, responsive padding

**Design:** [SMIT Chat Figma - AppHeader](https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=642-134483&m=dev)

---

## Cấu trúc Files

| File | Mục đích |
|------|---------|
| `src/components/header/AppHeader.vue` | Component header chính, render title + tools |
| `src/components/header/index.ts` | Barrel export |
| `src/layout/index.vue` | Import và render AppHeader |

---

## Components Sử Dụng

### Icon Component
- **Import:** `src/components/custom/icon/Icon.vue`
- **Props:**
  - `name: string` - Tên icon ("help-circle")
  - `size?: number` - Kích thước (20px)
  - `color?: string` - Màu sắc ("white")
- **Icon dùng:** `help-circle` - Help button icon

### ThemeToggle Component
- **Import:** `src/components/custom/theme-toggle/ThemeToggle.vue`
- **Chức năng:** Dark/light mode toggle
- **Props:** None required
- **Icons dùng:** `sun-03` (light mode), `moon-02` (dark mode)

### Vue Router
- **Hook:** `useRoute()` - Lấy thông tin route hiện tại
- **Dùng để:** Xác định `route.path` để map sang tên tính năng

---

## Layout & Styling

### Structure
```
<header class="flex items-center justify-between px-5 py-3 min-h-[60px]">
  <!-- Left -->
  <h1 class="text-lg font-semibold leading-7 bg-clip-text text-transparent">
    {{ page_title }}
  </h1>

  <!-- Right -->
  <div class="flex items-center gap-4">
    <button type="button"><!-- help-circle icon --></button>
    <ThemeToggle />
    <img :src="avatar_url" alt="Avatar" />
  </div>
</header>
```

### CSS Classes
- **Header:** `flex items-center justify-between px-5 py-3 min-h-[60px]`
- **Title (h1):** `text-lg font-semibold leading-7 bg-clip-text text-transparent`
- **Tools container:** `flex items-center gap-4`
- **Help button:** `rounded-lg p-1 cursor-pointer`
- **Avatar img:** `w-7 h-7 rounded-full border border-white object-cover`

### Gradient Text
```javascript
const gradient_text = "linear-gradient(86.06deg, rgb(214, 255, 254) 0.27%, rgb(154, 254, 254) 25.11%, rgb(92, 255, 169) 74.81%)"
```
- **Direction:** 86.06° (từ trái sang phải, hơi dốc)
- **Colors:** Cyan (#D6FFFF) → Cyan (#9AFEFE) → Green (#5CFFA9)
- **Application:** `:style="{ backgroundImage: gradient_text }"`

---

## Route Title Mapping

Động theo route path, map sang tên tính năng tiếng Việt:

| Route | Tên Hiển Thị |
|-------|------------|
| `/app/chat` | Tin nhắn |
| `/app/contacts` | Danh bạ |
| `/app/connect` | Kết nối |
| `/app/history` | Lịch sử |
| `/app/staff` | Nhân viên |
| `/app/settings` | Cài đặt |
| (unknown) | "" (empty) |

**Computed property:**
```javascript
const page_title = computed(() => {
  const path = route.path
  return route_title_map[path] || ""
})
```

---

## Luồng Hoạt Động

### 1. Khởi tạo Component
```
AppHeader.vue mounted
→ useRoute() hook lấy route hiện tại
→ Computed page_title tính từ route.path
→ Render title + tools
```

### 2. Route Change
```
Vue Router navigate đến route mới
→ route.path updated
→ page_title computed re-evaluate
→ Template re-render title text
→ Gradient animation smooth
```

### 3. Help Button Click
```
@click help button
→ (Tạm: no action - cần implement)
→ Future: Open help dialog/panel
```

### 4. Theme Toggle
```
@click theme toggle
→ ThemeToggle component emit change
→ Update document theme (light/dark)
→ Icons thay đổi (sun ↔ moon)
```

### 5. Avatar
```
Display user avatar
→ URL: https://ui-avatars.com/api/?name=U&background=random&size=28
→ Future: Connect với auth store cho real user data
```

---

## Assets

### Icons (src/assets/icons/sprites.svg)
Sử dụng SVG sprite, không cần import riêng:
- `help-circle` - Help button icon
- `sun-03` - Light mode icon (ThemeToggle)
- `moon-02` - Dark mode icon (ThemeToggle)

### Images
Không có images được thêm mới cho AppHeader.

---

## Ghi Chú Phát Triển

### Current Implementation
- Help button: chưa implement action (click handler trống)
- Avatar URL: mock data từ `ui-avatars.com`
- User info: không kết nối auth store

### Edge Cases
1. **Route không match mapping:**
   - Fallback: `page_title = ""` (empty string)
   - Sẽ hiển thị header trống bên trái
2. **Slow route transition:**
   - Title update tự động via reactive route.path
3. **Avatar image fail:**
   - Fallback: Broken image placeholder từ browser
   - TODO: Add error handler, default avatar

### TODO / Future Enhancements
- [ ] Kết nối auth store cho real user avatar + name
- [ ] Implement help button action (dialog, sidebar, etc.)
- [ ] Add hover effect cho buttons (bg-color transition)
- [ ] Add click handlers cho avatar (user menu)
- [ ] Responsive design cho mobile
- [ ] Accessibility: aria-label, keyboard nav
- [ ] Skeleton loader nếu avatar loading async
- [ ] Tooltip cho buttons

### Testing
- Visual test: `/sidebar-visual-test.mjs` (comprehensive test suite)
- Component test: `/__tests__/components/AppHeader.spec.ts` (todo)
- Route mapping test: `/__tests__/router/routeTitleMapping.spec.ts` (todo)

---

## Layout Integration

**File:** `src/layout/index.vue`

```vue
<template>
  <div class="w-screen h-screen overflow-hidden bg-cover bg-center">
    <Sidebar />              <!-- 56-200px width, left side -->
    <main class="flex-1 overflow-auto flex flex-col">
      <AppHeader />          <!-- 60px height, top -->
      <RouterView />         <!-- Page content -->
    </main>
  </div>
</template>
```

**Integration flow:**
1. Layout renders flex container (w-screen h-screen)
2. Sidebar: fixed width, vertical nav
3. Main: flex-1 (takes remaining width), flex column
4. AppHeader: top of main, 60px height
5. RouterView: below AppHeader, flex-1, scrollable

---

## Responsive Considerations

- **Desktop (1024px+):** Full layout, title + tools visible
- **Tablet (768px+):** Text size adjustments via Tailwind
- **Mobile:** Currently desktop-only, TODO mobile drawer

**Current responsive:** Tailwind classes (`px-5 py-3` padding responsive), nhưng layout luôn fixed.

---

## Performance

- **No extra re-renders:** route.path reactive, computed auto-update
- **Efficient animations:** CSS gradient, no JavaScript animation
- **Bundle size:** Icons từ sprite (không separate files)
- **Memory:** No refs, no cleanup needed

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Title hiện empty | Check route path match route_title_map keys |
| Gradient text không visible | Check `text-transparent` + `bg-clip-text` classes |
| Icons không hiện | Check Icon component loaded, sprites.svg present |
| Avatar không load | Check URL valid, network request successful |
| Theme toggle không work | Check ThemeToggle component, theme context |
| Help button click no action | Currently no handler, need to implement |
