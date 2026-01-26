<template>
    <div class="p-8 space-y-8">
        <h1 class="text-2xl font-bold mb-4">Search Component Demo</h1>

        <!-- Search States -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Trạng thái của Search</h2>
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-gray-600 mb-2">Default state:</p>
                    <Search placeholder="Tìm kiếm" />
                </div>

                <div>
                    <p class="text-sm text-gray-600 mb-2">Hover state (hover chuột vào input):</p>
                    <Search placeholder="Tìm kiếm" />
                </div>

                <div>
                    <p class="text-sm text-gray-600 mb-2">Focus/Active state (click vào input):</p>
                    <Search placeholder="Nhập thông tin" />
                </div>

                <div>
                    <p class="text-sm text-gray-600 mb-2">Typing state (gõ nội dung):</p>
                    <Search v-model="typingSearch" placeholder="Nhập thông tin" />
                </div>
            </div>
        </div>

        <!-- Basic search -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Ví dụ cơ bản</h2>
            <Search v-model="basicSearch" @search="handleBasicSearch" />
            <p class="text-sm text-gray-500 mt-2">
                Giá trị hiện tại: {{ basicSearch }}
                <span v-if="basicSearchResult" class="ml-2">| Đã tìm: "{{ basicSearchResult }}"</span>
            </p>
        </div>

        <!-- Different states demo -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Demo các trạng thái khác nhau</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600 mb-2">Disabled state:</p>
                    <Search :disabled="true" placeholder="Tìm kiếm" model-value="Không thể chỉnh sửa" />
                </div>

                <div>
                    <p class="text-sm text-gray-600 mb-2">Readonly state:</p>
                    <Search :readonly="true" placeholder="Tìm kiếm" model-value="Chỉ đọc" />
                </div>
            </div>
        </div>

        <!-- Real-time search example -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Tìm kiếm thời gian thực</h2>
            <Search v-model="loadingSearch" placeholder="Gõ để tìm sản phẩm..." @search="performSearch" />
            <div v-if="searchResults.length" class="mt-4 p-4 bg-gray-50 rounded">
                <h3 class="font-medium mb-2">Kết quả tìm kiếm:</h3>
                <ul class="space-y-1">
                    <li v-for="item in searchResults" :key="item.id" class="text-sm">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- Custom debounce -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Custom Debounce</h2>
            <div class="space-y-3">
                <div>
                    <Search v-model="instantSearch" :debounce="0" placeholder="Instant search (no debounce)" @search="v => (instantResult = v)" />
                    <p class="text-sm text-gray-500 mt-1">Instant result: {{ instantResult }}</p>
                </div>

                <div>
                    <Search v-model="delayedSearch" :debounce="1000" placeholder="Delayed search (1 second)" @search="v => (delayedResult = v)" />
                    <p class="text-sm text-gray-500 mt-1">Delayed result: {{ delayedResult }}</p>
                </div>
            </div>
        </div>

        <!-- Event examples -->

        <div>
            <h2 class="text-lg font-semibold mb-2">Events Demo</h2>
            <div class="space-y-3">
                <Search v-model="eventsSearch" placeholder="Type to see events" @focus="onFocus" @blur="onBlur" />
                <div class="text-sm text-gray-600">
                    <p v-if="focusStatus">{{ focusStatus }}</p>
                </div>
            </div>
        </div>

        <!-- Using methods -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Using Component Methods</h2>
            <Search ref="searchRef" v-model="methodsSearch" placeholder="Controllable search" />
            <div class="flex gap-2 mt-3">
                <Button size="sm" @click="focusSearch">Focus</Button>
                <Button size="sm" @click="blurSearch">Blur</Button>
                <Button size="sm" @click="clearSearch">Clear</Button>
            </div>
        </div>

        <!-- Handle Enter key -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Handle Enter Key</h2>
            <Search v-model="enterSearch" placeholder="Press Enter to submit" @enter="handleEnterSubmit" />
            <p v-if="enterSubmitted" class="text-sm text-green-600 mt-2">Submitted: "{{ enterSubmitted }}"</p>
        </div>

        <!-- Custom styling -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Custom Styling</h2>
            <div class="space-y-3">
                <Search container-class="max-w-md" class="border-2 focus:ring-blue-500" placeholder="Custom border color" />

                <Search class="rounded-full" placeholder="Rounded full" />

                <Search class="bg-gray-100" placeholder="Gray background" />
            </div>
        </div>

        <!-- Full example with API simulation -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Full Example - User Search</h2>
            <div class="max-w-lg">
                <Search v-model="userSearchQuery" placeholder="Search users by name or email..." @search="searchUsers" />

                <div v-if="users.length" class="mt-4 border rounded-lg overflow-hidden">
                    <div v-for="user in users" :key="user.id" class="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <p class="font-medium">{{ user.name }}</p>
                            <p class="text-sm text-gray-500">{{ user.email }}</p>
                        </div>
                    </div>
                </div>

                <p v-else-if="userSearchQuery && !isSearchingUsers" class="text-gray-500 mt-4">No users found for "{{ userSearchQuery }}"</p>
            </div>
        </div>

        <!-- Different input types -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Different Input Types</h2>
            <div class="space-y-3">
                <Search type="email" placeholder="Search emails..." v-model="emailSearch" />

                <Search type="tel" placeholder="Search phone numbers..." v-model="phoneSearch" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "./index";
import { Button } from "../button/index";

// Typing state
const typingSearch = ref("Demo typing");

// Basic search
const basicSearch = ref("");
const basicSearchResult = ref("");

const handleBasicSearch = (value: string) => {
    basicSearchResult.value = value;
};

// Loading search
const loadingSearch = ref("");
const isSearching = ref(false);
const searchResults = ref<Array<{ id: number; name: string }>>([]);

const performSearch = async (query: string) => {
    if (!query) {
        searchResults.value = [];
        return;
    }

    isSearching.value = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    searchResults.value = [
        { id: 1, name: `Product: ${query} - Model A` },
        { id: 2, name: `Product: ${query} - Model B` },
        { id: 3, name: `Product: ${query} - Model C` }
    ];
    isSearching.value = false;
};

// Debounce examples
const instantSearch = ref("");
const instantResult = ref("");
const delayedSearch = ref("");
const delayedResult = ref("");

// Events demo
const eventsSearch = ref("");
const focusStatus = ref("");

const onFocus = () => {
    focusStatus.value = "Input focused";
    setTimeout(() => {
        focusStatus.value = "";
    }, 2000);
};

const onBlur = () => {
    focusStatus.value = "Input blurred";
    setTimeout(() => {
        focusStatus.value = "";
    }, 2000);
};

// Methods
const searchRef = ref();
const methodsSearch = ref("");

const focusSearch = () => searchRef.value?.focus();
const blurSearch = () => searchRef.value?.blur();
const clearSearch = () => {
    methodsSearch.value = "";
};

// Enter key
const enterSearch = ref("");
const enterSubmitted = ref("");

const handleEnterSubmit = (value: string) => {
    enterSubmitted.value = value;
    setTimeout(() => {
        enterSubmitted.value = "";
    }, 3000);
};

// User search example
const userSearchQuery = ref("");
const isSearchingUsers = ref(false);
const users = ref<Array<{ id: number; name: string; email: string }>>([]);

const searchUsers = async (query: string) => {
    if (!query) {
        users.value = [];
        return;
    }

    isSearchingUsers.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate user data
    const mockUsers = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 4, name: "Alice Brown", email: "alice@example.com" }
    ];

    users.value = mockUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()));

    isSearchingUsers.value = false;
};

// Different types
const emailSearch = ref("");
const phoneSearch = ref("");
</script>
