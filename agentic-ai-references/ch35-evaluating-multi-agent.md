# Chapter 35: Evaluating Multi-Agent Systems

## Core Thesis
Multi-agent evaluation measures coordination, communication efficiency, and scalability — not just individual task completion.

## Key References

### Benchmarks
- **AgentBench** — Aggregate scores across environments. https://github.com/THUDM/AgentBench
- **CREW-Wildfire** — Procedurally generated heterogeneous agent tasks.
- **Melting Pot** — Social intelligence in multi-agent environments. https://github.com/google-deepmind/meltingpot
- **Overcooked** — Human-AI collaboration benchmark. https://github.com/HumanCompatibleAI/overcooked_ai
- **Hanabi** — Cooperative game benchmark. https://github.com/deepmind/hanabi-learning-environment

### Metrics
- **Coordination metrics** — Task completion, division of labor, communication efficiency.
- **Scalability** — Performance as number of agents grows.

## Subtext & Nuance
- Division of labor: did agents specialize appropriately? Measure by entropy of task distribution — high entropy = no specialization; low entropy = overspecialization.
- Communication efficiency: information transferred per unit of work. More communication is not always better.
- Scalability curves: plot task completion vs. number of agents. Should be sub-linear ideally.
- Failure analysis: identifying which agent caused a failure. This is the multi-agent credit assignment problem in evaluation form.
- Emergent misbehavior: agents developing unintended strategies (e.g., collusion, deception). Hard to detect without careful monitoring.

## Cross-References
- **Previous**: Ch 34 (Training Multi-Agent) — evaluating trained systems.
- **Next**: Ch 36 (Vector Memory) — Part V begins.
- **Related**: Ch 16 (Evaluating Single Agents) — individual evaluation.
- **Related**: Ch 52 (Evaluating Production) — production metrics.
