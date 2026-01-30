# Documentation Management Workflow

## Mục đích

Workflow này định nghĩa quy trình tạo và cập nhật tài liệu dự án một cách nhất quán, tránh tạo files duplicate và đảm bảo structure chuẩn.

---

## 📋 7 Files Tài Liệu Chuẩn (BẮT BUỘC)

Mọi dự án PHẢI có **ĐÚNG 7 files** sau trong thư mục `docs/`:

| File | Mục đích | Cập nhật khi |
|------|----------|--------------|
| **project-overview-pdr.md** | Product Development Requirements - Tổng quan dự án | Khởi tạo + khi scope thay đổi |
| **code-standards.md** | Coding conventions, naming rules | Khởi tạo + khi có quy tắc mới |
| **codebase-summary.md** | Tổng quan codebase, file structure | Init + mỗi khi thêm module/feature mới |
| **design-guidelines.md** | UI/UX guidelines, component usage | Init + khi thêm components |
| **deployment-guide.md** | Deploy instructions, CI/CD | Init + khi thay đổi infra |
| **system-architecture.md** | System design, data flow, tech stack | Init + khi thêm services/layers |
| **project-roadmap.md** | Timeline, milestones, features | Init + sprint planning |

**⚠️ QUY TẮC QUAN TRỌNG:**
- **KHÔNG** tạo files ngoài 7 files này
- **KHÔNG** tạo files với SCREAMING_CASE (`BUSINESS_LOGIC_SUMMARY.md`)
- **KHÔNG** tạo files với timestamp (`REPORT_20260130.md`)
- **LUÔN** dùng `kebab-case` cho file names

---

## 🔧 Lệnh `/docs:init` - Khởi Tạo Docs Mới

**Khi nào dùng:**
- Dự án mới chưa có thư mục `docs/`
- Reset toàn bộ docs về trạng thái ban đầu

**Quy trình thực hiện:**

### Bước 1: Phân tích codebase

```bash
# Đọc project structure
tree -L 3 src/

# Đọc README.md, package.json
cat README.md package.json

# Phân tích tech stack
grep -r "import.*from" src/ | head -50
```

### Bước 2: Tạo 7 files với templates

#### 2.1. project-overview-pdr.md

```markdown
# Project Overview - [Project Name]

## 1. Product Vision

[Mô tả ngắn gọn vision của sản phẩm]

## 2. Core Features

- Feature 1
- Feature 2
- Feature 3

## 3. User Personas

- **Primary User**: [Mô tả]
- **Secondary User**: [Mô tả]

## 4. Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + Shadcn Vue
- **State Management**: Pinia
- **Routing**: Vue Router
- **API Client**: Axios

## 5. Development Roadmap

[Link tới project-roadmap.md]

## 6. Success Metrics

- Metric 1
- Metric 2
```

#### 2.2. code-standards.md

```markdown
# Code Standards

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | snake_case | user_name, total_count |
| Functions | camelCase | getUserById(), validateInput() |
| Classes | PascalCase | UserService, OrderController |
| Constants | SCREAMING_SNAKE_CASE | MAX_RETRIES, API_URL |

## File Structure

[Mô tả structure dựa trên src/ directory]

## Styling Rules

1. LUÔN dùng TailwindCSS classes
2. CHỈ dùng SCSS khi Tailwind không hỗ trợ
3. Dùng CSS Variables từ style.css

## Component Rules

1. Auto-detect và sử dụng components có sẵn
2. KHÔNG viết custom khi có component library
3. Import từ @/components/custom/ hoặc @/components/ui/
```

#### 2.3. codebase-summary.md

```markdown
# Codebase Summary

## Directory Structure

\`\`\`
src/
├── assets/         # Images, fonts, icons
├── components/     # Vue components
│   ├── ui/        # Shadcn base components
│   ├── custom/    # Custom wrappers
│   └── app/       # Feature components
├── pages/          # Route-level pages
├── layouts/        # Layout wrappers
├── store/          # Pinia stores
├── router/         # Vue Router config
├── controllers/    # API controllers
├── utils/          # Helper functions
└── main.ts         # Entry point
\`\`\`

## Key Modules

### 1. Components (`src/components/`)

[Liệt kê components quan trọng]

### 2. Pages (`src/pages/`)

[Liệt kê pages và routes]

### 3. State Management (`src/store/`)

[Liệt kê stores]

### 4. API Layer (`src/controllers/`)

[Mô tả API structure]
```

#### 2.4. design-guidelines.md

```markdown
# Design Guidelines

## Color System

[Liệt kê CSS Variables từ style.css]

## Typography

[Font sizes, weights, line heights]

## Component Library

### Available Components

[Table mapping UI patterns → components]

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
```

#### 2.5. deployment-guide.md

```markdown
# Deployment Guide

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Production Build

\`\`\`bash
npm run build
\`\`\`

## Deployment Options

1. Vercel
2. Netlify
3. Static Hosting (S3, Firebase)

## Environment Variables

[List environment variables]
```

#### 2.6. system-architecture.md

```markdown
# System Architecture

## Architecture Overview

[Diagram hoặc mô tả layers]

## Data Flow

[Mô tả luồng dữ liệu từ UI → API → State]

## State Management

[Pinia stores structure]

## API Layer

[API controllers, endpoints]

## Authentication Flow

[Auth flow diagram/description]
```

#### 2.7. project-roadmap.md

```markdown
# Project Roadmap

## Completed Features

- [x] Feature 1
- [x] Feature 2

## In Progress

- [ ] Feature 3
- [ ] Feature 4

## Planned

- [ ] Feature 5
- [ ] Feature 6

## Timeline

| Phase | Timeline | Features |
|-------|----------|----------|
| Phase 1 | Q1 2026 | Features 1-2 |
| Phase 2 | Q2 2026 | Features 3-4 |
```

### Bước 3: Xác nhận với user

Sau khi tạo 7 files, PHẢI thông báo:

```
✅ Đã tạo 7 files tài liệu chuẩn:
1. project-overview-pdr.md
2. code-standards.md
3. codebase-summary.md
4. design-guidelines.md
5. deployment-guide.md
6. system-architecture.md
7. project-roadmap.md

📂 Tất cả files trong: docs/
```

---

## 🔄 Lệnh `/docs:update` - Cập Nhật Docs

**Khi nào dùng:**
- Thêm feature/module mới
- Thay đổi architecture
- Update roadmap

**Quy trình thực hiện:**

### Bước 1: Phát hiện thay đổi

```bash
# Kiểm tra git changes
git diff --name-only HEAD~10

# Phân tích files mới
find src/ -type f -newer docs/codebase-summary.md
```

### Bước 2: Xác định files cần update

| Thay đổi | Files cần update |
|----------|------------------|
| Thêm component mới | `codebase-summary.md`, `design-guidelines.md` |
| Thêm API endpoint | `system-architecture.md`, `codebase-summary.md` |
| Thêm feature | `project-roadmap.md`, `codebase-summary.md` |
| Thay đổi deploy | `deployment-guide.md` |
| Thêm coding rule | `code-standards.md` |

### Bước 3: Update TỪNG FILE cụ thể

**⚠️ QUAN TRỌNG:**
- **KHÔNG** tạo file mới
- **LUÔN** edit file có sẵn
- **KHÔNG** tạo files với tên khác (BUSINESS_LOGIC_SUMMARY.md, etc.)

```bash
# ✅ ĐÚNG - Edit file có sẵn
# Sử dụng Edit tool để update nội dung

# ❌ SAI - Tạo file mới
# Write tool → tạo file mới
```

### Bước 4: Xác nhận với user

```
✅ Đã cập nhật 3 files:
- codebase-summary.md: Thêm LoginPage component
- design-guidelines.md: Thêm Button variants
- project-roadmap.md: Mark Feature X completed
```

---

## 🚫 Anti-Patterns (TUYỆT ĐỐI TRÁNH)

| ❌ SAI | ✅ ĐÚNG |
|--------|---------|
| Tạo `BUSINESS_LOGIC_SUMMARY.md` | Update `system-architecture.md` |
| Tạo `CODEBASE_ANALYSIS_INDEX.md` | Update `codebase-summary.md` |
| Tạo `DOCUMENTATION_UPDATE_REPORT_20260130.md` | Update existing files |
| Tạo `authentication-module.md` | Thêm section trong `system-architecture.md` |
| Tạo `src-directory-tree.txt` | Update `codebase-summary.md` |
| Tạo `INDEX.md` | KHÔNG CẦN - dùng README.md |

---

## 🔍 Cleanup Script (Phòng ngừa)

Tạo file `.claude/scripts/cleanup-docs.sh`:

```bash
#!/bin/bash
# Xóa files không chuẩn trong docs/

cd docs/ || exit

# Danh sách 7 files chuẩn
STANDARD_FILES=(
    "project-overview-pdr.md"
    "code-standards.md"
    "codebase-summary.md"
    "design-guidelines.md"
    "deployment-guide.md"
    "system-architecture.md"
    "project-roadmap.md"
)

# Xóa tất cả files .md NGOẠI TRỪ 7 files chuẩn
for file in *.md; do
    if [[ ! " ${STANDARD_FILES[@]} " =~ " ${file} " ]]; then
        echo "🗑️  Xóa: $file"
        rm -f "$file"
    fi
done

# Xóa các files non-markdown
rm -f *.txt *.json 2>/dev/null

echo "✅ Cleanup completed! Còn lại $(ls -1 *.md | wc -l) files chuẩn."
```

Chạy trước mỗi lần `/docs:update`:

```bash
bash .claude/scripts/cleanup-docs.sh && /docs:update
```

---

## 📝 Checklist

### Khi chạy `/docs:init`:
- [ ] Đọc README.md, package.json
- [ ] Phân tích src/ structure
- [ ] Tạo ĐÚNG 7 files (kebab-case)
- [ ] Điền nội dung dựa trên templates
- [ ] Xác nhận với user

### Khi chạy `/docs:update`:
- [ ] Phát hiện thay đổi (git diff, find)
- [ ] Xác định files cần update
- [ ] Edit files có sẵn (KHÔNG tạo mới)
- [ ] Xác nhận với user

### Sau mỗi lần update:
- [ ] Verify chỉ có 7 files trong docs/
- [ ] Tất cả files dùng kebab-case
- [ ] Không có files SCREAMING_CASE
- [ ] Không có files với timestamp

---

## 🎯 Example Workflow

### Scenario 1: Dự án mới

```bash
User: "Khởi tạo tài liệu cho dự án mới"

Claude:
1. Chạy /docs:init
2. Phân tích src/, README.md
3. Tạo 7 files với templates
4. Thông báo: "✅ Đã tạo 7 files tài liệu chuẩn"
```

### Scenario 2: Thêm feature mới

```bash
User: "Tôi vừa thêm ChatPage component và chat store"

Claude:
1. Chạy /docs:update
2. Phát hiện: ChatPage.vue, chat.ts (store)
3. Update:
   - codebase-summary.md (thêm ChatPage, chat store)
   - design-guidelines.md (nếu có UI mới)
   - project-roadmap.md (mark feature completed)
4. Thông báo: "✅ Đã cập nhật 3 files"
```

### Scenario 3: Cleanup định kỳ

```bash
User: "Cleanup docs"

Claude:
1. Chạy cleanup-docs.sh
2. Xóa files không chuẩn
3. Thông báo: "✅ Còn lại 7 files chuẩn"
```

---

## 🛡️ Enforcement Rules

**CRITICAL - MUST FOLLOW:**

1. **File Count Rule**: Docs PHẢI có ĐÚNG 7 files, không hơn không kém
2. **Naming Rule**: LUÔN dùng `kebab-case.md`, KHÔNG dùng SCREAMING_CASE
3. **No Timestamp Rule**: KHÔNG tạo files với timestamp/date
4. **Update Rule**: Khi update, EDIT file có sẵn, KHÔNG tạo file mới
5. **Cleanup Rule**: Xóa files không chuẩn TRƯỚC khi update

---

**Version**: 1.0
**Last Updated**: 2026-01-30
**Author**: SMIT Chat Team
