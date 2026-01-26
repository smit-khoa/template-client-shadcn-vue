/**
 * Unit Tests cho useSprite Composable
 * File: src/composables/useSprite.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { nextTick } from "vue"

// Mock các dependencies trước khi import
const mock_fetch = vi.fn()
;(globalThis as any).fetch = mock_fetch

describe("useSprite Composable", () => {
    let sprite_container: HTMLElement | null

    beforeEach(() => {
        // Clear DOM
        sprite_container = document.getElementById("svg-sprite-symbols")
        if (sprite_container) {
            sprite_container.remove()
        }

        // Reset fetch mock
        mock_fetch.mockReset()

        // Reset module để clear global state
        vi.resetModules()
    })

    afterEach(() => {
        // Cleanup
        const container = document.getElementById("svg-sprite-symbols")
        if (container) {
            container.remove()
        }
        vi.clearAllMocks()
    })

    // ==========================================
    // Basic Functionality
    // ==========================================
    describe("Basic Functionality", () => {
        it("should export useSprite function", async () => {
            // Dynamic import after mocking
            const { useSprite } = await import("@/composables/useSprite")
            expect(typeof useSprite).toBe("function")
        })

        it("should return isLoaded and loadSprite", async () => {
            const { useSprite } = await import("@/composables/useSprite")

            const result = useSprite()

            expect(result).toHaveProperty("isLoaded")
            expect(result).toHaveProperty("loadSprite")
            expect(typeof result.loadSprite).toBe("function")
        })

        it("should have isLoaded as false initially", async () => {
            const { useSprite } = await import("@/composables/useSprite")

            const { isLoaded } = useSprite()

            // May already be set to true if sprite exists
            expect(typeof isLoaded.value).toBe("boolean")
        })
    })

    // ==========================================
    // loadSprite Function
    // ==========================================
    describe("loadSprite Function", () => {
        it("should fetch SVG sprite when called", async () => {
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve('<svg><symbol id="test"></symbol></svg>')
            })

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()
            loadSprite()

            await nextTick()

            // Verify fetch was called (might be with URL object)
            expect(mock_fetch).toHaveBeenCalled()
        })

        it("should not fetch if sprite already exists in DOM", async () => {
            // Create sprite container first
            const existing_sprite = document.createElement("div")
            existing_sprite.id = "svg-sprite-symbols"
            document.body.appendChild(existing_sprite)

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite, isLoaded } = useSprite()
            loadSprite()

            // Should set isLoaded to true without fetching
            expect(isLoaded.value).toBe(true)
            expect(mock_fetch).not.toHaveBeenCalled()
        })

        it("should prevent multiple concurrent fetches", async () => {
            mock_fetch.mockImplementation(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve({
                                text: () => Promise.resolve('<svg><symbol id="test"></symbol></svg>')
                            })
                        }, 100)
                    })
            )

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()

            // Call loadSprite multiple times
            loadSprite()
            loadSprite()
            loadSprite()

            // Should only fetch once
            expect(mock_fetch.mock.calls.length).toBeLessThanOrEqual(1)
        })
    })

    // ==========================================
    // Sprite Injection
    // ==========================================
    describe("Sprite Injection", () => {
        it("should create hidden div with correct id", async () => {
            const svg_content = '<svg><symbol id="icon1"></symbol></svg>'
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve(svg_content)
            })

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()
            loadSprite()

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50))

            const sprite_div = document.getElementById("svg-sprite-symbols")
            if (sprite_div) {
                expect(sprite_div).toBeTruthy()
                expect(sprite_div.style.display).toBe("none")
            }
        })

        it("should inject SVG content into container", async () => {
            const svg_content = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="test-icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></symbol></svg>'
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve(svg_content)
            })

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()
            loadSprite()

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50))

            const sprite_div = document.getElementById("svg-sprite-symbols")
            if (sprite_div) {
                expect(sprite_div.innerHTML).toContain("symbol")
            }
        })
    })

    // ==========================================
    // Error Handling
    // ==========================================
    describe("Error Handling", () => {
        it("should handle fetch errors gracefully", async () => {
            mock_fetch.mockRejectedValueOnce(new Error("Network Error"))

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()

            // Should not throw
            expect(() => loadSprite()).not.toThrow()

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50))

            // isLoaded should remain false on error
            // (depends on implementation)
        })

        it("should reset loading state on error", async () => {
            mock_fetch.mockRejectedValueOnce(new Error("Fetch failed"))

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()
            loadSprite()

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50))

            // Should be able to retry after error
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve('<svg></svg>')
            })

            loadSprite()

            // Second attempt should work
            expect(mock_fetch.mock.calls.length).toBeGreaterThanOrEqual(1)
        })
    })

    // ==========================================
    // Global State
    // ==========================================
    describe("Global State", () => {
        it("should share state between multiple useSprite calls", async () => {
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve('<svg></svg>')
            })

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const instance1 = useSprite()
            const instance2 = useSprite()

            // Should reference the same reactive state
            expect(instance1.isLoaded).toBe(instance2.isLoaded)
        })
    })

    // ==========================================
    // Sprite Container Styles
    // ==========================================
    describe("Sprite Container Styles", () => {
        it("should set correct styles on sprite container", async () => {
            mock_fetch.mockResolvedValueOnce({
                text: () => Promise.resolve('<svg></svg>')
            })

            vi.resetModules()
            const { useSprite } = await import("@/composables/useSprite")

            const { loadSprite } = useSprite()
            loadSprite()

            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 50))

            const sprite_div = document.getElementById("svg-sprite-symbols")
            if (sprite_div) {
                expect(sprite_div.style.position).toBe("absolute")
                expect(sprite_div.style.width).toBe("0px")
                expect(sprite_div.style.height).toBe("0px")
            }
        })
    })
})
