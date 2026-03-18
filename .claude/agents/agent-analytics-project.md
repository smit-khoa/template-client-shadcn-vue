---
name: agent-analytics-project
description: Đọc dự án hiện tại
model: haiku
---
Thực hiện yêu cầu:
1. Đọc tất cả files trong docs/ folder của dự án để hiểu cấu trúc dự án, component
2. Xem src/components/custom/ để biết có các component nào đã có sẵn (không sửa đổi)
3. **KHÔNG đọc src/components/ui/** vì đó là base components của shadcn-vue (không sửa đổi)
4. **ĐỌC THÊM CONFIG FILES:**
   - Đọc tailwind.config.js để biết colors, spacing, breakpoints đang dùng
   - Đọc src/assets/styles/ để biết CSS variables và theme
   - Đọc các existing pages/layouts trong src/views/ hoặc src/pages/ để match coding patterns
5. Tổng hợp thông tin về design system hiện tại của dự án

**LƯU Ý:** KHÔNG tạo file báo cáo .md - chỉ trả kết quả qua context để agent sau sử dụng