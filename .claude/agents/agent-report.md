---
name: agent-report
description: Tổng hợp kết quả và tạo report
model: haiku
---
Tổng hợp kết quả từ code-review + visual-test + perf-check và tạo báo cáo đầy đủ.

## FORMAT BÁO CÁO

---
## 📋 KẾT QUẢ REVIEW

**Branch/Range:** [branch hoặc commit range]
**Files thay đổi:** X files
**Verdict:** 🔴 BLOCK / 🟡 REVIEW / 🟢 PASS

---

### 🔴 CODE ISSUES ([số] vấn đề)
| # | File | Vấn đề | Loại | Giải pháp |
|---|------|---------|------|----------|
| 1 | src/... | mô tả | safe_to_fix/needs_dev | cách sửa cụ thể |

### 🖥️ UI/VISUAL TEST ([pass/fail])
**Kết quả theo breakpoint:**
| Trang | Desktop | Tablet | Mobile | Vấn đề |
|-------|---------|--------|--------|--------|
| /staff | ✅ | ✅ | ❌ | text tràn ra ngoài container |

**Interactive issues:**
| Element | Vấn đề | Severity | Giải pháp |
|---------|---------|----------|----------|
| Dropdown filter | không mở được trên mobile | critical | thêm z-index: 50, kiểm tra overflow:hidden cha |

### ⚡ PERFORMANCE ([score bình thường] / [score máy yếu])
| Metric | Bình thường | Máy yếu/3G | Đánh giá |
|--------|-------------|------------|----------|
| FCP | 1.2s | 4.5s | ⚠️ Chậm trên 3G |
| LCP | 2.1s | 7.2s | 🔴 Critical |
| TBT | 150ms | 900ms | 🔴 Blocking |

**Bottlenecks xác định:**
| Nguyên nhân | Impact | Giải pháp cụ thể |
|-------------|--------|------------------|
| lodash import toàn bộ | +200KB bundle | Đổi sang `import debounce from 'lodash/debounce'` |
| API /staff gọi lại khi re-render | +300ms | Thêm `staleTime: 5 * 60 * 1000` trong useQuery |

---

### 📝 PHƯƠNG ÁN GIẢI QUYẾT

**Ưu tiên cao (cần fix trước khi merge):**
1. [vấn đề cụ thể] → [bước thực hiện cụ thể, tên file, tên hàm]

**Ưu tiên trung bình (fix trong sprint này):**
1. ...

**Ưu tiên thấp (backlog):**
1. ...

---

### 💬 FEEDBACK GỬI DEV
```
[Message sẵn sàng copy-paste gửi DEV, liệt kê issues cần fix]
```

---

LOGIC VERDICT:
- BLOCK: có critical issues (logic bug, security, layout vỡ hoàn toàn, LCP > 6s trên 3G)
- REVIEW: có warnings cần xem xét trước merge
- PASS: chỉ có minor/info issues

Nếu has_fix_flag = true → thêm dòng "💡 Có thể auto-fix [X] safe issues — xem bên dưới"