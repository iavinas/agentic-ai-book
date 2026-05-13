# Chapter 25: Project — Building a Planner-Agent from Scratch

## Core Thesis
A hierarchical planner with LLM subgoal generation + MCTS + ReAct execution. This is the capstone project of Part III.

## Key References

### Planning
- **Yao et al. (2023)** — "Tree of Thoughts". https://arxiv.org/abs/2305.10601
- **Hao et al. (2023)** — "Reasoning with Language Model is Planning with World Model" (RAP). https://arxiv.org/abs/2305.14992
- **RP-ReAct** (Dec 2025) — Reasoner-Planner supervising ReAct Executor.

### MCTS
- **Coulom (2006)** — "Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search".
- **DPTS** — Dynamic Parallel Tree Search. https://arxiv.org/abs/2501.XXXXX

## Subtext & Nuance
- Three-layer architecture: Planner (generates subgoals with dependency graph), Searcher (MCTS over plan variants), Executor (ReAct for each subgoal).
- The Planner is an LLM prompt: "Break this task into subgoals. List dependencies."
- The Searcher treats each subgoal completion as a state, and plan variants (different orderings, different decompositions) as actions.
- The Executor is the ReAct agent from Chapter 6, applied to each subgoal independently.
- Checkpointing is critical: save plan progress after each subgoal. If the agent crashes, resume from the last checkpoint.
- Replanning: if a subgoal fails, the Planner regenerates from the current state.

## Implementation Notes
- Pure Python, ~600 lines across three modules.
- Planner module: `plan(task: str) -> List[Subgoal]`
- Searcher module: `search(plan: Plan, evaluator: Callable) -> BestPlan`
- Executor module: `execute(subgoal: Subgoal) -> Result`
- Integration with Ch 6 ReAct agent: reuse the tool system and LLM backend.
- State management: `State = {completed: List[Subgoal], current: Subgoal, remaining: List[Subgoal], trace: List[Step]}`

## Evaluation
- Plan success rate: does the plan achieve the goal?
- Replanning frequency: how often does the agent revise?
- Total steps: actions taken across all subgoals.
- Compare hierarchical vs flat planning on the same tasks.

## Extensions
- Add PRM-based plan evaluation.
- Confidence-aware compute allocation for planning.
- Parallel subgoal execution where dependencies permit.

## Cross-References
- **Previous**: Ch 17-24 (All of Part III) — theory leading to this project.
- **Next**: Ch 26 (Evaluating Planning) — measuring this project's success.
- **Related**: Ch 6 (ReAct Project) — the Executor module.
- **Related**: Ch 33 (Multi-Agent Coding) — decomposes across agents instead of subgoals.
