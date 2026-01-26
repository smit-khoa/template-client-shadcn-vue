<template>
    <div class="filter-panel">
        <Dropdown
            v-model="is_open"
            position="bottom-start"
            :priority="true"
            body-width="fit-content"
            no-padding
            content-class="!p-0 !overflow-visible !bg-transparent !border-none !shadow-none"
            @open="handleOpen"
            @close="handleClose">
            <!-- Custom Trigger -->
            <template #trigger>
                <Button
                    icon="filter-horizontal"
                    variant="tool"
                    size="tiny"
                    :class="{ 'ring-2 ring-primary/30': is_open || has_active_filters }">
                    Bộ lọc
                    <span
                        v-if="active_filter_count > 0"
                        class="ml-1 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">
                        {{ active_filter_count }}
                    </span>
                </Button>
            </template>

            <!-- Dropdown Content: Two Panels -->
            <div class="flex gap-2 items-start">
                <!-- Categories Panel (Left) -->
                <div
                    class="bg-white border border-[#e8edf2] rounded-lg shadow-[0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] w-[220px] h-fit pb-3">
                    <!-- Header -->
                    <div class="flex items-center justify-between px-5 py-3 border-b border-[#e8edf2]">
                        <span class="text-sm font-semibold text-[#000a2c]">Bộ lọc</span>

                        <Icon
                            name="cancel-01"
                            :size="16"
                            color="#1a2229"
                            hover-color="#7d91a6"
                            class="cursor-pointer"
                            @click="closeFilter" />
                    </div>
                    <!-- Category List -->
                    <div class="flex flex-col gap-2 pt-3">
                        <div v-for="category in categories" :key="category.key" class="px-2">
                            <button
                                class="w-full flex items-center justify-between h-8 px-2.5 rounded-md cursor-pointer transition-colors"
                                :class="active_category === category.key ? 'bg-[#f5f8fc]' : 'hover:bg-grey-100'"
                                @click="toggleCategory(category.key)">
                                <div class="flex items-center gap-2">
                                    <Icon :name="category.icon" :size="16" color="#1a2229" />
                                    <span class="text-sm font-medium text-[#1a2229]">{{ category.label }}</span>
                                </div>
                                <Icon
                                    v-if="active_category === category.key"
                                    name="arrow-right-01"
                                    :size="16"
                                    color="#1a2229" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Options Panel (Right) - Only show when category is selected -->
                <Transition name="options-slide">
                    <div
                        v-if="active_category && current_category"
                        class="bg-white border border-[#e8edf2] rounded-lg shadow-[0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] w-[204px] h-fit py-2.5">
                        <!-- Groups -->
                        <template v-for="group in current_category.groups" :key="group.key">
                            <!-- Group Label -->
                            <div class="px-4 py-1.5">
                                <span class="text-sm font-medium text-[#7d91a6]">{{ group.label }}</span>
                            </div>
                            <!-- Options -->
                            <div class="flex flex-col gap-1 px-2">
                                <CheckboxBlock
                                    v-for="option in group.options"
                                    :key="option.value"
                                    v-model="local_selected[active_category!]"
                                    :value="option.value"
                                    :label="option.label"
                                    class="!rounded-lg !p-2 !border-transparent text-sm font-medium text-[#000a2c]" />
                            </div>
                        </template>

                        <!-- Footer Actions -->
                        <div class="flex items-center justify-end gap-1 px-3 pt-3 mt-2 border-t border-[#e8edf2]">
                            <Button variant="noborder" size="sm" @click="clearFilters">Bỏ lọc</Button>
                            <Button variant="primary" size="sm" @click="applyFilters">Lọc</Button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { Icon } from "@/components/custom/icon"
import { Button } from "@/components/custom/button"
import { Dropdown } from "@/components/custom/dropdown"
import { CheckboxBlock } from "@/components/custom/checkbox"

// Types
export interface FilterOption {
    value: string
    label: string
}

export interface FilterGroup {
    key: string
    label: string
    options: FilterOption[]
}

export interface FilterCategory {
    key: string
    label: string
    icon: string
    groups: FilterGroup[]
}

interface Props {
    categories: FilterCategory[]
    selected?: Record<string, string[]>
}

const props = withDefaults(defineProps<Props>(), {
    categories: () => [],
    selected: () => ({})
})

const emit = defineEmits<{
    change: [filters: Record<string, string[]>]
    clear: []
}>()

// State
const is_open = ref(false)
const active_category = ref<string | null>(null)
const local_selected = ref<Record<string, string[]>>({})

// Computed
const current_category = computed(() => {
    if (!active_category.value) return null
    return props.categories.find(c => c.key === active_category.value) || null
})

const has_active_filters = computed(() => {
    return Object.values(props.selected).some(arr => arr.length > 0)
})

const active_filter_count = computed(() => {
    return Object.values(props.selected).reduce((sum, arr) => sum + arr.length, 0)
})

// Methods
const handleOpen = () => {
    // Copy selected to local state
    local_selected.value = JSON.parse(JSON.stringify(props.selected))
    // Don't auto-select category - wait for user to click
    active_category.value = null
}

const handleClose = () => {
    // Reset active category on close
    active_category.value = null
}

const closeFilter = () => {
    is_open.value = false
}

// Toggle category - click again to close
const toggleCategory = (key: string) => {
    if (active_category.value === key) {
        active_category.value = null
    } else {
        active_category.value = key
        // Initialize array for category if not exists
        if (!local_selected.value[key]) {
            local_selected.value[key] = []
        }
    }
}

const clearFilters = () => {
    local_selected.value = {}
    emit("clear")
    emit("change", {})
    closeFilter()
}

const applyFilters = () => {
    emit("change", JSON.parse(JSON.stringify(local_selected.value)))
    closeFilter()
}

// Watch for external selected changes
watch(
    () => props.selected,
    new_val => {
        if (!is_open.value) {
            local_selected.value = JSON.parse(JSON.stringify(new_val))
        }
    },
    { deep: true }
)
</script>

<style lang="scss" scoped>
.options-slide-enter-active,
.options-slide-leave-active {
    transition: all 0.15s ease;
}

.options-slide-enter-from,
.options-slide-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}
</style>
