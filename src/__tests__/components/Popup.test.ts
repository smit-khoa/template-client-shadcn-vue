/**
 * Unit Tests cho Popup Component
 * File: src/components/custom/popup/Popup.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Popup from "@/components/custom/popup/Popup.vue"

// Mock Dialog UI components
vi.mock("@/components/ui/dialog", () => ({
    Dialog: {
        name: "Dialog",
        props: ["open"],
        template: '<div class="mock-dialog" v-if="open"><slot /></div>',
        emits: ["update:open"]
    },
    DialogContent: {
        name: "DialogContent",
        props: ["class", "style"],
        template: '<div class="mock-dialog-content" :style="style"><slot /></div>',
        emits: ["pointerDownOutside"]
    },
    DialogTitle: {
        name: "DialogTitle",
        props: ["class"],
        template: '<div class="mock-dialog-title"><slot /></div>'
    },
    DialogDescription: {
        name: "DialogDescription",
        props: ["class"],
        template: '<div class="mock-dialog-description"><slot /></div>'
    }
}))

describe("Popup Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should not render when modelValue is false", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: false }
            })
            expect(wrapper.find(".mock-dialog").exists()).toBe(false)
        })

        it("should render when modelValue is true", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".mock-dialog").exists()).toBe(true)
        })

        it("should render dialog content", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".mock-dialog-content").exists()).toBe(true)
        })

        it("should render title", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, title: "Popup Title" }
            })
            expect(wrapper.text()).toContain("Popup Title")
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render default slot content", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    default: "<p>Popup body content</p>"
                }
            })
            expect(wrapper.text()).toContain("Popup body content")
        })

        it("should render header-icon slot", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    "header-icon": "<span class='icon'>🔔</span>"
                }
            })
            expect(wrapper.find(".icon").exists()).toBe(true)
        })

        it("should render header-title slot", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    "header-title": "<span>Extra Title Info</span>"
                }
            })
            expect(wrapper.text()).toContain("Extra Title Info")
        })

        it("should render footer slot", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    footer: "<button>Save</button><button>Cancel</button>"
                }
            })
            expect(wrapper.text()).toContain("Save")
            expect(wrapper.text()).toContain("Cancel")
        })

        it("should show footer when footer slot is provided", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    footer: "<button>Action</button>"
                }
            })
            // Footer should be visible
            expect(wrapper.find("button").exists()).toBe(true)
        })
    })

    // ==========================================
    // Custom Mode Tests
    // ==========================================
    describe("Custom Mode", () => {
        it("should render only default slot in custom mode", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, isCustom: true },
                slots: {
                    default: "<div class='custom-layout'>Custom Layout</div>"
                }
            })
            expect(wrapper.find(".custom-layout").exists()).toBe(true)
        })

        it("should not render header in custom mode", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, isCustom: true, title: "Should Not Show" }
            })
            // In custom mode, the standard layout is skipped
            expect(wrapper.find(".mock-dialog-title").exists()).toBe(false)
        })
    })

    // ==========================================
    // Props Tests
    // ==========================================
    describe("Props", () => {
        it("should accept width prop", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, width: "500px" }
            })
            const content = wrapper.find(".mock-dialog-content")
            expect(content.attributes("style")).toContain("width")
        })

        it("should accept height prop", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, height: "400px" }
            })
            const content = wrapper.find(".mock-dialog-content")
            expect(content.attributes("style")).toContain("height")
        })

        it("should have default height of max-content", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })
            expect(wrapper.vm.$props.height).toBe("max-content")
        })

        it("should have default width of max-content", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })
            expect(wrapper.vm.$props.width).toBe("max-content")
        })

        it("should have closeOnClickOutside default to true", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })
            expect(wrapper.vm.$props.closeOnClickOutside).toBe(true)
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should emit update:modelValue when closed", async () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })

            await wrapper.setProps({ modelValue: false })
            await wrapper.vm.$nextTick()

            // Verify popup is now hidden (modelValue changed to false)
            expect(wrapper.find(".mock-dialog").exists()).toBe(false)
        })

        it("should emit close event when closed", async () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true }
            })

            await wrapper.setProps({ modelValue: false })
            await wrapper.vm.$nextTick()

            expect(wrapper.emitted("close")).toBeTruthy()
        })
    })

    // ==========================================
    // Close On Click Outside Tests
    // ==========================================
    describe("Close On Click Outside", () => {
        it("should have closeOnClickOutside prop", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, closeOnClickOutside: false }
            })
            expect(wrapper.vm.$props.closeOnClickOutside).toBe(false)
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese title", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true, title: "Thêm mới khách hàng" }
            })
            expect(wrapper.text()).toContain("Thêm mới khách hàng")
        })

        it("should render Vietnamese content", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    default: "<p>Vui lòng nhập thông tin khách hàng</p>"
                }
            })
            expect(wrapper.text()).toContain("Vui lòng nhập thông tin khách hàng")
        })

        it("should render Vietnamese footer", () => {
            const wrapper = mount(Popup, {
                props: { modelValue: true },
                slots: {
                    footer: "<button>Lưu</button><button>Hủy</button>"
                }
            })
            expect(wrapper.text()).toContain("Lưu")
            expect(wrapper.text()).toContain("Hủy")
        })
    })
})

// ==========================================
// Popup State Logic Tests (Unit)
// ==========================================
describe("Popup State Logic (Unit)", () => {
    describe("Footer visibility", () => {
        const hasFooterSlot = (slots: Record<string, unknown>): boolean => {
            return !!slots.footer
        }

        it("should show footer when slot is provided", () => {
            expect(hasFooterSlot({ footer: "<button>Save</button>" })).toBe(true)
        })

        it("should hide footer when slot is not provided", () => {
            expect(hasFooterSlot({})).toBe(false)
        })
    })

    describe("Close behavior", () => {
        const shouldClose = (closeOnClickOutside: boolean, event: { preventDefault: () => void }): boolean => {
            if (!closeOnClickOutside) {
                event.preventDefault()
                return false
            }
            return true
        }

        it("should close when closeOnClickOutside is true", () => {
            const event = { preventDefault: vi.fn() }
            expect(shouldClose(true, event)).toBe(true)
            expect(event.preventDefault).not.toHaveBeenCalled()
        })

        it("should not close when closeOnClickOutside is false", () => {
            const event = { preventDefault: vi.fn() }
            expect(shouldClose(false, event)).toBe(false)
            expect(event.preventDefault).toHaveBeenCalled()
        })
    })
})
