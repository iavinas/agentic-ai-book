# Chapter 19: Monte Carlo Tree Search for Agent Reasoning

## Core Thesis
MCTS brings AlphaZero-style search to LLM reasoning. Thoughts are states; reasoning steps are actions; the LLM generates children and a PRM evaluates them.

## Key References

### MCTS Fundamentals
- **Coulom (2006)** — "Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search". https://arxiv.org/abs/1201.1858
- **Kocsis & Szepesvári (2006)** — "Bandit based Monte-Carlo Planning". (UCB1/UCT formula).
- **Silver et al. (2017)** — "Mastering the game of Go without human knowledge" (AlphaZero). https://doi.org/10.1038/nature24270

### MCTS for LLM Reasoning
- **Yao et al. (2023)** — "Tree of Thoughts". https://arxiv.org/abs/2305.10601
- **Hao et al. (2023)** — "Reasoning with Language Model is Planning with World Model" (RAP). https://arxiv.org/abs/2305.14992
- **LATS** — "Language Agent Tree Search". https://arxiv.org/abs/2310.04406

### Modern Variants (2024-2025)
- **CMCTS** — Constrained action sets (Understand, Reflect, Code, Summary) + PRM guidance.
- **DPTS** — Dynamic Parallel Tree Search. 2-4× speedup via parallel inference. https://arxiv.org/abs/2501.XXXXX
- **RethinkMCTS** — Refining erroneous intermediate thoughts with code execution feedback.
- **SC-MCTS*** — Contrastive reward model + speculative decoding.

## Subtext & Nuance
- UCT formula: `score = Q/N + c * sqrt(log(parent_N) / N)`. Balances exploitation (high Q) with exploration (low N).
- MCTS excels when intermediate states are evaluable. If you can't score a partial reasoning trace, MCTS degenerates.
- The verifier bottleneck: MCTS quality depends entirely on the value function. A bad PRM makes MCTS worse than greedy decoding.
- Cost-benefit: MCTS adds compute (multiple rollouts). Is the accuracy gain worth the cost? Answer depends on task difficulty.
- DPTS (2025) parallelizes inference across tree branches, dramatically reducing wall-clock time.

## Implementation Notes
- Node structure: `{state: str, parent: node, children: list, visits: int, value: float}`
- Selection: UCT traversal from root to leaf.
- Expansion: LLM generates k children from the leaf state.
- Simulation: rollout to terminal state (or fixed depth), score with PRM/verifier.
- Backpropagation: update visit counts and values up the tree.

## Cross-References
- **Previous**: Ch 18 (Hierarchical Planning) — HTN decomposition.
- **Next**: Ch 20 (Search & Verification) — best-of-N, beam search, verifiers.
- **Related**: Ch 9 (ToT/GoT) — tree-structured reasoning.
- **Related**: Ch 25 (Planner Project) — implements MCTS for plan search.
