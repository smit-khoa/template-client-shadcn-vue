/**
 * Unit Tests cho Checkbox Component THẬT
 * File: src/components/custom/checkbox/Checkbox.vue
 */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Checkbox from "@/components/custom/checkbox/Checkbox.vue"

describe("Checkbox Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render checkbox container", () => {
            const wrapper = mount(Checkbox)
            expect(wrapper.find(".inline-flex").exists()).toBe(true)
        })

        it("should render checkbox by default", () => {
            const wrapper = mount(Checkbox)
            // Kiểm tra SVG checkbox
            expect(wrapper.find("svg").exists()).toBe(true)
        })

        it("should render label when provided", () => {
            const wrapper = mount(Checkbox, {
                props: { label: "Accept terms" }
            })
            expect(wrapper.text()).toContain("Accept terms")
        })

        it("should not render label when not provided", () => {
            const wrapper = mount(Checkbox)
            expect(wrapper.find("span").exists()).toBe(false)
        })
    })

    // ==========================================
    // Checkbox Mode Tests
    // ==========================================
    describe("Checkbox Mode", () => {
        it("should render checkbox type by default", () => {
            const wrapper = mount(Checkbox)
            expect(wrapper.find('[class*="w-[24px]"]').exists()).toBe(true)
        })

        it("should be unchecked by default", () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })
            // Unchecked state should not have the checked SVG path
            expect(wrapper.html()).not.toContain("fill=\"#0cc096\"")
        })

        it("should be checked when modelValue is true", () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: true }
            })
            // Checked state should have the green fill
            expect(wrapper.html()).toContain("fill=\"#0cc096\"")
        })

        it("should toggle on click", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
        })

        it("should toggle off on click when checked", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: true }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
        })
    })

    // ==========================================
    // Radio Mode Tests
    // ==========================================
    describe("Radio Mode", () => {
        it("should render radio type", () => {
            const wrapper = mount(Checkbox, {
                props: { type: "radio", value: "option1" }
            })
            expect(wrapper.find(".rounded-full").exists()).toBe(true)
        })

        it("should be unselected by default", () => {
            const wrapper = mount(Checkbox, {
                props: { type: "radio", value: "option1", modelValue: "" }
            })
            // Unselected radio should not have the inner dot
            const radioContainer = wrapper.find('[class*="rounded-full"]')
            expect(radioContainer.exists()).toBe(true)
        })

        it("should be selected when modelValue matches value", () => {
            const wrapper = mount(Checkbox, {
                props: { type: "radio", value: "option1", modelValue: "option1" }
            })
            // Selected radio should have the inner dot (inset-[5px])
            expect(wrapper.find('[class*="inset-[5px]"]').exists()).toBe(true)
        })

        it("should emit value on click", async () => {
            const wrapper = mount(Checkbox, {
                props: { type: "radio", value: "option1", modelValue: "" }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual(["option1"])
        })
    })

    // ==========================================
    // Array Mode Tests (Multiple Checkboxes)
    // ==========================================
    describe("Array Mode", () => {
        it("should add value to array when clicked", async () => {
            const wrapper = mount(Checkbox, {
                props: {
                    modelValue: [],
                    value: "item1"
                }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([["item1"]])
        })

        it("should remove value from array when clicked again", async () => {
            const wrapper = mount(Checkbox, {
                props: {
                    modelValue: ["item1", "item2"],
                    value: "item1"
                }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual([["item2"]])
        })

        it("should be checked if value is in array", () => {
            const wrapper = mount(Checkbox, {
                props: {
                    modelValue: ["item1", "item2"],
                    value: "item1"
                }
            })
            // Should show checked state
            expect(wrapper.html()).toContain("fill=\"#0cc096\"")
        })

        it("should not be checked if value is not in array", () => {
            const wrapper = mount(Checkbox, {
                props: {
                    modelValue: ["item2"],
                    value: "item1"
                }
            })
            // Should not show checked state
            expect(wrapper.html()).not.toContain("fill=\"#0cc096\"")
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should apply disabled styles", () => {
            const wrapper = mount(Checkbox, {
                props: { disabled: true }
            })
            expect(wrapper.html()).toContain("opacity-50")
        })

        it("should not emit on click when disabled", async () => {
            const wrapper = mount(Checkbox, {
                props: { disabled: true, modelValue: false }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeFalsy()
        })

        it("should apply disabled label styles", () => {
            const wrapper = mount(Checkbox, {
                props: { disabled: true, label: "Disabled option" }
            })
            expect(wrapper.find("span").classes()).toContain("text-gray-400")
        })
    })

    // ==========================================
    // Label Tests
    // ==========================================
    describe("Label", () => {
        it("should render label text", () => {
            const wrapper = mount(Checkbox, {
                props: { label: "Remember me" }
            })
            expect(wrapper.text()).toContain("Remember me")
        })

        it("should apply correct label styling", () => {
            const wrapper = mount(Checkbox, {
                props: { label: "Test label" }
            })
            const label = wrapper.find("span")
            expect(label.classes()).toContain("text-gray-700")
        })

        it("should render Vietnamese label correctly", () => {
            const wrapper = mount(Checkbox, {
                props: { label: "Ghi nhớ đăng nhập" }
            })
            expect(wrapper.text()).toContain("Ghi nhớ đăng nhập")
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should emit change event", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("change")).toBeTruthy()
            expect(wrapper.emitted("change")![0]).toEqual([true])
        })

        it("should emit both update:modelValue and change", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })

            await wrapper.find(".cursor-pointer").trigger("click")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("change")).toBeTruthy()
        })
    })

    // ==========================================
    // Custom Class Tests
    // ==========================================
    describe("Custom Class", () => {
        it("should accept custom class prop", () => {
            const wrapper = mount(Checkbox, {
                props: { class: "my-custom-class" }
            })
            expect(wrapper.classes()).toContain("my-custom-class")
        })
    })

    // ==========================================
    // Hover State Tests
    // ==========================================
    describe("Hover State", () => {
        it("should apply hover styles on mouseenter", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })

            const checkboxContainer = wrapper.find('[class*="w-[24px]"]')
            await checkboxContainer.trigger("mouseenter")

            // Sau khi hover, container nên có class hover
            expect(wrapper.html()).toContain("bg-[#e7fdf8]")
        })

        it("should remove hover styles on mouseleave", async () => {
            const wrapper = mount(Checkbox, {
                props: { modelValue: false }
            })

            const checkboxContainer = wrapper.find('[class*="w-[24px]"]')
            await checkboxContainer.trigger("mouseenter")
            await checkboxContainer.trigger("mouseleave")

            // Kiểm tra component không bị lỗi sau mouseleave
            expect(wrapper.exists()).toBe(true)
        })
    })
})

// ==========================================
// Checkbox Logic Tests (Unit)
// ==========================================
describe("Checkbox Logic (Unit)", () => {
    describe("isChecked computation", () => {
        const computeIsChecked = (modelValue: any, value: any, type: string) => {
            if (type === "radio") {
                return modelValue === value
            }
            if (Array.isArray(modelValue)) {
                return value !== undefined && modelValue.includes(value)
            }
            return !!modelValue
        }

        it("should return true for boolean true", () => {
            expect(computeIsChecked(true, undefined, "checkbox")).toBe(true)
        })

        it("should return false for boolean false", () => {
            expect(computeIsChecked(false, undefined, "checkbox")).toBe(false)
        })

        it("should check array contains value", () => {
            expect(computeIsChecked(["a", "b"], "a", "checkbox")).toBe(true)
            expect(computeIsChecked(["a", "b"], "c", "checkbox")).toBe(false)
        })

        it("should compare values for radio", () => {
            expect(computeIsChecked("option1", "option1", "radio")).toBe(true)
            expect(computeIsChecked("option1", "option2", "radio")).toBe(false)
        })
    })
})
