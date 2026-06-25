import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 32,
  slug: "mastra-typescript-agents-production-2026",
  title:
    "Mastra in production 2026: the TypeScript framework for AI agents",
  excerpt:
    "How Mastra became the TypeScript-first AI agent framework in 2026, what teams ship with Agents, Workflows, Memory, RAG, Evals, and MCP, and how it compares with LangChain, the Vercel AI SDK, CrewAI, and the Python-first stacks. Covers the 1.0 release, Observational Memory, Mastra Studio, the Model Router across 90+ providers, Workspaces with Daytona and E2B sandboxes, and a clear-eyed look at when to pick it and when to look elsewhere.",
  metaDescription:
    "A practical, technical guide to Mastra in production 2026. Covers the January 2026 1.0 release, the six core primitives (Agents, Workflows, Memory, RAG, Evals, MCP), the Model Router across 3,300+ models and 94 providers, Observational Memory and the 94.87 percent LongMemEval score, Mastra Studio for local debugging, Workspaces with Daytona, E2B, and Blaxel sandboxes, suspend and resume workflows, and an honest comparison with LangChain, the Vercel AI SDK, CrewAI, and Pydantic AI.",
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
    "Mastra",
    "TypeScript",
    "Next.js",
    "Vercel AI SDK",
    "MCP",
    "RAG",
    "Memory",
    "Workflows",
    "Production",
  ],
  publishDate: "2026-06-25",
  readingTime: "18 min read",
};

export default function MastraTypescriptAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Through 2024 and most of 2025, building AI agents in
        TypeScript meant gluing together pieces by hand. You took
        the Vercel AI SDK for the model calls, picked a vector
        store for retrieval, wrote your own session and memory
        layer, bolted on a tracing client, and reinvented a
        workflow engine when the loop got past three steps. It
        worked, but every team ran the same wiring twice. Mastra
        is the framework that picked up those pieces and put them
        in one box. It launched in October 2024, hit 1.0 in
        January 2026, and by mid-2026 it sits at the center of
        the TypeScript agent stack the same way LangChain sits at
        the center of the Python one. This article walks through
        what is in the box, how the pieces fit, when to reach for
        it, and where it still hands work back to you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Two things forced the TypeScript side of the agent
        ecosystem to grow up in 2025 and 2026. The first is that
        most production web apps run on Node.js, Next.js, Bun, or
        Cloudflare Workers, and asking a frontend team to operate
        a Python service next to the app they already ship has
        always been a tax. The second is that the LLM tooling
        market matured: Vercel AI SDK shipped a stable model
        layer, Anthropic shipped the Model Context Protocol, and
        the Pydantic AI and Microsoft Agent Framework releases on
        the Python side raised the bar for what a framework is
        expected to include. The TypeScript ecosystem needed a
        first-class answer, and Mastra is the one that landed.
      </p>
      <p className="mb-6 leading-relaxed">
        The pitch is narrower than the marketing suggests. Mastra
        does not replace the Vercel AI SDK; it sits on top of it.
        The AI SDK handles the model calls, the streaming, and
        the tool-calling protocol. Mastra adds the layer above:
        typed agents with memory, deterministic workflows with
        suspend and resume, a RAG pipeline, an evals system, a
        local debugger called Studio, and a managed deployment
        story. The result is that a TypeScript team can keep
        their language and their runtime and still get the same
        production primitives the Python frameworks offer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>1.0 stable on January 2026</strong> after a
          fifteen-month beta. The 1.0 release froze the public
          API for Agents, Workflows, and Tools, set the supported
          Node.js floor at 22.13, and committed to semantic
          versioning going forward.
        </li>
        <li>
          <strong>Six core primitives.</strong> Agents,
          Workflows, Memory, RAG, Evals, and MCP. Each is
          consumed independently; you do not have to adopt the
          whole surface to use one piece.
        </li>
        <li>
          <strong>3,300+ models from 94 providers</strong> through
          the Mastra Model Router as of March 2026. Models are
          referenced as a single string in the form
          {" "}<code>provider/model-id</code>, with full IDE
          autocomplete and provider fallback built in.
        </li>
        <li>
          <strong>22,000+ GitHub stars</strong> on the open-source
          repo, 300+ contributors, and weekly npm downloads that
          crossed 300,000 at the 1.0 launch.
        </li>
        <li>
          <strong>Observational Memory</strong> shipped in
          February 2026 and scored 94.87 percent on
          LongMemEval, a state-of-the-art result on the long-
          context conversation benchmark, with no vector
          database required and a prompt-cacheable layout.
        </li>
        <li>
          <strong>Mastra Studio</strong> ships in the framework
          and runs at <code>localhost:4111</code>. It gives you a
          chat surface for every agent, full trace inspection on
          every tool call, a workflow visualizer, and a memory
          preview, all without writing any frontend code.
        </li>
        <li>
          <strong>Apache 2.0 license</strong> on the core
          framework. Enterprise features (RBAC, SSO, ACL on
          Studio) sit under a separate commercial license.
          Mastra Cloud is the optional managed deployment
          surface.
        </li>
        <li>
          <strong>Production users include</strong> Replit
          (Agent 3 runs thousands of Mastra sandboxes daily),
          PayPal, Sanity, Brex, SoftBank (Satto Workspace),
          Marsh McLennan (LenAI agentic search for 75,000
          employees), Factorial, and WorkOS.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The six primitives, grouped by what they actually do
      </h2>
      <p className="mb-6 leading-relaxed">
        The primitive list looks like a menu; in practice it
        sorts into three layers. Knowing the layers makes the
        decisions easier and the dependency graph smaller.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Run the loop.</strong> Agent is the open-ended
        loop: an LLM, a set of instructions, a set of tools, and
        the model drives until it returns an answer or hits a
        stop condition. Workflow is the structured counterpart:
        a graph of steps with explicit branching, parallel
        execution, foreach, and suspend-and-resume, for the
        cases where you want the order of operations under your
        control instead of the model&rsquo;s. Most production
        agents use both: a workflow drives the high-level
        process and calls an agent as one of its steps.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Give it state.</strong> Memory holds the
        short-term turn history, working memory for structured
        facts, semantic recall over past messages, and the
        newer Observational Memory pipeline that compresses old
        turns into dense observations. RAG handles the
        retrieval side: document chunking, embedding,
        similarity search over a vector store, and reranking,
        with first-party adapters for Pinecone, Qdrant, Chroma,
        pgvector, and a dozen others.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Watch and connect.</strong> Evals scores the
        agent run against repeatable checks (model-graded,
        rule-based, and statistical) before changes ship. The
        observability layer captures every step as an
        OpenTelemetry span and ships it to CloudWatch,
        Langfuse, Braintrust, Arize, LangSmith, Sentry, or any
        OTLP backend. MCP is the integration bus: connect to
        external MCP servers as a client, or expose your agents
        and tools as an MCP server for Cursor, Claude Desktop,
        Claude Code, and VS Code to consume.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through Mastra
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is three layers on top of a storage
        boundary. Your code sits at the top: a Next.js route
        handler, a Hono server, a Cloudflare Worker, a CLI
        binary, or a queue worker. Mastra sits in the middle:
        Agents, Workflows, Memory, RAG, Evals, and the Model
        Router. The Vercel AI SDK sits below Mastra, talking
        to the model providers. Storage is plugged in from the
        side: LibSQL by default for local development,
        PostgreSQL, MongoDB, DynamoDB, MSSQL, Upstash, or a
        Cloudflare Durable Object in production.
      </p>
      <CodeBlock
        language="bash"
        filename="Mastra request path"
        code={`Your application (Next.js, Hono, Worker, CLI, queue)
        |
        |  agent.generate() / agent.stream() / workflow.execute()
        v
+----------------------------------------------------+
|  Mastra runtime                                    |
|                                                    |
|  Agents     - loop, tools, structured output       |
|  Workflows  - then, parallel, branch, suspend      |
|  Memory     - turns, working, semantic, OM         |
|  RAG        - chunk, embed, retrieve, rerank       |
|  Evals      - model-graded and rule-based scores   |
|  Processors - input/output guardrails              |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Vercel AI SDK                                     |
|  - Provider routing (3,300+ models, 94 providers)  |
|  - Streaming, tool calling, structured output      |
|  - Provider-specific options (cache, reasoning)    |
+----------------------------------------------------+
        |
        v
   Model providers (OpenAI, Anthropic, Bedrock,
   Gemini, Mistral, Groq, xAI, Ollama, others)

        ^
        | (storage plugged in from the side)
+----------------------------------------------------+
|  Storage backends                                  |
|  LibSQL / PostgreSQL / MongoDB / DynamoDB /        |
|  MSSQL / Upstash / Cloudflare D1, KV, DO           |
|                                                    |
|  Vector stores: Pinecone, Qdrant, Chroma,          |
|  pgvector, Astra, LanceDB, Cloudflare Vectorize    |
+----------------------------------------------------+

   OpenTelemetry spans -> CloudWatch / Langfuse /
   Braintrust / Arize / LangSmith / Sentry / Datadog`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of this flow carry the production
        work. The storage layer is pluggable per domain, so the
        memory, workflow state, and observability stores can
        each pick the backend that fits. The model layer
        delegates to the AI SDK, which means a Mastra agent
        gets the same streaming, tool-calling, and provider
        coverage as a plain AI SDK app without writing a custom
        adapter for each model. And the tracing is on by
        default in OTLP format, so an existing observability
        stack does not need a new pipeline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Your first agent: a typed weather agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The path of least resistance is the
        {" "}<code>npm create mastra</code> scaffold, which
        writes a project with the right package layout, a
        sample agent, a sample workflow, and a working Studio
        launch script. The agent file below is the trimmed
        version of what the scaffold produces; it shows the
        three parts every Mastra agent has: a tool with a Zod
        schema, the Agent declaration, and the call.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/agents/weather-agent.ts"
        code={`import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const weatherTool = createTool({
  id: "get-weather",
  description: "Get the current weather for a city.",
  inputSchema: z.object({
    city: z.string().describe("The city name, e.g. Paris"),
  }),
  outputSchema: z.object({
    tempC: z.number(),
    summary: z.string(),
  }),
  execute: async ({ context }) => {
    // In production this calls a real provider through a
    // server-side API key. The model never sees the key.
    return { tempC: 22, summary: "Sunny" };
  },
});

export const weatherAgent = new Agent({
  id: "weather-agent",
  name: "Weather Agent",
  instructions: \`
    You are a concise weather assistant.
    Always call get-weather before answering.
    Reply in one short sentence.
  \`,
  model: "openai/gpt-4o",
  tools: { weatherTool },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this file carry the production work.
        The tool is defined with a Zod input and output
        schema, and the model sees a JSON schema generated
        from that Zod definition, so editing the schema is
        editing the tool contract (no separate spec file to
        keep in sync). The model is a single string, routed
        by the Model Router; switching from
        {" "}<code>openai/gpt-4o</code> to
        {" "}<code>anthropic/claude-sonnet-4-6</code> or
        {" "}<code>google/gemini-2.5-flash</code> is a one-line
        change with no extra package install. And the
        instructions live in the agent declaration, so the
        system prompt is versioned next to the code.
      </p>
      <p className="mb-6 leading-relaxed">
        Calling the agent looks the same whether you stream
        the tokens to a chat UI or wait for the final answer.
        The example below is the call from a Next.js route
        handler that streams to the browser using the AI SDK
        wire format.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/api/chat/route.ts"
        code={`import { weatherAgent } from "@/mastra/agents/weather-agent";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const stream = await weatherAgent.stream(messages, {
    // Memory plugs in here; threadId scopes the conversation.
    memory: { resource: "user-123", thread: "chat-001" },
  });
  return stream.toDataStreamResponse();
}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workflows: deterministic orchestration with suspend and resume
      </h2>
      <p className="mb-6 leading-relaxed">
        Agents are good when the model should decide what to
        do. Workflows are good when you want the order under
        your control. The Mastra workflow engine is a graph of
        steps, each with a Zod input and output schema, glued
        together with a fluent API:
        {" "}<code>.then()</code>,
        {" "}<code>.parallel()</code>,
        {" "}<code>.branch()</code>,
        {" "}<code>.foreach()</code>,
        {" "}<code>.dountil()</code>, and
        {" "}<code>.dowhile()</code>. The state of a workflow
        is persisted to the configured storage at every step,
        which is what lets it suspend mid-run and resume
        later, even across a server restart.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/workflows/onboard.ts"
        code={`import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { profileAgent } from "../agents/profile-agent";

const fetchUser = createStep({
  id: "fetch-user",
  inputSchema: z.object({ userId: z.string() }),
  outputSchema: z.object({ name: z.string(), email: z.string() }),
  execute: async ({ inputData }) => {
    return db.users.find(inputData.userId);
  },
});

const summarize = createStep({
  id: "summarize",
  inputSchema: z.object({ name: z.string(), email: z.string() }),
  outputSchema: z.object({ summary: z.string() }),
  execute: async ({ inputData }) => {
    const result = await profileAgent.generate(
      \`Write a one-line welcome for \${inputData.name}.\`,
    );
    return { summary: result.text };
  },
});

const approveHumanReview = createStep({
  id: "approve",
  inputSchema: z.object({ summary: z.string() }),
  outputSchema: z.object({ approved: z.boolean() }),
  // Suspend here; a separate endpoint resumes the run
  // when a human clicks Approve or Reject.
  suspendSchema: z.object({ summary: z.string() }),
  resumeSchema: z.object({ approved: z.boolean() }),
  execute: async ({ inputData, suspend, resumeData }) => {
    if (!resumeData) {
      await suspend({ summary: inputData.summary });
      return { approved: false };
    }
    return { approved: resumeData.approved };
  },
});

export const onboardingWorkflow = createWorkflow({
  id: "onboarding",
  inputSchema: z.object({ userId: z.string() }),
  outputSchema: z.object({ approved: z.boolean() }),
})
  .then(fetchUser)
  .then(summarize)
  .then(approveHumanReview)
  .commit();`}
      />
      <p className="mb-6 leading-relaxed">
        The suspend-and-resume pattern is what makes the
        workflow engine useful in production. A human
        approval step might wait hours; a queued background
        job might run on a schedule; an external webhook
        might trigger the next step. The state sits in
        storage until something resumes it, which means a
        deploy in the middle of a workflow does not lose
        work. The same engine also ships a time-travel
        debugger: every step run is captured, so a failed
        production workflow can be replayed locally against
        the same inputs.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Memory: turns, working memory, semantic recall, and Observational Memory
      </h2>
      <p className="mb-6 leading-relaxed">
        Mastra memory has four surfaces, and the right
        production setup mixes them. Conversation history is
        the raw turn list, scoped by a
        {" "}<code>resource</code> (a user or tenant) and a
        {" "}<code>thread</code> (a conversation). Working
        memory is a structured Markdown block the agent
        keeps and updates between turns, useful for things
        like a user&rsquo;s name, preferences, or the
        running summary of an open ticket. Semantic recall
        embeds the message history into a vector store and
        retrieves the relevant past on every turn.
        Observational Memory is the newest addition, shipped
        in February 2026, and is the one that changes the
        production math.
      </p>
      <p className="mb-6 leading-relaxed">
        Observational Memory runs two background agents
        alongside the main loop: an Observer and a
        Reflector. The Observer reads the recent message
        history and writes dense observations into a
        structured store. The Reflector merges and dedupes
        the observations over time. As a conversation grows,
        the raw turn list is replaced by the observation
        store, which keeps the prompt size flat instead of
        watching it climb until the model truncates. The
        published LongMemEval score (94.87 percent) puts it
        ahead of every published long-context approach, with
        the bonus that the structured store is
        prompt-cacheable, so the second turn of a long
        conversation pays for the observations once instead
        of re-embedding every message.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/agents/support-agent.ts"
        code={`import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

const memory = new Memory({
  storage: new LibSQLStore({ url: "file:./mastra.db" }),
  options: {
    workingMemory: {
      enabled: true,
      template: \`
        # User profile
        - name:
        - tier:
        - open tickets:
      \`,
    },
    semanticRecall: { topK: 6, messageRange: 20 },
    observational: { enabled: true },
  },
});

export const supportAgent = new Agent({
  id: "support",
  name: "Support Agent",
  instructions: "You are an Acme support assistant.",
  model: "anthropic/claude-sonnet-4-6",
  memory,
});`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        RAG: chunking, embedding, retrieval, reranking
      </h2>
      <p className="mb-6 leading-relaxed">
        The Mastra RAG pipeline ships as a set of small
        helpers rather than a single
        do-everything class. You chunk a document with the
        text or markdown splitter, embed the chunks with a
        provider you pick through the Model Router, write
        them into a vector store with the first-party
        adapter for that store, and query with a
        {" "}<code>queryVectors</code> call. Reranking is
        opt-in and runs as a second pass over the top-k
        results. The pieces are deliberately separate so a
        team that already has a chunking step or an existing
        vector store can plug only the parts that are
        missing.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/rag/ingest.ts"
        code={`import { MDocument } from "@mastra/rag";
import { PgVector } from "@mastra/pg";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

const store = new PgVector({
  connectionString: process.env.DATABASE_URL!,
});

await store.createIndex({
  indexName: "docs",
  dimension: 1536,
});

const doc = MDocument.fromText(rawText);
const chunks = await doc.chunk({
  strategy: "recursive",
  size: 512,
  overlap: 50,
});

const { embeddings } = await embedMany({
  model: openai.embedding("text-embedding-3-small"),
  values: chunks.map((c) => c.text),
});

await store.upsert({
  indexName: "docs",
  vectors: embeddings,
  metadata: chunks.map((c) => ({ text: c.text, source: c.source })),
});`}
      />
      <p className="mb-6 leading-relaxed">
        The query side is one call. The agent can use it
        directly as a tool, or a workflow step can call it
        and pass the retrieved context into a downstream
        agent. The pattern is the same agentic RAG pattern
        the Elastic team published a reference architecture
        for: an agent that decides which index to query, how
        many results to retrieve, and whether to rerank,
        instead of a fixed pipeline that runs the same way
        on every request.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Model Router: 3,300+ models behind one string
      </h2>
      <p className="mb-6 leading-relaxed">
        The Model Router is the most underrated piece of
        Mastra. Models are passed as a single string in the
        form
        {" "}<code>provider/model-id</code>, with IDE
        autocomplete that lists every supported model.
        Switching providers is a one-line change. The router
        handles fallbacks across providers automatically, so
        a temporary OpenAI outage flips to Anthropic without
        a code change. Provider-specific options
        (Anthropic&rsquo;s
        {" "}<code>cacheControl</code>, OpenAI&rsquo;s
        {" "}<code>reasoningEffort</code>, Bedrock&rsquo;s
        guardrails) pass through cleanly.
      </p>
      <CodeBlock
        language="typescript"
        filename="model-router.ts"
        code={`// Same agent, three models. Switch is one string.
const agent = new Agent({
  id: "writer",
  name: "Writer",
  instructions: "You are a concise technical writer.",
  // Pick one:
  model: "openai/gpt-4o",
  // model: "anthropic/claude-sonnet-4-6",
  // model: "google/gemini-2.5-flash",
  // model: "groq/llama-3.3-70b-versatile",
  // model: "ollama/llama3.1",  // local, no network
});

// Fallbacks: primary plus an ordered list of backups.
const robust = new Agent({
  id: "writer-robust",
  name: "Robust Writer",
  instructions: "You are a concise technical writer.",
  model: {
    primary: "anthropic/claude-sonnet-4-6",
    fallbacks: ["openai/gpt-4o", "google/gemini-2.5-flash"],
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Under the hood the Model Router delegates to the
        Vercel AI SDK, so a Mastra agent inherits the AI
        SDK&rsquo;s streaming, tool-calling, and structured
        output without an extra abstraction. The fallback
        layer and the autocomplete-driven string format are
        the parts Mastra adds on top, which together remove
        most of the per-provider boilerplate teams used to
        carry.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Mastra Studio: a local debugger that ships in the box
      </h2>
      <p className="mb-6 leading-relaxed">
        Studio is the local development UI that runs at
        {" "}<code>localhost:4111</code> when you start the
        Mastra dev server. It gives you a chat surface for
        every agent in the project, a tool-call inspector
        that shows the exact JSON sent to and from each
        tool, a memory preview that surfaces the working
        memory and semantic recall hits, and a workflow
        visualizer that steps through each node with the
        input and output schema. The thing it does that no
        other framework ships out of the box is the replay:
        a failed agent run from production can be loaded
        from a trace and re-executed step by step against
        the same inputs.
      </p>
      <p className="mb-6 leading-relaxed">
        The Studio surface matters because LLM debugging is
        otherwise a black box. The TypeScript community
        leader Matt Pocock made this point in a public
        workshop: the framework wins because you can see
        what the agent is doing. The early Hacker News
        threads about Mastra are full of the same
        sentiment, that the first replay of a failed run
        was the moment the framework felt like a real tool
        instead of a wrapper. In production, the same
        traces flow through OpenTelemetry to Langfuse,
        Braintrust, Arize, LangSmith, Sentry, or any OTLP
        collector, so the debug story is consistent from
        the laptop to the dashboard.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: client and server in the same framework
      </h2>
      <p className="mb-6 leading-relaxed">
        Mastra implements both sides of the Model Context
        Protocol. As a client, an agent can connect to any
        MCP server (local via stdio, remote via streamable
        HTTP) and consume its tools. As a server, a Mastra
        project can expose its agents, tools, workflows,
        and resources to any MCP-aware client: Cursor,
        Windsurf, Claude Desktop, VS Code, Claude Code, and
        OpenAI Codex. The same agent can run in your
        application and also be reachable from a
        teammate&rsquo;s IDE without rewriting anything.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/mcp/client.ts"
        code={`import { MCPClient } from "@mastra/mcp";
import { Agent } from "@mastra/core/agent";

const mcp = new MCPClient({
  servers: {
    filesystem: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
    },
    github: {
      url: new URL("https://mcp-github.example.com/mcp"),
      requestInit: {
        headers: { Authorization: \`Bearer \${process.env.GH_TOKEN!}\` },
      },
    },
  },
});

export const devAgent = new Agent({
  id: "dev",
  name: "Dev Agent",
  instructions: "You help with repo work.",
  model: "anthropic/claude-sonnet-4-6",
  tools: { ...(await mcp.getTools()) },
});`}
      />
      <p className="mb-6 leading-relaxed">
        The MCP Docs Server is the part worth calling out
        separately. It is a small MCP server that exposes
        the full Mastra documentation as searchable
        resources. You install it once in your editor (one
        line in the Cursor or Claude Code config) and the
        AI assistant you already use gets accurate,
        current documentation when you write Mastra code.
        It removes the most common failure mode of AI-
        assisted framework adoption: hallucinated APIs.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workspaces and remote sandboxes
      </h2>
      <p className="mb-6 leading-relaxed">
        Workspaces are the answer to the question of how an
        agent does work that is more than answering a
        question: writing code, running scripts, editing
        files, executing shell commands. The same hard
        rule applies in TypeScript that applies everywhere
        else: untrusted agent code does not run on your
        application server. Mastra wires three remote
        sandbox providers as first-class options:
        {" "}<strong>Daytona</strong>,
        {" "}<strong>E2B</strong>, and
        {" "}<strong>Blaxel</strong>. Each provider gives
        the agent an isolated filesystem, a controlled
        network, and a managed lifetime; the agent gets
        the same tool interface regardless of the
        provider, so the choice can flex over time.
      </p>
      <p className="mb-6 leading-relaxed">
        The three differ in how they enforce isolation.
        Daytona supports network blocking and an
        allowlist; E2B runs ephemeral environments that
        are destroyed at the end of the session; Blaxel
        focuses on the agent-specific patterns and adds
        per-call observability into the sandbox. The
        decision tracks the threat model: a code-review
        agent that only reads a repo is fine on the
        cheaper option, a coding agent that installs
        dependencies and runs tests goes on the strictest
        one. The framework keeps the call site identical,
        so the swap is a config change rather than a
        rewrite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evals and observability
      </h2>
      <p className="mb-6 leading-relaxed">
        Evals score an agent run against a repeatable
        check. Mastra ships three families of scorers:
        model-graded (the eval calls a model with a
        rubric and gets a score), rule-based (regex,
        keyword, schema-shape), and statistical
        (semantic similarity, ROUGE, BLEU). The eval
        runner reads a dataset of inputs and expected
        properties, runs the agent over the dataset, and
        produces a structured report that lands in the
        same trace store as the runtime traces. A
        regression in a new prompt shows up in the same
        dashboard as a latency regression, with the
        same span ID.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mastra/evals/support.eval.ts"
        code={`import { evaluate } from "@mastra/evals";
import { supportAgent } from "../agents/support-agent";
import { AnswerRelevancy, Toxicity, ContextPrecision } from "@mastra/evals/llm";

const dataset = [
  { input: "I need a refund for order 42.", expected: "refund flow" },
  { input: "What is your return window?", expected: "policy answer" },
];

await evaluate({
  agent: supportAgent,
  dataset,
  scorers: [
    new AnswerRelevancy({ model: "openai/gpt-4o-mini" }),
    new Toxicity({ model: "openai/gpt-4o-mini" }),
    new ContextPrecision({ model: "openai/gpt-4o-mini" }),
  ],
});`}
      />
      <p className="mb-6 leading-relaxed">
        Observability piggybacks on OpenTelemetry. Every
        agent step, tool call, model call, and memory
        read is a span with the GenAI semantic
        conventions, so the same spans flow to
        Langfuse, Braintrust, Arize Phoenix, LangSmith,
        Sentry, Datadog, Honeycomb, or any OTLP backend
        without per-vendor adapters. The redaction
        layer (added in early 2026) strips system
        prompts, tool definitions, and detected PII
        from the spans before export, which is the
        property regulated workloads need.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns carry the bulk of the production
        work we see from teams shipping Mastra in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Embedded product agents.</strong> Replit
        runs Agent 3 on Mastra and spins up thousands of
        Mastra sandboxes a day for end users. The shape
        is standard: a workflow drives the high-level
        plan, a coding agent does the work in an E2B or
        Daytona sandbox, memory persists project context
        across sessions, and Studio is the debugging
        story until the trace pipeline takes over in
        production. Sanity uses the same pattern to ship
        a content agent across 30,000+ organizations.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal automation that lives in Slack.</strong>{" "}
        Factorial built an internal HR agent on Mastra
        that respects employee permissions inside the
        product instead of pulling sensitive data into a
        third-party chat tool. The 11x team runs Alice,
        an AI SDR agent that sends 50,000 emails per day
        powered by a Mastra workflow over a Postgres
        memory store. Marsh McLennan deployed LenAI to
        75,000 employees as an agentic search surface
        backed by Mastra agents and a vector store.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Document and workflow agents in regulated
        verticals.</strong> SoftBank shipped Satto
        Workspace, a document-creation agent that
        compresses hours of office work into a one-to-two
        minute round trip; the build runs on Mastra
        workflows with human-in-the-loop steps at every
        approval point. Brex uses Mastra in its agentic
        finance stack (the CTO talked about the choice
        on the Latent Space podcast). Common across all
        three: the workflow engine is the load-bearing
        piece, not the agent loop, because the business
        rules are deterministic and only the
        summarization and drafting are LLM work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Mastra vs LangChain, Vercel AI SDK, CrewAI, Pydantic AI
      </h2>
      <p className="mb-6 leading-relaxed">
        Four frameworks come up in every comparison
        thread. The honest read on each:
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangChain (and LangGraph).</strong> The
        Python ecosystem leader, with a TypeScript port
        that has historically trailed the Python
        version. LangGraph is the orchestration layer;
        LangSmith is the observability product. The
        scope is bigger, the integration count is
        bigger, and the community knowledge base is
        bigger. Mastra wins on TypeScript-native
        ergonomics, on Studio shipping in the box (vs
        LangSmith as a separate product), and on the
        single-framework story (vs LangChain plus
        LangGraph plus LangSmith). Pick LangChain on a
        Python team or when the ecosystem advantage is
        the deciding factor. Pick Mastra on a TypeScript
        team that wants a cohesive stack.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Vercel AI SDK.</strong> Not a competitor.
        The AI SDK is the layer Mastra sits on top of.
        The library-versus-framework distinction is
        real: the AI SDK ships the model layer,
        streaming, and tool-calling protocol; Mastra
        ships agents with memory, workflows, RAG,
        evals, and observability on top. Many
        production stacks use both, with Mastra on the
        backend and AI SDK on the frontend React or
        Next.js UI. Pick the AI SDK alone when the
        application is a chat surface and not an agent
        system.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>CrewAI.</strong> Python, role-based,
        configured with YAML, and good at
        multi-agent crews where each agent has a
        distinct role. The strength is the role
        abstraction; the limitation is that it is
        opinionated about how the agents collaborate.
        Pick CrewAI on a Python team that wants the
        role-based pattern out of the box. Pick Mastra
        on a TypeScript team or when the workflow
        story (deterministic orchestration with
        suspend and resume) matters more than the
        crew abstraction.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pydantic AI.</strong> Python, typed,
        validation-first, and a natural fit on teams
        that already use Pydantic. The closest spirit
        match to Mastra on the Python side. Pick
        Pydantic AI when the team is Python-first and
        the strong validation story is the deciding
        factor; pick Mastra when the team is
        TypeScript-first and the integrated workflow
        and Studio story matters.
      </p>
      <p className="mb-6 leading-relaxed">
        A short decision rule we use on engagements. If
        the production stack is Next.js, Hono, Bun, or
        Cloudflare Workers, Mastra is the default. If
        the team owns a Python ML platform and the
        agent runs next to it, LangChain or Pydantic AI
        is the natural choice. If the application is a
        chat UI without long-running tools or memory,
        the Vercel AI SDK alone is enough. If the
        agent collaboration pattern is the load-bearing
        choice, CrewAI is the cleanest option on
        Python. Mastra sits in the middle of the
        TypeScript ecosystem where most production web
        teams already live.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        Mastra is the right answer for a lot of 2026
        TypeScript work, but it is not free. An honest
        list of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> The TypeScript-
        native design means no Python-to-TypeScript
        port lag and no two-runtime operational
        burden. Zod schemas thread through every API
        (tool inputs, workflow steps, structured
        output), and the type system catches a class
        of bugs at compile time that other frameworks
        catch at runtime. Studio in the box is the
        single biggest debugger improvement over the
        Python frameworks. The Model Router with
        provider fallbacks is a real production
        feature, not a demo. The MCP support on both
        sides of the protocol is rare and useful.
        Observational Memory is a genuine technical
        novelty backed by a state-of-the-art
        benchmark score. And the framework runs on
        any Node.js-compatible runtime: standalone,
        embedded in Next.js, on Bun, on Deno, on
        Cloudflare Workers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The library is
        younger than the Python alternatives, which
        means fewer Stack Overflow answers, fewer
        copy-paste examples, and fewer
        already-solved-by-someone-else problems. The
        workflow API&rsquo;s fluent chaining can get
        awkward in branchy graphs; the team has
        iterated on it but the syntax tax is real.
        Some peer-dependency conflicts with AI SDK
        versions still show up in the issue tracker.
        The enterprise features (RBAC, SSO, ACL on
        Studio) sit behind a commercial license; if
        production needs them, the budget needs to
        cover them. And Mastra Cloud pricing was
        announced for Q1 2026 but is still settling
        in mid-2026, so a team that wants the
        managed-hosting story should confirm the
        numbers before committing.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A
        stateless chat endpoint with no tools does
        not need a framework; a Vercel AI SDK
        {" "}<code>streamText</code> call is enough.
        A Python-first team with an existing
        ML platform should pick Pydantic AI,
        LangChain, or CrewAI and keep the language
        boundary. A workload that already runs on a
        managed-agent platform (AWS Bedrock
        AgentCore, Microsoft Agent Framework) gets
        more value from the platform than from
        adding Mastra on top, unless the framework
        layer of the platform is the part the team
        wants to swap.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the Mastra roadmap and the
        broader TypeScript agent ecosystem for the
        next year.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Observational Memory becomes the
        default memory model.</strong> The
        compression-plus-observation pattern is the
        first long-context approach that does not
        depend on a vector store or a custom
        retrieval layer, and it caches well with
        Anthropic and OpenAI prompt caching. We
        expect the pattern to land in other
        frameworks (the Mastra paper is already cited
        by other agent projects) and to become the
        default expectation for any agent that holds
        a session past a few thousand tokens.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Workspaces become the standard agent
        sandbox surface.</strong> The Daytona, E2B,
        and Blaxel integrations make Mastra one of
        the easiest places to ship a sandboxed
        coding or workflow agent. The
        managed-sandbox market is consolidating
        (Daytona and E2B are the most-used providers
        in 2026) and Mastra has bet on a tool
        contract that is portable across all of
        them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Mastra Cloud finishes the
        deploy-as-code story.</strong> The cloud
        platform took its public beta in June 2025
        and the GitHub-connected deployment surface,
        autoscaling, instant rollbacks, and managed
        observability are the parts most teams will
        end up using. The likely shape by late 2026
        is that Mastra Cloud sits to TypeScript
        agents the way Vercel sits to Next.js: the
        default deploy target for a project bootstrapped
        with the CLI, with self-hosting available for
        teams that need it.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Mastra Code closes the AI-coding
        loop.</strong> The February 2026 Mastra Code
        release is a coding agent built on Mastra
        that ships with the framework, and the team
        uses it to dogfood every API change. The
        pattern (an AI coding agent that knows the
        framework it was written in) is already
        producing the cleanest developer experience
        in the TypeScript ecosystem, and the
        feedback loop between the framework and the
        coding agent is the kind of compounding
        advantage that is hard to replicate.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the TypeScript side of the agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about Mastra is what
        it does not try to be. It does not replace
        the Vercel AI SDK; it sits on top of it. It
        does not lock you to a model provider; the
        Model Router covers 94 of them. It does not
        force a hosting choice; it runs on Node, on
        Bun, on Deno, on Cloudflare Workers, on
        Vercel, or as a standalone Hono server.
        What it does ship is the layer the
        TypeScript agent ecosystem used to ask you
        to build by hand: typed agents with memory,
        deterministic workflows with suspend and
        resume, a RAG pipeline that plugs into the
        vector store you already use, an evals
        runner that lands in the same trace store
        as the runtime, and a debugger that runs
        from the laptop to the dashboard with no
        configuration drift.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 on a TypeScript
        team, the argument against starting on
        Mastra is thin; the argument for pairing it
        with the right model (Anthropic for the
        coding-heavy work, OpenAI for the
        fastest-iteration UI work, Bedrock for the
        AWS-anchored compliance story) is real but
        composes. For teams migrating off a
        Python-and-TypeScript split where the
        Python piece exists only to host the agent,
        the move to Mastra collapses the operating
        surface from two runtimes to one without
        giving up the production features the
        Python framework brought. The work that is
        left is the part that always matters: the
        system prompt, the domain tools, the safety
        rules, and the UX. The framework does the
        rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://mastra.ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastra landing page
          </a>
          {" "}- the product overview with the
          customer stories (Replit, Sanity, SoftBank,
          WorkOS, Factorial) and the official feature
          list across the six primitives.
        </li>
        <li>
          <a
            href="https://mastra.ai/docs"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastra documentation
          </a>
          {" "}- the canonical reference for Agents,
          Workflows, Memory, RAG, Evals, MCP, Studio,
          and the Model Router across all 94
          supported providers.
        </li>
        <li>
          <a
            href="https://github.com/mastra-ai/mastra"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            mastra-ai/mastra (GitHub)
          </a>
          {" "}- the open-source repo with the
          Apache 2.0 license, the issue tracker,
          the release notes, and the contributor
          base behind the 22,000+ stars.
        </li>
        <li>
          <a
            href="https://mastra.ai/blog/changelog-2026-02-04"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mastra Changelog 2026-02-04 (Observational Memory)
          </a>
          {" "}- the launch post for Observational
          Memory with the LongMemEval score, the
          Observer and Reflector design, and the
          prompt-cacheable layout that makes it
          cheap.
        </li>
        <li>
          <a
            href="https://www.langchain.com/resources/ai-agent-frameworks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The best AI agent frameworks in 2026 (LangChain)
          </a>
          {" "}- the LangChain team&rsquo;s own
          framework round-up that places Mastra as
          the production pick for TypeScript-heavy
          teams.
        </li>
        <li>
          <a
            href="https://www.elastic.co/search-labs/blog/agentic-rag"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agentic RAG on Mastra (Elastic Search Labs)
          </a>
          {" "}- a reference architecture for
          building agentic RAG with Mastra and
          Elasticsearch as the vector store,
          published by the Elastic engineering team.
        </li>
        <li>
          <a
            href="https://mastra.ai/customers/replit"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replit Agent 3 on Mastra (case study)
          </a>
          {" "}- the build story behind Replit
          Agent 3 running thousands of Mastra
          sandboxes a day in production.
        </li>
        <li>
          <a
            href="https://mastra.ai/customers/softbank"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            SoftBank Satto Workspace (case study)
          </a>
          {" "}- the document-creation agent built
          on Mastra workflows that turns hours of
          office work into one-to-two minute
          finished presentations.
        </li>
        <li>
          <a
            href="https://mastra.ai/books/principles-of-building-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Principles of Building AI Agents (Sam Bhagwat)
          </a>
          {" "}- the conceptual book from the
          Mastra CEO that the team uses to anchor
          the framework&rsquo;s design choices.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as state machines
          </a>
          {" "}- the Python-side graph-orchestration
          framework, the closest spiritual peer on
          workflow semantics.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the Python-side typed agent
          framework, the closest peer on the
          schema-first design philosophy.
        </li>
        <li>
          <a
            href="/articles/claude-agent-sdk-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Claude Agent SDK in production 2026
          </a>
          {" "}- the Anthropic-side agent toolkit
          that pairs well with Mastra when the
          coding-agent surface is the focus.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model
          Context Protocol that Mastra consumes and
          produces as a first-class transport.
        </li>
        <li>
          <a
            href="/articles/ai-agent-memory-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent memory systems in 2026
          </a>
          {" "}- the broader landscape that
          Mastra&rsquo;s Observational Memory sits
          inside, with the trade-offs across
          working memory, semantic recall, and
          summarization.
        </li>
        <li>
          <a
            href="/articles/code-execution-sandboxes-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Code execution sandboxes for AI agents in 2026
          </a>
          {" "}- the deeper read on Daytona, E2B,
          and the rest of the providers that Mastra
          Workspaces wraps with a single tool
          contract.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG with Next.js, LangChain, and the Vercel AI SDK
          </a>
          {" "}- the upstream pattern Mastra
          builds on, with the AI SDK piece that
          Mastra sits on top of for streaming and
          tool calling.
        </li>
      </ul>
    </div>
  );
}
