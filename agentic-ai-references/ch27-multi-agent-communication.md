# Chapter 27: Multi-Agent Communication Patterns

## Core Thesis
Multi-agent systems require communication topologies, message passing protocols, and coordination mechanisms. A2A v1.0 (March 2026) and MCP are the emerging standards.

## Key References

### Communication Topologies
- **Wooldridge (2009)** — "An Introduction to MultiAgent Systems". Classic textbook.
- **Russell & Norvig (2020)** — "Artificial Intelligence: A Modern Approach". Chapter on multi-agent systems.

### A2A Protocol
- **A2A v1.0** — Google / Linux Foundation (March 2026). https://github.com/a2a-protocol/a2a
- **Agent Cards** — Dynamic discovery via `.well-known/agent-card.json`.
- **Task lifecycle** — submitted, working, input-required, completed, cancelled.

### MCP
- **Model Context Protocol** — https://modelcontextprotocol.io/
- **Architecture** — Host, Client, Server, Transport (stdio or SSE).

### Blackboard & Shared Memory
- **Corkill (1991)** — "Blackboard Systems". AI Expert Magazine.

## Subtext & Nuance
- Fully connected topology (every agent talks to every agent) is simple but O(n²) in messages. Star/hub-and-spoke scales better but creates a bottleneck.
- Pipeline topology (agents pass outputs sequentially) is natural for workflows like software engineering (PM → Architect → Coder → Reviewer).
- A2A v1.0 (March 2026) is the first industry-standard agent-to-agent protocol. It defines Agent Cards, task lifecycle, and security (OAuth2, mTLS).
- Synchronous coordination is predictable but slow; asynchronous is faster but harder to debug. Hybrid approaches (synchronized phases with async execution within phases) are emerging.
- Blackboard architecture: shared memory where agents post observations and read updates. Good for collaborative problem-solving.

## Implementation Notes
- Message format: `{sender, recipient, type, payload, timestamp, id}`
- Delivery guarantees: at-least-once (Redis Streams), exactly-once (Kafka with idempotency).
- Timeout handling: if an agent doesn't respond within T seconds, escalate or retry.

## Cross-References
- **Previous**: Ch 26 (Evaluating Planning) — Part IV begins.
- **Next**: Ch 28 (Cooperative Multi-Agent) — using communication for cooperation.
- **Related**: Ch 46 (MCP/A2A Protocols) — deep dive into protocols.
- **Related**: Ch 33 (Multi-Agent Coding) — implementing communication.
