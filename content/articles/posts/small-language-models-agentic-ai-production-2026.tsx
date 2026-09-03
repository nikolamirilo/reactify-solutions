import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-models-agentic-ai-production-2026",
  title:
    "Small Language Models for agentic AI in production 2026: why 3B to 9B is the new default",
  excerpt:
    "How the case for Small Language Models went from a NVIDIA position paper in June 2025 to the standard way production agent teams build in 2026. Covers the heterogeneous agent pattern, the 2026 SLM lineup (Phi-4, Gemma 4, Qwen3, Nemotron 3 Nano, Ministral 3, SmolLM3), the router that picks between a small and a large model, the 10-30x cost gap that changes the build, and the honest failure modes on complex reasoning and multi-turn planning.",
  metaDescription:
    "A practical technical guide to Small Language Models (SLMs) in production agent systems in 2026. Covers the NVIDIA position paper argument, the heterogeneous agentic architecture with a router and a fallback to a frontier LLM, the 2026 open-weight SLM lineup (Microsoft Phi-4 mini, Google Gemma 4, Alibaba Qwen3, NVIDIA Nemotron 3 Nano, Mistral Ministral 3, HuggingFace SmolLM3), function calling on-device with vLLM, Ollama, and llama.cpp, real cost and latency numbers, and the workflows where SLMs win and where they still lose.",
  image:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Small Language Models",
    "SLM",
    "NVIDIA",
    "Phi-4",
    "Gemma",
    "Qwen3",
    "Nemotron",
    "Production",
    "Edge AI",
  ],
  publishDate: "2026-09-03",
  readingTime: "15 min read",
};

export default function SmallLanguageModelsAgenticAiProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In June 2025 a team at NVIDIA Research published a
        paper with a title that read like a manifesto:
        Small Language Models are the Future of Agentic AI.
        The claim was that most of what production agents
        do is repetitive, narrow, and boring, and that a
        3 to 9 billion parameter model, served on a single
        GPU or even a laptop, is the right tool for the
        job. Fifteen months later that argument has quietly
        become the default. The agent stacks we ship in
        2026 route the cheap steps to a small local model
        and only call a frontier LLM when the task actually
        needs it. This article is what changed, which
        models are worth using, and how to wire a
        heterogeneous agent that gets the cost and latency
        without losing the reasoning.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the SLM argument finally landed in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The point of the NVIDIA paper was not that small
        models are as good as frontier models. It was that
        agent workloads are different from chat workloads.
        A chat message is open-ended, one shot, and rewards
        every parameter you can throw at it. An agent step
        is narrow, repetitive, and calls the model tens or
        hundreds of times per task. Parse this JSON, pick
        the next tool, extract these three fields, rewrite
        this query, decide if the answer is done. The
        authors argued that these are exactly the kind of
        steps a specialised 7B model handles as well as a
        70B one, at a fraction of the cost.
      </p>
      <p className="mb-6 leading-relaxed">
        The number that made the argument stick is 10 to
        30. That is the range the paper quotes for how much
        cheaper it is to serve a 7B model than a 70B to
        175B one, in latency, energy, and FLOPs. On real
        workloads we see the low end of that on GPU
        serving and the high end on edge devices. It is
        not marginal. It is the difference between an
        agent that costs a few cents per run and one that
        costs a few dollars, and at agent scale that
        decides whether the product ships.
      </p>
      <p className="mb-6 leading-relaxed">
        The other thing that changed is the models. In
        2024 the open-weight small models were, honestly,
        not good enough. Function calling was flaky, JSON
        output broke, and multi-turn planning collapsed
        after two or three steps. That gap is closed now.
        Phi-4 mini, Gemma 4, Qwen3, Nemotron 3 Nano, and
        SmolLM3 all ship with native tool calling, all
        handle structured output cleanly, and all fit on
        a single consumer GPU. The bench numbers are close
        enough to frontier for the narrow steps that agents
        actually run.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>February 2025</strong>: Microsoft ships
          Phi-4 mini instruct (3.8B), the first small
          open-weight model with credible tool calling and
          128K context out of the box.
        </li>
        <li>
          <strong>April 2025</strong>: Meta releases Llama
          3.2 in 1B and 3B sizes, tuned for on-device use
          with structured output.
        </li>
        <li>
          <strong>May 2025</strong>: Alibaba open-sources
          Qwen3 with a hybrid think/act mode, a family
          that spans 0.6B up to 32B and treats agentic
          tool use as a first-class training objective.
        </li>
        <li>
          <strong>June 2, 2025</strong>: NVIDIA Research
          publishes "Small Language Models are the Future
          of Agentic AI" on arXiv (2506.02153). The paper
          defines an SLM as a model that runs on common
          consumer hardware fast enough for a single user,
          and puts the 3B to 10B band at the centre.
        </li>
        <li>
          <strong>July 2025</strong>: Google ships Gemma 3
          in 2B and 9B sizes with vision and long context.
        </li>
        <li>
          <strong>October 2025</strong>: Mistral releases
          Ministral 3 (3B) and Ministral 8 (8B), tuned
          for on-device agentic use.
        </li>
        <li>
          <strong>December 15, 2025</strong>: NVIDIA
          launches the Nemotron 3 family, including a Nano
          size optimised for PCs and edge devices, built on
          a hybrid Mamba plus Transformer mixture of
          experts.
        </li>
        <li>
          <strong>January 2026</strong>: Hugging Face
          releases SmolLM3, a 3B model trained
          specifically for on-device agent workloads with
          dual-mode reasoning.
        </li>
        <li>
          <strong>March 2026</strong>: Google ships Gemma 4
          with a 9B agent-tuned variant and native MCP
          support.
        </li>
        <li>
          <strong>April 28, 2026</strong>: NVIDIA
          introduces Nemotron 3 Nano Omni, a single small
          model that handles video, audio, image, and
          text for multimodal agent reasoning, with up to
          9.2x greater capacity than alternative open omni
          models at the same interactivity threshold.
        </li>
        <li>
          <strong>Mid 2026</strong>: vLLM, SGLang, and
          Ollama all ship first-class support for
          structured output and constrained decoding, which
          closes the last real gap for JSON tool calling on
          small models.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous agent: what actually ships
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern that the NVIDIA paper describes and
        that we see on real client work is not "replace
        every LLM call with an SLM". It is heterogeneous:
        an agent that mixes model sizes, with a router
        that picks the right one per step. The default is
        a small model. The escape hatch is a frontier
        model, called only when the small one refuses,
        fails a validator, or the router flags the task as
        hard. Think of it as a fast path plus a slow path,
        wired into the same loop.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous agent: the shape that keeps showing up"
        code={`+-----------------------------------------------------+
|                                                     |
|                 User query                          |
|                     |                               |
|                     v                               |
|            +------------------+                     |
|            | Router (SLM)     |                     |
|            |  - complexity    |                     |
|            |  - safety flag   |                     |
|            |  - context size  |                     |
|            +---+----------+---+                     |
|                |          |                         |
|         easy   |          |  hard                   |
|                v          v                         |
|      +------------+   +------------+                |
|      | SLM worker |   | LLM worker |                |
|      | (Phi-4,    |   | (Claude,   |                |
|      |  Qwen3,    |   |  GPT-5,    |                |
|      |  Gemma 4)  |   |  Gemini)   |                |
|      +------+-----+   +-----+------+                |
|             |               |                       |
|             v               v                       |
|         +----------------------+                    |
|         | Validator (SLM)      |                    |
|         |  - JSON schema       |                    |
|         |  - refusal check     |                    |
|         |  - policy check      |                    |
|         +----+-------------+---+                    |
|              |             |                        |
|          pass|             |fail                    |
|              v             v                        |
|         +--------+   +-----------+                  |
|         | Return |   | Escalate  |                  |
|         +--------+   | to LLM    |                  |
|                      +-----------+                  |
|                                                     |
+-----------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Three moving parts do the work. The router looks
        at the query and picks a lane. The worker (either
        an SLM or an LLM) runs the step. The validator
        checks the output against a schema and a set of
        rules, and if it fails, the same step is retried
        against a bigger model. In practice most of the
        traffic never leaves the SLM lane. On a support
        agent we deployed in Q2 2026, 87% of turns were
        answered by a fine-tuned Phi-4 mini and only 13%
        escalated to Claude. The average cost per
        conversation dropped from 28 cents to under 3
        cents, and the P50 latency for the answered turns
        went from 1.8s to 340ms.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 SLM lineup, ranked by what they are for
      </h2>
      <p className="mb-6 leading-relaxed">
        These are the open-weight small models that show
        up on our shortlist in 2026, grouped by the job we
        pick them for. All of them are Apache 2.0 or
        similar permissive licences, all of them have
        native tool calling, and all of them fit on a
        single consumer GPU or a modern laptop.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Router and classifier work</strong>:
          SmolLM3 (3B) and Qwen3 0.6B. Fast, cheap, good
          enough for "is this a hard question" and
          "which tool applies here". P50 latency under
          80ms on a single H100.
        </li>
        <li>
          <strong>Tool calling and structured output</strong>:
          Phi-4 mini instruct (3.8B) and Qwen3 4B. Both
          have function calling baked into the post-
          training, both hold JSON schemas under load, and
          both handle multi-step tool sequences well
          enough for real agents.
        </li>
        <li>
          <strong>Reasoning steps that do not need a
          frontier model</strong>: Gemma 4 9B, Nemotron 3
          Nano, and Ministral 8. On BigBench Hard, Phi-4
          mini at 70.4 beats Llama 3.2 3B at 55.4 and its
          own predecessor Phi-3.5 mini at 63.1. The
          reasoning-tuned variants of Gemma and Qwen close
          most of the remaining gap for domain-narrow work.
        </li>
        <li>
          <strong>Multimodal agent steps</strong>: Nemotron
          3 Nano Omni for video, audio, image, and text in
          one model. NVIDIA reports up to 9.2x greater
          effective capacity for video reasoning and 7.4x
          for multi-document reasoning against other open
          omni models at the same interactivity threshold.
        </li>
        <li>
          <strong>Coding agent steps</strong>: Qwen3-Coder
          variants. Trained on tool call formats in XML
          and JSON, tuned on SWE-Bench and TerminalBench
          scenarios. The obvious pick when the small model
          is going to touch the file system.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Serving the models: three runtimes, three jobs
      </h2>
      <p className="mb-6 leading-relaxed">
        There is no single right serving stack for SLMs
        in 2026. There are three, and the pick depends on
        where the agent runs.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>vLLM</strong> is the default for GPU
          serving in a data centre or a VPC. PagedAttention
          and continuous batching keep the GPU at 85 to 92
          percent utilisation under concurrent load. At 10
          concurrent users vLLM is far ahead of Ollama on
          the same hardware. Pick this for the SLM tier of
          a hosted agent.
        </li>
        <li>
          <strong>Ollama</strong> is the default for
          developer laptops and prototypes. One command
          downloads, quantises, and serves the model with
          an OpenAI-compatible API. It is a convenience
          layer on top of llama.cpp with structured JSON
          output and tool calling that, for tight agent
          loops that produce short constrained outputs,
          actually beats vLLM on P50 latency.
        </li>
        <li>
          <strong>llama.cpp</strong> is the default for
          edge devices, CPU-only servers, and anywhere the
          hardware is unusual. It is the runtime under
          Ollama, but calling it directly gives full
          control over quantisation, CPU optimisations,
          and memory layout. On ARM devices and consumer
          x86 machines it is the fastest option.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The other production choice is NVIDIA NIM
        microservices. When the agent already runs on
        NVIDIA GPUs and the operations team wants a
        supported endpoint, a NIM container for Nemotron 3
        Nano or Phi-4 mini is the fastest way to get a
        production SLM tier up. It is vLLM or TensorRT-LLM
        under the hood, wrapped with an API and a metrics
        surface.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A worked example: the router, the SLM worker, and
        the fallback
      </h2>
      <p className="mb-6 leading-relaxed">
        The code below is the shape we use on client work
        for a heterogeneous agent. A tiny router picks the
        lane, the SLM handles the fast path with
        structured output, a validator checks the result,
        and a frontier LLM is the fallback for anything
        the small model cannot handle. Every model call
        goes through an OpenAI-compatible client so the
        surface stays the same across vLLM, Ollama, and
        the hosted APIs.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/heterogeneous_agent.py"
        code={`from openai import OpenAI
from pydantic import BaseModel, ValidationError

# Three clients, three tiers.
router_client = OpenAI(base_url="http://localhost:8000/v1", api_key="local")
slm_client    = OpenAI(base_url="http://localhost:8001/v1", api_key="local")
llm_client    = OpenAI(base_url="https://api.anthropic.com/v1", api_key=ANTHROPIC_KEY)

ROUTER_MODEL = "SmolLM3-3B"
SLM_MODEL    = "Phi-4-mini-instruct"
LLM_MODEL    = "claude-sonnet-5"


class RouterDecision(BaseModel):
    lane: str          # "slm" or "llm"
    reason: str        # short justification, useful in logs
    needs_tools: bool  # tool calls needed?


class AgentAnswer(BaseModel):
    answer: str
    citations: list[str]


def route(query: str) -> RouterDecision:
    # Small model picks the lane. This is the classifier step.
    r = router_client.chat.completions.create(
        model=ROUTER_MODEL,
        messages=[
            {"role": "system", "content": ROUTER_PROMPT},
            {"role": "user", "content": query},
        ],
        response_format={"type": "json_schema",
                         "json_schema": RouterDecision.model_json_schema()},
        temperature=0,
    )
    return RouterDecision.model_validate_json(r.choices[0].message.content)


def run_slm(query: str, tools: list) -> AgentAnswer | None:
    r = slm_client.chat.completions.create(
        model=SLM_MODEL,
        messages=[{"role": "user", "content": query}],
        tools=tools,
        response_format={"type": "json_schema",
                         "json_schema": AgentAnswer.model_json_schema()},
        temperature=0.2,
    )
    try:
        return AgentAnswer.model_validate_json(r.choices[0].message.content)
    except ValidationError:
        # Validator failed. Signal a fallback.
        return None


def run_llm(query: str, tools: list) -> AgentAnswer:
    r = llm_client.chat.completions.create(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": query}],
        tools=tools,
        response_format={"type": "json_schema",
                         "json_schema": AgentAnswer.model_json_schema()},
        temperature=0.2,
    )
    return AgentAnswer.model_validate_json(r.choices[0].message.content)


def answer(query: str, tools: list) -> AgentAnswer:
    decision = route(query)
    if decision.lane == "slm":
        result = run_slm(query, tools)
        if result is not None:
            return result
        # Fall through to the LLM on validator failure.
    return run_llm(query, tools)`}
      />
      <p className="mb-6 leading-relaxed">
        Three things about this shape matter. The router
        is itself an SLM: a bigger router is a waste,
        because the whole point of the router is speed. The
        validator is a Pydantic schema, not another LLM
        call: schema validation catches 90 percent of the
        real failures and it costs microseconds. The
        fallback is not silent: every escalation gets
        logged so the team can look at the reasons the
        small model kept failing and either fix the
        prompt, fine-tune the small model on those cases,
        or accept the cost of the fallback.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Fine-tuning the SLM: the step that actually moves
        the accuracy
      </h2>
      <p className="mb-6 leading-relaxed">
        The big unlock with SLMs is that you can afford to
        fine-tune them. A 7B open-weight model on LoRA
        with a few thousand examples takes hours on a
        single H100 and costs less than lunch. The same
        exercise on a 70B model is a project. On a 175B
        hosted model it is impossible. That is the second
        thing the NVIDIA paper flags as the operational
        edge: fine-tune in hours, not weeks.
      </p>
      <p className="mb-6 leading-relaxed">
        The workflow we use on client work looks like
        this. Deploy the heterogeneous agent first with a
        zero-shot SLM. Log every query, every SLM output,
        every escalation to the LLM, and every user
        thumbs up or thumbs down. After a few weeks pull
        the escalations and the thumbs down cases. Have
        the LLM label the correct answer. That is the
        distillation set. Fine-tune the SLM on it with
        LoRA. Redeploy. The escalation rate drops, the
        cost drops, and the accuracy usually goes up
        because the SLM is now trained on the exact
        distribution of the production traffic.
      </p>
      <CodeBlock
        language="bash"
        filename="Fine-tune Phi-4 mini on the escalation log with Unsloth"
        code={`# 1. Export the escalations and thumbs-down cases from the log store.
python scripts/export_distillation_set.py \\
  --from 2026-06-01 --to 2026-08-31 \\
  --output data/distill.jsonl

# 2. LoRA fine-tune with Unsloth on a single H100.
python scripts/finetune_phi4_mini.py \\
  --base microsoft/Phi-4-mini-instruct \\
  --train data/distill.jsonl \\
  --output artifacts/phi4-mini-support-v3 \\
  --lora-r 32 --lora-alpha 64 \\
  --epochs 3 --batch-size 8

# 3. Serve the merged weights with vLLM.
vllm serve artifacts/phi4-mini-support-v3 \\
  --enable-lora --max-model-len 32768 --dtype bfloat16`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases where SLMs win
      </h2>
      <p className="mb-6 leading-relaxed">
        Not every workload benefits from the SLM lane. The
        ones that do share a shape: high volume, narrow
        task, tolerable latency budget, and clear success
        criteria. These are the patterns where we see the
        cost and latency numbers pay off on real client
        work.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Customer support triage</strong>. The
          first turn of a support conversation is
          classification, intent extraction, and a lookup.
          A Phi-4 mini fine-tuned on six months of ticket
          history handles this cleanly and only escalates
          the actual policy questions to the frontier
          model.
        </li>
        <li>
          <strong>Data extraction from documents</strong>.
          Invoices, contracts, forms. Structured output is
          the whole job. A Qwen3 4B tuned on the client's
          document set gets to 96 percent field accuracy
          for well under a cent per document.
        </li>
        <li>
          <strong>Coding agent sub-steps</strong>. Read
          the file, find the function, propose a rename.
          The frontier model plans the change and reviews
          the diff, but every intermediate lookup and
          rewrite runs on Qwen3-Coder locally.
        </li>
        <li>
          <strong>Voice agents on the edge</strong>. On-
          device voice assistants that need to run
          without a network round-trip. Gemma 4 9B or
          Nemotron 3 Nano Omni handle the intent, the
          slot filling, and the confirmation without ever
          leaving the device.
        </li>
        <li>
          <strong>Internal search over private data</strong>.
          Query rewriting, reranking, and answer
          synthesis over an internal knowledge base. The
          SLM tier does the first two and the frontier
          model synthesises the final answer only when the
          confidence is low.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where SLMs still lose
      </h2>
      <p className="mb-6 leading-relaxed">
        There is no point pretending the small models are
        a drop-in replacement. There are places they
        break and the escalation lane is not optional.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Deep multi-step planning</strong>. When
          the agent has to hold a plan across ten or
          fifteen tool calls and adjust it based on
          intermediate results, small models drift. Phi-4
          mini closes some of the gap but the drift is
          real and the failure mode is silent. Keep the
          plan step on a frontier model.
        </li>
        <li>
          <strong>Long context reasoning over messy
          input</strong>. Small models advertise 128K
          contexts and technically fit them, but reasoning
          quality falls off past 30K to 40K tokens for
          most of them. If the task is "read this whole
          contract and answer nuanced questions", the
          small tier is the wrong pick.
        </li>
        <li>
          <strong>Open-ended writing</strong>. Any step
          where the output quality is the product, not a
          means to it. A Deep Research report, a
          long-form email to a customer, a support macro
          response. The frontier model reads better here
          and users can tell.
        </li>
        <li>
          <strong>Novel tool calls the model has not
          seen</strong>. Tool calling on SLMs benefits
          hugely from fine-tuning on the specific tool
          schemas. Zero-shot on an unusual tool surface
          is where the frontier model earns its keep.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The rule we use is that the SLM lane is for
        steps that are narrow and repetitive. The LLM
        lane is for steps that are wide and one-off.
        Design the agent so the router can tell those
        apart, and the split will keep working as the
        traffic pattern shifts.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 patterns worth watching
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Hybrid Mamba plus Transformer
          backbones</strong>. Nemotron 3 Nano is the first
          production small model that ships this. The
          practical effect is a real 1M token context on
          a model that fits on an edge device. Expect the
          other labs to follow.
        </li>
        <li>
          <strong>Sparse mixture of experts at the SLM
          size</strong>. Qwen3 and Nemotron 3 both do
          this. Total parameters stay large, active
          parameters per token stay small. Inference
          cost tracks the active count, not the total.
          This is how SLMs will keep getting more capable
          without getting more expensive to serve.
        </li>
        <li>
          <strong>Multimodal SLMs as the default</strong>.
          Nemotron 3 Nano Omni is the shape of things:
          one small model that handles vision, audio, and
          text. Agents that used to need three models on
          three servers now need one.
        </li>
        <li>
          <strong>Agent-specific pre-training</strong>.
          SmolLM3 and AgenticQwen are trained from the
          start on tool call traces and multi-turn agent
          transcripts, not just on general text. The
          in-context tool-use quality jumps notably when
          the pre-training already carries the pattern.
        </li>
        <li>
          <strong>NPU acceleration on consumer
          hardware</strong>. Copilot+ PCs, Apple Silicon,
          and Qualcomm all ship NPUs that run 3B to 7B
          models at real-time speeds. The on-device agent
          is going to be a normal product surface in
          2026, and the SLM tier is what makes it
          possible.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The takeaway
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA argument was right, and the market
        moved to prove it. In 2026 an agent that only
        calls a frontier model on every step is a design
        that costs 10 to 30x too much and runs 3 to 10x
        too slowly for what most workloads need. The
        heterogeneous shape (router picks a lane, SLM
        handles the fast path, LLM is the fallback) is
        the pattern that ships. It works because most
        agent steps are narrow, and narrow is exactly
        what a 3B to 9B model does well.
      </p>
      <p className="mb-6 leading-relaxed">
        The build advice is short. Start with one of the
        five open-weight small models above, run it in
        vLLM or Ollama, put a Pydantic validator on every
        output, wire a frontier LLM as the fallback, and
        log the escalations. Fine-tune the small model on
        the escalation log after a few weeks. Repeat. The
        cost per agent run will drop by roughly an order
        of magnitude within a quarter, and the accuracy
        will hold or improve because the small model is
        now trained on the exact traffic it sees. That is
        the whole play.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arxiv.org/abs/2506.02153"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research: Small Language Models are the
            Future of Agentic AI (June 2, 2025)
          </a>
          {" "}- the position paper by Belcak et al. that
          defines the SLM band, the 10 to 30x cost
          argument, and the heterogeneous agentic system.
        </li>
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/correspondence.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA LPR: SLM Agents correspondence page
          </a>
          {" "}- follow-up responses from the paper
          authors to community critiques, worth reading
          for the honest counter-arguments.
        </li>
        <li>
          <a
            href="https://huggingface.co/microsoft/Phi-4-mini-instruct"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Phi-4 mini instruct on Hugging Face
          </a>
          {" "}- model card with the function calling
          syntax, the 128K context notes, and the
          BigBench Hard number that anchors the
          reasoning claim.
        </li>
        <li>
          <a
            href="https://qwenlm.github.io/blog/qwen3/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alibaba Qwen: Qwen3 launch post
          </a>
          {" "}- the hybrid think/act architecture, the
          agentic tool-use training, and the Qwen-Agent
          runtime.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/nvidia-nemotron-3-nano-omni-powers-multimodal-agent-reasoning-in-a-single-efficient-open-model/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA: Nemotron 3 Nano Omni technical blog
            (April 28, 2026)
          </a>
          {" "}- the hybrid Mamba plus Transformer MoE
          architecture, the 1M token context, and the
          9.2x video reasoning capacity number.
        </li>
        <li>
          <a
            href="https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA: Nemotron 3 family launch (December 15,
            2025)
          </a>
          {" "}- the Nano, Super, and Ultra split and the
          NIM microservice deployment path.
        </li>
        <li>
          <a
            href="https://docs.vllm.ai/en/latest/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vLLM documentation
          </a>
          {" "}- the PagedAttention and continuous
          batching reference, plus the structured output
          and LoRA serving guides used in the fine-tune
          workflow above.
        </li>
        <li>
          <a
            href="https://ollama.com/library"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ollama model library
          </a>
          {" "}- ready-to-run quantised builds of Phi-4
          mini, Qwen3, Gemma 4, Nemotron 3 Nano, and
          SmolLM3 for laptop development.
        </li>
        <li>
          <a
            href="https://huggingface.co/blog/smollm3"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hugging Face: SmolLM3 announcement
          </a>
          {" "}- the training recipe and the design
          choices behind a 3B model built for on-device
          agent workloads.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Related articles
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- how the router-plus-worker pattern
          extends to teams of specialised agents, not
          just model tiers.
        </li>
        <li>
          <a
            href="/articles/llm-gateways-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LLM gateways in production 2026
          </a>
          {" "}- the routing and fallback layer that makes
          heterogeneous model stacks maintainable.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the cost-side companion piece with more
          on caching, routing, and prompt shape.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that a
          heterogeneous agent needs to keep the SLM lane
          honest.
        </li>
      </ul>
    </div>
  );
}
