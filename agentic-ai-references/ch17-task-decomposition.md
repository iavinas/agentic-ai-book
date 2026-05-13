# Chapter 17: Task Decomposition and Subgoal Generation

## Core Thesis
Complex tasks break single-shot agents. Decomposition is divide-and-conquer for agency — recursive subgoal generation turns impossible problems into tractable ones.

## Key References

### Decomposition
- **Zhou et al. (2023)** — "Least-to-Most Prompting Enables Complex Reasoning in Large Language Models". ICLR 2023. https://arxiv.org/abs/2205.10625
- **Wang et al. (2023)** — "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning". https://arxiv.org/abs/2305.04091
- **Khot et al. (2023)** — "Decomposed Prompting: A Modular Approach for Solving Complex Tasks". https://arxiv.org/abs/2210.02406

### Hierarchical Planning
- **Erol et al. (1994)** — "HTN Planning: Complexity and Expressivity". Classical AI planning.
- **Ahn et al. (2022)** — "Do As I Can, Not As I Say: Grounding Language in Robotic Affordances" (SayCan). https://arxiv.org/abs/2204.01691

### Modern Variants
- **RP-ReAct** (Dec 2025) — Reasoner-Planner supervising a ReAct Executor.
- **Inner Monologue** — Implicit planning through stream-of-consciousness reasoning.
- **Dynamic ReAct** — Adjusting plans based on environment feedback.

## Subtext & Nuance
- Monolithic agents fail after hundreds of steps due to error compounding. Each step has some error probability p; after N steps, success rate is ~(1-p)^N, which drops exponentially.
- Decomposition reduces N: instead of 100 atomic steps, do 10 subgoals of 10 steps each. Error probability drops from (1-p)^100 to (1-p)^10 per subgoal.
- Plan-then-execute vs interleaved: stable environments favor full planning; dynamic environments favor replanning.
- Template-based decomposition: reusing known plan templates (e.g., "debugging" = read code → identify bug → write fix → run tests → verify).
- Dependency detection is critical: which subgoals must precede others? Natural language LLMs can infer this, but it's error-prone.

## Implementation Notes
- Subgoal generator prompt: "Break this task into subgoals. For each subgoal, list dependencies and estimated difficulty."
- Plan validation: before executing, verify that the plan is feasible (all dependencies resolvable, no cycles).
- Replanning trigger: if a subgoal fails, regenerate the plan from the current state.

## Cross-References
- **Previous**: Ch 16 (Evaluating Single Agents) — measuring decomposition quality.
- **Next**: Ch 18 (Hierarchical Planning) — HTN and modern hierarchical agents.
- **Related**: Ch 25 (Planner Project) — implements hierarchical decomposition + MCTS.
- **Related**: Ch 33 (Multi-Agent Coding) — decomposition across agent teams.
