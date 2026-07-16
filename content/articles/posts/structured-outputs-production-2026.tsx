import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "structured-outputs-production-2026",
  title:
    "Structured outputs in production 2026: from OpenAI's JSON Schema to BAML's SAP and the constrained-decoding stack",
  excerpt:
    "How structured outputs went from a fragile prompt-engineering trick to a first-class API primitive in 2025 and 2026. Covers the constrained-decoding grammar approach that OpenAI, Anthropic, and Google all shipped, the schema-aligned parser (SAP) work from BAML, the Instructor and Outlines libraries, xgrammar and llguidance inside vLLM and SGLang, and the trade-offs that decide when you should turn strict mode on and when you should not.",
  metaDescription:
    "A practical, technical guide to structured outputs in 2026. Covers OpenAI Structured Outputs with strict:true, Anthropic output_config.format, Gemini response_schema, BAML Schema-Aligned Parsing, Instructor and Pydantic-based extraction, Outlines, xgrammar and llguidance inside vLLM and SGLang, the constrained decoding under the hood, the false-confidence trap where strict mode drops accuracy, cache and latency behaviour, and the production patterns for combining structured outputs with tool use and agent workflows.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "LLM",
    "Structured Outputs",
    "JSON Schema",
    "OpenAI",
    "Anthropic",
    "BAML",
    "Instructor",
    "Outlines",
    "vLLM",
    "Production",
  ],
  publishDate: "2026-07-16",
  readingTime: "17 min read",
};

export default function StructuredOutputsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Every real LLM feature we have shipped in the
        last two years has come down to one boring
        question: how do we get the model to hand back
        something our code can actually use? A JSON
        blob that parses. A tool call that matches the
        function. A classifier label that is one of
        five values, not four and a paragraph. In 2023
        that was prompt engineering and retries. In
        2024 OpenAI shipped Structured Outputs with
        strict schema conformance. In late 2025
        Anthropic did the same. Google, Mistral, and
        every serious inference engine followed. And a
        parallel ecosystem of libraries - BAML,
        Instructor, Outlines, xgrammar, llguidance -
        grew up around the same idea. This article is
        how we pick between them on client work, what
        the failure modes really look like, and where
        the honest trade-offs are.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why structured outputs finally became a
        first-class primitive
      </h2>
      <p className="mb-6 leading-relaxed">
        A structured output is any LLM response that
        conforms to a schema you supplied. Not just
        valid JSON. Not just a shape that looks about
        right. The exact fields, the exact types, the
        exact enums, matched against a JSON Schema or
        a grammar. If the schema says{" "}
        <code>age: integer</code>, the parser cannot
        get back <code>&quot;30&quot;</code>. If the
        schema says <code>plan_interest: enum[free,
        pro, enterprise]</code>, the parser cannot get
        back <code>&quot;Enterprise plan&quot;</code>.
        The response either matches or the model
        refused - there is no third state where you
        write more retry logic.
      </p>
      <p className="mb-6 leading-relaxed">
        OpenAI put a hard number on why this matters
        when they shipped Structured Outputs in August
        2024: on their internal JSON Schema eval,{" "}
        <code>gpt-4-0613</code> scored under 40%,
        prompted-only <code>gpt-4o</code> scored 93%,
        and <code>gpt-4o-2024-08-06</code> with{" "}
        <code>strict: true</code> scored a perfect
        100%. Same model, same schema, three different
        modes, and only the constrained one hits the
        reliability bar most production systems
        actually need. Every serious model provider
        has now landed on the same conclusion, which
        is why 2025 and 2026 are the years the API
        surface finally stopped being &ldquo;ask for
        JSON and pray.&rdquo;
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>August 6, 2024</strong>: OpenAI ships
          Structured Outputs in the Chat Completions,
          Assistants, and Batch APIs. First mainstream
          launch of grammar-constrained decoding as a{" "}
          <code>strict: true</code> flag. Python and
          Node SDKs get native Pydantic and Zod
          support.
        </li>
        <li>
          <strong>November 22, 2024</strong>: The
          XGrammar paper drops on arXiv. A portable,
          low-overhead grammar engine that later
          becomes the default backend for structured
          outputs in vLLM and SGLang.
        </li>
        <li>
          <strong>January 2025</strong>: The
          JSONSchemaBench paper is published, giving
          the field its first standard 10,000-schema
          benchmark for constrained decoding
          accuracy and efficiency.
        </li>
        <li>
          <strong>Through 2025</strong>: Google
          Gemini adds a strict{" "}
          <code>response_schema</code> parameter with
          Pydantic support. Mistral, Together,
          Fireworks, and every open-model API adds a
          JSON-schema mode. llguidance and xgrammar
          become the dominant constrained-decoding
          engines under the hood.
        </li>
        <li>
          <strong>November 13, 2025</strong>: Anthropic
          launches Structured Outputs on the Claude
          Developer Platform in beta, with an{" "}
          <code>output_format</code> field on Messages
          and a <code>strict: true</code> flag on
          tools.
        </li>
        <li>
          <strong>Q1 2026</strong>: Anthropic promotes
          Structured Outputs to GA, moves the beta
          field to <code>output_config.format</code>,
          and rolls the feature out on Bedrock, Vertex
          AI, and Microsoft Foundry. Grammar
          compilation artifacts get cached for 24
          hours per schema. HIPAA eligibility is added
          with a specific carve-out that PHI must not
          appear in schema definitions.
        </li>
        <li>
          <strong>Mid-2026</strong>: Structured outputs
          are the default recommendation across the
          major agent frameworks. LangChain, LlamaIndex,
          Pydantic AI, Mastra, and the OpenAI Agents
          SDK all treat schema-first calls as the
          normal path and free-form JSON parsing as
          the legacy one.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How the constrained-decoding trick actually
        works
      </h2>
      <p className="mb-6 leading-relaxed">
        Every strict-mode structured output feature -
        OpenAI, Anthropic, Google, vLLM, SGLang,
        Outlines, xgrammar - reduces to one idea. When
        the model samples the next token, do not let
        it pick from the whole vocabulary. Compute the
        set of tokens that would keep the output valid
        under the schema, and mask everything else to
        zero probability. That is it. Everything else
        - the grammar compilers, the token trees, the
        caches - is engineering around making that
        mask fast enough to not tank throughput.
      </p>
      <CodeBlock
        language="bash"
        filename="How strict-mode structured outputs are enforced"
        code={`  Schema (JSON Schema)
  { "type": "object",
    "properties": { "age": { "type": "integer" } },
    "required": ["age"],
    "additionalProperties": false }

           |  compile once, cache per schema
           v

  +------------------------------+
  | Context-free grammar (CFG)   |
  |   root  -> '{' '"age":' int  |
  |   int   -> [0-9]+            |
  +------------------------------+

           |  per token
           v

  step 0: valid next-token set = { '{' , '{\\n' , '{ ' }
                                   -> model MUST pick one
  step 1: prefix is '{'  ->  valid set = { '"age"', '\\n"age"' }
  step 2: prefix is '{"age":'   -> valid set = digit tokens 0..9
  step N: prefix is '{"age": 30}' -> only stop-token valid`}
      />
      <p className="mb-6 leading-relaxed">
        Two implementation details drive the whole
        cost model. First, computing the valid-token
        mask on the fly is expensive if you do it
        naively: for a 128k-token vocab you would run
        128k grammar checks per step. Both OpenAI and
        Anthropic (via internal work), and open-source
        engines xgrammar and llguidance, precompute a
        big lookup structure once per schema so the
        per-token cost is close to a hash lookup. That
        is why the first request with a new schema
        pays a compilation penalty and later ones do
        not.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, JSON Schema is not a small language.
        Recursive schemas, unions (<code>anyOf</code>),
        optional fields, and patterns all blow up the
        grammar. Anthropic publishes their explicit
        caps: at most 20 strict tools per request, 24
        optional parameters across all schemas, 16
        parameters with union types, and a 180-second
        compilation timeout as a stop-gap. OpenAI has
        similar limits documented in their guide.
        These caps are not arbitrary - they are what
        keeps compilation from stalling the request
        path. Design your schemas with them in mind
        and you rarely hit them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four ways teams get structured data out of
        an LLM
      </h2>
      <p className="mb-6 leading-relaxed">
        Before we compare vendors, the mental map. There
        are four honest categories, and every library
        or API sits in one of them.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Prompt-and-parse</strong>. Ask for
          JSON in the prompt, call{" "}
          <code>JSON.parse</code>, catch the error,
          retry. This is what almost every codebase
          used in 2023 and what still lives in a lot
          of pipelines. Reliability is often 90-95%
          on simple schemas, falls off fast for
          nested or enum-heavy schemas, and is a
          hidden liability on production.
        </li>
        <li>
          <strong>Grammar-constrained sampling</strong>.
          The provider (or your local inference
          engine) enforces the schema at the token
          level. OpenAI Structured Outputs, Anthropic{" "}
          <code>output_config.format</code>, Google{" "}
          <code>response_schema</code>, and every vLLM
          or SGLang backend running xgrammar or
          llguidance live here. This is the 100%
          conformance tier.
        </li>
        <li>
          <strong>Schema-aligned parsing</strong>. Do
          not constrain the model. Let it write
          whatever it wants. Run a smart parser after
          the fact that repairs missing quotes,
          trailing commas, unescaped newlines, and
          bad casts using the schema as a guide.
          BAML&rsquo;s SAP is the reference
          implementation here.
        </li>
        <li>
          <strong>Client-side retry with validation</strong>.
          Send the request. Parse against a Pydantic
          or Zod schema. On failure, send the error
          back to the model and try again up to N
          times. Instructor is the reference here for
          Python, and every agent framework does some
          version of this even when strict mode is on.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        In production you almost always run more than
        one of these together. A typical stack is:
        strict-mode grammar on the wire, Pydantic or
        Zod validation on our side, and one retry with
        the validation error if the response ever
        slips through non-conformant (which mostly
        happens when a safety refusal or a
        max_tokens truncation ends the stream early).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        OpenAI Structured Outputs: the reference API
      </h2>
      <p className="mb-6 leading-relaxed">
        OpenAI&rsquo;s Structured Outputs is the
        cleanest place to start because it is the API
        every other vendor is now shaped like. Two
        modes: <code>strict: true</code> inside a tool
        definition (for function calling), or{" "}
        <code>response_format</code> with a JSON
        schema (for direct structured responses). The
        Python SDK adds a{" "}
        <code>client.chat.completions.parse</code>{" "}
        helper that takes a Pydantic model, converts
        it, and returns a fully typed object.
      </p>
      <CodeBlock
        language="python"
        filename="src/extraction/openai_client.py"
        code={`from openai import OpenAI
from pydantic import BaseModel, Field

class Ticket(BaseModel):
    title: str = Field(..., description="Short title")
    priority: str = Field(..., description="low | medium | high | critical")
    estimated_hours: float | None = None

class Extraction(BaseModel):
    customer_name: str
    tickets: list[Ticket]

client = OpenAI()

completion = client.chat.completions.parse(
    model="gpt-5.5-2026-06",
    messages=[
        {"role": "system", "content": "Extract the support case as JSON."},
        {"role": "user",   "content": "Jane Doe wrote in about two bugs..."},
    ],
    response_format=Extraction,
)

case = completion.choices[0].message.parsed
if case is None:
    # This is a safety refusal, not a schema violation.
    raise RuntimeError(completion.choices[0].message.refusal)

for t in case.tickets:
    print(t.title, t.priority)`}
      />
      <p className="mb-6 leading-relaxed">
        Three details are worth noting for a
        production build. First, the response has a
        distinct <code>refusal</code> field. Strict
        mode does not override safety - if the model
        refuses, you get a refusal string in the
        message instead of a parsed object, and your
        code has to handle both. Do not assume{" "}
        <code>parsed</code> is always present. Second,
        the first request with a fresh schema takes
        longer because the grammar has to be compiled;
        subsequent requests hit a cache. If you rotate
        schemas per user, you pay this cost more often
        than you might expect. Third, strict mode is
        not compatible with parallel tool calls -
        parallel calls can produce arguments that do
        not match the schema, so you have to set{" "}
        <code>parallel_tool_calls: false</code> when
        strict is on.
      </p>
      <p className="mb-6 leading-relaxed">
        The JSON Schema OpenAI supports is a subset.
        The features you get: object, array, string,
        number, boolean, null, enum, const,{" "}
        <code>anyOf</code>, recursive schemas via{" "}
        <code>$ref</code>. The features you do not:{" "}
        <code>pattern</code> (regex), string length
        constraints, numeric ranges,{" "}
        <code>additionalProperties: true</code>{" "}
        (you must set it false), and optional
        properties (every property in{" "}
        <code>properties</code> has to be listed in{" "}
        <code>required</code>). If you need optional,
        use a union with null. This subset is the same
        one Anthropic and Google eventually converged
        on, so the schemas you write for one work
        almost unchanged on the others.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Anthropic output_config.format: the 2025 to
        2026 catch-up
      </h2>
      <p className="mb-6 leading-relaxed">
        Anthropic shipped Structured Outputs in beta
        on November 13, 2025, and promoted it to GA in
        Q1 2026 with the field renamed from{" "}
        <code>output_format</code> to{" "}
        <code>output_config.format</code>. The
        implementation looks like OpenAI&rsquo;s in
        the ways that matter (grammar-constrained
        sampling, cached compiled grammars, refusals
        as a first-class stop reason) and adds a few
        things that matter for enterprise deployments.
      </p>
      <CodeBlock
        language="python"
        filename="src/extraction/anthropic_client.py"
        code={`from anthropic import Anthropic
from pydantic import BaseModel

class ContactInfo(BaseModel):
    name: str
    email: str
    plan_interest: str
    demo_requested: bool

client = Anthropic()

response = client.messages.parse(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": (
                "John Smith (john@acme.com) is interested in our "
                "Enterprise plan and wants a demo next Tuesday at 2pm."
            ),
        }
    ],
    output_format=ContactInfo,
)

contact = response.parsed_output
print(contact.name, contact.email, contact.demo_requested)`}
      />
      <p className="mb-6 leading-relaxed">
        The Anthropic side has three
        production-relevant properties the OpenAI side
        does not. First, the compiled grammar is
        cached for 24 hours from last use, which is
        long enough that your schemas basically never
        recompile after the first hit in a busy
        service. Second, structured outputs work with
        Batch (50% discount) and Streaming, so you can
        run large offline extraction jobs cheaply or
        stream a validated JSON blob field by field
        into a UI. Third, the docs are explicit that
        JSON schemas themselves are cached separately
        from message content and do not get ZDR or
        HIPAA protection - PHI must live in the
        message, never in schema property names, enum
        values, or descriptions. This is a subtle
        compliance rule that would be easy to miss.
      </p>
      <p className="mb-6 leading-relaxed">
        The complexity caps are worth internalising
        because they shape how you design multi-tool
        agents. At most 20 tools per request with{" "}
        <code>strict: true</code>. At most 24 total
        optional parameters across every strict tool
        and every JSON output schema in the request.
        At most 16 parameters that use{" "}
        <code>anyOf</code> or type arrays (like{" "}
        <code>[&quot;string&quot;, &quot;null&quot;]</code>),
        because unions have exponential compilation
        cost. In practice we hit the optional-params
        cap first, and the fix is almost always the
        same as with OpenAI: mark fields required and
        let the model set a sentinel value like an
        empty string or null.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Google Gemini response_schema: the third API
        surface that looks like the first two
      </h2>
      <p className="mb-6 leading-relaxed">
        Google&rsquo;s Gemini API supports structured
        outputs via a{" "}
        <code>response_schema</code> field on the
        generation config. The interface accepts JSON
        Schema or a Pydantic model directly through
        the Python SDK, and Gemini enforces the
        schema at decode time the same way OpenAI and
        Anthropic do. This is a real convergence
        moment - the same Pydantic model works across
        all three vendors with minimal changes to the
        call site.
      </p>
      <CodeBlock
        language="python"
        filename="src/extraction/gemini_client.py"
        code={`from google import genai
from pydantic import BaseModel

class Recipe(BaseModel):
    recipe_name: str
    ingredients: list[str]
    steps: list[str]

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-pro",
    contents="Give me a recipe for pasta puttanesca.",
    config={
        "response_mime_type": "application/json",
        "response_schema": Recipe,
    },
)

recipe = Recipe.model_validate_json(response.text)
print(recipe.recipe_name)`}
      />
      <p className="mb-6 leading-relaxed">
        The Gemini variant has one property that is
        genuinely useful: property ordering in the
        output follows the order of fields in your
        schema, and you can force it with an explicit{" "}
        <code>property_ordering</code> annotation. If
        you have a chain-of-thought field followed by
        an answer field, this matters, because the
        model can only condition the answer on the
        reasoning if the reasoning is generated first.
        With OpenAI and Anthropic you get a similar
        ordering guarantee but with the caveat that
        required properties come before optional ones,
        so it is easier to control here.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        BAML and Schema-Aligned Parsing: the
        heretical answer
      </h2>
      <p className="mb-6 leading-relaxed">
        The BAML team at Boundary took a different
        line. Instead of constraining the model at the
        token level, they let the model write whatever
        it wants and built a Rust-based parser (SAP,
        for Schema-Aligned Parsing) that uses the
        schema to repair the output after the fact.
        The parser fixes missing quotes, trailing
        commas, unescaped newlines, prose bookends
        (&ldquo;Sure! Here is the JSON: ...&rdquo;),
        wrong casts (a number as a string, a string
        as a single-element list), and a dozen other
        common failure modes.
      </p>
      <p className="mb-6 leading-relaxed">
        On the Berkeley Function Calling Leaderboard,
        the BAML team measured SAP against native
        function calling and an AST parser. The
        numbers are striking: on{" "}
        <code>gpt-4o-mini</code>, native function
        calling was at 19.8%, an AST parser at 51.8%,
        and SAP at 92.4%. On <code>claude-3-haiku</code>,
        function calling was at 57.3% and SAP at
        91.7%. On <code>gpt-4o</code>, native was at
        87.4% and SAP at 93%. The point is not that
        grammar-constrained decoding is bad - it is
        that a smart parser can beat provider-native
        JSON modes on many models, and can do it on
        every model instead of just the ones with a
        native strict mode.
      </p>
      <CodeBlock
        language="bash"
        filename="baml_src/extraction.baml"
        code={`class Ticket {
  title       string @description("Short title")
  priority    "low" | "medium" | "high" | "critical"
  estimated_hours float?
}

class SupportCase {
  customer_name string
  tickets       Ticket[]
}

function ExtractCase(text: string) -> SupportCase {
  client "openai/gpt-5.5-2026-06"
  prompt #"
    Extract the support case as structured data.
    {{ ctx.output_format }}

    {{ _.role('user') }}
    {{ text }}
  "#
}`}
      />
      <p className="mb-6 leading-relaxed">
        You write the schema and prompt in a BAML
        file, run <code>baml-cli generate</code>, and
        get a typed client in Python, TypeScript,
        Ruby, Go, or Java. Under the hood BAML uses
        its own compressed schema format (about a
        quarter the tokens of JSON Schema) in the
        prompt, and the same Rust parser fixes the
        response regardless of which model produced
        it. There is one BAML-specific reason we
        reach for it on client work: switching model
        providers is a one-line change in the BAML
        file, and the same parser gives us consistent
        behaviour across OpenAI, Anthropic, Google,
        and open-weights models on vLLM. That
        portability is the underrated part.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-off is that BAML adds a DSL and a
        build step to your project. If your team is
        Pythonic and would rather write Pydantic
        models than learn a new schema language,
        Instructor is a better fit and gives you 80%
        of the value.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Instructor: the pragmatic Python default
      </h2>
      <p className="mb-6 leading-relaxed">
        Instructor is the most-used structured
        outputs library in Python (3 million monthly
        downloads, 11k stars, 15+ providers). It sits
        on top of Pydantic and gives you one call:
        pass a Pydantic model as{" "}
        <code>response_model</code>, get the
        validated object back. If validation fails it
        reasks the model with the validation error
        appended, up to a max number of tries. The
        exact same interface works with OpenAI,
        Anthropic, Google, Mistral, Cohere, Ollama,
        DeepSeek, and every OpenAI-compatible open
        endpoint.
      </p>
      <CodeBlock
        language="python"
        filename="src/extraction/instructor_client.py"
        code={`import instructor
from pydantic import BaseModel, Field, field_validator

class Person(BaseModel):
    name: str
    age: int = Field(gt=0, lt=130)
    occupation: str

    @field_validator("occupation")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("occupation must be non-empty")
        return v

client = instructor.from_provider("anthropic/claude-opus-4-8")

person = client.create(
    response_model=Person,
    max_retries=3,
    messages=[
        {"role": "user",
         "content": "Extract: Jason is a 25-year-old software engineer"},
    ],
)

print(person)  # Person(name='Jason', age=25, occupation='software engineer')`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth calling out. First,{" "}
        <code>from_provider(...)</code> lets you swap
        the backend with a config string, which is
        why Instructor is the fastest way to
        prototype an extraction task across three
        different models and see which one is best.
        Second, Pydantic&rsquo;s{" "}
        <code>@field_validator</code> hooks are a
        real superpower - they let you enforce
        business rules that JSON Schema alone cannot
        express (an age must be plausible, an email
        must be one of your allowed domains, a total
        must equal the sum of line items). When the
        validator raises, Instructor sends the error
        back to the model as an additional message
        and the model tries again. This is where the
        reask pattern earns its keep even when the
        wire-level output is already schema-valid.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Outlines, xgrammar, and llguidance: the open
        stack under vLLM and SGLang
      </h2>
      <p className="mb-6 leading-relaxed">
        If you self-host an open-weights model, you
        do not have a strict-mode API to call - you
        have to install one. The three engines every
        serious deployment uses are Outlines
        (dottxt-ai), xgrammar (MLC-AI), and
        llguidance (guidance-ai / Microsoft). They
        all do the same job (compute a valid-next-
        token mask from a grammar and apply it at
        each decode step) and they all plug into
        vLLM and SGLang as pluggable backends.
      </p>
      <p className="mb-6 leading-relaxed">
        The differences are engineering. Outlines is
        the oldest and most flexible: JSON Schema,
        regex, or context-free grammars, works with a
        wide range of inference engines. XGrammar
        (published November 2024, cited 162 times as
        of mid-2026) focuses on portability and low
        overhead - about 3-10 microseconds per token
        for typical schemas, which is a rounding
        error next to model inference. llguidance is
        the fastest for large-batch serving and is
        used inside Azure&rsquo;s hosted OpenAI
        strict mode.
      </p>
      <CodeBlock
        language="python"
        filename="src/serving/vllm_structured.py"
        code={`from vllm import LLM, SamplingParams
from vllm.sampling_params import GuidedDecodingParams

llm = LLM(
    model="Qwen/Qwen3-8B-Instruct",
    guided_decoding_backend="xgrammar",  # or "outlines", "lm-format-enforcer"
)

json_schema = {
    "type": "object",
    "properties": {
        "sentiment": {"type": "string", "enum": ["positive", "neutral", "negative"]},
        "confidence": {"type": "number"},
    },
    "required": ["sentiment", "confidence"],
    "additionalProperties": False,
}

sampling = SamplingParams(
    max_tokens=64,
    guided_decoding=GuidedDecodingParams(json=json_schema),
)

result = llm.generate(
    ["Classify: The product broke on day two and support ignored me."],
    sampling,
)
print(result[0].outputs[0].text)`}
      />
      <p className="mb-6 leading-relaxed">
        One production-important nuance: SqueezeBits
        measured guided decoding in vLLM and saw a
        notable throughput drop starting around
        batch size 8, because the CPU-side grammar
        step becomes a bottleneck relative to the
        GPU-side decoding. The Red Hat/vLLM team has
        put a lot of work into this in 2025 and 2026
        (moving the grammar step to the GPU where
        possible, precomputing more of the mask, and
        allowing the backend to hand back to
        unconstrained decoding for the middle of a
        long string field) and the gap has closed a
        lot. Still, for very high-QPS extraction
        services, benchmark your batch size with and
        without structured outputs before you commit.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The false-confidence trap: when strict mode
        makes your outputs worse
      </h2>
      <p className="mb-6 leading-relaxed">
        The uncomfortable finding from 2024 and 2025
        is that grammar-constrained decoding can
        hurt the semantic quality of the output even
        while it perfectly satisfies the schema. The
        Reddit r/LocalLLaMA thread that first raised
        this (and the follow-up BAML post{" "}
        <em>Structured Outputs Create False
        Confidence</em>) both point at the same
        mechanism: when the model is forced to emit
        the opening <code>{`{`}</code> immediately,
        it loses the ability to reason in natural
        language before committing to a field value.
        The token constraint makes the field
        formally valid but semantically weaker.
      </p>
      <p className="mb-6 leading-relaxed">
        The fix is the same across every framework
        and API: <strong>let the model think first,
        then commit</strong>. Add a{" "}
        <code>reasoning</code> or{" "}
        <code>notes</code> string field at the top
        of your schema and require it. The model
        writes a paragraph of natural language into
        that field, which then conditions the rest
        of the JSON. For extraction tasks this can
        add 5 to 15 points of accuracy on nested
        or ambiguous inputs. For simple
        classification with a two-token enum, skip
        the reasoning field; it costs tokens for no
        gain.
      </p>
      <CodeBlock
        language="python"
        filename="Force chain-of-thought inside the schema"
        code={`from pydantic import BaseModel, Field

class Classification(BaseModel):
    # Required, comes first, model must fill it before the label.
    reasoning: str = Field(
        ...,
        description=(
            "Walk through why this classification is correct, "
            "in 2 to 4 sentences. Do this before the label."
        ),
    )
    label: str = Field(..., description="one of: bug, feature, question, spam")
    confidence: float`}
      />
      <p className="mb-6 leading-relaxed">
        Two more subtler traps show up in production.
        Enum casing: Anthropic&rsquo;s docs are
        explicit that structured outputs do not
        guarantee the capitalization of enum values
        (they may return &ldquo;Enterprise&rdquo; when
        your schema says &ldquo;enterprise&rdquo;).
        Always compare enums case-insensitively.
        Max-token truncation: if the response hits
        the token limit mid-JSON, you get an
        incomplete document even in strict mode.
        Handle <code>stop_reason == &quot;max_tokens&quot;</code>{" "}
        as a real failure mode with a retry, not as
        a schema-conforming response.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns from client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Reach for strict mode by default,
        but never trust it alone</strong>. Wire the
        provider&rsquo;s strict flag on the API call
        AND validate the response with a Pydantic or
        Zod model on your side. The strict flag
        catches schema violations; your model
        catches business-rule violations
        (implausible ages, sums that do not add up,
        references to IDs that do not exist). One
        retry with the validation error appended
        catches the rest.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Put a reasoning field at the top
        of every extraction schema</strong>. Two to
        four sentences is enough. It costs a couple
        of hundred tokens and buys back the
        chain-of-thought quality that strict mode
        would otherwise take away. Drop it for
        classification when the label is a single
        enum with obvious semantics.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Mark fields required and use
        nullable types for &ldquo;optional&rdquo;</strong>.
        Both OpenAI and Anthropic penalise optional
        fields hard (each roughly doubles part of
        the grammar state space, and both cap the
        total). If a field might be absent, model it
        as required with a{" "}
        <code>str | None</code> type. The model
        emits null when it does not know, which is
        cleaner for downstream code anyway.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Cache your schemas at the same
        boundary the provider does</strong>. If you
        rebuild the JSON schema per request (for
        example, because you inject the current
        user&rsquo;s allowed tools into it), you pay
        the compilation cost on every call. Hash
        the schema and pin the set of variants to a
        small number - 5 to 20 - so the provider
        cache actually helps you.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Do not put PHI or secrets in
        schema definitions</strong>. Anthropic&rsquo;s
        HIPAA docs make this explicit and the same
        logic applies to any privacy regime. Schema
        property names, enum values, descriptions,
        and pattern strings are cached separately
        from the message payload and do not get the
        same protections. Put sensitive data in the
        message; keep the schema generic.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Instrument the failure paths, not
        just the success path</strong>. Log the
        distribution of{" "}
        <code>stop_reason</code> values across your
        production traffic. A rising share of{" "}
        <code>refusal</code> means the schema is
        pushing the model into unsafe territory; a
        rising share of <code>max_tokens</code>{" "}
        means your responses are outgrowing your
        cap. Both are silent quality regressions if
        you only alert on parse errors.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Benchmark before you commit to a
        backend for self-hosted serving</strong>. If
        you run your own vLLM or SGLang fleet, try
        xgrammar and llguidance side by side on
        your real schemas and your real batch size.
        The 2025 to 2026 gap between backends is
        narrowing but still real, and picking the
        wrong one can cost 30% of throughput at the
        batch sizes that matter.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Structured outputs vs tool use: they are the
        same thing under different names
      </h2>
      <p className="mb-6 leading-relaxed">
        The point of confusion we field most often
        on new engagements is the difference between{" "}
        <em>structured outputs</em> and{" "}
        <em>function calling</em>. In 2026, the
        answer is: they are the same mechanism with
        two different framings. Both compile a JSON
        Schema into a grammar. Both constrain the
        model to emit tokens that satisfy the
        grammar. The only difference is what the
        provider does with the result.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Tool use / function calling</strong>{" "}
          gives the model a menu of schemas (each
          tool is one schema) and lets it choose
          which to invoke, when to invoke none, and
          when to invoke several. The provider
          returns a list of tool calls, and you run
          them.
        </li>
        <li>
          <strong>Structured outputs / response
          format</strong> hands the model one schema
          and forces the whole response to conform.
          The model does not choose whether to
          &ldquo;call&rdquo; anything - the response
          is the object.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The rule of thumb: use structured outputs
        when the model&rsquo;s job is to hand you
        one shape of data (an extraction, a
        classification, a report section). Use tool
        use when the model&rsquo;s job is to decide
        between actions (a search, a database call,
        a nothing-to-do). Anthropic&rsquo;s docs put
        it well: structured outputs are the shape
        of the answer, strict tool use is the shape
        of the request the model wants your code to
        run. You can turn on both in the same
        request when an agent needs to both call
        tools and produce a validated final report.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cost, latency, and when NOT to use strict
        mode
      </h2>
      <p className="mb-6 leading-relaxed">
        Constrained decoding is not free. The token
        cost is roughly the same as a normal call
        (the mask does not eat tokens), but there
        are two real costs. Grammar compilation
        adds a first-request latency spike - OpenAI
        typically under 10 seconds, Anthropic
        similar, up to 180 seconds for very complex
        schemas. On the serving side, the per-
        token overhead is a few microseconds with a
        modern backend, which is negligible for
        interactive chat but visible at high batch
        sizes on self-hosted vLLM.
      </p>
      <p className="mb-6 leading-relaxed">
        Skip strict mode when: (a) the response is
        long free-form text and you only care that
        a short header at the top is parseable (use
        prompt-and-parse for the header, let the
        rest be prose); (b) you are streaming into
        a UI where the schema is a big nested tree
        and users see the first field within a
        second (the grammar can constrain streaming
        in a way that stalls early fields);
        (c) you need the model to reason for a long
        time before committing to any field, and
        the schema is too rigid to hold the
        reasoning inline. In all three cases, a
        BAML SAP or Instructor reask pattern is
        usually a better fit.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Schema convergence across
        providers</strong>. The subset of JSON
        Schema that OpenAI, Anthropic, and Google
        all support has stabilised: object, array,
        string, number, boolean, enum,{" "}
        <code>anyOf</code>, recursive{" "}
        <code>$ref</code>, no optional properties,
        no <code>additionalProperties: true</code>,
        no unsupported keywords. In 2026 we expect
        this subset to become a formal shared spec
        so the same schema JSON works verbatim on
        every provider.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cheaper strict mode for open
        models</strong>. The xgrammar 2.x and
        llguidance 1.x releases (both landed in
        2025) closed most of the throughput gap
        between constrained and unconstrained
        decoding at typical batch sizes. Expect
        the &ldquo;strict mode is expensive&rdquo;
        argument against self-hosting to fade
        through 2026 as more of the mask
        computation moves onto the GPU and gets
        fused with the softmax step.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Schema-aware fine-tuning</strong>.
        Both OpenAI and Anthropic are training
        models with schema tokens as first-class
        citizens - the model sees the compiled
        grammar during training and learns to
        write outputs that need less repair. This
        is one reason the newest models (Opus 4.8,
        GPT-5.5) score near-perfect on JSON
        conformance even without strict mode. The
        gap between constrained and unconstrained
        is closing from both sides.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Grammar as the universal LLM
        interface</strong>. If you squint, the
        MCP spec, the OpenAI Agents SDK tool
        definitions, the LangGraph state schemas,
        and every agent framework&rsquo;s tool
        declarations all bottom out in JSON
        Schema. Structured outputs are becoming
        the wire format between agents, not just
        the wire format between an app and an
        LLM. Getting this right at your provider
        boundary pays off everywhere else.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: pick strict mode by default,
        one library for portability
      </h2>
      <p className="mb-6 leading-relaxed">
        The state of structured outputs in mid-2026
        is boring in a good way. Every major
        provider has a strict mode. The
        constrained-decoding trick underneath is
        the same idea at every vendor. Pydantic on
        the Python side and Zod on the TypeScript
        side are the de facto schema languages, and
        both convert cleanly to the JSON Schema
        subset the providers support. The
        interesting choice is no longer
        &ldquo;should I use structured
        outputs?&rdquo; - it is &ldquo;which
        provider, which library, and how do I keep
        my schemas simple enough to stay under the
        complexity caps?&rdquo;
      </p>
      <p className="mb-6 leading-relaxed">
        Our default stack on new work is: OpenAI or
        Anthropic strict mode over the wire,
        Pydantic models with{" "}
        <code>@field_validator</code> for business
        rules, Instructor for one-provider
        prototypes, BAML when we need to switch
        providers under one parser, and xgrammar
        under vLLM for self-hosted open models.
        A reasoning field at the top of every
        extraction schema. Optional as nullable,
        never as absent. Enums compared case-
        insensitively. Log{" "}
        <code>stop_reason</code>. Alert on the
        distribution, not just on parse errors.
        That stack has held for the last twelve
        months of client work and we do not see it
        moving before the end of 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://openai.com/index/introducing-structured-outputs-in-the-api/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI: Introducing Structured Outputs
            in the API (August 6, 2024)
          </a>
          {" "}- the launch post with the 100%
          conformance number, the constrained-
          decoding explanation, and the CFG vs FSM
          argument for recursive schemas.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic Claude Platform: Structured
            outputs reference
          </a>
          {" "}- the GA docs for{" "}
          <code>output_config.format</code> with
          the complexity caps, the 24-hour grammar
          cache, and the HIPAA / PHI carve-out for
          schema fields.
        </li>
        <li>
          <a
            href="https://boundaryml.com/blog/schema-aligned-parsing"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BAML: Prompting vs JSON Mode vs Function
            Calling vs Constrained Generation vs SAP
          </a>
          {" "}- the Boundary blog post that
          introduces Schema-Aligned Parsing, with
          the BFCL numbers where SAP beats native
          function calling on every model tested.
        </li>
        <li>
          <a
            href="https://boundaryml.com/blog/structured-outputs-create-false-confidence"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BAML: Structured Outputs Create False
            Confidence
          </a>
          {" "}- the follow-up on the accuracy
          regressions strict mode can cause and how
          a reasoning field or a schema-aligned
          parser mitigates them.
        </li>
        <li>
          <a
            href="https://python.useinstructor.com/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instructor documentation
          </a>
          {" "}- the reference for the most-used
          structured outputs library in Python,
          with the multi-provider{" "}
          <code>from_provider</code> pattern and the
          Pydantic reask model.
        </li>
        <li>
          <a
            href="https://dottxt-ai.github.io/outlines/latest/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Outlines documentation (dottxt-ai)
          </a>
          {" "}- the open-source constrained
          decoding library that shipped this
          category and is still one of the two
          default backends inside vLLM.
        </li>
        <li>
          <a
            href="https://arxiv.org/abs/2411.15100"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            XGrammar: Flexible and Efficient
            Structured Generation Engine for LLMs
            (Dong et al., 2024)
          </a>
          {" "}- the paper for the grammar engine
          that now backs structured outputs in
          vLLM, SGLang, and MLC-LLM.
        </li>
        <li>
          <a
            href="https://github.com/guidance-ai/llguidance"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            llguidance on GitHub
          </a>
          {" "}- the Microsoft / guidance-ai
          constrained-decoding library optimised for
          large-batch serving.
        </li>
        <li>
          <a
            href="https://arxiv.org/html/2501.10868v1"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSONSchemaBench: Generating Structured
            Outputs from Language Models (2501.10868)
          </a>
          {" "}- the 10,000-schema benchmark paper
          for evaluating constrained decoding
          engines on efficiency and coverage.
        </li>
        <li>
          <a
            href="https://ai.google.dev/gemini-api/docs/structured-output"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gemini API: Structured outputs
          </a>
          {" "}- Google&rsquo;s reference for{" "}
          <code>response_schema</code> and the
          property-ordering guarantees that matter
          for chain-of-thought fields.
        </li>
        <li>
          <a
            href="/articles/production-ai-agents-tool-use"
            className="font-semibold text-primaryColor hover:underline"
          >
            Production AI agents and tool use
          </a>
          {" "}- the deeper read on function calling
          and how strict tool use fits inside
          agentic workflows.
        </li>
        <li>
          <a
            href="/articles/pydantic-ai-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Pydantic AI in production 2026
          </a>
          {" "}- the Python agent framework that
          treats Pydantic schemas as first-class
          and is the natural next step from
          Instructor.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on how structured
          outputs interact with reasoning-heavy
          agents and prompt caches.
        </li>
        <li>
          <a
            href="/articles/cutting-openai-costs-production"
            className="font-semibold text-primaryColor hover:underline"
          >
            Cutting OpenAI costs in production
          </a>
          {" "}- the companion piece on the
          budget side of production LLM systems,
          where strict mode and schema caching are
          two of the levers.
        </li>
      </ul>
    </div>
  );
}
