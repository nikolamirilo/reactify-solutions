import Link from "next/link";
import { Metadata } from "next";
import { LuArrowRight } from "react-icons/lu";
import { docsNav } from "@/lib/docs";
import { openDocsSearch } from "@/components/Docs/DocsSearch";
import Image from "@/components/Common/Image";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Every way you can customize Claude — settings, CLAUDE.md, hooks, skills, subagents, MCP — in plain language with working examples. Free, no signup.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs | Reactify Solutions",
    description:
      "Every way you can customize Claude — settings, CLAUDE.md, hooks, skills, subagents, plugins and MCP — in plain language, with one example you can copy.",
    url: "/docs",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs | Reactify Solutions",
    description: "Every way you can customize Claude, explained in plain language.",
  },
};

export default function DocsIndexPage() {
  const claude = docsNav.find((t) => t.topic === "claude");

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

        <h1 className="font-display mb-5 max-w-[820px] text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-[56px]">
          Every way you can customize{" "}
          <span className="text-gradient-accent">Claude</span>.
        </h1>

        <p className="mb-9 max-w-[640px] text-lg leading-relaxed text-textSecondary">
          Settings, CLAUDE.md, hooks, skills, subagents, plugins and MCP. We explain
          them in plain language, with one example you can copy into your project.
          We built it because we needed it.
        </p>

        <div className="mb-3 flex flex-wrap items-center gap-4">
          {claude && (
            <Link
              href={`/docs/${claude.topic}`}
              className="flex h-[46px] items-center gap-2 rounded-[11px] bg-primaryColor px-6 font-semibold text-accentContrast shadow-glow transition-colors hover:bg-primaryDark"
            >
              Start here
              <LuArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="mb-16 font-mono text-[11px] uppercase tracking-[0.1em] text-textFaint">
          no signup · no email gate · we update it as claude ships
        </div>

        {docsNav.map((topic) => (
          <div key={topic.topic} className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {topic.pages.map((section) => (
              <div
                key={section.title}
                className="flex flex-col gap-3.5 rounded-2xl border border-darkBorder bg-darkSurface/50 p-6"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/docs/${topic.topic}/${page.slug}`}
                      className="text-[13.5px] text-textSecondary hover:text-primaryColor"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-darkBorder bg-docsCodeBg px-6 py-5 sm:flex-row sm:items-center">
          <span className="flex-shrink-0 font-mono text-[10.5px] uppercase tracking-[0.13em] text-textFaint">
            In one sentence
          </span>
          <span className="hidden h-[30px] w-px flex-shrink-0 bg-darkBorder sm:block" />
          <p className="m-0 text-[15px] leading-relaxed text-textSecondary">
            Claude Code keeps your customization in files on disk. The Claude apps keep
            it in your account.{" "}
            <strong className="font-semibold text-white">
              Skills are the connective tissue between them.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
