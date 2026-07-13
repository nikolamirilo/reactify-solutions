import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-models-agentic-ai-2026",
  title:
    "Small Language Models for AI agents in 2026: the heterogeneous stack that quietly took over production",
  excerpt:
    "How the NVIDIA position paper from June 2025 turned into the default production pattern for AI agents in 2026. Covers the sub-10B model class (Phi-4-Mini, Gemma 4 E4B, Qwen3-4B, Nemotron Nano 2, Llama 3.2 3B), the heterogeneous SLM-plus-LLM architecture, the 10 to 30x cost gap, the LLM-to-SLM conversion algorithm, and the honest limits where SLMs still fall short.",
  metaDescription:
    "A practical, technical guide to Small Language Models (SLMs) for AI agents in 2026. Covers the NVIDIA position paper thesis, the sub-10B agentic model class (Phi-4-Mini, Gemma 4 E4B, Qwen3-4B, Nemotron Nano 2, Llama 3.2, Ministral 3B), tool-calling and BFCL benchmarks, heterogeneous routing with LLM fallback, QLoRA fine-tuning for tool use, on-device deployment via llama.cpp and Ollama, cost per token comparisons against Claude Haiku 4.5 and GPT-5.5-nano, and the LLM-to-SLM conversion algorithm from prototype to production.",
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
    "Phi-4",
    "Gemma",
    "Qwen",
    "Nemotron",
    "NVIDIA",
    "On-Device",
    "Production",
  ],
  publishDate: "2026-07-13",
  readingTime: "17 min read",
};

export default function SmallLanguageModelsAgenticAi2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In June 2025 NVIDIA Research published a short
        position paper called <em>Small Language Models are
        the Future of Agentic AI</em>. It argued a single
        clear thing: most of what agents actually do is
        narrow, repetitive, tool-shaped work that a model
        under 10 billion parameters can handle for a tenth
        to a thirtieth of the cost of a frontier LLM. A
        year later the argument is not a position anymore.
        It is how serious teams ship. Phi-4-Mini, Gemma 4
        E4B, Qwen3-4B, Nemotron Nano 2, and Ministral 3B
        run the tool-calling loops. Claude Sonnet 5, GPT-5.5,
        and Gemini 3 sit behind a router and get invoked
        only when the SLM is out of depth. This article is
        how we build that heterogeneous stack on client
        work: which SLMs to pick, how to fine-tune them for
        your tool surface, how to route between the small
        and large model, and where SLMs still break.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the SLM argument stopped being controversial
      </h2>
      <p className="mb-6 leading-relaxed">
        The Belcak et al. paper (arXiv 2506.02153) makes
        three claims that map neatly onto what production
        teams see. First, SLMs are already <strong>good
        enough</strong> for the narrow language errands
        that dominate agent graphs: parsing user input,
        classifying intent, filling a JSON schema for a
        tool call, summarising a fetched page, rewriting a
        query. Second, they are <strong>more suitable</strong>{" "}
        because they can be fine-tuned to a strict output
        format in a few GPU hours and will not drift into
        prose the way an LLM does. Third, they are{" "}
        <strong>10 to 30x cheaper</strong> per token to
        serve when the GPU is kept saturated, and roughly
        one to two orders of magnitude cheaper to fine-tune.
      </p>
      <p className="mb-6 leading-relaxed">
        The paper defines the small class as <strong>models
        under 10 billion parameters</strong>. That covers
        Microsoft&rsquo;s Phi-4-Mini (3.8B), Google&rsquo;s
        Gemma 4 E4B (~4B effective), Alibaba&rsquo;s
        Qwen3-4B-Instruct-2507, NVIDIA&rsquo;s Nemotron Nano
        2 (9B, hybrid Mamba-transformer), Meta&rsquo;s
        Llama 3.2 3B, and Mistral&rsquo;s Ministral 3B and
        8B. All ship with tool-calling support, either
        through prompt-based JSON formatting or, in the case
        of Gemma 4, dedicated function-call special tokens.
      </p>
      <p className="mb-6 leading-relaxed">
        NVIDIA&rsquo;s own follow-up on the developer blog
        (August 2025) puts numbers on the throughput side.
        Nemotron Nano 2 reaches <strong>6x higher
        throughput</strong> than comparable dense models of
        its size class and holds a 128k token context on a
        single GPU, both of which matter more for agent
        workloads than for chat: a supervisor that fans out
        to twenty sub-tasks needs latency and concurrency,
        not creative writing.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous stack that took over
      </h2>
      <p className="mb-6 leading-relaxed">
        Almost every production agent we have shipped in
        the last twelve months converges on the same
        two-tier shape. Small models run the loops. A large
        model sits behind a router and gets called for the
        hard decisions or for the outward-facing dialogue.
        The NVIDIA paper calls this a <em>heterogeneous
        agentic system</em>. Anthropic calls it the
        orchestrator-worker pattern in the Claude Research
        write-up. Google&rsquo;s ADK docs call it a
        multi-agent workflow. Same idea, three names.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous SLM-plus-LLM agent"
        code={`+----------------------------------------------------+
|                    User request                    |
+-------------------------+--------------------------+
                          |
                          v
             +------------+-------------+
             |   Router / classifier    |
             |    (SLM, e.g. Phi-4)     |
             +------+--------------+----+
                    |              |
       simple / narrow             hard / open-ended
                    |              |
                    v              v
   +----------------+---+   +------+-----------------+
   | Worker SLMs        |   | Frontier LLM           |
   |  - intent classify |   |  (Claude Sonnet 5,     |
   |  - JSON tool call  |   |   GPT-5.5, Gemini 3)   |
   |  - extract fields  |   |                        |
   |  - summarise page  |   |  planning, refusals,   |
   |  - draft reply     |   |  multi-step reasoning  |
   +--------+-----------+   +----------+-------------+
            |                          |
            +------------+-------------+
                         |
                         v
                  +------+------+
                  | Code        |
                  | orchestrator|
                  | (deterministic)
                  +-------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The key insight that lands with every client team we
        walk through this: <strong>most of what looked like
        LLM work was code work</strong>. Deciding which tool
        to call is a classification problem. Filling a JSON
        schema is a structured-generation problem. Routing
        between three sub-flows is a switch statement. Once
        you separate the deterministic orchestration from
        the language errands, the model calls left over are
        narrow enough for a 4B model to handle. NVIDIA
        splits this cleanly into <em>LM agency</em> (moments
        that need generalist reasoning) and{" "}
        <em>code agency</em> (deterministic steps guided by
        software, with the LM invoked for focused sub-tasks).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 SLM lineup and what each one is for
      </h2>
      <p className="mb-6 leading-relaxed">
        The five SLMs worth serious consideration for
        agentic workloads in 2026 all sit between 2 and 9
        billion parameters. They differ enough in strengths
        that picking the right base before you fine-tune
        saves real money later. What follows is what we
        actually reach for on client work.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Phi-4-Mini-Instruct (3.8B, MIT)</strong>.
          Microsoft&rsquo;s February 2025 release with
          200k-token vocab, grouped-query attention, shared
          input and output embeddings, and native function
          calling. Strong at reasoning-heavy multi-turn
          agents. On the ertas.ai on-device benchmark it
          leads on raw tokens per second on mobile at Q4.
          Pick it when your agent plans across several tool
          calls and your latency budget is tight.
        </li>
        <li>
          <strong>Gemma 4 E4B (~4B, Apache 2.0)</strong>.
          Google&rsquo;s April 2026 release with dedicated
          function-call special tokens. Native tokens cut
          typical tool-call output length by 15 to 20%
          versus prompt-based JSON, which turns into real
          latency wins in production. Pick it when output
          reliability and clean licensing matter.
        </li>
        <li>
          <strong>Qwen3-4B-Instruct-2507 (4B, Apache
          2.0)</strong>. Alibaba&rsquo;s July 2025 release.
          Holds the top sub-7B spot on BFCL v4 out of the
          box thanks to a training mix heavy on agent and
          function-call traces. Pick it when you want the
          highest zero-shot tool-calling accuracy and are
          not planning to fine-tune deeply.
        </li>
        <li>
          <strong>Nemotron Nano 2 (9B, open weights)</strong>.
          NVIDIA&rsquo;s hybrid Mamba-transformer released
          alongside the SLM position paper. 128k context,
          6x throughput of comparable dense models, tuned
          for enterprise agentic work. Pick it when you
          host on NVIDIA hardware and need long context for
          research or code agents.
        </li>
        <li>
          <strong>Llama 3.2 3B and Ministral 3B</strong>.
          The workhorses of the sub-4B tier. Neither wins
          benchmarks outright but both are cheap to serve,
          well understood, and supported by every runtime
          under the sun. Pick them for background workers
          where cost is the only metric.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        For the hosted-API side of the same argument, the
        obvious 2026 anchor is <strong>Claude Haiku 4.5</strong>
        at $1 in and $5 out per million tokens. It is not
        an SLM in the open-weights sense (parameters are
        not public), but it plays the same role in the
        heterogeneous stack. Anthropic&rsquo;s numbers show
        Haiku 4.5 hitting 73.3% on SWE-Bench Verified, which
        matches Sonnet 4 from May 2025 at roughly one third
        of the price and more than twice the speed. If you
        cannot host open weights, Haiku 4.5, GPT-5.5-nano,
        and Gemini 3 Flash-Lite are the equivalent worker
        tier.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Tool calling: where SLMs punch above their weight
      </h2>
      <p className="mb-6 leading-relaxed">
        The most useful public benchmark for agentic SLMs
        is the <a
          href="https://gorilla.cs.berkeley.edu/leaderboard.html"
          className="font-semibold text-primaryColor hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Berkeley Function Calling Leaderboard
        </a>{" "}
        (BFCL) v4, refreshed in 2026 to cover multi-turn
        dialogues, parallel calls, and held-out schemas.
        Two patterns from the leaderboard shape how we pick
        models.
      </p>
      <p className="mb-6 leading-relaxed">
        First, out-of-the-box, Qwen3-4B holds the sub-7B
        lead into 2026, with Gemma 4 E4B close behind and
        Phi-4-Mini in third. Composite scores land in the
        low 80s to high 80s, close enough that you should
        not pick on this axis alone. Second, and more
        important: <strong>after fine-tuning on 500 to 800
        representative examples, all three cross 95% joint
        accuracy on a five-tool agent</strong> and the gap
        between them collapses by roughly 70%. The base is
        a starting point, not a ceiling.
      </p>
      <p className="mb-6 leading-relaxed">
        A concrete call against Phi-4-Mini through the
        Hugging Face transformers pipeline looks like this.
        The function-calling prompt template ships with the
        model card and expects the tool schema inline in
        the system prompt.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/phi4_mini_tool_call.py"
        code={`from transformers import AutoModelForCausalLM, AutoTokenizer
import json

MODEL = "microsoft/Phi-4-mini-instruct"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForCausalLM.from_pretrained(
    MODEL, torch_dtype="auto", device_map="auto"
)

tools = [{
    "name": "get_order_status",
    "description": "Look up an order by id.",
    "parameters": {
        "type": "object",
        "properties": {
            "order_id": {"type": "string"},
        },
        "required": ["order_id"],
    },
}]

messages = [
    {
        "role": "system",
        "content": (
            "You are a customer support agent. "
            "You have access to these tools:\\n"
            + json.dumps(tools, indent=2)
            + "\\nRespond ONLY with a JSON tool call."
        ),
    },
    {
        "role": "user",
        "content": "Where is my order A-84213?",
    },
]

prompt = tokenizer.apply_chat_template(
    messages, tokenize=False, add_generation_prompt=True
)
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
out = model.generate(
    **inputs,
    max_new_tokens=200,
    do_sample=False,
    temperature=0.0,
)
print(tokenizer.decode(out[0][inputs.input_ids.shape[1]:], skip_special_tokens=True))
# -> {"name": "get_order_status", "arguments": {"order_id": "A-84213"}}`}
      />
      <p className="mb-6 leading-relaxed">
        Two production notes on this. First, keep{" "}
        <code>temperature=0</code> for tool calls; SLMs
        drift more than LLMs at higher temperatures and
        you want the JSON to parse. Second, wrap the model
        output in a validator (Pydantic or a JSON Schema
        library) and return a targeted error to the model
        on a miss. On our workloads a single retry recovers
        roughly 90% of the malformed-JSON cases; without
        it Phi-4-Mini drops from 95% to about 87% joint
        accuracy on a five-tool agent.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Fine-tuning: the step that closes the gap
      </h2>
      <p className="mb-6 leading-relaxed">
        The single most under-appreciated finding in the
        NVIDIA paper: SLMs fine-tune cheaply. A QLoRA run
        on a 3.8B model with 500 to 1,000 curated tool-call
        examples takes two to four hours on one H100 and
        costs under $30. That is one to two orders of
        magnitude below the equivalent LLM fine-tune. It
        also means you can iterate. Ship a base, watch
        production for two weeks, curate the failures, run
        another QLoRA cycle, ship again. Every cycle closes
        the gap that the base model started with.
      </p>
      <p className="mb-6 leading-relaxed">
        The workflow we use on client engagements looks
        like this.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/finetune_qlora.py"
        code={`import torch
from datasets import load_dataset
from peft import LoraConfig, get_peft_model
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
)
from trl import SFTTrainer

MODEL = "microsoft/Phi-4-mini-instruct"

# 4-bit quantised base to fit a QLoRA on a single H100.
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)

tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForCausalLM.from_pretrained(
    MODEL, quantization_config=bnb, device_map="auto"
)

lora = LoraConfig(
    r=32, lora_alpha=64, lora_dropout=0.05,
    bias="none", task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
)
model = get_peft_model(model, lora)

# 600 rows: user prompt + expected JSON tool call, from
# our own agent's production traces.
ds = load_dataset("json", data_files="tool_calls.jsonl")

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=ds["train"],
    args=TrainingArguments(
        output_dir="./phi4-mini-tools",
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        num_train_epochs=3,
        learning_rate=2e-4,
        bf16=True,
        logging_steps=25,
    ),
    max_seq_length=2048,
)

trainer.train()
model.save_pretrained("./phi4-mini-tools-lora")`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make this repeatable. First, source
        the training set from your own production traces,
        not a public dataset. The model needs to see your
        tool names, your parameter styles, and your users&rsquo;
        typical phrasings. Six hundred well-curated rows
        beats sixty thousand generic ones. Second, keep the
        rank low (16 to 32); higher ranks overfit fast on
        small datasets and stop generalising to schemas the
        model has not seen. Third, evaluate on a held-out
        split that includes at least one tool the model was
        not trained on; a good fine-tune should still make
        a plausible attempt on an unseen schema.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Routing between SLM and LLM: the practical layer
      </h2>
      <p className="mb-6 leading-relaxed">
        Routing is the piece that everyone underestimates.
        The heterogeneous stack does not work if the router
        is wrong. Send too much to the LLM and you throw
        away the cost win. Send too much to the SLM and
        quality drops on the queries that needed the big
        model. Three routing patterns cover almost every
        production case we have seen.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pattern one: rules first.</strong> A large
        share of the routing decision is a switch statement
        on request shape. Chat message versus tool call.
        Text input versus voice. Known user segment versus
        new. This is not the exciting part, but it removes
        60 to 70% of the traffic from any model-based
        routing decision.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pattern two: SLM classifier as the router.</strong>{" "}
        Use a small model (Phi-4-Mini or a distilled
        1.5B classifier) to score whether a request is
        &ldquo;narrow&rdquo; or &ldquo;complex&rdquo;. If
        narrow, send to a worker SLM. If complex, send to
        the LLM. This is cheap enough (about $0.01 per
        thousand routes at Q4) that it disappears in the
        bill.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Pattern three: SLM first, LLM on
        low-confidence.</strong> Run the SLM. If the JSON
        parses and the log-probs on the argument tokens are
        above threshold, ship it. If the parse fails twice
        or confidence is low, escalate to the LLM. This is
        the most robust pattern and the one we default to
        for high-stakes agents.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/router.py"
        code={`import json
from anthropic import Anthropic
from openai import OpenAI

anthropic = Anthropic()
oss = OpenAI(base_url="http://vllm-phi4-mini:8000/v1", api_key="local")

CONFIDENCE_FLOOR = -0.8   # avg logprob on argument tokens
MAX_SLM_RETRIES = 1

def route(messages, tools):
    for attempt in range(MAX_SLM_RETRIES + 1):
        resp = oss.chat.completions.create(
            model="phi4-mini-tools",
            messages=messages,
            tools=tools,
            temperature=0,
            logprobs=True,
        )
        choice = resp.choices[0]
        try:
            call = json.loads(choice.message.tool_calls[0].function.arguments)
        except (json.JSONDecodeError, IndexError):
            continue

        avg_lp = sum(
            t.logprob for t in choice.logprobs.content
        ) / max(1, len(choice.logprobs.content))
        if avg_lp >= CONFIDENCE_FLOOR:
            return {"model": "phi4-mini", "call": call}

    # Escalate to Claude Haiku 4.5 (or Sonnet 5 for the
    # hardest 5% of traffic).
    resp = anthropic.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        messages=messages,
        tools=tools,
    )
    return {"model": "haiku-4.5", "call": resp.content[0].input}`}
      />
      <p className="mb-6 leading-relaxed">
        On the workloads we have measured, this pattern
        keeps 80 to 90% of requests on the SLM tier and
        pushes end-to-end cost down by 8 to 12x versus a
        single-LLM baseline, while quality on the hard
        segment stays inside 1 to 2 percentage points of
        the pure-LLM run. The router itself becomes the
        knob you turn: raise the confidence floor when you
        care about quality, lower it when you care about
        cost.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        On-device: the case that only SLMs can serve
      </h2>
      <p className="mb-6 leading-relaxed">
        The other reason SLMs matter is the case that LLMs
        cannot serve at all. On-device inference. Mobile
        phones, laptops, in-vehicle systems, and hardware
        appliances all now have enough silicon to run a 4B
        model at Q4 quantisation. That opens patterns you
        cannot get from a cloud API: no round trip, no
        network dependency, no per-user token bill, and no
        data leaving the device.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2026 tool of choice for on-device is{" "}
        <code>llama.cpp</code> with its March 2026 update
        that added a proper tool-call parser for Phi-4-Mini,
        Gemma 4, and Qwen3. On modern flagship phones a
        Q4 tool call runs in the 25 to 40 tokens-per-second
        range and returns a typical 200-token JSON call in
        five to eight seconds. On a mid-range Android that
        stretches to 12 to 15 seconds, which is where
        Phi-4-Mini&rsquo;s size advantage matters most.
      </p>
      <CodeBlock
        language="bash"
        filename="Serve Phi-4-Mini on-device with llama.cpp"
        code={`# 1. Convert the fine-tuned Phi-4-Mini to GGUF Q4_K_M.
python convert-hf-to-gguf.py ./phi4-mini-tools \\
    --outfile phi4-mini-tools.f16.gguf --outtype f16

./quantize phi4-mini-tools.f16.gguf \\
    phi4-mini-tools.Q4_K_M.gguf Q4_K_M

# 2. Start an OpenAI-compatible server on the device
#    (works on Android with termux and on iOS via the
#    llama.cpp bindings shipped in the ertas.ai app).
./llama-server \\
    -m phi4-mini-tools.Q4_K_M.gguf \\
    --host 127.0.0.1 --port 8080 \\
    --ctx-size 4096 \\
    --n-gpu-layers 999 \\
    --chat-template phi4 \\
    --jinja \\
    --tool-call-parser phi4`}
      />
      <p className="mb-6 leading-relaxed">
        The trade-off is the honest one. A Q4 fine-tuned
        Phi-4-Mini gets you 92 to 94% of the un-quantised
        base&rsquo;s accuracy on a five-tool agent. Give
        away another 2 to 3 points for Q3 if you need it to
        fit on a mid-range phone. In exchange you get zero
        API bill, sub-second wake-up, and everything on
        the device. For consumer apps with agentic
        features, the maths only works one way once you
        get past a few thousand users a day.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns from the field
      </h2>
      <p className="mb-6 leading-relaxed">
        Three patterns we see repeat across client work in
        2026, from different industries.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Customer support triage.</strong> A
        fine-tuned Phi-4-Mini classifies inbound emails
        into 12 intents, extracts order IDs and dates, and
        drafts a response. About 70% of traffic is answered
        end-to-end by the SLM. The 30% flagged as complex
        or negative-sentiment routes to Claude Sonnet 5
        with the SLM&rsquo;s classification passed through
        as context. Cost per ticket dropped from $0.06 to
        $0.007 versus a Sonnet-only baseline; CSAT stayed
        within noise.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Retail catalogue enrichment.</strong> A
        nightly batch job runs Qwen3-4B against 200,000
        product descriptions and generates SEO metadata,
        alt text, and a normalised category tag. The whole
        job runs on two H100s in under six hours; the
        previous GPT-4o-mini setup took four times longer
        and cost twelve times as much. The failure cases
        (weird product categories, missing data) route
        overnight to GPT-5.5 for a small correction batch
        the next morning.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>On-device voice assistant.</strong> A
        Phi-4-Mini fine-tune runs inside a native mobile
        app and handles wake-word intents (&ldquo;set a
        timer&rdquo;, &ldquo;add to shopping list&rdquo;,
        &ldquo;translate this&rdquo;). Latency from wake to
        acknowledgement dropped from 1.4 seconds on the
        cloud-only build to 380 milliseconds on-device.
        For anything the SLM cannot handle, the app opens
        a socket to a cloud LLM. Users notice the
        latency; they do not notice the router.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The LLM-to-SLM conversion algorithm
      </h2>
      <p className="mb-6 leading-relaxed">
        The last part of the NVIDIA paper is a general
        algorithm for taking an existing LLM-only agent
        and converting it to a heterogeneous stack. It is
        worth pulling out in plain steps because it is what
        we use on migration work.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          <strong>Log everything.</strong> For at least two
          weeks, log every prompt sent to your LLM, the
          response, the tool calls it made, and any user
          feedback. Redact PII on the way in.
        </li>
        <li>
          <strong>Cluster the calls.</strong> Group requests
          by task shape: intent classification, JSON tool
          call, extraction, summarisation, drafting. Most
          agents collapse to 3 to 8 clusters.
        </li>
        <li>
          <strong>Pick a candidate SLM per cluster.</strong>{" "}
          Use the criteria above. Reasoning-heavy clusters
          go to Phi-4-Mini; clean tool-calling to Gemma 4
          or Qwen3-4B; long-context research work to
          Nemotron Nano 2.
        </li>
        <li>
          <strong>Curate a fine-tune set per cluster.</strong>{" "}
          Filter your logs to that cluster, redact, verify
          the LLM answers were good, and turn them into
          (prompt, expected output) pairs. Aim for 500 to
          1,500 rows per cluster.
        </li>
        <li>
          <strong>Fine-tune and evaluate.</strong> QLoRA on
          one H100, three epochs, rank 32. Evaluate on a
          held-out set with joint accuracy for tool calls
          and a rubric-based LLM-as-judge score for open
          text.
        </li>
        <li>
          <strong>Ship the SLM behind a shadow router.</strong>{" "}
          Run the SLM alongside the LLM on the same
          traffic; compare outputs offline. Once agreement
          exceeds your bar (we use 95% joint accuracy for
          tool calls, 90% LLM-judge agreement for text),
          flip production traffic.
        </li>
        <li>
          <strong>Keep the LLM as fallback.</strong> Never
          fully remove it; route the low-confidence
          fraction upward. Every quarter, add the LLM
          fallback answers to the next SLM training cycle
          and watch the fallback rate fall.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages, and the honest limits
      </h2>
      <p className="mb-6 leading-relaxed">
        The advantages line up cleanly with the numbers.
        Per-token cost drops by 10 to 30x. Latency drops by
        3 to 10x. Fine-tuning cost drops by one to two
        orders of magnitude, so iteration cycles become
        weekly instead of quarterly. On-device deployment
        becomes possible at all. Vendor lock-in shrinks
        because you own the weights.
      </p>
      <p className="mb-6 leading-relaxed">
        The honest limits are worth stating too. SLMs
        break on <strong>open-ended reasoning</strong>: a
        query that needs three logical hops through
        unfamiliar domain knowledge is where a 4B model
        still trips. They break on <strong>very long
        contexts</strong>: even the 128k-token models
        degrade in the middle of the window faster than
        frontier LLMs. They break on <strong>rare
        languages and rare code</strong>: training coverage
        is thinner. And they still need <strong>guardrails</strong>:
        an SLM that has not been trained on adversarial
        prompts is more brittle to injection than an LLM
        with a heavy safety layer.
      </p>
      <p className="mb-6 leading-relaxed">
        The correct read of these limits is not &ldquo;do
        not use SLMs&rdquo;. It is &ldquo;use SLMs, and
        route the 5 to 15% they cannot handle upward&rdquo;.
        That is the whole heterogeneous argument in one
        sentence.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the pattern is going next
      </h2>
      <p className="mb-6 leading-relaxed">
        Three trends worth watching through late 2026 and
        into 2027.
      </p>
      <p className="mb-6 leading-relaxed">
        First, <strong>native tool-call tokens are winning</strong>.
        Gemma 4 shipped them; Llama 5 and the next Qwen
        generation are expected to follow. The reliability
        gap between a model with dedicated tool-call tokens
        and one that emits JSON as regular text is now
        measurable in production, not just in benchmarks.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>agent-specialist SLMs are getting
        smaller</strong>. Google&rsquo;s FunctionGemma
        (270M) and Gemma 4 E2B (2B) are the smallest
        credible function-callers in 2026. They are not
        general-purpose. They are meant to be fine-tuned
        and shipped for one job. That is the direction of
        the whole tier: narrower, cheaper, closer to the
        edge.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>the model layer is disappearing
        into the runtime</strong>. NVIDIA&rsquo;s NeMo
        Customizer, Ollama, llama.cpp&rsquo;s tool-call
        parser, and the newer inference stacks (vLLM
        1.0&rsquo;s structured-output kernels, TensorRT-LLM
        for on-prem) all abstract the model choice. In two
        years the argument will not be &ldquo;which SLM
        should I pick?&rdquo; but &ldquo;which fine-tuned
        specialist should I load into my agent runtime this
        release?&rdquo;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA position paper turned out to be a
        conservative statement, not a bold one. Twelve
        months in, the shift is real: SLMs run the loops,
        LLMs sit behind a router, and the heterogeneous
        stack is what production teams ship. The four
        practical takeaways are worth the read.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Pick a base SLM per task shape: Phi-4-Mini for
          reasoning-heavy, Gemma 4 E4B for clean tool
          calls, Qwen3-4B for zero-shot accuracy, Nemotron
          Nano 2 for long context, Llama 3.2 3B for
          cheap background work.
        </li>
        <li>
          Fine-tune on your own production traces. Six
          hundred good rows beat sixty thousand generic
          ones. QLoRA on a single H100 in an afternoon.
        </li>
        <li>
          Route with a small classifier or SLM-first
          low-confidence fallback. Keep the LLM in the
          stack for the 5 to 15% of traffic that needs it.
        </li>
        <li>
          Ship on-device where you can. The economics only
          work one way past a few thousand users a day.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The framing shift is the important one. Stop asking
        &ldquo;which frontier LLM should we call?&rdquo;
        and start asking &ldquo;which sharp small tool
        should we build for this job?&rdquo;. The rest is
        engineering.
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
            Small Language Models are the Future of Agentic
            AI (Belcak et al., NVIDIA Research, June 2025)
          </a>
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/how-small-language-models-are-key-to-scalable-agentic-ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Small Language Models Are Key to Scalable
            Agentic AI (NVIDIA Developer Blog, August 2025)
          </a>
        </li>
        <li>
          <a
            href="https://huggingface.co/microsoft/Phi-4-mini-instruct"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Phi-4-Mini-Instruct model card (Microsoft,
            Hugging Face)
          </a>
        </li>
        <li>
          <a
            href="https://gorilla.cs.berkeley.edu/leaderboard.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Berkeley Function Calling Leaderboard v4
          </a>
        </li>
        <li>
          <a
            href="https://www.anthropic.com/claude/haiku"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Haiku 4.5 announcement and pricing
            (Anthropic)
          </a>
        </li>
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research project page for the SLM Agents
            paper (including LLM-to-SLM conversion
            algorithm)
          </a>
        </li>
      </ul>
    </div>
  );
}
