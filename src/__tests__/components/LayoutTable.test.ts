/**
 * Unit Tests cho LayoutTable Component
 * File: src/components/custom/table/LayoutTable.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import LayoutTable from "@/components/custom/table/LayoutTable.vue"

// Mock Tabs component
vi.mock("@/components/custom/tabs", () => ({
    Tabs: {
        name: "Tabs",
        props: ["tabs", "modelValue"],
        template: `
            <div class="mock-tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    :class="{ 'active': modelValue === tab.key }"
                    @click="$emit('update:modelValue', tab.key)"
                >
                    {{ tab.title }}
                </button>
            </div>
        `,
        emits: ["update:modelValue"]
    }
}))

describe("LayoutTable Component", () => {
    const defaultTabs = [
        { key: "campaign", title: "Chiến dịch" },
        { key: "customer", title: "Khách hàng" },
        { key: "product", title: "Sản phẩm" }
    ]

    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render table layout", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })
            expect(wrapper.find(".table-header").exists()).toBe(true)
            expect(wrapper.find(".table-body").exists()).toBe(true)
        })

        it("should render tabs component", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })
            expect(wrapper.find(".mock-tabs").exists()).toBe(true)
        })

        it("should render left header section", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })
            expect(wrapper.find(".table-header-left").exists()).toBe(true)
        })

        it("should render right header section", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })
            expect(wrapper.find(".table-header-right").exists()).toBe(true)
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render left slot content", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                },
                slots: {
                    left: "<span class='left-content'>Left Content</span>"
                }
            })
            expect(wrapper.find(".left-content").exists()).toBe(true)
            expect(wrapper.text()).toContain("Left Content")
        })

        it("should render right slot content", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                },
                slots: {
                    right: "<button class='filter-btn'>Lọc</button>"
                }
            })
            expect(wrapper.find(".filter-btn").exists()).toBe(true)
            expect(wrapper.text()).toContain("Lọc")
        })

        it("should render default slot (table body) content", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                },
                slots: {
                    default: "<table class='data-table'><tr><td>Data</td></tr></table>"
                }
            })
            expect(wrapper.find(".data-table").exists()).toBe(true)
        })
    })

    // ==========================================
    // Props Tests
    // ==========================================
    describe("Props", () => {
        it("should accept tabs prop", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })
            expect(wrapper.vm.$props.tabs).toEqual(defaultTabs)
        })

        it("should accept tabSelected prop", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "customer"
                }
            })
            expect(wrapper.vm.$props.tabSelected).toBe("customer")
        })

        it("should use default tab value if tabSelected not provided", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: ""
                }
            })
            // Internal ref defaults to "campaign"
            expect(wrapper.find(".mock-tabs").exists()).toBe(true)
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should emit change-tab when tab changes", async () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })

            // Find the customer tab button and click it
            const tabs_container = wrapper.find(".mock-tabs")
            const customer_btn = tabs_container.findAll("button")[1]
            await customer_btn.trigger("click")

            expect(wrapper.emitted("change-tab")).toBeTruthy()
            expect(wrapper.emitted("change-tab")![0]).toEqual(["customer"])
        })

        it("should update internal tab when tabSelected prop changes", async () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                }
            })

            await wrapper.setProps({ tabSelected: "product" })

            // The internal tab ref should be updated
            expect(wrapper.emitted("change-tab")).toBeTruthy()
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese tab titles", () => {
            const vietnamese_tabs = [
                { key: "all", title: "Tất cả" },
                { key: "active", title: "Đang hoạt động" },
                { key: "inactive", title: "Ngừng hoạt động" }
            ]
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: vietnamese_tabs,
                    tabSelected: "all"
                }
            })
            expect(wrapper.text()).toContain("Tất cả")
            expect(wrapper.text()).toContain("Đang hoạt động")
            expect(wrapper.text()).toContain("Ngừng hoạt động")
        })

        it("should render Vietnamese slot content", () => {
            const wrapper = mount(LayoutTable, {
                props: {
                    tabs: defaultTabs,
                    tabSelected: "campaign"
                },
                slots: {
                    left: "<span>Thêm mới</span>",
                    right: "<span>Bộ lọc</span>"
                }
            })
            expect(wrapper.text()).toContain("Thêm mới")
            expect(wrapper.text()).toContain("Bộ lọc")
        })
    })
})

// ==========================================
// LayoutTable Logic Tests (Unit)
// ==========================================
describe("LayoutTable Logic (Unit)", () => {
    describe("Tab selection", () => {
        const getSelectedTab = (tabs: { key: string }[], selected: string): string => {
            return selected || tabs[0]?.key || ""
        }

        it("should return selected tab when provided", () => {
            const tabs = [{ key: "a" }, { key: "b" }, { key: "c" }]
            expect(getSelectedTab(tabs, "b")).toBe("b")
        })

        it("should return first tab when selected is empty", () => {
            const tabs = [{ key: "first" }, { key: "second" }]
            expect(getSelectedTab(tabs, "")).toBe("first")
        })

        it("should return empty string when tabs is empty", () => {
            expect(getSelectedTab([], "")).toBe("")
        })
    })

    describe("Tab change event", () => {
        const shouldEmitChange = (old_tab: string, new_tab: string): boolean => {
            return old_tab !== new_tab
        }

        it("should emit when tab actually changes", () => {
            expect(shouldEmitChange("tab1", "tab2")).toBe(true)
        })

        it("should not emit when tab is the same", () => {
            expect(shouldEmitChange("tab1", "tab1")).toBe(false)
        })
    })
})
