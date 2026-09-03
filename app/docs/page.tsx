import Link from "next/link";
import { Metadata } from "next";
import { LuArrowRight, LuBox } from "react-icons/lu";
import { docsNav } from "@/lib/docs";
import { openDocsSearch } from "@/components/Docs/DocsSearch";
import Image from "@/components/Common/Image";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Practical, plain-language documentation from Reactify Solutions, organized into modules. Claude Code is the first one. Free, no signup.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs | Reactify Solutions",
    description:
      "Practical, plain-language documentation from Reactify Solutions, organized into modules. Claude Code is the first one.",
    url: "/docs",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs | Reactify Solutions",
    description: "Practical documentation, organized into modules. Free, no signup.",
  },
};

function countPages(topic: (typeof docsNav)[number]): number {
  return topic.pages.reduce((total, section) => total + section.pages.length, 0);
}

export default function DocsIndexPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[560px] radial-fade-top" />
      <div className="bg-grid-faint pointer-events-none absolute inset-0 z-[-1] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <header className="sticky top-0 z-40 flex h-[72px] items-center gap-8 border-b border-darkBorder/70 bg-dark/85 px-4 backdrop-blur-md sm:px-6 lg:px-10">
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo/logo.png" alt="Reactify Solutions" width={110} height={28} />
          </Link>
          <span className="hidden h-[18px] w-px bg-darkBorderStrong sm:block" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-primaryColor sm:block">
            docs
          </span>
        </div>
        <div className="flex flex-grow justify-center">
          <button
            type="button"
            onClick={openDocsSearch}
            className="flex h-9 w-full max-w-[400px] items-center gap-2.5 rounded-lg border border-darkBorder bg-darkSurface px-3 text-left text-[13px] text-textFaint"
          >
            Search the docs
            <span className="ml-auto hidden gap-[3px] sm:flex">
              <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[5px] py-[2px] font-mono text-[10px] leading-none text-textColor">
                ⌘
              </kbd>
              <kbd className="rounded border border-darkBorderStrong bg-darkElevated px-[5px] py-[2px] font-mono text-[10px] leading-none text-textColor">
                K
              </kbd>
            </span>
          </button>
        </div>
        <Link
          href="/contact"
          className="hidden h-9 flex-shrink-0 items-center rounded-lg bg-primaryColor px-4 font-semibold text-accentContrast shadow-glowSoft transition-colors hover:bg-primaryDark sm:flex"
        >
          Reach Out
        </Link>
      </header>

      <div className="container py-16 lg:py-20">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accentGreen shadow-[0_0_8px_rgba(74,222,128,0.85)]" />
          open resource · free forever
        </span>

        <h1 className="font-display mb-5 max-w-[760px] text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-[52px]">
          Documentation, in <span className="text-gradient-accent">plain language</span>.
        </h1>

        <p className="mb-14 max-w-[620px] text-lg leading-relaxed text-textSecondary">
          We write these guides for ourselves first, so each one is short, honest about
          what we are still figuring out, and built around a working example rather
          than a wall of theory. They are grouped into modules below. Pick one to begin.
        </p>

        <div className="flex flex-wrap gap-5">
          {docsNav.map((topic) => {
            const pageCount = countPages(topic);
            return (
              <Link
                key={topic.topic}
                href={`/docs/${topic.topic}`}
                className="group flex w-full flex-col gap-4 rounded-2xl border border-darkBorder bg-darkSurface/50 p-7 transition-colors hover:border-primaryColor/30 sm:w-[360px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primaryColor/20 bg-primaryColor/10 text-primaryColor">
                    <LuBox className="h-5 w-5" />
                  </div>
                  <LuArrowRight className="h-4 w-4 text-textFaint transition-transform group-hover:translate-x-1 group-hover:text-primaryColor" />
                </div>
                <div>
                  <h2 className="font-display mb-1.5 text-xl font-semibold text-white">
                    {topic.moduleName}
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-textSecondary">
                    {topic.description}
                  </p>
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
                  {pageCount} pages
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
          more modules are on the way
        </p>
      </div>
    </div>
  );
}
