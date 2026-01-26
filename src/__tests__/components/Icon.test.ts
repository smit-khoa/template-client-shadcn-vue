/**
 * Unit Tests cho Icon Component THẬT
 * File: src/components/custom/icon/Icon.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Icon from "@/components/custom/icon/Icon.vue"

// Mock useSprite composable
vi.mock("@/composables/useSprite", () => ({
    useSprite: vi.fn(() => ({
        isLoaded: { value: true },
        loadSprite: vi.fn()
    }))
}))

// Mock icon utilities
vi.mock("@/components/custom/icon/iconConfig", () => ({
    needsInlineRendering: vi.fn((name: string) => name.startsWith("gradient-"))
}))

vi.mock("@/components/custom/icon/iconUtils", () => ({
    extractSvgContent: vi.fn(() =>
        Promise.resolve({
            viewBox: "0 0 24 24",
            content: '<path d="M0 0h24v24H0z"/>'
        })
    )
}))

describe("Icon Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render svg element", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            expect(wrapper.find("svg").exists()).toBe(true)
        })

        it("should have icon class", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            expect(wrapper.find("svg").classes()).toContain("icon")
        })

        it("should render use element with correct href", () => {
            const wrapper = mount(Icon, {
                props: { name: "mail-02" }
            })
            expect(wrapper.find("use").attributes("href")).toBe("#mail-02")
        })

        it("should have default viewBox", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            const svg = wrapper.find("svg")
            const view_box = svg.attributes("viewBox") || svg.attributes("viewbox")
            expect(view_box).toBe("0 0 24 24")
        })
    })

    // ==========================================
    // Size Tests
    // ==========================================
    describe("Size", () => {
        it("should have default size of 24px", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("24px")
            expect(wrapper.find("svg").attributes("height")).toBe("24px")
        })

        it("should accept number size", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: 32 }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("32px")
            expect(wrapper.find("svg").attributes("height")).toBe("32px")
        })

        it("should accept string size with px", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: "48px" }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("48px")
            expect(wrapper.find("svg").attributes("height")).toBe("48px")
        })

        it("should accept string size with rem", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: "2rem" }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("2rem")
            expect(wrapper.find("svg").attributes("height")).toBe("2rem")
        })

        it("should handle small sizes", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: 12 }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("12px")
        })

        it("should handle large sizes", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: 128 }
            })
            expect(wrapper.find("svg").attributes("width")).toBe("128px")
        })
    })

    // ==========================================
    // Color Tests
    // ==========================================
    describe("Color", () => {
        it("should have default color currentColor", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            const style = wrapper.find("svg").attributes("style")
            expect(style?.toLowerCase()).toContain("color: currentcolor")
        })

        it("should accept custom hex color", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", color: "#ff0000" }
            })
            const style = wrapper.find("svg").attributes("style")
            expect(style).toMatch(/color:\s*(#ff0000|rgb\(255,\s*0,\s*0\))/)
        })

        it("should accept CSS variable color", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", color: "var(--primary)" }
            })
            const style = wrapper.find("svg").attributes("style")
            expect(style).toContain("var(--primary)")
        })

        it("should accept named color", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", color: "red" }
            })
            const style = wrapper.find("svg").attributes("style")
            expect(style).toContain("color: red")
        })
    })

    // ==========================================
    // ClassName Tests
    // ==========================================
    describe("ClassName", () => {
        it("should have icon class by default", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            expect(wrapper.find("svg").classes()).toContain("icon")
        })

        it("should accept custom className", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", className: "my-icon" }
            })
            expect(wrapper.find("svg").classes()).toContain("my-icon")
        })

        it("should accept multiple classes in className", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", className: "icon-lg text-primary" }
            })
            expect(wrapper.find("svg").classes()).toContain("icon-lg")
            expect(wrapper.find("svg").classes()).toContain("text-primary")
        })
    })

    // ==========================================
    // Icon Names Tests
    // ==========================================
    describe("Icon Names", () => {
        const common_icons = [
            "mail-02",
            "square-lock-01",
            "eye",
            "eye-off",
            "search",
            "plus",
            "x",
            "chevron-left",
            "chevron-right",
            "user-circle",
            "settings",
            "send"
        ]

        common_icons.forEach(icon_name => {
            it(`should render ${icon_name} icon`, () => {
                const wrapper = mount(Icon, {
                    props: { name: icon_name }
                })
                expect(wrapper.find("use").attributes("href")).toBe(`#${icon_name}`)
            })
        })
    })

    // ==========================================
    // Style Tests
    // ==========================================
    describe("Style", () => {
        it("should have width and height in style", () => {
            const wrapper = mount(Icon, {
                props: { name: "home", size: 20 }
            })
            const style = wrapper.find("svg").attributes("style")
            expect(style).toContain("width: 20px")
            expect(style).toContain("height: 20px")
        })

        it("should have fill currentColor attribute", () => {
            const wrapper = mount(Icon, {
                props: { name: "home" }
            })
            expect(wrapper.find("svg").attributes("fill")).toBe("currentColor")
        })
    })
})

// ==========================================
// Icon Size Computation Tests (Unit)
// ==========================================
describe("Icon Size Computation (Unit)", () => {
    const computeSize = (size: number | string): string => {
        if (typeof size === "number") {
            return `${size}px`
        }
        return size
    }

    it("should convert number to px string", () => {
        expect(computeSize(24)).toBe("24px")
        expect(computeSize(16)).toBe("16px")
        expect(computeSize(48)).toBe("48px")
    })

    it("should return string size as-is", () => {
        expect(computeSize("24px")).toBe("24px")
        expect(computeSize("2rem")).toBe("2rem")
        expect(computeSize("100%")).toBe("100%")
    })

    it("should handle zero", () => {
        expect(computeSize(0)).toBe("0px")
    })

    it("should handle decimal numbers", () => {
        expect(computeSize(24.5)).toBe("24.5px")
    })
})

// ==========================================
// Icon Style Generation Tests (Unit)
// ==========================================
describe("Icon Style Generation (Unit)", () => {
    const generateIconStyle = (color: string, size: string) => ({
        color,
        width: size,
        height: size
    })

    it("should generate style with currentColor", () => {
        const style = generateIconStyle("currentColor", "24px")
        expect(style).toEqual({
            color: "currentColor",
            width: "24px",
            height: "24px"
        })
    })

    it("should generate style with custom color", () => {
        const style = generateIconStyle("#269a85", "20px")
        expect(style).toEqual({
            color: "#269a85",
            width: "20px",
            height: "20px"
        })
    })

    it("should generate style with CSS variable", () => {
        const style = generateIconStyle("var(--primary)", "32px")
        expect(style).toEqual({
            color: "var(--primary)",
            width: "32px",
            height: "32px"
        })
    })
})
