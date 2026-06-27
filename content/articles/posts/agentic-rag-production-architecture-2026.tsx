import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 33,
  slug: "agentic-rag-production-architecture-2026",
  title:
    "Agentic RAG in 2026: production architecture, retrieval planning, and self-correcting agents",
  excerpt:
    "How retrieval grew up from a fixed top-k vector lookup into an agent loop that plans, retrieves, grades, and retries. Covers the LlamaIndex, LangGraph, OpenAI file_search, Anthropic agentic search, GraphRAG, and Cohere patterns, with code, trade-offs, and where teams ship them in production today.",
  metaDescription:
    "A practical, technical guide to Agentic RAG in 2026. Covers the shift from naive top-k retrieval to agent-driven retrieval, the Self-RAG, CRAG, and Adaptive RAG patterns implemented as LangGraph state machines, LlamaIndex auto-routed and composite retrievers, OpenAI file_search with hybrid search and reciprocal rank fusion, Anthropic's just-in-time agentic search inside Claude Code, Microsoft GraphRAG with global, local, and DRIFT search, and the production trade-offs around latency, cost, and evaluation.",
  image:
    "https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "RAG",
    "Agentic RAG",
    "LangGraph",
    "LlamaIndex",
    "GraphRAG",
    "Hybrid Search",
    "Production",
  ],
  publishDate: "2026-06-27",
  readingTime: "17 min read",
};

export default function AgenticRagProductionArchitecture2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2023 and 2024, retrieval-augmented generation
        meant the same recipe in every codebase: chunk the
        documents, push the chunks into a vector store, embed the
        user query, pull back the top k matches, and hand the
        result to the model. The recipe worked for a demo and fell
        over the moment the question got longer than the chunks
        could hold, the corpus grew past a single index, or the
        user asked something that needed two hops to answer. In
        2026 the answer to that gap has a name: Agentic RAG. The
        retrieval step is no longer a single vector lookup. It is
        an agent loop that plans the search, picks the right
        index, grades the results, retries when they are weak,
        and stops only when the evidence is good enough to
        generate from. This article is the production read on
        what changed, how the leading frameworks model the loop,
        and where teams are shipping it today.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Three things forced the shift. The first is that
        production users started asking the questions naive RAG
        was never built to answer: cross-document comparisons,
        multi-hop reasoning, and questions whose answer lives in
        a different format than the one the index was tuned for.
        The second is that the agent frameworks finally caught up
        with the retrieval problem. LangGraph, LlamaIndex,
        Pydantic AI, the OpenAI Agents SDK, and Mastra all ship a
        loop primitive that can call retrieval as a tool, look at
        the result, and decide what to do next. The third is that
        the model providers themselves moved up the stack.
        Anthropic took vector search out of Claude Code in 2025
        and replaced it with agentic search over the file system.
        OpenAI shipped the file_search tool inside the Responses
        API with query rewriting, parallel search, and reciprocal
        rank fusion built in. Cohere, LlamaIndex, and Microsoft
        each published an opinionated take on what an enterprise
        agentic RAG system should look like.
      </p>
      <p className="mb-6 leading-relaxed">
        The result is that the industry stopped calling this
        pattern advanced RAG and started calling it the default.
        The January 2025 survey paper on Agentic RAG out of
        arXiv (2501.09136) lists five taxonomic families. The
        LinkedIn ecosystem ran the same line in different words
        through most of 2025: agentic RAG is the number one AI
        agent use case in production. By mid-2026 the question
        is not whether to add an agent loop on top of retrieval.
        It is which pattern fits the corpus, which framework
        carries the production weight, and where the trade-offs
        bite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        From naive RAG to agentic retrieval: the four stages
      </h2>
      <p className="mb-6 leading-relaxed">
        The cleanest way to read the field is as four stages,
        each one fixing a failure mode of the last. Most teams
        running a production RAG system sit at stage three and
        are moving to stage four, even if they do not call it
        that.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stage one: naive top-k.</strong> A user query
        gets embedded, the index returns the k closest chunks,
        the chunks go into the prompt, the model writes an
        answer. The pipeline is one shot, with no feedback. It
        fails when the chunks are irrelevant, when the question
        needs two hops, or when the user asked for a summary
        across the whole corpus.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stage two: advanced RAG.</strong> Add hybrid
        search (BM25 plus dense embeddings, fused with
        reciprocal rank fusion), a reranker on top of the
        candidate pool, and a query rewrite step in front. The
        recall and precision both jump, but the pipeline is
        still one shot. The model sees whatever the pipeline
        decided to fetch, good or bad.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stage three: modular RAG.</strong> Split the
        pipeline into named modules (router, retriever, grader,
        rewriter, generator) and let a configuration file or a
        light orchestrator decide which modules run for which
        query. The router can pick between indices; the grader
        can drop weak chunks. Still one shot in the usual case,
        but the modules can be re-arranged per query type.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stage four: agentic RAG.</strong> Wrap the
        retrieval and grading modules in an agent loop. The
        model decides when to retrieve, what to retrieve, which
        index to hit, whether the result is good enough, and
        whether to retry with a rewritten query or fall back to
        the web. The loop only stops when the evidence is good
        enough to generate from, or a step budget runs out. The
        Cohere guide describes the difference as the move from a
        research assistant who needs the question broken down to
        an experienced analyst you can hand a high-level
        question to.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The five patterns inside agentic RAG
      </h2>
      <p className="mb-6 leading-relaxed">
        The arXiv survey groups production designs into five
        patterns. Most real systems mix two or three. Knowing
        the names helps when you read a framework's docs and
        try to map it to the design you have in your head.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Router agent.</strong> A small classifier in
          front of the retrieval layer. It picks the right
          index, the right retrieval mode, or the right tool
          for the query. LlamaIndex calls this the
          auto_routed mode and exposes it as a single
          retrieval setting.
        </li>
        <li>
          <strong>Query planner.</strong> The agent breaks a
          complex question into sub-questions, fans them out
          across one or more indices in parallel, and merges
          the answers. This is the pattern behind LlamaIndex
          sub-question query engines and behind most
          deep-research agents.
        </li>
        <li>
          <strong>Self-reflective RAG.</strong> The agent
          grades its own retrieval and generation. CRAG
          (Corrective RAG) and Self-RAG are the canonical
          designs. LangGraph ships notebook cookbooks for
          both. The pattern survives even when the underlying
          retrieval is weak, because the loop catches it.
        </li>
        <li>
          <strong>Multi-agent retrieval.</strong> One agent
          coordinates, others specialise (one per index,
          one per modality, one for the web). The lead
          condenses the results before generation. The
          Anthropic multi-agent research system is the
          reference write-up.
        </li>
        <li>
          <strong>Graph-augmented retrieval.</strong> Replace
          or supplement vector search with traversal over a
          knowledge graph. Microsoft GraphRAG with global,
          local, and DRIFT search is the canonical
          implementation. Useful when the questions need
          cross-document synthesis the vector store cannot
          deliver.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through an agentic RAG system
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is four layers stacked on top of a
        storage boundary. Your application sits at the top and
        calls the agent. The agent runs the loop in the middle,
        with retrieval and grading exposed as tools. The
        retrieval layer reaches into the storage boundary,
        which carries the indices, the graph, and the web. The
        evaluation and observability layer wraps the whole
        thing and feeds back into the loop.
      </p>
      <CodeBlock
        language="bash"
        filename="Agentic RAG request path"
        code={`Your application (Next.js, FastAPI, worker, Slack bot)
        |
        |  agent.run(query)
        v
+------------------------------------------------------+
|  Agent loop (LangGraph, LlamaIndex, OpenAI Agents,   |
|  Pydantic AI, Mastra)                                |
|                                                      |
|  1. Plan: route or decompose the query               |
|  2. Retrieve: call retrieval as a tool               |
|  3. Grade: score the retrieved chunks                |
|  4. Decide: generate, rewrite, or escalate           |
|  5. Generate: answer with citations                  |
+------------------------------------------------------+
        |
        v
+------------------------------------------------------+
|  Retrieval layer                                     |
|  - Hybrid search (BM25 + dense, fused with RRF)      |
|  - Reranker (Cohere Rerank, Voyage, BGE, cross-enc.) |
|  - Query rewriter (light LLM call)                   |
|  - Multi-index router                                |
+------------------------------------------------------+
        |
        v
+------------------------------------------------------+
|  Storage and tools                                   |
|  Vector stores: Pinecone, Qdrant, Weaviate,          |
|                 pgvector, Chroma, LanceDB            |
|  Graph stores:  Neo4j, Memgraph, Kuzu, Azure HorizonDB|
|  Text stores:   Elasticsearch, OpenSearch, Tantivy   |
|  External:      web search, MCP servers, SQL, APIs   |
+------------------------------------------------------+

   Spans (OTLP) -> Langfuse / Arize / LangSmith /
                   Braintrust / Phoenix / Galileo`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of this layout carry the production
        work. The retrieval step is a tool the agent calls, not
        a hard-wired stage, so the same agent can hit a vector
        store, a graph, a SQL table, or the web from one loop.
        The grading step is a separate model call, so the
        confidence signal stays explicit and the agent can act
        on it instead of guessing. And the whole loop is traced
        as spans, so the failure mode (bad retrieval, bad
        rerank, bad generation) is visible per query and
        replayable in the evaluation suite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The hybrid search and rerank base layer
      </h2>
      <p className="mb-6 leading-relaxed">
        Before any agent loop pays off, the retrieval primitive
        underneath it has to be strong. The base layer the rest
        of the field has standardised on is hybrid search with
        reciprocal rank fusion (RRF) and a cross-encoder
        reranker on top. Dense embeddings catch the queries
        where the wording differs from the document, BM25
        catches the queries that need an exact match on a
        product code or a name, and RRF merges the two ranked
        lists without needing a global score calibration. A
        cross-encoder reranker then re-orders the top fifty or
        so candidates by how well each chunk actually answers
        the query, not just how similar it is to the embedding.
      </p>
      <p className="mb-6 leading-relaxed">
        OpenAI's file_search tool ships this layout out of the
        box. The defaults are public: 800-token chunks with
        400-token overlap, the text-embedding-3-large model at
        256 dimensions, up to 20 chunks returned, hybrid search
        with configurable text and embedding weights, and a
        score_threshold the caller can raise to trade recall
        for precision. The same shape shows up in the
        LlamaIndex Composite Retriever, in the Weaviate hybrid
        search API, and in Cohere's Rerank-3 endpoint.
      </p>
      <CodeBlock
        language="python"
        filename="hybrid_search.py"
        code={`# Hybrid search with reciprocal rank fusion and a Cohere rerank pass.
# This is the base retrieval the agent loop will call as a tool.
from typing import List
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, SearchRequest
import cohere

co = cohere.Client()
qdrant = QdrantClient(url="https://qdrant.internal:6333")

def hybrid_search(query: str, top_k: int = 50) -> List[dict]:
    dense = qdrant.search(
        collection_name="docs",
        query_vector=embed(query),
        limit=top_k,
    )
    sparse = qdrant.search(
        collection_name="docs",
        query_vector={"name": "sparse", "vector": bm25(query)},
        limit=top_k,
    )
    # Reciprocal rank fusion: simple, no score calibration needed.
    scores: dict[str, float] = {}
    for rank, hit in enumerate(dense):
        scores[hit.id] = scores.get(hit.id, 0) + 1 / (60 + rank)
    for rank, hit in enumerate(sparse):
        scores[hit.id] = scores.get(hit.id, 0) + 1 / (60 + rank)
    fused = sorted(scores.items(), key=lambda x: -x[1])[:top_k]
    return [load_chunk(doc_id) for doc_id, _ in fused]

def rerank(query: str, candidates: List[dict], top_n: int = 8) -> List[dict]:
    result = co.rerank(
        model="rerank-3.5",
        query=query,
        documents=[c["text"] for c in candidates],
        top_n=top_n,
    )
    return [candidates[r.index] for r in result.results]

def retrieve(query: str) -> List[dict]:
    return rerank(query, hybrid_search(query))`}
      />
      <p className="mb-6 leading-relaxed">
        The shape of this helper matters: it returns a list of
        chunks with stable ids, so the agent loop above it can
        cite, dedupe, and re-rank without having to redo the
        first pass. That is the contract the agent loop is
        going to call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Pattern one: router agent with LlamaIndex
      </h2>
      <p className="mb-6 leading-relaxed">
        The simplest agentic pattern is a router. The user
        query comes in, a small classifier (often a fast model
        like Haiku or Gemini Flash) decides which index or
        retrieval mode to hit, and the rest of the pipeline
        runs as usual. LlamaIndex exposes this as a single
        retrieval mode called auto_routed, and as the
        Composite Retriever for the multi-index case.
      </p>
      <CodeBlock
        language="python"
        filename="router_agent.py"
        code={`# Route a query across two indices: SEC filings and meeting slides.
# The agent picks the right index per query, then routes inside the
# chosen index between chunk-level and file-level retrieval.
from llama_cloud import CompositeRetrievalMode
from llama_index.indices.managed.llama_cloud import (
    LlamaParseCompositeRetriever,
)

composite_retriever = LlamaParseCompositeRetriever(
    name="Knowledge Agent",
    project_name=project_name,
    create_if_not_exists=True,
    mode=CompositeRetrievalMode.ROUTED,
    rerank_top_n=5,
)

composite_retriever.add_index(
    financial_index,
    description=(
        "Detailed financial reports, including SEC filings "
        "and revenue analysis."
    ),
)
composite_retriever.add_index(
    slides_index,
    description=(
        "Slide shows from team meetings, covering product "
        "updates and project insights."
    ),
)

# One call routes the query end to end: composite layer picks the
# index, the sub-index uses auto_routed to pick chunk vs file mode.
nodes = composite_retriever.retrieve(
    "What did Q4 2024 say about revenue growth?",
)`}
      />
      <p className="mb-6 leading-relaxed">
        Two design choices to copy from this layout. The index
        descriptions matter as much as the corpus content: the
        router agent reads them and treats them as the tool
        descriptions in any other tool-using setup, so a fuzzy
        description gets a fuzzy router. And the routing is
        recursive: the top layer picks the index, the inner
        layer picks the retrieval mode. The combination beats a
        flat search across a single merged index when the
        document formats differ.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Pattern two: self-reflective RAG with LangGraph
      </h2>
      <p className="mb-6 leading-relaxed">
        The self-reflective family (Self-RAG, CRAG, Adaptive
        RAG) treats retrieval as a step that can fail, and
        builds the loop so the agent notices and retries. The
        canonical LangGraph implementation, published with the
        framework launch in February 2024 and refined through
        2025 and 2026, looks like a state machine with five
        nodes: retrieve, grade documents, transform query,
        generate, and a hallucination check on the generation.
        The conditional edges let the loop skip the rewrite
        when the grade is high, fall back to web search when
        every chunk is graded irrelevant, and re-run the whole
        loop when the generation does not pass the
        hallucination check.
      </p>
      <CodeBlock
        language="python"
        filename="self_reflective_rag.py"
        code={`# A minimal Self-RAG style graph in LangGraph. Five nodes, two
# decision points. The state carries the query, the docs, and the
# generation; nodes update the state as they go.
from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage

class State(TypedDict):
    query: str
    docs: List[dict]
    generation: str
    attempts: int

def retrieve(state: State) -> State:
    state["docs"] = hybrid_search_then_rerank(state["query"])
    return state

def grade(state: State) -> State:
    keep = []
    for d in state["docs"]:
        if relevance_grader(state["query"], d) == "yes":
            keep.append(d)
    state["docs"] = keep
    return state

def transform_query(state: State) -> State:
    state["query"] = query_rewriter(state["query"])
    state["attempts"] += 1
    return state

def generate(state: State) -> State:
    state["generation"] = answer_with_citations(
        state["query"], state["docs"],
    )
    return state

def needs_rewrite(state: State) -> str:
    if not state["docs"] and state["attempts"] < 2:
        return "transform_query"
    if not state["docs"]:
        return "web_fallback"
    return "generate"

def grounded(state: State) -> str:
    if hallucination_check(state["generation"], state["docs"]) == "yes":
        return END
    return "transform_query"

graph = StateGraph(State)
graph.add_node("retrieve", retrieve)
graph.add_node("grade", grade)
graph.add_node("transform_query", transform_query)
graph.add_node("generate", generate)
graph.add_node("web_fallback", web_search)
graph.set_entry_point("retrieve")
graph.add_edge("retrieve", "grade")
graph.add_conditional_edges("grade", needs_rewrite)
graph.add_edge("transform_query", "retrieve")
graph.add_edge("web_fallback", "generate")
graph.add_conditional_edges("generate", grounded)
app = graph.compile()`}
      />
      <p className="mb-6 leading-relaxed">
        Three design notes that decide whether this graph
        survives a week of real traffic. Cap the attempts: a
        loop without a budget will burn tokens on the same bad
        query forever, so a two- or three-attempt cap with a
        web fallback is the right floor. Keep the grader cheap:
        a small fast model used per chunk is the right pick;
        running the same large model that does the generation
        wastes money and rarely changes the verdict. And carry
        the trace: every node ought to write an OTLP span, so
        the failure case (rewrite that hurts recall, fallback
        that picks bad sources) is visible in Langfuse,
        LangSmith, or Phoenix without having to replay the run.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Pattern three: agentic search with the file system
      </h2>
      <p className="mb-6 leading-relaxed">
        Anthropic published the most influential break from
        vector search in 2025 when they pulled it out of Claude
        Code. The replacement, written up in the September
        2025 engineering post on effective context engineering,
        is what the team calls just-in-time agentic search.
        Instead of pre-embedding the codebase, the agent
        navigates the file system with grep, glob, head, tail,
        and bash tools, decides what is worth reading, and
        loads only the chunks it needs into the context window.
        Each interaction yields context that informs the next
        decision: file size hints at complexity, the directory
        name hints at purpose, the timestamp hints at
        relevance.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern is not unique to code. The same loop works
        over any organised store with a navigable structure: a
        document tree, a wiki, a JSON archive, a database with
        metadata. The trade-off is explicit and worth saying
        out loud: runtime exploration is slower than a
        pre-computed vector lookup, and it depends on the model
        being smart enough to navigate the structure without
        burning the context window on dead ends. The win is
        that the agent is never stuck with stale embeddings, it
        never has to maintain an index, and the citations are
        the actual files, not the chunks.
      </p>
      <CodeBlock
        language="typescript"
        filename="agentic-search-tool.ts"
        code={`// A minimal agentic search tool surface for a Claude-style agent.
// Instead of a single retrieve(query) call, the agent gets four
// primitives and picks which one to use at each step.
import { tool } from "@anthropic-ai/sdk";
import { z } from "zod";

export const glob = tool({
  name: "glob",
  description:
    "List files in the corpus matching a glob pattern. Returns " +
    "paths and sizes only, not contents. Use to scope a search.",
  schema: z.object({ pattern: z.string() }),
  execute: async ({ pattern }) => listFiles(pattern),
});

export const grep = tool({
  name: "grep",
  description:
    "Search file contents for a regex. Returns matching file " +
    "paths and the matching line numbers. No file content yet.",
  schema: z.object({ pattern: z.string(), glob: z.string().optional() }),
  execute: async ({ pattern, glob }) => searchContents(pattern, glob),
});

export const read = tool({
  name: "read",
  description:
    "Read a slice of a file by path and line range. Prefer this " +
    "over reading the whole file unless the file is short.",
  schema: z.object({
    path: z.string(),
    startLine: z.number().optional(),
    endLine: z.number().optional(),
  }),
  execute: async ({ path, startLine, endLine }) =>
    readFileRange(path, startLine, endLine),
});

export const headTail = tool({
  name: "head_tail",
  description:
    "Sample the first and last N lines of a file. Use to gauge " +
    "size, structure, and date range before deciding to read.",
  schema: z.object({ path: z.string(), n: z.number().default(20) }),
  execute: async ({ path, n }) => sampleEdges(path, n),
});`}
      />
      <p className="mb-6 leading-relaxed">
        The hybrid version of this pattern is the one most
        production agents end up at: a small set of pre-computed
        retrieval tools (vector, graph, web) plus a richer set
        of just-in-time exploration tools (glob, grep, read,
        SQL). The agent picks per step, the cheap tools handle
        the easy queries, and the exploration tools handle the
        ones that need to follow the structure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Pattern four: GraphRAG for cross-document synthesis
      </h2>
      <p className="mb-6 leading-relaxed">
        Microsoft GraphRAG is the production-grade
        graph-augmented retrieval system, with the indexer and
        query packages open-sourced and the underlying research
        published as arXiv 2404.16130. The shape is different
        from vector RAG. The indexer slices the corpus into
        TextUnits, extracts entities, relationships, and key
        claims with an LLM, and clusters the resulting graph
        with the Leiden algorithm into a community hierarchy.
        The query side then runs one of four modes against the
        graph and the community summaries.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Global Search</strong> answers questions
          about the whole corpus by reading the community
          summaries. Use it for &ldquo;what are the main
          themes&rdquo; or &ldquo;what changed across the
          quarter&rdquo; questions vector search cannot
          touch.
        </li>
        <li>
          <strong>Local Search</strong> answers questions
          about a specific entity by fanning out from the
          entity to its neighbours and associated text. Use
          it for &ldquo;what does the contract say about
          party X&rdquo; questions.
        </li>
        <li>
          <strong>DRIFT Search</strong> blends the two:
          start local, then add community context as the
          query needs it. The 2026 default for most
          enterprise corpora.
        </li>
        <li>
          <strong>Basic Search</strong> falls back to vector
          top-k for queries where the graph is overkill.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The trade-off is the index cost. GraphRAG indexing is
        an LLM job, not a CPU job, so building the graph on a
        million-document corpus runs into real money. The
        practical setup is to use GraphRAG for the corpora
        where the vector store is failing (legal contracts,
        scientific papers, complex policy documents) and to
        leave the rest on hybrid vector search. The 2026
        ecosystem also has lighter graph stores like Memgraph
        and Kuzu, and Azure HorizonDB ships a graph-augmented
        RAG pattern that pairs with the same model providers.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Pattern five: OpenAI file_search as a managed agent tool
      </h2>
      <p className="mb-6 leading-relaxed">
        For teams that do not want to operate their own
        retrieval stack, the OpenAI file_search tool inside the
        Responses API is the managed take. Upload files,
        create a vector store, attach the store to the agent,
        and the model decides per turn whether to call the
        tool. The tool internally rewrites the query, runs
        parallel searches, combines keyword and semantic
        results with reciprocal rank fusion, and reranks the
        top candidates before handing them to the model with
        citations attached. The defaults map directly to the
        hybrid search base layer above: 800-token chunks,
        400-token overlap, text-embedding-3-large at 256
        dimensions, and a 16,000-token retrieval budget for
        the gpt-4 and o-series models.
      </p>
      <CodeBlock
        language="python"
        filename="openai_file_search.py"
        code={`# OpenAI file_search as a managed agentic retrieval tool. The
# model decides when to call it; the tool handles query rewrite,
# hybrid search, and rerank inside.
from openai import OpenAI

client = OpenAI()

vector_store = client.vector_stores.create(
    name="Customer Support Knowledge Base",
    expires_after={"anchor": "last_active_at", "days": 30},
)

with open("policies.pdf", "rb") as f:
    client.vector_stores.file_batches.upload_and_poll(
        vector_store_id=vector_store.id, files=[f],
    )

response = client.responses.create(
    model="gpt-5.5",
    input="Can a customer in the EU cancel within 14 days?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": [vector_store.id],
        "max_num_results": 8,
        "ranking_options": {
            "ranker": "auto",
            "score_threshold": 0.4,
            "hybrid_search": {
                "embedding_weight": 0.6,
                "text_weight": 0.4,
            },
        },
    }],
)

# The output carries inline citations to the source chunks.
print(response.output_text)`}
      />
      <p className="mb-6 leading-relaxed">
        The managed surface buys speed and pays for it in
        flexibility. You cannot swap the embedding model, you
        cannot bring your own reranker, and the vector store is
        billed at $0.10/GB/day after the first free gigabyte.
        For a fast moving product where the team would rather
        ship the agent loop than tune a Qdrant cluster, the
        trade is usually worth it. For a corpus that needs
        graph traversal or a domain-specific reranker, it is
        not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation: the part most teams skip and regret
      </h2>
      <p className="mb-6 leading-relaxed">
        An agentic RAG system has more failure surfaces than a
        one-shot pipeline. The plan can be wrong, the
        retrieval can be wrong, the grader can lie, the
        generation can hallucinate, and the loop can run out
        of budget. The way teams keep this honest is a
        retrieval-aware evaluation suite that scores each
        layer separately and feeds the result back into the
        prompt and the model picks.
      </p>
      <p className="mb-6 leading-relaxed">
        The metrics worth tracking, drawn from the Ragas,
        TruLens, Phoenix, and Galileo frameworks that
        converged on the same shape during 2025 and 2026:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Context recall.</strong> Did the retrieval
          step return at least the chunks needed to answer
          the question? Measured against a labelled set.
        </li>
        <li>
          <strong>Context precision.</strong> Of the chunks
          returned, how many were actually used in the
          answer? A low score points at a weak reranker or a
          too-high top k.
        </li>
        <li>
          <strong>Faithfulness.</strong> Are the claims in
          the generation supported by the retrieved chunks?
          The hallucination grader inside Self-RAG measures
          the same thing in the loop.
        </li>
        <li>
          <strong>Answer relevance.</strong> Did the answer
          address the user&rsquo;s question? Catches the
          case where retrieval was fine but the model went
          off-topic.
        </li>
        <li>
          <strong>Loop cost and latency.</strong> Tokens and
          wall-clock per question, broken down per node. The
          knob the product team will care about first.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Pair this with a small golden set the team writes by
        hand (50 to 200 questions for a typical corpus), a
        synthetic set generated from the documents with a
        question-generation prompt, and an adversarial set
        that targets the failure modes you already know. Run
        the suite on every prompt or model change. The change
        log of a healthy agentic RAG system is mostly
        retrieval and grader prompt edits, not generation
        prompt edits.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        The patterns above are not theoretical. Each one has
        a 2025 to 2026 production reference that maps to a
        business domain.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Financial research and compliance.</strong>
        Cohere's enterprise guide and the Galileo case
        studies describe agentic RAG systems that watch
        market conditions, pull SEC filings, run
        cross-portfolio analyses, and generate compliance
        reports. The router pattern picks between the SEC
        index, the market-news feed, and the internal CRM.
        The self-reflective loop catches the case where the
        retrieved 10-K does not actually answer the
        question and re-runs against a tighter time window.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Healthcare resource allocation.</strong>
        Akira.ai and other published case studies report
        cost reductions up to 30 percent at hospitals
        running agentic RAG over electronic health records,
        admissions data, and staff schedules. The plan
        layer breaks the question (&ldquo;how should we
        staff next month&rdquo;) into sub-queries against
        historical admissions, current schedules, and
        seasonal trends, and synthesises a single
        recommendation with citations.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Legal contract analysis.</strong>
        Thomson Reuters and the broader legal-tech ecosystem
        ship GraphRAG-style systems over contract corpora
        where the questions are cross-document (&ldquo;what
        changed across all renewals in the EU
        region&rdquo;) and entity-centric (&ldquo;what does
        party X owe under clause 12 across these five
        contracts&rdquo;). Vector search cannot answer
        these. Graph traversal can.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Coding agents over private codebases.</strong>
        The Anthropic just-in-time agentic search pattern
        runs in Claude Code, Cursor, and the rest of the AI
        coding agents over private repositories with no
        embeddings at all. The agent uses glob and grep to
        find the relevant files, reads the slices it needs,
        and only loads what it has to. The win is freshness:
        a deploy thirty seconds ago is visible to the agent
        without re-indexing.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Carbon accounting and ESG reporting.</strong>
        The Carboledger case study describes multi-agent RAG
        across utility meters, fleet telemetry, financial
        records, and the Greenhouse Gas Protocol
        documentation. Each sub-agent handles one data
        stream, the lead synthesises a compliant report,
        and the citations let auditors trace every number
        back to the source row.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limitations, and where the trade-offs bite
      </h2>
      <p className="mb-6 leading-relaxed">
        Agentic RAG is the right answer for most enterprise
        retrieval problems in 2026, but it is not free. The
        clear-eyed view of what you gain and what you pay:
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>What you gain.</strong> Higher answer
        quality on the hard questions: multi-hop, cross-doc,
        cross-modal. A real path to citations the user can
        trust, because each retrieval is a step you can
        replay. Resilience to weak retrieval, because the
        loop catches and retries. Coverage of question
        types a single-shot pipeline can never serve: the
        global, summary, and compare questions that GraphRAG
        and the planner pattern handle.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>What you pay.</strong> Latency. An agent
        loop with two or three retrieve-grade-rewrite passes
        easily costs 8 to 15 seconds per question against
        the 1 to 2 seconds a one-shot pipeline takes. Token
        cost: every grader and rewriter call is real spend.
        Complexity: the surface area of the system is
        bigger, the evaluation suite has to be richer, and
        the on-call handoff is harder. A team that ships a
        Self-RAG graph without a budget cap or an
        observability pipeline will spend a lot of money on
        runs that should have stopped two nodes ago.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> Short, factual
        FAQs over a small, clean corpus. Real-time chat
        where the answer has to come back in under a second.
        Use cases where the answer quality of stage-two
        advanced RAG is already at 95 percent. The right
        move there is hybrid search plus rerank, not a
        five-node graph.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        2026 trends and what is coming next
      </h2>
      <p className="mb-6 leading-relaxed">
        Three lines of work are pushing the field in 2026.
        The first is the rise of context architecture as a
        replacement for the word RAG. VentureBeat reported in
        Q1 2026 that hybrid retrieval intent tripled as
        enterprises moved from pre-inference embedding to
        runtime context assembly. Redis launched Iris in the
        same window as a managed context layer. The pattern
        underneath is the same agentic loop; the framing is
        that the model decides at runtime what to pull,
        instead of the pipeline deciding ahead of time.
      </p>
      <p className="mb-6 leading-relaxed">
        The second is the maturity of graph-augmented
        retrieval. The June 2026 buyer&rsquo;s guide on
        Medium ranked GraphRAG, LightRAG, and the new
        temporal knowledge graph systems as the three
        production-ready options for cross-document
        synthesis. The 2026 default for high-stakes corpora
        (legal, scientific, regulatory) is a hybrid stack:
        graph for the synthesis questions, vector for the
        lookup questions, and the agent loop on top picking
        which to use per query.
      </p>
      <p className="mb-6 leading-relaxed">
        The third is the convergence of agent frameworks on
        the same retrieval primitives. LangGraph, LlamaIndex,
        Pydantic AI, Mastra, the OpenAI Agents SDK, the
        Microsoft Agent Framework, and the Claude Agent SDK
        all ship a tool-using loop, a memory layer, and a
        retrieval-as-tool surface. The differences are at
        the edges (the workflow primitives, the language,
        the deployment surface). The retrieval contract is
        becoming portable: a hybrid search tool, a grader, a
        rewriter, a generator. The next round of frameworks
        will compete on observability and evaluation, not on
        the retrieval primitives themselves.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Recommendations: how to pick the pattern for your corpus
      </h2>
      <p className="mb-6 leading-relaxed">
        The decision is rarely &ldquo;agentic or
        not&rdquo;. It is which pattern, in which order, on
        top of which base. A practical decision tree from
        the work we have shipped on client engagements:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Start with the hybrid search plus rerank base
          layer. Measure context recall and precision on a
          golden set. If both are above 0.9, the agent loop
          on top will give diminishing returns. Ship the
          one-shot pipeline.
        </li>
        <li>
          If your corpus spans multiple formats or
          domains, add the router agent. It is the cheapest
          agentic step and the one with the most immediate
          quality lift.
        </li>
        <li>
          If your questions are multi-hop or compositional,
          add the query planner. Decompose the question,
          fan out, merge.
        </li>
        <li>
          If your retrieval is noisy or your domain is
          adversarial (legal, medical, finance), add the
          self-reflective loop. The grader and the
          hallucination check are worth the latency.
        </li>
        <li>
          If your questions are cross-document or
          entity-centric, add a GraphRAG side index. Use
          DRIFT search as the default.
        </li>
        <li>
          If your corpus is a navigable structure (a code
          repo, a wiki, a tree of JSON), consider
          just-in-time agentic search instead of an
          embedding index. The freshness and citation
          quality are worth the latency penalty.
        </li>
        <li>
          Wrap the whole thing in OTLP spans and a
          retrieval-aware evaluation suite. The agentic
          system is not done when the graph compiles, it is
          done when the eval suite catches the next
          regression.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Key takeaways
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Agentic RAG is the move from a one-shot
          retrieve-then-generate pipeline to an agent loop
          that plans, retrieves, grades, and retries.
        </li>
        <li>
          The five patterns to know: router, query planner,
          self-reflective, multi-agent, and graph-augmented.
          Most production systems mix two or three.
        </li>
        <li>
          The base layer underneath all of them is the same:
          hybrid search with reciprocal rank fusion and a
          cross-encoder reranker. Get this right before
          adding the loop.
        </li>
        <li>
          LangGraph, LlamaIndex, OpenAI file_search,
          Anthropic agentic search, and Microsoft GraphRAG
          each ship a take on the pattern. The contracts are
          converging.
        </li>
        <li>
          The trade-offs are latency, token cost, and
          complexity. Cap the loop, run a real evaluation
          suite, and trace every node, or the system will
          quietly cost more than it earns.
        </li>
        <li>
          Pick the pattern by the question shape, not by
          framework loyalty. Cross-doc synthesis needs a
          graph; multi-hop needs a planner; noisy retrieval
          needs a reflective loop. The decision is per
          corpus, not per company.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arxiv.org/abs/2501.09136"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agentic Retrieval-Augmented Generation: A Survey
            on Agentic RAG (arXiv 2501.09136)
          </a>
          {" "}- the January 2025 survey that named the
          five-pattern taxonomy this article follows.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/rag-is-dead-long-live-agentic-retrieval"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: RAG is dead, long live agentic
            retrieval
          </a>
          {" "}- the auto_routed and Composite Retriever
          design notes, with the multi-index agentic
          retrieval code path the router section is built
          on.
        </li>
        <li>
          <a
            href="https://www.langchain.com/blog/agentic-rag-with-langgraph"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangChain: Self-Reflective RAG with LangGraph
          </a>
          {" "}- the canonical CRAG and Self-RAG
          implementations as a LangGraph state machine, with
          notebook cookbooks for both.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Effective context engineering for AI
            agents
          </a>
          {" "}- the just-in-time agentic search pattern
          inside Claude Code, with the trade-off analysis
          between pre-inference embedding and runtime
          retrieval.
        </li>
        <li>
          <a
            href="https://microsoft.github.io/graphrag/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft GraphRAG
          </a>
          {" "}- the production-grade graph-augmented
          retrieval system, with Global, Local, DRIFT, and
          Basic search modes documented.
        </li>
        <li>
          <a
            href="https://cohere.com/blog/agentic-rag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cohere: Agentic RAG - a practical guide for
            enterprises
          </a>
          {" "}- the enterprise framing of the pattern,
          with the autonomy components and use-case
          breakdown the recommendations section draws on.
        </li>
        <li>
          <a
            href="https://developers.openai.com/api/docs/assistants/tools/file-search"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI file_search documentation
          </a>
          {" "}- the managed agentic retrieval tool with
          hybrid search, query rewriting, parallel search,
          and reciprocal rank fusion defaults documented in
          full.
        </li>
        <li>
          <a
            href="https://venturebeat.com/data/context-architecture-is-replacing-rag-as-agentic-ai-pushes-enterprise-retrieval-to-its-limits"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            VentureBeat: Context architecture is replacing
            RAG (Q1 2026)
          </a>
          {" "}- the market read on the shift from
          pre-inference embedding to runtime context
          assembly, with the Redis Iris launch as the
          industry signal.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Related articles
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/articles/ai-agent-memory-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent memory systems in 2026
          </a>
          {" "}- the long-term state layer that sits next to
          agentic retrieval and is often confused with it,
          with a clear separation between session memory and
          knowledge retrieval.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the broader discipline of what goes into
          the model's context window, including the agentic
          retrieval choices this article covers in depth.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the protocol that lets the retrieval tools
          in this article plug into multiple agents and
          clients with the same contract.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as state
            machines
          </a>
          {" "}- the framework the self-reflective RAG
          pattern is built on, with the wider workflow
          context for the graph in this article.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra TypeScript agents in production 2026
          </a>
          {" "}- the TypeScript-first take on the same
          patterns, with first-class RAG, memory, and
          workflow primitives for Node and Next.js teams.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the typed Python agent framework that pairs
          cleanly with the self-reflective RAG graph in this
          article when the team is already on Python.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the eval and tracing surface every
          production agentic RAG system needs, with the
          tooling map for Langfuse, LangSmith, Arize,
          Braintrust, Phoenix, and Galileo.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG with Next.js, LangChain, and the Vercel AI
            SDK
          </a>
          {" "}- the upstream baseline this article extends,
          with the one-shot pipeline that agentic RAG sits
          on top of.
        </li>
      </ul>
    </div>
  );
}
