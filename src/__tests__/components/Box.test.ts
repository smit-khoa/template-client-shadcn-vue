/**
 * Unit Tests cho Box Component THẬT
 * File: src/components/custom/box/Box.vue
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Box from "@/components/custom/box/Box.vue"

describe("Box Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render box element", () => {
            const wrapper = mount(Box)
            expect(wrapper.find("div").exists()).toBe(true)
        })

        it("should render slot content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "Box Content"
                }
            })
            expect(wrapper.text()).toBe("Box Content")
        })

        it("should render HTML slot content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "<span class='inner'>Inner Content</span>"
                }
            })
            expect(wrapper.find(".inner").exists()).toBe(true)
            expect(wrapper.find(".inner").text()).toBe("Inner Content")
        })

        it("should render complex slot content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: `
                        <div class="header">Header</div>
                        <div class="body">Body</div>
                        <div class="footer">Footer</div>
                    `
                }
            })
            expect(wrapper.find(".header").exists()).toBe(true)
            expect(wrapper.find(".body").exists()).toBe(true)
            expect(wrapper.find(".footer").exists()).toBe(true)
        })
    })

    // ==========================================
    // State Tests
    // ==========================================
    describe("States", () => {
        it("should have default state by default", () => {
            const wrapper = mount(Box)
            expect(wrapper.classes().join(" ")).toContain("cursor-pointer")
        })

        it("should apply default state class", () => {
            const wrapper = mount(Box, {
                props: { state: "default" }
            })
            expect(wrapper.classes().join(" ")).toContain("cursor-pointer")
            expect(wrapper.classes().join(" ")).toContain("hover:bg-[var(--button-secondary-bg-hover)]")
        })

        it("should apply selected state class", () => {
            const wrapper = mount(Box, {
                props: { state: "selected" }
            })
            expect(wrapper.classes().join(" ")).toContain("bg-[#e7fdf8]")
            expect(wrapper.classes().join(" ")).toContain("border-[var(--border-primary)]")
        })

        it("should apply disabled state class", () => {
            const wrapper = mount(Box, {
                props: { state: "disabled" }
            })
            expect(wrapper.classes().join(" ")).toContain("opacity-40")
            expect(wrapper.classes().join(" ")).toContain("cursor-not-allowed")
        })
    })

    // ==========================================
    // Custom Class Tests
    // ==========================================
    describe("Custom Class", () => {
        it("should accept custom class", () => {
            const wrapper = mount(Box, {
                props: { class: "my-custom-class" }
            })
            expect(wrapper.classes()).toContain("my-custom-class")
        })

        it("should combine state class with custom class", () => {
            const wrapper = mount(Box, {
                props: { state: "selected", class: "highlight" }
            })
            const classes = wrapper.classes().join(" ")
            expect(classes).toContain("bg-[#e7fdf8]")
            expect(classes).toContain("highlight")
        })

        it("should accept multiple custom classes", () => {
            const wrapper = mount(Box, {
                props: { class: "p-4 rounded-lg shadow-md" }
            })
            const classes = wrapper.classes()
            expect(classes).toContain("p-4")
            expect(classes).toContain("rounded-lg")
            expect(classes).toContain("shadow-md")
        })
    })

    // ==========================================
    // Interaction Tests
    // ==========================================
    describe("Interactions", () => {
        it("should emit click event", async () => {
            const wrapper = mount(Box)
            await wrapper.trigger("click")
            expect(wrapper.emitted("click")).toBeTruthy()
        })

        it("should not prevent click in any state", async () => {
            const states = ["default", "selected", "disabled"] as const

            for (const state of states) {
                const wrapper = mount(Box, {
                    props: { state }
                })
                await wrapper.trigger("click")
                expect(wrapper.emitted("click")).toBeTruthy()
            }
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese text content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "Nội dung tiếng Việt"
                }
            })
            expect(wrapper.text()).toBe("Nội dung tiếng Việt")
        })

        it("should render Vietnamese special characters", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "Đây là ô chứa thông tin đặc biệt"
                }
            })
            expect(wrapper.text()).toContain("Đây là ô chứa thông tin đặc biệt")
        })
    })

    // ==========================================
    // Edge Cases Tests
    // ==========================================
    describe("Edge Cases", () => {
        it("should render empty box", () => {
            const wrapper = mount(Box)
            expect(wrapper.exists()).toBe(true)
            expect(wrapper.text()).toBe("")
        })

        it("should handle whitespace content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "   "
                }
            })
            expect(wrapper.text().trim()).toBe("")
        })

        it("should handle numeric content", () => {
            const wrapper = mount(Box, {
                slots: {
                    default: "12345"
                }
            })
            expect(wrapper.text()).toBe("12345")
        })
    })

    // ==========================================
    // Base Styling Tests
    // ==========================================
    describe("Base Styling", () => {
        it("should have base padding", () => {
            const wrapper = mount(Box)
            expect(wrapper.classes().join(" ")).toContain("px-[12px]")
            expect(wrapper.classes().join(" ")).toContain("py-[10px]")
        })

        it("should have border", () => {
            const wrapper = mount(Box)
            expect(wrapper.classes().join(" ")).toContain("border")
        })

        it("should have rounded corners", () => {
            const wrapper = mount(Box)
            expect(wrapper.classes().join(" ")).toContain("rounded-xl")
        })

        it("should have transition", () => {
            const wrapper = mount(Box)
            expect(wrapper.classes().join(" ")).toContain("transition-all")
        })
    })
})

// ==========================================
// Box State Classes Logic Tests (Unit)
// ==========================================
describe("Box State Classes Logic (Unit)", () => {
    const getBoxClasses = (state: string, custom_class: string = ""): string => {
        const classes: string[] = []

        switch (state) {
            case "default":
                classes.push("border-[var(--border)] cursor-pointer hover:bg-[var(--button-secondary-bg-hover)]")
                break
            case "selected":
                classes.push("bg-[#e7fdf8] border-[var(--border-primary)] cursor-pointer")
                break
            case "disabled":
                classes.push("border-[var(--border)] opacity-40 cursor-not-allowed")
                break
            default:
                classes.push("bg-white")
        }

        if (custom_class) {
            classes.push(custom_class)
        }

        return classes.join(" ")
    }

    describe("State Classes", () => {
        it("should return default classes", () => {
            const classes = getBoxClasses("default")
            expect(classes).toContain("cursor-pointer")
            expect(classes).toContain("hover:bg-[var(--button-secondary-bg-hover)]")
        })

        it("should return selected classes", () => {
            const classes = getBoxClasses("selected")
            expect(classes).toContain("bg-[#e7fdf8]")
            expect(classes).toContain("border-[var(--border-primary)]")
        })

        it("should return disabled classes", () => {
            const classes = getBoxClasses("disabled")
            expect(classes).toContain("opacity-40")
            expect(classes).toContain("cursor-not-allowed")
        })

        it("should fallback to white bg for unknown state", () => {
            const classes = getBoxClasses("unknown")
            expect(classes).toContain("bg-white")
        })
    })

    describe("Custom Classes", () => {
        it("should include custom class", () => {
            const classes = getBoxClasses("default", "custom-class")
            expect(classes).toContain("custom-class")
        })

        it("should combine state and custom classes correctly", () => {
            const classes = getBoxClasses("selected", "highlight")
            expect(classes).toContain("bg-[#e7fdf8]")
            expect(classes).toContain("highlight")
        })
    })
})
