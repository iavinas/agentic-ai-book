# Chapter 49: Observability and Tracing

## Core Thesis
OpenTelemetry is the emerging standard for agent observability. LangSmith, AgentOps, OpenLIT, and Langfuse provide platform layers.

## Key References

### OpenTelemetry
- **OpenTelemetry GenAI Semantic Conventions** — `gen_ai.system`, `gen_ai.usage.*_tokens`.
- **OTel framework convergence** — LangSmith, AgentOps, OpenLIT all support OpenTelemetry.
- **Platform-layer injection** — Kubernetes operators and sidecars for zero-code instrumentation.

### Platforms
- **LangSmith** — Framework-agnostic tracing, evals, Fleet no-code agents. https://www.langchain.com/langsmith
- **AgentOps** — Visual tracking, replay, prompt injection detection, 400+ LLM cost tracking. https://www.agentops.ai/
- **OpenLIT** — Zero-code Kubernetes Operator, polyglot sidecars. https://github.com/openlit/openlit
- **Langfuse** — OTel ingestion for existing collector infrastructure. https://langfuse.com/

### Metrics
- **Per-trace cost attribution** — Feature ID, user segment, agent version.
- **Latency breakdown** — TTFT vs. end-to-end, model vs. tool vs. retrieval.
- **Tool spans** — Invocation counts, failure rates, retries.
- **Agent loop behavior** — Step count, cyclic loop detection, backtracking.
- **Safety** — Prompt injection detections, content policy flags.

### Cognitive Observability
- **AI interpreting agent behavior** — Detecting hallucinations.
- **Preemptive failure flagging** — Before user impact.
- **Agentic SRE** — Observability agents that summarize logs and trigger remediation.

## Subtext & Nuance
- OpenTelemetry's GenAI semantic conventions (2025) standardize span attributes across frameworks. This enables vendor-neutral instrumentation.
- Per-trace cost attribution is essential for LLM FinOps: you must know which features, users, and agent versions cost the most.
- Cyclic loop detection: monitor for agents repeating the same thought/action sequence. This is a common failure mode.
- Cognitive observability is the next frontier: using AI to monitor AI. Observability agents watch production agents and flag anomalies.

## Cross-References
- **Previous**: Ch 48 (Authentication) — logging access for audit.
- **Next**: Ch 50 (Cost Management) — using observability for cost control.
- **Related**: Ch 52 (Evaluating Production) — production metrics.
- **Related**: Ch 62 (Prompt Injection) — detecting attacks via observability.
