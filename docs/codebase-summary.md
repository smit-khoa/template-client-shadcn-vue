# Tóm Tắt Codebase SMIT Chat

## 1. Tổng Quan Cấu Trúc

```
smit-chat/
├── src/
│   ├── assets/              # Hình ảnh, font chữ, icon SVG sprites
│   │   ├── fonts/           # Inter font (400, 500, 600, 700)
│   │   ├── images/          # Ảnh theo feature (login/, dashboard/, etc)
│   │   └── icons/           # SVG sprite icons
│   │
│   ├── common/              # Utility functions dùng chung
│   │   └── index.ts         # formatCurrency, formatDate, formatNumber, image(), copy()
│   │
│   ├── components/          # 4-layer architecture
│   │   ├── ui/              # Shadcn/UI base (21 components)
│   │   ├── custom/          # Custom wrappers (22 components)
│   │   ├── app/             # Feature components
│   │   └── shared/          # Shared utilities
│   │
│   ├── composables/         # Vue composables
│   │   └── useSprite        # SVG sprite management
│   │
│   ├── controllers/         # API wrapper layer
│   │   └── global.js        # api() function, axios config
│   │
│   ├── layout/              # App layouts
│   │   ├── index.vue        # Main app layout + navbar
│   │   └── ...
│   │
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # cn() function (class merging)
│   │
│   ├── pages/               # 7 main pages (route-level)
│   │   ├── Auth.vue         # Auth layout wrapper
│   │   ├── Home.vue         # Landing page
│   │   ├── Onboarding.vue   # Company setup (2 steps)
│   │   ├── Staff.vue        # Staff management
│   │   ├── Platforms.vue    # Platform connections
│   │   ├── Customer.vue     # Customer directory
│   │   └── ChatHistory.vue  # Message history
│   │
│   ├── router/              # Vue Router config
│   │   └── index.ts         # Route definitions, meta guards
│   │
│   ├── store/               # Pinia state management
│   │   └── user.ts          # User store (setUser, getUser)
│   │
│   ├── App.vue              # Root component
│   ├── main.ts              # App entry + auth guard
│   ├── style.css            # Global styles + CSS variables
│   └── vite-env.d.ts        # Vite type definitions
│
├── vite.config.ts           # HTTPS dev, port 8309, API proxy
├── tsconfig.json            # TypeScript paths (@/*)
├── package.json             # Dependencies
└── README.md                # Project documentation
```

## 2. Tổng Số Files

- **Total Files:** 302 files
- **Vue components:** ~164 files
- **TypeScript files:** ~56 files
- **CSS/SCSS:** Global styles + scoped per component
- **Custom components:** 23 wrapper components (enhanced)
- **UI base components:** 21 shadcn/UI components (Dialog, Dropdown, etc)
- **E2E Test Files:** 9 test suites (Playwright)

## 3. Module & Trách Nhiệm

### Controllers (API Layer)
- **`global.js`** - Axios wrapper
  - `api()` - Function gọi API với auto-toast
  - Host config (dev vs production)
  - Token handling, headers, error handling

### Store (State Management - Pinia)
- **`user.ts`** (Current store)
  - State: `user` (UserData | null)
  - Actions: `setUser(user: UserData)`
  - Getters: `getUser`, `hasCompany`
  - Data: `{ user_id, user_name, email, company_id }`

### Composables (Vue Composables)
- **`useSprite()`** - SVG sprite icon management with path resolution
- **`useTheme()`** - Dark/Light mode theme switching

### Router (Navigation)
- **Vue Router 4.6.4**
- Routes: 7 main pages (Home, Auth, Onboarding, Staff, Platforms, Customer, ChatHistory)
- Nested: Authentication routes (login, register, verify, oauth, forgot, reset)
- Meta guards: `needLogin`, `block` for auth control
- Auth guard: beforeEach() → GET /api/v1/public/auth/me → validate token
- Dynamic imports (lazy loading) for all routes

### Components (UI Layer)

**Custom Components (26):**
1. `input/` - Text, email, password, number, currency inputs with icon support
2. `button/` - 7 variants (primary, secondary, danger, noborder, error, success, loading)
3. `checkbox/` - Checkbox + radio modes with label support
4. `dropdown/` - Dropdown menus with position control
5. `tabs/` - Tab navigation with icon support
6. `popup/` - Modal dialogs with footer slots
7. `drawer/` - Side panels with width control
8. `table/` - Data tables with layout control
9. `search/` - Search inputs with debounce
10. `icon/` - SVG icon rendering from sprites
11. `paging/` - Pagination with page control
12. `loading/` - Loading spinner states
13. `confirm/` - Confirm dialogs with title/content
14. `box/` - Container boxes (state: default, selected, disabled)
15. `switch/` - Toggle switches
16. `accordion/` - Expandable sections
17. `tooltip/` - Hover tooltips
18. `label/` - Form labels
19. `theme-toggle/` - Light/Dark mode switcher
20. `date-picker/` - Date selection component
21. `filter/` - Filter components
22. `load-page/` - Page loading state
23. `load-default/` - Default loading state
24. `app-table/` - Advanced data table
25. `badge/` - Badge component
26. Additional utility components

**Shadcn/UI Base (21):**
- Dialog, Alert Dialog, Drawer, Sheet (modals & panels)
- Dropdown Menu, Popover, Select, Combobox (dropdowns)
- Tabs, Toggle, Toggle Group (navigation)
- Checkbox, Radio Group, Switch (form inputs)
- Input, Textarea, Button, Skeleton (basic elements)
- Scroll Area, Accordion, Separator (layouts)
- Toast notifications (Sonner for notifications)

### Pages (Route-Level)

| Page | Path | Chức Năng |
|------|------|----------|
| Home | `/` | Landing page |
| Auth | `/auth/*` | Login, Register, Verify, OAuth, Forgot/Reset |
| Onboarding | `/onboarding` | Setup công ty + nhân viên |
| Staff | `/app/staff` | Quản lý nhân viên |
| Platforms | `/app/platforms` | Kết nối FB, Telegram, WhatsApp, Zalo |
| Customer | `/app/customer` | Quản lý danh bạ khách hàng |
| ChatHistory | `/app/chat-history` | Lịch sử tin nhắn |

## 4. Luồng Dữ Liệu

```
API Request Flow:
User Action → Component → Store (Pinia) → API Call (global.js)
                                    ↓
                           Axios + Headers + Token
                                    ↓
                           Toast (Success/Error)
                                    ↓
                          Update Store + UI
```

### Auth Flow
1. **Login** → Nhận token → Lưu localStorage
2. **beforeEach guard** → Kiểm tra token + gọi `/api/v1/public/auth/me`
3. **Token invalid** → Xóa token + redirect `/login`
4. **Valid** → Lưu user info → Cho qua route

### Token Storage
- Key: `accessToken`
- Tự động gửi trong header: `Authorization: <token>`

## 5. Styling System

### CSS Variables (style.css)
```css
/* Colors */
--primary-base: #269a85       /* Teal chính */
--secondary-base: #1e7b6a     /* Xanh lá */
--tertiary-base: #2eb9a0      /* Xanh ngọc */
--grey-100 to 700             /* Grey scale */
--neutral-100: #1a2229        /* Text chính */
--destructive: #dc2626        /* Đỏ cảnh báo */
--white: #fff, --black        /* Base colors */
```

### Tailwind CSS
- **Version:** 4.1.18 (@tailwindcss/vite)
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Font:** Inter (400, 500, 600, 700)
- **Responsive:** Mobile-first approach

### SCSS Rules
- Ưu tiên TailwindCSS classes trực tiếp
- Chỉ dùng SCSS khi Tailwind không hỗ trợ
- Dùng `lang="scss" scoped` hoặc `module`

## 6. Dependency Highlights

### Framework
- **Vue:** 3.5.24
- **Vue Router:** 4.6.4
- **Pinia:** 3.0.3
- **Vite:** 7.2.4

### Styling
- **Tailwind CSS:** 4.1.18
- **Tailwind Merge:** 3.4.0
- **SCSS:** sass-embedded 1.96.0

### HTTP & UI
- **Axios:** 1.13.2
- **Reka UI:** 2.6.1 (Headless UI)
- **Vue Sonner:** 2.0.2 (Toast notifications)
- **Lucide Vue Next:** 0.560.0 (Icons)
- **Vaul Vue:** 0.4.1 (Drawer)

### Utilities
- **Currency Formatter:** 1.5.9
- **Moment.js:** 2.30.1
- **Class Variance Authority:** 0.7.1
- **VueUse:** 14.1.0

## 7. Config Important

### Vite Config
```
- HTTPS dev server
- Port: 8309
- Host: 0.0.0.0
- API proxy: /api/* → Cloudflare
```

### TypeScript
```
- Path alias: @/* → src/*
- Target: ES2020+
- Module: ESNext
```

## 8. Key Functions & Utilities

### `common/index.ts`
- `formatCurrency(value, currency)` - Format tiền tệ
- `formatNumber(value)` - Format số
- `formatDate({ date, format, fromNow })` - Format ngày tháng
- `image(name)` - Load ảnh từ assets
- `randomString(length)` - Sinh string random
- `copy(text)` - Copy vào clipboard

### `controllers/global.js`
```javascript
api({
  url: "/api/...",
  method: "GET/POST/PUT/DELETE",
  data: {},
  params: {},
  toast: true,        // Auto show toast
  authorization: "",  // Custom token
  signal: null        // AbortController
})
```

## 9. Authentication Flow

```
1. User login → Submit form
2. API POST /api/v1/public/auth/login
3. Response: { accessToken, user }
4. Store token: localStorage.setItem("accessToken", token)
5. Next request: Header Authorization: Bearer <token>
6. Route guard kiểm tra: beforeEach() → GET /api/v1/public/auth/me
7. Valid: Lưu user store, cho phép access
8. Invalid: Remove token, redirect /login
```

## 10. File Quan Trọng Cần Biết

| File | Mục Đích |
|------|----------|
| `src/main.ts` | App entry + auth guard |
| `src/router/index.ts` | Route definitions |
| `src/store/user.ts` | User state management |
| `src/controllers/global.js` | API wrapper + axios |
| `src/style.css` | Global styles + CSS variables |
| `src/layout/index.vue` | Main app layout |
| `src/components/custom/` | Custom UI components |
| `vite.config.ts` | Build & dev config |
| `tsconfig.json` | TypeScript config |

## 11. Quick Reference

### Import Paths
```typescript
// Components
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { Dialog } from "@/components/ui/dialog"

// Utils
import { formatCurrency, formatDate, image } from "@/common"
import { api } from "@/controllers/global"

// Store
import { user } from "@/store"

// Router
import { router } from "@/router"
```

### Component Naming
- Variables: `snake_case`
- Functions: `camelCase`
- Classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`

### File Organization
- `.vue` files: Component name = PascalCase
- `.ts` files: Function name = camelCase, Export as needed
- `.css/scss` files: Class name = snake_case or with module

---

**Cập nhật lần cuối:** 2026-01-27
**Phiên bản:** 0.0.0 (MVP Phase Complete)
**Tech Stack:** Vue 3.5.24 + TypeScript 5.9.3 (strict) + Vite 7.2.4 + Tailwind CSS 4.1.18
**Component Architecture:** 4-layer (UI → Custom → App → Pages)
**Repository Size:** 302 files, 47 total components
**Testing:** 9 E2E test suites (Playwright 1.58.0)
**Status:** Production Ready - MVP Phase Complete
**Dependencies:** 30 packages (15 runtime + 15 dev)
