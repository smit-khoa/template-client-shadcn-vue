<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Dropdown Component Demo</h1>

    <!-- Basic dropdown với DropdownTitle -->
    <div>
      <h2 class="text-lg font-semibold mb-2">
        Dropdown cơ bản với DropdownTitle
      </h2>
      <Dropdown v-model="basicDropdown">
        <template #trigger>
          <DropdownTitle
            title="Chọn một tùy chọn"
            icon="book"
            :open="basicDropdown"
          />
        </template>
        <DropdownItem value="Profile" />
        <DropdownItem icon="settings" state="selected" value="Cài đặt" />
        <DropdownItem icon="user" value="Tài khoản" />
        <DropdownItem icon="logout" state="disabled" value="Đăng xuất" />
      </Dropdown>
    </div>

    <!-- Dropdown với các state khác nhau của DropdownItem -->
    <div>
      <h2 class="text-lg font-semibold mb-2">
        Các trạng thái của DropdownItem
      </h2>
      <Dropdown v-model="stateDropdown" titleWidth="300px" bodyWidth="300px">
        <template #trigger>
          <DropdownTitle title="Các trạng thái item" :open="stateDropdown" />
        </template>
        <DropdownItem value="Item mặc định" state="default" />
        <DropdownItem icon="checked" value="Item được chọn" state="selected" />
        <DropdownItem
          icon="lock"
          value="Item bị vô hiệu hóa"
          state="disabled"
        />
        <DropdownItem icon="star" value="Item với icon" />
      </Dropdown>
    </div>

    <!-- Custom trigger -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Custom Trigger</h2>
      <Dropdown v-model="customTriggerDropdown" @open="onOpen" @close="onClose">
        <template #trigger>
          <button
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <span>Custom Button</span>
            <svg
              v-if="!customTriggerDropdown"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </template>
        <DropdownItem value="Tùy chọn 1" />
        <DropdownItem value="Tùy chọn 2" />
        <DropdownItem value="Tùy chọn 3" />
      </Dropdown>
      <p class="text-sm text-gray-500 mt-1">{{ message }}</p>
    </div>

    <!-- Body width auto (match trigger width) -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Auto Width (khớp với trigger)</h2>
      <Dropdown bodyWidth="auto" titleWidth="300px">
        <template #trigger>
          <DropdownTitle title="Dropdown rộng 300px" icon="settings" />
        </template>
        <DropdownItem value="Menu width = trigger width" />
        <DropdownItem value="Item khác" />
        <DropdownItem value="Item cuối cùng" />
      </Dropdown>
    </div>

    <!-- Fixed width & height dropdown -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Kích thước cố định</h2>
      <Dropdown bodyWidth="400px" bodyHeight="200px" position="bottom-end">
        <template #trigger>
          <DropdownTitle title="Fixed size dropdown" />
        </template>
        <DropdownItem value="Width: 400px" />
        <DropdownItem value="Height: 200px" />
        <DropdownItem value="Item 3" />
        <DropdownItem value="Item 4" />
        <DropdownItem value="Item 5" />
        <DropdownItem value="Item 6 - scroll để xem thêm" />
        <DropdownItem value="Item 7" />
        <DropdownItem value="Item 8" />
      </Dropdown>
    </div>

    <!-- Different positions -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Vị trí khác nhau</h2>
      <div class="flex gap-4 flex-wrap mt-20">
        <Dropdown position="bottom-start">
          <template #trigger>
            <DropdownTitle title="Bottom Start" />
          </template>
          <DropdownItem value="Item 1" />
          <DropdownItem value="Item 2" />
        </Dropdown>

        <Dropdown position="bottom-end">
          <template #trigger>
            <DropdownTitle title="Bottom End" />
          </template>
          <DropdownItem value="Item 1" />
          <DropdownItem value="Item 2" />
        </Dropdown>

        <Dropdown position="top-start">
          <template #trigger>
            <DropdownTitle title="Top Start" />
          </template>
          <DropdownItem value="Item 1" />
          <DropdownItem value="Item 2" />
        </Dropdown>

        <Dropdown position="top-end">
          <template #trigger>
            <DropdownTitle title="Top End" />
          </template>
          <DropdownItem value="Item 1" />
          <DropdownItem value="Item 2" />
        </Dropdown>
      </div>
    </div>

    <!-- Priority (prevent close on outside click) -->
    <div>
      <h2 class="text-lg font-semibold mb-2">
        Priority Mode (không đóng khi click bên ngoài)
      </h2>
      <Dropdown :priority="true" v-model="priorityDropdown">
        <template #trigger>
          <DropdownTitle
            title="Click outside sẽ không đóng"
            :open="priorityDropdown"
          />
        </template>
        <DropdownItem value="Click bên ngoài sẽ không đóng dropdown" />
        <DropdownItem
          @click="priorityDropdown = false"
          value="Click đây để đóng"
        />
      </Dropdown>
    </div>

    <!-- Without arrow -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Không có mũi tên</h2>
      <Dropdown :show-arrow="false">
        <template #trigger>
          <button class="px-4 py-2 border rounded">Không có mũi tên</button>
        </template>
        <DropdownItem value="Item 1" />
        <DropdownItem value="Item 2" />
      </Dropdown>
    </div>

    <!-- Disabled state -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Trạng thái Disabled</h2>
      <Dropdown :disabled="true">
        <template #trigger>
          <DropdownTitle title="Dropdown bị vô hiệu hóa" />
        </template>
        <DropdownItem value="Không thể mở dropdown này" />
      </Dropdown>
    </div>

    <!-- Full width dropdown -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Full Width Dropdown</h2>
      <div class="max-w-md">
        <Dropdown titleWidth="100%" bodyWidth="auto">
          <template #trigger>
            <DropdownTitle
              title="Dropdown chiếm toàn bộ chiều rộng"
              icon="expand"
            />
          </template>
          <DropdownItem value="Item 1" />
          <DropdownItem value="Item 2" />
          <DropdownItem value="Item 3" />
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dropdown, DropdownItem, DropdownTitle } from "./index";

const basicDropdown = ref(false);
const stateDropdown = ref(false);
const customTriggerDropdown = ref(false);
const priorityDropdown = ref(false);
const message = ref("");

const onOpen = () => {
  message.value = "Dropdown đã mở!";
  setTimeout(() => (message.value = ""), 2000);
};

const onClose = () => {
  message.value = "Dropdown đã đóng!";
  setTimeout(() => (message.value = ""), 2000);
};
</script>
