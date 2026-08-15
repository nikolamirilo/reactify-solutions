import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "dspy-3-production-2026",
  title:
    "DSPy 3 in production 2026: programming LLM pipelines instead of prompting them",
  excerpt:
    "How Stanford&rsquo;s DSPy grew from a research library into a production framework used at Databricks, JetBlue, Nubank, and Replit. Covers the three pillars (signatures, modules, optimizers), the shift from BootstrapFewShot to MIPROv2 to the 2026 GEPA reflective optimizer, ReActV2 and MCP tool support, MLflow deployment, and the honest trade-offs against LangChain and hand-tuned prompts.",
  metaDescription:
    "A practical, technical guide to DSPy 3 in production for 2026. Covers signatures, modules, ReActV2 with MCP tool calling, MIPROv2 and GEPA optimizers, the Nubank 100M-user case study, JetBlue&rsquo;s 2x faster RAG deployment, MLflow deployment, asyncify and streaming for FastAPI, prompt caching interactions, and when DSPy is the right pick versus LangChain, LlamaIndex, and hand-written prompts.",
  image:
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2400&q=80",
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
    "Prompt Optimization",
    "MLflow",
    "MCP",
    "Databricks",
    "Production",
    "LLM",
  ],
  publishDate: "2026-08-15",
  readingTime: "17 min read",
};

export default function Dspy3Production2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most teams still ship LLM features the same way they
        shipped them in 2023: write a prompt, run it, edit
        the prompt, run it again. That loop works for a demo
        and breaks the day the model changes. DSPy is the
        answer Stanford&rsquo;s NLP group and a growing
        community of production teams settled on for that
        problem. You write the shape of your task in Python,
        wire up a metric, and let a compiler figure out what
        the prompt should say. In 2026 the framework has
        matured into DSPy 3, added a new reflective
        optimizer called GEPA that beats reinforcement
        learning while spending 35 times fewer model calls,
        and ships in production at Databricks, JetBlue,
        Nubank, Replit, and Shopify. This article is how we
        use DSPy on client work: the three pillars, the
        optimizer ladder, the ReActV2 agent path with MCP,
        and when to reach for it instead of hand-writing
        prompts or wiring LangChain.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why DSPy exists and why it grew up in 2025
      </h2>
      <p className="mb-6 leading-relaxed">
        The tagline on the DSPy site reads &ldquo;program,
        do not prompt, your LLMs.&rdquo; That is not
        marketing, it is a design choice. In a normal LLM
        app the prompt is a string. Every model swap, every
        instruction tweak, every new few-shot example is a
        manual string edit. In a DSPy app the prompt is a
        compiled artefact. You write a signature that says
        what the task takes in and what it produces, wrap it
        in a module, hand the module a training set and a
        metric, and an optimizer produces the prompt (and
        the demonstrations, and sometimes the model weights)
        that scores best on the metric. When the model
        version changes, you recompile.
      </p>
      <p className="mb-6 leading-relaxed">
        The library shipped in October 2023 out of
        Matei Zaharia&rsquo;s lab at Stanford, with Omar
        Khattab leading the design. For a year and a half
        the audience was mostly researchers and a small set
        of early adopters. That changed in mid-2025. DSPy 3
        arrived at Databricks Data + AI Summit in June 2025
        with typed signatures, proper streaming, async
        serving, and MLflow integration. A month later the
        GEPA paper hit arXiv, then ICLR 2026, and the
        optimizer story went from &ldquo;interesting for
        classifiers&rdquo; to &ldquo;actually works on
        agents.&rdquo; By the end of 2025 the docs listed
        production deployments at JetBlue, Moody&rsquo;s,
        VMware, Sephora, Replit, Dropbox, and AWS. The
        3.3.0 release in mid-2026 added a ReActV2 module
        with native tool calling, an explicit typed LM
        boundary, and prompt-caching-friendly history
        objects. That is when the &ldquo;write it in DSPy
        first&rdquo; posture became the default on our
        client work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three pillars: signatures, modules, optimizers
      </h2>
      <p className="mb-6 leading-relaxed">
        Every DSPy program is built from three things.
        Signatures are the type contract between your code
        and the model. Modules are the reusable prompting
        techniques (Predict, ChainOfThought, ReAct) that
        take a signature and produce an LLM call. Optimizers
        take a module, a dataset, and a metric, and produce
        a better version of the module. That is the whole
        idea. Everything else in the library is a variation
        on those three.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy: the compile loop"
        code={`+---------------------------------------------------+
|  1. Declare the shape (Signature)                 |
|                                                   |
|    "question -> reasoning, answer"                |
|                                                   |
+--------------------|------------------------------+
                     v
+---------------------------------------------------+
|  2. Pick a technique (Module)                     |
|                                                   |
|    dspy.ChainOfThought  /  dspy.ReAct  /  ...     |
|                                                   |
+--------------------|------------------------------+
                     v
+---------------------------------------------------+
|  3. Compile against a metric (Optimizer)          |
|                                                   |
|    BootstrapFewShot -> MIPROv2 -> GEPA            |
|                                                   |
|    trainset + metric -> optimized program         |
|                                                   |
+--------------------|------------------------------+
                     v
+---------------------------------------------------+
|  4. Deploy (MLflow, FastAPI, streaming)           |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        A signature can be as short as a one-line string
        (<code>&quot;document -&gt; summary&quot;</code>) or a
        full Pydantic-typed class with docstrings, field
        descriptions, and nested custom types. The typed
        version is what you want in production because the
        adapter layer converts the signature into the
        provider&rsquo;s native tool schema, and the parser
        knows how to reject malformed outputs before they
        reach your code.
      </p>
      <CodeBlock
        language="python"
        filename="src/pipelines/support_classifier.py"
        code={`import dspy
from typing import Literal
from pydantic import BaseModel, Field


class Ticket(BaseModel):
    subject: str
    body: str
    customer_tier: Literal["free", "pro", "enterprise"]


class Routing(BaseModel):
    queue: Literal["billing", "technical", "abuse", "general"]
    priority: Literal["p0", "p1", "p2", "p3"]
    tags: list[str] = Field(default_factory=list)


class RouteTicket(dspy.Signature):
    """Route a support ticket to the correct queue and priority.

    Enterprise tier tickets never go below p1. Billing tickets
    that mention refund or chargeback are always p1.
    """

    ticket: Ticket = dspy.InputField()
    routing: Routing = dspy.OutputField(
        desc="Structured routing decision with queue and priority."
    )


# Configure the LM once, use it everywhere.
dspy.configure(lm=dspy.LM("openai/gpt-5.1", temperature=0.0))

router = dspy.ChainOfThought(RouteTicket)

result = router(ticket=Ticket(
    subject="Cannot access the API after last invoice",
    body="Getting 402 responses since Tuesday.",
    customer_tier="enterprise",
))

print(result.routing)          # -> Routing(queue='billing', priority='p1', tags=['api', 'access'])
print(result.reasoning)        # -> the chain-of-thought DSPy adds for free`}
      />
      <p className="mb-6 leading-relaxed">
        Three things are worth noticing in that example.
        The prompt is nowhere in your code. The output is
        a typed Pydantic object, not a string you have to
        parse. And <code>ChainOfThought</code> adds a
        <code>reasoning</code> field to the signature
        automatically, which is what gives it the accuracy
        lift over plain <code>Predict</code>. Swap
        <code>dspy.ChainOfThought</code> for
        <code>dspy.Predict</code> and the same code runs
        without the reasoning step, which is the version
        you want when latency matters more than accuracy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Optimizers: the compiler that makes DSPy worth using
      </h2>
      <p className="mb-6 leading-relaxed">
        A signature and a module by themselves give you a
        clean way to call an LLM with typed inputs and
        outputs. The reason to actually adopt DSPy is the
        optimizer layer, which is what people mean when
        they say &ldquo;DSPy compiles your program.&rdquo;
        You give the compiler a training set (as few as
        20 examples for the cheaper optimizers) and a
        metric function, and it searches over
        instructions, demonstrations, and sometimes model
        choices to find the version of your module that
        scores highest on the metric.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2026 ladder has three rungs you will actually
        reach for.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>BootstrapFewShot</strong>. The starter
          optimizer. It runs your program on the training
          set with a strong teacher model, keeps the
          traces where the metric passes, and stuffs the
          best ones into the prompt as few-shot
          demonstrations. Cheap, fast, and the right first
          thing to try on any new pipeline. Usually gives
          a 5 to 15 point lift on structured tasks.
        </li>
        <li>
          <strong>MIPROv2</strong> (Multi-prompt
          Instruction PRoposal Optimizer, version 2).
          Jointly tunes the instruction text and the
          few-shot examples for every predictor in your
          program using Bayesian optimization. This is
          the workhorse when the metric is stable and
          the demos alone are not enough. Costs 3 to 10
          times more compute than BootstrapFewShot but
          reliably beats it when the instruction wording
          matters.
        </li>
        <li>
          <strong>GEPA</strong> (Genetic-Pareto). The
          reflective optimizer introduced at ICLR 2026.
          Instead of scoring candidates and picking the
          best, it feeds the failing examples plus the
          error messages back to a language model, which
          proposes targeted rewrites of the prompt. Then
          it evolves those rewrites across a
          Pareto-frontier of trade-offs. The published
          numbers: up to 20 percent better than the
          GRPO reinforcement-learning baseline while
          using 35 times fewer model rollouts. In
          practice it is the first optimizer that works
          well on agents with tools, because it can
          read the tool-error traces and rewrite the
          instructions to avoid the same mistake.
        </li>
      </ul>
      <CodeBlock
        language="python"
        filename="src/pipelines/optimize.py"
        code={`import dspy
from support_classifier import router, Ticket

# Load a small hand-labeled dataset.
trainset = [
    dspy.Example(
        ticket=Ticket(subject="Refund on last invoice", body="...",
                      customer_tier="pro"),
        routing={"queue": "billing", "priority": "p1", "tags": ["refund"]},
    ).with_inputs("ticket"),
    # ... 40 more examples ...
]


def routing_accuracy(example, pred, trace=None) -> float:
    """Exact match on queue plus priority within one step."""
    gold = example.routing
    got = pred.routing.model_dump()
    queue_ok = got["queue"] == gold["queue"]
    prio_gap = abs(int(got["priority"][1]) - int(gold["priority"][1]))
    return float(queue_ok and prio_gap <= 1)


# 1. Cheap first pass: bootstrap few-shot demos.
demos = dspy.BootstrapFewShot(metric=routing_accuracy, max_bootstrapped_demos=6)
routed = demos.compile(router, trainset=trainset)

# 2. Joint search over instructions and demos when demos alone plateau.
mipro = dspy.MIPROv2(metric=routing_accuracy, auto="medium")
routed = mipro.compile(routed, trainset=trainset)

# 3. Reflective pass when you have a metric that can return feedback.
def routing_feedback(example, pred, trace=None):
    score = routing_accuracy(example, pred)
    if score == 1.0:
        return score, "ok"
    return score, (
        f"Wrong routing. Predicted {pred.routing}, expected {example.routing}. "
        "Look at the customer_tier and any refund/chargeback wording."
    )

gepa = dspy.GEPA(metric=routing_feedback, auto="light",
                 reflection_lm=dspy.LM("openai/gpt-5.1-pro"))
routed = gepa.compile(routed, trainset=trainset)

routed.save("artifacts/router.v3.json")`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern is the same on every project: run the
        cheap optimizer first, look at the score, only pay
        for the expensive one when the cheap one plateaus.
        The GEPA step needs a metric that can return a
        second value (a string of feedback), which is what
        the reflective LM reads to propose the next
        candidate. That is what makes it so much more
        sample-efficient than blind search.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        GEPA in depth: the 100M-user proof
      </h2>
      <p className="mb-6 leading-relaxed">
        Nubank published the strongest public GEPA case
        study in late 2025. The team runs customer support
        AI agents at 100 million users, and their internal
        eval is an LLM-as-a-judge pipeline that scores
        the agent&rsquo;s replies against a rubric. They
        used GEPA inside DSPy to optimize the judge prompts
        themselves. The judge accuracy on their E2 eval
        went from 68.88 percent to 88.89 percent, and the
        Cohen&rsquo;s κ agreement between GPT-4.1 and
        GPT-4.1-mini went from 0.00 (chance) to 0.745
        (strong agreement). The tuned judges then drove
        prompt iteration on the production agents, and the
        downstream wins landed at +37 points on AI
        transactional NPS and +29 points on self-service
        rate across five deployed support domains.
      </p>
      <p className="mb-6 leading-relaxed">
        Two things about that number matter. First, GEPA
        did not touch the customer-facing agent directly,
        it improved the judge that scored it. That is the
        pattern that shows up over and over with GEPA in
        production: the biggest wins come from optimizing
        the eval layer, so every subsequent pass on the
        real prompts has a trustworthy signal. Second, the
        rollout budget was low. A team on Databricks
        infrastructure at 100M-user scale did not need a
        GPU cluster for RL, they needed a few thousand
        judge calls and a reflective LM that could read
        the failures.
      </p>
      <p className="mb-6 leading-relaxed">
        Decagon published a companion write-up on
        &ldquo;test-driven prompt engineering&rdquo; with
        GEPA around the same time. Their internal takeaway
        matches ours: GEPA feels less like an optimizer and
        more like a code review of your prompts run at
        scale. It works because the feedback string in
        your metric is what the reflective LM actually
        reads. Vague metrics (&ldquo;score = 0 or 1&rdquo;)
        give vague rewrites. Rich metrics (&ldquo;score,
        plus the exact failure mode and the input that
        triggered it&rdquo;) give sharp ones.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agents in DSPy: ReAct, ReActV2, and MCP tools
      </h2>
      <p className="mb-6 leading-relaxed">
        The agent path in DSPy is <code>dspy.ReAct</code>
        (the original) and <code>dspy.ReActV2</code>
        (added in the 3.3.0 release, mid-2026). Both take a
        signature and a list of tools, then run a
        tool-calling loop until the model calls the
        internal <code>submit</code> tool with the final
        answer. The V2 upgrade is that the loop now uses
        the provider&rsquo;s native tool-calling API
        (OpenAI Responses, Anthropic tool_use, Gemini
        function calling), preserves tool call IDs across
        turns, supports parallel tool calls when the
        adapter enables them, and stores the trajectory as
        a structured <code>dspy.History</code> object
        instead of a formatted string. The history change
        matters because it makes the prefix stable enough
        for prompt caching to actually work across turns.
      </p>
      <p className="mb-6 leading-relaxed">
        DSPy tools are just Python callables wrapped in
        <code>dspy.Tool</code>. The MCP integration is a
        one-line helper that converts an MCP tool
        definition into a <code>dspy.Tool</code>, which
        means any MCP server (Notion, GitHub, Postgres,
        Sentry, custom) drops straight into a ReActV2
        agent.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/support_agent.py"
        code={`import asyncio
import dspy
from mcp import ClientSession
from mcp.client.stdio import stdio_client, StdioServerParameters


class AnswerSupport(dspy.Signature):
    """Answer a support question using the internal tools available.

    Always look up the customer's plan and last invoice before
    quoting policy. Never guess a refund amount.
    """

    question: str = dspy.InputField()
    answer: str = dspy.OutputField()


async def build_agent():
    server = StdioServerParameters(
        command="uvx", args=["mcp-server-billing"],
    )
    async with stdio_client(server) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            listed = await session.list_tools()
            tools = [
                dspy.Tool.from_mcp_tool(session, t)
                for t in listed.tools
            ]
            return dspy.ReActV2(AnswerSupport, tools=tools, max_iters=6)


agent = asyncio.run(build_agent())
result = agent(question="Refund my October invoice, plan is Pro annual.")
print(result.answer)`}
      />
      <p className="mb-6 leading-relaxed">
        The agent is a normal DSPy module, which means the
        optimizer story applies to it too. You can compile
        it with MIPROv2 or GEPA against a metric that
        rewards correct answers and penalizes tool-call
        loops. On our own client work the biggest wins from
        GEPA on agents come from the reflective LM reading
        the tool error messages and rewriting the module
        instructions to explain what the tool actually
        expects.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deployment: MLflow, asyncify, streaming, FastAPI
      </h2>
      <p className="mb-6 leading-relaxed">
        A compiled DSPy program serializes to a single
        JSON file (or a pickle via MLflow), which is what
        makes the deployment story clean. You compile in a
        notebook or a CI job, save the artefact, then load
        it in the serving process. There is no prompt
        template to sync between environments, and no
        &ldquo;prompt lives in a Notion doc&rdquo; problem.
      </p>
      <CodeBlock
        language="python"
        filename="src/serving/app.py"
        code={`import dspy
import mlflow
from fastapi import FastAPI
from pydantic import BaseModel


# Reload the compiled router in the serving process.
lm = dspy.LM("openai/gpt-5.1", temperature=0.0, cache=True)
dspy.configure(lm=lm)

router = dspy.ChainOfThought("ticket -> routing")
router.load("artifacts/router.v3.json")

# Turn the synchronous program into an async worker pool
# so FastAPI can serve many requests concurrently.
routed_async = dspy.asyncify(router)


class TicketIn(BaseModel):
    subject: str
    body: str
    customer_tier: str


app = FastAPI()


@app.post("/route")
async def route(ticket: TicketIn):
    result = await routed_async(ticket=ticket.model_dump())
    return result.routing.model_dump()


# Optional: log the model to MLflow so the eval pipeline can
# score it before promotion.
with mlflow.start_run():
    mlflow.dspy.log_model(router, artifact_path="router",
                          input_example={"ticket": {"subject": "..."}})`}
      />
      <p className="mb-6 leading-relaxed">
        Three production notes on that snippet. The
        <code>cache=True</code> flag on the LM turns on
        DSPy&rsquo;s local prompt cache, which is separate
        from the provider prompt cache but very useful in
        eval and CI. The <code>asyncify</code> call
        wraps the synchronous program in a thread-pool
        worker with a configurable size (default 8), so
        FastAPI does not block on a slow LM call.
        <code>dspy.streamify</code> is the sibling helper
        when you want to yield tokens to the client
        instead of returning a full result; MLflow&rsquo;s
        DSPy flavor supports streaming since 2.6.23.
      </p>
      <p className="mb-6 leading-relaxed">
        For the eval side, the MLflow DSPy flavor logs the
        program alongside a signature and input example.
        You can run <code>mlflow.evaluate</code> on it
        with the same metric you used at compile time,
        which is what closes the loop between offline
        optimization and production monitoring. When the
        production score drifts, you know to recompile.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        JetBlue: 2x faster RAG, no more manual prompts
      </h2>
      <p className="mb-6 leading-relaxed">
        JetBlue&rsquo;s public case study on Databricks is
        the cleanest example of what DSPy buys a
        traditional enterprise team. They had a multi-stage
        LLM pipeline for customer feedback classification
        and a RAG-powered predictive maintenance chatbot,
        both originally built on LangChain. The manual
        prompt-tuning across the stages was where they
        were losing time: every model swap or new domain
        forced another round of prompt edits, and the
        quality bar was set by whoever last touched the
        prompts. Moving the pipeline to DSPy let them wire
        the stages together as modules, define a metric
        (LLM-as-a-judge on the answer quality), and let
        MIPROv2 tune the instructions and demos across
        every stage at once.
      </p>
      <p className="mb-6 leading-relaxed">
        The reported wins were 2x faster deployment of a
        RAG chatbot compared to their previous LangChain
        setup, zero manual prompt engineering after the
        initial signature design, and reproducible quality
        because the compile step is deterministic given
        the same seed and dataset. The pattern generalizes:
        DSPy is worth the switch when you have multiple
        LLM stages, a scorable metric, and enough data
        (even 30 to 100 examples) to compile against.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When DSPy is the right pick (and when it is not)
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2026 comparison people keep asking about is
        DSPy against LangChain. The framing that works: the
        two libraries solve different problems. LangChain
        (with LangGraph) is orchestration, it gives you
        control flow, memory adapters, tool wrappers, and
        a runtime graph. DSPy is optimization, it gives
        you a compile step that produces the prompt itself.
        The teams that get the most out of both use them
        together: LangGraph for the agent runtime,
        DSPy-compiled modules as the nodes inside the
        graph. That is the pattern Databricks documents
        for its own LLM pipelines, and it is where our
        client work has landed.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Reach for DSPy when</strong>: you have a
        task with a clear metric, you can produce 20 to
        200 labeled examples (or write a good
        LLM-as-a-judge to produce them), you plan to swap
        models more than once in the next year, or you are
        running a multi-stage pipeline where the errors
        stack up. Classifiers, routers, extractors, judges,
        RAG answer synthesizers, and multi-hop agents are
        the sweet spot.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Skip DSPy when</strong>: the task is a
        one-shot creative task with no metric (a marketing
        copy generator, a chat companion), the model
        vendor lock is not going to change, or the pipeline
        is a single call that a hand-written prompt with
        prompt caching handles just fine. The compile step
        is real overhead. Do not pay for it if the task
        does not have anything to compile against.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations we have run into
      </h2>
      <p className="mb-6 leading-relaxed">
        The wins are the ones the docs promise. Model
        portability actually works: recompiling a program
        against a new model (say, moving from Claude 4.5
        to GPT-5.1) usually finishes in an hour and lands
        within a point or two of the original score, and
        we have never had a case where the swap needed a
        code change beyond the LM string. The typed
        signature layer catches malformed outputs before
        they hit the caller. The MLflow integration means
        the promotion pipeline for a compiled program
        looks the same as for a classical ML model, which
        is a big deal for regulated deployments.
      </p>
      <p className="mb-6 leading-relaxed">
        The friction is real too. The compile step is
        opaque, and when GEPA proposes an instruction that
        drops the score you have to read the trace to
        figure out why (the DSPy history viewer is the
        right tool, but the learning curve is real). The
        error messages from typed signatures can be blunt
        when a provider returns near-miss JSON. Async and
        streaming are supported but need care because the
        <code>asyncify</code> worker pool is a hard cap,
        and if you set it too low your FastAPI service
        will queue requests instead of scaling out. And
        the ecosystem is smaller than LangChain&rsquo;s;
        you will occasionally write an adapter or a tool
        wrapper yourself.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where DSPy is heading in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three trends are worth watching for the rest of
        2026 and into 2027. First, the GEPA line is
        replacing hand-written prompts in the same way
        gradient descent replaced hand-tuned features. The
        follow-up papers already show variants tuning
        code, agent tool descriptions, and even MCP server
        schemas with the same reflective loop. Second, the
        DSPy typed LM boundary that landed in 3.3.0 is
        setting up the framework for native tool-calling
        parity across every major provider, which is the
        piece that has held back cross-provider agents
        until now. Third, the &ldquo;compile once, deploy
        anywhere&rdquo; story is starting to include
        distillation: the DSPy team has published traces
        of MIPROv2 compiling a program on GPT-5.1, then
        using those traces to fine-tune an open-weights
        model that matches within a few points, at a
        fraction of the serving cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy in 2026 is what the &ldquo;program, do not
        prompt&rdquo; message actually looks like once the
        library, the optimizers, the deployment story, and
        the case studies are all in place. Signatures give
        you the type contract, modules give you the
        prompting technique, and the optimizer ladder
        (BootstrapFewShot, MIPROv2, GEPA) gives you a
        compile step that produces prompts a hand-written
        version usually cannot match. The Nubank and
        JetBlue numbers are what closed the argument for
        production teams: 20-point judge accuracy lifts,
        2x faster RAG deployment, and a compile artefact
        that survives a model swap without a rewrite.
      </p>
      <p className="mb-6 leading-relaxed">
        On new work we now start with a DSPy signature and
        a metric before we write the first prompt. When
        the task is a simple single call with no metric,
        we still hand-write and cache the prompt. When it
        is anything with stages, tools, or a judge in the
        loop, DSPy is the shortest path to a program you
        can compile, evaluate, and swap models on for the
        next two years without repainting the pipeline
        every quarter.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://github.com/stanfordnlp/dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            stanfordnlp/dspy on GitHub
          </a>
          {" "}- the source repo, with the DSPy 3.3.0
          release notes covering ReActV2, the typed LM
          boundary, and the OpenAI Responses tool-calling
          path.
        </li>
        <li>
          <a
            href="https://github.com/stanfordnlp/dspy/releases"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy releases page
          </a>
          {" "}- the change log with every 3.x release, the
          ReActV2 write-up, and the LM refactor notes that
          shipped through 2026.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/dspy-databricks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: DSPy on Databricks
          </a>
          {" "}- the official write-up on how Databricks
          runs DSPy in production with MLflow, plus the
          JetBlue case study on 2x faster RAG deployment
          and zero manual prompt engineering.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Optimizing Databricks LLM pipelines
            with DSPy
          </a>
          {" "}- the end-to-end walkthrough of a compiled
          DSPy pipeline running on Databricks Model
          Serving, with MIPROv2 and MLflow tracking.
        </li>
        <li>
          <a
            href="https://github.com/gepa-ai/gepa"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            gepa-ai/gepa on GitHub
          </a>
          {" "}- the reference implementation of GEPA, the
          reflective optimizer, with the ICLR 2026 paper
          reference and the Nubank case study numbers.
        </li>
        <li>
          <a
            href="https://decagon.ai/blog/optimizing-gepa-for-production"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Decagon: Optimizing GEPA for production
          </a>
          {" "}- the test-driven approach to prompt
          engineering with GEPA, and why rich metric
          feedback is what makes reflective optimization
          converge.
        </li>
        <li>
          <a
            href="https://www.zenml.io/llmops-database/automated-llm-pipeline-optimization-with-dspy-for-multi-stage-agent-development"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ZenML LLMOps DB: JetBlue automated LLM pipeline
            optimization with DSPy
          </a>
          {" "}- the third-party summary of the JetBlue
          case study with the pipeline diagram and the
          MIPROv2 rollout details.
        </li>
        <li>
          <a
            href="https://mlflow.org/docs/latest/genai/flavors/dspy/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLflow: DSPy flavor documentation
          </a>
          {" "}- how to log, evaluate, and serve compiled
          DSPy programs through MLflow, including streaming
          support since 2.6.23.
        </li>
        <li>
          <a
            href="https://arxiv.org/pdf/2310.03714"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy: Compiling declarative language model calls
            into self-improving pipelines (arXiv)
          </a>
          {" "}- the original 2023 paper from the Stanford
          NLP group that introduced signatures, modules,
          and the compile step.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the companion read on prompt caching,
          brief compression, and why the DSPy history
          refactor matters for cache reuse.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the deeper read on LLM-as-a-judge, the
          Nubank pattern, and why optimizing the judge
          first is worth more than optimizing the agent.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol that ReActV2 uses through
          <code>dspy.Tool.from_mcp_tool</code> to hook
          into any MCP server.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the orchestration framework that pairs
          well with DSPy-compiled modules as graph nodes.
        </li>
      </ul>
    </div>
  );
}
