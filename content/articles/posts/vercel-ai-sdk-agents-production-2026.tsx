import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "vercel-ai-sdk-agents-production-2026",
  title:
    "Vercel AI SDK agents in production 2026: ToolLoopAgent, MCP, and the TypeScript-first agent stack",
  excerpt:
    "How the Vercel AI SDK went from a chat helper to the default TypeScript agent framework. Covers the v5 agentic loop primitives, the v6 Agent interface and ToolLoopAgent class, human-in-the-loop approvals, full MCP support with OAuth, DevTools, the v7 WorkflowAgent for durable execution, and honest trade-offs against LangGraph and the OpenAI Agents SDK.",
  metaDescription:
    "A practical, technical guide to building production AI agents with the Vercel AI SDK in 2026. Covers stopWhen and prepareStep loop control, the ToolLoopAgent class shipped in AI SDK 6, tool execution approval for human-in-the-loop, MCP with OAuth and elicitation, DevTools for tracing agent runs, WorkflowAgent for durable resumable execution, Thomson Reuters CoCounsel and Clay Claygent case studies, and side-by-side comparison with LangGraph and the OpenAI Agents SDK.",
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2400&q=80",
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
    "Production",
  ],
  publishDate: "2026-08-14",
  readingTime: "16 min read",
};

export default function VercelAiSdkAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Two years ago the Vercel AI SDK was a helper for
        streaming chat completions into a Next.js app. In 2026
        it is the default TypeScript framework for building
        production agents, with over 20 million monthly
        downloads and adoption from Thomson Reuters, Clay,
        Zapier, and a long tail of Fortune 500 teams. Version
        5 landed the agentic loop primitives. Version 6 added
        the <code>ToolLoopAgent</code> class, human-in-the-loop
        tool approval, full MCP support with OAuth, and a
        DevTools inspector. Version 7 is now shipping subagents,
        skills, and a durable <code>WorkflowAgent</code> for
        multi-day runs. This article is how we build agents on
        the AI SDK for client work: the primitives that matter,
        the patterns that survive real traffic, and the honest
        trade-offs against LangGraph and the OpenAI Agents SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the AI SDK became the default TypeScript agent
        framework
      </h2>
      <p className="mb-6 leading-relaxed">
        Most agent frameworks were written first in Python.
        LangGraph, CrewAI, the OpenAI Agents SDK, Google ADK,
        Pydantic AI: Python is where the community lives. If
        your product is a Next.js app or a Node.js service,
        that means gluing a Python worker onto your web stack,
        or wrapping a REST call over your own agent loop. Both
        options add a moving part that does not need to exist.
      </p>
      <p className="mb-6 leading-relaxed">
        The AI SDK closed that gap. It is a TypeScript-first
        toolkit with a unified provider layer over 25+ model
        vendors, a chat integration for React, Vue, Svelte and
        Angular, and a set of core functions (<code>generateText</code>,
        <code>streamText</code>, <code>generateObject</code>)
        that already handled tool calling. Version 5, released
        in August 2025, added the loop primitives that turned
        those functions into a real agent runtime. Version 6,
        released in December 2025, wrapped those primitives in
        a first-class <code>Agent</code> interface with a
        production-ready default implementation. The result:
        the same team that ships the chat UI can ship the
        agent behind it, in one language, with end-to-end
        type safety.
      </p>
      <p className="mb-6 leading-relaxed">
        Two numbers explain the traction. Thomson Reuters
        built CoCounsel, their AI assistant for attorneys and
        accountants, with three developers in two months on
        the AI SDK, and are now migrating their whole
        codebase onto it, dropping thousands of lines of
        custom code across ten provider integrations. Clay
        ships Claygent, their production web research agent,
        on the same stack. These are not weekend prototypes.
        They are the shape of production work in 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The version timeline that matters
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>August 5, 2025</strong>: AI SDK 5 ships.
          First release with real agent primitives:{" "}
          <code>stopWhen</code> for loop termination,{" "}
          <code>prepareStep</code> for per-step control, an
          experimental <code>Agent</code> class, dynamic
          tools, tool lifecycle hooks, provider-executed
          tools, and V2 provider specifications. The chat
          layer gets a rebuild with typed UI messages,
          data parts, and message metadata.
        </li>
        <li>
          <strong>December 22, 2025</strong>: AI SDK 6
          releases. <code>ToolLoopAgent</code> lands as a
          production-ready implementation of the
          <code>Agent</code> interface, with type-safe call
          options, tool execution approval for human-in-the-
          loop, strict schema mode, tool input examples,
          <code>toModelOutput</code> for token-efficient tool
          output, DevTools for inspecting runs, and stable
          MCP with OAuth, resources, prompts and elicitation.
        </li>
        <li>
          <strong>Early 2026</strong>: AI SDK 7 preview lands
          with subagents, skill uploads, harness adapters,
          policy-based tool approvals through Open Policy
          Agent, <code>WorkflowAgent</code> for durable
          resumable execution, and a terminal UI harness for
          CLI agents.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The through-line across the three releases is the
        same. The SDK gives you low-level primitives you can
        combine, then wraps the most common combination in a
        higher-level abstraction. You never lose the escape
        hatch back to the primitives.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The mental model: three layers, one type system
      </h2>
      <p className="mb-6 leading-relaxed">
        The AI SDK splits into three layers, and the split is
        worth internalising before you pick where to write
        your agent code.
      </p>
      <CodeBlock
        language="bash"
        filename="AI SDK: the three layers"
        code={`+---------------------------------------------------+
|  Layer 3: AI SDK UI                               |
|                                                   |
|   useChat / useCompletion / useObject             |
|   Typed UIMessage stream, data parts, metadata    |
|   React, Vue, Svelte, Angular                     |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
|  Layer 2: AI SDK Agents                           |
|                                                   |
|   Agent interface                                 |
|   ToolLoopAgent, WorkflowAgent, HarnessAgent      |
|   Call options, prepareCall, subagents            |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
|  Layer 1: AI SDK Core                             |
|                                                   |
|   generateText, streamText, generateObject        |
|   tool(), dynamicTool(), stopWhen, prepareStep    |
|   Model provider abstraction (25+ vendors)        |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Layer 1 is the low-level primitive layer. Every
        agent, no matter how complex, ends up calling{" "}
        <code>streamText</code> or <code>generateText</code>{" "}
        under the hood. This is where you drop when you need
        full control, when you are wiring up a custom loop,
        or when you need to reach into the raw provider
        response.
      </p>
      <p className="mb-6 leading-relaxed">
        Layer 2 is where the agent abstractions live. The{" "}
        <code>Agent</code> interface is the contract: a
        reusable object with a model, instructions, tools,
        and stop conditions, that you can call as
        <code>agent.generate({"{"}...{"}"})</code> or{" "}
        <code>agent.stream({"{"}...{"}"})</code>. The
        <code>ToolLoopAgent</code> class is the default
        implementation, ready to ship. When you need
        something the default cannot do (durable execution,
        a custom harness), you implement the interface
        yourself and everything else in the SDK still works.
      </p>
      <p className="mb-6 leading-relaxed">
        Layer 3 is the UI layer. The <code>useChat</code>{" "}
        hook, redesigned in v5, gives you a typed message
        stream with tool invocations, data parts, and
        metadata all first-class. The <code>UIMessage</code>{" "}
        and <code>ModelMessage</code> split solves the
        persistence problem: store <code>UIMessage[]</code>{" "}
        as the source of truth, convert to{" "}
        <code>ModelMessage[]</code> only when you call the
        model.
      </p>
      <p className="mb-6 leading-relaxed">
        The type system stitches the three layers together.
        Define a tool once with a Zod input schema, use it
        in a <code>ToolLoopAgent</code>, and the same tool
        types flow into your React component through{" "}
        <code>InferAgentUIMessage</code>. Change the schema
        and the compiler tells you which UI parts to update.
        This is the property that made the SDK sticky.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core primitives: stopWhen and prepareStep
      </h2>
      <p className="mb-6 leading-relaxed">
        Before v5, if you wanted a tool-calling loop you
        wrote it yourself. Call the model, check for tool
        calls, execute them, append results, call again,
        stop when the model returns text. Every codebase
        that shipped an agent had a slightly different
        version of that loop, and half of them handled
        streaming badly.
      </p>
      <p className="mb-6 leading-relaxed">
        Version 5 replaced that with two parameters on the
        core generation functions. <code>stopWhen</code>{" "}
        turns a single call into a loop that runs until a
        condition fires. <code>prepareStep</code> lets you
        adjust the model, prompt, or tool set before each
        step. Together they give you the whole agent loop
        without any custom code.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/loop-basics.ts"
        code={`import { generateText, stepCountIs, hasToolCall, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => ({
        location,
        temperature: 21,
      }),
    }),
  },
  // Stop after 5 steps OR when the model calls the finalAnswer tool.
  stopWhen: [stepCountIs(5), hasToolCall('finalAnswer')],
  prepareStep: async ({ stepNumber, messages }) => {
    // Use a cheaper model for the first step: intent detection.
    if (stepNumber === 0) {
      return { model: 'openai/gpt-5-mini' };
    }
    // Compress the history once it grows past 10 turns.
    if (messages.length > 10) {
      return { messages: messages.slice(-10) };
    }
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three details are worth pulling out.{" "}
        <strong>stopWhen accepts an array</strong>, and the
        loop stops as soon as any condition fires. The two
        built-ins that cover most cases are{" "}
        <code>stepCountIs(n)</code> for a hard limit and{" "}
        <code>hasToolCall(&apos;name&apos;)</code> for
        signalling completion through a specific tool. If
        neither fits, you can pass a function that receives
        the current steps and returns a boolean.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>prepareStep runs before every step</strong>,
        including the first, and can return any subset of
        the call settings. Model swap between steps is the
        pattern we use most: a fast cheap model for intent
        classification, a big model for the reasoning steps,
        and a large-context model when the conversation
        crosses the small-model context window.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The model always stops on plain text</strong>.
        Even if <code>stopWhen</code> has not fired, the
        loop exits the moment the model returns a message
        without tool calls. This is what makes the whole
        thing feel like an agent instead of a scripted
        pipeline: the model decides when it is done.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        ToolLoopAgent: the production default
      </h2>
      <p className="mb-6 leading-relaxed">
        The functional primitives are enough for a single
        endpoint. The moment you want to reuse the same agent
        across a chat route, a background job, and a cron
        script, you end up passing the same configuration
        object everywhere. The <code>ToolLoopAgent</code>{" "}
        class in v6 is the abstraction that fixes that.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/support-agent.ts"
        code={`import { ToolLoopAgent, stepCountIs, tool } from 'ai';
import { z } from 'zod';
import { searchKnowledgeBase } from '@/tools/knowledge-base';
import { createTicket } from '@/tools/tickets';

export const supportAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.5',
  instructions: [
    'You are a customer support agent for Acme.',
    'Always search the knowledge base before answering.',
    'Open a ticket only when the user asks for one.',
  ].join(' '),
  tools: {
    searchKnowledgeBase,
    createTicket,
  },
  stopWhen: stepCountIs(10),
});`}
      />
      <p className="mb-6 leading-relaxed">
        The agent is a plain export. Now every consumer
        just imports it.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/api/support/route.ts"
        code={`import { createAgentUIStreamResponse } from 'ai';
import { supportAgent } from '@/agents/support-agent';

export async function POST(request: Request) {
  const { messages } = await request.json();
  return createAgentUIStreamResponse({
    agent: supportAgent,
    uiMessages: messages,
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        A background job that reuses the same agent for
        overnight ticket triage looks the same, minus the
        streaming wrapper.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/jobs/triage.ts"
        code={`import { supportAgent } from '@/agents/support-agent';

export async function triageTicket(ticketId: string, body: string) {
  const result = await supportAgent.generate({
    prompt: [
      'Triage this ticket. Search the KB first.',
      'If a fix exists, reply. If not, escalate with createTicket.',
      '---',
      body,
    ].join('\\n'),
  });
  return { ticketId, reply: result.text, steps: result.steps };
}`}
      />
      <p className="mb-6 leading-relaxed">
        Same agent, two entry points, zero duplication.
        Add a third consumer (a Slack bot, a CLI, a
        scheduled evaluation) and it is another two lines.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Call options: passing typed runtime context
      </h2>
      <p className="mb-6 leading-relaxed">
        Reusable agents run into one problem quickly: they
        need runtime data that is not part of the prompt.
        The current user, the account tier, a retrieved
        document set, a model override. In v6 the answer is
        the call options pattern: define a Zod schema for
        your runtime inputs, then read them in a{" "}
        <code>prepareCall</code> hook.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/support-agent-with-context.ts"
        code={`import { ToolLoopAgent } from 'ai';
import { z } from 'zod';

export const supportAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.5',
  callOptionsSchema: z.object({
    userId: z.string(),
    accountType: z.enum(['free', 'pro', 'enterprise']),
    retrievedDocs: z.array(z.string()).optional(),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions: [
      'You are a support agent for Acme.',
      \`User account type: \${options.accountType}\`,
      \`User ID: \${options.userId}\`,
      options.retrievedDocs?.length
        ? \`Relevant docs:\\n\${options.retrievedDocs.join('\\n---\\n')}\`
        : '',
    ].join('\\n'),
    // Route enterprise accounts to a larger model.
    model:
      options.accountType === 'enterprise'
        ? 'anthropic/claude-opus-4.5'
        : 'anthropic/claude-sonnet-4.5',
  }),
});

const result = await supportAgent.generate({
  prompt: 'How do I upgrade my seat count?',
  options: {
    userId: 'user_123',
    accountType: 'enterprise',
    retrievedDocs: await retrieveDocs('seat count upgrade'),
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        This is the RAG integration point for agent code.
        Retrieval happens outside the agent, the result is
        passed in as typed options, and the agent stays
        stateless. If retrieval logic changes, only the
        caller updates.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        End-to-end type safety in the UI
      </h2>
      <p className="mb-6 leading-relaxed">
        The reason to write your agent in TypeScript against
        this SDK, and not to reach for a Python framework
        with a REST wrapper, is that the tool types flow
        into your React component with no extra work. The
        <code>InferAgentUIMessage</code> helper reads your
        agent definition, produces a typed message shape,
        and <code>useChat</code> uses it to type every part
        the UI receives.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/weather-agent.ts"
        code={`import { ToolLoopAgent, InferAgentUIMessage, tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the weather in a city',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({
    city: z.string(),
    tempC: z.number(),
    conditions: z.string(),
  }),
  execute: async ({ city }) => ({
    city,
    tempC: 21,
    conditions: 'partly cloudy',
  }),
});

export const weatherAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.5',
  instructions: 'You are a helpful weather assistant.',
  tools: { weather: weatherTool },
});

export type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;`}
      />
      <CodeBlock
        language="tsx"
        filename="app/weather/page.tsx"
        code={`'use client';
import { useChat } from '@ai-sdk/react';
import type { WeatherAgentUIMessage } from '@/agents/weather-agent';

export default function WeatherPage() {
  const { messages, sendMessage } = useChat<WeatherAgentUIMessage>();

  return (
    <div>
      {messages.map((m) =>
        m.parts.map((part, i) => {
          switch (part.type) {
            case 'text':
              return <p key={i}>{part.text}</p>;
            case 'tool-weather':
              // 'part.input' and 'part.output' are both typed
              // from the Zod schemas defined on the tool.
              switch (part.state) {
                case 'input-streaming':
                case 'input-available':
                  return (
                    <p key={i}>Checking weather in {part.input.city}...</p>
                  );
                case 'output-available':
                  return (
                    <p key={i}>
                      {part.output.city}: {part.output.tempC}°C,{' '}
                      {part.output.conditions}
                    </p>
                  );
                case 'output-error':
                  return <p key={i}>Weather lookup failed: {part.errorText}</p>;
              }
          }
        })
      )}
    </div>
  );
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two things to notice. The <code>tool-weather</code>{" "}
        part type is generated from the tool name; add a
        second tool and the switch will get a new case
        automatically. The <code>state</code> field goes
        through four values in order (<code>input-streaming</code>,
        <code>input-available</code>, <code>output-available</code>,
        <code>output-error</code>), so the UI can render
        the tool call live as the model produces the
        arguments, before the tool has even run. This is
        what makes tool invocations feel snappy in the
        browser instead of appearing as a block at the end.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Human-in-the-loop with tool execution approval
      </h2>
      <p className="mb-6 leading-relaxed">
        Any agent that can take real actions (send an email,
        run a shell command, hit a payments API) needs a
        review step. Without it you are trusting the model
        for every call. In v6 the SDK ships the primitive
        for this behind a single flag.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/tools/run-command.ts"
        code={`import { tool } from 'ai';
import { z } from 'zod';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

export const runCommand = tool({
  description: 'Run a shell command',
  inputSchema: z.object({
    command: z.string().describe('The command to execute'),
    args: z.array(z.string()).default([]),
  }),
  // A function decides per-call. Destructive commands always ask.
  needsApproval: async ({ command, args }) => {
    const joined = [command, ...args].join(' ');
    return /rm\\s+-rf|drop\\s+table|shutdown/.test(joined);
  },
  execute: async ({ command, args }) => {
    const { stdout, stderr } = await run(command, args);
    return { stdout, stderr };
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        On the client, an approval-requested state shows up
        in the tool part just like the input and output
        states. The UI renders an approve/deny prompt, the
        user picks one, and the agent resumes.
      </p>
      <CodeBlock
        language="tsx"
        filename="components/CommandToolView.tsx"
        code={`import type {
  UIToolInvocation,
  ChatAddToolApproveResponseFunction,
} from 'ai';
import { runCommand } from '@/tools/run-command';

export function CommandToolView({
  invocation,
  addToolApprovalResponse,
}: {
  invocation: UIToolInvocation<typeof runCommand>;
  addToolApprovalResponse: ChatAddToolApproveResponseFunction;
}) {
  if (invocation.state === 'approval-requested') {
    return (
      <div className="rounded border border-amber-500/40 p-3">
        <p>Run <code>{invocation.input.command}</code>?</p>
        <button
          onClick={() =>
            addToolApprovalResponse({
              id: invocation.approval.id,
              approved: true,
            })
          }
        >
          Approve
        </button>
        <button
          onClick={() =>
            addToolApprovalResponse({
              id: invocation.approval.id,
              approved: false,
            })
          }
        >
          Deny
        </button>
      </div>
    );
  }
  if (invocation.state === 'output-available') {
    return <pre>{invocation.output.stdout}</pre>;
  }
  return null;
}`}
      />
      <p className="mb-6 leading-relaxed">
        Three practical rules we apply on client work.
        First, <strong>default to approval for any write
        path</strong>: sending mail, calling billing, mutating
        production data. Read paths can auto-execute.
        Second, <strong>make the approval message match the
        blast radius</strong>: for a payment tool, show the
        amount and the recipient in bold before the button.
        The default renderer shows the raw JSON; that is
        not enough for a real approval decision. Third,
        <strong>persist approvals per pattern</strong>: if a
        user approved <code>git status</code> once, do not
        ask again. The <code>needsApproval</code> function
        can read a session store.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: connecting external data with OAuth
      </h2>
      <p className="mb-6 leading-relaxed">
        The MCP support in v6 is the piece that made the
        AI SDK a serious option for internal-data agents.
        Where v5 shipped an experimental client, v6 has
        stable HTTP transport, full OAuth with PKCE, and
        support for resources, prompts, and elicitation.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/kb-agent.ts"
        code={`import { createMCPClient } from '@ai-sdk/mcp';
import { ToolLoopAgent } from 'ai';

const mcp = await createMCPClient({
  transport: {
    type: 'http',
    url: 'https://kb.internal.acme.com/mcp',
    headers: { Authorization: \`Bearer \${process.env.KB_TOKEN}\` },
  },
});

const kbTools = await mcp.tools();

export const kbAgent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-4.5',
  instructions:
    'You are a knowledge base assistant. Cite the source URL for every claim.',
  tools: kbTools,
});`}
      />
      <p className="mb-6 leading-relaxed">
        The tools returned by <code>mcp.tools()</code> are
        dynamic: their input schemas are known at runtime,
        not at compile time. The SDK still types them, but
        as the generic <code>dynamic-tool</code> part in
        the UI layer. Static and dynamic tools compose
        cleanly in the same agent; pass both to the{" "}
        <code>tools</code> object and the model sees a
        single tool set.
      </p>
      <p className="mb-6 leading-relaxed">
        For hosted MCP servers that need OAuth, the SDK
        handles the whole flow with an{" "}
        <code>OAuthClientProvider</code> implementation.
        You provide token storage callbacks and the SDK
        does PKCE, dynamic client registration, and refresh.
        This is the piece most teams were writing by hand
        against MCP servers in 2025; being able to delete
        that code is a real win.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DevTools: making the agent loop visible
      </h2>
      <p className="mb-6 leading-relaxed">
        A four-step agent that finishes with the wrong
        answer is a puzzle. Which step drifted? Which tool
        returned garbage? Which prompt was too long? Before
        v6 the answer was <code>onStepFinish</code>{" "}
        callbacks feeding your own logger. Now the SDK
        ships DevTools: a middleware you wrap around your
        model, plus a viewer you launch with{" "}
        <code>npx @ai-sdk/devtools</code>.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/support-agent.ts"
        code={`import { wrapLanguageModel, gateway } from 'ai';
import { devToolsMiddleware } from '@ai-sdk/devtools';
import { ToolLoopAgent } from 'ai';

const model = wrapLanguageModel({
  model: gateway('anthropic/claude-sonnet-4.5'),
  middleware: devToolsMiddleware(),
});

export const supportAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a support agent.',
  tools: {
    /* ... */
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        The viewer shows every step: the exact input the
        model saw, the raw output, token usage, timing, and
        the raw provider request/response bodies. In our
        engagements DevTools is the first thing we enable
        after the first user report of a bad answer. In
        production, the same middleware pattern connects
        to Langfuse, LangSmith, Arize, or a plain
        OpenTelemetry exporter through the language model
        middleware interface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Reliability: strict mode, input examples, and
        toModelOutput
      </h2>
      <p className="mb-6 leading-relaxed">
        Three v6 tool improvements are worth wiring into
        every serious agent.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strict mode</strong> is a per-tool flag that
        forces the provider to validate the model output
        against your schema before sending it back. It
        removes a whole class of runtime failures where the
        model returns almost-valid JSON. It is opt-in per
        tool because not every provider supports every JSON
        schema feature in strict mode; mixed calls used to
        fail entirely, now they degrade per tool.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Input examples</strong> are pairs of
        example inputs you attach to the tool. The model
        sees them alongside the description. For any tool
        with a non-obvious input shape (a date range, a
        nested filter, a domain-specific enum), a few
        examples cut the malformed-call rate more than
        another paragraph of description ever did.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>toModelOutput</strong> separates what your
        tool returns from what the model sees on the next
        turn. If your tool reads a 200KB file, return the
        file to the caller but send the model only the
        relevant slice. This is the single biggest lever
        for token cost on any agent that reads real data.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/tools/read-file.ts"
        code={`import { tool } from 'ai';
import { z } from 'zod';
import { readFile } from 'node:fs/promises';

export const readFileTool = tool({
  description: 'Read a file from disk',
  inputSchema: z.object({
    path: z.string(),
    startLine: z.number().optional(),
    endLine: z.number().optional(),
  }),
  inputExamples: [
    { input: { path: 'src/index.ts' } },
    { input: { path: 'src/index.ts', startLine: 1, endLine: 40 } },
  ],
  strict: true,
  execute: async ({ path, startLine, endLine }) => {
    const contents = await readFile(path, 'utf8');
    const lines = contents.split('\\n');
    return {
      path,
      totalLines: lines.length,
      lines: lines.slice(startLine ?? 0, endLine ?? lines.length),
    };
  },
  // Only send the requested slice to the model.
  toModelOutput: async ({ output }) => ({
    type: 'text',
    value: [
      \`File: \${output.path} (\${output.totalLines} lines)\`,
      output.lines.join('\\n'),
    ].join('\\n'),
  }),
});`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production stacks
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Thomson Reuters, CoCounsel</strong>. The
        legal and accounting AI assistant serves 1,300
        accounting firms today. The team migrated from ten
        provider-specific SDKs onto the AI SDK, dropping
        thousands of lines of custom integration code, and
        rebuilt the whole product with three developers in
        two months. The lesson we take from this: the
        unified provider layer is not a marketing feature.
        For any team that already touches more than one
        LLM vendor, it removes real work.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Clay, Claygent</strong>. Clay ships an AI
        web research agent for sales teams that scrapes
        public data, connects to first-party sources
        through MCP, and finds accounts matching custom
        criteria. Their public quote is worth repeating:
        the TypeScript-first design and the agent
        primitives are the reasons they went all-in on
        the SDK.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Daytona benchmark agent</strong>. A public
        example that shows the shape of a real coding
        agent on the SDK. Five tools (<code>runCode</code>,
        <code>runCommand</code>, <code>writeFile</code>,
        <code>readFile</code>, <code>downloadFile</code>),
        a <code>ToolLoopAgent</code> with{" "}
        <code>stepCountIs(25)</code>, all running inside a
        Daytona sandbox. The agent implements the Sieve of
        Eratosthenes in two languages, benchmarks them, and
        drops a PNG chart plus a markdown report on the
        caller&rsquo;s disk. The whole thing is a couple
        of files.
      </p>
      <p className="mb-6 leading-relaxed">
        Across all three, the pattern is the same. Define
        tools in one file each. Compose them into an
        <code>Agent</code>. Expose the agent through a
        thin route (or a job, or a CLI). Type the
        UI-facing message shape with{" "}
        <code>InferAgentUIMessage</code>. Trace with
        DevTools first, then a hosted observability tool
        once it is in production.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What we learned running these on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Do not fight the context window</strong>.
        The <code>ToolLoopAgent</code> does not truncate
        history for you. Once a long-running chat crosses
        the model&rsquo;s context limit, the model quietly
        stops calling tools and returns plausible text. Add
        a summarisation step in <code>prepareStep</code>{" "}
        that compresses history every N turns, or hand the
        agent the last K messages plus a rolling summary
        as a string.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Cap steps in code AND in the prompt</strong>.
        Set <code>stopWhen: stepCountIs(N)</code> to catch
        the top of the runaway distribution, and tell the
        agent in the system prompt how many tool calls it
        should typically make. Prompt-level caps stop
        runaways happening; hard caps catch the ones that
        slip through anyway.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Use the DevTools middleware in
        development, telemetry in production</strong>.
        DevTools is the fastest way to debug a bad step
        locally. In production, wrap the model with the
        OpenTelemetry middleware (or a hosted equivalent)
        so every run is traced by default. Retrofitting
        tracing after the first incident is painful.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Split tools into read and write</strong>.
        Auto-approve read tools, mark every write tool with{" "}
        <code>needsApproval</code>, and put the risky ones
        (payments, deletes, external notifications) behind
        a per-call approval callback that inspects the
        input. The default should be to ask.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Return the smallest useful thing to the
        model</strong>. Long tool outputs blow up token
        cost and slow down every subsequent step. Use{" "}
        <code>toModelOutput</code> to send the model a
        summary while your application code keeps the full
        payload for the UI or storage.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Persist UIMessages, not
        ModelMessages</strong>. The <code>UIMessage</code>{" "}
        shape carries the tool invocations, data parts,
        and metadata that let you reconstruct the exact
        chat the user saw. Store <code>UIMessage[]</code>{" "}
        in your database; convert to{" "}
        <code>ModelMessage[]</code> only at request time.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Do not put durable state inside a
        ToolLoopAgent</strong>. A request-scoped agent is
        the wrong place for multi-day workflows. When you
        need durability (a booking that spans hours,
        approvals that come days later, retries across
        deploys), reach for the <code>WorkflowAgent</code>{" "}
        pattern below or move that step out of the agent
        loop entirely.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where v7 goes next: subagents, skills, and durable
        execution
      </h2>
      <p className="mb-6 leading-relaxed">
        Version 7, in preview at the time of writing, is
        the release that turns the AI SDK into a full
        agent platform rather than a chat toolkit. Four
        pieces stand out.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Subagents</strong>. The v7 subagent
        primitive lets you spawn a child agent from a
        tool, hand it a narrow brief and its own context,
        and get a summary back. Same orchestrator-worker
        shape that shows up in Anthropic&rsquo;s Claude
        Research write-up and in the Deep Research
        pattern generally, wrapped in one SDK call. Use
        it for context isolation: the parent stays clean,
        the child does the heavy reading, and only the
        cleaned findings flow back up.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>WorkflowAgent</strong>. Built on the
        Vercel Workflow SDK, this is the answer to the
        durable-execution question. A <code>WorkflowAgent</code>{" "}
        looks like a <code>ToolLoopAgent</code> but each
        tool call becomes a retryable, resumable step. If
        the process restarts, if a tool takes hours, if a
        human approval comes back tomorrow, the run picks
        up where it left off. This is the class of work
        that used to require dropping into Temporal,
        Inngest, or Cloudflare Durable Objects.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/workflows/flight-booking.ts"
        code={`import { getWritable } from 'workflow';
import { DurableAgent } from '@workflow/ai/agent';
import { searchFlights, bookFlight, getFlightStatus } from './tools';

export async function flightBookingWorkflow() {
  'use workflow';

  const flightAgent = new DurableAgent({
    model: 'anthropic/claude-sonnet-4.5',
    system: 'You are a flight booking assistant.',
    tools: { searchFlights, bookFlight, getFlightStatus },
  });

  await flightAgent.generate({
    prompt: 'Find me a flight from NYC to London next Friday.',
    writable: getWritable(),
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Policy-based tool approvals</strong>. The{" "}
        <code>@ai-sdk/policy-opa</code> package binds tool
        approvals to Open Policy Agent, so authorization
        for tool calls is expressed as Rego policy, not
        buried in <code>needsApproval</code> callbacks.
        For any team that already runs OPA for API
        authorization, this makes agent policies part of
        the same review pipeline as everything else.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skills and harnesses</strong>. Skill uploads
        let you attach a bundle of tools, prompts, and
        example inputs that the agent can load on demand,
        similar to Anthropic Skills but framework-native.
        <code>HarnessAgent</code> plus harness adapters lets
        you drop the SDK into an existing agent runtime
        (OpenAI Codex, Claude Code, or your own harness)
        without rewriting the loop. The terminal UI
        harness gives you a CLI agent in a few dozen lines.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AI SDK vs LangGraph vs OpenAI Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The three questions that come up on every project.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AI SDK vs LangGraph</strong>. LangGraph 1.0
        went stable in October 2025 and is the reference
        durable agent framework, running production
        agents at Uber, LinkedIn, and Klarna. It is
        graph-first: you model your agent as nodes and
        edges, with explicit checkpoints and time-travel.
        That is the right shape for multi-day workflows
        with complex branching, and less right for a
        request-scoped chat agent where a linear loop is
        enough. The rough rule we use: if the agent
        finishes within one request and one user session,
        the AI SDK is faster to build. If the agent runs
        across days or spawns branching sub-workflows
        that need to survive restarts, LangGraph
        (or v7&rsquo;s <code>WorkflowAgent</code>) is a
        better fit. Some teams run both: the AI SDK for the
        user-facing part, LangGraph for the durable
        backend.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AI SDK vs OpenAI Agents SDK</strong>. The
        OpenAI Agents SDK, built on top of the OpenAI
        Responses API, is the tightest integration with
        OpenAI-hosted tools: web search, file search,
        computer use, code interpreter, hosted MCP. If
        your product is OpenAI-only and you want the
        hosted tools without wiring them yourself, the
        Agents SDK is a lower-friction path. The AI SDK
        wins the moment you touch a second provider (which
        is almost every serious project by now) or when
        you want the same agent code to run in a browser
        extension, a Node worker, and a Next.js route.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AI SDK vs a plain custom loop</strong>. If
        you started writing your own tool-calling loop in
        2024 and it works, migrating to the AI SDK is a
        real cost. The trade you get is: the loop code
        goes away, the type safety extends into the UI, and
        every new SDK feature (DevTools, tool approval,
        MCP with OAuth, subagents) lands for free. On new
        projects there is no reason to write the loop
        yourself.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limits
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Where the AI SDK is the right pick</strong>.
        Any Next.js or Node.js product that ships an agent.
        Any team that wants one language across the model
        call, the agent loop, and the UI. Any project that
        uses more than one model provider. Any chat surface
        where tool invocations, streaming updates, and
        typed data parts are user-facing. The three points
        that make it sticky are the unified provider layer,
        the end-to-end type flow, and the low ceiling
        between the high-level agent class and the low-
        level primitives.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Where to look elsewhere</strong>. Multi-day
        durable workflows with complex branching are still
        better on a purpose-built durable engine
        (LangGraph, Temporal, Inngest) until{" "}
        <code>WorkflowAgent</code> is out of preview and
        battle-tested. If your whole stack is Python, the
        cost of adding a TypeScript agent surface just for
        the SDK is real: LangGraph, Pydantic AI, or the
        OpenAI Agents SDK stay in Python and keep the
        team focused. If your agent needs to run entirely
        client-side, in a browser extension with no
        backend, the transport layer supports it, but the
        API keys have to live somewhere, and the AI Gateway
        does not remove that problem for you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: TypeScript is a first-class agent
        language now
      </h2>
      <p className="mb-6 leading-relaxed">
        The Vercel AI SDK closed the gap between the
        TypeScript web stack and the Python-dominant agent
        world. The v5 primitives gave you the loop. The v6
        <code>ToolLoopAgent</code> gave you the reusable
        abstraction, tool approval, and stable MCP. The v7
        preview gives you subagents, durable execution, and
        policy-based approvals. Along the way, the type
        system tied the model call, the agent loop, and the
        React UI together, which is the property no other
        framework quite matches.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements we now default to the AI SDK for
        any agent that lives inside a web product. It is
        faster to build, easier to hand off, and the same
        team owns the UI and the agent. When the workload
        pushes into multi-day durable execution or into a
        Python-first data platform, we still reach for
        LangGraph or Pydantic AI. But that is a smaller
        share of the work each quarter than it used to be,
        and the direction of travel is clear: TypeScript
        is a first-class agent language now, and the AI
        SDK is where that story starts.
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
            Vercel: AI SDK 5 (August 5, 2025)
          </a>
          {" "}- the launch post for the agent primitives
          (<code>stopWhen</code>, <code>prepareStep</code>,
          experimental Agent), typed UI messages, data
          parts, dynamic tools, and the V2 provider
          specifications.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ai-sdk-6"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 6 (December 22, 2025)
          </a>
          {" "}- the release post covering{" "}
          <code>ToolLoopAgent</code>, call options,
          tool execution approval, strict mode, input
          examples, <code>toModelOutput</code>, DevTools,
          reranking, and full MCP with OAuth.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK: Agents documentation
          </a>
          {" "}- the current docs covering the Agent
          interface, workflow patterns, loop control, tool
          approvals, subagents, and <code>WorkflowAgent</code>.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK reference: ToolLoopAgent
          </a>
          {" "}- the full constructor reference with
          streaming, output parsing, and step inspection
          examples.
        </li>
        <li>
          <a
            href="https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel KB: How to build AI Agents with the AI SDK
          </a>
          {" "}- the deployment guide with a working
          tool-calling agent behind a Next.js route,
          including the <code>maxDuration</code> setting
          you need for longer runs on Vercel.
        </li>
        <li>
          <a
            href="https://www.daytona.io/docs/en/guides/vercel-ai-sdk/vercel-ai-sdk-multi-language-benchmark-agent-sandbox/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daytona: Multi-language benchmark agent with
            the AI SDK
          </a>
          {" "}- a real coding agent example that pairs
          <code>ToolLoopAgent</code> with a sandboxed
          runtime, five tools, and streamed progress.
        </li>
        <li>
          <a
            href="https://www.developersdigest.tech/blog/vercel-ai-sdk-6-vs-langgraph-typescript-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developers Digest: AI SDK 6 vs LangGraph 1.0
          </a>
          {" "}- side-by-side comparison of the two
          TypeScript agent options, with production
          adoption numbers.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            Building production RAG systems with Next.js,
            LangChain, and the Vercel AI SDK
          </a>
          {" "}- the sibling article on the RAG side of the
          same stack.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol the AI SDK talks to when the
          agent needs private data.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the durable graph-first alternative for
          long-running agents.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the OpenAI-first alternative and where it
          fits.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story you plug into
          the AI SDK middleware layer.
        </li>
      </ul>
    </div>
  );
}
