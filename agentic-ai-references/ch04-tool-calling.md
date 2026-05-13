# Chapter 4: Tool Calling and Function Calling Deep Dive

## Core Thesis
Tool calling is the agent's bridge to the external world. Constrained decoding, schema enforcement, and dynamic tool selection are the implementation pillars.

## Key References

### Structured Generation
- **Willard & Louf (2023)** — "Efficient Guided Generation for Large Language Models". https://arxiv.org/abs/2307.09702
- **Beurer-Kellner et al. (2023)** — "Guiding Large Language Models via Schema Engineering". https://arxiv.org/abs/2210.12250
- **Dottax et al. (2023)** — "Outlines: Generative Model Programming". https://github.com/dottax/outlines

### API Specifications
- **OpenAI Function Calling API** — https://platform.openai.com/docs/guides/function-calling
- **Anthropic Tool Use** — XML-based tool calling. https://docs.anthropic.com/claude/docs/tool-use
- **JSON Schema** — https://json-schema.org/

### Dynamic Tool Selection
- **MCP (Model Context Protocol)** — Decoupling tool definitions from agents. https://modelcontextprotocol.io/
- **ToolLLM / ToolBench** — 16,000+ real-world APIs for training. https://github.com/OpenBMB/ToolBench

## Subtext & Nuance
- Constrained decoding is critical for reliability. Without it, LLMs hallucinate tool names, invent parameters, or output malformed JSON.
- Grammar-based decoding (CFG, regex, JSON schema) forces valid outputs at generation time, not just validation after.
- The context window limit creates a "tool registry problem" — you can't fit 1,000 tool definitions in context. Vector search for tool selection solves this.
- Meta-tools (`search_tools`, `list_tools`) are first-class citizens — the agent needs tools to find tools.
- Tool idempotency matters: what happens if the same tool is called twice? Safe tools should be idempotent; unsafe ones (write, delete) need protection.

## Implementation Notes
- JSON schema → Python `pydantic` models for validation.
- Tool parsing pipeline: LLM output → JSON parser → schema validation → function dispatch → result formatting → back to LLM.
- Anthropic uses XML (`<tool>calculator</tool>`) while OpenAI uses JSON (`{"name": "calculator", "arguments": {...}}`). Both work; JSON is more standard.

## Deprecated / Superseded
- Unconstrained tool calling (letting the LLM freely output function calls without schema enforcement) — unreliable in production.
- Hardcoded tool sets without dynamic discovery — too rigid for real-world agents.

## Cross-References
- **Previous**: Ch 3 (LLM Primitives) — introduces tool use.
- **Next**: Ch 5 (Memory and State) — tool outputs become part of state.
- **Related**: Ch 46 (MCP/A2A Protocols) — industry standard protocols for tool definition.
- **Related**: Ch 6 (ReAct Project) — implements the tool system.
