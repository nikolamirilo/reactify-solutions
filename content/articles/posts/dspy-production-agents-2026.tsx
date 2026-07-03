import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 37,
  slug: "dspy-production-agents-2026",
  title:
    "DSPy 3 in production 2026: from Stanford paper to self-optimizing agents at Shopify, JetBlue, and Replit",
  excerpt:
    "How DSPy went from a Stanford NLP research paper to the framework behind Shopify's ~550x cost reduction on metadata extraction, JetBlue's chatbots on Databricks, Dropbox's Dash relevance judge, and Replit's code repair pipeline. Covers Signatures, Modules, Optimizers, the new GEPA optimizer that beat GRPO with 35x fewer rollouts, MLflow tracing, and the honest trade-offs against LangGraph, CrewAI, and LlamaIndex Workflows.",
  metaDescription:
    "A practical, technical guide to DSPy in 2026. Covers the Signature, Module, and Optimizer primitives, ReAct and ReActV2 agents, the GEPA reflective optimizer that beat GRPO by 6-20% while using 35x fewer rollouts, MIPROv2, BootstrapFewShot, MLflow tracing, caching, program saving, real production case studies at Shopify, JetBlue, Dropbox, AWS Amazon Nova, Replit, and Nous Research, and a clear-eyed comparison with LangGraph, CrewAI, and LlamaIndex Workflows.",
  image:
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "DSPy",
    "Stanford",
    "Databricks",
    "GEPA",
    "MLflow",
    "Python",
    "Prompt Optimization",
    "Production",
    "RAG",
  ],
  publishDate: "2026-07-03",
  readingTime: "16 min read",
};

export default function DspyProductionAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most agent frameworks ask you to write prompts.
        DSPy asks you to write Python. You declare the task
        with a typed signature, pick a module that runs it,
        and let an optimizer compile the actual prompt from
        examples and a metric. The framework has grown from
        the Demonstrate-Search-Predict paper at Stanford in
        December 2022 into a Python package with 35,000+
        GitHub stars, 6.4 million monthly downloads, and 433
        contributors, and it is in production at Shopify,
        Databricks, Dropbox, JetBlue, AWS, Replit, Moody&rsquo;s,
        VMware, and Sephora. DSPy 3.0 shipped in August 2025
        with signatures, modules, and a compilation process
        that tunes prompts and weights automatically, and the
        3.3 line landed in 2026 with a new ReActV2 module
        and the GEPA optimizer that beat reinforcement
        learning on six benchmarks. This article is how we
        use DSPy on client engagements: what the primitives
        actually do, how the optimizers work in practice, and
        how DSPy compares to LangGraph, CrewAI, and LlamaIndex
        Workflows for real production work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why DSPy became a serious production choice
      </h2>
      <p className="mb-6 leading-relaxed">
        The pitch is direct. Every prompt-based system in
        production drifts. The model changes, the input
        distribution changes, the downstream metric changes,
        and the prompt that was hand-tuned in the notebook
        goes stale. Teams patch the prompt, add another
        instruction, and ship again. That cycle is the
        default path from a proof of concept to a real
        system, and it is the reason so many pilots never
        cross the gap. DSPy replaces the patch loop with a
        compile step. You define what the system should do,
        provide a small training set, pick an optimizer, and
        the framework searches the prompt and demonstration
        space for you. When the model changes, you recompile.
        When the metric changes, you recompile. The prompt
        stops being the artifact you edit by hand.
      </p>
      <p className="mb-6 leading-relaxed">
        The results are not marketing numbers. On the
        HotPotQA and GSM8K benchmarks the original DSPy
        paper reported an increase from 33% to 82% for
        GPT-3.5 and 9% to 47% for Llama2-13b-chat compared to
        few-shot prompting with human-written demonstrations.
        Shopify used DSPy plus the new GEPA optimizer to run
        structured metadata extraction across all Shopify
        shops and cut the yearly cost by roughly 550 times.
        AWS reported that DSPy prompt optimization let them
        migrate workloads from a larger to a smaller Amazon
        Nova model while keeping performance intact. Dropbox
        rebuilt the Dash relevance judge with DSPy for both
        ranking and offline evaluation. Replit uses a DSPy
        pipeline to synthesize code repair diffs. These are
        not demos.
      </p>
      <p className="mb-6 leading-relaxed">
        DSPy is also runtime-neutral by design. You can run
        a DSPy program in a plain Python process, in
        Databricks Model Serving with the built-in{" "}
        <code>dspy.Databricks</code> and{" "}
        <code>DatabricksRM</code> integrations, in a FastAPI
        service, in an MLflow-tracked deployment, in Modal,
        in a Cloud Run container, or on a laptop. The
        framework has no scheduler, no daemon, and no queue
        of its own. That keeps the surface small and makes
        it easy to drop into any existing service without
        rewriting the deployment.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The compilation model: signatures, modules, and
        optimizers
      </h2>
      <p className="mb-6 leading-relaxed">
        Everything in DSPy comes back to three primitives.
        A <strong>Signature</strong> is the typed declaration
        of a task: what fields go in, what fields come out,
        and a docstring that describes the intent. A{" "}
        <strong>Module</strong> is the strategy that runs
        the signature: a direct predict, chain-of-thought,
        a ReAct loop with tools, a custom composition of
        other modules. An <strong>Optimizer</strong> compiles
        the program against a metric and a training set: it
        picks demonstrations, rewrites instructions, and can
        even fine-tune weights. The unusual part is that the
        three primitives are separated. Changing the strategy
        does not force a rewrite of the task, and changing
        the model does not force a rewrite of the strategy.
        The optimizer is not tied to any specific module
        either, so you can swap BootstrapFewShot for MIPROv2
        or GEPA without touching the pipeline.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy compilation model"
        code={`+-------------------------------------------------------------+
|  DSPy program                                               |
|                                                             |
|   +--------------+     +---------------+     +-----------+  |
|   | Signature    |---->| Module        |---->| LM/RM     |  |
|   |  (typed IO)  |     |  strategy     |     |  backend  |  |
|   +--------------+     +---------------+     +-----------+  |
|                                                             |
|   Optimizer.compile(module, trainset, metric)               |
|         |                                                   |
|         v                                                   |
|   +--------------+                                          |
|   | Compiled     |  <-- saved as JSON, loaded in prod       |
|   | program      |                                          |
|   +--------------+                                          |
|                                                             |
|   MLflow autolog  ->  spans, traces, artifacts, metrics     |
+-------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The smallest useful program is five lines. The
        example below is an event extractor. The signature
        declares the input and output fields, the Predict
        module runs it as a direct LM call, and the compiled
        prompt is generated by DSPy behind the scenes from
        the field names and the docstring.
      </p>
      <CodeBlock
        language="python"
        filename="src/extractors/event.py"
        code={`import dspy

lm = dspy.LM("openai/gpt-5.4-nano")
dspy.configure(lm=lm)

class ExtractEvent(dspy.Signature):
    """Extract event details from an email."""

    email: str = dspy.InputField()
    event_name: str = dspy.OutputField()
    date: str = dspy.OutputField()

extract = dspy.Predict(ExtractEvent)

result = extract(email=inbox_message)
# Prediction(event_name="Team Offsite", date="Thursday, June 5")`}
      />
      <p className="mb-6 leading-relaxed">
        Two changes shift this from a predict into an
        agent. First, swap the module: replace{" "}
        <code>dspy.Predict</code> with{" "}
        <code>dspy.ChainOfThought</code> to add reasoning,
        or with <code>dspy.ReAct</code> to add tools and a
        loop. Second, pass a list of Python functions as
        tools. DSPy converts each function into a tool
        description and lets the model call it, with the
        arguments type-checked against the function
        signature.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/research.py"
        code={`import dspy

def search(query: str) -> list[str]:
    """Search a knowledge base and return the top passages."""
    return kb.query(query, k=3)

def calc(expr: str) -> float:
    """Evaluate a math expression."""
    return dspy.PythonInterpreter({}).execute(expr)

agent = dspy.ReAct(
    "question -> answer",
    tools=[search, calc],
    max_iters=5,
)

result = agent(question="GDP per capita of France?")
# thought 1: I need France's GDP and population.
# action 1: search("France GDP") -> [...]
# thought 2: Divide GDP by population.
# action 2: calc("3.13e12 / 68e6") -> 46029.4
# Prediction(answer="$46,029")`}
      />
      <p className="mb-6 leading-relaxed">
        The signature format also accepts a string
        shorthand: <code>&quot;question -&gt; answer&quot;</code> in the
        example above is equivalent to a signature class
        with a string <code>question</code> input and a
        string <code>answer</code> output. That shorthand
        is fine for prototyping, but the class form with
        typed fields and a docstring is the version we ship
        in production because it makes the interface visible
        at import time and lets Pydantic validate the model
        output against the field types.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Modules in practice: Predict, ChainOfThought, ReAct,
        ReActV2, and custom compositions
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Predict</strong> is the direct call. It
        takes a signature, formats the prompt, sends it to
        the configured LM, and parses the outputs into a
        Prediction object. It has no reasoning field, no
        tool loop, and no state. This is what we use for
        classifiers, extractors, and any single-step
        transformation.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ChainOfThought</strong> adds a hidden
        reasoning field that the model fills in before the
        final outputs. The signature stays the same. This is
        what we use for judgement tasks, math, and any task
        where the model needs to plan the answer before it
        commits.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>ReAct</strong> adds a tool-use loop. The
        model produces a thought, picks a tool, gets a
        result, produces another thought, and so on until it
        emits the final output or hits{" "}
        <code>max_iters</code>. Tools are plain Python
        functions with type hints. The 3.3 release added{" "}
        <strong>ReActV2</strong>, which reworks the loop
        with a cleaner state format and better tool-error
        recovery. On our engagements we default to ReActV2
        for any agent that has to make more than two tool
        calls.
      </p>
      <p className="mb-6 leading-relaxed">
        Custom modules compose the built-ins. The pattern
        is a Python class that inherits from{" "}
        <code>dspy.Module</code>, declares child modules in{" "}
        <code>__init__</code>, and implements{" "}
        <code>forward</code>. The forward method is plain
        Python: loops, conditionals, exceptions, and any
        deterministic code you want. That is the part that
        makes DSPy feel different from LangGraph. You do not
        draw a graph. You write the pipeline as Python and
        DSPy compiles the LM calls inside it.
      </p>
      <CodeBlock
        language="python"
        filename="src/pipelines/fact_check.py"
        code={`import dspy

class FactCheck(dspy.Module):
    def __init__(self):
        super().__init__()
        self.find = dspy.ChainOfThought(
            "article -> claims: list[str]"
        )
        self.verify = dspy.ChainOfThought(
            "claim, source -> verdict: Literal['supported', 'unsupported']"
        )

    def forward(self, article: str):
        found = self.find(article=article)
        return [
            self.verify(claim=c, source=article)
            for c in found.claims
        ]

fc = FactCheck()
# fc(article=news_article) ->
# [Prediction(verdict="supported"),
#  Prediction(verdict="unsupported"),
#  Prediction(verdict="supported")]`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Optimizers: BootstrapFewShot, MIPROv2, and GEPA
      </h2>
      <p className="mb-6 leading-relaxed">
        The optimizer is where DSPy earns its keep. You
        give it a module, a training set of input-output
        pairs, and a metric function that returns a score
        for a prediction. The optimizer runs the module on
        the training set, scores the outputs, and searches
        for a better prompt: a better instruction, a better
        set of few-shot demonstrations, or both. The output
        is a compiled module you can save and load. You do
        not edit the prompt yourself.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>BootstrapFewShot</strong> is the entry
        point. It uses the module itself to generate
        candidate demonstrations from the training set,
        keeps the ones that score well against the metric,
        and packs them into the prompt as few-shot examples.
        It is the fastest optimizer, works with 5 to 20
        examples, and is often enough for extractors and
        classifiers.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MIPROv2</strong> is the workhorse from the
        Stanford paper in June 2024. It runs a Bayesian
        search over instruction candidates and demonstration
        sets, uses a proposal model to write new
        instructions, and evaluates each candidate against
        the metric. It is more expensive than
        BootstrapFewShot but usually produces a better
        program, and it is the optimizer we default to for
        production pipelines with 20 to 200 examples.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>GEPA</strong> is the 2025 release that
        changed the story. GEPA stands for Genetic-Pareto,
        and it is a reflective optimizer that samples full
        execution trajectories (reasoning, tool calls, tool
        outputs), reflects on them in natural language to
        diagnose failures, proposes prompt updates that
        target the failure, and combines complementary
        lessons on a Pareto frontier. The paper (Agrawal et
        al., 2025, accepted as an ICLR 2026 Oral) shows
        GEPA beating GRPO reinforcement learning by 6% on
        average and up to 20% across six tasks, while using
        up to 35 times fewer rollouts. It also beat MIPROv2
        by over 10% and pushed AIME-2025 accuracy up by 12%.
        The practical implication is that a small run on a
        few hundred examples can now match what previously
        required thousands of RL rollouts on a GPU cluster.
      </p>
      <CodeBlock
        language="python"
        filename="src/compile/optimize_rag.py"
        code={`import dspy
from dspy.evaluate import SemanticF1

trainset: list[dspy.Example] = load_trainset()
metric = SemanticF1()

# Program under optimization
rag = RAG()  # a dspy.Module built from ChainOfThought + Retrieve

# BootstrapFewShot: fastest, best for 5 to 20 examples
bfs = dspy.BootstrapFewShot(metric=metric, max_bootstrapped_demos=4)
rag_bfs = bfs.compile(rag, trainset=trainset[:20])

# MIPROv2: Bayesian search, best for 20 to 200 examples
mipro = dspy.MIPROv2(metric=metric, auto="medium")
rag_mipro = mipro.compile(rag, trainset=trainset[:200])

# GEPA: reflective evolution, best when the module has multi-step
# trajectories (ReAct, agents, or composed modules)
gepa = dspy.GEPA(metric=metric, auto="medium")
rag_gepa = gepa.compile(rag, trainset=trainset[:200])

# Save the compiled program so production loads it as JSON
rag_gepa.save("dist/rag.v2.json")`}
      />
      <p className="mb-6 leading-relaxed">
        A rough guide on when to use which optimizer. Use
        BootstrapFewShot when the task is a single-step
        classification or extraction with 5 to 20 clean
        examples. Use MIPROv2 when you have 20 to 200
        examples and the task has one or two LM calls. Use
        GEPA when the module is agentic (ReAct, tool loops,
        or composed modules with multiple LM calls) and the
        error signal is qualitative: a metric that returns
        a natural-language explanation of the failure
        outperforms a metric that returns only a scalar
        score, because GEPA feeds the explanation into the
        reflection step. On our engagements the switch from
        MIPROv2 to GEPA on an agentic pipeline has been the
        largest single-step accuracy jump we have measured.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A production RAG pipeline end to end
      </h2>
      <p className="mb-6 leading-relaxed">
        The canonical DSPy example is retrieval-augmented
        generation. The Databricks engineering blog wrote
        this out in detail with DBRX as the LM and Databricks
        Vector Search as the retriever, and JetBlue used the
        same pattern for multiple chatbot use cases on
        Databricks. The version below is the one we ship
        with clients: typed signatures, a composed module,
        a metric, and a compiled artifact saved to disk.
      </p>
      <CodeBlock
        language="python"
        filename="src/pipelines/rag.py"
        code={`import dspy
from dspy.retrieve.databricks_rm import DatabricksRM

# 1. Configure the LM and RM
lm = dspy.LM(
    "databricks/databricks-dbrx-instruct",
    api_key=os.environ["DATABRICKS_API_KEY"],
    api_base=os.environ["DATABRICKS_API_BASE"],
)

rm = DatabricksRM(
    databricks_index_name="prod.rag.docs_index",
    databricks_endpoint=os.environ["DATABRICKS_WORKSPACE_URL"],
    databricks_token=os.environ["DATABRICKS_API_TOKEN"],
    columns=["id", "text", "metadata", "text_vector"],
    k=3,
)

dspy.configure(lm=lm, rm=rm)

# 2. Declare the task
class RAGSignature(dspy.Signature):
    """Answer a question using the retrieved context."""

    context: list[str] = dspy.InputField(desc="Top-k retrieved passages")
    query: str = dspy.InputField()
    answer: str = dspy.OutputField()

# 3. Compose the module
class RAG(dspy.Module):
    def __init__(self, k: int = 3):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=k)
        self.generate = dspy.ChainOfThought(RAGSignature)

    def forward(self, query: str):
        passages = self.retrieve(query).passages
        return self.generate(context=passages, query=query)

# 4. Metric: semantic F1 against a gold answer
from dspy.evaluate import SemanticF1
metric = SemanticF1()

# 5. Compile with GEPA
gepa = dspy.GEPA(metric=metric, auto="medium")
compiled = gepa.compile(RAG(), trainset=load_trainset())

# 6. Save the artifact
compiled.save("dist/rag.production.json")`}
      />
      <p className="mb-6 leading-relaxed">
        In production, the loading side is one line:
      </p>
      <CodeBlock
        language="python"
        filename="src/server/main.py"
        code={`import dspy
from fastapi import FastAPI
from pipelines.rag import RAG

app = FastAPI()

rag = RAG()
rag.load("dist/rag.production.json")

@app.post("/answer")
async def answer(query: str):
    result = rag(query=query)
    return {"answer": result.answer}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Runtime: caching, saving, and MLflow tracing
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy caches LM responses by default. Two identical
        calls with the same model and the same prompt return
        the same output without a second API call. That
        matters during compilation because MIPROv2 and GEPA
        can make hundreds of calls, and it matters in
        production because it cuts the cost of repeated
        queries. You can disable the cache per module or per
        call when you need fresh generations.
      </p>
      <p className="mb-6 leading-relaxed">
        Saving is JSON-based. A compiled program serializes
        its instructions, demonstrations, and any tuned
        parameters into a single file. Loading recreates the
        program in a fresh process without re-running the
        optimizer. That is what makes DSPy safe to ship in a
        stateless service: the artifact is a small file, not
        a running training loop, and it is diff-friendly in
        git.
      </p>
      <p className="mb-6 leading-relaxed">
        Observability comes through MLflow. The official
        MLflow DSPy flavor logs the program, the compiled
        prompt, the training set, the metric, and the
        evaluation run. During compilation you get a trace
        per candidate prompt, which is the most useful view
        we have found for debugging why an optimizer picked
        one instruction over another. In production you get
        per-request traces that include the LM call, the
        retrieval, and the tool calls, all in the same span
        tree as the rest of the service.
      </p>
      <CodeBlock
        language="python"
        filename="src/train/track.py"
        code={`import mlflow
import dspy

mlflow.set_tracking_uri("http://mlflow.internal:5000")
mlflow.set_experiment("rag-production")
mlflow.dspy.autolog()

with mlflow.start_run(run_name="rag-gepa-v2"):
    gepa = dspy.GEPA(metric=metric, auto="medium")
    compiled = gepa.compile(RAG(), trainset=trainset)

    # MLflow logs the program, prompts, demos, and evaluation
    mlflow.dspy.log_model(compiled, artifact_path="model")
    mlflow.log_metric("semantic_f1_dev", evaluate(compiled, devset))`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production case studies
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Shopify.</strong> Structured metadata
        extraction across every Shopify shop. The team used
        DSPy plus GEPA to compile a small extractor that
        replaced a much larger, hand-prompted pipeline. The
        result was a roughly 550 times reduction in the
        yearly cost of the extraction workload. The talk
        (Shopify at the DSPy community day) walked through
        the metric choice, the training set size, and the
        reason GEPA specifically was the optimizer that
        moved the needle: the failures were qualitative,
        and the reflection step let the optimizer target
        them directly.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>JetBlue.</strong> Multiple chatbot use cases
        running on Databricks. The Databricks blog covers
        the RAG pattern with DBRX and Databricks Vector
        Search, and JetBlue chose DSPy for two reasons: the
        pipeline was portable across the model changes
        Databricks was shipping, and the compilation step
        gave them a repeatable way to re-tune when the
        knowledge base grew. The engineering team called out
        that DSPy&rsquo;s modules matched the way they had
        already structured their internal pipeline stages,
        so the migration was mostly a rewrite of the prompt
        strings into signatures.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Dropbox.</strong> The Dash relevance judge.
        Dropbox rewrote the LM-as-a-judge component that
        ranks Dash results with DSPy, and used it for both
        online ranking and the offline evaluation pipeline.
        The engineering blog frames DSPy as the reason the
        team could reuse the same judge across ranking,
        training data generation, and evaluation without
        maintaining three prompts. The compiled judge is
        loaded at service start and re-compiled on a weekly
        cadence.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>AWS Amazon Nova.</strong> DSPy prompt
        optimization used to migrate workloads from a larger
        to a smaller Nova model while keeping performance
        intact. The AWS Machine Learning blog frames this
        as data-aware prompt optimization: DSPy compiled a
        Nova-Micro prompt that matched or beat the Nova-Pro
        baseline on the target task, which cut the inference
        cost by the model-size ratio.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Replit.</strong> A code repair pipeline that
        synthesizes diffs. Replit uses DSPy to build the
        prompt stack around a code LM, and the compiled
        pipeline generates a diff for the failure case
        rather than a full rewrite. The engineering post
        (Replit blog, &ldquo;Code repair with code LLMs&rdquo;) shows
        DSPy as the harness that handles the retrieval,
        the LM call, and the diff synthesis, with the
        optimizer tuning the instruction for the diff
        format.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Nous Research.</strong> Evolutionary
        self-improvement for the Hermes agent. The
        <code> hermes-agent-self-evolution</code> repository
        uses DSPy + GEPA to optimize the agent&rsquo;s skills,
        prompts, and code. The interesting part is that the
        optimizer runs on the agent&rsquo;s trajectories, not on
        a pre-labeled dataset: the trace itself is the
        training signal, and GEPA&rsquo;s reflection turns the
        traces into new prompts. That pattern is starting to
        show up in more agent projects in 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        Beyond those, the DSPy use-cases page lists
        Databricks, DDI (leadership coaching agents on
        Databricks), Moody&rsquo;s (RAG, LM-as-a-judge, and
        agentic systems for financial workflows), VMware
        (RAG and prompt optimization), Sephora (undisclosed
        agent workloads), Haize Labs (automated red-teaming
        for LLMs), Infinitus (healthcare agents), and
        Normal Computing (spec translation from English into
        formal chip languages). The pattern across the list
        is that the teams using DSPy are the teams that need
        the pipeline to survive a model swap.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy compared to LangGraph, CrewAI, and LlamaIndex
        Workflows
      </h2>
      <p className="mb-6 leading-relaxed">
        The four frameworks solve overlapping problems from
        different angles, and the right choice depends less
        on features than on which control model matches your
        team.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph.</strong> Explicit graph of nodes
        and edges, first-class state and checkpoints, a
        clear runtime for durable execution and human-in-
        the-loop. If your pipeline is a state machine with
        branches, retries, and interrupts, LangGraph gives
        you the primitives directly. LangGraph does not
        optimize prompts. The prompts inside a LangGraph
        node are yours to tune.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>CrewAI.</strong> Role-based multi-agent
        orchestration with Crews (fixed roles) and Flows
        (event-driven pipelines). The framework leans on the
        role metaphor: define agents by role and goal, hand
        them tasks, and let the crew coordinate. CrewAI does
        not optimize prompts either, though it now integrates
        with observability tools that surface the same kind
        of trace DSPy uses for compilation.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LlamaIndex Workflows.</strong> An event-
        driven, step-based runtime with the retrieval and
        indexing story that LlamaIndex is known for. If your
        system is document-heavy and the retrieval is the
        hard part, LlamaIndex is the shortest path to a
        RAG-first pipeline. It stops short of prompt
        optimization.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>DSPy.</strong> Prompt optimization is the
        centerpiece. The runtime is intentionally thin: no
        graph, no scheduler, no queue. Compose Python
        modules, define a metric, compile with an optimizer,
        and ship a JSON artifact. If your bottleneck is
        prompt drift, model migration cost, or the manual
        loop of tuning few-shot examples, DSPy pays for
        itself in the first project. If your bottleneck is
        multi-agent orchestration, durable state, or
        long-running interrupts, DSPy is a poor fit on its
        own and you should combine it with LangGraph or
        Temporal for the runtime side.
      </p>
      <p className="mb-6 leading-relaxed">
        The combination we ship most often is DSPy inside
        LangGraph nodes. LangGraph handles the graph,
        checkpointing, and human-in-the-loop. Each node
        that calls an LM is a compiled DSPy program loaded
        from JSON. The result is a durable graph with
        self-optimizing prompts, and both parts stay small.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Strengths and honest trade-offs
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Where DSPy wins.</strong> Prompt drift stops
        being an emergency. The compiled artifact is a small
        JSON file that lives in the repository next to the
        code, so a prompt change goes through a pull request
        and a review. Model swaps become recompiles rather
        than rewrites: point the same DSPy program at a new
        LM and rerun the optimizer, and the compiled prompt
        is tuned for the new model without a human touching
        it. The type-checked signatures cut down on
        malformed outputs, and the Pydantic layer catches
        the ones that slip through at the parse step, not
        five services deep. And the runtime cost is low:
        caching, JSON save-and-load, and no daemon.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Where DSPy is thin.</strong> There is no
        graph. There is no scheduler. There is no built-in
        durable state, no queue, and no first-class human-
        in-the-loop pattern. If your production system needs
        those things, you pair DSPy with LangGraph, Temporal,
        Prefect, or another workflow runtime and let DSPy
        own only the compiled LM calls inside. Compilation
        is not free: MIPROv2 and GEPA can make hundreds of
        LM calls during a compile run, and while caching
        makes reruns cheap, the first pass on a new model is
        a real cost item. The metric matters more than in
        prompt-tuned pipelines: a bad metric produces a
        confidently wrong compiled program, and there is no
        UI that catches this for you. Debugging a compiled
        prompt takes more effort than debugging a
        hand-written one because the instruction is
        machine-generated and the demonstrations are
        selected from the training set: MLflow tracing is
        the practical fix, and we now treat it as required
        for any DSPy project past the prototype stage.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When to use DSPy.</strong> Pipelines with a
        clear metric and a training set of tens to hundreds
        of examples. Systems that will migrate models more
        than once. Structured extraction, classification,
        RAG with a defensible ground truth, and agentic
        pipelines where the trajectory itself is the signal.
        Anything that a domain expert can score, DSPy can
        optimize.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>When not to use DSPy.</strong> One-shot
        creative tasks with no metric. Systems that need
        durable multi-day execution and hand-off queues
        (use Temporal, or LangGraph on top of DSPy).
        Situations where the team already has a stable
        prompt and no plan to migrate the model. And any
        team that is not willing to invest in a metric: DSPy
        without a metric is just a prompt library.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch in 2025 to 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Reflection over reinforcement learning.</strong>
        GEPA is the first prompt optimizer that convincingly
        beat a strong RL baseline (GRPO) on general tasks,
        and it did it with 35 times fewer rollouts. The
        practical implication is that the RL post-training
        wave for agents (the one NVIDIA, Meta, and others
        have been pushing with Group Relative Policy
        Optimization and its variants) has a lighter
        alternative for teams that do not have a GPU
        cluster. Expect more reflective optimizers on top of
        DSPy through 2026, including ones tuned for
        code-generation and tool-use.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Recursive Language Models.</strong> The
        December 2025 Recursive Language Models paper from
        the DSPy group extends the framework with recursion
        as a first-class control primitive. The pattern is
        that a program can call itself as a sub-module,
        which turns the framework into a proper
        general-purpose compiler for LM programs. This is
        early, and the API is still moving, but it is the
        direction the research side is pushing hardest.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-native optimizers.</strong> The 3.3
        release with ReActV2 is a hint at where the module
        story is going. The pattern is that agents are
        harder to optimize than single-step predicts because
        the failure can happen at any of five or six tool
        calls. New optimizers are converging on trajectory-
        level reflection: score the whole trace, reflect on
        the failure step, and rewrite the instruction that
        caused it. That is the direction GEPA is already
        moving, and it is the reason we default to it for
        any agentic module.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-framework interoperability.</strong>
        DSPy is starting to be the compilation layer inside
        other frameworks rather than a competing framework
        of its own. The LangGraph plus DSPy combination is
        common, LlamaIndex is exposing its retrievers as
        DSPy-compatible RMs, and MLflow is treating DSPy as
        a first-class flavor next to LangChain and
        Transformers. Expect DSPy to show up as the
        optimization backend for more agent runtimes in
        2026, in the same way that Torch became the backend
        for other ML frameworks.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise adoption on Databricks.</strong>
        Databricks has invested heavily in the DSPy
        integration: <code>dspy.Databricks</code>,{" "}
        <code>DatabricksRM</code>, MLflow autolog, and the
        managed compile jobs on Model Serving. The Databricks
        AI Summit sessions in 2025 and 2026 pushed DSPy as
        the recommended path for teams building compound AI
        on the platform. That has been the single largest
        driver of enterprise adoption we see: teams already
        on Databricks are picking DSPy because the runtime,
        the tracing, and the deployment all line up.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: program the LM, do not prompt it
      </h2>
      <p className="mb-6 leading-relaxed">
        For a team building a production LM pipeline in
        2026 that has a metric and will migrate models more
        than once, DSPy is the default pick. The three
        primitives (Signature, Module, Optimizer) are small
        enough to learn in an afternoon, the compilation
        model is honest about what it does and what it does
        not do, and the compiled artifact is a JSON file
        you can review in git. GEPA is the reason to look
        again if you tried DSPy before mid-2025: the
        reflective optimizer is a genuine step change over
        MIPROv2 for agentic workloads, and the numbers
        against GRPO are the strongest evidence yet that
        prompt optimization has caught up with lightweight
        post-training.
      </p>
      <p className="mb-6 leading-relaxed">
        The move on a new project is incremental. Start
        with a single <code>dspy.Predict</code> and a typed
        signature. Add a metric the moment you have twenty
        labeled examples. Compile with BootstrapFewShot for
        the first pass. Swap to MIPROv2 when you have more
        examples and want a better program. Move to GEPA
        when the pipeline gains a tool loop or a composed
        module. Wire MLflow autolog from day one so the
        compile runs are traceable. Ship the compiled JSON
        as an artifact in the deployment pipeline, not as a
        prompt string in the source code. That is the path
        we run on every DSPy engagement, and it is the one
        that keeps the prototype-to-production gap small,
        which is the gap most LM projects fail to cross.
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
            DSPy official site
          </a>
          {" "}- canonical reference for signatures, modules,
          optimizers, and the 3.3 release with ReActV2 and
          the improved LM/BaseLM.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2507.19457"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GEPA: Reflective Prompt Evolution Can Outperform
            Reinforcement Learning (Agrawal et al., 2025)
          </a>
          {" "}- the ICLR 2026 Oral paper on GEPA with the
          full benchmark set against GRPO and MIPROv2.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2310.03714"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy: Compiling Declarative Language Model Calls
            into Self-Improving Pipelines (Khattab et al.,
            2023)
          </a>
          {" "}- the original DSPy paper with the HotPotQA
          and GSM8K numbers that made the framework known
          outside Stanford.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/dspy-databricks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks Blog: DSPy on Databricks
          </a>
          {" "}- the engineering blog covering{" "}
          <code>dspy.Databricks</code>,{" "}
          <code>DatabricksRM</code>, and the RAG pattern with
          DBRX and Databricks Vector Search.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks Blog: Optimizing Databricks LLM
            Pipelines with DSPy (JetBlue)
          </a>
          {" "}- the JetBlue case study on multiple chatbot
          use cases powered by DSPy on Databricks.
        </li>
        <li>
          <a
            href="https://dspy.ai/community/use-cases/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DSPy in Production: use cases
          </a>
          {" "}- the community-maintained list of production
          users with links to Shopify, Dropbox, JetBlue,
          AWS, Replit, Nous Research, Moody&rsquo;s, VMware,
          Sephora, and more.
        </li>
        <li>
          <a
            href="https://dropbox.tech/machine-learning/optimizing-dropbox-dash-relevance-judge-with-dspy"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dropbox Tech Blog: Optimizing Dash Relevance
            Judge with DSPy
          </a>
          {" "}- Dropbox&rsquo;s engineering write-up of the LM-
          as-a-judge component behind Dash search ranking.
        </li>
        <li>
          <a
            href="https://blog.replit.com/code-repair"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replit Blog: Code repair with code LLMs
          </a>
          {" "}- Replit&rsquo;s DSPy pipeline for synthesizing
          diffs from a code LM.
        </li>
        <li>
          <a
            href="https://aws.amazon.com/blogs/machine-learning/improve-amazon-nova-migration-performance-with-data-aware-prompt-optimization/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS ML Blog: Improve Amazon Nova migration with
            data-aware prompt optimization
          </a>
          {" "}- AWS&rsquo;s account of using DSPy to migrate
          workloads from Nova-Pro to Nova-Micro while
          preserving performance.
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
          {" "}- the tracing, logging, and deployment
          integration used in production for observability
          across the compile and serve steps.
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
          {" "}- the source, the release notes for 3.0, 3.1,
          3.2, and 3.3, and the Discord link (8,400+ members)
          for the community.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Related articles
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the graph-based runtime that pairs
          naturally with DSPy compiled nodes.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on the retrieval, tool,
          and memory layers that DSPy modules coordinate.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- how MLflow traces and DSPy compile runs fit
          into the wider agent-eval story.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the cross-framework read on orchestration
          patterns for teams combining DSPy with CrewAI or
          LangGraph.
        </li>
        <li>
          <a
            href="/articles/google-adk-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Google Agent Development Kit in production 2026
          </a>
          {" "}- the ADK read for teams on Google Cloud who
          want the same production comparison, from a
          different angle.
        </li>
      </ul>
    </div>
  );
}
