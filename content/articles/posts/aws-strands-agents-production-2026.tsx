import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "aws-strands-agents-production-2026",
  title:
    "AWS Strands Agents SDK in production 2026: the model-driven approach to building AI agents",
  excerpt:
    "How AWS turned an internal agent runtime for Amazon Q Developer, Kiro, and AWS Glue into an open-source SDK that ships production agents in a handful of lines. Covers the model-driven agent loop, the Python and TypeScript SDKs, hooks and steering handlers, the four multi-agent patterns in Strands 1.0, session management, the A2A protocol, and the AWS deployment story on Bedrock AgentCore, Lambda, and Fargate.",
  metaDescription:
    "A practical, technical guide to the AWS Strands Agents SDK in 2026. Covers the model-driven agentic loop, the @tool decorator, hooks and steering, multi-agent patterns (Agents-as-Tools, Handoffs, Swarms, Graphs), the TypeScript SDK with browser agents, MCP integration, session management, A2A support, and deployment on Amazon Bedrock AgentCore, AWS Lambda, and AWS Fargate. Compares Strands with LangGraph, CrewAI, and the OpenAI Agents SDK, with production trade-offs and adoption examples from Amazon Q Developer, Kiro, AWS Glue, Smartsheet, Swisscom, and Eightcap.",
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
    "AWS",
    "Strands",
    "Bedrock",
    "AgentCore",
    "Python",
    "TypeScript",
    "MCP",
    "A2A",
    "Production",
  ],
  publishDate: "2026-07-24",
  readingTime: "17 min read",
};

export default function AwsStrandsAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In May 2025 AWS open-sourced Strands Agents,
        the same SDK Amazon Q Developer, AWS Glue,
        and (later) Kiro were using in production. It
        was a small announcement compared to Bedrock
        AgentCore or the AgentKit push from OpenAI, but
        one year later Strands is the fastest way we
        know to ship a production agent on AWS. It has
        crossed 6,600 GitHub stars, added a full
        TypeScript SDK, wired in the A2A protocol,
        picked up model provider support from Anthropic,
        Meta, OpenAI, Cohere, Mistral, Stability, and
        Writer, and become the default runtime that
        AWS re:Invent 2025 recommends when you want
        to be on Bedrock AgentCore next month rather
        than next quarter. This article is how we use
        Strands on client engagements: the
        model-driven loop, the four multi-agent
        patterns in 1.0, the hooks and steering
        handlers that get agents to 100% task accuracy,
        and the honest trade-offs against LangGraph,
        CrewAI, and the OpenAI Agents SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why Strands matters in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The agent framework space in 2025 was crowded.
        LangGraph shipped a graph runtime. CrewAI put a
        role-based orchestration layer on top of it.
        OpenAI released the Agents SDK and then
        AgentKit. Google put out ADK. Microsoft merged
        Semantic Kernel and AutoGen into the Microsoft
        Agent Framework. Every one of these frameworks
        was built around a version of the same
        assumption: models cannot plan or select tools
        well enough on their own, so the framework
        supplies the workflow. That assumption was true
        in early 2024. It is not true in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        Modern reasoning models (Claude Opus 4.8,
        GPT-5.5, Gemini 2.5 Pro, Nova Premier, Llama
        4.5) natively plan, call tools, and reflect on
        results. What used to take hundreds of lines of
        scaffolding is now three lines of code. The
        Strands team at Amazon Q Developer figured this
        out the hard way. They spent 2023 and 2024
        wiring elaborate orchestration around weak
        models, and by early 2025 the orchestration
        code was slowing them down more than it was
        helping. Strands is the internal runtime they
        rebuilt around the newer models, then
        open-sourced. The tagline in the launch post is
        blunt: "with Strands we now ship new agents in
        days and weeks, not months."
      </p>
      <p className="mb-6 leading-relaxed">
        The number that matters for buyers is 22
        percent. That is the share of Strands 1.0 pull
        requests contributed by the community between
        the 0.1 preview and 1.0. Anthropic wrote its
        own model provider integration. Meta wrote the
        Llama provider. Cohere, Mistral, Writer, and
        Stability wrote theirs. The framework is
        AWS-native, but the model layer is not, and
        that keeps it usable when the customer wants
        Claude on Anthropic direct or GPT on OpenAI
        direct.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>May 16, 2025</strong>: AWS
          open-sources the Strands Agents Python SDK
          under Apache 2.0. First public release. The
          post reveals that Amazon Q Developer, AWS
          Glue, and VPC Reachability Analyzer already
          use it in production.
        </li>
        <li>
          <strong>May to July 2025</strong>: the SDK
          crosses 2,000 GitHub stars and 150,000 PyPI
          downloads. Anthropic and Meta both merge
          native model provider integrations.
        </li>
        <li>
          <strong>July 15, 2025</strong>: Strands
          Agents 1.0 ships. Adds the four multi-agent
          primitives (Agents-as-Tools, Handoffs,
          Swarms, Graphs), A2A protocol support,
          session management, and native async
          throughout the stack. Model provider list
          grows to include OpenAI, Cohere, Mistral,
          Stability, Writer, and Baseten.
        </li>
        <li>
          <strong>October 2025</strong>: AWS ships
          Bedrock AgentCore Runtime and formally makes
          Strands the recommended SDK to deploy on it.
          Strands agents deploy to AgentCore with no
          code change, they just need a container.
        </li>
        <li>
          <strong>November 2025</strong>: AWS
          re:Invent 2025 features Strands as the
          default answer for "how do I ship an
          enterprise agent on AWS next month."
        </li>
        <li>
          <strong>December 2025</strong>: the Strands
          Agents TypeScript SDK reaches release
          candidate. Runs in Node.js and in the
          browser, ships MCP support, streaming,
          multi-agent Graphs and Swarms, and Zod-based
          typed tools.
        </li>
        <li>
          <strong>Q1 2026</strong>: steering handlers
          land in the SDK. AWS publishes a benchmark
          where prompt-only agents score 82.5%,
          hard-coded workflows score 80.8%, and Strands
          agents with steering recover from every
          mistake at 100%.
        </li>
        <li>
          <strong>Q2 2026</strong>: Strands Evals
          (scenario-based agent testing) and Strands
          Labs (experimental primitives like BidiAgent
          for bidirectional voice on Nova Sonic) ship
          as first-party projects in the Strands org.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What a Strands agent actually is
      </h2>
      <p className="mb-6 leading-relaxed">
        A Strands agent is three things: a model, a
        set of tools, and a prompt. That is the whole
        surface area. The Strands docs like the DNA
        metaphor, one strand is the model, the other
        strand is the tools, and everything else is
        wound around them. The simplest working agent
        in Python is four lines:
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/hello_agent.py"
        code={`from strands import Agent

agent = Agent(system_prompt="You are a helpful assistant.")
result = agent("What is the capital of France?")
print(result)`}
      />
      <p className="mb-6 leading-relaxed">
        The Agent constructor picks a default model
        (an Anthropic Claude on Amazon Bedrock in the
        current release), applies the system prompt,
        and runs the reasoning loop. There is no
        graph, no state machine, no orchestrator
        object. When you call the agent, it hands the
        prompt to the model, the model decides what to
        do, and Strands executes tool calls,
        aggregates results, and returns the final
        response. In the model-driven approach the
        model itself is the planner and the router,
        the SDK is just the harness.
      </p>
      <p className="mb-6 leading-relaxed">
        Tools are ordinary Python functions with a
        docstring and type hints. Add the{" "}
        <code>@tool</code> decorator and Strands
        exposes them to the model:
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/ops_agent.py"
        code={`from strands import Agent, tool

@tool
def search_logs(query: str, hours: int = 24) -> list:
    """Search application logs by keyword."""
    return log_api.search(query, hours)

@tool
def query_database(query: str) -> list:
    """Run a read-only SQL query."""
    return warehouse.execute(query)

agent = Agent(
    tools=[search_logs, query_database],
    system_prompt="You are a production ops agent.",
)

agent("Find timeout errors in the payments service in the last 6 hours.")`}
      />
      <p className="mb-6 leading-relaxed">
        Strands pulls the function name, the
        docstring, and the type hints to build the
        tool schema the model sees. There is no
        separate JSON spec to maintain, no adapter
        layer, no argument marshalling to write. The
        cost of adding a tool is the cost of writing
        the function, plus a docstring. That is the
        change that lets small teams keep up with
        agents that would have needed a platform team
        two years ago.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The agentic loop in Strands
      </h2>
      <p className="mb-6 leading-relaxed">
        Every Strands agent runs the same loop under
        the hood. It is the loop the industry
        converged on after the 2022 ReAct paper, but
        it leans on the newer models to do more of the
        work in-line:
      </p>
      <CodeBlock
        language="bash"
        filename="Strands agentic loop"
        code={`+-------------------------------------------------------+
|  Strands Agentic Loop                                 |
|                                                       |
|   +-------------+          +-------------------+      |
|   | User prompt |--------->| Model invocation  |      |
|   +-------------+          |  (Bedrock, GPT,   |      |
|          ^                 |   Claude, Llama)  |      |
|          |                 +---------+---------+      |
|          |                           |                |
|          |               +-----------+-----------+    |
|          |               |                       |    |
|          |         Text response          Tool use    |
|          |               |                       |    |
|          |               v                       v    |
|          |     +-------------------+    +-----------+ |
|          |     | Return to user    |    | Execute   | |
|          |     +-------------------+    | tool      | |
|          |                              +-----+-----+ |
|          |                                    |       |
|          |               tool result <--------+       |
|          |                    |                       |
|          +--------------------+                       |
+-------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        In each pass, the model either returns a
        final answer or picks one or more tools to
        call. Strands executes the tool, hands the
        result back to the model, and loops. The
        model decides when to stop, not the framework.
        That is what "model-driven" means in practice:
        no fixed step count, no external state
        machine, the model is the loop condition.
        Combined with hooks (see next section), it
        gives you a runtime that is short enough to
        read end-to-end but flexible enough to run
        every Strands production agent inside AWS.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Hooks: observe, block, or redirect any step
      </h2>
      <p className="mb-6 leading-relaxed">
        A production agent needs three things the
        model does not give you for free: logging,
        guardrails, and a place to pause for human
        approval. Strands exposes these through the
        hooks system. A hook is a function that runs
        at a defined lifecycle event and can inspect
        or mutate the event. There are hooks for
        message start, before tool call, after tool
        call, and completion, plus a few more for
        streaming and errors. The pattern is small
        enough to remember:
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/observed_agent.py"
        code={`from strands import Agent
from strands.hooks import AfterToolCallEvent, BeforeToolCallEvent

WRITE_OPS = ["INSERT", "UPDATE", "DELETE", "DROP"]

def log_tool_calls(event: AfterToolCallEvent):
    print(f"tool={event.tool_use['name']} status={event.result['status']}")

def read_only_guard(event: BeforeToolCallEvent):
    if event.tool_use["name"] == "query_database":
        sql = event.tool_use["input"].get("query", "").upper()
        if any(kw in sql for kw in WRITE_OPS):
            event.cancel_tool = "Read-only access. Rewrite the query."

agent = Agent(
    tools=[search_logs, query_database],
    hooks=[log_tool_calls, read_only_guard],
    trace_attributes={"service": "ops-agent", "env": "prod"},
)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things to notice. First,{" "}
        <code>event.cancel_tool</code> is a string
        that gets passed back to the model as the tool
        result, so the model sees "Read-only access.
        Rewrite the query." and self-corrects. It is
        not an exception, it is a redirection. Second,{" "}
        <code>trace_attributes</code> flow through
        into OpenTelemetry spans, so the same code that
        blocks a write operation also gets you a
        Grafana dashboard for free once you point the
        OTEL exporter at your backend. Every Strands
        agent traces by default, no plugin required.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Steering handlers: 100% task accuracy on the
        published benchmark
      </h2>
      <p className="mb-6 leading-relaxed">
        Hooks are a low-level primitive. Steering
        handlers are the higher-level pattern the AWS
        team published in Q1 2026, and they are the
        single most useful addition since 1.0. A
        steering handler runs before each tool call
        and returns either a <code>Proceed</code> (let
        the tool run), a <code>Guide</code> (rewrite
        the model&rsquo;s plan with an inline hint), or
        an escalation up to a human. In the internal
        benchmark AWS ran (published on the Strands
        blog in early 2026), prompt-only agents scored
        82.5%, hard-coded workflows scored 80.8%, and
        Strands agents with steering handlers reached
        100%. The handler is what lets the model
        recover from mistakes at runtime instead of
        crashing.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/query_quality_policy.py"
        code={`from strands.vended_plugins.steering import (
    SteeringHandler, Guide, Proceed,
)

class QueryQualityPolicy(SteeringHandler):
    async def steer_before_tool(self, *, agent, tool_use, **kwargs):
        sql = tool_use["input"].get("query", "").upper()
        if "SELECT" in sql and "WHERE" not in sql:
            return Guide(reason="Add a WHERE clause and a LIMIT.")
        if sql.count("JOIN") > 3:
            return Guide(
                reason="4+ joins. Break into smaller queries.",
            )
        return Proceed(reason="Query looks good.")

agent = Agent(tools=[query_database], plugins=[QueryQualityPolicy()])`}
      />
      <p className="mb-6 leading-relaxed">
        The value of the handler is that it turns
        soft prompt rules ("please add a WHERE
        clause") into hard runtime feedback the model
        sees on the next turn. In production we use
        steering handlers for cost limits (blocking
        anything over N dollars per run), for data
        classification checks (does this query touch
        PII), and for schema validation on tool
        arguments. The rule of thumb we tell teams is:
        if the check has to succeed every time,
        write it as a steering handler, not a prompt
        rule.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP integration is the tool boundary
      </h2>
      <p className="mb-6 leading-relaxed">
        Strands has first-class Model Context Protocol
        support, and MCP is the way we usually
        connect Strands agents to private data on
        client work. An MCP client wraps any MCP
        server (stdio, SSE, or HTTP) and hands its
        tools to the agent through the same interface
        as native <code>@tool</code> functions:
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/support_agent.py"
        code={`from strands import Agent, tool
from strands.tools.mcp import MCPClient
from strands.hooks import BeforeToolCallEvent
from strands.agent import SlidingWindowConversationManager
from mcp import stdio_client, StdioServerParameters

kb = MCPClient(lambda: stdio_client(
    StdioServerParameters(command="uvx", args=["kb-server"])
))

@tool
def issue_refund(order_id: str, amount: float) -> str:
    """Process a customer refund."""
    return payments.refund(order_id, amount)

def approve_refunds(event: BeforeToolCallEvent):
    if event.tool_use["name"] == "issue_refund":
        response = event.interrupt(
            "refund_approval", reason=event.tool_use["input"],
        )
        if response != "APPROVE":
            event.cancel_tool = "Refund not approved."

agent = Agent(
    system_prompt="Support assistant. Use the KB. Refunds need approval.",
    tools=[kb, issue_refund],
    hooks=[approve_refunds],
    conversation_manager=SlidingWindowConversationManager(window_size=20),
)`}
      />
      <p className="mb-6 leading-relaxed">
        Three things are worth calling out. First,{" "}
        <code>kb</code> is passed to <code>tools</code>{" "}
        exactly like any Python function tool, the
        model sees a unified list. Second,{" "}
        <code>event.interrupt(...)</code> is Strands&rsquo;
        human-in-the-loop primitive, it suspends the
        run, pushes an event to whatever channel you
        wired up (a Slack bot, a webhook, an SQS
        queue), and resumes when a human returns a
        value. Third,{" "}
        <code>SlidingWindowConversationManager</code>{" "}
        is one of two built-in context managers, the
        other is{" "}
        <code>SummarizingConversationManager</code>{" "}
        which uses a cheaper model to summarise older
        turns instead of truncating them. Both stop
        the context window from growing without bound
        on a long conversation.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four multi-agent patterns in Strands 1.0
      </h2>
      <p className="mb-6 leading-relaxed">
        Strands 1.0 shipped four multi-agent
        primitives, and each one is a single import.
        The design decision that matters is that they
        compose freely, a Graph can contain a Swarm,
        a Swarm can call an Agent-as-Tool, and any
        agent can hand off to a human. Pick the
        pattern that matches how the work should flow,
        not the framework you happen to be using.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agents-as-Tools</strong> is the
        hierarchical delegation pattern. A lead agent
        wraps specialist agents as tools and calls
        them the same way it calls any function. Use
        this when the work has a clear coordinator
        and specialists, like a project manager who
        knows which expert to consult.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/executive_assistant.py"
        code={`from strands import Agent, tool
from strands_tools import calculator, file_write, journal

research_analyst_agent = Agent(
    system_prompt="You are a research specialist for startup markets.",
    tools=[calculator, file_write],
)
travel_advisor_agent = Agent(
    system_prompt="You are a travel expert for trip planning.",
    tools=[journal],
)

@tool
def research_analyst(query: str) -> str:
    return str(research_analyst_agent(query))

@tool
def travel_advisor(query: str) -> str:
    return str(travel_advisor_agent(query))

executive_assistant = Agent(tools=[research_analyst, travel_advisor])

executive_assistant(
    "I have a meeting in Portland next week. "
    "Suggest a place to stay near the startup scene, plus 3 startups to visit."
)`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Handoffs</strong> are for explicit
        transfer of control, either to a human or to
        another agent, while keeping the conversation
        context. Strands ships a built-in{" "}
        <code>handoff_to_user</code> tool. The
        support-agent pattern uses it to escalate
        when the agent hits a case outside its
        knowledge. The full conversation history goes
        with the handoff, so the human does not have
        to re-ask questions the agent already
        answered.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Swarms</strong> are self-organising
        teams that coordinate through shared memory.
        Each agent picks up work as it appears, adds
        results, and reads what other agents have
        written. Use this for open-ended
        collaboration where the split of work is not
        obvious ahead of time.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/market_research_team.py"
        code={`from strands import Agent
from strands.multiagent import Swarm
from strands_tools import memory, calculator, file_write

researcher = Agent(
    name="researcher",
    system_prompt="Research topics thoroughly.",
    tools=[memory],
)
analyst = Agent(
    name="analyst",
    system_prompt="Analyze data and produce insights.",
    tools=[calculator, memory],
)
writer = Agent(
    name="writer",
    system_prompt="Write reports from research and analysis.",
    tools=[file_write, memory],
)

market_research_team = Swarm([researcher, analyst, writer])
result = market_research_team(
    "History of AI since 1950. Produce a full report."
)`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Graphs</strong> are the deterministic
        workflow pattern. You wire nodes and edges,
        each edge has an optional predicate, and the
        graph runs top-down. Use this for approval
        chains, quality gates, or any process that has
        to run the same steps in the same order every
        time. In our client work, Graphs are the
        default pattern for anything that already
        maps to a business process diagram.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/support_graph.py"
        code={`from strands import Agent
from strands.multiagent import GraphBuilder

analyzer = Agent(
    name="analyzer",
    system_prompt="Categorize the customer request.",
    tools=[text_classifier, sentiment_analyzer],
)
normal = Agent(
    name="normal",
    system_prompt="Handle routine requests automatically.",
    tools=[knowledge_base, auto_responder],
)
critical = Agent(
    name="critical",
    system_prompt="Handle critical requests fast.",
    tools=[knowledge_base, escalate_to_support_agent],
)

def is_normal(state): return state["priority"] == "normal"
def is_critical(state): return state["priority"] == "critical"

builder = GraphBuilder()
builder.add_node(analyzer, "analyze")
builder.add_node(normal, "normal")
builder.add_node(critical, "critical")
builder.add_edge("analyze", "normal", condition=is_normal)
builder.add_edge("analyze", "critical", condition=is_critical)
builder.set_entry_point("analyze")
support_graph = builder.build()

results = support_graph("I need help with my order!")`}
      />
      <p className="mb-6 leading-relaxed">
        A quick rule for picking between them. Start
        with one agent, never with a graph. When one
        agent grows more than a few tools, extract a
        specialist and wrap it as an
        Agents-as-Tools call. When two or three
        specialists need to riff on each other with no
        fixed order, put them in a Swarm. When the
        flow needs to match a written policy or an
        SLA-bound path, wire a Graph. In our
        experience the most common shape a Strands
        deployment settles into is a top-level Graph
        with a Swarm in one branch and
        Agents-as-Tools in another.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Session management: agents that survive
        restarts
      </h2>
      <p className="mb-6 leading-relaxed">
        Any production agent has to persist state
        between the request that starts a conversation
        and the request that resumes it. Strands 1.0
        added a session manager abstraction with two
        built-in backends (local file and Amazon S3),
        plus a Data Access Object pattern for custom
        backends. The agent auto-saves after every
        turn, and a new Agent constructed with the
        same session id and backend picks up where
        the last one left off:
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/durable_support.py"
        code={`from strands import Agent
from strands.session.s3_session_manager import S3SessionManager

session = S3SessionManager(
    session_id="customer-support-lisa-042",
    bucket="acme-agent-sessions",
    prefix="prod/support/",
)

agent = Agent(
    id="support_bot_1",
    session_manager=session,
    tools=[knowledge_base, ticket_system],
)

agent("Help me reset my password.")
agent("I cannot access my email either.")

# Later, in a different Lambda invocation:
restored = Agent(
    id="support_bot_1",
    session_manager=S3SessionManager(
        session_id="customer-support-lisa-042",
        bucket="acme-agent-sessions",
        prefix="prod/support/",
    ),
    tools=[knowledge_base, ticket_system],
)
restored("Actually, let me try the email question first.")`}
      />
      <p className="mb-6 leading-relaxed">
        Session management is the primitive that
        makes Strands work well on serverless
        deployments. A Lambda function can run one
        agent turn, save state to S3, and shut down.
        The next turn spins up a fresh Lambda, loads
        the session, and continues. There is no
        Redis, no sticky session at the load balancer,
        no long-running process. The Bedrock
        AgentCore integration uses the same pattern
        under the hood.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The TypeScript SDK and browser agents
      </h2>
      <p className="mb-6 leading-relaxed">
        The Python SDK still leads in features (the
        interrupt API for TS was still landing at the
        time of the RC), but the TypeScript SDK
        covers everything a typical web app needs.
        The killer feature is that it runs in the
        browser, not just in Node.js. Tools become
        Zod-schema functions, the model is called
        through Bedrock, OpenAI, Anthropic, Google
        Gemini, or the Vercel AI SDK adapters, and
        streaming works with regular async iterators.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/strands/browser-canvas-agent.ts"
        code={`import { Agent, tool } from "@strands-agents/sdk"
import { OpenAIModel } from "@strands-agents/sdk/models/openai"
import { z } from "zod"

const updateCanvas = tool({
  name: "update_canvas",
  description: "Replace the HTML in the preview iframe.",
  inputSchema: z.object({
    html: z.string().describe("Full HTML for the iframe body."),
  }),
  callback: ({ html }) => {
    const frame = document.getElementById("preview") as HTMLIFrameElement
    frame.srcdoc = html
    return "canvas updated"
  },
})

const agent = new Agent({
  model: new OpenAIModel({ api: "chat", modelId: "gpt-4o" }),
  tools: [updateCanvas],
  systemPrompt: "You are a UI assistant. Change the canvas as asked.",
})

for await (const event of agent.stream("Draw a dark-themed landing hero.")) {
  if (event.type === "modelStreamUpdateEvent") {
    process.stdout.write(event.delta ?? "")
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        A browser-side Strands agent opens up a
        category of client-side product experience
        that used to need a full backend. A Figma-like
        design assistant, a spreadsheet copilot, a
        code sandbox that rewrites itself on request,
        all of that runs on the user&rsquo;s machine
        with no server hop except the model call. The
        SDK is small enough (a few hundred KB
        gzipped) to ship in a normal app bundle.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deploying on AWS: AgentCore, Lambda, Fargate,
        EKS
      </h2>
      <p className="mb-6 leading-relaxed">
        Strands is model-agnostic and cloud-agnostic
        in principle, but it earns its keep on AWS
        because that is where every deployment
        primitive is a one-liner. There are four
        shapes we deploy on client work.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Bedrock AgentCore Runtime</strong> is
        the managed target. Package the agent as a
        container that responds to an HTTP invocation,
        push it to AgentCore, and get a runtime that
        handles session state, identity, gateways,
        memory, observability, and code interpretation
        as first-class services. This is our default
        for enterprise deployments where identity and
        governance matter. See our{" "}
        <a
          href="/articles/aws-bedrock-agentcore-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          AgentCore article
        </a>{" "}
        for the deeper read on the runtime itself.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS Lambda</strong> is the shape we
        use for event-driven agents (an SQS message
        triggers a workflow, an EventBridge rule
        kicks off a nightly report, a webhook fires
        an incident response). Combine a Lambda with
        S3 session management and Strands is already
        a serverless agent runtime. Cold start is a
        few hundred milliseconds because the SDK is
        small.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS Fargate</strong> or{" "}
        <strong>Amazon ECS</strong> is the shape for
        long-running conversational agents behind an
        API. The agent stays warm, the sliding-window
        or summarising context manager keeps token
        cost bounded, and Fargate handles scaling on
        request rate.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Amazon EKS</strong> is where the
        multi-agent Swarm and Graph patterns land
        when the workload needs GPU inference on
        Nemotron, Llama, or a self-hosted DeepSeek.
        Strands does not care which pod runs the
        model call, only that the model provider
        returns a response, so an EKS deployment can
        route different agents to different node
        pools.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/lambda_handler.py"
        code={`import json
from strands import Agent
from strands.session.s3_session_manager import S3SessionManager
from strands_tools import http_request

def handler(event, context):
    session_id = event["headers"]["x-session-id"]
    body = json.loads(event["body"])

    agent = Agent(
        id="ops-agent",
        session_manager=S3SessionManager(
            session_id=session_id,
            bucket="acme-agent-sessions",
        ),
        tools=[http_request],
        system_prompt="You are the on-call ops agent.",
    )

    result = agent(body["message"])
    return {"statusCode": 200, "body": json.dumps({"reply": str(result)})}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A2A support: agents that talk to other agents
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agent-to-Agent (A2A) protocol is the
        cross-vendor standard for agents to discover
        and call each other. Strands 1.0 wraps any
        agent as an A2A server (it auto-generates the
        agent card from the tool list), and it wraps
        any remote A2A agent as a set of tools you
        can pass to a local agent. We use this on
        engagements where the customer already runs
        agents on LangGraph or the Microsoft Agent
        Framework and does not want to migrate,
        Strands connects to those agents through A2A
        and orchestrates around them.
      </p>
      <CodeBlock
        language="python"
        filename="src/strands/a2a_orchestrator.py"
        code={`from strands import Agent
from strands.multiagent.a2a import A2AServer
from strands_tools.a2a_client import A2AClientToolProvider

local = Agent(name="analyzer", tools=[web_search, data_analysis])
server = A2AServer(agent=local, port=9000)
server.serve()  # agent card at /.well-known/agent.json

remote_urls = ["https://partner.example.com", "https://cloud.example.ai"]
remotes = A2AClientToolProvider(known_agent_urls=remote_urls)

orchestrator = Agent(tools=[remotes.tools])
orchestrator("Draft a market briefing using the partner and cloud agents.")`}
      />
      <p className="mb-6 leading-relaxed">
        See our{" "}
        <a
          href="/articles/a2a-protocol-cross-vendor-agents-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          A2A protocol article
        </a>{" "}
        for the deeper read on the protocol shape,
        the agent card format, and the cross-vendor
        interop story.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases we have shipped
      </h2>
      <p className="mb-6 leading-relaxed">
        Three engagement shapes have landed for us on
        Strands, and they map fairly cleanly to what
        AWS publishes about its own customers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Support and incident response
        agents</strong>. Verisk Analytics used
        Strands with Amazon Bedrock, an OpenSearch
        RAG layer, and Kiro to build an intelligent
        incident response system that reduced mean
        time to resolution by 60% without adding
        engineering headcount. Eightcap moved from
        30-minute manual investigations to 45-second
        agent-led ones, with a 94% quality
        improvement, and reported $5M in operational
        savings. Both used the Graph pattern for the
        approval chain and Agents-as-Tools for
        specialist lookups.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise assistants</strong>.
        Smartsheet built its next-generation AI
        assistant on Strands, using the conversation
        memory and dynamic tool registration systems
        as the core. Swisscom built its enterprise AI
        backbone on Strands to keep enterprise
        readiness (identity, audit, on-prem inference)
        without giving up the open-source flexibility
        of the SDK. The pattern in both cases is a
        top-level Agents-as-Tools orchestrator with a
        session-managed Fargate deployment.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Security and drift detection
        agents</strong>. Zafran Security uses Strands
        with the Agent-as-Tool and Swarm patterns for
        agentic remediation of vulnerabilities and
        misconfigurations. Jit uses Strands for
        infrastructure drift detection. Terra
        Security uses Strands on Bedrock with
        Guardrails for autonomous penetration
        testing. The common thread is that security
        agents need strong guardrails and audit
        trails, and Strands ships both by default.
      </p>
      <p className="mb-6 leading-relaxed">
        Inside AWS the internal deployments include
        Amazon Q Developer (the SDK&rsquo;s original
        home), Kiro (the agentic IDE), AWS Glue (for
        Spark job troubleshooting), and VPC
        Reachability Analyzer (for network path
        explanation). Each one is a distinct product
        with a distinct agent shape, and each one
        runs on the same SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and trade-offs
      </h2>
      <p className="mb-6 leading-relaxed">
        The strengths that show up on every
        engagement: the code stays short (the setup
        for a real agent is 3 to 10 lines, not 60),
        the hooks let us plug in observability
        without writing an integration, the multi-agent
        patterns compose without new abstractions,
        the AWS deployment story is one artefact
        (a container) that runs on AgentCore,
        Lambda, Fargate, or EKS unchanged, and the
        model layer is open enough to switch models
        per agent inside a single system.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-offs are also worth naming. Strands
        is model-driven, which means it depends on a
        capable model. If you are stuck on a smaller
        or older model that cannot plan or use tools
        reliably, a heavier framework like LangGraph
        with an explicit state machine will beat
        Strands on accuracy. Strands is also younger
        than LangGraph, so the ecosystem is smaller,
        there are fewer community integrations, and
        some patterns (typed hooks, TypeScript
        interrupts) were still stabilising in mid-2026.
        And while Strands runs anywhere, the
        deployment ergonomics are much better on AWS
        than on Azure or GCP, if you are all-in on
        another cloud there is less reason to prefer
        it over a native option.
      </p>
      <p className="mb-6 leading-relaxed">
        A common concern we hear is vendor lock-in.
        Strands is Apache 2.0, the code lives on
        GitHub, and any Strands agent runs on any
        cloud, on any laptop, or in a browser. The
        only AWS-specific parts are the Bedrock model
        provider and the S3 session manager, and both
        have drop-in replacements (OpenAI, Anthropic,
        Ollama, LiteLLM for the model, the file-based
        session manager or a custom DAO for state).
        The SDK is not a lock-in point, it is an
        AWS-native default that stays portable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Strands vs LangGraph vs CrewAI vs OpenAI
        Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The picking guide we use on client work:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Strands</strong>: pick this when
          the target deployment is AWS, when the team
          is small, when the model is a
          current-generation reasoning model, and
          when short code and fast iteration matter
          more than a rich pre-built ecosystem.
        </li>
        <li>
          <strong>LangGraph</strong>: pick this when
          the workflow is legitimately graph-shaped,
          when you need fine-grained control over
          state transitions, or when the team is
          already deep into the LangChain toolset.
          See our{" "}
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph article
          </a>{" "}
          for the deep read.
        </li>
        <li>
          <strong>CrewAI</strong>: pick this for
          role-based multi-agent workflows where the
          mental model is a team of specialists with
          fixed roles, and where the flow is more
          about coordination between roles than
          around a specific graph. See the{" "}
          <a
            href="/articles/crewai-production-multi-agent-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            CrewAI article
          </a>.
        </li>
        <li>
          <strong>OpenAI Agents SDK</strong>: pick
          this when you are all-in on OpenAI models
          and want the AgentKit tooling for eval,
          replay, and guardrails without wiring it up
          yourself. See our{" "}
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK article
          </a>.
        </li>
        <li>
          <strong>Microsoft Agent Framework</strong>:
          pick this for Azure-native deployments where
          the .NET and Semantic Kernel ecosystem is
          already in place. See our{" "}
          <a
            href="/articles/microsoft-agent-framework-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Microsoft Agent Framework article
          </a>.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends through the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Steering as the default pattern</strong>.
        Prompt-only agents have hit a ceiling around
        80% task accuracy, hard-coded workflows have
        the same ceiling, and steering handlers are
        the only pattern we have seen that
        consistently pushes past it. Expect steering
        or a similar "runtime feedback to the model"
        pattern to become the default across
        frameworks, not just Strands.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Browser-native agents</strong>. The
        TypeScript SDK running in the browser opens a
        product surface most agent frameworks cannot
        touch. Watch for design tools, spreadsheets,
        note apps, and code editors to ship
        agent-first experiences where the model call
        goes directly from the browser to Bedrock,
        OpenAI, or Anthropic, with no backend hop.
        See our{" "}
        <a
          href="/articles/browser-agents-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          browser agents article
        </a>{" "}
        for the deeper read on the general pattern.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>A2A crossing the buy-or-build
        divide</strong>. A2A is the first agent
        protocol that all three major clouds have
        signed on to, and Strands is the reference
        implementation on AWS. As enterprises stitch
        together agents from different vendors,
        Strands as an A2A orchestrator (rather than a
        single-vendor agent) is the shape we see
        winning bids.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Voice, real-time, and multimodal</strong>.
        The Strands Labs projects (BidiAgent for
        bidirectional voice on Nova Sonic, the
        canvas-editing browser agent) point at where
        the SDK is heading. Voice-first customer
        support, real-time visualisation agents, and
        multimodal review flows are all becoming
        first-class Strands patterns rather than
        custom builds.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the shortest path to a production
        agent on AWS
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern that got us here is simple.
        Modern models can plan, call tools, and
        reflect on results without much scaffolding.
        Strands is the SDK that took that observation
        seriously and rebuilt the agent runtime around
        it. Three lines get you a single agent. Ten
        lines get you a tool-using agent with a
        guardrail. Fifty lines get you a multi-agent
        Graph running on Bedrock AgentCore with S3
        session state and OpenTelemetry traces. That
        is a real change in how fast a team can move
        from prototype to production.
      </p>
      <p className="mb-6 leading-relaxed">
        The recommendation we give clients: if the
        target is AWS and the model is any current
        Claude, Nova, GPT, or Llama, start with
        Strands. Prove the value with a single
        Python agent, deploy it to Lambda for the
        first proof, promote to Fargate or
        AgentCore when the traffic grows, and add
        multi-agent patterns only when the flow
        genuinely needs them. The SDK stays out of
        the way, which is exactly what you want a
        framework to do.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Introducing Strands Agents, an Open
            Source AI Agents SDK (May 16, 2025)
          </a>
          {" "}- the launch post from Clare Liguori
          with the origin story from Amazon Q
          Developer and the model, tools, prompt
          definition.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-1-0-production-ready-multi-agent-orchestration-made-simple/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Introducing Strands Agents 1.0 (July
            15, 2025)
          </a>
          {" "}- the 1.0 release post with the four
          multi-agent primitives, A2A support,
          session management, and the model provider
          list.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/machine-learning/strands-agents-sdk-a-technical-deep-dive-into-agent-architectures-and-observability/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Strands Agents SDK technical deep
            dive
          </a>
          {" "}- the architecture write-up with the
          agent loop diagram, the four production
          deployment shapes, and the OpenTelemetry
          integration.
        </li>
        <li>
          <a
            href="https://strandsagents.com/blog/strands-agents-typescript-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Strands Agents TypeScript SDK
            announcement
          </a>
          {" "}- the RC release for TypeScript with
          browser support, MCP integration, and the
          Zod-based typed tool interface.
        </li>
        <li>
          <a
            href="https://strandsagents.com/blog/steering-accuracy-beats-prompts-workflows/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Strands Agents: steering accuracy beats
            prompts and workflows
          </a>
          {" "}- the benchmark write-up where
          steering handlers take task accuracy from
          82.5% to 100%.
        </li>
        <li>
          <a
            href="https://strandsagents.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Strands Agents documentation
          </a>
          {" "}- the quickstart, user guide, and
          reference for both the Python and
          TypeScript SDKs, plus the labs and evals
          projects.
        </li>
        <li>
          <a
            href="https://github.com/strands-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            strands-agents on GitHub
          </a>
          {" "}- the Apache 2.0 source, the samples
          repository, and the release notes for both
          SDKs.
        </li>
        <li>
          <a
            href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS Prescriptive Guidance: Strands Agents
          </a>
          {" "}- the AWS framework selection
          guidance with the comparison to other
          agentic AI frameworks and the enterprise
          integration story.
        </li>
        <li>
          <a
            href="/articles/aws-bedrock-agentcore-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AWS Bedrock AgentCore in production 2026
          </a>
          {" "}- the deeper read on the managed
          runtime that hosts Strands agents in
          production.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the alternative when the workflow is
          graph-shaped and the state machine matters
          more than short code.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the
          orchestrator-worker patterns that
          Agents-as-Tools, Swarms, and Graphs all
          instantiate.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol Strands uses for
          private data connections.
        </li>
        <li>
          <a
            href="/articles/a2a-protocol-cross-vendor-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            A2A protocol for cross-vendor agents
          </a>
          {" "}- the deeper read on the protocol that
          Strands 1.0 wires in for cross-vendor agent
          orchestration.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in
            2026
          </a>
          {" "}- the deeper read on the tracing and
          eval stack Strands emits telemetry into.
        </li>
      </ul>
    </div>
  );
}
