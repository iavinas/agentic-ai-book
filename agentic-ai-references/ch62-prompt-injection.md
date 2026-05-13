# Chapter 62: Prompt Injection and Agent Hijacking

## Core Thesis
90%+ attack success on multi-turn tool chaining without safeguards. Direct, indirect, tool-chain, and cross-session attacks form the threat landscape. Defense-in-depth is the only viable strategy.

## Key References

### Attack Taxonomy
- **Greshake et al. (2023)** — "Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection". https://arxiv.org/abs/2302.12173
- **Perez & Ribeiro (2022)** — "Ignore This Title and HackAPrompt: Exposing Systemic Vulnerabilities of LLMs through Prompt Injection". https://arxiv.org/abs/2211.09527

### Attack Success Rates
- **Frontier models** — 90%+ attack success without safeguards.
- **With safeguards** — <1% for Claude Opus 4.6.
- **Large reasoning models as jailbreak agents** — 97.14% success rate across 9 targets.
- **Real-world incident** — State-sponsored espionage via Claude Code (Sep 2025).

### Defenses
- **Input filtering and sanitization**.
- **Output validation** — Checking tool outputs for injection patterns.
- **Tool sandboxing** — Preventing exfiltration even under injection.
- **Content classifiers** — Two-stage scanning of tool outputs.
- **Defense-in-depth** — Model, harness, tool, environment layers.

## Cross-References
- **Previous**: Ch 61 (Alignment) — the motivation for security.
- **Next**: Ch 63 (Tool Misuse) — another attack vector.
- **Related**: Ch 47 (Security) — defense implementation.
- **Related**: Ch 52 (Red-Teaming) — adversarial evaluation.
