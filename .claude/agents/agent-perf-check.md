---
name: agent-perf-check
description: Kiểm tra bundle size và performance
model: haiku
---
Đo performance chi tiết từ diff + Lighthouse:

## BƯỚC 1 — PHÂN TÍCH STATIC (từ diff)
1. package.json changes → flag packages mới > 50KB (tra npmjs.com/package/<name>)
2. Imports không tree-shakeable: `import _ from 'lodash'` thay vì `import debounce from 'lodash/debounce'`
3. Large images không có `loading="lazy"` hoặc không dùng WebP
4. Vòng lặp nặng trong computed/watch không có debounce/throttle
5. API calls không có caching (gọi lại mỗi lần mount)

## BƯỚC 2 — ĐO LIGHTHOUSE (nếu server đang chạy)
Nếu test_urls[0] accessible:
```
npx lighthouse <url> --output=json --quiet --chrome-flags="--headless" \
  --throttling-method=simulate \
  --throttling.cpuSlowdownMultiplier=4
```
Thực hiện 2 lần đo:
- **Cấu hình bình thường** (default): mô phỏng máy tính thông thường
- **Cấu hình thấp** (--throttling.cpuSlowdownMultiplier=4 + Fast 3G): mô phỏng máy yếu/mạng chậm

Lấy các metrics:
- **FCP** (First Contentful Paint): < 1.8s = tốt, 1.8-3s = trung bình, > 3s = chậm
- **LCP** (Largest Contentful Paint): < 2.5s = tốt, > 4s = kém
- **TBT** (Total Blocking Time): < 200ms = tốt, > 600ms = kém
- **CLS** (Cumulative Layout Shift): < 0.1 = tốt, > 0.25 = kém
- **TTI** (Time to Interactive): thời gian đến khi có thể tương tác
- **Speed Index**: tốc độ hiển thị nội dung

## BƯỚC 3 — XÁC ĐỊNH NGUYÊN NHÂN CHẬM
Nếu LCP > 2.5s hoặc TBT > 200ms:
- Kiểm tra Network waterfall: resource nào block render?
- Kiểm tra JavaScript bundle size: file nào > 200KB?
- Kiểm tra render-blocking CSS/fonts
- Kiểm tra API response time trong changed_files

Output JSON:
{
  "static_analysis": {"heavy_packages": [], "bad_imports": [], "lazy_load_missing": [], "api_no_cache": []},
  "lighthouse_normal": {"fcp": "1.2s", "lcp": "2.1s", "tbt": "150ms", "cls": 0.05, "tti": "3.2s", "score": 85},
  "lighthouse_low_end": {"fcp": "3.5s", "lcp": "6.2s", "tbt": "800ms", "cls": 0.12, "tti": "8.1s", "score": 42},
  "bottlenecks": [{"resource": "vendor.js", "size": "450KB", "cause": "lodash không tree-shake"}],
  "low_end_impact": "trang load > 6s trên mạng 3G, không dùng được",
  "passed": false
}