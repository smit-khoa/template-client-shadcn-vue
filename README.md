# template-client-shadcn-vue (smit-chat)

A modern Vue 3 frontend template with TypeScript, TailwindCSS, Shadcn-Vue components, and comprehensive testing
infrastructure.

## Quick Start

### Prerequisites

-   Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd template-client-shadcn-vue

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `https://dev.smit.team:8309/`

## Available Scripts

### Development

```bash
npm run dev              # Start dev server with HMR
npm run preview         # Preview production build locally
```

### Build

```bash
npm run build           # Build for production (with type-checking)
```

### Testing

```bash
npm run test            # Run unit tests (watch mode)
npm run test:run        # Run unit tests (single run)
npm run test:coverage   # Generate coverage report
npm run test:ui         # Open visual test UI

npm run test:e2e        # Run E2E tests
npm run test:e2e:ui     # E2E tests in visual mode
npm run test:e2e:headed # E2E tests in headed browser
npm run test:e2e:debug  # E2E tests in debug mode
```

### Code Quality

```bash
npm run lint            # Run ESLint
```

## Project Overview

### What is This?

Template-client-shadcn-vue is a production-ready Vue 3 starter template designed for rapid development of modern web
applications. It combines best practices, comprehensive tooling, and reusable UI components.

### Key Features

-   **Vue 3 + TypeScript**: Type-safe reactive components
-   **40+ UI Components**: Pre-built Shadcn-Vue components
-   **Theme Switching**: Dark/light mode support out of the box
-   **State Management**: Pinia for reactive app state
-   **Authentication**: Route guards and token management
-   **API Integration**: Centralized Axios wrapper with error handling
-   **Testing**: Unit tests (Vitest) + E2E tests (Playwright)
-   **Responsive Design**: Mobile-first with TailwindCSS
-   **Icon System**: SVG sprites with Lucide icons
-   **Code Quality**: ESLint + Prettier enforcement

### Tech Stack

| Category        | Technology           | Version |
| --------------- | -------------------- | ------- |
| **Frontend**    | Vue                  | 3.5.24  |
| **Language**    | TypeScript           | 5.9.3   |
| **Build**       | Vite                 | 7.2.4   |
| **Styling**     | TailwindCSS          | 4.1.18  |
| **UI Library**  | Shadcn-Vue (reka-ui) | 2.6.1   |
| **State**       | Pinia                | 3.0.3   |
| **Routing**     | Vue Router           | 4.6.4   |
| **HTTP**        | Axios                | 1.13.2  |
| **Testing**     | Vitest               | 4.0.16  |
| **E2E Testing** | Playwright           | 1.58.0  |

## Project Structure

```
src/
├── pages/              # Route pages (Home, app/*, auth/*)
├── components/         # UI components (ui/, custom/*)
├── layout/             # Layout components
├── router/             # Vue Router configuration
├── store/              # Pinia state management
├── composables/        # Reusable Vue composables
├── controllers/        # API layer (Axios wrapper)
├── lib/                # Utility functions
├── common/             # Formatting utilities
└── assets/             # Fonts, icons, images
```

See [docs/codebase-summary.md](./docs/codebase-summary.md) for detailed structure explanation.

## Authentication

The app includes built-in authentication flow:

1. **Route Guard**: Validates token on every route change
2. **API Endpoint**: `GET /api/v1/public/auth/me`
3. **Token Storage**: localStorage with key `accessToken`
4. **Auto-Redirect**: Redirects to `/login` on 401 error
5. **User Store**: Pinia store holds user data

See [docs/project-overview-pdr.md](./docs/project-overview-pdr.md) for implementation details.

## Styling & Theme

### TailwindCSS

The project uses TailwindCSS 4.1 with utility-first CSS. All styling is done via Tailwind classes.

### Color System

```css
Primary (Teal):
--primary-base: #269a85
--secondary-base: #1e7b6a
--tertiary-base: #2eb9a0
```

### Theme Switching

Use the `useTheme()` composable:

```typescript
import { useTheme } from "@/composables/useTheme"

const { current_theme, toggleTheme } = useTheme()
```

## Components

### Shadcn-Vue Components

40+ base components available in `src/components/ui/`:

-   Button, Input, Dialog, Drawer, Tabs, etc.

### Custom Components

Project-specific wrapped components in `src/components/custom/`:

-   AppButton, AppInput, AppTable, etc.

All components are fully typed with TypeScript.

## API Integration

Use the centralized `api()` function from `controllers/global.ts`:

```typescript
import { api } from "@/controllers/global"

const response = await api<UserResponse>({
    url: "/api/v1/user",
    method: "GET",
    authorization: localStorage.getItem("accessToken")
})

if (!isApiError(response)) {
    // Handle success
    const data = response.data
}
```

Features:

-   Automatic error handling with toast notifications
-   Authorization header injection
-   Typed responses with TypeScript
-   Centralized error logging

## Testing

### Unit Testing (Vitest)

```typescript
// example.spec.ts
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Button from "@/components/Button.vue"

describe("Button", () => {
    it("renders", () => {
        const wrapper = mount(Button)
        expect(wrapper.exists()).toBe(true)
    })
})
```

### E2E Testing (Playwright)

```typescript
// auth.spec.ts
import { test, expect } from "@playwright/test"

test("login flow", async ({ page }) => {
    await page.goto("/")
    await page.fill("input[type=email]", "user@example.com")
    await page.click("button[type=submit]")
    await expect(page).toHaveURL("/app/staff")
})
```

## Code Standards

Strict naming conventions enforced:

-   **Variables**: `snake_case` (user_name, is_active)
-   **Functions**: `camelCase` (getUserById, handleClick)
-   **Components**: `PascalCase` (Button.vue, UserProfile.vue)
-   **Constants**: `SCREAMING_SNAKE_CASE` (MAX_RETRIES)

See [docs/code-standards.md](./docs/code-standards.md) for complete guidelines.

## Architecture

See [docs/system-architecture.md](./docs/system-architecture.md) for:

-   Data flow diagrams
-   Component interactions
-   State management patterns
-   API integration patterns
-   Testing architecture

## Documentation

Complete documentation available in `/docs`:

-   [project-overview-pdr.md](./docs/project-overview-pdr.md) - Project goals, features, requirements
-   [code-standards.md](./docs/code-standards.md) - Naming conventions, component patterns
-   [codebase-summary.md](./docs/codebase-summary.md) - Directory structure, module explanation
-   [system-architecture.md](./docs/system-architecture.md) - Architecture diagrams, data flow

## Development Workflow

1. **Create a branch** from `main` for your feature
2. **Make changes** following code standards
3. **Write tests** for new functionality
4. **Run quality checks**:
    ```bash
    npm run lint              # ESLint
    npm run test:run          # Unit tests
    npm run test:e2e          # E2E tests
    npm run build             # Build check
    ```
5. **Commit with descriptive message**
6. **Create pull request** to `main`

## Performance Targets

-   **Bundle size**: < 500KB (gzipped)
-   **Page load**: < 3 seconds
-   **Test coverage**: > 80%

## Browser Support

-   Chrome/Edge (latest)
-   Firefox (latest)
-   Safari (latest)

## Environment Variables

Create `.env.local` for development:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
```

## Troubleshooting

### Port already in use

```bash
# Use different port
npm run dev
```

### TypeScript errors

```bash
# Type check
npm run vue-tsc -b
```

### Tests failing

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run test
```

## Contributing

1. Follow code standards from [docs/code-standards.md](./docs/code-standards.md)
2. Add tests for new features
3. Update documentation if needed
4. Ensure all tests pass before submitting PR

## License

MIT

## Support

For issues or questions:

1. Check documentation in `/docs`
2. Review existing issues in git
3. Create a new issue with detailed description

## Next Steps

-   Start dev server: `npm run dev`
-   Read [project-overview-pdr.md](./docs/project-overview-pdr.md)
-   Review [code-standards.md](./docs/code-standards.md)
-   Explore example components
