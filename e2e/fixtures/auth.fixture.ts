import { test as base, expect, Page } from "@playwright/test"

// Test user credentials - thay đổi theo môi trường test của bạn
export const TEST_USER = {
    email: "test@example.com",
    password: "Test123456",
    name: "Test User"
}

// Extended test với login helper
export const test = base.extend<{ authenticatedPage: Page }>({
    authenticatedPage: async ({ page }, use) => {
        await loginAsTestUser(page)
        await use(page)
    }
})

// Login helper function
export async function loginAsTestUser(page: Page) {
    await page.goto("/login")

    await page.getByPlaceholder("Nhập email").fill(TEST_USER.email)
    await page.getByPlaceholder("Nhập mật khẩu").fill(TEST_USER.password)
    await page.getByRole("button", { name: "Đăng nhập" }).click()

    // Chờ redirect sau login
    await page.waitForURL(/\/(app|onboarding)/)
}

// Logout helper
export async function logout(page: Page) {
    // Click user dropdown
    await page.getByRole("button", { name: /avatar|user/i }).click()
    await page.getByRole("menuitem", { name: "Thoát" }).click()

    // Verify redirect to login
    await expect(page).toHaveURL("/login")
}

// Check if logged in
export async function isLoggedIn(page: Page): Promise<boolean> {
    const token = await page.evaluate(() => localStorage.getItem("accessToken"))
    return !!token
}

// Clear auth state
export async function clearAuthState(page: Page) {
    await page.evaluate(() => {
        localStorage.removeItem("accessToken")
    })
}

export { expect }
