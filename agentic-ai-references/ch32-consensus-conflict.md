# Chapter 32: Consensus and Conflict Resolution

## Core Thesis
Agents disagree. Formal consensus protocols (Aegean, Byzantine fault tolerance) and conflict resolution mechanisms (voting, arbitration, negotiation) ensure collective progress.

## Key References

### Consensus
- **Lamport et al. (1982)** — "The Byzantine Generals Problem". ACM.
- **Castro & Liskov (1999)** — "Practical Byzantine Fault Tolerance". OSDI.
- **Aegean** (Dec 2025) — Formal consensus for stochastic LLM agents. 1.2-20× latency reduction. https://arxiv.org/abs/2502.XXXXX

### Voting & Decision Making
- **Du et al. (2023)** — "Improving Factuality through Multiagent Debate". https://arxiv.org/abs/2305.14325
- **Majority voting / plurality voting / weighted voting**.

### Conflict Resolution
- **Negotiation protocols** — Rubinstein bargaining, alternating offers.
- **Arbitration** — Third agent breaks ties.

## Subtext & Nuance
- Aegean (Dec 2025) is the first formal consensus protocol designed for stochastic agents. Key concepts: Stability Horizon (how long to wait), quorum thresholds (how many agents must agree).
- Byzantine fault tolerance handles malicious or faulty agents. Critical for security: what if one agent is compromised?
- Voting: majority (more than half), plurality (most votes, even if less than half), weighted (by confidence or expertise).
- Multi-agent debate improves reasoning when agents have complementary knowledge. If they all know the same things, debate is redundant.
- Cascading failures: one agent's error propagating through the system. Isolation boundaries prevent this.

## Cross-References
- **Previous**: Ch 31 (Hierarchies) — where conflicts arise.
- **Next**: Ch 33 (Multi-Agent Coding) — implementing consensus.
- **Related**: Ch 29 (Competitive) — game-theoretic foundations.
- **Related**: Ch 64 (Interpretability) — detecting misbehavior.
