import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "vercel-ai-sdk-6-production-agents-2026",
  title:
    "Vercel AI SDK 6 for production AI agents in 2026: from ToolLoopAgent to durable workflows",
  excerpt:
    "How the Vercel AI SDK went from a chat helper in 2023 to the default TypeScript toolkit for agents in 2026. Covers the new Agent interface, ToolLoopAgent, tool execution approval, structured outputs inside tool loops, full MCP support, DevTools, and the DurableAgent pattern from Workflow DevKit.",
  metaDescription:
    "A practical, technical guide to Vercel AI SDK 6 for production AI agents in 2026. Covers the Agent interface, ToolLoopAgent, call options, tool execution approval, strict mode, input examples, toModelOutput, MCP OAuth and elicitation, reranking, DevTools, and durable resumable agents through Workflow DevKit. Includes real-world adoption at Thomson Reuters CoCounsel and Clay, the shift from streamText to composable agents, and the trade-offs against LangGraph, Mastra, and the OpenAI Agents SDK.",
  image:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Vercel",
    "AI SDK",
    "TypeScript",
    "Next.js",
    "MCP",
    "Production",
    "Workflow DevKit",
  ],
  publishDate: "2026-07-28",
  readingTime: "15 min read",
};

export default function VercelAiSdk6ProductionAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For a long time the Vercel AI SDK was the fastest
        path to a streaming chat UI in Next.js and not much
        more. That changed in July 2025 when AI SDK 5 landed
        with the typed UIMessage pipeline and a real
        tool-calling loop, and it changed again with AI SDK 6,
        which ships a first-class Agent interface, tool
        execution approval, full MCP support, reranking, and
        a set of DevTools that finally make agent runs
        debuggable in the browser. On client work we now
        default to the AI SDK for any TypeScript agent that
        lives in a Next.js or Node app, and this article is
        the read on what changed, what the new APIs actually
        do, and where they still hit a wall.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the AI SDK became the default TypeScript agent
        toolkit
      </h2>
      <p className="mb-6 leading-relaxed">
        Three numbers set the context. The AI SDK is now
        past 20 million monthly downloads and 18 million
        weekly, sits at over 25,000 GitHub stars, and covers
        more than 100 models through a single unified
        provider surface. Thomson Reuters shipped CoCounsel,
        their assistant for attorneys and audit teams, with
        three developers in two months and are now moving
        their whole codebase onto the SDK. Clay built
        Claygent, an AI web research agent that runs across
        thousands of accounts, on the same primitives. When
        a TypeScript project needs to call an LLM in 2026,
        the AI SDK is the assumption, not the choice.
      </p>
      <p className="mb-6 leading-relaxed">
        The other reason the SDK matters is that production
        traffic has gone agentic. The April 2026 AI Gateway
        production index from Vercel reports that 22.2% of
        all requests through the gateway end in a tool call,
        up from 11.4% in October 2025. Measured by tokens
        the shift is much bigger: tool-call requests now
        carry 58.9% of all tokens, up from 31.6% six months
        earlier. In other words, tool-using agent calls are
        about 2.6 times more token-heavy than plain chat,
        and the cost surface of AI apps is now dominated by
        them. Whatever you use to write those calls has to
        make the agent path first class, and that is the gap
        AI SDK 6 fills.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2023 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>June 2023</strong>: First release of the
          AI SDK as a thin streaming helper for Next.js. The
          headline API is <code>useChat</code> and a set of
          route handlers that pipe an OpenAI stream to the
          browser.
        </li>
        <li>
          <strong>Late 2024</strong>: AI SDK 4 broadens
          provider coverage, adds <code>generateObject</code>
          for structured output, and introduces the first
          version of <code>tool</code> and multi-step tool
          calling loops with <code>maxSteps</code>.
        </li>
        <li>
          <strong>July 31, 2025</strong>: AI SDK 5 ships. The
          release rewrites the message type into{" "}
          <code>UIMessage</code> and <code>ModelMessage</code>,
          moves tool calls to typed message parts, and adds
          the <code>stopWhen</code> loop-control primitive
          and <code>prepareStep</code> callbacks. This is the
          version where the SDK stops looking like a chat
          helper and starts looking like an agent runtime.
        </li>
        <li>
          <strong>Late 2025</strong>: Anthropic, OpenAI, and
          Google converge on MCP as the standard way to
          expose tools to models. The AI SDK follows with an{" "}
          <code>@ai-sdk/mcp</code> package.
        </li>
        <li>
          <strong>2026</strong>: AI SDK 6 ships the{" "}
          <code>Agent</code> interface,{" "}
          <code>ToolLoopAgent</code>, tool execution approval,
          strict mode per tool, input examples, structured
          outputs inside the tool loop, DevTools, reranking,
          and the extension point that Workflow DevKit uses
          for <code>DurableAgent</code>. It is the first
          release where the SDK cleanly separates the
          low-level primitives from a reusable agent
          abstraction.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: the shape of AI SDK 6
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK is layered. Underneath sit the provider
        adapters and the unified language model interface.
        Above that live the core functions:{" "}
        <code>generateText</code>, <code>streamText</code>,
        <code>generateObject</code>, and{" "}
        <code>streamObject</code>. In v5 those were the top
        of the API. In v6 there is a new layer on top of
        them: the <code>Agent</code> interface and the
        default <code>ToolLoopAgent</code> implementation.
        On the other side of the wire sits AI SDK UI,
        anchored by <code>useChat</code> in React, Svelte,
        Vue, and Angular, with typed message parts that flow
        from the agent to the browser without a hand-rolled
        adapter.
      </p>
      <CodeBlock
        language="bash"
        filename="AI SDK 6: the layered shape of the toolkit"
        code={`+-----------------------------------------------------------+
|  UI layer (AI SDK UI)                                     |
|    useChat<AgentUIMessage>, message parts, tool           |
|    approval helpers, generative UI                        |
+-----------------------------------------------------------+
|  Agent layer  (new in v6)                                 |
|    Agent interface, ToolLoopAgent, DurableAgent,          |
|    callOptionsSchema, prepareCall, InferAgentUIMessage    |
+-----------------------------------------------------------+
|  Core layer                                               |
|    generateText, streamText, generateObject, tool(),      |
|    Output.object, stopWhen, prepareStep, rerank           |
+-----------------------------------------------------------+
|  Provider layer                                           |
|    @ai-sdk/openai, @ai-sdk/anthropic, @ai-sdk/google,     |
|    @ai-sdk/mcp, AI Gateway string routing                 |
+-----------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The important shift in v6 is that <code>Agent</code>
        is an interface, not a class. <code>ToolLoopAgent</code>
        is the default implementation, and it covers the
        canonical case: call the model, run any tools it
        asks for, feed results back into the conversation,
        and repeat until a stop condition trips. But because
        the surface is an interface, third parties can ship
        their own agents that plug into the same UI helpers
        and the same typed message pipe. Workflow DevKit
        does this with <code>DurableAgent</code>, which
        wraps the same shape in a resumable workflow so a
        function timeout does not throw away an hour of
        research.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The ToolLoopAgent, end to end
      </h2>
      <p className="mb-6 leading-relaxed">
        The smallest useful <code>ToolLoopAgent</code> is a
        handful of lines. Define a tool with a Zod input
        schema and an <code>execute</code> function, pass it
        to the agent alongside a model string and system
        instructions, and call <code>generate</code> or
        <code>stream</code>. Everything about the loop -
        parsing tool arguments, running the tool, appending
        the result, calling the model again, deciding when
        to stop - is inside the class.
      </p>
      <CodeBlock
        language="typescript"
        filename="agents/weather-agent.ts"
        code={`import { ToolLoopAgent, tool, stepCountIs } from "ai";
import { z } from "zod";

const weatherTool = tool({
  description: "Get the weather in a location",
  inputSchema: z.object({
    location: z.string().describe("City name, e.g. San Francisco"),
  }),
  execute: async ({ location }) => {
    const res = await fetch(
      \`https://api.example.com/weather?q=\${encodeURIComponent(location)}\`,
    );
    return (await res.json()) as { temperature: number; conditions: string };
  },
});

export const weatherAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-4.5",
  instructions: "You are a helpful weather assistant.",
  tools: { weather: weatherTool },
  // Default stop rule is 20 steps; pin it explicitly for prod.
  stopWhen: stepCountIs(10),
});

const result = await weatherAgent.generate({
  prompt: "What is the weather in San Francisco?",
});

console.log(result.text);`}
      />
      <p className="mb-6 leading-relaxed">
        A few details are worth pulling out. The model is a
        string, not an object, because the SDK resolves it
        through the AI Gateway by default. Swap{" "}
        <code>anthropic/claude-sonnet-4.5</code> for{" "}
        <code>openai/gpt-5.5</code> or{" "}
        <code>google/gemini-3-pro</code> and the rest of the
        code does not change. The <code>stopWhen</code>
        primitive is the loop-control knob that keeps a
        stuck agent from running through your budget:
        <code>stepCountIs</code>, <code>hasToolCall</code>,
        <code>textIncludes</code>, and custom predicates all
        compose. And the tool <code>execute</code> function
        is regular async TypeScript, so any HTTP call, DB
        query, or SDK you already have wraps into a tool in
        one function.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Call options and prepareCall: one agent, many
        contexts
      </h2>
      <p className="mb-6 leading-relaxed">
        The single biggest reason to move from{" "}
        <code>streamText</code> to <code>ToolLoopAgent</code>
        is code reuse. Once an agent is a named object, the
        same definition powers a chat UI, a background job,
        and a webhook. The gap in v5 was that per-request
        context - user IDs, feature flags, account tier -
        had to be threaded through by hand. Call options
        close that gap.
      </p>
      <CodeBlock
        language="typescript"
        filename="agents/support-agent.ts"
        code={`import { ToolLoopAgent } from "ai";
import { z } from "zod";
import { lookupCustomer, createTicket } from "@/tools/support";

export const supportAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-4.5",
  tools: { lookupCustomer, createTicket },
  callOptionsSchema: z.object({
    userId: z.string(),
    accountType: z.enum(["free", "pro", "enterprise"]),
    tenantId: z.string(),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions: [
      "You are a helpful customer support agent.",
      \`Account type: \${options.accountType}\`,
      \`User ID: \${options.userId}\`,
      options.accountType === "free"
        ? "Do not offer refunds above $50 without escalation."
        : "Full refund authority.",
    ].join("\\n"),
    // prepareCall can also swap the model, add per-call
    // tools, or set provider options.
    model:
      options.accountType === "enterprise"
        ? "anthropic/claude-opus-5"
        : "anthropic/claude-sonnet-4.5",
  }),
});

const result = await supportAgent.generate({
  prompt: "How do I upgrade my account?",
  options: {
    userId: "user_123",
    accountType: "pro",
    tenantId: "acme",
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>callOptionsSchema</code> gives you a Zod
        schema for the extra arguments, and{" "}
        <code>prepareCall</code> receives typed options and
        returns the settings the loop actually runs with.
        This is the primitive we use for per-tenant instructions,
        model tiering by plan, and RAG context injection: fetch
        the documents in <code>prepareCall</code>, splice them
        into the system message, and the rest of the loop is
        untouched.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Wiring the agent to a Next.js route and the useChat
        hook
      </h2>
      <p className="mb-6 leading-relaxed">
        The value of putting agents behind a typed interface
        shows up on the client. In v6 the agent file exports
        both the agent and a UI message type derived from
        its tool set. The API route uses{" "}
        <code>createAgentUIStreamResponse</code> to expose
        the agent as a stream, and the React component types
        <code>useChat</code> with the same message type so
        the tool parts are known to the compiler.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/api/chat/route.ts"
        code={`import { createAgentUIStreamResponse } from "ai";
import { weatherAgent, WeatherAgentUIMessage } from "@/agents/weather-agent";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    messages: WeatherAgentUIMessage[];
  };

  return createAgentUIStreamResponse({
    agent: weatherAgent,
    uiMessages: messages,
  });
}`}
      />
      <CodeBlock
        language="tsx"
        filename="app/chat/page.tsx"
        code={`"use client";

import { useChat } from "@ai-sdk/react";
import type { WeatherAgentUIMessage } from "@/agents/weather-agent";
import { WeatherToolView } from "@/components/weather-tool-view";

export default function Chat() {
  const { messages, sendMessage, status } =
    useChat<WeatherAgentUIMessage>();

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <p key={i}>{part.text}</p>;
              case "tool-weather":
                return <WeatherToolView key={i} invocation={part} />;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = new FormData(e.currentTarget).get("q") as string;
          sendMessage({ text: input });
          e.currentTarget.reset();
        }}
      >
        <input name="q" className="border p-2" />
        <button disabled={status !== "ready"}>Send</button>
      </form>
    </div>
  );
}`}
      />
      <p className="mb-6 leading-relaxed">
        The switch on <code>part.type</code> is the
        important idea. The message parts include{" "}
        <code>text</code>, <code>tool-*</code> for every
        tool the agent knows about, and <code>file</code>
        for attachments. Because the type is inferred from
        the agent, a typo in the tool name is a compile
        error, and every tool part carries the correct
        input and output types. This is the piece that made
        us stop hand-rolling stream parsers on client work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Tool execution approval: the human-in-the-loop
        primitive
      </h2>
      <p className="mb-6 leading-relaxed">
        Any agent that can do real damage - delete files,
        run shell commands, move money, modify production
        data - needs a gate. In v5 you built the gate
        yourself: pause the loop, ask the user, resume. In
        v6 a single <code>needsApproval</code> flag on the
        tool does it.
      </p>
      <CodeBlock
        language="typescript"
        filename="tools/run-command.ts"
        code={`import { tool } from "ai";
import { z } from "zod";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const runCommand = tool({
  description: "Run a shell command in the workspace.",
  inputSchema: z.object({
    command: z.string().describe("The shell command to execute"),
  }),
  // Function form: gate only on destructive commands.
  needsApproval: async ({ command }) => {
    const destructive = /\\b(rm|dd|mkfs|drop|delete)\\b/i;
    return destructive.test(command);
  },
  execute: async ({ command }) => {
    const [bin, ...args] = command.split(" ");
    const { stdout, stderr } = await execFileAsync(bin, args);
    return { stdout, stderr };
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        On the client, the tool part enters an{" "}
        <code>approval-requested</code> state and the UI
        renders whatever buttons you want. Calling
        <code>addToolApprovalResponse</code> with{" "}
        <code>approved: true</code> resumes the agent from
        the exact point it paused.
      </p>
      <CodeBlock
        language="tsx"
        filename="components/command-tool-view.tsx"
        code={`import { UIToolInvocation } from "ai";
import { ChatAddToolApproveResponseFunction } from "@ai-sdk/react";
import { runCommand } from "@/tools/run-command";

export function CommandToolView({
  invocation,
  addToolApprovalResponse,
}: {
  invocation: UIToolInvocation<typeof runCommand>;
  addToolApprovalResponse: ChatAddToolApproveResponseFunction;
}) {
  if (invocation.state === "approval-requested") {
    return (
      <div className="rounded border p-3">
        <p>
          Run command: <code>{invocation.input.command}</code>?
        </p>
        <div className="flex gap-2">
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
      </div>
    );
  }

  if (invocation.state === "output-available") {
    return (
      <pre className="whitespace-pre-wrap text-xs">
        {invocation.output.stdout}
      </pre>
    );
  }

  return null;
}`}
      />
      <p className="mb-6 leading-relaxed">
        The reason this matters is that safety used to be a
        four-file change: pause the stream, persist the
        pending call, ship a UI, resume with the answer,
        thread the approval through the loop. In v6 it is
        one flag and one component. Every agent we ship that
        touches production data now runs with{" "}
        <code>needsApproval</code> on the destructive tools,
        and the pattern held on the first deployment.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Better tools: strict mode, input examples, and
        toModelOutput
      </h2>
      <p className="mb-6 leading-relaxed">
        Three smaller improvements in v6 are worth pinning
        because they land directly in the failure modes we
        see on client work.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strict mode per tool</strong>. Native strict
        mode from OpenAI and other providers guarantees that
        the tool input matches your schema exactly, but the
        support covers only a subset of JSON Schema. In v5
        strict mode was all-or-nothing per request. In v6
        you set <code>strict: true</code> on each tool that
        has a compatible schema and leave the rest in
        regular mode. No more choosing between reliable
        input generation and a schema feature you actually
        need.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Input examples</strong>. Complex tool
        schemas with nested objects or domain-specific
        formats often confuse the model. Adding a couple of
        concrete examples in the tool definition -{" "}
        <code>inputExamples: [&#123; input: &#123; ... &#125; &#125;]</code>{" "}
        - gives the model a direct target. Anthropic
        supports them natively; for providers that do not,
        the middleware <code>addToolInputExamplesMiddleware</code>{" "}
        appends them to the tool description.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>toModelOutput</strong>. A tool that reads a
        50-page PDF returns a lot of text. The default
        behaviour is to stringify the whole return value
        into the next model turn, which burns context and
        tokens. The <code>toModelOutput</code> hook
        separates what the tool returns to your app from
        what goes back to the model. Return the full data
        for downstream code; send a compressed summary or a
        typed image part back to the LLM.
      </p>
      <CodeBlock
        language="typescript"
        filename="tools/read-pdf.ts"
        code={`import { tool } from "ai";
import { z } from "zod";
import { parsePdf } from "@/lib/pdf";

export const readPdf = tool({
  description: "Read a PDF file and return its text.",
  inputSchema: z.object({ path: z.string() }),
  execute: async ({ path }) => {
    const { text, pageCount } = await parsePdf(path);
    // Full text returned to app code.
    return { text, pageCount };
  },
  toModelOutput: async ({ output }) => {
    // Only send a short summary back to the model.
    const preview = output.text.slice(0, 1500);
    return {
      type: "text",
      value: \`PDF with \${output.pageCount} pages. First 1500 chars:\\n\${preview}\`,
    };
  },
});`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: OAuth, resources, prompts, and elicitation
      </h2>
      <p className="mb-6 leading-relaxed">
        Model Context Protocol is now the standard way to
        expose tools and data to LLMs across Anthropic,
        OpenAI, and Google. The AI SDK 6 MCP client is
        stable in the <code>@ai-sdk/mcp</code> package and
        covers the four things that matter in production:
        HTTP transport, full OAuth with PKCE and token
        refresh, resources and prompt templates, and
        server-initiated elicitation.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/mcp.ts"
        code={`import { createMCPClient, auth } from "@ai-sdk/mcp";
import type { OAuthClientProvider } from "@ai-sdk/mcp";
import { kv } from "@/lib/kv";

const authProvider: OAuthClientProvider = {
  redirectUrl: "https://app.example.com/callback",
  clientMetadata: {
    client_name: "Reactify App",
    redirect_uris: ["https://app.example.com/callback"],
    grant_types: ["authorization_code", "refresh_token"],
  },
  tokens: async () => kv.get("mcp:tokens:acme"),
  saveTokens: async (t) => kv.set("mcp:tokens:acme", t),
};

await auth(authProvider, {
  serverUrl: new URL("https://mcp.acme.com"),
});

export const acmeMcp = await createMCPClient({
  transport: {
    type: "http",
    url: "https://mcp.acme.com",
    authProvider,
  },
});

// Use the tools inside an agent.
export const acmeTools = await acmeMcp.tools();`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Elicitation</strong> is the one to watch. It
        lets an MCP server request a piece of user input
        mid-run - a confirmation, a choice, a missing
        parameter - and the client responds with the answer.
        In practice this is how a well-designed MCP server
        avoids either dumping every parameter up front or
        silently making a bad choice. Wire{" "}
        <code>onElicitationRequest</code> to a modal or a
        chat prompt and the model can ask real questions on
        the way.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Structured output inside the tool loop
      </h2>
      <p className="mb-6 leading-relaxed">
        In v5 you chained <code>generateText</code> and{" "}
        <code>generateObject</code> to end a tool loop with
        a typed object. In v6 the two are unified. Pass an
        <code>Output.object(...)</code> to the agent and the
        loop runs tools to completion then produces the
        structured payload as the last step.
      </p>
      <CodeBlock
        language="typescript"
        filename="agents/summary-agent.ts"
        code={`import { Output, ToolLoopAgent, tool } from "ai";
import { z } from "zod";

const search = tool({
  description: "Search internal knowledge base",
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    return { docs: await fetchDocs(query) };
  },
});

export const summaryAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-4.5",
  tools: { search },
  output: Output.object({
    schema: z.object({
      summary: z.string(),
      keyPoints: z.array(z.string()),
      sourceIds: z.array(z.string()),
    }),
  }),
});

const { output } = await summaryAgent.generate({
  prompt: "Summarise our Q1 2026 revenue policy.",
});

// output is fully typed.
console.log(output.summary);
console.log(output.keyPoints);`}
      />
      <p className="mb-6 leading-relaxed">
        <code>Output</code> ships several helpers:{" "}
        <code>object</code> for typed structures,{" "}
        <code>array</code> for lists, <code>choice</code>
        for enum-like selection, <code>json</code> for
        unstructured JSON, and <code>text</code> for the
        default. The one that pays off fastest is{" "}
        <code>choice</code> for routing agents: instead of
        parsing a free-form answer, force the model to pick
        one of a fixed set.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DevTools: agent runs you can debug in the browser
      </h2>
      <p className="mb-6 leading-relaxed">
        Multi-step agent runs are hard to reason about from
        server logs. A small change in the system prompt or
        an added tool alters the trajectory two steps later,
        and the only fix is to see the full sequence. AI SDK
        DevTools ships that view. Wrap the model with{" "}
        <code>devToolsMiddleware</code>, run{" "}
        <code>npx @ai-sdk/devtools</code>, and open{" "}
        <code>http://localhost:4983</code>.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/model.ts"
        code={`import { wrapLanguageModel, gateway } from "ai";
import { devToolsMiddleware } from "@ai-sdk/devtools";

export const devModel = wrapLanguageModel({
  model: gateway("anthropic/claude-sonnet-4.5"),
  middleware: devToolsMiddleware(),
});`}
      />
      <p className="mb-6 leading-relaxed">
        The DevTools UI shows every step of every call: the
        input, the raw provider request and response, the
        model config, the tool arguments and results, the
        token count, and the timing. On our own work this
        replaced roughly a hundred lines of custom logging
        per project. It does not replace a real tracing
        backend for production - we still ship traces to
        OpenTelemetry or LangSmith for post-hoc analysis -
        but for local debugging it is the fastest way to see
        why an agent picked the wrong branch.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Reranking: the small piece of the RAG story the SDK
        was missing
      </h2>
      <p className="mb-6 leading-relaxed">
        Any RAG pipeline that retrieves more than a few
        chunks benefits from a reranker between retrieval
        and the LLM call. Until v6 you rolled your own or
        called Cohere directly. AI SDK 6 adds a native{" "}
        <code>rerank</code> function with support for
        Cohere, Amazon Bedrock, and Together.ai out of the
        box.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/rag.ts"
        code={`import { rerank } from "ai";
import { cohere } from "@ai-sdk/cohere";

export async function retrieveAndRerank(query: string) {
  const raw = await vectorSearch(query, { topK: 40 });
  const { rerankedDocuments } = await rerank({
    model: cohere.reranking("rerank-v3.5"),
    documents: raw.map((r) => ({
      id: r.id,
      subject: r.subject,
      text: r.text,
    })),
    query,
    topN: 6,
  });
  return rerankedDocuments;
}`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern we ship is: retrieve 30-50 chunks by
        vector similarity, rerank to the top 5-8 with a
        cross-encoder, then hand only those to the LLM. On
        the last three RAG projects the delta was 12-18%
        answer-quality points on our internal evals, and the
        added latency is under 300ms in most cases.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Durable agents: surviving function timeouts with
        Workflow DevKit
      </h2>
      <p className="mb-6 leading-relaxed">
        A serious agent run - deep research, a multi-file
        code edit, a scheduled job that spans dozens of
        steps - runs for tens of minutes and cannot fit
        inside a serverless function invocation. The v6
        answer is that <code>Agent</code> is an interface,
        and Vercel&rsquo;s Workflow DevKit ships{" "}
        <code>DurableAgent</code>, an implementation that
        turns each step into a durable, retryable, resumable
        workflow step.
      </p>
      <CodeBlock
        language="typescript"
        filename="workflows/flight-booking.ts"
        code={`import { getWritable } from "workflow";
import { DurableAgent } from "@workflow/ai/agent";
import {
  searchFlights,
  bookFlight,
  getFlightStatus,
} from "@/tools/flights";

export async function flightBookingWorkflow(userQuery: string) {
  "use workflow";

  const agent = new DurableAgent({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a flight booking assistant.",
    tools: { searchFlights, bookFlight, getFlightStatus },
  });

  const result = await agent.generate({
    prompt: userQuery,
    writable: getWritable(),
  });

  return result;
}`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>&quot;use workflow&quot;</code> directive
        turns the function into a workflow that can suspend,
        resume, and retry each tool step independently. If a
        function times out on step 8 of 15, step 8 replays
        from its input, not the whole run. If the user
        closes the tab, the stream picks up from the same
        point on reconnect. This is the missing piece that
        made us stop building custom queue workers on top of
        the SDK for long-running agents.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Thomson Reuters CoCounsel</strong>. Three
        engineers, two months, one AI assistant for lawyers,
        accountants, and audit teams. Now serving 1,300
        accounting firms, and the team is moving their
        whole codebase onto the AI SDK, retiring thousands
        of lines of provider-specific code across ten
        providers into one composable path.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Clay Claygent</strong>. An AI web research
        agent that scrapes public data, connects to
        first-party sources through MCP, and helps sales
        teams find accounts. Clay went all in on the AI SDK
        because the typed agentic surface let them scale a
        research agent with 40+ tools without rebuilding the
        loop for every new integration.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Chat SDK</strong>. Vercel&rsquo;s
        open-source Next.js template for chatbot apps ships
        the new tool execution approval flow as the default,
        so a team starting from the template gets
        human-in-the-loop safety on destructive tools
        without writing a single line of approval logic.
      </p>
      <p className="mb-6 leading-relaxed">
        On client work we have shipped four AI SDK 5-then-6
        products in the last twelve months: a research agent
        for a consulting firm, an internal support agent
        with per-tenant tools, a code-review agent that runs
        as a Slack app, and a document-drafting agent for a
        legal team. The pattern that shows up in every one
        is the same. Start with{" "}
        <code>ToolLoopAgent</code> and a small set of tools,
        move to <code>DurableAgent</code> once a run crosses
        the function timeout, add <code>needsApproval</code>
        on the destructive tools before the first real user,
        and wire DevTools locally on day one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and where the SDK still hits a wall
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>What the SDK is best at</strong>. Any
        TypeScript app that already lives in Next.js, Node,
        Svelte, Vue, or Angular. Any chat surface that
        needs typed message parts and streaming without a
        custom parser. Any agent that fits inside a single
        function invocation or - with Workflow DevKit - a
        durable step chain. Provider portability, because
        the model string swaps without touching agent code.
        Fast iteration on tools, because the tool shape is a
        function plus a Zod schema and nothing else.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Where it hits a wall</strong>. Python-only
        stacks - pick Pydantic AI, LangGraph, or the OpenAI
        Agents SDK instead. Multi-agent orchestration with
        explicit graph state, handoffs, and checkpoints
        across many nodes is doable in the SDK but
        LangGraph does it more cleanly if the graph is the
        product. Batch jobs that need queue-native retries
        and dead-letter handling belong on a real workflow
        engine like Inngest or Temporal - though{" "}
        <code>DurableAgent</code> narrows this gap. Agents
        with a heavy on-prem or air-gapped requirement will
        want to look at NVIDIA AI-Q or a LangGraph fork; the
        AI SDK assumes network egress to a provider or the
        AI Gateway.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Vercel AI SDK vs LangGraph vs Mastra vs the OpenAI
        Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The TypeScript agent space has settled into three
        real options in 2026, plus a special case.{" "}
        <strong>Vercel AI SDK</strong> is the default when
        the agent lives inside a web app - the typed{" "}
        <code>useChat</code> integration, the AI Gateway,
        and the Next.js runtime story win here.{" "}
        <strong>Mastra</strong> is the strongest match when
        the app is agent-first from day one and wants
        workflows, evals, and memory as built-ins rather
        than assembled pieces.{" "}
        <strong>LangGraph JS</strong> is where we go when
        the agent is a genuine multi-node graph -
        supervisor plus sub-agents plus checkpoints - and
        the graph is the source of truth. The{" "}
        <strong>OpenAI Agents SDK</strong> is the special
        case: pick it when the agent lives entirely inside
        the OpenAI ecosystem, uses the Responses API,
        and benefits from the built-in Handoffs and
        Guardrails patterns.
      </p>
      <p className="mb-6 leading-relaxed">
        None of these is a total replacement for the
        others. We have shipped stacks where the AI SDK
        powers the client and a Python LangGraph service
        handles a specific research subgraph, or where
        Mastra runs the background jobs and the AI SDK owns
        the streaming UI. The provider-agnostic model string
        makes this cheap: same model tier, same tools, two
        runtimes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends through the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Agents as the default request shape</strong>.
        The AI Gateway index shows tool-call requests
        already carry 58.9% of tokens. Expect that to cross
        70% by year end as more product teams move from
        chat-shaped features to agent-shaped ones. The API
        primitives will follow: streaming, caching, and
        pricing tiers optimised for the tool-call chain, not
        the one-shot chat.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Durable agents everywhere</strong>. Workflow
        DevKit&rsquo;s <code>DurableAgent</code> is the
        first mainstream example of an agent that survives a
        cold start. Expect the pattern to spread - Cloudflare
        Agents, Inngest, and Temporal already have their own
        takes - and expect the AI SDK to keep the interface
        so any of them can plug in.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP as the tool marketplace</strong>. Once
        the AI SDK ships full OAuth and elicitation and the
        three big providers all speak MCP, the way you add a
        capability to an agent stops being &ldquo;write a
        tool&rdquo; and starts being &ldquo;connect a
        server.&rdquo; The 2026 tail of this shift is
        agent-specific SaaS: a Stripe MCP server, a Linear
        MCP server, a Sentry MCP server, all with the same
        client surface.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Structured output inside every loop</strong>.
        The unification of <code>generateText</code> and{" "}
        <code>generateObject</code> in v6 makes typed
        endpoints the norm, not the exception. Expect
        product APIs to start typing their agent responses
        the same way they type REST endpoints, and expect
        Zod-derived UI generation to become the default for
        agent-facing surfaces.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        AI SDK 6 is the release where Vercel&rsquo;s
        TypeScript toolkit stops being a chat helper and
        becomes an agent runtime. The{" "}
        <code>Agent</code> interface,{" "}
        <code>ToolLoopAgent</code>, tool execution approval,
        stable MCP, DevTools, and the Workflow DevKit
        extension point close the gaps that pushed teams
        into custom code in v5. For any AI feature that
        lives inside a Next.js, Node, or React app the
        default choice for us in mid-2026 is: start with
        <code>ToolLoopAgent</code>, add call options and
        <code>prepareCall</code> as soon as multi-tenant
        context shows up, gate destructive tools with
        <code>needsApproval</code>, wrap long-running work
        in <code>DurableAgent</code>, and use the AI Gateway
        to keep the model tier a config change instead of a
        code change.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy calculus has shifted with it.
        Building a custom agent loop in TypeScript now
        means recreating three or four features the SDK
        already ships. The times we do it are the same
        times we would pick LangGraph or Mastra: when the
        graph is the product, when the runtime is Python,
        or when a specific enterprise constraint blocks the
        default path. Everything else lands on the AI SDK.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://vercel.com/blog/ai-sdk-6"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 6 (release announcement)
          </a>
          {" "}- the full changelog for the Agent interface,
          tool execution approval, MCP, DevTools, reranking,
          and structured output inside tool loops.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ai-sdk-5"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 5 (July 31, 2025)
          </a>
          {" "}- the v5 release that introduced UIMessage,
          the typed tool-call parts, and the loop-control
          primitives the v6 agent layer builds on.
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
          {" "}- the reference for <code>ToolLoopAgent</code>,
          call options, <code>prepareCall</code>, and
          <code>InferAgentUIMessage</code>.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/agents/workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK: Workflow Patterns
          </a>
          {" "}- sequential chains, routing, parallel
          processing, and orchestrator-worker with concrete
          TypeScript examples on top of{" "}
          <code>generateText</code> and <code>Output</code>.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK: Tools and Tool Calling
          </a>
          {" "}- the deep read on <code>needsApproval</code>,
          strict mode, <code>inputExamples</code>, and{" "}
          <code>toModelOutput</code>.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK: MCP Tools
          </a>
          {" "}- the stable <code>@ai-sdk/mcp</code>
          reference with HTTP transport, OAuth, resources,
          prompts, and elicitation.
        </li>
        <li>
          <a
            href="https://useworkflow.dev/docs/ai"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Workflow DevKit: Building Durable Agents
          </a>
          {" "}- how <code>DurableAgent</code> plugs into
          the AI SDK <code>Agent</code> interface to give
          you resumable, retryable agent steps.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ai-gateway-production-index"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI Gateway production index (April 2026)
          </a>
          {" "}- the source for the shift to agent-shaped
          traffic, with the 22.2% and 58.9% tool-call
          numbers.
        </li>
        <li>
          <a
            href="https://vercel.com/i/what-are-agentic-workflows"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: What are agentic workflows?
          </a>
          {" "}- the primer on the ReAct loop, the
          orchestration layer, and where the AI SDK
          primitives fit.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra: TypeScript agents in production 2026
          </a>
          {" "}- the alternative TypeScript agent framework,
          for teams where agents are the product and
          workflows/evals need to be built-in.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the framework to reach for when the graph
          is the product and you need checkpointed,
          multi-node orchestration.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol the AI SDK MCP client speaks,
          with the security and deployment story.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG in Next.js with LangChain and the Vercel AI
            SDK
          </a>
          {" "}- the pre-v6 companion piece that walks
          through the retrieval side of the stack the new
          <code>rerank</code> function slots into.
        </li>
      </ul>
    </div>
  );
}
