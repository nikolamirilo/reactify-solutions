import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 17,
  slug: "agent-evaluation-observability-2026",
  title:
    "AI agent evaluation and observability in 2026: LangSmith, Langfuse, Arize Phoenix, Braintrust, and the OpenTelemetry GenAI conventions",
  excerpt:
    "Why evaluation and observability stopped being optional in 2026, how the OpenTelemetry GenAI conventions reshaped the tracing layer, and the architectural calls - trajectory vs outcome, LLM-as-judge vs deterministic, online vs offline - that decide whether an agent survives the first Monday in production.",
  metaDescription:
    "A practical, technical guide to AI agent evaluation and observability in 2026. Covers the OpenTelemetry GenAI semantic conventions for agent and tool spans, OpenInference, LangSmith, Langfuse v3, Arize Phoenix, Braintrust, Helicone, trajectory and LLM-as-judge evaluation, online and offline evals, CI gates, audio replay, regression suites, and working Python and TypeScript instrumentation examples.",
  image: "/images/articles/article-03.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Observability",
    "Evaluation",
    "LangSmith",
    "Langfuse",
    "Arize Phoenix",
    "OpenTelemetry",
    "Production",
  ],
  publishDate: "2026-06-08",
  readingTime: "16 min read",
};

export default function AgentEvaluationObservability2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Agent observability is the production-deployment necessity most
        teams underestimated. In 2024 it was a logging line and a hope. In
        2026 it is the rate-limiting step on every serious agent rollout
        we see. LangChain&rsquo;s 2026 State of AI Agents report has 57%
        of organisations running agents in production and pegs{" "}
        <em>quality</em> as the single biggest barrier to deployment at
        32% - almost double the next contender. 89% of those teams have
        already wired observability; only 52% have wired evals. The gap is
        the bug. An agent that hallucinates a tool call, retries a paid
        side effect, or quietly degrades after a model swap does not show
        up in your APM dashboard until the refund queue does. The
        platforms grew up to fix this in 2025 - LangSmith on the
        LangChain stack, Langfuse v3 rebuilt around OpenTelemetry, Arize
        Phoenix and OpenInference on the rigour end, Braintrust on the
        trace-to-eval loop, Helicone on drop-in simplicity - and the
        OpenTelemetry GenAI semantic conventions standardised the trace
        shape that ties them together. The category is no longer a
        differentiator; not having one is.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this category changed shape in 2025
      </h2>
      <p className="mb-6 leading-relaxed">
        Three forces collapsed the observability stack into a category. First,
        agents got non-deterministic in ways APM tools could not see. A
        single user turn became fifteen LLM calls, eight tool invocations,
        a memory write, and a retry loop, and every span had a probability
        distribution attached to it. Datadog and Honeycomb still tell you
        the request was 4.2 seconds; they cannot tell you that the model
        picked the wrong tool on the second hop. Second, the
        OpenTelemetry GenAI working group standardised the trace shape.
        The <code>gen_ai.*</code> semantic conventions exited experimental
        for client spans in early 2026; agent and framework spans
        (<code>invoke_agent</code>, <code>execute_tool</code>,{" "}
        <code>create_agent</code>) remain in development but have been
        stable in practice through Q1. Arize&rsquo;s OpenInference, an
        OTel-aligned semantic convention, aligned its span-kind taxonomy
        with the spec. The dialect war ended; the wire format is shared.
        Third, evaluation moved from a research artefact to a CI gate.
        LangChain, Braintrust, Confident AI, and Future AGI all ship
        evaluation suites as a GitHub Action; LLM-as-judge agreement with
        human reviewers landed around 85% on most tasks - higher than two
        humans on the same rubric - and the procurement objection
        collapsed.
      </p>
      <p className="mb-6 leading-relaxed">
        The result is the cleanest tooling category in the AI stack right
        now. Six platforms anchor the field, the OpenTelemetry spec
        anchors the wire, and the architectural decisions a team gets to
        make have narrowed to four: trajectory or outcome evaluation,
        LLM-as-judge or deterministic checks, online or offline evals,
        and how much of the agent payload you record in the first place.
        Everything else is a configuration knob.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The OpenTelemetry GenAI conventions: the wire format won
      </h2>
      <p className="mb-6 leading-relaxed">
        The single biggest thing that happened to agent observability in
        2025–2026 was the OpenTelemetry GenAI semantic conventions getting
        boring. Boring is the point - every platform, every framework,
        every LLM provider now emits the same span shape, with the same
        attribute names, with the same metric units, and a trace exported
        from a LangGraph agent on Tuesday can be queried from Phoenix on
        Wednesday and Langfuse on Thursday without translation. The two
        primitives that matter for agents are{" "}
        <code>invoke_agent</code> (the top-level span representing an
        agent execution, with child <code>chat</code> spans for each LLM
        call and <code>execute_tool</code> spans for each tool
        invocation) and the required{" "}
        <code>gen_ai.client.operation.duration</code> metric. Token usage,
        finish reasons, model name, and tool-call IDs are first-class
        attributes; full prompts and completions are{" "}
        <em>opt-in</em>, captured as structured span events under{" "}
        <code>gen_ai.input.messages</code> and{" "}
        <code>gen_ai.output.messages</code> only when the application is
        explicitly configured to do so. The spec calls this out: do not
        record sensitive payloads by default.
      </p>
      <p className="mb-6 leading-relaxed">
        OpenInference is the Arize-maintained convention that predates the
        OTel work and converged on it. Phoenix is built on OTel; every
        OpenInference trace is a valid OTLP trace; the conventions extend
        the spec for higher-cardinality LLM payloads. The practical
        consequence is that an agent instrumented once - typically with
        an SDK like <code>openinference-instrumentation-openai</code>,{" "}
        <code>traceloop-sdk</code>, or the native instrumentation that
        ships with the OpenAI Agents SDK, LangGraph, Mastra, CrewAI,
        Vercel AI SDK, or Pydantic AI - exports usable spans to any OTLP
        collector. Langfuse v3 rebuilt its ingestion endpoint around
        OTLP; Langfuse Cloud and Datadog LLM Observability accept the
        same payload. The lock-in is gone. Switching vendors is now a
        configuration line.
      </p>
      <CodeBlock
        language="bash"
        filename="instrument.py"
        code={`# pip install openinference-instrumentation-openai-agents \\
#             opentelemetry-sdk opentelemetry-exporter-otlp

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import (
    OTLPSpanExporter,
)
from openinference.instrumentation.openai_agents import (
    OpenAIAgentsInstrumentor,
)

# 1. Wire OTLP - same endpoint shape for Phoenix, Langfuse, Datadog,
#    Honeycomb, Jaeger, or any OTel collector.
provider = TracerProvider()
provider.add_span_processor(
    BatchSpanProcessor(
        OTLPSpanExporter(
            endpoint="https://cloud.langfuse.com/api/public/otel/v1/traces",
            headers={"Authorization": f"Basic {LANGFUSE_AUTH}"},
        ),
    ),
)
trace.set_tracer_provider(provider)

# 2. One line of instrumentation; every Agents SDK call now emits
#    invoke_agent + execute_tool + chat spans with gen_ai.* attributes.
OpenAIAgentsInstrumentor().instrument()

# 3. Your agent code does not change.
from agents import Agent, Runner
agent = Agent(name="Support", instructions="Be brief.", tools=[...])
result = await Runner.run(agent, input="What is my order status?")`}
      />
      <p className="mb-6 leading-relaxed">
        Three things to notice. The exporter URL is the only line that
        differs between Phoenix, Langfuse, Datadog, and a local Jaeger;
        the agent code is untouched. The instrumentation is one line -
        and there is an equivalent one-liner for LangGraph, CrewAI,
        Mastra, the Vercel AI SDK, Pydantic AI, Claude Agent SDK, and
        LlamaIndex. And the spans are <em>structured</em>: when you open
        a trace, the agent loop renders as a tree of named operations
        with model, tool, and token attributes - not a wall of stringified
        JSON. That is the entire reason this category became usable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The components an agent observability stack actually has
      </h2>
      <p className="mb-4 leading-relaxed">
        Strip away the dashboards and a production observability stack is
        the same six-component shape across every platform.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Instrumentation.</strong> The SDK or auto-instrumentation
          that emits spans. Native framework hooks (LangSmith for
          LangChain, Phoenix for OpenAI Agents SDK) are the lowest-friction
          path; OTel instrumentation libraries cover the long tail. Plan
          for both - your agent will not stay on one framework.
        </li>
        <li>
          <strong>Tracing backend.</strong> The store that holds traces,
          spans, attributes, and events. ClickHouse has won the analytic
          store war for this category - Langfuse, Logfire, and most
          self-hosted stacks are on it; LangSmith runs its own
          purpose-built store; Phoenix runs on Postgres for OSS and
          ClickHouse-backed managed Arize for scale. Query latency on
          millions of traces is the metric to benchmark.
        </li>
        <li>
          <strong>Datasets and golden traces.</strong> Curated sets of
          inputs (and optional expected outputs) that the evaluation
          layer runs against. The 2026 pattern is auto-curation: pull
          interesting production traces, label them, freeze them into a
          dataset. Braintrust, Langfuse, LangSmith, and Confident AI all
          ship this loop natively.
        </li>
        <li>
          <strong>Evaluators.</strong> The scoring functions. Three
          flavours coexist: deterministic checks (regex, schema, exact
          match), statistical / heuristic (BLEU, ROUGE, embedding
          similarity), and LLM-as-judge (a stronger model scoring a
          rubric). DeepEval and RAGAS are the open libraries; Phoenix
          and Braintrust ship batteries-included evaluator catalogues.
        </li>
        <li>
          <strong>CI gate.</strong> The hook that runs the evaluator
          against the dataset on every PR and blocks the merge if scores
          regress. Braintrust&rsquo;s native GitHub Action, LangSmith&rsquo;s{" "}
          <code>evaluate()</code> in CI, Langfuse&rsquo;s programmatic
          dataset runs, and Confident AI&rsquo;s <code>deepeval test</code>{" "}
          are the four shapes you will see.
        </li>
        <li>
          <strong>Online monitoring and replay.</strong> The layer that
          watches production traces, computes online evaluator scores,
          alerts on regression, and lets you replay a failed trace against
          a new prompt or model. This is where the platform earns or
          loses its seat - the offline eval suite tells you the model
          got worse; the online layer tells you <em>which user</em> and{" "}
          <em>which span</em>.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The six frontier platforms
      </h2>
      <p className="mb-6 leading-relaxed">
        Six platforms cover most of the production agent deployments we
        see on engagements. Each has a clear shape.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>LangSmith.</strong> The LangChain-native default.
          Deepest framework integration in the category - node-by-node
          LangGraph state diffs, model + tool call breakdowns, replay
          against new model versions in one click, and the eval suite
          that ships with the LangChain SDK. Pricing is seat-based ($39
          per seat per month) plus per-trace; the bill grows with scale,
          but on a LangGraph stack the integration depth is hard to
          match. The default answer when LangChain or LangGraph runs the
          agent.
        </li>
        <li>
          <strong>Langfuse.</strong> The open-source leader. MIT-licensed,
          self-hostable, v3 rebuilt the SDK and ingestion endpoint around
          OpenTelemetry, processes billions of events per month on
          ClickHouse, and runs the same codebase on Cloud and on-prem.
          March 2026 brought a wide immutable events table that delivered
          ~3x less memory and up to 20x faster queries. Best for
          prompt-centric workflows, eval suites, dataset management, and
          teams that need self-host as a hard requirement (regulated
          industries, EU data residency, on-prem). Free tier is generous;
          paid tiers scale with traces and seats.
        </li>
        <li>
          <strong>Arize Phoenix.</strong> The ML-grade rigour pick.
          Open-source local UI (Postgres-backed), Arize AX as the managed
          enterprise tier, and OpenInference as the wire convention.
          Phoenix wins on eval rigour - drift detection, embeddings
          analysis, deterministic evaluators, and the cleanest LLM-as-
          judge primitives in the category. Out-of-the-box support for
          OpenAI Agents SDK, Claude Agent SDK, LangGraph, Vercel AI SDK,
          Mastra, CrewAI, LlamaIndex, and DSPy. The right pick when eval
          rigour matters more than framework lock-in.
        </li>
        <li>
          <strong>Braintrust.</strong> The trace-to-eval loop specialist.
          Playground tests cheaper prompts and smaller models against
          real production traces with scored output side-by-side. SDK
          wrappers for the OpenAI Agents SDK, LangGraph, Mastra, Pydantic
          AI, LangChain, CrewAI, and Vercel AI SDK. The native GitHub
          Action runs evaluation suites and blocks merges when quality
          scores drop below defined thresholds. Best when CI gates are
          the primary use case and the team wants to iterate prompts and
          models against real traces.
        </li>
        <li>
          <strong>Helicone.</strong> The drop-in proxy. Swap{" "}
          <code>api.openai.com</code> for{" "}
          <code>oai.helicone.ai</code> and every call is logged, costed,
          cached, and rate-limited. No SDK install. Best when the
          observability budget is &ldquo;today, before lunch&rdquo; and
          the agent is OpenAI-first. Lighter on eval and trajectory
          rendering than the agent-native platforms; the trade-off is
          that the integration cost is zero.
        </li>
        <li>
          <strong>Datadog LLM Observability.</strong> The enterprise
          default for shops already on Datadog. Natively supports the
          OpenTelemetry GenAI conventions, so the same traces feed APM,
          logs, and the LLM-observability product. The right answer when
          the whole-stack story matters and the team already pays the
          Datadog bill.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Three adjacent stacks are worth flagging. <strong>Honeycomb LLM
        Observability</strong> brings event-based deep tracing and is the
        right pick when you already think in terms of high-cardinality
        events. <strong>Logfire</strong> (Pydantic) is OTel-native, ~27x
        cheaper than Langfuse at moderate scale on the published
        benchmarks, and the natural fit for Pydantic AI agents.{" "}
        <strong>Confident AI / DeepEval</strong> is the eval-first stack -
        50+ research-backed metrics, CI/CD regression testing, and a
        production-to-eval pipeline; if your bottleneck is the offline
        suite rather than the trace store, this is the cleanest answer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trajectory or outcome? The biggest design call you make
      </h2>
      <p className="mb-6 leading-relaxed">
        The single biggest decision an agent eval team makes in 2026 is
        whether to score the <em>outcome</em> (did the agent produce the
        right final answer?) or the <em>trajectory</em> (did the agent
        take a reasonable path to that answer?). Both are necessary.
        Neither alone is sufficient.
      </p>
      <p className="mb-6 leading-relaxed">
        Outcome evaluation is the cheap baseline. Run the agent on a
        labelled input, compare the final response to the ground truth,
        score it. Works well for narrow tasks with a single right answer
        - order lookups, scheduling, retrieval - and falls apart for
        anything open-ended. The fatal failure mode is the agent that
        produces the right answer by the wrong reasoning: a customer
        balance reported correctly because the agent guessed it, not
        because it called the balance tool. The outcome eval passes; the
        next prompt iteration silently breaks because the model can no
        longer guess. Outcome metrics are necessary; they are never the
        whole story.
      </p>
      <p className="mb-6 leading-relaxed">
        Trajectory evaluation scores the whole path - which tools the
        agent picked, which arguments it passed, how many turns it took,
        whether it looped, whether the intermediate reasoning was
        grounded. Three classes of metrics have emerged in 2026:{" "}
        <code>TrajectoryAccuracy</code> (how closely the agent&rsquo;s
        step sequence matches a golden path),{" "}
        <code>ToolCallAccuracy</code> (was the right tool called with the
        right arguments?), and <code>TrajectoryEfficiency</code> (was the
        path the shortest one that worked?). LangChain, DeepEval, Phoenix,
        and Braintrust all ship a trajectory evaluator now. The framework
        we apply on every engagement is: outcome eval as the gate
        (must-pass), trajectory eval as the signal (must-not-regress),
        and one LLM-as-judge call that rolls both into a single
        end-to-end rubric for dashboard purposes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        LLM-as-judge or deterministic checks?
      </h2>
      <p className="mb-6 leading-relaxed">
        Deterministic checks are first. Schema validation, regex match,
        tool-call signature equality, latency thresholds, token-budget
        ceilings, refusal-allowlist tripwires, hallucination canaries
        (was the order ID echoed back actually present in the tool
        response?). These are fast, free, repeatable, and the same trace
        produces the same score forever. Run them on every span. Block
        the merge on every failure.
      </p>
      <p className="mb-6 leading-relaxed">
        LLM-as-judge fills the gap deterministic checks cannot -
        open-ended quality, tone, faithfulness, helpfulness, the
        subjective rubric a human would use. The 2026 pattern is GPT-5
        or Claude Opus 4.5 as the judge, a tight rubric in the prompt
        (3-5 dimensions, each scored 1-5 with explicit criteria), and a
        confidence-weighted aggregate. Agreement with human reviewers
        runs ~85% on most tasks, and the disagreement is mostly on
        rubric edges where humans also disagree. Two operational
        cautions: rate-limit your judge (every eval run costs real
        dollars), and pin its model version (a silent provider-side model
        rev changes your scores). The trick we use on long-running suites
        is to cache judge scores against a hash of the (trace, rubric,
        judge_model) tuple - replays are free, real evaluations cost
        once.
      </p>
      <CodeBlock
        language="bash"
        filename="evals/trajectory_judge.py"
        code={`# pip install deepeval openai-agents
from deepeval import evaluate
from deepeval.metrics import TaskCompletionMetric, ToolCorrectnessMetric
from deepeval.test_case import LLMTestCase, ToolCall

# 1. Deterministic: was the right tool called?
tool_correctness = ToolCorrectnessMetric(
    expected_tools=[
        ToolCall(name="lookup_order", arguments={"order_id": "84291"}),
    ],
)

# 2. LLM-as-judge: did the agent complete the task as a human would?
task_completion = TaskCompletionMetric(
    threshold=0.7,
    model="gpt-5",            # pin the version
    include_reason=True,       # rubric explanation in the trace
)

# 3. Build the test case from a real production trace.
test_case = LLMTestCase(
    input="Where is order 84291?",
    actual_output=trace.final_response,
    tools_called=trace.tool_calls,
    # Conversation history feeds the judge rubric.
    additional_metadata={"trajectory": trace.steps},
)

# 4. Run as a CI gate; non-zero exit on failure blocks the merge.
evaluate(
    test_cases=[test_case],
    metrics=[tool_correctness, task_completion],
    print_results=True,
)`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern that earns its keep is layered scoring - the
        deterministic check fails fast on the cheap cases (wrong tool,
        bad schema, missing argument), the judge runs only on what
        survives, and the dashboard rolls both into a per-PR delta. The
        teams we see win this layer are not running the most metrics;
        they are running the smallest set of metrics that catch the
        actual failure modes from last quarter&rsquo;s production
        incidents.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Online vs offline evaluation: both, always
      </h2>
      <p className="mb-6 leading-relaxed">
        Offline evals run on frozen datasets in CI. Same input, same
        agent, same scores, reproducible across releases. This is where
        you catch regressions before they ship. Online evals run on live
        production traces, asynchronously, sampling at whatever rate the
        judge budget allows (1–10% is typical for paid judges, 100% for
        deterministic checks). This is where you catch the drift that
        the offline suite cannot anticipate - the user phrasing your
        dataset never sampled, the tool behaviour that changed
        upstream, the model provider&rsquo;s silent rev.
      </p>
      <p className="mb-6 leading-relaxed">
        The flywheel that ties them together is the 2026 pattern we wire
        on every engagement. Production traces with low online scores get
        flagged, reviewed, annotated, and frozen into the offline
        dataset. The offline dataset grows from real production failures,
        not from prompts the engineer dreamed up at 10pm. Braintrust calls
        this trace-to-eval; Confident AI calls it production-to-eval;
        LangSmith calls it dataset curation; the shape is identical. The
        delta between &ldquo;we have evals&rdquo; and &ldquo;evals catch
        the things that actually break&rdquo; is whether this loop is
        wired.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Instrumenting a LangGraph agent for Phoenix
      </h2>
      <p className="mb-6 leading-relaxed">
        The pitch for Phoenix is &ldquo;eval rigour, runtime-agnostic.&rdquo;
        The OpenInference instrumentation hooks into LangGraph at the node
        level: every node execution becomes a span, every LLM call becomes
        a child span with <code>gen_ai.*</code> attributes, every tool
        call becomes an <code>execute_tool</code> span. The traces render
        as the LangGraph state graph; the eval suite runs against the
        same traces.
      </p>
      <CodeBlock
        language="bash"
        filename="phoenix_eval.py"
        code={`# pip install arize-phoenix arize-phoenix-otel \\
#             openinference-instrumentation-langchain \\
#             openinference-instrumentation-openai
import os, phoenix as px
from phoenix.otel import register
from openinference.instrumentation.langchain import LangChainInstrumentor
from openinference.instrumentation.openai import OpenAIInstrumentor

# 1. Phoenix as the OTel collector. Local or hosted; same SDK.
tracer_provider = register(
    project_name="support-agent",
    endpoint="https://app.phoenix.arize.com/v1/traces",
    headers={"api_key": os.environ["PHOENIX_API_KEY"]},
)
LangChainInstrumentor().instrument(tracer_provider=tracer_provider)
OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)

# 2. Agent code is unchanged. Spans flow with gen_ai.* attributes.
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
agent = create_react_agent(
    model=ChatOpenAI(model="gpt-5-mini"),
    tools=[lookup_order, refund_order],
)
result = agent.invoke({"messages": [("user", "Where is order 84291?")]})

# 3. Evaluators run against the same traces - no separate instrumentation.
from phoenix.evals import (
    HallucinationEvaluator, ToxicityEvaluator, llm_classify, OpenAIModel,
)
hallucination = HallucinationEvaluator(OpenAIModel(model="gpt-5"))
results = llm_classify(
    data=px.Client().get_spans_dataframe(project_name="support-agent"),
    evaluators=[hallucination],
    provide_explanation=True,
    concurrency=10,
)`}
      />
      <p className="mb-6 leading-relaxed">
        The patterns that pay off are the OpenInference instrumentors -
        you call one per framework and per LLM SDK; Phoenix handles the
        rest - and running evaluators directly against the span dataframe
        the platform already holds. There is no separate
        &ldquo;evaluation dataset&rdquo; to keep in sync with production;
        the spans <em>are</em> the dataset, and the evaluators score
        them in-place. The same trace pipeline that drives the live
        dashboard backs the offline regression suite, the LLM-as-judge
        scoring, and the prompt experimentation surface. One ingestion
        path, four products.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Instrumenting an OpenAI Agents SDK app for Langfuse
      </h2>
      <p className="mb-6 leading-relaxed">
        Langfuse v3 took the opposite stance to platform-native SDKs and
        bet on OpenTelemetry as the front door. The ingestion endpoint
        accepts OTLP HTTP, ClickHouse stores the traces, and the same
        codebase runs on Langfuse Cloud and on a self-hosted Helm chart.
        Instrumentation is one line per framework; the agent code is
        unchanged.
      </p>
      <CodeBlock
        language="typescript"
        filename="agent.ts"
        code={`// npm i @openai/agents @langfuse/otel \\
//        @opentelemetry/sdk-node \\
//        @opentelemetry/exporter-trace-otlp-http
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { LangfuseExporter } from "@langfuse/otel";
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

// 1. OTLP exporter; Langfuse Cloud is the endpoint. Self-host is identical
//    - just swap the URL for your Langfuse instance.
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "https://cloud.langfuse.com/api/public/otel/v1/traces",
    headers: { Authorization: \`Basic \${process.env.LANGFUSE_AUTH}\` },
  }),
});
sdk.start();

// 2. Tool with strict args; signature deltas show up as eval failures
//    later if a prompt drifts away from the expected shape.
const lookupOrder = tool({
  name: "lookup_order",
  description: "Fetch an order by ID from the internal orders service.",
  parameters: z.object({ order_id: z.string().min(6).max(12) }),
  execute: async ({ order_id }) => ordersClient.fetch(order_id),
});

const agent = new Agent({
  name: "Aria",
  instructions: "Be brief. Use lookup_order for any order status question.",
  tools: [lookupOrder],
});

// 3. Every invoke_agent + execute_tool + chat span lands in Langfuse,
//    grouped by trace, with full gen_ai.* attributes.
const result = await run(agent, "Where is order 84291?");`}
      />
      <p className="mb-6 leading-relaxed">
        Three operational notes. The exporter URL is the only thing that
        changes between Cloud and self-host; the same span flow works on
        both. ClickHouse query performance scales with cardinality, not
        raw volume - index your high-selectivity attributes (user ID,
        session ID, agent name) and the trace dashboard stays sub-second
        on tens of millions of spans. And the OpenTelemetry context
        propagates across processes, so an HTTP call from the agent
        backend to a downstream microservice carries the trace ID; the
        full request graph shows up in one waterfall, regardless of how
        many services touched it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production patterns that survive the first incident
      </h2>
      <p className="mb-4 leading-relaxed">
        Seven patterns we apply on every engagement that ships an agent
        to production.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Instrument before the first user.</strong> Wire the
          tracing SDK on day one - well before evals, well before the
          dashboard is pretty. The single biggest source of post-incident
          frustration is &ldquo;we cannot reproduce the trace because it
          was not captured.&rdquo; OpenTelemetry GenAI is one line. Run
          it.
        </li>
        <li>
          <strong>Record content opt-in, not by default.</strong> The OTel
          spec recommends it; treat it as a hard rule. Default trace
          payloads carry stable IDs, tool names, model names, token
          counts. Full prompts, full completions, tool arguments, and
          tool responses are recorded only when the deployment
          configuration explicitly turns it on, and they go to a separate
          retention class with redaction (PII, PCI, PHI) applied at
          ingest. Treat the trace store like a customer-data store
          because it is one.
        </li>
        <li>
          <strong>Three-layer evaluators on every PR.</strong>{" "}
          Deterministic checks (schema, tool-call signature, latency)
          must pass. Trajectory metrics (path length, tool correctness,
          loop detection) must not regress beyond a tolerance. LLM-as-
          judge rubric (faithfulness, helpfulness, refusal correctness)
          is the qualitative gate. CI fails on red on the first two,
          warns on the third, and posts the delta to the PR. Braintrust
          and LangSmith ship the GitHub Action; Phoenix and Confident AI
          ship the same shape against their datasets.
        </li>
        <li>
          <strong>Curate the dataset from real traces, not from
          imagination.</strong> The offline dataset must look like
          production. Sample low-score online traces weekly, annotate
          them, freeze them into the offline suite. The dataset is a
          living artefact, not a one-off - versioned, dated, and
          attributed to the trace it came from. The flywheel beats the
          handcrafted prompt every time.
        </li>
        <li>
          <strong>Pin the judge.</strong> LLM-as-judge agreement with
          humans is excellent, but model rev changes shift the scores. Pin
          the judge model and the rubric prompt to a version; treat a
          judge change as a release, not a config tweak. Hash the (trace,
          rubric, judge_model) tuple to cache scores; replay is free, real
          evaluation costs once.
        </li>
        <li>
          <strong>Online evaluators on a sample, deterministic checks
          on every call.</strong> Schema validation, hallucination
          canaries, refusal allowlist, and tool-call legality run on
          100% of traces - they are cheap. LLM-as-judge evaluators run
          on a 1–10% sample by default, and on 100% of traces flagged by
          deterministic anomalies. The budget is bounded; the coverage
          is total.
        </li>
        <li>
          <strong>Alert on the metric the human would care about.</strong>{" "}
          Token usage and latency are observability hygiene; the alert
          that wakes someone up at 2am is the one that says &ldquo;the
          refund tool fired on a session where the caller&rsquo;s
          intent was a balance check.&rdquo; Wire alerts on trajectory
          and tool-correctness regressions, not on raw error rates. The
          raw error rate is your APM dashboard; the agent-quality alert
          is what you build for here.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Workloads where evaluation earned its seat
      </h2>
      <p className="mb-4 leading-relaxed">
        Four production shapes where the eval layer changed the outcome
        on engagements over the last year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Customer-facing support agents.</strong> The headline
          use case. Agent quality is the difference between a deflected
          ticket and an escalated one with a refund attached. Trajectory
          eval catches the wrong-tool path (refund tool fired on a
          status-check intent); LLM-as-judge catches tone drift after a
          model swap; online sampling catches the user phrasing the
          offline dataset never saw. The pattern is universal across
          healthcare, fintech, and ecommerce.
        </li>
        <li>
          <strong>RAG-backed knowledge assistants.</strong> The two
          failure modes are unretrieved-but-relevant and
          retrieved-but-ignored. Faithfulness eval (does the answer cite
          the retrieved chunk?) and groundedness eval (is every claim
          supported by a cited chunk?) are the gates. RAGAS, DeepEval,
          and Phoenix all ship these out of the box; the discipline is
          running them on every PR.
        </li>
        <li>
          <strong>Multi-step agentic workflows.</strong> Longer
          trajectories amplify everything. A 12-step workflow with 95%
          per-step correctness lands at ~54% end-to-end; the eval suite
          has to score every step and the composition. LangSmith&rsquo;s
          LangGraph state diffs and Phoenix&rsquo;s trajectory evaluators
          are the production picks here; Braintrust&rsquo;s trace replay
          is what closes the loop.
        </li>
        <li>
          <strong>Internal developer-tool agents.</strong> Coding agents,
          spec-to-PR agents, codebase-search agents. The eval surface is
          unusual - outcome is testable (does the diff compile? do the
          tests pass?) but trajectory matters disproportionately (did
          the agent read the right files?). The 2026 pattern is a
          composite scorer: test-pass rate + trajectory rubric + token
          budget compliance. Coding eval suites (SWE-Bench Verified,
          HumanEval+, BigCodeBench) frame the methodology.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where agent evaluation still hurts
      </h2>
      <p className="mb-4 leading-relaxed">
        The category is production-grade; it is not friction-free. Five
        failure modes that show up on most non-trivial deployments.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Judge model drift.</strong> The same rubric scored on
          GPT-5 in March and GPT-5.1 in June produces different
          distributions. Pin the model; pin the prompt; budget for a full
          re-score when you upgrade. Teams that skip this notice the
          eval scores wander and conclude the agent regressed when the
          judge changed.
        </li>
        <li>
          <strong>Dataset overfit.</strong> Offline eval suites that
          stop growing become a memorisation surface - the prompt is
          tuned to pass the dataset, not to behave well in production.
          The defence is the trace-to-eval flywheel; the dataset has to
          be refreshed from real traces on a cadence, and the old cases
          stay as the regression floor but the score that matters is the
          quarter&rsquo;s new cases.
        </li>
        <li>
          <strong>Trace cardinality explosion.</strong> A naive
          instrumentation captures every span with every attribute,
          including full prompts and completions, and the trace store
          bill is suddenly the largest line on the LLM budget. Sample
          aggressively on the verbose attributes; keep the structural
          spans and the metric attributes on 100%. Langfuse&rsquo;s 2026
          immutable-events table change is the platform-side answer;
          the application-side answer is content-opt-in.
        </li>
        <li>
          <strong>PII leakage into traces.</strong> Prompts and
          completions carry user data by definition. Redact at ingest;
          treat the trace store as a regulated data store; align
          retention with the same rules as the rest of the customer
          data. The platforms ship redaction (Langfuse, Helicone, Arize
          all have PII filters); the application has to turn them on.
        </li>
        <li>
          <strong>Online eval cost runaway.</strong> 100% LLM-as-judge
          on production traffic is a way to spend the agent&rsquo;s
          entire serving budget on scoring. Sample at 1–10%, run
          deterministic checks on 100%, and reserve 100% judge runs for
          traces flagged by the cheap checks. The cost story is the
          single biggest reason teams turn off online evals after a
          quarter - the discipline is to sample, not to skip.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Comparing the platforms
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>LangSmith.</strong> The right answer when LangChain or
          LangGraph runs the agent. Deepest framework integration, node-
          by-node trace rendering, one-click replay across model
          versions, the cleanest dataset-curation UX in the category.
          Plan around the seat-based pricing at scale; the depth is
          worth it when the stack is LangChain top to bottom.
        </li>
        <li>
          <strong>Langfuse.</strong> The right answer when self-host is
          a hard requirement and the team wants the open-source
          guarantee. v3&rsquo;s OTel-native ingestion and the
          ClickHouse-backed store make it the broadest framework
          coverage in the OSS category; the cloud tier removes the
          operations bill if you prefer to outsource it. Strongest for
          regulated workloads, EU data residency, and teams that want
          full source control over the trace pipeline.
        </li>
        <li>
          <strong>Arize Phoenix.</strong> The right answer when eval
          rigour is the binding constraint. Drift detection, embeddings
          analysis, deterministic evaluators, OpenInference as the
          convention, and out-of-the-box support for every major agent
          SDK. The OSS local UI is genuinely usable for development; the
          managed Arize tier is the production scale story. Default for
          ML-mature teams.
        </li>
        <li>
          <strong>Braintrust.</strong> The right answer when CI gates
          and prompt iteration are the primary use cases. The playground
          turns production failures into experiments in two clicks; the
          GitHub Action turns eval thresholds into merge gates. The
          fastest trace-to-eval loop we have shipped on engagement work.
        </li>
        <li>
          <strong>Helicone.</strong> The right answer when the team
          wants observability before lunch and the agent is OpenAI-first.
          Drop-in proxy, no SDK install, native cost tracking. Lighter on
          trajectory rendering and eval than the agent-native platforms;
          the trade-off is that the integration is zero engineering
          effort.
        </li>
        <li>
          <strong>Datadog LLM Observability.</strong> The right answer
          when the team already pays the Datadog bill and the whole-
          stack story matters. Native OTel GenAI support, same traces
          across APM and LLM, same alerting and dashboarding primitives
          the org already knows. Default for enterprise shops with a
          standardised observability platform.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How to introduce evaluation and observability on a real project
      </h2>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Pick the trace store before the first commit. Phoenix for ML-
          rigour teams, LangSmith for LangGraph teams, Langfuse for self-
          host requirements, Braintrust for CI-gate-first teams,
          Helicone for &ldquo;before lunch.&rdquo; Datadog if the
          whole-stack story is the constraint. The OTel conventions
          mean migration later is cheap, but pick one and ship.
        </li>
        <li>
          Instrument with OpenTelemetry GenAI from day one. One line per
          framework, one line per LLM SDK. Default to content-opt-in;
          turn on prompts and completions only on the routes that
          warrant it, with redaction at ingest. The trace shape is the
          shared currency across every platform in the category.
        </li>
        <li>
          Wire the deterministic eval gate on PR #1. Schema validation,
          tool-call signature, latency ceiling, token-budget ceiling,
          hallucination canary. Cheap, fast, free, and they catch the
          regressions most likely to ship. CI failure on red is non-
          negotiable.
        </li>
        <li>
          Ship the LLM-as-judge rubric in the second sprint, not the
          first. Get the deterministic checks stable before you trust the
          judge; pin the judge model and the rubric; cache by hash;
          treat it as a release-gated change.
        </li>
        <li>
          Build the trace-to-eval flywheel before you ship the agent.
          The pipeline that takes low-score production traces, surfaces
          them for review, lets a human annotate, and writes them into
          the offline dataset is the single biggest accelerator of agent
          quality over time. Every platform ships this loop now; the
          discipline is wiring it before the first production incident
          rather than after.
        </li>
        <li>
          Run online evaluators on a sample and deterministic checks on
          everything. The budget is the constraint; sampling 1–10% of
          traces against the judge while running 100% of deterministic
          checks gives total coverage and bounded cost. Pin the sample
          rate per intent, not globally - high-stakes intents get
          higher sampling.
        </li>
        <li>
          Align alerts with agent quality, not with infrastructure
          health. The 2am page that matters is the trajectory regression,
          the tool-call-correctness drop, the refusal-allowlist trip,
          the spike in retried side-effecting calls. Token usage and
          latency belong on the standard APM dashboard; the agent-
          quality page is a separate routing rule.
        </li>
        <li>
          Treat the trace store as customer data. PII redaction at
          ingest, retention windows aligned with the rest of the data
          warehouse, access controls scoped per project. The procurement
          team asks for this on the first call; engineering should not
          be the team that learns it on the third.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 trajectory
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>OpenTelemetry GenAI becomes the default.</strong> The
          conventions for client and agent spans land out of development
          in 2026; every framework SDK ships native emission of{" "}
          <code>invoke_agent</code>, <code>execute_tool</code>, and{" "}
          <code>chat</code> spans. The dialect war is settled; the
          platforms compete on what they do with the trace, not on whose
          SDK you have to install.
        </li>
        <li>
          <strong>LLM-as-judge becomes a judge ensemble.</strong> Single-
          judge agreement with humans is excellent; multi-judge consensus
          with disagreement detection is better. Phoenix, Confident AI,
          and Braintrust are all moving toward ensembles with disagreement
          flagged as a separate signal. The pattern that surfaces is the
          uncertain-case routing - high-confidence judgements are
          automated; low-confidence ones go to a human.
        </li>
        <li>
          <strong>Agent-as-a-judge crosses the chasm.</strong> Using an
          agent (not just an LLM) to evaluate another agent is the
          research-to-production crossing of 2026. The agent-judge runs
          its own tool calls - re-executing API lookups, validating
          source citations - and produces a richer rubric than a text-
          only judge could. Early production deployments in coding-
          agent and research-agent stacks; broader uptake by year end.
        </li>
        <li>
          <strong>Trace-to-eval becomes a managed primitive.</strong>{" "}
          Every platform now ships the loop, but the next year is about
          turning it into a default: automatic clustering of low-score
          traces, automatic rubric generation, automatic dataset
          versioning. The team writes the policy; the platform runs the
          curation.
        </li>
        <li>
          <strong>Eval-driven development becomes the norm.</strong> The
          2024 question was &ldquo;how do you test a prompt?&rdquo; The
          2026 answer is the same way you test any other system: write
          the eval first, watch it fail, change the agent, watch it pass,
          ship the gate. The discipline that took five years to land in
          ML lands in two for LLM agents because the tooling is already
          here.
        </li>
        <li>
          <strong>Privacy-preserving telemetry catches up.</strong>{" "}
          Default redaction, on-prem judge models, and on-device
          tokenisation become standard for regulated workloads. The
          OpenTelemetry GenAI spec already nudges this direction; the
          platforms operationalise it. The compliance objection - the
          last serious one against the category - closes by the end of
          2026.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where to go from here
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent evaluation and observability is no longer the optional
        layer of an AI rollout. The wire format is standardised. The
        platforms are mature. The CI gates work. The trace-to-eval loop
        is a configuration exercise, not a research project. The
        remaining work is choosing the right platform for the team that
        has to operate it, wiring the OpenTelemetry GenAI conventions on
        day one, treating the offline dataset as a living artefact, and
        building the eval-driven development discipline before the
        first production incident, not after. The tools have stopped
        being the bottleneck.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on whether your agent stack should
        live on LangSmith, Phoenix, Langfuse, or Braintrust, or help
        wiring the OpenTelemetry GenAI conventions and a trace-to-eval
        loop into a production agent,{" "}
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
            href="https://opentelemetry.io/docs/specs/semconv/gen-ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenTelemetry Semantic Conventions for Generative AI Systems
          </a>
          {" "}&mdash; the canonical reference for the{" "}
          <code>gen_ai.*</code> attributes, the{" "}
          <code>invoke_agent</code> / <code>execute_tool</code> /{" "}
          <code>chat</code> span taxonomy, and the events that capture
          prompts and completions when content recording is enabled.
        </li>
        <li>
          <a
            href="https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Semantic Conventions for GenAI agent and framework spans
          </a>
          {" "}&mdash; the agent-specific portion of the spec, including
          how to model multi-turn agent execution as a hierarchy of
          spans with shared trace context.
        </li>
        <li>
          <a
            href="https://opentelemetry.io/blog/2026/genai-observability/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inside the LLM Call: GenAI Observability with OpenTelemetry
          </a>
          {" "}&mdash; the OpenTelemetry blog&rsquo;s 2026 deep-dive on
          why the conventions matter and how the tracing pipeline fits
          together.
        </li>
        <li>
          <a
            href="https://github.com/Arize-ai/openinference"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenInference (Arize)
          </a>
          {" "}&mdash; the OpenTelemetry-aligned semantic conventions
          and instrumentation packages that power Phoenix, with native
          support for the OpenAI Agents SDK, Claude Agent SDK,
          LangGraph, Vercel AI SDK, Mastra, CrewAI, LlamaIndex, and DSPy.
        </li>
        <li>
          <a
            href="https://github.com/Arize-ai/phoenix"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arize Phoenix (GitHub)
          </a>
          {" "}&mdash; the open-source AI observability and evaluation
          platform, with eval primitives, embeddings analysis, and a
          local UI for trace exploration during development.
        </li>
        <li>
          <a
            href="https://github.com/langfuse/langfuse"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Langfuse (GitHub)
          </a>
          {" "}&mdash; the open-source LLM engineering platform: tracing,
          OTLP ingestion, evals, prompt management, datasets, playground,
          ClickHouse-backed analytics, and the same codebase across
          Cloud and self-host.
        </li>
        <li>
          <a
            href="https://langfuse.com/blog/2026-03-10-simplify-langfuse-for-scale"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Simplifying Langfuse for Scale
          </a>
          {" "}&mdash; the March 2026 architectural shift to a wide
          immutable events table, with ~3x less memory usage and up to
          20x faster queries for self-hosted deployments.
        </li>
        <li>
          <a
            href="https://docs.smith.langchain.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangSmith documentation
          </a>
          {" "}&mdash; the canonical reference for LangChain&rsquo;s
          tracing, eval, dataset, and playground primitives, including
          the LangGraph-native state diff renderer.
        </li>
        <li>
          <a
            href="https://www.braintrust.dev/articles/agent-observability-complete-guide-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent observability: the complete guide for 2026
          </a>
          {" "}&mdash; Braintrust&rsquo;s reference write-up on the
          trace-to-eval loop, CI gates, and the platform comparison
          matrix.
        </li>
        <li>
          <a
            href="https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LLM-as-a-Judge Simply Explained
          </a>
          {" "}&mdash; the Confident AI guide to running LLM-as-judge at
          scale, with rubric design, pinning, and caching patterns.
        </li>
        <li>
          <a
            href="https://www.langchain.com/state-of-agent-engineering"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LangChain State of AI Agents 2026
          </a>
          {" "}&mdash; the 2026 production-readiness report: 57% in
          production, quality cited as the #1 barrier at 32%, and the
          observability vs evals adoption gap.
        </li>
        <li>
          <a
            href="https://www.datadoghq.com/blog/llm-otel-semantic-convention/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datadog LLM Observability natively supports the OpenTelemetry
            GenAI Semantic Conventions
          </a>
          {" "}&mdash; Datadog&rsquo;s announcement of native OTel GenAI
          support across the LLM observability product.
        </li>
        <li>
          <a
            href="https://clickhouse.com/blog/langfuse-llm-analytics"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Langfuse is scaling LLM observability for the agentic
            era with ClickHouse Cloud
          </a>
          {" "}&mdash; the ClickHouse case study on Langfuse&rsquo;s
          ingestion pipeline, with billions of events per month and the
          analytical store architecture behind the dashboards.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026
          </a>
          {" "}&mdash; the orchestration layer that pairs most naturally
          with LangSmith and Phoenix on multi-step agentic workflows.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Model Context Protocol in 2026
          </a>
          {" "}&mdash; the protocol that exposes tools to the agents
          this article is about evaluating; MCP spans appear in the
          same OTel trace tree as <code>execute_tool</code>.
        </li>
        <li>
          <a
            href="/articles/production-ai-agents-tool-use"
            className="font-semibold text-primaryColor hover:underline"
          >
            Production AI agents and tool use
          </a>
          {" "}&mdash; the companion piece on tool-call design and
          retries that the trajectory evaluators in this article are
          built to score.
        </li>
      </ul>
    </div>
  );
}
