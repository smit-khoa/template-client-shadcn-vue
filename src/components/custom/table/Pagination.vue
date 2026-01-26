<template>
    <div id="scron_dropdown" class="pagination">
        <div class="pagination-left">
            <span class="pagination-desc">Hiển thị:</span>
            <!-- <Dropdown :on-open="handleDropdownOpen" :on-close="handleDropdownClose">
                <template #dropdown-header>
                    <div class="dropdown flex-align gap-4">
                        <div>{{ paging.limit }}</div>
                        <img
                            style="transition: all 0.2s linear"
                            :style="{ transform: isDropdownOpen ? 'rotate(90deg)' : 'rotate(180deg)' }"
                            src="../../assets/images/table/icon-arrow_left.svg"
                            alt="" />
                    </div>
                </template>
                <template #dropdown-body="{ close }">
                    <div @click="changeLimit(item.value, close)" v-for="item in displayPage" :key="item.value" class="dropdown_item" :class="{ active: item.value == paging.limit }">
                        {{ item.label }}
                    </div>
                </template>
            </Dropdown> -->

            <span class="pagination-desc">mỗi trang</span>
        </div>

        <div class="pagination-right">
            <span class="pagination-desc">{{
                `${paging.total ? paging.limit * (paging.page - 1) + 1 : 0}-${paging.limit * paging.page} / ${
                    paging.total ? paging.total.toLocaleString() : 0
                } ${paginationText}`
            }}</span>
            <div class="pagination-horizontal">
                <a
                    href="#"
                    class="pagination-box flex-center"
                    @click="changePage($event, paging.page - 1, 'pre')"
                    :class="paging.page === 1 ? 'pagination-disable' : ''">
                    <div class="pagination-icon pagination-pre"></div>
                </a>

                <a
                    href="#"
                    class="pagination-box flex-center"
                    @click="changePage($event, paging.page + 1, 'next')"
                    :class="paging.has_next_page ? '' : 'pagination-disable'">
                    <div class="pagination-icon pagination-next"></div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref } from "vue"
// import Dropdown from "./Dropdown.vue";

// Props
const props = defineProps({
    paging: {
        type: Object,
        default: () => ({
            page: 1,
            limit: 25,
            total: 0,
            has_next_page: false
        })
    },
    paginationText: {
        type: String,
        default: ""
    }
})

// Emits
const emit = defineEmits(["changePage"])

// Reactive data
// const isDropdownOpen = ref(false)

// const displayPage = ref([
//     { label: "15", value: 15 },
//     { label: "25", value: 25 },
//     { label: "50", value: 50 },
//     { label: "100", value: 100 },
//     { label: "200", value: 200 },
//     { label: "500", value: 500 }
// ])

// // Methods
// const handleDropdownOpen = () => {
//     isDropdownOpen.value = true
// }

// const handleDropdownClose = () => {
//     isDropdownOpen.value = false
// }

const changePage = (e: Event, page: number, isNext: string) => {
    e.preventDefault()
    if (isNext === "next" && !props.paging.has_next_page) return
    if (isNext === "pre" && props.paging.page === 1) return

    props.paging.page = page
    emit("changePage", props.paging.page, props.paging.limit)
}

// const changeLimit = (limit: number, closeDropdown: () => void) => {
//     if (props.paging.limit === limit) {
//         closeDropdown()
//         return
//     }

//     props.paging.page = 1
//     props.paging.limit = limit
//     emit("changePage", props.paging.page, props.paging.limit)
//     closeDropdown()
// }
</script>

<style lang="scss" scoped>
$url: "../../assets/images/table/";

.icon-next {
    width: 16px;
    height: 16px;
    -webkit-mask-size: 100%;
    mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    background: #1f2937;
}
.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
    height: 44px;
    border-top: 1px solid #e5e7eb;
    &-left {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    &-right {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    &-horizontal {
        display: flex;
        align-items: center;
    }
    &-desc {
        color: #718096;
        font-size: 14px;
        line-height: 20px;
    }
    &-horizontal,
    &-list {
        display: flex;
        align-items: center;
        // gap: 0px;
    }
    &-list {
        a {
            width: 24px;
            height: 20px;
            color: #718096;
            font-family: "InterTight", sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-decoration: none;
        }
    }
    &-icon {
        @extend .icon-next;
        transition: all 0.2s linear;
        &:hover {
            background: #007fff;
        }
    }

    &-box {
        // width: 32px;
        // height: 32px;
        border-radius: 999px;
        transition: all 0.2s linear;
        &:hover {
            background: #e5f2ff;
        }
    }
    &-pre {
        margin-right: 2px;
        // mask-image: url($url + "icon-arrow_left.svg");
        // -webkit-mask-image: url($url + "icon-arrow_left.svg");
    }
    &-next {
        margin-left: 2px;
        // mask-image: url($url + "icon-arrow_right.svg");
        // -webkit-mask-image: url($url + "icon-arrow_right.svg");
    }
    &-disable {
        user-select: none;
        cursor: not-allowed;
        .pagination-icon {
            background: grey;
        }
        &:hover {
            background: none !important;
        }
    }
}
.dropdown {
    display: flex;
    &_item {
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 5px;
        cursor: pointer;
        &:hover {
            background: #e5f2ff;
        }
        &:last-child {
            margin-bottom: 0px;
        }
        &.active {
            background: #e5f2ff;
        }
    }
}
</style>
