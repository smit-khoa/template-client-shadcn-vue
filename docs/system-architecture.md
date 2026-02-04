# System Architecture

**Last Updated:** 2026-02-04

## Architecture Overview

Template-client-shadcn-vue sử dụng một kiến trúc modern client-side rendering với separation of concerns giữa UI components, state management, routing, và API layer.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser / Client                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              Vue 3 Application (App.vue)            │  │
│  │  - Router initialization                            │  │
│  │  - Route guards & auth checks                       │  │
│  │  - Toaster/notification config                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                          ▲                                 │
│                          │                                 │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Vue Router (Routing Layer)               │    │
│  │  - Route definitions                             │    │
│  │  - beforeEach guards for auth & redirect        │    │
│  │  - Dynamic component loading                     │    │
│  └──────────────────────────────────────────────────┘    │
│                          ▲                                 │
│          ┌───────────────┼───────────────┐               │
│          │               │               │               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │   Pages      │ │  Components  │ │   Layout     │   │
│  │              │ │              │ │              │   │
│  │ - Home.vue   │ │ - ui/* (40+) │ │ - index.vue  │   │
│  │ - app/*      │ │ - custom/*   │ │ - sidebar/*  │   │
│  │ - auth/*     │ │ - auth/*     │ │              │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│          │               │               │               │
│          └───────────────┼───────────────┘               │
│                          │                                 │
│  ┌───────────────────────▼───────────────────────────┐  │
│  │         State Management (Pinia Store)            │  │
│  │  - user.ts: User & company data                  │  │
│  │  - Actions: setUser(), clearUser()               │  │
│  │  - Getters: getUser, hasCompany                  │  │
│  └───────────────────────┬───────────────────────────┘  │
│                          │                                 │
│  ┌───────────────────────▼───────────────────────────┐  │
│  │      Composables & Utilities                      │  │
│  │  - useTheme: Theme switching                      │  │
│  │  - useSprite: SVG sprite loading                  │  │
│  │  - lib/utils: cn() helper                         │  │
│  │  - common/index: formatCurrency, formatDate       │  │
│  └───────────────────────┬───────────────────────────┘  │
│                          │                                 │
│  ┌───────────────────────▼───────────────────────────┐  │
│  │         API Layer (controllers/global)            │  │
│  │  - Axios instance with error handling             │  │
│  │  - Toast notifications                            │  │
│  │  - Authorization header injection                 │  │
│  │  - Proxy configuration                            │  │
│  └───────────────────────┬───────────────────────────┘  │
│                          │                                 │
│                          ▼                                 │
│              ┌─────────────────────┐                      │
│              │  HTTP Client Layer  │                      │
│              │  (Axios)            │                      │
│              └────────────┬────────┘                      │
│                           │                                │
└───────────────────────────┼────────────────────────────────┘
                            │
                            │ (HTTP/HTTPS)
                            │
                 ┌──────────▼──────────┐
                 │   Backend Server   │
                 │  - Cloudflare      │
                 │  - /api/v1/*       │
                 └────────────────────┘
```

## Component Architecture

### Page Component (Entry Point)

```
Pages/
├── Home.vue                    # Landing page with login
├── app/
│   ├── Staff.vue              # Staff management
│   └── [other features]
└── auth/
    ├── Login.vue
    └── Register.vue
```

**Responsibilities:**
- Route-specific logic
- Page-level state coordination
- Fetching data on mount
- Layout management

### Layout Components

```
Layout/
├── index.vue                   # Main app layout
└── sidebar/
    ├── Sidebar.vue            # Navigation sidebar
    └── SidebarItem.vue
```

**Responsibilities:**
- Navigation structure
- Persistent UI elements (header, sidebar)
- Layout switching based on route

### Custom Components

```
Components/custom/
├── Button.vue                 # Enhanced button wrapper
├── Input.vue                  # Custom input wrapper
├── Table.vue                  # Custom table wrapper
├── AppTable.vue               # Full-featured table
├── Dropdown.vue
├── Filter.vue
├── Pagination.vue
├── Search.vue
├── Switch.vue
├── Tabs.vue
├── TagInput.vue
├── Datepicker.vue
├── Confirm.vue
├── Toast.vue
├── Tooltip.vue
├── Loading.vue
├── Spinner.vue
├── Popup.vue
├── ThemeToggle.vue
├── Box.vue
└── Icon.vue
```

**Responsibilities:**
- Wrap Shadcn-Vue components
- Add project-specific styling
- Extend functionality as needed
- Provide consistent interfaces

### UI Components (Shadcn Base)

```
Components/ui/
├── accordion/
├── alert-dialog/
├── button/
├── checkbox/
├── dialog/
├── drawer/
├── dropdown-menu/
├── input/
├── label/
├── pagination/
├── scroll-area/
├── sheet/
├── skeleton/
├── stepper/
├── switch/
├── tabs/
├── tooltip/
├── sonner/
└── [36+ more]
```

**Responsibilities:**
- Base unstyled components
- Accessibility (a11y) compliance
- Reusable component patterns

## Data Flow Architecture

### Authentication Flow

```
1. App.vue mounts
   │
   ├─► main.ts: setupApp()
   │   └─► router.beforeEach guard
   │
2. Router guard executes
   │
   ├─► Check localStorage.accessToken
   │
   ├─► Call api GET /api/v1/public/auth/me
   │
   ├─ Response.error === false
   │  │
   │  ├─► user.setUser(response.data)
   │  ├─► Pinia store updated
   │  └─► Route allowed
   │
   └─ Response.status === 401
      │
      ├─► localStorage.removeItem("accessToken")
      ├─► toast.error("Unauthorized")
      └─► Redirect to /login
```

### Component Rendering Flow

```
1. Route matched
   │
   ├─► Page component mounted
   │
   ├─► useTheme() composable initialized
   │
   ├─► Pinia store accessed (user store)
   │
   ├─► API calls made if needed
   │
   ├─► Render layout + page content
   │
   └─► useSprite() loads SVG sprites
```

## State Management Architecture (Pinia)

### Store Structure

```typescript
// store/user.ts - Single source of truth for user data

State:
├─ user: UserData | null
│  ├─ userName: string
│  ├─ email: string
│  └─ company: Company[]
│     ├─ userId: string
│     ├─ companyId: string
│     └─ companyName: string

Actions:
├─ setUser(userData): Set user data
└─ clearUser(): Clear user data

Getters:
├─ getUser: Return current user
└─ hasCompany: Check if user has companies
```

### State Updates Flow

```
Component Event
      │
      ▼
Call store.setUser() action
      │
      ▼
Update state.user
      │
      ▼
Computed properties update
      │
      ▼
Component reactivity triggered
      │
      ▼
Template re-renders
```

## API Layer Architecture

### Axios Wrapper (controllers/global.ts)

```typescript
Interface:
├─ api<T>({
│  ├─ url: string
│  ├─ method: 'GET' | 'POST' | 'PUT' | 'DELETE'
│  ├─ data?: any
│  ├─ params?: any
│  ├─ authorization?: string
│  └─ toast?: boolean
│  └─ ApiResponse<T>
│
└─ Response handling
   ├─ Success: return typed response
   ├─ Error: return ApiErrorResponse
   ├─ 401: auto redirect & clear token
   └─ Other: show toast notification
```

### Request/Response Flow

```
Component calls:
api<UserResponse>({
  url: '/api/v1/user',
  method: 'GET',
  authorization: token
})
      │
      ▼
Axios interceptor:
- Add authorization header
- Add Content-Type
      │
      ▼
HTTP Request to backend
      │
      ▼
Response received
      │
      ├─ 2xx: Parse & return data
      ├─ 401: Clear token, redirect
      ├─ 4xx/5xx: Show toast error
      │
      ▼
Component receives typed response
```

## Routing Architecture

### Route Definitions

```typescript
Routes:
├─ / (Landing)
│  ├─ Component: Home.vue
│  ├─ Meta: { needLogin: false, block: true }
│  └─ Purpose: Login form, public
│
├─ /app (Protected)
│  ├─ Component: Layout.vue
│  ├─ Meta: { needLogin: true }
│  └─ Children:
│     ├─ /app/staff
│     ├─ /app/settings
│     └─ ...
│
└─ /:pathMatch(.*)*
   └─ Redirect: /

Route Guards:
- beforeEach: Check auth, fetch user, handle redirects
```

## Theme System Architecture

### Dark/Light Mode Flow

```
useTheme() composable
      │
      ├─ State: current_theme
      │
      ├─ Computed: is_dark
      │
      └─ Methods:
         ├─ toggleTheme()
         ├─ setTheme(theme)
         │
         ▼
    Update CSS variables
         │
         ├─ --primary-base
         ├─ --secondary-base
         ├─ --tertiary-base
         │
         ▼
    TailwindCSS respects variables
         │
         ▼
    Component styles update
```

### Color System

```css
/* Primary Teal Palette */
--primary-base: #269a85      /* Main brand color */
--secondary-base: #1e7b6a    /* Secondary shade */
--tertiary-base: #2eb9a0     /* Tertiary shade */

/* Dark mode overrides */
[data-theme="dark"] {
  --primary-base: #0e6b5a
  --secondary-base: #073e34
  --tertiary-base: #1a9a87
}

/* Font System */
Font Family: Inter
Weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
Sizes: Defined in TailwindCSS config
```

## Asset Management

### SVG Sprites (useSprite)

```
Assets/icons/
│
├─ All SVG icons stored
│
└─ vue-svg-sprite plugin:
   ├─ Bundles SVGs into single file
   ├─ useSprite() loads sprites
   ├─ <IconComponent name="icon-name" />
   └─ Reduces HTTP requests
```

### Images & Fonts

```
Assets/
├─ fonts/
│  └─ Inter (all weights)
├─ images/
│  └─ Logo, illustrations, etc
└─ icons/
   └─ SVG sprites
```

## Testing Architecture

### Unit Testing (Vitest)

```
__tests__/
├─ components/
│  ├─ Button.spec.ts
│  └─ [component specs]
├─ composables/
│  ├─ useTheme.spec.ts
│  └─ [composable specs]
├─ store/
│  ├─ user.spec.ts
│  └─ [store specs]
├─ common/
│  └─ [utility specs]
└─ controllers/
   └─ [controller specs]

Test Pattern:
- describe() for test suites
- it() for individual tests
- mount() for component testing
- Mocking API calls with vi.mock()
```

### E2E Testing (Playwright)

```
e2e/tests/
├─ auth.spec.ts
│  └─ Login, logout flows
├─ user.spec.ts
│  └─ User operations
├─ ui.spec.ts
│  └─ Visual regression tests
└─ [feature specs]

Device Profiles:
├─ Desktop (1920x1080)
├─ Laptop HD (1366x768)
├─ Mobile (375x812)
└─ Tablet (768x1024)

Visual Testing:
- Pixelmatch for image comparison
- Baseline images stored
- Regression detection
```

## Build & Deployment Architecture

### Build Pipeline

```
Source Code (src/)
      │
      ├─► TypeScript Compilation (vue-tsc)
      │   └─ Type checking
      │
      ├─► Vue SFC Compilation
      │   └─ .vue → .js
      │
      ├─► Module Bundling (Vite)
      │   ├─ Tree shaking
      │   ├─ Code splitting
      │   └─ Asset optimization
      │
      └─► Output (dist/)
         ├─ index.html
         ├─ assets/
         │  ├─ main-[hash].js
         │  ├─ main-[hash].css
         │  └─ chunk-*.js
         └─ [static assets]
```

### Development vs Production

```
Development (npm run dev)
├─ Vite dev server on localhost:5173
├─ Hot Module Replacement (HMR)
├─ Source maps for debugging
├─ Slow build, fast feedback
└─ Proxy /api → Cloudflare

Production (npm run build)
├─ Optimized bundle (< 500KB gzipped)
├─ CSS minified
├─ No source maps
├─ Asset hashing for caching
└─ Ready for deployment
```

## Performance Optimization

### Strategies

1. **Code Splitting**
   - Dynamic import for routes
   - Lazy load components
   - Separate chunk per route

2. **Asset Optimization**
   - SVG sprites reduce requests
   - Image optimization
   - Font subsetting (Inter)

3. **Bundle Size**
   - Tree shaking unused code
   - Remove unused CSS
   - Minify and compress

4. **Runtime Performance**
   - Component memoization
   - Computed property caching
   - Debounce/throttle expensive operations

## Security Considerations

### Data Protection

```
Sensitive Data:
- Access tokens: stored in localStorage
  (Consider: sessionStorage for extra security)
- User data: stored in Pinia store (in-memory)
- API responses: processed in memory

HTTPS:
- Enforced in production
- Dev server supports SSL via plugin
```

### XSS Protection

```
Vue 3 provides:
- Automatic HTML escaping
- v-html avoided unless necessary
- Sanitize external HTML inputs
```

### CSRF Protection

```
Backend handles:
- CSRF token validation
- SameSite cookie flags
```

## Scalability Considerations

### For Growing Applications

1. **Module Federation**: Split app into micro-frontends
2. **State Management**: Consider multiple stores per domain
3. **Component Organization**: Feature-based folder structure
4. **Testing**: Increase coverage as app grows
5. **Performance**: Monitor bundle size & runtime metrics
6. **Documentation**: Keep docs in sync with features

## Integration Points

### Figma Integration
- Visual testing with Figma design tokens
- Design system documentation
- Component visual regression testing

### Cloudflare Backend
- API proxy in development
- Authentication endpoint: `/api/v1/public/auth/me`
- User company data retrieval

### Third-party Services
- Vue Sonner: Toast notifications
- Axios: HTTP client
- Lucide Icons: Icon library
