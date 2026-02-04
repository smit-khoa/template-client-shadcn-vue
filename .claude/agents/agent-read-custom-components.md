---
name: agent-read-custom-components
description: Đọc chi tiết docs/custom-components-usage.md để hiểu các component dùng chung
model: sonnet
color: purple
---
Hãy đọc và phân tích chi tiết file docs/custom-components-usage.md để:
1. Hiểu rõ các custom components được khuyến nghị dùng trong dự án
2. Học cách sử dụng chúng (props, events, patterns)
3. Hiểu limitations và best practices của mỗi component
4. Xác định khi nào nên tạo component mới vs tái sử dụng component cũ
5. Lưu ý các thành phần UI thường dùng và cách kết hợp chúng
6. **COMPONENT GROUPING STRATEGY:**
   - Hiểu cách gộp các components liên quan trong cùng thư mục feature
   - Hạn chế tách quá nhỏ (không tạo 1 file cho 1 component nhỏ)
   - Tổ chức theo feature: src/components/[feature_name]/[component_name].vue

Trả lại tóm tắt chi tiết:
{
  "custom_components_available": [...],
  "usage_patterns": "...",
  "best_practices": "...",
  "component_grouping_strategy": "...",
  "recommendations_for_design": "..."
}

⚠️ CHỈ đọc tài liệu - KHÔNG tạo hoặc cập nhật file trong quy trình này.