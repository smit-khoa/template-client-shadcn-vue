import { test, expect } from "@playwright/test"
import { TEST_USER, clearAuthState } from "../../fixtures/auth.fixture"

test.describe("Login", () => {
    test.beforeEach(async ({ page }) => {
        await clearAuthState(page)
        await page.goto("/login")
    })

    test("hiển thị form đăng nhập", async ({ page }) => {
        // Verify form elements
        await expect(page.getByPlaceholder("Nhập email")).toBeVisible()
        await expect(page.getByPlaceholder("Nhập mật khẩu")).toBeVisible()
        await expect(page.getByRole("button", { name: "Đăng nhập" })).toBeVisible()

        // Verify links
        await expect(page.getByText("Quên mật khẩu")).toBeVisible()
        await expect(page.getByText("Đăng ký")).toBeVisible()
    })

    test("đăng nhập thành công với email/password hợp lệ", async ({ page }) => {
        await page.getByPlaceholder("Nhập email").fill(TEST_USER.email)
        await page.getByPlaceholder("Nhập mật khẩu").fill(TEST_USER.password)
        await page.getByRole("button", { name: "Đăng nhập" }).click()

        // Verify redirect (có thể là /app/staff hoặc /onboarding)
        await expect(page).toHaveURL(/\/(app|onboarding)/)

        // Verify token được lưu
        const token = await page.evaluate(() => localStorage.getItem("accessToken"))
        expect(token).toBeTruthy()
    })

    test("hiển thị lỗi khi email trống", async ({ page }) => {
        await page.getByPlaceholder("Nhập mật khẩu").fill("password123")
        await page.getByRole("button", { name: "Đăng nhập" }).click()

        // Button vẫn enabled (form validation)
        await expect(page.getByPlaceholder("Nhập email")).toBeFocused()
    })

    test("hiển thị lỗi khi password trống", async ({ page }) => {
        await page.getByPlaceholder("Nhập email").fill(TEST_USER.email)
        await page.getByRole("button", { name: "Đăng nhập" }).click()

        // Form validation
        await expect(page.getByPlaceholder("Nhập mật khẩu")).toBeFocused()
    })

    test("hiển thị lỗi khi sai password", async ({ page }) => {
        await page.getByPlaceholder("Nhập email").fill(TEST_USER.email)
        await page.getByPlaceholder("Nhập mật khẩu").fill("wrong-password")
        await page.getByRole("button", { name: "Đăng nhập" }).click()

        // Chờ error message hoặc toast
        await expect(
            page.getByText(/sai|không đúng|invalid|error/i)
        ).toBeVisible({ timeout: 10000 })
    })

    test("navigate đến trang quên mật khẩu", async ({ page }) => {
        await page.getByText("Quên mật khẩu").click()
        await expect(page).toHaveURL("/forgot-password")
    })

    test("navigate đến trang đăng ký", async ({ page }) => {
        await page.getByRole("link", { name: "Đăng ký" }).click()
        await expect(page).toHaveURL("/register")
    })

    test("toggle hiển thị password", async ({ page }) => {
        const password_input = page.getByPlaceholder("Nhập mật khẩu")
        await password_input.fill("test123")

        // Mặc định type=password
        await expect(password_input).toHaveAttribute("type", "password")

        // Click toggle button (icon eye)
        await page.locator('button:has([data-icon="eye"])').click()

        // Sau khi click, type=text
        await expect(password_input).toHaveAttribute("type", "text")
    })
})
