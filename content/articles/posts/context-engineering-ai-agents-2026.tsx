import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 19,
  slug: "context-engineering-ai-agents-2026",
  title:
    "Context engineering for AI agents in 2026: write, select, compress, isolate, and the four ways long contexts fail",
  excerpt:
    "Why prompt engineering stopped being the rate-limiting skill, how Anthropic, LangChain, and Chroma converged on the same four-strategy framework, and the production patterns that keep agents coherent past the 50K-token mark.",
  metaDescription:
    "A practical, technical guide to context engineering for AI agents in 2026. Covers Karpathy's framing, Anthropic's compaction and just-in-time retrieval techniques, the write/select/compress/isolate framework, Chroma's Context Rot research, Drew Breunig's four failure modes, prompt caching economics, LangChain Deep Agents, filesystem-backed scratchpads, sub-agent context quarantine, and working LangGraph and Claude SDK examples.",
  image: "/images/articles/article-06.webp",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Context Engineering",
    "LangGraph",
    "Anthropic",
    "Prompt Caching",
    "Memory",
    "Production",
  ],
  publishDate: "2026-06-10",
  readingTime: "15 min read",
};

export default function ContextEngineeringAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Context engineering is the skill that ate prompt engineering. The
        term landed in late June 2025 when Andrej Karpathy gave it a name
        on X &mdash; &ldquo;the delicate art and science of filling the
        context window with just the right information for the next
        step&rdquo; &mdash; and inside three months Anthropic, LangChain,
        Chroma, and the LangChain State of Agent Engineering report had
        all converged on the same framing. Gartner declared 2026 the
        &ldquo;Year of Context.&rdquo; The 2025 Datadog State of AI
        Engineering report has 82% of IT and data leaders saying prompt
        engineering alone is no longer sufficient at scale. The shift was
        not cosmetic. A short instruction is a prompt; the system prompt
        plus tool definitions plus retrieved documents plus conversation
        history plus scratchpad plus memory plus the next user turn is a
        context. Industrial-strength agents are won and lost on how that
        context is assembled, trimmed, and replaced as the agent runs.
        This post is the framework we apply on client engagements,
        the four failure modes that catch teams out, and the production
        patterns that keep an agent coherent past the point where the
        context window stops being a free lunch.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why prompt engineering stopped scaling
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2023&ndash;2024 mental model treated the prompt as the
        deliverable. Write a clever instruction, maybe a few examples,
        ship. That model held while applications were single-turn and
        the context window held everything you cared about. It started
        breaking the moment the workload became agentic. A modern
        production agent spends a typical user turn making fifteen LLM
        calls, eight tool invocations, a memory write, and a retry or
        two; by the third turn its context contains a system prompt,
        a tool catalogue, a retrieved document set, four tool-call
        traces, two intermediate summaries, and a partial draft. None
        of that is &ldquo;the prompt&rdquo; anymore, but all of it is
        what the model sees on the next token. Karpathy&rsquo;s X post
        landed because every team building agents had hit the same
        wall and was missing the vocabulary.
      </p>
      <p className="mb-6 leading-relaxed">
        Anthropic&rsquo;s September 2025 engineering write-up{" "}
        <em>Effective context engineering for AI agents</em> made the
        progression explicit. Prompt engineering is &ldquo;methods for
        writing and organising LLM instructions for optimal outcomes.&rdquo;
        Context engineering is &ldquo;the set of strategies for curating
        and maintaining the optimal set of tokens during LLM inference,
        including all the information that lands there outside of the
        prompt itself.&rdquo; The unit of work moved from a string to a
        state machine. The skill moved from word choice to systems
        design.
      </p>
      <p className="mb-6 leading-relaxed">
        The data backs the rename. LangChain&rsquo;s 2026 State of Agent
        Engineering survey of 1,300+ professionals has 57% of
        organisations running agents in production with another 30%
        building toward it; large enterprises (10,000+ employees) cited
        &ldquo;context engineering and managing context at scale&rdquo;
        as the top challenge. Gartner&rsquo;s Q1 2026 survey has 80% of
        enterprises with at least one production application embedding
        an agent. Quality, not capability, is the bottleneck &mdash; and
        quality at agent scale is a context problem.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Context rot: the empirical floor under everything
      </h2>
      <p className="mb-6 leading-relaxed">
        Chroma Research published <em>Context Rot</em> in July 2025
        and the field has been re-engineering around it ever since.
        The team ran 18 frontier models &mdash; GPT-4.1, Claude 4,
        Gemini 2.5, Qwen3, and the rest of the leaderboard &mdash;
        across controlled experiments at eight input lengths, on
        tasks as simple as needle-in-a-haystack retrieval and
        token-level replication. Performance degraded at every step,
        not just near the window limit. A 1M-token model still rots
        at 50K. On the LongMemEval benchmark, every model scored
        higher when given only the relevant excerpts of a chat
        history than when given the full history &mdash; even though
        the full history strictly contained the relevant excerpts.
        Bigger windows do not solve the problem; they just hide it
        for longer.
      </p>
      <p className="mb-6 leading-relaxed">
        Two implications carry. The first is that a long context is a
        scarce, depleting resource even when the model claims it
        isn&rsquo;t. The second is that &ldquo;just stuff everything
        in&rdquo; is now a measurable anti-pattern, not a stylistic
        preference. Anthropic&rsquo;s framing &mdash; treat the
        context window as an attention budget and spend it on the
        minimum set of high-signal tokens for the next decision
        &mdash; is the consensus that emerged from the Context Rot
        results.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four failure modes that catch agents out
      </h2>
      <p className="mb-4 leading-relaxed">
        Drew Breunig&rsquo;s June 2025 essay <em>How Long Contexts
        Fail</em> catalogued the failure modes the field now organises
        around. Every 2026 vendor write-up cites the same four; the
        names are stable.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Context poisoning.</strong> A hallucination or an
          incorrect tool output enters the context and the agent
          treats it as ground truth on every subsequent turn. The
          poison compounds because agents reuse and build on their
          own working set. Once a wrong customer ID lands in a
          scratchpad, every downstream action references it. The
          fix is structural: validate state-changing facts at the
          point of write, not the point of read, and version
          scratchpads so a single bad turn can be rolled back.
        </li>
        <li>
          <strong>Context distraction.</strong> History accumulates
          past the point where the model can hold the original
          instructions. Tool traces, intermediate summaries, and
          earlier turns crowd out the system prompt; the agent
          starts repeating its own past behaviour instead of
          reasoning from first principles. Anthropic measured the
          inflection on Claude Sonnet 4 at around 200K tokens; on
          smaller open-weight models it shows up by 32K. Compaction
          is the first remediation lever for this one.
        </li>
        <li>
          <strong>Context confusion.</strong> Superfluous tools,
          docs, or examples sit in the context and the model uses
          them. Forty unused tool definitions in the system prompt
          do not silently sit out of the way &mdash; they raise
          the probability of a wrong tool call on every turn. The
          fix is just-in-time tool loading: expose only the tools
          the current step needs, and a tool to discover the rest.
        </li>
        <li>
          <strong>Context clash.</strong> New context contradicts
          old context. The user said one thing on turn two, the
          retrieved document says another on turn five, the
          scratchpad encodes an earlier decision that the latest
          tool result invalidates. The agent stalls or picks one
          source for reasons that do not survive a code review.
          The fix is sub-agent isolation &mdash; quarantining the
          contradictory contexts in separate windows and
          synthesising at a higher level &mdash; and explicit
          conflict-resolution policies in the system prompt.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Useful framing: context poisoning and distraction are
        problems of <em>what stays</em>, confusion is a problem of
        <em> what enters</em>, and clash is a problem of{" "}
        <em>what coexists</em>. The four-strategy framework that
        follows maps onto exactly those three failure axes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four-strategy framework: write, select, compress, isolate
      </h2>
      <p className="mb-6 leading-relaxed">
        LangChain&rsquo;s 2025 essay <em>Context Engineering for
        Agents</em> crystallised the framework that every major
        framework now ships some variant of. Four strategies, each
        addressing a different lever on the context window. Real
        production agents use all four; the question on a given
        build is which one is currently the bottleneck.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Write.</strong> Save context outside the window
          so it persists without consuming tokens. Scratchpads,
          filesystem-backed working memory, long-term memory
          stores. The model writes notes during a task and reads
          them back when needed. This is the primitive that
          unlocks tasks longer than a single context window.
        </li>
        <li>
          <strong>Select.</strong> Pull in only the context the
          current step needs. RAG over a document corpus, but
          also tool selection (only expose the tools that
          matter), memory selection (only retrieve the relevant
          notes), and example selection (few-shot examples
          chosen per query, not statically baked into the prompt).
          The contrast is pre-loading versus just-in-time.
        </li>
        <li>
          <strong>Compress.</strong> Reduce the token count of
          context that has to stay in the window. Conversation
          summarisation, tool-output truncation, hierarchical
          summaries of long documents. Anthropic&rsquo;s
          compaction technique &mdash; summarise then restart in
          a fresh window &mdash; is the canonical implementation.
        </li>
        <li>
          <strong>Isolate.</strong> Split context across multiple
          windows that talk to each other through narrow
          interfaces. Sub-agents with their own clean contexts,
          context quarantine for noisy tool outputs, separate
          memory namespaces per concern. The multi-agent pattern
          we covered in our{" "}
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            2026 orchestration piece
          </a>{" "}
          is the most visible expression of this strategy.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        A useful default on a new agent is to start with select
        and compress &mdash; they are cheap, framework-agnostic,
        and address context confusion and distraction directly
        &mdash; then add write and isolate as the task grows past
        what a single window can hold.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What actually fills the context window
      </h2>
      <p className="mb-4 leading-relaxed">
        Before the strategies, an audit. On any agent that has
        been in production more than a week, the context window
        on a representative turn contains seven distinct sources.
        Knowing which is the biggest is half the optimisation
        work.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>System prompt.</strong> Role, capabilities,
          policies, output format. Stable across turns and a
          prime candidate for prompt caching.
        </li>
        <li>
          <strong>Tool definitions.</strong> JSON schemas for
          every callable function. Often the single biggest
          static block; a forty-tool agent can spend 8&ndash;15K
          tokens on definitions alone.
        </li>
        <li>
          <strong>Retrieved knowledge.</strong> RAG results,
          documents, search snippets. Dynamic per turn.
        </li>
        <li>
          <strong>Conversation history.</strong> Prior user
          turns, assistant responses, tool calls and outputs.
          Grows monotonically without intervention.
        </li>
        <li>
          <strong>Scratchpad / working memory.</strong> In-task
          notes the agent writes for itself.
        </li>
        <li>
          <strong>Long-term memory.</strong> Cross-session facts
          about the user, preferences, prior outcomes.
        </li>
        <li>
          <strong>Current user input.</strong> The new question
          or instruction.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The order matters because prompt caching makes the prefix
        cheap. Static blocks &mdash; system prompt, tools, retrieved
        context known not to change &mdash; should sit at the
        front, then the dynamic suffix. Anthropic&rsquo;s prompt
        caching prices a cache write at 1.25x the base input
        rate and a cache read at 0.1x; a long-running agent with
        a stable 15K-token prefix and a turning suffix can drop
        90% of its input-token bill by reordering one structure.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Compaction in practice
      </h2>
      <p className="mb-6 leading-relaxed">
        Compaction is the lever Anthropic puts first in its
        engineering guide and the one the Claude Code product
        ships as a user-visible feature. The shape is invariant:
        a watcher notices the context is approaching a
        threshold; a summariser writes a high-fidelity digest of
        what has happened and what is still pending; a fresh
        context starts from the summary plus whatever immutable
        state (the open file set, the original objective) the
        agent needs to continue. The hard part is choosing what
        to keep verbatim and what to summarise. Anthropic&rsquo;s
        finding from production is that recent tool outputs,
        the active code window, and the user&rsquo;s last few
        explicit instructions survive verbatim; everything else
        gets summarised.
      </p>
      <CodeBlock
        language="bash"
        filename="compaction.py"
        code={`# pip install anthropic
from anthropic import Anthropic
from anthropic.types import MessageParam

COMPACT_THRESHOLD = 0.75  # of model context window
COMPACTION_PROMPT = """You are summarising a long agent run for
a successor context window. Preserve:
- the original objective verbatim,
- decisions made and their justifications,
- pending sub-tasks,
- the last 3 tool calls and their results verbatim.
Summarise everything else into a numbered list of facts.
Output JSON: {objective, decisions, pending, recent_turns, facts}."""

def should_compact(messages: list[MessageParam], window: int) -> bool:
    used = sum(len(str(m["content"])) for m in messages) // 4  # rough
    return used / window > COMPACT_THRESHOLD

def compact(client: Anthropic, messages: list[MessageParam]) -> list[MessageParam]:
    head = messages[0]                     # original user objective
    tail = messages[-6:]                   # last few turns kept verbatim
    middle = messages[1:-6]
    digest = client.messages.create(
        model="claude-haiku-4-5-20251001", # cheap, fast summariser
        max_tokens=2000,
        system=COMPACTION_PROMPT,
        messages=middle,
    ).content[0].text
    return [head, {"role": "user", "content": f"<digest>{digest}</digest>"}, *tail]

def agent_loop(client: Anthropic, model: str, window: int,
               messages: list[MessageParam], tools: list):
    while True:
        if should_compact(messages, window):
            messages = compact(client, messages)
        resp = client.messages.create(
            model=model, max_tokens=4096, tools=tools, messages=messages,
        )
        # ... handle tool calls, append to messages, loop until stop_reason="end_turn"
        if resp.stop_reason == "end_turn":
            return resp`}
      />
      <p className="mb-6 leading-relaxed">
        Three details earn their keep. The summariser is a
        smaller, cheaper model than the agent &mdash; Haiku for a
        Sonnet agent, Sonnet for an Opus agent &mdash; because
        summarisation does not need the agent&rsquo;s reasoning
        depth. The digest is wrapped in an explicit tag so the
        agent can tell what is verbatim and what is summarised.
        And the last few turns survive verbatim so the agent does
        not lose mid-flight tool calls; compaction that ate the
        last action is worse than no compaction at all.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Just-in-time retrieval and tool selection
      </h2>
      <p className="mb-6 leading-relaxed">
        The select strategy splits two ways: select knowledge,
        and select tools. Knowledge is the RAG problem covered in{" "}
        <a
          href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
          className="font-semibold text-primaryColor hover:underline"
        >
          our RAG piece
        </a>{" "}
        &mdash; embed the corpus, retrieve per query, the
        well-understood half. Tool selection is the half that
        catches teams. The instinct is to register every callable
        function the agent might ever need and let the model
        choose; the data says this is exactly the regime
        Context Rot punishes hardest. Anthropic&rsquo;s
        published results show a Claude agent with 40 tools
        consistently outperformed when the prompt contained only
        the 5 tools relevant to the current task &mdash; even
        though the model could, in principle, pick the right one
        from 40.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern that landed is a meta-tool that the agent
        always has: <code>search_tools(query)</code>. The system
        prompt advertises the meta-tool plus the half dozen
        always-on tools. When the agent realises it needs a
        capability it does not currently have, it queries; the
        runtime returns matching tool definitions, the agent
        calls them, the runtime removes them from the context on
        the next compaction. Tools become a retrieved resource,
        not a static block.
      </p>
      <CodeBlock
        language="bash"
        filename="just_in_time_tools.py"
        code={`# pip install langgraph langchain-anthropic
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic
from langchain_core.tools import tool, BaseTool

ALL_TOOLS: dict[str, BaseTool] = load_registry()  # ~40 tools

@tool
def search_tools(query: str) -> str:
    """Find tools matching a capability you need but don't currently have."""
    # vector search across tool docstrings; return top-k
    matches = tool_index.search(query, k=5)
    return "\\n".join(f"- {t.name}: {t.description}" for t in matches)

class State(TypedDict):
    messages: Annotated[list, add_messages]
    loaded_tools: list[str]

ALWAYS_ON = ["read_file", "write_file", "list_directory", search_tools]

def agent(state: State):
    active = ALWAYS_ON + [ALL_TOOLS[n] for n in state["loaded_tools"]]
    model = ChatAnthropic(model="claude-sonnet-4-6").bind_tools(active)
    resp = model.invoke(state["messages"])
    # If the model called search_tools, load the matched names into state
    # so the next turn sees the new tools.
    return {"messages": [resp], "loaded_tools": extract_loaded(resp)}`}
      />
      <p className="mb-6 leading-relaxed">
        A second select win that is easy to miss: example
        selection. Few-shot examples baked into the system
        prompt sit in the context every turn whether or not
        they are relevant. Indexing the example set and
        retrieving the three most semantically similar
        examples per query gives a measurable accuracy lift on
        classification-shaped tasks and frees up token budget
        on every other turn.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Filesystem-backed scratchpads: the Deep Agents pattern
      </h2>
      <p className="mb-6 leading-relaxed">
        LangChain shipped Deep Agents in July 2025 and rewrote the
        playbook again in March 2026. The contribution that
        matters for context engineering is the filesystem-backed
        scratchpad as a first-class primitive. The agent has{" "}
        <code>read_file</code>, <code>write_file</code>,{" "}
        <code>ls</code>, <code>grep</code>, and{" "}
        <code>edit_file</code> against a virtual filesystem
        (sandboxed per session, persistent across turns within
        the session). Working memory lives there. The context
        window holds the objective, the plan, and pointers; the
        filesystem holds the artefacts.
      </p>
      <p className="mb-6 leading-relaxed">
        The unlock is that the agent can hold an arbitrarily
        large working set without paying for it in tokens until
        it needs to look at a specific piece. A research agent
        crawls a hundred URLs, writes each to a numbered note
        file, and only pulls the three relevant notes into the
        synthesis turn. A code-migration agent walks a 2,000-file
        repo, writes per-file change plans, and consults them in
        small batches. The same pattern Anthropic uses inside
        Claude Code, and the reason coding agents that were
        useless on large repos in 2024 are competent on them in
        2026.
      </p>
      <CodeBlock
        language="bash"
        filename="scratchpad_agent.py"
        code={`# pip install deepagents
from deepagents import create_deep_agent
from langchain_anthropic import ChatAnthropic

SYSTEM = """You research a topic across many sources.
For each source you read, write a note file:
  notes/<short-slug>.md  with title, url, key claims, citations.
Maintain notes/_index.md listing every note with a one-line summary.
When ready to synthesise, read _index, pick the most relevant notes,
and write the final report to report.md."""

agent = create_deep_agent(
    model=ChatAnthropic(model="claude-sonnet-4-6"),
    system_prompt=SYSTEM,
    tools=[web_search, web_fetch],   # plus the built-in filesystem tools
)

result = agent.invoke({
    "messages": [("user", "Research context engineering for AI agents in 2026.")]
})`}
      />
      <p className="mb-6 leading-relaxed">
        Two design choices keep this pattern honest. The plan
        and the index live as actual files the agent reads, not
        as a hidden bit of state &mdash; so when something goes
        wrong, the trace shows you the file contents the agent
        was reasoning over. And the filesystem is namespaced per
        session by default; cross-session memory is a separate
        primitive with explicit retrieval, so a stale note from
        last week cannot poison this week&rsquo;s run.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sub-agent isolation: context quarantine
      </h2>
      <p className="mb-6 leading-relaxed">
        Isolate is the strategy that touches multi-agent.
        Anthropic&rsquo;s Research feature is the canonical
        example: the lead agent (Claude Opus 4) develops a
        strategy and spawns subagents (Claude Sonnet 4) to
        explore different facets in parallel; each subagent
        runs in its own clean context window with its own tool
        calls and returns a compressed summary; the lead never
        sees the subagent&rsquo;s raw transcript. The 90.2% win
        over single-agent on Anthropic&rsquo;s internal
        evaluation tracked, on the team&rsquo;s own analysis,
        token usage and parallelism &mdash; but the precondition
        was clean context isolation. A subagent that shared a
        context with its peers would not have produced the
        same gain.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern Drew Breunig calls &ldquo;context
        quarantine&rdquo; is the same idea applied
        defensively rather than for throughput. A tool that
        returns noisy output &mdash; an HTML scrape, a 50K-line
        log file, a raw database dump &mdash; runs inside a
        sub-agent whose job is to extract the answer and return
        it. The lead never sees the raw bytes. Context confusion
        from noisy tool returns, the category that catches
        coding agents on the second day in production, drops
        sharply once tool output isolation is wired in.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Prompt caching: the economic foundation
      </h2>
      <p className="mb-6 leading-relaxed">
        Context engineering and prompt caching reinforce each
        other. The four strategies all want a stable, slowly
        changing prefix at the front of the context (system
        prompt, tool definitions, immutable retrieved context)
        and a churning tail (history, current input). That shape
        is exactly what prompt caching is priced for. Anthropic
        charges 1.25x the base input rate on a cache write and
        0.1x on a cache read with a five-minute default TTL; a
        one-hour TTL is available at higher write cost. The
        production guidance &mdash; documented in Anthropic&rsquo;s
        prompt caching docs and now mirrored by Bedrock and
        Vertex &mdash; is to put cache breakpoints after the
        system prompt and after the tool block, then a third
        after stable retrieved context if there is any.
      </p>
      <CodeBlock
        language="bash"
        filename="cached_prefix.py"
        code={`# pip install anthropic
from anthropic import Anthropic
client = Anthropic()

resp = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system=[
        {
            "type": "text",
            "text": LONG_STABLE_SYSTEM_PROMPT,        # ~6K tokens
            "cache_control": {"type": "ephemeral"},   # breakpoint 1
        }
    ],
    tools=[
        *TOOL_DEFINITIONS,                            # ~8K tokens
        # Put cache_control on the LAST tool to mark end of cache prefix.
        {**TOOL_DEFINITIONS[-1], "cache_control": {"type": "ephemeral"}},
    ],
    messages=[
        {"role": "user", "content": [
            {"type": "text", "text": RETRIEVED_DOCS,  # ~5K tokens stable
             "cache_control": {"type": "ephemeral"}}, # breakpoint 3
            {"type": "text", "text": user_turn},      # dynamic tail
        ]},
    ],
)
# usage.cache_creation_input_tokens vs usage.cache_read_input_tokens
# tells you whether the breakpoints hit.`}
      />
      <p className="mb-6 leading-relaxed">
        Field reports from the community &mdash; collected in
        the comment thread under Anthropic&rsquo;s prompt caching
        announcement and in independent posts &mdash; routinely
        cite 80&ndash;90% reductions in input-token spend and
        material latency improvements once caching is wired
        correctly. The win is large enough that on a
        long-running agent it is usually the single biggest
        cost lever available, ahead of model choice. The full
        cost playbook lives in our{" "}
        <a
          href="/articles/cutting-openai-costs-production"
          className="font-semibold text-primaryColor hover:underline"
        >
          cutting LLM costs piece
        </a>
        ; the context-engineering point here is that caching is
        free latency and free spend once the context is laid
        out for it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Memory as long-horizon context
      </h2>
      <p className="mb-6 leading-relaxed">
        Compaction and scratchpads cover within-session context.
        Memory covers across-session context &mdash; the user
        preferences, prior outcomes, and learned facts that an
        agent should bring to a new session without being told
        again. The plumbing question is exactly the same: what
        enters the window on a given turn, and how is it
        selected. The frameworks we covered in our{" "}
        <a
          href="/articles/ai-agent-memory-systems-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          memory systems piece
        </a>{" "}
        &mdash; Mem0, Zep, Letta, LangMem &mdash; are each a
        select-and-write implementation under the
        context-engineering frame. Memory writes happen out of
        band; memory reads are select operations governed by the
        same just-in-time discipline as RAG.
      </p>
      <p className="mb-6 leading-relaxed">
        The mistake to avoid is loading memory eagerly. A
        long-running personal assistant with three years of
        notes will overrun any context window if every turn
        pulls in everything potentially relevant. The pattern
        that works is the same as for tools: the agent has a{" "}
        <code>recall(query)</code> tool, decides when it needs
        a memory, retrieves narrowly, and lets the memory drop
        out of the context on the next compaction.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-4 leading-relaxed">
        Four production shapes drive most of the context
        engineering work we have shipped or audited since the
        framework consolidated in late 2025.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Coding agents on real repos.</strong> The
          combination that survives: filesystem-backed
          scratchpad for the working set, just-in-time tool
          selection over a large tool catalogue, sub-agent
          quarantine for noisy outputs (test logs, compiler
          errors), and aggressive compaction triggered by file
          count. Claude Code and competitors converged on the
          same pattern; the public Claude Code documentation is
          a good blueprint.
        </li>
        <li>
          <strong>Multi-source research and competitive
          intelligence.</strong> The Anthropic Research
          architecture in front of an enterprise document
          store. Lead agent plans, subagents explore in
          isolated contexts, each writes a note file, a
          synthesiser composes the final report by reading the
          index and the top-N notes. Context quarantine is the
          load-bearing piece &mdash; the lead never sees the
          raw HTML.
        </li>
        <li>
          <strong>Customer support agents with long history.</strong>{" "}
          The user has been a customer for three years and has
          opened forty tickets. The full transcript blows the
          context window and degrades the model on the way.
          The pattern is compaction over per-ticket summaries
          plus selective recall of the most relevant prior
          tickets via memory retrieval. Prompt caching on the
          stable policy prefix is the cost lever that makes
          this economic on per-message-priced models.
        </li>
        <li>
          <strong>Long-running automation and DevOps
          agents.</strong> Agents that run for hours diagnosing
          incidents, executing rollouts, or processing
          backfills. Compaction across context windows is the
          only way the agent finishes the task; structured
          scratchpads keep the audit trail durable; sub-agent
          isolation contains the blast radius of any single
          noisy tool call. The pattern is documented as
          Anthropic&rsquo;s &ldquo;effective harnesses for
          long-running agents.&rdquo;
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limitations, and the cost ledger
      </h2>
      <p className="mb-4 leading-relaxed">
        What you get for the engineering investment, and what
        you pay for it.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Strengths.</strong> Quality holds past the
          context length where naive agents start degrading.
          Token spend drops, often by 80%+, once caching and
          compaction are wired. The agent can run tasks longer
          than any single context window allows. Failures
          become attributable to a named failure mode rather
          than &ldquo;the model is unreliable.&rdquo;
        </li>
        <li>
          <strong>Costs.</strong> Engineering complexity goes
          up. Compaction, scratchpads, dynamic tool loading,
          and cache-aware layout are each non-trivial to
          implement correctly; getting one wrong (a compactor
          that eats the last tool call, a scratchpad that
          forgets to flush, a cache breakpoint after a dynamic
          field) creates failure modes worse than the ones it
          replaced. Observability requirements grow with it;
          you cannot debug a context engineering bug without
          full trace replay, the subject of our{" "}
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            evaluation and observability piece
          </a>
          .
        </li>
        <li>
          <strong>Where it does not fit.</strong> Single-turn
          classification, short Q&amp;A bots, and any agent
          whose entire useful context fits comfortably in a
          single window do not earn the complexity. The
          heuristic on engagements: if no production turn ever
          exceeds 30% of the context window, ship a plain
          prompt and skip the framework.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends shaping the next twelve months
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Context engineering as a job title.</strong>{" "}
          LangChain&rsquo;s 2026 State of Agent Engineering
          report calls it out by name; large enterprises are
          posting roles. The discipline is institutionalising
          the way SRE did a decade ago.
        </li>
        <li>
          <strong>Framework primitives, not framework
          features.</strong> Deep Agents, the OpenAI Agents SDK
          handoff filters, LangGraph&rsquo;s Command
          primitive, and the Microsoft Agent Framework all
          ship explicit context-engineering hooks (filesystem,
          input filters, summarisers, cache breakpoints) as
          first-class API surface. The 2024 frameworks had
          these as workarounds; the 2026 ones treat them as
          the product.
        </li>
        <li>
          <strong>Smaller, faster summarisers.</strong> Haiku
          4.5, GPT-5 mini, and Gemini Flash 2.0 are now the
          default compactors for Sonnet/GPT-5/Gemini Pro
          agents. Asymmetric staffing across the context layer
          is now standard practice.
        </li>
        <li>
          <strong>Standardised context schemas.</strong> The
          OpenTelemetry GenAI conventions added context-event
          spans during 2025&ndash;2026, giving observability
          platforms a portable wire format for what entered
          and left the window on each turn. LangSmith,
          Langfuse, and Phoenix all expose these views in
          2026.
        </li>
        <li>
          <strong>Just-in-time over precomputation.</strong>{" "}
          The consensus that emerged from Anthropic, LangChain,
          and the Chroma research is that pre-loading
          knowledge into long contexts loses to retrieval at
          inference, on quality and on cost. RAG, dynamic
          tool selection, and selective memory recall are all
          the same pattern.
        </li>
        <li>
          <strong>Context as the unit of evaluation.</strong>{" "}
          Trace-replay-based evals that re-run an agent
          against a captured context, then diff outcomes,
          are now standard. The eval question moved from
          &ldquo;did the model answer right&rdquo; to
          &ldquo;given this context, did the model do the
          right thing.&rdquo;
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the context is the program
      </h2>
      <p className="mb-6 leading-relaxed">
        A useful way to hold the shift in one sentence: in 2024
        you wrote prompts, in 2026 you write programs whose
        output is the next context. The model is the
        interpreter; the context is the program. Every
        strategy in this post &mdash; compaction,
        scratchpads, just-in-time tools, sub-agent isolation,
        cache-aware layout &mdash; is a way of writing that
        program more legibly, more cheaply, and more
        reliably. The four failure modes are what happens when
        the program is sloppy.
      </p>
      <p className="mb-6 leading-relaxed">
        Our default on a new agent build is to instrument the
        context first &mdash; what enters the window on each
        turn, how big each block is, what the cache hit rate
        is, where the first sign of context rot shows up on
        the eval suite &mdash; then to apply the strategies in
        order of measured pain. The mistake we see most often
        is reaching for multi-agent isolation before
        instrumenting; isolation pays off, but only after
        compaction and selection have done their cheaper
        work. Start with what the model sees on the next
        token, and the rest of the architecture tends to fall
        out of the answer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Effective context engineering for AI agents (Anthropic
            Engineering)
          </a>
          {" "}&mdash; the canonical write-up. Compaction,
          structured note-taking, sub-agent isolation, and the
          framing of context as an attention budget.
        </li>
        <li>
          <a
            href="https://x.com/karpathy/status/1937902205765607626"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrej Karpathy on context engineering (X)
          </a>
          {" "}&mdash; the post that gave the discipline its
          name and the case for retiring &ldquo;prompt
          engineering&rdquo; as the umbrella term.
        </li>
        <li>
          <a
            href="https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Long Contexts Fail (Drew Breunig)
          </a>
          {" "}&mdash; the failure-mode taxonomy
          (poisoning, distraction, confusion, clash) that
          every 2026 vendor write-up cites.
        </li>
        <li>
          <a
            href="https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            How to Fix Your Context (Drew Breunig)
          </a>
          {" "}&mdash; the companion post: RAG, tool
          loadout, context quarantine, summarisation,
          trimming, and offloading.
        </li>
        <li>
          <a
            href="https://research.trychroma.com/context-rot"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Context Rot: How Increasing Input Tokens Impacts
            LLM Performance (Chroma Research)
          </a>
          {" "}&mdash; the 18-model benchmark establishing
          that performance degrades with context length on
          every frontier model.
        </li>
        <li>
          <a
            href="https://blog.langchain.com/context-engineering-for-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Context Engineering for Agents (LangChain)
          </a>
          {" "}&mdash; the four-strategy framework: write,
          select, compress, isolate.
        </li>
        <li>
          <a
            href="https://docs.langchain.com/oss/python/deepagents/context-engineering"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Context engineering in Deep Agents (LangChain docs)
          </a>
          {" "}&mdash; the filesystem-backed scratchpad and
          input/runtime/compression/isolation/long-term-memory
          layering.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prompt caching (Claude API docs)
          </a>
          {" "}&mdash; the breakpoint mechanics, pricing, and
          ordering guidance that pairs with context
          engineering for cost.
        </li>
        <li>
          <a
            href="https://simonwillison.net/2025/Jun/27/context-engineering/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Context engineering (Simon Willison)
          </a>
          {" "}&mdash; the running commentary on the term, with
          links across the field as it consolidated.
        </li>
        <li>
          <a
            href="https://www.langchain.com/state-of-agent-engineering"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            State of Agent Engineering 2026 (LangChain)
          </a>
          {" "}&mdash; the survey numbers behind the
          &ldquo;context engineering as the bottleneck&rdquo;
          claim.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}&mdash; the isolate strategy in its most
          visible form, with the supervisor and swarm
          patterns spelled out.
        </li>
        <li>
          <a
            href="/articles/ai-agent-memory-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent memory in 2026
          </a>
          {" "}&mdash; the long-horizon select/write
          strategies for cross-session context.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}&mdash; the trace-replay tooling that makes
          context engineering debuggable.
        </li>
      </ul>
    </div>
  );
}
