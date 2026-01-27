# Business Logic Architecture - Quick Summary

**Tài liệu**: `/docs/business-logic-architecture.md` (26 KB, 13 chương)  
**Ngày**: 2026-01-27  
**Trạng thái**: ✅ Hoàn thành

---

## 🎯 Overview - 3 Layer Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    Vue 3 Application                          │
├───────────────────────────────────────────────────────────────┤
│
│  ┌─────────────────────────────────────────────────────────┐
│  │  LAYER 1: STATE MANAGEMENT (Pinia)                      │
│  │  ├─ user store (userName, email, company[])            │
│  │  ├─ actions: setUser()                                 │
│  │  └─ getters: getUser, hasCompany                       │
│  └─────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────┐
│  │  LAYER 2: ROUTING (Vue Router)                          │
│  │  ├─ "/" → Home (public, redirect if authorized)        │
│  │  ├─ "/app" → Main layout (protected)                   │
│  │  └─ beforeEach guard → Auth check                      │
│  └─────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────┐
│  │  LAYER 3: API (Axios wrapper)                           │
│  │  ├─ api() function with auto token injection           │
│  │  ├─ Error handling & toast notifications              │
│  │  └─ Timezone detection & request cancellation         │
│  └─────────────────────────────────────────────────────────┘
│
├───────────────────────────────────────────────────────────────┤
│              HTTP / REST API (Backend)                        │
└───────────────────────────────────────────────────────────────┘
```

---

## 📂 Directory Structure

```
src/
├── store/                   
│   ├── index.ts            # Pinia initialization
│   └── user.ts             # User store module (442 bytes)
│       ├── State: { user: UserData | null }
│       ├── Actions: setUser(userData)
│       └── Getters: getUser, hasCompany
│
├── router/
│   └── index.ts            # Route definitions (556 bytes)
│       ├── "/" → Home (public)
│       └── "/app" → Main (protected, nested)
│
├── controllers/
│   ├── global.js           # API wrapper (1.5 KB)
│   │   └── api({ url, method, data, ... })
│   └── global.d.ts         # TypeScript types
│
├── main.ts                 # App entry point
│   └── router.beforeEach   # Auth guard logic
│
├── common/index.ts         # Utilities
│   ├── formatCurrency()
│   ├── formatDate()
│   ├── image()
│   └── copy()
│
└── layout/index.vue        # Main layout
    ├── Navbar
    ├── User dropdown
    └── RouterView
```

---

## 1️⃣ Store (Pinia) Quick Reference

```typescript
// Import
import { user } from "@/store"
const user_store = user()

// Read state
console.log(user_store.getUser)      // UserData
console.log(user_store.hasCompany)   // boolean

// Update state via action
user_store.setUser({
    userName: "John Doe",
    email: "john@example.com",
    company: [{ userId: "1", companyId: "2", companyName: "Acme" }]
})

// Direct state access (not recommended)
user_store.user = null
user_store.$reset()
```

**Store State**:
```typescript
interface UserData {
    userName: string
    email: string
    company: {
        userId: string
        companyId: string
        companyName: string
    }[]
}
```

---

## 2️⃣ Router (Vue Router) Quick Reference

```typescript
// Route definitions
const routes = [
    {
        path: "/",
        component: () => import("@/pages/Home.vue"),
        meta: { needLogin: false, block: true }
    },
    {
        path: "/app",
        component: () => import("@/layout/index.vue"),
        children: []  // ← Add nested routes here
    }
]

// Navigation in component
import { useRouter } from "vue-router"
const router = useRouter()
router.push("/app")
router.go(-1)

// Current route info
import { useRoute } from "vue-router"
const route = useRoute()
console.log(route.path)    // "/app"
console.log(route.meta)    // { needLogin: true }
```

**Route Metadata**:
| Key | Type | Purpose |
|-----|------|---------|
| `needLogin` | boolean | Require authentication |
| `block` | boolean | Redirect authorized users |

**Auth Guard Flow** (in main.ts):
1. Check `meta.needLogin` → if false, pass through
2. Get token from `localStorage.accessToken`
3. Call `GET /api/v1/public/auth/me`
4. If 401 → Clear token, redirect to login
5. If 200 → `user_store.setUser(response.data)`
6. If `meta.block=true` + authorized → redirect `/app/staff`

---

## 3️⃣ API Wrapper (Controllers) Quick Reference

```typescript
// Import
import { api } from "@/controllers/global"

// GET request
const response = await api({
    url: "/api/v1/users",
    method: "GET"
})

// POST request
const response = await api({
    url: "/api/v1/users",
    method: "POST",
    data: { userName: "John", email: "john@example.com" }
})

// Advanced options
const response = await api<UserType>({
    url: "/api/v1/auth/me",
    method: "GET",
    toast: false,                              // Don't show error toast
    toastOpt: { description: "Custom error" }, // Custom toast options
    signal: controller.signal                  // Request cancellation
})

// Handle response
if (response.error) {
    console.log(response.message)      // Error message
    console.log(response.status)       // HTTP status: 401, 404, 500
    console.log(response.subcode)      // Error code: "UNAUTHORIZED", etc
} else {
    console.log(response.data)         // Success data
}
```

**Auto Features**:
- ✅ Token injection: `Authorization: Bearer <token>`
- ✅ Timezone detection: Auto-included in headers
- ✅ Error toast: Show error notification (unless `toast: false`)
- ✅ Request cancellation: Support AbortController
- ✅ Dev proxy: `/api/*` proxied to backend (dev mode)

**Response Structure**:
```typescript
// Success
{ error: false, data: { ... } }

// Error
{ error: true, message: "...", status: 401, subcode: "..." }
```

---

## 🔄 Data Flow Examples

### Authentication Flow
```
User Login (Home.vue)
    ↓
POST /api/v1/public/auth/login { email, password }
    ↓
Backend: { token: "jwt_..." }
    ↓
localStorage.setItem("accessToken", token)
    ↓
router.push("/app") → beforeEach guard triggered
    ↓
GET /api/v1/public/auth/me (auto token injection)
    ↓
Backend: { userName, email, company[] }
    ↓
user_store.setUser(data)
    ↓
Components access via user_store.getUser
```

### Data Fetch Pattern
```
Component mounted or user action
    ↓
const response = await api({ url: "/api/v1/users" })
    ↓
global.js (Axios wrapper):
  - Add Bearer token from localStorage
  - Add timezone header
  - Execute Axios request
    ↓
Backend responds with data or error
    ↓
Handle response:
  - Success: Extract response.data, update component/store
  - Error: Show toast (if enabled), log error details
    ↓
Component re-renders
```

---

## 🔐 Security

**Token Lifecycle**:
```
Login
  → POST /api/v1/public/auth/login
  → localStorage.setItem("accessToken", token)
        ↓
Usage
  → Every request includes: Authorization: Bearer <token>
        ↓
Expiry
  → Server-side: 24 hours
  → Client-side: Route guard checks /me endpoint
  → If 401: Clear localStorage, redirect to login
        ↓
Logout
  → localStorage.removeItem("accessToken")
  → router.push("/login")
```

**Security Features**:
- ✅ HTTPS only (dev + production)
- ✅ JWT Bearer token authentication
- ✅ XSS protection (Vue auto-escape)
- ✅ CORS enabled on backend
- ✅ Timezone tracking on all requests
- ✅ 24-hour session timeout

---

## 🎯 API Endpoints Reference

### Authentication
```
POST /api/v1/public/auth/login
  Request: { email, password }
  Response: { token: "jwt_..." }

GET /api/v1/public/auth/me
  Headers: Authorization: Bearer <token>
  Response: { userName, email, company[] }

POST /api/v1/public/auth/register
  Request: { email, password, user_name }
  Response: { user_id, token }

POST /api/v1/public/auth/verify
  Request: { email, otp_code }
  Response: { verified: true }

POST /api/v1/public/auth/forgot-password
  Request: { email }
  Response: { message: "OTP sent" }

POST /api/v1/public/auth/reset-password
  Request: { token, new_password }
  Response: { success: true }
```

### Business
```
GET /api/v1/staff              # List employees
POST /api/v1/staff             # Create employee
PUT /api/v1/staff/:id          # Update employee
DELETE /api/v1/staff/:id       # Delete employee

GET /api/v1/chat/messages      # List messages
POST /api/v1/chat/messages     # Send message
GET /api/v1/chat/conversations # List conversations

GET /api/v1/customer           # List customers
POST /api/v1/customer          # Create customer

GET /api/v1/platforms          # List connections
POST /api/v1/platforms/connect # Connect channel
DELETE /api/v1/platforms/:id   # Disconnect channel
```

---

## ⚠️ Current Limitations & Next Steps

### Issues
| Issue | Impact | Solution |
|-------|--------|----------|
| Only 1 store | Limited state management | Create staff, chat, platform stores |
| No per-route guards | Can't protect sub-routes | Add meta.needLogin to child routes |
| Toast on every error | UX noise | Use selective toast (toast: false) |
| No request debouncing | Race conditions | Add debounce wrapper |
| No offline support | App breaks offline | Implement service worker |
| No error boundaries | App crashes on error | Add error boundary component |

### Recommended Improvements
1. **Multi-Store Architecture** - Separate stores for staff, chat, platforms
2. **Enhanced Auth Guard** - Role-based access control (RBAC)
3. **Caching Layer** - Cache API responses, invalidate on mutations
4. **Error Handling** - Global error boundary, custom error pages
5. **Request Management** - Request queue, debouncing, batching

---

## 💡 Development Tips

### Inspect Store State
```typescript
// Vue DevTools → Pinia tab
// Or in console:
import { user } from "@/store"
const store = user()
console.log(store.$state)   // Raw state
console.log(store.getUser)  // Via getter
```

### Debug API Calls
```typescript
// In component
const response = await api({ url: "/api/v1/users" })
console.log("Response:", response)
if (response.error) {
    console.log("Status:", response.status)
    console.log("Message:", response.message)
}
```

### Clear Auth State
```typescript
// Single logout
localStorage.removeItem("accessToken")
router.push("/login")

// Complete reset
localStorage.clear()
user().$reset()
location.reload()
```

### Test Route Guards
```typescript
const router = useRouter()
router.push("/protected-route")  // Triggers beforeEach guard
```

---

## 📚 File Locations

| Layer | File | Size | Purpose |
|-------|------|------|---------|
| Store | `/src/store/user.ts` | 442 B | User state management |
| Router | `/src/router/index.ts` | 556 B | Route definitions |
| API | `/src/controllers/global.js` | 1.5 KB | HTTP client wrapper |
| API Types | `/src/controllers/global.d.ts` | 580 B | TypeScript definitions |
| Entry | `/src/main.ts` | 2.4 KB | App initialization + auth guard |
| Layout | `/src/layout/index.vue` | 8 KB | Main app layout |

---

## 📖 Related Documentation

- **Full Details**: [`/docs/business-logic-architecture.md`](./business-logic-architecture.md) - 26 KB, 13 chapters
- **System Architecture**: [`/docs/system-architecture.md`](./system-architecture.md)
- **Code Standards**: [`/docs/code-standards.md`](./code-standards.md)
- **Project Overview**: [`/docs/project-overview-pdr.md`](./project-overview-pdr.md)

---

## ✅ Checklist for Development

- [ ] Understand 3-layer architecture (Store, Router, API)
- [ ] Know how to use `user_store` for global state
- [ ] Familiar with route guards in `main.ts`
- [ ] Can write API calls using `api()` function
- [ ] Understand error handling (response.error check)
- [ ] Know token lifecycle and security features
- [ ] Can debug with Vue DevTools + console

---

**Version**: 1.0  
**Last Updated**: 2026-01-27  
**Status**: ✅ Ready for reference  
**Audience**: Developers working on SMIT Chat

