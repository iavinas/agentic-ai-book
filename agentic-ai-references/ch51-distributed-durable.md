# Chapter 51: Distributed and Durable Execution

## Core Thesis
95% per-step reliability → 8% success for 50-step workflows without durability. Temporal.io and DBOS provide the execution infrastructure.

## Key References

### Durability Imperative
- **Reliability math** — 0.95^50 = 0.076. 95% per-step reliability fails over long horizons.
- **Complexity levels** — L1 (ms, single inference), L2 (seconds, session state), L3 (minutes-hours, durable execution), L4/L5 (multi-agent / indefinite).

### Temporal.io
- **$5B valuation, 380% YoY revenue growth**.
- **Event-history replay** — Resume from exact step after crashes.
- **OpenAI Agents SDK + Temporal integration** — GA March 2026.
- **Users** — OpenAI (Codex), Replit, Lovable, Abridge, Hebbia.
- **https://temporal.io/**

### DBOS
- **Open-source library** — No separate server.
- **Postgres/SQLite checkpoints** — Workflow state directly to database.
- **25× faster than AWS Lambda + Step Functions**.
- **March 2026** — MCP server, workflow patching, dynamic scheduling.
- **https://dbos.dev/**

### Async Production Patterns
- **Orchestrator-Worker** — Central dispatcher with worker pools.
- **Hierarchical Agent** — Parent spawns ephemeral children per event.
- **Blackboard** — Shared event log as collaborative memory.
- **Event-driven** — Kafka/Redis Streams + A2A for inter-agent communication.

### Scaling
- **Kubernetes HPA on in-flight graph runs** (not CPU).
- **Redis per-thread locks** — For checkpoint race conditions.
- **Tiered LLM routing** — Cost optimization.
- **WebSocket streaming** — Real-time agent updates.

## Subtext & Nuance
- Durability is not optional for production agents. Any workflow with >10 steps needs durable execution.
- Temporal's event-history replay is the key innovation: instead of checkpointing state, it replays the event log to reconstruct state. This is more reliable than state snapshots.
- DBOS is simpler than Temporal for many use cases: just a Python library that checkpoints to Postgres. No separate server needed.
- Kubernetes HPA should scale on in-flight graph runs (a proxy for agent workload), not CPU. CPU is a poor metric for LLM inference.
- WebSocket streaming is essential for real-time UX: users see agent thoughts and actions as they happen, not at the end.

## Cross-References
- **Previous**: Ch 50 (Cost Management) — scaling cost-efficiently.
- **Next**: Ch 52 (Evaluating Production) — measuring distributed systems.
- **Related**: Ch 27 (Communication) — async patterns.
- **Related**: Ch 44 (Frameworks) — Temporal integration.
