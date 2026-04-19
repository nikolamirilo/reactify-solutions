import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 10,
  slug: "cutting-openai-costs-production",
  title:
    "Cutting OpenAI API costs: caching, batching, and model routing in production",
  excerpt:
    "Three techniques that have reliably cut our OpenAI costs by 40% to 70% in production, without degrading output quality. Real patterns from running AI features at scale on Quicktalog and client work.",
  metaDescription:
    "Practical guide to cutting OpenAI API costs in production. Covers prompt caching, the Batch API, model routing, structured outputs, context budgets, and the eval setup that keeps quality honest.",
  image: "/images/blogs/blog-08.webp",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["AI", "OpenAI", "Cost", "Production"],
  publishDate: "2026-04-19",
  readingTime: "11 min read",
};

export default function CuttingOpenAiCostsProductionPost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        At a certain scale, the OpenAI bill is the bill. We run AI features for
        several clients and for our own product, Quicktalog, and have spent
        enough on tokens to care about every one of them. This post is the three
        techniques that have reliably cut our OpenAI costs by 40% to 70%, in
        production, without degrading output quality. None of them are exotic.
        All of them require some work.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Know your baseline before you touch anything
      </h2>
      <p className="mb-4 leading-relaxed">
        Before any cost work, measure. You need to know, per feature:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Tokens in and tokens out per call.</li>
        <li>Model used.</li>
        <li>Call frequency.</li>
        <li>
          Cost per 1,000 of whatever business outcome matters. Per catalog
          generated, per support ticket resolved, per page summarized.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        We log every OpenAI call to Postgres with those fields. A simple
        dashboard answers the question &quot;what did AI cost us this week, and
        which feature drove it.&quot; Without this, every cost cut is a guess.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Technique 1: prompt caching
      </h2>
      <p className="mb-6 leading-relaxed">
        Anthropic and OpenAI both offer prompt caching that charges a reduced
        rate for repeated prompt prefixes. The mental model: if 80% of your
        prompt is a long system prompt plus few-shot examples plus retrieved
        context, cache that part. The model reads it from cache. You pay a
        fraction of the normal token rate.
      </p>
      <p className="mb-4 leading-relaxed">The rules for a good cache hit:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          The cached portion has to be identical across calls, byte for byte.
        </li>
        <li>It has to be in the same position in the prompt.</li>
        <li>It has to meet the provider&apos;s minimum length.</li>
      </ul>
      <p className="mb-6 leading-relaxed">Practical pattern:</p>
      <CodeBlock
        language="typescript"
        filename="lib/structure.ts"
        code={`import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function structureMenu(ocrText: string) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: [
      {
        type: "text",
        text: LONG_STATIC_INSTRUCTIONS + FEW_SHOT_EXAMPLES,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      { role: "user", content: ocrText },
    ],
  });
  return response.content;
}`}
      />
      <p className="mb-6 leading-relaxed">
        For Quicktalog&apos;s catalog structuring prompt, prompt caching dropped
        input token cost by about 65% once we restructured the prompt so the
        static portion came first. We keep the cached chunk stable across
        releases and only bust it intentionally when the prompt changes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Technique 2: the Batch API for non-realtime work
      </h2>
      <p className="mb-6 leading-relaxed">
        If a feature does not need a response in the next five seconds, run it
        through the Batch API. OpenAI and Anthropic both discount batch jobs by
        roughly 50%. The tradeoff is latency. Responses come back within hours,
        not seconds.
      </p>
      <p className="mb-4 leading-relaxed">Good candidates:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Generating product descriptions for a new catalog.</li>
        <li>Summarizing a day&apos;s worth of support tickets overnight.</li>
        <li>Re-running a new prompt against a backtest set.</li>
        <li>Any cron-driven LLM job.</li>
      </ul>
      <p className="mb-4 leading-relaxed">Bad candidates:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Anything a user is actively waiting on.</li>
        <li>Chat messages.</li>
        <li>Anything with an SLA under an hour.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The implementation is boring. Upload a JSONL of requests, poll for
        completion, parse the JSONL of responses. We wrap it in a small
        TypeScript client with retry and partial-completion handling.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/batch.ts"
        code={`import OpenAI from "openai";

const openai = new OpenAI();

export async function submitBatch(tasks: { id: string; prompt: string }[]) {
  const jsonl = tasks
    .map((t) =>
      JSON.stringify({
        custom_id: t.id,
        method: "POST",
        url: "/v1/chat/completions",
        body: {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: t.prompt }],
        },
      })
    )
    .join("\\n");

  const file = await openai.files.create({
    file: new File([jsonl], "batch.jsonl"),
    purpose: "batch",
  });

  const batch = await openai.batches.create({
    input_file_id: file.id,
    endpoint: "/v1/chat/completions",
    completion_window: "24h",
  });

  return batch.id;
}`}
      />
      <p className="mb-6 leading-relaxed">
        For any feature that can tolerate the latency, halving the cost is a big
        deal.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Technique 3: model routing
      </h2>
      <p className="mb-6 leading-relaxed">
        The most expensive mistake we see is sending every request to the
        biggest model &quot;to be safe.&quot; Most tasks do not need the biggest
        model. Matching the model to the task is where the biggest wins live.
      </p>
      <p className="mb-4 leading-relaxed">The routing pattern:</p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          A cheap classifier (a regex, a small model, or a first pass) decides
          difficulty.
        </li>
        <li>
          Easy requests go to <code>gpt-4o-mini</code> or Haiku.
        </li>
        <li>
          Medium requests go to <code>gpt-4o</code> or Sonnet.
        </li>
        <li>
          Hard requests, or cases where the small model returns low confidence,
          escalate to the top model.
        </li>
      </ol>
      <CodeBlock
        language="typescript"
        filename="lib/router.ts"
        code={`import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

type Difficulty = "easy" | "medium" | "hard";

function classify(input: string): Difficulty {
  if (input.length < 400) return "easy";
  if (input.length < 2000) return "medium";
  return "hard";
}

const MODEL_FOR: Record<Difficulty, string> = {
  easy: "gpt-4o-mini",
  medium: "gpt-4o",
  hard: "gpt-4o",
};

export async function route(input: string) {
  const difficulty = classify(input);
  const result = await generateText({
    model: openai(MODEL_FOR[difficulty]),
    prompt: input,
  });
  return result.text;
}`}
      />
      <p className="mb-6 leading-relaxed">
        For Quicktalog, the OCR-to-structured-catalog step runs through this
        router. About 80% of inputs are handled by the small model, 15% go to
        the medium, and 5%, the hardest menus with unusual layouts, go to the
        big model. Average cost per catalog dropped by 55% with no drop in
        output quality on our eval set.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Evaluation is how you know it worked
      </h2>
      <p className="mb-4 leading-relaxed">
        Cost cuts that degrade quality silently are not a win. Every cost change
        we make runs against the same golden eval set before it ships:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>A fixed set of 50 to 200 known tasks.</li>
        <li>
          Grading with a second LLM call on a strict rubric, plus human spot
          checks.
        </li>
        <li>We look at quality, latency, and cost side by side.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        If a change cuts cost by 40% but drops quality score by 10%, we decide
        consciously whether that tradeoff is acceptable. Usually it is not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Structured outputs reduce retries
      </h2>
      <p className="mb-6 leading-relaxed">
        One hidden cost is retries. If the model returns malformed JSON, you
        re-call, and that second call is full price. Structured outputs, where
        the API enforces a schema, drive the retry rate to near zero.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/extract.ts"
        code={`import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const schema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      description: z.string().optional(),
      category: z.string().optional(),
    })
  ),
});

export async function extract(ocrText: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema,
    prompt: ocrText,
  });
  return object;
}`}
      />
      <p className="mb-6 leading-relaxed">
        A single failed-and-retried call doubles your cost for that request.
        Cutting that rate from 5% to 0.5% is a meaningful saving on high-volume
        features.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Context budgets matter more than you think
      </h2>
      <p className="mb-4 leading-relaxed">
        Long prompts are expensive. RAG contexts especially. Six chunks of 800
        tokens each, a system prompt, and the user message easily hit 6,000
        input tokens. At gpt-4o pricing that is roughly $0.015 per call.
        Multiplied by 10,000 daily calls, that is real money.
      </p>
      <p className="mb-4 leading-relaxed">Cheap ways to cut context:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Fewer, shorter chunks. Tune your retriever.</li>
        <li>
          Summarize conversation history after N turns instead of carrying it
          verbatim.
        </li>
        <li>
          Strip HTML, markdown, and whitespace from context before sending.
        </li>
        <li>Reuse a cached summary where you can.</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Fallbacks: cheaper model when the big one fails
      </h2>
      <p className="mb-6 leading-relaxed">
        For resilience, we wire a small model as the fallback when the big one
        times out or rate-limits. A degraded answer ships faster than a failed
        one, and the user sees an output. The product decides when a fallback
        answer is acceptable, and when the feature should just fail cleanly.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Watch the provider bill weekly
      </h2>
      <p className="mb-6 leading-relaxed">
        Cost surprises show up in the bill two weeks late. Weekly rollups per
        feature catch them earlier. We pipe our OpenAI usage logs into the same
        dashboard as our Stripe revenue, so cost per customer is one chart, not
        a spreadsheet.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        What we would do differently
      </h2>
      <p className="mb-6 leading-relaxed">
        If we were starting Quicktalog again, the thing we would set up on day
        one is the logging pipeline. Every other improvement is easier once you
        can see what is happening. Caching and routing without measurement is a
        coin flip. With measurement, it is engineering.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are running an AI feature at scale and want a second opinion on
        the cost structure or a model routing design,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          we would be glad to help
        </a>
        .
      </p>
    </div>
  );
}
