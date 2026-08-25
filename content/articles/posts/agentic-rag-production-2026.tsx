import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "agentic-rag-production-2026",
  title:
    "Agentic RAG in production 2026: from Self-RAG and Corrective RAG to query planning agents that actually ship",
  excerpt:
    "How RAG stopped being a single retrieval step and became an agent loop. Covers the shift from naive RAG to Corrective RAG (CRAG), Self-RAG, Adaptive RAG, and query planning agents, plus the production stack teams are landing on with LangGraph, LlamaIndex Agent Workflows, Anthropic Contextual Retrieval, and MCP retrieval servers.",
  metaDescription:
    "A practical, technical guide to Agentic RAG in production 2026. Covers Corrective RAG (CRAG), Self-RAG, Adaptive RAG, query decomposition, HyDE, LangGraph agent loops, LlamaIndex Agent Workflows, Anthropic Contextual Retrieval, MCP retrieval servers, RAGAS evaluation, and honest trade-offs against naive RAG, hybrid search, and Deep Research.",
  image:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2400&q=80",
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
    "Anthropic",
    "MCP",
    "Production",
    "Vector Search",
    "Evaluation",
  ],
  publishDate: "2026-08-25",
  readingTime: "18 min read",
};

export default function AgenticRagProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        RAG in 2023 was a straight line. Take a question,
        embed it, pull the top-k chunks, stuff them into a
        prompt, get an answer. It worked for FAQ bots and
        broke for everything else. In 2026 the pattern has
        moved on. The retrieval step is now inside an agent
        loop that decides when to search, what to search
        for, whether the results are good enough, and
        whether to try again. Anthropic calls this shape
        Contextual Retrieval when the focus is on the
        indexing side and Agentic Retrieval when the focus
        is on the loop. LangChain and LlamaIndex both ship
        it as the default template for new RAG apps. This
        article is how we build Agentic RAG systems on
        client work, the four reference patterns that keep
        showing up, and the honest trade-offs against plain
        RAG and Deep Research.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why RAG had to become an agent
      </h2>
      <p className="mb-6 leading-relaxed">
        Naive RAG has three failure modes that show up on
        the same day every project. The retriever brings
        back chunks that are close in embedding space but
        wrong for the question. The model still answers,
        because the prompt asked it to answer, and the
        answer is confident and wrong. The user asks a
        follow-up that needs a different index or a fresh
        search on the web, and the pipeline has no way to
        route it.
      </p>
      <p className="mb-6 leading-relaxed">
        Each failure mode is a decision the pipeline never
        makes. Was the retrieval any good? Should we search
        somewhere else? Do we need more than one hop? These
        are agent decisions, not retrieval decisions. Once
        you accept that, the shape of the system changes.
        You still need embeddings and a vector store, but
        they sit inside a loop that can inspect its own
        output and act on it.
      </p>
      <p className="mb-6 leading-relaxed">
        The academic side named the shift in 2023 and 2024.
        Self-RAG (Asai et al., October 2023) added
        reflection tokens so the model could grade its own
        retrievals mid-generation. Corrective RAG (Yan et
        al., January 2024) added an external evaluator that
        rejected bad chunks and fell back to web search.
        Adaptive RAG (Jeong et al., March 2024) added a
        query classifier that routed simple questions past
        retrieval entirely. By the second half of 2024 the
        production teams had picked up the patterns, and by
        2026 the &ldquo;retrieve once, answer once&rdquo;
        pipeline is treated as a starter template you leave
        behind on week two.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What Agentic RAG actually is
      </h2>
      <p className="mb-6 leading-relaxed">
        Agentic RAG is a retrieval-augmented pipeline where
        an LLM decides how to retrieve, what to retrieve,
        and whether the retrieved context is enough to
        answer. It is not one algorithm. It is a set of
        loops and routers that sit around one or more
        knowledge sources, and it borrows the same building
        blocks every agent framework uses: tool calling,
        reflection, planning, and structured outputs.
      </p>
      <CodeBlock
        language="bash"
        filename="Agentic RAG: the four moving parts"
        code={`+----------------------------------------------------+
|  1. ROUTER (Adaptive RAG)                          |
|                                                    |
|    query --> classifier --> {no-retrieval,         |
|                              single-hop,           |
|                              multi-hop,            |
|                              web-search}           |
+----------------------------------------------------+
                          |
                          v
+----------------------------------------------------+
|  2. PLANNER (query decomposition, HyDE)            |
|                                                    |
|    brief --> sub-queries --> hypothetical answer   |
|                              (embedded for search) |
+----------------------------------------------------+
                          |
                          v
+----------------------------------------------------+
|  3. RETRIEVER + GRADER (CRAG)                      |
|                                                    |
|    sub-query --> hybrid search --> top-k           |
|                                     |              |
|                                     v              |
|                                grade each chunk    |
|                                     |              |
|                    +----------------+----+         |
|                    v                v    v         |
|                  CORRECT       AMBIGUOUS INCORRECT |
|                    |              |         |     |
|                    v              v         v     |
|                  keep         web search  drop     |
+----------------------------------------------------+
                          |
                          v
+----------------------------------------------------+
|  4. GENERATOR + REFLECTOR (Self-RAG)               |
|                                                    |
|    context + query --> draft --> reflect           |
|                                    |               |
|                       +------------+---+           |
|                       v                v           |
|                     good           regenerate      |
|                                    or re-retrieve  |
+----------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        A given system does not need all four blocks. A
        support bot might ship the router and the grader
        and skip the planner. A legal research tool ships
        the planner and the reflector and skips the router.
        The build-or-buy call is really a which-blocks-do-
        we-need call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Corrective RAG: the grader is the whole trick
      </h2>
      <p className="mb-6 leading-relaxed">
        Corrective RAG (CRAG) is the pattern most teams
        adopt first, because it addresses the loudest
        failure mode: retrieval bringing back the wrong
        chunks and the model answering anyway. The idea is
        one small model call per retrieval that grades each
        chunk against the query and returns one of three
        labels: <code>correct</code>, <code>ambiguous</code>,
        <code>incorrect</code>. Correct chunks go into the
        prompt. Incorrect chunks are dropped. Ambiguous
        retrievals trigger a fallback path, usually a web
        search or a broader hybrid search.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2024 paper trained a lightweight T5-based
        evaluator, but every production build we have seen
        uses a small LLM (Haiku 4.5, GPT-5.5-mini, or
        Nemotron Nano) with a rubric prompt. The evaluator
        does not need to be strong at reasoning, just
        consistent at grading. In practice the grader adds
        200-400 ms of latency and a fraction of a cent per
        query, and cuts hallucination rate on a typical
        support workload by 30-50%.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/crag_grader.py"
        code={`from typing import Literal
from pydantic import BaseModel
from anthropic import Anthropic

client = Anthropic()

class ChunkGrade(BaseModel):
    verdict: Literal["correct", "ambiguous", "incorrect"]
    reason: str

GRADER_PROMPT = """You are a retrieval grader. Given a user
query and a candidate document chunk, decide whether the
chunk is directly relevant enough to answer the query.

Return one of:
- correct: chunk contains the answer or a clear part of it.
- ambiguous: chunk is on-topic but does not answer the
  question directly.
- incorrect: chunk is off-topic or misleading.

Query: {query}
Chunk: {chunk}
"""

def grade(query: str, chunk: str) -> ChunkGrade:
    resp = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": GRADER_PROMPT.format(
                query=query, chunk=chunk
            ),
        }],
        response_format={"type": "json_schema",
                         "schema": ChunkGrade.model_json_schema()},
    )
    return ChunkGrade.model_validate_json(resp.content[0].text)

def crag_retrieve(query: str, chunks: list[str]) -> list[str]:
    kept, ambiguous = [], []
    for c in chunks:
        g = grade(query, c)
        if g.verdict == "correct":
            kept.append(c)
        elif g.verdict == "ambiguous":
            ambiguous.append(c)

    if not kept:
        # Fallback: broaden the search or hit the web.
        return web_search(query)
    if ambiguous and len(kept) < 3:
        kept.extend(web_search(query, k=3))
    return kept`}
      />
      <p className="mb-6 leading-relaxed">
        Two production notes that are easy to miss. First,
        run the grader in parallel across all top-k chunks
        with an async client, not in a for loop. A serial
        loop turns a 200 ms grader into a 2 second wall
        clock on k=10 and the pattern loses to plain RAG on
        latency. Second, cache the grade by (query hash,
        chunk hash). Support workloads repeat the same
        chunks against the same intents constantly, and
        the cache hit rate is often 60-80% after a week.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Self-RAG: reflection inside the generator
      </h2>
      <p className="mb-6 leading-relaxed">
        Self-RAG moves the check to the generation side.
        Instead of grading chunks before the model sees
        them, it teaches the model to emit reflection
        tokens as it writes. The original paper fine-tuned
        Llama-2 to produce four special tokens: retrieve
        or not, is the passage relevant, is the answer
        supported, is the answer useful. In 2026 most
        teams do not fine-tune. They put the same rubric
        in the prompt and read structured JSON out.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/self_rag.py"
        code={`from pydantic import BaseModel
from typing import Literal, Optional

class SelfRagStep(BaseModel):
    should_retrieve: bool
    query_if_retrieve: Optional[str] = None
    draft_answer: str
    supported_by_context: Literal["fully", "partially", "no"]
    usefulness: int  # 1 to 5

SYSTEM = """You answer questions with the help of retrieved
context. Follow this protocol on every turn:

1. Decide if the question needs retrieval. If it is a plain
   fact you can answer from the current context, set
   should_retrieve=false. Otherwise set true and provide
   query_if_retrieve.
2. Write draft_answer.
3. Grade whether the draft is fully, partially, or not
   supported by the current context.
4. Rate how useful the draft is on a 1-5 scale.

Reply only with valid JSON matching the SelfRagStep schema.
"""

def self_rag_loop(question: str, retriever, max_hops: int = 3):
    context: list[str] = []
    for _ in range(max_hops):
        step = call_llm(SYSTEM, question, context,
                       schema=SelfRagStep)
        if step.should_retrieve and step.query_if_retrieve:
            context.extend(retriever(step.query_if_retrieve))
            continue
        if (step.supported_by_context == "fully"
                and step.usefulness >= 4):
            return step.draft_answer
        if step.supported_by_context == "no":
            context.extend(retriever(question))
            continue
        # Partially supported and not useful enough. Try
        # one more hop with a rewritten query.
        context.extend(retriever(step.draft_answer))
    return step.draft_answer`}
      />
      <p className="mb-6 leading-relaxed">
        Self-RAG shines when the answer depends on more
        than one document and the model has to synthesise.
        The reflection loop catches the case where the
        first retrieval brought back one useful chunk but
        missed the second, and issues a second query
        without any human in the loop. The trade-off is
        that every iteration is another LLM call, so the
        loop needs a hard hop cap and a monitored average
        so it does not walk your budget. Two to three hops
        covers most real questions, and if the loop
        regularly hits the cap that is a sign your index
        is missing content.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Adaptive RAG: the router that decides when not to
        retrieve
      </h2>
      <p className="mb-6 leading-relaxed">
        Adaptive RAG asks a smaller question first: does
        this query need retrieval at all, and if so, how
        much? The 2024 paper trained a small classifier on
        query complexity. Production teams in 2026 keep
        that idea but classify with a prompted small model
        or a rules-first approach with an LLM fallback. The
        router is a cheap up-front step that saves the
        heavier pipeline for the questions that need it.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/router.py"
        code={`from typing import Literal
from pydantic import BaseModel

class QueryRoute(BaseModel):
    complexity: Literal["direct", "single_hop",
                        "multi_hop", "web_needed"]
    reason: str

ROUTER_PROMPT = """Classify the user question.

- direct: chit chat, definition, a simple fact the model
  already knows, or a math step. No retrieval needed.
- single_hop: needs one lookup in the internal knowledge
  base to answer.
- multi_hop: needs several lookups and reasoning across
  them, or comparison across multiple documents.
- web_needed: asks about current events, prices, news,
  or facts outside the internal corpus.

Question: {question}
"""

def route(question: str) -> QueryRoute:
    return call_llm(ROUTER_PROMPT.format(question=question),
                    schema=QueryRoute,
                    model="claude-haiku-4-5")

def agentic_rag(question: str) -> str:
    r = route(question)
    if r.complexity == "direct":
        return direct_answer(question)
    if r.complexity == "single_hop":
        return crag_retrieve_and_answer(question)
    if r.complexity == "multi_hop":
        return planner_agent(question)
    if r.complexity == "web_needed":
        return web_first_agent(question)`}
      />
      <p className="mb-6 leading-relaxed">
        The router is where teams recover money that naive
        RAG spends by default. Support workloads are heavy
        on greetings, thanks, and simple facts. Routing
        those to a direct answer skips the vector search
        and the reranker, and the p50 latency drops from
        1.5 seconds to 300 ms. On our own production data
        the split lands close to 25% direct, 55% single
        hop, 15% multi hop, 5% web. Your numbers will look
        different, but the shape is usually a long tail on
        the cheap side.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Query planning: HyDE, decomposition, and step-back
        prompts
      </h2>
      <p className="mb-6 leading-relaxed">
        Once the router decides a query is multi-hop, a
        planner takes over. The planner does two jobs:
        rewrite the query into a form the retriever can
        find, and break it into sub-queries the retriever
        can answer one at a time. Three techniques carry
        most of the value.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>HyDE</strong> (Hypothetical Document
        Embeddings, Gao et al. 2022) is the one that keeps
        surprising teams. The retriever embeds a short
        hypothetical answer to the query rather than the
        query itself, because a passage that answers a
        question is closer in embedding space to a draft
        answer than to the question phrasing. On sparse
        knowledge bases the recall bump is often 10-20
        points at the same top-k.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Query decomposition</strong> takes a
        complex question and splits it into the atomic
        pieces the retriever can actually match. &ldquo;How
        did our revenue in Germany change after we
        launched the new pricing tier and what did our top
        three competitors do in response?&rdquo; is three
        retrievals: our German revenue trend, our pricing
        launch date and details, competitor pricing moves
        in the same window. The planner returns a list, the
        agent runs each sub-query, and the writer stitches
        the pieces back together.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Step-back prompting</strong> (Zheng et al.
        2023) trades specificity for a broader lookup. The
        planner rewrites the question at a higher level of
        abstraction, retrieves the broader context, and
        then asks the specific question against that
        context. It helps when the original question is
        so narrow that the retriever misses the neighbouring
        chunks that hold the answer.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/planner.py"
        code={`from pydantic import BaseModel

class Plan(BaseModel):
    sub_queries: list[str]
    hyde_draft: str      # hypothetical answer for HyDE embed
    step_back: str       # broader restatement

PLANNER_PROMPT = """Read the user question. Produce:

1. sub_queries: 1-5 atomic queries that together answer
   the question. Order them by dependency.
2. hyde_draft: one short paragraph in the voice of the
   answer you expect. This will be embedded for search.
3. step_back: a broader restatement of the question that
   might pull in useful neighbouring context.

Question: {question}
"""

def plan(question: str) -> Plan:
    return call_llm(PLANNER_PROMPT.format(question=question),
                    schema=Plan, model="claude-sonnet-5")

async def run_multi_hop(question: str) -> str:
    p = plan(question)
    findings: list[str] = []

    # HyDE and step-back both feed one extra retrieval each,
    # merged with the sub-query retrievals.
    all_queries = p.sub_queries + [p.hyde_draft, p.step_back]
    for q in all_queries:
        chunks = await hybrid_search(q, k=8)
        chunks = await crag_grade_parallel(q, chunks)
        findings.extend(chunks)

    findings = dedupe(findings)
    return synthesise(question, findings)`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Anthropic Contextual Retrieval: the indexing side
        upgrade
      </h2>
      <p className="mb-6 leading-relaxed">
        Everything above is about what happens at query
        time. Contextual Retrieval, published by Anthropic
        in September 2024, is what happens at index time,
        and any agentic RAG build in 2026 without it is
        leaving accuracy on the table. The idea is one
        cheap LLM call per chunk that prepends 50-100
        tokens of context describing where the chunk sits
        in its parent document, before embedding it.
      </p>
      <p className="mb-6 leading-relaxed">
        The published numbers are worth remembering: 35%
        fewer failed retrievals with contextual embeddings
        alone, 49% fewer when combined with contextual
        BM25, and 67% fewer when a reranker sits on top.
        None of these numbers change the query-time
        pipeline. They all sit in the index build. Prompt
        caching keeps the cost around $1 per million
        document tokens, so contextualising a mid-sized
        corpus is a one-off cost measured in tens of
        dollars, not thousands.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/contextual_index.py"
        code={`from anthropic import Anthropic
client = Anthropic()

CONTEXT_PROMPT = """<document>
{document}
</document>

Here is a chunk from that document:
<chunk>
{chunk}
</chunk>

Write a short context of 50-100 tokens that situates the
chunk inside the document. Explain what part of the doc it
belongs to, what came before, and what the chunk is about.
Reply with the context only.
"""

def contextualise(document: str, chunk: str) -> str:
    resp = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=200,
        # Cache the document once per build, only re-billed
        # for the chunk suffix.
        system=[{
            "type": "text",
            "text": document,
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{
            "role": "user",
            "content": CONTEXT_PROMPT.format(
                document=document, chunk=chunk
            ),
        }],
    )
    return resp.content[0].text.strip()

def build_index(docs: list[dict]):
    for doc in docs:
        chunks = split(doc["text"])
        for c in chunks:
            ctx = contextualise(doc["text"], c)
            enriched = f"{ctx}\\n\\n{c}"
            upsert_vector(embed(enriched), payload=c)
            upsert_bm25(enriched, payload=c)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things to hold in mind. First, the enriched
        text is what you embed and index for BM25. The
        original chunk is what you return in the prompt.
        Otherwise you burn tokens on the added context at
        query time and lose the caching benefit. Second,
        pair it with a reranker. Cohere Rerank 3, Voyage
        rerank-2.5, or an open-weights BGE reranker running
        on your own GPU. The 67% number in the Anthropic
        post is contextual embeddings plus contextual BM25
        plus a reranker, not any one piece on its own.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LangGraph agentic RAG: the reference open-source
        stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The LangGraph team ships a set of tutorials that
        codify each of these patterns. The one worth
        starting from is the agentic RAG template that
        combines a router, a grader, and a rewrite step in
        one graph. The state is explicit, every node is a
        function, and the graph is a directed acyclic flow
        with a loop from the grader back to the retriever.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/langgraph_pipeline.py"
        code={`from typing import TypedDict, Literal
from langgraph.graph import StateGraph, END

class RagState(TypedDict):
    question: str
    route: str
    documents: list[str]
    draft: str
    grade: str
    hops: int

def router_node(state: RagState) -> RagState:
    state["route"] = route(state["question"]).complexity
    return state

def retrieve_node(state: RagState) -> RagState:
    docs = hybrid_search(state["question"], k=8)
    state["documents"] = docs
    return state

def grade_node(state: RagState) -> RagState:
    kept = crag_grade_parallel(state["question"],
                               state["documents"])
    state["documents"] = kept
    state["grade"] = "ok" if kept else "empty"
    return state

def rewrite_node(state: RagState) -> RagState:
    state["question"] = rewrite(state["question"])
    state["hops"] += 1
    return state

def generate_node(state: RagState) -> RagState:
    state["draft"] = synthesise(state["question"],
                                state["documents"])
    return state

def decide_after_grade(state: RagState) -> Literal[
    "generate", "rewrite", "web_search"
]:
    if state["grade"] == "ok":
        return "generate"
    if state["hops"] >= 3:
        return "web_search"
    return "rewrite"

g = StateGraph(RagState)
g.add_node("router", router_node)
g.add_node("retrieve", retrieve_node)
g.add_node("grade", grade_node)
g.add_node("rewrite", rewrite_node)
g.add_node("web_search", web_search_node)
g.add_node("generate", generate_node)

g.set_entry_point("router")
g.add_edge("router", "retrieve")
g.add_edge("retrieve", "grade")
g.add_conditional_edges("grade", decide_after_grade, {
    "generate": "generate",
    "rewrite": "rewrite",
    "web_search": "web_search",
})
g.add_edge("rewrite", "retrieve")
g.add_edge("web_search", "generate")
g.add_edge("generate", END)

app = g.compile()`}
      />
      <p className="mb-6 leading-relaxed">
        The graph makes the loop explicit and the state
        legible. Every node reads and writes a single
        state object. LangGraph checkpoints the state to
        disk after each node, which means a failed run can
        resume from the last successful node instead of
        starting over. That checkpointing is what turns the
        pattern from a demo into a service you can rely
        on when the LLM API has a bad ten minutes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex Agent Workflows: the event-driven cut
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex went from a plain RAG library in 2023
        to an event-driven agent framework by mid-2025.
        The current shape, Agent Workflows, treats the
        pipeline as a set of steps that emit and consume
        events. It is a different mental model from
        LangGraph state machines and it fits Agentic RAG
        naturally, because the loops are just event fans
        rather than explicit graph edges.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/llamaindex_workflow.py"
        code={`from llama_index.core.workflow import (
    Workflow, step, Event, StartEvent, StopEvent
)

class RetrievedEvent(Event):
    query: str
    nodes: list

class GradedEvent(Event):
    query: str
    nodes: list
    ok: bool

class AgenticRag(Workflow):
    @step
    async def route(self, ev: StartEvent) -> RetrievedEvent:
        q = ev.question
        r = route(q).complexity
        if r == "direct":
            return StopEvent(result=direct_answer(q))
        nodes = await hybrid_search(q, k=8)
        return RetrievedEvent(query=q, nodes=nodes)

    @step
    async def grade(self, ev: RetrievedEvent) -> GradedEvent:
        kept = await crag_grade_parallel(ev.query, ev.nodes)
        return GradedEvent(query=ev.query, nodes=kept,
                           ok=bool(kept))

    @step
    async def synthesise(self, ev: GradedEvent) -> StopEvent:
        if not ev.ok:
            web = await web_search(ev.query, k=5)
            return StopEvent(result=synthesise(ev.query, web))
        return StopEvent(result=synthesise(ev.query, ev.nodes))

async def run(question: str) -> str:
    wf = AgenticRag(timeout=60)
    return await wf.run(question=question)`}
      />
      <p className="mb-6 leading-relaxed">
        The event model shows its value when the pipeline
        starts to fan out. A multi-hop planner can emit
        one event per sub-query, and each retrieval and
        grader runs in parallel with no extra plumbing. If
        your team is a Python shop that likes async and
        pytest-style test surfaces, LlamaIndex Workflows
        is the shorter path. If your team already runs on
        LangChain, LangGraph is the safer pick because it
        shares checkpointing, observability, and prompt
        management with the rest of your agents.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP retrieval servers: the connector layer
      </h2>
      <p className="mb-6 leading-relaxed">
        The Model Context Protocol has quietly become the
        default way to expose a knowledge base to an
        agent. For Agentic RAG the interesting piece is
        the standard <code>search</code> and{" "}
        <code>fetch</code> tool shape that OpenAI, Google,
        and Anthropic all consume from Deep Research and
        agent products. If you ship your knowledge base
        behind an MCP server, you get retrieval into
        ChatGPT, Claude, Cursor, Gemini, and any agent
        framework that speaks MCP without writing one
        integration per client.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/mcp_server.py"
        code={`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("acme-knowledge-base")

@mcp.tool()
def search(query: str, top_k: int = 8) -> list[dict]:
    """Search the internal KB. Returns id, title, snippet."""
    results = hybrid_search(query, k=top_k)
    return [
        {
            "id": r.chunk_id,
            "title": r.doc_title,
            "url": r.canonical_url,
            "snippet": r.text[:400],
        }
        for r in results
    ]

@mcp.tool()
def fetch(id: str) -> dict:
    """Return the full chunk content for a search hit."""
    chunk = get_chunk(id)
    return {
        "id": chunk.chunk_id,
        "title": chunk.doc_title,
        "url": chunk.canonical_url,
        "text": chunk.text,
    }

if __name__ == "__main__":
    mcp.run(transport="streamable-http", port=8080)`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make an MCP retrieval server behave
        well in the wild. First, keep the tool surface to
        <code>search</code> and <code>fetch</code>. The
        Deep Research models from OpenAI accept only that
        shape, and matching it means one server that works
        for both agent frameworks and hosted research
        APIs. Second, return short snippets from{" "}
        <code>search</code> and let the agent decide which
        ids to <code>fetch</code>. This mirrors how humans
        skim search results and use context tokens far
        better than dumping full documents. Third, add
        auth (OAuth 2.0 or a signed bearer) before the
        server touches anything sensitive. Prompt
        injection through an unauthenticated MCP server is
        the classic 2025 mistake.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation: RAGAS, LangSmith, and the metrics that
        actually track quality
      </h2>
      <p className="mb-6 leading-relaxed">
        An Agentic RAG pipeline has more moving parts than
        a plain RAG one, and each part can fail on its
        own. Evaluation has to grade the pieces separately
        or you cannot debug regressions. The four metrics
        that matter, more or less in the shape RAGAS
        codified them:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Context precision</strong>. Of the chunks
          the retriever brought back, how many were
          actually relevant. This is the CRAG grader as an
          eval metric. A drop here means the retriever or
          the reranker has regressed.
        </li>
        <li>
          <strong>Context recall</strong>. Of the chunks
          that would have answered the question, how many
          did we find. A drop here often means the index
          is stale or the chunking has changed. It is the
          hardest metric to measure because it needs
          ground-truth references.
        </li>
        <li>
          <strong>Faithfulness</strong>. Every claim in the
          final answer, is it supported by the retrieved
          context. A drop here means the generator is
          hallucinating on top of good chunks. Fix with a
          stricter system prompt and a reflect step.
        </li>
        <li>
          <strong>Answer relevance</strong>. Does the
          answer actually address the question. A drop
          here is usually the router picking the wrong
          route, or the planner decomposing badly.
        </li>
      </ul>
      <CodeBlock
        language="python"
        filename="tests/eval/ragas_suite.py"
        code={`from ragas import evaluate
from ragas.metrics import (
    context_precision, context_recall,
    faithfulness, answer_relevancy,
)
from datasets import Dataset

records = []
for case in golden_cases:
    result = agentic_rag(case["question"])
    records.append({
        "question": case["question"],
        "answer": result.answer,
        "contexts": result.retrieved_chunks,
        "ground_truth": case["reference"],
    })

ds = Dataset.from_list(records)
scores = evaluate(
    ds,
    metrics=[context_precision, context_recall,
             faithfulness, answer_relevancy],
)
print(scores)`}
      />
      <p className="mb-6 leading-relaxed">
        Run the suite on every merge and post the four
        scores to the PR. If context precision drops but
        faithfulness holds, the retriever regressed and
        the generator is patching over it. If context
        recall drops, look at the index build first. If
        faithfulness drops with the retriever unchanged,
        the model or the prompt changed. This diagnostic
        is where evals earn their weight. Without it a
        regression looks like a bug report from a support
        agent three weeks later.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Ship a router before you ship a
        planner</strong>. Direct answers are 25-35% of
        every real workload we have measured. Routing
        those past retrieval is free latency and free
        money. Add the router in week one, then decide
        whether the multi-hop side needs a planner or a
        simple loop.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Grade in parallel</strong>. Serial
        grading is the number one reason CRAG builds get
        rolled back. Fire the grader on all top-k chunks
        with asyncio.gather. If your provider does not
        support batched grading in one call, use a smaller
        grader model or a rules pre-filter on the top-k.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Cache grades and rewrites</strong>. The
        same query hits the same top chunks on the same
        intents constantly. A 24 hour cache on grades and
        another on rewritten sub-queries turns a hot
        support workload from expensive to cheap.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Cap hops in the prompt and in the
        code</strong>. The agent will occasionally decide
        it needs a fourth or fifth hop. The prompt should
        tell it 2-3 is the target, and the code should
        return an honest &ldquo;I could not find enough
        context&rdquo; after the cap. A polite failure is
        better than a confident hallucination.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Contextualise on the index side, do
        not enrich on the query side</strong>. If you find
        yourself pasting document titles or headings into
        the query at retrieval time, move it into the
        index build. Contextual Retrieval covers the
        same ground once, not on every query.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Pair vector search with BM25</strong>.
        Hybrid retrieval is not fashionable, but it wins
        the recall benchmark on almost every real
        corpus. Add BM25 in your index build, run both
        retrievals at query time, and merge with
        reciprocal rank fusion.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Add a reranker even if the base recall
        looks fine</strong>. Cohere Rerank 3, Voyage
        rerank-2.5, or a self-hosted BGE reranker.
        Rerankers turn top-30 into a well-ordered top-8
        and are the cheapest quality gain in the whole
        stack.
      </p>
      <p className="mb-6 leading-relaxed">
        8. <strong>Trace every retrieval</strong>. Every
        query, every sub-query, every grade, every
        chunk id. LangSmith, Arize, or a plain OTLP
        exporter into your own store. When a user tells
        you &ldquo;the answer is wrong&rdquo;, the trace
        is the only way to tell if the retriever missed,
        the grader over-filtered, or the generator went
        off script.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases we have shipped
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Insurance policy assistant</strong>. The
        corpus is 60,000 policy documents in six
        languages. Naive RAG on a bi-encoder returned
        wrong-policy chunks 20% of the time. Contextual
        Retrieval plus a CRAG grader took that to under
        4%. The router sends about a third of the
        questions (definitions, glossary terms) to a
        direct answer path with no retrieval.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Product support bot for a SaaS with
        1,200 help articles</strong>. Adaptive RAG with
        a router, a HyDE step for how-to questions, and a
        reflection loop capped at two hops. Faithfulness
        climbed from 78% to 94% on the goldens after we
        switched from naive RAG. Average tokens per
        question dropped 40% because the direct answers
        skip the vector call.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal legal research assistant</strong>.
        Query decomposition is the star here. Every real
        research question decomposes into 4-8 sub-queries,
        each answered against a different index (contracts,
        rulings, memos, external legal databases). The
        writer never sees any single index and instead
        works from the deduped findings. This is a mini
        Deep Research pipeline, and the boundary between
        Agentic RAG and Deep Research is fuzzy at this
        end of the spectrum.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Sales enablement chatbot</strong>. The
        rewriting step earns its keep here. Sales users
        ask questions like &ldquo;why should a hospital
        pick us over vendor X&rdquo; that map poorly to
        the way marketing writes battlecards. The
        rewriter expands the query into &ldquo;comparison
        with vendor X, differentiators for hospital
        vertical, published case studies&rdquo; and the
        retrieval hits three chunks a naive search would
        have missed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limitations, and when not to use
        Agentic RAG
      </h2>
      <p className="mb-6 leading-relaxed">
        The strengths line up with the failure modes it
        fixes. Fewer wrong answers because the grader
        rejects bad chunks. Fewer irrelevant retrievals
        because the router skips them. Better answers on
        multi-part questions because the planner
        decomposes. Better recall because HyDE and step-
        back cover corners the raw query misses. And
        because every step is small and separable, the
        pipeline is far easier to debug than a single
        opaque call.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-offs are as real. Each extra step is
        latency and money. A router adds 200 ms and a
        cent. A grader adds another 300 ms and a couple
        of cents. A planner and reflector add a second
        and up to a nickel. On a p50 basis the agentic
        pipeline is typically 2-3x slower and 3-5x more
        expensive than naive RAG. If your workload is
        low-value or already answering well with naive
        RAG, do not add the extra machinery.
      </p>
      <p className="mb-6 leading-relaxed">
        The other cost is complexity. An agentic
        pipeline has more knobs and more failure surfaces.
        The router can misroute. The grader can over-
        filter. The planner can over-decompose. Each of
        those failure modes has its own signal in the
        eval suite, but you have to actually run the eval
        suite. Teams that ship Agentic RAG without evals
        end up with a pipeline that feels smarter and is
        harder to trust.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use Agentic RAG</strong> when the answer
        quality matters, when the corpus is diverse
        enough that one retrieval strategy does not fit,
        when queries vary in complexity, or when the
        workload can carry a couple of extra seconds and
        a few cents per query.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skip Agentic RAG</strong> when the corpus
        is a single small knowledge base with clean
        chunking, when the query pattern is narrow, when
        latency is the primary constraint (a
        conversational voice assistant for example), or
        when a Deep Research run is the right shape
        because the user is willing to wait minutes for a
        cited long-form answer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agentic RAG vs naive RAG vs Deep Research
      </h2>
      <p className="mb-6 leading-relaxed">
        The three patterns sit on a spectrum. Naive RAG
        is one retrieval and one generation, hundreds of
        milliseconds, fractions of a cent, an answer of a
        few sentences. Agentic RAG is a bounded loop with
        1-5 retrievals, a couple of seconds, a few cents,
        an answer of a paragraph or two. Deep Research is
        an open loop with tens or hundreds of retrievals,
        minutes of latency, dollars per run, a report of
        thousands of words with citations.
      </p>
      <p className="mb-6 leading-relaxed">
        Picking the right shape is a question of what the
        user actually needs. A support chat window with a
        two second budget is Agentic RAG on the top end
        and naive RAG on the bottom. A due diligence
        report with a coffee-break budget is Deep
        Research. A CRM lookup with a spinner budget is
        one MCP tool call. Do not run Deep Research when
        Agentic RAG will do, and do not run Agentic RAG
        when naive RAG will do.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through the rest of
        2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Retrieval built into reasoning models</strong>.
        OpenAI, Anthropic, and Google are all rolling
        server-side retrieval into their reasoning APIs.
        The Responses API file search tool is the first
        step. Expect more of the router and grader logic
        to move behind the API in the second half of
        2026, and expect Agentic RAG on top of those
        endpoints to become a lot thinner. The pattern
        does not disappear, but the amount of glue code
        you write to implement it drops sharply.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Learned retrievers and rerankers on
        top</strong>. Contextual embeddings are one shape
        of learned retrieval, but the next generation
        (ColBERT-v3, ColBERT-XL, Cohere Embed 5) treats
        retrieval as a joint optimisation with the
        generator. The retrievers become task-specific
        rather than general, and the recall numbers keep
        climbing.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Long-context models as a plausible
        alternative</strong>. With Gemini 2.5 Pro at 2M
        tokens and Claude Opus 4.8 at 1M, teams are
        asking whether they should skip retrieval and
        just stuff the corpus into the context. The
        current answer is: only if the corpus fits under
        a couple hundred thousand tokens and the query
        pattern is narrow. Beyond that, retrieval is
        cheaper, faster, and easier to audit. The
        interesting middle ground is long-context
        rerankers that read tens of thousands of tokens
        of candidates and pick the strongest few.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP as the retrieval interface across
        clients</strong>. Every meaningful agent product
        (ChatGPT, Claude, Cursor, Windsurf, Gemini) now
        consumes MCP retrieval servers. Expect the
        indexing side (Anthropic Contextual Retrieval,
        LlamaIndex ingestion, Weaviate contextual mode)
        to standardise around a small set of shapes so
        one MCP server can back a chatbot, an IDE
        assistant, and a research agent.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Small models for the pipeline glue</strong>.
        The router, grader, and rewriter do not need a
        frontier model. Nemotron Nano, Phi-4, Gemma 3,
        and Llama 4 small tiers are already good enough
        for those roles at a fraction of the cost. The
        NVIDIA whitepaper on small language models for
        agentic AI makes this argument explicitly and it
        is landing in production stacks now.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the loop is the point
      </h2>
      <p className="mb-6 leading-relaxed">
        Agentic RAG is not a new algorithm. It is the
        same building blocks (embed, retrieve, generate)
        wrapped in a loop that inspects its own output
        and decides what to do next. The four moving
        parts (router, planner, grader, reflector) map
        onto the four questions naive RAG never asked:
        does this query need retrieval, what should we
        actually search for, are these results any good,
        is the answer supported. Each part is a small,
        cheap LLM call. Put together they add a couple of
        seconds and a few cents to the naive pipeline and
        take the answer quality from 70% to 90% on a
        typical real workload.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy question resolves the same way
        it does for Deep Research. Start with a hosted
        pattern (OpenAI file search, Anthropic
        Contextual Retrieval plus a Claude agent loop, or
        Gemini file search) for a two-week prototype.
        Move to LangGraph or LlamaIndex Workflows when
        the pattern needs tools the hosted APIs do not
        support, when you need to self-host, or when the
        pipeline outgrows a single vendor. Wrap your
        knowledge base in an MCP server on day one so the
        same retrieval works for every client you might
        end up shipping into. Contextualise the index,
        add a reranker, run the four RAGAS metrics on
        every merge, and cap the hops. That is the
        Agentic RAG stack in mid-2026, and it is the
        first RAG shape that has felt genuinely
        production-shaped.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.anthropic.com/news/contextual-retrieval"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Introducing Contextual Retrieval
            (September 19, 2024)
          </a>
          {" "}- the indexing-side write-up with the 35%,
          49%, and 67% failed-retrieval reduction numbers,
          the prompt caching cost model, and the reference
          implementation.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2310.11511"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Self-RAG: Learning to Retrieve, Generate, and
            Critique through Self-Reflection (Asai et al.,
            October 2023)
          </a>
          {" "}- the paper that introduced the reflection
          token pattern and the training recipe on Llama-2.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2401.15884"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Corrective Retrieval Augmented Generation
            (Yan et al., January 2024)
          </a>
          {" "}- the CRAG paper with the retrieval evaluator,
          the three-verdict schema, and the web-search
          fallback design.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2403.14403"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adaptive-RAG: Learning to Adapt Retrieval-
            Augmented Large Language Models through Question
            Complexity (Jeong et al., March 2024)
          </a>
          {" "}- the router paper that framed the direct,
          single-hop, multi-hop routing decision as a
          learnable classifier.
        </li>
        <li>
          <a
            href="https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_agentic_rag/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph: Agentic RAG tutorial
          </a>
          {" "}- the reference open-source implementation
          combining a router, a grader, a rewriter, and a
          generator in one graph with checkpointing.
        </li>
        <li>
          <a
            href="https://docs.llamaindex.ai/en/stable/module_guides/workflow/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Agent Workflows documentation
          </a>
          {" "}- the event-driven agent framework with
          workflow steps, event fans, and the async
          execution model used in the LlamaIndex sample.
        </li>
        <li>
          <a
            href="https://docs.ragas.io/en/stable/concepts/metrics/index.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAGAS metrics reference
          </a>
          {" "}- the standard eval suite with context
          precision, context recall, faithfulness, and
          answer relevancy, plus the JSON dataset shape.
        </li>
        <li>
          <a
            href="https://modelcontextprotocol.io/docs/concepts/tools"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Model Context Protocol: Tools specification
          </a>
          {" "}- the search-and-fetch tool shape that Deep
          Research models and every major agent product
          consume, plus the auth and transport options.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2212.10496"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Precise Zero-Shot Dense Retrieval without
            Relevance Labels (HyDE, Gao et al., December
            2022)
          </a>
          {" "}- the original HyDE paper with the
          hypothetical document embedding technique and
          the recall numbers on BEIR and TREC.
        </li>
      </ul>
    </div>
  );
}
