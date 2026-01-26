<template>
    <slot>
        <div class="px-[12px] py-[10px] flex items-center gap-[12px] justify-between rounded-[12px] border border-[var(--border)] hover:bg-[var(--button-secondary-bg-hover)] duration-300 cursor-pointer bg-white" :class="[props.class, { 'bg-[var(--button-secondary-bg-hover)]': open }]">
            <div class="flex items-center gap-[4px]">
                <Icon v-if="icon" :name="icon" size="16" />
                <span class="whitespace-nowrap text-ellipsis fs-14 fw-500">{{ title }}</span>
            </div>

            <Icon name="arrows-down" size="16" :class="`transition-all duration-300 ${open ? 'rotate-180' : ''}`" />
        </div>
    </slot>
</template>

<script setup lang="ts">
import { Icon } from "../icon"

interface DropdownItemProps {
    title: any
    icon?: string
    open?: boolean
    class?: string
}

const props = withDefaults(defineProps<DropdownItemProps>(), {
    icon: "",
    title: "Chọn",
    open: false,
    class: ""
})
</script>
