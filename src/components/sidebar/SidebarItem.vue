<template>
    <router-link
        :to="route"
        class="flex items-center h-8 gap-2 px-2 py-1.5 rounded-lg cursor-pointer relative z-10 w-full no-underline">
        <Icon :name="icon" :size="16" color="white" class="shrink-0" />
        <span
            class="text-sm text-white truncate whitespace-nowrap transition-opacity duration-300"
            :class="[
                is_active ? 'font-semibold' : 'font-medium',
                is_expanded ? 'opacity-100' : 'opacity-0'
            ]">
            {{ label }}
        </span>
    </router-link>
</template>

<script setup lang="ts">
import Icon from "@/components/custom/icon/Icon.vue"

interface Props {
    label: string
    icon: string
    route: string
    is_active: boolean
    is_expanded: boolean
}

defineProps<Props>()
</script>
