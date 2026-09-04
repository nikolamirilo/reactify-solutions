import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 29,
  slug: "claude-agent-sdk-production-2026",
  title:
    "Claude Agent SDK in production 2026: building agents on the Claude Code harness",
  excerpt:
    "How the Claude Agent SDK turned the Claude Code harness into a library, and what teams ship with it in 2026. Core primitives, hooks, subagents, sessions, MCP, the Dynamic Workflows release, self-hosted sandboxes, MCP tunnels, the Spotify Honk case study, and a clear-eyed comparison with the OpenAI Agents SDK, Pydantic AI, and LangGraph.",
  metaDescription:
    "A practical, technical guide to the Claude Agent SDK in 2026. Covers query and ClaudeSDKClient, built-in tools, hooks, subagents, sessions, in-process MCP servers, the May 2026 Dynamic Workflows release with up to 1,000 parallel subagents, self-hosted sandboxes on Cloudflare, Daytona, Modal, and Vercel, MCP tunnels, the Spotify Honk production deployment merging 650+ pull requests per month, and an honest comparison with the OpenAI Agents SDK, Pydantic AI, and LangGraph.",
  image:
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Anthropic",
    "Claude",
    "Claude Agent SDK",
    "Python",
    "TypeScript",
    "Production",
    "MCP",
    "Subagents",
  ],
  publishDate: "2026-06-21",
  readingTime: "16 min read",
};

export default function ClaudeAgentSdkProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In September 2025 Anthropic quietly renamed a library it had been
        shipping for a year. The Claude Code SDK became the Claude Agent
        SDK, and the rename was the loudest thing about the release: the
        team had realized the harness that drives Claude Code, the same
        agent loop, the same tool runner, the same context management,
        was useful for a lot more than coding. By April 2026, monthly
        search demand for &ldquo;claude agent sdk&rdquo; had gone from
        roughly 50 to 14,800, Spotify was merging 650 agent-authored
        pull requests a month off a single deployment built on it, and
        Anthropic had shipped enough production features (Dynamic
        Workflows, self-hosted sandboxes, MCP tunnels) that the SDK had
        become the default way teams wire Claude into long-running,
        tool-using workflows.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this stack matters now
      </h2>
      <p className="mb-6 leading-relaxed">
        The Claude Agent SDK is not a thin wrapper around the Messages
        API. It is the same code path Claude Code runs against,
        published as a Python library (3.10 or later) and a TypeScript
        library, with a bundled native binary in the npm package so a
        Node project does not have to install Claude Code separately.
        What that buys a production team is the entire harness Anthropic
        has been hardening on its own engineers and on the
        million-user-plus Claude Code install base for two years: a
        tested agent loop, built-in tools for file and shell work, a
        permission system, a hook surface for deterministic
        interception, subagents for parallel work in isolated context,
        sessions on disk, MCP for external integrations, and a
        filesystem-based configuration story that lets a product
        manager drop a markdown file into a repo and change the
        agent&rsquo;s behavior.
      </p>
      <p className="mb-6 leading-relaxed">
        The argument for picking it over a hand-rolled OpenAI or
        Anthropic client is the same argument the OpenAI Agents SDK
        makes on the other side of the fence: you do not want to write
        the agent loop yourself. The argument for picking it over the
        OpenAI Agents SDK is narrower and more specific: when the
        workload is a coding agent, a filesystem-first agent, or any
        long-running agent that has to read and edit a project, the
        Claude Agent SDK ships the file and shell primitives as
        first-class tools, and the same code that runs in a developer
        terminal runs in a CI pipeline or a production service with no
        rewrite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 numbers
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Two language bindings, one harness.</strong>{" "}
          claude-agent-sdk on PyPI (Python 3.10+) and
          @anthropic-ai/claude-agent-sdk on npm. Both wrap the same
          Claude Code binary; the TypeScript package bundles the
          binary as an optional dependency so a Node service does not
          need a separate install.
        </li>
        <li>
          <strong>7,400+ GitHub stars and 1,100+ forks</strong> on the
          Python repo by mid-2026, with the TypeScript SDK on a
          similar trajectory and a healthy community of plugins,
          skills, and example agents in the
          anthropics/claude-agent-sdk-demos repo.
        </li>
        <li>
          <strong>Dynamic Workflows, shipped May 28, 2026,</strong>{" "}
          lets one agent plan and run up to 1,000 parallel subagents
          in a single session. The lead agent decomposes the task,
          assigns each piece to a specialist with its own model and
          tools, and synthesizes the results after internal
          verification. The release is in research preview on
          Enterprise, Team, and Max plans.
        </li>
        <li>
          <strong>Self-hosted sandboxes and MCP tunnels, shipped
          May 19, 2026,</strong> moved tool execution off
          Anthropic&rsquo;s infrastructure for teams that needed it.
          Sandboxes run on Cloudflare, Daytona, Modal, Vercel, or your
          own VPC; MCP tunnels expose private MCP servers without
          opening inbound firewall holes.
        </li>
        <li>
          <strong>650+ pull requests per month, merged.</strong> The
          Spotify Honk agent, built on the Claude Agent SDK and
          integrated into Spotify&rsquo;s Fleet Management system,
          authors more than 650 production pull requests a month and
          has merged more than 1,500 in total, saving engineers up to
          90 percent of the time they would have spent writing
          migrations by hand.
        </li>
        <li>
          <strong>Two surfaces for two deployment shapes.</strong> The
          Agent SDK is the library you run inside your own process;
          Managed Agents is the hosted REST API where Anthropic runs
          the agent loop and provisions a sandboxed container per
          session. The two share concepts and most teams pick one or
          the other per workload, not both.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        From Claude Code SDK to Claude Agent SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        Claude Code launched in February 2025 and reached general
        availability mid-year. The SDK that shipped alongside it was
        called the Claude Code SDK, and the framing was that the
        library let a CI pipeline or a custom UI drive the same harness
        that ran in a developer terminal. By the third quarter of 2025
        the team noticed that the harness was being used for a lot of
        non-coding work: research agents, customer service workflows,
        document review, data analysis. The harness is general; the
        name was misleading. In September 2025 Anthropic renamed it to
        Claude Agent SDK and the &ldquo;Claude Code as a library&rdquo;
        framing became &ldquo;agent harness as a library.&rdquo; The
        underlying code did not change in the rename; the positioning
        did, and from late 2025 onward the docs split into two surfaces,
        the Claude Code product and the Claude Agent SDK that ships the
        same internals to anyone who wants them.
      </p>
      <p className="mb-6 leading-relaxed">
        The split matters because it gave Anthropic permission to ship
        production features that did not belong in a CLI for
        developers. Dynamic Workflows is the clearest example: a
        thousand parallel subagents make sense in a codebase-scale
        migration that runs overnight, and they do not really make
        sense in an interactive terminal. The SDK gets the same
        primitive Claude Code gets, and the CLI happens to be one
        client of it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Core concepts: query, ClaudeSDKClient, tools, hooks, subagents,
        sessions
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK exposes a small surface. Six concepts cover almost
        every production deployment; the rest of the docs is variations
        on how to wire them up.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>query</strong> function is the one-shot entry
        point. You give it a prompt and a ClaudeAgentOptions object
        and it returns an async iterator of messages. The agent loop
        runs until it produces a final result or hits the configured
        turn limit. This is what a CI job or a webhook handler usually
        calls.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>ClaudeSDKClient</strong> is the bidirectional
        version. You open a client, send messages, receive responses,
        and keep the session alive across turns in your own process.
        This is what a chat UI or a long-running service usually wraps.
        The client gives you a streaming surface, hook callbacks fire
        on every tool call, and the session state lives in the same
        Python or TypeScript object you would already have in
        application memory.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>tool</strong> is something the agent can invoke.
        Out of the box the SDK ships Read, Write, Edit, Bash, Glob,
        Grep, Monitor, WebSearch, WebFetch, and AskUserQuestion. None
        of those need configuration; they just work against the
        filesystem and shell of the process the SDK is running in.
        Custom tools are functions you decorate with @tool (Python)
        or define on an in-process MCP server, and the framework
        registers them on every run.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>hook</strong> is a callback that fires at a
        specific point in the agent lifecycle. The events are
        PreToolUse, PostToolUse, Stop, SessionStart, SessionEnd, and
        UserPromptSubmit. Hooks can return a structured response that
        approves, denies, or modifies the action the model wanted to
        take. This is how you ship a production agent that cannot run
        rm -rf or write to /etc, and how you log every file change to
        an audit log for compliance.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>subagent</strong> is a specialist Claude instance
        the main agent can spawn. Each subagent gets its own
        instructions, its own tool list, and its own fresh context
        window. The parent invokes a subagent through the Agent tool;
        the subagent runs to completion; only its final message comes
        back. This is the pattern that keeps long sessions cheap and
        focused, and it is the same pattern Dynamic Workflows scales
        to a thousand parallel children.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>session</strong> is the persistent conversation
        state. The SDK writes it as JSONL in your working directory
        by default. You can capture a session id, resume the same
        session later with the resume option, or fork it to explore
        two paths from the same midpoint. Sessions are how the SDK
        avoids reaching for a vector store on day one: most multi-turn
        work fits inside the session log, and that log replays
        cleanly into the next run.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture: how a request flows through the SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model is a small stack on top of the Messages API.
        Your application calls query or ClaudeSDKClient, the harness
        builds the system prompt and tool definitions, the agent loop
        sends them to the model, the model returns either a final
        message or a tool call, the harness runs the tool against the
        local filesystem or shell, hooks fire on the boundaries, and
        the loop continues until the model produces an end-of-turn
        message.
      </p>
      <CodeBlock
        language="bash"
        filename="Agent SDK request path"
        code={`Your application (CLI, web service, CI job, chat UI)
        |
        |  query("fix the bug in auth.py", options)
        v
+----------------------------------------------------+
|  Claude Agent SDK harness                          |
|                                                    |
|  1. Resolve .claude/ and CLAUDE.md from cwd        |
|  2. Build system prompt, tool list, skill index    |
|  3. Open session (write JSONL to .claude/sessions) |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Agent loop                                        |
|                                                    |
|  1. Send messages + tools to the Messages API      |
|  2. Receive tool calls                             |
|     - PreToolUse hooks fire (can deny)             |
|     - Tool runs against local fs / shell / MCP     |
|     - PostToolUse hooks fire (can log, transform)  |
|  3. Receive subagent invocation -> spawn child     |
|     - Fresh context, isolated tools, own session   |
|     - Final message returns as Agent tool result   |
|  4. Receive final assistant message                |
+----------------------------------------------------+
        |
        v
+----------------------------------------------------+
|  Output                                            |
|  - Stream of message objects to async iterator     |
|  - Session log persisted to disk                   |
|  - Audit trail in any hook you wired               |
+----------------------------------------------------+
        |
        v
   Result back to your application code`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this flow carry the production work. The
        session log on disk means a crash mid-run does not lose the
        conversation; the next process can resume by id. The hooks fire
        synchronously on the boundaries, so a PreToolUse hook that
        denies a Bash call halts the action before any side effect
        reaches the system. And the subagent boundary is a real
        context boundary: parent and child do not share a context
        window, the child does not see the parent&rsquo;s tool history,
        and only the final message returns. That property is what
        makes Dynamic Workflows feasible at a thousand children.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Your first agent: query with built-in tools
      </h2>
      <p className="mb-6 leading-relaxed">
        The simplest useful agent is a few lines. The pattern below
        reads a directory, finds TODO comments, and writes a summary.
        No custom tools, no hooks, no MCP, just the built-ins.
      </p>
      <CodeBlock
        language="python"
        filename="todo_summary.py"
        code={`import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions


async def main():
    options = ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Write"],
        permission_mode="acceptEdits",
        cwd="./src",
    )

    async for message in query(
        prompt=(
            "Find every TODO comment under the current directory. "
            "Group them by file. Write the result to TODO_SUMMARY.md."
        ),
        options=options,
    ):
        if hasattr(message, "result"):
            print(message.result)


asyncio.run(main())`}
      />
      <p className="mb-6 leading-relaxed">
        Three things in this snippet are worth pointing at. The
        allowed_tools list is the security perimeter: the agent
        cannot run anything outside it, and a request that needs Bash
        would simply fail. The permission_mode setting auto-approves
        the writes the agent decides to make; the alternatives are
        ask (interactive prompt) and deny (no writes allowed at all).
        The cwd parameter sandboxes the filesystem tools to a
        specific directory, which is the difference between an agent
        that operates on a feature branch and an agent that operates
        on your home directory.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Custom tools: in-process MCP servers
      </h2>
      <p className="mb-6 leading-relaxed">
        The agent will almost always need to do something the
        built-ins cannot. The SDK ships an in-process MCP server
        primitive for exactly that case: you define functions in
        Python or TypeScript, decorate them, and the framework
        registers them as MCP tools the model can call. No subprocess,
        no separate server, no extra binary.
      </p>
      <CodeBlock
        language="python"
        filename="support_tools.py"
        code={`from claude_agent_sdk import (
    tool, create_sdk_mcp_server,
    ClaudeAgentOptions, ClaudeSDKClient,
)

# 1. Tools are normal Python functions with a typed input schema.
@tool("recent_orders", "Return the most recent orders for a customer", {
    "customer_id": int,
    "limit": int,
})
async def recent_orders(args):
    rows = await db.fetch(
        "SELECT id, total_cents, status, placed_at FROM orders "
        "WHERE customer_id = $1 ORDER BY placed_at DESC LIMIT $2",
        args["customer_id"], args["limit"],
    )
    return {
        "content": [
            {"type": "text", "text": str([dict(r) for r in rows])}
        ]
    }

@tool("issue_refund", "Issue a refund for one order", {
    "order_id": int,
    "amount_cents": int,
})
async def issue_refund(args):
    await db.execute(
        "INSERT INTO refunds (order_id, amount_cents) VALUES ($1, $2)",
        args["order_id"], args["amount_cents"],
    )
    return {
        "content": [
            {"type": "text", "text": f"Refunded {args['amount_cents']} on order {args['order_id']}."}
        ]
    }

# 2. Wrap the tools in an in-process MCP server.
support = create_sdk_mcp_server(
    name="support",
    version="1.0.0",
    tools=[recent_orders, issue_refund],
)

# 3. Hand the server to the agent.
options = ClaudeAgentOptions(
    mcp_servers={"support": support},
    allowed_tools=[
        "mcp__support__recent_orders",
        "mcp__support__issue_refund",
    ],
    system_prompt=(
        "You are a refund agent. Always look up the order before "
        "refunding. Refuse refunds on orders older than 30 days."
    ),
)

async with ClaudeSDKClient(options=options) as client:
    await client.query("Please refund order 12345 for customer 42.")
    async for msg in client.receive_response():
        print(msg)`}
      />
      <p className="mb-6 leading-relaxed">
        Four things this pattern gets right. The tool schema is
        derived from the dict you pass to @tool, so editing a Python
        signature also edits what the model sees. The MCP server runs
        in the same process the SDK does, so the tool function shares
        the database pool and config the rest of your service uses;
        no IPC, no token plumbing. The allowed_tools list uses the
        mcp__server__tool naming convention the SDK enforces, which
        keeps the security perimeter explicit even when you have a
        lot of tools. And the system_prompt is the only place the
        domain logic lives; the agent definition itself is just glue.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Hooks: the boundary code that keeps the agent honest
      </h2>
      <p className="mb-6 leading-relaxed">
        Hooks are the deterministic counterpart to the
        non-deterministic model. They run on the boundaries of the
        agent loop and they can do anything Python or TypeScript code
        can do: validate, log, block, transform, prompt the user. The
        PreToolUse hook is the most consequential one in production
        because it can deny a tool call before any side effect fires.
      </p>
      <CodeBlock
        language="python"
        filename="safety_hooks.py"
        code={`from claude_agent_sdk import (
    query, ClaudeAgentOptions, HookMatcher,
)

# Block any Bash command that touches secrets or production paths.
async def deny_dangerous_bash(input_data, tool_use_id, context):
    if input_data["tool_name"] != "Bash":
        return {}
    command = input_data["tool_input"].get("command", "")
    blocked = (
        "rm -rf",
        ".env",
        "/etc/",
        "kubectl apply",
        "psql prod",
    )
    if any(token in command for token in blocked):
        return {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": (
                    f"Refused: command contains a blocked token. "
                    f"Command was: {command}"
                ),
            }
        }
    return {}

# Append every Edit and Write to an audit log for compliance.
from datetime import datetime, timezone
async def audit_file_changes(input_data, tool_use_id, context):
    if input_data["tool_name"] not in ("Edit", "Write"):
        return {}
    path = input_data["tool_input"].get("file_path", "?")
    with open("./audit.log", "a") as f:
        f.write(
            f"{datetime.now(timezone.utc).isoformat()} "
            f"{tool_use_id} {input_data['tool_name']} {path}\\n"
        )
    return {}

options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"],
    permission_mode="acceptEdits",
    hooks={
        "PreToolUse": [
            HookMatcher(matcher="Bash", hooks=[deny_dangerous_bash]),
            HookMatcher(matcher="Write|Edit", hooks=[audit_file_changes]),
        ],
    },
)`}
      />
      <p className="mb-6 leading-relaxed">
        The matcher field is a regex against the tool name, so one
        hook can cover a family of related tools without enumerating
        them. The hook return value is a structured dict; for a
        PreToolUse hook, hookSpecificOutput.permissionDecision is the
        one field that matters, and it gets attached to a reason the
        model sees in the tool result. A denied call is not a silent
        failure: the model reads the reason, adjusts the plan, and
        usually picks a different approach on the next turn.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Subagents and Dynamic Workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        Subagents are the SDK&rsquo;s answer to long context. A
        parent agent that has to read fifty files and reason about
        each one will burn its context window on intermediate state
        and lose focus on the task. The pattern that scales is to
        push exploratory work into a child, let the child finish in
        its own context, and let only the final answer come back.
      </p>
      <CodeBlock
        language="python"
        filename="incident_response.py"
        code={`from claude_agent_sdk import (
    query, ClaudeAgentOptions, AgentDefinition,
)

options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep", "WebFetch", "Bash", "Agent"],
    agents={
        "log-analyst": AgentDefinition(
            description="Reads recent error logs and produces a one-paragraph summary.",
            prompt=(
                "Find the loudest error pattern in the logs under ./logs. "
                "Summarize what is failing and where. Two sentences."
            ),
            tools=["Read", "Glob", "Grep"],
        ),
        "deploy-historian": AgentDefinition(
            description="Reads deploy history and surfaces the last risky change.",
            prompt=(
                "Run git log on the deployments repo and surface the last "
                "commit that touched the failing service. One sentence."
            ),
            tools=["Bash", "Read"],
        ),
        "ticket-searcher": AgentDefinition(
            description="Searches the support tracker for related complaints.",
            prompt=(
                "Use the support MCP server to find tickets opened in the "
                "last 30 minutes that mention the failing endpoint."
            ),
            tools=["mcp__support__search_tickets"],
        ),
    },
)

async for message in query(
    prompt=(
        "Service 'checkout' is paging. Spawn log-analyst, "
        "deploy-historian, and ticket-searcher in parallel. "
        "Combine their findings into one incident summary."
    ),
    options=options,
):
    if hasattr(message, "result"):
        print(message.result)`}
      />
      <p className="mb-6 leading-relaxed">
        Each subagent runs with its own context, its own tool list,
        and its own model if you set one. The parent invokes them
        through the Agent tool, which means Agent has to be in the
        parent&rsquo;s allowed_tools list; without it the parent
        cannot spawn anything. The subagent definitions are a
        dictionary the SDK indexes by name, and the parent picks one
        at runtime based on the description string. In production the
        description is the only thing the parent reads when deciding
        which child to call, so it is the single highest-leverage
        prompt in the whole agent.
      </p>
      <p className="mb-6 leading-relaxed">
        Dynamic Workflows, the May 2026 release, scales this pattern.
        The lead agent decomposes a task at runtime, fans out to up
        to a thousand parallel subagents, lets them work on a shared
        filesystem, checks in mid-workflow to verify they are on
        track, and synthesizes results after internal comparison.
        The mechanics are still subagent invocations under the hood;
        what is new is the planning loop on top, which the SDK runs
        for you on the Enterprise, Team, and Max plans, and the cap
        is one thousand children per session. Codebase-scale work
        that used to take a week of bespoke scripting (a fleet-wide
        Spring Boot upgrade, a TypeScript major version bump across
        every service) is one prompt against the SDK now.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sessions: resume and fork
      </h2>
      <p className="mb-6 leading-relaxed">
        A session is a JSONL file in your working directory. The SDK
        writes one per run. The session id comes back on the first
        SystemMessage with subtype init; you can store it, hand it
        to the next process, and pick up where you left off.
      </p>
      <CodeBlock
        language="python"
        filename="resume_session.py"
        code={`from claude_agent_sdk import (
    query, ClaudeAgentOptions, SystemMessage, ResultMessage,
)

session_id = None

# Turn 1: walk the auth module.
async for message in query(
    prompt="Read everything in src/auth and summarize the public API.",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Glob", "Grep"]),
):
    if isinstance(message, SystemMessage) and message.subtype == "init":
        session_id = message.data["session_id"]

# Turn 2 (could be a different process, hours later): resume.
async for message in query(
    prompt="Now find every caller of those functions across the repo.",
    options=ClaudeAgentOptions(resume=session_id),
):
    if isinstance(message, ResultMessage):
        print(message.result)`}
      />
      <p className="mb-6 leading-relaxed">
        Two patterns we see on engagements. Long-running coding
        agents store the session id in their tracker (a Linear or
        Jira ticket field), so a re-run picks up the same context
        without re-reading the codebase. Customer support agents
        store the session id keyed by user, so the next message from
        the same user lands on the same session, and the agent
        remembers what it already looked up. Fork is the other axis:
        if you want to explore two paths from a midpoint (try fix A
        vs fix B), fork the session at that point and run two queries
        in parallel.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Self-hosted sandboxes and MCP tunnels
      </h2>
      <p className="mb-6 leading-relaxed">
        The default deployment shape runs the SDK in your own
        process, which means the tools execute against your own
        filesystem and your own shell. That is fine for CI pipelines
        and internal tools. It is not fine for an agent that has to
        run untrusted code, edit a repository it should not be
        allowed to break, or touch services in a regulated network.
        The May 2026 release added two features for those cases.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Self-hosted sandboxes</strong> move tool execution
        off Anthropic&rsquo;s default container and onto an
        environment you control. The orchestration layer (the agent
        loop, the context management, the planning) still runs on
        Anthropic; only the tools move. Five providers shipped at
        launch: Cloudflare Workers, Daytona, Modal, Vercel, and your
        own VPC through a worker the SDK ships. The same Agent
        definition runs against any of them, and the choice is a
        one-line change to the environment configuration.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP tunnels</strong> solved the inverse problem.
        Internal MCP servers (an internal Jira, an internal database
        viewer, an internal knowledge base) sit behind a firewall and
        cannot be reached from Anthropic&rsquo;s infrastructure. The
        tunnel deploys a lightweight gateway in your network that
        makes one outbound connection to Anthropic, and the agent
        reaches every MCP server behind the gateway over that
        encrypted tunnel. No inbound firewall rules, no public
        endpoints, no rebuild of the existing MCP server. The pattern
        is the same shape Stacklok and other vendors had been
        shipping out of band; Anthropic made it a first-party
        primitive.
      </p>
      <p className="mb-6 leading-relaxed">
        The two features compose. A regulated workload runs the SDK
        in a customer-controlled Cloudflare sandbox, reaches its
        internal MCP servers over a tunnel, and never has any code
        or data leave the perimeter. Anthropic still drives the loop,
        which is the part that benefits most from frequent updates
        and tuning.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Skills, plugins, and filesystem-based configuration
      </h2>
      <p className="mb-6 leading-relaxed">
        The SDK reads .claude/ in the working directory and
        ~/.claude/ in the home directory the same way Claude Code
        does. That means four things travel with a repo and shape the
        agent&rsquo;s behavior without any code change: skills,
        commands, project memory, and plugins.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skills</strong> live in .claude/skills/&lt;name&gt;/SKILL.md
        and teach the agent a repeatable workflow. Anthropic
        introduced them in October 2025 and they have become the
        recommended way to ship reusable agent capabilities. A
        skill&rsquo;s description sits in context; the agent loads
        the full file when the task calls for it. Skills are
        progressive disclosure for instructions, and they
        compose: a repo can ship its own skills, a plugin can
        bundle skills the team installs across many repos.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>CLAUDE.md</strong> (or .claude/CLAUDE.md) is the
        project memory file. Anything in it is loaded as part of the
        system prompt on every run. This is where the project-level
        context (the architecture, the conventions, the
        do-not-touch list) lives, and editing it changes the
        agent&rsquo;s behavior on the next run.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Plugins</strong> are bundles of skills, agents,
        hooks, and MCP servers a team installs through the SDK&rsquo;s
        plugins option. The plugin format is filesystem-based and
        version-controllable, which means a security team can ship
        a hooks bundle that blocks dangerous bash commands and an
        application team can install it as a one-line dependency.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        Three production stories carry most of the lessons we have
        seen on engagements.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Spotify</strong> built Honk, a background coding
        agent, on the Claude Agent SDK and wired it into the
        company&rsquo;s Fleet Management system. Engineers trigger
        Honk from Slack or directly from their phones; the agent
        picks up a transformation task (convert Java AutoValue
        classes to Records, upgrade a framework with breaking
        changes, apply a configuration update across a hundred
        repositories) and opens a pull request when it is done. By
        mid-2026 the system was producing 650 merged PRs a month
        and had crossed 1,500 PRs total since its July 2025 rollout.
        Spotify&rsquo;s Chief Architect, Niklas Gustavsson, called
        Claude their model of choice for large-scale code
        transformation work, and the engineering blog cites a 90
        percent reduction in the time engineers spend on migrations
        the agent handles. The point of the story is not the raw
        throughput; it is that the SDK absorbed the agent harness so
        the Spotify team could spend its engineering budget on the
        Fleet Management integration, not on rebuilding a tool runner.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Incident response</strong> is the canonical
        non-coding use case. The pattern we see is a lead agent that
        receives the page, then fans out to three or four specialist
        subagents: a log analyst that grep&apos;s the last hour of
        logs, a deploy historian that walks git history on the
        deployments repo, a ticket searcher that hits an internal
        Linear or Jira MCP server, and a metrics reader that pulls
        from Datadog or Grafana. Each child returns one paragraph;
        the lead agent stitches them into an incident summary with
        a probable cause and a suggested next step. The shape is
        the same Dynamic Workflows scales, just at a smaller
        fan-out. The win for on-call is that the first page is no
        longer a context switch; the engineer reads the summary,
        not the raw logs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Customer support</strong> is the third pattern. A
        ClaudeSDKClient sits behind a chat surface, holds a session
        per user, calls in-process MCP tools that touch the orders
        database and the billing system, and uses hooks for the
        guardrails: PreToolUse denies refund tools above a
        configurable dollar amount, PostToolUse writes every refund
        to an audit log that the compliance team owns. Sessions
        persist across conversations, so the next message from the
        same user lands on the same agent state, and the agent
        remembers what it already looked up. The pattern is the
        cheapest production agent shape we ship to clients in 2026,
        and the SDK absorbs the parts (session storage, hook
        plumbing, MCP) that used to be the largest engineering line
        items.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agent SDK vs Managed Agents
      </h2>
      <p className="mb-6 leading-relaxed">
        Anthropic ships two agent surfaces and the difference is the
        most common question we get. The Claude Agent SDK is a
        library you run inside your own process; Managed Agents is a
        hosted REST API where Anthropic runs the agent loop and
        provisions a sandboxed container per session.
      </p>
      <p className="mb-6 leading-relaxed">
        The split is not about capability; both surfaces share the
        same harness and most of the same primitives. It is about
        who runs the compute. With the SDK, the agent loop runs in
        your process and the tools touch your filesystem. With
        Managed Agents, the loop runs on Anthropic, the tools run in
        an Anthropic-managed container, and your code drives it
        through events streamed back over an HTTP connection. The
        SDK is the right pick for local prototyping, agents that
        operate on your filesystem and your services, and any
        workload where you want the loop in-process for latency or
        compliance reasons. Managed Agents is the right pick for
        long-running asynchronous sessions, fan-out work where you
        do not want to provision sandboxes yourself, and any
        workload where the agent has to outlive your process.
      </p>
      <p className="mb-6 leading-relaxed">
        A common path is to prototype with the Agent SDK locally,
        keep the same Agent and tool definitions, and move to
        Managed Agents for production where the sandbox and session
        management become someone else&rsquo;s problem. Early users
        of Managed Agents in production include Notion, Asana, and
        Sentry; teams that ship the Agent SDK in process include
        Spotify, the Anthropic internal engineering org, and every
        Claude Code user by definition.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Claude Agent SDK vs OpenAI Agents SDK, Pydantic AI, LangGraph
      </h2>
      <p className="mb-6 leading-relaxed">
        Four frameworks own the production agent conversation in
        2026. They model the same problem differently and they fit
        different teams.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>OpenAI Agents SDK</strong> is the closest peer.
        Both are small, opinionated libraries from a frontier-model
        vendor, both ship sessions, handoffs (or subagents),
        guardrails (or hooks), and MCP. The line between them is
        where their built-in tools point. OpenAI&rsquo;s ship Web
        Search, Computer Use, File Search, and the Connector Registry
        out of the box; Anthropic&rsquo;s ship Read, Write, Edit,
        Bash, Glob, Grep, Monitor out of the box. For coding agents
        and filesystem-first workflows the Anthropic SDK pays for
        itself immediately; for browsing agents and the new
        OpenAI-hosted MCP ecosystem the OpenAI SDK does. Most teams
        we work with end up running both, one per workload class.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pydantic AI</strong> is the typed-Python play. It is
        the right pick when the workload is a typed API that happens
        to call an LLM, and the team values strict output contracts
        above everything else. The Claude Agent SDK is the right pick
        when the workload is an agent that happens to expose an API,
        and the team values the file and shell primitives, the hook
        surface, and the subagent model.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph</strong> is the graph-orchestration play.
        Explicit state machines, cyclic graphs, conditional edges,
        checkpointers. The Claude Agent SDK does not try to be a
        state machine framework; the loop is implicit and the
        subagent boundary carries the structure. For regulated
        workflows where the auditor wants to see the state diagram,
        LangGraph still wins. For agentic workflows where the
        structure is &ldquo;a lead agent plus a handful of
        specialists,&rdquo; the Claude Agent SDK is less code and
        easier to debug.
      </p>
      <p className="mb-6 leading-relaxed">
        A rough decision rule we use on engagements. Coding and
        filesystem-first work goes to the Claude Agent SDK. Voice,
        browsing, and the OpenAI-hosted Apps ecosystem go to the
        OpenAI Agents SDK. Typed Python APIs that wrap an LLM go to
        Pydantic AI. Long-running stateful workflows that need
        rollback go to LangGraph. The four compose; we ship systems
        that use the Claude Agent SDK for the heavy in-process agent
        and the OpenAI Agents SDK for the voice surface in the same
        product.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        The Claude Agent SDK wins a lot of arguments in 2026, but it
        is not free. An honest list of the trade-offs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Strengths.</strong> The harness is the same one
        Claude Code uses, which means it is tested at a scale most
        agent frameworks will never see. The built-in tools cover
        the file and shell work that every coding or filesystem
        agent needs, with no implementation cost. Hooks are a real,
        synchronous interception surface, not an
        after-the-fact callback; production safety becomes a code
        change rather than a prompt engineering exercise. Subagents
        are first-class and Dynamic Workflows scales them to a
        thousand parallel children, which is the only practical
        path we have seen for codebase-scale work. Sessions live
        on disk as JSONL, which means resume and fork are file
        operations, not vendor lock-in. Multi-language: Python and
        TypeScript with the same primitives. And the SDK
        provider-agnostic in the same way Claude Code is; you can
        point it at Bedrock, Vertex, or Microsoft Foundry through
        environment variables.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trade-offs.</strong> The harness is opinionated.
        Tools, hook event types, permission modes, the agent loop
        shape: these are decisions Anthropic made and you live with.
        Teams that want a graph orchestration model find LangGraph a
        better fit; teams that want a stricter type contract find
        Pydantic AI a better fit. The SDK is Claude-only in
        practice: it works against Bedrock and Vertex Claude
        endpoints but not against other vendors&rsquo; models.
        Dynamic Workflows is in research preview as of mid-2026 and
        is gated to Enterprise, Team, and Max plans, which puts it
        out of reach of teams on the standard developer tier.
        Self-hosted sandboxes ship across five providers, but the
        provider integration is still maturing and each one has its
        own quirks. And the in-process MCP server pattern, while
        elegant, means tool failures take the whole agent process
        down; out-of-process MCP servers are still the right pick
        for tools that touch flaky third-party APIs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use it.</strong> A pure chat endpoint
        with no tools and no filesystem work does not need an agent
        framework; the anthropic Python client is enough. A workload
        that needs a state machine with rollback (a regulated
        approval flow, a financial transaction graph) wants
        LangGraph. A workload that is primarily a typed API contract
        wants Pydantic AI. And a workload that mainly drives
        OpenAI-hosted server tools (Computer Use, Apps SDK,
        Connector Registry) wants the OpenAI Agents SDK. Above the
        complexity threshold of one specialist agent plus one tool
        plus one hook, the Claude Agent SDK starts paying for itself
        the first time the model picks a wrong tool and you can read
        the hook source to understand why the action was denied.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: 2026 and beyond
      </h2>
      <p className="mb-6 leading-relaxed">
        Four shifts shape the Claude Agent SDK roadmap and the
        broader Anthropic agent platform for the next year and a
        half.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Self-hosted sandboxes become the default for
        regulated workloads.</strong> The May 2026 release made it a
        configuration change, and the early adopters are the teams
        that could not run agents in shared infrastructure at all.
        We expect the rest of the agent framework market to catch
        up by 2027, with Cloudflare Workers and Modal becoming
        common runtime targets across vendors.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Dynamic Workflows redefine codebase-scale
        work.</strong> A thousand parallel subagents is the
        difference between a fleet migration that takes a week of
        bespoke scripting and a fleet migration that runs overnight
        from one prompt. The pattern is novel enough that most
        teams have not internalized it yet; the ones who have are
        already finding work that did not exist before because it
        was not tractable.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skills become the cross-vendor agent capability
        format.</strong> Anthropic introduced Skills in October
        2025 and they are now the recommended way to ship reusable
        agent capabilities. The format is markdown plus a
        directory, which is portable, version-controllable, and
        compatible with the Apps SDK ecosystem on the OpenAI side.
        We expect Skills to be a real interoperability story by
        late 2026, with the same skill running on the Claude Agent
        SDK, the OpenAI Agents SDK, and the Managed Agents surface.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The SDK and Managed Agents converge.</strong> The
        two surfaces share concepts already (Agent, tool, session,
        hook). Each Anthropic release ships them in lockstep, and
        the boundary between &ldquo;library you run&rdquo; and
        &ldquo;API you call&rdquo; keeps getting thinner. By 2027
        we expect the same Agent definition file to run unchanged
        in both surfaces, with the deployment shape becoming a
        configuration choice rather than a code rewrite.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the Anthropic side of the agent stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The interesting thing about the Claude Agent SDK is that
        most of it is not new. Typed tools, sessions for memory,
        hooks on the boundaries, subagents for isolated context,
        MCP for external integrations, filesystem-based
        configuration. None of these are Anthropic inventions; the
        OpenAI Agents SDK, Pydantic AI, and LangGraph all ship
        their own versions. What Anthropic&rsquo;s contribution is
        that the same primitives plug straight into the Claude
        Code harness, with no glue code, and the filesystem and
        shell tools that every coding or filesystem-first agent
        needs ship in the box.
      </p>
      <p className="mb-6 leading-relaxed">
        For new agent work in 2026 where Claude is already the
        default model, the argument against starting on the Claude
        Agent SDK is thin. The migration cost from a hand-rolled
        anthropic client is small; the migration cost from Claude
        Code is essentially zero, since the SDK is the harness the
        CLI uses. The remaining decisions are how much of the
        ecosystem to adopt (skills, plugins, Dynamic Workflows,
        self-hosted sandboxes) and whether to compose with another
        SDK for surfaces the Anthropic side does not own (the
        OpenAI Agents SDK for voice and the Apps ecosystem,
        Pydantic AI for the typed boundary). Both decisions can be
        made gradually. The first one only has to be made once.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/handbooks/claude/subagents"
            className="font-semibold text-primaryColor hover:underline"
          >
            Subagents &amp; slash commands, in our handbooks
          </a>
          {" "}&mdash; the same subagent concept the SDK exposes
          programmatically, explained for Claude Code&rsquo;s own
          <code>.claude/agents/</code> files.
        </li>
        <li>
          <a
            href="https://code.claude.com/docs/en/agent-sdk/overview"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Agent SDK overview (code.claude.com)
          </a>
          {" "}- the canonical reference for query,
          ClaudeSDKClient, built-in tools, hooks, subagents,
          sessions, and MCP integration.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building agents with the Claude Agent SDK
            (anthropic.com)
          </a>
          {" "}- the engineering team&rsquo;s framing for why the
          harness exists, what the primitives are for, and how to
          structure a production agent.
        </li>
        <li>
          <a
            href="https://github.com/anthropics/claude-agent-sdk-python"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            anthropics/claude-agent-sdk-python (GitHub)
          </a>
          {" "}- the Python SDK source, current at v0.2 in mid-2026,
          with examples for custom tools, hooks, and bidirectional
          conversations.
        </li>
        <li>
          <a
            href="https://github.com/anthropics/claude-agent-sdk-demos"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            anthropics/claude-agent-sdk-demos (GitHub)
          </a>
          {" "}- the official demo agents: email assistant,
          research agent, coding agents, and more.
        </li>
        <li>
          <a
            href="https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coding Is No Longer the Constraint (Spotify
            Engineering)
          </a>
          {" "}- the writeup of the Honk agent built on the Claude
          Agent SDK, the Fleet Management integration, and the
          650-PRs-per-month production deployment.
        </li>
        <li>
          <a
            href="https://www.marktechpost.com/2026/05/28/anthropic-ships-claude-opus-4-8-alongside-dynamic-workflows-and-cheaper-fast-mode-with-workflows-capped-at-1000-subagents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic ships Dynamic Workflows (MarkTechPost)
          </a>
          {" "}- the May 28, 2026 release notes for Dynamic
          Workflows, the thousand-subagent cap, and how the planning
          loop runs on top of the existing subagent primitive.
        </li>
        <li>
          <a
            href="https://thenewstack.io/anthropic-mcp-tunnels-sandboxes/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic debuts MCP tunnels and self-hosted sandboxes
            (The New Stack)
          </a>
          {" "}- the May 19, 2026 release coverage with the
          Cloudflare, Daytona, Modal, and Vercel provider list.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MCP tunnels documentation (platform.claude.com)
          </a>
          {" "}- the official tunnel architecture, gateway
          deployment, and the Managed Agents and Messages API
          integration.
        </li>
        <li>
          <a
            href="/articles/openai-agents-sdk-agentkit-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            OpenAI Agents SDK and AgentKit in production 2026
          </a>
          {" "}- the OpenAI side of the agent stack and the closest
          peer to the Claude Agent SDK.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the typed Python alternative that pairs well with
          the Claude Agent SDK for the typed-boundary half of a
          service.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026: production AI agents as state
            machines
          </a>
          {" "}- the graph-orchestration framework that composes
          above a Claude Agent SDK loop.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production AI integrations 2026
          </a>
          {" "}- the deeper read on the Model Context Protocol
          that the Claude Agent SDK consumes as a first-class
          integration.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the broader pattern of supervisors, specialists,
          and parallel subagents that Dynamic Workflows scales.
        </li>
        <li>
          <a
            href="/articles/ai-coding-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI coding agents in production 2026
          </a>
          {" "}- the broader coding-agent ecosystem the Claude
          Agent SDK and Spotify Honk sit inside.
        </li>
      </ul>
    </div>
  );
}
