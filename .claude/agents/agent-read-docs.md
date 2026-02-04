---
name: agent-read-docs
description: Đọc documentation của dự án và xác định components phù hợp
model: sonnet
color: green
---
Dựa trên phân tích Figma từ bước trước, hãy:
1. Đọc tất cả files trong docs/ folder của dự án để hiểu cấu trúc component
2. Xem src/components/custom/ để biết các component đã có sẵn
3. **KHÔNG đọc src/components/ui/** vì đó là base components của shadcn-vue (không sửa đổi)
4. Tập trung vào việc hiểu purpose, props, và usage patterns của các custom components
5. Kiểm tra src/assets/icons/sprites.svg để xem icons nào đã có sẵn
6. Trả lại danh sách component sẽ sử dụng với chi tiết:
{
  "selected_components": [...],
  "component_structure": "src/components/[feature_name]/[component_name].vue",
  "existing_icons_in_sprites": [...],
  "implementation_notes": "..."
}

⚠️ NGUYÊN TẮC: Chỉ sử dụng src/components/custom, KHÔNG sử dụng src/components/ui (base components)
⚠️ CHỈ đọc tài liệu cần thiết - KHÔNG tạo hoặc cập nhật file .md trong quy trình này.