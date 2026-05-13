# Chapter 24: Advanced Reasoning — Graph, Swarm, and Consensus

## Core Thesis
Beyond individual reasoning chains: graph-structured reasoning, swarm intelligence, and formal consensus protocols enable collective reasoning that exceeds any single model.

## Key References

### Adaptive Graph of Thoughts
- **AGoT** — Dynamic DAG decomposition. Complex subproblems spawn nested subgraphs. +46.2% on GPQA without training. https://arxiv.org/abs/2502.XXXXX

### Swarm Intelligence
- **SwarmSys** (Oct 2025) — Decentralized agents with emergent roles (Explorer/Worker/Validator). Pheromone-inspired reinforcement. https://arxiv.org/abs/2502.XXXXX
- **SOHM** — Society of HiveMind. Evolutionary theory for swarm optimization.

### Consensus
- **Aegean** (Dec 2025) — Formal consensus protocol for stochastic LLM agents. Stability Horizon and quorum-based early termination. 1.2-20× latency reduction. https://arxiv.org/abs/2502.XXXXX

### Massively Decomposed Processes
- **MDAPs** — Million-step tasks with zero errors through micro-agents and voting. Single agents inevitably derail after hundreds of steps.

## Subtext & Nuance
- AGoT unifies CoT, ToT, and GoT in one framework: simple subproblems use CoT; complex ones spawn ToT subgraphs; merging uses GoT aggregation.
- SwarmSys is inspired by ant colony optimization: validated traces strengthen ("pheromone deposit"), ineffective ones decay.
- Aegean consensus is the first formal protocol for stochastic agents. It defines Stability Horizon (how long to wait for convergence) and quorum thresholds.
- MDAPs (2025) represent a paradigm shift: instead of one agent doing 1,000 steps, use 1,000 micro-agents doing 1 step each, then vote on the result. Massive parallelism replaces sequential reliability.
- The key insight: single agents fail after ~100-200 steps due to error accumulation. Decomposition + voting is the path to million-step reliability.

## Implementation Notes
- AGoT implementation: detect subproblem complexity → spawn subgraph if complex → execute → aggregate results.
- Swarm: define agent roles, communication topology, and voting mechanism.
- Consensus: implement Aegean-style quorum with early termination.

## Cross-References
- **Previous**: Ch 23 (Reasoning Models) — individual reasoning.
- **Next**: Ch 25 (Planner Project) — implements hierarchical + MCTS reasoning.
- **Related**: Ch 27 (Multi-Agent Communication) — swarm communication patterns.
- **Related**: Ch 32 (Consensus) — formal consensus mechanisms.
