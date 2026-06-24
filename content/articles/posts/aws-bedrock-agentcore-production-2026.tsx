import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 31,
  slug: "aws-bedrock-agentcore-production-2026",
  title:
    "Amazon Bedrock AgentCore in production 2026: the AWS answer to running agents at scale",
  excerpt:
    "How Amazon Bedrock AgentCore became the AWS production layer for AI agents in 2026, what teams ship with Runtime, Memory, Gateway, Identity, and Observability, and how it compares to the Microsoft Agent Framework, Claude Agent SDK, and OpenAI Agents SDK. Covers Firecracker microVM session isolation, 8-hour runtimes, the Strands Agents open-source SDK, the Harness primitive, MCP and A2A support, x402 payments, and a clear-eyed look at when to pick it and when to look elsewhere.",
  metaDescription:
    "A practical, technical guide to Amazon Bedrock AgentCore in production 2026. Covers the October 2025 GA, the 13 core services (Harness, Runtime, Memory, Gateway, Identity, Code Interpreter, Browser, Observability, Payments, Evaluations, Optimization, Policy, Registry), Firecracker microVM session isolation, 8-hour execution windows, the open-source Strands Agents SDK, MCP and A2A protocol support, x402 micropayments, OpenTelemetry tracing into CloudWatch, and an honest comparison with Microsoft Agent Framework, Claude Agent SDK, OpenAI Agents SDK, and LangGraph.",
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
    "AWS",
    "Amazon Bedrock",
    "AgentCore",
    "Strands",
    "Firecracker",
    "Python",
    "Production",
    "MCP",
    "A2A",
    "Cloud Architecture",
  ],
  publishDate: "2026-06-24",
  readingTime: "18 min read",
};

export default function AwsBedrockAgentCoreProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Through most of 2025 the AWS answer to &ldquo;how do we run an
        agent in production?&rdquo; was a hand-rolled mix: a Lambda
        for the loop, DynamoDB for memory, a Step Function for the
        long jobs, an OpenSearch index for retrieval, a few API
        Gateway routes for tool calls, and a lot of YAML to wire it
        up. It worked, and a lot of teams shipped that way, but it
        also meant every agent project re-invented the same
        plumbing. In July 2025 AWS previewed Amazon Bedrock
        AgentCore, a managed platform that absorbs the plumbing and
        lets the application team focus on the agent. It hit general
        availability on October 13, 2025, expanded again in
        December, and by mid-2026 it covers a wider surface than any
        single competing platform: a managed agent loop, a
        microVM-isolated runtime, memory, gateway, identity, two
        sandboxes (code and browser), policy, evaluations,
        observability, optimization, payments, and a registry. This
        article walks through what is actually in the box, how the
        pieces fit, when to pick it, and where it still hands
        problems back to you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        Two things forced the AWS hand in 2025. The first was that
        every other major vendor shipped a production agent stack
        the same year: Microsoft Agent Framework merged AutoGen and
        Semantic Kernel, the OpenAI Agents SDK and AgentKit came
        out of Dev Day, and the Claude Agent SDK lifted the Claude
        Code internals into a library. AWS could not keep pointing
        customers at a do-it-yourself reference architecture and
        still claim parity. The second was that AWS itself was
        building large internal agent platforms (Cox Automotive
        shipped 17 production agents on AWS in under a year; Druva
        used it to resolve 68 percent of support tickets without a
        human; Thomson Reuters automated 70 percent of platform
        engineering work) and kept hitting the same gaps. AgentCore
        is the AWS solution to those gaps, packaged so external
        teams can reach for it instead of rebuilding it.
      </p>
      <p className="mb-6 leading-relaxed">
        The pitch is narrower than the marketing suggests. AgentCore
        does not ship its own agent framework. The framework is your
        choice: Strands Agents (AWS&rsquo;s own open-source SDK),
        LangGraph, CrewAI, LlamaIndex, Google ADK, the OpenAI
        Agents SDK, or your own custom loop. AgentCore is the layer
        below that: the runtime that hosts the agent, the memory
        store that keeps context across sessions, the gateway that
        wraps your APIs as MCP tools, the identity service that
        decides who can call what, and the observability pipeline
        that traces every decision. The point is to make the
        framework swappable while the production plumbing stays
        constant.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>GA on October 13, 2025</strong> in nine regions
          (N. Virginia, Ohio, Oregon, Mumbai, Singapore, Sydney,
          Tokyo, Frankfurt, Ireland). VPC, PrivateLink,
          CloudFormation, and resource tagging shipped at GA, so
          the agent fits inside the same governance story as the
          rest of a regulated AWS workload.
        </li>
        <li>
          <strong>Thirteen first-party services.</strong> Harness,
          Runtime, Memory, Gateway, Identity, Code Interpreter,
          Browser, Observability, Payments, Evaluations,
          Optimization, Policy, and Registry. Each is consumed
          independently; you do not have to adopt the whole
          surface to use one piece.
        </li>
        <li>
          <strong>Eight-hour session windows on Runtime.</strong>{" "}
          A single session can hold context for an entire shift
          worth of work, which is longer than any competing
          serverless agent host. Lambda caps at fifteen minutes;
          Cloud Run jobs at sixty; AgentCore Runtime at eight
          hours.
        </li>
        <li>
          <strong>Firecracker microVM session isolation.</strong>{" "}
          Every user session runs in a dedicated microVM with
          isolated CPU, memory, and filesystem. The same
          virtualization that backs Lambda and Fargate sits under
          the agent, with the microVM destroyed and memory
          sanitized at the end of the session.
        </li>
        <li>
          <strong>Six framework integrations</strong> at the
          Runtime layer: Strands, LangGraph, CrewAI, LlamaIndex,
          Google ADK, and the OpenAI Agents SDK. Custom frameworks
          and bare loops are supported through the same container
          contract.
        </li>
        <li>
          <strong>100MB request payloads</strong> and bidirectional
          WebSocket streaming. Multimodal traffic (images, audio,
          video) goes through the same endpoint as text, and the
          stream stays open for the full session.
        </li>
        <li>
          <strong>OpenTelemetry by default.</strong> Traces land in
          Amazon CloudWatch out of the box and flow to any external
          backend that speaks OTLP: Dynatrace, Datadog, Arize
          Phoenix, LangSmith, Langfuse, Honeycomb, Grafana.
        </li>
        <li>
          <strong>x402 micropayments</strong> through AgentCore
          Payments, with Coinbase CDP and Stripe (Privy) wallets.
          Agents can pay for paid MCP servers, paid APIs, and
          gated content without a separate billing pipeline.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The thirteen services, grouped by what they actually do
      </h2>
      <p className="mb-6 leading-relaxed">
        The service list looks intimidating; in practice it sorts
        into four buckets. Knowing the buckets makes the decisions
        easier and the bill more predictable.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Build and host.</strong> Harness is the managed
        agent loop: one API call with a model, a prompt, and a
        list of tools, and AgentCore runs the loop inside an
        isolated microVM with filesystem and shell access. Runtime
        is the serverless hosting layer underneath: bring any
        framework, package it as a container, and Runtime gives
        you 8-hour sessions, microVM isolation, persistent
        filesystems, and bidirectional streaming. Most teams use
        one or the other: Harness when you want AgentCore to own
        the loop, Runtime when you already have a framework you
        want to keep.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Connect.</strong> Gateway turns your existing APIs,
        Lambda functions, and OpenAPI specs into MCP-compatible
        tools, and proxies to remote MCP servers (Salesforce, Zoom,
        Jira, Slack, and the long tail). Identity handles who the
        agent is, who the user is, and which third-party services
        the agent is allowed to call on the user&rsquo;s behalf;
        it integrates with Cognito, Okta, Microsoft Entra ID, and
        Auth0. Memory holds short-term and long-term context, with
        the option of a self-managed strategy that lets you write
        your own extraction and consolidation pipeline.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Act.</strong> Code Interpreter gives the agent an
        isolated sandbox to execute Python, JavaScript, or
        TypeScript on its own behalf. Browser gives the agent a
        managed Chromium that works with Playwright or BrowserUse,
        good for filling forms and scraping data behind logins.
        Payments lets the agent buy access to paid MCP servers and
        APIs through the x402 micropayments protocol, with
        configurable spending limits.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Observe and govern.</strong> Observability captures
        every reasoning step, tool call, and model interaction as
        an OpenTelemetry span and ships it to CloudWatch.
        Evaluations runs structured tests against sessions,
        traces, and spans to measure quality before and after a
        change. Optimization (preview, May 2026) uses the eval
        results plus traffic splitting through Gateway to A/B test
        prompt and tool description changes against real traffic.
        Policy enforces hard rules in natural language or Cedar
        before every tool call. Registry is the central catalog of
        agents, MCP servers, tools, and skills with hybrid
        keyword-plus-semantic search.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through AgentCore
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is three layers stacked on top of an
        isolation boundary. The framework layer is your code, in
        whichever SDK you picked. The platform layer is the
        AgentCore services your code calls into for memory,
        tools, identity, and the rest. The infrastructure layer
        is the Firecracker microVM that runs the session and
        keeps it separate from every other session in the system.
      </p>
      <CodeBlock
        language="bash"
        filename="AgentCore request path"
        code={`Your application (web service, CLI, mobile, Lambda)
        |
        |  POST /runtimes/{id}/invocations    (HTTP or WebSocket)
        v
+----------------------------------------------------+
|  AgentCore Runtime (serverless edge)               |
|                                                    |
|  1. Inbound Auth: verify the caller identity       |
|     (Cognito, Okta, Entra ID, Auth0, IAM)          |
|  2. Route to a session microVM                     |
|     - new session -> cold start in a Firecracker VM|
|     - existing session -> resume the microVM       |
|  3. Forward the payload (up to 100MB)              |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Your container (one microVM per session)          |
|                                                    |
|  - Your framework: Strands / LangGraph / CrewAI /  |
|    LlamaIndex / Google ADK / OpenAI Agents SDK     |
|  - Your agent loop runs here, up to 8 hours        |
|  - Filesystem persists across stop/resume          |
|  - Calls into AgentCore platform services:         |
|     * Memory   (short-term + long-term)            |
|     * Gateway  (MCP tools, APIs, Lambdas)          |
|     * Identity (outbound OAuth to Slack/etc.)      |
|     * Code Interpreter, Browser, Payments          |
|  - Policy filter sits between agent and Gateway    |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Observability (OpenTelemetry spans)               |
|  - Spans for model calls, tool calls, decisions    |
|  - Landed in CloudWatch, mirrored to Datadog,      |
|    Dynatrace, LangSmith, Langfuse, Arize, etc.     |
|  - Feeds Evaluations and Optimization              |
+----------------------------------------------------+
        |
        v
   Response back to the caller (streamed or unary)`}
      />
      <p className="mb-6 leading-relaxed">
        Three properties of this flow carry the production work.
        The session is a real VM, not a thread or a process; if
        one session crashes the kernel, it cannot reach the next
        session over. The 8-hour window means a long research job
        or a multi-step workflow can keep its in-memory state
        without staging it to S3 between steps. And the
        OpenTelemetry layer is mandatory and consistent: every
        span follows the GenAI semantic conventions, so the
        Evaluations service and any external observability
        backend can read the same data without per-vendor
        adapters.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Your first agent: a Strands agent on AgentCore Runtime
      </h2>
      <p className="mb-6 leading-relaxed">
        The path of least resistance is a Strands Agents loop
        wrapped with the AgentCore Runtime decorator. Strands is
        the open-source SDK AWS shipped alongside AgentCore; it
        treats the model as the planner and gives the agent a
        small set of decorated tools. The Runtime decorator turns
        the local Python file into a deployable container without
        rewriting the agent.
      </p>
      <CodeBlock
        language="python"
        filename="weather_agent.py"
        code={`from strands import Agent, tool
from strands.models import BedrockModel
from bedrock_agentcore.runtime import BedrockAgentCoreApp

app = BedrockAgentCoreApp()


@tool
def get_weather(location: str) -> str:
    """Return the current weather for a city."""
    # In production this calls the weather provider through
    # an AgentCore Gateway target so the API key never leaves
    # the platform.
    return f"It is sunny and 22 C in {location}."


@tool
def get_attractions(location: str) -> list[str]:
    """Return three attractions for a city."""
    return ["Louvre", "Eiffel Tower", "Sainte-Chapelle"]


agent = Agent(
    model=BedrockModel(model_id="anthropic.claude-sonnet-4-6"),
    system_prompt=(
        "You plan one-day trips. "
        "Always call get_weather before recommending an itinerary."
    ),
    tools=[get_weather, get_attractions],
)


@app.entrypoint
async def invoke(payload, context):
    """One invocation per user message."""
    user_message = payload.get("prompt", "")
    response = await agent.invoke_async(user_message)
    return {"result": response.message}


if __name__ == "__main__":
    app.run()`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this file carry the production work. The
        BedrockAgentCoreApp wrapper is what the Runtime invokes;
        locally it runs the loop in-process for tests, in the
        cloud it runs the same function inside a microVM. The
        @tool decorator builds the JSON schema the model sees, so
        editing the Python signature is editing the tool
        description (no separate schema file to keep in sync).
        And the system prompt is where the business logic lives;
        the rest of the file is glue.
      </p>
      <p className="mb-6 leading-relaxed">
        Deploying is one CLI call. The starter toolkit reads the
        Python file, builds the container, pushes it to ECR, and
        registers the Runtime endpoint. The same file runs
        locally, in CI, and in production.
      </p>
      <CodeBlock
        language="bash"
        filename="deploy.sh"
        code={`# Install the starter toolkit and the runtime SDK.
pip install bedrock-agentcore bedrock-agentcore-starter-toolkit strands-agents

# Configure (one-time): pick a region, an IAM role,
# and the entrypoint file.
agentcore configure --entrypoint weather_agent.py --region us-west-2

# Build the container, push to ECR, and create the runtime.
agentcore launch

# Invoke it with a prompt. The session resumes on follow-up
# calls; pass a new session id for a fresh microVM.
agentcore invoke '{"prompt": "Plan a day in Paris."}'`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Gateway: turn your APIs and Lambdas into MCP tools
      </h2>
      <p className="mb-6 leading-relaxed">
        Most production agents do not need new tools; they need
        controlled access to the systems the company already has.
        Gateway is the AgentCore answer to that. Point it at an
        OpenAPI spec, a Lambda function, or an existing MCP
        server, and Gateway exposes a single MCP endpoint that
        the agent can connect to. The agent never holds the API
        key, never sees the underlying URL, and goes through one
        IAM- or OAuth-controlled choke point on every call.
      </p>
      <CodeBlock
        language="python"
        filename="gateway_setup.py"
        code={`import boto3

client = boto3.client("bedrock-agentcore-control")

# Create a Gateway. One endpoint per agent or per team.
gateway = client.create_gateway(
    name="travel-tools",
    protocol="MCP",
    authorizerType="CUSTOM_JWT",   # accept JWT from your IdP
    authorizerConfiguration={
        "customJWTAuthorizer": {
            "discoveryUrl": "https://example.okta.com/.well-known/openid-configuration",
            "allowedAudience": ["agentcore-travel"],
        }
    },
)

# Add an OpenAPI target. Gateway reads the spec and exposes
# every operation as an MCP tool, including auth and schema.
client.create_gateway_target(
    gatewayIdentifier=gateway["gatewayId"],
    name="weather-api",
    targetConfiguration={
        "mcp": {
            "openApiSchema": {
                "s3": {"uri": "s3://travel-config/weather-openapi.yaml"}
            }
        }
    },
    credentialProviderConfigurations=[
        {
            "credentialProviderType": "API_KEY",
            "credentialProvider": {
                "apiKeyCredentialProvider": {
                    "providerArn": "arn:aws:bedrock-agentcore:us-west-2:111:credential-provider/weather"
                }
            },
        }
    ],
)

# The agent connects to one MCP URL and discovers every tool.
print("MCP endpoint:", gateway["gatewayUrl"])`}
      />
      <p className="mb-6 leading-relaxed">
        Two properties of Gateway matter in regulated workloads.
        The credential never leaves AgentCore: the API key sits
        in the credential provider, Gateway injects it on the
        outbound call, and the agent (and the model) only ever
        sees the tool result. And the discovery is a single MCP
        handshake, so an agent that gains access to a new tool
        does not need a code change; it just sees a new entry on
        the next list_tools call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Identity: who the agent is and who it acts for
      </h2>
      <p className="mb-6 leading-relaxed">
        AgentCore Identity solves two problems at once. The first
        is inbound auth: who is allowed to invoke this agent.
        Runtime accepts a JWT from any OpenID Connect provider, an
        IAM signature, or a Cognito token, so the agent slots into
        whichever sign-in story your existing apps use. The second
        is outbound auth: when the agent calls Slack, GitHub, or
        Salesforce, whose credentials does it use. Identity issues
        a managed agent identity, holds the OAuth refresh tokens
        in a secure vault, and brokers the OAuth dance the first
        time a user grants access.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern that came out of the GA release is the
        identity-aware authorization model: the agent has its own
        principal, the human user has their own principal, and the
        Gateway target checks both before letting a call through.
        A finance agent that the CFO approves to read general
        ledger data does not gain that access if a junior
        engineer is the one chatting with it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Memory: short-term turns and long-term facts
      </h2>
      <p className="mb-6 leading-relaxed">
        Memory has two surfaces. The short-term surface holds the
        message history for one session; the agent reads and
        writes turns through the same SDK call. The long-term
        surface holds extracted facts that persist across
        sessions: user preferences, project context, prior
        decisions. The default extraction strategy is a managed
        pipeline that summarizes and stores facts after each
        session; the self-managed strategy (added at GA) lets you
        replace the pipeline with your own model and your own
        criteria.
      </p>
      <CodeBlock
        language="python"
        filename="memory_use.py"
        code={`from bedrock_agentcore.memory import MemoryClient

memory = MemoryClient(region_name="us-west-2")

# One memory store per tenant; created once via the control plane.
memory_id = "tenant-acme-default"

# Write a turn at the end of an exchange.
memory.create_event(
    memory_id=memory_id,
    actor_id=user_id,
    session_id=session_id,
    messages=[
        {"role": "user", "content": user_message},
        {"role": "assistant", "content": agent_reply},
    ],
)

# Read short-term context for the next turn.
turns = memory.list_events(
    memory_id=memory_id, actor_id=user_id, session_id=session_id, max_results=20,
)

# Read long-term facts to seed a new session.
facts = memory.retrieve_memory_records(
    memory_id=memory_id, namespace=f"users/{user_id}", search_criteria={
        "searchQuery": "user preferences and prior projects",
        "topK": 5,
    },
)`}
      />
      <p className="mb-6 leading-relaxed">
        The model behind the namespace is the same one Strands
        and LangGraph already use: a session contains turns,
        and a long-term store contains records the agent or a
        background process extracts from those turns. AgentCore
        Memory works with both, and the LangChain and LlamaIndex
        adapters ship in the box.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sandboxes: Code Interpreter and Browser
      </h2>
      <p className="mb-6 leading-relaxed">
        Two sandboxes ship as first-class AgentCore primitives
        because almost every production agent eventually needs
        them. Code Interpreter is an isolated execution
        environment for Python, JavaScript, and TypeScript; the
        agent writes a short program, the sandbox runs it, the
        result goes back to the model. The pattern is the same
        one Anthropic, OpenAI, and Microsoft converged on in
        2025 because chaining ten tool calls is slower and
        flakier than running one ten-line script. Browser is the
        same idea for the web: a managed Chromium that an agent
        can drive with Playwright or BrowserUse to fill a form,
        click through a multi-step flow, or extract data from a
        page behind a login.
      </p>
      <CodeBlock
        language="python"
        filename="code_interpreter_tool.py"
        code={`from bedrock_agentcore.code_interpreter import CodeInterpreter
from strands import tool

@tool
def run_python(code: str) -> str:
    """Execute Python in an isolated sandbox and return the result."""
    with CodeInterpreter(region_name="us-west-2") as ci:
        result = ci.execute(language="python", code=code)
        if result.stderr:
            return f"stderr: {result.stderr}"
        return result.stdout

# Now the agent can write and run code as part of its plan.
# The sandbox is destroyed when the with-block exits.`}
      />
      <p className="mb-6 leading-relaxed">
        Two properties matter for security. The sandbox is a
        fresh microVM per call, so an attacker that escapes the
        Python interpreter has nothing to escape to. And the
        sandbox does not see the outside world by default; if
        the code needs network or filesystem, you opt in
        explicitly, the same way you would for a Lambda inside a
        VPC.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Observability, Evaluations, and Optimization
      </h2>
      <p className="mb-6 leading-relaxed">
        The three observability services are layered. Observability
        captures the raw traces: every reasoning step, every tool
        call, every model interaction, as an OpenTelemetry span.
        The default backend is Amazon CloudWatch (Logs, Metrics,
        and X-Ray); because the format is OTLP, the same spans
        flow to Datadog, Dynatrace, LangSmith, Langfuse, Arize
        Phoenix, Honeycomb, or Grafana without an extra exporter.
        That is the &ldquo;what happened&rdquo; layer.
      </p>
      <p className="mb-6 leading-relaxed">
        Evaluations is the &ldquo;was it good&rdquo; layer. You
        define a test suite (prompts plus expected behaviors,
        tool-call assertions, or LLM-judged rubrics), point it at
        sessions or traces, and get a structured score per run.
        The eval results land in the same CloudWatch dashboard
        as the traces, so a regression in a new prompt version
        shows up in the same place as a latency regression.
      </p>
      <p className="mb-6 leading-relaxed">
        Optimization (preview, May 2026) closes the loop. It
        reads the traces and eval scores, proposes prompt and
        tool-description edits, and runs A/B tests against real
        traffic through Gateway. The change is versioned, the
        winner is promoted automatically, and the loser is rolled
        back. The pattern is the one ad-tech and growth teams
        have run on website copy for a decade, applied to system
        prompts.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Policy: deterministic guardrails before every tool call
      </h2>
      <p className="mb-6 leading-relaxed">
        Probabilistic safety (system prompts, judge models) is not
        enough for a tool call that moves money or deletes data.
        AgentCore Policy is the deterministic layer that sits in
        front of Gateway and intercepts every tool invocation
        before it runs. Policies are written in plain English or
        in Cedar (the AWS open-source policy language behind IAM,
        Verified Permissions, and Verified Access). A Cedar
        policy is a small program the engine can prove correct,
        which is the property that lets you tell a regulator
        what the agent cannot do.
      </p>
      <CodeBlock
        language="bash"
        filename="refund-policy.cedar"
        code={`// An agent can issue refunds only when:
//   - the agent's principal has the "refund-issuer" role
//   - the refund amount is under $500
//   - the user has been authenticated in this session

permit (
    principal in Role::"refund-issuer",
    action == Action::"call_tool",
    resource == Tool::"issue_refund"
)
when {
    context.user_authenticated == true &&
    resource.params.amount_usd <= 500
};

forbid (
    principal,
    action == Action::"call_tool",
    resource == Tool::"issue_refund"
)
when {
    resource.params.amount_usd > 500
};`}
      />
      <p className="mb-6 leading-relaxed">
        The policy decision lands in the trace as a span of its
        own, so &ldquo;the refund was blocked because the amount
        exceeded the threshold&rdquo; shows up in CloudWatch
        next to the rest of the agent run. The same engine backs
        IAM and Verified Permissions, so the SRE team does not
        need to learn a new authorization model.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Strands Agents: the open-source SDK that pairs with the platform
      </h2>
      <p className="mb-6 leading-relaxed">
        AWS shipped two complementary things in 2025: AgentCore
        (managed platform) and Strands Agents (open-source SDK).
        Strands is the framework AWS itself uses to build agents
        on top of AgentCore, and it is the closest thing to a
        first-party SDK for the platform. The design point is
        deliberately minimal: a model, a system prompt, a list
        of decorated tools, and the model drives the loop. The
        whole SDK is small enough to read in an afternoon.
      </p>
      <p className="mb-6 leading-relaxed">
        Strands runs anywhere, not just on AWS. The model
        interface is provider-agnostic: Bedrock, OpenAI, Claude
        direct, Gemini, and any LiteLLM-compatible endpoint. The
        deployment is also flexible: locally for development,
        Lambda for short jobs, Fargate or EKS for steady-state
        workloads, AgentCore Runtime for long sessions and
        microVM isolation. The pairing with AgentCore is the
        sweet spot because Strands handles the model loop while
        the platform handles everything around it, but a Strands
        agent built for Lambda does not have to change to move
        to AgentCore later.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns carry the bulk of the production work we
        see on engagements.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise support and operations agents.</strong>{" "}
        Druva runs a customer support agent on AgentCore that
        resolves 68 percent of incoming tickets without a human.
        The shape is standard: a Strands loop talks to the
        product knowledge base through Gateway, calls
        Salesforce and Zendesk over MCP, escalates to a human
        when Policy says it must, and writes long-term memory
        about the customer so the next session does not start
        cold. Identity binds the agent to the tenant; Memory
        keeps the context across sessions; Observability traces
        every call into CloudWatch.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal developer platforms.</strong> Thomson
        Reuters built an agentic platform engineering hub on
        AgentCore and automated 70 percent of the routine
        platform work: PR triage, CI rerun, infrastructure
        change reviews. The agent runs on Runtime, uses
        Gateway to wrap the internal API surface as MCP tools,
        uses Code Interpreter to validate proposed Terraform
        diffs in a sandbox, and stores the team&rsquo;s
        conventions in Memory so new engineers get the same
        answers as senior ones.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Vertical agents at scale.</strong> Cox Automotive
        shipped 17 production agents in under a year on
        AgentCore, each one targeting a specific business unit
        (inventory, financing, dealer ops, marketing). The
        commonality is Registry and Identity: every agent is
        cataloged with its capabilities and ownership, every
        agent runs as its own principal, and every cross-agent
        handoff goes through A2A with the receiving agent
        checking the calling agent&rsquo;s permissions. That
        plumbing is what lets the same team ship 17 agents
        instead of 17 one-off projects.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        AgentCore vs Microsoft Agent Framework, Claude Agent SDK,
        OpenAI Agents SDK, LangGraph
      </h2>
      <p className="mb-6 leading-relaxed">
        AgentCore is in a different category from the other four.
        It is a platform, not a framework. The framework is your
        choice; the platform is what runs underneath. That said,
        the platforms compete with each other on the same
        dimensions, and the choice tends to follow the cloud the
        rest of the workload already lives in.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Microsoft Agent Framework</strong> with
        Foundry Hosted Agents is the closest peer. Both ship a
        managed agent runtime with scale-to-zero, per-session
        sandboxes, persistent state, and OpenTelemetry. The
        difference is the framework story: Agent Framework
        merged AutoGen and Semantic Kernel into one library that
        ships in Python and .NET, while AgentCore leaves the
        framework choice open and pairs naturally with Strands.
        Pick Agent Framework when the workload is
        Microsoft-anchored or .NET-heavy; pick AgentCore when
        the workload is AWS-anchored or you want framework
        flexibility.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Claude Agent SDK</strong> is a coding-agent
        toolkit, not a platform; it ships the agent loop, hooks,
        sessions, and built-in Read/Write/Edit/Bash tools but
        leaves the hosting to you. The natural pattern is to
        wrap a Claude Agent SDK loop inside an AgentCore
        Runtime container, get microVM isolation and an 8-hour
        session window from the platform, and keep the coding
        agent semantics from the SDK.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>OpenAI Agents SDK</strong> with AgentKit is
        the OpenAI-side counterpart. AgentKit ships hosted tools
        (Web Search, Computer Use, File Search, Connector
        Registry) that AgentCore does not have. AgentCore ships
        infrastructure primitives (microVM isolation, durable
        sessions, Policy, Identity, Payments) that OpenAI does
        not. A team that needs OpenAI-hosted browsing should
        reach for AgentKit; a team that needs AWS governance
        should reach for AgentCore. The two compose: an OpenAI
        Agents SDK loop runs inside an AgentCore Runtime
        container without issue.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph</strong> is one of the supported
        frameworks on AgentCore, not a competitor. A team that
        already runs LangGraph for the graph orchestration
        moves to AgentCore for the hosting and gets the
        microVM isolation, the durable sessions, and the
        Policy layer without rewriting the graph. The same
        applies to CrewAI, LlamaIndex, and Google ADK.
      </p>
      <p className="mb-6 leading-relaxed">
        A rough decision rule we use on engagements. Pick
        AgentCore when the workload is on AWS, when the team
        wants framework flexibility, or when the durability and
        isolation requirements rule out Lambda and Fargate.
        Pick Microsoft Agent Framework on Azure or .NET shops.
        Pick the Claude Agent SDK for filesystem-heavy coding
        agents. Pick OpenAI Agents SDK and AgentKit for stacks
        leaning on OpenAI-hosted tools. Pick LangGraph or
        CrewAI as the framework and host them on whichever
        platform fits the rest of the workload.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        AgentCore wins a lot of arguments in 2026, but it is not
        free. An honest list of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> The microVM isolation model
        is the strongest in the market: 8-hour sessions, per-
        session VMs, persistent filesystems, and a memory wipe
        at session end. The framework flexibility is real: a
        Strands agent, a LangGraph graph, a CrewAI crew, and a
        custom loop all deploy to the same Runtime without
        translation. The platform surface is the broadest: no
        other vendor ships a code sandbox, a browser sandbox,
        identity, memory, gateway, payments, policy, evals,
        optimization, and registry in one stack. The
        OpenTelemetry choice means traces flow into CloudWatch
        and any external backend without an extra exporter.
        VPC, PrivateLink, CloudFormation, and resource tagging
        at GA mean the agent fits inside the rest of an
        enterprise AWS account.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> Consumption pricing on
        thirteen services is harder to forecast than a flat
        EC2 bill; a few weeks of cost monitoring before
        production is non-negotiable. The platform is AWS-only;
        a team that operates across clouds gets framework
        portability through Strands but loses the platform
        layer on the other clouds. Some services (Optimization,
        Payments) are still in preview and the documentation
        is thinner than the GA pieces. The startup curve has
        more concepts than a single-framework stack: thirteen
        services and the matching IAM permissions take a week
        to get comfortable with. And the platform does the
        plumbing, but it does not give you opinions about how
        to write the agent; the framework choice still matters.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A stateless chat
        endpoint with no tools does not need a platform; a
        Bedrock InvokeModel call is enough. An agent that runs
        for under fifteen minutes per session and has modest
        isolation needs is cheaper on Lambda. A non-AWS
        workload should pair Strands (or another framework)
        with the host that matches the rest of the stack:
        Microsoft Agent Framework on Azure, GKE on Google
        Cloud, EKS on AWS without AgentCore. Above the
        complexity threshold of long sessions, strong
        isolation, multi-tenant memory, and policy
        enforcement, AgentCore starts paying for itself.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the AgentCore roadmap and the broader
        AWS agent platform for the next year and a half.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Harness becomes the default execution model.</strong>{" "}
        The Harness primitive (one API call, model + prompt +
        tools, microVM with filesystem and shell) is the AWS
        version of the agent harness pattern Claude Code,
        Cursor, and Microsoft Agent Framework also converged on
        in 2026. We expect Harness to absorb the bare ChatAgent
        use cases over the next year, with Runtime reserved for
        teams that bring their own framework and want full
        control over the container.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>x402 micropayments become the agent commerce
        rail.</strong> AgentCore Payments ships the x402 protocol
        as a first-class primitive, with Coinbase CDP and Stripe
        wallets and spending limits enforced by Policy. The bet
        is that paid MCP servers and paid APIs become the
        default monetization model for tools that agents call,
        and that micropayments at the tool level replace the
        per-seat licensing that the SaaS market uses today.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-vendor A2A becomes routine.</strong>{" "}
        AgentCore Runtime added A2A support at GA, and the
        broader A2A rollout across services is on the 2026
        roadmap. The pattern that emerged in early 2026 is that
        one team picks AgentCore for the lead agent and consumes
        a Microsoft Agent Framework subagent over A2A when the
        task touches a .NET system. We expect this pattern to
        be the default by 2027, with the choice of framework
        becoming a per-agent decision rather than a per-system
        decision.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Optimization closes the prompt-tuning loop.</strong>{" "}
        Optimization in preview today reads traces and eval
        scores, proposes prompt edits, and runs A/B tests
        through Gateway. The interesting move is that the
        feedback loop becomes part of the platform rather than
        a separate experimentation tool. By late 2026 we expect
        Optimization to ship continuous improvement as a
        default property of any agent deployed on AgentCore,
        the same way EC2 Auto Scaling became a default
        property of any web service.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the AWS side of the agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about Amazon Bedrock AgentCore is
        what it does not try to be. It does not ship a new agent
        framework. It does not lock you to a single model
        provider. It does not force you to migrate off the
        framework you already use. What it does ship is the
        production layer the AWS reference architecture used to
        ask you to build by hand: a microVM-isolated runtime, a
        durable session story, an identity model that binds the
        agent and the user to the same call, a tool gateway that
        keeps credentials off the agent, a memory store that
        survives across sessions, a policy engine that can be
        proved correct, and an observability pipeline that lands
        in the same CloudWatch dashboards the rest of the
        workload already uses.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 on AWS, the argument against
        starting on AgentCore is thin; the argument for pairing
        it with a specific framework (Strands for the new
        greenfield path, LangGraph for graph-heavy work, the
        Claude Agent SDK for filesystem-heavy coding) is real
        but composes. For teams migrating from the
        do-it-yourself reference architecture, the path is
        incremental: move the runtime first, then memory, then
        identity, then policy. The work that is left is the
        part that always matters: the system prompt, the
        domain tools, the safety rules, and the UX. The
        platform does the rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://aws.amazon.com/bedrock/agentcore/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon Bedrock AgentCore landing page (AWS)
          </a>
          {" "}- the product overview with the customer stories
          (Cox Automotive, Druva, Thomson Reuters) and the
          official feature list across the thirteen services.
        </li>
        <li>
          <a
            href="https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon Bedrock AgentCore overview (AWS Documentation)
          </a>
          {" "}- the canonical reference for the platform model,
          the service table, the supported frameworks, and the
          available regions.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon Bedrock AgentCore is now generally available (AWS What&rsquo;s New)
          </a>
          {" "}- the October 13, 2025 GA announcement with the
          VPC, PrivateLink, CloudFormation, A2A, IAM-on-Gateway,
          and self-managed Memory additions.
        </li>
        <li>
          <a
            href="https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Host agent or tools with AgentCore Runtime (AWS Documentation)
          </a>
          {" "}- the Runtime feature reference covering session
          isolation, 8-hour windows, persistent filesystems,
          100MB payloads, and bidirectional streaming.
        </li>
        <li>
          <a
            href="https://builder.aws.com/content/36Cbsfx6GT4nUDWE1zT9Rjf64et/firecracker-the-virtualization-technology-behind-aws-lambda-and-bedrock-agentcore-runtime"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firecracker - the virtualization behind Lambda and AgentCore Runtime (AWS Builder)
          </a>
          {" "}- the deep read on the microVM isolation model
          that backs every AgentCore Runtime session.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing Strands Agents (AWS Open Source Blog)
          </a>
          {" "}- the launch post for the open-source SDK that
          pairs naturally with AgentCore and runs anywhere a
          Python or TypeScript process can run.
        </li>
        <li>
          <a
            href="https://strandsagents.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Strands Agents documentation
          </a>
          {" "}- the model-driven agent SDK reference with the
          Bedrock, Anthropic, OpenAI, and LiteLLM provider
          examples and the AgentCore Runtime deployment guide.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/about-aws/whats-new/2026/05/bedrock-agentcore-optimization-preview/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AgentCore Optimization preview (AWS What&rsquo;s New, May 2026)
          </a>
          {" "}- the announcement of trace-driven recommendations,
          batch evaluations, and A/B testing through Gateway.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/machine-learning/build-highly-scalable-serverless-langgraph-multi-agent-systems-in-aws-with-amazon-bedrock-agentcore/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Serverless LangGraph multi-agent systems on AgentCore (AWS ML Blog)
          </a>
          {" "}- a reference architecture for running a
          LangGraph workload on AgentCore Runtime with Gateway,
          Memory, and Observability wired up.
        </li>
        <li>
          <a
            href="https://github.com/aws/bedrock-agentcore-starter-toolkit"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            bedrock-agentcore-starter-toolkit (GitHub)
          </a>
          {" "}- the CLI and Python helpers that take a local
          Strands or LangGraph file to a deployed Runtime
          endpoint in one command.
        </li>
        <li>
          <a
            href="/articles/microsoft-agent-framework-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Microsoft Agent Framework in production 2026
          </a>
          {" "}- the Azure-side production agent platform with
          Foundry Hosted Agents, the closest competitor on
          managed-runtime semantics.
        </li>
        <li>
          <a
            href="/articles/claude-agent-sdk-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Claude Agent SDK in production 2026
          </a>
          {" "}- the Anthropic side of the agent stack and the
          natural framework choice for filesystem-heavy coding
          agents running on AgentCore Runtime.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the OpenAI side of the agent stack with hosted
          browsing and the Connector Registry that AgentCore
          does not ship natively.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as state machines
          </a>
          {" "}- the graph-orchestration framework that runs
          on AgentCore Runtime with first-party documentation
          and a published reference architecture.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context Protocol
          that AgentCore Gateway consumes and produces as a
          first-class transport.
        </li>
        <li>
          <a
            href="/articles/code-execution-sandboxes-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Code execution sandboxes for AI agents in 2026
          </a>
          {" "}- the broader pattern AgentCore Code Interpreter
          implements, compared with E2B, Northflank, and the
          other sandbox providers.
        </li>
      </ul>
    </div>
  );
}
