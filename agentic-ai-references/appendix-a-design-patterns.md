# Appendix A: Agent Design Patterns Reference

## Patterns Catalog

### Reasoning Patterns
- **ReAct** — Thought → Action → Observation loop. Yao et al. 2023.
- **Plan-and-Solve** — Generate plan, then execute. Wang et al. 2023.
- **RP-ReAct** — Reasoner-Planner supervising ReAct Executor. Dec 2025.
- **Dynamic ReAct** — Adjusting loop based on feedback.

### Search Patterns
- **CoT** — Linear chain of thought. Wei et al. 2022.
- **ToT** — Tree search over thoughts. Yao et al. 2023.
- **GoT** — Graph of thoughts with aggregation. Besta et al. 2024.
- **AGoT** — Adaptive graph with dynamic subgraphs. 2025.
- **MCTS** — Monte Carlo Tree Search for reasoning. Hao et al. 2023.

### Reflection Patterns
- **Reflexion** — Verbal reinforcement learning. Shinn et al. 2023.
- **Self-Refine** — Iterative self-correction. Madaan et al. 2023.
- **CRITIC** — Tool-interactive critiquing. Gou et al. 2024.
- **REFLECT** — Principle-guided reasoning. Jan 2026.

### Multi-Agent Patterns
- **MetaGPT** — SOP-driven software teams.
- **ChatDev** — Conversational software development.
- **CrewAI** — Role-based crews.
- **SwarmSys** — Pheromone-inspired swarm.
- **Aegean** — Formal consensus protocol.

### Hybrid Patterns
- **Deterministic workflow + agentic cognitive steps** — The production pattern: structured orchestration with LLM reasoning at decision points.

## Cross-References
- Referenced throughout all chapters. This appendix provides a single reference point.
