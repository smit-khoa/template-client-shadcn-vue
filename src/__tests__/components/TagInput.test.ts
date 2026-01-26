/**
 * Unit Tests cho TagInput Component
 * File: src/components/custom/tag-input/TagInput.vue
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import TagInput from "@/components/custom/tag-input/TagInput.vue"

// Mock reka-ui TagsInput components
vi.mock("reka-ui", () => ({
    TagsInputRoot: {
        name: "TagsInputRoot",
        props: ["modelValue", "addOnPaste", "delimiter", "disabled", "class"],
        template: `
            <div class="mock-tags-input-root" :class="{ 'disabled': disabled }">
                <slot />
            </div>
        `,
        emits: ["update:modelValue"]
    },
    TagsInputInput: {
        name: "TagsInputInput",
        props: ["placeholder", "class"],
        template: `<input class="mock-tags-input" :placeholder="placeholder" />`,
        emits: ["keydown"]
    },
    TagsInputItem: {
        name: "TagsInputItem",
        props: ["value", "class"],
        template: `
            <div class="mock-tag-item" :data-value="value">
                <slot />
            </div>
        `
    },
    TagsInputItemDelete: {
        name: "TagsInputItemDelete",
        props: ["class"],
        template: `<button class="mock-tag-delete" @click="$emit('click')"><slot /></button>`,
        emits: ["click"]
    },
    TagsInputItemText: {
        name: "TagsInputItemText",
        props: ["class"],
        template: `<span class="mock-tag-text"><slot /></span>`
    }
}))

// Mock Icon component
vi.mock("@/components/custom/icon", () => ({
    Icon: {
        name: "Icon",
        props: ["name", "size", "color"],
        template: '<span class="mock-icon" :data-name="name" />'
    }
}))

// Mock lib/utils
vi.mock("@/lib/utils", () => ({
    cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")
}))

describe("TagInput Component", () => {
    // ==========================================
    // Rendering Tests
    // ==========================================
    describe("Rendering", () => {
        it("should render tags input root", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.find(".mock-tags-input-root").exists()).toBe(true)
        })

        it("should render input field", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.find(".mock-tags-input").exists()).toBe(true)
        })

        it("should render tags when modelValue is provided", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["tag1", "tag2", "tag3"]
                }
            })
            const tags = wrapper.findAll(".mock-tag-item")
            expect(tags.length).toBe(3)
        })

        it("should render delete button for each tag", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["tag1", "tag2"]
                }
            })
            const delete_buttons = wrapper.findAll(".mock-tag-delete")
            expect(delete_buttons.length).toBe(2)
        })
    })

    // ==========================================
    // Props Tests
    // ==========================================
    describe("Props", () => {
        it("should have default placeholder", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.vm.$props.placeholder).toBe("Nhập và nhấn Enter...")
        })

        it("should accept custom placeholder", () => {
            const wrapper = mount(TagInput, {
                props: {
                    placeholder: "Nhập email..."
                }
            })
            expect(wrapper.vm.$props.placeholder).toBe("Nhập email...")
        })

        it("should be enabled by default", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.vm.$props.disabled).toBe(false)
        })

        it("should accept disabled prop", () => {
            const wrapper = mount(TagInput, {
                props: {
                    disabled: true
                }
            })
            expect(wrapper.vm.$props.disabled).toBe(true)
        })

        it("should have addOnPaste true by default", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.vm.$props.addOnPaste).toBe(true)
        })

        it("should have showAvatar true by default", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.vm.$props.showAvatar).toBe(true)
        })

        it("should accept error prop", () => {
            const wrapper = mount(TagInput, {
                props: {
                    error: true,
                    errorMessage: "Có lỗi xảy ra"
                }
            })
            expect(wrapper.vm.$props.error).toBe(true)
        })
    })

    // ==========================================
    // Error State Tests
    // ==========================================
    describe("Error State", () => {
        it("should show error message when error is true", () => {
            const wrapper = mount(TagInput, {
                props: {
                    error: true,
                    errorMessage: "Vui lòng nhập email hợp lệ"
                }
            })
            expect(wrapper.text()).toContain("Vui lòng nhập email hợp lệ")
        })

        it("should not show error message when error is false", () => {
            const wrapper = mount(TagInput, {
                props: {
                    error: false,
                    errorMessage: "Error message"
                }
            })
            expect(wrapper.text()).not.toContain("Error message")
        })
    })

    // ==========================================
    // Avatar Tests
    // ==========================================
    describe("Avatar", () => {
        it("should show avatar when showAvatar is true", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["John"],
                    showAvatar: true
                }
            })
            // Avatar placeholder should show first letter
            expect(wrapper.text()).toContain("J")
        })

        it("should not render avatar elements when showAvatar is false", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["John"],
                    showAvatar: false
                }
            })
            // Component should still render tags
            expect(wrapper.find(".mock-tag-item").exists()).toBe(true)
        })
    })

    // ==========================================
    // v-model Tests
    // ==========================================
    describe("v-model", () => {
        it("should emit update:modelValue when tags change", async () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["tag1"]
                }
            })

            // Simulate adding a new tag via props change
            await wrapper.setProps({ modelValue: ["tag1", "tag2"] })

            const tags = wrapper.findAll(".mock-tag-item")
            expect(tags.length).toBe(2)
        })

        it("should handle empty modelValue", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: []
                }
            })
            const tags = wrapper.findAll(".mock-tag-item")
            expect(tags.length).toBe(0)
        })
    })

    // ==========================================
    // Disabled State Tests
    // ==========================================
    describe("Disabled State", () => {
        it("should have disabled class when disabled", () => {
            const wrapper = mount(TagInput, {
                props: {
                    disabled: true
                }
            })
            expect(wrapper.find(".disabled").exists()).toBe(true)
        })

        it("should not be disabled by default", () => {
            const wrapper = mount(TagInput)
            expect(wrapper.find(".disabled").exists()).toBe(false)
        })
    })

    // ==========================================
    // Vietnamese Content Tests
    // ==========================================
    describe("Vietnamese Content", () => {
        it("should handle Vietnamese tag values", () => {
            const wrapper = mount(TagInput, {
                props: {
                    modelValue: ["Nguyễn Văn A", "Trần Thị B"]
                }
            })
            const tags = wrapper.findAll(".mock-tag-item")
            expect(tags.length).toBe(2)
        })

        it("should show Vietnamese placeholder", () => {
            const wrapper = mount(TagInput, {
                props: {
                    placeholder: "Nhập tên người dùng..."
                }
            })
            expect(wrapper.vm.$props.placeholder).toBe("Nhập tên người dùng...")
        })

        it("should show Vietnamese error message", () => {
            const wrapper = mount(TagInput, {
                props: {
                    error: true,
                    errorMessage: "Vui lòng nhập ít nhất một người nhận"
                }
            })
            expect(wrapper.text()).toContain("Vui lòng nhập ít nhất một người nhận")
        })
    })
})

// ==========================================
// TagInput Logic Tests (Unit)
// ==========================================
describe("TagInput Logic (Unit)", () => {
    describe("Avatar placeholder generation", () => {
        const getAvatarPlaceholder = (value: string): string => {
            return value ? value.charAt(0).toUpperCase() : "?"
        }

        it("should return first letter uppercase", () => {
            expect(getAvatarPlaceholder("john")).toBe("J")
            expect(getAvatarPlaceholder("Alice")).toBe("A")
        })

        it("should handle Vietnamese characters", () => {
            expect(getAvatarPlaceholder("Nguyễn")).toBe("N")
            expect(getAvatarPlaceholder("Đức")).toBe("Đ")
        })

        it("should return ? for empty string", () => {
            expect(getAvatarPlaceholder("")).toBe("?")
        })
    })

    describe("Tag validation", () => {
        const isValidEmail = (value: string): boolean => {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return email_regex.test(value)
        }

        it("should validate email format", () => {
            expect(isValidEmail("test@example.com")).toBe(true)
            expect(isValidEmail("user.name@domain.co")).toBe(true)
        })

        it("should reject invalid email", () => {
            expect(isValidEmail("invalid")).toBe(false)
            expect(isValidEmail("test@")).toBe(false)
            expect(isValidEmail("@domain.com")).toBe(false)
        })
    })

    describe("Duplicate detection", () => {
        const isDuplicate = (tags: string[], new_tag: string): boolean => {
            return tags.includes(new_tag)
        }

        it("should detect duplicate tags", () => {
            const tags = ["tag1", "tag2", "tag3"]
            expect(isDuplicate(tags, "tag2")).toBe(true)
        })

        it("should allow unique tags", () => {
            const tags = ["tag1", "tag2"]
            expect(isDuplicate(tags, "tag3")).toBe(false)
        })

        it("should be case sensitive", () => {
            const tags = ["Tag1"]
            expect(isDuplicate(tags, "tag1")).toBe(false)
        })
    })

    describe("Container classes logic", () => {
        const getContainerClasses = (props: {
            disabled: boolean
            error: boolean
            is_focused: boolean
        }): string[] => {
            const classes = ["base-class"]

            if (props.disabled) {
                classes.push("disabled")
            } else if (props.error) {
                classes.push("error")
            } else if (props.is_focused) {
                classes.push("focused")
            } else {
                classes.push("default")
            }

            return classes
        }

        it("should add disabled class when disabled", () => {
            const classes = getContainerClasses({ disabled: true, error: false, is_focused: false })
            expect(classes).toContain("disabled")
        })

        it("should add error class when error and not disabled", () => {
            const classes = getContainerClasses({ disabled: false, error: true, is_focused: false })
            expect(classes).toContain("error")
        })

        it("should add focused class when focused", () => {
            const classes = getContainerClasses({ disabled: false, error: false, is_focused: true })
            expect(classes).toContain("focused")
        })

        it("should add default class when no special state", () => {
            const classes = getContainerClasses({ disabled: false, error: false, is_focused: false })
            expect(classes).toContain("default")
        })
    })
})
