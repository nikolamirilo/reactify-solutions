import { Blog } from "@/types";

export const meta: Blog = {
  id: 1,
  slug: "quicktalog-building-ai-catalog",
  title:
    "How we built Quicktalog: OCR and GPT for turning paper menus into digital catalogs in 30 seconds",
  excerpt:
    "A technical walkthrough of how we combined Tesseract OCR with OpenAI to let small businesses digitize a printed menu in under a minute, and what we learned along the way.",
  metaDescription:
    "A close look at Quicktalog's architecture: the Tesseract OCR pipeline, the OpenAI structuring prompt, and the engineering choices that cut catalog creation from hours to 30 seconds.",
  image: "/images/solutions/quicktalog/quicktalog-banner.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["Quicktalog", "AI", "OCR", "Case Study"],
  publishDate: "2026-04-19",
  readingTime: "8 min read",
};

export default function QuicktalogBuildingAiCatalogPost() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        When we started building{" "}
        <a
          href="https://www.quicktalog.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primaryColor hover:underline"
        >
          Quicktalog
        </a>
        , we had a simple thesis. Most small and mid-sized businesses still run
        their catalog on paper or a PDF, and every update means a reprint. We
        wanted to cut the time from having a printed menu to having a
        shareable digital catalog down to under a minute. Today, 1,400+
        businesses have created 400+ catalogs that have been viewed over
        100,000 times. Here is how the technical pieces fit together.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The problem, concretely
      </h2>
      <p className="mb-4 leading-relaxed">
        A typical restaurant or retail shop we talked to had:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>A printed menu or price list, often a scanned PDF.</li>
        <li>
          No desire to type every product into a form. That alone was a
          showstopper.
        </li>
        <li>
          No analytics, so they could not tell which items customers actually
          looked at.
        </li>
        <li>
          A reliance on WhatsApp and Instagram DMs for sharing, so the output
          had to be a link, not an app install.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        The data-entry friction was the real blocker. If we could remove it,
        the rest was a solved problem.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The pipeline
      </h2>
      <p className="mb-6 leading-relaxed">
        At a high level, uploading a photo or PDF of a menu runs through four
        stages.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          <strong>Preprocessing.</strong> Deskew, contrast boost, and
          binarization so Tesseract has a clean input.
        </li>
        <li>
          <strong>OCR.</strong> Tesseract extracts raw text regions with
          positional hints.
        </li>
        <li>
          <strong>LLM structuring.</strong> GPT turns raw text into{" "}
          <code className="rounded bg-primaryColor/10 px-1.5 py-0.5 text-sm">
            {"{ name, description, price, category }"}
          </code>{" "}
          objects.
        </li>
        <li>
          <strong>Catalog assembly.</strong> Structured data flows into the
          catalog builder, with images stored in S3.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Why Tesseract over a cloud OCR API
      </h2>
      <p className="mb-6 leading-relaxed">
        We looked at Google Cloud Vision and AWS Textract early on. Both are
        excellent on accuracy, but the per-document pricing added up fast for
        a price-sensitive product aimed at small businesses. Tesseract running
        on our own infrastructure gave us acceptable accuracy after
        preprocessing, at zero marginal cost.
      </p>
      <p className="mb-6 leading-relaxed">
        The trick was the preprocessing step. A raw phone photo of a menu,
        with glare, a slight tilt, and uneven lighting, is unusable for
        Tesseract. After rotating, normalizing contrast, and thresholding, we
        saw accuracy jump from roughly 60% usable to 90%+ on real user
        uploads.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Making GPT the structuring layer, not the OCR layer
      </h2>
      <p className="mb-6 leading-relaxed">
        A tempting shortcut is to send the raw image straight to a vision
        model and skip OCR entirely. We tried it. It works, but there are
        three problems.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>Latency is 3 to 5 times higher per image.</li>
        <li>Cost is 10 to 20 times higher per document.</li>
        <li>
          You cannot cache or regenerate structure without re-running the
          vision pass.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Splitting the concerns, deterministic OCR first and then an LLM to
        structure the text, gave us a cheaper, faster, more debuggable
        pipeline. The OCR output is cached. Only the structuring step re-runs
        when we tune the prompt.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Prompt design for consistent JSON
      </h2>
      <p className="mb-6 leading-relaxed">
        The structuring prompt is simple but hardened. Three things made the
        biggest difference.
      </p>
      <ol className="mb-6 list-decimal space-y-2 pl-6">
        <li>
          <strong>Enforce a schema.</strong> We use OpenAI&apos;s structured
          output mode with a strict JSON schema, so the model cannot
          hallucinate extra fields.
        </li>
        <li>
          <strong>Examples in the prompt.</strong> Three or four few-shot
          examples of messy OCR input paired with clean structured output.
        </li>
        <li>
          <strong>Validate and retry once.</strong> If parsing fails, we retry
          with a repair prompt that includes the parse error. One retry is
          enough 99% of the time.
        </li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The stack
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>Next.js and TypeScript</strong> on Vercel for the builder
          and catalog viewer.
        </li>
        <li>
          <strong>PostgreSQL</strong> for structured catalog data and
          engagement analytics.
        </li>
        <li>
          <strong>AWS S3</strong> for uploaded and generated product images.
        </li>
        <li>
          <strong>Tesseract</strong> in a worker process for OCR.
        </li>
        <li>
          <strong>OpenAI API</strong> for structuring and product description
          generation.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        What we learned
      </h2>
      <p className="mb-4 leading-relaxed">Three things stand out.</p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>AI is a last-mile tool, not the whole pipeline.</strong> The
          most valuable wins came from preprocessing and caching, not from a
          bigger model.
        </li>
        <li>
          <strong>Small businesses want links, not apps.</strong> Every feature
          that depended on an app install died. Every feature that worked in a
          WhatsApp share took off.
        </li>
        <li>
          <strong>Analytics convert.</strong> Showing a business owner that
          their top product got 312 views last week changed the conversation
          from &quot;is this worth it&quot; to &quot;how do I get more
          traffic.&quot;
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        Want to build something similar?
      </h2>
      <p className="mb-6 leading-relaxed">
        We build products like Quicktalog for ourselves, and as Reactify
        Solutions for clients. If you are thinking about an AI-powered product
        with real data entry friction to remove, we would love to compare
        notes.
      </p>
      <p className="mb-6 leading-relaxed">
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          Get in touch
        </a>
      </p>
    </div>
  );
}
