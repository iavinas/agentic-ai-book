# Appendix D: Notation and Glossary

## Agent Formalism
- **State (S)** — Agent's internal representation at time t.
- **Observation (O)** — What the agent perceives from the environment.
- **Action (A)** — What the agent does.
- **Reward (R)** — Evaluative feedback signal.
- **Trajectory** — Sequence of (S, O, A, R) over time.
- **Episode** — A complete task execution from start to finish.
- **Policy (π)** — Mapping from states to action distributions.
- **Value function (V)** — Expected cumulative reward from a state.

## Architecture
- **Tool** — Callable function with schema.
- **Skill** — Reusable procedure learned from experience.
- **Plan** — Sequence or graph of subgoals.
- **Subgoal** — Intermediate objective in a plan.
- **Checkpoint** — Saved agent state for resumption.

## Training
- **PRM** — Process Reward Model. Scores each reasoning step.
- **ORM** — Outcome Reward Model. Scores final result only.
- **RLVR** — Reinforcement Learning with Verifiable Rewards.
- **GRPO** — Group Relative Policy Optimization.
- **MCTS** — Monte Carlo Tree Search.
- **DAG** — Directed Acyclic Graph.

## Evaluation
- **pass@k** — Pass rate with k samples (capability ceiling).
- **pass^k** — All k must pass (reliability floor).
- **SLA** — Service Level Agreement.
- **MTTR** — Mean Time To Recovery.

## Protocols
- **MCP** — Model Context Protocol.
- **A2A** — Agent-to-Agent Protocol.
- **AG-UI** — Agent-User Interaction Protocol.

## Cross-References
- Referenced throughout all chapters with mathematical notation.
