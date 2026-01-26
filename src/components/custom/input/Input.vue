<template>
    <div class="input-wrapper w-full">
        <label :class="inputContainerClasses">
            <!-- Prefix icon -->
            <Icon v-if="icon" :name="icon" :size="16" :color="iconColor" class="shrink-0" />

            <input
                ref="inputRef"
                class="w-full"
                :value="displayValue"
                :type="computedType"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :class="inputClasses"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                v-bind="$attrs" />

            <!-- Currency suffix -->
            <div v-if="type === 'currency'" class="text-[#718096] text-[14px] font-medium pointer-events-none shrink-0">
                {{ currency }}
            </div>

            <!-- Custom suffix -->
            <div v-else-if="suffix" class="text-[#718096] text-[14px] font-medium pointer-events-none shrink-0">
                {{ suffix }}
            </div>

            <!-- Password toggle button -->
            <button
                v-if="type === 'password'"
                type="button"
                @click="togglePasswordVisibility"
                class="text-[#7d91a6] hover:text-[#1a2229] transition-colors shrink-0 cursor-pointer">
                <Icon :name="showPassword ? 'eye-off' : 'eye'" :size="16" />
            </button>
        </label>
        <div v-if="error && errorMessage" :class="messageClasses">
            {{ errorMessage }}
        </div>
        <div v-else-if="message" :class="messageClasses">
            {{ message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { cn } from "../../../lib/utils"
import { Icon } from "@/components/custom/icon"

export interface InputProps {
    modelValue?: string | number
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    message?: string
    error?: boolean
    errorMessage?: string
    currency?: string
    locale?: string
    suffix?: string
    icon?: string
    class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
    type: "text",
    disabled: false,
    readonly: false,
    placeholder: "Nhập thông tin",
    error: false,
    currency: "VND",
    locale: "vi-VN"
})

const emit = defineEmits<{
    "update:modelValue": [value: string | number]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const isHovered = ref(false)
const internalValue = ref<string>("")
const showPassword = ref(false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const computedType = computed(() => {
    if (props.type === "password") {
        return showPassword.value ? "text" : "password"
    }
    if (props.type === "currency") {
        return "text"
    }
    return props.type
})

const iconColor = computed(() => {
    if (props.disabled) return "#718096"
    return "#1a2229"
})

const handleMouseEnter = () => {
    if (!props.disabled) {
        isHovered.value = true
    }
}

const handleMouseLeave = () => {
    isHovered.value = false
}

// Format currency
const formatCurrency = (value: number) => {
    if (isNaN(value) || value === 0) return ""

    const formatter = new Intl.NumberFormat(props.locale, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    return formatter.format(value)
}

// Parse currency
const parseCurrency = (value: string) => {
    const cleanValue = value.replace(/[^\d-]/g, "")
    return cleanValue ? parseInt(cleanValue, 10) : 0
}

// Format number
const formatNumber = (value: string) => {
    // Allow negative numbers and decimals
    return value.replace(/[^\d.-]/g, "")
}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    let value = target.value

    if (props.type === "number") {
        value = formatNumber(value)
        internalValue.value = value
        emit("update:modelValue", value)
    } else if (props.type === "currency") {
        // Only allow numbers
        const numericOnly = value.replace(/[^\d]/g, "")
        const numericValue = numericOnly ? parseInt(numericOnly, 10) : 0

        // Format the number immediately
        const formattedValue = formatCurrency(numericValue)

        // Update the input value immediately
        target.value = formattedValue

        // Store cursor position
        const cursorPosition = target.selectionStart || 0

        // Emit the numeric value
        emit("update:modelValue", numericValue)

        // Restore cursor position after formatting
        setTimeout(() => {
            if (inputRef.value) {
                const newLength = formattedValue.length
                const oldLength = (internalValue.value || "").length
                const diff = newLength - oldLength
                const newPosition = Math.min(cursorPosition + diff, newLength)
                inputRef.value.setSelectionRange(newPosition, newPosition)
            }
        })

        internalValue.value = formattedValue
    } else {
        internalValue.value = value
        emit("update:modelValue", value)
    }
}

const handleFocus = (event: FocusEvent) => {
    isFocused.value = true
    emit("focus", event)
}

const handleBlur = (event: FocusEvent) => {
    isFocused.value = false
    emit("blur", event)
}

// Base classes
const baseContainerClasses =
    "relative w-full flex items-center gap-2 bg-white border rounded-lg px-3 py-2.5 transition-all duration-200"

const baseInputClasses = "flex-1 text-[13px] font-medium leading-[20px] bg-transparent outline-none"

// Computed classes based on state
const inputContainerClasses = computed(() => {
    const classes = [baseContainerClasses]

    // Border states
    if (props.disabled) {
        classes.push("opacity-40 cursor-not-allowed border-[#e8edf2]")
    } else if (props.error) {
        classes.push("border-[#dc2626]")
    } else if (isFocused.value) {
        classes.push("border-[#0ff0bb]")
    } else if (isHovered.value) {
        classes.push("border-[#e8edf2] bg-[rgba(218,230,244,0.3)]")
    } else {
        classes.push("border-[#e8edf2]")
    }

    return cn(...classes)
})

const inputClasses = computed(() => {
    const classes = [baseInputClasses]

    // Text color states
    if (props.disabled) {
        classes.push("cursor-not-allowed text-[#718096]")
    } else {
        classes.push("text-[#1a2229]")
    }

    // Placeholder color
    classes.push("placeholder:text-[#7d91a6]")

    if (props.class) {
        classes.push(props.class)
    }

    return cn(...classes)
})

const messageClasses = computed(() => {
    const classes = ["mt-1 text-xs font-normal"]

    if (props.error && props.errorMessage) {
        classes.push("text-[#dc2626]")
    } else {
        classes.push("text-gray-600")
    }

    return cn(...classes)
})

// Display value computed
const displayValue = computed(() => {
    if (props.type === "currency") {
        const numericValue =
            typeof props.modelValue === "number" ? props.modelValue : parseCurrency(String(props.modelValue || ""))
        return formatCurrency(numericValue)
    }
    return props.modelValue || ""
})

// Initialize internal value
watch(
    () => props.modelValue,
    newValue => {
        if (props.type === "currency") {
            const numericValue = typeof newValue === "number" ? newValue : parseCurrency(String(newValue || ""))
            internalValue.value = formatCurrency(numericValue)
        } else {
            internalValue.value = String(newValue || "")
        }
    },
    { immediate: true }
)
</script>
