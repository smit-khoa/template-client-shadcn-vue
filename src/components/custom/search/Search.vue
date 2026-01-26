<template>
    <div class="search-wrapper w-full">
        <div :class="containerClasses">
            <Icon class="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none" name="search" size="20" />
            <input
                ref="inputRef"
                v-model="searchValue"
                :type="type"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :class="inputClasses"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                @keydown.enter="handleEnter"
                v-bind="$attrs" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { cn } from "../../../lib/utils"
import { Icon } from "../icon"

interface SearchProps {
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    debounce?: number
    type?: string
    class?: string
}

const props = withDefaults(defineProps<SearchProps>(), {
    modelValue: "",
    placeholder: "Tìm kiếm",
    disabled: false,
    readonly: false,
    debounce: 300,
    type: "text"
})

const emit = defineEmits<{
    "update:modelValue": [value: string]
    search: [value: string]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    enter: [value: string]
}>()

const inputRef = ref<HTMLInputElement>()
const searchValue = ref(props.modelValue)
const debounceTimer = ref<number>()
const isFocused = ref(false)
const isHovered = ref(false)

// Sync with v-model
watch(
    () => props.modelValue,
    newValue => {
        searchValue.value = newValue || ""
    }
)

const handleMouseEnter = () => {
    if (!props.disabled) {
        isHovered.value = true
    }
}

const handleMouseLeave = () => {
    isHovered.value = false
}

// Base classes
const baseContainerClasses = "relative w-full"

const baseInputClasses =
    "w-full text-[13px] font-medium leading-[20px] font-['Inter_Tight'] bg-white border rounded-xl outline-none transition-all duration-200 pl-[40px] pr-[12px] py-[10px] h-[36px]"

// Computed classes based on state
const containerClasses = computed(() => {
    return cn(baseContainerClasses)
})

const inputClasses = computed(() => {
    const classes = [baseInputClasses]

    // Border and background states
    if (props.disabled) {
        classes.push("opacity-40 cursor-not-allowed border-[#e1ecf4] text-[#718096]")
    } else if (isFocused.value) {
        classes.push("border-[#0ff0bb] text-[#0d0d0d] bg-white")
    } else if (isHovered.value) {
        classes.push("border-[#e1ecf4] bg-[rgba(218,230,244,0.7)] text-[#718096]")
    } else {
        classes.push("border-[#e1ecf4] text-[#718096]")
    }

    // Placeholder color
    classes.push("placeholder:text-[#718096]")

    if (props.class) {
        classes.push(props.class)
    }

    return cn(...classes)
})

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    searchValue.value = value
    emit("update:modelValue", value)

    // Debounced search
    if (props.debounce > 0) {
        clearTimeout(debounceTimer.value)
        debounceTimer.value = window.setTimeout(() => {
            emit("search", value)
        }, props.debounce)
    } else {
        emit("search", value)
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

const handleEnter = () => {
    emit("enter", searchValue.value)
}

// Public methods
defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur()
})
</script>
