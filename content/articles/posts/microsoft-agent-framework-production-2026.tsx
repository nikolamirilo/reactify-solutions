import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 30,
  slug: "microsoft-agent-framework-production-2026",
  title:
    "Microsoft Agent Framework in production 2026: the AutoGen and Semantic Kernel merger that runs on Foundry",
  excerpt:
    "How Microsoft Agent Framework merged AutoGen and Semantic Kernel into one production stack, what teams ship with it in 2026, and how it compares to the Claude Agent SDK, OpenAI Agents SDK, LangGraph, and CrewAI. Covers ChatAgent, workflows, Magentic and Handoff orchestration, durable execution, Foundry Hosted Agents, CodeAct, OpenTelemetry, and a clear-eyed look at where it wins and where it does not.",
  metaDescription:
    "A practical, technical guide to Microsoft Agent Framework 1.0 in production 2026. Covers the AutoGen and Semantic Kernel merger, ChatAgent and Workflow primitives, Magentic and Handoff orchestration, checkpointing with the Durable Extension on Azure, Foundry Hosted Agents with scale-to-zero and per-session VM sandboxes, CodeAct execution, declarative YAML agents, OpenTelemetry tracing, the Agent Governance Toolkit, and an honest comparison with the Claude Agent SDK, OpenAI Agents SDK, LangGraph, and CrewAI.",
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
    "Microsoft",
    "Microsoft Agent Framework",
    "AutoGen",
    "Semantic Kernel",
    "Azure",
    "Foundry",
    "Python",
    ".NET",
    "Production",
    "MCP",
    "A2A",
  ],
  publishDate: "2026-06-22",
  readingTime: "17 min read",
};

export default function MicrosoftAgentFrameworkProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For three years Microsoft shipped two agent libraries that did
        not talk to each other. Semantic Kernel grew out of Office and
        the Copilot team, was written first in C#, and treated agents
        as one feature of a broader plugin and planner runtime. AutoGen
        grew out of Microsoft Research, was written first in Python,
        and treated multi-agent conversations as the primary object.
        Both had real adoption, both kept shipping, and customers kept
        asking which one to pick. In October 2025 Microsoft announced
        the merge: a new project called Microsoft Agent Framework that
        absorbed both lineages, kept the best ideas from each, and
        committed to one shared runtime in Python and .NET. The 1.0 GA
        landed on April 2, 2026, and at Build 2026 in May the team
        shipped Hosted Agents on Foundry, CodeAct execution, and a new
        agent harness layer. Microsoft Agent Framework is now the
        default Microsoft answer to &ldquo;how do we ship an agent in
        production?&rdquo;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Two things changed in the second half of 2025 that made the
        merger inevitable. First, every enterprise agent project the
        Microsoft field team touched needed both halves of the stack:
        the typed connectors and observability Semantic Kernel had,
        and the multi-agent orchestration patterns AutoGen had.
        Picking one library meant rebuilding the other half by hand.
        Second, the protocol layer settled. Model Context Protocol
        (MCP) became the way agents talk to tools, Agent-to-Agent
        (A2A) became the way agents talk to other agents, and OpenAI
        and Anthropic both shipped their own production-grade agent
        SDKs (the OpenAI Agents SDK and the Claude Agent SDK). The
        Microsoft side could not keep shipping two competing libraries
        and still claim to be a serious agent platform. Agent Framework
        is the answer.
      </p>
      <p className="mb-6 leading-relaxed">
        The argument for picking it over the OpenAI or Anthropic SDKs
        is narrower than the marketing suggests. Agent Framework wins
        in three places: when the workload runs on Azure or has to,
        when the team already lives in .NET, and when the agent has
        to land inside Microsoft 365 (Copilot, Teams, Office). It
        loses, or at least ties, when the workload is a pure Python
        coding agent (the Claude Agent SDK is a closer fit) or a
        GPT-centric multi-agent stack with hosted browsing and
        Connector Registry (the OpenAI Agents SDK is a closer fit).
        Most teams we work with pick one primary SDK per workload,
        and Agent Framework is the right primary pick for any
        Microsoft-anchored shop.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>One library, two languages.</strong> agent-framework
          on PyPI (Python 3.10+) and Microsoft.Agents.AI on NuGet
          (.NET 8 and 9). Both ship the same primitives, the same
          orchestration patterns, and the same observability story.
          Cross-language A2A handoffs work between a Python agent
          and a .NET agent in the same workflow.
        </li>
        <li>
          <strong>1.0 GA on April 2, 2026.</strong> Stable APIs,
          long-term support commitment, and the official end of the
          AutoGen and Semantic Kernel split. Both predecessors stay
          maintained for a deprecation window, but new work goes to
          Agent Framework.
        </li>
        <li>
          <strong>Five orchestration patterns out of the box.</strong>{" "}
          Sequential, Concurrent, Handoff, Group Chat, and Magentic.
          All five support streaming, checkpointing, human-in-the-loop
          approvals, and pause and resume. Magentic is the planner
          pattern that came out of Microsoft Research and runs the
          team like a project manager.
        </li>
        <li>
          <strong>Six first-party model providers.</strong> Foundry,
          Azure OpenAI, OpenAI, Anthropic Claude, Amazon Bedrock,
          Google Gemini, and Ollama. The framework is provider
          agnostic at the model layer; the same Agent definition
          targets any of them.
        </li>
        <li>
          <strong>Foundry Hosted Agents, GA April 2026.</strong>{" "}
          Scale-to-zero billing (pay nothing while idle), per-session
          VM-isolated sandboxes, filesystem persistence across
          scale-to-zero events, and OpenTelemetry traces that flow
          into Application Insights with no extra wiring.
        </li>
        <li>
          <strong>CodeAct, shipped April 23, 2026.</strong> Collapses
          multi-step tool plans into one isolated code execution,
          cutting model turns by roughly half and latency along with
          them. The pattern came from research that showed models do
          better when they can write a short program than when they
          have to chain ten tool calls.
        </li>
        <li>
          <strong>Durable Task Extension.</strong> Lets a workflow
          survive process restarts. Completed executor and agent
          steps are not repeated after a crash; the workflow picks
          up at the last checkpoint. Runs on Azure Functions or your
          own worker process.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        From AutoGen and Semantic Kernel to Agent Framework
      </h2>
      <p className="mb-6 leading-relaxed">
        The merge is not a rename. Agent Framework is a new codebase
        that took specific ideas from each predecessor and left others
        behind. Knowing what came from where helps when you read the
        docs or migrate an existing project.
      </p>
      <p className="mb-6 leading-relaxed">
        From <strong>Semantic Kernel</strong> the framework inherited
        thread-based session state, the typed connector ecosystem (any
        IChatClient on .NET, any chat client on Python), filters and
        telemetry, the plugin model now reborn as a more flexible tool
        system, and the enterprise plumbing around identity, content
        safety, and Azure integration. If your existing project uses
        Semantic Kernel functions and prompt templates, the migration
        path is almost mechanical.
      </p>
      <p className="mb-6 leading-relaxed">
        From <strong>AutoGen</strong> the framework inherited the
        multi-agent orchestration patterns, the Magentic planner from
        the Magentic-One research paper, the GroupChat abstraction
        where agents take turns under a manager, and the
        research-driven approach to agent reasoning. If your existing
        project uses AutoGen GroupChats, the Agent Framework
        GroupChatBuilder and Magentic builder cover the same ground
        with a stable API.
      </p>
      <p className="mb-6 leading-relaxed">
        What got dropped: Semantic Kernel&rsquo;s planner (replaced by
        Magentic), AutoGen&rsquo;s code executor abstractions
        (replaced by CodeAct and Foundry sandboxes), and the duplicate
        prompt-template and function-calling layers that each library
        used to ship. The result is one runtime, one set of
        primitives, and one observability story.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: ChatAgent, tools, Workflows, orchestration
      </h2>
      <p className="mb-6 leading-relaxed">
        The surface is small. Five concepts cover almost every
        production use case; the rest of the docs is variations on
        how to wire them up.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>ChatAgent</strong> is the basic unit. You give it a
        chat client (OpenAI, Azure OpenAI, Foundry, Bedrock, Gemini,
        Ollama), an instruction string, a list of tools, and optional
        knobs for temperature and token limits. The agent runs a tool
        loop on every turn: it reads the message, decides whether to
        call a tool, runs the tool, reads the result, and either
        produces an answer or calls another tool. The loop ends when
        the model produces a final response.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>tool</strong> is a normal Python function (or .NET
        method) with type annotations. The framework reads the
        annotations, builds a JSON schema, and registers the tool
        with the chat client. There is no decorator soup: a function
        with annotated parameters and a docstring is enough. For
        more control, the @ai_function decorator lets you override
        the name, description, and parameter docs.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>Workflow</strong> is the deterministic counterpart
        to a single agent. Workflows are graphs of executors
        connected by edges. Each executor is a function or an agent;
        each edge is a typed message passing from one executor to
        the next. Workflows support fan-out, fan-in, conditional
        branching, loops, sub-workflows, checkpointing,
        human-in-the-loop approvals, and pause-and-resume. The model
        picks the next action inside an agent; the workflow picks
        the next executor across agents.
      </p>
      <p className="mb-6 leading-relaxed">
        An <strong>orchestration pattern</strong> is a pre-built
        workflow shape. Sequential runs agents one after another.
        Concurrent fans out the same prompt to several agents and
        collects the results. Handoff lets agents transfer control
        to each other based on the request. GroupChat puts agents in
        a room under a manager. Magentic runs the Magentic-One
        planner loop: a lead agent decomposes the task, picks the
        next agent at each step based on context, tracks progress in
        a ledger, detects loops, and synthesizes the final answer.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>thread</strong> is the agent&rsquo;s memory. Each
        ChatAgent has one or more threads; each thread holds the
        message history for one conversation. Threads can be stored
        in process memory for short tests, on disk for local
        development, in Cosmos DB for distributed production, or in
        Foundry-managed storage for hosted agents. The thread is
        what carries context across turns.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through the framework
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is two layers. The agent layer runs the
        model loop for one agent: pick a tool, run it, read the
        result, repeat. The workflow layer runs the graph that
        connects several agents: route the message, fan out, fan in,
        checkpoint, resume. A request enters at either layer; you
        do not pay for the workflow layer when one agent is enough.
      </p>
      <CodeBlock
        language="bash"
        filename="Agent Framework request path"
        code={`Your application (CLI, web service, Azure Function, chat UI)
        |
        |  agent.run("plan a trip to Paris", thread=thread)
        v
+----------------------------------------------------+
|  Workflow layer (optional)                         |
|                                                    |
|  1. Resolve next executor from the graph           |
|  2. Pass typed message on the edge                 |
|  3. Checkpoint state to storage                    |
|     - InMemory, File, Cosmos DB                    |
|  4. Pause for human approval if the edge says so   |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Agent layer                                       |
|                                                    |
|  1. Read thread (message history)                  |
|  2. Build tool list from @ai_function registry     |
|  3. Send to chat client (OpenAI, Foundry, Bedrock) |
|  4. Receive tool call                              |
|     - Filters fire (auth, content safety, log)     |
|     - Tool runs against process, MCP, or HTTP      |
|     - Result goes back to the model                |
|  5. Receive final assistant message                |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Telemetry                                         |
|  - OpenTelemetry spans (GenAI semantic conventions)|
|  - MCP _meta trace propagation                     |
|  - Application Insights, Foundry dashboards        |
+----------------------------------------------------+
        |
        v
   AgentRunResponse back to the caller`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of this flow carry the production work. The
        checkpoint storage is pluggable: the same workflow runs in
        memory in tests, in a file on a developer laptop, and in
        Cosmos DB in production. The OpenTelemetry layer is built
        in, not bolted on: every tool call, every model call, every
        executor transition emits a span with the GenAI semantic
        conventions, and the spans propagate across MCP boundaries
        through the MCP _meta field. And the filter layer (a
        Semantic Kernel inheritance) gives you a synchronous
        interception point on every tool call without rebuilding the
        agent loop.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Your first agent: ChatAgent with tools
      </h2>
      <p className="mb-6 leading-relaxed">
        The simplest useful agent is a few lines. The pattern below
        wraps an OpenAI chat client, registers two Python functions
        as tools, and runs the agent against one prompt. No
        decorators except the typing annotations.
      </p>
      <CodeBlock
        language="python"
        filename="weather_agent.py"
        code={`import asyncio
from typing import Annotated
from pydantic import Field
from agent_framework import ChatAgent
from agent_framework.openai import OpenAIChatClient


def get_weather(
    location: Annotated[str, Field(description="City to look up.")],
) -> str:
    """Return the current weather for a city."""
    return f"The weather in {location} is sunny, 22 C."


def get_attractions(
    location: Annotated[str, Field(description="City to look up.")],
) -> list[str]:
    """Return three attractions for a city."""
    return ["Louvre", "Eiffel Tower", "Sainte-Chapelle"]


async def main():
    agent = ChatAgent(
        chat_client=OpenAIChatClient(model_id="gpt-4.1"),
        name="trip-planner",
        instructions=(
            "You help travelers plan one-day trips. "
            "Always call get_weather before recommending an itinerary."
        ),
        tools=[get_weather, get_attractions],
    )

    result = await agent.run("Plan a day in Paris.")
    print(result.message.text)


asyncio.run(main())`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this snippet are worth pointing at. The
        Annotated typing is not decoration: it produces the JSON
        schema the model sees, so editing a Python signature also
        edits the tool description. The instructions string is
        where the business logic lives; the agent definition itself
        is glue. And the tools list is the security perimeter: the
        agent cannot call anything outside it, which is the same
        contract you get from a Claude Agent SDK allowed_tools list
        or an OpenAI Agents SDK tools list.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workflows: agents as graph executors
      </h2>
      <p className="mb-6 leading-relaxed">
        Once two or more agents need to coordinate, the workflow
        layer becomes useful. A workflow is a graph: nodes are
        executors (functions or agents), edges are typed messages
        that flow between them. The framework gives you a builder
        API to assemble the graph and a runtime to execute it. The
        runtime handles checkpointing, retries, fan-out and fan-in,
        and pause-and-resume for human approvals.
      </p>
      <CodeBlock
        language="python"
        filename="research_workflow.py"
        code={`from agent_framework import (
    ChatAgent, WorkflowBuilder, FileCheckpointStorage,
)
from agent_framework.openai import OpenAIChatClient

client = OpenAIChatClient(model_id="gpt-4.1")

researcher = ChatAgent(
    chat_client=client,
    name="researcher",
    instructions="Pull the top three facts on the topic from the web.",
    tools=[web_search],
)

writer = ChatAgent(
    chat_client=client,
    name="writer",
    instructions="Turn the research notes into a two-paragraph summary.",
)

editor = ChatAgent(
    chat_client=client,
    name="editor",
    instructions="Tighten the summary. Cut redundant sentences.",
)

# File-based checkpoints survive process restarts on a dev laptop.
storage = FileCheckpointStorage(path="./.checkpoints/research")

workflow = (
    WorkflowBuilder(checkpoint_storage=storage, name="research")
    .add_executor(researcher)
    .add_executor(writer)
    .add_executor(editor)
    .add_edge(researcher, writer)
    .add_edge(writer, editor)
    .build()
)

result = await workflow.run("Microsoft Agent Framework in production.")
print(result.final_output)`}
      />
      <p className="mb-6 leading-relaxed">
        The edges are typed. A researcher that returns a list of
        facts cannot connect to a writer that expects a single
        string without a transform on the edge; the builder fails
        at construction time, not at runtime. The checkpoint
        storage means the workflow can resume from the last
        completed executor after a crash, which is the difference
        between a toy and a workload you can put behind a public
        endpoint. Swap FileCheckpointStorage for
        CosmosCheckpointStorage in production and the rest of the
        workflow does not change.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Magentic and Handoff orchestration patterns
      </h2>
      <p className="mb-6 leading-relaxed">
        Most production multi-agent systems fit one of two shapes.
        Handoff is when you know which agents you have and how they
        connect; the workflow has a small set of directed edges,
        and each agent decides when to transfer control to the
        next. Magentic is when you have a team of specialists and
        you want a planner to pick the next move at each step
        based on the evolving task. The framework ships both as
        named patterns.
      </p>
      <CodeBlock
        language="python"
        filename="support_handoff.py"
        code={`from agent_framework import (
    ChatAgent, HandoffBuilder,
)
from agent_framework.openai import OpenAIChatClient

client = OpenAIChatClient(model_id="gpt-4.1")

triage = ChatAgent(
    chat_client=client,
    name="triage",
    instructions=(
        "Read the user message. Hand off to billing for refunds, "
        "to technical for bugs, to retention for cancellations."
    ),
)

billing = ChatAgent(
    chat_client=client,
    name="billing",
    instructions="Resolve refund and invoice questions.",
    tools=[lookup_invoice, issue_refund],
)

technical = ChatAgent(
    chat_client=client,
    name="technical",
    instructions="Diagnose product errors. Open a ticket if needed.",
    tools=[search_kb, open_ticket],
)

retention = ChatAgent(
    chat_client=client,
    name="retention",
    instructions="Try to keep the customer. Offer a one-month credit.",
    tools=[apply_credit],
)

workflow = (
    HandoffBuilder(participants=[triage, billing, technical, retention])
    .start_with(triage)
    .add_handoff(triage, [billing, technical, retention])
    .build()
)

result = await workflow.run(
    "I want a refund for my last invoice and I plan to cancel."
)`}
      />
      <p className="mb-6 leading-relaxed">
        HandoffBuilder injects the tool calls each agent uses to
        transfer control along the declared edges. The triage agent
        does not need a custom transfer_to_billing tool; the
        framework generates it from the participant list and the
        edges you declared. The Magentic variant looks similar but
        replaces HandoffBuilder with MagenticBuilder, drops the
        explicit edges, and adds a manager agent that picks the
        next speaker at each step. Magentic is the right pick when
        the task is open-ended (research, debugging, planning) and
        Handoff is the right pick when the team and the routing are
        stable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Durable execution with the Azure Durable Task extension
      </h2>
      <p className="mb-6 leading-relaxed">
        The default workflow runtime keeps checkpoints in your
        chosen storage, but the process running the workflow still
        has to stay up. For workflows that run for hours or days (a
        long research task, a fleet of human approvals, a periodic
        regulatory report), the Durable Task extension moves the
        runtime to Azure Functions or your own worker process. The
        workflow becomes durable: completed executor and agent
        steps are not repeated after a process restart, and the
        state lives in the durable backend.
      </p>
      <CodeBlock
        language="python"
        filename="durable_workflow.py"
        code={`from agent_framework import WorkflowBuilder
from agent_framework_durable import durable_workflow
from azure.functions import FunctionApp

app = FunctionApp()

# The workflow definition is the same as before;
# the durable decorator makes it survive restarts.
@durable_workflow(app, name="research")
def build_research_workflow():
    return (
        WorkflowBuilder(name="research")
        .add_executor(researcher)
        .add_executor(writer)
        .add_executor(editor)
        .add_edge(researcher, writer)
        .add_edge(writer, editor)
        .build()
    )

# An HTTP trigger starts the workflow.
@app.route("research")
async def start_research(req):
    workflow = build_research_workflow()
    instance_id = await workflow.start_async(req.params["topic"])
    return {"instance_id": instance_id}

# A second trigger checks status or resumes after a pause.
@app.route("research/status")
async def status(req):
    return await get_durable_status(req.params["instance_id"])`}
      />
      <p className="mb-6 leading-relaxed">
        Two hosting models are supported. Azure Functions is the
        managed path: the runtime, the storage, and the scaling are
        Microsoft&rsquo;s problem. Bring-your-own-compute lets you
        run the durable worker in your own service, container, or
        Kubernetes cluster, which is the right pick when the
        workload has to live in a regulated network or share a
        process with other code. The Durable Task framework
        underneath is the same one Microsoft has shipped for ten
        years to back Durable Functions, so the failure modes and
        operational story are well understood.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Foundry Hosted Agents: scale-to-zero with persistent state
      </h2>
      <p className="mb-6 leading-relaxed">
        The default deployment shape runs the framework in your own
        process. That works for CI jobs, internal tools, and any
        workload where you already operate a service. For teams
        that do not want to operate a service, Foundry Hosted
        Agents is the managed path. You package the agent as a
        container, push it to Foundry, and the platform handles
        identity, scaling, session state, and observability.
      </p>
      <p className="mb-6 leading-relaxed">
        Four properties make Hosted Agents different from a
        standard container service.{" "}
        <strong>Scale-to-zero</strong> means you pay nothing while
        no request is in flight; the container spins back up on the
        next request and the previous session state is intact.{" "}
        <strong>Per-session VM sandboxes</strong> give each
        conversation its own isolated environment, which matters
        when the agent runs code or touches files on behalf of a
        tenant. <strong>Filesystem persistence across
        scale-to-zero</strong> means files, disk state, and session
        identity survive the idle period; the agent picks up where
        it left off without rebuilding context. And{" "}
        <strong>built-in OpenTelemetry</strong> means traces flow
        into Application Insights with no extra wiring.
      </p>
      <CodeBlock
        language="bash"
        filename="hosted-agent.yaml"
        code={`# Deploy the agent declaratively.
apiVersion: foundry.microsoft.com/v1
kind: HostedAgent
metadata:
  name: trip-planner
  namespace: travel-team
spec:
  image: ghcr.io/example/trip-planner:1.4.0
  scaleToZero:
    idleSeconds: 60
  session:
    sandbox: vm-isolated
    persistence: enabled
  observability:
    appInsights: travel-prod-insights
  identity:
    managed: true
  models:
    - name: foundry-gpt-4.1
      role: primary
  governance:
    policy: travel-default`}
      />
      <p className="mb-6 leading-relaxed">
        The declarative YAML on Foundry mirrors the declarative
        agent and workflow definitions in the framework. The same
        person who edits the agent instructions can edit the
        deployment shape without learning a separate IaC language;
        the agent and the host travel together in version control.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        CodeAct: collapsing multi-step tool plans into one execution
      </h2>
      <p className="mb-6 leading-relaxed">
        Agents that chain many tool calls pay a model turn for
        each one. A workflow that reads three files, filters two
        of them, and writes a summary can spend ten or twelve
        turns on a task that takes one line of Python. CodeAct,
        shipped April 23, 2026, lets the agent write a short
        program that does the whole sequence in one shot. The
        program runs in an isolated sandbox, returns its output to
        the model, and the agent produces the final answer in one
        extra turn. Microsoft measured a roughly 50 percent
        reduction in turns for tasks that fit the pattern, and a
        matching latency reduction.
      </p>
      <p className="mb-6 leading-relaxed">
        The cost is a more powerful primitive: the sandbox has to
        run the code safely, the tool surface inside the sandbox
        has to be controlled, and the audit story has to cover
        code as well as tool calls. Agent Framework wires CodeAct
        to the Foundry sandbox by default, which gives the team a
        VM isolation boundary, a per-session sandbox lifetime, and
        the same OpenTelemetry spans the rest of the framework
        emits. Teams that want to run CodeAct outside Foundry can
        bring their own sandbox provider through the same
        interface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Declarative YAML agents and workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        For teams that want to keep the agent definition in version
        control without writing code, the framework supports
        declarative YAML agents. The YAML defines the instructions,
        tools, memory configuration, and orchestration topology;
        the framework loads it and runs it with one API call. The
        declarative path is the easiest way to ship the same agent
        in Python, .NET, and Hosted Agents on Foundry, because the
        YAML is portable across all three.
      </p>
      <CodeBlock
        language="bash"
        filename="trip-planner.agent.yaml"
        code={`name: trip-planner
description: Plans one-day trips and pulls weather plus attractions.
model:
  provider: foundry
  id: foundry-gpt-4.1
instructions: |
  You help travelers plan one-day trips.
  Always call get_weather before recommending an itinerary.
tools:
  - name: get_weather
    module: travel.tools
  - name: get_attractions
    module: travel.tools
memory:
  type: thread
  storage: cosmos
  container: travel-threads
observability:
  service: travel-agent
  endpoint: https://otel.example.com`}
      />
      <p className="mb-6 leading-relaxed">
        The .NET side ships a parallel package,
        Microsoft.Agents.AI.Workflows.Declarative, that loads the
        same YAML and produces an equivalent workflow object. A
        team that prototypes in Python can hand the YAML to a .NET
        application team without rewriting; the runtime contract
        is the same on both sides.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        OpenTelemetry and the Agent Governance Toolkit
      </h2>
      <p className="mb-6 leading-relaxed">
        Production agents need two things the framework gives away
        for free. The first is end-to-end tracing: every model
        call, tool call, executor transition, and MCP boundary
        emits an OpenTelemetry span that follows the GenAI
        semantic conventions. Microsoft contributed those
        conventions back to the OpenTelemetry project, so the
        spans Agent Framework emits land cleanly in any backend
        that supports OTLP: Application Insights, Honeycomb,
        Datadog, Grafana Cloud, Jaeger. The MCP _meta field
        carries the trace context across server boundaries, which
        is the only way to debug a tool call that fails inside a
        remote MCP server.
      </p>
      <p className="mb-6 leading-relaxed">
        The second is governance. The Agent Governance Toolkit
        sits beside Agent Framework and enforces policy at
        runtime: which models an agent can call, which tools it
        can invoke, which data classes it can read, and which
        actions a human has to approve. The toolkit reads policy
        from YAML or from a central policy service, applies it as
        an Agent Framework filter on every tool call, and writes
        the decisions to an audit log. The pattern lets a security
        team ship a policy bundle that an application team
        installs as a one-line dependency, which is the same
        shape the Claude Agent SDK uses for plugins.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns carry most of the production work we see on
        engagements.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal knowledge agents on Microsoft 365.</strong>{" "}
        An agent reads from SharePoint, Teams, and OneDrive
        through the Foundry connector layer, answers employee
        questions about policies, procurement, or HR, and hands
        off to a human when the answer is not in the index. The
        framework absorbs the identity story (the agent runs as a
        managed identity inside the tenant), the connector layer
        (every Microsoft 365 source has a first-party connector),
        and the audit trail (every read shows up in the same
        Purview log the rest of Microsoft 365 writes to). The
        engineering budget goes to the system prompt, the few
        custom tools, and the UX, not to the plumbing.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Operational copilots over Azure resources.</strong>{" "}
        A site reliability team builds an agent that reads Azure
        Monitor, walks the resource graph, surfaces the noisy
        service in a region, and drafts a rollback plan. The
        agent uses the Azure SDK for the tools, Foundry for the
        model, the framework&rsquo;s Magentic pattern for the
        planner, and Application Insights for the traces. The
        same agent runs in a developer terminal and as a Hosted
        Agent in Foundry; the only thing that changes is the
        storage class on the thread (in-memory for local, Cosmos
        for production).
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-language workflows in finance and
        manufacturing.</strong> A regulated workload has a .NET
        front-office system and a Python data science back end.
        Agent Framework gives both teams the same primitives and
        the same A2A contract, so a .NET agent that books an
        order can hand off to a Python agent that runs a
        risk model and back, without translating between two
        agent runtimes. The Durable Task extension makes the
        cross-language workflow survive process restarts on both
        sides, which is the property that lets the workload pass
        a regulator audit.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agent Framework vs Claude Agent SDK, OpenAI Agents SDK,
        LangGraph, CrewAI
      </h2>
      <p className="mb-6 leading-relaxed">
        Five frameworks own the production agent conversation in
        2026. They model the same problem differently and they
        fit different teams.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Claude Agent SDK</strong> is the closest peer
        on the coding-agent side. Both ship a tested agent loop, a
        hook (or filter) surface, sessions, subagents (or
        workflows with sub-workflows), and MCP. The Claude SDK
        ships Read, Write, Edit, Bash, Glob, Grep as first-class
        built-in tools and treats the agent as a filesystem-first
        actor. Agent Framework treats the agent as a chat client
        with a pluggable tool list; the built-in tools are
        thinner, but the connector ecosystem is wider. For a
        coding agent that operates on a repository, the Claude
        Agent SDK is a closer fit. For an enterprise agent that
        operates on Azure resources, SharePoint, or Teams, Agent
        Framework is.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>OpenAI Agents SDK</strong> is the closest peer
        on the GPT side. Both ship handoffs (or orchestration
        patterns), guardrails (or filters), and sessions. OpenAI
        ships Web Search, Computer Use, File Search, and the
        Connector Registry as hosted tools; Agent Framework does
        not, and a team that wants those without rebuilding them
        is better off on the OpenAI SDK. The OpenAI SDK is
        OpenAI-model-only in practice; Agent Framework runs the
        same agent against OpenAI, Foundry, Claude, Bedrock,
        Gemini, and Ollama, which matters when the workload is
        already multi-vendor.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph</strong> and Agent Framework are the
        two graph-first agent runtimes in the market. LangGraph
        is older, has more checkpoint backends in the wild, and a
        larger LangChain ecosystem around it. Agent Framework has
        the AutoGen orchestration patterns baked in, the Foundry
        Hosted Agents path, and the OpenTelemetry GenAI
        conventions out of the box. For a team that already
        speaks LangChain, LangGraph is the closer fit. For a team
        that wants the same library across Python and .NET, Agent
        Framework is.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>CrewAI</strong> is the role-first framework with
        the lowest learning curve. Twenty lines of Python ship a
        crew of agents with declared roles and tasks. Agent
        Framework is more verbose at the same scale but reaches
        production faster because checkpointing, OpenTelemetry,
        and durable execution are first-party concerns. CrewAI
        wins for prototypes and small workflows; Agent Framework
        wins once the workflow has to outlive a process restart
        or pass an audit.
      </p>
      <p className="mb-6 leading-relaxed">
        A rough decision rule we use on engagements. Pick Agent
        Framework when the workload is Microsoft-anchored, when
        the team is multi-language across Python and .NET, or
        when Foundry Hosted Agents is on the table. Pick the
        Claude Agent SDK for coding agents that live on a
        filesystem. Pick the OpenAI Agents SDK for multi-agent
        stacks that lean on OpenAI-hosted tools. Pick LangGraph
        for a stateful workflow inside a LangChain shop. Pick
        CrewAI for a prototype you have to ship by Friday. The
        five compose: an Agent Framework workflow can call out to
        a Claude Agent SDK subagent over A2A, and most production
        systems we ship in 2026 mix at least two of the five.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent Framework wins a lot of arguments in 2026, but it
        is not free. An honest list of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> One runtime in Python and
        .NET with the same primitives is a real engineering win;
        Spotify-scale cross-language workflows stop being a
        translation problem. Six first-party model providers,
        including non-Microsoft ones, mean the same agent runs on
        a Foundry endpoint in production and on a local Ollama
        in tests with no code change. OpenTelemetry is built in
        at the GenAI semantic-conventions level, so the trace
        landing in Application Insights is the same trace
        landing in Honeycomb. Workflows are graphs with typed
        edges, which catches a class of errors LangGraph users
        chase at runtime. The Durable Task extension is backed by
        a ten-year-old durable runtime, which is a different
        confidence level from a new checkpoint backend.
        Foundry Hosted Agents with scale-to-zero, per-session VM
        sandboxes, and filesystem persistence give the team a
        managed deployment shape that does not exist on any
        competing platform.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The framework is opinionated
        about the agent loop, the workflow shape, and the
        observability story; teams that want to write the loop
        themselves will fight the abstraction. The .NET and
        Python surfaces are intentionally aligned but the .NET
        side has a deeper Semantic Kernel heritage and the Python
        side has a deeper AutoGen heritage, which shows up in
        small idiomatic differences across the two SDKs. CodeAct
        is the newest primitive in the box (April 2026) and the
        sandbox integration outside Foundry is still maturing.
        The Hosted Agents tier is Foundry-only; teams that
        cannot put the agent on Foundry have to operate the
        service themselves. And the framework&rsquo;s biggest
        wins land in Azure-anchored shops; a non-Azure team gets
        a competent agent SDK but does not get the connector
        and identity layers that make the framework feel
        first-party.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A pure chat endpoint
        with no tools and no workflow does not need an agent
        framework at all; the openai or anthropic clients are
        enough. A coding agent that has to read and edit a
        repository on disk is a better fit for the Claude Agent
        SDK. A multi-agent stack that wants OpenAI-hosted Web
        Search, Computer Use, and the Connector Registry is a
        better fit for the OpenAI Agents SDK. A LangChain shop
        with a deep checkpointer story is a better fit for
        LangGraph. Above the complexity threshold of two agents,
        one workflow, and one durable backend, Agent Framework
        starts paying for itself.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the Agent Framework roadmap and the
        broader Microsoft agent platform for the next year and a
        half.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The agent harness layer becomes the default
        execution model.</strong> Microsoft introduced the agent
        harness at Build 2026 as the layer where model reasoning
        meets real execution: shell access, filesystem access,
        human-in-the-loop approvals, and long-running session
        context. The pattern is the same one the Claude Agent
        SDK built around the Claude Code harness; Microsoft is
        bringing it to Foundry. We expect the harness to be the
        default for new agent work by the end of 2026, with the
        bare ChatAgent shape reserved for short, stateless
        tasks.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-vendor agent collaboration over A2A.</strong>{" "}
        Microsoft is on the A2A steering committee with Google,
        Anthropic, and OpenAI, and the framework ships A2A as a
        first-class transport. The pattern that emerged in early
        2026 is that one team picks Agent Framework for the lead
        agent and consumes a Claude Agent SDK subagent over A2A
        when the task is filesystem-heavy. We expect this pattern
        to be the default by 2027, with the choice of agent
        framework becoming a per-agent decision rather than a
        per-system decision.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Open evals and the trust stack.</strong> At Build
        2026 Microsoft shipped the open trust stack for agents:
        evals that run across any framework, a control standard
        for runtime policy, and the Agent Governance Toolkit on
        top. The push is to make &ldquo;trustworthy agent&rdquo;
        a property a team can demonstrate to a regulator with
        artifacts (evals, traces, policy decisions) rather than a
        promise. We expect the eval format to converge across
        vendors in late 2026, the same way OpenTelemetry
        converged across observability vendors in the late
        2010s.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Declarative agents become the cross-language
        contract.</strong> The YAML agent format Agent Framework
        ships is the same format that loads into Foundry Hosted
        Agents and the same format the Microsoft 365 Copilot
        runtime reads. We expect the YAML to absorb the Claude
        Agent SDK skill format and the OpenAI Apps SDK
        connector format by late 2027, with the same YAML file
        running on three platforms.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the Microsoft side of the agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about Microsoft Agent Framework is
        that it is not trying to invent a new agent model. Typed
        tools, thread memory, orchestration patterns,
        checkpointed workflows, durable execution, and a managed
        deployment shape are all known ideas. What Microsoft
        contributed is one library that ships all of them in
        Python and .NET, sits on the Microsoft connector and
        identity story, and lands cleanly on Foundry without a
        separate IaC layer. For Microsoft-anchored shops, the
        argument against starting on Agent Framework is thin;
        the argument for adding a second SDK for a specific
        workload (Claude Agent SDK for filesystem-heavy coding,
        OpenAI Agents SDK for hosted browsing) is real but it
        composes, not replaces.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 where the team already lives
        in Azure or .NET, the migration cost from a hand-rolled
        client is small and the upside is the orchestration,
        durability, and observability the framework absorbs. For
        teams migrating from AutoGen or Semantic Kernel, the
        path is laid out, the deprecation window is generous,
        and the new primitives are a better fit for production
        than either predecessor was. The work that is left is
        the part that always matters: the system prompt, the
        custom tools, the safety policy, and the UX. The
        framework does the rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://learn.microsoft.com/en-us/agent-framework/overview/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Agent Framework overview (Microsoft Learn)
          </a>
          {" "}- the canonical reference for ChatAgent, Workflows,
          orchestration patterns, tools, threads, observability,
          and the .NET and Python SDKs.
        </li>
        <li>
          <a
            href="https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Agent Framework Version 1.0 (devblogs.microsoft.com)
          </a>
          {" "}- the April 2, 2026 GA announcement with the full
          list of 1.0 features, provider support, and the
          long-term support commitment.
        </li>
        <li>
          <a
            href="https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026-announce/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Agent Framework at BUILD 2026
            (devblogs.microsoft.com)
          </a>
          {" "}- the Build 2026 announcement covering the agent
          harness layer, Hosted Agents on Foundry, CodeAct, and
          the open trust stack.
        </li>
        <li>
          <a
            href="https://github.com/microsoft/agent-framework"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            microsoft/agent-framework (GitHub)
          </a>
          {" "}- the source repository for the Python and .NET
          SDKs, with the orchestration samples (sequential,
          concurrent, handoff, group chat, magentic) and the
          declarative workflow examples.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Workflow checkpoints (Microsoft Learn)
          </a>
          {" "}- the checkpointing reference for
          InMemoryCheckpointStorage, FileCheckpointStorage, and
          CosmosCheckpointStorage, plus the resume-and-pause
          tutorials.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/azure/durable-task/sdks/durable-agents-microsoft-agent-framework"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Durable Task Extension for Microsoft Agent Framework
            (Microsoft Learn)
          </a>
          {" "}- the Azure Durable Task integration with the
          Azure Functions and bring-your-own-compute hosting
          models.
        </li>
        <li>
          <a
            href="https://devblogs.microsoft.com/foundry/agent-service-build2026/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Build and run agents at scale with Microsoft Foundry
            at Build 2026 (Microsoft Foundry Blog)
          </a>
          {" "}- the Foundry Hosted Agents reference with the
          scale-to-zero, per-session sandbox, and observability
          guarantees.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/agent-framework/agents/observability"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Framework observability (Microsoft Learn)
          </a>
          {" "}- the OpenTelemetry integration with the GenAI
          semantic conventions and the MCP _meta trace
          propagation.
        </li>
        <li>
          <a
            href="https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Ships Production-Ready Agent Framework 1.0
            (Visual Studio Magazine)
          </a>
          {" "}- independent coverage of the 1.0 GA release with
          the positioning against AutoGen and Semantic Kernel.
        </li>
        <li>
          <a
            href="/articles/claude-agent-sdk-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Claude Agent SDK in production 2026
          </a>
          {" "}- the Anthropic side of the agent stack and the
          closest peer for coding-agent workloads.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the OpenAI side of the agent stack with the
          hosted browsing and Connector Registry that Agent
          Framework does not ship.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as state
            machines
          </a>
          {" "}- the graph-orchestration framework that
          competes most directly with the Agent Framework
          workflow layer.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the broader pattern of supervisors,
          specialists, and Magentic-style planners that Agent
          Framework ships as named orchestration patterns.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context Protocol
          that Agent Framework consumes as a first-class
          integration with trace propagation.
        </li>
        <li>
          <a
            href="/articles/a2a-protocol-cross-vendor-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            A2A protocol for cross-vendor agents in 2026
          </a>
          {" "}- the cross-framework agent collaboration
          protocol Agent Framework ships as a first-class
          transport.
        </li>
      </ul>
    </div>
  );
}
