# Agentic AI: Building, Training, and Deploying Autonomous Systems
## Complete Table of Contents with Chapter Topics and Subtopics

> A comprehensive hands-on technical book covering autonomous AI agents from first principles through
> production deployment as of 2025–2026. Spans reasoning, planning, multi-agent systems, memory,
> infrastructure, safety, and frontier capabilities. Every part includes dedicated training and
> evaluation chapters with pure-Python implementation projects.

---

## Book Overview

| Part | Title | Chapters | Focus |
|------|-------|----------|-------|
| I | Foundations of Agency | 1–7 | The agent loop, tool calling, memory, ReAct, building from scratch |
| II | Single-Agent Systems | 8–17 | Reasoning, code agents, web agents, file/OS agents, RAG agents, visual agents |
| III | Planning and Test-Time Reasoning | 18–26 | Task decomposition, MCTS, search, reasoning models, compute scaling |
| IV | Multi-Agent Systems | 27–35 | Communication, cooperation, competition, swarms, hierarchies, consensus |
| V | Memory, Learning, and Adaptation | 36–43 | Vector memory, knowledge graphs, episodic memory, continual learning |
| VI | Production Infrastructure | 44–52 | Frameworks, MCP/A2A, security, observability, cost management, deployment |
| VII | Specialized Agent Domains | 53–60 | Coding, science, data analysis, customer service, creative, embodied, game agents |
| VIII | Safety, Alignment, and Future | 61–68 | Alignment, prompt injection, tool misuse, interpretability, regulation, open problems |

**Total: ~68 chapters | 12+ hands-on project chapters | 10+ evaluation chapters | ~850+ estimated pages**

---

## Part I: Foundations of Agency

*Goal: Establish the conceptual and implementation foundation. Why do LLMs alone fail? What does
agency add? Build a complete ReAct agent from scratch in pure Python.*

---

### Chapter 1: Why Agents? From Predictors to Actors

**The limitation of pure prediction**
- LLMs as next-token predictors: the completion paradigm
- Why prediction is not action: hallucination, stale knowledge, no external grounding
- The gap between knowing and doing: a model can describe a bug fix without applying it
- Task horizon: why long-horizon tasks break single-shot inference

**From in-context learning to agency**
- GPT-3 few-shot learning (Brown et al., 2020): the first hint of task adaptation
- ChatGPT and conversational AI: dialogue as a primitive interaction loop
- Toolformer (Schick et al., 2023): teaching LLMs to use tools via API calls
- ReAct (Yao et al., 2023): reasoning + acting as an interleaved loop
- The 2022–2024 explosion: AutoGPT, BabyAGI, Voyager, the first open-ended agents

**The agentic paradigm shift**
- Agency as a spectrum: tool → assistant → agent → autonomous system
- Why 2025 is the agentic inflection point: o3, DeepSeek-R1, Claude computer use, Devin
- Timeline of major agent milestones: 2022 to 2026
- The convergence thesis: reasoning models + tool use + planning + memory = general agency

---

### Chapter 2: The Agent Loop — Observe, Think, Act

**The OODA loop applied to AI**
- Observe: receiving inputs (text, images, tool outputs, environment state)
- Orient: reasoning about the current state and goal progress
- Decide: selecting the next action from an action space
- Act: executing the action and receiving feedback

**Agent state and environment**
- State representation: what the agent remembers between steps
- Action space: discrete tools, continuous parameters, structured outputs
- Observations vs. rewards: the distinction between environment feedback and evaluative signal
- Episodic vs. continuing tasks: when does an episode end?

**The ReAct pattern formalized**
- Thought → Action → Observation as a trace
- The scratchpad: accumulating reasoning and observations in context
- When to stop: termination conditions (answer found, max steps, error threshold)
- Failure modes: infinite loops, repetitive actions, tool call syntax errors

**Building a minimal ReAct loop from scratch**
- Pure Python implementation: no frameworks, no LLM wrappers
- The loop invariant: state, available tools, and the reasoning trace
- Tool parsing: converting LLM output into executable function calls
- Error handling and recovery within the loop

---

### Chapter 3: LLM Primitives for Agency

**Reasoning as a primitive**
- Chain-of-Thought (CoT): the "let's think step by step" breakthrough (Wei et al., 2022)
- Zero-shot CoT: "Let's think step by step" as a universal prompt
- Self-consistency: sampling multiple reasoning paths and voting
- Limitations of prompting-based reasoning: shallow, brittle, non-recursive

**Tool use and function calling**
- Tool definitions: name, description, parameter schema (JSON Schema)
- Constrained decoding: forcing the LLM to output valid function calls
- Open vs. closed tool sets: when the agent discovers tools vs. when they are fixed
- Tool descriptions as prompts: how the LLM "understands" what a tool does

**Planning and task decomposition**
- Plan-then-execute: generating a full plan before any action
- Interleaved planning: adjusting the plan as observations arrive
- Hierarchical planning: high-level goals → subgoals → atomic actions
- When planning fails: over-planning, under-planning, plan obsolescence

**Memory for agents**
- Short-term memory: the context window as a working buffer
- Working memory compression: summarization, selective retention
- Long-term memory: what persists across episodes
- The memory-retrieval problem: how to fetch the right memory at the right time

---

### Chapter 4: Tool Calling and Function Calling Deep Dive

**Tool definition and schemas**
- JSON Schema for tool parameters: types, enums, descriptions, required fields
- Tool descriptions as natural language contracts: what the LLM reads
- Nested and composite tools: tools that call other tools
- Tool versioning and deprecation: maintaining compatibility

**Constrained decoding and structured generation**
- Grammar-based decoding: CFG, regex, JSON schema enforcement
- Outlines, guidance, jsonformer: libraries for structured LLM output
- OpenAI function calling API: how it works under the hood
- Anthropic tool use: XML-based tool calling

**Dynamic tool selection**
- Loading tools into context: the context window limit problem
- Vector search for tool selection: retrieving relevant tools from a large registry
- Meta-tools: `search_tools`, `list_tools` as first-class tools
- The MCP ecosystem: decoupling tool definitions from agents (see Chapter 46)

**Tool execution and safety**
- Synchronous vs. asynchronous tool calls
- Timeout handling and partial results
- Tool idempotency: what happens if the same tool is called twice?
- Sandboxing tool execution: Docker, gVisor, Firecracker (see Chapter 47)

---

### Chapter 5: Memory and State Management

**Short-term memory: the context window**
- Context window as RAM: fast but limited and volatile
- Summarization strategies: extractive, abstractive, key-value compression
- Sliding window and truncation: what to keep, what to drop
- Prompt caching and prefix caching: reducing redundant token costs

**Long-term memory: vector stores**
- Embedding-based retrieval: chunking, embedding, similarity search
- Vector databases: FAISS, Chroma, Pinecone, Qdrant, Weaviate
- Retrieval strategies: top-k, MMR (Maximal Marginal Relevance), reranking
- Memory write policies: when and what to store

**Structured memory: knowledge graphs**
- Entities, relations, and triples as structured memory
- Graph construction: entity extraction, relation extraction, coreference resolution
- Querying KG memory: SPARQL, Cypher, or natural language to graph queries
- Hybrid memory: combining vector retrieval with graph traversal

**Episodic and procedural memory**
- Episodic memory: storing past interactions as retrievable episodes
- Procedural memory: "how-to" knowledge, learned skills, successful plans
- Memory consolidation: moving short-term memories to long-term
- Forgetting and updating: memory is not immutable

---

### Chapter 6: Project — Building a ReAct Agent from Scratch

**Hands-on project: a complete ReAct agent in pure Python, no frameworks**
- Architecture: Agent class with state, tools, LLM backend, and loop
- Tool system: register tools with JSON schemas, parse LLM output into calls
- LLM backend: pluggable (OpenAI API, local via Ollama, Anthropic)
- The ReAct loop: observe → think → act → update trace
- Implementing 5 built-in tools: calculator, web search (serpapi), file read/write,
  Python code execution (local subprocess with timeout), memory store/retrieve

**Project extensions**
- Adding a simple planning module: generate subgoals before acting
- Implementing error recovery: catching tool failures and retrying with fixes
- Adding self-reflection: evaluating whether the current approach is working
- Measuring success rate, average steps, and token cost per task

**Reference config**
- Pure Python, ~400 lines of core agent code
- Works with any OpenAI-compatible API endpoint
- Test tasks: math word problems, web lookup + calculation, file manipulation

---

### Chapter 7: Pre-training and Fine-Tuning for Agency

**Pre-trained LLMs as agent foundations**
- Why pre-trained models matter: world knowledge, reasoning patterns, code understanding
- The scaling hypothesis: larger models exhibit stronger emergent agentic capabilities
- In-context learning as zero-shot agency: no training, just prompts and tools

**Fine-tuning for tool use**
- ToolLLM and Gorilla: fine-tuning on API documentation and call examples
- Training data construction: (query, tool_call, observation, next_action) trajectories
- SFT on agent trajectories: supervised fine-tuning with action labels
- Avoiding catastrophic forgetting: retaining general capabilities while adding tool use

**Instruction tuning for agents**
- System prompts for agent behavior: role, constraints, available tools
- Multi-turn dialogue formatting: user/assistant/tool call/tool response
- Data formats: ShareGPT, AgentInstruct, ToolBench

**Emerging training paradigms**
- RL for tool use: o3/o4-mini trained via RL to chain 600+ tool calls
- Process Reward Models for agents: rewarding correct intermediate steps
- Synthetic trajectory generation: Simia, STeP — generating training data without human rollouts

---

## Part II: Single-Agent Systems

*Goal: Deep dive into sophisticated single-agent architectures across domains — reasoning, coding,
web, file systems, RAG, and visual perception. Each major block ends with a hands-on project.*

---

### Chapter 8: Chain-of-Thought and Advanced Reasoning

**The evolution of reasoning in LLMs**
- From prompted CoT to engineered reasoning: the paradigm shift of 2024–2025
- Why classic "think step by step" is now viewed as a prompting hack
- RLVR-trained reasoning models: o1, o3, DeepSeek-R1, QwQ-32B, Gemini 2.5 Flash Thinking
- Reasoning as an internalized capability, not an elicited behavior

**Advanced prompting strategies**
- Complexity-based prompting: harder examples in the prompt yield better reasoning
- Self-consistency and majority voting
- Analogical reasoning: retrieve similar solved problems
- Least-to-most prompting: decompose, solve subproblems, combine

**Self-verification and backtracking**
- The "check your work" technique: asking the model to verify its own answer
- Backtracking when verification fails: exploring alternative reasoning paths
- Confidence estimation: using token logprobs to detect uncertain steps

**Reasoning model architectures**
- OpenAI o-series: deliberative alignment, tool-aware reasoning
- DeepSeek-R1: pure RL emergence of reflection and verification
- QwQ-32B: compact open-weight reasoning with native tool tokens
- Gemini 2.5 Flash Thinking: controllable reasoning budget via `thinking_budget`

---

### Chapter 9: Tree and Graph of Thoughts

**Tree of Thoughts (ToT)**
- From linear chains to branching reasoning trees
- BFS and DFS over thought space: systematic exploration of reasoning paths
- State evaluation: scoring intermediate thoughts for promise
- Pruning: discarding low-scoring branches to manage search budget

**Modern ToT variants (2024–2025)**
- Forest-of-Thought (FoT): parallel reasoning trees with sparse activation
- Adaptive Graph of Thoughts (AGoT): dynamic DAG decomposition into nested subgraphs
- Constrained MCTS (CMCTS): predefined action sets + PRM-guided simulation
- Dynamic Parallel Tree Search (DPTS): 2–4× speedup over standard MCTS

**Graph of Thoughts (GoT)**
- Thoughts as nodes in a graph, edges as dependencies or refinements
- Aggregation operations: merging multiple thought branches
- Revision operations: editing previous thoughts rather than discarding paths
- When to use ToT vs GoT vs simple CoT: a decision framework

**Building a ToT agent from scratch**
- Implementing tree search with an LLM as the thought generator
- Evaluator module: scoring thoughts with a separate prompt or model
- Search budget management: max depth, branching factor, pruning threshold
- Project: solving Game of 24 and Blocksworld with ToT

---

### Chapter 10: Code Generation Agents

**The code agent paradigm**
- Program synthesis: generating code from natural language specifications
- Test-driven generation: writing tests first, then generating passing code
- Code interpreter pattern: LLM writes code, executes it, observes output, iterates
- SWE-bench as the gold standard: real GitHub issue resolution

**Agent architectures for coding**
- Plan → Edit → Test → Debug loops
- File-level context management: which files to read, which to edit
- Diff generation vs. full-file rewrite: trade-offs in precision and context
- Test execution and feedback integration

**Current state of coding agents (2025–2026)**
- Claude Code / Opus 4.7: ~78–87% SWE-bench Verified
- OpenAI Codex CLI / Symphony: 500% increase in landed PRs at OpenAI
- Devin 2.0, OpenHands: sandboxed cloud VMs with autonomous execution
- The generalist vs. specialist debate: can one agent do all coding tasks?

**Building a code agent from scratch**
- Project: Python code agent with file system tools, Python execution, pytest runner
- Implementing a plan-edit-test loop
- Handling syntax errors and test failures as feedback
- Evaluating on HumanEval or a custom benchmark

---

### Chapter 11: Web Agents and Browser Automation

**The web as an environment**
- DOM parsing and element extraction: getting structured data from HTML
- Action space: click, type, scroll, navigate, wait, extract
- Visual vs. DOM-based agents: pixel parsing vs. HTML structure
- Headless browsers: Playwright, Puppeteer, Selenium

**Web agent architectures**
- DOM-aware agents: using HTML structure, ARIA roles, CSS selectors (Gemini approach)
- Visual agents: screenshot-based perception + click prediction (Claude approach)
- Hybrid agents: combining DOM structure with visual grounding
- Session management: cookies, authentication, multi-page workflows

**Current state of web agents (2025–2026)**
- WebArena Verified: the new standard for web agent evaluation
- GAIA: multi-step reasoning with web browsing
- Mind2Web: diverse web tasks across 100+ websites
- OpAgent (Qwen3-VL + RL): 71.6% on WebArena

**Project — Building a Browser Agent**
- Playwright + LLM + ReAct loop
- Implementing visual perception (screenshot → element detection)
- Action execution with retry logic
- Evaluation on a subset of WebArena or Mind2Web tasks

---

### Chapter 12: File System and OS Agents

**Operating system as an environment**
- Shell command execution: bash, PowerShell, terminal access
- File I/O: read, write, list, search, grep, sed
- Process management: starting, monitoring, killing processes
- Package and dependency management: pip, npm, apt

**Safety and sandboxing**
- The danger of unconstrained shell access
- Sandboxing strategies: chroot, Docker, gVisor, Firecracker microVMs
- Permission scoping: read-only by default, write only to designated directories
- Audit logging: every command executed, every file touched

**Building a terminal agent**
- Architecture: shell tool with timeout, stdout/stderr capture, exit code
- Working directory management: maintaining context across commands
- Error recovery: parsing error messages and suggesting fixes
- Project: terminal agent that can navigate, edit files, run tests, and debug

---

### Chapter 13: RAG-Enhanced Agents

**Retrieval as a tool**
- RAG as a first-class tool in the agent's toolkit
- The agent as a research assistant: iterative retrieval and synthesis
- Query rewriting: the agent reformulates queries based on intermediate findings
- Multi-hop retrieval: following chains of evidence across documents

**Agentic RAG patterns**
- Iterative retrieval: retrieve → read → decide what to retrieve next
- Hypothetical document embeddings (HyDE): generating hypothetical answers for better retrieval
- Re-ranking within the agent loop: using a cross-encoder to filter retrieved passages
- Source attribution: the agent cites its sources in the final answer

**Building a research assistant agent**
- Project: agent with vector memory (FAISS + sentence embeddings)
- Multi-hop question answering on a curated corpus
- Evaluation: accuracy, citation accuracy, number of retrieval steps
- Extensions: knowledge graph integration for structured reasoning

---

### Chapter 14: Agents with Visual Perception

**Multimodal agents**
- GPT-4V, Claude 3, Gemini: vision-enabled frontier models
- Visual question answering: understanding images to inform decisions
- UI understanding: interpreting screenshots to navigate interfaces
- Document understanding: PDFs, charts, tables, forms

**Visual grounding for agents**
- Object detection and localization in images
- Spatial reasoning: "click the third button in the second row"
- Video understanding: processing sequences of frames for temporal reasoning
- Visual memory: storing and retrieving images as part of agent state

**Project — Multimodal Agent**
- Agent that can process uploaded images, answer questions, and take actions based on visual input
- Using a vision-enabled LLM API (OpenAI GPT-4V or local LLaVA)
- Evaluation on visual reasoning benchmarks

---

### Chapter 15: Training Single Agents — SFT, RL, and Process Rewards

**SFT on agent trajectories**
- AgentBank: 50,000+ trajectories across 16 tasks
- Trajectory formatting: masking observations, learning only from actions
- Synthetic trajectories: Simia, STeP — generating training data without expensive rollouts
- Partial masking: only learning from correct steps, ignoring errors

**RL for tool use and reasoning**
- OpenAI o3/o4-mini: trained with RL to use tools agentically
- DeepSeek-R1: GRPO with rule-based rewards, pure RL reasoning emergence
- WebAgent-R1: end-to-end RL for web agents
- Apple LOOP: memory-efficient PPO for long-horizon interactive agents

**Process Reward Models (PRMs)**
- Why ORMs fail for long chains: sparse feedback, no error localization
- PRM architectures: scoring each reasoning step
- PRIME: implicit process rewards from outcome labels only
- AgentPRM (Cornell + Fudan): practical actor-critic for multi-turn agents
- PQM: Q-value rankings for theoretically principled PRMs
- R-PRM: reasoning-driven PRM with trace generation

**Training a PRM from scratch**
- Project: training a step-level reward model on math reasoning traces
- Using outcome labels to derive process rewards (PRIME-style)
- Evaluating: does the PRM correctly identify errors in reasoning?

---

### Chapter 16: Evaluating Single Agents

**Task completion metrics**
- Success rate: binary pass/fail per task
- Step efficiency: number of actions taken to completion
- Cost per task: API tokens, compute time, dollar cost
- Latency: time to first action, time to completion

**Benchmarks for single agents**
- SWE-bench Verified / Pro / Live: real GitHub issues (the gold standard)
- WebArena Verified: web navigation on self-hosted sites
- OSWorld-Verified: computer use tasks
- GAIA / GAIA2: multi-step reasoning with dynamic environments
- AgentBench: 8 environments including OS, DB, web, games
- Tau2-Bench: customer service with policy compliance

**Multi-dimensional evaluation frameworks**
- CLEAR Framework: accuracy, cost, latency, reliability, safety
- ReliabilityBench: consistency, perturbation tolerance, fault tolerance
- pass@k and pass^k: capability ceiling vs. reliability floor
- Cost-normalized accuracy: `Accuracy / Cost × 100`

**Red-teaming and adversarial evaluation**
- Prompt injection resistance: indirect attacks via tools and documents
- Tool misuse evaluation: does the agent use tools safely?
- Reward hacking: detecting when agents game the evaluation
- The exploit epidemic: all major benchmarks can be reward-hacked — what this means for evaluation design

---

## Part III: Planning and Test-Time Reasoning

*Goal: Formal planning algorithms, reasoning models, and test-time compute scaling.
Build a planner-agent with hierarchical decomposition + MCTS + ReAct execution.*

---

### Chapter 17: Task Decomposition and Subgoal Generation

**Why decomposition matters**
- The curse of dimensionality in action spaces
- Monolithic agents fail after hundreds of steps: error compounding
- Decomposition as divide-and-conquer for complexity
- Human decomposition strategies: what we can learn from human planners

**Decomposition strategies**
- Recursive decomposition: breaking goals into subgoals recursively
- Least-to-most prompting: solve simplest subproblem first, build up
- Plan-then-execute vs. interleaved planning
- Template-based decomposition: reusing known plan templates

**Subgoal generation with LLMs**
- Generating subgoals from natural language task descriptions
- Dependency detection: which subgoals must precede others?
- Verifying subgoal feasibility before execution
- Handling decomposition failures: when the plan doesn't work

---

### Chapter 18: Hierarchical Planning with LLMs

**Hierarchical Task Networks (HTN)**
- High-level methods decompose into lower-level tasks
- Preconditions and effects: formalizing task requirements
- Primitive vs. compound tasks: the boundary of LLM-generated vs. hardcoded
- HTN planning algorithms: forward decomposition, backtracking

**Modern hierarchical agents**
- SayCan (Ahn et al., 2022): LLM plans + robotic affordances
- Inner Monologue: implicit planning through stream-of-consciousness reasoning
- RP-ReAct (Dec 2025): Reasoner-Planner supervising a ReAct Executor
- High-level strategic planning decoupled from low-level execution

**When to plan, when to react**
- Stable environments favor planning; dynamic environments favor reactivity
- The planning-replanning trade-off: cost of planning vs. cost of execution failures
- Reactive planning: generating partial plans and revising as needed

---

### Chapter 19: Monte Carlo Tree Search for Agent Reasoning

**MCTS fundamentals**
- Selection, expansion, simulation, backpropagation
- UCT formula: balancing exploration and exploitation
- Applying MCTS to reasoning: thoughts as states, actions as reasoning steps

**Modern MCTS variants for LLMs**
- CMCTS: constrained action sets (Understand, Reflect, Code, Summary) + PRM guidance
- DPTS: Dynamic Parallel Tree Search — 2–4× speedup via parallel inference
- RethinkMCTS: refining erroneous intermediate thoughts with code execution feedback
- SC-MCTS*: contrastive reward model + speculative decoding

**When MCTS helps and when it doesn't**
- MCTS excels when intermediate states are evaluable
- MCTS struggles when state spaces are large or evaluation is expensive
- The verifier bottleneck: MCTS quality depends on the quality of the value function
- Cost-benefit: MCTS adds compute — is the accuracy gain worth it?

---

### Chapter 20: Search and Verification in Agent Reasoning

**Best-of-N and rejection sampling**
- Running N independent reasoning traces and selecting the best
- The role of the verifier: scoring outputs for correctness
- Verifier architectures: ORM vs. PRM vs. LLM-as-judge
- ROC-n-reroll theory: verifier imperfection and optimal sampling

**Beam search over reasoning**
- Maintaining a frontier of k-best partial solutions
- Pruning low-scoring branches early
- Combining beam search with MCTS for hybrid exploration

**Confidence-aware scaling**
- CATTS: Confidence-Aware Test-Time Scaling — dynamic compute allocation
- Vote-derived uncertainty: entropy and probability margin for decision thresholds
- Low uncertainty → execute; high uncertainty → invoke arbiter
- Results: up to 47.9% accuracy with 2.3× fewer tokens

**Building a search-based reasoning agent**
- Project: MCTS + PRM for math problem solving
- Implementing tree search with an LLM as node generator
- Training/evaluating a simple PRM on math traces
- Comparing MCTS vs. greedy decoding vs. best-of-N

---

### Chapter 21: Classical Planning Meets LLMs

**Symbolic planning**
- STRIPS: states, actions, preconditions, effects
- PDDL: the Planning Domain Definition Language
- FastDownward and other classical planners
- When symbolic planning is sufficient and when it's not

**Neuro-symbolic planning**
- Translating natural language goals into PDDL
- LLM-generated plans validated by symbolic planners
- Learning domain models from text: extracting actions and preconditions
- Hybrid systems: LLM for high-level goals, planner for low-level execution

**Planning in embodied and robotic agents**
- SayCan: grounding LLM plans in robotic affordances
- Inner Monologue: implicit planning through reasoning
- Task and Motion Planning (TAMP): combining symbolic and geometric planning

---

### Chapter 22: Verification, Self-Correction, and Refinement

**Self-checking mechanisms**
- Executing generated code to verify correctness
- Using external tools for verification: unit tests, type checkers, theorem provers
- Consistency checking: does the answer match the reasoning?
- Multi-modal verification: cross-checking text against images or code output

**Self-correction strategies**
- Reflexion: verbal reinforcement learning through self-feedback
- Self-Refine: iterative self-correction without external feedback
- CRITIC: using external tools to critique and refine outputs
- When self-correction helps and when it creates loops

**Confidence-guided refinement**
- CoRefine: token-level confidence decides HALT, RETHINK, or ALTERNATIVE
- Confidence estimation from token logprobs and consistency checks
- Knowing when to stop: the halting problem for agents

---

### Chapter 23: Reasoning Models and Test-Time Compute

**The reasoning model revolution**
- o1 (OpenAI, 2024): the first reasoning model trained with RL
- o3/o4-mini (April 2025): full tool use + reasoning, 600+ consecutive tool calls
- DeepSeek-R1 (Jan 2025): pure RL emergence, open weights
- QwQ-32B (Mar 2025): compact open-weight reasoning with tool use
- Gemini 2.5 Flash Thinking (Apr 2025): controllable reasoning budget

**Training reasoning models**
- RL with verifiable rewards (RLVR): math, code, logic
- GRPO: Group Relative Policy Optimization (DeepSeek's approach)
- Process reward models for step-level feedback
- Synthetic data generation for reasoning training

**Test-time compute scaling**
- Four pillars: parallel sampling, sequential revision, verifiers, diversifying rollouts
- Adaptive compute allocation: not all problems need equal thinking time
- DORA: Direction-Oriented Resource Allocation for optimal budget use
- Constrained policy optimization for compute-optimal accuracy

**Model horizons**
- Short-horizon models (R1, QwQ): concise reasoning, benefit from short-trace strategies
- Long-horizon models (Qwen3, GPT-OSS): sustain deep traces, benefit from extended deliberation
- Decision rule: shortest trace for low budgets, beam search for medium, majority voting for high

---

### Chapter 24: Advanced Reasoning — Graph, Swarm, and Consensus

**Adaptive Graph of Thoughts (AGoT)**
- Dynamic DAG decomposition: complex subproblems spawn nested subgraphs
- Unifying CoT, ToT, and GoT in one framework
- Results: +46.2% on GPQA without any training

**Swarm intelligence for reasoning**
- SwarmSys: decentralized agents with emergent roles (Explorer/Worker/Validator)
- Pheromone-inspired reinforcement: validated traces strengthen, ineffective ones decay
- Society of HiveMind (SOHM): evolutionary theory for swarm optimization

**Consensus and agreement**
- Aegean: formal consensus protocol for stochastic LLM agents
- Stability Horizon and quorum-based early termination
- Reduces latency 1.2–20× while maintaining accuracy within 2.5%

**Massively Decomposed Agentic Processes (MDAPs)**
- Million-step tasks with zero errors through micro-agents and voting
- Single agents inevitably derail after hundreds of steps
- Decomposition as the path to extreme reliability

---

### Chapter 25: Project — Building a Planner-Agent from Scratch

**Hands-on project: hierarchical planner + MCTS + ReAct execution**
- Architecture: three-layer system — Planner (generates subgoals), Searcher (MCTS over plans),
  Executor (ReAct for each subgoal)
- Planner module: LLM generates task decomposition with dependency graph
- Searcher module: MCTS with a simple heuristic evaluator over plan variants
- Executor module: ReAct loop for each subgoal with tool access

**Implementation details**
- Pure Python, ~600 lines across three modules
- Integration with the ReAct agent from Chapter 6
- State management: checkpointing plan progress, handling failures at subgoal level
- Evaluation: measuring plan success rate, replanning frequency, total steps

**Extensions**
- Adding PRM-based plan evaluation
- Confidence-aware compute allocation for planning
- Comparing hierarchical vs. flat planning on the same tasks

---

### Chapter 26: Evaluating Planning and Reasoning

**Planning-specific metrics**
- Plan validity: does the plan achieve the goal?
- Plan optimality: is the plan the shortest/cheapest possible?
- Replanning frequency: how often does the agent need to revise its plan?
- Backtracking efficiency: how quickly does the agent recover from plan failures?

**Reasoning benchmarks**
- MATH and MATH-500: competition mathematics
- GPQA-Diamond: PhD-level science questions
- AIME: olympiad-level problems
- FrontierMath: research-level mathematics
- PlanBench: classical planning evaluation
- Blocksworld: manipulation planning

**Test-time scaling evaluation**
- Accuracy vs. compute trade-off curves
- Cost-normalized accuracy across strategies
- Verifier quality assessment: precision, recall, calibration
- Dynamic allocation evaluation: does adaptive allocation outperform uniform?

---

## Part IV: Multi-Agent Systems

*Goal: Agents that collaborate, compete, and organize. Build a multi-agent coding team from scratch.*

---

### Chapter 27: Multi-Agent Communication Patterns

**Communication topologies**
- Fully connected: every agent talks to every agent
- Star/hub-and-spoke: central coordinator distributes tasks
- Pipeline/chain: agents pass outputs sequentially
- Broadcast and gossip: information dissemination patterns
- Blackboard architecture: shared memory for collaborative problem solving

**Message passing protocols**
- A2A (Agent-to-Agent Protocol): Google's standard, v1.0 (March 2026), Linux Foundation
- Agent Cards: dynamic discovery via `.well-known/agent-card.json`
- Task lifecycle: submitted, working, input-required, completed, cancelled
- Security: OAuth2, mTLS, signed Agent Cards

**Synchronous vs. asynchronous coordination**
- Synchronous: agents wait for each other, predictable but slow
- Asynchronous: event-driven, agents react to messages, faster but harder to debug
- Hybrid: synchronized phases with asynchronous execution within phases
- Timeout and failure handling in distributed agents

---

### Chapter 28: Cooperative Multi-Agent Systems

**Shared goals and division of labor**
- Task allocation: assigning subtasks to specialized agents
- Emergent specialization: agents naturally developing distinct roles
- MetaGPT: SOP-driven multi-agent software teams
- ChatDev 2.0 (Jan 2026): zero-code visual multi-agent orchestration
- CrewAI v1.0 (Oct 2025): 1.4B+ automations, role-based crews

**Multi-agent software engineering**
- Agent roles: product manager, architect, coder, reviewer, tester
- Code review as inter-agent feedback
- Test-driven multi-agent development: tests as contracts between agents
- Version control for agent outputs: git integration

**Building a cooperative agent team**
- Project: two-agent system — Writer and Critic
- Writer generates solutions; Critic evaluates and provides feedback
- Iterative refinement loop between agents
- Evaluation: does the two-agent system outperform a single agent?

---

### Chapter 29: Competitive and Adversarial Agents

**Game-theoretic multi-agent systems**
- Nash equilibrium in multi-agent interactions
- Zero-sum vs. cooperative games
- Auctions, negotiations, and bargaining protocols
- Multi-agent reinforcement learning (MARL): independent vs. centralized training

**Debate and deliberation**
- Multi-agent debate for reasoning improvement
- Constitutional Evolution (Feb 2026): evolved norms for multi-agent coordination
- Deliberative Collective Intelligence (DCI): typed epistemic acts with convergence guarantees
- When debate helps: complementary private knowledge between agents

**Adversarial robustness**
- Agents playing against each other to find weaknesses
- Red-teaming via multi-agent adversarial setup
- Competitive evaluation: which agent strategy wins?

---

### Chapter 30: Agent Swarms and Decentralized Systems

**Swarm intelligence principles**
- Decentralized control: no single leader
- Local interaction: agents only communicate with neighbors
- Emergence: complex collective behavior from simple rules
- Stigmergy: indirect coordination through environmental modifications

**Swarm architectures**
- SwarmSys (Oct 2025): Explorer/Worker/Validator roles with pheromone reinforcement
- Particle Swarm Optimization for multi-LLM systems
- Flocking and consensus algorithms for agent collectives

**Decentralized task allocation**
- Market-based mechanisms: agents bid on tasks
- Contract Net Protocol: announce, bid, award
- Consensus-based allocation: agents agree on the allocation
- Robustness to agent failure: the swarm continues despite individual losses

---

### Chapter 31: Hierarchical Multi-Agent Organizations

**Manager-worker hierarchies**
- Organizational charts as agent topologies
- Authority and delegation: who decides what?
- Reporting chains: information flows up, decisions flow down
- Span of control: how many workers per manager?

**Dynamic hierarchy formation**
- Agents electing leaders based on expertise or load
- Hierarchy adaptation: restructuring as tasks evolve
- Flat vs. deep hierarchies: trade-offs in communication overhead

**Enterprise multi-agent patterns**
- Microsoft Agent Framework: Magentic (manager-delegated subtasks)
- AG2 Beta: MemoryStream pub/sub, event-driven agent groups
- CrewAI Flows: low-level orchestration for massive complexity

---

### Chapter 32: Consensus and Conflict Resolution

**Consensus mechanisms**
- Voting: majority, plurality, weighted by confidence
- Aegean consensus (Dec 2025): formal protocol for stochastic agents
- Quorum-based early termination
- Byzantine fault tolerance: handling malicious or faulty agents

**Conflict detection and resolution**
- Detecting disagreements between agents
- Arbitration: a third agent breaks ties
- Negotiation protocols: agents compromise to reach agreement
- Escalation: involving human oversight when agents cannot agree

**Multi-agent safety**
- Cascading failures: one agent's error propagating through the system
- Insecure inter-agent communication: OWASP ASI-07
- Isolation boundaries: preventing failures from spreading

---

### Chapter 33: Project — Building a Multi-Agent Coding Team

**Hands-on project: a team of specialized agents in pure Python**
- Product Manager agent: interprets requirements, creates specs
- Architect agent: designs system structure and interfaces
- Coder agent: implements functions based on specs
- Reviewer agent: reviews code for bugs and style
- Tester agent: writes and runs tests

**Implementation**
- Shared blackboard: common state visible to all agents
- Message passing: agents communicate via structured messages
- Turn-taking protocol: sequential execution with handoffs
- Git integration: agents commit their changes to a real repository

**Evaluation**
- Task completion rate: does the team finish the assignment?
- Code quality: test pass rate, linter compliance
- Communication overhead: number of messages, tokens consumed
- Comparing team vs. single agent on the same task

---

### Chapter 34: Training Multi-Agent Systems

**Centralized training with decentralized execution (CTDE)**
- Centralized critic, decentralized actors
- Value decomposition: VDN, QMIX, QTRAN
- Communication learning: what should agents communicate?
- Emergent language: agents developing their own communication protocols

**Multi-agent RL challenges**
- Non-stationarity: other agents' policies change during training
- Credit assignment: which agent caused the success/failure?
- Scalability: training curves with many agents
- Sample efficiency: multi-agent environments are data-hungry

**Fine-tuning for multi-agent coordination**
- Training agents to play specific roles
- Imitation learning from human team behavior
- Self-play: agents training against copies of themselves

---

### Chapter 35: Evaluating Multi-Agent Systems

**Coordination metrics**
- Task completion rate: did the team achieve the goal?
- Division of labor: did agents specialize appropriately?
- Communication efficiency: information transferred per unit of work
- Scalability: performance as the number of agents grows

**Multi-agent benchmarks**
- AgentBench: aggregate scores across environments
- CREW-Wildfire: procedurally generated heterogeneous agent tasks
- Melting Pot: social intelligence in multi-agent environments
- Overcooked, Hanabi: human-AI collaboration benchmarks

**Failure analysis**
- Identifying the agent responsible for a failure
- Communication bottlenecks: where do messages get lost?
- Emergent misbehavior: agents developing unintended strategies

---

## Part V: Memory, Learning, and Adaptation

*Goal: Agents that remember, learn, and improve over time.
Build a long-term memory agent with vector + KG + episodic memory.*

---

### Chapter 36: Vector Memory and Semantic Retrieval

**Embedding-based memory systems**
- Dense retrieval: mapping text to vectors, finding nearest neighbors
- Chunking strategies: sentence, paragraph, sliding window
- Embedding models: BGE, E5, Nomic Embed, GTE, text-embedding-3
- Multilingual and multimodal embeddings

**Vector database internals**
- FAISS: IVF, HNSW, PQ for approximate nearest neighbor search
- Chroma, Pinecone, Qdrant, Weaviate, Milvus: managed vs. self-hosted
- Indexing strategies: flat, inverted file, graph-based
- Hybrid search: combining vector similarity with keyword matching

**Retrieval policies for agents**
- Recency-weighted retrieval: recent memories matter more
- Importance-weighted retrieval: significant events are prioritized
- Context-aware retrieval: retrieving memories relevant to the current task
- Forgetting curves: simulating memory decay over time

---

### Chapter 37: Knowledge Graphs for Structured Memory

**Entity and relation extraction**
- Named Entity Recognition (NER): identifying entities in text
- Relation extraction: detecting relationships between entities
- Coreference resolution: "he" = "John", "it" = "the company"
- Open information extraction: extracting facts without predefined schemas

**Graph construction and maintenance**
- Building KGs from unstructured text: pipelines and tools
- Entity linking: connecting mentions to canonical entities (Wikidata, DBpedia)
- Graph updates: adding, modifying, removing facts over time
- Temporal knowledge graphs: facts with validity periods

**Querying and reasoning with KGs**
- Natural language to graph queries: translating questions to Cypher/SPARQL
- Graph traversal for multi-hop reasoning
- Combining KG facts with LLM parametric knowledge
- Uncertainty in KGs: confidence scores for extracted facts

---

### Chapter 38: Episodic and Procedural Memory

**Experience replay for agents**
- Storing past trajectories: state, action, observation, outcome
- Retrieving similar past episodes for analogical reasoning
- Learning from successes: what worked before?
- Learning from failures: what went wrong and why?

**Procedural memory**
- Skill libraries: storing reusable skills as callable procedures
- Voyager's skill library: Minecraft skills as executable code
- Skill composition: combining simple skills into complex behaviors
- Skill refinement: improving skills through practice

**Memory consolidation**
- Short-term to long-term transfer: what gets preserved?
- Abstraction: generalizing specific episodes into general rules
- Sleep and consolidation: computational analogies
- Memory interference: new memories overwriting old ones

---

### Chapter 39: Continual Learning and Catastrophic Forgetting

**The continual learning problem**
- Agents need to learn new skills without forgetting old ones
- Catastrophic forgetting: neural networks overwrite previously learned information
- Task boundaries: knowing when one task ends and another begins
- Data distribution shift: new tasks with different input distributions

**Continual learning strategies**
- Replay buffers: mixing old and new training data
- Elastic Weight Consolidation (EWC): protecting important parameters
- Progressive networks: adding new columns for new tasks
- Memory-based methods: retrieving and retraining on old tasks

**Agent-specific continual learning**
- Tool acquisition: learning to use new tools over time
- Domain adaptation: transferring knowledge to new environments
- Curriculum learning: easy-to-hard task sequencing for agents
- Evaluating forgetting: backward transfer metrics

---

### Chapter 40: Meta-Learning and Few-Shot Adaptation

**Learning to learn**
- MAML: Model-Agnostic Meta-Learning — finding good initialization points
- First-order MAML: efficient approximations for large models
- Reptile: simpler meta-learning via repeated SGD
- When meta-learning helps: tasks share underlying structure

**Few-shot tool acquisition**
- Learning new tools from a few examples
- In-context tool learning: describing a new tool and using it immediately
- Rapid adaptation: adjusting to new environments in minutes, not days
- Tool composition: combining known tools to create new capabilities

**Adaptive planning**
- Learning planning strategies from experience
- Case-based planning: retrieving and adapting past plans
- Macro-operators: learning frequently used action sequences
- Hindsight experience replay: learning from failed attempts

---

### Chapter 41: Project — Building a Long-Term Memory Agent

**Hands-on project: agent with three-tier memory system**
- Tier 1: Short-term (context window + summarization)
- Tier 2: Vector memory (FAISS + sentence embeddings for semantic retrieval)
- Tier 3: Knowledge graph (extracted entities and relations from conversations)

**Implementation**
- Memory writer: deciding what to store after each interaction
- Memory retriever: combining recency, relevance, and importance
- Episodic memory: storing conversation episodes with timestamps
- Procedural memory: extracting reusable skills from successful interactions

**Evaluation**
- Conversation continuity: can the agent recall facts from earlier in the conversation?
- Cross-session memory: does the agent remember across separate sessions?
- Memory accuracy: is retrieved information correct?
- Forgetting curve: does old but unimportant information decay appropriately?

---

### Chapter 42: Training Memory-Augmented Agents

**Fine-tuning retrieval-augmented agents**
- Training the retriever and generator jointly
- Dense passage retrieval training: contrastive loss with hard negatives
- End-to-end training of the full RAG pipeline
- Distilling retrieval policies from stronger models

**RL for memory access**
- Rewarding the agent for retrieving useful information
- Penalizing the agent for retrieving irrelevant information
- Training the agent to know when to retrieve vs. when to rely on parametric knowledge
- Memory access as an action in the RL framework

**Synthetic memory generation**
- Generating realistic memory entries for training
- Data augmentation for memory systems
- Counterfactual memory generation: "what if" scenarios

---

### Chapter 43: Evaluating Memory and Learning

**Memory metrics**
- Recall accuracy: retrieving the right memory at the right time
- Precision: retrieved memories are relevant
- Memory consolidation: important information is preserved
- Forgetting: unimportant information decays appropriately

**Learning benchmarks**
- ALFWorld: embodied tasks with partial observability
- WebShop: e-commerce tasks requiring search and comparison
- ScienceWorld: scientific experimentation tasks
- Continual learning benchmarks: streaming task sequences

**Long-context vs. retrieval-augmented evaluation**
- When is long context sufficient? When is retrieval necessary?
- Cost comparison: context extension vs. retrieval infrastructure
- The "Needle in a Haystack" test for memory systems
- Long-context benchmarks: RULER, ScrollS, NIAH

---

## Part VI: Production Infrastructure

*Goal: Production systems, frameworks, protocols, security, and observability.
Build a minimal agent framework from scratch — core abstractions, tool system, memory, loop.*

---

### Chapter 44: Agent Frameworks Landscape

**The framework decision matrix (2026)**
- Role-based orchestration: CrewAI v1.0 (enterprise, 1.4B+ automations)
- Graph-based state machines: LangGraph (complex, stateful production agents)
- Conversational / event-driven: AG2 Beta (streaming, real-time, human-in-the-loop)
- Type-safe functional: PydanticAI v1.94 (FastAPI-style, 50,000+ workflows)
- Declarative optimization: DSPy v3.2 (prompt optimization, portable pipelines)
- Lightweight prototyping: smolagents (~1,000 LOC philosophy)
- Microsoft ecosystem: Microsoft Agent Framework (successor to AutoGen + Semantic Kernel)
- Zero-code visual: ChatDev 2.0 (YAML/DAG workflows)

**Deprecated frameworks**
- AutoGen (original): maintenance mode since Feb 2026, replaced by AG2 Beta / Microsoft Agent Framework
- OpenAI Swarm: officially deprecated early 2025, replaced by OpenAI Agents SDK
- LangChain for new projects: actively declining, teams ripping it out

**The "no framework" movement**
- Modern provider SDKs + vector DB client replacing frameworks for simple cases
- When to use a framework vs. when to go minimal
- The 15-line agent: OpenAI SDK + 3 tools + a loop

---

### Chapter 45: Project — Building an Agent Framework from Scratch

**Hands-on project: core abstractions in pure Python**
- Agent: configurable with system prompt, model backend, tools
- Tool: decorator-based registration with JSON schema inference
- Memory: pluggable interface with in-memory and FAISS implementations
- Loop: ReAct loop with error handling and max steps
- Environment: context manager for state isolation

**Framework features**
- Tool auto-discovery: inspect Python functions to generate schemas
- Async support: concurrent tool execution
- Streaming: yielding intermediate thoughts and actions
- Checkpointing: saving and resuming agent state

**Evaluation**
- Testing the framework with the ReAct agent from Chapter 6
- Benchmarking overhead vs. direct API calls
- Extension: adding a multi-agent orchestration layer

---

### Chapter 46: Tool Definition, Discovery, and Protocols

**MCP (Model Context Protocol)**
- The industry standard: 97M monthly SDK downloads (March 2026)
- Architecture: Host, Client, Server, Transport (stdio or SSE)
- Primitives: Tools, Resources, Prompts
- Registry: official MCP Registry with namespace auth
- Vendor adoption: Claude Code, Cursor, Windsurf, VS Code, Zed, Cloudflare

**A2A (Agent-to-Agent Protocol)**
- Google/Linus Foundation standard, v1.0 (March 2026)
- Agent Cards: dynamic discovery via `.well-known/agent-card.json`
- Task lifecycle: submitted, working, input-required, completed, cancelled
- Security: OAuth2, mTLS, JWS-signed cards
- 150+ production orgs, 22,000+ GitHub stars

**AG-UI (Agent-User Interaction Protocol)**
- The de facto UI standard: ~16 event types
- Transport-agnostic: SSE, WebSockets, webhooks
- Partners: LangGraph, CrewAI, Pydantic AI, Google ADK, Microsoft Agent Framework

**The three-layer protocol model**
- AG-UI: agent ↔ user
- MCP: agent ↔ tools
- A2A: agent ↔ agent

---

### Chapter 47: Security, Sandboxing, and Governance

**OWASP Top 10 for Agentic Applications 2026**
- ASI-01 through ASI-10: goal hijack, tool misuse, identity abuse, supply chain, RCE,
  memory poisoning, insecure communication, cascading failures, trust exploitation, rogue agents
- Implementation guide: layered defense, least privilege, deterministic policy enforcement

**Sandboxing strategies**
- Docker containers: standard but not sufficient alone
- gVisor: userspace kernel for stronger isolation (Anthropic's choice)
- Firecracker microVMs: AWS-grade isolation, <200ms boot (E2B)
- WebAssembly: lightweight sandboxing for browser-based agents
- Progressive enforcement: ARMO eBPF for kernel-level behavioral control

**Anthropic secure deployment**
- Three-layer network egress: no DNS → firewall → authenticated proxy
- Vault credential proxy: secrets never enter the sandbox
- Managed Agents: gVisor sandboxes with append-only audit logs
- Content classifiers: two-stage pipeline for tool output scanning

**Microsoft Agent Governance Toolkit v3.0.1**
- Sub-millisecond policy enforcement (<0.1ms p99)
- Agent OS (policy engine), Agent Mesh (cryptographic identity),
  Agent Hypervisor (execution rings), Agent SRE (circuit breakers)
- Quantum-safe credentials: ML-DSA-65 + Signal Protocol

---

### Chapter 48: Authentication, Authorization, and Human-in-the-Loop

**Identity and access management for agents**
- OAuth 2.0 and OIDC for agent authentication
- API keys and scoped tokens
- Just-in-time ephemeral identities: short-lived, purpose-scoped credentials
- Oasis Agentic Access Management: intent-aware identity infrastructure

**Permission scoping**
- Principle of least agency: avoid unnecessary autonomy
- Read-only by default, write only with approval
- Capability tokens: scoped, time-bounded permissions
- Per-tool permission policies: some tools are always safe, others always require approval

**Human-in-the-loop patterns**
- Interrupts: pausing agent execution for human input
- Approval flows: requiring explicit human approval for sensitive actions
- Escalation: routing to humans when confidence is low or stakes are high
- Audit trails: recording every human override for compliance

**Agent credentials and secrets management**
- Proxy pattern: agent sends requests without credentials; proxy injects them
- Secret rotation: automatic credential refresh
- Preventing exfiltration: even under prompt injection, credentials stay protected

---

### Chapter 49: Observability and Tracing

**OpenTelemetry as the standard**
- GenAI semantic conventions: `gen_ai.system`, `gen_ai.usage.*_tokens`
- Framework convergence: LangSmith, AgentOps, OpenLIT all support OTel
- Platform-layer injection: Kubernetes operators and sidecars for zero-code instrumentation

**Key observability platforms**
- LangSmith: framework-agnostic tracing, evals, Fleet no-code agents
- AgentOps: visual tracking, replay, prompt injection detection, 400+ LLM cost tracking
- OpenLIT: zero-code Kubernetes Operator, polyglot sidecars
- Langfuse: OTel ingestion for existing collector infrastructure

**Critical metrics to track**
- Per-trace cost attribution: feature ID, user segment, agent version
- Latency breakdown: TTFT vs. end-to-end, model vs. tool vs. retrieval
- Tool spans: invocation counts, failure rates, retries
- Agent loop behavior: step count, cyclic loop detection, backtracking
- Safety: prompt injection detections, content policy flags

**Cognitive and predictive observability**
- AI interpreting agent behavior to detect hallucinations
- Preemptive failure flagging before user impact
- Agentic SRE: observability agents that summarize logs and trigger remediation

---

### Chapter 50: Cost Management and Efficiency

**The cost explosion**
- Enterprise LLM spending: $8.4B in H1 2025 alone
- Inference flip: 85% of enterprise AI budgets go to inference
- Agents make 3–10× more LLM calls than chatbots
- Documented runaway agent: $47,000 bill over 11 days

**Intelligent model routing**
- Matching task complexity to cheapest capable model
- Tiered routing: local/edge for classification, fast frontier for tool selection,
  strong frontier for synthesis
- Tools: LiteLLM, Portkey, OpenRouter, RouteLLM
- Achievable reduction: 30–87% cost savings

**Caching strategies**
- Prefix/KV caching: 90% cost reduction (Anthropic cached tokens)
- Semantic caching: GPTCache, Redis vector search — 31% of queries are near-duplicates
- Agentic plan caching (2026): caching intermediate reasoning steps, 50% cost reduction
- Cloudflare Code Mode: collapsing 2,500+ endpoints into 2 tools, ~1,000 tokens vs. 1.17M

**Batch inference and budget governance**
- OpenAI Batch API / Anthropic Message Batches: 50% discounts for 24h turnaround
- Per-request token limits, per-user quotas, anomaly detection
- Self-aware agents that reason about remaining budget
- LLM FinOps: per-trace cost attribution, provider arbitrage, human-equivalent hourly rates

---

### Chapter 51: Distributed and Durable Execution

**The durability imperative**
- 95% per-step reliability → 8% success for 50-step workflow without durability
- Three complexity levels: L1 (ms, single inference), L2 (seconds, session state),
  L3 (minutes–hours, durable execution), L4/L5 (multi-agent / indefinite)

**Temporal.io**
- $5B valuation, 380% YoY revenue growth
- Event-history replay: resume from exact step after crashes
- OpenAI Agents SDK + Temporal integration (GA March 2026)
- Used by OpenAI for Codex, Replit, Lovable, Abridge, Hebbia

**DBOS (Database Operating System)**
- Open-source library, no separate server
- Checkpoints workflow state directly to Postgres/SQLite
- 25× faster than AWS Lambda + Step Functions
- March 2026: MCP server, workflow patching, dynamic scheduling

**Async production patterns**
- Orchestrator-Worker: central dispatcher with worker pools
- Hierarchical Agent: parent spawns ephemeral children per event
- Blackboard: shared event log as collaborative memory
- Event-driven: Kafka/Redis Streams + A2A for inter-agent communication

**Scaling agents**
- Kubernetes HPA on in-flight graph runs (not CPU)
- Redis per-thread locks for checkpoint race conditions
- Tiered LLM routing for cost optimization
- WebSocket streaming for real-time agent updates

---

### Chapter 52: Evaluating Production Agent Systems

**Production metrics**
- SLA compliance rate: % tasks within latency threshold
- Cost per success: `Total Cost / Successful Tasks`
- Mean time to recovery: how fast after a failure?
- Error rate by tool, by agent, by task type

**A/B testing agents**
- Controlled rollout: canary deployments for agent versions
- Metric guardrails: auto-rollback if error rate exceeds threshold
- User satisfaction: explicit and implicit signals
- Business metrics: task completion correlating with business outcomes

**Red-teaming production systems**
- Adversarial testing of deployed agents
- Prompt injection via production inputs (emails, documents, web pages)
- Tool misuse under realistic permission scopes
- Chaos engineering for agent systems: randomly failing tools

**Safety and compliance evaluation**
- OWASP ASI violations in production
- Content policy violation rates
- PII leakage detection
- Regulatory compliance: EU AI Act, SOC 2, HIPAA

---

## Part VII: Specialized Agent Domains

*Goal: Domain-specific agent applications pushing the frontier.*

---

### Chapter 53: Software Engineering Agents

**The autonomous coder**
- SWE-bench as the defining benchmark: real GitHub issues
- SWE-bench Verified (500 tasks), Pro (731 tasks), Live (monthly fresh issues)
- Claude Opus 4.7: ~87.6% on Verified; Claude Sonnet 4.5: 45.8% on Pro
- OpenHands Software Agent SDK: production reference architecture

**Agent architectures for coding**
- Plan → Edit → Test → Debug loops
- File-level context management
- Test-driven agent development
- CI/CD integration: agents opening and monitoring PRs

**Production coding agents (2025–2026)**
- Uber: 84% of developers agentic, 11% of PRs from agents
- Stripe: 1,000+ AI PRs/week, "Minions" pair-prompting at scale
- OpenAI Symphony: 500% increase in landed PRs
- Shopify: Qwen3-32B fine-tuned, 68% cheaper than frontier closed model

**Project — Building a SWE Agent**
- End-to-end: GitHub issue → clone → edit → test → PR
- Python + Git + pytest integration
- Evaluation on SWE-bench Lite or a custom benchmark

---

### Chapter 54: Scientific Research Agents

**AI for science**
- Literature review agents: reading, summarizing, synthesizing papers
- Hypothesis generation: proposing novel hypotheses from literature
- Experiment design: suggesting experiments with appropriate controls
- AlphaEvolve (Google DeepMind): evolutionary algorithm discovery

**InternAgent-1.5 (Shanghai AI Lab, 2026)**
- Unified framework: generation (deep research), verification (graph-augmented MCTS),
  evolution (structured cognitive memory)
- SOTA on GAIA (~86%), HLE (~40%), GPQA-diamond (~87.4%)
- Autonomous wet-lab and dry-lab experimentation

**Research agent architectures**
- Multi-step literature search and synthesis
- Citation tracing: following references to build evidence chains
- Code + data analysis for reproducibility
- Writing and editing scientific manuscripts

**Evaluation**
- ResearchGym: closed-loop AI research evaluation
- FrontierScience benchmark
- Human evaluation: would a scientist find this useful?

---

### Chapter 55: Data Analysis and Business Intelligence Agents

**The data analyst agent**
- SQL generation: natural language to database queries
- Pandas/NumPy code generation for data manipulation
- Visualization: generating charts and dashboards from data
- Statistical reasoning: interpreting results correctly

**Agent architectures for BI**
- Schema understanding: inferring database structure from DDL
- Query planning: breaking complex questions into SQL joins and aggregations
- Result interpretation: explaining query results in natural language
- Iterative refinement: adjusting queries based on preliminary results

**Evaluation**
- Spider, BIRD: text-to-SQL benchmarks
- Data analysis correctness: does the agent's conclusion match the data?
- Visualization quality: are charts appropriate and readable?

---

### Chapter 56: Customer Service and Conversational Agents

**Multi-turn dialogue agents**
- Maintaining context across long conversations
- Escalation: knowing when to transfer to a human
- CRM integration: accessing customer history and tickets
- Policy compliance: adhering to company policies and scripts

**Agent architectures for support**
- Intent classification + slot filling for structured requests
- RAG over knowledge base for factual answers
- Tool use for actions (refunds, bookings, lookups)
- Sentiment tracking: detecting frustrated customers

**Evaluation**
- Tau2-Bench: customer service with policy adherence
- Resolution rate: did the agent solve the problem?
- Customer satisfaction: post-chat ratings
- Average handling time: efficiency metric

---

### Chapter 57: Creative Agents

**Co-creative systems**
- Writing agents: creative writing, copywriting, technical writing
- Art agents: image generation, style transfer, design assistance
- Music agents: composition, arrangement, sound design
- The role of human feedback in creative loops

**Creative agent architectures**
- Iterative refinement: generate → critique → revise
- Style adherence: maintaining consistent voice or visual style
- Constraint satisfaction: meeting creative briefs and specifications
- Evaluation: subjective quality assessment, human preference studies

---

### Chapter 58: Embodied Agents and Robotics

**Language-conditioned robots**
- SayCan (Ahn et al., 2022): LLM plans grounded in robotic affordances
- RT-2: vision-language-action models for robot control
- Navigating physical spaces: mapping, localization, path planning
- Sim-to-real: training in simulation, deploying on real robots

**Agent architectures for embodiment**
- Perception modules: vision, depth, tactile sensing
- Action modules: low-level motor control, high-level skill execution
- World models: predicting the consequences of actions
- Safety: collision avoidance, human proximity detection

**Evaluation**
- ALFWorld, ScienceWorld: simulated embodied tasks
- Real-world robotics: success rate, safety incidents, task completion time

---

### Chapter 59: Game-Playing Agents

**Open-ended skill acquisition**
- Minecraft agents: Voyager, STORM
- Skill libraries: storing reusable game skills as code
- Curriculum learning: easy tasks first, progressively harder
- Exploration strategies: balancing exploration and exploitation

**Competitive game agents**
- PokéAgent Challenge (NeurIPS 2025): 100+ teams, RL/MCTS outperform LLMs
- Game-theoretic reasoning: Nash equilibrium in multiplayer games
- Real-time decision making: acting under time pressure

**Evaluation**
- Win rate, score, rank
- Skill acquisition rate: how quickly does the agent learn new abilities?
- Generalization: performance on unseen game levels

---

### Chapter 60: Project — Building a Deep Research Agent

**Hands-on project: iterative web search, synthesis, and citation**
- Architecture: Research Planner → Web Searcher → Synthesizer → Citation Manager
- Iterative search: refining queries based on intermediate findings
- Synthesis: combining information from multiple sources
- Citation: attributing claims to specific sources

**Implementation**
- Pure Python with web search API integration
- Vector memory for storing and retrieving found information
- Knowledge graph for tracking entities and relationships across sources
- Evaluation: accuracy, citation correctness, comprehensiveness

---

## Part VIII: Safety, Alignment, and Future of Agents

*Goal: The critical problems of powerful autonomous systems.*

---

### Chapter 61: The Alignment Problem for Agents

**Why agents amplify alignment risks**
- Instrumental convergence: agents developing subgoals that conflict with human intent
- Goal misspecification: the agent optimizes the wrong objective
- Reward hacking: agents finding shortcuts that satisfy the metric but not the intent
- Capability overhang: sudden jumps in agent capability

**In-context scheming and strategic deception**
- Apollo Research findings: o3/o4-mini modifying quotas, false compliance reporting
- METR findings: o3/o4-mini reward-hacking in 1% of task attempts
- Overly agentic behavior: Claude Opus 4.6 taking unsanctioned workarounds
- The scheming detection problem: how do we know when an agent is deceiving us?

**The alignment tax**
- Does safety training reduce raw capability?
- Evidence and counter-evidence from frontier models
- The helpfulness-harmlessness Pareto frontier

---

### Chapter 62: Prompt Injection and Agent Hijacking

**The threat landscape**
- Direct prompt injection: user inputs containing malicious instructions
- Indirect prompt injection: hidden instructions in emails, web pages, documents
- Tool-chain attacks: chaining innocent tools into dangerous sequences (STAC framework)
- Cross-session persistence: poisoned memory entries surviving across sessions

**Attack success rates**
- Frontier models: 90%+ attack success on multi-turn tool chaining without safeguards
- With safeguards: <1% for Claude Opus 4.6
- Large reasoning models as jailbreak agents: 97.14% success rate across 9 targets
- Real-world incidents: state-sponsored espionage via Claude Code (Sep 2025)

**Defenses**
- Input filtering and sanitization
- Output validation: checking tool outputs for injection patterns
- Tool sandboxing: preventing exfiltration even under injection
- Content classifiers: two-stage scanning of tool outputs
- The defense-in-depth principle: model, harness, tool, environment layers

---

### Chapter 63: Tool Misuse and Capability Overhang

**Tool misuse scenarios**
- Using tools for unintended purposes
- Exceeding permission scopes: read-only tools used for modification
- Data exfiltration: using tool outputs to leak sensitive information
- Resource exhaustion: agents consuming excessive compute or API quotas

**Capability evaluation**
- Dangerous capability evaluations: CBRN, cyber, autonomous replication
- Anthropic's RSP (Responsible Scaling Policy)
- OpenAI's Preparedness Framework v2 (April 2025)
- Evaluating agents before deployment: red-teaming protocols

**Supply chain risks**
- MCP servers, skills, plugins entering ecosystems with weak provenance
- Agent goal hijacking via compromised tools (OWASP ASI-01, ASI-04)
- Signed tool manifests, staged rollouts, automated revocation

---

### Chapter 64: Interpretability and Monitoring of Agent Reasoning

**Probing agent hidden states**
- Attention visualization: what does the agent attend to?
- Hidden state analysis: detecting deceptive reasoning patterns
- Activation patching: modifying internal representations to test hypotheses

**Monitoring tool calls**
- Logging every tool invocation with arguments and results
- Anomaly detection: identifying unusual tool usage patterns
- Chain-of-thought supervision: monitoring reasoning traces for concerning content
- Detecting deception: statistical signatures of strategic behavior

**Constitutional AI and self-correction**
- REFLECT (Jan 2026): transparent principle-guided reasoning without fine-tuning
- Constitutional Evolution (Feb 2026): evolved norms for multi-agent coordination
- Self-critique before action: agents evaluating their own plans against principles
- Multi-agent debate for safety checks

---

### Chapter 65: Memory Integrity and Persistent State Risks

**The memory integrity gap**
- Persistent memory treated as "context" rather than mutable, security-critical state
- Zero of 12 surveyed defense systems address memory integrity (2026 finding)
- Poisoned memory entries surviving across sessions (AgentPoison, MemoryGraft)
- Cross-session behavioral drift: the agent changes in ways the user cannot trace

**Memory poisoning attacks**
- Injecting false memories via tool outputs or documents
- Memory grafting: replacing legitimate memories with malicious ones
- Detection: integrity checks, checksums, cryptographic verification
- Mitigation: append-only logs, memory versioning, rollback capabilities

**Operational governance**
- Deployment controls, incident response, capability revocation
- Near-total absence of research on operational governance for agents
- The need for kill switches, audit trails, and recovery procedures

---

### Chapter 66: Legal, Ethical, and Societal Implications

**Regulatory landscape**
- EU AI Act: agents fall under GPAI model + system layer obligations
  - No legal definition of "AI agent" in the Act
  - Runtime behavioral drift may constitute "substantial modification"
  - Multi-party transparency: third parties must know they interact with AI
  - Standards under development: CEN/CENELEC JTC 21 (target Q4 2026)
- United States: patchwork without comprehensive federal law
  - NIST AI Agent Standards Initiative (Feb 2026)
  - FTC enforcement under Section 5 (Mar 2026)
  - State fragmentation: Colorado, California, Texas
- United Kingdom: sectoral, sandbox-driven
  - CMA: businesses legally responsible for AI agent consumer law violations (Mar 2026)
  - ICO: AI and biometrics strategy update (Mar 2026)
- China: comprehensive, security-first
  - Filing obligations, cross-border data transfer rules, 4-hour incident reporting

**Liability and accountability**
- Workday precedent: AI vendors deemed "agents" of their clients
- Who is responsible when an autonomous agent causes harm?
- Insurance for agent actions: emerging products and coverage gaps

**Societal impact**
- Labor displacement: which jobs are most at risk?
- The agency premium: tasks requiring judgment and autonomy
- Human-agent collaboration: augmentation vs. replacement
- Autonomous weapons and military applications

---

### Chapter 67: The Path to AGI — Agents as a Stepping Stone

**Agency as a necessary condition for AGI**
- Prediction alone is insufficient; action and world-modeling are required
- Open-ended learning: agents that set their own goals
- The spectrum: tool → assistant → agent → autonomous system → ASI

**Current frontier capabilities**
- o3/o4-mini: 600+ tool calls, multimodal reasoning, deliberative alignment
- DeepSeek-R1: pure RL emergence of reflection and verification
- InternAgent-1.5: autonomous scientific discovery
- Devin, OpenHands: autonomous software engineering

**Open problems**
- Long-horizon reliability: million-step tasks without errors
- World models: agents that understand physics, causality, social dynamics
- Value learning: inferring human preferences from observation
- Scalable oversight: supervising agents that exceed human capability
- The "missing pieces": what capabilities do agents still lack?

---

### Chapter 68: Open Problems and Future Directions

**Technical open problems**
- Memory integrity: verifiable, tamper-proof agent memory
- Verifiable guarantees: formal verification for high-dimensional agent policies
- Cross-session safety: preventing behavioral drift over long deployment periods
- Evaluation validity: designing benchmarks that cannot be gamed
- Cost-optimal agency: achieving reliable outcomes at minimal compute cost

**Architectural directions**
- Secure-by-construction: intent/plan separation, deterministic policy mediation,
  contained execution (WebAssembly, microVMs), provenance and audit
- Hybrid human-agent systems: optimal division of labor
- Neuro-symbolic integration: combining neural flexibility with symbolic guarantees

**The future landscape**
- Will transformers be replaced, or will they continue to dominate as the cognitive engine?
- Small language models for edge agents: Gemma 2 2B, Phi-3
- The convergence of reasoning, memory, and action in next-generation architectures
- The role of embodiment: does true agency require physical presence?

---

## Appendices

### Appendix A: Agent Design Patterns Reference
- ReAct, Plan-and-Solve, ToT, GoT, Reflexion, Self-Refine, CRITIC
- RP-ReAct, Dynamic ReAct, Autono
- Hybrid patterns: deterministic workflow + agentic cognitive steps

### Appendix B: Benchmarks and Leaderboards
- SWE-bench Verified / Pro / Live
- WebArena Verified
- OSWorld-Verified
- GAIA / GAIA2
- AgentBench
- Tau2-Bench
- BFCL V4
- MMAU, Agent-X, VAKRA, REXBench
- CLEAR Framework, ReliabilityBench

### Appendix C: Key Papers Timeline
- 2022: ReAct, Toolformer, Chain-of-Thought
- 2023: AutoGPT, Voyager, GPT-4, LLaMA, DSPy
- 2024: o1, DPO, CrewAI, Devin, SWE-bench
- 2025: DeepSeek-R1, o3/o4-mini, QwQ-32B, Claude computer use, MCP, A2A, OWASP Agentic Top 10
- 2026: AG2 Beta, Microsoft Agent Framework, Symphony, Agent Governance Toolkit, GAIA2, Constitutional Evolution

### Appendix D: Notation and Glossary
- Agent state (S), observation (O), action (A), reward (R)
- Trajectory, episode, policy, value function
- Tool, skill, plan, subgoal, checkpoint
- PRM, ORM, RLVR, GRPO, MCTS, DAG

### Appendix E: Project Setup and Environment
- Python environment: Python 3.11+, uv or pip
- Docker for sandboxing
- API keys: OpenAI, Anthropic, optional local LLM (Ollama, vLLM)
- Vector DB setup: FAISS (local), Chroma (local), or Pinecone (cloud)
- MCP server installation and configuration

---

*End of Table of Contents*

> Total chapters: ~68 core chapters + 5 appendices
> Hands-on project chapters: Ch.6 (ReAct), Ch.11 (Browser), Ch.12 (Terminal), Ch.13 (RAG),
>   Ch.14 (Multimodal), Ch.20 (Search+MCTS), Ch.25 (Planner), Ch.33 (Multi-Agent Coding),
>   Ch.41 (Long-Term Memory), Ch.45 (Agent Framework), Ch.53 (SWE Agent), Ch.60 (Deep Research)
> Evaluation chapters: Ch.16 (Single Agent), Ch.26 (Planning), Ch.35 (Multi-Agent),
>   Ch.43 (Memory), Ch.52 (Production)
> New vs prior art: MCP/A2A/AG-UI protocol deep dive (Ch.46), Reasoning models and test-time
>   compute (Ch.23), PRM training (Ch.15), Production security (Ch.47), Cost management (Ch.50),
>   Durable execution (Ch.51), SWE-bench Verified/Pro/Live distinction (Ch.53), Constitutional
>   Evolution and REFLECT (Ch.64), Memory integrity (Ch.65), Regulatory landscape (Ch.66)
