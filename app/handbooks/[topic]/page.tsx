import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LuArrowRight } from "react-icons/lu";
import { handbooksNav, getTopicNav } from "@/lib/handbooks";

export async function generateStaticParams() {
  return handbooksNav.map((topic) => ({ topic: topic.topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const nav = getTopicNav(topic);
  if (!nav) {
    return { title: "Handbook Not Found" };
  }
  return {
    title: nav.handbookName,
    description: nav.description,
    alternates: { canonical: `/handbooks/${topic}` },
    openGraph: {
      title: `${nav.handbookName} | Reactify Solutions Handbooks`,
      description: nav.description,
      url: `/handbooks/${topic}`,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function TopicLandingPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const nav = getTopicNav(topic);

  if (!nav) {
    notFound();
  }

  const firstPage = nav.pages[0]?.pages[0];

  return (
    <main className="min-w-0 py-10 lg:py-14">
      <div className="mb-4 flex items-center gap-2 text-[12.5px] text-textFaint">
        <Link href="/handbooks" className="hover:text-textSecondary">
          Handbooks
        </Link>
        <span>/</span>
        <span className="text-textSecondary">{nav.handbookName}</span>
      </div>

      <h1 className="font-display mb-5 max-w-[720px] text-3xl font-semibold leading-[1.1] text-white sm:text-4xl md:text-[44px]">
        {nav.headline.lead}{" "}
        <span className="text-gradient-accent">{nav.headline.highlight}</span>.
      </h1>

      <p className="mb-9 max-w-[600px] text-lg leading-relaxed text-textSecondary">
        {nav.description}
        {nav.introSuffix ? ` ${nav.introSuffix}` : null}
      </p>

      {firstPage && (
        <div className="mb-14">
          <Link
            href={`/handbooks/${topic}/${firstPage.slug}`}
            className="inline-flex h-[46px] items-center gap-2 rounded-[11px] bg-primaryColor px-6 font-semibold text-accentContrast shadow-glow transition-colors hover:bg-primaryDark"
          >
            Start here
            <LuArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {nav.pages.map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-3.5 rounded-2xl border border-darkBorder bg-darkSurface/50 p-6"
          >
            <h2 className="font-display text-lg font-semibold text-white">
              {section.title}
            </h2>
            <div className="flex flex-col gap-2">
              {section.pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/handbooks/${topic}/${page.slug}`}
                  className="text-[13.5px] text-textSecondary hover:text-primaryColor"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-darkBorder bg-handbookCodeBg px-6 py-5 sm:flex-row sm:items-center">
        <span className="flex-shrink-0 font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
          In one sentence
        </span>
        <span className="hidden h-[30px] w-px flex-shrink-0 bg-darkBorder sm:block" />
        <p className="m-0 text-[15px] leading-relaxed text-textSecondary">
          {nav.inOneSentence.lead}{" "}
          <strong className="font-semibold text-white">
            {nav.inOneSentence.emphasis}
          </strong>
        </p>
      </div>
    </main>
  );
}
