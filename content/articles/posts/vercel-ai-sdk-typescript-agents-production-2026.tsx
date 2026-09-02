import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "vercel-ai-sdk-typescript-agents-production-2026",
  title:
    "Vercel AI SDK in production 2026: TypeScript agents from v5 to v7",
  excerpt:
    "How the Vercel AI SDK became the default way to ship TypeScript AI agents in a Next.js codebase. Covers the July 2025 v5 release, the v7 line that carries its design forward, the tool-calling loop with stopWhen and prepareStep, the UIMessage vs ModelMessage split, the AI Gateway as the global provider, MCP client support, structured output with Zod, and the production concerns of telemetry, retries, prompt caching, and multi-agent handoffs.",
  metaDescription:
    "A practical guide to the Vercel AI SDK in production 2026. Covers the v5 release (July 31, 2025), the v6 spec bump, the v7 line with ToolLoopAgent and HarnessAgent, stopWhen and prepareStep for loop control, UIMessage vs ModelMessage, generateText and streamText, AI Gateway as the global provider, the MCP client in @ai-sdk/mcp, generateObject with Zod, useChat in @ai-sdk/react, Next.js App Router streaming, OpenTelemetry through Langfuse and Braintrust, Anthropic prompt caching, multi-agent handoffs with subagents, and comparisons with Mastra, LangChain.js, and the OpenAI Agents SDK.",
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=2400&q=80",
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
    "AI Gateway",
    "Streaming",
    "Zod",
    "Production",
  ],
  publishDate: "2026-09-02",
  readingTime: "17 min read",
};

export default function VercelAiSdkTypescriptAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2024, building an AI feature in a Next.js
        app meant wiring a fetch call to OpenAI, parsing a
        stream by hand, and hoping the retry logic held.
        The Vercel AI SDK changed that. It gave TypeScript
        teams a typed model layer, a real streaming
        protocol, and a chat hook that worked with React
        Server Components. Version 5 landed on July 31,
        2025 with an agent loop and a redesigned message
        format. By mid-2026 the same primitives power v7
        in production apps at Vercel v0, OpenCode,
        Perplexity, and countless client engagements we
        run. This article walks through what actually
        shipped, how the pieces connect, and where the
        sharp edges are when you take an AI SDK agent past
        a demo.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the Vercel AI SDK became the default
      </h2>
      <p className="mb-6 leading-relaxed">
        Three things pushed teams onto the AI SDK in 2025.
        First, the model layer was provider-agnostic from
        day one, so switching OpenAI for Anthropic or
        Gemini was one line of code, not a rewrite. Second,
        the SDK shipped alongside Next.js and got first-
        class React Server Components and streaming support
        before any other TypeScript framework. Third, it
        was permissively licensed and open-source, which
        matched the way most product teams already ran
        their web stack. By the v5 launch, Vercel reported
        two million weekly downloads on npm and cited
        production use at v0, Perplexity, and Chatbase.
      </p>
      <p className="mb-6 leading-relaxed">
        The pitch in 2026 is narrower than the marketing.
        The AI SDK is a typed model layer plus a chat and
        agent runtime for TypeScript. It is not a graph
        framework like LangGraph. It is not an opinionated
        agent platform like Mastra. It is not a Python
        replacement. What it does well is turn a Next.js
        Route Handler into a streaming agent endpoint in
        thirty lines of code, without hiding the provider
        or the message shape. That is the sweet spot, and
        it explains why the SDK sits under most of the
        TypeScript agent stacks that shipped this year.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The v5 to v7 timeline (and why the primitives did
        not churn)
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>July 31, 2025</strong>: AI SDK 5 ships.
          Introduces the redesigned chat, the V2 language
          model specification, the agent loop with{" "}
          <code>stopWhen</code> and <code>prepareStep</code>,
          the <code>Experimental_Agent</code> class,
          provider-executed tools, dynamic tools, Zod 4
          support, and the AI Gateway as the default global
          provider.
        </li>
        <li>
          <strong>Late 2025</strong>: MCP client graduates
          out of experimental status and moves from{" "}
          <code>experimental_createMCPClient</code> in the
          core <code>ai</code> package to{" "}
          <code>createMCPClient</code> in a dedicated{" "}
          <code>@ai-sdk/mcp</code> package.
        </li>
        <li>
          <strong>Q1 2026</strong>: AI Gateway hits general
          availability. Automatic failover across providers,
          one invoice, unified spend tracking, and
          per-request traces land on the Vercel dashboard.
        </li>
        <li>
          <strong>June 2026</strong>: AI SDK 6 beta ships
          as a V3 language model spec bump. The blog post
          says the quiet part out loud: most v5 code runs
          without changes.
        </li>
        <li>
          <strong>Mid to late 2026</strong>: AI SDK 7 lands
          as the current line. The <code>Experimental_Agent</code>{" "}
          becomes <code>ToolLoopAgent</code>, a new{" "}
          <code>HarnessAgent</code> primitive wraps coding
          agents (Claude Code, Codex, Deep Agents,
          OpenCode, Pi), lifecycle callbacks like{" "}
          <code>onStart</code>, <code>onStepEnd</code>, and{" "}
          <code>onEnd</code> stabilise, and speech, image
          generation, reranking, and video APIs move out of
          experimental.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The key point for anyone shipping now: v5 is where
        the design landed. The v6 release was a spec bump.
        The v7 release renamed classes and added new agent
        shapes on top. If your app is on v5 and you have
        not upgraded, most of your code compiles on v7
        without touching it. If you are starting fresh in
        late 2026, start on v7 but read the v5 blog post
        first, because it is still the most complete
        walk-through of the design decisions.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core primitives
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK is split into two packages you will import
        every day: <code>ai</code> for the model and agent
        layer (AI SDK Core), and <code>@ai-sdk/react</code>{" "}
        for the chat hooks (AI SDK UI). Under the model
        layer sit provider packages like{" "}
        <code>@ai-sdk/openai</code>,{" "}
        <code>@ai-sdk/anthropic</code>, and{" "}
        <code>@ai-sdk/google</code>. On top sit the tools,
        the agent loop, and the structured output
        generators.
      </p>
      <CodeBlock
        language="bash"
        filename="AI SDK 5 to 7: the layered architecture"
        code={`+-----------------------------------------------------------+
|  App code (Next.js Route Handler or Server Action)        |
|                                                           |
|    generateText / streamText / generateObject             |
|    ToolLoopAgent  (v7)   /   Experimental_Agent  (v5)     |
|    HarnessAgent   (v7)   /   subagents            (v7)    |
+-----------------------------------------------------------+
|  Tool primitives                                          |
|    tool(...)          Zod inputSchema / outputSchema      |
|    dynamicTool(...)   MCP + user-defined tools            |
|    Output.object()    typed final result                  |
+-----------------------------------------------------------+
|  V2 / V3 language model specification                     |
|    stream, prompt, tools, providerOptions, telemetry      |
+-----------------------------------------------------------+
|  Providers                                                |
|    @ai-sdk/openai   @ai-sdk/anthropic   @ai-sdk/google    |
|    @ai-sdk/mcp      AI Gateway (default global provider)  |
+-----------------------------------------------------------+
|  UI layer (framework-specific)                            |
|    @ai-sdk/react  (useChat)                               |
|    @ai-sdk/vue    (composable)                            |
|    @ai-sdk/svelte (stores)                                |
|    @ai-sdk/angular (signals)                              |
+-----------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth calling out about the layout.
        First, the model spec is versioned separately from
        the SDK. That is how v6 could bump the spec without
        breaking v5 app code: the SDK adapts, your code
        does not. Second, the UI layer is truly framework-
        agnostic in v5. React, Vue, Svelte, and Angular
        reached feature parity in the same release, which
        removed the excuse to build a bespoke transport
        just because you were not on React.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The agent loop: stopWhen and prepareStep
      </h2>
      <p className="mb-6 leading-relaxed">
        Before v5, if you wanted a tool-calling loop you
        wrote it yourself: call <code>generateText</code>,
        check for tool calls, run the tool, push the
        result into messages, call again, and stop when
        you felt like it. Version 5 folded that loop into
        the core call and gave you two knobs to control it.
      </p>
      <p className="mb-6 leading-relaxed">
        <code>stopWhen</code> is the exit condition.
        Helpers include <code>stepCountIs(n)</code> (a
        hard step cap, aliased later as{" "}
        <code>isStepCount</code>) and{" "}
        <code>hasToolCall(&apos;name&apos;)</code> (stop
        as soon as the model calls a specific tool). You
        can pass a function for custom logic. The loop
        also stops on its own when the model returns text
        instead of a tool call. The default step ceiling
        is 20, which is generous enough to run most
        reasoning chains without going runaway.
      </p>
      <p className="mb-6 leading-relaxed">
        <code>prepareStep</code> runs before each step and
        lets you override the model, system prompt,
        messages, tools, or tool choice for that specific
        turn. This is the primitive teams use for three
        common patterns: a cheap model on step zero for
        query triage, a sliding-window compression after N
        messages, and forced tool selection when the model
        keeps picking the wrong tool.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/coding-agent.ts"
        code={`import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  Experimental_Agent as Agent,
  stepCountIs,
  tool,
} from "ai";
import { z } from "zod";

const readFile = tool({
  description: "Read a file from the workspace.",
  inputSchema: z.object({ path: z.string() }),
  execute: async ({ path }) => ({ contents: await fs.readFile(path, "utf8") }),
});

const codingAgent = new Agent({
  model: openai("gpt-4o"),
  system: "You are a coding agent for a Next.js and TypeScript codebase.",
  tools: { readFile },
  stopWhen: stepCountIs(10),
  prepareStep: async ({ stepNumber, messages }) => {
    if (stepNumber === 0) {
      return { model: openai("gpt-4o-mini") };
    }
    if (messages.length > 30) {
      return { messages: messages.slice(-20) };
    }
    return {};
  },
});

const result = await codingAgent.generate({
  prompt: "Fix the failing test in app/api/chat/route.test.ts.",
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make this production-ready. First,
        the tool <code>execute</code> function is fully
        typed from the Zod schema, so you get a runtime
        check and a compile-time hint in one place.
        Second, the cheap triage model on step zero is
        typically a five to ten x cost cut on multi-step
        runs because the first turn is usually just
        parsing intent. Third, the sliding window is not a
        summary, it is a truncation, which is safer than
        an LLM-based summary when you need the tool
        outputs to survive verbatim.
      </p>
      <p className="mb-6 leading-relaxed">
        In v7 the same code works with{" "}
        <code>ToolLoopAgent</code> in place of{" "}
        <code>Experimental_Agent</code>, and{" "}
        <code>stepCountIs</code> is aliased to{" "}
        <code>isStepCount</code>. The lifecycle callbacks{" "}
        <code>onStart</code>, <code>onStepStart</code>,{" "}
        <code>onStepEnd</code>, and <code>onEnd</code>{" "}
        become stable, which is what most tracing
        integrations attach to.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        UIMessage vs ModelMessage: the split that
        confuses everyone
      </h2>
      <p className="mb-6 leading-relaxed">
        The single change in v5 that trips up teams
        upgrading from v4 is the message split. Before v5
        the SDK had one message type and it was neither
        rich enough for a real chat UI nor clean enough to
        send to a model without transformation. Version 5
        split it in two, and the split is worth
        understanding because it decides how you persist
        chats.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>UIMessage</strong> is what you store in
        your database and render in your app. It carries
        tool parts, data parts, and metadata like
        timestamps, model IDs, and token counts. It is
        strongly typed through the{" "}
        <code>UIMessage&lt;MyMetadata, MyDataParts,
        MyTools&gt;</code> generics so your tool call
        parts get the same static safety your React
        components do.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ModelMessage</strong> is the trimmed shape
        the model actually sees. You convert with{" "}
        <code>convertToModelMessages(uiMessages)</code>{" "}
        right before the call. This one function is why
        you can add rich UI parts (rendered charts,
        interactive forms, streamed data) without polluting
        the model context with the render metadata.
      </p>
      <CodeBlock
        language="bash"
        filename="UIMessage vs ModelMessage"
        code={`+----------------------------+          +----------------------------+
| Database / React state     |          | Provider API request       |
|                            |          |                            |
| UIMessage                  |          | ModelMessage               |
|  - id, role, createdAt     |  ---->   |  - role                    |
|  - metadata (model,tokens) |          |  - content (parts model    |
|  - parts:                  |          |             cares about)   |
|     text                   |          |                            |
|     tool-getWeather        |          |                            |
|       state: input-avail   |          |                            |
|       output               |          |                            |
|     data-shopping-cart     |          |                            |
|     dynamic-tool           |          |                            |
+----------------------------+          +----------------------------+
       ^                                          |
       |            convertToModelMessages()      |
       +------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The persistence pattern the docs point at is to
        return{" "}
        <code>result.toUIMessageStreamResponse(...)</code>{" "}
        with <code>originalMessages</code> and an{" "}
        <code>onFinish</code> callback that saves the full
        <code>messages</code> array back to your database.
        That way you always persist UIMessages, never
        ModelMessages, and you never lose the tool parts
        that make the chat UI render correctly on refresh.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AI Gateway as the default global provider
      </h2>
      <p className="mb-6 leading-relaxed">
        In v5 the SDK introduced a global provider that
        resolves prefixed model strings like{" "}
        <code>&apos;openai/gpt-4o&apos;</code> or{" "}
        <code>&apos;anthropic/claude-sonnet-4.5&apos;</code>.
        The default global provider is the Vercel AI
        Gateway. That means the moment you write{" "}
        <code>streamText({"{ model: 'openai/gpt-4o', ... }"})</code>,
        you are hitting Gateway, which forwards to the
        real provider using your Gateway credentials.
      </p>
      <p className="mb-6 leading-relaxed">
        The Gateway pitch is one integration, automatic
        failover across providers, unified spend tracking,
        and one invoice. In practice, three properties
        matter on client engagements. First,{" "}
        <code>providerOptions.gateway.order</code>,{" "}
        <code>.only</code>, and <code>.sort</code> give
        you routing control per call. Second,{" "}
        <code>.byok</code> lets you pass a customer key
        for a single request without changing the global
        setup. Third, per-request traces land on the
        Vercel dashboard the same way build traces do,
        which cuts the observability wiring for small apps
        to zero.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/lib/gateway.ts"
        code={`import { createGateway } from "@ai-sdk/gateway";
import { streamText } from "ai";

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  teamIdOrSlug: process.env.VERCEL_TEAM_SLUG,
});

export async function summarise(input: string) {
  return streamText({
    model: gateway("anthropic/claude-sonnet-4.5"),
    prompt: input,
    providerOptions: {
      gateway: {
        order: ["anthropic", "bedrock", "vertex"],
        sort: "tps",
        disallowPromptTraining: true,
      },
    },
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        One caveat we hit on client projects: the Gateway
        automatic caching mode currently falls back to the
        five-minute Anthropic cache when you would rather
        pin the one-hour cache. Daniel Ternyak wrote this
        up in 2026 and the fix is to set the TTL
        explicitly with{" "}
        <code>providerOptions.anthropic.cacheControl:
        {" { type: 'ephemeral', ttl: '1h' } }"}</code>{" "}
        on the message, or drop the string-prefix model
        and use the real provider ID with the direct
        <code>@ai-sdk/anthropic</code> package. If your
        agent runs long, cached system prompts save real
        money, so pin the TTL.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Streaming from a Next.js Route Handler
      </h2>
      <p className="mb-6 leading-relaxed">
        The streaming protocol in v5 moved to plain
        Server-Sent Events, which was a quiet but useful
        change. SSE is what every browser and every proxy
        already understand. The old bidirectional protocol
        worked but often broke behind corporate proxies or
        edge functions that wanted a standard content
        type. The v5 shape is the one you want in
        production.
      </p>
      <p className="mb-6 leading-relaxed">
        The canonical Route Handler is short. You take the
        UIMessage array from the request, convert it to
        ModelMessages, stream the response, and hand it
        back through the UI message stream helper. The
        client hook picks up the parts and renders them in
        the right slot.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/api/chat/route.ts"
        code={`import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: "You are a helpful assistant for a SaaS onboarding flow.",
    messages: convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onFinish: async ({ messages: final }) => {
        await saveChat({ id: req.headers.get("x-chat-id")!, messages: final });
      },
    }),
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        The client side is the <code>useChat</code> hook.
        It handles the stream parsing, the message state,
        and the abort controller. Two things about the v5
        version are worth flagging. First, the messages
        are rendered by iterating <code>message.parts</code>{" "}
        rather than reading a flat <code>content</code>{" "}
        string, so you can switch on part type and render
        text, tool calls, and data parts differently.
        Second, the hook is now framework-agnostic in
        design: the React version is one implementation,
        Vue and Svelte have parity, and the underlying{" "}
        <code>AbstractChat</code> lets you build custom
        transports (WebSocket, direct provider) without
        rewriting the state layer.
      </p>
      <CodeBlock
        language="tsx"
        filename="app/(chat)/Chat.tsx"
        code={`"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  return (
    <div className="flex flex-col gap-4">
      {messages.map((m) => (
        <div key={m.id} className="rounded-md border p-3">
          <strong>{m.role}</strong>
          {m.parts.map((p, i) => {
            if (p.type === "text") return <p key={i}>{p.text}</p>;
            if (p.type === "tool-getWeather") return <WeatherCard key={i} data={p.output} />;
            if (p.type === "data-cart") return <CartPreview key={i} cart={p.data} />;
            return null;
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
        <button disabled={status === "in_progress"}>Send</button>
      </form>
    </div>
  );
}`}
      />
      <p className="mb-6 leading-relaxed">
        Resumable streams are documented for the case
        where the user reloads mid-stream (network drop,
        tab refresh) and you want the server to pick up
        where it left off. In practice most teams do not
        need this until they hit a specific
        long-generation feature, but it is worth knowing
        the SDK ships the primitive so you do not have to
        build it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Structured output with Zod
      </h2>
      <p className="mb-6 leading-relaxed">
        Structured output in the SDK covers three cases:
        one-shot object generation, streaming objects (an
        array of results one element at a time), and
        typed output at the end of a tool-calling loop.
        Each one takes a Zod schema and returns a fully
        typed object.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/analysis/reviews.ts"
        code={`import { generateObject, streamObject } from "ai";
import { z } from "zod";

const analysis = z.object({
  sentiment: z.enum(["positive", "neutral", "negative"]),
  pros: z.array(z.string()).max(5),
  cons: z.array(z.string()).max(5),
  themes: z.array(z.object({ label: z.string(), count: z.number() })),
});

export async function analyseReview(text: string) {
  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4.5",
    schema: analysis,
    prompt: \`Analyse this product review:\n\${text}\`,
  });
  return object;
}

export async function analyseAsList(reviews: string[]) {
  const { elementStream } = await streamObject({
    model: "openai/gpt-4o",
    output: "array",
    schema: analysis,
    prompt: \`Analyse each review, one per element:\n\${reviews.join("\\n---\\n")}\`,
  });
  return elementStream;
}`}
      />
      <p className="mb-6 leading-relaxed">
        Under the hood the SDK maps to each provider&rsquo;s
        native structured output mechanism: OpenAI
        structured outputs, Anthropic tool-use style JSON,
        Gemini response schema. It normalises them and
        validates the returned object against the schema,
        raising a typed error on mismatch. That last part
        matters more than it sounds: a validation error is
        a signal that the prompt or the schema is wrong,
        not that the API silently truncated your object.
      </p>
      <p className="mb-6 leading-relaxed">
        Inside a tool-calling loop you can pass{" "}
        <code>output: Output.object({"{ schema }"})</code>{" "}
        (or <code>experimental_output</code> on v5) to{" "}
        <code>generateText</code> so the loop can call
        tools and still return a typed final object. This
        is the pattern for agents that need to research
        with tools and then hand back a structured report.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP client support
      </h2>
      <p className="mb-6 leading-relaxed">
        The AI SDK was one of the first TypeScript
        libraries to ship a first-party MCP client. It
        started as <code>experimental_createMCPClient</code>{" "}
        in AI SDK 4.2 (early 2025) and now lives in its
        own package <code>@ai-sdk/mcp</code> as{" "}
        <code>createMCPClient</code>. Transports include
        streamable HTTP (recommended), SSE, and stdio, and
        the OAuth flow is supported through the{" "}
        <code>authProvider</code> option on the HTTP
        transport.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/mcp-agent.ts"
        code={`import { createMCPClient } from "@ai-sdk/mcp";
import { generateText, isStepCount } from "ai";

const mcp = await createMCPClient({
  transport: {
    type: "http",
    url: "https://kb.internal.acme.com/mcp",
    headers: { Authorization: \`Bearer \${process.env.MCP_TOKEN}\` },
  },
  capabilities: { elicitation: {} },
});

try {
  const { text } = await generateText({
    model: "openai/gpt-4o",
    tools: await mcp.tools(),
    stopWhen: isStepCount(5),
    prompt: "Find products under $100 tagged as new arrivals.",
  });
  console.log(text);
} finally {
  await mcp.close();
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two things trip teams up on the MCP client. First,
        older code from the 4.2 to 5.0 window still shows
        <code>experimental_createMCPClient</code>{" "}
        imported from the core <code>ai</code> package,
        which no longer exists. If you copy from a blog
        post, update the import. Second, the client owns a
        long-lived transport. Wrap every call in{" "}
        <code>try/finally</code> and close the client so
        you do not leak sockets in a serverless function
        that runs many requests per container.
      </p>
      <p className="mb-6 leading-relaxed">
        You can merge tools from more than one MCP server
        by spreading each <code>tools()</code> result into
        the tools object. The SDK deduplicates by tool
        name, so pick names carefully across servers you
        do not control.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Multi-agent handoffs
      </h2>
      <p className="mb-6 leading-relaxed">
        Handoffs are the one place where v5 users hit a
        gap. There is no first-class handoff primitive in
        v5. The community pattern that works today is to
        expose each sub-agent as a tool whose{" "}
        <code>execute</code> function runs another agent.
        The parent agent picks the sub-agent by calling
        the tool. This is the same shape the OpenAI
        Agents SDK ships as a first-class construct, but
        in the AI SDK it is a convention.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/router.ts"
        code={`import { openai } from "@ai-sdk/openai";
import { Experimental_Agent as Agent, stepCountIs, tool } from "ai";
import { z } from "zod";
import { billingAgent, supportAgent, salesAgent } from "./specialists";

const routeToSpecialist = tool({
  description: "Route the user's question to the right specialist agent.",
  inputSchema: z.object({
    intent: z.enum(["billing", "support", "sales"]),
    question: z.string(),
  }),
  execute: async ({ intent, question }) => {
    const specialist =
      intent === "billing" ? billingAgent :
      intent === "support" ? supportAgent :
      salesAgent;
    const { text } = await specialist.generate({ prompt: question });
    return { answer: text };
  },
});

export const router = new Agent({
  model: openai("gpt-4o-mini"),
  system: "You are a router. Pick the specialist that best fits the user's question and hand off.",
  tools: { routeToSpecialist },
  stopWhen: stepCountIs(3),
});`}
      />
      <p className="mb-6 leading-relaxed">
        The v7 line closes this gap with a{" "}
        <code>subagents</code> concept documented in the
        agents section. If you are on v7, use the built-in
        primitive. If you are on v5, the tool-based
        handoff is stable and every serious multi-agent
        AI SDK build we run in production uses it.
      </p>
      <p className="mb-6 leading-relaxed">
        A separate community package{" "}
        <code>ai-sdk-tools/agents</code> ships a full
        orchestration layer with automatic routing and
        handoffs. It is worth a look if your app needs a
        registry of specialist agents rather than a
        hard-coded router, but for most product features
        the router-plus-tools pattern is enough.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production concerns: retries, telemetry, cost,
        caching
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK ships opinionated defaults for retries.
        Every call takes <code>maxRetries</code>, which
        defaults above zero. Set it to zero when you want
        the caller to own the retry loop, which is common
        inside a job queue or a background worker where
        the queue already retries.
      </p>
      <p className="mb-6 leading-relaxed">
        Telemetry is OpenTelemetry-based. On v5 and v6 you
        pass <code>experimental_telemetry: {"{ isEnabled: true, functionId, metadata }"}</code>{" "}
        to each call, and every major observability vendor
        picks it up. Langfuse ships{" "}
        <code>@langfuse/otel</code> with a{" "}
        <code>LangfuseSpanProcessor</code>. Braintrust
        ships <code>braintrustAISDKTelemetry()</code> and a
        <code>wrapAISDK(ai)</code> helper. The Vercel
        Observability directory lists the rest. On v7 the
        field is renamed to <code>telemetry</code> and you
        register the integration once at startup with{" "}
        <code>registerTelemetry(integration)</code>, which
        removes the per-call boilerplate.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/observability/telemetry.ts (v5 / v6 pattern)"
        code={`import { streamText } from "ai";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";

new NodeSDK({
  spanProcessors: [
    new LangfuseSpanProcessor({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_HOST,
    }),
  ],
}).start();

export async function trackedAnswer(question: string, userId: string) {
  return streamText({
    model: "openai/gpt-4o",
    prompt: question,
    experimental_telemetry: {
      isEnabled: true,
      functionId: "chat.answer",
      metadata: { userId, environment: process.env.VERCEL_ENV },
    },
  });
}`}
      />
      <p className="mb-6 leading-relaxed">
        Cost tracking is available in two places. The{" "}
        <code>finish</code> chunk of every stream carries
        <code>totalUsage.totalTokens</code> plus the
        per-provider breakdown, so you can attribute cost
        per user or per feature in your own database. The
        AI Gateway dashboard aggregates spend per model,
        per team, and per project on the Vercel side. On
        client engagements we usually record both because
        the Gateway view is easier for a finance sign-off
        while the per-user view is what product teams
        need.
      </p>
      <p className="mb-6 leading-relaxed">
        Prompt caching on Anthropic is the highest-impact
        cost lever for long-running agents. The manual
        API is{" "}
        <code>providerOptions.anthropic.cacheControl:
        {" { type: 'ephemeral', ttl: '1h' } }"}</code>{" "}
        on the message you want cached (usually the
        system prompt or a large context block). You can
        also cache at the tool level, which is useful when
        the tool set is large and stable across steps.
        The Gateway supports automatic caching through{" "}
        <code>providerOptions.gateway.caching: &apos;auto&apos;</code>,
        but as noted earlier the auto mode defaults to the
        short cache. Pin the long TTL explicitly if your
        run lasts more than five minutes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world adoption
      </h2>
      <p className="mb-6 leading-relaxed">
        The list of production users is longer than most
        docs pages show. Vercel v0 is the most visible one:
        Guillermo Rauch has said publicly that v0 uses the
        AI SDK as its framework layer, and much of the
        design pressure on the SDK comes from what v0
        needs. OpenCode, the open-source coding agent, is
        built on the SDK top to bottom. Perplexity has been
        cited across the ecosystem as an early adopter for
        chat and search. Chatbase and raindrop.ai have
        published testimonials.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern in the reports is the same. Teams pick
        the SDK because it is the shortest path from a
        Next.js app to a streaming chat, they stay because
        the tool loop and structured outputs remove
        boilerplate they would otherwise write, and they
        move to the AI Gateway once they need multi-
        provider routing or a single billing view for
        finance. The v5-to-v7 upgrade path has been
        smooth enough that no team we know of paused a
        roadmap for it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the SDK fits vs Mastra, LangChain.js, and
        the OpenAI Agents SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The AI SDK is a model layer with a chat and agent
        runtime. It is the thinnest layer in the
        TypeScript agent stack. Mastra sits above it and
        adds opinionated memory, workflows, evals, and a
        local debugger called Studio. LangChain.js is a
        broader surface, closer to the Python side of
        LangChain, with chains, retrievers, and a large
        integrations catalogue. The OpenAI Agents SDK is
        the first-party option if you are all-in on
        OpenAI and want handoffs and guardrails as
        first-class primitives.
      </p>
      <p className="mb-6 leading-relaxed">
        Pick the AI SDK when the shape of the app is a
        Next.js or React frontend with a tool-calling
        agent behind it, when you want provider choice
        without a graph framework, and when you want the
        Gateway included in the box. Pick Mastra on top
        when you also need typed workflows with
        suspend-and-resume, a memory layer with time-based
        eviction, and a local debugger for stepping
        through runs. Pick LangChain.js when you already
        have a Python LangChain estate and want to share
        vocabulary across sides. Pick the OpenAI Agents
        SDK when the vendor lock-in is acceptable and the
        handoff-plus-guardrails shape maps to what you
        need.
      </p>
      <p className="mb-6 leading-relaxed">
        On our own client work the split is usually AI SDK
        for the direct model calls and the chat surface,
        Mastra when the workflow logic gets past three
        steps, and LangGraph on the Python side when a
        service needs deep graph orchestration and the
        team is already Python-first.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        The advantages are consistent across the projects
        we have shipped on the SDK. Typed end to end from
        the Zod schema to the React component. First-class
        Next.js and React Server Components support with
        no adapter to write. Provider swap on one line.
        Structured output that works across providers with
        one schema. MCP client in the same package family
        as the model calls. AI Gateway that removes the
        need for a bespoke observability stack on smaller
        apps.
      </p>
      <p className="mb-6 leading-relaxed">
        The limitations are worth naming honestly. The
        chat shape is opinionated: UIMessage parts,
        SSE-first transport, and the useChat hook assume
        you are building a chat, not a batch pipeline. If
        your feature is a nightly job that generates a
        thousand reports, use{" "}
        <code>generateText</code>/<code>generateObject</code>{" "}
        directly and skip the UI layer. Multi-agent
        handoffs were a v5 gap until v7 added subagents,
        so plan around that if you are on v5. Prompt
        caching defaults through the Gateway need pinning
        for long runs, which is a footgun until you know.
        The React and Vue and Svelte and Angular hooks
        reach parity, but the deepest examples are still
        React-first.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends for the rest of 2026 and into 2027
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>HarnessAgent as the coding agent shape.</strong>{" "}
        The v7 HarnessAgent primitive wraps Claude Code,
        Codex, Deep Agents, OpenCode, and Pi behind one
        interface. Expect more vendors to ship a
        HarnessAgent adapter, and expect the pattern to
        spread beyond coding to any agent that runs its
        own tool loop in a separate process.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Multimodal parity.</strong> Speech,
        transcription, image generation and editing,
        multimodal embeddings, reranking, and video moved
        from experimental to stable in v7. The React hooks
        for voice and video are on the roadmap. If your
        product is text-only today, expect the surface
        area to widen without breaking your current code.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Gateway as the default runtime.</strong>{" "}
        The pattern of writing string-prefix model IDs
        and letting the Gateway route is becoming the
        norm. Direct provider imports will stay for the
        cases where you need long Anthropic caches or a
        specific provider feature, but the default
        posture on new codebases is Gateway-first.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Runtime context and typed tool
        context.</strong> The v7 <code>runtimeContext</code>{" "}
        and <code>toolsContext</code> APIs give you a
        typed way to pass per-request data (user ID,
        session, tenant) into tools without sneaking it
        through closures. This closes a gap teams have
        been working around since v5.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Community agent packs.</strong> The
        <code>ai-sdk-tools/agents</code> orchestration
        library, the persistence template repo, and the
        growing set of provider-executed tools point at a
        richer community layer that ships alongside the
        SDK rather than inside it. Expect more of this:
        the SDK stays thin, the community fills the
        opinionated pieces.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the sweet spot for TypeScript agents
      </h2>
      <p className="mb-6 leading-relaxed">
        The Vercel AI SDK in 2026 is the answer to the
        question &ldquo;how do I ship an AI agent in my
        Next.js app without picking up a Python service or
        a graph framework?&rdquo;. The v5 release put the
        design in place. The v6 spec bump kept the code
        working. The v7 release turned the experimental
        pieces stable and added handoffs, coding-agent
        harnesses, and multimodal parity. The primitives
        that matter (typed tools, the agent loop with
        <code>stopWhen</code> and <code>prepareStep</code>,
        the UIMessage/ModelMessage split, the Gateway as
        the global provider, first-class MCP) are the
        same across the line, and they are the pieces you
        will build against on any real product.
      </p>
      <p className="mb-6 leading-relaxed">
        Our own default on new engagements is to start with
        the AI SDK direct, add Mastra when the workflow
        logic asks for it, and only reach for LangGraph or
        a bespoke agent framework when the shape of the
        problem is not a chat plus a tool loop. Most of
        the time it is, and the SDK is what stays in the
        codebase.
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
          {" "}- the launch post with the redesigned chat,
          the agent loop, the V2 spec, provider-executed
          tools, and the message split. Still the most
          complete design write-up.
        </li>
        <li>
          <a
            href="https://vercel.com/changelog/ai-sdk-7"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI SDK 7 changelog
          </a>
          {" "}- the current line: ToolLoopAgent,
          HarnessAgent, stable multimodal, lifecycle
          callbacks, runtimeContext, and the migration
          notes from v5.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/agents/overview"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: Agents overview
          </a>
          {" "}- the reference for the agent class, tool
          loops, and subagents.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/agents/loop-control"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: Loop control
          </a>
          {" "}- deep reference for <code>stopWhen</code>{" "}
          and <code>prepareStep</code>.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: MCP tools
          </a>
          {" "}- the MCP client in{" "}
          <code>@ai-sdk/mcp</code>, transports, and the
          OAuth flow.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: AI Gateway provider
          </a>
          {" "}- how the Gateway wires up as the default
          global provider, plus routing options.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/ai-gateway-is-now-generally-available"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel: AI Gateway is now generally available
          </a>
          {" "}- Gateway GA post, spend tracking, and the
          production pitch.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: Generating structured data
          </a>
          {" "}- <code>generateObject</code>,{" "}
          <code>streamObject</code>, Zod schemas, and the
          array/enum/no-schema modes.
        </li>
        <li>
          <a
            href="https://ai-sdk.dev/docs/getting-started/nextjs-app-router"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI SDK docs: Next.js App Router quickstart
          </a>
          {" "}- the canonical Route Handler plus{" "}
          <code>useChat</code> pattern.
        </li>
        <li>
          <a
            href="https://www.danielternyak.com/articles/vercel-ai-gateway-downgrades-anthropic-prompt-cache"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Ternyak: Vercel AI Gateway downgrades
            Anthropic prompt cache
          </a>
          {" "}- the write-up on the Gateway auto-caching
          TTL footgun and how to pin the one-hour cache.
        </li>
        <li>
          <a
            href="https://github.com/vercel/ai/releases"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel/ai releases on GitHub
          </a>
          {" "}- the source of truth for what changed in
          every patch and minor release.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra in production 2026
          </a>
          {" "}- the framework that sits above the AI SDK
          and adds workflows, memory, and Studio.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol behind the MCP client in
          <code>@ai-sdk/mcp</code>.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production
            2026
          </a>
          {" "}- the first-party alternative when you are
          all-in on OpenAI.
        </li>
        <li>
          <a
            href="/articles/llm-gateways-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LLM gateways in production 2026
          </a>
          {" "}- the wider read on the Gateway pattern the
          AI SDK adopts as its default.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing story that plugs into the
          OpenTelemetry hooks in the SDK.
        </li>
      </ul>
    </div>
  );
}
