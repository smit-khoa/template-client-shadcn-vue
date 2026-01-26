<template>
    <div class="px-[12px] py-[10px] relative rounded-xl transition-all duration-200 border border-solid" :class="boxClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface BoxProps {
    state?: "default" | "selected" | "disabled";
    class?: string;
}

const props = withDefaults(defineProps<BoxProps>(), {
    state: "default"
});

const boxClasses = computed(() => {
    const classes: string[] = [];

    switch (props.state) {
        case "default":
            classes.push("border-[var(--border)] cursor-pointer hover:bg-[var(--button-secondary-bg-hover)]");
            break;
        case "selected":
            classes.push("bg-[#e7fdf8] border-[var(--border-primary)] cursor-pointer");
            break;

        case "disabled":
            classes.push("border-[var(--border)] opacity-40 cursor-not-allowed");
            break;
        default:
            classes.push("bg-white");
    }

    if (props.class) {
        classes.push(props.class);
    }

    return classes.join(" ");
});
</script>
