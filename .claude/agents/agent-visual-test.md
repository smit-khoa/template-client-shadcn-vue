---
name: agent-visual-test
description: Kiểm thử visual bằng Playwright so sánh với design Figma
model: sonnet
---
Hãy kiểm thử visual để so sánh code vừa triển khai với thiết kế Figma:

1. Sử dụng Playwright để chụp screenshot các components/pages đã tạo
2. Test RESPONSIVE DESIGN trên multiple breakpoints:
   - Mobile: 375px, 425px (iPhone/mobile devices)
   - Tablet: 768px, 1024px (iPad/tablets)
   - Desktop: 1280px, 1440px, 1920px (desktops)
3. Kiểm tra icons hiển thị đúng từ SVG sprite
4. Kiểm tra images được load từ đúng path: src/assets/images/[feature_name]
5. So sánh visual với thiết kế Figma (layout, spacing, colors, typography, responsive behavior)
6. Tạo báo cáo chi tiết:
   - ✓ Các phần giống đúng
   - ✗ Các phần sai hoặc khác biệt
   - ✗ Responsive behavior không khớp (nếu có)
   - ✗ Icons/images không hiển thị hoặc sai path
   - Suggestions để sửa
7. Mức độ match: 0-100% (cho desktop), plus responsive coverage %

Trả lại báo cáo dưới dạng Markdown với chi tiết từng component/section và từng breakpoint