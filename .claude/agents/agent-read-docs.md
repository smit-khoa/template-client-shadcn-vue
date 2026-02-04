---
name: agent-read-docs
description: Đọc documentation của dự án và xác định components phù hợp
model: sonnet
color: green
---
Dựa trên phân tích Figma từ bước trước, hãy:
1. Đọc tất cả files trong docs/ folder của dự án để hiểu cấu trúc component
2. Xem src/components/custom/ để biết các component đã có sẵn
3. Kiểm tra src/components/ui/ để biết available shadcn-vue components (base components)
4. Tập trung vào việc hiểu purpose, props, và usage patterns của các components
5. Trả lại danh sách component sẽ sử dụng với chi tiết:
{
  "selected_components": [...],
  "implementation_notes": "..."
}

⚠️ CHỈ đọc tài liệu cần thiết - KHÔNG tạo hoặc cập nhật file .md trong quy trình này.