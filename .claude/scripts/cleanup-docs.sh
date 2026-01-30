#!/bin/bash
# Cleanup docs folder - giữ lại ĐÚNG 7 files chuẩn

set -e

# Chuyển đến thư mục docs
cd "$(dirname "$0")/../../docs" || exit 1

echo "🧹 Bắt đầu cleanup docs folder..."

# Danh sách 7 files chuẩn
STANDARD_FILES=(
    "project-overview-pdr.md"
    "code-standards.md"
    "codebase-summary.md"
    "design-guidelines.md"
    "deployment-guide.md"
    "system-architecture.md"
    "project-roadmap.md"
)

# Đếm files trước khi cleanup
BEFORE_COUNT=$(find . -maxdepth 1 -type f | wc -l | tr -d ' ')
echo "📊 Trước cleanup: $BEFORE_COUNT files"

# Xóa tất cả files .md NGOẠI TRỪ 7 files chuẩn
DELETED_COUNT=0
shopt -s nullglob  # Tránh lỗi khi không có files *.md
for file in *.md; do
    # Kiểm tra nếu file KHÔNG nằm trong danh sách chuẩn
    if [[ ! " ${STANDARD_FILES[@]} " =~ " ${file} " ]]; then
        echo "  🗑️  Xóa: $file"
        rm -f "$file"
        ((DELETED_COUNT++))
    fi
done
shopt -u nullglob  # Disable nullglob

# Xóa các files non-markdown (txt, json, etc.)
for ext in txt json xml yaml yml; do
    if ls *."$ext" 1> /dev/null 2>&1; then
        echo "  🗑️  Xóa files .$ext"
        rm -f *."$ext"
        ((DELETED_COUNT++))
    fi
done

# Đếm files sau cleanup
AFTER_COUNT=$(find . -maxdepth 1 -type f -name "*.md" | wc -l | tr -d ' ')
echo "📊 Sau cleanup: $AFTER_COUNT files"

# Verify
if [ "$AFTER_COUNT" -eq 7 ]; then
    echo "✅ Cleanup thành công! Còn lại đúng 7 files chuẩn:"
    ls -1 *.md
elif [ "$AFTER_COUNT" -lt 7 ]; then
    echo "⚠️  Warning: Chỉ còn $AFTER_COUNT/7 files. Thiếu files:"
    for file in "${STANDARD_FILES[@]}"; do
        if [[ ! -f "$file" ]]; then
            echo "  ❌ $file"
        fi
    done
    echo "💡 Chạy /docs:init để tạo lại files thiếu"
else
    echo "❌ Error: Vẫn còn $AFTER_COUNT files (> 7). Vui lòng kiểm tra thủ công."
    ls -1 *.md
fi

echo ""
echo "📈 Tóm tắt: Đã xóa $DELETED_COUNT files"
