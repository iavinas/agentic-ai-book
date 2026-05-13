# Chapter 16: Evaluating Single Agents

## Core Thesis
Agent evaluation is multi-dimensional: success rate, step efficiency, cost, latency, and safety. No single metric captures agent quality.

## Key References

### Benchmarks
- **SWE-bench** — "Can Language Models Resolve Real-World GitHub Issues?" https://arxiv.org/abs/2310.06770
- **SWE-bench Verified** — Human-verified subset (500 tasks).
- **SWE-bench Pro** — Harder subset (731 tasks).
- **SWE-bench Live** — Monthly fresh issues from real GitHub.
- **WebArena Verified** — Web navigation benchmark. https://webarena.dev/
- **OSWorld-Verified** — Computer use tasks. https://os-world.github.io/
- **GAIA / GAIA2** — General AI Assistants benchmark. https://arxiv.org/abs/2311.12983
- **AgentBench** — 8 environments (OS, DB, web, games). https://github.com/THUDM/AgentBench
- **Tau2-Bench** — Customer service with policy compliance.

### Evaluation Frameworks
- **CLEAR Framework** — Accuracy, Cost, Latency, Reliability, Safety. https://arxiv.org/abs/2408.08903
- **ReliabilityBench** — Consistency, perturbation tolerance, fault tolerance.
- **pass@k and pass^k** — Capability ceiling vs. reliability floor.

### Metrics
- **Cost-normalized accuracy** — `Accuracy / Cost × 100`.
- **Step efficiency** — Number of actions to completion.
- **Red-teaming** — Adversarial testing via prompt injection, tool misuse.

## Subtext & Nuance
- Success rate alone is insufficient. An agent with 90% success but 50 steps per task is worse than one with 85% success and 5 steps.
- Cost is increasingly the primary constraint: enterprise LLM spending was $8.4B in H1 2025.
- The exploit epidemic: all major benchmarks can be reward-hacked. SWE-bench has been exploited via test-file reading; WebArena via memorization. This means evaluation design must evolve continuously.
- pass@k (best of k samples) measures capability ceiling; pass^k (all k must pass) measures reliability floor. Both matter.

## Implementation Notes
- Evaluation harness: run agent on N tasks, record success/fail, steps, tokens, time.
- Perturbation testing: change task wording, shuffle options, add distractors — agent should be robust.
- Red-teaming: inject malicious instructions via tools/documents, observe agent behavior.

## Cross-References
- **Previous**: Ch 15 (Training Single Agents) — evaluating trained agents.
- **Next**: Ch 17 (Task Decomposition) — planning foundations.
- **Related**: Ch 52 (Evaluating Production) — production-specific metrics.
- **Related**: Ch 62 (Prompt Injection) — adversarial evaluation.
