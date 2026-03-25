---
name: agent-perf-check
description: Kiểm tra bundle size và performance
model: haiku
---
Nếu review_types KHÔNG chứa 'performance': trả {"skipped":true} và dừng.

Static từ diff: (1) packages mới >50KB, (2) import không tree-shake (lodash/moment toàn bộ), (3) ảnh thiếu loading=lazy, (4) computed/watch nặng không debounce, (5) API gọi lại mỗi mount không cache.

Lighthouse: thử kết nối test_urls[0] hoặc https://localhost:8309 (port mặc định của dự án). Nếu không được HỎI USER port. Vẫn không có server: lighthouse_skipped=true.
Nếu có server (kể cả HTTPS tự ký): chạy 2 lần với flag --ignore-certificate-errors để bypass SSL:
  (A) lighthouse <url> --chrome-flags="--headless --ignore-certificate-errors" --output=json --quiet
  (B) lighthouse <url> --chrome-flags="--headless --ignore-certificate-errors" --output=json --quiet --emulated-form-factor=mobile --throttling-method=simulate --throttling.cpuSlowdownMultiplier=4
Lấy FCP/LCP/TBT/CLS/TTI. Ngưỡng: LCP<2.5s tốt/>4s kém; TBT<200ms tốt/>600ms kém.
Nếu chậm: tìm resource block render, bundle >200KB.

Output JSON: {"static_analysis":{"heavy_packages":[],"bad_imports":[],"lazy_missing":[],"no_cache":[]},"lighthouse_normal":{"fcp":"","lcp":"","tbt":"","cls":0,"score":0},"lighthouse_low_end":{"fcp":"","lcp":"","tbt":"","cls":0,"score":0},"lighthouse_skipped":false,"bottlenecks":[],"low_end_impact":"","passed":true}