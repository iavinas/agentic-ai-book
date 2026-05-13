# Chapter 20: Search and Verification in Agent Reasoning

## Core Thesis
Search multiplies the agent's effective compute at test time. Verification selects the best result. Together they form test-time scaling — the complement to training-time scaling.

## Key References

### Best-of-N and Rejection Sampling
- **Brown et al. (2024)** — "Large Language Monkeys: Scaling Inference Compute with Repeated Sampling". https://arxiv.org/abs/2407.21787
- **Cobbe et al. (2021)** — "Training Verifiers to Solve Math Word Problems". https://arxiv.org/abs/2110.14168

### Verifiers
- **Lightman et al. (2023)** — "Let's Verify Step by Step" (PRM800K). https://arxiv.org/abs/2305.20050
- **Cameron et al. (2024)** — "Scalable Oversight for AI Systems". https://arxiv.org/abs/2406.XXXXX

### Beam Search
- **Snell et al. (2024)** — "Scaling LLM Test-Time Compute Optimally". https://arxiv.org/abs/2408.03314

### Confidence-Aware Scaling
- **CATTS** — Confidence-Aware Test-Time Scaling. Dynamic compute allocation. https://arxiv.org/abs/2502.XXXXX
- **DORA** — Direction-Oriented Resource Allocation for optimal budget use. https://arxiv.org/abs/2502.XXXXX

## Subtext & Nuance
- Four pillars of test-time compute scaling: (1) parallel sampling, (2) sequential revision, (3) verifiers, (4) diversifying rollouts.
- Verifier architectures: ORM (outcome reward model) vs PRM (process reward model) vs LLM-as-judge. PRM > ORM for long chains; LLM-as-judge is expensive but flexible.
- ROC-n-reroll theory: verifier imperfection means optimal sampling is not just "sample more" but "sample strategically."
- Beam search maintains a frontier of k-best partial solutions, pruning low-scoring branches early.
- CATTS (2025): low uncertainty → execute; high uncertainty → invoke arbiter. Reduces tokens by 2.3× while maintaining accuracy.
- DORA (2025): allocates compute budget directionally — more to hard subproblems, less to easy ones.

## Project Notes
- MCTS + PRM for math problem solving.
- Implement tree search with LLM as node generator.
- Train/evaluate a simple PRM on math traces (e.g., PRM800K or synthetic data).
- Compare MCTS vs greedy decoding vs best-of-N on the same test set.

## Cross-References
- **Previous**: Ch 19 (MCTS) — search algorithm.
- **Next**: Ch 21 (Classical Planning) — symbolic search.
- **Related**: Ch 23 (Reasoning Models) — test-time compute scaling.
- **Related**: Ch 26 (Evaluating Planning) — measuring search quality.
