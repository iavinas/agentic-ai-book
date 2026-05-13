# Chapter 10: Code Generation Agents

## Core Thesis
Code is the ultimate tool for agents — it turns language into executable action. Code agents write, execute, test, and debug programs autonomously.

## Key References

### Program Synthesis
- **Chen et al. (2021)** — "Evaluating Large Language Models Trained on Code" (Codex). https://arxiv.org/abs/2107.03374
- **Austin et al. (2021)** — "Program Synthesis with Large Language Models". https://arxiv.org/abs/2108.07732
- **Li et al. (2023)** — "StarCoder: may the source be with you!". https://arxiv.org/abs/2305.06161

### Code Agents
- **Devin** (Cognition, March 2024) — https://www.cognition.ai/blog/introducing-devin
- **OpenHands** (formerly OpenDevin) — https://github.com/All-Hands-AI/OpenHands
- **SWE-bench** — "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" https://arxiv.org/abs/2310.06770
- **SWE-bench Verified / Pro / Live** — https://www.swebench.com/

### Test-Driven Generation
- **Chen et al. (2023)** — "Teaching Large Language Models to Self-Debug". https://arxiv.org/abs/2304.05128

### Production Systems (2025-2026)
- **Claude Code / Opus 4.7** — ~78-87% on SWE-bench Verified.
- **OpenAI Codex CLI / Symphony** — 500% increase in landed PRs at OpenAI.
- **Shopify** — Qwen3-32B fine-tuned for coding, 68% cheaper than frontier closed model.
- **Uber** — 84% of developers agentic, 11% of PRs from agents.
- **Stripe** — 1,000+ AI PRs/week, "Minions" pair-prompting at scale.

## Subtext & Nuance
- The code interpreter pattern (LLM writes code → executes → observes output → iterates) is the dominant architecture.
- File-level context management is the hard part: which files to read, which to edit. Agents must manage large codebases.
- Diff generation vs full-file rewrite: diffs are precise but harder to generate; full-file rewrites are easier but consume more tokens and risk losing unchanged code.
- SWE-bench is the gold standard for evaluating code agents. Verified = human-verified tasks; Pro = harder; Live = monthly fresh issues.
- The generalist vs specialist debate: can one agent handle all coding tasks, or do we need specialized agents for different languages/domains?

## Implementation Notes
- Architecture: Plan → Edit → Test → Debug loop.
- Tools needed: file read, file write, shell exec, Python exec, pytest runner, git commands.
- Error feedback: syntax errors and test failures must be fed back into the agent's context as observations.
- Evaluation: HumanEval (synthetic) or SWE-bench Lite (real but smaller).

## Deprecated / Superseded
- HumanEval as the primary benchmark for real-world coding — superseded by SWE-bench for realistic evaluation.
- Pure code generation without execution loop — agents must execute and iterate.

## Cross-References
- **Previous**: Ch 9 (ToT/GoT) — search-based reasoning applied to code.
- **Next**: Ch 11 (Web Agents) — another domain for agents.
- **Related**: Ch 53 (SWE Agent Project) — end-to-end GitHub issue resolution.
- **Related**: Ch 15 (Training Single Agents) — training agents for code.
