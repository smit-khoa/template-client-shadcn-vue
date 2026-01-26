<template>
    <Drawer v-model="isOpenDrawer" width="600px">
        <template #header>
            <div class="fs-18 fw-600">Chọn theo danh sách tkqc</div>
        </template>
        <template #content>
            <div class="flex flex-col gap-[16px] h-full overflow-hidden">
                <Search />
                <div class="flex flex-col flex-1 gap-[12px] overflow-y-auto">
                    <CheckboxBlock 
                        v-for="item in 100" 
                        :key="item"
                        v-model="selectedItems"
                        :label="`3475934578943`"
                        :value="`3475934578943-${item}`" 
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center gap-[8px] justify-end">
                <Button @click="isOpenDrawer = false" variant="secondary">Hủy chọn</Button>
                <Button @click="handleSave" variant="primary">Xác nhận</Button>
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">
import { Drawer } from "../custom/drawer"
import { computed } from "vue"
import { ref } from "vue"
import { CheckboxBlock } from "../custom/checkbox"
import { Search } from "../custom/search"
import { Button } from "../custom/button"

const props = defineProps<{
    modelValue?: boolean
}>()

const emit = defineEmits<{
    "update:modelValue": [value: boolean]
}>()

const selectedItems = ref<string[]>([])

const isOpenDrawer = computed({
    get() {
        return props.modelValue ?? false
    },
    set(value: boolean) {
        emit("update:modelValue", value)
    }
})

const handleSave = () => {
    console.log('Selected items:', selectedItems.value)
    // Logic xử lý save assets ở đây
    isOpenDrawer.value = false
}
</script>
