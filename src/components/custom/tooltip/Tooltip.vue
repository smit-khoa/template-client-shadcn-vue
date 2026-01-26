<template>
    <TooltipProvider v-if="content">
        <Tooltip>
            <TooltipTrigger :class="props.class"><slot /></TooltipTrigger>
            <TooltipContent class="bg-[var(--black)]">
                <slot name="content">
                    <p class="text-white fw-500 fs-14">{{ content }}</p>
                </slot>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <slot v-else />
</template>

<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"

const props = defineProps({
    content: {
        type: String,
        default: ""
    },
    class: {
        type: String,
        default: ""
    }
})
</script>
