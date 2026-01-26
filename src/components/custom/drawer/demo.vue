<template>
    <div class="p-8 space-y-8">
        <h1 class="text-2xl font-bold mb-4">Drawer Component Demo</h1>

        <!-- Basic Drawer -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Basic Drawer</h2>
            <button @click="basicDrawer = true" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Open Basic Drawer</button>

            <Drawer v-model="basicDrawer" width="600px">
                <template #header>
                    <h3 class="text-lg font-semibold">Basic Drawer Header</h3>
                </template>
                <template #content>
                    <p>This is the content of the basic drawer.</p>
                    <p class="mt-2">It slides in from the right side with smooth animation.</p>
                    <p class="mt-2">You can close it by clicking outside, pressing ESC, or using the buttons below.</p>
                </template>
                <template #footer>
                    <div class="flex gap-2 justify-end">
                        <button @click="basicDrawer = false" class="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                        <button @click="basicDrawer = false" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                    </div>
                </template>
            </Drawer>
        </div>

        <!-- Drawer with Custom Width -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Drawer with Custom Width</h2>
            <button @click="wideDrawer = true" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Open Wide Drawer</button>

            <Drawer v-model="wideDrawer" width="800px">
                <template #header>
                    <h3 class="text-lg font-semibold">Wide Drawer (800px)</h3>
                </template>
                <template #content>
                    <p>This drawer has a custom width of 800px.</p>
                    <p class="mt-2">You can set any width using the width prop.</p>
                </template>
            </Drawer>
        </div>

        <!-- Priority Drawer (Cannot close by clicking outside) -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Priority Drawer</h2>
            <button @click="priorityDrawer = true" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Open Priority Drawer</button>

            <Drawer v-model="priorityDrawer" :isPriority="true">
                <template #header>
                    <h3 class="text-lg font-semibold text-red-600">Priority Drawer</h3>
                </template>
                <template #content>
                    <p class="text-red-600 font-semibold">This drawer cannot be closed by clicking outside!</p>
                    <p class="mt-2">ESC key is also disabled. You must use the close button.</p>
                </template>
                <template #footer>
                    <button @click="priorityDrawer = false" class="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close Priority Drawer</button>
                </template>
            </Drawer>
        </div>

        <!-- Confirm Close Drawer -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Confirm Close Drawer</h2>
            <button @click="confirmDrawer = true" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Open Confirm Drawer</button>

            <Drawer v-model="confirmDrawer" :isConfirm="true" @confirm-close="handleConfirmClose">
                <template #header>
                    <h3 class="text-lg font-semibold">Confirm Close Drawer</h3>
                </template>
                <template #content>
                    <p>This drawer will ask for confirmation before closing.</p>
                    <p class="mt-2">Try clicking outside or pressing ESC.</p>
                    <div v-if="showConfirmDialog" class="mt-4 p-4 bg-yellow-100 rounded">
                        <p class="font-semibold">Are you sure you want to close?</p>
                        <div class="flex gap-2 mt-2">
                            <button @click="confirmClose" class="px-3 py-1 bg-red-500 text-white rounded text-sm">Yes, Close</button>
                            <button @click="showConfirmDialog = false" class="px-3 py-1 bg-gray-500 text-white rounded text-sm">Cancel</button>
                        </div>
                    </div>
                </template>
            </Drawer>
        </div>

        <!-- Custom Slot Drawer -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Custom Slot Drawer</h2>
            <button @click="customDrawer = true" class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Open Custom Drawer</button>

            <Drawer v-model="customDrawer">
                <!-- Using default slot for complete control -->
                <div class="h-full flex flex-col">
                    <div class="px-6 py-4 bg-indigo-500 text-white">
                        <h3 class="text-xl font-bold">Custom Header</h3>
                        <p class="text-sm opacity-90">With custom styling</p>
                    </div>
                    <div class="flex-1 p-6 bg-gradient-to-b from-indigo-50 to-white">
                        <p>This drawer uses the default slot for complete customization.</p>
                        <p class="mt-2">You have full control over the layout and styling.</p>
                    </div>
                    <div class="px-6 py-4 bg-gray-100 border-t">
                        <button @click="customDrawer = false" class="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Close Custom Drawer</button>
                    </div>
                </div>
            </Drawer>
        </div>

        <!-- Drawer with Custom Classes -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Drawer with Custom Classes</h2>
            <button @click="styledDrawer = true" class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Open Styled Drawer</button>

            <Drawer v-model="styledDrawer" class="custom-styled-drawer" width="500px">
                <template #header>
                    <h3 class="text-lg font-semibold text-pink-600">Styled Drawer</h3>
                </template>
                <template #content>
                    <p>This drawer has custom styling applied via CSS classes.</p>
                    <p class="mt-2">You can customize the appearance using the class prop.</p>
                </template>
                <template #footer>
                    <button @click="styledDrawer = false" class="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Close</button>
                </template>
            </Drawer>
        </div>

        <!-- Drawer with Ref Methods -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Drawer with Ref Methods</h2>
            <div class="flex gap-2">
                <button @click="openDrawerWithRef" class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Open via Ref</button>
                <button @click="closeDrawerWithRef" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close via Ref</button>
            </div>

            <Drawer ref="drawerRef" v-model="refDrawer">
                <template #header>
                    <h3 class="text-lg font-semibold">Controlled via Ref</h3>
                </template>
                <template #content>
                    <p>This drawer can be controlled using ref methods.</p>
                    <p class="mt-2">Use the external buttons to open/close.</p>
                </template>
            </Drawer>
        </div>

        <!-- Drawer with Long Content (Scrollable) -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Drawer with Long Content</h2>
            <button @click="scrollableDrawer = true" class="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600">Open Scrollable Drawer</button>

            <Drawer v-model="scrollableDrawer" width="400px">
                <template #header>
                    <h3 class="text-lg font-semibold">Scrollable Content</h3>
                </template>
                <template #content>
                    <div class="space-y-4">
                        <p>This drawer demonstrates scrollable content when the content is too long.</p>
                        <div v-for="i in 20" :key="i" class="p-4 bg-gray-100 rounded">
                            <h4 class="font-semibold">Item {{ i }}</h4>
                            <p>This is a long content item that will make the drawer content scrollable. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <button @click="scrollableDrawer = false" class="w-full px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600">Close</button>
                </template>
            </Drawer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Drawer } from "./index";

// Drawer states
const basicDrawer = ref(false);
const wideDrawer = ref(false);
const priorityDrawer = ref(false);
const confirmDrawer = ref(false);
const customDrawer = ref(false);
const styledDrawer = ref(false);
const refDrawer = ref(false);
const scrollableDrawer = ref(false);

// Confirm dialog state
const showConfirmDialog = ref(false);

// Drawer ref
const drawerRef = ref();

// Handle confirm close
const handleConfirmClose = () => {
    showConfirmDialog.value = true;
};

const confirmClose = () => {
    showConfirmDialog.value = false;
    confirmDrawer.value = false;
};

// Ref methods
const openDrawerWithRef = () => {
    drawerRef.value?.open();
};

const closeDrawerWithRef = () => {
    drawerRef.value?.close();
};
</script>
