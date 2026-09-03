import { notFound } from "next/navigation";
import { Metadata } from "next";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  docExists,
  getAllDocRefs,
  getAdjacentDocs,
  getDocBody,
  getDocHeadings,
  getDocMeta,
  getTopicNav,
} from "@/lib/docs";
import { mdxComponents } from "@/components/Docs/MdxComponents";
import DocsBreadcrumb from "@/components/Docs/DocsBreadcrumb";
import DocsToc from "@/components/Docs/DocsToc";
import DocsPager from "@/components/Docs/DocsPager";
import VerifiedFooter from "@/components/Docs/VerifiedFooter";

export async function generateStaticParams() {
  return getAllDocRefs().map((ref) => ({ topic: ref.topic, slug: ref.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}): Promise<Metadata> {
  const { topic, slug } = await params;
  if (!docExists(topic, slug)) {
    return { title: "Page Not Found" };
  }
  const meta = getDocMeta(topic, slug);
  const url = `/docs/${topic}/${slug}`;
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

export default async function DocPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic, slug } = await params;

  if (!docExists(topic, slug)) {
    notFound();
  }

  const nav = getTopicNav(topic)!;
  const meta = getDocMeta(topic, slug);
  const headings = getDocHeadings(topic, slug);
  const body = getDocBody(topic, slug);
  const { prev, next } = getAdjacentDocs(topic, slug);

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
        mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/docs/${topic}/${slug}` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Docs", item: `${baseUrl}/docs` },
          { "@type": "ListItem", position: 2, name: nav.label, item: `${baseUrl}/docs/${topic}` },
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
        <DocsBreadcrumb nav={nav} currentLabel={meta.label} />

        <h1 className="docs-h1">{meta.title}</h1>
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
        <DocsPager topic={topic} prev={prev} next={next} />
      </main>

      <aside className="hidden py-10 xl:block">
        <div className="sticky top-[92px]">
          <DocsToc headings={headings} />
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
