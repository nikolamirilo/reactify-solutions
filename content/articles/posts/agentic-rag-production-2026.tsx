import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "agentic-rag-production-2026",
  title:
    "Agentic RAG in production 2026: routers, corrective loops, and the graph patterns that actually ship",
  excerpt:
    "Plain RAG hit a wall in 2024. By 2026 the shape that survives real workloads is agentic: a router that picks retrieval strategies, a grader that rejects bad chunks, a rewriter that repairs the query, and, for global questions, a graph index instead of a flat vector store. This is the field guide - the five patterns (Adaptive, Corrective, Self, Speculative, Graph), the code you write in LangGraph and LlamaIndex, the managed paths on Bedrock and Vertex AI, and the honest cost and latency picture.",
  metaDescription:
    "A practical, technical guide to Agentic RAG in 2026. Covers the five production patterns (Adaptive-RAG, Corrective RAG, Self-RAG, Speculative RAG, GraphRAG), the router-grader-rewriter architecture, LangGraph and LlamaIndex reference implementations, Bedrock Knowledge Bases with the Agentic Retriever, Vertex AI Search, LazyGraphRAG and LightRAG cost improvements, the RAGAS and TruLens evaluation stack, and the real trade-offs against plain RAG and deep research agents.",
  image:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80",
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
    "Bedrock",
    "Vertex AI",
    "Production",
  ],
  publishDate: "2026-08-30",
  readingTime: "15 min read",
};

export default function AgenticRagProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Plain RAG - embed a corpus, top-k a query, stuff
        the chunks into a prompt - was the shape most teams
        shipped in 2023 and 2024. It works for narrow
        lookups on clean data. It falls over the moment the
        query has more than one part, the corpus has more
        than one shape, or the top-k pull happens to miss.
        By 2026 the pattern that survives real workloads is
        different. Retrieval sits inside an agent loop. A
        router picks the strategy. A grader rejects bad
        chunks. A rewriter repairs the query and tries
        again. And when the question is global - the kind
        that needs the whole corpus, not five paragraphs
        of it - a graph index does the work a flat vector
        store cannot. This is the field guide to that
        shape: the five patterns that keep showing up, the
        code you write to run them, and the trade-offs
        that decide when the agent loop is worth it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why agentic RAG became the default shape
      </h2>
      <p className="mb-6 leading-relaxed">
        Plain RAG treats retrieval as a one-shot step in
        front of the model. Ask a question, run one search,
        stuff the top chunks into the prompt, generate.
        Agentic RAG puts retrieval inside the model&rsquo;s
        loop. The agent decides whether to retrieve at all,
        what to search for, whether the results are good
        enough, and what to do if they are not. That single
        change turns retrieval from a one-shot database
        query into a small research process the model runs
        for each request.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason the pattern took over is that plain RAG
        breaks on three predictable classes of query. Multi
        part questions (compare X and Y across three
        dimensions) need more than one retrieval. Ambiguous
        questions (what does our policy say about
        weekends?) need the model to rewrite the query
        before searching. Global questions (what are the
        main themes across this book?) need the whole
        corpus summarised, not five chunks pulled from it.
        A router in front of retrieval, plus a grader and
        rewriter behind it, handles all three without
        pushing the complexity into the prompt.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2025 survey work reads the same way. Singh et
        al. catalogue the shift in{" "}
        <em>Agentic Retrieval-Augmented Generation: A
        Survey on Agentic RAG</em> and land on a taxonomy
        that mirrors what production teams ship: single
        agent RAG (one router or grader), multi agent RAG
        (specialised sub-agents per source), and the
        graph-based variants that treat the corpus as a
        knowledge structure rather than a bag of chunks.
        The vendor stacks converged on the same shape in
        the same year. AWS shipped the Agentic Retriever
        for Bedrock Knowledge Bases. Google shipped the
        Vertex AI RAG Engine with agent-style
        orchestration. LangChain and LlamaIndex made
        agentic RAG the default tutorial. That is why the
        shape stuck.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The router, grader, rewriter loop
      </h2>
      <p className="mb-6 leading-relaxed">
        Every production agentic RAG system we have shipped
        or reviewed lands on the same four moving parts.
        The names change per framework. The parts do not.
      </p>
      <CodeBlock
        language="bash"
        filename="Agentic RAG: the shared four-part loop"
        code={`+---------------------------------------------------+
|  Router                                           |
|                                                   |
|   Query --> classifier --> [no retrieval]         |
|                        --> [vector search]        |
|                        --> [graph search]         |
|                        --> [web search]           |
|                        --> [SQL / structured]     |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  Retriever(s)                                     |
|                                                   |
|   BM25 + dense embeddings, fused with RRF,        |
|   optional cross-encoder rerank on the top N.     |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  Grader                                           |
|                                                   |
|   For each chunk: relevant? faithful to query?    |
|   Keep, drop, or flag as "not enough".            |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  Rewriter / fallback                              |
|                                                   |
|   If "not enough": rewrite the query, widen the   |
|   search, or fall back to web / graph / ask user. |
|   Otherwise: generate the answer with citations.  |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The router is a small model call that classifies
        the query. Adaptive-RAG, the NAACL 2024 paper by
        Jeong et al., trains a lightweight classifier that
        picks between no retrieval, single-step retrieval,
        and multi-step retrieval based on question
        complexity. In production the router does more than
        that: it picks the source too. A support question
        goes to the ticket vector store. A policy question
        goes to the compliance corpus. A number question
        goes to SQL. The point is the same: send the query
        to the right retriever, not to all of them.
      </p>
      <p className="mb-6 leading-relaxed">
        The retriever layer is where most teams still
        under-invest. The 2026 baseline is hybrid: BM25 for
        exact matches, dense embeddings for semantic
        matches, fused with Reciprocal Rank Fusion, then a
        cross-encoder rerank on the top N. On hard
        evaluation sets this configuration adds 5 to 15
        points of MRR over dense-only retrieval. If the
        retriever is weak, no amount of agent orchestration
        upstream will save the answer. Fix the retriever
        first, then add the agent loop.
      </p>
      <p className="mb-6 leading-relaxed">
        The grader is a per-chunk relevance check. Ask a
        small model, for each retrieved chunk: does this
        actually answer the question? Keep the relevant
        ones, drop the rest. If nothing survives, the
        rewriter takes over. This is where Corrective RAG
        earns its name. Yan et al. published the pattern in
        arXiv 2401.15884 in January 2024. A retrieval
        evaluator scores the chunks, and one of three
        actions fires: Correct (use them), Incorrect
        (throw them away, fall back to web search), or
        Ambiguous (mix in fallback sources). The pattern
        is plug and play against any RAG stack, which is
        why every framework now ships a version of it.
      </p>
      <p className="mb-6 leading-relaxed">
        The rewriter is the last resort. If retrieval kept
        missing, the query is probably the problem. Rewrite
        it to be more specific, split it into sub-queries,
        or expand it with related terms and try again. The
        rewriter is also where Self-RAG lives. Instead of
        rewriting the query, Self-RAG runs the generation
        step, then reflects on whether the answer is
        supported by the retrieved chunks. If not, it
        retrieves again with a refined query. In practice
        Corrective RAG and Self-RAG are close cousins, and
        production stacks usually run both: grade the
        chunks before generation, and reflect on the
        answer after.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The five patterns you actually ship
      </h2>
      <p className="mb-6 leading-relaxed">
        Framework docs list a dozen variants. Production
        stacks converge on five. Each one addresses a
        different failure mode of plain RAG, and most real
        systems combine two or three at once.
      </p>
      <ul className="mb-6 list-disc space-y-3 pl-6">
        <li>
          <strong>Adaptive-RAG (router)</strong>: a
          classifier decides between no retrieval, single
          step, or multi step. Cheap. Runs in front of
          everything else. The right first thing to build
          because it stops you from paying retrieval cost
          on questions that do not need it (small talk,
          model-knowledge answers) and stops you from
          under-retrieving on questions that need many
          passes.
        </li>
        <li>
          <strong>Corrective RAG (CRAG)</strong>: a grader
          scores retrieved chunks, and if the score is too
          low, the pipeline falls back to a broader search,
          usually web search. Fixes the failure mode where
          retrieval returns confidently wrong chunks and
          the model dutifully hallucinates from them. Best
          value in enterprises where the corpus has gaps.
        </li>
        <li>
          <strong>Self-RAG</strong>: after generation, the
          model reflects on whether the answer is grounded
          in the retrieved chunks. If not, it retrieves
          again with a better query. Adds latency, but on
          high-stakes domains (medical, legal, financial)
          the extra pass is worth the round trip.
        </li>
        <li>
          <strong>Speculative RAG</strong>: a small
          specialist model drafts several answers in
          parallel, each grounded in a different subset of
          retrieved chunks. A large generalist model then
          picks or merges the best draft. Wang et al. show
          this cuts latency by 50.83% and lifts accuracy by
          up to 12.97% on PubHealth versus conventional
          RAG. The pattern that matters when you need both
          quality and speed.
        </li>
        <li>
          <strong>GraphRAG (and LazyGraphRAG,
          LightRAG)</strong>: instead of retrieving chunks,
          you build a knowledge graph over the corpus and
          query it. This is the only pattern that handles
          global questions well - the ones plain RAG
          cannot answer because the answer is not in any
          single chunk. The trade-off used to be indexing
          cost. In 2026 that trade-off is largely gone.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LangGraph: the reference open-source loop
      </h2>
      <p className="mb-6 leading-relaxed">
        LangGraph is the framework most teams land on for
        agentic RAG because retrieval loops are cyclic and
        stateful, which is exactly what LangGraph is built
        for. The official agentic RAG tutorial defines a
        five-node loop: decide to retrieve, retrieve, grade
        the results, rewrite the query if the grade is
        low, and answer. The same shape underpins the
        production stacks we ship.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/graph.py"
        code={`from typing import Literal
from langgraph.graph import StateGraph, START, END
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Qdrant

llm = ChatOpenAI(model="gpt-5.5-mini", temperature=0)
grader = ChatOpenAI(model="gpt-5.5-mini", temperature=0)
retriever = Qdrant(...).as_retriever(
    search_type="mmr", search_kwargs={"k": 8}
)


def route(state) -> Literal["retrieve", "answer"]:
    """Adaptive-RAG router. Cheap classifier call."""
    msg = state["messages"][-1].content
    decision = llm.invoke(
        f"Does this need retrieval? Reply only yes/no.\\n{msg}"
    )
    return "retrieve" if "yes" in decision.content.lower() else "answer"


def retrieve(state):
    query = state["query"]
    docs = retriever.invoke(query)
    return {"docs": docs}


def grade(state) -> Literal["answer", "rewrite"]:
    """CRAG grader. Drop irrelevant chunks."""
    kept = []
    for d in state["docs"]:
        score = grader.invoke(
            f"Is this chunk relevant to '{state['query']}'? yes/no.\\n{d.page_content}"
        )
        if "yes" in score.content.lower():
            kept.append(d)
    if not kept:
        return "rewrite"
    state["docs"] = kept
    return "answer"


def rewrite(state):
    """Ask the model to specialise the query and try again."""
    new_q = llm.invoke(
        f"Rewrite this query to be more specific:\\n{state['query']}"
    )
    return {"query": new_q.content}


def answer(state):
    context = "\\n\\n".join(d.page_content for d in state.get("docs", []))
    return {"answer": llm.invoke(
        f"Answer using the context.\\nContext:\\n{context}\\nQ: {state['query']}"
    ).content}


g = StateGraph(dict)
g.add_node("retrieve", retrieve)
g.add_node("rewrite", rewrite)
g.add_node("answer", answer)
g.add_conditional_edges(START, route, {"retrieve": "retrieve", "answer": "answer"})
g.add_conditional_edges("retrieve", grade, {"answer": "answer", "rewrite": "rewrite"})
g.add_edge("rewrite", "retrieve")
g.add_edge("answer", END)

app = g.compile()`}
      />
      <p className="mb-6 leading-relaxed">
        Three details in this graph carry most of the
        production weight. First, the router runs on a
        cheap model. The classifier call is per request
        and per retrieval decision, so pinning it to a
        small model like GPT-5.5-mini or Claude Haiku 4.5
        saves real money at volume. Second, the grader
        runs one call per chunk. Batch them or run them
        in parallel, do not loop synchronously - a slow
        grader is the single most common cause of a slow
        agentic RAG stack. Third, put a hard cap on
        rewrite loops. Two is enough. Three is the point
        where you should fall back to web search or ask
        the user for clarification, not spin longer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex: workflows and query-engine tools
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex takes the same building blocks and
        packages them differently. Its 2026 shape is
        event-driven workflows, where each step emits an
        event that triggers the next step. Agentic RAG in
        LlamaIndex usually means wrapping one or more
        query engines as tools and giving them to a
        FunctionAgent. The agent decides which tool to
        call for each query. Multi-source retrieval falls
        out of the design for free.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/llamaindex_workflow.py"
        code={`from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.core.agent import FunctionAgent
from llama_index.core.tools import QueryEngineTool
from llama_index.llms.anthropic import Anthropic

llm = Anthropic(model="claude-sonnet-5")

# Two corpora, two engines.
policies = VectorStoreIndex.from_vector_store(policies_store)
tickets = VectorStoreIndex.from_vector_store(tickets_store)

policy_tool = QueryEngineTool.from_defaults(
    query_engine=policies.as_query_engine(similarity_top_k=6),
    name="policy_search",
    description=(
        "Search internal HR and compliance policies. "
        "Use for questions about company rules, benefits, or leave."
    ),
)
ticket_tool = QueryEngineTool.from_defaults(
    query_engine=tickets.as_query_engine(similarity_top_k=8),
    name="ticket_search",
    description=(
        "Search resolved support tickets and postmortems. "
        "Use for how-do-I and past-incident questions."
    ),
)

agent = FunctionAgent(
    tools=[policy_tool, ticket_tool],
    llm=llm,
    system_prompt=(
        "You are a support assistant. Route each question to the "
        "single most relevant tool. Only call multiple tools if the "
        "question clearly spans both domains. Cite the source of each "
        "claim."
    ),
)

response = await agent.run(
    "What is our on-call rotation policy and how have we handled "
    "escalation issues in the past?"
)
print(response)`}
      />
      <p className="mb-6 leading-relaxed">
        The LlamaIndex framing has one property worth
        keeping: routing between tools is not a separate
        classifier, it is the agent&rsquo;s native
        function-calling loop. That is fine when the
        source count is small and the descriptions are
        crisp. It stops scaling when you have 20 or 30
        sources - the model burns tokens reading tool
        descriptions on every call. At that scale we
        switch to an explicit router (Adaptive-RAG style)
        that runs a small classifier first and only passes
        the shortlisted tools to the main agent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        GraphRAG in 2026: the cost problem got solved
      </h2>
      <p className="mb-6 leading-relaxed">
        Microsoft&rsquo;s GraphRAG landed in July 2024 and
        made a real point: for global questions - the
        kind that need the whole corpus, not five chunks -
        knowledge graphs beat vector search by a wide
        margin. It also made a real problem: indexing a
        large corpus into a graph plus community summaries
        cost thousands of dollars in LLM calls. The
        original paper flagged a $33K indexing bill for a
        large enterprise corpus. That number kept most
        teams away.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2026 story is that the cost problem is
        essentially solved. Microsoft Research shipped
        LazyGraphRAG in late 2024 and iterated through
        2025. It cuts GraphRAG&rsquo;s indexing cost to
        about 0.1% of the original while beating it on
        both local and global queries. LightRAG, an
        academic system that ships as an MIT-licensed
        library, gets to the same cost regime with a
        different technique. Fast GraphRAG published
        numbers showing a 6x cost cut on a Wizard of Oz
        benchmark, and the ratio grows with corpus size.
        By mid-2026 the practical rule is that a graph
        index costs roughly what embedding the same corpus
        for vector RAG costs, not orders of magnitude
        more.
      </p>
      <p className="mb-6 leading-relaxed">
        Microsoft&rsquo;s original GraphRAG repo is in
        maintenance mode now - the team&rsquo;s energy
        moved to LazyGraphRAG - but the pattern lives on
        across every managed platform. The shape is
        stable:
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Extract entities and relationships from the
          corpus with an LLM. Deduplicate. Build a graph.
        </li>
        <li>
          Run community detection (Leiden or a variant) to
          cluster entities.
        </li>
        <li>
          Summarise each community at multiple
          resolutions. LazyGraphRAG skips this step at
          index time and does it lazily at query time,
          which is where most of the cost saving comes
          from.
        </li>
        <li>
          At query time, pick the right resolution for the
          question. Local questions use the fine-grained
          graph. Global questions use the top-level
          community summaries.
        </li>
      </ol>
      <p className="mb-6 leading-relaxed">
        The pattern we recommend on client engagements is
        simple: vector RAG for local questions, GraphRAG
        for global questions, and a router in front that
        picks between them. This gives you the strengths
        of both without paying the indexing cost of a
        fully populated graph on a corpus that rarely gets
        global queries. LlamaIndex, LangGraph, and Bedrock
        Knowledge Bases all now support this hybrid mode.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The managed path: Bedrock Agentic Retriever and
        Vertex AI Search
      </h2>
      <p className="mb-6 leading-relaxed">
        The build-or-buy question comes up on every
        engagement. Bedrock Knowledge Bases and Vertex AI
        Search have both grown into full agentic RAG
        platforms in 2026, and for a lot of workloads they
        are the right answer. Bedrock&rsquo;s Agentic
        Retriever, released as an optional feature on
        Knowledge Bases, plans and runs multi-step queries
        across sources on its own, exposes itself over
        MCP, and integrates with Bedrock Guardrails and
        Agents. Vertex AI Search plays the same role on
        Google Cloud with tight connectors into Drive,
        BigQuery, Cloud Storage, Cloud SQL, and web crawl.
      </p>
      <CodeBlock
        language="python"
        filename="src/agentic_rag/bedrock_agentic_retriever.py"
        code={`import boto3

bedrock = boto3.client("bedrock-agent-runtime")

response = bedrock.retrieve_and_generate(
    input={
        "text": (
            "Compare our 2025 and 2026 leave policies for engineering "
            "and cite the specific clauses."
        )
    },
    retrieveAndGenerateConfiguration={
        "type": "KNOWLEDGE_BASE",
        "knowledgeBaseConfiguration": {
            "knowledgeBaseId": "KB-9F72...",
            "modelArn": (
                "arn:aws:bedrock:us-east-1::"
                "foundation-model/anthropic.claude-opus-4-8-v1:0"
            ),
            "retrievalConfiguration": {
                "vectorSearchConfiguration": {
                    "numberOfResults": 12,
                },
                "orchestrationConfiguration": {
                    "queryTransformationConfiguration": {
                        "type": "AGENTIC",
                    },
                },
            },
        },
    },
)

print(response["output"]["text"])
for c in response["citations"]:
    print(c["retrievedReferences"])`}
      />
      <p className="mb-6 leading-relaxed">
        The Bedrock agentic path buys you a lot: chunking,
        embedding, vector store, hybrid search, rerank,
        multi-step planning, and citation attribution, all
        without writing any of it. The trade-off is
        control. You cannot swap the reranker, you cannot
        fine-tune the router, and you pay per retrieval
        call plus the model tokens. For most enterprise
        workloads this is fine. For high-volume consumer
        apps, or for teams that need on-prem inference,
        the self-hosted LangGraph or LlamaIndex path still
        wins on cost per query and on flexibility.
      </p>
      <p className="mb-6 leading-relaxed">
        The rule we follow: start on the managed platform
        for the prototype, prove the value with real
        users, and only move to a self-hosted stack when
        you hit a real reason to. Data residency, cost per
        query at scale, or a retrieval strategy that the
        managed platform does not support are the usual
        reasons. Most projects never hit one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation: what stops you from shipping worse
      </h2>
      <p className="mb-6 leading-relaxed">
        Agentic RAG has one property that makes it harder
        to trust than plain RAG: the pipeline changes per
        query. The router picks a different strategy, the
        grader drops different chunks, the rewriter fires
        or does not. A single golden test set no longer
        covers the surface. The evaluation stack that
        every mature team we work with runs by mid-2026
        breaks into three layers.
      </p>
      <p className="mb-6 leading-relaxed">
        Offline scoring uses RAGAS or DeepEval. The metric
        set is well settled: context precision and recall
        for retrieval, faithfulness and answer relevancy
        for generation, plus answer correctness against a
        golden set where you have one. Run these on a
        curated eval set as part of CI, and gate
        deployments on the numbers not regressing.
      </p>
      <p className="mb-6 leading-relaxed">
        Production monitoring uses TruLens or an
        OpenTelemetry pipeline to your own store. Every
        run gets a trace: which route the router picked,
        which chunks the grader kept or dropped, whether
        the rewriter fired, which model answered, and how
        long each step took. When a user reports a bad
        answer, the trace is what tells you which node
        failed. Without traces, agentic RAG is a black
        box, and a black box you cannot debug is a
        product you cannot ship confidently.
      </p>
      <p className="mb-6 leading-relaxed">
        Human review is the last layer and the one teams
        keep skipping. A sample of production runs each
        week, reviewed by a domain expert, catches the
        failures your metrics do not. In our experience
        this is where 60% of the real bugs come from:
        subtle grader drift, a router that started sending
        legal questions to the support tool, a chunk
        boundary that split an important clause. Metrics
        surface the pattern once it has scaled. Human
        review catches it early.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Fix the retriever before you add
        agents</strong>. Most agentic RAG failures are
        retrieval failures dressed up as agent failures.
        Get hybrid search plus a reranker working, tune
        chunking on your actual corpus, and only then wire
        in the router and grader. Adding an agent loop on
        top of weak retrieval buys you slower wrong
        answers, not better ones.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Pin the model per node, not per
        pipeline</strong>. The router runs on a small
        cheap model (Haiku 4.5, GPT-5.5-mini, Gemini
        Flash). The grader runs on the same tier because
        it is per-chunk and volume matters. The generator
        runs on your best model because that is the
        answer. Using one model for everything is a
        rounding-error saving on some nodes and a serious
        cost on others.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Cap the loop</strong>. Two rewrite
        rounds is the ceiling in our experience. Beyond
        that, fall back to web search, ask the user for
        clarification, or return the best partial answer
        with a warning. An agent that spirals through six
        retrievals is not being thorough, it is being
        expensive.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Route to the right corpus, not to all
        of them</strong>. When you have more than two
        sources, an explicit router beats letting the
        agent pick tools from a long list. The router
        does one cheap classification call, the main
        agent gets a shortlist, tool-choice tokens drop by
        an order of magnitude. This is the pattern that
        keeps agentic RAG cost tractable at scale.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Make the grader adversarial</strong>.
        The grader&rsquo;s prompt should ask &ldquo;is
        this chunk relevant AND not misleading?&rdquo;,
        not &ldquo;is it somewhat related?&rdquo;. A soft
        grader keeps garbage. A strict grader gets rid of
        it and forces the pipeline into the fallback path,
        which is what you want when the corpus is weak on
        a topic.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Trace every call, log every
        decision</strong>. The router decision, the raw
        retrieval results, the grader verdict per chunk,
        the rewritten query, the final prompt, the model
        response. All of it. If you skip this and a user
        reports a bad answer, you cannot reconstruct what
        happened. LangSmith and TruLens both handle this
        cleanly; a home-grown OpenTelemetry stack works
        too.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Use GraphRAG for global questions
        only</strong>. Building a graph index for a
        corpus that gets local-lookup questions is
        expensive theatre. Add it as a second retriever
        when the eval set shows the router is dropping
        global-scope queries, not before.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>What agentic RAG buys you</strong>.
        Robustness on multi-part queries, because the
        router fans out to more than one source.
        Robustness on retrieval misses, because the grader
        rejects bad chunks and the rewriter tries again.
        Coverage of global questions, when you add
        GraphRAG as a second retriever. Cited answers,
        because each chunk carries source metadata that
        survives the loop. And a natural evaluation
        surface: every node produces a trace you can
        inspect and score.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>What it costs you</strong>. Latency,
        because every extra call is another round trip. A
        plain RAG answer runs in one to two seconds. An
        agentic RAG answer with a router, grader, and one
        rewrite round runs in three to eight. Money,
        because every extra call is more tokens. Even
        with cheap models on the router and grader, a
        real workload costs two to four times what plain
        RAG does. Complexity, because a graph of nodes
        with retries and fallbacks is a system with more
        failure modes than a single retrieval-plus-answer
        call. Traces, evals, and clear caps on loop depth
        are how you keep the complexity from turning into
        a maintenance burden.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When to use plain RAG</strong>. The corpus
        is clean and narrow, the queries are single-part
        lookups, latency matters more than robustness, and
        the cost per query needs to be tiny. Product
        search, FAQ bots, single-source policy lookup, and
        anything where the retrieval hit rate on a golden
        set is already above 90% do not need the agent
        loop.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When to use deep research
        instead</strong>. The question is open-ended, the
        expected answer is a long-form report, and the
        user is willing to wait minutes and pay dollars
        per query. Legal research, market analysis, and
        due diligence are deep research territory, not
        agentic RAG. Deep research is agentic RAG&rsquo;s
        older cousin: same shape, longer horizon, higher
        cost. See our{" "}
        <a
          href="/articles/deep-research-agents-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          Deep Research agents article
        </a>{" "}
        for that pattern.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends through the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>MCP as the standard retriever
        interface</strong>. Every managed platform now
        exposes its retriever as an MCP server. That means
        the same agent can pull from Bedrock Knowledge
        Bases, Vertex AI Search, and an internal LangGraph
        stack through one interface. The knock-on effect
        is that agentic RAG becomes a client-side pattern
        as much as a server-side one. See our{" "}
        <a
          href="/articles/mcp-production-ai-integrations-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          MCP in production article
        </a>{" "}
        for the protocol details.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Small specialist models on the
        grader</strong>. The router and the grader are
        volume nodes: they run on every query and every
        chunk. Fine-tuned small models (Phi-4-mini,
        Qwen3-4B, Gemma 3 4B) already beat frontier models
        on these narrow classification tasks at a fraction
        of the cost. Expect the volume nodes to move
        off-frontier over the next 12 months.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Graph indexes as a default second
        retriever</strong>. Now that LazyGraphRAG and
        LightRAG have cut the indexing cost to the same
        order of magnitude as vector RAG, the reason to
        not add a graph index has mostly gone away. The
        pattern we expect to see across most enterprise
        stacks by end of 2026 is dual-index: vector for
        local, graph for global, router picks.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-encoder rerankers get
        cheaper</strong>. Cohere, Voyage, and Jina all
        shipped smaller reranker models in 2025 and 2026
        that keep 90%+ of the quality at a fraction of
        the token cost. The rerank step, which used to be
        the second most expensive node in a hybrid
        retrieval stack, is no longer an obvious skip.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Retrieval and generation stop being two
        different steps</strong>. Reasoning models like
        o4, Claude Opus 4.8, and Gemini 3 Pro increasingly
        run retrieval calls as part of their thinking
        loop, not as a pre-generation step. The
        distinction between agentic RAG and a reasoning
        model with a search tool blurs. Expect the middle
        layer of frameworks to converge on a single
        abstraction.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the shape is stable, the choices are
        yours
      </h2>
      <p className="mb-6 leading-relaxed">
        The shape of a production agentic RAG stack in
        2026 is settled: a router that classifies the
        query, one or more retrievers with hybrid search
        and rerank, a grader that scores chunks and
        rejects the bad ones, a rewriter that fixes the
        query when retrieval misses, and a single-shot
        generation call with citations. Underneath, the
        patterns are Adaptive-RAG for routing, Corrective
        RAG for grading, Self-RAG for reflection,
        Speculative RAG for latency, and GraphRAG for
        global questions. You pick the mix your workload
        needs and skip the rest.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy question breaks the same way it
        does for deep research. Buy - Bedrock Knowledge
        Bases with the Agentic Retriever or Vertex AI
        Search - when you want the pattern shipped in
        weeks, the corpus lives on the same cloud, and
        the workload does not need a specialised
        retrieval strategy. Build with LangGraph or
        LlamaIndex when you need control over routing and
        graders, when the deployment target is your own
        VPC, or when the model choice matters. Most teams
        we work with start managed, then move parts to
        self-hosted as a specific pain point earns the
        migration.
      </p>
      <p className="mb-6 leading-relaxed">
        What has actually changed in 2026 is not the idea
        of putting retrieval inside an agent loop. That
        was already the direction in 2024. What changed
        is that the pattern is now cheap enough, fast
        enough, and well-tooled enough to be the default.
        Plain RAG is what you write when you are certain
        the queries are narrow and the corpus is clean.
        Agentic RAG is what you write when you are not.
        On most real workloads, you are not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arxiv.org/abs/2401.15884"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yan et al. - Corrective Retrieval Augmented
            Generation (arXiv 2401.15884, January 2024)
          </a>
          {" "}- the original CRAG paper, with the
          retrieval evaluator design, the three action
          categories, and the decompose-then-recompose
          filter.
        </li>
        <li>
          <a
            href="https://aclanthology.org/2024.naacl-long.389/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jeong et al. - Adaptive-RAG (NAACL 2024)
          </a>
          {" "}- the paper that formalises the router
          pattern, with a lightweight classifier that
          picks between no retrieval, single-step, and
          multi-step retrieval.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2407.08223"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wang et al. - Speculative RAG (arXiv 2407.08223,
            ICLR 2025)
          </a>
          {" "}- the pattern that drafts several answers
          in parallel from different retrieval subsets,
          with 12.97% accuracy gain and 50.83% latency
          cut on PubHealth.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2501.09136"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Singh et al. - Agentic Retrieval-Augmented
            Generation: A Survey on Agentic RAG (arXiv
            2501.09136, January 2025)
          </a>
          {" "}- the taxonomy paper that catalogues
          single-agent, multi-agent, and graph-based
          agentic RAG.
        </li>
        <li>
          <a
            href="https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Research - LazyGraphRAG: setting a
            new standard for quality and cost
          </a>
          {" "}- the writeup that cut GraphRAG indexing
          cost to about 0.1% while beating it on both
          local and global queries.
        </li>
        <li>
          <a
            href="https://github.com/microsoft/graphrag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            microsoft/graphrag on GitHub
          </a>
          {" "}- the reference implementation of the
          original GraphRAG pipeline, now in maintenance
          mode as the Microsoft team moves to
          LazyGraphRAG.
        </li>
        <li>
          <a
            href="https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_agentic_rag/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph - Agentic RAG tutorial
          </a>
          {" "}- the reference five-node loop (decide,
          retrieve, grade, rewrite, answer) that the code
          above is built on.
        </li>
        <li>
          <a
            href="https://docs.llamaindex.ai/en/stable/understanding/agent/rag_agent/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex - Building an agent with RAG
          </a>
          {" "}- the QueryEngineTool plus FunctionAgent
          pattern for multi-source agentic RAG.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/bedrock/knowledge-bases/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS - Bedrock Knowledge Bases
          </a>
          {" "}- the managed RAG platform with the
          Agentic Retriever for multi-step queries and
          MCP exposure.
        </li>
        <li>
          <a
            href="https://cloud.google.com/vertex-ai-search"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud - Vertex AI Search
          </a>
          {" "}- the equivalent managed platform on GCP,
          with connectors into Drive, BigQuery, Cloud
          Storage, Cloud SQL, and web crawl.
        </li>
        <li>
          <a
            href="https://docs.ragas.io/en/stable/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAGAS documentation
          </a>
          {" "}- the offline evaluation framework for
          context precision, context recall, faithfulness,
          and answer relevancy.
        </li>
        <li>
          <a
            href="https://www.trulens.org/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            TruLens
          </a>
          {" "}- the production-monitoring counterpart,
          with feedback functions and OpenTelemetry
          tracing for agentic RAG runs.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG with Next.js, LangChain, and the Vercel AI
            SDK
          </a>
          {" "}- the plain-RAG implementation article to
          pair with this one as the starting point before
          the agent loop.
        </li>
        <li>
          <a
            href="/articles/deep-research-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Deep Research agents in production 2026
          </a>
          {" "}- the deeper, longer-horizon cousin of
          agentic RAG, for report-length answers.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the framework that sits under the
          reference LangGraph agentic RAG loop.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol every managed retriever now
          exposes.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that agentic
          RAG runs need in production.
        </li>
      </ul>
    </div>
  );
}
