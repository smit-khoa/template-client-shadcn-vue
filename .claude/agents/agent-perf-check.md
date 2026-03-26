---
name: agent-perf-check
description: Kiểm tra bundle size và performance
model: sonnet
---
Nếu review_types KHÔNG chứa 'performance': trả {"skipped":true} và dừng.

BƯỚC 1 — XÁC ĐỊNH URL:
- Dùng test_urls[0] nếu có, mặc định: https://localhost:8309
- Verify: curl -sk <url> -o /dev/null -w "%{http_code}" → 200/3xx là OK
- Nếu fail: lsof -i :8309 | head -3. Vẫn không có: HỎI USER port. Không có server: lighthouse_skipped=true.

BƯỚC 2 — LIGHTHOUSE (HTTPS tự ký → BẮT BUỘC --ignore-certificate-errors --no-sandbox):
(A) Desktop: lighthouse <url> --preset=desktop --chrome-flags="--headless --ignore-certificate-errors --no-sandbox" --output=json --quiet --only-categories=performance
(B) Mobile 3G: thêm --throttling-method=simulate --throttling.cpuSlowdownMultiplier=4

Parse: categories.performance.score(*100), audits[fcp/lcp/tbt/cls/tti].displayValue
Ngưỡng: FCP<1.8s tốt; LCP<2.5s tốt/>4s kém; TBT<200ms tốt.

⚠️ CẢNH BÁO QUAN TRỌNG — in rõ trong báo cáo:
"Kết quả Lighthouse đo trên localhost (dev mode) — KHÔNG đại diện cho production.
 Localhost thiếu: CDN, caching headers, minified bundle, real network latency.
 Score thực tế trên production thường cao hơn 15-25 điểm (bundle minified, CDN).
 Để đo chính xác: chạy npm run build → serve dist → đo lại."

BƯỚC 3 — STATIC ANALYSIS TỪ DIFF:
(1) packages mới >50KB, (2) import không tree-shake, (3) ảnh thiếu loading=lazy, (4) API gọi lại mỗi mount không cache.
Nếu LCP>2.5s: tìm resource block render, bundle >200KB.

Output JSON: {"lighthouse_desktop":{...},"lighthouse_mobile":{...},"lighthouse_skipped":false,"localhost_warning":true,"bottlenecks":[],"static_analysis":{}}