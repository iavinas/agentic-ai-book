# Chapter 65: Memory Integrity and Persistent State Risks

## Core Thesis
Persistent memory is treated as "context" rather than mutable, security-critical state. Zero of 12 surveyed defense systems address memory integrity (2026 finding). Memory poisoning (AgentPoison, MemoryGraft) survives across sessions.

## Key References

### Memory Integrity Gap
- **Zero of 12 surveyed defense systems** address memory integrity (2026 finding).
- **Persistent memory** — Treated as context, not security-critical state.
- **Cross-session behavioral drift** — The agent changes in ways the user cannot trace.

### Attacks
- **AgentPoison** — Injecting false memories via tool outputs or documents.
- **MemoryGraft** — Replacing legitimate memories with malicious ones.
- **Cross-session persistence** — Poisoned entries surviving across sessions.

### Mitigations
- **Append-only logs** — Preventing memory modification.
- **Memory versioning** — Tracking changes over time.
- **Rollback capabilities** — Reverting to known-good state.
- **Cryptographic verification** — Checksums for memory entries.

### Governance
- **Deployment controls** — Incident response, capability revocation.
- **Near-total absence of research** on operational governance for agents.
- **Kill switches, audit trails, recovery procedures**.

## Cross-References
- **Previous**: Ch 64 (Interpretability) — monitoring memory.
- **Next**: Ch 66 (Regulation) — legal governance.
- **Related**: Ch 5 (Memory) — memory architecture.
- **Related**: Ch 47 (Security) — defense layers.
