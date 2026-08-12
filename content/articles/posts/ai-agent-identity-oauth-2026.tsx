import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "ai-agent-identity-oauth-2026",
  title:
    "AI agent identity and OAuth in production 2026: MCP authorization, Cross-App Access, Auth0, Entra Agent ID, and the end of shared API keys",
  excerpt:
    "How agent authorization moved from static API keys to a proper OAuth 2.1 story in 18 months. Covers the MCP authorization spec that ships July 28 2026, RFC 9728 Protected Resource Metadata and RFC 8707 Resource Indicators, Cross-App Access (ID-JAG) as the enterprise SSO extension, Auth0 for AI Agents with Token Vault and On-Behalf-Of exchange, Microsoft Entra Agent ID for governed agent identities, Okta as Anthropic's first featured identity provider, and Arcade.dev as the hosted MCP runtime that manages user tokens for 7,000 integrations.",
  metaDescription:
    "A practical, technical guide to AI agent identity and OAuth in production 2026. Covers the MCP authorization draft shipping July 28 2026, OAuth 2.1 with PKCE, RFC 9728 Protected Resource Metadata discovery, RFC 8707 Resource Indicators to prevent token confusion, Cross-App Access and the ID-JAG grant type, Auth0 for AI Agents with Token Vault and Agent as Principal, Microsoft Entra Agent ID and Workload Identity Federation, Anthropic's enterprise-managed auth for Claude MCP connectors through Okta, Arcade.dev as the MCP runtime, and the failure modes teams hit when they ship agents on shared API keys.",
  image:
    "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Identity",
    "OAuth",
    "MCP",
    "Auth0",
    "Okta",
    "Microsoft Entra",
    "Security",
    "Production",
    "Enterprise",
  ],
  publishDate: "2026-08-12",
  readingTime: "17 min read",
};

export default function AiAgentIdentityOauth2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2024 the answer to &ldquo;how does the
        agent talk to Slack&rdquo; was a shared API key in an
        environment variable and a prayer. That story broke in
        2025. The MCP spec grew a proper OAuth 2.1
        authorization section, Auth0 shipped a whole product
        line for agents, Microsoft added a dedicated{" "}
        <em>Entra Agent ID</em> identity type, and Okta got
        Anthropic to route Claude enterprise connectors
        through it. By mid-2026 an agent that acts on behalf
        of a real user without their consent, or with a token
        it can silently reuse against a different server, is a
        finding in a pen test, not a shipping pattern. This
        article is what changed, the specifications underneath
        the change, and the code and design decisions we now
        use on client work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why agent identity became the hard problem of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        A traditional web app has one identity per request:
        the user in the browser. An AI agent has at least
        three. There is the human user who asked for
        something. There is the agent itself, a piece of
        software that runs longer, retries more, and calls
        more APIs than a normal client. And there is the
        upstream tool the agent has to touch, which usually
        wants its own OAuth flow and its own token. If any of
        those three collapse into &ldquo;the same shared
        service account&rdquo; you lose the audit trail, the
        blast-radius control, and the ability to revoke a
        single user without breaking every user.
      </p>
      <p className="mb-6 leading-relaxed">
        The failure modes are not theoretical. In 2025
        several teams shipped MCP servers with no auth at all
        and later found agents calling them from arbitrary
        client machines. Others put a single long-lived API
        key in the agent&rsquo;s system prompt and watched a
        prompt-injection attack exfiltrate it. The 2026
        answer is not new: OAuth has solved delegated access
        for two decades. What was missing was a set of
        specifications and products that fit the agent shape,
        where the client is not always a browser, the token
        holder is not always the user, and the resource
        server is not always inside your walls. That is what
        MCP&rsquo;s new authorization spec, Cross-App Access,
        and the vendor products from Auth0, Okta, Microsoft,
        and Arcade lock down.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>November 5, 2024</strong>: Anthropic
          publishes the first MCP specification. Authorization
          is out of scope. Servers are meant to run locally
          over stdio, so the trust boundary is the machine.
        </li>
        <li>
          <strong>March 26, 2025</strong>: MCP spec adds an
          HTTP transport and its first authorization section,
          based on OAuth 2.1 with PKCE. The server is treated
          as both the resource server and the authorization
          server, which turns out to be the wrong split.
        </li>
        <li>
          <strong>June 18, 2025</strong>: MCP revision splits
          the roles. Resource server and authorization server
          are separated. RFC 9728 Protected Resource Metadata
          is made mandatory. RFC 8707 Resource Indicators is
          added to stop tokens from being reused against the
          wrong server.
        </li>
        <li>
          <strong>June 25, 2025</strong>: Auth0 announces
          Auth0 for AI Agents at the Auth0 Developer Day. The
          preview covers user authentication for agents,
          Token Vault for third-party APIs, async
          authorization, and FGA-based fine-grained
          permissions.
        </li>
        <li>
          <strong>September 2025</strong>: OpenID Foundation
          formalises the Identity Assertion JWT Authorization
          Grant (ID-JAG) draft, the OAuth extension underneath
          what Okta ships as Cross-App Access.
        </li>
        <li>
          <strong>November 2025</strong>: Auth for MCP exits
          early access. The Auth0 platform can now sit in
          front of any MCP server and issue scoped tokens.
        </li>
        <li>
          <strong>April 2026</strong>: Microsoft Entra Agent
          ID reaches general availability. A dedicated
          identity type in Entra sits next to users, groups,
          and workload identities. Conditional Access and
          Identity Protection are extended to it.
        </li>
        <li>
          <strong>May 6, 2026</strong>: Auth0 for MCP goes
          GA. Agent as Principal, On-Behalf-Of Token
          Exchange, and Token Vault with Organizations
          Support ship as first-class primitives.
        </li>
        <li>
          <strong>June 18, 2026</strong>: Anthropic ships
          enterprise-managed authorization for Claude MCP
          connectors, with Okta as the first supported
          identity provider. Seven connectors go live at
          launch: Asana, Atlassian, Canva, Figma, Granola,
          Linear, and Supabase.
        </li>
        <li>
          <strong>July 28, 2026</strong>: The MCP
          specification for authorization ships as stable
          (removing the draft label). RFC 9728, RFC 8707,
          Dynamic Client Registration, and the resource
          server / authorization server split are all
          required for any remote MCP server.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three identities inside every agent call
      </h2>
      <p className="mb-6 leading-relaxed">
        Before the specs, a mental model. Every real agent
        request in production carries three identities. Miss
        one and the audit log stops making sense.
      </p>
      <CodeBlock
        language="bash"
        filename="Three identities per agent request"
        code={`+---------------------------------------------------+
|  1. HUMAN PRINCIPAL                               |
|     - The user who asked for the work             |
|     - Auth via SSO / OIDC to your app             |
|     - Grants consent to the agent                 |
+---------------------------------------------------+
                       |
                       v  delegation
+---------------------------------------------------+
|  2. AGENT PRINCIPAL                               |
|     - The autonomous process itself               |
|     - Has its own identity object (Entra Agent    |
|       ID / Auth0 client / IAM role)               |
|     - Bound to a specific human by policy         |
+---------------------------------------------------+
                       |
                       v  on-behalf-of exchange
+---------------------------------------------------+
|  3. DOWNSTREAM RESOURCE TOKEN                     |
|     - Access token for Slack, GitHub, Jira, DB    |
|     - Scoped to what THIS user + THIS agent can   |
|       do on THIS server (RFC 8707 audience)       |
|     - Short-lived, refreshable                    |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The tempting shortcut is to fold identity 2 into
        identity 3 by giving the agent a personal access
        token that speaks for the user everywhere. It works
        in a demo and breaks in production for four reasons.
        You cannot revoke the agent without revoking the
        user. You cannot tell an agent action from a human
        action in the audit log. You cannot give the agent a
        narrower scope than the user has. And a leak of the
        token gives the attacker the user, not just the run.
        The right pattern is the three-identity split above,
        with the transitions done by real OAuth flows.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The MCP authorization spec: what has to be true on
        July 28
      </h2>
      <p className="mb-6 leading-relaxed">
        MCP is where most agent-to-tool traffic in the
        Anthropic, OpenAI, and Google ecosystems now flows.
        The spec that goes stable on July 28, 2026 sets four
        requirements for any remote MCP server. If your
        server does not do all four, current clients will
        refuse to talk to it once they upgrade.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>First</strong>, OAuth 2.1 with PKCE is the
        only accepted flow. No implicit grant, no password
        grant, no static bearer tokens on their own. Every
        client, including confidential ones, does the
        authorization code flow with a code challenge.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Second</strong>, the MCP server is a resource
        server, not an authorization server. The two roles
        are split. You bring your own IdP (Auth0, Okta,
        Entra, Cognito, Keycloak) and your MCP server just
        validates tokens against it.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Third</strong>, the server exposes RFC 9728
        Protected Resource Metadata at{" "}
        <code>/.well-known/oauth-protected-resource</code>.
        When an unauthenticated request hits the server, the
        401 response carries a{" "}
        <code>WWW-Authenticate</code> header with a{" "}
        <code>resource_metadata</code> parameter that points
        back at the same well-known URL. This is the entry
        point clients use to discover the authorization
        server, the supported scopes, and the accepted bearer
        methods without hard-coding any of them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Fourth</strong>, clients MUST send RFC 8707
        Resource Indicators on the authorization request and
        the token request. The <code>resource</code>{" "}
        parameter names the exact MCP server the token is
        for. This is the fix for the confused-deputy attack
        that shipped in the March 2025 draft: without a
        resource indicator, a malicious MCP server could
        pass a token it received on to a different server
        that trusts the same IdP.
      </p>
      <CodeBlock
        language="bash"
        filename="Discovery: 401 response from an MCP server"
        code={`HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://mcp.acme.com/.well-known/oauth-protected-resource"
Content-Type: application/json

{
  "error": "invalid_token",
  "error_description": "Missing or expired access token"
}`}
      />
      <CodeBlock
        language="json"
        filename="/.well-known/oauth-protected-resource"
        code={`{
  "resource": "https://mcp.acme.com",
  "authorization_servers": [
    "https://acme.us.auth0.com"
  ],
  "scopes_supported": [
    "mcp:tools:read",
    "mcp:tools:invoke",
    "slack:messages:write",
    "github:issues:read"
  ],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://docs.acme.com/mcp"
}`}
      />
      <CodeBlock
        language="bash"
        filename="Client authorization request with RFC 8707 resource indicator"
        code={`GET /authorize?response_type=code
  &client_id=agent_a7f9...
  &redirect_uri=https://agent.acme.com/callback
  &code_challenge=E9Melhoa...&code_challenge_method=S256
  &scope=mcp:tools:invoke%20slack:messages:write
  &resource=https://mcp.acme.com
  &state=xyz HTTP/1.1
Host: acme.us.auth0.com`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>resource</code> parameter is the piece that
        turns an OAuth flow from &ldquo;here is a token for
        this user&rdquo; into &ldquo;here is a token for
        this user, this agent, and this specific server.&rdquo;
        The IdP encodes the resource into the token as the
        <code>aud</code> claim, and any downstream server
        that receives it will reject it if the audience does
        not match its own identifier. This is the same
        pattern GCP and AWS have used for years for service
        account tokens; MCP is finally making it the default
        for agent tokens.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cross-App Access and ID-JAG: the enterprise SSO
        extension
      </h2>
      <p className="mb-6 leading-relaxed">
        The MCP spec covers the client-to-server flow. It
        does not cover what happens when the agent runs
        inside App A (Claude) and needs to reach the API of
        App B (Jira) on behalf of a user whose IdP is App C
        (Okta). The old answer was to run the whole OAuth
        dance again: the user gets a consent screen for Jira,
        clicks approve, and receives a Jira token. That does
        not scale to a fleet of agent connectors, and it
        forces every user to make trust decisions they are
        not equipped to make.
      </p>
      <p className="mb-6 leading-relaxed">
        Cross-App Access, standardised at the IETF as the{" "}
        <em>Identity Assertion JWT Authorization Grant</em>{" "}
        (ID-JAG), is the fix. The idea: because the IdP
        already knows the user is signed in and the admin
        already trusts App A to speak to App B, App A can ask
        the IdP for a short-lived assertion, hand that
        assertion to App B, and get a scoped access token
        back. No user-facing consent screen. No shared
        service account. The audit trail on App B still says
        &ldquo;user Alice via agent Claude via IdP Okta.&rdquo;
      </p>
      <CodeBlock
        language="bash"
        filename="Cross-App Access flow (RFC 8693 token exchange + RFC 7523 JWT grant)"
        code={`Step 1: App A already has an OIDC ID token for Alice

Step 2: App A -> Okta   (RFC 8693 Token Exchange)
    POST /token
      grant_type=urn:ietf:params:oauth:grant-type:token-exchange
      subject_token=<Alice's ID token>
      subject_token_type=id_token
      requested_token_type=urn:ietf:params:oauth:token-type:id-jag
      resource=https://jira.acme.com
      audience=jira

  Okta returns an ID-JAG assertion (signed JWT):
    { "iss": "okta.acme.com", "sub": "alice",
      "aud": "jira", "azp": "claude",
      "exp": ..., "scope": "issues:read issues:write" }

Step 3: App A -> App B  (RFC 7523 JWT Bearer Grant)
    POST /token   (on Jira's token endpoint)
      grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
      assertion=<ID-JAG from step 2>

  Jira validates the assertion against Okta's JWKS,
  checks aud == "jira" and azp == "claude",
  and issues a Jira access token for Alice.`}
      />
      <p className="mb-6 leading-relaxed">
        The two properties this preserves are worth calling
        out. The Jira access token has Alice&rsquo;s
        identity, not a service account&rsquo;s, so every
        Jira permission and every audit event still name her.
        And the token is scoped to what the admin allowed
        Claude to do on Jira, which is usually a strict
        subset of what Alice can do in the Jira UI. The
        agent cannot silently escalate.
      </p>
      <p className="mb-6 leading-relaxed">
        This is exactly what Anthropic and Okta shipped in
        June 2026 as enterprise-managed authorization for
        Claude&rsquo;s MCP connectors. Admins wire up each
        connector once in the Okta admin console. Every
        employee who opens Claude gets access immediately,
        with no OAuth consent screens and no support ticket.
        The seven launch connectors are Asana, Atlassian,
        Canva, Figma, Granola, Linear, and Supabase. Slack
        was on the roadmap at launch.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Auth0 for AI Agents: the developer-first stack
      </h2>
      <p className="mb-6 leading-relaxed">
        Okta&rsquo;s enterprise product is one option. The
        developer path most teams reach for is Auth0 for AI
        Agents, which reached GA in May 2026 and won the 2026
        Tech Innovation CUBEd Award for Most Innovative
        AI-Infrastructure Security Solution. The pitch: an
        SDK on top of your existing Auth0 tenant that adds
        four primitives specific to agent shapes.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Auth for MCP</strong> puts an OAuth 2.1 layer
        in front of any MCP server you build. You get the
        discovery endpoint, the token validation middleware,
        and the resource-indicator enforcement without
        writing them yourself. On the client side, Auth0
        wraps the flow so an agent can call{" "}
        <code>getAccessTokenForConnection()</code> and get a
        token audience-restricted to a single MCP server.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Token Vault</strong> stores the third-party
        access and refresh tokens that agents need for Slack,
        GitHub, Google, Notion, and dozens of other
        connections. The agent never sees the token in code.
        It calls the Auth0 SDK with the connection name, the
        SDK talks to the vault, and returns a fresh access
        token scoped to the current user. Token rotation and
        revocation happen inside Auth0, not the agent.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent as Principal</strong> registers the
        agent itself as a first-class Auth0 client with its
        own metadata, owner, and policies. This is what makes
        the ID-JAG / Cross-App Access flow work: the assertion
        that goes to a downstream API carries both the user
        (<code>sub</code>) and the agent (<code>azp</code>),
        so the downstream API can enforce per-agent policy.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>On-Behalf-Of Token Exchange</strong> is the
        RFC 8693 flow packaged as one call. Your API receives
        a token from the agent, calls the Auth0 exchange
        endpoint, and receives a new token scoped to the
        downstream API it needs. No shared secrets, no
        broadly-scoped service accounts.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/tools/slack-post.ts"
        code={`import { AI } from "@auth0/ai-vercel";
import { getUser } from "@/lib/auth";
import { z } from "zod";

const ai = new AI();

export const postToSlack = ai.tool({
  name: "post_to_slack",
  description: "Post a message to a Slack channel as the user.",
  parameters: z.object({
    channel: z.string(),
    text: z.string(),
  }),
  execute: async ({ channel, text }) => {
    const user = await getUser();

    // Token Vault: fetch a fresh Slack token scoped
    // to THIS user. No cached secrets in the agent.
    const token = await ai.getAccessTokenForConnection({
      user: user.sub,
      connection: "slack",
      scopes: ["chat:write"],
    });

    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${token}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel, text }),
    });

    if (!res.ok) throw new Error(\`Slack error: \${res.status}\`);
    return res.json();
  },
});`}
      />
      <p className="mb-6 leading-relaxed">
        Three things stand out in production. The Vercel AI
        SDK integration means the tool definition and the
        auth flow live in the same file, which makes code
        review easy. The token is fetched at the moment of
        the tool call, which means a revoked or rotated
        Slack app hits the very next call rather than the
        next agent restart. And the error path is loud: if
        the user has not connected Slack, the SDK throws with
        a URL the agent can hand back to the UI to prompt for
        a fresh connect. That is the pattern that stops
        agents from silently failing on missing consent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft Entra Agent ID: identity as a governed
        object
      </h2>
      <p className="mb-6 leading-relaxed">
        Announced at RSAC 2026 and generally available in
        April, Microsoft Entra Agent ID adds a new identity
        type to Entra that sits alongside users, groups, and
        workload identities. Each agent gets its own
        identity object with a unique identifier, metadata,
        and a link to the human or team that owns it.
        Conditional Access, Identity Protection, and
        Privileged Identity Management all extend to it. That
        is the Microsoft framing of the same problem Auth0
        solves: give the agent an identity you can revoke,
        restrict, and audit.
      </p>
      <p className="mb-6 leading-relaxed">
        The autodiscovery mechanism is what makes it
        practical. Entra Agent ID scans the tenant for
        agents built on Copilot Studio, Azure AI Foundry,
        Semantic Kernel, and (via a sidecar SDK) third-party
        platforms like AWS Bedrock AgentCore and n8n. Every
        discovered agent is registered as a governed
        identity. IT does not have to know every framework
        the developers used.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/entra-credential.ts - Entra Agent ID with Workload Identity Federation"
        code={`import { WorkloadIdentityCredential } from "@azure/identity";

// Workload Identity Federation: no client secret.
// The agent's Kubernetes / GitHub / AWS identity is
// federated to an Entra Agent ID via signed OIDC tokens
// that the runtime already projects into the pod.
export const entraCredential = new WorkloadIdentityCredential({
  tenantId: process.env.ENTRA_TENANT_ID!,
  clientId: process.env.ENTRA_AGENT_ID!,        // Agent ID object
  tokenFilePath: "/var/run/secrets/tokens/entra-token",
});

// Every downstream call gets a fresh, audience-restricted
// token. Nothing on disk, nothing in the LLM context.
export async function getGraphToken(): Promise<string> {
  const token = await entraCredential.getToken(
    "https://graph.microsoft.com/.default",
  );
  if (!token) throw new Error("No Entra token available");
  return token.token;
}`}
      />
      <p className="mb-6 leading-relaxed">
        Workload Identity Federation is the piece that
        removes the last shared secret. Instead of a client
        credential in a Kubernetes secret, the agent presents
        the projected service-account JWT the pod already
        has, and Entra exchanges it for a real Entra token.
        The same pattern works from GitHub Actions, from
        AWS EKS pods via IRSA, and from any workload that
        can prove an OIDC identity to Entra. The token the
        agent ends up with is short-lived (an hour by
        default), tied to the Agent ID, and never has to be
        stored on disk.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Arcade.dev: the MCP runtime that manages user tokens
      </h2>
      <p className="mb-6 leading-relaxed">
        Building your own auth for every integration is a
        long project. Arcade.dev, which raised a $60M Series
        A in June 2026 led by SYN Ventures with Morgan
        Stanley and Wipro, sells the shortcut. The Arcade
        Engine is a hosted or self-hostable MCP runtime that
        wraps 7,000+ SaaS APIs and handles the OAuth flow
        per user. Agents built on LangChain, OpenAI Agents,
        CrewAI, Google ADK, or Vercel AI can call any of
        them without touching a single provider&rsquo;s auth
        pages.
      </p>
      <p className="mb-6 leading-relaxed">
        The model is user-scoped by construction. When your
        agent needs to send a Slack message on behalf of
        Alice, it calls the Arcade tool with{" "}
        <code>user_id=alice@acme.com</code>. If Alice has
        already connected Slack, the tool runs. If not, the
        engine returns a short-lived authorization URL the
        agent hands back to the UI. Alice completes the
        Slack OAuth once, Arcade stores her tokens in an
        encrypted vault, and every future call for Alice
        just works.
      </p>
      <CodeBlock
        language="python"
        filename="src/agent/tools.py - Arcade with an OpenAI Agents SDK client"
        code={`from arcadepy import Arcade
from agents import Agent, function_tool

client = Arcade()  # picks up ARCADE_API_KEY

@function_tool
def post_to_slack(channel: str, text: str, user_id: str) -> dict:
    """Post a Slack message as the given user."""
    # Ensure Alice has authorised Slack. If not, this
    # raises with a URL the caller can hand to the UI.
    auth = client.tools.authorize(
        tool_name="Slack.SendMessageToChannel",
        user_id=user_id,
    )
    if auth.status != "completed":
        raise RuntimeError(
            f"User must connect Slack: {auth.url}"
        )

    result = client.tools.execute(
        tool_name="Slack.SendMessageToChannel",
        input={"channel": channel, "message": text},
        user_id=user_id,
    )
    return result.output

agent = Agent(
    name="ops-assistant",
    instructions="Post updates to Slack when asked.",
    tools=[post_to_slack],
)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things Arcade fixes that a hand-rolled build gets
        wrong. Token refresh is automatic; the engine holds
        the refresh token, rotates the access token, and
        hands out fresh ones on every call. And the
        per-user scoping means an agent that runs in a batch
        job for a thousand users still ends up with a
        thousand distinct audit trails on the downstream
        SaaS, not one shared service-account event that
        nobody can investigate.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Building an MCP server that meets the July 28 spec
      </h2>
      <p className="mb-6 leading-relaxed">
        If you are shipping your own MCP server, here is the
        minimum shape the July 28 spec requires. This is a
        FastAPI server using the official MCP Python SDK,
        with Auth0 as the authorization server. It exposes
        the discovery endpoint, validates JWTs on every
        request, and enforces the resource-indicator audience
        check.
      </p>
      <CodeBlock
        language="python"
        filename="src/mcp_server/main.py"
        code={`from fastapi import FastAPI, Header, HTTPException, Request
from mcp.server.fastapi import mount_mcp
import httpx, jwt
from jwt import PyJWKClient

MCP_RESOURCE = "https://mcp.acme.com"
AS_ISSUER    = "https://acme.us.auth0.com/"
AS_JWKS      = "https://acme.us.auth0.com/.well-known/jwks.json"
REQUIRED_SCOPES = {"mcp:tools:invoke"}

jwks = PyJWKClient(AS_JWKS)
app  = FastAPI()

@app.get("/.well-known/oauth-protected-resource")
def prm():
    # RFC 9728 discovery document
    return {
        "resource": MCP_RESOURCE,
        "authorization_servers": [AS_ISSUER],
        "scopes_supported": sorted(REQUIRED_SCOPES),
        "bearer_methods_supported": ["header"],
    }

def require_token(request: Request) -> dict:
    auth = request.headers.get("authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(
            401,
            headers={
                "WWW-Authenticate":
                f'Bearer resource_metadata="{MCP_RESOURCE}/.well-known/oauth-protected-resource"'
            },
        )
    token = auth.removeprefix("Bearer ")
    key = jwks.get_signing_key_from_jwt(token).key
    claims = jwt.decode(
        token, key,
        algorithms=["RS256"],
        audience=MCP_RESOURCE,   # RFC 8707 audience check
        issuer=AS_ISSUER,
    )
    scopes = set(claims.get("scope", "").split())
    if not REQUIRED_SCOPES.issubset(scopes):
        raise HTTPException(403, "insufficient_scope")
    return claims

@app.middleware("http")
async def auth_gate(request: Request, call_next):
    if request.url.path.startswith("/.well-known/"):
        return await call_next(request)
    request.state.claims = require_token(request)
    return await call_next(request)

mount_mcp(app, path="/mcp")`}
      />
      <p className="mb-6 leading-relaxed">
        Four things this snippet gets right that early MCP
        servers got wrong. The audience check on the JWT is
        explicit: a token minted for{" "}
        <code>https://other.acme.com</code> will fail{" "}
        <code>jwt.decode</code> with an{" "}
        <code>InvalidAudienceError</code>. The 401 response
        carries the discovery pointer, so a client can
        bootstrap without prior config. The scope check is
        set-based, so adding a new scope does not silently
        widen access. And the well-known route is exempted
        from the auth middleware, so discovery works before
        the client has a token.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world patterns from client engagements
      </h2>
      <p className="mb-6 leading-relaxed">
        A few patterns we now recommend by default on any
        agent build.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Never put third-party tokens in the agent
        context.</strong> If the agent ever needs the token
        value in-band, a prompt injection can exfiltrate it.
        Fetch the token inside the tool handler at the moment
        of use, from a vault (Auth0 Token Vault, Arcade
        Engine, HashiCorp Vault, or a KMS-backed store), and
        never hand it back into the LLM turn.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Scope the agent tighter than the user.</strong>{" "}
        The user may have full Jira access. The agent should
        have <code>issues:read</code> and{" "}
        <code>issues:comment</code> and nothing else. This
        cannot be enforced on the downstream API from your
        code alone; it has to come from the scopes on the
        token the IdP issues. The Cross-App Access model is
        the cleanest way to express it: the admin sets the
        agent&rsquo;s scopes once in the IdP, and every
        assertion the agent asks for is bounded by them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Bind every token to a resource.</strong> The
        RFC 8707 <code>resource</code> parameter on the
        authorization and token requests is not optional in
        the new MCP spec. It is the fix for the confused-
        deputy attack in the earlier drafts. Every OAuth
        client SDK worth using in 2026 sets it; check yours
        does before you ship.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use Workload Identity Federation for the
        agent principal.</strong> Whether the agent runs on
        AKS, EKS, GKE, or a serverless platform, the
        environment can prove an OIDC identity to your IdP.
        Use it. A federated identity replaces the
        client-secret file that used to sit next to the
        agent binary, and takes one whole class of leak off
        the table.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Log the three identities on every action.</strong>{" "}
        The audit log entry for a Slack post should say
        &ldquo;user Alice, via agent{" "}
        <code>ops-assistant@v1.4</code>, via IdP{" "}
        <code>acme.okta.com</code>&rdquo; - not just
        &ldquo;Alice&rdquo; and not just &ldquo;agent.&rdquo;
        This falls out for free from the JWT claims if you
        set them up right: <code>sub</code> is the user,{" "}
        <code>azp</code> is the agent, <code>iss</code> is
        the IdP.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to pick which stack
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Pick Auth0 for AI Agents</strong> if you are
        already on Auth0 or you want a code-first SDK. The
        Vercel AI SDK, LlamaIndex, and LangChain adapters
        are official. The Token Vault removes the entire
        &ldquo;where do we store refresh tokens&rdquo; work
        item. On-Behalf-Of exchange lets your existing API
        layer stay identity-aware without teaching every
        downstream tool about agents.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick Okta Cross-App Access</strong> if you
        are already on Okta as your enterprise IdP and your
        agent story is dominated by SaaS connectors. The
        Anthropic + Okta partnership means Claude&rsquo;s
        enterprise deployment works out of the box. The
        admin console is the surface, not the SDK.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick Microsoft Entra Agent ID</strong> if
        you are on Entra as the enterprise IdP or the agent
        surface is dominated by Microsoft (Copilot Studio,
        Azure AI Foundry, GitHub Copilot at work). The
        autodiscovery of agents across platforms is the
        differentiator for governance-heavy environments.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pick Arcade.dev</strong> if the agent has to
        touch many SaaS APIs and the team does not want to
        write and maintain OAuth flows for every one.
        Arcade&rsquo;s 7,000-integration catalog and
        per-user token isolation gets you to a shipping
        agent fastest. The trade-off is that the tokens
        sit in Arcade&rsquo;s vault, not yours.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Roll your own</strong> only if the agent is
        internal-only, the surface is small (one or two
        downstream APIs), and you already have an OAuth
        server. The MCP Python and TypeScript SDKs now bundle
        enough helpers that the discovery, PKCE, and
        resource-indicator work is a few hundred lines
        instead of a project.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> Every design decision in
        the current stack has a 20-year-old OAuth spec under
        it. Auditability is real: the JWT claims on every
        call let you reconstruct exactly which user asked
        which agent to touch which server, at what time,
        with what scope. Revocation is real: killing a
        refresh token or a client registration takes the
        agent offline in seconds, not the next deploy.
        Zero-secrets deployments are real, thanks to Workload
        Identity Federation and short-lived tokens.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The OAuth dance is
        latency you pay per user, per connection, at least
        once. Token refresh adds a network call to the hot
        path unless you cache access tokens (which you
        should, but with care). ID-JAG needs both apps and
        the IdP to speak it, and today that mostly means
        Okta and a handful of MCP-native apps; the flow is
        not yet universal. And every new spec adds one more
        thing that can be misconfigured: an RFC 8707 audience
        that does not match, a stale JWKS cache, a
        clock-skew failure on token expiry. Ship with
        integration tests that exercise the full flow,
        not just the happy path.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use this.</strong> A purely
        internal agent that talks only to one internal API
        can still get away with a service-account model, if
        the API is behind your firewall and the agent runs
        in the same trust boundary. Anything that touches
        the public internet, third-party SaaS, or user data
        should be on the OAuth stack. And the moment the
        agent shape becomes multi-user, the shared-secret
        model collapses.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What to watch for in 2026 and 2027
      </h2>
      <p className="mb-6 leading-relaxed">
        The MCP spec that ships on July 28 is not the last
        word. The working group is already discussing
        client-attestation extensions so a resource server
        can verify not just the user and the scopes but the
        specific agent binary and its runtime. Expect that
        to matter as regulators start asking &ldquo;which
        version of which agent took this action.&rdquo;
      </p>
      <p className="mb-6 leading-relaxed">
        Cross-App Access is going from Okta-only to a
        multi-vendor standard. Microsoft, Google, and
        Keycloak all have working drafts of ID-JAG issuers.
        By early 2027 the flow will be usable across IdPs
        the way SAML SSO is today, which will remove the
        current &ldquo;pick one enterprise IdP&rdquo;
        constraint.
      </p>
      <p className="mb-6 leading-relaxed">
        Fine-grained authorisation is the next layer. Auth0
        FGA, OpenFGA, and AWS Verified Permissions are being
        wired into agent stacks so the answer to &ldquo;can
        this agent read this ticket&rdquo; can be a policy
        engine call, not a hard-coded scope. Expect the tool
        handlers we write in 2027 to consult a policy engine
        after they get the token, not just before.
      </p>
      <p className="mb-6 leading-relaxed">
        On the vendor side, watch the consolidation. Auth0
        and Okta are the same company, and their agent
        products are being merged into a single stack.
        Microsoft is folding Entra Agent ID into Agent 365.
        Arcade is likely to face pressure from framework
        vendors that ship equivalent connectors in-house.
        The winning question for your team is not which
        vendor to bet on, but which of the specs (MCP OAuth,
        Cross-App Access, Workload Identity Federation) you
        rely on directly, so switching vendors later stays
        cheap.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent identity moved from &ldquo;shared API key in
        an env var&rdquo; to a full OAuth 2.1 story in 18
        months. The three-identity model (user, agent,
        resource token), the mandatory MCP spec pieces (RFC
        9728, RFC 8707, PKCE, split resource/authorization
        servers), the Cross-App Access grant type, and the
        vendor products from Auth0, Okta, Microsoft, and
        Arcade give you a real answer to every question a
        security team will ask about an agent going to
        production.
      </p>
      <p className="mb-6 leading-relaxed">
        The build order we now recommend is: pick an IdP
        (Auth0, Okta, or Entra) before you pick a framework;
        model the three identities on paper before you write
        the first tool handler; build the MCP server or the
        tool wrapper against the July 28 spec so it stays
        compatible with the client fleet; and log all three
        identities on every action from day one. That gets
        you an agent your security team will sign off on and
        an audit trail you can defend in a review a year
        later. Everything else is a detail on top of it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://modelcontextprotocol.io/specification/draft/basic/authorization"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP Authorization specification (draft, ships
            July 28, 2026)
          </a>
          {" "}- the source of truth for OAuth 2.1, RFC
          9728, RFC 8707, and the resource server / auth
          server split.
        </li>
        <li>
          <a
            href="https://datatracker.ietf.org/doc/html/rfc9728"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RFC 9728: OAuth 2.0 Protected Resource Metadata
          </a>
          {" "}- the IETF spec for the well-known discovery
          document every MCP server now serves.
        </li>
        <li>
          <a
            href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            IETF: Identity Assertion JWT Authorization Grant
            (ID-JAG)
          </a>
          {" "}- the OAuth extension behind Cross-App Access
          and Anthropic&rsquo;s enterprise-managed auth.
        </li>
        <li>
          <a
            href="https://auth0.com/ai/docs/mcp/intro/overview"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0: Secure MCP with Auth0
          </a>
          {" "}- Token Vault, Agent as Principal, and the
          Auth for MCP flow with runnable SDK examples.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Learn: What is Microsoft Entra Agent ID
          </a>
          {" "}- the reference for the new identity type,
          autodiscovery, and integration with Conditional
          Access.
        </li>
        <li>
          <a
            href="https://www.okta.com/newsroom/press-releases/okta-becomes-a-featured-identity-provider-powering-secure-ai-agent-connections-for-claude-enterprise/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Okta: Featured identity provider for Claude
            Enterprise (June 2026)
          </a>
          {" "}- the launch of enterprise-managed
          authorization with Anthropic and the seven initial
          MCP connectors.
        </li>
        <li>
          <a
            href="https://www.arcade.dev/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arcade.dev
          </a>
          {" "}- the hosted MCP runtime with 7,000+
          integrations and per-user OAuth handling.
        </li>
        <li>
          <a
            href="https://workos.com/blog/mcp-2026-spec-agent-authentication"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WorkOS: What changes for AI agent authentication
            in the July 28, 2026 MCP spec
          </a>
          {" "}- practical read on the delta from the earlier
          drafts.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the deeper read on the protocol that the
          authorization spec sits on top of.
        </li>
        <li>
          <a
            href="/articles/ai-agent-security-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent security in 2026
          </a>
          {" "}- the wider security picture that identity is
          one layer of.
        </li>
        <li>
          <a
            href="/articles/claude-agent-sdk-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Claude Agent SDK in production 2026
          </a>
          {" "}- the client side of the story when Claude is
          the runtime.
        </li>
        <li>
          <a
            href="/articles/aws-bedrock-agentcore-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AWS Bedrock AgentCore in production 2026
          </a>
          {" "}- how the same identity patterns play on the
          AWS side, including Entra federation.
        </li>
      </ul>
    </div>
  );
}
