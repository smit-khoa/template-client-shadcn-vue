<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Icon Component Demo</h1>

    <!-- Basic usage -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Basic Icons</h2>
      <div class="flex gap-4 items-center">
        <Icon name="arrow-down-01-sharp" />
        <Icon name="search" />
        <Icon name="file-add" />
        <Icon name="bug-01" />
        <Icon name="checkmark-square-02" />
      </div>
    </div>

    <!-- Different sizes -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Different Sizes</h2>
      <div class="flex gap-4 items-center">
        <Icon name="arrow-down-01-sharp" :size="16" />
        <Icon name="arrow-down-01-sharp" :size="20" />
        <Icon name="arrow-down-01-sharp" :size="24" />
        <Icon name="arrow-down-01-sharp" :size="32" />
        <Icon name="arrow-down-01-sharp" size="3rem" />
      </div>
      <p class="text-sm text-gray-500 mt-2">Sizes: 16px, 20px, 24px (default), 32px, 3rem</p>
    </div>

    <!-- Different colors -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Different Colors</h2>
      <div class="flex gap-4 items-center">
        <Icon name="file-add" color="#0069fe" />
        <Icon name="file-add" color="#22c55e" />
        <Icon name="file-add" color="#ef4444" />
        <Icon name="file-add" color="#f59e0b" />
        <Icon name="file-add" color="#8b5cf6" />
      </div>
      <p class="text-sm text-gray-500 mt-2">Using different color values</p>
    </div>

    <!-- Inherit color from parent -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Inherit Parent Color</h2>
      <div class="flex gap-4">
        <span class="text-blue-500 flex items-center gap-2">
          <Icon name="search" />
          Blue text
        </span>
        <span class="text-green-500 flex items-center gap-2">
          <Icon name="checkmark-square-02" />
          Green text
        </span>
        <span class="text-red-500 flex items-center gap-2">
          <Icon name="bug-01" />
          Red text
        </span>
      </div>
      <p class="text-sm text-gray-500 mt-2">Icons inherit color from parent text color</p>
    </div>

    <!-- With CSS classes -->
    <div>
      <h2 class="text-lg font-semibold mb-2">With CSS Classes</h2>
      <div class="flex gap-4 items-center">
        <Icon 
          name="arrow-down-01-sharp" 
          class="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer" 
        />
        <Icon 
          name="search" 
          class="animate-pulse text-purple-500" 
        />
        <Icon 
          name="file-add" 
          class="rotate-45 text-green-500" 
        />
        <Icon 
          name="bug-01" 
          class="hover:scale-125 transition-transform cursor-pointer" 
        />
      </div>
      <p class="text-sm text-gray-500 mt-2">Hover over icons to see effects</p>
    </div>

    <!-- In buttons -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Icons in Buttons</h2>
      <div class="flex gap-4 flex-wrap">
        <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Icon name="file-add" :size="16" />
          Add File
        </button>
        
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          <Icon name="search" :size="16" />
          Search
        </button>
        
        <button class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          <Icon name="bug-01" :size="16" />
          Report Bug
        </button>
        
        <button class="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <Icon name="arrow-down-01-sharp" :size="20" />
        </button>
      </div>
    </div>

    <!-- Loading states -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Animation Examples</h2>
      <div class="flex gap-4 items-center">
        <div class="flex items-center gap-2">
          <Icon name="search" class="animate-spin" />
          <span>Loading...</span>
        </div>
        
        <div class="flex items-center gap-2">
          <Icon name="arrow-down-01-sharp" class="animate-bounce" />
          <span>Scroll down</span>
        </div>
      </div>
    </div>

    <!-- Icons with Gradients -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Icons with Gradients (Inline Rendering)</h2>
      <div class="flex gap-4 items-center">
        <Icon name="book" :size="24" />
        <Icon name="book" :size="32" />
        <Icon name="book" :size="48" />
        <Icon name="book" :size="64" />
      </div>
      <p class="text-sm text-gray-500 mt-2">Book icon with linear gradients - rendered inline to preserve defs</p>
    </div>

    <!-- Icons with Gradients - Custom Colors -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Icons with Gradients - Custom Colors</h2>
      <div class="flex gap-4 items-center">
        <Icon name="book" :size="32" color="#0069fe" />
        <Icon name="book" :size="32" color="#22c55e" />
        <Icon name="book" :size="32" color="#ef4444" />
        <Icon name="book" :size="32" color="#f59e0b" />
        <Icon name="book" :size="32" color="#8b5cf6" />
      </div>
      <p class="text-sm text-gray-500 mt-2">Book icon with custom colors replacing white in gradients</p>
      
      <div class="flex gap-4 items-center mt-4">
        <Icon name="suitcase" :size="32" />
        <Icon name="suitcase" :size="32" color="#0069fe" />
        <Icon name="suitcase" :size="32" color="#ef4444" />
        <Icon name="megaphone-01" :size="32" />
        <Icon name="megaphone-01" :size="32" color="#0069fe" />
      </div>
      <p class="text-sm text-gray-500 mt-2">Other gradient icons with custom colors</p>
    </div>

    <!-- Icon grid showcase -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Available Icons</h2>
      <div class="grid grid-cols-8 gap-4 p-4 border rounded">
        <div v-for="icon in availableIcons" :key="icon" class="flex flex-col items-center gap-2 p-2 hover:bg-gray-50 rounded">
          <Icon :name="icon" :size="24" />
          <span class="text-xs text-gray-600 text-center break-all">{{ icon }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from './index';

// Sample of available icons - in real app this would come from the generated types
const availableIcons = [
  'arrow-down-01-sharp',
  'search',
  'file-add',
  'bug-01',
  'checkmark-square-02',
  'close',
  'book', // Icon with gradients
  'suitcase', // Icon with gradients
  'megaphone-01' // Icon with gradients
  // Add more icons as they become available in your sprite
];
</script>