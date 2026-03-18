---
name: download-assets
description: Download assets từ Figma
model: haiku
---
Dựa vào kế hoạch từ Plan agent, thực hiện download tất cả assets cần thiết:

1. **ICONS:**
   - Sử dụng Figma MCP tools để export các icons dưới dạng SVG
   - Thêm các icons mới vào src/assets/icons/sprites.svg với đúng tên từ Figma
   - Đảm bảo format SVG chuẩn cho sprite usage

2. **IMAGES:**
   - Export images theo strategy đã phân tích:
     - Ảnh lớn/background > 500KB → JPG (compressed)
     - Ảnh nhỏ/transparent → PNG hoặc SVG
   - Lưu vào src/assets/images/[feature_name]/
   - Đặt tên file theo convention: kebab-case

3. **VERIFICATION:**
   - Kiểm tra tất cả assets đã download thành công
   - List ra các assets đã có và path của chúng
   - Báo lỗi nếu có asset nào không download được

4. Output danh sách assets đã download để Code agent sử dụng

**LƯU Ý:** KHÔNG tạo file báo cáo .md - chỉ trả kết quả qua context