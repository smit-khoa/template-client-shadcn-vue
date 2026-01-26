<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogCancel, type AlertDialogCancelProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
    <AlertDialogCancel
        v-bind="delegatedProps"
        :class="
            cn(
                'flex-1 h-[36px] border border-[var(--button-secondary-border)] rounded-[12px] bg-[var(--button-secondary-bg)] duration-300 hover:bg-[var(--button-secondary-bg-hover)] cursor-pointer fs-14',
                props.class
            )
        ">
        <slot />
    </AlertDialogCancel>
</template>
