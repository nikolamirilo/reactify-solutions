import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 33,
  slug: "cloudflare-agents-production-2026",
  title:
    "Cloudflare Agents in production 2026: durable agents on the edge",
  excerpt:
    "How the Cloudflare Agents SDK turned Durable Objects, Workers AI, Workflows, and Browser Run into a serverless platform for stateful AI agents, what Agents Week 2026 added with Project Think, Sandboxes GA, Agent Memory, and AI Search, and where it fits next to AWS Bedrock AgentCore, the OpenAI Agents SDK, and Mastra.",
  metaDescription:
    "A practical, technical guide to Cloudflare Agents in production 2026. Covers the Agents SDK on Durable Objects, Workers AI inference, AI Gateway, Workflows v2, Sandboxes GA, Browser Run, AI Search, Agent Memory, MCP servers, Code Mode, Project Think with fibers and sub-agents, Knock and internal Cloudflare case studies, and an honest comparison with AWS Bedrock AgentCore, the OpenAI Agents SDK, and Mastra.",
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
    "Cloudflare",
    "Durable Objects",
    "Workers AI",
    "MCP",
    "Workflows",
    "Serverless",
    "Edge",
    "TypeScript",
    "Production",
  ],
  publishDate: "2026-06-26",
  readingTime: "19 min read",
};

export default function CloudflareAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Through 2024 most production AI agents ran the same
        way: a long-lived container on a VM, a Redis cache for
        session state, a queue for the slow work, and a
        homegrown scheduler that pinged the agent every few
        minutes to keep it alive. It worked, but the bill
        scaled with the wall-clock time the agent was idle,
        and a single deploy could lose half-finished runs.
        Cloudflare took a different bet. Instead of pretending
        an agent is a web request, the Agents SDK treats every
        agent as an addressable actor with its own SQLite
        database, its own lifetime, and zero cost when it
        sleeps. By Agents Week 2026 that bet had grown into a
        full agentic cloud: durable execution with fibers,
        per-agent sandboxes, browser automation, MCP servers,
        and a managed memory store, all stitched together by
        the same platform that already routes a fifth of the
        web. This article walks through what is in the box,
        how the pieces fit, when to reach for it, and where it
        still hands work back to you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Two structural shifts pushed Cloudflare into the
        center of the agent conversation in 2025 and 2026. The
        first is the one-to-one scaling problem. A classic web
        app serves many users from one process; an agent
        serves one user, one task, one long-running session at
        a time. Cloudflare&rsquo;s own writeup puts the scale
        in plain terms: if a fraction of the world&rsquo;s
        knowledge workers each run a few agents in parallel,
        the platform needs capacity for tens of millions of
        simultaneous sessions. A pool of always-on containers
        cannot cover that economically. The second shift is
        that agents now spend most of their lifetime waiting:
        for a model response, for a tool, for a human
        approval, for a webhook. Paying for wall-clock idle
        time on a VM is the wrong default for a workload that
        is idle by design.
      </p>
      <p className="mb-6 leading-relaxed">
        Cloudflare&rsquo;s answer is built on three properties
        of the Workers platform that map directly to the agent
        shape. Durable Objects give each agent a stable
        identity and a private SQLite database that survives
        restarts. WebSocket Hibernation lets a connection stay
        open with no compute charge while the agent is idle.
        Workers bill on CPU time rather than wall time, so a
        slow tool or a long model call does not run the meter.
        Put together, an agent that spends 99 percent of its
        time waiting costs roughly 1 percent of what the same
        agent costs on a container, with no extra glue.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Agents SDK GA</strong> after the April 2026
          Agents Week launch. The SDK ships the
          {" "}<code>Agent</code> base class, routing,
          sessions, WebSockets, scheduling, fibers, and
          observability as one MIT-licensed package on npm
          ({" "}<code>agents</code> and{" "}
          <code>agents/react</code>).
        </li>
        <li>
          <strong>Five built-in communication channels</strong>{" "}
          out of the box: chat, voice, email, Slack, and
          generic webhooks. Each one terminates on the same
          Durable Object, so the agent does not care which
          door the message came through.
        </li>
        <li>
          <strong>Workers AI catalog</strong> includes
          50+ first-party models (Llama 3.3, Gemma, Mistral,
          DeepSeek-V3, Qwen, Whisper, embedding models) plus
          a 14+ provider bring-your-own catalog through the
          AI Gateway with one cached interface.
        </li>
        <li>
          <strong>Cloudflare Workflows v2</strong> rearchitected
          for 50,000 concurrency and 300 creation per second
          per account, with saga-style rollbacks for
          multi-step transactions and first-class support for
          background agent work.
        </li>
        <li>
          <strong>Sandboxes GA in April 2026</strong>: real
          Linux environments with a shell, a filesystem, and
          background processes, persistent across restarts,
          paired with Outbound Workers for identity-aware
          egress and credential injection.
        </li>
        <li>
          <strong>Browser Run</strong> (the new name for
          Browser Rendering) ships Live View, Human in the
          Loop, CDP access, session recordings, and 4x higher
          concurrency for AI agents in 2026.
        </li>
        <li>
          <strong>Agent Memory</strong> launched as a managed
          service during Agents Week 2026: durable
          recall, structured forgetting, and a search API the
          agent can call as a tool.
        </li>
        <li>
          <strong>AI Search</strong> is the search primitive
          for agents: create an instance, upload files, query
          across instances with hybrid retrieval and relevance
          boosting, all without standing up a vector store.
        </li>
        <li>
          <strong>Project Think</strong> is the next-edition
          opinionated harness (preview in April 2026) that
          wires fibers, sub-agents, the Session API, Workspace,
          Codemode, Browser Run, and Sandboxes into a single
          base class.
        </li>
        <li>
          <strong>Production users include</strong> Knock
          (remote MCP server for developer tooling), the
          Cloudflare internal AI engineering stack (Agent Lee
          in the dashboard, multiple coding agents), and a
          growing roster from the Workers customer base
          highlighted across Agents Week.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four parts of a Cloudflare agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The official docs break the platform into four parts,
        and the mental model holds up in production:
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Communication channels.</strong> How a user or
        system reaches the agent: a chat WebSocket, an email
        through Email Routing, a phone call routed through
        Cloudflare Calls or Twilio, a Slack mention, a
        webhook, or an inbound HTTP request. Each channel
        terminates at the same Durable Object, so the agent
        works the same way regardless of where the input came
        from.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The agent harness.</strong> The loop that
        decides how the agent calls the model, picks tools,
        handles tool results, and decides whether to keep
        going. You can use Project Think as an opinionated
        harness, hand-roll a loop on the{" "}
        <code>Agent</code> base class, or drop in a
        third-party SDK like the OpenAI Agents SDK or
        LangChain. The runtime does not care.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The Agents SDK runtime.</strong> The durable
        infrastructure under the agent: the{" "}
        <code>Agent</code> class, state, sessions, routing,
        WebSockets, scheduling, fibers, observability. This
        is the part that gives every agent a unique identity,
        a private database, and the ability to wake on
        message.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Tools.</strong> What the agent can do:
        Workers AI inference, AI Gateway-routed third-party
        models, Browser Run for the open web, Sandboxes for
        real Linux work, AI Search for retrieval, Agent
        Memory for long-term recall, MCP servers for external
        APIs, and Code Mode for letting the model write code
        that orchestrates the tools.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a message flows through the agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is a tree of Durable Objects fronted
        by a router Worker. A request comes in on any channel,
        the router maps it to a stable agent name with{" "}
        <code>idFromName()</code>, and the platform either
        wakes the matching Durable Object or starts a new one.
        From there, the agent owns its state, its
        WebSocket connections, its scheduled alarms, and any
        sub-agents it spawns. Storage is plugged in at the
        right layer: SQLite for hot, queryable state inside
        the Durable Object, R2 for big blobs, Vectorize or AI
        Search for retrieval, Workflows for long-running
        transactional steps.
      </p>
      <CodeBlock
        language="bash"
        filename="Cloudflare agent request path"
        code={`Inbound channel (chat / email / Slack / voice / webhook)
        |
        v
+----------------------------------------------------+
|  Router Worker                                     |
|  routeAgentRequest(request, env)                   |
|  - idFromName(stableKey)  -> same agent always     |
|  - newUniqueId()          -> a fresh agent         |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Durable Object (one per agent identity)           |
|                                                    |
|  - this.state            (in-memory, hot)          |
|  - this.ctx.storage      (SQLite, durable)         |
|  - this.schedule(...)    (alarms)                  |
|  - this.runFiber(...)    (durable execution)       |
|  - this.subAgent(...)    (typed RPC to children)   |
|  - onConnect / onMessage (WebSocket Hibernation)   |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Tools (called from the agent loop)                |
|                                                    |
|  Workers AI     - first-party inference            |
|  AI Gateway     - 14+ third-party providers        |
|  AI Search      - hybrid retrieval primitive       |
|  Browser Run    - headless Chromium with Live View |
|  Sandboxes      - persistent Linux env per agent   |
|  Agent Memory   - managed long-term recall         |
|  MCP servers    - any tool with an MCP endpoint    |
|  Workflows v2   - durable saga steps with rollback |
+----------------------------------------------------+

        Observability: Logs / Metrics / Traces ->
        Workers Analytics, AI Gateway logs, OTLP export`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of this flow carry the production
        work. Every agent gets a name-stable identity, so the
        same user always hits the same Durable Object and the
        same memory, with no sticky-session glue in front. The
        compute meter only runs while the agent is doing real
        CPU work, so a six-hour conversation with three model
        calls in it costs almost nothing while it waits. And
        the runtime treats failure as normal: a crash, a
        deploy, or a regional outage restarts the agent in
        another colo with the SQLite state intact and any
        in-flight fiber resumed from its last checkpoint.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Your first agent: a chat agent with persistent state
      </h2>
      <p className="mb-6 leading-relaxed">
        Three commands gets a running agent, with no API keys
        required because the starter uses Workers AI by
        default. The scaffold ships streaming chat, server
        and client-side tools, a human-in-the-loop approval
        flow, and a scheduled task example. The minimal
        agent below shows the three parts every Cloudflare
        agent has: the{" "}
        <code>Agent</code> subclass with typed state, a
        message handler that calls a model and persists the
        turn, and a router that maps requests to the right
        Durable Object.
      </p>
      <CodeBlock
        language="bash"
        filename="bootstrap"
        code={`npx create-cloudflare@latest --template cloudflare/agents-starter
cd agents-starter && npm install
npm run dev   # local agent on http://localhost:8787`}
      />
      <CodeBlock
        language="typescript"
        filename="src/agents/support-agent.ts"
        code={`import { Agent, routeAgentRequest } from "agents";
import { generateText } from "ai";
import { createWorkersAI } from "workers-ai-provider";

type SupportState = {
  history: { role: "user" | "assistant"; content: string }[];
  ticketId?: string;
};

export class SupportAgent extends Agent<Env, SupportState> {
  initialState: SupportState = { history: [] };

  async onMessage(text: string) {
    const ai = createWorkersAI({ binding: this.env.AI });
    const history = [...this.state.history, { role: "user" as const, content: text }];

    const { text: reply } = await generateText({
      model: ai("@cf/meta/llama-3.3-70b-instruct"),
      system: "You are a concise Acme support assistant.",
      messages: history,
    });

    this.setState({
      ...this.state,
      history: [...history, { role: "assistant", content: reply }],
    });

    return reply;
  }
}

export default {
  async fetch(request: Request, env: Env) {
    return (
      (await routeAgentRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this file carry the production work.
        The state is typed with the second generic on{" "}
        <code>Agent</code>, and{" "}
        <code>setState()</code> writes the new value through
        to SQLite atomically, so a crash mid-turn never leaves
        half a message persisted. The model call goes through
        the{" "}
        <code>workers-ai-provider</code> binding rather than a
        fetch with an API key, which keeps the secret on the
        platform and gives the agent the same{" "}
        <code>generateText</code> /{" "}
        <code>streamText</code> surface as a Vercel AI SDK app.
        And{" "}
        <code>routeAgentRequest</code> is what gives the agent
        its identity: it parses the URL, picks the matching
        Durable Object class, and either wakes the existing
        instance or starts a new one with the right name.
      </p>
      <CodeBlock
        language="typescript"
        filename="wrangler.toml"
        code={`name = "support-agent"
main = "src/agents/support-agent.ts"
compatibility_date = "2026-06-01"

[ai]
binding = "AI"

[[durable_objects.bindings]]
name = "SupportAgent"
class_name = "SupportAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["SupportAgent"]`}
      />
      <p className="mb-6 leading-relaxed">
        The wrangler config binds Workers AI, declares the
        Durable Object class, and turns on the new SQLite
        backend per object. The{" "}
        <code>new_sqlite_classes</code> migration is what
        moves the agent off the old key-value storage onto
        SQLite, which is required for the Session API and
        Project Think and is the recommended default for all
        new agents in 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Identity, routing, and the most common early bug
      </h2>
      <p className="mb-6 leading-relaxed">
        Durable Object identity is what makes per-user
        persistence work, and it is also the easiest thing to
        get wrong. There are two ways to get a Durable Object
        ID:{" "}
        <code>namespace.idFromName(name)</code> and{" "}
        <code>namespace.newUniqueId()</code>. The first one
        is deterministic: the same name always maps to the
        same object, so the user&rsquo;s memory and history
        come back on every visit. The second one creates a
        fresh, isolated object every time, which is what you
        want for a one-shot task agent and what you do not
        want for a persistent assistant. The most common
        early bug, called out by the Cloudflare team in the
        OpenAI Agents SDK writeup, is using{" "}
        <code>newUniqueId()</code> by accident and then
        debugging for a week why memory never persists.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/router.ts"
        code={`export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId")!;

    // GOOD: stable, name-based ID. Same userId -> same agent -> same memory.
    const id = env.SupportAgent.idFromName(\`user:\${userId}\`);
    const stub = env.SupportAgent.get(id);
    return stub.fetch(request);
  },
};`}
      />
      <p className="mb-6 leading-relaxed">
        A useful pattern is to scope the agent name to both
        the user and the task. A name like{" "}
        <code>{`user:42:thread:onboarding`}</code> gives the
        user a persistent onboarding agent that remembers the
        whole flow, while a name like{" "}
        <code>{`user:42:task:\${uuid}\``}</code> spins up a
        fresh, one-shot agent per background job. The
        platform has no global limit on how many Durable
        Objects you can address; only the active ones cost
        anything.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        WebSocket Hibernation: streaming for free while idle
      </h2>
      <p className="mb-6 leading-relaxed">
        A chat UI wants a long-lived WebSocket so tokens can
        stream as the model produces them. On a container
        platform, keeping that socket open burns memory and
        CPU even when nothing is happening. Cloudflare ships
        WebSocket Hibernation as the default for Durable
        Objects: the platform holds the open socket on the
        edge and shuts the object down between messages. When
        a frame arrives, the platform wakes the object, loads
        its state, fires the{" "}
        <code>webSocketMessage</code> handler, then puts the
        object back to sleep. The user sees a normal
        long-lived connection; the bill only moves while the
        agent actually runs code.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/chat-agent.ts"
        code={`import { Agent, type Connection } from "agents";

export class ChatAgent extends Agent {
  async onConnect(connection: Connection) {
    // Sent once, then the object can hibernate until the next frame.
    connection.send(JSON.stringify({ type: "welcome", id: connection.id }));
  }

  async onMessage(connection: Connection, message: string) {
    const { prompt } = JSON.parse(message);
    const stream = await this.streamReply(prompt);
    for await (const chunk of stream) {
      connection.send(JSON.stringify({ type: "token", value: chunk }));
    }
    connection.send(JSON.stringify({ type: "done" }));
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        On the client, the matching{" "}
        <code>useAgent</code> and{" "}
        <code>useAgentChat</code> React hooks (shipped in{" "}
        <code>agents/react</code>) handle the WebSocket
        upgrade, message framing, and reconnection. A
        chat-style UI is roughly twenty lines of TSX; a fully
        custom client can talk the same wire format directly.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Scheduling: alarms and cron, on a per-agent basis
      </h2>
      <p className="mb-6 leading-relaxed">
        Every Durable Object has access to an alarm primitive,
        which the SDK wraps with a{" "}
        <code>this.schedule()</code> call. An agent can
        schedule a one-shot reminder, a recurring task, or a
        cron-style job for itself, and the platform will wake
        it at the right time even if it has been hibernated
        for hours. The same handler runs on the agent&rsquo;s
        own state, so a reminder agent that wakes up at 9 am
        to send a Slack message reads the user&rsquo;s
        preferences from the same SQLite database it has
        owned all along.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/lunch-agent.ts"
        code={`import { Agent, callable } from "agents";

export class LunchAgent extends Agent<Env, LunchState> {
  onStart() {
    this.schedule("weekdays at 11:30am", "chooseLunch");
    this.schedule("daily at 5pm", "resetLunch");
  }

  async chooseLunch() {
    const winner = pickWinner(this.state.votes);
    const { response } = await this.env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct",
      {
        messages: [
          { role: "system", content: "Make the lunch choice sound exciting." },
          { role: "user", content: winner },
        ],
      },
    );
    this.setState({ ...this.state, ruling: response });
  }

  async resetLunch() {
    this.setState({ ...this.state, votes: [], ruling: undefined });
  }

  @callable()
  async vote(username: string, restaurant: string) {
    this.setState({
      ...this.state,
      votes: [...this.state.votes, { username, restaurant }],
    });
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        The{" "}
        <code>@callable()</code> decorator exposes a method as
        a typed RPC the React client can call directly,
        without writing a route. Combined with hibernation
        and alarms, the LunchAgent example from the official
        site runs at effectively zero cost: it sleeps all day,
        wakes for a vote, sleeps again, then wakes at 11:30 am
        to pick a winner and 5 pm to reset.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Project Think: fibers, sub-agents, and the execution ladder
      </h2>
      <p className="mb-6 leading-relaxed">
        Project Think, announced during Agents Week 2026, is
        the next-edition opinionated harness for the Agents
        SDK. It bundles a set of primitives that solve the
        problems most teams hit when an agent grows from a
        one-shot helper to a long-running worker: durable
        execution that survives a restart, isolated child
        agents with their own storage, a persistent session
        tree with branching and search, sandboxed code
        execution at runtime, and a five-tier execution
        ladder from a virtual filesystem up to a full Linux
        sandbox. The primitives stand on their own; the{" "}
        <code>Think</code> base class wires them together for
        teams that want a batteries-included start.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Fibers</strong> are the durable execution
        primitive. A fiber is a registered, checkpointable
        function: the platform writes a row in SQLite before
        the fiber runs, the fiber calls{" "}
        <code>ctx.stash()</code> at safe points to persist
        intermediate state, and if the agent is evicted
        mid-run, the{" "}
        <code>onFiberRecovered</code> handler runs on the
        next wake-up with the last snapshot in hand. A
        ten-step research loop that took thirty minutes does
        not have to restart from zero when the colo restarts.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/research-agent.ts"
        code={`import { Agent } from "agents";

export class ResearchAgent extends Agent {
  async startResearch(topic: string) {
    void this.runFiber("research", async (ctx) => {
      const findings: string[] = [];
      for (let i = 0; i < 10; i++) {
        const result = await this.callLLM(\`Research step \${i}: \${topic}\`);
        findings.push(result);

        // Checkpoint: if the agent is evicted, we resume from here.
        ctx.stash({ findings, step: i, topic });

        this.broadcast({ type: "progress", step: i });
      }
      return { findings };
    });
  }

  async onFiberRecovered(ctx) {
    if (ctx.name === "research" && ctx.snapshot) {
      await this.startResearch(ctx.snapshot.topic);
    }
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Sub-agents</strong> are child Durable Objects
        co-located with the parent through the Facets
        primitive. Each child gets its own SQLite database
        and its own execution context, with typed RPC between
        parent and child checked by the TypeScript compiler.
        The pattern is the standard orchestrator-plus-workers
        layout from the multi-agent literature, except every
        worker has its own persistent state and its own
        lifecycle.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agents/orchestrator.ts"
        code={`import { Agent } from "agents";

export class ResearchSubAgent extends Agent {
  async search(query: string) { /* ... */ }
}

export class ReviewSubAgent extends Agent {
  async analyze(text: string) { /* ... */ }
}

export class Orchestrator extends Agent {
  async handleTask(task: string) {
    const researcher = await this.subAgent(ResearchSubAgent, "research");
    const reviewer = await this.subAgent(ReviewSubAgent, "review");

    const [research, review] = await Promise.all([
      researcher.search(task),
      reviewer.analyze(task),
    ]);

    return this.synthesize(research, review);
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>The execution ladder</strong> is the most
        opinionated part. Tier 0 is the Workspace, a durable
        virtual filesystem backed by SQLite and R2 with
        read, write, edit, search, grep, and diff tools.
        Tier 1 is a Dynamic Worker: model-generated
        JavaScript running in a fresh V8 isolate with no
        network access by default. Tier 2 adds npm: the
        worker-bundler fetches packages from the registry,
        bundles them with esbuild, and loads the result into
        the isolate so the model can write{" "}
        <code>import &#123; z &#125; from &quot;zod&quot;</code> and
        have it just work. Tier 3 is a headless browser via
        Browser Run, useful when the target system has no API.
        Tier 4 is a full Sandbox configured with your
        toolchains and repos, the right answer for{" "}
        <code>git clone</code>,{" "}
        <code>npm test</code>, or{" "}
        <code>cargo build</code>.
      </p>
      <p className="mb-6 leading-relaxed">
        The design principle the Cloudflare team calls out is
        that <em>the agent should be useful at Tier 0 alone</em>{" "}
        and each tier is additive. A document agent that only
        needs to read and edit files in a workspace never
        leaves Tier 0; a coding agent that runs tests
        escalates to Tier 4 only when it needs to. The cost
        and isolation move with the tier, not with the
        framework choice.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Code Mode: let the model write the tool calls as a program
      </h2>
      <p className="mb-6 leading-relaxed">
        The standard tool-calling pattern has the model emit
        one tool call, get the result, emit the next, get
        that result, and so on. When the tool surface grows,
        the round-trips multiply. Cloudflare&rsquo;s Code
        Mode flips this around: the model writes a single
        program that orchestrates the tools, and the program
        runs once inside a sandboxed Dynamic Worker. The
        Cloudflare team published one striking number from
        their own MCP server: exposing the full Cloudflare
        API as one tool per endpoint costs roughly 1.17
        million tokens of tool definitions; exposing the same
        API as a{" "}
        <code>search()</code> and{" "}
        <code>execute()</code> pair in Code Mode costs about
        1,000 tokens. A 99.9 percent token reduction.
      </p>
      <CodeBlock
        language="typescript"
        filename="generated-by-model.ts"
        code={`// The model writes this program. It runs in a fresh Dynamic Worker
// with no ambient network access. Tools are passed in as bindings.
const files = await tools.find({ pattern: "**/*.ts" });
const results = [];
for (const file of files) {
  const content = await tools.read({ path: file });
  if (content.includes("TODO")) {
    results.push({ file, todos: content.match(/\\/\\/ TODO:.*/g) });
  }
}
return results;`}
      />
      <p className="mb-6 leading-relaxed">
        The Dynamic Worker isolate that runs this code starts
        in milliseconds, uses a few megabytes of memory, and
        is up to a hundred times more efficient than a
        container for this kind of one-shot job. The
        capability model is the other half: the isolate
        starts with no network access (
        <code>globalOutbound: null</code>) and the developer
        grants exactly the bindings the program needs. The
        question shifts from &quot;how do we sandbox this
        thing?&quot; to &quot;what do we want this thing to be
        able to do?&quot;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workers AI, AI Gateway, and Bring Your Own Model
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agents SDK does not lock you to a model. Workers
        AI is the first-party path: 50+ models hosted on
        Cloudflare GPUs, accessed via a single{" "}
        <code>env.AI</code> binding, with no API key and a
        pay-per-token meter that drops to zero when nothing
        is in flight. The AI Gateway is the second path: a
        proxy in front of OpenAI, Anthropic, Google, Mistral,
        Groq, xAI, DeepSeek, and ten more, with cached
        responses, rate limiting, automatic fallbacks, cost
        tracking, and full request logs. The bring-your-own
        path is a third option: a Workers binding that calls
        a third-party endpoint with your own credentials,
        which is what teams use for fine-tuned models on
        Replicate, SageMaker, or a private inference server.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/models.ts"
        code={`import { createWorkersAI } from "workers-ai-provider";
import { createOpenAI } from "@ai-sdk/openai";

// First-party model on Workers AI: no key, runs on Cloudflare GPUs.
export function localModel(env: Env) {
  const ai = createWorkersAI({ binding: env.AI });
  return ai("@cf/meta/llama-3.3-70b-instruct");
}

// Third-party model behind AI Gateway: cached, logged, rate-limited.
export function gatewayModel(env: Env) {
  const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
    baseURL: \`https://gateway.ai.cloudflare.com/v1/\${env.CF_ACCOUNT_ID}/agents/openai\`,
  });
  return openai("gpt-4o");
}`}
      />
      <p className="mb-6 leading-relaxed">
        Both paths return a Vercel AI SDK-compatible
        {" "}<code>LanguageModel</code>, so the agent code
        does not change when you swap providers. The AI
        Gateway is the bridge that makes a real multi-provider
        setup workable in production: a request that times
        out on OpenAI can transparently retry on Anthropic, a
        cache hit on a repeated question costs zero tokens,
        and the per-request logs land in the same dashboard
        as the agent traces.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP, both sides of the protocol
      </h2>
      <p className="mb-6 leading-relaxed">
        Cloudflare ships first-class support for the Model
        Context Protocol on both sides. As a client, an agent
        can connect to any MCP server (stdio locally,
        streamable HTTP remotely) and consume its tools as
        plain function calls. As a server, a Cloudflare
        Workers project can expose its agents, tools, and
        resources as a remote MCP server reachable from
        Cursor, Claude Desktop, Claude Code, VS Code, or any
        OpenAI-compatible client. The Cloudflare team
        publishes a worked reference architecture for
        enterprise MCP, with managed OAuth, AI Gateway, and
        portal-style fan-out, which is the path for an
        internal team that wants to expose dozens of
        backend services through one consistent contract.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/mcp/server.ts"
        code={`import { McpAgent } from "agents/mcp";
import { z } from "zod";

export class GithubMcpServer extends McpAgent {
  server = {
    name: "github-tools",
    version: "1.0.0",
  };

  tools = {
    list_issues: {
      description: "List open issues in a repo.",
      inputSchema: z.object({ repo: z.string() }),
      execute: async ({ repo }) => {
        return await this.env.GH.fetch(\`/repos/\${repo}/issues\`).then(
          (r) => r.json(),
        );
      },
    },
  };
}`}
      />
      <p className="mb-6 leading-relaxed">
        The Knock team built their public MCP server on this
        primitive and shipped it in weeks rather than months;
        the Cloudflare team uses the same pattern to expose
        the full Cloudflare API as a remote MCP server with
        Code Mode-style tool compression. The combination of
        the Agents SDK runtime and the MCP transport is the
        cleanest path we have seen for putting an internal
        tool surface in front of any model.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sandboxes, Browser Run, AI Search, and Agent Memory
      </h2>
      <p className="mb-6 leading-relaxed">
        Four primitives shipped during Agents Week 2026 round
        out the toolbox.{" "}
        <strong>Sandboxes</strong> reached GA: a real Linux
        environment per agent with a shell, a filesystem, and
        background processes that persist across restarts and
        pick up where they left off. The paired Outbound
        Workers for Sandboxes act as a programmable
        zero-trust egress proxy: the sandbox itself never
        sees the GitHub token or the Stripe secret, but the
        proxy injects them on outbound calls based on the
        agent identity and a policy you control.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Browser Run</strong> (formerly Browser
        Rendering) is the headless Chromium primitive built
        for agent use. The 2026 additions are what turn it
        from a rendering service into an action layer:
        Live View streams the page back to the user in real
        time, Human in the Loop lets the user take over the
        browser to handle a CAPTCHA or a sign-in, CDP access
        gives the agent the full Chrome DevTools Protocol,
        session recordings persist for replay, and the
        per-account concurrency limit went up four-fold for
        agent workloads.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AI Search</strong> is the search primitive
        for agents. Create an instance, upload files (PDF,
        markdown, HTML, plain text, structured JSON), and
        query across instances with hybrid retrieval and
        relevance boosting. There is no separate vector store
        to provision, no embedding pipeline to maintain, and
        the agent calls it as one tool. For teams that
        already run Vectorize directly, that primitive is
        still there; AI Search is the higher-level path that
        most agent teams reach for first.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent Memory</strong> is the managed
        long-term memory service. It exposes a small set of
        operations the agent calls as a tool:{" "}
        <code>remember</code>,{" "}
        <code>recall</code>,{" "}
        <code>forget</code>, and a search query. Under the
        hood it handles deduplication, structured forgetting
        of stale facts, and indexing across multiple agents
        and users with the right access controls. Teams that
        want full control can still keep memory inside the
        Durable Object SQLite database; Agent Memory is the
        managed answer for teams that do not want to build
        the memory pipeline themselves.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workflows v2: saga-style background work
      </h2>
      <p className="mb-6 leading-relaxed">
        For agent work that has clear deterministic steps and
        long external waits, Cloudflare Workflows v2 is the
        right layer to lean on. The 2026 rearchitecture
        raised the concurrency ceiling to 50,000 workflows
        and 300 new creations per second per account, and the
        June 2026 release added saga-style rollbacks: every{" "}
        <code>step.do()</code> can declare a compensating
        action, and a failure later in the workflow runs the
        compensations in reverse order. The pattern is the
        right one for a multi-step purchase, a multi-system
        provisioning flow, or any pipeline where partial
        completion is worse than no completion at all.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/workflows/order.ts"
        code={`import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from "cloudflare:workers";

export class OrderWorkflow extends WorkflowEntrypoint<Env, OrderInput> {
  async run(event: WorkflowEvent<OrderInput>, step: WorkflowStep) {
    const reservation = await step.do(
      "reserve inventory",
      { compensate: (r) => releaseInventory(r) },
      () => reserveInventory(event.payload),
    );

    const charge = await step.do(
      "charge payment",
      { compensate: (c) => refund(c) },
      () => chargePayment(event.payload),
    );

    await step.do("ship", () => createShipment(reservation, charge));
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        The Workflow runs alongside the agent rather than
        inside it. The agent (a Durable Object) kicks off the
        workflow with{" "}
        <code>env.ORDER_WORKFLOW.create(payload)</code>,
        stores the workflow ID, hibernates, and wakes when
        the workflow signals completion or failure. The
        workflow handles the durability, the retries, and
        the rollback; the agent handles the conversation and
        the planning. That split is the cleanest production
        pattern we see in 2026 for any workload that mixes
        chat-style interaction with multi-step backend work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Observability and security: AI Gateway, Mesh, OAuth, scoped tokens
      </h2>
      <p className="mb-6 leading-relaxed">
        Observability piggybacks on the existing Cloudflare
        stack. Every Workers AI call and every AI
        Gateway-routed third-party call lands in the AI
        Gateway log with the prompt, the response, the model
        ID, the cost, and the latency. Workers logs and
        traces flow into Workers Logs and out via OTLP to any
        backend that speaks the protocol. Project Think adds
        per-step tracing for the agent loop, and{" "}
        <code>this.broadcast()</code> calls from inside a
        fiber stream live progress to any connected client
        for the run-replay debug surface.
      </p>
      <p className="mb-6 leading-relaxed">
        Security gets four pieces. <strong>Cloudflare
        Mesh</strong> gives agents scoped, identity-aware
        access to private networks without manual tunnels, so
        a research agent can reach an internal Postgres
        without exposing it to the open Internet.{" "}
        <strong>Managed OAuth for Access</strong> implements
        RFC 9728 so agents can sign in to internal apps on
        behalf of users instead of carrying long-lived
        service-account tokens.{" "}
        <strong>Scoped API tokens and automated revocation</strong>{" "}
        let you grant the agent the smallest possible
        permission for the shortest reasonable lifetime.{" "}
        <strong>Outbound Workers for Sandboxes</strong> keep
        secrets out of the agent code path entirely, so a
        model that goes off the rails inside a sandbox cannot
        exfiltrate a token it never saw.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns carry most of the production work we
        see from teams shipping Cloudflare Agents in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Remote MCP servers as a product.</strong>{" "}
        Knock, the developer notifications platform, built
        their remote MCP server on the Agents SDK to deliver
        what CTO Chris Bell called &quot;an exceptional
        developer experience in no time at all.&quot; The
        pattern is becoming the default for SaaS companies
        that want their API to be agent-reachable: ship a
        Workers project, expose the surface as MCP, let the
        customer wire it into Cursor or Claude Desktop with
        one config line. The cold-start latency is in single
        digit milliseconds and the per-tenant isolation is a
        Durable Object away.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal coding and operations agents.</strong>{" "}
        Cloudflare itself runs a large internal AI engineering
        stack on the Agents SDK, with Agent Lee as the
        in-dashboard agent that uses sandboxed TypeScript to
        troubleshoot accounts and run platform operations, and
        a fleet of background coding agents that work on
        internal repos. The shape is the same one Project
        Think codifies: a Think-style harness drives the
        loop, the workspace primitive holds the working set,
        Code Mode plus npm runs the actions, and Sandboxes
        come in for the parts that need a real shell. The
        same pattern is what Replit, Vercel, and a growing
        list of dev-tooling companies are putting in front of
        their customers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Multi-channel customer-facing agents.</strong>{" "}
        A support agent that takes chat on the website, email
        through Email Workers, voice through Cloudflare Calls
        or Twilio, and Slack mentions all terminating at the
        same Durable Object is the canonical shape. Per-user
        identity through{" "}
        <code>idFromName()</code> means the agent recognizes
        the customer across channels with no separate
        identity service. WebSocket Hibernation means a
        thousand concurrent conversations cost roughly what
        ten do. AI Search wraps the knowledge base; Agent
        Memory carries the past conversation; Workflows
        handles the refund flow when the agent needs to take
        action.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cloudflare Agents vs AgentCore, OpenAI Agents SDK, Mastra
      </h2>
      <p className="mb-6 leading-relaxed">
        Three other names come up in every comparison. The
        honest read on each:
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS Bedrock AgentCore.</strong> Both are
        managed platforms for running agents at scale. The
        difference is the abstraction. AgentCore is a managed
        runtime layer that wraps any framework (Strands,
        LangGraph, CrewAI) on Firecracker microVMs with
        8-hour session times and a per-vCPU bill. Cloudflare
        Agents is a runtime built on Durable Objects with
        per-message wakeups, near-zero idle cost, and a
        narrower compute envelope per call. Pick AgentCore
        when the workload is AWS-anchored, the session is
        long and CPU-heavy, and the team wants framework
        portability. Pick Cloudflare when the workload is
        many small agents per user, the cost-when-idle story
        matters, and the project is already on Workers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>OpenAI Agents SDK.</strong> Not a competitor:
        Cloudflare published a joint pattern with the OpenAI
        team showing how to run the OpenAI Agents SDK
        <em>inside</em> a Cloudflare Durable Object. OpenAI
        provides the cognition (the planning loop, the tool
        contracts, the memory abstraction); Cloudflare
        provides the execution environment (identity,
        durable state, scheduling, scale). The same pattern
        works for LangChain, the Vercel AI SDK, or a custom
        loop. Pick this combination when you want a specific
        SDK&rsquo;s ergonomics and the Cloudflare platform
        underneath.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Mastra.</strong> The TypeScript-first agent
        framework that ships its own primitives for agents,
        workflows, memory, RAG, evals, and MCP. Mastra is a
        framework choice; Cloudflare Agents is a platform
        choice. The two compose: a Mastra project can deploy
        to Cloudflare Workers, run inside a Durable Object,
        and use Workers AI as the model layer. Pick Mastra
        when you want the opinionated framework story with
        Studio and a managed observability path. Pick
        Cloudflare Agents directly when the platform
        primitives (DOs, Workflows, Sandboxes, Browser Run)
        are the load-bearing piece and you prefer a thinner
        framework on top.
      </p>
      <p className="mb-6 leading-relaxed">
        A short decision rule we use on engagements. If the
        stack is already on Cloudflare or the agent shape is
        &quot;one persistent agent per user with many small
        wake-ups,&quot; Cloudflare Agents is the default. If
        the workload is CPU-heavy and tied to AWS,
        AgentCore is the natural choice. If the team wants a
        specific framework&rsquo;s ergonomics, run that
        framework inside a Durable Object with the Agents
        SDK runtime as the substrate.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        Cloudflare Agents is the right answer for a lot of
        2026 work, but it is not free. An honest list of the
        trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> The cost-when-idle story
        is real and unmatched in the agent space: per-agent
        billing on CPU time plus WebSocket Hibernation means
        a million provisioned agents cost roughly what a few
        thousand active ones do. Durable Objects give every
        agent identity, state, and a private database
        without a separate Redis or Postgres. The
        platform&rsquo;s global network means an agent
        wakes in the colo closest to the user, with sub-50ms
        cold starts that the framework treats as the
        default rather than an optimization. The toolbox is
        broad: Workers AI for first-party inference, AI
        Gateway for everyone else, Browser Run for the open
        web, Sandboxes for real Linux work, AI Search for
        retrieval, Agent Memory for long-term recall, MCP
        on both sides of the protocol, Workflows for durable
        multi-step transactions. Security is built into the
        platform (Mesh, Managed OAuth, scoped tokens, egress
        proxy) rather than bolted on. And the developer
        experience holds up: three commands gets a running
        agent with no API keys.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The platform is opinionated:
        a team that wants long, CPU-heavy single-request
        workloads (an hour of dense inference per request)
        fights the Workers shape and is better off on a
        container platform or AgentCore. The Durable Object
        memory limit (128 MB per object) is generous for
        chat but tight for a streaming video pipeline. Some
        of the most exciting primitives (Project Think,
        Agent Memory, Browser Run features) are in preview
        as of mid-2026, and the API surface is still
        evolving in the open with the team. The framework
        ecosystem on Cloudflare is younger than the
        equivalent on Python; you get the OpenAI Agents SDK
        integration and a growing Mastra story, but
        LangChain and CrewAI are not first-class citizens
        the way they are inside AgentCore. And the
        single-vendor exposure is real: agents that lean
        heavily on Workers AI, Workflows, and Durable
        Objects do not migrate to another cloud without a
        meaningful rewrite.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A stateless
        chatbot endpoint without tools, scheduling, or
        memory does not need an agent framework at all; a
        plain Worker with a streamed Workers AI call is
        enough. A workload that has to run on a specific
        cloud (regulatory, contractual, or because the
        rest of the platform is already there) belongs
        where the platform is. A team that needs a managed
        long-running container with a full Linux shell for
        hours at a time should look at AgentCore, Fly, or
        a dedicated agent-hosting service first; Cloudflare
        Sandboxes cover most of that need but the platform
        is still optimized around small, frequent wake-ups
        rather than long single sessions.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the Cloudflare Agents roadmap and
        the broader edge-agent ecosystem for the next year.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>One agent per user becomes the default
        billing unit.</strong> The DO cost-when-idle model
        makes per-user agents financially trivial, and
        teams are starting to design around that: one
        agent per customer for SaaS, one agent per ticket
        for support, one agent per email thread for an
        inbox assistant. The marginal cost of spawning a
        new agent is effectively zero, which changes how
        product teams think about agent scope.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Code Mode replaces tool-per-endpoint as
        the default tool surface.</strong> The 99.9
        percent token reduction on the Cloudflare API
        example is too large to ignore. The pattern is
        landing in other frameworks (the Anthropic team
        published a similar idea under the name &quot;skills
        as code&quot; in 2026), and the Project Think
        execution ladder gives Cloudflare the cleanest
        path to it because Dynamic Workers were built for
        exactly this use case.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Sandboxes plus Outbound Workers become
        the standard agent-action layer.</strong> The
        identity-aware egress proxy is the part most
        platforms still hand to the agent code; pulling
        secrets out of the agent path entirely is the
        right default for a workload that runs
        model-written code. Other platforms will copy this
        pattern over the next year.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The agentic web standardizes on
        machine-readable surfaces.</strong> The Agent
        Readiness score, Redirects for AI Training, and
        Cloudflare Mesh are early bets on a web that
        treats agents as a first-class client. Whether or
        not Cloudflare&rsquo;s specific proposals win, the
        direction is clear: by late 2026, a site that is
        not agent-readable will look the same way a site
        that is not mobile-readable did in 2014.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the edge as the agent substrate
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about Cloudflare Agents is
        what it does not try to be. It does not ship its
        own agent framework on top of every other one; the
        OpenAI Agents SDK, LangChain, Mastra, and a custom
        loop all sit on the same Durable Object substrate
        with no translation. It does not lock you to
        Workers AI for the model; AI Gateway covers 14+
        providers and bring-your-own bindings cover the
        rest. It does not force a particular tool surface;
        MCP servers, Code Mode programs, plain tool calls,
        and direct platform bindings all work side by
        side. What it does ship is the layer the agent
        ecosystem used to ask you to build by hand:
        per-agent identity, durable state, near-zero idle
        cost, a global wake-on-message runtime, and a
        toolbox (Browser Run, Sandboxes, AI Search, Agent
        Memory, Workflows) that covers the actions agents
        actually take in production.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 on a TypeScript team,
        on Workers, or on any project where the
        cost-when-idle math matters, the argument against
        starting on Cloudflare Agents is thin; the
        argument for pairing it with a specific framework
        (the OpenAI Agents SDK for the cognition layer,
        Mastra for the workflow-and-evals story, or
        Project Think for the batteries-included path) is
        real but composes. For teams already running on
        Workers, the move is incremental: one Durable
        Object class, one binding, three commands. For
        teams on another cloud, the question is whether
        the agent shape (many small, intermittent,
        per-user wake-ups) matches the workload; when it
        does, the platform pays for itself in the bill,
        the operational surface, and the time saved not
        building a session layer for the third time.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://developers.cloudflare.com/agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Agents documentation
          </a>
          {" "}- the canonical reference for the Agents SDK,
          the four-part platform model, the example agents
          (chat, Slack, voice, browser, email), and the
          Agent class API surface.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/project-think/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Think: building the next generation of AI agents on Cloudflare
          </a>
          {" "}- the April 2026 launch post that introduces
          fibers, sub-agents, the Session API, the execution
          ladder, and the Think base class.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/agents-week-in-review/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building the agentic cloud: Agents Week 2026 in review
          </a>
          {" "}- the full list of Agents Week launches across
          compute, security, the agent toolbox, prototype to
          production, and the agentic web.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/building-agents-with-openai-and-cloudflares-agents-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building agents with OpenAI and Cloudflare&rsquo;s Agents SDK
          </a>
          {" "}- the joint pattern post showing how to wrap
          the OpenAI Agents SDK in a Durable Object for
          multi-agent, human-in-the-loop, and addressable
          agent designs.
        </li>
        <li>
          <a
            href="https://github.com/cloudflare/agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            cloudflare/agents on GitHub
          </a>
          {" "}- the MIT-licensed open-source repo with the
          Agent class, examples (chat, Slack, voice, MCP,
          OpenAI SDK pairing), and the Project Think
          packages (think, codemode, worker-bundler, shell).
        </li>
        <li>
          <a
            href="https://agents.cloudflare.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            agents.cloudflare.com (the platform overview)
          </a>
          {" "}- the four-step model (input, ask AI, guarantee
          execution, take action), the LunchAgent worked
          example, and the cost-when-idle pricing story.
        </li>
        <li>
          <a
            href="https://developers.cloudflare.com/durable-objects/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Durable Objects documentation
          </a>
          {" "}- the underlying primitive: per-object
          identity, SQLite storage, WebSocket Hibernation,
          and alarms, with the API reference the Agents SDK
          builds on top of.
        </li>
        <li>
          <a
            href="https://developers.cloudflare.com/workers-ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Workers AI documentation
          </a>
          {" "}- the first-party inference catalog, the
          {" "}<code>env.AI</code> binding, the model IDs,
          and the pricing model the Agents SDK calls into.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/sandbox-ga/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Sandboxes GA
          </a>
          {" "}- the launch post for the per-agent Linux
          environment with shell, filesystem, and
          background processes that survives restarts.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/browser-run-for-ai-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Browser Run: give your agents a browser
          </a>
          {" "}- the Agents Week 2026 post that renames
          Browser Rendering to Browser Run and adds Live
          View, Human in the Loop, CDP access, and session
          recordings.
        </li>
        <li>
          <a
            href="/articles/aws-bedrock-agentcore-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Amazon Bedrock AgentCore in production 2026
          </a>
          {" "}- the AWS-side managed agent platform, the
          closest peer to Cloudflare Agents on the
          platform-as-runtime question.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the cognition-layer framework that pairs
          cleanly with the Cloudflare runtime through the
          joint pattern from the team.
        </li>
        <li>
          <a
            href="/articles/mastra-typescript-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Mastra in production 2026
          </a>
          {" "}- the TypeScript-first framework that can
          deploy onto Cloudflare and use Workers AI as its
          model layer.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context
          Protocol that Cloudflare Agents consumes and
          produces as a first-class transport.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents in 2026
          </a>
          {" "}- the broader landscape (Temporal, Inngest,
          DBOS, Restate, Cloudflare Workflows) that the
          Cloudflare durability story sits inside.
        </li>
        <li>
          <a
            href="/articles/code-execution-sandboxes-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Code execution sandboxes for AI agents in 2026
          </a>
          {" "}- the deeper read on Dynamic Workers, E2B,
          Daytona, and the rest of the providers in the
          sandbox space.
        </li>
      </ul>
    </div>
  );
}
