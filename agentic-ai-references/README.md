# Agentic AI Book — Chapter References

This directory contains one markdown file per chapter (and appendix) of the Agentic AI book, with comprehensive references, subtext, implementation notes, and cross-chapter connections.

## Structure

| File | Chapter | Focus |
|------|---------|-------|
| `ch01-why-agents.md` | Ch 1 | Historical arc, agency spectrum |
| `ch02-agent-loop.md` | Ch 2 | OODA loop, ReAct formalized |
| `ch03-llm-primitives.md` | Ch 3 | Reasoning, tool use, planning, memory |
| `ch04-tool-calling.md` | Ch 4 | Schemas, constrained decoding, MCP |
| `ch05-memory-state.md` | Ch 5 | Short/long-term memory, KG, episodic |
| `ch06-react-project.md` | Ch 6 | **Project: ReAct agent from scratch** |
| `ch07-pretraining-finetuning.md` | Ch 7 | SFT, RL, PRMs, synthetic data |
| `ch08-chain-of-thought.md` | Ch 8 | CoT evolution, reasoning models |
| `ch09-tree-graph-thoughts.md` | Ch 9 | ToT, GoT, AGoT, DPTS |
| `ch10-code-agents.md` | Ch 10 | Program synthesis, SWE-bench |
| `ch11-web-agents.md` | Ch 11 | Browser automation, WebArena |
| `ch12-os-agents.md` | Ch 12 | Shell access, sandboxing |
| `ch13-rag-agents.md` | Ch 13 | Agentic RAG, multi-hop retrieval |
| `ch14-visual-agents.md` | Ch 14 | Multimodal perception, UI understanding |
| `ch15-training-single-agents.md` | Ch 15 | SFT, RL, PRM training |
| `ch16-evaluating-single-agents.md` | Ch 16 | Benchmarks, CLEAR, red-teaming |
| `ch17-task-decomposition.md` | Ch 17 | Subgoal generation, least-to-most |
| `ch18-hierarchical-planning.md` | Ch 18 | HTN, SayCan, RP-ReAct |
| `ch19-mcts-reasoning.md` | Ch 19 | MCTS, CMCTS, DPTS |
| `ch20-search-verification.md` | Ch 20 | Best-of-N, beam search, CATTS |
| `ch21-classical-planning.md` | Ch 21 | STRIPS, PDDL, FastDownward |
| `ch22-verification-self-correction.md` | Ch 22 | Reflexion, CRITIC, CoRefine |
| `ch23-reasoning-models.md` | Ch 23 | o3, R1, QwQ, test-time compute |
| `ch24-advanced-reasoning.md` | Ch 24 | AGoT, SwarmSys, Aegean, MDAPs |
| `ch25-planner-project.md` | Ch 25 | **Project: Planner + MCTS + ReAct** |
| `ch26-evaluating-planning.md` | Ch 26 | MATH, GPQA, scaling curves |
| `ch27-multi-agent-communication.md` | Ch 27 | Topologies, A2A, MCP |
| `ch28-cooperative-multi-agent.md` | Ch 28 | CrewAI, MetaGPT, ChatDev |
| `ch29-competitive-adversarial.md` | Ch 29 | Game theory, debate, MARL |
| `ch30-agent-swarms.md` | Ch 30 | SwarmSys, stigmergy, task allocation |
| `ch31-hierarchical-multi-agent.md` | Ch 31 | Manager-worker, Microsoft Framework |
| `ch32-consensus-conflict.md` | Ch 32 | Aegean, Byzantine fault tolerance |
| `ch33-multi-agent-coding-project.md` | Ch 33 | **Project: Multi-agent coding team** |
| `ch34-training-multi-agent.md` | Ch 34 | CTDE, QMIX, emergent language |
| `ch35-evaluating-multi-agent.md` | Ch 35 | AgentBench, Melting Pot, coordination |
| `ch36-vector-memory.md` | Ch 36 | FAISS, embeddings, retrieval policies |
| `ch37-knowledge-graphs.md` | Ch 37 | Entity extraction, Neo4j, Wikidata |
| `ch38-episodic-procedural.md` | Ch 38 | Experience replay, skill libraries |
| `ch39-continual-learning.md` | Ch 39 | EWC, replay buffers, forgetting |
| `ch40-meta-learning.md` | Ch 40 | MAML, few-shot tool acquisition |
| `ch41-long-term-memory-project.md` | Ch 41 | **Project: Three-tier memory system** |
| `ch42-training-memory-agents.md` | Ch 42 | RAG training, RL for memory access |
| `ch43-evaluating-memory.md` | Ch 43 | ALFWorld, WebShop, NIAH |
| `ch44-frameworks-landscape.md` | Ch 44 | CrewAI, LangGraph, PydanticAI, AG2 |
| `ch45-framework-project.md` | Ch 45 | **Project: Framework from scratch** |
| `ch46-tool-protocols.md` | Ch 46 | MCP, A2A v1.0, AG-UI |
| `ch47-security-sandboxing.md` | Ch 47 | OWASP ASI, gVisor, Firecracker |
| `ch48-authentication-hil.md` | Ch 48 | OAuth2, permission scoping, HIL |
| `ch49-observability.md` | Ch 49 | OpenTelemetry, LangSmith, AgentOps |
| `ch50-cost-management.md` | Ch 50 | Routing, caching, FinOps |
| `ch51-distributed-durable.md` | Ch 51 | Temporal.io, DBOS, async patterns |
| `ch52-evaluating-production.md` | Ch 52 | SLA, A/B testing, chaos engineering |
| `ch53-swe-agents.md` | Ch 53 | SWE-bench, Claude Code, OpenHands |
| `ch54-scientific-agents.md` | Ch 54 | InternAgent-1.5, AlphaEvolve |
| `ch55-data-analysis-agents.md` | Ch 55 | Spider, BIRD, text-to-SQL |
| `ch56-customer-service.md` | Ch 56 | Tau2-Bench, CRM integration |
| `ch57-creative-agents.md` | Ch 57 | Co-creative systems, style adherence |
| `ch58-embodied-agents.md` | Ch 58 | SayCan, RT-2, sim-to-real |
| `ch59-game-agents.md` | Ch 59 | Voyager, PokéAgent, skill libraries |
| `ch60-deep-research-project.md` | Ch 60 | **Project: Deep research agent** |
| `ch61-alignment-problem.md` | Ch 61 | Instrumental convergence, scheming |
| `ch62-prompt-injection.md` | Ch 62 | 90%+ attack success, defense-in-depth |
| `ch63-tool-misuse.md` | Ch 63 | Capability overhang, supply chain |
| `ch64-interpretability.md` | Ch 64 | REFLECT, Constitutional Evolution |
| `ch65-memory-integrity.md` | Ch 65 | AgentPoison, MemoryGraft, governance |
| `ch66-legal-ethical.md` | Ch 66 | EU AI Act, liability, labor displacement |
| `ch67-path-to-agi.md` | Ch 67 | Agency spectrum, open problems |
| `ch68-open-problems.md` | Ch 68 | Future directions, neuro-symbolic |
| `appendix-a-design-patterns.md` | App A | ReAct, ToT, GoT, Reflexion, etc. |
| `appendix-b-benchmarks.md` | App B | SWE-bench, WebArena, GAIA, etc. |
| `appendix-c-papers-timeline.md` | App C | 2022-2026 paper timeline |
| `appendix-d-notation.md` | App D | Agent formalism, notation glossary |
| `appendix-e-project-setup.md` | App E | Python env, Docker, API keys, MCP |

## How to Use These Files

1. **Before writing a chapter**: Read the corresponding reference file for key papers, URLs, and subtext.
2. **When implementing a project**: Check implementation notes and architecture sketches.
3. **For cross-chapter consistency**: Use the cross-references section to link to related chapters.
4. **To update across sessions**: Edit these files as new information becomes available.

## Deprecated vs. Current (2025-2026)

Each file explicitly marks deprecated topics and current frontier topics. This ensures the book stays current and doesn't teach outdated practices.

## Total Files

- **68 chapter reference files**
- **5 appendix reference files**
- **1 README**
- **= 74 total files**
