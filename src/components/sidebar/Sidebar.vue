<template>
    <nav
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        class="h-full flex flex-col justify-between bg-transparent shrink-0 overflow-hidden pt-5 px-3 sidebar-nav"
        :class="[is_expanded ? 'w-[200px] pb-4' : 'w-14 pb-[26px]']">
        <!-- Top section: Logo + Menu -->
        <div class="flex flex-col gap-9 w-full">
            <!-- Logo -->
            <div class="flex items-center gap-3 min-h-7">
                <div class="w-7 h-7 shrink-0 flex items-center justify-center">
                    <Icon name="logo" :size="28" />
                </div>
                <span
                    class="text-lg font-semibold text-white whitespace-nowrap sidebar-text"
                    style="font-family: 'Inter Tight', Inter, sans-serif"
                    :class="is_expanded ? 'opacity-100' : 'opacity-0'">
                    SMIT CHAT
                </span>
            </div>

            <!-- Menu items wrapper -->
            <div ref="menu_container_ref" class="flex flex-col gap-4 w-full relative">
                <!-- Sliding active indicator -->
                <div
                    class="absolute left-0 h-8 rounded-lg z-0 pointer-events-none sidebar-indicator"
                    :class="is_expanded ? 'right-0' : 'w-8'"
                    :style="{
                        transform: `translateY(${indicator_top}px)`,
                        background: 'var(--gradient)'
                    }" />

                <!-- Menu items -->
                <router-link
                    v-for="(item, index) in MENU_ITEMS"
                    :key="item.route"
                    :ref="(el: any) => setItemRef(el, index)"
                    :to="item.route"
                    class="flex items-center h-8 gap-2 px-2 py-1.5 rounded-lg cursor-pointer relative z-10 w-full no-underline"
                    :class="active_index === index ? 'font-semibold' : 'font-medium'">
                    <Icon :name="item.icon" :size="16" color="white" class="shrink-0" />
                    <span
                        class="text-sm text-white truncate whitespace-nowrap sidebar-text"
                        :class="[
                            active_index === index ? 'font-semibold' : 'font-medium',
                            is_expanded ? 'opacity-100' : 'opacity-0'
                        ]">
                        {{ item.label }}
                    </span>
                </router-link>
            </div>
        </div>

        <!-- User section (bottom) -->
        <div
            class="flex items-center rounded-[10px] w-full"
            :class="is_expanded ? 'gap-2 p-2' : 'justify-center p-0'">
            <img
                class="w-7 h-7 rounded-md border-4 border-white/20 object-cover shrink-0"
                :src="user_avatar"
                alt="Avatar" />
            <div
                class="flex flex-col gap-0.5 overflow-hidden whitespace-nowrap sidebar-text"
                :class="is_expanded ? 'opacity-100' : 'opacity-0'">
                <span class="text-[13px] font-semibold text-white leading-4 truncate">{{ user_name }}</span>
                <span class="text-[11px] font-normal text-white leading-[14px] truncate">{{ user_role }}</span>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick, watch, type ComponentPublicInstance } from "vue"
import { useRoute } from "vue-router"
import Icon from "@/components/custom/icon/Icon.vue"

const MENU_ITEMS = [
    { label: "Kết nối nền tảng", icon: "layers-01", route: "/app/connect" },
    { label: "Chat", icon: "chatting-01", route: "/app/chat" },
    { label: "Danh bạ", icon: "contact-01", route: "/app/contacts" },
    { label: "Lịch sử", icon: "clock-01", route: "/app/history" },
    { label: "Nhân viên", icon: "user-multiple", route: "/app/staff" },
    { label: "Cài đặt", icon: "setting-01", route: "/app/settings" }
]

// User data (mock - replace with store later)
const user_name = "SMIT"
const user_role = "Nhân viên"
const user_avatar = "https://ui-avatars.com/api/?name=SMIT&background=33c4aa&color=fff&size=56&rounded=true"

// Sidebar expand/collapse
const is_expanded = ref(false)
let hover_timer: ReturnType<typeof setTimeout> | null = null

const onMouseEnter = () => {
    hover_timer = setTimeout(() => {
        is_expanded.value = true
    }, 300)
}

const onMouseLeave = () => {
    if (hover_timer) {
        clearTimeout(hover_timer)
        hover_timer = null
    }
    is_expanded.value = false
}

onBeforeUnmount(() => {
    if (hover_timer) clearTimeout(hover_timer)
})

// Active route detection
const route = useRoute()

const active_index = computed(() => {
    const index = MENU_ITEMS.findIndex(item => route.path.startsWith(item.route))
    return index >= 0 ? index : 0
})

// Refs for DOM-based position calculation
const menu_container_ref = ref<HTMLElement | null>(null)
const item_refs = ref<(HTMLElement | null)[]>([])

const setItemRef = (el: ComponentPublicInstance | HTMLElement | null, index: number) => {
    if (el) {
        item_refs.value[index] = (el as ComponentPublicInstance)?.$el ?? (el as HTMLElement)
    }
}

// Calculate indicator position from actual DOM
const indicator_top = ref(0)

const updateIndicatorPosition = () => {
    const container = menu_container_ref.value
    const active_item = item_refs.value[active_index.value]
    if (container && active_item) {
        const container_rect = container.getBoundingClientRect()
        const item_rect = active_item.getBoundingClientRect()
        indicator_top.value = item_rect.top - container_rect.top
    } else {
        // Fallback: calculate manually
        indicator_top.value = active_index.value * 48
    }
}

watch(active_index, () => {
    nextTick(updateIndicatorPosition)
}, { immediate: true })

watch(is_expanded, () => {
    nextTick(updateIndicatorPosition)
})
</script>

<style scoped>
.sidebar-nav {
    transition: width 300ms ease-in-out, padding-bottom 300ms ease-in-out;
}

.sidebar-nav a,
.sidebar-nav a:hover,
.sidebar-nav a:focus,
.sidebar-nav a:active {
    text-decoration: none !important;
    color: white !important;
}

.sidebar-text {
    transition: opacity 300ms ease-in-out;
}

.sidebar-indicator {
    transition: transform 300ms ease-in-out, width 300ms ease-in-out;
}
</style>
