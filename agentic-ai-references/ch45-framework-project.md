# Chapter 45: Project — Building an Agent Framework from Scratch

## Core Thesis
Core abstractions in pure Python: Agent, Tool, Memory, Environment, Loop. The capstone project of Part VI.

## Key References

### Framework Design
- **smolagents** — ~1,000 LOC reference. https://github.com/huggingface/smolagents
- **PydanticAI** — Type-safe design. https://ai.pydantic.dev/
- **OpenAI Agents SDK** — https://github.com/openai/openai-agents-python

## Subtext & Nuance
- The goal is understanding, not productivity. The reader builds the abstractions themselves to truly understand what frameworks hide.
- Core classes: `Agent` (system prompt, model backend, tools), `Tool` (decorator-based registration with JSON schema inference), `Memory` (pluggable: in-memory, FAISS), `Environment` (context manager for state isolation), `Loop` (ReAct with error handling).
- Tool auto-discovery: use Python `inspect` to automatically generate JSON schemas from function signatures.
- Async support: `async def` tools for concurrent execution (e.g., parallel API calls).
- Streaming: yield intermediate thoughts and actions as they're generated.
- Checkpointing: save agent state to disk and resume later. Critical for long-running agents.

## Implementation Notes
- Pure Python, ~500-800 lines.
- No external dependencies beyond `openai` (or equivalent) and `faiss-cpu` (optional).
- Architecture:
```python
@tool
def calculator(expression: str) -> str: ...

agent = Agent(
    model=OpenAIBackend("gpt-4o"),
    tools=[calculator, search, read_file],
    memory=FAISSMemory(),
    system_prompt="You are a helpful assistant..."
)
result = agent.run("What is 2 + 2?")
```

## Evaluation
- Test with the ReAct agent from Chapter 6.
- Benchmark overhead vs. direct API calls.
- Extension: add a multi-agent orchestration layer.

## Cross-References
- **Previous**: Ch 44 (Frameworks Landscape) — the systems being understood.
- **Next**: Ch 46 (MCP/A2A Protocols) — extending the framework with protocols.
- **Related**: Ch 6 (ReAct Project) — the agent implemented on this framework.
