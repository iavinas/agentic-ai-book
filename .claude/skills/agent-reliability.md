---
name: agent-reliability
description: |
  Use when designing, reviewing, or debugging AI agents or multi-step LLM workflows for
  production readiness — architecture (workflow vs agent), harness/runtime, evals,
  observability, guardrails, memory/state, orchestration, verification, fallbacks,
  tool failures, pass@k vs pass^k, regression suites, or reliability incidents.
---

# Agent Reliability

Design and review **agentic systems** (model + harness + tools + orchestration), not models in isolation. Reliability is a property of the full stack.

## Core principle

The model is one layer. Production reliability comes from the **harness** (execution control, tool interface, checkpoints), **evals** (what “good” means before users see regressions), **observability** (traces you can grade and replay), **guardrails** (policy before side effects), **explicit state**, **orchestration** (deterministic control flow where possible), **verification/repair**, and a **feedback loop** (production failures → eval cases).

> **Key Insight:** At $p = 0.95$ per-step success, a 50-step workflow succeeds end-to-end only $0.95^{50} \approx 7.7\%$ of the time without durability, verification, or replanning. Always compute compound reliability for the real step count.

## When to use this skill

- Greenfield agent or workflow design
- Production-readiness or architecture review
- Debugging flaky agents, tool loops, silent wrong answers, or post-deploy regressions
- Choosing workflow vs autonomous agent patterns
- Building or extending eval suites, guardrails, or tracing

**When not to use:** Pure prompt tuning on a single LLM call with no tools, state, or multi-turn loop — start with retrieval + examples first ([Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)).

## Workflow vs agent (decide first)

| Pattern | Control flow | Best when | Reliability tradeoff |
|---------|--------------|-----------|----------------------|
| **Single LLM + RAG/examples** | One call | Task is bounded, no tools | Highest predictability; lowest flexibility |
| **Workflow** (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) | Predefined code paths | Steps are known; gates/checks help | Predictable; easier to test |
| **Agent** | Model directs tools across many turns | Open-ended steps; environment gives ground truth | Flexible; compounds errors and cost |

**Default:** Simplest solution that meets the bar. Add agentic autonomy only when flexibility is worth latency, cost, and test burden. Prefer **evaluator-optimizer** or **verifier steps** over unconstrained loops for high-stakes outputs.

## Reliability stack (cover all eight in reviews)

### 1. Agent harness / runtime

The **agent harness** (scaffold) is what you actually ship: model + tool loop + permissions + recovery.

- Structured tool schemas (strict JSON where supported); test tool use in a workbench
- Timeouts, retry budgets, circuit breakers; idempotent tools where possible
- Checkpoints for long runs; resumable state (serialized run state, not only chat history)
- Sandboxed execution; least-privilege tool credentials
- Human approval gates before irreversible side effects
- **Agent-computer interface (ACI):** tool names, descriptions, and formats matter as much as the system prompt — absolute paths, token-efficient responses, poka-yoke parameters ([Anthropic: Writing effective tools](https://www.anthropic.com/engineering/writing-tools-for-agents))

**Tool failure taxonomy** (each needs a different handler):

| Class | Example | Mitigation |
|-------|---------|------------|
| Input validation | Invalid args, schema mismatch | Strict schema + repair prompt with error detail |
| Execution | Timeout, 429, upstream 5xx | Retry with backoff, circuit breaker, alternate tool |
| Output parsing | Non-JSON, truncated response | Parser repair, narrower tool response shape |
| Semantic/logical | Tool OK but wrong conclusion | Verifier, second model check, outcome assertions |

### 2. Evals

Treat evals as product infrastructure, not a one-time benchmark ([Anthropic: Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)).

| Term | Meaning |
|------|---------|
| **Task** | One test: inputs + success criteria |
| **Trial** | One attempt at a task (run multiple for variance) |
| **Grader** | Scores transcript and/or **outcome** (final env state, not just assistant text) |
| **Transcript** | Full trace: tool calls, reasoning, intermediate results |
| **Harness** | Runs tasks concurrently, records steps, aggregates scores |

**Suite types:**

- **Capability evals** — “What can it do?” Low pass rate OK; drives improvement
- **Regression evals** — “Did we break what worked?” Target ~100% pass; run on every change
- **Failure-case evals** — Incidents from prod, red-team payloads, tool misuse

**Grader mix:** code-based (fast, objective) + model-based (nuance) + human (calibrate judges). Grade **outcomes** when the agent can sound correct while failing silently (e.g., no DB row created).

**Eval flywheel:** trace grading while debugging → datasets + eval runs for repeatability → prod monitoring → new failure tasks ([OpenAI: Agent evals](https://developers.openai.com/api/docs/guides/agent-evals)).

### 3. Metrics that match deployment mode

Report **both** capability ceiling and reliability floor ([Agentic AI Book Ch.16](/chapters/ch16.html)):

- **pass@k** — $1 - (1-p)^k$: at least one success in $k$ tries (human-in-the-loop, “best of k”)
- **pass^k** — $p^k$: **all** $k$ tries succeed (unsupervised / automated pipelines)

Example: $p=0.8$, $k=5$ → pass@5 ≈ 99.97%, pass^5 ≈ 32.77%. A large gap means “benchmarks well, fails in production.”

**CLEAR-style dimensions** (weight for your domain): Cost, Latency, Efficacy, Assurance (policy/safety), Reliability (consistency). **ReliabilityBench** adds stress: perturbation robustness and fault injection, not just repeated trials.

### 4. Observability

Minimum trace fields: prompt/version, model, each tool call (name, args, result, latency), state transitions, memory reads/writes, final outcome, cost/tokens, errors.

- **Debug:** trace grading on representative failures ([OpenAI: Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability))
- **Prod:** dashboards for error rate, p95 latency, cost per successful task, loop detection (repeated tool calls, token runaway)
- **Analyze:** cluster failures by tool, route, or prompt version; sample for human review

### 5. Guardrails

Layer controls by surface ([OpenAI: Guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)):

| Layer | Purpose |
|-------|---------|
| Input guardrail | Block disallowed requests before main agent |
| Output guardrail | Validate/redact before user sees response |
| Tool guardrail | Check args/results at side-effect boundary |
| Human approval | Pause run; resume from same serialized **state** |

**Workflow boundary rule:** Agent-level input guardrails often run only on the **first** agent; output guardrails on the **final** agent. Validate at every tool that causes side effects in multi-agent graphs.

Defense in depth: model alignment + harness policy + tool sandbox + environment constraints (see book Ch.52–54).

### 6. Memory and state

- **Durable task state** outside the context window (checkpoints, artifacts, DB)
- **Session context** vs **long-term memory** — separate retrieval policies
- **State machines** for known phases (plan → execute → verify → done)
- Never rely on the context window alone for multi-hour or multi-session work; use initializer + incremental agents for long horizons ([Anthropic: Long-running harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))

### 7. Workflow orchestration

- Deterministic steps in code; LLM only where reasoning is required
- Separate **plan**, **execute**, **verify** roles (evaluator-optimizer, critic, PRM)
- Gate intermediate steps (programmatic checks in prompt chains)
- Parallelize independent checks (e.g., safety screen + main path) when latency allows

### 8. Fallback and repair (ordered escalation)

1. **Retry** with limit (same tool, fixed args) — smallest repair
2. **Re-plan** from verifier feedback (Repair Thought / new subgoal)
3. **Alternate tool or route** (degraded mode)
4. **Human escalation** or safe workflow termination
5. **Rollback** state if partial side effects occurred

Retries alone are not a reliability strategy; add verification and outcome checks.

### 9. Feedback loop

- Capture prod failures with full transcripts
- Triage → new regression tasks + graders
- Track pass^k and CLEAR components over time; auto-rollback on metric guardrails
- Version prompts, tools, and harness together in eval runs

## Review checklist

Answer explicitly:

| Question | Why it matters |
|----------|----------------|
| What is the **unit of work**? | Defines tasks and SLAs |
| What is **deterministic vs agentic**? | Where to test with code vs LLM |
| What **tools** and permissions? | Blast radius of failures |
| What **state** must persist? | Recovery and audit |
| How is **success** measured? | Graders and outcomes |
| How are **failures detected**? | Verifiers, timeouts, outcome checks |
| How are failures **repaired**? | Escalation ladder |
| What is **logged** per step? | Time-to-debug |
| What needs **human approval**? | Irreversible actions |
| What **evals** block regressions? | Regression suite size and pass rate |

## Anti-patterns

- Fully autonomous agent where a routed workflow would suffice
- Single-run accuracy (pass@1) as the only metric for unsupervised deployment
- Grading assistant text while ignoring environment **outcome**
- Unbounded retries (cost loops, duplicate side effects)
- Monolithic context as “memory” for long tasks
- Guardrails only on the final message while tools mutate state earlier
- Shipping tool changes without tool-specific eval tasks

## Output format

When designing or assessing a system, respond in this order:

1. **Reliability stack** — which of the eight components are present, missing, or weak
2. **Architecture** — workflow vs agent; recommended pattern changes
3. **Top failure modes** — compound step math, tool classes, consistency gap (pass@k vs pass^k)
4. **Smallest fixes first** — must-have controls before nice-to-have
5. **Eval plan** — capability vs regression tasks, graders, metrics, flywheel

## Quick reference: Anthropic workflow patterns

| Pattern | Use when |
|---------|----------|
| Prompt chaining | Fixed subtasks; gates between steps |
| Routing | Distinct categories; specialized downstream |
| Parallelization | Independent subtasks or voting/consensus |
| Orchestrator-workers | Subtasks unpredictable until runtime |
| Evaluator-optimizer | Clear criteria; iteration adds value |
| Autonomous agent | Open-ended; sandbox + guardrails + stop conditions |

## References

| Source | Topic |
|--------|--------|
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Workflows vs agents, patterns, ACI |
| [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Tasks, trials, graders, harness vs scaffold |
| [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | Tool design, tool evals |
| [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Checkpoints, incremental progress |
| [OpenAI: Agent evals](https://developers.openai.com/api/docs/guides/agent-evals) | Trace grading → datasets |
| [OpenAI: Guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) | Input/output/tool guardrails, HITL state |
| [OpenAI: Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) | Tracing |
| [Beyond Accuracy (CLEAR)](https://arxiv.org/html/2511.14136v1) | Multi-dimensional enterprise eval |
| [ReliabilityBench](https://arxiv.org/pdf/2601.06112) | Consistency, perturbation, fault tolerance |
| Book [Ch.16](/chapters/ch16.html) | Eval harness, pass@k/pass^k, CLEAR, ReliabilityBench |
| `agentic-ai-toc.md` Ch.49, Ch.52 | Observability, production eval (planned chapters) |
