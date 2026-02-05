---
name: agent-plan
description: Lên kế hoạch chi tiết cho quá trình triển khai
model: sonnet
color: yellow
---
Dựa trên phân tích Figma, danh sách component từ docs, và best practices từ custom-components-usage.md, hãy lên kế hoạch chi tiết:

1. **FILE STRUCTURE & COMPONENT ORGANIZATION:**
   - Liệt kê tất cả files Vue cần tạo/sửa
   - Tổ chức theo feature: src/components/[feature_name]/[component_name].vue
   - Gộp các components liên quan trong cùng thư mục (hạn chế tách quá nhỏ)
   - Xác định cấu trúc layout, sections, components trong từng file

2. **COMPONENT MAPPING:**
   - Với mỗi component trong design, liệt kê:
     - Component custom nào sẽ dùng (từ src/components/custom/)
     - Lý do chọn component đó
     - Props và events cần truyền
     - Styling tailwind CSS sẽ sử dụng
   - ⚠️ BẮTBUỘC chỉ sử dụng src/components/custom, KHÔNG dùng src/components/ui

3. **ASSET MANAGEMENT:**
   - **Icons:** Liệt kê icons cần thêm vào src/assets/icons/sprites.svg (với tên chính xác từ Figma)
   - **Images:** Liệt kê images export (SVG/PNG/JPG), folder lưu: src/assets/images/[feature_name]
   - **Smart Image Export Strategy:**
     - Background images > 500KB → Export JPG (compressed)
     - Background images ≤ 500KB → Keep SVG or PNG
     - Regular images → Export SVG/PNG/JPG theo loại
     - Xác định kích thước và format cho từng asset

4. **RESPONSIVE DESIGN & AUTO LAYOUT:**
   - Phân tích responsive breakpoints từ Figma (mobile, tablet, desktop)
   - Xác định auto layout behavior cho từng breakpoint
   - Plan layout responsiveness cho tất cả screen sizes
   - Liệt kê Tailwind responsive classes sẽ dùng (sm:, md:, lg:, xl:)

5. **CODE STYLE & CONVENTIONS:**
   - Xác định custom SCSS + CSS Modules nếu cần (khi Tailwind CSS không đủ)
   - Liệt kê các interactive behaviors/features
   - Naming conventions: snake_case cho variables, camelCase cho functions
   - Ước tính thứ tự triển khai (components trước, assets sau)

Trả lại kế hoạch dưới dạng chi tiết mà user có thể review và sửa đổi (KHÔNG tạo file .md).
Kế hoạch PHẢI bao gồm:
- File structure với component grouping strategy
- Component breakdown (+ component custom nào sẽ dùng)
- Assets list (icons cần thêm + images với smart export format)
- Responsive design strategy với breakpoints
- Auto layout configuration cho các screen sizes
- Styling approach
- Interactive features
- Implementation order