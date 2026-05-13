# Chapter 31: Hierarchical Multi-Agent Organizations

## Core Thesis
Manager-worker hierarchies, organizational charts as agent topologies. Authority, delegation, and reporting chains structure multi-agent systems.

## Key References

### Hierarchies
- **Mintzberg (1979)** — "The Structuring of Organizations". Prentice-Hall. (Classic organizational theory)
- **Wooldridge (2009)** — "An Introduction to MultiAgent Systems".

### Modern Frameworks
- **Microsoft Agent Framework** — Magentic (manager-delegated subtasks). Successor to AutoGen + Semantic Kernel.
- **AG2 Beta** — MemoryStream pub/sub, event-driven agent groups.
- **CrewAI Flows** — Low-level orchestration for massive complexity.

### Dynamic Hierarchy
- **Dynamic hierarchy formation** — Agents elect leaders based on expertise or load.
- **Span of control** — How many workers per manager? Flat vs deep hierarchies.

## Subtext & Nuance
- Organizational charts can literally be agent topologies. The manager delegates; workers execute; results flow up.
- Flat hierarchies (few levels, many workers per manager) have low communication overhead but weak coordination. Deep hierarchies (many levels, few workers per manager) have strong coordination but high latency.
- Microsoft Agent Framework (2026) explicitly implements manager-delegated subtasks as a first-class pattern.
- Dynamic hierarchy adaptation: agents restructure as tasks evolve. This is harder than static hierarchies but more flexible.
- Escalation chains: when a worker can't solve a problem, it escalates to its manager, who may escalate further.

## Cross-References
- **Previous**: Ch 30 (Swarms) — flat, decentralized systems.
- **Next**: Ch 32 (Consensus) — resolving conflicts in hierarchies.
- **Related**: Ch 28 (Cooperative) — shared goals in teams.
- **Related**: Ch 33 (Multi-Agent Coding) — implementing hierarchies.
