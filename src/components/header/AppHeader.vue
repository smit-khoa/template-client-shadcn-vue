<template>
    <header class="flex items-center justify-between px-5 py-3 min-h-[60px]">
        <!-- Left - Feature name -->
        <h1
            class="text-lg font-semibold leading-7 bg-clip-text text-transparent"
            :style="{ backgroundImage: gradient_text }">
            {{ page_title }}
        </h1>

        <!-- Right - Tools -->
        <div class="flex items-center gap-4">
            <!-- Help button -->
            <button class="rounded-lg p-1 cursor-pointer" type="button" aria-label="Help">
                <Icon name="help-circle" :size="20" color="white" />
            </button>

            <!-- Theme toggle -->
            <ThemeToggle />

            <!-- User avatar -->
            <img
                :src="avatar_url"
                alt="Avatar"
                class="w-7 h-7 rounded-full border border-white object-cover" />
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { Icon } from "@/components/custom/icon"
import { ThemeToggle } from "@/components/custom/theme-toggle"

const route = useRoute()

const gradient_text =
    "linear-gradient(86.06deg, rgb(214, 255, 254) 0.27%, rgb(154, 254, 254) 25.11%, rgb(92, 255, 169) 74.81%)"

const route_title_map: Record<string, string> = {
    "/app/chat": "Tin nhắn",
    "/app/contacts": "Danh bạ",
    "/app/connect": "Kết nối",
    "/app/history": "Lịch sử",
    "/app/staff": "Nhân viên",
    "/app/settings": "Cài đặt"
}

const page_title = computed(() => {
    const path = route.path
    return route_title_map[path] || ""
})

const avatar_url = "https://ui-avatars.com/api/?name=U&background=random&size=28"
</script>
