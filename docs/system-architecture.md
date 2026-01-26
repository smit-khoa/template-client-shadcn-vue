# System Architecture - SMIT Chat

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   Browser / Client                           │
├─────────────────────────────────────────────────────────────┤
│
│  ┌──────────────────────────────────────────────────────┐
│  │              Vue 3 Application (SPA)                  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │          Presentation Layer                  │   │
│  │  │  ┌────────┬─────────┬────────┬──────────┐   │   │
│  │  │  │Pages   │Layouts  │App     │Shared    │   │   │
│  │  │  │(Routes)│(UI)     │(Biz)   │(Utils)   │   │   │
│  │  │  └────────┴─────────┴────────┴──────────┘   │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │         Component Layer (4-Tier)            │   │
│  │  │  ┌─────────────────────────────────────┐    │   │
│  │  │  │ Layer 1: UI (Shadcn/UI Base)        │    │   │
│  │  │  │ (Dialog, Dropdown, Button, Input)   │    │   │
│  │  │  ├─────────────────────────────────────┤    │   │
│  │  │  │ Layer 2: Custom (Wrappers)          │    │   │
│  │  │  │ (Enhanced Input, Button, etc)       │    │   │
│  │  │  ├─────────────────────────────────────┤    │   │
│  │  │  │ Layer 3: App (Feature Components)   │    │   │
│  │  │  │ (Login, StaffList, PlatformCard)    │    │   │
│  │  │  ├─────────────────────────────────────┤    │   │
│  │  │  │ Layer 4: Page (Route-Level)         │    │   │
│  │  │  │ (Staff.vue, Platforms.vue, etc)     │    │   │
│  │  │  └─────────────────────────────────────┘    │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │         State Management (Pinia)            │   │
│  │  │  ┌────────────────────────────────────┐     │   │
│  │  │  │ Stores:                            │     │   │
│  │  │  │ - user (userName, email)           │     │   │
│  │  │  │ - (future: staff, platforms, etc)  │     │   │
│  │  │  └────────────────────────────────────┘     │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │       API Layer (Controllers)                │   │
│  │  │  ┌────────────────────────────────────┐     │   │
│  │  │  │ global.js:                         │     │   │
│  │  │  │ - api() wrapper function           │     │   │
│  │  │  │ - Axios configuration              │     │   │
│  │  │  │ - Error handling + toast           │     │   │
│  │  │  │ - Token management                 │     │   │
│  │  │  └────────────────────────────────────┘     │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │      Router (Vue Router)                     │   │
│  │  │  ┌────────────────────────────────────┐     │   │
│  │  │  │ Routes, guards, lazy loading       │     │   │
│  │  │  │ beforeEach: auth check + fetch me  │     │   │
│  │  │  └────────────────────────────────────┘     │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │   Styling (Tailwind + CSS Variables)         │   │
│  │  │  ┌────────────────────────────────────┐     │   │
│  │  │  │ - TailwindCSS utility classes      │     │   │
│  │  │  │ - CSS Variables (colors, spacing)  │     │   │
│  │  │  │ - SCSS scoped styles               │     │   │
│  │  │  └────────────────────────────────────┘     │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  │  ┌──────────────────────────────────────────────┐   │
│  │  │      Utilities & Composables                 │   │
│  │  │  ┌────────────────────────────────────┐     │   │
│  │  │  │ - formatCurrency, formatDate       │     │   │
│  │  │  │ - useSprite (icons)                │     │   │
│  │  │  │ - image() helper                   │     │   │
│  │  │  └────────────────────────────────────┘     │   │
│  │  └──────────────────────────────────────────────┘   │
│  │
│  └──────────────────────────────────────────────────────┘
│
├─────────────────────────────────────────────────────────────┤
│                HTTP / Network Layer (Axios)                 │
├─────────────────────────────────────────────────────────────┤
│  - Bearer Token authentication
│  - Request headers (timezone, content-type)
│  - Response interceptors
│  - Error handling
│
├─────────────────────────────────────────────────────────────┤
│                     API Backend                             │
├─────────────────────────────────────────────────────────────┤
│  URL: https://cart-composite-vat-towards.trycloudflare.com  │
│  Routes:                                                    │
│  - /api/v1/public/auth/login                               │
│  - /api/v1/public/auth/register                            │
│  - /api/v1/public/auth/verify                              │
│  - /api/v1/public/auth/me (current user)                   │
│  - /api/v1/users/* (staff management)                      │
│  - /api/v1/platforms/* (platform integration)              │
│  - /api/v1/customers/* (customer directory)                │
│  - /api/v1/messages/* (chat history)                       │
│  - And more...                                             │
│
└─────────────────────────────────────────────────────────────┘
```

## 2. Data Flow Architecture

### 2.1 Request Flow (User Action → API)

```
User Action (click, submit)
    ↓
Component Handler (handleClick, handleSubmit)
    ↓
Component Logic (validation, state update)
    ↓
Pinia Action (store.fetchUsers, store.setUser)
    ↓
API Call (api({ url, method, data }))
    ↓
Axios Request + Headers
    (Authorization: Bearer <token>)
    (Timezone: Auto-detect)
    (Content-Type: application/json)
    ↓
HTTP Request → Backend
```

### 2.2 Response Flow (API → UI Update)

```
HTTP Response from Backend
    ↓
Axios Response Handler
    - Check for error flag
    - Handle error status (401, 500, etc)
    ↓
If Error:
    - Show toast notification (if toast: true)
    - Return error object
    ↓
If Success:
    - Return data object
    ↓
Component receives response
    ↓
Component/Store updates state
    ↓
Vue re-renders UI (reactivity)
    ↓
User sees result
```

### 2.3 State Management Flow

```
┌─────────────────────────┐
│   User Action           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Pinia Store Action    │
│   (async function)      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   API Call (global.js)  │
│   - api() function      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   HTTP Request          │
│   - Bearer token        │
│   - JSON body           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Backend Response      │
│   - Success or error    │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Store updates state   │
│   - this.users = data   │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Component re-renders  │
│   - Vue reactivity      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   UI Updates            │
│   - Display new data    │
└─────────────────────────┘
```

## 3. Authentication Architecture

### 3.1 Auth Flow Diagram

```
┌──────────────────────────────────┐
│     User not authenticated       │
└──────────────────┬───────────────┘
                   ↓
            ┌──────────────┐
            │ User visits  │
            │ /login page  │
            └──────┬───────┘
                   ↓
       ┌───────────────────────┐
       │ User enters email &   │
       │ password              │
       └───────────┬───────────┘
                   ↓
    ┌──────────────────────────────┐
    │ POST /api/v1/public/auth/    │
    │ login                        │
    │ { email, password }          │
    └──────────┬───────────────────┘
               ↓
    ┌──────────────────────────────┐
    │ Server validates & returns   │
    │ { accessToken, user }        │
    └──────────┬───────────────────┘
               ↓
  ┌────────────────────────────────────┐
  │ localStorage.setItem(               │
  │   "accessToken", token)             │
  └────────────┬─────────────────────────┘
               ↓
      ┌─────────────────────────┐
      │ Navigate to /app/staff  │
      │ (protected route)       │
      └────────────┬────────────┘
                   ↓
  ┌────────────────────────────────────┐
  │ beforeEach router guard triggers    │
  │ GET /api/v1/public/auth/me         │
  │ with Bearer token                  │
  └────────────┬─────────────────────────┘
               ↓
  ┌────────────────────────────────────┐
  │ If token valid: store user info    │
  │ If token invalid: redirect /login  │
  └────────────┬─────────────────────────┘
               ↓
    ┌──────────────────────────────┐
    │ User can access app features │
    └──────────────────────────────┘
```

### 3.2 Token Management

```
Login:
  1. POST /login
  2. Receive: { accessToken }
  3. Store: localStorage.setItem("accessToken", token)
  4. Header: Authorization: Bearer <token>

Each Request:
  1. Get token: localStorage.getItem("accessToken")
  2. Add header: Authorization: <token>
  3. Axios sends with every request

Logout:
  1. localStorage.removeItem("accessToken")
  2. Redirect to /login
  3. Store is cleared

Token Validation:
  1. beforeEach guard
  2. GET /api/v1/public/auth/me
  3. If 401: token expired, clear and redirect
  4. If 200: user is valid, continue
```

## 4. Component Hierarchy

### 4.1 Page Structure

```
App.vue (Root)
  ↓
Router (Vue Router)
  ├── Home.vue (landing)
  ├── Auth.vue (auth layout)
  │   ├── Login.vue
  │   ├── Register.vue
  │   ├── Verify.vue
  │   ├── GoogleAuth.vue
  │   ├── ForgotPassword.vue
  │   └── ResetPassword.vue
  ├── Onboarding.vue
  │   ├── Step 1: Company info
  │   └── Step 2: Add employees
  └── MainLayout (app layout for logged-in users)
      ├── Navbar
      │   ├── Logo
      │   ├── Navigation menu
      │   └── User profile dropdown
      ├── Sidebar (TBD)
      │   └── Navigation links
      └── Routes:
          ├── Staff.vue (staff management)
          │   ├── StaffList component
          │   ├── StaffDetail component
          │   └── AddStaffModal component
          ├── Platforms.vue (platform integration)
          │   ├── PlatformTabs component
          │   ├── PlatformCard component
          │   ├── FilterBar component
          │   └── PlatformConnectionModal
          ├── Customer.vue (customer directory)
          │   ├── SearchBar component
          │   ├── FilterBar component
          │   ├── GridView/ListView component
          │   ├── CustomerCard component
          │   └── CustomerDetail component
          └── ChatHistory.vue (message history)
              ├── SearchBar component
              ├── FilterBar component
              ├── ConversationList component
              ├── MessageList component
              └── ExportButton component
```

### 4.2 Component Layer Breakdown

```
Layer 1: UI Base (Shadcn/UI)
  - Dialog: Modal/Popup dialogs
  - Dropdown: Dropdown menus
  - Button: Base button
  - Input: Base input
  - Checkbox, Radio, Select, Tabs
  - Scroll Area, Accordion
  - Toast (Sonner integration)

Layer 2: Custom Wrappers
  - Input: Enhanced input with validation
  - Button: Variant support (primary, danger, etc)
  - Checkbox: Custom styling
  - Dropdown: Enhanced dropdown
  - Popup: Modal wrapper
  - Drawer: Side panel
  - Table: Data table wrapper
  - Search: Search input
  - Icon: Icon renderer
  - Tabs: Tab navigation
  - Paging: Pagination

Layer 3: App Features
  - authentication/
    ├── Login.vue
    ├── Register.vue
    ├── Verify.vue
    └── ...
  - staff/
    ├── StaffList.vue
    ├── StaffCard.vue
    └── AddStaffModal.vue
  - platforms/
    ├── PlatformCard.vue
    ├── PlatformTabs.vue
    └── ...
  - customer/
    ├── CustomerCard.vue
    ├── CustomerGrid.vue
    └── ...

Layer 4: Page-Level Routes
  - Staff.vue (wraps StaffList)
  - Platforms.vue (wraps PlatformTabs)
  - Customer.vue (wraps CustomerGrid)
  - ChatHistory.vue (wraps MessageList)
```

## 5. State Management

### 5.1 Pinia Store Structure

```
Store: user
├── State:
│   └── user: {
│       userName: string
│       email: string
│   }
│
├── Getters:
│   └── getUser: () => user
│
└── Actions:
    └── setUser(user): void
```

### 5.2 Future Store Plans

```
Store: staff (planned)
├── State:
│   ├── staff_list: []
│   ├── is_loading: false
│   └── error: ""
├── Actions:
│   ├── fetchStaffList()
│   ├── addStaff()
│   └── deleteStaff()

Store: platforms (planned)
├── State:
│   ├── platforms: []
│   ├── connection_status: {}
│   └── is_syncing: false
├── Actions:
│   ├── fetchPlatforms()
│   ├── connectPlatform()
│   └── disconnectPlatform()

Store: customer (planned)
├── State:
│   ├── customers: []
│   ├── selected_customer: null
│   └── total_count: 0
├── Actions:
│   ├── fetchCustomers()
│   ├── searchCustomers()
│   └── updateCustomer()
```

## 6. API Architecture

### 6.1 API Request Pattern

```typescript
const api = async ({
  url: string,              // /api/v1/...
  method: string,           // GET, POST, PUT, DELETE
  data: object,             // Request body
  params: object,           // Query params
  toast: boolean,           // Show error toast (default: true)
  authorization: string,    // Custom token (default: localStorage)
  signal: AbortSignal       // Cancel token
}) => {
  return {
    // Success response
    data: T,
    error: false,

    // Error response
    error: true,
    message: string,
    status: number,
    subcode: string
  }
}
```

### 6.2 Error Handling

```
Response Status:
  ├── 200-299: Success
  │   └── Return data
  ├── 400-499: Client error
  │   ├── 401: Unauthorized (redirect login)
  │   ├── 404: Not found
  │   └── 422: Validation error
  └── 500-599: Server error
      └── Retry or show error

Error Response Structure:
  {
    error: true,
    message: "Error message",
    status: 400,
    subcode: "VALIDATION_ERROR",
    is_cancel: false  // if aborted
  }
```

### 6.3 API Routes Reference

```
Authentication:
  POST /api/v1/public/auth/login
  POST /api/v1/public/auth/register
  POST /api/v1/public/auth/verify
  GET /api/v1/public/auth/me
  POST /api/v1/public/auth/google
  POST /api/v1/public/auth/forgot-password
  POST /api/v1/public/auth/reset-password

Staff Management:
  GET /api/v1/users
  POST /api/v1/users
  GET /api/v1/users/{id}
  PUT /api/v1/users/{id}
  DELETE /api/v1/users/{id}

Platforms:
  GET /api/v1/platforms
  POST /api/v1/platforms/{platform}/connect
  DELETE /api/v1/platforms/{platform}/disconnect
  GET /api/v1/platforms/{platform}/settings

Customers:
  GET /api/v1/customers
  POST /api/v1/customers
  GET /api/v1/customers/{id}
  PUT /api/v1/customers/{id}
  DELETE /api/v1/customers/{id}

Messages:
  GET /api/v1/messages
  GET /api/v1/messages/{conversation_id}
  POST /api/v1/messages/export
```

## 7. Routing Architecture

### 7.1 Route Structure

```
Routes:
├── / (home, needLogin: false)
├── /auth (layout)
│   ├── /login (needLogin: false, block: true)
│   ├── /register (needLogin: false, block: true)
│   ├── /verify (needLogin: false, block: true)
│   ├── /google-auth (needLogin: false, block: true)
│   ├── /forgot-password (needLogin: false, block: true)
│   ├── /forgot-password-verify (needLogin: false, block: true)
│   └── /reset-password (needLogin: false, block: true)
├── /onboarding (needLogin: true)
└── /app (layout, needLogin: true)
    ├── /app/staff (staff management)
    ├── /app/platforms (platform integration)
    ├── /app/chat-history (message history)
    └── /app/customer (customer directory)
```

### 7.2 Route Meta Guards

```
needLogin: false
  - Route doesn't require authentication
  - Allow public access
  - Example: Home, Login, Register

needLogin: true
  - Route requires authentication
  - Check token, redirect to /login if invalid
  - Example: /app/staff, /onboarding

block: true
  - If user is already logged in, redirect to /app/staff
  - Prevent logged-in users from viewing auth pages
  - Example: /login, /register
```

## 8. Styling Architecture

### 8.1 CSS Cascade

```
Global Styles (style.css)
  ├── CSS Variables (colors, spacing)
  ├── Font definitions (@font-face)
  ├── Tailwind directives (@import "tailwindcss")
  └── Reset styles (*, *::before, *::after)
    ↓
Tailwind CSS Utilities
  ├── Responsive modifiers (sm:, md:, lg:, xl:)
  ├── Hover states (hover:, focus:)
  ├── Dark mode (dark:)
  └── Custom config (Vite integration)
    ↓
Component Scoped Styles (SCSS)
  ├── Scoped to component
  ├── Complex animations, shadows
  └── Dynamic styles via CSS modules
    ↓
Inline Styles (v-bind)
  └── Dynamic values from component state
```

### 8.2 CSS Variables System

```
Colors:
  --primary-base: #269a85 (main brand color)
  --primary-100 to 700 (shades)
  --secondary-base: #1e7b6a
  --secondary-100 to 700
  --tertiary-base: #2eb9a0
  --tertiary-100 to 700
  --grey-100 to 700 (grayscale)
  --neutral-100: #1a2229 (main text)
  --destructive: #dc2626 (danger/delete)
  --white, --black (base)

Typography:
  Font-family: Inter
  Font-weight: 400, 500, 600, 700

Semantic Colors:
  --background (page background)
  --foreground (text)
  --muted (disabled/secondary)
  --border (borders)
  --ring (focus rings)
```

## 9. Build & Deployment

### 9.1 Build Process

```
Development:
  $ npm run dev
    ↓
  Vite dev server (port 8309)
  HTTPS enabled (self-signed)
  API proxy /api/* → backend
  HMR enabled (hot reload)

Production:
  $ npm run build
    ↓
  Vue TSC type checking
  Vite bundling & optimization
  - Code splitting
  - CSS minification
  - Image optimization
  - Tree shaking
    ↓
  dist/ folder (ready to deploy)
```

### 9.2 Deployment Strategy

```
Frontend Deployment:
  - Static hosting (Vercel, Netlify, Cloudflare Pages)
  - CDN for assets
  - HTTPS required
  - CORS configured for API calls

Backend:
  - Cloudflare Workers (current setup)
  - Custom domain with SSL

Configuration:
  - Environment variables
  - API base URL (dev vs prod)
  - Timezone auto-detection
  - Feature flags (optional)
```

## 10. Performance Optimization

### 10.1 Code Splitting Strategy

```
Routes lazy loaded:
  const Staff = () => import("@/pages/Staff.vue")
  const Platforms = () => import("@/pages/Platforms.vue")

Benefits:
  - Smaller initial bundle
  - Faster first page load
  - Progressive loading as needed

Component lazy loading:
  components: {
    StaffModal: () => import("@/components/StaffModal.vue")
  }
```

### 10.2 Caching Strategy

```
Browser Cache:
  - Static assets (fonts, images): long-term cache
  - JavaScript bundles: cache busting via hash
  - API responses: cache headers set by server

API Caching:
  - User info cached in store
  - List data with pagination
  - Search results debounced
```

## 11. Monitoring & Error Handling

### 11.1 Error Handling Flow

```
Client Error:
  ├── Validation error (handleSubmit)
  ├── Input error (Input component)
  └── Network error (api wrapper)
    ↓
  Show toast error message
  Log to console (dev)
  Optionally send to error tracking

Server Error:
  ├── 401 Unauthorized → redirect /login
  ├── 404 Not found → show message
  ├── 422 Validation → show field errors
  └── 500+ Server error → show toast
    ↓
  Clear sensitive data
  Suggest user action
  Optionally retry
```

### 11.2 Debug Helpers

```
Environment Variables:
  - import.meta.env.DEV (development mode)
  - import.meta.env.PROD (production mode)

Console Logging:
  - API requests/responses
  - Store mutations
  - Route changes
  - Error stack traces
```

## 12. Security Architecture

### 12.1 Authentication & Authorization

```
Authentication (Who are you?)
  1. Login with credentials
  2. Receive bearer token
  3. Store in localStorage
  4. Send with every request

Authorization (What can you do?)
  1. Check route meta (needLogin, block)
  2. Verify token expiry
  3. Backend validates permissions
  4. Client-side UI shows/hides features
```

### 12.2 Security Best Practices

```
Token Security:
  - Store in localStorage (httpOnly not available in SPA)
  - Send via Authorization header (not URL)
  - Validate on backend
  - Expire after 24 hours

Data Security:
  - HTTPS only (dev & prod)
  - XSS prevention (Vue auto-escape)
  - CSRF tokens (server-side)
  - Input validation (both client & server)

API Security:
  - Validate all inputs
  - Rate limiting (server-side)
  - CORS configured correctly
  - No sensitive data in logs
```

---

**Document Version:** 1.1
**Last Updated:** 2026-01-26
**Status:** MVP Phase Complete
**Tech Stack:** Vue 3.5.24 + Vite 7.2.4 + TypeScript 5.9.3 + Tailwind CSS 4.1.18
**Components:** 44 total (23 custom + 21 Shadcn/UI)
**Total Files:** 302 files
