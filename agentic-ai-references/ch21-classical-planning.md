# Chapter 21: Classical Planning Meets LLMs

## Core Thesis
Symbolic planners (STRIPS, PDDL) provide guarantees that LLMs cannot. Neuro-symbolic systems combine LLM flexibility with planner reliability.

## Key References

### Classical Planning
- **Fikes & Nilsson (1971)** — "STRIPS: A New Approach to the Application of Theorem Proving to Problem Solving".
- **Ghallab et al. (1998)** — "PDDL — The Planning Domain Definition Language".
- **Helmert (2006)** — "The Fast Downward Planning System". https://arxiv.org/abs/1106.1827

### Neuro-Symbolic
- **Lyu et al. (2023)** — "Faithful Chain-of-Thought Reasoning". https://arxiv.org/abs/2301.13379
- **Pan et al. (2023)** — "Logic-LM: Empowering Large Language Models with Symbolic Solvers". https://arxiv.org/abs/2305.12295
- **Creswell et al. (2023)** — "Faithful Reasoning Using Large Language Models". https://arxiv.org/abs/2208.14271

### Embodied Planning
- **Ahn et al. (2022)** — "SayCan". https://arxiv.org/abs/2204.01691
- **Garrett et al. (2021)** — "Integrated Task and Motion Planning". https://arxiv.org/abs/2010.01056

## Subtext & Nuance
- STRIPS: states (sets of predicates), actions (preconditions + effects), goals (desired state). Simple but powerful.
- PDDL extends STRIPS with types, constraints, and complex expressions. Standard for planning competitions.
- FastDownward is the go-to classical planner. It uses heuristic search (A* with LM-cut heuristic).
- The translation problem: converting natural language goals into PDDL. LLMs are good at this; symbolic planners are good at solving the PDDL.
- Hybrid systems: LLM for high-level goals, planner for low-level execution. This gives the best of both worlds — flexibility + guarantees.
- Task and Motion Planning (TAMP): combines symbolic planning (what to do) with geometric planning (how to move). Critical for robotics.

## Implementation Notes
- Install `unified-planning` (Python library) or `fast-downward` (native binary).
- Workflow: natural language goal → LLM generates PDDL domain/problem → FastDownward solves → plan returned to LLM for explanation/execution.
- When symbolic planning is sufficient: Blocksworld, logistics, simple navigation.
- When it's not: open-ended tasks with no formal model (creative writing, customer support).

## Cross-References
- **Previous**: Ch 20 (Search & Verification) — heuristic search.
- **Next**: Ch 22 (Verification & Self-Correction) — verifying plans.
- **Related**: Ch 18 (Hierarchical Planning) — HTN planning.
- **Related**: Ch 58 (Embodied Agents) — TAMP for robotics.
