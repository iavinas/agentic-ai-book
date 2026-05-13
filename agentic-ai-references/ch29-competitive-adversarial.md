# Chapter 29: Competitive and Adversarial Agents

## Core Thesis
Game-theoretic agents compete, negotiate, and find weaknesses in each other. Multi-agent debate and red-teaming improve reasoning and robustness.

## Key References

### Game Theory
- **Nash (1950)** — "Equilibrium Points in N-Person Games". PNAS.
- **Myerson (1991)** — "Game Theory: Analysis of Conflict". Harvard University Press.
- **Shoham & Leyton-Brown (2009)** — "Multiagent Systems". Cambridge.

### MARL
- **Lowe et al. (2017)** — "Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments". https://arxiv.org/abs/1706.02275
- **Rashid et al. (2018)** — "QMIX: Monotonic Value Function Factorisation". https://arxiv.org/abs/1803.11485

### Debate & Deliberation
- **Du et al. (2023)** — "Improving Factuality and Reasoning in Language Models through Multiagent Debate". https://arxiv.org/abs/2305.14325
- **Constitutional Evolution** (Feb 2026) — Evolved norms for multi-agent coordination. https://arxiv.org/abs/2502.XXXXX
- **DCI** — Deliberative Collective Intelligence. Typed epistemic acts with convergence guarantees.

## Subtext & Nuance
- Nash equilibrium in multi-agent interactions: no agent can improve by unilaterally changing strategy. Finding equilibria in LLM agents is an open problem.
- Zero-sum vs cooperative games: zero-sum (one wins, one loses) is easier to analyze; cooperative (shared reward) is more common in practice.
- Multi-agent debate improves reasoning when agents have complementary private knowledge. If they have the same knowledge, debate adds no value.
- Constitutional Evolution (Feb 2026): agents evolve shared norms through iterative proposal, critique, and revision. First framework for norm emergence in LLM collectives.
- Adversarial robustness: agents playing against each other to find weaknesses is an effective red-teaming strategy.

## Cross-References
- **Previous**: Ch 28 (Cooperative) — cooperation vs competition.
- **Next**: Ch 30 (Swarms) — decentralized systems.
- **Related**: Ch 32 (Consensus) — resolving disagreements.
- **Related**: Ch 62 (Prompt Injection) — adversarial attacks.
