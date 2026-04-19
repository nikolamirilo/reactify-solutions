import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 6,
  slug: "production-ai-agents-tool-use",
  title:
    "Building production AI agents with tool use: patterns that actually work",
  excerpt:
    "Tool selection, retry and timeout strategy, evaluation, and the guardrails that keep an agent from falling over in production. A practical architecture built from real client work.",
  metaDescription:
    "A practical guide to building production AI agents with tool use. Covers the tool-calling loop, termination conditions, observability, evaluation, and common failure modes.",
  image: "/images/blogs/blog-04.jpg",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["AI", "Agents", "Next.js", "Production"],
  publishDate: "2026-04-19",
  readingTime: "10 min read",
};

export default function ProductionAiAgentsToolUsePost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        An agent is a chatbot that can do things. The model reasons about a
        task, picks a tool to call, reads the result, and decides what to do
        next. Most people building agents hit the same three walls. The agent
        runs forever, the tools fail in confusing ways, and nobody can tell why
        the answer was wrong. This post is how we build agents for clients
        today, with the guardrails that keep them from falling over in
        production.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        When an agent is the right tool
      </h2>
      <p className="mb-6 leading-relaxed">
        The first question, before any code, is whether you actually need an
        agent. A lot of agent projects we review would be better off as a fixed
        pipeline.
      </p>
      <p className="mb-6 leading-relaxed">
        Use an agent when the user&apos;s goal genuinely branches. Booking a
        flight involves many paths depending on availability and preferences.
        Answering a support ticket might need a knowledge lookup, or a database
        query, or an escalation. The agent picks the path.
      </p>
      <p className="mb-6 leading-relaxed">
        Do not use an agent when the workflow is fixed. If you always call the
        same three functions in the same order, write three function calls. An
        LLM in the middle is a flaky, expensive coordinator.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The tool-calling loop
      </h2>
      <p className="mb-4 leading-relaxed">
        Every modern agent runs a short loop.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          The model reads the conversation plus the set of available tools.
        </li>
        <li>It either emits a final answer or a tool call.</li>
        <li>
          Your code runs the tool and feeds the result back as a new message.
        </li>
        <li>
          The loop repeats until a final answer or a stop condition fires.
        </li>
      </ol>
      <p className="mb-6 leading-relaxed">
        This is all that the Vercel AI SDK&apos;s <code>generateText</code> with
        tools does under the hood. You can call the provider SDK directly if you
        want more control.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/agent.ts"
        code={`import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const lookupOrder = tool({
  description: "Look up an order by its id",
  parameters: z.object({ orderId: z.string() }),
  execute: async ({ orderId }) => {
    const order = await db.orders.findUnique({ where: { id: orderId } });
    if (!order) return { error: "Order not found" };
    return { id: order.id, status: order.status, total: order.total };
  },
});

export async function runAgent(userMessage: string) {
  const result = await generateText({
    model: openai("gpt-4o"),
    tools: { lookupOrder },
    maxSteps: 10,
    system:
      "You are a support agent. Use tools to answer accurately. Cite order ids in your reply.",
    prompt: userMessage,
  });
  return result.text;
}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Tools matter more than prompts
      </h2>
      <p className="mb-4 leading-relaxed">
        The biggest quality decision in an agent is the tool itself, not the
        prompt. Three rules we follow.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Names and descriptions are read by the model.</strong> Write
          them like good function docs. A description of &quot;gets a
          thing&quot; tells the model nothing.
        </li>
        <li>
          <strong>The parameter schema is a contract.</strong> Use zod or a JSON
          Schema with strict mode so the model cannot invent fields. Strict
          schemas catch hallucinated arguments before they reach your code.
        </li>
        <li>
          <strong>Error messages should be diagnostic.</strong> If the tool
          fails, return a message the model can use to retry. &quot;Invalid date
          format, expected YYYY-MM-DD&quot; beats &quot;500 error&quot; every
          time.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Termination conditions
      </h2>
      <p className="mb-4 leading-relaxed">
        An unbounded agent is a bug. We wire three limits into every agent.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Max step count.</strong> Usually 10 or 12. If the agent has
          not finished by then, return a failure and surface the trace.
        </li>
        <li>
          <strong>Total token budget.</strong> Cheap models make this easier to
          ignore, but a stuck agent still burns money fast.
        </li>
        <li>
          <strong>Wall clock budget.</strong> 60 seconds for user-facing agents,
          longer for background jobs.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Hitting any limit should produce a structured error the app can handle,
        not just a timeout.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Observability from day one
      </h2>
      <p className="mb-4 leading-relaxed">
        The single biggest difference between an agent that survives in
        production and one that gets ripped out is tracing. Every run needs to
        log:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Every tool call with its arguments, result, and duration.</li>
        <li>Every model call with its prompt, completion, and token count.</li>
        <li>The final outcome or error.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        We write our own traces to Postgres for small agents and use Langfuse or
        LangSmith when a client already has one set up. Either works. The point
        is that you can pull up a failing run three weeks later and see exactly
        what happened.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Evaluation is the work
      </h2>
      <p className="mb-6 leading-relaxed">
        Prompt engineering is what junior developers do on an agent. Evaluation
        is what senior developers do.
      </p>
      <p className="mb-6 leading-relaxed">
        Build a golden set of 30 to 100 representative tasks with known-good
        traces. Every change to the agent, a new tool, a different model, a
        prompt tweak, runs against this set. You are looking for regressions in
        tool selection, final answer quality, and step count.
      </p>
      <p className="mb-6 leading-relaxed">
        We grade final answers with a second LLM call using a clear rubric.
        Human review on 10% of runs catches what the judge model misses.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        What usually goes wrong
      </h2>
      <p className="mb-4 leading-relaxed">
        The failure modes we see most often, in rough order:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          The agent calls the same tool in a loop because the tool&apos;s error
          message is not specific enough to change its plan.
        </li>
        <li>
          Tool parameter drift. The model passes an id it invented. Strict
          schemas catch this.
        </li>
        <li>
          Latency. Every step is a round trip to the model. Four steps at two
          seconds each is a user waiting eight seconds with nothing to look at.
        </li>
        <li>
          The prompt keeps growing. Context budgets matter more than people
          think.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Where to go from here
      </h2>
      <p className="mb-6 leading-relaxed">
        If you are building your first agent, do it without a framework. The
        Vercel AI SDK plus a provider SDK gives you enough structure without
        hiding the loop. Frameworks like LangGraph are valuable later, once you
        have a reason to need their graph model.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on an agent design, evaluation strategy, or
        cost model,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          reach out
        </a>
        .
      </p>
    </div>
  );
}
