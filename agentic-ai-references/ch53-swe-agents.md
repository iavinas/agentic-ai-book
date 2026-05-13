# Chapter 53: Software Engineering Agents

## Core Thesis
SWE-bench is the defining benchmark. Claude Opus 4.7 (~87.6%), OpenAI Symphony (500% PR increase), and OpenHands define the state of the art.

## Key References

### SWE-bench
- **Jimenez et al. (2023)** — "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?". https://arxiv.org/abs/2310.06770
- **SWE-bench Verified** — 500 human-verified tasks.
- **SWE-bench Pro** — 731 harder tasks.
- **SWE-bench Live** — Monthly fresh issues from real GitHub.
- **https://www.swebench.com/**

### Agent Architectures
- **Plan → Edit → Test → Debug loops**.
- **File-level context management**.
- **Test-driven agent development**.
- **CI/CD integration** — Agents opening and monitoring PRs.

### Production Systems
- **Claude Code / Opus 4.7** — ~78-87% on Verified.
- **OpenAI Codex CLI / Symphony** — 500% increase in landed PRs.
- **OpenHands** (formerly OpenDevin) — https://github.com/All-Hands-AI/OpenHands
- **Devin 2.0** — Cognition Labs.

### Enterprise Adoption
- **Uber** — 84% of developers agentic, 11% of PRs from agents.
- **Stripe** — 1,000+ AI PRs/week, "Minions" pair-prompting.
- **Shopify** — Qwen3-32B fine-tuned, 68% cheaper than frontier.

## Project Notes
- End-to-end: GitHub issue → clone → edit → test → PR.
- Python + Git + pytest integration.
- Evaluation on SWE-bench Lite or custom benchmark.

## Cross-References
- **Previous**: Ch 52 (Evaluating Production) — Part VII begins.
- **Next**: Ch 54 (Scientific Agents) — another specialized domain.
- **Related**: Ch 10 (Code Agents) — code generation foundations.
- **Related**: Ch 33 (Multi-Agent Coding) — team-based software engineering.
