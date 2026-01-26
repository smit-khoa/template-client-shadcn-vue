// LƯU Ý

// có thể thay đổi trực tiếp biến trong state nhưng yêu cầu phải sử dụng actions để thay đổi state để đảm bảo không lỗi data và có thể control được
// chỉ thay đổi nếu có trường hợp đặc biệt không thể sử dụng actions
// tách các store thành các function riêng biệt để dễ quản lý và bảo trì

import { createPinia } from "pinia"
import { createApp } from "vue"

const pinia = createPinia()
const app = createApp({})
app.use(pinia)

export { user } from "./user"
