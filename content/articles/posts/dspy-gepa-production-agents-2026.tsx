import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "dspy-gepa-production-agents-2026",
  title:
    "DSPy 3 and GEPA in production 2026: programming, not prompting, your LLM agents",
  excerpt:
    "How DSPy grew from a Stanford research project into the framework Shopify, Databricks, Dropbox, Nubank, and Microsoft AI use in production, and why GEPA (Genetic-Pareto) is the reflective prompt optimizer that quietly replaced hand-tuned prompts and even beat GRPO reinforcement learning with 35x fewer rollouts.",
  metaDescription:
    "A practical, technical guide to DSPy 3 and the GEPA optimizer in 2026. Covers the Signature, Module, Program, Optimizer, and Metric primitives, a working ReAct agent, GEPA reflective prompt evolution vs MIPROv2 and GRPO, production case studies at Shopify (550x cost reduction), Dropbox Dash, Nubank, JetBlue on Databricks, Microsoft MAI-Thinking-1, and Replit code repair, plus honest trade-offs against LangGraph, Pydantic AI, and CrewAI.",
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
    "Stanford",
    "Production",
    "Python",
    "LLM",
    "RAG",
  ],
  publishDate: "2026-08-26",
  readingTime: "17 min read",
};

export default function DspyGepaProductionAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2024 and 2025 the story about LLM
        applications was a story about prompt engineering.
        Someone rewrote a system prompt, a benchmark went
        up two points, a screenshot went viral. By the
        middle of 2026 the serious teams have stopped
        doing that. Shopify optimized its metadata
        extraction pipeline with DSPy and GEPA and cut its
        yearly cost roughly 550 times. Dropbox rebuilt the
        relevance judge behind Dash on the same stack.
        Microsoft AI curated the pretraining data for
        MAI-Thinking-1 by having DSPy compile the LLM
        judge that scored web-page quality. Nubank runs
        DSPy with GEPA to keep prompts semantically
        versioned across financial-service agents that
        talk to 131 million customers. The pattern is
        clear: hand-tuned prompts do not scale, and the
        framework that scales instead is DSPy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why programming beat prompting
      </h2>
      <p className="mb-6 leading-relaxed">
        A prompt is not a program. It is a paragraph of
        English glued to a template, tuned by whoever
        happened to run the last A/B test, and rewritten
        every time the underlying model changes. That
        works fine in a demo. It does not work when the
        pipeline has five LLM calls, a retriever, a tool
        loop, and a target metric that engineering has
        to defend to a business owner. Every model swap
        breaks the string. Every schema change breaks the
        parser. Every new team member has an opinion on
        the phrasing.
      </p>
      <p className="mb-6 leading-relaxed">
        DSPy, which stands for Declarative Self-improving
        Python, started at the Stanford NLP group in
        December 2022 and took the opposite bet. You
        write the pipeline as normal Python code, declare
        the input and output shape of each LLM call as a
        Signature, and let a compiler search for the
        prompt and few-shot examples that maximize your
        metric on your data. The result is that a swap
        from GPT-4o to Claude Sonnet 4.5 or from Sonnet
        4.5 to Gemini 2.5 Pro is a config change, not a
        rewrite. The pipeline definition stays the same;
        the compiler runs again against the new model and
        picks the prompt that scores best.
      </p>
      <p className="mb-6 leading-relaxed">
        The bet paid off. By 2026 the framework ships as
        MIT-licensed Python with 27,000 GitHub stars, 480
        plus contributors, and a production footprint
        that reads like a who is who of AI-heavy
        engineering teams. The 3.0 release landed at
        Databricks Data + AI Summit in June 2025, and by
        the 3.3 series the framework had shipped
        first-class MCP v2 compatibility, faster GEPA,
        and an improved Python interpreter tool.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What DSPy 3 actually is
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is a small framework. There are five
        primitives worth learning, and everything else in
        the docs is built on top of them.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Signature</strong>: a declarative
          input-output spec for one LLM call. Written as
          a string like &quot;question -&gt; answer&quot;
          or as a class with typed fields and field
          descriptions. This is the smallest unit of
          declarative work.
        </li>
        <li>
          <strong>Module</strong>: a strategy for turning
          a Signature into a call. dspy.Predict is a
          plain call. dspy.ChainOfThought adds a
          reasoning step. dspy.ReAct wraps the call in a
          tool loop. dspy.ProgramOfThought asks the model
          to write and execute Python code.
        </li>
        <li>
          <strong>Program</strong>: a composition of
          Modules with normal Python control flow. This
          is your pipeline: retrieve, then rerank, then
          answer, then critique. Everything is a subclass
          of dspy.Module so a Program is itself a Module
          you can nest.
        </li>
        <li>
          <strong>Metric</strong>: a Python function that
          scores a prediction against a labeled example.
          It can return a bool, a float, or in the GEPA
          case a Prediction with a score and natural
          language feedback for the optimizer to reflect
          on.
        </li>
        <li>
          <strong>Optimizer</strong>: the compiler. Takes
          a Program, a trainset, and a Metric, and
          returns a new Program with tuned prompts, tuned
          few-shot demos, or in some cases tuned weights.
          MIPROv2 uses Bayesian search. GEPA uses
          reflective evolution. BootstrapFewShot is the
          simple baseline.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The point of the split is that your pipeline code
        never has to know what the prompt looks like. You
        describe the shape of each call, you write the
        pipeline in plain Python, and you let the
        optimizer figure out the wording. When the model
        changes, the compiler runs again. When the data
        drifts, the compiler runs again. The pipeline
        source file does not change.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy 3 in thirty lines
      </h2>
      <p className="mb-6 leading-relaxed">
        The following is close to the smallest DSPy
        program you can run and still see the point. It
        defines a QA task, wraps it in a ChainOfThought
        module, and compiles it with MIPROv2 against a
        small labeled set. After compile, the prompt and
        the few-shot examples are baked into the saved
        JSON and can be loaded in production without any
        of the training data.
      </p>
      <CodeBlock
        language="python"
        filename="qa_program.py"
        code={`import dspy
from dspy.teleprompt import MIPROv2

# 1. Configure the LM. Any provider that LiteLLM supports works.
dspy.configure(lm=dspy.LM("openai/gpt-4o"))

# 2. Define a Signature. This is the shape of the LLM call.
class QASignature(dspy.Signature):
    """Answer the question using the given context."""
    context: str = dspy.InputField(desc="Relevant passages.")
    question: str = dspy.InputField()
    answer: str = dspy.OutputField(desc="Short factual answer.")

# 3. Wrap it in a Module.
class QAProgram(dspy.Module):
    def __init__(self):
        super().__init__()
        self.cot = dspy.ChainOfThought(QASignature)

    def forward(self, context: str, question: str):
        return self.cot(context=context, question=question)

# 4. Define a metric and a trainset.
def exact_match(example, pred, trace=None):
    return example.answer.strip().lower() == pred.answer.strip().lower()

trainset = [
    dspy.Example(context=c, question=q, answer=a).with_inputs("context", "question")
    for (c, q, a) in load_qa_pairs()
]

# 5. Compile with an Optimizer. The compiler searches for the best
#    prompt and few-shot demos against your metric.
optimizer = MIPROv2(metric=exact_match, auto="medium")
compiled = optimizer.compile(QAProgram(), trainset=trainset)

# 6. Save. Load in production with QAProgram().load(...).
compiled.save("./compiled_qa.json")`}
      />
      <p className="mb-6 leading-relaxed">
        The interesting file is the one you never write
        by hand: compiled_qa.json. It carries the
        instructions the optimizer chose, the demos it
        selected, and the field descriptions it evolved.
        You can inspect it, diff it against the previous
        compile, and version it with Git the same way you
        version any other build artifact.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The GEPA moment
      </h2>
      <p className="mb-6 leading-relaxed">
        For most of 2024 the DSPy optimizer story was
        BootstrapFewShot, then MIPROv2. MIPROv2 uses
        Bayesian optimization to jointly search
        instructions and demonstrations. It works well.
        It is also expensive: hundreds to thousands of
        rollouts against your metric to converge, which
        is fine on small tasks and painful on agentic
        pipelines where each rollout is a full
        tool-using conversation.
      </p>
      <p className="mb-6 leading-relaxed">
        In July 2025 Lakshya Agrawal and 16 co-authors
        from Berkeley, Stanford, Databricks, and MIT
        published GEPA: Reflective Prompt Evolution Can
        Outperform Reinforcement Learning (arXiv
        2507.19457). GEPA stands for Genetic-Pareto.
        Instead of Bayesian search over instruction
        candidates, GEPA runs the program, reads the
        full trajectory including reasoning and tool
        calls, and asks a reflection LLM to write natural
        language feedback on what went wrong. That
        feedback becomes the mutation signal for the next
        candidate prompt. A Pareto frontier over
        per-task scores keeps a diverse pool alive
        instead of collapsing to one winner too early.
      </p>
      <p className="mb-6 leading-relaxed">
        The headline result from the paper is that GEPA
        beats GRPO, the reinforcement learning method
        used to post-train reasoning models, by up to 20
        percent on the benchmark tasks while using up to
        35 times fewer rollouts. On DSPy pipelines it
        also beats MIPROv2 by around 10 percent on
        average. The catch is that the reflection LLM
        needs to be strong. Practitioners at Decagon
        report that Claude Sonnet or Opus as the
        reflection model gives 5 to 6 percent
        improvement, while weaker reflection models
        stall.
      </p>
      <CodeBlock
        language="python"
        filename="gepa_optimize.py"
        code={`import dspy
from dspy import GEPA

# The task model. Cheap and fast.
dspy.configure(lm=dspy.LM("openai/gpt-4o-mini"))

class MathSolver(dspy.Module):
    def __init__(self):
        super().__init__()
        self.solve = dspy.ChainOfThought("question: str -> answer: str")

    def forward(self, question: str):
        return self.solve(question=question)

# A GEPA metric returns a score AND natural language feedback.
# The feedback is what makes reflective evolution sample-efficient.
def math_metric(gold, pred, trace=None, pred_name=None, pred_trace=None):
    correct = gold.answer.strip() == pred.answer.strip()
    if correct:
        return dspy.Prediction(score=1.0, feedback="Correct.")
    return dspy.Prediction(
        score=0.0,
        feedback=(
            f"Expected '{gold.answer}' but got '{pred.answer}'. "
            f"Reasoning was: {getattr(pred, 'reasoning', 'N/A')}"
        ),
    )

optimizer = GEPA(
    metric=math_metric,
    auto="medium",                # "light", "medium", or "heavy"
    num_threads=16,
    reflection_lm=dspy.LM(
        model="openai/gpt-5",     # Strong reflection model matters.
        temperature=1.0,
        max_tokens=32000,
    ),
    candidate_selection_strategy="pareto",
    track_stats=True,
)

optimized = optimizer.compile(
    MathSolver(),
    trainset=train_examples,
    valset=val_examples,
)
optimized.save("math_solver_gepa.json")`}
      />
      <p className="mb-6 leading-relaxed">
        Three things about this snippet are worth
        highlighting for production teams. The reflection
        LM is separate from the task LM, so you pay top
        model prices only on the small number of
        reflection calls, and the task itself still runs
        on the cheap model. The metric returns a
        Prediction with feedback, not a bare float, so
        the optimizer has enough context to reason about
        the failure instead of just knowing it happened.
        And auto=&quot;medium&quot; is a rollout budget
        preset the framework maps to a concrete number of
        metric calls, which is how you keep compile time
        and cost bounded.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Architecture of a compiled DSPy pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        The mental model for deploying DSPy is that
        compile time and run time are separate phases.
        Compile takes a labeled trainset, a metric, and a
        rollout budget, and writes a JSON artifact. Run
        time loads that artifact into the same Python
        Program class and answers requests. The
        production service does not need the trainset,
        the metric, or the optimizer at all.
      </p>
      <CodeBlock
        language="bash"
        filename="DSPy compile-time vs run-time"
        code={`Compile time (offline, in CI or a notebook)
+---------------------------------------------------------+
|  trainset  ->  Optimizer (GEPA / MIPROv2)               |
|                    |                                    |
|                    |  many rollouts of Program(x)       |
|                    v                                    |
|                Metric(y_true, y_pred) -> score          |
|                    |                                    |
|                    v                                    |
|              Compiled artifact:                         |
|              - instructions per predictor               |
|              - few-shot demos per predictor             |
|              - field descriptions                       |
|              - saved to compiled.json                   |
+---------------------------------------------------------+
                     |
                     |  git commit + versioned deploy
                     v
Run time (in production, one request per user)
+---------------------------------------------------------+
|  Program().load("compiled.json")                        |
|      |                                                  |
|      |  forward(inputs)                                 |
|      v                                                  |
|  LiteLLM  ->  provider (OpenAI, Anthropic, Bedrock...)  |
|      |                                                  |
|      v                                                  |
|  Structured output (validated)                          |
|      |                                                  |
|      v                                                  |
|  MLflow / Langtrace / Logfire trace                     |
+---------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        This separation is what makes DSPy fit real CI
        pipelines. Compile runs on a schedule or on data
        drift. The output is a JSON file that lives in
        the repo the same way weights live in a model
        registry. The service loads the file at boot,
        answers requests, and emits traces to the
        observability backend of choice. When the metric
        drifts, you re-compile; when the model version
        changes, you re-compile; when neither has
        happened, the service does exactly what it did
        yesterday.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A ReAct agent with tools and MCP
      </h2>
      <p className="mb-6 leading-relaxed">
        Most production DSPy work is not a single
        Predict. It is an agent with tools, a retriever,
        and a structured output. The dspy.ReAct module
        wraps the tool loop, and any Python callable can
        be a tool: a database query, an HTTP call, a
        vector search, or an MCP server exposed with
        dspy.MCPTool.
      </p>
      <CodeBlock
        language="python"
        filename="support_agent.py"
        code={`import dspy
from typing import Literal

# Configure task and reflection models separately.
dspy.configure(lm=dspy.LM("anthropic/claude-sonnet-4.5"))

# Tools are just Python functions with type hints.
def search_orders(customer_id: str, limit: int = 5) -> list[dict]:
    """Return the most recent orders for a customer."""
    return db.query(
        "SELECT id, status, total FROM orders WHERE customer_id = %s "
        "ORDER BY created_at DESC LIMIT %s",
        (customer_id, limit),
    )

def open_refund_ticket(order_id: str, reason: str) -> str:
    """Create a refund ticket. Returns the ticket id."""
    return crm.create_ticket(type="refund", order_id=order_id, reason=reason)

class SupportSignature(dspy.Signature):
    """Answer the customer using the tools. Escalate when unsure."""
    customer_id: str = dspy.InputField()
    query: str = dspy.InputField()
    reply: str = dspy.OutputField(desc="The message we send to the customer.")
    action: Literal["resolved", "escalate", "refund"] = dspy.OutputField()

agent = dspy.ReAct(
    SupportSignature,
    tools=[search_orders, open_refund_ticket],
    max_iters=6,
)

# Use it.
result = agent(customer_id="c_123", query="Where is order 8891?")
print(result.reply, result.action)`}
      />
      <p className="mb-6 leading-relaxed">
        Two production details this snippet hides for
        clarity are worth pulling out. The tools carry
        docstrings and type hints, and DSPy uses those
        to generate the tool schema the model sees; the
        cleaner your docstrings, the fewer wrong tool
        calls the model makes. And max_iters is a hard
        stop on the ReAct loop, which is the difference
        between a bounded latency budget and a runaway
        agent that keeps calling tools until the context
        window fills up.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production case studies
      </h2>
      <p className="mb-6 leading-relaxed">
        DSPy is not a paper framework. The following
        cases are all documented publicly by the
        companies themselves.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Shopify</strong> scaled DSPy plus GEPA
          for structured metadata extraction across every
          Shopify shop and reported a roughly 550 times
          reduction in yearly cost against the baseline
          they replaced. The full talk is on YouTube
          from the Databricks Data + AI Summit.
        </li>
        <li>
          <strong>Dropbox</strong> rebuilt the relevance
          judge behind Dash on DSPy. The engineering
          blog on dropbox.tech walks through the DSPy
          program, the LLM-as-a-judge metric, the
          synthetic training data step, and the offline
          evaluation pipeline they use for continuous
          improvement.
        </li>
        <li>
          <strong>Microsoft AI</strong> used DSPy plus
          GEPA to curate the pretraining data for
          MAI-Thinking-1. GEPA optimized the LLM judge
          prompts that scored web-page quality from
          roughly 2,000 human labels, then those judges
          scored the raw corpus at scale. The details
          are in the MAI-Thinking-1 paper.
        </li>
        <li>
          <strong>JetBlue</strong> runs DSPy on
          Databricks for a payroll FAQ chatbot, a
          predictive maintenance chatbot, and customer
          feedback classification. Databricks reports the
          team hit 2x faster RAG deployment against
          their previous LangChain baseline and
          eliminated manual prompt tuning.
        </li>
        <li>
          <strong>Nubank</strong> runs DSPy with GEPA to
          optimize modular, semantically versioned
          prompts for production-grade financial-service
          agents. The engineering blog Building AI
          Agents for 131 Million Customers walks through
          how they treat every prompt as a build
          artifact, versioned and compiled the same way
          as any other software dependency.
        </li>
        <li>
          <strong>Replit</strong> uses a DSPy pipeline to
          synthesize code diffs with code LLMs for its
          Code Repair feature. The blog post at
          blog.replit.com/code-repair details the multi
          stage pipeline of retrieval, generation, and
          verification.
        </li>
        <li>
          <strong>AWS</strong> uses DSPy in the Amazon
          Nova migration workflow, moving prompts from
          larger to smaller Nova models while
          maintaining performance. The blog post is on
          aws.amazon.com/blogs/machine-learning under
          data-aware prompt optimization.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The common thread across these deployments is
        the same. Someone had a pipeline of LLM calls, a
        metric they cared about, and labeled data, even
        if the labels came from an LLM judge rather than
        humans. DSPy turned the metric plus data into a
        compiled prompt artifact, and the compile step
        replaced weeks of manual iteration.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation, MLflow, and deployment
      </h2>
      <p className="mb-6 leading-relaxed">
        The DSPy 3 story includes a full production
        surface, not only the compiler. Evaluation lives
        in dspy.Evaluate, which runs a Program against a
        devset and reports per-example scores. Tracing
        integrates with MLflow, Langtrace, and OpenLIT,
        so every predict call, tool call, and rollout
        shows up as a span in the observability backend
        the team already runs.
      </p>
      <p className="mb-6 leading-relaxed">
        The Databricks MLflow integration goes further
        and lets you log a compiled DSPy program the
        same way you log a scikit-learn model: an
        experiment run, artifacts including the compiled
        JSON, metrics against the devset, and a served
        endpoint. That means the whole audit trail from
        the trainset used, through the optimizer
        settings, through the compile output, to the
        serving endpoint is one MLflow experiment id.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        DSPy vs LangGraph vs Pydantic AI vs CrewAI
      </h2>
      <p className="mb-6 leading-relaxed">
        These frameworks solve overlapping but distinct
        problems, and the right pick depends on which
        problem is hurting most on the current project.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>LangGraph</strong> is a state-machine
          runtime for agent graphs. It shines when the
          problem is orchestration: branches, retries,
          human in the loop, durable resume. It does not
          try to optimize your prompts.
        </li>
        <li>
          <strong>Pydantic AI</strong> is a typed
          Python agent framework. It shines when the
          problem is type safety, tool schemas, and
          structured output validation. It does not
          compile prompts either.
        </li>
        <li>
          <strong>CrewAI</strong> is a role-based
          multi-agent framework. It shines when the
          problem is coordination between multiple
          specialized agents on a plan and delegate task.
        </li>
        <li>
          <strong>DSPy</strong> is a compiler. It shines
          when the problem is metric-driven quality:
          you have a target score, you have labeled
          data, and you want the framework to search
          for the prompt and demos that maximize the
          metric. It composes with the others: a
          DSPy-compiled program can be a node in a
          LangGraph state machine, a tool in a Pydantic
          AI agent, or a worker in a CrewAI crew.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        In practice teams often ship a stack. LangGraph
        or Pydantic AI runs the orchestration, DSPy
        compiles the individual LLM calls inside each
        node, GEPA re-compiles on data drift, and MLflow
        or Logfire holds the trace.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Model-portable pipelines.</strong> The
          same DSPy Program compiles for GPT-5, Claude
          Sonnet 4.5, Gemini 2.5 Pro, and open weights
          on Ollama. The pipeline code does not change.
        </li>
        <li>
          <strong>Metric-driven improvement.</strong> The
          optimizer treats prompt engineering as a
          search problem with a scalar objective. Wins
          are measurable and reproducible instead of
          anecdotal.
        </li>
        <li>
          <strong>Rollout efficiency with GEPA.</strong>{" "}
          Up to 35x fewer rollouts than GRPO for
          comparable or better quality, which matters
          when each rollout is a full agent trajectory
          costing dollars.
        </li>
        <li>
          <strong>Real observability.</strong> MLflow,
          Langtrace, OpenLIT, and Databricks Managed
          MLflow are all first-party integrations.
          Traces carry the compiled prompt, so audit
          answers are precise.
        </li>
        <li>
          <strong>Compile-time and run-time
          split.</strong> Production loads a JSON
          artifact. No training data on the serving
          host. No optimizer in the request path.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Limitations and trade-offs
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>You need a metric and data.</strong>{" "}
          DSPy is a compiler. If you cannot write a
          metric that scores a prediction, you cannot
          compile. LLM judges plus a few hundred labeled
          examples usually work, but the labeling is
          real up-front work.
        </li>
        <li>
          <strong>Compile is not free.</strong> A GEPA
          medium run on an agentic pipeline can cost
          tens to a few hundred dollars in reflection LM
          calls. Budget it, and run compile on a
          schedule, not on every commit.
        </li>
        <li>
          <strong>Reflection LM quality
          matters.</strong> Weak reflection models
          plateau. Practitioners report that Claude
          Sonnet 4.5 or GPT-5 as the reflection LM
          gives the reported gains; a small local model
          does not.
        </li>
        <li>
          <strong>Debugging can feel indirect.</strong>{" "}
          The prompt the model sees is what the
          compiler chose, not what you wrote. That is a
          feature, but it takes some getting used to.
          dspy.inspect_history() is the answer, and MLflow
          traces make it manageable.
        </li>
        <li>
          <strong>Not a runtime orchestrator.</strong>{" "}
          DSPy will not handle a stateful multi day
          workflow with human approval. Pair it with
          LangGraph, Temporal, or Prefect for that.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends heading into late 2026
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Reflective evolution goes beyond
          prompts.</strong> The GEPA authors have already
          shown the algorithm optimizing code strings
          and agent configurations, not only prompts.
          The stand-alone gepa-ai/gepa package
          generalizes the loop to any text parameter.
        </li>
        <li>
          <strong>Cheaper reflection.</strong> As frontier
          models drop in price and small reasoning
          models like GPT-5-mini and Sonnet 4.5 Haiku
          get better at critique, the reflection budget
          for a compile is trending down. Compile that
          cost $150 in July 2025 costs closer to $30 by
          mid-2026 on the same task.
        </li>
        <li>
          <strong>Compiled prompts as first-class
          artifacts.</strong> Nubank versions prompts
          semantically. Shopify treats a compile as a
          release. MLflow logs a DSPy program as a
          registered model. The pattern is prompt as
          artifact, not prompt as commit message.
        </li>
        <li>
          <strong>MCP inside the compile loop.</strong>{" "}
          DSPy 3.3 shipped MCP v2 compatibility. Tool
          servers show up in the compile loop the same
          way as native Python functions, which means
          the compiler tunes for the tool schema the
          server actually exposes, not for the schema a
          human transcribed into the code.
        </li>
        <li>
          <strong>Reinforcement fine-tuning on top of
          compiled prompts.</strong> The teams that need
          the last few points chain GEPA and GRPO:
          compile with GEPA to get a strong prompt
          baseline, then fine-tune weights with GRPO
          using the compiled prompt as the starting
          policy. Cheaper than pure RL, stronger than
          pure prompt optimization.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to reach for DSPy and when not to
      </h2>
      <p className="mb-6 leading-relaxed">
        Reach for DSPy when the project has a clear
        metric, at least a few hundred examples the
        metric can score, and a pipeline of two or more
        LLM calls. Classification, extraction, RAG,
        LLM-as-a-judge, and tool-using agents with a
        target success rate are all on the sweet spot.
        Reach for DSPy when you plan to swap models more
        than once, because the compile-once-per-model
        story is where the framework pays back the
        learning curve fastest.
      </p>
      <p className="mb-6 leading-relaxed">
        Skip DSPy when the task is a single, one-shot
        prompt to a frontier model with no measurable
        target. A support chat where quality is
        vibes-based will not benefit; the optimizer
        needs a metric to optimize. Skip it when the
        team cannot spare the up-front week to build a
        devset and a metric; without those, DSPy is just
        a more complicated way to call an LLM.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        The prompt engineering era is ending in the
        places that ship LLM applications at scale.
        Shopify, Dropbox, Microsoft AI, Nubank, JetBlue,
        Replit, and AWS are not tuning strings by hand;
        they are running compilers. DSPy 3 plus GEPA is
        the compiler that has won that space in 2026.
        The framework is small, the primitives are five,
        and the payoff is that prompts become build
        artifacts you can measure, version, and
        re-compile when the world changes underneath
        you.
      </p>
      <p className="mb-6 leading-relaxed">
        On our own client engagements we treat DSPy as
        the default choice for any pipeline with a
        metric and labeled data, and we pair it with
        LangGraph or Pydantic AI when the surrounding
        workflow needs orchestration or type safety.
        The lesson from every case study is the same:
        write the pipeline once, describe the shape of
        each call, hand the compiler a metric, and let
        the compiler do the work no engineer wants to
        do by hand a second time.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          DSPy documentation and use cases:{" "}
          <a
            href="https://dspy.ai/"
            className="text-blue-400 hover:underline"
          >
            dspy.ai
          </a>{" "}
          and{" "}
          <a
            href="https://dspy.ai/community/use-cases/"
            className="text-blue-400 hover:underline"
          >
            dspy.ai/community/use-cases
          </a>
          .
        </li>
        <li>
          GEPA paper: Agrawal et al. 2025, GEPA:
          Reflective Prompt Evolution Can Outperform
          Reinforcement Learning,{" "}
          <a
            href="https://arxiv.org/abs/2507.19457"
            className="text-blue-400 hover:underline"
          >
            arXiv:2507.19457
          </a>
          .
        </li>
        <li>
          Databricks engineering: Optimizing Databricks
          LLM Pipelines with DSPy at{" "}
          <a
            href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy"
            className="text-blue-400 hover:underline"
          >
            databricks.com/blog/optimizing-databricks-llm-pipelines-dspy
          </a>
          .
        </li>
        <li>
          Dropbox engineering: Optimizing Dropbox Dash
          Relevance Judge with DSPy at{" "}
          <a
            href="https://dropbox.tech/machine-learning/optimizing-dropbox-dash-relevance-judge-with-dspy"
            className="text-blue-400 hover:underline"
          >
            dropbox.tech
          </a>
          .
        </li>
        <li>
          Nubank engineering: Building AI Agents for 131
          Million Customers at{" "}
          <a
            href="https://building.nubank.com/building-ai-agents-for-131-million-customers/"
            className="text-blue-400 hover:underline"
          >
            building.nubank.com
          </a>
          .
        </li>
        <li>
          Decagon engineering: Optimizing GEPA for
          production at{" "}
          <a
            href="https://decagon.ai/blog/optimizing-gepa-for-production"
            className="text-blue-400 hover:underline"
          >
            decagon.ai/blog/optimizing-gepa-for-production
          </a>
          .
        </li>
        <li>
          GEPA package and reference implementation:{" "}
          <a
            href="https://github.com/gepa-ai/gepa"
            className="text-blue-400 hover:underline"
          >
            github.com/gepa-ai/gepa
          </a>
          .
        </li>
      </ul>
    </div>
  );
}
