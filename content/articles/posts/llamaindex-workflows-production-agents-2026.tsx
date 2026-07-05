import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "llamaindex-workflows-production-agents-2026",
  title:
    "LlamaIndex Workflows for production AI agents in 2026: the event-driven alternative to graph-based orchestration",
  excerpt:
    "How LlamaIndex Workflows moved from an August 2024 beta to a 1.0 stable framework that ships event-driven agents in Python and TypeScript. Covers the step and event model, AgentWorkflow for multi-agent handoffs, the orchestrator pattern with agents as tools, typed state, human-in-the-loop, streaming events, llama-deploy for microservice deployment, OpenTelemetry tracing, and how it stacks up against LangGraph and CrewAI on real client work.",
  metaDescription:
    "A practical, technical guide to LlamaIndex Workflows 1.0 in production 2026. Covers the event-driven step model, Context and typed state, AgentWorkflow multi-agent handoffs, the agents-as-tools orchestrator pattern, custom planner workflows, human-in-the-loop, streaming events, resource injection, OpenTelemetry and Arize Phoenix instrumentation, llama-deploy microservice deployment, real production case studies at Caidera.ai and Jeppesen, and an honest comparison with LangGraph, CrewAI, and the Mastra TypeScript framework.",
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
    "Python",
    "TypeScript",
    "Event-driven",
    "Multi-agent",
    "Production",
    "MCP",
    "OpenTelemetry",
  ],
  publishDate: "2026-07-05",
  readingTime: "17 min read",
};

export default function LlamaIndexWorkflowsProductionAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In August 2024 LlamaIndex quietly shipped a beta
        called Workflows. It was a reaction, not a launch:
        the team had spent months building Query Pipelines
        as a directed acyclic graph, and the graph had
        cracked under the weight of real agent code. Loops
        were awkward. Optional inputs were verbose. Debugging
        was painful. So they rebuilt the orchestration layer
        as a set of Python functions that send events to
        each other, and it stuck. Two years later Workflows
        is a stable 1.0 package that ships as a standalone
        library, has an AgentWorkflow abstraction for
        multi-agent handoffs, runs on both Python and
        TypeScript, and deploys as microservices through
        llama-deploy. This article is how we use it on
        client work: the event-driven design, the code you
        actually write, where it beats a graph, and where
        it does not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why an event-driven agent framework matters
      </h2>
      <p className="mb-6 leading-relaxed">
        Every serious agent runtime has to answer the same
        question: how does step A decide that step B should
        run next? The two answers on offer in 2026 are the
        state-machine graph and the event stream. LangGraph,
        Google ADK, and Microsoft Agent Framework all pick
        the graph. LlamaIndex Workflows picks the stream.
        Both work, and both ship real production systems.
        The choice is not academic. It changes what your
        code looks like, how you handle loops and retries,
        and how you debug the run when something goes wrong
        at 2am.
      </p>
      <p className="mb-6 leading-relaxed">
        In a graph runtime you declare nodes and edges up
        front. The runtime walks the graph. Whatever logic
        does not fit the graph gets crammed into conditional
        edges, which is where the readability goes. In an
        event runtime you write plain functions that receive
        events and emit events. Loops are just a function
        emitting an event that itself listens for. Parallel
        fan-out is one event that many functions consume.
        There is no graph object to hold in your head, only
        the type signatures of each step. If you have ever
        written a Node.js server on top of an event emitter,
        this will look familiar.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason to write about it now is that Workflows
        reached its first stable release in mid-2025, the
        AgentWorkflow layer on top of it moved out of beta
        the same year, and enough teams have taken it to
        production that the trade-offs are settled. This
        is what we cover: the step and event primitives you
        write against, the three multi-agent patterns
        LlamaIndex documents, streaming and observability,
        deployment through llama-deploy, real customer
        systems that run on it today, and where a graph
        framework like LangGraph is still the right pick.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>June 2024</strong>: LlamaIndex ships{" "}
          <code>llama-agents</code>, a first attempt at
          deploying agentic systems as microservices with
          a control plane, message queue, and orchestrator.
          The design was ahead of the framework: teams
          liked the deployment model but the agent code
          itself was still a query pipeline.
        </li>
        <li>
          <strong>August 8, 2024</strong>: Workflows ships
          as a beta feature of{" "}
          <code>llama_index</code>. The launch blog is
          blunt about the reason: DAG orchestration made
          loops and optional inputs hard, and the team
          wanted to try event-driven instead.
        </li>
        <li>
          <strong>September 2024</strong>: The team
          releases{" "}
          <code>llama-deploy</code>, which folds{" "}
          <code>llama-agents</code> into a system for
          shipping Workflows as microservices with an
          async-first hub-and-spoke architecture.
        </li>
        <li>
          <strong>January 2025</strong>: AgentWorkflow
          lands. Multi-agent systems no longer require you
          to write your own handoff routing on top of a
          bare Workflow. You declare a list of agents, say
          which one is the root, and the framework does
          the coordination.
        </li>
        <li>
          <strong>Mid-2025</strong>: LlamaIndex Workflows
          1.0 ships as a standalone package. Python moves
          to{" "}
          <code>llama-index-workflows</code>, TypeScript
          moves to{" "}
          <code>@llamaindex/workflow-core</code>, and the
          old imports keep re-exporting for backward
          compatibility. Typed state, resource injection,
          and OpenTelemetry-friendly instrumentation land
          in the stable release.
        </li>
        <li>
          <strong>April 2025</strong>: Databricks and KPMG
          announce equity investments in LlamaIndex,
          confirming enterprise pull for the whole stack
          around Workflows, LlamaParse, and LlamaCloud.
        </li>
        <li>
          <strong>2026</strong>: Workflows is the default
          orchestration layer for LlamaIndex customers
          building document-heavy agents, and it is what
          runs behind LlamaCloud agent deployments.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: steps, events, context
      </h2>
      <p className="mb-6 leading-relaxed">
        A Workflow is a Python class that subclasses{" "}
        <code>Workflow</code>. Each method decorated with{" "}
        <code>@step</code> is a step: an async function
        that receives one event type and returns one or
        more event types. Steps do not call each other
        directly. They read the type annotations off the
        methods, subscribe the steps to the event types
        they accept, and let the runtime dispatch. The
        result is code that reads like a normal Python
        program with async functions, with the routing
        implied by the type signatures instead of a wiring
        diagram.
      </p>
      <p className="mb-6 leading-relaxed">
        Every workflow starts on a{" "}
        <code>StartEvent</code> and ends when a step
        returns a <code>StopEvent</code>. Everything else
        in between is your own event types. Events are
        Pydantic models, which means you get type checking,
        default values, and validation for free. A step
        that returns two possible events writes{" "}
        <code>-&gt; EventA | EventB</code> and the runtime
        knows to dispatch on whichever it gets.
      </p>
      <p className="mb-6 leading-relaxed">
        A shared <code>Context</code> is passed to any step
        that asks for it. This is where you keep state
        that outlives a single event: an index built by an
        ingest step, a running list of research notes, a
        counter for how many retries have happened. State
        is stored under keys and can be typed in Workflows
        1.0. The context also exposes a stream so steps
        can emit progress events that a client can consume
        without waiting for the final result.
      </p>
      <p className="mb-6 leading-relaxed">
        The minimal workflow that calls an LLM and returns
        the answer looks like this.
      </p>
      <CodeBlock
        language="python"
        filename="workflow_minimal.py"
        code={`from llama_index.core.workflow import (
    StartEvent,
    StopEvent,
    Workflow,
    step,
)
from llama_index.llms.openai import OpenAI


class OpenAIGenerator(Workflow):
    @step
    async def generate(self, ev: StartEvent) -> StopEvent:
        query = ev.get("query")
        llm = OpenAI()
        response = await llm.acomplete(query)
        return StopEvent(result=str(response))


w = OpenAIGenerator(timeout=10, verbose=False)
result = await w.run(query="What is LlamaIndex?")
print(result)`}
      />
      <p className="mb-6 leading-relaxed">
        That is the whole thing. There is no graph object,
        no{" "}
        <code>workflow.add_edge(&quot;start&quot;, &quot;generate&quot;)</code>,
        no compiled state machine. The <code>generate</code>{" "}
        step advertises that it accepts{" "}
        <code>StartEvent</code>, so the runtime hands it
        the start event when you call{" "}
        <code>run()</code>. It returns{" "}
        <code>StopEvent</code>, which signals the runtime
        to halt and return the result to the caller.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Loops are messages, not edges
      </h2>
      <p className="mb-6 leading-relaxed">
        The classic argument against DAG orchestration is
        that agents need to loop, and cycles do not fit in
        a directed acyclic graph. Graph frameworks respond
        by adding cyclic edges and calling the graph
        cyclic. Workflows takes the other route: a loop is
        one step emitting an event that another step
        accepts, which then emits back to the first step.
        There is no special primitive. If you want a
        self-correction loop that retries schema
        extraction until the output parses, you write two
        steps that pass events to each other.
      </p>
      <CodeBlock
        language="python"
        filename="workflow_reflection.py"
        code={`import json
from llama_index.core.workflow import (
    Event,
    StartEvent,
    StopEvent,
    Workflow,
    step,
)
from llama_index.llms.ollama import Ollama


class ExtractionDone(Event):
    output: str
    passage: str


class ValidationErrorEvent(Event):
    error: str
    wrong_output: str
    passage: str


class ReflectionWorkflow(Workflow):
    @step
    async def extract(
        self, ev: StartEvent | ValidationErrorEvent
    ) -> StopEvent | ExtractionDone:
        if isinstance(ev, StartEvent):
            passage = ev.get("passage")
            if not passage:
                return StopEvent(result="No passage")
            reflection = ""
        else:
            passage = ev.passage
            reflection = (
                f"Previous attempt was wrong: {ev.wrong_output}. "
                f"Error: {ev.error}. Try again."
            )

        prompt = f"Extract cars as JSON. Passage: {passage}. {reflection}"
        llm = Ollama(model="llama3", request_timeout=30)
        output = await llm.acomplete(prompt)
        return ExtractionDone(output=str(output), passage=passage)

    @step
    async def validate(
        self, ev: ExtractionDone
    ) -> StopEvent | ValidationErrorEvent:
        try:
            json.loads(ev.output)
        except Exception as e:
            return ValidationErrorEvent(
                error=str(e),
                wrong_output=ev.output,
                passage=ev.passage,
            )
        return StopEvent(result=ev.output)`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>extract</code> step accepts both{" "}
        <code>StartEvent</code> and{" "}
        <code>ValidationErrorEvent</code>. On the first
        call the runtime hands it the start event. If the
        validator emits a{" "}
        <code>ValidationErrorEvent</code>, the runtime
        routes that back to <code>extract</code> and the
        loop closes without any extra wiring. A workflow
        timeout stops the loop from running forever. If you
        want a hard retry cap you write it in the step
        itself with a counter stored on the context.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Context and typed state
      </h2>
      <p className="mb-6 leading-relaxed">
        The <code>Context</code> object is how steps share
        data. In Workflows 1.0 you can also declare a
        typed state model that gets validated as you set
        keys, which catches typos and shape mismatches at
        runtime instead of quietly returning wrong data.
      </p>
      <CodeBlock
        language="python"
        filename="workflow_state.py"
        code={`from pydantic import BaseModel
from llama_index.core.workflow import (
    Context,
    StartEvent,
    StopEvent,
    Workflow,
    step,
)


class ResearchState(BaseModel):
    notes: list[str] = []
    draft: str = ""
    feedback: str = ""


class ResearchFlow(Workflow):
    @step
    async def take_notes(
        self, ctx: Context[ResearchState], ev: StartEvent
    ) -> StopEvent:
        async with ctx.store.edit_state() as state:
            state["notes"].append(f"Note about {ev.get('topic')}")
        return StopEvent(result="done")`}
      />
      <p className="mb-6 leading-relaxed">
        The context also supports resource injection in
        the Python package, which lets you register
        long-lived dependencies such as a database client
        or a vector store once, and pull them into any
        step that asks. Steps stay pure functions of their
        inputs and their injected resources instead of
        reaching for module-level globals.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AgentWorkflow: multi-agent handoffs with almost no code
      </h2>
      <p className="mb-6 leading-relaxed">
        Writing an agent by hand as a Workflow is not
        hard, but there is boilerplate: you write a step
        that calls the LLM, a step that runs tools, and
        the events that pass results between them.{" "}
        <code>AgentWorkflow</code> is a preconfigured
        Workflow that does all of that for you and adds
        multi-agent handoffs on top. You declare a list of{" "}
        <code>FunctionAgent</code> or{" "}
        <code>ReActAgent</code> instances, name the root
        agent, and the framework routes tool calls, tool
        results, and inter-agent handoffs through its
        event loop. Each agent has its own system prompt,
        tools, and a{" "}
        <code>can_handoff_to</code> list that names the
        agents it is allowed to pass control to.
      </p>
      <CodeBlock
        language="python"
        filename="agent_workflow_research.py"
        code={`from llama_index.core.agent.workflow import (
    AgentWorkflow,
    FunctionAgent,
)

research_agent = FunctionAgent(
    name="ResearchAgent",
    description="Searches the web and records notes.",
    system_prompt=(
        "You are a researcher. When you have enough "
        "notes, hand off to WriteAgent."
    ),
    llm=llm,
    tools=[search_web, record_notes],
    can_handoff_to=["WriteAgent"],
)

write_agent = FunctionAgent(
    name="WriteAgent",
    description="Turns notes into a markdown report.",
    system_prompt=(
        "You are a writer. Draft a report from the notes, "
        "then hand off to ReviewAgent."
    ),
    llm=llm,
    tools=[write_report],
    can_handoff_to=["ReviewAgent", "ResearchAgent"],
)

review_agent = FunctionAgent(
    name="ReviewAgent",
    description="Reviews the report and returns feedback.",
    system_prompt=(
        "You are a reviewer. If the report needs work, "
        "hand back to WriteAgent."
    ),
    llm=llm,
    tools=[review_report],
    can_handoff_to=["WriteAgent"],
)

workflow = AgentWorkflow(
    agents=[research_agent, write_agent, review_agent],
    root_agent="ResearchAgent",
    initial_state={
        "notes": [],
        "draft": "",
        "feedback": "",
    },
)

response = await workflow.run(
    user_msg="Write me a short report on the history of the web."
)
print(response)`}
      />
      <p className="mb-6 leading-relaxed">
        The framework injects a handoff tool into every
        agent that can hand off. When the LLM decides to
        pass control, it calls that tool and{" "}
        <code>AgentWorkflow</code> switches the active
        agent, forwards the current message, and keeps
        the shared context intact. Tools have access to
        the same <code>Context</code>, so an agent can
        write to the state while it runs and the next
        agent reads from it.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-off of the handoff style is that the
        LLM decides when to switch agents. In production
        that decision is not always right. A researcher
        might hand off too early, a writer might loop back
        to the researcher for information it already has.
        We have seen the LlamaIndex team acknowledge this
        publicly: known issues in the tracker cover cases
        where the receiving agent stops responding after
        a handoff, and Reddit threads with the maintainers
        note that the handoff heuristics can misfire in
        long-running crews. That is why the framework
        also ships two other multi-agent patterns.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Orchestrator pattern: agents as tools
      </h2>
      <p className="mb-6 leading-relaxed">
        The orchestrator pattern flips the design. Instead
        of agents handing off to each other, one top-level
        agent decides which sub-agent to run next. The
        sub-agents are exposed as tools. This costs one
        extra LLM call per turn (the orchestrator has to
        pick the next tool) but you get a single place
        that decides the flow, which is much easier to
        constrain and to log.
      </p>
      <CodeBlock
        language="python"
        filename="orchestrator_pattern.py"
        code={`import re
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.core.workflow import Context


async def call_research_agent(ctx: Context, prompt: str) -> str:
    """Record research notes about the given prompt."""
    result = await research_agent.run(
        user_msg=f"Research the following: {prompt}"
    )
    async with ctx.store.edit_state() as state:
        state["notes"].append(str(result))
    return str(result)


async def call_write_agent(ctx: Context) -> str:
    """Draft a report from the current notes."""
    async with ctx.store.edit_state() as state:
        notes = state.get("notes", [])
        if not notes:
            return "No notes to write from."
        user_msg = (
            "Write a markdown report. Use <report>...</report>.\\n\\n"
            f"<notes>{chr(10).join(notes)}</notes>"
        )
        result = await write_agent.run(user_msg=user_msg)
        report = re.search(
            r"<report>(.*)</report>", str(result), re.DOTALL
        ).group(1)
        state["draft"] = report
    return report


orchestrator = FunctionAgent(
    system_prompt=(
        "You orchestrate a small team of report writers. "
        "Call the research tool first, then the write tool, "
        "then the review tool, and only stop when the review "
        "is positive."
    ),
    llm=orchestrator_llm,
    tools=[
        call_research_agent,
        call_write_agent,
        call_review_agent,
    ],
    initial_state={
        "notes": [],
        "draft": None,
        "review": None,
    },
)

response = await orchestrator.run(
    user_msg="Write a report on the history of the web."
)`}
      />
      <p className="mb-6 leading-relaxed">
        The third pattern, custom planner, gives up the
        LLM-driven flow entirely: you write a planner
        prompt that outputs a structured plan (XML, JSON,
        whatever fits), parse it in Python, and drive the
        sub-agents by hand. That is what we reach for when
        the flow has hard constraints, external
        schedulers, or auditing requirements that the two
        LLM-in-the-loop patterns cannot meet.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Streaming events and human-in-the-loop
      </h2>
      <p className="mb-6 leading-relaxed">
        Every workflow run returns a handler you can
        iterate over to receive events as they happen.
        This is the primitive that ships tokens to a
        frontend, drives a progress bar, and lets a
        reviewer approve a step in the middle of the run.
        There is no separate streaming API. Steps write to
        the same event stream the runtime uses for
        dispatch.
      </p>
      <CodeBlock
        language="python"
        filename="streaming.py"
        code={`from llama_index.core.agent.workflow import (
    AgentInput,
    AgentStream,
    ToolCallResult,
)

handler = workflow.run(user_msg="Research quantum computing")
async for event in handler.stream_events():
    if isinstance(event, AgentInput):
        print(f"Agent {event.current_agent_name} thinking...")
    elif isinstance(event, AgentStream):
        print(event.delta, end="")
    elif isinstance(event, ToolCallResult):
        print(f"\\nTool {event.tool_name} -> {event.tool_output}")

final = await handler`}
      />
      <p className="mb-6 leading-relaxed">
        Human-in-the-loop uses the same mechanism. A step
        writes an <code>InputRequiredEvent</code> to the
        stream, then awaits a{" "}
        <code>HumanResponseEvent</code>. The consumer
        (a chat UI, a queue worker, an approval Slack bot)
        sees the request, gathers the answer, and posts
        the response event back. The workflow resumes
        from where it stopped. This is one of the cleanest
        HITL primitives across the frameworks we work
        with. There is no external state machine to
        reconcile, no separate durable task queue to wire
        up.
      </p>
      <CodeBlock
        language="python"
        filename="human_in_the_loop.py"
        code={`from llama_index.core.workflow import (
    Context,
    Event,
)


class InputRequiredEvent(Event):
    prefix: str


class HumanResponseEvent(Event):
    approved: bool


async def get_approval(ctx: Context) -> bool:
    ctx.write_event_to_stream(
        InputRequiredEvent(
            prefix="Approve this section before I continue?"
        )
    )
    response = await ctx.wait_for_event(HumanResponseEvent)
    return response.approved`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Observability with OpenTelemetry and Arize Phoenix
      </h2>
      <p className="mb-6 leading-relaxed">
        Workflows 1.0 ships with an{" "}
        <code>llama-index-instrumentation</code> package
        that emits OpenTelemetry spans for step entry, step
        exit, LLM calls, and tool calls. That is the
        thing that turns a workflow run from a black box
        into something you can grep. You point the
        instrumentation at any OpenTelemetry-compatible
        backend and the traces show up. Arize Phoenix,
        Langfuse, LangSmith, and the OpenTelemetry
        collector all work.
      </p>
      <CodeBlock
        language="python"
        filename="tracing.py"
        code={`from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import (
    OTLPSpanExporter,
)
from openinference.instrumentation.llama_index import (
    LlamaIndexInstrumentor,
)
import os

os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = (
    f"api_key={os.environ['PHOENIX_API_KEY']}"
)

provider = TracerProvider()
provider.add_span_processor(
    SimpleSpanProcessor(
        OTLPSpanExporter(
            endpoint="https://app.phoenix.arize.com/v1/traces"
        )
    )
)
LlamaIndexInstrumentor().instrument(tracer_provider=provider)`}
      />
      <p className="mb-6 leading-relaxed">
        The nice property of the event model here is that
        every span is already labelled with the step
        function name. You get a trace tree that reads
        exactly like the code, without having to correlate
        node ids to prompts. The gap to be aware of is
        concurrent execution: some observability
        integrations have known issues with dropped spans
        when many events fire in parallel, and the
        Langfuse discussion tracker documents this. Plan
        for a smoke test in staging with your fan-out
        pattern before you trust the traces.
      </p>
      <p className="mb-6 leading-relaxed">
        For a deeper look at how the OpenTelemetry GenAI
        semantic conventions apply to agent workloads,{" "}
        <a
          href="/articles/agent-evaluation-observability-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          our agent evaluation and observability article
        </a>{" "}
        walks through span types, trajectory vs outcome
        evals, and the CI gate patterns that stop bad
        agents from shipping.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deployment: llama-deploy and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        A workflow is a Python object. That is enough to
        run it in a notebook, in a script, in a FastAPI
        handler, or in a Cloud Run container. For teams
        that want a first-party production runtime,
        LlamaIndex ships{" "}
        <code>llama-deploy</code>, which lifts a workflow
        into a scalable microservice architecture with a
        control plane, a message queue, and worker
        services. The control plane tracks tasks and
        sessions, the message queue routes work between
        services, and each workflow is deployed as its
        own worker that can be scaled independently.
      </p>
      <CodeBlock
        language="python"
        filename="deploy_workflow.py"
        code={`from llama_deploy import (
    deploy_core,
    deploy_workflow,
    ControlPlaneConfig,
    SimpleMessageQueueConfig,
    WorkflowServiceConfig,
)
from my_workflows import ResearchFlow


async def main():
    await deploy_core(
        control_plane_config=ControlPlaneConfig(),
        message_queue_config=SimpleMessageQueueConfig(),
    )

    await deploy_workflow(
        ResearchFlow(),
        WorkflowServiceConfig(
            host="0.0.0.0",
            port=8002,
            service_name="research_flow",
        ),
        ControlPlaneConfig(),
    )`}
      />
      <p className="mb-6 leading-relaxed">
        Teams that do not want to run a control plane can
        deploy Workflows the same way they would any
        Python service. The Starlette and FastAPI
        middleware wraps a workflow into an HTTP endpoint
        that streams events over Server-Sent Events. On
        AWS the same code runs on Bedrock AgentCore
        through the AgentCore CLI, which handles the
        session-per-VM sandboxing that hosted agent
        platforms want. We have shipped both models: a
        control-plane deployment for a customer with a
        dozen workflows and cross-workflow routing, and a
        vanilla FastAPI deployment for teams that already
        have a Kubernetes story and did not want to add
        another moving part.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        TypeScript workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        Workflows 1.0 ships an official TypeScript package
        at{" "}
        <code>@llamaindex/workflow-core</code>. The
        primitives mirror Python: you decorate step
        functions, declare event types with typed
        interfaces, and hand the workflow to an executor
        that runs it. For teams whose backends are Node
        and Next.js, this closes the gap with Mastra and
        the Vercel AI SDK. The TypeScript ecosystem
        around it is smaller than the Python one, which
        matters if you want built-in LlamaCloud tools or
        the widest set of tracing integrations, but the
        core event model works the same way.
      </p>
      <CodeBlock
        language="typescript"
        filename="workflow.ts"
        code={`import {
  workflowEvent,
  createWorkflow,
} from "@llamaindex/workflow-core";

const start = workflowEvent<string>();
const stop = workflowEvent<string>();

const wf = createWorkflow();

wf.handle([start], async (query) => {
  const answer = await callLlm(query);
  return stop.with(answer);
});

const { stream, sendEvent } = wf.createContext();
sendEvent(start.with("What is LlamaIndex?"));

for await (const event of stream) {
  if (event.data.type === stop.type) {
    console.log(event.data.data);
    break;
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        If you are building a TypeScript-first agent
        application, especially one that already uses
        LlamaIndex.TS for RAG, Workflows is a natural
        extension. If you are on a Python backend, stay
        on the Python side.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Caidera.ai: life sciences marketing automation
      </h3>
      <p className="mb-6 leading-relaxed">
        Caidera.ai builds AI-driven marketing campaign
        automation for pharmaceutical and life sciences
        companies. The domain is unforgiving: every claim
        in a campaign has to be sourced against
        peer-reviewed literature, every asset has to pass
        compliance review, and the workflows have to be
        auditable end to end. They adopted LlamaIndex for
        the whole pipeline. A Python backend runs
        Workflows that ingest scientific documents through
        LlamaParse, coordinate a multi-agent system for
        research and content drafting, and route the
        output through a compliance-check agent before it
        reaches the marketer. The Next.js frontend streams
        events from the Workflow so the marketer sees
        progress live.
      </p>
      <p className="mb-6 leading-relaxed">
        Reported results from the LlamaIndex customer
        case study: 70 percent reduction in campaign
        creation time, 3x faster compliance processes, 40
        percent fewer resources needed per campaign, and
        up to 2x higher conversion rates against
        traditional workflows. Their team calls out the
        event-driven approach as the reason they were
        able to model the multi-agent handoffs between
        ingestion, generation, and compliance without
        writing a large amount of orchestration code.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Jeppesen (a Boeing company): unified chat framework
      </h3>
      <p className="mb-6 leading-relaxed">
        Jeppesen, the aviation charts and flight
        operations subsidiary of Boeing, built a unified
        chat framework on top of LlamaIndex that pulls
        together dozens of internal knowledge sources for
        pilots and dispatchers. LlamaIndex reports the
        deployment saved roughly 2,000 engineering hours
        by giving one team a common Workflow-based
        pattern for building specialised assistants
        against the shared retrieval layer, instead of
        every business unit building its own agent stack.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Patterns we ship on client engagements
      </h3>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>
            Document intake and classification pipelines
          </strong>{" "}
          where LlamaParse feeds a Workflow that routes
          each document to a set of downstream extraction
          agents. Workflows shine here because the routing
          logic is a natural fit for events.
        </li>
        <li>
          <strong>
            Research and reporting agents with
            human-in-the-loop
          </strong>
          . The built-in HITL primitive is the reason
          Workflows beats a bare LangGraph run for
          reviewer-driven workflows in domains like legal
          and regulatory. The reviewer approves at the
          exact step you tell them to.
        </li>
        <li>
          <strong>
            Chat-style knowledge assistants over structured
            plus unstructured data
          </strong>
          . Workflows composes cleanly with the LlamaIndex
          retrieval layer, so switching between vector
          search, SQL agents, and API tools inside one
          workflow is a single step change.
        </li>
        <li>
          <strong>
            Multi-agent triage for support and operations
          </strong>
          . AgentWorkflow handles the routing when the
          number of specialist agents grows to five or
          more. Below that count the orchestrator pattern
          is often the cheaper pick.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LlamaIndex Workflows vs LangGraph vs CrewAI
      </h2>
      <p className="mb-6 leading-relaxed">
        These are the three frameworks we compare on almost
        every AI agent engagement now. They are not
        interchangeable and the right pick depends on the
        shape of the problem, the team, and the
        deployment target.
      </p>
      <p className="mb-6 leading-relaxed">
        <a
          href="/articles/langgraph-production-agents-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          LangGraph
        </a>{" "}
        is a stateful graph runtime. You declare nodes and
        edges and the runtime walks them. It has the best
        story for durable execution and checkpointing, it
        integrates directly with LangSmith for tracing and
        evals, and its state model is the cleanest of the
        three. It wins when the flow is complex enough to
        benefit from an explicit graph, when durability
        and time-travel debugging matter, and when the
        team already lives in the LangChain ecosystem.
      </p>
      <p className="mb-6 leading-relaxed">
        <a
          href="/articles/crewai-production-multi-agent-systems-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          CrewAI
        </a>{" "}
        models agents as roles inside a crew. Each agent
        has a persona, a set of tools, and a task. The
        mental model is intuitive and the prototype-time
        is fast. It wins when the workflow maps cleanly to
        specialists (research, writing, review) and when
        the team wants a role-based abstraction more than
        a general orchestration framework.
      </p>
      <p className="mb-6 leading-relaxed">
        LlamaIndex Workflows is an event stream. You write
        steps and events and let the runtime dispatch. It
        wins when the flow is document-heavy, when you
        want first-class human-in-the-loop, when you value
        writing plain Python over declaring a graph
        object, and when you are already using the
        LlamaIndex retrieval stack. Its weakness is that
        the ecosystem around it is smaller than
        LangGraph&apos;s, and the AgentWorkflow layer, while
        convenient, has the LLM-driven handoff failure
        modes we mentioned earlier.
      </p>
      <p className="mb-6 leading-relaxed">
        A short heuristic we use when scoping: if the
        team has real requirements around durability,
        time-travel debug, and integration with LangSmith,
        pick LangGraph. If the team wants a role-based
        mental model and speed to first prototype, pick
        CrewAI. If the team is doing document-heavy work
        and wants event-driven Python with clean HITL,
        pick LlamaIndex Workflows. If the team is
        TypeScript-first,{" "}
        <a
          href="/articles/mastra-typescript-agents-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          Mastra
        </a>{" "}
        is often a better fit than the LlamaIndex.TS
        variant.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Event-driven code is smaller.</strong>{" "}
          You write plain Python functions and declare
          events. There is no graph object to maintain and
          no separate DSL to learn. For teams that already
          write async Python, the ramp-up is measured in
          hours.
        </li>
        <li>
          <strong>Loops and self-correction are natural.</strong>{" "}
          A retry is a step emitting an event that another
          step accepts and sending back the error. There
          is no separate cyclic-graph mode to enable.
        </li>
        <li>
          <strong>
            First-class human-in-the-loop.
          </strong>{" "}
          The stream and await-event primitives make
          reviewer-driven flows trivial to build without
          bolting on a durable task queue.
        </li>
        <li>
          <strong>Composes with LlamaIndex retrieval.</strong>{" "}
          If you are already using LlamaIndex for RAG,
          Workflows is the shortest path from your retriever
          to an agent that acts on the retrieved data.
        </li>
        <li>
          <strong>Python and TypeScript.</strong>{" "}
          Same event model, same step decorator, on both
          runtimes. Frontend engineers and backend
          engineers do not have to context-switch.
        </li>
        <li>
          <strong>OpenTelemetry-friendly.</strong>{" "}
          The instrumentation package emits spans that
          play with any OTel-compatible backend, and the
          span names line up with your step function
          names so traces read like the code.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Limitations and trade-offs
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>
            The AgentWorkflow handoff is LLM-driven and can
            misfire.
          </strong>{" "}
          The framework&apos;s issue tracker has open
          reports of agents failing to respond after a
          handoff, and community threads warn that
          long-running multi-agent flows need defensive
          testing. Do not skip observability.
        </li>
        <li>
          <strong>Durable execution is DIY.</strong>{" "}
          LangGraph has a first-party checkpointer that
          persists state and resumes from a specific
          step. Workflows can achieve the same result
          with{" "}
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Temporal or DBOS
          </a>
          , but you write the integration yourself. That
          matters for long-running flows that need to
          survive a redeploy.
        </li>
        <li>
          <strong>
            Ecosystem is smaller than LangGraph&apos;s.
          </strong>{" "}
          Fewer tutorials, fewer third-party evaluations,
          fewer community-maintained integrations. That
          gap is closing quickly but it is real.
        </li>
        <li>
          <strong>
            Tracing with parallel events can drop spans.
          </strong>{" "}
          Concurrent execution has known observability
          gaps in some tracing integrations. Test the
          fan-out pattern before you trust the traces at
          scale.
        </li>
        <li>
          <strong>
            The TypeScript story is smaller.
          </strong>{" "}
          The Python package is where the majority of
          feature work happens. If TypeScript is
          non-negotiable, look at Mastra or a
          TypeScript-first alternative first.
        </li>
        <li>
          <strong>
            LLM-driven handoffs are not free.
          </strong>{" "}
          Every handoff costs an extra tool call. On a
          five-agent research crew that can add real
          latency. The orchestrator pattern is often
          cheaper for small crews because the
          orchestrator itself only picks one tool per
          turn.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to use LlamaIndex Workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        Reach for Workflows when the system is document
        or knowledge-heavy, when you want the flow to be
        expressed in plain code rather than a graph
        object, when human-in-the-loop is a first-class
        requirement, and when the team is happy with
        Python. It is a strong fit for the kind of agents
        that read documents, extract structured data,
        route through a small set of specialists, and
        return a report. That covers a large slice of
        real client work in 2026: research reports, legal
        analysis, compliance reviews, back-office ops,
        and anything with a strong retrieval layer.
      </p>
      <p className="mb-6 leading-relaxed">
        Reach for a different framework when durability
        and time-travel debug are hard requirements
        (LangGraph), when the workflow is a natural fit
        for named roles (CrewAI), when you need the
        Microsoft or Azure story (Microsoft Agent
        Framework), or when TypeScript is the primary
        runtime (Mastra).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends to watch through 2026
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>MCP-native tools</strong> across every
          Workflow. The Model Context Protocol is
          becoming the default way to plug a tool into an
          agent, and Workflows follows the trend. See{" "}
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production
          </a>{" "}
          for how that layer maps onto agent tool calls.
        </li>
        <li>
          <strong>
            AgentWorkflow gaining more control knobs.
          </strong>{" "}
          The handoff heuristics are being tightened based
          on production feedback: hard caps on handoffs,
          role-specific prompts injected around the
          handoff tool, and better structured outputs to
          make the router more reliable.
        </li>
        <li>
          <strong>
            Deeper LlamaCloud integration.
          </strong>{" "}
          The commercial LlamaCloud runs Workflows behind
          hosted agent deployments and connects them to
          LlamaParse. Expect more of the Workflow
          templates that ship with the framework to
          assume LlamaCloud tools are available.
        </li>
        <li>
          <strong>
            Better checkpointing story.
          </strong>{" "}
          The gap with LangGraph on durable execution is
          the top request from teams shipping long-running
          Workflows. Expect first-party checkpointing to
          land as the AgentWorkflow layer matures.
        </li>
        <li>
          <strong>
            OpenTelemetry GenAI conventions.
          </strong>{" "}
          The tracing story is converging across every
          agent framework in 2026. Workflows already
          plays well with OTel, and further alignment
          with the emerging GenAI semantic conventions is
          on the roadmap.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        LlamaIndex Workflows is not the biggest agent
        framework in 2026, but it is the one we reach for
        when the problem is document-heavy, when the code
        needs to stay legible after six months, and when
        the team wants an event-driven runtime instead of
        a graph. The step-and-event model shrinks the
        orchestration code, loops fall out for free,
        AgentWorkflow gets a multi-agent system running
        in an afternoon, and the deployment story through
        llama-deploy or a plain FastAPI wrapper is not
        exotic. The framework has real weaknesses -
        LLM-driven handoffs that can misfire, durable
        execution that you build yourself, a smaller
        ecosystem than LangGraph - and we call them out
        on scoping calls, not on go-live.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements our default is to pick the
        framework by the shape of the problem, not by
        which one we like best. Documents and knowledge
        work with human-in-the-loop go to Workflows.
        Long-running flows that need durability and
        time-travel debug go to LangGraph. Role-heavy
        crews with clear specialists go to CrewAI. And
        TypeScript-first frontends often go to Mastra.
        The good news in 2026 is that every one of those
        picks is a reasonable one, and the choice is
        mostly about matching the runtime to the team.
        Workflows earns its place in that shortlist by
        being small, honest, and boring in the good way -
        the same properties that keep an agent alive on
        the first Monday in production.
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
          </a>
          {" "}- the stable release post covering typed
          state, resource injection, OpenTelemetry
          instrumentation, and the split into standalone
          Python and TypeScript packages.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/introducing-workflows-beta-a-new-way-to-create-complex-ai-applications-with-llamaindex"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex: Introducing Workflows (beta,
            August 2024)
          </a>
          {" "}- the original design post that explains why
          the team moved off DAG-based Query Pipelines and
          onto an event-driven architecture.
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
          {" "}- the launch post for the multi-agent
          abstraction with FunctionAgent, ReActAgent,
          handoff tools, state management, streaming, and
          the human-in-the-loop primitive.
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
          {" "}- the official comparison of AgentWorkflow,
          the orchestrator pattern with agents as tools,
          and the custom planner pattern, with runnable
          code for each.
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
          {" "}- the microservice deployment story with
          control plane, message queue, orchestrator, and
          workflow services, including code for a minimal
          deployment.
        </li>
        <li>
          <a
            href="https://arize.com/blog/llamaindex-workflows-a-new-way-to-build-cyclical-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arize AI: LlamaIndex Workflows, a new way to
            build cyclical agents
          </a>
          {" "}- an external engineering breakdown of the
          event-driven vs graph choice with an
          OpenTelemetry instrumentation walkthrough for
          Phoenix.
        </li>
        <li>
          <a
            href="https://www.langchain.com/resources/ai-agent-frameworks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangChain: The best AI agent frameworks in
            2026
          </a>
          {" "}- a competitor-authored survey of seven
          frameworks including LlamaIndex Workflows,
          useful because it is honest about the trade-offs
          from a rival perspective.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/case-study-how-caidera-ai-accelerates-life-sciences-marketing-with-llamaindex"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex case study: Caidera.ai
          </a>
          {" "}- the life sciences marketing automation
          case study with the 70 percent time reduction,
          3x faster compliance, and the multi-agent
          Workflow architecture behind it.
        </li>
        <li>
          <a
            href="https://www.llamaindex.ai/blog/jeppesen-a-boeing-company-saves-2-000-engineering-hours-with-unified-chat-framework-built-on"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LlamaIndex case study: Jeppesen (a Boeing
            company)
          </a>
          {" "}- the aviation operations chat framework
          with the ~2,000 engineering hours saved through
          a shared Workflow-based agent pattern.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph-based alternative with
          first-party durable execution and LangSmith
          tracing.
        </li>
        <li>
          <a
            href="/articles/crewai-production-multi-agent-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            CrewAI in production 2026
          </a>
          {" "}- the role-based multi-agent framework and
          its trade-offs against Workflows for specialist
          crews.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra for TypeScript agents in 2026
          </a>
          {" "}- the TypeScript-first alternative for teams
          not on Python.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the wider survey of orchestrator vs
          handoff vs planner patterns across every
          framework.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that every
          Workflow deployment needs before it ships.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents in 2026
          </a>
          {" "}- the Temporal and DBOS integration story
          for Workflows that need to survive redeploys
          and long-running executions.
        </li>
      </ul>
    </div>
  );
}
