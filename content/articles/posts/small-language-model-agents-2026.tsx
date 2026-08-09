import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-model-agents-2026",
  title:
    "Small Language Model agents in 2026: why NVIDIA thinks sub-10B models are the future of agentic AI, and how to actually ship them",
  excerpt:
    "The NVIDIA position paper from June 2025 argued that small language models are sufficient, more suitable, and more economical for most agent work. A year later the model families to prove it are here: xLAM-2, Nemotron Nano 9B v2, Phi-4-mini, Qwen3, Hammer. This article covers what counts as small, why the heterogeneous split matters, the BFCL numbers you need to look at, and how to ship SLM-powered agents on vLLM, SGLang, or Ollama without giving up quality.",
  metaDescription:
    "A practical, technical guide to Small Language Model (SLM) agents in production 2026. Covers the NVIDIA Belcak et al. position paper, the SLM model families that matter (xLAM-2, Nemotron Nano 9B v2, Phi-4-mini, Qwen3, Salesforce APIGen), the Berkeley Function Calling Leaderboard results, the heterogeneous orchestrator plus SLM worker pattern, fine-tuning and distillation from a frontier teacher, serving choices between vLLM, SGLang and Ollama, cost and latency trade-offs, and the trade-offs you have to plan for.",
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
    "SLM",
    "Small Language Models",
    "NVIDIA",
    "Nemotron",
    "xLAM",
    "Phi",
    "Qwen",
    "vLLM",
    "Production",
  ],
  publishDate: "2026-07-21",
  readingTime: "15 min read",
};

export default function SmallLanguageModelAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In June 2025 NVIDIA Research published a short
        position paper titled{" "}
        <em>Small Language Models are the Future of Agentic AI</em>.
        The claim was direct: for most of what agents do,
        a model under 10 billion parameters is enough, is
        better suited to the job, and costs a fraction of
        a frontier LLM to run. A year on, the model families
        to back that claim have shipped. xLAM-2 from
        Salesforce, Nemotron Nano 9B v2 from NVIDIA, Phi-4-mini
        from Microsoft, Qwen3 from Alibaba, Hammer from
        MadeAgents. Berkeley&rsquo;s function-calling
        leaderboard has small open-weights models sitting a
        few points behind GPT-5-mini and above GPT-4.1-nano.
        This article is how we think about SLM agents on
        client work in mid-2026: what counts as small, why
        the heterogeneous split matters, the numbers you
        should trust, and the serving choices that make
        the economics work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why this argument only started making sense in 2025
      </h2>
      <p className="mb-6 leading-relaxed">
        The pitch for small models is not new. What changed
        in 2025 is that the models finally got good enough
        at the specific things agents do. An agent spends
        most of its life calling tools, parsing structured
        output, following a plan step by step, and
        summarising short pieces of retrieved text. Those
        are narrow tasks. They do not need a model that can
        also write a sonnet in the style of Auden or debug
        a novel React concurrency bug. Once open-weights
        SLMs in the 1B to 10B range started passing the
        Berkeley Function Calling Leaderboard at scores
        comparable to GPT-4.1-mini, the economic case
        stopped being theoretical.
      </p>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper defines <strong>small</strong>{" "}
        as anything under roughly 10 billion parameters,
        and grounds the definition in what a model needs to
        be able to do in an agent loop rather than in a
        single benchmark number. The three pillars they lay
        out are worth repeating because they show up in
        every serious build we have done: SLMs are already
        <em>powerful enough</em> for narrow agent tasks,
        they are <em>more suitable</em> because they can
        run locally, on-device, or on modest GPUs with
        strict latency guarantees, and they are{" "}
        <em>more economical</em> because inference costs
        drop by 10x to 30x per token compared to a
        frontier LLM in the same slot.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 SLM-for-agents timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>September 2024</strong>: Salesforce
          publishes the first xLAM paper. The 1B and 7B
          function-calling variants beat GPT-3.5 on the
          Berkeley Function Calling Leaderboard and set
          the direction for the &ldquo;tiny action model&rdquo;
          category.
        </li>
        <li>
          <strong>February 2025</strong>: Microsoft ships
          Phi-4-mini and Phi-4-multimodal. The mini variant
          is 3.8B, adds built-in function calling, and
          runs comfortably on a laptop GPU or a Jetson.
        </li>
        <li>
          <strong>March 26, 2025</strong>: Salesforce
          releases xLAM-2, the second generation, with
          1B, 3B, 8B, and 70B variants trained on the
          APIGen-MT multi-turn pipeline. The 3B model
          hits about 41 on BFCL v4.
        </li>
        <li>
          <strong>April 2025</strong>: Alibaba releases
          Qwen3 with dense variants from 0.6B up and MoE
          variants like Qwen3-30B-A3B (3B active). Ships
          native agent tooling through{" "}
          <code>qwen-agent</code>, including MCP support.
        </li>
        <li>
          <strong>June 2, 2025</strong>: Belcak, Heinrich,
          Fu, Muralidharan and colleagues at NVIDIA
          Research publish{" "}
          <em>Small Language Models are the Future of
          Agentic AI</em> on arXiv. The paper crystallises
          the heterogeneous-system argument the industry
          had been circling.
        </li>
        <li>
          <strong>August 2025</strong>: NVIDIA ships
          Nemotron Nano 9B v2 through the NIM catalog. It
          is a hybrid Mamba-Transformer that supports
          128k context and native tool use, trained on
          both Glaive and Salesforce APIGen data.
        </li>
        <li>
          <strong>September 15, 2025</strong>: v2 of the
          NVIDIA position paper lands, expanding on the
          LLM-to-SLM agent conversion algorithm and adding
          data from real production migrations.
        </li>
        <li>
          <strong>October 2025 onward</strong>: BFCL v4
          adds agentic and multi-turn evaluations, which
          re-orders the leaderboard around what agents
          actually do. Small models that were near the
          top on single-turn function calling drop; the
          ones tuned for multi-turn (xLAM-2, Nanbeige,
          BitAgent) rise.
        </li>
        <li>
          <strong>Late 2025 and 2026</strong>: NVIDIA
          Nemotron 3 family arrives with a Nano variant
          that activates 3B parameters at a time from a
          30B MoE pool, aimed squarely at the SLM-agent
          slot.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous split: one big model for the
        plan, many small ones for the work
      </h2>
      <p className="mb-6 leading-relaxed">
        The core architectural claim in the NVIDIA paper
        is that an agent system does not need one model
        for everything. It needs the right model for each
        node in the graph. Almost every mature agent we
        have shipped ends up on the same split: a strong
        generalist LLM at the top for planning and
        recovery, and specialised SLMs everywhere else -
        tool routing, structured extraction, short
        summarisation, format conversion, classification,
        argument-filling for function calls.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous agent: where the SLMs live"
        code={`+---------------------------------------------------+
|  Planner / Orchestrator                           |
|  (frontier LLM: GPT-5.2, Claude Opus, Gemini 2.5) |
|  - decomposes the task                            |
|  - handles novel or ambiguous requests            |
|  - recovers when a sub-step fails                 |
+---------------------------------------------------+
              |            |            |
              v            v            v
     +----------+   +-----------+   +---------------+
     | Router   |   | Extractor |   | Tool caller   |
     | SLM 1-3B |   | SLM 3-7B  |   | SLM 3-8B      |
     | (Phi-4   |   | (xLAM-2   |   | (Nemotron     |
     |  mini)   |   |  3B)      |   |  Nano 9B v2)  |
     +----------+   +-----------+   +---------------+
              |            |            |
              v            v            v
     +---------------------------------------------+
     |  Tools / MCP servers / private data         |
     +---------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The reason the split works is that most tokens in
        a running agent are not thinking tokens. They are
        formatting tokens, tool-call arguments, retrieval
        summaries, and short intermediate messages. Send
        those to a 3B model tuned for the job and you save
        an order of magnitude on both cost and latency
        without dropping quality on the parts that
        matter. Send the actually-hard reasoning steps -
        the one where the agent has to decide whether the
        user meant option A or B, or unpick a genuinely
        strange failure - to the frontier model.
      </p>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper spells out the migration path as
        an algorithm: run production for a while with the
        frontier model, log every call, cluster the calls
        by function, then look for clusters where an SLM
        would clearly be enough. Replace those calls one
        at a time, measure, and keep going. This is the
        opposite of a big-bang rewrite and it is why the
        pattern is showing up in production more than in
        blog posts.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What the Berkeley Function Calling Leaderboard
        actually tells you
      </h2>
      <p className="mb-6 leading-relaxed">
        The{" "}
        <a
          href="https://gorilla.cs.berkeley.edu/leaderboard.html"
          className="font-semibold text-primaryColor hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Berkeley Function Calling Leaderboard
        </a>{" "}
        is the closest thing the industry has to a shared
        yardstick for &ldquo;can this model call tools
        reliably&rdquo;. The v4 release added agentic and
        multi-turn categories, which is what most
        production agents are actually doing. A few
        numbers from the current board are worth
        internalising when you pick an SLM.
      </p>
      <p className="mb-6 leading-relaxed">
        Claude Sonnet 4.5 sits near the top with an
        overall score around 73. That is the frontier bar.
        GPT-5-mini and GPT-4.1-mini land in the 50 to 55
        range. Salesforce xLAM-2-3B lands around 41 on the
        aggregate. Nanbeige4-3B-Thinking, a specialised
        reasoning SLM, is around 51 on the aggregate,
        which puts a 3B open-weights model in the same
        rough neighbourhood as GPT-5-mini for tool-call
        reliability. That is the sentence to keep in
        mind: on the specific job of calling tools
        correctly, a well-trained 3B model is now inside
        the same order of magnitude as the tuned frontier
        minis.
      </p>
      <p className="mb-6 leading-relaxed">
        The catch is that the aggregate score hides a lot
        of variance. A 3B model can be excellent at
        single-turn function calling (BFCL &ldquo;non-live
        AST&rdquo; scores in the 80s) and average at
        multi-turn (scores in the 30s to 50s), because
        multi-turn requires the model to hold state
        across many steps and recover from mistakes.
        Frontier models still have a real lead in
        multi-turn agentic evaluation. In practice that
        means: SLMs for the leaf nodes of the graph,
        frontier LLM for the outer loop that decides what
        to try next.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The model families that matter in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        A short field guide to the SLMs we reach for on
        client work, with what each one is good at.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Salesforce xLAM-2 (1B, 3B, 8B, 70B)</strong>:
          the family that made the tiny-model case for
          function calling. Trained on APIGen-MT, a
          multi-turn synthetic pipeline. Strong at
          multi-turn tool use, ships GGUF quants, and has
          a purpose-built vLLM tool-call parser. Good
          default when the workload is agent-shaped and
          license permits (cc-by-nc for the smaller
          variants).
        </li>
        <li>
          <strong>NVIDIA Nemotron Nano 9B v2</strong>: hybrid
          Mamba-Transformer with 128k context and native
          reasoning-on / reasoning-off modes. Free tier on
          OpenRouter, hosted on NIM, deployable on-prem.
          The reasoning-off mode is the sweet spot for
          latency-sensitive nodes; reasoning-on is where
          you push the harder classifications.
        </li>
        <li>
          <strong>Microsoft Phi-4-mini (3.8B)</strong>: the
          laptop and edge default. Ships with function
          calling, grouped-query attention, 200k
          vocabulary for multilingual work, and integrates
          cleanly into Ollama for local dev loops. The one
          we point at when a customer needs an air-gapped
          agent on a workstation.
        </li>
        <li>
          <strong>Qwen3 (0.6B up, plus Qwen3-30B-A3B MoE)</strong>:
          strong hybrid thinking modes and a first-party{" "}
          <code>qwen-agent</code> library that speaks MCP
          out of the box. The MoE variant activates 3B
          parameters at a time from a 30B pool, which is
          the same shape as Nemotron 3 Nano and a good
          fit for high-throughput serving.
        </li>
        <li>
          <strong>Hammer (0.5B, 1.5B, 7B)</strong> and{" "}
          <strong>MiniCPM3-4B-FC</strong>: two of the smaller
          open-weights function-calling models that show
          up on BFCL. Useful when the workload is a
          narrow classifier or router and you want the
          smallest thing that will fit.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The important thing about this list is not the
        exact ranking. It shifts by the month. The
        important thing is that there are now enough
        credible SLMs, trained specifically for agent
        work, that you can shop for the right one instead
        of using the same model for every node.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Serving SLMs in production: vLLM, SGLang, Ollama
      </h2>
      <p className="mb-6 leading-relaxed">
        Once you have picked models, the next choice is
        the serving layer. There is no single right
        answer, but there is a clean way to think about
        it.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>vLLM</strong>: the default for anything
          that has to scale across concurrent users on
          your own GPUs. Ships an OpenAI-compatible
          server, tool-call parsers for xLAM, Qwen3,
          Hermes, Nemotron, and a solid throughput story
          with PagedAttention and prefix caching. Pick
          this for internal APIs, batch inference, and
          any workload where you already own the GPUs.
        </li>
        <li>
          <strong>SGLang</strong>: the throughput and
          latency leader on modern GPU stacks. Roughly 2x
          the throughput of Ollama and lower TTFT in
          published 2026 comparisons, with structured
          output support built in. Pick this when the SLM
          is a hot node in a high-QPS agent and you can
          afford the extra ops effort.
        </li>
        <li>
          <strong>Ollama</strong>: the easiest thing to
          run on a developer&rsquo;s laptop or a small
          Mac. GGUF-first, one-line install, and every
          small model on Hugging Face has an Ollama tag
          within days. Pick this for local dev, edge
          deployments on a mini-PC, and single-user
          desktop agents.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        A concrete xLAM-2 deployment on vLLM looks like
        this. The critical flags are the tool-call parser
        plugin and <code>--enable-auto-tool-choice</code>,
        both of which are what let the model return
        OpenAI-shaped tool calls the rest of your stack
        can consume without any glue code.
      </p>
      <CodeBlock
        language="bash"
        filename="serve/xlam.sh"
        code={`# Serve Salesforce xLAM-2-3B-fc-r on a single 24GB GPU.
MODEL_NAME_OR_PATH="Salesforce/xLAM-2-3b-fc-r"
ASSIGNED_MODEL_NAME="xlam-2-3b-fc-r"

vllm serve $MODEL_NAME_OR_PATH \\
  --tensor-parallel-size 1 \\
  --served-model-name $ASSIGNED_MODEL_NAME \\
  --port 8000 \\
  --gpu-memory-utilization 0.9 \\
  --enable-auto-tool-choice \\
  --tool-parser-plugin ./xlam_tool_call_parser.py \\
  --tool-call-parser xlam \\
  --enable-prefix-caching \\
  --max-model-len 32768`}
      />
      <p className="mb-6 leading-relaxed">
        On the client side, any OpenAI-compatible SDK
        works. The point of the SLM is that the code that
        calls it looks identical to the code that calls
        GPT-5 or Claude. That is what makes the
        heterogeneous swap-in cheap.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/router.py"
        code={`import openai

# Local SLM served by vLLM on the box next to the app.
client = openai.OpenAI(
    base_url="http://slm-router.internal:8000/v1",
    api_key="empty",
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a location.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                    },
                },
                "required": ["location"],
            },
        },
    }
]

messages = [
    {"role": "system", "content": "You route weather questions to tools."},
    {"role": "user", "content": "What is the weather in Belgrade?"},
]

response = client.chat.completions.create(
    model="xlam-2-3b-fc-r",
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

print(response.choices[0].message.tool_calls)`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Fine-tuning and distillation: how you close the
        last gap
      </h2>
      <p className="mb-6 leading-relaxed">
        The off-the-shelf SLM is usually a starting point,
        not the finished thing. Where it makes economic
        sense, teams distil from a frontier teacher into
        the SLM they will actually deploy, then fine-tune
        on the real production traffic they have logged.
        Two phases, in order.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Phase 1, distillation.</strong> Run the
        frontier teacher over a large synthetic dataset
        that covers the input distribution you expect,
        and train the student to match its outputs. This
        is where the model learns the shape of correct
        behaviour: which tool to call, what arguments to
        pass, how to format the answer. In practice this
        is supervised fine-tuning on teacher-generated
        traces, sometimes with a KL term against the
        teacher&rsquo;s soft logits when you have access
        to them.
      </p>
      <CodeBlock
        language="python"
        filename="training/distill.py"
        code={`import torch.nn.functional as F


def distillation_loss(
    student_logits,
    teacher_logits,
    labels,
    temperature: float = 2.0,
    alpha: float = 0.5,
):
    """Combined KD and supervised loss for an SLM student."""

    soft_teacher = F.softmax(teacher_logits / temperature, dim=-1)
    soft_student = F.log_softmax(student_logits / temperature, dim=-1)

    kd_loss = F.kl_div(
        soft_student, soft_teacher, reduction="batchmean"
    ) * (temperature ** 2)

    supervised_loss = F.cross_entropy(student_logits, labels)

    return alpha * kd_loss + (1 - alpha) * supervised_loss`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Phase 2, fine-tuning on production
        traces.</strong> Once distillation has given the
        student the general shape, fine-tune on the
        actual traffic you have logged. This sharpens
        the SLM on the distribution it will see and
        corrects any teacher artefacts that leaked in
        during phase 1. LoRA adapters are almost always
        the right choice here: they train quickly, keep
        the base model shareable across tasks, and swap
        in and out at serve time.
      </p>
      <p className="mb-6 leading-relaxed">
        The workflow is not new. Red Hat, AT&amp;T, and
        several teams at GTC 2025 described the same
        two-phase pattern: distil first for coverage,
        fine-tune on production traces for precision.
        The reason it works with SLMs is that the base
        models are now good enough to make the fine-tune
        cheap, and the target task is narrow enough that
        the SLM can actually match the teacher on the
        slice that matters.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases we have shipped or seen ship
      </h2>
      <p className="mb-6 leading-relaxed">
        Four workloads where an SLM has cleanly replaced
        a frontier model on production work in the last
        year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Support ticket triage and routing.</strong>{" "}
          A 3B SLM classifies the incoming message,
          extracts the entities, and picks one of about
          fifty routing tools. The frontier LLM is only
          invoked when the router returns low confidence,
          which turns out to be about 8% of tickets. Cost
          per ticket dropped by roughly an order of
          magnitude with no measurable change in
          mis-routing rate.
        </li>
        <li>
          <strong>Structured extraction from documents.</strong>{" "}
          Pulling a fixed set of fields from invoices,
          contracts, or forms. Phi-4-mini or xLAM-2-3B
          with a strict JSON schema hits the same
          extraction accuracy as GPT-4.1 on the fields
          that matter, at about 1/20th of the cost and
          well under a second of latency.
        </li>
        <li>
          <strong>Voice-agent turn handling.</strong>{" "}
          The tight latency budget on real-time voice
          makes SLMs a natural fit for the intra-turn
          steps (intent detection, tool selection,
          short summarisation) while the outer voice
          model stays a frontier LLM. Nemotron Nano 9B
          v2 in reasoning-off mode has been the pick
          here more than once because it hits low TTFT
          and still calls tools cleanly.
        </li>
        <li>
          <strong>Coding-agent subroutines.</strong> A
          coding agent has a plan step and dozens of
          formatting, lint-fixing, test-running, and
          shell-command steps. The plan step wants a
          frontier reasoner. The rest of it does not.
          Teams that split the coding agent this way
          report 3x to 5x lower spend on the same
          workload.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, limitations, and when not to reach
        for an SLM
      </h2>
      <p className="mb-6 leading-relaxed">
        The strengths are the ones you would expect from
        the pillars in the NVIDIA paper. SLMs are 10x to
        30x cheaper per token in the hosted case, and
        essentially free at the marginal call when
        served on your own hardware. They are fast: TTFT
        in the low hundreds of milliseconds on modest
        GPUs, throughput in the thousands of tokens per
        second on SGLang or vLLM with prefix caching.
        They are deployable: you can put a 3B model on a
        Jetson, a laptop, a workstation, or a customer&rsquo;s
        VPC. And they are governable: the whole model is
        yours, you can inspect it, evaluate it, retrain
        it, and version it.
      </p>
      <p className="mb-6 leading-relaxed">
        The limitations are equally clear. An SLM will
        struggle on open-ended reasoning, on tasks that
        need broad world knowledge, and on multi-turn
        recovery when the conversation goes off-script.
        It will hallucinate tool calls it has not been
        trained on unless you constrain the output. It
        will drift when the input distribution changes and
        your production data shifts away from the fine-tune
        set. And the ops story is heavier than a hosted
        API: you have to run a serving layer, version
        checkpoints, and watch GPU utilisation.
      </p>
      <p className="mb-6 leading-relaxed">
        The honest rules we apply on client work.{" "}
        <strong>Use an SLM when</strong> the task is
        narrow and repetitive, the input distribution is
        stable, the output shape is constrained (JSON,
        tool call, short label), latency is tight,
        privacy matters, or the volume is high enough
        that per-token cost is the bottleneck.{" "}
        <strong>Do not use an SLM when</strong> the task
        needs long-horizon planning, when the input is
        open-ended chat, when the workload is low volume
        (the frontier API is cheaper than the
        engineering time to serve an SLM), or when the
        agent will be exposed to adversarial inputs the
        SLM has not been trained against.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through the rest of
        2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Three things are compounding right now that will
        keep pushing the pattern forward. First, the SLMs
        keep getting better on the specific things
        agents do. Nemotron 3 Nano&rsquo;s MoE pattern -
        30B parameters on disk, 3B active at inference -
        is the shape most of the interesting open-weights
        releases are converging on. It gives you the
        parameter count for coverage and the active-count
        efficiency for serving.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, the serving layer is closing the gap with
        hosted APIs on both throughput and features.
        SGLang and vLLM now support prefix caching,
        speculative decoding, structured outputs, and
        first-class tool-call parsers for most SLMs. The
        practical result is that a well-tuned vLLM
        deployment can serve a 3B SLM at latency and
        throughput that beat anything you would get from
        a hosted mini API, at a fraction of the cost.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, evaluation is catching up. BFCL v4&rsquo;s
        multi-turn and agentic categories, and the
        broader{" "}
        <a
          href="/articles/agent-evaluation-observability-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          agent evaluation and observability
        </a>{" "}
        stack, mean you can actually measure whether
        your SLM swap-in is holding up in production
        rather than guessing from anecdotes. That is the
        piece that unlocks the migration algorithm from
        the NVIDIA paper: you can only replace calls with
        confidence if you can measure the impact.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA argument, stripped down, is that
        production agents are mostly a lot of small,
        repetitive language errands with a few genuinely
        hard reasoning steps. It is wasteful to send the
        errands to a frontier model, and it is risky to
        send the hard steps to an SLM. So do both. Keep
        the frontier LLM at the top for planning and
        recovery. Push everything else - tool calls,
        extraction, classification, routing,
        summarisation - to specialised SLMs that you
        serve yourself.
      </p>
      <p className="mb-6 leading-relaxed">
        The model families to make this work exist in
        mid-2026. xLAM-2 for multi-turn function calling.
        Nemotron Nano 9B v2 for hybrid reasoning at low
        latency. Phi-4-mini for the edge. Qwen3 for open
        agent tooling. The serving stack (vLLM, SGLang,
        Ollama) has matured enough that the ops cost is
        real but manageable. The fine-tune and distil
        loop closes whatever quality gap is left. The
        Berkeley leaderboard is the shared yardstick that
        keeps everyone honest.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements we default to the heterogeneous
        pattern from day one. Start with a frontier model
        everywhere for the two-week prototype, log every
        call, cluster them by function, and swap in an
        SLM on the first cluster where the swap is
        obviously safe. Measure, keep going. Most agents
        end up with a frontier model on maybe 10 to 20%
        of the calls, and 3B to 9B SLMs on the rest. The
        cost curve, the latency curve, and the privacy
        story all bend in the same direction, and the
        eval numbers hold. That is the state of the
        argument in mid-2026: not a hypothesis anymore,
        just how you build.
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
            Belcak et al., Small Language Models are the
            Future of Agentic AI (arXiv, June 2025)
          </a>
          {" "}- the NVIDIA Research position paper with
          the three pillars, the LLM-to-SLM conversion
          algorithm, and the case for heterogeneous
          systems.
        </li>
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research: SLM Agents lab page
          </a>
          {" "}- the companion site with practical
          recommendations, correspondence, and the
          canonical BibTeX entry.
        </li>
        <li>
          <a
            href="https://arize.com/blog/nvidias-small-language-models-are-the-future-of-agentic-ai-paper/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arize: Peter Belcak on why SLMs are the future
            of agentic AI (September 2025)
          </a>
          {" "}- a readable summary of the paper&rsquo;s
          argument, plus the follow-up Q&amp;A with the
          author on what counts as small and where the
          pattern fits.
        </li>
        <li>
          <a
            href="https://gorilla.cs.berkeley.edu/leaderboard.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Berkeley Function Calling Leaderboard (BFCL v4)
          </a>
          {" "}- the current standard for evaluating
          tool-calling and multi-turn agentic behaviour,
          with results for xLAM-2, Nemotron, Phi, Qwen,
          Hammer, and the hosted frontier models.
        </li>
        <li>
          <a
            href="https://www.salesforce.com/blog/xlam-large-action-models-v2/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Salesforce: xLAM enters its next era (April
            2025)
          </a>
          {" "}- the launch write-up for xLAM-2, the
          APIGen-MT multi-turn training pipeline, and the
          serve-with-vLLM instructions the deployment
          example above is based on.
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
          {" "}- the training data disclosure (Glaive,
          Salesforce APIGen), hybrid Mamba-Transformer
          architecture, and 128k context window details.
        </li>
        <li>
          <a
            href="https://azure.microsoft.com/en-us/products/phi"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft: Phi open model family
          </a>
          {" "}- the Phi-4-mini and Phi-4-multimodal
          product page with the built-in function calling,
          200k vocabulary, and grouped-query attention
          details.
        </li>
        <li>
          <a
            href="https://qwenlm.github.io/blog/qwen3/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qwen: Qwen3 - Think Deeper, Act Faster
          </a>
          {" "}- the launch post for Qwen3 with the hybrid
          thinking modes, the <code>qwen-agent</code>{" "}
          library, and the MCP integration example the
          Alibaba team ships.
        </li>
        <li>
          <a
            href="https://leetllm.com/blog/llm-inference-engine-comparison-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetLLM: vLLM vs SGLang vs TensorRT-LLM vs
            Ollama (2026)
          </a>
          {" "}- the current comparison of local inference
          engines with throughput, TTFT, and VRAM numbers
          that back the &ldquo;pick vLLM, SGLang, or
          Ollama by use case&rdquo; rule above.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the orchestrator-worker
          split that the heterogeneous SLM pattern sits
          on top of.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on prompt compression,
          brief passing between agents, and why small
          models benefit even more from disciplined
          context.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story you need to
          run the SLM migration algorithm in production
          with confidence.
        </li>
      </ul>
    </div>
  );
}
