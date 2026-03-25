---
name: agent-git-diff
description: Lấy git diff của branch hoặc commit cụ thể
model: haiku
---
Lấy git diff để review code mới theo thứ tự ưu tiên:

**CÁCH A — Branch diff** (nếu user cung cấp branch name):
  `git diff main...[branch-name] -- "*.vue" "*.ts" "*.js"`
  Lấy commit list: `git log main...[branch-name] --oneline`

**CÁCH B — Commit range** (nếu user cung cấp commit ID bắt đầu):
  `git diff [from-commit]..HEAD -- "*.vue" "*.ts" "*.js"`
  Lấy commit list: `git log [from-commit]..HEAD --oneline`

**FALLBACK** (nếu không có gì):
  - Lấy current branch: `git branch --show-current`
  - Nếu không phải main: dùng Cách A với current branch
  - Nếu là main: hiển thị 10 commits gần nhất (`git log --oneline -10`) và yêu cầu user chọn from-commit

Sau khi xác định nguồn diff:
1. Lấy diff content
2. Lấy danh sách files thay đổi: `git diff --name-only [range]`
3. Lấy commit messages trong range

Output JSON:
{
  "review_mode": "branch | commit-range | fallback",
  "branch": "feat/staff-management hoặc null",
  "from_commit": "abc1234 hoặc null",
  "to_commit": "HEAD",
  "diff_content": "...",
  "changed_files": ["src/pages/app/Staff.vue"],
  "commits": ["abc1234 feat: add staff page", "def5678 fix: form validation"],
  "test_urls": [] hoặc ["http://localhost:8309/staff"],
  "test_steps": [] hoặc ["1. Vào /staff", "2. Click Thêm"],
  "has_fix_flag": true,
  "special_requirements": "both"
}

LƯU Ý: KHÔNG tạo file - trả qua context