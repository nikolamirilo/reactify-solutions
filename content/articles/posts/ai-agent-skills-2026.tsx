import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 22,
  slug: "ai-agent-skills-2026",
  title:
    "AI Agent Skills in 2026: composable capabilities, progressive disclosure, and the open standard that replaced one-shot prompts",
  excerpt:
    "Why Anthropic's Agent Skills standard collapsed the per-prompt customization problem, how progressive disclosure keeps the context window cheap while the skill library grows, and the SKILL.md patterns that ship across Claude, OpenAI, Cursor, Gemini, Junie, Goose, and 26 other tools.",
  metaDescription:
    "A practical, technical guide to Agent Skills in 2026. Covers the SKILL.md specification, three-level progressive disclosure, scripts/references/assets folder structure, the December 2025 open standard and 32-tool adoption, how Skills differ from MCP, tools, prompts, and subagents, security risks and prompt-injection mitigations, enterprise governance, and worked examples for Claude Code, the Claude Agent SDK, and the Vercel AI SDK.",
  image:
    "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Agent Skills",
    "SKILL.md",
    "Claude",
    "Open Standard",
    "Production",
  ],
  publishDate: "2026-06-13",
  readingTime: "17 min read",
};

export default function AiAgentSkills2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2024, every team shipping an AI agent had the same
        secret problem: a sprawling system prompt that nobody owned, a
        few thousand lines of brittle &ldquo;remember to do X if Y&rdquo;
        rules, and a context window that kept getting heavier as the
        product matured. Skills are the pattern that fixed it.
        Anthropic introduced Agent Skills in October 2025, opened the
        SKILL.md specification on December 18, 2025, and by March 2026
        thirty-two tools &mdash; Claude Code, OpenAI Codex CLI,
        ChatGPT, Cursor, GitHub Copilot, VS Code, Google Gemini CLI,
        JetBrains Junie, AWS Kiro, Block Goose, Sourcegraph Amp,
        Snowflake, Databricks, ByteDance TRAE, Mistral &mdash; were
        all reading the same files from the same directory layout.
        This post is what skills actually are, why progressive
        disclosure is the load-bearing idea, how skills sit alongside
        tools and MCP without overlapping them, and the patterns we
        use when we ship them into production.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why one-shot prompts hit a wall
      </h2>
      <p className="mb-6 leading-relaxed">
        The first wave of LLM customization was the system prompt.
        Append the company tone-of-voice rules, the data-handling
        policy, the &ldquo;always cite sources&rdquo; instruction, the
        list of approved libraries, the deployment checklist. The
        prompt grew by a paragraph every sprint. Six months in, the
        prompt was longer than the user&rsquo;s actual question, every
        new instruction risked colliding with an old one, and a third
        of the model&rsquo;s attention was spent on rules that had
        nothing to do with the current task. Lengthy prompts also
        broke the cost story: every request paid for every rule, even
        the ones the model would never need to apply.
      </p>
      <p className="mb-6 leading-relaxed">
        Plug-in style approaches landed next. OpenAI&rsquo;s GPTs let
        you bundle instructions and files into a named persona;
        custom GPTs gave teams a way to package a workflow without
        editing the base prompt. The problem flipped: the bundle was
        opaque, the instructions lived in a vendor UI, the files were
        not versionable, and the &ldquo;skill&rdquo; could not be
        composed with another. You either invoked the right custom
        GPT or you did not. Teams ended up with dozens of
        near-duplicate GPTs that drifted out of sync.
      </p>
      <p className="mb-6 leading-relaxed">
        The Agent Skills pattern starts from a different premise. A
        skill is a folder on disk. It contains a single
        <code> SKILL.md</code> file with a two-line YAML
        header and a markdown body. The agent reads the headers of
        every available skill at session start, decides which skill
        is relevant when the user asks something, loads the body of
        that skill into context, and only then reaches for the
        scripts, references, or assets the skill points at. The full
        weight of a skill never enters the context window until the
        model has chosen to use it. The specification is small enough
        to read over a coffee, the files are versionable in git, and
        the same folder runs unchanged across Claude Code, ChatGPT,
        Cursor, Gemini CLI, and the rest of the adopter list.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The three-level progressive disclosure architecture
      </h2>
      <p className="mb-6 leading-relaxed">
        Progressive disclosure is the load-bearing idea. The agent
        loads information about a skill at three escalating levels
        of detail, paying context tokens only at the level it has
        chosen to engage with. The model never reads what it does
        not need.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Level 1 &mdash; metadata (~100 tokens per
          skill).</strong> At session start the runtime scans every
          available skill folder, reads only the YAML frontmatter,
          and concatenates the names and descriptions into a
          compact catalog injected into the system prompt. Twenty
          skills cost roughly two thousand tokens at startup
          instead of the forty thousand a naive
          &ldquo;everything-everywhere&rdquo; approach would burn.
          The model has just enough information to decide which
          skill matches the current request, the same way a human
          reads a table of contents.
        </li>
        <li>
          <strong>Level 2 &mdash; full instructions (under five
          thousand tokens).</strong> Once the model decides a skill
          applies, the runtime loads the entire markdown body of
          that skill&rsquo;s <code>SKILL.md</code>. This is the
          procedural knowledge: the steps, the judgement calls,
          the edge cases, the references to scripts and assets. The
          ceiling on body length is a design constraint, not a
          technical one: anything longer than five thousand tokens
          probably wants to be a reference file the body points at,
          not an instruction the agent reads up-front.
        </li>
        <li>
          <strong>Level 3 &mdash; bundled resources (loaded on
          demand).</strong> Scripts, schemas, brand guidelines,
          policy documents, sample data, and templates live in
          subdirectories alongside <code>SKILL.md</code>. The body
          tells the agent which files to read and when. The
          payload only enters the context window the moment the
          agent reads a specific file or runs a specific script,
          which means a skill with five megabytes of reference
          material costs zero tokens until the model needs the
          content.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The mental model that helps the most is to think of skills
        as lazy-loaded modules in a long-running runtime. The
        startup cost is fixed and tiny; the per-skill cost is
        amortised over the requests that actually invoke it. A
        finance agent might carry twelve skills covering closing
        workflows, board-deck generation, variance analysis, and
        regulatory filings, and a typical request will pay for
        exactly one of them.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Anatomy of a SKILL.md file
      </h2>
      <p className="mb-6 leading-relaxed">
        The spec is intentionally minimal. A skill folder must
        contain a file called <code>SKILL.md</code> whose name
        matches the parent directory. The file starts with a YAML
        frontmatter block delimited by <code>---</code>, contains
        two required keys, and is followed by an unrestricted
        markdown body. Everything else &mdash; the optional
        frontmatter keys, the directory structure, the helper
        scripts &mdash; is layered on top.
      </p>
      <CodeBlock
        language="markdown"
        filename="pdf-invoice-extractor/SKILL.md"
        code={`---
name: pdf-invoice-extractor
description: Extract structured line items, totals, and supplier
  metadata from PDF invoices. Use when the user uploads an invoice,
  asks to "pull the numbers out of this PDF", or wants invoice data
  loaded into a spreadsheet.
when_to_use: Trigger on any uploaded PDF whose first page contains
  the word "Invoice", "Tax Invoice", "Receipt", or a recognisable
  invoice number pattern.
allowed-tools:
  - read_file
  - run_skill_script
  - write_file
argument-hint: Path to the PDF file to extract, plus an optional
  output spreadsheet path.
---

# PDF Invoice Extractor

You are extracting structured data from a PDF invoice.

## Steps

1. Read the PDF text layer with \`scripts/extract_text.py\`. If the
   text layer is empty or below 50 characters, fall back to the OCR
   path in \`scripts/ocr.py\`.
2. Parse the header (supplier name, invoice number, dates, currency)
   using the regular expression library in \`references/regex_patterns.md\`.
3. Parse the line-item table. Most invoices follow one of the four
   layouts catalogued in \`references/layouts.md\`; identify the
   layout first, then iterate.
4. Validate the extracted totals against the line-item sum. If the
   delta is greater than two cents, flag the result and stop.
5. Write the structured output to the spreadsheet path the user
   provided, using the column headers in \`assets/output_template.xlsx\`.

## Edge cases

- Multi-page invoices: stitch tables across pages before parsing.
- Foreign currency: capture the ISO 4217 code; do not convert.
- Hand-written amendments: never trust them; flag for human review.
`}
      />
      <p className="mb-6 leading-relaxed">
        Three fields carry the contract. <strong>name</strong> is
        required, capped at 64 characters, lowercase letters,
        numbers, and hyphens only, and must match the parent
        directory. <strong>description</strong> is required, capped
        at 1024 characters, and is the most important sentence in
        the entire skill &mdash; it is what the agent reads when
        deciding whether to invoke the skill. A vague description
        means the skill never fires; an overly broad one means it
        fires for everything. The discipline is to lead with
        capability and follow with trigger conditions: &ldquo;Do X
        when Y&rdquo; is the shape that survives integration with
        the rest of the catalog.
      </p>
      <p className="mb-6 leading-relaxed">
        The optional frontmatter fields earn their place quickly.{" "}
        <code>when_to_use</code> is the extended trigger
        documentation, useful when the description has to stay
        short for the catalog but the activation rules need more
        nuance. <code>allowed-tools</code> restricts the tools the
        agent may call while the skill is active, which is the
        single most effective lever for keeping a skill from
        drifting outside its lane. <code>argument-hint</code> tells
        the agent what input the skill expects when invoked
        explicitly through a slash command or programmatic call.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Folder structure: scripts, references, assets
      </h2>
      <p className="mb-6 leading-relaxed">
        The body of a <code>SKILL.md</code> file does not contain
        the heavy material. It points at it. The convention that
        emerged across the adopter ecosystem is a three-folder
        layout sitting alongside <code>SKILL.md</code>.
      </p>
      <CodeBlock
        language="text"
        filename="pdf-invoice-extractor/"
        code={`pdf-invoice-extractor/
├── SKILL.md            # required: frontmatter + procedural instructions
├── scripts/            # executable logic the agent runs via bash
│   ├── extract_text.py
│   ├── ocr.py
│   └── validate_totals.py
├── references/         # markdown the agent reads on demand
│   ├── regex_patterns.md
│   └── layouts.md
└── assets/             # static files used as inputs or outputs
    └── output_template.xlsx`}
      />
      <p className="mb-6 leading-relaxed">
        Each folder has a clean purpose. <strong>scripts/</strong>{" "}
        holds executable logic: Python, JavaScript, Bash &mdash;
        anything the agent can invoke via a shell. The agent calls
        a runtime-provided helper (Claude Code surfaces it as the{" "}
        <code>run_skill_script</code> tool, the Claude Agent SDK as{" "}
        <code>tools.run_script</code>) and receives only the
        script&rsquo;s output. The script body never enters the
        context window, which means a 500-line parser costs zero
        tokens regardless of how often the agent runs it.
        <strong> references/</strong> holds documentation the agent
        reads on demand: regex tables, schema definitions,
        rulebooks, examples. The body of <code>SKILL.md</code>{" "}
        names the reference and the agent decides whether to open
        it. <strong>assets/</strong> holds static files used as
        inputs or outputs: spreadsheet templates, brand kits,
        sample data, image stubs.
      </p>
      <p className="mb-6 leading-relaxed">
        The separation is not cosmetic. Each folder maps to a
        different load mechanism and a different security posture.
        Scripts execute with the runtime&rsquo;s sandbox
        permissions, references are read-only text, assets are
        binary payloads that get copied rather than parsed.
        Treating the three differently is what lets a skill
        author reason about what an agent can do at each step.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Skills, MCP, tools, and subagents &mdash; where each fits
      </h2>
      <p className="mb-6 leading-relaxed">
        The biggest cause of confusion in 2026 is teams treating
        skills, tools, MCP servers, and subagents as competing
        answers to the same question. They are not. They sit on
        different layers of the agent stack and a serious
        production agent uses all four. The shorter version: a
        skill is procedural knowledge, a tool is a deterministic
        action, an MCP server is a portable contract for tools and
        data, and a subagent is an independent identity that does
        the work.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Skills</strong> are how to do something the
          model already knows how to think about. A code review
          playbook, a tone-of-voice guide, a financial closing
          procedure, a deployment checklist. The model reads the
          skill and applies the procedural knowledge using
          whatever tools it has available. Pick a skill when the
          gap is &ldquo;the agent needs to follow our specific
          process, in our specific order, with our specific
          judgement calls.&rdquo;
        </li>
        <li>
          <strong>Tools</strong> are deterministic actions with
          typed inputs and outputs. <code>create_ticket</code>,{" "}
          <code>send_webhook</code>, <code>query_warehouse</code>.
          The model calls the tool, the runtime executes it, the
          result comes back as a structured value. Pick a tool
          when the gap is &ldquo;the agent needs to perform a
          discrete action against a specific API my application
          already owns.&rdquo;
        </li>
        <li>
          <strong>MCP servers</strong> are reusable, portable
          tool-and-data contracts. The Notion MCP server exposes
          Notion read/write tools to any MCP-compatible host;
          the Linear server does the same for Linear. Pick MCP
          when the gap is &ldquo;multiple hosts, multiple
          developers, or multiple applications need the same
          contract to the same external system.&rdquo;
        </li>
        <li>
          <strong>Subagents</strong> are independent agent
          identities the orchestrator can hand work to, each
          with its own context, role, and tool set. The
          orchestrator is the conductor, the subagents are the
          specialists. Pick a subagent when the gap is &ldquo;a
          single agent loop cannot carry both the breadth of the
          plan and the depth of one of its steps in the same
          context window.&rdquo;
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        A typical production agent layers all four. The skill
        catalog encodes the procedures. MCP servers expose the
        data and the long-lived integrations. Inline tools cover
        the deterministic actions specific to this application.
        Subagents handle the parts where the orchestrator&rsquo;s
        context budget is too thin to also reason about the
        details. The mistake is forcing one layer to do another
        layer&rsquo;s job: a tool with a 4,000-token system
        prompt is a skill in the wrong place, an MCP server with
        opinionated business logic is a skill exported into the
        wrong layer, and a subagent that runs a hard-coded
        deterministic script is a tool dressed up as an identity.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Using skills from the Claude Agent SDK
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agent SDK is the cleanest place to see the mechanism
        end-to-end. The skill folder lives in the project, the
        SDK is pointed at the skills directory, and the runtime
        does the rest: scanning the YAML, building the catalog,
        loading bodies on demand, and granting access to scripts
        only when the body explicitly references them.
      </p>
      <CodeBlock
        language="typescript"
        filename="invoice_agent.ts"
        code={`// A Claude Agent SDK loop that loads skills from disk. The runtime
// builds the skill catalog at startup, picks the relevant skill on
// each turn, and only loads bodies and scripts as the model decides
// to use them.

import { Agent, defineTool, loadSkills } from "@anthropic-ai/agent-sdk";
import { z } from "zod";

// Load every skill folder under ./skills. Only the frontmatter is
// read up-front; bodies, scripts, and references are lazy-loaded.
const skills = await loadSkills({ directory: "./skills" });

// Inline tools the application owns. The pdf-invoice-extractor skill
// will reach for write_invoice_row when it needs to write a parsed
// row to the warehouse.
const writeInvoiceRow = defineTool({
  name: "write_invoice_row",
  description: "Write a parsed invoice row to the finance warehouse.",
  input: z.object({
    supplierId: z.string(),
    amountCents: z.number().int(),
    currency: z.string().length(3),
    invoiceNumber: z.string(),
  }),
  execute: async (input) => {
    return warehouse.invoices.insert(input);
  },
});

const agent = new Agent({
  model: "claude-opus-4-8",
  skills,
  tools: [writeInvoiceRow],
  system: \`You are the finance back-office agent. Apply the most
relevant skill from the catalog when the user's request matches it.
Refuse requests outside the finance domain.\`,
});

// A typical request: the agent reads the skill catalog (Level 1),
// matches "pdf-invoice-extractor", loads the body (Level 2), and
// only reads references/layouts.md or runs scripts/ocr.py when the
// procedure in the body says so (Level 3).
const result = await agent.run({
  input: "Pull the line items out of /uploads/acme-2026-04.pdf and load them.",
  attachments: ["/uploads/acme-2026-04.pdf"],
});

console.log(result.summary);`}
      />
      <p className="mb-6 leading-relaxed">
        Two things in this snippet do the structural work. The
        <code> loadSkills </code> call returns lazy handles, not
        the full content; the directory could contain a hundred
        skills and the SDK still loads only the YAML at startup.
        The <code>defineTool</code> call defines the application
        boundary: skills can reach for the tool, but the tool
        itself enforces the contract (typed input, typed output,
        application-owned execution). The skill stays
        procedural, the tool stays deterministic, the boundary
        stays clean.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Skills in Claude Code: project, user, and plugin scopes
      </h2>
      <p className="mb-6 leading-relaxed">
        Claude Code resolves skills from three scopes in order of
        precedence. Project-scoped skills live in{" "}
        <code>.claude/skills/</code> at the repository root and
        ship with the code. User-scoped skills live in{" "}
        <code>~/.claude/skills/</code> and follow the developer
        across projects. Plugin-scoped skills come from installed
        plugins and are namespaced under the plugin name. The
        resolution order means a project skill of the same name
        wins over a user skill, which wins over a plugin skill,
        which is the right precedence for a team that wants the
        repo to be the source of truth.
      </p>
      <CodeBlock
        language="text"
        filename="repository layout"
        code={`acme-finance/
├── .claude/
│   └── skills/
│       ├── pdf-invoice-extractor/
│       │   ├── SKILL.md
│       │   ├── scripts/
│       │   └── references/
│       ├── monthly-close/
│       │   └── SKILL.md
│       └── board-deck-builder/
│           ├── SKILL.md
│           └── assets/
├── src/
└── package.json`}
      />
      <p className="mb-6 leading-relaxed">
        The pattern that scales best is treating the skill catalog
        as a versioned product. Skills land in pull requests like
        any other change. The reviewer reads the frontmatter to
        check the trigger language, scans the body for procedural
        drift, and runs the scripts in a sandbox to validate
        behaviour. The team that ships a hundred skills without
        review chaos is the team that put the skill catalog
        through the same code-review gate as the rest of the
        codebase.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Skills outside Claude: the December 2025 open standard
      </h2>
      <p className="mb-6 leading-relaxed">
        Anthropic published the Agent Skills specification at{" "}
        <code>agentskills.io</code> on December 18, 2025 as an
        open standard. Within forty-eight hours Microsoft
        integrated the format into VS Code and the agent runtime
        that powers Copilot, OpenAI added it to ChatGPT and the
        Codex CLI, and the early Cursor and Windsurf builds
        landed support behind a flag. By March 2026 the
        published adopter list was thirty-two tools deep,
        spanning every major coding agent (Claude Code, Cursor,
        Codex, Copilot, Junie, Kiro, Goose, Amp, TRAE), every
        major terminal agent (Gemini CLI, Codex CLI), and a long
        tail of enterprise platforms (Snowflake, Databricks,
        Mistral, ServiceNow). The same skill folder runs
        unchanged across all of them, which is the first time the
        agent ecosystem has had a portable customization unit at
        all.
      </p>
      <p className="mb-6 leading-relaxed">
        The interoperability story is not free. Each runtime
        implements the loader its own way; the skill discovery
        path, the script execution sandbox, and the
        tool-allowlist enforcement all vary. The spec is
        portable; the runtime around it is not. The practical
        rule we follow is to author skills against the spec, run
        them against the runtime the team actually ships on, and
        version any runtime-specific extensions out of the
        published catalog.
      </p>
      <p className="mb-6 leading-relaxed">
        The pattern that emerged in the marketplace tier is
        explosive. Vercel&rsquo;s <code>skills.sh</code>{" "}
        marketplace listed 89,753 published skills by April 2026.
        Anthropic open-sourced seventeen production-grade skills
        of its own covering PDF, Excel, Word, and PowerPoint
        generation, brand-asset enforcement, code review, and
        document QA. The github.com/anthropics/skills repository
        became the canonical reference implementation; teams
        forked it for company-specific variants. The shape of the
        catalog will keep shifting, but the format is stable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world deployments
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Finance back-office automation.</strong>{" "}
          Monthly close has become the canonical skills-based
          workflow. A <code>variance-analysis</code> skill
          handles ledger comparison; a{" "}
          <code>narrative-generator</code> skill turns the
          variances into the prose that goes into the board
          deck; a <code>board-deck-builder</code> skill
          populates the PowerPoint template with brand-compliant
          slides. What used to be a multi-hour assembly job in
          Excel and PowerPoint collapses into a sequence of
          skill invocations the agent strings together
          autonomously.
        </li>
        <li>
          <strong>Document generation at scale.</strong>{" "}
          Anthropic&rsquo;s open-sourced PDF, Word, Excel, and
          PowerPoint skills let an agent produce formatted
          documents in whichever output the user asks for. The
          skills handle the format-specific quirks: PDF
          generation through deterministic templates, Excel
          with formula-aware cell formatting, PowerPoint slides
          with brand-token enforcement. The agent stays
          generic; the format-specific knowledge lives in the
          skill.
        </li>
        <li>
          <strong>Code-review playbooks.</strong> Engineering
          teams encode their review checklist as a skill: the
          security checks, the style rules, the test-coverage
          requirements, the deployment readiness questions. The
          skill is invoked once per pull request, the body
          carries the procedural knowledge, and the references
          carry the per-language style guides the body points
          at. The result is a review that does not drift from
          the human-written guide because the human-written
          guide is the skill.
        </li>
        <li>
          <strong>Sales operations.</strong> The pipeline review
          skill exports CRM data through an MCP server, runs the
          variance and forecast logic from a script, and
          produces the weekly readout deck. The skill is the
          procedure; the MCP server is the data plane; the
          inline tools push results back into the CRM. Three
          layers, one workflow.
        </li>
        <li>
          <strong>Regulatory and compliance work.</strong>{" "}
          High-stakes domains are early skills adopters because
          the procedural knowledge is itself the regulated
          artefact. A skill that encodes a SOC 2 evidence
          collection procedure or a SOX control-testing
          workflow can be reviewed, versioned, and audited like
          the policy document it implements.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The consistent observation across these deployments is
        that the agent stops being the unit of customization.
        The skill is. Multiple agents share the same skill
        catalog, the same procedures are applied identically
        across teams, and the procedural knowledge stays in
        markdown the business owner can read.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Security: prompt injection through skills
      </h2>
      <p className="mb-6 leading-relaxed">
        A skill is a load-bearing piece of agent instruction the
        runtime injects into the model&rsquo;s context as soon as
        the model decides to use it. That makes the skill folder
        a high-value injection target. The OWASP Top 10 for
        Agentic Applications added &ldquo;malicious skills and
        capability poisoning&rdquo; as a first-class category in
        the 2026 revision precisely because the same property
        that makes skills powerful &mdash; the agent reads them
        and follows them &mdash; makes them dangerous if they
        come from somewhere untrusted.
      </p>
      <p className="mb-6 leading-relaxed">
        The threat surface has four distinct shapes. First,{" "}
        <strong>data exfiltration</strong>: a malicious skill
        instructs the agent to read <code>.env</code>, SSH keys,
        or cached credentials and weave them into generated code
        or a webhook payload. Second,{" "}
        <strong>dependency injection</strong>: the skill tells
        the agent to install a specific npm or pip package the
        attacker controls. Third,{" "}
        <strong>command execution</strong>: a skill with
        unrestricted <code>allowed-tools</code> runs whatever
        shell commands its <code>scripts/</code> folder
        contains, which is the right design when the skill is
        trusted and the wrong design when it is not. Fourth,{" "}
        <strong>indirect prompt injection through reference
        files</strong>: a skill that pulls instructions from a
        document the user uploaded, an issue body in GitHub, or
        a CRM note becomes the carrier for any instructions
        embedded in that content.
      </p>
      <p className="mb-6 leading-relaxed">
        The mitigations are unglamorous but tractable. Every
        skill that ships should go through the same review gate
        as any other code: the frontmatter, the body, the
        scripts, the references. The <code>allowed-tools</code>{" "}
        field should be set on every skill that does not
        explicitly need broad access; an unrestricted skill
        catalog is a security debt the agent will repay at the
        worst possible moment. Scripts run in the same sandbox
        as any other code the agent executes &mdash; the
        execution-sandbox layer (E2B, Daytona, Modal, Firecracker
        microVMs) is the place to enforce filesystem, network,
        and identity isolation, not the skill itself. For
        skills installed from a third-party marketplace, the
        baseline is signature verification and a manual review
        of any skill that requests sensitive tools.
      </p>
      <p className="mb-6 leading-relaxed">
        The runtime providers have started to surface enterprise
        controls that match the threat surface. Anthropic&rsquo;s
        December 2025 announcement included organization-wide
        management for the Claude platform: administrators can
        enforce which skills are available, restrict access to
        sensitive capabilities, and monitor skill usage across
        deployments. Microsoft, Google, and AWS have shipped
        similar gates in their agent platforms. The pattern that
        scales is to treat skills like any other piece of
        privileged code: signed, versioned, scoped, and
        auditable.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Authoring patterns that survive contact with production
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Lead the description with capability, follow
          with trigger.</strong> &ldquo;Extract structured line
          items, totals, and supplier metadata from PDF
          invoices. Use when&hellip;&rdquo; is the shape. The
          model reads the description to decide whether to
          engage; an unclear capability statement means the
          skill never fires, and a missing trigger means it
          fires too often.
        </li>
        <li>
          <strong>Keep the body under five thousand tokens.</strong>{" "}
          If the body grows beyond that, the longest sections
          almost always belong in <code>references/</code> as
          on-demand material the body points at. A long body
          burns context tokens on every invocation; a long
          reference burns them only when the agent reads the
          reference.
        </li>
        <li>
          <strong>Use scripts for anything deterministic.</strong>{" "}
          The model is good at deciding which parser to call;
          it is bad at being a parser. Push the parsing, the
          validation, the formatting, the calculation into
          scripts the body invokes. The token budget thanks
          you and the determinism makes the skill testable.
        </li>
        <li>
          <strong>Test the trigger.</strong> Skills succeed or
          fail at the catalog level: the model has to choose
          the right skill before any of the body or scripts
          matter. The fastest way to surface trigger bugs is to
          assemble a small evaluation set of representative
          requests and verify that the right skill fires.
          Braintrust, LangSmith, and the built-in eval harnesses
          in the Claude Agent SDK all support skill-routing
          evals as a first-class case in their 2026 releases.
        </li>
        <li>
          <strong>Compose, do not nest.</strong> Skills should
          call out to other skills by description, not by
          embedding one inside another. A skill that needs
          a board deck created should say so in plain language;
          the agent picks up the board-deck skill from the
          catalog. Nesting collapses the progressive disclosure
          benefit and tangles the dependency graph.
        </li>
        <li>
          <strong>Version with the rest of the codebase.</strong>{" "}
          The skill catalog lives in git, ships through pull
          requests, and is reviewed line by line. The teams
          that treat skills as &ldquo;just markdown&rdquo; end
          up with drift, duplicated procedures, and a catalog
          that nobody owns. The teams that treat skills as
          code do not.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>What you buy.</strong> A portable, vendor-
          neutral format for procedural agent customization,
          progressive disclosure that keeps the context window
          cheap as the catalog grows, separation of procedural
          knowledge from deterministic action, a versionable
          and reviewable artefact, and the same files running
          across thirty-two adopter tools without modification.
          The catalog becomes the unit of customization, not
          the agent or the prompt.
        </li>
        <li>
          <strong>What you pay.</strong> A new authoring
          discipline (good descriptions are an acquired
          skill, no pun intended), a review and signing
          process for skills that handle privileged work, a
          security model for skills that are themselves a
          prompt-injection vector, and an organizational
          decision about who owns the catalog. Skills do not
          remove operational burden; they relocate it from
          the prompt to the catalog.
        </li>
        <li>
          <strong>Where it does not fit.</strong> Single-
          turn chat applications with no procedural variation,
          one-off prototypes, evaluation harnesses, and any
          agent whose customization needs are smaller than a
          few well-worded system-prompt paragraphs. The
          pattern earns its keep when the team has multiple
          procedures, multiple agents, or multiple
          environments and wants a shared way to express
          them. Below that line, a system prompt is enough.
        </li>
        <li>
          <strong>The runtime fragmentation question.</strong>{" "}
          The spec is portable; the runtimes are not. The
          script execution model, the tool allowlist
          enforcement, and the discovery order all vary
          between adopter tools. The skill folder runs
          everywhere; the behaviour around it does not.
          Teams that ship across runtimes write conformance
          tests for each runtime they care about and treat
          the differences as part of the integration cost.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trends shaping the next twelve months
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Skills marketplaces and signed catalogs.</strong>{" "}
          The Vercel <code>skills.sh</code> marketplace and the
          partner catalog Anthropic launched with Atlassian,
          Figma, Canva, Stripe, Notion, and Zapier are the
          first wave. The next is signed catalogs with
          verifiable provenance; the procurement question for
          third-party skills is rapidly becoming &ldquo;who
          signed it, what is in the body, what tools does it
          ask for&rdquo;, not &ldquo;is this skill useful.&rdquo;
        </li>
        <li>
          <strong>Skill evaluation as a discipline.</strong>{" "}
          The 2026 agent evaluation harnesses treat skill
          routing as a first-class case. Braintrust, LangSmith,
          and the Claude Agent SDK all surface trigger-accuracy
          metrics, capability-coverage reports, and per-skill
          regression tests. The pattern is reaching the same
          maturity as unit-testing.
        </li>
        <li>
          <strong>Skills inside subagent workflows.</strong>{" "}
          The most productive composition we have seen in
          client work is a planner agent that hands work to
          specialist subagents, each of whom has access to a
          curated slice of the skill catalog. The planner
          carries the breadth; the subagent carries the depth
          and the procedural knowledge for its lane. The skill
          catalog becomes the dependency injection surface for
          the subagent system.
        </li>
        <li>
          <strong>Procedural knowledge as an asset class.</strong>{" "}
          Consulting and system-integration firms have started
          packaging vertical-specific skill catalogs as
          deliverables. ServiceNow alone shipped more than 300
          pre-built agent skills covering ITSM and customer
          workflows; Accenture and Deloitte are publishing
          industry catalogs (financial services, healthcare,
          public sector) on the major marketplaces. The skill
          catalog has become the artefact a buyer can compare
          and a seller can charge for.
        </li>
        <li>
          <strong>Enterprise governance gets formal.</strong>{" "}
          The 2026 RFP for any enterprise agent platform now
          asks about skill governance: who can publish,
          who can review, how is signing enforced, how is
          usage audited. The organization-wide management
          gates the runtime vendors shipped in late 2025 are
          becoming the baseline; the depth and granularity of
          those controls is where the platforms compete.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to use what
      </h2>
      <p className="mb-6 leading-relaxed">
        On a new agent build, the question to ask of every piece
        of customization is whether the gap is procedural,
        deterministic, contractual, or identity-shaped.
        Procedural knowledge belongs in a skill: the playbook,
        the checklist, the judgement calls, the tone-of-voice
        rules. Deterministic actions belong in a tool: the
        function the agent calls when it knows what to do.
        Contractual integrations belong in an MCP server: the
        portable interface to a data source or external system
        many hosts will consume. Identity-shaped work belongs in
        a subagent: the specialist who owns a slice of the
        workflow with its own context and tool set.
      </p>
      <p className="mb-6 leading-relaxed">
        The mental shortcut that worked best on engagements
        this year is to write the first version of the
        customization in plain language. If the language reads
        like a procedure, it is a skill. If it reads like a
        function signature, it is a tool. If it reads like an
        API contract, it is an MCP server. If it reads like a
        job description, it is a subagent. The same observation
        flipped: if you find yourself stuffing function logic
        into a skill body, it belongs in a script; if you find
        yourself stuffing procedural prose into a tool
        description, it belongs in a skill.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: the catalog is the product
      </h2>
      <p className="mb-6 leading-relaxed">
        The agent ecosystem spent 2024 arguing about which
        framework to use, 2025 arguing about which protocol to
        adopt, and 2026 discovering that the durable artefact
        is the skill catalog. Frameworks come and go; protocols
        get versioned and replaced; the procedural knowledge a
        team encodes in its skills outlasts both. The teams
        that have already moved on from &ldquo;our system
        prompt is six pages long&rdquo; to &ldquo;our skill
        catalog has eighty entries and a code-review process&rdquo;
        are shipping faster, switching runtimes without rewriting
        their agents, and treating procedural knowledge as the
        asset it always was. The decision to make in 2026 is
        not whether to adopt the format; the format won. The
        decision is who owns the catalog and how it gets
        reviewed.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Equipping agents for the real world with Agent Skills
            (Anthropic Engineering)
          </a>
          {" "}&mdash; the October 2025 launch post and the
          canonical first read on the pattern.
        </li>
        <li>
          <a
            href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Skills overview (Claude API documentation)
          </a>
          {" "}&mdash; the official reference for SKILL.md
          frontmatter, progressive disclosure, and the runtime
          contract.
        </li>
        <li>
          <a
            href="https://agentskills.io/specification"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Skills open standard specification (agentskills.io)
          </a>
          {" "}&mdash; the December 2025 open standard, including
          every frontmatter key and the directory contract.
        </li>
        <li>
          <a
            href="https://github.com/anthropics/skills"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            anthropics/skills (GitHub)
          </a>
          {" "}&mdash; the seventeen production-grade open-source
          skills Anthropic published, including PDF, Word, Excel,
          and PowerPoint generation.
        </li>
        <li>
          <a
            href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Skill authoring best practices (Claude docs)
          </a>
          {" "}&mdash; the official authoring guide, including the
          description-and-trigger pattern and the body-length
          discipline.
        </li>
        <li>
          <a
            href="https://venturebeat.com/ai/anthropic-launches-enterprise-agent-skills-and-opens-the-standard"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic launches enterprise Agent Skills and opens
            the standard (VentureBeat)
          </a>
          {" "}&mdash; the December 2025 enterprise launch
          coverage, including the partner catalog with Atlassian,
          Figma, Canva, Stripe, Notion, and Zapier.
        </li>
        <li>
          <a
            href="https://www.paperclipped.de/en/blog/agent-skills-open-standard-interoperability/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Skills Open Standard: 32-tool interoperability
            guide
          </a>
          {" "}&mdash; the running tally of adopter tools and the
          cross-vendor compatibility matrix.
        </li>
        <li>
          <a
            href="https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Agent Skills: a first-principles deep dive
          </a>
          {" "}&mdash; the cleanest walk-through of progressive
          disclosure and the three-level loading model.
        </li>
        <li>
          <a
            href="https://www.newsletter.swirlai.com/p/agent-skills-progressive-disclosure"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Skills: progressive disclosure as a system design
            pattern (SwirlAI)
          </a>
          {" "}&mdash; the architecture pattern framing for skills
          beyond the Claude implementation.
        </li>
        <li>
          <a
            href="https://www.aikido.dev/blog/owasp-top-10-agentic-applications"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OWASP Top 10 for Agentic Applications 2026
          </a>
          {" "}&mdash; the threat model that adds capability
          poisoning and skill-based prompt injection as
          first-class categories.
        </li>
        <li>
          <a
            href="https://www.agensi.io/learn/are-ai-agent-skills-safe-security-risks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Are AI Agent Skills Safe? Security Risks You Need to
            Know (Agensi)
          </a>
          {" "}&mdash; the practical security guide for the
          marketplace-installed skill threat surface.
        </li>
        <li>
          <a
            href="https://medium.com/@tahirbalarabe2/agent-skills-vs-mcp-vs-prompts-vs-projects-vs-subagents-a-comparative-analysis-7a36cd85cb74"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Skills vs MCP vs Prompts vs Projects vs Subagents:
            a comparative analysis
          </a>
          {" "}&mdash; the clearest side-by-side comparison of the
          four customization layers.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Model Context Protocol in 2026
          </a>
          {" "}&mdash; the integrations layer this article pairs
          with on the data and tool-contract side.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}&mdash; the upstream discipline that makes
          progressive-disclosure systems like skills work.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}&mdash; the subagent layer that pairs naturally
          with a curated skill catalog per specialist.
        </li>
      </ul>
    </div>
  );
}
