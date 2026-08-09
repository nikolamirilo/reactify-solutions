import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "small-language-models-ai-agents-2026",
  title:
    "Small Language Models for AI agents in 2026: the SLM-first stack that replaces most of your LLM calls",
  excerpt:
    "Why 2025-2026 turned into the year small language models started running the boring, high-volume side of AI agents. Covers the NVIDIA position paper, Nemotron Nano 2, Phi-4-mini, Gemma 3 and FunctionGemma, the heterogeneous SLM-plus-LLM router pattern, LoRA and QLoRA fine-tuning for tool calling, the Berkeley Function Calling Leaderboard as the honest eval, and the LLM-to-SLM conversion path we actually run on production agent stacks.",
  metaDescription:
    "A practical, technical guide to Small Language Models (SLMs) in AI agents for 2026. Covers the June 2025 NVIDIA position paper 'Small Language Models are the Future of Agentic AI', Nemotron Nano 2, Phi-4-mini, Gemma 3 with FunctionGemma, Qwen 2.5, the heterogeneous SLM-plus-LLM architecture, LoRA and QLoRA fine-tuning, the LLM-to-SLM conversion algorithm, tool calling with Berkeley Function Calling Leaderboard evals, vLLM and Ollama runtimes, and how to move 40 to 70 percent of agent calls off large models without losing quality.",
  image:
    "https://images.unsplash.com/photo-1782338938837-faa93e82f35f?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "SLM",
    "NVIDIA",
    "Nemotron",
    "Phi-4",
    "Gemma",
    "Fine-tuning",
    "Edge",
    "Production",
  ],
  publishDate: "2026-07-07",
  readingTime: "17 min read",
};

export default function SmallLanguageModelsAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most AI agents in production spend their tokens on
        the same three things: parse a user request, pick a
        tool, format the arguments. None of that needs a
        400B parameter model. In June 2025 NVIDIA Research
        put a paper out saying the quiet part loud: small
        language models are the future of agentic AI. A year
        later the case has stopped being a bet and started
        being a checklist. Nemotron Nano 2 hit 6x throughput
        on a single GPU, Phi-4-mini added function calling
        at 3.8B parameters, Google shipped FunctionGemma at
        270M parameters for phones, and Ollama crossed 52M
        monthly downloads. This article is the SLM-first
        stack we run on client agent work: what changed, why
        the router pattern beats a single big model, how we
        fine-tune SLMs for tool use, and where to keep an
        LLM in the loop.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What counts as a small language model in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The old definition of &ldquo;small&rdquo; drifts
        with hardware. The one we use, and the one the
        NVIDIA paper works with, is practical: a small
        language model is a model that can serve a single
        production request on one modern consumer or
        workstation GPU with room to spare, and can be
        fine-tuned in a few hours on the same class of
        machine. In 2026 that lines up with 270M to about
        14B parameters. Anything above 14B enters the
        &ldquo;needs multi-GPU or aggressive quantisation
        just to serve latency&rdquo; band; anything below
        270M starts losing enough general capability that
        you fine-tune for one task and nothing else.
      </p>
      <p className="mb-6 leading-relaxed">
        The interesting shift is that this band now covers
        real agent work. A 3.8B Phi-4-mini can call tools
        with schemas that would have needed GPT-3.5 two
        years ago. A 9B Nemotron Nano 2 answers reasoning
        prompts at throughput a 70B model cannot match. A
        270M FunctionGemma runs on-device and picks the
        right function 90-plus percent of the time on
        narrow domains. The lower bound of &ldquo;good
        enough for an agent step&rdquo; has fallen faster
        than the upper bound of what frontier models can
        do, and that is the whole story of SLMs in 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline that made this real
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>December 2024</strong>: Microsoft ships
          Phi-4, a 14B model trained on curated and
          synthetic data. First widely quoted
          &ldquo;small&rdquo; model that beats GPT-4-class
          scores on maths reasoning benchmarks.
        </li>
        <li>
          <strong>February 2025</strong>: Microsoft
          releases Phi-4-mini (3.8B) and Phi-4-multimodal
          (5.6B) with the long-awaited function calling
          support. This is the release most agent teams
          point to as &ldquo;the day SLMs stopped being a
          demo.&rdquo;
        </li>
        <li>
          <strong>March 2025</strong>: Google releases
          Gemma 3 (1B, 4B, 12B, 27B). The 4B variant runs
          on a single laptop GPU with 128k context, and
          the model card documents tool calling out of
          the box.
        </li>
        <li>
          <strong>June 2, 2025</strong>: Peter Belcak and
          co-authors at NVIDIA publish{" "}
          <em>Small Language Models are the Future of
          Agentic AI</em> (arXiv 2506.02153). It is a
          position paper, not a benchmark race, and it
          frames the argument the industry runs with for
          the next twelve months.
        </li>
        <li>
          <strong>August 2025</strong>: NVIDIA releases
          Nemotron Nano 2, a 9B hybrid Mamba-Transformer
          with 128k context and 6x throughput over
          comparable transformers on reasoning workloads.
        </li>
        <li>
          <strong>August 29, 2025</strong>: NVIDIA follows
          the paper with a developer blog{" "}
          <em>How Small Language Models Are Key to
          Scalable Agentic AI</em> that turns the position
          into a rollout plan around NeMo Customizer, the
          Data Flywheel Blueprint, and NIM microservices.
        </li>
        <li>
          <strong>January 26, 2026</strong>: Google
          releases FunctionGemma, a specialised fine-tune
          of Gemma 3 270M for on-device function calling,
          with a public training recipe so teams can build
          their own edge tool-callers.
        </li>
        <li>
          <strong>Q1 2026</strong>: Ollama crosses 52M
          monthly downloads (up ~520x on Q1 2025) and
          becomes the default local runtime for SLM
          prototypes. vLLM keeps the enterprise server
          crown, llama.cpp keeps the edge one.
        </li>
        <li>
          <strong>April 2026</strong>: Berkeley Function
          Calling Leaderboard v4 lands with multi-turn,
          multi-step, and agentic evals. It becomes the
          single number we quote to clients when we
          promise an SLM can hold up in an agent loop.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core argument: agents use a narrow slice of an
        LLM
      </h2>
      <p className="mb-6 leading-relaxed">
        The NVIDIA paper leans on one observation that
        matches what every agent team we work with sees in
        their traces. Most of the calls an agent makes to a
        language model are not open-domain conversation.
        They are: read a prompt, decide which tool, emit a
        JSON payload; read a tool result, decide the next
        step, emit another JSON payload; read a search
        result, extract a fact, summarise. That work is
        repetitive, structured, and narrow. A 405B model
        will do it correctly. So will a well fine-tuned 4B
        model. The extra 100x parameters are being paid for
        every request and delivering nothing extra.
      </p>
      <p className="mb-6 leading-relaxed">
        Peter Belcak puts it as a value statement: SLMs are
        <strong> sufficiently powerful</strong>,{" "}
        <strong>inherently more suitable</strong>, and{" "}
        <strong>necessarily more economical</strong> for
        many invocations in agentic systems. Sufficient
        because the benchmarks now show it, suitable because
        SLMs are easier to constrain to a single output
        format (they cannot drift into an alternative style
        they never saw), and economical because inference
        cost tracks parameter count almost linearly at
        scale. The NVIDIA blog quotes 10-30x cost reduction
        moving a Llama 3.1 8B call in place of Llama 3.3
        405B, and that matches what we measure on client
        stacks when we swap in a tuned SLM for a tool-call
        step.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The heterogeneous agent architecture
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern every serious SLM agent build converges
        on is heterogeneous: multiple models in the same
        agent, each doing what its size fits. A small model
        handles the narrow, repetitive steps. A big model
        handles the open-ended thinking, the summarisation
        into a final answer, or the exception cases the
        small model refuses to touch. A router in front
        picks which model gets the call.
      </p>
      <CodeBlock
        language="bash"
        filename="Heterogeneous agent: SLM-first with LLM fallback"
        code={`+-----------------------------------------------------------+
|  Incoming request                                         |
+---------------------------+-------------------------------+
                            |
                            v
+-----------------------------------------------------------+
|  Router (tiny model or plain code)                        |
|   - Classifies the step: tool-call / extract / summarise  |
|   - Picks the cheapest model that clears the SLA          |
+---------+---------------------------+---------------------+
          |                           |
          | most steps                | complex reasoning
          v                           v
 +-------------------+       +----------------------+
 |  SLM worker(s)    |       |  LLM fallback        |
 |  (Phi-4-mini,     |       |  (GPT-5.5, Claude    |
 |   Nemotron Nano,  |       |   Opus 4.8,          |
 |   Gemma 3 4B,     |       |   Gemini 3 Pro)      |
 |   Qwen 2.5 7B)    |       |                      |
 +---------+---------+       +----------+-----------+
           |                            |
           +-------------+--------------+
                         v
+-----------------------------------------------------------+
|  Tool executors + memory + evals                          |
+-----------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Three roles show up in almost every deployment.
        First, an <strong>intent classifier</strong> or
        router. It is often a small model, often a fine-
        tuned Gemma 3 270M or a rules table with a fallback
        model, and it decides where the request goes.
        Second, one or more <strong>SLM workers</strong>
        that handle the concrete step: parse arguments,
        call a tool, extract fields, summarise a page.
        These are fine-tuned or few-shot prompted for a
        narrow surface. Third, an <strong>LLM fallback</strong>
        for the steps where the SLM refuses, produces a
        low-confidence answer, or hits an out-of-distribution
        input. Every SLM-first stack we build has this
        fallback wired from day one because the eval
        distribution always has a long tail the SLM was
        not trained on.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The models we actually reach for in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The SLM landscape is loud. These are the ones we
        put in real production stacks and why.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Phi-4-mini (3.8B)</strong> from
          Microsoft: strong function calling for its size,
          good multilingual coverage, and the technical
          report (arXiv 2503.01743) documents the training
          recipe. Our default for structured tool-call
          steps where the tool count is small and the
          arguments are simple.
        </li>
        <li>
          <strong>Nemotron Nano 2 (9B)</strong> from
          NVIDIA: hybrid Mamba-Transformer, 128k context,
          6x throughput. Best pick when the step needs a
          short chain of thought plus a tool call, and
          the throughput matters (agent loops that fan out
          many parallel steps).
        </li>
        <li>
          <strong>Gemma 3 (4B, 12B)</strong> from Google:
          multimodal, 128k context, permissive licence.
          The 4B is the sweet spot for on-device tool use
          and text extraction on documents.
        </li>
        <li>
          <strong>FunctionGemma (Gemma 3 270M)</strong>:
          the January 2026 specialised fine-tune. When the
          agent runs on a phone or a small edge box and the
          tool set is fixed, this is the model we start
          with.
        </li>
        <li>
          <strong>Qwen 2.5-7B-Instruct</strong> from
          Alibaba: the Microsoft function-calling tutorial
          uses this one because it holds up on schemas
          with nested objects. Strong general instruction
          following.
        </li>
        <li>
          <strong>Mistral Small 4</strong> and{" "}
          <strong>Llama 3.2 3B</strong>: the fallback
          &ldquo;boring, works on any runtime&rdquo;
          options when licensing or ecosystem matters more
          than raw benchmark score.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The Artificial Analysis Intelligence Index chart
        NVIDIA ships with the Nemotron Nano 2 release
        makes the general point: on the aggregate index,
        Nemotron Nano 2 at 9B lands close to Llama 4
        Maverick and beats Qwen 3 14B and Llama 3.1
        Nemotron 70B. The parameter count and the score no
        longer track the way they did in 2023, and the
        agent stack should not assume they do.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Fine-tuning: LoRA, QLoRA, and a few hours on one
        GPU
      </h2>
      <p className="mb-6 leading-relaxed">
        The economic argument for SLMs is not only about
        inference cost. It is that fine-tuning becomes a
        normal engineering task. Adding a new skill to a
        4B model with LoRA takes hours on a single H100 or
        a good consumer card. Adding the same skill to a
        70B model takes days on a cluster, and getting the
        LoRA to serve well needs infrastructure the small
        model does not. The NVIDIA blog stops short of
        saying &ldquo;this is why LLMs will lose to SLMs
        in agentic AI&rdquo; but that is the underlying
        force: the SLM is a tool you own and iterate, the
        LLM is a service you call.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/finetune_phi4_mini.py"
        code={`from datasets import load_dataset
from peft import LoraConfig, get_peft_model
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
)

base_id = "microsoft/Phi-4-mini-instruct"

tokenizer = AutoTokenizer.from_pretrained(base_id)
model = AutoModelForCausalLM.from_pretrained(
    base_id,
    torch_dtype="bfloat16",
    device_map="auto",
)

lora = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora)

# Dataset: (agent_prompt -> tool_call JSON) pairs distilled
# from a bigger LLM run over the last 60 days of traffic.
ds = load_dataset("json", data_files="data/tool_calls_v3.jsonl")

def render(example):
    return tokenizer(
        f"<|system|>You are the tool-call step of the agent.\\n"
        f"<|user|>{example['prompt']}\\n"
        f"<|assistant|>{example['tool_call']}",
        truncation=True,
        max_length=2048,
    )

tokenized = ds["train"].map(render, remove_columns=ds["train"].column_names)

trainer = Trainer(
    model=model,
    args=TrainingArguments(
        output_dir="out/phi4-mini-toolcall-v3",
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        num_train_epochs=2,
        learning_rate=2e-4,
        bf16=True,
        logging_steps=25,
        save_steps=200,
    ),
    train_dataset=tokenized,
)
trainer.train()`}
      />
      <p className="mb-6 leading-relaxed">
        Two details matter more than the boilerplate.
        First, the training data comes from your own agent
        traces, not a public dataset. The Data Flywheel
        Blueprint NVIDIA ships is exactly this: log every
        request, curate for privacy, cluster by task, then
        distil a big-model answer down to an SLM adapter.
        The adapter you get is trained on the exact shape
        of your calls, not a generic tool-call format. That
        is why the SLM matches the big model on the tasks
        that matter, even though it loses on general
        benchmarks.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, use QLoRA (4-bit base plus LoRA) if the
        card is memory-constrained. QLoRA squeezes a 7B
        base under 16 GB and a 14B base under 24 GB during
        training, and the accuracy gap versus full LoRA on
        tool-call fine-tunes is small enough that we no
        longer measure it separately.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Tool calling with an SLM: the exact runtime shape
      </h2>
      <p className="mb-6 leading-relaxed">
        The blocker on SLM adoption in 2023 and early 2024
        was tool-calling reliability. That is largely
        solved. Phi-4-mini, Nemotron Nano 2, Qwen 2.5, and
        Gemma 3 all serialise tool calls in a schema the
        popular runtimes understand. Ollama, vLLM, and
        llama.cpp all speak the OpenAI-compatible chat
        completions API with tool arguments.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/call.py"
        code={`from openai import OpenAI

# vLLM in front of a fine-tuned Phi-4-mini adapter.
client = OpenAI(
    base_url="http://slm.internal:8000/v1",
    api_key="not-used",
)

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "lookup_customer",
            "description": "Fetch a customer record by id.",
            "parameters": {
                "type": "object",
                "properties": {
                    "customer_id": {"type": "string"},
                },
                "required": ["customer_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "refund_order",
            "description": "Issue a refund for an order.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                    "amount_cents": {"type": "integer"},
                    "reason": {"type": "string"},
                },
                "required": ["order_id", "amount_cents", "reason"],
            },
        },
    },
]

resp = client.chat.completions.create(
    model="phi4-mini-toolcall-v3",
    temperature=0,
    tools=TOOLS,
    tool_choice="auto",
    messages=[
        {"role": "system", "content": "You are the tool-call step."},
        {"role": "user", "content": "Refund order 8821 for $42, product broken."},
    ],
)

call = resp.choices[0].message.tool_calls[0]
print(call.function.name, call.function.arguments)
# refund_order {"order_id": "8821", "amount_cents": 4200,
#               "reason": "product broken"}`}
      />
      <p className="mb-6 leading-relaxed">
        Four notes from running this shape on live traffic.
        First, set <code>temperature=0</code> for tool-call
        steps. SLMs are more sensitive to sampling than
        LLMs, and any temperature above 0 costs schema
        compliance for no upside. Second, keep the tool
        list short. Phi-4-mini and Gemma 3 4B start slipping
        on tool selection past 15-20 tools. Split the agent
        into stages so each step only sees a few tools.
        Third, validate the arguments before calling the
        tool. Even a good SLM produces a wrong type once in
        a while; a JSON schema check plus a retry with the
        error message in the prompt fixes 90 percent of
        those. Fourth, log the traces. Ninety percent of
        the eval work on an SLM agent is looking at real
        failing calls and adding them to the next round of
        the fine-tune data.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluating SLMs for agentic work: BFCL v4 and your
        own trace set
      </h2>
      <p className="mb-6 leading-relaxed">
        The evaluation that most closely matches what an
        SLM does in an agent is the Berkeley Function
        Calling Leaderboard, especially the v4 release
        with multi-turn and multi-step evals. It scores a
        model on: picking the right function, formatting
        arguments correctly, respecting types, handling
        parallel calls, and holding state across turns.
        That is a superset of what any tool-calling step
        does, and the numbers line up with what we see in
        production traces.
      </p>
      <p className="mb-6 leading-relaxed">
        Two habits to build in an SLM shop. First, use BFCL
        as the coarse filter: any candidate SLM has to
        clear a minimum score there before you spend a
        week fine-tuning it. Second, build your own eval
        set from real traces. Sample a few hundred
        successful and failing calls per tool per week,
        anonymise them, and score every candidate model
        adapter on that set. The BFCL score tells you the
        model is plausible; the trace set tells you the
        model is right for your agent.
      </p>
      <CodeBlock
        language="python"
        filename="src/slm_agent/eval_trace_set.py"
        code={`import json
from openai import OpenAI

client = OpenAI(base_url="http://slm.internal:8000/v1", api_key="x")

def score_adapter(adapter_id: str, trace_path: str) -> dict:
    hits = 0
    total = 0
    schema_errors = 0
    with open(trace_path) as fh:
        for line in fh:
            row = json.loads(line)
            total += 1
            resp = client.chat.completions.create(
                model=adapter_id,
                temperature=0,
                tools=row["tools"],
                tool_choice="auto",
                messages=row["messages"],
            )
            call = resp.choices[0].message.tool_calls
            if not call:
                continue
            got = {
                "name": call[0].function.name,
                "args": json.loads(call[0].function.arguments or "{}"),
            }
            if got["name"] != row["expected"]["name"]:
                continue
            try:
                row["validator"](got["args"])
            except Exception:
                schema_errors += 1
                continue
            if got["args"] == row["expected"]["args"]:
                hits += 1
    return {
        "adapter": adapter_id,
        "accuracy": hits / total,
        "schema_error_rate": schema_errors / total,
    }`}
      />
      <p className="mb-6 leading-relaxed">
        The reason to log accuracy and schema errors as
        separate numbers is that they need different fixes.
        Low accuracy usually means the SLM has the wrong
        prior about which tool to pick, and the fix is more
        varied training data. High schema error rate means
        the arguments are in the wrong shape, and the fix
        is either a stricter prompt, a JSON-schema-guided
        decoding runtime (vLLM supports this), or more
        examples of the exact shape in training. Chasing
        one metric while the other is broken is the fastest
        way to burn a fine-tuning week.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The LLM-to-SLM conversion algorithm we run on
        client stacks
      </h2>
      <p className="mb-6 leading-relaxed">
        Section 6 of the NVIDIA paper sketches a general
        algorithm for migrating agent workloads from LLMs
        to SLMs. We run a shorter, more opinionated version
        of the same shape on client engagements.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Log first, model later</strong>. Turn on
          full request-and-response logging for the agent
          for at least 30 days. You need volume and
          diversity in the data before you can pick which
          steps are candidates.
        </li>
        <li>
          <strong>Cluster by step, not by user</strong>.
          Group the log lines by the step in the agent
          graph (router, extractor, tool-call for tool X,
          summariser, and so on). This surfaces which
          steps are repetitive, and repetitive is the
          precondition for SLM.
        </li>
        <li>
          <strong>Score the LLM answer with a rubric</strong>.
          For each candidate step, use a bigger model to
          grade the current LLM output. The steps where
          the LLM is doing something narrow and structured
          are the winnable ones for SLMs. The steps where
          the LLM is genuinely reasoning are not.
        </li>
        <li>
          <strong>Distil into an adapter</strong>. Use the
          filtered dataset (input plus LLM output) as the
          training pairs for a LoRA on a small base. Start
          with Phi-4-mini for tool calling, Gemma 3 4B for
          extraction, Nemotron Nano 2 for anything that
          needs short reasoning.
        </li>
        <li>
          <strong>Shadow-serve, then A/B</strong>. Deploy
          the SLM adapter behind the router but do not
          send it live traffic yet. Log its output next to
          the LLM output and compare. When the trace-set
          accuracy is above 95 percent of the LLM baseline,
          flip a percentage of the traffic and watch the
          product metrics for a week.
        </li>
        <li>
          <strong>Keep the LLM as fallback</strong>. Never
          remove the LLM path. Wire a confidence signal
          (low log-probs, schema error, refusal) that
          routes the request to the LLM. Every SLM
          deployment we run has a fallback rate between 1
          and 10 percent on steady state.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The reason this runs in order is that each step
        multiplies the value of the next. Skipping the
        logging phase means you fine-tune on a generic
        dataset and the SLM matches a benchmark you do not
        care about. Skipping the clustering step means you
        try to teach the SLM the whole agent at once, and
        it does none of the pieces well. Skipping the
        shadow deployment means the first user request is
        the first real test, which is the wrong time to
        find a schema drift.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Runtime choice: Ollama, vLLM, llama.cpp
      </h2>
      <p className="mb-6 leading-relaxed">
        A well fine-tuned SLM is only half of the stack.
        The runtime you serve it on decides the latency and
        throughput. In 2026 three runtimes cover almost
        every deployment we do.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Ollama</strong> is the laptop and
          prototype runtime. It sits on top of llama.cpp,
          serves a chat-completions API, and pulls models
          with a one-line command. We use it for
          development, demos, and low-volume internal
          tools. Not a production server for
          high-concurrency agents.
        </li>
        <li>
          <strong>vLLM</strong> is the enterprise server
          runtime. Paged attention, continuous batching,
          strong Nvidia and increasingly good AMD support.
          Serves multiple LoRA adapters at once so a
          single vLLM instance can run five specialised
          Phi-4-mini adapters behind one endpoint. Our
          default for anything that needs concurrency
          above single digits per second.
        </li>
        <li>
          <strong>llama.cpp</strong> is the edge runtime.
          Compiles for anything with a CPU, a Metal GPU,
          or a small NPU, and runs GGUF quantised
          weights. When the agent has to run in a Docker
          container on a Raspberry Pi CM5 or on a MacBook
          without internet, this is the runtime.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        A pattern we recommend: prototype on Ollama,
        promote to vLLM for the SLM worker fleet, and drop
        to llama.cpp only for the specific edge case where
        vLLM is not an option. The three tools are not
        alternatives, they are a family, and the choice is
        about where in the stack you sit, not which one is
        the best model runner.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production use cases we have shipped
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Customer-support tool router</strong>.
        A retail client had an agent that decided between
        eight tools (order lookup, refund, cancel, address
        change, and so on). GPT-4-class model per request,
        a few cents per call, thousands of calls per hour.
        We logged 60 days of traces, distilled a Phi-4-mini
        LoRA on the pairs, and put it behind the router.
        94 percent of steps stayed on the SLM, cost
        dropped by 88 percent, p95 latency dropped from
        1.4s to 320ms. The 6 percent that fell through went
        to GPT-5.5 and the product team saw no accuracy
        drop on the eval set they had already been running
        for months.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Document extraction pipeline</strong>.
        A legal-tech client was paying to extract 15 fields
        from PDFs. Frontier model on every page. We
        replaced the extractor with a fine-tuned Gemma 3
        4B on document-specific traces, kept the frontier
        model as the fallback for pages the extractor
        flagged as low-confidence. Cost went from about $2
        per document to under $0.10, and the extraction F1
        improved on the specific document types because the
        SLM had seen many more of that layout in training
        than the generalist model had.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>On-device voice assistant</strong>. A
        consumer-hardware client wanted the assistant to
        keep working offline. FunctionGemma (270M) shipped
        in January 2026 is what made this workable. We
        fine-tuned it on ~4,000 utterances mapped to the
        eight tools the device supports, and shipped it in
        llama.cpp on the device. First-token latency is
        under 200ms on the SoC and the online LLM only
        gets called when the intent classifier is under a
        confidence threshold.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Agent evaluator / LLM-as-judge</strong>.
        A common pattern we run: use an SLM as the judge
        that scores whether an agent step succeeded. The
        judge does not need a giant model; a Nemotron
        Nano 2 fine-tuned on labelled trace pairs matches
        a frontier model on judgement accuracy for a
        fraction of the cost and lets you evaluate every
        run in production instead of a sampled subset.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The honest limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        SLMs are not a drop-in swap for LLMs. Four failure
        modes we hit often.
      </p>
      <p className="mb-6 leading-relaxed">
        First, <strong>out-of-distribution inputs</strong>.
        A user request the SLM never saw at training time
        produces a plausible but wrong answer more often
        than a large model would. The mitigation is
        confidence scoring plus LLM fallback; the SLM
        should not be the last line of defence for edge
        cases. We measure the fallback rate as a first-
        class product metric.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>long, multi-hop reasoning</strong>.
        Even the best 9B model does not reliably plan
        seven-step research plans. The SLM handles a step,
        an LLM plans the sequence. If the agent needs a
        planner, keep an LLM there.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>data drift</strong>. Product
        catalogs, tool schemas, and user intent change.
        The SLM was frozen at fine-tuning time; if the
        catalog rotates 20 percent of SKUs a quarter, you
        need a monthly retrain and a rollback path. We
        wire the Data Flywheel Blueprint into the
        deployment for this reason, not the training
        speed.
      </p>
      <p className="mb-6 leading-relaxed">
        Fourth, <strong>ops complexity</strong>. Running
        an SLM stack in-house means serving weights,
        rotating adapters, monitoring GPUs, and paging on
        vLLM issues. Teams without an ML platform end up
        spending more on the operations than they saved
        on inference. If the volume is under a few
        thousand calls a day, keep the LLM API and only
        move to SLMs when the numbers push you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        SLM vs LLM vs the middle: when to pick each
      </h2>
      <p className="mb-6 leading-relaxed">
        The picture we hand to clients is a three-way
        split, not a binary.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use an SLM</strong> for the narrow steps of
        an agent: intent classification, tool-argument
        formatting, field extraction, short reasoning
        under 200 tokens, and any step you can point at in
        a trace log and say &ldquo;this looks the same
        every time.&rdquo; The economics only work at
        volume; low-traffic side projects do not justify
        the fine-tuning and serving cost.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use an LLM</strong> for the reasoning-
        heavy steps: multi-step planning, cross-domain
        synthesis, open-ended writing, the final user-
        facing summary. Also for the fallback path when
        the SLM refuses or produces low-confidence output.
        Keep the LLM in the loop; it is the safety net.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use a mid-size model</strong> (14B to 70B
        range: Nemotron 70B, Llama 4 series, Qwen 3 32B)
        when a single step needs more capability than an
        SLM but less than a frontier LLM, and you can
        justify serving it on your own hardware. The
        practical case is a private-VPC deployment where
        the data cannot leave the customer network and
        the frontier API is not available.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends to watch through the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Hybrid architectures win the SLM band</strong>.
        Nemotron Nano 2 uses a Mamba-Transformer mix, and
        the throughput gains show up on exactly the
        workloads agents produce (short prompts, many
        concurrent requests). We expect the 4B to 14B band
        to converge on hybrid architectures by end of
        2026, and the transformer-only SLMs to keep the
        small (under 2B) end where the memory saving does
        not matter as much.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Purpose-built micro-models</strong>. The
        FunctionGemma 270M release is the pattern: take a
        small base and specialise for one job (tool
        calling, classification, ranking). We expect more
        vendors to ship specialised fine-tunes with
        training recipes, and more teams to hold their
        own micro-model registry alongside their model API
        keys.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Serving-side JSON-schema guided decoding</strong>.
        vLLM, TGI, and Ollama all now support guided
        decoding that guarantees the output matches a
        schema. This makes tool-calling with an SLM more
        reliable than tool-calling with an unconstrained
        LLM in a lot of cases. The eval scores for
        constrained SLMs on structured tasks are climbing
        every release; watch this metric on BFCL.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Automated LLM-to-SLM conversion</strong>.
        The NeMo Customizer and Data Flywheel Blueprint
        are the first ecosystem tools that automate the
        loop from log-to-adapter. Expect similar tooling
        from Anthropic, OpenAI (RFT plus distillation),
        and open-source (LangSmith-driven trace exports).
        The manual pipeline described above is the current
        state; a year from now more of it is going to be
        one click.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Edge agents as a distinct product</strong>.
        On-device agents are becoming their own product
        category: private, offline-capable, low-latency.
        The 270M to 4B band, llama.cpp, and specialised
        fine-tunes are the stack. Every consumer hardware
        vendor with an agent story in the next 18 months
        is going to ship one of these.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the SLM-first stack is the default now
      </h2>
      <p className="mb-6 leading-relaxed">
        The pattern is stable: log the agent, cluster the
        steps, distil the narrow ones into small models,
        route with a small classifier, keep the LLM as
        fallback. The NVIDIA position paper called it in
        June 2025 and the ecosystem lined up behind it.
        Nemotron Nano 2, Phi-4-mini, Gemma 3 and
        FunctionGemma, plus vLLM and Ollama, plus LoRA on
        one GPU are what turned the argument into a
        checklist. On new agent engagements we now start
        by asking &ldquo;which steps here should not be an
        LLM?&rdquo; and the honest answer is usually most
        of them.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy call is easier than for Deep
        Research or multi-agent orchestration. You buy the
        base weights (open, permissive licences), you
        build the adapters (your data, your tools), and
        you serve on the runtime that matches your load
        (vLLM at the top, Ollama on the laptop, llama.cpp
        at the edge). The frontier LLM stays in the stack,
        but as a specialised resource for the hard steps,
        not the default engine for everything. That is the
        state of SLMs in AI agents in 2026: cheaper, more
        reliable on the narrow work, and finally ready to
        own the boring majority of an agent&rsquo;s
        traffic.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://research.nvidia.com/labs/lpr/slm-agents/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Research: Small Language Models are the
            Future of Agentic AI (project page)
          </a>
          {" "}- the position paper landing page with the
          abstract, the recommendations, and the LLM-to-
          SLM conversion diagram.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2506.02153"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv 2506.02153: Belcak et al., Small Language
            Models are the Future of Agentic AI (June 2,
            2025)
          </a>
          {" "}- the full paper with the value statement,
          the barriers analysis, and the conversion
          algorithm outline.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/how-small-language-models-are-key-to-scalable-agentic-ai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA Developer Blog: How Small Language
            Models Are Key to Scalable Agentic AI (August
            29, 2025)
          </a>
          {" "}- the practitioner-facing rollout plan with
          NeMo Customizer, the Data Flywheel Blueprint,
          and the 10-30x cost figure.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2503.01743"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv 2503.01743: Phi-4-Mini Technical Report
          </a>
          {" "}- the Microsoft report with the training
          recipe, benchmark numbers, and the function-
          calling behaviour of Phi-4-mini.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2508.14444"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv 2508.14444: NVIDIA Nemotron Nano 2 - an
            Accurate and Efficient Hybrid Mamba-
            Transformer
          </a>
          {" "}- the technical report for the 9B model,
          including the hybrid architecture, throughput
          numbers, and the 128k context evaluation.
        </li>
        <li>
          <a
            href="https://blog.google/innovation-and-ai/technology/developers-tools/functiongemma/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google: FunctionGemma - bespoke function
            calling to the edge
          </a>
          {" "}- the January 2026 release of the Gemma 3
          270M variant tuned for on-device function calls,
          plus the public training recipe.
        </li>
        <li>
          <a
            href="https://techcommunity.microsoft.com/blog/educatordeveloperblog/function-calling-with-small-language-models/4472720"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft: Function Calling with Small Language
            Models
          </a>
          {" "}- the tutorial using Qwen 2.5-7B-Instruct
          that walks through the exact tool-call shape and
          the failure modes to watch for.
        </li>
        <li>
          <a
            href="https://gorilla.cs.berkeley.edu/leaderboard.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Berkeley Function Calling Leaderboard (BFCL)
            V4
          </a>
          {" "}- the eval to filter candidate SLMs before
          fine-tuning, with multi-turn and multi-step
          agentic scores.
        </li>
        <li>
          <a
            href="/articles/production-ai-agents-tool-use"
            className="font-semibold text-primaryColor hover:underline"
          >
            Production AI agents and tool use
          </a>
          {" "}- the deeper read on the tool-call loop the
          SLM plugs into.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the sibling article on the same economic
          pressure that pushes toward the SLM-first stack.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- how the SLM workers fit into the
          orchestrator-worker layout when the agent grows
          past a single step.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that feeds the
          Data Flywheel loop this article relies on.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on shaping prompts and
          context around a small model without losing
          quality.
        </li>
      </ul>
    </div>
  );
}
