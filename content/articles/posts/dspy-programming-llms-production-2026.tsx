import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "dspy-programming-llms-production-2026",
  title:
    "DSPy in production 2026: programming (not prompting) LLMs at scale",
  excerpt:
    "How DSPy turned into the default framework for teams that are tired of writing prompt strings. Covers signatures, modules, and the optimizer family (BootstrapFewShot, MIPROv2, GEPA, SIMBA, GRPO), the 3.0 release with async, streaming, and MLflow, production stories from JetBlue, Shopify, Databricks, Dropbox, and Nubank, and an honest read on when to pick DSPy over LangChain, LangGraph, or Pydantic AI.",
  metaDescription:
    "A practical, technical guide to DSPy in 2026. Covers the Signature and Module primitives, the ChainOfThought and ReAct modules, the optimizer family from BootstrapFewShot to GEPA, the DSPy 3.0 release with async, streaming, adapters, and MLflow 3.0 tracing, deployment on FastAPI and MLflow Model Serving, production case studies at JetBlue (2x faster RAG deployment), Shopify (550x cost reduction), Nubank (+37pp NPS with GEPA), Dropbox, and Databricks, plus an honest comparison with LangChain, LangGraph, Pydantic AI, and LlamaIndex for teams choosing a Python agent stack.",
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
    "Prompt Optimization",
    "GEPA",
    "MIPROv2",
    "MLflow",
    "Python",
    "Production",
    "Stanford",
    "Databricks",
  ],
  publishDate: "2026-08-23",
  readingTime: "17 min read",
};

export default function DspyProgrammingLlmsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        A lot of teams spent 2024 and 2025 writing prompt
        strings, running them by hand, tweaking a comma, and
        running them again. By the middle of 2026 a different
        way to build LLM systems has quietly taken over on
        serious engineering teams. You write a Python program
        with typed inputs and outputs, you compose small
        modules, and a compiler figures out the prompt and
        the few-shot examples for you. The framework is DSPy,
        it comes out of Stanford, it now ships from Databricks
        as well, and it is in production at Shopify, JetBlue,
        Dropbox, Moody{"'"}s, Replit, Sephora, VMware, AWS,
        and Nubank. This article is how we use DSPy on client
        work in 2026, what the 3.0 release changed, which
        optimizer to reach for, and where DSPy fits next to
        LangChain, LangGraph, and Pydantic AI.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why programming beats prompting
      </h2>
      <p className="mb-6 leading-relaxed">
        A prompt is a string. Strings do not compose, do not
        type-check, and do not survive a model swap. Change
        the model from GPT-4o to Claude Sonnet 4.5 and the
        careful few-shot block you tuned for one is now a
        drag on the other. Change one sentence in the middle
        of a long system prompt and half of your evals shift.
        The people running the model change the model twice
        a year on average, and every change puts your string
        back on the workbench.
      </p>
      <p className="mb-6 leading-relaxed">
        DSPy takes the other side of the bet. You describe
        what the LLM call should do with a typed Signature,
        you wrap it in a Module (Predict, ChainOfThought,
        ReAct, or your own), and you compose modules into a
        pipeline the same way you would compose Python
        functions. Then you hand the pipeline to an optimizer
        together with a small dataset and a metric. The
        optimizer writes the prompt. It picks the few-shot
        examples. It runs a search over instruction phrasing
        that would take a person weeks to try by hand. When
        the underlying model changes, you recompile.
      </p>
      <p className="mb-6 leading-relaxed">
        The DSPy tagline is honest about the trade this
        makes: build modular AI systems in declarative Python,
        then let the framework optimize the prompts and
        weights for you. You give up the illusion that the
        prompt is your artifact. You get back a program that
        keeps working when the underlying model moves.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 state of the framework
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>DSPy 3.0 shipped at Data + AI Summit in
          August 2025</strong> with native async, streaming
          from any module, thread-safe batch execution, and
          MLflow 3.0 tracing baked in. Point releases through
          the 3.x line added the GEPA optimizer, richer
          adapters (Chat, JSON, XML, BAML), and
          multimodal signatures with{" "}
          <code>dspy.Image</code> and <code>dspy.Audio</code>.
        </li>
        <li>
          <strong>Databricks is now the second sponsor of the
          project</strong> next to Stanford. Omar Khattab, the
          original DSPy author, joined Databricks as a
          Research Scientist before starting as MIT faculty
          in July 2025, and Databricks funds development,
          runs DSPy inside its own LM judges and RAG
          products, and ships the framework in Mosaic AI.
        </li>
        <li>
          <strong>GEPA, the reflective prompt evolution
          optimizer, was accepted at ICLR 2026 as an oral
          paper.</strong> Across four tasks it beats GRPO
          (reinforcement learning on prompts) by 10 percent
          on average and up to 20 percent, while using up to
          35x fewer rollouts. It is now the default optimizer
          for agentic tasks in DSPy.
        </li>
        <li>
          <strong>Production case studies now come from real
          product teams</strong>, not just research demos.
          JetBlue reports 2x faster RAG chatbot deployment
          after moving off LangChain to a DSPy pipeline on
          Databricks. Shopify hit a ~550x cost reduction on
          metadata extraction across all shops. Nubank ran
          GEPA on LLM-as-a-Judge prompts and reports +37
          points on AI transactional NPS and +29 points on
          self-service rate across five deployed domains.
        </li>
        <li>
          <strong>The community use-case list is long.</strong>{" "}
          Dropbox uses DSPy for the Dash relevance judge,
          Moody{"'"}s runs a RAG system on it, Replit uses it
          for the code assistant, and AWS ships tutorials
          for Bedrock users. DSPy is on the production stack
          at Shopify, Databricks, Dropbox, JetBlue, Moody{"'"}s,
          Replit, AWS, Sephora, VMware, Nubank, and dozens
          more.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Signatures, modules, optimizers: the three primitives
      </h2>
      <p className="mb-6 leading-relaxed">
        The whole framework fits in three ideas. A{" "}
        <strong>Signature</strong> is the interface: what
        the LLM call takes in and what it returns, with types
        and short descriptions. A <strong>Module</strong> is
        the strategy: does the call reason step by step, does
        it call tools, does it re-check its own answer. An{" "}
        <strong>Optimizer</strong> is a compiler: it takes
        your program, a small labelled dataset, and a metric,
        and it writes the prompt and picks the few-shot
        demos.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy: the shared three-layer shape"
        code={`+---------------------------------------------------+
|  Signature (interface, typed)                     |
|   class Classify(dspy.Signature):                 |
|     """Classify a support ticket."""              |
|     ticket: str = dspy.InputField()               |
|     category: Literal["bug","billing","other"]    |
|       = dspy.OutputField()                        |
+-----------------------+---------------------------+
                        v
+---------------------------------------------------+
|  Module (strategy)                                |
|   dspy.Predict(Classify)          # one shot      |
|   dspy.ChainOfThought(Classify)   # + reasoning   |
|   dspy.ReAct(Classify, tools=[])  # + tool loop   |
+-----------------------+---------------------------+
                        v
+---------------------------------------------------+
|  Optimizer (compiler)                             |
|   BootstrapFewShot -> picks few-shot demos        |
|   MIPROv2          -> instructions + demos +      |
|                       Bayesian search             |
|   GEPA             -> reflective prompt evolution |
|   SIMBA            -> learns from custom feedback |
|   GRPO             -> RL on prompts via Arbor     |
|   COPRO            -> instruction-only refinement |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Every DSPy program you write ends up as a
        composition of Modules that share Signatures. The
        strings that go to the LLM never live in your code.
        They live inside the modules, and they get replaced
        whenever you compile. This is what makes the code
        survive a model swap: the model changes, the
        Signature does not, the pipeline does not, only the
        prompt gets rewritten.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A working example: a typed classifier with reasoning
      </h2>
      <p className="mb-6 leading-relaxed">
        The shortest useful DSPy program is a classifier with
        a reasoning step. It is the pattern behind LLM-as-a-
        Judge, ticket routing, feedback categorization, and
        content moderation. Here is what it looks like in
        practice with DSPy 3.x.
      </p>
      <CodeBlock
        language="python"
        filename="src/classify/support_ticket.py"
        code={`import dspy
from typing import Literal

# 1. Configure the language model once, globally.
lm = dspy.LM("openai/gpt-4o-mini", temperature=0.0)
dspy.configure(lm=lm)

# 2. Declare the interface, typed.
class ClassifyTicket(dspy.Signature):
    """Classify a customer support ticket into one bucket."""

    ticket: str = dspy.InputField(
        desc="Raw text of the customer message."
    )
    category: Literal[
        "bug", "billing", "account", "feature_request", "other"
    ] = dspy.OutputField(
        desc="One label from the fixed set."
    )
    confidence: float = dspy.OutputField(
        desc="0.0 to 1.0 confidence in the label."
    )

# 3. Pick a module. ChainOfThought adds a reasoning field
# the LM fills in before the answer.
classify = dspy.ChainOfThought(ClassifyTicket)

# 4. Call it. Output is a validated Pydantic-style object.
result = classify(
    ticket="I was charged twice for my June invoice."
)
print(result.category)     # "billing"
print(result.confidence)   # 0.94
print(result.reasoning)    # "The user reports a double charge..."`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth flagging. The Signature is the
        contract, so the framework validates the output types
        before your code sees them. And the module is
        interchangeable: swap{" "}
        <code>dspy.ChainOfThought</code> for{" "}
        <code>dspy.Predict</code> and you drop the reasoning
        step without touching the Signature, the call, or
        the caller.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Compiling the pipeline with an optimizer
      </h2>
      <p className="mb-6 leading-relaxed">
        The classifier above works uncompiled, on the raw
        model. What DSPy adds is a compile step. You hand it
        a small labelled dataset, a metric that scores an
        output against a label, and it rewrites the module{"'"}s
        internal prompt to squeeze more accuracy out of the
        same model.
      </p>
      <CodeBlock
        language="python"
        filename="src/classify/compile.py"
        code={`import dspy
from src.classify.support_ticket import ClassifyTicket, classify

# 1. Small labelled set. 30 to 100 examples is enough for
# BootstrapFewShot; 200 to 500 is enough for MIPROv2.
trainset = [
    dspy.Example(
        ticket="I was charged twice for my June invoice.",
        category="billing",
        confidence=1.0,
    ).with_inputs("ticket"),
    dspy.Example(
        ticket="The app crashes on the settings page in Android.",
        category="bug",
        confidence=1.0,
    ).with_inputs("ticket"),
    # ...more
]

# 2. Metric: exact match on the category is enough here.
def accuracy(example, pred, trace=None):
    return int(example.category == pred.category)

# 3. Compile. MIPROv2 does Bayesian search over
# instructions and demos jointly. auto="light" is the
# fast setting; "medium" and "heavy" trade cost for gain.
optimizer = dspy.MIPROv2(
    metric=accuracy,
    auto="light",
    num_threads=8,
)
compiled = optimizer.compile(
    student=classify,
    trainset=trainset,
)

# 4. Save the compiled program (prompt + demos + config).
compiled.save("artifacts/classify_ticket.json")`}
      />
      <p className="mb-6 leading-relaxed">
        MIPROv2 does three things in sequence:
        it samples few-shot candidates from your training
        set and keeps only the ones that score well, it
        proposes instruction candidates by summarizing your
        data and traces, and it runs Bayesian optimization
        over combinations of instructions and demos on
        minibatches. The result is a compiled program you
        can load anywhere with{" "}
        <code>classify.load(&quot;artifacts/classify_ticket.json&quot;)</code>.
        The compiled artifact is portable across processes,
        machines, and CI pipelines.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The optimizer family, and when to reach for which
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy 3.x ships six optimizers that cover most
        production shapes. The names are dense, so here is
        the short version of when to pick each.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>BootstrapFewShot</strong>. The starter
          pick. It runs your program on the training set,
          keeps traces where the metric passes, and packs
          those traces as few-shot demos into the prompt. No
          instruction rewriting. Best when you have 20 to
          100 examples and want a fast, cheap first pass.
        </li>
        <li>
          <strong>MIPROv2</strong>. The default for supervised
          tasks with a clear metric. Jointly optimizes
          instructions and demos with Bayesian search over
          minibatches. Data-aware and demo-aware prompt
          proposals. Reach for it when accuracy matters and
          you have 100 to 500 examples.
        </li>
        <li>
          <strong>GEPA (Reflective Prompt Evolution)</strong>.
          The 2026 gold standard for agentic tasks. It runs
          your program, has a reflection LLM read the
          trajectory (tool calls, tool outputs, reasoning),
          diagnoses failure modes in natural language, and
          proposes prompt edits. It keeps a Pareto frontier
          of candidates. GEPA beats MIPROv2 by 10+ percent on
          hard tasks and needs 35x fewer rollouts than GRPO.
          Reach for it when the metric returns rich feedback
          (an error message, a rubric, a judge score with
          reasons), not just a scalar.
        </li>
        <li>
          <strong>SIMBA</strong>. Learns from custom
          feedback loops on agentic tasks. Good middle
          ground when your feedback signal is nuanced but
          you do not want to run GEPA.
        </li>
        <li>
          <strong>GRPO</strong>. Reinforcement learning on
          DSPy programs through the Arbor library. Trains
          weights, not just prompts. Reach for it when you
          own the model weights, have thousands of rollouts,
          and prompt-only optimization has hit a ceiling.
        </li>
        <li>
          <strong>COPRO</strong>. Instruction-only refinement.
          Lightweight, good when you only want to tune the
          system instruction and keep the demos fixed.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The default path on new work is: start with
        BootstrapFewShot to sanity-check the metric and the
        Signature, run MIPROv2 with{" "}
        <code>auto=&quot;light&quot;</code> for a first real
        result, and move to GEPA when the task is agentic
        (tool use, multi-step, judge feedback with reasons)
        or when the metric has room for rich feedback beyond
        a 0-or-1 score.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A ReAct agent with tools
      </h2>
      <p className="mb-6 leading-relaxed">
        The ChainOfThought pattern covers one-shot reasoning.
        Real agents call tools in a loop. DSPy ships{" "}
        <code>dspy.ReAct</code> for the classic
        reason-act-observe cycle with typed tool signatures.
        The tool list is plain Python functions; the module
        handles the loop, retries, and the max-iteration
        guard.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/support_agent.py"
        code={`import dspy
import requests

# Configure the model once.
dspy.configure(lm=dspy.LM("anthropic/claude-sonnet-4-5"))

# 1. Tools are plain Python functions with type hints
# and a docstring. DSPy turns them into typed tool specs.
def get_order(order_id: str) -> dict:
    """Look up an order by its id in the order service."""
    r = requests.get(f"https://api.example.com/orders/{order_id}")
    r.raise_for_status()
    return r.json()

def refund_order(order_id: str, amount_cents: int) -> str:
    """Issue a refund of amount_cents on the given order."""
    r = requests.post(
        f"https://api.example.com/orders/{order_id}/refund",
        json={"amount_cents": amount_cents},
    )
    r.raise_for_status()
    return r.json()["refund_id"]

# 2. Signature is the agent's job.
class SupportAgent(dspy.Signature):
    """Handle a customer support ticket end-to-end."""

    ticket: str = dspy.InputField()
    resolution: str = dspy.OutputField(
        desc="Short summary of what was done and why."
    )

# 3. ReAct wires up the reason-act-observe loop over
# your tools. max_iters bounds the loop.
agent = dspy.ReAct(
    SupportAgent,
    tools=[get_order, refund_order],
    max_iters=6,
)

out = agent(
    ticket="Order 8821 was charged twice. Refund the "
           "duplicate charge and confirm."
)
print(out.resolution)
# "Verified order 8821 had two charges of $42.00; issued
#  refund rf_9182 for the duplicate."`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth pointing out on this shape.
        First, the tools are unadorned Python functions,
        which means the same functions you already have in
        your service become tools without a wrapper library.
        Second, the module is compilable. Point MIPROv2 or
        GEPA at this agent and it will optimize the ReAct
        loop{"'"}s internal prompts against your metric, the
        same way it does for a one-shot Predict.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Async, streaming, and batching in 3.x
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2.x line of DSPy was research-grade on the
        runtime. Async was patchy, streaming was missing, and
        batching was a hand-rolled thread pool. DSPy 3.0
        rebuilt the runtime around three primitives that map
        cleanly to production: <code>dspy.asyncify</code>,{" "}
        <code>dspy.streamify</code>, and thread-safe{" "}
        <code>Module.batch</code>.
      </p>
      <CodeBlock
        language="python"
        filename="src/serve/fastapi_app.py"
        code={`import dspy
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from src.agents.support_agent import agent

app = FastAPI()

# 1. Async wrapper for high-throughput HTTP.
# Bumps concurrent DSPy calls per worker.
dspy.settings.configure(async_max_workers=32)
agent_async = dspy.asyncify(agent)

@app.post("/support")
async def support(ticket: str):
    out = await agent_async(ticket=ticket)
    return {"resolution": out.resolution}

# 2. Streaming wrapper. Yields intermediate reasoning
# and final output as they are produced.
agent_stream = dspy.streamify(agent)

@app.post("/support/stream")
async def support_stream(ticket: str):
    async def gen():
        async for chunk in agent_stream(ticket=ticket):
            yield chunk.model_dump_json() + "\\n"
    return StreamingResponse(gen(), media_type="application/x-ndjson")`}
      />
      <p className="mb-6 leading-relaxed">
        A few production details are worth calling out.
        <code>asyncify</code> runs the DSPy program in a
        thread pool and awaits it; the default pool is 8, and{" "}
        <code>async_max_workers</code> is the knob you want to
        raise once you profile.{" "}
        <code>streamify</code> uses{" "}
        <code>asyncify</code> under the hood, so it inherits
        the same concurrency semantics.
        <code>Module.batch</code> is the right primitive for
        bulk offline runs, and it is thread-safe with per-
        thread settings, so you can run multiple batches
        against different models in parallel without leaking
        state.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deployment: MLflow, FastAPI, or both
      </h2>
      <p className="mb-6 leading-relaxed">
        A compiled DSPy program is a JSON artifact plus a
        Python file. The two default deployment shapes are a
        FastAPI service and an MLflow Model Serving endpoint,
        and most teams end up with both: MLflow tracks
        versions and traces, FastAPI serves traffic.
      </p>
      <CodeBlock
        language="python"
        filename="src/serve/mlflow_log.py"
        code={`import dspy
import mlflow
import mlflow.dspy

mlflow.set_experiment("support-agent")
mlflow.dspy.autolog()   # Traces every DSPy call.

# Recreate and load the compiled program.
lm = dspy.LM("anthropic/claude-sonnet-4-5")
dspy.configure(lm=lm)
agent = dspy.ReAct.load("artifacts/support_agent.json")

with mlflow.start_run():
    mlflow.dspy.log_model(
        agent,
        artifact_path="model",
        input_example={"ticket": "Order 8821 was charged twice."},
    )
    # MLflow 3.0 logs the compiled prompt, the module
    # graph, and the optimizer config as run parameters.`}
      />
      <p className="mb-6 leading-relaxed">
        The MLflow 3.0 DSPy flavor supports full tracing,
        streaming output from served endpoints, and versioned
        model registry entries. The DSPy team also ships a
        prompt-portability path through Adapters: swap{" "}
        <code>dspy.ChatAdapter</code> for{" "}
        <code>dspy.JSONAdapter</code> to move a compiled
        program to a provider that only accepts strict JSON
        mode, without touching the Signature. In practice
        this is what makes DSPy pipelines portable across
        the OpenAI, Anthropic, and Bedrock APIs without
        rewriting the pipeline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        GEPA in practice: rich metrics beat scalar rewards
      </h2>
      <p className="mb-6 leading-relaxed">
        GEPA is the change in DSPy that most teams do not use
        yet, and the one that pays off the most on real
        agent work. The mental model is: reinforcement
        learning on prompts (GRPO) needs a scalar reward and
        thousands of rollouts to move the prompt. GEPA takes
        rich text feedback and moves the prompt with tens or
        low hundreds of rollouts. Where a scalar reward
        might say &quot;0.42&quot;, a GEPA-friendly metric
        says &quot;the model answered in English when the
        ticket was in Portuguese, and it missed the refund
        amount because it read the order ID as the amount.&quot;
      </p>
      <CodeBlock
        language="python"
        filename="src/optimize/gepa_metric.py"
        code={`import dspy

def rich_metric(example, pred, trace=None):
    """Return (score, feedback) instead of just a score.

    GEPA reads the feedback string, so the more concrete
    the diagnosis, the faster the optimizer converges.
    """
    problems = []
    score = 1.0

    if pred.category != example.category:
        problems.append(
            f"Wrong category: got {pred.category}, expected "
            f"{example.category}."
        )
        score -= 0.7

    if pred.confidence > 0.9 and pred.category != example.category:
        problems.append(
            "Overconfident on a wrong answer; the model "
            "should lower confidence when the ticket is ambiguous."
        )
        score -= 0.2

    if not problems:
        return dspy.Prediction(score=1.0, feedback="Correct.")
    return dspy.Prediction(
        score=max(0.0, score),
        feedback=" ".join(problems),
    )

optimizer = dspy.GEPA(
    metric=rich_metric,
    reflection_lm=dspy.LM("openai/gpt-4o"),
    auto="medium",
)
compiled = optimizer.compile(student=classify, trainset=trainset)`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>reflection_lm</code> is a stronger model
        that reads the failure traces and writes the next
        candidate prompt. It runs at compile time, not at
        inference time, so the cost is a one-off during the
        run. GEPA keeps a Pareto front of candidates and
        combines lessons across them, which is why it
        converges in far fewer rollouts than RL-based
        optimizers. The paper reports 10 percent average
        gains over GRPO with up to 35x fewer rollouts, and
        10+ percent gains over MIPROv2 on hard tasks.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production case studies
      </h2>
      <p className="mb-6 leading-relaxed">
        The most-cited public case study is JetBlue. The
        airline had a set of multi-stage LLM pipelines built
        on LangChain, with hand-tuned prompts for a customer
        feedback classifier and a RAG-powered predictive
        maintenance chatbot. Every model swap and every new
        vertical needed another round of prompt work.
        Moving the same pipelines to DSPy on Databricks cut
        deployment time in half (2x faster), removed the
        manual prompt tuning step, and let the team optimize
        against an LLM-as-a-Judge metric they could version
        with the code.
      </p>
      <p className="mb-6 leading-relaxed">
        Shopify ran a DSPy pipeline for metadata extraction
        over the entire shop catalog. The compiled program
        used a much smaller model with tuned demos in place
        of a large model on a hand-written prompt, and hit a
        roughly 550x cost reduction on the same task with
        comparable quality. This is the DSPy pattern that
        keeps showing up: compile a small model plus good
        demos into an artifact that matches or beats a large
        model on a plain prompt.
      </p>
      <p className="mb-6 leading-relaxed">
        Nubank published the strongest 2026 GEPA result to
        date. The team ran GEPA on LLM-as-a-Judge prompts
        used inside its AI assistant and reports +37 points
        on AI transactional NPS and +29 points on the
        self-service rate across five deployed domains. The
        compile step cost more than a MIPROv2 run of the
        same shape, but paid off because the metric had rich
        feedback (rubric-based judge scores with reasons) and
        the deployed prompt was static after compile, so
        inference cost did not change.
      </p>
      <p className="mb-6 leading-relaxed">
        Beyond those three, Dropbox uses DSPy for the Dash
        relevance judge that ranks search results across
        connected apps, Databricks uses it internally for
        LM-as-a-Judge and for the RAG components in Mosaic
        AI, Moody{"'"}s runs a DSPy RAG system for financial
        research, and Replit uses it in parts of the code
        assistant. AWS ships DSPy tutorials for Bedrock
        users, and Sephora spoke about undisclosed agent
        workloads at Data + AI Summit 2025.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where DSPy fits next to LangChain, LangGraph, Pydantic
        AI, and LlamaIndex
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is not a LangChain replacement. It solves a
        different problem in the stack. LangChain and
        LangGraph handle orchestration: chains, agents, graph
        state, memory, tool wiring. LlamaIndex handles the
        RAG pipeline: ingestion, indexing, retrieval,
        response synthesis. Pydantic AI handles typed agent
        loops with strong validation and durable execution
        across providers. DSPy handles the prompt layer:
        given a task and a metric, write the best prompt for
        this model.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Pick DSPy for the prompt.</strong> When the
          quality of a specific LLM call is the bottleneck
          (classification, extraction, LM-as-a-Judge, a
          reasoning step inside a bigger agent), DSPy will
          out-optimize hand-tuned prompts by a wide margin
          and stay portable across models.
        </li>
        <li>
          <strong>Pick LangGraph for the graph.</strong> When
          the pipeline is a multi-node state machine with
          branching, checkpoints, and human-in-the-loop,
          LangGraph is the sharper tool. You can wrap
          individual node calls with DSPy modules to get
          both.
        </li>
        <li>
          <strong>Pick LlamaIndex for ingestion and
          retrieval.</strong> Its connectors, indexes, and
          rerankers are the deepest surface in the Python
          ecosystem. Feed the retrieved chunks to a DSPy
          module for the answer step.
        </li>
        <li>
          <strong>Pick Pydantic AI for typed agent
          workflows.</strong> When your product needs
          strict output types across many providers with
          durable execution (Temporal, DBOS), Pydantic AI is
          a better runtime than DSPy alone. You can still
          author the internal prompts with DSPy and load the
          compiled string into a Pydantic AI agent.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The common pattern on our recent projects is a
        LangGraph or Pydantic AI backbone that calls DSPy-
        compiled modules at the nodes where prompt quality
        matters, with LlamaIndex on the retrieval side. DSPy
        does not have to own the whole stack to earn its
        place.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Model-portable pipelines.</strong> The
          Signature stays the same when the model changes,
          you recompile, and the prompt gets rewritten for
          the new model. This is the single biggest
          production win.
        </li>
        <li>
          <strong>Measured, not vibed.</strong> Every DSPy
          program is built around a metric. You cannot ship
          without one, which pushes the eval discipline into
          the workflow instead of after it.
        </li>
        <li>
          <strong>Small models plus good demos beat big
          models plus hand-written prompts.</strong> The
          Shopify 550x number is the loudest example, but
          the pattern shows up on every serious workload we
          have tried.
        </li>
        <li>
          <strong>Typed outputs by default.</strong> The
          Signature declares the output type; the framework
          validates and re-prompts on failure. No hand-
          rolled JSON parsers.
        </li>
        <li>
          <strong>A real production runtime in 3.x.</strong>{" "}
          Async, streaming, batch, MLflow tracing, and
          adapter-based portability across providers are all
          in-tree, not community add-ons.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Limitations and honest trade-offs
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>The mental model has a learning curve.</strong>{" "}
          Teams that are used to writing prompts as text
          have to give up the illusion that the prompt is
          their artifact. Some engineers find this
          uncomfortable, and the framework has fewer
          &quot;drop this string in&quot; entry points than
          LangChain.
        </li>
        <li>
          <strong>Compile time and cost are real.</strong> A
          MIPROv2 run over 500 examples with two candidate
          model calls per example is not free; a GEPA run
          with a reflection LM is more expensive still.
          Budget for it, and only recompile on model change
          or dataset drift, not on every deploy.
        </li>
        <li>
          <strong>Metric design is where the work goes.</strong>{" "}
          DSPy makes the compile step easy and pushes all
          the difficulty to the metric. A weak metric will
          optimize the wrong thing beautifully. Rich
          metrics with per-example feedback (the kind GEPA
          needs) take work to build.
        </li>
        <li>
          <strong>Ecosystem is still smaller than
          LangChain{"'"}s.</strong> Fewer prebuilt tools,
          fewer integrations. In 2026 the gap has closed
          for the shapes that matter (MCP, tool functions,
          vector stores, providers), but LangChain still
          has more surface.
        </li>
        <li>
          <strong>Orchestration is not the goal.</strong>{" "}
          DSPy will run a ReAct loop and a few module
          compositions, but graph state, checkpoints, and
          human-in-the-loop are LangGraph territory. Do not
          try to bend DSPy into a full workflow engine.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where DSPy is heading in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three trends are worth watching on the DSPy roadmap
        and in the wider community.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Optimizers keep pulling ahead of
        prompting.</strong> GEPA at ICLR 2026 is the loudest
        signal, but the underlying pattern (a reflection LM
        reads traces and writes the next prompt) is turning
        into a standard technique across frameworks. The
        DSPy team is layering optimizer families
        (BootstrapFewShot, MIPROv2, GEPA, SIMBA, GRPO,
        COPRO) so the choice can move with the task shape.
        Expect a meta-optimizer that picks the right one
        for you.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Prompt portability is becoming a first-
        class concern.</strong> The 3.0 adapter family
        (Chat, JSON, XML, BAML) is the start. The direction
        of travel is a compiled artifact you can move
        between OpenAI, Anthropic, Bedrock, Vertex, and
        self-hosted vLLM without a rewrite. This is what
        makes DSPy attractive to teams that already got
        burned by a hard-coded prompt on a model that got
        deprecated.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MLflow 3.0 is the observability
        layer.</strong> The MLflow DSPy flavor now stores
        traces, module graphs, and optimizer runs as
        first-class objects. Combined with the Databricks
        sponsorship, this is the most complete open-source
        story for tracking compiled LLM programs across
        environments. Expect DSPy plus MLflow to be the
        default for regulated deployments where every
        prompt change needs an audit trail.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is now the sharpest tool in the Python LLM
        toolbox for the specific job of getting a single LLM
        call to work well and keep working when the model
        changes. The 3.0 release closed the runtime gap
        against LangChain and Pydantic AI. GEPA closed the
        optimizer gap against reinforcement learning. The
        production case studies are no longer research
        demos: JetBlue cut RAG deployment time in half,
        Shopify hit 550x cost reduction on metadata
        extraction, Nubank moved AI NPS by 37 points on
        judge prompts with GEPA.
      </p>
      <p className="mb-6 leading-relaxed">
        The right way to bring DSPy into a real system in
        2026 is narrow and honest. Do not rewrite your
        orchestration on top of it; use LangGraph or
        Pydantic AI for the graph and the runtime. Do not
        make it own retrieval; use LlamaIndex. Do use it
        wherever a specific LLM call is the bottleneck: a
        classifier, an extractor, a reasoning step inside
        an agent, an LM-as-a-Judge, a rubric. Write a
        Signature, pick a Module, define a metric with rich
        feedback, and let the compiler do the prompt work.
        That is the shape that keeps paying off on client
        engagements, and it is the reason DSPy has become
        the default we reach for on new LLM pipelines this
        year.
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
            DSPy: the official documentation site
          </a>
          {" "}, the source of truth for Signatures, Modules,
          Optimizers, and deployment recipes.
        </li>
        <li>
          <a
            href="https://github.com/stanfordnlp/dspy/releases/tag/3.0.0"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy 3.0 release notes (August 2025)
          </a>
          {" "}, the release with async, streaming, adapters,
          MLflow 3.0 tracing, and the new optimizer family.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2507.19457"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GEPA: Reflective Prompt Evolution Can Outperform
            Reinforcement Learning (ICLR 2026 Oral)
          </a>
          {" "}, the paper with the 10-20 percent gains over
          GRPO on 35x fewer rollouts, and the results on
          MIPROv2.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks Engineering: Optimizing Databricks
            LLM Pipelines with DSPy
          </a>
          {" "}, the JetBlue engineering write-up with the
          2x faster deployment number and the MLflow
          integration story.
        </li>
        <li>
          <a
            href="https://www.zenml.io/llmops-database/automated-llm-pipeline-optimization-with-dspy-for-multi-stage-agent-development"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ZenML LLMOps Database: JetBlue automated LLM
            pipeline optimization with DSPy
          </a>
          {" "}, an independent case-study write-up with
          the multi-stage agent details.
        </li>
        <li>
          <a
            href="https://dspy.ai/production/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy production guide
          </a>
          {" "}, the deployment reference with{" "}
          <code>asyncify</code>, <code>streamify</code>,{" "}
          <code>Module.batch</code>, FastAPI, and MLflow
          Model Serving recipes.
        </li>
        <li>
          <a
            href="https://mlflow.org/docs/latest/genai/flavors/dspy/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLflow 3.0 DSPy flavor documentation
          </a>
          {" "}, the tracing, autolog, and Model Serving
          reference for DSPy programs.
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
          {" "}, the reference implementation, roadmap, and
          the production use-case list with the companies
          shipping DSPy in 2026.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}, the companion read on the typed agent
          runtime we usually pair with DSPy for the graph
          and the durable execution.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}, the graph runtime that hosts DSPy-compiled
          modules at the nodes where prompt quality matters.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}, the wider read on the metric and eval story
          that DSPy compiles against.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}, the deeper look at the prompt- and context-
          shaping patterns DSPy automates.
        </li>
      </ul>
    </div>
  );
}
