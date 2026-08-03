import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "text-to-sql-agents-production-2026",
  title:
    "Text-to-SQL agents in production 2026: why the semantic layer, not the model, made them reliable",
  excerpt:
    "How Text-to-SQL went from a party trick that guessed column names to a production feature every major cloud ships. Covers the semantic-layer shift, Snowflake Cortex Analyst, Databricks Genie, Google Gemini-SQL2, Amazon Q, and the open-source stack around Vanna, plus the schema linking and evaluation patterns that make the accuracy numbers hold up on real business questions.",
  metaDescription:
    "A practical, technical guide to Text-to-SQL AI agents in 2026. Covers execution accuracy on BIRD and Spider 2.0, semantic model YAML for Snowflake Cortex Analyst, Databricks Genie context requirements, Google Gemini-SQL2 at 80.04% on BIRD, Amazon Q generative SQL for Redshift, Vanna AI as the open-source baseline, schema linking research from RSL-SQL and CHESS, and the evaluation and human-in-the-loop patterns that keep production Text-to-SQL trustworthy.",
  image:
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=2400&q=80",
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
    "Google Cloud",
    "AWS",
    "Semantic Layer",
    "BI",
    "Production",
  ],
  publishDate: "2026-08-03",
  readingTime: "15 min read",
};

export default function TextToSqlAgentsProduction2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        For most of 2023 and 2024, Text-to-SQL was the demo
        that always worked on stage and always fell over in
        the boardroom. A finance lead would ask &ldquo;what is
        my gross margin last quarter&rdquo;, the model would
        invent a column called <code>gross_margin_pct</code>,
        and the answer would be off by ten points because the
        real definition lives in a dbt macro nobody wanted to
        read. Two things changed that in 2025 and 2026. Every
        major cloud shipped a first-party Text-to-SQL product
        that leans on an explicit semantic layer instead of
        raw schema, and the open-source stack around Vanna and
        LangChain caught up to the point where teams can host
        one themselves. This is how we build and ship them on
        client work, why the semantic layer matters more than
        the model, and the evaluation habits that keep the
        accuracy numbers from lying to you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why Text-to-SQL became a real product in 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        A Text-to-SQL agent takes a business question in plain
        language, figures out what tables and columns the
        question is really about, writes a SQL query, runs it
        against a warehouse or database, and returns the
        answer with a short explanation. It sounds like a
        function of the model, and for a while everyone
        pretended it was. It is not. The two hard problems are
        schema linking (picking the right tables and columns
        out of a warehouse with thousands of them) and
        business semantics (knowing that &ldquo;active
        customer&rdquo; excludes trial accounts unless the
        question says otherwise). Bigger models help with
        both, but only up to a point. Above that point the
        accuracy cliff has to be filled with structure that
        lives outside the model.
      </p>
      <p className="mb-6 leading-relaxed">
        The numbers that finally made this obvious came out
        of Snowflake&rsquo;s own engineering post. On the
        BIRD-SQL benchmark, the same LLM went from 57% to 78%
        execution accuracy purely from adding a semantic
        model, a 21-point lift with no model change. On their
        internal BI benchmark the raw baseline was around 51%,
        which for a real finance question means roughly every
        second answer is wrong. With the semantic model in
        place, Cortex Analyst reports 90%+ on well-scoped
        internal evaluations. Databricks published a similar
        story for Genie, dbt did a paired benchmark of
        semantic-layer answers versus raw Text-to-SQL, and
        Google shipped Gemini-SQL2 in June 2026 with 80.04%
        on the BIRD single-model leaderboard, showing that
        the model side is also still improving. Two curves,
        one product.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2025 to 2026 timeline
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>May 2024</strong>: Snowflake previews
          Cortex Analyst, the first cloud-native Text-to-SQL
          product tied to a governed semantic model file.
        </li>
        <li>
          <strong>April 2024</strong>: AWS makes Amazon Q in
          QuickSight generally available with generative BI
          for natural-language questions against QuickSight
          datasets.
        </li>
        <li>
          <strong>Late 2024</strong>: Databricks ships AI/BI
          Genie in public preview, a chat surface over Unity
          Catalog with per-space knowledge stores for
          business context.
        </li>
        <li>
          <strong>January 2025</strong>: Spider 2.0 is
          accepted at ICLR 2025 as an oral, moving the field
          from single-table questions to enterprise workflows
          with hundreds of tables and dialect switches.
        </li>
        <li>
          <strong>March 2025</strong>: Cortex Analyst goes
          generally available. Snowflake starts publishing
          execution-accuracy numbers on customer-side
          evaluations rather than only benchmarks.
        </li>
        <li>
          <strong>June 2025</strong>: dbt Labs releases the
          &ldquo;Semantic Layer vs. Text-to-SQL&rdquo; paired
          benchmark, showing that queries covered by a
          well-modeled semantic layer approach 100% accuracy
          while raw Text-to-SQL sits at 10 to 51% on the same
          question set.
        </li>
        <li>
          <strong>November 2025</strong>: RSL-SQL and CHESS
          publish schema-linking approaches that lift small
          and mid-size open models several points on BIRD,
          making self-hosted stacks credible again.
        </li>
        <li>
          <strong>January 2026</strong>: Databricks announces
          Genie One, Genie Agents, Genie Code, Genie App
          Builder, and the Genie Ontology at Data + AI Summit
          preview, folding Text-to-SQL into a wider agent
          platform.
        </li>
        <li>
          <strong>June 12, 2026</strong>: Google releases
          Gemini-SQL2 built on Gemini 3.1 Pro, taking the
          BIRD single-model leaderboard to 80.04% execution
          accuracy.
        </li>
        <li>
          <strong>July 2026</strong>: The BIRD team ships
          bird-sql-dev-1106, a cleaner dev split, after a
          VLDB paper measures annotation error rates near
          52.8% in the original BIRD and 66.1% in Spider
          2.0-Snow. The lesson lands: even the benchmarks
          need audits before you trust them.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The reference architecture every serious build
        converges on
      </h2>
      <p className="mb-6 leading-relaxed">
        The internal shape differs by vendor, but the
        boundaries do not. Every production Text-to-SQL
        system we have shipped has the same six stages, in
        order: <strong>intent</strong>, <strong>retrieve</strong>,{" "}
        <strong>generate</strong>, <strong>validate</strong>,{" "}
        <strong>execute</strong>, <strong>explain</strong>.
        The interesting choices are which of those stages
        the vendor owns, which one you own, and how much of
        the pipeline gets an agent loop around it.
      </p>
      <CodeBlock
        language="bash"
        filename="Text-to-SQL: the shared six-stage pipeline"
        code={`+---------------------------------------------------+
|  1. INTENT                                        |
|   User question -> classifier + clarifier         |
|   (route to Text-to-SQL vs charting vs KB)        |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  2. RETRIEVE                                      |
|   Semantic model YAML  +  vector store of         |
|   past Q/SQL pairs, table docs, business rules    |
|   -> compact prompt context                       |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  3. GENERATE                                      |
|   LLM writes SQL against the retrieved context    |
|   (single call OR agent loop with reflection)     |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  4. VALIDATE                                      |
|   Static checks: parse, lint, dialect, refs,      |
|   PII policy, row limit. LLM self-critique.       |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  5. EXECUTE                                       |
|   Run on warehouse with the user's own role.      |
|   Row/column-level access is the warehouse's job. |
+---------------------------------------------------+
                     |
                     v
+---------------------------------------------------+
|  6. EXPLAIN                                       |
|   Return SQL, result, and a plain-language        |
|   summary. Log everything for the eval loop.      |
+---------------------------------------------------+`}
      />
      <p className="mb-6 leading-relaxed">
        <strong>Intent</strong> is where a lot of teams save
        themselves from misery. Not every question is a SQL
        question. &ldquo;What did Alice ship last week&rdquo;
        might be a Jira query, not a warehouse query. A cheap
        classifier at the front routes the request to the
        right tool, and only questions that look like a
        metric or a filter over structured data reach the
        Text-to-SQL loop. Skip this step and you will spend
        the rest of the pipeline apologising for confidently
        wrong answers to questions that were never about the
        database.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Retrieve</strong> is the stage where the
        semantic layer earns its keep. The prompt should not
        contain the raw schema of the whole warehouse. It
        should contain a compact, business-aware slice: a few
        logical tables, their measures, the dimensions the
        question touches, plus a handful of similar
        question-and-SQL pairs pulled from a vector store.
        Vanna calls this Retrieval-Augmented Generation over
        the schema. Snowflake calls it the semantic model.
        Databricks calls it the space-level knowledge store.
        The abstraction has three names and one job.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Generate</strong> is where the model finally
        appears. In simple cases this is a single call. In
        harder cases it is an agent loop that runs an initial
        query, executes it against a copy of the schema or
        against a sample, notices that the join is wrong, and
        rewrites. The Databricks Inspect feature and the
        Anthropic reflection pattern both do this. The gain
        is not free (extra latency, extra tokens), but on
        complex joins it is the difference between 60 and 85
        percent accuracy.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Validate</strong> is the stage most teams
        skip and then rediscover after their first bad
        answer in front of a customer. Parse the SQL. Check
        that every table and column reference exists. Reject
        anything that touches a table not covered by the
        semantic model. Enforce a hard row limit and a query
        timeout. Then, if you can spare the tokens, let a
        cheaper model review the SQL against the question one
        more time.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Execute</strong> should always run under the
        end user&rsquo;s role, not a service account. This is
        the single most important security decision in the
        whole product. If the user cannot see the salary
        column when they open a SQL editor, the agent should
        not be able to see it either. Every cloud-native
        product does this by default now. Homegrown ones
        often do not.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Explain</strong> is the stage that decides
        whether the user trusts the answer. A number without
        a paragraph is a guess. A number with the SQL and a
        two-sentence description of the join and the filter
        used is a real answer the user can defend to their
        manager. Every product we know of ships this now, and
        every custom stack we have seen suffers when it does
        not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the semantic layer beats a bigger model
      </h2>
      <p className="mb-6 leading-relaxed">
        The dbt Labs 2026 benchmark put the strongest number
        on this: for questions covered by a well-modeled
        semantic layer, accuracy runs at or near 100%. The
        same three frontier models on the same questions
        without the semantic layer sat between 10 and 51%.
        The delta is not a small integration boost. It is the
        difference between shipping and not shipping.
      </p>
      <p className="mb-6 leading-relaxed">
        The reason is simple. A semantic layer is a contract.
        It says &ldquo;revenue is <code>SUM(orders.gross)</code>{" "}
        minus <code>SUM(orders.refunds)</code>, and it always
        excludes canceled orders&rdquo;. Once that contract
        exists, the LLM does not have to guess. It has to
        pick from a menu. When the question is
        &ldquo;revenue by region last quarter&rdquo;, the
        model does not compose a query from raw joins. It
        selects the revenue measure, groups by region,
        applies the last-quarter filter, and hands the
        result to whatever query engine the semantic layer
        compiles into (Snowflake, BigQuery, Databricks SQL,
        Postgres). The failure modes shrink from
        &ldquo;wrong query&rdquo; to &ldquo;wrong measure
        picked&rdquo;, which is easier to catch and cheaper
        to fix.
      </p>
      <p className="mb-6 leading-relaxed">
        The trade-off is real. A semantic layer takes weeks
        to build for a mid-size warehouse. It has to be
        maintained as the business changes. And it only
        answers the questions it was modeled for. For
        anything off the map, the system either falls back
        to raw Text-to-SQL (with the honest accuracy penalty)
        or refuses. Every mature product ships both a
        modeled path and a fallback, with a hard visual
        signal for the user showing which one produced the
        answer.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Snowflake Cortex Analyst: the semantic model as a
        YAML file
      </h2>
      <p className="mb-6 leading-relaxed">
        Cortex Analyst is the clearest example of the
        semantic-layer pattern in the market. You upload a
        YAML file that describes your business model on top
        of your Snowflake tables, and the service handles
        the rest of the pipeline: retrieve, generate,
        validate, execute, explain. The YAML is not a
        cosmetic add-on. It is the surface every accuracy
        number in the product rides on.
      </p>
      <CodeBlock
        language="bash"
        filename="semantic_models/sales.yaml"
        code={`name: sales_semantic_model
description: Sales performance model for finance and RevOps.

tables:
  - name: orders
    base_table:
      database: PROD
      schema: SALES
      table: ORDERS
    primary_key:
      columns: [ORDER_ID]

    dimensions:
      - name: region
        expr: REGION
        data_type: TEXT
        synonyms: [territory, area]
        sample_values: [NA, EMEA, APAC, LATAM]

      - name: channel
        expr: CHANNEL
        data_type: TEXT
        synonyms: [source, sales_channel]

    time_dimensions:
      - name: order_date
        expr: ORDER_DATE
        data_type: DATE

    measures:
      - name: gross_revenue
        expr: SUM(GROSS_AMOUNT)
        data_type: NUMBER
        description: >
          Gross revenue before refunds. Excludes canceled
          orders. In USD.

      - name: net_revenue
        expr: SUM(GROSS_AMOUNT) - SUM(REFUND_AMOUNT)
        data_type: NUMBER
        description: >
          Gross minus refunds. This is the number finance
          reports externally.

    filters:
      - name: active_orders
        expr: STATUS != 'CANCELED'

module_custom_instructions:
  question_categorization: |
    Route metric-style questions to the semantic model.
    If the user asks for a raw row-level list, decline
    and ask them to filter to a specific customer.
  sql_generation: |
    Always add ORDER BY on the primary time dimension when
    the question involves a trend. Cap results at 1000 rows.`}
      />
      <p className="mb-6 leading-relaxed">
        Three details in this file do most of the work.
        First, the <code>description</code> block under each
        measure is the business definition the LLM will
        quote. Write it like a data catalog entry, not a code
        comment. Second, <code>synonyms</code> on dimensions
        prevent the whole class of failures where the user
        says &ldquo;territory&rdquo; and the model does not
        realise it is <code>region</code>. Third,{" "}
        <code>module_custom_instructions</code> is the escape
        hatch that lets you constrain how the model answers,
        including refusing questions the model should not
        even try to answer. This is the closest thing to a
        production-safe steering knob any of the cloud
        vendors ship right now.
      </p>
      <p className="mb-6 leading-relaxed">
        Calling the service from an application is a plain
        HTTP call, but the shape of the response is what
        makes it useful in a product surface.
      </p>
      <CodeBlock
        language="python"
        filename="apps/analytics/cortex_analyst_client.py"
        code={`import os
import requests

SNOWFLAKE_ACCOUNT = os.environ["SNOWFLAKE_ACCOUNT"]
SNOWFLAKE_PAT = os.environ["SNOWFLAKE_PAT"]

def ask(question: str) -> dict:
    url = (
        f"https://{SNOWFLAKE_ACCOUNT}.snowflakecomputing.com"
        "/api/v2/cortex/analyst/message"
    )
    headers = {
        "Authorization": f"Bearer {SNOWFLAKE_PAT}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "messages": [
            {
                "role": "user",
                "content": [{"type": "text", "text": question}],
            }
        ],
        "semantic_model_file": (
            "@PROD.PUBLIC.SEMANTIC_MODELS/sales.yaml"
        ),
    }
    r = requests.post(url, headers=headers, json=payload, timeout=60)
    r.raise_for_status()
    body = r.json()

    # The response is an assistant message with structured
    # content parts: text, sql, and any suggestions.
    parts = body["message"]["content"]
    sql = next(p["statement"] for p in parts if p["type"] == "sql")
    summary = next(p["text"] for p in parts if p["type"] == "text")
    return {"sql": sql, "summary": summary, "raw": body}


if __name__ == "__main__":
    out = ask("What was net revenue by region last quarter?")
    print(out["summary"])
    print(out["sql"])`}
      />
      <p className="mb-6 leading-relaxed">
        Two production notes. The response always returns the
        SQL as a separate part, so the calling application
        can run it under the user&rsquo;s own Snowflake role
        and enforce row and column policies at the warehouse.
        And the service does the retrieval, generation, and
        validation itself: your application code is the
        intent router, the execution step, and the UI. That
        is a good split when the data already lives in
        Snowflake. It is a bad split when a lot of your data
        does not.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Databricks Genie: context as first-class as tables
      </h2>
      <p className="mb-6 leading-relaxed">
        Databricks took a different route to the same
        destination. Instead of a single YAML file, Genie
        uses two layers of structured context: the Unity
        Catalog metadata (tables, columns, comments, tags)
        and a per-space knowledge store where analysts write
        the business rules that Unity Catalog cannot capture.
        The Inspect feature runs a second SQL pass on top of
        every generated query to check specific aspects of
        the query and rewrite if needed, which the docs call
        out as the main accuracy lever.
      </p>
      <p className="mb-6 leading-relaxed">
        In 2026 Databricks rolled this into Genie One and
        Genie Agents, capping a Genie Agent at 30 tables and
        20 questions per minute. That is a real constraint if
        you have a wide warehouse and matters for how you
        scope each Genie Space. Our rule of thumb on client
        work: one Genie Space per business domain (finance,
        marketing, ops), one owner per space, and a small
        set of question-and-SQL pairs added to the knowledge
        store per week. The 30-table cap is a feature, not a
        bug. It forces someone to pick which tables belong.
      </p>
      <CodeBlock
        language="python"
        filename="apps/analytics/genie_client.py"
        code={`from databricks.sdk import WorkspaceClient

w = WorkspaceClient()

space_id = "01f0abcd-1234-4567-89ab-def012345678"

# Start a conversation, then read the assistant response.
convo = w.genie.start_conversation_and_wait(
    space_id=space_id,
    content=(
        "What is net revenue by region for the last "
        "quarter, USD only?"
    ),
)

for attachment in convo.attachments or []:
    if attachment.query is not None:
        print("SQL:", attachment.query.query)
        print("Description:", attachment.query.description)

# Run the returned SQL against the warehouse under the
# calling user's identity. Do not run it as a service
# account.
if convo.attachments and convo.attachments[0].query:
    query = convo.attachments[0].query.query
    result = w.statement_execution.execute_statement(
        statement=query,
        warehouse_id="0123456789abcdef",
        wait_timeout="30s",
    )
    print(result.result)`}
      />
      <p className="mb-6 leading-relaxed">
        The point worth stealing even if you never ship on
        Databricks: bind the answer to the user&rsquo;s
        identity for the whole pipeline. Unity Catalog
        inherits row and column policies automatically. When
        you build your own stack, do the same thing with
        Postgres row-level security or the warehouse-native
        equivalent. Do not let the model be the gatekeeper.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Google Gemini-SQL2 and the model-side story
      </h2>
      <p className="mb-6 leading-relaxed">
        For all the semantic-layer emphasis, the model side
        still matters. Google&rsquo;s June 2026 Gemini-SQL2
        release pushed the BIRD single-model leaderboard to
        80.04% execution accuracy on Gemini 3.1 Pro, ahead
        of the reported single-model numbers from OpenAI and
        Anthropic on the same benchmark. Google has been
        quiet on the exact recipe, and no API or model card
        has shipped as of this writing, but two things are
        already clear from the announcement.
      </p>
      <p className="mb-6 leading-relaxed">
        First, Google is going to plug Gemini-SQL2 into
        BigQuery Studio, AlloyDB AI, and Cloud SQL Studio.
        BigQuery already ships the <code>AI.GENERATE_TEXT</code>{" "}
        and <code>ML.GENERATE_TEXT</code> functions, which
        makes it trivial to call any Gemini model from inside
        SQL. Once Gemini-SQL2 is behind those functions,
        every BigQuery user who can write a SELECT gets a
        Text-to-SQL surface for free.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, the 80% number is a single-model number.
        Every serious production system layers extra
        structure on top: semantic model, schema linking,
        validation. That is why Cortex Analyst can claim 90%+
        on customer evaluations while the underlying LLM only
        hits 57 to 78% on BIRD. The model gets you closer to
        the ceiling. The system around it pushes through the
        ceiling.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Amazon Q: the AWS-native path
      </h2>
      <p className="mb-6 leading-relaxed">
        AWS shipped two overlapping surfaces. Amazon Q
        generative SQL lives inside the Redshift Query
        Editor v2 and generates SQL for a developer from a
        prompt against a live Redshift schema. Amazon Q in
        QuickSight is the business-user surface, backed by
        Amazon Bedrock, that answers natural-language
        questions over QuickSight datasets, generates
        multi-visual answers, and produces executive
        summaries of dashboards. Both were made generally
        available in 2024 and have been iterating since.
      </p>
      <p className="mb-6 leading-relaxed">
        The AWS path is worth using when the data already
        lives in Redshift or is fronted by QuickSight
        datasets. Two things to watch: as of 2026 the Q in
        QuickSight generative BI features remained available
        in a specific set of AWS regions (US East N.
        Virginia, US West Oregon, Europe Frankfurt), which
        matters for data residency, and the SQL model
        expects a governed dataset in QuickSight. If the
        warehouse has no dataset abstraction and you point Q
        at raw Redshift tables, expect the same accuracy
        cliff every raw Text-to-SQL system falls off.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Vanna AI: the open-source baseline that still holds
        up
      </h2>
      <p className="mb-6 leading-relaxed">
        The self-hosted story converged on Vanna. It is an
        MIT-licensed Python framework that runs the RAG
        pattern over your schema and past question-SQL
        pairs, and it works with any LLM, any vector store,
        and any SQL database. Two properties made it the
        default open-source choice on our client work: the
        database contents are never sent to the LLM (only
        the schema and the generated SQL), and a feedback
        loop makes it trivial to add corrected pairs back
        into the vector store for the next question.
      </p>
      <CodeBlock
        language="python"
        filename="apps/analytics/vanna_local.py"
        code={`from vanna.chromadb import ChromaDB_VectorStore
from vanna.anthropic import Anthropic_Chat


class LocalVanna(ChromaDB_VectorStore, Anthropic_Chat):
    def __init__(self, config=None):
        ChromaDB_VectorStore.__init__(self, config=config)
        Anthropic_Chat.__init__(self, config=config)


vn = LocalVanna(config={
    "api_key": os.environ["ANTHROPIC_API_KEY"],
    "model": "claude-sonnet-5",
    "path": "./vanna_store",
})

# 1. Teach it the shape of your database.
vn.train(ddl="""
CREATE TABLE orders (
  order_id      BIGINT PRIMARY KEY,
  customer_id   BIGINT,
  status        TEXT,
  gross_amount  NUMERIC,
  refund_amount NUMERIC,
  region        TEXT,
  order_date    DATE
);
""")

# 2. Teach it the business definitions.
vn.train(documentation="""
Net revenue = SUM(gross_amount) - SUM(refund_amount).
Canceled orders (status = 'CANCELED') are always excluded.
""")

# 3. Teach it a few gold examples.
vn.train(
    question="What was net revenue by region last quarter?",
    sql="""
    SELECT region,
           SUM(gross_amount) - SUM(refund_amount) AS net_revenue
    FROM orders
    WHERE status <> 'CANCELED'
      AND order_date >= date_trunc('quarter', current_date) - INTERVAL '3 months'
      AND order_date <  date_trunc('quarter', current_date)
    GROUP BY region
    ORDER BY net_revenue DESC;
    """,
)

# 4. Ask.
print(vn.ask("Show me refunds by region for the last 30 days."))`}
      />
      <p className="mb-6 leading-relaxed">
        The training loop is where the accuracy comes from.
        A blank Vanna answering questions over a warehouse
        with no training is roughly the same quality as
        calling the LLM directly with the schema pasted in.
        A Vanna with fifty accurate question-and-SQL pairs
        per domain, plus the documentation strings, is where
        we start seeing 80%+ on internal evaluation sets.
        The bottleneck is not the framework. It is the
        person who has to write the fifty examples.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Schema linking: the research that made small models
        credible
      </h2>
      <p className="mb-6 leading-relaxed">
        Schema linking is the step where the system picks
        which tables and columns are relevant to the
        question. Every raw Text-to-SQL system does it
        implicitly by dumping the schema into the prompt.
        Above about 30 tables that stops working, both
        because the context gets too big and because the
        model starts hallucinating columns from other
        tables. Two 2025-era papers are worth reading in
        full if you own the retrieval step of your stack:
        RSL-SQL for the robust-linking approach with
        bidirectional linking and self-correction, and CHESS
        for the highest-recall approach (97.12%) at the cost
        of 78 LLM calls and 340k tokens per BIRD question.
        The pattern that has held up on our client work is
        somewhere in the middle: bidirectional linking with
        a small model for the initial candidate set, then
        one round of self-critique with the main model
        before generation.
      </p>
      <p className="mb-6 leading-relaxed">
        The single biggest win for schema linking is not
        academic. It is column comments and table
        descriptions. In an ideal world the semantic layer
        carries that. In practice the warehouse also does,
        because Unity Catalog, Snowflake, and BigQuery all
        support long descriptions on tables and columns.
        Filling those in with the same care you would give a
        SQL view is one of the highest-return, lowest-glamour
        tasks in the whole build.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Evaluation: what to measure and what the benchmarks
        will not tell you
      </h2>
      <p className="mb-6 leading-relaxed">
        There are two headline metrics in the literature.{" "}
        <strong>Execution accuracy</strong> runs the generated
        SQL and the reference SQL against the same database
        and checks whether the result sets match. This is
        what BIRD uses. It is more honest than string match
        because two different queries can produce the same
        answer.{" "}
        <strong>SQL structural equivalence</strong> checks
        whether the shape of the query matches a canonical
        form. It is useful as a secondary signal. It is not a
        substitute for execution.
      </p>
      <p className="mb-6 leading-relaxed">
        The uncomfortable finding of 2026 is that the
        published benchmarks are noisier than the field
        thought. A VLDB 2026 paper measured annotation error
        rates of 52.8% in BIRD and 66.1% in Spider 2.0-Snow.
        Re-running the evaluation with corrected labels
        shifts leaderboard positions by up to three places
        and produces relative accuracy changes between minus
        3 and plus 31 percent. The BIRD team responded with
        the cleaner bird-sql-dev-1106 split. The lesson: use
        published benchmarks to compare systems, but do not
        make product decisions on the last two points of
        difference between two models. Build your own
        eval set from real user questions and grade it with
        execution accuracy on your own database.
      </p>
      <p className="mb-6 leading-relaxed">
        On new engagements our eval set has three tiers.
        Tier one is the smoke test: 20 questions the user
        base asks weekly, each with a hand-written gold SQL.
        These have to hit 100% before any release. Tier two
        is the coverage set: 100 to 200 harder questions
        that stress joins, filters, and edge cases in the
        semantic model. Tier three is the wild set: 500+
        questions pulled from real logs, with an LLM-as-judge
        grade against the executed result. Tier three is
        where the honest number lives. Tier one is what
        keeps deployments from breaking on Fridays.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Real-world use cases we ship on
      </h2>
      <p className="mb-6 leading-relaxed">
        Three shapes show up over and over.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Self-serve BI for revenue teams.</strong> A
        finance director asks &ldquo;what is the trend of
        net-new ARR by segment&rdquo; and gets a chart plus
        the SQL. This is where Snowflake Cortex Analyst,
        Databricks Genie, and Amazon Q in QuickSight all
        compete. The value is not saving the analyst&rsquo;s
        time. It is unblocking the finance team when the
        analyst is not around. The failure mode is
        confidently answering with the wrong measure. The
        fix is the semantic layer and a hard signal in the
        UI showing which measures a question used.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Customer support with product data.</strong> A
        support engineer asks &ldquo;how many login failures
        did customer X have in the last 30 minutes&rdquo;
        and gets a live answer against the product
        database. Row-level security is the whole game here.
        The agent runs under a service role, but adds a
        mandatory <code>WHERE customer_id = ?</code> filter
        that no prompt can remove. On our builds this
        constraint lives in the semantic model, not in the
        prompt. Prompt-only guardrails are a bet on the
        model. Constraint-in-the-semantic-model is a
        guarantee.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Internal metrics chat for engineering.</strong>{" "}
        A tech lead asks &ldquo;how many p95 alerts fired in
        the last week broken down by service&rdquo; and gets
        a query against the observability database. This is
        the use case where a raw Text-to-SQL fallback is
        acceptable, because the population of users is
        technical and can spot bad SQL. Even so, we log every
        query for the eval loop and grade a weekly random
        sample by hand. That habit alone catches more
        regressions than every automated check we run.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Advantages and limitations
      </h2>
      <p className="mb-4 leading-relaxed">
        The strengths that made this go from demo to product
        this year:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Real accuracy.</strong> With a semantic
          layer and warehouse-native execution, well-scoped
          questions land above 90% on internal benchmarks
          across every major vendor.
        </li>
        <li>
          <strong>Governance is inherited.</strong> When the
          agent runs under the user&rsquo;s role, the
          warehouse enforces row and column policies. No
          separate auth layer to maintain.
        </li>
        <li>
          <strong>Explainability is native.</strong> Every
          answer ships with the SQL, which analysts can
          audit and version. This is the property that
          killed most competing analytics-chat tools that
          hid the query.
        </li>
        <li>
          <strong>The stack is portable.</strong> The
          six-stage pipeline is the same shape whether you
          run Cortex Analyst, Genie, Amazon Q, or Vanna. You
          can swap vendors at the semantic-layer boundary
          without rewriting the product.
        </li>
      </ul>
      <p className="mb-4 leading-relaxed">The honest trade-offs:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Semantic layers are labor.</strong> The
          21-point accuracy lift comes with a real cost:
          modeling the business in YAML, updating it, and
          teaching the model with examples. On a mid-size
          warehouse this is two to six engineer-weeks up
          front and ongoing maintenance.
        </li>
        <li>
          <strong>Off-model questions still fail.</strong>{" "}
          Anything outside the semantic layer either falls
          back to raw Text-to-SQL with the accuracy penalty
          or is refused. Users hate refusals. Fallbacks lie.
          There is no third option.
        </li>
        <li>
          <strong>Benchmarks lie a little.</strong> After the
          VLDB 2026 paper on annotation errors, treat the
          top-line BIRD and Spider numbers as directional.
          Build your own eval set.
        </li>
        <li>
          <strong>Latency is real.</strong> An agent loop
          with reflection can take 10 to 30 seconds. For
          interactive BI that is right at the edge of
          acceptable. Cache the SQL for common questions and
          run the model only on cache miss.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the field is heading in late 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Four trends are already visible. First, the semantic
        layer is starting to speak MCP. Cube&rsquo;s 2026
        release exposes governed metrics over SQL, REST,
        GraphQL, and MCP, which lets any MCP-aware agent
        query the semantic layer the same way a Claude or
        Cursor client would. Expect the same from dbt and
        AtScale before the year ends.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, model-side execution is moving closer to the
        data. BigQuery&rsquo;s <code>AI.GENERATE_TEXT</code>{" "}
        and <code>ML.GENERATE_TEXT</code> already run
        Gemini calls inside the warehouse. Snowflake and
        Databricks ship the same pattern. Once Gemini-SQL2
        or its successor is behind a SQL function, the
        Text-to-SQL loop can live inside the warehouse
        itself instead of a separate service.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, evaluation is finally maturing. The IBM VLDB
        2026 toolkit and the growing set of production-native
        eval frameworks that run against natural-language
        inputs (no gold SQL required) are the pieces we have
        been missing. In 2027 we expect this to be a
        stand-alone product category, the way LLM-observability
        became one in 2024.
      </p>
      <p className="mb-6 leading-relaxed">
        Fourth, small language models are becoming the
        default for schema linking and validation, with a
        larger model reserved for the generation step.
        RSL-SQL and BASE-SQL both showed small-model schema
        linking can be competitive when the retrieval is
        good. That maps cleanly to a cost-and-latency budget
        every production system has to hit.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Recommendations and where to start
      </h2>
      <p className="mb-6 leading-relaxed">
        The build-or-buy call is easier than it was a year
        ago. If your data lives in Snowflake, start with
        Cortex Analyst and a semantic model YAML. If it
        lives in Databricks, start with Genie Spaces and a
        knowledge store per business domain. If it lives in
        Redshift or QuickSight, start with Amazon Q. If it
        lives in Postgres, MySQL, or a mixed set of
        warehouses, or if you cannot ship data to a hosted
        LLM, start with Vanna plus a lightweight semantic
        layer of your own.
      </p>
      <p className="mb-6 leading-relaxed">
        In every case the two investments that matter most
        are the same. First, write out the business
        definitions of your top 30 metrics in plain language,
        put them in the semantic layer, and keep them there.
        Second, build a tier-one eval set of 20 questions
        the users ask every week, and gate every release on
        it. Do those two things and the product will feel
        trustworthy to users on day one. Skip them, and you
        will spend the next quarter apologising for confident
        answers that were quietly wrong.
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
            Snowflake Cortex Analyst documentation
          </a>
          {" "}- the reference for the semantic model YAML,
          the REST API, and the custom-instructions escape
          hatch.
        </li>
        <li>
          <a
            href="https://www.snowflake.com/en/engineering-blog/cortex-analyst-text-to-sql-accuracy-bi/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Snowflake engineering: evaluating Text-to-SQL
            accuracy for real-world BI
          </a>
          {" "}- the post with the 57% to 78% BIRD jump from
          a semantic model and the 90%+ internal number.
        </li>
        <li>
          <a
            href="https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            dbt Labs: Semantic Layer vs. Text-to-SQL (2026)
          </a>
          {" "}- the paired benchmark of accuracy and
          hallucination across three frontier models, with
          and without a semantic layer.
        </li>
        <li>
          <a
            href="https://docs.databricks.com/aws/en/ai-bi/release-notes/2026"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Databricks AI/BI and Genie One release notes 2026
          </a>
          {" "}- the running product changelog for Genie
          Spaces, the Inspect feature, and the Genie One
          agent surface.
        </li>
        <li>
          <a
            href="https://www.marktechpost.com/2026/06/12/google-releases-gemini-sql2-gemini-3-1-pro-text-to-sql-scores-80-04-on-bird-single-model-leaderboard/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MarkTechPost: Google Gemini-SQL2 at 80.04% on
            BIRD (June 2026)
          </a>
          {" "}- the launch summary with the BIRD numbers and
          the roadmap to BigQuery Studio, AlloyDB AI, and
          Cloud SQL Studio.
        </li>
        <li>
          <a
            href="https://docs.aws.amazon.com/redshift/latest/mgmt/query-editor-v2-generative-ai.html"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS: Amazon Q generative SQL for Redshift
          </a>
          {" "}- the reference for the developer-facing
          generative SQL surface in Query Editor v2.
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
          {" "}- the open-source RAG framework for Text-to-SQL,
          with plug-in support for any LLM, vector store,
          and database.
        </li>
        <li>
          <a
            href="https://arxiv.org/pdf/2411.00073"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSL-SQL: Robust Schema Linking in Text-to-SQL
            Generation
          </a>
          {" "}- the paper behind the bidirectional
          schema-linking pattern used in production stacks.
        </li>
        <li>
          <a
            href="https://spider2-sql.github.io/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spider 2.0 leaderboard and paper
          </a>
          {" "}- the enterprise-grade benchmark that replaced
          Spider 1.0 as the honest bar for real workloads.
        </li>
        <li>
          <a
            href="https://bird-bench.github.io/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BIRD-bench
          </a>
          {" "}- the execution-accuracy benchmark that every
          Text-to-SQL vendor now cites, plus the cleaner
          bird-sql-dev-1106 split shipped in 2026.
        </li>
        <li>
          <a
            href="/articles/end-to-end-analytics-microsoft-fabric"
            className="font-semibold text-primaryColor hover:underline"
          >
            End-to-end analytics on Microsoft Fabric
          </a>
          {" "}- the sister article on the data-platform
          side of the same story.
        </li>
      </ul>
    </div>
  );
}
