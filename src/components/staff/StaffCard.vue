<template>
    <div class="bg-white border border-[#e8edf2] rounded-[8px] p-[20px] flex flex-col gap-[20px]">
        <!-- Avatar + Info -->
        <div class="flex items-center gap-[8px]">
            <img
                class="w-[40px] h-[40px] rounded-full object-cover shrink-0"
                :src="staff.avatar"
                :alt="staff.name"
                @error="onAvatarError" />
            <div class="flex flex-col gap-[4px]">
                <span class="text-[14px] font-semibold leading-[20px] text-[#000a2c]">
                    {{ staff.name }}
                </span>
                <div class="flex items-center gap-[6px]">
                    <span class="text-[13px] font-semibold leading-[16px] text-[#0069fe] whitespace-nowrap">
                        {{ staff.role }}
                    </span>
                    <span class="w-[4px] h-[4px] rounded-full bg-[#c5ced8] shrink-0" />
                    <span class="text-[13px] font-medium leading-[16px] text-[#7d91a6] whitespace-nowrap">
                        {{ staff.last_seen }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Fanpage icons -->
        <div class="flex items-center gap-[8px]">
            <div
                v-for="fp in visibleFanpages"
                :key="fp.id"
                class="relative w-[28px] h-[28px] shrink-0">
                <img
                    class="w-[28px] h-[28px] rounded-[4px] object-cover"
                    :src="fp.avatar"
                    :alt="fp.name" />
                <div class="absolute bottom-[-2px] right-[-2px] w-[16px] h-[16px] rounded-[4px] overflow-hidden bg-white">
                    <Icon :name="getBrandIconName(fp.platform)" :size="16" />
                </div>
            </div>
            <div
                v-if="extraCount > 0"
                class="w-[28px] h-[28px] rounded-[6px] bg-[#e8edf2] flex items-center justify-center shrink-0">
                <span class="text-[13px] font-semibold leading-[20px] text-[#000a2c]">+{{ extraCount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Icon } from "@/components/custom/icon"
import type { StaffMember, FanpageMember } from "@/pages/app/staff-mock-data"

const props = defineProps<{
    staff: StaffMember
}>()

const MAX_VISIBLE_FANPAGES = 4

const visibleFanpages = computed(() => props.staff.fanpages.slice(0, MAX_VISIBLE_FANPAGES))

const extraCount = computed(() => Math.max(0, props.staff.fanpages.length - MAX_VISIBLE_FANPAGES))

const getBrandIconName = (platform: FanpageMember["platform"]): string => {
    const icon_map: Record<FanpageMember["platform"], string> = {
        facebook: "facebook",
        zalo: "zalo",
        "zalo-oa": "zalo-oa",
        whatsapp: "whatsapp"
    }
    return icon_map[platform]
}

const onAvatarError = (e: Event) => {
    const img = e.target as HTMLImageElement
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.staff.name)}&size=40&background=33c4aa&color=fff`
}
</script>
