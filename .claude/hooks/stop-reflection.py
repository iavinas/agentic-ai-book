# #!/usr/bin/env python3
# """
# Stop reflection hook for Agentic AI Book.
# Runs at the end of a Claude turn, validates any modified chapters,
# and provides a session reflection summary.
# """

# import json
# import re
# import subprocess
# import sys
# from pathlib import Path


# def get_modified_chapters(project_dir: Path) -> list[str]:
#     """Find chapter files modified in the working tree compared to HEAD."""
#     try:
#         result = subprocess.run(
#             ["git", "diff", "--name-only", "HEAD"],
#             cwd=project_dir,
#             capture_output=True,
#             text=True,
#             check=True,
#         )
#         files = result.stdout.strip().splitlines()
#         return [f for f in files if re.search(r"chapters/ch\d+\.md$", f)]
#     except subprocess.CalledProcessError:
#         return []


# def get_word_count(file_path: Path) -> int:
#     try:
#         result = subprocess.run(
#             ["wc", "-w", str(file_path)],
#             capture_output=True,
#             text=True,
#             check=True,
#         )
#         return int(result.stdout.strip().split()[0])
#     except (subprocess.CalledProcessError, ValueError):
#         return 0


# def validate_chapter_quick(file_path: Path) -> list[str]:
#     """Lightweight validation for stop hook — checks critical rules only."""
#     violations = []
#     content = file_path.read_text(encoding="utf-8")

#     # Placeholder text
#     if re.search(r"\[(insert|to be added|continued\.\.\.|TODO|FIXME).*?\]", content, re.IGNORECASE):
#         violations.append("Placeholder text found")

#     # Banned phrases
#     banned = ["it is worth noting that", "in this section we will", "in conclusion"]
#     for phrase in banned:
#         if phrase.lower() in content.lower():
#             violations.append(f"Banned phrase: '{phrase}'")

#     # Minimum Python blocks
#     if content.count("```python") < 2:
#         violations.append("Fewer than 2 Python code blocks")

#     return violations


# def main():
#     try:
#         hook_input = json.load(sys.stdin)
#     except json.JSONDecodeError:
#         hook_input = {}

#     # Prevent infinite loops: if this hook already fired this turn, exit
#     if hook_input.get("stop_hook_active") is True:
#         sys.exit(0)

#     project_dir = Path(hook_input.get("cwd", Path.cwd()))
#     chapters_dir = project_dir / "chapters"

#     modified = get_modified_chapters(project_dir)

#     if not modified:
#         # No chapters modified — silent exit
#         sys.exit(0)

#     lines = ["Session reflection — modified chapters:"]
#     all_clean = True

#     for rel_path in modified:
#         file_path = project_dir / rel_path
#         name = file_path.name
#         words = get_word_count(file_path)
#         violations = validate_chapter_quick(file_path)

#         if violations:
#             all_clean = False
#             lines.append(f"  {name}: {words} words — ISSUES:")
#             for v in violations:
#                 lines.append(f"    - {v}")
#         else:
#             lines.append(f"  {name}: {words} words — OK")

#     if not all_clean:
#         # Block and force fixes
#         output = {
#             "hookSpecificOutput": {
#                 "hookEventName": "UserPromptSubmit",
#                 "additionalContext": "\n".join(lines),
#                 "decision": "block",
#             }
#         }
#         print(json.dumps(output))
#         sys.exit(0)

#     # All clean — provide reflection summary
#     lines.append("")
#     lines.append("All chapter checks passed. Consider:")
#     lines.append("  • Were any new patterns encountered that should go into CLAUDE.md?")
#     lines.append("  • Should the chapter memory files be updated?")

#     output = {
#         "hookSpecificOutput": {
#             "hookEventName": "UserPromptSubmit",
#             "additionalContext": "\n".join(lines),
#         }
#     }
#     print(json.dumps(output))
#     sys.exit(0)


# if __name__ == "__main__":
#     main()
