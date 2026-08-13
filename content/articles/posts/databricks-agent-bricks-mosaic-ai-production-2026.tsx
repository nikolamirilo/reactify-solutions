import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "databricks-agent-bricks-mosaic-ai-production-2026",
  title:
    "Databricks Agent Bricks and Mosaic AI in production 2026: the governed agent platform on the lakehouse",
  excerpt:
    "How Databricks turned the Mosaic AI stack into a full agent platform in 2025 and 2026. Covers Agent Bricks (Structured Extraction, Knowledge Assistant, Custom LLM, Multi-Agent Supervisor), MLflow 3 tracing and the CLEARS quality framework, managed MCP servers on Unity Catalog, Vector Search and Genie spaces, the ChatAgent interface, and how teams like AstraZeneca, 7-Eleven, Fox Corporation, and Block ship production agents on the lakehouse.",
  metaDescription:
    "A practical, technical guide to building production AI agents on Databricks in 2026. Covers Agent Bricks and its four templates, the Mosaic AI Agent Framework with MLflow ChatAgent and LangGraph, MLflow 3 tracing and the CLEARS evaluation framework, managed MCP servers over Unity Catalog, Vector Search and Genie spaces, Unity AI Gateway, deployment on Model Serving, and real customer builds from AstraZeneca, 7-Eleven, Fox, and Block.",
  image:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Databricks",
    "Mosaic AI",
    "Agent Bricks",
    "MLflow",
    "Unity Catalog",
    "MCP",
    "LangGraph",
    "Data Engineering",
    "Production",
  ],
  publishDate: "2026-08-13",
  readingTime: "16 min read",
};

export default function DatabricksAgentBricksMosaicAiProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In June 2025 Databricks put Agent Bricks into beta at
        Data + AI Summit. In early 2026 it went GA. At Data +
        AI Summit 2026 the numbers on stage were the kind that
        turn a niche product into a category: over 100,000
        agents built on the platform, and more than 1
        quadrillion tokens processed per year. This article is
        how we build on Databricks for client work in 2026:
        what Agent Bricks actually gives you, how the Mosaic AI
        Agent Framework fits underneath it, why MLflow 3 and
        the CLEARS quality model are the pieces that make it
        production, and where it sits against the other agent
        platforms we cover on the blog.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the lakehouse became the natural home for agents
      </h2>
      <p className="mb-6 leading-relaxed">
        The hardest part of a production agent is not the
        model. It is the data. An agent that answers customer
        questions needs the CRM. An agent that extracts fields
        from PDFs needs a place to write the results. An agent
        that reads sales numbers needs the same tables the BI
        team already trusts. If those live on one platform and
        the agent lives on another, you spend weeks writing
        connectors, syncing embeddings, and rebuilding
        permissions in a second place.
      </p>
      <p className="mb-6 leading-relaxed">
        Databricks noticed this earlier than most. Mosaic AI
        started as the ML and GenAI layer on top of the
        lakehouse, and by 2025 it had grown into a full agent
        stack: Foundation Model APIs and Model Serving for
        model access, Vector Search over Delta tables, Unity
        Catalog for governance, MLflow for tracking and
        evaluation, and AI Gateway for policy and rate
        controls. Agent Bricks is the layer that ties those
        pieces into a task-first product. You describe the
        agent in words, hand it enterprise data, and the
        platform builds, evaluates, and deploys a version
        tuned for cost and quality.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>June 2024</strong>: Databricks acquires
          MosaicML for $1.3B. The team becomes the base for the
          Mosaic AI product line.
        </li>
        <li>
          <strong>June 11, 2025</strong>: At Data + AI Summit
          2025, Databricks launches Agent Bricks in beta.
          MLflow 3.0 ships the same week with GenAI-native
          tracing, prompt versioning, and evaluation. Managed
          MCP support is announced for Unity Catalog functions,
          Vector Search indexes, and Genie spaces.
        </li>
        <li>
          <strong>Late 2025</strong>: Agent Bricks adds the
          Multi-Agent Supervisor template and moves Structured
          Extraction, Knowledge Assistant, and Custom LLM to
          general availability. The ChatAgent interface in
          MLflow becomes the recommended way to author custom
          agents.
        </li>
        <li>
          <strong>Early 2026</strong>: Agent Bricks reaches GA.
          The Unity AI Gateway is repositioned as the single
          control plane for model calls, tool calls, and MCP
          servers.
        </li>
        <li>
          <strong>Data + AI Summit 2026</strong>: Databricks
          reports 100,000+ agents built on Agent Bricks and 1+
          quadrillion tokens per year processed on the
          platform. AstraZeneca, 7-Eleven, Fox Corporation, and
          Block appear as customer references. The CLEARS
          quality framework is formalised as the standard
          evaluation contract inside MLflow.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The stack in one picture
      </h2>
      <CodeBlock
        language="bash"
        filename="Databricks agent stack: layers from data to end user"
        code={`+------------------------------------------------------------+
|  User / app / Databricks App                               |
+-----------------------------+------------------------------+
                              |
                              v
+------------------------------------------------------------+
|  Agent Bricks (task templates)                             |
|                                                            |
|  Structured   Knowledge   Custom LLM   Multi-Agent         |
|  Extraction   Assistant                Supervisor          |
+-----------------------------+------------------------------+
                              |
                              v
+------------------------------------------------------------+
|  Mosaic AI Agent Framework                                 |
|                                                            |
|  MLflow ChatAgent  |  Model Serving endpoints              |
|  LangGraph adapter |  agents.deploy()                      |
+-----------------------------+------------------------------+
                              |
                              v
+------------------------------------------------------------+
|  Unity AI Gateway  |  Managed MCP servers                  |
|  - routing, quota  |  - Unity Catalog functions            |
|  - PII / audit     |  - Vector Search indexes              |
|  - fallbacks       |  - Genie spaces                       |
+-----------------------------+------------------------------+
                              |
                              v
+------------------------------------------------------------+
|  Unity Catalog on the Lakehouse                            |
|  Delta tables, files, functions, permissions               |
+------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Two things about this stack matter for planning a real
        build. First, every layer above Unity Catalog inherits
        its permissions. A user who cannot read a table also
        cannot ask an agent a question that would need that
        table. Second, MLflow sits across the whole thing. The
        same traces you log during development are the ones
        you monitor in production, and the same LLM judges you
        set up for offline eval keep running on live traffic.
        You do not build a second observability stack.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Agent Bricks: four templates that cover most of the
        work
      </h2>
      <p className="mb-6 leading-relaxed">
        Agent Bricks does not ask you to design an agent from
        scratch. It gives you four task templates, each with
        an opinionated harness, a scoring rubric, and an
        auto-optimiser that tries prompt variants and model
        choices until the score stops improving.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Structured Extraction</strong> reads a
        document, an email, or a scanned PDF and returns a
        typed record. You define the schema, point it at a
        Delta table of examples, and let the platform pick the
        model and prompt. AstraZeneca used it to parse more
        than 400,000 clinical trial documents and had a
        working agent in under sixty minutes, according to the
        DAIS 2026 keynote.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Knowledge Assistant</strong> is the classic
        retrieval-augmented chat pattern, wired end to end.
        It takes a set of Unity Catalog Vector Search indexes,
        a system prompt, and an evaluation set, and returns a
        deployed chat endpoint with citations. The difference
        from a hand-rolled RAG app is the evaluation loop: the
        platform runs an LLM judge on every answer, tracks
        drift, and shows the failing traces in the same UI.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Custom LLM</strong> covers summarisation,
        classification, and text transformation. You describe
        the task in natural language, upload a small set of
        input and output examples, and the platform writes the
        system prompt for you and tunes it against your
        examples. If you have enough examples, it can also
        fine-tune a smaller open-weights model that costs less
        to serve than a hosted frontier model at similar
        quality.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Multi-Agent Supervisor</strong> is the
        orchestration template. It takes a set of already-
        built agents (Bricks or custom), a supervisor prompt,
        and a routing policy, and lets one agent hand off to
        another. 7-Eleven used this pattern with LangGraph to
        build a marketing assistant that swaps personas based
        on the user query: one persona writes campaign copy,
        another drafts internal briefs, a third answers
        product questions.
      </p>
      <p className="mb-6 leading-relaxed">
        The auto-optimiser under all four templates needs at
        least around 100 example inputs to do useful work.
        Below that, it falls back to defaults that are still
        reasonable, but the interesting savings on latency and
        cost show up once you feed it real traffic.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The Mosaic AI Agent Framework: what sits underneath
      </h2>
      <p className="mb-6 leading-relaxed">
        If the four templates do not fit, you drop one layer
        down to the Mosaic AI Agent Framework. This is the SDK
        you use to author a custom agent, register it in Unity
        Catalog, and deploy it as a Model Serving endpoint.
        The centrepiece is the <code>ChatAgent</code>
        interface from MLflow. ChatAgent is a small typed
        contract: implement <code>predict</code> and
        <code>predict_stream</code>, return a well-typed
        response, and every Databricks feature that expects an
        agent will accept it. AI Playground, Agent Monitoring,
        the deploy CLI, and the review app all key off this
        interface.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason to build on ChatAgent rather than raw
        LangChain or a bare model call is what you get for
        free. The framework captures the full multi-turn
        history with tool call context. It gives you typed
        Python objects with IDE autocomplete. It logs traces
        to MLflow with no extra code. And it makes the agent
        loggable as a <code>mlflow.pyfunc</code> model, which
        is the entry point for the rest of the deployment
        story.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/customer_lookup_agent.py"
        code={`from typing import Any, Optional
import mlflow
from mlflow.pyfunc import ChatAgent
from mlflow.types.agent import (
    ChatAgentMessage,
    ChatAgentResponse,
    ChatContext,
)
from databricks_langchain import (
    ChatDatabricks,
    UCFunctionToolkit,
)
from langgraph.graph import StateGraph, END
from mlflow.langchain.chat_agent_langgraph import (
    ChatAgentState,
    ChatAgentToolNode,
)


class CustomerLookupAgent(ChatAgent):
    def __init__(self) -> None:
        self.llm = ChatDatabricks(
            endpoint="databricks-meta-llama-3-3-70b-instruct",
            temperature=0.1,
        )
        # Unity Catalog function registered as a tool.
        toolkit = UCFunctionToolkit(
            function_names=["prod.crm.get_customer_by_email"],
        )
        self.tools = toolkit.tools

        self.graph = self._build_graph()

    def _build_graph(self):
        graph = StateGraph(ChatAgentState)
        graph.add_node("model", self._call_model)
        graph.add_node("tools", ChatAgentToolNode(self.tools))

        graph.set_entry_point("model")
        graph.add_conditional_edges(
            "model",
            lambda s: "tools" if s["messages"][-1].tool_calls else END,
        )
        graph.add_edge("tools", "model")
        return graph.compile()

    def _call_model(self, state):
        response = self.llm.bind_tools(self.tools).invoke(
            state["messages"],
        )
        return {"messages": [response]}

    def predict(
        self,
        messages: list[ChatAgentMessage],
        context: Optional[ChatContext] = None,
        custom_inputs: Optional[dict[str, Any]] = None,
    ) -> ChatAgentResponse:
        state = self.graph.invoke(
            {"messages": [m.to_message() for m in messages]},
        )
        return ChatAgentResponse(
            messages=[
                ChatAgentMessage.from_message(m)
                for m in state["messages"]
            ],
        )


mlflow.models.set_model(CustomerLookupAgent())`}
      />
      <p className="mb-6 leading-relaxed">
        Three details in that snippet are worth flagging.
        First, the tool is a Unity Catalog function, not a
        Python callable. Registering the SQL or Python tool
        in Unity Catalog means access control, lineage, and
        audit apply automatically. Second, the LLM is a
        Databricks Model Serving endpoint, so the same call
        goes through the AI Gateway that governs every other
        model call in the workspace. Third, the ChatAgent
        interface is the whole public API of the class. The
        LangGraph state machine is an implementation detail;
        you could swap it for OpenAI Agents SDK or a plain
        while loop and the rest of the platform would not
        care.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Registering and deploying: two lines that move a lot
      </h2>
      <p className="mb-6 leading-relaxed">
        The path from a working agent notebook to a live
        endpoint is short. You log the model to Unity Catalog,
        declare the resources the agent needs at runtime, and
        deploy it. The framework handles the container, the
        autoscaler, the token and rate policy, and the trace
        pipeline.
      </p>
      <CodeBlock
        language="python"
        filename="src/agents/deploy_customer_lookup.py"
        code={`import mlflow
from mlflow.models.resources import (
    DatabricksFunction,
    DatabricksServingEndpoint,
)
from databricks import agents

CATALOG = "prod"
SCHEMA = "agents"
MODEL_NAME = f"{CATALOG}.{SCHEMA}.customer_lookup"

with mlflow.start_run():
    logged = mlflow.pyfunc.log_model(
        artifact_path="agent",
        python_model="src/agents/customer_lookup_agent.py",
        pip_requirements=[
            "mlflow>=3.0.0",
            "databricks-langchain>=0.5.0",
            "langgraph>=0.2.0",
        ],
        resources=[
            DatabricksServingEndpoint(
                endpoint_name="databricks-meta-llama-3-3-70b-instruct",
            ),
            DatabricksFunction(
                function_name="prod.crm.get_customer_by_email",
            ),
        ],
        registered_model_name=MODEL_NAME,
    )

deployment = agents.deploy(
    model_name=MODEL_NAME,
    model_version=logged.registered_model_version,
    scale_to_zero=True,
    environment_vars={"LOG_LEVEL": "INFO"},
)

print("Endpoint URL:", deployment.query_endpoint)
print("Review app:  ", deployment.review_app_url)`}
      />
      <p className="mb-6 leading-relaxed">
        The <code>resources</code> argument is the piece that
        does the heavy lifting. Every endpoint, function,
        vector index, or table the agent touches at runtime
        must be declared here. The deployment then requests
        the right permissions on your behalf, mounts short-
        lived credentials into the serving container, and
        rejects any call that tries to reach an undeclared
        resource. This is the part that turns a working
        prototype into something a security team will sign
        off on.
      </p>
      <p className="mb-6 leading-relaxed">
        <code>agents.deploy</code> also stands up a review
        app: a small web UI where domain experts can chat with
        the agent, thumbs-up or thumbs-down each turn, and
        write comments. The feedback goes straight into the
        MLflow evaluation dataset, which then becomes the
        input to the next tuning run. This closed loop is what
        makes the platform feel less like a chat SDK and more
        like a full ML lifecycle for agents.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MLflow 3 and the CLEARS quality model
      </h2>
      <p className="mb-6 leading-relaxed">
        MLflow 3 for GenAI is the observability and evaluation
        backbone. Tracing is automatic once you use ChatAgent:
        every model call, every tool call, every retrieval,
        every timing, all of it is logged with correlation IDs
        so you can walk from a user complaint back to the
        exact prompt and response.
      </p>
      <p className="mb-6 leading-relaxed">
        The evaluation story built on top of that trace is the
        CLEARS framework. It is six scored dimensions, each
        with its own LLM judge or scorer, run automatically
        on every agent session:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Correctness</strong>: does the final answer
          match the ground truth or the source documents.
        </li>
        <li>
          <strong>Latency</strong>: end-to-end and per-step
          timings, tracked as a distribution not just an
          average.
        </li>
        <li>
          <strong>Execution</strong>: did the tools fire, did
          they succeed, did any of them retry.
        </li>
        <li>
          <strong>Adherence</strong>: did the agent stay
          inside the guardrails and the persona in the system
          prompt.
        </li>
        <li>
          <strong>Relevance</strong>: were the retrieved
          documents and the intermediate steps actually
          useful for the final answer.
        </li>
        <li>
          <strong>Safety</strong>: did any prompt injection,
          PII leak, or off-topic drift make it into the
          response.
        </li>
      </ul>
      <CodeBlock
        language="python"
        filename="src/eval/customer_lookup_eval.py"
        code={`import mlflow
from mlflow.genai.scorers import (
    correctness,
    relevance,
    safety,
    tool_call_success,
    Guidelines,
)

eval_dataset = mlflow.data.load_delta(
    table_name="prod.agents.customer_lookup_eval_v3",
)

results = mlflow.genai.evaluate(
    data=eval_dataset,
    predict_fn=lambda row: mlflow.genai.invoke(
        model_uri="endpoints:/customer_lookup",
        input={"messages": row["messages"]},
    ),
    scorers=[
        correctness(),
        relevance(),
        safety(),
        tool_call_success(),
        Guidelines(
            name="stays_on_topic",
            guidelines=(
                "The answer must only reference the "
                "customer in the input. It must not "
                "invent order IDs or contact details."
            ),
        ),
    ],
)

print(results.tables["metrics"])`}
      />
      <p className="mb-6 leading-relaxed">
        The judges you set up here are the same ones that run
        on live traffic when the agent is deployed. You do not
        need to write a separate monitoring pipeline. If the
        <code>stays_on_topic</code> guideline flags 3 percent
        of production sessions this week and 8 percent next
        week, MLflow shows you the trend, and the failing
        traces are one click away. Every enterprise team we
        have shipped Databricks agents for uses this loop as
        the definition of &ldquo;done&rdquo; for a release.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Managed MCP servers on the lakehouse
      </h2>
      <p className="mb-6 leading-relaxed">
        The Model Context Protocol showed up in the Databricks
        stack in 2025 as the standard way to expose enterprise
        data to any MCP-capable client, including Claude
        Desktop, Cursor, VS Code, and the Databricks-hosted
        agents themselves. Managed MCP servers are the
        interesting part: you do not write a server, you turn
        one on. Four kinds are supported out of the box.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Unity Catalog functions</strong>: any
          registered Python or SQL function becomes a tool
          with a typed signature.
        </li>
        <li>
          <strong>Vector Search indexes</strong>: search over
          a Delta-backed embedding index becomes a
          <code>search</code> tool with the same shape the
          OpenAI Deep Research models expect.
        </li>
        <li>
          <strong>Genie spaces</strong>: natural-language
          questions over curated tables become a
          <code>query_data</code> tool that returns rows and a
          plain-English summary.
        </li>
        <li>
          <strong>Unity Catalog connections</strong>: managed
          links to Snowflake, BigQuery, Redshift, Postgres,
          and Salesforce, so the agent can read federated data
          without a bespoke connector.
        </li>
      </ul>
      <CodeBlock
        language="json"
        filename="conf/managed_mcp.json (Databricks agent config)"
        code={`{
  "mcp_servers": [
    {
      "name": "customer_data",
      "type": "unity_catalog",
      "functions": [
        "prod.crm.get_customer_by_email",
        "prod.crm.list_open_tickets"
      ]
    },
    {
      "name": "policy_kb",
      "type": "vector_search",
      "index_name": "prod.docs.policy_index",
      "num_results": 8
    },
    {
      "name": "sales_ask",
      "type": "genie",
      "space_id": "01ef5b3c-ba2a-72c6-9c88-8b6f9c7d1e42"
    }
  ],
  "max_tools": 20
}`}
      />
      <p className="mb-6 leading-relaxed">
        Two things are worth flagging on the MCP side. First,
        the current cap in the platform is 20 tools across all
        connected servers per agent. This is a deliberate
        limit: past around 20 tools most models start choosing
        the wrong one, and the Databricks team saw the same
        pattern the OpenAI Agents team wrote about. If you
        need more, split the agent into a Multi-Agent
        Supervisor with two sub-agents, each with its own
        smaller tool set. Second, everything an MCP server
        exposes still runs through Unity Catalog permissions.
        The end user sees the intersection of what the agent
        is allowed to call and what they are allowed to see.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Unity AI Gateway: the control plane
      </h2>
      <p className="mb-6 leading-relaxed">
        Every model call and every MCP tool call goes through
        the Unity AI Gateway. The Gateway is the piece that
        makes the whole thing safe to hand to a platform team.
        It gives you a single place to manage API keys for
        hosted models (OpenAI, Anthropic, Google), to set
        per-endpoint rate limits, to inject PII redaction, and
        to route calls with fallbacks. Cost governance is
        per-user, per-agent, and per-application, so when
        finance asks how much a specific agent spent last
        month you can answer without digging through raw logs.
      </p>
      <p className="mb-6 leading-relaxed">
        This is also the layer where the platform team can
        swap a model without touching the agent code. If a
        cheaper model does the job on a Custom LLM Brick, you
        change the route in the Gateway and the change lands
        the same day. The agent itself does not need to
        redeploy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Start with a Brick, drop to the SDK only
        if it does not fit</strong>. In our experience about
        70 percent of agent asks map cleanly to one of the
        four templates. Structured Extraction alone covers
        most document-heavy workflows. If the client wants a
        chatbot over their docs, Knowledge Assistant beats a
        hand-rolled RAG app on time-to-production every time.
        Reach for the Mosaic AI Agent Framework only when the
        control flow is genuinely custom.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Register tools in Unity Catalog before you
        write any agent code</strong>. Every tool the agent
        will call, whether it is a SQL query, a Python
        function, or a call to a downstream API, gets
        registered as a UC function first. This forces the
        signature and the permissions to be nailed down before
        any prompt engineering starts. It also means the same
        function can be used by two different agents and by a
        human analyst in a notebook, with the same governance.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Build the eval set before the agent</strong>.
        Twenty or thirty hand-labeled examples in a Delta table
        is enough to get started. The auto-optimiser in Agent
        Bricks and the MLflow judges both need real data. Any
        team that writes the agent first and the eval later
        ends up with a prompt that scores well on nothing.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Pin the eval set schema</strong>. Store the
        eval set as a Delta table with an explicit schema, not
        a JSON file. When the schema changes, MLflow will
        refuse to evaluate against a stale row, which is
        exactly what you want. We have seen more than one team
        chase a bogus regression that turned out to be an eval
        set column that got renamed.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Use the review app for domain experts, not
        for engineers</strong>. The review app is the fastest
        way to get feedback from the people who know the
        answer. Wire it into a Databricks App and give the
        link to the subject-matter expert. Do not ask the
        engineers to grade their own agent.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Set scale-to-zero on internal agents</strong>.
        Serving endpoints can idle to zero replicas. For
        internal agents that see traffic during business
        hours, this cuts serving cost to near zero overnight.
        For customer-facing agents where cold-start latency is
        a problem, keep at least one replica warm.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Route model choice through the Gateway,
        not through the agent</strong>. The Gateway lets a
        platform team A/B a new model, apply a fallback, or
        cut traffic to a bad provider without a redeploy. If
        the model endpoint is hard-coded in the agent, you
        lose all of that.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where Databricks fits against the other agent
        platforms
      </h2>
      <p className="mb-6 leading-relaxed">
        Databricks is the natural pick when the data already
        lives on the lakehouse. If the customer runs on
        Databricks for their BI and their ML, adding agents
        on the same platform means no new access model, no
        new lineage tool, no new billing owner. The Genie and
        Vector Search integrations then act as a shortcut,
        because the tables and the indexes are already there.
      </p>
      <p className="mb-6 leading-relaxed">
        Where the choice gets closer is against{" "}
        <a
          href="/articles/aws-bedrock-agentcore-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          AWS Bedrock AgentCore
        </a>{" "}
        for AWS-heavy shops, against{" "}
        <a
          href="/articles/microsoft-agent-framework-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          the Microsoft Agent Framework
        </a>{" "}
        for shops that live on Azure and Fabric, and against{" "}
        <a
          href="/articles/google-adk-production-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          Google ADK
        </a>{" "}
        for teams standardising on Vertex. The rule we use is
        simple: pick the platform where the enterprise data
        already lives. The agent will end up spending most of
        its time reading and writing that data, so putting
        the agent next to it saves the most engineering.
      </p>
      <p className="mb-6 leading-relaxed">
        For pure code-side patterns (LangGraph, CrewAI, the
        Claude Agent SDK, Pydantic AI), Databricks is a
        deployment target rather than a competitor. You can
        author the agent in LangGraph, wrap it in ChatAgent,
        and deploy it on Model Serving. The framework is
        agnostic to the harness inside the box.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and honest limits
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>What Databricks does well</strong>. Governance
        is the strongest story. Unity Catalog for data, model
        registry for models, MLflow for traces, Gateway for
        model access. Every audit question you get in an
        enterprise deal has a straight answer. The
        auto-optimisation in Agent Bricks is a real time saver
        for common patterns, and the CLEARS framework gives
        you a shared vocabulary for quality that non-ML
        stakeholders (product, legal, compliance) can read.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>What it does not do well</strong>. The
        platform is opinionated about the ChatAgent contract
        and the deployment path. If you want to ship an agent
        with a hard real-time constraint below 100ms, or an
        agent that runs at the edge on-device, Databricks is
        not the fit. It also assumes your data is on the
        lakehouse. Federated Unity Catalog connections cover
        Snowflake and Postgres, but if the source of truth is
        elsewhere and you cannot bring it in, the story is
        weaker than a code-first framework.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cost</strong>. Serving is billed on DBUs and
        model tokens. For high-volume Custom LLM tasks
        (millions of documents), fine-tuning a smaller
        open-weights model on Databricks and serving it in-
        platform tends to beat any hosted frontier model on
        cost per token, and Agent Bricks will do the fine-
        tuning for you. For low-volume knowledge assistants
        that answer a few hundred questions a day, a hosted
        model through the Gateway is cheaper and easier.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends to watch through the rest of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-native data engineering</strong>. Genie
        is already the natural-language query surface over
        curated tables. Expect Genie spaces to become the
        default way both humans and agents interrogate a
        lakehouse. The data engineer stops writing bespoke
        semantic layers and instead curates a small set of
        Genie spaces that agents call as tools.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Fine-tuned Bricks by default</strong>.
        Structured Extraction and Custom LLM already fine-
        tune when they have enough data. As open-weights
        models catch up on general reasoning (Llama 3.3,
        DeepSeek, Qwen), the default path for high-volume
        tasks becomes a small fine-tuned model on Model
        Serving rather than a hosted frontier model. The cost
        argument for this is already strong at scale.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>MCP everywhere</strong>. Databricks made a
        clear bet on MCP as the standard tool interface. Every
        Bricks integration, every Genie space, every Vector
        Search index is already reachable over MCP. The next
        step is external MCP servers (Slack, Jira, Salesforce)
        showing up in Unity Catalog with governance applied,
        so any agent in the workspace can talk to them without
        a bespoke integration.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Agent-to-agent handoffs across
        organisations</strong>. With MCP as the tool layer and{" "}
        <a
          href="/articles/a2a-protocol-cross-vendor-agents-2026"
          className="font-semibold text-primaryColor hover:underline"
        >
          A2A as the cross-vendor agent protocol
        </a>
        , the direction is clear: agents from Databricks
        talking to agents from Microsoft, OpenAI, and Google
        without a shared platform. Databricks is not the loudest
        A2A voice yet, but the Gateway is the natural place
        for cross-org call policy to live once that story
        matures.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: use the lakehouse if your data already
        lives there
      </h2>
      <p className="mb-6 leading-relaxed">
        The bet Databricks made in 2024 with the MosaicML
        acquisition has paid off. The platform in mid-2026 is
        not a chat SDK bolted onto a data warehouse. It is a
        full agent stack: task templates at the top, a typed
        agent framework in the middle, MLflow tracing across
        the whole thing, and Unity Catalog under it all. Real
        customers ship real agents on it. The numbers on stage
        at DAIS 2026 (100K+ agents, 1+ quadrillion tokens per
        year) are not marketing fluff; they line up with what
        we see on client engagements.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy question here is really a where-does-
        the-data-live question. If your customer runs their
        analytics and their ML on Databricks, adding agents on
        the same platform is the shortest path to production.
        Start with an Agent Brick, wire it to Unity Catalog
        data, set up a small eval set, and put the review app
        in front of a subject matter expert. If the template
        does not fit, drop one layer to the Mosaic AI Agent
        Framework and author a ChatAgent. Either way, MLflow
        and the CLEARS framework give you a shared definition
        of quality that non-engineers can read, and that is
        the piece that most agent projects skip until it hurts.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://www.databricks.com/blog/introducing-agent-bricks"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Introducing Agent Bricks (June 11,
            2025)
          </a>
          {" "}- the beta launch post from Data + AI Summit
          2025, with the four templates, the auto-optimisation
          story, and the initial customer references.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/agent-bricks-dais-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Agent Bricks at Data + AI Summit 2026
          </a>
          {" "}- the GA update with the 100K agents and 1+
          quadrillion tokens numbers, plus the CLEARS
          framework formalisation.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/agent-bricks-governed-enterprise-agent-platform"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: Agent Bricks, the governed enterprise
            agent platform
          </a>
          {" "}- the engineering read on how Unity Catalog,
          the AI Gateway, and MLflow tracing tie together for
          a governed deployment.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/mlflow-30-unified-ai-experimentation-observability-and-governance"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: MLflow 3.0 for GenAI
          </a>
          {" "}- the launch post for the GenAI-native MLflow
          version, covering ChatAgent, tracing, prompt
          versioning, and cross-platform monitoring.
        </li>
        <li>
          <a
            href="https://docs.databricks.com/aws/en/mlflow3/genai/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks docs: MLflow 3 for GenAI
          </a>
          {" "}- the official reference for tracing, judges,
          scorers, evaluation datasets, and the production
          monitoring loop.
        </li>
        <li>
          <a
            href="https://docs.databricks.com/aws/en/agents/custom-agents/author-agent"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks docs: Author an agent and deploy it on
            Databricks Apps
          </a>
          {" "}- the code-first tutorial for the Mosaic AI
          Agent Framework, with the LangGraph plus ChatAgent
          pattern used above.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/azure/databricks/generative-ai/mcp/managed-mcp"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Learn: Azure Databricks managed MCP
            servers
          </a>
          {" "}- the reference for the four managed server
          kinds (UC functions, Vector Search, Genie spaces,
          UC connections) and the 20-tool cap.
        </li>
        <li>
          <a
            href="https://github.com/databricks/genai-cookbook"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            databricks/genai-cookbook on GitHub
          </a>
          {" "}- runnable notebooks that build the Knowledge
          Assistant and Custom LLM patterns end to end,
          including eval and deployment.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the deeper read on the protocol that
          Databricks managed MCP servers implement.
        </li>
        <li>
          <a
            href="/articles/end-to-end-analytics-microsoft-fabric"
            className="font-semibold text-primaryColor hover:underline"
          >
            End-to-end analytics with Microsoft Fabric
          </a>
          {" "}- the sister read for teams on the Azure and
          Fabric side of the same lakehouse-plus-agents story.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the general read on the tracing and eval
          patterns that CLEARS formalises on Databricks.
        </li>
        <li>
          <a
            href="/articles/langgraph-production-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            LangGraph in production 2026
          </a>
          {" "}- the framework used inside the ChatAgent
          example above.
        </li>
      </ul>
    </div>
  );
}
