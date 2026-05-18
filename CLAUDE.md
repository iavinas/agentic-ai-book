# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on the **Agentic AI Book** in this repository.

## Quick Reference

- **Primary command**: `write chapter X` — produces `chapters/chXX.md`
- **Review command**: `review chapter X` — audits `chapters/chXX.md`
- **Source of truth for chapter content**: `agentic-ai-toc.md` (read before every chapter)
- **Source of truth for references**: `agentic-ai-references/chXX-*.md` (read before writing/reviewing)
- **Preview**: open any `chapters/chNN.md` in a Markdown renderer (VS Code, Obsidian, GitHub, MkDocs)
- **Format**: Markdown with YAML frontmatter, KaTeX math, Prism-highlighted code, Mermaid/ASCII/SVG diagrams
- **GitHub Pages**: The entire book renders as a static site via Jekyll. Push to GitHub Pages to publish.

## File and Project Structure

```
agentic-ai-book/
├── _config.yml                ← Jekyll / GitHub Pages configuration
├── _layouts/
│   ├── default.html           ← base HTML layout (KaTeX, styles)
│   └── chapter.html           ← chapter layout with prev/next nav
├── index.md                   ← homepage / table of contents
├── CLAUDE.md                  ← this file (high-level conventions only)
├── .claude/skills/            ← detailed protocols loaded on demand
│   ├── write-chapter.md       ← full writing protocol, style guide, math, diagrams, code rules
│   └── review-chapter.md      ← full review protocol, correctness checks, execution
├── agentic-ai-toc.md          ← source of truth for chapter titles/subtopics
├── agentic-ai-references/     ← per-chapter reference files (74 files)
│   ├── ch01-why-agents.md
│   ├── ch02-agent-loop.md
│   └── ...
├── chapters/
│   ├── ch01.md
│   ├── ch02.md
│   └── ...
├── appendices/
│   ├── appendix-a.md
│   └── ...
└── assets/
    └── diagrams/              ← shared diagram assets if needed
```

When writing chapter N, the output file is `chapters/chNN.md` (zero-padded to 2 digits).

Jekyll emits chapter pages at `/chapters/chNN.html`. A sibling link like `../ch02/` resolves from that file URL to `/ch02/` (wrong). Use `/chapters/chNN.html` so `relative_url` prepends `baseurl` correctly.

## Build & Publish

Before running `jekyll build` or `jekyll serve`, update the raw markdown assets so the "Copy markdown" button works:

```bash
./scripts/copy-raw-markdown.sh
```

This copies every `chapters/ch*.md` into `assets/raw/` so Jekyll serves them as static files. Commit the generated `assets/raw/` files when publishing to GitHub Pages.

## High-Level Conventions

### Chapter output
- Every chapter is a single file. No truncation. No placeholder text.
- Target length: 3,000–6,000 words plus diagrams.
- Every chapter must include at least 2 executable Python code blocks (more for project chapters).

### Style at a glance
- Intuition before formalism. Never open a section with an equation.
- Short paragraphs (3–5 sentences). One idea per paragraph.
- Bold a term exactly once on first introduction. Never bold for emphasis.
- No filler: never write "it is worth noting that", "in this section we will", "in conclusion".

### Math notation at a glance
| Operation | Symbol | Example |
|---|---|---|
| Matrix multiply | juxtaposition | `$QK^\top$` |
| Element-wise | `\odot` | `$f_t \odot c_{t-1}$` |
| Dot product | `a^\top b` | `$q_i^\top k_j$` |
| Scalar × anything | juxtaposition or `\cdot` | `$\alpha x$` |
| Shape/count | `\times` | `$\mathbb{R}^{n \times d_k}$` |

### Code at a glance
- Ch 1–2: pure Python. Ch 3+: PyTorch welcome. Project chapters: pure PyTorch only.
- Never use `transformers.AutoModel` or `transformers.Trainer` for model code.
- HuggingFace `datasets` allowed for data loading only.
- Every code block needs a 1-sentence prose lead-in and shape comments on key tensors.

### Diagrams at a glance
- Minimum per chapter varies by Part ( Foundations 4, Single-Agent 3, Planning 4, Multi-Agent 4, Memory 3, Infrastructure 4, Domains 3, Safety 4).
- Every figure needs a `<figcaption>`.
- SVGs need `font-family`, `font-size`, `fill` on all `<text>` elements.

### Absolute Rules — Never Violate These

- Never truncate a chapter. Write the whole thing in one pass.
- Never write placeholder text: "[insert diagram here]", "[continued...]", "[to be added]".
- Never let SVG content extend outside the viewBox boundaries.
- Never open a section with a math equation before establishing intuition in prose.
- Never write "it is worth noting that", "in this section we will", "in conclusion".
- Never write a `> **Key Insight**` callout without substantive insight.
- Never reuse diagram IDs or function names from another chapter.
- Never save the file anywhere other than `chapters/chNN.md`.
- Never use HuggingFace `transformers` for model code — always pure PyTorch (`torch.nn`).
- Never write a chapter without at least 2 Python code examples (PyTorch for project/architecture chapters and Ch 3; plain Python for Ch 1–2).
- Never use `\cdot` for matrix multiplication — use juxtaposition.
- Never use bare juxtaposition or `*` for element-wise products — always use `\odot`.
- Never use `q \cdot k` for dot products — always use `q^\top k`.
- Never write a multiplication's first occurrence in a chapter without a parenthetical annotation.

## Where the Detail Lives

- **Writing a chapter**: the `write-chapter` skill loads automatically when you say "write chapter X". It contains the full 12-step writing protocol, chapter template, style guide, math notation deep-dive, diagram guide, code block rules, intuition patterns, and pre-save checklist.
- **Reviewing a chapter**: the `review-chapter` skill loads automatically when you say "review chapter X". It contains the 11-step review protocol covering completeness, code quality, fact-checking, bug fixes, code execution, diagram checks, and final prose pass.
