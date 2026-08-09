import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "twelve-factor-agents-production-2026",
  title:
    "12-factor agents in production 2026: Dex Horthy's principles for reliable LLM software",
  excerpt:
    "How the 12-factor agents methodology from HumanLayer's Dex Horthy became the reference checklist for teams shipping LLM software past the 80% quality wall. Covers the twelve factors, why frameworks stop helping past that wall, the stateless-reducer pattern, launch/pause/resume with human-in-the-loop, and how the factors show up in real production stacks in 2026.",
  metaDescription:
    "A practical, technical guide to the 12-factor agents methodology in 2026. Covers Dex Horthy and HumanLayer's twelve principles for building reliable LLM software (natural language to tool calls, own your prompts, own your context window, tools as structured outputs, unified execution and business state, launch/pause/resume APIs, contacting humans with tool calls, owning control flow, compacting errors, small focused agents, triggering from anywhere, stateless reducers), the pattern behind the 80% quality wall most teams hit, code samples for each factor, and how the principles map to LangGraph, Temporal, Inngest, HumanLayer, and custom stacks shipped in 2026.",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "12-Factor",
    "HumanLayer",
    "Production",
    "LLM",
    "Human-in-the-loop",
    "Architecture",
    "Best Practices",
  ],
  publishDate: "2026-08-02",
  readingTime: "17 min read",
};

export default function TwelveFactorAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In April 2025 Dex Horthy, the founder of HumanLayer,
        put a short document on GitHub called{" "}
        <em>12-factor agents</em>. Fifteen months later it
        has 25,000 stars, a conference talk with nearly
        300,000 views, and it is the piece of writing most
        of the founders we work with on client engagements
        point at when they explain why they ripped out their
        agent framework and rewrote the stack in plain code.
        This article is a walkthrough of the twelve factors,
        why they matter for teams stuck at the 80% quality
        wall, and how they map to the tools you actually
        ship with in 2026: LangGraph, Temporal, Inngest,
        HumanLayer, and a lot of hand-rolled TypeScript and
        Python.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why 12-factor agents became the reference checklist
      </h2>
      <p className="mb-6 leading-relaxed">
        Horthy&rsquo;s core observation is uncomfortable but
        true. Most products that call themselves &ldquo;AI
        agents&rdquo; in production are not the
        prompt-plus-tools-plus-loop pattern the frameworks
        sell. They are mostly deterministic software with
        LLM steps dropped in at a few carefully chosen
        points. When teams try to build the framework
        version end to end, they hit a familiar wall: pick a
        framework, get to 70-80% quality in a week, and then
        spend three months fighting the abstraction to push
        past 80%. Eventually most of them tear it up and
        write the stack themselves.
      </p>
      <p className="mb-6 leading-relaxed">
        The 12 factors are a distillation of what actually
        makes those hand-rolled stacks work. They are
        deliberately modular. Horthy is explicit that you
        should not adopt them as a religion or rewrite your
        product to use all twelve at once. Pick the one that
        maps to the pain you have this week, ship it, and
        move on. The methodology is a checklist for the
        engineer who wants deep control without a framework,
        and that is why it lands so hard with production
        teams.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>March 2025</strong>: Dex Horthy talks
          about early versions of the pattern on the Tool
          Use podcast. The core ideas are already there:
          agents as reducers, owning the prompt, and
          human-in-the-loop as a first-class tool call.
        </li>
        <li>
          <strong>April 2025</strong>: The{" "}
          <code>humanlayer/12-factor-agents</code> repo goes
          public with the first pass of the twelve
          factors, illustrated diagrams, and code snippets
          in TypeScript.
        </li>
        <li>
          <strong>May-June 2025</strong>: Community pull
          requests refine several factors. Factor 3
          (&ldquo;own your context window&rdquo;) gets its
          own page and becomes the entry point for many
          readers coming from the context-engineering
          debate. HumanLayer ships an npm package for the
          pause/resume patterns from Factor 6.
        </li>
        <li>
          <strong>July 3, 2025</strong>: Horthy gives the
          <em> 12-Factor Agents: Patterns of reliable LLM
          applications</em> talk at the AI Engineer
          World&rsquo;s Fair. The 17-minute video hits
          280k+ views by early 2026 and becomes the most
          shared reference for the methodology.
        </li>
        <li>
          <strong>Late 2025</strong>: DZone, Developer&rsquo;s
          Digest, and the AI Engineer Substack publish
          walkthrough articles. Framework maintainers
          (LangGraph, CrewAI, Inngest) start referring back
          to the factors when describing their own
          primitives.
        </li>
        <li>
          <strong>Q1 2026</strong>: HumanLayer publishes
          <code> got-agents/agents</code>, a set of
          open-source reference agents built with the
          methodology, plus{" "}
          <code>humanlayer/kubechain</code> as a tongue-in-
          cheek framework for running distributed agents
          on Kubernetes.
        </li>
        <li>
          <strong>Mid 2026</strong>: The 12 factors show up
          on internal engineering wikis at most of the
          production AI-first companies we advise. It has
          crossed from a blog post to a shared vocabulary
          teams argue about at code review.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The core insight: an agent is just a loop over an
        LLM call
      </h2>
      <p className="mb-6 leading-relaxed">
        Under all twelve factors sits a specific model of
        what an agent is. It is a small piece of code that
        does four things in a loop: ask the LLM for the
        next step, execute the tool the LLM asked for,
        append the result to a context, and repeat until a
        step marks the run as done.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/loop.ts (the shape every factor references)"
        code={`type Event =
  | { kind: "user_message"; text: string }
  | { kind: "tool_call"; name: string; args: object }
  | { kind: "tool_result"; name: string; data: object }
  | { kind: "done"; final: string };

async function runAgent(initial: Event): Promise<string> {
  const context: Event[] = [initial];

  while (true) {
    const next = await llm.determineNextStep(context);
    context.push(next);

    if (next.kind === "done") return next.final;

    const result = await executeStep(next);
    context.push(result);
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        Every factor is a design decision about that loop.
        Some are about what goes into the context. Some are
        about how the loop pauses, resumes, or hands off to
        a human. Some are about how the tool call is
        represented on the way out of the LLM. The factors
        are useful because they give you a language for
        arguing about one part of the loop at a time.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 1: Natural language to tool calls
      </h2>
      <p className="mb-6 leading-relaxed">
        The most valuable thing the LLM does in an agent is
        turn a user&rsquo;s free-form request into a
        structured tool call. Everything else in the loop
        (executing the tool, storing the state, calling the
        next model) is normal software. The point of
        Factor 1 is to notice that the LLM step is not the
        whole product. It is a single conversion from
        natural language to JSON, and it is one of the
        cheapest, most reliable things an LLM does.
      </p>
      <p className="mb-6 leading-relaxed">
        The practical consequence is that you can adopt one
        LLM step at a time into an existing product. You do
        not need to rebuild your entire flow as an agent
        graph to get the value. Take the one place where a
        user drops a paragraph of text and today you make
        them fill out a form, and replace that with an LLM
        that turns the paragraph into the form&rsquo;s
        fields. That is the whole agent, and it is enough
        to make the feature feel magical.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 2: Own your prompts
      </h2>
      <p className="mb-6 leading-relaxed">
        Do not let a framework generate the prompt string
        for you. The prompt is the single highest-leverage
        piece of code in the whole agent, and if you cannot
        read every character that gets sent to the model,
        you cannot debug the failure modes. Every mature
        team we have worked with keeps prompts as
        version-controlled text files or explicit template
        functions in the repo, with tests that assert on
        the exact rendered string.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/prompts.ts"
        code={`import { readFileSync } from "node:fs";

const CLASSIFIER_PROMPT = readFileSync(
  new URL("./prompts/classify_ticket.md", import.meta.url),
  "utf8",
);

export function classifyTicketPrompt(ticket: string): string {
  return CLASSIFIER_PROMPT.replace("{{TICKET}}", ticket);
}

// prompts/classify_ticket.md is a plain markdown file
// checked into the repo. Diff it in code review.`}
      />
      <p className="mb-6 leading-relaxed">
        The other side of &ldquo;own your prompts&rdquo; is
        that framework abstractions that hide the prompt
        (agent classes with a hundred hidden system
        messages, chain wrappers that inject their own
        few-shot examples) will bite you at the 80% wall.
        The moment you need to fix a specific failure, you
        are reverse-engineering the framework. Keep the
        prompt in your repo.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 3: Own your context window
      </h2>
      <p className="mb-6 leading-relaxed">
        The context window is not a chat log. It is a
        carefully constructed input to the model, and you
        should build it yourself for each step. Do not blindly
        append the entire conversation history plus every
        tool result verbatim: prune old turns that are no
        longer relevant, summarise long tool outputs, and
        move stable configuration into a system message. The
        cleanest agents have a{" "}
        <code>buildContext(state)</code> function that
        returns the exact array of messages for the next
        LLM call, and that function is where most of your
        engineering time will go.
      </p>
      <p className="mb-6 leading-relaxed">
        Factor 3 is the one Horthy pins at the front of the
        repo, and for good reason. It is the factor that
        the whole &ldquo;context engineering&rdquo;
        conversation of 2025-2026 grew out of. Frameworks
        that own the context window are the ones you fight
        with the hardest when quality plateaus. Owning it
        yourself is more code up front and less pain later.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 4: Tools are just structured outputs
      </h2>
      <p className="mb-6 leading-relaxed">
        A tool call is a JSON object the LLM produces. That
        is it. The word &ldquo;tool&rdquo; is convenient
        shorthand, but it hides a design mistake teams
        make: they treat &ldquo;tool calling&rdquo; as a
        different modality from &ldquo;structured
        output,&rdquo; and they end up with two parallel
        code paths in their agent. Factor 4 says to unify
        them. If your model can emit a JSON object that
        matches a schema, you can dispatch it to anything:
        a database call, a queued job, a UI action, a
        pause-for-human signal.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/tools.ts"
        code={`import { z } from "zod";

const NextStep = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("send_email"),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  z.object({
    intent: z.literal("ask_user"),
    question: z.string(),
  }),
  z.object({
    intent: z.literal("done"),
    final: z.string(),
  }),
]);

export type NextStep = z.infer<typeof NextStep>;

export async function decideNext(ctx: Event[]): Promise<NextStep> {
  const raw = await llm.chat({
    messages: buildContext(ctx),
    response_format: { type: "json_schema", schema: NextStep },
  });
  return NextStep.parse(JSON.parse(raw.content));
}`}
      />
      <p className="mb-6 leading-relaxed">
        With one discriminated union you have a language
        for every side effect the agent can take: tool
        calls, human-in-the-loop pauses, and termination
        all look the same on the wire. The dispatch code
        that turns that JSON into an action is plain
        TypeScript, testable, and reviewable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 5: Unify execution state and business state
      </h2>
      <p className="mb-6 leading-relaxed">
        A common anti-pattern is to keep two versions of
        the agent&rsquo;s state: the framework&rsquo;s
        internal graph state (which step is next, which
        tool ran, which retry we are on) and the
        product&rsquo;s domain state (which ticket we are
        working on, which customer, which SLA). When the
        two drift you get subtle bugs no one can reproduce.
        Factor 5 says to keep one row in one table. The
        agent&rsquo;s execution state <em>is</em> a
        business record.
      </p>
      <p className="mb-6 leading-relaxed">
        In practice we ship a Postgres row per agent run
        with the full event log, the current status, and
        the business fields (customer id, ticket id, plan,
        assignee) on the same record. The reducer that
        advances the agent reads and writes that one row.
        Debugging becomes &ldquo;select from
        <code>agent_runs</code> where id = X&rdquo; and the
        whole history is right there.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 6: Launch, pause, and resume with simple APIs
      </h2>
      <p className="mb-6 leading-relaxed">
        Real agents run for minutes to hours. They pause
        for a tool that takes time, for a human to approve
        a step, for a webhook to arrive. A production agent
        cannot be a Python process running in a while-loop;
        it has to be an object with a small HTTP surface
        for launch, pause, resume, and status.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/api.ts"
        code={`// POST /agents           -> start a run, return run_id
// GET  /agents/:id       -> current state
// POST /agents/:id/resume-> resume with a signal (approval, webhook)
// POST /agents/:id/cancel-> cancel

export async function POST_agents(req: Req): Promise<Res> {
  const run = await createAgentRun({
    initial_event: req.body,
    status: "running",
  });
  await enqueueStep(run.id);
  return { run_id: run.id, status: "running" };
}

export async function POST_resume(req: Req): Promise<Res> {
  const run = await getAgentRun(req.params.id);
  await appendEvent(run.id, {
    kind: "tool_result",
    name: req.body.tool,
    data: req.body.data,
  });
  await updateStatus(run.id, "running");
  await enqueueStep(run.id);
  return { run_id: run.id, status: "running" };
}`}
      />
      <p className="mb-6 leading-relaxed">
        Under the hood the queue can be Temporal, Inngest,
        a Postgres-backed job runner, or an SQS worker.
        What matters is that the agent&rsquo;s runtime is
        the same as any other long-running job in your
        product. When a human takes six hours to approve a
        step, the process is not blocked; it is just a row
        in a table waiting for a resume call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 7: Contact humans with tool calls
      </h2>
      <p className="mb-6 leading-relaxed">
        Human-in-the-loop is not a special mode. It is a
        tool call. When the agent decides it needs a human
        to look at something, it emits{" "}
        <code>{"{ intent: 'ask_user', question: '...' }"}</code>
        , the controller records the pause and pings the
        human (email, Slack, in-product), and when the
        human replies, the answer flows back into the
        context as a <code>tool_result</code>. The loop
        keeps going as if a service returned.
      </p>
      <p className="mb-6 leading-relaxed">
        This is the pattern HumanLayer&rsquo;s SDK is built
        around, and it removes a whole class of ugly code
        from the agent. There is no &ldquo;special
        interrupt&rdquo; branch. There is no synchronous
        wait. The human is just a slow tool that happens to
        take hours instead of milliseconds, and the same
        launch/pause/resume plumbing from Factor 6 handles
        both cases.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 8: Own your control flow
      </h2>
      <p className="mb-6 leading-relaxed">
        Do not let the model decide everything. Some
        transitions in your agent are always the same, and
        those should be in code. If step A always leads to
        step B when the ticket is a refund, that
        transition is a business rule, not a decision for
        the LLM. Hard-code it. Reserve the LLM for the
        decisions that genuinely need one.
      </p>
      <p className="mb-6 leading-relaxed">
        Factor 8 is what separates &ldquo;agent&rdquo; from
        &ldquo;LLM-powered workflow&rdquo; in Horthy&rsquo;s
        model. Most production agents are 90%
        deterministic control flow with LLM calls at the
        five branches that actually need judgement. That is
        not a limitation. That is the shape that ships.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 9: Compact errors into the context window
      </h2>
      <p className="mb-6 leading-relaxed">
        When a tool call fails, do not dump the stack trace
        into the context. Turn it into a short, structured
        error the LLM can reason about. A 4 KB Python
        traceback burns tokens, confuses the model, and
        buries the one line that mattered. A one-line
        &ldquo;the <code>send_email</code> tool failed with
        <em> recipient does not exist</em>&rdquo; keeps the
        loop moving and gives the LLM the information it
        needs to try a different tool.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/errors.ts"
        code={`export async function safeExecute(step: NextStep): Promise<Event> {
  try {
    const data = await dispatch(step);
    return { kind: "tool_result", name: step.intent, data };
  } catch (err) {
    return {
      kind: "tool_result",
      name: step.intent,
      data: {
        error: true,
        code: classifyError(err),
        message: shortMessage(err),
      },
    };
  }
}

function classifyError(err: unknown): string {
  if (err instanceof HttpError && err.status === 404) return "not_found";
  if (err instanceof HttpError && err.status >= 500) return "upstream_5xx";
  if (err instanceof ValidationError) return "invalid_args";
  return "unknown";
}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 10: Small, focused agents
      </h2>
      <p className="mb-6 leading-relaxed">
        One agent per job. Not one mega-agent with 40
        tools. Small agents are easier to prompt, easier to
        evaluate, and easier to reason about when they go
        wrong. They also compose: a router agent picks
        which specialist to run; each specialist has a
        short prompt, five to ten tools, and one clear
        exit condition.
      </p>
      <p className="mb-6 leading-relaxed">
        Horthy points out the other benefit: small agents
        do not need frontier models. A specialist with a
        narrow job and a tight prompt runs fine on a
        cheaper model, and the whole system gets cheaper
        as you decompose. This is the same insight that
        the SLM (small language model) literature landed
        on in 2025-2026, arriving from the other
        direction.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 11: Trigger from anywhere, meet users where
        they are
      </h2>
      <p className="mb-6 leading-relaxed">
        A production agent should be triggerable from
        anywhere the work naturally starts: a webhook, an
        email, a Slack message, a cron, a UI button, a
        push from a mobile app. Treat the trigger as a
        thin adapter that constructs the initial event and
        posts it to the launch endpoint from Factor 6.
        Same agent, different mouths.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/triggers.ts"
        code={`// Slack slash command trigger
app.post("/slack/commands/summarise", async (req, res) => {
  const run = await startAgent({
    kind: "user_message",
    text: req.body.text,
    source: "slack",
    channel: req.body.channel_id,
  });
  res.json({ text: \`Started run \${run.run_id}\` });
});

// Zendesk webhook trigger
app.post("/webhooks/zendesk/ticket_created", async (req, res) => {
  await startAgent({
    kind: "user_message",
    text: req.body.ticket.description,
    source: "zendesk",
    ticket_id: req.body.ticket.id,
  });
  res.status(202).end();
});`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Factor 12: Make your agent a stateless reducer
      </h2>
      <p className="mb-6 leading-relaxed">
        This is the one that ties the rest together. Model
        your agent as a pure function{" "}
        <code>reduce(state, event) -&gt; state</code>. The
        state is a serialisable object (typically the event
        log plus a summary). The event is whatever just
        happened: a user message, a tool result, a resume
        signal. The reducer is deterministic given the
        state and the event. The LLM call is one of the
        events, not part of the reducer.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/reducer.ts"
        code={`type State = { events: Event[]; status: "running" | "paused" | "done" };

export function reduce(state: State, event: Event): State {
  const events = [...state.events, event];

  switch (event.kind) {
    case "tool_call":
      if (event.name === "ask_user") return { events, status: "paused" };
      return { events, status: "running" };

    case "tool_result":
      return { events, status: "running" };

    case "done":
      return { events, status: "done" };

    default:
      return { events, status: state.status };
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        Once the agent is a reducer, every hard thing
        becomes easy. You can replay a run to reproduce a
        bug (just fold the reducer over the stored event
        log). You can snapshot mid-run and resume later
        (persist the state, load it back, feed the next
        event). You can distribute the runtime across
        machines because there is no in-process state to
        carry. This is why teams that adopt this factor
        stop needing most of what the frameworks provide.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Putting the factors together: the agent runtime
      </h2>
      <p className="mb-6 leading-relaxed">
        The reference shape that comes out of the twelve
        factors is a small runtime you can hold in your
        head. A queue holds pending work. A reducer folds
        events into state. Prompts live in the repo. Tools
        are dispatched from typed JSON. Humans are just
        slow tools. The runtime is a stateless worker that
        pulls a job, folds one step, and puts the result
        back.
      </p>
      <CodeBlock
        language="bash"
        filename="12-factor agent runtime, laid out end to end"
        code={`+---------------------------------------------------------+
|  Triggers (Factor 11)                                    |
|  webhook / slack / email / cron / UI / mobile push       |
+----------------------+----------------------------------+
                       |
                       v
+---------------------------------------------------------+
|  POST /agents  (Factor 6 launch)                         |
|  writes one row into agent_runs (Factor 5)               |
+----------------------+----------------------------------+
                       |
                       v
+---------------------------------------------------------+
|  Queue                                                   |
|  (Temporal / Inngest / Postgres jobs / SQS)              |
+----------------------+----------------------------------+
                       |
                       v
+---------------------------------------------------------+
|  Worker  ( == reduce(state, event) ) (Factor 12)         |
|                                                          |
|   1. load state from agent_runs                          |
|   2. buildContext(state)   (Factor 3)                    |
|   3. LLM emits typed NextStep JSON  (Factors 1, 4)       |
|   4. dispatch:                                           |
|      - tool_call       -> safeExecute + compact error    |
|                          (Factor 9)                      |
|      - ask_user        -> HumanLayer notify + pause      |
|                          (Factor 7)                      |
|      - deterministic   -> hard-coded transition          |
|                          (Factor 8)                      |
|      - done            -> mark run done                  |
|   5. append event to state, save row                     |
+----------------------+----------------------------------+
                       |
                       v
+---------------------------------------------------------+
|  Resume (Factor 6)                                       |
|  POST /agents/:id/resume with a tool_result event        |
|  and the worker picks up where it left off               |
+---------------------------------------------------------+`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the 12 factors show up in the tools you
        already use
      </h2>
      <p className="mb-6 leading-relaxed">
        You can adopt the factors on top of almost any
        stack. The right lens is to check which factors
        your current framework enforces, which it lets you
        opt into, and which it fights.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>LangGraph</strong> gives you Factors 5, 6,
        and 12 for free through its state graph, durable
        checkpoints, and reducer-shaped nodes. You still
        have to own Factors 2 and 3 yourself: build the
        context and the prompt for each node, do not let a
        prebuilt agent template render them for you.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Temporal and Inngest</strong> are the
        default choices for the runtime side of Factors 6
        and 12. Both give you durable workflows with
        launch/pause/resume as native primitives. Neither
        cares whether the step inside a workflow is a
        database write, an HTTP call, or an LLM call; that
        is exactly the shape the 12 factors want.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>HumanLayer&rsquo;s SDK</strong> covers
        Factor 7 (human-as-a-tool) end to end. It handles
        notifying the human, waiting for the reply, and
        routing the response back into the agent&rsquo;s
        context as a tool result. When the pain point is
        approval flows or human review, this is the fastest
        adoption path.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP servers</strong> are the standard way
        Factor 4 (tools as structured outputs) crosses
        process boundaries in 2026. An MCP server exposes
        tools with typed schemas; the agent&rsquo;s
        controller dispatches the structured output the
        LLM emits into a call against the server. Same
        shape, different transport.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Plain code</strong> is the honest answer
        for the small parts. A Postgres table for
        <code> agent_runs</code>, a queue you already have,
        a prompt in a markdown file, a Zod discriminated
        union, and a dispatcher. This is what most of the
        production agents we have shipped in 2026 look
        like on the inside.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns we ship on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Adopt one factor at a time</strong>. The
        methodology is deliberately modular. Pick the one
        that maps to your current pain (context bloat is
        Factor 3, silent errors are Factor 9, framework
        drift is Factor 2) and ship that one first. Do not
        rewrite the whole agent.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Store the whole event log</strong>.
        Every event that enters the reducer goes into a
        table. Debugging a bad run means folding the
        reducer over the event log and inspecting the
        state at each step. Without this, agent debugging
        is a black box.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Version prompts alongside code</strong>.
        Prompt changes are code changes. They go through
        code review. They land with an eval score in the
        PR description. Skipping this is how you get a
        silent regression six weeks after a &ldquo;small
        prompt tweak.&rdquo;
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Make the human tool the same shape as
        the machine tools</strong>. When a support agent
        pauses for a manager to approve a refund, the
        pause is a{" "}
        <code>tool_call</code> with{" "}
        <code>intent: &quot;request_approval&quot;</code>.
        The manager&rsquo;s Yes/No comes back as a{" "}
        <code>tool_result</code>. The reducer does not
        care that a human was in the middle.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Keep the LLM decision surface
        small</strong>. Every branch you can turn into a
        deterministic transition is a branch that will not
        break in production. Reserve the LLM for the
        decisions that genuinely need judgement.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Compact tool errors before they hit
        the context</strong>. Long stack traces poison the
        context window. Classify the error, keep the code
        and one line of message, drop the rest. The LLM
        will pick a better next step from a short error
        than a noisy one.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Deploy the runtime with the same tools
        as the rest of your product</strong>. If you use
        Temporal for jobs, the agent worker is a Temporal
        workflow. If you use a Postgres queue, the agent
        step is a queue task. Do not stand up a special
        agent runtime that lives alongside everything else
        and needs its own on-call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Where the methodology wins</strong>. Teams
        push past the 80% quality wall faster because they
        can debug and change any part of the loop. New
        engineers ramp on the agent the same way they ramp
        on any other service in the codebase. The agent
        moves at the pace of the product because it is
        built out of the same primitives. And the runtime
        cost drops because most of the loop is code, not
        LLM calls.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Where it slows you down</strong>. If you
        are building a prototype to demo next week, a
        framework will get you there faster and the 12
        factors will feel like premature engineering. If
        your entire agent is a single LLM call plus one
        tool, there is nothing to decompose yet. And if
        the team does not have strong software engineers,
        the factors put more weight on your dispatch code,
        your state machine, and your queue than most
        framework paths do.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to use the 12 factors, and when not to
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Use them</strong> when you are past the
        prototype, when the agent is meaningfully in front
        of real customers, when the failure modes matter
        (revenue, safety, trust), or when you have already
        felt the 80% wall on a framework build. The
        factors are the fastest documented path we know of
        from prototype to a reliable production agent.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Do not use them</strong> as a rewrite
        mandate. Do not tear up a working agent to hit
        twelve out of twelve. Pick the one that maps to
        the pain you have today, ship it, and pick the
        next one when the next pain shows up. Horthy is
        explicit about this: the methodology is a set of
        modular ideas, not a religion.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: what to watch through the rest of
        2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Frameworks growing into the factors</strong>.
        LangGraph, CrewAI, and the OpenAI Agents SDK have
        all added primitives that map to individual
        factors (durable state, structured outputs, human
        interrupts) since 2025. Expect the vocabulary of
        the 12 factors to keep leaking into framework
        documentation and API design through the rest of
        2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-native durable execution</strong>.
        Temporal, Inngest, Restate, and Convex all
        published patterns in 2025-2026 for running agent
        loops as durable workflows. The Factor 6 and 12
        combination is where the LLM world meets the
        durable-execution world, and the tooling is
        catching up fast.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Human-in-the-loop as a first-class
        product</strong>. HumanLayer, Adept, and half a
        dozen others are turning Factor 7 into a shipped
        product surface: SDKs, dashboards for pending
        approvals, and integrations with Slack, email,
        and in-app UIs. Expect this to be the default
        rather than a bespoke build by the end of 2026.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Factor 13 (pre-fetch) getting louder</strong>.
        The appendix factor (pre-fetch context the agent
        will likely need) is showing up in more real
        stacks as models get faster and the cost of
        speculation drops. Watch for this to be promoted
        into the main list in the next iteration of the
        methodology.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: mostly software, sprinkled with LLM
      </h2>
      <p className="mb-6 leading-relaxed">
        The most important thing the 12 factors do is
        change the mental model. An agent stops being a
        black box that owns your product and becomes a
        small piece of software you can read, test, and
        debug. The LLM step is one of the tools the
        software uses, not the thing the software is. That
        mental model is what lets teams push past the 80%
        wall, and it is why the methodology keeps spreading
        through production engineering groups even as the
        underlying models keep changing.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements our default is to start with
        Factors 2, 3, 5, and 12 (own your prompts, own
        your context, unify state, agent as reducer). Those
        four alone remove most of the framework pain and
        set the shape everything else grows on top of. From
        there the team adds Factors 6 and 7 the moment
        human review lands in the requirements, and Factor
        9 the first time a stack trace shows up in the
        prompt. That is a two-week adoption path, not a
        rewrite, and it is the path most of the production
        agents we ship in 2026 have walked.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://github.com/humanlayer/12-factor-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            humanlayer/12-factor-agents on GitHub
          </a>
          {" "}- the canonical source, 25k stars, with a
          dedicated markdown page per factor and diagrams.
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=8kMaTybvDUw"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            12-Factor Agents: Patterns of reliable LLM
            applications - Dex Horthy (AI Engineer
            World&rsquo;s Fair 2025)
          </a>
          {" "}- the 17-minute conference talk that put the
          methodology on the map.
        </li>
        <li>
          <a
            href="https://www.humanlayer.dev/12-factor-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HumanLayer: 12 Factor Agents landing page
          </a>
          {" "}- the vendor-facing summary from the team
          behind the methodology, with links to their SDK
          and workshops.
        </li>
        <li>
          <a
            href="https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Factor 3: Own your context window
          </a>
          {" "}- the deep dive on the factor the community
          spends the most time arguing about, and the entry
          point for readers new to context engineering.
        </li>
        <li>
          <a
            href="https://12factor.net/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            12factor.net - the original 12-Factor App
            methodology (Heroku, 2011)
          </a>
          {" "}- the source that the agent factors are
          modelled on, worth reading for the shape of the
          argument.
        </li>
        <li>
          <a
            href="https://dzone.com/articles/understanding-twelve-factor-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DZone: The Twelve-Factor Agents - Building
            Production-Ready LLM Apps
          </a>
          {" "}- an independent walkthrough with additional
          examples and framing for enterprise readers.
        </li>
        <li>
          <a
            href="https://www.developersdigest.tech/blog/12-factor-agents-production-principles"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer&rsquo;s Digest: 12-Factor Agents,
            Production Principles for Reliable AI Agents
          </a>
          {" "}- a plain-English recap of the factors with
          a practical adoption checklist.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/engineering/building-effective-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Building Effective Agents
          </a>
          {" "}- the piece Horthy links to when contrasting
          the &ldquo;bag of tools plus loop&rdquo; pattern
          with production reality.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the deeper read on Factor 3 (own your
          context window) and the patterns that grow out of
          it.
        </li>
        <li>
          <a
            href="/articles/durable-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Durable AI agents in 2026
          </a>
          {" "}- the runtime side of Factors 6 and 12, with
          Temporal, Inngest, and Restate patterns.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the natural next step for Factor 10 when
          the small focused agents start composing.
        </li>
        <li>
          <a
            href="/articles/production-ai-agents-tool-use"
            className="font-semibold text-primaryColor hover:underline"
          >
            Production AI agents and tool use
          </a>
          {" "}- the tool-calling side of Factors 1 and 4
          in more depth.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that makes the
          event-log approach in Factor 5 debuggable.
        </li>
      </ul>
    </div>
  );
}
