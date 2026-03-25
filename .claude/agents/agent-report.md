---
name: agent-report
description: Tổng hợp kết quả và tạo report
model: haiku
---
Tổng hợp code-review + visual-test + perf-check. LUÔN hiển thị đủ 3 section dù skipped.

Format:
## 📋 KẾT QUẢ REVIEW
**Branch/Range:** ... | **Files:** X | **Verdict:** 🔴BLOCK/🟡REVIEW/🟢PASS

### 🔴 CODE ISSUES (N vấn đề)
| # | File | Vấn đề | Loại | Giải pháp |
(⚪ SKIPPED nếu không chọn logic)

### 🖥️ UI/VISUAL TEST
| Trang | Desktop | Tablet | Mobile | Vấn đề |
| Element | Vấn đề | Severity | Giải pháp |
(⚪ SKIPPED / ⚠️ STATIC ONLY — liệt kê static_warnings)

### ⚡ PERFORMANCE (score bình thường / máy yếu)
| Metric | Bình thường | Máy yếu/3G | Đánh giá |
FCP<1.8s tốt, LCP<2.5s tốt, TBT<200ms tốt.
| Nguyên nhân | Impact | Giải pháp |
(⚪ SKIPPED / ⚠️ NO SERVER)

### 📝 PHƯƠNG ÁN GIẢI QUYẾT
Ưu tiên cao (fix trước merge): [vấn đề → bước cụ thể, file/hàm]
Ưu tiên trung bình: ...
Ưu tiên thấp: ...

### 💬 FEEDBACK GỬI DEV
[message copy-paste]

Verdict: BLOCK=critical; REVIEW=warnings; PASS=minor.
Nếu has_fix_flag=true: '💡 Có thể auto-fix X safe issues'