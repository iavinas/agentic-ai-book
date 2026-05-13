# Chapter 15: Training Single Agents — SFT, RL, and Process Rewards

## Core Thesis
Training agents requires trajectory-level data, process-level rewards, and careful masking. SFT provides the foundation; RL and PRMs provide the optimization signal.

## Key References

### SFT on Agent Trajectories
- **Zhu et al. (2024)** — "AgentTuning: Enabling Generalized Agent Abilities for LLMs". https://arxiv.org/abs/2310.12823
- **AgentBank** — 50,000+ trajectories across 16 tasks. https://github.com/FlagOpen/AgentBank

### RL for Tool Use
- **Schulman et al. (2017)** — "Proximal Policy Optimization (PPO) Algorithms". https://arxiv.org/abs/1707.06347
- **DeepSeek-R1** — GRPO (Group Relative Policy Optimization). https://arxiv.org/abs/2501.12948
- **OpenAI o3** — RL-trained for 600+ consecutive tool calls.
- **WebAgent-R1** — End-to-end RL for web agents. https://arxiv.org/abs/2505.09852
- **Apple LOOP** — Memory-efficient PPO for long-horizon interactive agents. https://arxiv.org/abs/2502.11356

### Process Reward Models
- **Lightman et al. (2023)** — "Let's Verify Step by Step" (PRM800K). https://arxiv.org/abs/2305.20050
- **PRIME** — Implicit process rewards from outcome labels only. https://arxiv.org/abs/2502.01456
- **AgentPRM** (Cornell + Fudan) — Practical actor-critic for multi-turn agents. https://arxiv.org/abs/2502.05992
- **PQM** — Q-value rankings for theoretically principled PRMs. https://arxiv.org/abs/2502.XXXXX
- **R-PRM** — Reasoning-driven PRM with trace generation.

### Synthetic Data
- **Simia** — Synthetic trajectory generation for agent training.
- **STeP** — Self-training via Planning. https://arxiv.org/abs/2409.20819

## Subtext & Nuance
- Trajectory formatting matters: `[User query] → [Thought] → [Action] → [Observation] → ...`. Mask observations during loss — the model should learn to generate thoughts and actions, not regurgitate observations.
- ORMs (Outcome Reward Models) fail for long chains: sparse feedback, no error localization. PRMs score each step, enabling fine-grained credit assignment.
- PRIME is a breakthrough: it derives process rewards from outcome labels alone, no human step labels needed. This makes PRM training scalable.
- AgentPRM extends PRMs to multi-turn agents where the action space includes tool calls.
- RL for long-horizon agents (WebAgent-R1, Apple LOOP) addresses memory and credit assignment over hundreds of steps.

## Project Notes
- Train a step-level reward model on math reasoning traces.
- Use outcome labels to derive process rewards (PRIME-style).
- Evaluate: does the PRM correctly identify errors in reasoning?
- Can be done with a small model (e.g., fine-tuned T5 or LLaMA-7B) on publicly available math datasets.

## Deprecated / Superseded
- Pure SFT without RL — RL significantly outperforms for complex reasoning.
- ORMs for long-horizon tasks — PRMs are necessary for step-level feedback.
- Training on human demonstrations alone — synthetic trajectories scale better.

## Cross-References
- **Previous**: Ch 14 (Visual Agents) — training multimodal agents.
- **Next**: Ch 16 (Evaluating Single Agents) — how to measure training success.
- **Related**: Ch 23 (Reasoning Models) — how o3/R1 were trained.
- **Related**: Ch 34 (Training Multi-Agent) — scaling to multiple agents.
