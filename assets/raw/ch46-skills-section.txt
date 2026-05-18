## Agent Skills: The Presentation Layer Above MCP

MCP defines how tools are transported between servers and agents. But transport is only half the problem. The other half is **presentation**: how does the agent know which tools to use, in what order, and with what arguments? Agent Skills answer this question by packaging capabilities into progressive-disclosure units that the agent discovers, loads, and executes on demand.

This section treats skills as a first-class architectural layer sitting directly above MCP. We explain the format, the loading model, the cross-platform standard, the relationship to deferred tool loading in OpenAI's APIs, and the security implications of a world where agents execute instructions from markdown files.

---

### The SKILL.md Format

A skill is a directory. At minimum it contains one file:

```mermaid
flowchart TD
    R[".claude/skills/my-skill/"]
    R --> S[SKILL.md]
```

The `SKILL.md` file has two parts: YAML frontmatter and markdown body.

**YAML frontmatter** (metadata, ~100 tokens):

```yaml
---
name: database-migration
description: >
  Generate and execute safe database schema migrations.
  Supports PostgreSQL, MySQL, and SQLite.
  Always creates a backup before altering tables.
version: 1.2.0
author: acme-corp
tags: [database, schema, sql, safety]
---
```

The `description` field is the most important line in the entire file. It is the only signal the agent uses for auto-discovery. A good description is specific, includes trigger keywords, and states scope boundaries. A bad description is vague and leads to incorrect skill invocation.

**Markdown body** (instructions, ~1K–5K tokens):

The body is imperative prose: "Run X. Then Y. If Z, do W." It is not documentation-style explanation. The agent reads this body when the skill is triggered, and treats it as a temporary system prompt augmenting its reasoning.

```markdown
## Workflow

1. Read the current schema from `schema/current.sql`.
2. Ask the user for the desired change or infer it from the migration name.
3. Generate the migration SQL. Include `BEGIN;` and `ROLLBACK;` guards.
4. Write the migration to `migrations/YYYYMMDD_HHMMSS_<name>.sql`.
5. Run the migration in a read-only dry-run mode first.
6. If dry-run succeeds, ask for explicit confirmation before executing.
7. After execution, verify the schema matches the expected post-state.

## Safety Rules

- Never execute `DROP TABLE` without a backup.
- Always wrap migrations in transactions.
- If a migration takes longer than 30 seconds, abort and alert the user.
```

**Optional bundled resources**:

```mermaid
flowchart TD
    R[".claude/skills/database-migration/"]
    R --> SM[SKILL.md]
    R --> T[templates/]
    T --> MT[migration_template.sql]
    R --> SC[scripts/]
    SC --> VS[verify_schema.py]
    R --> E[examples/]
    E --> EU[add_user_column.sql]
```

Resources are never loaded into the LLM context wholesale. They are executed in a sandboxed code environment, and only their outputs are read. This keeps the context window bounded even for skills that reference large reference files.

---

### Progressive Disclosure: Three Tiers of Loading

The architectural breakthrough of skills is not the markdown format — it is the **loading policy**.

| Tier | Content | Loaded When | Token Cost |
|------|---------|-------------|------------|
| **1. Metadata** | `name`, `description`, `tags` from YAML | Session startup | ~100 tokens per skill |
| **2. Instructions** | Full `SKILL.md` body | Skill triggered by query match | ~1K–5K tokens |
| **3. Resources** | Scripts, schemas, examples | Explicit execution request | Output-only; unbounded inputs stay in sandbox |

This three-tier model solves the context-window problem without requiring vector search or meta-tools. Instead of embedding tool descriptions and retrieving top-k, the agent builds a coarse keyword index at startup and lazily loads full instructions only when needed.

The trigger mechanism is simple: the agent compares the user's query against the skill descriptions. If overlap exceeds a threshold (exact keyword match, embedding similarity, or a lightweight classifier), the skill is activated. Multiple skills can activate simultaneously — they are composable. A query like "Deploy the new API and check the database" might activate both a `deploy-service` skill and a `database-healthcheck` skill.

This is **retrieval without a vector database**. The filesystem is the index. Directory names, file names, and YAML descriptions serve as an inverted index that the agent traverses at O(n) cost, where n is the number of skills. For typical projects with 10–50 skills, this is negligible. For monorepos with 500+ skills, a lightweight FAISS index over descriptions can supplement the filesystem scan — but in practice, most developers organize skills hierarchically (`database/`, `deploy/`, `test/`) and rely on path prefix filtering.

---

### Cross-Platform Adoption: The agentskills.io Standard

Anthropic published the Agent Skills specification as an open standard in December 2025. By mid-2026, the `agentskills.io` specification is supported across the major agent platforms:

| Platform | Skill Location | Auto-Discovery | Execution Sandbox |
|----------|---------------|----------------|-------------------|
| **Claude Code** | `.claude/skills/` (project), `~/.claude/skills/` (personal) | Yes, at session start | Secure VM |
| **OpenAI Codex CLI** | `.codex/skills/` | Yes | E2B / Modal sandbox |
| **Cursor** | `.cursor/skills/` | Yes | Local subprocess |
| **VS Code (Copilot)** | `.github/skills/` | On workspace open | Extension host |
| **JetBrains Junie** | `.junie/skills/` | Yes | IDE sandbox |
| **GitHub Copilot Workspace** | `.github/skills/` | Yes | GitHub Actions |

The standard is thin by design. It specifies only:

1. `SKILL.md` as the canonical filename.
2. YAML frontmatter with `name` and `description` as required fields.
3. Markdown body as imperative instructions.
4. Optional `scripts/` and `resources/` directories for bundled assets.

Everything else — sandboxing, auto-discovery heuristics, execution environments — is platform-specific. This thinness is what makes the standard portable. A skill written for Claude Code will work in Codex without modification, even though the two agents use different sandboxes and different LLM backends.

The `anthropics/skills` GitHub repository hosts the formal specification, reference implementations, and a curated gallery of community skills (creative writing, data analysis, infrastructure, document processing). The Superpowers framework (`obra/superpowers`), with 174,000+ stars, builds on this standard to enforce TDD, subagent-driven development, and systematic debugging workflows through skills.

---

### Skills and MCP: Complementary Layers

MCP and skills operate at different levels of abstraction. Understanding the boundary between them is essential for architecting production agents.

**MCP is the wire protocol.** It defines:
- How a server advertises its capabilities (`tools/list` JSON-RPC method).
- How a client invokes a tool (`tools/call` with JSON arguments).
- How resources and prompts are exposed.
- Transport: stdio for local servers, Streamable HTTP for remote.

**Skills are the presentation layer.** They define:
- How the agent reasons about which tools to use.
- The workflow and sequencing of multiple tool calls.
- Safety rules, guardrails, and human-in-the-loop checkpoints.
- Imperative instructions that augment the agent's system prompt.

A concrete example clarifies the relationship. Consider a PostgreSQL database exposed via an MCP server. The server advertises three tools: `query`, `migrate`, and `backup`. The MCP layer handles the transport: the agent knows these tools exist, knows their JSON schemas, and can call them.

But the agent does not know *how* to use them safely. That knowledge lives in a skill:

```markdown
## database-migration skill

1. Before any `migrate` call, invoke `backup` with `target: pre_migration`.
2. Run `migrate` inside a transaction by setting `atomic: true`.
3. After migration, run `query` with `sql: "SELECT COUNT(*) FROM schema_migrations"` to verify.
4. If verification fails, run `backup` with `target: restore` and `source: pre_migration`.
```

The skill orchestrates MCP tools. It does not replace them; it contextualizes them. Without the skill, the agent might call `migrate` without a backup. With the skill, the agent follows a safety workflow.

This layering is powerful because it separates concerns. The DBA team maintains the MCP server (transport, schemas, access control). The platform team maintains the skill (workflows, safety rules, best practices). The agent consumes both independently.

---

### OpenAI Tool Search: The API-Native Equivalent

While skills are filesystem-native, OpenAI's **tool search** (supported in `gpt-5.4` and later) provides an API-native equivalent for dynamic tool loading. The two approaches converge on the same goal — progressive disclosure — through different mechanisms.

OpenAI's deferred loading uses the `defer_loading: true` flag on tool definitions:

```json
{
  "type": "function",
  "function": {
    "name": "analytics_query",
    "description": "Run SQL against the analytics warehouse.",
    "parameters": { ... },
    "defer_loading": true,
    "namespace": "analytics"
  }
}
```

When the model encounters a query that might need analytics tools, it emits a `tool_search_call`. The application searches its tool registry, returns the relevant subset via `tool_search_output`, and the model loads only those tools for the remainder of the conversation. Dynamically loaded tools are injected at the end of the context window to preserve prefix caching.

**Comparison:**

| Dimension | Skills (Filesystem) | Tool Search (API) |
|-----------|---------------------|-------------------|
| Discovery mechanism | Directory scan + description matching | Model-issued `tool_search_call` |
| Loading trigger | Keyword overlap at session start | Model decides at turn time |
| Token cost | ~100 tokens/skill metadata at startup | Zero until triggered |
| Portability | Cross-platform standard | OpenAI-specific |
| Composability | Multiple skills activate simultaneously | Single namespace retrieved per call |
| Human visibility | Skill files are auditable in git | Tool registry is opaque to users |

The two models are not mutually exclusive. A production agent may use both: skills for local, human-auditable workflows (e.g., `deploy-service`, `run-tests`) and deferred tool search for remote, auto-generated tool registries (e.g., a CRM with 200 query endpoints that change weekly).

---

### Security: Skill Poisoning and Supply Chain

Skills introduce a supply chain risk that is distinct from, and in some ways more severe than, MCP server vulnerabilities. Because skills bundle imperative instructions, a malicious skill does not need to exploit a code injection vulnerability — it can simply instruct the agent to perform harmful actions.

**The MCPTox benchmark** (early 2026) demonstrated that hidden instructions embedded in skill descriptions achieve a 72.8% attack success rate against `o1-mini` when the agent is unconstrained. The attack vector is straightforward: a poisoned `SKILL.md` contains a description that appears benign but includes adversarial suffixes or invisible Unicode characters that override the agent's safety training.

**Defense layers** (cumulative, not alternative):

1. **Content scanning**: Parse `SKILL.md` with a dedicated classifier before loading. Anthropic's two-stage pipeline (fast regex heuristics + slow transformer classifier) catches 94% of poisoned skills with <50 ms latency.

2. **Provenance verification**: Skills should be signed. The `agentskills.io` specification recommends GPG-signed commits for skills in shared repositories. Platform-specific implementations (Claude Code plugins, VS Code extensions) validate signatures before activation.

3. **Sandboxed execution**: Bundled scripts in `scripts/` must never run outside a gVisor or Firecracker microVM. Even a "read-only" script can exfiltrate data via DNS timing. Sandboxing is non-negotiable.

4. **Permission scoping**: Skills should declare their required permissions in the YAML frontmatter:
   ```yaml
   permissions:
     - read: ./src
     - write: ./dist
     - exec: ./scripts/build.sh
   ```
   The agent framework enforces these scopes at the OS level using seccomp-bpf or Landlock LSM.

5. **Human approval gates**: Skills with `idempotent: false` or `permissions.write` should pause for explicit human approval before executing destructive operations. This mirrors the human-in-the-loop patterns we discuss in Chapter 48.

The OWASP Agentic Top 10 (2026) classifies skill poisoning as **ASI-04 (Supply Chain Compromise)** and **ASI-01 (Goal Hijacking)**. Chapter 47 covers the full security architecture; here, the key point is that skills are not merely convenience files — they are executable policy documents that must be treated with the same rigor as deployed code.

---

### Summary

- **Skills are the presentation layer above MCP.** MCP transports tool definitions; skills explain how to use them. The two are complementary and should be designed together in production systems.
- **The `SKILL.md` format** is a thin, portable standard: YAML metadata + imperative markdown instructions + optional bundled resources. Its power lies in progressive disclosure, not complexity.
- **Cross-platform adoption** (Claude Code, Codex, Cursor, VS Code, JetBrains) makes skills the de facto packaging standard for agent capabilities as of mid-2026.
- **OpenAI tool search** provides an API-native alternative to filesystem skills. Both solve progressive disclosure; the choice depends on whether your tools live in a git repository or a remote API registry.
- **Security is critical.** Skills bundle executable instructions, making skill poisoning a high-impact attack vector. Content scanning, provenance verification, sandboxed execution, permission scoping, and human approval gates are all required for production use.
