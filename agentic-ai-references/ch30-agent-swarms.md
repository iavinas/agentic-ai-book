# Chapter 30: Agent Swarms and Decentralized Systems

## Core Thesis
Swarm intelligence: decentralized control, local interaction, emergent collective behavior. Stigmergy and market-based mechanisms enable scalable task allocation.

## Key References

### Swarm Intelligence
- **Bonabeau et al. (1999)** — "Swarm Intelligence: From Natural to Artificial Systems". Oxford.
- **Dorigo & Stützle (2004)** — "Ant Colony Optimization". MIT Press.
- **Kennedy & Eberhart (1995)** — "Particle Swarm Optimization". IEEE.

### Swarm Architectures
- **SwarmSys** (Oct 2025) — Explorer/Worker/Validator roles with pheromone reinforcement. https://arxiv.org/abs/2502.XXXXX
- **Particle Swarm Optimization for multi-LLM systems**.

### Decentralized Task Allocation
- **Contract Net Protocol** — Smith (1980). Announce, bid, award.
- **Market-based mechanisms** — Agents bid on tasks.
- **Consensus-based allocation** — Agents agree on allocation.

## Subtext & Nuance
- Decentralized control: no single leader. Agents only communicate with neighbors. The system is robust to individual failures.
- Stigmergy: indirect coordination through environmental modifications. Ants leave pheromone trails; agents leave "digital trails" in shared memory.
- SwarmSys (Oct 2025): pheromone-inspired reinforcement where validated traces strengthen and ineffective ones decay. Explicit implementation of stigmergy for LLMs.
- Market-based allocation: agents bid on tasks based on their capabilities and current load. Efficient but requires truthful bidding (hard to enforce).
- Robustness to agent failure: if one agent crashes, the swarm continues. This is a key advantage over centralized systems.

## Cross-References
- **Previous**: Ch 29 (Competitive) — game-theoretic foundations.
- **Next**: Ch 31 (Hierarchies) — structured organizations.
- **Related**: Ch 24 (SwarmSys) — swarm reasoning.
- **Related**: Ch 35 (Evaluating Multi-Agent) — measuring swarm performance.
