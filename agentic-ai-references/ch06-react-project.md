# Chapter 6: Project — Building a ReAct Agent from Scratch

## Core Thesis
A complete ReAct agent in pure Python, zero frameworks. This is the foundational project that every subsequent chapter builds upon.

## Key References

### ReAct
- **Yao et al. (2023)** — "ReAct: Synergizing Reasoning and Acting in Language Models". https://arxiv.org/abs/2210.03629

### Tool Systems
- **OpenAI Function Calling** — https://platform.openai.com/docs/guides/function-calling
- **JSON Schema** — https://json-schema.org/

### Local LLM Backends
- **Ollama** — https://ollama.com/
- **vLLM** — https://github.com/vllm-project/vllm
- **llama.cpp** — https://github.com/ggerganov/llama.cpp

## Subtext & Nuance
- This is the most important chapter in Part I. The reader should spend the most time here.
- The project must be pure Python — no LangChain, no CrewAI, no frameworks. The goal is understanding, not productivity.
- ~400 lines of core agent code is the target. More code is fine if it's educational; less code might hide important details.
- The agent should be pluggable: OpenAI API, Anthropic, or local via Ollama/vLLM.
- Built-in tools: calculator, web search (SerpAPI), file read/write, Python execution (subprocess with timeout), memory store/retrieve.
- **Critical implementation detail**: Tool parsing must handle both JSON and natural language fallback. Not all local models output perfect JSON.

## Implementation Notes
### Architecture
```
Agent
├── state: dict (current task, scratchpad, step count)
├── tools: dict[str, Callable]
├── llm: LLMBackend (OpenAI | Anthropic | Local)
└── loop()
    while not done:
        prompt = build_react_prompt(state, tools)
        response = llm.generate(prompt)
        thought, action = parse_react_response(response)
        if action is None: return thought  # final answer
        observation = execute_action(action)
        update_state(state, thought, action, observation)
```

### Tool System
- `@tool` decorator registers functions with auto-generated JSON schema (inspect signatures).
- Tool execution: `subprocess.run(timeout=30)` for Python code; `open()` for files; `requests` for web search.
- Error recovery: if a tool fails, feed the error traceback back into the scratchpad. The LLM often self-corrects.

### Evaluation
- Test tasks: math word problems, web lookup + calculation, file manipulation.
- Metrics: success rate, average steps per task, token cost per task.

## Extensions (for ambitious readers)
- Add a simple planning module that generates subgoals before the ReAct loop.
- Implement self-reflection: after N steps, ask the LLM "is this approach working?"
- Add a simple vector memory for cross-task recall.

## Cross-References
- **Previous**: Ch 1-5 (Foundations) — all theory leading to this project.
- **Next**: Ch 7 (Pre-training for Agency) — training the agent's LLM backend.
- **Related**: Ch 45 (Framework Project) — scales this into a reusable framework.
- **Related**: Ch 25 (Planner Project) — adds hierarchical planning on top of ReAct.
