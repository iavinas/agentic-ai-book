# Chapter 50: Cost Management and Efficiency

## Core Thesis
Enterprise LLM spending: $8.4B in H1 2025. Intelligent model routing, caching, and batch inference reduce costs by 30-87%.

## Key References

### Cost Landscape
- **Enterprise LLM spending** — $8.4B in H1 2025.
- **Inference flip** — 85% of enterprise AI budgets go to inference (not training).
- **Agent cost multiplier** — Agents make 3-10× more LLM calls than chatbots.
- **Documented runaway agent** — $47,000 bill over 11 days.

### Model Routing
- **LiteLLM** — https://github.com/BerriAI/litellm
- **Portkey** — https://portkey.ai/
- **OpenRouter** — https://openrouter.ai/
- **RouteLLM** — https://github.com/lm-sys/RouteLLM
- **Achievable reduction** — 30-87% cost savings.

### Caching
- **Prefix/KV caching** — 90% cost reduction (Anthropic cached tokens).
- **Semantic caching** — GPTCache, Redis vector search. 31% of queries are near-duplicates.
- **Agentic plan caching (2026)** — Caching intermediate reasoning steps. 50% cost reduction.
- **Cloudflare Code Mode** — Collapsing 2,500+ endpoints into 2 tools. ~1,000 tokens vs. 1.17M.

### Batch Inference
- **OpenAI Batch API** — 50% discounts for 24h turnaround.
- **Anthropic Message Batches** — Similar discount structure.
- **Per-request token limits, per-user quotas**.
- **Anomaly detection** — Flag unusual spending patterns.

### LLM FinOps
- **Per-trace cost attribution** — Feature ID, user segment, agent version.
- **Provider arbitrage** — Route to cheapest capable provider.
- **Human-equivalent hourly rates** — Compare agent cost to human cost for the same task.

## Subtext & Nuance
- The inference flip (85% inference vs. 15% training) means cost optimization is now about inference efficiency, not training efficiency.
- Model routing is the highest-impact optimization: use local/edge models for classification, fast frontier for tool selection, strong frontier for synthesis.
- Semantic caching is surprisingly effective: 31% of production queries are near-duplicates of previous queries.
- Agentic plan caching (2026) is a new technique: cache the reasoning steps, not just the final answer. When a similar task arrives, replay the reasoning with minor adjustments.
- Self-aware agents that reason about remaining budget: "I have $0.50 left. I should use a cheaper model for this subtask."

## Cross-References
- **Previous**: Ch 49 (Observability) — cost tracking via traces.
- **Next**: Ch 51 (Distributed Execution) — scaling cost-efficiently.
- **Related**: Ch 16 (Evaluating Single Agents) — cost per task metrics.
- **Related**: Ch 52 (Evaluating Production) — production cost governance.
