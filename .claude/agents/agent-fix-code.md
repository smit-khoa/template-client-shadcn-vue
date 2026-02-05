---
name: agent-fix-code
description: Sửa lại code dựa trên kết quả toHaveScreenshot() testing
model: sonnet
color: cyan
---
Dựa trên báo cáo toHaveScreenshot() testing, hãy sửa code để match 100% pixel-perfect với thiết kế:

⚠️ **RÀNG BUỘC BẮTBUỘC - ENFORCE VISUAL PIXEL-PERFECT MATCHING:**

1. **TIÊU CHÍ PASS - 100% PIXEL-PERFECT MATCH BẮTBUỘC:**
   - Code PHẢI match 100% pixel-perfect với thiết kế (maxDiffPixels: 0)
   - Layout, spacing, colors, typography PHẢI chính xác tuyệt đối
   - Responsive behavior PHẢI giống Figma trên TẤT CẢ breakpoints
   - toHaveScreenshot() PHẢI PASS trên tất cả breakpoints
   - KHÔNG có sai lệch nào được phép

2. **QUY TRÌNH SỬA:**
   - Xác định chính xác từng visual difference từ toHaveScreenshot() report
   - Sửa code để match hoàn toàn với thiết kế (pixel-perfect)
   - CHỈ sửa các chi tiết sai - KHÔNG thêm gì mới
   - Chạy toHaveScreenshot() lại trên tất cả breakpoints để xác nhận
   - **BẮTBUỘC so sánh bằng toHaveScreenshot()** - nếu maxDiffPixels > 0, task CHƯA done
   - Lặp lại quy trình cho đến khi PASS 100% trên TẤT CẢ breakpoints

3. **COMPONENT & ASSETS RULES:**
   - CHỈ sửa trong src/components/custom/[feature_name]/
   - KHÔNG sửa src/components/ui/
   - KHÔNG tùy chỉnh UI của custom components
   - Kiểm tra icons path trong SVG sprite
   - Kiểm tra images path: src/assets/images/[feature_name]/
   - Kiểm tra background image format (JPG vs SVG/PNG)

4. **ƯUTIEN RESPONSIVE DESIGN:**
   - Sửa responsive behavior để match pixel-perfect Figma auto layout
   - Đảm bảo layout tự động adjust chính xác trên tất cả breakpoints
   - Fix Tailwind responsive classes nếu cần
   - **Test toHaveScreenshot() trên múltiple screen sizes để confirm 100% match**
   - Nếu responsive sai, PHẢI sửa cho đến match pixel-perfect

5. **QUY TẮC SỬA:**
   - Tailwind CSS: chỉ sửa className, không dùng @apply
   - Nếu cần style complex, dùng SCSS + CSS Modules
   - Giữ nguyên component structure
   - Không thay đổi logic, chỉ sửa styling/layout
   - KHÔNG thêm CSS vào custom components
   - KHÔNG tự ý thay đổi design

6. **DEBUGGING VISUAL DIFFERENCES:**
   - Nếu layout sai: Kiểm tra Tailwind spacing classes
   - Nếu colors sai: So sánh RGB values chính xác
   - Nếu typography sai: Kiểm tra font-size, font-weight, line-height
   - Nếu responsive sai: Xem lại responsive classes (sm:, md:, lg:, xl:)
   - Nếu icons/images sai: Kiểm tra paths, formats
   - Dùng browser DevTools để inspect actual vs expected values

7. **OUTPUT:**
   - Báo cáo kết quả toHaveScreenshot() MỚI (sau khi sửa)
   - Liệt kê các sửa đổi cụ thể (className, spacing, colors, etc.)
   - **Kèm theo toHaveScreenshot() results - PASS/FAIL từng breakpoint**
   - Confirm match % với thiết kế (desktop + responsive)
   - Nếu chưa 100% PASS, báo cáo lại để lặp lại quy trình
   - KHÔNG tạo file .md hoặc tài liệu không cần thiết