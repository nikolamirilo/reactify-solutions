import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "llamaindex-workflows-agents-production-2026",
  title:
    "LlamaIndex Workflows and Agents in production 2026: from event-driven orchestration to LlamaAgents and llama-deploy",
  excerpt:
    "How LlamaIndex became an event-driven agent framework. Covers the Workflows 1.0 release in June 2025, AgentWorkflow for multi-agent handoffs, FunctionAgent and ReActAgent, typed state and resource injection, llama-deploy microservices, and the LlamaAgents document stack with llamactl.",
  metaDescription:
    "A practical, technical guide to LlamaIndex Workflows and Agents in 2026. Covers the Workflows 1.0 standalone package, event-driven steps and typed state, AgentWorkflow with FunctionAgent and ReActAgent handoffs, streaming and human-in-the-loop, llama-deploy microservice deployment, LlamaAgents with llamactl and LlamaCloud, LlamaParse document processing, and honest trade-offs against LangGraph and OpenAI Agents SDK.",
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
    "LlamaIndex",
    "Workflows",
    "AgentWorkflow",
    "LlamaParse",
    "LlamaCloud",
    "Python",
    "TypeScript",
    "Production",
    "Document AI",
  ],
  publishDate: "2026-08-11",
  readingTime: "15 min read",
};

export default function LlamaIndexWorkflowsAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        LlamaIndex started life as a data framework
        for retrieval. Two years later, it is one of the
        most opinionated agent stacks in production.
        The turning point was Workflows, an
        event-driven orchestration layer that shipped in
        beta in August 2024, went 1.0 as a standalone
        package on June 30, 2025, and then absorbed
        every other primitive in the library.
        AgentWorkflow sits on top of it for multi-agent
        handoffs. llama-deploy runs the workflows as
        microservices. LlamaAgents packages it all with
        the LlamaParse document stack for real business
        use cases. This article is how we ship
        LlamaIndex on client work in 2026: what the
        pieces are, when to reach for each one, and
        where the trade-offs land compared to LangGraph
        or the OpenAI Agents SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why LlamaIndex changed shape
      </h2>
      <p className="mb-6 leading-relaxed">
        The classic pitch for LlamaIndex was retrieval.
        Load documents, chunk them, embed them, query
        them with a query engine. That story is still
        there, but it is no longer the reason teams pick
        the framework. The reason is that a production
        agent is rarely one LLM call. It is a graph of
        steps that route work, run tools in parallel,
        pause for a human, and resume when the state is
        ready. Chains and single-shot agents cannot hold
        that shape. Workflows can.
      </p>
      <p className="mb-6 leading-relaxed">
        LlamaIndex made a deliberate choice with
        Workflows: event-driven, not graph-based. You
        do not declare a DAG in advance. You write
        Python or TypeScript steps that consume events
        and emit new events. The runtime schedules them.
        If two events land at the same time, two steps
        run in parallel. If a step needs to wait for a
        human, it pauses the workflow and resumes when
        the answer arrives. The mental model is closer
        to an actor system than to a pipeline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>June 2024</strong>: LlamaIndex ships
          llama-agents, an early microservice pattern
          for deploying multi-agent systems.
        </li>
        <li>
          <strong>August 2024</strong>: Workflows launches
          in beta as an event-driven layer inside
          llama_index. The core abstractions land:
          steps, events, StartEvent, StopEvent, and
          Context.
        </li>
        <li>
          <strong>October 2024</strong>: llama-deploy is
          released. It folds llama-agents into a
          microservice runtime that turns workflows into
          scalable services with a control plane, a
          message queue, and a client.
        </li>
        <li>
          <strong>January 2025</strong>: AgentWorkflow
          ships. Built on top of Workflows, it wraps
          FunctionAgent and ReActAgent with multi-agent
          handoffs, shared Context state, and event
          streaming.
        </li>
        <li>
          <strong>June 30, 2025</strong>: Workflows 1.0
          releases as a standalone package. Python moves
          to llama-index-workflows, TypeScript to
          @llamaindex/workflow-core. The release adds
          typed state, resource injection, and
          OpenTelemetry-based observability through
          llama-index-instrumentation.
        </li>
        <li>
          <strong>Late 2025</strong>: LlamaAgents open
          preview arrives. It ties Agent Workflows to
          LlamaParse and LlamaCloud, plus the llamactl
          CLI for init, serve, and deploy. Templates for
          SEC filings, invoice extraction, document Q&amp;A,
          and human-in-the-loop review ship out of the
          box.
        </li>
        <li>
          <strong>2026</strong>: LlamaIndex converges on
          the pattern the docs now call
          agent-as-workflow. The primitive is Workflows,
          the agent shapes are AgentWorkflow or a
          hand-written workflow, and the runtime is
          llama-deploy for self-hosted or LlamaCloud for
          managed.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core primitives: steps, events, Context
      </h2>
      <p className="mb-6 leading-relaxed">
        A Workflow is a Python or TypeScript class with
        methods marked as steps. Each step declares the
        event it consumes and the event it returns. The
        runtime routes events between steps by type. The
        first step consumes StartEvent, the last one
        returns StopEvent, and everything in between is
        a custom event you define. There is no explicit
        graph. The event types are the wiring.
      </p>
      <CodeBlock
        language="python"
        filename="src/workflows/basic_workflow.py"
        code={`from llama_index_workflows import (
    Workflow, StartEvent, StopEvent, Event, step, Context,
)

class ResearchEvent(Event):
    topic: str

class ReportEvent(Event):
    draft: str

class ResearchWorkflow(Workflow):
    @step
    async def scope(self, ctx: Context, ev: StartEvent) -> ResearchEvent:
        await ctx.set("query", ev.get("query"))
        return ResearchEvent(topic=ev.get("query"))

    @step
    async def research(self, ctx: Context, ev: ResearchEvent) -> ReportEvent:
        findings = await gather_sources(ev.topic)
        await ctx.set("findings", findings)
        return ReportEvent(draft=await draft_report(findings))

    @step
    async def review(self, ctx: Context, ev: ReportEvent) -> StopEvent:
        polished = await review_and_polish(ev.draft)
        return StopEvent(result=polished)`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make this shape work at scale.
        First, steps are async by default, so the
        runtime can run any two steps whose events are
        both ready at the same time. Second, Context is
        the shared state store, and it is scoped to a
        single run, so two concurrent runs do not
        collide. Third, the runtime keeps track of the
        events in flight, so a step can wait for two
        different events to arrive before it fires,
        which is how you build parallel fan-out and
        fan-in without a coordinator step.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Typed state and resource injection: what changed
        in 1.0
      </h2>
      <p className="mb-6 leading-relaxed">
        The 1.0 release keeps the event model intact but
        adds two production features that were painful
        to work around in the beta. Typed state gives
        you a Pydantic model that describes the whole
        Context, so state reads and writes are checked
        at authoring time and IDE autocomplete works.
        Resource injection lets you declare dependencies
        that the runtime supplies at each step, so a
        database client, an LLM instance, or a search
        client does not have to be a global singleton
        or a closure.
      </p>
      <CodeBlock
        language="python"
        filename="src/workflows/typed_state.py"
        code={`from pydantic import BaseModel
from llama_index_workflows import Workflow, Context, step

class ResearchState(BaseModel):
    query: str = ""
    findings: list[str] = []
    citations: list[str] = []

class ResearchWorkflow(Workflow):
    # Context is now typed. Reads and writes go through
    # a Pydantic-backed state store.
    @step
    async def load(
        self,
        ctx: Context[ResearchState],
        ev: StartEvent,
        db: Resource[VectorDB],
    ) -> ResearchEvent:
        state = await ctx.get_state()
        state.query = ev.get("query")
        state.findings = await db.top_k(state.query, k=10)
        await ctx.set_state(state)
        return ResearchEvent(topic=state.query)`}
      />
      <p className="mb-6 leading-relaxed">
        The reason to care about resource injection is
        testing. In the beta, a workflow that reached
        for a global LLM client was a pain to unit test,
        because you had to patch the module. In 1.0 you
        pass a fake resource into the run call and the
        step receives the fake. That is a small change
        with a large impact on how testable a workflow
        is when it grows to a dozen steps.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AgentWorkflow: multi-agent handoffs on top of
        Workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        AgentWorkflow is the higher-level abstraction
        for multi-agent systems. It is a Workflow under
        the hood, so all the event and state semantics
        carry over, but the writing surface is agents
        with tools, a root agent, and handoff rules.
        Each agent can answer the request directly,
        call a tool, or hand off to another agent
        better suited for the task. The framework
        supports two agent classes: FunctionAgent for
        LLMs with native function calling, and
        ReActAgent for models that reason through
        thought-action-observation cycles instead.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/research_team.py"
        code={`from llama_index.core.agent.workflow import (
    AgentWorkflow, FunctionAgent,
)

research_agent = FunctionAgent(
    name="ResearchAgent",
    description="Searches and analyzes information from many sources.",
    system_prompt=(
        "You are a thorough researcher. Use search_web to gather "
        "evidence. Call record_notes for every fact you plan to use. "
        "Hand off to WriteAgent once you have five distinct sources."
    ),
    tools=[search_web, record_notes],
    can_handoff_to=["WriteAgent"],
)

write_agent = FunctionAgent(
    name="WriteAgent",
    description="Writes a clear, cited report from research notes.",
    system_prompt=(
        "Write a report in markdown using the notes in state. "
        "Cite every claim with a URL. Hand off to ReviewAgent."
    ),
    tools=[write_report],
    can_handoff_to=["ReviewAgent", "ResearchAgent"],
)

review_agent = FunctionAgent(
    name="ReviewAgent",
    description="Checks the report for accuracy and asks for edits.",
    system_prompt=(
        "Read the draft. If any claim is not backed by a note in "
        "state, hand back to WriteAgent with a specific request."
    ),
    tools=[review_report],
    can_handoff_to=["WriteAgent"],
)

workflow = AgentWorkflow(
    agents=[research_agent, write_agent, review_agent],
    root_agent="ResearchAgent",
    initial_state={
        "research_notes": {},
        "report_draft": "",
        "review_feedback": "",
    },
)`}
      />
      <p className="mb-6 leading-relaxed">
        The two rules that matter for a system like this
        to behave. First, keep the handoff surface
        narrow. If every agent can hand off to every
        other agent, the router LLM spends too many
        tokens deciding, and edge cases pile up. Second,
        put the state schema in initial_state, not in
        each system prompt. Tools read and write the
        shared Context, so a well-shaped state field is
        the coordination signal, not prose in the
        prompt. The Anthropic engineering post on
        multi-agent research systems lands on the same
        pair of rules, and every framework that survives
        contact with production converges on them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Streaming, tool calls, and human-in-the-loop
      </h2>
      <p className="mb-6 leading-relaxed">
        A production agent needs three things a plain
        LLM call does not: the ability to stream tokens
        back to the UI while a run is in progress, the
        ability to show tool calls as they happen so the
        user can see what the agent is doing, and the
        ability to pause and wait for a human decision.
        AgentWorkflow ships all three as first-class
        events.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/streaming.py"
        code={`from llama_index.core.agent.workflow import (
    AgentInput, AgentStream, ToolCallResult,
    InputRequiredEvent, HumanResponseEvent,
)

handler = workflow.run(user_msg="Research quantum error correction in 2026")

async for event in handler.stream_events():
    if isinstance(event, AgentInput):
        print(f"\\n[{event.current_agent_name}] thinking...")
    elif isinstance(event, AgentStream):
        # Token-by-token output stream for the UI.
        yield event.delta
    elif isinstance(event, ToolCallResult):
        print(f"  tool={event.tool_name} -> {event.tool_output}")
    elif isinstance(event, InputRequiredEvent):
        # Pause the workflow and wait for the user.
        answer = await ask_user(event.prefix)
        handler.ctx.send_event(HumanResponseEvent(response=answer))`}
      />
      <p className="mb-6 leading-relaxed">
        Two things make this the right shape for a real
        product. First, the stream is a typed event
        channel, not a raw text delta. A UI can render
        the tool call as a card, the agent switch as a
        badge, and the token stream as text, all from
        the same handler. Second, human-in-the-loop is
        a pause on the workflow itself, so the run
        state is durable. The user can walk away, come
        back tomorrow, and the workflow resumes from
        where it stopped once you replay the
        HumanResponseEvent. That is a real feature, not
        a workaround.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deploying: llama-deploy as a microservice runtime
      </h2>
      <p className="mb-6 leading-relaxed">
        A workflow that works on a laptop still needs a
        production runtime. llama-deploy is the answer
        LlamaIndex ships. It runs each workflow as an
        independently scalable microservice, wires them
        together through a message queue, and manages
        state and sessions in a central control plane.
        The message queue is pluggable: Redis, Kafka,
        RabbitMQ, or the built-in SimpleMessageQueue for
        local development. The client speaks to the
        control plane, not to the workflows directly,
        which is what makes horizontal scaling and
        rolling upgrades safe.
      </p>
      <CodeBlock
        language="bash"
        filename="llama-deploy: the runtime shape"
        code={`+----------------+       publish       +---------------+
| Client         | ------------------> | Control Plane |
| (LlamaDeploy   | <---- result ------ |  (orchestrator|
|  client)       |                     |   + sessions) |
+----------------+                     +-------+-------+
                                               |
                                               v
                                       +---------------+
                                       | Message Queue |
                                       | (Redis, Kafka,|
                                       |  RabbitMQ,..) |
                                       +-------+-------+
                                               |
                    +--------------------------+-----------------------+
                    |                          |                       |
                    v                          v                       v
             +-------------+           +-------------+          +-------------+
             | Workflow    |           | Workflow    |          | Workflow    |
             | service #1  |           | service #2  |          | service #3  |
             | (research)  |           | (write)     |          | (review)    |
             +-------------+           +-------------+          +-------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The developer surface is short. You call
        deploy_core once to spin up the control plane
        and the message queue, then deploy_workflow for
        each workflow you want to expose. A workflow
        registered this way becomes an HTTP endpoint the
        client can invoke.
      </p>
      <CodeBlock
        language="python"
        filename="src/deploy/serve.py"
        code={`import asyncio
from llama_deploy import (
    deploy_core, deploy_workflow,
    ControlPlaneConfig, SimpleMessageQueueConfig,
    WorkflowServiceConfig, LlamaDeployClient,
)
from my_app.workflows import ResearchWorkflow

async def main():
    await deploy_core(
        control_plane_config=ControlPlaneConfig(),
        message_queue_config=SimpleMessageQueueConfig(),
    )
    await deploy_workflow(
        ResearchWorkflow(),
        WorkflowServiceConfig(
            host="0.0.0.0",
            port=8002,
            service_name="research",
        ),
        ControlPlaneConfig(),
    )

if __name__ == "__main__":
    asyncio.run(main())

# From the client side:
client = LlamaDeployClient(ControlPlaneConfig())
session = client.get_or_create_session("user-42")
result = session.run("research", query="post-quantum cryptography")`}
      />
      <p className="mb-6 leading-relaxed">
        The reason to reach for llama-deploy over a
        plain FastAPI wrapper is state. Each session in
        the control plane carries the workflow Context,
        so a follow-up call to the same session resumes
        the same run. That is the piece a chat app needs
        and that a plain HTTP server does not give you
        for free. For a stateless one-shot workflow, a
        FastAPI wrapper is fine. For anything that has
        turns, use llama-deploy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaAgents and llamactl: the document-agent
        shortcut
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaAgents is the higher-level product that
        packages Workflows with LlamaParse for document
        processing and gives you a CLI, llamactl, that
        turns the whole loop from template to production
        into three commands. It is the fastest path we
        know to a working document agent in a business
        setting, especially when the input is a stack of
        PDFs with tables, forms, and mixed layouts.
      </p>
      <CodeBlock
        language="bash"
        filename="llamactl: from template to production"
        code={`# 1. Pick a template. Ships with SEC insights,
#    invoice extraction, document Q&A, a review UI,
#    a human-in-the-loop template, and a blank slate.
$ llamactl init
? Select a template:
  > SEC Insights Agent
    Invoice Extraction Agent
    Extraction Agent with Review UI
    Document Q&A
    Human in the Loop Agent
    Basic API
    Basic UI

# 2. Serve it locally. The dev server hot reloads
#    workflow edits and resumes in-progress runs.
$ llamactl serve
INFO  workflow "extract" served at
      /deployments/sec-insights/workflows/extract/run

# 3. Push to production. LlamaCloud clones the repo,
#    builds it, and serves the workflow behind an API.
$ llamactl deploy create
? Name: sec-insights-prod
? Git repo: git@github.com:acme/sec-insights.git
? Branch: main
? Secrets: OPENAI_API_KEY, LLAMA_CLOUD_API_KEY`}
      />
      <p className="mb-6 leading-relaxed">
        The template repositories are not skeletons.
        They are working agents. The SEC Insights
        template, for example, classifies an incoming
        filing with LlamaClassify as a 10K, 10Q, or 8K,
        routes it to an extractor with a schema that
        matches the filing type, and then hands the
        result to a review UI where a human approves or
        edits the output. That whole flow is a few
        hundred lines of Python and a pyproject.toml
        that lists the workflows. You can rip the
        classifier out and put your own in, or swap the
        schema, without touching the routing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaParse, LlamaExtract, LlamaCloud: the data
        side of the story
      </h2>
      <p className="mb-6 leading-relaxed">
        A document agent is only as good as what it can
        read. LlamaIndex ships three managed services
        that plug into the workflow layer. LlamaParse is
        a VLM-based document parser that handles nested
        tables, embedded charts, and mixed layouts and
        returns clean markdown. LlamaExtract takes a
        schema and pulls structured JSON out of a PDF,
        with a Table Row mode that returns one JSON
        object per row for invoices and financial
        statements. LlamaCloud is the managed platform
        that hosts both, plus vector indexes and file
        storage.
      </p>
      <CodeBlock
        language="python"
        filename="src/data/extract_invoices.py"
        code={`from llama_cloud_services import LlamaExtract
from pydantic import BaseModel

class LineItem(BaseModel):
    description: str
    quantity: int
    unit_price: float
    total: float

class Invoice(BaseModel):
    invoice_number: str
    issued_at: str
    vendor: str
    line_items: list[LineItem]
    subtotal: float
    tax: float
    total: float

extractor = LlamaExtract().create_agent(
    name="invoice-extractor",
    data_schema=Invoice,
)

result = await extractor.aextract("./invoices/acme-2026-08.pdf")
invoice = Invoice(**result.data)`}
      />
      <p className="mb-6 leading-relaxed">
        The reason this matters for an agent stack is
        that the extractor call is a tool the agent can
        use, not a separate pipeline you have to run
        first. A FunctionAgent inside a Workflow can
        list files in a folder, call the extractor on
        each one, aggregate the results into a Pydantic
        model, and hand off to a review agent, all in
        the same run. That is the shape the SEC Insights
        and Invoice Extraction templates ship.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A concrete end-to-end example: an invoice
        triage agent
      </h2>
      <p className="mb-6 leading-relaxed">
        Here is the shape we use for a real back-office
        agent on client projects. It classifies incoming
        documents, extracts the ones that look like
        invoices, validates the totals, and pauses for a
        human whenever the confidence is low or the
        vendor is new.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/invoice_triage.py"
        code={`from llama_index_workflows import (
    Workflow, StartEvent, StopEvent, Event, Context, step,
)

class DocEvent(Event):
    path: str

class InvoiceEvent(Event):
    invoice: dict

class NeedsReviewEvent(Event):
    invoice: dict
    reason: str

class InvoiceTriage(Workflow):
    @step
    async def classify(self, ctx: Context, ev: StartEvent) -> DocEvent | StopEvent:
        kind = await classify_document(ev.get("path"))
        if kind != "invoice":
            return StopEvent(result={"skipped": ev.get("path"), "kind": kind})
        return DocEvent(path=ev.get("path"))

    @step
    async def extract(self, ctx: Context, ev: DocEvent) -> InvoiceEvent | NeedsReviewEvent:
        data = await extractor.aextract(ev.path)
        invoice = data.data
        if abs(sum_line_items(invoice) - invoice["total"]) > 0.01:
            return NeedsReviewEvent(invoice=invoice, reason="totals do not match")
        if await is_new_vendor(invoice["vendor"]):
            return NeedsReviewEvent(invoice=invoice, reason="new vendor")
        return InvoiceEvent(invoice=invoice)

    @step
    async def review(self, ctx: Context, ev: NeedsReviewEvent) -> InvoiceEvent:
        # Pause for a human. Resumes once the reviewer answers.
        ctx.write_event_to_stream(
            InputRequiredEvent(prefix=f"Approve invoice ({ev.reason})?")
        )
        answer = await ctx.wait_for_event(HumanResponseEvent)
        if not answer.approved:
            raise ValueError("Invoice rejected by reviewer")
        return InvoiceEvent(invoice=answer.corrected or ev.invoice)

    @step
    async def post(self, ctx: Context, ev: InvoiceEvent) -> StopEvent:
        posted = await post_to_accounting(ev.invoice)
        return StopEvent(result=posted)`}
      />
      <p className="mb-6 leading-relaxed">
        A few things about this shape are worth
        internalising. The classifier is a step, not a
        model call in the run wrapper. That means every
        run gets the same routing and the classifier
        can be swapped out or A/B tested without
        touching the caller. The review step is optional
        by construction: the extract step returns either
        an InvoiceEvent or a NeedsReviewEvent, and the
        review step only fires when the second event
        exists. There is no branching if statement in a
        driver script, because the event types are the
        wiring.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex versus LangGraph and the OpenAI
        Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        Every serious engagement now involves a
        framework choice. Three real options in 2026 are
        LlamaIndex Workflows, LangGraph, and the OpenAI
        Agents SDK. They overlap, but they land on
        different design points.
      </p>
      <p className="mb-6 leading-relaxed">
        LangGraph is graph-first. You declare nodes and
        edges, and the runtime walks the graph. The
        upside is that the shape of the agent is visible
        at a glance and the tooling around checkpointing
        and time travel is deeper than anywhere else.
        The downside is that dynamic fan-out that
        depends on run-time data is awkward, because the
        graph is fixed at construction time. Workflows
        express the same thing as an event that carries
        a list, and the runtime does the parallelism.
      </p>
      <p className="mb-6 leading-relaxed">
        The OpenAI Agents SDK is agent-first. You write
        an Agent, hand it tools, and the SDK runs the
        tool loop. It is the fastest path from zero to
        a working agent, especially if you are already
        on OpenAI. The trade-off is that the runtime is
        a tool loop, not a general orchestration engine.
        Anything more complex than agent-to-agent
        handoff (say, a workflow that fans out ten
        documents to a per-document sub-run and then
        aggregates) is easier to write in Workflows.
      </p>
      <p className="mb-6 leading-relaxed">
        LlamaIndex sits in the middle. Workflows give
        you the general orchestration engine, and
        AgentWorkflow gives you the agent shortcut on
        top. The document stack (LlamaParse,
        LlamaExtract, LlamaCloud) is a real advantage
        for anything that reads PDFs. If your product
        is a document agent or a research agent that
        needs the parser, LlamaIndex is where we start.
        If your product is a chat agent with tool calls
        against a REST API, the OpenAI Agents SDK is
        shorter to ship. If your product needs
        checkpoint-heavy long-running workflows with
        visible graph structure, LangGraph is still the
        stronger fit.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Keep steps small</strong>. A step
        that does one thing is easy to test and easy to
        swap. A step that calls three tools and updates
        five state fields is a maintenance problem in
        six months. Split it. The event types are cheap.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Use typed state from day one</strong>.
        The 1.0 typed state is worth the small
        migration cost. A workflow that grows past
        five steps without typed state ends up with a
        Context dictionary that no one knows the shape
        of. Pydantic-back the state and you get
        autocomplete, validation, and safe refactors.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Do not skip resource injection</strong>.
        Every external client (LLM, database, vector
        store, HTTP session) belongs in the resource
        layer, not as a module-level global. Testing a
        workflow that pulls its LLM from a global is
        painful. Passing a fake LLM into the run call
        is trivial.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Narrow the handoff surface</strong>.
        In AgentWorkflow, the default is that every
        agent can hand off to every other agent. This
        blows up the router token cost and the failure
        surface. Set can_handoff_to explicitly on every
        agent, and only include the agents the handoff
        makes sense for.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Prune tool output before it hits
        state</strong>. A search tool that returns
        thirty results should not push all thirty into
        Context. Have the tool summarise, or run a
        small model on the way back to compress the
        result to what the next step actually needs.
        Otherwise the Context becomes a garbage bin
        and every subsequent step pays for parsing it.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Instrument with the built-in
        observability</strong>. The 1.0 release ships
        llama-index-instrumentation with OpenTelemetry
        support. Wire it to Arize Phoenix or your own
        collector on day one. When a user reports a
        weird run, you will need the trace of every
        step, event, and tool call. Without a trace, a
        workflow with ten steps is a black box.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Deploy on llama-deploy when
        sessions matter</strong>. If the agent has
        turns (a chat, a review loop, a multi-step form),
        the control plane and session store are what
        you want. If the workflow is stateless
        (one-shot document extraction), a plain FastAPI
        wrapper around workflow.run is fine.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trade-offs and honest limits
      </h2>
      <p className="mb-6 leading-relaxed">
        The event-driven model is powerful and it is
        also the main learning curve. If a team is
        coming from LangChain chains or a plain
        function-calling loop, the mental model shift
        is real. Steps are not nodes in a pipeline,
        they are handlers for event types. New engineers
        on a team need a day to internalise this, and
        code review has to enforce it, because it is
        easy to fall back into imperative code inside a
        step and lose the benefits.
      </p>
      <p className="mb-6 leading-relaxed">
        The multi-agent story in AgentWorkflow is good,
        but not as opinionated as CrewAI or as
        graph-visible as LangGraph. If your product
        needs to show the user the exact plan the
        agents will follow before they run, you have to
        build that view yourself. If your product needs
        role-heavy agents with backstories and specific
        tools per role, CrewAI is a tighter fit out of
        the box. AgentWorkflow is the right pick when
        you want the flexibility of Workflows plus a
        clean handoff layer, not when you want a
        prescriptive agent role framework.
      </p>
      <p className="mb-6 leading-relaxed">
        The LlamaCloud story is compelling but ties you
        to a hosted service for the parsing and
        extraction parts. LlamaParse and LlamaExtract
        run on managed infrastructure. If your data
        cannot leave your VPC, you have to run the
        Workflows layer yourself and swap the parser
        for something like Docling or Unstructured. The
        Workflows part is fully open-source, so this is
        doable, but the polish of the document stack
        drops.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through the rest of
        2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Workflows as a general orchestration
        library outside LlamaIndex</strong>. The 1.0
        split into a standalone package was deliberate.
        Expect Workflows to show up in projects that
        have nothing to do with LlamaIndex retrieval,
        because the event model is a good general fit
        for anything that needs async, stateful
        pipelines. The TypeScript version is already
        being adopted for Node backends that only need
        the orchestration piece.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Deeper integration with the MCP
        ecosystem</strong>. Tools inside AgentWorkflow
        can already be MCP-backed. Watch for LlamaAgents
        templates that ship with the MCP servers
        wired in, so a document agent can reach an
        internal knowledge base or a CRM through the
        same interface a Claude or ChatGPT client
        would use. This is the direction the
        LlamaParse MCP work in 2025 points to.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-as-service in LlamaCloud</strong>.
        The llamactl deploy command already puts a
        workflow behind a managed API. Expect the
        LlamaCloud UI to grow a marketplace of
        pre-built agents (SEC filings, invoices, HR
        forms) that a business can install with a
        click, back with their own data, and run on
        the managed runtime. This is where the
        commercial motion is moving.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Better evals for multi-step
        workflows</strong>. Evaluating a workflow is
        harder than evaluating a single LLM call,
        because the right answer depends on the path,
        not just the final output. LlamaIndex has
        shipped a Retrieval Harness for the retrieval
        side. The natural next step is a Workflow
        Harness that replays events, checks step-level
        outputs against expectations, and reports on
        the trace. Watch for this in the second half
        of 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: pick Workflows for the general
        engine, AgentWorkflow for the agent shortcut,
        LlamaAgents for documents
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex in 2026 is three layers stacked.
        Workflows is the event-driven orchestration
        engine, and it is where every agent shape
        eventually lands. AgentWorkflow is the
        multi-agent shortcut built on top, with
        FunctionAgent and ReActAgent, typed handoffs,
        streaming, and human-in-the-loop as first-class
        events. LlamaAgents is the packaged story on
        top of that, with llamactl for local dev,
        LlamaCloud for managed deployment, and the
        LlamaParse and LlamaExtract stack for the
        document side.
      </p>
      <p className="mb-6 leading-relaxed">
        Where we start on a new engagement depends on
        the shape. If the product is a document agent,
        we start with a LlamaAgents template, keep the
        workflow scaffolding, and swap the pieces that
        matter for the customer. If the product is a
        custom agent that does not fit a template, we
        start with Workflows and either write a
        hand-rolled agent as a workflow or reach for
        AgentWorkflow when handoffs are on the table.
        The deployment target decides between plain
        FastAPI, llama-deploy, or LlamaCloud, in
        roughly that order of complexity. That is the
        LlamaIndex playbook we run in 2026, and the
        1.0 release plus the LlamaAgents open preview
        are what made it worth writing down.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.llamaindex.ai/blog/announcing-workflows-1-0-a-lightweight-framework-for-agentic-systems"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Announcing Workflows 1.0
            (June 30, 2025)
          </a>
          {" "}- the standalone-package launch post,
          with the typed state, resource injection,
          and observability additions.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-agentworkflow-a-powerful-system-for-building-ai-agent-systems"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing AgentWorkflow
          </a>
          {" "}- the multi-agent layer built on top of
          Workflows, with FunctionAgent, ReActAgent,
          handoff rules, and event streaming.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-llama-deploy-a-microservice-based-way-to-deploy-llamaindex-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing llama-deploy
          </a>
          {" "}- the microservice runtime for
          Workflows, with the control plane, the
          message queue, and the client model.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/llamaagents-build-serve-and-deploy-document-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: LlamaAgents Open Preview
          </a>
          {" "}- the document-agent stack that combines
          LlamaParse with Agent Workflows, plus the
          llamactl CLI for init, serve, and deploy.
        </li>
        <li>
          <a
            href="https://developers.llamaindex.ai/python/framework/understanding/agent/multi_agent/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex docs: Multi-agent patterns
          </a>
          {" "}- the developer reference for
          AgentWorkflow, root agent selection, and
          handoff configuration.
        </li>
        <li>
          <a
            href="https://github.com/run-llama/workflows-py"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            run-llama/workflows-py on GitHub
          </a>
          {" "}- the standalone Python package for
          Workflows, with the event and step
          primitives and the typed-state examples.
        </li>
        <li>
          <a
            href="https://github.com/run-llama/workflows-ts"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            run-llama/workflows-ts on GitHub
          </a>
          {" "}- the TypeScript version of Workflows,
          published as @llamaindex/workflow-core, for
          Node backends and Next.js apps.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/engineering/building-effective-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Building effective agents
          </a>
          {" "}- the pattern reference that the
          LlamaIndex team cites when talking about
          workflows versus agents and where each
          shape fits.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph-first alternative and where
          the trade-offs against Workflows land.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production
            2026
          </a>
          {" "}- the agent-first alternative for teams
          that already run on OpenAI.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the
          orchestrator-worker patterns AgentWorkflow
          inherits.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol LlamaAgents uses to talk
          to internal knowledge bases and vendor tools.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story the 1.0
          observability layer plugs into.
        </li>
      </ul>
    </div>
  );
}
