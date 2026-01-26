<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Checkbox & Radio Component Demo</h1>

    <!-- Checkbox Section -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Checkbox</h2>

      <!-- Basic Checkbox -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Basic Checkbox</h3>
        <div class="space-y-2">
          <Checkbox v-model="checkbox1" label="Option 1" />
          <Checkbox v-model="checkbox2" label="Option 2" />
          <Checkbox v-model="checkbox3" label="Option 3" />
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Selected:
          {{
            [
              checkbox1 && "Option 1",
              checkbox2 && "Option 2",
              checkbox3 && "Option 3",
            ]
              .filter(Boolean)
              .join(", ") || "None"
          }}
        </p>
      </div>

      <!-- Checkbox States -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Checkbox States</h3>
        <div class="space-y-2">
          <Checkbox :modelValue="false" label="Unchecked" />
          <Checkbox :modelValue="true" label="Checked" />
          <Checkbox
            :modelValue="false"
            :disabled="true"
            label="Disabled unchecked"
          />
          <Checkbox
            :modelValue="true"
            :disabled="true"
            label="Disabled checked"
          />
        </div>
      </div>

      <!-- Without Label -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Without Label</h3>
        <div class="flex gap-4">
          <Checkbox v-model="checkbox4" />
          <Checkbox v-model="checkbox5" />
          <Checkbox v-model="checkbox6" :disabled="true" />
        </div>
      </div>

      <!-- Checkbox with Array v-model -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Checkbox với Array (Multi-select)</h3>
        <div class="space-y-2">
          <Checkbox v-model="selectedFruits" value="apple" label="Táo" />
          <Checkbox v-model="selectedFruits" value="orange" label="Cam" />
          <Checkbox v-model="selectedFruits" value="banana" label="Chuối" />
          <Checkbox v-model="selectedFruits" value="grape" label="Nho" />
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Đã chọn: {{ selectedFruits.length ? selectedFruits.join(", ") : "Chưa chọn" }}
        </p>
      </div>

      <!-- Checkbox with Number Values -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Checkbox với Number Values</h3>
        <div class="space-y-2">
          <Checkbox v-model="selectedNumbers" :value="1" label="Số 1" />
          <Checkbox v-model="selectedNumbers" :value="2" label="Số 2" />
          <Checkbox v-model="selectedNumbers" :value="3" label="Số 3" />
          <Checkbox v-model="selectedNumbers" :value="4" label="Số 4" />
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Tổng: {{ selectedNumbers.reduce((sum, num) => sum + num, 0) }}
        </p>
      </div>
    </div>

    <!-- Radio Section -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Radio Button</h2>

      <!-- Basic Radio -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Basic Radio Group</h3>
        <div class="space-y-2">
          <Checkbox
            type="radio"
            v-model="radioValue1"
            value="option1"
            name="radio-group-1"
            label="Option 1"
          />
          <Checkbox
            type="radio"
            v-model="radioValue1"
            value="option2"
            name="radio-group-1"
            label="Option 2"
          />
          <Checkbox
            type="radio"
            v-model="radioValue1"
            value="option3"
            name="radio-group-1"
            label="Option 3"
          />
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Selected: {{ radioValue1 || "None" }}
        </p>
      </div>

      <!-- Radio States -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Radio States</h3>
        <div class="space-y-2">
          <Checkbox
            type="radio"
            :modelValue="false"
            label="Unselected"
            name="demo-radio-1"
          />
          <Checkbox
            type="radio"
            :modelValue="true"
            label="Selected"
            name="demo-radio-2"
          />
          <Checkbox
            type="radio"
            :modelValue="false"
            :disabled="true"
            label="Disabled unselected"
            name="demo-radio-3"
          />
          <Checkbox
            type="radio"
            :modelValue="true"
            :disabled="true"
            label="Disabled selected"
            name="demo-radio-4"
          />
        </div>
      </div>

      <!-- Multiple Radio Groups -->
      <div class="mb-6">
        <h3 class="text-sm font-medium mb-2">Multiple Radio Groups</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-medium mb-2">Group A</h4>
            <div class="space-y-2">
              <Checkbox
                type="radio"
                v-model="radioValueA"
                value="a1"
                name="radio-group-a"
                label="A1"
              />
              <Checkbox
                type="radio"
                v-model="radioValueA"
                value="a2"
                name="radio-group-a"
                label="A2"
              />
              <Checkbox
                type="radio"
                v-model="radioValueA"
                value="a3"
                name="radio-group-a"
                label="A3"
              />
            </div>
          </div>
          <div>
            <h4 class="text-xs font-medium mb-2">Group B</h4>
            <div class="space-y-2">
              <Checkbox
                type="radio"
                v-model="radioValueB"
                value="b1"
                name="radio-group-b"
                label="B1"
              />
              <Checkbox
                type="radio"
                v-model="radioValueB"
                value="b2"
                name="radio-group-b"
                label="B2"
              />
              <Checkbox
                type="radio"
                v-model="radioValueB"
                value="b3"
                name="radio-group-b"
                label="B3"
              />
            </div>
          </div>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          Group A: {{ radioValueA || "None" }}, Group B:
          {{ radioValueB || "None" }}
        </p>
      </div>
    </div>

    <!-- Form Example -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Form Example</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md">
        <div>
          <h3 class="text-sm font-medium mb-2">Select your preferences:</h3>
          <div class="space-y-2">
            <Checkbox
              v-model="form.newsletter"
              label="Subscribe to newsletter"
            />
            <Checkbox
              v-model="form.terms"
              label="I agree to the terms and conditions"
            />
            <Checkbox
              v-model="form.privacy"
              label="I accept the privacy policy"
            />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Choose your plan:</h3>
          <div class="space-y-2">
            <Checkbox
              type="radio"
              v-model="form.plan"
              value="basic"
              name="plan"
              label="Basic - Free"
            />
            <Checkbox
              type="radio"
              v-model="form.plan"
              value="pro"
              name="plan"
              label="Pro - $9/month"
            />
            <Checkbox
              type="radio"
              v-model="form.plan"
              value="enterprise"
              name="plan"
              label="Enterprise - $29/month"
            />
          </div>
        </div>

        <Button type="submit" :disabled="!form.terms || !form.privacy">
          Submit
        </Button>

        <div v-if="submitted" class="p-3 bg-green-100 text-green-700 rounded">
          Form submitted successfully!
          <pre class="text-xs mt-2">{{ JSON.stringify(form, null, 2) }}</pre>
        </div>
      </form>
    </div>

    <!-- Interactive Demo -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Interactive Demo</h2>
      <div class="space-y-4">
        <div class="flex gap-4">
          <Button @click="toggleAll">Toggle All Checkboxes</Button>
          <Button @click="disableAll" variant="secondary">
            {{ allDisabled ? "Enable" : "Disable" }} All
          </Button>
          <Button @click="resetAll" variant="noborder">Reset</Button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-medium mb-2">Interactive Checkboxes</h3>
            <div class="space-y-2">
              <Checkbox
                v-model="interactive.check1"
                :disabled="allDisabled"
                label="Checkbox 1"
              />
              <Checkbox
                v-model="interactive.check2"
                :disabled="allDisabled"
                label="Checkbox 2"
              />
              <Checkbox
                v-model="interactive.check3"
                :disabled="allDisabled"
                label="Checkbox 3"
              />
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium mb-2">Interactive Radio</h3>
            <div class="space-y-2">
              <Checkbox
                type="radio"
                v-model="interactive.radio"
                value="radio1"
                name="interactive-radio"
                :disabled="allDisabled"
                label="Radio 1"
              />
              <Checkbox
                type="radio"
                v-model="interactive.radio"
                value="radio2"
                name="interactive-radio"
                :disabled="allDisabled"
                label="Radio 2"
              />
              <Checkbox
                type="radio"
                v-model="interactive.radio"
                value="radio3"
                name="interactive-radio"
                :disabled="allDisabled"
                label="Radio 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "./index";
import { Button } from "../button/index";

// Basic checkbox states
const checkbox1 = ref(false);
const checkbox2 = ref(true);
const checkbox3 = ref(false);
const checkbox4 = ref(false);
const checkbox5 = ref(true);
const checkbox6 = ref(false);

// Array checkbox states
const selectedFruits = ref<string[]>(["apple", "banana"]);
const selectedNumbers = ref<number[]>([1, 3]);

// Radio states
const radioValue1 = ref("option1");
const radioValueA = ref("a2");
const radioValueB = ref("");

// Form data
const form = ref({
  newsletter: false,
  terms: false,
  privacy: false,
  plan: "basic",
});

const submitted = ref(false);

// Interactive demo
const allDisabled = ref(false);
const interactive = ref({
  check1: false,
  check2: false,
  check3: false,
  radio: "",
});

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
};

const toggleAll = () => {
  const allChecked =
    interactive.value.check1 &&
    interactive.value.check2 &&
    interactive.value.check3;
  interactive.value.check1 = !allChecked;
  interactive.value.check2 = !allChecked;
  interactive.value.check3 = !allChecked;
};

const disableAll = () => {
  allDisabled.value = !allDisabled.value;
};

const resetAll = () => {
  interactive.value = {
    check1: false,
    check2: false,
    check3: false,
    radio: "",
  };
  allDisabled.value = false;
};
</script>
