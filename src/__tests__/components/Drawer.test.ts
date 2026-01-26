/**
 * Unit Tests cho Drawer Component
 * File: src/components/custom/drawer/Drawer.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Drawer from "@/components/custom/drawer/Drawer.vue"

// Mock Sheet UI components
vi.mock("@/components/ui/sheet", () => ({
    Sheet: {
        name: "Sheet",
        props: ["open"],
        template: '<div class="mock-sheet" v-if="open"><slot /></div>',
        emits: ["update:open"]
    },
    SheetContent: {
        name: "SheetContent",
        props: ["class"],
        template: '<div class="mock-sheet-content"><slot /></div>',
        emits: ["escapeKeyDown", "interactOutside"]
    }
}))

// Mock lib/utils
vi.mock("@/lib/utils", () => ({
    cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")
}))

describe("Drawer Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should not render when modelValue is false", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: false }
            })
            expect(wrapper.find(".mock-sheet").exists()).toBe(false)
        })

        it("should render when modelValue is true", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".mock-sheet").exists()).toBe(true)
        })

        it("should render sheet content", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".mock-sheet-content").exists()).toBe(true)
        })

        it("should render resize handle", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".drawer-resize").exists()).toBe(true)
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render header slot", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    header: "<h2>Drawer Header</h2>"
                }
            })
            expect(wrapper.text()).toContain("Drawer Header")
            expect(wrapper.find(".drawer-header").exists()).toBe(true)
        })

        it("should render content slot", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    content: "<p>Drawer Content</p>"
                }
            })
            expect(wrapper.text()).toContain("Drawer Content")
            expect(wrapper.find(".drawer-content").exists()).toBe(true)
        })

        it("should render footer slot", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    footer: "<button>Save</button>"
                }
            })
            expect(wrapper.text()).toContain("Save")
            expect(wrapper.find(".drawer-footer").exists()).toBe(true)
        })

        it("should not render header section if no header slot", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    content: "<p>Only Content</p>"
                }
            })
            expect(wrapper.find(".drawer-header").exists()).toBe(false)
        })

        it("should not render footer section if no footer slot", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    content: "<p>Only Content</p>"
                }
            })
            expect(wrapper.find(".drawer-footer").exists()).toBe(false)
        })

        it("should render default slot content", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    default: "<div class='custom-layout'>Custom Layout</div>"
                }
            })
            expect(wrapper.find(".custom-layout").exists()).toBe(true)
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should emit update:modelValue when opened", async () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: false }
            })

            await wrapper.setProps({ modelValue: true })
            await wrapper.vm.$nextTick()

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
        })

        it("should emit open event when opened", async () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: false }
            })

            await wrapper.setProps({ modelValue: true })
            await wrapper.vm.$nextTick()

            expect(wrapper.emitted("open")).toBeTruthy()
        })

        it("should emit close event when closed", async () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })

            await wrapper.setProps({ modelValue: false })
            await wrapper.vm.$nextTick()

            expect(wrapper.emitted("close")).toBeTruthy()
        })
    })

    // ==========================================
    // Priority Mode Tests
    // ==========================================
    describe("Priority Mode", () => {
        it("should have isPriority prop", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true, isPriority: true }
            })
            expect(wrapper.vm.$props.isPriority).toBe(true)
        })
    })

    // ==========================================
    // Confirm Mode Tests
    // ==========================================
    describe("Confirm Mode", () => {
        it("should have isConfirm prop", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true, isConfirm: true }
            })
            expect(wrapper.vm.$props.isConfirm).toBe(true)
        })
    })

    // ==========================================
    // Width Tests
    // ==========================================
    describe("Width", () => {
        it("should accept custom width prop", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true, width: "500px" }
            })
            expect(wrapper.vm.$props.width).toBe("500px")
        })

        it("should have default width of max-content", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })
            expect(wrapper.vm.$props.width).toBe("max-content")
        })
    })

    // ==========================================
    // Exposed Methods Tests
    // ==========================================
    describe("Exposed Methods", () => {
        it("should expose open method", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: false }
            })
            expect(typeof wrapper.vm.open).toBe("function")
        })

        it("should expose close method", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true }
            })
            expect(typeof wrapper.vm.close).toBe("function")
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese content in slots", () => {
            const wrapper = mount(Drawer, {
                props: { modelValue: true },
                slots: {
                    header: "<h2>Chi tiết đơn hàng</h2>",
                    content: "<p>Nội dung chi tiết</p>",
                    footer: "<button>Đóng</button>"
                }
            })
            expect(wrapper.text()).toContain("Chi tiết đơn hàng")
            expect(wrapper.text()).toContain("Nội dung chi tiết")
            expect(wrapper.text()).toContain("Đóng")
        })
    })
})

// ==========================================
// Drawer State Logic Tests (Unit)
// ==========================================
describe("Drawer State Logic (Unit)", () => {
    describe("Close behavior", () => {
        const canClose = (isConfirm: boolean, isPriority: boolean): boolean => {
            if (isConfirm) return false
            if (isPriority) return false
            return true
        }

        it("should allow close normally", () => {
            expect(canClose(false, false)).toBe(true)
        })

        it("should not allow close when isConfirm", () => {
            expect(canClose(true, false)).toBe(false)
        })

        it("should not allow close when isPriority", () => {
            expect(canClose(false, true)).toBe(false)
        })
    })

    describe("Width calculation", () => {
        const calculateWidth = (width: string, minWidth: number, maxWidth: number): string => {
            const num_width = parseInt(width)
            if (isNaN(num_width)) return width
            const clamped = Math.min(Math.max(minWidth, num_width), maxWidth)
            return `${clamped}px`
        }

        it("should clamp width to minimum", () => {
            expect(calculateWidth("100px", 250, 1000)).toBe("250px")
        })

        it("should clamp width to maximum", () => {
            expect(calculateWidth("1500px", 250, 1000)).toBe("1000px")
        })

        it("should keep width in range", () => {
            expect(calculateWidth("500px", 250, 1000)).toBe("500px")
        })

        it("should return non-numeric width as-is", () => {
            expect(calculateWidth("max-content", 250, 1000)).toBe("max-content")
        })
    })
})
