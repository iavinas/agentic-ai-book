# Appendix E: Project Setup and Environment

## Development Environment

### Python
- **Python 3.11+** required.
- **uv** (recommended) or **pip** for package management.
- **Virtual environment** — `python -m venv .venv`

### Core Dependencies
```bash
pip install torch numpy pandas requests
pip install openai anthropic  # API clients
pip faiss-cpu  # Vector search (or faiss-gpu)
pip install chromadb  # Alternative vector DB
pip install networkx  # Knowledge graphs
pip install playwright  # Browser automation
pip install pytest  # Testing
```

### Docker
- **Docker Desktop** — https://www.docker.com/products/docker-desktop/
- Used for sandboxing agent tool execution.

### API Keys
- **OpenAI** — https://platform.openai.com/
- **Anthropic** — https://console.anthropic.com/
- **SerpAPI** — For web search in projects. https://serpapi.com/
- **Optional: local LLM** — Ollama (https://ollama.com/) or vLLM (https://github.com/vllm-project/vllm)

### Vector DB Setup
- **FAISS** — Local, no server. `pip install faiss-cpu`.
- **Chroma** — Local with persistence. `pip install chromadb`.
- **Pinecone** — Cloud. Sign up at https://www.pinecone.io/.

### MCP Server Installation
- **MCP SDK** — `pip install mcp`
- **Official servers** — https://github.com/modelcontextprotocol/servers
- **Configuration** — `claude_desktop_config.json` or equivalent.

### Git Setup
- **Git** — https://git-scm.com/
- **GitHub account** — For SWE agent project.

### Hardware Requirements
- **Minimum** — 8GB RAM, any modern CPU.
- **Recommended** — 16GB RAM, GPU for local LLMs.
- **For training projects** — GPU with 24GB+ VRAM (or use cloud: Lambda, RunPod, Vast.ai).

## Cross-References
- Referenced in all project chapters (Ch 6, 11, 12, 13, 14, 20, 25, 33, 41, 45, 53, 60).
