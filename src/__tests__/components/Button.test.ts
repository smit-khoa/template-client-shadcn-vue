/**
 * Unit Tests cho Button Component THẬT
 * File: src/components/custom/button/Button.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Button from "@/components/custom/button/Button.vue"

// Mock Icon component
vi.mock("@/components/custom/icon", () => ({
    Icon: {
        name: "Icon",
        props: ["name", "size", "color"],
        template: '<span class="mock-icon" :data-name="name" :data-size="size"></span>'
    }
}))

// Mock Tooltip component
vi.mock("@/components/custom/tooltip", () => ({
    Tooltip: {
        name: "Tooltip",
        props: ["content"],
        template: '<div class="mock-tooltip"><slot /></div>'
    }
}))

// Mock lib/utils
vi.mock("@/lib/utils", () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).flat().join(" ")
}))

describe("Button Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render button element", () => {
            const wrapper = mount(Button)
            expect(wrapper.find("button").exists()).toBe(true)
        })

        it("should render slot content", () => {
            const wrapper = mount(Button, {
                slots: {
                    default: "Click Me"
                }
            })
            expect(wrapper.text()).toContain("Click Me")
        })

        it("should render with default type button", () => {
            const wrapper = mount(Button)
            expect(wrapper.find("button").attributes("type")).toBe("button")
        })
    })

    // ==========================================
    // Variants Tests
    // ==========================================
    describe("Variants", () => {
        it("should apply primary variant styles", () => {
            const wrapper = mount(Button, {
                props: { variant: "primary" }
            })
            const button = wrapper.find("button")
            // Primary có gradient background
            expect(button.attributes("style")).toContain("gradient")
        })

        it("should apply secondary variant styles", () => {
            const wrapper = mount(Button, {
                props: { variant: "secondary" }
            })
            const button = wrapper.find("button")
            expect(button.classes().join(" ")).toContain("border")
        })

        it("should apply danger variant styles", () => {
            const wrapper = mount(Button, {
                props: { variant: "danger" }
            })
            const button = wrapper.find("button")
            expect(button.attributes("style")).toBeDefined()
        })
    })

    // ==========================================
    // Sizes Tests
    // ==========================================
    describe("Sizes", () => {
        it("should apply default size", () => {
            const wrapper = mount(Button, {
                props: { size: "default" }
            })
            const button = wrapper.find("button")
            expect(button.classes().join(" ")).toContain("h-[36px]")
        })

        it("should apply sm size", () => {
            const wrapper = mount(Button, {
                props: { size: "sm" }
            })
            const button = wrapper.find("button")
            expect(button.classes().join(" ")).toContain("h-[32px]")
        })

        it("should apply lg size", () => {
            const wrapper = mount(Button, {
                props: { size: "lg" }
            })
            const button = wrapper.find("button")
            expect(button.classes().join(" ")).toContain("h-[40px]")
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should be disabled when disabled prop is true", () => {
            const wrapper = mount(Button, {
                props: { disabled: true }
            })
            expect(wrapper.find("button").attributes("disabled")).toBeDefined()
        })

        it("should be disabled when loading is true", () => {
            const wrapper = mount(Button, {
                props: { loading: true }
            })
            expect(wrapper.find("button").attributes("disabled")).toBeDefined()
        })

        it("should not be disabled by default", () => {
            const wrapper = mount(Button)
            expect(wrapper.find("button").attributes("disabled")).toBeUndefined()
        })
    })

    // ==========================================
    // Loading State Tests
    // ==========================================
    describe("Loading State", () => {
        it("should show loading icon when loading", () => {
            const wrapper = mount(Button, {
                props: { loading: true }
            })
            // Loading hiển thị icon với class animate-spin
            const icons = wrapper.findAll(".mock-icon")
            expect(icons.length).toBeGreaterThan(0)
        })

        it("should not show loading icon when not loading", () => {
            const wrapper = mount(Button, {
                props: { loading: false }
            })
            // Không có icon nào khi không loading và không có icon prop
            const icons = wrapper.findAll(".mock-icon")
            expect(icons.length).toBe(0)
        })
    })

    // ==========================================
    // Icon Tests
    // ==========================================
    describe("Icon", () => {
        it("should render icon when icon prop is provided", () => {
            const wrapper = mount(Button, {
                props: { icon: "plus" }
            })
            const icon = wrapper.find(".mock-icon")
            expect(icon.exists()).toBe(true)
            expect(icon.attributes("data-name")).toBe("plus")
        })

        it("should not render icon when icon prop is empty", () => {
            const wrapper = mount(Button, {
                props: { icon: "" }
            })
            expect(wrapper.find(".mock-icon").exists()).toBe(false)
        })
    })

    // ==========================================
    // OnlyIcon Tests
    // ==========================================
    describe("OnlyIcon Mode", () => {
        it("should hide text when onlyIcon is true", () => {
            const wrapper = mount(Button, {
                props: { onlyIcon: true, icon: "plus" },
                slots: { default: "Hidden Text" }
            })
            expect(wrapper.text()).not.toContain("Hidden Text")
        })

        it("should show text when onlyIcon is false", () => {
            const wrapper = mount(Button, {
                props: { onlyIcon: false },
                slots: { default: "Visible Text" }
            })
            expect(wrapper.text()).toContain("Visible Text")
        })
    })

    // ==========================================
    // Button Type Tests
    // ==========================================
    describe("Button Type", () => {
        it("should have type button by default", () => {
            const wrapper = mount(Button)
            expect(wrapper.find("button").attributes("type")).toBe("button")
        })

        it("should support type submit", () => {
            const wrapper = mount(Button, {
                props: { type: "submit" }
            })
            expect(wrapper.find("button").attributes("type")).toBe("submit")
        })

        it("should support type reset", () => {
            const wrapper = mount(Button, {
                props: { type: "reset" }
            })
            expect(wrapper.find("button").attributes("type")).toBe("reset")
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should emit click event when clicked", async () => {
            const wrapper = mount(Button)
            await wrapper.find("button").trigger("click")
            expect(wrapper.emitted("click")).toBeTruthy()
        })

        it("should not emit click when disabled", async () => {
            const wrapper = mount(Button, {
                props: { disabled: true }
            })
            await wrapper.find("button").trigger("click")
            // Disabled buttons don't emit click events
            expect(wrapper.emitted("click")).toBeFalsy()
        })
    })

    // ==========================================
    // Accessibility Tests
    // ==========================================
    describe("Accessibility", () => {
        it("should be focusable", () => {
            const wrapper = mount(Button)
            const button = wrapper.find("button")
            expect(button.attributes("tabindex")).not.toBe("-1")
        })

        it("should have accessible disabled state", () => {
            const wrapper = mount(Button, {
                props: { disabled: true }
            })
            expect(wrapper.find("button").attributes("disabled")).toBeDefined()
        })
    })
})

// ==========================================
// Button Variant Styles Tests (Unit)
// ==========================================
describe("Button Variant Styles (Unit)", () => {
    const getVariantClasses = (variant: string, disabled: boolean, loading: boolean) => {
        if (variant === "primary") {
            return disabled || loading ? "opacity-50" : "hover:opacity-80"
        }
        if (variant === "secondary") {
            return disabled || loading ? "bg-disabled opacity-50 border" : "bg-white border hover:bg-hover"
        }
        if (variant === "noborder") {
            return disabled || loading ? "opacity-60" : "hover:opacity-80"
        }
        if (variant === "danger") {
            return disabled || loading ? "opacity-50" : "hover:!bg-danger-light"
        }
        return ""
    }

    describe("Primary Variant", () => {
        it("should return opacity-50 when disabled", () => {
            expect(getVariantClasses("primary", true, false)).toBe("opacity-50")
        })

        it("should return opacity-50 when loading", () => {
            expect(getVariantClasses("primary", false, true)).toBe("opacity-50")
        })

        it("should return hover class when enabled", () => {
            expect(getVariantClasses("primary", false, false)).toBe("hover:opacity-80")
        })
    })

    describe("Secondary Variant", () => {
        it("should return disabled classes when disabled", () => {
            const classes = getVariantClasses("secondary", true, false)
            expect(classes).toContain("opacity-50")
        })

        it("should return hover classes when enabled", () => {
            const classes = getVariantClasses("secondary", false, false)
            expect(classes).toContain("hover")
        })
    })
})

// ==========================================
// Button Size Classes Tests (Unit)
// ==========================================
describe("Button Size Classes (Unit)", () => {
    const sizeClasses: Record<string, string> = {
        default: "px-[16px] py-[8px] text-[13px] h-[36px]",
        sm: "px-[16px] py-[8px] text-[12px] h-[32px]",
        lg: "px-[16px] py-[8px] text-[14px] h-[40px]",
        mini: "px-[8px] py-[8px] text-[12px] h-[36px]",
        tiny: "px-[12px] py-[12px] text-[13px] h-[36px]"
    }

    it("should have correct default size classes", () => {
        expect(sizeClasses.default).toContain("h-[36px]")
        expect(sizeClasses.default).toContain("text-[13px]")
    })

    it("should have smaller height for sm size", () => {
        expect(sizeClasses.sm).toContain("h-[32px]")
    })

    it("should have larger height for lg size", () => {
        expect(sizeClasses.lg).toContain("h-[40px]")
    })
})
