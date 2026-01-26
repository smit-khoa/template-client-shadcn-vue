/**
 * Unit Tests cho Tabs Component THẬT
 * File: src/components/custom/tabs/Tabs.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Tabs from "@/components/custom/tabs/Tabs.vue"

// Mock Icon component
vi.mock("@/components/custom/icon", () => ({
    Icon: {
        name: "Icon",
        props: ["name", "size"],
        template: '<span class="mock-icon" :data-name="name"></span>'
    }
}))

const default_tabs = [
    { key: "tab1", title: "Tab 1" },
    { key: "tab2", title: "Tab 2" },
    { key: "tab3", title: "Tab 3" }
]

describe("Tabs Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render tabs container", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            expect(wrapper.find(".switcher").exists()).toBe(true)
        })

        it("should render correct number of tabs", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            expect(wrapper.findAll(".switcher__option")).toHaveLength(3)
        })

        it("should render tab titles", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            expect(wrapper.text()).toContain("Tab 1")
            expect(wrapper.text()).toContain("Tab 2")
            expect(wrapper.text()).toContain("Tab 3")
        })

        it("should render with custom tabs", () => {
            const custom_tabs = [
                { key: "home", title: "Trang chủ" },
                { key: "profile", title: "Hồ sơ" }
            ]
            const wrapper = mount(Tabs, {
                props: { tabs: custom_tabs }
            })
            expect(wrapper.text()).toContain("Trang chủ")
            expect(wrapper.text()).toContain("Hồ sơ")
        })
    })

    // ==========================================
    // Selection Tests
    // ==========================================
    describe("Selection", () => {
        it("should select first tab by default", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            expect((radio_inputs[0]!.element as HTMLInputElement).checked).toBe(true)
        })

        it("should select tab based on modelValue", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs, modelValue: "tab2" }
            })
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            expect((radio_inputs[1]!.element as HTMLInputElement).checked).toBe(true)
        })

        it("should emit update:modelValue on radio change", async () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs, modelValue: "tab1" }
            })

            // Trigger change on radio input directly
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            await radio_inputs[1]!.setValue(true)

            expect(wrapper.emitted("update:modelValue")).toBeTruthy()
            expect(wrapper.emitted("update:modelValue")![0]).toEqual(["tab2"])
        })
    })

    // ==========================================
    // Icons Tests
    // ==========================================
    describe("Icons", () => {
        it("should render icons when provided", () => {
            const tabs_with_icons = [
                { key: "home", title: "Home", icon: "home" },
                { key: "settings", title: "Settings", icon: "settings" }
            ]
            const wrapper = mount(Tabs, {
                props: { tabs: tabs_with_icons }
            })
            expect(wrapper.findAll(".mock-icon")).toHaveLength(2)
        })

        it("should not render icons when not provided", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            expect(wrapper.find(".mock-icon").exists()).toBe(false)
        })

        it("should render correct icon names", () => {
            const tabs_with_icons = [
                { key: "home", title: "Home", icon: "house" },
                { key: "user", title: "User", icon: "user-circle" }
            ]
            const wrapper = mount(Tabs, {
                props: { tabs: tabs_with_icons }
            })
            const icons = wrapper.findAll(".mock-icon")
            expect(icons[0]!.attributes("data-name")).toBe("house")
            expect(icons[1]!.attributes("data-name")).toBe("user-circle")
        })
    })

    // ==========================================
    // Multiple Tab Changes Tests
    // ==========================================
    describe("Multiple Tab Changes", () => {
        it("should handle multiple tab changes", async () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs, modelValue: "tab1" }
            })

            const radio_inputs = wrapper.findAll('input[type="radio"]')

            await radio_inputs[1]!.setValue(true)
            expect(wrapper.emitted("update:modelValue")![0]).toEqual(["tab2"])

            await radio_inputs[2]!.setValue(true)
            const emissions = wrapper.emitted("update:modelValue")!
            expect(emissions[emissions.length - 1]).toEqual(["tab3"])
        })
    })

    // ==========================================
    // Empty Tabs Tests
    // ==========================================
    describe("Empty Tabs", () => {
        it("should handle empty tabs array", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: [] }
            })
            expect(wrapper.findAll(".switcher__option")).toHaveLength(0)
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese tab titles", () => {
            const vietnamese_tabs = [
                { key: "home", title: "Trang chủ" },
                { key: "products", title: "Sản phẩm" },
                { key: "contact", title: "Liên hệ" }
            ]
            const wrapper = mount(Tabs, {
                props: { tabs: vietnamese_tabs }
            })
            expect(wrapper.text()).toContain("Trang chủ")
            expect(wrapper.text()).toContain("Sản phẩm")
            expect(wrapper.text()).toContain("Liên hệ")
        })
    })

    // ==========================================
    // Radio Input Tests
    // ==========================================
    describe("Radio Inputs", () => {
        it("should render radio inputs for each tab", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            expect(radio_inputs).toHaveLength(3)
        })

        it("should have correct values for radio inputs", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            expect((radio_inputs[0]!.element as HTMLInputElement).value).toBe("tab1")
            expect((radio_inputs[1]!.element as HTMLInputElement).value).toBe("tab2")
            expect((radio_inputs[2]!.element as HTMLInputElement).value).toBe("tab3")
        })

        it("should have same name attribute for all radio inputs", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            const radio_inputs = wrapper.findAll('input[type="radio"]')
            radio_inputs.forEach(input => {
                expect(input.attributes("name")).toBe("tabs")
            })
        })
    })

    // ==========================================
    // Slider/Indicator Tests
    // ==========================================
    describe("Slider Indicator", () => {
        it("should render slider indicator", () => {
            const wrapper = mount(Tabs, {
                props: { tabs: default_tabs }
            })
            // Slider là img element
            expect(wrapper.find("img").exists()).toBe(true)
        })
    })
})

// ==========================================
// Tab Selection Logic Tests (Unit)
// ==========================================
describe("Tab Selection Logic (Unit)", () => {
    const findSelectedIndex = (tabs: { key: string }[], selected_key: string): number => {
        return tabs.findIndex(tab => tab.key === selected_key)
    }

    it("should find correct index for first tab", () => {
        expect(findSelectedIndex(default_tabs, "tab1")).toBe(0)
    })

    it("should find correct index for middle tab", () => {
        expect(findSelectedIndex(default_tabs, "tab2")).toBe(1)
    })

    it("should find correct index for last tab", () => {
        expect(findSelectedIndex(default_tabs, "tab3")).toBe(2)
    })

    it("should return -1 for non-existent key", () => {
        expect(findSelectedIndex(default_tabs, "nonexistent")).toBe(-1)
    })
})
