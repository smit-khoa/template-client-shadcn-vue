<template>
    <div class="calendar-grid">
        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 mb-1">
            <div
                v-for="day in weekdays"
                :key="day"
                class="text-center text-xs font-medium text-grey-400 py-1">
                {{ day }}
            </div>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7">
            <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="relative flex items-center justify-center h-8">
                <!-- Range Background -->
                <div
                    v-if="day.date && isInRange(day.date) && day.isCurrentMonth"
                    class="absolute inset-y-0 inset-x-0 bg-[#E8F8F5]"
                    :class="{
                        'rounded-l-[50%]': isRangeStart(day.date),
                        'rounded-r-[50%]': isRangeEnd(day.date)
                    }"></div>

                <!-- Day Button -->
                <button
                    v-if="day.date"
                    class="relative z-10 w-8 h-8 flex items-center justify-center text-sm transition-colors duration-200"
                    :class="getDayClasses(day)"
                    @click="day.isCurrentMonth && selectDate(day.date)"
                    @mouseenter="day.isCurrentMonth && hoverDate(day.date)"
                    @mouseleave="hoverDate(null)">
                    {{ day.day }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Props {
    date: Date
    startDate: Date | null
    endDate: Date | null
    hoverDate: Date | null
}

interface CalendarDay {
    date: Date | null
    day: number | null
    isCurrentMonth: boolean
    isToday: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    select: [date: Date]
    hover: [date: Date | null]
}>()

// Start from Monday (T2)
const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const calendarDays = computed<CalendarDay[]>(() => {
    const year = props.date.getFullYear()
    const month = props.date.getMonth()

    const first_day = new Date(year, month, 1)
    const last_day = new Date(year, month + 1, 0)
    const prev_month_last_day = new Date(year, month, 0)

    const days: CalendarDay[] = []

    // Get day of week (0=Sun, 1=Mon, ..., 6=Sat)
    // Convert to Monday-first (Mon=0, Tue=1, ..., Sun=6)
    let start_day_of_week = first_day.getDay()
    start_day_of_week = start_day_of_week === 0 ? 6 : start_day_of_week - 1

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Add days from previous month
    for (let i = start_day_of_week - 1; i >= 0; i--) {
        const day_num = prev_month_last_day.getDate() - i
        const current_date = new Date(year, month - 1, day_num)
        current_date.setHours(0, 0, 0, 0)

        days.push({
            date: current_date,
            day: day_num,
            isCurrentMonth: false,
            isToday: current_date.getTime() === today.getTime()
        })
    }

    // Add days of the current month
    for (let d = 1; d <= last_day.getDate(); d++) {
        const current_date = new Date(year, month, d)
        current_date.setHours(0, 0, 0, 0)

        days.push({
            date: current_date,
            day: d,
            isCurrentMonth: true,
            isToday: current_date.getTime() === today.getTime()
        })
    }

    // Add days from next month to fill 42 cells (6 rows)
    let next_day = 1
    while (days.length < 42) {
        const current_date = new Date(year, month + 1, next_day)
        current_date.setHours(0, 0, 0, 0)

        days.push({
            date: current_date,
            day: next_day,
            isCurrentMonth: false,
            isToday: current_date.getTime() === today.getTime()
        })
        next_day++
    }

    return days
})

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

const isInRange = (date: Date): boolean => {
    if (!props.startDate) return false

    const end = props.endDate || props.hoverDate

    if (!end) return isSameDay(date, props.startDate)

    const start = props.startDate < end ? props.startDate : end
    const final_end = props.startDate < end ? end : props.startDate

    return date >= start && date <= final_end
}

const isRangeStart = (date: Date): boolean => {
    if (!props.startDate) return false

    const end = props.endDate || props.hoverDate
    if (!end) return isSameDay(date, props.startDate)

    const actual_start = props.startDate < end ? props.startDate : end
    return isSameDay(date, actual_start)
}

const isRangeEnd = (date: Date): boolean => {
    if (!props.startDate) return false

    const end = props.endDate || props.hoverDate
    if (!end) return isSameDay(date, props.startDate)

    const actual_end = props.startDate < end ? end : props.startDate
    return isSameDay(date, actual_end)
}

const isSelected = (date: Date): boolean => {
    return isSameDay(date, props.startDate) || isSameDay(date, props.endDate)
}

const getDayClasses = (day: CalendarDay) => {
    const classes: string[] = []

    if (!day.date) return classes

    // Not current month - show muted
    if (!day.isCurrentMonth) {
        classes.push("text-grey-300 cursor-default")
        return classes
    }

    if (isSelected(day.date)) {
        classes.push("bg-primary text-white font-medium rounded-[8px]")
    } else {
        classes.push("text-grey-700 hover:bg-grey-100 rounded-[8px]")
    }

    return classes
}

const selectDate = (date: Date) => {
    emit("select", date)
}

const hoverDate = (date: Date | null) => {
    emit("hover", date)
}
</script>
