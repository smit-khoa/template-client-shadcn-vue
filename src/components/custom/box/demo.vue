<template>
    <div class="p-8 space-y-8">
        <h1 class="text-2xl font-bold mb-4">Box Component Demo</h1>

        <!-- Basic States -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Basic States</h2>
            <div class="space-y-3 max-w-lg">
                <Box> Thay đổi trạng thái tài khoản quảng cáo (Default) </Box>

                <Box state="selected"> Thay đổi trạng thái tài khoản quảng cáo (Selected) </Box>

                <Box state="disabled"> Thay đổi trạng thái tài khoản quảng cáo (Disabled) </Box>
            </div>
        </div>

        <!-- Interactive Example -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Interactive Example</h2>
            <p class="text-sm text-gray-600 mb-3">Click to select boxes.</p>
            <div class="space-y-3 max-w-lg">
                <Box
                    v-for="(item, index) in interactiveItems"
                    :key="index"
                    :state="selectedIndex === index ? 'selected' : 'default'"
                    @click="selectedIndex = index">
                    {{ item }}
                </Box>
            </div>
            <p class="mt-3 text-sm text-gray-600">
                Selected:
                {{ selectedIndex !== null ? interactiveItems[selectedIndex] : "None" }}
            </p>
        </div>

        <!-- Box with Icons -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Box with Icons</h2>
            <div class="space-y-3 max-w-lg">
                <Box>
                    <div class="flex items-center gap-2">
                        <Icon name="book" size="20" />
                        <span>Box with icon - Default</span>
                    </div>
                </Box>

                <Box state="selected">
                    <div class="flex items-center gap-2">
                        <Icon name="book" size="20" />
                        <span>Box with icon - Selected</span>
                    </div>
                </Box>

                <Box state="disabled">
                    <div class="flex items-center gap-2">
                        <Icon name="book" size="20" />
                        <span>Box with icon - Disabled</span>
                    </div>
                </Box>
            </div>
        </div>

        <!-- Custom Content -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Custom Content</h2>
            <div class="space-y-3 max-w-lg">
                <Box>
                    <div class="flex items-center gap-2">
                        <span class="text-green-600">✓</span>
                        <span>Custom content with icon</span>
                    </div>
                </Box>

                <Box state="selected">
                    <div class="flex justify-between items-center">
                        <span>Left aligned text</span>
                        <span class="text-sm text-gray-500">Right text</span>
                    </div>
                </Box>

                <Box>
                    <div>
                        <p class="font-semibold">Title Text</p>
                        <p class="text-sm text-gray-600">Subtitle or description text</p>
                    </div>
                </Box>
            </div>
        </div>

        <!-- List Example -->
        <div>
            <h2 class="text-lg font-semibold mb-4">List Example</h2>
            <div class="space-y-3 max-w-lg">
                <h3 class="text-sm font-medium mb-2">Select an option:</h3>
                <Box
                    v-for="(option, index) in listOptions"
                    :key="index"
                    :state="listSelected === option.value ? 'selected' : option.disabled ? 'disabled' : 'default'"
                    @click="!option.disabled && (listSelected = option.value)">
                    {{ option.label }}
                </Box>
            </div>
            <p class="mt-3 text-sm text-gray-600">Selected value: {{ listSelected }}</p>
        </div>

        <!-- Toggle Example -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Toggle Example</h2>
            <div class="flex gap-4 mb-4">
                <Button @click="toggleDisabled" variant="secondary">
                    {{ allDisabled ? "Enable All" : "Disable All" }}
                </Button>
                <Button @click="resetSelection" variant="noborder"> Reset Selection </Button>
            </div>
            <div class="space-y-3 max-w-lg">
                <Box
                    v-for="(_, index) in toggleItems"
                    :key="index"
                    :state="allDisabled ? 'disabled' : toggleSelected.includes(index) ? 'selected' : 'default'"
                    @click="!allDisabled && handleToggle(index)">
                    Toggle Option {{ index + 1 }}
                </Box>
            </div>
            <p class="mt-3 text-sm text-gray-600">
                Selected indices:
                {{ toggleSelected.length > 0 ? toggleSelected.join(", ") : "None" }}
            </p>
        </div>

        <!-- Custom Styling -->
        <div>
            <h2 class="text-lg font-semibold mb-4">Custom Styling</h2>
            <div class="space-y-3">
                <Box class="max-w-xs"> Narrow width box </Box>

                <Box class="max-w-2xl">
                    Wide box with more content space for longer text that might wrap to multiple lines
                </Box>

                <Box class="shadow-lg"> Box with shadow </Box>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Box } from "./index"
import { Button } from "../button/index"
import { Icon } from "@/components/custom/icon"

// Interactive example
const selectedIndex = ref<number | null>(null)
const interactiveItems = [
    "Option 1 - Click to select",
    "Option 2 - Click to select",
    "Option 3 - Click to select",
    "Option 4 - Click to select"
]

// List example
const listSelected = ref("option2")
const listOptions = [
    { label: "Basic Plan - Free", value: "basic" },
    { label: "Pro Plan - $9/month", value: "pro" },
    { label: "Enterprise Plan - $29/month", value: "enterprise" },
    { label: "Custom Plan (Coming Soon)", value: "custom", disabled: true }
]

// Toggle example
const allDisabled = ref(false)
const toggleSelected = ref<number[]>([1])
const toggleItems = ["Item 1", "Item 2", "Item 3", "Item 4"]

const handleToggle = (index: number) => {
    const currentIndex = toggleSelected.value.indexOf(index)
    if (currentIndex > -1) {
        toggleSelected.value.splice(currentIndex, 1)
    } else {
        toggleSelected.value.push(index)
    }
}

const toggleDisabled = () => {
    allDisabled.value = !allDisabled.value
}

const resetSelection = () => {
    toggleSelected.value = []
    selectedIndex.value = null
    listSelected.value = "option2"
}
</script>
