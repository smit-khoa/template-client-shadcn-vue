<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogAction, type AlertDialogActionProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
    <AlertDialogAction v-bind="delegatedProps" :class="cn(props.class, 'flex-1')">
        <slot />
    </AlertDialogAction>
</template>
