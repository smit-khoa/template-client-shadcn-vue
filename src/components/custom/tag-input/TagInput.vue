<template>
    <div class="tag-input-wrapper w-full">
        <TagsInputRoot
            v-model="model_value"
            :add-on-paste="false"
            :delimiter="delimiter"
            :disabled="disabled"
            :class="containerClasses">
            <!-- Tags list -->
            <TagsInputItem
                v-for="tag in model_value"
                :key="tag"
                :value="tag"
                class="flex h-7 items-center rounded-full bg-[#e8edf2] gap-2 pl-1 pr-1.5 py-1 data-[state=active]:ring-[#0069fe] data-[state=active]:ring-2 data-[state=active]:ring-offset-1 ring-offset-background">
                <!-- Avatar -->
                <div v-if="showAvatar" class="relative shrink-0 size-5 rounded-full overflow-hidden bg-grey-300">
                    <span
                        class="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white bg-grey-400">
                        {{ getAvatarPlaceholder(tag) }}
                    </span>
                </div>

                <!-- Tag text -->
                <TagsInputItemText class="text-sm font-medium text-neutral-100" />

                <!-- Delete button -->
                <TagsInputItemDelete
                    class="flex items-center justify-center rounded-full bg-transparent hover:bg-grey-300/30 transition-colors cursor-pointer">
                    <Icon name="cancel-01" :size="14" color="#636665" />
                </TagsInputItemDelete>
            </TagsInputItem>

            <!-- Input field -->
            <TagsInputInput
                ref="inputRef"
                :placeholder="model_value.length === 0 ? placeholder : ''"
                class="text-sm font-medium min-h-5 focus:outline-none flex-1 bg-transparent placeholder:text-grey-400 text-neutral-100"
                @keydown.enter.prevent="handleAddTag"
                @keydown.tab.prevent="handleAddTag"
                @keydown.,.prevent="handleAddTag"
                @keydown.space.prevent="handleAddTag"
                @paste="handlePaste" />
        </TagsInputRoot>

        <!-- Error message -->
        <div v-if="error && errorMessage" class="mt-1 text-xs font-normal text-destructive">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { TagsInputRoot, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "reka-ui"
import { Icon } from "@/components/custom/icon"
import { cn } from "@/lib/utils"

export interface TagInputProps {
    modelValue?: string[]
    placeholder?: string
    disabled?: boolean
    error?: boolean
    errorMessage?: string
    addOnPaste?: boolean
    delimiter?: RegExp | string
    showAvatar?: boolean
    validate?: (value: string) => boolean
    checkDuplicate?: (value: string) => boolean // Custom duplicate checker (e.g., check against external list)
    class?: string
}

const props = withDefaults(defineProps<TagInputProps>(), {
    modelValue: () => [],
    placeholder: "Nhập và nhấn Enter...",
    disabled: false,
    error: false,
    addOnPaste: true,
    delimiter: () => /[,\s\n\t]+/,
    showAvatar: true
})

const emit = defineEmits<{
    "update:modelValue": [value: string[]]
    add: [value: string]
    remove: [value: string]
    invalid: [value: string]
    duplicate: [value: string] // Emitted when duplicate is detected
}>()

const inputRef = ref<InstanceType<typeof TagsInputInput>>()
const is_focused = ref(false)

// Get input element from TagsInputInput component
function getInputElement(): HTMLInputElement | null {
    return inputRef.value?.$el as HTMLInputElement | null
}

// Two-way binding for tags
const model_value = computed({
    get: () => props.modelValue,
    set: (value: string[]) => emit("update:modelValue", value)
})

// Container classes
const containerClasses = computed(() => {
    const classes = [
        "flex flex-wrap gap-1.5 items-center rounded-lg bg-white px-3 py-2.5 text-sm transition-all duration-200 outline-none min-h-10",
        "border"
    ]

    if (props.disabled) {
        classes.push("opacity-40 cursor-not-allowed border-grey-200")
    } else if (props.error) {
        classes.push("border-destructive ring-destructive/20 ring-[3px]")
    } else if (is_focused.value) {
        classes.push("border-[#0ff0bb] ring-[#0ff0bb]/20 ring-[3px]")
    } else {
        classes.push("border-grey-200 hover:border-grey-300")
    }

    if (props.class) {
        classes.push(props.class)
    }

    return cn(...classes)
})

// Get avatar placeholder from tag value
function getAvatarPlaceholder(value: string): string {
    return value ? value.charAt(0).toUpperCase() : "?"
}

// Handle adding tag
function handleAddTag() {
    const input_el = getInputElement()
    if (!input_el) return

    const value = input_el.value.trim()

    if (!value) return

    // Validate if validator provided
    if (props.validate && !props.validate(value)) {
        emit("invalid", value)
        return
    }

    // Check for duplicates in current tags
    if (model_value.value.includes(value)) {
        emit("duplicate", value)
        input_el.value = ""
        return
    }

    // Check for duplicates using custom checker (e.g., already added staff)
    if (props.checkDuplicate && props.checkDuplicate(value)) {
        emit("duplicate", value)
        input_el.value = ""
        return
    }

    // Add tag
    model_value.value = [...model_value.value, value]
    emit("add", value)
    input_el.value = ""
}

// Handle paste event to properly validate and dedupe
function handlePaste(event: ClipboardEvent) {
    if (!props.addOnPaste) return

    event.preventDefault()
    const paste_data = event.clipboardData?.getData("text") || ""
    const delimiter = props.delimiter instanceof RegExp ? props.delimiter : new RegExp(props.delimiter)
    const values = paste_data.split(delimiter).map(v => v.trim()).filter(Boolean)

    if (values.length === 0) return

    const valid_values: string[] = []
    const seen = new Set(model_value.value)

    for (const value of values) {
        // Skip if already in current tags or seen in this paste batch
        if (seen.has(value)) {
            emit("duplicate", value)
            continue
        }

        // Validate if validator provided
        if (props.validate && !props.validate(value)) {
            emit("invalid", value)
            continue
        }

        // Check custom duplicate checker
        if (props.checkDuplicate && props.checkDuplicate(value)) {
            emit("duplicate", value)
            continue
        }

        valid_values.push(value)
        seen.add(value)
    }

    if (valid_values.length > 0) {
        model_value.value = [...model_value.value, ...valid_values]
        valid_values.forEach(v => emit("add", v))
    }
}

// Watch for focus state
watch(
    () => inputRef.value,
    el => {
        if (el) {
            const input_el = el.$el as HTMLInputElement
            input_el?.addEventListener("focus", () => (is_focused.value = true))
            input_el?.addEventListener("blur", () => (is_focused.value = false))
        }
    }
)

// Expose methods
defineExpose({
    focus: () => {
        getInputElement()?.focus()
    },
    clear: () => {
        model_value.value = []
        const input_el = getInputElement()
        if (input_el) input_el.value = ""
    }
})
</script>
