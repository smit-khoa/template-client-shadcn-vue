<template>
    <slot v-if="display" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

// props
const props = defineProps<{
    open: boolean
}>()

const display = ref(false)

// watch
watch(
    () => props.open,
    value => {
        if (value) return (display.value = true)
        setTimeout(() => (display.value = false), 300)
    }
)
</script>
