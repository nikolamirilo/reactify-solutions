import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 8,
  slug: "postgresql-only-backend-nextjs",
  title:
    "Ditch the SaaS stack: PostgreSQL is the only backend you need for Next.js apps",
  excerpt:
    "Postgres has grown extensions that cover almost every common backend need. Vector search, scheduling, full-text search, queues, realtime, auth. This is how to collapse your stack down to one database.",
  metaDescription:
    "How to replace Pinecone, Redis, Algolia, cron services, and auth databases with one PostgreSQL instance in a Next.js app. Covers pgvector, pg_cron, pg_trgm, RLS, LISTEN/NOTIFY, and pgmq.",
  image: "/images/blogs/blog-06.jpg",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["PostgreSQL", "Next.js", "Backend", "Architecture"],
  publishDate: "2026-04-19",
  readingTime: "13 min read",
};

export default function PostgresqlOnlyBackendNextjsPost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        You open a new Next.js project and now you need a database, a queue, a
        vector store, a scheduler, a search index, a pub/sub system, and an auth
        service. That is six SaaS products and six failure points. For most
        apps, every one of those can be one Postgres database instead.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        This is not theoretical. We run production systems on this stack for
        clients every month. The pitch is simple. Postgres has grown extensions
        that cover every common backend need, and the integration work collapses
        into plain SQL.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The standard SaaS stack and what Postgres replaces
      </h2>
      <p className="mb-4 leading-relaxed">
        A typical modern Next.js app on the &quot;one service for each
        thing&quot; stack looks like this:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Postgres for the main database, on Neon or Supabase.</li>
        <li>Pinecone or Qdrant for vector search.</li>
        <li>Upstash Redis for caching and simple queues.</li>
        <li>Upstash or Vercel Cron for scheduled jobs.</li>
        <li>Algolia for search.</li>
        <li>Pusher or Ably for realtime.</li>
        <li>Clerk or Auth0 for auth, with its own user database.</li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Every one of those products is a separate bill, a separate failure
        domain, and a separate set of secrets. Postgres can cover pgvector for
        the first one, plus a handful of extensions for most of the rest.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        pgvector: goodbye Pinecone, for most workloads
      </h2>
      <p className="mb-6 leading-relaxed">
        The headline extension. pgvector adds a vector data type and similarity
        operators. With an HNSW index, it is fast enough for the vast majority
        of RAG and semantic search use cases.
      </p>
      <CodeBlock
        language="typescript"
        filename="db/pgvector.sql"
        code={`-- enable the extension once per database
create extension if not exists vector;

-- a table with a 1536-dim embedding column
create table doc_chunks (
  id bigserial primary key,
  doc_id text not null,
  content text not null,
  embedding vector(1536) not null
);

-- HNSW index for fast similarity search
create index on doc_chunks
  using hnsw (embedding vector_cosine_ops);

-- query: 10 nearest neighbors to a given embedding
select id, content, 1 - (embedding <=> $1) as score
from doc_chunks
order by embedding <=> $1
limit 10;`}
      />
      <p className="mb-6 leading-relaxed">
        Pinecone still wins on scale past roughly 50 million vectors with tight
        latency targets, but that threshold is higher than most teams ever hit.
        If you are building a product RAG feature on a corpus of 10,000 docs,
        pgvector is not a compromise. It is the better choice.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        pg_cron: the cron service you already have
      </h2>
      <p className="mb-6 leading-relaxed">
        pg_cron schedules SQL statements or function calls at cron-like
        intervals. No Vercel Cron, no Upstash Schedules, no Lambda. Just one SQL
        call.
      </p>
      <CodeBlock
        language="typescript"
        filename="db/pg_cron.sql"
        code={`create extension if not exists pg_cron;

-- run every night at 3am: clean up expired sessions
select cron.schedule(
  'cleanup-sessions',
  '0 3 * * *',
  $$ delete from sessions where expires_at < now() $$
);

-- run every 5 minutes: refresh a materialized view
select cron.schedule(
  'refresh-stats',
  '*/5 * * * *',
  $$ refresh materialized view concurrently analytics_rollup $$
);`}
      />
      <p className="mb-6 leading-relaxed">
        The catch is that pg_cron runs on the database server, not your app
        server. So it is great for &quot;clean up old rows&quot; or
        &quot;refresh a materialized view at midnight.&quot; For jobs that call
        external APIs, you still need an app-side consumer that is triggered by
        a queue or HTTP endpoint.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        pg_trgm and tsvector: search without Algolia
      </h2>
      <p className="mb-4 leading-relaxed">
        For search, two Postgres features together cover most needs.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <code>tsvector</code> and <code>tsquery</code> for full-text search
          with stemming and ranking.
        </li>
        <li>
          <code>pg_trgm</code> for fuzzy matching, typo tolerance, and
          autocomplete.
        </li>
      </ul>
      <CodeBlock
        language="typescript"
        filename="db/search.sql"
        code={`create extension if not exists pg_trgm;

-- add a tsvector column and a GIN index
alter table products
  add column search_vec tsvector
  generated always as (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
  ) stored;

create index on products using gin (search_vec);

-- full-text search with ranking
select id, name, ts_rank(search_vec, query) as rank
from products, plainto_tsquery('english', 'wireless headphones') query
where search_vec @@ query
order by rank desc
limit 20;

-- typo-tolerant autocomplete with trigrams
create index on products using gin (name gin_trgm_ops);

select id, name
from products
where name % 'heaphones'
order by similarity(name, 'heaphones') desc
limit 10;`}
      />
      <p className="mb-6 leading-relaxed">
        This is not Algolia. You will not get typo-corrected, multi-index,
        personalization-aware search out of the box. But for product search on a
        small catalog, or searching inside a user&apos;s own data, it is plenty.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        JSONB: the Mongo you thought you needed
      </h2>
      <p className="mb-6 leading-relaxed">
        JSONB columns store document-style data with indexed field access. A
        common pattern is a relational schema for the structured parts of your
        domain plus a JSONB column for anything variable.
      </p>
      <CodeBlock
        language="typescript"
        filename="db/jsonb.sql"
        code={`create table events (
  id bigserial primary key,
  user_id bigint not null,
  created_at timestamptz not null default now(),
  payload jsonb not null
);

-- index a specific path inside the payload
create index on events ((payload->>'event_type'));

-- index all keys with a GIN index
create index on events using gin (payload);

-- query: all purchase events over $100
select id, payload->>'product_id' as product_id
from events
where payload @> '{"event_type": "purchase"}'
  and (payload->>'amount')::numeric > 100;`}
      />
      <p className="mb-6 leading-relaxed">
        Path operators, containment checks (<code>@&gt;</code>), and indexing on
        specific expressions mean you can query JSONB data with real
        performance. For a lot of apps, this removes the need for a second
        document database.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Row-level security: auth policies in the database
      </h2>
      <p className="mb-6 leading-relaxed">
        RLS is policies that the database enforces on every query. Paired with
        your auth provider&apos;s user id, you can push authorization logic down
        where it cannot be bypassed.
      </p>
      <CodeBlock
        language="typescript"
        filename="db/rls.sql"
        code={`alter table documents enable row level security;

create policy "users read their own docs"
  on documents for select
  using (user_id = current_setting('app.current_user_id')::bigint);

create policy "users write their own docs"
  on documents for all
  using (user_id = current_setting('app.current_user_id')::bigint)
  with check (user_id = current_setting('app.current_user_id')::bigint);`}
      />
      <p className="mb-6 leading-relaxed">
        Supabase built a whole auth product on top of this. You do not need
        Supabase to use it. Any Postgres 9.5+ supports RLS, and any client that
        sets a session variable with the user id can use it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        LISTEN/NOTIFY: realtime without Pusher
      </h2>
      <p className="mb-6 leading-relaxed">
        For server-to-client push or service-to-service notification, Postgres
        has LISTEN/NOTIFY built in. A client subscribes to a channel, another
        client publishes, the payload is delivered.
      </p>
      <CodeBlock
        language="typescript"
        filename="lib/realtime.ts"
        code={`import { Client } from "pg";

// listener
const listener = new Client({ connectionString: process.env.DATABASE_URL });
await listener.connect();
await listener.query("LISTEN order_events");
listener.on("notification", (msg) => {
  const payload = JSON.parse(msg.payload ?? "{}");
  broadcast(payload);
});

// publisher (inside a transaction or trigger)
await pg.query(\`
  select pg_notify('order_events', $1::text)
\`, [JSON.stringify({ orderId: 123, status: "paid" })]);`}
      />
      <p className="mb-6 leading-relaxed">
        For simple cases, a queue worker or a WebSocket server pairs with
        LISTEN/NOTIFY to push updates to the browser. For strict delivery
        guarantees at scale, a proper message bus is still the right call. For
        &quot;tell the admin when a new order comes in,&quot; this is plenty.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        pgmq: a queue inside your database
      </h2>
      <p className="mb-6 leading-relaxed">
        pgmq is a newer extension that gives you a real message queue inside
        Postgres. Durable queues, visibility timeouts, archiving. It is not SQS,
        but for most in-app job queues it covers the requirements.
      </p>
      <CodeBlock
        language="typescript"
        filename="db/pgmq.sql"
        code={`create extension if not exists pgmq;

-- create a queue
select pgmq.create('email_jobs');

-- producer: enqueue a job
select pgmq.send(
  'email_jobs',
  '{"to": "user@example.com", "template": "welcome"}'::jsonb
);

-- consumer: read with a 30-second visibility timeout
select msg_id, message
from pgmq.read('email_jobs', 30, 10);

-- acknowledge after handling
select pgmq.delete('email_jobs', 42);`}
      />
      <p className="mb-6 leading-relaxed">
        A queue consumer in Next.js can be a cron-triggered function that reads
        and processes messages. Paired with pg_cron, you never leave Postgres.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        When Postgres is not enough
      </h2>
      <p className="mb-4 leading-relaxed">
        Honest caveats. Reach for specialized tools when:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          You need global sub-50ms latency. Postgres is single-region by
          default.
        </li>
        <li>
          You have hundreds of millions of vectors at tight latency targets. A
          proper vector DB wins.
        </li>
        <li>
          Your search needs typo tolerance and personalization across a large
          catalog. Algolia earns its price.
        </li>
        <li>
          You need guaranteed exactly-once message delivery across services. A
          real broker is clearer.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Most teams never reach those limits. The ones that do usually start by
        scaling Postgres for another two years before switching.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The integration looks like this
      </h2>
      <p className="mb-6 leading-relaxed">
        In Next.js, all of this is one connection pool. Server actions or route
        handlers run SQL. No separate SDKs, no separate clients, no separate
        authentication.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/actions/search.ts"
        code={`"use server";
import { sql } from "@/lib/db";
import { embedQuery } from "@/lib/openai";

export async function search(query: string) {
  const embedding = await embedQuery(query);

  const results = await sql\`
    select id, name, ts_rank(search_vec, query) as text_rank,
      1 - (embedding <=> \${JSON.stringify(embedding)}::vector) as vector_rank
    from products, plainto_tsquery('english', \${query}) query
    where search_vec @@ query or embedding <=> \${JSON.stringify(embedding)}::vector < 0.5
    order by (ts_rank(search_vec, query) +
              (1 - (embedding <=> \${JSON.stringify(embedding)}::vector))) desc
    limit 20
  \`;

  return results;
}`}
      />
      <p className="mb-6 leading-relaxed">
        One connection pool, one place to monitor, one set of backups. The
        architecture diagram with twelve boxes becomes one box.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Start here
      </h2>
      <p className="mb-6 leading-relaxed">
        If you are spinning up a new Next.js app, start on Postgres with
        pgvector enabled. Add pg_cron and pg_trgm when you actually need them.
        You can always introduce a specialized service later, but the burden is
        on that service to prove it is worth a second system.
      </p>
      <p className="mb-6 leading-relaxed">
        We have helped clients collapse multi-service backends down to a single
        Postgres. If that is the direction you are going,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          we would be glad to look at your stack
        </a>
        .
      </p>
    </div>
  );
}
