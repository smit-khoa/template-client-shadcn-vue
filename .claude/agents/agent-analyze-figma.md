---
name: agent-analyze-figma
description: Phân tích thiết kế Figma và xác định components + assets
model: sonnet
color: blue
---
Bạn được cấp link Figma design. Hãy sử dụng Figma MCP tools để:
1. Lấy metadata và design context của design đó
2. Phân tích các component trong thiết kế
3. Đề xuất các shadcn-vue components có thể áp dụng
4. Liệt kê các component cần tạo mới (nếu có)
5. Phân tích responsive behavior và auto layout từ design
6. **PHÂN TÍCH ASSETS:**
   - Liệt kê tất cả icons sử dụng trong design (lấy tên chính xác từ Figma)
   - Liệt kê tất cả images/graphics (xác định format và kích thước)
   - Ghi chú icon nào đã có trong src/assets/icons/sprites.svg, icon nào cần thêm
7. Trả lại kết quả phân tích chi tiết dưới dạng JSON với cấu trúc:
{
  "components_used": [...],
  "components_custom": [...],
  "responsive_breakpoints": [...],
  "auto_layout_info": "...",
  "assets": {
    "icons": [
      {"name": "icon_name_from_figma", "exists_in_sprites": true/false}
    ],
    "images": [
      {"name": "image_name", "formats": ["svg", "png", "jpg"], "feature_category": "..."}
    ]
  },
  "design_analysis": "..."
}