# SMIT Chat - Unified Messaging Platform

Enterprise-grade unified messaging platform for businesses to manage customer conversations across multiple channels (Facebook, Telegram, WhatsApp, Zalo) in one centralized dashboard.

## Quick Start

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn package manager

### Installation

```bash
# Clone repository
git clone <repo-url>
cd smit-chat

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on `https://localhost:8309`

### Build for Production

```bash
npm run build      # Build with type checking
npm run preview    # Preview production build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Vue 3.5.24 + Vue Router 4.6.4 |
| **State Management** | Pinia 3.0.3 |
| **Build Tool** | Vite 7.2.4 |
| **Language** | TypeScript 5.9.3 |
| **Styling** | Tailwind CSS 4.1.18 + SCSS |
| **HTTP Client** | Axios 1.13.2 |
| **UI Components** | Shadcn/UI + Reka UI + Lucide Icons |
| **Notifications** | Vue Sonner 2.0.2 |
| **Icons** | SVG Sprites + Lucide Vue Next |

## Project Structure

```
smit-chat/
├── src/
│   ├── pages/             # Route-level components (7 pages)
│   ├── components/        # 4-layer component architecture
│   │   ├── ui/           # Shadcn/UI base (21 components)
│   │   ├── custom/       # Custom wrappers (26 components)
│   │   ├── app/          # Feature components
│   │   └── shared/       # Shared utilities
│   ├── store/            # Pinia state management (user store)
│   ├── router/           # Vue Router 4.6.4 + auth guards
│   ├── controllers/      # API wrapper (Axios) with auto-toast
│   ├── common/           # Utility functions (format, image, copy)
│   ├── composables/      # Vue composables (useSprite, useTheme)
│   ├── assets/           # Images, fonts (Inter), SVG sprites
│   ├── style.css         # Global styles + 50+ CSS variables
│   ├── main.ts           # App entry point + auth guard
│   └── App.vue           # Root component
│
├── docs/                 # Documentation
│   ├── project-overview-pdr.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── codebase-summary.md
│   ├── design-guidelines.md
│   └── project-roadmap.md
│
├── e2e/                  # E2E tests (Playwright)
├── vite.config.ts        # Vite 7.2.4 (HTTPS, port 8309)
├── tsconfig.json         # TypeScript 5.9.3 (strict mode)
├── package.json          # 30 dependencies
└── README.md             # This file
```

## Features

### Authentication (✅ Complete)
- Email/password login & registration
- Email verification (OTP)
- Google OAuth integration
- Password recovery & reset
- Persistent sessions with JWT tokens

### Onboarding (✅ Complete)
- 2-step company setup
- Company info configuration
- Employee invitation & management
- Role assignment

### Staff Management (✅ Complete)
- Employee list & directory
- Add, edit, delete employees
- Role-based permissions
- Team collaboration

### Platform Integration (✅ Complete)
- Facebook Messenger
- Telegram Bot
- WhatsApp Business
- Zalo Official Account
- Connection management & status

### Customer Directory (✅ Complete)
- Centralized customer database
- Search & filter capabilities
- Customer profiles & interaction history
- Grid & list view options
- Bulk operations

### Chat History (✅ Complete)
- Unified message timeline
- Cross-platform conversation view
- Search & filtering
- Export capabilities
- Analytics per platform

## Development Commands

```bash
# Development
npm run dev          # Start dev server (HTTPS, port 8309)
npm run build        # Build for production
npm run preview      # Preview production build

# Type Checking
npm run build        # Includes vue-tsc type checking
```

## Configuration

### Vite Config
- **Port:** 8309 (HTTPS enabled)
- **API Proxy:** `/api/*` → Backend (Cloudflare)
- **Hot Module Reload:** Enabled

### TypeScript
- **Strict Mode:** Enabled
- **Path Alias:** `@/*` → `src/*`
- **Module:** ESNext
- **Target:** ES2020+

### Environment
- **Dev Host:** https://localhost:8309
- **Dev API:** https://cart-composite-vat-towards.trycloudflare.com
- **Timezone:** Auto-detected from browser

## Naming Conventions

```
Variables    → snake_case      (user_name, is_active)
Functions    → camelCase       (getUserById, handleSubmit)
Components   → PascalCase      (UserProfile, StaffCard)
Constants    → SCREAMING_SNAKE_CASE (MAX_RETRIES, API_URL)
```

## Styling Guide

### Tailwind CSS (Primary)
Use Tailwind utility classes directly in templates:
```vue
<div class="w-full max-w-[638px] p-6 lg:p-10 bg-white rounded-lg">
  <h1 class="text-2xl font-bold text-neutral-100">Title</h1>
</div>
```

### CSS Variables (Color System)
```css
/* Primary palette */
--primary-base: #269a85
--primary-100 to 700: (shades)

/* Secondary, tertiary, grey palettes also available */
--destructive: #dc2626 (errors/delete)
--neutral-100: #1a2229 (main text)
```

### SCSS (Complex Styles Only)
Use scoped SCSS for animations, shadows, dynamic styles:
```vue
<style lang="scss" scoped>
.glass_card {
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.03);
}
</style>
```

## API Integration

All API calls use the centralized wrapper function:

```typescript
import { api } from "@/controllers/global"

// GET request
const users = await api({
  url: "/api/v1/users",
  method: "GET"
})

// POST with data
const response = await api({
  url: "/api/v1/users",
  method: "POST",
  data: { user_name: "John", email: "john@example.com" }
})

// Error handling
if (response.error) {
  console.error(response.message)
}
```

**Features:**
- Auto Bearer token injection
- Auto toast notifications on error
- Timezone header auto-detection
- Request cancellation support
- TypeScript type safety

## Authentication Flow

1. **Login:** POST `/api/v1/public/auth/login` → Receive token
2. **Storage:** Token saved to `localStorage.accessToken`
3. **Requests:** All API calls include `Authorization: Bearer <token>`
4. **Validation:** Route guard calls `/api/v1/public/auth/me` to verify token
5. **Expiry:** Token expires after 24 hours → Redirect to login

## Component System

### 4-Layer Architecture
```
Layer 1: UI Base (Shadcn/UI) - Dialog, Button, Input, etc
          ↓
Layer 2: Custom Wrappers - Enhanced Input, Button variants
          ↓
Layer 3: Feature Components - Login, StaffList, PlatformCard
          ↓
Layer 4: Page Components - Staff.vue, Platforms.vue
```

### Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| Input | `custom/input` | Text, email, password, currency inputs |
| Button | `custom/button` | Primary, secondary, danger buttons |
| Popup | `custom/popup` | Modal dialogs |
| Drawer | `custom/drawer` | Side panels |
| Table | `custom/table` | Data tables |
| Search | `custom/search` | Search input with debounce |
| Icon | `custom/icon` | SVG icon rendering |
| Tabs | `custom/tabs` | Tab navigation |

## State Management (Pinia)

### Current Store
- **user:** User info (userName, email)

### Store Usage
```typescript
import { user } from "@/store"

const user_store = user()
user_store.setUser({ userName: "John", email: "john@example.com" })
```

## Utilities

### Common Functions
```typescript
import { formatCurrency, formatDate, formatNumber, image, copy } from "@/common"

formatCurrency(1000000)        // 1.000.000₫
formatDate({ date: new Date() })  // 03/01/2026
formatNumber(1000000)          // 1.000.000
image("logo.svg")              // Load image from assets
copy("text")                   // Copy to clipboard
```

## Documentation

Comprehensive documentation available in `/docs`:

- **project-overview-pdr.md** - Project vision, features, requirements, roadmap
- **code-standards.md** - Naming conventions, component patterns, styling rules
- **system-architecture.md** - Data flow, API design, component hierarchy
- **codebase-summary.md** - Quick reference for codebase structure

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 12+, Android Chrome)
- **Not supported:** IE11

## Performance

- **Page Load:** < 3 seconds
- **API Latency:** < 500ms (P95)
- **Error Rate:** < 0.5%
- **Uptime:** 99.5%

## Security

- HTTPS only (development & production)
- JWT bearer token authentication
- XSS protection (Vue auto-escape)
- Input validation & sanitization
- Secure password hashing (server-side)
- CSRF tokens (server-side)
- Session timeout: 24 hours

## Troubleshooting

### HTTPS Certificate Error
```bash
# Dev server uses self-signed certificates
# Safe to click "Proceed" in browser security warning
```

### API Proxy Not Working
- Check vite.config.ts proxy settings
- Verify backend URL in global.js
- Ensure CORS enabled on backend

### TypeScript Errors
```bash
npm run build  # Full type checking
# Fix any type errors before deploying
```

## Contributing

### Code Style
- Follow naming conventions (see above)
- Use TypeScript strict mode
- Write scoped, modular components
- Add documentation comments

### Git Workflow
```bash
git checkout -b feat/feature-name
# Make changes
git add .
git commit -m "feat: description"
git push -u origin feat/feature-name
# Create pull request
```

## Related Projects

- **Backend:** Cloudflare Workers + D1 Database
- **Admin Dashboard:** [SMIT Dashboard]
- **Mobile Apps:** [React Native/Flutter - TBD]

## Support & Contact

- **Issues:** GitHub Issues
- **Documentation:** `/docs` folder
- **Email:** support@smit.io

## License

Proprietary - All rights reserved

---

**Version:** 0.0.0 (MVP Phase Complete)
**Status:** Production Ready
**Last Updated:** 2026-01-27
**Tech Lead:** Development Team

## Quick Reference

- **Component Count:** 26 Custom + 21 Shadcn/UI Base = 47 total
- **TypeScript Files:** ~56 files
- **E2E Tests:** 9 test suites (Playwright)
- **Development:** HTTPS auto-enabled, port 8309
- **Documentation:** `/docs` folder with comprehensive guides
- **Last Updated:** 2026-01-27
