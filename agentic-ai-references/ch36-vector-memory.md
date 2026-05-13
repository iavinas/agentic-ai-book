# Chapter 36: Vector Memory and Semantic Retrieval

## Core Thesis
Dense retrieval maps text to vectors and finds nearest neighbors. Vector databases (FAISS, Chroma, Pinecone, Qdrant) are the infrastructure of agent memory.

## Key References

### Vector Search
- **Johnson et al. (2019)** — "Billion-Scale Similarity Search with GPUs" (FAISS). https://arxiv.org/abs/1702.08734
- **Malkov & Yashunin (2018)** — "Efficient and Robust Approximate Nearest Neighbor Search using Hierarchical Navigable Small World Graphs" (HNSW). https://arxiv.org/abs/1603.09320

### Embedding Models
- **BGE** — BAAI General Embedding. https://github.com/FlagOpen/FlagEmbedding
- **E5** — Microsoft. https://arxiv.org/abs/2212.03533
- **Nomic Embed** — https://github.com/nomic-ai/nomic
- **GTE** — Alibaba. https://arxiv.org/abs/2308.09681
- **text-embedding-3** — OpenAI. https://platform.openai.com/docs/guides/embeddings

### Vector Databases
- **Chroma** — https://www.trychroma.com/
- **Pinecone** — https://www.pinecone.io/
- **Qdrant** — https://qdrant.tech/
- **Weaviate** — https://weaviate.io/
- **Milvus** — https://milvus.io/

## Subtext & Nuance
- FAISS is the go-to for local development: IndexFlatIP (exact), IndexIVFFlat (approximate), IndexHNSW (graph-based).
- Chunking strategy matters more than embedding model choice. Semantic chunking (by sentence/paragraph boundaries) outperforms fixed-size chunking.
- Hybrid search (vector similarity + keyword matching) handles cases where semantic similarity fails (exact names, IDs, codes).
- Retrieval policies: recency-weighted (recent memories matter more), importance-weighted (significant events prioritized), context-aware (relevant to current task).
- Forgetting curves: simulate memory decay. Old, unimportant memories should fade.

## Cross-References
- **Previous**: Ch 35 (Evaluating Multi-Agent) — Part V begins.
- **Next**: Ch 37 (Knowledge Graphs) — structured memory.
- **Related**: Ch 5 (Memory Basics) — introduced vector memory.
- **Related**: Ch 41 (Long-Term Memory Project) — implements three-tier memory.
