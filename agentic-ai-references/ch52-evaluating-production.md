# Chapter 52: Evaluating Production Agent Systems

## Core Thesis
Production metrics: SLA compliance, cost per success, MTTR, error rates. A/B testing, red-teaming, and compliance evaluation are mandatory.

## Key References

### Production Metrics
- **SLA compliance rate** — % tasks within latency threshold.
- **Cost per success** — `Total Cost / Successful Tasks`.
- **Mean time to recovery (MTTR)** — How fast after failure?
- **Error rate by tool, agent, task type**.

### A/B Testing
- **Canary deployments** — Controlled rollout for agent versions.
- **Metric guardrails** — Auto-rollback if error rate exceeds threshold.
- **User satisfaction** — Explicit and implicit signals.
- **Business metrics** — Task completion correlating with business outcomes.

### Red-Teaming
- **Adversarial testing** — Prompt injection via production inputs.
- **Tool misuse** — Under realistic permission scopes.
- **Chaos engineering** — Randomly failing tools.

### Compliance
- **OWASP ASI violations** — In production.
- **Content policy violation rates**.
- **PII leakage detection**.
- **Regulatory compliance** — EU AI Act, SOC 2, HIPAA.

## Subtext & Nuance
- SLA compliance is the primary production metric: "99% of tasks complete within 30 seconds."
- Cost per success, not cost per task: a cheap but failing agent is more expensive than an expensive but reliable one.
- Canary deployments for agents: roll out v2 to 5% of traffic, monitor metrics, gradually increase. Auto-rollback if error rate exceeds threshold.
- Chaos engineering for agents: randomly fail tools, inject latency, simulate API errors. This builds resilience.
- Regulatory compliance is increasingly important: EU AI Act requires audit trails, human oversight, and transparency for high-risk AI systems.

## Cross-References
- **Previous**: Ch 51 (Distributed Execution) — the systems being evaluated.
- **Next**: Ch 53 (SWE Agents) — Part VII begins.
- **Related**: Ch 16 (Evaluating Single Agents) — task-level metrics.
- **Related**: Ch 62 (Prompt Injection) — adversarial testing.
