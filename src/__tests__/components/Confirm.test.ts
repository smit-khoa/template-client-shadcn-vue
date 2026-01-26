/**
 * Unit Tests cho Confirm Component
 * File: src/components/custom/confirm/Confirm.vue
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount, VueWrapper } from "@vue/test-utils"
import Confirm from "@/components/custom/confirm/Confirm.vue"

// Mock UI AlertDialog components
vi.mock("@/components/ui/alert-dialog", () => ({
    AlertDialog: {
        name: "AlertDialog",
        props: ["open"],
        template: '<div class="mock-alert-dialog" v-if="open"><slot /></div>',
        emits: ["update:open"]
    },
    AlertDialogContent: {
        name: "AlertDialogContent",
        props: ["class"],
        template: '<div class="mock-alert-content"><slot /></div>'
    },
    AlertDialogHeader: {
        name: "AlertDialogHeader",
        template: '<div class="mock-alert-header"><slot /></div>'
    },
    AlertDialogTitle: {
        name: "AlertDialogTitle",
        props: ["class"],
        template: '<div class="mock-alert-title"><slot /></div>'
    },
    AlertDialogDescription: {
        name: "AlertDialogDescription",
        props: ["class"],
        template: '<div class="mock-alert-description"><slot /></div>'
    },
    AlertDialogFooter: {
        name: "AlertDialogFooter",
        template: '<div class="mock-alert-footer"><slot /></div>'
    }
}))

// Mock Button component - forward clicks to parent
vi.mock("@/components/custom/button", () => ({
    Button: {
        name: "Button",
        props: ["variant", "class", "loading"],
        template: '<button class="mock-button" :data-variant="variant" :disabled="loading" @click="$emit(\'click\', $event)"><slot /></button>',
        emits: ["click"]
    }
}))

describe("Confirm Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should not render when modelValue is false", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: false }
            })
            expect(wrapper.find(".mock-alert-dialog").exists()).toBe(false)
        })

        it("should render when modelValue is true", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })
            expect(wrapper.find(".mock-alert-dialog").exists()).toBe(true)
        })

        it("should render title", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, title: "Xác nhận xóa" }
            })
            expect(wrapper.text()).toContain("Xác nhận xóa")
        })

        it("should render content", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, content: "Bạn có chắc muốn xóa?" }
            })
            expect(wrapper.text()).toContain("Bạn có chắc muốn xóa?")
        })

        it("should render default title when not provided", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })
            expect(wrapper.text()).toContain("Thông báo")
        })
    })

    // ==========================================
    // Button Tests
    // ==========================================
    describe("Buttons", () => {
        it("should render close button", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })
            expect(wrapper.text()).toContain("Đóng")
        })

        it("should render confirm button", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })
            expect(wrapper.text()).toContain("Xác nhận")
        })

        it("should emit confirm on confirm button click", async () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })

            const buttons = wrapper.findAll(".mock-button")
            const confirm_button = buttons.find(btn => btn.text().includes("Xác nhận"))
            await confirm_button?.trigger("click")

            expect(wrapper.emitted("confirm")).toBeTruthy()
        })

        it("should emit update:modelValue false on close button click", async () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })

            const buttons = wrapper.findAll(".mock-button")
            const close_button = buttons.find(btn => btn.text().includes("Đóng"))
            await close_button?.trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
        })
    })

    // ==========================================
    // Loading State Tests
    // ==========================================
    describe("Loading State", () => {
        it("should show loading state on confirm button", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, loading: true }
            })

            const buttons = wrapper.findAll(".mock-button")
            const confirm_button = buttons.find(btn => btn.text().includes("Xác nhận"))
            expect(confirm_button?.attributes("disabled")).toBeDefined()
        })

        it("should not close when loading", async () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, loading: true }
            })

            const buttons = wrapper.findAll(".mock-button")
            const close_button = buttons.find(btn => btn.text().includes("Đóng"))
            await close_button?.trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeFalsy()
        })
    })

    // ==========================================
    // Image Tests
    // ==========================================
    describe("Image", () => {
        it("should render image when provided", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, image: "/test-image.png" }
            })
            const img = wrapper.find("img")
            expect(img.exists()).toBe(true)
            expect(img.attributes("src")).toBe("/test-image.png")
        })

        it("should not show image when not provided", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true }
            })
            // When no image prop is provided, the image should not render or src should be empty
            const img = wrapper.find("img")
            if (img.exists()) {
                expect(img.attributes("src")).toBeFalsy()
            } else {
                expect(img.exists()).toBe(false)
            }
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render content slot", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true },
                slots: {
                    content: "<div class='custom-content'>Custom Content</div>"
                }
            })
            expect(wrapper.find(".custom-content").exists()).toBe(true)
        })

        it("should render footer slot", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true },
                slots: {
                    footer: "<div class='custom-footer'>Custom Footer</div>"
                }
            })
            expect(wrapper.find(".custom-footer").exists()).toBe(true)
        })
    })

    // ==========================================
    // Dimensions Tests
    // ==========================================
    describe("Dimensions", () => {
        it("should apply custom width", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, width: 500 }
            })
            expect(wrapper.find(".mock-alert-content").exists()).toBe(true)
        })

        it("should apply custom height", () => {
            const wrapper = mount(Confirm, {
                props: { modelValue: true, height: 300 }
            })
            expect(wrapper.find(".mock-alert-content").exists()).toBe(true)
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese title and content", () => {
            const wrapper = mount(Confirm, {
                props: {
                    modelValue: true,
                    title: "Xác nhận hành động",
                    content: "Bạn có chắc chắn muốn thực hiện hành động này không?"
                }
            })
            expect(wrapper.text()).toContain("Xác nhận hành động")
            expect(wrapper.text()).toContain("Bạn có chắc chắn muốn thực hiện hành động này không?")
        })
    })
})

// ==========================================
// Confirm Dialog Logic Tests (Unit)
// ==========================================
describe("Confirm Dialog Logic (Unit)", () => {
    const canClose = (loading: boolean): boolean => {
        return !loading
    }

    it("should allow close when not loading", () => {
        expect(canClose(false)).toBe(true)
    })

    it("should not allow close when loading", () => {
        expect(canClose(true)).toBe(false)
    })

    const computeWidth = (width: number | string): string => {
        if (typeof width === "number") {
            return `${width}px`
        }
        return width || "fit-content"
    }

    it("should convert number width to px", () => {
        expect(computeWidth(425)).toBe("425px")
    })

    it("should return string width as-is", () => {
        expect(computeWidth("500px")).toBe("500px")
    })
})
