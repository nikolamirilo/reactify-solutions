import { getAllPostSlugs, getPostBySlug } from "@/content/blogs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import CTA from "@/components/CTA/CTA";
import ReadingProgress from "@/components/Common/ReadingProgress";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPostBySlug(slug);

  if (!entry) {
    return { title: "Post Not Found" };
  }

  const { meta } = entry;
  return {
    title: meta.title,
    description: meta.metaDescription,
    alternates: { canonical: `/blogs/${meta.slug}` },
    openGraph: {
      title: meta.title,
      description: meta.metaDescription,
      url: `/blogs/${meta.slug}`,
      type: "article",
      publishedTime: meta.publishDate,
      authors: [meta.author.name],
      tags: meta.tags,
      images: [meta.image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.metaDescription,
      images: [meta.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPostBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { meta, Component } = entry;
  const baseUrl = "https://www.reactify-solutions.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: meta.title,
        description: meta.metaDescription,
        image: `${baseUrl}${meta.image}`,
        datePublished: meta.publishDate,
        dateModified: meta.publishDate,
        author: {
          "@type": "Organization",
          name: meta.author.name,
          url: baseUrl,
        },
        publisher: { "@id": `${baseUrl}/#organization` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/blogs/${meta.slug}`,
        },
        keywords: meta.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${baseUrl}/blogs`,
          },
          { "@type": "ListItem", position: 3, name: meta.title },
        ],
      },
    ],
  };

  const publishedLabel = new Date(meta.publishDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pb-12 pt-[120px] lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-9/12 xl:w-8/12">
              <article>
                <header className="mb-10">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primaryColor/10 px-3 py-1 text-xs font-semibold text-primaryColor"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl">
                    {meta.title}
                  </h1>
                  <p className="mb-6 text-lg leading-relaxed text-textColor dark:text-white/70">
                    {meta.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-textColor dark:text-white/60">
                    <span>By {meta.author.name}</span>
                    <span aria-hidden>•</span>
                    <time dateTime={meta.publishDate}>{publishedLabel}</time>
                    {meta.readingTime && (
                      <>
                        <span aria-hidden>•</span>
                        <span>{meta.readingTime}</span>
                      </>
                    )}
                  </div>
                </header>

                <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={meta.image}
                    alt={meta.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <Component />

              </article>

            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
