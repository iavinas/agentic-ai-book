# Chapter 46: Tool Definition, Discovery, and Protocols

## Core Thesis
MCP (97M downloads), A2A v1.0, and AG-UI form the three-layer protocol model: agent↔user, agent↔tools, agent↔agent.

## Key References

### MCP (Model Context Protocol)
- **MCP** — https://modelcontextprotocol.io/
- **97M monthly SDK downloads** (March 2026).
- **Architecture** — Host, Client, Server, Transport (stdio or SSE).
- **Primitives** — Tools, Resources, Prompts.
- **Registry** — Official MCP Registry with namespace auth.
- **Vendor adoption** — Claude Code, Cursor, Windsurf, VS Code, Zed, Cloudflare.

### A2A (Agent-to-Agent Protocol)
- **A2A v1.0** — Google / Linux Foundation (March 2026). https://github.com/a2a-protocol/a2a
- **150+ production orgs, 22,000+ GitHub stars**.
- **Agent Cards** — Dynamic discovery via `.well-known/agent-card.json`.
- **Task lifecycle** — submitted, working, input-required, completed, cancelled.
- **Security** — OAuth2, mTLS, JWS-signed cards.

### AG-UI (Agent-User Interaction Protocol)
- **AG-UI** — https://github.com/ag-ui/protocol
- **~16 event types**.
- **Transport-agnostic** — SSE, WebSockets, webhooks.
- **Partners** — LangGraph, CrewAI, Pydantic AI, Google ADK, Microsoft Agent Framework.

## Subtext & Nuance
- MCP decouples tool definitions from agents. Any MCP-compatible tool works with any MCP-compatible agent. This is the USB-C moment for AI tools.
- A2A is the first true agent-to-agent standard. Before A2A, agents communicated via ad-hoc APIs or shared memory. A2A formalizes discovery, negotiation, and task handoff.
- The three-layer model: AG-UI (presentation), MCP (tool access), A2A (agent coordination). Together they form a complete interoperability stack.
- MCP servers are stateless and transport-agnostic. They can run locally (stdio) or remotely (SSE).
- A2A Agent Cards are like OpenAPI specs for agents: they advertise capabilities, endpoints, and authentication requirements.

## Cross-References
- **Previous**: Ch 45 (Framework Project) — the framework that implements these protocols.
- **Next**: Ch 47 (Security) — securing protocol communications.
- **Related**: Ch 4 (Tool Calling) — the fundamentals that protocols formalize.
- **Related**: Ch 27 (Communication) — multi-agent communication patterns.
