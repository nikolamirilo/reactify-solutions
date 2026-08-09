import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-models-ai-agents-2026",
  title:
    "Small language models for AI agents in production 2026: Phi-4, Gemma 3, SmolLM3, Qwen3, and NVIDIA Nemotron Nano",
  excerpt:
    "Why the shift from giant chat models to 1B-9B specialists is the biggest cost story in agentic AI. Covers the NVIDIA position paper that started the debate, the model families now shipping (Phi-4-mini, Gemma 3 270M, SmolLM3-3B, Qwen3-4B, Nemotron Nano 9B, Apple Foundation Model), the heterogeneous SLM-first routing pattern, the LLM-to-SLM conversion recipe, and the real-world tool-calling numbers from Docker's local model leaderboard.",
  metaDescription:
    "A practical, technical guide to using small language models (SLMs) for AI agents in 2026. Covers the June 2025 NVIDIA position paper, the SLM-first heterogeneous architecture, the top open SLMs for tool calling (Phi-4-mini, Gemma 3 270M, SmolLM3-3B, Qwen3-4B, NVIDIA Nemotron Nano 9B v2, Apple Foundation Model, Mistral 7B), the six-step LLM-to-SLM agent conversion algorithm, deployment on Ollama, vLLM, and llama.cpp, on-device and edge use cases, and the honest cost, latency, and accuracy trade-offs against frontier chat models.",
  image:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2400&q=80",
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
    "Phi-4",
    "Gemma",
    "SmolLM3",
    "Qwen3",
    "Nemotron",
    "On-device",
    "Production",
  ],
  publishDate: "2026-07-15",
  readingTime: "17 min read",
};

export default function SmallLanguageModelsAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most agent traffic in production is not a
        conversation. It is a router deciding which tool to
        call, a classifier tagging an intent, a small JSON
        object being extracted from a paragraph, or a
        function argument being formatted. For that kind of
        work, a 500B-parameter chat model is doing the job
        of a 3B specialist and charging accordingly. In June
        2025, NVIDIA Research published a paper arguing that
        small language models are the correct default for
        agentic AI, not a compromise. A year later, the
        model families that back that claim, Microsoft
        Phi-4, Google Gemma 3, HuggingFace SmolLM3, Alibaba
        Qwen3, NVIDIA Nemotron Nano, and Apple Foundation
        Model, are all shipping open weights with real
        tool-calling support. This article is how we use
        them: which model fits which slot, the routing
        pattern that pairs an SLM with an LLM fallback, and
        the concrete numbers on cost, latency, and
        tool-calling accuracy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the SLM story matters right now
      </h2>
      <p className="mb-6 leading-relaxed">
        The economics of an agent are not the economics of
        a chatbot. A chat session uses a model once per
        user turn. An agent uses it dozens of times per
        turn: a planner call, a tool-choice call, argument
        formatting, a reflection step, a summary. If every
        one of those calls hits a frontier model, the bill
        for a single user session can be higher than the
        entire monthly subscription that session pays for.
        The industry noticed. Anthropic&rsquo;s multi-agent
        research write-up put the ratio at roughly 15x more
        tokens than a chat, and every serious team that
        shipped an agent in 2025 hit the same wall.
      </p>
      <p className="mb-6 leading-relaxed">
        The NVIDIA position paper by Peter Belcak and
        colleagues, submitted to arXiv on June 2, 2025 and
        revised in September 2025, gave the argument a name.
        Their claim is short: SLMs are &ldquo;sufficiently
        powerful, inherently more suitable, and necessarily
        more economical for many invocations in agentic
        systems.&rdquo; The paper does not say LLMs are dead.
        It says that most calls inside an agent are
        repetitive, narrow, and well-defined, and that
        matching those calls to a 1B to 10B model instead of
        a 100B to 500B model is a straight upgrade on cost,
        latency, and energy, with no accuracy loss on the
        task.
      </p>
      <p className="mb-6 leading-relaxed">
        The other half of the story is that the SLMs
        themselves finally got good. A 3B model in 2023 was
        a novelty. A 3B model in 2026 does structured tool
        calling, holds a 128k token context, runs offline
        on a phone, and can be fine-tuned in hours on a
        single consumer GPU. Docker&rsquo;s June 2025
        leaderboard measured Qwen 3 8B at 0.933 F1 on
        tool-calling accuracy against OpenAI GPT-4 at 0.974,
        both running on a MacBook Pro. That is not a
        rounding difference you fix with a bigger model.
        That is the same job for a fraction of the cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What actually counts as a small language model in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        There is no clean cutoff, but the working definition
        the NVIDIA paper uses, and the one most vendors have
        settled on, is a model that can run inference on a
        single consumer device in real time. In practice
        that puts the ceiling at roughly 10B parameters. The
        floor keeps dropping, currently sitting around
        250M with Gemma 3 270M. Anything in that band is
        an SLM. Anything above it is an LLM. Nothing more
        philosophical than that.
      </p>
      <p className="mb-6 leading-relaxed">
        The band splits into three groups that show up over
        and over in production stacks:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Micro (250M to 1B)</strong>: fine-tuned
          for a single task, run on-device or in a tight
          serverless slot. Gemma 3 270M is the reference
          here. Google reports it uses 0.75% of a Pixel 9
          Pro battery over 25 chats when quantized to INT4.
        </li>
        <li>
          <strong>Small (1B to 5B)</strong>: general-purpose
          instruction followers with real tool calling.
          Phi-4-mini (3.8B), SmolLM3-3B, Gemma 4 E2B
          (2.3B effective), Qwen3-4B, Apple Foundation
          Model (~3B). This is the sweet spot for most
          agent sub-tasks.
        </li>
        <li>
          <strong>Mid (5B to 10B)</strong>: the &ldquo;serious
          local model&rdquo; tier. Mistral 7B, Qwen3-8B,
          Nemotron Nano 9B v2. Runs on a single 24 GB GPU
          or a beefy laptop, competitive with mid-tier
          hosted models on reasoning-heavy sub-tasks.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Everything past 10B, Llama 3.3 70B, GPT-OSS 120B,
        Nemotron 3 Super at 120B total, is an LLM by this
        definition, even when the active-parameter count in
        a mixture-of-experts model is low. What matters for
        an agent is the memory footprint at inference, not
        the parameter count on paper.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline that changed the default
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>April 2024</strong>: Microsoft ships
          Phi-3-mini, a 3.8B model with GPT-3.5-class
          reasoning that fits on a phone. First mainstream
          &ldquo;small but smart&rdquo; model.
        </li>
        <li>
          <strong>May 2024</strong>: Mistral 7B v0.3 adds
          function calling with dedicated{" "}
          <code>TOOL_CALLS</code>,{" "}
          <code>AVAILABLE_TOOLS</code>, and{" "}
          <code>TOOL_RESULTS</code> tokens.
        </li>
        <li>
          <strong>June 2024</strong>: Apple announces the
          on-device foundation model that ships in iOS 18
          and macOS 15, a ~3B dense model designed for
          agent-style tasks on the Neural Engine.
        </li>
        <li>
          <strong>December 2024</strong>: Microsoft releases
          Phi-4 (14B) and, in early 2025, Phi-4-mini and
          Phi-4-multimodal, adding function calling and a
          200k-word vocabulary.
        </li>
        <li>
          <strong>March 2025</strong>: Google releases the
          Gemma 3 family with 1B, 4B, 12B, and 27B sizes,
          128k context, and native tool-calling support.
        </li>
        <li>
          <strong>June 2, 2025</strong>: NVIDIA Research
          publishes &ldquo;Small Language Models are the
          Future of Agentic AI&rdquo; on arXiv, formally
          setting the position statement.
        </li>
        <li>
          <strong>July 8, 2025</strong>: HuggingFace ships
          SmolLM3-3B, a fully open 3B model with dual-mode
          reasoning, 128k context via YaRN, and both JSON
          and Python tool-calling interfaces.
        </li>
        <li>
          <strong>August 6, 2025</strong>: Alibaba releases
          Qwen3-4B-Instruct-2507 with 262k context and
          first-class tool-calling via the Qwen-Agent
          framework and MCP.
        </li>
        <li>
          <strong>August 14, 2025</strong>: Google ships
          Gemma 3 270M, a 270M-parameter model built for
          on-device fine-tuning with quantization-aware
          training for INT4 deployment.
        </li>
        <li>
          <strong>September 2025</strong>: Apple releases
          the third-generation Foundation Models with the
          AFM 3 Core 3B on-device model and a matching
          public Foundation Models framework for third-party
          apps.
        </li>
        <li>
          <strong>December 2025</strong>: NVIDIA ships
          Nemotron 3 Nano, the first production hybrid
          Mamba-Transformer for agentic reasoning, with
          native NVFP4 pretraining.
        </li>
        <li>
          <strong>March 11, 2026</strong>: NVIDIA follows
          with Nemotron 3 Super (120B total, 12B active) and
          publishes the &ldquo;Super + Nano&rdquo; pattern,
          which is the SLM-first heterogeneous architecture
          in production form.
        </li>
        <li>
          <strong>April 2, 2026</strong>: Google DeepMind
          ships Gemma 4 E2B, a 2.3B effective-parameter
          multimodal model with sliding-window attention
          that runs in under 1.5 GB of memory with
          quantization.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three arguments in the NVIDIA position paper
      </h2>
      <p className="mb-6 leading-relaxed">
        The paper is short and the argument sits on three
        legs. Understanding all three is what turns
        &ldquo;we should probably use smaller models&rdquo;
        into a real routing decision.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Sufficiency.</strong> Modern SLMs are
        already good enough for the narrow, repetitive
        sub-tasks that make up most of an agent&rsquo;s
        traffic. The paper walks through published
        benchmarks: Phi-3-mini matches or beats 70B models
        from early 2024 on reasoning and code tasks;
        Nemotron-H hybrid models in the 2B to 9B range
        match dense 30B models on instruction following at
        a fraction of the inference cost; Salesforce
        xLAM-2-8B beats frontier models on tool-use
        benchmarks specifically. The point is not that
        SLMs are as good as LLMs at everything. It is that
        for the invocations agents actually do, formatting
        a JSON object, picking one of five tools, extracting
        a date, they are.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Suitability.</strong> Agents are the
        opposite of the general-purpose chatbot they were
        first built for. An agent is a system that runs a
        small, well-scoped playbook again and again. A
        smaller model is easier to fine-tune to that
        playbook, easier to align, easier to evaluate, and
        easier to swap. The paper calls this behavioral
        alignment: you want the model to do one thing well,
        not everything acceptably. Under that lens, a
        general-purpose LLM is over-qualified in a way that
        actively works against you. Its extra capability is
        variance you did not ask for.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Economy.</strong> The cost gap is not 2x.
        The paper reports serving a 7B SLM is 10 to 30x
        cheaper per query than a 70B to 175B LLM once you
        include latency, energy, and hardware amortization.
        Fine-tuning cost drops even harder: LoRA adapters
        for a 7B model train overnight on a single consumer
        GPU. Parameter-efficient fine-tuning of a frontier
        LLM either is not offered or costs thousands per
        run. When you multiply a small unit-cost gap by the
        number of calls an agent makes in a day, the total
        difference is the difference between profitable and
        not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous SLM-first architecture
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper does not argue for replacing every
        LLM call. It argues for a heterogeneous system: an
        SLM handles the routine calls, and a larger model
        gets called only when the SLM asks for help. This is
        the same shape NVIDIA later formalized as the
        &ldquo;Super + Nano&rdquo; deployment pattern with
        the Nemotron 3 release in March 2026, and it is what
        we have seen every serious production agent
        converge on.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous SLM-first agent (production shape)"
        code={`+---------------------------------------------------------+
|                    User request                         |
+------------------------+--------------------------------+
                         |
                         v
              +----------+-----------+
              |  Router (SLM, ~1B)   |   picks the path
              +----------+-----------+   in ~50 ms
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
+---------------+ +--------------+ +--------------+
| Simple tool   | | Structured   | | Hard task    |
| call (SLM 3B) | | extraction   | | (LLM 70B+)   |
| Phi-4-mini    | | (SLM 3B)     | | Nemotron     |
| Qwen3-4B      | | Gemma 3 4B   | | Super, Claude|
+-------+-------+ +------+-------+ +------+-------+
        |                |                |
        +----------------+----------------+
                         |
                         v
              +----------+-----------+
              |  Response assembler  |
              |   (SLM or template)  |
              +----------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The router is the interesting part. It is a very
        small model, often 270M to 1B, fine-tuned on nothing
        but examples of &ldquo;this request goes to path A,
        that one goes to path B.&rdquo; Its whole job is to
        keep an LLM out of the hot path unless it is really
        needed. In our client work, this alone cuts LLM
        spend by 60 to 85% on typical agent workloads
        because the long tail of &ldquo;pick a tool and fill
        in the arguments&rdquo; calls stops touching the
        big model at all.
      </p>
      <p className="mb-6 leading-relaxed">
        The tool-call executor sits under the router. Each
        specialized SLM handles a class of calls it was
        fine-tuned for: one for structured extraction, one
        for classification, one for the actual function
        selection. The LLM sits behind the escalation edge
        and only sees requests the SLMs could not resolve.
        The result is a system where the average request
        never leaves cheap local inference, and only the
        genuinely hard requests spend LLM tokens.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 SLM landscape at a glance
      </h2>
      <p className="mb-6 leading-relaxed">
        The list of open, tool-calling-ready SLMs is longer
        than it was even six months ago. Here are the ones
        we reach for in production, with the numbers that
        actually matter for an agent designer.
      </p>
      <CodeBlock
        language="bash"
        filename="Production SLMs for agents in mid-2026"
        code={`Model                          | Params  | Context | Tool calling            | License
-------------------------------+---------+---------+-------------------------+----------
Gemma 3 270M                   | 270M    | 32k     | via fine-tune           | Gemma
Phi-4-mini                     | 3.8B    | 128k    | native function calling | MIT
SmolLM3-3B                     | 3B      | 128k    | JSON/XML + Python       | Apache 2.0
Gemma 4 E2B                    | 2.3B eff| 128k    | native function calling | Apache 2.0
Apple Foundation Model         | ~3B     | 32k     | Tool Protocol           | proprietary
Qwen3-4B-Instruct-2507         | 4B      | 262k    | native + MCP            | Apache 2.0
Nemotron Nano 9B v2            | 9B      | 128k    | native + reasoning mode | Nemotron OM
Mistral 7B Instruct v0.3       | 7B      | 32k     | TOOL_CALLS tokens       | Apache 2.0
Qwen3-8B                       | 8B      | 128k    | native + MCP            | Apache 2.0`}
      />
      <p className="mb-6 leading-relaxed">
        A few of these deserve a note on why we use them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Gemma 3 270M</strong> is a fine-tuning
        base, not a general chat model. Google trained it
        on structured tasks and released a
        quantization-aware INT4 checkpoint so it can run
        entirely on-device with a battery cost you can
        actually measure. If you have a well-defined task,
        entity extraction, sentiment tagging, query
        routing, one fine-tune run gets you a task-specific
        expert cheap enough to deploy 20 of them for the
        cost of one 7B model.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Phi-4-mini and SmolLM3-3B</strong> are the
        general-purpose workhorses in the 3B band. Phi-4
        has strong reasoning and a permissive MIT license.
        SmolLM3 has a full open recipe (weights, data,
        training code), dual-mode reasoning with a
        thinking-on and thinking-off toggle, and a 128k
        context you can push to via YaRN.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Qwen3-4B-Instruct-2507</strong> is our
        current default for anything MCP-shaped. Alibaba
        ships a matching Qwen-Agent framework that speaks
        MCP out of the box, and the 262k native context
        window means you rarely have to worry about
        chunking. Docker&rsquo;s leaderboard put the older
        Qwen3-8B at 0.933 F1 on tool-calling accuracy,
        essentially tied with Claude 3 Haiku at 0.933 F1
        and only 0.04 behind GPT-4 at 0.974 F1, and the
        4B version keeps most of that quality while cutting
        latency in half.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Nemotron Nano 9B v2</strong> is the
        interesting outlier. It uses a hybrid
        Mamba-Transformer architecture rather than a pure
        transformer, which gives it near-linear complexity
        in sequence length. In practice, that means it can
        chew through very long tool-call histories, 128k
        tokens of prior turns, without the memory blowup
        that a pure attention model has. NVIDIA also
        exposes an on/off reasoning mode so the same model
        can serve fast tool calls and slow multi-step
        reasoning without swapping weights.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Apple Foundation Model</strong> is the one
        you cannot host anywhere except on Apple hardware,
        and it is the reason we now build a real chunk of
        our iOS work as on-device agents. It ships in iOS
        26 as part of the Foundation Models framework, runs
        entirely on the Neural Engine, has a defined Tool
        Protocol that maps Swift functions to the
        model&rsquo;s tool schema, and has no per-call
        cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Deploying an SLM: Ollama, vLLM, and llama.cpp
      </h2>
      <p className="mb-6 leading-relaxed">
        Three inference stacks cover almost every SLM
        deployment we do. Ollama is the developer-laptop
        default. vLLM is the multi-tenant server default.
        llama.cpp is the on-device and edge default.
        Everything else, TensorRT-LLM, SGLang, Text
        Generation Inference, MLX, is a specialization of
        one of those three.
      </p>
      <p className="mb-6 leading-relaxed">
        The simplest possible SLM tool-calling loop, using
        Ollama and an OpenAI-compatible client, looks like
        this. This is what we hand to a new engineer as a
        starting template.
      </p>
      <CodeBlock
        language="python"
        filename="agents/slm_tool_loop.py"
        code={`from openai import OpenAI
import json

# Ollama exposes an OpenAI-compatible endpoint on 11434
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # ignored, but must be set
)

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_order_status",
            "description": "Look up the status of an order by ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                },
                "required": ["order_id"],
            },
        },
    },
]

def run_agent(user_message: str) -> str:
    messages = [{"role": "user", "content": user_message}]

    for _ in range(5):  # 5-round agent loop cap
        response = client.chat.completions.create(
            model="qwen3:4b",
            messages=messages,
            tools=TOOLS,
        )
        msg = response.choices[0].message
        messages.append(msg.model_dump(exclude_none=True))

        if not msg.tool_calls:
            return msg.content

        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            result = dispatch_tool(call.function.name, args)
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": json.dumps(result),
            })

    return "gave up after 5 rounds"

def dispatch_tool(name: str, args: dict) -> dict:
    if name == "get_order_status":
        return {"order_id": args["order_id"], "status": "shipped"}
    return {"error": f"unknown tool {name}"}

print(run_agent("Where is order 12345?"))`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern is identical to the hosted-LLM version.
        The differences are the base URL, the model name
        (Ollama tags like <code>qwen3:4b</code> or{" "}
        <code>phi4-mini:latest</code>), and the fact that
        every call runs on your machine with zero per-token
        cost. The 5-round cap is a hard-earned lesson: SLMs
        occasionally loop, and you always want an explicit
        exit before the process eats the whole request
        budget.
      </p>
      <p className="mb-6 leading-relaxed">
        For a production server, we swap Ollama for vLLM
        because it does continuous batching, PagedAttention,
        and multi-request serving out of the box.
      </p>
      <CodeBlock
        language="bash"
        filename="Serving Qwen3-4B for many concurrent agents"
        code={`# Install
pip install vllm

# Serve Qwen3-4B on an OpenAI-compatible endpoint
vllm serve Qwen/Qwen3-4B-Instruct-2507 \\
    --dtype bfloat16 \\
    --max-model-len 32768 \\
    --gpu-memory-utilization 0.90 \\
    --tool-call-parser hermes \\
    --enable-auto-tool-choice \\
    --port 8000

# Now http://localhost:8000/v1 speaks OpenAI protocol
# and can serve hundreds of tool-calling agents concurrently
# on a single A100 or H100 GPU.`}
      />
      <p className="mb-6 leading-relaxed">
        Two flags matter here.{" "}
        <code>--tool-call-parser hermes</code> tells vLLM
        which tool-call format to parse out of the
        model&rsquo;s output, because different SLM families
        use different formats (Hermes for Qwen, Mistral for
        Mistral, Phi for Phi-4). And{" "}
        <code>--enable-auto-tool-choice</code> lets the
        model decide when to call a tool rather than forcing
        every response into a tool call. Both are trivial
        to miss and both break tool-calling entirely if
        wrong.
      </p>
      <p className="mb-6 leading-relaxed">
        For on-device iOS or Android, we drop down to
        llama.cpp or its platform-specific wrapper (MLX on
        Apple silicon, TFLite on Android, or Apple&rsquo;s
        Foundation Models framework for the ~3B on-device
        model). The tool-calling loop is the same, but the
        model is a INT4-quantized GGUF file weighing 1 to
        3 GB, and it runs entirely offline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Fine-tuning: the six-step LLM-to-SLM conversion
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper is the first place we saw a
        concrete recipe for moving an existing LLM-based
        agent onto SLMs without a rewrite. The algorithm is
        six steps and every step maps to work you would
        actually do on a real code base.
      </p>
      <CodeBlock
        language="bash"
        filename="LLM-to-SLM agent conversion (from the NVIDIA paper)"
        code={`Step 1: Collect.
  Log every model call the agent makes in production.
  Capture prompt, tools, response, latency, cost.
  Two weeks of traffic is usually enough to see the
  distribution.

Step 2: Cluster.
  Group calls by shape: same tool schema, same prompt
  template, same task type. Most agents have 5-15
  clusters that cover 90%+ of calls.

Step 3: Rank.
  Sort clusters by (frequency x per-call cost). The
  top 3-5 clusters are the fine-tuning targets.
  Ignore the long tail for now.

Step 4: Match.
  For each target cluster, pick a candidate SLM based
  on the task: Gemma 3 270M for classification, Phi-4-
  mini or SmolLM3 for extraction, Qwen3-4B for tool
  calling with 3-10 tools.

Step 5: Fine-tune.
  Use the logged LLM calls as SFT data. The LLM's own
  output is the label. LoRA on a single GPU is enough
  for most cases. Track accuracy on a held-out slice
  against the LLM baseline.

Step 6: Route.
  Deploy the SLM behind the router with an LLM fallback.
  Route the target cluster to the SLM, keep everything
  else on the LLM. Measure. If the SLM matches the LLM
  on the task, cut the fallback rate. If not, refine
  the fine-tune data.`}
      />
      <p className="mb-6 leading-relaxed">
        Step 5 is the interesting one because it inverts
        the usual fine-tuning problem. You do not need
        human-labeled data. The LLM you are replacing is
        already producing labels, thousands of them a day,
        in production. You just have to store them. This is
        called distillation-by-logging in the paper and it
        is the fastest path we know from a shipped LLM
        agent to a working SLM-first version. On real
        client work we usually see the first target cluster
        move to the SLM in two to three weeks: one week of
        logging, one week of fine-tuning and eval, one week
        of gradual rollout behind the router.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The tool-calling accuracy question
      </h2>
      <p className="mb-6 leading-relaxed">
        The most common pushback we hear against SLMs is
        that they will get the tool call wrong. It is a
        fair concern. Docker&rsquo;s June 2025 evaluation is
        the best public data point we have on this because
        they ran a real agent loop (5 rounds, up to 5
        tools, 21 models, 3,570 tests) rather than a static
        benchmark. Here is the shape of what they found.
      </p>
      <CodeBlock
        language="bash"
        filename="Docker local LLM tool-calling leaderboard (June 2025)"
        code={`Model                          | F1     | Latency (s)
-------------------------------+--------+------------
gpt-4 (hosted)                 | 0.974  | ~5
qwen3:14B-Q4_K_M               | 0.971  | ~142
qwen3:14B-Q6_K                 | 0.943  | ~180
claude-3-haiku (hosted)        | 0.933  | ~3.5
qwen3:8B-F16                   | 0.933  | ~84
qwen3:8B-Q4_K_M                | 0.919  | ~60
gpt-3.5-turbo (hosted)         | 0.899  | ~2
gpt-4o (hosted)                | 0.857  | ~3
gpt-4o-mini (hosted)           | 0.852  | ~2
llama3.1:8B-F16                | 0.835  | ~70
qwen2.5:14B-Q4_K_M             | 0.812  | ~120
gemma3:4B                      | 0.733  | ~30
llama3.2:3B-F16                | 0.727  | ~25
llama-xlam:8B-Q4_K_M           | 0.570  | ~40
watt-tool:8B-Q4_K_M            | 0.484  | ~35

Hardware: MacBook Pro M4 Max, 128 GB RAM.`}
      />
      <p className="mb-6 leading-relaxed">
        Two things jump out. First, the top open SLM (Qwen3
        14B) essentially matches GPT-4 on tool-calling
        accuracy, and the 8B version is within striking
        distance of Claude 3 Haiku. Second, the quality
        gap between families is much bigger than the
        quality gap between parameter counts inside a
        family. A well-tuned 4B Qwen model beats a poorly
        tuned 8B LLaMA. Which family you pick matters more
        than which size. When we start a new SLM
        engagement, we run the Docker model-test framework
        (open source, MIT-licensed) on the actual agent
        tools before picking a model, and it consistently
        picks a different model than the &ldquo;best on
        paper&rdquo; choice would have.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases
      </h2>
      <p className="mb-6 leading-relaxed">
        The SLM story is not theoretical. Here are the
        deployment patterns we now see in production, drawn
        from public case studies and the client work we do.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Nuanced content moderation.</strong> Google
        cites the work Adaptive ML did with SK Telecom:
        instead of running a large proprietary model for
        multilingual moderation, they fine-tuned a Gemma 3
        4B model on their content and hit or exceeded the
        larger model&rsquo;s performance on the specific
        task. The economics let them run moderation at a
        scale that would have been prohibitive on a
        frontier model.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>On-device iOS agents.</strong> Apple&rsquo;s
        Foundation Models framework in iOS 26 turns every
        capable iPhone into an inference target for its
        3B on-device model. We now build the &ldquo;fast
        path&rdquo; of iOS agent features against the
        on-device model (offline, private, no API cost) and
        keep only the hard tail (long-form generation,
        deep research) as a Private Cloud Compute or
        third-party API call. For a shopping assistant
        client, that split cut cloud LLM spend by roughly
        70% while making the app usable in airplane mode.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Software engineering assistants.</strong>{" "}
        NVIDIA&rsquo;s own recommended pattern with Nemotron
        3 is to use Nano for simple merge requests and
        route to Super only when the coding task requires
        deep understanding of the codebase. This maps to
        what most coding agent teams (Cursor, Cline, our
        own Claude Code sessions) do: the routing model and
        the argument-filling model are always cheap; the
        actual code generation escalates to a frontier
        model only when the plan is beyond the small
        model&rsquo;s scope.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>High-volume classification and
        extraction.</strong> Sentiment analysis, entity
        extraction, query routing, compliance scanning.
        Google&rsquo;s own release notes for Gemma 3 270M
        list this as the target use case, and it is the
        one where the &ldquo;fleet of specialists&rdquo;
        pattern shines: one fine-tuned 270M model per task,
        each deployed on the same box, each replacing a
        frontier-model call that used to cost 100x as much.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Enterprise on-prem agents.</strong> Any
        deployment where data cannot leave the customer
        network. Historically this meant a huge inference
        rig running a Llama 70B. With Nemotron Nano 9B and
        Qwen3-4B, the same agent can run on a single mid-
        range GPU with tool-calling accuracy that is good
        enough for the actual workload. This is what
        pushes SLMs onto the roadmap for every regulated-
        industry client we have (finance, health,
        government).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and honest trade-offs
      </h2>
      <p className="mb-6 leading-relaxed">
        The advantages are the same ones the NVIDIA paper
        highlights and they are large enough to change your
        cost curve.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Cost.</strong> 10 to 30x cheaper per
          token served, before you count the fact that
          you can co-host many SLMs on one GPU.
        </li>
        <li>
          <strong>Latency.</strong> First-token latency for
          a 3B model on a modern GPU is often under 50 ms.
          A frontier LLM through a hosted API is typically
          200 to 500 ms just for the round trip.
        </li>
        <li>
          <strong>Privacy.</strong> Runs on your hardware
          or the user&rsquo;s device. No third-party sees
          the prompt or the tool arguments.
        </li>
        <li>
          <strong>Predictability.</strong> Fine-tuned SLMs
          have far less behavioral variance than a
          general-purpose LLM. That makes eval, alignment,
          and regression testing much more tractable.
        </li>
        <li>
          <strong>Sustainability.</strong> Energy per
          inference is orders of magnitude lower. For
          products running at scale, this is now a real
          line item in ESG reporting.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The trade-offs are just as real and pretending
        they are not is how SLM projects fail.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Ceiling on open-ended reasoning.</strong>{" "}
          A 3B model will not out-reason Claude 4.5 or
          GPT-5 on a hard novel problem. If your agent&rsquo;s
          job requires that reasoning quality on the
          critical path, the SLM cannot be the only
          answer.
        </li>
        <li>
          <strong>Ecosystem inertia.</strong> Frontier LLM
          APIs are wired into every framework, every
          example, every tutorial. Switching to a
          self-hosted SLM means owning the inference
          stack, and that is real ops work you did not
          have before.
        </li>
        <li>
          <strong>Fine-tuning is not free.</strong> The
          per-run cost is small, but you need labeled data,
          a working eval, and a habit of retraining as the
          task evolves. If you cannot maintain the
          fine-tune, you have introduced a maintenance
          debt that will bite you in six months.
        </li>
        <li>
          <strong>Wrong-family failures are ugly.</strong>{" "}
          The Docker leaderboard shows what happens when
          you pick the wrong SLM family: F1 drops from
          0.97 to 0.48 on the same task. There is no
          gentle degradation, just a model that reliably
          formats the wrong tool call in a way that
          silently breaks the agent.
        </li>
        <li>
          <strong>Multi-modal is uneven.</strong> Text-only
          SLMs are mature. Multi-modal SLMs (Gemma 4 E2B,
          Phi-4-multimodal, Apple Foundation Model) are
          catching up fast, but coverage is patchier than
          frontier multi-modal models.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        <strong>When to use SLMs, and when not.</strong>{" "}
        Use SLMs for the high-volume, narrow, repetitive
        calls inside an agent: routing, extraction,
        classification, tool selection, argument formatting,
        first-pass summarization. Use them when latency,
        cost, or privacy is a first-order constraint. Do
        not use SLMs as the sole reasoning brain for an
        open-ended, hard task. Pair them with an LLM
        fallback and let the router decide, that is what
        the heterogeneous pattern is for.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what we expect through 2027
      </h2>
      <p className="mb-6 leading-relaxed">
        A few things look like safe bets based on what
        shipped in 2025 and 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Hybrid Mamba-Transformer becomes the
        default backbone in the SLM tier.</strong> The
        Nemotron Nano and Nemotron 3 releases show hybrid
        SSM-attention architectures scale to production and
        deliver 3 to 5x throughput improvements on
        long-context agent traffic compared to pure
        transformers. Expect the next SmolLM, Phi, and
        Qwen generations to move in the same direction.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Native low-precision pretraining becomes
        standard.</strong> NVFP4 (NVIDIA&rsquo;s native
        4-bit floating point format for Blackwell) is
        already used to pretrain Nemotron 3 Super from the
        first gradient update. Training in 4-bit is what
        makes deploying in 4-bit lossless. The industry
        will follow because the memory savings are too
        large to leave on the table.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Reinforcement-learning-tuned SLMs become
        the norm for agentic tasks.</strong> NVIDIA reports
        1.2 million environment rollouts across 21 RL
        environments for Nemotron 3 Super, and papers like
        AgenticQwen show the same approach works at the
        3B to 8B scale. The days of &ldquo;instruct-tuned
        chat model, hope it does tool calls&rdquo; are
        ending. The next generation of production SLMs will
        be RL-tuned on real agent trajectories.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>On-device fleets become a shipping
        pattern.</strong> Apple&rsquo;s Foundation Models
        framework and Gemma 3 270M point at the same idea:
        an app ships not one model but a fleet of small
        fine-tuned experts, each specialized to a feature,
        each running on the user&rsquo;s device. For mobile
        products this is the biggest UX change of the
        cycle, and the biggest cost win, because the
        marginal inference cost is zero.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Router models become their own product
        category.</strong> The idea of a 200M to 500M model
        whose only job is to pick the right downstream
        model is already showing up in commercial products
        (Not Diamond, Martian, RouteLLM). We expect it to
        show up as a first-class primitive in LLM
        gateways next.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Comparison with the frontier-LLM-only agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The honest comparison is not &ldquo;SLM vs LLM.&rdquo;
        It is &ldquo;heterogeneous SLM-first vs
        frontier-LLM-only.&rdquo; The frontier-LLM-only
        approach is simpler to build (one model, one API,
        one bill) and gives you the best possible answer
        on every call. But you pay for the best possible
        answer on every call, even when the call is
        &ldquo;extract this date&rdquo; that a 270M model
        would answer identically for a hundredth the cost.
      </p>
      <p className="mb-6 leading-relaxed">
        The heterogeneous SLM-first approach takes more
        engineering (routing, fine-tuning, an inference
        stack you own) but scales at a fraction of the
        cost. Every serious agent we have shipped past
        prototype ends up moving in this direction, not
        because SLMs are a fashion, but because the LLM
        bill for a real production agent forces the
        question within the first three months.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA position paper landed at the right
        moment. By June 2025 every serious agent team had
        seen its LLM bill and was quietly asking the same
        question. By the end of 2026, the answer looks
        like a set of practical patterns rather than an
        open debate: fine-tune a small model for the calls
        you make thousands of times a day, route to it
        first, keep an LLM fallback for the tail, and pick
        the SLM family (not the parameter count) based on
        a real tool-calling test on your actual tools.
      </p>
      <p className="mb-6 leading-relaxed">
        The models to know today are Phi-4-mini for
        general-purpose 3B work, SmolLM3-3B when a fully
        open recipe matters, Qwen3-4B when MCP and
        long-context tool calling are the point,
        Nemotron Nano 9B when you need hybrid Mamba
        efficiency at the 128k-token scale, Gemma 3 270M
        for on-device fleets of task-specific experts, and
        the Apple Foundation Model when the target device
        is an iPhone or Mac and privacy is the
        deliverable. The inference stack is Ollama for
        laptops, vLLM for servers, llama.cpp or the
        platform-native runtime for on-device.
      </p>
      <p className="mb-6 leading-relaxed">
        For new engagements we now start with the
        SLM-first architecture and only introduce a
        frontier model where the SLM demonstrably cannot
        hold the line. Most of the time that means 60 to
        85% of the calls stay on cheap local inference,
        and the LLM bill drops accordingly without a
        measurable hit to product quality. That is the
        state of small language models for agents in
        mid-2026: not a compromise, not a research topic,
        but the default architecture for anything that
        wants to make it out of the prototype.
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
            Belcak et al., &ldquo;Small Language Models are
            the Future of Agentic AI&rdquo; (arXiv:2506.02153,
            June 2025)
          </a>
          {" "}- the NVIDIA Research position paper, with
          the sufficiency, suitability, and economy
          arguments and the six-step LLM-to-SLM conversion
          algorithm.
        </li>
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research: SLM Agents project page
          </a>
          {" "}- the plain-language summary of the paper
          plus practical recommendations for teams adopting
          SLM-first agent architectures.
        </li>
        <li>
          <a
            href="https://developers.googleblog.com/en/introducing-gemma-3-270m/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Developers Blog: Introducing Gemma 3 270M
            (August 14, 2025)
          </a>
          {" "}- the official release post with the
          on-device battery numbers, the QAT INT4
          checkpoints, and the &ldquo;fleet of
          specialists&rdquo; pattern.
        </li>
        <li>
          <a
            href="https://huggingface.co/blog/smollm3"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HuggingFace: SmolLM3 (July 8, 2025)
          </a>
          {" "}- the fully open 3B model with training
          data, recipes, dual-mode reasoning, and both
          JSON and Python tool-calling interfaces.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/introducing-nemotron-3-super-an-open-hybrid-mamba-transformer-moe-for-agentic-reasoning/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Developer Blog: Nemotron 3 Super (March
            11, 2026)
          </a>
          {" "}- the hybrid Mamba-Transformer MoE
          architecture, native NVFP4 pretraining, and the
          &ldquo;Super + Nano&rdquo; heterogeneous
          deployment pattern.
        </li>
        <li>
          <a
            href="https://www.docker.com/blog/local-llm-tool-calling-a-practical-evaluation/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docker: Local LLM Tool Calling, a Practical
            Evaluation (June 30, 2025)
          </a>
          {" "}- the 21-model, 3,570-test tool-calling
          leaderboard with the Qwen 3 results and the
          model-test framework we use to pick SLMs on
          client work.
        </li>
        <li>
          <a
            href="https://www.kdnuggets.com/5-small-language-models-for-agentic-tool-calling"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            KDnuggets: 5 Small Language Models for Agentic
            Tool Calling (May 2026)
          </a>
          {" "}- the round-up of SmolLM3, Qwen3-4B,
          Phi-3-mini, Gemma 4 E2B, and Mistral 7B with
          side-by-side capability tables.
        </li>
        <li>
          <a
            href="https://azure.microsoft.com/en-us/products/phi"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Azure: Phi Open Models
          </a>
          {" "}- the official Phi-4-mini page with the
          200k-word vocabulary, grouped-query attention,
          and built-in function calling.
        </li>
        <li>
          <a
            href="https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Machine Learning: Introducing the Third
            Generation of Apple Foundation Models
          </a>
          {" "}- the AFM 3 Core 3B on-device model that
          ships in iOS and macOS, and the Foundation
          Models framework for third-party apps.
        </li>
        <li>
          <a
            href="https://build.nvidia.com/nvidia/nvidia-nemotron-nano-9b-v2/modelcard"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Nemotron Nano 9B v2 model card
          </a>
          {" "}- the hybrid Mamba-Transformer 9B model
          with native reasoning-mode toggle for agentic
          workloads.
        </li>
        <li>
          <a
            href="/articles/llm-gateways-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LLM gateways in production 2026
          </a>
          {" "}- the routing layer that makes an
          SLM-first, LLM-fallback architecture practical
          across multiple model vendors.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on prompt compression and
          context management, which SLMs make cheaper but
          also more constrained.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the shorter, tactical read on where the
          money goes in an LLM-heavy agent and what to do
          about it before rewriting everything on SLMs.
        </li>
        <li>
          <a
            href="/articles/production-ai-agents-tool-use"
            className="font-semibold text-primaryColor hover:underline"
          >
            Production AI agents and tool use
          </a>
          {" "}- the foundational read on the tool-calling
          loop that everything in this article rides on
          top of.
        </li>
      </ul>
    </div>
  );
}
