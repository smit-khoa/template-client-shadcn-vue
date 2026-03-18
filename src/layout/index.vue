<template>
    <div
        class="w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex"
        :style="{ backgroundImage: `url(${bg_image})` }">
        <Sidebar />
        <main class="flex-1 min-w-0 overflow-auto flex flex-col">
            <AppHeader />
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import bg_image from "@/assets/images/bg.png"
import Sidebar from "@/components/sidebar/Sidebar.vue"
import { AppHeader } from "@/components/header"
</script>
