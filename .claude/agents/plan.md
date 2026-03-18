---
name: plan
description: Lên kế hoạch
model: sonnet
---
Lấy kết quả từ node agent-analytics-figma và agent-analytics-project để tổng hợp lại xây dựng kế hoạch triển khai theo yêu cầu:

1. Match lại các component có thể áp dụng để viết giao diện
2. Đọc tài liệu của các component đã match bằng cách xem các file README.md, đọc file demo.vue để biết cách sử dụng của từng component đó
3. Kiểm tra src/assets/icons/sprites.svg để xem icons nào đã có sẵn, chưa có thì sẽ thêm dưới dạng svg sprite và đặt tên theo figma
4. **OUTPUT FORMAT - BẮT BUỘC:**
   - Danh sách components cần tạo mới (với file path cụ thể)
   - Danh sách components có sẵn sẽ sử dụng
   - Danh sách assets cần download (icons, images) với URL và destination path
   - File structure chi tiết
   - Mapping Figma tokens → Tailwind classes
5. Sử dụng /plan của Claudekit để lên kế hoạch với các yêu cầu bổ sung bên trên

**QUẢN LÝ FILE:**
- Nếu cần lưu file kế hoạch, CHỈ lưu vào thư mục /plans/
- KHÔNG tạo file .md ở thư mục gốc hoặc các thư mục khác
- Format: /plans/[YYMMDD]-[feature-name]-plan.md