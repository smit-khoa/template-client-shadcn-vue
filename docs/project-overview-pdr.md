# Project Overview & Product Development Requirements

**Project Name:** template-client-shadcn-vue (smit-chat)
**Version:** 0.0.0
**Type:** Vue 3 Frontend Template
**Last Updated:** 2026-02-04

## Project Description

Template-client-shadcn-vue là một Vue 3 frontend template được xây dựng với TypeScript, TailwindCSS, và Shadcn-Vue components. Project này được thiết kế như một nền tảng có thể tái sử dụng cho các ứng dụng web hiện đại, với hỗ trợ đầy đủ cho theme switching, API integration, state management, và responsive design.

## Project Goals

1. Cung cấp một template Vue 3 hoàn chỉnh, có thể tái sử dụng cho các dự án mới
2. Thiết lập best practices cho cấu trúc project, naming conventions, và component architecture
3. Hỗ trợ cả development và production workflows với các công cụ moderni
4. Đảm bảo code quality thông qua automated testing (unit + e2e)
5. Cung cấp comprehensive documentation cho developers

## Target Audience

- Frontend developers sử dụng Vue 3 và TypeScript
- Teams muốn khởi động projects với pre-configured tooling
- Developers cần responsive UI components từ Shadcn-Vue
- Projects yêu cầu theme switching (dark/light mode)

## Core Features

### 1. Authentication & Authorization
- Route guards kiểm tra authentication token
- Automatic redirect đến login nếu token không hợp lệ (401 status)
- Token storage trong localStorage
- User state management thông qua Pinia store
- API endpoint: `GET /api/v1/public/auth/me`

### 2. Theme System
- Dark/Light mode switching
- CSS variables cho color system (teal-based palette)
- useTheme composable cho dễ dàng integration
- Theme state persistence

### 3. UI Components Library
- 40+ Shadcn-Vue components từ reka-ui
- Lucide icons integration
- Custom wrapped components (Button, Input, Table, etc.)
- Toast notifications via vue-sonner
- Responsive design với TailwindCSS 4.1

### 4. State Management
- Pinia 3.0 cho reactive state
- User store với company information
- Actions, getters, state pattern

### 5. API Integration
- Axios wrapper controller (`global.ts`)
- Centralized error handling
- Toast notifications cho errors
- Proxy configuration cho development

### 6. Testing Infrastructure
- Unit testing: Vitest 4.0.16 với happy-dom
- E2E testing: Playwright 1.58.0
- 4 device profiles: Desktop, Laptop HD, Mobile, Tablet
- Visual regression testing với pixelmatch
- Test coverage reporting

## Technical Requirements

### Framework & Language
- **Vue:** 3.5.24
- **TypeScript:** 5.9.3
- **Vite:** 7.2.4 (build tool)
- **Node:** ^18+ (recommended)

### Styling & UI
- **TailwindCSS:** 4.1.18
- **Shadcn-Vue (reka-ui):** 2.6.1
- **Lucide Icons:** 0.560.0
- **CSS Variables:** Custom color system

### State & Routing
- **Pinia:** 3.0.3 (state management)
- **Vue Router:** 4.6.4 (routing)
- **Axios:** 1.13.2 (HTTP client)

### Development Tools
- **ESLint:** Code quality
- **Prettier:** Code formatting
- **Vite SSL Plugin:** HTTPS support for development

### Testing
- **Vitest:** Unit testing
- **Playwright:** E2E testing
- **Pixelmatch:** Visual regression testing

## Feature Requirements Overview

### F1: Authentication Flow
**Description:** Users must authenticate before accessing protected routes
**Requirements:**
- Login page at `/` (public)
- Automatic token validation on route change
- Redirect to login on 401 error
- User data storage in Pinia

**Acceptance Criteria:**
- User redirected to login if token invalid
- Token persisted in localStorage
- User info accessible via store.user()

### F2: Theme Switching
**Description:** Application supports dark/light theme switching
**Requirements:**
- Theme toggle component
- CSS variables updated on theme change
- Theme preference persisted

**Acceptance Criteria:**
- Theme changes apply to entire application
- Theme persists across sessions
- useTheme composable available for components

### F3: Responsive Design
**Description:** Application works on all device sizes
**Requirements:**
- Mobile-first approach
- TailwindCSS breakpoints (sm, md, lg, xl)
- Tested on 4 device profiles

**Acceptance Criteria:**
- Passes Playwright visual regression tests
- Works on mobile (375px), tablet (768px), desktop (1024px)

### F4: API Integration
**Description:** Centralized HTTP client for all API calls
**Requirements:**
- Axios wrapper with error handling
- Authorization header support
- Proxy configuration for development

**Acceptance Criteria:**
- All API errors show toast notifications
- Failed requests return structured error objects
- Successful requests return typed responses

### F5: Component Library
**Description:** Comprehensive UI component library
**Requirements:**
- 40+ Shadcn-Vue base components
- Custom wrapped components for project-specific needs
- Icon components using Lucide

**Acceptance Criteria:**
- All components are TypeScript-typed
- Components accept standard props
- Components emit standard events

## Non-Functional Requirements

### Performance
- Page load time < 3 seconds
- Component render time < 100ms
- Bundle size < 500KB (gzipped)

### Code Quality
- ESLint passes all checks
- TypeScript strict mode enabled
- Test coverage > 80%

### Maintainability
- Consistent naming conventions (snake_case, camelCase, PascalCase)
- Clear file organization
- Comprehensive documentation

### Security
- No sensitive data in localStorage
- HTTPS enforced in production
- XSS protection via Vue's built-in escaping

## Success Metrics

1. **Development Velocity:** New projects can be scaffolded in < 10 minutes
2. **Code Quality:** 100% TypeScript coverage, ESLint pass rate 100%
3. **Test Coverage:** > 80% for critical paths
4. **Documentation:** All public APIs documented
5. **User Experience:** Smooth theme switching, <1s response times

## Dependencies & Constraints

### External Dependencies
- Cloudflare backend for API proxy
- Icon font (Inter) for typography

### Build Constraints
- Vite build must complete in < 2 minutes
- No breaking changes to Shadcn-Vue components

### Testing Constraints
- E2E tests must run on 4 device profiles
- Visual regression tests baseline required

## Deployment & Release

### Environments
- **Development:** Local dev server via `npm run dev`
- **Preview:** `npm run preview` (production build locally)
- **Production:** Built output in `/dist` folder

### Build Scripts
```bash
npm run build          # Build with vue-tsc type-checking
npm run preview        # Preview production build
npm run dev            # Development server
```

### Quality Checks Before Release
- `npm run test:run` must pass
- `npm run test:e2e` must pass
- `npm run build` must succeed
- ESLint checks passed

## Roadmap (Future)

- [ ] Internationalization (i18n) support
- [ ] Advanced filtering and search UI
- [ ] Real-time collaboration features
- [ ] Advanced data table with sorting/filtering
- [ ] Offline support with service workers
- [ ] Accessibility (WCAG 2.1 AA) audit
- [ ] Performance monitoring integration
- [ ] Design system documentation site

## References

- [Vue 3 Documentation](https://vuejs.org)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Shadcn-Vue Documentation](https://www.shadcn-vue.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Playwright Documentation](https://playwright.dev)
