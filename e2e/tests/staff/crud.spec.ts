import { test, expect } from "@playwright/test"
import { loginAsTestUser } from "../../fixtures/auth.fixture"

test.describe("Staff Management", () => {
    test.beforeEach(async ({ page }) => {
        await loginAsTestUser(page)
        // Navigate to staff page (có thể cần qua onboarding trước)
        await page.goto("/app/staff")

        // Nếu redirect về onboarding, skip tests này
        if (page.url().includes("onboarding")) {
            test.skip()
        }
    })

    test("hiển thị danh sách nhân viên", async ({ page }) => {
        // Verify page title hoặc heading
        await expect(page.getByRole("heading", { name: /nhân viên|staff/i })).toBeVisible()

        // Verify có table hoặc list
        await expect(
            page.locator("table, [role='grid'], [data-testid='staff-list']")
        ).toBeVisible()
    })

    test("tìm kiếm nhân viên", async ({ page }) => {
        const search_input = page.getByPlaceholder(/tìm kiếm|search/i)

        if (await search_input.isVisible()) {
            await search_input.fill("test")

            // Chờ debounce và filter
            await page.waitForTimeout(500)

            // Verify results updated (có thể empty hoặc filtered)
            await expect(page.locator("table tbody tr, [data-testid='staff-item']").first()).toBeVisible()
        }
    })

    test("mở form thêm nhân viên", async ({ page }) => {
        const add_button = page.getByRole("button", { name: /thêm|add/i })

        if (await add_button.isVisible()) {
            await add_button.click()

            // Verify drawer/modal mở
            await expect(
                page.locator("[role='dialog'], [data-testid='staff-form']")
            ).toBeVisible()

            // Verify form fields
            await expect(page.getByPlaceholder(/họ và tên|name/i)).toBeVisible()
            await expect(page.getByPlaceholder(/email/i)).toBeVisible()
        }
    })

    test("thêm nhân viên mới", async ({ page }) => {
        const add_button = page.getByRole("button", { name: /thêm|add/i })

        if (await add_button.isVisible()) {
            await add_button.click()

            // Fill form
            const timestamp = Date.now()
            await page.getByPlaceholder(/họ và tên|name/i).fill(`Test Staff ${timestamp}`)
            await page.getByPlaceholder(/email/i).fill(`staff+${timestamp}@test.com`)

            // Select role nếu có
            const role_select = page.getByRole("combobox", { name: /vai trò|role/i })
            if (await role_select.isVisible()) {
                await role_select.click()
                await page.getByRole("option").first().click()
            }

            // Submit
            await page.getByRole("button", { name: /lưu|save|thêm|add/i }).click()

            // Verify success
            await expect(
                page.getByText(/thành công|success/i)
            ).toBeVisible({ timeout: 10000 })
        }
    })

    test("sửa thông tin nhân viên", async ({ page }) => {
        // Click edit trên row đầu tiên
        const edit_button = page
            .locator("table tbody tr, [data-testid='staff-item']")
            .first()
            .getByRole("button", { name: /sửa|edit/i })

        if (await edit_button.isVisible()) {
            await edit_button.click()

            // Verify form mở với data
            await expect(
                page.locator("[role='dialog'], [data-testid='staff-form']")
            ).toBeVisible()

            // Edit name
            const name_input = page.getByPlaceholder(/họ và tên|name/i)
            await name_input.clear()
            await name_input.fill("Updated Name")

            // Save
            await page.getByRole("button", { name: /lưu|save|cập nhật|update/i }).click()

            // Verify success
            await expect(
                page.getByText(/thành công|success|updated/i)
            ).toBeVisible({ timeout: 10000 })
        }
    })

    test("xóa nhân viên với confirm dialog", async ({ page }) => {
        // Click delete trên row đầu tiên
        const delete_button = page
            .locator("table tbody tr, [data-testid='staff-item']")
            .first()
            .getByRole("button", { name: /xóa|delete/i })

        if (await delete_button.isVisible()) {
            await delete_button.click()

            // Verify confirm dialog
            await expect(
                page.getByText(/xác nhận|confirm|chắc chắn/i)
            ).toBeVisible()

            // Click confirm
            await page.getByRole("button", { name: /xác nhận|confirm|đồng ý|ok/i }).click()

            // Verify success
            await expect(
                page.getByText(/thành công|success|deleted/i)
            ).toBeVisible({ timeout: 10000 })
        }
    })

    test("hủy xóa nhân viên", async ({ page }) => {
        const delete_button = page
            .locator("table tbody tr, [data-testid='staff-item']")
            .first()
            .getByRole("button", { name: /xóa|delete/i })

        if (await delete_button.isVisible()) {
            await delete_button.click()

            // Click cancel
            await page.getByRole("button", { name: /hủy|cancel/i }).click()

            // Dialog đóng
            await expect(
                page.locator("[role='alertdialog']")
            ).not.toBeVisible()
        }
    })
})
