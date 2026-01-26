<template>
    <slot>
        <Tooltip :content="tooltip">
            <div
                class="px-[8px] py-[4px] flex items-center gap-[12px] justify-between mt-[6px] h-[32px] sm-dropdown-item rounded-[8px] hover:bg-[var(--button-secondary-bg-hover)] duration-300"
                :class="getClass"
                @click="handleClick">
                <div class="flex items-center gap-[4px]">
                    <Icon v-if="icon" :name="icon" size="16" :color="state === 'selected' ? '#17c098' : colorIcon" />
                    <span
                        class="whitespace-nowrap text-ellipsis fs-14 fw-500"
                        :style="
                            state === 'selected' &&
                            'background: var(--gradient); background-clip: text; -webkit-text-fill-color: transparent;'
                        "
                        >{{ value }}</span
                    >
                </div>

                <Icon v-if="state === 'selected'" name="checked" size="16" />
            </div>
        </Tooltip>
    </slot>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Icon } from "../icon"
import { Tooltip } from "../tooltip"

interface DropdownItemProps {
    value: any
    icon?: string
    state?: "default" | "selected" | "disabled"
    tooltip?: string
    colorIcon?: string
}

const props = withDefaults(defineProps<DropdownItemProps>(), {
    icon: "",
    value: "Chọn",
    state: "default",
    tooltip: "",
    colorIcon: "currentColor"
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const getClass = computed(() => {
    const classList = ["cursor-pointer"]

    if (props.state === "disabled") {
        classList.push("!cursor-not-allowed opacity-50")
    }
    return classList.join(" ")
})

const handleClick = (event: MouseEvent) => {
    if (props.state !== "disabled") {
        emit("click", event)
    }
}
</script>

<style scoped lang="scss">
.sm-dropdown-item:first-child {
    margin-top: 0;
}
</style>
