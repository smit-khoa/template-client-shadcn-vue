import { test, expect } from "@playwright/test"
import { clearAuthState } from "../../fixtures/auth.fixture"

test.describe("Register", () => {
    test.beforeEach(async ({ page }) => {
        await clearAuthState(page)
        await page.goto("/register")
    })

    test("hiển thị form đăng ký", async ({ page }) => {
        await expect(page.getByPlaceholder("Nhập họ và tên")).toBeVisible()
        await expect(page.getByPlaceholder("Nhập email")).toBeVisible()
        await expect(page.getByPlaceholder("Nhập mật khẩu")).toBeVisible()
        await expect(page.getByPlaceholder("Nhập lại mật khẩu")).toBeVisible()
        await expect(page.getByRole("button", { name: "Đăng ký" })).toBeVisible()
    })

    test("validation - tất cả fields required", async ({ page }) => {
        await page.getByRole("button", { name: "Đăng ký" }).click()

        // Form không submit khi thiếu fields
        await expect(page).toHaveURL("/register")
    })

    test("validation - email format không hợp lệ", async ({ page }) => {
        await page.getByPlaceholder("Nhập họ và tên").fill("Test User")
        await page.getByPlaceholder("Nhập email").fill("invalid-email")
        await page.getByPlaceholder("Nhập mật khẩu").fill("Password123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("Password123")

        await page.getByRole("button", { name: "Đăng ký" }).click()

        // Email validation error
        await expect(page).toHaveURL("/register")
    })

    test("validation - password không khớp", async ({ page }) => {
        await page.getByPlaceholder("Nhập họ và tên").fill("Test User")
        await page.getByPlaceholder("Nhập email").fill("test@example.com")
        await page.getByPlaceholder("Nhập mật khẩu").fill("Password123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("DifferentPassword")

        await page.getByRole("button", { name: "Đăng ký" }).click()

        // Password mismatch error
        await expect(
            page.getByText(/không khớp|không trùng|mismatch/i)
        ).toBeVisible()
    })

    test("đăng ký thành công redirect đến verify", async ({ page }) => {
        const timestamp = Date.now()
        const email = `test+${timestamp}@example.com`

        await page.getByPlaceholder("Nhập họ và tên").fill("Test User")
        await page.getByPlaceholder("Nhập email").fill(email)
        await page.getByPlaceholder("Nhập mật khẩu").fill("Password123")
        await page.getByPlaceholder("Nhập lại mật khẩu").fill("Password123")

        await page.getByRole("button", { name: "Đăng ký" }).click()

        // Chờ redirect đến verify page
        await expect(page).toHaveURL(/verify/, { timeout: 15000 })
    })

    test("navigate đến trang đăng nhập", async ({ page }) => {
        await page.getByRole("link", { name: "Đăng nhập" }).click()
        await expect(page).toHaveURL("/login")
    })

    test("đăng ký với Google", async ({ page }) => {
        const google_button = page.getByRole("button", { name: /google/i })

        if (await google_button.isVisible()) {
            // Click Google button sẽ mở popup OAuth
            const popup_promise = page.waitForEvent("popup")
            await google_button.click()

            // Verify popup opened (có thể bị block bởi browser)
            const popup = await popup_promise.catch(() => null)
            if (popup) {
                expect(popup.url()).toContain("accounts.google.com")
            }
        }
    })
})
