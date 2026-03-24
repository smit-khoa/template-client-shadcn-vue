<template>
    <div class="flex items-center justify-between gap-[10px] shrink-0">
        <!-- Left: view mode + tabs -->
        <div class="flex items-center gap-[10px]">
            <!-- View mode toggle -->
            <div class="bg-[#f5f8fc] flex items-center gap-[4px] p-[4px] rounded-[12px]">
                <button
                    class="flex items-center justify-center w-[32px] h-[32px] rounded-[8px] transition-colors"
                    :class="view_mode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/60'"
                    @click="$emit('update:view_mode', 'grid')">
                    <Icon name="layout-shape" :size="16" :color="view_mode === 'grid' ? '#000a2c' : '#7d91a6'" />
                </button>
                <button
                    class="flex items-center justify-center w-[32px] h-[32px] rounded-[8px] transition-colors"
                    :class="view_mode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/60'"
                    @click="$emit('update:view_mode', 'list')">
                    <Icon name="layout-row" :size="16" :color="view_mode === 'list' ? '#000a2c' : '#7d91a6'" />
                </button>
            </div>

            <!-- Tab switcher -->
            <div class="bg-[#f5f8fc] flex items-center gap-[4px] p-[4px] rounded-[12px]">
                <button
                    class="flex items-center gap-[6px] px-[16px] py-[6px] rounded-[8px] text-[14px] font-semibold leading-[20px] transition-colors"
                    :class="
                        active_tab === 'joined'
                            ? 'bg-white text-[#2eb9a0] shadow-sm'
                            : 'text-[#1a2229] hover:bg-white/60'
                    "
                    @click="$emit('update:active_tab', 'joined')">
                    Danh sách đã tham gia
                </button>
                <button
                    class="flex items-center gap-[6px] px-[16px] py-[6px] rounded-[8px] text-[14px] font-semibold leading-[20px] transition-colors"
                    :class="
                        active_tab === 'invited'
                            ? 'bg-white text-[#2eb9a0] shadow-sm'
                            : 'text-[#1a2229] hover:bg-white/60'
                    "
                    @click="$emit('update:active_tab', 'invited')">
                    Danh sách đã mời
                </button>
            </div>
        </div>

        <!-- Right: actions -->
        <div class="flex items-center gap-[10px]">
            <!-- Refresh -->
            <button
                class="bg-[#f5f8fc] flex items-center justify-center p-[8px] rounded-[6px] hover:bg-[#e8edf2] transition-colors"
                title="Làm mới"
                @click="$emit('refresh')">
                <Icon name="restart" :size="20" color="#1a2229" />
            </button>

            <!-- Filter -->
            <button
                class="bg-[#f5f8fc] flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] hover:bg-[#e8edf2] transition-colors"
                @click="$emit('filter')">
                <Icon name="paragraph-bullets-point-01" :size="16" color="#1a2229" />
                <span class="text-[14px] font-semibold leading-[20px] text-[#1a2229]">Bộ lọc</span>
            </button>

            <!-- Search -->
            <div class="bg-[#f5f8fc] flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] w-[200px]">
                <Icon name="search" :size="16" color="#61788f" />
                <input
                    class="flex-1 bg-transparent text-[14px] font-medium leading-[20px] text-[#000a2c] placeholder:text-[#61788f] outline-none"
                    placeholder="Tìm kiếm..."
                    :value="search_query"
                    @input="$emit('update:search_query', ($event.target as HTMLInputElement).value)" />
            </div>

            <!-- Add staff (gradient) -->
            <button
                class="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] text-white transition-opacity hover:opacity-90"
                :style="{ background: 'var(--gradient)' }"
                @click="$emit('add-staff')">
                <Icon name="plus-sign-circle" :size="20" color="white" />
                <span class="text-[14px] font-semibold leading-[20px]">Thêm nhân viên</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@/components/custom/icon"

defineProps<{
    active_tab: string
    search_query: string
    view_mode: "grid" | "list"
}>()

defineEmits<{
    "update:active_tab": [value: string]
    "update:search_query": [value: string]
    "update:view_mode": [value: "grid" | "list"]
    refresh: []
    filter: []
    "add-staff": []
}>()
</script>
