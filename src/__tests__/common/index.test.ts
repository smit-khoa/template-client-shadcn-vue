/**
 * Unit Tests cho Common Utilities
 * File: src/common/index.ts
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { formatCurrency, formatNumber, formatDate, randomString, copy } from "@/common"

describe("Common Utilities", () => {
    // ==========================================
    // formatCurrency Tests
    // ==========================================
    describe("formatCurrency", () => {
        it("should format VND currency correctly", () => {
            const result = formatCurrency(1000000, "VND")
            // currency-formatter formats VND with ₫ symbol
            expect(result).toContain("1")
            expect(result).toContain("000")
            expect(result).toContain("000")
        })

        it("should use VND as default currency", () => {
            const result = formatCurrency(50000)
            expect(result).toBeDefined()
            expect(typeof result).toBe("string")
        })

        it("should handle zero value", () => {
            const result = formatCurrency(0, "VND")
            expect(result).toBeDefined()
        })

        it("should handle negative values", () => {
            const result = formatCurrency(-1000, "VND")
            expect(result).toBeDefined()
        })

        it("should handle decimal values", () => {
            const result = formatCurrency(1234.56, "VND")
            expect(result).toBeDefined()
        })

        it("should format USD currency", () => {
            const result = formatCurrency(1000, "USD")
            expect(result).toContain("$")
        })
    })

    // ==========================================
    // formatNumber Tests
    // ==========================================
    describe("formatNumber", () => {
        it("should format number with Vietnamese locale", () => {
            const result = formatNumber(1000000)
            // Vietnamese locale uses dots as thousand separators
            expect(result).toBe("1.000.000")
        })

        it("should handle string number input", () => {
            const result = formatNumber("1234567")
            expect(result).toBe("1.234.567")
        })

        it("should return original value for invalid number", () => {
            const result = formatNumber("not a number")
            expect(result).toBe("not a number")
        })

        it("should handle zero", () => {
            const result = formatNumber(0)
            expect(result).toBe("0")
        })

        it("should handle negative numbers", () => {
            const result = formatNumber(-1000)
            expect(result).toBe("-1.000")
        })

        it("should handle decimal numbers", () => {
            const result = formatNumber(1234.56)
            // Vietnamese locale uses comma for decimals
            expect(result).toContain("1.234")
        })

        it("should handle empty string", () => {
            const result = formatNumber("")
            expect(result).toBe("")
        })

        it("should handle null/undefined gracefully", () => {
            const result1 = formatNumber(null as any)
            const result2 = formatNumber(undefined as any)
            // formatNumber returns original value for NaN results
            expect(result1).toBe(null)
            expect(result2).toBe(undefined)
        })
    })

    // ==========================================
    // formatDate Tests
    // ==========================================
    describe("formatDate", () => {
        it("should format date with default format DD/MM/YYYY", () => {
            const test_date = new Date(2024, 0, 15) // January 15, 2024
            const result = formatDate({ date: test_date })
            expect(result).toBe("15/01/2024")
        })

        it("should format date with custom format", () => {
            const test_date = new Date(2024, 5, 20) // June 20, 2024
            const result = formatDate({ date: test_date, format: "YYYY-MM-DD" })
            expect(result).toBe("2024-06-20")
        })

        it("should format date with time", () => {
            const test_date = new Date(2024, 0, 15, 14, 30, 0)
            const result = formatDate({ date: test_date, format: "DD/MM/YYYY HH:mm" })
            expect(result).toBe("15/01/2024 14:30")
        })

        it("should return relative time when fromNow is true", () => {
            const recent_date = new Date()
            recent_date.setMinutes(recent_date.getMinutes() - 5) // 5 minutes ago
            const result = formatDate({ date: recent_date, fromNow: true })
            // Should contain Vietnamese relative time
            expect(result).toBeDefined()
            expect(typeof result).toBe("string")
        })

        it("should handle string date input", () => {
            const result = formatDate({ date: "2024-01-15" })
            expect(result).toBe("15/01/2024")
        })

        it("should handle timestamp input", () => {
            const timestamp = new Date(2024, 0, 15).getTime()
            const result = formatDate({ date: timestamp })
            expect(result).toBe("15/01/2024")
        })

        it("should return 'Invalid Date' for invalid date", () => {
            const result = formatDate({ date: "invalid date string xyz" })
            expect(result).toBe("Invalid Date")
        })

        it("should handle null date", () => {
            const result = formatDate({ date: null })
            expect(result).toBe("Invalid Date")
        })

        it("should format with month name", () => {
            const test_date = new Date(2024, 0, 15)
            const result = formatDate({ date: test_date, format: "DD MMMM YYYY" })
            expect(result).toContain("15")
            expect(result).toContain("2024")
        })
    })

    // ==========================================
    // randomString Tests
    // ==========================================
    describe("randomString", () => {
        it("should generate string of specified length", () => {
            const length = 10
            const result = randomString(length)
            expect(result.length).toBe(length)
        })

        it("should generate different strings on each call", () => {
            const result1 = randomString(20)
            const result2 = randomString(20)
            // Extremely unlikely to be the same
            expect(result1).not.toBe(result2)
        })

        it("should only contain alphanumeric characters", () => {
            const result = randomString(100)
            const valid_chars = /^[A-Za-z0-9]+$/
            expect(valid_chars.test(result)).toBe(true)
        })

        it("should handle length of 0", () => {
            const result = randomString(0)
            expect(result).toBe("")
        })

        it("should handle length of 1", () => {
            const result = randomString(1)
            expect(result.length).toBe(1)
        })

        it("should handle large length", () => {
            const result = randomString(1000)
            expect(result.length).toBe(1000)
        })
    })

    // ==========================================
    // copy Tests
    // ==========================================
    describe("copy", () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it("should call navigator.clipboard.writeText", () => {
            const text = "Test text to copy"
            copy(text)
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
        })

        it("should copy empty string", () => {
            copy("")
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith("")
        })

        it("should copy special characters", () => {
            const special_text = "Special chars: @#$%^&*()!<>?"
            copy(special_text)
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(special_text)
        })

        it("should copy multiline text", () => {
            const multiline_text = "Line 1\nLine 2\nLine 3"
            copy(multiline_text)
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(multiline_text)
        })

        it("should copy unicode characters", () => {
            const unicode_text = "Tiếng Việt: xin chào 🎉"
            copy(unicode_text)
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(unicode_text)
        })
    })
})
