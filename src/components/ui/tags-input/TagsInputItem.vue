<script setup lang="ts">
import type { TagsInputItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"

import { reactiveOmit } from "@vueuse/core"
import { TagsInputItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem v-bind="forwardedProps" :class="cn('flex h-7 items-center rounded-full bg-[#e8edf2] gap-2 pl-1 pr-1.5 py-1 data-[state=active]:ring-[#0069fe] data-[state=active]:ring-2 data-[state=active]:ring-offset-1 ring-offset-background', props.class)">
    <slot />
  </TagsInputItem>
</template>
