# Project Setup, Testing & Tooling Analysis

**Project:** SMIT Chat - Unified Messaging Platform  
**Date:** 2026-01-27  
**Tech Stack:** Vue 3.5 + TypeScript 5.9 + Vite 7.2 + Tailwind 4.1

---

## 🚀 Quick Summary

| Aspect | Status | Details |
|--------|--------|---------|
| **Build Tool** | ✅ Vite 7.2 | HTTPS dev (port 8309), API proxy to Cloudflare |
| **TypeScript** | ✅ Strict Mode | ES2020+ target, zero unused vars/imports |
| **Unit Testing** | ✅ 23 tests | Vitest + happy-dom, setup mocks included |
| **E2E Testing** | ⚠️ Config only | Playwright ready (no tests yet) |
| **Components** | ✅ 43+ | 21 UI base + 22 custom wrappers |
| **Documentation** | ✅ 10 files | Comprehensive guides & standards |
| **Code Quality** | ✅ ESLint | Flat config, warning-level rules |

---

## 📋 Table of Contents

1. [Build Configuration](#1-build-configuration)
2. [Testing Setup](#2-testing-setup)
3. [Dependencies](#3-dependencies)
4. [Project Structure](#4-project-structure)
5. [Development Workflow](#5-development-workflow)
6. [Key Insights](#6-key-insights)

---

## 1. Build Configuration

### Vite (vite.config.ts)

```typescript
// Port: 8309 (HTTPS with auto-generated self-signed cert)
// API Proxy: /api/* → https://cuts-desktops-dishes-abstract.trycloudflare.com
// Path Alias: @ → src/
// Plugins: Vue 3 SFC, Tailwind CSS v4, Auto HTTPS
```

**Key Features:**
- HTTPS by default (matches production)
- Hot Module Reload enabled
- API proxy for backend communication
- Port 8309 (custom, high enough to avoid conflicts)

### TypeScript Configuration

**tsconfig.app.json - Strict Mode Enabled:**
```
✅ strict: true
✅ noUnusedLocals: true
✅ noUnusedParameters: true
✅ noFallthroughCasesInSwitch: true
✅ noUncheckedSideEffectImports: true
✅ erasableSyntaxOnly: true
```

**Target:** ES2020+ (modern browsers only, no IE11)

**Path Alias:** 
```
@/* → src/*
```

### Build Scripts

```bash
npm run dev       # Start HTTPS dev server
npm run build     # Prod build + type checking (vue-tsc -b)
npm run preview   # Preview production build
```

---

## 2. Testing Setup

### Unit Testing (Vitest)

**Environment:** happy-dom (lightweight, fast)

**Test Files:** 23 test files in `src/__tests__/`
- **Components:** 19 test files (Button, Input, Checkbox, Dialog, etc)
- **Controllers:** API wrapper tests
- **Store:** Pinia state management tests
- **Composables:** Custom hook tests
- **Utilities:** Helper function tests

**Test Setup (src/__tests__/setup.ts):**
```typescript
✅ localStorage mock
✅ navigator.clipboard mock  
✅ image() function mock
✅ vue-sonner (toast) mock
✅ import.meta.env mock
✅ Console warning filters
✅ Auto cleanup between tests
```

**Test Scripts:**
```bash
npm run test              # Watch mode
npm run test:run         # Single run (CI)
npm run test:coverage    # Coverage report (v8)
npm run test:ui          # Interactive UI
```

### E2E Testing (Playwright)

**Status:** ⚠️ Config ready, no tests implemented yet

**Configuration:**
```
- Browsers: Chromium + iPhone 14
- Base URL: https://localhost:8309
- Retries: 2 in CI, 0 locally
- Screenshots: On failure
- Video: On failure
- Auto-start dev server: Yes
```

**Test Scripts:**
```bash
npm run test:e2e           # Headless, parallel
npm run test:e2e:headed    # Visible browser
npm run test:e2e:ui        # Interactive UI
npm run test:e2e:debug     # Step-through
```

---

## 3. Dependencies

### Runtime (15 packages)

| Package | Version | Purpose |
|---------|---------|---------|
| vue | ^3.5.24 | Framework |
| vue-router | ^4.6.4 | Routing |
| pinia | ^3.0.3 | State management |
| vite | ^7.2.4 | Build tool |
| tailwindcss | ^4.1.18 | CSS framework |
| axios | ^1.13.2 | HTTP client |
| lucide-vue-next | ^0.560.0 | Icons (560+) |
| reka-ui | ^2.6.1 | Headless UI |
| vue-sonner | ^2.0.2 | Toast notifications |

### Dev Dependencies (15 packages)

**Testing:**
- vitest (^4.0.16)
- @vue/test-utils (^2.4.6)
- @testing-library/vue (^8.1.0)
- @playwright/test (^1.58.0)
- happy-dom (^20.0.11)

**Build & Type:**
- typescript (~5.9.3)
- vue-tsc (^3.1.4)
- @vitejs/plugin-vue (^6.0.1)

**Styling:**
- sass-embedded (^1.96.0)
- tailwindcss v4

---

## 4. Project Structure

```
src/
├── pages/              # Route-level components
├── components/
│   ├── ui/            # Shadcn/UI base (21)
│   ├── custom/        # Custom wrappers (22)
│   ├── app/           # Feature components
│   └── shared/        # Utilities
├── store/             # Pinia stores
├── router/            # Vue Router
├── controllers/       # API wrappers
├── common/            # Utilities
├── assets/            # Images, SVG sprites
├── style.css          # Global styles + CSS vars
├── main.ts            # Entry point
└── App.vue            # Root component

e2e/
├── playwright.config.ts
├── tests/             # E2E tests (EMPTY)
└── .gitignore

src/__tests__/
├── setup.ts           # Global test config
├── components/        # 19 component tests
├── controllers/       # API tests
├── store/             # Store tests
└── common/            # Utility tests

docs/
├── codebase-summary.md
├── code-standards.md
├── project-overview-pdr.md
├── system-architecture.md
└── 6 more guides...
```

---

## 5. Development Workflow

### Setup
```bash
npm install
npm run dev
# Runs on https://localhost:8309
```

### Testing
```bash
# Unit tests
npm run test              # Watch
npm run test:run          # Single run
npm run test:coverage     # Coverage report
npm run test:ui           # Interactive UI

# E2E tests (when implemented)
npm run test:e2e:headed   # Visible browser
npm run test:e2e:debug    # Step-through
```

### Build
```bash
npm run build             # Type check + bundle
npm run preview           # Preview build
```

---

## 6. Key Insights

### ✅ Strengths

1. **Modern Stack**
   - Vue 3.5, Vite 7, TypeScript 5.9 (all latest)
   - HTTPS dev environment
   - Component architecture (4-layer system)

2. **Testing Infrastructure**
   - Vitest + Playwright configured
   - Global mocks & setup organized
   - 23 unit tests implemented
   - Ready for E2E testing

3. **Type Safety**
   - TypeScript strict mode enforced
   - Type checking in build pipeline
   - No unused variables/imports

4. **Documentation**
   - 10 comprehensive guides
   - Code standards defined
   - Architecture documented

### ⚠️ Gaps

1. **E2E Tests Missing**
   - Playwright config ready
   - No actual tests implemented
   - Need tests for critical flows (auth, onboarding)

2. **Test Coverage**
   - No CI automation for coverage reports
   - No visual regression testing
   - Coverage baseline not established

3. **Developer Experience**
   - No HMR status indicator
   - No auto-format on save setup
   - No bundle analysis

### 📋 Recommendations

**Immediate (Week 1):**
- Create E2E tests for login & onboarding flows
- Establish coverage baseline (aim for 70%+)
- Document test patterns in CLAUDE.md

**Short-term (Month 1):**
- Setup GitHub Actions for CI
- Add visual regression testing
- Create component storybook

**Long-term:**
- Performance monitoring (Lighthouse CI)
- Accessibility audits (automated)
- Bundle size budgets

---

## Critical Configuration Quick Reference

| Config | Value | Why |
|--------|-------|-----|
| Dev Port | 8309 | Uncommon, avoids conflicts |
| Dev HTTPS | Self-signed | Matches production |
| TypeScript Target | ES2020+ | Modern only, smaller bundle |
| Test Environment | happy-dom | Fast, lightweight |
| E2E Browsers | Desktop + Mobile | Full coverage |
| API Proxy | Cloudflare | Centralized backend |
| Strict Mode | ON | Zero accidental bugs |

---

## Files to Know

| File | Purpose | Key Info |
|------|---------|----------|
| `vite.config.ts` | Build config | Port 8309, HTTPS, API proxy |
| `tsconfig.app.json` | App types | Strict mode ON |
| `vitest.config.ts` | Unit test config | happy-dom, v8 coverage |
| `e2e/playwright.config.ts` | E2E config | Chromium + iPhone 14 |
| `src/__tests__/setup.ts` | Test setup | Global mocks, localStorage |
| `.claude/CLAUDE.md` | AI instructions | Workflows & conventions |
| `docs/` | 10 guides | Standards, architecture, etc |

---

**Last Updated:** 2026-01-27  
**Created by:** Codebase Scout  
**Status:** Documentation Complete ✅
