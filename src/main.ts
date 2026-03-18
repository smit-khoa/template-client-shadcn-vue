import { createApp } from "vue"
import "./style.css"
import "vue-sonner/style.css"
import App from "./App.vue"
import { router } from "./router"
import { api, type ApiErrorResponse } from "./controllers/global"
import { user } from "./store"

interface Company {
    userId: string
    companyId: string
    companyName: string
}

interface UserResponse {
    data: {
        userName: string
        email: string
        company: Company[]
    }
}

const isApiError = (res: unknown): res is ApiErrorResponse => {
    return typeof res === "object" && res !== null && "error" in res && (res as ApiErrorResponse).error === true
}

const app = createApp(App)
app.use(router)

router.beforeEach(async (to, _from, next) => {
    // Route không cần đăng nhập → cho qua
    if (to.meta.needLogin === false) {
        return next()
    }

    const authorization =
        localStorage.getItem("accessToken") || "" || "shfkjshdjkfhsjkfhskjhfkjshfkjshfkjshfkjshfkjshdfkj"

    // Nếu không có token và route cần đăng nhập → redirect login
    // if (!authorization && to.meta.needLogin === true) {
    //     return next("/login")
    // }

    // Gọi API kiểm tra user
    const res = await api<UserResponse>({
        url: "/api/v1/public/auth/me",
        method: "GET",
        toast: false,
        authorization
    })

    // Nếu lỗi 401 → redirect login
    if (isApiError(res)) {
        if (res.status === 401) {
            localStorage.removeItem("accessToken")
            return next("/login")
        }
        return next()
    }

    // Lưu thông tin user vào store
    if (res.data) {
        user().setUser(res.data)
    }

    // Nếu đã đăng nhập mà vào trang auth (block) → redirect app
    if (to.meta.block && authorization) {
        console.log("redirect app/staff")
        return next("/app/staff")
    }

    // Check nếu user chưa có company và không phải đang ở trang onboarding → redirect onboarding
    // const has_company = res.data?.company && res.data.company.length > 0
    // if (!has_company && to.path !== "/onboarding") {
    //     console.log("redirect onboarding")
    //     return next("/onboarding")
    // }

    next()
})

router.isReady().then(() => {
    app.mount("#app")
})
