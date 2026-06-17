import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 25,
  slug: "a2a-protocol-cross-vendor-agents-2026",
  title:
    "Agent-to-Agent (A2A) protocol in 2026: building cross-vendor AI agent networks with Google's open standard",
  excerpt:
    "How the A2A protocol grew from a Google announcement to a Linux Foundation standard with 150+ organizations, 22,000 GitHub stars, and production deployments at AWS, Microsoft, Salesforce, SAP, and ServiceNow. Agent Cards, JSON-RPC tasks, SSE streaming, the MCP comparison, and a working Python example.",
  metaDescription:
    "A practical, technical guide to the Agent2Agent (A2A) protocol in 2026. Covers Agent Cards and discovery, the JSON-RPC task lifecycle, SSE streaming for long-running work, OAuth and signed-card authentication, A2A versus MCP and where each one fits, the AP2 payments extension, production deployments across Google, Microsoft, AWS, Salesforce, SAP, and ServiceNow, the Agent Card Poisoning threat, and a working Python SDK example.",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "A2A",
    "Agent2Agent",
    "Protocol",
    "Interoperability",
    "Multi-Agent",
    "Google",
    "Linux Foundation",
    "Production",
  ],
  publishDate: "2026-06-17",
  readingTime: "17 min read",
};

export default function A2aProtocolCrossVendorAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        A year ago, two AI agents from different vendors had no
        standard way to talk to each other. A scheduling agent from
        one platform could not hand a meeting prep task to a research
        agent on another platform without a custom integration that
        broke the moment either side shipped a new version. In April
        2025 Google announced the Agent2Agent protocol, in June 2025
        it was contributed to the Linux Foundation, and in early 2026
        it shipped v1.0. By April 2026 the project had crossed 150
        member organizations, 22,000 GitHub stars, five official SDKs,
        and production deployments at AWS, Microsoft, Salesforce, SAP,
        ServiceNow, and IBM. A2A is now the default answer to the
        cross-vendor agent communication question, and the answer is
        boring in the best way: agents publish a JSON file that
        describes what they do, callers post JSON-RPC tasks against
        it, and long-running work streams back over Server-Sent
        Events. The plumbing that took weeks to build pairwise now
        takes an afternoon.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why a separate agent protocol was needed
      </h2>
      <p className="mb-6 leading-relaxed">
        The Model Context Protocol that Anthropic shipped in late 2024
        solved a real problem: how a single agent reaches out to the
        world. MCP standardizes tool calls, resource access, and
        prompts so that any MCP-aware client can connect to any
        MCP-compliant server. It is the agent-to-tool layer, and it
        won fast. By 2026 MCP has crossed 97 million SDK downloads
        and is supported by every major model vendor.
      </p>
      <p className="mb-6 leading-relaxed">
        MCP does not answer the next question. Once you have two
        agents from two vendors, both perfectly able to call their
        own tools, how do they coordinate with each other? Treating
        the second agent as a tool collapses the abstraction. The
        second agent has its own memory, its own planning loop, its
        own long-running tasks, and its own opinions about how to
        get work done. Wrapping that behind a single tool call hides
        most of what makes the second agent useful, and the calling
        agent has no clean way to track progress, cancel work,
        respond to clarifying questions, or supply partial inputs as
        they become available.
      </p>
      <p className="mb-6 leading-relaxed">
        A2A is the answer. It sits next to MCP in the stack, not on
        top of it. MCP is how an agent talks to a database, a Slack
        workspace, or a CRM. A2A is how an agent talks to another
        agent. Most production multi-agent deployments in 2026 run
        both: MCP at the tool layer, A2A at the coordination layer.
        The two protocols were explicitly designed by separate
        groups, ship separate SDKs, and answer separate questions.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>150+ member organizations</strong> in the A2A
          project as of April 2026, up from the 50 launch partners in
          April 2025. Members include AWS, Cisco, Google, IBM,
          Microsoft, Salesforce, SAP, and ServiceNow.
        </li>
        <li>
          <strong>22,000+ GitHub stars</strong> on the core
          a2aproject/A2A repository, with five official SDKs in
          Python, JavaScript, Java, Go, and .NET.
        </li>
        <li>
          <strong>v1.0 shipped in early 2026</strong>, with v1.2
          adding cryptographically signed Agent Cards for verified
          domain identity.
        </li>
        <li>
          <strong>Apache 2.0 license</strong> and Linux Foundation
          governance under the Agentic AI Foundation, contributed by
          Google in June 2025.
        </li>
        <li>
          <strong>4 verticals in production</strong>: supply chain,
          financial services, insurance, and IT operations are the
          named domains in the Linux Foundation one-year retrospective.
        </li>
        <li>
          <strong>60+ partners on AP2</strong>, the Agent Payments
          Protocol extension announced in September 2025, including
          Mastercard, PayPal, Coinbase, American Express, and
          Salesforce.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: Agent Cards, Tasks, Messages, Artifacts
      </h2>
      <p className="mb-6 leading-relaxed">
        A2A is small on purpose. The whole protocol fits in four
        primitives, and most of the SDK code is boilerplate around
        them. The four primitives are the Agent Card, the Task, the
        Message, and the Artifact.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Agent Card</strong> is the discovery file. Every
        A2A server publishes a JSON document at
        /.well-known/agent.json that describes the agent: its name, a
        human description, the skills it offers, the service endpoint
        URL, the authentication methods it supports, and the
        capabilities it can stream. A calling agent fetches the card
        once, caches it, and now knows exactly what the remote agent
        can do and how to reach it. The card is the contract.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Task</strong> is the unit of work. A client agent
        starts a task by posting a JSON-RPC request to the server
        endpoint from the Agent Card. The task carries an id, an
        initial message, and a status. The status transitions through
        a defined lifecycle: submitted, working, input-required,
        completed, canceled, rejected, or failed. The terminal states
        are sticky: a task that lands on completed, canceled,
        rejected, or failed cannot be restarted. The client opens a
        new task instead.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Message</strong> is the conversation. Each task
        is a stateful exchange of one or more messages between the
        client and the server. A message has a role (user or agent),
        one or more parts (text, file, structured data), and an
        optional reference to the task it belongs to. A task that
        needs more information transitions to input-required, the
        client sends another message, and the task moves back to
        working. This is what makes A2A different from a fire-and-
        forget RPC call: the agent on the other end can ask
        clarifying questions before it finishes.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Artifact</strong> is the output. When a task
        produces something durable, like a generated document, an
        analysis result, or a structured JSON object, the server
        returns it as an artifact attached to the task. Artifacts are
        addressable so the client can reference them later without
        re-running the work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        An Agent Card by example
      </h2>
      <p className="mb-6 leading-relaxed">
        The card is just JSON. Here is a minimal but realistic Agent
        Card for a research agent that can summarize documents and
        answer follow-up questions. The fields are the same across
        every A2A implementation.
      </p>
      <CodeBlock
        language="json"
        filename=".well-known/agent.json"
        code={`{
  "name": "Research Assistant",
  "description": "Summarizes documents and answers follow-up questions about them.",
  "url": "https://research.example.com/a2a",
  "version": "1.0.0",
  "protocolVersion": "0.3.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false,
    "stateTransitionHistory": true
  },
  "defaultInputModes": ["text/plain", "application/pdf"],
  "defaultOutputModes": ["text/plain", "application/json"],
  "authentication": {
    "schemes": ["bearer"],
    "oauth2": {
      "tokenUrl": "https://research.example.com/oauth/token",
      "scopes": ["research.read", "research.summarize"]
    }
  },
  "skills": [
    {
      "id": "summarize_document",
      "name": "Summarize a document",
      "description": "Takes a PDF or text file and returns a structured summary.",
      "tags": ["summarization", "research"],
      "examples": [
        "Summarize this 40-page contract.",
        "Give me a one-paragraph summary of this PDF."
      ]
    },
    {
      "id": "answer_question",
      "name": "Answer a question about a document",
      "description": "Answers questions grounded in a previously uploaded document.",
      "tags": ["qa", "research"]
    }
  ]
}`}
      />
      <p className="mb-6 leading-relaxed">
        Three details in this card matter in production. The
        capabilities block tells the client which transports the
        server supports: streaming via SSE, push notifications via
        webhook, and history retrieval for state transitions. The
        authentication block follows OAuth 2.0 conventions so the
        client knows where to fetch a token and which scopes it needs
        to request. The skills array is the menu. Each skill has an
        id the client uses when it posts a task, a human description
        the calling model can read, and tags the registry can index.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The task lifecycle, end to end
      </h2>
      <p className="mb-6 leading-relaxed">
        A complete A2A interaction has five steps: discover, start,
        stream, respond, finish. The diagram below is the mental
        model. It survives across every SDK because it is what the
        spec mandates.
      </p>
      <CodeBlock
        language="bash"
        filename="A2A task lifecycle"
        code={`Client agent                          Server agent
     |                                       |
     | 1. GET /.well-known/agent.json        |
     |-------------------------------------->|
     |   Agent Card (skills, auth, url)      |
     |<--------------------------------------|
     |                                       |
     | 2. POST /a2a  (tasks/send)            |
     |    { id, message, skill_id }          |
     |-------------------------------------->|
     |   { task_id, status: submitted }      |
     |<--------------------------------------|
     |                                       |
     | 3. tasks/sendSubscribe  (SSE open)    |
     |-------------------------------------->|
     |   event: status (working)             |
     |   event: artifact (partial chunk)     |
     |   event: status (input-required)      |
     |<--------------------------------------|
     |                                       |
     | 4. tasks/send  (clarifying answer)    |
     |-------------------------------------->|
     |   event: status (working)             |
     |   event: artifact (final result)      |
     |   event: status (completed)           |
     |<--------------------------------------|
     |                                       |
     | 5. tasks/get  (retrieve artifact)     |
     |-------------------------------------->|
     |   { artifact, task_id, status }       |
     |<--------------------------------------|`}
      />
      <p className="mb-6 leading-relaxed">
        The whole flow is plain HTTP. Discovery is a GET. Task
        creation is a POST with a JSON-RPC body. Streaming is an SSE
        connection that pushes status changes and artifact chunks.
        Mid-task clarifications are normal HTTP POSTs that move the
        task back to working. Final retrieval is another GET. A team
        with a working HTTP stack already has every transport the
        protocol needs.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A minimal A2A server in Python
      </h2>
      <p className="mb-6 leading-relaxed">
        The official a2a-sdk for Python is the cleanest way to ship
        an A2A server today. The code below is a stripped-down
        version of the pattern in the SDK docs. It serves an Agent
        Card, accepts tasks against a single skill, and returns a
        result. The same shape works for the JavaScript, Java, Go,
        and .NET SDKs with different syntax around the core
        primitives.
      </p>
      <CodeBlock
        language="python"
        filename="server.py"
        code={`from a2a.server.agent_execution import AgentExecutor, RequestContext
from a2a.server.events import EventQueue
from a2a.server.tasks import InMemoryTaskStore
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.apps import A2AStarletteApplication
from a2a.types import AgentCard, AgentSkill, AgentCapabilities
import uvicorn

# 1. Implement the executor. This is where the agent logic runs.
class ResearchExecutor(AgentExecutor):
    async def execute(self, context: RequestContext, queue: EventQueue):
        message = context.message
        # Extract user text from the incoming message parts.
        prompt = "".join(p.text for p in message.parts if p.type == "text")

        # Stream a working status, run the model, then return an artifact.
        await queue.publish_status("working")
        result = await summarize(prompt)        # your model call
        await queue.publish_artifact({"summary": result})
        await queue.publish_status("completed")

    async def cancel(self, context: RequestContext, queue: EventQueue):
        await queue.publish_status("canceled")

# 2. Describe the agent so clients can discover it.
card = AgentCard(
    name="Research Assistant",
    description="Summarizes documents and answers follow-ups.",
    url="https://research.example.com/a2a",
    version="1.0.0",
    capabilities=AgentCapabilities(streaming=True),
    skills=[
        AgentSkill(
            id="summarize_document",
            name="Summarize a document",
            description="Returns a structured summary of a document.",
            tags=["summarization"],
        ),
    ],
)

# 3. Wire the request handler, the executor, and the task store together.
handler = DefaultRequestHandler(
    agent_executor=ResearchExecutor(),
    task_store=InMemoryTaskStore(),
)

# 4. Mount the A2A app on Starlette and start the server.
app = A2AStarletteApplication(agent_card=card, http_handler=handler)

if __name__ == "__main__":
    uvicorn.run(app.build(), host="0.0.0.0", port=8000)`}
      />
      <p className="mb-6 leading-relaxed">
        Four things in this server are worth pulling out because they
        are the production hooks the spec exposes. The executor is
        the only piece of business logic; the SDK does the JSON-RPC
        framing, the SSE plumbing, and the task store bookkeeping for
        you. The publish_status and publish_artifact calls are what
        the client sees over SSE in real time, so a long-running task
        can stream partial results instead of blocking the caller.
        The task store is swappable: InMemoryTaskStore is fine for a
        single process, but production servers wire in Redis or a
        SQL-backed store so the task survives a restart and so
        multiple replicas can serve the same task. The Agent Card is
        a single Python object that the SDK serves at the well-known
        URL for free.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Calling the server from a client agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The client side is just as small. The pattern is: fetch the
        Agent Card, pick a skill, send a task, listen on SSE for the
        result. The snippet below is the minimum a calling agent
        needs.
      </p>
      <CodeBlock
        language="python"
        filename="client.py"
        code={`from a2a.client import A2AClient
import asyncio

async def main():
    # 1. Discover the remote agent.
    client = await A2AClient.from_agent_card_url(
        "https://research.example.com/.well-known/agent.json"
    )

    # 2. Send a task against a specific skill.
    task = await client.send_task(
        skill_id="summarize_document",
        message={
            "role": "user",
            "parts": [{"type": "text", "text": "Summarize the attached PDF."}],
        },
    )

    # 3. Stream the response.
    async for event in client.subscribe(task.id):
        if event.type == "status":
            print("status:", event.state)
        elif event.type == "artifact":
            print("got artifact:", event.payload)
        elif event.state == "completed":
            break

    # 4. Final result is also available via tasks/get.
    final = await client.get_task(task.id)
    print(final.artifacts)

asyncio.run(main())`}
      />
      <p className="mb-6 leading-relaxed">
        The client is provider-agnostic. The same code works against
        a Research Assistant from one vendor today and a different
        Research Assistant from another vendor next week. The only
        thing that changes is the Agent Card URL. That portability is
        the whole point of the protocol, and it is the reason
        enterprises with multi-vendor agent estates have moved on
        A2A so fast.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A2A versus MCP: what each one does
      </h2>
      <p className="mb-6 leading-relaxed">
        The cleanest way to think about the two protocols is to draw
        a line through the agent stack. MCP is below the line; A2A
        is above it. MCP standardizes how an agent reaches its
        tools, files, and external systems. A2A standardizes how
        agents reach each other.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>MCP server.</strong> Exposes a flat list of tools,
          resources, and prompts. A single call returns a single
          result. The server is stateless from the client&rsquo;s
          point of view. Used for: database queries, API calls, file
          system access, Slack posts, CRM lookups.
        </li>
        <li>
          <strong>A2A server.</strong> Exposes skills, runs stateful
          tasks, streams progress, can ask clarifying questions, and
          returns artifacts. Used for: delegating a research task to
          a specialist agent, handing a procurement request to a
          purchasing agent, asking a domain agent to plan and
          execute a multi-step workflow.
        </li>
        <li>
          <strong>Discovery.</strong> MCP servers are typically
          registered at the client by configuration. A2A agents
          publish their card at a well-known URL so any caller can
          discover them at runtime.
        </li>
        <li>
          <strong>Statefulness.</strong> MCP calls are one-shot. A2A
          tasks have a lifecycle that includes pause-and-clarify and
          partial-result streaming.
        </li>
        <li>
          <strong>Identity.</strong> MCP authenticates the calling
          agent. A2A also identifies the remote agent, since the
          remote agent is itself a participant in the workflow.
          Signed Agent Cards in v1.2 are the protocol&rsquo;s answer
          to remote-agent identity.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        In practice almost every serious agent platform in 2026
        ships both. The agent uses MCP servers for low-level
        capability access and A2A endpoints for high-level
        delegation. A planning agent on platform A can call out to a
        coding agent on platform B over A2A, and the coding agent
        can call its own database over MCP, all in the same
        end-user request.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Authentication, identity, and signed Agent Cards
      </h2>
      <p className="mb-6 leading-relaxed">
        A2A leans on existing web auth standards rather than
        reinventing them. The Agent Card declares the authentication
        scheme the server expects; in production deployments this is
        almost always OAuth 2.0 with short-lived bearer tokens. The
        client fetches a token from the token endpoint the card
        advertises, scopes the request to the skills it actually
        needs, and includes the token on every JSON-RPC call. Tokens
        expire in minutes, so a stolen token has a small blast
        radius.
      </p>
      <p className="mb-6 leading-relaxed">
        The harder problem is identity of the remote agent. A
        calling agent fetching a card from a URL has no built-in
        guarantee that the card belongs to the agent it thinks it
        does. A2A v1.2 added cryptographically signed Agent Cards
        so the client can verify the card was issued by the domain
        that owns the agent, the same way TLS verifies a website.
        The signature is the cornerstone of mitigating impersonation
        attacks where a malicious server claims to be a trusted
        agent and lures callers into delegating sensitive work to
        it.
      </p>
      <p className="mb-6 leading-relaxed">
        Signing is supported but not enforced by the spec, which is
        a deliberate trade-off. Enforcing signing on day one would
        have slowed adoption inside intranets and air-gapped
        environments where the domain-verification model does not
        cleanly apply. The hardening playbook for production
        deployments outside the firewall is to enforce signing at
        the client side: refuse to delegate to any agent whose card
        is not signed by a trusted issuer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agent Card Poisoning and the new threat model
      </h2>
      <p className="mb-6 leading-relaxed">
        The most important security finding of the protocol&rsquo;s
        first year is a class of attack the research community has
        named Agent Card Poisoning. A malicious server publishes an
        Agent Card whose skill descriptions, tags, or examples
        contain hidden prompt-injection payloads. When a planner
        agent reads the card to decide which skill to call, the
        injected text reaches the planner&rsquo;s LLM context and
        can steer it into delegating tasks it should not, leaking
        data, or skipping confirmation gates. The exploit is
        cheap because the protocol&rsquo;s discovery step is
        designed to feed the card into the LLM&rsquo;s reasoning.
      </p>
      <p className="mb-6 leading-relaxed">
        The mitigations are layered. The first is to treat the
        Agent Card as untrusted data rather than as a system prompt:
        sanitize the fields before they hit the model and pass them
        through a separate channel from the actual instruction. The
        second is to enforce signed cards from trusted issuers, so a
        random URL on the open internet cannot deliver an attack
        payload to a delegating agent. The third is human-in-the-loop
        gating for any delegation that touches sensitive data or
        money, since even a perfect protocol cannot fix a planner
        that is willing to act on adversarial text.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern is familiar from MCP: the protocol surface is a
        new attack surface, and the threat model needs to account
        for that. A2A inherits the same lesson and the same
        mitigations: signed identity at the protocol layer,
        sandboxing and policy at the host layer, approval gates and
        audit at the workflow layer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where A2A is running in production
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Google Cloud.</strong> Vertex AI Agent Builder
          ships A2A as the default cross-agent protocol, and
          Workspace Studio routes work across Google&rsquo;s own
          agents over A2A. The Google Cloud Next 2026 keynote
          positioned A2A as the cross-vendor backbone of the
          agentic stack rather than a Google-only feature.
        </li>
        <li>
          <strong>Microsoft.</strong> A2A is supported on Azure AI
          Foundry and is the recommended transport for cross-
          platform delegation between Copilot agents and external
          third-party agents. Microsoft contributed early
          improvements to the spec around enterprise authentication.
        </li>
        <li>
          <strong>AWS.</strong> Bedrock Agents added A2A support in
          2026 so customers can wire Bedrock-hosted agents into
          multi-vendor workflows without bespoke glue code.
        </li>
        <li>
          <strong>Salesforce, ServiceNow, Workday.</strong> All
          three of the major SaaS suites expose agent skills over
          A2A. Production deployments coordinate ticket triage,
          procurement, and HR workflows across the suites by
          delegating from a planner agent to the domain agent in
          each suite.
        </li>
        <li>
          <strong>SAP.</strong> SAP exposes agent skills over A2A
          for internal customers and has tighter access controls for
          external A2A callers. The decision is a sign of how
          enterprises are sequencing the rollout: internal first,
          external as the identity story matures.
        </li>
        <li>
          <strong>IBM.</strong> watsonx Orchestrate uses A2A to
          delegate between agents and integrates with the broader
          interoperability foundation IBM has been building around
          its agent runtime.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Across these deployments the production verticals named in
        the Linux Foundation&rsquo;s one-year retrospective are
        supply chain, financial services, insurance, and IT
        operations. The pattern is consistent: a planner agent
        decomposes a customer request, fans it out to domain
        agents in different platforms over A2A, collects the
        artifacts, and stitches the answer. The domain agents do
        not need to know about each other. They only need to
        publish a card and answer task calls.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AP2: the payments extension
      </h2>
      <p className="mb-6 leading-relaxed">
        The biggest extension to the protocol in its first year is
        AP2, the Agent Payments Protocol, announced in September
        2025 with 60+ launch partners. AP2 adds a structured way
        for agents to transact on behalf of users without the user
        having to step into the loop for every purchase. The model
        is built on three signed Mandates: an Intent Mandate that
        captures what the user wants and the budget they will
        spend, a Cart Mandate the agent assembles describing what
        it picked, and a Payment Mandate the merchant or network
        countersigns. The three mandates give every party a
        cryptographic record of who authorized what, which is what
        makes auditable agent commerce work.
      </p>
      <p className="mb-6 leading-relaxed">
        Three production AP2 deployments are public as of April
        2026: PayPal integrated with the Google Cloud Conversational
        Commerce Agent, the Mastercard Agent Pay pilot running
        inside PayPal, and the A2A x402 extension for stablecoin
        payments. The named use cases are mundane but high-value:
        an office-supply agent that restocks when inventory drops
        below a threshold, a procurement agent that renews service
        contracts within a fixed budget, a personal shopping
        agent that buys a flagged item when it goes on sale. The
        common thread is that each transaction is small, frequent,
        and bounded by a user-signed mandate the agent cannot
        exceed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Implementation patterns that hold up in production
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Pick the right granularity for skills.</strong>{" "}
          A skill should be a clear unit of work the calling agent
          can pick by description. Too coarse (one
          do_everything skill) and the planner cannot reason about
          when to call you. Too fine (one skill per HTTP endpoint)
          and the card is unreadable.
        </li>
        <li>
          <strong>Treat the Agent Card as a public contract.</strong>{" "}
          Version it, change it carefully, and document the
          breaking-change policy. Clients cache cards; surprise
          renames break callers.
        </li>
        <li>
          <strong>Stream early and stream often.</strong> A
          long-running task that does not publish a status update
          for thirty seconds looks broken to the caller. Publish
          working as soon as the task starts and publish progress
          updates at every milestone.
        </li>
        <li>
          <strong>Use input-required, not surprise failures.</strong>{" "}
          If the task is missing a piece of information, transition
          to input-required and let the caller supply it. Failing
          the task and asking the caller to retry costs the system
          a full round trip.
        </li>
        <li>
          <strong>Persist task state.</strong> InMemoryTaskStore is
          fine for the tutorial. Production servers need a durable
          task store so a restart does not drop in-flight work and
          so multiple replicas can serve the same task.
        </li>
        <li>
          <strong>Wire A2A into observability the same way you
          wire MCP.</strong> Helicone, Langfuse, Arize Phoenix, and
          Braintrust all added A2A span families in 2026. A
          delegation chain that crosses three agents and four tool
          calls is impossible to debug without trace correlation
          across the protocol boundary.
        </li>
        <li>
          <strong>Default to signed Agent Cards in production.</strong>{" "}
          Inside the firewall the signing requirement is a soft
          one. Outside the firewall, refuse to delegate to a card
          that is not signed by a trusted issuer.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>What you buy.</strong> Cross-vendor
          interoperability without bespoke glue code, a stateful
          task model that handles long-running work and mid-task
          clarification, runtime discovery that lets clients pick
          up new agents without redeploys, and a security model
          built on existing OAuth and TLS rather than a new
          standard the team has to learn.
        </li>
        <li>
          <strong>What you pay.</strong> A second protocol stack
          next to MCP, with its own SDKs, its own observability
          plumbing, and its own threat model. A discipline around
          Agent Cards, signing, and registry hygiene. A planner
          agent that is good enough to pick the right remote
          skill, which is harder than it sounds.
        </li>
        <li>
          <strong>Where it does not fit.</strong> Single-agent
          systems with no delegation needs do not need A2A; MCP
          and direct tool calls are simpler. Tight low-latency
          loops where the SSE round trip dominates the budget
          should keep the work in-process. Ultra-high-security
          environments where a card-based discovery model is a
          policy violation will still need bespoke point-to-point
          contracts.
        </li>
        <li>
          <strong>The competing-spec risk.</strong> ACP, ANP, and a
          handful of academic proposals are still alive. A2A is
          the clear leader by adoption, but a team betting on
          interoperability should keep an eye on the Linux
          Foundation Agentic AI Foundation as the governance body
          works through the overlap.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where A2A is heading through 2027
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Signed cards become the default.</strong> v1.2
          made signing supported. The next minor versions are
          expected to push signing toward required for external
          deployments and to standardize the trusted-issuer model.
        </li>
        <li>
          <strong>Agent registries mature.</strong> Today most
          A2A discovery is by direct URL. Public and private agent
          registries that index cards, surface ratings, and gate
          access by policy are the next layer of infrastructure
          and are already in beta at several vendors.
        </li>
        <li>
          <strong>AP2 lights up consumer commerce.</strong> The
          PayPal and Mastercard integrations were the
          enterprise-first wave. Consumer-facing agentic commerce
          is the obvious next surface and the one regulators are
          watching most closely.
        </li>
        <li>
          <strong>Standardized policy primitives.</strong> The
          spec stops short of dictating policy. The next round of
          ecosystem work is around shared schemas for budget caps,
          consent receipts, and rate limits so policy travels with
          the task across agents.
        </li>
        <li>
          <strong>Tighter MCP and A2A integration.</strong> The
          two protocols are converging on shared identity, shared
          observability schemas, and shared sandboxing
          conventions. Expect SDKs in 2027 that surface both as a
          single agent runtime rather than two separate stacks.
        </li>
        <li>
          <strong>Security research keeps pace.</strong> The
          OWASP Top 10 for Agentic Applications, the Agent Card
          Poisoning literature, and the broader prompt-injection
          research community are tracking A2A as actively as they
          tracked MCP. Expect concrete attack patterns and
          concrete mitigations to keep landing in the spec.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the boring interop layer is the important one
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about A2A is how unflashy it is. The
        protocol is small, the transport is HTTP and SSE, the
        payload is JSON-RPC, and the discovery file is a static
        JSON document. The reason it won the cross-vendor
        coordination question in 2026 is not technical novelty; it
        is that the spec was small enough to implement in a week,
        broad enough to cover real production workloads, and
        permissive enough that AWS, Microsoft, Google, and a long
        list of SaaS vendors could ship it without giving up their
        own agent platforms. The lesson for the next protocol war
        is the same one the web learned twenty-five years ago: the
        interop layer that wins is the one that is boring to ship
        and easy to verify. For multi-agent systems in 2026, A2A
        is that layer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://a2a-protocol.org/latest/specification/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent2Agent (A2A) Protocol Specification (a2a-protocol.org)
          </a>
          {" "}- the canonical reference for the JSON-RPC method
          surface, task lifecycle, and Agent Card schema.
        </li>
        <li>
          <a
            href="https://github.com/a2aproject/A2A"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            a2aproject/A2A on GitHub
          </a>
          {" "}- the open-source home of the protocol, with the
          spec source, examples, and links to the five official
          SDKs.
        </li>
        <li>
          <a
            href="https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            A2A Protocol Surpasses 150 Organizations (Linux Foundation)
          </a>
          {" "}- the April 2026 one-year retrospective with the
          adoption numbers, SDK list, and named production
          verticals.
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
          {" "}- the original April 2025 launch post that frames
          the design goals and the relationship to MCP.
        </li>
        <li>
          <a
            href="https://codelabs.developers.google.com/intro-a2a-purchasing-concierge"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Getting Started with A2A: Purchasing Concierge (Google Codelabs)
          </a>
          {" "}- a walkthrough that builds a concierge agent and a
          remote seller agent, useful for seeing the protocol end
          to end with running code.
        </li>
        <li>
          <a
            href="https://towardsdatascience.com/multi-agent-communication-with-the-a2a-python-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Multi-Agent Communication with the A2A Python SDK (Towards Data Science)
          </a>
          {" "}- the Python SDK tutorial that this article&rsquo;s
          server example is modeled after, with a complete working
          example on GitHub.
        </li>
        <li>
          <a
            href="https://www.keysight.com/blogs/en/tech/nwvs/2026/03/12/agent-card-poisoning"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Card Poisoning: A Metadata Injection Vulnerability (Keysight)
          </a>
          {" "}- the research write-up that named the Agent Card
          Poisoning class of attack and proposed the layered
          mitigation that signed cards address.
        </li>
        <li>
          <a
            href="https://semgrep.dev/blog/2025/a-security-engineers-guide-to-the-a2a-protocol/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            A Security Engineer&rsquo;s Guide to the A2A Protocol (Semgrep)
          </a>
          {" "}- the practitioner playbook on hardening A2A
          deployments, with concrete OAuth and TLS guidance.
        </li>
        <li>
          <a
            href="https://www.truefoundry.com/blog/mcp-vs-a2a"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP vs A2A: Compare Single-Agent and Multi-Agent Protocols (TrueFoundry)
          </a>
          {" "}- the side-by-side comparison that maps the two
          protocols onto the agent-runtime stack.
        </li>
        <li>
          <a
            href="https://arxiv.org/pdf/2505.03864"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            From Glue-Code to Protocols: A Critical Analysis of A2A and MCP Integration (arXiv)
          </a>
          {" "}- the research paper on how the two protocols compose
          in scalable agent systems, with concrete integration
          patterns.
        </li>
        <li>
          <a
            href="https://eco.com/support/en/articles/15192002-ap2-protocol-explained-google-s-agentic-commerce-standard-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AP2 Protocol Explained: Google&rsquo;s Agentic Commerce Standard 2026 (Eco)
          </a>
          {" "}- the deep dive on the Agent Payments Protocol
          extension, the three-mandate model, and the named
          production deployments.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production: AI integrations in 2026
          </a>
          {" "}- the tool-layer counterpart to A2A and the
          companion piece for understanding the full agent
          interoperability stack.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the supervisor, swarm, and A2A patterns that A2A
          gives a wire format to.
        </li>
        <li>
          <a
            href="/articles/ai-agent-security-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent security in 2026
          </a>
          {" "}- the broader security playbook A2A inherits,
          including the prompt-injection threat model and the
          layered defense architecture.
        </li>
      </ul>
    </div>
  );
}
