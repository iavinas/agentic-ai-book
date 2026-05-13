# Chapter 47: Security, Sandboxing, and Governance

## Core Thesis
OWASP Top 10 for Agentic 2026, Anthropic's three-layer egress, Microsoft Agent Governance Toolkit v3.0.1, and E2B Firecracker sandboxes form the defense stack.

## Key References

### OWASP Agentic Top 10 (2026)
- **ASI-01** — Goal hijacking
- **ASI-02** — Tool misuse
- **ASI-03** — Identity abuse
- **ASI-04** — Supply chain
- **ASI-05** — RCE (Remote Code Execution)
- **ASI-06** — Memory poisoning
- **ASI-07** — Insecure communication
- **ASI-08** — Cascading failures
- **ASI-09** — Trust exploitation
- **ASI-10** — Rogue agents
- **OWASP Agentic** — https://owasp.org/www-project-agentic-ai/

### Sandboxing
- **gVisor** — https://gvisor.dev/
- **Firecracker microVMs** — https://firecracker-microvm.github.io/
- **E2B** — https://e2b.dev/
- **WebAssembly** — Lightweight browser sandboxing.
- **ARMO eBPF** — Kernel-level behavioral control.

### Anthropic Secure Deployment
- **Three-layer network egress** — No DNS → firewall → authenticated proxy.
- **Vault credential proxy** — Secrets never enter the sandbox.
- **Managed Agents** — gVisor sandboxes with append-only audit logs.
- **Content classifiers** — Two-stage pipeline for tool output scanning.

### Microsoft Agent Governance Toolkit v3.0.1
- **Sub-millisecond policy enforcement** (<0.1ms p99).
- **Agent OS** — Policy engine.
- **Agent Mesh** — Cryptographic identity.
- **Agent Hypervisor** — Execution rings.
- **Agent SRE** — Circuit breakers.
- **Quantum-safe credentials** — ML-DSA-65 + Signal Protocol.

## Subtext & Nuance
- The OWASP Top 10 for Agentic is the first comprehensive security framework for agents. Every production system should map its controls to these 10 categories.
- Sandbox hierarchy: Docker (standard) → gVisor (userspace kernel, stronger) → Firecracker microVMs (AWS-grade, <200ms boot). E2B wraps Firecracker for developer experience.
- Anthropic's three-layer egress is the gold standard: no DNS resolution inside the sandbox, all traffic through a firewall, then an authenticated proxy. This prevents data exfiltration even under prompt injection.
- Microsoft Agent Governance Toolkit v3.0.1 is the most advanced governance system: policy enforcement in sub-millisecond, quantum-safe crypto, execution rings.
- ARMO eBPF provides kernel-level behavioral control — you can block syscalls in real-time based on agent behavior.

## Cross-References
- **Previous**: Ch 46 (Protocols) — securing protocol communications.
- **Next**: Ch 48 (Authentication) — identity and access management.
- **Related**: Ch 62 (Prompt Injection) — the attacks these defenses counter.
- **Related**: Ch 12 (OS Agents) — sandboxing for terminal agents.
