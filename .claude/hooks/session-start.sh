#!/bin/bash
# Session start hook for Agentic AI Book
# Provides dynamic project context at the beginning of every session

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CHAPTERS_DIR="$PROJECT_DIR/chapters"

echo "=== Agentic AI Book — Session Context ==="
echo ""

# Count chapters and words
if [ -d "$CHAPTERS_DIR" ]; then
    chapter_count=$(find "$CHAPTERS_DIR" -maxdepth 1 -name 'ch*.md' | wc -l | tr -d ' ')
    echo "Chapters on disk: $chapter_count"
    echo ""

    # Show word counts for each chapter
    for f in "$CHAPTERS_DIR"/ch*.md; do
        if [ -f "$f" ]; then
            name=$(basename "$f")
            words=$(wc -w < "$f" | tr -d ' ')
            if [ "$words" -lt 3000 ]; then
                echo "  $name: ${words} words INCOMPLETE"
            else
                echo "  $name: ${words} words"
            fi
        fi
    done
    echo ""
fi

# Show recent git activity
if git -C "$PROJECT_DIR" rev-parse --git-dir > /dev/null 2>&1; then
    latest_commit=$(git -C "$PROJECT_DIR" log --oneline -1 2>/dev/null || true)
    if [ -n "$latest_commit" ]; then
        echo "Latest commit: $latest_commit"
        echo ""
    fi
fi

# Absolute rules reminder
echo "Absolute rules reminder:"
echo "  • No placeholder text ([insert ...], [to be added], [continued...])"
echo "  • No truncation — write the whole chapter in one pass"
echo "  • Minimum 2 Python code blocks per chapter"
echo "  • Banned phrases: 'it is worth noting that', 'in this section we will', 'in conclusion'"
echo "  • Math: juxtaposition for matrix multiply, \\odot for element-wise, ^\\top for dot products"
echo "  • Never use \\cdot for matrix multiplication or q \\cdot k for dot products"
echo "  • Never save chapters anywhere other than chapters/chNN.md"
echo ""
