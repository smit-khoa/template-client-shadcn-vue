<template>
    <div class="relative flex items-center gap-4 p-5 w-full min-h-screen bg-white overflow-hidden">
        <!-- Decorative: Ellipse bottom-center-left -->
        <div
            class="absolute bottom-[-100px] left-[calc(50%-400px)] -translate-x-1/2 w-[450px] h-[225px] flex items-center justify-center pointer-events-none z-0">
            <div class="-rotate-90 scale-y-[-1]">
                <img :src="IMG_ELLIPSE_5" class="w-[450px] h-[225px] object-contain" alt="" />
            </div>
        </div>

        <!-- Decorative: Ellipse mid-left -->
        <div
            class="absolute left-0 top-1/2 -translate-y-1/2 w-[209px] h-[418px] flex items-center justify-center pointer-events-none z-0">
            <div class="scale-y-[-1] rotate-180">
                <img :src="IMG_ELLIPSE_4" class="w-[209px] h-[418px] object-contain" alt="" />
            </div>
        </div>

        <!-- Decorative: Union shape top -->
        <div
            class="absolute left-[213px] top-[-111px] w-[598px] h-[598px] flex items-center justify-center pointer-events-none z-0">
            <div class="-rotate-45 scale-y-[-1]">
                <img :src="IMG_UNION" class="w-[423px] h-[423px] object-contain" alt="" />
            </div>
        </div>

        <!-- Glass Panel (LEFT) -->
        <div
            class="relative flex-1 h-[920px] rounded-2xl overflow-hidden flex items-center justify-center px-[100px] shadow-[0px_24px_40px_0px_rgba(0,0,0,0.03)] z-10">
            <!-- Glass background -->
            <div
                class="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-b from-white to-white/10" />
            <div
                class="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0px_8px_32px_0px_rgba(255,255,255,0.18)]" />

            <!-- Form content -->
            <div class="relative w-full flex flex-col gap-4">
                <!-- Logo -->
                <div class="flex justify-center">
                    <img :src="IMG_SMIT_CHAT" class="h-8 w-auto object-contain" alt="SMIT Chat" />
                </div>

                <!-- Title + login link -->
                <div class="flex flex-col gap-6 items-center w-full">
                    <div class="flex flex-col gap-3 items-center w-full">
                        <h1 class="text-[24px] font-bold leading-8 text-[#1a2229] text-center w-full">
                            Đăng ký tài khoản SMIT Chat!
                        </h1>
                        <div class="flex gap-2 items-start justify-center w-full">
                            <span class="flex-1 text-[14px] font-medium leading-5 text-[#495366] text-right">
                                Bạn đã có tài khoản?
                            </span>
                            <router-link
                                to="/login"
                                class="flex-1 text-[14px] font-semibold leading-5 text-[#0069fe] text-left">
                                Đăng nhập ngay
                            </router-link>
                        </div>
                    </div>

                    <!-- Form -->
                    <div class="flex flex-col gap-10 items-center w-full">
                        <div class="flex flex-col gap-10 items-center w-full">
                            <!-- Inputs -->
                            <div class="flex flex-col gap-3 w-full">
                                <Input
                                    v-model="form_data.ho_va_ten"
                                    placeholder="Họ và tên"
                                    :error="!!errors.ho_va_ten"
                                    :error-message="errors.ho_va_ten"
                                    @blur="() => validateField('ho_va_ten')" />

                                <Input
                                    v-model="form_data.email"
                                    type="email"
                                    placeholder="Email"
                                    :error="!!errors.email"
                                    :error-message="errors.email"
                                    @blur="() => validateField('email')" />

                                <Input
                                    v-model="form_data.mat_khau"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    :error="!!errors.mat_khau"
                                    :error-message="errors.mat_khau"
                                    @blur="() => validateField('mat_khau')" />

                                <Input
                                    v-model="form_data.nhap_lai_mat_khau"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    :error="!!errors.nhap_lai_mat_khau"
                                    :error-message="errors.nhap_lai_mat_khau"
                                    @blur="() => validateField('nhap_lai_mat_khau')" />
                            </div>

                            <!-- Remember + forgot -->
                            <div class="flex items-center justify-between w-full">
                                <div class="flex gap-1 items-center">
                                    <Checkbox v-model="form_data.ghi_nho" />
                                    <span class="text-[14px] font-medium leading-5 text-[#1a2229] select-none">
                                        Ghi nhớ đăng nhập
                                    </span>
                                </div>
                                <router-link
                                    to="/forgot-password"
                                    class="text-[14px] font-medium leading-5 text-[#1a2229] hover:text-[#0069fe] transition-colors">
                                    Quên mật khẩu?
                                </router-link>
                            </div>
                        </div>

                        <!-- Submit button -->
                        <button
                            type="button"
                            class="w-full flex items-center justify-center gap-2 px-3 py-[10px] rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            :style="{ background: 'var(--gradient)' }"
                            @click="handleSubmit">
                            <span class="flex-1 text-[14px] font-semibold leading-5 text-white text-center">
                                Đăng ký tài khoản SMIT Chat
                            </span>
                        </button>
                    </div>

                    <!-- Divider + Google -->
                    <div class="flex flex-col gap-6 w-full">
                        <!-- Divider -->
                        <div class="flex items-center gap-2 w-full">
                            <div class="flex-1 h-px bg-[#e8edf2]" />
                            <span class="text-[12px] font-medium leading-[14px] text-[#7d91a6]">Hoặc</span>
                            <div class="flex-1 h-px bg-[#e8edf2]" />
                        </div>

                        <!-- Google button -->
                        <button
                            type="button"
                            class="w-full flex items-center justify-center gap-2 px-3 py-[10px] bg-white border border-[#e8edf2] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            @click="handleGoogleRegister">
                            <!-- Google SVG icon -->
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#google-clip)">
                                    <path
                                        d="M19.805 10.23c0-.682-.061-1.366-.181-2.034H10.2v3.848h5.4a4.625 4.625 0 01-2.008 3.034v2.521h3.252c1.904-1.755 3.001-4.343 3.001-7.37z"
                                        fill="#4285F4" />
                                    <path
                                        d="M10.2 20c2.7 0 4.97-.893 6.628-2.431l-3.252-2.521c-.898.605-2.053.957-3.372.957-2.59 0-4.787-1.75-5.573-4.103H1.26v2.599A10.001 10.001 0 0010.2 20z"
                                        fill="#34A853" />
                                    <path
                                        d="M4.627 11.902A5.992 5.992 0 014.318 10c0-.66.116-1.3.309-1.902V5.499H1.26A10.004 10.004 0 00.2 10c0 1.616.388 3.14 1.06 4.501l3.367-2.599z"
                                        fill="#FBBC05" />
                                    <path
                                        d="M10.2 3.996c1.46 0 2.77.502 3.803 1.49l2.84-2.84C15.166 1.003 12.898.003 10.2.003A10.001 10.001 0 001.26 5.5l3.367 2.599C5.413 5.747 7.61 3.996 10.2 3.996z"
                                        fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="google-clip">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span class="text-[14px] font-medium leading-5 text-[#1a2229]">
                                Đăng ký với Google
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Poster (RIGHT) -->
        <div class="flex-1 h-[920px] rounded-2xl bg-[#57e3c5] overflow-hidden relative z-10">
            <!-- Blurred background layer 1 -->
            <div class="absolute left-[212px] top-[98px] w-full h-[864px] blur-[1px] opacity-80 overflow-hidden pointer-events-none">
                <img :src="IMG_POSTER" class="absolute w-[111%] h-[114%] left-[-5.55%] top-0 max-w-none" alt="" />
            </div>
            <!-- Blurred background layer 2 -->
            <div class="absolute left-[168px] top-[110px] w-full h-[864px] blur-[1px] overflow-hidden pointer-events-none">
                <img :src="IMG_POSTER" class="absolute w-[111%] h-[114%] left-[-5.55%] top-0 max-w-none" alt="" />
            </div>
            <!-- Main screenshot -->
            <div
                class="absolute left-[116px] top-[126px] w-[calc(100%+174px)] h-[862px] shadow-[-15px_10px_100px_0px_rgba(10,50,41,0.25)] overflow-hidden pointer-events-none">
                <img :src="IMG_POSTER" class="absolute w-[105%] h-[118%] left-[-5.26%] top-0 max-w-none" alt="" />
            </div>
            <!-- Bottom fade overlay -->
            <div
                class="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-white/25 to-transparent pointer-events-none" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { z } from "zod"
import { Input } from "@/components/custom/input"
import { Checkbox } from "@/components/custom/checkbox"

// Figma MCP asset URLs (valid 7 days)
const IMG_SMIT_CHAT = "https://www.figma.com/api/mcp/asset/fd9adf02-0875-48a4-98a4-499de2c2d69f"
const IMG_POSTER = "https://www.figma.com/api/mcp/asset/ed42bbb8-d8d8-4d99-b761-9dcfcdeae911"
const IMG_ELLIPSE_5 = "https://www.figma.com/api/mcp/asset/78f75ee1-9d5b-471f-9ed6-b333d983a2e4"
const IMG_ELLIPSE_4 = "https://www.figma.com/api/mcp/asset/ef19bba6-a2a4-4051-b1da-f06d49fc8b57"
const IMG_UNION = "https://www.figma.com/api/mcp/asset/978ba644-4a99-460a-8b61-515d306914aa"

// Zod v4 schema
const register_schema = z
    .object({
        ho_va_ten: z.string().min(2, "Tối thiểu 2 ký tự").max(100, "Tối đa 100 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        mat_khau: z
            .string()
            .min(8, "Tối thiểu 8 ký tự")
            .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
            .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
            .regex(/[0-9]/, "Phải có ít nhất 1 số"),
        nhap_lai_mat_khau: z.string().min(1, "Vui lòng nhập lại mật khẩu")
    })
    .refine(data => data.mat_khau === data.nhap_lai_mat_khau, {
        message: "Mật khẩu không khớp",
        path: ["nhap_lai_mat_khau"]
    })

type RegisterSchema = z.infer<typeof register_schema>
type FormErrors = Partial<Record<keyof RegisterSchema, string>>

const form_data = reactive<RegisterSchema & { ghi_nho: boolean }>({
    ho_va_ten: "",
    email: "",
    mat_khau: "",
    nhap_lai_mat_khau: "",
    ghi_nho: false
})

const errors = reactive<FormErrors>({})

const clearError = (field: keyof FormErrors) => {
    delete errors[field]
}

const validateField = (field: keyof RegisterSchema) => {
    const result = register_schema.safeParse(form_data)
    if (!result.success) {
        const field_issue = result.error.issues.find(issue => issue.path[0] === field)
        if (field_issue) {
            errors[field] = field_issue.message
        } else {
            clearError(field)
        }
    } else {
        clearError(field)
    }
}

const handleSubmit = () => {
    const result = register_schema.safeParse(form_data)
    if (!result.success) {
        // Clear all errors first
        ;(Object.keys(errors) as Array<keyof FormErrors>).forEach(key => clearError(key))
        // Set errors from issues
        result.error.issues.forEach(issue => {
            const field = issue.path[0] as keyof RegisterSchema
            if (field && !errors[field]) {
                errors[field] = issue.message
            }
        })
        return
    }
    // TODO: call register API
    console.log("Register data:", result.data)
}

const handleGoogleRegister = () => {
    // TODO: Google OAuth register
    console.log("Google register")
}
</script>
