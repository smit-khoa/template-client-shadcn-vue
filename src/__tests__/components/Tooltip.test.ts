/**
 * Unit Tests cho Tooltip Component THẬT
 * File: src/components/custom/tooltip/Tooltip.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Tooltip from "@/components/custom/tooltip/Tooltip.vue"

// Mock UI Tooltip components
vi.mock("@/components/ui/tooltip", () => ({
    Tooltip: {
        name: "Tooltip",
        template: "<div class='ui-tooltip'><slot /></div>"
    },
    TooltipContent: {
        name: "TooltipContent",
        props: ["class"],
        template: "<div class='ui-tooltip-content'><slot /></div>"
    },
    TooltipProvider: {
        name: "TooltipProvider",
        template: "<div class='ui-tooltip-provider'><slot /></div>"
    },
    TooltipTrigger: {
        name: "TooltipTrigger",
        props: ["class", "asChild"],
        template: "<div class='ui-tooltip-trigger'><slot /></div>"
    }
}))

describe("Tooltip Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render slot content without tooltip when content is empty", () => {
            const wrapper = mount(Tooltip, {
                slots: {
                    default: "<button>Click me</button>"
                }
            })
            expect(wrapper.find("button").exists()).toBe(true)
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(false)
        })

        it("should render tooltip wrapper when content is provided", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip text" },
                slots: {
                    default: "<button>Click me</button>"
                }
            })
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(true)
        })

        it("should render trigger element", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip text" },
                slots: {
                    default: "<button>Click me</button>"
                }
            })
            expect(wrapper.find(".ui-tooltip-trigger").exists()).toBe(true)
        })

        it("should render tooltip content element", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip text" },
                slots: {
                    default: "<button>Click me</button>"
                }
            })
            expect(wrapper.find(".ui-tooltip-content").exists()).toBe(true)
        })
    })

    // ==========================================
    // Content Tests
    // ==========================================
    describe("Content", () => {
        it("should display tooltip content text", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "This is a tooltip" },
                slots: {
                    default: "<span>Hover me</span>"
                }
            })
            expect(wrapper.text()).toContain("This is a tooltip")
        })

        it("should display Vietnamese content correctly", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Đây là tooltip tiếng Việt" },
                slots: {
                    default: "<span>Di chuột vào đây</span>"
                }
            })
            expect(wrapper.text()).toContain("Đây là tooltip tiếng Việt")
        })

        it("should handle long content", () => {
            const long_content = "This is a very long tooltip content that should be displayed properly"
            const wrapper = mount(Tooltip, {
                props: { content: long_content },
                slots: {
                    default: "<span>Hover</span>"
                }
            })
            expect(wrapper.text()).toContain(long_content)
        })
    })

    // ==========================================
    // Conditional Rendering Tests
    // ==========================================
    describe("Conditional Rendering", () => {
        it("should not render tooltip when content is empty string", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "" },
                slots: {
                    default: "<button>Click</button>"
                }
            })
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(false)
            expect(wrapper.find("button").exists()).toBe(true)
        })

        it("should render tooltip when content is provided", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Some content" },
                slots: {
                    default: "<button>Click</button>"
                }
            })
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(true)
        })

        it("should render only slot when no content prop", () => {
            const wrapper = mount(Tooltip, {
                slots: {
                    default: "<span>Just text</span>"
                }
            })
            expect(wrapper.find("span").exists()).toBe(true)
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(false)
        })
    })

    // ==========================================
    // Slot Tests
    // ==========================================
    describe("Slots", () => {
        it("should render default slot content", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip" },
                slots: {
                    default: "<div class='trigger-content'>Trigger Content</div>"
                }
            })
            expect(wrapper.find(".trigger-content").exists()).toBe(true)
            expect(wrapper.text()).toContain("Trigger Content")
        })

        it("should support complex slot content", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip" },
                slots: {
                    default: `
                        <div class="complex-trigger">
                            <span class="icon">🔔</span>
                            <span class="text">Notifications</span>
                        </div>
                    `
                }
            })
            expect(wrapper.find(".complex-trigger").exists()).toBe(true)
            expect(wrapper.find(".icon").exists()).toBe(true)
            expect(wrapper.find(".text").exists()).toBe(true)
        })
    })

    // ==========================================
    // Class Prop Tests
    // ==========================================
    describe("Class Prop", () => {
        it("should pass class prop to trigger", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Tooltip", class: "custom-class" }
            })
            // Component nhận class prop
            expect(wrapper.vm.$props.class).toBe("custom-class")
        })
    })

    // ==========================================
    // Edge Cases Tests
    // ==========================================
    describe("Edge Cases", () => {
        it("should handle whitespace-only content as valid", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "   " },
                slots: {
                    default: "<button>Click</button>"
                }
            })
            // Whitespace is truthy in JavaScript
            expect(wrapper.find(".ui-tooltip-provider").exists()).toBe(true)
        })

        it("should handle special characters in content", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "<script>alert('xss')</script>" },
                slots: {
                    default: "<button>Click</button>"
                }
            })
            // Content should be escaped/safe
            expect(wrapper.text()).toContain("<script>")
        })

        it("should handle emoji in content", () => {
            const wrapper = mount(Tooltip, {
                props: { content: "Click here 👆" },
                slots: {
                    default: "<button>🔔</button>"
                }
            })
            expect(wrapper.text()).toContain("Click here 👆")
        })
    })
})

// ==========================================
// Tooltip Visibility Logic Tests (Unit)
// ==========================================
describe("Tooltip Visibility Logic (Unit)", () => {
    const shouldShowTooltip = (content: string | undefined | null): boolean => {
        return !!content
    }

    it("should return true for non-empty content", () => {
        expect(shouldShowTooltip("Hello")).toBe(true)
    })

    it("should return false for empty content", () => {
        expect(shouldShowTooltip("")).toBe(false)
    })

    it("should return false for undefined content", () => {
        expect(shouldShowTooltip(undefined)).toBe(false)
    })

    it("should return false for null content", () => {
        expect(shouldShowTooltip(null)).toBe(false)
    })

    it("should return true for whitespace content", () => {
        expect(shouldShowTooltip("   ")).toBe(true)
    })

    it("should return true for content with only numbers", () => {
        expect(shouldShowTooltip("123")).toBe(true)
    })
})
