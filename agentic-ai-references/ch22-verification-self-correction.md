# Chapter 22: Verification, Self-Correction, and Refinement

## Core Thesis
Agents that verify and correct their own outputs are more reliable. Self-correction is the inner loop of reliability — but it can also create infinite loops if not bounded.

## Key References

### Self-Correction
- **Shinn et al. (2023)** — "Reflexion: Self-Reflective Agents". https://arxiv.org/abs/2303.11366
- **Madaan et al. (2023)** — "Self-Refine: Iterative Refinement with Self-Feedback". https://arxiv.org/abs/2303.17651
- **Gou et al. (2024)** — "CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing". https://arxiv.org/abs/2305.11738

### Confidence-Guided
- **CoRefine** — Token-level confidence decides HALT, RETHINK, or ALTERNATIVE.
- **Manakul et al. (2023)** — "SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection". https://arxiv.org/abs/2303.08896

### Constitutional & Principle-Based
- **REFLECT** (Jan 2026) — Transparent principle-guided reasoning without fine-tuning. https://arxiv.org/abs/2501.XXXXX
- **Constitutional Evolution** (Feb 2026) — Evolved norms for multi-agent coordination. https://arxiv.org/abs/2502.XXXXX

## Subtext & Nuance
- Reflexion: verbal reinforcement learning. The agent writes a "self-reflection" after each episode, which is used to improve future behavior.
- Self-Refine: iterative self-correction without external feedback. Generate → critique → revise → repeat.
- CRITIC: uses external tools (code execution, search, calculators) to critique outputs. More reliable than self-critique because it's grounded.
- When self-correction helps: when the agent has access to a verifier (unit tests, type checkers, theorem provers).
- When it doesn't: self-critique without external verification is often wrong — the model confabulates errors.
- CoRefine (2025): uses token-level confidence to decide whether to halt, rethink, or try an alternative. Prevents infinite loops.

## Implementation Notes
- Verification pipeline: generate output → run verifier(s) → if pass, return; if fail, critique → revise → re-verify.
- Verifiers: unit tests for code, calculators for math, search engines for facts, type checkers for types.
- Halting: max revision iterations (e.g., 3). Without this, agents can loop forever.
- Confidence estimation: token logprobs (if available), consistency across multiple samples, or trained confidence model.

## Cross-References
- **Previous**: Ch 21 (Classical Planning) — verifying plans.
- **Next**: Ch 23 (Reasoning Models) — where self-correction is internalized.
- **Related**: Ch 64 (Interpretability) — monitoring self-correction.
- **Related**: Ch 25 (Planner Project) — implementing verification in the planner.
