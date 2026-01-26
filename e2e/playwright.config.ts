import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [["html", { open: "never" }], ["list"]],

    use: {
        baseURL: "https://localhost:8309",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        ignoreHTTPSErrors: true,
        video: "retain-on-failure"
    },

    projects: [
        // Desktop Chrome
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        },

        // Mobile viewport
        {
            name: "mobile",
            use: { ...devices["iPhone 14"] }
        }
    ],

    // Auto-start dev server
    webServer: {
        command: "npm run dev",
        url: "https://localhost:8309",
        reuseExistingServer: !process.env.CI,
        ignoreHTTPSErrors: true,
        timeout: 120000
    }
})
