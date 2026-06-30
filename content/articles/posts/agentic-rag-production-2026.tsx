import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 36,
  slug: "agentic-rag-production-2026",
  title:
    "Agentic RAG in production 2026: from linear pipelines to self-correcting retrieval loops",
  excerpt:
    "Why the classic retrieve-then-generate pipeline broke once real users started asking real questions, how agentic RAG turns retrieval into a planned, graded, looped process, and the production patterns - CRAG, Self-RAG, Adaptive RAG, GraphRAG, multi-source - that decide whether your retrieval stack survives the first month of traffic.",
  metaDescription:
    "A practical, technical guide to building production agentic RAG systems in 2026. Covers the move from linear RAG to agentic loops, the five patterns that ship (CRAG, Self-RAG, Adaptive RAG, GraphRAG, multi-source agents), the LangGraph plus LlamaIndex stack, hybrid search and reranker baselines, evaluation with RAGAS, real-world deployments at Morgan Stanley, PwC, and ServiceNow, latency and cost trade-offs, and worked Python examples.",
  image:
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2400&q=80",
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
    "Production",
  ],
  publishDate: "2026-06-30",
  readingTime: "15 min read",
};

export default function AgenticRagProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        The first wave of RAG systems shipped in 2023 and
        2024 followed the same shape: embed the docs, store
        them in a vector index, run one nearest-neighbor
        search per question, stuff the top chunks into the
        prompt, and let the model write an answer. It worked
        well in the demo and broke as soon as real users
        asked real questions. Queries that needed two hops
        across documents came back with a confident wrong
        answer. Questions that did not need retrieval at all
        burned tokens on context the model already knew.
        Out-of-scope questions returned a plausible-sounding
        paragraph built from the closest irrelevant chunk.
        Agentic RAG is the production response to that
        failure mode. The retrieval step gets a planner, a
        grader, a rewriter, and a loop, and the system
        treats retrieval as something to reason about rather
        than something to do once and trust. This article is
        how we build agentic RAG on client engagements in
        2026: the five patterns that actually ship, the
        LangGraph plus LlamaIndex stack underneath them, and
        the trade-offs that decide when an agentic loop is
        worth the eight extra seconds.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why linear RAG hit a ceiling
      </h2>
      <p className="mb-6 leading-relaxed">
        The original RAG pipeline assumes three things that
        rarely hold in production. It assumes the user
        question is well formed, that one round of retrieval
        is enough, and that the top-k chunks are actually
        relevant. Real traffic violates all three. Users
        type half-questions and follow-ups. A claim in the
        answer often needs a fact from one document and a
        definition from another. Embedding similarity
        returns chunks that share vocabulary with the query
        but do not actually answer it. The May 2026 MLOps
        Community benchmark across 47 production
        deployments put the irrelevant-retrieval rate of
        plain dense-search RAG at 25 to 40 percent on
        long-tail queries, which is the same as saying a
        third of answers are built on the wrong evidence.
      </p>
      <p className="mb-6 leading-relaxed">
        Agentic RAG fixes this by making retrieval an
        action the model can plan, grade, and repeat. The
        agent reads the question, decides whether to
        retrieve at all, picks a source (vector index,
        graph, SQL, web search), grades whether the result
        is enough to answer, and either writes the answer
        or rewrites the query and goes again. The shape is
        the same shape as any tool-using agent, but the
        only tool that matters is retrieval. The five
        patterns below are different ways of carving up that
        loop, and most production systems pick three or four
        of them and skip the rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>January 2024</strong>: the Self-RAG paper
          from the University of Washington and the Allen
          Institute lands the idea of a model that emits
          reflection tokens about whether to retrieve and
          whether the retrieved chunks support the answer.
          Production teams treat it as a research artifact,
          not a deployment target, but the grading loop
          becomes the template for everything that follows.
        </li>
        <li>
          <strong>February 2024</strong>: the Corrective RAG
          paper from Shi-Qi Yan and collaborators ships the
          first widely copied agentic pattern. A lightweight
          T5 grader scores each retrieved doc, and below a
          confidence threshold the system rewrites the query
          and falls back to web search. CRAG is what most
          early agentic RAG demos in 2024 are actually
          building.
        </li>
        <li>
          <strong>March 2024</strong>: Adaptive RAG arrives
          with the idea that the retrieval strategy should
          depend on the question. A small classifier routes
          easy questions to a direct answer, medium ones to
          single-hop retrieval, and complex ones to a full
          agentic loop. This is the pattern that makes the
          economics of agentic RAG work at scale.
        </li>
        <li>
          <strong>April 2024</strong>: LangGraph 0.1 ships
          as a stateful, cyclic graph runtime split off from
          LangChain. CRAG, Self-RAG, and Adaptive RAG all
          get reference implementations as LangGraph
          notebooks. The graph abstraction maps cleanly to
          the retrieve-grade-rewrite loop, and LangGraph
          becomes the default orchestration layer for
          agentic RAG.
        </li>
        <li>
          <strong>July 2024</strong>: Microsoft open-sources
          GraphRAG, the pattern that builds a knowledge
          graph over the corpus during ingestion and uses
          community summaries plus graph traversal to answer
          cross-document questions. GraphRAG is expensive to
          build and earns its keep only on connect-the-dots
          queries, but it lands as the canonical answer to
          the multi-hop failure mode.
        </li>
        <li>
          <strong>Late 2024</strong>: LlamaIndex Workflows
          ship as a competing orchestration layer for
          retrieval-heavy agents. The split that becomes
          standard in 2025 is LlamaIndex for ingestion and
          retrieval and LangGraph for the agent loop on top.
        </li>
        <li>
          <strong>2025 throughout</strong>: hybrid search
          (dense plus BM25) and a reranker (Cohere Rerank
          v3, BGE Reranker v2) become the production
          baseline. The MLOps Community benchmark shows
          that this boring middle of the ladder closes most
          of the gap between plain dense search and a full
          agentic loop, at a fraction of the cost.
        </li>
        <li>
          <strong>Late 2025</strong>: reasoning models
          (o3, DeepSeek-R1, Claude 4.x with extended
          thinking) start being used as the planner inside
          agentic RAG loops. The grader and rewriter still
          run on a cheap small model, but the routing
          decisions get a smarter brain.
        </li>
        <li>
          <strong>Early 2026</strong>: multi-source agentic
          RAG, where the agent picks among a vector index,
          a knowledge graph, a SQL warehouse, and a web
          search per question, becomes the default shape
          for serious enterprise deployments. The Gartner
          forecast for 2026 puts task-specific AI agents,
          most of them retrieval-heavy, in 40 percent of
          enterprise applications.
        </li>
        <li>
          <strong>Mid 2026</strong>: agentic RAG with
          knowledge graphs cuts hallucination by roughly 62
          percent across the May 2026 MLOps Community
          benchmark of 47 production deployments. The
          headline is real, the catch is that the wins are
          concentrated on multi-hop questions and the
          latency cost is 8 to 12 seconds per query.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The shape of an agentic RAG loop
      </h2>
      <p className="mb-6 leading-relaxed">
        Every agentic RAG system, no matter which pattern it
        picks, ends up with the same five nodes wired into a
        graph: route, retrieve, grade, rewrite, generate.
        Some patterns skip a node, some add a web-search
        fallback, some loop on rewrite instead of grade, but
        the skeleton is consistent.
      </p>
      <CodeBlock
        language="bash"
        filename="Agentic RAG: the canonical loop"
        code={`+-----------+        +-------------+
|  user Q   | -----> |   route     |
+-----------+        +------+------+
                            |
              direct answer | retrieve
                            v
                     +-------------+
                     |  retrieve   |   <-- vector / graph / SQL / web
                     +------+------+
                            |
                            v
                     +-------------+
                     |   grade     |   <-- relevance, sufficiency
                     +------+------+
                       enough | not enough
                            v
              +-------------+--------------+
              |                            |
              v                            v
        +-----------+               +-------------+
        | generate  |               |  rewrite Q  |
        +-----------+               +------+------+
                                           |
                                           +--> back to retrieve`}
      />
      <p className="mb-6 leading-relaxed">
        The five nodes map to five real failure modes. The
        route node prevents the system from retrieving for
        questions that do not need it. The retrieve node is
        where you plug in hybrid search and a reranker. The
        grade node is the guardrail against confident wrong
        answers. The rewrite node is what turns a vague user
        question into a query the retriever can match. The
        generate node is the last step, and in a good
        system it sees only the chunks that the grader
        approved.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Five patterns that ship: Self-RAG, CRAG, Adaptive,
        GraphRAG, multi-source
      </h2>
      <p className="mb-6 leading-relaxed">
        The agentic RAG space looks crowded from the outside
        but production systems converge on five named
        patterns. They are not mutually exclusive. A serious
        deployment usually picks Adaptive RAG as the outer
        router and then layers Self-RAG or CRAG on the
        agentic path. GraphRAG goes underneath when the
        corpus has rich entity relationships. Multi-source
        agentic RAG is what you get when you stop treating
        retrieval as a single tool.
      </p>
      <ul className="mb-6 list-disc space-y-3 pl-6">
        <li>
          <strong>Self-RAG</strong> teaches the model to
          emit reflection tokens that say whether to
          retrieve, whether the retrieved evidence is
          relevant, and whether the generated answer is
          supported. It needs a fine-tuned model and most
          teams skip it for that reason, but the pattern of
          treating retrieval and grounding as model outputs
          is the cleanest abstraction in the space.
        </li>
        <li>
          <strong>Corrective RAG (CRAG)</strong> uses a
          separate, lightweight grader to score each
          retrieved chunk on a relevance scale. If the top
          chunks score below a threshold, the system
          rewrites the query and either retrieves again or
          falls back to web search. CRAG is the easiest
          agentic pattern to ship because it does not
          require fine-tuning, and it catches the most
          common production failure: a confident wrong
          answer from irrelevant context.
        </li>
        <li>
          <strong>Adaptive RAG</strong> puts a query
          classifier in front of everything. Simple lookups
          go to a one-shot retrieve-and-generate. Medium
          queries go to a single hybrid-search pass with
          rerank. Hard queries go to the full agentic loop.
          A typical enterprise workload has 60 to 70
          percent of traffic in the first two buckets, so
          Adaptive RAG is what keeps the cost and latency
          of agentic RAG bearable.
        </li>
        <li>
          <strong>GraphRAG</strong> builds a knowledge
          graph over the corpus during ingestion. An LLM
          extracts entities and relationships, the graph
          gets community-detected into clusters, each
          cluster gets a summary. At query time the agent
          can do graph traversal for cross-document
          questions or fall back to local search for
          targeted ones. GraphRAG costs roughly 10 to 20
          times more to ingest than a vector index but
          pays for itself on questions like &quot;how does
          our supply chain expose us to risk in region
          X.&quot;
        </li>
        <li>
          <strong>Multi-source agentic RAG</strong> drops
          the assumption that there is one knowledge base.
          The agent picks among a vector index for prose
          docs, a knowledge graph for entity questions, a
          SQL warehouse for numeric questions, an MCP
          server for live system state, and a web search
          for anything outside the corpus. This is the
          shape most enterprise deployments end up at in
          2026.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Pick patterns by the failure mode you are trying to
        fix, not by which one sounds most impressive on a
        slide. If your retrieval is missing exact-term
        matches like product SKUs, you do not need an agent,
        you need hybrid search and a reranker. If your
        users get plausible nonsense for a quarter of their
        questions, you need CRAG. If your queries are
        equally easy and hard, you need Adaptive RAG.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The boring middle of the ladder: hybrid search and
        a reranker
      </h2>
      <p className="mb-6 leading-relaxed">
        Before any of the agentic patterns earn their cost,
        the retrieval layer has to be good. Plain dense
        embedding search is the default that most teams
        ship in the first sprint, and it is also the
        default that breaks first. The fix has been the
        same since 2024 and the MLOps Community benchmark
        keeps confirming it. Run hybrid search to pull the
        top 50 results from a dense index and a BM25 index,
        then rerank to the top 5 with a cross-encoder. The
        typical lift on RAGAS context recall is 15 to 30
        percent, and it requires no agent, no planner, and
        no loop.
      </p>
      <CodeBlock
        language="python"
        filename="src/retrieval/hybrid_search.py"
        code={`from llama_index.core import VectorStoreIndex
from llama_index.retrievers.bm25 import BM25Retriever
from llama_index.core.retrievers import QueryFusionRetriever
from llama_index.postprocessor.cohere_rerank import CohereRerank

# Two retrievers over the same corpus
dense = VectorStoreIndex.from_documents(docs).as_retriever(
    similarity_top_k=25,
)
sparse = BM25Retriever.from_defaults(
    docstore=storage.docstore,
    similarity_top_k=25,
)

# Reciprocal rank fusion gets you a single ranked list
hybrid = QueryFusionRetriever(
    retrievers=[dense, sparse],
    similarity_top_k=50,
    mode="reciprocal_rerank",
    use_async=True,
)

# Cohere Rerank v3 is the production default for English
reranker = CohereRerank(
    top_n=5,
    model="rerank-english-v3.0",
)

def retrieve(query: str):
    nodes = hybrid.retrieve(query)
    return reranker.postprocess_nodes(nodes, query_str=query)`}
      />
      <p className="mb-6 leading-relaxed">
        The two numbers that matter in that snippet are{" "}
        <code>similarity_top_k=25</code> on each retriever
        and <code>top_n=5</code> on the reranker. Retrieving
        wide and then reranking narrow is what lets a small,
        fast cross-encoder do the heavy lifting on
        relevance. Skip the reranker and you are back to
        trusting cosine similarity as a stand-in for
        meaning, which is exactly what broke the original
        pipeline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A real CRAG loop in LangGraph
      </h2>
      <p className="mb-6 leading-relaxed">
        The example below is a stripped-down CRAG loop in
        LangGraph. It has three nodes (retrieve, grade,
        generate), a conditional edge that routes on the
        grader output, and a web-search fallback. This is
        the shape of agentic RAG that ships first on most
        client engagements: enough agency to fix the
        common-case failures, not so much that it adds five
        seconds to every query.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphs/crag.py"
        code={`from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from pydantic import BaseModel, Field

class GraphState(TypedDict):
    question: str
    documents: List[Document]
    web_search: bool
    answer: str

llm = ChatOpenAI(model="gpt-4.1-mini", temperature=0)

class GradeDocuments(BaseModel):
    """Binary score: does the document help answer the question?"""
    relevant: bool = Field(description="True if the document is on-topic")

grader = llm.with_structured_output(GradeDocuments)
grade_prompt = ChatPromptTemplate.from_messages([
    ("system", "You grade retrieved documents. Mark relevant only if the document directly supports answering the question."),
    ("human", "Question: {question}\\n\\nDocument: {doc}"),
])

def retrieve_node(state: GraphState) -> GraphState:
    docs = hybrid_retriever.retrieve(state["question"])
    return {"documents": docs, "web_search": False}

def grade_node(state: GraphState) -> GraphState:
    kept: List[Document] = []
    for d in state["documents"]:
        verdict = grader.invoke(grade_prompt.format_messages(
            question=state["question"], doc=d.page_content,
        ))
        if verdict.relevant:
            kept.append(d)
    # If nothing survives grading, fall back to web search
    return {"documents": kept, "web_search": len(kept) == 0}

def web_search_node(state: GraphState) -> GraphState:
    results = tavily_search.invoke(state["question"])
    return {"documents": [Document(page_content=r["content"]) for r in results]}

def generate_node(state: GraphState) -> GraphState:
    context = "\\n\\n".join(d.page_content for d in state["documents"])
    answer = llm.invoke(
        f"Answer using only the context. If the context does not contain the answer, say so.\\n\\nContext: {context}\\n\\nQuestion: {state['question']}"
    )
    return {"answer": answer.content}

def route_after_grade(state: GraphState) -> str:
    return "web_search" if state["web_search"] else "generate"

g = StateGraph(GraphState)
g.add_node("retrieve", retrieve_node)
g.add_node("grade", grade_node)
g.add_node("web_search", web_search_node)
g.add_node("generate", generate_node)
g.set_entry_point("retrieve")
g.add_edge("retrieve", "grade")
g.add_conditional_edges("grade", route_after_grade, {
    "web_search": "web_search",
    "generate": "generate",
})
g.add_edge("web_search", "generate")
g.add_edge("generate", END)

app = g.compile()`}
      />
      <p className="mb-6 leading-relaxed">
        Four details in that graph carry the production
        work. The grader uses{" "}
        <code>with_structured_output</code> so the
        relevance score is a typed boolean and not a string
        the next node has to parse. The grading is per
        document, not per batch, which is more expensive but
        catches the case where four of five chunks are
        irrelevant and the fifth one is gold. The fallback
        node is web search rather than &quot;return I do not
        know,&quot; which keeps the agent useful on
        questions the corpus does not cover. And the graph
        is a strict DAG with one conditional edge, not a
        free loop, which means it always terminates and is
        easy to trace in LangSmith.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Adaptive RAG: the router that makes the costs work
      </h2>
      <p className="mb-6 leading-relaxed">
        The CRAG loop above runs eight to twelve seconds per
        query on average once you count the grader call per
        document and the optional web search. That is fine
        for an analyst tool. It is not fine for a chat UI
        where users expect a first token in under two
        seconds. Adaptive RAG is what keeps the latency
        budget honest by routing easy questions away from
        the agentic path.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphs/adaptive_rag.py"
        code={`from enum import Enum

class Route(str, Enum):
    DIRECT = "direct"       # model knows it, no retrieval
    SIMPLE = "simple"       # one hybrid retrieve, no loop
    AGENTIC = "agentic"     # full CRAG loop with grader
    GRAPH = "graph"         # GraphRAG for multi-hop

class RoutingDecision(BaseModel):
    route: Route
    reason: str

router_llm = ChatOpenAI(model="gpt-4.1-mini", temperature=0)
router = router_llm.with_structured_output(RoutingDecision)

ROUTING_PROMPT = """Classify this question into a retrieval strategy.

direct: factual question the model knows (capitals, common formulas, well-known APIs)
simple: lookup in our docs that needs one retrieval pass (single product, single concept)
agentic: multi-step or ambiguous; needs grading and possible re-query
graph: connects information across multiple documents or entities

Question: {q}"""

def route_node(state: GraphState) -> GraphState:
    decision = router.invoke(ROUTING_PROMPT.format(q=state["question"]))
    return {"route": decision.route}

def pick_path(state: GraphState) -> str:
    return state["route"]

g = StateGraph(GraphState)
g.add_node("route", route_node)
g.add_node("direct", direct_answer_node)
g.add_node("simple", simple_rag_node)
g.add_node("agentic", crag_subgraph)        # the CRAG graph from above
g.add_node("graph", graphrag_subgraph)      # GraphRAG with community summaries
g.set_entry_point("route")
g.add_conditional_edges("route", pick_path, {
    "direct": "direct",
    "simple": "simple",
    "agentic": "agentic",
    "graph": "graph",
})
for path in ["direct", "simple", "agentic", "graph"]:
    g.add_edge(path, END)

app = g.compile()`}
      />
      <p className="mb-6 leading-relaxed">
        The router runs on a small model and adds about 200
        to 400 ms to every query. In exchange you skip the
        eight-second agentic path on 60 to 70 percent of
        traffic. That is the line that makes agentic RAG
        economically defensible at scale. Tune the router
        with the same RAGAS dataset you use for evaluation,
        and put the routing decision in your trace so you
        can see which queries take which path. When the
        router is wrong, it is almost always wrong in the
        same way (it routes an easy question to the agentic
        path because the wording is unfamiliar), and that
        shows up clearly in the trace.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Multi-source agents: when retrieval stops being one
        tool
      </h2>
      <p className="mb-6 leading-relaxed">
        The hardest jump in 2026 production work is the move
        from one knowledge base to several. A finance
        question needs the SQL warehouse, not the doc
        store. A &quot;how does X compare to Y&quot;
        question needs the knowledge graph. A &quot;what
        does our latest policy say about Z&quot; question
        needs the vector index over the docs site, and a
        &quot;what changed last week&quot; question needs
        an MCP server hitting the live system. Multi-source
        agentic RAG is the pattern that gives the agent all
        four as tools and lets it pick.
      </p>
      <CodeBlock
        language="python"
        filename="src/graphs/multi_source_rag.py"
        code={`from langchain_core.tools import tool

@tool
def search_docs(query: str) -> str:
    """Search internal product documentation. Use for how-to and policy questions."""
    nodes = doc_retriever.retrieve(query)
    return "\\n\\n".join(n.text for n in nodes)

@tool
def query_warehouse(question: str) -> str:
    """Answer numeric questions about orders, revenue, inventory. Returns a SQL result."""
    sql = text2sql.invoke(question)
    return warehouse.run(sql)

@tool
def search_graph(question: str) -> str:
    """Answer questions about relationships across customers, vendors, or projects."""
    return graphrag.query(question)

@tool
def web_search(query: str) -> str:
    """Search the public web. Use only when internal sources do not cover the topic."""
    return tavily_search.invoke(query)

from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model=ChatOpenAI(model="gpt-4.1", temperature=0),
    tools=[search_docs, query_warehouse, search_graph, web_search],
    state_modifier=(
        "You are a research assistant. Pick the smallest set of tools that answers the question. "
        "Never invent facts. If the tools do not answer the question, say so."
    ),
)

result = agent.invoke({"messages": [("user", "What is our top-selling SKU in EMEA last quarter, and which vendors supply it?")]})`}
      />
      <p className="mb-6 leading-relaxed">
        Three rules keep this kind of agent from spiraling.
        First, every tool description names the questions it
        is for, not just the data it returns. The agent
        picks tools based on those descriptions, so vague
        ones cause bad routing. Second, the agent gets a
        hard tool-call budget per query (typically three to
        five). Open-ended loops are how a multi-source
        agent ends up calling the warehouse seven times for
        the same question. Third, the SQL tool returns the
        query along with the result, so the trace shows
        what the model actually asked the warehouse and not
        just what it told the user.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation: RAGAS, LangSmith, and the metrics that
        catch real regressions
      </h2>
      <p className="mb-6 leading-relaxed">
        A linear RAG system can almost be tested by reading
        a few answers. An agentic one cannot. The system
        makes different choices for different questions, and
        the wrong fix on one query class can quietly break
        another. RAGAS is the open-source eval framework
        most teams settle on. It measures faithfulness
        (does the answer follow from the context),
        answer relevance (does the answer match the
        question), context precision (are the retrieved
        chunks on-topic), and context recall (did the
        retriever pull everything it needed). LangSmith
        runs the same metrics as part of CI, with a frozen
        golden set of questions, and blocks merges that
        regress more than a configurable threshold.
      </p>
      <CodeBlock
        language="python"
        filename="src/evals/ragas_ci.py"
        code={`from ragas import evaluate
from ragas.metrics import (
    faithfulness, answer_relevancy,
    context_precision, context_recall,
)
from datasets import Dataset

# Frozen golden set in version control - 200 to 500 examples
golden = load_golden_dataset("evals/golden_v3.jsonl")

# Run the live agentic graph over every question
rows = []
for ex in golden:
    out = app.invoke({"question": ex["question"]})
    rows.append({
        "question": ex["question"],
        "answer": out["answer"],
        "contexts": [d.page_content for d in out["documents"]],
        "ground_truth": ex["ground_truth"],
    })

ds = Dataset.from_list(rows)
result = evaluate(ds, metrics=[
    faithfulness, answer_relevancy,
    context_precision, context_recall,
])

# Block the build if any metric drops more than 3 points
PREV = load_prev_metrics()
for metric, score in result.items():
    if score < PREV[metric] - 0.03:
        raise SystemExit(f"Regression on {metric}: {score:.3f} < {PREV[metric]:.3f}")`}
      />
      <p className="mb-6 leading-relaxed">
        Two pieces of advice on running this in CI. Keep the
        golden set small enough that a full run finishes in
        under ten minutes (200 to 500 questions is usually
        the right band) and stable enough that the same
        questions run for at least a quarter before you
        rotate them out. Track the metrics per route as
        well as overall, because Adaptive RAG hides
        regressions: a 5-point drop on the agentic path
        looks small in aggregate if the easy path has
        improved.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production deployments: Morgan Stanley, PwC,
        ServiceNow
      </h2>
      <p className="mb-6 leading-relaxed">
        The headline numbers from 2025 and 2026 come from a
        handful of large deployments. Morgan Stanley uses
        retrieval-based AI agents for internal financial
        research, with multi-hop retrieval over research
        notes, analyst reports, and earnings transcripts.
        PwC has built agentic RAG into tax and compliance
        automation, where the system has to answer
        questions that cross several regulatory documents
        and cite the source for every claim. ServiceNow
        runs multi-turn RAG inside its IT workflows and
        reports a 30 to 40 percent reduction in Tier 1
        ticket volume on the deployments where the rollout
        is mature. The Google Cloud 2025 generative AI
        adoption study put positive ROI at 88 percent for
        early agentic adopters versus 74 percent for plain
        generative AI rollouts.
      </p>
      <p className="mb-6 leading-relaxed">
        Three lessons survive across those deployments.
        First, the production wins come from cutting the
        wrong-answer rate, not from being faster. Users
        tolerate eight seconds for a cited, correct answer
        and do not tolerate two seconds for a confidently
        wrong one. Second, the time-to-production for a
        serious agentic RAG system is three to six months,
        most of which is spent on ingestion (chunking,
        metadata, entity extraction) and evaluation, not on
        the agent loop itself. Third, the systems that ship
        all have a human-in-the-loop path for high-stakes
        answers, usually as a low-confidence routing
        decision that hands off to a reviewer instead of
        guessing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trade-offs: when agentic RAG is worth it, when it
        is not
      </h2>
      <p className="mb-6 leading-relaxed">
        The strengths of agentic RAG are clear. It cuts the
        irrelevant-retrieval rate from 25 to 40 percent
        down to roughly 5 to 15 percent on the patterns
        with knowledge graphs and reranking. It handles
        multi-hop questions that linear RAG cannot. It
        gives you a place to plug in source-specific tools
        (SQL, MCP, web) without rewriting the pipeline. It
        is observable: every retrieval, every grading
        decision, every rewrite shows up in the trace.
      </p>
      <p className="mb-6 leading-relaxed">
        The limitations are also clear. The latency cost is
        real (8 to 12 seconds on the full agentic path), the
        token cost is two to four times a linear pipeline,
        and the loop adds failure modes that did not exist
        before. Retrieval loops where the grader keeps
        rejecting good chunks. Over-retrieval where a
        miscalibrated confidence threshold sends every
        query to web search. Routing errors that send a
        graph question to the doc store. Each of these is
        diagnosable, but only if you have the eval set and
        the trace pipeline to catch them.
      </p>
      <p className="mb-6 leading-relaxed">
        Use agentic RAG when the question distribution has
        a real mix of easy and hard queries, when wrong
        answers cost more than slow ones, and when the
        corpus has more than one shape of data. Do not use
        it when 90 percent of your questions are direct
        lookups in a single doc store, when your latency
        budget is under two seconds, or when you have not
        yet shipped hybrid search and a reranker. In all
        three cases there is a cheaper change with a bigger
        return.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where agentic RAG goes next in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three shifts are visible in the deployments going
        live in 2026. The planner inside the agent loop is
        moving to a reasoning model (o3, R1, Claude with
        extended thinking) while the grader and rewriter
        stay on a small fast model. This buys better
        routing decisions without paying the reasoning-model
        price on every step. Multimodal agentic RAG (text
        plus image plus table) is starting to ship in
        financial and medical workflows, with the agent
        deciding which modality to retrieve. And the line
        between agentic RAG and MCP is blurring: a
        retrieval tool over an MCP server looks identical
        to one over a vector index from the agent&rsquo;s
        side, which means new data sources get added
        without changing the graph.
      </p>
      <p className="mb-6 leading-relaxed">
        The other shift is on the evaluation side. The
        RAGAS-plus-frozen-golden-set pattern from 2024 is
        being replaced by synthetic eval sets generated
        from production traces. Tools like LangSmith,
        Phoenix from Arize, and Braintrust now mine real
        user questions, cluster them by route, and propose
        new eval examples for the bands that are
        underrepresented. The eval set becomes a living
        artifact instead of something you write once and
        forget.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Recommendations
      </h2>
      <p className="mb-6 leading-relaxed">
        Start at the bottom of the ladder, not the top. Get
        ingestion right (good chunking, real metadata,
        entity extraction if your corpus needs it), then
        ship hybrid search and a reranker. Measure with
        RAGAS over a frozen golden set. If the metrics are
        already where you need them, stop. Most teams do
        not need an agentic loop and the ones that do are
        better off knowing exactly which failure mode they
        are buying it for.
      </p>
      <p className="mb-6 leading-relaxed">
        If the metrics say you need it, add CRAG first. It
        gives you the biggest reduction in wrong-answer
        rate for the least operational complexity. Wrap it
        with Adaptive RAG once latency on the easy path
        becomes a problem. Add GraphRAG only when you have
        evidence (from the trace, not from a sales deck)
        that cross-document questions are a real share of
        traffic. Add multi-source tools when the corpus
        genuinely spans data shapes the vector index cannot
        cover. Pick LangGraph for the graph layer and
        LlamaIndex for ingestion and retrieval. That stack
        has the most reference implementations, the
        cleanest observability story, and the largest
        ecosystem of pre-built tools in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        And above all, instrument before you optimize. The
        traces from a single week of production traffic
        will tell you more about which patterns your system
        actually needs than any blog post, including this
        one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arxiv.org/abs/2310.11511"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Self-RAG: Learning to Retrieve, Generate, and
            Critique through Self-Reflection
          </a>
          {" "}- the original reflection-token paper that
          framed retrieval and grounding as model outputs.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2401.15884"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Corrective Retrieval Augmented Generation (CRAG)
          </a>
          {" "}- the paper that introduced the lightweight
          grader and web-search fallback that most agentic
          RAG systems still copy.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2403.14403"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adaptive-RAG: Learning to Adapt
            Retrieval-Augmented Large Language Models
          </a>
          {" "}- the routing pattern that makes the
          economics of agentic RAG work at scale.
        </li>
        <li>
          <a
            href="https://docs.langchain.com/oss/python/langgraph/agentic-rag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph: Build a custom RAG agent (official
            docs)
          </a>
          {" "}- the canonical reference for the graph
          structure, node patterns, and conditional edges
          used throughout this article.
        </li>
        <li>
          <a
            href="https://github.com/microsoft/graphrag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft GraphRAG
          </a>
          {" "}- the open-source implementation of the
          knowledge-graph-plus-community-summary pattern.
        </li>
        <li>
          <a
            href="https://docs.ragas.io/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAGAS documentation
          </a>
          {" "}- faithfulness, answer relevance, context
          precision, and context recall, plus the recipes
          for running them in CI.
        </li>
        <li>
          <a
            href="https://docs.llamaindex.ai/en/stable/examples/retrievers/reciprocal_rerank_fusion/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: hybrid retrieval and reciprocal
            rank fusion
          </a>
          {" "}- the reference for the dense-plus-BM25
          pattern shown above.
        </li>
        <li>
          <a
            href="https://www.gartner.com/en/newsroom/press-releases"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gartner 2026 AI agent forecast
          </a>
          {" "}- the 40 percent enterprise penetration
          number cited in the timeline.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Related reading on this site
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            Building production RAG systems with Next.js,
            LangChain, and the Vercel AI SDK
          </a>
          {" "}- the linear baseline that everything in
          this article is built on top of.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the deeper read on the graph runtime that
          powers every CRAG and Adaptive RAG example
          above.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the broader category that agentic RAG
          sits inside, including chunking, packing, and
          context window budgets.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the trace, eval, and metric layer that
          keeps an agentic RAG system honest in
          production.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP for production AI integrations in 2026
          </a>
          {" "}- the protocol layer that multi-source
          agentic RAG uses to talk to live systems.
        </li>
        <li>
          <a
            href="/articles/ai-agent-memory-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent memory systems in 2026
          </a>
          {" "}- the memory layer that sits next to
          retrieval and is often confused with it.
        </li>
      </ul>
    </div>
  );
}
