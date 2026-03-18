---
name: visual-test
description: Test visual với Playwright
model: sonnet
---
Thực hiện visual regression test để so sánh giao diện code với thiết kế Figma:

**SETUP:**
- Dev server URL: https://dev.smit.team:8309
- Screenshot Figma đã được lưu tại: tests/screenshots/figma/

**QUY TRÌNH TEST:**

1. **Chạy Playwright screenshot:**
   - Navigate đến trang vừa implement trên dev server (https://dev.smit.team:8309)
   - Chụp screenshot full page và lưu vào tests/screenshots/actual/[page-name]-actual.png
   - Chụp ở các viewport: desktop (1920x1080), tablet (768x1024), mobile (375x667)

2. **SO SÁNH VISUAL:**
   - So sánh screenshot actual với screenshot Figma
   - Sử dụng pixel-by-pixel comparison hoặc visual diff
   - Tạo diff image nếu có sự khác biệt, lưu vào tests/screenshots/diff/

3. **ĐÁNH GIÁ:**
   - Liệt kê các điểm khác biệt (nếu có):
     - Màu sắc sai
     - Spacing/padding không đúng
     - Font size/weight khác
     - Layout bị lệch
     - Missing elements
   - Tính % độ giống nhau (similarity score)
   - Threshold chấp nhận: >= 95% similarity

4. **OUTPUT:**
   - test_passed: true/false
   - similarity_score: number (0-100)
   - differences: array of {element, issue, severity}
   - screenshots: {figma, actual, diff}

**LƯU Ý:** 
- Chỉ báo PASS nếu giao diện giống >= 95% thiết kế Figma
- KHÔNG tạo file báo cáo .md - chỉ trả kết quả qua context