import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "dspy-programming-llms-production-2026",
  title:
    "DSPy in production 2026: programming (not prompting) LLMs with GEPA, MIPROv2, and the Stanford NLP stack",
  excerpt:
    "How DSPy went from a Stanford NLP research library into the framework Shopify, Dropbox, JetBlue, Replit, and Databricks reach for when prompt engineering stops scaling. Covers the three primitives (signatures, modules, optimizers), the DSPy 3.0 release around DAIS 2025, the GEPA reflective optimizer that beats reinforcement learning with 35x fewer rollouts, and the production patterns we run on client work.",
  metaDescription:
    "A practical, technical guide to DSPy in 2026. Covers the signatures/modules/optimizers programming model, the DSPy 3.0 release with async, MCP, and native tool calls, the GEPA reflective prompt optimizer from ICLR 2026 that outperforms GRPO by 6-20% at 35x fewer rollouts, MIPROv2 and BootstrapFewShot, real production case studies from Shopify (550x cost reduction), Dropbox Dash (45% NMSE reduction), JetBlue, Replit, and AWS, and honest trade-offs against LangChain, plain prompts, and fine-tuning.",
  image:
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "DSPy",
    "GEPA",
    "MIPROv2",
    "Stanford NLP",
    "Databricks",
    "Prompt Optimization",
    "LLM",
    "Production",
  ],
  publishDate: "2026-07-09",
  readingTime: "15 min read",
};

export default function DspyProgrammingLlmsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In December 2022 the Stanford NLP group open-sourced
        a small library called DSP. Three years later that
        library, now called DSPy, has 5.9 million monthly
        downloads, 36k GitHub stars, 434+ contributors, and
        runs in production at Shopify, Dropbox, JetBlue,
        Replit, AWS, and Databricks. It is one of the few
        LLM frameworks that has grown as much for its ideas
        as for its API. Its ideas: stop writing prompts by
        hand, express your task as typed input and output
        fields, and let an optimizer search for the prompt
        (and sometimes the model weights) that maximises
        your metric. This article is the practical read on
        DSPy in 2026: the three primitives, the DSPy 3.0
        release around DAIS 2025, the GEPA optimizer that
        outperforms reinforcement learning at a fraction of
        the compute, and the real patterns we ship on client
        work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why programming beats prompting once the system
        grows
      </h2>
      <p className="mb-6 leading-relaxed">
        A prompt is a string. Once your app has more than
        one prompt, or one prompt that has to work across
        two model versions, that string becomes a liability.
        It breaks on model swaps, it drifts as you edit it,
        it hides its own performance behind vibes, and
        nobody can tell which line of the prompt is doing
        the work. Every team we know of has hit the same
        wall: manual prompt tuning gets you to a first
        version and then plateaus, and every small change
        risks a regression.
      </p>
      <p className="mb-6 leading-relaxed">
        DSPy&rsquo;s claim is that the fix is to treat the
        prompt as a compilation target, not a source file.
        You write a <em>signature</em> (what goes in, what
        comes out), you compose signatures into{" "}
        <em>modules</em> (small Python classes), and you
        run an <em>optimizer</em> against a metric and a
        few examples. The optimizer searches over
        instructions, few-shot demonstrations, and sometimes
        weights, and gives you back a program that scores
        better. The prompt itself is generated. You
        maintain the code and the metric, not the string.
      </p>
      <p className="mb-6 leading-relaxed">
        Two numbers show why the framework matters in
        practice. Shopify runs DSPy on metadata extraction
        across every shop on the platform and reports about
        a 550x cost reduction against the manual prompt
        version. Dropbox Dash used DSPy to migrate its
        relevance judge off OpenAI o3 onto the open-weight
        gpt-oss-120b, cut normalised mean squared error by
        45%, and dropped model adaptation time from one to
        two weeks of manual iteration to one to two days.
        Those are the two shapes of the payoff: cost, and
        the speed at which you can move to the next model.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The DSPy timeline: December 2022 to mid-2026
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>December 2022</strong>: Stanford NLP
          releases Demonstrate-Search-Predict (DSP), the
          research code that becomes DSPy.
        </li>
        <li>
          <strong>October 2023</strong>: The DSPy paper{" "}
          <em>Compiling Declarative Language Model Calls
          into Self-Improving Pipelines</em> is published
          on arXiv. Introduces signatures, modules,
          teleprompters (the old name for optimizers).
        </li>
        <li>
          <strong>February 2024</strong>: STORM, a DSPy
          program for writing Wikipedia-length articles,
          goes viral and becomes the first widely-shared
          example of a real DSPy application.
        </li>
        <li>
          <strong>June 2024</strong>: MIPROv2 lands as the
          new default prompt optimizer, jointly searching
          instructions and few-shot demos with Bayesian
          optimization.
        </li>
        <li>
          <strong>July 2024</strong>: BetterTogether shows
          that combining prompt optimization and
          fine-tuning of small open models beats either
          alone.
        </li>
        <li>
          <strong>June 2025</strong>: DSPy 3.0 is announced
          at the Databricks Data + AI Summit (DAIS 2025).
          It cleans up the API, makes async first-class,
          adds native tool calling, and ships GEPA as the
          new optimizer of choice.
        </li>
        <li>
          <strong>July 25, 2025</strong>: The GEPA paper{" "}
          <em>Reflective Prompt Evolution Can Outperform
          Reinforcement Learning</em> is posted on arXiv
          (2507.19457). Reports beating GRPO by 6% on
          average and up to 20%, with 35x fewer rollouts.
        </li>
        <li>
          <strong>August 2025</strong>: DSPy 3.0 exits beta.
          Adds MCP tool support and audio field types for
          voice models.
        </li>
        <li>
          <strong>March 17, 2026</strong>: Dropbox
          publishes the Dash relevance judge write-up. First
          large-scale public case study of GEPA in
          production. Reports 45% NMSE reduction and a 97%
          drop in malformed JSON outputs on gemma-3-12b.
        </li>
        <li>
          <strong>February 2026</strong>: GEPA is accepted
          to ICLR 2026 as an Oral. Paper revised with
          expanded results on AIME-2025 and code
          optimization tasks.
        </li>
        <li>
          <strong>Q2 2026</strong>: DSPy 3.3.0b1 ships,
          adding a rewritten ReActV2 module, a new BaseLM
          system, and GEPA 0.1.1.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three primitives: signatures, modules,
        optimizers
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy has three concepts and that is the whole
        surface. Everything else in the library is either a
        variation on one of them or plumbing.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy: how the three primitives fit together"
        code={`+-------------------------------------------------------+
|  1. Signature                                         |
|                                                       |
|  class Answer(dspy.Signature):                        |
|      """Answer using the context."""                  |
|      context: str  = dspy.InputField()                |
|      question: str = dspy.InputField()                |
|      answer: str   = dspy.OutputField()               |
+-------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------+
|  2. Module (chooses HOW the signature runs)           |
|                                                       |
|  step = dspy.Predict(Answer)         # one shot       |
|  step = dspy.ChainOfThought(Answer)  # + reasoning    |
|  step = dspy.ReAct(Answer, tools=[]) # + tool loop    |
+-------------------------------------------------------+
                            |
                            v
+-------------------------------------------------------+
|  3. Optimizer (compiles the program vs a metric)      |
|                                                       |
|  opt = dspy.GEPA(metric=exact_match, auto="medium")   |
|  compiled = opt.compile(step, trainset=examples)      |
|                                                       |
|  # Baseline 62% -> Optimized 89% (same model)         |
+-------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        A <strong>signature</strong> is a typed interface
        for one LLM step. It is a Python class with an
        instruction docstring, input fields, and output
        fields. It says <em>what</em> the step does and
        never <em>how</em>. The types are real Python
        types: strings, lists, enums via{" "}
        <code>Literal[...]</code>, Pydantic models for
        strict JSON, and in DSPy 3 also{" "}
        <code>dspy.Image</code> and <code>dspy.Audio</code>{" "}
        for multi-modal inputs.
      </p>
      <p className="mb-6 leading-relaxed">
        A <strong>module</strong> chooses the execution
        strategy for a signature. <code>dspy.Predict</code>{" "}
        is a single LLM call. <code>dspy.ChainOfThought</code>{" "}
        adds a hidden reasoning step. <code>dspy.ReAct</code>{" "}
        wraps the signature in a tool-calling loop. You can
        swap between them without touching the signature or
        the caller. Modules are also just Python classes
        that inherit from <code>dspy.Module</code>, so you
        compose them with plain <code>for</code> loops and{" "}
        <code>if</code> statements, not a DAG framework.
      </p>
      <p className="mb-6 leading-relaxed">
        An <strong>optimizer</strong> takes your program, a
        metric, and a small training set, and returns a new
        program that scores better on the metric. It does
        this by editing the instruction docstring, choosing
        few-shot demonstrations, or in some optimizers
        fine-tuning the underlying model. The optimizer is
        where DSPy earns its keep: you never write the
        prompt that ships to the LLM. You write the metric
        and let the compiler search.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A minimal end-to-end program
      </h2>
      <p className="mb-6 leading-relaxed">
        The shortest useful DSPy program is a classifier
        that shows all three primitives at once. This is
        the exact shape most of our early prototypes take
        before we grow them into RAG or agent programs.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy/triage.py"
        code={`from typing import Literal
import dspy

# 1. Point DSPy at a model. Any provider LiteLLM supports works.
dspy.configure(lm=dspy.LM("openai/gpt-5.4-mini"))

# 2. Declare the task as a typed signature.
class Triage(dspy.Signature):
    """Route a customer support ticket to the right team."""
    ticket: str = dspy.InputField(desc="the raw support message")
    urgency: Literal["low", "high"] = dspy.OutputField()
    team: Literal["billing", "auth", "shipping", "other"] = dspy.OutputField()

# 3. Wrap the signature in a module.
classify = dspy.ChainOfThought(Triage)

# 4. Run it.
pred = classify(ticket="My card was charged twice for order 481.")
print(pred.urgency, pred.team)   # -> "high" "billing"

# 5. Compile it against a metric with real examples.
def is_correct(example, pred, trace=None) -> float:
    return float(example.team == pred.team and example.urgency == pred.urgency)

trainset = [
    dspy.Example(
        ticket="I forgot my password and cannot log in.",
        urgency="high", team="auth",
    ).with_inputs("ticket"),
    dspy.Example(
        ticket="Where can I find your refund policy?",
        urgency="low", team="other",
    ).with_inputs("ticket"),
    # ... 20 to 50 more.
]

optimizer = dspy.GEPA(metric=is_correct, auto="light")
compiled = optimizer.compile(classify, trainset=trainset)

# 6. Ship the compiled artifact.
compiled.save("triage_v2.json")`}
      />
      <p className="mb-6 leading-relaxed">
        Four things are worth noticing. First, the model
        string uses LiteLLM syntax, so the same code runs
        against OpenAI, Anthropic, Google, Ollama, or a
        Databricks endpoint. Second, the enums in the
        signature are enforced by the adapter (DSPy 3 has a
        <code>JSONAdapter</code> that produces strict JSON
        with constrained decoding when the model supports
        it), so parsing errors do not reach your app.
        Third, the metric is a plain Python function with
        access to the example, the prediction, and
        optionally the full trace of intermediate outputs,
        so you can penalise long reasoning or missing
        citations without leaving Python. Fourth, the
        compiled program is a JSON artifact you can commit,
        diff, and load in a container.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy 3.0: what changed at DAIS 2025
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy 3.0 shipped in June 2025 at the Databricks
        Data + AI Summit and exited beta in August 2025.
        It is the version most production teams have
        migrated to, and it is the version this article
        assumes. The changes are less about new concepts
        and more about making the library ready for the
        next tier of workloads.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Async and streaming become first-class</strong>.
        Every module has an <code>acall</code> counterpart,
        and streaming callbacks are supported at the module
        level. This matters because DSPy 2 forced you to
        either block or bolt on your own async layer, and
        that made it awkward inside a FastAPI or Next.js
        route.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Native tool calling replaces prompt-based
        tools</strong>. <code>dspy.ReAct</code> now emits
        real function-call payloads through the adapter
        rather than parsing free-form text, which cuts the
        error rate on tool loops sharply on the models that
        support structured tool calls (GPT-5.x, Claude
        Opus/Sonnet, Gemini 2.5+).
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP support in the tool layer</strong>.
        You can hand a list of MCP server URLs to a ReAct
        module and it will discover the tools, wire them
        into the signature, and route calls through the
        protocol. This is the same shape agents use in the
        Claude Agent SDK and the OpenAI Agents SDK.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>GEPA becomes the default recommendation</strong>.
        MIPROv2 is still supported, still fast, and still a
        good pick for tight budgets. But the DSPy 3 docs
        point new users at GEPA first because it needs
        fewer rollouts and produces prompts that transfer
        better across model swaps.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MLflow-native observability</strong>. Runs,
        candidate prompts, per-example scores, and the
        final compiled artifact log to MLflow by default.
        This closed a long-standing gap: in DSPy 2 you
        either used an external integration (Phoenix,
        LangWatch, Weave) or you inspected the state by
        hand.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        GEPA: reflection beats reinforcement learning
      </h2>
      <p className="mb-6 leading-relaxed">
        GEPA (Genetic-Pareto) is the piece of the DSPy
        story that has moved fastest since 2025. The paper
        was posted in July 2025 by Agrawal, Tan, Soylu,
        Ziems, Opsahl-Ong, Singhvi, Ryan, Potts, Sen,
        Dimakis, Stoica, Klein, Zaharia, and Khattab, and
        was accepted to ICLR 2026 as an Oral. The headline
        result: GEPA beats GRPO (a common reinforcement
        learning method for tuning LLMs) by 6% on average
        and up to 20% across six tasks, using up to 35x
        fewer rollouts. It also beats MIPROv2 by more than
        10% on average (for example, +12% on AIME-2025).
      </p>
      <p className="mb-6 leading-relaxed">
        The insight is small and, in retrospect, obvious. A
        scalar reward wastes most of what happened during a
        rollout. If the model got the answer wrong, the
        interesting signal is <em>why</em>, and{" "}
        <em>why</em> is a paragraph of text, not a number.
        GEPA samples trajectories (reasoning, tool calls,
        tool outputs), reflects on them in natural language,
        writes a diagnosis of what went wrong, proposes a
        prompt edit that would address the diagnosis, and
        evaluates the new prompt against the metric. It
        keeps a Pareto frontier of candidate prompts, not
        just the single best, because a prompt that scores
        lower on average may still be the best on a subset
        of examples and worth merging with the leader.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy/gepa_compile.py"
        code={`import dspy

# A metric can return either a float or a Prediction with score + feedback.
# GEPA reads the feedback string and uses it in the reflection step.
def semantic_metric(example, pred, trace=None) -> dspy.Prediction:
    score = float(pred.answer.strip().lower() == example.answer.strip().lower())
    feedback = []
    if not score:
        diff = _explain_gap(example.answer, pred.answer)
        feedback.append(f"Answer mismatch. Expected '{example.answer}', got '{pred.answer}'. {diff}")
    if hasattr(pred, "reasoning") and len(pred.reasoning) > 400:
        feedback.append("Reasoning is too long. Keep it under 3 sentences.")
    return dspy.Prediction(score=score, feedback="; ".join(feedback))

gepa = dspy.GEPA(
    metric=semantic_metric,
    auto="medium",
    reflection_lm=dspy.LM("openai/gpt-5.4"),   # a stronger model for reflection
    candidate_selection_strategy="pareto",
    use_merge=True,
    max_merge_invocations=5,
    num_threads=8,
    log_dir="./runs/triage_gepa",
    track_stats=True,
    use_mlflow=True,
)

compiled = gepa.compile(classify, trainset=trainset, valset=valset)
compiled.save("triage_gepa_v1.json")`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make GEPA work in practice. First,
        the metric is allowed to return a text feedback
        string alongside the score. That feedback goes into
        the reflection step. If you can produce a useful
        message like &ldquo;the model missed the date; look
        at the timestamp field&rdquo;, GEPA will use it. If
        your feedback is empty, GEPA still works, but the
        gains are smaller. Second, GEPA uses a separate{" "}
        <code>reflection_lm</code>. It is usually cheaper
        and safer to reflect with a strong model even if
        the task itself runs on a cheap one. Third, the
        Pareto candidate strategy and the merge step
        together do most of the heavy lifting: without
        them GEPA collapses toward one prompt that beats
        the average but loses on a subset of hard cases.
      </p>
      <p className="mb-6 leading-relaxed">
        The empirical case for GEPA is strong enough that
        the Dropbox Dash team leaned on it for their
        production judge migration. In their write-up
        (March 2026) they describe using GEPA to adapt the
        Dash relevance judge from OpenAI o3 to gpt-oss-120b,
        with a hand-crafted feedback function that includes
        the human rationale, the model reasoning, the rating
        gap, and rules against overfitting. The result was
        a 45% reduction in NMSE, a drop from one to two
        weeks of manual iteration to one to two days per
        model swap, and the ability to label 10 to 100x
        more data at the same cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MIPROv2 and the rest of the optimizer zoo
      </h2>
      <p className="mb-6 leading-relaxed">
        GEPA is not the only optimizer worth knowing.
        MIPROv2, released in June 2024 and still the second
        default in the docs, is a joint search over
        instructions and few-shot demonstrations with
        Bayesian optimization on top. It is fast, cheap
        enough for small dev sets, and produces good
        results on classification and extraction tasks
        where a numeric metric is enough. The rule we use:
        try MIPROv2 first for tight-budget cases with{" "}
        <code>auto=&quot;light&quot;</code>, move to GEPA
        when you can produce useful feedback text or when
        MIPROv2 plateaus.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy/mipro_v2.py"
        code={`import dspy

optimizer = dspy.MIPROv2(
    metric=is_correct,
    auto="medium",             # "light" | "medium" | "heavy"
    num_threads=8,
    max_bootstrapped_demos=4,
    max_labeled_demos=4,
)

compiled = optimizer.compile(
    classify,
    trainset=trainset,
    valset=valset,
)`}
      />
      <p className="mb-6 leading-relaxed">
        Under the hood MIPROv2 runs a three-stage loop.
        <strong>Bootstrap</strong>: run the current
        program on the trainset, keep the trajectories that
        scored well as demonstration candidates.{" "}
        <strong>Propose</strong>: use a proposer LLM to
        generate instruction candidates that describe the
        task and reference the demonstrations.{" "}
        <strong>Search</strong>: evaluate combinations of
        instructions and demos on mini-batches, and use
        Bayesian optimization to pick which combinations
        to try next. The output is a program with the best
        instruction and the best demonstrations wired in.
      </p>
      <p className="mb-6 leading-relaxed">
        The other optimizers in the current release worth
        knowing:{" "}
        <strong>BootstrapFewShot</strong> is the simplest
        one, useful when you have a few hand-labeled
        examples and want to seed a first version.{" "}
        <strong>BootstrapFinetune</strong> generates
        training data through the program itself and then
        fine-tunes a smaller open model on the outputs of a
        larger one. <strong>BetterTogether</strong>{" "}
        combines prompt optimization and fine-tuning, which
        is the pattern the paper shows delivers the largest
        gains for small open models.{" "}
        <strong>SIMBA</strong> is an aggressive black-box
        search you can reach for when MIPROv2 plateaus and
        you cannot write useful feedback for GEPA.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Building an agent with DSPy 3
      </h2>
      <p className="mb-6 leading-relaxed">
        The <code>dspy.ReAct</code> module in DSPy 3 is a
        drop-in for building a tool-using agent. It takes a
        signature, a list of tools (Python functions or MCP
        servers), and a hidden reasoning budget, and runs
        the tool-calling loop for you. Because it emits
        native function calls where the model supports them,
        it is much more reliable than the DSPy 2 version
        that parsed free-form ReAct traces.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy/support_agent.py"
        code={`import dspy

dspy.configure(lm=dspy.LM("anthropic/claude-sonnet-5"))

def lookup_order(order_id: str) -> dict:
    """Return the order status and shipping address."""
    return db.get_order(order_id)

def issue_refund(order_id: str, amount: float, reason: str) -> str:
    """Refund the given amount and return the refund confirmation id."""
    return payments.refund(order_id, amount, reason)

class HandleTicket(dspy.Signature):
    """Handle a support ticket end to end. Use tools to check facts
    before promising anything to the customer."""
    ticket: str = dspy.InputField()
    customer_reply: str = dspy.OutputField(desc="the message we send back")
    refunded: bool = dspy.OutputField()

agent = dspy.ReAct(
    HandleTicket,
    tools=[lookup_order, issue_refund],
    max_iters=6,
    mcp_servers=["https://kb.acme.com/mcp"],
)

pred = agent(ticket="Order 481 charged me twice, please refund one.")
print(pred.customer_reply, pred.refunded)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things to keep in mind for an agent like this.
        First, the metric you compile against should reward
        the outcome, not the trace. In our runs, metrics
        that credit the agent for calling the right tool
        overfit to the training set and generalise poorly.
        A metric that scores the final customer reply plus
        a simulator check (&ldquo;did the refund actually
        happen&rdquo;) is what works. Second, cap{" "}
        <code>max_iters</code> and log every tool call.
        GEPA will happily push the agent to spend more tool
        calls if that improves the metric, and you want a
        hard ceiling for cost and safety.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns we use on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Start with a signature, not a
        prompt</strong>. On day one of a new task the
        temptation is to open the OpenAI playground and
        draft a prompt. Skip it. Write the signature, wire
        it into a Predict module, run it on 5 examples by
        hand. You now have a program you can grow. Every
        team we have moved to DSPy that did this first
        landed on a working system faster than the one that
        started with a prompt.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Do not skip the metric</strong>. Most
        teams that fail with DSPy fail here. The optimizer
        cannot search if the metric is fuzzy. A binary
        exact-match is fine to start. F1 or an LLM-as-judge
        with a rubric is fine once the task is stable. What
        does not work is &ldquo;the human review team
        thinks it looks good&rdquo;, because it is not
        callable from Python.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Version compiled artifacts as code</strong>.
        The output of <code>compile</code> is a JSON blob
        with the optimized instructions, demos, and
        adapter config. Commit it. Tag it with the model
        version, the DSPy version, and the training set
        hash in a sidecar file. When the next model
        release breaks something you can bisect.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Pin the reflection model separately from
        the task model</strong>. GEPA lets you pass a
        different <code>reflection_lm</code>. Use it. The
        task model can be Haiku or a 12B open model; the
        reflection model should be one tier up. The
        reflection call is only a small fraction of the
        total token spend but drives most of the quality
        gains.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Guard against overfitting to the
        trainset</strong>. Optimizers will happily copy
        entity names and phrases from your examples into
        the prompt. The Dropbox Dash team calls this out in
        their write-up and adds explicit rules against it
        in their feedback function. Do the same: forbid
        the reflection LLM from copying specific values,
        and forbid it from changing the task definition
        (rating scales, labels).
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Freeze stable modules before optimizing
        neighbours</strong>. In a multi-module program, one
        weak module can cause the optimizer to make bad
        changes to a strong one. Freeze the strong module
        (mark it non-optimizable) so only the weak module
        moves. This is the same discipline that keeps small
        refactors from turning into big ones.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Log optimizations with MLflow from day
        one</strong>. Every compile run should land in
        MLflow. You will want to compare the score curve,
        the candidate prompts, and the cost of each run.
        The MLflow integration is native in DSPy 3, and
        turning it on is one flag.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production case studies worth reading
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Shopify</strong>: metadata extraction on
        every shop, with a reported ~550x cost reduction
        moving from a hand-tuned prompt on a large model to
        a DSPy program compiled onto a small open model.
        The Shopify Merchant Success team&rsquo;s DSPy talk
        walks through the setup and the migration path.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Dropbox Dash</strong> (March 2026): the
        relevance judge migration from OpenAI o3 to
        gpt-oss-120b using GEPA. Reports 45% NMSE
        reduction, model adaptation time down from weeks to
        days, and 10 to 100x more labels at the same
        budget. Also runs a stress test on gemma-3-12b:
        malformed JSON dropped by more than 97% after
        DSPy optimization. The single most detailed public
        DSPy case study to date.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>JetBlue</strong>: multiple chatbot use
        cases built on top of Databricks and DSPy. The
        ZenML LLMOps write-up and the Databricks case study
        cover the multi-stage agent pattern JetBlue landed
        on: signature per intent, a small classifier at the
        top, ChainOfThought answer modules, and
        BootstrapFewShot as the first-pass optimizer.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Replit</strong>: a code-repair pipeline
        that uses DSPy to synthesize diffs from a code LLM.
        Their engineering post frames it as the same
        pattern PyTorch introduced for neural networks: you
        declare the graph, you set the objective, and you
        let the optimizer find the parameters.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS</strong>: prompt migration for the
        Amazon Nova family. The AWS blog on data-aware
        prompt optimization walks through moving prompts
        from a larger Nova model to a smaller one using
        DSPy, with cost and latency numbers included.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Databricks</strong>: internal LM judges,
        RAG systems, classification, and customer
        solutions. Databricks employs the DSPy team and
        ships DSPy as a first-class experience on the
        Databricks platform via Model Serving and MLflow.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trade-offs and when not to use DSPy
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is not the right tool for every LLM app. The
        cases where it pays for itself are the ones with
        two properties: you have a measurable metric, and
        the system runs enough times that a compiled program
        saves more than the compile costs. For one-off
        prompts, throwaway demos, or apps where the metric
        is &ldquo;a human likes it&rdquo;, the framework
        just adds ceremony.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The strengths</strong>. Model-agnostic
        code: the same DSPy program runs on OpenAI,
        Anthropic, Google, and open weights on Ollama or
        vLLM. Real automated improvement: prompts get
        better without a human editing them. Portability:
        when a new model ships you re-compile, you do not
        re-write. Structure: signatures force you to state
        the task cleanly, which is a good discipline even
        without the optimizer.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The trade-offs</strong>. You need a metric
        and a small labelled set (typically 30 to 200
        examples). If you cannot produce those, the
        optimizer has nothing to do. Compile runs cost
        tokens: MIPROv2 on <code>auto=&quot;medium&quot;</code>{" "}
        is a few dollars, GEPA a bit more. The generated
        prompts can be verbose and hard to review by hand,
        which is fine once you trust the metric but
        uncomfortable at first. And the framework has an
        opinionated shape: it wants you to think in
        signatures and modules, which is the right shape
        for scaling but takes an afternoon to internalise.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When to use DSPy</strong>: multi-step LLM
        workflows (RAG, extraction, classification,
        agents) where you can define a metric and a small
        eval set, or where a model migration is on the
        roadmap. <strong>When not to use DSPy</strong>: a
        single-prompt chatbot with fuzzy quality signals, a
        throwaway internal demo, or a task where the LLM
        is a one-line helper inside a bigger app.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy vs LangChain vs plain prompts vs
        fine-tuning
      </h2>
      <p className="mb-6 leading-relaxed">
        The comparison that comes up on every engagement is
        DSPy vs LangChain. They solve different problems.
        LangChain (and LangGraph) is glue: it wires
        together LLM calls, tools, memory, and stateful
        graphs. DSPy is a compiler: it turns a declarative
        program into an optimized prompt. Many teams run
        both, LangGraph on the outside and DSPy inside a
        graph node. The framing we use with clients:
        LangGraph is what runs the workflow, DSPy is what
        writes the prompts inside it.
      </p>
      <p className="mb-6 leading-relaxed">
        Against plain prompts, DSPy&rsquo;s edge is
        automation and portability. A hand-written prompt
        that works on GPT-5.4 will break on Claude Sonnet 5;
        a DSPy program compiles on both without a rewrite,
        and the compile step is cheaper than a week of
        prompt engineering.
      </p>
      <p className="mb-6 leading-relaxed">
        Against fine-tuning, DSPy is cheaper, faster, and
        easier to undo. Fine-tuning has one advantage: a
        smaller, faster model with the fine-tune baked in
        can outperform a bigger model with a compiled
        prompt on the deployed cost curve. The BetterTogether
        paper and the DSPy roadmap point at combining the
        two: compile the prompt, then fine-tune the model
        against the compiled program. This is the direction
        the strongest DSPy production teams are moving.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through the rest of
        2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>GEPA everywhere</strong>. The GEPA optimizer
        is being ported outside DSPy. The paper release
        includes a standalone <code>gepa-ai/gepa</code>{" "}
        library that other frameworks can pick up, and
        early adopters are wiring it into their own agent
        harnesses. Expect the reflection-plus-Pareto
        pattern to become the default optimizer shape in
        several other frameworks by end of 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Compiled programs as deployable
        artifacts</strong>. DSPy 3 is pushing hard on
        making the compiled JSON a first-class deploy
        target: sign it, version it, load it in a
        container, serve it. This is the shape that turns
        DSPy into an MLOps flow rather than a research
        library.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Human-in-the-loop optimization</strong>.
        The DSPy roadmap flags this as the one substantial
        paradigm shift ahead: optimizers that accept
        ad-hoc, in-the-loop human feedback, not just
        pre-defined metrics. If it lands, it fills the gap
        between &ldquo;the metric is fuzzy&rdquo; and
        &ldquo;we cannot use DSPy&rdquo;.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Fine-tuning as a second compile
        step</strong>. BetterTogether showed the theory;
        the tooling around it is finally catching up. In
        2026 you can expect DSPy to ship a workflow that
        compiles the prompt, generates training data
        through the compiled program, and fine-tunes an
        open model against the outputs, all through the
        same optimizer surface.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-shaped signatures</strong>. Signatures
        today describe a single LLM step. The community is
        experimenting with signatures that describe a whole
        agent (goals, tools, guardrails, exit conditions),
        with GEPA optimizing across the full trace. Early
        research includes the Recursive Language Models
        paper (December 2025) that the DSPy homepage now
        features.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the compiler thesis is holding up
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy&rsquo;s bet in 2022 was that LLM apps look
        more like a compiler workflow than a prompt-writing
        workflow. Four years later the evidence is in.
        Shopify, Dropbox, JetBlue, Replit, AWS, and
        Databricks are running DSPy programs at scale,
        with real cost and quality numbers to point at.
        The DSPy 3.0 release around DAIS 2025 made the
        library production-shaped: async is native, tool
        calls are structured, MCP is supported, MLflow
        logs everything. The GEPA optimizer at ICLR 2026
        is the strongest empirical case yet that reflective
        prompt search beats reinforcement learning at a
        fraction of the compute.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern we recommend to clients: start with a
        signature and a Predict module against the model
        you already use. Write a metric and 30 examples.
        Compile with MIPROv2 <code>auto=&quot;light&quot;</code>{" "}
        first to prove the setup, then move to GEPA once
        you can write a useful feedback function. Log
        every run to MLflow. Version the compiled JSON as
        code. Once the pattern works for one task, roll it
        out to the next one. That is the DSPy adoption
        curve, and it holds up in mid-2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://dspy.ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy official documentation
          </a>
          {" "}- the getting started guide, the module and
          optimizer references, the timeline of releases,
          and the production case list.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2507.19457"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agrawal et al., GEPA: Reflective Prompt
            Evolution Can Outperform Reinforcement Learning
            (arXiv:2507.19457, ICLR 2026 Oral)
          </a>
          {" "}- the paper that introduced the GEPA
          optimizer, including the 6 to 20% gains over GRPO
          at 35x fewer rollouts and the AIME-2025 result.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2310.03714"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khattab et al., DSPy: Compiling Declarative
            Language Model Calls into Self-Improving
            Pipelines (arXiv:2310.03714)
          </a>
          {" "}- the original DSPy paper. Still the
          clearest read on why signatures and modules exist.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2406.11695"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Opsahl-Ong et al., MIPROv2: Optimizing
            Instructions and Demonstrations
            (arXiv:2406.11695)
          </a>
          {" "}- the paper behind the MIPROv2 optimizer,
          with the joint search and Bayesian optimization
          details.
        </li>
        <li>
          <a
            href="https://dropbox.tech/machine-learning/optimizing-dropbox-dash-relevance-judge-with-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dropbox: How we optimized Dash&rsquo;s
            relevance judge with DSPy (March 17, 2026)
          </a>
          {" "}- the deepest public production case study.
          Covers the GEPA feedback function, the guardrails
          against overfitting, the 45% NMSE reduction, and
          the incremental-improvement pattern for the
          production o3 judge.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/dspy-databricks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: DSPy at Databricks
          </a>
          {" "}- the Databricks blog on how DSPy is used
          internally and by customers, including LM
          judges, RAG, and classification.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Optimizing LLM pipelines with DSPy
            (JetBlue case study)
          </a>
          {" "}- multi-tool agent pattern on Databricks
          Model Serving with DSPy compiling the prompts.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/machine-learning/improve-amazon-nova-migration-performance-with-data-aware-prompt-optimization/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Improve Amazon Nova migration with
            data-aware prompt optimization
          </a>
          {" "}- the AWS Machine Learning Blog on using
          DSPy to move prompts from bigger to smaller Nova
          models with measurable quality and cost outcomes.
        </li>
        <li>
          <a
            href="https://blog.replit.com/code-repair"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replit: Building a code-repair pipeline with
            DSPy
          </a>
          {" "}- the engineering write-up on synthesizing
          diffs with a code LLM inside a compiled DSPy
          program.
        </li>
        <li>
          <a
            href="https://github.com/stanfordnlp/dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            stanfordnlp/dspy on GitHub
          </a>
          {" "}- the source, the release notes, and the
          discussion of the latest 3.x betas.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the framework most DSPy production teams
          pair with when they need a stateful workflow
          around the compiled program.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the metric and tracing story that DSPy
          programs need to be worth compiling.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol DSPy 3&rsquo;s ReAct module
          uses to wire in private tools.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on prompt structure,
          brief compression, and why a compiler-style
          approach beats hand-tuning at scale.
        </li>
      </ul>
    </div>
  );
}
