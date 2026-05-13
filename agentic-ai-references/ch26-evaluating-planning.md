# Chapter 26: Evaluating Planning and Reasoning

## Core Thesis
Planning and reasoning evaluation requires task-specific benchmarks, test-time scaling curves, and verifier quality assessment.

## Key References

### Reasoning Benchmarks
- **MATH / MATH-500** — Competition mathematics. https://arxiv.org/abs/2103.03874
- **GPQA-Diamond** — PhD-level science questions. https://arxiv.org/abs/2311.12022
- **AIME** — American Invitational Mathematics Examination.
- **FrontierMath** — Research-level mathematics (2025).

### Planning Benchmarks
- **PlanBench** — Classical planning evaluation. https://arxiv.org/abs/2206.10498
- **Blocksworld** — Manipulation planning.
- **PDDL benchmarks** — International Planning Competition.

### Test-Time Scaling
- **Snell et al. (2024)** — "Scaling LLM Test-Time Compute Optimally". https://arxiv.org/abs/2408.03314
- **CATTS / DORA** — Confidence-aware compute allocation.

## Subtext & Nuance
- Plan validity: does the plan achieve the goal? Plan optimality: is it the shortest/cheapest? These are distinct.
- Replanning frequency measures adaptability — but too much replanning indicates brittle initial plans.
- Backtracking efficiency: how quickly does the agent recover? Measured as steps from failure to resumed progress.
- Test-time scaling curves plot accuracy vs. compute. The curve shape (linear, diminishing returns, threshold) determines strategy.
- Dynamic allocation evaluation: does adaptive allocation (CATTS/DORA) outperform uniform allocation? Usually yes, by 20-50%.

## Implementation Notes
- Evaluation harness: run agent on benchmark, record accuracy, steps, tokens, time.
- Scaling curve generation: vary compute budget (samples, search depth, revision iterations), plot accuracy.
- Verifier quality: precision, recall, calibration on a held-out set.

## Cross-References
- **Previous**: Ch 25 (Planner Project) — the system being evaluated.
- **Next**: Ch 27 (Multi-Agent Communication) — Part IV begins.
- **Related**: Ch 16 (Evaluating Single Agents) — general evaluation principles.
- **Related**: Ch 35 (Evaluating Multi-Agent) — scaling to teams.
