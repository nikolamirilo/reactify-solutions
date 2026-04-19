import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 3,
  slug: "rag-nextjs-langchain-vercel-ai-sdk",
  title:
    "Building production RAG systems with Next.js, LangChain, and the Vercel AI SDK",
  excerpt:
    "A practical architecture for shipping RAG-powered features in Next.js. Ingestion with LangChain, retrieval with pgvector, streaming with the Vercel AI SDK, and the tradeoffs that actually matter.",
  metaDescription:
    "End-to-end guide toblog-ing production Retrieval-Augmented Generation (RAG) systems using Next.js App Router, LangChain, Vercel AI SDK, and pgvector. Architecture, code patterns, and evaluation.",
  image: "/images/blogs/blog-01.webp",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["AI", "RAG", "Next.js", "LangChain"],
  publishDate: "2026-04-19",
  readingTime: "12 min read",
};

export default function RagNextjsLangchainVercelAiSdkPost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        &quot;Just add ChatGPT to your docs&quot; has become shorthand for a
        whole family of features: internal knowledge search, customer support
        bots, technical assistants. Most of them are actually RAG systems.
        Getting a prototype running is easy. Getting one that answers correctly,
        consistently, and cheaply in production is where most teams get stuck.
        This post is the stack we would use today to build that for a client,
        with code-shaped explanations rather than a full repo walkthrough.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        When RAG is the right tool
      </h2>
      <p className="mb-6 leading-relaxed">
        Before you build one, be honest about whether you need it. RAG is the
        right choice when:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Your knowledge changes frequently, like docs, tickets, or policies.
        </li>
        <li>
          You need provenance, meaning you can show which source the answer came
          from.
        </li>
        <li>
          The corpus is too big to fit in a single prompt. Even with a 1M
          context window, you still pay for every token.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        If your corpus is small and stable, stuff it into the system prompt and
        use prompt caching. If it is huge but you only care about one domain,
        fine-tuning might be cheaper per query. RAG wins when the corpus is both
        large and churning.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The stack
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Next.js App Router.</strong> Server actions for ingestion,
          route handlers for chat.
        </li>
        <li>
          <strong>LangChain (JS).</strong> Document loaders, chunkers, and
          retrievers. We use LangChain for the ingestion pipeline, not for the
          chat loop.
        </li>
        <li>
          <strong>Vercel AI SDK.</strong> Streaming, structured outputs, and a
          clean hook for the UI. This is what renders tokens to the user.
        </li>
        <li>
          <strong>pgvector on Postgres.</strong> Vector store. Cheaper and
          simpler than a dedicated vector DB for most use cases.
        </li>
        <li>
          <strong>OpenAI or Anthropic</strong> for embeddings and generation.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Splitting responsibilities this way is intentional. LangChain is great
        at ingestion orchestration. The Vercel AI SDK is great at streaming and
        UI integration. Combining them avoids the biggest pain points of each.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Ingestion: document to chunks to embeddings to pgvector
      </h2>
      <CodeBlock
        language="typescript"
        filename="app/actions/ingest.ts"
        code={`"use server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { sql } from "@/lib/db";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 800,
  chunkOverlap: 120,
});

const embedder = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

export async function ingest(docId: string, text: string) {
  const chunks = await splitter.splitText(text);
  const vectors = await embedder.embedDocuments(chunks);
  for (let i = 0; i < chunks.length; i++) {
    await sql\`
      insert into doc_chunks (doc_id, chunk_index, content, embedding)
      values (\${docId}, \${i}, \${chunks[i]}, \${JSON.stringify(vectors[i])}::vector)
    \`;
  }
}`}
      />
      <p className="mb-6 leading-relaxed">
        Three things are load-bearing here.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Chunk size 600 to 1000 tokens, 10 to 20% overlap.</strong>{" "}
          Bigger chunks lose precision in retrieval. Smaller chunks lose
          context. This range works for most prose.
        </li>
        <li>
          <strong>Store the source metadata.</strong> Title, URL, section
          heading. Whatever you will want to show the user as a citation.
        </li>
        <li>
          <strong>Idempotency.</strong> Re-ingesting should update, not
          duplicate. Delete-then-insert by <code>doc_id</code> is simpler than a
          full diff.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Retrieval: similarity and filtering
      </h2>
      <CodeBlock
        language="typescript"
        filename="lib/retrieve.ts"
        code={`export async function retrieve(query: string, k = 6) {
  const [queryVec] = await embedder.embedDocuments([query]);
  const rows = await sql\`
    select content, doc_id, 1 - (embedding <=> \${JSON.stringify(queryVec)}::vector) as score
    from doc_chunks
    order by embedding <=> \${JSON.stringify(queryVec)}::vector
    limit \${k}
  \`;
  return rows.filter((r) => r.score > 0.3);
}`}
      />
      <p className="mb-6 leading-relaxed">
        A few retrieval tricks that repeatedly helped us:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Score threshold, not just top-k.</strong> If nothing clears
          the bar, tell the user you do not know. That is better than
          hallucinating on bad matches.
        </li>
        <li>
          <strong>Hybrid search.</strong> Combine vector similarity with
          Postgres full-text (<code>ts_rank</code>) for keyword-heavy queries
          like error codes or proper names.
        </li>
        <li>
          <strong>Rerank the top 20.</strong> A cheap cross-encoder reranker, or
          a small LLM call, on the top 20 vector hits boosts answer quality more
          than any prompt tweak.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Generation: streaming with the Vercel AI SDK
      </h2>
      <CodeBlock
        language="typescript"
        filename="app/api/chat/route.ts"
        code={`import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { retrieve } from "@/lib/retrieve";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const latest = messages[messages.length - 1].content;
  const hits = await retrieve(latest);

  const context = hits.map((h, i) =>
    \`[\${i + 1}] \${h.content}\`
  ).join("\\n\\n");

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: \`Answer using only the context below. Cite sources as [n].
Context:
\${context}\`,
    messages,
  });

  return result.toDataStreamResponse();
}`}
      />
      <p className="mb-6 leading-relaxed">
        On the client, <code>useChat</code> from <code>ai/react</code> gives you
        streaming tokens and message state with one hook. That is the pair we
        reach for every time.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Evaluation, the step most teams skip
      </h2>
      <p className="mb-6 leading-relaxed">
        A RAG system is only as good as its test set. Build a golden set of 50
        to 100 questions with known-good answers, and run it every time you
        change the prompt, the chunker, or the retrieval strategy. Three metrics
        are enough to start.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Retrieval hit rate.</strong> Did the right chunk appear in the
          top k?
        </li>
        <li>
          <strong>Faithfulness.</strong> Does the answer only use retrieved
          content? Grade it with another LLM call.
        </li>
        <li>
          <strong>Answer quality.</strong> Human-rated on a small sample, or
          LLM-as-judge on a larger one.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Things that bit us
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Token budgets creep.</strong> Six chunks of 800 tokens plus a
          system prompt and the conversation history adds up fast. Budget early.
        </li>
        <li>
          <strong>Streaming with edge functions.</strong> Works great until you
          need long generation with connection retries. It is worth running the
          route handler as Node, not edge, for anything beyond 30 seconds.
        </li>
        <li>
          <strong>pgvector indexes.</strong> Without an HNSW index, queries
          degrade linearly. Add the index after your initial load, not before.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Ship small, measure, iterate
      </h2>
      <p className="mb-6 leading-relaxed">
        The teams we have seen succeed with RAG all did the same thing. They
        shipped a thin version to a small group, measured retrieval and answer
        quality every week, and tightened one knob at a time. The ones that
        stalled spent six weeks on a generic framework before any real users
        touched it.
      </p>
      <p className="mb-6 leading-relaxed">
        If you are planning to build a RAG feature and want a second pair of
        eyes on the architecture, cost model, or evaluation strategy,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          reach out
        </a>
        .
      </p>
    </div>
  );
}
