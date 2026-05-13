# Chapter 60: Project — Building a Deep Research Agent

## Core Thesis
Iterative web search, synthesis, and citation. Research Planner → Web Searcher → Synthesizer → Citation Manager. The capstone project of Part VII.

## Key References

### Deep Research
- **OpenAI Deep Research** (Feb 2025) — https://openai.com/index/introducing-deep-research/
- **Gemini Deep Research** — https://deepmind.google/models/gemini/
- **Perplexity** — https://www.perplexity.ai/
- **Elicit** — https://elicit.org/

### Architecture
- **Research Planner** — Decides what to search for next.
- **Web Searcher** — Executes searches, extracts content.
- **Synthesizer** — Combines information from multiple sources.
- **Citation Manager** — Attributes claims to specific sources.

## Subtext & Nuance
- Iterative search is the key: don't search once and answer. Search → read → decide what to search next → repeat.
- Synthesis requires deduplication: multiple sources may say the same thing. The agent must merge them, not just list them.
- Citation accuracy is critical for trust: every claim must be traceable to a source. Hallucinated citations destroy credibility.
- Vector memory stores found information for retrieval during synthesis.
- Knowledge graph tracks entities and relationships across sources, enabling structured reasoning.

## Implementation Notes
- Pure Python with web search API (SerpAPI, Bing API, or DuckDuckGo).
- Vector memory (FAISS) for storing article snippets.
- Knowledge graph (NetworkX) for tracking entities and their relationships across sources.
- Evaluation: accuracy, citation correctness, comprehensiveness.

## Cross-References
- **Previous**: Ch 53-59 (All of Part VII) — domain knowledge leading to this project.
- **Next**: Ch 61 (Alignment) — Part VIII begins.
- **Related**: Ch 13 (RAG Agents) — iterative retrieval.
- **Related**: Ch 11 (Web Agents) — browser automation for research.
