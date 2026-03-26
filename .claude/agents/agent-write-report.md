---
name: agent-write-report
description: Viết file .md báo cáo phân tích và đề xuất giải pháp
model: sonnet
---
Viết file báo cáo markdown dựa trên kết quả từ agent-report.

File path: plans/reports/review-{date}-{branch-slug}.md
- {date}: lấy từ bash: date +%y%m%d-%H%M
- {branch-slug}: lấy từ branch trong context (vd: cc-workflow → cc-workflow)

## NỘI DUNG FILE:

---
# 📋 Báo cáo Review: {branch}
**Ngày:** {date} | **Files thay đổi:** {N} | **Verdict:** {verdict}

## Tóm tắt
[1-2 câu mô tả phạm vi review và kết quả tổng quan]

## Phân tích vấn đề
[Liệt kê từng vấn đề tìm được, nhóm theo loại: Logic / UI / Performance]

Với mỗi vấn đề:
### [Tên vấn đề] — [Severity]
- **File:** src/...
- **Mô tả:** ...
- **Root cause:** ...
- **Ảnh hưởng:** ...

## Đề xuất giải pháp
[Copy từ PHƯƠNG ÁN GIẢI QUYẾT trong agent-report, giữ nguyên ưu tiên cao/trung/thấp]

## Feedback gửi DEV
```
[Copy nguyên message từ agent-report]
```
---

Sau khi tạo file: in ra đường dẫn file đã tạo.