<template>
    <Dropdown
        v-model="is_open"
        :position="position"
        :disabled="disabled"
        :no-padding="true"
        body-width="fit-content"
        :class="props.class">
        <template #trigger>
            <slot name="trigger" :start-date="start_date" :end-date="end_date" :display-text="displayText">
                <!-- Default trigger -->
                <button
                    class="px-3 py-2 text-sm border border-[#E1ECF4] rounded-lg flex items-center gap-2 hover:bg-grey-100 transition-colors">
                    <Icon name="calendar-03" :size="16" color="#868a89" />
                    <span class="text-grey-700">{{ displayText }}</span>
                    <Icon name="arrows-down" :size="12" color="#868a89" />
                </button>
            </slot>
        </template>

        <!-- DatePicker Body -->
        <div class="flex min-w-[580px]">
            <!-- Left Sidebar - Presets -->
            <div class="w-[160px] border-r border-[#E1ECF4] p-[10px] flex flex-col gap-0.5">
                <button
                    v-for="preset in presets"
                    :key="preset.key"
                    class="px-3 py-2 text-left text-sm rounded-lg transition-colors duration-200 mx-1"
                    :class="
                        selected_preset === preset.key
                            ? 'bg-primary-100/20 text-primary font-medium'
                            : 'text-grey-600 hover:bg-grey-100'
                    "
                    @click="selectPreset(preset)">
                    {{ preset.label }}
                </button>
            </div>

            <!-- Right Content - Calendars -->
            <div class="flex-1 p-[10px]">
                <!-- Calendar Headers -->
                <div class="flex gap-0 border-b border-[#E1ECF4] pb-2 mb-2">
                    <!-- Left Calendar Header -->
                    <div class="flex-1 flex items-center justify-center gap-2">
                        <Dropdown v-model="is_left_month_open" position="bottom" :no-padding="true">
                            <template #trigger>
                                <button
                                    class="px-2 py-1 text-sm font-medium text-grey-700 hover:bg-grey-100 rounded flex items-center gap-1">
                                    {{ getMonthName(left_calendar_date) }}
                                    <Icon name="arrows-down" :size="10" color="#868a89" />
                                </button>
                            </template>
                            <div class="flex flex-col max-h-[200px] overflow-y-auto p-1 min-w-[100px]">
                                <div
                                    v-for="(month, index) in months"
                                    :key="index"
                                    class="px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-grey-100 whitespace-nowrap"
                                    :class="
                                        left_calendar_date.getMonth() === index
                                            ? 'text-primary font-medium bg-primary-100/20'
                                            : 'text-grey-700'
                                    "
                                    @click="setLeftMonth(index)">
                                    {{ month }}
                                </div>
                            </div>
                        </Dropdown>
                        <Dropdown v-model="is_left_year_open" position="bottom" :no-padding="true">
                            <template #trigger>
                                <button
                                    class="px-2 py-1 text-sm font-medium text-grey-700 hover:bg-grey-100 rounded flex items-center gap-1">
                                    {{ left_calendar_date.getFullYear() }}
                                    <Icon name="arrows-down" :size="10" color="#868a89" />
                                </button>
                            </template>
                            <div class="flex flex-col max-h-[200px] overflow-y-auto p-1 min-w-[70px]">
                                <div
                                    v-for="year in years"
                                    :key="year"
                                    class="px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-grey-100 whitespace-nowrap"
                                    :class="
                                        left_calendar_date.getFullYear() === year
                                            ? 'text-primary font-medium bg-primary-100/20'
                                            : 'text-grey-700'
                                    "
                                    @click="setLeftYear(year)">
                                    {{ year }}
                                </div>
                            </div>
                        </Dropdown>
                    </div>

                    <!-- Right Calendar Header -->
                    <div class="flex-1 flex items-center justify-center gap-2">
                        <Dropdown v-model="is_right_month_open" position="bottom" :no-padding="true">
                            <template #trigger>
                                <button
                                    class="px-2 py-1 text-sm font-medium text-grey-700 hover:bg-grey-100 rounded flex items-center gap-1">
                                    {{ getMonthName(right_calendar_date) }}
                                    <Icon name="arrows-down" :size="10" color="#868a89" />
                                </button>
                            </template>
                            <div class="flex flex-col max-h-[200px] overflow-y-auto p-1 min-w-[100px]">
                                <div
                                    v-for="(month, index) in months"
                                    :key="index"
                                    class="px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-grey-100 whitespace-nowrap"
                                    :class="
                                        right_calendar_date.getMonth() === index
                                            ? 'text-primary font-medium bg-primary-100/20'
                                            : 'text-grey-700'
                                    "
                                    @click="setRightMonth(index)">
                                    {{ month }}
                                </div>
                            </div>
                        </Dropdown>
                        <Dropdown v-model="is_right_year_open" position="bottom" :no-padding="true">
                            <template #trigger>
                                <button
                                    class="px-2 py-1 text-sm font-medium text-grey-700 hover:bg-grey-100 rounded flex items-center gap-1">
                                    {{ right_calendar_date.getFullYear() }}
                                    <Icon name="arrows-down" :size="10" color="#868a89" />
                                </button>
                            </template>
                            <div class="flex flex-col max-h-[200px] overflow-y-auto p-1 min-w-[70px]">
                                <div
                                    v-for="year in years"
                                    :key="year"
                                    class="px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-grey-100 whitespace-nowrap"
                                    :class="
                                        right_calendar_date.getFullYear() === year
                                            ? 'text-primary font-medium bg-primary-100/20'
                                            : 'text-grey-700'
                                    "
                                    @click="setRightYear(year)">
                                    {{ year }}
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <!-- Calendars Grid -->
                <div class="flex gap-0">
                    <!-- Left Calendar -->
                    <div class="flex-1">
                        <CalendarGrid
                            :date="left_calendar_date"
                            :start-date="start_date"
                            :end-date="end_date"
                            :hover-date="hover_date"
                            @select="handleDateSelect"
                            @hover="handleDateHover" />
                    </div>

                    <!-- Right Calendar -->
                    <div class="flex-1">
                        <CalendarGrid
                            :date="right_calendar_date"
                            :start-date="start_date"
                            :end-date="end_date"
                            :hover-date="hover_date"
                            @select="handleDateSelect"
                            @hover="handleDateHover" />
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between mt-4 pt-3 border-t border-[#E1ECF4]">
                    <div class="text-sm text-grey-600">
                        <span v-if="start_date && end_date">
                            {{ formatDisplayDate(start_date) }} - {{ formatDisplayDate(end_date) }}
                        </span>
                        <span v-else-if="start_date"> {{ formatDisplayDate(start_date) }} - Chọn ngày kết thúc </span>
                        <span v-else>Chọn khoảng thời gian</span>
                    </div>
                    <div class="flex gap-2">
                        <Button variant="secondary" size="sm" @click="handleCancel">Hủy</Button>
                        <Button variant="primary" size="sm" @click="handleConfirm">Cập nhật</Button>
                    </div>
                </div>
            </div>
        </div>
    </Dropdown>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { Icon } from "@/components/custom/icon"
import { Button } from "@/components/custom/button"
import { Dropdown } from "@/components/custom/dropdown"
import CalendarGrid from "./CalendarGrid.vue"

interface DateRange {
    start: Date | null
    end: Date | null
}

type Position = "bottom" | "top" | "left" | "right" | "bottom-start" | "bottom-end" | "top-start" | "top-end"

interface Props {
    modelValue?: DateRange
    position?: Position
    disabled?: boolean
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({ start: null, end: null }),
    position: "bottom-start",
    disabled: false,
    class: ""
})

const emit = defineEmits<{
    "update:modelValue": [value: DateRange]
    cancel: []
    confirm: [value: DateRange]
}>()

// Dropdown open state
const is_open = ref(false)

// Preset definitions
const presets = [
    { key: "all", label: "Tất cả thời gian", getValue: () => ({ start: null, end: null }) },
    {
        key: "today",
        label: "Hôm nay",
        getValue: () => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return { start: today, end: new Date(today) }
        }
    },
    {
        key: "yesterday",
        label: "Hôm qua",
        getValue: () => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            yesterday.setHours(0, 0, 0, 0)
            return { start: yesterday, end: new Date(yesterday) }
        }
    },
    {
        key: "last7days",
        label: "7 ngày qua",
        getValue: () => {
            const end = new Date()
            end.setHours(0, 0, 0, 0)
            const start = new Date(end)
            start.setDate(start.getDate() - 6)
            return { start, end }
        }
    },
    {
        key: "last30days",
        label: "30 ngày qua",
        getValue: () => {
            const end = new Date()
            end.setHours(0, 0, 0, 0)
            const start = new Date(end)
            start.setDate(start.getDate() - 29)
            return { start, end }
        }
    },
    {
        key: "thisWeek",
        label: "Tuần này",
        getValue: () => {
            const now = new Date()
            const day = now.getDay()
            const diff = now.getDate() - day + (day === 0 ? -6 : 1)
            const start = new Date(now.setDate(diff))
            start.setHours(0, 0, 0, 0)
            const end = new Date(start)
            end.setDate(end.getDate() + 6)
            return { start, end }
        }
    },
    {
        key: "lastWeek",
        label: "Tuần trước",
        getValue: () => {
            const now = new Date()
            const day = now.getDay()
            const diff = now.getDate() - day + (day === 0 ? -6 : 1) - 7
            const start = new Date(now.setDate(diff))
            start.setHours(0, 0, 0, 0)
            const end = new Date(start)
            end.setDate(end.getDate() + 6)
            return { start, end }
        }
    },
    {
        key: "thisMonth",
        label: "Tháng này",
        getValue: () => {
            const now = new Date()
            const start = new Date(now.getFullYear(), now.getMonth(), 1)
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            return { start, end }
        }
    },
    {
        key: "lastMonth",
        label: "Tháng trước",
        getValue: () => {
            const now = new Date()
            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            const end = new Date(now.getFullYear(), now.getMonth(), 0)
            return { start, end }
        }
    }
]

// State
const selected_preset = ref<string | null>("all")
const start_date = ref<Date | null>(props.modelValue?.start || null)
const end_date = ref<Date | null>(props.modelValue?.end || null)
const hover_date = ref<Date | null>(null)
const selecting_start = ref(true)

// Calendar navigation state
const left_calendar_date = ref(new Date())
const right_calendar_date = ref(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1))

// Dropdown states
const is_left_month_open = ref(false)
const is_left_year_open = ref(false)
const is_right_month_open = ref(false)
const is_right_year_open = ref(false)

// Month names
const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
]

// Years range
const current_year = new Date().getFullYear()
const years = computed(() => {
    const year_list: number[] = []
    for (let y = current_year - 10; y <= current_year + 5; y++) {
        year_list.push(y)
    }
    return year_list
})

// Display text for trigger
const displayText = computed(() => {
    if (start_date.value && end_date.value) {
        return `${formatDisplayDate(start_date.value)} - ${formatDisplayDate(end_date.value)}`
    }
    if (start_date.value) {
        return formatDisplayDate(start_date.value)
    }
    return "Chọn thời gian"
})

// Methods
const getMonthName = (date: Date) => months[date.getMonth()]

const setLeftMonth = (month_index: number) => {
    left_calendar_date.value = new Date(left_calendar_date.value.getFullYear(), month_index, 1)
    right_calendar_date.value = new Date(left_calendar_date.value.getFullYear(), month_index + 1, 1)
    is_left_month_open.value = false
}

const setLeftYear = (year: number) => {
    left_calendar_date.value = new Date(year, left_calendar_date.value.getMonth(), 1)
    right_calendar_date.value = new Date(year, left_calendar_date.value.getMonth() + 1, 1)
    is_left_year_open.value = false
}

const setRightMonth = (month_index: number) => {
    right_calendar_date.value = new Date(right_calendar_date.value.getFullYear(), month_index, 1)
    left_calendar_date.value = new Date(right_calendar_date.value.getFullYear(), month_index - 1, 1)
    is_right_month_open.value = false
}

const setRightYear = (year: number) => {
    right_calendar_date.value = new Date(year, right_calendar_date.value.getMonth(), 1)
    left_calendar_date.value = new Date(year, right_calendar_date.value.getMonth() - 1, 1)
    is_right_year_open.value = false
}

const selectPreset = (preset: (typeof presets)[0]) => {
    selected_preset.value = preset.key
    const range = preset.getValue()
    start_date.value = range.start
    end_date.value = range.end

    if (range.start) {
        left_calendar_date.value = new Date(range.start.getFullYear(), range.start.getMonth(), 1)
        right_calendar_date.value = new Date(range.start.getFullYear(), range.start.getMonth() + 1, 1)
    }
}

const handleDateSelect = (date: Date) => {
    selected_preset.value = null

    if (selecting_start.value) {
        start_date.value = date
        end_date.value = null
        selecting_start.value = false
    } else {
        if (date < start_date.value!) {
            end_date.value = start_date.value
            start_date.value = date
        } else {
            end_date.value = date
        }
        selecting_start.value = true
    }
}

const handleDateHover = (date: Date | null) => {
    hover_date.value = date
}

const formatDisplayDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const handleCancel = () => {
    is_open.value = false
    emit("cancel")
}

const handleConfirm = () => {
    const result: DateRange = {
        start: start_date.value,
        end: end_date.value
    }
    emit("update:modelValue", result)
    emit("confirm", result)
    is_open.value = false
}

// Watch for external model changes
watch(
    () => props.modelValue,
    new_value => {
        if (new_value) {
            start_date.value = new_value.start
            end_date.value = new_value.end
        }
    },
    { deep: true }
)
</script>
