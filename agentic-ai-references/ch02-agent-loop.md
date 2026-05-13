# Chapter 2: The Agent Loop — Observe, Think, Act

## Core Thesis
The OODA loop (Observe-Orient-Decide-Act) from military strategy applies directly to AI agents. The ReAct pattern formalizes this as an interleaved reasoning-acting trace.

## Key References

### Foundational Papers
- **Yao et al. (2023)** — "ReAct: Synergizing Reasoning and Acting in Language Models". ICLR 2023. https://arxiv.org/abs/2210.03629
- **Shunyu Yao et al. (2022)** — "WebShop: Towards Scalable Real-World Web Interaction with a Human Agent". NeurIPS 2022.

### OODA Loop Origins
- **John Boyd** — "OODA Loop" concept from military strategy (1970s-1990s). The core insight: faster OODA cycles beat slower opponents.

### Modern Loop Variants
- **RP-ReAct** (Dec 2025) — Reasoner-Planner supervising a ReAct Executor. Decouples high-level planning from low-level execution.
- **Dynamic ReAct** — Adjusting the loop based on environment feedback.

## Subtext & Nuance
- The scratchpad is the key innovation of ReAct — it accumulates reasoning and observations in the LLM's context window.
- Failure modes are under-discussed in literature: infinite loops (repeating the same action), tool syntax errors, hallucinated tool names.
- Termination is non-trivial: when does the agent know it's done? Common heuristics: answer found, max steps reached, no progress for N steps.
- **Pedagogical note**: Build a minimal ReAct loop in pure Python before introducing any frameworks. The reader must see the loop invariant (state, tools, trace) explicitly.

## Implementation Notes
- Minimum viable loop: `while not done: observation = env.observe(); thought = llm.think(observation, trace); action = llm.act(thought); trace.append(action, observation)`
- Tool parsing: LLM outputs structured JSON → Python dict → function call. Use regex/JSON parser, not just `eval()`.
- Error handling: wrap every tool call in try/except, feed the error back to the LLM as an observation.

## Deprecated / Superseded
- Hardcoded action spaces without LLM reasoning (early RL agents) — superseded by LLM-driven action selection.

## Cross-References
- **Previous**: Ch 1 (Why Agents) — motivation for the loop.
- **Next**: Ch 3 (LLM Primitives) — the capabilities that enable the loop.
- **Related**: Ch 6 (ReAct Project) — full implementation.
- **Related**: Ch 18 (Hierarchical Planning) — RP-ReAct extends this loop.
