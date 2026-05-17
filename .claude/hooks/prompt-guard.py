#!/usr/bin/env python3
"""
UserPromptSubmit hook for Agentic AI Book.
Detects chapter-writing or review prompts and injects mandatory pre-work reminders.
"""

import json
import re
import sys


def main():
    try:
        hook_input = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    prompt = hook_input.get("prompt", "")
    if not prompt:
        sys.exit(0)

    reminders = []

    # Detect "write chapter X" or "draft chapter X"
    if re.search(r"\b(write|draft)\b.*\bchapter\s+(\d+)", prompt, re.IGNORECASE):
        ch_num = re.search(r"\bchapter\s+(\d+)", prompt, re.IGNORECASE).group(2)
        reminders.append(
            f"REMINDER: Before writing chapter {ch_num}, you MUST read:"
            f"\n  1. agentic-ai-toc.md (source of truth for content)"
            f"\n  2. agentic-ai-references/ch{int(ch_num):02d}-*.md (source of truth for references)"
            f"\n  3. .claude/skills/write-chapter.md (full writing protocol)"
            f"\n  4. CLAUDE.md (absolute rules)"
        )

    # Detect "review chapter X"
    if re.search(r"\breview\b.*\bchapter\s+(\d+)", prompt, re.IGNORECASE):
        ch_num = re.search(r"\bchapter\s+(\d+)", prompt, re.IGNORECASE).group(2)
        reminders.append(
            f"REMINDER: Before reviewing chapter {ch_num}, you MUST read:"
            f"\n  1. agentic-ai-toc.md (expected content)"
            f"\n  2. agentic-ai-references/ch{int(ch_num):02d}-*.md (expected references)"
            f"\n  3. .claude/skills/review-chapter.md (full review protocol)"
            f"\n  4. chapters/ch{int(ch_num):02d}.md (the actual chapter)"
        )

    # Detect generic "write chapter" without a number — still remind
    if re.search(r"\b(write|draft)\b.*\bchapter\b", prompt, re.IGNORECASE) and not re.search(r"\bchapter\s+\d+", prompt, re.IGNORECASE):
        reminders.append(
            "REMINDER: Before writing any chapter, you MUST read:"
            "\n  1. agentic-ai-toc.md (source of truth for content)"
            "\n  2. The matching agentic-ai-references/chNN-*.md file"
            "\n  3. .claude/skills/write-chapter.md (full writing protocol)"
            "\n  4. CLAUDE.md (absolute rules)"
        )

    if reminders:
        print("\n\n".join(reminders))

    sys.exit(0)


if __name__ == "__main__":
    main()
