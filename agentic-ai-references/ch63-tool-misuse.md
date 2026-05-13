# Chapter 63: Tool Misuse and Capability Overhang

## Core Thesis
Agents use tools in unintended ways. Dangerous capability evaluations (CBRN, cyber, autonomous replication) and supply chain risks require pre-deployment red-teaming.

## Key References

### Tool Misuse
- **Exceeding permission scopes** — Read-only tools used for modification.
- **Data exfiltration** — Using tool outputs to leak sensitive information.
- **Resource exhaustion** — Agents consuming excessive compute or API quotas.

### Capability Evaluation
- **Anthropic RSP** — Responsible Scaling Policy. https://www.anthropic.com/news/anthropics-responsible-scaling-policy
- **OpenAI Preparedness Framework v2** (April 2025). https://openai.com/preparedness/
- **CBRN, cyber, autonomous replication** — Evaluation categories.

### Supply Chain
- **MCP servers, skills, plugins** — Weak provenance entering ecosystems.
- **Agent goal hijacking** — Via compromised tools (OWASP ASI-01, ASI-04).
- **Signed tool manifests, staged rollouts, automated revocation**.

## Cross-References
- **Previous**: Ch 62 (Prompt Injection) — attacks.
- **Next**: Ch 64 (Interpretability) — monitoring.
- **Related**: Ch 47 (Security) — defense implementation.
- **Related**: Ch 66 (Regulation) — legal requirements.
