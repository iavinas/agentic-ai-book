# Agentic AI: Building, Training, and Deploying Autonomous Systems

A comprehensive hands-on technical book covering autonomous AI agents from first principles through production deployment (2025–2026). Every core concept is implemented in **pure Python** with zero frameworks. Spanning **68 chapters** across **8 Parts** with **12+ hands-on projects** and **10+ evaluation chapters**.

**Read the book**: [iavinas.github.io/agentic-ai-book](https://iavinas.github.io/agentic-ai-book/)

---

## What You'll Learn

| Part | Focus | Chapters |
|------|-------|----------|
| I | Foundations of Agency | 1–7 |
| II | Single-Agent Systems | 8–17 |
| III | Planning & Test-Time Reasoning | 18–26 |
| IV | Multi-Agent Systems | 27–35 |
| V | Memory, Learning, Adaptation | 36–43 |
| VI | Production Infrastructure | 44–52 |
| VII | Specialized Domains | 53–60 |
| VIII | Safety, Alignment, Future | 61–68 |

**Total**: ~850+ estimated pages | 12+ hands-on projects | 10+ evaluation chapters

---

## Prerequisites

- Python 3.11+
- PyTorch
- No heavy frameworks required

---

## Project Structure

```
agentic-ai-book/
├── _config.yml                # Jekyll / GitHub Pages configuration
├── _layouts/                  # HTML layouts (base, chapter nav)
├── index.md                   # Table of contents
├── chapters/                  # 68 chapter files (ch01.md - ch68.md)
├── appendices/                # 5 appendices (A-E)
├── agentic-ai-references/     # Per-chapter reference files
└── assets/                    # Static assets
```

---

## Contributing

See `CLAUDE.md` for chapter writing guidelines and conventions.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/iavinas/agentic-ai-book.git
cd agentic-ai-book

# Serve locally with Jekyll
jekyll serve
```

### Writing a Chapter

See `CLAUDE.md` and `.claude/skills/` for writing and review protocols.

```bash
# Generate raw markdown assets for GitHub Pages
./scripts/copy-raw-markdown.sh
```

---

## License

[MIT License](LICENSE) — free to modify and reuse.

---

*Last updated: June 2026*