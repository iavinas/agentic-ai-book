# Chapter 37: Knowledge Graphs for Structured Memory

## Core Thesis
Knowledge graphs store entities, relations, and triples as structured memory. They enable multi-hop reasoning that vector stores cannot.

## Key References

### KG Construction
- **Hogan et al. (2021)** — "Knowledge Graphs". ACM Computing Surveys. https://arxiv.org/abs/2003.02320
- **Yao et al. (2019)** — "AutoKG: Constructing Knowledge Graphs from Text". https://arxiv.org/abs/1906.XXXXX

### Entity & Relation Extraction
- **SpaCy** — Industrial-strength NLP. https://spacy.io/
- **Stanford OpenIE** — Open information extraction. https://nlp.stanford.edu/software/openie.html
- **Rebel** — Relation extraction by end-to-end language generation. https://github.com/Babelscape/rebel

### Graph Databases
- **Neo4j** — https://neo4j.com/
- **Amazon Neptune** — https://aws.amazon.com/neptune/
- **RDF/SPARQL** — W3C standards.
- **Cypher** — Neo4j query language.

### Entity Linking
- **Wikidata** — https://www.wikidata.org/
- **DBpedia** — https://www.dbpedia.org/
- **Entity linking surveys** — https://arxiv.org/abs/2001.XXXXX

## Subtext & Nuance
- KGs complement vector stores: vectors for semantic similarity, graphs for structured relationships. Hybrid systems use both.
- Entity extraction: identifying named entities (people, places, organizations) in text. Relation extraction: finding relationships between them.
- OpenIE extracts triples (subject, relation, object) without predefined schemas. This is scalable but noisy.
- Temporal knowledge graphs: facts with validity periods. "Barack Obama was president of the US (2009-2017)."
- Uncertainty in KGs: confidence scores for extracted facts. Not all facts are equally certain.
- Natural language to graph queries: translating "Who founded Apple?" to Cypher `MATCH (p:Person)-[:FOUNDED]->(c:Company {name:'Apple'}) RETURN p.name`.

## Cross-References
- **Previous**: Ch 36 (Vector Memory) — unstructured memory.
- **Next**: Ch 38 (Episodic Memory) — experience storage.
- **Related**: Ch 13 (RAG Agents) — KG-enhanced retrieval.
- **Related**: Ch 41 (Long-Term Memory Project) — KG as tier 3.
