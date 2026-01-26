<template>
    <div class="inline-flex items-center" :class="containerClass">
        <div class="flex items-center cursor-pointer" @click="handleClick">
            <!-- Checkbox -->
            <div
                v-if="type === 'checkbox'"
                class="relative w-[24px] h-[24px] flex items-center justify-center"
                :class="[disabled && 'opacity-50', isHovered && !disabled && 'bg-[#e7fdf8] rounded-[5px]']"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false">
                <!-- Unchecked state -->
                <transition name="fade" mode="out-in">
                    <div v-if="!isChecked" class="absolute inset-[3px]">
                        <svg class="w-full h-full" fill="none" viewBox="0 0 18 18">
                            <path
                                d="M1 8.91667C1 5.18471 1 3.31874 2.15937 2.15937C3.31874 1 5.18471 1 8.91667 1C12.6486 1 14.5146 1 15.674 2.15937C16.8333 3.31874 16.8333 5.18471 16.8333 8.91667C16.8333 12.6486 16.8333 14.5146 15.674 15.674C14.5146 16.8333 12.6486 16.8333 8.91667 16.8333C5.18471 16.8333 3.31874 16.8333 2.15937 15.674C1 14.5146 1 12.6486 1 8.91667Z"
                                :stroke="disabled ? '#718096' : '#718096'"
                                :fill="disabled ? '#e1ecf4' : 'none'"
                                stroke-width="1.5" />
                        </svg>
                    </div>

                    <!-- Checked state -->
                    <div v-else class="absolute inset-[3px]">
                        <svg class="w-full h-full" fill="none" viewBox="0 0 18 18">
                            <rect fill="white" width="9.55811" height="9.35181" x="3.76261" y="3.89434" />
                            <path
                                d="M8.58887 2.10417e-07C10.4145 -1.07277e-05 11.8492 -0.000123642 12.9688 0.150391C14.1158 0.304652 15.0261 0.627695 15.7412 1.34277C16.4561 2.05789 16.7784 2.96819 16.9326 4.11523C17.0831 5.23472 17.083 6.66866 17.083 8.49414V8.58887C17.083 10.4144 17.0831 11.8492 16.9326 12.9688C16.7784 14.1157 16.4563 15.0261 15.7412 15.7412C15.0261 16.4563 14.1157 16.7784 12.9688 16.9326C11.8492 17.0831 10.4144 17.083 8.58887 17.083H8.49414C6.66866 17.083 5.23472 17.0831 4.11523 16.9326C2.96819 16.7784 2.05789 16.4561 1.34277 15.7412C0.627695 15.0261 0.304652 14.1158 0.150391 12.9688C-0.000123633 11.8492 -1.07277e-05 10.4145 2.10415e-07 8.58887V8.49414C-1.0727e-05 6.66868 -9.33916e-05 5.23471 0.150391 4.11523C0.30463 2.96802 0.627609 2.05794 1.34277 1.34277C2.05794 0.627609 2.96802 0.30463 4.11523 0.150391C5.23471 -9.33827e-05 6.66868 -1.0727e-05 8.49414 2.10417e-07H8.58887ZM12.4385 5.42773C12.0992 5.11675 11.5717 5.13929 11.2607 5.47852L7.26563 9.83691L5.79785 8.36914C5.47242 8.0437 4.94458 8.0437 4.61914 8.36914C4.29371 8.69458 4.2937 9.22242 4.61914 9.54785L6.70215 11.6309C6.86282 11.7915 7.0824 11.8799 7.30957 11.875C7.53681 11.8701 7.75266 11.772 7.90625 11.6045L12.4893 6.60449C12.8 6.26535 12.7773 5.73873 12.4385 5.42773Z"
                                fill="#0cc096" />
                        </svg>
                    </div>
                </transition>
            </div>

            <!-- Radio -->
            <div
                v-else-if="type === 'radio'"
                class="relative w-[24px] h-[24px] flex items-center justify-center"
                :class="[disabled && 'opacity-50']">
                <div
                    class="absolute w-[20px] h-[20px] rounded-full border-[1.5px] transition-all"
                    :class="[
                        modelValue === value
                            ? 'bg-[#cffcf1] border-[#0cc096]'
                            : disabled
                            ? 'bg-[#e1ecf4] border-[#718096]'
                            : 'bg-white border-[#718096]'
                    ]">
                    <!-- Radio dot -->
                    <div v-if="modelValue === value" class="absolute inset-[5px] rounded-full bg-[#0cc096]" />
                </div>
            </div>

            <!-- Label -->
            <span
                v-if="label"
                class="ml-[8px] text-sm font-medium leading-5 text-[#1a2229] select-none"
                :class="[disabled ? 'text-gray-400' : 'text-gray-700']">
                {{ label }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

export interface CheckboxProps {
    modelValue?: boolean | string | number | any[]
    value?: string | number | boolean
    label?: string
    disabled?: boolean
    type?: "checkbox" | "radio"
    name?: string
    class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
    modelValue: false,
    disabled: false,
    type: "checkbox"
})

const emit = defineEmits<{
    "update:modelValue": [value: boolean | string | number | any[]]
    change: [value: boolean | string | number | any[]]
}>()

const isHovered = ref(false)

const isChecked = computed(() => {
    if (props.type === "radio") {
        return props.modelValue === props.value
    }

    // Checkbox
    if (Array.isArray(props.modelValue)) {
        return props.value !== undefined && props.modelValue.includes(props.value)
    }

    return !!props.modelValue
})

const containerClass = computed(() => {
    return props.class || ""
})

const handleClick = (event: MouseEvent) => {
    if (props.disabled) return

    event.stopPropagation()
    event.preventDefault()

    let newValue: boolean | string | number | any[]

    if (props.type === "checkbox") {
        // Nếu modelValue là mảng
        if (Array.isArray(props.modelValue)) {
            const currentArray = [...props.modelValue]
            if (isChecked.value) {
                // Xóa value khỏi mảng
                const index = currentArray.indexOf(props.value)
                if (index > -1) {
                    currentArray.splice(index, 1)
                }
            } else {
                // Thêm value vào mảng nếu chưa có
                if (props.value !== undefined && !currentArray.includes(props.value)) {
                    currentArray.push(props.value)
                }
            }
            newValue = currentArray
        } else {
            // Xử lý như boolean bình thường
            newValue = !isChecked.value
        }
    } else {
        newValue = props.value || true
    }

    emit("update:modelValue", newValue)
    emit("change", newValue)
}
</script>
