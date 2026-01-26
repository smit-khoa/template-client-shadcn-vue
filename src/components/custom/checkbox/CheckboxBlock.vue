<template>
    <Tooltip :content="tooltip">
        <div class="p-[10px] flex items-center justify-between gap-[6px] border rounded-[12px] hover:bg-[var(--button-secondary-bg-hover)] duration-300" :class="[props.class, disabled ? 'cursor-not-allowed bg-[var(--button-secondary-bg-disabled)] opacity-50' : 'cursor-pointer']" @click="handleClick">
            <template v-if="type === 'checkbox'">
                <slot>
                    <span class="text-ellipsis">{{ label }}</span>
                </slot>
                <Checkbox v-model="checked" :disabled="disabled" :value="value" @click.stop />
            </template>
            <div class="flex items-center gap-[6px] w-full" v-else>
                <Checkbox name="name" type="radio" v-model="checked" :disabled="disabled" :value="value" @click.stop />
                <slot>
                    <span class="text-ellipsis">{{ label }}</span>
                </slot>
            </div>
        </div>
    </Tooltip>
</template>

<script setup lang="ts">
import Checkbox from "./Checkbox.vue"
import { Tooltip } from "../tooltip"
import { computed } from "vue"

// props
const props = defineProps({
    modelValue: {
        type: [Boolean, String, Number, Array],
        default: false
    },
    label: {
        type: String,
        default: ""
    },
    class: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false
    },
    tooltip: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "checkbox"
    },
    value: {
        type: [String, Number, Boolean],
        default: ""
    }
})

const emit = defineEmits<{
    "update:modelValue": [value: boolean | string | number | any[]]
    click: [event: MouseEvent]
}>()

const checked = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean | string | number | any[]) {
        emit("update:modelValue", value)
    }
})

const handleClick = (event: MouseEvent) => {
    if (props.disabled) return
    
    // Toggle checkbox value
    let newValue: boolean | string | number | any[]
    
    if (props.type === "checkbox") {
        if (Array.isArray(props.modelValue)) {
            // Xử lý array cho multiple checkboxes
            const currentArray = [...props.modelValue]
            const index = currentArray.indexOf(props.value)
            
            if (index > -1) {
                currentArray.splice(index, 1)
            } else if (props.value !== undefined) {
                currentArray.push(props.value)
            }
            newValue = currentArray
        } else {
            // Boolean checkbox
            newValue = !props.modelValue
        }
    } else {
        // Radio
        newValue = props.value || true
    }
    
    emit("update:modelValue", newValue)
    emit("click", event)
}
</script>
