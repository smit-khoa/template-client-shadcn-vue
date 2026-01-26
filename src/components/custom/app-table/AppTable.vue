<template>
    <div class="app-table-wrapper bg-white/20 p-2 rounded-2xl size-full overflow-hidden">
        <div class="app-table bg-white rounded-xl flex flex-col h-full pt-5 px-4 pb-1">
            <!-- Top Bar -->
            <div class="app-table__top flex items-center justify-between mb-5 gap-[30px]">
                <!-- Left: Layout Toggle + Tabs -->
                <div class="flex items-center gap-2.5">
                    <!-- Layout Toggle -->
                    <div
                        v-if="showLayoutToggle"
                        class="relative flex items-center gap-[4px] p-[4px] bg-[#F5F8FC] rounded-[12px]">
                        <!-- Sliding background indicator -->
                        <div
                            class="absolute w-[28px] h-[28px] bg-white rounded-[8px] shadow-sm transition-all duration-300 ease-out"
                            :style="{ left: layout === 'list' ? '4px' : '36px' }" />
                        <Tooltip content="Xem theo bảng">
                            <button
                                class="relative z-10 w-[28px] h-[28px] rounded-[8px] cursor-pointer flex items-center justify-center"
                                @click="changeLayout('list')">
                                <Icon
                                    name="layout-row"
                                    :size="16"
                                    :color="layout === 'list' ? '#2eb9a0' : '#1a2229'"
                                    class="transition-colors duration-300" />
                            </button>
                        </Tooltip>
                        <Tooltip content="Xem theo thẻ">
                            <button
                                class="relative z-10 w-[28px] h-[28px] rounded-[8px] cursor-pointer flex items-center justify-center"
                                @click="changeLayout('grid')">
                                <Icon
                                    name="layout-shape"
                                    :size="16"
                                    :color="layout === 'grid' ? '#2eb9a0' : '#1a2229'"
                                    class="transition-colors duration-300" />
                            </button>
                        </Tooltip>
                    </div>

                    <!-- Tabs slot -->
                    <slot name="header-left" />
                </div>

                <!-- Right: Actions -->
                <div class="flex items-center gap-2.5">
                    <!-- Refresh button -->
                    <Button
                        icon="restart"
                        variant="tool"
                        size="mini"
                        tooltip="Làm mới trang"
                        @click="handleRefresh"></Button>

                    <!-- Filter button -->
                    <template v-if="tools_use.includes('filter')">
                        <FilterPanel
                            v-if="filterCategories.length > 0"
                            :categories="filterCategories"
                            :selected="filterSelected"
                            @change="handleFilterChange"
                            @clear="handleFilterClear" />
                        <Button v-else icon="filter-horizontal" variant="tool" size="tiny">Bộ lọc</Button>
                    </template>

                    <!-- Download button -->
                    <Button v-if="tools_use.includes('export')" variant="tool" icon="download-04" size="tiny"
                        >Tải xuống</Button
                    >

                    <!-- Search input -->
                    <Search
                        v-if="tools_use.includes('search')"
                        v-model="search_query"
                        placeholder="Tìm kiếm..."
                        class="w-[200px]"
                        @search="handleSearch" />

                    <slot name="actions-right" />
                </div>
            </div>

            <div class="app-table__tabs mb-[20px]" v-if="$slots['platform-tabs']">
                <div class="w-full h-[1px] border-t border-[#E8EDF2] border-dashed mb-[16px]"></div>
                <slot name="platform-tabs" />
            </div>

            <!-- Filter Tags Row -->
            <FilterTags
                v-if="hasActiveFilters"
                :categories="filterCategories"
                :selected="filterSelected"
                class="mb-4"
                @remove="handleFilterTagRemove"
                @clear-all="handleFilterClear" />

            <!-- Content -->
            <div class="app-table__content flex-1 overflow-auto relative">
                <!-- Sliding container for layout transition -->
                <div class="relative w-full h-full overflow-hidden">
                    <Transition :name="slide_direction" mode="out-in">
                        <!-- Grid Layout -->
                        <div v-if="layout === 'grid'" key="grid" class="w-full h-full">
                            <Transition name="empty-state" mode="out-in">
                                <!-- Grid Loading State -->
                                <div v-if="loading" key="loading" class="flex items-center justify-center h-full py-20">
                                    <div
                                        class="w-8 h-8 border-3 border-grey-200 border-t-primary rounded-full animate-spin" />
                                </div>
                                <!-- Grid Empty State -->
                                <div
                                    v-else-if="is_empty"
                                    key="empty"
                                    class="flex flex-col items-center justify-center h-full py-20">
                                    <img
                                        :src="emptyImage"
                                        alt="Empty"
                                        class="w-[120px] h-[120px] mb-6 object-contain" />
                                    <h3 class="text-[18px] font-bold text-neutral-100 mb-2">{{ emptyTitle }}</h3>
                                    <p
                                        v-if="emptyDescription || search_query"
                                        class="text-sm text-grey-400 text-center max-w-[400px]">
                                        <template v-if="emptyDescription">{{ emptyDescription }}</template>
                                        <template v-else-if="search_query">
                                            "<span class="font-semibold text-neutral-100">{{ search_query }}</span
                                            >" không nằm trong danh sách tìm kiếm, bạn hãy thử với từ khóa khác.
                                        </template>
                                    </p>
                                </div>
                                <!-- Grid Items -->
                                <TransitionGroup
                                    v-else
                                    key="grid-items"
                                    name="grid-item"
                                    tag="div"
                                    class="grid gap-3 w-full"
                                    :class="gridColsClass">
                                    <div
                                        v-for="(item, index) in data"
                                        :key="item[keyField] || index"
                                        class="grid-item-wrapper">
                                        <slot name="grid-item" :item="item" :index="index" />
                                    </div>
                                </TransitionGroup>
                            </Transition>
                        </div>

                        <!-- List/Table Layout (Table có empty state riêng) -->
                        <div v-else key="list" class="w-full h-full">
                            <Table
                                class="w-full h-full"
                                :data="data"
                                :columns="columns"
                                :show-toolbar="false"
                                :show-checkbox="showCheckbox"
                                :show-paging="false"
                                :is-border="true"
                                :loading="loading"
                                :table_info="{ name: tableName, key_id: keyField }"
                                @row-select="handleRowSelect"
                                @row-select-all="handleRowSelectAll">
                                <!-- Forward all column slots -->
                                <template v-for="col in columns" :key="col.field" #[col.field]="slotProps">
                                    <slot :name="`col-${col.field}`" v-bind="slotProps">
                                        <span class="text-[13px] font-medium">{{ slotProps.value }}</span>
                                    </slot>
                                </template>
                            </Table>
                        </div>
                    </Transition>
                </div>

                <!-- Scrollbar (optional visual) -->
                <div
                    v-if="showScrollbar && layout === 'grid' && !is_empty"
                    class="absolute right-1.5 top-1 bottom-1 w-1.5">
                    <div class="h-full bg-grey-100 rounded-full">
                        <div class="w-full bg-grey-300/50 rounded-full" :style="{ height: scrollbarHeight }" />
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="showPagination" class="app-table__pagination flex items-center justify-between px-6 py-4 h-14">
                <!-- Left: Items per page -->
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <span class="text-[13px] font-medium text-[#7d91a6]">Hiển thị</span>
                        <Dropdown v-model="is_dropdown_open" position="top-start" body-width="80px">
                            <template #trigger>
                                <div
                                    class="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f8fc] rounded-lg cursor-pointer hover:bg-grey-200 transition-all">
                                    <span class="text-sm font-medium text-neutral-100">{{ items_per_page }}</span>
                                    <Icon
                                        name="arrows-down"
                                        :size="16"
                                        color="#5c6c7e"
                                        :class="`transition-all duration-300 ${
                                            is_dropdown_open ? 'rotate-180' : ''
                                        }`" />
                                </div>
                            </template>

                            <DropdownItem
                                v-for="option in itemsPerPageOptions"
                                :key="option"
                                :value="option"
                                @click="changeItemsPerPage(option)" />
                        </Dropdown>
                    </div>
                    <div class="flex items-center gap-1 text-[13px] font-medium">
                        <span class="text-[#000a2c]">{{ paginationRange }}</span>
                        <span class="text-[#7d91a6]">{{ itemLabel }}</span>
                    </div>
                </div>

                <!-- Right: Page navigation -->
                <div class="flex items-center gap-[5px]">
                    <!-- First page -->
                    <button
                        :disabled="current_page === 1"
                        :class="navButtonClass(current_page === 1)"
                        @click="goToPage(1)">
                        <Icon name="arrow-left-double" :size="16" :color="current_page === 1 ? '#5c6c7e' : '#1a2229'" />
                    </button>

                    <!-- Previous page -->
                    <button
                        :disabled="current_page === 1"
                        :class="navButtonClass(current_page === 1)"
                        @click="goToPage(current_page - 1)">
                        <Icon name="arrow-left-01" :size="16" :color="current_page === 1 ? '#5c6c7e' : '#1a2229'" />
                    </button>

                    <!-- Page numbers -->
                    <template v-for="page in visiblePages" :key="page">
                        <button
                            v-if="page !== '...'"
                            :class="pageNumberClass(current_page === page)"
                            @click="goToPage(page as number)">
                            {{ page }}
                        </button>
                        <span
                            v-else
                            class="size-7 flex items-center justify-center rounded-xl bg-white text-[13px] font-medium text-[#0d0d0d]">
                            ...
                        </span>
                    </template>

                    <!-- Next page -->
                    <button
                        :disabled="current_page === total_pages"
                        :class="navButtonClass(current_page === total_pages)"
                        @click="goToPage(current_page + 1)">
                        <Icon
                            name="arrow-right-01"
                            :size="16"
                            :color="current_page === total_pages ? '#5c6c7e' : '#1a2229'" />
                    </button>

                    <!-- Last page -->
                    <button
                        :disabled="current_page === total_pages"
                        :class="navButtonClass(current_page === total_pages)"
                        @click="goToPage(total_pages)">
                        <Icon
                            name="arrow-right-double"
                            :size="16"
                            :color="current_page === total_pages ? '#5c6c7e' : '#1a2229'" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { Icon } from "@/components/custom/icon"
import { Dropdown, DropdownItem } from "@/components/custom/dropdown"
import { Search } from "@/components/custom/search"
import { Button } from "@/components/custom/button"
import { Table } from "@/components/custom/table"
import { Tooltip } from "@/components/custom/tooltip"
import { FilterPanel, FilterTags, type FilterCategory } from "@/components/custom/filter"

// Types
interface Column {
    field: string
    name: string
    width: number
    frozen?: boolean
    position?: "left" | "center" | "right"
}

interface RowSelectEvent {
    rowId: string | number
    selected: boolean
    allSelected: (string | number)[]
}

interface RowSelectAllEvent {
    selected: (string | number)[]
    allSelected: boolean
}

interface Props {
    // Data props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any[]
    columns?: Column[]
    keyField?: string
    tableName?: string
    // Layout props
    showLayoutToggle?: boolean
    defaultLayout?: "list" | "grid"
    gridCols?: number | { sm?: number; md?: number; lg?: number; xl?: number }
    // Pagination props
    showPagination?: boolean
    total?: number
    itemsPerPage?: number
    currentPage?: number
    itemLabel?: string
    itemsPerPageOptions?: number[]
    // Table specific props
    showCheckbox?: boolean
    loading?: boolean
    // UI props
    showScrollbar?: boolean
    scrollbarHeight?: string
    // Empty state props
    emptyImage?: string
    emptyTitle?: string
    emptyDescription?: string
    // Filter props
    filterCategories?: FilterCategory[]
    filterSelected?: Record<string, string[]>
    tools_use?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    columns: () => [],
    keyField: "id",
    tableName: "app-table",
    showLayoutToggle: false,
    defaultLayout: "grid",
    gridCols: () => ({ sm: 2, md: 2, lg: 3, xl: 4 }),
    showPagination: true,
    total: 0,
    itemsPerPage: 20,
    currentPage: 1,
    itemLabel: "tài khoản",
    itemsPerPageOptions: () => [20, 50, 100, 200, 500],
    showCheckbox: false,
    loading: false,
    showScrollbar: false,
    scrollbarHeight: "30%",
    emptyImage: "/src/assets/images/no-data.png",
    emptyTitle: "Không có dữ liệu",
    emptyDescription: "",
    filterCategories: () => [],
    filterSelected: () => ({}),
    tools_use: () => []
})

const emit = defineEmits<{
    "change-layout": [layout: "list" | "grid"]
    "change-page": [page: number]
    "change-items-per-page": [count: number]
    "row-select": [event: RowSelectEvent]
    "row-select-all": [event: RowSelectAllEvent]
    search: [query: string]
    refresh: []
    "filter-change": [filters: Record<string, string[]>]
    "filter-clear": []
}>()

// State
const layout = ref<"list" | "grid">(props.defaultLayout)
const current_page = ref(props.currentPage)
const items_per_page = ref(props.itemsPerPage)
const is_dropdown_open = ref(false)
const slide_direction = ref<"slide-left" | "slide-right">("slide-left")
const search_query = ref("")

// Computed
const is_empty = computed(() => !props.loading && (!props.data || props.data.length === 0))
const total_pages = computed(() => Math.ceil(props.total / items_per_page.value) || 1)

const paginationRange = computed(() => {
    const start = (current_page.value - 1) * items_per_page.value + 1
    const end = Math.min(current_page.value * items_per_page.value, props.total)
    return `${start}-${end}/${props.total}`
})

const visiblePages = computed(() => {
    const pages: (number | string)[] = []
    const total = total_pages.value
    const current = current_page.value

    if (total <= 5) {
        for (let i = 1; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)

        if (current > 3) pages.push("...")

        const start = Math.max(2, current - 1)
        const end = Math.min(total - 1, current + 1)

        for (let i = start; i <= end; i++) pages.push(i)

        if (current < total - 2) pages.push("...")

        pages.push(total)
    }

    return pages
})

// Grid layout responsive classes - hardcoded for Tailwind to detect
// Safelist: grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
// sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
// md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
// lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
// xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
const gridColsClass = computed(() => {
    const cols = props.gridCols
    if (typeof cols === "number") {
        const sm = Math.min(cols, 2)
        const lg = Math.min(cols, 3)
        return `grid-cols-1 sm:grid-cols-${sm} lg:grid-cols-${lg} xl:grid-cols-${cols}`
    }
    const classes = ["grid-cols-1"]
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    return classes.join(" ")
})

// Watch props changes
watch(
    () => props.currentPage,
    val => {
        current_page.value = val
    }
)

// Methods
const changeLayout = (newLayout: "list" | "grid") => {
    // Set slide direction based on which layout we're switching to
    // List is on left, Grid is on right in the toggle
    slide_direction.value = newLayout === "list" ? "slide-right" : "slide-left"
    layout.value = newLayout
    emit("change-layout", newLayout)
}

const goToPage = (page: number) => {
    if (page < 1 || page > total_pages.value) return
    current_page.value = page
    emit("change-page", page)
}

const changeItemsPerPage = (count: number) => {
    items_per_page.value = count
    current_page.value = 1
    is_dropdown_open.value = false
    emit("change-items-per-page", count)
}

// Navigation button class (first, prev, next, last)
const navButtonClass = (disabled: boolean) => [
    "p-1.5 rounded-md bg-[#f5f8fc] transition-all flex items-center justify-center",
    disabled ? "cursor-not-allowed opacity-60" : "hover:bg-grey-200 cursor-pointer"
]

// Page number button class
const pageNumberClass = (is_active: boolean) => [
    "size-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all cursor-pointer",
    is_active
        ? "bg-primary-200 text-white shadow-[inset_0px_2px_7px_0px_rgba(255,255,255,0.31)]"
        : "bg-white text-[#0d0d0d] hover:bg-grey-100"
]

// Table row selection handlers
const handleRowSelect = (event: RowSelectEvent) => {
    emit("row-select", event)
}

const handleRowSelectAll = (event: RowSelectAllEvent) => {
    emit("row-select-all", event)
}

const handleRefresh = () => {
    emit("refresh")
}

// Search handler
const handleSearch = (query: string) => {
    search_query.value = query
    emit("search", query)
}

// Filter handlers
const hasActiveFilters = computed(() => {
    return Object.values(props.filterSelected).some(arr => arr && arr.length > 0)
})

const handleFilterChange = (filters: Record<string, string[]>) => {
    emit("filter-change", filters)
}

const handleFilterClear = () => {
    emit("filter-clear")
}

const handleFilterTagRemove = (category_key: string, value: string) => {
    // Create new filters object with the tag removed
    const new_filters = { ...props.filterSelected }
    if (new_filters[category_key]) {
        new_filters[category_key] = new_filters[category_key].filter(v => v !== value)
        if (new_filters[category_key].length === 0) {
            delete new_filters[category_key]
        }
    }
    emit("filter-change", new_filters)
}
</script>

<style lang="scss" scoped>
/* Slide Left Animation - Grid to List */
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all 0.2s ease-out;
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

/* Slide Right Animation - List to Grid */
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.2s ease-out;
}

.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* Grid Item Animation - Filter transition */
.grid-item-enter-active,
.grid-item-leave-active {
    transition: all 0.5s ease;
}

.grid-item-enter-from {
    opacity: 0;
    transform: scale(0.9);
}

.grid-item-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

/* Smooth move animation when items reorder */
.grid-item-move {
    transition: transform 0.5s ease;
}

/* Fix layout shift when item leaves */
.grid-item-leave-active {
    position: absolute;
}

/* Empty State Animation */
.empty-state-enter-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.empty-state-leave-active {
    transition: all 0.2s ease-out;
}

.empty-state-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

.empty-state-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
