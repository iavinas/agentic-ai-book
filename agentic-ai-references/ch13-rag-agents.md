# Chapter 13: RAG-Enhanced Agents

## Core Thesis
Retrieval is a tool, not just a pre-processing step. Agentic RAG iteratively retrieves, reads, and decides what to retrieve next.

## Key References

### RAG Foundations
- **Lewis et al. (2020)** — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks". https://arxiv.org/abs/2005.11401
- **Guu et al. (2020)** — "REALM: Retrieval-Augmented Language Model Pre-Training". https://arxiv.org/abs/2002.08909

### Agentic RAG
- **Trivedi et al. (2023)** — "Interleaving Retrieval with Chain-of-Thought Reasoning for Knowledge-Intensive Multi-Step Questions". https://arxiv.org/abs/2212.10509
- **Gao et al. (2023)** — "RAG-Fusion: Enhancing Retrieval-Augmented Generation". https://arxiv.org/abs/2402.03367
- **HyDE** — "Precise Zero-Shot Dense Retrieval without Relevance Labels". https://arxiv.org/abs/2212.10496

### Multi-Hop Retrieval
- **Yao et al. (2022)** — "ReAct" — iterative retrieval as part of the reasoning loop.
- **IterDRAG** — Iterative retrieval for complex queries.

### Embeddings & Vector Search
- **BGE** — BAAI General Embedding. https://github.com/FlagOpen/FlagEmbedding
- **E5** — Microsoft. https://arxiv.org/abs/2212.03533
- **Nomic Embed** — https://github.com/nomic-ai/nomic
- **text-embedding-3** — OpenAI. https://platform.openai.com/docs/guides/embeddings

## Subtext & Nuance
- Traditional RAG is static: retrieve once, then generate. Agentic RAG is dynamic: retrieve → read → decide → retrieve again.
- Query rewriting is the key skill: the agent reformulates queries based on intermediate findings. "What is the capital of France?" → after finding "Paris", might ask "What is the population of Paris?"
- Source attribution is critical for trust: the agent must cite which documents support which claims.
- HyDE (Hypothetical Document Embeddings): generate a hypothetical answer, then use it as the query for retrieval. Counter-intuitive but effective.
- Re-ranking with cross-encoders improves retrieval quality significantly but adds latency.

## Project Notes
- Agent with vector memory (FAISS + sentence embeddings).
- Multi-hop question answering on a curated corpus (e.g., Wikipedia subset on a topic).
- Evaluation: accuracy, citation accuracy, number of retrieval steps.
- Extensions: add knowledge graph integration for structured reasoning.

## Deprecated / Superseded
- Single-pass RAG (retrieve once, generate answer) — insufficient for complex multi-hop questions.
- BM25 as primary retrieval for semantic tasks — dense retrieval outperforms for semantic matching.

## Cross-References
- **Previous**: Ch 12 (OS Agents) — another domain.
- **Next**: Ch 14 (Visual Agents) — multimodal perception.
- **Related**: Ch 36 (Vector Memory) — deep dive into vector stores.
- **Related**: Ch 37 (Knowledge Graphs) — structured memory for RAG.
- **Related**: Ch 60 (Deep Research Project) — iterative web search + RAG.
