# Chapter 42: Training Memory-Augmented Agents

## Core Thesis
Training the retriever and generator jointly optimizes the full RAG pipeline. RL can train agents to know when to retrieve vs. rely on parametric knowledge.

## Key References

### RAG Training
- **Lewis et al. (2020)** — "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks". https://arxiv.org/abs/2005.11401
- **Izacard et al. (2022)** — "Few-Shot Learning with Retrieval Augmented Language Models". https://arxiv.org/abs/2208.03299

### Dense Passage Retrieval
- **Karpukhin et al. (2020)** — "Dense Passage Retrieval for Open-Domain Question Answering". https://arxiv.org/abs/2004.04906
- **Contrastive loss with hard negatives**.

### RL for Memory Access
- **Rewarding retrieval** — Positive reward for retrieving useful information.
- **Penalizing irrelevant retrieval** — Negative reward for wasting retrieval calls.
- **When to retrieve** — Training the agent to know when parametric knowledge is insufficient.

## Subtext & Nuance
- End-to-end training of the full RAG pipeline (retriever + generator) outperforms training them separately, but is harder to optimize.
- Dense passage retrieval uses contrastive learning: push query and relevant passage close together in embedding space; push irrelevant passages far apart.
- Hard negatives are critical: use a BM25 retriever to find "almost relevant" passages that the model currently confuses with the true answer.
- RL for memory access: the agent receives reward for retrieving information that leads to correct answers, and penalty for unnecessary retrievals.
- Memory access as an action in the RL framework: the agent chooses to retrieve (with a query) or not retrieve (rely on parametric knowledge).

## Cross-References
- **Previous**: Ch 41 (Long-Term Memory Project) — the system being trained.
- **Next**: Ch 43 (Evaluating Memory) — measuring training success.
- **Related**: Ch 15 (Training Single Agents) — RL foundations.
- **Related**: Ch 36 (Vector Memory) — retriever architecture.
