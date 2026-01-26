<template>
    <div class="p-8 space-y-8">
        <h1 class="text-2xl font-bold mb-4">Tabs Component Demo</h1>

        <!-- Basic tabs -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Tabs cơ bản</h2>
            <Tabs v-model="basicTab" :tabs="basicTabs" @change="handleChange" />
            <div class="mt-4 p-4 bg-gray-50 rounded">
                <p>Tab hiện tại: {{ basicTab }}</p>
            </div>
        </div>

        <!-- Tabs with icons -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Tabs với icons</h2>
            <Tabs v-model="iconTab" :tabs="iconTabs" />
            <div class="mt-4 p-4 bg-gray-50 rounded">
                <p>Tab được chọn: {{ iconTab }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tabs } from "./index";

// Basic tabs
const basicTab = ref("tab1");
const basicTabs = [
    { key: "tab1", title: "Tab 1" },
    { key: "tab2", title: "Tab 2" },
    { key: "tab3", title: "Tab 3" }
];

// Tabs with icons
const iconTab = ref("home");
const iconTabs = [
    { key: "home", title: "Trang chủ", icon: "home" },
    { key: "user", title: "Người dùng", icon: "user" },
    { key: "settings", title: "Cài đặt", icon: "settings" },
    { key: "search", title: "Tìm kiếm", icon: "search" }
];

const handleChange = (value: string) => {
    console.log(value);
};
</script>
