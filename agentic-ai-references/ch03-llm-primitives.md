# Chapter 3: LLM Primitives for Agency

## Core Thesis
Four primitives — reasoning, tool use, planning, and memory — compose into agency. This chapter maps each primitive to its LLM implementation.

## Key References

### Reasoning
- **Wei et al. (2022)** — "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models". NeurIPS 2022. https://arxiv.org/abs/2201.11903
- **Wang et al. (2023)** — "Self-Consistency Improves Chain of Thought Reasoning in Language Models". ICLR 2023. https://arxiv.org/abs/2203.11171
- **Kojima et al. (2022)** — "Large Language Models are Zero-Shot Reasoners". NeurIPS 2022. https://arxiv.org/abs/2205.11916

### Tool Use
- **Schick et al. (2023)** — "Toolformer". https://arxiv.org/abs/2302.04761
- **Patil et al. (2023)** — "Gorilla: Large Language Model Connected with Massive APIs". https://arxiv.org/abs/2305.15334
- **Qin et al. (2023)** — "ToolLLM: Facilitating Large Language Models to Master 16,000+ Real-world APIs". https://arxiv.org/abs/2307.16789

### Planning
- **Zhou et al. (2023)** — "Least-to-Most Prompting Enables Complex Reasoning in Large Language Models". ICLR 2023. https://arxiv.org/abs/2205.10625
- **Wang et al. (2023)** — "Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models". https://arxiv.org/abs/2305.04091

### Memory
- **Wu et al. (2022)** — "MemPrompt: Memory-assisted Prompt Editing with User Feedback". https://arxiv.org/abs/2201.06009
- **Zhong et al. (2023)** — "MemoryBank: Enhancing Large Language Models with Long-Term Memory". https://arxiv.org/abs/2305.10250

## Subtext & Nuance
- Classic CoT prompting ("think step by step") is increasingly viewed as a prompting hack for non-reasoning models. Frontier models (o3, R1) internalize reasoning.
- **Teaching note**: Show that prompting-based CoT is brittle (small prompt changes cause large output changes) compared to trained reasoning.
- Tool descriptions are prompts — the LLM "understands" tools through their descriptions, not through code introspection.
- Planning fails in two ways: over-planning (planning forever without acting) and under-planning (acting without adequate foresight).
- Memory retrieval is a search problem, not a storage problem. The hard part is fetching the right memory at the right time.

## Deprecated / Superseded
- Pure prompting-based CoT for frontier models — o3/o4-mini and R1 don't need "think step by step" prompts; they reason natively.
- AutoGPT's memory system (simple vector store) — superseded by structured memory approaches.

## Cross-References
- **Previous**: Ch 2 (Agent Loop) — where these primitives are composed.
- **Next**: Ch 4 (Tool Calling Deep Dive) — expands the tool use primitive.
- **Related**: Ch 23 (Reasoning Models) — how reasoning became internalized.
- **Related**: Ch 36-38 (Memory chapters) — deep dives into memory systems.
