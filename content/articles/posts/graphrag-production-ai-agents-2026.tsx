import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "graphrag-production-ai-agents-2026",
  title:
    "GraphRAG in production 2026: knowledge graphs for AI agents beyond vector search",
  excerpt:
    "How GraphRAG went from a research paper in early 2024 to the reference retrieval pattern for enterprise AI agents in 2026. Covers Microsoft GraphRAG, LazyGraphRAG, LightRAG, the Neo4j GraphRAG Python SDK, LlamaIndex Property Graphs, and the honest trade-offs against plain vector RAG on cost, latency, and answer quality.",
  metaDescription:
    "A practical, technical guide to GraphRAG in 2026. Explains the index and query pipelines behind Microsoft GraphRAG, LazyGraphRAG, and LightRAG, walks through the Neo4j GraphRAG Python SDK and LangChain integration, shows a LlamaIndex Property Graph example, and covers hybrid vector plus graph retrieval, prompt-injection risks, cost trade-offs, and enterprise use cases in pharma, finance, and legal.",
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
    "Knowledge Graph",
    "Neo4j",
    "Microsoft",
    "LangChain",
    "LlamaIndex",
    "RAG",
    "Production",
  ],
  publishDate: "2026-08-18",
  readingTime: "17 min read",
};

export default function GraphRagProductionAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Vector search alone stopped being enough about a year
        ago. The teams we work with kept hitting the same wall:
        the top-k chunks come back, the answer sounds fine, but
        the model cannot connect the dots across documents. Ask
        it to compare two contracts, trace a supply chain, or
        summarise what a whole folder of research papers says
        together, and it falls apart. GraphRAG is the pattern
        that fixed that for us. This article covers what
        GraphRAG actually is in 2026, how Microsoft, Neo4j, and
        the open-source community landed on a shared
        architecture, and how to ship it without spending
        thirty thousand dollars to index a single corpus.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why GraphRAG matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Plain vector RAG works by chopping text into chunks,
        embedding them, and returning the closest matches to a
        user question. It is fast, cheap, and covers a huge
        range of use cases. What it cannot do is reason about
        how things relate. When a question needs the system to
        combine facts from ten pages, five documents, and a
        table nobody thought to embed, top-k similarity search
        gives you a shallow answer or a hallucination.
      </p>
      <p className="mb-6 leading-relaxed">
        GraphRAG treats the corpus as a graph of entities and
        relationships instead of a bag of chunks. An LLM reads
        the raw text once, extracts people, companies, drugs,
        contracts, or whatever entities matter, and writes them
        into a knowledge graph. Retrieval then walks that graph
        as well as the vector index. The difference shows up
        most on questions where the answer is not in any single
        chunk, but in the shape of the relationships. Microsoft
        Research called this the difference between local
        questions and global questions, and it is the frame
        most of the industry now uses.
      </p>
      <p className="mb-6 leading-relaxed">
        The market caught up fast. Improvado reports the
        enterprise knowledge graph market reached 3.47 billion
        dollars in 2026 and is growing at 21% a year through
        2033. Neo4j, TigerGraph, Amazon Neptune, and Memgraph
        all shipped GraphRAG SDKs in 2025. LangChain and
        LlamaIndex made graph retrieval a first-class citizen
        in the same window. Microsoft rolled the pattern into
        its Discovery product for scientific research. If you
        are building an agent that has to reason across a real
        enterprise knowledge base, GraphRAG is no longer the
        experimental option.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What GraphRAG actually is
      </h2>
      <p className="mb-6 leading-relaxed">
        The Microsoft Research paper that started the current
        wave came out in April 2024, followed by an open-source
        release in July 2024. The pattern it described has two
        pipelines: an indexing pipeline that builds the graph,
        and a query pipeline that walks it. Every serious
        implementation since (Neo4j, LlamaIndex, LightRAG,
        Fast GraphRAG, Nano-GraphRAG) has kept the same shape,
        even when they cut steps out to save money.
      </p>
      <CodeBlock
        language="bash"
        filename="GraphRAG: the shared two-pipeline architecture"
        code={`+------------------------------------------------------------+
|  INDEX  (runs once per corpus, refreshed on updates)       |
|                                                            |
|  raw docs                                                  |
|     |                                                      |
|     v                                                      |
|  +----------+   +-----------------+   +------------------+ |
|  | Chunker  |-->| Entity + rel.   |-->| Graph store      | |
|  |          |   | extractor (LLM) |   |  (Neo4j, Kuzu,   | |
|  +----------+   +-----------------+   |   Memgraph, ...) | |
|                          |            +------------------+ |
|                          v                     |           |
|                 +------------------+           |           |
|                 | Community detect |<----------+           |
|                 |  (Leiden)        |                       |
|                 +---------+--------+                       |
|                           |                                |
|                           v                                |
|                 +------------------+                       |
|                 | Community        |                       |
|                 | summariser (LLM) |                       |
|                 +------------------+                       |
+------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------+
|  QUERY  (runs per user question)                           |
|                                                            |
|   +----------------+                                       |
|   | User question  |                                       |
|   +--------+-------+                                       |
|            |                                               |
|            v                                               |
|   +--------------------+   +--------------------+          |
|   | Local search       |   | Global search      |          |
|   |  (entity + neigh.) |   |  (community summ.) |          |
|   +---------+----------+   +----------+---------+          |
|             \\                        /                    |
|              \\                      /                     |
|               v                    v                       |
|            +-----------------------------+                 |
|            | Answer generator (LLM)      |                 |
|            +-----------------------------+                 |
+------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The index step is where the cost lives. An LLM reads
        every chunk, pulls out entities and the relationships
        between them, and writes the triples into a graph
        store. A community detection algorithm (Leiden in the
        original Microsoft paper) clusters the graph into
        themed groups. Another LLM pass writes a plain-text
        summary of each community. Those summaries are what
        make global questions work.
      </p>
      <p className="mb-6 leading-relaxed">
        The query step picks between two modes. Local search
        answers questions about a specific entity by pulling
        that entity, its immediate neighbours, and the chunks
        that mention them. Global search answers questions
        about the whole corpus by feeding the community
        summaries to the model. A modern implementation runs a
        small classifier or a router prompt in front of both
        and picks whichever mode fits the question, or blends
        the two with a vector search for good measure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>April 2024</strong>: Microsoft Research
          publishes the GraphRAG paper. First time the local
          vs global framing goes public. The original run
          cost roughly 33,000 dollars to index a large
          corpus.
        </li>
        <li>
          <strong>July 2, 2024</strong>: Microsoft
          open-sources the{" "}
          <code>microsoft/graphrag</code> repo. Community
          adoption starts almost the same week.
        </li>
        <li>
          <strong>October 2024</strong>: The HKU team
          publishes LightRAG, a dual-level retrieval variant
          that trims the community summarisation step and
          drops the cost by orders of magnitude.
        </li>
        <li>
          <strong>November 2024</strong>: Microsoft Research
          announces LazyGraphRAG. It defers all community
          summarisation to query time and matches full
          GraphRAG quality at a fraction of the index cost.
        </li>
        <li>
          <strong>Q1 2025</strong>: Neo4j ships the{" "}
          <code>neo4j-graphrag</code> Python SDK, purpose-built
          for GraphRAG workflows with vector search, graph
          traversal, and text-to-Cypher in one package.
        </li>
        <li>
          <strong>Q2 2025</strong>: LlamaIndex adds
          Property Graph support as a first-class index type,
          alongside its VectorStoreIndex.
        </li>
        <li>
          <strong>June 2025</strong>: The paper{" "}
          <em>When to use Graphs in RAG</em> lands on arXiv,
          benchmarking eight GraphRAG variants across four
          domains and setting the current reference for when
          the pattern actually beats vector RAG.
        </li>
        <li>
          <strong>Q4 2025</strong>: LazyGraphRAG rolls into
          Azure Local as a public preview and into Microsoft
          Discovery, the agent platform for scientific
          research.
        </li>
        <li>
          <strong>January 2026</strong>: Neo4j 2026.01 lands
          with automatic in-index filtering for vector
          search, closing the last big performance gap
          between graph-native vector search and dedicated
          vector databases.
        </li>
        <li>
          <strong>H1 2026</strong>: Every major agent
          framework (LangGraph, Mastra, CrewAI, the OpenAI
          Agents SDK, Pydantic AI) ships or documents a
          GraphRAG retrieval tool. Graph retrieval becomes a
          default option alongside vector retrieval.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three families you actually pick between
      </h2>
      <p className="mb-6 leading-relaxed">
        There are dozens of GraphRAG variants on GitHub, but in
        production most teams land on one of three families.
        The trade-off is between index cost, query latency, and
        how much control you want over the graph itself.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Microsoft GraphRAG family</strong> (full
          GraphRAG, LazyGraphRAG). Best quality on global
          questions, heavy indexing, batteries-included CLI.
          Ships with community summaries and a mature query
          engine. Use this when the corpus is stable, the
          questions are open-ended, and you can pay the
          index bill (or pick LazyGraphRAG to skip most of
          it).
        </li>
        <li>
          <strong>Neo4j GraphRAG family</strong> (the
          Python SDK, LangChain and LangGraph integrations).
          Best when you already have a graph schema, or when
          you want to combine graph retrieval with text-to-
          Cypher. Runs on Neo4j&rsquo;s vector index so the
          graph is the vector store. Best fit for classic
          enterprise data (customers, contracts, products,
          orders) where the schema is known.
        </li>
        <li>
          <strong>LlamaIndex Property Graph</strong>. Best
          when you want a Python-native workflow, a lot of
          extraction control, and pluggable vector back-ends.
          Ships with a set of extractors you can chain
          (schema-based, implicit, dynamic), and works with
          Neo4j, Kuzu, Memgraph, Nebula, or an in-memory
          store.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        We have shipped all three. The choice is rarely about
        which framework is technically best. It is about which
        data you already have, which team is going to maintain
        the graph, and how much you can spend on the initial
        index.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft GraphRAG and LazyGraphRAG
      </h2>
      <p className="mb-6 leading-relaxed">
        Full Microsoft GraphRAG is the reference
        implementation. It extracts entities, builds the graph,
        runs Leiden community detection, and writes a summary
        of each community with an LLM. Every step is a job you
        can inspect and re-run. It is also the most expensive
        version: Alexander Shereshevsky reported the original
        full pipeline at roughly 33,000 dollars to index the
        podcast-scale dataset Microsoft used in the paper.
      </p>
      <p className="mb-6 leading-relaxed">
        LazyGraphRAG is the version we recommend for almost
        every new build. It skips the community summarisation
        step at index time. Indexing cost drops to about the
        same as vector RAG (Microsoft reports 0.1% of full
        GraphRAG). At query time, it picks the relevant
        communities on demand, streams the raw text into a
        map-reduce pass, and answers. On the two benchmark
        query classes Microsoft published, LazyGraphRAG matches
        or beats full GraphRAG at 700 times lower per-query
        cost for global searches.
      </p>
      <CodeBlock
        language="bash"
        filename="scripts/graphrag_index.sh"
        code={`# Install the reference implementation.
pip install graphrag

# Initialise a project. This writes settings.yaml and .env.
graphrag init --root ./ragtest

# Drop your text corpus into ./ragtest/input as .txt files.
# Point OPENAI_API_KEY (or Azure OpenAI vars) in .env.

# Full GraphRAG index (expensive, one run per corpus).
graphrag index --root ./ragtest

# Or LazyGraphRAG, ~1000x cheaper at index time.
graphrag index --root ./ragtest --method lazy

# Query the corpus. Router decides local vs global.
graphrag query \\
  --root ./ragtest \\
  --method drift \\
  --query "How did the acquisition change the org chart in 2025?"`}
      />
      <p className="mb-6 leading-relaxed">
        Four details are worth pulling out. First, the DRIFT
        query method (added in early 2025) is the router-based
        default. It picks between local and global based on the
        question shape and blends both when the answer needs
        it. Second, LazyGraphRAG is enabled with{" "}
        <code>--method lazy</code> at index time; the query
        engine picks it up automatically. Third, the corpus
        format is plain text, but the CSV loader in
        <code>settings.yaml</code> handles structured columns
        well when you have them. Fourth, the whole pipeline is
        just a set of parquet files on disk, which makes it
        easy to inspect, diff, and check into version control
        for small corpora.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Neo4j GraphRAG: when the graph is the source of truth
      </h2>
      <p className="mb-6 leading-relaxed">
        Microsoft GraphRAG builds a graph from unstructured
        text. Neo4j starts from the opposite side: you already
        have a graph, and you want to layer RAG on top of it.
        This is the common enterprise case. Contracts have
        parties. Products have suppliers. Trades have
        counterparties. The relationships are already known,
        and the text (the contract PDF, the product description,
        the trade note) is metadata hanging off each node.
      </p>
      <p className="mb-6 leading-relaxed">
        The <code>neo4j-graphrag</code> Python SDK, released in
        early 2025, wraps the three retrieval styles that
        matter into one interface: vector, hybrid (vector plus
        full-text), and text-to-Cypher. The vector store is the
        graph itself, using Neo4j&rsquo;s native vector index.
        With Neo4j 2026.01, filtered similarity search now
        runs inside the index instead of loading every
        candidate to check filters, which was the last
        performance gap against dedicated vector DBs.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/neo4j_retriever.py"
        code={`import neo4j
from neo4j_graphrag.retrievers import VectorCypherRetriever
from neo4j_graphrag.embeddings import OpenAIEmbeddings
from neo4j_graphrag.llm import OpenAILLM
from neo4j_graphrag.generation import GraphRAG

driver = neo4j.GraphDatabase.driver(
    "neo4j+s://xxxx.databases.neo4j.io",
    auth=("neo4j", NEO4J_PASSWORD),
)

# Vector search finds seed nodes, Cypher expands the neighbourhood.
retrieval_query = """
MATCH (chunk)-[:MENTIONS]->(entity:Entity)
OPTIONAL MATCH (entity)-[r]-(neighbour:Entity)
RETURN chunk.text AS text,
       entity.name AS entity,
       collect(distinct {rel: type(r), name: neighbour.name}) AS related
"""

retriever = VectorCypherRetriever(
    driver=driver,
    index_name="chunkEmbeddings",
    embedder=OpenAIEmbeddings(model="text-embedding-3-small"),
    retrieval_query=retrieval_query,
)

rag = GraphRAG(
    retriever=retriever,
    llm=OpenAILLM(model_name="gpt-5-mini", model_params={"temperature": 0}),
)

answer = rag.search(
    query_text="Which suppliers of Product X have failed audits in 2026?",
    retriever_config={"top_k": 8},
)
print(answer.answer)
print(answer.retriever_result)`}
      />
      <p className="mb-6 leading-relaxed">
        <code>VectorCypherRetriever</code> is the pattern we
        reach for most often. The vector search finds the
        chunks that talk about Product X. The Cypher query then
        walks from those chunks to the suppliers, and from
        suppliers to any audit-related nodes. The LLM only ever
        sees the pruned neighbourhood, not the whole graph,
        which keeps token usage sane. If the user asks
        something that does not fit the vector step, the SDK
        also ships a <code>Text2CypherRetriever</code> that
        turns the question into a Cypher query with a small
        LLM, runs it, and returns the results.
      </p>
      <p className="mb-6 leading-relaxed">
        The other reason teams pick Neo4j is graph
        construction. The <code>SimpleKGPipeline</code> in the
        same SDK reads PDFs, chunks them, extracts entities and
        relationships with an LLM, embeds each chunk, and
        writes it all to the graph in one call. You give it a
        schema (or none), and it fills in the rest.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/build_kg.py"
        code={`from neo4j_graphrag.experimental.pipeline.kg_builder import SimpleKGPipeline
from neo4j_graphrag.experimental.components.schema import (
    SchemaConfig, SchemaEntity, SchemaRelation,
)

schema = SchemaConfig(
    entities=[
        SchemaEntity(label="Company", description="A legal entity."),
        SchemaEntity(label="Product", description="A commercial product."),
        SchemaEntity(label="Person"),
        SchemaEntity(label="Contract"),
    ],
    relations=[
        SchemaRelation(label="SUPPLIES", source="Company", target="Product"),
        SchemaRelation(label="OWNS", source="Company", target="Product"),
        SchemaRelation(label="SIGNED", source="Person", target="Contract"),
    ],
)

pipeline = SimpleKGPipeline(
    driver=driver,
    llm=OpenAILLM(model_name="gpt-5"),
    embedder=OpenAIEmbeddings(model="text-embedding-3-small"),
    schema=schema,
    from_pdf=True,
)

await pipeline.run_async(file_path="./contracts/supplier_msa_2026.pdf")`}
      />
      <p className="mb-6 leading-relaxed">
        Two production notes. Pinning the schema is the
        difference between a graph you can query and a graph
        that becomes noise. A dozen labels is usually enough.
        Second, run the extraction with a strong model (GPT-5
        class or Claude Opus 5) at first, then distil to a
        cheaper model once you know the schema holds. The
        recall on entities and relations drops sharply if you
        try to save cost on the first pass.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex Property Graph: the flexible middle
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex added Property Graph as a first-class index
        type in Q2 2025. The mental model is close to
        LlamaIndex&rsquo;s existing VectorStoreIndex: you point
        it at a corpus, pick a set of extractors and a store,
        and query it. The interesting bit is the extractor
        chain. LlamaIndex ships three:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <code>SchemaLLMPathExtractor</code>: takes a
          Pydantic schema of allowed entity types and
          relations. Highest precision, lowest recall. Use
          when you know your data shape.
        </li>
        <li>
          <code>SimpleLLMPathExtractor</code>: gives the LLM
          free rein. Highest recall, lowest precision. Use for
          exploration.
        </li>
        <li>
          <code>DynamicLLMPathExtractor</code>: seeds a schema
          and lets the LLM add new types as it goes. A good
          default.
        </li>
      </ul>
      <CodeBlock
        language="python"
        filename="src/graphrag/llamaindex_property_graph.py"
        code={`from llama_index.core import PropertyGraphIndex, SimpleDirectoryReader
from llama_index.core.indices.property_graph import (
    DynamicLLMPathExtractor,
    ImplicitPathExtractor,
    VectorContextRetriever,
    LLMSynonymRetriever,
)
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI

llm = OpenAI(model="gpt-5-mini", temperature=0)
embedder = OpenAIEmbedding(model="text-embedding-3-small")

graph_store = Neo4jPropertyGraphStore(
    username="neo4j",
    password=NEO4J_PASSWORD,
    url="neo4j+s://xxxx.databases.neo4j.io",
)

documents = SimpleDirectoryReader("./data/policies").load_data()

index = PropertyGraphIndex.from_documents(
    documents,
    llm=llm,
    embed_model=embedder,
    kg_extractors=[
        DynamicLLMPathExtractor(
            llm=llm,
            allowed_entity_types=["Policy", "Role", "System", "Control"],
            allowed_relation_types=["APPLIES_TO", "REQUIRES", "AUDITED_BY"],
        ),
        ImplicitPathExtractor(),
    ],
    property_graph_store=graph_store,
    show_progress=True,
)

query_engine = index.as_query_engine(
    sub_retrievers=[
        LLMSynonymRetriever(index.property_graph_store, llm=llm),
        VectorContextRetriever(
            index.property_graph_store,
            embed_model=embedder,
            similarity_top_k=5,
        ),
    ],
    llm=llm,
    include_text=True,
)

response = query_engine.query(
    "Which controls apply to systems audited by SOC 2 Type II?",
)
print(response)`}
      />
      <p className="mb-6 leading-relaxed">
        The sub-retriever list is the part that matters. The
        synonym retriever handles keyword-style questions
        (&ldquo;controls for finance&rdquo;) by expanding
        synonyms and matching entities by name. The vector
        context retriever finds seed nodes by embedding
        similarity and walks the graph from there. You can
        chain more (Cypher retriever, custom graph traversals)
        and the engine unions the results. This is the setup
        we default to when we do not have a strong schema up
        front and the questions are mixed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Hybrid retrieval: the actual production shape
      </h2>
      <p className="mb-6 leading-relaxed">
        No production system we run uses graph retrieval alone.
        The 2026 arXiv paper <em>When to use Graphs in RAG</em>{" "}
        confirmed what the field had been saying informally
        since late 2024: GraphRAG shines on multi-hop and
        global questions, vector RAG shines on single-fact
        lookups, and blending both beats either one on real
        traffic. The paper benchmarked eight GraphRAG variants
        against vector RAG across four domains, and the graph
        variants only pulled ahead on questions that required
        connecting three or more entities or summarising a
        whole subset of the corpus.
      </p>
      <p className="mb-6 leading-relaxed">
        The clean production pattern is a router in front of
        two or three retrievers. A small classifier LLM (or a
        rules-based check on question length and shape) picks
        which retriever runs. The results are handed to the
        answer generator with the retrieval mode tagged so the
        prompt can adapt.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphrag/router.py"
        code={`from enum import Enum
from openai import OpenAI

client = OpenAI()

class Mode(str, Enum):
    VECTOR = "vector"     # single fact, one entity
    LOCAL = "local"       # entity plus immediate neighbours
    GLOBAL = "global"     # theme, summary, cross-corpus

ROUTER_PROMPT = """You classify user questions for a retrieval
system. Reply with exactly one word:

vector - single fact about one entity ("What is X?")
local  - about one entity and its relationships ("Who supplies X?")
global - covers a theme across the corpus ("How did X evolve in 2026?")
"""

def route(question: str) -> Mode:
    resp = client.chat.completions.create(
        model="gpt-5-nano",
        temperature=0,
        max_tokens=4,
        messages=[
            {"role": "system", "content": ROUTER_PROMPT},
            {"role": "user", "content": question},
        ],
    )
    return Mode(resp.choices[0].message.content.strip().lower())

async def answer(question: str) -> str:
    mode = route(question)
    if mode is Mode.VECTOR:
        chunks = await vector_retriever.retrieve(question, k=5)
    elif mode is Mode.LOCAL:
        chunks = await local_graph_retriever.retrieve(question, k=8)
    else:
        chunks = await global_graph_retriever.retrieve(question, k=6)
    return await generate(question, chunks, mode)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things about this pattern in production. First, do
        not skip the mode tag in the answer prompt. Global
        answers should cite communities or themes; local
        answers should cite entities and neighbours; vector
        answers should cite chunks. When the model does not
        know which mode was used, its citations get sloppy.
        Second, log the router decision alongside the question
        and answer. About one in ten routes is wrong on a fresh
        corpus, and the log is what you use to fine-tune the
        router or hard-code overrides.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three domains have led adoption. The pattern is the
        same in each one: the questions are multi-hop, the
        underlying data has a clear entity structure, and the
        cost of a wrong answer is high enough to justify the
        extra effort.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pharmaceutical research.</strong> Memgraph and
        several vendors have documented drug-discovery
        pipelines that fuse clinical trial data, literature,
        and drug databases into one graph. GraphRAG lets a
        researcher ask &ldquo;which compounds targeting the
        same pathway as drug X failed phase II in the last
        five years, and why?&rdquo;, and the system walks from
        the drug to its pathway, out to sibling compounds, and
        into trial outcomes and adverse event notes. Microsoft
        Discovery, which ships LazyGraphRAG under the hood, is
        the productised version of this pattern.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Financial services.</strong> Risk teams ask
        questions like &ldquo;what is our exposure if company
        Y misses a covenant?&rdquo;. That question needs the
        system to walk from Y to its subsidiaries, to the
        contracts each subsidiary signed, to the counterparties
        on those contracts, to those counterparties&rsquo; own
        exposures. Vector search cannot do that. A GraphRAG
        agent with a well-modelled counterparty graph can, and
        several banks and hedge funds put it into production in
        2025 and 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Legal and compliance.</strong> Contracts,
        precedents, and regulations are the reference example
        for GraphRAG. Parties, clauses, obligations, and cross-
        references form a natural graph. A GraphRAG agent that
        indexes an org&rsquo;s contract portfolio can answer
        &ldquo;which of our customer contracts have a change-
        of-control clause and are up for renewal in the next
        six months?&rdquo; in one step. The vector-only version
        of that answer requires the reviewer to open twenty
        PDFs.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limits, and when not to use it
      </h2>
      <p className="mb-6 leading-relaxed">
        The honest sales pitch for GraphRAG has three parts.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Better multi-hop reasoning.</strong> On
          questions that need three or more entities to answer,
          graph retrieval beats vector retrieval by a large
          margin. This is the flagship result from every
          benchmark since the Microsoft paper.
        </li>
        <li>
          <strong>Better global reasoning.</strong> Community
          summaries let the model answer questions about the
          whole corpus without loading every chunk. Vector RAG
          simply cannot do this.
        </li>
        <li>
          <strong>Explainability.</strong> The retrieval path
          is a subgraph. You can render it, audit it, and show
          the user which entities and edges the answer came
          from. Enterprise buyers care about this more than
          they care about the accuracy numbers.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        And the honest list of costs.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Index cost.</strong> Full Microsoft GraphRAG
          is expensive. LazyGraphRAG, LightRAG, and Fast
          GraphRAG all bring it back down close to vector RAG,
          but you still pay for one LLM pass over the corpus.
          Budget accordingly and refresh incrementally.
        </li>
        <li>
          <strong>Schema drift.</strong> A graph is only as
          useful as its schema. If the extractor invents new
          entity types on every document, the graph turns into
          noise. Either pin a schema or plan for periodic
          consolidation with a schema evolution job.
        </li>
        <li>
          <strong>Extraction errors compound.</strong> A wrong
          edge in the graph means a wrong answer downstream, and
          the user has no way to see the extraction step. Sample
          the extractor output, run a human review pass on the
          first 1% of docs, and set up alerts on unusual entity
          types.
        </li>
        <li>
          <strong>Prompt injection risk.</strong> When your
          agent runs text-to-Cypher on unsanitised user input,
          you are one clever question away from a query that
          exfiltrates the whole graph. Use parameterised
          queries, restrict the schema exposed to the query
          generator, and run all generated Cypher through a
          read-only role.
        </li>
        <li>
          <strong>Latency.</strong> Local retrieval is fast.
          Global retrieval is not. LazyGraphRAG&rsquo;s
          map-reduce over community summaries can push a
          single query past ten seconds. Cache aggressively.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        When not to use it: a small, static corpus of loosely
        connected documents. A support-doc chatbot for a
        product with fifty pages of docs is a plain vector RAG
        job. So is any use case where the answer is always
        contained in one or two chunks. Do not add a knowledge
        graph because it sounds impressive; add it because the
        questions actually need one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where GraphRAG is heading in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        A few patterns are hardening as the year plays out. The
        first is <strong>graphs as an agent tool</strong>,
        rather than a retrieval engine. Every major agent
        framework in H1 2026 (LangGraph, the OpenAI Agents SDK,
        Mastra, CrewAI, Pydantic AI) documents a GraphRAG tool
        the agent calls when it needs a multi-hop answer. The
        agent decides between plain search and graph search on
        the fly, and can chain graph queries the way it chains
        function calls.
      </p>
      <p className="mb-6 leading-relaxed">
        The second is <strong>incremental indexing</strong>. The
        first wave of GraphRAG was a one-shot job. The second
        wave assumes the corpus updates every day and refreshes
        the graph in place. Neo4j, LlamaIndex, and Microsoft all
        shipped incremental indexers in 2025. The reference
        pattern is: split incoming docs by change type, run
        extraction only on the diff, and re-run community
        detection on the affected subgraphs.
      </p>
      <p className="mb-6 leading-relaxed">
        The third is <strong>graph-native models</strong>. A
        handful of labs are training LLMs that take graph
        structure as a first-class input, not as text serialised
        into a prompt. The <em>When to use Graphs in RAG</em>{" "}
        paper hinted at the direction, and the first production-
        ready graph-native embedding models started to appear
        mid-2026. If that trend holds, the model will do more of
        the graph reasoning natively and the retrieval side will
        get simpler.
      </p>
      <p className="mb-6 leading-relaxed">
        The fourth is <strong>ontology from LLMs</strong>. The
        old approach was: hire a domain expert, spend six
        months writing an ontology, then build the graph.
        LlamaIndex&rsquo;s <code>DynamicLLMPathExtractor</code>,
        Neo4j&rsquo;s <code>SchemaBuilder</code>, and Microsoft
        GraphRAG&rsquo;s auto-schema mode all point at the same
        idea: seed a small schema, let the LLM propose new
        types, review, and merge. This has cut ontology work
        from months to days on the projects where we have used
        it, and it is now the default on new builds.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        GraphRAG in 2026 is not a competitor to vector RAG. It
        is the second tool in the retrieval belt, and the one
        that answers the class of questions vector RAG cannot.
        The cost problem that held the pattern back in 2024 is
        solved: LazyGraphRAG and LightRAG bring indexing back to
        vector-RAG territory, and Neo4j 2026.01 closes the
        vector-search performance gap. The ecosystem now has
        three production-grade families (Microsoft, Neo4j,
        LlamaIndex) and every serious agent framework ships a
        graph retrieval tool out of the box.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are building an agent that has to answer real
        enterprise questions, the practical shape is a router in
        front of a vector retriever and a graph retriever, with
        LazyGraphRAG or Neo4j on the graph side and pgvector or
        an existing vector DB on the other. Ship both, log the
        router decisions, and let the traffic tell you which
        one is doing the work.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are planning a GraphRAG build and want a second
        pair of eyes on the schema, the index cost model, or
        the router,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          reach out
        </a>
        .
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Research: GraphRAG: Unlocking LLM
            discovery on narrative private data
          </a>
        </li>
        <li>
          <a
            href="https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Research: LazyGraphRAG: Setting a new
            standard for quality and cost
          </a>
        </li>
        <li>
          <a
            href="https://github.com/microsoft/graphrag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            microsoft/graphrag on GitHub: the reference
            implementation
          </a>
        </li>
        <li>
          <a
            href="https://www.neo4j.com/docs/neo4j-graphrag-python/current/user_guide_rag.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neo4j GraphRAG Python SDK: user guide
          </a>
        </li>
        <li>
          <a
            href="https://neo4j.com/blog/developer/neo4j-graphrag-workflow-langchain-langgraph/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neo4j: Create a GraphRAG workflow with LangChain and
            LangGraph
          </a>
        </li>
        <li>
          <a
            href="https://neo4j.com/blog/genai/what-is-graphrag/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neo4j: What is GraphRAG?
          </a>
        </li>
        <li>
          <a
            href="https://arxiv.org/html/2506.05690v3"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv 2506.05690: When to use Graphs in RAG, a
            comprehensive analysis
          </a>
        </li>
        <li>
          <a
            href="https://memgraph.com/blog/graph-rag-drug-discovery"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Memgraph: How Can GraphRAG Speed Up Drug Discovery
            and Safety
          </a>
        </li>
        <li>
          <a
            href="https://improvado.io/blog/enterprise-knowledge-graph"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Improvado: Enterprise Knowledge Graph, Architecture
            and Use Cases 2026
          </a>
        </li>
      </ul>
    </div>
  );
}
