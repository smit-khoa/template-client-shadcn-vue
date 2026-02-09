---
name: code
description: Triển khai code Vue + Tailwindcss
model: sonnet
---
Hãy triển khai code theo kế hoạch, sử dụng lệnh /cook của Claudekit để thực hiện với các yêu cầu:

⚠️ **RÀNG BUỘC NGHIÊM NGẶT - TUÂN THỦ CHÍNH XÁC THIẾT KẾ FIGMA:**

1. **KHÔNG được thay đổi bất kỳ điều gì trong thiết kế Figma:**
   - ❌ KHÔNG tự ý thêm components, sections, hoặc giao diện mới không có trong thiết kế
   - ❌ KHÔNG thay đổi màu sắc, gradient, hoặc color scheme
   - ❌ KHÔNG thay đổi layout, spacing, hoặc positioning
   - ❌ KHÔNG thay đổi typography, font sizes, hoặc weights
   - ❌ KHÔNG thêm effects, shadows, hoặc animations không có trong design
   - ❌ KHÔNG thay đổi responsive breakpoints hoặc behavior
   - ❌ KHÔNG sáng tạo hoặc tự ý cải thiện giao diện
   - ❌ KHÔNG tự ý tùy chỉnh UI của components dùng chung (chúng đã đủ đáp ứng)
   - ❌ KHÔNG thêm CSS vào custom components - chỉ dùng className Tailwind

2. **COMPONENT IMPLEMENTATION - BẮT BUỘC RULES:**
   - ✓ CHỈ sử dụng components từ src/components/custom/
   - ✓ KHÔNG sử dụng src/components/ui/ (base components của shadcn-vue - không được sửa, không sử dụng)
   - ✓ KHÔNG tùy chỉnh UI của custom components - sử dụng nguyên vẹn như thiết kế, chỉ áp dụng theo cách sử dụng của nó
   - ✓ Tổ chức components theo feature: src/components/[feature_name]/[component_name].vue
   - ✓ Gộp các components liên quan trong cùng thư mục feature
   - ✓ Hạn chế tách quá nhỏ - gom các logic liên quan lại (theo tính năng)
   - ✓ Import components dùng chung chính xác từ src/components/custom/

3. **ASSETS HANDLING:**
   - **Icons:**
     - Kiểm tra src/assets/icons/sprites.svg
     - Thêm các icons mới vào sprites.svg (nếu chưa có) với tên chính xác từ Figma
     - Sử dụng SVG sprite icons trong component (không dùng icon library khác) bằng component Icon
   - **Images - SMART EXPORT STRATEGY:**
     - Phân tích kích thước ảnh background:
       - **Nếu file > 500KB (ảnh phức tạp):** Export dạng JPG (compressed) - tối ưu kích thước
       - **Nếu file ≤ 500KB:** Có thể giữ SVG hoặc PNG - chất lượng tốt
     - **ƯUTIEN export ảnh background phức tạp thành JPG để tối ưu performance**
     - Export multiple formats (SVG, PNG, JPG) khi cần
     - Lưu trong src/assets/images/[feature_name]/
     - Import và sử dụng trong components với format thích hợp

4. **RESPONSIVE DESIGN & AUTO LAYOUT:**
   - ✓ Implement responsive design cho TẤT CẢ screen sizes (mobile, tablet, desktop)
   - ✓ Sử dụng Tailwind responsive classes (sm:, md:, lg:, xl:) để match auto layout từ Figma
   - ✓ Ensure layout tự động adjust dựa theo viewport width
   - ✓ Test responsive behavior trên multiple breakpoints
   - ✓ Maintain visual hierarchy trên tất cả screen sizes

5. **Code implementation rules:**
   - Sử dụng Vue 3 + TypeScript
   - Tailwind CSS: KHÔNG dùng @apply trong style, chỉ dùng className
   - Nếu không thể dùng Tailwind CSS, sử dụng SCSS + CSS Modules
   - Naming convention: snake_case cho variables, camelCase cho functions
   - Đảm bảo imports đúng path, component names đúng
   - Với các div có background phức tạp, hãy export ảnh làm background, nếu không thể export chuẩn, thay thế ảnh default tạm thời để user thay ảnh
   - KHÔNG tạo file .md hoặc tài liệu không cần thiết