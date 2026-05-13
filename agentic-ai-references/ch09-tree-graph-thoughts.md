# Chapter 9: Tree and Graph of Thoughts

## Core Thesis
Linear reasoning chains fail for problems requiring exploration. Tree and Graph of Thoughts use search algorithms over reasoning space.

## Key References

### Tree of Thoughts
- **Yao et al. (2023)** — "Tree of Thoughts: Deliberate Problem Solving with Large Language Models". NeurIPS 2023. https://arxiv.org/abs/2305.10601
- **Long (2023)** — "Large Language Model Guided Tree-of-Thought". https://arxiv.org/abs/2305.08291

### Graph of Thoughts
- **Besta et al. (2024)** — "Graph of Thoughts: Solving Elaborate Problems with Large Language Models". AAAI 2024. https://arxiv.org/abs/2308.09687

### Modern Variants (2024-2025)
- **Forest-of-Thought (FoT)** — Parallel reasoning trees with sparse activation.
- **Adaptive Graph of Thoughts (AGoT)** — Dynamic DAG decomposition into nested subgraphs. Results: +46.2% on GPQA without any training.
- **Constrained MCTS (CMCTS)** — Predefined action sets + PRM-guided simulation.
- **Dynamic Parallel Tree Search (DPTS)** — 2-4× speedup over standard MCTS via parallel inference.

## Subtext & Nuance
- ToT is essentially MCTS where the LLM generates children (thoughts) and an evaluator scores them.
- The evaluator is critical — and expensive. Without a good value function, ToT degenerates to expensive random search.
- BFS vs DFS in thought space: BFS explores breadth-first (good for broad problems), DFS goes deep (good for sequential problems).
- GoT adds aggregation and revision operations — you can merge multiple thought branches or edit previous thoughts.
- AGoT (2025) dynamically spawns nested subgraphs for complex subproblems, unifying CoT, ToT, and GoT.

## Implementation Notes
- Tree node: `{thought: str, value: float, children: list, parent: node}`
- Evaluator can be: (1) LLM-as-judge, (2) trained PRM, (3) external verifier (unit test, theorem prover).
- Search budget: max_depth × branching_factor × evaluator_calls. Budget management is crucial.
- Project: solving Game of 24 and Blocksworld with ToT. These are classic benchmarks where ToT shines.

## Deprecated / Superseded
- Naive best-of-N sampling without search structure — ToT/DPTS outperform simple rejection sampling.
- Static tree search without pruning — modern variants use adaptive pruning.

## Cross-References
- **Previous**: Ch 8 (CoT) — linear reasoning that ToT extends.
- **Next**: Ch 10 (Code Agents) — where search-based reasoning is applied.
- **Related**: Ch 19 (MCTS) — the algorithmic foundation of ToT.
- **Related**: Ch 20 (Search & Verification) — best-of-N, beam search, verifiers.
- **Related**: Ch 24 (Advanced Reasoning) — AGoT, SwarmSys, consensus.
