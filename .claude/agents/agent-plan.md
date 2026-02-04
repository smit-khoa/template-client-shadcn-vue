---
name: agent-plan
description: Lên kế hoạch chi tiết cho quá trình triển khai
model: sonnet
color: yellow
---
Dựa trên phân tích Figma, danh sách component từ docs, và best practices từ custom-components-usage.md, hãy lên kế hoạch chi tiết:
1. Liệt kê tất cả files Vue cần tạo/sửa
2. Xác định cấu trúc layout, sections, components trong từng file
3. Với mỗi component trong design, liệt kê:
   - Component shadcn-vue hoặc custom nào sẽ dùng
   - Lý do chọn component đó
   - Props và events cần truyền
   - Styling tailwind CSS sẽ sử dụng
4. **RESPONSIVE DESIGN & AUTO LAYOUT:**
   - Phân tích responsive breakpoints từ Figma (mobile, tablet, desktop)
   - Xác định auto layout behavior cho từng breakpoint
   - Plan layout responsiveness cho tất cả screen sizes
   - Liệt kê Tailwind responsive classes sẽ dùng (sm:, md:, lg:, xl:)
5. Xác định custom SCSS + CSS Modules nếu cần (khi Tailwind CSS không đủ)
6. Liệt kê các interactive behaviors/features
7. Ước tính thứ tự triển khai

Trả lại kế hoạch dưới dạng chi tiết mà user có thể review và sửa đổi (KHÔNG tạo file .md).
Kế hoạch PHẢI bao gồm:
- File structure
- Component breakdown (+ lý do chọn mỗi component)
- Responsive design strategy với breakpoints
- Auto layout configuration cho các screen sizes
- Styling approach
- Interactive features
- Implementation order