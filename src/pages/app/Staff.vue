<template>
    <div class="flex flex-col h-full overflow-hidden p-[16px] gap-[16px]">
        <!-- Toolbar -->
        <StaffToolbar
            :active_tab="active_tab"
            :search_query="search_query"
            :view_mode="view_mode"
            @update:active_tab="active_tab = $event"
            @update:search_query="search_query = $event"
            @update:view_mode="view_mode = $event"
            @refresh="onRefresh"
            @filter="onFilter"
            @add-staff="onAddStaff" />

        <!-- Card area -->
        <div class="flex-1 overflow-y-auto">
            <div
                :class="
                    view_mode === 'grid'
                        ? 'grid grid-cols-4 gap-[12px]'
                        : 'flex flex-col gap-[8px]'
                ">
                <StaffCard
                    v-for="staff in paginated_staff"
                    :key="staff.id"
                    :staff="staff" />
            </div>

            <!-- Empty state -->
            <div
                v-if="filtered_staff.length === 0"
                class="flex flex-col items-center justify-center py-[60px] gap-[12px]">
                <span class="text-[16px] font-medium text-[#7d91a6]">Không tìm thấy nhân viên</span>
            </div>
        </div>

        <!-- Pagination -->
        <StaffPagination
            :current_page="current_page"
            :per_page="per_page"
            :total="filtered_staff.length"
            @update:current_page="current_page = $event"
            @update:per_page="per_page = $event" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { StaffCard, StaffToolbar, StaffPagination } from "@/components/staff"
import { mock_staff_list } from "./staff-mock-data"

const active_tab = ref<"joined" | "invited">("joined")
const search_query = ref("")
const view_mode = ref<"grid" | "list">("grid")
const current_page = ref(1)
const per_page = ref(20)

const filtered_staff = computed(() => {
    let list = mock_staff_list.filter(s => s.status === active_tab.value)
    if (search_query.value.trim()) {
        const q = search_query.value.toLowerCase()
        list = list.filter(s => s.name.toLowerCase().includes(q))
    }
    return list
})

const paginated_staff = computed(() => {
    const start = (current_page.value - 1) * per_page.value
    return filtered_staff.value.slice(start, start + per_page.value)
})

watch([active_tab, search_query], () => {
    current_page.value = 1
})

const onRefresh = () => {
    search_query.value = ""
}

const onFilter = () => {
    // TODO: open filter panel
}

const onAddStaff = () => {
    // TODO: open add staff modal
}
</script>
