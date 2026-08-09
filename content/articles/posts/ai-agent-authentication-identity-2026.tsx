import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "ai-agent-authentication-identity-2026",
  title:
    "AI agent authentication and identity in 2026: MCP OAuth 2.1, Cross App Access, and the ID-JAG flow",
  excerpt:
    "How the industry solved the hardest unsolved problem in production agents: who is calling this API. Covers the MCP OAuth 2.1 spec, RFC 8707 resource indicators, PKCE, dynamic client registration, Okta Cross App Access (XAA), the IETF ID-JAG draft, Auth0 for AI Agents, WorkOS AuthKit, and the confused deputy trap that keeps catching teams that skip the spec.",
  metaDescription:
    "A practical, technical guide to AI agent authentication and identity in 2026. Covers the MCP OAuth 2.1 authorization spec, RFC 8707 resource indicators, RFC 9728 Protected Resource Metadata, RFC 8414 Authorization Server Metadata, RFC 7591 Dynamic Client Registration, OAuth Client ID Metadata Documents, PKCE, Okta Cross App Access (XAA), the IETF Identity Assertion JWT Authorization Grant (ID-JAG) draft, Auth0 for AI Agents (Token Vault, FGA, human-in-the-loop), WorkOS AuthKit for MCP, non-human identity, the confused deputy problem, token audience binding, and the practical patterns for building secure production agents.",
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
    "Authentication",
    "Identity",
    "OAuth",
    "MCP",
    "Okta",
    "Auth0",
    "WorkOS",
    "Security",
    "Cross App Access",
    "ID-JAG",
    "Production",
  ],
  publishDate: "2026-07-30",
  readingTime: "17 min read",
};

export default function AiAgentAuthenticationIdentity2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Somewhere in the middle of 2025 the AI agent industry
        collectively realised it had shipped hundreds of
        production agents with the same broken idea: give the
        agent a long-lived API key and hope for the best. The
        model can now book meetings, refund customers, move
        money, and read your inbox on your behalf, but the
        access token it uses is often a bearer secret with
        the lifespan of a mortgage and no way to answer the
        question &ldquo;who actually asked for this
        action?&rdquo; MCP became the standard way for agents
        to talk to services, MCP servers became remote by
        default, and the shape of the problem stopped being
        theoretical. This article is the state of AI agent
        authentication in mid-2026: the MCP OAuth 2.1 spec
        that made secure remote MCP possible, the Cross App
        Access protocol that Okta shipped to solve the
        enterprise cross-domain case, the Identity Assertion
        JWT Authorization Grant (ID-JAG) working its way
        through the IETF, and the patterns we ship on client
        work to keep human users, agents, and the services
        they touch cleanly separated.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why agent auth turned into a tier-one problem in 2025
      </h2>
      <p className="mb-6 leading-relaxed">
        A traditional web app has one identity model: the
        user logs in, and the server acts on that user&rsquo;s
        behalf inside a session. Agent stacks break that
        assumption in three ways at once. First, the agent
        runs in a different trust domain from the user; it
        may be a hosted chatbot, a mobile assistant, or a
        background job. Second, the agent calls tools on
        many services, each with their own auth model.
        Third, the agent may act autonomously, without the
        user in the loop for every request. The old pattern
        of shipping a static bearer token to the agent hits
        the wall the first time a security team asks the
        obvious questions: which user did that refund? Who
        can revoke this agent&rsquo;s access when the
        employee leaves? What scopes does the token actually
        have?
      </p>
      <p className="mb-6 leading-relaxed">
        The Model Context Protocol accelerated the timeline.
        MCP made it easy to spin up a server that exposes
        internal APIs to any agent client, and once servers
        started living on the public internet the industry
        had no choice but to nail down authentication. The
        March 2025 MCP spec update made OAuth 2.1 the
        required auth mechanism for remote servers, and
        subsequent revisions in June and November 2025
        tightened the details. By mid-2026 the shape of
        agent auth is a stack: OAuth 2.1 at the transport
        layer, MCP-specific rules on top, and a new class of
        IdP-driven cross-domain protocols (Cross App Access,
        ID-JAG) for the enterprise case where a user in one
        org needs an agent to act on services in another.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three actors and the trust domain rule
      </h2>
      <p className="mb-6 leading-relaxed">
        Every conversation about agent auth gets clearer once
        you draw the actors. There are three, and the trust
        boundary between them is where every bug and every
        exploit lives.
      </p>
      <CodeBlock
        language="bash"
        filename="Three-actor model for agent authentication"
        code={`+-------------------------------------------------------------+
|                                                             |
|   Trust Domain A: the User's IdP (Okta, Auth0, Google,      |
|                   Microsoft Entra, etc.)                    |
|                                                             |
|          +----------+                                       |
|          |   User   |  logs in once, gets an ID token       |
|          +----+-----+                                       |
|               |                                             |
+---------------|---------------------------------------------+
                |
                v
+-------------------------------------------------------------+
|                                                             |
|   Trust Domain B: the Agent Client                          |
|                   (ChatGPT, Claude, your app)               |
|                                                             |
|          +--------------+                                   |
|          | Agent client |  OAuth 2.1 client, holds tokens   |
|          +------+-------+  on the user's behalf             |
|                 |                                           |
+-----------------|-------------------------------------------+
                  |
                  v
+-------------------------------------------------------------+
|                                                             |
|   Trust Domain C: the MCP Server / Resource                 |
|                   (Slack, GitHub, your CRM, etc.)           |
|                                                             |
|          +----------------+                                 |
|          | Resource       |  OAuth 2.1 resource server,     |
|          | Auth Server    |  validates tokens, issues       |
|          +--------+-------+  its own access tokens          |
|                   |                                         |
|                   v                                         |
|          +----------------+                                 |
|          |  MCP Server    |  the tool the agent calls       |
|          +----------------+                                 |
|                                                             |
+-------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The critical rule the OAuth spec and the MCP spec
        both enforce: <strong>the IdP is not the resource
        authorization server</strong>. They live in
        different trust domains, they issue different tokens,
        and the agent client sits in the middle. An ID token
        issued by the user&rsquo;s IdP is a proof of identity
        to the agent. It is not, and must never be, an access
        token to the resource. The tokens are separately
        scoped, separately audited, and can be revoked
        independently. Every serious agent auth failure we
        have seen in the last twelve months came from
        collapsing these three roles into two.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The MCP OAuth 2.1 specification in one page
      </h2>
      <p className="mb-6 leading-relaxed">
        The MCP authorization spec (current version
        2025-11-25) is short. It reuses OAuth 2.1 and a set
        of specific RFCs rather than inventing anything new.
        These are the rules that matter for a team standing
        up a production MCP server:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>OAuth 2.1 is required</strong>. The MCP
          server acts as an OAuth 2.1 resource server. The
          agent client acts as an OAuth 2.1 client. The
          authorization server can be hosted with the
          resource or separately.
        </li>
        <li>
          <strong>PKCE is required</strong> for all clients,
          confidential or public, using the S256 challenge
          method. Clients must verify PKCE support on the
          authorization server before proceeding. If the
          server metadata does not advertise{" "}
          <code>code_challenge_methods_supported</code>, the
          client must refuse to connect.
        </li>
        <li>
          <strong>Protected Resource Metadata (RFC 9728)
          </strong> is required. The MCP server publishes a{" "}
          <code>.well-known/oauth-protected-resource</code>{" "}
          document that points at its authorization server
          and lists the supported scopes.
        </li>
        <li>
          <strong>Authorization Server Metadata (RFC 8414)
          or OpenID Connect Discovery</strong> is required
          on the authorization server side so clients can
          discover endpoints without hard-coded URLs.
        </li>
        <li>
          <strong>Resource Indicators (RFC 8707)</strong>{" "}
          are required. Every authorization and token
          request from the client must include a{" "}
          <code>resource</code> parameter that names the MCP
          server the token is for. Every access token the
          resource server validates must have that server
          in its audience claim. Cross-audience tokens must
          be rejected.
        </li>
        <li>
          <strong>Client ID Metadata Documents</strong>{" "}
          (draft-ietf-oauth-client-id-metadata-document-00)
          are preferred over Dynamic Client Registration.
          The client hosts a JSON document at an HTTPS URL
          and uses that URL as its <code>client_id</code>.
          This solves the &ldquo;how does a brand-new agent
          register itself with a brand-new MCP server&rdquo;
          bootstrap problem without requiring the two to
          have met before.
        </li>
        <li>
          <strong>Dynamic Client Registration (RFC 7591)
          </strong> is optional and kept mainly for
          backwards compatibility with the earlier MCP
          spec revisions.
        </li>
        <li>
          <strong>Token passthrough is forbidden</strong>.
          The MCP server must never forward the access
          token it received to an upstream API. If the MCP
          server needs to call an upstream service on the
          user&rsquo;s behalf, it acts as its own OAuth
          client to that upstream and gets its own token.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The MCP authorization flow, end to end
      </h2>
      <p className="mb-6 leading-relaxed">
        Reading the spec is easier once you have run the
        flow once. Here is what happens the first time an
        agent client tries to call an MCP server it has
        never seen before.
      </p>
      <CodeBlock
        language="bash"
        filename="MCP OAuth 2.1 first-contact flow"
        code={`Client                    MCP Server              Auth Server
  |                            |                        |
  |  1. POST /mcp (no token)   |                        |
  |--------------------------->|                        |
  |                            |                        |
  |  2. 401 Unauthorized       |                        |
  |     WWW-Authenticate:      |                        |
  |     Bearer resource_       |                        |
  |     metadata="...well-     |                        |
  |     known/..."             |                        |
  |<---------------------------|                        |
  |                            |                        |
  |  3. GET /.well-known/      |                        |
  |     oauth-protected-       |                        |
  |     resource               |                        |
  |--------------------------->|                        |
  |                            |                        |
  |  4. { authorization_       |                        |
  |       servers: ["..."],    |                        |
  |       scopes_supported:    |                        |
  |       ["files:read"] }     |                        |
  |<---------------------------|                        |
  |                                                     |
  |  5. GET /.well-known/oauth-authorization-server     |
  |---------------------------------------------------->|
  |                                                     |
  |  6. { authorization_endpoint, token_endpoint,       |
  |       code_challenge_methods_supported: ["S256"],   |
  |       client_id_metadata_document_supported: true } |
  |<----------------------------------------------------|
  |                                                     |
  |  7. Browser: GET /authorize?                        |
  |       client_id=https://app.example.com/client.json |
  |       &resource=https://mcp.acme.com                |
  |       &scope=files:read                             |
  |       &code_challenge=...&code_challenge_method=S256|
  |---------------------------------------------------->|
  |                                                     |
  |     User consents in browser.                       |
  |                                                     |
  |  8. Redirect: /callback?code=...                    |
  |<----------------------------------------------------|
  |                                                     |
  |  9. POST /token (code, code_verifier, resource)     |
  |---------------------------------------------------->|
  |                                                     |
  | 10. { access_token: "eyJ...",                       |
  |       token_type: "Bearer",                         |
  |       expires_in: 3600 }                            |
  |<----------------------------------------------------|
  |                            |                        |
  | 11. POST /mcp              |                        |
  |     Authorization: Bearer  |                        |
  |     eyJ...                 |                        |
  |--------------------------->|                        |
  |                            |                        |
  | 12. { result: ... }        |                        |
  |<---------------------------|                        |
  |                            |                        |`}
      />
      <p className="mb-6 leading-relaxed">
        Three things about this flow are new relative to a
        classic OAuth 2.0 web app dance. First, the client
        does not know anything about the server or its auth
        server up front. Everything is discovered from the
        401 response and the well-known URLs. Second, the
        <code>client_id</code> is a URL to a hosted JSON
        metadata document, not a pre-registered client
        secret. Third, the <code>resource</code> parameter
        is present in both the authorization request and
        the token request, and the resulting access token
        is audience-bound to that resource. If the client
        tries to reuse the token against a different MCP
        server, that server must reject it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Protected Resource Metadata: the document that wires
        everything together
      </h2>
      <p className="mb-6 leading-relaxed">
        The Protected Resource Metadata document is the
        smallest piece of the spec and the one teams most
        often forget to publish. It sits at{" "}
        <code>/.well-known/oauth-protected-resource</code>{" "}
        on the MCP server (or a path-scoped variant if the
        server hosts multiple MCP endpoints) and answers a
        single question: given this resource, which
        authorization server issues tokens for it?
      </p>
      <CodeBlock
        language="json"
        filename="/.well-known/oauth-protected-resource"
        code={`{
  "resource": "https://mcp.acme.com",
  "authorization_servers": [
    "https://auth.acme.com"
  ],
  "scopes_supported": [
    "files:read",
    "files:write",
    "tools:invoke"
  ],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://docs.acme.com/mcp"
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two pieces are worth calling out. The <code>resource
        </code> field must exactly match the canonical URI
        of the MCP server, and clients must use that same
        canonical URI in every subsequent <code>resource
        </code> parameter. The scheme and host should be
        lowercase, there should be no fragment, and the
        trailing slash choice must be consistent (the spec
        recommends no trailing slash). Get this wrong and
        the authorization server issues tokens with an
        audience the MCP server does not recognise, so
        every request 401s and no error message tells you
        why.
      </p>
      <p className="mb-6 leading-relaxed">
        The <code>authorization_servers</code> array can
        list more than one entry. In the multi-IdP case a
        client picks one and uses it consistently for the
        session. The spec is deliberately hands-off about
        the selection logic and defers to RFC 9728 section
        7.6.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Client ID Metadata Documents: the bootstrap that
        made remote MCP practical
      </h2>
      <p className="mb-6 leading-relaxed">
        The trickiest part of remote MCP auth is the
        bootstrap. In a classic OAuth setup, a client
        registers with an authorization server in advance
        and gets a <code>client_id</code> and
        <code>client_secret</code>. That does not scale to a
        world where any Claude Desktop or Cursor installation
        needs to talk to any MCP server the user connects.
        The MCP spec solves this by adopting the OAuth
        Client ID Metadata Documents draft: the client hosts
        a JSON document at an HTTPS URL and uses that URL as
        its identifier.
      </p>
      <CodeBlock
        language="json"
        filename="https://app.example.com/oauth/client-metadata.json"
        code={`{
  "client_id": "https://app.example.com/oauth/client-metadata.json",
  "client_name": "Acme Agent for Claude Desktop",
  "client_uri": "https://app.example.com",
  "logo_uri": "https://app.example.com/logo.png",
  "redirect_uris": [
    "http://127.0.0.1:33418/callback",
    "http://localhost:33418/callback"
  ],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none",
  "scope": "files:read files:write tools:invoke"
}`}
      />
      <p className="mb-6 leading-relaxed">
        When the client sends the authorization server a{" "}
        <code>client_id</code> that is an HTTPS URL, the
        server fetches that URL, validates the JSON has the
        required fields, and treats the URL itself as the
        client identifier for the rest of the flow. The
        server also validates that the <code>client_id</code>{" "}
        value inside the document matches the URL exactly,
        so a malicious client cannot spoof another
        client&rsquo;s metadata. Redirect URIs in the
        authorization request must match those in the
        document.
      </p>
      <p className="mb-6 leading-relaxed">
        The subtle security gotcha is <code>localhost</code>{" "}
        redirect URIs. Because a desktop or mobile agent
        client redirects back to a local port, any process
        on that machine can bind to any port. An attacker
        could serve their own metadata document, claim to be
        the legitimate client, and bind a localhost port to
        intercept the code. The spec pushes authorization
        servers to display extra warnings for localhost-only
        redirect URIs and to consider attestation
        mechanisms; this is one of the areas where the
        state of the art in 2026 is still moving.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The resource parameter and the confused deputy trap
      </h2>
      <p className="mb-6 leading-relaxed">
        The one place teams get bitten most often is the
        <code>resource</code> parameter. RFC 8707 says the
        client must send it, the authorization server must
        respect it, and the resource server must validate
        that the token was audience-bound to it. When any of
        those three links breaks, the door opens on the
        classic confused deputy problem: the MCP server
        accepts a token that was minted for someone else and
        acts on it as if it were its own.
      </p>
      <p className="mb-6 leading-relaxed">
        The MCP spec has an entire section devoted to this
        because it keeps happening. The rules, phrased as
        the reject conditions:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Reject tokens whose audience claim does not name
          this MCP server.
        </li>
        <li>
          Reject tokens issued for other resources, even if
          they are signed by the same authorization server.
        </li>
        <li>
          Never forward the incoming access token to any
          upstream service. If the MCP server needs to call
          GitHub or Slack on the user&rsquo;s behalf, it
          performs a separate OAuth flow to those services
          as an OAuth client and gets its own token.
        </li>
      </ul>
      <CodeBlock
        language="python"
        filename="src/mcp_server/auth_middleware.py"
        code={`from typing import Callable
import jwt
from jwt import PyJWKClient
from fastapi import Request, HTTPException

CANONICAL_URI = "https://mcp.acme.com"
AUTH_SERVER = "https://auth.acme.com"
JWKS = PyJWKClient(f"{AUTH_SERVER}/.well-known/jwks.json")

def require_valid_token(request: Request) -> dict:
    auth = request.headers.get("authorization", "")
    if not auth.lower().startswith("bearer "):
        raise HTTPException(401, headers={
            "WWW-Authenticate": (
                f'Bearer resource_metadata='
                f'"{CANONICAL_URI}/.well-known/oauth-protected-resource", '
                f'scope="files:read"'
            )
        })
    token = auth.split(" ", 1)[1]

    try:
        signing_key = JWKS.get_signing_key_from_jwt(token).key
        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            audience=CANONICAL_URI,   # RFC 8707: reject wrong audience.
            issuer=AUTH_SERVER,        # Reject tokens from other IdPs.
            options={"require": ["exp", "iat", "aud", "iss", "sub"]},
        )
    except jwt.InvalidAudienceError:
        # Someone tried to reuse a token for another MCP server. Reject.
        raise HTTPException(403, "token not intended for this resource")
    except jwt.PyJWTError as e:
        raise HTTPException(401, f"invalid token: {e}")

    return claims

async def mcp_endpoint(request: Request):
    claims = require_valid_token(request)
    # claims["sub"] is the end user. Use it for authorization and audit.
    # Do NOT forward this token to any upstream API.
    ...`}
      />
      <p className="mb-6 leading-relaxed">
        The two hardest lines to enforce are the audience
        check and the passthrough ban. The audience check
        looks like a formality, but if you skip it, any
        token from your authorization server for any other
        resource lets a client through your MCP server as
        if they had been granted access. The passthrough
        ban is easier to violate accidentally: an engineer
        wires up an MCP tool that calls GitHub, sees they
        already have a bearer token in the request, and
        forwards it. Now GitHub is trusting a token that
        was minted for your MCP server, and the whole
        audience-binding property collapses.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Enterprise agent auth: the Cross App Access
        protocol
      </h2>
      <p className="mb-6 leading-relaxed">
        MCP OAuth solves the case where a user directly
        authorises an agent to call a service. It does not
        solve the enterprise case: a company has an IdP
        (Okta, Auth0, Microsoft Entra, Google Workspace),
        the user is already signed in there, and IT wants
        one place to see and revoke which agents can talk
        to which apps. Nobody wants their finance
        controller to click through a fresh OAuth consent
        screen every time an agent needs to touch NetSuite.
        This is the gap Cross App Access (XAA) was built to
        close.
      </p>
      <p className="mb-6 leading-relaxed">
        Okta shipped XAA into developer preview in
        September 2025 and general availability in mid-2026.
        The core idea: the enterprise IdP mints a special
        token (an Identity Assertion, not an access token)
        that the requesting agent app hands to the resource
        app&rsquo;s authorization server. The resource
        authorization server verifies the assertion against
        its trust relationship with the IdP, resolves it to
        a local user, and issues its own access token. The
        user consents once, in the IdP, when the admin
        connects the two apps. Every subsequent access is
        governed by that IdP-level consent.
      </p>
      <CodeBlock
        language="bash"
        filename="Cross App Access flow (IdP-mediated)"
        code={`+--------------------------------------------------------------+
|                                                              |
|   1. Bob signs in to Agent0 (requesting app) with Okta.      |
|      Standard OIDC. Agent0 gets an ID Token.                 |
|                                                              |
|   2. Agent0 needs to call Todo0 (resource app) on Bob's      |
|      behalf. Instead of OAuth-prompting Bob again, it        |
|      does an OAuth 2.0 Token Exchange (RFC 8693) at Okta:    |
|                                                              |
|         POST /token                                          |
|         grant_type=urn:ietf:params:oauth:grant-type          |
|                    :token-exchange                           |
|         requested_token_type=urn:ietf:params:oauth:          |
|                    token-type:id-jag                         |
|         subject_token=<Bob's ID token>                       |
|         subject_token_type=urn:ietf:params:oauth:            |
|                    token-type:id_token                       |
|         audience=https://todo0.example.com                   |
|         scope=todos:read todos:write                         |
|                                                              |
|   3. Okta checks the "Manage Connections" policy between     |
|      Agent0 and Todo0. If allowed, mints an ID-JAG:          |
|                                                              |
|         { iss: "https://acme.okta.com",                      |
|           aud: "https://todo0.example.com",                  |
|           sub: <Bob's stable Okta ID>,                       |
|           client_id: "agent0-at-todo0",                      |
|           scope: "todos:read todos:write",                   |
|           exp: <short> }                                     |
|                                                              |
|   4. Agent0 hands the ID-JAG to Todo0's authorization        |
|      server:                                                 |
|                                                              |
|         POST /token                                          |
|         grant_type=urn:ietf:params:oauth:grant-type:jwt-     |
|                    bearer                                    |
|         assertion=<ID-JAG>                                   |
|                                                              |
|   5. Todo0's auth server verifies the ID-JAG, resolves Bob   |
|      to a local user (or JIT-provisions one), and mints its  |
|      own access token for its own API.                       |
|                                                              |
|   6. Agent0 calls Todo0's API with that access token.        |
|                                                              |
+--------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Two properties of this flow are worth internalising.
        First, the resource authorization server is not the
        IdP. They live in different trust domains and speak
        to each other only through the ID-JAG. This is the
        same trust-domain rule the MCP spec insists on,
        applied at enterprise scale. Second, every
        connection between a requesting app and a resource
        app is a policy the IdP admin created and can
        revoke. If Bob leaves the company, Okta disables
        his account, and every ID-JAG issued for him going
        forward fails. No token in Todo0 needs to be
        rotated; the IdP is the choke point.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        ID-JAG: the IETF draft under the hood
      </h2>
      <p className="mb-6 leading-relaxed">
        The token format Cross App Access uses is the
        Identity Assertion JWT Authorization Grant, an
        active IETF draft (currently
        draft-ietf-oauth-identity-assertion-authz-grant-04).
        It is a profile of the JWT Authorization Grant
        (RFC 7523) that grants a client delegated access to
        a resource in a different trust domain without a
        fresh user-approval step at the authorization
        server. In plain terms: the user consented once, at
        the IdP; ID-JAG is what carries that consent across
        the trust boundary.
      </p>
      <p className="mb-6 leading-relaxed">
        The claim structure looks like an ID token with
        extra fields. It includes the standard{" "}
        <code>iss</code>, <code>sub</code>, <code>aud</code>,{" "}
        <code>exp</code>, and <code>iat</code>. The draft
        recommends including an <code>email</code> or the
        newer <code>aud_sub</code> claim so the resource
        server can resolve the user, including doing
        just-in-time provisioning if the user has not signed
        in there before. Multi-tenant IdPs must include a{" "}
        <code>tenant</code> claim (or the newer{" "}
        <code>aud_tenant</code>) so a downstream resource
        server can tell tenant A&rsquo;s Bob from tenant
        B&rsquo;s Bob.
      </p>
      <CodeBlock
        language="python"
        filename="src/agent0/cross_app_access.py"
        code={`# Requesting-app side: exchange an ID token for an ID-JAG
# at the IdP, then exchange the ID-JAG for an access token
# at the resource's authorization server.
import os
import httpx

IDP_TOKEN_URL = "https://acme.okta.com/oauth2/v1/token"
RESOURCE_AUTH_TOKEN_URL = "https://auth.todo0.example.com/oauth/token"

TOKEN_EXCHANGE = "urn:ietf:params:oauth:grant-type:token-exchange"
ID_JAG_TYPE = "urn:ietf:params:oauth:token-type:id-jag"
ID_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:id_token"
JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer"

# Load client credentials from the environment. Never hardcode.
IDP_CLIENT = (os.environ["IDP_CLIENT_ID"], os.environ["IDP_CLIENT_SECRET"])
RES_CLIENT = (os.environ["RES_CLIENT_ID"], os.environ["RES_CLIENT_SECRET"])

async def get_resource_access_token(user_id_token: str) -> str:
    async with httpx.AsyncClient() as http:
        # Step A: IdP mints an ID-JAG for the target resource.
        idp_response = await http.post(
            IDP_TOKEN_URL,
            data={
                "grant_type": TOKEN_EXCHANGE,
                "requested_token_type": ID_JAG_TYPE,
                "subject_token": user_id_token,
                "subject_token_type": ID_TOKEN_TYPE,
                "audience": "https://todo0.example.com",
                "scope": "todos:read todos:write",
            },
            auth=IDP_CLIENT,
        )
        idp_response.raise_for_status()
        id_jag = idp_response.json()["access_token"]

        # Step B: Resource auth server exchanges ID-JAG for its
        # own access token. Agent0 authenticates as itself here.
        res_response = await http.post(
            RESOURCE_AUTH_TOKEN_URL,
            data={
                "grant_type": JWT_BEARER,
                "assertion": id_jag,
                "scope": "todos:read todos:write",
            },
            auth=RES_CLIENT,
        )
        res_response.raise_for_status()
        return res_response.json()["access_token"]
`}
      />
      <p className="mb-6 leading-relaxed">
        The two most common pitfalls with ID-JAG in 2026 are
        both about the tokens being on the wrong side of the
        trust boundary. First, teams try to run the ID-JAG
        flow inside a single Okta or Auth0 org, using the
        same authorization server for both the IdP and the
        resource, and it silently fails: the spec forbids an
        IdP from issuing an access token for a resource
        based on an ID-JAG the same IdP issued. Second,
        teams try to reuse an ID-JAG at a resource whose
        audience does not match; the audience check is
        mandatory and the resource must reject.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The commercial platforms: Auth0, WorkOS, and the
        newcomers
      </h2>
      <p className="mb-6 leading-relaxed">
        Building the whole stack from scratch is
        realistically only viable if your business is
        authentication. Everyone else buys a platform. The
        three we see on client work in 2026 are Auth0 (Okta
        for AI Agents), WorkOS AuthKit, and the emerging
        purpose-built platforms like Scalekit and Aembit.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Auth0 for AI Agents
      </h3>
      <p className="mb-6 leading-relaxed">
        Launched in developer preview in mid-2025 and now
        generally available, Auth for GenAI is the Okta
        stack&rsquo;s answer to the agent auth problem. Four
        pillars: user authentication with OAuth 2.0 and
        OIDC, a Token Vault that stores per-user tokens for
        upstream services (Google, Slack, Notion, etc.) so
        the agent can call them without ever seeing the
        user&rsquo;s credentials, Fine-Grained Authorization
        (FGA) so that RAG results only include documents the
        user can actually see, and human-in-the-loop
        approvals so that a high-stakes tool call pauses for
        the user to confirm before it runs. The Cross App
        Access flow described above is the Okta-native
        version of the same pattern for the enterprise case.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        WorkOS AuthKit for MCP
      </h3>
      <p className="mb-6 leading-relaxed">
        WorkOS AuthKit shipped full MCP OAuth 2.1 support
        during 2025 and positioned itself as the fastest way
        to slap a spec-compliant authorization server in
        front of an existing internal API. AuthKit issues
        short-lived scoped tokens through standard OAuth
        flows, and the WorkOS Connect product covers the M2M
        case with client-credentials for the situations
        where an agent genuinely needs its own identity
        (background sync jobs, scheduled report agents, and
        so on) rather than acting on behalf of a user. The
        practical appeal is time-to-first-token: for a team
        that already uses WorkOS for enterprise SSO, adding
        agent auth is a config change rather than a project.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Scalekit, Aembit, and the purpose-built newcomers
      </h3>
      <p className="mb-6 leading-relaxed">
        A wave of purpose-built platforms landed in 2025 and
        2026 targeting exactly the agent auth use case
        rather than retrofitting a general-purpose identity
        product. Scalekit ships an OAuth 2.1 stack that
        treats humans, agents, and services consistently and
        has a dedicated MCP server SDK. Aembit focuses on
        the non-human identity layer with policy-based access
        control for workloads and agents. These are worth
        looking at if your team is building agent
        infrastructure that will not fit inside a general
        SSO product&rsquo;s mental model, or if you need
        finer-grained agent-to-API policies than the general
        platforms surface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Non-human identity: the M2M half of the problem
      </h2>
      <p className="mb-6 leading-relaxed">
        Not every agent call is on behalf of a user. A daily
        report generator, a background monitoring agent, and
        a scheduled data pipeline are all machine-to-machine.
        For those, the right pattern is the OAuth 2.0 Client
        Credentials grant: the agent has its own client ID
        and client secret (or, better, a signed JWT
        assertion or workload identity from your cloud
        provider) and gets its own access token without a
        user involved.
      </p>
      <CodeBlock
        language="python"
        filename="src/scheduled_agent/m2m.py"
        code={`# Machine-to-machine agent: no user, agent is its own principal.
import os
import httpx

# Load from the environment. In production these come from a workload
# identity provider (IAM Roles Anywhere, Azure MI, GCP Workload Identity).
AGENT_CLIENT = (
    os.environ["AGENT_CLIENT_ID"],
    os.environ["AGENT_CLIENT_SECRET"],
)

async def get_agent_token() -> str:
    async with httpx.AsyncClient() as http:
        response = await http.post(
            "https://auth.acme.com/oauth/token",
            data={
                "grant_type": "client_credentials",
                "scope": "reports:read metrics:write",
                # The audience/resource this token is for.
                "audience": "https://api.acme.com",
            },
            auth=AGENT_CLIENT,
        )
        response.raise_for_status()
        return response.json()["access_token"]
`}
      />
      <p className="mb-6 leading-relaxed">
        The audit story matters at least as much as the
        auth story here. The agent&rsquo;s access token
        should identify the agent (not a human user), scope
        should be the minimum the job needs, tokens should
        be short-lived, and every access should land in the
        audit log tagged with the agent&rsquo;s stable
        identity. A production stack we shipped in 2026
        went one step further and required the agent&rsquo;s
        cloud workload identity (AWS IAM Roles Anywhere,
        Azure managed identity, or Google Workload Identity
        Federation) as the source of trust, then used it to
        get a client-credentials token. That closes the door
        on the &ldquo;a client secret leaked from an
        engineer&rsquo;s laptop&rdquo; failure mode.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world architectures we ship in 2026
      </h2>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        A consumer chatbot with third-party tool calls
      </h3>
      <p className="mb-6 leading-relaxed">
        Chat interface hosts the agent. The user signs in
        with Google or an email link. When they connect a
        third-party service (Notion, Slack, Google Drive),
        the chatbot walks them through an OAuth 2.1 flow to
        that service. The resulting per-user, per-service
        tokens live in a Token Vault (Auth0&rsquo;s or a
        homegrown one). When the model wants to call one of
        those services during a chat, the agent pulls the
        right token out of the vault, calls the service, and
        never surfaces the token to the model.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Internal enterprise assistant across many SaaS apps
      </h3>
      <p className="mb-6 leading-relaxed">
        The user signs in to the assistant through the
        enterprise IdP (Okta or Entra). The IdP admin has
        pre-connected the assistant to the SaaS apps the
        assistant needs to reach (NetSuite, Salesforce,
        ServiceNow, an internal wiki). Every cross-app call
        the assistant makes goes through the Cross App
        Access flow: token-exchange at the IdP for an ID-JAG,
        then exchange for a resource access token at the
        target app. No per-call user consent, but full IT
        governance in one place.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Coding agent talking to remote MCP servers
      </h3>
      <p className="mb-6 leading-relaxed">
        Claude Code or Cursor is the agent client. Each
        remote MCP server (GitHub, a hosted docs search, an
        internal database MCP) has its own auth server
        exposing OAuth 2.1 with PKCE. First time the user
        connects a server, the agent client discovers the
        server via Protected Resource Metadata, registers
        itself using Client ID Metadata Documents, walks the
        user through the browser consent, and stores the
        resulting per-user, per-resource token locally with
        OS keychain encryption. The token is audience-bound
        so it cannot leak sideways to another MCP server.
      </p>
      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Automated back-office agent
      </h3>
      <p className="mb-6 leading-relaxed">
        No user in the loop at request time. The agent runs
        on a schedule from a container in your cloud with a
        workload identity. It gets a short-lived
        client-credentials access token scoped to the exact
        APIs it needs, calls them, logs everything, and
        exits. The security team can revoke the agent by
        disabling one client registration without touching
        any user account.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The failure modes to plan for
      </h2>
      <p className="mb-6 leading-relaxed">
        Six things break in production. Design for them
        before they happen.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Confused deputy from token
          passthrough.</strong> The MCP server forwards the
          incoming token to an upstream API. Fix: never do
          this; act as your own OAuth client to the upstream.
        </li>
        <li>
          <strong>Audience-confused tokens.</strong> The
          resource server accepts tokens issued for
          different resources by the same IdP. Fix: validate
          the audience claim on every request and reject
          any token whose audience does not match this
          server&rsquo;s canonical URI.
        </li>
        <li>
          <strong>Long-lived refresh tokens leaked to
          logs.</strong> A verbose HTTP client dumps the
          full token exchange response into a log line. Fix:
          scrub tokens in your logging middleware, use very
          short access tokens, rotate refresh tokens per RFC
          6749bis / OAuth 2.1.
        </li>
        <li>
          <strong>Localhost hijack on desktop clients.</strong>{" "}
          A malicious process on the same machine binds the
          client&rsquo;s callback port and steals the
          authorization code. Fix: PKCE (mandatory, catches
          the code-injection case), attestation where
          available, warning UI on the authorization server
          for localhost-only clients.
        </li>
        <li>
          <strong>Over-broad scopes.</strong> The agent asks
          for the union of every scope any tool might
          possibly need, and the user grants it. Fix: use
          the scope-challenge step-up flow so scopes are
          requested only when needed, per operation.
        </li>
        <li>
          <strong>Silent token expiry mid-workflow.</strong>{" "}
          A multi-step agent workflow starts with a valid
          token, but the token expires halfway through and
          the workflow silently fails on step seven. Fix:
          refresh tokens proactively before expiry, catch
          401 responses in the agent loop, prompt the user
          for re-authentication if a refresh fails.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Recommendations for teams shipping in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        If you are building an agent that touches third-party
        services on behalf of a user, put OAuth 2.1 with
        PKCE in front of every one of those services on day
        one. Use the Client ID Metadata Documents pattern so
        you do not need to pre-register with every server
        your user might connect. Store per-user, per-service
        tokens in a vault (Auth0&rsquo;s or your own
        encrypted store) so the model never sees them and so
        one leaked token cannot compromise the others.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are shipping an MCP server, publish the
        Protected Resource Metadata document at the correct
        well-known URL from day one. Enforce audience
        binding on every request. Refuse to accept or
        forward tokens with the wrong audience. Return a
        proper WWW-Authenticate header on 401 responses so
        clients can discover your authorization server
        without out-of-band configuration.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are inside an enterprise IdP customer base,
        design for Cross App Access from the start. The
        ID-JAG flow lets your product accept an IdP-mediated
        agent connection without every user going through a
        fresh consent screen, and it puts your product in
        the same governance UI the customer&rsquo;s IT
        already uses for SSO. Note that XAA today requires
        the requesting app&rsquo;s IdP and the resource
        app&rsquo;s authorization server to be in separate
        trust domains, so it is not the answer for
        first-party internal-only setups (yet).
      </p>
      <p className="mb-6 leading-relaxed">
        For your machine-to-machine and background agents,
        use client credentials with short-lived tokens and
        cloud workload identities. Do not ship any agent
        with a long-lived static API key in an env var. Any
        secret with an infinite lifespan is a bomb waiting
        for the next repo leak.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What to watch through the end of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three things are moving fast and worth tracking.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ID-JAG stabilises.</strong> The IETF draft
        is at revision 04 as of early 2026. Once it reaches
        WG last call and then a stable RFC number, expect
        every major IdP to ship first-class support beyond
        Okta and Auth0. Microsoft Entra&rsquo;s work on
        agent-friendly cross-app grants and Google&rsquo;s
        cross-workspace grants are both trending in this
        direction.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-native identity primitives.</strong>{" "}
        The distinction between users, services, and agents
        is starting to show up as a first-class primitive in
        IdPs. Expect &ldquo;agent&rdquo; to become a
        principal type alongside &ldquo;user&rdquo; and
        &ldquo;service account&rdquo;, with its own consent
        surfaces, revocation UIs, and audit shapes. Non-
        human identity vendors like Aembit, Astrix, and Oasis
        are pushing hard on this.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Human-in-the-loop as a spec.</strong> The
        interactive-consent step for high-stakes agent
        actions (large payments, data deletion, admin
        changes) is still a per-vendor thing today. Multiple
        working groups are drafting a standard shape for a
        &ldquo;this action needs a fresh user approval&rdquo;
        challenge that any authorization server can emit
        and any agent client can honour. Auth0&rsquo;s
        Async Authorization API and the MCP scope-challenge
        pattern are the earliest concrete implementations
        of this.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Model Context Protocol Authorization
            Specification (2025-11-25)
          </a>
          {" "}- the definitive spec for MCP OAuth 2.1,
          including Protected Resource Metadata, Client ID
          Metadata Documents, PKCE requirements, and the
          confused deputy security considerations.
        </li>
        <li>
          <a
            href="https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            IETF Draft: Identity Assertion JWT Authorization
            Grant (draft-ietf-oauth-identity-assertion-authz-grant-04)
          </a>
          {" "}- the standards-track draft for the ID-JAG
          token format that powers Cross App Access,
          including claim structures, cross-domain rules,
          and the SAML interoperability path.
        </li>
        <li>
          <a
            href="https://developer.okta.com/blog/2025/09/03/cross-app-access"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Okta Developer Blog: Build Secure Agent-to-App
            Connections with Cross App Access (XAA) Using
            OIDC (September 3, 2025)
          </a>
          {" "}- the hands-on walkthrough of the XAA protocol
          using Okta as the IdP, with the OAuth 2.0 Identity
          Assertion Authorization Grant flow diagram and the
          Agent0/Todo0 sample apps.
        </li>
        <li>
          <a
            href="https://auth0.com/ai"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0 for AI Agents
          </a>
          {" "}- the Okta-owned Auth for GenAI product page
          with the four pillars (user auth, Token Vault,
          fine-grained RAG authorization, human-in-the-loop
          approvals) and the framework integrations for
          LangChain, LlamaIndex, and the Vercel AI SDK.
        </li>
        <li>
          <a
            href="https://workos.com/blog/developers-guide-to-ai-agent-authentication-and-authorization"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WorkOS: The developer&rsquo;s guide to AI agent
            authentication and authorization
          </a>
          {" "}- a practical walkthrough of the M2M patterns
          (OAuth 2.0 client credentials, JWT bearer
          assertions, workload identities) and the AuthKit
          MCP integration.
        </li>
        <li>
          <a
            href="https://aembit.io/blog/mcp-oauth-2-1-pkce-and-the-future-of-ai-authorization/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aembit: MCP, OAuth 2.1, PKCE, and the Future of
            AI Authorization (May 2025)
          </a>
          {" "}- a deeper read on the OAuth 2.1 + PKCE model
          MCP adopted, with a focus on the Protected Resource
          Metadata document structure and the reasons the
          spec picked it over Dynamic Client Registration.
        </li>
        <li>
          <a
            href="https://www.okta.com/newsroom/press-releases/auth0-platform-innovation/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Okta Press Release: New Auth0 Platform
            innovations for GenAI applications
          </a>
          {" "}- the announcement of Auth for GenAI in
          Developer Preview, with the async workflow and
          secure API access details.
        </li>
        <li>
          <a
            href="https://www.scalekit.com/blog/ship-secure-mcp-server"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scalekit: Ship a secure MCP server with OAuth 2.1
          </a>
          {" "}- a walkthrough of the March 2025 MCP spec
          update that mandated OAuth and the practical
          steps to build a compliant remote MCP server.
        </li>
        <li>
          <a
            href="https://www.rfc-editor.org/rfc/rfc8707.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RFC 8707: Resource Indicators for OAuth 2.0
          </a>
          {" "}- the underlying RFC that defines the
          <code>resource</code> parameter behavior the MCP
          spec relies on for audience binding.
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
          {" "}- the specification for the
          <code>.well-known/oauth-protected-resource</code>{" "}
          document MCP servers must publish.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the deeper read on the Model Context Protocol
          itself, the transport and lifecycle spec, and the
          ecosystem of MCP servers you will end up
          authenticating against.
        </li>
        <li>
          <a
            href="/articles/ai-agent-security-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent security in 2026
          </a>
          {" "}- the broader security read covering prompt
          injection, sandboxing, the OWASP LLM Top 10, and
          the defence-in-depth patterns that pair with the
          auth story here.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and audit story you need to
          make agent auth debuggable in production.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the framework read on how multiple agents
          coordinate, each with their own identities and
          scopes.
        </li>
      </ul>
    </div>
  );
}
