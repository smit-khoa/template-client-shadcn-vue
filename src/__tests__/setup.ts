/**
 * Vitest Setup File
 * Cấu hình global cho testing environment
 */

import { vi, beforeAll, afterAll, afterEach } from "vitest"
import "@testing-library/jest-dom/vitest"
import { config } from "@vue/test-utils"

// Suppress Vue lifecycle warnings khi test composables ngoài component context
const original_warn = console.warn
console.warn = (...args: any[]) => {
    const msg = args[0]?.toString() || ""
    const ignored_patterns = [
        "onMounted is called when there is no active component instance",
        "onUnmounted is called when there is no active component instance",
        "[Vue warn]:"
    ]
    // Chỉ suppress Vue lifecycle warnings
    if (ignored_patterns.some(p => msg.includes(p) && msg.includes("Lifecycle injection APIs"))) {
        return
    }
    original_warn.apply(console, args)
}

config.global.config.warnHandler = () => null

// Mock localStorage
const local_storage_mock = (() => {
    let store: Record<string, string> = {}
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString()
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        }
    }
})()

Object.defineProperty(window, "localStorage", {
    value: local_storage_mock
})

// Mock navigator.clipboard
Object.defineProperty(navigator, "clipboard", {
    value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue("")
    },
    writable: true
})

// Mock import.meta.url for image/asset loading
vi.mock("@/common", async () => {
    const actual = await vi.importActual("@/common")
    return {
        ...actual,
        image: (name: string) => `/mock/assets/images/${name}`
    }
})

// Mock vue-sonner
vi.mock("vue-sonner", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    },
    Toaster: {
        name: "Toaster",
        render: () => null
    }
}))

// Mock import.meta.env
vi.stubGlobal("import.meta", {
    env: {
        DEV: true,
        PROD: false,
        MODE: "test"
    },
    url: "file:///mock"
})

// Global cleanup
beforeAll(() => {
    // Setup before all tests
})

afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks()
    localStorage.clear()
})

afterAll(() => {
    // Cleanup after all tests
    vi.restoreAllMocks()
})
