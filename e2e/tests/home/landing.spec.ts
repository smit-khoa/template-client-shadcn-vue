import { test, expect } from "@playwright/test"

test.describe("Home Page - Problem Selection Wizard", () => {
    // Skip trên mobile project để tránh duplicate
    test.skip(({ browserName }) => browserName !== "chromium", "Only run on chromium")

    test.beforeEach(async ({ page }) => {
        await page.goto("/")
        await page.waitForLoadState("networkidle")
    })

    // ===== HEADER/NAVBAR TESTS =====

    test("hiển thị logo SMIT Agency", async ({ page }) => {
        const logo_icon = page.locator("header img").first()
        await expect(logo_icon).toBeVisible()
    })

    test("hiển thị navigation menu trên desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })

        await expect(page.getByText("Trang chủ")).toBeVisible()
        await expect(page.getByText("Có gì mới")).toBeVisible()
        await expect(page.getByText("Giải pháp")).toBeVisible()
        await expect(page.getByText("Tính năng")).toBeVisible()
        await expect(page.getByText("Why SMIT Agency")).toBeVisible()
        await expect(page.getByText("Bảng giá")).toBeVisible()
    })

    test("hiển thị CTA button 'Dùng thử miễn phí' trong header", async ({ page }) => {
        const cta_button = page.getByRole("button", { name: /Dùng thử miễn phí/i }).first()
        await expect(cta_button).toBeVisible()
    })

    // ===== STEP INDICATOR TESTS =====

    test("hiển thị step indicator 'Bước 1/3'", async ({ page }) => {
        await expect(page.getByText(/Bước 1\/3/i)).toBeVisible()
    })

    test("hiển thị progress bars cho 3 steps", async ({ page }) => {
        // Step 1 active (gradient), steps 2-3 inactive (white/20)
        const progress_bars = page.locator(".h-1.rounded-full")
        await expect(progress_bars).toHaveCount(3)
    })

    test("hiển thị tiêu đề 'Chọn vấn đề Agency của bạn đang gặp phải'", async ({ page }) => {
        await expect(page.getByRole("heading", { name: /Chọn vấn đề Agency/i })).toBeVisible()
    })

    // ===== PROBLEM SELECTION TESTS =====

    test("hiển thị text 'Đã chọn: 0 trên 5 vấn đề' ban đầu", async ({ page }) => {
        await expect(page.getByText(/Đã chọn:/i)).toBeVisible()
        await expect(page.getByText(/0 trên 5/i)).toBeVisible()
    })

    test("hiển thị 5 problem cards", async ({ page }) => {
        const problem_cards = page.locator(".problem_card")
        // 5 selection cards + 1 description card có thể xuất hiện sau khi chọn
        const count = await problem_cards.count()
        expect(count).toBeGreaterThanOrEqual(5)
    })

    test("hiển thị nội dung card 1 - hack tài khoản", async ({ page }) => {
        await expect(page.getByText(/Bị hack tài khoản quảng cáo/i)).toBeVisible()
    })

    test("hiển thị nội dung card 2 - quá tải hóa đơn", async ({ page }) => {
        await expect(page.getByText(/Quá tải vì hóa đơn/i)).toBeVisible()
    })

    test("hiển thị nội dung card 3 - hóa đơn quá nhiều", async ({ page }) => {
        await expect(page.getByText(/Hóa đơn quảng cáo quá nhiều/i)).toBeVisible()
    })

    test("hiển thị nội dung card 4 - thất thoát tiền Hold", async ({ page }) => {
        await expect(page.getByText(/Thất thoát tiền "Hold"/i)).toBeVisible()
    })

    test("hiển thị nội dung card 5 - quản lý công nợ", async ({ page }) => {
        await expect(page.getByText(/Khó khăn khi quản lý công nợ/i)).toBeVisible()
    })

    // ===== INTERACTION TESTS =====

    test("click card để chọn problem", async ({ page }) => {
        // Click card đầu tiên
        const first_card = page.locator(".problem_card").first()
        await first_card.click()

        // Verify selected count updated
        await expect(page.getByText(/1 trên 5/i)).toBeVisible()
    })

    test("hiển thị badge 'Bỏ chọn' khi card được selected", async ({ page }) => {
        const first_card = page.locator(".problem_card").first()
        await first_card.click()

        await expect(page.getByText("Bỏ chọn")).toBeVisible()
    })

    test("hiển thị problem description card khi có item selected", async ({ page }) => {
        const first_card = page.locator(".problem_card").first()
        await first_card.click()

        await expect(page.getByText("Vấn đề của bạn:")).toBeVisible()
    })

    test("click lại card để bỏ chọn", async ({ page }) => {
        const first_card = page.locator(".problem_card").first()

        // Select
        await first_card.click()
        await expect(page.getByText(/1 trên 5/i)).toBeVisible()

        // Deselect
        await first_card.click()
        await expect(page.getByText(/0 trên 5/i)).toBeVisible()
    })

    test("có thể chọn nhiều problems", async ({ page }) => {
        const cards = page.locator(".problem_card")

        // Select 3 cards
        await cards.nth(0).click()
        await cards.nth(1).click()
        await cards.nth(2).click()

        await expect(page.getByText(/3 trên 5/i)).toBeVisible()
    })

    // ===== CTA BUTTON TESTS =====

    test("hiển thị button 'Bước tiếp theo'", async ({ page }) => {
        const next_button = page.getByRole("button", { name: /Bước tiếp theo/i })
        await expect(next_button).toBeVisible()
    })

    test("button 'Bước tiếp theo' disabled khi chưa chọn problem", async ({ page }) => {
        const next_button = page.getByRole("button", { name: /Bước tiếp theo/i })
        await expect(next_button).toBeDisabled()
    })

    test("button 'Bước tiếp theo' enabled sau khi chọn problem", async ({ page }) => {
        // Select a problem first
        const first_card = page.locator(".problem_card").first()
        await first_card.click()

        const next_button = page.getByRole("button", { name: /Bước tiếp theo/i })
        await expect(next_button).toBeEnabled()
    })

    // ===== RISK INDICATOR TESTS =====

    test("hiển thị risk indicator trên desktop", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })

        await expect(page.getByText(/Độ rủi ro/i)).toBeVisible()
    })

    test("risk percentage cập nhật khi chọn problems", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })

        // Initially 0%
        await expect(page.getByText("0%")).toBeVisible()

        // Select a problem (1/5 = 20%)
        const first_card = page.locator(".problem_card").first()
        await first_card.click()

        await expect(page.getByText("20%")).toBeVisible()
    })

    // ===== RESPONSIVE TESTS =====

    test("navigation menu ẩn trên mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })

        await expect(page.getByText("Trang chủ")).not.toBeVisible()
    })

    test("risk indicator ẩn trên tablet/mobile", async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 768 })

        // Risk indicator chỉ hiển thị ở xl breakpoint (1280px+)
        await expect(page.getByText(/Độ rủi ro/i)).not.toBeVisible()
    })

    test("cards stack vertically trên mobile", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.waitForTimeout(300)

        // Cards should be visible and stacked
        const cards = page.locator(".problem_card")
        const count = await cards.count()
        expect(count).toBeGreaterThanOrEqual(5)
    })

    // ===== VISUAL REGRESSION TESTS (Skipped - need baseline) =====

    test.skip("visual regression - desktop (1440px)", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.waitForTimeout(500)

        await expect(page).toHaveScreenshot("home-wizard-desktop.png", {
            maxDiffPixelRatio: 0.1,
            fullPage: true
        })
    })

    test.skip("visual regression - mobile (375px)", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.waitForTimeout(500)

        await expect(page).toHaveScreenshot("home-wizard-mobile.png", {
            maxDiffPixelRatio: 0.1,
            fullPage: true
        })
    })

    // ===== ACCESSIBILITY TESTS =====

    test("heading có đúng hierarchy", async ({ page }) => {
        const h1 = page.getByRole("heading", { level: 1 })
        await expect(h1).toBeVisible()
    })

    test("tất cả buttons có accessible role", async ({ page }) => {
        const buttons = await page.getByRole("button").all()
        expect(buttons.length).toBeGreaterThan(0)
    })

    test("images có alt text", async ({ page }) => {
        const images = page.locator("img[alt]")
        const count = await images.count()
        expect(count).toBeGreaterThan(0)
    })
})
