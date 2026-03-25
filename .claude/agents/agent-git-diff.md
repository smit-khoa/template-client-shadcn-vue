---
name: agent-git-diff
description: Lấy git diff của branch hoặc commit cụ thể
model: haiku
---
Lấy git diff để review code mới theo thứ tự ưu tiên:

**CÁCH A — Branch diff** (nếu user cung cấp branch name):
  `git diff main...[branch-name] -- "*.vue" "*.ts" "*.js"`
  `git log main...[branch-name] --oneline`

**CÁCH B — Commit range** (nếu user cung cấp commit ID bắt đầu):
  `git diff [from-commit]..HEAD -- "*.vue" "*.ts" "*.js"`
  `git log [from-commit]..HEAD --oneline`

**FALLBACK** (nếu không có gì):
  - `git branch --show-current`
  - Nếu không phải main: dùng Cách A với current branch
  - Nếu là main: hiển thị 10 commits gần nhất, yêu cầu user chọn

Sau khi lấy diff:
1. `git diff --name-only [range]` → danh sách files thực tế thay đổi
2. Lấy commit messages

**QUAN TRỌNG — Map changed_files → URLs bằng router thực tế:**
- Đọc file `src/router/index.ts` (hoặc index.js)
- Parse tất cả routes: { path, component } để lấy mapping component→URL
- Với mỗi file trong changed_files:
  a. Nếu là page (src/pages/...): tìm path trong router khớp component đó
  b. Nếu là component (src/components/...): tìm tất cả pages import component đó, rồi map sang URL
  c. Nếu là layout (src/layout/...): lấy tất cả URL của routes dùng layout đó
  d. Nếu là store/composable: tìm pages dùng nó, map sang URL
- Kết quả: inferred_urls là list URL thực từ router, KHÔNG hardcode, loại trùng

Output JSON (điền giá trị thực từ diff, không dùng ví dụ):
{
  "review_mode": "branch | commit-range | fallback",
  "branch": null,
  "from_commit": null,
  "diff_content": "<nội dung diff thực>",
  "changed_files": ["<file thực từ git diff>"],
  "inferred_urls": ["<URL thực từ router>"],
  "commits": ["<commit thực>"],
  "test_urls": ["<URL user cung cấp nếu có>"],
  "test_steps": ["<bước user cung cấp nếu có>"],
  "has_fix_flag": false,
  "review_types": ["logic"]
}

review_types từ câu [1/4]: 1→["logic"], 2→["ui"], 3→["performance"], 4/không chọn→["logic","ui","performance"]
KHÔNG tạo file - trả qua context