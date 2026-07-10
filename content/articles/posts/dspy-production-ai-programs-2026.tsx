import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "dspy-production-ai-programs-2026",
  title:
    "DSPy in production 2026: programming LLMs with Signatures, Modules, and the GEPA optimizer",
  excerpt:
    "How DSPy went from a Stanford research project to a production stack at Shopify, Dropbox, JetBlue, and Replit. Covers the Signature-Module-Optimizer model, the July 2025 GEPA paper that beat GRPO with 35x fewer rollouts, DSPy 3.0 and 3.3 releases, MLflow tracing on Databricks, and honest trade-offs against LangGraph and plain prompting.",
  metaDescription:
    "A practical, technical guide to DSPy in production 2026. Covers Signatures as typed task declarations, Modules like Predict, ChainOfThought, and ReAct, Optimizers including BootstrapFewShot, MIPROv2, and GEPA, the ICLR 2026 GEPA paper, DSPy 3.0 and 3.3 releases, MLflow tracing integration, Databricks and JetBlue deployment patterns, saving and loading compiled programs, cost and quality lessons from Shopify and Dropbox, and when DSPy fits vs LangGraph or hand-written prompts.",
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
    "Prompt Optimization",
    "LLM",
    "Stanford",
    "Databricks",
    "MLflow",
    "Production",
  ],
  publishDate: "2026-07-10",
  readingTime: "15 min read",
};

export default function DspyProductionAiPrograms2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most teams still ship LLM features as a long
        string. A single f-string in a Python file that
        someone tuned by hand, that nobody wants to touch,
        and that has to be rewritten when the model
        changes. DSPy takes the other approach: write the
        task as a typed function signature, pick a strategy
        module, and let an optimizer compile the prompt
        against a metric on real examples. In 2025 and
        2026 that model has moved from research demo to
        production stack, with Shopify running it across
        every shop for metadata extraction, Dropbox using
        it to tune the Dash relevance judge, and Databricks
        shipping it as the recommended path for compound
        AI on Model Serving. This article is a practical
        read on what DSPy looks like in a real deployment
        in 2026: the Signature-Module-Optimizer model,
        the GEPA optimizer that landed at ICLR 2026, and
        the trade-offs we hit on client work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why declarative LLM programming became a real
        pattern
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is a Python framework from Stanford NLP that
        treats an LLM call as a compiled function, not a
        hand-written prompt. You declare a task as a{" "}
        <code>Signature</code> (typed inputs and outputs
        with a docstring), wrap it in a{" "}
        <code>Module</code> that picks the strategy (direct
        completion, chain-of-thought, tool use), and hand
        the whole program to an{" "}
        <code>Optimizer</code> that improves the prompt or
        the underlying weights against a scoring function.
        The project has 5.9 million monthly downloads,
        36k GitHub stars, and 434 contributors as of mid-
        2026. It is now a top-tier open-source LLM stack
        by the numbers.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason it matters in 2026 is that prompt
        engineering does not scale past a small team. A
        one-line change to a system prompt breaks quality
        on tasks nobody remembered to test. A model swap
        (GPT-4 to GPT-5.4, Sonnet to Haiku for cost)
        forces a full re-tune. Every regression turns into
        a code review argument about which sentence to
        keep. DSPy replaces that loop with something
        closer to a build step: define the task, pin a
        metric, run <code>compile</code>, and commit the
        artifact. The model still runs at inference time,
        but the prompt is now a compiled program, not a
        prose file.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2022 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>December 2022</strong>: The Demonstrate-
          Search-Predict paper (Khattab et al.) lays the
          groundwork for treating LLM pipelines as
          programs that can be compiled.
        </li>
        <li>
          <strong>October 2023</strong>: The DSPy paper
          (Khattab et al.) formalises the Signature-
          Module-Optimizer model and gives the framework
          its current name.
        </li>
        <li>
          <strong>June 2024</strong>: MIPROv2 lands. The
          first DSPy optimizer that jointly tunes
          instructions and few-shot demonstrations, using
          a small language-model-based proposer to
          propose candidate instructions.
        </li>
        <li>
          <strong>July 2024</strong>: BetterTogether
          combines prompt optimization with a lightweight
          fine-tune. The paper shows that alternating
          both often beats either alone.
        </li>
        <li>
          <strong>June 2025</strong>: DSPy 3.0 ships at
          the Data + AI Summit. Major changes include
          native MLflow tracing, the new{" "}
          <code>dspy.Refine</code> module for
          reflection loops, and typed Pydantic outputs
          across every module.
        </li>
        <li>
          <strong>July 25, 2025</strong>: The GEPA paper
          (Agrawal et al., arxiv 2507.19457) is
          published. It shows a reflective prompt
          optimizer beating GRPO reinforcement learning
          by 6% on average and up to 20%, with 35x fewer
          rollouts, and beating MIPROv2 by over 10%.
          Accepted to ICLR 2026 as an oral.
        </li>
        <li>
          <strong>September 2025</strong>: DSPy 3.0.3
          ships GEPA as{" "}
          <code>dspy.GEPA</code>, with{" "}
          <code>auto</code> presets (light, medium,
          heavy) so most users do not touch the
          hyperparameters.
        </li>
        <li>
          <strong>Late 2025</strong>: Shopify publishes
          the 550x cost reduction case for metadata
          extraction across every shop, moving the
          workload from a large model with hand-tuned
          prompts to a smaller model compiled with DSPy.
        </li>
        <li>
          <strong>December 2025</strong>: The Recursive
          Language Models paper (arxiv 2512.24601)
          extends DSPy programs to call themselves,
          opening a path to deeper compositional agents.
        </li>
        <li>
          <strong>February 2026</strong>: The GEPA v2
          revision is posted with expanded benchmarks
          and the ICLR 2026 oral accepted version.
        </li>
        <li>
          <strong>Q2 2026</strong>: DSPy 3.3.0b1
          releases <code>ReActV2</code>, a rewritten
          agent module with a stricter tool loop and a
          smaller default prompt, plus a new{" "}
          <code>BaseLM</code> layer that makes custom
          model backends a subclass instead of a
          rewrite.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Signature, Module, Optimizer model
      </h2>
      <p className="mb-6 leading-relaxed">
        Every DSPy program has the same three-layer
        shape. The Signature is the contract, the Module
        is the strategy, and the Optimizer is the tuner.
        Understand these three pieces and the rest of the
        framework falls out.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy: the three-layer program model"
        code={`+---------------------------------------------------+
|  Layer 1: SIGNATURE                               |
|                                                   |
|   class Triage(dspy.Signature):                   |
|     """Route a support ticket."""                 |
|     ticket: str = dspy.InputField()               |
|     urgency: Literal["low","high"] = OutputField()|
|     team: str = dspy.OutputField()                |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
|  Layer 2: MODULE                                  |
|                                                   |
|   dspy.Predict(Triage)          # zero-shot       |
|   dspy.ChainOfThought(Triage)   # + reasoning     |
|   dspy.ReAct(Triage, tools=[...])# + tool loop    |
|   dspy.Refine(Triage, N=3)      # + reflection    |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
|  Layer 3: OPTIMIZER                               |
|                                                   |
|   dspy.BootstrapFewShot         # cheap, demos    |
|   dspy.MIPROv2                  # jointly tunes   |
|   dspy.GEPA                     # reflective evo. |
|   dspy.BootstrapFinetune        # weight update   |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The <strong>Signature</strong> is a Python class
        with typed input and output fields and a
        docstring. The docstring is the task description,
        the field names carry semantics (the compiler
        uses them in the prompt), and the type
        annotations enforce the shape of the output. A
        Signature is portable across models: swap
        <code>gpt-4</code> for <code>claude-haiku-4.5</code>{" "}
        and the same Signature runs unchanged, because
        the compiler formats the prompt for whichever
        model is bound.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Module</strong> is the strategy that
        wraps the Signature. <code>dspy.Predict</code> is
        one LLM call. <code>dspy.ChainOfThought</code>{" "}
        adds a reasoning field before the outputs.{" "}
        <code>dspy.ReAct</code> gives the module a tool
        list and a loop until the answer is ready.{" "}
        <code>dspy.Refine</code> runs a candidate
        multiple times, scores each attempt, and returns
        the best. Because these all share the same
        interface, changing the strategy is one line: no
        prompt rewrite required.
      </p>
      <p className="mb-6 leading-relaxed">
        The <strong>Optimizer</strong> is where DSPy
        earns its keep. You hand it a program, a metric,
        and a training set. It runs the program on the
        examples, scores each output, and iteratively
        improves the prompt (and optionally the weights)
        until the metric converges. The output is a
        compiled program you can save to disk as JSON
        and reload for inference. This is the step that
        replaces manual prompt engineering.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A first Signature and Module
      </h2>
      <p className="mb-6 leading-relaxed">
        The cleanest way to see the model is a short
        extraction task. The Signature declares the
        contract; the Module picks the strategy; the LM
        binding sets the backend. Every DSPy program
        starts with these three lines.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/extract_events.py"
        code={`import dspy

dspy.configure(lm=dspy.LM("openai/gpt-5.4-mini"))

class ExtractEvent(dspy.Signature):
    """Extract event details from an email."""
    email: str = dspy.InputField()
    event_name: str = dspy.OutputField()
    date: str = dspy.OutputField()
    location: str | None = dspy.OutputField()

extract = dspy.Predict(ExtractEvent)

result = extract(email=inbox_message)
print(result.event_name, result.date, result.location)`}
      />
      <p className="mb-6 leading-relaxed">
        No prompt is written. DSPy builds the prompt
        from the Signature, sends it to the bound LM,
        parses the response into a typed{" "}
        <code>Prediction</code> object, and hands it
        back. The docstring becomes the task
        description in the prompt. The field names
        become the labels. The type annotations become
        the parser. If the model returns malformed
        output, DSPy retries with a corrective message
        until the parse succeeds or a retry cap fires.
      </p>
      <p className="mb-6 leading-relaxed">
        Swapping strategies is one line. Add
        step-by-step reasoning:{" "}
        <code>dspy.ChainOfThought(ExtractEvent)</code>.
        Add tool use:{" "}
        <code>dspy.ReAct(ExtractEvent, tools=[search])</code>.
        Add a self-refinement loop:{" "}
        <code>dspy.Refine(ExtractEvent, N=3, reward_fn=score)</code>.
        The Signature is the same in every case, which
        is why DSPy programs are easy to move between
        tasks and models.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Compiling with GEPA: the 2025 breakthrough
      </h2>
      <p className="mb-6 leading-relaxed">
        Until mid-2025 the leading DSPy optimizer was
        MIPROv2, a Bayesian search over instructions
        and few-shot demos. MIPROv2 works, but it needs
        a lot of rollouts to move the metric, and it
        does not use the actual failure mode of a bad
        response as a signal. GEPA (Genetic-Pareto),
        published in July 2025 and adopted as{" "}
        <code>dspy.GEPA</code> in DSPy 3.0.3, changes
        that. It samples full traces (reasoning, tool
        calls, tool outputs), reflects on them in
        natural language to diagnose failures, and
        proposes prompt edits. It keeps a Pareto
        frontier of prompt variants and merges the
        best complementary lessons across attempts.
      </p>
      <p className="mb-6 leading-relaxed">
        The paper reports GEPA beating GRPO
        reinforcement learning by 6% on average and
        up to 20%, with up to 35x fewer rollouts. It
        also beats MIPROv2 by more than 10% on
        AIME-2025 and similar reasoning tasks. In
        practical terms it means you can hand GEPA a
        few dozen labeled examples and watch it push
        accuracy up by 20-40 points on tasks that
        would take days of hand-tuning.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/compile_with_gepa.py"
        code={`import dspy
from dspy.evaluate import Evaluate

# Program to optimize: an extraction pipeline.
extract = dspy.ChainOfThought(ExtractEvent)

# Scoring function returns a scalar plus a natural
# language feedback string that GEPA reflects on.
def semantic_f1(example, pred, trace=None):
    label = example.event_name.lower()
    guess = (pred.event_name or "").lower()
    score = 1.0 if label == guess else 0.0
    feedback = (
        "correct" if score == 1.0
        else f"predicted '{pred.event_name}' but expected '{example.event_name}'"
    )
    return dspy.Prediction(score=score, feedback=feedback)

optimizer = dspy.GEPA(
    metric=semantic_f1,
    auto="medium",
    reflection_lm=dspy.LM("openai/gpt-5.4"),
)

compiled = optimizer.compile(
    student=extract,
    trainset=labeled_emails[:80],
    valset=labeled_emails[80:120],
)

compiled.save("extract_v2.json")
print("Compiled prompt saved.")`}
      />
      <p className="mb-6 leading-relaxed">
        Three details matter for real use. First, GEPA
        expects the metric to return both a{" "}
        <code>score</code> and a{" "}
        <code>feedback</code> string. The feedback is
        what the reflection LM reads to figure out how
        to improve the prompt. If you only return a
        score, GEPA still works but you leave a lot of
        signal on the table. Second, the{" "}
        <code>reflection_lm</code> should be a strong
        model (typically the biggest one in your
        budget) because it is doing the diagnosis, not
        the task. Third, the{" "}
        <code>auto</code> preset controls compute:{" "}
        <code>light</code> for a few dozen rollouts,{" "}
        <code>medium</code> for a couple hundred,{" "}
        <code>heavy</code> for real runs where the
        artifact will ship.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Building a small agent with dspy.ReAct
      </h2>
      <p className="mb-6 leading-relaxed">
        The DSPy agent story is{" "}
        <code>dspy.ReAct</code>. It is a strict
        tool-calling loop over a Signature, and in
        DSPy 3.3 the rewrite (<code>ReActV2</code>)
        cut the default prompt size by roughly a
        third and tightened the tool-argument schema.
        You pass functions as tools, and DSPy handles
        the type annotations, tool descriptions from
        docstrings, and the parse loop.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/support_agent.py"
        code={`import dspy

def search_kb(query: str) -> list[str]:
    """Search the product knowledge base for a query."""
    return kb.query(query, k=3)

def get_order(order_id: str) -> dict:
    """Look up an order by ID. Returns dict with items and status."""
    return orders_db.get(order_id)

class SupportReply(dspy.Signature):
    """Answer a customer support question using KB and order data."""
    question: str = dspy.InputField()
    answer: str = dspy.OutputField()
    citations: list[str] = dspy.OutputField()

agent = dspy.ReAct(
    SupportReply,
    tools=[search_kb, get_order],
    max_iters=6,
)

result = agent(question="Where is my order 8842 and is item 7 replaceable?")
print(result.answer)
print(result.citations)`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth flagging. First,{" "}
        <code>max_iters</code> is the number of
        tool-calling rounds before the module gives
        up. Set it low (4-6) for support agents so a
        broken tool cannot spin forever. Second, tool
        docstrings become tool descriptions in the
        prompt. Write them as if they are the only
        documentation the model will see, because
        they are.
      </p>
      <p className="mb-6 leading-relaxed">
        The same optimizer flow works on ReAct. Hand
        <code>dspy.GEPA</code> a training set of
        (question, expected_answer) pairs and it will
        tune the instruction, the tool-selection
        prompt, and the answer formatting. The output
        is a JSON artifact you save with the code and
        load at inference. No re-tuning at startup,
        no runtime search, no drift when the model
        version changes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Composing modules into a pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        The step past a single module is a
        <code>dspy.Module</code> subclass that
        composes several Signatures with plain
        Python. Because every module has the same
        callable interface, you can build a full
        pipeline with an <code>__init__</code> and a{" "}
        <code>forward</code> method, and the whole
        pipeline is still a program the optimizer can
        compile.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/fact_check_pipeline.py"
        code={`import dspy

class FactCheck(dspy.Module):
    def __init__(self):
        super().__init__()
        self.find_claims = dspy.ChainOfThought(
            "article -> claims: list[str]"
        )
        self.verify = dspy.ChainOfThought(
            "claim, source -> verdict: Literal['supported','unsupported','unclear']"
        )
        self.summarize = dspy.ChainOfThought(
            "article, verdicts: list[str] -> summary: str"
        )

    def forward(self, article: str):
        found = self.find_claims(article=article)
        verdicts = [
            self.verify(claim=c, source=article).verdict
            for c in found.claims
        ]
        summary = self.summarize(
            article=article, verdicts=verdicts
        )
        return dspy.Prediction(
            claims=found.claims,
            verdicts=verdicts,
            summary=summary.summary,
        )

pipeline = FactCheck()`}
      />
      <p className="mb-6 leading-relaxed">
        The inline string syntax (<code>{'"article -> claims: list[str]"'}</code>)
        is a shortcut for a Signature class. You
        keep it when the task is a one-liner and
        drop to the class form when you need the
        docstring or field-level descriptions. Both
        forms compile to the same object.
      </p>
      <p className="mb-6 leading-relaxed">
        When you compile the pipeline, DSPy tracks
        which Signatures live inside the module and
        optimizes each of their prompts jointly. The
        compiled artifact holds one entry per
        sub-Signature, so you can inspect and edit
        each prompt independently after compile if a
        reviewer flags a specific step.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Saving, loading, and shipping compiled
        programs
      </h2>
      <p className="mb-6 leading-relaxed">
        The compiled program is a plain JSON file.
        You save it once at build time, commit it to
        the repo (or push it to an artifact store),
        and load it at inference. The Signature and
        module code stay in Python; the compiled
        state (prompts, few-shot demos, tuned
        instructions) lives in JSON.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/save_and_load.py"
        code={`# Build time: compile once, save the artifact.
compiled = optimizer.compile(pipeline, trainset=train)
compiled.save("artifacts/fact_check_v3.json")

# Deploy: the artifact ships with the container.

# Runtime: load and serve. No optimizer, no train set.
import dspy

dspy.configure(lm=dspy.LM("openai/gpt-5.4-mini"))
pipeline = FactCheck()
pipeline.load("artifacts/fact_check_v3.json")

@app.post("/factcheck")
def factcheck(article: str):
    result = pipeline(article=article)
    return {
        "claims": result.claims,
        "verdicts": result.verdicts,
        "summary": result.summary,
    }`}
      />
      <p className="mb-6 leading-relaxed">
        Two production rules cover most deployments.
        First, treat the compiled JSON as an
        immutable artifact per release. If quality
        regresses in prod, rolling back a filename is
        cleaner than rolling back a git branch.
        Second, keep the training set alongside the
        artifact and re-compile in CI on every model
        version bump. A one-hour compile step in
        nightly CI catches regressions on the day the
        upstream model changes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MLflow tracing and the Databricks stack
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern most teams settle on for
        observability is MLflow autolog. One line
        turns on tracing for every DSPy call, and
        MLflow records the Signature, the resolved
        prompt, the LM response, the parsed
        Prediction, and the token counts. On
        Databricks the same tracing lands in the
        model-serving dashboards; off Databricks it
        goes to a self-hosted MLflow tracking
        server.
      </p>
      <CodeBlock
        language="python"
        filename="src/dspy_intro/tracing.py"
        code={`import mlflow
import dspy

mlflow.set_experiment("/Users/team/fact-check-agent")
mlflow.dspy.autolog()

# Every DSPy call from here is traced.
pipeline = FactCheck()
pipeline.load("artifacts/fact_check_v3.json")

with mlflow.start_run(run_name="prod-v3"):
    result = pipeline(article=news_article)
    mlflow.log_metric("num_claims", len(result.claims))`}
      />
      <p className="mb-6 leading-relaxed">
        Databricks ships the recommended production
        path as{" "}
        <em>DSPy plus MLflow plus Model Serving</em>.
        JetBlue is the public case: multiple chatbots
        running the DSPy compiled artifact under
        Model Serving with MLflow tracing for
        eval-in-production. The pattern is the same
        one we use on client work: compile in a
        notebook, log the compiled program as an
        MLflow model, register it, and let Model
        Serving hand out inference. The switch to
        DSPy did not require a new deploy story;
        MLflow already covers it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production reads from Shopify, Dropbox,
        Replit, and AWS
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Shopify: 550x cost reduction on
        metadata extraction.</strong> Shopify ran
        DSPy across every shop to extract product
        metadata (categories, tags, attributes) that
        used to run on a much larger and more
        expensive model with a hand-tuned prompt.
        They moved to a smaller model plus a DSPy
        compiled program, and the reported per-shop
        cost dropped by around 550x while keeping
        the same accuracy on their internal eval.
        The Signature-Module split is what made the
        model swap safe: they kept the Signature and
        swapped the LM binding, then re-compiled.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Dropbox: tuning the Dash relevance
        judge.</strong> Dropbox uses DSPy to
        optimize the LLM judge that scores search
        relevance for Dash, their enterprise search
        product. The public write-up on the Dropbox
        tech blog covers how they used DSPy to move
        their judge past a hand-tuned baseline on
        their labeled eval set, with the compiled
        artifact checked into the repo alongside the
        judge code.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Replit: a code-repair pipeline.</strong>{" "}
        Replit uses DSPy for the code-repair
        pipeline that turns a build error into a
        proposed patch. The pipeline is a composed
        module: a diagnostic Signature reads the
        error and the file, a proposal Signature
        drafts the patch, and a verification
        Signature runs it back through a checker.
        Each Signature is compiled independently
        and the artifact ships with the model
        release.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS: prompt migration for Amazon
        Nova.</strong> The AWS Machine Learning blog
        published a walkthrough of using DSPy to
        migrate prompts from a larger model to a
        smaller Amazon Nova model with a
        data-aware compile step. The point is the
        same one Shopify hit: DSPy makes the
        model-swap safe because the task contract
        (the Signature) does not change.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where DSPy fits vs LangGraph, plain
        prompting, and fine-tuning
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is not a graph runtime, and it is not
        an agent framework in the LangGraph or
        OpenAI Agents SDK sense. It sits one layer
        below: it is the compile-time optimizer for
        the LLM calls that make up a graph. Teams
        that run LangGraph often use DSPy to compile
        the prompts inside their LangGraph nodes,
        then wire the compiled modules into the
        graph. The two solve different problems:
        LangGraph orchestrates state; DSPy tunes the
        LLM calls that run inside that state.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use DSPy</strong> when the task has
        a clear metric (accuracy, F1, LLM judge
        score), when you can produce 50+ labeled
        examples, when the same task will run
        millions of times so the compile cost
        amortizes, or when the model is likely to
        change and you want the prompt to keep up
        automatically. Extraction, classification,
        RAG answer generation, judges, and repeated
        pipeline steps are the canonical fits.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Do not use DSPy</strong> when the
        task is a one-off (a single user-facing
        chat with no metric), when you have zero
        labeled data and no way to bootstrap it,
        when the task requires long-horizon
        planning that is more about state than
        prompt quality (that is a LangGraph or
        Temporal problem), or when the deployment
        target does not tolerate the extra Python
        dependency footprint.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>DSPy vs fine-tuning</strong> is the
        other question. Fine-tuning ships a new set
        of weights; DSPy ships a new prompt. On
        most tasks that we have measured, GEPA on a
        Sonnet or GPT-5.4-mini closes 60-80% of the
        gap between the base model and a full
        fine-tune, at a fraction of the cost, and
        with no serving change. Fine-tune when the
        task needs a real style shift or a domain
        vocabulary the base model does not have;
        compile with DSPy for everything else.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real trade-offs we hit on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>The metric is the bottleneck.</strong>{" "}
        A DSPy optimizer is only as good as its
        metric. A weak metric (exact-match on a
        free-form field) leads GEPA to over-fit to
        surface features. Invest in an LLM judge or a
        semantic-similarity metric before you invest
        in more training data. On extraction tasks
        we typically spend more engineering time on
        the metric than on the pipeline.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Feedback strings matter for
        GEPA.</strong> The reflection LM reads the
        feedback field to figure out how to change
        the prompt. Return specific, actionable
        strings ("the model missed the recipient
        email in line 3"), not vague ones ("wrong").
        The difference on a real run is often 5-10
        points of accuracy.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Compile budget is a real
        line item.</strong> A GEPA{" "}
        <code>auto=&quot;medium&quot;</code> run
        against 100 training examples with a
        Sonnet-class reflection LM lands in the
        $5-$30 range. A <code>heavy</code> run on
        larger sets can go to hundreds of dollars.
        This is one-time cost per release, not per
        request, but budget for it and run compile
        as a scheduled job, not on developer
        machines.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Version the artifact, not just
        the code.</strong> The compiled JSON is
        part of the release. Tag it, track it in an
        artifact store, and refuse to deploy a code
        change without a matching compiled artifact.
        The one operational incident we hit was a
        code change that outran a stale artifact:
        Signature had a new field, artifact did
        not, and the parser silently dropped it.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Do not compile against synthetic
        data alone.</strong> Bootstrap synthetic
        examples to seed the optimizer, but always
        validate on a held-out set of real
        production examples. GEPA is a good enough
        optimizer to over-fit synthetic patterns
        that do not survive contact with real
        users.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Compile per model, not per
        binding.</strong> A compiled artifact is
        tied to a model family, not a model
        version. Recompile when you move from
        Claude Sonnet to Haiku or from GPT-5.4 to
        GPT-5.5. Same-family minor bumps usually
        transfer; family swaps do not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy 3.3 and what to watch through the rest
        of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>ReActV2 and the smaller default
        prompt.</strong> DSPy 3.3.0b1 shipped a
        rewritten ReAct module with a tighter
        tool-argument schema and roughly a third
        less prompt overhead. If you have a
        tool-heavy agent, the version bump is worth
        it just for the token savings. The old
        <code>dspy.ReAct</code> still ships for
        backward compatibility.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>BaseLM as the extension point.</strong>{" "}
        The 3.3 release factored the LM backend into
        a <code>BaseLM</code> class. Custom
        backends (local models, private gateways,
        internal inference servers) are now a
        subclass, not a fork. This has been the
        biggest quality-of-life change for teams
        that self-host models.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Recursive Language Models.</strong>{" "}
        The December 2025 paper (arxiv
        2512.24601) extends DSPy programs to call
        themselves as sub-modules. It is the
        research path toward multi-agent programs
        where the compiler tunes both the parent
        prompt and the sub-agent prompts jointly.
        Expect to see this land as a module type
        during 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-framework GEPA.</strong>{" "}
        The standalone <code>gepa-ai/gepa</code>{" "}
        library has been integrated into Google
        Cloud ADK and Pydantic AI in early 2026, so
        the optimizer is no longer DSPy-only. That
        makes GEPA a portable optimizer for any
        typed LLM program, and it means teams on
        other frameworks can adopt the same
        compile-then-deploy pattern without
        rewriting to DSPy.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Compile-in-CI as a standard
        practice.</strong> Every team that has
        shipped DSPy to production long enough has
        landed on the same operational pattern: run
        <code>compile</code> in nightly CI against
        a pinned training set, gate deploy on the
        eval metric, and only promote the artifact
        if the number moves the right way. It is
        the LLM equivalent of a test suite. Expect
        this to become a standard part of the
        LLMOps toolchain in 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: prompt as compiled artifact
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is the framework that took the
        &ldquo;prompt as source code&rdquo; idea
        seriously and built a real compiler for it.
        The Signature is the contract. The Module
        is the strategy. The Optimizer is the
        build step. What ships to production is not
        a hand-written prompt; it is a JSON
        artifact that was tuned against a metric on
        labeled data. When the model changes, you
        recompile. When the metric changes, you
        recompile. When a reviewer wants to see
        why the pipeline gives a specific answer,
        the trace shows the resolved prompt and
        every step.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2025 and 2026 story is that GEPA made
        the optimizer good enough that the compile
        step actually beats hand-tuning on real
        tasks, and the ecosystem (MLflow tracing on
        Databricks, ReActV2, BaseLM for custom
        backends) made the deploy story boring in
        the good sense. On client work we now reach
        for DSPy on any task where we can define a
        metric and produce 50+ labeled examples,
        and the payoff shows up in both quality
        (5-25 point accuracy gains over hand-tuned
        prompts) and total cost (Shopify&rsquo;s
        550x is an outlier, but 5-20x cost
        reductions are common when moving from a
        large model to a smaller compiled program).
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy question does not really
        apply here because DSPy is a compile-time
        tool, not a hosted service. The real choice
        is whether to keep hand-writing prompts and
        pay the maintenance tax, or to invest a
        week in the Signature-Module-Optimizer
        model and get a repeatable pipeline for
        every future LLM task. In 2026 the second
        choice is usually the right one.
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
            DSPy official site and documentation
          </a>
          {" "}- the current DSPy 3.3 docs with
          Signature and Module tutorials, plus
          the full optimizer API surface.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2507.19457"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GEPA: Reflective Prompt Evolution Can
            Outperform Reinforcement Learning
            (Agrawal et al., ICLR 2026 oral)
          </a>
          {" "}- the paper with the 6% average and
          20% top-line beat over GRPO, the 35x
          rollout reduction, and the +10% over
          MIPROv2 on reasoning tasks.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2310.03714"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy: Compiling Declarative Language
            Model Calls into Self-Improving
            Pipelines (Khattab et al., 2023)
          </a>
          {" "}- the original DSPy paper that
          defines the Signature-Module-Optimizer
          model.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2406.11695"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIPROv2: Optimizing Instructions and
            Demonstrations for Multi-Stage LM
            Programs (Opsahl-Ong et al., 2024)
          </a>
          {" "}- the pre-GEPA state of the art on
          joint instruction and few-shot
          optimization.
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
          {" "}- the recommended production path
          for compound AI apps, including MLflow
          tracing and Model Serving.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Optimizing LLM Pipelines
            with DSPy (JetBlue case)
          </a>
          {" "}- multi-tool DSPy agent with
          Marketplace models, deployed via Model
          Serving.
        </li>
        <li>
          <a
            href="https://dropbox.tech/machine-learning/optimizing-dropbox-dash-relevance-judge-with-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dropbox: Optimizing the Dash
            Relevance Judge with DSPy
          </a>
          {" "}- the production write-up on the
          Dropbox tech blog.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/machine-learning/improve-amazon-nova-migration-performance-with-data-aware-prompt-optimization/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Improve Amazon Nova migration
            with data-aware prompt optimization
          </a>
          {" "}- the AWS walkthrough of using
          DSPy to migrate prompts to a smaller
          Nova model.
        </li>
        <li>
          <a
            href="https://blog.replit.com/code-repair"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replit: Code repair with DSPy
          </a>
          {" "}- the code-repair pipeline that
          synthesizes diffs with a composed DSPy
          module.
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
          {" "}- the source, releases, and the
          3.3.0b1 changelog for ReActV2 and
          BaseLM.
        </li>
        <li>
          <a
            href="https://mlflow.org/docs/latest/genai/flavors/dspy/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLflow DSPy flavor documentation
          </a>
          {" "}- the tracing, logging, and
          deployment story for DSPy programs.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph runtime that DSPy
          modules often plug into as compiled
          nodes.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in
            2026
          </a>
          {" "}- the deeper read on prompt
          budgets and compression that DSPy
          Signatures interact with.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in
            2026
          </a>
          {" "}- the eval story that DSPy
          compile depends on.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the cost-reduction playbook
          that DSPy fits into.
        </li>
      </ul>
    </div>
  );
}
