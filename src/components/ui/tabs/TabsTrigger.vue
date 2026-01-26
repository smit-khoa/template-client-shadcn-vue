<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="cn(
      `relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 rounded-full cursor-pointer hover:text-gray-800
      data-[state=active]:text-white data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:scale-110 data-[state=active]:z-10
      data-[state=active]:before:absolute data-[state=active]:before:inset-0 data-[state=active]:before:rounded-full data-[state=active]:before:bg-gradient-to-br data-[state=active]:before:from-white/20 data-[state=active]:before:to-transparent data-[state=active]:before:blur-md
      data-[state=active]:after:absolute data-[state=active]:after:inset-0 data-[state=active]:after:rounded-full data-[state=active]:after:bg-white data-[state=active]:after:-z-10
      disabled:pointer-events-none disabled:opacity-50
      [&_svg]:size-5 [&_svg]:shrink-0`,
      props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
