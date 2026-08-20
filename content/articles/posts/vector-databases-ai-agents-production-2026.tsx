import CodeBlock from "@/components/Articles/CodeBlock";
import { Article } from "@/types";

export const meta: Article = {
  id: 38,
  slug: "vector-databases-ai-agents-production-2026",
  title:
    "Vector databases for AI agents in production 2026: pgvector, Qdrant, Weaviate, Pinecone, Milvus, and object-storage-native Turbopuffer",
  excerpt:
    "How the vector database choice went from an afterthought to a load-bearing decision once AI agents started hitting retrieval on every turn. A practical read on pgvector plus pgvectorscale, Qdrant, Weaviate, Pinecone, Milvus and Zilliz, LanceDB, and Turbopuffer, with the real Notion, Cursor, Linear, and Reddit migrations that show how much the pick actually matters.",
  metaDescription:
    "A practical, technical guide to vector databases for AI agents in 2026. Covers pgvector and pgvectorscale, Qdrant, Weaviate, Pinecone, Milvus and Zilliz Cloud, LanceDB, and Turbopuffer, with the ANN algorithm background (HNSW, IVF, DiskANN, quantization), filtered search performance, hybrid search, MCP support, and the real production migrations at Notion, Cursor, Linear, Reddit, and OpenWebUI. Includes decision tables by scale, self-hosted vs. managed choice, and where each engine actually shines.",
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
    "Vector Databases",
    "RAG",
    "pgvector",
    "Qdrant",
    "Weaviate",
    "Pinecone",
    "Milvus",
    "Turbopuffer",
    "Production",
  ],
  publishDate: "2026-08-20",
  readingTime: "17 min read",
};

export default function VectorDatabasesAiAgents2026Post() {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        The vector database is boring the day you pick it,
        expensive the day it does not scale, and painful
        the day your agent starts filtering by tenant. In
        2023 it was a rounding-error decision. In 2026 it
        is a load-bearing one. Agents hit retrieval on
        every turn, memory systems store years of history
        as embeddings, and the difference between a
        4-millisecond and a 400-millisecond search is
        whether the agent feels alive or feels dead. This
        article is what we have learned picking and moving
        vector stores on client work through the last two
        years: what each engine is actually good at, how
        Notion, Cursor, Linear, and Reddit picked, and the
        decision tree we now use before writing a single
        line of retrieval code.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Why the vector database decision started to matter
        again
      </h2>
      <p className="mb-6 leading-relaxed">
        For a stretch of 2023 and 2024 the popular answer
        was, do not think about it, pick pgvector or
        Pinecone and move on. That advice was right for a
        chatbot with 50,000 chunks. It is wrong the moment
        the workload actually looks like a 2026 agent
        workload. Three shifts pushed the choice back to
        the top of the stack.
      </p>
      <p className="mb-6 leading-relaxed">
        First, <strong>agents made retrieval hot</strong>.
        A plain RAG bot did one search per user question.
        An agent does five or ten per session because the
        loop keeps calling the retriever as a tool. Every
        milliseconds of tail latency compounds across a
        conversation, and every dollar of storage cost
        compounds across a userbase. Notion&rsquo;s public
        write-up put a number on this in early 2026: they
        cut search-related cloud spend by about sixty
        percent, and roughly ninety-five percent of total
        AI infrastructure cost, moving away from a
        traditional vector database as their AI features
        scaled.
      </p>
      <p className="mb-6 leading-relaxed">
        Second, <strong>filtering broke the naive
        setups</strong>. Multi-tenant SaaS added
        <code> tenant_id</code> filters on every query,
        legal and healthcare added ACL filters, agent
        memory added session-id and user-id filters. Pure
        vector search stopped being enough. The engines
        that handle filters well (Qdrant, Weaviate,
        Milvus, and pgvector plus pgvectorscale on
        Postgres) started winning workloads that Pinecone
        used to own.
      </p>
      <p className="mb-6 leading-relaxed">
        Third, <strong>object storage caught up</strong>.
        Turbopuffer, LanceDB, and Chroma moved the
        indexes onto S3 with a memory and SSD cache in
        front, which changed the economics of storing
        billions of embeddings. Cursor cut data storage
        and retrieval costs by ninety-five percent
        migrating to Turbopuffer, because a per-codebase
        namespace on S3 costs nothing when the codebase
        is not being touched.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The 2024 to 2026 shift, in ten bullets
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Early 2024</strong>: pgvector 0.7 ships
          HNSW indexes, which brings Postgres within
          striking distance of dedicated engines for
          workloads under 5 million vectors.
        </li>
        <li>
          <strong>Mid 2024</strong>: Timescale (now Tiger
          Data) releases pgvectorscale with
          StreamingDiskANN, pushing viable pgvector scale
          past a hundred million vectors on a single
          Postgres instance.
        </li>
        <li>
          <strong>Late 2024</strong>: Turbopuffer launches
          publicly with the object-storage-first shape.
          Notion, Cursor, Superhuman, and Linear are all
          on it within a year.
        </li>
        <li>
          <strong>Q1 2025</strong>: Zilliz Cloud (the
          managed Milvus) ships its serverless tier and
          claims about ten times the throughput of
          self-hosted Milvus at similar recall on the
          BEIR and MSMARCO benchmarks.
        </li>
        <li>
          <strong>Mid 2025</strong>: DiskANN lands as a
          production index in Azure Database for
          PostgreSQL, ten times faster than pgvector HNSW
          on the workloads Microsoft tested, at a
          fraction of the RAM cost.
        </li>
        <li>
          <strong>Late 2025</strong>: OpenWebUI publishes
          its ejection of Qdrant at around 1,400 files
          (their collection-per-file layout hit an
          operational wall) and moves to pgvector.
        </li>
        <li>
          <strong>February 2026</strong>: Notion&rsquo;s
          engineering blog details a Pinecone Serverless
          to Turbopuffer migration, part of a two-year
          effort that cut AI infrastructure cost by
          roughly ten times end to end.
        </li>
        <li>
          <strong>April 2026</strong>: Weaviate v1.37
          ships a native MCP Server. Weaviate becomes the
          first mainstream vector database that an agent
          can call directly through the Model Context
          Protocol without a wrapper.
        </li>
        <li>
          <strong>Mid 2026</strong>: Reddit publishes its
          340-million-vector evaluation of Qdrant,
          Weaviate, and Milvus. Milvus wins on
          scale-out and workload isolation; Qdrant wins
          on filtered-query latency at moderate scale.
        </li>
        <li>
          <strong>Summer 2026</strong>: Elastic&rsquo;s
          CEO publicly says standalone vector databases
          were <em>&ldquo;never a business&rdquo;</em> as
          Pinecone acquisition talks surface. The read on
          the market is that vector search is a feature,
          not a product, in most workloads.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        What every vector database actually does
      </h2>
      <p className="mb-6 leading-relaxed">
        Under the marketing, every engine in this list
        does the same three things. It stores embedding
        vectors, indexes them so nearest-neighbour search
        does not scan the whole table, and returns the
        top-k for a query vector. The interesting
        differences are in the index algorithm, the
        filtering path, and the storage model.
      </p>
      <p className="mb-6 leading-relaxed">
        Three index families cover almost every
        production system. <strong>HNSW</strong>{" "}
        (hierarchical navigable small world) is a
        graph-based index that gives the best recall for
        the lowest latency in memory, at the cost of
        memory usage (10 gigabytes for a million
        1536-dim vectors is a reasonable rule of thumb).{" "}
        <strong>IVF</strong> (inverted file with product
        quantization) partitions the vectors into
        clusters and searches only the closest few,
        which is what Milvus reaches for at scale.{" "}
        <strong>DiskANN</strong> (from Microsoft
        Research) is a graph index that stays on SSD, so
        the memory footprint stays flat as the corpus
        grows. Azure Postgres and pgvectorscale both
        default to it now.
      </p>
      <p className="mb-6 leading-relaxed">
        On top of the index sits{" "}
        <strong>quantization</strong>, which trades a
        few points of recall for a huge cut in memory.
        Binary quantization compresses a 1024-dim
        float32 vector (4 kilobytes) down to 1024 bits
        (128 bytes), a 32x reduction, at about 95
        percent recall in practice. Scalar quantization
        (int8) sits in the middle. Every engine we
        cover supports at least one of these; the
        default in Qdrant Cloud and Zilliz Cloud is now
        binary or scalar, not full precision.
      </p>
      <CodeBlock
        language="bash"
        filename="The three axes that separate the engines"
        code={`+---------------------------------------------------+
|  1. Index algorithm                               |
|  HNSW  (in-memory graph)  -> lowest latency       |
|  IVF   (partitioned)      -> best for billions    |
|  DiskANN (SSD-resident)   -> flat RAM at scale    |
+---------------------------------------------------+
|  2. Filter path                                   |
|  Pre-filter  -> correct, slow on selective        |
|  Post-filter -> fast, wrong on selective          |
|  Integrated  -> Qdrant / Weaviate / Milvus win    |
+---------------------------------------------------+
|  3. Storage model                                 |
|  In-memory  (Redis, in-memory HNSW)               |
|  Local SSD  (Qdrant, Pinecone pod, Milvus)        |
|  Object storage + cache (Turbopuffer, LanceDB)    |
+---------------------------------------------------+`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The seven engines worth knowing in 2026
      </h2>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        pgvector and pgvectorscale
      </h3>
      <p className="mb-6 leading-relaxed">
        If the app already runs on Postgres, pgvector is
        the default answer for the first ten million
        vectors and often well beyond. HNSW indexes ship
        in core pgvector; StreamingDiskANN, filtered
        search improvements, and binary-quantized SBQ
        indexes ship in the pgvectorscale extension from
        Tiger Data. Firecrawl&rsquo;s 2026 benchmark
        measures pgvector plus pgvectorscale at about
        471 QPS on 50 million vectors at 99 percent
        recall, at roughly seventy-five percent lower
        infra cost than Pinecone at the same scale.
      </p>
      <p className="mb-6 leading-relaxed">
        The single biggest reason to pick this stack is
        the join. If the agent needs to filter by
        tenant, ACL, or timestamp and then rank by
        vector similarity, everything happens in one
        query with the transactional guarantees Postgres
        already gives. The single biggest reason to
        skip it is that building an HNSW index over
        millions of vectors on a live Postgres can
        consume ten-plus gigabytes of RAM for hours,
        which is fine on a real database server and not
        fine on the smallest RDS class. Azure
        Database&rsquo;s DiskANN option (10x faster than
        HNSW on their benchmarks with a fraction of the
        memory footprint) is the version we point
        clients at when the growth curve is aggressive.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Qdrant
      </h3>
      <p className="mb-6 leading-relaxed">
        Qdrant is the default we now pick for greenfield
        RAG and agent memory workloads that will not stay
        inside Postgres. It is a single Rust binary, runs
        in one container, and lands at about 4 ms p50
        latency on 1M-vector, 1536-dim workloads (Salt
        Technologies 2026 benchmark). The 1 GB Cloud free
        tier is the best in the market. What actually
        seals it for most teams is filtered search:
        Qdrant folds payload indexes into the HNSW graph
        traversal, so a query with a highly selective
        filter (say, ninety percent of the corpus
        filtered out) is two to four times faster than
        Milvus on the same shape.
      </p>
      <p className="mb-6 leading-relaxed">
        Where Qdrant slows down is the top end. At
        Reddit&rsquo;s 340-million-vector scale with
        heavy concurrent ingestion, Qdrant&rsquo;s
        homogeneous cluster nodes started to interfere
        between writes and reads. Reddit picked Milvus
        instead. Below 50 million vectors, Qdrant is
        almost always the right call over Milvus for
        the ops burden alone.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Weaviate
      </h3>
      <p className="mb-6 leading-relaxed">
        Weaviate is the pick when hybrid search is the
        point, not a feature. Dense vectors and BM25
        keyword search live in one query and merge with
        reciprocal rank fusion, which for a lot of RAG
        workloads is a straight upgrade over pure dense
        search. It also ships module-based vectorization
        (bring your own text and Weaviate calls the
        embedding API), which cuts application code.
      </p>
      <p className="mb-6 leading-relaxed">
        The 2026 headline is the v1.37 release in April:
        Weaviate is the first mainstream vector database
        with a native MCP Server. Agents (Claude,
        ChatGPT with connectors, LangGraph clients) can
        speak Model Context Protocol directly to
        Weaviate and hit both dense and BM25 without
        wrappers. If the target architecture is
        MCP-first, this is the shortest path.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Pinecone
      </h3>
      <p className="mb-6 leading-relaxed">
        Pinecone is the pick when the team wants zero
        operational surface and predictable serverless
        billing. The 2026 pattern is Pinecone Serverless,
        which decouples storage from query compute and
        keeps warm p95 at 10 to 30 ms. The trade-off is
        cost at sustained high QPS and cold-start
        latency (40 to 80 ms on p99 cold). The
        Confident AI, GlassDollar, Notion, and Cursor
        migrations are the four public data points on
        the cost story; every one of them moved off
        Pinecone to save money.
      </p>
      <p className="mb-6 leading-relaxed">
        The honest read: Pinecone is still the fastest
        way to ship. Small teams get to production in
        days rather than weeks, and the sub-20 ms warm
        p95 at 5M+ vectors is real. Where it stops
        being the right pick is a sustained workload
        with a well-understood retrieval pattern, where
        a self-hosted Qdrant or a pgvectorscale on RDS
        prints far less on the invoice.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Milvus and Zilliz Cloud
      </h3>
      <p className="mb-6 leading-relaxed">
        Milvus is the engine to reach for above one
        hundred million vectors, or when a workload
        needs strict isolation between ingestion and
        query nodes. It is the only open-source vector
        database with a fully disaggregated
        architecture: separate query nodes, data nodes,
        index nodes, and a coordinator, tied together
        by etcd and MinIO or S3. That layout is why
        Reddit picked it for 340 million vectors: heavy
        writes do not stall reads.
      </p>
      <p className="mb-6 leading-relaxed">
        Zilliz Cloud is the managed version and, in the
        2026 comparisons, runs about ten times the
        throughput of self-hosted Milvus at similar
        recall. The trade-off is operational weight:
        Milvus self-hosted needs Kubernetes and a
        platform team, and even Zilliz Cloud has a
        steeper learning curve than Pinecone. Below 50
        million vectors, Milvus is almost always
        overkill.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        LanceDB
      </h3>
      <p className="mb-6 leading-relaxed">
        LanceDB is the pick for local-first and
        embedded workloads: a serverless
        columnar-plus-vector store that reads from
        object storage or the local disk with no
        server. The API is Python and JavaScript first,
        the file format (Lance) is the interesting
        engineering piece, and the fit is workflows
        where the retrieval step lives in the same
        process as the model (mobile, on-device, or
        edge inference).
      </p>
      <p className="mb-6 leading-relaxed">
        The managed cloud tier is still in beta and
        multi-process concurrent access has limits, so
        it is not the pick for a shared production
        service. It is the pick when the retrieval
        state has to sit next to the inference process
        with no round trip.
      </p>

      <h3 className="mb-3 mt-8 text-2xl font-semibold text-white">
        Turbopuffer
      </h3>
      <p className="mb-6 leading-relaxed">
        Turbopuffer is the object-storage-native option
        that has taken the AI-first workloads by storm
        in 2025 and 2026. The storage tier is S3, with
        a memory and SSD cache in front, and the design
        target is a power-law workload: many namespaces,
        most of which are cold most of the time. Cursor
        maps each codebase to a namespace on S3, so an
        inactive codebase costs nothing to store. Notion
        maps each workspace the same way. The Turbopuffer
        blog puts the storage cost at about $70 per TB
        per month, versus $1,600 for the RAM-plus-SSD
        incumbents, a twenty-times gap that is the
        entire reason the migration wave started.
      </p>
      <p className="mb-6 leading-relaxed">
        The catch is cold-query latency. A cold namespace
        hits S3 and lands around 400 ms p90; warm queries
        drop to about 10 ms p90. Turbopuffer is the right
        pick when the workload is power-law and cost is
        the constraint. It is the wrong pick when every
        query has to be warm and sub-20 ms.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        A working retriever the agent actually calls
      </h2>
      <p className="mb-6 leading-relaxed">
        The engine choice matters less if the code that
        wraps it is not clean. This is the shape we ship
        on client work: a single retrieval tool that
        does hybrid search plus reranking behind one
        function, so the agent (or the RAG pipeline)
        only ever calls one thing.
      </p>
      <CodeBlock
        language="python"
        filename="src/retrieval/qdrant_hybrid.py"
        code={`from qdrant_client import QdrantClient, models
from cohere import Client as Cohere

qdrant = QdrantClient(url="https://qdrant.internal")
cohere = Cohere(api_key=COHERE_API_KEY)

def retrieve(query: str, tenant_id: str, top_k: int = 20) -> list[dict]:
    """Dense + sparse + rerank, filtered by tenant."""
    dense = models.NamedVector(name="dense", vector=embed(query))
    sparse = models.NamedSparseVector(name="sparse", vector=sparse_encode(query))

    # Reciprocal rank fusion done server-side.
    hits = qdrant.query_points(
        collection_name="docs",
        prefetch=[
            models.Prefetch(query=dense, limit=150),
            models.Prefetch(query=sparse, limit=150),
        ],
        query=models.FusionQuery(fusion=models.Fusion.RRF),
        query_filter=models.Filter(
            must=[models.FieldCondition(
                key="tenant_id",
                match=models.MatchValue(value=tenant_id),
            )],
        ),
        limit=150,
    ).points

    # Cross-encoder rerank on top of the fused list.
    reranked = cohere.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=[h.payload["text"] for h in hits],
        top_n=top_k,
    )
    return [hits[r.index].payload for r in reranked.results]`}
      />
      <p className="mb-6 leading-relaxed">
        Three details in that function matter more than
        they look. First, the tenant filter is on the
        vector search itself, not a Python filter after
        the top-k comes back. On Qdrant this is fast
        because payload indexes fold into HNSW
        traversal; if you tried the same shape on a
        naive pgvector setup on a large corpus, the
        selective filter would tank the recall unless
        you turned on iterative scans or moved to
        pgvectorscale. Second, RRF is done inside
        Qdrant, not in Python, which saves a round trip
        and keeps the top-150 stable. Third, reranking
        is the last mile, and it matters more than the
        engine choice on retrieval quality (Anthropic
        measured a 67 percent cut in retrieval failure
        rate stacking contextual embeddings, BM25, and
        a reranker).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Same idea on Postgres
      </h2>
      <p className="mb-6 leading-relaxed">
        When the team already runs Postgres, the same
        pattern is one SQL query. pgvector plus
        pgvectorscale plus <code>pg_trgm</code> or the
        Postgres full-text search gives you dense and
        sparse in one place. The reranker still runs
        outside, but the retrieval is transactional and
        joins to any other row in the schema without a
        second store.
      </p>
      <CodeBlock
        language="python"
        filename="src/retrieval/pgvector_hybrid.py"
        code={`from psycopg import Connection
from cohere import Client as Cohere

cohere = Cohere(api_key=COHERE_API_KEY)

DENSE_WEIGHT = 0.6
SPARSE_WEIGHT = 0.4

def retrieve(conn: Connection, query: str, tenant_id: str, top_k: int = 20):
    with conn.cursor() as cur:
        cur.execute(
            """
            WITH dense AS (
                SELECT id, text,
                       1 - (embedding <=> %(qvec)s) AS score
                  FROM docs
                 WHERE tenant_id = %(tenant)s
              ORDER BY embedding <=> %(qvec)s
                 LIMIT 150
            ),
            sparse AS (
                SELECT id, text,
                       ts_rank_cd(fts, plainto_tsquery('english', %(q)s)) AS score
                  FROM docs
                 WHERE tenant_id = %(tenant)s
                   AND fts @@ plainto_tsquery('english', %(q)s)
              ORDER BY score DESC
                 LIMIT 150
            )
            SELECT id, text,
                   %(dw)s * COALESCE(d.score, 0) +
                   %(sw)s * COALESCE(s.score, 0) AS fused
              FROM dense d FULL OUTER JOIN sparse s USING (id, text)
             ORDER BY fused DESC
             LIMIT 150
            """,
            {"qvec": embed(query), "q": query, "tenant": tenant_id,
             "dw": DENSE_WEIGHT, "sw": SPARSE_WEIGHT},
        )
        candidates = cur.fetchall()

    reranked = cohere.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=[row[1] for row in candidates],
        top_n=top_k,
    )
    return [candidates[r.index] for r in reranked.results]`}
      />
      <p className="mb-6 leading-relaxed">
        On this shape, pgvectorscale is what makes the
        <code> WHERE tenant_id = %s</code> plus vector
        search combination not fall over on a
        multi-tenant corpus. Vanilla pgvector will use
        the HNSW index for the ordering, then filter,
        which recalls poorly when the filter is
        selective. pgvectorscale iterative scans and
        the DiskANN index in Azure Postgres both fix
        that in different ways.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Filtered search is where the choice actually
        matters
      </h2>
      <p className="mb-6 leading-relaxed">
        At the raw ANN benchmark, a lot of the engines
        look similar. Pick a 1-million-vector, 1536-dim
        dataset, tune HNSW, and every engine in this
        list will land under 50 ms. The interesting
        gaps open up when the query has a filter, and
        the filter is selective.
      </p>
      <p className="mb-6 leading-relaxed">
        The three failure modes to know about.{" "}
        <strong>Pre-filter</strong>: filter first, then
        vector search the survivors. Correct, but slow
        and eventually times out on a highly selective
        filter over billions of vectors.{" "}
        <strong>Post-filter</strong>: vector search
        first, then filter the top-k. Fast, but if the
        filter cuts most of the top-k, you get an empty
        result set even when the answer exists.{" "}
        <strong>Integrated</strong>: the filter is
        pushed into the graph traversal itself, so the
        search only visits nodes that match. This is
        what Qdrant, Weaviate, and Milvus all do; it is
        also the reason vanilla pgvector under-recalls
        on selective filters and why pgvectorscale
        adds iterative scans.
      </p>
      <p className="mb-6 leading-relaxed">
        Kunal Ganglani&rsquo;s May 2026 comparison
        pinned it clearly: on a workload with ninety
        percent of the corpus filtered out, Qdrant runs
        two to four times faster than Milvus. On
        unfiltered ANN, they trade blows. Almost every
        production agent workload we ship has a
        selective filter (tenant, user, session, ACL,
        recency), so integrated filtering is the axis
        we weight most heavily.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The production migrations that shaped 2026
      </h2>
      <p className="mb-6 leading-relaxed">
        Four public case studies capture the shape of
        the 2025-2026 move.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Notion, Pinecone Serverless to
        Turbopuffer</strong>. Notion&rsquo;s AI
        infrastructure grew to more than 10 billion
        vectors across millions of workspace
        namespaces. Most workspaces sit cold most of
        the time. Their February 2026 post says the
        migration cut retrieval-related spend by about
        sixty percent by itself, and roughly ninety-
        five percent of AI cost across the two-year
        effort, letting them drop per-user AI charges.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Cursor, in-house to Turbopuffer</strong>.
        Cursor indexes user codebases for semantic
        search. Each codebase is a namespace on S3.
        Cost per stored codebase dropped by about
        ninety-five percent, and the same move let
        them index far larger repositories than the
        old economics allowed.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Linear, Elasticsearch and pgvector to
        Turbopuffer</strong>. Linear moved to a single
        search backend for a hands-off operational
        story, then plugged the same store into their
        AI features. The engineering win was removing
        one system to maintain, not raw performance.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>Reddit, Qdrant and Weaviate to
        Milvus</strong>. Reddit&rsquo;s 340-million-
        vector search benchmark landed on Milvus after
        Qdrant scored higher on latency in isolation.
        The write-up is honest about the reason: at
        that scale, replication and workload
        isolation between ingest and query nodes
        mattered more than raw p50.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>OpenWebUI, Qdrant to pgvector</strong>.
        The mirror case: at around 1,400 uploaded files,
        their one-collection-per-file layout hit an
        operational wall in Qdrant, and moving to
        pgvector inside Postgres cleared it. A good
        reminder that the wrong data model can undo any
        engine choice.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        MCP: retrievers as tools, not libraries
      </h2>
      <p className="mb-6 leading-relaxed">
        The 2026 pattern for exposing a vector store to
        an agent is not a Python import, it is an MCP
        server. Weaviate v1.37 ships this natively.
        Everything else is one thin wrapper away. Once
        the retriever lives behind MCP, the same server
        answers a Claude client, an OpenAI Agents SDK
        client, or a LangGraph client with no code
        change.
      </p>
      <CodeBlock
        language="python"
        filename="src/mcp/retrieval_server.py"
        code={`from mcp.server.fastmcp import FastMCP
from retrieval.qdrant_hybrid import retrieve

server = FastMCP("policies-search")

@server.tool()
async def search(query: str, tenant_id: str, top_k: int = 8) -> list[dict]:
    """Hybrid search over the tenant's policy corpus."""
    hits = retrieve(query=query, tenant_id=tenant_id, top_k=top_k)
    return [{"id": h["id"], "snippet": h["text"][:400], "url": h["url"]} for h in hits]

@server.tool()
async def fetch(doc_id: str, tenant_id: str) -> dict:
    """Fetch the full text and metadata for one document by id."""
    doc = doc_store.get(doc_id)
    assert doc["tenant_id"] == tenant_id, "cross-tenant access denied"
    return doc

if __name__ == "__main__":
    server.run()`}
      />
      <p className="mb-6 leading-relaxed">
        Two rules we now enforce on every MCP retriever.
        First, <code>tenant_id</code> is a required
        argument on every tool, not something the server
        infers from the user session, because the agent
        may run across tenants. Second, the server
        double-checks tenant on <code>fetch</code>, so a
        crafted <code>doc_id</code> cannot leak a
        document from another tenant. This is the class
        of failure MCP servers make easy to introduce
        and easy to fix once you know to check for it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Cost model: what a million queries actually
        costs
      </h2>
      <p className="mb-6 leading-relaxed">
        The invoices published in the 2026 comparisons
        follow one pattern: the RAM-heavy engines are
        expensive, the SSD-heavy engines are moderate,
        and the object-storage-native engines are
        cheap. A rough shape from the public numbers,
        for a workload of about 100 million 1024-dim
        vectors serving 100 queries per second, all
        prices in USD per month.
      </p>
      <CodeBlock
        language="bash"
        filename="Rough monthly cost shape at 100M vectors, 100 QPS"
        code={`+--------------------------------+----------------+---------------+
| Engine / deployment            | Storage tier   | Rough $/month |
+--------------------------------+----------------+---------------+
| Pinecone Serverless            | Managed SSD    | $6k - $12k    |
| Zilliz Cloud (managed Milvus)  | Managed SSD    | $4k - $8k     |
| Qdrant Cloud                   | Managed SSD    | $2k - $5k     |
| Milvus self-hosted (K8s)       | SSD (own)      | $1.5k - $3k   |
| Qdrant self-hosted             | SSD (own)      | $1k - $2k     |
| pgvector + pgvectorscale (RDS) | SSD (own)      | $800 - $2k    |
| Turbopuffer                    | S3 + cache     | $200 - $700   |
+--------------------------------+----------------+---------------+`}
      />
      <p className="mb-6 leading-relaxed">
        Those numbers are for a stable workload with
        even query distribution. Turbopuffer&rsquo;s
        advantage compounds when the workload is power-
        law (Notion, Cursor), because a cold namespace
        pays only for object storage. It shrinks or
        flips when every namespace is warm every hour.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        The decision tree we actually use
      </h2>
      <p className="mb-6 leading-relaxed">
        The framework we now walk through with clients
        boils down to four questions.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>1. Are you already on Postgres?</strong>{" "}
        If yes and the vector count is under about 10
        million, start with pgvector. If growth to 100M
        is realistic, plan for pgvectorscale (or Azure
        Postgres DiskANN) before you get there. The
        transactional and join story is worth defending.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>2. Is the workload power-law with many
        namespaces?</strong> If yes, Turbopuffer is
        almost certainly the shape to try. The Notion,
        Cursor, Linear, and Superhuman cases all share
        this pattern.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>3. Do you need hybrid search out of
        the box or MCP native?</strong> If yes,
        Weaviate. It is the cleanest hybrid story and,
        after v1.37, the fastest MCP integration.
      </p>
      <p className="mb-6 leading-relaxed">
        <strong>4. What is the scale ceiling in 18
        months?</strong> Under 50 million vectors:
        Qdrant. 50 to 500 million with a platform team:
        Milvus or Zilliz Cloud. Above 500 million with
        Kubernetes maturity: Milvus in cluster mode.
        Managed with no ops burden and cost is not the
        top constraint: Pinecone Serverless.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Where the pattern is heading
      </h2>
      <p className="mb-6 leading-relaxed">
        Three shifts to plan for through 2026 and 2027.
        First, <strong>vector search is becoming a
        Postgres feature</strong>. DiskANN in Azure
        Postgres is the strongest signal; every managed
        Postgres will ship a viable ANN index within a
        year, and the reasons to run a separate engine
        will shrink for workloads under a hundred
        million vectors. Second, <strong>object storage
        native is the new default at scale</strong>.
        Turbopuffer&rsquo;s pricing pressure is
        rewriting the roadmaps at Pinecone, Weaviate,
        and Zilliz; expect S3-first tiers everywhere.
        Third, <strong>MCP becomes the retriever
        protocol</strong>. Weaviate is first, everyone
        else follows. Once every retriever speaks MCP,
        the vector database becomes swappable behind a
        stable tool contract, which is the layer that
        makes the choice reversible.
      </p>
      <p className="mb-6 leading-relaxed">
        The uncomfortable part of the read: standalone
        vector databases are under real competitive
        pressure. Elastic, MongoDB, Redis, Cassandra,
        SQL Server, and Postgres all ship credible
        vector search now. The engines that survive
        will be the ones that do something the general
        databases cannot, which right now is filtered
        vector search at massive scale (Milvus),
        integrated hybrid search (Weaviate), and
        object-storage economics (Turbopuffer).
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Takeaways
      </h2>
      <p className="mb-6 leading-relaxed">
        Pick pgvector plus pgvectorscale (or Azure
        DiskANN) when you are already on Postgres and
        the workload will not blow past a hundred
        million vectors. Pick Qdrant for greenfield
        production agent workloads under fifty million
        vectors where filtered search matters. Pick
        Weaviate when hybrid search is the primary
        job or MCP is the target interface. Pick
        Milvus or Zilliz Cloud above a hundred million
        vectors, especially with heavy ingest running
        against heavy query. Pick Turbopuffer when the
        workload is power-law across many namespaces
        and cost is the constraint. Pick Pinecone
        Serverless when time to production is the
        constraint and cost is not.
      </p>
      <p className="mb-6 leading-relaxed">
        The one number worth remembering: the vector
        database is roughly the last ten percent of
        the retrieval-quality decision (embedding
        model, chunking, hybrid search, and reranking
        cover the other ninety), but it is the first
        ninety percent of the cost and operational
        decision. Get the retrieval stack right,
        including filters and rerank, and the engine
        choice becomes swappable. Skip that work and
        no engine will save you.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-white">
        Further reading
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <a
            href="https://qdrant.tech/benchmarks/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qdrant benchmarks
          </a>
          {" "}- the Qdrant team&rsquo;s reproducible
          benchmark suite covering Qdrant, Milvus,
          Weaviate, Elasticsearch, and Redis, with
          scripts you can run against your own data.
        </li>
        <li>
          <a
            href="https://github.com/zilliztech/VectorDBBench"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            VectorDBBench (Zilliz)
          </a>
          {" "}- open-source benchmark tool for
          comparing vector databases; maintained by the
          Milvus team so read it with the appropriate
          adjustment.
        </li>
        <li>
          <a
            href="https://www.microsoft.com/en-us/research/publication/diskann-fast-accurate-billion-point-nearest-neighbor-search-on-a-single-node/"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DiskANN paper (Microsoft Research)
          </a>
          {" "}- the algorithm behind pgvectorscale and
          the Azure Postgres DiskANN index; the reason
          Postgres now scales past 100M vectors.
        </li>
        <li>
          <a
            href="https://techcommunity.microsoft.com/blog/adforpostgresql/diskann-on-azure-database-for-postgresql-%E2%80%93-now-generally-available/4414723"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DiskANN on Azure Database for PostgreSQL,
            general availability
          </a>
          {" "}- Microsoft&rsquo;s numbers on 10x
          faster, 4x cheaper, 96x lower memory versus
          pgvector HNSW.
        </li>
        <li>
          <a
            href="https://github.com/timescale/pgvectorscale"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            timescale/pgvectorscale on GitHub
          </a>
          {" "}- the StreamingDiskANN, SBQ binary
          quantization, and iterative-scan extension
          that makes pgvector production-worthy above
          10M vectors.
        </li>
        <li>
          <a
            href="https://turbopuffer.com/blog/turbopuffer"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Turbopuffer: fast search on object storage
          </a>
          {" "}- the design write-up of the S3-first
          architecture and the storage-cost numbers
          that made Notion, Cursor, Linear, and
          Superhuman move.
        </li>
        <li>
          <a
            href="https://cloud.google.com/customers/turbopuffer"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud case study: Turbopuffer
          </a>
          {" "}- the customer view of the Turbopuffer
          growth curve and the scale numbers (1T+
          documents, 10M+ writes per second, 25k+
          queries per second in production).
        </li>
        <li>
          <a
            href="https://milvus.io/blog/choosing-a-vector-database-for-ann-search-at-reddit.md"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reddit engineering: choosing a vector
            database for ANN search at Reddit
          </a>
          {" "}- the 340M-vector evaluation of Milvus,
          Qdrant, and Weaviate, and why Reddit landed
          on Milvus.
        </li>
        <li>
          <a
            href="https://weaviate.io/blog/hybrid-search-explained"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weaviate: hybrid search explained
          </a>
          {" "}- the reference read on dense-plus-sparse
          hybrid search and the reciprocal-rank-fusion
          approach Weaviate ships by default.
        </li>
        <li>
          <a
            href="https://weaviate.io/blog/model-context-protocol"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weaviate: Model Context Protocol server
          </a>
          {" "}- the April 2026 v1.37 release notes for
          the native MCP server that lets agents call
          Weaviate directly.
        </li>
        <li>
          <a
            href="https://www.anthropic.com/engineering/contextual-retrieval"
            className="font-semibold text-primaryColor hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic: Contextual Retrieval
          </a>
          {" "}- the 67 percent retrieval-failure-rate
          reduction from stacking contextual
          embeddings, contextual BM25, and reranking on
          any vector store.
        </li>
        <li>
          <a
            href="/articles/rag-nextjs-langchain-vercel-ai-sdk"
            className="font-semibold text-primaryColor hover:underline"
          >
            Building RAG on Next.js with LangChain and
            the Vercel AI SDK
          </a>
          {" "}- the introductory RAG build; a good
          starting point before picking a serious
          vector store.
        </li>
        <li>
          <a
            href="/articles/ai-agent-memory-systems-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            AI agent memory systems in 2026
          </a>
          {" "}- how these engines get used as the
          long-term memory layer for agents, not just
          for RAG.
        </li>
        <li>
          <a
            href="/articles/postgresql-only-backend-nextjs"
            className="font-semibold text-primaryColor hover:underline"
          >
            The PostgreSQL-only backend for Next.js
          </a>
          {" "}- the case for keeping vector, relational,
          and full-text search in one database.
        </li>
        <li>
          <a
            href="/articles/mcp-production-ai-integrations-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            MCP in production 2026
          </a>
          {" "}- the protocol these retrievers now sit
          behind so an agent can call them without
          bespoke glue.
        </li>
        <li>
          <a
            href="/articles/context-engineering-ai-agents-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Context engineering for AI agents in 2026
          </a>
          {" "}- the retrieval-quality half of the
          decision the engine only owns ten percent of.
        </li>
        <li>
          <a
            href="/articles/agent-evaluation-observability-2026"
            className="font-semibold text-primaryColor hover:underline"
          >
            Agent evaluation and observability in 2026
          </a>
          {" "}- how to measure whether an engine swap
          actually helped retrieval quality, not just
          the invoice.
        </li>
      </ul>
    </div>
  );
}
