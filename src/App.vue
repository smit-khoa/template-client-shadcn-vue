<template>
    <div class="w-screen h-screen overflow-hidden">
        <router-view />
    </div>

    <Teleport to="body">
        <Toaster />
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { Toaster } from "@/components/ui/sonner"
import { useRouter } from "vue-router"

const router = useRouter()

onMounted(() => {
    router.isReady().then(() => {
        const loading_el = document.getElementById("initial-loading")
        if (loading_el) {
            loading_el.style.transition = "opacity 0.4s ease"
            loading_el.style.opacity = "0"

            setTimeout(() => loading_el.remove(), 400)
        }
    })
})
</script>

<style scoped></style>
