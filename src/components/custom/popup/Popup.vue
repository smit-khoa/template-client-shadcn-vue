<template>
    <Dialog v-model:open="isOpen">
        <DialogContent
            class="!p-0 !border-0 !shadow-none !bg-transparent overflow-visible outline-none"
            :class="hasWrapper ? `!rounded-[${props.rounded}]` : `!rounded-[${props.rounded}]`"
            :style="{ width: contentWidth, height: height }"
            @pointer-down-outside="
                e => {
                    if (!closeOnClickOutside) {
                        e.preventDefault()
                    }
                }
            ">
            <!-- Outer wrapper with glass effect -->
            <div
                class="flex flex-col max-h-[calc(100vh-40px)] max-w-[calc(100vw-40px)]"
                :class="hasWrapper ? 'bg-white/20 p-2 rounded-[16px]' : ''">
                <!-- Inner content -->
                <div
                    class="flex flex-col gap-0 overflow-hidden bg-white"
                    :class="hasWrapper ? 'rounded-[12px]' : 'rounded-[16px]'"
                    :style="{ width: width, height: height }">
                    <slot v-if="isCustom" />
                    <template v-else>
                        <!-- Header -->
                        <div class="flex items-center justify-between p-[20px]">
                            <div class="flex items-center gap-2">
                                <slot name="header-icon" />
                                <DialogTitle class="fs-18 fw-600">
                                    {{ title }}
                                    <slot name="header-title" />
                                </DialogTitle>
                            </div>
                            <!-- <div class="flex items-center gap-4">
                                <slot name="header-extra" />
                                <DialogClose class="p-0 h-5 w-5 opacity-70 hover:opacity-100 transition-opacity"> </DialogClose>
                            </div> -->
                        </div>

                        <!-- Body -->
                        <div class="flex-1 overflow-y-auto p-[0_20px]">
                            <DialogDescription class="sr-only">
                                {{ title ? `Dialog content for ${title}` : "Dialog content" }}
                            </DialogDescription>
                            <slot />
                        </div>

                        <!-- Footer -->
                        <div v-if="showFooter" class="p-[20px] border-top">
                            <slot name="footer" />
                        </div>
                    </template>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../ui/dialog"

import { computed, useSlots, watch } from "vue"

interface PopupProps {
    modelValue: boolean
    title?: string
    width?: string
    height?: string
    closeOnClickOutside?: boolean
    isCustom?: boolean
    hasWrapper?: boolean
    rounded?: string
}

const props = withDefaults(defineProps<PopupProps>(), {
    title: "",
    closeOnClickOutside: true,
    height: "max-content",
    width: "max-content",
    isCustom: false,
    hasWrapper: false,
    rounded: "16px"
})

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "close"): void
}>()

const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value)
})

// Tính toán width cho DialogContent khi có wrapper (thêm padding 8px * 2)
const contentWidth = computed(() => {
    if (!props.hasWrapper || props.width === "max-content") return props.width
    // Nếu width là số px, thêm 16px cho wrapper padding
    const match = props.width?.match(/^(\d+)px$/)
    if (match) {
        return `${parseInt(match[1] || "0") + 16}px`
    }
    return props.width
})

const slots = useSlots()
const showFooter = computed(() => {
    // Check if footer slot has content
    return !!slots.footer
})

watch(isOpen, newVal => {
    if (!newVal) {
        emit("close")
    }
})
</script>
