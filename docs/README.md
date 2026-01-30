# Documentation Index

> **Tài liệu hệ thống cho dự án Vue 3 + TypeScript với Figma-to-Code automation**

## 📚 Danh sách tài liệu

### Core Documentation

1. **[project-overview-pdr.md](./project-overview-pdr.md)**
   - Tổng quan dự án và Product Development Requirements
   - Tech stack và kiến trúc tổng thể
   - Features chính và roadmap

2. **[code-standards.md](./code-standards.md)**
   - Coding conventions và naming standards
   - TypeScript usage guidelines
   - Best practices

3. **[codebase-summary.md](./codebase-summary.md)**
   - Cấu trúc thư mục chi tiết
   - File organization
   - Module dependencies

4. **[design-system.md](./design-system.md)**
   - Design tokens (colors, typography, spacing)
   - Tailwind CSS configuration
   - Theme system (light/dark mode)

5. **[component-library.md](./component-library.md)**
   - Complete component catalog
   - Usage examples
   - Props and variants documentation

6. **[figma-to-code-workflow.md](./figma-to-code-workflow.md)**
   - Automated Figma conversion process
   - Visual testing protocols
   - Component mapping strategies

7. **[deployment-guide.md](./deployment-guide.md)**
   - Build and deployment instructions
   - Environment configuration
   - CI/CD setup

---

## 🎯 Quick Navigation

### For Developers
- Starting development → [codebase-summary.md](./codebase-summary.md)
- Writing code → [code-standards.md](./code-standards.md)
- Using components → [component-library.md](./component-library.md)

### For Designers
- Design system → [design-system.md](./design-system.md)
- Figma workflow → [figma-to-code-workflow.md](./figma-to-code-workflow.md)

### For DevOps
- Deployment → [deployment-guide.md](./deployment-guide.md)

---

## 🔄 Documentation Updates

Documentation is automatically updated via ClaudeKit commands:

```bash
# Initialize all documentation
/docs:init

# Update specific docs after code changes
/docs:update
```

**Important:** All documentation lives in `./docs/` folder. Do not create docs in other locations.

---

## 📖 How to Read Documentation

1. **Start with** [project-overview-pdr.md](./project-overview-pdr.md) to understand the project
2. **Read** [codebase-summary.md](./codebase-summary.md) for architecture overview
3. **Reference** specific docs as needed during development

---

## ✅ Documentation Standards

- **Language:** Vietnamese for content, English for code examples
- **Format:** Markdown with GFM (GitHub Flavored Markdown)
- **Code blocks:** Always specify language for syntax highlighting
- **Links:** Use relative paths for internal docs
- **Updates:** Keep docs in sync with code changes

---

**Last Updated:** 2026-01-30
**Maintained by:** AI with human oversight
