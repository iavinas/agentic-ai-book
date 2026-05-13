# Chapter 1: Why Agents? From Predictors to Actors

## Core Thesis
LLMs are next-token predictors, not actors. Agency bridges the gap between knowing and doing.

## Key References

### Foundational Papers
- **Brown et al. (2020)** — "Language Models are Few-Shot Learners" (GPT-3). NeurIPS 2020. https://arxiv.org/abs/2005.14165
- **Schick et al. (2023)** — "Toolformer: Language Models Can Teach Themselves to Use Tools". Meta AI. https://arxiv.org/abs/2302.04761
- **Yao et al. (2023)** — "ReAct: Synergizing Reasoning and Acting in Language Models". ICLR 2023. https://arxiv.org/abs/2210.03629
- **Wei et al. (2022)** — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models". NeurIPS 2022. https://arxiv.org/abs/2201.11903

### Historical Agent Milestones
- **AutoGPT** (March 2023) — Significant Gravitas. First open-ended autonomous agent. https://github.com/Significant-Gravitas/AutoGPT
- **BabyAGI** (April 2023) — Yohei Nakajima. Task-driven autonomous agent. https://github.com/yoheinakajima/babyagi
- **Voyager** (May 2023) — Wang et al., "Voyager: An Open-Ended Embodied Agent with Large Language Models". https://arxiv.org/abs/2305.16291
- **Devin** (March 2024) — Cognition Labs. First "AI software engineer" demonstration. https://www.cognition.ai/blog/introducing-devin

### 2025-2026 Frontier
- **OpenAI o3 / o4-mini** (April 2025) — RL-trained reasoning with full tool use. 600+ consecutive tool calls.
- **DeepSeek-R1** (Jan 2025) — Pure RL emergence of reasoning. Open weights. https://arxiv.org/abs/2501.12948
- **Claude Computer Use** (Oct 2024) — Anthropic. Agentic computer control via screenshots. https://www.anthropic.com/news/computer-use
- **OpenAI Codex CLI / Symphony** (2025) — Production coding agents at OpenAI.

## Subtext & Nuance
- The 2022-2024 period was the "agentic wild west" — many demos, few reliable systems.
- 2025 marks the inflection point because reasoning models (o3, R1) *internalized* agency rather than relying on prompt engineering.
- The convergence thesis: reasoning + tool use + planning + memory = general agency. No single component is sufficient.
- **Pedagogical note**: Open with a concrete example — GPT-4 can describe how to fix a bug but cannot apply the fix. The gap is agency.

## Deprecated / Superseded
- AutoGPT (original) as a reliable architecture — now a research artifact.
- "Prompt engineering for agency" — superseded by trained reasoning capabilities.

## Cross-References
- **Next**: Ch 2 (Agent Loop) — formalizes the ReAct pattern introduced here.
- **Related**: Ch 6 (ReAct Project) — implements the architecture.
- **Related**: Ch 67 (Path to AGI) — returns to the agency spectrum.
