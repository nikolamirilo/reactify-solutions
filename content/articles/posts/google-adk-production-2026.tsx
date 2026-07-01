import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 36,
  slug: "google-adk-production-2026",
  title:
    "Google Agent Development Kit (ADK) in production 2026: from Cloud Next launch to graph workflows across five languages",
  excerpt:
    "How Google's Agent Development Kit went from a Cloud Next 2025 open-source drop to a five-language framework powering Gemini Enterprise, Nokia's Autonomous Networks, and thousands of production agents. Covers ADK 1.0 vs 2.0, workflow agents, the new graph runtime, human-in-the-loop, MCP and A2A support, and the honest trade-offs against LangGraph, CrewAI, and the OpenAI Agents SDK.",
  metaDescription:
    "A practical, technical guide to Google Agent Development Kit (ADK) in 2026. Covers the Python, TypeScript, Go, Java, and Kotlin SDKs, LlmAgent and workflow agents, ADK 2.0 graph-based runtime, built-in human-in-the-loop, MCP and A2A support, the ADK Tools and Integrations Ecosystem, the Nokia Assurance Center rollout, deployment via Vertex AI Agent Engine and Cloud Run, and a clear-eyed comparison with LangGraph, CrewAI, and the OpenAI Agents SDK.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Google",
    "ADK",
    "Gemini",
    "Vertex AI",
    "Python",
    "Go",
    "Production",
    "MCP",
    "A2A",
  ],
  publishDate: "2026-07-01",
  readingTime: "15 min read",
};

export default function GoogleAdkProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Fifteen months ago the Agent Development Kit did
        not exist outside Google. Today it is the framework
        behind Gemini Enterprise agents, the six specialist
        agents Nokia embedded into its Autonomous Networks
        product, and thousands of open-source projects
        that ship with a <code>google-adk</code> or{" "}
        <code>@google/adk</code> dependency. ADK started
        as a Python drop at Google Cloud NEXT 2025, hit 1.0
        soon after, added TypeScript, Go, Java, and Kotlin
        during the year, and reached 2.0 for Python on May
        19, 2026 and for Go on June 30, 2026. This article is
        how we use ADK on client engagements: what the core
        primitives actually do, how the 2.0 graph runtime
        changes the shape of the code, and how ADK compares
        to LangGraph, CrewAI, and the OpenAI Agents SDK for
        production work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why ADK became a serious production choice in one
        year
      </h2>
      <p className="mb-6 leading-relaxed">
        The pitch is direct. ADK is the same framework
        Google runs inside Agentspace and the Customer
        Engagement Suite (CES), and it is open source under
        Apache 2.0. That is a rare combination in the agent
        space: most of the frameworks that ship with
        Google-scale production usage are proprietary, and
        most of the open-source frameworks are hobby projects
        that never touched a real workload. ADK is the
        exception. The Python SDK crossed 15,000 GitHub stars
        in less than a year, TypeScript hit 0.2.0 in February
        2026, Go and Java reached 1.0, and Google shipped a
        second major version of Python before most
        competitors shipped their first.
      </p>
      <p className="mb-6 leading-relaxed">
        The framework is deploy-anywhere by design. You can
        run an ADK agent in a plain Python or Go process,
        containerize it and drop it on any Kubernetes cluster,
        or take Google&rsquo;s managed path through Agent
        Runtime on the Gemini Enterprise Agent Platform (the
        product formerly known as Vertex AI). The trade-off
        is the same one every open framework asks you to
        make: full flexibility if you own the ops, or a
        one-command deploy if you hand the runtime to Google.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>April 9, 2025</strong>: Google announces
          the Agent Development Kit at Cloud NEXT 2025 as an
          open-source Python framework. The first release
          ships with <code>LlmAgent</code>, function tools,
          Google Search and code execution built in, plus
          the three workflow agents:{" "}
          <code>SequentialAgent</code>,{" "}
          <code>ParallelAgent</code>, and{" "}
          <code>LoopAgent</code>.
        </li>
        <li>
          <strong>Mid-2025</strong>: ADK 1.0 GA for Python.
          The framework becomes production stable. Google
          ships the <code>adk web</code> visual UI for local
          debugging, the eval command for regression testing,
          and one-command deploy to Vertex AI Agent Engine.
        </li>
        <li>
          <strong>Late 2025</strong>: ADK 1.0 for Java lands,
          followed by Go 1.0. The Python SDK gets richer MCP
          tool support and native A2A protocol integration
          through <code>to_a2a()</code>.
        </li>
        <li>
          <strong>February 27, 2026</strong>: The ADK Tools
          and Integrations Ecosystem launches with curated
          connectors for GitHub, GitLab, Jira, Confluence,
          MongoDB, Pinecone, Chroma, Qdrant, GoodMem, Notion,
          Linear, Asana, Daytona, Postman, and Restate, plus
          five observability platforms (AgentOps, Arize AX,
          Freeplay, MLflow, Monocle). The MLflow connector
          uses OpenTelemetry ingestion, making ADK an
          OpenTelemetry-native runtime.
        </li>
        <li>
          <strong>March 2026</strong>: TypeScript SDK reaches
          0.2.0 with <code>LlmAgent</code>, tool functions,
          and A2A support. ADK 2.0 Alpha 1 for Python opens
          for early testing: the shift from a hierarchical
          agent executor to a graph-based workflow engine.
        </li>
        <li>
          <strong>May 19, 2026</strong>: ADK Python 2.0 GA.
          The workflow runtime is now the default, agents
          are nodes in a graph, dynamic orchestration lets
          you write branching in plain Python, and
          human-in-the-loop is a first-class primitive.
        </li>
        <li>
          <strong>June 22, 2026</strong>: Nokia and Google
          Cloud announce a six-agent rollout inside the
          Nokia Assurance Center, all built on ADK. Nokia
          reports 50% to 80% faster network problem
          resolution.
        </li>
        <li>
          <strong>June 30, 2026</strong>: ADK Go 2.0 GA. The
          Go SDK gets the same graph runtime as Python, with
          typed function nodes, emitting function nodes,
          agent nodes, tool nodes, join nodes, dynamic nodes,
          and parallel workers.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: Agent, Tool, Runner, Session, Event
      </h2>
      <p className="mb-6 leading-relaxed">
        Five primitives carry the whole framework in 1.x and
        remain the base in 2.0. An <strong>Agent</strong>{" "}
        is a role, an instruction, a model, a set of tools,
        and (optionally) a set of sub-agents. A{" "}
        <strong>Tool</strong> is a Python or Go function the
        agent can call, an MCP tool exposed by a remote
        server, or another agent wrapped as an{" "}
        <code>AgentTool</code>. The <strong>Runner</strong>{" "}
        drives the event loop: it takes user input, calls the
        agent, streams tool calls and model responses back as
        events, and persists them in the session. A{" "}
        <strong>Session</strong> is the durable memory for a
        single conversation - user id, session id, state
        dictionary, and the ordered event history. An{" "}
        <strong>Event</strong> is the unit of work: a user
        message, a model response, a tool call, or in 2.0 a
        graph node emission.
      </p>
      <CodeBlock
        language="bash"
        filename="ADK execution model (1.x and 2.0)"
        code={`+----------------------------------------------------+
|  Runner                                            |
|                                                    |
|   +------------+       +------------------------+  |
|   |  User      |------>|  Session Service       |  |
|   |  Input     |       |   - state dict         |  |
|   +------------+       |   - event history      |  |
|                        +-----------+------------+  |
|                                    |               |
|                                    v               |
|                        +------------------------+  |
|                        |  Agent (root)          |  |
|                        |   - LlmAgent           |  |
|                        |   - Sequential/        |  |
|                        |     Parallel/Loop      |  |
|                        |   - sub_agents[]       |  |
|                        |   - tools[]            |  |
|                        +-----------+------------+  |
|                                    |               |
|                        +-----------+------------+  |
|                        |  Model provider        |  |
|                        |   - Gemini / LiteLLM   |  |
|                        |     (Anthropic, OpenAI,|  |
|                        |     Mistral, Meta ...) |  |
|                        +-----------+------------+  |
|                                    |               |
|                                    v               |
|                        +------------------------+  |
|                        |  Events stream         |  |
|                        |   (async generator)    |  |
|                        +------------------------+  |
+----------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The smallest useful agent is five lines. The example
        below is a research agent that can call the built-in
        Google Search tool.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/researcher/agent.py"
        code={`from google.adk.agents import LlmAgent
from google.adk.tools import google_search

root_agent = LlmAgent(
    name="researcher",
    model="gemini-2.5-flash",
    instruction=(
        "You help users research topics thoroughly. "
        "Cite every claim with a source URL."
    ),
    description="Researches topics and returns cited notes.",
    tools=[google_search],
)`}
      />
      <p className="mb-6 leading-relaxed">
        Four details in that snippet carry the production
        work. The <code>name</code> is what the framework uses
        to route delegations and to label events in traces,
        so it has to be unique across the agent tree. The{" "}
        <code>description</code> is what other agents read
        when they decide whether to hand off, which makes it
        the most load-bearing string when you compose agents.
        The <code>instruction</code> is the system prompt for
        this agent only; sub-agents get their own. And{" "}
        <code>tools=[google_search]</code> is what turns the
        agent into more than a prompt: the framework handles
        the tool-calling loop, the parse of the function
        response, and the retry on failure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workflow agents: Sequential, Parallel, Loop
      </h2>
      <p className="mb-6 leading-relaxed">
        The step past a single agent is a workflow agent. ADK
        1.x ships three of them and 2.0 keeps them as
        convenience wrappers on top of the graph runtime.{" "}
        <code>SequentialAgent</code> runs its sub-agents one
        after another and threads the previous output into
        the next agent&rsquo;s context.{" "}
        <code>ParallelAgent</code> fans out to sub-agents
        concurrently and gathers the results.{" "}
        <code>LoopAgent</code> re-runs its sub-agents until an
        exit condition triggers - either a max iteration
        count or an agent that emits an escalate event.
      </p>
      <p className="mb-6 leading-relaxed">
        The Google Cloud trip planner walkthrough is the
        cleanest showcase. Three specialist agents (flight,
        hotel, sightseeing) run in a fan-out plus fan-in
        pattern under a root <code>SequentialAgent</code>,
        with a <code>ParallelAgent</code> pulling flight and
        hotel data concurrently and a summariser that
        collects the results.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/trip_planner/agent.py"
        code={`from google.adk.agents import (
    LlmAgent, SequentialAgent, ParallelAgent,
)

flight_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="FlightAgent",
    description="Flight booking agent.",
    instruction=(
        "You are a flight booking agent. "
        "Return a JSON object with airline, price, times."
    ),
    output_key="flight_result",
)

hotel_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="HotelAgent",
    description="Hotel booking agent.",
    instruction=(
        "You are a hotel booking agent. "
        "Return a JSON object with hotel, price, nights."
    ),
    output_key="hotel_result",
)

sightseeing_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="SightseeingAgent",
    description="Sightseeing information agent.",
    instruction=(
        "Return the top three sights near the destination "
        "as a JSON list of name, category, and open hours."
    ),
    output_key="sights_result",
)

plan_parallel = ParallelAgent(
    name="ParallelTripPlanner",
    sub_agents=[flight_agent, hotel_agent],
)

trip_summary = LlmAgent(
    model="gemini-2.5-flash",
    name="TripSummaryAgent",
    instruction=(
        "Summarise the trip using flight_result, hotel_result, "
        "and sights_result from session state."
    ),
    output_key="trip_summary",
)

root_agent = SequentialAgent(
    name="PlanTripWorkflow",
    sub_agents=[sightseeing_agent, plan_parallel, trip_summary],
)`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make this production-ready. The{" "}
        <code>output_key</code> field on each sub-agent tells
        the framework to store the result under a named key
        in the session state; the summariser then reads those
        keys directly, so the handoff is typed rather than
        parsed out of prose. The <code>ParallelAgent</code>{" "}
        is a genuine <code>asyncio.gather</code> under the
        hood, so the flight and hotel lookups happen at once
        and the walltime is the slower of the two. And
        composing a <code>ParallelAgent</code> inside a{" "}
        <code>SequentialAgent</code> is the standard fan-out
        plus fan-in pattern for any pipeline with independent
        steps.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agents as tools: hierarchies without lock-in
      </h2>
      <p className="mb-6 leading-relaxed">
        The other composition path is <code>AgentTool</code>:
        wrap a specialist agent as a callable tool and pass it
        into a coordinator. This shape works better than
        sub-agent delegation when the coordinator needs to
        stay in the loop, call the specialist more than once,
        and then continue reasoning with the result. The
        Google Cloud trip planner post walks through the
        upgrade path from a plain <code>sub_agents</code>{" "}
        list (where the coordinator hands off and cannot come
        back) to the tool pattern (where it keeps control).
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/coordinator/agent.py"
        code={`from google.adk.agents import LlmAgent, agent_tool

flight_tool = agent_tool.AgentTool(agent=flight_agent)
hotel_tool = agent_tool.AgentTool(agent=hotel_agent)
sightseeing_tool = agent_tool.AgentTool(agent=sightseeing_agent)

root_agent = LlmAgent(
    model="gemini-2.5-pro",
    name="TripPlanner",
    instruction=(
        "You are a trip planner. Call the flight, hotel, "
        "and sightseeing tools in the order that best "
        "answers the user's request. Combine the results "
        "into a single itinerary."
    ),
    tools=[flight_tool, hotel_tool, sightseeing_tool],
)`}
      />
      <p className="mb-6 leading-relaxed">
        The switch from <code>sub_agents=[...]</code> to{" "}
        <code>tools=[AgentTool(...), ...]</code> is a small
        code change with a large behavioural one: the
        coordinator now decides the call order, can call the
        same specialist twice, and can weave tool calls
        together with its own reasoning. The trade-off is
        cost. Every tool call adds a round-trip through the
        coordinator&rsquo;s model, so this pattern is more
        expensive per run than a Sequential or Parallel
        workflow with the same set of specialists.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Model choice: Gemini first, LiteLLM for the rest
      </h2>
      <p className="mb-6 leading-relaxed">
        ADK is optimised for Gemini but not tied to it. The
        default path is a Gemini model string
        (<code>gemini-2.5-flash</code>,{" "}
        <code>gemini-2.5-pro</code>, or the newer
        experimental releases), which the framework wires to
        either Google AI Studio (for API-key access) or
        Vertex AI (for enterprise auth and audit). Every
        other provider goes through LiteLLM: Anthropic,
        OpenAI, Mistral, Meta, AI21, plus local models via
        Ollama. The pattern is the same everywhere.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/multi_model.py"
        code={`from google.adk.agents import LlmAgent
from google.adk.models.lite_llm import LiteLlm

planner = LlmAgent(
    model="gemini-2.5-pro",
    name="Planner",
    instruction="Plan the work. Delegate to workers.",
)

worker_openai = LlmAgent(
    model=LiteLlm(model="openai/gpt-5.1-mini"),
    name="WorkerOpenAI",
    instruction="Do the specific step assigned.",
)

worker_anthropic = LlmAgent(
    model=LiteLlm(model="anthropic/claude-4.7-sonnet"),
    name="WorkerAnthropic",
    instruction="Do the specific step assigned.",
)

worker_local = LlmAgent(
    model=LiteLlm(model="ollama/llama-4-8b"),
    name="WorkerLocal",
    instruction="Do the specific step assigned.",
)`}
      />
      <p className="mb-6 leading-relaxed">
        The practical rule is: pin the model per agent, not
        per workflow. The coordinator or planner runs on the
        bigger model because its output steers the whole run;
        the workers run on the cheap or local model because
        their prompts are narrow. Teams that skip this end up
        paying pro-tier prices for every step in a Sequential
        workflow that could have been served by a smaller
        model on the leaves.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP and A2A: talking to the rest of the agent world
      </h2>
      <p className="mb-6 leading-relaxed">
        ADK talks two cross-vendor protocols out of the box.
        The Model Context Protocol (MCP) is how ADK agents
        pick up remote tool servers, and the Agent2Agent
        (A2A) protocol is how ADK agents call, and expose
        themselves to, agents in other frameworks. Both are
        first-party in ADK: MCP through the{" "}
        <code>MCPToolset</code> class, A2A through the{" "}
        <code>to_a2a()</code> helper that lifts any ADK agent
        into an A2A server.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/mcp_agent.py"
        code={`from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool import MCPToolset, StdioServerParameters

filesystem_mcp = MCPToolset(
    connection_params=StdioServerParameters(
        command="npx",
        args=["-y", "@modelcontextprotocol/server-filesystem", "/data"],
    ),
)

agent = LlmAgent(
    name="doc_agent",
    model="gemini-2.5-flash",
    instruction=(
        "Read and summarise files under /data. "
        "Only touch files you were asked about."
    ),
    tools=[filesystem_mcp],
)`}
      />
      <p className="mb-6 leading-relaxed">
        A2A is the other direction. Once an ADK agent is
        wrapped with <code>to_a2a()</code>, it exposes an
        A2A-compliant HTTP endpoint that any other A2A
        client (CrewAI, LangGraph, the OpenAI Agents SDK, the
        Microsoft Agent Framework) can call. The same agent
        artefact serves internal tools and external partners
        without a rewrite. This is the same story we covered
        in the a2a-protocol-cross-vendor-agents-2026 article,
        just from the ADK side.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        ADK 2.0: the graph runtime and why it matters
      </h2>
      <p className="mb-6 leading-relaxed">
        The shift from 1.x to 2.0 is the biggest change in
        the framework so far. In 1.x, agents were the
        executors and the workflow agents were the only path
        to composition. In 2.0, everything is a node in a
        graph, and the graph engine is the executor. Agents,
        tools, and plain functions all live under a single{" "}
        <code>BaseNode</code> contract, edges route between
        them, and the engine handles concurrency, state
        persistence, retries, and pauses for human input.
      </p>
      <p className="mb-6 leading-relaxed">
        The direction is the same one LangGraph took two
        years earlier and the one the Claude Agent SDK is
        taking with sub-agents plus skills. The move matters
        because it makes durable execution, cyclic workflows,
        and human-in-the-loop into first-class primitives
        rather than patterns you have to build. A workflow
        that pauses for a manager to approve a refund, resumes
        an hour later, and passes the human&rsquo;s input into
        the next node is a few lines of graph code in 2.0; in
        1.x it was a session-state hack.
      </p>
      <CodeBlock
        language="python"
        filename="src/workflows/refund_flow.py (ADK 2.0)"
        code={`from google.adk.workflows import (
    Workflow, function_node, agent_node, join_node,
    StringRoute,
)
from google.adk.workflows.hitl import request_human_input

classifier = agent_node(classifier_agent)
lookup = function_node(lookup_order)   # plain typed Python
approver = function_node(
    lambda ctx, order:
        request_human_input(
            ctx,
            question=f"Approve refund for {order.id}?",
            schema=ApprovalSchema,
        )
)
issue = function_node(issue_refund)
reject = function_node(record_rejection)

wf = (
    Workflow(name="refund_flow")
    .add_edge(classifier, lookup, StringRoute("refund"))
    .add_edge(classifier, reject, StringRoute("not_refund"))
    .add_edge(lookup, approver)
    .add_edge(approver, issue, StringRoute("approved"))
    .add_edge(approver, reject, StringRoute("denied"))
)

# wf is an agent. It runs in the same Runner as any other
# ADK agent, and the graph pauses durably at the approver.`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of the 2.0 engine change how you
        design real workflows. First,{" "}
        <strong>the graph pauses durably</strong>: when the
        approver node calls <code>request_human_input</code>,
        the state is persisted, the process can restart, and
        the workflow resumes when the human replies (even
        across process restarts). Second,{" "}
        <strong>retries are built in</strong>: each node
        carries a <code>RetryConfig</code> with exponential
        backoff and jitter, so you no longer wrap tool code
        in a manual try or except loop (and if you do, the
        2.0 docs warn that catching <code>BaseException</code>{" "}
        breaks the HITL pause mechanism). Third,{" "}
        <strong>observability is native</strong>: every node
        emits OpenTelemetry spans, so the workflow shows up
        in Cloud Trace, MLflow, Arize AX, or any OTel-aware
        backend without extra instrumentation.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Five languages, one contract
      </h2>
      <p className="mb-6 leading-relaxed">
        The five-language rollout is the other thing that
        sets ADK apart from most agent frameworks. Python is
        the reference, TypeScript is the web-first path, Go
        is the SDK teams pick when they already run agent
        code inside their existing Go services, Java and
        Kotlin are the enterprise picks for teams on Spring
        or Ktor. The API surface is the same across all five,
        and the interrupt format is shared, so a Python
        workflow can be paused, the state serialised, and
        the run resumed by a Go worker on a different node.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/researcher.ts (TypeScript)"
        code={`import { LlmAgent, GOOGLE_SEARCH } from "@google/adk";

export const researcher = new LlmAgent({
  name: "researcher",
  model: "gemini-2.5-flash",
  instruction: "You help users research topics thoroughly.",
  description: "Researches topics and returns cited notes.",
  tools: [GOOGLE_SEARCH],
});`}
      />
      <CodeBlock
        language="bash"
        filename="ADK Go 2.0 workflow node types"
        code={`Function node        typed Go function            input -> output
Emitting function    fn + emit callback          streams events, pauses
Agent node           any agent.Agent             LlmAgent as a step
Tool node            any tool.Tool               a tool as a step
Join node            fan-in barrier              wait for all predecessors
Dynamic node         plain Go orchestration      RunNode(...) in a loop
Workflow node        embedded sub-workflow       graphs compose
Parallel workers     one node * many items       aggregate results
State-bound node     Params from session state   no manual plumbing`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth calling out about the Go
        release. First, the ADK Go 2.0 announcement (June
        30, 2026) landed with a{" "}
        <code>iter.Seq2</code>-based event stream that
        integrates naturally into idiomatic Go services -
        the runtime does not force a special harness or a
        new server. Second, the interrupt format is shared
        with Python, so a graph paused for HITL in Python
        can be resumed in Go, which is exactly what teams
        with mixed-language codebases have been asking for.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deployment: Agent Runtime, Cloud Run, or your own
        container
      </h2>
      <p className="mb-6 leading-relaxed">
        ADK does not lock you into Google Cloud, but it makes
        the Google path the shortest. The three deployment
        options in production are Agent Runtime on the Gemini
        Enterprise Agent Platform (fully managed, one-command
        deploy, built-in auth and Cloud Trace), Cloud Run or
        GKE (containerised, you own the ops but you get the
        rest of Google Cloud), and a container on any
        Kubernetes cluster or bare VM (no Google Cloud
        dependency at all).
      </p>
      <CodeBlock
        language="python"
        filename="src/deploy/agent_engine.py"
        code={`import vertexai
from vertexai import agent_engines
from google.adk.agents import LlmAgent

vertexai.init(
    project="my-gcp-project",
    location="us-central1",
    staging_bucket="gs://my-adk-staging",
)

root_agent = LlmAgent(
    name="assistant",
    model="gemini-2.5-flash",
    instruction="You are a helpful assistant.",
)

# One-command deploy to Vertex AI Agent Engine
remote_agent = agent_engines.create(
    agent_engine=root_agent,
    requirements=["google-adk>=2.0"],
    display_name="production-assistant",
)

print("Deployed to:", remote_agent.resource_name)`}
      />
      <CodeBlock
        language="bash"
        filename="Cloud Run deployment"
        code={`# Package with the ADK CLI
adk deploy cloud-run \\
  --project my-gcp-project \\
  --region us-central1 \\
  --service assistant \\
  --path ./src/agents/assistant

# Or containerize manually and deploy anywhere
docker build -t gcr.io/my-gcp-project/assistant:v1 .
gcloud run deploy assistant \\
  --image gcr.io/my-gcp-project/assistant:v1 \\
  --region us-central1`}
      />
      <p className="mb-6 leading-relaxed">
        The rule we use is: start on Cloud Run for anything
        under a hundred requests per second, move to Agent
        Runtime once you need managed session storage,
        built-in auth flows, and Cloud Trace observability
        without instrumentation, and pick your own container
        on Kubernetes only when you have a hard requirement
        to run inside your own VPC without the Vertex AI
        control plane in the middle.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The ADK Tools and Integrations Ecosystem
      </h2>
      <p className="mb-6 leading-relaxed">
        The February 27, 2026 release of the ADK Tools and
        Integrations Ecosystem was the moment ADK stopped
        looking like just a framework and started looking
        like an execution layer. The announcement shipped
        curated connectors in four categories: code and
        development (Daytona, GitHub, GitLab, Postman,
        Restate), project and work management (Asana,
        Atlassian, Linear, Notion), data and memory (Chroma,
        MongoDB, Pinecone, GoodMem, Qdrant), and
        observability (AgentOps, Arize AX, Freeplay, MLflow,
        Monocle).
      </p>
      <p className="mb-6 leading-relaxed">
        The MLflow integration is the one to watch. ADK emits
        OpenTelemetry spans natively for agent runs, tool
        calls, and model requests, and MLflow 3.6.0 or newer
        ingests them through OTLP. That means agent behaviour
        flows into the same observability pipelines as
        infrastructure metrics and application traces, which
        is exactly the pattern Futurum Research called out
        as the observability-native architecture. Once agent
        behaviour is treated as primary telemetry, it can be
        queried the same way any other production signal is:
        SLOs, alerts, incident timelines, and audit trails
        without custom instrumentation per agent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production: Nokia, Agentspace, and Google&rsquo;s
        own products
      </h2>
      <p className="mb-6 leading-relaxed">
        The reference deployment for ADK is Google itself.
        The framework is what runs Agentspace (Google&rsquo;s
        enterprise agent surface) and the Customer Engagement
        Suite (CES), which is the same product used at
        Google&rsquo;s scale. The open-sourcing decision was
        the point at which the framework Google used
        internally became the framework anyone can pick up.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Nokia Autonomous Networks (June 2026).</strong>{" "}
        Nokia shipped six specialist agents inside the Nokia
        Assurance Center, all built with ADK on the Gemini
        Enterprise Agent Platform. The set includes a router
        agent (central orchestration and guardrails), an
        event triage agent (correlate alarms against
        historical patterns), a KPI selector agent (domain
        interpretation of performance metrics), an anomaly
        reasoner (deviation vs false alarm), an action
        reasoner (map events to remediation catalogue), and
        a dashboard agent (generate visual analytics from
        natural language). Nokia reports 50% to 80% faster
        network problem resolution and cites &ldquo;glass
        box autonomy&rdquo; as the operating pattern: agents
        recommend, humans approve, closed-loop only for
        low-risk policy-approved scenarios. The stack is
        Kubernetes plus Google Cloud Storage with no custom
        managed services in between, and the availability
        model is SaaS on Google Cloud Marketplace starting
        September 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent Garden and public code samples.</strong>{" "}
        Google&rsquo;s <code>google/adk-samples</code> repo
        is the other place to see production shape. The
        samples include a short-movie agent (a multi-modal
        pipeline that produces a scripted 90-second video), a
        multi-agent research assistant with BigQuery and
        Vertex AI Search, and a data-analysis agent that
        connects to AlloyDB and BigQuery through the
        connector layer. Each sample is a full project with
        the deployment config, the eval set, and the trace
        setup.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        ADK vs LangGraph vs CrewAI vs OpenAI Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The framework choice in 2026 is not a winner-takes-all
        question, and every serious client engagement we run
        involves at least two of these four SDKs living in
        the same codebase. Here is the honest read on when
        ADK is the right pick.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick ADK</strong> when you are already on
        Google Cloud, when you want a single framework that
        covers Python, TypeScript, Go, Java, and Kotlin,
        when the deploy target is Vertex AI Agent Engine
        (the one-command path is real), or when you need
        graph workflows, HITL, and durable execution as
        first-class primitives without a separate durable
        runtime under the graph. The BigQuery, AlloyDB, and
        Apigee integrations are also unique to ADK; if your
        agents need to reach a hundred pre-built enterprise
        connectors without custom code, ADK is the shortest
        path.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick LangGraph</strong> when the workflow is
        a complex state machine that predates the
        graph-based rewrite in ADK 2.0 and your team already
        knows LangSmith. LangGraph is more mature on the
        graph story by a year of production usage, and the
        LangSmith trace surface is still the reference for
        graph debugging.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick CrewAI</strong> when the work maps
        cleanly to named roles (researcher, writer, editor)
        and the time-to-first-prototype matters more than
        the time-to-first-edge-case. CrewAI&rsquo;s
        role-goal-backstory abstraction reads well to
        non-technical stakeholders, and Crews plus Flows
        gives you a two-tier path from prototype to
        production.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick the OpenAI Agents SDK</strong> when the
        workflow is OpenAI-first, when the AgentKit visual
        layer is the right surface for non-engineers to
        maintain, or when the built-in Realtime API is the
        binding constraint (voice, sub-second latency, native
        streaming to a browser).
      </p>
      <p className="mb-6 leading-relaxed">
        The rule we use on engagements: if the first sentence
        that describes the workflow starts with &ldquo;our
        Google Cloud tenant already has&hellip;&rdquo; or
        &ldquo;we run a mixed Python and Go stack
        and&hellip;&rdquo;, ADK is probably the right pick. If
        it starts with &ldquo;a state machine that
        loops&hellip;&rdquo;, LangGraph. If it starts with
        &ldquo;a team of agents that&hellip;&rdquo;, CrewAI.
        If it starts with &ldquo;an OpenAI-first
        product&hellip;&rdquo;, the OpenAI Agents SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        Five honest reads on what ADK gets right and where
        it still bites.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> ADK is the only major
        agent framework that ships in five languages with a
        shared contract, which alone makes it the default
        pick for teams with mixed-language codebases. The
        graph runtime in 2.0 is a proper first-class
        engine, not a wrapper over sub-agent delegation, and
        HITL, durable pause, retries, and OpenTelemetry
        tracing are all built in. The Vertex AI Agent
        Engine and Cloud Run deploy paths are the shortest
        we have seen from any framework: a single command
        gets you a managed HTTPS endpoint with auth, quotas,
        and traces. And ADK works with any LLM through
        LiteLLM, so the Gemini-first framing does not lock
        you into one provider.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The 2.0 rewrite
        introduced real breaking changes: the event schema
        added <code>node_info</code> and <code>output</code>{" "}
        fields, custom session storage with rigid columns
        needs a migration, and any code that manually
        appended events to the session (a common 1.x hack)
        breaks the graph engine. The migration is mechanical
        but it is not zero. The TypeScript SDK is still at
        0.2.0 and lags the Python and Go SDKs on features;
        production TypeScript teams should treat it as
        beta-quality until 1.0 lands. And the ecosystem
        story leans hard on Google Cloud - the framework
        does run anywhere, but the connector library, the
        Agent Garden, and the deploy story are richer if you
        stay inside the Google Cloud tenant.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> If your team
        needs a mature LangGraph-style graph runtime today
        and cannot risk any 2.0 rough edges, LangGraph is
        the safer pick. If your workflow is a single agent
        with a single tool, ADK is overkill; call the model
        directly through <code>google-genai</code> or the
        provider SDK. If the constraint is browser-side
        agents (React or Next.js UI that runs the model
        inline), the Vercel AI SDK plus AG-UI protocol is a
        better fit than ADK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Six production patterns we run on every ADK
        engagement
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Pin the model per agent, not per
        workflow.</strong> Planners and coordinators run on{" "}
        <code>gemini-2.5-pro</code> because their output
        steers the whole run. Workers run on{" "}
        <code>gemini-2.5-flash</code> or a LiteLLM-routed
        smaller model. The cost delta at scale is typically
        a factor of three or more.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Use <code>output_key</code> and typed
        Pydantic outputs on every step that feeds another
        step.</strong> A step that returns free-form prose
        is hard for the next agent to consume. A step that
        writes a typed value to session state is a clean
        handoff and shows up in traces as a structured
        object.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Trace with OpenTelemetry from day
        one.</strong> ADK emits OTel spans natively. Wire
        them into Cloud Trace, MLflow, or Arize AX before
        the first user touches the agent. The cost of
        figuring out why a graph misbehaved at 2 AM is much
        higher without a trace than with one.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Move to ADK 2.0 graphs the moment you
        need retries, HITL, or a cycle.</strong> The
        Sequential, Parallel, and Loop agents in 1.x cover
        clean pipelines. The moment you need durable pauses,
        cyclic workflows, or a retry with jitter, drop into
        the graph runtime. Do not build any of these in
        session-state hacks; the 2.0 primitives are cleaner
        and observable.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Run ADK agents behind a job queue when
        the runtime is over a few seconds.</strong> An HTTPS
        request handler is not the right shape for an agent
        run that takes 30 seconds. Push the kickoff to a
        background worker (Cloud Run Jobs, a Pub/Sub topic,
        or a Celery worker) and return a job id.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Never catch <code>BaseException</code>{" "}
        inside a tool.</strong> The ADK 2.0 docs are
        explicit: <code>NodeInterruptedError</code> is what
        the framework uses to pause a graph for HITL. A
        broad exception catch inside a tool swallows the
        pause and permanently disables the retry mechanism
        for that step. Let exceptions propagate and let the{" "}
        <code>RetryConfig</code> handle them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch for the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the next twelve months for ADK
        specifically and the Google agent stack in general.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ADK as the OpenTelemetry-native standard for
        agents.</strong> The MLflow OTLP ingestion is the
        first step. Watch for Google to contribute to the
        OpenTelemetry semantic conventions for agent traces,
        which would make ADK the reference implementation
        for a cross-vendor agent trace schema. That is a
        durable structural advantage.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-language workflow portability.</strong>{" "}
        The Python and Go 2.0 releases share an interrupt
        format. Once TypeScript and Java catch up, a workflow
        paused in one language will resume in another as a
        matter of course. That is the piece most enterprise
        stacks want and no other framework offers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent Studio and Agent Garden as the default
        entry point for non-engineers.</strong> Google&rsquo;s
        no-code Agent Studio is graduating out of preview,
        and the Agent Garden is the reference library for
        starter agents. Expect a Salesforce-flow-style
        division of labour: engineers ship the scaffolding
        and connectors, product managers and domain experts
        edit the prompts, agents, and tool selection in the
        Studio.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Deeper A2A and MCP integration across the
        vendor space.</strong> ADK, the OpenAI Agents SDK,
        the Claude Agent SDK, and the Microsoft Agent
        Framework are all converging on MCP for tool servers
        and A2A for cross-framework calls. The framework
        choice in 2027 will matter less than the choice of
        observability stack, deployment target, and team
        operating model, and ADK is positioned as the
        reference for the Google Cloud path.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the Google Cloud path is the shortest
        one to production
      </h2>
      <p className="mb-6 leading-relaxed">
        For a team building its first production agent
        system on Google Cloud in 2026, ADK is the default
        pick. The five-language rollout removes the
        write-once-in-Python constraint that most other
        frameworks impose, the graph runtime in 2.0 gives
        you HITL, durable pause, and retries as primitives,
        and the Vertex AI Agent Engine deploy path removes
        the ops work that usually eats the second month of
        a project. Nokia&rsquo;s June 2026 rollout is the
        proof point that a six-agent system can ship on
        standard Kubernetes plus Google Cloud Storage with
        no custom managed services in the middle.
      </p>
      <p className="mb-6 leading-relaxed">
        The move on a new project is incremental. Start
        with a single <code>LlmAgent</code> and the
        built-in tools. Add a Sequential or Parallel
        workflow the moment you have more than one
        specialist. Move to the 2.0 graph runtime when you
        need HITL, cycles, or retries. Deploy on Cloud Run
        for the first cut, then move to Agent Runtime once
        you need managed sessions, auth, and traces.
        Instrument OpenTelemetry from day one. Pin the
        model per agent to keep the cost curve reasonable.
        Wire A2A and MCP the moment you need to talk to
        agents in other frameworks or to remote tool
        servers. That path is the one we run on every ADK
        engagement, and it is the one that keeps the
        prototype-to-production gap small - which is the
        gap most agent projects fail to cross.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://adk.dev/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Development Kit official site
          </a>
          {" "}- canonical reference for the five language
          SDKs, the get-started guides, and the ADK 2.0
          workflow and dynamic-graph docs.
        </li>
        <li>
          <a
            href="https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Developers Blog: Introducing ADK (April
            2025)
          </a>
          {" "}- the launch post from Cloud NEXT 2025 with
          the original architecture overview and the first
          multi-agent walkthrough.
        </li>
        <li>
          <a
            href="https://developers.googleblog.com/en/announcing-adk-go-20/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Developers Blog: ADK Go 2.0 (June 30,
            2026)
          </a>
          {" "}- the Go 2.0 announcement covering typed
          function nodes, HITL, dynamic orchestration in
          plain Go, and the migration from 1.x to 2.0.
        </li>
        <li>
          <a
            href="https://adk.dev/2.0/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ADK 2.0 release notes and migration guide
          </a>
          {" "}- the Python 2.0 GA (May 19, 2026) and Go
          2.0 GA (June 30, 2026) migration matrix with the
          event-schema and BaseNode breaking changes.
        </li>
        <li>
          <a
            href="https://cloud.google.com/blog/products/ai-machine-learning/build-multi-agentic-systems-using-google-adk"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud Blog: Build multi-agentic systems
            using ADK
          </a>
          {" "}- the trip planner walkthrough that shows the
          upgrade from sub-agent delegation to AgentTool,
          then to Sequential plus Parallel workflows with a
          review-feedback loop.
        </li>
        <li>
          <a
            href="https://futurumgroup.com/insights/google-adk-is-not-a-toolkit-it-is-an-agent-execution-framework/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Futurum: ADK is an agent execution framework
          </a>
          {" "}- the March 2026 analyst read on the Tools
          and Integrations Ecosystem, the MLflow OTLP
          decision, and how ADK compares to AutoGen,
          LangChain, and CrewAI on execution vs
          orchestration.
        </li>
        <li>
          <a
            href="https://www.googlecloudpresscorner.com/2026-06-22-Nokia-and-Google-Cloud-Partner-to-Embed-AI-Agents,-Built-with-Googles-Gemini-Models,-Into-Nokias-Autonomous-Network-Product-Suite"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nokia and Google Cloud: six agents in the
            Assurance Center
          </a>
          {" "}- the June 22, 2026 partnership announcement
          with the six-agent breakdown (router, event
          triage, KPI selector, anomaly reasoner, action
          reasoner, dashboard) and the 50% to 80% faster
          resolution number.
        </li>
        <li>
          <a
            href="https://thenewstack.io/what-is-googles-agent-development-kit-an-architectural-tour/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The New Stack: An architectural tour of ADK
          </a>
          {" "}- the December 2025 deep read on the Runner,
          Session, Event, and Services architecture that
          still applies as the 1.x baseline under 2.0.
        </li>
        <li>
          <a
            href="https://github.com/google/adk-samples"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            google/adk-samples on GitHub
          </a>
          {" "}- the reference sample repository with
          production-shaped projects for research, BigQuery
          analysis, short-movie generation, and multi-agent
          collaboration.
        </li>
        <li>
          <a
            href="/articles/crewai-production-multi-agent-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            CrewAI in production 2026
          </a>
          {" "}- the natural comparison for any team
          deciding between ADK graphs and Crews plus Flows.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the deeper read on the graph-based approach
          that ADK 2.0 converges on.
        </li>
        <li>
          <a
            href="/articles/a2a-protocol-cross-vendor-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            A2A protocol: cross-vendor agents in 2026
          </a>
          {" "}- the protocol side of ADK&rsquo;s{" "}
          <code>to_a2a()</code> helper and the cross-vendor
          pattern.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the deeper read on the Model Context
          Protocol that ADK integrates through{" "}
          <code>MCPToolset</code>.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the cross-framework read on orchestration
          patterns that ADK 2.0 graphs sit under.
        </li>
      </ul>
    </div>
  );
}
