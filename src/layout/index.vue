<template>
    <div class="home flex">
        <!-- Navbar -->
        <div class="h-full shrink-0">
            <Navbar />
        </div>
        <!-- Main Content -->
        <div class="flex-1 h-full min-w-0 pb-[8px]">
            <div class="h-[60px] py-[12px] px-[24px] flex items-center justify-between font-semibold">
                <div class="text-gradient text-[18px]">{{ $route.name }}</div>

                <div class="flex items-center gap-[20px]">
                    <Icon name="help-circle" :size="20" color="#fff" hoverColor="#2eb9a0" class="cursor-pointer" />

                    <!-- Theme Toggle -->
                    <ThemeToggle />

                    <!-- User Dropdown -->
                    <Dropdown v-model="is_user_dropdown_open" position="bottom-end" no-padding>
                        <template #trigger>
                            <div class="flex items-center gap-2 cursor-pointer">
                                <div
                                    class="w-[28px] h-[28px] rounded-full bg-white overflow-hidden border-2 border-white/30">
                                    <img
                                        src="https://i.pravatar.cc/150?img=3"
                                        alt="Avatar"
                                        class="w-full h-full object-cover" />
                                </div>
                            </div>
                        </template>

                        <!-- Dropdown Content -->
                        <div class="flex flex-col w-[220px]">
                            <!-- User Info -->
                            <div class="p-2 pb-0">
                                <div class="flex items-center justify-between p-3 border border-[#e8edf2] rounded-xl">
                                    <div class="flex flex-col gap-1">
                                        <span class="text-sm font-semibold text-[#0d0d0d]">
                                            {{ user_store.getUser?.userName || "User" }}
                                        </span>
                                        <span class="text-[13px] font-medium text-[#0069fe]">Admin</span>
                                    </div>
                                    <div class="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src="https://i.pravatar.cc/150?img=3"
                                            alt="Avatar"
                                            class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <!-- Menu Items -->
                            <div class="flex flex-col gap-1 px-2 py-2.5">
                                <div
                                    class="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-[#f5f8fc] transition-colors"
                                    @click="openUserSettings">
                                    <Icon name="user-03" :size="16" color="#1a2229" />
                                    <span class="text-sm font-medium text-[#1a2229]">Tài khoản</span>
                                </div>
                                <div
                                    class="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-[#f5f8fc] transition-colors">
                                    <Icon name="globe-02" :size="16" color="#1a2229" />
                                    <span class="text-sm font-medium text-[#1a2229]">Ngôn ngữ</span>
                                </div>
                            </div>

                            <!-- Divider -->
                            <div class="h-px bg-[#e8edf2]" />

                            <!-- Logout -->
                            <div class="p-2">
                                <div
                                    class="flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer hover:bg-red-50 transition-colors"
                                    @click="handleLogout">
                                    <Icon name="logout-05" :size="16" color="#ff3a3a" />
                                    <span class="text-sm font-medium text-[#ff3a3a]">Đăng xuất</span>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <!--app -->
            <div class="w-full h-[calc(100%-60px)] px-[8px]">
                <Transition name="page" mode="out-in">
                    <div
                        v-if="is_page_loading"
                        key="loading"
                        class="bg-white/20 p-2 rounded-2xl size-full overflow-hidden">
                        <div class="bg-white rounded-xl h-full flex flex-col items-center justify-center gap-4">
                            <img
                                src="@/assets/images/illustration-loading.png"
                                alt="Loading"
                                class="w-[160px] h-[120px]" />
                            <div class="flex items-center gap-2">
                                <div class="loading-spinner" />
                                <span class="text-[18px] font-bold text-neutral-100">Đang tải trang...</span>
                            </div>
                            <span class="text-[13px] font-medium text-[#718096]">
                                Bạn vui lòng chờ tới khi loading hoàn tất
                            </span>
                        </div>
                    </div>

                    <div v-else key="content" class="size-full">
                        <RouterView v-slot="{ Component }">
                            <component :is="Component" />
                        </RouterView>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- User Settings Popup -->
        <UserSettingsPopup v-model="is_user_settings_open" />

        <!-- Logout Confirm Dialog -->
        <Confirm
            v-model="show_logout_confirm"
            title="Bạn có chắc chắn muốn đăng xuất?"
            content="Khi đăng xuất, tài khoản của bạn sẽ thoát khỏi thiết bị hiện tại"
            :image="logoutIllustration"
            @confirm="confirmLogout" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Icon } from "@/components/custom/icon"
import { Dropdown } from "@/components/custom/dropdown"
import { Confirm } from "@/components/custom/confirm"
import { ThemeToggle } from "@/components/custom/theme-toggle"
import { useTheme } from "@/composables/useTheme"
import Navbar from "./Navbar.vue"
import UserSettingsPopup from "./UserSettingsPopup.vue"
import { RouterView, useRouter } from "vue-router"
import { user } from "@/store"
import logoutIllustration from "@/assets/images/log-out.png"

const router = useRouter()
const user_store = user()
const { initTheme } = useTheme()
const is_page_loading = ref(false)
const is_user_dropdown_open = ref(false)
const is_user_settings_open = ref(false)
const show_logout_confirm = ref(false)
let loading_timeout: ReturnType<typeof setTimeout> | null = null

// Open logout confirm dialog
const handleLogout = () => {
    is_user_dropdown_open.value = false
    show_logout_confirm.value = true
}

// Confirm logout
const confirmLogout = () => {
    localStorage.removeItem("accessToken")
    router.push("/login")
}

// Open user settings popup
const openUserSettings = () => {
    is_user_dropdown_open.value = false
    is_user_settings_open.value = true
}

// Minimum loading time để tránh flash (ms)
const MIN_LOADING_TIME = 3000

const startLoading = () => {
    is_page_loading.value = true
}

const stopLoading = () => {
    if (loading_timeout) {
        clearTimeout(loading_timeout)
    }
    loading_timeout = setTimeout(() => {
        is_page_loading.value = false
    }, MIN_LOADING_TIME)
}

// Router navigation guards
const beforeEachUnregister = router.beforeEach((_to, _from, next) => {
    startLoading()
    next()
})

const afterEachUnregister = router.afterEach(() => {
    stopLoading()
})

onMounted(() => {
    // Không show loading khi mount lần đầu
    is_page_loading.value = false
    // Initialize theme
    initTheme()
})

onUnmounted(() => {
    // Cleanup navigation guards
    beforeEachUnregister()
    afterEachUnregister()
    if (loading_timeout) {
        clearTimeout(loading_timeout)
    }
})
</script>

<style lang="scss" scoped>
.home {
    background-image: url("@/assets/images/home-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #e8edf2;
    border-top-color: #33c4aa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Page transition - Scale + Fade + Blur */
.page-enter-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
    opacity: 0;
    transform: scale(0.96);
    filter: blur(4px);
}

.page-leave-to {
    opacity: 0;
    transform: scale(1.02);
    filter: blur(4px);
}
</style>
