import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 12,
  slug: "mcp-production-ai-integrations-2026",
  title:
    "Model Context Protocol in 2026: building production AI integrations on a real standard",
  excerpt:
    "How MCP turned the N×M integration problem into N+M, what the protocol actually looks like under the hood, and the patterns we use to ship MCP servers that survive enterprise security reviews.",
  metaDescription:
    "A practical, technical guide to Model Context Protocol (MCP) for production AI agents in 2026. Covers hosts, clients, servers, tools, resources, prompts, stdio and Streamable HTTP transports, OAuth 2.1 with CIMD, async tasks, sampling, elicitation, MCP Apps, the 2026 roadmap, and a working TypeScript server example.",
  image:
    "https://cdn.sanity.io/images/4zrzovbb/website/1aef864f9b246c740fe3cef6e1068f2220995d5e-2400x1260.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["AI", "Agents", "MCP", "Model Context Protocol", "Integrations"],
  publishDate: "2026-06-03",
  readingTime: "14 min read",
};

export default function McpProductionAiIntegrations2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Eighteen months ago, every AI integration was a one-off. If you wanted
        Claude to read a Notion page, you wrote a Notion-to-Claude connector.
        If you wanted the same agent to also write a Linear ticket, you wrote
        a second one. Move to a new model vendor and the whole library went in
        the bin. In 2026, that work is gone. Model Context Protocol (MCP) ate
        it. Anthropic introduced MCP in November 2024, Anthropic, OpenAI,
        Google, and Microsoft now all support it on the client side, the
        protocol is governed by the Linux Foundation, and the official
        registry is approaching ten thousand public servers. This is how we
        build on it, what the spec actually contains, and where it still
        bites.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The N×M problem MCP actually solves
      </h2>
      <p className="mb-6 leading-relaxed">
        Before MCP, every AI host (Claude, ChatGPT, Cursor, a bespoke agent)
        needed its own custom integration for every external system. If you
        had N hosts and M tools, you needed N×M custom connectors. Each had
        its own auth flow, schema, error-handling story, and lifecycle. None
        of them were reusable across vendors. That maths is why the early
        agent ecosystem looked the way it did: every product reinvented the
        wheel, and changing models meant rebuilding the wheel.
      </p>
      <p className="mb-6 leading-relaxed">
        MCP collapses N×M to N+M. You write one MCP server for your system,
        and every MCP-compatible host can use it. You build one MCP client
        inside your host, and every MCP server is suddenly within reach. It
        is the same trick TCP/IP, USB, and LSP pulled in their own
        categories: define the protocol once, let the ecosystem compound
        around it.
      </p>
      <p className="mb-6 leading-relaxed">
        The signal in the numbers is hard to argue with. Per Anthropic’s
        December 2025 ecosystem update, the Python and TypeScript SDKs alone
        see roughly 97 million monthly downloads, and there are more than ten
        thousand active public MCP servers. Stacklok’s State of MCP in
        Software 2026 survey of senior software leaders found 41% of
        respondents already in some form of production with MCP. For a
        protocol that did not exist two years ago, that is the steepest
        adoption curve in agent infrastructure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three roles, and why the boundary matters
      </h2>
      <p className="mb-4 leading-relaxed">
        MCP defines three roles. Understand them as security and lifecycle
        boundaries, not as code modules.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Host.</strong> The application the user actually interacts
          with. Claude Desktop, Cursor, ChatGPT, VS Code, or your own agent.
          The host owns user consent, the model, and the overall task.
        </li>
        <li>
          <strong>Client.</strong> Lives inside the host and manages one
          connection to one server. A host typically runs many clients in
          parallel, one per server. The client is the place where session
          state, transport, and the protocol handshake live.
        </li>
        <li>
          <strong>Server.</strong> Exposes capabilities through the protocol.
          A server wraps an existing system (an API, a database, a SaaS
          platform) and presents it as a set of MCP primitives. Servers are
          where most of the engineering work goes.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        A single user request can fan out across many servers. “Summarize the
        Q3 thread in Slack and open a Linear ticket for the top action”
        routes through both a Slack server and a Linear server, with the host
        composing results. That composition only works because every server
        speaks the same protocol; the host does not need bespoke logic for
        either.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Three primitives: tools, resources, prompts
      </h2>
      <p className="mb-4 leading-relaxed">
        Every MCP server exposes its capabilities through the same three
        primitives. Choose the right one for each capability or your server
        will fight the protocol.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Tools.</strong> Actions the model can invoke. Send a
          message, create a record, run a query, trigger a deployment. Tools
          are the write side of MCP. The host can require user approval per
          call.
        </li>
        <li>
          <strong>Resources.</strong> Data the model or user can read. Files,
          rows, API responses, documents. Resources are the read side, and
          tend to be the safest surface to expose first.
        </li>
        <li>
          <strong>Prompts.</strong> Reusable templates that standardize how
          the model engages with a domain. A code-review prompt, an incident
          summary prompt, a sales-call recap prompt. Prompts are the part of
          MCP most teams underuse on day one and miss most by day ninety.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        MCP is not a replacement for your APIs. Your APIs still do the work.
        MCP is a uniform discovery and invocation layer that sits on top, so
        a model can find your capabilities without bespoke code on the host
        side. A common rule of thumb on our engagements: expose reads as
        resources, writes as tools, and your house style as prompts. Mixing
        those up is the most frequent design mistake we see in
        community-built servers.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Transports: stdio and Streamable HTTP
      </h2>
      <p className="mb-6 leading-relaxed">
        The current spec defines two standard transports. The older HTTP+SSE
        transport from the 2024-11-05 version is deprecated, with backwards
        compatibility called out explicitly in the spec.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>stdio.</strong> The host launches the server as a local
          subprocess and they exchange JSON-RPC messages over standard
          input/output. Zero network, zero auth, lowest possible setup cost.
          The right choice for desktop tools, local dev integrations, and
          anything the user runs on their own machine.
        </li>
        <li>
          <strong>Streamable HTTP.</strong> The remote transport.
          Server-Sent Events for progress and notifications, HTTP for the
          rest, fully compatible with existing load balancers, proxies, and
          CDNs. This is what you ship to a SaaS customer or run inside an
          enterprise. The 2025-03 spec made it production-ready; the 2025-11
          spec added the session, task, and auth machinery you actually need
          to operate it at scale.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Connections are stateful in both modes. That distinguishes MCP from a
        plain REST API and is the feature that makes multi-step workflows
        feel coherent: the server can remember context across calls within a
        session, which matters for database transactions, multi-file
        refactors, or any tool that needs to track intermediate state.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A minimal MCP server in TypeScript
      </h2>
      <p className="mb-6 leading-relaxed">
        Here is the smallest server worth running. It exposes a single tool
        over stdio using the official TypeScript SDK and Zod for input
        schemas. This is the shape every server starts with, and the one we
        copy when bootstrapping a new integration on a client engagement.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/server.ts"
        code={`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "tickets-server",
  version: "1.0.0",
});

server.registerTool(
  "create_ticket",
  {
    description: "Create a support ticket in the internal tracker.",
    inputSchema: {
      title: z.string().min(3).describe("Short, action-oriented title"),
      priority: z
        .enum(["low", "medium", "high"])
        .describe("Triage priority assigned by the agent"),
      description: z.string().describe("Full ticket body, markdown allowed"),
    },
  },
  async ({ title, priority, description }) => {
    const res = await fetch(\`\${process.env.TICKETS_API}/tickets\`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: \`Bearer \${process.env.TICKETS_TOKEN}\`,
      },
      body: JSON.stringify({ title, priority, description }),
    });

    if (!res.ok) {
      return {
        isError: true,
        content: [{ type: "text", text: \`Tickets API failed: \${res.status}\` }],
      };
    }

    const ticket = (await res.json()) as { id: string; url: string };
    return {
      content: [
        {
          type: "text",
          text: \`Created ticket \${ticket.id}: \${ticket.url}\`,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();`}
      />
      <p className="mb-6 leading-relaxed">
        Two patterns in there earn their keep in production. First, return a
        structured <code>isError</code> response instead of throwing on
        upstream failure; hosts surface that cleanly to the model, which then
        often retries or asks the user for guidance. Second, treat the Zod
        schema as the contract. The host turns it into the JSON Schema the
        model sees, so the field descriptions are not documentation, they
        are the prompt.
      </p>
      <p className="mb-6 leading-relaxed">
        A serious operational note: if you log on a stdio server, log to
        stderr. Anything written to stdout corrupts the JSON-RPC stream and
        breaks the server. This is the single most common bug we have
        debugged in community-built servers, and it is one line of config
        away.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Wiring a Streamable HTTP server with auth
      </h2>
      <p className="mb-6 leading-relaxed">
        For remote MCP, you need to terminate Streamable HTTP and enforce
        OAuth 2.1 token validation. Here is the shape we use when shipping a
        production server behind an Express app. It validates the bearer
        token on every request, scopes the session to a tenant, and treats
        the MCP server as an OAuth Resource Server per the June 2025 spec
        revision.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/http-server.ts"
        code={`import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { verifyAccessToken } from "./auth";

const app = express();

app.use(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.setHeader(
      "WWW-Authenticate",
      'Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"',
    );
    return res.status(401).end();
  }

  const claims = await verifyAccessToken(auth.slice(7));
  if (!claims) return res.status(401).end();

  (req as any).tenant = claims.tenant_id;
  next();
});

app.all("/mcp", async (req, res) => {
  const server = new McpServer({ name: "crm", version: "1.0.0" });

  server.registerTool(
    "find_account",
    {
      description: "Find a CRM account by domain.",
      inputSchema: { domain: z.string() },
    },
    async ({ domain }) => {
      const tenant = (req as any).tenant as string;
      const account = await crm.findAccount(tenant, domain);
      return { content: [{ type: "text", text: JSON.stringify(account) }] };
    },
  );

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(3000);`}
      />
      <p className="mb-6 leading-relaxed">
        Three points worth flagging. The <code>WWW-Authenticate</code> header
        is how the client discovers your authorization server; the spec
        formalized this in June 2025 by adopting RFC 8707 Resource
        Indicators, which prevents a token issued for one server from being
        reused against another. The tenant claim on the request is the
        cleanest place we have found to enforce multi-tenancy on a shared
        server, since the protocol itself still does not define one. And the
        per-request <code>McpServer</code> instance is deliberate: it makes
        session state easier to reason about under load and matches the
        stateless-by-default direction the 2026-07 draft spec is moving in.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Auth in 2026: OAuth 2.1, CIMD, and session scoping
      </h2>
      <p className="mb-6 leading-relaxed">
        Auth is the area of MCP that has changed the most, and it is where
        every enterprise review focuses. The story now: remote servers act as
        OAuth 2.1 Resource Servers. The client goes through a standard
        authorization-code flow with PKCE against an authorization server you
        point at, gets back a scoped token, and presents it on every request.
        Local stdio servers inherit the host’s permissions, so the security
        boundary is the user’s own machine.
      </p>
      <p className="mb-6 leading-relaxed">
        The November 2025 spec shifted the default for client registration
        from Dynamic Client Registration (DCR) to Client ID Metadata
        Documents (CIMD). With CIMD, a client’s identity is a URL pointing
        to a JSON document the client controls, and the authorization server
        fetches that metadata on demand instead of maintaining a registration
        database per client. This is the change that makes MCP’s scale
        tractable: a single client may connect to thousands of servers it
        has never met, and a database row per server-client pair was never
        going to hold.
      </p>
      <p className="mb-6 leading-relaxed">
        On top of the spec, the pattern we recommend for sensitive workloads
        is session-scoped authorization: do not hand the agent a long-lived
        token at all. Issue access for the duration of a single task,
        revoke when the task ends, and require an explicit human approval
        for a new session. Static client secrets remain common in production
        and they will burn you. The 2026 roadmap calls them out by name as
        a gap to close.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Beyond request/response: tasks, sampling, elicitation
      </h2>
      <p className="mb-4 leading-relaxed">
        The 2025-11-25 spec turned MCP from a strict call-and-respond
        protocol into something closer to a collaboration framework. Three
        primitives drive the change.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Tasks.</strong> A call-now, fetch-later pattern. Any
          request can return a task handle immediately and continue work in
          the background. Clients poll or subscribe for progress. Tasks move
          through defined states (<code>working</code>,{" "}
          <code>input_required</code>, <code>completed</code>,{" "}
          <code>failed</code>, <code>cancelled</code>) so an agent can
          report meaningful status on a ten-minute ETL job without holding a
          connection open.
        </li>
        <li>
          <strong>Sampling.</strong> The server asks the host to run a model
          completion. Lets a server reason about intermediate state, validate
          assumptions, or generate content inside its own workflow, with the
          user able to review and edit sampled output before it returns.
        </li>
        <li>
          <strong>Elicitation.</strong> The server pauses execution and asks
          the user for input. Form-mode handles structured questions; URL-mode
          hands the user off to a trusted external page for OAuth, payment, or
          credential entry, then resumes. This is how you keep humans in the
          loop without inventing a side channel.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Combined, these turn the server from a passive endpoint into an
        active participant. A research server can spawn its own internal
        agent loop using sampling, report progress through tasks, and stop
        to ask the user for clarification through elicitation, all over the
        same MCP connection. The orchestration code we used to write by hand
        is now the protocol.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP Apps: the UI layer
      </h2>
      <p className="mb-6 leading-relaxed">
        Until January 2026, every MCP interaction was text. MCP Apps,
        launched as the first official spec extension and co-developed with
        OpenAI, lets tools return rich HTML interfaces that render in
        sandboxed iframes inside the host’s chat. Users edit a Figma board,
        manipulate an Amplitude dashboard, or compose a Slack message
        without leaving the conversation. Launch partners include Amplitude,
        Asana, Box, Canva, Clay, Figma, Hex, monday.com, Slack, and
        Salesforce, with support across Claude, ChatGPT, Goose, and VS Code.
      </p>
      <p className="mb-6 leading-relaxed">
        The security model is iframe sandboxing, pre-declared templates,
        auditable JSON-RPC messaging, and user consent for any UI-initiated
        tool call. The pragmatic reading: this is the first protocol-level
        answer to the long-running question of how agentic workflows escape
        the chat box without each host building its own custom plugin UI.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real workloads where MCP earned its place
      </h2>
      <p className="mb-4 leading-relaxed">
        Three shapes of work where MCP has paid for itself on engagements
        this year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Internal developer agents.</strong> An MCP server over a
          private codebase exposes repo search, dependency graphs, and CI
          history as resources, with a small set of tools for opening PRs
          and triggering test runs. The same server is used by Cursor, VS
          Code, Claude Desktop, and an internal CLI agent. Three hosts, one
          server, one auth surface. The cost saving versus the previous
          one-connector-per-host world was not subtle.
        </li>
        <li>
          <strong>Customer support copilots.</strong> A Streamable HTTP
          server fronts the support stack: Zendesk for tickets, the data
          warehouse for customer history, the docs site for canonical
          answers. The model gets read access by default; ticket updates,
          refunds, and account changes go through explicit approval tools.
          Multi-tenancy is enforced from the bearer token, not the
          protocol. Audit logs are written outside MCP, against a SIEM the
          security team already runs.
        </li>
        <li>
          <strong>Data analyst agents.</strong> A read-only MCP server over
          the data warehouse exposes catalogs and sample rows as resources
          and SQL queries as a tool. The model plans, the server executes,
          results stream back. Cloudflare’s “Code Mode” pattern,
          publicly demoed at 98%+ token savings by letting agents discover
          tools dynamically rather than loading every definition upfront, is
          the right reference design here for hosts with hundreds of
          available servers.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Across all three, the consistent win is portability: when the
        underlying model or host changes, the server does not. That is not a
        cost saving you can point at on a slide, but it is what “moving
        fast” actually means twelve months in.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where MCP still hurts
      </h2>
      <p className="mb-4 leading-relaxed">
        We use it on most engagements. It is not free.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Enterprise observability is DIY.</strong> The protocol
          does not define a standardized audit trail. Teams building
          production MCP deployments invent their own logging, tracing, and
          SIEM integration. The 2026 roadmap calls this out as a gap and
          most of the work is expected to land as an extension, not in core.
        </li>
        <li>
          <strong>Multi-tenancy is not in the spec.</strong> SaaS providers
          building MCP servers have to enforce tenant isolation themselves,
          usually via claims on the OAuth token. There is no canonical
          model for this yet.
        </li>
        <li>
          <strong>Rate limiting and cost attribution are unsolved.</strong>{" "}
          When agents invoke tools autonomously, organizations need caps and
          per-team attribution. The protocol does not address this; payment
          protocols like x402 and Stripe MPP are starting to fill the
          cross-organizational side, but internal cost governance is still
          your problem.
        </li>
        <li>
          <strong>Server quality is uneven.</strong> Some servers are
          official and well-maintained (GitHub, Stripe). Many are weekend
          hacks. There is no conformance testing yet, though the roadmap
          commits to it. Treat any community server you adopt the same way
          you treat any other open-source dependency in production: read
          the code.
        </li>
        <li>
          <strong>Config portability is missing.</strong> Setting up the
          same MCP server in Claude Desktop, Cursor, and VS Code means
          configuring it three times. The roadmap lists this as a 2026
          priority. Until then, document your server’s setup carefully.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 roadmap
      </h2>
      <p className="mb-4 leading-relaxed">
        The official roadmap published in March 2026 organizes work around
        four priorities. These are the changes that will shape what you
        build for the rest of the year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Transport evolution.</strong> Streamable HTTP gets a
          stateless mode so sessions can migrate across server instances
          during scale-out. MCP Server Cards standardize metadata discovery
          at a <code>.well-known</code> URL so registries and crawlers can
          inspect a server without connecting.
        </li>
        <li>
          <strong>Agent communication.</strong> More sophisticated patterns
          for sampling, server-side agent loops, and parallel tool calls. The
          protocol is moving toward letting servers coordinate multi-step
          reasoning natively, not just expose endpoints.
        </li>
        <li>
          <strong>Enterprise readiness.</strong> Structured audit trails,
          SSO-integrated auth, gateway and proxy patterns, and configuration
          portability. Most of this is expected to land as extensions rather
          than core spec changes. This is the bucket that decides whether
          you can stop building plumbing around the protocol.
        </li>
        <li>
          <strong>Governance maturation.</strong> A clear contributor
          ladder, Working Group delegation, and standardized charter
          templates under the Linux Foundation, so SEPs stop bottlenecking
          on core-maintainer review.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How MCP compares to neighbors
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>MCP vs plain APIs.</strong> APIs are point-to-point. MCP
          is a protocol layer on top of your APIs that gives any AI host a
          standard way to discover and call them. Your APIs still do the
          work.
        </li>
        <li>
          <strong>MCP vs function calling.</strong> Function calling is the
          model’s ability to decide to invoke a tool. MCP is the protocol
          that connects the model to the tool. OpenAI adopted MCP precisely
          to give its function-calling infrastructure access to a shared
          ecosystem instead of maintaining a separate plugin architecture.
        </li>
        <li>
          <strong>MCP vs A2A.</strong> Google’s A2A standardizes
          agent-to-agent communication. MCP standardizes agent-to-tool. They
          are complementary, not competitive. A production agent system
          will commonly use MCP for tools and A2A for coordination.
        </li>
        <li>
          <strong>MCP vs LangChain or LangGraph.</strong> Different layers.
          MCP is the wire protocol. LangChain and LangGraph are
          orchestration frameworks that sit above it. LangChain already
          integrates MCP, and we routinely pair a LangGraph state machine
          with MCP servers for tool access.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How to introduce MCP on a real project
      </h2>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Pick one integration you already maintain a connector for. The win
          on day one is replacing existing custom plumbing, not inventing a
          new product.
        </li>
        <li>
          Build it as a stdio server first. Iterate locally against Claude
          Desktop or Cursor until the tool surface and resource shape are
          right. This is the cheapest possible feedback loop.
        </li>
        <li>
          Port to Streamable HTTP only when you have a remote consumer or a
          multi-user requirement. Most of the spec’s complexity (auth,
          sessions, tasks) only matters at this step.
        </li>
        <li>
          Adopt the most boring auth that satisfies your security review.
          OAuth 2.1 with PKCE, RFC 8707 resource indicators, scoped tokens.
          Reach for CIMD when you find yourself maintaining a client
          registration table that grows faster than your users do.
        </li>
        <li>
          Wire structured logs from day one. The protocol will not give you
          observability; your existing APM and SIEM tooling has to. Treat
          MCP traffic like any other production HTTP traffic.
        </li>
        <li>
          Only adopt async tasks, sampling, elicitation, or MCP Apps when a
          specific user-facing requirement demands them. Each one adds
          surface area you have to operate.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where to go from here
      </h2>
      <p className="mb-6 leading-relaxed">
        If you have AI features in production and you are still maintaining
        bespoke connectors per host, the next ninety days are when MCP starts
        paying back. Start with the smallest server that replaces an
        existing connector. The official TypeScript and Python SDKs are
        production-quality, the registry has reference servers for most
        common SaaS systems, and Claude Desktop or Cursor make for a fast
        local test loop.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on whether MCP is the right next step
        for your agent stack, or help planning the migration from a custom
        connector layer,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          reach out
        </a>
        .
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/handbooks/claude/mcp"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP servers, in our handbooks
          </a>
          {" "}&mdash; the three config scopes, the transports that
          matter today, and one working <code>.mcp.json</code> to
          copy into a project.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/news/model-context-protocol"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing the Model Context Protocol (Anthropic)
          </a>
          {" "}&mdash; the original launch post and the canonical framing of
          the N×M problem.
        </li>
        <li>
          <a
            href="https://modelcontextprotocol.io/specification/2025-11-25"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP specification (2025-11-25)
          </a>
          {" "}&mdash; the canonical protocol reference for hosts, clients,
          servers, transports, and security expectations.
        </li>
        <li>
          <a
            href="https://github.com/modelcontextprotocol/typescript-sdk"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official TypeScript SDK
          </a>
          {" "}&mdash; the SDK used in the code samples above, with runnable
          examples in the <code>examples/</code> directory.
        </li>
        <li>
          <a
            href="https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Everything your team needs to know about MCP in 2026 (WorkOS)
          </a>
          {" "}&mdash; the most thorough single overview of the protocol’s
          current state, including auth evolution and the ecosystem map.
        </li>
        <li>
          <a
            href="https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP Adoption Statistics 2026 (Digital Applied)
          </a>
          {" "}&mdash; source-backed adoption numbers, registry snapshots, and
          GitHub ecosystem signals.
        </li>
        <li>
          <a
            href="https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The 2026 MCP Roadmap
          </a>
          {" "}&mdash; the official roadmap covering transport, agent
          communication, enterprise readiness, and governance.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026
          </a>
          {" "}&mdash; the orchestration layer we most commonly pair with MCP
          servers in production.
        </li>
      </ul>
    </div>
  );
}
