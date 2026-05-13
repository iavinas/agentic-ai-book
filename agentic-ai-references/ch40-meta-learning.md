# Chapter 40: Meta-Learning and Few-Shot Adaptation

## Core Thesis
Meta-learning finds good initialization points for rapid adaptation. MAML, Reptile, and in-context tool learning enable agents to acquire new skills in minutes.

## Key References

### Meta-Learning
- **Finn et al. (2017)** — "Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks" (MAML). ICML. https://arxiv.org/abs/1703.03400
- **Nichol et al. (2018)** — "On First-Order Meta-Learning Algorithms" (Reptile). https://arxiv.org/abs/1803.02999
- **Antoniou et al. (2019)** — "How to train your MAML". https://arxiv.org/abs/1810.09502

### Few-Shot Tool Acquisition
- **In-context tool learning** — Describing a new tool and using it immediately.
- **Rapid adaptation** — Adjusting to new environments in minutes.
- **Tool composition** — Combining known tools for new capabilities.

### Adaptive Planning
- **Case-based planning** — Retrieving and adapting past plans.
- **Hindsight Experience Replay** — Andrychowicz et al. (2017). https://arxiv.org/abs/1707.01495

## Subtext & Nuance
- MAML: find model parameters such that one gradient step on a new task yields good performance. Second-order (compute Hessian) or first-order (approximate) variants.
- Reptile: simpler than MAML. Repeatedly sample task, train a few steps, move meta-parameters toward task parameters. No need for train/test split within tasks.
- In-context tool learning is the most practical form for LLM agents: describe a new tool in natural language, and the LLM can use it immediately. No gradient steps needed.
- Case-based planning: retrieve a similar past plan, adapt it to the current situation. Faster than planning from scratch.
- Hindsight Experience Replay: learn from failed attempts by re-labeling them as successes for modified goals.

## Cross-References
- **Previous**: Ch 39 (Continual Learning) — sequential task learning.
- **Next**: Ch 41 (Long-Term Memory Project) — implementing adaptive memory.
- **Related**: Ch 15 (Training Single Agents) — training for rapid adaptation.
