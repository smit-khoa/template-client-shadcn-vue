import { test, expect } from "@playwright/test"
import { loginAsTestUser, clearAuthState, TEST_USER } from "../../fixtures/auth.fixture"

test.describe("Route Guards", () => {
    test.describe("Chưa đăng nhập", () => {
        test.beforeEach(async ({ page }) => {
            await clearAuthState(page)
        })

        test("redirect đến /login khi truy cập /app/staff", async ({ page }) => {
            await page.goto("/app/staff")
            await expect(page).toHaveURL("/login")
        })

        test("redirect đến /login khi truy cập /app/chat", async ({ page }) => {
            await page.goto("/app/chat")
            await expect(page).toHaveURL("/login")
        })

        test("redirect đến /login khi truy cập /app/platforms", async ({ page }) => {
            await page.goto("/app/platforms")
            await expect(page).toHaveURL("/login")
        })

        test("redirect đến /login khi truy cập /app/customer", async ({ page }) => {
            await page.goto("/app/customer")
            await expect(page).toHaveURL("/login")
        })

        test("redirect đến /login khi truy cập /onboarding", async ({ page }) => {
            await page.goto("/onboarding")
            await expect(page).toHaveURL("/login")
        })

        test("cho phép truy cập /login", async ({ page }) => {
            await page.goto("/login")
            await expect(page).toHaveURL("/login")
        })

        test("cho phép truy cập /register", async ({ page }) => {
            await page.goto("/register")
            await expect(page).toHaveURL("/register")
        })

        test("cho phép truy cập /forgot-password", async ({ page }) => {
            await page.goto("/forgot-password")
            await expect(page).toHaveURL("/forgot-password")
        })
    })

    test.describe("Đã đăng nhập", () => {
        test.beforeEach(async ({ page }) => {
            await loginAsTestUser(page)
        })

        test("redirect khỏi /login khi đã đăng nhập", async ({ page }) => {
            await page.goto("/login")
            // Phải redirect đến /app hoặc /onboarding
            await expect(page).not.toHaveURL("/login")
            await expect(page).toHaveURL(/\/(app|onboarding)/)
        })

        test("redirect khỏi /register khi đã đăng nhập", async ({ page }) => {
            await page.goto("/register")
            await expect(page).not.toHaveURL("/register")
            await expect(page).toHaveURL(/\/(app|onboarding)/)
        })

        test("cho phép truy cập /app/staff", async ({ page }) => {
            await page.goto("/app/staff")
            await expect(page).toHaveURL(/\/app\/staff|\/onboarding/)
        })

        test("cho phép truy cập /app/platforms", async ({ page }) => {
            await page.goto("/app/platforms")
            await expect(page).toHaveURL(/\/app\/platforms|\/onboarding/)
        })

        test("cho phép truy cập /app/customer", async ({ page }) => {
            await page.goto("/app/customer")
            await expect(page).toHaveURL(/\/app\/customer|\/onboarding/)
        })
    })

    test.describe("Session expiry", () => {
        test("redirect khi token hết hạn", async ({ page }) => {
            // Login trước
            await loginAsTestUser(page)

            // Xóa token để simulate expiry
            await page.evaluate(() => {
                localStorage.removeItem("accessToken")
            })

            // Navigate sẽ trigger route guard
            await page.goto("/app/staff")

            // Phải redirect về login
            await expect(page).toHaveURL("/login")
        })

        test("redirect khi token invalid", async ({ page }) => {
            // Set invalid token
            await page.evaluate(() => {
                localStorage.setItem("accessToken", "invalid-token-12345")
            })

            await page.goto("/app/staff")

            // API sẽ trả 401, redirect về login
            await expect(page).toHaveURL("/login", { timeout: 10000 })
        })
    })
})
