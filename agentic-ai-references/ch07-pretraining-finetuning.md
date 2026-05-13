# Chapter 7: Pre-training and Fine-Tuning for Agency

## Core Thesis
Pre-trained LLMs provide the cognitive foundation. Fine-tuning adapts them for tool use, reasoning, and agentic behavior.

## Key References

### Training for Tool Use
- **Qin et al. (2023)** — "ToolLLM: Facilitating Large Language Models to Master 16,000+ Real-world APIs". https://arxiv.org/abs/2307.16789
- **Patil et al. (2023)** — "Gorilla: Large Language Model Connected with Massive APIs". https://arxiv.org/abs/2305.15334
- **Zhu et al. (2024)** — "AgentTuning: Enabling Generalized Agent Abilities for LLMs". https://arxiv.org/abs/2310.12823

### Agent Trajectory Datasets
- **AgentBank** — 50,000+ trajectories across 16 tasks. https://github.com/FlagOpen/AgentBank
- **ToolBench** — 16,000+ API tools with usage examples. https://github.com/OpenBMB/ToolBench
- **AgentInstruct** — Instruction-tuning data for agent behavior.
- **ShareGPT** — Conversational data format. https://sharegpt.com/

### RL for Agents
- **Ouyang et al. (2022)** — "Training Language Models to Follow Instructions with Human Feedback" (InstructGPT / RLHF). https://arxiv.org/abs/2203.02155
- **DeepSeek-R1** (Jan 2025) — Pure RL with GRPO. https://arxiv.org/abs/2501.12948
- **OpenAI o3** (April 2025) — RL-trained for tool use and reasoning.

### Process Reward Models
- **Lightman et al. (2023)** — "Let's Verify Step by Step" (PRM800K). https://arxiv.org/abs/2305.20050
- **PRIME** — Implicit process rewards from outcome labels only. https://arxiv.org/abs/2502.01456
- **AgentPRM** (Cornell + Fudan) — Practical actor-critic for multi-turn agents. https://arxiv.org/abs/2502.05992
- **PQM** — Q-value rankings for theoretically principled PRMs.

### Synthetic Trajectories
- **Simia** — Synthetic trajectory generation for agent training.
- **STeP** — Self-training via Planning. https://arxiv.org/abs/2409.20819

## Subtext & Nuance
- In-context learning (few-shot prompting) is zero-shot agency — no training, just prompts and tools. It works surprisingly well for simple tasks.
- The scaling hypothesis holds for agents: larger models exhibit stronger emergent agentic capabilities (tool use, planning, self-correction).
- SFT on agent trajectories requires careful masking: the LLM should learn from actions, not from observations (which it didn't generate).
- **Catastrophic forgetting** is real: fine-tuning for tool use can degrade general knowledge. Use LoRA or replay buffers.
- RL for tool use is the frontier: o3/o4-mini trained via RL to chain 600+ tool calls. This is not prompt engineering; it's learned behavior.

## Implementation Notes
- Trajectory formatting: `[User query] → [Thought] → [Action] → [Observation] → ... → [Final Answer]`
- Mask observations during loss computation — only train on thoughts and actions.
- Use LoRA (Low-Rank Adaptation) for efficient fine-tuning without catastrophic forgetting.
- GRPO (Group Relative Policy Optimization) is simpler than PPO and works well for reasoning tasks (DeepSeek-R1 approach).

## Deprecated / Superseded
- Pure SFT without RL — RL significantly outperforms SFT for complex agent tasks.
- Training on human demonstrations alone — synthetic trajectories (Simia, STeP) scale better.

## Cross-References
- **Previous**: Ch 6 (ReAct Project) — the architecture being trained.
- **Next**: Ch 8 (Chain-of-Thought) — reasoning capabilities that emerge from training.
- **Related**: Ch 15 (Training Single Agents) — deeper dive into PRMs and RL.
- **Related**: Ch 23 (Reasoning Models) — how o3/R1 were trained.
