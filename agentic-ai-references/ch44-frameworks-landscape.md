# Chapter 44: Agent Frameworks Landscape

## Core Thesis
The framework decision matrix (2026): role-based, graph-based, conversational, type-safe, declarative, lightweight. AutoGen and Swarm are deprecated.

## Key References

### Active Frameworks (2026)
- **CrewAI v1.0** (Oct 2025) — Role-based orchestration, 1.4B+ automations. https://www.crewai.com/
- **LangGraph** — Graph-based state machines for complex agents. https://langchain-ai.github.io/langgraph/
- **AG2 Beta** (Jan 2026) — Conversational/event-driven, successor to AutoGen. https://ag2.ai/
- **PydanticAI v1.94** — Type-safe functional, FastAPI-style, 50,000+ workflows. https://ai.pydantic.dev/
- **DSPy v3.2** — Declarative optimization, prompt optimization, portable pipelines. https://dspy.ai/
- **smolagents** — Lightweight prototyping, ~1,000 LOC philosophy. https://github.com/huggingface/smolagents
- **Microsoft Agent Framework** — Successor to AutoGen + Semantic Kernel. https://github.com/microsoft/agent-framework
- **ChatDev 2.0** (Jan 2026) — Zero-code visual orchestration. https://github.com/OpenBMB/ChatDev

### Deprecated
- **AutoGen (original)** — Maintenance mode since Feb 2026. Replaced by AG2 Beta / Microsoft Agent Framework.
- **OpenAI Swarm** — Officially deprecated early 2025. Replaced by OpenAI Agents SDK.
- **LangChain for new projects** — Actively declining. Teams ripping it out. Still maintained but not recommended for new work.

### The "No Framework" Movement
- **Modern provider SDKs** — OpenAI SDK, Anthropic SDK, Google GenAI SDK.
- **The 15-line agent** — OpenAI SDK + 3 tools + a loop.

## Subtext & Nuance
- Framework choice depends on use case: CrewAI for role-based teams, LangGraph for stateful production agents, PydanticAI for type-safe applications, DSPy for research/experimentation.
- LangChain is in decline for new projects because it's overly complex and hard to debug. However, LangGraph (built on LangChain but conceptually separate) is gaining traction for production.
- The "no framework" movement argues that modern provider SDKs + vector DB clients are sufficient for 80% of use cases.
- PydanticAI's type safety is a genuine differentiator — it uses Python type hints to enforce tool schemas at compile time.
- DSPy's declarative approach separates the "what" (pipeline) from the "how" (prompts), enabling automatic optimization.

## Cross-References
- **Previous**: Ch 43 (Evaluating Memory) — Part VI begins.
- **Next**: Ch 45 (Framework Project) — building from scratch.
- **Related**: Ch 46 (MCP/A2A Protocols) — protocols that frameworks implement.
