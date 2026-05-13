# Chapter 34: Training Multi-Agent Systems

## Core Thesis
Centralized training with decentralized execution (CTDE) enables coordinated multi-agent behavior. Communication learning and emergent language are the frontiers.

## Key References

### CTDE
- **Lowe et al. (2017)** — "Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments" (MADDPG). https://arxiv.org/abs/1706.02275
- **Rashid et al. (2018)** — "QMIX: Monotonic Value Function Factorisation". https://arxiv.org/abs/1803.11485
- **Sunehag et al. (2018)** — "Value-Decomposition Networks (VDN)". https://arxiv.org/abs/1706.05296

### Communication Learning
- **Foerster et al. (2016)** — "Learning to Communicate with Deep Multi-Agent Reinforcement Learning". https://arxiv.org/abs/1605.06676
- **Lazaridou et al. (2017)** — "Multi-Agent Cooperation and the Emergence of (Natural) Language". https://arxiv.org/abs/1612.07182

### Self-Play
- **Silver et al. (2017)** — "Mastering the game of Go without human knowledge" (AlphaZero self-play).
- **Bansal et al. (2018)** — "Emergent Complexity via Multi-Agent Competition". https://arxiv.org/abs/1710.03748

## Subtext & Nuance
- CTDE: centralized critic sees all agents' states and actions; decentralized actors only see local observations. This is the dominant paradigm.
- Non-stationarity: other agents' policies change during training, making the environment non-stationary from any single agent's perspective. This is the fundamental challenge of multi-agent RL.
- Credit assignment: which agent caused the success/failure? VDN, QMIX, and QTRAN decompose the joint value function to assign credit.
- Emergent language: agents developing their own communication protocols. Surprisingly, these protocols often become human-interpretable.
- Self-play: agents train against copies of themselves. This automatically generates a curriculum of increasingly strong opponents.

## Cross-References
- **Previous**: Ch 33 (Multi-Agent Coding) — the system being trained.
- **Next**: Ch 35 (Evaluating Multi-Agent) — measuring training success.
- **Related**: Ch 15 (Training Single Agents) — single-agent RL foundations.
- **Related**: Ch 29 (Competitive) — game-theoretic training.
