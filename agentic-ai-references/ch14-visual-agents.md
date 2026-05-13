# Chapter 14: Agents with Visual Perception

## Core Thesis
Multimodal agents process images, documents, and UI screenshots as first-class observations. Vision transforms agents from text-only to world-grounded.

## Key References

### Vision-Language Models
- **OpenAI GPT-4V** — "The Dawn of LMMs: Preliminary Explorations with GPT-4V". https://arxiv.org/abs/2309.17421
- **Claude 3 (Opus/Sonnet/Haiku)** — Multimodal capabilities. https://www.anthropic.com/news/claude-3-family
- **Gemini** — Google's multimodal models. https://deepmind.google/technologies/gemini/
- **LLaVA** — "Visual Instruction Tuning". https://arxiv.org/abs/2304.08485
- **Qwen-VL** — Alibaba's vision-language model. https://github.com/QwenLM/Qwen-VL

### Visual Grounding
- **Shikra** — "Unleashing Multimodal LLM's Referential Dialogue Magic". https://arxiv.org/abs/2306.15195
- **Kosmos-2** — "Grounding Multimodal Large Language Models to the World". https://arxiv.org/abs/2306.14824

### UI Understanding
- **SeeClick** — "Improving GUI Grounding for Agent". https://arxiv.org/abs/2401.10935
- **CogAgent** — "A Visual Language Model for GUI Agents". https://arxiv.org/abs/2312.08914

## Subtext & Nuance
- Visual question answering (VQA) is the simplest form: "What's in this image?" Document understanding (PDFs, charts, tables) is more practical.
- UI understanding is the frontier: interpreting screenshots to navigate interfaces. This is how Claude Computer Use and Gemini work.
- Spatial reasoning is hard: "click the third button in the second row" requires precise grounding. Coordinate prediction (x, y) from screenshots is an active research area.
- Visual memory: storing and retrieving images as part of agent state. Not just text; the agent remembers what it saw.

## Project Notes
- Agent that processes uploaded images, answers questions, and takes actions based on visual input.
- Use a vision-enabled LLM API (GPT-4V, Claude 3, or local LLaVA via Ollama).
- Evaluation: visual reasoning benchmarks (e.g., custom VQA tasks).
- Can combine with Ch 11 (Browser Agent) for screenshot-based web navigation.

## Deprecated / Superseded
- Pure text-based agents for visual tasks — vision is now essential for real-world agents.
- OCR-only approaches (Tesseract) for document understanding — VLM-based approaches are far more robust.

## Cross-References
- **Previous**: Ch 13 (RAG Agents) — text-only retrieval.
- **Next**: Ch 15 (Training Single Agents) — training multimodal agents.
- **Related**: Ch 11 (Web Agents) — screenshot-based web navigation.
- **Related**: Ch 58 (Embodied Agents) — visual perception for robotics.
