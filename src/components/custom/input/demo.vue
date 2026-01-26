<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8">
    <h1 class="text-2xl font-bold mb-6">Input Component Demo</h1>

    <!-- Basic States -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Các trạng thái Input</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Default</label>
          <Input
            v-model="defaultValue"
            placeholder="Nhập thông tin"
            class="font-['Inter']"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ defaultValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Hover (di chuột vào input)</label
          >
          <Input v-model="hoverValue" placeholder="Di chuột vào đây" />
          <p class="mt-1 text-sm text-gray-600">Value: {{ hoverValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Focus (click vào input)</label
          >
          <Input v-model="focusValue" placeholder="Click vào đây" />
          <p class="mt-1 text-sm text-gray-600">Value: {{ focusValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Typing (nhập text và cursor sẽ hiển thị)</label
          >
          <Input v-model="typingValue" placeholder="Nhập text để thấy cursor" />
          <p class="mt-1 text-sm text-gray-600">Value: {{ typingValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Disabled</label>
          <Input
            v-model="disabledValue"
            :disabled="true"
            placeholder="Input bị vô hiệu hóa"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ disabledValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Active (có nội dung)</label
          >
          <Input v-model="activeValue" placeholder="Input có nội dung" />
          <p class="mt-1 text-sm text-gray-600">Value: {{ activeValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Error State</label>
          <Input
            v-model="errorValue"
            :error="true"
            errorMessage="Trường này là bắt buộc"
            placeholder="Input có lỗi"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ errorValue }}</p>
        </div>
      </div>
    </section>

    <!-- Different Types -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Các loại Input</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Text Input</label>
          <Input v-model="textValue" type="text" placeholder="Nhập văn bản" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email Input</label>
          <Input
            v-model="emailValue"
            type="email"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password Input</label>
          <Input
            v-model="passwordValue"
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Number Input</label>
          <Input v-model="numberValue" type="number" placeholder="Nhập số" />
        </div>
      </div>
    </section>

    <!-- Input với Suffix -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Input với Suffix</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Nhập tuổi</label>
          <Input 
            v-model="ageValue" 
            type="number" 
            suffix="tuổi"
            placeholder="0" 
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ ageValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Chiều cao</label>
          <Input 
            v-model="heightValue" 
            type="number" 
            suffix="cm"
            placeholder="0" 
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ heightValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Cân nặng</label>
          <Input 
            v-model="weightValue" 
            type="number" 
            suffix="kg"
            placeholder="0" 
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ weightValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Phần trăm</label>
          <Input 
            v-model="percentValue" 
            type="number" 
            suffix="%"
            placeholder="0" 
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ percentValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Suffix với Error</label>
          <Input 
            v-model="suffixErrorValue" 
            type="number" 
            suffix="người"
            :error="true"
            errorMessage="Số lượng phải lớn hơn 0"
            placeholder="0" 
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ suffixErrorValue }}</p>
        </div>
      </div>
    </section>

    <!-- Currency Input -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Currency Input</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">VND Currency</label>
          <Input
            v-model="vndValue"
            type="currency"
            currency="VND"
            placeholder="0"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ vndValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">USD Currency</label>
          <Input
            v-model="usdValue"
            type="currency"
            currency="USD"
            locale="en-US"
            placeholder="0"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ usdValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">EUR Currency</label>
          <Input
            v-model="eurValue"
            type="currency"
            currency="EUR"
            locale="de-DE"
            placeholder="0"
          />
          <p class="mt-1 text-sm text-gray-600">Value: {{ eurValue }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Currency với Error</label
          >
          <Input
            v-model="errorCurrency"
            type="currency"
            currency="VND"
            :error="true"
            errorMessage="Số tiền vượt quá giới hạn cho phép"
            placeholder="0"
          />
        </div>
      </div>
    </section>

    <!-- With Messages -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Input với Message</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Với hướng dẫn</label>
          <Input
            v-model="messageValue"
            placeholder="Nhập họ và tên"
            message="Vui lòng nhập đầy đủ họ và tên"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Với thông báo dài</label
          >
          <Input
            v-model="longMessageValue"
            placeholder="Nhập địa chỉ"
            message="Địa chỉ phải bao gồm số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Với lỗi validation</label
          >
          <Input
            v-model="validationValue"
            placeholder="Nhập email"
            :error="!isValidEmail"
            :errorMessage="!isValidEmail ? 'Email không đúng định dạng' : ''"
          />
        </div>
      </div>
    </section>

    <!-- Readonly -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Readonly Input</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2"
            >Readonly với giá trị</label
          >
          <Input
            v-model="readonlyValue"
            :readonly="true"
            placeholder="Readonly input"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Readonly không có giá trị</label
          >
          <Input
            v-model="emptyReadonly"
            :readonly="true"
            placeholder="Không thể chỉnh sửa"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Readonly Currency</label
          >
          <Input
            v-model="readonlyCurrency"
            type="currency"
            currency="VND"
            :readonly="true"
            placeholder="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Readonly với Suffix</label
          >
          <Input
            v-model="readonlySuffix"
            suffix="năm"
            :readonly="true"
            placeholder="0"
          />
        </div>
      </div>
    </section>

    <!-- Combined States -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Combined Examples</h2>
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium mb-2"
            >Disabled Currency</label
          >
          <Input
            v-model="disabledCurrency"
            type="currency"
            currency="VND"
            :disabled="true"
            placeholder="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Currency với Message</label
          >
          <Input
            v-model="messageCurrency"
            type="currency"
            currency="VND"
            message="Nhập số tiền cần thanh toán"
            placeholder="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Number với Error</label>
          <Input
            v-model="errorNumber"
            type="number"
            :error="true"
            errorMessage="Chỉ được nhập số"
            placeholder="Nhập số"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Disabled với Suffix</label>
          <Input
            v-model="disabledSuffix"
            suffix="điểm"
            :disabled="true"
            placeholder="0"
          />
        </div>
      </div>
    </section>

    <!-- Interactive Example -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Interactive Example</h2>
      <p class="text-sm text-gray-600">
        Thử các tương tác khác nhau với input bên dưới
      </p>

      <div class="space-y-4">
        <div class="flex gap-2">
          <Button @click="toggleDisabled" variant="secondary">
            {{ isDisabled ? "Enable" : "Disable" }} Input
          </Button>
          <Button @click="toggleReadonly" variant="secondary">
            {{ isReadonly ? "Editable" : "Readonly" }} Input
          </Button>
          <Button @click="toggleError" variant="secondary">
            {{ hasError ? "Remove" : "Add" }} Error
          </Button>
          <Button @click="clearValue" variant="noborder"> Clear Value </Button>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Interactive Input</label
          >
          <Input
            v-model="interactiveValue"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :error="hasError"
            :errorMessage="hasError ? 'Đây là thông báo lỗi' : ''"
            placeholder="Thử tương tác với input này"
            :message="!hasError ? interactiveMessage : ''"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Interactive Currency</label
          >
          <Input
            v-model="interactiveCurrency"
            type="currency"
            currency="VND"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :error="hasError"
            :errorMessage="hasError ? 'Số tiền không hợp lệ' : ''"
            placeholder="0"
            :message="!hasError ? 'Nhập số tiền' : ''"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2"
            >Interactive với Suffix</label
          >
          <Input
            v-model="interactiveSuffix"
            suffix="giờ"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :error="hasError"
            :errorMessage="hasError ? 'Số giờ không hợp lệ' : ''"
            placeholder="0"
            :message="!hasError ? 'Nhập số giờ' : ''"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Input } from "./index";
import { Button } from "../button/index";

// Basic states
const defaultValue = ref("");
const hoverValue = ref("");
const focusValue = ref("");
const typingValue = ref("");
const disabledValue = ref("Nội dung bị vô hiệu hóa");
const activeValue = ref("Input đã có nội dung");
const errorValue = ref("");

// Different types
const textValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const numberValue = ref<string | number>("");

// Input với suffix
const ageValue = ref<string | number>(25);
const heightValue = ref<string | number>(170);
const weightValue = ref<string | number>(65);
const percentValue = ref<string | number>(80);
const suffixErrorValue = ref<string | number>(0);

// Currency values
const vndValue = ref<number | string>(1000000);
const usdValue = ref<number | string>(100);
const eurValue = ref<number | string>(50);
const errorCurrency = ref<number | string>(0);
const disabledCurrency = ref<number | string>(500000);
const readonlyCurrency = ref<number | string>(750000);
const messageCurrency = ref<number | string>(0);

// With messages
const messageValue = ref("");
const longMessageValue = ref("");
const validationValue = ref("");
const errorNumber = ref<string | number>("");

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !validationValue.value || emailRegex.test(validationValue.value);
});

// Readonly
const readonlyValue = ref("Giá trị chỉ đọc");
const emptyReadonly = ref("");
const readonlySuffix = ref<string | number>(2023);

// Combined states
const disabledSuffix = ref<string | number>(100);

// Interactive
const isDisabled = ref(false);
const isReadonly = ref(false);
const hasError = ref(false);
const interactiveValue = ref("Nội dung có thể tương tác");
const interactiveCurrency = ref<number | string>(2000000);
const interactiveSuffix = ref<string | number>(8);

const interactiveMessage = computed(() => {
  if (isDisabled.value) return "Input đang bị vô hiệu hóa";
  if (isReadonly.value) return "Input đang ở chế độ chỉ đọc";
  if (!interactiveValue.value) return "Vui lòng nhập nội dung";
  return `Độ dài: ${interactiveValue.value.length} ký tự`;
});

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

const toggleReadonly = () => {
  isReadonly.value = !isReadonly.value;
};

const toggleError = () => {
  hasError.value = !hasError.value;
};

const clearValue = () => {
  interactiveValue.value = "";
  interactiveCurrency.value = 0;
  interactiveSuffix.value = 0;
};
</script>