/**
 * Unit Tests cho Search Component THẬT
 * File: src/components/custom/search/Search.vue
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { mount } from "@vue/test-utils"
import Search from "@/components/custom/search/Search.vue"

// Mock Icon component
vi.mock("@/components/custom/icon", () => ({
    Icon: {
        name: "Icon",
        props: ["name", "size", "color"],
        template: '<span class="mock-icon" :data-name="name"></span>'
    }
}))

// Mock cn utility
vi.mock("@/lib/utils", () => ({
    cn: (...classes: any[]) => classes.filter(Boolean).flat().join(" ")
}))

describe("Search Component", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render search wrapper", () => {
            const wrapper = mount(Search)
            expect(wrapper.find(".search-wrapper").exists()).toBe(true)
        })

        it("should render input element", () => {
            const wrapper = mount(Search)
            expect(wrapper.find("input").exists()).toBe(true)
        })

        it("should render search icon", () => {
            const wrapper = mount(Search)
            const icon = wrapper.find(".mock-icon")
            expect(icon.exists()).toBe(true)
            expect(icon.attributes("data-name")).toBe("search")
        })

        it("should render with default placeholder", () => {
            const wrapper = mount(Search)
            expect(wrapper.find("input").attributes("placeholder")).toBe("Tìm kiếm")
        })

        it("should render with custom placeholder", () => {
            const wrapper = mount(Search, {
                props: { placeholder: "Search products..." }
            })
            expect(wrapper.find("input").attributes("placeholder")).toBe("Search products...")
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should display modelValue", () => {
            const wrapper = mount(Search, {
                props: { modelValue: "test query" }
            })
            expect(wrapper.find("input").element.value).toBe("test query")
        })

        it("should emit update:modelValue on input", async () => {
            const wrapper = mount(Search)
            const input = wrapper.find("input")

            await input.setValue("new search")

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual(["new search"])
        })

        it("should sync with external modelValue changes", async () => {
            const wrapper = mount(Search, {
                props: { modelValue: "initial" }
            })

            await wrapper.setProps({ modelValue: "updated" })

            expect(wrapper.find("input").element.value).toBe("updated")
        })
    })

    // ==========================================
    // Debounce Tests
    // ==========================================
    describe("Debounce", () => {
        it("should debounce search event", async () => {
            const wrapper = mount(Search, {
                props: { debounce: 300 }
            })

            await wrapper.find("input").setValue("test")

            // Search event should not be emitted immediately
            expect(wrapper.emitted("search")).toBeFalsy()

            // Fast forward timer
            vi.advanceTimersByTime(300)

            expect(wrapper.emitted("search")).toBeTruthy()
            expect(wrapper.emitted("search")![0]).toEqual(["test"])
        })

        it("should reset debounce timer on new input", async () => {
            const wrapper = mount(Search, {
                props: { debounce: 300 }
            })

            await wrapper.find("input").setValue("te")
            vi.advanceTimersByTime(200)

            await wrapper.find("input").setValue("test")
            vi.advanceTimersByTime(200)

            // Should not emit yet
            expect(wrapper.emitted("search")).toBeFalsy()

            vi.advanceTimersByTime(100)

            // Now should emit
            expect(wrapper.emitted("search")).toBeTruthy()
            expect(wrapper.emitted("search")![0]).toEqual(["test"])
        })

        it("should emit immediately when debounce is 0", async () => {
            const wrapper = mount(Search, {
                props: { debounce: 0 }
            })

            await wrapper.find("input").setValue("test")

            expect(wrapper.emitted("search")).toBeTruthy()
            expect(wrapper.emitted("search")![0]).toEqual(["test"])
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should emit focus event", async () => {
            const wrapper = mount(Search)
            await wrapper.find("input").trigger("focus")
            expect(wrapper.emitted("focus")).toBeTruthy()
        })

        it("should emit blur event", async () => {
            const wrapper = mount(Search)
            await wrapper.find("input").trigger("blur")
            expect(wrapper.emitted("blur")).toBeTruthy()
        })

        it("should emit enter event on Enter key", async () => {
            const wrapper = mount(Search, {
                props: { modelValue: "search term" }
            })

            await wrapper.find("input").trigger("keydown.enter")

            expect(wrapper.emitted("enter")).toBeTruthy()
            expect(wrapper.emitted("enter")![0]).toEqual(["search term"])
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should be disabled when disabled prop is true", () => {
            const wrapper = mount(Search, {
                props: { disabled: true }
            })
            expect(wrapper.find("input").attributes("disabled")).toBeDefined()
        })

        it("should apply disabled styles", () => {
            const wrapper = mount(Search, {
                props: { disabled: true }
            })
            expect(wrapper.find("input").classes().join(" ")).toContain("opacity-40")
        })

        it("should not be disabled by default", () => {
            const wrapper = mount(Search)
            expect(wrapper.find("input").attributes("disabled")).toBeUndefined()
        })
    })

    // ==========================================
    // Readonly State Tests
    // ==========================================
    describe("Readonly State", () => {
        it("should be readonly when readonly prop is true", () => {
            const wrapper = mount(Search, {
                props: { readonly: true }
            })
            expect(wrapper.find("input").attributes("readonly")).toBeDefined()
        })
    })

    // ==========================================
    // Focus States Tests
    // ==========================================
    describe("Focus States", () => {
        it("should apply focus styles on focus", async () => {
            const wrapper = mount(Search)

            await wrapper.find("input").trigger("focus")

            expect(wrapper.find("input").classes().join(" ")).toContain("border-[#0ff0bb]")
        })

        it("should remove focus styles on blur", async () => {
            const wrapper = mount(Search)

            await wrapper.find("input").trigger("focus")
            await wrapper.find("input").trigger("blur")

            expect(wrapper.find("input").classes().join(" ")).not.toContain("border-[#0ff0bb]")
        })
    })

    // ==========================================
    // Hover States Tests
    // ==========================================
    describe("Hover States", () => {
        it("should apply hover styles on mouseenter", async () => {
            const wrapper = mount(Search)

            await wrapper.find("input").trigger("mouseenter")

            expect(wrapper.find("input").classes().join(" ")).toContain("bg-[rgba(218,230,244,0.7)]")
        })

        it("should remove hover styles on mouseleave", async () => {
            const wrapper = mount(Search)

            await wrapper.find("input").trigger("mouseenter")
            await wrapper.find("input").trigger("mouseleave")

            expect(wrapper.find("input").classes().join(" ")).not.toContain("bg-[rgba(218,230,244,0.7)]")
        })
    })

    // ==========================================
    // Custom Class Tests
    // ==========================================
    describe("Custom Class", () => {
        it("should accept custom class prop", () => {
            const wrapper = mount(Search, {
                props: { class: "my-custom-search" }
            })
            expect(wrapper.find("input").classes()).toContain("my-custom-search")
        })
    })
})

// ==========================================
// Search Debounce Logic Tests (Unit)
// ==========================================
describe("Search Debounce Logic (Unit)", () => {
    it("should create debounced function", () => {
        let call_count = 0
        const fn = () => call_count++

        const debounce = (fn: Function, delay: number) => {
            let timer: number
            return (...args: any[]) => {
                clearTimeout(timer)
                timer = window.setTimeout(() => fn(...args), delay)
            }
        }

        const debounced_fn = debounce(fn, 100)

        // Call multiple times
        debounced_fn()
        debounced_fn()
        debounced_fn()

        // Should not have called yet
        expect(call_count).toBe(0)
    })
})
