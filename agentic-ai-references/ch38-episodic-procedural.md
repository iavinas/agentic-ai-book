# Chapter 38: Episodic and Procedural Memory

## Core Thesis
Episodic memory stores past interactions as retrievable episodes. Procedural memory stores reusable skills. Both enable learning from experience.

## Key References

### Experience Replay
- **Lin (1992)** — "Self-Improving Reactive Agents Based On Reinforcement Learning, Planning and Teaching". Machine Learning.
- **Schaul et al. (2016)** — "Prioritized Experience Replay". https://arxiv.org/abs/1511.05952

### Skill Libraries
- **Wang et al. (2023)** — "Voyager: An Open-Ended Embodied Agent with Large Language Models". https://arxiv.org/abs/2305.16291
- **Skill libraries in Voyager** — Minecraft skills as executable code.

### Memory Architectures
- **MemoryBank** — https://arxiv.org/abs/2305.10250
- **MemGPT** — "Towards LLMs as Operating Systems". https://arxiv.org/abs/2310.08560

## Subtext & Nuance
- Episodic memory stores: `(timestamp, query, response, outcome, embedding)`. Retrieval by similarity to current query + recency weighting.
- Procedural memory = "how-to" knowledge. In agents, this means reusable skills stored as code or action sequences.
- Voyager's skill library is the canonical example: the agent writes Minecraft skills as Python functions, stores them, and reuses them.
- Skill composition: combining simple skills into complex behaviors. e.g., `mine_iron` + `craft_pickaxe` + `mine_diamond`.
- Memory consolidation: moving short-term memories to long-term. Abstraction: generalizing specific episodes into general rules.
- The "sleep" analogy: computational consolidation during idle time. Not yet implemented in most agents but conceptually important.

## Cross-References
- **Previous**: Ch 37 (Knowledge Graphs) — structured memory.
- **Next**: Ch 39 (Continual Learning) — learning without forgetting.
- **Related**: Ch 5 (Memory Basics) — introduced episodic/procedural memory.
- **Related**: Ch 41 (Long-Term Memory Project) — implements episodic memory.
