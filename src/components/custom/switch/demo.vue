<template>
    <div class="p-8 space-y-8">
        <h1 class="text-2xl font-bold mb-4">Switch Component Demo</h1>

        <!-- Basic switch -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Switch cơ bản</h2>
            <div class="flex items-center gap-4">
                <Switch v-model="basicSwitch" />
                <span class="text-sm">Trạng thái: {{ basicSwitch ? "Bật" : "Tắt" }}</span>
            </div>
        </div>

        <!-- States demo -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Các trạng thái</h2>
            <div class="space-y-4">
                <div class="flex items-center gap-4">
                    <Switch :modelValue="false" />
                    <span class="text-sm text-gray-600">Default (Unchecked/Off)</span>
                </div>

                <div class="flex items-center gap-4">
                    <Switch :modelValue="true" />
                    <span class="text-sm text-gray-600">Checked (On)</span>
                </div>

                <div class="flex items-center gap-4">
                    <Switch :modelValue="false" :disabled="true" />
                    <span class="text-sm text-gray-600">Disabled (Off)</span>
                </div>

                <div class="flex items-center gap-4">
                    <Switch :modelValue="true" :disabled="true" />
                    <span class="text-sm text-gray-600">Disabled (On)</span>
                </div>
            </div>
        </div>

        <!-- Interactive example -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Ví dụ tương tác</h2>
            <div class="space-y-4">
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <Switch v-model="interactiveSwitch" id="notif-switch" />
                        <span>Bật/tắt thông báo</span>
                    </label>
                </div>
                <p v-if="interactiveSwitch" class="text-sm text-green-600">✓ Thông báo đã được bật</p>
                <p v-else class="text-sm text-gray-500">Thông báo đã tắt</p>
            </div>
        </div>

        <!-- Form example -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Sử dụng trong form</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md">
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <label for="emailNotif" class="text-sm font-medium"> Nhận thông báo qua email </label>
                        <Switch v-model="formData.emailNotifications" id="emailNotif" />
                    </div>

                    <div class="flex items-center justify-between">
                        <label for="smsNotif" class="text-sm font-medium"> Nhận thông báo qua SMS </label>
                        <Switch v-model="formData.smsNotifications" id="smsNotif" />
                    </div>

                    <div class="flex items-center justify-between">
                        <label for="marketing" class="text-sm font-medium"> Nhận tin marketing </label>
                        <Switch v-model="formData.marketingEmails" id="marketing" />
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="text-sm font-medium text-gray-400"> Tính năng đang phát triển </label>
                        <Switch :disabled="true" />
                    </div>
                </div>

                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Lưu cài đặt
                </button>
            </form>
            <div v-if="submitted" class="mt-4 p-4 bg-gray-100 rounded">
                <p class="text-sm font-medium">Dữ liệu form:</p>
                <pre class="text-xs mt-2">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
        </div>

        <!-- Multiple switches -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Nhiều switch</h2>
            <div class="space-y-3">
                <div
                    v-for="(setting, index) in settings"
                    :key="index"
                    class="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                        <p class="font-medium text-sm">{{ setting.label }}</p>
                        <p class="text-xs text-gray-500">{{ setting.description }}</p>
                    </div>
                    <Switch v-model="setting.enabled" />
                </div>
            </div>
        </div>

        <!-- Custom slot content -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Custom thumb slot</h2>
            <div class="space-y-4">
                <div class="flex items-center gap-4">
                    <Switch v-model="customSlotSwitch">
                        <template #thumb>
                            <div class="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </template>
                    </Switch>
                    <span class="text-sm">Custom thumb với gradient</span>
                </div>
            </div>
        </div>

        <!-- Controlled externally -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Điều khiển từ bên ngoài</h2>
            <div class="space-y-4">
                <Switch :modelValue="externalControl" @update:checked="handleExternalUpdate" />
                <div class="flex gap-2">
                    <button
                        @click="externalControl = true"
                        class="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                        Bật
                    </button>
                    <button
                        @click="externalControl = false"
                        class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                        Tắt
                    </button>
                    <button
                        @click="externalControl = !externalControl"
                        class="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
                        Toggle
                    </button>
                </div>
            </div>
        </div>

        <!-- Note về styling -->
        <div class="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-semibold mb-2">Lưu ý về styling</h3>
            <ul class="text-sm space-y-1 list-disc list-inside">
                <li>
                    Component sử dụng biến CSS <code class="bg-gray-100 px-1">--gradient</code> cho trạng thái checked
                </li>
                <li>Sử dụng biến CSS <code class="bg-gray-100 px-1">--neutral</code> cho trạng thái unchecked</li>
                <li>Kích thước cố định: 36x20px với thumb 16x16px</li>
                <li>Hỗ trợ dark mode thông qua Tailwind classes</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { Switch } from "./index"

// Basic switch
const basicSwitch = ref(false)

// Interactive example
const interactiveSwitch = ref(true)

// Form data
const formData = reactive({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false
})
const submitted = ref(false)

const handleSubmit = () => {
    submitted.value = true
    console.log("Form submitted:", formData)
    setTimeout(() => {
        submitted.value = false
    }, 3000)
}

// Multiple switches
const settings = reactive([
    {
        label: "Chế độ tối",
        description: "Sử dụng giao diện tối cho ứng dụng",
        enabled: false
    },
    {
        label: "Tự động cập nhật",
        description: "Tự động tải và cài đặt bản cập nhật mới",
        enabled: true
    },
    {
        label: "Hiển thị thông báo",
        description: "Nhận thông báo từ ứng dụng",
        enabled: true
    },
    {
        label: "Chế độ tiết kiệm dữ liệu",
        description: "Giảm việc sử dụng dữ liệu mạng",
        enabled: false
    }
])

// Custom slot
const customSlotSwitch = ref(false)

// External control
const externalControl = ref(false)

const handleExternalUpdate = (value: boolean) => {
    console.log("Switch updated externally:", value)
    externalControl.value = value
}
</script>
