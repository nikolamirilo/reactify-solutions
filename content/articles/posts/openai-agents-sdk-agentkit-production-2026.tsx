import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 28,
  slug: "openai-agents-sdk-agentkit-production-2026",
  title:
    "OpenAI Agents SDK and AgentKit in production 2026: from Swarm experiment to default multi-agent stack",
  excerpt:
    "How the OpenAI Agents SDK and AgentKit replaced the Swarm experiment and became the default OpenAI-side stack for production multi-agent systems in 2026. Core primitives, handoffs, guardrails, sessions, native sandboxes and subagents, the AgentKit visual layer, real production numbers from Stripe, Ramp, Coinbase, and Klarna, and an honest comparison with Pydantic AI, LangGraph, and CrewAI.",
  metaDescription:
    "A practical, technical guide to the OpenAI Agents SDK and AgentKit in 2026. Covers Agent, Tool, Handoff, Guardrails, and Session primitives, a working multi-agent handoff example, the April 2026 sandbox and subagents release, AgentKit (Agent Builder, ChatKit, Connector Registry, Apps SDK), production case studies at Stripe, Ramp, Coinbase, and Klarna, MCP and Realtime integration, and an honest comparison with Pydantic AI, LangGraph, and CrewAI.",
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
    "OpenAI",
    "OpenAI Agents SDK",
    "AgentKit",
    "Python",
    "TypeScript",
    "Production",
    "Guardrails",
    "MCP",
  ],
  publishDate: "2026-06-20",
  readingTime: "17 min read",
};

export default function OpenAiAgentsSdkAgentkitProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In October 2024 OpenAI released Swarm, an experimental Python
        package the team described as &ldquo;educational&rdquo; and
        explicitly not for production. Eighteen months later the same
        ideas, rebuilt from scratch, run inside an internal harness
        that has shipped more than a million lines of code with no
        human author, sit behind more than half of the pull requests
        Ramp merges every day, and ship 1,000 AI-authored pull
        requests a week at Stripe. The package that gets the credit is
        the OpenAI Agents SDK, and the developer surface around it is
        called AgentKit. The two together are how OpenAI tells teams
        in 2026 to build agents that survive contact with real users.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this stack matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Swarm was a pedagogical artifact. The Agents SDK is the
        opposite. It shipped on March 11, 2025 as a typed Python
        library with a JavaScript and TypeScript twin a few months
        later, and the team has treated it as a stable production
        surface ever since. The April 2026 release added native
        sandbox execution across seven providers and a subagents
        primitive for parent-child agent patterns with isolated
        compute. The October 2025 DevDay added the AgentKit layer on
        top: a visual Agent Builder, an embeddable ChatKit, a
        Connector Registry for enterprise tool sources, an Evals 2.0
        product, and reinforcement fine-tuning that finally made
        custom tool-use training accessible to teams without an ML
        research budget.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason this matters for new engagements is that the
        Agents SDK is no longer a thin wrapper around the Chat
        Completions API. It is now the canonical place where OpenAI
        ships the Responses API surface, the Realtime voice surface,
        the Computer Use surface, the remote MCP integration, and
        the Guardrails open-source library. A team that picks the
        Agents SDK in 2026 gets all five of those without writing
        glue code. A team that wires the OpenAI client directly,
        the way most production code did in 2024, ends up rebuilding
        the same five integrations by hand and paying the same
        debugging cost the SDK already absorbed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>26,400+ GitHub stars and 4,000+ forks</strong> on
          openai/openai-agents-python by mid-2026, with a sibling
          JavaScript SDK at openai/openai-agents-js. Both ship the
          same primitives, so a Python backend and a TypeScript edge
          worker can host the same agent definition with no
          translation layer.
        </li>
        <li>
          <strong>22+ supported model providers</strong> through the
          provider-agnostic Chat Completions adapter. The SDK is
          OpenAI-optimized but not OpenAI-only; Anthropic, Google,
          DeepSeek, Mistral, and the long tail of OpenRouter-hosted
          models all run through the same Agent class with one
          string change.
        </li>
        <li>
          <strong>Seven native sandbox providers</strong> shipped in
          April 2026: Blaxel, Cloudflare, Daytona, E2B, Modal,
          Runloop, and Vercel. The Agent gets a sandbox=
          parameter, the framework handles the isolated container,
          and the tool that executes code runs against the sandbox
          instead of the host process.
        </li>
        <li>
          <strong>Four core primitives</strong> cover the entire
          surface area you need in production: Agent, Tool, Handoff,
          and Guardrail. Sessions and Tracing layer on top. Most
          production code touches only those six concepts.
        </li>
        <li>
          <strong>Assistants API sunset on August 26, 2026.</strong>{" "}
          The Responses API the Agents SDK builds on is the
          replacement, and the migration window is the reason a lot
          of teams that were sitting on Assistants moved to the SDK
          in the first half of the year.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        From Swarm to the Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        Swarm gave the industry the handoff idea. An agent that does
        not know how to answer a question can hand the conversation
        off to another agent that does, the second agent picks up
        with the full history, and the user does not see the seam.
        The pattern was useful enough that LangChain, CrewAI, and a
        dozen smaller frameworks added their own version within a
        few months. What Swarm did not give the industry was a
        production runtime: no typed deps, no input validation, no
        tracing, no session management, no guardrails, no support
        contract. It said so on the README.
      </p>
      <p className="mb-6 leading-relaxed">
        The Agents SDK kept the handoff idea and added the
        production runtime around it. The agent loop is explicit and
        debuggable. Tools are typed Python or TypeScript functions
        the framework converts to JSON schemas for the model. The
        Runner class is the only thing that drives the loop, and it
        emits OpenTelemetry spans you can ship to any tracing
        backend including OpenAI&rsquo;s own dashboard. The same
        Agent definition runs in a Jupyter notebook, in a FastAPI
        handler, and on a Vercel edge function with no changes to
        the agent itself.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: Agent, Tool, Handoff, Guardrail
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agents SDK is a small framework. Four primitives carry
        almost all of the work, and the rest of the docs is variations
        on those four.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Agent</strong> is the unit of work. It binds a
        model, an instructions string, a list of tools, a list of
        handoffs, and an optional set of guardrails into one object
        Runner.run can drive. In Python the Agent is generic over
        the context type and the output type, so the type checker
        knows what every tool receives and what every run returns.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>Tool</strong> is a typed function the agent can
        invoke. The SDK generates a JSON schema from the function
        signature and the docstring, sends that schema to the model
        in the tool-calling format the provider expects, validates
        the model arguments before the function runs, and returns
        the function output to the model. The same decorator turns a
        Python function or a TypeScript function into a tool, and
        the same call site works for both.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>Handoff</strong> is the SDK&rsquo;s way of letting
        one agent delegate to another. The current conversation
        history flows to the receiving agent, the receiving agent
        responds in the same turn, and the caller sees one final
        output. Handoffs are explicit: the parent agent lists which
        agents it can hand off to, and the model picks from that
        list at runtime. There is no hidden routing graph, which is
        the point. When something goes wrong in production you read
        the handoffs= argument in the source, not a learned routing
        table you cannot inspect.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>Guardrail</strong> is an input or output validator
        the SDK runs around the agent. An input guardrail inspects
        the user message before the agent sees it. An output
        guardrail inspects the agent response before the caller sees
        it. A tool guardrail wraps a tool call. Every guardrail can
        return a tripwire that halts the run with a typed exception
        the calling code can catch. The library that backs this is
        the MIT-licensed openai-guardrails package OpenAI open-sourced
        in late 2025; it ships pre-built guards for jailbreak
        detection, relevance, keyword filtering, and safety
        classification.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through the SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model for an Agents SDK deployment is a small set
        of layers stacked on top of the Responses API. A request
        comes in, the Runner drives the loop, the loop may invoke
        tools or hand off to another agent, the guardrails fire on
        the boundaries, and the trace is automatic.
      </p>
      <CodeBlock
        language="bash"
        filename="Agents SDK request path"
        code={`Client (web, mobile, ChatKit widget, another service)
        |
        |  POST /support  { "query": "..." }
        v
+----------------------------------------------------+
|  FastAPI / Next.js route handler                   |
|                                                    |
|  1. Build context (DB pool, user id, request id)   |
|  2. Call Runner.run(agent, query, context=ctx)     |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Input Guardrails                                  |
|  - PII filter, jailbreak check, relevance gate     |
|  - tripwire halts the run before the model sees it |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Agent loop (Runner)                               |
|                                                    |
|  1. Send instructions + tool schemas to model      |
|  2. Receive tool calls -> validate args -> run     |
|     - tool may call DB / API / MCP / sandbox       |
|  3. Receive handoff -> switch active agent         |
|     - history carries to the receiving agent       |
|  4. Receive final output                           |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Output Guardrails                                 |
|  - safety classifier, schema check, redaction      |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Tracing (Agents dashboard or any OTel sink)       |
|  - one trace per run, tool calls and handoffs      |
|    as child spans, token cost on each span         |
+----------------------------------------------------+
        |
        v
   Final output back to the route handler`}
      />
      <p className="mb-6 leading-relaxed">
        Three details matter for production. The context object is
        built per request, so the database session and user identity
        flow into every tool the agent calls without any global
        state. The guardrails run on the boundaries of the loop, not
        inside it, which means a tripwire halts the run cleanly with
        no token waste. The tracing is on by default; if you set the
        OPENAI_API_KEY the SDK already needs, every Runner.run
        becomes a trace in the Agents dashboard with tool calls and
        handoffs as nested spans, and you can swap the sink to any
        OpenTelemetry collector with a single configuration call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A working multi-agent example with handoff
      </h2>
      <p className="mb-6 leading-relaxed">
        The snippet below is the shape we use as a starting point on
        client engagements. A triage agent reads the user message,
        decides whether the case is a billing question or a refund
        request, and hands off to a specialist. The specialists are
        normal agents with their own tools; the triage agent does
        not need to know anything about how they work.
      </p>
      <CodeBlock
        language="python"
        filename="support_agents.py"
        code={`from dataclasses import dataclass
from agents import Agent, Runner, function_tool, handoff

# 1. Context: typed dependency object the framework passes to every tool.
#    Swap the pool for a fake in tests; agent code never changes.
@dataclass
class SupportContext:
    db_pool: "asyncpg.Pool"
    customer_id: int

# 2. Tools: typed functions. The schema goes to the model automatically.
@function_tool
async def recent_orders(ctx: SupportContext, limit: int = 5) -> list[dict]:
    """Return the customer's most recent orders, newest first."""
    rows = await ctx.db_pool.fetch(
        "SELECT id, total_cents, status, placed_at "
        "FROM orders WHERE customer_id = $1 "
        "ORDER BY placed_at DESC LIMIT $2",
        ctx.customer_id, limit,
    )
    return [dict(r) for r in rows]

@function_tool
async def issue_refund(ctx: SupportContext, order_id: int, amount_cents: int) -> dict:
    """Issue a partial or full refund for one order."""
    await ctx.db_pool.execute(
        "INSERT INTO refunds (order_id, amount_cents) VALUES ($1, $2)",
        order_id, amount_cents,
    )
    return {"order_id": order_id, "refunded_cents": amount_cents}

# 3. Specialist agents. Each one owns the tools relevant to its domain.
billing_agent = Agent[SupportContext](
    name="Billing",
    instructions="Answer billing questions. Use recent_orders for context.",
    model="gpt-5",
    tools=[recent_orders],
)

refund_agent = Agent[SupportContext](
    name="Refunds",
    instructions=(
        "Process refund requests. Always look up the order first. "
        "If the order is older than 30 days, refuse politely."
    ),
    model="gpt-5",
    tools=[recent_orders, issue_refund],
)

# 4. Triage agent. Knows nothing about billing or refunds beyond who handles them.
triage_agent = Agent[SupportContext](
    name="Triage",
    instructions=(
        "Decide whether the customer needs the billing agent or the refund agent, "
        "then hand off. Do not answer the question yourself."
    ),
    model="gpt-5-mini",
    handoffs=[billing_agent, handoff(refund_agent)],
)

# 5. Call site. Looks like any other async function.
async def handle_support(query: str, ctx: SupportContext) -> str:
    result = await Runner.run(triage_agent, query, context=ctx)
    return result.final_output`}
      />
      <p className="mb-6 leading-relaxed">
        Five things in this code carry the production work. The
        SupportContext dataclass is the seam that makes the agent
        testable in isolation; in a unit test you build it with a
        fake pool, in production you build it with the live pool,
        and the agent definitions never move. The function_tool
        decorator turns the Python signature and the docstring into
        the JSON schema the model receives, so editing the limit
        default in Python also edits what the model sees with no
        manual registration. The handoffs= list is the explicit
        routing graph; the model picks one of the agents in that
        list, and the framework carries the conversation history to
        the receiving agent. The mini model on the triage agent is
        a cost optimization the SDK encourages; cheap models route,
        expensive models execute. The result.final_output is the
        clean string the caller returns, and the full event log is
        available on result.new_items for any code that needs the
        intermediate tool calls.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sessions: persistent memory without a vector store
      </h2>
      <p className="mb-6 leading-relaxed">
        A real production agent rarely answers in one turn. The user
        sends a message, the agent answers, the user follows up, and
        the framework has to remember what just happened. The Agents
        SDK ships Session as a first-class primitive for exactly
        this. A Session holds the conversation tree, persists it
        through whatever backend you wire in (SQLite locally,
        Postgres or Redis in production), and passes the history
        into every Runner.run that uses it.
      </p>
      <CodeBlock
        language="python"
        filename="sessions.py"
        code={`from agents import Agent, Runner, SQLiteSession

agent = Agent(
    name="Assistant",
    instructions="Remember details about the user across turns.",
    model="gpt-5",
)

# One session per user. The backend is pluggable.
session = SQLiteSession(session_id="user-42", db_path="./sessions.db")

# Turn 1: user introduces themselves.
await Runner.run(agent, "Hi, I am Alice and I work in TypeScript.", session=session)

# Turn 2: the agent already knows the name and the language.
result = await Runner.run(agent, "Recommend a tutorial for me.", session=session)
print(result.final_output)`}
      />
      <p className="mb-6 leading-relaxed">
        Sessions are the reason most production deployments do not
        reach for a vector store on day one. A session backed by
        Postgres is enough memory for the kind of multi-turn
        conversation a support agent or a coding agent actually
        runs. Vector recall and long-term knowledge are still useful
        when the agent has to answer from a corpus that does not fit
        in context, but those are separate tools the agent calls,
        not a replacement for the per-conversation history Session
        gives you for free.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Guardrails: input, output, and tool validators
      </h2>
      <p className="mb-6 leading-relaxed">
        Guardrails are the boundary code that keeps the agent honest.
        The SDK ships three positions for a guardrail to attach.
        Input guardrails inspect the user message before the agent
        sees it. Output guardrails inspect the final response before
        the caller sees it. Tool guardrails wrap a specific tool and
        run on every invocation.
      </p>
      <CodeBlock
        language="python"
        filename="guardrails.py"
        code={`from pydantic import BaseModel
from agents import (
    Agent, Runner, GuardrailFunctionOutput,
    input_guardrail, output_guardrail,
)

class TopicCheck(BaseModel):
    is_off_topic: bool
    reason: str

# A small judge agent the guardrail uses to classify the input.
topic_judge = Agent(
    name="Topic Judge",
    instructions="Return is_off_topic=true if the input is not about billing.",
    model="gpt-5-mini",
    output_type=TopicCheck,
)

@input_guardrail
async def billing_only(ctx, agent, user_input: str) -> GuardrailFunctionOutput:
    judgment = await Runner.run(topic_judge, user_input, context=ctx.context)
    return GuardrailFunctionOutput(
        output_info=judgment.final_output,
        tripwire_triggered=judgment.final_output.is_off_topic,
    )

@output_guardrail
async def no_pii(ctx, agent, output: str) -> GuardrailFunctionOutput:
    leaked = any(token in output.lower() for token in ("ssn", "password"))
    return GuardrailFunctionOutput(
        output_info={"leaked": leaked},
        tripwire_triggered=leaked,
    )

billing_agent = Agent(
    name="Billing",
    instructions="Answer billing questions only.",
    model="gpt-5",
    input_guardrails=[billing_only],
    output_guardrails=[no_pii],
)`}
      />
      <p className="mb-6 leading-relaxed">
        Two design choices in the guardrail system are worth calling
        out. A guardrail can be a normal function or it can itself
        run an agent, which is how teams build LLM-as-judge gates
        for things like jailbreak detection and relevance without
        leaving the framework. And the tripwire is a typed
        exception, not a magic return value, which means a FastAPI
        handler wraps the Runner.run in a try block, catches the
        InputGuardrailTripwireTriggered, and returns a clean 400 with
        the same shape as any other validation error in the service.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sandboxes and subagents: the April 2026 release
      </h2>
      <p className="mb-6 leading-relaxed">
        The biggest 2026 change to the SDK was the native sandbox
        story. Before April, an agent that wrote and ran code had
        to ship its own Docker, Firecracker, or microVM layer. After
        April, the Agent accepts a sandbox= parameter that points at
        one of seven managed providers (Blaxel, Cloudflare, Daytona,
        E2B, Modal, Runloop, Vercel) and the framework handles the
        isolation. The same release introduced the subagents
        primitive: a parent agent can spawn a child agent in its
        own isolated context, run it to completion, and read back
        only the final output. The pattern matters because long
        contexts are expensive and confusing; pushing exploratory
        work into a child whose intermediate state never reaches the
        parent is the cleanest way to keep the top-level context
        small.
      </p>
      <CodeBlock
        language="python"
        filename="sandbox_subagent.py"
        code={`from agents import Agent, Runner, SandboxConfig

# A child agent that runs untrusted code in an isolated container.
data_explorer = Agent(
    name="Data Explorer",
    instructions="Explore the dataset and summarize findings in two sentences.",
    model="gpt-5",
    sandbox=SandboxConfig(provider="e2b", timeout_seconds=60),
)

# The parent agent calls the child as a subagent; only the summary returns.
parent = Agent(
    name="Analyst",
    instructions="Use the data_explorer subagent for exploration, then write the report.",
    model="gpt-5",
    subagents=[data_explorer],
)

result = await Runner.run(parent, "What stands out in last month's churn data?")`}
      />
      <p className="mb-6 leading-relaxed">
        The subagent boundary is also a security boundary. The
        child runs in a fresh sandbox, has no access to the parent
        context, and returns only the structured output the parent
        asked for. The pattern composes; a subagent can have its
        own subagents, and each one runs in its own container with
        its own timeout. The framework charges the same token cost
        per call no matter how the agents are nested, so the only
        budgeting concern is sandbox seconds, not orchestration
        overhead.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AgentKit: the visual layer on top of the SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        AgentKit is the developer surface OpenAI shipped at DevDay
        in October 2025 to make the SDK accessible to teams that do
        not want to start from a blank Python file. The pieces are
        independent products that share the same runtime; pick the
        ones you need.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent Builder</strong> is a drag-and-drop canvas
        for composing agents, tools, and handoffs visually. The
        canvas exports to the same Agents SDK code you would write
        by hand, so a product manager can prototype a workflow in
        the canvas, an engineer can pull the export into a repo, and
        the runtime is identical. The product is still in beta as
        of mid-2026; the export format is stable enough for
        production use.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ChatKit</strong> is the embeddable chat widget that
        renders an Agents SDK conversation in a web page or a
        mobile app. It shipped GA at DevDay. The widget handles
        streaming, file uploads, voice input on supported devices,
        and the same session backend the SDK uses, so a ChatKit
        conversation in a marketing site and a CLI conversation
        from an engineer hit the same session and share the same
        history.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Connector Registry</strong> is the enterprise
        directory of MCP servers OpenAI hosts on behalf of vendors
        (Slack, Notion, Linear, Salesforce, GitHub, and a long
        tail). An agent picks a connector by name, the registry
        handles auth, and the agent gets the connector tools as if
        they were locally defined. Connector Registry is in limited
        enterprise beta and is the part of AgentKit most likely to
        push teams toward the OpenAI ecosystem over time.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Evals 2.0 and RFT</strong> close the loop. Evals 2.0
        is a code-first eval framework that runs against the same
        Agent definition the production traffic uses; the dashboard
        renders side-by-side comparisons across runs. RFT
        (reinforcement fine-tuning) is now generally available on
        o4-mini and in private beta on GPT-5 with custom tool calls
        and custom graders, which means a team can finally fine-tune
        a small model on a tool-use task without standing up its own
        RL infrastructure.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Apps SDK</strong> is the other half of the
        ecosystem play. It is an MCP-based standard for third
        parties to ship apps that render inside ChatGPT (Spotify,
        Canva, Figma, Zillow were the launch partners). The same
        MCP tool surface the Agents SDK consumes is what an Apps
        SDK app exposes, which is why the integration story
        between the two products is so tight.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP, Realtime, and the rest of the surface
      </h2>
      <p className="mb-6 leading-relaxed">
        Three other integrations matter for production. MCP is the
        Anthropic-led protocol for standardized tool access; the
        Agents SDK ships a native client that connects to any MCP
        server over HTTP or stdio, discovers its tools, and exposes
        them to the agent. The same code that consumes a Slack MCP
        server consumes a Logfire MCP server or an internal one a
        team wrote in an afternoon. The SDK deprecated the older SSE
        transport in 2026; HTTP is the production default, stdio
        the local one.
      </p>
      <p className="mb-6 leading-relaxed">
        The Realtime surface is the second integration. A
        RealtimeAgent is a normal Agent that connects to the
        Realtime API and streams audio in and out instead of text.
        The same handoffs and guardrails apply, which is the only
        reason building a production voice agent with safety
        constraints is tractable on a small team. The unified
        pricing OpenAI introduced in May 2026 covers all voice
        primitives (reasoning, translation, transcription) in a
        single per-minute and per-token model.
      </p>
      <p className="mb-6 leading-relaxed">
        Computer Use is the third. The Agent gets a built-in
        computer_use tool that drives a remote browser or a virtual
        desktop, and the framework handles the screenshot loop and
        the action validation. The pattern composes with the
        sandbox primitive: the computer-use agent runs inside a
        sandbox so the actions it takes do not reach the host.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Five production stories illustrate the range of work the
        Agents SDK ships in 2026. Each one tells a different part
        of the story.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stripe</strong> uses Agents SDK pipelines to ship
        more than 1,000 AI-authored pull requests a week against
        its own codebase. The engineering team publishes a benchmark
        in which Claude Opus 4.5 scored 92 percent average across
        four full-stack API tasks and GPT-5.2 scored 73 percent on
        the harder agentic gym problems; the lesson Stripe pulls
        out of the data is that no single model wins everywhere, so
        the production harness routes to a different model per
        task. The pattern is interesting because the SDK is the
        model-routing layer; the same Agent definition runs with
        different model strings depending on the task type.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Ramp</strong> reports that more than half of merged
        pull requests at the company are agent-authored, with an
        average of 3.5 PRs per engineer per day going through the
        agent path. The interesting Ramp story is not the coding
        agent; it is the purchasing agent. Ramp wired the Agents
        SDK to its tokenization system so a procurement agent can
        spend money on behalf of a human, with single-use scoped
        credentials, spend caps, and a human approval gate as a
        guardrail before the tool that finalizes the purchase fires.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Coinbase</strong> built Cloudbot, an internal
        coding agent that authored 5 percent of merged pull
        requests and reduced the PR cycle time from 150 hours to 15
        hours. The architecture is multi-model, Slack-native, and
        skills-based, with MCP servers for the internal tools the
        agent has to touch. The win Coinbase calls out in writeups
        is not raw throughput; it is the 10x cycle-time reduction,
        which compounds against every other piece of engineering
        work that waits on a code change.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Klarna</strong> is the cautionary tale and the
        success story at the same time. The first deployment in
        February 2024 handled 2.3 million customer-service
        conversations in 30 days, cut resolution time from 11
        minutes to 2, supported 23 languages, and was reported as
        equivalent to roughly 700 full-time agents. The 2025
        correction was that pure automation hit a ceiling on
        complex and emotional cases, so Klarna reintroduced human
        agents for escalations. The 2026 number that holds up is
        67 percent automation in a hybrid model where tier-1
        traffic goes to the agent and the long tail goes to a
        human. The pattern is the production lesson: agents win on
        volume, humans win on edge cases, and the hard part is the
        handoff between them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>OpenAI&rsquo;s internal harness</strong> is the
        extreme case. The team has shipped more than a million
        lines of code to production through an agent-to-agent
        review loop with no human-written code in the pipeline.
        The number is impressive in isolation and more impressive
        as a forcing function: the same SDK an external team uses
        is the SDK the OpenAI engineering org uses to ship its own
        codebase, which is why the durability of the abstractions
        matters as much as the model quality.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agents SDK vs Pydantic AI, LangGraph, CrewAI
      </h2>
      <p className="mb-6 leading-relaxed">
        Four frameworks dominate the production agent conversation
        in 2026. They model the same problem in different ways and
        they fit different teams.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pydantic AI</strong> is the type-safety play and
        the Python-only default for teams that already build on
        FastAPI and care about structured outputs above everything
        else. The Agents SDK ships looser typing in exchange for a
        larger surface (handoffs, sessions, voice, computer use,
        sandboxes, AgentKit). The pragmatic split we see on client
        work is Pydantic AI when the workload is a typed API that
        happens to call an LLM, the Agents SDK when the workload
        is a multi-agent system that happens to expose an API.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph</strong> is the graph-orchestration play.
        Explicit state machines, cyclic graphs, conditional edges,
        and checkpointers built for workflows that need to pause,
        resume, and roll back. The Agents SDK does not try to be
        a state machine framework; the handoff model is simpler
        and the SDK leans on durable-execution wrappers like
        Temporal and DBOS the same way Pydantic AI does. For
        regulated workflows where the auditor wants to see the
        state diagram, LangGraph still wins. For multi-agent
        workflows where the routing is a short list of specialists,
        the Agents SDK is less code.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>CrewAI</strong> is the role-based multi-agent play.
        Agents get roles, goals, and backstories; the framework
        wires them into a crew. The intuitive model is genuinely
        useful when the workflow maps cleanly onto a team
        metaphor. The Agents SDK reaches the same shape with
        handoffs and is less opinionated about the metaphor; when
        the workflow does not look like a team, the SDK has less
        to apologize for.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>OpenAI Agents SDK</strong> is the
        OpenAI-integration play. The smallest surface area among
        the four for the most common production workload (one or
        two specialist agents behind a triage agent), the deepest
        integration with the Responses, Realtime, and Computer Use
        surfaces, the only one with first-party sandboxes, and the
        only one with a visual canvas in AgentKit. The trade-off
        is that the typing is shallower than Pydantic AI&rsquo;s
        and the orchestration is less expressive than
        LangGraph&rsquo;s. For new agent work in 2026 where the
        OpenAI model is already the default and the workload is a
        multi-agent system, the Agents SDK is the lowest-friction
        path.
      </p>
      <p className="mb-6 leading-relaxed">
        A rough decision rule that holds on most engagements:
        Pydantic AI for typed Python agents that wrap an API,
        LangGraph for state machines that need rollback, CrewAI
        when the workflow is a literal team, and the Agents SDK
        when the workload is multi-agent and OpenAI models are
        already in the stack. The four compose; we have shipped
        production systems that use a LangGraph orchestrator above
        a swarm of Agents SDK specialists, and we have shipped
        systems that use Pydantic AI for the typed boundary and
        the Agents SDK for the voice surface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agents SDK wins a lot of arguments, but it is not free.
        An honest list of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> A small, learnable surface
        area: Agent, Tool, Handoff, Guardrail, Session, plus the
        Runner. Multi-language: the same primitives in Python and
        TypeScript, so a service mesh that crosses Python backends
        and Node edge functions can host the same agent
        definitions. First-class guardrails open-sourced under MIT,
        which makes the safety story auditable. Native sandboxes
        across seven providers, so the code-execution layer is no
        longer a do-it-yourself project. Native MCP support, so
        every tool that ships an MCP server is a tool the agent
        can call without glue code. Tracing on by default to a
        dashboard the framework ships, and pluggable to any
        OpenTelemetry sink for teams that already run one.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The typing is intentionally
        light: generic over the context type, but the output is a
        string unless you wire structured outputs through the
        Responses API yourself. Teams that prize a typed output
        contract end up either pairing the SDK with Pydantic
        models or reaching for Pydantic AI instead. The handoff
        graph is explicit, which is great for debuggability and
        less great for workflows where the routing is genuinely
        dynamic and a learned router would do better. AgentKit
        ships its richest features (Connector Registry, Agent
        Builder) inside the OpenAI platform, which is a gentle
        push toward ecosystem lock-in even though the underlying
        SDK is open source. And the pricing is the OpenAI token
        price; teams that are budget-constrained or that want to
        run open models locally still pick LangChain over a
        self-hosted LLM rather than the Agents SDK against the
        OpenAI API.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A pure chat endpoint
        with no tools, no handoffs, and no structured output does
        not need an agent framework; the openai-python client is
        enough. A workflow that needs strict audit and rollback
        across a long-running state machine wants LangGraph. A
        Python-only service whose primary goal is a typed output
        contract wants Pydantic AI. Above the complexity threshold
        of one specialist agent plus one triage agent plus a
        guardrail, the Agents SDK pays for itself the first time
        the model picks a wrong route and you can read the handoff
        list in the source instead of inspecting a learned router.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the Agents SDK roadmap and the broader
        OpenAI agent platform for the next eighteen months.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Sandboxes become the default execution model.</strong>{" "}
        The April 2026 release made sandbox execution a one-line
        change on the Agent. The pattern is already standard on new
        engagements: any agent that writes code or shells out to
        a tool runs in a sandbox by default, and the host process
        only sees the structured output. Expect the rest of the
        agent framework market to converge on the same default by
        2027.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Subagents replace long contexts for exploration.</strong>{" "}
        Pushing exploratory work into a subagent whose intermediate
        state never reaches the parent is the cleanest pattern we
        have seen for keeping the top-level context small. The SDK
        ships the primitive; expect the AgentKit canvas to add
        first-class subagent boxes in the next release and expect
        the cost story to favor the pattern as long-context pricing
        stays the way it is.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The agent and the UI converge through Apps SDK.</strong>{" "}
        The Apps SDK lets a vendor ship an agent that renders
        inside ChatGPT, and the Agents SDK lets a vendor build
        the agent that backs it. The two halves are starting to
        ship together: a new Apps SDK app increasingly arrives
        with a public Agent definition, and ChatKit lets the same
        agent appear in the vendor&rsquo;s own product. The line
        between &ldquo;an agent in my app&rdquo; and &ldquo;my app
        in ChatGPT&rdquo; is going to keep blurring.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Reinforcement fine-tuning becomes a normal
        deployment step.</strong> RFT was an ML research line item
        in 2024 and an OpenAI product in 2025. In 2026 it is
        general on o4-mini with custom tool calls and custom
        graders, and in private beta on GPT-5. The pattern that is
        already showing up on engagements is a small model
        fine-tuned on the team&rsquo;s actual tool-use traces,
        deployed behind the Agents SDK with the same Agent
        definition, and serving the routing and the cheap tool
        calls while a frontier model handles the rest. Expect that
        pattern to be standard by 2027.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the OpenAI side of the agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about the Agents SDK is how much of
        it is the same idea as the rest of the 2026 agent
        ecosystem. Typed tools, explicit routing, sessions for
        memory, guardrails on the boundary, tracing on by default,
        MCP for tool interop. None of these are OpenAI inventions;
        what is OpenAI&rsquo;s contribution is that the same
        primitives plug straight into the Responses, Realtime,
        Computer Use, and Apps SDK surfaces with no glue code, and
        the AgentKit layer above the SDK gives a product team a
        visual canvas that exports back to the same code an
        engineer would write by hand.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 where the OpenAI model family is
        already in the stack, the argument against starting on the
        Agents SDK is thin. The migration cost from a hand-rolled
        OpenAI client is small; the migration cost from Swarm is a
        few hours. The remaining decisions are how much of AgentKit
        to adopt (Agent Builder, ChatKit, Connector Registry, RFT)
        and whether to compose with Pydantic AI for the typed
        boundary or with LangGraph for the state machine above the
        agents. Both decisions can be made gradually. The first one
        only has to be made once.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://openai.github.io/openai-agents-python/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI Agents SDK (Python) documentation
          </a>
          {" "}- the canonical reference for Agent, Tool, Handoff,
          Guardrail, Session, sandboxes, subagents, and MCP.
        </li>
        <li>
          <a
            href="https://openai.github.io/openai-agents-js/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI Agents SDK (JavaScript / TypeScript) documentation
          </a>
          {" "}- the same primitives for Node and edge runtimes,
          with the same agent definitions that work in Python.
        </li>
        <li>
          <a
            href="https://openai.com/index/introducing-agentkit/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing AgentKit (openai.com, October 2025)
          </a>
          {" "}- the DevDay launch post that introduced Agent
          Builder, ChatKit, Connector Registry, Evals 2.0, and RFT.
        </li>
        <li>
          <a
            href="https://openai.com/index/the-next-evolution-of-the-agents-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The next evolution of the Agents SDK (openai.com, April 2026)
          </a>
          {" "}- the release post for native sandbox execution
          across seven providers and the subagents primitive.
        </li>
        <li>
          <a
            href="https://developers.openai.com/blog/openai-for-developers-2025"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI for developers in 2025 (developers.openai.com)
          </a>
          {" "}- the year-in-review with the GA timeline for the
          Agents SDK, the Responses API, and the Assistants API
          sunset on August 26, 2026.
        </li>
        <li>
          <a
            href="https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Can AI agents build real Stripe integrations? (stripe.com)
          </a>
          {" "}- Stripe&rsquo;s engineering writeup with the
          benchmark numbers behind the 1,000 AI-authored pull
          requests per week.
        </li>
        <li>
          <a
            href="https://www.twig.so/blog/klarna-ai-customer-support-efficiency"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Klarna AI customer support efficiency
          </a>
          {" "}- the long-form retrospective on the 2.3M
          conversations, the 11-minute to 2-minute resolution
          time, and the 2025 correction toward a hybrid model.
        </li>
        <li>
          <a
            href="https://openai.github.io/openai-agents-python/guardrails/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agents SDK guardrails documentation
          </a>
          {" "}- the input, output, and tool guardrail primitives,
          with the MIT-licensed openai-guardrails library that
          backs them.
        </li>
        <li>
          <a
            href="https://openai.github.io/openai-agents-python/mcp/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agents SDK MCP integration
          </a>
          {" "}- the native client for any MCP server over HTTP or
          stdio, including the 2026 deprecation of the SSE transport.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the typed Python alternative that pairs well with
          the Agents SDK for the typed-boundary half of a service.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: building production AI agents as
            state machines
          </a>
          {" "}- the graph-orchestration framework that composes
          above a swarm of Agents SDK specialists.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context Protocol the
          Agents SDK consumes as a first-class integration.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the broader pattern of handoffs, supervisors, and
          specialist swarms the Agents SDK fits into.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the broader observability and eval picture that
          Evals 2.0 and the Agents tracing dashboard fit into.
        </li>
      </ul>
    </div>
  );
}
