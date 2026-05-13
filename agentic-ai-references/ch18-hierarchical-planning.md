# Chapter 18: Hierarchical Planning with LLMs

## Core Thesis
Hierarchical Task Networks (HTN) provide a formal framework for decomposing high-level goals into executable actions. Modern LLM agents implement HTN implicitly through reasoner-planner-executor architectures.

## Key References

### Classical Planning
- **Erol et al. (1994)** — "HTN Planning: Complexity and Expressivity". https://arxiv.org/abs/1106.1827
- **Ghallab et al. (1998)** — "PDDL — The Planning Domain Definition Language".
- **Helmert (2006)** — "The Fast Downward Planning System". https://arxiv.org/abs/1106.1827

### LLM + Planning
- **Ahn et al. (2022)** — "SayCan: Grounding Language in Robotic Affordances". https://arxiv.org/abs/2204.01691
- **Huang et al. (2022)** — "Inner Monologue: Embodied Reasoning through Planning with Language Models". https://arxiv.org/abs/2207.05608
- **RP-ReAct** (Dec 2025) — Reasoner-Planner supervising ReAct Executor.

### Neuro-Symbolic
- **Lyu et al. (2023)** — "Faithful Chain-of-Thought Reasoning". https://arxiv.org/abs/2301.13379
- **Pan et al. (2023)** — "Logic-LM: Empowering Large Language Models with Symbolic Solvers". https://arxiv.org/abs/2305.12295

## Subtext & Nuance
- HTN's core concept: high-level methods decompose into lower-level tasks. Preconditions and effects formalize task requirements.
- The boundary between LLM-generated and hardcoded is fluid: primitive tasks (click, type) are hardcoded; compound tasks ("book a flight") are LLM-generated.
- SayCan: LLM plans + robotic affordances. The LLM proposes high-level actions; a value function checks if the robot can execute them.
- Inner Monologue: the LLM "thinks out loud" about its plan, implicitly doing HTN decomposition without formal notation.
- RP-ReAct (2025) explicitly decouples: Reasoner generates subgoals, Planner orders them, Executor (ReAct) carries them out.

## Implementation Notes
- HTN planner: maintain a task network (DAG of tasks). Repeatedly decompose compound tasks until only primitives remain.
- Planner module can use FastDownward for symbolic domains, or LLM-based decomposition for open-ended domains.
- Replanning: when an action fails, mark the task as unresolved and re-decompose from the current state.

## Cross-References
- **Previous**: Ch 17 (Task Decomposition) — the prerequisite concept.
- **Next**: Ch 19 (MCTS) — search-based planning.
- **Related**: Ch 25 (Planner Project) — hierarchical planner + MCTS + ReAct.
- **Related**: Ch 58 (Embodied Agents) — SayCan and robotics.
