#!/usr/bin/env python3
"""
Chapter validation hook for Agentic AI Book.
Reads a chapter file path from stdin JSON (PostToolUse hook input) and validates
it against the absolute rules from CLAUDE.md.

Exits 0 if clean, prints JSON to stdout with decision=block if violations found.
"""

import json
import re
import sys
from pathlib import Path


def validate_chapter(file_path: str) -> list[str]:
    """Validate a chapter file against CLAUDE.md absolute rules."""
    violations = []
    path = Path(file_path)

    if not path.exists():
        return violations  # File may not exist yet (pre-write check)

    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()

    # --- Check 1: Placeholder text ---
    placeholder_patterns = [
        r"\[insert\s+.*?\]",
        r"\[to be added\]",
        r"\[continued\.\.\.\]",
        r"\[rest of section.*?\]",
        r"\[TODO\]",
        r"\[FIXME\]",
    ]
    for pattern in placeholder_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            violations.append(f"Placeholder text found: matches pattern '{pattern}'")

    # --- Check 2: Banned phrases ---
    banned_phrases = [
        "it is worth noting that",
        "in this section we will",
        "in conclusion",
    ]
    for phrase in banned_phrases:
        if phrase.lower() in content.lower():
            violations.append(f"Banned phrase: '{phrase}'")

    # --- Check 3: Minimum Python code blocks ---
    python_blocks = content.count("```python")
    if python_blocks < 2:
        violations.append(
            f"Only {python_blocks} Python code block(s) found (minimum 2 required)"
        )

    # --- Check 4: Math notation ---
    # \cdot used for matrix multiplication (bad) — flag \cdot near capital letters
    bad_cdot = re.findall(r"\$[A-Z][a-zA-Z_]*\s*\\cdot", content)
    if bad_cdot:
        violations.append(
            f"\\cdot used for matrix multiplication (use juxtaposition): {bad_cdot[0]}"
        )

    # q \cdot k for dot products (bad)
    if re.search(r"q\s*\\cdot\s*k", content):
        violations.append("q \\cdot k found (use q^\\top k for dot products)")

    # Bare * for element-wise products in math mode (bad)
    for i, line in enumerate(lines, 1):
        if "$" in line and "*" in line and "\\odot" not in line:
            if re.search(r"\$[a-zA-Z_]+\s*\*\s*[a-zA-Z_]+.*\$", line):
                violations.append(
                    f"Bare * for element-wise product on line {i} (use \\odot)"
                )

    # --- Check 5: YAML frontmatter ---
    if not content.startswith("---"):
        violations.append("Missing YAML frontmatter (must start with ---)")
    else:
        fm_end = content.find("---", 3)
        if fm_end == -1:
            violations.append("YAML frontmatter not properly closed")
        else:
            frontmatter = content[3:fm_end]
            if "title:" not in frontmatter:
                violations.append("YAML frontmatter missing 'title:'")
            if "chapter:" not in frontmatter and "part:" not in frontmatter:
                violations.append("YAML frontmatter missing 'chapter:' or 'part:'")

    # --- Check 6: SVG text element attributes ---
    svg_texts = re.findall(r"<text[^>]*>", content)
    for text_tag in svg_texts:
        if "font-family" not in text_tag:
            violations.append(f"SVG <text> missing font-family: {text_tag[:60]}")
        if "font-size" not in text_tag:
            violations.append(f"SVG <text> missing font-size: {text_tag[:60]}")
        if "fill" not in text_tag:
            violations.append(f"SVG <text> missing fill: {text_tag[:60]}")

    # --- Check 7: Figure captions ---
    diagrams = re.findall(r"(```mermaid|<svg)", content)
    figcaptions = content.count("<figcaption>")
    if len(diagrams) > 0 and figcaptions < len(diagrams):
        violations.append(
            f"{len(diagrams)} diagram(s) but only {figcaptions} <figcaption>(s)"
        )

    return violations


def main():
    # Read hook input JSON from stdin
    try:
        hook_input = json.load(sys.stdin)
    except json.JSONDecodeError:
        # No input or bad JSON — exit silently
        sys.exit(0)

    tool_name = hook_input.get("tool_name", "")
    if tool_name not in ("Write", "Edit"):
        sys.exit(0)

    file_path = hook_input.get("tool_input", {}).get("file_path", "")
    if not file_path:
        sys.exit(0)

    # Only validate chapter files
    if not re.search(r"chapters/ch\d+\.md$", file_path):
        sys.exit(0)

    violations = validate_chapter(file_path)

    if violations:
        reason = "Chapter validation failed:\n" + "\n".join(
            f"  - {v}" for v in violations
        )
        output = {
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "decision": "block",
                "additionalContext": reason,
            }
        }
        print(json.dumps(output))
        sys.exit(0)  # decision=block in JSON, not exit 2

    sys.exit(0)


if __name__ == "__main__":
    main()
