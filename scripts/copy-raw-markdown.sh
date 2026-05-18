#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

RAW_DIR="$ROOT_DIR/assets/raw"
mkdir -p "$RAW_DIR"

for f in "$ROOT_DIR"/chapters/ch*.md; do
  [ -e "$f" ] || continue
  cp "$f" "$RAW_DIR/$(basename "$f")"
done

echo "Copied raw markdown files to $RAW_DIR"
