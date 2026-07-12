import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "text-to-sql-agents-production-2026",
  title:
    "Text-to-SQL agents in production 2026: from Snowflake Cortex Analyst and Databricks Genie to Wren AI, Vanna, and Uber QueryGPT",
  excerpt:
    "How text-to-SQL went from a party trick to a production line every serious data platform now ships. Covers the semantic-layer-first architecture that Snowflake, Databricks, Microsoft Fabric, and the open-source stacks all landed on, the intent-then-schema-then-generate agent loop Uber uses to save 140,000 hours a month, why the BIRD benchmark is broken, and the honest cost, accuracy, and governance trade-offs for shipping self-service analytics to business users.",
  metaDescription:
    "A practical, technical guide to text-to-SQL and analytics agents in 2026. Covers Snowflake Cortex Analyst with semantic views, Databricks AI/BI Genie with metric views and certified answers, Microsoft Fabric Data Agent with NL2SQL and NL2DAX and NL2KQL, Uber QueryGPT with intent and table and column-prune agents, Wren AI open-source GenBI, Vanna RAG-based text-to-SQL, the shared architecture patterns, the broken BIRD benchmark, and the production trade-offs for self-service analytics.",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: [
    "AI",
    "Agents",
    "Text-to-SQL",
    "Snowflake",
    "Databricks",
    "Microsoft Fabric",
    "Wren AI",
    "Vanna",
    "Data Analytics",
    "Semantic Layer",
    "Production",
  ],
  publishDate: "2026-07-12",
  readingTime: "17 min read",
};

export default function TextToSqlAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        In September 2024 Uber published the engineering
        write-up for QueryGPT. A year later the same idea
        had become a product line at every major data
        platform: Snowflake shipped Cortex Analyst,
        Databricks shipped AI/BI Genie, Microsoft shipped
        Fabric Data Agent, and the open-source stacks (Wren
        AI, Vanna, Dataherald) crossed the tens-of-thousands
        of GitHub stars. Text-to-SQL is now the pattern
        every serious data team either ships or evaluates.
        This article is how those systems actually work in
        2026: the semantic layer that carries the whole
        thing, the intent-then-schema-then-generate loop
        every serious agent lands on, why BIRD-style
        benchmarks stopped being useful, and the real cost,
        accuracy, and governance trade-offs of putting
        SQL-writing agents in front of business users.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why text-to-SQL is the analytics-agent pattern that
        stuck
      </h2>
      <p className="mb-6 leading-relaxed">
        SQL is the universal API to enterprise data. It is
        also the skill gap that keeps most business users
        one ticket away from any answer they need. A text-
        to-SQL agent closes that gap by taking a plain-
        English question, resolving it against a governed
        semantic model, generating a SQL query, running it,
        and returning a result the user can trust.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason this pattern crossed into production in
        2025 and 2026 (and dashboards, chatbots, and copilot
        panels are now all built on it) is that the numbers
        finally worked. Uber&rsquo;s QueryGPT hit about 300
        daily active users in a limited release, with 78%
        of users saying the generated query cut the time
        they would have spent writing it from scratch, and
        Wren AI documented Uber saving roughly 140,000
        person-hours per month once the system rolled out
        broadly. Snowflake, Databricks, and Microsoft each
        rolled out their own hosted versions in the same
        window because the pattern is the fastest way to
        put AI in front of the biggest audience in an
        enterprise data platform: the analysts who cannot
        write SQL but pay the licence.
      </p>
      <p className="mb-6 leading-relaxed">
        The other reason it stuck is that it is a well-
        bounded agent. The action space is one language
        (SQL), the return value is a table, and the
        validator is a database engine. Compared with
        general-purpose agents that call arbitrary tools
        and modify state, a text-to-SQL agent is read-only,
        deterministic to execute, and easy to reason about.
        That is why every vendor treats it as the anchor
        product for their broader agent story, and why the
        engineering patterns below converge so tightly.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>September 2024</strong>: Uber publishes
          the QueryGPT engineering post. First mainstream
          in-house write-up describing the intent, table,
          and column-prune agent chain now used everywhere.
        </li>
        <li>
          <strong>October 2024</strong>: Snowflake announces
          Cortex Analyst in public preview, positioning
          semantic models as the primitive that grounds
          text-to-SQL.
        </li>
        <li>
          <strong>February 2025</strong>: Databricks ships
          AI/BI Genie into general availability, with Genie
          Spaces, metric views, and instructions as the
          user-facing configuration surface.
        </li>
        <li>
          <strong>April 2025</strong>: Cortex Analyst reaches
          general availability with multi-turn conversation
          and a REST API. Semantic model YAML becomes the
          canonical shape teams write against.
        </li>
        <li>
          <strong>June 2025</strong>: Microsoft ships Fabric
          Data Agent in preview, combining NL2SQL, NL2DAX,
          and NL2KQL under one router that picks the tool
          based on which data source answers the question.
        </li>
        <li>
          <strong>September 2025</strong>: Wren AI releases
          v0.20, adding an open Modeling Definition
          Language (MDL) that becomes the open-source
          answer to the vendor semantic layers.
        </li>
        <li>
          <strong>January 2026</strong>: Snowflake publishes
          Arctic-Text2SQL-R1, a reinforcement-learning-
          trained text-to-SQL model that tops BIRD, Spider,
          and BIRD-Critic, and gets folded into the Cortex
          Analyst model rotation.
        </li>
        <li>
          <strong>February 2026</strong>: Databricks adds
          certified answers, trusted UDFs, and a benchmark
          runner to Genie Spaces. The word &ldquo;benchmark&rdquo;
          replaces &ldquo;golden query set&rdquo; as the
          canonical way teams talk about evaluation.
        </li>
        <li>
          <strong>March 2026</strong>: The CIDR paper
          &ldquo;Text-to-SQL Benchmarks are Broken&rdquo;
          documents 52.8% label errors in BIRD and 66.1% in
          Spider 2.0-Snow, kicking off the shift to
          workload-based evaluation with real user
          questions.
        </li>
        <li>
          <strong>May 2026</strong>: Wren AI passes 15,000
          GitHub stars and 1,700+ Discord contributors,
          confirming the open-source semantic-layer approach
          as the reference alternative to hosted vendors.
        </li>
        <li>
          <strong>June 2026</strong>: Snowflake ships
          agentic semantic model improvement (Cortex Analyst
          auto-generates and refines the semantic view from
          verified queries), and the model rotation adds
          Claude Sonnet 4.6.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The semantic layer is the whole game
      </h2>
      <p className="mb-6 leading-relaxed">
        Every serious text-to-SQL system in 2026 - hosted,
        open-source, or in-house - stakes its accuracy on
        one thing: a semantic layer between the LLM and the
        raw database. Give an LLM only a schema (table
        names, column names, data types) and it will make
        the same mistake a new analyst makes. It will pick
        the wrong table, join on the wrong key, and
        aggregate the wrong metric. The semantic layer
        exists to remove that guesswork.
      </p>
      <p className="mb-6 leading-relaxed">
        The pieces are the same across vendors:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Logical tables</strong> that represent
          business entities (customer, order, transaction),
          with human-readable names and descriptions.
        </li>
        <li>
          <strong>Dimensions</strong> - categorical or
          descriptive attributes - with synonyms so
          &ldquo;country&rdquo;, &ldquo;region&rdquo;, and
          &ldquo;geo&rdquo; all resolve to the same column.
        </li>
        <li>
          <strong>Facts and metrics</strong>: revenue,
          active users, churn, expressed as SQL formulas so
          every question uses the same definition.
        </li>
        <li>
          <strong>Joins</strong> with declared cardinality
          (1:1, 1:N, N:M) so the generator does not
          silently multiply rows.
        </li>
        <li>
          <strong>Verified queries</strong>: sample
          question and gold SQL pairs that the generator
          uses as few-shot examples.
        </li>
        <li>
          <strong>Value dictionaries</strong> or example
          values for categorical columns, so
          &ldquo;Australia&rdquo; maps to
          &ldquo;AUS&rdquo; without a guess.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Snowflake calls this a Semantic View (YAML on stage
        or a schema object), Databricks calls it a Genie
        Space plus metric views, Microsoft Fabric calls it
        Data Agent instructions plus example queries, and
        Wren AI calls it MDL (Modeling Definition Language).
        The shape is the same because the problem is the
        same. If your team is choosing a text-to-SQL agent
        and does not yet have a semantic layer, that is
        the work. Everything else is glue.
      </p>
      <CodeBlock
        language="bash"
        filename="semantic-model.yaml (Cortex Analyst shape)"
        code={`name: sales_analytics
description: Revenue and pipeline analytics for the sales org.

tables:
  - name: orders
    base_table:
      database: analytics
      schema: sales
      table: fact_orders
    description: One row per completed order.
    dimensions:
      - name: order_country
        expr: country_code
        synonyms: [country, region, geo, market]
        sample_values: [US, DE, FR, JP, AU]
      - name: order_date
        expr: created_at::date
    facts:
      - name: order_amount
        expr: amount_usd
        description: Order value in USD after discounts.
    metrics:
      - name: total_revenue
        expr: SUM(amount_usd)
      - name: order_count
        expr: COUNT(DISTINCT order_id)
    filters:
      - name: completed_orders
        expr: status = 'COMPLETED'

verified_queries:
  - name: revenue_by_country_last_quarter
    question: What was our revenue by country last quarter?
    sql: |
      SELECT order_country, SUM(order_amount) AS total_revenue
      FROM orders
      WHERE order_date >= DATEADD(quarter, -1, CURRENT_DATE)
        AND status = 'COMPLETED'
      GROUP BY order_country
      ORDER BY total_revenue DESC;`}
      />
      <p className="mb-6 leading-relaxed">
        The Databricks Genie best-practices post makes this
        point in the most operational way we have seen. If
        Genie picks the wrong table, do not fix it in the
        prompt - fix the table description. If it picks
        the wrong column, add a synonym. If it applies the
        wrong join, define the cardinality on the joins
        tab. If it hardcodes the wrong filter, encode the
        filter in the data layer. The general instructions
        pane is the last resort, not the first. Teams that
        try to solve semantic gaps with prompt instructions
        end up with a Genie Space that misbehaves on any
        question that was not anticipated.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Snowflake Cortex Analyst: the fully managed path
      </h2>
      <p className="mb-6 leading-relaxed">
        Cortex Analyst is the shortest path from a
        Snowflake data warehouse to a production text-to-
        SQL API. You author a semantic view (YAML on a
        stage or a first-class Semantic View object), point
        the REST API at it, and get back a SQL string plus
        a natural-language explanation of how the query
        was assembled. The service handles model selection,
        prompt construction, and the tool-calling loop.
      </p>
      <CodeBlock
        language="python"
        filename="src/analytics/cortex_analyst_client.py"
        code={`import requests

SNOWFLAKE_ACCOUNT = "acme"
TOKEN = get_snowflake_pat()

def ask_analyst(question: str, history: list = None) -> dict:
    messages = (history or []) + [
        {
            "role": "user",
            "content": [{"type": "text", "text": question}],
        }
    ]
    r = requests.post(
        f"https://{SNOWFLAKE_ACCOUNT}.snowflakecomputing.com"
        "/api/v2/cortex/analyst/message",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "X-Snowflake-Authorization-Token-Type": "PROGRAMMATIC_ACCESS_TOKEN",
            "Content-Type": "application/json",
        },
        json={
            "messages": messages,
            "semantic_model_file": "@analytics.sales.models/sales_analytics.yaml",
        },
        timeout=60,
    )
    r.raise_for_status()
    return r.json()

first = ask_analyst("Revenue by country last quarter?")
sql = next(
    c["statement"] for c in first["message"]["content"] if c["type"] == "sql"
)
print(sql)

# Multi-turn: pass the whole history back.
followup = ask_analyst(
    "What about only Europe?", history=[first["message"]]
)
`}
      />
      <p className="mb-6 leading-relaxed">
        A few Cortex-specific details are worth knowing.
        First, the service picks the model per request from
        a ranked rotation. In mid-2026 that rotation is
        Claude Sonnet 4.6, Claude Sonnet 4.5, GPT-4.1,
        Snowflake&rsquo;s own Arctic-Text2SQL-R1.5 with
        thinking, and a Mistral Large 2 plus Llama 3.1 70B
        fallback. You do not pick the model; you can
        restrict the pool through model-level RBAC when
        compliance requires it. Second, data never leaves
        Snowflake&rsquo;s governance boundary - the
        semantic model YAML is what the LLM sees, and only
        the generated SQL runs against your warehouse.
        Third, cost is per successful message, not per
        token, unless the analyst is invoked through Cortex
        Agents; that keeps the pricing predictable at the
        REST layer.
      </p>
      <p className="mb-6 leading-relaxed">
        The June 2026 agentic semantic model improvement
        release added something worth calling out: Cortex
        Analyst will now auto-generate a starter semantic
        view from a set of verified queries, and iterate on
        it to close accuracy gaps. It is the first hosted
        text-to-SQL service that treats the semantic layer
        itself as an agent target, not just a config file.
        The practical impact is that teams can seed the
        model with 20 questions and answers instead of
        hand-writing a full YAML.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Databricks AI/BI Genie: benchmarks, metric views,
        and certified answers
      </h2>
      <p className="mb-6 leading-relaxed">
        Genie sits closer to a BI tool than a REST API.
        You build a Genie Space by pointing at a set of
        Unity Catalog tables, then teach it your
        organisation through five surfaces: table and
        column descriptions with synonyms, a Joins tab
        with declared cardinality, example SQL queries
        (few-shot with usage guidelines), SQL expressions
        and trusted UDFs, and a general-instructions pane
        for organisational context.
      </p>
      <p className="mb-6 leading-relaxed">
        Two Databricks-specific ideas are worth pulling out
        because every mature text-to-SQL system converges
        on the same ideas by different names.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Metric views</strong> encode a metric once
        (revenue, ARR, active users, cash-back rate) and
        Genie inherits the formula automatically. Any
        question about revenue routes through the same
        expression, so the answer is consistent whether
        the user asked &ldquo;total revenue last month&rdquo;
        or &ldquo;monthly revenue trend&rdquo;. This is
        the same discipline Snowflake enforces through
        metric definitions on the Semantic View, and the
        same discipline dbt&rsquo;s semantic layer ships
        for any warehouse.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Trusted UDFs</strong> and{" "}
        <strong>certified answers</strong> put a locked
        formula behind a query. When Genie routes a
        question through a trusted UDF (say a standardised
        tax calculation), the result carries a Trusted
        badge in the UI. A certified answer is a verified
        question-to-SQL pair that a data owner has signed
        off on; users see the certified tag when Genie
        picks it. Together they are the mechanism that
        turns Genie from a suggestion tool into a
        governance surface: the answers business users can
        act on are the ones that carry the badges.
      </p>
      <CodeBlock
        language="bash"
        filename="Genie Space configuration surfaces"
        code={`Metadata           -> Table + column descriptions and synonyms
Joins              -> Declared PK/FK + cardinality (1:1, 1:N, N:M)
Example queries    -> Golden SQL + question + usage guidelines
SQL expressions    -> Reusable filters/dimensions/measures
Trusted UDFs       -> Locked business logic (tax, ARR, etc.)
General instructions -> High-level narrative, kept short
Benchmarks         -> A repeatable set of questions with expected outputs`}
      />
      <p className="mb-6 leading-relaxed">
        The other thing Databricks got right in 2026 is
        the benchmark tab. A Genie Space now ships with a
        runner that plays a curated question set against
        the current configuration and produces pass/fail
        results. The Best Practices post is explicit: run
        benchmarks before you add any general instruction,
        and run them again after any change. When you add
        a new data source or metric, the benchmark tells
        you whether an existing answer regressed. This is
        the operational habit that separates a Genie Space
        that stays accurate from one that decays.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Microsoft Fabric Data Agent: NL2SQL, NL2DAX,
        NL2KQL, and the router that picks between them
      </h2>
      <p className="mb-6 leading-relaxed">
        Fabric Data Agent is the Microsoft answer, and the
        interesting shape is that it is not just text-to-
        SQL. A single agent can be pointed at up to five
        data sources in any combination: a warehouse
        (T-SQL), a lakehouse (T-SQL), a Power BI semantic
        model (DAX), a KQL database (KQL), a mirrored
        database, or Microsoft Graph. Behind the scenes an
        Azure OpenAI Assistant runs as a router that picks
        NL2SQL, NL2DAX, or NL2KQL based on which data
        source can answer the question.
      </p>
      <CodeBlock
        language="bash"
        filename="Fabric Data Agent request flow"
        code={`user question
    |
    v
Fabric Data Agent (Azure OpenAI Assistant)
    |-- schema access with user credentials (Entra ID)
    |-- prompt = user question + schema + instructions + few-shot examples
    |
    v
Router picks a tool per data source:
    - Warehouse / Lakehouse -> NL2SQL (T-SQL)
    - Power BI semantic model -> NL2DAX
    - KQL database -> NL2KQL (+ UDFs)
    - Microsoft Graph -> graph query
    |
    v
Generated query validated by the tool's own RAI + security policies
    |
    v
Query executed under the user's identity, RBAC enforced by the source
    |
    v
Result + intermediate steps returned in the chat surface`}
      />
      <p className="mb-6 leading-relaxed">
        Three details make Fabric a strong option when the
        analytics stack is already on Microsoft. First,
        auth is Entra ID all the way through - no service
        principal, no key management, and every query runs
        under the asker&rsquo;s identity so RBAC on the
        semantic model or warehouse is enforced
        automatically. Second, the multi-modal shape (SQL
        plus DAX plus KQL) means a single agent can span
        a warehouse for structured facts, a Power BI model
        for reporting semantics, and a KQL database for
        telemetry, without the user having to know which
        one holds the answer. Third, ALM is built in -
        Data Agents version-control with Git integration
        and promote through Fabric deployment pipelines,
        so a change to the semantic layer in dev flows to
        prod through the same review path as any Fabric
        artifact.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-off is the same as picking any hosted
        offering: you get less control over the model and
        the prompt than you do with a self-hosted stack,
        and the answer quality is bounded by how well you
        wrote the instructions, few-shot examples, and
        table descriptions. Microsoft&rsquo;s own guidance
        is unambiguous on this point: descriptive names
        for tables and columns, few-shot examples per
        source, and clear instructions for domain-specific
        acronyms. Skipping any of the three costs accuracy.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Uber QueryGPT: the reference in-house architecture
      </h2>
      <p className="mb-6 leading-relaxed">
        The Uber QueryGPT post is the most useful
        engineering document any team has published on
        building text-to-SQL in-house. It is worth reading
        in full because the arc it describes - from a
        hackathon RAG over schemas to a production agent
        chain - is the arc every serious in-house project
        goes through. The current architecture that Uber
        ships is:
      </p>
      <CodeBlock
        language="bash"
        filename="Uber QueryGPT production pipeline"
        code={`user question
    |
    v
Prompt enhancer (LLM)
    |  rewrites and enriches the question with implicit context
    v
Intent agent (LLM)
    |  maps question to one or more "workspaces" (business domains)
    |  workspace = curated set of tables + SQL samples
    v
RAG on the selected workspace
    |  vector search over SQL samples + table schemas
    v
Table agent (LLM)
    |  proposes the tables to use
    |  user can accept ("Looks good") or edit the list
    v
Column prune agent (LLM)
    |  removes columns not needed for the query
    |  keeps token count under the model limit
    v
Query generation (LLM)
    |  produces SQL + natural-language explanation
    v
Validation agent (planned)
    |  catches hallucinated tables/columns before running`}
      />
      <p className="mb-6 leading-relaxed">
        The lessons Uber lists at the end of the post are
        the ones every team learns the second time around.
        <strong>LLMs are excellent classifiers</strong>:
        the intent, table, and column-prune agents each
        beat any single-shot generation because they get a
        narrow task, not a general one. <strong>User
        prompts are not context-rich</strong>: a raw
        five-word question rarely gets a good answer, so
        a prompt-enhancer step is the highest-leverage
        addition after the semantic layer.{" "}
        <strong>Hallucinations do not disappear</strong>:
        even a good agent occasionally invents a column,
        so a validation pass and an accuracy dashboard
        keep the system honest.
      </p>
      <p className="mb-6 leading-relaxed">
        The workspace idea is the Uber version of a
        semantic layer scoped to a business domain. Rather
        than let the RAG pick from all of Uber&rsquo;s
        thousands of tables, the intent agent narrows to
        one of about a dozen system workspaces (Mobility,
        Ads, Core Services, Platform Engineering, and so
        on). Users can also create custom workspaces
        for their team&rsquo;s specific tables. This is
        what &ldquo;Genie Space&rdquo; and &ldquo;semantic
        view scope&rdquo; look like at a company that
        built its own pipeline first.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Wren AI: the open-source semantic layer for AI
        agents
      </h2>
      <p className="mb-6 leading-relaxed">
        Wren AI is the open-source stack we point clients
        to when the constraint is self-hosting or vendor
        independence. As of mid-2026 it has crossed 15,000
        GitHub stars and 1,700+ active Discord
        contributors. It connects to 20+ data sources
        (BigQuery, PostgreSQL, ClickHouse, Redshift,
        Snowflake, dbt, and more) and exposes an MCP-style
        interface so any agent (Claude, Cursor, ChatGPT,
        Slack, Teams, or a custom LangGraph stack) can ask
        questions through the same governed layer.
      </p>
      <p className="mb-6 leading-relaxed">
        The design bet Wren makes is the same one
        Snowflake and Databricks make: an{" "}
        <strong>open context layer</strong> that sits
        between the LLM and the raw warehouse, encoded as
        Modeling Definition Language (MDL). MDL is JSON-
        based, versionable in git, and defines the same
        primitives you would find in a Cortex Semantic
        View: models, columns with descriptions and
        synonyms, relationships with cardinality, metrics,
        and calculated fields. The difference is that Wren
        is LLM-agnostic (OpenAI, Anthropic, Gemini, or a
        private Llama endpoint) and agent-agnostic.
      </p>
      <CodeBlock
        language="bash"
        filename="Wren AI OSS deployment shape"
        code={`docker compose up wren-ui wren-engine wren-ai-service

# wren-ui         : dashboard for authoring MDL and asking questions
# wren-engine     : query planner that binds MDL to warehouse SQL
# wren-ai-service : orchestrates LLM calls, RAG on MDL, generation

# Connect a data source (BigQuery, PostgreSQL, ...)
# Import tables into MDL
# Author metrics and relationships in the UI or in Git
# Expose an MCP endpoint for downstream agents

# Any AI client:
POST /v1/asks
{
  "question": "revenue by country last quarter?",
  "project_id": "sales"
}
# -> { sql, explanation, references }`}
      />
      <p className="mb-6 leading-relaxed">
        The other option in the open-source lane is{" "}
        <strong>Vanna</strong>, which takes a different
        design bet: RAG over a training set of {"{"}question,
        SQL, DDL, documentation{"}"} pairs, without an
        explicit semantic model. You bootstrap Vanna by
        feeding it your DDL statements and a handful of
        gold queries, and it stores those in a vector
        index. On each user question it retrieves the top-
        k relevant examples, injects them into the prompt,
        and generates SQL. It is the fastest way to stand
        up a working prototype, and the accuracy ceiling
        is the quality of the corpus you feed it. On
        production workloads teams often report Vanna
        starting at around 80% accuracy on a small set and
        plateauing there without a semantic model on top.
        The lesson we keep learning is that RAG is
        necessary but not sufficient: it works well when
        the question shape matches a training pair, and
        breaks the first time a new question needs an
        unfamiliar join.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The shared production architecture every serious
        build converges on
      </h2>
      <p className="mb-6 leading-relaxed">
        Line up Cortex Analyst, Genie, Fabric Data Agent,
        QueryGPT, and Wren AI side by side and the same
        pipeline shows up under different names. The stages
        are:
      </p>
      <CodeBlock
        language="bash"
        filename="The reference text-to-SQL agent pipeline"
        code={`+------------------------------------------------------------+
|  1. Understand the question                                |
|     - Prompt enhancer: rewrite terse user input            |
|     - Multi-turn: keep prior turn context                  |
+------------------------------------------------------------+
                    |
                    v
+------------------------------------------------------------+
|  2. Route to a scope                                       |
|     - Workspace / Genie Space / semantic view              |
|     - Picks the tables + few-shot pool for this domain     |
+------------------------------------------------------------+
                    |
                    v
+------------------------------------------------------------+
|  3. Retrieve relevant context                              |
|     - k-NN over verified queries                           |
|     - Semantic model chunks for the shortlisted tables     |
|     - Column prune if token budget is tight                |
+------------------------------------------------------------+
                    |
                    v
+------------------------------------------------------------+
|  4. Generate SQL                                           |
|     - LLM call with model rotation (Claude, GPT, Arctic)   |
|     - Emit SQL + natural-language explanation              |
+------------------------------------------------------------+
                    |
                    v
+------------------------------------------------------------+
|  5. Validate + explain                                     |
|     - Static check: identifiers exist, syntax parses       |
|     - Dry-run against the warehouse (EXPLAIN)              |
|     - Show the intermediate steps to the user              |
+------------------------------------------------------------+
                    |
                    v
+------------------------------------------------------------+
|  6. Execute and return                                     |
|     - Warehouse enforces RBAC on the calling identity      |
|     - Result + citations back to the user                  |
+------------------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        The names change but the stages do not. Cortex
        Analyst hides most of stages 3-5 behind the REST
        API. Genie exposes stages 2-6 in its UI. Fabric
        Data Agent puts the router (stage 2) up front
        because it spans SQL, DAX, and KQL. Uber&rsquo;s
        QueryGPT and Wren AI expose all six as separate
        components you can override. When you evaluate a
        vendor or plan an in-house build, ask which stage
        you are gaining or losing control of, not whether
        the whole shape is different. It is not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        BIRD is broken. What to measure instead.
      </h2>
      <p className="mb-6 leading-relaxed">
        Through 2023 and 2024, the text-to-SQL research
        conversation revolved around BIRD and Spider. Any
        vendor pitch cited its execution accuracy on those
        benchmarks. The state of play changed in early
        2026 when the CIDR paper &ldquo;Text-to-SQL
        Benchmarks are Broken&rdquo; documented a 52.8%
        error rate in BIRD&rsquo;s gold labels and 66.1%
        in Spider 2.0-Snow. Roughly half the questions in
        BIRD have gold SQL that is either wrong for the
        stated question, ambiguous, or ties to a query
        that no reasonable analyst would write.
      </p>
      <p className="mb-6 leading-relaxed">
        This does not mean text-to-SQL agents got worse.
        It means the leaderboards stopped predicting
        production accuracy. In our client evals a system
        that hits 80% on BIRD often lands anywhere from
        45% to 90% on the customer&rsquo;s own questions,
        and vice versa. The three things that actually
        predict production accuracy are:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Workload evaluation</strong>: a benchmark
          set built from real user questions on your data,
          with expected outputs (not just gold SQL) and a
          human-verified answer. The Databricks best-
          practices post ships this as a Genie feature;
          Cortex Analyst calls it evaluations; QueryGPT
          calls it the golden question set. Whatever the
          name, this is the number that predicts what your
          users will experience.
        </li>
        <li>
          <strong>Execution match with format tolerance</strong>:
          two SQL statements that return the same rows
          with the same values, ignoring column order and
          alias, count as equivalent. Comparing raw SQL
          strings is noise.
        </li>
        <li>
          <strong>Semantic overlap on table selection</strong>:
          the fraction of correct tables the agent picked
          before generating SQL. QueryGPT reports this as
          a 0-to-1 &ldquo;table overlap&rdquo; score. A
          system that generates syntactically valid SQL
          from the wrong tables is a system that will
          confidently return the wrong answer.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Snowflake&rsquo;s Arctic-Text2SQL-R1 write-up shows
        the shape of a good benchmark run: track execution
        accuracy across six benchmarks (BIRD, Spider,
        BIRD-Critic, Spider 2.0-Lite, KaggleDBQA, and
        SciBench) and never publish a single-benchmark
        number in isolation. In production the same
        discipline applies: track accuracy per workspace,
        per data source, and per question complexity, and
        alarm on a regression against the previous known-
        good run when configuration changes.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Production patterns we run on client work
      </h2>
      <p className="mb-6 leading-relaxed">
        1. <strong>Author the semantic layer before you
        ship the agent</strong>. This is the single
        highest-leverage decision. Every hour spent on
        table descriptions, synonyms, join cardinality,
        and 20-30 verified queries returns more accuracy
        than any prompt tuning. Teams that skip it end up
        paying it back later, in worse queries and in
        weekend firefighting.
      </p>
      <p className="mb-6 leading-relaxed">
        2. <strong>Denormalise for the LLM, not for the
        database</strong>. Wide, pre-joined tables with
        clear names beat a normalised schema for text-to-
        SQL. Pre-calculate fiscal periods, status flags,
        and derived fields you would not want the model
        to reason about. The Databricks post is explicit:
        do not solve modelling problems with prompt
        instructions.
      </p>
      <p className="mb-6 leading-relaxed">
        3. <strong>Break the pipeline into narrow LLM
        calls, not one big one</strong>. QueryGPT&rsquo;s
        biggest jump came from splitting intent, table
        selection, and column pruning into separate
        agents. Each agent gets a small task and a
        specialised prompt; the classification quality
        goes up and the token budget stays under control.
        A one-shot &ldquo;here is the question, here are
        1000 columns, write SQL&rdquo; is a smell.
      </p>
      <p className="mb-6 leading-relaxed">
        4. <strong>Ship a benchmark before the first
        user</strong>. Cortex Analyst evaluations,
        Genie&rsquo;s benchmark runner, and QueryGPT&rsquo;s
        golden set are the same tool with different names.
        Curate 30-50 real questions with human-verified
        answers. Run them on every change. When accuracy
        drops, the diff tells you which change to roll
        back. Without this you are guessing.
      </p>
      <p className="mb-6 leading-relaxed">
        5. <strong>Show the SQL and the reasoning to the
        user</strong>. Every hosted vendor does this and
        every serious in-house build does this. The
        transparency is what turns a chatbot into a
        collaborator. A senior analyst who sees the SQL
        catches a subtle bug in seconds; a business user
        who sees the natural-language explanation trusts
        the number more. Hiding the SQL is a UX mistake,
        not a simplification.
      </p>
      <p className="mb-6 leading-relaxed">
        6. <strong>Add certified answers and trusted
        formulas</strong>. Not every question has an
        agent-generated answer; some have a
        governance-approved answer. Genie&rsquo;s certified
        answers, Cortex&rsquo;s verified queries, and
        QueryGPT&rsquo;s workspace samples all model this.
        For finance-critical metrics (ARR, revenue, churn)
        route the question to the certified formula, not
        to a generation.
      </p>
      <p className="mb-6 leading-relaxed">
        7. <strong>Enforce access at the warehouse, not
        the agent</strong>. Cortex Analyst, Genie, and
        Fabric Data Agent all run the generated SQL under
        the asker&rsquo;s identity so warehouse RBAC
        applies. If you are building in-house, do the
        same. Never give the agent a service-account
        connection with broad access and try to filter
        rows in the prompt - that is a data-leak waiting
        for the first prompt-injection attempt.
      </p>
      <p className="mb-6 leading-relaxed">
        8. <strong>Add a validation pass before you
        run</strong>. A cheap LLM call that reads the
        generated SQL and answers &ldquo;does this query
        exist against this schema, and does it match the
        user&rsquo;s intent?&rdquo; catches most
        hallucinations. Pair it with a static EXPLAIN
        against the warehouse and you catch the rest.
        QueryGPT has this on the roadmap; production
        vendors already do it.
      </p>
      <p className="mb-6 leading-relaxed">
        9. <strong>Cap the multi-turn context</strong>.
        Cortex Analyst&rsquo;s own docs flag that long
        multi-turn conversations degrade accuracy because
        the model tries to reason across the full history.
        In practice, 3-5 turns is where accuracy starts
        to drop. Encourage users to start a new chat when
        they shift topic. Reset on demand.
      </p>
      <p className="mb-6 leading-relaxed">
        10. <strong>Trace every run</strong>. Log the
        question, the intent, the tables chosen, the SQL,
        the execution time, and the row count. Every
        text-to-SQL system needs an audit trail because
        every business user will eventually ask
        &ldquo;wait, is that right?&rdquo; The trace is
        the answer to that question.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cost, latency, and when text-to-SQL is the wrong
        answer
      </h2>
      <p className="mb-6 leading-relaxed">
        A text-to-SQL agent call is cheap relative to a
        Deep Research run but not free. Cortex Analyst
        charges per successful message at Snowflake credit
        rates, plus the warehouse cost of the generated
        SQL. Genie&rsquo;s Assistant calls are billed by
        the underlying model plus the compute for the
        query. In-house builds land around $0.02 to $0.10
        per generation on 2026 model pricing (with agentic
        pipelines like QueryGPT skewing higher because of
        the multiple LLM calls). Latency is 3-10 seconds
        end-to-end on production systems, and warehouse
        execution can add anything from milliseconds to
        minutes depending on the query.
      </p>
      <p className="mb-6 leading-relaxed">
        These numbers set the boundary.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Use a text-to-SQL agent</strong> when the
        audience is analysts or business users who ask
        open-ended questions of governed data, when the
        underlying warehouse is worth putting a natural-
        language surface on, and when you can invest the
        engineering to author and maintain a semantic
        layer. Self-service BI, embedded analytics in a
        SaaS product, and internal &ldquo;ask a question
        about our data&rdquo; chat are the canonical fits.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Do not use one</strong> when the question
        is a fixed report (build a dashboard), when the
        underlying data has no semantic layer and none is
        coming (accuracy will be poor and predictable),
        when the audience needs sub-second responses
        (dashboards and cached queries are faster), or
        when the answer requires reasoning across sources
        the SQL cannot express (that is where deep research
        agents or general analytics agents take over).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        How text-to-SQL agents fit next to RAG and deep
        research
      </h2>
      <p className="mb-6 leading-relaxed">
        The comparison that comes up on every engagement
        is text-to-SQL vs RAG. They are not competitors.
        RAG answers a question about unstructured documents
        (policies, contracts, tickets); text-to-SQL answers
        a question about a structured warehouse. The
        modern analytics agent uses both: RAG for the
        semantic layer descriptions and the tribal-
        knowledge documents that describe your metrics,
        text-to-SQL for the numbers themselves.
      </p>
      <p className="mb-6 leading-relaxed">
        Deep research sits above both. When the question
        is &ldquo;write a competitive analysis of X across
        five vendors with citations&rdquo;, it is not a
        SQL question - it is a research question. When
        the question is &ldquo;what was our churn last
        quarter, broken down by plan tier&rdquo;, it is
        text-to-SQL. And when the question is &ldquo;why
        did churn spike in region X&rdquo;, you need a
        text-to-SQL agent to pull the numbers, a RAG step
        to pull the account notes, and a reasoning LLM to
        connect the two. That is the multi-agent analytics
        pattern showing up in every large enterprise stack
        in 2026.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Future trends: where this goes through the rest
        of 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        <strong>Agentic semantic model authoring</strong>.
        Snowflake&rsquo;s June 2026 update is the leading
        edge: an agent that reads your verified queries,
        proposes a semantic model, and iterates on it as
        the workload evolves. Expect Databricks and
        Microsoft to ship their versions in the next
        release cycle, and expect the open-source stacks
        to follow through the second half of the year.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Specialised text-to-SQL models</strong>.
        Arctic-Text2SQL-R1 from Snowflake shows what an
        RL-trained SQL specialist looks like. Expect at
        least one open-weight competitor from the DeepSeek
        or Qwen families before the year is out, and
        expect vendors to route to specialist models when
        the general chat model is over-thinking a query.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Workload-based evaluation as the default</strong>.
        The CIDR paper made BIRD-first evaluation
        embarrassing. Every serious vendor now leads with
        a workload benchmark on customer data, and every
        team should. Expect open-source tooling for
        workload benchmarking to consolidate (currently
        fragmented across Ragas, Braintrust, and vendor-
        specific runners).
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cross-source and cross-tool routing</strong>.
        Fabric Data Agent&rsquo;s NL2SQL-plus-NL2DAX-plus-
        NL2KQL router is where the pattern goes next.
        Analytics questions rarely live in one place;
        expect Snowflake and Databricks to add richer
        cross-source routing (their acquisition of dbt
        Labs helps Databricks here) and expect open-source
        stacks to expose an MCP-first surface so any
        agent can ask questions of your governed layer.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Governance surfaces on top of the
        answer</strong>. Certified answers, trusted UDFs,
        and lineage badges are the leading edge of
        governance for analytics agents. Expect these to
        become standard across vendors, and expect the
        enterprise buyer to make them table-stakes for
        procurement.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Conclusion: build the semantic layer, then pick
        the surface
      </h2>
      <p className="mb-6 leading-relaxed">
        Every text-to-SQL agent worth shipping in 2026
        rides on the same shape. A semantic layer that
        encodes your business logic. An intent step that
        picks the scope. A retrieval step that pulls
        verified queries and schema chunks. A generation
        step that writes SQL. A validation step that
        catches hallucinations. An execution step that
        enforces RBAC at the warehouse. Vendors differ on
        which stages they hide and which they expose, but
        the pipeline is the same.
      </p>
      <p className="mb-6 leading-relaxed">
        The build-or-buy decision is the practical one.
        Buy Cortex Analyst if your warehouse is Snowflake
        and you want a REST API in weeks. Buy Genie if
        you are on Databricks and want a BI-tool surface.
        Buy Fabric Data Agent if the Microsoft stack is
        already the answer to most of the enterprise
        questions. Buy Wren AI (or a mixed Vanna plus
        LangGraph stack) if the deployment target is your
        own infrastructure, if the model choice matters,
        or if the workflow needs custom tools the hosted
        products do not support. Build in-house (the Uber
        QueryGPT path) if the constraint is total control
        and the team has the runway.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements we usually run the same play:
        pick the hosted service that matches the customer&rsquo;s
        warehouse, invest two to four weeks in the
        semantic layer and a workload benchmark, and only
        then ship the surface to real users. Most of the
        time that is where the system stays. The times we
        have gone off-platform are the ones where the
        semantic layer needed to span multiple
        warehouses, or where the customer wanted to run
        the generator on their own inference cluster. Even
        in those cases the pipeline shape is the same as
        Cortex or Genie - just self-hosted. Which is the
        real lesson: the pattern is stable, the semantic
        layer is the asset, and the vendor is a delivery
        choice, not a bet.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Snowflake: Cortex Analyst documentation
          </a>
          {" "}- the reference for the REST API, the
          semantic model YAML, the model rotation, and
          the multi-turn conversation shape.
        </li>
        <li>
          <a
            href="https://www.snowflake.com/en/blog/engineering/agentic-semantic-model-text-to-sql/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Snowflake: Agentic Semantic Model Improvement
          </a>
          {" "}- the June 2026 engineering write-up on how
          Cortex Analyst now auto-generates and iterates
          on the semantic model itself.
        </li>
        <li>
          <a
            href="https://www.snowflake.com/en/blog/engineering/arctic-text2sql-r1-sql-generation-benchmark/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Snowflake: Arctic-Text2SQL-R1 Tops BIRD and
            Wins Broadly
          </a>
          {" "}- the paper and blog on Snowflake&rsquo;s
          RL-trained text-to-SQL specialist model, with
          multi-benchmark numbers.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/data-dialogue-best-practices-guide-building-high-performing-genie-spaces"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: A Best Practices Guide for Building
            High-Performing Genie Spaces
          </a>
          {" "}- the operational playbook for metric views,
          joins, example queries, and benchmarks. The
          &ldquo;good vs bad general instructions&rdquo;
          table alone is worth the read.
        </li>
        <li>
          <a
            href="https://www.databricks.com/blog/whats-new-aibi-february-2026-roundup"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks: What&rsquo;s New in AI/BI - February
            2026 Roundup
          </a>
          {" "}- the release notes covering certified
          answers, trusted UDFs, and the benchmark runner
          that shipped in early 2026.
        </li>
        <li>
          <a
            href="https://learn.microsoft.com/en-us/fabric/data-science/how-to-create-data-agent"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Learn: Create a Fabric data agent
          </a>
          {" "}- the official docs on the NL2SQL, NL2DAX,
          and NL2KQL router, up-to-five data sources per
          agent, and the Entra ID auth model.
        </li>
        <li>
          <a
            href="https://www.uber.com/us/en/blog/query-gpt/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Uber Engineering: QueryGPT - Natural Language
            to SQL Using Generative AI
          </a>
          {" "}- the reference in-house write-up covering
          the intent, table, column-prune agent chain,
          workspaces, and the evaluation harness Uber
          uses in production.
        </li>
        <li>
          <a
            href="https://getwren.ai/oss"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wren AI OSS: Open-source GenBI for AI agents
          </a>
          {" "}- the design of the MDL semantic layer, the
          20+ data source connectors, and the MCP-first
          agent interface.
        </li>
        <li>
          <a
            href="https://github.com/vanna-ai/vanna"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vanna-ai/vanna on GitHub
          </a>
          {" "}- the reference open-source RAG-based text-
          to-SQL implementation, with the training corpus
          shape and multi-database support.
        </li>
        <li>
          <a
            href="https://www.vldb.org/cidrdb/papers/2026/p5-jin.pdf"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CIDR 2026: Text-to-SQL Benchmarks are Broken
          </a>
          {" "}- the paper documenting a 52.8% error rate
          in BIRD gold labels and 66.1% in Spider 2.0-
          Snow, and why workload-based evaluation should
          replace public leaderboards for production
          decisions.
        </li>
        <li>
          <a
            href="https://bird-bench.github.io/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BIRD-SQL benchmark
          </a>
          {" "}- the leaderboard and dataset that used to
          set the reference for text-to-SQL research.
          Still useful for cross-model comparison, but not
          for production accuracy claims.
        </li>
        <li>
          <a
            href="/articles/end-to-end-analytics-microsoft-fabric"
            className="font-semibold text-primaryColor hover:underline"
          >
            End-to-end analytics on Microsoft Fabric
          </a>
          {" "}- the deeper read on the Fabric stack that
          Data Agent sits on top of.
        </li>
        <li>
          <a
            href="/articles/deep-research-agents-production-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Deep Research agents in production 2026
          </a>
          {" "}- the read on the research-agent pattern
          that composes with text-to-SQL for open-ended
          analytics questions.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            RAG on Next.js with LangChain and the Vercel
            AI SDK
          </a>
          {" "}- the reference stack for the RAG side of
          an analytics agent that mixes structured and
          unstructured data.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- the tracing and eval story that a text-
          to-SQL agent needs to stay accurate in
          production.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol that Wren AI and the hosted
          data agents expose so downstream chat and
          coding agents can query your governed layer.
        </li>
      </ul>
    </div>
  );
}
