import { test, expect } from "@playwright/test"

test.describe("Home Page - Register Landing", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate first, then clear auth state
        await page.goto("/")
        await page.evaluate(() => {
            localStorage.removeItem("accessToken")
        })
        // Reload to ensure clean state
        await page.reload()
    })

    test("hiển thị đúng UI elements", async ({ page }) => {
        // Logo
        await expect(page.getByAltText("SMIT Chat")).toBeVisible()

        // Title
        await expect(page.getByRole("heading", { name: /Đăng ký tài khoản SMIT Chat/i })).toBeVisible()

        // Subtitle
        await expect(page.getByText("Bạn đã có tài khoản?")).toBeVisible()
        await expect(page.getByText("Đăng nhập ngay")).toBeVisible()

        // Input fields - use exact: true for password fields
        await expect(page.getByPlaceholder("Họ và tên")).toBeVisible()
        await expect(page.getByPlaceholder("Email")).toBeVisible()
        await expect(page.getByPlaceholder("Mật khẩu", { exact: true })).toBeVisible()
        await expect(page.getByPlaceholder("Nhập lại mật khẩu")).toBeVisible()

        // Checkbox
        await expect(page.getByText("Ghi nhớ đăng nhập")).toBeVisible()

        // Forgot password link
        await expect(page.getByText("Quên mật khẩu?")).toBeVisible()

        // Register button
        await expect(page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" })).toBeVisible()

        // Divider
        await expect(page.getByText("Hoặc")).toBeVisible()

        // Google register button
        await expect(page.getByText("Đăng ký với Google")).toBeVisible()
    })

    test("hiển thị poster trên màn hình lớn", async ({ page }) => {
        // Set viewport to desktop
        await page.setViewportSize({ width: 1440, height: 900 })

        // Poster container should be visible (check by class)
        const poster = page.locator(".hidden.lg\\:block")
        await expect(poster).toBeVisible()
    })

    test("ẩn poster trên mobile", async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 812 })

        // Poster container should be hidden
        const poster = page.locator(".hidden.lg\\:block")
        await expect(poster).not.toBeVisible()
    })

    test("form đăng ký hoạt động đúng", async ({ page }) => {
        const name_input = page.getByPlaceholder("Họ và tên")
        const email_input = page.getByPlaceholder("Email")
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        const confirm_password_input = page.getByPlaceholder("Nhập lại mật khẩu")

        // Fill form
        await name_input.fill("Nguyen Van A")
        await email_input.fill("test@example.com")
        await password_input.fill("password123")
        await confirm_password_input.fill("password123")

        // Verify values
        await expect(name_input).toHaveValue("Nguyen Van A")
        await expect(email_input).toHaveValue("test@example.com")
        await expect(password_input).toHaveValue("password123")
        await expect(confirm_password_input).toHaveValue("password123")
    })

    test("hiển thị lỗi validation khi submit form trống", async ({ page }) => {
        // Click register without filling form
        await page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" }).click()

        // Error messages should appear
        await expect(page.getByText("Vui lòng nhập họ và tên")).toBeVisible()
    })

    test("hiển thị lỗi khi chỉ nhập họ tên", async ({ page }) => {
        await page.getByPlaceholder("Họ và tên").fill("Nguyen Van A")
        await page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" }).click()

        // Email error should appear
        await expect(page.getByText("Vui lòng nhập email")).toBeVisible()
    })

    test("hiển thị lỗi khi email không hợp lệ", async ({ page }) => {
        await page.getByPlaceholder("Họ và tên").fill("Nguyen Van A")
        await page.getByPlaceholder("Email").fill("invalid-email")
        await page.getByPlaceholder("Mật khẩu", { exact: true }).fill("password123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("password123")
        await page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" }).click()

        // Email error should appear
        await expect(page.getByText("Email không hợp lệ")).toBeVisible()
    })

    test("hiển thị lỗi khi mật khẩu quá ngắn", async ({ page }) => {
        await page.getByPlaceholder("Họ và tên").fill("Nguyen Van A")
        await page.getByPlaceholder("Email").fill("test@example.com")
        await page.getByPlaceholder("Mật khẩu", { exact: true }).fill("123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("123")
        await page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" }).click()

        // Password error should appear
        await expect(page.getByText("Mật khẩu phải có ít nhất 6 ký tự")).toBeVisible()
    })

    test("hiển thị lỗi khi mật khẩu không khớp", async ({ page }) => {
        await page.getByPlaceholder("Họ và tên").fill("Nguyen Van A")
        await page.getByPlaceholder("Email").fill("test@example.com")
        await page.getByPlaceholder("Mật khẩu", { exact: true }).fill("password123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("different123")
        await page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" }).click()

        // Confirm password error should appear
        await expect(page.getByText("Mật khẩu không khớp")).toBeVisible()
    })

    test("toggle hiển thị password", async ({ page }) => {
        const password_input = page.getByPlaceholder("Mật khẩu", { exact: true })
        await password_input.fill("test123")

        // Default type=password
        await expect(password_input).toHaveAttribute("type", "password")

        // Find and click the password toggle button
        const password_container = password_input.locator("..")
        await password_container.locator("button").click()

        // After click, type=text
        await expect(password_input).toHaveAttribute("type", "text")
    })

    test("checkbox ghi nhớ đăng nhập hoạt động", async ({ page }) => {
        // Find checkbox container
        const checkbox = page.getByText("Ghi nhớ đăng nhập")

        // Click checkbox
        await checkbox.click()

        // Verify checkbox is checked (via SVG change)
        const checkbox_container = checkbox.locator("..").locator("..")
        await expect(checkbox_container.locator("path[fill='#0cc096']")).toBeVisible()
    })

    test("navigate đến trang đăng nhập", async ({ page }) => {
        await page.getByText("Đăng nhập ngay").click()
        await expect(page).toHaveURL("/login")
    })

    test("navigate đến trang quên mật khẩu", async ({ page }) => {
        await page.getByText("Quên mật khẩu?").click()
        await expect(page).toHaveURL("/forgot-password")
    })

    test("responsive layout - mobile viewport", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })

        // Form should be visible
        await expect(page.getByRole("heading", { name: /Đăng ký tài khoản SMIT Chat/i })).toBeVisible()

        // All form elements visible - use exact: true for password
        await expect(page.getByPlaceholder("Họ và tên")).toBeVisible()
        await expect(page.getByPlaceholder("Email")).toBeVisible()
        await expect(page.getByPlaceholder("Mật khẩu", { exact: true })).toBeVisible()
        await expect(page.getByPlaceholder("Nhập lại mật khẩu")).toBeVisible()
        await expect(page.getByRole("button", { name: "Đăng ký tài khoản SMIT Chat" })).toBeVisible()

        // Poster hidden
        const poster = page.locator(".hidden.lg\\:block")
        await expect(poster).not.toBeVisible()
    })

    test("responsive layout - tablet viewport", async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 })

        // Form should be centered
        await expect(page.getByRole("heading", { name: /Đăng ký tài khoản SMIT Chat/i })).toBeVisible()

        // Poster hidden on tablet
        const poster = page.locator(".hidden.lg\\:block")
        await expect(poster).not.toBeVisible()
    })

    test("responsive layout - desktop viewport", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })

        // Both panels visible
        await expect(page.getByRole("heading", { name: /Đăng ký tài khoản SMIT Chat/i })).toBeVisible()

        // Poster visible
        const poster = page.locator(".hidden.lg\\:block")
        await expect(poster).toBeVisible()
    })
})
