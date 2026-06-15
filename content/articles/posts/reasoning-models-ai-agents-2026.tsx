import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 24,
  slug: "reasoning-models-ai-agents-2026",
  title:
    "Reasoning models in production AI agents 2026: thinking budgets, interleaved tool use, and the new agent loop",
  excerpt:
    "Why reasoning models reshaped the agent stack in 2026, how OpenAI o3 and o4-mini, Claude adaptive thinking, Gemini Deep Think, and DeepSeek R1 differ when you ship them, and the production patterns that decide whether deep thinking pays off or just burns tokens.",
  metaDescription:
    "A practical, technical guide to reasoning models in production AI agents for 2026. Covers OpenAI o3 and o4-mini with reasoning_effort, Claude Opus 4.7 adaptive thinking and task budgets, Gemini 3 Deep Think with thought signatures, DeepSeek R1 and Qwen QwQ open weights, interleaved thinking with tools, the Responses API encrypted_content pattern, hierarchical model routing, cost math, and real production deployments across coding agents, deep research agents, and enterprise workflows.",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Reasoning Models",
    "OpenAI o3",
    "Claude",
    "Gemini Deep Think",
    "DeepSeek",
    "Production",
  ],
  publishDate: "2026-06-15",
  readingTime: "15 min read",
};

export default function ReasoningModelsAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        The agents that shipped in 2024 ran on fast chat models and
        long tool loops. Twenty turns of GPT-4o, a vector store, and
        a planner prompt. The agents shipping in 2026 lean on a
        different shape of model: one that thinks for ten or twenty
        thousand tokens before it answers, calls a tool, thinks again
        about the result, and only then writes the user a single
        line. OpenAI o3 and o4-mini, Claude Opus 4.7 with adaptive
        thinking, Gemini 3 Deep Think, and the open-weights pair of
        DeepSeek R1 and Qwen QwQ all sit on the same idea: spend
        more compute at inference time, get a sharper answer, and
        keep the orchestration code small. The agent loop did not
        disappear. It just moved most of its work inside the model.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why reasoning models changed the agent picture
      </h2>
      <p className="mb-6 leading-relaxed">
        The pre-reasoning agent pattern was a workaround for a
        weakness in the underlying model. A chat model could not
        plan a five-step task on its own, so the framework wrote
        the plan: a planner node, an executor node, a critic, a
        retry loop, a verifier, a self-consistency pass. The
        scaffold was the intelligence. The model was a fast,
        cheap function that filled in the gaps. Every quality bump
        meant another node in the graph.
      </p>
      <p className="mb-6 leading-relaxed">
        Reasoning models cut the scaffold down. OpenAI o3-mini
        moved from low to high reasoning effort and gained
        10 to 30 percent on AIME 2024, GPQA Diamond, and
        Codeforces with no orchestration change. Claude 4 models
        with extended thinking solved tasks in a single call that
        used to take a multi-node LangGraph workflow. Gemini 3
        Deep Think runs parallel reasoning paths under the hood
        and returns one consolidated answer. The model is doing
        the planner, executor, and critic work internally, and
        the agent code is now thinner, easier to test, and easier
        to migrate between providers.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-off is real and worth naming up front.
        Reasoning costs more per call. A standard chat completion
        on a benchmark task generates around 400 output tokens.
        DeepSeek R1 on the same task generates up to 40,000
        thinking tokens before the answer, a 100x gap in token
        count and a similar gap in latency. Agentic systems that
        adopt reasoning end up spending 5 to 30 times more
        tokens per task than the chatbot version. The win is
        that the task often finishes in one call instead of
        fifteen, and the per-call quality is high enough that the
        retry loop disappears. Whether reasoning is cheaper or
        more expensive end-to-end is a per-workload question, not
        a generic one.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four reasoning model families in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The market has settled into four shapes, each with a
        different API surface and a different fit. Treat them
        like product categories, not interchangeable models.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>OpenAI o-series (o3, o4-mini).</strong> A
          dedicated reasoning family with a{" "}
          <code>reasoning_effort</code> dial: low, medium, or
          high. Trained to use tools through reinforcement
          learning, which means the model decides when to search,
          run Python, or call a function. Default to o4-mini at
          medium effort for most production work, reach for o3
          on the hardest math, code, and science tasks. Context
          window is 200K tokens, output up to 100K.
        </li>
        <li>
          <strong>Claude with adaptive thinking (Opus 4.7,
          Sonnet 4.6).</strong> Anthropic merged extended
          thinking and the chat model into one. Opus 4.7
          removed the old{" "}
          <code>thinking.budget_tokens</code> parameter and
          replaced it with adaptive thinking plus a higher-level
          <code> task_budget</code> for full agent loops.
          Sonnet 4.6 still supports the manual{" "}
          <code>budget_tokens</code> path. Both ship with
          interleaved thinking, which lets the model reason
          between tool calls, not just before the first response.
        </li>
        <li>
          <strong>Gemini 3 Deep Think.</strong> Google added a{" "}
          <code>thinking_level</code> parameter (low, medium,
          high) and Deep Think mode for parallel reasoning
          across hypotheses. Gemini 3 enforces strict
          continuation through{" "}
          <code>thought_signature</code> fields that must be
          returned on every follow-up tool call, or the API
          rejects the request with a 400 error. Deep Research
          Max, the agent product, runs dozens of search
          iterations against the wider web and returns a cited
          report.
        </li>
        <li>
          <strong>Open weights: DeepSeek R1, Qwen QwQ.</strong>
          The open-source reasoning track. DeepSeek R1 ships
          with an MIT-style license that allows commercial use,
          can be self-hosted on vLLM or SGLang, and reaches
          frontier scores on AIME and Codeforces at a fraction
          of the API price. Trade-off is operational: the long
          thinking output puts heavy pressure on KV cache and
          inference cost scales with the depth of the reasoning
          you allow.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What changes inside the agent loop
      </h2>
      <p className="mb-6 leading-relaxed">
        A 2024 agent loop looked the same regardless of the
        model: prompt, call, parse tool, call tool, append
        result, loop. A 2026 reasoning-model loop has three
        moving parts the older loop did not.
      </p>
      <p className="mb-6 leading-relaxed">
        First, a <strong>thinking budget</strong>. Every
        reasoning model accepts some form of budget: a numeric
        cap (Claude Sonnet 4.6 budget_tokens, Gemini
        thinking_budget), a categorical effort level (o3
        reasoning_effort, Gemini thinking_level), or a
        task-wide envelope (Claude Opus 4.7 task_budget). The
        budget controls how aggressively the model spends
        tokens on internal deliberation before it acts. The
        operating skill of 2026 is matching the budget to the
        task, not picking the biggest one for safety.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>state that survives the tool call</strong>.
        Reasoning models build internal scratchpads that are
        worth more than the visible answer. OpenAI exposes
        these as <code>reasoning_summary</code> items and, for
        zero-data-retention customers, an{" "}
        <code>encrypted_content</code> blob. Gemini exposes
        them as{" "}
        <code>thought_signature</code> blobs attached to each
        function call. Anthropic exposes a thinking block list.
        In every case, dropping these fields between turns
        breaks the model in subtle ways: it forgets which
        hypothesis it was working on, repeats tool calls, or in
        Gemini 3's case, refuses the request outright. The agent
        loop now has to round-trip provider-specific opaque
        blobs, and the persistence layer has to treat them as
        first-class fields.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>interleaved thinking around each tool
        call</strong>. The 2024 pattern was: think once, plan
        the tools, execute, summarize. The 2026 pattern is:
        think, call one tool, think about the result, call the
        next tool, think again, finish. Anthropic ships this
        behind the <code>interleaved-thinking-2025-05-14</code>{" "}
        beta header. OpenAI's Responses API runs the same
        pattern on the provider side, where the agentic loop
        executes tool calls autonomously between reasoning
        steps. Gemini does it through Deep Research and the
        Agents API. The agent code stops being a state machine
        and starts looking like a thin proxy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A minimal o4-mini agent call
      </h2>
      <p className="mb-6 leading-relaxed">
        The cleanest way to see the shape is to look at the
        wire. The snippet below is a single Responses API call
        to o4-mini with a tool definition and medium reasoning
        effort. The provider runs the loop: model thinks, picks
        a tool, runs the tool, thinks again, and returns the
        final answer.
      </p>
      <CodeBlock
        language="python"
        filename="o4_mini_agent.py"
        code={`from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "name": "get_invoice",
        "description": "Fetch an invoice by supplier id.",
        "parameters": {
            "type": "object",
            "properties": {
                "supplier_id": {"type": "string"},
            },
            "required": ["supplier_id"],
        },
    },
]

response = client.responses.create(
    model="o4-mini",
    reasoning={"effort": "medium"},
    tools=tools,
    input=[
        {
            "role": "user",
            "content": "What was the latest invoice for ACME-001?",
        },
    ],
    max_completion_tokens=8000,
)

# Round-trip reasoning items if you call the API again
# in the same agent thread.
encrypted_blobs = [
    item for item in response.output
    if item.type == "reasoning"
]
`}
      />
      <p className="mb-6 leading-relaxed">
        Two things in this call matter for production. The{" "}
        <code>reasoning</code> object is the cost dial: bumping
        effort from low to high triples the average thinking
        tokens on math and code tasks, and improves accuracy
        on AIME 2024 by roughly the same margin. The reasoning
        items returned in <code>response.output</code> are the
        state you carry forward. Drop them between calls and
        the model has to redo the reasoning from scratch on the
        next turn, which makes the second call slower and less
        consistent than the first.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Claude with interleaved thinking and tools
      </h2>
      <p className="mb-6 leading-relaxed">
        Claude's interleaved thinking is the cleanest implementation
        of the think-tool-think pattern on the client side. The
        beta header turns on the behaviour; from then on, the
        model emits a thinking block, a tool use block, a
        thinking block, another tool use block, and so on, until
        it finishes with a final assistant message. The full
        sequence of thinking blocks has to be passed back into
        the next turn, in order, or the model loses its place.
      </p>
      <CodeBlock
        language="python"
        filename="claude_interleaved_agent.py"
        code={`import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_invoice",
        "description": "Fetch an invoice by supplier id.",
        "input_schema": {
            "type": "object",
            "properties": {
                "supplier_id": {"type": "string"},
            },
            "required": ["supplier_id"],
        },
    },
]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    tools=tools,
    messages=[
        {
            "role": "user",
            "content": "What was the latest invoice for ACME-001?",
        },
    ],
    extra_headers={
        "anthropic-beta": "interleaved-thinking-2025-05-14",
    },
)

# When you continue the conversation, append the entire
# response.content array to your messages, including
# thinking blocks. Reordering or dropping them breaks the
# next turn.
`}
      />
      <p className="mb-6 leading-relaxed">
        For Opus 4.7, the call shape is different. The
        <code> thinking</code> parameter is gone. The model
        decides how much to think on its own, and you control
        the overall envelope with the <code>task-budgets-2026-03-13</code>{" "}
        beta header and a <code>task_budget</code> field on the
        output config. The model sees a running countdown of
        the budget and adjusts how much time it spends on each
        sub-task, which is the right shape for long, multi-step
        agent loops where you want to bound total cost without
        forcing the model to be uniformly shallow.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Gemini 3 and the thought signature trap
      </h2>
      <p className="mb-6 leading-relaxed">
        Gemini 3 enforces what previous models only suggested.
        When the model emits a function call, it attaches a{" "}
        <code>thought_signature</code> field: an opaque
        encrypted blob that preserves the reasoning state.
        Returning the function result without the matching
        signature returns a 400 error from the API. The same
        applies to multi-turn conversations: signatures from
        previous turns have to round-trip, even when you set
        the thinking level to minimal.
      </p>
      <CodeBlock
        language="python"
        filename="gemini3_agent.py"
        code={`from google import genai

client = genai.Client()

config = {
    "tools": [{"function_declarations": [get_invoice_decl]}],
    "thinking_config": {"thinking_level": "high"},
}

response = client.models.generate_content(
    model="gemini-3-pro",
    contents=[
        {"role": "user", "parts": [{"text": "Latest invoice for ACME-001?"}]},
    ],
    config=config,
)

# Run the tool, then continue. The function call part
# from the previous response carries the thought_signature
# that MUST be sent back unchanged.
function_call = response.candidates[0].content.parts[0].function_call
tool_result = run_tool(function_call.name, function_call.args)

followup = client.models.generate_content(
    model="gemini-3-pro",
    contents=[
        {"role": "user", "parts": [{"text": "Latest invoice for ACME-001?"}]},
        response.candidates[0].content,  # includes thought_signature
        {
            "role": "function",
            "parts": [{
                "function_response": {
                    "name": function_call.name,
                    "response": tool_result,
                },
            }],
        },
    ],
    config=config,
)
`}
      />
      <p className="mb-6 leading-relaxed">
        The migration path that tripped most teams was the
        persistence layer. A 2024 agent stored the message
        history as a list of role-plus-content pairs. A 2026
        Gemini 3 agent has to store the original content
        objects, signatures included, and pass them back
        verbatim. Logging frameworks that dropped extra fields
        on serialization broke silently in the move. The fix
        is unglamorous: store the raw provider responses, not
        a normalized shape, and reconstruct the input from the
        raw store on every turn.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The hierarchical model routing pattern
      </h2>
      <p className="mb-6 leading-relaxed">
        Reasoning models are powerful and slow. Chat models
        are cheap and fast. The production pattern that won
        in 2025 and matured in 2026 is hierarchical routing:
        a cheap classifier on the front of the loop decides
        whether the request needs a reasoning model or a chat
        model, and the deeper model only runs when the cheap
        model cannot finish the job.
      </p>
      <p className="mb-6 leading-relaxed">
        The numbers are worth reading. Multi-agent setups that
        use a cheap worker plus a frontier orchestrator reach
        97.7 percent of the all-frontier accuracy at about 61
        percent of the cost on published agent benchmarks.
        On simpler tasks the gap is wider: cheap models handle
        70 to 80 percent of the volume in most production
        agent workloads, and the reasoning model is reserved
        for the long tail where its extra cost is justified.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern looks like this in code: a router prompt
        on a small fast model returns a difficulty label, the
        agent reads the label, and the next call goes to the
        right model. The router itself can be a 4B or 8B
        open-weights model running in-house, which keeps the
        routing decision cheap enough to run on every request.
      </p>
      <CodeBlock
        language="python"
        filename="router.py"
        code={`from openai import OpenAI

client = OpenAI()

def classify(request: str) -> str:
    """Return 'simple', 'medium', or 'hard'."""
    r = client.responses.create(
        model="gpt-4o-mini",
        input=f"Classify task difficulty: {request}",
        max_completion_tokens=4,
    )
    return r.output_text.strip().lower()

def run_agent(request: str) -> str:
    label = classify(request)
    if label == "simple":
        return run_chat_agent(request, model="gpt-4o-mini")
    if label == "medium":
        return run_chat_agent(request, model="gpt-4o")
    return run_reasoning_agent(request, model="o4-mini", effort="medium")
`}
      />
      <p className="mb-6 leading-relaxed">
        The trap to avoid is over-routing. Each routing call
        is a real call: tokens, latency, and an error mode.
        On very high-traffic agents, the router runs cheaper
        when it is a classifier baked into the prompt of the
        first cheap model, with a structured output that says
        "I can handle this" or "escalate". The cheaper model
        either answers in place or hands off, in one call
        instead of two.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The cost math that decides the architecture
      </h2>
      <p className="mb-6 leading-relaxed">
        The temptation in 2026 is to turn reasoning on
        everywhere and let the model figure it out. The data
        does not support that move. Several patterns are
        worth keeping in front of every architecture
        decision.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Reasoning costs 3 to 15 times more
          tokens per task</strong> than the same task on a
          chat model. On UI agent tasks like ScreenSpot,
          enabling reasoning takes average output from 37
          to 238 tokens, before counting any internal
          thinking that bills at output rates.
        </li>
        <li>
          <strong>The unhappy path costs up to 500 percent
          more</strong> than the happy path. Agents that
          retry, replan, or back up cost five times what
          their successful runs cost. Reasoning models
          finish more first attempts, which compresses the
          long tail.
        </li>
        <li>
          <strong>LLM cost is 40 to 60 percent of total
          agent operational cost.</strong> The rest is
          memory, vector stores, orchestration, monitoring,
          and the human in the loop. Reasoning models
          reduce LLM cost per task only when they cut the
          number of turns by more than they grow the per-turn
          cost.
        </li>
        <li>
          <strong>Bigger model, fewer turns, lower
          cost.</strong> The most counterintuitive result
          of the year: on complex tasks, the frontier
          reasoning model is often cheaper end-to-end than
          a chat model in a long loop, because it finishes
          the task in one or two calls instead of fifteen.
          Cheaper models in long loops accumulate more
          tokens than expensive models in short loops.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production deployments
      </h2>
      <p className="mb-6 leading-relaxed">
        Three deployment shapes show up across client work
        and public case studies.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Deep research agents.</strong> The category
        OpenAI created with Deep Research in early 2025 and
        Google extended with Deep Research Max in 2026. The
        pattern: a reasoning model plans sub-questions,
        issues dozens of web searches, reads full pages,
        identifies gaps, plans more searches, and returns
        a cited report. The agent loop is long (often 30
        minutes for a single query), the LLM cost per task
        is high (around 5 to 15 dollars on enterprise
        plans), and the value comes from replacing two to
        four hours of a knowledge worker. Used heavily in
        market research, competitive analysis, and policy
        briefs.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Coding agents.</strong> The default for
        cursor-style and Replit-style coding work in 2026
        is a reasoning model with interleaved tool use.
        The model reads code, runs the tests, reads the
        failure, edits the file, reruns, and iterates.
        OpenAI recommends starting at high or maximum
        effort for coding and agentic work. The cost is
        worth it: a coding agent that finishes a task in
        one session is more valuable than one that needs
        the developer to nudge it through ten retries.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise workflow agents.</strong> The
        less photogenic but more common deployment: an
        agent that pulls a vendor record, runs a few
        compliance checks, drafts a response email, and
        routes it for approval. Most of the volume is
        simple and runs on a chat model. The escalations
        run on a reasoning model. The router lives at the
        front. The same pattern shows up at insurance
        triage, customer support, and internal IT
        helpdesks.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limits
      </h2>
      <p className="mb-6 leading-relaxed">
        The strengths and the trade-offs are clear enough
        to plan around.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Stronger first-attempt accuracy.</strong>
          The single largest win. Tasks that needed a
          critic, a verifier, or a self-consistency loop
          to be reliable on chat models are reliable in
          one call on reasoning models. The agent code
          shrinks, the eval surface shrinks, and the
          maintenance load drops.
        </li>
        <li>
          <strong>Better tool selection.</strong> o3 and
          o4-mini were trained to reason about when to use
          tools, not just how. The model picks the right
          tool more often, retries failed tool calls more
          intelligently, and chains tools without a
          framework-level planner.
        </li>
        <li>
          <strong>Higher latency.</strong> A reasoning
          call can take 30 to 120 seconds for hard tasks.
          User-facing chat agents need a streaming
          reasoning summary, a status indicator, or a
          background queue. Synchronous request-response is
          a poor fit.
        </li>
        <li>
          <strong>Provider-specific state.</strong>{" "}
          Reasoning items, thought signatures, and
          encrypted blobs are not portable across
          providers. Migrating from one provider to
          another is more work than swapping a chat model
          was in 2024.
        </li>
        <li>
          <strong>Cost variance.</strong> A reasoning
          model with the same prompt can return 500
          tokens on one call and 40,000 on the next. Cost
          modeling needs percentile budgets, not
          averages, and rate limits need headroom.
        </li>
        <li>
          <strong>Easier to over-trust.</strong> A long
          chain of thought reads as confidence. It is not.
          Reasoning models still hallucinate; they just
          hallucinate with a more elaborate justification.
          Evals need to score the answer, not the chain
          of thought.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to use a reasoning model, and when not to
      </h2>
      <p className="mb-6 leading-relaxed">
        A short list that maps to the architecture
        decisions we make on client engagements.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Reach for reasoning when:</strong> the task
        is multi-step and the steps are tightly coupled, the
        cost of a wrong answer is higher than a 30-second
        delay, the work is research or analysis or code,
        you currently have a planner-executor-critic graph
        that the reasoning model can collapse into one
        call, or the user is happy to wait for a thorough
        result.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Stick with chat models when:</strong> the
        task is a short reply in a conversation, the
        request is bounded and the format is well-known,
        latency matters more than depth, the volume is
        very high and the per-task budget is very small,
        or the workload is dominated by classification or
        extraction rather than reasoning.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What we expect through 2026 and into 2027
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>The protocol layer for reasoning state.</strong>{" "}
          The current mess of provider-specific opaque blobs
          will not last. Expect an open spec for portable
          reasoning state, similar to how MCP standardized
          tool integration. Several frameworks are already
          shipping their own normalized format as a
          stepping-stone.
        </li>
        <li>
          <strong>Adaptive thinking as the default.</strong>{" "}
          Claude Opus 4.7 led the move from explicit budget
          parameters to a model that decides how much to
          think. Expect OpenAI and Google to follow, with
          a higher-level task budget replacing per-call
          effort dials.
        </li>
        <li>
          <strong>Open-weights catching up faster than
          expected.</strong> DeepSeek R1 closed most of the
          gap to frontier reasoning at a small fraction of
          the cost, and Qwen QwQ-style models will continue
          to push it further. Self-hosting becomes a real
          option for cost-sensitive agent workloads, with
          vLLM and SGLang as the default runtime.
        </li>
        <li>
          <strong>Reasoning evals in model cards.</strong>{" "}
          MMLU and HumanEval will not be enough. Reasoning
          benchmarks (AIME, GPQA Diamond, ARC-AGI) will
          appear in vendor model cards next to chat
          benchmarks, and procurement decisions will start
          referencing them.
        </li>
        <li>
          <strong>Smaller reasoning models.</strong>{" "}
          Distillation work is already producing 7B and
          14B reasoning models that beat 70B chat models
          on hard tasks. Expect a tier of cheap, fast,
          on-device reasoning models that handle 80
          percent of the volume that today goes to o4-mini
          or Sonnet 4.6.
        </li>
        <li>
          <strong>Tighter coupling with durable execution.</strong>{" "}
          Reasoning calls are long, and long calls fail in
          the same shapes durable workflows already solve.
          Expect Temporal, Inngest, and Restate to add
          first-class support for streaming reasoning
          summaries, suspending on tool calls, and
          resuming with the same thought signatures.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How to introduce reasoning on a real project
      </h2>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Start with a router on a cheap model. Do not
          send every request to a reasoning model. Most of
          your volume is simple, and a chat model on the
          common path keeps cost predictable.
        </li>
        <li>
          Pick one reasoning model and one cheap model per
          stack. Two providers, two SDKs, two billing lines
          is enough complexity. Switching is easier later
          than rolling four providers from day one.
        </li>
        <li>
          Pass reasoning items, signatures, or thinking
          blocks through the persistence layer verbatim.
          Store the raw provider response, not a
          normalized message shape. Migration tools can
          flatten later; the model breaks now if you flatten
          too early.
        </li>
        <li>
          Set the reasoning budget per task type. Coding
          and research go high. Classification goes low.
          The right number is the lowest one that hits your
          accuracy target on your eval, not the highest one
          the model allows.
        </li>
        <li>
          Run a real eval before launch. A reasoning model
          that solves AIME does not automatically solve
          your domain task. Build the eval from your own
          logs and grade the answer, not the chain of
          thought.
        </li>
        <li>
          Budget for tail latency. The 99th percentile of
          a reasoning call is much further from the median
          than a chat call. Plan timeouts, queueing, and
          user-facing status messaging accordingly.
        </li>
        <li>
          Watch the spend daily for the first month. The
          variance is high enough that a single hard task
          can move the daily bill by 20 percent. Alerting
          on per-tenant spend catches the problem before
          finance does.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Closing
      </h2>
      <p className="mb-6 leading-relaxed">
        Reasoning models did not replace the agent stack.
        They moved the center of gravity. The orchestration
        code got smaller, the model calls got longer and
        more expensive, and the architectural decision
        shifted from "how do I scaffold reliability around
        a fast model" to "how do I route work between a
        deep model and a fast one, and where do I store the
        thinking state in between". Teams that get this
        right ship agents that finish more tasks in fewer
        turns, with a clearer maintenance story, and an
        easier path forward as the next generation of
        reasoning models lands.
      </p>
      <p className="mb-6 leading-relaxed">
        If you have an existing agent stack built around
        chat models and want a second opinion on whether
        reasoning is the right next move, or help wiring
        o3, Opus 4.7, or Gemini 3 into a LangGraph,
        Inngest, or custom orchestration,{" "}
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
            href="https://openai.com/index/introducing-o3-and-o4-mini/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing OpenAI o3 and o4-mini (OpenAI)
          </a>{" "}
          - the launch post for the current OpenAI
          reasoning family, including the tool-use training
          story and the reasoning_effort levels.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/build-with-claude/extended-thinking"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building with extended thinking (Claude API
            Docs)
          </a>{" "}
          - the canonical reference for Anthropic extended
          thinking, interleaved thinking with tools, and
          budget_tokens.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is new in Claude Opus 4.7 (Anthropic)
          </a>{" "}
          - the move from extended thinking to adaptive
          thinking, the task_budget parameter, and the
          breaking changes around the old thinking field.
        </li>
        <li>
          <a
            href="https://ai.google.dev/gemini-api/docs/thought-signatures"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thought Signatures (Gemini API)
          </a>{" "}
          - the official spec for round-tripping
          thought_signature blobs across tool calls and
          multi-turn agents in Gemini 3.
        </li>
        <li>
          <a
            href="https://ai.google.dev/gemini-api/docs/thinking"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gemini Thinking (Google AI for Developers)
          </a>{" "}
          - the thinking_level parameter, Deep Think mode,
          and the production recommendations from Google
          for reasoning-capable Gemini models.
        </li>
        <li>
          <a
            href="https://developers.openai.com/api/docs/guides/reasoning-best-practices"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reasoning best practices (OpenAI API Docs)
          </a>{" "}
          - production recommendations for o-series models,
          including reasoning_effort defaults, the
          Responses API integration, and the
          max_completion_tokens migration.
        </li>
        <li>
          <a
            href="https://developers.openai.com/cookbook/examples/responses_api/reasoning_items"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Better performance from reasoning models using
            the Responses API (OpenAI Cookbook)
          </a>{" "}
          - the encrypted_content pattern, reasoning
          summaries, and how to chain reasoning calls in
          long-running agent loops.
        </li>
        <li>
          <a
            href="https://www.spheron.network/blog/deploy-deepseek-r2-gpu-cloud/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy DeepSeek R2 on GPU Cloud (Spheron)
          </a>{" "}
          - a walk-through of self-hosting open-weights
          reasoning models on vLLM with realistic
          GPU and KV cache sizing.
        </li>
        <li>
          <a
            href="https://www.buildmvpfast.com/blog/ai-agent-cost-dynamic-reasoning-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Why AI Agents Are So Expensive: Hidden Costs
            of Dynamic Reasoning 2026
          </a>{" "}
          - the cost math behind reasoning-driven agent
          workloads, including the 5 to 30x token gap and
          the 40 to 60 percent LLM cost share.
        </li>
        <li>
          <a
            href="https://mlflow.org/articles/building-production-ready-ai-agents-in-2026/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building Production-Ready AI Agents in 2026
            (MLflow)
          </a>{" "}
          - the four-layer reference architecture for
          production agents and the role of reasoning
          models inside it.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents in 2026
          </a>{" "}
          - the orchestration layer we pair with reasoning
          models for long-running agent workflows.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>{" "}
          - the hierarchical routing pattern in more depth,
          including the lead-orchestrator-plus-worker
          numbers cited above.
        </li>
      </ul>
    </div>
  );
}
