<template>
    <AlertDialog v-model:open="isOpen">
        <AlertDialogContent
            class="flex flex-col gap-6 items-center justify-end overflow-hidden rounded-2xl pt-8 pb-6 px-6"
            :style="{ width: contentWidth }">
            <!-- Illustration -->
            <img v-if="image" :src="image" alt="" class="h-[120px] w-auto object-contain" />

            <!-- Content -->
            <AlertDialogHeader class="flex flex-col gap-1.5 items-center text-center w-full">
                <AlertDialogTitle class="text-lg font-bold text-[#1a2229] leading-7">
                    {{ title }}
                </AlertDialogTitle>
                <AlertDialogDescription v-if="content" class="text-sm font-medium text-[#7d91a6] leading-5">
                    {{ content }}
                </AlertDialogDescription>
                <slot name="content" />
            </AlertDialogHeader>

            <!-- Buttons -->
            <AlertDialogFooter class="w-full">
                <slot name="footer">
                    <div class="flex items-center gap-2 w-full">
                        <Button variant="secondary" class="w-full" @click="cancelConfirm">Hủy</Button>
                        <Button variant="primary" class="w-full" :loading="loading" @click="handleConfirm"
                            >Xác nhận</Button
                        >
                    </div>
                </slot>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "../button"

import { computed } from "vue"

interface ConfirmProps {
    modelValue: boolean
    title?: string
    content?: string
    width?: string | number
    image?: string
    loading?: boolean
}

const props = withDefaults(defineProps<ConfirmProps>(), {
    title: "Thông báo",
    width: 400,
    image: "",
    loading: false
})

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "confirm"): void
}>()

const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value)
})

const contentWidth = computed(() => {
    if (typeof props.width === "number") {
        return `${props.width}px`
    }
    return props.width || "fit-content"
})

const handleConfirm = () => {
    emit("confirm")
}

const cancelConfirm = () => {
    if (props.loading) return
    isOpen.value = false
}
</script>
