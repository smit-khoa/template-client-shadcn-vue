<template>
    <div class="w-full h-full flex flex-col">
        <div class="table-header flex justify-between items-start gap-[12px]">
            <div class="table-header-left w-[68px] h-[58px] min-w-[68px] bg-white flex justify-center items-center rounded-tl-[16px] rounded-tr-[16px]">
                <slot name="left" />
            </div>
            <Tabs :tabs="tabs" v-model="tab" />
            <div class="table-header-right w-[60px] h-[58px] max-h-[58px] p-[20px] bg-white flex justify-end items-center flex-1 rounded-tl-[16px] rounded-tr-[16px] relative">
                <slot name="right" />
            </div>
        </div>
        <div class="table-body flex-1 bg-white h-full relative w-full overflow-hidden">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// import
import { ref, watch } from "vue";
import { Tabs } from "../tabs";

// props
const props = defineProps<{
    tabs: [];
    tabSelected: string;
}>();

// data
const tab = ref(props.tabSelected || "campaign");

// emit
const emit = defineEmits(["change-tab"]);

// watch
watch(
    () => props.tabSelected,
    () => {
        tab.value = props.tabSelected;
    }
);

watch(
    () => tab.value,
    () => {
        emit("change-tab", tab.value);
    }
);
</script>

<style scoped lang="scss">
.table {
    &-header {
        &-left {
            position: relative;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: -24px;
                width: 24px;
                height: 24px;
                background: transparent;
                border-top-left-radius: 24px;
                box-shadow: -10px -10px 0 10px #fff;
                transform: rotate(-90deg);
            }
        }

        &-right {
            position: relative;

            &::after {
                content: "";
                position: absolute;
                left: -24px;
                bottom: 0;
                width: 24px;
                height: 24px;
                background: transparent;
                border-top-left-radius: 24px;
                box-shadow: -10px -10px 0 10px #fff;
                transform: rotate(-180deg);
            }
        }
    }

    &-body {
        height: calc(100% - 60px);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
}
</style>
