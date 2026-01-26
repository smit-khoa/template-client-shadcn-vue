/**
 * Unit Tests cho Accordion Component
 * File: src/components/custom/accordion/Accordion.vue
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Accordion from "@/components/custom/accordion/Accordion.vue"

describe("Accordion Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render accordion container", () => {
            const wrapper = mount(Accordion)
            expect(wrapper.find(".border").exists()).toBe(true)
        })

        it("should render title slot", () => {
            const wrapper = mount(Accordion, {
                slots: {
                    title: "<h3>Accordion Title</h3>"
                }
            })
            expect(wrapper.text()).toContain("Accordion Title")
        })

        it("should not show content by default", () => {
            const wrapper = mount(Accordion, {
                slots: {
                    content: "<p>Accordion Content</p>"
                }
            })
            expect(wrapper.text()).not.toContain("Accordion Content")
        })

        it("should have cursor-pointer when not disabled", () => {
            const wrapper = mount(Accordion)
            expect(wrapper.find(".cursor-pointer").exists()).toBe(true)
        })
    })

    // ==========================================
    // Toggle Tests
    // ==========================================
    describe("Toggle", () => {
        it("should show content after click", async () => {
            const wrapper = mount(Accordion, {
                slots: {
                    title: "<h3>Title</h3>",
                    content: "<p>Content Here</p>"
                }
            })

            await wrapper.find(".bg-white").trigger("click")
            expect(wrapper.text()).toContain("Content Here")
        })

        it("should hide content after second click", async () => {
            const wrapper = mount(Accordion, {
                slots: {
                    content: "<p>Content Here</p>"
                }
            })

            const toggle = wrapper.find(".bg-white")
            await toggle.trigger("click")
            expect(wrapper.text()).toContain("Content Here")

            await toggle.trigger("click")
            expect(wrapper.text()).not.toContain("Content Here")
        })

        it("should emit open event when opened", async () => {
            const wrapper = mount(Accordion)

            await wrapper.find(".bg-white").trigger("click")

            expect(wrapper.emitted("open")).toBeTruthy()
        })

        it("should emit close event when closed", async () => {
            const wrapper = mount(Accordion)

            const toggle = wrapper.find(".bg-white")
            await toggle.trigger("click")
            await toggle.trigger("click")

            expect(wrapper.emitted("close")).toBeTruthy()
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should not toggle when disabled", async () => {
            const wrapper = mount(Accordion, {
                props: { disabled: true },
                slots: {
                    content: "<p>Content</p>"
                }
            })

            await wrapper.find(".bg-white").trigger("click")

            expect(wrapper.text()).not.toContain("Content")
            expect(wrapper.emitted("open")).toBeFalsy()
        })

        it("should not have cursor-pointer when disabled", () => {
            const wrapper = mount(Accordion, {
                props: { disabled: true }
            })
            expect(wrapper.find(".cursor-pointer").exists()).toBe(false)
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should be open when modelValue is true", async () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: true },
                slots: {
                    content: "<p>Content</p>"
                }
            })

            // Wait for mounted hook
            await wrapper.vm.$nextTick()

            expect(wrapper.text()).toContain("Content")
        })

        it("should be closed when modelValue is false", () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: false },
                slots: {
                    content: "<p>Content</p>"
                }
            })

            expect(wrapper.text()).not.toContain("Content")
        })

        it("should emit update:modelValue on toggle", async () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: false }
            })

            await wrapper.find(".bg-white").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
        })

        it("should react to modelValue changes", async () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: false },
                slots: {
                    content: "<p>Dynamic Content</p>"
                }
            })

            expect(wrapper.text()).not.toContain("Dynamic Content")

            await wrapper.setProps({ modelValue: true })
            expect(wrapper.text()).toContain("Dynamic Content")
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render complex title slot", () => {
            const wrapper = mount(Accordion, {
                slots: {
                    title: `
                        <div class="flex items-center gap-2">
                            <span class="icon">📁</span>
                            <span class="text">Folder Name</span>
                        </div>
                    `
                }
            })

            expect(wrapper.find(".icon").exists()).toBe(true)
            expect(wrapper.text()).toContain("Folder Name")
        })

        it("should render complex content slot", async () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: true },
                slots: {
                    content: `
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    `
                }
            })

            await wrapper.vm.$nextTick()

            expect(wrapper.findAll("li")).toHaveLength(3)
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese title", () => {
            const wrapper = mount(Accordion, {
                slots: {
                    title: "<h3>Câu hỏi thường gặp</h3>"
                }
            })
            expect(wrapper.text()).toContain("Câu hỏi thường gặp")
        })

        it("should render Vietnamese content", async () => {
            const wrapper = mount(Accordion, {
                props: { modelValue: true },
                slots: {
                    content: "<p>Đây là nội dung câu trả lời</p>"
                }
            })

            await wrapper.vm.$nextTick()

            expect(wrapper.text()).toContain("Đây là nội dung câu trả lời")
        })
    })
})

// ==========================================
// Accordion State Logic Tests (Unit)
// ==========================================
describe("Accordion State Logic (Unit)", () => {
    const toggleState = (current: boolean, disabled: boolean): boolean => {
        if (disabled) return current
        return !current
    }

    it("should toggle state when not disabled", () => {
        expect(toggleState(false, false)).toBe(true)
        expect(toggleState(true, false)).toBe(false)
    })

    it("should not toggle when disabled", () => {
        expect(toggleState(false, true)).toBe(false)
        expect(toggleState(true, true)).toBe(true)
    })
})
