# Chapter 28: Cooperative Multi-Agent Systems

## Core Thesis
Cooperative agents divide labor, specialize, and achieve shared goals that exceed individual capability. CrewAI, MetaGPT, and ChatDev are the leading frameworks.

## Key References

### Cooperative Agents
- **MetaGPT** — "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework". https://arxiv.org/abs/2308.00352
- **ChatDev** — "ChatDev: Communicative Agents for Software Development". https://arxiv.org/abs/2307.07924
- **ChatDev 2.0** (Jan 2026) — Zero-code visual multi-agent orchestration.
- **CrewAI v1.0** (Oct 2025) — 1.4B+ automations, role-based crews. https://www.crewai.com/

### Multi-Agent Software Engineering
- **AutoGen** — "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation". https://arxiv.org/abs/2308.08155
- **AG2 Beta** (successor to AutoGen) — MemoryStream pub/sub, event-driven. https://ag2.ai/

### Emergent Specialization
- **Li et al. (2023)** — "CAMEL: Communicative Agents for 'Mind' Exploration of Large Language Model Society". https://arxiv.org/abs/2303.17760

## Subtext & Nuance
- Emergent specialization is the most fascinating phenomenon: agents naturally develop distinct roles without explicit programming.
- MetaGPT uses SOPs (Standard Operating Procedures) to structure multi-agent workflows — like a real software company.
- CrewAI v1.0 (Oct 2025) reached 1.4B+ automations, proving enterprise adoption of role-based multi-agent systems.
- Code review as inter-agent feedback is powerful: the Reviewer agent critiques the Coder agent's output, creating a natural improvement loop.
- Test-driven multi-agent development: tests serve as contracts between agents. If the Test agent says pass, the Coder agent's work is accepted.

## Project Notes
- Two-agent system: Writer and Critic.
- Writer generates solutions; Critic evaluates and provides feedback.
- Iterative refinement loop between agents.
- Evaluation: does the two-agent system outperform a single agent on the same task?

## Cross-References
- **Previous**: Ch 27 (Communication) — the infrastructure for cooperation.
- **Next**: Ch 29 (Competitive Agents) — the opposite paradigm.
- **Related**: Ch 33 (Multi-Agent Coding) — full software team.
- **Related**: Ch 31 (Hierarchies) — organizational structures for cooperation.
