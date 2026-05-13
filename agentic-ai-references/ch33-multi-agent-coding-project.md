# Chapter 33: Project — Building a Multi-Agent Coding Team

## Core Thesis
A team of specialized agents (PM, Architect, Coder, Reviewer, Tester) that collaboratively builds software. The capstone project of Part IV.

## Key References

### Multi-Agent Software
- **MetaGPT** — https://arxiv.org/abs/2308.00352
- **ChatDev** — https://arxiv.org/abs/2307.07924
- **CrewAI** — https://www.crewai.com/
- **AutoGen** / **AG2** — https://ag2.ai/

### Software Engineering
- **SWE-bench** — https://www.swebench.com/
- **Git** — https://git-scm.com/
- **pytest** — https://docs.pytest.org/

## Subtext & Nuance
- Role specialization is key: each agent has a distinct system prompt, tool set, and evaluation criteria.
- Shared blackboard: common state visible to all agents (requirements, design docs, code, test results).
- Message passing: agents communicate via structured messages, not just raw text.
- Turn-taking protocol: sequential execution with handoffs. PM → Architect → Coder → Reviewer → Tester → (loop if needed).
- Git integration: agents commit their changes to a real repository. This provides auditability and version control.
- The most important metric: does the team outperform a single agent on the same task? Usually yes, but communication overhead matters.

## Implementation Notes
- Five agents: Product Manager (interprets requirements, creates specs), Architect (designs system), Coder (implements), Reviewer (reviews code), Tester (writes/runs tests).
- Shared state: requirements.md, design.md, code/, tests/, test_results.json.
- Protocol: each agent reads shared state, produces output, updates shared state, then hands off to next agent.
- Git: after each major phase, `git commit` with descriptive message.

## Evaluation
- Task completion rate: does the team finish the assignment?
- Code quality: test pass rate, linter compliance.
- Communication overhead: number of messages, tokens consumed.
- Compare team vs single agent on the same task.

## Cross-References
- **Previous**: Ch 27-32 (All of Part IV) — theory leading to this project.
- **Next**: Ch 34 (Training Multi-Agent) — training these teams.
- **Related**: Ch 28 (Cooperative) — cooperation principles.
- **Related**: Ch 53 (SWE Agent) — single-agent version of the same task.
