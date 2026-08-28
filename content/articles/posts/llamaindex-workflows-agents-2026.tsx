import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "llamaindex-workflows-agents-2026",
  title:
    "LlamaIndex Workflows in production 2026: event-driven agents, AgentWorkflow, and LlamaDeploy",
  excerpt:
    "How LlamaIndex Workflows went from a beta preview in mid-2024 to the 1.0 stable release in June 2026 as a standalone Python and TypeScript framework. Covers the event-driven step model, AgentWorkflow multi-agent handoffs, context state and checkpointing, human-in-the-loop pauses, LlamaDeploy microservices, Agentic Document Workflows, and the Jeppesen/Boeing production case study.",
  metaDescription:
    "A practical, technical guide to LlamaIndex Workflows in 2026. Covers the Workflow, step, StartEvent, and StopEvent primitives, the AgentWorkflow and FunctionAgent handoff model, the Context store and WorkflowCheckpointer, human-in-the-loop via InputRequiredEvent and HumanResponseEvent, resource injection, OpenTelemetry and Arize Phoenix observability, LlamaDeploy microservices with Redis and Kafka message queues, Agentic Document Workflows for contracts and claims, the Jeppesen/Boeing Unified Chatbot Framework case study, and honest trade-offs against LangGraph, CrewAI, and Pydantic AI for RAG-first production teams.",
  image:
    "https://cdn.sanity.io/images/7m9jw85w/production/0c3a216ead72f95b7b6bf0be402830405c3aed36-720x720.png",
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
    "LlamaDeploy",
    "Python",
    "TypeScript",
    "Production",
    "RAG",
  ],
  publishDate: "2026-08-28",
  readingTime: "16 min read",
};

export default function LlamaIndexWorkflowsAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2024 LlamaIndex was known for one
        thing: a strong data layer for retrieval-augmented
        generation. In August 2024 the team quietly
        shipped a beta of a new abstraction called
        Workflows. Twenty-two months later, on June 22,
        2026, Workflows hit 1.0 as its own standalone
        Python and TypeScript package, split out of the
        LlamaIndex core, and became the recommended way to
        build agents on top of the framework. This post is
        how we use LlamaIndex Workflows on client
        engagements: what the event-driven model actually
        gives you over a graph, how AgentWorkflow layers a
        multi-agent handoff on top, how LlamaDeploy takes
        the same code to production, and where the
        framework still trails LangGraph, CrewAI, and
        Pydantic AI.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why an event-driven agent framework
      </h2>
      <p className="mb-6 leading-relaxed">
        The first generation of agent frameworks picked
        two shapes. Chain-based (LangChain, early
        LlamaIndex) treated an agent as a linear pipe of
        prompts and tools. Graph-based (LangGraph)
        treated it as an explicit state machine with
        nodes, edges, and reducers. Both work. Both also
        push a specific mental model on the developer:
        chains hide control flow behind a fluent API,
        graphs put control flow front and center but ask
        you to think in terms of state transitions before
        you have any state to transition.
      </p>
      <p className="mb-6 leading-relaxed">
        LlamaIndex Workflows picks a third shape:
        event-driven steps. A workflow is a Python or
        TypeScript class. Each method decorated with{" "}
        <code>@step</code> takes a typed event and returns
        one or more typed events. The runtime routes the
        events. There is no graph to draw, no reducer to
        register, and no chain to compose. If a step
        returns an <code>InputEvent</code>, every step
        that accepts an <code>InputEvent</code> gets
        called next. If it returns a{" "}
        <code>StopEvent</code>, the workflow ends. The
        model matches how most engineers already reason
        about async services: things emit events, other
        things react to them, state lives in a shared
        context.
      </p>
      <p className="mb-6 leading-relaxed">
        That choice pays off in three places. Cycles are
        free (a tool step can loop back to a planning
        step just by emitting the right event). Parallel
        fan-out is a return statement that emits a list
        of events, not a special API. And the whole thing
        is async-first from the ground up, so you get
        streaming, backpressure, and cancellation without
        wrapping the runtime in a task queue.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>August 1, 2024</strong>: LlamaIndex
          publishes the Workflows beta blog post,
          introducing the <code>Workflow</code>,{" "}
          <code>step</code>, <code>StartEvent</code>, and{" "}
          <code>StopEvent</code> primitives as a
          replacement for the older Query Pipeline
          abstraction.
        </li>
        <li>
          <strong>September 18, 2024</strong>: LlamaDeploy
          ships as the production deployment story,
          folding in the earlier llama-agents work and
          wrapping every workflow in a control plane plus
          a pluggable message queue (SimpleQueue, Redis,
          Kafka, RabbitMQ, AWS SQS).
        </li>
        <li>
          <strong>January 9, 2025</strong>: The Agentic
          Document Workflows (ADW) reference
          architectures land, showing contract review,
          patient case summaries, invoice processing, and
          auto insurance claims as end-to-end workflows
          on top of LlamaParse and the core Workflow
          runtime.
        </li>
        <li>
          <strong>January 22, 2025</strong>: AgentWorkflow
          launches as the multi-agent layer.{" "}
          <code>FunctionAgent</code>,{" "}
          <code>ReActAgent</code>, and{" "}
          <code>CodeActAgent</code> can now be composed
          into a swarm with explicit{" "}
          <code>can_handoff_to</code> edges, all built on
          the same event-driven runtime.
        </li>
        <li>
          <strong>Mid 2025</strong>: The Jeppesen
          engineering team at Boeing standardizes on
          LlamaIndex workflows for its internal Unified
          Chatbot Framework, cutting agent build time
          from around 512 hours to around 64 hours per
          bot and rolling out to 10-11 production
          products.
        </li>
        <li>
          <strong>June 22, 2026</strong>: LlamaIndex
          Workflows 1.0 ships as a standalone package.
          Python moves to{" "}
          <code>pip install llama-index-workflows</code>,
          TypeScript to{" "}
          <code>npm i @llamaindex/workflow-core</code>.
          New in 1.0: typed workflow state, resource
          injection, and first-class{" "}
          <code>llama-index-instrumentation</code>{" "}
          hooks for OpenTelemetry, Arize Phoenix, and
          Langfuse.
        </li>
        <li>
          <strong>Second half of 2026</strong>: The
          workflows repository absorbs a growing set of
          agentic patterns from the community, including
          durable checkpointing with{" "}
          <code>WorkflowCheckpointer</code>, structured
          human-in-the-loop with{" "}
          <code>InputRequiredEvent</code> and{" "}
          <code>HumanResponseEvent</code>, and an AG-UI
          plus CopilotKit integration for streaming agent
          state to a React frontend.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core primitives
      </h2>
      <p className="mb-6 leading-relaxed">
        A Workflow has four moving parts. Steps are async
        methods decorated with <code>@step</code>. Events
        are typed dataclasses that flow between steps.
        Context is a per-run key-value store with an{" "}
        <code>edit_state</code> lock for safe concurrent
        writes. Handlers are the return value of{" "}
        <code>Workflow.run()</code> and expose the event
        stream, the ability to send new events in mid-run,
        and the final result.
      </p>
      <CodeBlock
        language="bash"
        filename="LlamaIndex Workflows: the runtime shape"
        code={`+----------------------------------------------------+
|  Workflow instance                                 |
|                                                    |
|   +-----------+   StartEvent    +---------------+  |
|   | run(...)  |----------------->  @step        |  |
|   +-----------+                  |  planner     |  |
|         ^                        +------+--------+ |
|         |                               |          |
|         |                               v          |
|         |                        +---------------+ |
|         |                        |  @step        | |
|         |                        |  toolcall     | |
|         |                        +------+--------+ |
|         |                               |          |
|         |                               v          |
|         |                        +---------------+ |
|         |         StopEvent      |  @step        | |
|         +------------------------|  finalize     | |
|                                  +---------------+ |
|                                                    |
|   Context store  (typed state, resources)          |
|   Event stream   (stream_events for the client)    |
+----------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Everything that a graph framework calls a node is
        a plain method here. Everything that a graph
        framework calls an edge is a return type
        annotation. The runtime reads the type hints on
        the step signatures and wires the routing for
        you. That is the whole trick.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A working single-agent workflow
      </h2>
      <p className="mb-6 leading-relaxed">
        Here is a compact but real function-calling agent
        built directly on the Workflow primitives. It
        maintains its own chat memory, streams tokens as
        they arrive, and loops between the LLM step and
        the tool step until the model stops requesting
        tools.
      </p>
      <CodeBlock
        language="python"
        filename="function_calling_agent.py"
        code={`from typing import Any, List

from llama_index.core.llms.function_calling import FunctionCallingLLM
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.tools.types import BaseTool
from llama_index.core.workflow import (
    Context,
    Workflow,
    StartEvent,
    StopEvent,
    step,
    Event,
)
from llama_index.llms.openai import OpenAI


class InputEvent(Event):
    input: list


class ToolCallEvent(Event):
    tool_calls: list


class StreamEvent(Event):
    delta: str


class FunctionCallingAgent(Workflow):
    def __init__(
        self,
        *args: Any,
        llm: FunctionCallingLLM | None = None,
        tools: List[BaseTool] | None = None,
        **kwargs: Any,
    ) -> None:
        super().__init__(*args, **kwargs)
        self.tools = tools or []
        self.llm = llm or OpenAI(model="gpt-4.1-mini")
        assert self.llm.metadata.is_function_calling_model

    @step
    async def prepare_chat(
        self, ctx: Context, ev: StartEvent
    ) -> InputEvent:
        memory = await ctx.store.get(
            "memory", default=ChatMemoryBuffer.from_defaults(llm=self.llm)
        )
        memory.put_messages([{"role": "user", "content": ev.input}])
        await ctx.store.set("memory", memory)
        return InputEvent(input=memory.get())

    @step
    async def call_llm(
        self, ctx: Context, ev: InputEvent
    ) -> ToolCallEvent | StopEvent:
        response_stream = await self.llm.astream_chat_with_tools(
            self.tools, chat_history=ev.input
        )
        async for chunk in response_stream:
            ctx.write_event_to_stream(
                StreamEvent(delta=chunk.delta or "")
            )

        memory = await ctx.store.get("memory")
        memory.put(chunk.message)
        await ctx.store.set("memory", memory)

        tool_calls = self.llm.get_tool_calls_from_response(
            chunk, error_on_no_tool_call=False
        )
        if not tool_calls:
            return StopEvent(result={"message": chunk.message.content})
        return ToolCallEvent(tool_calls=tool_calls)

    @step
    async def call_tools(
        self, ctx: Context, ev: ToolCallEvent
    ) -> InputEvent:
        tools_by_name = {t.metadata.get_name(): t for t in self.tools}
        memory = await ctx.store.get("memory")
        for call in ev.tool_calls:
            tool = tools_by_name.get(call.tool_name)
            try:
                output = tool(**call.tool_kwargs)
                memory.put({"role": "tool", "content": str(output)})
            except Exception as exc:
                memory.put({"role": "tool", "content": f"error: {exc}"})
        await ctx.store.set("memory", memory)
        return InputEvent(input=memory.get())`}
      />
      <p className="mb-6 leading-relaxed">
        Three things are worth calling out. The loop
        between <code>call_llm</code> and{" "}
        <code>call_tools</code> is not a graph edge, it
        is a Python return type: <code>call_llm</code>{" "}
        returns <code>ToolCallEvent</code> or{" "}
        <code>StopEvent</code>, and the runtime picks the
        next step. The streaming is a first-class output
        of every workflow via{" "}
        <code>ctx.write_event_to_stream</code>, so the
        FastAPI or Next.js layer above can subscribe to
        the same event stream that drives the loop. And
        the memory sits in the context store, so a second
        instance of the workflow running against the same
        session can pick up the same history without any
        extra plumbing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AgentWorkflow: multi-agent handoffs on the same
        runtime
      </h2>
      <p className="mb-6 leading-relaxed">
        Writing your own function-calling loop is fine
        when the workflow is a single agent with a fixed
        tool list. The moment you need multiple
        specialists with different prompts, different
        tools, and the ability to hand control between
        each other, you want AgentWorkflow. It is a
        higher-level construct built on top of the same
        Workflow runtime that turns a set of{" "}
        <code>FunctionAgent</code> or{" "}
        <code>ReActAgent</code> instances into a
        coordinated swarm.
      </p>
      <CodeBlock
        language="python"
        filename="research_write_review_swarm.py"
        code={`from llama_index.core.agent.workflow import (
    AgentWorkflow,
    FunctionAgent,
)
from llama_index.llms.openai import OpenAI

llm = OpenAI(model="gpt-4.1")

research_agent = FunctionAgent(
    name="ResearchAgent",
    description="Search the web and record notes.",
    system_prompt=(
        "You are a researcher. Gather facts with the tools you have. "
        "Hand off to WriteAgent when you have enough."
    ),
    llm=llm,
    tools=[search_web, record_notes],
    can_handoff_to=["WriteAgent"],
)

write_agent = FunctionAgent(
    name="WriteAgent",
    description="Draft a markdown report from the notes.",
    system_prompt=(
        "You are a writer. Turn the notes into a clean report. "
        "Send it to ReviewAgent when done."
    ),
    llm=llm,
    tools=[write_report],
    can_handoff_to=["ReviewAgent", "ResearchAgent"],
)

review_agent = FunctionAgent(
    name="ReviewAgent",
    description="Review the draft and either approve or send back.",
    system_prompt=(
        "You are a reviewer. If the report is good, approve. "
        "Otherwise send specific feedback to WriteAgent."
    ),
    llm=llm,
    tools=[review_report],
    can_handoff_to=["WriteAgent"],
)

workflow = AgentWorkflow(
    agents=[research_agent, write_agent, review_agent],
    root_agent=research_agent.name,
    initial_state={
        "research_notes": {},
        "report_draft": "",
        "review": "not started",
    },
)

result = await workflow.run(
    user_msg="Write a short report on European stablecoin regulation in 2026."
)`}
      />
      <p className="mb-6 leading-relaxed">
        The handoff is a tool call under the hood. Each
        agent gets an auto-generated tool per name in its{" "}
        <code>can_handoff_to</code> list, and calling
        that tool switches which agent the runtime
        invokes next. The shared state stays in the same
        context store the plain Workflow uses, so you can
        still stream events to the client, checkpoint
        mid-run, and run multiple swarms concurrently
        without any extra machinery.
      </p>
      <p className="mb-6 leading-relaxed">
        If handoffs are unreliable in your setup, the
        docs recommend the orchestrator pattern instead:
        keep the sub-agents but expose each one as a
        callable Python function on a lead{" "}
        <code>FunctionAgent</code>. The lead agent picks
        which specialist to call, in what order, and how
        to blend their outputs. It costs a bit more
        latency but sidesteps position-bias failures
        where the leftmost agent in{" "}
        <code>can_handoff_to</code> always wins.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        State, checkpoints, and human-in-the-loop
      </h2>
      <p className="mb-6 leading-relaxed">
        Any workflow that runs longer than a chat
        completion needs three things: durable state, the
        ability to resume mid-run, and a way to pause for
        a human. LlamaIndex Workflows ships all three as
        primitives, not as add-ons.
      </p>
      <p className="mb-6 leading-relaxed">
        The context store is the state layer. Anything
        you put in it survives the whole run and can be
        serialized for later resumption. The typed
        workflow state added in 1.0 lets you declare a
        Pydantic model as the shape of the state, so a
        step that writes to <code>ctx.store</code> gets
        the same type-checking as any other Python
        function.
      </p>
      <CodeBlock
        language="python"
        filename="durable_workflow.py"
        code={`from llama_index.core.workflow.checkpointer import WorkflowCheckpointer

workflow = MyWorkflow()
checkpointer = WorkflowCheckpointer(workflow=workflow)

# First run: fully executes, checkpoints after every step
handler = checkpointer.run(task="analyse the Q3 earnings call")
result = await handler

# Later, resume from any checkpoint the checkpointer stored
checkpoint_id = next(iter(checkpointer.checkpoints))
resumed = await checkpointer.run_from_checkpoint(
    checkpoint_id=checkpoint_id
)`}
      />
      <p className="mb-6 leading-relaxed">
        Human-in-the-loop is the same idea, expressed as
        two special events. A step returns an{" "}
        <code>InputRequiredEvent</code> when it needs a
        person to answer something. The runtime pauses,
        streams the event out to the client, and waits.
        When the client sends back a{" "}
        <code>HumanResponseEvent</code> through{" "}
        <code>handler.ctx.send_event</code>, the paired
        step picks up and continues.
      </p>
      <CodeBlock
        language="python"
        filename="approval_workflow.py"
        code={`from llama_index.core.workflow import (
    Workflow,
    step,
    StartEvent,
    StopEvent,
    InputRequiredEvent,
    HumanResponseEvent,
)


class ApprovalWorkflow(Workflow):
    @step
    async def ask_human(self, ev: StartEvent) -> InputRequiredEvent:
        return InputRequiredEvent(
            prefix="Approve refund of $220 to order 4711?",
        )

    @step
    async def resume(self, ev: HumanResponseEvent) -> StopEvent:
        approved = ev.response.strip().lower() == "yes"
        return StopEvent(result={"approved": approved})


handler = ApprovalWorkflow().run()
async for event in handler.stream_events():
    if isinstance(event, InputRequiredEvent):
        # In a real app this comes from a UI callback
        handler.ctx.send_event(HumanResponseEvent(response="yes"))

final = await handler
print(final)`}
      />
      <p className="mb-6 leading-relaxed">
        Because the pause is a checkpoint like any other,
        you can serialize the whole workflow to a queue,
        show the approval card to the user hours later,
        and resume the same run when they click. The
        agent does not have to be memory-resident while
        it waits.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Observability with OpenTelemetry and Arize
        Phoenix
      </h2>
      <p className="mb-6 leading-relaxed">
        The 1.0 release added a first-party
        instrumentation package. Install{" "}
        <code>llama-index-instrumentation</code>, wire
        the OpenInference tracer, and every step, event,
        and LLM call turns into a span. In practice the
        Phoenix integration is what teams reach for
        first, because it gives you the tree view of a
        run for free.
      </p>
      <CodeBlock
        language="python"
        filename="tracing_setup.py"
        code={`from opentelemetry.sdk import trace as trace_sdk
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import (
    OTLPSpanExporter,
)
from openinference.instrumentation.llama_index import (
    LlamaIndexInstrumentor,
)

exporter = OTLPSpanExporter(
    endpoint="https://app.phoenix.arize.com/v1/traces",
    headers={"api_key": PHOENIX_API_KEY},
)
tracer_provider = trace_sdk.TracerProvider()
tracer_provider.add_span_processor(SimpleSpanProcessor(exporter))
LlamaIndexInstrumentor().instrument(tracer_provider=tracer_provider)`}
      />
      <p className="mb-6 leading-relaxed">
        The same OpenTelemetry endpoint works with
        Langfuse, Honeycomb, Datadog, or any other OTel
        collector. On new engagements we default to
        Phoenix for the first two weeks of a project,
        then move to Langfuse or Datadog once the traces
        need to sit next to the rest of the platform.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaDeploy: taking the same code to production
      </h2>
      <p className="mb-6 leading-relaxed">
        The gap between a working workflow in a notebook
        and a workflow serving real users is usually
        infrastructure: how to expose it as a service,
        scale it horizontally, and route messages between
        multiple workflows. LlamaDeploy is the answer
        LlamaIndex ships. It is not a hosted service, it
        is an open-source runtime you deploy on your own
        cluster.
      </p>
      <p className="mb-6 leading-relaxed">
        A LlamaDeploy topology has three pieces: a
        control plane that tracks sessions and routes
        requests, a message queue for the per-step events
        (SimpleQueue for local dev, Redis or Apache Kafka
        or RabbitMQ or AWS SQS for production), and one
        or more workflow services that register with the
        control plane and process messages. Each workflow
        becomes an independently scalable service. You
        can run one instance of a cheap classifier and
        ten instances of a heavy research agent behind
        the same control plane.
      </p>
      <CodeBlock
        language="python"
        filename="deploy_workflow.py"
        code={`from llama_deploy import (
    deploy_core,
    deploy_workflow,
    ControlPlaneConfig,
    WorkflowServiceConfig,
    LlamaDeployClient,
)
from llama_index.core.workflow import Workflow, StartEvent, StopEvent, step


class BillingAgent(Workflow):
    @step
    async def handle(self, ev: StartEvent) -> StopEvent:
        return StopEvent(result=f"processed billing for {ev.get('order_id')}")


# 1. Start the control plane and message queue (one process)
await deploy_core(control_plane_config=ControlPlaneConfig())

# 2. Register a workflow as a service (a second process, per replica)
await deploy_workflow(
    BillingAgent(),
    WorkflowServiceConfig(
        host="0.0.0.0",
        port=8010,
        service_name="billing_agent",
    ),
    ControlPlaneConfig(),
)

# 3. From any client, call it through the control plane
client = LlamaDeployClient(ControlPlaneConfig())
session = client.get_or_create_session("session-42")
result = session.run("billing_agent", order_id=4711)`}
      />
      <p className="mb-6 leading-relaxed">
        In production we deploy the control plane and
        each workflow service as separate Kubernetes
        deployments, back the message queue with managed
        Redis or MSK Kafka, and put the whole thing
        behind an API gateway. Because the workflows
        themselves are the same Python classes we ran in
        the notebook, the debugging loop stays fast: pull
        a trace, reproduce the failing run locally, ship
        the fix.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agentic Document Workflows: the enterprise wedge
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex is still the best-in-class framework
        for document work, and the Agentic Document
        Workflows (ADW) reference architectures from
        early 2025 are the clearest example of what the
        Workflow runtime unlocks. ADW treats a document
        not as a chunk to embed but as a step in a
        broader business process: parse it with
        LlamaParse, retrieve related policies and prior
        cases from a LlamaCloud index, apply business
        rules, and produce a structured recommendation.
      </p>
      <p className="mb-6 leading-relaxed">
        The reference notebooks cover four production
        shapes. Contract review parses a vendor
        agreement, matches its clauses against a
        regulatory knowledge base, and flags
        non-standard terms for legal review. Patient
        case summaries pull labs and clinical notes into
        a per-patient summary that a physician reviews
        before signing. Invoice processing extracts line
        items, checks them against contracted rates, and
        suggests optimal payment timing. Auto insurance
        claims parse the claim, retrieve the relevant
        policy sections, and hand a structured brief to
        the claims processor. Each is a Workflow that
        composes a LlamaParse step, a retrieval step, a
        rules step, and a review step, all under the
        same event model.
      </p>
      <p className="mb-6 leading-relaxed">
        The point is not that these specific workflows
        are what you should ship. It is that the pattern
        (document plus knowledge base plus rules plus
        review, all as steps in a durable workflow)
        turns out to fit a very large fraction of
        knowledge-work automation across legal,
        healthcare, insurance, finance, and back-office
        operations.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production: Jeppesen at Boeing
      </h2>
      <p className="mb-6 leading-relaxed">
        The clearest public case study is Jeppesen, the
        Boeing subsidiary that ships flight-planning
        software. Their enterprise AI team faced a
        familiar problem: every product group was
        building its own chatbot, each one duplicating
        auth, compliance, and tool integration, and each
        one taking about 512 engineering hours to reach
        production.
      </p>
      <p className="mb-6 leading-relaxed">
        A five to seven person platform team built a
        Unified Chatbot Framework (UCF) on top of
        LlamaIndex Workflows. Product teams now ship an
        agent with roughly 50 lines of Python and a JSON
        config: pick an LLM (Azure OpenAI, Bedrock, or
        an open model on Hugging Face), pick a vector
        store (Azure AI Search, Qdrant), pick a memory
        store (Cosmos DB, Azure Table, Redis), pick the
        tools they need (GraphQL, SQL, REST, Neo4j,
        Databricks Data Mesh), and the framework wires
        the compliance and observability layer for them.
      </p>
      <p className="mb-6 leading-relaxed">
        The reported result: agent build time dropped
        from around 512 hours to around 64 hours, an
        87% reduction. Ten to eleven production products
        now run on UCF. About 1,792 hours have been
        saved across the org, with a projected 4,900
        hours per year once the internal rollout is
        complete. The team&rsquo;s stated reason for
        choosing LlamaIndex over &ldquo;more rigid
        graph-based frameworks&rdquo; is exactly the one
        this article opened with: event-driven workflows
        gave them full control over state transitions
        without asking every product team to draw a
        graph.
      </p>
      <p className="mb-6 leading-relaxed">
        Other public users of the same stack include
        NTT DATA for enterprise document parsing,
        Experian for customer support agents that
        improved NPS, Stack AI for enterprise document
        agents, and Caidera.ai for life-sciences
        marketing automation.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where Workflows fits against the alternatives
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex Workflows is not the only agent
        framework worth shipping in 2026, and it is not
        the right pick for every project. Here is how we
        actually decide on client engagements.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>LangGraph</strong>: pick it when the
          workflow is genuinely a directed graph with
          shared state and explicit reducers, when the
          team is already deep in LangChain, or when you
          need the mature time-travel debugger in
          LangSmith. It is heavier than Workflows for a
          simple sequential agent, and the mental model
          is graph-first rather than event-first.
        </li>
        <li>
          <strong>Pydantic AI</strong>: pick it when
          typed inputs and typed outputs are the primary
          concern, when you want the Pydantic Evals and
          Logfire story out of the box, and when your
          team already thinks in Pydantic models
          everywhere. Its agent primitive is simpler
          than Workflows for a single-agent tool loop,
          but it does not have an event-driven
          orchestration layer of its own.
        </li>
        <li>
          <strong>CrewAI</strong>: pick it when the
          conceptual model of &ldquo;roles and
          tasks&rdquo; matches the domain (a marketing
          team, a research crew), when the users of the
          framework are more product than engineering,
          and when you want the built-in delegation and
          role-play prompting. It hides more of the
          runtime than Workflows does.
        </li>
        <li>
          <strong>OpenAI Agents SDK, Claude Agent
          SDK, Google ADK</strong>: pick a vendor SDK
          when you know you will stay on one model, when
          you want the vendor to own the harness (tool
          use, streaming, sessions), and when a shorter
          learning curve matters more than portability.
          Workflows is the pick when you want the same
          code to run against any of these models
          through the LlamaIndex model layer.
        </li>
        <li>
          <strong>LlamaIndex Workflows</strong>: pick it
          when the workload is RAG-heavy and you want
          retrieval, indexing, and orchestration in the
          same framework; when you want Python and
          TypeScript parity from day one; when the
          agent is a set of small event-reactive steps
          rather than a graph; and when LlamaDeploy plus
          LlamaCloud already fits the deployment
          target.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and honest limits
      </h2>
      <p className="mb-6 leading-relaxed">
        On the plus side, the event model is a genuinely
        clean fit for how most agents actually behave.
        Cycles and fan-out come for free. The context
        store plus checkpointer plus{" "}
        <code>InputRequiredEvent</code> gives you a
        complete durable-execution story without pulling
        in Temporal or DBOS. LlamaCloud, LlamaParse, and
        the entire ingestion side of LlamaIndex integrate
        with the workflow runtime with zero glue. And
        Python and TypeScript parity from day one is
        rare (most agent frameworks pick a language and
        stay there).
      </p>
      <p className="mb-6 leading-relaxed">
        The limits are also real. The ecosystem is
        smaller than LangChain and LangGraph, and third
        party tool integrations sometimes lag by a
        release or two. The docs still assume you have
        read the Workflows beta post from 2024 and know
        the older LlamaIndex Query Engine world, which
        can trip up a fresh reader. AgentWorkflow
        handoffs suffer from a mild LLM position bias
        that the team has documented (the leftmost agent
        in the handoff list is called
        disproportionately often), which is why the
        orchestrator-with-tools pattern often wins in
        production. And LlamaDeploy is powerful but
        opinionated: if your platform already has a
        message queue and a service mesh, you will have
        to decide whether a second control plane earns
        its place.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the pattern is going in late 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three trends are visible in the workflows
        repository and the LlamaIndex roadmap. First,
        deeper convergence with the emerging agent
        protocols. AG-UI plus CopilotKit already ships
        an integration for streaming workflow state to a
        React frontend without writing a bespoke event
        format. MCP tools are first-class in
        AgentWorkflow, and A2A support is being
        prototyped for cross-vendor swarms. Second, the
        durable-execution story is getting sharper: the
        WorkflowCheckpointer now supports pluggable
        backends, and integrations with Temporal and
        DBOS are in progress for teams that already
        standardize on those platforms. Third, the
        TypeScript workflow package is catching up fast,
        which matters for Next.js and edge-runtime
        deployments where a Python service would be a
        deployment tax.
      </p>
      <p className="mb-6 leading-relaxed">
        The bet the LlamaIndex team is making with the
        1.0 split is that Workflows is a general
        orchestration framework for LLM-powered systems,
        not just an agent layer for LlamaIndex. That
        framing lines up with how we are using it: as
        the piece of the stack that owns state
        transitions and side effects, with retrieval,
        parsing, and model calls plugged in as
        dependencies rather than the point of the
        exercise.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Takeaways
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex Workflows 1.0 is a small, focused
        framework that does one thing well: it turns an
        agent into a set of typed async steps that
        communicate through typed events. That model
        gives you cycles, fan-out, streaming,
        checkpointing, and human-in-the-loop without any
        of them being special cases. AgentWorkflow
        layers a multi-agent handoff on top for teams
        that want a swarm, and LlamaDeploy takes the
        same code to a production service mesh with a
        real message queue underneath.
      </p>
      <p className="mb-6 leading-relaxed">
        On new work we default to Workflows when the
        project is RAG-heavy, when the agent needs to
        pause for a person, or when the same code has
        to serve both a Python backend and a TypeScript
        edge deployment. We default to LangGraph when
        the workflow is genuinely a graph with shared
        reduced state. We default to Pydantic AI when
        types are the primary constraint. And we
        default to a vendor SDK when the project is
        pinned to a single model. The good news is that
        picking one of these does not lock you in for
        life: at the granularity of a workflow they are
        much closer to each other in 2026 than they
        were a year ago, and moving between them is now
        a week of work rather than a rewrite.
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
            LlamaIndex: Announcing Workflows 1.0 (June
            22, 2026)
          </a>
          {" "}- the launch post for the standalone
          package, with the list of what changed in 1.0
          (typed state, resource injection,
          instrumentation) and the split into{" "}
          <code>llama-index-workflows</code> and{" "}
          <code>@llamaindex/workflow-core</code>.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-workflows-beta-a-new-way-to-create-complex-ai-applications-with-llamaindex"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing Workflows beta
            (August 1, 2024)
          </a>
          {" "}- the original design write-up with the
          motivation for the event-driven model and the
          first Workflow example.
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
          {" "}- the multi-agent layer with{" "}
          <code>FunctionAgent</code>,{" "}
          <code>can_handoff_to</code>, and shared state,
          plus the research/write/review walkthrough
          this article&rsquo;s example is based on.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-llama-deploy-a-microservice-based-way-to-deploy-llamaindex-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing LlamaDeploy
            (September 18, 2024)
          </a>
          {" "}- the microservice deployment story with
          the control plane, pluggable message queues,
          and the client SDK for calling deployed
          workflows.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-agentic-document-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing Agentic Document
            Workflows (January 9, 2025)
          </a>
          {" "}- the four reference architectures
          (contract review, patient case summaries,
          invoice processing, auto insurance claims) and
          the pattern behind them.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/customers/jeppesen-a-boeing-company-saves-2-000-engineering-hours-with-unified-chat-framework"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex case study: Jeppesen (a Boeing
            company) saves ~2,000 engineering hours with
            the Unified Chatbot Framework
          </a>
          {" "}- the production case study with the 512
          to 64 hour build-time drop and the reasons
          the team picked event-driven workflows over
          graph-based frameworks.
        </li>
        <li>
          <a
            href="https://developers.llamaindex.ai/python/framework/understanding/agent/multi_agent/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex docs: multi-agent patterns
          </a>
          {" "}- the side-by-side comparison of the
          AgentWorkflow swarm pattern versus the
          orchestrator-with-tools pattern, with runnable
          Python examples of both.
        </li>
        <li>
          <a
            href="https://arize.com/blog/llamaindex-workflows-a-new-way-to-build-cyclical-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arize: LlamaIndex Workflows tracing with
            Phoenix
          </a>
          {" "}- the tracing walkthrough for the
          OpenTelemetry plus OpenInference plus Phoenix
          stack the observability section is based on.
        </li>
        <li>
          <a
            href="https://www.langchain.com/resources/ai-agent-frameworks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangChain: the best AI agent frameworks in
            2026
          </a>
          {" "}- LangChain&rsquo;s own comparison of
          LlamaIndex Workflows against LangGraph and
          other frameworks, useful for the honest view
          from a competitor.
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
          {" "}- the standalone Python package, with the
          typed workflow state examples and the
          checkpointer test cases.
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
          {" "}- the TypeScript package that mirrors the
          Python API, useful for Next.js and edge
          deployments.
        </li>
        <li>
          <a
            href="https://github.com/run-llama/llama_deploy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            run-llama/llama_deploy on GitHub
          </a>
          {" "}- the deployment runtime with the control
          plane, message queue adapters, and the client
          SDK.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph-based alternative this
          article contrasts Workflows against.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the typed-first Python agent framework
          that competes with Workflows on the
          single-agent tool loop.
        </li>
        <li>
          <a
            href="/articles/crewai-production-multi-agent-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            CrewAI in production 2026
          </a>
          {" "}- the role-based multi-agent alternative
          for teams that want higher-level abstractions.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the
          orchestrator-worker and handoff patterns
          AgentWorkflow implements.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG with Next.js, LangChain, and the Vercel
            AI SDK
          </a>
          {" "}- the sister article for building
          retrieval into a Next.js frontend, useful
          alongside the TypeScript Workflow package.
        </li>
      </ul>
    </div>
  );
}
