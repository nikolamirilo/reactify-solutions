import CodeBlock from "@/components/Blogs/CodeBlock";
import { Blog } from "@/types";

export const meta: Blog = {
  id: 5,
  slug: "nextjs-seo-checklist-2026",
  title: "The Next.js SEO checklist for 2026: what actually matters",
  excerpt:
    "An opinionated, practical SEO checklist for Next.js apps. Skip the 200-item audits. This is the 10% of work that delivers 90% of the results for modern sites.",
  metaDescription:
    "A practical SEO checklist for Next.js 16 applications in 2026. Metadata API, structured data, canonical URLs, Core Web Vitals, and common mistakes to avoid.",
  image: "/images/blogs/blog-03.png",
  author: {
    name: "Reactify Solutions",
    image: "/icon.png",
    designation: "Engineering Team",
  },
  tags: ["SEO", "Next.js", "Best Practices"],
  publishDate: "2026-04-19",
  readingTime: "10 min read",
};

export default function NextjsSeoChecklist2026Post() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none text-textColor dark:text-white/80">
      <p className="mb-6 text-lg leading-relaxed">
        Most SEO audits produce 200-item checklists that nobody ever finishes.
        This is not that. This is the 10% of the work that delivers 90% of the
        results for a typical Next.js site in 2026, in the order we would
        actually do it on a real project.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        1. Nail the Metadata API on every route
      </h2>
      <p className="mb-4 leading-relaxed">
        Every <code>page.tsx</code> should export either <code>metadata</code>{" "}
        or <code>generateMetadata</code> with at minimum:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>title.</strong> Unique per page, 50 to 60 characters.
        </li>
        <li>
          <strong>description.</strong> Unique per page, 150 to 160 characters,
          sells the page, not the company.
        </li>
        <li>
          <strong>alternates.canonical.</strong> Prevents duplicate-content
          penalties when URLs pick up UTM parameters.
        </li>
        <li>
          <strong>openGraph</strong> and <strong>twitter.</strong> Title,
          description, image. Without these, your links look terrible in
          WhatsApp, Slack, and LinkedIn.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Set a <code>metadataBase</code> URL in the root layout so every relative
        URL resolves correctly. Use the <code>title.template</code> option so
        page titles get a consistent suffix without repeating it.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        2. sitemap.ts and robots.ts, do not skip these
      </h2>
      <p className="mb-6 leading-relaxed">
        Next.js App Router lets you generate both from code. A dynamic sitemap
        that enumerates your blog posts, product pages, or solution pages gets
        them discovered days faster than a static XML file you forgot to update.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/sitemap.ts"
        code={`export default async function sitemap() {
  const posts = await getAllPosts();
  return [
    { url: "https://example.com", priority: 1 },
    ...posts.map((p) => ({
      url: \`https://example.com/blogs/\${p.slug}\`,
      lastModified: new Date(p.publishDate),
      priority: 0.7,
    })),
  ];
}`}
      />
      <p className="mb-6 leading-relaxed">
        In <code>robots.ts</code>, disallow paths like <code>/signin</code>,{" "}
        <code>/api</code>, and preview routes. Allow everything else.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        3. Structured data for the things that matter
      </h2>
      <p className="mb-4 leading-relaxed">
        JSON-LD <code>@graph</code> in your root layout for{" "}
        <code>Organization</code> and <code>WebSite</code>. Then, per page type,
        add whichever schema actually describes your content.
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>BlogPosting</strong> on blog detail pages, with{" "}
          <code>datePublished</code>, <code>author</code>, and{" "}
          <code>image</code>.
        </li>
        <li>
          <strong>Product</strong> or <strong>SoftwareApplication</strong> for
          product pages.
        </li>
        <li>
          <strong>BreadcrumbList</strong> on anything nested. It feeds
          Google&apos;s breadcrumb rich result.
        </li>
        <li>
          <strong>FAQPage</strong> if you have real FAQs. This one still
          triggers rich results for a lot of queries.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Test everything in Google&apos;s Rich Results Test before shipping.
        Invalid schema is worse than no schema.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        4. Core Web Vitals, the cheap wins first
      </h2>
      <p className="mb-4 leading-relaxed">
        Core Web Vitals are a ranking signal. The wins that matter for a typical
        Next.js site:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>next/image everywhere.</strong> Set <code>priority</code> on
          the LCP image, set explicit <code>width</code> and <code>height</code>
          , and let Next serve AVIF or WebP.
        </li>
        <li>
          <strong>next/font for all web fonts.</strong> Self-hosted, with{" "}
          <code>display: swap</code>. Kills the flash of unstyled text and cuts
          layout shift.
        </li>
        <li>
          <strong>Preload the LCP image</strong> if it is from a remote host
          that Next cannot serve through its own image pipeline.
        </li>
        <li>
          <strong>Dynamic import heavy client components.</strong> Calendars,
          chart libs, code editors. Do not ship them in the initial bundle.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        Measure in production, not locally. Use PageSpeed Insights on real URLs
        and check the Chrome UX Report (CrUX) data. That is what Google actually
        uses.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        5. generateStaticParams and generateMetadata on dynamic routes
      </h2>
      <p className="mb-6 leading-relaxed">
        For any dynamic route with a known finite set of pages (blog posts,
        products, solutions, categories), add <code>generateStaticParams</code>{" "}
        so they pre-render at build time. You get faster TTFB, cheaper serving,
        and Google crawls them as true static pages.
      </p>
      <CodeBlock
        language="tsx"
        filename="app/blogs/[slug]/page.tsx"
        code={`export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: \`/blogs/\${post.slug}\` },
    openGraph: { /* ... */ },
  };
}`}
      />

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        6. Internal linking is still king
      </h2>
      <p className="mb-6 leading-relaxed">
        The single highest-impact activity in technical SEO is still internal
        linking. Blog posts should link to product pages and other posts.
        Product pages should link to supporting content. Your homepage should
        link to your money pages with descriptive anchor text, not &quot;click
        here.&quot;
      </p>
      <p className="mb-6 leading-relaxed">
        Use <code>next/link</code>, not raw anchor tags with{" "}
        <code>window.location</code>, so Next pre-fetches and Google sees the
        link graph clearly.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        7. Analytics and Search Console from day one
      </h2>
      <p className="mb-6 leading-relaxed">
        You cannot improve what you do not measure. On day one of a new site:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          Google Search Console. Verify with a DNS TXT record, submit the
          sitemap, set up email alerts for coverage issues.
        </li>
        <li>
          GA4 or a privacy-respecting alternative like Plausible, Umami, or
          PostHog.
        </li>
        <li>
          An uptime monitor. Downtime during crawl windows hurts rankings.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        8. Common mistakes we still see in 2026
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-6">
        <li>
          <strong>&quot;image&quot; or &quot;logo&quot; as alt text.</strong>{" "}
          Every image needs descriptive, keyword-informed alt text.
        </li>
        <li>
          <strong>h1 on every section.</strong> One h1 per page, then h2, h3 in
          semantic order.
        </li>
        <li>
          <strong>Catch-all robots.txt disallow.</strong> A missing file is
          better than a typo that blocks the whole site.
        </li>
        <li>
          <strong>Infinite-scroll pagination without URL state.</strong> Google
          cannot crawl page 2 if page 2 does not have a URL.
        </li>
        <li>
          <strong>Parameter-based canonicalization.</strong>{" "}
          <code>?utm_source=</code> variants should canonicalize to the
          parameter-free URL.
        </li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold text-black dark:text-white">
        The real unlock: content
      </h2>
      <p className="mb-6 leading-relaxed">
        Technical SEO gets you to a fair starting line. It does not rank pages
        that do not deserve to rank. After the checklist above, the
        highest-impact work is publishing genuinely useful content on topics you
        know better than anyone else, preferably backed by numbers from your own
        product or client work.
      </p>
      <p className="mb-6 leading-relaxed">
        If you want a second opinion on a Next.js site&apos;s SEO foundation, or
        help scaling up a content program without churning out thin AI slop,{" "}
        <a
          href="/contact"
          className="font-semibold text-primaryColor hover:underline"
        >
          we would love to talk
        </a>
        .
      </p>
    </div>
  );
}
