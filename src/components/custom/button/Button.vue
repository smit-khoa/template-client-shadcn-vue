<template>
    <Tooltip :content="tooltip">
        <button
            :class="buttonClasses"
            :disabled="disabled || loading"
            :type="type"
            :style="buttonStyles"
            v-bind="$attrs">
            <div class="flex items-center justify-center" :class="{ 'gap-0': onlyIcon, 'gap-1': !onlyIcon }">
                <Spinner v-if="loading" :class="`size-[${iconSize}px]`" :style="{ color: iconColor }" />
                <Icon v-else-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
                <span v-if="!onlyIcon" :class="textClasses">
                    <slot />
                </span>
            </div>
        </button>
    </Tooltip>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { cn } from "../../../lib/utils"
import { Icon } from "@/components/custom/icon"
import { Tooltip } from "@/components/custom/tooltip"
import { Spinner } from "@/components/ui/spinner"

type ButtonVariant = "primary" | "secondary" | "noborder" | "danger" | "error" | "success" | "tool"
type ButtonSize = "default" | "sm" | "lg" | "mini" | "tiny"

interface ButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    type?: "button" | "submit" | "reset"
    class?: string
    icon?: string
    onlyIcon?: boolean
    tooltip?: string
    color_icon?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary",
    size: "default",
    disabled: false,
    loading: false,
    type: "button",
    onlyIcon: false,
    tooltip: "",
    color_icon: ""
})

const baseClasses =
    "box-border content-stretch flex items-center justify-center overflow-clip relative rounded-lg transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"

const variantClasses = computed(() => {
    const { variant, disabled, loading } = props

    if (variant === "primary") {
        if (disabled || loading) {
            return "opacity-50"
        }
        return "hover:opacity-80"
    }

    if (variant === "secondary") {
        if (disabled || loading) {
            return "bg-[var(--button-secondary-bg-disabled)] opacity-50 border border-[var(--button-secondary-border)]"
        }
        return "bg-[var(--button-secondary-bg)] border border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-bg-hover)]"
    }

    if (variant === "noborder") {
        if (disabled || loading) {
            return "opacity-60"
        }
        return "hover:opacity-80"
    }

    if (variant === "danger") {
        if (disabled || loading) {
            return "opacity-50"
        }
        return "hover:!bg-[#FEE4E2]"
    }

    if (variant === "error") {
        if (disabled || loading) {
            return "opacity-50"
        }
        return "hover:!bg-[#D92D20]"
    }

    if (variant === "success") {
        if (disabled || loading) {
            return "opacity-50"
        }
        return "hover:!bg-[#D1FADF]"
    }

    if (variant === "tool") {
        if (disabled || loading) {
            return "opacity-50"
        }
        return "hover:opacity-50"
    }

    return ""
})

const sizeClasses: Record<ButtonSize, string> = {
    default: "px-[16px] py-[8px] text-[13px] h-[36px]",
    sm: "px-[16px] py-[8px] text-[12px] h-[32px]",
    lg: "px-[16px] py-[8px] text-[14px] h-[40px]",
    mini: "px-[8px] py-[8px] text-[12px] h-[36px]",
    tiny: "px-[12px] py-[12px] text-[13px] h-[36px]"
}

const textClasses = computed(() => {
    const { variant, disabled, loading } = props
    const baseTextClasses = "font-semibold leading-[20px] whitespace-nowrap"

    if (variant === "primary") {
        return cn(baseTextClasses, "text-[var(--white)]")
    }

    if (variant === "secondary") {
        if (disabled || loading) {
            return cn(baseTextClasses, "text-[var(--text-secondary-disabled)]")
        }
        return cn(baseTextClasses, "text-[var(--text-secondary)]")
    }

    if (variant === "noborder") {
        return cn(baseTextClasses, "text-[var(--text-secondary)]")
    }

    if (variant === "danger") {
        return cn(baseTextClasses, "text-[#D92D20]")
    }

    if (variant === "error") {
        return cn(baseTextClasses, "text-white")
    }

    if (variant === "success") {
        return cn(baseTextClasses, "text-[#12B76A]")
    }

    if (variant === "tool") {
        return cn(baseTextClasses, "text-[#1a2229]")
    }

    return baseTextClasses
})

const iconColor = computed(() => {
    if (props.color_icon) return props.color_icon
    const { variant, disabled, loading } = props

    if (variant === "primary") {
        return "var(--white)"
    }

    if (variant === "secondary") {
        if (disabled || loading) {
            return "var(--text-secondary-disabled)"
        }
        return "var(--text-secondary)"
    }

    if (variant === "noborder") {
        return "var(--text-link)"
    }

    if (variant === "danger") {
        return "var(--danger-600)"
    }

    if (variant === "error") {
        return "var(--danger-600)"
    }

    if (variant === "success") {
        return "#12B76A"
    }

    if (variant === "tool") {
        return "#1a2229"
    }

    return "var(--text-secondary)"
})

const iconSize = computed(() => {
    const { size, variant } = props

    if (variant === "noborder") {
        return 16
    }

    switch (size) {
        case "sm":
            return 16
        case "lg":
            return 20
        default:
            return 20
    }
})

const buttonClasses = computed(() => {
    return cn(baseClasses, variantClasses.value, sizeClasses[props.size], props.loading && "cursor-wait", props.class)
})

const buttonStyles = computed(() => {
    const styles: Record<string, string> = {}

    // Add background gradient for primary variant
    if (props.variant === "primary" && !props.disabled && !props.loading) {
        styles.background = "var(--gradient)"
    } else if (props.variant === "primary" && (props.disabled || props.loading)) {
        styles.background = "var(--gradient)"
    } else if (props.variant === "danger") {
        styles.border = "1px solid #FEE4E2"
        styles.background = "#FFFAFA"
        styles.color = "var(--danger-600)"
    } else if (props.variant === "error") {
        styles.background = "var(--danger-600)"
        styles.color = "#fff"
    } else if (props.variant === "success") {
        styles.background = "#F6FEF9"
        styles.color = "#12B76A"
        styles.border = "1px solid #D1FADF"
    } else if (props.variant === "tool") {
        styles.background = "#F5F8FC"
        styles.color = "#1a2229"
    }

    return styles
})
</script>
