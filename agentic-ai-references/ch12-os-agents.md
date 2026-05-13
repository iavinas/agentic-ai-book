# Chapter 12: File System and OS Agents

## Core Thesis
The operating system is the native environment for agents. Shell access, file I/O, and process management turn an LLM into a system administrator.

## Key References

### OS Interaction
- **OSWorld** — "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments". https://arxiv.org/abs/2404.07972
- **OSWorld-Verified** — Updated benchmark with verified tasks.
- **Crab** — "Crab: A Benchmark for Compositional Reasoning and Autonomous Behaviors". https://arxiv.org/abs/2402.17287

### Sandboxing
- **Docker** — https://www.docker.com/
- **gVisor** — Google. Userspace kernel for stronger isolation. https://gvisor.dev/
- **Firecracker microVMs** — AWS. https://firecracker-microvm.github.io/
- **E2B** — Firecracker-based sandboxing for agents. https://e2b.dev/

### Terminal Agents
- **Terminal of Truth** — Terminal interaction as an agent environment.
- **Bash tool in Claude / GPT** — Standard tool for shell access.

## Subtext & Nuance
- Unconstrained shell access is extremely dangerous. Every production agent must run in a sandbox.
- **Safety hierarchy**: chroot (weak) → Docker (standard) → gVisor (stronger) → Firecracker microVMs (strongest, ~200ms boot).
- Permission scoping: read-only by default, write only to designated directories.
- Audit logging is non-negotiable: every command executed, every file touched, every process started.
- Working directory management is subtle: the agent must maintain context across commands in the same directory.

## Implementation Notes
- Architecture: Shell tool with timeout, stdout/stderr capture, exit code.
- Error recovery: parse error messages and suggest fixes. `bash: command not found` → suggest installation.
- Working directory: maintain `cwd` in agent state. Every shell command runs relative to it.
- File tools: read (cat), write (echo/tee), list (ls), search (grep/find).
- Project: terminal agent that can navigate, edit files, run tests, and debug.

## Deprecated / Superseded
- Unsandboxed shell execution — unacceptable in production.
- Direct `os.system()` calls in Python — no timeout, no isolation, no audit.

## Cross-References
- **Previous**: Ch 11 (Web Agents) — another environment for agents.
- **Next**: Ch 13 (RAG Agents) — retrieval-augmented agents.
- **Related**: Ch 47 (Security) — deep dive into sandboxing strategies.
- **Related**: Ch 53 (SWE Agent) — combines file system agents with code editing.
