# Chapter 5: Memory and State Management

## Core Thesis
Memory is what separates a chatbot from an agent. Short-term memory is the context window; long-term memory requires vector stores, knowledge graphs, and episodic storage.

## Key References

### Vector Stores & Retrieval
- **Johnson et al. (2019)** — "Billion-Scale Similarity Search with GPUs". FAISS. https://arxiv.org/abs/1702.08734
- **Chroma** — https://www.trychroma.com/
- **Pinecone** — https://www.pinecone.io/
- **Qdrant** — https://qdrant.tech/
- **Weaviate** — https://weaviate.io/

### Knowledge Graphs
- **Hogan et al. (2021)** — "Knowledge Graphs". ACM Computing Surveys. https://arxiv.org/abs/2003.02320
- **Wikidata** — https://www.wikidata.org/
- **DBpedia** — https://www.dbpedia.org/

### Memory Architectures
- **Zhong et al. (2023)** — "MemoryBank: Enhancing LLMs with Long-Term Memory". https://arxiv.org/abs/2305.10250
- **Wu et al. (2022)** — "MemPrompt: Memory-assisted Prompt Editing". https://arxiv.org/abs/2201.06009

### Summarization
- **Lewis et al. (2020)** — "BART: Denoising Sequence-to-Sequence Pre-training". https://arxiv.org/abs/1910.13461
- **Touvron et al. (2023)** — LLaMA-based summarization strategies.

## Subtext & Nuance
- The context window is RAM: fast, limited, volatile. Vector stores are disk: slower, larger, persistent.
- Prompt caching / prefix caching (Anthropic, OpenAI) reduces redundant token costs by 90% for repeated prefixes.
- **MMR (Maximal Marginal Relevance)** balances relevance with diversity in retrieval — critical for avoiding "echo chamber" memory.
- Memory write policies: not everything should be stored. Importance scoring (e.g., from MemGPT) filters what gets persisted.
- Hybrid memory (vector + KG) is the frontier: vectors for semantic similarity, graphs for structured relationships.

## Implementation Notes
- FAISS is the go-to for local vector search. Use `IndexFlatIP` for exact search, `IndexIVFFlat` for approximate at scale.
- Chunking strategy matters more than embedding model choice for RAG quality. Semantic chunking > fixed-size chunking.
- Episodic memory stores: `(timestamp, query, response, outcome)` tuples. Retrieval by similarity to current query + recency weighting.

## Deprecated / Superseded
- Simple keyword search for agent memory — superseded by dense retrieval.
- Storing raw conversation logs without summarization — context window pressure makes this impractical.

## Cross-References
- **Previous**: Ch 4 (Tool Calling) — tool outputs feed into memory.
- **Next**: Ch 6 (ReAct Project) — implements basic memory.
- **Related**: Ch 36-38 (Memory deep dives) — vector, KG, episodic memory.
- **Related**: Ch 41 (Long-Term Memory Project) — three-tier memory system.
