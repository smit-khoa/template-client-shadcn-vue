---
name: update-docs
description: Cập nhật tài liệu tính năng
model: haiku
---
Sau khi tính năng đã hoàn thành và pass visual test, cập nhật tài liệu cho tính năng:

**NHIỆM VỤ:**

1. **TẠO/CẬP NHẬT TÀI LIỆU TÍNH NĂNG:**
   - Tạo file tài liệu tại: /docs/[feature-name]/README.md
   - Nếu thư mục chưa tồn tại, tạo mới

2. **NỘI DUNG TÀI LIỆU BẮT BUỘC:**
   ```
   # [Tên tính năng]
   
   ## Tổng quan
   - Mô tả ngắn gọn tính năng
   - Link Figma design (nếu có)
   
   ## Cấu trúc files
   - Liệt kê các files đã tạo với đường dẫn
   - Mô tả ngắn chức năng từng file
   
   ## Components sử dụng
   - Danh sách components từ src/components/custom/ đã dùng
   - Cách sử dụng và props
   
   ## Luồng hoạt động
   - Mô tả flow chính của tính năng
   - Các states và interactions
   
   ## Assets
   - Icons đã thêm vào sprites.svg
   - Images trong src/assets/images/[feature]/
   
   ## Ghi chú phát triển
   - Các lưu ý quan trọng cho developer
   - Các edge cases cần xử lý
   ```

3. **CẬP NHẬT INDEX (nếu cần):**
   - Cập nhật /docs/README.md hoặc index để link đến tài liệu mới

**LƯU Ý:**
- Viết tài liệu ngắn gọn, súc tích
- Tập trung vào thông tin giúp AI/developer hiểu và maintain tính năng
- CHỈ tạo file trong thư mục /docs/[feature-name]/