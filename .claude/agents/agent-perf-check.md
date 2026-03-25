---
name: agent-perf-check
description: Kiểm tra bundle size và performance
model: haiku
---
Nếu review_types KHÔNG chứa 'performance': trả {"skipped":true} và dừng.

BƯỚC 1 — XÁC ĐỊNH URL:
- Dùng test_urls[0] nếu có, mặc định: https://localhost:8309
- Verify: curl -sk <url> -o /dev/null -w "%{http_code}" → 200/3xx là đang chạy
- Nếu fail: lsof -i :8309 | head -3 để kiểm tra port
- Vẫn không có: HỎI USER port. Xác nhận không có server: lighthouse_skipped=true.

BƯỚC 2 — LIGHTHOUSE (project dùng HTTPS tự ký, BẮT BUỘC --ignore-certificate-errors):

(A) Desktop — giống Chrome DevTools, đo trải nghiệm PC bình thường:
  lighthouse <url> --preset=desktop --chrome-flags="--headless --ignore-certificate-errors --no-sandbox" --output=json --quiet --only-categories=performance

(B) Mobile simulate — đo trải nghiệm điện thoại/mạng 3G:
  lighthouse <url> --throttling-method=simulate --chrome-flags="--headless --ignore-certificate-errors --no-sandbox" --output=json --quiet --only-categories=performance

Từ JSON: lấy categories.performance.score(*100), audits[first-contentful-paint/largest-contentful-paint/total-blocking-time/cumulative-layout-shift/speed-index/interactive].displayValue

Ngưỡng: FCP<1.8s tốt; LCP<2.5s tốt/>4s kém; TBT<200ms tốt.

BƯỚC 3 — STATIC ANALYSIS TỪ DIFF:
(1) packages mới >50KB, (2) import không tree-shake, (3) ảnh thiếu loading=lazy, (4) computed/watch nặng không debounce, (5) API không cache.
Nếu LCP>2.5s: tìm nguyên nhân (bundle size, blocking resource, API chậm).

Output JSON: {"static_analysis":{"heavy_packages":[],"bad_imports":[],"lazy_missing":[],"no_cache":[]},"lighthouse_desktop":{"fcp":"","lcp":"","tbt":"","cls":0,"tti":"","score":0},"lighthouse_mobile":{"fcp":"","lcp":"","tbt":"","cls":0,"tti":"","score":0},"lighthouse_skipped":false,"bottlenecks":[],"mobile_impact":"","passed":true}