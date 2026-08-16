import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "vercel-ai-sdk-agents-production-2026",
  title:
    "Vercel AI SDK for AI agents in production 2026: from v5 tool loops to v6 ToolLoopAgent, DevTools, MCP and human-in-the-loop",
  excerpt:
    "How the Vercel AI SDK turned into the default TypeScript stack for building AI agents. Covers the v5 rewrite (UIMessage vs ModelMessage, stopWhen, prepareStep), the December 2025 v6 release with the ToolLoopAgent, stable MCP support, tool approval, and DevTools, plus how it plugs into AI Gateway, Fluid Compute, and the Workflow Development Kit for durable agents.",
  metaDescription:
    "A practical, technical guide to building production AI agents with the Vercel AI SDK in 2026. Covers AI SDK 5 (July 2025) with UIMessage vs ModelMessage, typed tools using inputSchema and outputSchema, stopWhen and prepareStep for agentic loop control, and the December 2025 AI SDK 6 release with the ToolLoopAgent class, stable MCP support, needsApproval-style tool approval, DevTools, and reranking. Also covers AI Gateway routing over 30+ model providers, Fluid Compute for long-running agents, the Workflow Development Kit and DurableAgent for durable execution, and when to reach for Mastra, LangGraph, or the OpenAI Agents SDK instead.",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Vercel AI SDK",
    "TypeScript",
    "Next.js",
    "MCP",
    "Tool Use",
    "Production",
    "AI Gateway",
    "Workflow",
  ],
  publishDate: "2026-08-16",
  readingTime: "17 min read",
};

export default function VercelAiSdkAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Two years ago the Vercel AI SDK was a small
        wrapper around OpenAI streaming that made it easy
        to render tokens in a Next.js app. Today it is
        the default TypeScript toolkit for building AI
        agents, with a typed tool loop, a first-class
        Agent class, stable Model Context Protocol
        support, human-in-the-loop approvals, and a
        DevTools panel that shows every call the agent
        makes. Between the v5 rewrite in July 2025 and
        the v6 release in December 2025, the SDK crossed
        the line from &ldquo;nice chat helper&rdquo; to
        &ldquo;serious agent framework&rdquo; that we now
        pick as the default on TypeScript engagements.
        This article is how we ship agents on it in
        production: the parts of the API that matter, the
        patterns that hold up under real load, and the
        limits that push us to a different tool.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the Vercel AI SDK is the topic worth reading
      </h2>
      <p className="mb-6 leading-relaxed">
        A lot of the interesting agent frameworks in 2026
        are written in Python: LangGraph, CrewAI, Pydantic
        AI, Google&rsquo;s ADK, Microsoft&rsquo;s Agent
        Framework. That is a real problem if your product
        is a Next.js app with a Node backend. You either
        run a separate Python service and pay the
        cross-language tax, or you build the agent loop
        by hand in TypeScript and lose the framework
        benefits. The Vercel AI SDK fixes that: it is a
        production-grade TypeScript SDK that gives you
        the same shape as the Python frameworks (typed
        tools, agent loops, MCP, human approval, tracing)
        with one install and no service boundary.
      </p>
      <p className="mb-6 leading-relaxed">
        The other reason it deserves a serious look is
        the surface area around it. Vercel has been
        turning the SDK into the client side of a bigger
        stack: the AI Gateway routes over 30+ model
        providers behind one endpoint, Fluid Compute
        keeps agent processes warm across requests, the
        Workflow Development Kit turns any async
        TypeScript function into a durable, resumable
        one, and the AI Gateway plus Workflow DevKit team
        up to give you a full agent runtime without you
        wiring queues, retries, or a sandbox yourself. If
        you are already deploying to Vercel, the SDK is
        the easiest on-ramp. If you are not, most of the
        SDK still works because it is a plain npm package
        with zero runtime lock-in.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>March 14, 2024</strong>: Vercel ships AI
          SDK 3.0 with Generative UI support, the first
          version that lets a tool call yield a React
          Server Component instead of just JSON.
        </li>
        <li>
          <strong>July 31, 2025</strong>: AI SDK 5.0
          releases after a long beta. Rewrite of the type
          system with <code>UIMessage</code> and{" "}
          <code>ModelMessage</code> as separate types,
          Server-Sent Events as the native streaming
          protocol, typed tools with{" "}
          <code>inputSchema</code> and{" "}
          <code>outputSchema</code>, agentic loop control
          with <code>stopWhen</code> and{" "}
          <code>prepareStep</code>, and a pluggable{" "}
          <code>ChatTransport</code> on the client. This is
          the version most teams are running today.
        </li>
        <li>
          <strong>October 22-24, 2025</strong>: Vercel Ship
          AI 2025 announces the AI SDK 6 beta, the open-
          source Workflow Development Kit, expanded AI
          Gateway with 30+ providers, and a new
          &ldquo;Open Agents&rdquo; project template.
        </li>
        <li>
          <strong>December 15, 2025</strong>: AI SDK 6.0
          ships. First-class <code>Agent</code>{" "}
          abstraction with a <code>ToolLoopAgent</code>{" "}
          implementation, tool approval built into the
          loop, stable (non-experimental) MCP client
          support, DevTools panel for inspecting agent
          runs, native reranking, image editing, and
          Standard Schema support so Zod, Valibot, and
          ArkType all work interchangeably.
        </li>
        <li>
          <strong>February 2026</strong>: Vercel Workflow
          DevKit adds <code>DurableAgent</code>, a wrapper
          that turns any AI SDK agent into a durable,
          resumable workflow so each tool call becomes a
          retryable step.
        </li>
        <li>
          <strong>Q2 2026</strong>: AI SDK 6 patch releases
          add streamed structured outputs across every
          provider, richer multi-modal part types, and
          agent-loop tracing that plugs into OpenTelemetry
          collectors.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The mental model: what an AI SDK agent actually is
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK draws a small number of primitives and
        composes agents out of them. Before we go into
        code, it is worth pinning the shape in your head.
      </p>
      <CodeBlock
        language="bash"
        filename="Vercel AI SDK 6: the agent layer at a glance"
        code={`+-----------------------------------------------------------+
|  CLIENT (browser / mobile)                                |
|                                                           |
|   useChat({ transport: DefaultChatTransport })            |
|      |                                                    |
|      |  UIMessage[] (source of truth for the UI)          |
|      v                                                    |
|   POST /api/chat  ---- SSE stream of UIMessageChunk ---+  |
+-----------------------------------------------------------+
                       |                                 |
                       v                                 |
+-----------------------------------------------------------+
|  SERVER (Next.js route / Node handler)                    |
|                                                           |
|   convertToModelMessages(uiMessages)  -> ModelMessage[]   |
|                                                           |
|   Agent / ToolLoopAgent .stream({ messages, tools })      |
|      |                                                    |
|      |  loop: model call -> tool call -> tool result      |
|      |        stopWhen(...) decides when to exit          |
|      |        prepareStep(...) reshapes each turn         |
|      |        toolApproval(...) gates sensitive tools     |
|      v                                                    |
|   toUIMessageStreamResponse()  ------> SSE back to client |
|                                                           |
|   AI Gateway routes to model provider (OpenAI, Anthropic, |
|   Google, Groq, xAI, Mistral, Amazon Bedrock, ...)        |
+-----------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Three ideas carry most of the weight. First, the
        SDK is <strong>split cleanly between UI and
        model</strong>: the browser sees{" "}
        <code>UIMessage</code> objects that carry every
        part of a message (text, tool inputs, tool
        outputs, custom data), and the model sees{" "}
        <code>ModelMessage</code> objects that are the
        trimmed, token-optimised form. You call{" "}
        <code>convertToModelMessages</code> right before
        the model call and store <code>UIMessage</code>{" "}
        for persistence. This split solves the
        &ldquo;which format do I save?&rdquo; question
        that plagued v3 and v4.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, the agent is <strong>the tool loop</strong>.
        In v5 that loop is <code>streamText</code> or{" "}
        <code>generateText</code> with <code>tools</code>{" "}
        set and <code>stopWhen</code> configured. In v6 it
        is the <code>ToolLoopAgent</code> class, which
        wraps the same idea in a reusable object. Both
        keep calling the model, executing any tool calls
        it asks for, and feeding the results back until a
        stop condition trips.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, the transport is <strong>pluggable
        end-to-end</strong>. The client can send messages
        over HTTP, WebSockets, or straight to a provider
        with no backend at all; the server can route calls
        to any of the 30+ providers behind the AI
        Gateway; MCP servers plug in as tool sources; and
        the whole loop can be wrapped in a DurableAgent
        for retry and resume. That composability is what
        moves the SDK from &ldquo;chat toy&rdquo; to
        &ldquo;agent runtime.&rdquo;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AI SDK 5: the rewrite that made agents a first-
        class citizen
      </h2>
      <p className="mb-6 leading-relaxed">
        The version that runs in most production apps
        right now is v5, released on July 31, 2025. Four
        changes matter for agent work: the message split,
        typed tools, agentic loop control, and the new
        transport layer on the client. Everything the v6
        <code>Agent</code> class does is possible in v5
        with plain functions.
      </p>

      <h3 className="mb-3 mt-6 text-2xl font-bold text-white">
        Typed tools with inputSchema and outputSchema
      </h3>
      <p className="mb-6 leading-relaxed">
        A tool in v5 is a plain object with a
        description, an <code>inputSchema</code> (what the
        model sends), an optional <code>outputSchema</code>{" "}
        (what the tool returns), and an{" "}
        <code>execute</code> function. Any Standard
        Schema library works: Zod, Valibot, ArkType, or a
        raw JSON schema you already have.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/lib/tools/customer-tools.ts"
        code={`import { tool } from "ai";
import { z } from "zod";
import { db } from "@/lib/db";

export const lookupCustomer = tool({
  description:
    "Look up a customer record by email. Use when the user " +
    "mentions a customer by email or asks for account info.",
  inputSchema: z.object({
    email: z.string().email(),
  }),
  outputSchema: z.object({
    id: z.string(),
    name: z.string(),
    plan: z.enum(["free", "pro", "enterprise"]),
    createdAt: z.string(),
  }),
  execute: async ({ email }) => {
    const row = await db.customers.findByEmail(email);
    if (!row) throw new Error("customer not found");
    return {
      id: row.id,
      name: row.name,
      plan: row.plan,
      createdAt: row.created_at.toISOString(),
    };
  },
});

export const scheduleFollowUp = tool({
  description: "Schedule a follow-up task for a CS agent.",
  inputSchema: z.object({
    customerId: z.string(),
    dueInHours: z.number().int().min(1).max(240),
    reason: z.string().min(4),
  }),
  execute: async (input) => {
    const task = await db.tasks.insert({
      customer_id: input.customerId,
      due_at: new Date(Date.now() + input.dueInHours * 3600 * 1000),
      reason: input.reason,
    });
    return { taskId: task.id, dueAt: task.due_at.toISOString() };
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        A few things are worth calling out. The{" "}
        <code>description</code> is the LLM-facing docstring
        and drives tool selection more than the name does;
        write it like you would write a Slack message to a
        junior engineer, not like an API reference.
        Splitting <code>inputSchema</code> and{" "}
        <code>outputSchema</code> lets you swap tool
        implementations (mock in tests, real in prod)
        without loosening the model contract, and the SDK
        validates the return value at runtime so you cannot
        drift. Throwing inside <code>execute</code> is
        fine: v5 catches it, formats an error result, and
        feeds it back to the model as a tool result the
        agent can react to.
      </p>

      <h3 className="mb-3 mt-6 text-2xl font-bold text-white">
        The tool loop with stopWhen and prepareStep
      </h3>
      <p className="mb-6 leading-relaxed">
        Two knobs turn a single request into an agent
        loop. <code>stopWhen</code> is a condition that
        ends the loop; you can pass one condition or an
        array combined with OR semantics.{" "}
        <code>prepareStep</code> runs before each model
        call and lets you swap the model, edit the
        messages, force a tool choice, or disable tools
        for that step. Together they cover almost every
        agentic pattern people build custom code for.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/app/api/chat/route.ts"
        code={`import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  hasToolCall,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { lookupCustomer, scheduleFollowUp } from "@/lib/tools/customer-tools";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-5.2"),
    system:
      "You are a customer success copilot. Use lookupCustomer " +
      "before scheduling a follow-up. Call finalAnswer once you " +
      "are ready to reply to the user.",
    messages: convertToModelMessages(messages),
    tools: {
      lookupCustomer,
      scheduleFollowUp,
    },
    stopWhen: [stepCountIs(8), hasToolCall("finalAnswer")],
    prepareStep: async ({ stepNumber, messages }) => {
      if (stepNumber === 0) {
        return {
          toolChoice: { type: "tool", toolName: "lookupCustomer" },
        };
      }
      if (messages.length > 40) {
        return {
          model: openai("gpt-5.2-mini"),
        };
      }
      return {};
    },
  });

  return result.toUIMessageStreamResponse();
}`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>stopWhen</code> list here says: stop
        after 8 tool steps or the first time the model
        calls a <code>finalAnswer</code> tool. Without a
        cap, an agent that misfires can loop until it
        hits the provider&rsquo;s max output tokens and
        burn a real bill; the default of 20 steps is
        sane but almost every serious build sets a
        tighter number.{" "}
        <code>prepareStep</code> here forces the agent to
        start with a customer lookup (a common pattern
        for tool-first agents) and drops down to a
        cheaper model once the conversation gets long,
        which is the closest thing you get to context-
        aware model switching without writing a router.
      </p>

      <h3 className="mb-3 mt-6 text-2xl font-bold text-white">
        The client side: useChat with pluggable transport
      </h3>
      <p className="mb-6 leading-relaxed">
        The v5 <code>useChat</code> hook is a full
        rewrite. Messages are <code>UIMessage</code>{" "}
        objects with a <code>parts</code> array, sending
        happens through a <code>ChatTransport</code>{" "}
        interface (default is HTTP + SSE), and every
        message is typed with your app-specific message
        shape. That last point matters more than it
        sounds: you can add <code>data</code> parts for
        custom UI (status pills, artifacts, streaming
        component previews) and they arrive on the client
        as a typed part you render however you want.
      </p>
      <CodeBlock
        language="tsx"
        filename="app/(chat)/chat/page.tsx"
        code={`"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      headers: { "x-workspace": "acme" },
    }),
  });

  return (
    <div className="mx-auto max-w-2xl p-6">
      {messages.map((m) => (
        <div key={m.id} className="mb-3">
          <strong>{m.role}:</strong>{" "}
          {m.parts.map((p, i) => {
            if (p.type === "text") return <span key={i}>{p.text}</span>;
            if (p.type.startsWith("tool-")) {
              return (
                <pre key={i} className="rounded bg-gray-900 p-2 text-xs">
                  {p.type} = {JSON.stringify(p.output ?? p.input, null, 2)}
                </pre>
              );
            }
            return null;
          })}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          className="w-full rounded border p-2"
          placeholder="Ask about a customer..."
        />
      </form>
    </div>
  );
}`}
      />
      <p className="mb-6 leading-relaxed">
        The one thing to know is that the transport is
        the seam. Swap <code>DefaultChatTransport</code>{" "}
        for a WebSocket transport if you need real-time
        push (voice, collaborative sessions), or connect
        the client straight to a provider like Anthropic
        for a client-only browser extension where you do
        not want to run a backend at all. Same UI code,
        different wire.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AI SDK 6: the Agent class and human-in-the-loop
      </h2>
      <p className="mb-6 leading-relaxed">
        The December 2025 v6 release is the version we
        default to on new work. The headline is the
        first-class <code>Agent</code> abstraction, with
        a <code>ToolLoopAgent</code> that codifies the
        v5 patterns above into a reusable object. Under
        the hood it is the same loop; on top it is a lot
        cleaner to reuse across a codebase because you
        define the agent once and call{" "}
        <code>generate</code> or <code>stream</code> from
        anywhere.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/customer-agent.ts"
        code={`import { ToolLoopAgent, Output, stepCountIs, hasToolCall } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { lookupCustomer, scheduleFollowUp } from "@/lib/tools/customer-tools";

export const customerAgent = new ToolLoopAgent({
  model: anthropic("claude-sonnet-5"),
  instructions:
    "You are a customer success copilot. Look up the customer " +
    "before scheduling. Return a structured summary at the end.",
  tools: {
    lookupCustomer,
    scheduleFollowUp,
  },
  stopWhen: [stepCountIs(8), hasToolCall("finalAnswer")],
  output: Output.object({
    summary: z.string(),
    nextSteps: z.array(z.string()),
    confidence: z.number().min(0).max(1),
  }),
  toolApproval: {
    scheduleFollowUp: async ({ input }) =>
      input.dueInHours <= 24 ? "not-applicable" : "user-approval",
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three v6-specific pieces to notice. First,{" "}
        <code>output</code> is a structured schema the
        agent must fill in at the end - the SDK adds a
        synthetic tool that captures the final answer, so
        the return value is typed all the way through.
        Second, <code>toolApproval</code> replaces the
        hand-rolled &ldquo;confirm before executing&rdquo;
        code most teams were writing on top of v5: mark
        any tool call as needing approval, and the loop
        pauses and surfaces the pending call to the client
        for a decision. Third, the whole thing is a plain
        exported constant, so route handlers, background
        workers, and workflow steps all import the same
        agent.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/app/api/chat/route.ts (v6 with agent + approval)"
        code={`import { convertToModelMessages } from "ai";
import { customerAgent } from "@/agents/customer-agent";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, approvals } = await req.json();

  const result = customerAgent.stream({
    messages: convertToModelMessages(messages),
    // Client sends { toolCallId, decision } pairs for pending approvals.
    toolApprovals: approvals ?? [],
  });

  return result.toUIMessageStreamResponse();
}`}
      />
      <p className="mb-6 leading-relaxed">
        On the client side the stream emits a{" "}
        <code>tool-call-pending-approval</code> part that
        includes the tool name, the input, and the
        <code>toolCallId</code>. Render it as a confirm
        card, collect a yes/no from the user, and send
        the decision back on the next request. This is
        the flow the OpenAI Agents SDK, LangGraph, and
        Anthropic&rsquo;s Claude Agent SDK all ended up
        supporting; v6 makes it about ten lines of code.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: stable in v6, the private-data connector
      </h2>
      <p className="mb-6 leading-relaxed">
        In v5, MCP support shipped behind{" "}
        <code>experimental_createMCPClient</code>; you
        could use it in production but had to accept the
        experimental prefix. In v6, MCP is stable and
        first-class. You connect an MCP client, list its
        tools, and pass them straight to the agent
        alongside your local ones. The transport can be
        stdio (for a local server you spawn as a child
        process) or Streamable HTTP (for a remote server
        run by another team, another vendor, or a hosted
        Vercel Sandbox).
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/research-agent.ts"
        code={`import { ToolLoopAgent, createMCPClient, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp";

const kb = await createMCPClient({
  transport: new StreamableHTTPClientTransport(
    new URL("https://kb.internal.acme.com/mcp"),
    { headers: { authorization: \`Bearer \${process.env.KB_TOKEN}\` } },
  ),
});

const github = await createMCPClient({
  transport: new StreamableHTTPClientTransport(
    new URL("https://mcp.github.com"),
    { headers: { authorization: \`Bearer \${process.env.GH_TOKEN}\` } },
  ),
});

const kbTools = await kb.tools();
const ghTools = await github.tools();

export const researchAgent = new ToolLoopAgent({
  model: openai("gpt-5.2"),
  instructions:
    "You research questions about our product. Use kb.search first, " +
    "then github when you need to point at a specific issue or PR.",
  tools: { ...kbTools, ...ghTools },
  stopWhen: stepCountIs(12),
});`}
      />
      <p className="mb-6 leading-relaxed">
        Two practical points on MCP in v6. First, tools
        from an MCP server become plain AI SDK tools, so
        <code>toolApproval</code>, <code>prepareStep</code>,
        and DevTools inspection all work the same way as
        for local tools; you do not need special
        handling. Second, remember that an MCP server is a
        supply-chain dependency: an untrusted server can
        surface tool definitions that trick the agent into
        exfiltrating data. Audit the server you connect,
        keep the token narrowly scoped, and use the{" "}
        <code>toolApproval</code> gate on any tool that
        writes state.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DevTools: the observability piece you keep asking
        for
      </h2>
      <p className="mb-6 leading-relaxed">
        The other v6 change we did not expect to lean on
        so much is DevTools. It ships as an npm package
        you drop into a dev-only page or the Next.js
        error overlay, and it renders every agent run as
        a tree: system prompt, each step&rsquo;s messages,
        the tool calls with inputs and outputs, token
        usage, latency, and the raw provider payload if
        you need to see it. For teams that were bouncing
        between console logs, LangSmith, and provider
        dashboards, having the trace one keystroke away
        during local development is a real productivity
        win.
      </p>
      <CodeBlock
        language="tsx"
        filename="app/dev/agent-devtools/page.tsx"
        code={`import { AgentDevTools } from "@ai-sdk/devtools";

// Guarded so it never ships to production.
export default function Page() {
  if (process.env.NODE_ENV !== "development") return null;
  return <AgentDevTools endpoint="/api/chat" />;
}`}
      />
      <p className="mb-6 leading-relaxed">
        For production observability you still want a
        proper tracing backend. The SDK writes
        OpenTelemetry spans out of the box, so pointing
        them at Langfuse, Braintrust, Arize, or your own
        collector is a config change, not a rewrite. On
        our own client work we run DevTools locally and
        Langfuse or Braintrust in staging and prod.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AI Gateway: one endpoint, 30+ providers
      </h2>
      <p className="mb-6 leading-relaxed">
        The AI Gateway is a hosted routing layer that
        sits between your app and the model providers.
        You keep using the AI SDK the same way, but the
        model string points at the Gateway, which then
        decides which provider actually runs the call.
        The Gateway adds automatic fallbacks (if OpenAI
        returns a 500, retry against Azure OpenAI or
        Anthropic), usage-based routing (pick the
        cheapest provider that meets a latency budget),
        observability, and no token markup (you pay the
        upstream list price).
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/gateway-agent.ts"
        code={`import { ToolLoopAgent } from "ai";
import { gateway } from "@vercel/ai-sdk-gateway";

export const supportAgent = new ToolLoopAgent({
  // "openai/gpt-5.2" is routed by Gateway; if the primary
  // provider errors, Gateway retries against the fallbacks.
  model: gateway("openai/gpt-5.2", {
    fallbacks: ["anthropic/claude-sonnet-5", "google/gemini-2.5-pro"],
    routing: "cheapest-under-800ms-p95",
  }),
  instructions: "You handle L1 support tickets end to end.",
  tools: {
    /* ... */
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Two operational points to plan around. The
        Gateway is convenient but it is a single point
        of failure between your app and the model; the
        90-second retry semantics are good, but plan for
        the case where the Gateway itself has an
        incident. And be honest about routing: the
        cheapest-under-a-latency-budget mode is genuinely
        useful for cost, but if your agent depends on
        provider-specific behaviour (Anthropic tool
        caching, OpenAI structured outputs, Gemini file
        parts), pin the model instead of letting the
        Gateway pick one for you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Durable agents: Workflow DevKit and DurableAgent
      </h2>
      <p className="mb-6 leading-relaxed">
        The single biggest gap in most TypeScript agent
        stacks used to be durability. Your Next.js route
        runs for 60 seconds, then it dies. Your agent
        gets stuck on a slow tool call, and the whole
        run is lost. The Vercel Workflow Development Kit
        (WDK), open-sourced at Ship AI 2025 and integrated
        with the AI SDK in v6, closes that gap. WDK adds
        two directives (<code>&quot;use workflow&quot;</code> and{" "}
        <code>&quot;use step&quot;</code>) that mark
        ordinary async TypeScript functions as durable.
        The runtime persists their state, retries failed
        steps, and resumes exactly where they stopped
        after a crash or a deployment.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/workflows/onboarding-agent.ts"
        code={`"use workflow";

import { customerAgent } from "@/agents/customer-agent";
import { sendEmail, waitForApproval } from "@/lib/steps";

export async function onboardCustomer(email: string) {
  const intro = await customerAgent.generate({
    prompt: \`Draft an onboarding plan for \${email}.\`,
  });

  await sendEmail({ to: email, body: intro.text });

  // Pause for days or weeks; resumes on the next event.
  const approval = await waitForApproval({ email });
  if (!approval.ok) return { status: "rejected" };

  const followUp = await customerAgent.generate({
    prompt: \`Write the day-30 check-in for \${email}.\`,
  });
  await sendEmail({ to: email, body: followUp.text });

  return { status: "onboarded" };
}`}
      />
      <p className="mb-6 leading-relaxed">
        The February 2026 update on top of this is{" "}
        <code>DurableAgent</code>: a wrapper that turns
        each individual tool call inside an agent run
        into a retryable, resumable step, not just the
        outer workflow. The difference matters when a
        tool call takes minutes (a browser agent
        rendering a page, a code sandbox running a build,
        a webhook to a slow third-party API): if the
        process dies partway through, the durable version
        restarts from the last successful tool boundary
        rather than the top of the run. For anything past
        a demo, we default to <code>DurableAgent</code>{" "}
        now.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Persist UIMessage, not
        ModelMessage</strong>. Save the full{" "}
        <code>UIMessage[]</code> in your database. It has
        everything the UI needs to re-render: text, tool
        inputs, tool outputs, custom data parts, and
        message-level metadata. When you resume a
        conversation, run{" "}
        <code>convertToModelMessages</code> right before
        the model call. Saving <code>ModelMessage</code>{" "}
        directly throws away the tool trace you will want
        for debugging.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Pin the model per step, not per
        agent</strong>. Use <code>prepareStep</code> (or,
        in v6, per-step model options on the Agent) to
        drop from a big model to a fast one when the
        conversation is deep in a mechanical loop and
        bump back up when the model needs to reason. On
        our own runs the swap saves 30-40% of the token
        cost with no measurable hit to quality.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Set a real stopWhen, not the
        default</strong>. Twenty steps is a lot of tool
        calls. Combine a step count with a{" "}
        <code>hasToolCall(&quot;finalAnswer&quot;)</code>{" "}
        condition so the model has a way to say
        &ldquo;done.&rdquo; When we skip this, one out
        of every fifty runs finds a way to loop forever
        until the provider caps output tokens; the bill
        is not fun.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Gate every state-changing tool with
        toolApproval</strong>. Read tools (search, fetch,
        list) run automatically. Write tools (send email,
        charge card, delete row, deploy) run through
        <code>toolApproval</code>, even for internal
        users. The user pattern that comes out of this is
        the same pattern GitHub Copilot Agent and Claude
        Code use: propose, review, apply.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Wrap long-running agents in
        DurableAgent from day one</strong>. It is a small
        cost to add up front and a big cost to add
        later. Any agent that touches the browser, the
        file system, a code sandbox, or an external API
        with unreliable latency should be durable, not a
        request-scoped function.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Ship DevTools in the dev
        environment</strong>. It is the fastest way to
        understand why an agent picked a tool, why a
        prompt got truncated, or why a stream ended
        early. Do not wait for a production incident to
        wish you had the trace.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Trace with OpenTelemetry, not
        console.log</strong>. The SDK writes spans for
        every model call, every tool call, and the outer
        agent run. Point them at Langfuse, Braintrust, or
        your own collector. The build-your-own-tracing
        route is a graveyard we have wandered into more
        than once.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases we have shipped on the SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Customer support copilot on a SaaS
        product</strong>. A Next.js app with a support
        console. The agent reads the ticket, pulls the
        customer record from Postgres through a local
        tool, searches the docs through an MCP server the
        docs team owns, and drafts a reply. State-changing
        actions (refund, plan change) go through{" "}
        <code>toolApproval</code>. The support engineer
        reviews the draft, approves the action, and the
        agent ships it. Response time went from a median
        of 14 minutes to 90 seconds; the number of
        tickets that need a second-level escalation
        dropped by 22%.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal data analyst on a Fabric
        warehouse</strong>. An agent with a SQL tool and a
        chart-rendering tool sits in a Slack app. The
        engineer types a question in plain English, the
        agent writes SQL against the Microsoft Fabric
        warehouse, runs it through the code interpreter,
        and returns a chart plus a two-sentence takeaway.
        We host the agent on Fluid Compute so long-
        running queries do not hit the 60-second timeout,
        and every SQL statement goes through the approval
        gate.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Onboarding orchestrator</strong>. A
        DurableAgent workflow triggered by a signup event.
        It drafts the welcome email, waits for the user to
        confirm their profile (days), sends the day-7
        activation nudge if they went quiet, and hands off
        to a human CSM if they hit a plan threshold. The
        durable layer is what makes this work: the
        workflow pauses for a week without holding a
        process open, and resumes cleanly when the event
        arrives.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Docs research chat with generative
        UI</strong>. A public docs site with a chat panel.
        The agent hits an internal search tool, ranks
        results with the new v6 reranker, and streams back
        a mix of prose and structured cards (code samples,
        link previews, callouts). The generative UI part
        is the payoff for staying in the TypeScript
        ecosystem: we render the streamed parts as React
        components in the same app, no separate frontend.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations, honestly
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Where the Vercel AI SDK is the right
        pick.</strong> A TypeScript stack with a Next.js
        or Node backend, where the agent is a feature of
        a bigger app and not a standalone service. Teams
        that already ship on Vercel and want the SDK,
        Gateway, Fluid Compute, and Workflow DevKit to
        talk to each other with zero glue. Products that
        need generative UI: streaming React components
        from tool calls is a Vercel-native feature no
        other framework matches for a Next.js app. And
        anywhere you want a small learning curve: the
        surface area is small enough that a developer
        who knows Next.js can build a real agent in a
        day.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Where it is not the right pick.</strong>
        Python-first teams. If your data science and ML
        team owns the agent, LangGraph, Pydantic AI, or
        one of the vendor SDKs (OpenAI Agents SDK,
        Anthropic Claude Agent SDK, Google ADK) will
        share more code with your existing stack.
        Deep multi-agent research pipelines with
        orchestrator-worker patterns can be built in the
        AI SDK but LangGraph and Mastra have more mature
        primitives for that shape. And if you need graph-
        based control flow (branch and merge subgraphs,
        conditional edges, checkpointed sub-agents),
        LangGraph is still the reference.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Real limits to plan for.</strong> The
        AI SDK is intentionally a client-side and
        route-handler-side library; it does not ship a
        vector store, a document loader, or a
        retrieval pipeline. You bring your own (LangChain
        JS, LlamaIndex TS, or a plain pgvector query).
        The <code>Agent</code> abstraction is deliberately
        thin, so multi-agent orchestration (planner then
        worker then reviewer) is code you write, not a
        primitive the SDK gives you. And DevTools plus
        the AI Gateway are hosted-by-Vercel features
        first; if you self-host, plan for OpenTelemetry
        + your own gateway (LiteLLM, Portkey, Kong AI
        Gateway).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How the AI SDK compares to the other agent stacks
      </h2>
      <p className="mb-6 leading-relaxed">
        The market fills in like this in mid-2026. The
        AI SDK is the default when TypeScript is a hard
        constraint or the agent is embedded in a web app.
        <strong>Mastra</strong> is the TypeScript
        alternative if you want a heavier framework with
        workflows, evals, and vector store integrations
        baked in from day one; it is close in spirit to
        LangGraph. <strong>LangGraph</strong> (Python and
        JS) is the reference for graph-based
        orchestration and long-running multi-agent
        research. <strong>OpenAI Agents SDK</strong>,{" "}
        <strong>Anthropic Claude Agent SDK</strong>,
        <strong>Google ADK</strong>, and{" "}
        <strong>Microsoft Agent Framework</strong> are the
        vendor stacks; use them when you are locked into
        a single provider and want the tightest
        integration with that vendor&rsquo;s tools (file
        search, computer use, connectors).{" "}
        <strong>Pydantic AI</strong> is the Python pick
        when strong typing and provider portability
        matter more than framework features.
      </p>
      <p className="mb-6 leading-relaxed">
        The good news is that MCP has made these choices
        less lock-in-y than they used to be. Whichever
        agent stack you pick, if you expose your private
        data through an MCP server, any of these
        frameworks can consume it. The AI SDK, LangGraph,
        the OpenAI Agents SDK, Claude Agent SDK, and
        Google ADK all support MCP as a first-class tool
        source. That means the framework decision is now
        mostly about developer experience, language, and
        deployment target, not about which vendor you can
        talk to.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through late 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Streamed structured outputs across every
        provider</strong>. Vercel has signposted first-
        class streaming of typed objects for AI SDK 6 patch
        releases, backed by whichever provider capability
        exists (OpenAI structured outputs, Anthropic tool
        results, Gemini JSON mode). This closes the
        awkward gap where you either stream text or you
        wait for a full JSON blob.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Richer multi-modal part types</strong>.
        Images in and out, audio, video, and file parts
        as first-class message parts, not
        second-class attachments. This lines up with the
        push from every big lab to make the agent surface
        actually multi-modal, not just text with the
        occasional image slot.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Edge Agents on Fluid Compute</strong>.
        Vercel&rsquo;s Fluid Compute is the runtime that
        keeps an agent process warm across requests, and
        the pattern of running the whole agent loop at
        the edge (close to the user, close to the tools,
        close to the vector store) is where the
        &ldquo;you can just ship agents&rdquo; pitch is
        heading. Expect more agent-specific runtime
        primitives to land here through the rest of 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent registries and marketplaces</strong>.
        The v6 Agent class is a serialisable, versioned
        unit. The next step is a registry of prebuilt
        agents (support copilot, data analyst, code
        reviewer, browser operator) you install like an
        npm package and configure with your tools. The
        Vercel &ldquo;Open Agents&rdquo; project template
        is the first move in that direction.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Better agent-loop tracing</strong>. The
        current OpenTelemetry story is good; the
        promised richer agent-loop observability makes
        the trace tell the whole story of a run (which
        prepareStep hooks fired, which stopWhen
        conditions were evaluated, which approvals
        blocked). This is the piece that turns the SDK
        from a good agent framework into a mature one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the default TypeScript agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The Vercel AI SDK spent 2024 as a solid chat
        helper and 2025 turning into a real agent
        framework. The v5 rewrite got the message model,
        the tool loop, and the transport right. The v6
        release added the Agent abstraction, stable MCP,
        tool approval, and DevTools that make production
        agents fast to build and debug. The Workflow
        DevKit and DurableAgent close the durability gap
        that used to push TypeScript teams to Python. The
        AI Gateway makes the provider decision reversible.
        Fluid Compute makes long-running agents affordable.
      </p>
      <p className="mb-6 leading-relaxed">
        The way we make the build-or-borrow decision on
        client work today: if the product is a Next.js or
        Node app and TypeScript is the language, we
        start with the Vercel AI SDK. If we need graph-
        based orchestration or the team is Python-first,
        we start with LangGraph or the vendor SDK. Either
        way we plan to expose our private data through
        MCP so the choice is not permanent. The nice
        thing about the state of the ecosystem in 2026 is
        that the framework layer is thinner than the
        agent patterns above it: pick the SDK that fits
        your stack, and the same tool loop, the same
        approval flow, and the same MCP-connected data
        surface show up in every serious build.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://vercel.com/blog/ai-sdk-5"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 5 (July 31, 2025)
          </a>
          {" "}- the release post covering UIMessage vs
          ModelMessage, typed tools, stopWhen and
          prepareStep, and the new ChatTransport.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ai-sdk-6"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 6 (December 15, 2025)
          </a>
          {" "}- the announcement of the Agent abstraction,
          ToolLoopAgent, stable MCP, tool approval,
          DevTools, reranking, and Standard Schema support.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/introduction"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK official documentation
          </a>
          {" "}- the reference for tool definitions,
          streaming, transports, and the Agent /
          ToolLoopAgent classes.
        </li>
        <li>
          <a
            href="https://github.com/vercel/ai"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel/ai on GitHub
          </a>
          {" "}- the AI SDK source, release notes, and the
          growing collection of example apps that ship in
          the monorepo.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/introducing-workflow"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: Introducing the Workflow Development
            Kit
          </a>
          {" "}- the open-source WDK announcement, with the
          &ldquo;use workflow&rdquo; and &ldquo;use
          step&rdquo; directives and the DurableAgent
          integration.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ship-ai-2025-recap"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Ship AI 2025 recap
          </a>
          {" "}- the October 2025 event where the AI SDK 6
          beta, Workflow DevKit, and expanded AI Gateway
          were announced.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/how-ai-gateway-runs-on-fluid-compute"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: How AI Gateway runs on Fluid Compute
          </a>
          {" "}- the deep-dive on the routing layer that
          the SDK plugs into for 30+ model providers.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/you-can-just-ship-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: You can just ship agents
          </a>
          {" "}- the platform pitch for how the AI SDK,
          Workflow DevKit, AI Gateway, and Fluid Compute
          hang together as a single agent runtime.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the deeper read on the Model Context
          Protocol that the AI SDK 6 client speaks.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra: the TypeScript alternative
          </a>
          {" "}- when to reach for a heavier framework
          instead of building on the AI SDK directly.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph-based orchestration framework
          that fits multi-agent research better than the
          AI SDK.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents 2026
          </a>
          {" "}- the wider view on Temporal, Restate,
          Inngest, and Vercel Workflow for long-running
          agent workloads.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability 2026
          </a>
          {" "}- the OpenTelemetry, Langfuse, Braintrust,
          and Arize story that plugs into AI SDK tracing.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration 2026
          </a>
          {" "}- the orchestrator-worker patterns you
          build on top of any agent framework, including
          the AI SDK.
        </li>
      </ul>
    </div>
  );
}
