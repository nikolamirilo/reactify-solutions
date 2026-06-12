import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 21,
  slug: "durable-ai-agents-2026",
  title:
    "Durable AI agents in 2026: long-running workflows with Temporal, Inngest, DBOS, and Restate",
  excerpt:
    "Why durable execution became the rate-limiting layer for production agents, how Temporal, Inngest Agent Kit, DBOS, and Restate differ when you ship them, and the patterns that keep an agent alive across hours, days, and human approvals.",
  metaDescription:
    "A practical, technical guide to durable AI agents in 2026. Covers durable execution fundamentals, the deterministic-workflow split, Temporal + OpenAI Agents SDK, Inngest Agent Kit, DBOS Transact, Restate, LangGraph checkpointers, Vercel Workflow DevKit, Cloudflare Workflows, AWS Bedrock AgentCore, human-in-the-loop suspend/resume, the saga pattern, deterministic replay, and the production examples shipped by Replit, OpenAI Codex, and Cursor.",
  image: "/images/articles/article-04.jpg",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Durable Execution",
    "Temporal",
    "Inngest",
    "DBOS",
    "Restate",
    "Production",
  ],
  publishDate: "2026-06-12",
  readingTime: "16 min read",
};

export default function DurableAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        The agents that shipped in 2024 ran for thirty seconds and lost
        their state when the laptop lid closed. The agents shipping in
        2026 run for hours, pause for a human approval that lands the
        next morning, resume from a crash with the same tool-call
        history, and bill nothing while they wait. The piece of
        infrastructure underneath that change is{" "}
        <em>durable execution</em>. Replit&rsquo;s Agent 3, OpenAI&rsquo;s
        Codex web agent, and the long-running automation at Cursor all
        run on Temporal. Inngest Agent Kit, DBOS, Restate, the Vercel
        Workflow DevKit, Cloudflare Workflows, and AWS Bedrock
        AgentCore landed in 2025 around the same shape. This post is
        what the pattern actually buys, how the four serious platforms
        differ when you ship them, and the production patterns that
        decide whether your agent survives a network blip, a rate
        limit, a crashed process, or a user who closes the tab.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why durable execution became the rate-limiting layer
      </h2>
      <p className="mb-6 leading-relaxed">
        A production agent fails in shapes a request-response service
        never sees. An LLM call times out after ninety seconds and the
        eight previous tool results vanish. A tool calls a flaky
        upstream and partial work commits before the retry is wired.
        A user approval gets emailed at 5pm and answered at 9am the
        next day, with the worker pod cycled three times in between.
        A network blip during a multi-step refund leaves money moved
        but no audit row written. Each is a recoverable failure on
        paper and an irrecoverable one in a stateless process. The
        bug is not the failure; the bug is that there is nowhere to
        resume from.
      </p>
      <p className="mb-6 leading-relaxed">
        Durable execution is the programming model that fixes the
        resume-from-where problem at the language level. Every step
        in the workflow &mdash; every LLM call, every tool invocation,
        every external API request &mdash; is journaled before it
        runs and the result is journaled when it returns. If the
        process dies, the next worker replays the journal,
        reconstructing state up to the last completed step, and
        picks up from there. The model is decades old &mdash; it is
        what Temporal inherited from Uber Cadence &mdash; but 2025
        was the year the rest of the ecosystem caught up because
        agents made it unavoidable. AWS shipped Durable Functions,
        Cloudflare brought Workflows to GA, Vercel launched the
        Workflow Development Kit (WDK), and Andreessen Horowitz led
        a $300M Series D into Temporal explicitly on the AI agent
        thesis. The procurement language at most enterprise agent
        rollouts in 2026 reads &ldquo;durable by default or do not
        ship.&rdquo;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What &ldquo;durable&rdquo; actually means
      </h2>
      <p className="mb-6 leading-relaxed">
        The word covers four guarantees and it is worth naming each
        one separately, because vendor marketing flattens them.
        First, <strong>persistence</strong>: the workflow&rsquo;s
        state survives a process crash, a pod restart, a region
        failover. Second, <strong>exactly-once execution of
        side-effects</strong>: a tool call that already ran will not
        run again on replay, even if the workflow has been resumed
        ten times. Third, <strong>suspend and resume across
        arbitrary delays</strong>: the workflow can wait minutes,
        hours, or days for a signal &mdash; a human approval, a
        webhook, an external system event &mdash; without holding a
        running thread. Fourth, <strong>deterministic replay</strong>:
        the workflow code can be re-executed from the journal and
        will reach the same state, which is what lets the system
        recover and what lets you debug a production agent by
        time-travelling its history.
      </p>
      <p className="mb-6 leading-relaxed">
        Checkpointers are not durable execution. A checkpointer
        saves the workflow&rsquo;s state at points the developer
        marks and hands it back on the next run; the developer
        owns the retry, the resume, and the side-effect
        deduplication. LangGraph&rsquo;s PostgresSaver,
        DynamoDBSaver, and Redis checkpointer are excellent
        primitives for short-running agents and for the
        human-in-the-loop pause inside a longer workflow, but they
        are infrastructure for a programming model the developer
        still implements by hand. Durable execution flips it: the
        runtime owns the retry, the resume, and the dedup, and the
        developer writes ordinary code. Diagrid&rsquo;s 2025
        write-up &ldquo;Checkpoints Are Not Durable Execution&rdquo;
        is the cleanest framing of the gap; the practical version
        is that LangGraph + Temporal (or LangGraph + Restate, or
        LangGraph + DBOS) is the common production stack, not
        LangGraph alone for an agent that runs longer than a
        coffee break.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The deterministic workflow / non-deterministic LLM split
      </h2>
      <p className="mb-6 leading-relaxed">
        The architectural move that makes the whole pattern work
        is to separate the deterministic outer loop from the
        non-deterministic inner calls. The outer loop &mdash; the
        ReAct-style plan/act/observe cycle &mdash; lives in
        workflow code that must replay to the same state given the
        same journal. Every LLM call, every tool execution, every
        external HTTP request is pushed into an Activity (or Step,
        or Function, depending on the platform) whose result is
        recorded the first time it runs and looked up on every
        subsequent replay. The LLM can return whatever it wants on
        that first call; the workflow records it and treats it as
        a fixed input on every replay thereafter. Non-determinism
        is fine; it just lives behind the journal.
      </p>
      <p className="mb-6 leading-relaxed">
        The discipline this requires is small but real. Workflow
        code cannot read the system clock directly (it uses{" "}
        <code>workflow.now()</code>), cannot generate random
        numbers directly (it uses <code>workflow.uuid4()</code>),
        cannot call out to non-replayable code, and cannot rely on
        global state that changes between runs. Anything that
        breaks determinism either belongs in an Activity or
        belongs nowhere. Temporal&rsquo;s SDKs flag the violations
        at replay time; Restate&rsquo;s journaling and DBOS&rsquo;s
        decorator model surface them at compile or first-run.
        Once the rule is internalised, the code stops being
        special: the workflow is ordinary Python or TypeScript
        with a guarantee bolted on.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four platforms, side by side
      </h2>
      <p className="mb-4 leading-relaxed">
        Four serious durable-execution platforms compete for the
        agent slot in 2026. Each makes a different deployment and
        ergonomics trade-off; all four solve the core problem.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Temporal.</strong> The mature one. Open source,
          languages-of-choice SDKs (Python, TypeScript, Go, Java,
          .NET), a public preview integration with the OpenAI
          Agents SDK announced in September 2025, an official
          Google ADK plugin, deep AWS Bedrock AgentCore tie-in,
          and a public roster that includes OpenAI, Replit,
          Cursor, Lovable, and Retool. The runtime is a separate
          cluster you operate or buy as Temporal Cloud. The
          mental model is workflows-and-activities; the price is
          the cluster.
        </li>
        <li>
          <strong>Inngest Agent Kit.</strong> The
          serverless-native one. TypeScript-first, sits cleanly
          on Vercel, Cloudflare Workers, and AWS Lambda; the
          durable runtime is a managed service Inngest
          operates. Agent Kit ships first-class primitives for
          multi-agent networks, MCP tools, and a{" "}
          <code>step.ai.infer</code> step that proxies the LLM
          call so a long inference does not burn serverless
          billable seconds. The September 2025{" "}
          <code>useAgent</code> React hook streams workflow
          state directly into the browser. No cluster to
          operate; the trade-off is the managed-runtime
          dependency.
        </li>
        <li>
          <strong>DBOS Transact.</strong> The
          database-as-the-runtime one. DBOS runs as a library
          in-process and persists workflow state into Postgres
          (or any compatible relational store) with
          transactional semantics. Decorators
          (<code>@DBOS.workflow</code>, <code>@DBOS.step</code>,{" "}
          <code>@DBOS.transaction</code>) wrap ordinary
          functions; the DBOSAgent wrapper makes any Pydantic AI
          agent durable with exactly-once execution. Zero new
          infrastructure beyond your existing database; the
          trade-off is the coupling to Postgres and the smaller
          ecosystem.
        </li>
        <li>
          <strong>Restate.</strong> The lightweight, embedded
          one. Restate ships a single-binary server that
          journals invocations and lets workflows live as
          plain functions in TypeScript, Python, Java, Kotlin,
          Go, or Rust. The November 2025 integrations brought
          first-class durability to the Vercel AI SDK and
          Pydantic AI with a few lines of code each; Restate
          Cloud opened to public sign-up the same month. The
          mental model is &ldquo;your serverless function, but
          journaled&rdquo;; the price is a small piece of
          server-side state.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Two adjacent platforms matter even if they are not
        purpose-built for agents. <strong>Vercel&rsquo;s Workflow
        Development Kit</strong> (open source, public beta since
        October 2025) makes durability a language-level concept
        in TypeScript and runs on multiple worlds &mdash;
        Cloudflare, MongoDB, Redis, Turso adapters are already
        in flight. <strong>Cloudflare Workflows</strong> (GA in
        2025) is the durable runtime baked into Workers and
        does the same job for the Cloudflare-native stack.
        <strong> AWS Bedrock AgentCore</strong>, announced in
        2025, runs agents on Temporal under the hood and
        exposes the durability through the Bedrock surface.
        Five years of &ldquo;build it yourself&rdquo; collapsed
        into a category with five credible answers.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A durable agent on Temporal + OpenAI Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The September 2025 Temporal + OpenAI Agents SDK
        integration is the worked example most teams reach for
        first. The agent is defined exactly as the SDK
        documentation shows; the workflow wraps it and the
        Temporal plugin pushes each LLM call and tool call into
        an Activity. The agent loop, the planning, the tool
        selection &mdash; all unchanged. The durability is the
        wrapper.
      </p>
      <CodeBlock
        language="bash"
        filename="research_agent_workflow.py"
        code={`# Temporal workflow wrapping an OpenAI Agents SDK research agent.
# Each LLM call and each tool invocation runs as an Activity, so
# the workflow can resume from any of them on crash, network blip,
# or a 24-hour wait for human approval.

from datetime import timedelta
from temporalio import workflow
from temporalio.contrib.openai_agents import OpenAIAgentsPlugin
from agents import Agent, function_tool

@function_tool
async def fetch_paper(arxiv_id: str) -> str:
    """Fetch and extract the body of an arXiv paper."""
    # Real network call. Runs once and is journaled.
    ...

@function_tool
async def summarise_for_engineer(body: str) -> str:
    """Summarise a research paper for an engineering audience."""
    ...

research_agent = Agent(
    name="Research Agent",
    instructions="Find and summarise papers relevant to the user's question.",
    tools=[fetch_paper, summarise_for_engineer],
    model="gpt-5",
)

@workflow.defn
class ResearchWorkflow:
    @workflow.run
    async def run(self, question: str) -> str:
        # The LLM call inside .run() is executed as an Activity by the
        # OpenAIAgentsPlugin. If the worker dies between turns, the
        # next worker replays the journal up to the last completed
        # turn and continues from there.
        result = await research_agent.run(
            input=question,
            timeout=timedelta(hours=2),
        )
        # Human approval before publishing the summary. The workflow
        # suspends for as long as the human takes; zero compute is
        # billed while waiting.
        approved = await workflow.wait_condition(
            lambda: self._approval is not None,
            timeout=timedelta(days=1),
        )
        if not self._approval:
            raise workflow.ApplicationError("approval rejected")
        return result.final_output

    _approval: bool | None = None

    @workflow.signal
    def approve(self, approved: bool) -> None:
        self._approval = approved`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in the snippet do most of the work. The
        plugin wraps the agent so every LLM call and tool call
        becomes a journaled Activity; if the pod restarts
        mid-tool-call, the result is read from history rather
        than re-executed. The <code>workflow.wait_condition</code>{" "}
        is the durable suspend point &mdash; the workflow
        consumes no compute while waiting and resumes the
        instant the <code>approve</code> signal arrives. The
        timeouts (<code>hours=2</code> on the agent,{" "}
        <code>days=1</code> on the approval) are first-class to
        the runtime, not a foot-gun on top of it. The exact same
        shape, in Inngest&rsquo;s vocabulary, is{" "}
        <code>step.ai.infer</code> for the LLM,{" "}
        <code>step.waitForEvent</code> for the approval, and a
        single <code>inngest.createFunction</code> wrapper for
        the whole thing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A durable agent on Inngest Agent Kit
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent Kit is the path of least resistance for a team
        already shipping on Vercel or Cloudflare. The whole
        framework assumes a serverless runtime: every step is a
        short, retriable handler; long-running LLM calls move
        off the billable second meter through{" "}
        <code>step.ai.infer</code>; multi-agent networks are
        declared as a graph of typed agents with deterministic
        routing. The August 2025{" "}
        <a
          href="https://www.inngest.com/blog/ai-orchestration-with-agentkit-step-ai"
          className="font-semibold text-primaryColor hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          AgentKit + step.ai announcement
        </a>{" "}
        is the canonical starting reference; the Online-Mind2Web
        and Browser Use integrations landed shortly after.
      </p>
      <CodeBlock
        language="typescript"
        filename="support_triage_network.ts"
        code={`// A two-agent network on Inngest Agent Kit. A classifier agent
// reads the ticket; a triage agent picks an action; the function
// is durable across both calls, the tool, and the human approval.

import { createAgent, createNetwork, openai } from "@inngest/agent-kit";
import { inngest } from "./client";

const classifier = createAgent({
  name: "classifier",
  system: "Classify the ticket as billing, technical, or other.",
  model: openai({ model: "gpt-5" }),
});

const triage = createAgent({
  name: "triage",
  system: "Decide on next action. Use tools where helpful.",
  model: openai({ model: "gpt-5" }),
  tools: [refundTool, scheduleCallTool],
});

const network = createNetwork({
  agents: [classifier, triage],
  router: ({ network }) =>
    network.state.lastAgent === undefined ? classifier : triage,
});

export const handleTicket = inngest.createFunction(
  { id: "handle-support-ticket" },
  { event: "ticket/received" },
  async ({ event, step }) => {
    // Each agent run is journaled; a crash mid-network resumes from
    // the last completed turn, not from the start.
    const result = await network.run(event.data.ticket);

    // High-impact actions wait for human approval, durably.
    if (result.proposedAction === "refund") {
      const decision = await step.waitForEvent("wait-approve", {
        event: "refund/approved",
        timeout: "3d",
        match: "data.ticketId",
      });
      if (!decision) throw new Error("approval timed out");
    }

    // The actual side effect runs as its own step so it is
    // retried-with-deduplication on partial failure.
    await step.run("apply-action", () => applyAction(result));
    return result.summary;
  },
);`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A durable agent on DBOS Transact
      </h2>
      <p className="mb-6 leading-relaxed">
        DBOS keeps the runtime out of the picture and puts the
        journal in your existing Postgres. The mental model is
        decorators on ordinary functions: a workflow is a
        function, a step is a function, a transaction is a
        function. The native Pydantic AI integration is the
        cleanest example because it adds a single wrapper to an
        agent you already shipped.
      </p>
      <CodeBlock
        language="bash"
        filename="dbos_pydantic_agent.py"
        code={`# A durable Pydantic AI agent backed by DBOS. The workflow
# survives crashes by replaying from the Postgres-backed
# journal; each tool call is exactly-once.

from dbos import DBOS
from dbos.pydantic_ai import DBOSAgent
from pydantic_ai import Agent, RunContext

DBOS()  # connects to Postgres via env var or config

agent = Agent(
    "openai:gpt-5",
    system_prompt="You are a billing-support agent.",
)

@agent.tool
async def issue_refund(ctx: RunContext, order_id: str, cents: int) -> str:
    # Wrapping the side-effect tool in a @DBOS.transaction guarantees
    # the refund row is committed atomically with the journal entry.
    return await refund_via_stripe(order_id, cents)

durable_agent = DBOSAgent(agent)

@DBOS.workflow()
async def handle_refund_request(order_id: str) -> str:
    # If the worker dies between the agent.run() and the email,
    # the next worker replays up to the last completed step and
    # continues. The refund does not double-fire.
    result = await durable_agent.run(
        f"Process the refund for order {order_id} if eligible."
    )
    await DBOS.step(send_confirmation_email)(order_id, result.output)
    return result.output`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A durable agent on Restate
      </h2>
      <p className="mb-6 leading-relaxed">
        Restate&rsquo;s shape is the closest to &ldquo;your
        serverless function with a memory.&rdquo; The runtime is
        a single binary that journals invocations; the SDK
        wraps ordinary handlers so retries, suspends, and
        signals fall out of the framework. The Pydantic AI and
        Vercel AI SDK integrations released in November 2025
        bring the durability to Python and TypeScript without
        rewriting the agent loop.
      </p>
      <CodeBlock
        language="typescript"
        filename="restate_agent.ts"
        code={`// A durable agent service on Restate, using the Vercel AI SDK.
// The service handler is journaled; each tool call and LLM call
// is a durable step that can be replayed safely on recovery.

import * as restate from "@restatedev/restate-sdk";
import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const agentService = restate.service({
  name: "research-agent",
  handlers: {
    research: async (ctx: restate.Context, question: string) => {
      // ctx.run is the durable step boundary. The LLM call runs once;
      // on replay, the result is read from the journal.
      const result = await ctx.run("plan-and-answer", () =>
        generateText({
          model: openai("gpt-5"),
          tools: {
            searchPapers: tool({
              description: "Search arXiv for relevant papers",
              parameters: z.object({ query: z.string() }),
              execute: async ({ query }) =>
                ctx.run("search", () => searchPapers(query)),
            }),
          },
          prompt: question,
        }),
      );

      // Suspend the workflow until a human approves. The handler is
      // unloaded from memory; on signal, Restate rehydrates it.
      const approved = await ctx.awakeable<boolean>();

      if (!approved.promise) {
        throw new restate.TerminalError("approval rejected");
      }
      return result.text;
    },
  },
});

restate.endpoint().bind(agentService).listen();`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Human-in-the-loop, the suspend / signal primitive
      </h2>
      <p className="mb-6 leading-relaxed">
        Production agents need humans for the high-stakes
        actions: a refund over a threshold, a code merge, a
        legal redline, a contract signature. The mechanism is
        the same on every platform &mdash; the workflow
        suspends until a signal arrives. Temporal calls it{" "}
        <code>workflow.wait_condition</code> with a{" "}
        <code>@workflow.signal</code>. Inngest calls it{" "}
        <code>step.waitForEvent</code>. Restate calls it an{" "}
        <em>awakeable</em>. LangGraph calls it{" "}
        <code>interrupt()</code> and a{" "}
        <code>Command(resume=&hellip;)</code>. The shape is the
        same: workflow blocks, runtime persists state, external
        UI surfaces the pending decision, signal arrives,
        workflow resumes with the decision in scope.
      </p>
      <p className="mb-6 leading-relaxed">
        Two engineering details matter in production. The
        signal must be idempotent: the same approval delivered
        twice must not double-resume the workflow. Every
        platform handles this through a deduplication key on
        the signal &mdash; Temporal&rsquo;s signal ID,
        Inngest&rsquo;s <code>match</code>, Restate&rsquo;s
        awakeable ID. The second detail is the timeout: a
        human-in-the-loop with no upper bound is a leak. Set a
        deadline (24 hours, 3 days, a week), define the
        escalation path (a fallback approver, an automatic
        reject, a notification), and treat the deadline as
        part of the workflow contract. The bug we have seen
        most often on client engagements is the workflow that
        waits forever because nobody owned the escalation.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sagas, compensating actions, and the partial-failure
        problem
      </h2>
      <p className="mb-6 leading-relaxed">
        The saga pattern is older than agents and is exactly
        the right pattern for a multi-step agent that mutates
        external systems. A saga is a sequence of forward
        steps each paired with a compensating action; if any
        step fails or the workflow is told to roll back, the
        compensations of the already-completed steps run in
        reverse. Durable execution platforms make sagas
        cheap: the journal records which forward steps
        completed, so the compensation pass is mechanical.
      </p>
      <CodeBlock
        language="bash"
        filename="saga_pattern.py"
        code={`# Temporal saga for a multi-step refund agent. If any step fails
# after the first, the compensations run in reverse from the
# journal. Nothing partial commits.

@workflow.defn
class RefundSaga:
    @workflow.run
    async def run(self, order_id: str, cents: int) -> str:
        compensations = []
        try:
            hold = await workflow.execute_activity(
                place_inventory_hold, order_id, schedule_to_close_timeout=timedelta(seconds=30),
            )
            compensations.append((release_inventory_hold, hold))

            refund = await workflow.execute_activity(
                refund_payment, order_id, cents, schedule_to_close_timeout=timedelta(seconds=60),
            )
            compensations.append((void_refund, refund))

            await workflow.execute_activity(
                send_refund_email, order_id, schedule_to_close_timeout=timedelta(seconds=10),
            )
            return refund.id
        except Exception as e:
            # Compensations run in reverse, journaled the same way as
            # forward steps. A crash mid-rollback resumes mid-rollback.
            for action, payload in reversed(compensations):
                await workflow.execute_activity(
                    action, payload, schedule_to_close_timeout=timedelta(seconds=30),
                )
            raise e`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Streaming workflow state to the user
      </h2>
      <p className="mb-6 leading-relaxed">
        A long-running agent is invisible without a UI. The
        2025 pattern that landed across the platforms is to
        stream workflow state directly to the browser:
        Inngest&rsquo;s September 2025 <code>useAgent</code>{" "}
        React hook is the cleanest example, with the durable
        function on the server and a React hook on the client
        subscribed to the run&rsquo;s state. Temporal exposes
        the equivalent through workflow queries (the client
        asks the running workflow for its current state) and
        the long-poll API. Restate has a streaming completion
        endpoint; LangGraph has{" "}
        <code>graph.astream_events</code>. The product reads
        the same: the user sees the agent thinking, sees the
        approval prompt, sees the final answer, all backed by
        the durable execution model that survives any
        intermediate failure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world deployments in 2025&ndash;2026
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>OpenAI Codex web agent.</strong> The
          long-running coding agent behind the Codex web
          surface runs on Temporal. Each conversation is a
          workflow that can stretch across an entire
          engineering task, with the LLM calls, tool calls,
          and human approvals all journaled. The same
          infrastructure underpins the September 2025
          public-preview Temporal + OpenAI Agents SDK
          integration that lets every Agents SDK customer
          get the same guarantees.
        </li>
        <li>
          <strong>Replit Agent 3.</strong> Replit migrated
          their popular coding agent to Temporal and shipped
          the long-running Agent 3 on the same control
          plane. The published Replit case study calls out
          the &ldquo;ability to free up the platform team to
          work on features instead of reliability&rdquo; as
          the load-bearing benefit, with the workflow
          replay model removing entire classes of partial
          failure from the on-call rotation.
        </li>
        <li>
          <strong>Cursor.</strong> Long-running agentic
          features in Cursor &mdash; the multi-file edit
          flows, the background task agents &mdash; ship on
          the same durable foundation. The pattern is
          consistent: the agent loop is workflow code, the
          model call is an Activity, the editor state is
          synced through queries.
        </li>
        <li>
          <strong>Enterprise customer support and
          BPO.</strong> The biggest production volume on
          DBOS, Inngest, and Restate is the
          three-to-fifteen-minute customer support agent
          that has to call CRM, billing, and shipping
          systems durably. The shape is consistent: the
          inbound ticket starts a workflow, the agent
          plans, each tool call is journaled, an approval
          is required for refunds over a threshold, the
          resolution is written to the CRM transactionally
          with the journal close.
        </li>
        <li>
          <strong>Research and analyst agents.</strong>{" "}
          Long-horizon agents that read across hundreds of
          documents and produce a brief over hours. The
          durable pattern is the only one that survives
          the rate limits, partial network failures, and
          human review cycles that a multi-hour research
          run inevitably touches.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The shared lesson across the deployments is that
        the agent stopped being the hard part. The hard
        parts are the dead-letter queue, the replay, the
        approval, the audit log, the partial-failure
        recovery. The durable runtime moves all five into a
        primitive the developer gets for free.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>What you buy.</strong> Resumability across
          crashes, exactly-once side-effects under retry,
          arbitrary-duration human approvals without holding
          compute, deterministic replay for production
          debugging, audit-grade history for compliance,
          horizontal scale across workers. The combination
          shifts agent reliability from &ldquo;mostly
          works&rdquo; to &ldquo;survives the failure modes
          we know about.&rdquo;
        </li>
        <li>
          <strong>What you pay.</strong> A new mental model
          (deterministic workflow code, non-deterministic
          activities), a small piece of platform you either
          self-host or pay for, and the discipline of
          journaling. Temporal and Restate carry an
          operational footprint; Inngest and DBOS lean on
          managed runtimes or your existing database. None
          of them is free; all of them are cheaper than
          rebuilding the primitives.
        </li>
        <li>
          <strong>Where it does not fit.</strong> Single-
          turn chatbots, evaluation harnesses, prototypes
          on synthetic data, and any agent that lives
          inside a single request and exits in under
          thirty seconds. The pattern earns its keep when
          the workflow crosses a process boundary, an
          approval boundary, or a multi-minute external
          call. Below that line, a checkpointer plus a
          retry decorator is enough.
        </li>
        <li>
          <strong>The lock-in question.</strong> Workflow
          code is platform-specific. The shape is
          portable &mdash; the saga, the suspend/resume,
          the journaled steps &mdash; but the SDK is not.
          Restate and the Vercel WDK are pushing on the
          portability story; in practice teams pick one
          platform per agent and live with the choice.
          The good news is that the agent loop and the
          tool definitions usually port cleanly; only the
          orchestration wrapper changes.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends shaping the next twelve months
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Durability becomes the default in the
          framework SDKs.</strong> The Temporal + OpenAI
          Agents SDK integration, the Restate + Vercel AI
          SDK integration, the DBOS + Pydantic AI wrapper,
          and the Inngest Agent Kit primitives all landed
          in a single twelve-month window. The frame is
          shifting from &ldquo;you write a durable
          wrapper&rdquo; to &ldquo;the wrapper is
          included.&rdquo;
        </li>
        <li>
          <strong>Cloud-platform native durability.</strong>{" "}
          AWS Durable Functions, Cloudflare Workflows GA,
          Vercel WDK in public beta. The hyperscalers are
          adding the primitive to their existing function
          runtimes, which lowers the floor for teams that
          do not want a separate cluster. The Temporal /
          Restate / DBOS layer becomes the choice for the
          features the hyperscaler runtimes do not yet
          cover (cross-language SDKs, cross-cloud
          portability, deeper saga support, queries and
          updates).
        </li>
        <li>
          <strong>Deterministic replay as the agent
          debugger.</strong> The 2025&ndash;2026 pattern
          for debugging an agent that misbehaved in
          production is to pull its workflow history,
          replay it locally with new code, and watch the
          decision change. Braintrust, LangSmith,
          Temporal&rsquo;s own Conductor, and DBOS
          Conductor all expose the replay primitive in
          their UIs. The shift from log diving to
          time-travel debugging is permanent.
        </li>
        <li>
          <strong>Agent identity, tool authentication,
          and durability converge.</strong> Per-agent
          OAuth scopes, signed tool descriptions, and
          journaled tool invocations meet in the same
          place: the activity boundary. The durable
          runtime is becoming the natural choke point
          for both reliability and identity enforcement.
        </li>
        <li>
          <strong>Procurement criterion.</strong>{" "}
          Enterprise security and reliability teams are
          starting to require durable execution as the
          baseline for any agent that touches external
          systems. The 2026 RFP question is no longer
          &ldquo;how does your agent handle a 90-second
          LLM timeout&rdquo;; it is &ldquo;which durable
          runtime, and what is the replay story.&rdquo;
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to choose what
      </h2>
      <p className="mb-6 leading-relaxed">
        Our default on a new agent build is shaped by the
        runtime constraint, not the framework preference.
        Polyglot team and an existing operational practice
        for a separate cluster: <strong>Temporal</strong> is
        the safe pick, especially with the OpenAI Agents
        SDK plugin and the AWS Bedrock AgentCore tie-in.
        TypeScript-first team on Vercel or Cloudflare with
        no appetite for new infrastructure:{" "}
        <strong>Inngest Agent Kit</strong> or the{" "}
        <strong>Vercel WDK</strong> &mdash; Agent Kit if the
        agent primitives matter, WDK if the team wants a
        thinner abstraction. Python team that already runs
        on Postgres and wants zero new infrastructure:{" "}
        <strong>DBOS</strong> with the Pydantic AI wrapper.
        Lightweight runtime, multiple languages, and a
        preference for keeping the journal close to the
        function: <strong>Restate</strong>. LangGraph as
        the agent framework and an existing checkpointer
        backend: pair LangGraph with one of the four for
        the durability, do not rely on the checkpointer
        alone for anything longer than a coffee break.
      </p>
      <p className="mb-6 leading-relaxed">
        The thing to internalise is that the choice between
        platforms is much smaller than the choice between
        &ldquo;durable execution&rdquo; and &ldquo;hope the
        process stays up.&rdquo; Any of the four buys you
        the same architectural guarantees. The platforms
        differ on operational footprint, language coverage,
        and ecosystem; they agree on the shape of the
        answer. Pick one, ship the agent, write the
        replay story into the runbook, and revisit the
        platform choice when it actively blocks something.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the agent loop is not the hard part
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent frameworks shipped enough abstractions in
        2024&ndash;2025 that the planning loop is no longer
        where teams get stuck. The wall they hit is the
        operational one: the agent dies mid-run, the
        approval lands a day late, the upstream API rate-limits
        on the third retry, the partial side-effect leaves
        the audit log inconsistent. Durable execution puts a
        primitive under all of those failures and lets the
        developer write the agent as if none of them
        existed. The decision to make in 2026 is which
        durable runtime your agent sits on; the decision not
        to make is whether durability is worth the cost. The
        teams shipping the long-running agents have already
        priced it in, and the gap to the teams that have
        not is widening as the workloads do.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://temporal.io/blog/announcing-openai-agents-sdk-integration"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Production-ready agents with the OpenAI Agents
            SDK + Temporal
          </a>
          {" "}&mdash; the September 2025 public-preview
          announcement and the worked Python example.
        </li>
        <li>
          <a
            href="https://temporal.io/blog/of-course-you-can-build-dynamic-ai-agents-with-temporal"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Of course you can build dynamic AI agents with
            Temporal
          </a>
          {" "}&mdash; the cleanest explanation of the
          deterministic-loop / non-deterministic-activity
          split.
        </li>
        <li>
          <a
            href="https://www.inngest.com/blog/durable-execution-key-to-harnessing-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Durable Execution: The Key to Harnessing AI
            Agents in Production (Inngest)
          </a>
          {" "}&mdash; the case for durability as the
          rate-limiting layer for production agents.
        </li>
        <li>
          <a
            href="https://agentkit.inngest.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inngest Agent Kit documentation
          </a>
          {" "}&mdash; the framework reference, including
          multi-agent networks, <code>step.ai.infer</code>,
          and the <code>useAgent</code> React hook.
        </li>
        <li>
          <a
            href="https://www.dbos.dev/blog/durable-execution-crashproof-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Durable Execution for Building Crashproof AI
            Agents (DBOS)
          </a>
          {" "}&mdash; the database-as-the-runtime model
          and the Pydantic AI / LlamaIndex / OpenAI Agents
          SDK integrations.
        </li>
        <li>
          <a
            href="https://pydantic.dev/articles/restate-durable-execution-pydanticai"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Build durable agents with Restate and Pydantic
            AI
          </a>
          {" "}&mdash; the November 2025 integration and a
          worked durable-agent example.
        </li>
        <li>
          <a
            href="https://www.restate.dev/blog/building-durable-agents-with-vercel-and-restate"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building Durable AI Agents with Restate +
            Vercel AI SDK
          </a>
          {" "}&mdash; the matched TypeScript integration
          for the Vercel AI SDK.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/introducing-workflow"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing the Vercel Workflow Development Kit
          </a>
          {" "}&mdash; the open-source TypeScript-native
          durability SDK and the multi-runtime &ldquo;world
          adapter&rdquo; story.
        </li>
        <li>
          <a
            href="https://docs.langchain.com/oss/python/langgraph/persistence"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph persistence documentation
          </a>
          {" "}&mdash; the checkpointer model, durability
          modes (sync/async/exit), and the
          interrupt/Command primitive.
        </li>
        <li>
          <a
            href="https://www.diagrid.io/blog/checkpoints-are-not-durable-execution-why-langgraph-crewai-google-adk-and-others-fall-short-for-production-agent-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Checkpoints Are Not Durable Execution
            (Diagrid)
          </a>
          {" "}&mdash; the cleanest framing of the gap
          between framework checkpointers and a true
          durable runtime.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/apn/how-temporal-uses-amazon-bedrock-agentcore-to-create-robust-ai-systems/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AgentCore and Temporal: Orchestrating
            Intelligent Agents at Scale (AWS APN)
          </a>
          {" "}&mdash; the AWS Bedrock AgentCore tie-in
          and the production architecture.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph for production agents in 2026
          </a>
          {" "}&mdash; the agent-framework piece this
          article pairs with on the checkpointer side.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}&mdash; the network-of-agents patterns that
          map naturally onto durable workflows.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}&mdash; the replay and trace tooling that
          deterministic durable execution makes possible.
        </li>
      </ul>
    </div>
  );
}
