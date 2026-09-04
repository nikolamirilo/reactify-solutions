import { notFound } from "next/navigation";
import { Metadata } from "next";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  handbookPageExists,
  getAllHandbookRefs,
  getAdjacentPages,
  getHandbookBody,
  getHandbookHeadings,
  getHandbookMeta,
  getTopicNav,
} from "@/lib/handbooks";
import { mdxComponents } from "@/components/Handbook/MdxComponents";
import HandbookBreadcrumb from "@/components/Handbook/HandbookBreadcrumb";
import HandbookToc from "@/components/Handbook/HandbookToc";
import HandbookPager from "@/components/Handbook/HandbookPager";
import VerifiedFooter from "@/components/Handbook/VerifiedFooter";

export async function generateStaticParams() {
  return getAllHandbookRefs().map((ref) => ({ topic: ref.topic, slug: ref.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}): Promise<Metadata> {
  const { topic, slug } = await params;
  if (!handbookPageExists(topic, slug)) {
    return { title: "Page Not Found" };
  }
  const meta = getHandbookMeta(topic, slug);
  const url = `/handbooks/${topic}/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function HandbookPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;

  if (!handbookPageExists(topic, slug)) {
    notFound();
  }

  const nav = getTopicNav(topic)!;
  const meta = getHandbookMeta(topic, slug);
  const headings = getHandbookHeadings(topic, slug);
  const body = getHandbookBody(topic, slug);
  const { prev, next } = getAdjacentPages(topic, slug);

  // Compiled directly with @mdx-js/mdx's evaluate(), passing our own
  // react/jsx-runtime import, rather than next-mdx-remote's compileMDX —
  // its bundled runtime shim resolves to a second copy of react/jsx-runtime
  // under Next 16, which React's RSC serializer rejects at build time
  // ("A React Element from an older version of React was rendered").
  const { default: MDXContent } = await evaluate(body, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });

  const baseUrl = "https://www.reactify-solutions.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: meta.title,
        description: meta.description,
        dateModified: meta.lastReviewed,
        author: { "@type": "Organization", name: "Reactify Solutions", url: baseUrl },
        publisher: { "@id": `${baseUrl}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/handbooks/${topic}/${slug}` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Handbooks", item: `${baseUrl}/handbooks` },
          { "@type": "ListItem", position: 2, name: nav.label, item: `${baseUrl}/handbooks/${topic}` },
          { "@type": "ListItem", position: 3, name: meta.title },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-w-0 py-8 lg:py-10">
        <HandbookBreadcrumb nav={nav} currentLabel={meta.label} />

        <h1 className="handbook-h1">{meta.title}</h1>
        <p className="mb-4 max-w-[42rem] text-[17px] leading-relaxed text-textSecondary sm:text-[18px]">
          {meta.description}
        </p>

        <div className="mb-9 flex flex-wrap items-center gap-2.5">
          {meta.appliesTo && (
            <span className="rounded-md border border-primaryColor/22 bg-primaryColor/[0.08] px-2 py-[3px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-primaryColor">
              {meta.appliesTo}
            </span>
          )}
          <span className="font-mono text-[11px] text-textFaint">
            Last reviewed {formatDate(meta.lastReviewed)}
          </span>
        </div>

        <MDXContent components={mdxComponents} />

        <VerifiedFooter meta={meta} />
        <HandbookPager topic={topic} prev={prev} next={next} />
      </main>

      <aside className="hidden py-10 xl:block">
        <div className="sticky top-[92px]">
          <HandbookToc headings={headings} />
        </div>
      </aside>
    </>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
