import axios from "axios"
import { toast } from "vue-sonner"

// Production: dùng gateway domain
// const host = "https://gateway." + location.hostname.split(".").slice(-2).join(".")

// Dev: dùng proxy (empty string) để tránh CORS, Vite sẽ proxy /api/* sang target
// Production: dùng full URL
const is_dev = import.meta.env.DEV
const host = is_dev ? "" : "https://bolt-toe-genres-recommendations.trycloudflare.com"
const token = localStorage.getItem("accessToken")

export const api = ({
    url,
    data = {},
    method = "GET",
    params,
    toast: showToast = true,
    toastOpt = {},
    authorization = token || "",
    signal = null
}) => {
    return axios({
        url: host + url,
        method,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...(authorization && { Authorization: authorization })
        },
        params,
        withCredentials: true,
        signal
    })
        .then(res => {
            if (res.data.error && res.data.message) throw new Error(res.data.message)
            return res.data
        })
        .catch(e => {
            if (signal && e.code === "ERR_CANCELED") return { error: true, is_cancel: true }

            let status = e?.response?.status || 0
            let message = e?.response?.data?.message || e?.message || "Lỗi không xác định! Vui lòng thử lại sau"
            let subcode = e?.response?.data?.subcode || e?.subcode || "unknown"

            // Hiển thị toast nếu showToast = true
            if (showToast) {
                toast.error(message, {
                    description: toastOpt.description || undefined,
                    ...toastOpt
                })
            }

            return { error: true, message, subcode, status }
        })
}

export { host }
export const url_smit_dashboard = "https://dashboard." + location.hostname.split(".").slice(-2).join(".")
export const wait = ms => new Promise(callback => setTimeout(callback, ms))
export const waitForElement = async selector => {
    if (!document.querySelector(selector)) return wait(100).then(() => waitForElement(selector))
}
