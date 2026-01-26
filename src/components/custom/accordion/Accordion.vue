<template>
    <div class="border rounded-[16px] overflow-hidden">
        <div class="bg-white p-[16px] user-select-none" :class="!disabled && 'cursor-pointer'" @click="toggleContent">
            <slot name="title"></slot>
        </div>
        <transition name="slide">
            <div v-if="isOpen" class="overflow-hidden">
                <div class="bg-white">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

// props
interface AccordionProps {
    disabled?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
    disabled: false
})

// data
const isOpen = ref(false)
const model = defineModel<boolean>()

// emit
const emit = defineEmits<{
    open: []
    close: []
}>()

// watch
watch(
    () => model.value,
    () => {
        isOpen.value = model.value || false
    }
)

// mounted
onMounted(() => {
    if (model.value !== undefined) isOpen.value = model.value
})

const toggleContent = () => {
    if (props.disabled) return
    isOpen.value = !isOpen.value

    if (isOpen.value) {
        emit("open")
    } else {
        emit("close")
    }

    model.value = isOpen.value
}
</script>

<style scoped>
.slide-enter-active {
    transition: all 0.3s ease-out;
}
.slide-leave-active {
    transition: all 0.2s ease-in;
}

.slide-enter-from {
    max-height: 0;
}

.slide-enter-to {
    max-height: 100vh;
}

.slide-leave-from {
    max-height: 100vh;
}

.slide-leave-to {
    max-height: 0;
}

.slide-enter-active > div,
.slide-leave-active > div {
    overflow: hidden;
}
</style>
