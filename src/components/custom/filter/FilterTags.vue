<template>
    <div v-if="tags.length > 0" class="filter-tags flex items-center gap-2 flex-wrap bg-[#f5f8fc] p-2 rounded-lg">
        <!-- Filter Tags -->
        <div class="flex items-center gap-2 flex-1">
            <div
                v-for="tag in tags"
                :key="`${tag.categoryKey}-${tag.value}`"
                class="flex items-center gap-1.5 px-2 py-1 bg-white border border-primary-200 rounded-lg">
                <!-- Icon based on category -->
                <Icon v-if="tag.icon" :name="tag.icon" :size="16" color="#33C4AA" />
                <!-- Tag label -->
                <span class="text-sm font-medium text-[#1a2229]">{{ tag.label }}</span>
                <!-- Remove button -->

                <Icon
                    name="cancel-01"
                    :size="12"
                    color="#7d91a6"
                    hover-color="#F93939"
                    class="cursor-pointer"
                    @click="removeTag(tag.categoryKey, tag.value)" />
            </div>
        </div>

        <!-- Clear all link -->
        <button
            class="text-sm font-medium text-[#7d91a6] hover:text-red-500 cursor-pointer transition-colors"
            @click="clearAll">
            Bỏ tất cả
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Icon } from "@/components/custom/icon"
import type { FilterCategory } from "./FilterPanel.vue"

interface FilterTag {
    categoryKey: string
    value: string
    label: string
    icon?: string
}

interface Props {
    categories: FilterCategory[]
    selected: Record<string, string[]>
}

const props = defineProps<Props>()

const emit = defineEmits<{
    remove: [categoryKey: string, value: string]
    "clear-all": []
}>()

// Compute flat list of selected tags with their labels
const tags = computed<FilterTag[]>(() => {
    const result: FilterTag[] = []

    for (const [category_key, values] of Object.entries(props.selected)) {
        if (!values || values.length === 0) continue

        // Find category config
        const category = props.categories.find(c => c.key === category_key)
        if (!category) continue

        // Find each selected option's label
        for (const value of values) {
            let label = value
            // Search in all groups for the option
            for (const group of category.groups) {
                const option = group.options.find(o => o.value === value)
                if (option) {
                    label = option.label
                    break
                }
            }

            result.push({
                categoryKey: category_key,
                value,
                label,
                icon: category.icon
            })
        }
    }

    return result
})

const removeTag = (category_key: string, value: string) => {
    emit("remove", category_key, value)
}

const clearAll = () => {
    emit("clear-all")
}
</script>
