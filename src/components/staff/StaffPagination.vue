<template>
    <div class="flex items-center justify-between px-[24px] py-[16px] shrink-0 bg-white rounded-b-[12px]">
        <!-- Left: per-page + count -->
        <div class="flex items-center gap-[16px]">
            <div class="flex items-center gap-[8px]">
                <span class="text-[13px] font-medium leading-[16px] text-[#7d91a6]">Hiển thị</span>
                <div class="relative">
                    <select
                        class="bg-[#f5f8fc] text-[14px] font-medium leading-[20px] text-[#1a2229] rounded-[8px] px-[12px] py-[6px] pr-[28px] appearance-none cursor-pointer outline-none border-none"
                        :value="per_page"
                        @change="onPerPageChange">
                        <option v-for="opt in per_page_options" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                    <Icon
                        class="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none"
                        name="arrow-down-01"
                        :size="14"
                        color="#1a2229" />
                </div>
            </div>
            <div class="flex items-center gap-[4px] text-[13px] font-medium leading-[16px]">
                <span class="text-[#000a2c]">{{ range_start }}-{{ range_end }}</span>
                <span class="text-[#7d91a6]">/ {{ total }} tài khoản</span>
            </div>
        </div>

        <!-- Right: page navigation -->
        <Pagination
            :total="total"
            :items-per-page="per_page"
            :default-page="1"
            :page="current_page"
            show-edges
            @update:page="$emit('update:current_page', $event)">
            <PaginationContent v-slot="{ items }" class="flex items-center gap-[5px]">
                <PaginationFirst class="w-[28px] h-[28px] rounded-[6px] bg-[#f5f8fc] flex items-center justify-center hover:bg-[#e8edf2] transition-colors" />
                <PaginationPrevious class="w-[28px] h-[28px] rounded-[6px] bg-[#f5f8fc] flex items-center justify-center hover:bg-[#e8edf2] transition-colors" />

                <template v-for="(item, index) in items" :key="index">
                    <PaginationItem
                        v-if="item.type === 'page'"
                        :value="item.value"
                        :is-active="item.value === current_page"
                        class="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center text-[12px] font-medium leading-[14px] cursor-pointer transition-colors"
                        :class="
                            item.value === current_page
                                ? 'text-white'
                                : 'bg-white text-[#0d0d0d] hover:bg-[#f5f8fc]'
                        "
                        :style="item.value === current_page ? { background: 'var(--gradient)' } : {}">
                        {{ item.value }}
                    </PaginationItem>
                    <PaginationEllipsis
                        v-else-if="item.type === 'ellipsis'"
                        :index="index"
                        class="w-[28px] h-[28px] flex items-center justify-center text-[13px] text-[#0d0d0d]" />
                </template>

                <PaginationNext class="w-[28px] h-[28px] rounded-[6px] bg-[#f5f8fc] flex items-center justify-center hover:bg-[#e8edf2] transition-colors" />
                <PaginationLast class="w-[28px] h-[28px] rounded-[6px] bg-[#f5f8fc] flex items-center justify-center hover:bg-[#e8edf2] transition-colors" />
            </PaginationContent>
        </Pagination>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Icon } from "@/components/custom/icon"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"

const props = defineProps<{
    current_page: number
    per_page: number
    total: number
}>()

const emit = defineEmits<{
    "update:current_page": [value: number]
    "update:per_page": [value: number]
}>()

const per_page_options = [10, 20, 50, 100]

const range_start = computed(() => Math.min((props.current_page - 1) * props.per_page + 1, props.total))
const range_end = computed(() => Math.min(props.current_page * props.per_page, props.total))

const onPerPageChange = (e: Event) => {
    const val = parseInt((e.target as HTMLSelectElement).value)
    emit("update:per_page", val)
    emit("update:current_page", 1)
}
</script>
