<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  src?: string
  alt?: string
  class?: HTMLAttributes["class"]
}>()

function getAvatarPlaceholder(email: string): string {
  return email ? email.charAt(0).toUpperCase() : "?"
}
</script>

<template>
  <div :class="cn('relative shrink-0 size-4 rounded-full overflow-hidden bg-grey-300', props.class)">
    <img
      v-if="src"
      :src="src"
      :alt="alt || 'avatar'"
      class="absolute inset-0 size-full object-cover"
    />
    <span
      v-else
      class="absolute inset-0 flex items-center justify-center text-[8px] font-semibold text-white bg-grey-400"
    >
      {{ getAvatarPlaceholder(alt || '') }}
    </span>
  </div>
</template>
