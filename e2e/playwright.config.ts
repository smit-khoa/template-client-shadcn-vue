import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // Enhanced reporter cho visual testing
    reporter: [
        ["html", { open: "never", outputFolder: "e2e/reports/html" }],
        ["list"],
        ["json", { outputFile: "e2e/reports/test-results.json" }]
    ],

    use: {
        baseURL: "https://localhost:8309",
        trace: "on-first-retry",

        // Screenshot settings cho visual testing
        screenshot: {
            mode: "only-on-failure",
            fullPage: true
        },

        ignoreHTTPSErrors: true,
        video: "retain-on-failure",

        // Viewport mặc định
        viewport: { width: 1920, height: 1080 },

        // Timeout settings
        actionTimeout: 10000,
        navigationTimeout: 30000
    },

    // Test timeout
    timeout: 60000,
    expect: {
        timeout: 10000,
        // Visual comparison tolerance
        toMatchSnapshot: {
            threshold: 0.05, // 95% similarity required
            maxDiffPixels: 100
        }
    },

    projects: [
        // Desktop Chrome - Primary testing
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1920, height: 1080 }
            }
        },

        // Desktop Chrome - HD (1366x768)
        {
            name: "chromium-hd",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1366, height: 768 }
            }
        },

        // Mobile viewport - iPhone 14
        {
            name: "mobile",
            use: {
                ...devices["iPhone 14"]
            }
        },

        // Tablet - iPad Air
        {
            name: "tablet",
            use: {
                ...devices["iPad (gen 7)"]
            }
        }
    ],

    // Auto-start dev server
    webServer: {
        command: "npm run dev",
        url: "https://localhost:8309",
        reuseExistingServer: !process.env.CI,
        ignoreHTTPSErrors: true,
        timeout: 120000,
        // Ensure server is fully ready
        stdout: "pipe",
        stderr: "pipe"
    }
})
