---
name: agent-fix-code
description: Sửa lại code dựa trên kết quả kiểm thử visual
model: sonnet
---
Dựa trên báo cáo kiểm thử visual, hãy:

⚠️ **NGUYÊN TẮC BẮTBUỘC:**

1. **Sửa code để match CHÍNH XÁC thiết kế Figma:**
   - Chỉ sửa các chi tiết sai/khác biệt
   - KHÔNG thêm components hoặc giao diện mới
   - KHÔNG thay đổi màu sắc ngoài đó khác design
   - KHÔNG sáng tạo hoặc cải thiện design
   - KHÔNG thay đổi layout, spacing ngoài những sai

2. **COMPONENT & ASSETS RULES:**
   - CHỈ sửa trong src/components/custom/[feature_name]/
   - KHÔNG sửa src/components/ui/
   - Kiểm tra icons path trong SVG sprite
   - Kiểm tra images path: src/assets/images/[feature_name]/

3. **ƯUTIEN RESPONSIVE DESIGN:**
   - Sửa responsive behavior để match auto layout từ Figma
   - Đảm bảo layout tự động adjust trên tất cả breakpoints
   - Fix Tailwind responsive classes nếu cần
   - Test trên multiple screen sizes để confirm responsive design

4. **Quy tắc sửa:**
   - Tailwind CSS: chỉ sửa className, không dùng @apply
   - Nếu cần style complex, dùng SCSS + CSS Modules
   - Giữ nguyên component structure
   - Không thay đổi logic, chỉ sửa styling/layout

5. **Quy trình:**
   - Xác định các chi tiết sai/khác biệt (desktop + responsive)
   - Sửa code để match hoàn toàn với thiết kế
   - Chạy kiểm thử visual lại trên tất cả breakpoints để xác nhận
   - Lặp lại quy trình cho đến khi match 100% trên tất cả breakpoints

6. **Output:**
   - Báo cáo kết quả kiểm thử visual mới
   - Liệt kê các sửa đổi (styling, responsive classes)
   - Confirm match % với thiết kế (desktop + responsive)
   - KHÔNG tạo file .md hoặc tài liệu không cần thiết