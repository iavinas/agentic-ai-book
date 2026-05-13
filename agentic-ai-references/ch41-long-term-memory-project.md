# Chapter 41: Project — Building a Long-Term Memory Agent

## Core Thesis
A three-tier memory system: short-term (context + summarization), vector (FAISS + embeddings), and knowledge graph (entities + relations). The capstone project of Part V.

## Key References

### Memory Systems
- **MemGPT** — "Towards LLMs as Operating Systems". https://arxiv.org/abs/2310.08560
- **MemoryBank** — https://arxiv.org/abs/2305.10250
- **Zep** — Long-term memory for AI assistants. https://www.getzep.com/

### Vector + KG Hybrid
- **RAG + KG** — Combining dense retrieval with graph traversal.
- **GraphRAG** — Microsoft. https://arxiv.org/abs/2404.16130

## Subtext & Nuance
- Tier 1 (Short-term): context window + summarization. Compress old context into summaries to make room.
- Tier 2 (Vector): FAISS + sentence embeddings for semantic retrieval. Retrieve relevant past conversations.
- Tier 3 (KG): Extracted entities and relations from conversations. Enable structured queries like "What did we discuss about neural networks?"
- Memory writer: decides what to store after each interaction. Importance scoring filters noise.
- Memory retriever: combines recency, relevance, and importance. Weighted combination of scores.
- Procedural memory: extract reusable skills from successful interactions. e.g., "When asked about X, do Y."

## Implementation Notes
- Pure Python. FAISS for vectors. NetworkX or simple dicts for KG.
- Memory writer: after each turn, extract entities, relations, and summary. Store in appropriate tier.
- Memory retriever: query → embed → FAISS search → KG traversal → combine results → inject into context.
- Episodic storage: `(timestamp, query, response, outcome, embedding, entities)`

## Evaluation
- Conversation continuity: can the agent recall facts from earlier?
- Cross-session memory: does it remember across separate sessions?
- Memory accuracy: is retrieved information correct?
- Forgetting curve: does old, unimportant information decay?

## Cross-References
- **Previous**: Ch 36-40 (All of Part V) — theory leading to this project.
- **Next**: Ch 42 (Training Memory Agents) — training the retrieval system.
- **Related**: Ch 5 (Memory Basics) — introduced the concepts.
- **Related**: Ch 13 (RAG Agents) — retrieval as a tool.
