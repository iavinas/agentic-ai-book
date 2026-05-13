# Chapter 48: Authentication, Authorization, and Human-in-the-Loop

## Core Thesis
Identity and access management for agents: OAuth2, scoped tokens, ephemeral identities, and human-in-the-loop approval flows.

## Key References

### Authentication
- **OAuth 2.0 / OIDC** — https://oauth.net/2/
- **API keys and scoped tokens**.
- **Just-in-time ephemeral identities** — Short-lived, purpose-scoped credentials.
- **Oasis Agentic Access Management** — Intent-aware identity infrastructure.

### Permission Scoping
- **Principle of least agency** — Avoid unnecessary autonomy.
- **Read-only by default, write only with approval**.
- **Capability tokens** — Scoped, time-bounded permissions.
- **Per-tool permission policies** — Some tools always safe, others always require approval.

### Human-in-the-Loop
- **Interrupts** — Pausing execution for human input.
- **Approval flows** — Explicit human approval for sensitive actions.
- **Escalation** — Routing to humans when confidence is low or stakes are high.
- **Audit trails** — Recording every human override for compliance.

### Secrets Management
- **Proxy pattern** — Agent sends requests without credentials; proxy injects them.
- **Secret rotation** — Automatic credential refresh.
- **Exfiltration prevention** — Credentials stay protected even under prompt injection.

## Subtext & Nuance
- The principle of least agency: agents should not have more autonomy than the task requires. A calculator tool doesn't need write access.
- Ephemeral identities are critical: credentials should be short-lived and purpose-scoped. If compromised, damage is limited.
- Per-tool permission policies: maintain a matrix mapping tools to required approval levels (none, human-in-the-loop, admin approval).
- Audit trails are non-negotiable for compliance: every tool invocation, every human override, every policy exception must be logged.

## Cross-References
- **Previous**: Ch 47 (Security) — the foundation for access control.
- **Next**: Ch 49 (Observability) — monitoring access patterns.
- **Related**: Ch 50 (Cost Management) — tracking per-user costs.
- **Related**: Ch 62 (Prompt Injection) — attacks that bypass authentication.
