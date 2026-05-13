# Chapter 8: Chain-of-Thought and Advanced Reasoning

## Core Thesis
Reasoning evolved from prompted chains to internalized capabilities. Understanding this evolution is essential for knowing when prompting works and when training is required.

## Key References

### Classic CoT
- **Wei et al. (2022)** — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models". NeurIPS 2022. https://arxiv.org/abs/2201.11903
- **Kojima et al. (2022)** — "Large Language Models are Zero-Shot Reasoners". https://arxiv.org/abs/2205.11916
- **Wang et al. (2023)** — "Self-Consistency Improves Chain of Thought Reasoning". ICLR 2023. https://arxiv.org/abs/2203.11171

### Advanced Prompting
- **Zhou et al. (2023)** — "Least-to-Most Prompting Enables Complex Reasoning". ICLR 2023. https://arxiv.org/abs/2205.10625
- **Fu et al. (2023)** — "Complexity-Based Prompting for Multi-Step Reasoning". ICLR 2023. https://arxiv.org/abs/2210.00720
- **Yasunaga et al. (2023)** — "Reasoning with Language Model is Planning with World Model". https://arxiv.org/abs/2303.14913

### Reasoning Models (2024-2025)
- **OpenAI o1** (Sep 2024) — "Learning to Reason with LLMs". https://openai.com/index/learning-to-reason-with-llms/
- **OpenAI o3 / o4-mini** (April 2025) — Full tool use + reasoning.
- **DeepSeek-R1** (Jan 2025) — Pure RL emergence of reflection and verification. https://arxiv.org/abs/2501.12948
- **QwQ-32B** (Mar 2025) — Compact open-weight reasoning with native tool tokens. https://huggingface.co/Qwen/QwQ-32B
- **Gemini 2.5 Flash Thinking** (Apr 2025) — Controllable reasoning budget via `thinking_budget`. https://deepmind.google/models/gemini/

## Subtext & Nuance
- The paradigm shift of 2024-2025: classic CoT prompting is now viewed as a hack for non-reasoning models. Frontier models (o3, R1, QwQ) internalize reasoning through RL.
- **Pedagogical tension**: Must teach CoT because it's the foundation, but must also explain why it's becoming obsolete for frontier models.
- Complexity-based prompting: harder examples in the prompt yield better reasoning on hard problems. Counter-intuitive but well-supported.
- Self-consistency (majority voting across multiple samples) is a cheap test-time scaling strategy that predates reasoning models.
- Confidence estimation via token logprobs: useful for detecting uncertain steps, but logprobs are not well-calibrated on all models.

## Deprecated / Superseded
- "Let's think step by step" as a universal prompt for frontier models — o3/R1 don't need this prompt; they reason natively.
- Pure prompting-based reasoning for complex math/code tasks — superseded by RL-trained reasoning.

## Cross-References
- **Previous**: Ch 7 (Pre-training) — how reasoning capabilities are trained.
- **Next**: Ch 9 (ToT/GoT) — tree-structured reasoning beyond linear chains.
- **Related**: Ch 23 (Reasoning Models) — the o1/o3/R1/QwQ revolution.
- **Related**: Ch 26 (Evaluating Planning) — reasoning benchmarks like MATH, GPQA.
