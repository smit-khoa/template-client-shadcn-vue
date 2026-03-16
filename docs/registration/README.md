# Trang Đăng ký SMIT Chat

## Tổng quan

Trang đăng ký người dùng cho ứng dụng SMIT Chat với layout responsive 2 cột: form đăng ký glass-morphism bên trái và poster branding bên phải. Tích hợp validation Zod v4 đầy đủ với xử lý lỗi per-field, responsive design (ẩn poster trên mobile), và hỗ trợ đăng ký Google OAuth.

**Status:** ✓ Hoàn thành, pass visual test (97%)

**Figma Design:** https://www.figma.com/design/vxY9b9C93gOh0F8Q6L3hMH/Global-Chat-_-SMIT-Chat?node-id=2950-196166&m=dev

## Cấu trúc Files

| File | Mô tả |
|------|-------|
| `src/pages/register/index.vue` | Container chính - flex layout 2 cột (mobile: single, desktop: dual) |
| `src/pages/register/RegisterForm.vue` | Glass panel form: logo, heading, 4 inputs, checkbox, submit, divider, Google button |
| `src/pages/register/RegisterPoster.vue` | Poster cột phải: nền mint #57e3c5, mockup, decorative SVGs |
| `src/router/index.ts` | Route config: `/register` (needLogin: false, block: true) |
| `src/assets/images/register/` | Assets: logo.png, poster-background.jpg, poster-app-mockup.jpg, SVG decorations |
| `src/assets/images/register/index.ts` | Barrel export cho images (logoSmitChat, posterBg, etc.) |

## Components Sử dụng

| Component | Props/Cách dùng | Ghi chú |
|-----------|-----------------|--------|
| **Button** | `variant="primary"` \| `"secondary"` | Primary có gradient inline, icon="google" cho nút OAuth |
| **Button** | `size="lg"` | Chiều cao 40px, dùng cho main actions |
| **Input** | `type="text"` \| `"email"` \| `"password"` | v-model binding với form_data |
| **Input** | `:error="!!errors.field"` | Hiển thị border đỏ khi có error |
| **Input** | `:error-message="errors.field"` | Hiển thị pesan lỗi dưới input |
| **Checkbox** | `v-model="form_data.remember_me"` | Label: "Ghi nhớ đăng nhập" |

## Luồng hoạt động

```
1. Page load: Hiển thị form glass-morphism + poster (desktop only)
   - Form chiếm 50% width trên desktop, 100% trên mobile
   - Poster ẩn với class hidden lg:block

2. User input → Validation realtime (optional, hiện chưa implement)
   - Dùng Zod v4 schema định nghĩa ở component

3. Form submit (handleSubmit):
   a) Clear errors object
   b) Validate toàn form bằng registerSchema.safeParse()
   c) Nếu validation fail:
      - Iterate result.error.issues array
      - Map issue.path[0] → field name
      - Set errors[field] = issue.message
      - Return early (không POST)
   d) Nếu validation pass:
      - Set is_loading = true
      - POST payload tới /register endpoint
      - TODO: Gọi API qua global wrapper (auto toast)

4. Google signup (handleGoogleSignup):
   - TODO: OAuth flow - cần endpoint + credentials

5. Remember me checkbox:
   - TODO: Persist form_data.remember_me → localStorage
```

## Validation Schema (Zod v4)

```typescript
const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Vui lòng nhập họ và tên')
    .min(2, 'Họ và tên tối thiểu 2 ký tự'),
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không đúng định dạng'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
  confirm_password: z
    .string()
    .min(1, 'Vui lòng nhập lại mật khẩu'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Mật khẩu không khớp',
  path: ['confirm_password'],
})
```

## Assets

### Images & SVGs
| Asset | Path | Kích thước | Ghi chú |
|-------|------|-----------|--------|
| Logo SMIT Chat | `src/assets/images/register/logo-smit-chat.png` | 200x200px | Imported as `logoSmitChat` |
| Poster Background | `src/assets/images/register/poster-background.jpg` | 1200x920px | Nền mint #57e3c5 gradient |
| App Mockup | `src/assets/images/register/poster-app-mockup.jpg` | 600x800px | Screenshot app overlay |
| Ellipse 4 (phải) | `src/assets/images/register/ellipse-4.svg` | 320x320px | Decoration white circle |
| Ellipse 5 (trái) | `src/assets/images/register/ellipse-5.svg` | 240x240px | Decoration white circle |
| Union Shape | `src/assets/images/register/union-shape.svg` | 180x150px | Decoration shape |

### Icons
- **google**: Icon trong `src/assets/icons/sprites.svg` - Dùng với `<Button icon="google">` cho OAuth button

**Lưu ý:** Google icon hiện là single-color (đen). Design spec yêu cầu multicolor - cần asset mới từ designer.

## Styling Details

### Glass Morphism Panel (RegisterForm.vue)
```css
background: white/80 (80% opacity)
backdrop-filter: blur(xl) /* 20px */
border-radius: 1rem (16px)
shadow: inset glow + outer shadow
```

### Responsive Layout
```
Mobile (< 1024px):
- Single column layout
- Form: w-full, px-6, py-10
- Poster: hidden lg:block

Desktop (>= 1024px):
- Flex row with 2 equal columns (w-1/2 each)
- Container height: h-screen / max-h-920px
- Form: px-100, py-100
- Poster: visible, fills right column
```

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Poster BG | `#57e3c5` | RegisterPoster background |
| Primary Text | `#1a2229` | Heading |
| Secondary Text | `#495366` | Description, placeholders |
| Link Color | `#269a85` | "Đăng nhập ngay", "Quên mật khẩu?" |
| Border/Divider | `#e8edf2` | Input borders, divider line |
| Background | `#f0f4f8` | Page background |

### Link Override Pattern
```vue
<!-- HTML a tag cần override global CSS -->
<router-link to="/" :style="{ color: '#269a85' }">
  Đăng nhập ngay
</router-link>
```
Dùng `:style` binding vì Tailwind `text-*` color classes bị override global CSS.

## Form Data Structure

```typescript
const form_data = reactive({
  full_name: '',         // snake_case per CLAUDE.md
  email: '',
  password: '',
  confirm_password: '',
  remember_me: false,    // Checkbox, TODO: localStorage
})

const errors = reactive({
  full_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

const is_loading = ref(false)  // Loading state submit button
```

## Routes Configuration

```typescript
{
  path: "/register",
  component: () => import("@/pages/register/index.vue"),
  meta: {
    needLogin: false,  // Public route, người chưa login có thể access
    block: true        // Block nếu user đã authenticate (redirect home)
  }
}
```

## Ghi chú phát triển quan trọng

### Zod v4 API
- **KHÔNG dùng** `.errors` - Zod v4 dùng `.issues` (array)
- `safeParse()` return: `{ success: bool, data?: T, error?: ZodError }`
- Iterate `error.issues` và map `issue.path[0]` → field name
- `pick()` không available trên generic ZodType, chỉ ZodObject

### Validation Flow
1. User submit form
2. `clearErrors()` - reset errors object
3. `safeParse()` toàn form
4. Nếu fail: iterate issues, populate errors per field, return (không POST)
5. Nếu pass: set loading, call API, update state

### Button Styling
- **Primary variant**: Có inline `style.background = "var(--gradient)"` - Tailwind bg classes bị override. Cần dùng `:style` hoặc inline styles.
- **Secondary variant**: Dùng border + ghost background
- **Size lg**: height 40px (h-10)

### TODO Items (Cần implement)
- [ ] API integration - POST /register endpoint call (qua global wrapper)
- [ ] Google OAuth - implement flow & handle callback
- [ ] Remember me - persist checkbox state to localStorage
- [ ] Success handling - redirect page after successful registration
- [ ] Email verification - kiểm tra email đã tồn tại (server-side)
- [ ] Google icon - update asset to multicolor per design spec
- [ ] Real-time validation - optional feature

### Edge Cases
- **Password mismatch**: Validated by .refine() → error set trên confirm_password field
- **Email duplicate**: Server-side check khi POST
- **Network error**: Sẽ được handle auto-toast qua global API wrapper
- **Session timeout**: Chưa implement, cần session management

## Testing Checklist

- [x] Visual layout (form + poster, responsive)
- [x] Form validation (all 4 fields required, password min 8, email format)
- [x] Error display (per-field error messages)
- [x] Responsive (mobile single column, desktop 2 columns, poster hidden mobile)
- [x] Component imports (Button, Input, Checkbox working)
- [x] Route accessible (/register path works)
- [ ] API submit (needs backend)
- [ ] Google OAuth (needs setup)
- [ ] Remember me persistence (needs localStorage)
- [ ] Link styling (color override working)

## Dependencies

- `zod@^4.3.6` - Schema validation (Zod v4 API)
- `vue@^3.5.24` - Reactive state management
- `vue-router@^4.6.4` - Route navigation
- `@shadcn-vue/components` - Button, Input, Checkbox
- `axios` - API requests (via global wrapper, not direct)

## Related Docs

- [Code Standards](../code-standards.md) - Naming conventions
- [Custom Components Usage](../custom-components-usage.md) - Button, Input, Checkbox props
- [System Architecture](../system-architecture.md) - Global API wrapper, error handling
