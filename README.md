# Vue 3 + TypeScript Template với Figma-to-Code Automation

> **Template production-ready với quy trình tự động chuyển đổi thiết kế Figma sang code Vue**

## 🎯 Tính năng chính

✅ **Figma-to-Code Automation** - Tự động convert design sang code với độ chính xác >95%
✅ **Vue 3 + TypeScript** - Modern framework với type safety
✅ **Tailwind CSS v4** - Utility-first CSS framework
✅ **Shadcn/Vue Components** - 141 components sẵn dùng
✅ **Dark Mode** - Light/dark theme với auto-detection
✅ **Testing Setup** - Vitest + Playwright đầy đủ
✅ **ClaudeKit Integration** - AI-powered development workflows

---

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Server sẽ chạy tại: https://localhost:8309 (HTTPS)

### 3. Sử dụng Figma-to-Code Automation

```bash
/design:figma <figma-url>
```

**Ví dụ:**
```bash
/design:figma https://figma.com/design/abc123/LoginPage?node-id=1-2
```

AI sẽ tự động:
1. Phân tích thiết kế Figma
2. Map components với library hiện có
3. Generate code Vue + Tailwind
4. Test visual similarity
5. Tự động fix nếu không khớp (max 3 lần)

⏱️ **Thời gian:** 5-10 phút

---

## 📚 Documentation

### Core Docs (trong `./docs/`)

- **[README.md](./docs/README.md)** - Documentation index
- **[figma-to-code-workflow.md](./docs/figma-to-code-workflow.md)** - Hướng dẫn chi tiết workflow tự động
- **[component-library.md](./docs/component-library.md)** - Catalog 141 components
- **[design-system.md](./docs/design-system.md)** - Design tokens & styling guide
- **[code-standards.md](./.claude/workflows/development-rules.md)** - Coding conventions

### Workflows (trong `./.claude/workflows/`)

- **[figma-to-code-automation.md](./.claude/workflows/figma-to-code-automation.md)** - Quy trình tự động 5 bước
- **[development-rules.md](./.claude/workflows/development-rules.md)** - Development standards

---

## 🎨 Figma-to-Code Automation

### Cách hoạt động

**Phase 1: Phân tích Figma**
- Extract design context từ Figma MCP
- Lấy screenshot thiết kế gốc
- Phân tích components và design tokens

**Phase 2: Component Mapping**
- Scan 141 components hiện có
- Tính similarity score
- Quyết định reuse vs create new

**Phase 3: Code Generation**
- Generate Vue SFC với TypeScript
- Apply Tailwind CSS classes
- Import components phù hợp

**Phase 4: Visual Testing**
- Capture screenshots (Playwright)
- So sánh với Figma design
- Tính similarity score

**Phase 5: Iteration**
- Nếu similarity < 95% → Auto fix
- Maximum 3 iterations
- Request human review nếu cần

### Success Metrics

✅ Visual similarity: >= 95%
✅ Component reuse rate: >= 80%
✅ First-pass success: >= 60%
⏱️ Total time: < 10 minutes

---

## 🛠️ Tech Stack

### Framework & Build
- **Vue 3.5** - Progressive JavaScript framework
- **TypeScript 5.9** - Static typing
- **Vite 7.2** - Fast build tool với HMR
- **Tailwind CSS 4.1** - Utility-first CSS

### UI Components
- **Shadcn/Vue** - Unstyled component library
- **Reka UI 2.6** - Headless UI primitives
- **Lucide Icons** - 94 icon library
- **Vue Sonner** - Toast notifications

### State & Routing
- **Pinia 3.0** - State management
- **Vue Router 4.6** - Client-side routing

### Testing
- **Vitest 4.0** - Unit testing
- **Playwright 1.58** - E2E testing
- **Vue Test Utils** - Component testing

### Development
- **ESLint + Prettier** - Code quality
- **TypeScript Strict Mode** - Full type safety
- **Figma MCP** - Figma integration

---

## 📂 Cấu trúc Project

```
.
├── .claude/
│   ├── workflows/              # AI workflows
│   │   ├── figma-to-code-automation.md
│   │   └── development-rules.md
│   └── skills/                 # ClaudeKit skills
│       └── design-figma.md
├── docs/                       # Documentation
│   ├── README.md
│   ├── figma-to-code-workflow.md
│   ├── component-library.md
│   └── design-system.md
├── src/
│   ├── pages/                  # Route pages
│   ├── components/
│   │   ├── ui/                # 21 Shadcn primitives
│   │   └── custom/            # 26 custom components
│   ├── composables/           # Vue composables
│   ├── store/                 # Pinia stores
│   ├── router/                # Vue Router
│   ├── controllers/           # API client
│   ├── assets/                # Static assets
│   └── __tests__/             # Test files
├── e2e/                       # Playwright E2E tests
├── CLAUDE.md                  # AI instructions
├── package.json
└── vite.config.ts
```

---

## 🎨 Component Library

### UI Components (21 folders)
- Button, Input, Checkbox, Switch
- Dialog, Dropdown, Drawer, Sheet
- Tabs, Accordion, Pagination
- Tooltip, Spinner, Skeleton
- và 8 components khác

### Custom Components (26 folders)
- **Button** - 7 variants, 5 sizes, loading, icons
- **Input** - Text, password, currency, icons
- **Table (LayoutTable)** - 4137 lines! Advanced data grid
- **Icon** - SVG sprite với gradient support
- **Checkbox, Switch, Dropdown, Toast**
- và 18 components khác

**Total:** 141 component files

📖 **Chi tiết:** [Component Library](./docs/component-library.md)

---

## 🎨 Design System

### Colors
- **Primary:** #269a85 (Teal)
- **Secondary:** #1e7b6a (Dark Teal)
- **Tertiary:** #2eb9a0 (Bright Teal)
- **Neutral:** #1a2229 (Dark)
- **Status:** Danger, Success, Warning, Info

### Typography
- **Font:** Inter (400, 500, 600, 700)
- **Scale:** H1-H6, Body, Caption

### Spacing
- **Grid:** 4px base unit
- **Scale:** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80...

### Dark Mode
- Auto-detection system preference
- Toggle via `useTheme()` composable
- Persistent in localStorage

📖 **Chi tiết:** [Design System](./docs/design-system.md)

---

## 🧪 Testing

### Unit Tests
```bash
npm run test            # Watch mode
npm run test:run        # Single run
npm run test:coverage   # With coverage
npm run test:ui         # Vitest UI
```

### E2E Tests
```bash
npm run test:e2e        # Run E2E tests
npm run test:e2e:ui     # Playwright UI
npm run test:e2e:headed # Browser visible
npm run test:e2e:debug  # Debug mode
```

---

## 📝 Coding Conventions

### Naming Standards
```typescript
// Variables - snake_case
const user_name = 'John'
const total_count = 100

// Functions - camelCase
function getUserById(id: number) {}
function calculateTotal() {}

// Classes - PascalCase
class UserService {}
interface ComponentProps {}

// Constants - SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3
const API_BASE_URL = 'https://api.example.com'
```

### Vue Component Pattern
```vue
<template>
  <div class="component">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const computed_value = computed(() => {
  return props.variant === 'primary' ? 'primary-class' : 'secondary-class'
})
</script>

<style scoped>
.component {
  @apply flex items-center gap-2;
}
</style>
```

📖 **Chi tiết:** [Development Rules](./.claude/workflows/development-rules.md)

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev       # Start dev server (HTTPS, port 8309)
```

### Production Build
```bash
npm run build     # TypeScript check + Vite build
npm run preview   # Preview production build
```

### Environment
- **Dev:** https://localhost:8309
- **Prod:** CloudFlare Workers proxy

---

## 🤖 ClaudeKit Skills

### Available Skills

#### `/design:figma <url>`
Tự động convert Figma design sang Vue code

**Example:**
```bash
/design:figma https://figma.com/design/abc123/Login?node-id=1-2
```

**Output:**
```
✅ Generated: src/pages/Login.vue
✅ Similarity: 97.8%
✅ Components: Button, Input, Checkbox
✅ Time: 6 minutes
```

#### `/docs:init`
Initialize documentation structure trong `./docs/`

#### `/docs:update`
Update documentation dựa trên code changes

---

## 📖 Hướng dẫn sử dụng

### 1. Nhận Figma Design từ Designer

Copy URL từ Figma (phải có node-id):
```
https://figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
```

### 2. Chạy Automation

```bash
/design:figma <figma-url>
```

### 3. Chờ AI xử lý (5-10 phút)

AI sẽ tự động:
- Analyze design
- Map components
- Generate code
- Test visual
- Auto fix if needed

### 4. Review & Test

```bash
npm run dev                # Start server
npm run test              # Run unit tests
npm run test:e2e          # Run E2E tests
```

### 5. Commit & Push

```bash
git add .
git commit -m "feat: implement Login page from Figma"
git push
```

---

## 🔧 Configuration

### Figma MCP Setup

Đảm bảo Figma MCP đã được cấu hình trong `.claude/settings.local.json`

```json
{
  "mcpServers": {
    "figma-remote-mcp": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server-figma-remote"]
    }
  }
}
```

### Tailwind Configuration

File: `tailwind.config.js` (Tailwind v4 uses CSS imports)

Design tokens được định nghĩa trong `src/style.css` as CSS variables.

---

## 📦 Copy quy trình sang Project khác

### Bước 1: Copy files cần thiết

```bash
# Copy ClaudeKit config
cp -r .claude/ <target-project>/.claude/

# Copy documentation
cp -r docs/ <target-project>/docs/

# Copy CLAUDE.md
cp CLAUDE.md <target-project>/CLAUDE.md
```

### Bước 2: Customize cho project mới

1. Update `CLAUDE.md` với tech stack mới
2. Update `docs/component-library.md` với components mới
3. Update `docs/design-system.md` với design tokens mới
4. Keep workflows in `.claude/workflows/` (universal)

### Bước 3: Test automation

```bash
cd <target-project>
/design:figma <test-figma-url>
```

✅ **Quy trình sẽ hoạt động ngay lập tức!**

---

## 💡 Tips & Best Practices

### Khi làm việc với Figma

1. **Đặt tên components rõ ràng** trong Figma
   - ✅ "Button/Primary"
   - ❌ "Frame 1"

2. **Sử dụng Auto Layout** cho spacing chính xác

3. **Tạo Component Variants** cho các states khác nhau

4. **Sử dụng Color/Text Styles** → AI sẽ extract thành CSS variables

### Khi develop

1. **Check existing components trước** khi tạo mới
2. **Follow naming conventions** nghiêm ngặt
3. **Use Tailwind classes** - không dùng inline styles
4. **TypeScript strict mode** - không dùng `any`
5. **Test sau mỗi feature** - đừng bỏ qua testing

---

## 🐛 Troubleshooting

### Figma URL không hoạt động

**Check:**
- URL có đúng format không?
- Có `node-id` parameter không?
- Figma MCP đã được config chưa?

### Visual similarity thấp (< 95%)

**Possible causes:**
- Figma design quá phức tạp
- Gradients không match Tailwind
- Custom fonts không khả dụng

**Solution:**
- Simplify Figma structure
- Use standard design tokens
- Check AI iteration report

### Component mapping sai

**Possible causes:**
- Component tên không rõ trong Figma
- Component mới hoàn toàn

**Solution:**
- Rename Figma components
- Pre-create components nếu cần

---

## 📞 Support

**Documentation:**
- [Figma Workflow](./docs/figma-to-code-workflow.md)
- [Component Library](./docs/component-library.md)
- [Design System](./docs/design-system.md)

**Issues:**
- Check AI error messages
- Review generated reports
- Consult documentation

---

## 📄 License

MIT License - Feel free to use for your projects

---

## 🎉 Happy Coding!

Với quy trình Figma-to-Code automation này, bạn có thể:
- ⚡ Tăng tốc development 5-10x
- 🎯 Đảm bảo visual accuracy >95%
- 🔄 Tái sử dụng components tối đa
- 🤖 Tự động hóa hoàn toàn từ design → code

**Let AI handle the boring stuff, you focus on building great products!** 🚀

---

**Version:** 1.0.0
**Last Updated:** 2026-01-30
**Maintained by:** AI automation system
