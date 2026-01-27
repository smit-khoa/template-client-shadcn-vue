# SMIT Chat - Tổng Quan Dự Án & PDR

## 1. Vision & Mục Tiêu

SMIT Chat là một nền tảng **quản lý trò chuyện đa kênh** cho doanh nghiệp, cho phép:
- Quản lý conversation từ nhiều platform (Facebook, Telegram, WhatsApp, Zalo)
- Quản lý danh bạ khách hàng tập trung
- Lịch sử tin nhắn và analytics
- Multi-user collaboration với phân quyền nhân viên

**Mục tiêu:** Đơn giản hóa quản lý khách hàng và communication cho SME/StartUp

## 2. Core Features

### 2.1 Authentication (✅ Đã hoàn thành)
- **Đăng nhập/Đăng ký** (Email + Password)
- **Xác thực email** (OTP verification)
- **Google OAuth** (Social login)
- **Forgot/Reset Password** (Email recovery)
- **Token-based auth** (JWT/Bearer token)

### 2.2 Onboarding (✅ Đã hoàn thành)
**2 Bước setup:**
1. **Tạo công ty** - Nhập tên công ty, logo, timezone
2. **Thêm nhân viên** - Mời team member, gán role/permission

### 2.3 Staff Management (✅ Đã hoàn thành)
- Liệt kê danh sách nhân viên
- Thêm/xóa/cập nhật nhân viên
- Phân quyền (Admin, Manager, Staff)
- Xem chi tiết nhân viên

### 2.4 Platform Integration (✅ Đã hoàn thành)
Kết nối với 4 nền tảng:
- **Facebook** - Quản lý messages, comments
- **Telegram** - Bot integration
- **WhatsApp** - Business API
- **Zalo** - Official Account

Tính năng:
- View connection status
- Connect/Disconnect platforms
- Platform-specific settings
- Activity logs per platform

### 2.5 Customer Directory (✅ Đã hoàn thành)
- Liệt kê danh bạ khách hàng
- Tìm kiếm (search)
- Filter theo platform
- Grid/List view
- Chi tiết khách hàng + chat history
- Thêm/xóa/cập nhật contact

### 2.6 Chat History (✅ Đã hoàn thành)
- Lịch sử tất cả tin nhắn
- Lọc theo platform, người gửi, ngày
- Tìm kiếm conversation
- Export messages
- Xem context đầy đủ

## 3. User Personas

### 3.1 Business Owner / Manager
- Mục đích: Quản lý team, kết nối khách hàng
- Pain points: Đa kênh, khó quản lý
- Needs: Dashboard tổng hợp, phân quyền, analytics

### 3.2 Sales Staff
- Mục đích: Giao tiếp với khách hàng
- Pain points: Quên nhân dân, inbox lộn xộn
- Needs: Danh bạ tập trung, chat history, quick reply

### 3.3 Customer Service
- Mục đích: Support khách hàng
- Pain points: Đa kênh, manual notes
- Needs: Unified inbox, customer history, templates

## 4. Technical Requirements

### 4.1 Frontend (Vue 3 + TypeScript)
| Yêu Cầu | Thực Hiện |
|---------|----------|
| Framework | Vue 3.5.24 |
| Router | Vue Router 4.6.4 |
| State management | Pinia 3.0.3 |
| Build tool | Vite 7.2.4 |
| Language | TypeScript 5.9.3 |
| Styling | Tailwind CSS 4.1.18 |

### 4.2 UI/Component System
- **Shadcn/UI** - 21 base components (Dialog, Dropdown, Button, Input, Tabs, Checkbox, etc)
- **Reka UI** - Headless UI primitives (2.6.1)
- **Custom Components** - 26 wrapper/enhanced components (Input, Button, Search, Dropdown, Popup, Drawer, Confirm, Table, Tabs, Icon, Paging, Tooltip, Box, Loading, DatePicker, Filter, etc)
- **SVG Sprites** - 37 custom icons in sprites.svg
- **Lucide Icons** - SVG icons via lucide-vue-next
- **Vue Sonner** - Toast notifications (2.0.2)

### 4.3 API Integration
- **Axios** - HTTP client
- **Auto error handling** - Toast notifications
- **Token management** - localStorage + Bearer token
- **Timezone handling** - Auto-detect user timezone

### 4.4 Styling Requirements
- Mobile-first responsive design
- CSS Variables system
- Tailwind utility-first approach
- SCSS for complex styles
- Light/Dark mode ready

### 4.5 Performance Requirements
- Page load < 3s
- API response < 500ms
- Lazy loading for routes
- Component code-splitting
- Image optimization

### 4.6 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 12+, Android Chrome)

## 5. Non-Functional Requirements

### 5.1 Security
- HTTPS only (dev + prod)
- JWT token-based auth
- XSS protection (Vue auto-escape)
- CSRF tokens (server-side)
- Input validation + sanitization
- Secure password hashing (server)
- Session timeout 24 hours

### 5.2 Reliability
- 99.5% uptime target
- Automatic error recovery
- Toast error notifications
- Graceful degradation
- Offline detection

### 5.3 Maintainability
- TypeScript strict mode
- Component modularity (4-layer)
- Clear naming conventions
- Comprehensive documentation
- Automated testing (TBD)

### 5.4 Scalability
- Lazy-loaded routes
- Virtual scrolling for lists
- API pagination
- State normalization
- Caching strategy

## 6. Architecture

### 6.1 4-Layer Component Architecture
```
Layer 1: UI (Shadcn/UI)
    ↓
Layer 2: Custom (Wrappers + enhancements)
    ↓
Layer 3: App (Feature components)
    ↓
Layer 4: Pages (Route-level)
```

### 6.2 Data Flow
```
User Action
    ↓
Component (emit event)
    ↓
Store (Pinia action)
    ↓
API Call (axios + auto-toast)
    ↓
Response
    ↓
Update Store
    ↓
Re-render UI
```

### 6.3 Folder Structure
```
src/
├── components/
│   ├── ui/          # Layer 1: Shadcn/UI
│   ├── custom/      # Layer 2: Custom wrappers
│   ├── app/         # Layer 3: Feature components
│   └── shared/      # Utilities
├── pages/           # Layer 4: Route-level
├── store/           # Pinia stores
├── router/          # Route definitions
├── controllers/     # API wrapper
├── common/          # Utility functions
└── assets/          # Images, fonts, icons
```

## 7. Success Metrics

### 7.1 User Adoption
- 100+ businesses registered (month 1)
- 500+ active users (month 3)
- 10,000+ conversations (month 6)

### 7.2 Performance
- Page load time < 2s (P95)
- API latency < 300ms (P95)
- Error rate < 0.5%
- Uptime > 99.5%

### 7.3 Quality
- Test coverage > 80%
- Bug report < 2% of features
- User satisfaction > 4.5/5

### 7.4 Retention
- 30-day retention > 80%
- 90-day retention > 60%
- Churn rate < 5%

## 8. Roadmap & Milestones

### Phase 1: MVP (✅ Complete)
- Authentication
- Onboarding
- Staff management
- Platform integration
- Customer directory
- Chat history
- **Timeline:** Complete
- **Status:** Live

### Phase 2: Enhancements
- Advanced analytics
- Customer segmentation
- Automated responses/templates
- Team collaboration features
- Bulk operations
- **Timeline:** Q1 2026
- **Status:** Planning

### Phase 3: Scale
- Native mobile apps (React Native)
- Advanced AI features (NLP, sentiment)
- Workflow automation
- CRM integration
- **Timeline:** Q2-Q3 2026
- **Status:** Backlog

### Phase 4: Enterprise
- SSO (SAML/OAuth2)
- Custom branding
- Compliance (GDPR, HIPAA)
- SLA guarantees
- **Timeline:** Q4 2026+
- **Status:** Future

## 9. Acceptance Criteria

### 9.1 Authentication
- ✅ User can register with email
- ✅ Email verification works
- ✅ Login with credentials works
- ✅ Google OAuth integration works
- ✅ Password recovery works
- ✅ Logout clears token
- ✅ Session persists on refresh

### 9.2 Onboarding
- ✅ Company info form works
- ✅ Employee invitation works
- ✅ Multi-step process guided
- ✅ Validation error messages
- ✅ Can skip optional steps

### 9.3 Staff Management
- ✅ List all staff members
- ✅ Add new staff (invite)
- ✅ Update staff details
- ✅ Delete staff member
- ✅ Filter by role/status
- ✅ Search functionality

### 9.4 Platform Integration
- ✅ View platform status
- ✅ Connect new platform
- ✅ Disconnect platform
- ✅ Platform settings
- ✅ Sync message counts
- ✅ Error handling if connection fails

### 9.5 Customer Directory
- ✅ List all customers
- ✅ Search by name/phone/email
- ✅ Filter by platform
- ✅ Grid and list views
- ✅ View customer detail
- ✅ Edit customer info
- ✅ Delete customer

### 9.6 Chat History
- ✅ View all messages
- ✅ Filter by date range
- ✅ Filter by platform
- ✅ Search messages
- ✅ Pagination works
- ✅ View conversation context

## 10. Development Standards

### 10.1 Code Quality
- TypeScript strict mode
- ESLint rules followed
- Prettier formatting
- Component modularity
- Naming conventions:
  - Variables: `snake_case`
  - Functions: `camelCase`
  - Components: `PascalCase`
  - Constants: `SCREAMING_SNAKE_CASE`

### 10.2 Component Patterns
- Prefer composition over inheritance
- Use `<script setup>` syntax
- Prop validation with types
- Event naming: `@event-name`
- Slot usage for flexibility

### 10.3 Testing Strategy
- Unit tests for utilities
- Integration tests for API
- E2E tests for main flows
- Test coverage > 80%

### 10.4 Documentation
- Component Storybook (TBD)
- API documentation
- Deployment guide
- Troubleshooting guide

## 11. Constraints & Dependencies

### 11.1 External Dependencies
- **Cloudflare** - API backend proxy
- **Google OAuth** - Social login
- **Facebook Graph API** - Platform integration
- **Telegram Bot API** - Bot integration
- **WhatsApp Business API** - Message delivery
- **Zalo Official API** - Platform integration

### 11.2 Technical Constraints
- HTTPS only (security)
- Token expiry 24 hours
- API rate limiting (TBD)
- Max file upload 5MB
- Session idle timeout 30 min

### 11.3 Browser Constraints
- No IE11 support
- ES2020+ required
- WebAuthn support (for passkeys)

## 12. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| API latency | Medium | High | Caching + pagination |
| Token expiry | Medium | Medium | Auto-refresh + redirect |
| Platform API changes | Low | High | Abstraction layer |
| Data loss | Low | Critical | Backup + recovery |
| Security breach | Low | Critical | HTTPS + validation |

## 13. Success Definition

Project success khi:
1. ✅ MVP hoàn thành (Phase 1 done)
2. ✅ 100+ beta users
3. ✅ 99.5% uptime
4. ✅ < 0.5% error rate
5. ✅ < 300ms API latency (P95)
6. ✅ 4.5+ user satisfaction score

---

**Document Version:** 1.2
**Last Updated:** 2026-01-27
**Status:** Live (MVP Phase Complete)
**Owner:** SMIT Product Team
**Total Files:** 302 files
**Total Components:** 47 (26 Custom + 21 Shadcn/UI Base)
**E2E Test Coverage:** 9 test suites (Playwright)
**Architecture:** 4-layer component system
**Language:** Vue 3.5.24 + TypeScript 5.9.3 (strict mode)
