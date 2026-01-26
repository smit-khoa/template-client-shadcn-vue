<template>
    <!-- Inline SVG rendering (for gradient icons) -->
    <svg
        v-if="shouldRenderInline && svgContent"
        :class="['icon', 'icon-inline', className]"
        :style="inlineIconStyle"
        :width="computedSize"
        :height="computedSize"
        :viewBox="svgContent.viewBox"
        v-html="svgContent.content"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false" />

    <!-- Normal SVG rendering -->
    <svg
        v-else
        :class="['icon', className]"
        :style="iconStyle"
        :width="computedSize"
        :height="computedSize"
        fill="currentColor"
        viewBox="0 0 24 24"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <use :href="`#${name}`" />
    </svg>
</template>

<script>
import { computed, ref, onMounted, watch } from "vue";
import { useSprite } from "../../../composables/useSprite";
import { needsInlineRendering } from "./iconConfig";
import { extractSvgContent } from "./iconUtils";

export default {
    name: "Icon",
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [Number, String],
            default: 24
        },
        color: {
            type: String,
            default: "currentColor"
        },
        hoverColor: {
            type: String,
            default: ""
        },
        className: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        // Load sprite when component is used
        useSprite();

        const svgContent = ref(null);
        const isHovered = ref(false);
        const shouldRenderInline = computed(() => needsInlineRendering(props.name));

        // Computed current color based on hover state
        const currentColor = computed(() => {
            if (isHovered.value && props.hoverColor) {
                return props.hoverColor;
            }
            return props.color;
        });

        const loadSvgContent = async () => {
            if (shouldRenderInline.value) {
                svgContent.value = await extractSvgContent(props.name, props.color);
            }
        };

        onMounted(() => {
            loadSvgContent();
        });

        watch(
            () => props.name,
            () => {
                loadSvgContent();
            }
        );

        watch(
            () => props.color,
            () => {
                if (shouldRenderInline.value) {
                    loadSvgContent();
                }
            }
        );

        const computedSize = computed(() => {
            if (typeof props.size === "number") {
                return `${props.size}px`;
            }
            return props.size;
        });

        const iconStyle = computed(() => ({
            color: currentColor.value,
            width: computedSize.value,
            height: computedSize.value,
            transition: props.hoverColor ? "color 0.15s ease" : undefined
        }));

        // Style cho inline icon - không set fill để giữ nguyên gradient
        const inlineIconStyle = computed(() => ({
            width: computedSize.value,
            height: computedSize.value
        }));

        return {
            computedSize,
            iconStyle,
            inlineIconStyle,
            shouldRenderInline,
            svgContent,
            isHovered
        };
    }
};
</script>

<style scoped>
.icon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    flex-shrink: 0;
}

/* Icon inline không set fill/stroke để giữ nguyên style gốc */
.icon-inline {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
}

/* Đảm bảo defs trong inline icon hoạt động */
.icon-inline :deep(defs) {
    display: block;
}
</style>
