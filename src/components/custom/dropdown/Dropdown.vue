<template>
    <DropdownMenu v-model:open="isOpen">
        <DropdownMenuTrigger as-child :disabled="disabled" :class="[currTitleWidth, props.class]">
            <div
                :ref="el => setRef('triggerRef', el)"
                class="relative inline-flex items-center cursor-pointer">
                <slot name="trigger">
                    <DropdownTitle class="w-full bg-white" :title="title" :open="isOpen" :icon="icon" />
                </slot>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            :side="dropdownSide"
            :align="dropdownAlign"
            :side-offset="4"
            :collision-padding="20"
            :avoid-collisions="true"
            :sticky="'always'"
            :class="[
                'bg-white border border-[#E1ECF4] rounded-[12px] shadow-[0px_2px_4px_0px_rgba(105,105,105,0.1)] overflow-auto',
                props.noPadding ? '!p-0' : '!p-[12px]',
                `h-[${props.bodyHeight}]`,
                currBodyWidth,
                props.contentClass
            ]"
            @interact-outside="
                e => {
                    if (priority) {
                        e.preventDefault()
                    }
                }
            ">
            <slot />
        </DropdownMenuContent>
    </DropdownMenu>
</template>
<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { randomString } from "@/common"
import DropdownTitle from "./DropdownTitle.vue"

import { computed, ref, onMounted, onUnmounted, watch, nextTick, reactive } from "vue"
const model = defineModel<boolean>()

type Position = "bottom" | "top" | "left" | "right" | "bottom-start" | "bottom-end" | "top-start" | "top-end"

interface DropdownProps {
    disabled?: boolean
    bodyHeight?: string
    position?: Position
    priority?: boolean
    showArrow?: boolean
    titleWidth?: string
    bodyWidth?: string
    title?: string
    class?: string
    icon?: string
    noPadding?: boolean
    contentClass?: string
}

const props = withDefaults(defineProps<DropdownProps>(), {
    disabled: false,
    position: "bottom-start",
    priority: false,
    showArrow: true,
    titleWidth: "fit-content",
    bodyWidth: "fit-content",
    bodyHeight: "fit-content",
    title: "Chọn",
    class: "",
    icon: "",
    noPadding: false,
    contentClass: ""
})

const emit = defineEmits<{
    open: []
    close: []
}>()

// Internal state for open/close
const isOpen = ref(false)
const triggerWidth = ref(0)
const id = randomString(12)
const refs = reactive<Record<string, HTMLElement>>({})
const setRef = (name: string, el: any) => {
    if (el) refs[`${name}_${id}`] = el
}

const currTitleWidth = computed(() => {
    if (props.titleWidth === "100%") return "w-full"
    return `w-[${props.titleWidth}]`
})

const currBodyWidth = computed(() => {
    if (props.bodyWidth === "auto") return `w-[${triggerWidth.value}px]`
    return `w-[${props.bodyWidth}]`
})

// const contentHeight = computed(() => {
//   if (props.height) {
//     if (typeof props.height === "number") {
//       return `${props.height}px`;
//     }
//     return props.height;
//   }
//   return "auto";
// });

const updateTriggerWidth = () => {
    if (!refs[`triggerRef_${id}`]) return

    // Wait for next tick to ensure DOM is updated
    nextTick(() => {
        if (!refs[`triggerRef_${id}`]) return

        // The trigger element might be the div itself or its first child
        let actualWidth = 0

        // Try to get width from the div itself first
        actualWidth = refs[`triggerRef_${id}`]?.offsetWidth || 0

        // If div has no width, try its first child
        if (actualWidth === 0 && refs[`triggerRef_${id}`]?.firstElementChild) {
            actualWidth = (refs[`triggerRef_${id}`]?.firstElementChild as HTMLElement)?.offsetWidth || 0
        }

        triggerWidth.value = actualWidth
    })
}

// Watch for open state changes
watch(isOpen, newValue => {
    if (newValue) {
        // Update width when dropdown opens
        updateTriggerWidth()
        // Update again after animation
        setTimeout(updateTriggerWidth, 150)
        emit("open")
    } else {
        emit("close")
    }
    model.value = newValue
})

watch(
    () => model.value,
    val => (isOpen.value = val as boolean),
    { immediate: true }
)

onMounted(() => {
    // Update width multiple times to ensure we catch it
    updateTriggerWidth()
    setTimeout(updateTriggerWidth, 10)
    setTimeout(updateTriggerWidth, 100)

    window.addEventListener("resize", updateTriggerWidth)
})

onUnmounted(() => {
    window.removeEventListener("resize", updateTriggerWidth)
})

// Map position to reka-ui side and align
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

// Computed props for template
const dropdownSide = computed(() => sideMap[props.position] as "bottom" | "top" | "left" | "right")
const dropdownAlign = computed(() => alignMap[props.position] as "end" | "center" | "start")
</script>
