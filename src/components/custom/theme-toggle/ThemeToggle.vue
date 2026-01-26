<template>
    <div
        class="relative flex items-center gap-1 p-0.5 rounded-full bg-white/10 cursor-pointer"
        role="radiogroup"
        aria-label="Theme selector">
        <!-- Sliding indicator -->
        <div
            :class="[
                'absolute size-7 rounded-full bg-white/20 border border-[#d6fffe] transition-all duration-300 ease-out',
                is_dark ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
            ]" />

        <!-- Light mode button -->
        <button
            type="button"
            role="radio"
            :aria-checked="!is_dark"
            class="relative z-10 flex items-center justify-center size-7 rounded-full p-1 cursor-pointer transition-all duration-300 hover:scale-110"
            @click="setTheme('light')">
            <Icon
                name="sun-03"
                :size="16"
                color="#fff"
                :class="[
                    'transition-all duration-300',
                    !is_dark ? 'opacity-100 rotate-0' : 'opacity-60 rotate-90'
                ]" />
        </button>

        <!-- Dark mode button -->
        <button
            type="button"
            role="radio"
            :aria-checked="is_dark"
            class="relative z-10 flex items-center justify-center size-7 rounded-full p-1 cursor-pointer transition-all duration-300 hover:scale-110"
            @click="setTheme('dark')">
            <Icon
                name="moon-02"
                :size="16"
                color="#fff"
                :class="[
                    'transition-all duration-300',
                    is_dark ? 'opacity-100 rotate-0' : 'opacity-60 -rotate-90'
                ]" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@/components/custom/icon"
import { useTheme } from "@/composables/useTheme"

const { is_dark, setTheme } = useTheme()
</script>
