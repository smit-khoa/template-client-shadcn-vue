<template>
    <div
        class="w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex"
        :style="{ backgroundImage: `url(${bg_image})` }"
    >
        <!-- Sidebar -->
        <aside class="h-full w-64 shrink-0">
            <!-- Sidebar content -->
        </aside>

        <!-- Main area -->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Header -->
            <header class="h-16 shrink-0">
                <!-- Header content -->
            </header>

            <!-- Content -->
            <main class="flex-1 overflow-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import bg_image from "@/assets/images/bg.png"
</script>

<style scoped></style>
