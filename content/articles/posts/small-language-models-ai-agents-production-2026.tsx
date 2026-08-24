import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-models-ai-agents-production-2026",
  title:
    "Small language models for AI agents in production 2026: the heterogeneous stack that cuts cost 10 to 30 times",
  excerpt:
    "Why NVIDIA's June 2025 position paper on small language models for agentic AI has become the default architecture for production agents in 2026. Covers what counts as an SLM (Phi-4, Gemma 3 and 4, Llama 3.2, Qwen 3, Nemotron Nano, Ministral 3), the heterogeneous LLM plus SLM pattern, the Berkeley Function Calling Leaderboard sweet spot, the LLM-to-SLM conversion algorithm, tool-calling code with Ollama and vLLM, and how LinkedIn, DoorDash, Cosine, and Prudential ship SLM-powered agents at scale.",
  metaDescription:
    "A practical, technical guide to small language models for AI agents in 2026. Covers the NVIDIA position paper, the 3 to 10 billion parameter sweet spot, the heterogeneous agent architecture, the Berkeley Function Calling Leaderboard, the six-step LLM-to-SLM conversion algorithm, Phi-4-mini, Gemma 3 and 4, Llama 3.2, Qwen 3, Nemotron 3 Nano, Ministral 3, deployment on Ollama, vLLM, SGLang, LiteLLM routing, and production case studies from LinkedIn Hiring Assistant, DoorDash SafeChat, Cosine coding agents, and Prudential financial advisors.",
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
    "Llama",
    "Qwen",
    "Nemotron",
    "NVIDIA",
    "Production",
    "Ollama",
    "vLLM",
  ],
  publishDate: "2026-08-24",
  readingTime: "18 min read",
};

export default function SmallLanguageModelsAiAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In June 2025 a team at NVIDIA Research
        published a short position paper with a
        provocative title: &ldquo;Small Language
        Models are the Future of Agentic AI&rdquo;.
        The claim was simple. Agents do not need a
        frontier chat model for most of the work
        they do. They need to route an input,
        extract a field, pick a tool, format a call,
        summarize a result. All of that fits inside
        a model of three to ten billion parameters
        that costs ten to thirty times less to run
        than a frontier LLM. A year later that
        argument is the default architecture for
        production agents. This post is what a
        small language model actually is in 2026,
        which ones we ship on client work, the
        heterogeneous pattern that pairs them with
        a frontier LLM, and the boundary conditions
        where a small model quietly fails and you
        have to escalate.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the SLM argument landed when it did
      </h2>
      <p className="mb-6 leading-relaxed">
        The economics of agentic AI shifted between
        2024 and 2026. In the first wave of agent
        products the language model was the whole
        product, and teams routed every step of a
        loop, every tool call, every summarizer,
        every extractor, into a frontier chat
        completion. The bill for a modestly popular
        agent could reach six figures per month
        before the product had any users to speak
        of. Anthropic&rsquo;s June 2025 write-up of
        Claude Research put the token cost of a
        multi-agent research run at fifteen times a
        plain chat exchange. LangChain published
        the same number for its Open Deep Research
        implementation. If every agent step spent
        frontier tokens, agents were not going to
        get out of the pilot phase.
      </p>
      <p className="mb-6 leading-relaxed">
        The other half of the shift was on the
        model side. Between the December 2024
        release of Microsoft&rsquo;s Phi-4 and the
        April 2026 Gemma 4 launch, small models
        crossed a capability threshold that made
        them credible for the mechanical parts of
        an agent loop. Phi-4 at fourteen billion
        parameters hit 84.8 percent on MMLU and
        beat GPT-4o on the MATH benchmark. Gemma 3
        at four billion parameters shipped genuine
        vision support and a 128k context window.
        Qwen 3 added a switchable thinking mode and
        Apache 2.0 licensing at every size from
        0.6B to 8B. NVIDIA&rsquo;s Nemotron 3 Nano
        posted 53.8 on Berkeley Function Calling
        Leaderboard v4 at four billion parameters
        active, beating Qwen 3 30B and matching
        older frontier models on tool use.
      </p>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper did not invent the
        pattern. It named the shift and put a
        number on it. The authors argue three
        things: small models are already powerful
        enough for most agent tasks, they are
        architecturally better suited to the
        repetitive nature of an agent loop, and
        they are ten to thirty times cheaper to run
        per invocation. Combine the three and the
        default agent architecture stops being a
        monolithic frontier LLM and starts being a
        fleet of specialized small models with a
        larger model reserved for the hard decision
        points.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What counts as small in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        There is no formal definition of a small
        language model. The working definition
        that has settled in the last year is a
        model with three to ten billion parameters
        that fits on a single consumer GPU when
        quantized to four bits, runs on a laptop
        or on-device with acceptable latency, and
        can be fine-tuned on a workstation. Peter
        Belcak, the lead author of the NVIDIA
        paper, uses sub-10B as the working ceiling.
        Local AI Master and Turing Post both
        include everything from one billion up to
        around fifteen billion parameters in their
        2026 SLM roundups. The bottom of the range
        starts around 0.5B, small enough for a
        mobile device but too small for reliable
        tool calling.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2026 lineup breaks into three tiers
        that map cleanly onto agent roles. The
        edge tier at one to three billion
        parameters covers routing, classification,
        and short extraction, and runs on a
        Raspberry Pi or a phone. The workhorse
        tier at three to five billion parameters
        is the tool-calling sweet spot per the
        Berkeley Function Calling Leaderboard, and
        runs on a four gigabyte GPU or a modern
        laptop. The reasoning tier at seven to
        fifteen billion parameters handles
        summarization, structured reasoning,
        multi-turn tool loops, and short planning,
        and runs on a single consumer twelve to
        sixteen gigabyte GPU.
      </p>
      <CodeBlock
        language="bash"
        filename="Small language model tiers for agent roles in 2026"
        code={`+------------------------------------------------------------------+
|  Edge tier  (1-3B params, ~1-2 GB Q4 VRAM)                       |
|                                                                  |
|   Roles:   input routing, PII redaction, classification,         |
|            short extraction, autocomplete, cache lookup           |
|   Models:  Llama 3.2 1B, Qwen 3 0.6B, Gemma 3 1B, Phi-3-mini     |
|   Runs on: Raspberry Pi 5, iPhone A17, Jetson Nano, laptop CPU   |
+------------------------------------------------------------------+
|  Workhorse tier  (3-5B params, ~2-3 GB Q4 VRAM)                  |
|                                                                  |
|   Roles:   tool calling, function selection, structured output,  |
|            single-hop reasoning, RAG re-ranking, JSON mode        |
|   Models:  Phi-4-mini 3.8B, Nemotron 3 Nano 4B, Ministral 3B,    |
|            Llama 3.2 3B, Qwen 3 4B, Gemma 3 4B                    |
|   Runs on: 4 GB GPU, Jetson Orin Nano, M-series MacBook           |
+------------------------------------------------------------------+
|  Reasoning tier  (7-15B params, ~5-10 GB Q4 VRAM)                |
|                                                                  |
|   Roles:   summarization, multi-turn tool loops, planning,       |
|            code generation, structured reasoning, RAG synthesis   |
|   Models:  Phi-4 14B, Qwen 3 8B, Llama 3.1 8B, Gemma 3 12B,      |
|            Ministral 3 14B, Mistral Small 22B                     |
|   Runs on: RTX 4090, RTX 5080, M2 Pro, single A10G                |
+------------------------------------------------------------------+
|  Above (20B+)                                                    |
|                                                                  |
|   Falls out of SLM range. Reach for hosted frontier models or    |
|   a large open-weight model like Llama 3.3 70B or Qwen 3 32B.    |
+------------------------------------------------------------------+`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous architecture that
        replaced the monolithic agent
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern that emerged in 2025 and became
        the default in 2026 is a heterogeneous
        agent. A frontier LLM sits at the top and
        owns the hard decisions: initial planning,
        ambiguous user input, multi-turn reasoning
        that spans a full task, and the last-mile
        synthesis of a report. Below it, a fleet
        of small models handle the specialized,
        repetitive parts of each step. A three
        billion parameter router picks the tool. A
        four billion parameter model formats the
        arguments and calls it. A one billion
        parameter model classifies the result. A
        seven billion parameter model writes the
        section. The frontier LLM only re-enters
        when the small models produce a result the
        orchestrator flags as uncertain.
      </p>
      <p className="mb-6 leading-relaxed">
        This shape is what the NVIDIA paper calls a
        heterogeneous agentic system. It is also
        the pattern LinkedIn describes for its
        Hiring Assistant, the one DoorDash
        describes for SafeChat, and the one
        Prudential ships to its hundred thousand
        financial advisors. The frontier LLM
        handles maybe five to ten percent of the
        calls, the small models handle the other
        ninety, and the total bill drops by an
        order of magnitude without the user seeing
        a difference in quality.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous agent, frontier LLM plus SLM fleet"
        code={`  +-------------------+
  |    User input      |
  +---------+---------+
            |
            v
  +-------------------+       +---------------------+
  |   SLM router      |------>| SLM PII redactor    |
  |   (1B-3B, Ollama) |       |  (Llama 3.2 1B)     |
  +---------+---------+       +---------------------+
            |
            v
  +-------------------+
  |  Frontier LLM     |
  |  (planner)        |
  |  Opus / GPT-5 /   |
  |  Gemini Pro       |
  +---------+---------+
            |
            v
     +------+------+
     |  Plan steps |
     +------+------+
            |
     +------+------+------+------+
     |             |             |
     v             v             v
+---------+  +---------+  +---------+
| SLM     |  | SLM     |  | SLM     |
| tool    |  | tool    |  | tool    |
| caller  |  | caller  |  | caller  |
| (Phi-4  |  | (Nemo-  |  | (Qwen 3 |
|  mini)  |  |  tron   |  |  4B)    |
|         |  |  Nano)  |  |         |
+----+----+  +----+----+  +----+----+
     |            |            |
     v            v            v
   Tool A      Tool B      Tool C
     |            |            |
     +------+-----+------+-----+
            |
            v
  +---------------------+
  |  SLM summarizer     |
  |  (Phi-4 14B or      |
  |   Gemma 3 12B)      |
  +---------+-----------+
            |
            v
  +---------------------+       +---------------------+
  |  Uncertainty flag   |------>|  Escalate to        |
  |  (from orchestrator)|  yes  |  frontier LLM       |
  +---------+-----------+       +----------+----------+
            | no                           |
            v                              v
        Final answer                  Final answer`}
      />
      <p className="mb-6 leading-relaxed">
        The frontier LLM stays in the loop as a
        supervisor and a fallback. It sees the
        user input at the start, sets the plan,
        and either signs off on the final answer
        or is re-invoked on the calls where the
        small model was not sure. In production
        this is what actually happens with services
        like Amazon Rufus, which routes across a
        custom in-house model, Amazon Nova, and
        Claude Sonnet depending on the query
        shape, and Brex, which runs its own LLM
        gateway to route between fast small models
        and Claude for the calls that need it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 model lineup, by vendor
      </h2>
      <p className="mb-6 leading-relaxed">
        There is no single winner in the SLM
        category. The picks below are the models
        we actually reach for on client work,
        grouped by vendor.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Microsoft: Phi-4 and Phi-4-mini
      </h3>
      <p className="mb-6 leading-relaxed">
        Phi-4 shipped in December 2024 at fourteen
        billion parameters. It was the first small
        model that beat GPT-4o on the MATH
        benchmark (80.4 vs 74.6 percent) and
        landed within two points of GPT-4o on
        MMLU. Phi-4-mini followed at 3.8B and hit
        67.3 percent on MMLU, which is where
        Llama 3.1 8B sat a year earlier. Phi-4-
        multimodal added vision and audio, and
        Phi-4-reasoning-vision-15B, released in
        March 2026, is the pick for agents that
        need to interpret screenshots, chart
        images, or document layouts on a single
        GPU. Both are open weights under a
        Microsoft Research license (Phi-4) or MIT
        (Phi-4-mini), and both run on Ollama with
        a single pull command.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Google: Gemma 3 and Gemma 4
      </h3>
      <p className="mb-6 leading-relaxed">
        Gemma 3 landed in 2025 with the four
        billion parameter version as the standout,
        the first sub-5B model with genuine vision
        capability, a 128k context window, and
        distillation from Gemini Ultra. Gemma 3
        12B and 27B extended the family, with the
        27B version reaching GPT-4o-mini quality.
        Gemma 4 shipped in April 2026 in effective
        two and four billion parameter versions
        (E2B and E4B) with native function calling,
        plus a 12B dense model and a 26B mixture
        of experts. The four billion effective
        model is the pick for edge tool calling
        because the function calling schema is
        baked in and the memory footprint stays
        under three gigabytes.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Meta: Llama 3.2 and Llama 3.3
      </h3>
      <p className="mb-6 leading-relaxed">
        Meta&rsquo;s Llama 3.2 1B is the smallest
        model we ship, and it is the workhorse for
        input routing and PII redaction. Llama 3.2
        3B is the best tool caller at the 3B size
        per BFCL v2 (67 percent) and stays inside
        two gigabytes at Q4. The 8B model in the
        Llama 3.1 lineage is still the most-used
        open model on Hugging Face and remains a
        solid default for the reasoning tier when
        Phi-4 or Qwen 3 do not fit the license
        model. Llama 3.3 70B sits above the SLM
        line and shows up as the hosted fallback
        model in a lot of the heterogeneous
        stacks.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Alibaba: Qwen 3 and Qwen 3.5
      </h3>
      <p className="mb-6 leading-relaxed">
        Qwen 3 shipped in 2025 with a lineup that
        ran from 0.6B to 235B and introduced a
        switchable thinking mode that lets the
        model spend more tokens on reasoning when
        the task needs it. The small models (0.6B,
        1.7B, 4B, 8B) are Apache 2.0 and are the
        most permissive licensed models in the
        SLM lineup. Qwen 3.5, released in spring
        2026, added multimodal small models: Qwen
        3.5 4B and 9B both accept text and image
        input with a 256k context window. Qwen
        3-Coder at the 7B size is the pick for
        specialized coding agents, matching
        HumanEval numbers that were closed to
        proprietary APIs a year earlier.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        NVIDIA: Nemotron 3 Nano
      </h3>
      <p className="mb-6 leading-relaxed">
        Nemotron 3 Nano is the model that best
        matches the argument in the NVIDIA paper.
        The 30B-A3B version is a mixture of
        experts with three billion active
        parameters per token, and it posts 53.8 on
        Berkeley Function Calling Leaderboard v4,
        which is one of the highest scores in its
        class and above Qwen 3 30B thinking. The
        smaller Nemotron Nano 4B is a pruned,
        distilled dense model trained with a
        reinforcement learning pipeline aimed
        specifically at tool calling, with a
        128k context and one of the lowest VRAM
        footprints for a model with real
        multi-turn tool skill. Both are open
        weights under the NVIDIA Open Model
        License and ship with an SGLang cookbook
        for fast multi-agent inference.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Mistral: Ministral 3 and Mistral Small
      </h3>
      <p className="mb-6 leading-relaxed">
        Ministral 3 ships in 3B, 8B, and 14B
        versions with a 256k context window and
        native image support, under Apache 2.0.
        The 3B version is a strong pick for
        edge agents in the EU because the license
        is permissive and Mistral is EU-based,
        which matters for data sovereignty. Mistral
        Small at 22B is above the SLM line but is
        the pick when a team wants a single hosted
        endpoint that covers reasoning, tool
        calling, and structured output with strong
        JSON mode support and Apache 2.0
        licensing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Berkeley Function Calling Leaderboard,
        and where the sweet spot is
      </h2>
      <p className="mb-6 leading-relaxed">
        Tool calling is where the small model
        argument either holds or falls apart. If a
        model cannot pick the right function,
        format the arguments, and hand them back
        in a shape the runtime can execute, then
        the rest of the agent loop cannot run. The
        Berkeley Function Calling Leaderboard,
        maintained by the Berkeley Gorilla team,
        is the canonical benchmark. It tests
        single-turn tool selection, multi-turn
        tool loops, parallel function calls, and
        nested calls, across Python and REST
        function schemas.
      </p>
      <p className="mb-6 leading-relaxed">
        The public leaderboard as of mid-2026
        tells a clear story. The one to three
        billion parameter range is the sweet spot
        for reliable single-turn tool calling on
        edge devices. Nemotron Nano 4B, Phi-4-mini,
        Qwen 3 4B, and Llama 3.2 3B all sit in the
        top thirty positions on the single-turn
        subset. Above the SLM line, seven to
        twenty billion parameter models with
        fine-tuning match or beat proprietary
        frontier models: the open ToolACE-8B has
        overtaken GPT-4 and Claude 3.5 on overall
        BFCL accuracy.
      </p>
      <p className="mb-6 leading-relaxed">
        The floor is where the honest picture
        matters. Models below one billion
        parameters fail reliably on the harder
        shapes, multi-turn, parallel-function,
        and nested calls. If your agent loops
        across more than one tool call before
        producing a result, a sub-1B model is a
        trap. Use those for extraction,
        classification, and routing, and step up
        to at least the 3B tier for the actual
        tool loop. The practical implication is a
        routing decision, not a single model
        choice. Map each kind of agentic step to
        the lane it belongs in.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Running an SLM tool caller: Ollama and
        vLLM
      </h2>
      <p className="mb-6 leading-relaxed">
        Two runtimes dominate SLM deployment in
        2026. Ollama is the pick for local and
        edge inference: a single binary, a
        familiar pull command, an OpenAI-compatible
        HTTP endpoint on localhost. vLLM is the
        pick for production serving at scale:
        higher throughput, KV cache reuse, prefix
        caching, tensor parallelism, and a
        semantic router project that speaks the
        same OpenAI schema. For most client work
        we prototype on Ollama and move the same
        model to vLLM without touching the client
        code.
      </p>
      <CodeBlock
        language="bash"
        filename="Pull the SLM workhorse tier with Ollama"
        code={`# Install Ollama (one line, Linux and macOS)
curl -fsSL https://ollama.com/install.sh | sh

# Pull the tool-calling workhorse tier
ollama pull phi4-mini           # Microsoft Phi-4-mini 3.8B, ~2.2 GB
ollama pull nemotron-nano:4b    # NVIDIA Nemotron 3 Nano 4B, ~3 GB
ollama pull qwen3:4b            # Alibaba Qwen 3 4B, ~2.6 GB
ollama pull llama3.2:3b         # Meta Llama 3.2 3B, ~2.2 GB
ollama pull gemma3:4b           # Google Gemma 3 4B (vision), ~3 GB

# The reasoning tier for summarization and multi-turn work
ollama pull phi4                # Microsoft Phi-4 14B, ~9 GB
ollama pull qwen3:8b            # Alibaba Qwen 3 8B, ~5 GB

# The edge tier for routing and classification
ollama pull llama3.2:1b         # Meta Llama 3.2 1B, ~1.3 GB
ollama pull qwen3:0.6b          # Alibaba Qwen 3 0.6B, ~500 MB

# Serve on localhost:11434 (default port)
ollama serve`}
      />
      <p className="mb-6 leading-relaxed">
        With Ollama running, any OpenAI-compatible
        client can call the model with a base URL
        of <code>http://localhost:11434/v1</code>.
        Tool calling works the same way it does
        against the OpenAI Chat Completions API,
        with the same <code>tools</code> array and
        the same <code>tool_calls</code> in the
        response. The example below is a small
        weather tool for a Phi-4-mini agent, using
        the official OpenAI Python client.
      </p>
      <CodeBlock
        language="python"
        filename="Tool-calling agent with Phi-4-mini on Ollama"
        code={`from openai import OpenAI
import json

# Point the OpenAI client at the local Ollama endpoint
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # any string works, Ollama does not check
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Return the current temperature for a city.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"},
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                    },
                },
                "required": ["city"],
            },
        },
    }
]

def get_weather(city: str, unit: str = "celsius") -> str:
    # Real code would call a weather API here.
    temp = {"celsius": 22, "fahrenheit": 72}[unit]
    return f"{temp} degrees {unit} in {city}."

messages = [
    {"role": "user", "content": "What is the weather in Belgrade?"},
]

response = client.chat.completions.create(
    model="phi4-mini",
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

tool_calls = response.choices[0].message.tool_calls or []
for call in tool_calls:
    args = json.loads(call.function.arguments)
    result = get_weather(**args)
    messages.append(response.choices[0].message)
    messages.append(
        {
            "role": "tool",
            "tool_call_id": call.id,
            "content": result,
        }
    )

# Second turn: model produces the user-facing answer
final = client.chat.completions.create(
    model="phi4-mini",
    messages=messages,
)
print(final.choices[0].message.content)`}
      />
      <p className="mb-6 leading-relaxed">
        The same code, with a different base URL,
        runs against vLLM or SGLang. vLLM adds
        prefix caching that pays off when many
        agent steps share the same system prompt
        and tool schema, which is common in
        production. On a single A10G, vLLM serving
        Phi-4-mini reaches roughly 300 tokens per
        second with a batch of eight concurrent
        requests, which is enough throughput for
        a couple hundred agent steps per second.
        For heavier workloads, SGLang adds
        structured output and grammar-constrained
        decoding, which are the pieces that turn a
        good tool caller into a strict tool
        caller.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Routing between an SLM fleet and a frontier
        LLM
      </h2>
      <p className="mb-6 leading-relaxed">
        Once you have both an SLM fleet and a
        frontier LLM available, the interesting
        question is how to route between them. The
        simplest pattern is a static rule: send
        anything under a token budget or matching
        a specific intent to the SLM, everything
        else to the frontier LLM. That is enough
        for many products. The next step up is a
        semantic router: a small classifier that
        looks at the input, decides which lane it
        belongs in, and dispatches. LiteLLM and
        the vLLM Semantic Router are the two
        production tools we reach for.
      </p>
      <CodeBlock
        language="python"
        filename="Cost-aware router with LiteLLM"
        code={`from litellm import Router

# One entry per model in the fleet. Ollama and OpenAI live side by side.
model_list = [
    {
        "model_name": "cheap-tool",
        "litellm_params": {
            "model": "ollama/phi4-mini",
            "api_base": "http://localhost:11434",
        },
    },
    {
        "model_name": "cheap-router",
        "litellm_params": {
            "model": "ollama/llama3.2:1b",
            "api_base": "http://localhost:11434",
        },
    },
    {
        "model_name": "smart-planner",
        "litellm_params": {
            "model": "gpt-5",
            "api_key": "sk-...",
        },
    },
]

router = Router(
    model_list=model_list,
    routing_strategy="cost-based-routing",
    fallbacks=[
        {"cheap-tool": ["smart-planner"]},  # escalate on failure
    ],
)

def route_step(step_kind: str, messages: list) -> str:
    # A three-line rule that keeps 90% of calls off the frontier LLM
    if step_kind == "route" or step_kind == "classify":
        target = "cheap-router"
    elif step_kind == "tool_call" or step_kind == "extract":
        target = "cheap-tool"
    else:  # plan, synthesize, decide
        target = "smart-planner"

    return router.completion(
        model=target,
        messages=messages,
    ).choices[0].message.content`}
      />
      <p className="mb-6 leading-relaxed">
        LiteLLM adds guardrails, cost tracking, and
        automatic fallback in a couple of lines,
        which is why it is the default gateway in
        many of the case studies below. For teams
        that want the routing decision itself to
        be learned, the vLLM Semantic Router project
        ships an mmBERT classifier that dispatches
        within a fifty millisecond budget at an
        800 megabyte GPU footprint. The Router-R1
        and xRouter projects go further and train
        the router itself with reinforcement
        learning, using a composite reward that
        includes format correctness, task outcome,
        and cost, so the router learns the cost-
        quality trade-off from actual sessions.
        These are early but promising: the
        HierRouter paper reports up to 2.4 times
        better response quality at minimal added
        cost compared to a single-model baseline.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The six-step LLM-to-SLM conversion pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper closes with a practical
        algorithm for converting an existing
        LLM-only agent into a heterogeneous one.
        The steps are simple and the payoff is
        real. On our client work we have run this
        pipeline on three separate agent products
        in 2026 and each time the frontier LLM
        share of calls dropped from 100 percent to
        somewhere between five and fifteen percent
        without any degradation in the end-to-end
        eval scores.
      </p>
      <CodeBlock
        language="bash"
        filename="Six steps to convert an LLM agent into an SLM-first agent"
        code={`Step 1: Capture
  Log every LLM invocation the current agent makes for two weeks.
  Record the system prompt, user turn, tool schema, and the
  model's raw output. Tag each call with the step kind (route,
  extract, tool_call, plan, synthesize).

Step 2: Cluster
  Group the calls by step kind and, within each kind, by input
  shape. Most agents show a long-tail distribution: three or
  four call shapes account for 80% of the volume.

Step 3: Pick candidates
  For each high-volume step kind, pick two or three SLMs from
  the tier that fits its role. Tool calls: 3-5B tier. Extractions:
  1-3B tier. Summaries: 7-15B tier.

Step 4: Baseline
  Run every SLM candidate against the captured calls without
  fine-tuning. Score against the frontier LLM's output using an
  LLM-as-judge or a task-specific metric. Many step kinds pass
  the bar off the shelf.

Step 5: Fine-tune the stragglers
  For the step kinds where no SLM matches the LLM baseline,
  fine-tune the best candidate on the captured (input, output)
  pairs. LoRA on a workstation is enough for most cases; the
  full fine-tune of a 3-8B model takes a few hours on a single
  A100.

Step 6: Deploy and monitor
  Ship the SLM fleet behind a router. Send 5-10% of traffic
  to the frontier LLM as a shadow to keep eval numbers honest.
  Escalate on uncertainty signals (low logprob, tool call parse
  failure, downstream error).`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production stacks in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Four teams have written up how SLMs sit
        inside their agent stacks, and each shows
        a different variation of the heterogeneous
        pattern.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        LinkedIn Hiring Assistant
      </h3>
      <p className="mb-6 leading-relaxed">
        LinkedIn ships Hiring Assistant, a
        multi-agent recruiting system with a
        supervisor and four specialized agents. The
        engineering write-up describes complexity-
        based request routing that steers each
        step to the smallest model that can handle
        it, and a separate speculative decoding
        pass that uses an SLM to draft tokens that
        a larger model then verifies. The
        speculative decoding change gave them a
        four times throughput improvement and a 66
        percent P90 latency reduction on the
        long-output structured generation path,
        with no quality regression. The scale
        matters: the agent produces thousand-token
        structured JSON outputs from large inputs,
        and the SLM drafter is the reason the
        latency budget holds.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        DoorDash SafeChat
      </h3>
      <p className="mb-6 leading-relaxed">
        SafeChat is DoorDash&rsquo;s content
        moderation platform for real-time
        moderation of millions of daily messages,
        images, and voice calls between users. The
        published architecture pairs an efficient
        internal small model with a precise
        external LLM. The internal model handles
        99.8 percent of content in-lane, and only
        0.2 percent gets routed to the more
        expensive LLM. The result was a 50 percent
        reduction in low and medium severity
        safety incidents alongside the cost curve
        that let them scale to platform volume.
        This is the SLM-first pattern in its
        purest form.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Cosine coding agents
      </h3>
      <p className="mb-6 leading-relaxed">
        Cosine deploys coding agents into
        regulated enterprise environments where
        the customer cannot ship code to a hosted
        frontier API. They built a multi-agent
        architecture with specialized orchestrator
        and worker models, and used a mix of
        distillation, supervised fine-tuning,
        preference optimization, and reinforcement
        fine-tuning to push small models to
        production quality. The multi-LoRA
        approach lets them serve many specialized
        agents from one base model to keep the
        GPU footprint low. Their published numbers
        are a 31 percent performance increase on
        SWE-bench Freelancer, a three times
        latency improvement, a 60 percent GPU
        footprint reduction, and 20 percent fewer
        errors compared to their previous
        frontier-LLM baseline. This is what
        happens when the LLM-to-SLM conversion
        pipeline is taken all the way to fine-
        tuned specialists.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Prudential financial advisor platform
      </h3>
      <p className="mb-6 leading-relaxed">
        Prudential built a microservices-based
        multi-agent platform for 100,000 financial
        advisors, replacing calls into dozens of
        disparate IT systems. The orchestration
        agent dynamically routes natural language
        queries to specialized sub-agents (Quick
        Quote, Forms, Product) while maintaining
        context and enforcing governance. The
        architecture uses an A2A and MCP-based
        protocol between agents and a centralized
        LLM gateway that routes across model
        sizes. The reported improvement was a cut
        from six to eight weeks down to three to
        four weeks for time-to-value on new AI
        solutions, largely because small models
        are cheap enough to try in production
        without a lengthy budget approval for
        each.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where small models still break
      </h2>
      <p className="mb-6 leading-relaxed">
        The SLM story is real but it is not
        uniformly good news. There are places
        where a small model quietly fails and the
        only fix is to escalate.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Multi-turn tool loops with
          nested calls.</strong> The BFCL v4
          numbers are blunt: below the 3B tier,
          multi-turn accuracy collapses. If your
          agent has to call tool A, use the
          result to shape the input to tool B,
          and then combine both results, a 1B
          model will misroute somewhere in the
          chain. Ship at 3B or above for the
          loop, or split the loop and let the
          frontier LLM plan the sequence.
        </li>
        <li>
          <strong>Novel or ambiguous user
          input.</strong> Small models are trained
          on distributions similar to the
          benchmarks. Anything outside that
          distribution, novel phrasing, unusual
          intent, or a domain the model has never
          seen, will produce confident nonsense.
          The mitigation is an uncertainty check
          in the router (low logprob, high
          entropy on the next-token distribution,
          disagreement across two SLMs) and an
          escalation path to a larger model.
        </li>
        <li>
          <strong>Long-context synthesis over
          heterogeneous sources.</strong> Gemma 3
          and Phi-4 ship with 128k context
          windows but the retrieval-and-synthesize
          pattern common in Deep Research still
          benefits from a frontier LLM for the
          last stage. Anthropic&rsquo;s Claude
          Research write-up is explicit on this:
          multi-agent works for the research
          phase, single-agent (with a large
          model) works better for the writing
          phase.
        </li>
        <li>
          <strong>Safety-critical outputs.</strong>{" "}
          For medical, legal, or financial
          domains where a wrong answer is
          expensive, the cost saving from an SLM
          is not worth the risk. Keep the SLM in
          the fleet for the mechanical work
          (extraction, structured output,
          formatting), and reserve the frontier
          LLM for anything the user will act on.
        </li>
        <li>
          <strong>Prompt injection through tool
          output.</strong> Small models are more
          susceptible to prompt injection than
          larger ones because their instruction
          tuning is weaker. If your agent reads
          untrusted text (a web page, a user-
          submitted document, an email), keep the
          SLM behind a guardrail model that
          filters the input, or use the
          Guardrails AI, NeMo Guardrails, or
          LiteLLM tool permission guardrail on
          the outbound tool call.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages of the SLM-first stack
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Cost drops 10 to 30 times per
          invocation.</strong> This is the number
          NVIDIA puts on the shift, and the
          Amazon Rufus, Brex, and Digits case
          studies show it in the wild. A single
          agent step on Phi-4-mini running on
          your own hardware is a fraction of a
          cent, versus a few cents on a frontier
          hosted API.
        </li>
        <li>
          <strong>Latency drops 3 to 10 times
          for the mechanical steps.</strong> A
          small model on a warm GPU responds in
          tens of milliseconds. A frontier hosted
          API is at best a few hundred
          milliseconds. Across a ten-step agent
          loop, that difference compounds.
        </li>
        <li>
          <strong>Data stays in your
          environment.</strong> On-device or
          on-prem deployment means user input,
          tool output, and intermediate
          reasoning never leaves your network.
          For regulated industries this is often
          the decision factor, not the cost.
        </li>
        <li>
          <strong>Fine-tuning is
          approachable.</strong> A LoRA on a 3-8B
          model runs on a workstation in an
          afternoon. The barrier to a fine-tuned
          specialist collapses, which is what
          made Cosine&rsquo;s multi-LoRA
          architecture possible.
        </li>
        <li>
          <strong>Vendor risk drops.</strong> When
          the model runs on your infrastructure,
          the API you depend on is the OpenAI
          schema, not any single vendor.
          Switching from Phi-4-mini to Qwen 3 to
          Nemotron Nano is a config change.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trade-offs and honest limitations
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Operational complexity
          increases.</strong> A monolithic
          frontier LLM is one hosted endpoint. A
          heterogeneous SLM stack is a fleet of
          models, a router, an escalation
          policy, a fine-tune pipeline, and a
          monitoring stack. If the team is
          three people, the operational cost
          may outweigh the token savings.
        </li>
        <li>
          <strong>Quality ceiling is
          lower.</strong> A 3B model will not
          match a frontier LLM on genuine
          reasoning, on out-of-distribution
          input, or on synthesis over long
          heterogeneous context. The
          heterogeneous pattern accepts this and
          escalates when needed, but a pure
          SLM stack would fail on the tasks the
          escalation is meant to catch.
        </li>
        <li>
          <strong>Fine-tuning drift.</strong> A
          fine-tuned specialist that beats the
          frontier LLM today can drift as the
          underlying distribution shifts. Shadow
          traffic to a frontier LLM and periodic
          re-fine-tuning are the mitigations,
          both of which add cost.
        </li>
        <li>
          <strong>Licensing is not
          uniform.</strong> Apache 2.0 (Qwen,
          Mistral) is safe. MIT (Phi-4-mini) is
          safe. Llama 3.x and Gemma have
          bespoke licenses with acceptable-use
          rules and, for Llama, a monthly active
          user threshold. Nemotron uses the
          NVIDIA Open Model License. Read them
          before shipping to production.
        </li>
        <li>
          <strong>Uncertainty detection is
          research-grade.</strong> Deciding when
          to escalate is still an open question.
          Logprob thresholds, self-consistency
          checks, and small-model disagreement
          all work but each has failure modes.
          Expect to iterate on the escalation
          rule for a few sprints before it
          stabilizes.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What to watch through late 2026 and 2027
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>RL-trained routers.</strong>{" "}
          Router-R1, xRouter, HierRouter, and
          EvoRoute are all early in production
          but each shows that a router trained
          on real trajectories beats hand-crafted
          rules. Expect this to become a standard
          layer in the agent stack the way vector
          search became a standard layer in RAG.
        </li>
        <li>
          <strong>On-device agents on phones and
          laptops.</strong> Apple Intelligence,
          Gemini Nano, and the effective sub-3B
          Gemma 4 E2B run agents on-device with
          no cloud call. The next wave of
          consumer products will run their agent
          loop locally and only reach for the
          cloud on escalation.
        </li>
        <li>
          <strong>Distillation pipelines for
          specialists.</strong> The LLM-to-SLM
          conversion algorithm in the NVIDIA
          paper is manual today. Expect the
          managed cloud vendors to ship pipelines
          that capture, cluster, distill, and
          deploy specialist SLMs from a running
          agent&rsquo;s traffic.
        </li>
        <li>
          <strong>Speculative decoding as
          default.</strong> LinkedIn&rsquo;s 4x
          throughput result with vLLM
          speculative decoding is going to become
          the default serving path. The SLM as
          drafter, the larger model as verifier,
          gives the quality of the larger model
          at the latency of the smaller one.
        </li>
        <li>
          <strong>Mixture of experts at small
          scale.</strong> Nemotron 3 Nano 30B-A3B,
          Gemma 4 26B MoE, and Qwen 3 30B MoE
          all use the same trick: a large total
          parameter count with a small active
          parameter count per token. MoE at the
          SLM size gives frontier quality at
          workhorse latency on a single GPU. This
          is where the frontier line gets
          redrawn.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion and recommendations
      </h2>
      <p className="mb-6 leading-relaxed">
        Small language models have crossed the
        threshold where they are the right default
        for most of the work an agent does. The
        cost math is not close. The capability gap
        on the mechanical steps is not
        meaningful. The remaining question is not
        whether to use SLMs, but where to draw the
        line between the SLM fleet and the
        frontier LLM that supervises it.
      </p>
      <p className="mb-6 leading-relaxed">
        Start with a heterogeneous stack. Route
        input classification and PII redaction to
        a 1B model. Route tool calls, structured
        output, and short extractions to a 3-5B
        model. Route summarization and single-hop
        reasoning to a 7-15B model. Keep the
        frontier LLM for the initial plan, the
        genuinely hard turns, and the escalation
        path. Ship LiteLLM or the vLLM Semantic
        Router in front of the fleet from day one
        so the routing decision is a config
        change, not a code change.
      </p>
      <p className="mb-6 leading-relaxed">
        Do not ship below 1B for anything that
        loops. Do not skip the shadow traffic to a
        frontier LLM: the eval numbers only stay
        honest when a small share of calls goes to
        the strong model and the router sees the
        gap. Do not fine-tune before you have
        baselined the off-the-shelf SLM against
        your traffic. The NVIDIA paper is right
        that most calls do not need a frontier
        model. The rest of the work is in
        building the operational muscle to run
        the fleet.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources and further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://arxiv.org/abs/2506.02153"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Belcak et al., Small Language Models
            are the Future of Agentic AI (arXiv
            2506.02153, June 2025)
          </a>
          {" "}- the NVIDIA Research position
          paper with the three-pillar argument,
          the LLM-to-SLM conversion algorithm,
          and the cost analysis behind the 10 to
          30 times number.
        </li>
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research: Small Language
            Models are the Future of Agentic AI
            (lab page)
          </a>
          {" "}- the project page for the paper
          with the working definitions, the
          heterogeneous agent diagram, and the
          recommendation summary.
        </li>
        <li>
          <a
            href="https://arize.com/blog/nvidias-small-language-models-are-the-future-of-agentic-ai-paper/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arize AI: Peter Belcak on why SLMs
            are the future of agentic AI
            (September 2025)
          </a>
          {" "}- the paper reading with the
          author, including the sub-10B working
          definition, the 10 to 30 times cost
          argument, and the practical questions
          about tool calling.
        </li>
        <li>
          <a
            href="https://gorilla.cs.berkeley.edu/leaderboard.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Berkeley Function Calling Leaderboard
            (BFCL) v4
          </a>
          {" "}- the canonical tool-calling
          benchmark maintained by the Berkeley
          Gorilla team, with per-model scores on
          single-turn, multi-turn, parallel, and
          nested function calls.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/inside-nvidia-nemotron-3-techniques-tools-and-data-that-make-it-efficient-and-accurate/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA: Inside Nemotron 3, techniques,
            tools, and data
          </a>
          {" "}- the engineering write-up on
          Nemotron 3 Nano, the 30B-A3B mixture
          of experts, the RL-trained tool
          calling, and the SGLang cookbook for
          multi-agent inference.
        </li>
        <li>
          <a
            href="https://www.turingpost.com/p/slmslist"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Turing Post: 10 Small Language Models
            to Know in 2026 (July 2026)
          </a>
          {" "}- the current model roundup with
          the Gemma 4, Ministral 3, Nemotron 3
          Nano, Phi-4, Qwen 3, and SmolLM3
          lineups, plus modalities and licensing.
        </li>
        <li>
          <a
            href="https://localaimaster.com/blog/small-language-models-guide-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Local AI Master: Best Small Language
            Models 2026
          </a>
          {" "}- benchmark table with MMLU, VRAM,
          and pull commands for Phi-4, Phi-4-mini,
          Llama 3.2, Gemma 3, Gemma 4, and Qwen
          3.5, useful as a shipping shortlist.
        </li>
        <li>
          <a
            href="https://www.digitalapplied.com/blog/small-language-models-on-device-agents-2026-guide"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Applied: Small Language Models
            for On-Device Agents in 2026
          </a>
          {" "}- the on-device deployment guide
          with the BFCL sweet-spot analysis, the
          Nemotron Nano 4B footprint, and the
          &ldquo;do not ship below 1B for
          loops&rdquo; rule.
        </li>
        <li>
          <a
            href="https://www.zenml.io/blog/llmops-in-production-another-419-case-studies-of-what-actually-works"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ZenML: LLMOps in Production, 419 case
            studies
          </a>
          {" "}- the source for the LinkedIn
          Hiring Assistant, DoorDash SafeChat,
          Cosine coding agent, and Prudential
          multi-agent platform write-ups
          referenced in the case studies section.
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
          {" "}- the pull commands and quantization
          options for every model in the shipping
          shortlist above, with the OpenAI-
          compatible endpoint documented at
          <code> localhost:11434/v1</code>.
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
          {" "}- the production serving stack for
          the same models, with prefix caching,
          tensor parallelism, and the semantic
          router project.
        </li>
        <li>
          <a
            href="https://docs.litellm.ai/docs/routing"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LiteLLM: Router documentation
          </a>
          {" "}- the cost-based routing, fallback,
          and guardrail hooks used in the router
          example above.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the
          orchestrator-worker patterns that
          heterogeneous SLM stacks inherit.
        </li>
        <li>
          <a
            href="/articles/llm-gateways-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LLM gateways in production 2026
          </a>
          {" "}- the gateway layer that fronts the
          SLM fleet in most of the case studies.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in
            2026
          </a>
          {" "}- the eval and tracing story you
          need to keep an SLM-first stack honest
          against a frontier baseline.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in
            2026
          </a>
          {" "}- the deeper read on why short,
          well-shaped context is exactly what a
          small model needs to punch above its
          weight.
        </li>
      </ul>
    </div>
  );
}
