# Chapter 23: Reasoning Models and Test-Time Compute

## Core Thesis
The 2024-2025 reasoning model revolution (o1, o3, R1, QwQ) internalized chain-of-thought through RL. Test-time compute scaling is the new training-time scaling.

## Key References

### Reasoning Models
- **OpenAI o1** (Sep 2024) — "Learning to Reason with LLMs". https://openai.com/index/learning-to-reason-with-llms/
- **OpenAI o3 / o4-mini** (April 2025) — Full tool use + reasoning, 600+ consecutive tool calls.
- **DeepSeek-R1** (Jan 2025) — "Incentivizing Reasoning Capability in LLMs via Reinforcement Learning". https://arxiv.org/abs/2501.12948
- **QwQ-32B** (Mar 2025) — Qwen with native tool tokens for reasoning. https://huggingface.co/Qwen/QwQ-32B
- **Gemini 2.5 Flash Thinking** (Apr 2025) — Controllable reasoning budget. https://deepmind.google/models/gemini/

### Training Methods
- **RL with Verifiable Rewards (RLVR)** — Math, code, logic as reward sources.
- **GRPO** — Group Relative Policy Optimization (DeepSeek's approach). Simpler than PPO, no value model needed.
- **Process Reward Models** — Step-level feedback. See Ch 15.

### Test-Time Scaling
- **Snell et al. (2024)** — "Scaling LLM Test-Time Compute Optimally". https://arxiv.org/abs/2408.03314
- **CATTS** — Confidence-Aware Test-Time Scaling. https://arxiv.org/abs/2502.XXXXX
- **DORA** — Direction-Oriented Resource Allocation. https://arxiv.org/abs/2502.XXXXX

## Subtext & Nuance
- o1/o3 are trained with RL on verifiable tasks (math, code, logic). The model learns to generate long reasoning chains because that's what gets reward.
- DeepSeek-R1's pure RL emergence is remarkable: no SFT on reasoning chains, just RL on math problems. The model spontaneously develops reflection, verification, and backtracking.
- QwQ-32B shows that compact models can reason well if trained properly. Open-weights reasoning democratizes the capability.
- Gemini 2.5 Flash Thinking introduces `thinking_budget` — controllable reasoning time. This is the first mainstream API for trading compute for quality.
- Short-horizon models (R1, QwQ): concise reasoning, benefit from short-trace strategies. Long-horizon models (Qwen3, GPT-OSS): sustain deep traces, benefit from extended deliberation.

## Implementation Notes
- For users of frontier APIs: use `reasoning_effort` (OpenAI) or `thinking_budget` (Gemini) to control compute.
- For training: RLVR is the most accessible approach — define verifiable rewards (passes unit test, correct math answer) and run GRPO.
- Test-time strategies: shortest trace for low budgets, beam search for medium, majority voting for high.

## Cross-References
- **Previous**: Ch 22 (Self-Correction) — reasoning models internalize this.
- **Next**: Ch 24 (Advanced Reasoning) — swarm, graph, consensus reasoning.
- **Related**: Ch 15 (Training Single Agents) — PRMs and RL.
- **Related**: Ch 26 (Evaluating Planning) — reasoning benchmarks.
