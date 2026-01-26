# Authentication Module - SMIT Chat

## Tổng quan

Module xử lý xác thực người dùng bao gồm đăng ký, đăng nhập, quên mật khẩu và OAuth với Google.

## Cấu trúc Files

```
src/components/app/authentication/
├── Login.vue           # Đăng nhập (email/password + Google)
├── Register.vue        # Đăng ký tài khoản mới
├── Verify.vue          # Xác thực OTP (dùng chung cho register & forgot-password)
├── ForgotPassword.vue  # Nhập email để reset password
├── ResetPassword.vue   # Đặt mật khẩu mới
└── GoogleAuth.vue      # Callback xử lý Google OAuth
```

---

## Luồng xử lý (Flows)

### Flow 1: Đăng ký tài khoản

```
Register.vue → send-otp API → Verify.vue → verify-otp API → Login.vue
```

| Bước | Component | API | Storage |
|------|-----------|-----|---------|
| 1 | Register.vue | `POST /send-otp` | Lưu `register_data` vào sessionStorage |
| 2 | Verify.vue | `POST /verify-otp` | Đọc `register_data` để resend |
| 3 | Success | - | Xóa `register_data`, redirect Login |

### Flow 2: Quên mật khẩu

```
ForgotPassword.vue → forgot-password API → Verify.vue → verify-otp-forgot-password API → ResetPassword.vue
```

| Bước | Component | API | Storage |
|------|-----------|-----|---------|
| 1 | ForgotPassword.vue | `POST /forgot-password` | Lưu `forgot_password_email` |
| 2 | Verify.vue | `POST /verify-otp-forgot-password` | Lưu `otp_forgot_password` |
| 3 | ResetPassword.vue | `POST /reset-password` | Đọc OTP từ storage |

### Flow 3: Google OAuth

```
Login/Register → Backend OAuth → GoogleAuth.vue → Home
```

| Bước | Action | Details |
|------|--------|---------|
| 1 | Click "Đăng nhập với Google" | Redirect đến `https://dev.smit.team:8701/api/v1/public/auth/google` |
| 2 | Backend xử lý OAuth | Google authentication |
| 3 | Backend redirect về | `/google-auth?token=xxx` |
| 4 | GoogleAuth.vue | Lưu token vào localStorage, redirect `/app/staff` |

---

## API Endpoints

Base URL: `/api/v1/public/auth/`

| Endpoint | Method | Body | Mô tả |
|----------|--------|------|-------|
| `/send-otp` | POST | `{ userName, email, password, confirmPassword }` | Gửi OTP đăng ký |
| `/verify-otp` | POST | `{ otp }` | Xác thực OTP đăng ký |
| `/forgot-password` | POST | `{ email }` | Gửi OTP reset password |
| `/verify-otp-forgot-password` | POST | `{ otp }` | Xác thực OTP reset |
| `/reset-password` | POST | `{ email, otp, newPassword }` | Đặt mật khẩu mới |
| `/google` | GET | - | Redirect đến Google OAuth |

---

## Storage

### sessionStorage

| Key | Dùng ở | Mục đích |
|-----|--------|----------|
| `register_data` | Register → Verify | Lưu form đăng ký để resend OTP |
| `forgot_password_email` | ForgotPassword → Verify | Lưu email để resend OTP |
| `otp_forgot_password` | Verify → ResetPassword | Lưu OTP đã verify |

### localStorage

| Key | Dùng ở | Mục đích |
|-----|--------|----------|
| `access_token` | GoogleAuth | JWT token sau OAuth |

---

## Chi tiết Components

### Register.vue

**State:**
```typescript
form: {
    userName: string
    email: string
    password: string
    confirmPassword: string
    remember_me: boolean
}
is_loading: boolean
is_form_valid: computed // true khi tất cả fields hợp lệ và password match
```

**Functions:**
- `handleRegister()` - Gọi API send-otp, lưu sessionStorage, redirect Verify
- `handleGoogleRegister()` - Redirect đến Google OAuth
- `navigateTo(name)` - Router navigation

### Verify.vue

**State:**
```typescript
otp_digits: string[] // ["", "", "", "", "", ""]
resend_countdown: number // 55 seconds
is_forgot_password_flow: computed // true nếu route.name === "forgot-password-verify"
```

**Features:**
- Auto-focus input đầu tiên
- Auto-move khi nhập số
- Backspace navigation
- Paste support (dán 6 số)
- Resend countdown 55 giây

**Functions:**
- `handleVerifyOtp()` - Gọi API verify, xử lý theo flow
- `handleResendOtp()` - Đọc sessionStorage, gọi lại API tương ứng
- `handleOtpInput/Keydown/Paste()` - Xử lý input OTP

### ForgotPassword.vue

**State:**
```typescript
email: string
is_loading: boolean
is_form_valid: computed // true khi email không rỗng
```

**Functions:**
- `handleSubmit()` - Gọi API forgot-password, lưu email, redirect Verify

### GoogleAuth.vue

**Xử lý onMounted:**
1. Lấy `token` từ query params
2. Nếu không có token → toast error, redirect login
3. Nếu có token → lưu localStorage, toast success, redirect `/app/staff`

---

## Cấu hình

### Vite Proxy (Development)

```typescript
// vite.config.ts
proxy: {
    "/api": {
        target: "https://ellis-varies-degree-warrant.trycloudflare.com",
        changeOrigin: true,
        secure: false
    }
}
```

### API Host

```javascript
// src/controllers/global.js
const is_dev = import.meta.env.DEV
const host = is_dev ? "" : "https://bolt-toe-genres-recommendations.trycloudflare.com"
```

- **Development**: Dùng empty string, Vite proxy xử lý
- **Production**: Dùng full URL

---

## Lưu ý quan trọng

### Security

1. **Password trong sessionStorage**: Hiện tại lưu password để resend OTP - cần cân nhắc chỉ lưu email
2. **Token validation**: GoogleAuth chưa verify token với backend trước khi lưu
3. **Token refresh**: Chưa có mechanism refresh token khi hết hạn

### UX

1. **OTP countdown**: 55 giây trước khi cho phép resend
2. **Toast notifications**: Tự động hiển thị khi API error
3. **Loading states**: Button disabled và hiển thị loading khi đang gọi API

### Coding Convention

- Variables: `snake_case` (ví dụ: `is_loading`, `otp_digits`)
- Functions: `camelCase` (ví dụ: `handleVerifyOtp`, `navigateTo`)
- Components: `PascalCase` (ví dụ: `GoogleAuth.vue`)
