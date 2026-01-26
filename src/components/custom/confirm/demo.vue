<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Confirm Dialog Component Demo</h1>

    <!-- Basic Confirm -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Basic Confirm Dialog</h2>
      <Button @click="showBasic = true">Open Basic Confirm</Button>
      
      <Confirm 
        v-model="showBasic"
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể hoàn tác."
      />
    </div>

    <!-- Custom Size -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Custom Size</h2>
      <div class="flex gap-4">
        <Button @click="showSmall = true" variant="secondary">Small Dialog</Button>
        <Button @click="showMedium = true" variant="secondary">Medium Dialog</Button>
        <Button @click="showLarge = true" variant="secondary">Large Dialog</Button>
      </div>
      
      <Confirm 
        v-model="showSmall"
        title="Small Dialog"
        content="This is a small dialog with custom width and height."
        :width="300"
        :height="200"
      />
      
      <Confirm 
        v-model="showMedium"
        title="Medium Dialog"
        content="This is a medium-sized dialog with default dimensions."
      />
      
      <Confirm 
        v-model="showLarge"
        title="Large Dialog"
        content="This is a large dialog with more content. You can use this for displaying more detailed information or longer confirmation messages that require user attention."
        :width="600"
        :height="350"
      />
    </div>

    <!-- Custom Footer Actions -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Custom Footer Actions</h2>
      <Button @click="showCustomFooter = true">Open with Custom Actions</Button>
      
      <Confirm 
        v-model="showCustomFooter"
        title="Lưu thay đổi?"
        content="Bạn có muốn lưu các thay đổi trước khi thoát không?"
      >
        <template #footer>
          <AlertDialogCancel @click="handleDontSave">Không lưu</AlertDialogCancel>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction @click="handleSave">Lưu</AlertDialogAction>
        </template>
      </Confirm>
    </div>

    <!-- Confirm with Callback -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Confirm with Callbacks</h2>
      <Button @click="showWithCallback = true">Delete Item</Button>
      
      <Confirm 
        v-model="showWithCallback"
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa tệp này?"
      >
        <template #footer>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction @click="handleDelete">Xóa</AlertDialogAction>
        </template>
      </Confirm>
      
      <div v-if="deleteMessage" class="mt-4 p-3 bg-green-100 text-green-700 rounded">
        {{ deleteMessage }}
      </div>
    </div>

    <!-- Dynamic Content -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Dynamic Content</h2>
      <div class="space-y-3">
        <Input 
          v-model="dynamicTitle" 
          placeholder="Enter dialog title"
        />
        <Input 
          v-model="dynamicContent" 
          placeholder="Enter dialog content"
        />
        <Button @click="showDynamic = true">Open Dynamic Dialog</Button>
      </div>
      
      <Confirm 
        v-model="showDynamic"
        :title="dynamicTitle || 'Default Title'"
        :content="dynamicContent || 'Default content message'"
      />
    </div>

    <!-- Multiple Confirms -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Multiple Actions with Confirms</h2>
      <div class="flex gap-4">
        <Button @click="showAction1 = true" variant="secondary">Action 1</Button>
        <Button @click="showAction2 = true" variant="secondary">Action 2</Button>
        <Button @click="showAction3 = true" variant="secondary">Action 3</Button>
      </div>
      
      <Confirm 
        v-model="showAction1"
        title="Action 1"
        content="Confirm to proceed with Action 1"
      >
        <template #footer>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="handleAction(1)">Proceed</AlertDialogAction>
        </template>
      </Confirm>
      
      <Confirm 
        v-model="showAction2"
        title="Action 2"
        content="Confirm to proceed with Action 2"
      >
        <template #footer>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="handleAction(2)">Proceed</AlertDialogAction>
        </template>
      </Confirm>
      
      <Confirm 
        v-model="showAction3"
        title="Action 3"
        content="Confirm to proceed with Action 3"
      >
        <template #footer>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="handleAction(3)">Proceed</AlertDialogAction>
        </template>
      </Confirm>
      
      <div v-if="lastAction" class="mt-4 p-3 bg-blue-100 text-blue-700 rounded">
        Last action performed: Action {{ lastAction }}
      </div>
    </div>

    <!-- Warning Dialog -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Warning Dialog</h2>
      <Button @click="showWarning = true" variant="secondary">Show Warning</Button>
      
      <Confirm 
        v-model="showWarning"
        title="⚠️ Cảnh báo"
        content="Đây là một cảnh báo quan trọng. Vui lòng đọc kỹ trước khi tiếp tục."
        :width="450"
      >
        <template #footer>
          <AlertDialogAction @click="showWarning = false">Đã hiểu</AlertDialogAction>
        </template>
      </Confirm>
    </div>

    <!-- Success Dialog -->
    <div class="demo-section">
      <h2 class="text-lg font-semibold mb-4">Success Dialog</h2>
      <Button @click="showSuccess = true" variant="secondary">Show Success</Button>
      
      <Confirm 
        v-model="showSuccess"
        title="✅ Thành công"
        content="Thao tác đã được thực hiện thành công!"
        :width="400"
        :height="200"
      >
        <template #footer>
          <AlertDialogAction @click="showSuccess = false">OK</AlertDialogAction>
        </template>
      </Confirm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Confirm } from "./index";
import { Button } from "../button/index";
import { Input } from "../../ui/input";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "../../ui/alert-dialog";

// Dialog states
const showBasic = ref(false);
const showSmall = ref(false);
const showMedium = ref(false);
const showLarge = ref(false);
const showCustomFooter = ref(false);
const showWithCallback = ref(false);
const showDynamic = ref(false);
const showAction1 = ref(false);
const showAction2 = ref(false);
const showAction3 = ref(false);
const showWarning = ref(false);
const showSuccess = ref(false);

// Dynamic content
const dynamicTitle = ref("");
const dynamicContent = ref("");

// Callback messages
const deleteMessage = ref("");
const lastAction = ref<number | null>(null);

// Handlers
const handleSave = () => {
  console.log("Saving changes...");
  showCustomFooter.value = false;
  alert("Changes saved!");
};

const handleDontSave = () => {
  console.log("Not saving changes");
  showCustomFooter.value = false;
  alert("Changes discarded!");
};

const handleDelete = () => {
  deleteMessage.value = "Item deleted successfully!";
  showWithCallback.value = false;
  setTimeout(() => {
    deleteMessage.value = "";
  }, 3000);
};

const handleAction = (actionNumber: number) => {
  lastAction.value = actionNumber;
  console.log(`Action ${actionNumber} performed`);
  
  // Close the corresponding dialog
  if (actionNumber === 1) showAction1.value = false;
  if (actionNumber === 2) showAction2.value = false;
  if (actionNumber === 3) showAction3.value = false;
  
  setTimeout(() => {
    lastAction.value = null;
  }, 3000);
};
</script>

<style scoped>
.demo-section {
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
}
</style>