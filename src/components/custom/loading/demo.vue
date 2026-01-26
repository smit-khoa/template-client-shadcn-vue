<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-6">Loading Components Demo</h1>

    <!-- LoadDefault Component -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">LoadDefault Component</h2>
      <p class="text-gray-600">Spinner loading đơn giản, phù hợp cho các loading nhỏ trong component</p>
      
      <div class="grid gap-4">
        <!-- Basic usage -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Basic Usage</h3>
          <LoadDefault />
        </div>

        <!-- In a card -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Trong Card</h3>
          <div class="bg-white border rounded-lg p-4 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-semibold">Loading Data...</h4>
            </div>
            <LoadDefault />
            <p class="text-center text-gray-500 mt-4">Đang tải dữ liệu...</p>
          </div>
        </div>

        <!-- With different backgrounds -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Với Background khác nhau</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-100 rounded p-4">
              <LoadDefault />
            </div>
            <div class="bg-blue-50 rounded p-4">
              <LoadDefault />
            </div>
            <div class="bg-green-50 rounded p-4">
              <LoadDefault />
            </div>
          </div>
        </div>

        <!-- Loading state in button -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Loading State trong Button</h3>
          <div class="space-y-4">
            <button 
              class="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-block w-4 h-4">
                <div class="loading-spinner-small"></div>
              </span>
              {{ isLoading ? 'Đang xử lý...' : 'Submit' }}
            </button>
            <button 
              @click="toggleLoading"
              class="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Toggle Loading
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- LoadPage Component -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">LoadPage Component</h2>
      <p class="text-gray-600">Loading với text animation "LOADING", phù hợp cho loading toàn trang</p>
      
      <div class="grid gap-4">
        <!-- Basic usage -->
        <div class="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 class="font-medium mb-4">Basic Usage (cần background màu)</h3>
          <div class="h-32 flex items-center justify-center">
            <LoadPage />
          </div>
        </div>

        <!-- With gradient background -->
        <div class="border rounded-lg overflow-hidden">
          <h3 class="font-medium p-4 border-b">Với Gradient Background</h3>
          <div class="h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <LoadPage />
          </div>
        </div>

        <!-- With image background -->
        <div class="border rounded-lg overflow-hidden">
          <h3 class="font-medium p-4 border-b">Với Pattern Background</h3>
          <div 
            class="h-48 flex items-center justify-center"
            style="background-image: url('data:image/svg+xml,%3Csvg width=\&quot;60\&quot; height=\&quot;60\&quot; viewBox=\&quot;0 0 60 60\&quot; xmlns=\&quot;http://www.w3.org/2000/svg\&quot;%3E%3Cg fill=\&quot;none\&quot; fill-rule=\&quot;evenodd\&quot;%3E%3Cg fill=\&quot;%239C92AC\&quot; fill-opacity=\&quot;0.4\&quot;%3E%3Cpath d=\&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'); background-color: #667eea;"
          >
            <LoadPage />
          </div>
        </div>

        <!-- Full page loading simulation -->
        <div class="border rounded-lg overflow-hidden">
          <h3 class="font-medium p-4 border-b">Full Page Loading Simulation</h3>
          <div class="relative">
            <button 
              @click="showFullPageLoading"
              class="px-4 py-2 bg-purple-500 text-white rounded m-4"
            >
              Show Full Page Loading (3s)
            </button>
            
            <!-- Simulated full page loading -->
            <div 
              v-if="fullPageLoading"
              class="fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center z-50"
            >
              <LoadPage />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Combined Usage Examples -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Usage Examples</h2>
      
      <div class="grid gap-4">
        <!-- Data table loading -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Table Loading State</h3>
          <div class="bg-white border rounded">
            <div class="border-b p-4">
              <h4 class="font-semibold">User List</h4>
            </div>
            <div class="p-8">
              <LoadDefault />
              <p class="text-center text-gray-500 mt-4">Loading users...</p>
            </div>
          </div>
        </div>

        <!-- Card skeleton with loading -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Card Skeleton Loading</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white border rounded-lg p-4">
              <div class="h-20 bg-gray-200 rounded animate-pulse mb-4"></div>
              <LoadDefault />
            </div>
            <div class="bg-white border rounded-lg p-4">
              <div class="h-20 bg-gray-200 rounded animate-pulse mb-4"></div>
              <LoadDefault />
            </div>
            <div class="bg-white border rounded-lg p-4">
              <div class="h-20 bg-gray-200 rounded animate-pulse mb-4"></div>
              <LoadDefault />
            </div>
          </div>
        </div>

        <!-- Modal with loading -->
        <div class="border rounded-lg p-6">
          <h3 class="font-medium mb-4">Modal Loading State</h3>
          <button 
            @click="showModal = true"
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            Open Modal with Loading
          </button>
          
          <!-- Modal -->
          <div 
            v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
            @click="showModal = false"
          >
            <div 
              class="bg-white rounded-lg p-6 max-w-sm w-full"
              @click.stop
            >
              <h4 class="font-semibold mb-4">Processing...</h4>
              <LoadDefault />
              <p class="text-center text-gray-500 mt-4">Please wait while we process your request</p>
              <button 
                @click="showModal = false"
                class="mt-4 px-4 py-2 bg-gray-500 text-white rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance Notes -->
    <section class="bg-gray-50 rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Usage Notes</h2>
      <div class="space-y-2 text-gray-700">
        <p>• <strong>LoadDefault:</strong> Sử dụng cho loading nhỏ trong component, không cần background đặc biệt</p>
        <p>• <strong>LoadPage:</strong> Sử dụng cho loading toàn trang, cần background màu hoặc gradient để text hiển thị rõ</p>
        <p>• LoadDefault có spinner xoay với màu xanh (#3498db)</p>
        <p>• LoadPage có animation text "LOADING" với hiệu ứng wave</p>
        <p>• Cả hai component đều có animation smooth và không ảnh hưởng performance</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LoadDefault, LoadPage } from './index';

// Loading states
const isLoading = ref(false);
const fullPageLoading = ref(false);
const showModal = ref(false);

// Toggle loading for button example
const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

// Show full page loading for 3 seconds
const showFullPageLoading = () => {
  fullPageLoading.value = true;
  setTimeout(() => {
    fullPageLoading.value = false;
  }, 3000);
};
</script>

<style scoped>
/* Small spinner for button */
.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff40;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>