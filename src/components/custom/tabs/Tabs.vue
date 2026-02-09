<template>
    <fieldset class="switcher" ref="switcherRef">
        <label
            class="switcher__option"
            v-for="(item, index) in tabs"
            :key="item.key"
            :ref="el => setItemRef(el, index)">
            <input
                class="switcher__input"
                type="radio"
                name="tabs"
                :value="item.key"
                v-model="selected"
                @change="changeTab"
                :c-option="index + 1" />
            <div class="flex items-center gap-[4px]">
                <Icon v-if="item.icon" :name="item.icon" size="20" />
                {{ item.title }}
            </div>
        </label>
        <!-- <img
            class="absolute h-[53px]"
            style="transition: all 0.5s cubic-bezier(0.72, 0.73, 0.2, 0.71)"
            :style="selectedStyle"
            src="@/assets/images/light.png"
            alt="" /> -->
        <!-- <div class="switcher-selected" :class="animationClass" :style="selectedStyle" /> -->
    </fieldset>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue"
import { Icon } from "../icon"

interface tab {
    key: string
    title: string
    icon?: string
}

interface Props {
    tabs?: tab[]
    modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
    tabs: () => [],
    modelValue: ""
})

// Khởi tạo refs
const itemRefs = ref<{ [key: number]: HTMLElement | null }>({})
const switcherRef = ref<HTMLElement | null>(null)
const posLeft = ref(4)
const width = ref(84)
const isAnimating = ref(false)
const animationType = ref<"normal" | "left-edge" | "right-edge">("normal")

// Hàm này sẽ được gọi cho mỗi item trong v-for để gán ref
const setItemRef = (el: any, index: number) => {
    if (el) {
        itemRefs.value[index] = el
    }
}

const emit = defineEmits<{
    "update:modelValue": [value: string]
}>()

const selected = ref(props.modelValue || props.tabs[0]?.key || "")
// Computed style cho thanh trượt
const selectedStyle = computed(() => ({
    left: `${posLeft.value}px`,
    width: `${width.value}px`
}))

// // Computed class cho animation
// const animationClass = computed(() => ({
//     "is-animating": isAnimating.value
// }))

// Hàm tính toán vị trí và chiều rộng của thanh trượt
const updateSliderPosition = async () => {
    await nextTick()
    const selectedIndex = props.tabs.findIndex(tab => tab.key === selected.value)
    if (selectedIndex !== -1 && itemRefs.value[selectedIndex]) {
        const el = itemRefs.value[selectedIndex]
        posLeft.value = el.offsetLeft - 5
        width.value = el.offsetWidth + 10
    }
}

watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            selected.value = newValue
            updateSliderPosition()
        }
    }
)

watch(
    () => props.tabs,
    () => {
        if (!selected.value && props.tabs.length > 0) {
            selected.value = props.tabs[0]?.key || ""
        }
        updateSliderPosition()
    },
    { deep: true, immediate: true }
)

const changeTab = () => {
    emit("update:modelValue", selected.value)

    // Xác định loại animation dựa trên vị trí
    const selectedIndex = props.tabs.findIndex(tab => tab.key === selected.value)

    if (selectedIndex === 0) {
        animationType.value = "left-edge"
    } else if (selectedIndex === props.tabs.length - 1) {
        animationType.value = "right-edge"
    } else {
        animationType.value = "normal"
    }

    // Trigger animation
    isAnimating.value = true
    updateSliderPosition()

    // Reset animation state after animation completes
    setTimeout(() => {
        isAnimating.value = false
    }, 800)
}

onMounted(() => {
    updateSliderPosition()

    if (switcherRef.value) {
        const trackPrevious = (el: HTMLElement) => {
            const radios = el.querySelectorAll('input[type="radio"]')
            let previousValue: string | null = null

            // init first select
            const initiallyChecked = el.querySelector('input[type="radio"]:checked') as HTMLInputElement
            if (initiallyChecked) {
                previousValue = initiallyChecked.getAttribute("c-option")
                el.setAttribute("c-previous", previousValue ?? "")
            }

            radios.forEach(radio => {
                radio.addEventListener("change", () => {
                    const inputRadio = radio as HTMLInputElement
                    if (inputRadio.checked) {
                        el.setAttribute("c-previous", previousValue ?? "")
                        previousValue = inputRadio.getAttribute("c-option")
                    }
                })
            })
        }

        trackPrevious(switcherRef.value)
    }
})
</script>

<style scoped lang="scss">
.switcher {
    --c-glass: #bbbbbc;
    --c-light: #fff;
    --c-dark: #000;

    --c-content: #224;
    --c-action: #0052f5;

    --glass-reflex-dark: 1;
    --glass-reflex-light: 1;

    --saturation: 150%;

    font-optical-sizing: auto;
    //   color: var(--c-content);

    transition: background 400ms cubic-bezier(1, 0, 0.4, 1), color 400ms cubic-bezier(1, 0, 0.4, 1);

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: auto;
    max-width: 100%;
    height: 46px;
    box-sizing: border-box;
    padding: 4px;
    margin: 0;
    border: none;
    user-select: none;
    border-radius: 16px;
    overflow: hidden; // Đảm bảo thanh trượt không vượt quá
    background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);
    backdrop-filter: blur(8px) url(#switcher) saturate(var(--saturation));
    -webkit-backdrop-filter: blur(8px) saturate(var(--saturation));
    // box-shadow: inset 0 0 0 1px
    //     color-mix(
    //       in srgb,
    //       var(--c-light) calc(var(--glass-reflex-light) * 10%),
    //       transparent
    //     ),
    //   inset 1.8px 3px 0px -2px color-mix(in srgb, var(--c-light)
    //         calc(var(--glass-reflex-light) * 90%), transparent),
    //   inset -2px -2px 0px -2px color-mix(in srgb, var(--c-light)
    //         calc(var(--glass-reflex-light) * 80%), transparent),
    //   inset -3px -8px 1px -6px color-mix(in srgb, var(--c-light)
    //         calc(var(--glass-reflex-light) * 60%), transparent),
    //   inset -0.3px -1px 4px 0px
    //     color-mix(
    //       in srgb,
    //       var(--c-dark) calc(var(--glass-reflex-dark) * 12%),
    //       transparent
    //     ),
    //   inset -1.5px 2.5px 0px -2px
    //     color-mix(
    //       in srgb,
    //       var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
    //       transparent
    //     ),
    //   inset 0px 3px 4px -2px color-mix(in srgb, var(--c-dark)
    //         calc(var(--glass-reflex-dark) * 20%), transparent),
    //   inset 2px -6.5px 1px -4px
    //     color-mix(
    //       in srgb,
    //       var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
    //       transparent
    //     ),
    //   0px 1px 5px 0px
    //     color-mix(
    //       in srgb,
    //       var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
    //       transparent
    //     ),
    //   0px 6px 16px 0px
    //     color-mix(
    //       in srgb,
    //       var(--c-dark) calc(var(--glass-reflex-dark) * 8%),
    //       transparent
    //     );
    transition: background-color 400ms cubic-bezier(1, 0, 0.4, 1), box-shadow 400ms cubic-bezier(1, 0, 0.4, 1);

    &-selected {
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 84px;
        height: calc(100% - 10px);
        border-radius: 12px;
        background-color: color-mix(in srgb, var(--c-glass) 36%, transparent);
        z-index: -1;

        // Hiệu ứng giọt nước - chuyển động tự nhiên
        // transition: left 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
        //   width 600ms cubic-bezier(0.34, 1.56, 0.64, 1),
        //   transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
        transition: left 600ms cubic-bezier(0.66, 0.1, 0.44, 1.04), width 600ms cubic-bezier(0, 0, 0.54, 1.1),
            transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);

        box-shadow: inset 0 0 0 1px
                color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
            inset 2px 1px 0px -1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 90%), transparent),
            inset -1.5px -1px 0px -1px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 80%), transparent),
            inset -2px -6px 1px -5px color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent),
            inset -1px 2px 3px -1px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent),
            inset 0px -4px 1px -2px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent),
            0px 3px 6px 0px color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent);

        &.is-animating {
            animation: waterDrop 800ms ease-out;
        }
    }
}

.switcher__input {
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
}

.switcher__option {
    //   --c: var(--c-content);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: fit-content;
    height: 42px;
    box-sizing: border-box;
    border-radius: 16px;
    opacity: 1;
    transition: color 160ms;
    white-space: nowrap;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    z-index: 1;
    color: #fff;
}

// .switcher__option:hover {
//   --c: var(--c-action);
//   cursor: pointer;
// }

// .switcher__option:has(input:checked) {
//   --c: var(--c-content);
//   cursor: auto;
// }

// Animation giọt nước bình thường
@keyframes waterDrop {
    // 0% {
    //   transform: translateY(-50%) scaleX(1);
    // }
    // 15% {
    //   // Giai đoạn giãn nở khi bắt đầu
    //   transform: translateY(-50%) scaleX(1.2) scaleY(0.95);
    // }
    // 50% {
    //   // Di chuyển nhanh ở giữa
    //   transform: translateY(-50%) scaleX(0.9) scaleY(1);
    // }
    // 70% {
    //   // Dồn nước khi tới nơi
    //   transform: translateY(-50%) scaleX(1) scaleY(0.95);
    // }
    // 85% {
    //   // Quán tính và co lại
    //   transform: translateY(-50%) scaleX(0.95) scaleY(1);
    // }
    // 100% {
    //   // Trở về trạng thái bình thường
    //   transform: translateY(-50%) scaleX(1) scaleY(1);
    // }
}
</style>
