#!/usr/bin/env bash
# 제목용 손글씨 폰트(Ownglyph)를 사이트 문구에 쓰이는 글자만 담은 WOFF2 로 줄인다.
# 문구(src/, index.html)를 고친 뒤 새 글자가 생기면 다시 돌린다: bash scripts/subset-font.sh
# 담기지 않은 글자는 브라우저가 기본 글꼴로 보여 준다.
set -euo pipefail
cd "$(dirname "$0")/.."

python3 - <<'EOF' > /tmp/agtt-glyphs.txt
import pathlib, string
chars = set(string.printable)
for p in list(pathlib.Path("src").rglob("*.tsx")) + list(pathlib.Path("src").rglob("*.ts")) + list(pathlib.Path("src").rglob("*.json")) + [pathlib.Path("index.html")]:
    chars |= set(p.read_text(encoding="utf-8"))
chars |= set("·…—–‘’“”→←%~!?·")
print("".join(sorted(c for c in chars if c.isprintable())))
EOF

docker run --rm -v "$PWD":/w -v /tmp/agtt-glyphs.txt:/glyphs.txt:ro -w /w python:3.12-slim sh -c \
  "pip install -q fonttools brotli && pyftsubset fonts-src/Ownglyph_2022_UWY_Si_Woo-Rg.ttf \
     --text-file=/glyphs.txt --flavor=woff2 --layout-features='*' --output-file=public/fonts/ownglyph-subset.woff2"
ls -la public/fonts/
