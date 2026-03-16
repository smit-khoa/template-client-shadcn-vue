# Codebase Summary

**Project:** template-client-shadcn-vue (smit-chat)
**Last Updated:** 2026-03-16

## Project Overview

Template-client-shadcn-vue là một Vue 3 frontend template được tối ưu hóa cho development speed và code quality. Project sử dụng TypeScript strict mode, TailwindCSS cho styling, Shadcn-Vue (reka-ui) cho UI components, và Pinia cho state management.

## Directory Structure Overview

```
template-client-shadcn-vue/
├── src/
│   ├── App.vue                          # Root Vue component, Toaster config
│   ├── main.ts                          # Entry point, route guards, auth flow
│   ├── style.css                        # Global styles, Tailwind, CSS vars
│   │
│   ├── router/
│   │   └── index.ts                     # Vue Router config, route definitions
│   │
│   ├── store/
│   │   ├── index.ts                     # Pinia setup
│   │   └── user.ts                      # User store (userName, email, company)
│   │
│   ├── layout/
│   │   └── index.vue                    # Main app layout (header + sidebar + router-view)
│   │
│   ├── pages/
│   │   ├── Home.vue                     # Landing page with login
│   │   ├── app/                         # Protected app pages
│   │   │   ├── ChatPage.vue             # Main chat (default: /app/chat)
│   │   │   ├── ConnectPage.vue          # Platform connections /app/connect
│   │   │   ├── ContactsPage.vue         # Contacts /app/contacts
│   │   │   ├── HistoryPage.vue          # Chat history /app/history
│   │   │   ├── StaffPage.vue            # Staff management /app/staff
│   │   │   └── SettingsPage.vue         # Settings /app/settings
│   │   └── auth/                        # Auth pages
│   │       ├── Login.vue
│   │       └── Register.vue
│   │
│   ├── components/
│   │   ├── ui/                          # Shadcn-Vue base components (40+)
│   │   │   ├── accordion/
│   │   │   ├── alert-dialog/
│   │   │   ├── button/
│   │   │   ├── checkbox/
│   │   │   ├── dialog/
│   │   │   ├── drawer/
│   │   │   ├── dropdown-menu/
│   │   │   ├── input/
│   │   │   ├── label/
│   │   │   ├── pagination/
│   │   │   ├── scroll-area/
│   │   │   ├── sheet/
│   │   │   ├── skeleton/
│   │   │   ├── stepper/
│   │   │   ├── switch/
│   │   │   ├── tabs/
│   │   │   ├── tooltip/
│   │   │   ├── sonner/
│   │   │   └── [20+ more components]
│   │   │
│   │   ├── custom/                      # Custom wrapped components
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Table.vue
│   │   │   ├── AppTable.vue
│   │   │   ├── Dropdown.vue
│   │   │   ├── Filter.vue
│   │   │   ├── Icon.vue
│   │   │   ├── Loading.vue
│   │   │   ├── Paging.vue
│   │   │   ├── Search.vue
│   │   │   ├── Switch.vue
│   │   │   ├── Tabs.vue
│   │   │   ├── TagInput.vue
│   │   │   ├── Datepicker.vue
│   │   │   ├── Confirm.vue
│   │   │   ├── Tooltip.vue
│   │   │   ├── Toast.vue
│   │   │   ├── Spinner.vue
│   │   │   ├── Popup.vue
│   │   │   ├── ThemeToggle.vue
│   │   │   ├── Box.vue
│   │   │   └── [more]
│   │   │
│   │   ├── sidebar/                     # Sidebar navigation components
│   │   │   ├── AppSidebar.vue
│   │   │   ├── NavItem.vue
│   │   │   ├── SidebarUser.vue
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                        # Auth-specific components
│   │   │   ├── LoginForm.vue
│   │   │   └── [auth components]
│   │   │
│   │   ├── employees/                   # Employee management components
│   │   │   └── [employee components]
│   │   │
│   │   ├── shared/                      # Shared app components
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── [shared components]
│   │   │
│   │   └── login/                       # Login page components
│   │       └── [login components]
│   │
│   ├── composables/
│   │   ├── useTheme.ts                  # Dark/light theme toggle logic
│   │   ├── useSprite.ts                 # SVG sprite loading
│   │   └── useSidebar.ts                # Sidebar state management
│   │
│   ├── controllers/
│   │   └── global.js                    # Axios API wrapper
│   │       - Centralized error handling
│   │       - Authorization header injection
│   │       - Toast notifications
│   │       - Typed API responses
│   │
│   ├── lib/
│   │   └── utils.ts                     # cn() utility for class merging
│   │
│   ├── common/
│   │   └── index.ts                     # Common utilities
│   │       - formatCurrency()
│   │       - formatDate()
│   │       - [other formatters]
│   │
│   ├── assets/
│   │   ├── css/                         # Additional CSS files
│   │   ├── fonts/                       # Inter font files
│   │   ├── icons/                       # SVG icons (sprite bundle)
│   │   └── images/                      # Logo, illustrations, images
│   │
│   ├── scripts/                         # Build/utility scripts
│   │
│   └── __tests__/                       # Vitest unit tests
│       ├── common/
│       ├── components/
│       ├── composables/
│       ├── controllers/
│       └── store/
│
├── e2e/                                 # Playwright E2E tests
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   ├── user.spec.ts
│   │   └── [e2e test files]
│   └── playwright.config.ts
│
├── dist/                                # Build output (generated)
│
├── docs/                                # Documentation
│   ├── project-overview-pdr.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── codebase-summary.md              # This file
│   └── [other docs]
│
├── public/                              # Static assets
│
├── index.html                           # HTML entry point
├── vite.config.ts                       # Vite config
├── vitest.config.ts                     # Vitest config
├── tsconfig.json                        # TypeScript root config
├── tsconfig.app.json                    # TypeScript app config (strict mode)
├── tsconfig.node.json                   # TypeScript build tools config
├── eslint.config.ts                     # ESLint configuration
├── .prettierrc.json                     # Prettier config
├── package.json                         # Dependencies & scripts
├── package-lock.json                    # Locked dependency versions
├── components.json                      # Shadcn component config
│
├── .vscode/                             # VS Code settings
├── .git/                                # Git repository
├── .gitignore
└── .claude/                             # Claude context files
```

## Key Files Explanation

### Entry Point & Initialization

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point, mounts Vue app to `#app` |
| `main.ts` | Creates Vue app, sets up router, auth guard, fetches user data |
| `App.vue` | Root component, Toaster notification config |

### Routing

| File | Purpose |
|------|---------|
| `router/index.ts` | Route definitions, router instance config |
| Route guard in `main.ts` | Checks auth token, validates user, redirects on auth errors |

### State Management

| File | Purpose |
|------|---------|
| `store/index.ts` | Pinia setup, creates pinia instance |
| `store/user.ts` | User store - holds userName, email, company data |

### Layout & Pages

| File | Purpose |
|------|---------|
| `layout/index.vue` | Main app layout (header, sidebar, router-view) |
| `layout/sidebar/` | Sidebar navigation components |
| `pages/Home.vue` | Public landing page with login form |
| `pages/app/*` | Protected app pages (Staff, Settings, etc) |
| `pages/auth/*` | Auth pages (Login, Register) |

### Components

| Directory | Purpose | Count |
|-----------|---------|-------|
| `components/ui/` | Shadcn-Vue unstyled base components | 40+ |
| `components/custom/` | Project-specific wrapped components | 20+ |
| `components/auth/` | Auth-related components | - |
| `components/employees/` | Employee management components | - |
| `components/shared/` | Shared app-wide components | - |
| `components/login/` | Login page specific components | - |

### Composables & Utilities

| File | Purpose |
|------|---------|
| `composables/useTheme.ts` | Dark/light theme switching, state + methods |
| `composables/useSprite.ts` | SVG sprite loading for icons |
| `lib/utils.ts` | `cn()` helper for TailwindCSS class merging |
| `common/index.ts` | Utility functions: formatCurrency, formatDate, etc |

### API & Controllers

| File | Purpose |
|------|---------|
| `controllers/global.js` | Axios wrapper - handles auth, errors, toasts |

### Styling

| File | Purpose |
|------|---------|
| `style.css` | Global styles, TailwindCSS import, CSS variables |
| Component `.css` | Scoped component styles |

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build config, plugin setup |
| `vitest.config.ts` | Vitest unit test config |
| `tsconfig.json` | TypeScript root config |
| `tsconfig.app.json` | App TypeScript config (strict mode) |
| `tsconfig.node.json` | Build tools TS config |
| `eslint.config.ts` | ESLint linting rules |
| `.prettierrc.json` | Prettier formatting rules |
| `package.json` | Dependencies, scripts, metadata |
| `components.json` | Shadcn component configuration |

## Technology Stack Details

### Framework & Language
- **Vue 3.5.24**: Reactive UI framework
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 7.2.4**: Lightning-fast build tool

### UI & Styling
- **TailwindCSS 4.1.18**: Utility-first CSS framework
- **Shadcn-Vue (reka-ui 2.6.1)**: Unstyled, accessible components
- **Lucide Icons 0.560.0**: Icon library
- **class-variance-authority 0.7.1**: Component variant management
- **tailwind-merge 3.4.0**: Intelligent class merging

### State & Routing
- **Pinia 3.0.3**: Lightweight state management
- **Vue Router 4.6.4**: Official Vue routing library

### HTTP & API
- **Axios 1.13.2**: Promise-based HTTP client

### Utilities
- **currency-formatter 1.5.9**: Currency formatting
- **moment 2.30.1**: Date/time manipulation
- **randomstring 1.3.0**: Random string generation
- **vue-sonner 2.0.2**: Toast notifications
- **vue-svg-sprite 2.2.1**: SVG sprite management
- **vuedraggable 4.1.0**: Drag & drop support
- **vaul-vue 0.4.1**: Drawer component library
- **clsx 2.1.1**: Conditional class names

### Development Tools
- **vue-tsc 3.1.4**: Vue TypeScript compiler
- **@vitejs/plugin-vue 6.0.1**: Vite Vue plugin
- **@vitejs/plugin-basic-ssl 2.1.0**: HTTPS support

### Testing
- **Vitest 4.0.16**: Fast unit test framework
- **@vue/test-utils 2.4.6**: Vue component testing utilities
- **@testing-library/vue 8.1.0**: Accessible testing
- **happy-dom 20.0.11**: Lightweight DOM implementation
- **@playwright/test 1.58.0**: E2E testing framework
- **pixelmatch 7.1.0**: Visual regression testing
- **pngjs 7.0.0**: PNG image processing

### Code Quality
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting

## Core Modules Explanation

### Authentication Module

**Files:** `main.ts`, `store/user.ts`, `pages/auth/`

**Flow:**
1. User visits app
2. `main.ts` router guard intercepts route
3. Guard checks `localStorage.accessToken`
4. Calls API `GET /api/v1/public/auth/me` with token
5. If successful: stores user data in Pinia
6. If 401: clears token, redirects to `/login`
7. Page access allowed if authenticated

**Key Functions:**
- `router.beforeEach()` - Auth guard
- `user.setUser()` - Store user data
- `api()` - HTTP call with auth header

### Theme Module

**Files:** `composables/useTheme.ts`, `style.css`

**Flow:**
1. Component imports `useTheme()`
2. Calls `toggleTheme()` or `setTheme(theme)`
3. Updates CSS variables dynamically
4. TailwindCSS respects CSS variables
5. All components using theme vars update

**Key Functions:**
- `useTheme()` - Composable for theme management
- `toggleTheme()` - Switch theme
- `setTheme(theme)` - Set specific theme

### Component Module

**Files:** `components/ui/*`, `components/custom/*`

**Structure:**
- Each component in separate folder
- `Component.vue` - Main component file
- `index.ts` - Export for easy importing
- Components are fully typed with TypeScript
- Props and emits use interfaces

**Usage Pattern:**
```typescript
import { Button } from '@/components/ui/button'
import CustomButton from '@/components/custom/Button.vue'
```

### State Management Module

**Files:** `store/user.ts`, `store/index.ts`

**Pattern:**
- Pinia stores for reactive state
- Actions for mutations
- Getters for computed state
- Accessed via `store.getUser` or `store.hasCompany`

### API Module

**Files:** `controllers/global.js`

**Features:**
- Centralized Axios instance
- Automatic error handling
- Authorization header injection
- Toast notifications on error
- Typed response handling

**Usage:**
```typescript
const response = await api<UserResponse>({
  url: '/api/v1/user',
  method: 'GET',
  authorization: token
})
```

## Testing Structure

### Unit Tests (`__tests__/`)

```
__tests__/
├── common/
│   └── utilities.spec.ts
├── components/
│   ├── Button.spec.ts
│   ├── Input.spec.ts
│   └── [component tests]
├── composables/
│   ├── useTheme.spec.ts
│   └── useSprite.spec.ts
├── controllers/
│   └── global.spec.ts
└── store/
    └── user.spec.ts
```

**Testing Framework:** Vitest with happy-dom
**Commands:**
- `npm run test` - Watch mode
- `npm run test:run` - Single run
- `npm run test:coverage` - Coverage report
- `npm run test:ui` - Visual test UI

### E2E Tests (`e2e/tests/`)

```
e2e/tests/
├── auth.spec.ts           # Login, logout, redirects
├── user.spec.ts           # User operations
├── ui.spec.ts             # Visual regression
└── [feature tests]
```

**Testing Framework:** Playwright
**Device Profiles:** Desktop, Laptop HD, Mobile, Tablet
**Commands:**
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Visual mode
- `npm run test:e2e:headed` - Headed browser
- `npm run test:e2e:debug` - Debug mode

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Development

```bash
# Type checking
npm run vue-tsc -b

# Linting
npm run lint

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Patterns & Conventions

### Naming
- Variables: `snake_case` (e.g., `user_name`, `is_loading`)
- Functions: `camelCase` (e.g., `getUserById()`, `handleClick()`)
- Components: `PascalCase` (e.g., `Button.vue`, `UserProfile.vue`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`)

### Component Props
- All props typed with interfaces
- Use `withDefaults()` for default values
- Props follow `snake_case`

### Emits
- Typed with interface
- Prefixed with `on` (e.g., `onClick`, `onSubmit`)
- Declared with `defineEmits<Emits>()`

### Composables
- Named with `use` prefix (e.g., `useTheme`)
- Return object with functions and refs
- Should be reusable across components

### Store Actions
- Named descriptively (e.g., `setUser`, `clearUser`)
- Single responsibility per action
- Typed with interfaces

## Performance Considerations

### Bundle Size
- Target: < 500KB gzipped
- Achieved through: tree-shaking, code-splitting, minification

### Code Splitting
- Dynamic imports for routes
- Lazy-load heavy components
- Separate bundles per route

### Optimization
- SVG sprite reduces requests
- CSS classes merged efficiently
- Theme switching without re-renders
- Computed properties cached

## Security Practices

### Data Handling
- Tokens in localStorage (consider sessionStorage)
- User data in memory (Pinia store)
- API responses processed server-side

### XSS Prevention
- Vue 3 auto-escapes HTML
- Avoid `v-html` unless necessary
- Sanitize external HTML

### CSRF Protection
- Backend handles CSRF tokens
- SameSite cookies configured

## Common Tasks

### Adding a New Component

1. Create folder: `components/custom/MyComponent.vue`
2. Implement component with typed props/emits
3. Add unit tests in `__tests__/components/MyComponent.spec.ts`
4. Export from `components/index.ts` if needed

### Adding a New Page

1. Create file: `pages/MyPage.vue`
2. Add route in `router/index.ts`
3. Set route meta (needLogin, block, etc)
4. Add E2E test in `e2e/tests/mypage.spec.ts`

### Adding a Store

1. Create file: `store/mystore.ts`
2. Define state, actions, getters
3. Export store function
4. Use in components via store import

### API Integration

1. Use `api()` from `controllers/global.ts`
2. Provide URL, method, optional auth token
3. Handle response with proper typing
4. API wrapper handles errors automatically

## Useful Resources

- Source Code: `/src`
- Tests: `/__tests__` and `/e2e`
- Docs: `/docs`
- Configs: Root level (.ts, .json files)
- Assets: `/public` and `/src/assets`

## Completed Features

### Registration UI (2026-02-10)
- 2-column layout (form + illustration)
- Glass effect background
- Form validation (email, password, confirm password)
- Responsive design

### Sidebar Navigation (2026-03-16)
- **Collapsed state:** 56px width (icon + tooltip only)
- **Expanded state:** 200px width (icon + label visible)
- **Hover-to-expand:** 500ms delay to expand, lock toggle available
- **Sliding indicator:** Smooth translateY animation (300ms) to active nav item
- **Glass effect:** Transparent background with backdrop blur
- **6 menu items:**
  - Kết nối nền tảng → `/app/connect`
  - Chat → `/app/chat` (default)
  - Danh bạ → `/app/contacts`
  - Lịch sử → `/app/history`
  - Nhân viên → `/app/staff`
  - Cài đặt → `/app/settings`
- **User section:** Avatar + name/role at bottom
- **Composable:** `useSidebar()` manages state (is_expanded, is_locked, active_index)
- **Components:** AppSidebar.vue, SidebarItem.vue
- **Icons:** logo, global, chatting-01, contact-01, history, user-multiple, setting-01
- **Full docs:** See `docs/sidebar/README.md`

## Next Steps for New Developers

1. Read `docs/project-overview-pdr.md` - Understand project goals
2. Read `docs/code-standards.md` - Learn coding conventions
3. Read `docs/system-architecture.md` - Understand data flow
4. Review `docs/sidebar/README.md` - Learn about sidebar implementation
5. Run `npm install && npm run dev` - Start dev server
6. Run `npm run test` - See tests passing
7. Make small changes to understand the workflow
8. Refer to existing components/pages as patterns
