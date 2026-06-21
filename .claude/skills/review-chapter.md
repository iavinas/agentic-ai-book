---
name: review-chapter
description: |
  Use when the user says "review chapter X", "check chapter X", "review chXX for completeness",
  or any task that audits or edits an existing chapter markdown file in the Agentic AI book.
  Contains the full review protocol: completeness, code quality, correctness, execution, diagrams, and prose.
---

# Review Chapter Skill

## Chapter Review Protocol

When told **"review chapter X"** or **"review chXX for completeness, code first, eval and test first, hands-on and correctness"**, follow these steps in order.

### Step 1 — Read the chapter
Open `chapters/chXX.md`. Read the full file.

### Step 2 — Read the TOC and reference file
- Open `agentic-ai-toc.md`. **Every subtopic must have content.**
- Open `agentic-ai-references/chXX-*.md`. **Every key reference must appear** in the body or Further Reading.

### Step 3 — Check completeness
- Does the chapter cover every TOC bullet?
- Is the lead paragraph vivid and concrete?
- Does the Summary capture key takeaways?
- **Section ordering:** Verify the chapter ends with `Summary` → `Agentic Code Project` → `Further Reading`. Further Reading must be at the very bottom.

### Step 4 — Check code quality (Code First, Eval First)
- Minimum code blocks: Part I = 2–3; project chapters = 5–8.
- Language rule: Ch 1–2 → pure Python; Ch 3+ → Python welcome; project → pure Python.
- **Every code block must have an inline `assert` or test.**
- Code must be executable: no missing imports, no undefined variables.
- Key tensors need shape comments.
- Every block needs a 1-sentence prose lead-in.

### Step 5 — Check correctness (Fact-Check Frontier Claims)
- Verify 2025–2026 claims with web search.
- Check paper titles, arXiv IDs, authors, dates, benchmark numbers.
- Fix attribution errors (e.g., benchmark name vs. study name).
- Fix nicknames to actual paper titles.

### Step 5a — Check model names
- Verify all LLM backend default strings use the book's 2026 canonical identifiers:
  - OpenAI: `gpt-5.5` (variants: `gpt-5.5-instant`, `gpt-5.5-pro`)
  - Anthropic: `claude-sonnet-4.7` (variants: `claude-opus-4-7`, `claude-haiku-4-5-20251001`)
  - Local / Ollama: `kimi-k2.6`
- Never allow outdated identifiers (`gpt-4o`, `claude-3-sonnet`, `llama3.1`) in backend constructors or factory comments.

### Step 6 — Fix bugs and security issues
- Replace unsafe patterns (`eval()`, bare `exec()`) with safe alternatives.
- Add edge-case guards (empty stores, zero-length inputs, division by zero).
- Check mechanical bugs (index off-by-one, incorrect tensor shapes).
- Seed random ops in demos for determinism.

### Step 7 — Execute all code blocks
Run every Python block in isolation. If it fails, fix it before proceeding.

- **For blocks that call an LLM backend**, do not use `MockLLM` unless the test is purely about mechanics (e.g., loop counting, trace formatting). Prefer a real API:
  1. **Try Ollama first** at `http://localhost:11434/v1` with an already-running local model.
  2. **If no model is running**, launch one with:
     ```bash
     ollama launch claude --model kimi-k2.6:cloud
     ```
     Then use `base_url="http://localhost:11434/v1"` and a dummy `api_key`.
  3. Only fall back to a mock when the actual model response is irrelevant to the assertion.

### Step 8 — Check diagrams
- Count against Part minimum (see table below).
- Every figure needs a `<figcaption>`.
- SVGs need `font-family`, `font-size`, `fill` on all `<text>` elements.

| Part | Minimum | Target |
|---|---|---|
| Part I — Foundations | 4 | 6-8 |
| Part II — Single-Agent | 3 | 5-6 |
| Part III — Planning | 4 | 6-8 |
| Part IV — Multi-Agent | 4 | 6-8 |
| Part V — Memory | 3 | 4-6 |
| Part VI — Infrastructure | 4 | 6-8 |
| Part VII — Domains | 3 | 4-6 |
| Part VIII — Safety | 4 | 6-8 |

### Step 9 — Check Further Reading
- Must include every key paper from the reference file.
- Format: `[Title](url) — Authors, Year. One-line description.`

### Step 10 — Final prose pass
- Remove stale prose references to code language.
- Ensure multiplication notation follows Transformer Book rules:
  - Matrix multiply: juxtaposition (no symbol), e.g., `$QK^\top$`
  - Element-wise: `\odot`, e.g., `$f_t \odot c_{t-1}$`
  - Dot product: `a^\top b`, e.g., `$q_i^\top k_j$`
  - Scalar × anything: juxtaposition or `\cdot`
  - Shape/count: `\times`
- Remove filler phrases.

### Step 11 — Save and report
Save the file. Report: file path, line count, diagram count, code block count, and a one-line summary of what changed.
