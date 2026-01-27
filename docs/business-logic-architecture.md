# Business Logic Architecture - SMIT Chat

**Báo cáo chi tiết**: Phân tích kiến trúc State Management, Router & Controllers  
**Ngày tạo**: 2026-01-27  
**Project**: SMIT Chat (Unified Messaging Platform)

---

## 📋 Tóm tắt Executive Summary

SMIT Chat sử dụng **kiến trúc 3-lớp rõ ràng** cho business logic:

| Lớp | Công nghệ | Trách nhiệm |
|-----|-----------|-----------|
| **State Layer** | Pinia (Store) | Quản lý state toàn cục (user info, company data) |
| **Routing Layer** | Vue Router | Navigation, auth guards, route metadata |
| **API Layer** | Axios (global controller) | HTTP requests, error handling, token injection |

**Hiện trạng**:
- ✅ Store: 1 module (user) - đơn giản, dễ mở rộng
- ✅ Router: Cấu trúc cơ bản, auth guard tại main.ts
- ✅ Controllers: Centralized API wrapper (global.js)

---

## 1. State Management (Pinia)

### 1.1 Cấu trúc Store

**Vị trí**: `/src/store/`

```
store/
├── index.ts          # Root store initialization
└── user.ts           # User store module
```

### 1.2 User Store Module

**File**: `/src/store/user.ts`

```typescript
// State Interface
interface State {
    user: UserData | null
}

interface UserData {
    userName: string
    email: string
    company: Company[]  // Multi-company support
}

interface Company {
    userId: string
    companyId: string
    companyName: string
}

// Store Definition
export const user = defineStore("user_store", {
    // State: Lưu thông tin user hiện tại
    state: (): State => ({
        user: null
    }),
    
    // Actions: Thay đổi state (BẮT BUỘC sử dụng)
    actions: {
        setUser(user: UserData) {
            this.user = user
        }
    },
    
    // Getters: Truy cập computed state
    getters: {
        getUser: state => state.user,
        hasCompany: state => state.user?.company && state.user.company.length > 0
    }
})
```

### 1.3 Cách Sử Dụng

```typescript
// Import store
import { user } from "@/store"

// Khởi tạo store instance
const user_store = user()

// Đọc state
console.log(user_store.getUser)
console.log(user_store.hasCompany)

// Thay đổi state via actions
user_store.setUser({
    userName: "John Doe",
    email: "john@example.com",
    company: [{ userId: "123", companyId: "456", companyName: "Acme Corp" }]
})

// Direct mutation (không khuyến khích - chỉ dùng trong trường hợp đặc biệt)
user_store.user = null
```

### 1.4 Data Flow - Authentication

```
1. User đăng nhập
   ↓
2. POST /api/v1/public/auth/login
   ↓
3. Backend trả về { token }
   ↓
4. Frontend lưu token vào localStorage.accessToken
   ↓
5. Route guard (beforeEach) gọi GET /api/v1/public/auth/me
   ↓
6. Backend trả về UserData { userName, email, company[] }
   ↓
7. user_store.setUser() → Cập nhật state
   ↓
8. Components đọc từ user_store.getUser hoặc user_store.hasCompany
```

### 1.5 Thiết kế Store - Best Practices

✅ **ĐÚNG**: Sử dụng actions để thay đổi state
```typescript
// ✅ Khuyến khích
user_store.setUser(data)
```

❌ **SAI**: Thay đổi trực tiếp state (chỉ dùng trong emergencies)
```typescript
// ❌ Không khuyến khích
user_store.user = data  // Có thể gây lỗi data inconsistency
```

---

## 2. Router Configuration (Vue Router)

### 2.1 Cấu trúc Routes

**File**: `/src/router/index.ts`

```typescript
const routes = [
    // Landing page - Home with login form
    {
        path: "/",
        component: () => import("@/pages/Home.vue"),
        meta: { needLogin: false, block: true }  // Public route, redirect if logged in
    },
    
    // App layout - Nested routes (currently empty children)
    {
        path: "/app",
        component: () => import("@/layout/index.vue"),
        children: []  // ← TODO: Add nested routes here
    },
    
    // Catch-all - Redirect 404 to home
    { path: "/:pathMatch(.*)*", redirect: "/" }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
```

### 2.2 Route Metadata

| Meta Key | Type | Mục đích | Ví dụ |
|----------|------|---------|-------|
| `needLogin` | boolean | Bắt buộc đăng nhập | `false` = public, `true` = protected |
| `block` | boolean | Chặn người đã đăng nhập | Chuyển hướng /app nếu có token |

### 2.3 Auth Guard Flow

**Vị trí**: `/src/main.ts` (router.beforeEach)

```typescript
router.beforeEach(async (to, _from, next) => {
    // 1. Route công khai → cho qua
    if (to.meta.needLogin === false) {
        return next()
    }
    
    // 2. Lấy token từ localStorage
    const authorization = localStorage.getItem("accessToken") || ""
    
    // 3. Gọi API kiểm tra user
    const res = await api<UserResponse>({
        url: "/api/v1/public/auth/me",
        method: "GET",
        toast: false,
        authorization
    })
    
    // 4. Nếu 401 → Xóa token, redirect /login
    if (isApiError(res) && res.status === 401) {
        localStorage.removeItem("accessToken")
        return next("/login")
    }
    
    // 5. Nếu OK → Lưu user vào store
    if (res.data) {
        user().setUser(res.data)
    }
    
    // 6. Nếu đã login + vào page public (block=true) → redirect /app
    if (to.meta.block && authorization) {
        return next("/app/staff")
    }
    
    // 7. Cho qua
    next()
})
```

### 2.4 Diagram - Route Navigation Flow

```
User Click Link
     ↓
Route Change (beforeEach guard)
     ↓
Check meta.needLogin
     ├─→ false → Public Route → Check meta.block
     │                            ├─→ true + authorized → Redirect /app
     │                            └─→ false → Pass through
     │
     └─→ true → Protected Route → Check token
                                    ├─→ No token → Redirect /login
                                    └─→ Has token → Verify with API /me
                                                       ├─→ 401 → Clear token → Redirect /login
                                                       └─→ 200 → setUser() → Pass through
↓
afterEach (Start loading)
↓
Component Render
↓
afterEach (Stop loading)
```

### 2.5 Route Configuration - Next Steps

**Các route cần thêm vào `/app` children**:

```typescript
{
    path: "/app",
    component: () => import("@/layout/index.vue"),
    meta: { needLogin: true },  // ← Bổ sung metadata
    children: [
        // Authentication routes
        { path: "login", component: () => import("@/pages/Auth/Login.vue") },
        { path: "register", component: () => import("@/pages/Auth/Register.vue") },
        { path: "verify", component: () => import("@/pages/Auth/Verify.vue") },
        { path: "forgot-password", component: () => import("@/pages/Auth/ForgotPassword.vue") },
        { path: "reset-password", component: () => import("@/pages/Auth/ResetPassword.vue") },
        
        // Main features
        { path: "staff", component: () => import("@/pages/Staff.vue") },
        { path: "chat", component: () => import("@/pages/Chat.vue") },
        { path: "customer", component: () => import("@/pages/Customer.vue") },
        { path: "platforms", component: () => import("@/pages/Platforms.vue") },
        { path: "onboarding", component: () => import("@/pages/Onboarding.vue") }
    ]
}
```

---

## 3. API Layer - Controllers

### 3.1 Centralized API Wrapper

**File**: `/src/controllers/global.js`

**Mục đích**: Unified HTTP client với auto token injection, error handling, timezone detection

### 3.2 API Function Signature

```typescript
// Type Definition (global.d.ts)
interface ApiOptions {
    url: string                          // API endpoint
    data?: Record<string, unknown>       // Request body
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"  // HTTP method
    params?: Record<string, unknown>     // Query parameters
    toast?: boolean                      // Show error toast (default: true)
    toastOpt?: Record<string, unknown>   // Toast options
    signal?: AbortSignal | null          // Request cancellation
    authorization?: string               // Bearer token (auto from localStorage)
}

// Response Types
interface ApiErrorResponse {
    error: true
    message: string
    subcode: string
    is_cancel?: boolean
    status?: number
}

interface ApiSuccessResponse<T = unknown> {
    error?: false
    data?: T
    [key: string]: unknown  // Extra fields
}

type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse
```

### 3.3 Implementation Details

```typescript
export const api = ({
    url,
    data = {},
    method = "GET",
    params,
    toast: showToast = true,
    toastOpt = {},
    authorization = token || "",  // ← Auto inject token
    signal = null
}) => {
    return axios({
        // 1. Base URL từ environment
        url: host + url,  // host = "" (dev) hoặc "https://..." (prod)
        method,
        data: JSON.stringify(data),
        
        // 2. Headers
        headers: {
            "Content-Type": "application/json",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,  // ← Auto
            ...(authorization && { Authorization: authorization })  // ← Bearer token
        },
        
        // 3. Other options
        params,
        withCredentials: true,
        signal
    })
    
    // 4. Success: Return response data
    .then(res => {
        if (res.data.error && res.data.message) throw new Error(res.data.message)
        return res.data
    })
    
    // 5. Error: Handle + Toast
    .catch(e => {
        // Check cancellation
        if (signal && e.code === "ERR_CANCELED") {
            return { error: true, is_cancel: true }
        }
        
        // Extract error info
        let status = e?.response?.status || 0
        let message = e?.response?.data?.message || e?.message || "Lỗi không xác định"
        let subcode = e?.response?.data?.subcode || "unknown"
        
        // Show toast if enabled
        if (showToast) {
            toast.error(message, {
                description: toastOpt.description || undefined,
                ...toastOpt
            })
        }
        
        // Return error response
        return { error: true, message, subcode, status }
    })
}
```

### 3.4 Usage Examples

```typescript
import { api } from "@/controllers/global"

// GET request
const response = await api({
    url: "/api/v1/users",
    method: "GET"
})

// POST with data
const response = await api({
    url: "/api/v1/users",
    method: "POST",
    data: { user_name: "John", email: "john@example.com" }
})

// With custom options
const response = await api<UserResponse>({
    url: "/api/v1/auth/me",
    method: "GET",
    toast: false,  // Don't show error toast
    toastOpt: { description: "Custom error description" }
})

// Request cancellation
const controller = new AbortController()
const response = await api({
    url: "/api/v1/data",
    signal: controller.signal
})
controller.abort()  // Cancel request

// Type-safe response
if (response.error) {
    console.error(response.message)
    console.error(response.status)  // 401, 404, 500, etc
} else {
    console.log(response.data)
}
```

### 3.5 Auto Features

| Fitur | Mô tả | Config |
|-------|-------|--------|
| **Token Injection** | Tự động thêm `Authorization: Bearer <token>` | `localStorage.accessToken` |
| **Timezone Detection** | Gửi timezone của browser | `Intl.DateTimeFormat()` |
| **Error Toast** | Tự động show error notification | `toast: true` (default) |
| **Request Cancellation** | Support AbortController | `signal: controller.signal` |
| **Dev Mode Proxy** | CORS handling via Vite proxy | `host = ""` (dev) |

---

## 4. Data Flow Patterns

### 4.1 Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LOGIN FLOW                               │
└─────────────────────────────────────────────────────────────┘

1. User enters email/password → Home.vue component
                ↓
2. Component calls api({
       url: "/api/v1/public/auth/login",
       method: "POST",
       data: { email, password }
   })
                ↓
3. global.js (Axios wrapper):
   - Stringify data
   - Add headers (Content-Type, timezone)
   - POST request to backend
                ↓
4. Backend responds:
   { error: false, data: { token: "jwt_token" } }
   OR
   { error: true, message: "Invalid credentials", status: 401 }
                ↓
5. If success → Component stores token:
   localStorage.setItem("accessToken", response.data.token)
   → Redirect router.push("/app")
                ↓
6. Router navigation → beforeEach guard triggered:
   - Get token from localStorage
   - Call api({ url: "/api/v1/public/auth/me" })
   - If 401 → Clear token, redirect "/login"
   - If 200 → setUser() to store
                ↓
7. Store updated → All components can access:
   - user_store.getUser.userName
   - user_store.getUser.email
   - user_store.hasCompany
```

### 4.2 Data Fetch Pattern

```
Component mounted/user action
         ↓
Call api({ url: "/api/v1/users", method: "GET" })
         ↓
global.js:
├─ Add token from localStorage
├─ Add timezone header
└─ Execute Axios request
         ↓
Backend responds
         ↓
Handle response:
├─ Error:
│  ├─ 401 → localStorage.removeItem("accessToken")
│  ├─ 400 → Show toast with message
│  └─ 500 → Show generic error toast
│
└─ Success:
   ├─ Extract response.data
   ├─ Update local component state (if needed)
   ├─ Or update Pinia store (if global state)
   └─ Re-render component
```

### 4.3 Error Handling Strategy

```
Response from backend:
{
    error: true,
    message: "User not found",
    subcode: "USER_NOT_FOUND",
    status: 404
}
         ↓
api() catch block:
├─ Extract status, message, subcode
├─ Check if cancellation (ERR_CANCELED)
├─ If toast enabled → Show error notification
└─ Return error response object
         ↓
Component receives error:
const response = await api(...)
if (response.error) {
    // Handle specific errors
    if (response.status === 401) {
        // Unauthorized → Clear auth
    } else if (response.status === 422) {
        // Validation error → Show field errors
    } else {
        // Generic error → Already shown in toast
    }
}
```

---

## 5. Directory Structure & Files

```
src/
├── store/
│   ├── index.ts              # Pinia root initialization
│   └── user.ts               # User store module (441 bytes)
│       ├── State: { user: UserData | null }
│       ├── Actions: setUser(user)
│       └── Getters: getUser, hasCompany
│
├── router/
│   └── index.ts              # Vue Router config (556 bytes)
│       ├── Routes array
│       ├── Route guards (auth check)
│       └── Meta definitions
│
├── controllers/
│   ├── global.js             # API wrapper (1.5 KB)
│   │   ├── api() function
│   │   ├── Axios config
│   │   ├── Error handling
│   │   └── Token auto-inject
│   │
│   └── global.d.ts           # TypeScript definitions (580 bytes)
│       ├── ApiOptions interface
│       ├── ApiErrorResponse interface
│       └── ApiSuccessResponse interface
│
├── main.ts                   # App entry point (2.4 KB)
│   ├── Create Vue app
│   ├── Use router + Pinia
│   └── router.beforeEach guard (auth check)
│
├── common/
│   └── index.ts              # Utility functions (1.3 KB)
│       ├── formatCurrency()
│       ├── formatDate()
│       ├── formatNumber()
│       ├── image() helper
│       └── copy() to clipboard
│
└── layout/
    └── index.vue             # Main app layout (8 KB)
        ├── Navbar component
        ├── User dropdown
        ├── Theme toggle
        ├── RouterView slot
        └── Logout confirm dialog
```

---

## 6. Authentication & Security

### 6.1 Token Management

```
┌─────────────────────────────────────┐
│      Token Lifecycle                │
└─────────────────────────────────────┘

Login:
  POST /api/v1/public/auth/login
  → Backend returns { token: "jwt..." }
  → localStorage.setItem("accessToken", token)

Usage:
  Every API call auto-includes:
  Authorization: Bearer <token>

Expiry:
  - Server-side expiry: 24 hours
  - Route guard checks with /api/v1/public/auth/me
  - If 401 → Clear localStorage.accessToken
  - Redirect to /login

Logout:
  - localStorage.removeItem("accessToken")
  - router.push("/login")
```

### 6.2 Security Features

| Feature | Implementation | Status |
|---------|-----------------|--------|
| **HTTPS Only** | Dev: localhost:8309, Prod: HTTPS | ✅ |
| **JWT Bearer Token** | Auto-injected in Authorization header | ✅ |
| **XSS Protection** | Vue auto-escapes in templates | ✅ |
| **Input Validation** | Backend validation (frontend optional) | ✅ |
| **CORS** | Backend CORS enabled, withCredentials:true | ✅ |
| **Timezone Tracking** | All requests include timezone header | ✅ |
| **Session Timeout** | 24 hours (server-side) | ✅ |

---

## 7. State Management Patterns

### 7.1 Best Practices

```typescript
// ✅ GOOD: Use store for shared global state
import { user } from "@/store"
const user_store = user()
user_store.setUser(data)

// ✅ GOOD: Use local component state for UI state
const is_modal_open = ref(false)
const form_data = reactive({ name: '', email: '' })

// ✅ GOOD: Fetch data via api() function
const fetchUsers = async () => {
    const response = await api({ url: "/api/v1/users" })
    if (!response.error) {
        users.value = response.data
    }
}

// ❌ BAD: Store all state in Pinia (causes over-engineering)
// ❌ BAD: Directly mutate store state without actions
// ❌ BAD: Use localStorage for complex objects (prone to bugs)
```

### 7.2 Store Expansion Plan

**Current**: Only `user` store  
**Future stores needed**:

```typescript
// staff.ts - Staff management
export const staff = defineStore("staff", {
    state: () => ({
        employees: [],
        current_employee: null,
        total_count: 0
    }),
    actions: {
        async fetchStaff() { ... },
        async addStaff(data) { ... },
        async updateStaff(id, data) { ... },
        async deleteStaff(id) { ... }
    }
})

// chat.ts - Chat messages
export const chat = defineStore("chat", {
    state: () => ({
        messages: [],
        conversations: [],
        current_conversation: null
    }),
    actions: {
        async fetchMessages(conversationId) { ... },
        async sendMessage(data) { ... }
    }
})

// platform.ts - Connected channels
export const platform = defineStore("platform", {
    state: () => ({
        platforms: [],  // FB, Telegram, WhatsApp, Zalo
        connection_status: {}
    }),
    actions: {
        async connectPlatform(type) { ... },
        async disconnectPlatform(id) { ... }
    }
})
```

---

## 8. API Endpoints Reference

### 8.1 Authentication Endpoints

```
POST /api/v1/public/auth/login
├─ Request: { email, password }
└─ Response: { token: "jwt_token" }

POST /api/v1/public/auth/register
├─ Request: { email, password, user_name }
└─ Response: { user_id, token }

POST /api/v1/public/auth/verify
├─ Request: { email, otp_code }
└─ Response: { verified: true }

GET /api/v1/public/auth/me
├─ Headers: Authorization: Bearer <token>
└─ Response: { userName, email, company[] }

POST /api/v1/public/auth/forgot-password
├─ Request: { email }
└─ Response: { message: "OTP sent" }

POST /api/v1/public/auth/reset-password
├─ Request: { token, new_password }
└─ Response: { success: true }

POST /api/v1/public/auth/logout
├─ Headers: Authorization: Bearer <token>
└─ Response: { success: true }
```

### 8.2 Business Endpoints

```
GET /api/v1/staff
GET /api/v1/staff/:id
POST /api/v1/staff
PUT /api/v1/staff/:id
DELETE /api/v1/staff/:id

GET /api/v1/chat/messages
POST /api/v1/chat/messages
GET /api/v1/chat/conversations

GET /api/v1/customer
POST /api/v1/customer
GET /api/v1/customer/:id

GET /api/v1/platforms
POST /api/v1/platforms/connect
DELETE /api/v1/platforms/:id/disconnect
```

---

## 9. Debugging & Development Tips

### 9.1 Inspect Store State

```typescript
// Vue DevTools
// Open DevTools → Find "Pinia" tab → Select "user_store"

// Console
import { user } from "@/store"
const user_store = user()
console.log(user_store.$state)  // Raw state object
console.log(user_store.getUser)  // Via getter
```

### 9.2 Debug API Calls

```typescript
// Add logging in global.js
.then(res => {
    console.log("✅ API Response:", res)
    return res
})
.catch(e => {
    console.error("❌ API Error:", e)
    // ...
})

// Or in component
const response = await api({ url: "/api/v1/users" })
console.log("Response:", response)
if (response.error) {
    console.log("Status:", response.status)
    console.log("Message:", response.message)
}
```

### 9.3 Clear Auth State

```typescript
// Clear localStorage
localStorage.removeItem("accessToken")

// Clear store
import { user } from "@/store"
user().$reset()

// Clear both
localStorage.clear()
location.reload()
```

### 9.4 Test Route Guards

```typescript
// Manually trigger route
import { useRouter } from "vue-router"
const router = useRouter()
router.push("/protected-route")  // Triggers beforeEach guard
```

---

## 10. Performance & Optimization

### 10.1 Store Optimization

```typescript
// ✅ Good: Lazy load stores when needed
import { user } from "@/store"
const user_store = user()

// ✅ Good: Use getters for computed values
const { getUser, hasCompany } = user()

// ❌ Bad: Fetch all data on app init
// Instead: Fetch on-demand in components
```

### 10.2 API Call Optimization

```typescript
// ✅ Good: Request cancellation
const controller = new AbortController()
const response = await api({
    url: "/api/v1/users",
    signal: controller.signal
})

// ✅ Good: Disable toast for fast-check calls
const response = await api({
    url: "/api/v1/public/auth/me",
    toast: false
})

// ❌ Bad: Multiple simultaneous requests without batching
```

### 10.3 Router Performance

```typescript
// ✅ Good: Lazy load page components
{
    path: "/staff",
    component: () => import("@/pages/Staff.vue")
}

// ❌ Bad: Import all pages upfront
import StaffPage from "@/pages/Staff.vue"
```

---

## 11. Known Issues & Improvements

### 11.1 Current Limitations

| Issue | Impact | Solution |
|-------|--------|----------|
| Only 1 Store | Limited state management | Create staff, chat, platform stores |
| No Route Guards per route | Can't protect sub-routes | Add `meta.needLogin` to child routes |
| Toast on every error | UX noise | Selective toast (toast: false) |
| No Request Debouncing | Race conditions | Add debounce wrapper |
| No Offline Support | No working offline | Implement service worker |
| No Error Boundary | App crash on error | Add error boundary component |

### 11.2 Recommended Improvements

1. **Multi-Store Architecture**
   - Separate stores for staff, chat, platforms
   - Better code organization

2. **Enhanced Auth Guard**
   - Route-level permission checks
   - Role-based access control (RBAC)

3. **Caching Layer**
   - Cache API responses in Pinia
   - Invalidate on mutations

4. **Error Handling**
   - Global error boundary
   - Custom error pages (403, 404, 500)

5. **Request Management**
   - Debounce search/filter requests
   - Batch multiple API calls
   - Request queue system

---

## 12. Quick Reference

### 12.1 Store Quick API

```typescript
// Import
import { user } from "@/store"
const user_store = user()

// State
user_store.user                    // Direct access
user_store.$state                  // Raw state object

// Getters
user_store.getUser                 // Full user data
user_store.hasCompany              // Boolean check

// Actions
user_store.setUser(userData)       // Update user

// Reset
user_store.$reset()                // Reset to initial state

// Watch changes
import { watch } from "vue"
watch(
    () => user_store.getUser,
    (newUser) => console.log("User changed:", newUser)
)
```

### 12.2 Router Quick API

```typescript
// Import
import { useRouter } from "vue-router"
const router = useRouter()

// Navigation
router.push("/path")
router.push({ name: "routeName" })
router.go(-1)

// Current route
import { useRoute } from "vue-router"
const route = useRoute()
route.path                         // Current path
route.name                         // Current name
route.meta                         // Route metadata
route.params                       // Path parameters
route.query                        // Query parameters
```

### 12.3 API Quick API

```typescript
// Import
import { api } from "@/controllers/global"

// GET
const response = await api({
    url: "/api/v1/users",
    method: "GET"
})

// POST
const response = await api({
    url: "/api/v1/users",
    method: "POST",
    data: { name: "John", email: "john@example.com" }
})

// Type-safe
const response = await api<UserType>({
    url: "/api/v1/users",
    method: "GET"
})

// Check response
if (response.error) {
    console.log(response.message)
    console.log(response.status)
    console.log(response.subcode)
} else {
    console.log(response.data)
}
```

---

## 13. Related Documentation

- **System Architecture**: `/docs/system-architecture.md` - Overall architecture diagram
- **Code Standards**: `/docs/code-standards.md` - Naming conventions & patterns
- **Project Overview**: `/docs/project-overview-pdr.md` - Features & roadmap
- **Codebase Summary**: `/docs/codebase-summary.md` - File structure reference

---

**Version**: 1.0  
**Last Updated**: 2026-01-27  
**Author**: Development Team  
**Status**: ✅ Stable - Ready for reference & expansion
