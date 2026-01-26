import { test, expect } from "@playwright/test"

test.describe("Home Page - Register Form", () => {
    // Skip trên mobile project để tránh duplicate
    test.skip(({ browserName }) => browserName !== "chromium", "Only run on chromium")

    test.beforeEach(async ({ page }) => {
        await page.goto("/")
        await page.waitForLoadState("networkidle")
    })

    // ===== LOGO & HEADER TESTS =====

    test("hiển thị logo SMIT Chat", async ({ page }) => {
        const logo = page.locator(".home-card img").first()
        await expect(logo).toBeVisible()
    })

    // ===== TITLE & SUBTITLE TESTS =====

    test("hiển thị tiêu đề 'Đăng ký tài khoản SMIT Chat!'", async ({ page }) => {
        await expect(page.getByRole("heading", { name: /Đăng ký tài khoản SMIT Chat/i })).toBeVisible()
    })

    test("hiển thị subtitle 'Bạn đã có tài khoản?'", async ({ page }) => {
        await expect(page.getByText(/Bạn đã có tài khoản\?/i)).toBeVisible()
    })

    test("hiển thị link 'Đăng nhập ngay'", async ({ page }) => {
        const login_link = page.getByText(/Đăng nhập ngay/i)
        await expect(login_link).toBeVisible()
    })

    // ===== INPUT FIELDS TESTS =====

    test("hiển thị input field 'Họ và tên'", async ({ page }) => {
        const full_name_input = page.getByPlaceholder(/Họ và tên/i)
        await expect(full_name_input).toBeVisible()
    })

    test("hiển thị input field 'Email'", async ({ page }) => {
        const email_input = page.getByPlaceholder(/Email/i)
        await expect(email_input).toBeVisible()
    })

    test("hiển thị input field 'Mật khẩu'", async ({ page }) => {
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        await expect(password_input).toBeVisible()
    })

    test("hiển thị input field 'Nhập lại mật khẩu'", async ({ page }) => {
        const confirm_password_input = page.getByPlaceholder(/Nhập lại mật khẩu/i)
        await expect(confirm_password_input).toBeVisible()
    })

    // ===== CHECKBOX & LINKS TESTS =====

    test("hiển thị checkbox 'Ghi nhớ đăng nhập'", async ({ page }) => {
        await expect(page.getByText(/Ghi nhớ đăng nhập/i)).toBeVisible()
    })

    test("hiển thị link 'Quên mật khẩu?'", async ({ page }) => {
        const forgot_password_link = page.getByText(/Quên mật khẩu\?/i)
        await expect(forgot_password_link).toBeVisible()
    })

    // ===== BUTTONS TESTS =====

    test("hiển thị button 'Đăng ký tài khoản SMIT Chat'", async ({ page }) => {
        const register_button = page.getByRole("button", { name: /Đăng ký tài khoản SMIT Chat/i })
        await expect(register_button).toBeVisible()
    })

    test("hiển thị divider 'Hoặc'", async ({ page }) => {
        await expect(page.getByText("Hoặc")).toBeVisible()
    })

    test("hiển thị button 'Đăng ký với Google'", async ({ page }) => {
        const google_button = page.getByRole("button", { name: /Đăng ký với Google/i })
        await expect(google_button).toBeVisible()
    })

    // ===== FORM INTERACTION TESTS =====

    test("có thể nhập vào input 'Họ và tên'", async ({ page }) => {
        const full_name_input = page.getByPlaceholder(/Họ và tên/i)
        await full_name_input.fill("Nguyen Van A")
        await expect(full_name_input).toHaveValue("Nguyen Van A")
    })

    test("có thể nhập vào input 'Email'", async ({ page }) => {
        const email_input = page.getByPlaceholder(/Email/i)
        await email_input.fill("test@example.com")
        await expect(email_input).toHaveValue("test@example.com")
    })

    test("có thể nhập vào input 'Mật khẩu'", async ({ page }) => {
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        await password_input.fill("password123")
        await expect(password_input).toHaveValue("password123")
    })

    test("có thể nhập vào input 'Nhập lại mật khẩu'", async ({ page }) => {
        const confirm_password_input = page.getByPlaceholder(/Nhập lại mật khẩu/i)
        await confirm_password_input.fill("password123")
        await expect(confirm_password_input).toHaveValue("password123")
    })

    test("có thể toggle checkbox 'Ghi nhớ đăng nhập'", async ({ page }) => {
        const checkbox_wrapper = page.locator("label").filter({ hasText: /Ghi nhớ đăng nhập/i })
        await checkbox_wrapper.click()
        // Checkbox should be checked
    })

    // ===== FORM VALIDATION TESTS =====

    test("hiển thị lỗi khi submit form trống", async ({ page }) => {
        const register_button = page.getByRole("button", { name: /Đăng ký tài khoản SMIT Chat/i })
        await register_button.click()

        // Should show error messages
        await expect(page.getByText(/Vui lòng nhập họ và tên/i)).toBeVisible()
    })

    test("hiển thị lỗi khi email không hợp lệ", async ({ page }) => {
        const full_name_input = page.getByPlaceholder(/Họ và tên/i)
        const email_input = page.getByPlaceholder(/Email/i)
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        const confirm_password_input = page.getByPlaceholder(/Nhập lại mật khẩu/i)

        await full_name_input.fill("Test User")
        // Dùng email có @ nhưng thiếu domain extension để bypass browser validation
        await email_input.fill("test@invalid")
        await password_input.fill("password123")
        await confirm_password_input.fill("password123")

        const register_button = page.getByRole("button", { name: /Đăng ký tài khoản SMIT Chat/i })
        await register_button.click()

        await expect(page.getByText(/Email không hợp lệ/i)).toBeVisible()
    })

    test("hiển thị lỗi khi mật khẩu quá ngắn", async ({ page }) => {
        const full_name_input = page.getByPlaceholder(/Họ và tên/i)
        const email_input = page.getByPlaceholder(/Email/i)
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        const confirm_password_input = page.getByPlaceholder(/Nhập lại mật khẩu/i)

        await full_name_input.fill("Test User")
        await email_input.fill("test@example.com")
        await password_input.fill("12345")
        await confirm_password_input.fill("12345")

        const register_button = page.getByRole("button", { name: /Đăng ký tài khoản SMIT Chat/i })
        await register_button.click()

        await expect(page.getByText(/Mật khẩu phải có ít nhất 6 ký tự/i)).toBeVisible()
    })

    test("hiển thị lỗi khi mật khẩu không khớp", async ({ page }) => {
        const full_name_input = page.getByPlaceholder(/Họ và tên/i)
        const email_input = page.getByPlaceholder(/Email/i)
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        const confirm_password_input = page.getByPlaceholder(/Nhập lại mật khẩu/i)

        await full_name_input.fill("Test User")
        await email_input.fill("test@example.com")
        await password_input.fill("password123")
        await confirm_password_input.fill("different456")

        const register_button = page.getByRole("button", { name: /Đăng ký tài khoản SMIT Chat/i })
        await register_button.click()

        await expect(page.getByText(/Mật khẩu không khớp/i)).toBeVisible()
    })

    // ===== NAVIGATION TESTS =====

    test("click 'Đăng nhập ngay' điều hướng tới trang login", async ({ page }) => {
        const login_link = page.getByText(/Đăng nhập ngay/i)
        await login_link.click()

        await expect(page).toHaveURL(/\/login/)
    })

    test("click 'Quên mật khẩu?' điều hướng tới trang forgot-password", async ({ page }) => {
        const forgot_password_link = page.getByText(/Quên mật khẩu\?/i)
        await forgot_password_link.click()

        await expect(page).toHaveURL(/\/forgot-password/)
    })

    // ===== POSTER TESTS =====

    test("hiển thị poster section trên desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })

        const poster = page.locator(".home-poster")
        await expect(poster).toBeVisible()
    })

    test("poster ẩn trên tablet", async ({ page }) => {
        // lg breakpoint là 1024px, nên dùng viewport nhỏ hơn
        await page.setViewportSize({ width: 900, height: 768 })

        const poster = page.locator(".home-poster")
        await expect(poster).not.toBeVisible()
    })

    test("poster ẩn trên mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })

        const poster = page.locator(".home-poster")
        await expect(poster).not.toBeVisible()
    })

    // ===== RESPONSIVE TESTS =====

    test("form responsive trên mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })

        const form_card = page.locator(".home-card")
        await expect(form_card).toBeVisible()

        // All inputs should still be visible
        await expect(page.getByPlaceholder(/Họ và tên/i)).toBeVisible()
        await expect(page.getByPlaceholder(/Email/i)).toBeVisible()
        await expect(page.getByPlaceholder("Mật khẩu", { exact: true })).toBeVisible()
        await expect(page.getByPlaceholder(/Nhập lại mật khẩu/i)).toBeVisible()
    })

    test("form responsive trên tablet", async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 })

        const form_card = page.locator(".home-card")
        await expect(form_card).toBeVisible()
    })

    // ===== ACCESSIBILITY TESTS =====

    test("heading có đúng hierarchy", async ({ page }) => {
        const h1 = page.getByRole("heading", { level: 1 })
        await expect(h1).toBeVisible()
    })

    test("form có accessible role", async ({ page }) => {
        const form = page.locator("form")
        await expect(form).toBeVisible()
    })

    test("buttons có accessible role", async ({ page }) => {
        const buttons = await page.getByRole("button").all()
        expect(buttons.length).toBeGreaterThanOrEqual(2) // Register + Google buttons
    })

    test("images có alt text", async ({ page }) => {
        const logo = page.locator(".home-card img").first()
        await expect(logo).toHaveAttribute("alt")
    })
})
