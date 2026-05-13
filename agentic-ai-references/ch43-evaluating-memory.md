# Chapter 43: Evaluating Memory and Learning

## Core Thesis
Memory evaluation measures recall accuracy, precision, consolidation, and forgetting. Long-context vs. retrieval-augmented trade-offs are central.

## Key References

### Memory Benchmarks
- **ALFWorld** — Embodied tasks with partial observability. https://alfworld.github.io/
- **WebShop** — E-commerce tasks requiring search and comparison. https://webshop.pdl.cmu.edu/
- **ScienceWorld** — Scientific experimentation tasks. https://scienceworld.github.io/
- **ScrollS** — Long-document understanding. https://arxiv.org/abs/2301.XXXXX
- **RULER** — Long-context benchmark. https://arxiv.org/abs/2404.06654
- **Needle in a Haystack (NIAH)** — Classic long-context test.

### Continual Learning Benchmarks
- **Permuted MNIST / Split CIFAR** — Classic continual learning.
- **StreamingQA** — Question answering with evolving knowledge.

### Metrics
- **Recall accuracy** — Retrieving the right memory at the right time.
- **Precision** — Retrieved memories are relevant.
- **Backward transfer** — Learning new tasks improves old ones.

## Subtext & Nuance
- Long-context vs. retrieval-augmented is a fundamental trade-off: context extension is simpler but more expensive; retrieval adds latency and infrastructure.
- Needle in a Haystack: place a specific fact in a long document, ask the model to retrieve it. Tests attention quality over long spans.
- RULER (2024) provides a comprehensive long-context benchmark with multiple task types (retrieval, aggregation, reasoning).
- Memory consolidation evaluation: does the agent preserve important information? Test by querying old facts after new learning.
- Forgetting curves: plot recall accuracy vs. time since storage. Should decay for unimportant items, stay flat for important ones.

## Cross-References
- **Previous**: Ch 42 (Training Memory Agents) — evaluating trained systems.
- **Next**: Ch 44 (Frameworks Landscape) — Part VI begins.
- **Related**: Ch 16 (Evaluating Single Agents) — general evaluation.
- **Related**: Ch 26 (Evaluating Planning) — reasoning evaluation.
