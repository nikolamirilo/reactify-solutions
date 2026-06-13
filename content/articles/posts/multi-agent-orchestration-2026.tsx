import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 18,
  slug: "multi-agent-orchestration-2026",
  title:
    "Multi-agent orchestration in 2026: supervisor, swarm, handoffs, and the A2A protocol that ties them together",
  excerpt:
    "Why multi-agent stopped being a research aesthetic and became an architectural decision, how the supervisor and swarm patterns actually differ in production, and when the right answer is still a single agent in a tight loop.",
  metaDescription:
    "A practical, technical guide to multi-agent orchestration in 2026. Covers the supervisor-worker pattern, swarm and peer handoffs, Anthropic's lead-agent research architecture, the A2A protocol, LangGraph Command-based handoffs, the OpenAI Agents SDK, CrewAI Crews and Flows, Microsoft Agent Framework, the Cognition single-agent counter-argument, context-fragmentation failure modes, and working Python and TypeScript orchestration examples.",
  image: "/images/articles/article-11.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Multi-Agent",
    "LangGraph",
    "CrewAI",
    "OpenAI Agents SDK",
    "A2A",
    "Production",
  ],
  publishDate: "2026-06-09",
  readingTime: "15 min read",
};

export default function MultiAgentOrchestration2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Multi-agent went from research aesthetic to architectural decision
        somewhere between Anthropic publishing the engineering write-up of
        Claude&rsquo;s Research feature in June 2025 and the Linux
        Foundation taking custody of Google&rsquo;s A2A protocol two weeks
        later. Before that window, the answer to &ldquo;should this be one
        agent or many?&rdquo; was almost always one. After it, the answer
        depends on whether the work parallelises, whether the seams
        between agents can be made to hold under real traffic, and
        whether you can afford the token bill that multi-agent always
        ships with. This post is how we make that call on client
        engagements in 2026, the four patterns that have survived
        production, and the specific places single-agent still wins.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why multi-agent stopped being optional
      </h2>
      <p className="mb-6 leading-relaxed">
        Two numbers anchor the 2025&ndash;2026 shift. Anthropic&rsquo;s
        Research system, with Claude Opus 4 as the lead agent delegating
        to Claude Sonnet 4 subagents, outperformed single-agent Claude
        Opus 4 by 90.2% on their internal research evaluation. About 80%
        of the variance in that result tracked token usage; the multi-
        agent system spent roughly fifteen times the tokens of a standard
        chat turn. The performance is real, the bill is real, and the
        engineering loop that produced it is now public domain. Anyone
        building an agent that has to read widely and synthesise &mdash; a
        research assistant, a competitive-intel digester, a long-tail
        support triage &mdash; has the blueprint.
      </p>
      <p className="mb-6 leading-relaxed">
        On the same week as the Anthropic post, Cognition AI &mdash; the
        Devin team &mdash; published &ldquo;Don&rsquo;t Build Multi-
        Agents.&rdquo; Their argument was sharper than the headline. They
        were not against parallelism; they were against parallel
        decision-making with no shared context. Their Flappy Bird example
        landed: one subagent renders a Super Mario background while
        another draws a bird that does not match because neither agent
        knows the design decisions the other implicitly made. The
        diagnosis was structural. Actions carry implicit decisions. When
        you split a task across agents, you split the decision context,
        and the seams between them become the source of every bug.
      </p>
      <p className="mb-6 leading-relaxed">
        Both posts are right. The synthesis the field landed on by Q4 2025
        is that multi-agent works when the subtasks are{" "}
        <em>read-heavy and parallelisable</em> (research, search,
        retrieval, audit) and fails when they are{" "}
        <em>write-heavy and coupled</em> (code generation, design,
        anything where two agents are touching the same artefact). The
        bench-side rule we apply is: if the subagents can be told their
        whole job in one paragraph and never need to know what the others
        did, multi-agent wins. If they need to negotiate, do not split.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four patterns that survived production
      </h2>
      <p className="mb-4 leading-relaxed">
        Five frameworks &mdash; LangGraph, the OpenAI Agents SDK, CrewAI,
        the Microsoft Agent Framework, and Anthropic&rsquo;s in-house
        stack &mdash; converged on the same four shapes. The names differ;
        the wire is identical.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Supervisor (orchestrator-worker).</strong> One agent owns
          routing and delegates to specialised workers, each with a
          scoped tool list and a one-paragraph mission. The supervisor
          collects results, decides whether to dispatch more work, and
          eventually composes a reply. This is Anthropic&rsquo;s Research
          architecture, LangGraph&rsquo;s default, CrewAI&rsquo;s
          hierarchical process, and the OpenAI Agents SDK&rsquo;s tool-
          based handoff pattern. The right pick when one agent is
          recognisably in charge.
        </li>
        <li>
          <strong>Swarm (peer handoff).</strong> Agents transfer control
          to one another directly without a central router. The system
          tracks which agent is currently active; the next user turn
          resumes there. LangGraph ships this as <code>langgraph-swarm</code>;
          the OpenAI Agents SDK calls it handoffs; the original OpenAI
          Swarm framework prototyped it. Lower latency than a supervisor
          because the routing LLM call disappears; harder to reason about
          because there is no single point that sees the whole
          conversation.
        </li>
        <li>
          <strong>Sequential / pipeline.</strong> A fixed chain &mdash;
          Researcher &rarr; Drafter &rarr; Reviewer &rarr; Publisher.
          No dynamic routing, no negotiation, each stage gets the previous
          stage&rsquo;s output as input. CrewAI&rsquo;s sequential process
          is the canonical example; LangGraph builds the same shape as a
          straight-line graph. The default for content pipelines, ETL-
          shaped workflows, and any task where the decomposition is known
          before you start.
        </li>
        <li>
          <strong>Parallel fan-out / fan-in.</strong> The supervisor dispatches
          N workers concurrently, waits for all to return, then a reducer
          agent or function synthesises. Map-reduce for LLMs. This is the
          Anthropic Research pattern under the hood and the shape every
          parallel-search use case lands on. The constraint is that the
          worker tasks must be genuinely independent &mdash; the worst
          failure mode is two workers duplicating each other&rsquo;s work
          because the supervisor brief was too vague.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Real systems compose these. Anthropic&rsquo;s Research feature is
        a supervisor that does parallel fan-out for search, then runs a
        sequential pipeline (compress &rarr; cite-check &rarr; format) on
        the synthesised result. The shape that fails is the one without a
        deliberate top-level pattern &mdash; agents handing off freely
        because someone wired tools to call other tools. The failure rate
        on those goes up exponentially with the graph diameter.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The supervisor pattern in LangGraph
      </h2>
      <p className="mb-6 leading-relaxed">
        LangGraph&rsquo;s <code>Command</code> primitive, shipped in late
        2024 and now the recommended routing API, makes the supervisor
        pattern almost shape-identical to the agent it&rsquo;s wrapping.
        Each handoff is a tool the supervisor calls; the tool returns a{" "}
        <code>Command</code> with a <code>goto</code> field that names
        the next node and a state update that ships the brief. The
        worker runs as a normal node, returns its result, and control
        flows back to the supervisor for the next routing decision. No
        custom dispatcher, no special multi-agent runtime &mdash; it is
        the same StateGraph everything else uses.
      </p>
      <CodeBlock
        language="bash"
        filename="supervisor.py"
        code={`# pip install langgraph langchain-anthropic
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.types import Command
from langchain_anthropic import ChatAnthropic
from langchain_core.tools import tool

class State(TypedDict):
    messages: Annotated[list, add_messages]
    next: str

# Workers are normal nodes - they receive the brief in messages,
# do their job, and return state.
def researcher(state: State) -> Command[Literal["supervisor"]]:
    result = ChatAnthropic(model="claude-sonnet-4-6").invoke(state["messages"])
    return Command(
        update={"messages": [("researcher", result.content)]},
        goto="supervisor",
    )

def writer(state: State) -> Command[Literal["supervisor"]]:
    result = ChatAnthropic(model="claude-sonnet-4-6").invoke(state["messages"])
    return Command(
        update={"messages": [("writer", result.content)]},
        goto="supervisor",
    )

# The supervisor is a model bound to "routing tools" - one per worker -
# plus a FINISH tool. The tool the model picks becomes the next node.
@tool
def route_to(target: Literal["researcher", "writer", "FINISH"], brief: str):
    """Hand control to a worker with a one-paragraph brief."""
    return target, brief

def supervisor(state: State) -> Command[Literal["researcher", "writer", "__end__"]]:
    model = ChatAnthropic(model="claude-opus-4-8").bind_tools([route_to])
    resp = model.invoke(state["messages"])
    target, brief = resp.tool_calls[0]["args"].values()
    if target == "FINISH":
        return Command(goto=END)
    return Command(
        goto=target,
        update={"messages": [("supervisor", brief)]},
    )

graph = (
    StateGraph(State)
    .add_node("supervisor", supervisor)
    .add_node("researcher", researcher)
    .add_node("writer", writer)
    .add_edge(START, "supervisor")
    .compile()
)`}
      />
      <p className="mb-6 leading-relaxed">
        Three things make this pattern hold. The supervisor only routes
        &mdash; it never does the work itself. The brief is structured and
        scoped (objective, format, tools, boundaries), not the running
        transcript. And the workers return compressed summaries, not full
        traces, so the supervisor&rsquo;s context budget grows
        sub-linearly in the number of hops. Skip any one of those and the
        supervisor&rsquo;s context window becomes the limiting resource by
        the third turn.
      </p>
      <p className="mb-6 leading-relaxed">
        LangChain&rsquo;s 2026 guidance leans toward this tool-based
        supervisor over the older <code>langgraph-supervisor</code>{" "}
        prebuilt because the explicit handoff tools give you a single
        place to do context engineering &mdash; trimming, summarising,
        formatting the brief before the worker sees it. The
        prebuilt&rsquo;s magic is the thing you end up needing to override
        in production.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Handoffs in the OpenAI Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The OpenAI Agents SDK shipped in early 2025 as the production
        successor to the experimental Swarm framework. Its four primitives
        &mdash; Agents, Tools, Handoffs, and Guardrails &mdash; encode the
        same patterns LangGraph spells out as a graph, but with a flatter
        API that fits OpenAI-first stacks. A handoff is a special kind of
        tool the SDK injects into the agent&rsquo;s tool list: when the
        model calls it, the runtime swaps the active agent, optionally
        filters the conversation history, and resumes the loop on the
        target.
      </p>
      <CodeBlock
        language="bash"
        filename="agents_sdk_handoff.py"
        code={`# pip install openai-agents
from agents import Agent, Runner, handoff
from agents.extensions.handoff_filters import remove_all_tools
from pydantic import BaseModel

class TriageBrief(BaseModel):
    customer_id: str
    summary: str

# Specialist agents - each has a scoped tool list and tight instructions.
billing = Agent(
    name="Billing",
    model="gpt-5",
    instructions="Resolve billing questions only. Refuse anything else.",
    tools=[lookup_invoice, issue_refund],
)
returns = Agent(
    name="Returns",
    model="gpt-5",
    instructions="Process returns and exchanges. Verify order ownership first.",
    tools=[lookup_order, start_return],
)

# Triage agent receives the user and hands off. The on_handoff callback
# fires before the next agent runs - typical use is to log, audit, or
# enrich the brief with state the target needs.
async def log_handoff(ctx, brief: TriageBrief):
    await audit.write(target=ctx.next_agent.name, customer=brief.customer_id)

triage = Agent(
    name="Triage",
    model="gpt-5-mini",
    instructions=(
        "Route to Billing for charges, refunds, or invoices. "
        "Route to Returns for items, shipments, or exchanges. "
        "Do not answer the user yourself."
    ),
    handoffs=[
        handoff(billing, input_type=TriageBrief, on_handoff=log_handoff,
                input_filter=remove_all_tools),
        handoff(returns, input_type=TriageBrief, on_handoff=log_handoff,
                input_filter=remove_all_tools),
    ],
)

result = await Runner.run(triage, input="I was double charged on order 4821.")
print(result.final_output)`}
      />
      <p className="mb-6 leading-relaxed">
        Three SDK details earn their keep in production. The{" "}
        <code>input_type</code> on a handoff forces the model to produce a
        structured brief &mdash; not the running transcript &mdash; so the
        target agent starts with a clean context. The{" "}
        <code>input_filter</code> trims the message list before the next
        agent sees it; <code>remove_all_tools</code> is the most common
        choice because the triage agent&rsquo;s tool calls almost never
        help the specialist. And <code>on_handoff</code> is your audit
        seam &mdash; the one place every handoff has to pass through, so
        every observability and policy check belongs there.
      </p>
      <p className="mb-6 leading-relaxed">
        Guardrails complete the production story. Input guardrails run
        before the agent loop starts and fail fast on prompt-injection or
        out-of-scope queries; output guardrails run after and validate
        the final response. Both run in parallel with the agent so they
        do not lengthen the critical path. Tool-level guardrails &mdash;
        a per-tool validator that runs before every function call &mdash;
        landed in mid-2025 and closed the last big gap that used to need
        custom middleware.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        CrewAI: Crews for the team, Flows for the pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        CrewAI&rsquo;s framing is the easiest to onboard juniors with:
        agents have a role, a goal, and a backstory; tasks get assigned
        to agents; the crew runs in a sequential or hierarchical process.
        For workflows that decompose cleanly into a team of named roles,
        a CrewAI prototype lands in an afternoon and a production
        deployment lands roughly 40% faster than the equivalent LangGraph
        build &mdash; the price you pay is less control over the
        execution model.
      </p>
      <p className="mb-6 leading-relaxed">
        The shape that matured in 2025 is Crews-inside-Flows. A Flow is a
        Python class with <code>@start</code>, <code>@listen</code>, and{" "}
        <code>@router</code> decorators that triggers crews, plain
        functions, or single agent calls in arbitrary order with explicit
        state. Flows are the right primitive when the orchestration mixes
        deterministic logic with agent work &mdash; webhooks fire, a
        crew runs, a router decides whether to escalate, a second crew
        cleans up. Putting the deterministic glue in Flows keeps the
        Crews small and the routing legible.
      </p>
      <CodeBlock
        language="bash"
        filename="content_crew_flow.py"
        code={`# pip install crewai crewai-tools
from crewai import Agent, Task, Crew, Process
from crewai.flow.flow import Flow, listen, start, router

researcher = Agent(
    role="Industry Researcher",
    goal="Surface five concrete trends in the target market.",
    backstory="Senior analyst. Prefers primary sources.",
    tools=[search_tool, scrape_tool],
)
writer = Agent(
    role="Technical Writer",
    goal="Draft a 1,200-word brief grounded in the research notes.",
    backstory="Ex-engineer turned writer. Cites every claim.",
)
reviewer = Agent(
    role="Editor",
    goal="Flag unsupported claims and style breaks.",
    backstory="Hard on copy, soft on people.",
)

research_crew = Crew(
    agents=[researcher],
    tasks=[Task(description="Research {topic}.", agent=researcher,
                expected_output="Bulleted findings with citations.")],
    process=Process.sequential,
)
draft_crew = Crew(
    agents=[writer, reviewer],
    tasks=[
        Task(description="Draft from notes.", agent=writer,
             expected_output="Full draft."),
        Task(description="Review and flag.", agent=reviewer,
             expected_output="Inline comments.", context=[]),
    ],
    process=Process.sequential,
)

class ContentFlow(Flow):
    @start()
    def kickoff(self):
        return {"topic": self.state["topic"]}

    @listen(kickoff)
    def research(self, ctx):
        return research_crew.kickoff(inputs=ctx)

    @router(research)
    def needs_more_research(self, notes):
        return "draft" if len(notes) > 5 else "research"

    @listen("draft")
    def write(self, notes):
        return draft_crew.kickoff(inputs={"notes": notes})

ContentFlow().kickoff({"topic": "Multi-agent orchestration in 2026"})`}
      />
      <p className="mb-6 leading-relaxed">
        The hierarchical process &mdash; CrewAI&rsquo;s name for the
        supervisor pattern &mdash; needs a <code>manager_llm</code> or a
        custom <code>manager_agent</code>. The manager is usually a
        stronger reasoning model with the specialists on cheaper ones; on
        a research-style task this matches Anthropic&rsquo;s Opus-as-lead,
        Sonnet-as-worker split almost exactly. Where LangGraph asks you to
        wire the graph and CrewAI lets you say &ldquo;here is a team,
        here is a manager,&rdquo; the trade-off is debuggability. When
        CrewAI&rsquo;s manager makes a bad routing decision in production,
        you are reading prompts; with LangGraph you are looking at the
        edge that fired.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft Agent Framework: AutoGen + Semantic Kernel
      </h2>
      <p className="mb-6 leading-relaxed">
        Microsoft shipped Agent Framework 1.0 GA on April 3 2026, merging
        AutoGen and Semantic Kernel into a single SDK and putting both
        predecessors into maintenance mode. The framework keeps
        AutoGen&rsquo;s event-driven multi-agent runtime &mdash; agents
        communicate by asynchronous messages on a shared bus &mdash; and
        layers Semantic Kernel&rsquo;s enterprise primitives on top:
        typed state, middleware, telemetry, session management, and
        first-class support for six model providers (Azure OpenAI, OpenAI,
        Anthropic, Bedrock, Gemini, Ollama) swappable with one line.
      </p>
      <p className="mb-6 leading-relaxed">
        Two things make Agent Framework distinctive in 2026. It ships
        with graph-based workflow primitives for explicit multi-agent
        orchestration alongside the AutoGen-style group chat, so you can
        pick the pattern that fits without leaving the SDK. And it bakes
        A2A and MCP in as first-class transports, which makes
        cross-framework orchestration &mdash; a CrewAI crew calling a
        LangGraph agent calling a Bedrock agent &mdash; a deployment
        concern rather than an integration project. For .NET shops on
        Azure, this is now the path of least resistance.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The A2A protocol: agents talking across frameworks
      </h2>
      <p className="mb-6 leading-relaxed">
        Google announced Agent2Agent in April 2025, donated it to the
        Linux Foundation in June, and by April 2026 the project counted
        more than 150 organisations &mdash; Google, Microsoft, AWS,
        Salesforce, SAP, ServiceNow, Workday, IBM &mdash; and shipped
        native integrations in Azure AI Foundry, Amazon Bedrock
        AgentCore, and Google Cloud. A2A is now governed by the Linux
        Foundation&rsquo;s Agentic AI Foundation; v1.2 introduced signed
        Agent Cards with cryptographic domain verification. The pace and
        the membership are the story. The protocol is no longer a Google
        thing; it is the wire for cross-framework agent communication
        the way OpenTelemetry is the wire for cross-vendor traces.
      </p>
      <p className="mb-6 leading-relaxed">
        The model is simple. Every A2A-speaking agent publishes an{" "}
        <em>Agent Card</em> &mdash; a JSON document at a well-known URL
        that advertises the agent&rsquo;s name, skills, supported
        input/output modes, and the A2A endpoint URL. Clients fetch the
        card, pick the right remote agent for the task, and send work
        over JSON-RPC 2.0 on HTTP. Long-running tasks stream status
        updates back as Server-Sent Events; short ones come back as a
        single response. The transport choice is deliberate &mdash; it
        is the same shape every enterprise integration team already
        knows how to monitor.
      </p>
      <CodeBlock
        language="json"
        filename=".well-known/agent.json"
        code={`{
  "name": "Reactify Research Agent",
  "description": "Reads widely, synthesises with citations.",
  "url": "https://agents.example.com/a2a",
  "version": "1.4.0",
  "provider": { "name": "Reactify Solutions" },
  "capabilities": { "streaming": true, "pushNotifications": true },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/markdown"],
  "skills": [
    {
      "id": "research",
      "name": "Deep web research",
      "description": "Multi-source synthesis with inline citations.",
      "examples": ["Research multi-agent orchestration in 2026"]
    }
  ]
}`}
      />
      <p className="mb-6 leading-relaxed">
        Where MCP standardised how an agent reaches into tools and
        resources, A2A standardises how one agent reaches another agent
        &mdash; treating the remote agent as an opaque, capability-
        advertising endpoint rather than as a tool to be subsumed. The
        2026 pattern that has emerged on cross-team engagements is MCP
        inside the agent boundary, A2A across it. Tools, files, and
        databases move on MCP; agent-to-agent task delegation moves on
        A2A. The two protocols compose cleanly because they make
        different assumptions about what is on the other side.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How Anthropic&rsquo;s Research system actually works
      </h2>
      <p className="mb-6 leading-relaxed">
        The Research feature inside Claude is the most thoroughly
        documented production multi-agent system in the public record. A
        lead agent (Claude Opus 4) analyses the user query, develops a
        research strategy, and spawns subagents (Claude Sonnet 4) that
        explore different facets in parallel. Each subagent has its own
        context window, runs its own tool calls, returns a compressed
        summary, and is then discarded. The lead agent decides whether
        the answer is complete; if not, it spawns another wave. A final
        citation pass walks the synthesised answer and grounds every
        claim against the subagent transcripts.
      </p>
      <p className="mb-6 leading-relaxed">
        Most of the engineering work was not in the architecture; it was
        in the prompts that govern it. Early versions spawned fifty
        subagents for one-line questions, scoured the web for
        non-existent sources, and dispatched workers with briefs so
        underspecified that two of them did the same search. The fixes
        were prompt-engineering, not framework changes: explicit effort
        scaling rules in the lead agent&rsquo;s prompt (simple, direct-
        comparison, complex), strict brief templates that force the
        lead to specify objective + sources + boundaries, and a hard
        ceiling on subagent count. Anthropic budgets two to three months
        of iteration on these prompts before a multi-agent system stops
        misbehaving. We have seen the same number on client
        engagements; it is not a Claude-specific tax.
      </p>
      <p className="mb-6 leading-relaxed">
        The single optimisation with the biggest production impact was
        having the lead agent forward worker output directly to the user
        when its job was just to deliver, rather than re-summarising. On
        their benchmarks that one change accounted for roughly half the
        latency win. The general principle &mdash; do not have the
        supervisor paraphrase what the worker already wrote &mdash; is
        the cheapest performance gain in the category and the one we now
        wire on every new build.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-4 leading-relaxed">
        Four production shapes account for most of the multi-agent
        engagements we have shipped or audited since the start of 2025.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Deep research and competitive intelligence.</strong> The
          Anthropic Research pattern, but in front of a single
          enterprise&rsquo;s document store and a curated web slice. A
          supervisor parallelises across angles, subagents read sources,
          a synthesiser composes a report with citations. The wins are
          large because the task is read-heavy, the failure mode is the
          hallucinated citation, and the cost is acceptable because the
          report is the deliverable.
        </li>
        <li>
          <strong>Customer support triage and resolution.</strong> A
          lightweight triage agent classifies the ticket and hands off
          to a specialist (billing, returns, technical, escalation), each
          with its own scoped tool list and policy. The OpenAI Agents SDK
          handoff pattern was built almost exactly for this shape. The
          win is not raw resolution accuracy &mdash; a single capable
          agent gets close &mdash; it is the per-team policy isolation:
          billing tools are not reachable from the technical agent, and
          the policy can be audited per role.
        </li>
        <li>
          <strong>Content pipelines.</strong> Researcher &rarr; Drafter
          &rarr; Editor &rarr; SEO &rarr; Publisher, run as a CrewAI
          sequential crew or a straight-line LangGraph pipeline. The
          decomposition is known up front; there is no negotiation; each
          stage&rsquo;s output is the next stage&rsquo;s input. This is
          the shape that pays for itself fastest because the human
          baseline is also linear and easy to compare against.
        </li>
        <li>
          <strong>Cross-team agent integration.</strong> The shape A2A
          unlocked. The HR team&rsquo;s Workday agent and the
          finance team&rsquo;s SAP agent expose A2A endpoints; a top-
          level &ldquo;onboarding&rdquo; orchestrator queries both,
          delegates the role-specific work, and stitches the result. No
          team owns the others&rsquo; agent; each team owns its
          contract. This is the pattern enterprises started landing in
          2026 and the reason A2A&rsquo;s 150-member coalition formed in
          the first place.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where multi-agent fails: the seam problem
      </h2>
      <p className="mb-6 leading-relaxed">
        The OpenReview paper &ldquo;Why Do Multi-Agent LLM Systems
        Fail?&rdquo; published in 2025 catalogued 14 failure modes
        clustered into three families &mdash; system design issues
        (routing, resource contention), inter-agent misalignment
        (communication breakdowns, conflicting objectives), and task
        verification failures (validation, error propagation). The 28.7%
        number that keeps showing up in 2026 vendor write-ups is the
        share of multi-agent failures attributable to{" "}
        <em>context fragmentation</em>: the agent ran fine in isolation,
        the seams failed under load. The blunter industry number &mdash;
        40% of multi-agent pilots fail within six months &mdash; lines
        up with what we see in client engagements that skipped the
        single-agent baseline.
      </p>
      <p className="mb-6 leading-relaxed">
        The patterns that produce fragmentation are predictable. The
        supervisor passes the running message list rather than a scoped
        brief, so the worker inherits noise. The worker returns a full
        transcript rather than a summary, so the supervisor&rsquo;s
        context grows linearly in the number of hops and starts losing
        early-turn instructions. Two workers share a tool that mutates
        state &mdash; a database, a file, a Jira board &mdash; and
        neither sees the other&rsquo;s write. None of these are model
        problems. They are systems problems. The remediations are
        boring: structured briefs, summary-only returns, no shared
        write surface across workers in the same wave.
      </p>
      <p className="mb-6 leading-relaxed">
        Cognition&rsquo;s argument deserves a hearing on this point.
        Their post recommends a single linear agent for tasks where
        coherent decisions matter more than throughput &mdash; coding
        agents, conversational agents, anything where the final
        artefact has to be internally consistent. That is the right
        call. The mistake is treating it as a general prohibition on
        multi-agent. The 2026 synthesis is narrower: for read-heavy
        parallel work, multi-agent is the better default; for
        write-heavy coupled work, single-agent with longer context and
        explicit tool calls beats a multi-agent system that has to
        negotiate.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limitations, and the cost question
      </h2>
      <p className="mb-4 leading-relaxed">
        The trade-off chart we share with clients evaluating a
        multi-agent build:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Strengths.</strong> Parallelism on read-heavy tasks
          (Anthropic&rsquo;s 90.2% improvement is the headline number).
          Per-agent context isolation, which means each subagent runs on
          a clean window and the lead is not drowning in worker
          transcripts. Per-role policy and tool isolation, which is the
          enterprise audit story. Native cross-team composition over A2A
          without owning the other team&rsquo;s agent.
        </li>
        <li>
          <strong>Costs.</strong> Token bills run roughly fifteen times a
          standard chat session on Anthropic&rsquo;s numbers. Latency is
          worse than a single agent because each handoff is an LLM call
          plus a context switch. Observability and evals get harder
          because a trace is now a tree, not a line &mdash; the
          OpenTelemetry GenAI conventions and the platforms covered in{" "}
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            our 2026 observability piece
          </a>{" "}
          are the practical answer.
        </li>
        <li>
          <strong>Where it does not fit.</strong> Tightly coupled write
          tasks &mdash; code generation, document editing, anything where
          two agents touching the same artefact has to stay consistent
          &mdash; remain single-agent territory. Strict-budget consumer
          features rarely earn the 15x token multiplier. Anything with a
          sub-second latency SLA is going to lose on the routing hop.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends shaping the next twelve months
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>A2A as the cross-framework default.</strong> The
          150-member coalition, native cloud integrations, and the
          Linux Foundation&rsquo;s neutral governance closed the
          coordination question. Expect 2026 RFPs to start asking for
          A2A compliance the way 2023 RFPs asked for OAuth.
        </li>
        <li>
          <strong>MCP-plus-A2A inside, single agent face out.</strong>{" "}
          The pattern we now see on enterprise builds is a single
          customer-facing agent that internally orchestrates a fleet on
          A2A, while exposing MCP for tools. The user sees one assistant;
          the architecture is multi-agent.
        </li>
        <li>
          <strong>Stronger judges, cheaper workers.</strong> The
          asymmetric staffing pattern &mdash; a flagship model as the
          supervisor, a cheaper model as the worker &mdash; spreads as
          the model gap between tiers narrows. Anthropic&rsquo;s
          Opus-as-lead, Sonnet-as-worker design is the template; GPT-5
          + GPT-5-mini and Gemini-Ultra + Gemini-Flash run the same
          play.
        </li>
        <li>
          <strong>Verification as a first-class agent.</strong> The
          failure mode literature pushed every framework to ship
          explicit verifier or critic patterns. Expect the next year of
          framework releases to make a critic node the default in a
          multi-agent template.
        </li>
        <li>
          <strong>Multi-agent observability matures.</strong> Trajectory
          evaluation, span trees for multi-agent runs, and trace
          replay are now table stakes; LangSmith, Langfuse, Phoenix, and
          Braintrust all ship multi-agent-aware UIs. The
          OpenTelemetry GenAI conventions made the format portable.
        </li>
        <li>
          <strong>Convergence on supervisor + parallel fan-out as the
          house pattern.</strong> Across Anthropic, OpenAI, LangChain,
          and Microsoft&rsquo;s 2026 documentation, the orchestrator-
          with-isolated-subagents pattern is now the recommended
          default. The other patterns survive; this is the one most
          teams ship first.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: pick the pattern, then pick the framework
      </h2>
      <p className="mb-6 leading-relaxed">
        The question that drove every multi-agent build in 2024 &mdash;
        which framework? &mdash; is not the right question anymore. The
        wire format is converging on OpenTelemetry plus A2A plus MCP. The
        patterns are converging on supervisor, swarm, sequential, and
        parallel fan-out. LangGraph, the OpenAI Agents SDK, CrewAI, and
        the Microsoft Agent Framework all implement the same shapes with
        different ergonomics, and switching between them is a refactor,
        not a rewrite. The decision that drives outcomes is the
        architectural one: does the task parallelise, can the seams
        between agents be made to hold, and is the 15x token multiplier
        worth the quality gain.
      </p>
      <p className="mb-6 leading-relaxed">
        Our default on new engagements is to ship a single agent first
        with explicit tool calls and the longest context the model
        supports, then introduce a supervisor and a parallel fan-out
        only when we can point at a specific subtask the single agent
        is doing serially and would do faster or better in isolated
        windows. That ordering catches the &ldquo;multi-agent because it
        sounds modern&rdquo; failure mode before it ships, and when the
        multi-agent build does land it lands on a baseline that lets us
        measure whether it earned its cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.anthropic.com/engineering/multi-agent-research-system"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            How we built our multi-agent research system (Anthropic
            Engineering)
          </a>
          {" "}&mdash; the canonical orchestrator-worker write-up, with the
          90.2% number, the 15x token figure, and the prompt-engineering
          lessons that the rest of the field is now reusing.
        </li>
        <li>
          <a
            href="https://cognition.ai/blog/dont-build-multi-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Don&rsquo;t Build Multi-Agents (Cognition)
          </a>
          {" "}&mdash; the sharpest counter-argument, the Flappy Bird
          example, and the case for single-threaded agents in tightly
          coupled work.
        </li>
        <li>
          <a
            href="https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Announcing the Agent2Agent Protocol (Google Developers Blog)
          </a>
          {" "}&mdash; the original A2A announcement, the Agent Card
          design, and the rationale for treating remote agents as opaque
          endpoints.
        </li>
        <li>
          <a
            href="https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linux Foundation Launches the Agent2Agent Protocol Project
          </a>
          {" "}&mdash; the governance handoff and the founding member
          list. The reason A2A stopped being a Google project.
        </li>
        <li>
          <a
            href="https://blog.langchain.com/command-a-new-tool-for-multi-agent-architectures-in-langgraph/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Command: A new tool for multi-agent architectures (LangChain)
          </a>
          {" "}&mdash; the case for tool-based handoffs and the rationale
          for moving past the prebuilt supervisor library.
        </li>
        <li>
          <a
            href="https://openai.github.io/openai-agents-python/handoffs/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Handoffs (OpenAI Agents SDK)
          </a>
          {" "}&mdash; the SDK&rsquo;s reference for handoff filters,{" "}
          <code>on_handoff</code> callbacks, and structured briefs.
        </li>
        <li>
          <a
            href="https://docs.crewai.com/en/concepts/processes"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CrewAI Processes &mdash; sequential, hierarchical, consensual
          </a>
          {" "}&mdash; the framework&rsquo;s documentation for the three
          process types and how to wire a manager LLM into a hierarchy.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/agent-framework/overview/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Agent Framework overview (Microsoft Learn)
          </a>
          {" "}&mdash; the AutoGen + Semantic Kernel merger, the
          enterprise primitives, and the A2A/MCP transport story.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2503.13657"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Why Do Multi-Agent LLM Systems Fail? (arXiv)
          </a>
          {" "}&mdash; the failure-mode taxonomy that every 2026
          orchestration write-up cites.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026
          </a>
          {" "}&mdash; the orchestration framework these patterns most
          commonly land on, in depth.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Model Context Protocol in 2026
          </a>
          {" "}&mdash; the inside-the-boundary protocol that pairs with
          A2A across it.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent evaluation and observability in 2026
          </a>
          {" "}&mdash; the trajectory evaluation and span-tree tooling
          that makes multi-agent systems debuggable.
        </li>
      </ul>
    </div>
  );
}
