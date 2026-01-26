<template>
    <Sheet v-model:open="isOpen">
        <SheetContent
            :class="cn(sheetContentClasses, props.hasOverlay && 'bg-white/20 p-2')"
            class="!rounded-[16px] m-[10px] overflow-hidden sm-drawer-content !max-w-[calc(100vw-20px)] min-w-[250px] flex flex-col shadow-lg h-[calc(100vh-20px)]"
            :side="props.side"
            :hide-close="props.hideClose"
            @escape-key-down="handleEscapeKeyDown"
            @interact-outside="handleInteractOutside">
            <!-- Inner content wrapper when hasOverlay is true -->
            <div
                v-if="props.hasOverlay"
                class="flex flex-col flex-1 overflow-hidden bg-white rounded-[16px]">
                <div
                    class="drawer-resize"
                    :class="props.side === 'left' ? 'drawer-resize-right' : 'drawer-resize-left'"
                    @mousedown="handleMouseDown">
                    <div class="drawer-resize-hover"></div>
                </div>
                <slot>
                    <!-- Header -->
                    <div v-if="$slots.header" class="drawer-header p-[20px_20px_0_20px]">
                        <slot name="header" />
                    </div>

                    <!-- Content -->
                    <div class="drawer-content flex-1 overflow-y-auto p-[20px]">
                        <slot name="content" />
                    </div>

                    <!-- Footer -->
                    <div v-if="$slots.footer" class="drawer-footer px-[20px] py-[15px] border-t border-[var(--border)]">
                        <slot name="footer" />
                    </div>
                </slot>
            </div>
            <!-- Default layout without overlay -->
            <template v-else>
                <div
                    class="drawer-resize"
                    :class="props.side === 'left' ? 'drawer-resize-right' : 'drawer-resize-left'"
                    @mousedown="handleMouseDown">
                    <div class="drawer-resize-hover"></div>
                </div>
                <slot>
                    <!-- Header -->
                    <div v-if="$slots.header" class="drawer-header p-[20px_20px_0_20px]">
                        <slot name="header" />
                    </div>

                    <!-- Content -->
                    <div class="drawer-content flex-1 overflow-y-auto p-[20px]">
                        <slot name="content" />
                    </div>

                    <!-- Footer -->
                    <div v-if="$slots.footer" class="drawer-footer px-[20px] py-[15px] border-t border-[var(--border)]">
                        <slot name="footer" />
                    </div>
                </slot>
            </template>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { Sheet, SheetContent } from "../../ui/sheet"
import { cn } from "../../../lib/utils"

// props
interface DrawerProps {
    modelValue?: boolean
    isPriority?: boolean
    isConfirm?: boolean
    class?: string
    width?: string
    hideClose?: boolean
    side?: "left" | "right"
    hasOverlay?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
    modelValue: false,
    isPriority: false,
    isConfirm: false,
    class: "",
    width: "max-content",
    hideClose: false,
    side: "right",
    hasOverlay: false
})

// emit
const emit = defineEmits<{
    "update:modelValue": [value: boolean]
    "confirm-close": []
    open: []
    close: []
}>()

// data
const isOpen = ref(props.modelValue)
const isResize = ref(false)
const widthResize = ref(props.width)
const widthResizeStart = ref(0)

// watch
watch(
    () => props.modelValue,
    newValue => {
        isOpen.value = newValue
    }
)

watch(isOpen, newValue => {
    emit("update:modelValue", newValue)
    if (newValue) {
        emit("open")
    } else {
        emit("close")
    }
})

// computed
const sheetContentClasses = computed(() => {
    return cn(`w-[${widthResize.value}]`, props.class)
})

// mounted
onMounted(() => {
    widthResize.value = props.width
})

// methods
const handleInteractOutside = (event: Event) => {
    if (props.isConfirm) {
        emit("confirm-close")
        return event.preventDefault()
    }

    if (props.isPriority) return event.preventDefault()
}

const handleEscapeKeyDown = (event: KeyboardEvent) => {
    if (props.isConfirm) {
        event.preventDefault()
        emit("confirm-close")
    }
}

const open = () => {
    isOpen.value = true
}

const close = () => {
    if (props.isConfirm) {
        emit("confirm-close")
        return
    }
    isOpen.value = false
}

const handleMouseMove = (e: MouseEvent) => {
    if (isResize.value) {
        if (props.side === "left") {
            widthResize.value = `${Math.min(Math.max(250, e.pageX - 5), window.innerWidth - 20)}px`
        } else {
            widthResize.value = `${Math.min(Math.max(250, window.innerWidth - e.pageX - 5), window.innerWidth - 20)}px`
        }
    }
}

const handleMouseDown = (e: MouseEvent) => {
    isResize.value = true
    widthResizeStart.value = e.pageX
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
}

const handleMouseUp = () => {
    isResize.value = false
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleMouseUp)
}

defineExpose({
    open,
    close
})
</script>

<style lang="scss">
/* Smooth animations */
.drawer-content {
    transition: transform 0.3s ease-in-out;
}

/* Custom scrollbar for content area */
.drawer-content::-webkit-scrollbar {
    width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.sm-drawer-content::after {
    background: transparent !important;
}

.drawer-resize {
    position: absolute;
    top: 0;
    width: 9px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &-left {
        left: 0;
    }

    &-right {
        right: 0;
    }

    &:hover {
        background: rgba(135, 135, 135, 0.231);
        .drawer-resize-hover {
            display: block;
        }
    }

    &-hover {
        display: none;
        width: 3px;
        height: 30px;
        background: var(--neutral);
        border-radius: 2px;
    }
}
</style>
