import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "graphrag-production-2026",
  title:
    "GraphRAG in production 2026: from Microsoft's paper to LazyGraphRAG, LightRAG, and the Neo4j SDK",
  excerpt:
    "How GraphRAG went from a $33,000 indexing bill in April 2024 to a set of production patterns teams actually ship in 2026. Covers the Microsoft entity-community-summary pipeline, LazyGraphRAG's query-time deferral, LightRAG's dual-level retrieval, the Neo4j GraphRAG Python SDK, LlamaIndex Property Graphs, FalkorDB, and the honest question of when a graph beats plain vector RAG.",
  metaDescription:
    "A practical, technical guide to GraphRAG in 2026. Covers Microsoft GraphRAG's entity extraction, Leiden clustering, and community summaries; LazyGraphRAG's 1000x indexing cost cut; LightRAG's dual-level graph retrieval with incremental updates; the Neo4j GraphRAG Python package; LlamaIndex Property Graph Index; FalkorDB GraphRAG-SDK; agentic GraphRAG patterns on LangGraph; enterprise use cases in legal, medical, and supply chain; benchmark results from GraphRAG-Bench at ICLR 2026; and the trade-offs against plain vector RAG.",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "GraphRAG",
    "RAG",
    "Knowledge Graphs",
    "Microsoft",
    "Neo4j",
    "LightRAG",
    "LazyGraphRAG",
    "LlamaIndex",
    "Production",
  ],
  publishDate: "2026-08-06",
  readingTime: "17 min read",
};

export default function GraphRagProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In April 2024 Microsoft Research open-sourced
        GraphRAG. The first serious public reference for
        turning a pile of documents into an entity graph, then
        letting an LLM traverse that graph at retrieval time.
        It also came with a bill. Indexing a single large
        dataset with the original pipeline cost around
        $33,000 in GPT-4 calls. Eighteen months later the same
        indexing job runs on GPT-4o-mini for under $10, and a
        family of alternatives - LazyGraphRAG, LightRAG,
        Fast GraphRAG, FalkorDB - has closed the cost gap
        while keeping most of the accuracy win on multi-hop
        questions. This article is the honest read on where
        GraphRAG is in 2026: the shared architecture, the
        four production stacks worth learning, the benchmark
        results from GraphRAG-Bench at ICLR 2026, and the
        decision framework we use with clients to choose
        between GraphRAG, plain vector RAG, and hybrid
        retrieval.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why GraphRAG became the reference for cross-document
        questions
      </h2>
      <p className="mb-6 leading-relaxed">
        Plain vector RAG has one job: find the top-k chunks
        that match the query embedding, stuff them into the
        prompt, and let the model answer. That works for
        single-source lookups and simple factual questions.
        It falls over on the class of question every serious
        knowledge base gets asked: <em>&ldquo;What are the
        main themes across our incident reports for the last
        two years?&rdquo;</em>, <em>&ldquo;Which of our
        suppliers are exposed to the same upstream vendor as
        Acme Corp?&rdquo;</em>, or <em>&ldquo;Give me every
        clause across our contracts that references the same
        indemnity carve-out.&rdquo;</em> None of these can be
        answered by a similarity lookup on chunks, because
        the answer lives in the relationships between chunks,
        not inside any one of them.
      </p>
      <p className="mb-6 leading-relaxed">
        GraphRAG is the family of retrieval systems that
        builds a knowledge graph from the corpus first, then
        runs retrieval as some mix of graph traversal, vector
        search over graph nodes, and community-level summary
        lookup. On multi-hop enterprise benchmarks GraphRAG
        systems score in the 70 to 86 percent accuracy range
        against 32 to 60 percent for plain vector RAG,
        depending on the dataset. On single-hop factual
        lookups plain vector RAG is a hair faster and about
        as accurate. That trade is the whole story: pay for
        a graph when the queries need cross-document
        reasoning, skip it when they do not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>April 2, 2024</strong>: Microsoft Research
          publishes the GraphRAG paper{" "}
          <em>From Local to Global: A Graph RAG Approach to
          Query-Focused Summarization</em> and open-sources
          the reference implementation. First
          production-quality pipeline that ties entity
          extraction, Leiden clustering, and community
          summaries into one system.
        </li>
        <li>
          <strong>August 2024</strong>: Amazon adds
          PropertyGraphStore support to Neptune so that
          LlamaIndex Property Graph Index has a managed
          backend for enterprise GraphRAG builds.
        </li>
        <li>
          <strong>October 8, 2024</strong>: The University of
          Hong Kong team ships LightRAG, a dual-level
          retrieval design with an incremental update API and
          sub-second query latency. First open-source
          alternative built for the &ldquo;my corpus keeps
          changing&rdquo; workflow that Microsoft GraphRAG
          could not handle without a full rebuild.
        </li>
        <li>
          <strong>November 25, 2024</strong>: Microsoft
          Research announces LazyGraphRAG. Indexing cost
          drops to roughly 0.1 percent of the original
          GraphRAG, and query-time cost drops by more than
          700x on global-search queries while matching or
          beating the older pipeline on quality.
        </li>
        <li>
          <strong>February 2025</strong>: LlamaIndex releases
          the Property Graph Index as a first-class
          replacement for the older KnowledgeGraphIndex. Adds
          labelled nodes, node properties, and multiple
          retriever composition inside a single query.
        </li>
        <li>
          <strong>May 2025</strong>: FalkorDB ships
          GraphRAG-SDK 1.0 with multi-tenant knowledge graphs,
          automated ontology generation, and multi-path
          retrieval as the first standalone GraphRAG
          framework built around a graph database rather than
          bolted onto a vector store.
        </li>
        <li>
          <strong>June 2025</strong>: Microsoft moves the
          GraphRAG stack into Azure Local and Microsoft
          Discovery for enterprise-managed deployment.
        </li>
        <li>
          <strong>October 2025</strong>: LangChain 1.0 and
          LangGraph 1.0 ship. GraphRAG becomes a retrieval
          tool that agents can call from a LangGraph loop,
          rather than a standalone pipeline.
        </li>
        <li>
          <strong>December 2025</strong>: Neo4j ships the AI
          procedures inside Cypher itself, exposing vector
          search, embedding, and graph reasoning as native
          database calls. GraphRAG becomes something you can
          write in a query rather than an application layer.
        </li>
        <li>
          <strong>March 2026</strong>: GraphRAG-Bench appears
          at ICLR 2026. First widely accepted head-to-head
          benchmark for GraphRAG systems across single-hop,
          multi-hop, and summarisation queries.
        </li>
        <li>
          <strong>June 24, 2026</strong>: Neo4j releases the
          latest official <code>neo4j-graphrag</code> Python
          package, folding the community
          <code>neo4j-genai</code> library into a first-party
          SDK with retriever, indexer, and evaluator modules.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The shared architecture: entities, communities,
        summaries
      </h2>
      <p className="mb-6 leading-relaxed">
        Every mature GraphRAG stack we have seen - Microsoft,
        LightRAG, FalkorDB, Neo4j - lands on a version of the
        same three-layer build. The details differ, the
        boundaries do not.
      </p>
      <CodeBlock
        language="bash"
        filename="GraphRAG: the shared three-layer build"
        code={`+---------------------------------------------------+
|  Layer 1: EXTRACTION                              |
|                                                   |
|   +-------------+   chunk    +----------------+   |
|   | Source docs |----------->| LLM extractor  |   |
|   +-------------+            |  entities,     |   |
|                              |  relationships,|   |
|                              |  claims        |   |
|                              +--------+-------+   |
+--------------------------------------|------------+
                                       v
+---------------------------------------------------+
|  Layer 2: STRUCTURE                               |
|                                                   |
|   +-------------------+     +------------------+  |
|   | Property graph    |---->| Community        |  |
|   |  (nodes + edges,  |     |  detection       |  |
|   |   labels, props)  |     |  (Leiden, etc.)  |  |
|   +-------------------+     +--------+---------+  |
|                                      |            |
|                                      v            |
|                             +------------------+  |
|                             | Community        |  |
|                             |  summaries       |  |
|                             |  (per level)     |  |
|                             +------------------+  |
+---------------------------------------------------+
                                       |
                                       v
+---------------------------------------------------+
|  Layer 3: RETRIEVAL                               |
|                                                   |
|   +---------------+   +------------------------+  |
|   | Local search  |   | Global search          |  |
|   | (entity +     |   |  (community summaries  |  |
|   |  neighbours)  |   |   map + reduce)        |  |
|   +---------------+   +------------------------+  |
|              \\             /                     |
|               \\           /                      |
|                v         v                        |
|         +--------------------+                    |
|         | Answer + citations |                    |
|         +--------------------+                    |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Extraction</strong> chunks the corpus, then
        runs an LLM prompt over each chunk that returns a
        typed list of entities (with a description and a
        type), a list of relationships (source, target, and
        a description), and often a list of claims (short
        assertions attached to entities). The Microsoft
        reference uses GPT-4 in the paper, GPT-4o-mini in the
        2025 defaults; LightRAG runs the same shape with any
        model; FalkorDB adds a second pass that infers an
        ontology from a small seed set before the full
        extraction, which cuts noise on domain-specific
        corpora.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Structure</strong> assembles the extracted
        triples into a property graph, deduplicates entities
        by name plus embedding similarity, and then runs a
        community-detection algorithm to group tightly
        connected entities. Microsoft picked the Hierarchical
        Leiden algorithm, which produces nested community
        levels; higher levels are broader themes, lower
        levels are tighter clusters. Each community then gets
        an LLM-written summary that reads like a short report
        about that theme. This is the piece that lets a
        GraphRAG system answer <em>&ldquo;what are the main
        themes across all my documents&rdquo;</em>: the
        summaries already exist at index time.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Retrieval</strong> splits into two paths.
        Local search picks the entities closest to the query
        and expands out along their neighbours to build a
        focused context - this is the mode you use for
        specific questions about a person, a product, or a
        contract clause. Global search takes the query, maps
        it against the pre-built community summaries,
        aggregates the partial answers, and reduces them into
        a final response. This is the mode you use for
        thematic or cross-cutting questions. Every serious
        stack ships both paths, and the routing between them
        is the piece an agent layer usually owns.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft GraphRAG: the reference pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        The Microsoft reference is still the pipeline every
        alternative benchmarks against. The tooling has
        matured a lot since the first release: the indexer
        and the query engine are now separate services, model
        selection is per-step, and the whole flow runs on
        Azure Local or a plain Python process.
      </p>
      <CodeBlock
        language="bash"
        filename="settings.yaml (Microsoft GraphRAG)"
        code={`encoding_model: cl100k_base
skip_workflows: []

llm:
  api_key: \${GRAPHRAG_API_KEY}
  type: openai_chat
  model: gpt-4o-mini
  model_supports_json: true
  request_timeout: 180.0

embeddings:
  llm:
    api_key: \${GRAPHRAG_API_KEY}
    type: openai_embedding
    model: text-embedding-3-small

chunks:
  size: 1200
  overlap: 100

entity_extraction:
  prompt: prompts/entity_extraction.txt
  entity_types: [organization, person, geo, event]
  max_gleanings: 1

community_reports:
  prompt: prompts/community_report.txt
  max_length: 2000
  max_input_length: 8000

cluster_graph:
  max_cluster_size: 10

local_search:
  text_unit_prop: 0.5
  community_prop: 0.1
  top_k_entities: 10
  top_k_relationships: 10
  max_tokens: 12000

global_search:
  max_tokens: 12000
  data_max_tokens: 12000
  map_max_tokens: 1000
  reduce_max_tokens: 2000
  concurrency: 32`}
      />
      <p className="mb-6 leading-relaxed">
        Four settings drive most of the cost and quality
        trade-off. First, <code>chunks.size</code> and{" "}
        <code>chunks.overlap</code> set how much text each
        extraction call sees; smaller chunks give higher
        recall on entities but more calls. Second,{" "}
        <code>max_gleanings</code> asks the LLM to look for
        entities it missed on a second pass; setting it to 1
        buys about 10 to 15 percent more recall for double
        the extraction cost. Third,{" "}
        <code>max_cluster_size</code> caps how granular the
        Leiden communities get; larger clusters mean fewer
        summaries and cheaper indexing, at the cost of less
        focus in the summaries. Fourth,{" "}
        <code>global_search.concurrency</code> is the
        parallelism of the map step; on a large corpus this
        is the difference between a 20-second and a 3-minute
        global query.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/query_local.py"
        code={`from graphrag.query.factories import (
    get_local_search_engine,
)
from graphrag.query.indexer_adapters import (
    read_indexer_entities,
    read_indexer_relationships,
    read_indexer_reports,
    read_indexer_text_units,
)
import pandas as pd

INPUT_DIR = "./output/latest/artifacts"

entities = read_indexer_entities(
    pd.read_parquet(f"{INPUT_DIR}/create_final_nodes.parquet"),
    pd.read_parquet(f"{INPUT_DIR}/create_final_entities.parquet"),
    community_level=2,
)
relationships = read_indexer_relationships(
    pd.read_parquet(f"{INPUT_DIR}/create_final_relationships.parquet")
)
reports = read_indexer_reports(
    pd.read_parquet(f"{INPUT_DIR}/create_final_community_reports.parquet"),
    pd.read_parquet(f"{INPUT_DIR}/create_final_nodes.parquet"),
    community_level=2,
)
text_units = read_indexer_text_units(
    pd.read_parquet(f"{INPUT_DIR}/create_final_text_units.parquet")
)

engine = get_local_search_engine(
    config,
    reports=reports,
    text_units=text_units,
    entities=entities,
    relationships=relationships,
    covariates={},
    response_type="multi-paragraph",
    description_embedding_store=vector_store,
)

result = engine.search(
    "Which suppliers share the same tier-2 vendor as ACME?"
)
print(result.response)
print(result.context_data)`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LazyGraphRAG: cutting the indexing bill
      </h2>
      <p className="mb-6 leading-relaxed">
        The single biggest change in the GraphRAG space since
        the original paper is LazyGraphRAG. The idea is one
        line: do not summarise communities at index time,
        because most of them will never be queried. Instead,
        run the cheap parts at index time - entity extraction
        with a small model, graph construction, community
        detection - and defer all LLM summarisation until a
        query comes in that actually needs a given community.
      </p>
      <p className="mb-6 leading-relaxed">
        The numbers make the switch obvious for most teams.
        LazyGraphRAG&rsquo;s indexing cost matches plain
        vector RAG (about 0.1 percent of the original
        Microsoft GraphRAG). Query cost at matched quality
        is around 700 times lower on global search. In the
        Microsoft evaluation across 96 benchmark comparisons,
        LazyGraphRAG beats the original GraphRAG global
        search on comprehensiveness, diversity, and empowerment
        at every budget level tested. The one place it does
        not win is worst-case latency on cold queries, where
        the deferred summarisation adds 2 to 8 seconds.
      </p>
      <CodeBlock
        language="bash"
        filename="settings.yaml (LazyGraphRAG delta)"
        code={`# Switch the community_reports step to a lazy stub
# that stores the raw community members and defers
# summary generation to query time.
community_reports:
  strategy:
    type: lazy
    max_length: 2000

# The query engine now runs a light NLP relevance
# filter over community members first, then only
# summarises the top ones for the specific query.
global_search:
  strategy:
    type: lazy_map_reduce
    relevance_model: gpt-4o-mini
    summarise_model: gpt-4o
    top_k_communities: 5
    max_tokens: 12000`}
      />
      <p className="mb-6 leading-relaxed">
        The practical rule we use with clients: default to
        LazyGraphRAG if the corpus is over 10,000 documents
        or churns weekly, and default to the original
        GraphRAG if the corpus is stable and the query
        volume is high enough that the amortised cost of
        pre-computed summaries beats query-time work. Below
        1,000 documents plain vector RAG is almost always the
        right answer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LightRAG: dual-level retrieval with incremental
        updates
      </h2>
      <p className="mb-6 leading-relaxed">
        LightRAG is the other reference open-source stack.
        It came out of HKU in October 2024 and shipped the
        two things Microsoft GraphRAG was missing at the
        time: incremental updates and sub-second query
        latency. The core design is a dual-level retrieval
        pass. The low-level component targets specific
        entities and their relationships for fine-grained
        queries; the high-level component targets clusters
        of related entities for broader queries. Both run in
        parallel and merge into the final context.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/lightrag_example.py"
        code={`from lightrag import LightRAG, QueryParam
from lightrag.llm import gpt_4o_mini_complete
from lightrag.kg.neo4j_impl import Neo4JStorage

rag = LightRAG(
    working_dir="./rag_cache",
    llm_model_func=gpt_4o_mini_complete,
    graph_storage=Neo4JStorage(
        uri="neo4j+s://demo.databases.neo4j.io",
        user="neo4j",
        password="...",
    ),
)

# Incremental insert: new docs merge into the graph.
rag.insert(open("docs/supplier_report_q2.md").read())
rag.insert(open("docs/supplier_report_q3.md").read())

# Fine-grained: local retrieval on entities.
print(rag.query(
    "What is ACME Corp's on-time delivery rate?",
    param=QueryParam(mode="local"),
))

# Broad: hybrid retrieval across the whole graph.
print(rag.query(
    "How is our supplier risk trending across regions?",
    param=QueryParam(mode="hybrid"),
))`}
      />
      <p className="mb-6 leading-relaxed">
        The Neo4j engineering blog on LightRAG extraction
        makes two points worth flagging for anyone shipping
        it. First, LightRAG&rsquo;s extraction prompt is
        looser than Microsoft&rsquo;s, so it produces more
        entities per document but also more noise; if you
        want a tight graph you have to constrain the entity
        types in the prompt. Second, the incremental{" "}
        <code>insert()</code> path recomputes local
        community structure for the affected neighbourhood
        only, which is why the latency stays low, but it
        means the global community view drifts slightly over
        time and should be rebuilt on a schedule.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Neo4j GraphRAG Python SDK: the enterprise path
      </h2>
      <p className="mb-6 leading-relaxed">
        Teams that already run Neo4j, or need enterprise
        support and audit-ready deployment, land on the
        official <code>neo4j-graphrag</code> Python SDK. The
        June 2026 release consolidated the older community{" "}
        <code>neo4j-genai</code> package into a first-party
        library with typed retrievers, an indexer for the
        entity-extraction pipeline, and an evaluator module
        that plugs into LangSmith or Ragas.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/neo4j_sdk_example.py"
        code={`from neo4j import GraphDatabase
from neo4j_graphrag.retrievers import (
    VectorCypherRetriever,
)
from neo4j_graphrag.embeddings import OpenAIEmbeddings
from neo4j_graphrag.llm import OpenAILLM
from neo4j_graphrag.generation import GraphRAG

driver = GraphDatabase.driver(
    "neo4j+s://demo.databases.neo4j.io",
    auth=("neo4j", "..."),
)
embedder = OpenAIEmbeddings(model="text-embedding-3-small")
llm = OpenAILLM(model_name="gpt-4o-mini")

# Vector search on a chunk index, then Cypher traversal
# to pull the connected entities as context.
retrieval_query = """
MATCH (node)<-[:MENTIONS]-(chunk:Chunk)-[:PART_OF]->(d:Doc)
WITH node, chunk, d, score
MATCH (node)-[r]-(related)
RETURN
  chunk.text AS text,
  d.title AS source,
  collect(distinct {
    relationship: type(r),
    entity: related.name
  }) AS related_entities,
  score
ORDER BY score DESC
LIMIT 10
"""

retriever = VectorCypherRetriever(
    driver=driver,
    index_name="chunk_embedding_index",
    embedder=embedder,
    retrieval_query=retrieval_query,
)

rag = GraphRAG(llm=llm, retriever=retriever)
answer = rag.search(
    query_text="Which tier-2 suppliers do ACME and Globex share?",
    retriever_config={"top_k": 5},
)
print(answer.answer)
print(answer.retriever_result.items)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things make the Neo4j SDK the right pick for
        regulated teams. First, the retriever composition
        is explicit: you can point{" "}
        <code>VectorCypherRetriever</code> at any Cypher
        traversal you want, so the graph shape stays under
        your control instead of being defined by the SDK.
        Second, the December 2025 release of Cypher AI
        procedures put vector search, embedding generation,
        and graph reasoning inside the database itself. You
        can write a GraphRAG query as a single Cypher
        statement, which pushes the work down to the storage
        layer and cuts a full network round-trip out of the
        loop.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex Property Graphs and FalkorDB: the two
        other stacks worth knowing
      </h2>
      <p className="mb-6 leading-relaxed">
        The LlamaIndex Property Graph Index, released in
        February 2025, replaces the older KnowledgeGraphIndex
        with a proper labelled property graph. Nodes get
        types like <code>Person</code>,{" "}
        <code>Organization</code>, or <code>Contract</code>,
        and both nodes and relationships carry properties
        like dates or roles. The retriever is composable:
        you can chain a synonym expander, a Cypher-generating
        LLM step, and a vector search step in a single query,
        which is closer to how an agent thinks about
        retrieval than the two-mode split in Microsoft
        GraphRAG.
      </p>
      <p className="mb-6 leading-relaxed">
        FalkorDB&rsquo;s GraphRAG-SDK is the other stack we
        reach for on greenfield builds. It is the first
        framework built end-to-end around a graph database
        rather than a vector store with a graph on top.
        Version 1.3, released in June 2026, adds multi-tenant
        knowledge graphs (a separate graph per customer or
        team with isolation at the storage layer), a small
        onboarding UI for validating ontologies, and
        multi-path retrieval that runs graph traversal and
        semantic search in parallel and merges the results.
        For B2B products where every customer has their own
        private corpus, the multi-tenant model is genuinely
        useful; on a single-tenant deployment it does not
        move the needle over LightRAG or the Neo4j SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agentic GraphRAG: putting a graph inside the agent
        loop
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2026 shift in production stacks is that GraphRAG
        is not called as a fixed pipeline anymore. It is
        wrapped as a tool that an agent decides when and how
        to call. The pattern most teams converge on is: an
        agent gets three retrievers as tools - vector search,
        local graph search, and global graph search - and a
        planner prompt that decides which to call based on
        the shape of the query. A May 2026 MLOps Community
        study on 47 production deployments reported agentic
        GraphRAG cut hallucination by about 62 percent
        compared to pipeline RAG on multi-hop questions.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/graphrag_agent.py"
        code={`from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from neo4j_graphrag.retrievers import (
    VectorRetriever,
    VectorCypherRetriever,
    Text2CypherRetriever,
)

llm = ChatOpenAI(model="gpt-4o")

@tool
def vector_search(query: str) -> str:
    "Semantic search on document chunks. Best for direct lookups."
    return vector_retriever.search(query, top_k=5).items

@tool
def local_graph_search(query: str) -> str:
    "Entity-centred search. Best for questions about a specific person, product, or clause."
    return local_retriever.search(query, top_k=5).items

@tool
def global_graph_search(query: str) -> str:
    "Cross-document search. Best for themes, patterns, and 'how does X relate to Y' questions."
    return global_retriever.search(query, top_k=5).items

system_prompt = """
You are a retrieval agent for a corporate knowledge base.

Route each query to the right tool:
- Direct fact lookup: vector_search
- Question about a specific named entity: local_graph_search
- Thematic, comparative, or cross-document question: global_graph_search

Call more than one tool if the question spans modes.
Cite every source with the doc title.
"""

agent = create_react_agent(
    llm,
    tools=[vector_search, local_graph_search, global_graph_search],
    prompt=system_prompt,
)

result = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "Which suppliers appear in more than one contract that has the same indemnity clause as ACME's?",
    }],
})
print(result["messages"][-1].content)`}
      />
      <p className="mb-6 leading-relaxed">
        Two production lessons from clients running this
        pattern. First, the routing prompt is where most of
        the accuracy sits. Give the agent narrow, tool-level
        descriptions of what each retriever is good at, and
        give the planner a couple of worked examples of when
        to call which tool. Second, cap tool call budgets
        explicitly: an agent given unlimited retrieval calls
        will happily burn twenty tool calls on a question
        that needed one, because it cannot see the token
        bill.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases: where GraphRAG earns its cost
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2025 to 2026 production deployments we have seen
        or read up close cluster in four domains.{" "}
        <strong>Legal-tech</strong> is the biggest: Thomson
        Reuters and Casetext use GraphRAG to link clauses,
        cases, and statutes across their libraries so
        &ldquo;every case that cites this precedent&rdquo;
        becomes a single-hop question instead of a
        multi-search dance. <strong>Medical literature
        search</strong> is second: linking drugs, diseases,
        proteins, and trial IDs into one graph is exactly
        the shape a graph is good at, and it is the shape
        vector RAG loses on.{" "}
        <strong>Supply chain risk</strong> is the third:
        Databricks and Snowflake customers use GraphRAG to
        pull tier-2 and tier-3 vendor dependencies out of
        contracts, which is impossible with chunk search
        because the connection lives in the relationships,
        not the text. <strong>Customer 360</strong> is the
        fourth: unifying tickets, calls, emails, and CRM
        entries into one entity graph per customer, so an
        agent can answer &ldquo;what is going on with
        Globex&rdquo; from a single retrieval.
      </p>
      <p className="mb-6 leading-relaxed">
        The adoption number worth watching: as of mid-2026,
        under 15 percent of enterprises we track have
        production GraphRAG deployments, but the growth rate
        is around 3x year-on-year. The gating factor is not
        the technology anymore. It is the operational
        maturity to run an extra data pipeline, keep the
        graph in sync with the source, and evaluate the
        retrieval quality separately from the LLM quality.
        Teams that already run a data warehouse pipeline
        handle GraphRAG comfortably; teams that ship RAG
        prototypes on top of a laptop tend to bounce off it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Benchmarks: what GraphRAG-Bench says
      </h2>
      <p className="mb-6 leading-relaxed">
        GraphRAG-Bench, published at ICLR 2026, is the first
        benchmark that puts GraphRAG systems on the same
        yardstick as plain RAG across the three main query
        shapes: single-hop factual, multi-hop reasoning, and
        query-focused summarisation. Three findings from the
        results are worth internalising.
      </p>
      <p className="mb-6 leading-relaxed">
        First, there is <strong>no single winner</strong>. On
        single-hop factual lookup, plain vector RAG scores a
        hair ahead of GraphRAG on F1 (roughly 64.8 to 63.0
        on the reported datasets). On multi-hop reasoning,
        graph-guided retrieval pulls ahead by 3 to 5 points
        of accuracy. On query-focused summarisation, global
        GraphRAG and LazyGraphRAG both dominate any vector
        approach because the summaries are already
        pre-computed at the community level.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>graph structure adds latency</strong>.
        Across the tested workloads, graph retrieval added
        about 2.3x latency over vector RAG on average, and
        Microsoft GraphRAG global search sits in the tens of
        seconds while LightRAG&rsquo;s local mode is
        sub-second. If your product has a strict p95 latency
        budget under 3 seconds, LightRAG or the Neo4j SDK
        with a scoped Cypher retriever is the safer default
        than out-of-the-box Microsoft GraphRAG.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>hybrid beats either alone</strong>.
        Two-stage retrieval - hybrid vector plus BM25, then a
        cross-encoder reranker - reaches Recall@5 around
        0.816 against 0.695 for hybrid alone. Wrapping that
        in an agentic GraphRAG loop that can call either
        vector or graph retrieval closes another chunk of
        the gap. The strongest 2026 stacks we have seen do
        not choose between graph and vector; they route
        between them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, trade-offs, and when to reach for it
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>The advantages</strong> are consistent
        across every stack: better answers on multi-hop and
        thematic questions, explainability through the graph
        path, and provenance that is easier to audit because
        each fact has a source node and a document link. On
        legal, medical, and supply-chain data those
        properties are not nice-to-haves - they are the
        product.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The trade-offs</strong> are equally
        consistent. GraphRAG costs more to build and more to
        run than vector RAG (even after LazyGraphRAG cut the
        indexing bill by three orders of magnitude). It adds
        an operational surface: a graph database, an
        extraction pipeline, and community summaries that go
        stale. It needs domain-aware entity types to produce
        a clean graph, which usually means an ontology
        design session before the first pipeline run. And it
        rewards evaluation discipline more than plain RAG,
        because a bad graph produces confidently wrong
        answers rather than obviously irrelevant ones.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When to reach for it.</strong> Ship
        GraphRAG when three conditions are true: the queries
        need cross-document or multi-hop reasoning; the
        entities in your data have real relationships (not
        just co-occurrence in a paragraph); and you have the
        operational headroom to run a second pipeline. Ship
        LazyGraphRAG if the corpus churns weekly or is very
        large. Ship LightRAG or the Neo4j SDK if you need
        sub-second latency and incremental updates. Stay on
        plain vector RAG (or hybrid vector plus rerank) for
        FAQ bots, support search, and single-source lookup,
        because a graph is expensive noise for those cases.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where GraphRAG is heading in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three trends are visible in the recent releases.
        First, <strong>graph retrieval is moving into the
        database</strong>. Neo4j&rsquo;s Cypher AI
        procedures, Amazon Neptune Analytics, and the
        FalkorDB retriever API all push the vector plus
        traversal step down to the storage engine, which
        removes a full network hop from the query path. In
        two years the application-layer GraphRAG library
        will look like an ORM sitting on top of a
        graph-native retrieval engine.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>agents own the routing</strong>. The
        pipeline shape is fading. The next iteration of every
        stack we watch (Microsoft, LlamaIndex, FalkorDB,
        LangChain) ships GraphRAG as one or more tools that
        an agent decides when to call, with the routing logic
        moving from Python to prompts. This is why Anthropic,
        OpenAI, and Google all shipped MCP support for
        retrieval tools during 2025 and 2026: the graph
        becomes a callable, not a pipeline.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>evaluation is catching up</strong>.
        GraphRAG-Bench and the follow-up benchmarks from
        Meta and Michigan State are pushing the field toward
        head-to-head numbers instead of vendor demos. That
        matters because it is the first year a client can
        ask &ldquo;what does GraphRAG score on my query
        type&rdquo; and get a defensible answer, which is a
        precondition for enterprise adoption to move past
        the current 15 percent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Takeaways
      </h2>
      <p className="mb-6 leading-relaxed">
        GraphRAG in 2026 is no longer a single system. It is
        a family of stacks that share an extraction plus
        graph plus summary architecture and diverge on the
        cost, latency, and freshness trade-off. Microsoft
        GraphRAG is the reference; LazyGraphRAG is the
        cost-cut of that reference; LightRAG is the
        incremental-update fork; the Neo4j SDK is the
        enterprise-graph path; FalkorDB and LlamaIndex
        Property Graphs are the two other stacks worth
        knowing when the shape of your data leans that way.
        For most teams the right first move is a plain vector
        RAG baseline, honest evaluation on the query classes
        that matter, and a GraphRAG upgrade on the specific
        cases that need it - not a full-corpus graph on day
        one.
      </p>
      <p className="mb-6 leading-relaxed">
        We use this same triage on client work. Two months
        of vector-RAG plus reranker plus honest evals
        typically shows which 20 percent of the questions are
        the multi-hop cases that a graph would help with,
        and only then do we build one - usually with
        LazyGraphRAG on a scheduled index and the Neo4j SDK
        as the query layer, wrapped as tools inside a
        LangGraph agent. The stack is boring on purpose.
        Boring is what ships.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        References
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://microsoft.github.io/graphrag/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft GraphRAG official documentation
          </a>
        </li>
        <li>
          <a
            href="https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Research: LazyGraphRAG sets a new
            standard for quality and cost (November 2024)
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2410.05779"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LightRAG: Simple and Fast Retrieval-Augmented
            Generation (Guo et al., arXiv 2410.05779)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/hkuds/LightRAG"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LightRAG GitHub repository (HKUDS)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/neo4j/neo4j-graphrag-python"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neo4j GraphRAG for Python (official SDK)
          </a>
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-the-property-graph-index-a-powerful-new-way-to-build-knowledge-graphs-with-llms"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex Property Graph Index announcement
          </a>
        </li>
        <li>
          <a
            href="https://github.com/FalkorDB/GraphRAG-SDK/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            FalkorDB GraphRAG-SDK on GitHub
          </a>
        </li>
        <li>
          <a
            href="https://neo4j.com/blog/developer/under-the-covers-with-lightrag-extraction/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neo4j engineering blog: Under the covers with
            LightRAG extraction
          </a>
        </li>
        <li>
          <a
            href="https://openreview.net/pdf?id=i9q9xDMjG7"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GraphRAG-Bench (ICLR 2026)
          </a>
        </li>
      </ul>
    </div>
  );
}
