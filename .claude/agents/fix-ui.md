---
name: fix-ui
description: Sửa lỗi UI theo visual test
model: sonnet
---
Dựa vào kết quả visual test đã fail, thực hiện sửa lỗi UI:

**INPUT:** Danh sách differences từ visual-test agent

**QUY TRÌNH SỬA:**

1. **PHÂN TÍCH LỖI:**
   - Đọc danh sách differences và severity
   - Ưu tiên sửa lỗi theo severity: critical > major > minor

2. **SỬA TỪNG LỖI:**
   - Màu sắc sai → Kiểm tra lại Figma design tokens, sửa Tailwind classes
   - Spacing sai → Điều chỉnh padding/margin/gap classes
   - Font sai → Sửa font-size, font-weight classes
   - Layout lệch → Kiểm tra flexbox/grid settings
   - Missing elements → Thêm elements còn thiếu

3. **RÀNG BUỘC:**
   - ❌ KHÔNG thay đổi logic hay structure không cần thiết
   - ❌ KHÔNG refactor code không liên quan đến lỗi
   - ❌ KHÔNG tạo file .md hoặc báo cáo
   - ✓ CHỈ sửa đúng những gì được báo trong differences
   - ✓ Giữ nguyên code đã hoạt động tốt

4. **OUTPUT:**
   - Danh sách files đã sửa
   - Mô tả từng thay đổi (qua context, không tạo file)
   - Ready for re-test

**LƯU Ý:** Sau khi sửa xong, workflow sẽ chạy lại visual test để verify