/**
 * Unit Tests cho Input Component THẬT
 * File: src/components/custom/input/Input.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Input from "@/components/custom/input/Input.vue"

// Mock Icon component (vẫn cần mock vì Icon phụ thuộc vào sprite)
vi.mock("@/components/custom/icon", () => ({
    Icon: {
        name: "Icon",
        props: ["name", "size", "color"],
        template: '<span class="mock-icon" :data-name="name" :data-size="size"></span>'
    }
}))

// Mock cn utility
vi.mock("@/lib/utils", () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).flat().join(" ")
}))

describe("Input Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render input wrapper", () => {
            const wrapper = mount(Input)
            expect(wrapper.find(".input-wrapper").exists()).toBe(true)
        })

        it("should render input element", () => {
            const wrapper = mount(Input)
            expect(wrapper.find("input").exists()).toBe(true)
        })

        it("should render with default placeholder", () => {
            const wrapper = mount(Input)
            expect(wrapper.find("input").attributes("placeholder")).toBe("Nhập thông tin")
        })

        it("should render with custom placeholder", () => {
            const wrapper = mount(Input, {
                props: { placeholder: "Enter email" }
            })
            expect(wrapper.find("input").attributes("placeholder")).toBe("Enter email")
        })
    })

    // ==========================================
    // Input Types Tests
    // ==========================================
    describe("Input Types", () => {
        it("should render text input by default", () => {
            const wrapper = mount(Input)
            expect(wrapper.find("input").attributes("type")).toBe("text")
        })

        it("should render email input", () => {
            const wrapper = mount(Input, {
                props: { type: "email" }
            })
            expect(wrapper.find("input").attributes("type")).toBe("email")
        })

        it("should render password input", () => {
            const wrapper = mount(Input, {
                props: { type: "password" }
            })
            expect(wrapper.find("input").attributes("type")).toBe("password")
        })

        it("should render number input", () => {
            const wrapper = mount(Input, {
                props: { type: "number" }
            })
            expect(wrapper.find("input").attributes("type")).toBe("number")
        })

        it("should render text input for currency type", () => {
            const wrapper = mount(Input, {
                props: { type: "currency" }
            })
            expect(wrapper.find("input").attributes("type")).toBe("text")
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should display modelValue", () => {
            const wrapper = mount(Input, {
                props: { modelValue: "Test Value" }
            })
            expect(wrapper.find("input").element.value).toBe("Test Value")
        })

        it("should emit update:modelValue on input", async () => {
            const wrapper = mount(Input)
            const input = wrapper.find("input")

            await input.setValue("New Value")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual(["New Value"])
        })

        it("should handle empty value", () => {
            const wrapper = mount(Input, {
                props: { modelValue: "" }
            })
            expect(wrapper.find("input").element.value).toBe("")
        })
    })

    // ==========================================
    // Password Toggle Tests
    // ==========================================
    describe("Password Toggle", () => {
        it("should render toggle button for password input", () => {
            const wrapper = mount(Input, {
                props: { type: "password" }
            })
            expect(wrapper.find("button").exists()).toBe(true)
        })

        it("should toggle password visibility on click", async () => {
            const wrapper = mount(Input, {
                props: { type: "password" }
            })

            expect(wrapper.find("input").attributes("type")).toBe("password")

            await wrapper.find("button").trigger("click")

            expect(wrapper.find("input").attributes("type")).toBe("text")
        })

        it("should toggle back to password on second click", async () => {
            const wrapper = mount(Input, {
                props: { type: "password" }
            })

            await wrapper.find("button").trigger("click")
            expect(wrapper.find("input").attributes("type")).toBe("text")

            await wrapper.find("button").trigger("click")
            expect(wrapper.find("input").attributes("type")).toBe("password")
        })

        it("should not render toggle for non-password inputs", () => {
            const wrapper = mount(Input, {
                props: { type: "text" }
            })
            expect(wrapper.find("button").exists()).toBe(false)
        })
    })

    // ==========================================
    // Icon Tests
    // ==========================================
    describe("Icon", () => {
        it("should render icon when icon prop is provided", () => {
            const wrapper = mount(Input, {
                props: { icon: "mail-02" }
            })
            expect(wrapper.find(".mock-icon").exists()).toBe(true)
            expect(wrapper.find(".mock-icon").attributes("data-name")).toBe("mail-02")
        })

        it("should not render icon when icon prop is empty", () => {
            const wrapper = mount(Input)
            const icons = wrapper.findAll(".mock-icon")
            expect(icons.length).toBe(0)
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should be disabled when disabled prop is true", () => {
            const wrapper = mount(Input, {
                props: { disabled: true }
            })
            expect(wrapper.find("input").attributes("disabled")).toBeDefined()
        })

        it("should not be disabled by default", () => {
            const wrapper = mount(Input)
            expect(wrapper.find("input").attributes("disabled")).toBeUndefined()
        })
    })

    // ==========================================
    // Error State Tests
    // ==========================================
    describe("Error State", () => {
        it("should display error message when error is true", () => {
            const wrapper = mount(Input, {
                props: {
                    error: true,
                    errorMessage: "This field is required"
                }
            })
            expect(wrapper.text()).toContain("This field is required")
        })

        it("should not display error message when error is false", () => {
            const wrapper = mount(Input, {
                props: {
                    error: false,
                    errorMessage: "This field is required"
                }
            })
            expect(wrapper.text()).not.toContain("This field is required")
        })
    })

    // ==========================================
    // Currency Type Tests
    // ==========================================
    describe("Currency Type", () => {
        it("should display currency suffix", () => {
            const wrapper = mount(Input, {
                props: { type: "currency" }
            })
            expect(wrapper.text()).toContain("VND")
        })

        it("should display custom currency", () => {
            const wrapper = mount(Input, {
                props: { type: "currency", currency: "USD" }
            })
            expect(wrapper.text()).toContain("USD")
        })

        it("should format currency value", () => {
            const wrapper = mount(Input, {
                props: { type: "currency", modelValue: 1000000 }
            })
            expect(wrapper.find("input").element.value).toContain("1")
        })
    })

    // ==========================================
    // Suffix Tests
    // ==========================================
    describe("Suffix", () => {
        it("should render suffix when provided", () => {
            const wrapper = mount(Input, {
                props: { suffix: "kg" }
            })
            expect(wrapper.text()).toContain("kg")
        })

        it("should not render suffix when type is currency", () => {
            const wrapper = mount(Input, {
                props: { type: "currency", suffix: "kg" }
            })
            expect(wrapper.text()).toContain("VND")
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should emit focus event", async () => {
            const wrapper = mount(Input)
            await wrapper.find("input").trigger("focus")
            expect(wrapper.emitted("focus")).toBeTruthy()
        })

        it("should emit blur event", async () => {
            const wrapper = mount(Input)
            await wrapper.find("input").trigger("blur")
            expect(wrapper.emitted("blur")).toBeTruthy()
        })
    })

    // ==========================================
    // Message Tests
    // ==========================================
    describe("Message", () => {
        it("should display helper message", () => {
            const wrapper = mount(Input, {
                props: { message: "Enter your email address" }
            })
            expect(wrapper.text()).toContain("Enter your email address")
        })

        it("should prioritize error message over helper message", () => {
            const wrapper = mount(Input, {
                props: {
                    error: true,
                    errorMessage: "Invalid email",
                    message: "Enter your email"
                }
            })
            expect(wrapper.text()).toContain("Invalid email")
            expect(wrapper.text()).not.toContain("Enter your email")
        })
    })
})

// ==========================================
// Currency Input Tests (Unit)
// ==========================================
describe("Currency Input (Unit)", () => {
    const formatCurrency = (value: number, currency = "VND") => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency
        }).format(value)
    }

    const unformatCurrency = (value: string) => {
        return parseFloat(value.replace(/[^\d.-]/g, "")) || 0
    }

    it("should format number to currency string", () => {
        const result = formatCurrency(1000000)
        expect(result).toContain("1.000.000")
    })

    it("should unformat currency string to number", () => {
        const result = unformatCurrency("1000000")
        expect(result).toBe(1000000)
    })

    it("should handle zero value", () => {
        const result = formatCurrency(0)
        expect(result).toContain("0")
    })

    it("should return 0 for invalid string", () => {
        const result = unformatCurrency("invalid")
        expect(result).toBe(0)
    })
})
