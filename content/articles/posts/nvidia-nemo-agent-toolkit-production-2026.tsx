import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "nvidia-nemo-agent-toolkit-production-2026",
  title:
    "NVIDIA NeMo Agent Toolkit in production 2026: the framework-agnostic layer that wraps LangChain, LlamaIndex, CrewAI, Semantic Kernel, and Google ADK",
  excerpt:
    "How NVIDIA quietly shipped an open-source toolkit that does not replace your agent framework but sits around it: profiling, observability, evaluation, MCP and A2A servers, and a YAML workflow model that lets a LangChain agent, a CrewAI crew, and a Semantic Kernel plugin call each other. Covers the function-first architecture, the nat CLI, the profiler for token and latency hotspots, the AI-Q Research Assistant blueprint, and the honest picture of when adding NeMo Agent Toolkit is worth the extra layer.",
  metaDescription:
    "A practical, technical guide to the NVIDIA NeMo Agent Toolkit (nvidia-nat) in 2026. Covers the framework-agnostic function model, the YAML workflow config, the ReAct and reasoning agents shipped in the box, the profiler for token and latency hotspots, observability with LangSmith, Phoenix, Weave, and Langfuse, MCP client and server runtimes, A2A protocol support, the AI-Q Research Assistant blueprint used at NVIDIA GTC 2026, and enterprise adoption by SAP, ServiceNow, Amdocs, Dell, and others.",
  image:
    "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "NVIDIA",
    "NeMo",
    "NIM",
    "LangChain",
    "LlamaIndex",
    "CrewAI",
    "MCP",
    "A2A",
    "Production",
  ],
  publishDate: "2026-07-31",
  readingTime: "16 min read",
};

export default function NvidiaNemoAgentToolkitProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Almost every serious agent framework asks you to
        rewrite your code in its idioms. NVIDIA&rsquo;s
        NeMo Agent Toolkit does the opposite. It leaves
        your LangChain graph, your LlamaIndex workflow,
        your CrewAI crew, your Semantic Kernel plugin, or
        your plain-Python agent alone, and wraps them in a
        common function model so they can call each other,
        share a profiler, share observability, and be
        published as MCP or A2A servers with one config
        file. That approach is what has made it the
        instrumentation layer of choice for enterprise AI
        rollouts at SAP, ServiceNow, Amdocs, Cloudera,
        Dell, IBM, and JFrog through 2026. This article is
        how we use it on client work: the function-first
        model, the YAML workflow config, the profiler that
        finds token and latency hotspots, the MCP and A2A
        story, and the honest picture of when adding the
        toolkit is worth the extra layer and when it is
        not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why NVIDIA shipped a toolkit that is not a framework
      </h2>
      <p className="mb-6 leading-relaxed">
        By early 2025 the agent-framework space had a
        problem the industry now calls framework
        fragmentation. Every big vendor had shipped their
        own agent SDK: LangChain and LangGraph, LlamaIndex,
        CrewAI, Microsoft Semantic Kernel, Google ADK,
        AWS Strands, OpenAI Agents SDK, Claude Agent SDK,
        Pydantic AI, Mastra, and dozens more. Enterprise
        teams did not pick one. They ended up with two,
        three, or five in the same organization, one per
        team, one per use case. Sharing tools between them
        was a copy-paste exercise. Getting a common view of
        cost, latency, and reliability across them was
        impossible.
      </p>
      <p className="mb-6 leading-relaxed">
        NVIDIA had first-hand experience of this from
        building the AI-Q Research Assistant and internal
        NIM-based agents across their own teams. Instead
        of shipping yet another framework, they took the
        piece that was actually missing: a layer that sat
        underneath all the frameworks, wrapped their
        agents and tools as callable functions, and gave
        them one profiler, one config file, one
        observability integration, and one path to MCP
        and A2A. That layer is the NeMo Agent Toolkit,
        originally shipped as the &ldquo;Agent Intelligence
        Toolkit&rdquo; and renamed in mid-2025 when it was
        pulled into the NeMo product family. The package
        name is <code>nvidia-nat</code>, the CLI is
        <code>nat</code>, and by mid-2026 it had reached
        version 1.8 with a stable core and a growing set
        of framework adapters.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>March 2025</strong>: NVIDIA releases the
          Agent Intelligence Toolkit in preview at GTC
          2025, alongside the first Nemotron-optimized
          agent examples.
        </li>
        <li>
          <strong>Mid-2025</strong>: The toolkit is
          folded into the NeMo product family and renamed
          NVIDIA NeMo Agent Toolkit. The package
          <code>nvidia-nat</code> and the <code>nat</code>
          CLI ship on PyPI under Apache 2.0.
        </li>
        <li>
          <strong>January 2026</strong>: Version 1.4
          adds automatic LangGraph wrappers, so any
          existing LangGraph agent becomes a NeMo function
          without code changes.
        </li>
        <li>
          <strong>March 18, 2026</strong>: NVIDIA
          announces the AI-Q Research Assistant
          blueprint at GTC 2026. Built on the toolkit,
          on Nemotron 3 Super, and on LangChain deep
          agents, it tops both Deep Research Bench and
          Deep Research Bench II leaderboards. SAP,
          Amdocs, Cloudera, Cohesity, Dell, IBM, JFrog,
          LangChain, ServiceNow, VAST, and others
          announce integrations at the same event.
        </li>
        <li>
          <strong>March 2026</strong>: DeepLearning.AI
          launches the free short course &ldquo;NVIDIA
          NeMo Agent Toolkit: Making Agents
          Reliable&rdquo; with Brian McBrayer, taken by
          more than 30,000 developers in the first
          quarter.
        </li>
        <li>
          <strong>May 2026</strong>: The Agno framework
          is added to the framework-integration list,
          making the toolkit compatible with LangChain,
          LlamaIndex, CrewAI, Semantic Kernel, Google
          ADK, Agno, and plain Python.
        </li>
        <li>
          <strong>June 2026</strong>: Version 1.8 lands.
          Adds coding-agent workflow adapters for Claude
          Code, Codex, Cursor, Hermes, and OpenClaw,
          plus a Relay telemetry bridge that maps
          third-party trace events into NAT intermediate
          steps.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Framework agnostic, actually
      </h2>
      <p className="mb-6 leading-relaxed">
        The single most important claim to understand is
        that the toolkit does not want to be your agent
        framework. It wants to be the connector between
        the frameworks you already have. Every agent,
        tool, and workflow in NAT is a function, and any
        LangChain agent, LlamaIndex workflow, CrewAI crew,
        Semantic Kernel plugin, Google ADK agent, Agno
        agent, or plain Python function can be wrapped
        into that function shape with a small adapter.
        Once wrapped, they all look the same to the rest
        of the system.
      </p>
      <CodeBlock
        language="bash"
        filename="How NeMo Agent Toolkit sits around your existing stack"
        code={`+---------------------------------------------------------------+
|                       Your application                        |
+---------------------------------------------------------------+
              |                          |
              v                          v
   +--------------------+     +---------------------+
   | LangChain agent    |     | CrewAI crew         |
   |  (existing code)   |     |  (existing code)    |
   +---------+----------+     +----------+----------+
             |                            |
      wrapped as               wrapped as
      NAT function             NAT function
             |                            |
             v                            v
+---------------------------------------------------------------+
|                 NVIDIA NeMo Agent Toolkit                     |
|                                                               |
|  Function registry  |  Profiler  |  OTel/Langfuse/Phoenix     |
|  MCP server + client |  A2A server + client  |  Evaluator     |
|  YAML workflow spec  |  nat CLI  |  ChatUI                    |
+---------------------------------------------------------------+
                          |
                          v
              +------------------------+
              | NIM, OpenAI, Anthropic |
              | Bedrock, Ollama, ...   |
              +------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The framework list is not marketing. Every one of
        those integrations is a first-party plugin under
        <code>nvidia-nat[langchain]</code>,
        <code>nvidia-nat[llama_index]</code>,
        <code>nvidia-nat[crewai]</code>,
        <code>nvidia-nat[semantic_kernel]</code>,
        <code>nvidia-nat[adk]</code>,
        <code>nvidia-nat[agno]</code>, or a bare
        <code>nvidia-nat</code> install for the plain
        Python path.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Hello World: a ReAct agent in a YAML file
      </h2>
      <p className="mb-6 leading-relaxed">
        The toolkit is unusually opinionated about one
        thing: the wiring lives in a YAML workflow file,
        not in code. That YAML declares the LLMs, the
        tools (functions), and the workflow (usually an
        agent). The <code>nat</code> CLI reads the YAML
        and runs the workflow. This makes it easy to
        swap models or tools without touching Python and
        to check whole workflow specs into git for
        review.
      </p>
      <CodeBlock
        language="bash"
        filename="workflow.yml - a ReAct agent with Wikipedia search"
        code={`functions:
  # A pre-built Wikipedia search tool
  wikipedia_search:
    _type: wiki_search
    max_results: 2

llms:
  # A named LLM the workflow can reference
  nim_llm:
    _type: nim
    model_name: meta/llama-3.1-70b-instruct
    temperature: 0.0

workflow:
  # A pre-built ReAct agent from the toolkit
  _type: react_agent
  tool_names: [wikipedia_search]
  llm_name: nim_llm
  verbose: true
  parse_agent_response_max_retries: 3`}
      />
      <CodeBlock
        language="bash"
        filename="Install and run the workflow with the nat CLI"
        code={`# Install with the LangChain plugin (used by the react_agent workflow)
uv pip install "nvidia-nat[langchain]"

# Point at any NIM endpoint (build.nvidia.com or self-hosted)
export NVIDIA_API_KEY=nvapi-...

# Run
nat run --config_file workflow.yml \\
  --input "List five subspecies of Aardvarks"`}
      />
      <p className="mb-6 leading-relaxed">
        That is a complete agent. No Python file has
        been written. The <code>react_agent</code>
        workflow, the <code>wiki_search</code> function,
        and the <code>nim</code> LLM provider are all
        registered plugins that ship with the toolkit
        (the ReAct agent comes from the LangChain plugin,
        so it needs the <code>[langchain]</code> extra).
        The pattern of picking pre-built components and
        wiring them in YAML is how NeMo Agent Toolkit
        expects most agents to start.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Writing a custom function
      </h2>
      <p className="mb-6 leading-relaxed">
        When a pre-built tool is not enough, a custom
        function is a small Python file with a config
        model, a decorated builder, and an async body.
        Once registered, it becomes callable from any
        workflow YAML that installs the package.
      </p>
      <CodeBlock
        language="python"
        filename="src/register.py - a custom NAT function for an internal KB"
        code={`from pydantic import Field, SecretStr
from nat.builder.builder import Builder
from nat.builder.function_info import FunctionInfo
from nat.cli.register_workflow import register_function
from nat.data_models.function import FunctionBaseConfig


class InternalKBConfig(FunctionBaseConfig, name="internal_kb"):
    """Search tool for the internal knowledge base."""

    api_url: str = Field(description="Knowledge base API endpoint")
    api_key: SecretStr = Field(description="Authentication key")
    max_results: int = Field(default=5)


@register_function(config_type=InternalKBConfig)
async def internal_kb(config: InternalKBConfig, builder: Builder):
    async def search(query: str) -> str:
        """Search the internal knowledge base for relevant documents."""
        results = await call_kb_api(
            str(config.api_url),
            query,
            config.max_results,
        )
        return format_results(results)

    yield FunctionInfo.from_fn(search, description=search.__doc__)`}
      />
      <CodeBlock
        language="bash"
        filename="Reference the custom function in workflow.yml"
        code={`functions:
  internal_kb_tool:
    _type: internal_kb
    api_url: "https://kb.internal.company.com/api/v1"
    api_key: \${INTERNAL_KB_API_KEY}
    max_results: 10

  web_search_tool:
    _type: tavily_search

workflow:
  _type: react_agent
  llm_name: nim_llm
  tool_names: [internal_kb_tool, web_search_tool]`}
      />
      <p className="mb-6 leading-relaxed">
        Two things about the pattern are worth calling
        out. The config is a Pydantic model, so the
        toolkit validates the YAML on startup and
        misconfigured runs fail fast instead of at the
        first tool call. And the docstring on the inner
        function is what the LLM sees as the tool
        description, so it is worth writing well and
        keeping it in one place.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Wrapping an existing agent as a function
      </h2>
      <p className="mb-6 leading-relaxed">
        The killer feature is the framework adapters.
        Any agent your team has already built in one of
        the supported frameworks can be wrapped as a
        NAT function and then used as a tool by any
        other agent, no matter which framework that
        agent is in. This is how a LangChain graph can
        call a CrewAI crew as a sub-agent, or how a
        Semantic Kernel plugin can hand off to a Google
        ADK agent.
      </p>
      <CodeBlock
        language="python"
        filename="Wrap a LangGraph agent as a NAT function"
        code={`from nat.cli.register_workflow import register_function
from nat.data_models.function import FunctionBaseConfig
from nat.builder.builder import Builder
from nat.builder.function_info import FunctionInfo

# Your existing LangGraph app, unchanged
from my_langgraph_app import build_graph


class SupportGraphConfig(FunctionBaseConfig, name="support_graph"):
    """Wrap the existing customer-support LangGraph."""


@register_function(config_type=SupportGraphConfig)
async def support_graph(config: SupportGraphConfig, builder: Builder):
    graph = build_graph()

    async def run(query: str) -> str:
        """Run the customer support workflow for one user query."""
        result = await graph.ainvoke({"messages": [{"role": "user", "content": query}]})
        return result["messages"][-1].content

    yield FunctionInfo.from_fn(run, description=run.__doc__)`}
      />
      <p className="mb-6 leading-relaxed">
        Since v1.4 there is also an
        <code>_type: langgraph_agent</code> workflow that
        wraps LangGraph code without any of the boilerplate
        above. The pattern generalizes: every framework
        integration provides a wrapper workflow you can
        drop into YAML, and the wrapped agent gets the
        same profiler spans, traces, and eval hooks as a
        native NAT function.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The profiler finds token and latency hotspots
      </h2>
      <p className="mb-6 leading-relaxed">
        Every workflow the toolkit runs is
        instrumented. The profiler tracks input and
        output tokens per LLM call, per tool call, per
        agent step, and per full workflow. It also
        forecasts runtime and token cost based on
        historical runs. When an agent that used to
        cost 8K tokens per turn quietly starts costing
        30K, the profiler is what shows you which node
        changed.
      </p>
      <CodeBlock
        language="bash"
        filename="Enable the profiler in workflow.yml"
        code={`general:
  telemetry:
    tracing:
      langsmith:
        _type: langsmith
        project: kb-support-agent
        api_key: \${LANGSMITH_API_KEY}
  profiler:
    _type: default
    write_report: profiler_report.json
    forecast: true`}
      />
      <CodeBlock
        language="bash"
        filename="Run and inspect the profiler output"
        code={`# Run the workflow once (or many times, for a better forecast)
nat run --config_file workflow.yml --input "reset my password"

# The profiler writes profiler_report.json with, per span:
#   - LLM name and model
#   - Input / output tokens
#   - Wall-clock duration
#   - Cost estimate (if LLM pricing is configured)
#   - Parent span id, so you can rebuild the tree
#
# Use nat profile to summarize:
nat profile summary --report profiler_report.json`}
      />
      <p className="mb-6 leading-relaxed">
        The profiler is the piece that makes NeMo
        Agent Toolkit worth adopting even if you never
        use another feature. Almost every production
        agent we ship spends 80% of its cost in one or
        two spans, and none of the popular frameworks
        show you that in one place. The profiler does.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Observability plugs into whatever you already run
      </h2>
      <p className="mb-6 leading-relaxed">
        Traces flow into any of LangSmith, Arize
        Phoenix, W&amp;B Weave, Langfuse, or a plain
        OpenTelemetry endpoint. The choice is a YAML
        block, and you can enable more than one
        exporter at once, which is useful when you
        want operational traces in one system and
        research or eval traces in another.
      </p>
      <CodeBlock
        language="bash"
        filename="Multiple tracing backends in one workflow"
        code={`general:
  telemetry:
    tracing:
      # Ship prod traces to Langfuse
      langfuse:
        _type: langfuse
        host: https://cloud.langfuse.com
        public_key: \${LANGFUSE_PUBLIC_KEY}
        secret_key: \${LANGFUSE_SECRET_KEY}
      # Also ship a copy to Phoenix on the dev box
      phoenix:
        _type: phoenix
        endpoint: http://localhost:6006
      # Plus a generic OTLP exporter for the corporate observability stack
      otlp:
        _type: otlp
        endpoint: http://otel-collector.internal:4318/v1/traces`}
      />
      <p className="mb-6 leading-relaxed">
        Every span carries the framework name, the
        agent name, the tool name, the model id, and
        the token counts. If the underlying agent is a
        wrapped LangGraph app, you get the LangGraph
        node names inside the NAT trace, which means
        you can drill from &ldquo;the KB tool is
        slow&rdquo; down to &ldquo;the LangGraph
        <code>retrieve</code> node is spending eight
        seconds in a vector search&rdquo; without
        leaving the same trace view.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Built-in evaluation
      </h2>
      <p className="mb-6 leading-relaxed">
        The <code>eval</code> subcommand runs a
        workflow against a dataset of inputs and
        expected outputs, then scores the results with
        a set of pluggable evaluators (LLM as judge,
        RAGAS, exact match, custom). The output is a
        JSON report that fits into CI, so a workflow
        change that quietly regresses the agent&rsquo;s
        answer quality shows up as a failed check on
        the PR.
      </p>
      <CodeBlock
        language="bash"
        filename="Add an eval block and a dataset to workflow.yml"
        code={`eval:
  general:
    output_dir: ./eval_output
    dataset:
      _type: json
      file_path: eval/support_cases.json
  evaluators:
    - _type: ragas_answer_correctness
      llm_name: gpt-5-2
    - _type: exact_match
      key: expected_ticket_action
    - _type: llm_judge
      llm_name: gpt-5-2
      criteria: |
        The answer must (a) not invent facts,
        (b) cite at least one source, and
        (c) escalate if the ticket is critical.`}
      />
      <CodeBlock
        language="bash"
        filename="Run the eval and read the report"
        code={`nat eval --config_file workflow.yml
# Report at ./eval_output/report.json
# Per-case scores at ./eval_output/cases/`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: client and server, in the same workflow
      </h2>
      <p className="mb-6 leading-relaxed">
        NAT is a full Model Context Protocol client:
        drop an <code>mcp_client</code> function into a
        workflow and the tools of any remote MCP server
        become callable by the agent, no code needed.
        It is also an MCP server: any set of NAT
        functions can be published as an MCP endpoint
        (through the built-in server or a FastMCP
        runtime) that any other MCP client (Claude
        Desktop, Cursor, the Amazon Q CLI, a
        LangChain agent) can connect to.
      </p>
      <CodeBlock
        language="bash"
        filename="Consume a remote MCP server as tools"
        code={`functions:
  # Pull in the tools of a remote MCP server as if they were local
  github_tools:
    _type: mcp_client
    server_url: https://mcp.example.com/github
    # Optional: only expose a subset
    tool_allowlist: [issue_create, pr_list, commit_get]

  wikipedia_search:
    _type: wiki_search

workflow:
  _type: react_agent
  llm_name: nim_llm
  tool_names: [github_tools, wikipedia_search]`}
      />
      <CodeBlock
        language="bash"
        filename="Publish your NAT functions as an MCP server"
        code={`# Start an MCP server that exposes every function in the workflow
nat mcp serve --config_file workflow.yml --host 0.0.0.0 --port 8765

# A client like Claude Desktop can now connect at
#   http://localhost:8765
# and see internal_kb_tool, web_search_tool, and the wrapped
# support_graph as first-class MCP tools.`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A2A: publish and consume cross-vendor agents
      </h2>
      <p className="mb-6 leading-relaxed">
        The Agent-to-Agent (A2A) protocol is the
        cross-vendor answer to MCP&rsquo;s tool
        integration story. NAT ships an A2A server that
        exposes any workflow as a discoverable agent
        with an auto-generated agent card, and an A2A
        client that pulls in remote A2A agents as
        callable tools. The pattern is the same as MCP,
        but the unit is an agent, not a tool.
      </p>
      <CodeBlock
        language="bash"
        filename="Serve a workflow over A2A"
        code={`# Publish the workflow as an A2A agent.
# Agent card is served at /.well-known/agent.json
nat a2a serve --config_file workflow.yml --host 0.0.0.0 --port 9000`}
      />
      <CodeBlock
        language="bash"
        filename="Call a remote A2A agent from another workflow"
        code={`functions:
  partner_research_agent:
    _type: a2a_client
    agent_url: https://research.partner.com

workflow:
  _type: react_agent
  llm_name: nim_llm
  # The orchestrator can now delegate to partner_research_agent
  # like any other tool.
  tool_names: [partner_research_agent, internal_kb_tool]`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The AI-Q Research Assistant is the reference build
      </h2>
      <p className="mb-6 leading-relaxed">
        The AI-Q Research Assistant, released as an
        open blueprint at GTC 2026, is the flagship
        demo of what a serious NeMo Agent Toolkit
        workflow looks like in production. It is a
        deep-research agent that uses a LangChain
        <code>deepagents</code> orchestrator, a
        planner and researcher pair of sub-agents on
        Nemotron 3 Super 120B, GPT-5.2 for a frontier
        top-level reasoning pass, and a web-search
        tool through Tavily. It tops the Deep Research
        Bench II leaderboard as of mid-2026.
      </p>
      <CodeBlock
        language="bash"
        filename="A trimmed AI-Q config showing the shape"
        code={`llms:
  nemotron_llm_non_thinking:
    _type: nim
    model_name: nvidia/nemotron-3-super-120b-a12b
    temperature: 0.7
    max_tokens: 8192
    chat_template_kwargs:
      enable_thinking: false
  nemotron_llm:
    _type: nim
    model_name: nvidia/nemotron-3-super-120b-a12b
    temperature: 1.0
    max_tokens: 100000
    chat_template_kwargs:
      enable_thinking: true
  gpt-5-2:
    _type: openai
    model_name: 'gpt-5.2'

functions:
  shallow_research_agent:
    _type: shallow_research_agent
    llm: nemotron_llm
    tools: [web_search_tool]
    max_llm_turns: 10
    max_tool_calls: 5

  deep_research_agent:
    _type: deep_research_agent
    orchestrator_llm: gpt-5-2
    planner_llm: nemotron_llm
    researcher_llm: nemotron_llm
    max_loops: 2
    tools: [advanced_web_search_tool]`}
      />
      <p className="mb-6 leading-relaxed">
        Two things about the blueprint are the most
        instructive. The <code>enable_thinking</code>
        flag on Nemotron toggles chain-of-thought per
        LLM instance, so the config declares two
        variants of the same model, one for fast
        formatting steps and one for reasoning-heavy
        steps. And the deep agent uses a planner and a
        researcher as sub-agents with strict context
        isolation, so the researcher never sees the
        orchestrator&rsquo;s reasoning tokens or the
        planner&rsquo;s scratch space. That single
        design choice, the toolkit&rsquo;s blog
        argues, is the difference between a research
        agent that scales and one that drowns in its
        own context window.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where NeMo Agent Toolkit runs in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        The toolkit is being adopted at the enterprise
        end of the market. Announced integrations in
        the twelve months up to July 2026 include:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>SAP</strong>: Joule Studio on the SAP
          Business Technology Platform, so SAP
          customers can build agents on top of SAP
          business data through the toolkit.
        </li>
        <li>
          <strong>ServiceNow</strong>: the AI Control
          Tower for governing autonomous work uses
          NeMo Agent Toolkit as its agent framework
          adapter layer.
        </li>
        <li>
          <strong>Amdocs</strong>: the sovereign
          telecom agent stack (Amdocs Agentic
          Operations, AOS) uses the toolkit for
          on-premise agent hosting.
        </li>
        <li>
          <strong>Dell, HPE, IBM</strong>: reference
          deployments on their AI Factory offerings.
        </li>
        <li>
          <strong>Cloudera, Cohesity, VAST</strong>:
          data-platform-side adapters that expose
          governed data sources as NAT functions.
        </li>
        <li>
          <strong>JFrog, LangChain, Distyl,
          Aible</strong>: developer-tooling and
          agent-platform integrations, mostly around
          the AI-Q blueprint.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Outside the announced partners, the pattern we
        see on client work is teams adopting the
        toolkit as the connective layer between an
        existing LangChain or LlamaIndex agent and the
        rest of the enterprise stack. Teams rarely
        replace their framework with NAT. They add
        NAT around it to get the profiler, the eval
        harness, and the MCP or A2A endpoint.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        When to pick the toolkit and when not to
      </h2>
      <p className="mb-6 leading-relaxed">
        The toolkit is worth the extra layer when:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          You have agents in more than one framework
          and want a single profiler, single trace
          view, and single eval story across them.
        </li>
        <li>
          You need to expose your agents as MCP or
          A2A endpoints without writing servers.
        </li>
        <li>
          You are running on NVIDIA infrastructure and
          want first-class NIM support, Nemotron
          integration, and the AI-Q blueprint as a
          starting point.
        </li>
        <li>
          You want the config for LLMs, tools, and
          agents in a git-reviewable YAML file
          instead of scattered across Python code.
        </li>
        <li>
          You want a lightweight eval harness that
          runs in CI on the same YAML that runs in
          production.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        It is probably the wrong choice when:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          You are building a single, simple, single-
          framework agent and do not need the
          multi-framework story. The extra YAML layer
          is friction that pays off only when there
          is more than one framework to unify.
        </li>
        <li>
          You already have a working profiler and
          eval story in your framework of choice (for
          example LangSmith with LangGraph, Langfuse
          with LlamaIndex, or the built-in eval in
          the AWS Strands or OpenAI Agents SDK). NAT
          adds a layer of the same features and does
          not remove yours.
        </li>
        <li>
          Your team is deeply on non-NVIDIA
          infrastructure and does not use NIM or
          Nemotron. The toolkit works with OpenAI,
          Anthropic, and Bedrock, but the reference
          examples, blueprints, and support are
          NIM-first.
        </li>
        <li>
          You want a TypeScript SDK. The toolkit is
          Python-only. For TypeScript-first stacks,
          Mastra, Vercel AI SDK, or AWS Strands
          TypeScript are the honest picks.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Trade-offs to plan for
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>The extra layer is real.</strong>
        Every framework adapter is a bit of code that
        can and does drift out of sync with the
        underlying framework&rsquo;s releases. Pin
        both, and test the pair together. The
        toolkit&rsquo;s CI runs against tagged
        framework versions, so pin to those.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>YAML-first has a ceiling.</strong>
        The YAML is powerful for wiring, less
        powerful for logic. Complex conditional flow
        still belongs in a real agent framework
        underneath. Use NAT to compose those agents,
        not to reinvent them.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The MCP and A2A surface exposes
        internal tools.</strong> An MCP endpoint that
        wraps your workflows is as sensitive as the
        tools inside. Put it behind an auth proxy, do
        not expose write-access tools without
        approvals, and treat the endpoint as a
        production interface, not a demo.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>The NVIDIA data story is not
        magic.</strong> The AI-Q blueprint markets
        &ldquo;keep your data private,&rdquo; but the
        default config ships data to NVIDIA, Tavily,
        OpenAI, and LangSmith. If privacy is the
        reason you picked the blueprint, plan on
        replacing the frontier LLM, the web search
        provider, and the tracing backend with
        internal alternatives, and hosting Nemotron
        on your own NIM cluster. All of that is
        supported, it is just not the default.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What is next
      </h2>
      <p className="mb-6 leading-relaxed">
        A few directions are visible in the roadmap
        and the recent releases:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Coding-agent adapters</strong>. The
          1.8 release added workflow adapters for
          Claude Code, Codex, Cursor, Hermes, and
          OpenClaw, which lets you run a coding
          agent inside a NAT workflow and get the
          same profiling and eval. Expect more
          coding-agent harness adapters as the space
          consolidates.
        </li>
        <li>
          <strong>Relay telemetry bridge</strong>.
          The Relay bridge that arrived in 1.8 maps
          arbitrary third-party OTel events into
          NAT intermediate steps, which is the
          groundwork for supporting agent runtimes
          the toolkit does not natively wrap.
        </li>
        <li>
          <strong>Deeper Nemotron integration</strong>.
          The <code>enable_thinking</code> flag on
          Nemotron 3 Super is the first of what will
          be a wider set of NIM-specific knobs
          exposed as first-class YAML fields.
        </li>
        <li>
          <strong>Agent registry</strong>. Cross-
          vendor A2A adoption is running into the
          same discovery problem that MCP had, and
          the toolkit is expected to add a first-
          class agent registry for finding and
          calling A2A endpoints inside an
          organization.
        </li>
        <li>
          <strong>More framework adapters</strong>.
          The Agno addition in mid-2026 was the
          template. Adapters for other rising
          frameworks (Mastra, Pydantic AI, more of
          the JS-side ecosystem) are on the near-
          term list.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion
      </h2>
      <p className="mb-6 leading-relaxed">
        The NeMo Agent Toolkit is the piece the
        agent-framework space had missed. Instead of
        another framework asking you to pick a side,
        it accepts that most enterprises already
        have three or four frameworks in play, wraps
        them in a common function model, and gives
        you one profiler, one trace view, one eval
        harness, and one MCP/A2A endpoint over the
        whole set. If you have a single agent in a
        single framework, you do not need it. If you
        have the fragmentation problem that GTC 2026
        made obvious, it is the cheapest way out.
      </p>
      <p className="mb-6 leading-relaxed">
        On client work in 2026 we now default to
        NeMo Agent Toolkit as the wrapper any time
        we own more than one agent in the same
        deployment. We keep the frameworks the
        teams already picked. We wrap them as NAT
        functions. We ship the config in YAML, the
        traces to Langfuse or Phoenix, and the eval
        results into CI. The tokens saved by the
        profiler alone have paid for the extra
        layer, every time.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://docs.nvidia.com/nemo/agent-toolkit/latest/index.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA NeMo Agent Toolkit documentation
          </a>
          {" "}- the official overview and reference,
          the Hello World YAML used above, and the
          full list of built-in agents, tools, and
          integrations.
        </li>
        <li>
          <a
            href="https://github.com/NVIDIA/NeMo-Agent-Toolkit"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA/NeMo-Agent-Toolkit on GitHub
          </a>
          {" "}- the source, the release notes, the
          coding-agent adapters added in 1.8, and the
          growing set of example workflows.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/how-to-build-deep-agents-for-enterprise-search-with-nvidia-ai-q-and-langchain/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA: How to build deep agents for
            enterprise search with AI-Q and LangChain
            (March 18, 2026)
          </a>
          {" "}- the AI-Q Research Assistant blueprint
          walk-through with the shallow and deep
          research agent config, the LangSmith
          integration, and the pattern for adding a
          custom NAT function for internal data.
        </li>
        <li>
          <a
            href="https://developer.nvidia.com/blog/extending-the-nvidia-nemo-agent-toolkit-to-support-new-agentic-frameworks/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA: Extending the NeMo Agent Toolkit
            to support new agentic frameworks
          </a>
          {" "}- the design story behind the framework-
          agnostic layer, the Agno adapter as the
          worked example, and the pattern for adding
          a new adapter.
        </li>
        <li>
          <a
            href="https://www.deeplearning.ai/courses/nvidia-nat-making-agents-reliable"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DeepLearning.AI: NVIDIA&rsquo;s NeMo Agent
            Toolkit, Making Agents Reliable
          </a>
          {" "}- the free short course with Brian
          McBrayer covering multi-agent workflows,
          auth, rate limiting, and the professional
          chat UI shipped with the toolkit.
        </li>
        <li>
          <a
            href="https://towardsdatascience.com/measuring-what-matters-with-nemo-agent-toolkit/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Towards Data Science: Measuring what
            matters with NeMo Agent Toolkit
          </a>
          {" "}- a practical write-up of the profiler,
          observability, and eval features with a
          Phoenix and W&amp;B Weave setup.
        </li>
        <li>
          <a
            href="https://nvidianews.nvidia.com/news/ai-agents"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NVIDIA press release: NVIDIA Ignites the
            Next Industrial Revolution in Knowledge
            Work with Open Agent Development Platform
          </a>
          {" "}- the SAP, ServiceNow, Amdocs, Cloudera,
          Cohesity, Dell, Distyl, H2O.ai, HPE, IBM,
          JFrog, LangChain, and VAST integration
          announcements at GTC 2026.
        </li>
        <li>
          <a
            href="/articles/multi-agent-orchestration-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Multi-agent orchestration in 2026
          </a>
          {" "}- the deeper read on the orchestrator-
          worker, swarm, and graph patterns that show
          up in the AI-Q blueprint and in NAT
          workflows.
        </li>
        <li>
          <a
            href="/articles/deep-research-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Deep Research agents in production 2026
          </a>
          {" "}- the broader survey of the deep-
          research pattern, of which AI-Q is the
          NVIDIA open-source implementation.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol the toolkit&rsquo;s MCP
          client and server implement, and the
          reason its function abstraction maps so
          cleanly to MCP tools.
        </li>
        <li>
          <a
            href="/articles/a2a-protocol-cross-vendor-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            A2A protocol for cross-vendor agents in
            2026
          </a>
          {" "}- the standard behind NAT&rsquo;s
          <code>a2a_client</code> and
          <code>a2a_server</code> functions.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in
            2026
          </a>
          {" "}- the wider story on the eval and
          tracing tools the toolkit plugs into.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- one of the frameworks most commonly
          wrapped as a NAT function, and the one
          used under the deep research agent in the
          AI-Q blueprint.
        </li>
      </ul>
    </div>
  );
}
