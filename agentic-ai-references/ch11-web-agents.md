# Chapter 11: Web Agents and Browser Automation

## Core Thesis
The web is the world's largest API — unstructured, visual, and constantly changing. Web agents navigate it using DOM parsing, visual perception, or both.

## Key References

### Web Agent Foundations
- **Shi et al. (2017)** — "World of Bits: An Open-Domain Platform for Web-Based Agents". https://arxiv.org/abs/1705.00504
- **Gur et al. (2023)** — "A Real-World WebAgent with Planning, Long Context Understanding, and Program Synthesis". https://arxiv.org/abs/2307.12856

### Benchmarks
- **WebArena** — "WebArena: A Realistic Web Environment for Building Autonomous Agents". https://arxiv.org/abs/2307.13854
- **WebArena Verified** — Updated standard with self-hosted sites and verified tasks.
- **Mind2Web** — "Mind2Web: Towards a Generalist Agent for the Web". https://arxiv.org/abs/2306.06070
- **GAIA** — "GAIA: A Benchmark for General AI Assistants". https://arxiv.org/abs/2311.12983
- **OpAgent** (Qwen3-VL + RL) — 71.6% on WebArena.

### Browser Automation
- **Playwright** — https://playwright.dev/
- **Puppeteer** — https://pptr.dev/
- **Selenium** — https://www.selenium.dev/

### Agent Architectures
- **DOM-aware agents** — Gemini approach: using HTML structure, ARIA roles, CSS selectors.
- **Visual agents** — Claude approach: screenshot-based perception + click prediction.
- **Hybrid agents** — Combining DOM structure with visual grounding.

## Subtext & Nuance
- Visual vs DOM-based is a key architectural choice: DOM agents are faster and more precise but break when websites change structure; visual agents are more robust to structure changes but slower and less precise.
- Session management (cookies, auth, multi-page workflows) is under-discussed in literature but critical in practice.
- WebArena Verified replaced the original WebArena as the standard — original had data leakage issues.
- The action space matters: click, type, scroll, navigate, wait, extract. Too many actions = combinatorial explosion; too few = insufficient expressiveness.

## Project Notes (Ch 11 Bonus)
- Playwright + LLM + ReAct loop.
- Implement visual perception: screenshot → element detection (can use simple OCR or bounding box detection).
- Action execution with retry logic: if a click fails (element not found), retry after scroll.
- Evaluation on a subset of WebArena or Mind2Web tasks. Don't need the full benchmark; a curated 20-task subset is sufficient for learning.

## Deprecated / Superseded
- Original WebArena (pre-Verified) — had data leakage and reproducibility issues.
- Selenium for new projects — Playwright is faster, more reliable, and has better auto-wait.

## Cross-References
- **Previous**: Ch 10 (Code Agents) — another domain-specific agent.
- **Next**: Ch 12 (OS Agents) — extending agents to the file system.
- **Related**: Ch 14 (Visual Agents) — visual perception for UI understanding.
- **Related**: Ch 60 (Deep Research Project) — iterative web search as a research tool.
