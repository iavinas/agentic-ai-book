# Chapter 39: Continual Learning and Catastrophic Forgetting

## Core Thesis
Agents must learn new skills without forgetting old ones. Replay buffers, EWC, and progressive networks are the main strategies.

## Key References

### Catastrophic Forgetting
- **McCloskey & Cohen (1989)** — "Catastrophic Interference in Connectionist Networks". Psychology of Learning and Motivation.
- **Kirkpatrick et al. (2017)** — "Overcoming Catastrophic Forgetting in Neural Networks" (EWC). PNAS. https://arxiv.org/abs/1612.00796

### Continual Learning Strategies
- **Progressive Networks** — Rusu et al. (2016). https://arxiv.org/abs/1606.04671
- **Replay Buffers** — Rehearsal / experience replay.
- **LwF (Learning without Forgetting)** — Li & Hoiem (2017). https://arxiv.org/abs/1606.09282

### Agent-Specific
- **Tool acquisition** — Learning new tools over time.
- **Domain adaptation** — Transferring to new environments.
- **Curriculum learning** — Easy-to-hard sequencing.

## Subtext & Nuance
- Catastrophic forgetting is the fundamental challenge: when you train a neural network on task B after task A, it often forgets task A.
- EWC (Elastic Weight Consolidation) protects important parameters for old tasks by adding a penalty to their change. Like adding springs to keep weights near their old values.
- Progressive networks add a new "column" of layers for each new task. No forgetting, but parameter count grows linearly.
- Replay buffers: mix old and new training data. Simple and effective, but requires storing old data.
- Backward transfer metrics: does learning task B improve performance on task A? Positive backward transfer is the gold standard.

## Cross-References
- **Previous**: Ch 38 (Episodic Memory) — storing experiences for replay.
- **Next**: Ch 40 (Meta-Learning) — learning to learn.
- **Related**: Ch 7 (Pre-training) — avoiding forgetting during fine-tuning.
- **Related**: Ch 42 (Training Memory Agents) — training with replay.
