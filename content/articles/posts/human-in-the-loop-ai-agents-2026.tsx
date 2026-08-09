import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "human-in-the-loop-ai-agents-2026",
  title:
    "Human-in-the-loop AI agents in production 2026: approval flows, interrupts, and the operational layer that keeps agents shippable",
  excerpt:
    "Why every serious agent in production has a human on the other end of at least one tool call, how LangGraph interrupts, Temporal signals, Inngest waitForEvent, MCP require_approval, and HumanLayer solve the same problem in different shapes, and the design rules that keep approval flows useful past the first week.",
  metaDescription:
    "A practical, technical guide to human-in-the-loop (HITL) AI agents in 2026. Covers LangGraph interrupts and the Command resume, Temporal Signals for durable HITL, Inngest waitForEvent, MCP require_approval, Anthropic's up-front plan approval in Claude Desktop, HumanLayer for Slack/SMS/email routing, confirmation fatigue, timeout and escalation strategies, audit and compliance requirements, and the production patterns we ship on client engagements.",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Human-in-the-loop",
    "HITL",
    "LangGraph",
    "Temporal",
    "Inngest",
    "MCP",
    "HumanLayer",
    "Production",
  ],
  publishDate: "2026-07-26",
  readingTime: "15 min read",
};

export default function HumanInTheLoopAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Every AI agent that ships to real users hits the
        same wall on the same day: the model is about to
        do something a human should sign off on first.
        Send an email, run a SQL update, refund a
        customer, deploy a change, book a flight. The
        model does not know the blast radius, and even if
        it did, the org would still want a human name on
        the decision. Human-in-the-loop, or HITL, is the
        pattern that turns an autonomous agent into a
        collaborator you can put in front of a paying
        customer. This post is the version of HITL we
        actually run in production - the frameworks that
        do the plumbing, the design mistakes we have made
        and stopped making, and the operational layer
        that keeps the approvals meaningful past the
        first week.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why HITL is now a first-class agent primitive
      </h2>
      <p className="mb-6 leading-relaxed">
        Two years ago, human-in-the-loop was a bolt-on. A
        Slack webhook, a form, a manually-written pause.
        In 2026 it is a primitive in every serious agent
        framework because two things went wrong when
        teams tried to skip it. First, agent quality got
        good enough to run on real work, which means the
        wrong action started to have real
        consequences - the &ldquo;oops, we emailed the
        90% discount code to the whole database&rdquo;
        class of failure. Second, the regulated
        industries (finance, health, legal, government)
        started buying agents in volume, and none of
        them will accept a system where a model can act
        without an audit trail.
      </p>
      <p className="mb-6 leading-relaxed">
        Anthropic put the design view in their July 2025
        &ldquo;Trustworthy agents in practice&rdquo;
        post: users configure per-tool permissions
        (always allow, needs approval, block), and the
        agent shows an up-front plan the human approves
        as a whole before anything runs. The design
        choice is not accidental. Per-tool-call approval
        alone burns the user out (they call it
        &ldquo;confirmation fatigue&rdquo;); plan-level
        approval alone gives no chance to catch a
        specific bad call. Real HITL is both.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four shapes HITL takes in production
      </h2>
      <p className="mb-6 leading-relaxed">
        On client engagements we see the same four
        shapes over and over. They are not exclusive - a
        real product usually uses two or three of them
        for different tools - but naming them keeps the
        design conversation honest.
      </p>
      <CodeBlock
        language="bash"
        filename="The four HITL patterns"
        code={`+----------------------------+   +----------------------------+
| 1. UP-FRONT PLAN APPROVAL  |   | 2. PER-STEP GATE           |
|                            |   |                            |
|  user asks for X           |   |  agent proposes a tool     |
|      |                     |   |  call                      |
|      v                     |   |      |                     |
|  agent drafts a plan       |   |      v                     |
|      |                     |   |  is tool in the "risky"    |
|      v                     |   |  set?                      |
|  human reviews plan        |   |    yes / no                |
|    approve / edit / reject |   |      |     \\               |
|      |                     |   |      v      v              |
|      v                     |   |  ask human   run           |
|  agent executes            |   |  approve/    directly      |
|                            |   |  reject                    |
+----------------------------+   +----------------------------+

+----------------------------+   +----------------------------+
| 3. REVIEW-AFTER-DRAFT      |   | 4. ESCALATION ON FAILURE   |
|                            |   |                            |
|  agent produces a draft    |   |  agent tries a tool        |
|      |                     |   |      |                     |
|      v                     |   |      v                     |
|  human edits or approves   |   |  succeeded? confidence?    |
|      |                     |   |    ok / not ok             |
|      v                     |   |      |     \\               |
|  agent commits             |   |      v      v              |
|                            |   |  proceed   escalate to     |
|                            |   |            human queue     |
+----------------------------+   +----------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Every product ends up with a mix. A customer
        support agent might use plan approval when the
        query is complex, per-step gates on refund
        actions, review-after-draft on email replies,
        and escalation-on-failure when confidence drops.
        The trick is picking the right pattern per tool,
        not picking one pattern for the whole agent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LangGraph interrupts: the reference in-process
        pattern
      </h2>
      <p className="mb-6 leading-relaxed">
        LangGraph made HITL a first-class citizen with
        the <code>interrupt()</code> function and the
        <code>Command(resume=...)</code> primitive. The
        framework was built around a checkpointer, so
        pausing the graph is just pausing between nodes:
        the state is already persisted, and resuming
        walks the graph from the exact same point with
        the human&rsquo;s input injected. It is the
        cleanest developer story we have used for
        in-process approvals.
      </p>
      <CodeBlock
        language="python"
        filename="src/hitl/langgraph_approval.py"
        code={`from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.types import interrupt, Command
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    proposed_action: dict
    approved: bool

RISKY_TOOLS = {"send_email", "run_sql", "refund", "delete"}

def plan_node(state):
    resp = llm.invoke(state["messages"] + [system_prompt])
    return {"messages": [resp], "proposed_action": resp.tool_call}

def approval_gate(state):
    action = state["proposed_action"]
    if action["name"] not in RISKY_TOOLS:
        return {"approved": True}
    decision = interrupt({
        "type": "approval_request",
        "tool": action["name"],
        "args": action["args"],
        "reason": action.get("reason"),
    })
    return {"approved": bool(decision.get("approved"))}

def execute_node(state):
    if not state["approved"]:
        return {"messages": [
            {"role": "tool",
             "content": "Rejected by reviewer."}
        ]}
    result = run_tool(state["proposed_action"])
    return {"messages": [{"role": "tool", "content": result}]}

checkpointer = PostgresSaver.from_conn_string(DB_URL)
graph = StateGraph(AgentState)
graph.add_node("plan", plan_node)
graph.add_node("approve", approval_gate)
graph.add_node("execute", execute_node)
graph.set_entry_point("plan")
graph.add_edge("plan", "approve")
graph.add_edge("approve", "execute")
graph.add_edge("execute", END)
app = graph.compile(checkpointer=checkpointer)

# --- Run and pause ------------------------------------------------
config = {"configurable": {"thread_id": "task-123"}}
app.invoke({"messages": [user_msg]}, config)
# The graph is paused at the interrupt. Some external UI reads the
# pending state and prompts a human.

state = app.get_state(config)
if state.next:  # non-empty means we are stopped at an interrupt
    pending = state.tasks[0].interrupts[0].value
    send_to_reviewer(pending)

# --- Resume after human decision ----------------------------------
app.invoke(Command(resume={"approved": True}), config)`}
      />
      <p className="mb-6 leading-relaxed">
        Three lessons from client runs. First, always
        use a durable checkpointer (Postgres or a
        managed backend). The in-memory one is fine in
        dev and dangerous in prod because a process
        restart drops every paused run. Second, pass a
        stable <code>thread_id</code> per task and store
        it in your business database. That id is the
        anchor for the entire life of the run - the
        Slack message, the audit row, the reviewer link,
        the resume call. Third, keep the interrupt
        payload small and self-describing. The reviewer
        sees only the JSON you pass; hide the rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Temporal Signals: the reference for durable HITL
      </h2>
      <p className="mb-6 leading-relaxed">
        For long-running agents where the human may take
        hours or days to respond, an in-process pause is
        the wrong shape. The process holding the state
        cannot stay up forever, and rebuilding it after a
        crash is expensive. Temporal is the model most
        durable-execution teams reach for. A Signal is a
        typed message you can send into a running
        Workflow at any time; the Workflow can
        <code>await</code> a Signal the same way it awaits
        an Activity. HITL becomes a Signal handler on the
        workflow class.
      </p>
      <CodeBlock
        language="python"
        filename="src/hitl/temporal_workflow.py"
        code={`from datetime import timedelta
from typing import Optional
from dataclasses import dataclass
from temporalio import workflow

@dataclass
class ApprovalDecision:
    approved: bool
    reviewer: str
    reason: Optional[str] = None

@workflow.defn
class HumanApprovedAgent:
    def __init__(self):
        self.decision: Optional[ApprovalDecision] = None
        self.pending_id: Optional[str] = None

    @workflow.signal
    async def receive_decision(self, decision: ApprovalDecision):
        self.decision = decision

    @workflow.run
    async def run(self, task: dict) -> dict:
        # 1. Draft the proposed action with an LLM Activity.
        proposal = await workflow.execute_activity(
            draft_action,
            task,
            start_to_close_timeout=timedelta(minutes=2),
        )

        # 2. Notify the human. Idempotent - notify Activity is safe
        #    to retry.
        self.pending_id = f"{workflow.info().workflow_id}:1"
        await workflow.execute_activity(
            notify_reviewer,
            NotifyRequest(id=self.pending_id, proposal=proposal),
            start_to_close_timeout=timedelta(seconds=30),
        )

        # 3. Wait up to 24 hours for a signal. If nothing arrives,
        #    escalate.
        try:
            await workflow.wait_condition(
                lambda: self.decision is not None,
                timeout=timedelta(hours=24),
            )
        except TimeoutError:
            await workflow.execute_activity(
                escalate,
                self.pending_id,
                start_to_close_timeout=timedelta(seconds=30),
            )
            await workflow.wait_condition(
                lambda: self.decision is not None
            )

        # 4. Execute or bail out.
        if self.decision.approved:
            return await workflow.execute_activity(
                execute_action,
                proposal,
                start_to_close_timeout=timedelta(minutes=5),
            )
        return {"status": "rejected", "reason": self.decision.reason}`}
      />
      <p className="mb-6 leading-relaxed">
        The point of the Temporal version is not that it
        is shorter than the LangGraph one (it is not).
        It is that the workflow can survive worker
        restarts, deployments, and multi-day waits with
        no extra code. The Signal handler is durable.
        The wait condition is durable. The retries and
        the timeouts are the platform&rsquo;s
        responsibility. For agents that live inside a
        business process (contract lifecycle, onboarding,
        legal review), that trade is worth every extra
        line of infrastructure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Inngest waitForEvent: the reference for
        Node.js/serverless
      </h2>
      <p className="mb-6 leading-relaxed">
        In the JavaScript/TypeScript world, Inngest is
        the equivalent. Its <code>step.waitForEvent</code>{" "}
        primitive is exactly the shape you want: pause
        the function on an event, keep no compute
        running, resume when the matching event arrives
        or the timeout fires. It ports cleanly to
        Vercel, Cloudflare Workers, and any serverless
        runtime.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/hitl/inngest_agent.ts"
        code={`import { inngest } from "./client";

const APPROVAL_REQUIRED = new Set([
  "send_email", "run_sql", "refund", "delete_record",
]);

export const agentWithApproval = inngest.createFunction(
  { id: "agent-with-approval" },
  { event: "agent/task.received" },
  async ({ event, step }) => {
    const messages = [{ role: "user", content: event.data.task }];

    for (let i = 0; i < 20; i++) {
      const llm = await step.run("think", () =>
        callLLM(messages, tools),
      );

      if (!llm.toolCalls.length) {
        return { response: llm.text, iterations: i };
      }

      for (const tc of llm.toolCalls) {
        if (APPROVAL_REQUIRED.has(tc.name)) {
          const approvalId = \`\${event.data.taskId}-\${i}-\${tc.name}\`;

          await step.run(\`ask-\${approvalId}\`, () =>
            postSlackApproval({
              channel: "#agent-approvals",
              approvalId,
              tool: tc.name,
              args: tc.arguments,
            }),
          );

          const approval = await step.waitForEvent(
            \`wait-\${approvalId}\`,
            {
              event: "agent/approval.response",
              match: "data.approvalId",
              timeout: "4h",
            },
          );

          if (!approval?.data.approved) {
            messages.push({
              role: "tool",
              content: \`Rejected. Reason: \${
                approval?.data.reason ?? "timeout"
              }. Try a different approach.\`,
            });
            continue;
          }
        }

        const result = await step.run(\`tool-\${tc.name}\`, () =>
          executeTool(tc.name, tc.arguments),
        );
        messages.push({ role: "tool", content: result });
      }
    }
    return { status: "max_iterations" };
  },
);`}
      />
      <p className="mb-6 leading-relaxed">
        The key move that turns Inngest into a good
        agent harness is wrapping the whole tool loop in
        one function and using <code>step.run</code>{" "}
        around each LLM and tool call. That gives every
        call retries, memoisation on replay, and a full
        step-by-step timeline. The
        <code>waitForEvent</code> is the HITL primitive;
        the <code>step.run</code> around it makes the
        rest of the agent durable enough that the human
        can take a day to reply without breaking
        anything.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP require_approval: the standard at the tool
        boundary
      </h2>
      <p className="mb-6 leading-relaxed">
        The Model Context Protocol (MCP) makes HITL a
        contract at the tool boundary. Each MCP tool
        exposes a <code>require_approval</code> setting
        of <code>&quot;always&quot;</code>,{" "}
        <code>&quot;never&quot;</code>, or a callback the
        client evaluates per call. Claude Desktop, Claude
        Code, Cursor, and the OpenAI Responses API all
        honour this shape (with per-client wrinkles). It
        is not a full framework, but it is the closest
        we have to a shared HITL standard across
        vendors.
      </p>
      <CodeBlock
        language="json"
        filename="mcp/config.json (client side)"
        code={`{
  "mcpServers": {
    "internal-crm": {
      "command": "node",
      "args": ["./crm-mcp-server.js"],
      "toolPermissions": {
        "search_lead":     { "require_approval": "never"  },
        "read_lead":       { "require_approval": "never"  },
        "update_lead":     { "require_approval": "always" },
        "email_lead":      { "require_approval": "always" },
        "delete_lead":     { "require_approval": "always" }
      }
    }
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        In production the honest read on MCP HITL today
        is that the primitive works but the surface is
        fragmented. There is no standard{" "}
        <code>approval/request</code> message in the spec
        yet (there is a live GitHub issue for it), so
        every client renders approvals differently -
        Claude Desktop shows an inline card, Claude Code
        shows a terminal prompt, and third-party clients
        do whatever they want. The practical rule we use:
        set <code>require_approval</code> at the server
        for anything that mutates state, but do not
        assume every client will render it the same way.
        Where the UX matters (a paying customer is
        watching), wrap the tool in your own approval
        flow rather than trusting the client to be
        consistent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        HumanLayer and the &ldquo;approvals as a
        service&rdquo; layer
      </h2>
      <p className="mb-6 leading-relaxed">
        HumanLayer, PetaMCP, and Preloop are the
        specialists in this space in 2026. They ship a
        decorator (Python or TypeScript) that wraps any
        function, publishes a message to Slack, SMS, or
        email when the function is called, and blocks
        until a reviewer responds. They handle the
        routing, the escalation, the audit log, and the
        replay UI. For teams that do not want to build a
        review dashboard from scratch, this is the
        shortest path to a real HITL flow.
      </p>
      <CodeBlock
        language="python"
        filename="src/hitl/humanlayer_example.py"
        code={`from humanlayer import HumanLayer

hl = HumanLayer(
    verbose=True,
    contact_channel={
        "slack": {"channel_or_user_id": "C0ABCXYZ"}
    },
)

@hl.require_approval()
def refund_customer(customer_id: str, amount_usd: float) -> dict:
    return billing.refund(customer_id, amount_usd)

# In the agent tool loop, this is just another tool.
# Under the hood it posts to Slack, waits for a reply,
# and either runs or raises.
tools = [refund_customer, search_customer, ...]
agent.run("refund order 42 for $19.99", tools=tools)`}
      />
      <p className="mb-6 leading-relaxed">
        The trade with a hosted HITL layer is the same
        trade as any vendored infra: fast to ship, one
        more thing to trust with your data, and you are
        limited to the workflows the vendor supports.
        For a lot of client work we ship HumanLayer for
        the internal-tools agents (marketing ops, sales
        ops, data engineering) and build a Temporal or
        Inngest-backed flow for the customer-facing
        agents where the approval trail has to live in
        our own systems.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Confirmation fatigue: the single biggest UX
        failure mode
      </h2>
      <p className="mb-6 leading-relaxed">
        The first HITL you build almost always asks for
        approval too often. The user clicks yes, yes,
        yes, gets bored, then either turns approvals off
        or stops reading what they are approving. Either
        way, the safety net is gone. This is the pattern
        Anthropic calls confirmation fatigue and it is
        the reason per-tool-call approval is not enough
        on its own.
      </p>
      <p className="mb-6 leading-relaxed">
        Five design rules keep it in check. They are not
        deep; they are just easy to skip.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Approve intents, not individual
          calls</strong>. If the agent is doing
          &ldquo;send this campaign&rdquo;, one approval
          on the plan is better than approvals on
          &ldquo;write subject&rdquo;, &ldquo;write
          body&rdquo;, &ldquo;pick audience&rdquo;. Fine
          gates come only for the last irreversible
          step.
        </li>
        <li>
          <strong>Batch and group</strong>. If the agent
          is about to update 30 records with the same
          shape, ask once with a summary and let the
          reviewer approve the batch. Ten identical
          approvals in a row is a bug in your product.
        </li>
        <li>
          <strong>Show diffs, not JSON</strong>. A
          reviewer catches problems faster in a
          before/after view than in a raw dict. This is
          particularly true for content changes,
          config changes, and email drafts.
        </li>
        <li>
          <strong>Persistent permissions for routine
          tasks</strong>. &ldquo;Always allow this tool
          for this user&rdquo; is a legitimate answer
          the first time. Do not force the reviewer to
          re-decide every time they see the same shape.
        </li>
        <li>
          <strong>Timeouts with sensible defaults</strong>.
          Not every action needs an interactive reply.
          For low-risk actions, &ldquo;fire and wait 30
          seconds for an objection&rdquo; is a real
          pattern, and it converts the median case from
          a click to a silent pass-through.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Timeouts, escalation, and the &ldquo;no
        answer&rdquo; path
      </h2>
      <p className="mb-6 leading-relaxed">
        Every HITL flow needs a plan for what happens
        when nobody responds. The default answer in most
        products is wrong: they either time out and
        fail, or they time out and proceed. Both are
        rarely what the user actually wanted. Three
        production defaults we ship most of the time.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Reject-by-default for
          irreversible</strong>. Anything that sends
          money, deletes data, or contacts an external
          party defaults to reject on timeout. The
          reviewer can always try again; you cannot
          un-refund a customer.
        </li>
        <li>
          <strong>Escalate for time-sensitive</strong>.
          Support ticket triage that sits idle for four
          hours gets escalated to a secondary reviewer
          or a group channel. The point is not that the
          escalation always solves it, but that the
          user is not stuck.
        </li>
        <li>
          <strong>Auto-proceed for low-risk with
          audit</strong>. Read-only tools, low-value
          content drafts, and internal analytics can
          default to run-after-timeout as long as the
          audit trail is complete. This is only safe
          when you have real audit and the ability to
          roll back.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real business applications we have shipped
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Sales outreach agent at a B2B
        SaaS</strong>. The agent drafts personalised
        emails from a lead&rsquo;s public data. The rep
        gets a Slack card with the draft, an approve, an
        edit, and a reject button. Approve sends; edit
        opens a modal with the diff; reject discards.
        The rep hits &ldquo;always allow for
        follow-ups&rdquo; after two weeks and switches
        to review-only for cold outreach. Time to send
        dropped from an average of 12 minutes per lead
        to 90 seconds.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Refund agent for an e-commerce
        team</strong>. The customer support agent
        proposes a refund with a reason. Anything under
        $50 auto-approves with a 30-second window for
        the human to object; anything above gets a
        Slack approval with the customer&rsquo;s
        history attached. Timeouts default to reject.
        Audit log lands in Snowflake for compliance.
        Volume of manual refund reviews dropped 74%
        with no change in dispute rate.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Contract review agent for a legal
        team</strong>. The agent reads a new contract,
        flags clauses that differ from the template,
        drafts redlines, and asks a lawyer to approve
        each redline. Runs on Temporal because a real
        review takes days. Signals from the lawyer&rsquo;s
        review UI resume the workflow. The system-of-
        record is the workflow itself; the audit is
        automatic because Temporal history is the audit.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Data engineer copilot with SQL
        execution</strong>. The agent writes SQL against
        a warehouse. Any query that reads is auto-
        approved. Any query that writes (insert,
        update, delete, drop, truncate) hits a
        per-query Slack approval with the estimated row
        count. The reviewer sees the plan, the row
        estimate, and a &ldquo;dry-run in staging&rdquo;
        button. That last button is what made the
        engineering team actually adopt it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, honestly
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Real accountability</strong>. Every
          consequential action has a human name and a
          timestamp on it. That is what makes
          regulated-industry deals close.
        </li>
        <li>
          <strong>Trust curves you can move</strong>.
          Start every tool at &ldquo;always ask&rdquo;.
          As the org learns the agent&rsquo;s failure
          modes on their real workflows, promote tools
          to &ldquo;auto with objection window&rdquo;,
          then to &ldquo;auto with audit&rdquo;. The
          agent gets more autonomous over time on
          evidence, not on faith.
        </li>
        <li>
          <strong>Faster iteration</strong>. HITL lets
          you ship an agent with 70% quality and use
          the human as the safety net while you improve
          it. Without HITL you have to ship at 95%+
          before it can touch anything real.
        </li>
        <li>
          <strong>A real feedback loop</strong>. The
          approve/reject decisions are labelled data.
          Every rejection is a training example for
          fine-tuning, a case for the eval set, or a
          rule for the router. This is arguably the
          most under-used benefit of HITL.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Limitations you should plan for
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Latency</strong>. Median approval time
          on a Slack card in our data is around 90
          seconds during business hours. If your
          product needs sub-second responses, HITL is
          not the right fit for the hot path - move it
          out of band.
        </li>
        <li>
          <strong>Human availability</strong>. If the
          reviewer is on holiday and the escalation
          list is not set, the agent stalls. Every
          production HITL needs a documented on-call.
        </li>
        <li>
          <strong>Confirmation fatigue</strong>. The
          number-one HITL failure mode. See the design
          rules above; if the click-through rate on
          approvals is above 90% within two weeks, the
          approvals are noise, not safety.
        </li>
        <li>
          <strong>Fragmented approval UX</strong>. Slack
          works, but so do SMS, email, in-product
          modals, and Teams. Pick one channel per
          product surface and be strict about it - a
          reviewer who has to check three places will
          check none.
        </li>
        <li>
          <strong>State machine complexity</strong>.
          Every extra branch (rejected, timed out,
          escalated, edited-and-resumed) is a new state
          in the graph. Keep the state machine on paper
          before you code it.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to use HITL and when not to
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Use HITL</strong> whenever the action is
        irreversible, whenever the blast radius is
        larger than one user, whenever the domain is
        regulated, and whenever the org needs a name on
        the decision for legal or audit reasons.
        Practically, that covers most write actions in
        finance, health, legal, HR, and any system that
        talks to the outside world (email, SMS, social
        media, payments).
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skip HITL</strong> for read-only
        actions, for reversible in-product interactions
        (chat replies, in-app suggestions), for
        low-value writes with a fast rollback (draft a
        note, edit a spreadsheet cell), and for
        anything that has to complete in under a second.
        The right pattern for those is a plain audit
        log plus alerts on anomalies - a human sees the
        result but does not gate it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Compliance and audit is the reason HITL sells
      </h2>
      <p className="mb-6 leading-relaxed">
        The technical patterns are the fun part. The
        reason HITL is in every enterprise agent RFP is
        boring and unavoidable: SOC 2, HIPAA, GDPR, EU
        AI Act, and the fresh 2025-2026 wave of
        finance-sector agent guidance all effectively
        require a documented human decision on
        consequential automated actions. The way we
        satisfy the auditors in every deployment is the
        same: every approval writes a row to an append-
        only log with the reviewer identity, the input,
        the proposed action, the decision, the reason,
        and the resulting effect. Temporal history is
        one way to get this for free; a separate
        write-only Postgres table works just as well.
      </p>
      <p className="mb-6 leading-relaxed">
        The other piece auditors ask for is the
        rejection trail. It is not enough to show what
        was approved. You have to show what the agent
        proposed that got rejected, why, and what
        happened next (the agent tried again? gave up?
        escalated?). That trail is the difference
        between an agent an auditor signs off on and one
        they do not. Build it from day one; retrofitting
        it is painful.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        2025-2026 trends worth watching
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Plan-then-approve as the default
        UX</strong>. Anthropic&rsquo;s Claude Desktop and
        Claude Code, OpenAI&rsquo;s ChatGPT agent mode
        with mid-run refinement, and Gemini&rsquo;s
        collaborative planning have all converged on the
        same shape: show the plan up front, let the
        human edit it, then execute with lightweight
        gates on the risky steps. Per-tool-call approval
        as the only surface is on the way out.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Approval primitives in MCP</strong>. The
        MCP spec is in the middle of adding a first-
        class <code>approval/request</code> message so
        clients can render approvals consistently. This
        will fix the fragmentation where every client
        does its own thing. Expect this to land in
        mainline MCP through the second half of 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Voice and mobile approvals</strong>.
        SMS and phone-callback approvals are the natural
        fit for after-hours ops, on-call, and field
        teams. HumanLayer and Twilio-based custom
        integrations have led here; expect the platforms
        (Slack, Teams) to catch up with better mobile
        approval surfaces.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Risk-scored auto-approval</strong>. A
        small model in front of every action scores the
        risk and the confidence. Low-risk, high-
        confidence auto-approves with an objection
        window. Anything else goes to a human. This is
        the pattern most teams end up building
        themselves in 2026; expect it to show up as a
        primitive in agent frameworks over the next
        year.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Approval-as-training data</strong>. The
        approve/reject/edit history is the highest-
        quality preference data a team can produce.
        Fine-tuning stacks (OpenAI, Anthropic, Together)
        are starting to accept it as input for DPO/ORPO
        directly. Teams that logged approvals cleanly
        from day one are the ones getting the most out
        of this.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: HITL is a product surface, not a
        pause statement
      </h2>
      <p className="mb-6 leading-relaxed">
        Every HITL problem looks like a technical
        problem for the first week. It becomes a product
        problem in week two, an ops problem in week
        three, and a compliance problem in month two.
        The frameworks (LangGraph, Temporal, Inngest,
        MCP, HumanLayer) solve the plumbing. What they
        do not solve is the product design - which
        approvals to ask for, how to render them, how to
        route them, how to escalate them, and when to
        trust the agent enough to remove them.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements the shape we ship in the
        first two weeks is boringly consistent. A
        durable graph (LangGraph or Temporal depending
        on runtime), interrupts on every write tool,
        Slack as the primary approval surface, a stable
        thread id per task, an append-only approval
        log, and a documented on-call. The next month
        is spent tightening: fewer approvals where they
        turned out to be noise, more escalation paths
        where they turned out to matter, and a policy
        matrix that promotes tools from
        &ldquo;always ask&rdquo; to
        &ldquo;auto with audit&rdquo; based on
        real-world data.
      </p>
      <p className="mb-6 leading-relaxed">
        The one thing worth repeating: HITL is what
        makes agents shippable in serious environments.
        It is not a nice-to-have to add after launch.
        It is the difference between a demo people
        clap for and a system that a legal team,
        a security team, and an on-call engineer will
        agree to put in front of paying customers.
        Build it into the first week, not the last.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.anthropic.com/research/trustworthy-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Trustworthy agents in practice
            (July 2025)
          </a>
          {" "}- the design view behind
          Claude&rsquo;s plan-approve-execute pattern
          and per-tool permission model, plus the
          confirmation-fatigue framing.
        </li>
        <li>
          <a
            href="https://docs.langchain.com/oss/python/langgraph/how-tos/human_in_the_loop"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangGraph: Human-in-the-loop documentation
          </a>
          {" "}- the reference for{" "}
          <code>interrupt()</code>, <code>Command</code>,
          checkpointers, and the graph-level vs.
          node-level interrupt patterns.
        </li>
        <li>
          <a
            href="https://docs.temporal.io/ai-cookbook/human-in-the-loop-python"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Temporal AI Cookbook: Human-in-the-loop AI
            Agent
          </a>
          {" "}- the canonical Signals-based HITL
          workflow for long-running agents, plus the
          patterns around local state, timeouts, and
          escalation.
        </li>
        <li>
          <a
            href="https://www.inngest.com/docs/ai-patterns/human-in-the-loop"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inngest: Human-in-the-loop (HITL) pattern
            docs
          </a>
          {" "}- the TypeScript{" "}
          <code>waitForEvent</code> pattern with Slack
          Block Kit, timeout choices, and approval
          gates inside a tool loop.
        </li>
        <li>
          <a
            href="https://www.humanlayer.dev/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HumanLayer: human-in-the-loop for AI agents
          </a>
          {" "}- the &ldquo;approvals as a service&rdquo;
          layer with decorators, Slack/SMS/email
          routing, and a review UI.
        </li>
        <li>
          <a
            href="https://modelcontextprotocol.io/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Model Context Protocol
          </a>
          {" "}- the standard where{" "}
          <code>require_approval</code> lives at the
          tool boundary. Watch the active spec issue on
          adding an explicit approval/request message.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Framework for developing safe and
            trustworthy agents
          </a>
          {" "}- the policy view of persistent
          permissions, up-front planning, and human
          control over autonomy.
        </li>
        <li>
          <a
            href="https://agentic-patterns.com/patterns/human-in-loop-approval-framework/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Awesome Agentic Patterns: HITL Approval
            Framework
          </a>
          {" "}- the pattern catalogue entry, useful
          for a shared vocabulary in design docs and
          RFCs.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents in 2026 - Temporal,
            Inngest, DBOS, Restate
          </a>
          {" "}- the durability layer that most HITL
          flows sit on top of.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as
            state machines
          </a>
          {" "}- the graph framework that made
          interrupts a first-class primitive.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the tool-boundary protocol where{" "}
          <code>require_approval</code> lives.
        </li>
        <li>
          <a
            href="/articles/ai-agent-security-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent security in 2026
          </a>
          {" "}- the security side of HITL, including
          the Agents Rule of Two and the case for
          gating high-risk tools.
        </li>
      </ul>
    </div>
  );
}
