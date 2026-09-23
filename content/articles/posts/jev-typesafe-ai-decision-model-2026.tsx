import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "jev-typesafe-ai-decision-model-2026",
  title:
    "Jev by TypeSafe AI: a model that makes decisions instead of writing text",
  excerpt:
    "Jev does not chat. You give it evidence and a few typed questions, and it returns choices, scores, and yes/no probabilities in under half a second. What it is, how it is used, and where it fits in an agent.",
  metaDescription:
    "A short, practical introduction to Jev, TypeSafe AI's System One model. Covers the Choice, Score, and Noul question types, calibrated confidence, a first API call in Python and TypeScript, using Jev as a router in LangGraph, and when not to use it.",
  image:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["AI", "Agents", "Jev", "TypeSafe AI", "LangGraph", "Classification"],
  publishDate: "2026-09-23",
  readingTime: "6 min read",
};

export default function JevTypesafeAiDecisionModel2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Look at the LLM calls in a typical agent and count how many of them
        actually write something for a person to read. Usually it is one or
        two. The rest are small decisions: which tool, which team, is this
        urgent, is this safe, are we done. Each one waits seconds for a chat
        model to produce text that code then has to parse. Jev, from TypeSafe
        AI, is built for exactly those calls.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What Jev is
      </h2>
      <p className="mb-6 leading-relaxed">
        Jev is a <strong>decision model</strong>. TypeSafe calls it a
        &ldquo;System One&rdquo; model, after Daniel Kahneman&apos;s name for
        fast, intuitive thinking. It does not generate prose. You send it two
        things:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>State</strong>: the evidence. A message, a JSON object, a
          chat history.
        </li>
        <li>
          <strong>Questions</strong>: what you want decided, each with a type
          and a fixed set of possible answers.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        It sends back typed answers with probabilities attached. The answer
        is always one of the options you defined, so there is nothing to
        parse and no made-up label to handle. A call takes 70 to 500 ms, and
        output tokens are free.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Three question types
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Choice</strong>: pick one option, up to 255 of them.
          &ldquo;Which team owns this ticket?&rdquo;
        </li>
        <li>
          <strong>Score</strong>: place it on an ordered scale of 2 to 10
          levels. &ldquo;How severe is this?&rdquo;
        </li>
        <li>
          <strong>Noul</strong>: a yes/no probability from 0 to 1.
          &ldquo;Is the customer asking for a refund?&rdquo;
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        You can mix them in one request. They are answered in parallel, so
        ten questions take about as long as one. Choice and Score also return
        a <strong>confidence</strong> value, which is the part that makes Jev
        useful in production. More on that below.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What a call looks like
      </h2>
      <CodeBlock
        language="python"
        filename="triage.py"
        code={`from typesafe_sdk import Choice, Noul, TypeSafeClient

client = TypeSafeClient()  # reads TYPESAFE_API_KEY

result = client.system_one(
    "Stripe sync has failed for 3 days and I am losing sales. Help!",
    {
        "team": Choice(
            instructions="Which team should handle this?",
            criteria={
                "billing": "Charges, invoices, and refunds",
                "technical": "Bugs, outages, and integration failures",
            },
        ),
        "urgent": Noul(instructions="Does this need attention right now?"),
    },
)

team = result.choices["team"]
print(team.choice, team.confidence)   # technical 0.92
print(result.nouls["urgent"].noul)    # 0.99`}
      />
      <p className="mb-6 leading-relaxed">
        The TypeScript SDK (<code>@typesafe-ai/sdk</code>) works the same way
        and infers the answer types for you. On the Vercel AI SDK, the same
        request goes through <code>experimental_evaluate</code> with the model
        id <code>typesafe-ai/jev</code>.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How it is used: confidence decides who acts
      </h2>
      <p className="mb-6 leading-relaxed">
        A chat model gives you an answer but not a reliable sense of when it
        is guessing. Jev is trained to give calibrated probabilities, so a
        confidence of 0.9 should be right about nine times in ten. That turns
        into a very simple policy in code:
      </p>
      <CodeBlock
        language="python"
        filename="route.py"
        code={`if team.confidence > 0.9:
    assign(team.choice)                      # automatic
elif team.confidence > 0.5:
    assign(team.choice, needs_review=True)   # act, but flag it
else:
    send_to_human()                          # too close to call`}
      />
      <p className="mb-6 leading-relaxed">
        The clear cases get handled on their own. The unclear ones go to a
        person. And the rule lives in code you can read and test, not in a
        prompt. Before you trust the thresholds, run Jev on a few hundred
        past cases where you already know the answer, and set the lines from
        what you see.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where it fits in an agent
      </h2>
      <p className="mb-4 leading-relaxed">
        Jev is not a replacement for your LLM. It takes over the small
        decisions around it:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Routing</strong>: which agent, queue, or model gets this
          request.
        </li>
        <li>
          <strong>Guardrails</strong>: is this tool call safe to run, does
          this reply contain personal data.
        </li>
        <li>
          <strong>Loop control</strong>: is the task done, or should the
          agent keep going.
        </li>
        <li>
          <strong>Filtering</strong>: which retrieved passages are relevant
          enough to pass to the LLM.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        In LangGraph, this maps neatly onto a router node. Jev answers the
        question, a plain Python function turns the answer into a conditional
        edge, and the LLM only runs in the node that has to write the reply.
        The <code>langchain-typesafe</code> package wraps Jev as a normal
        Runnable, and adds experimental middleware for picking a model and
        checking tool calls in <code>create_agent</code>.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When not to use it
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Anything that has to write text: replies, summaries, code.</li>
        <li>Math, counting, and comparing dates. Do those in code.</li>
        <li>Images or audio. Jev reads text only.</li>
        <li>
          Big &ldquo;judge everything&rdquo; questions. Split them into small
          ones and combine the answers in code.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Also keep in mind that typed does not mean correct. Jev always
        returns a valid option, but it can still pick the wrong one. The
        confidence number is how you catch that.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The full details
      </h2>
      <p className="mb-6 leading-relaxed">
        This post is the short version. We wrote a full handbook with every
        detail, runnable code, and diagrams:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="/handbooks/jev/overview"
            className="font-semibold text-primaryColor hover:underline"
          >
            What is Jev?
          </a>
          : the model, when to use it, and when not to.
        </li>
        <li>
          <a
            href="/handbooks/jev/quickstart"
            className="font-semibold text-primaryColor hover:underline"
          >
            Your first call
          </a>
          : HTTP, Python, and TypeScript in five minutes.
        </li>
        <li>
          <a
            href="/handbooks/jev/question-types"
            className="font-semibold text-primaryColor hover:underline"
          >
            Choice, Score, Noul
          </a>
          : what each question type returns.
        </li>
        <li>
          <a
            href="/handbooks/jev/confidence"
            className="font-semibold text-primaryColor hover:underline"
          >
            Confidence &amp; thresholds
          </a>
          : turning probabilities into safe rules.
        </li>
        <li>
          <a
            href="/handbooks/jev/langgraph"
            className="font-semibold text-primaryColor hover:underline"
          >
            Jev in LangGraph &amp; LangChain
          </a>
          : a full router graph and the agent middleware.
        </li>
        <li>
          <a
            href="/handbooks/jev/ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            Jev with the Vercel AI SDK
          </a>
          : <code>experimental_evaluate</code>, routing, and tests.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Sources
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://docs.typesafe.ai/introduction"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            TypeSafe AI documentation
          </a>
        </li>
        <li>
          <a
            href="https://typesafe.ai/blog/introducing-system-one-models-and-jev"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing System One models and Jev (TypeSafe AI)
          </a>
        </li>
        <li>
          <a
            href="https://vercel.com/i/what-is-jev"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is Jev? (Vercel)
          </a>
        </li>
        <li>
          <a
            href="https://www.langchain.com/blog/building-a-harness-with-jev"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building a harness with Jev (LangChain)
          </a>
        </li>
      </ul>
    </div>
  );
}
