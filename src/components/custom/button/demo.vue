<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Button Component Demo</h1>

    <!-- Variants -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Button Variants</h2>
      <div class="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="noborder">No Border</Button>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Button Sizes</h2>
      <div class="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>

    <!-- With Icons -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Buttons with Icons</h2>
      <div class="flex flex-wrap gap-4">
        <Button icon="add">Thêm tài sản</Button>
        <Button variant="secondary" icon="tag">Button</Button>
        <Button variant="noborder" icon="add">Button</Button>
      </div>
    </div>

    <!-- States -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Button States</h2>

      <!-- Default state -->
      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">Default</h3>
        <div class="flex gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="noborder">No Border</Button>
        </div>
      </div>

      <!-- Hover state (visual only) -->
      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">Hover (hover over buttons)</h3>
        <div class="flex gap-4">
          <Button>Primary Hover</Button>
          <Button variant="secondary">Secondary Hover</Button>
          <Button variant="noborder">No Border Hover</Button>
        </div>
      </div>

      <!-- Disabled state -->
      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">Disabled</h3>
        <div class="flex gap-4">
          <Button :disabled="true">Disabled Primary</Button>
          <Button variant="secondary" :disabled="true"
            >Disabled Secondary</Button
          >
          <Button variant="noborder" :disabled="true"
            >Disabled No Border</Button
          >
        </div>
      </div>

      <!-- Loading state -->
      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">Loading</h3>
        <div class="flex gap-4">
          <Button :loading="true">Loading...</Button>
          <Button variant="secondary" :loading="true">Processing</Button>
          <Button variant="noborder" :loading="true">Please wait</Button>
        </div>
      </div>
    </div>

    <!-- Width variations -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Width Variations</h2>
      <div class="max-w-md space-y-2">
        <Button class="w-full">Full Width Primary</Button>
        <Button variant="secondary" class="w-full">Full Width Secondary</Button>
        <Button variant="noborder" class="w-full">Full Width No Border</Button>
      </div>
    </div>

    <!-- Interactive demo -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Interactive Demo</h2>
      <div class="flex gap-4">
        <Button @click="handleClick" :loading="isLoading">
          {{ isLoading ? "Loading..." : "Click me (3s)" }}
        </Button>
        <Button variant="secondary" @click="toggleDisabled">
          {{ isDisabled ? "Enable" : "Disable" }} other buttons
        </Button>
      </div>
      <div class="mt-4 flex gap-4">
        <Button :disabled="isDisabled">Primary</Button>
        <Button variant="secondary" :disabled="isDisabled">Secondary</Button>
        <Button variant="noborder" :disabled="isDisabled">No Border</Button>
      </div>
    </div>

    <!-- Form example -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Form Example</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          type="text"
          placeholder="Enter some text"
          class="px-3 py-2 border rounded"
          v-model="formText"
        />
        <div class="flex gap-4">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="secondary">Reset</Button>
          <Button type="button" variant="noborder" @click="formText = ''"
            >Clear</Button
          >
        </div>
        <p v-if="submitted" class="text-green-600">
          Form submitted with: {{ formText }}
        </p>
      </form>
    </div>

    <!-- All combinations -->
    <div>
      <h2 class="text-lg font-semibold mb-2">All Combinations</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Variant</th>
              <th class="px-4 py-2">Default</th>
              <th class="px-4 py-2">With Icon</th>
              <th class="px-4 py-2">Disabled</th>
              <th class="px-4 py-2">Loading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 font-medium">Primary</td>
              <td class="px-4 py-2"><Button size="sm">Button</Button></td>
              <td class="px-4 py-2">
                <Button size="sm" icon="add">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button size="sm" :disabled="true">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button size="sm" :loading="true">Button</Button>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Secondary</td>
              <td class="px-4 py-2">
                <Button variant="secondary" size="sm">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button variant="secondary" size="sm" icon="tag">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button variant="secondary" size="sm" :disabled="true"
                  >Button</Button
                >
              </td>
              <td class="px-4 py-2">
                <Button variant="secondary" size="sm" :loading="true"
                  >Button</Button
                >
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">No Border</td>
              <td class="px-4 py-2">
                <Button variant="noborder" size="sm">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button variant="noborder" size="sm" icon="add">Button</Button>
              </td>
              <td class="px-4 py-2">
                <Button variant="noborder" size="sm" :disabled="true"
                  >Button</Button
                >
              </td>
              <td class="px-4 py-2">
                <Button variant="noborder" size="sm" :loading="true"
                  >Button</Button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "./index";

const isLoading = ref(false);
const isDisabled = ref(false);
const formText = ref("");
const submitted = ref(false);

const handleClick = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
};

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
};
</script>
