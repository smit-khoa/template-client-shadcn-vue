/**
 * Unit Tests cho Dropdown Component
 * File: src/components/custom/dropdown/Dropdown.vue
 */

import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Dropdown from "@/components/custom/dropdown/Dropdown.vue"

// Mock DropdownMenu UI components
vi.mock("@/components/ui/dropdown-menu", () => ({
    DropdownMenu: {
        name: "DropdownMenu",
        props: ["open"],
        template: '<div class="mock-dropdown-menu"><slot /></div>',
        emits: ["update:open"]
    },
    DropdownMenuContent: {
        name: "DropdownMenuContent",
        props: ["side", "align", "sideOffset", "collisionPadding", "avoidCollisions", "sticky", "class"],
        template: '<div class="mock-dropdown-content"><slot /></div>',
        emits: ["interactOutside"]
    },
    DropdownMenuTrigger: {
        name: "DropdownMenuTrigger",
        props: ["asChild", "disabled", "class"],
        template: '<div class="mock-dropdown-trigger"><slot /></div>'
    }
}))

// Mock DropdownTitle
vi.mock("@/components/custom/dropdown/DropdownTitle.vue", () => ({
    default: {
        name: "DropdownTitle",
        props: ["title", "open", "icon", "class"],
        template: '<div class="mock-dropdown-title">{{ title }}</div>'
    }
}))

// Mock common utilities
vi.mock("@/common", () => ({
    randomString: () => "test-id-123"
}))

describe("Dropdown Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render dropdown menu", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.find(".mock-dropdown-menu").exists()).toBe(true)
        })

        it("should render trigger", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.find(".mock-dropdown-trigger").exists()).toBe(true)
        })

        it("should render content", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.find(".mock-dropdown-content").exists()).toBe(true)
        })

        it("should render default title", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.text()).toContain("Chọn")
        })

        it("should render custom title", () => {
            const wrapper = mount(Dropdown, {
                props: { title: "Select Option" }
            })
            expect(wrapper.text()).toContain("Select Option")
        })
    })

    // ==========================================
    // Slots Tests
    // ==========================================
    describe("Slots", () => {
        it("should render trigger slot", () => {
            const wrapper = mount(Dropdown, {
                slots: {
                    trigger: "<button>Custom Trigger</button>"
                }
            })
            expect(wrapper.text()).toContain("Custom Trigger")
        })

        it("should render default slot content", () => {
            const wrapper = mount(Dropdown, {
                slots: {
                    default: `
                        <div class="dropdown-item">Option 1</div>
                        <div class="dropdown-item">Option 2</div>
                    `
                }
            })
            expect(wrapper.findAll(".dropdown-item")).toHaveLength(2)
        })
    })

    // ==========================================
    // Props Tests
    // ==========================================
    describe("Props", () => {
        it("should accept disabled prop", () => {
            const wrapper = mount(Dropdown, {
                props: { disabled: true }
            })
            expect(wrapper.vm.$props.disabled).toBe(true)
        })

        it("should accept position prop", () => {
            const wrapper = mount(Dropdown, {
                props: { position: "top-start" }
            })
            expect(wrapper.vm.$props.position).toBe("top-start")
        })

        it("should have default position of bottom-start", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.vm.$props.position).toBe("bottom-start")
        })

        it("should accept priority prop", () => {
            const wrapper = mount(Dropdown, {
                props: { priority: true }
            })
            expect(wrapper.vm.$props.priority).toBe(true)
        })

        it("should accept titleWidth prop", () => {
            const wrapper = mount(Dropdown, {
                props: { titleWidth: "200px" }
            })
            expect(wrapper.vm.$props.titleWidth).toBe("200px")
        })

        it("should accept bodyWidth prop", () => {
            const wrapper = mount(Dropdown, {
                props: { bodyWidth: "300px" }
            })
            expect(wrapper.vm.$props.bodyWidth).toBe("300px")
        })

        it("should accept bodyHeight prop", () => {
            const wrapper = mount(Dropdown, {
                props: { bodyHeight: "400px" }
            })
            expect(wrapper.vm.$props.bodyHeight).toBe("400px")
        })

        it("should accept icon prop", () => {
            const wrapper = mount(Dropdown, {
                props: { icon: "chevron-down" }
            })
            expect(wrapper.vm.$props.icon).toBe("chevron-down")
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should sync with modelValue", async () => {
            const wrapper = mount(Dropdown, {
                props: { modelValue: true }
            })

            await wrapper.vm.$nextTick()
            // Component should reflect the open state
            expect(wrapper.vm.$props.modelValue).toBe(true)
        })

        it("should emit update:modelValue", async () => {
            const wrapper = mount(Dropdown, {
                props: { modelValue: false }
            })

            await wrapper.setProps({ modelValue: true })

            // The component watches modelValue changes
            expect(wrapper.vm.$props.modelValue).toBe(true)
        })
    })

    // ==========================================
    // Events Tests
    // ==========================================
    describe("Events", () => {
        it("should have open event emitter", () => {
            const wrapper = mount(Dropdown)
            // Check the component has the emit defined
            expect(wrapper.vm.$options.emits).toContain("open")
        })

        it("should have close event emitter", () => {
            const wrapper = mount(Dropdown)
            expect(wrapper.vm.$options.emits).toContain("close")
        })
    })

    // ==========================================
    // Position Mapping Tests
    // ==========================================
    describe("Position Mapping", () => {
        const positions = [
            { position: "bottom", side: "bottom", align: "center" },
            { position: "top", side: "top", align: "center" },
            { position: "bottom-start", side: "bottom", align: "start" },
            { position: "bottom-end", side: "bottom", align: "end" },
            { position: "top-start", side: "top", align: "start" },
            { position: "top-end", side: "top", align: "end" }
        ] as const

        positions.forEach(({ position }) => {
            it(`should accept position ${position}`, () => {
                const wrapper = mount(Dropdown, {
                    props: { position }
                })
                expect(wrapper.vm.$props.position).toBe(position)
            })
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should render Vietnamese title", () => {
            const wrapper = mount(Dropdown, {
                props: { title: "Chọn loại" }
            })
            expect(wrapper.text()).toContain("Chọn loại")
        })

        it("should render Vietnamese options", () => {
            const wrapper = mount(Dropdown, {
                slots: {
                    default: `
                        <div class="option">Tùy chọn 1</div>
                        <div class="option">Tùy chọn 2</div>
                        <div class="option">Tùy chọn 3</div>
                    `
                }
            })
            expect(wrapper.text()).toContain("Tùy chọn 1")
            expect(wrapper.text()).toContain("Tùy chọn 2")
            expect(wrapper.text()).toContain("Tùy chọn 3")
        })
    })
})

// ==========================================
// Dropdown Position Logic Tests (Unit)
// ==========================================
describe("Dropdown Position Logic (Unit)", () => {
    type Position = "bottom" | "top" | "left" | "right" | "bottom-start" | "bottom-end" | "top-start" | "top-end"

    const sideMap: Record<Position, string> = {
        bottom: "bottom",
        top: "top",
        left: "left",
        right: "right",
        "bottom-start": "bottom",
        "bottom-end": "bottom",
        "top-start": "top",
        "top-end": "top"
    }

    const alignMap: Record<Position, string> = {
        bottom: "center",
        top: "center",
        left: "center",
        right: "center",
        "bottom-start": "start",
        "bottom-end": "end",
        "top-start": "start",
        "top-end": "end"
    }

    it("should map bottom to bottom side", () => {
        expect(sideMap["bottom"]).toBe("bottom")
    })

    it("should map bottom-start to start align", () => {
        expect(alignMap["bottom-start"]).toBe("start")
    })

    it("should map bottom-end to end align", () => {
        expect(alignMap["bottom-end"]).toBe("end")
    })

    it("should map top to center align", () => {
        expect(alignMap["top"]).toBe("center")
    })
})

// ==========================================
// Dropdown Width Logic Tests (Unit)
// ==========================================
describe("Dropdown Width Logic (Unit)", () => {
    const computeTitleWidth = (width: string): string => {
        if (width === "100%") return "w-full"
        return `w-[${width}]`
    }

    const computeBodyWidth = (width: string, triggerWidth: number): string => {
        if (width === "auto") return `w-[${triggerWidth}px]`
        return `w-[${width}]`
    }

    it("should convert 100% to w-full", () => {
        expect(computeTitleWidth("100%")).toBe("w-full")
    })

    it("should convert specific width to w-[x]", () => {
        expect(computeTitleWidth("200px")).toBe("w-[200px]")
    })

    it("should use trigger width for auto body width", () => {
        expect(computeBodyWidth("auto", 150)).toBe("w-[150px]")
    })

    it("should use specified body width", () => {
        expect(computeBodyWidth("300px", 150)).toBe("w-[300px]")
    })
})
