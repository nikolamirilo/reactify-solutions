import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FaCircleCheck,
  FaCircleChevronRight,
  FaRegLightbulb,
} from "react-icons/fa6";
import { FaRegGem, FaUsers } from "react-icons/fa";
import { MdOutlineMailOutline, MdWarningAmber } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";
import solutionsData from "@/components/Solutions/solutionsData";
import ImageCarousel from "@/components/Solutions/ImageCarousel";
import SolutionHero from "@/components/Solutions/SolutionHero";
import SolutionStats from "@/components/Solutions/SolutionStats";
import SolutionTimeline from "@/components/Solutions/SolutionTimeline";
import SolutionFAQ from "@/components/Solutions/SolutionFAQ";

export async function generateStaticParams() {
  return solutionsData.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const solution = solutionsData.find((s) => s.id === id);

  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: solution.name,
    description: solution.briefDescription,
    alternates: { canonical: `/solutions/${id}` },
    openGraph: {
      title: `${solution.name} - Reactify Solutions`,
      description: solution.briefDescription,
      images: [solution.images[0]],
      url: `/solutions/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.name} - Reactify Solutions`,
      description: solution.briefDescription,
      images: [solution.images[0]],
    },
  };
}

export default async function SolutionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const solution = solutionsData.find((s) => s.id === id);
  if (!solution) {
    notFound();
  }

  const baseUrl = "https://www.reactify-solutions.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: solution.name,
        description: solution.fullDescription,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: solution.productUrl,
        image: `${baseUrl}${solution.images[0]}`,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: `${baseUrl}/#solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: solution.name,
          },
        ],
      },
    ],
  };

  return (
    <div className="relative pb-16 pt-[120px] md:pt-[150px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] radial-fade-top opacity-80" />
      <div className="pointer-events-none absolute inset-0 top-0 h-[500px] bg-grid-faint opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      <div className="container relative max-w-6xl">
        <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-textColor md:text-sm">
          <Link href="/" className="hover:text-primaryColor">
            Home
          </Link>
          <FaCircleChevronRight className="h-3 w-3 opacity-60" />
          <Link href="/#solutions" className="hover:text-primaryColor">
            Solutions
          </Link>
          <FaCircleChevronRight className="h-3 w-3 opacity-60" />
          <span className="text-white">{solution.name}</span>
        </div>

        <SolutionHero solution={solution} />

        <SolutionStats
          stats={solution.stats}
          accentFrom={solution.accentFrom}
          accentTo={solution.accentTo}
        />

        {/* Gallery + About */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <ImageCarousel
              images={solution.images}
              solutionName={solution.name}
              accentFrom={solution.accentFrom}
            />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-2" id="case-study">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              Overview
            </div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              About this project
            </h2>
            <p className="text-base leading-relaxed text-textSecondary md:text-lg">
              {solution.fullDescription}
            </p>

            <div className="mt-2 rounded-2xl border border-darkBorder bg-darkSurface/60 p-5 backdrop-blur-sm md:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <FaUsers
                  className="h-4 w-4"
                  style={{ color: solution.accentFrom }}
                />
                Built for
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {solution.targetAudience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-textSecondary md:text-base"
                  >
                    <FaCircleCheck
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      style={{ color: solution.accentFrom }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Challenge + Solution */}
        <div className="mb-14 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm md:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/15 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                <MdWarningAmber className="h-6 w-6" />
              </div>
              <h3 className="font-display mb-3 text-2xl font-semibold text-white md:text-3xl">
                The challenge
              </h3>
              <p className="text-base leading-relaxed text-textSecondary md:text-lg">
                {solution.challenge}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primaryColor/30 bg-primaryColor/5 p-6 backdrop-blur-sm md:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primaryColor/20 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primaryColor/20 text-primaryColor">
                <FaRegLightbulb className="h-6 w-6" />
              </div>
              <h3 className="font-display mb-3 text-2xl font-semibold text-white md:text-3xl">
                Our solution
              </h3>
              <p className="text-base leading-relaxed text-textSecondary md:text-lg">
                {solution.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Key Features + Tech */}
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-darkBorder bg-darkSurface/60 p-6 backdrop-blur-sm md:p-8 lg:col-span-3">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Key features
              </h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primaryColor/10 text-primaryColor">
                <FaRegGem className="h-5 w-5" />
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {solution.keyFeatures.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-3 rounded-xl border border-darkBorder bg-darkElevated/60 p-3 text-sm text-textSecondary md:text-base"
                >
                  <FaCircleCheck
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: solution.accentFrom }}
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-darkBorder bg-darkSurface/60 p-6 backdrop-blur-sm md:p-8 lg:col-span-2">
            <h3 className="font-display mb-5 text-2xl font-semibold text-white md:text-3xl">
              Technology stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-darkBorder bg-darkElevated/80 px-3 py-1.5 text-xs font-semibold text-textSecondary transition-colors hover:border-primaryColor/40 hover:text-primaryColor md:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:mb-8">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
              Use cases
            </div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Where {solution.name} shines
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {solution.useCases.map((useCase, idx) => (
              <div
                key={useCase.title}
                className="group relative overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primaryColor/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${solution.accentFrom}, ${solution.accentTo})`,
                  }}
                />
                <div
                  className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm font-semibold"
                  style={{
                    backgroundColor: `${solution.accentFrom}20`,
                    color: solution.accentFrom,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h4 className="font-display mb-2 text-xl font-semibold text-white">
                  {useCase.title}
                </h4>
                <p className="text-sm leading-relaxed text-textSecondary md:text-base">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
              How we built it
            </div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              The journey, end to end
            </h2>
          </div>
          <SolutionTimeline
            timeline={solution.timeline}
            accentFrom={solution.accentFrom}
            accentTo={solution.accentTo}
          />
        </div>

        {/* Functionalities */}
        <div className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:mb-8">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
              Under the hood
            </div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Core functionalities
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {solution.functionalities.map((functionality) => (
              <div
                key={functionality}
                className="flex items-start gap-3 rounded-xl border border-darkBorder bg-darkSurface/60 p-4 backdrop-blur-sm transition-colors hover:border-primaryColor/40"
              >
                <FaCircleCheck
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: solution.accentFrom }}
                />
                <span className="text-sm text-textSecondary md:text-base">
                  {functionality}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        {solution.pricing && solution.pricing.length > 0 && (
          <div className="mb-14">
            <div className="mb-6 flex flex-col gap-2 md:mb-8">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
                Plans
              </div>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                Simple, transparent pricing
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {solution.pricing.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all md:p-8 ${
                    tier.highlight
                      ? "border-primaryColor/60 bg-primaryColor/5 shadow-glowSoft"
                      : "border-darkBorder bg-darkSurface/60"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primaryColor px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accentContrast">
                      Most popular
                    </div>
                  )}
                  <div className="font-display text-xl font-semibold text-white">
                    {tier.name}
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                    {tier.price}
                  </div>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-textSecondary md:text-base"
                      >
                        <FaCircleCheck
                          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: solution.accentFrom }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {solution.productUrl && (
                    <Link
                      href={`${solution.productUrl}/pricing`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 md:text-base ${
                        tier.highlight
                          ? "bg-primaryColor text-accentContrast shadow-glowSoft hover:bg-primaryDark hover:shadow-glow"
                          : "border border-darkBorder bg-darkElevated text-white hover:border-primaryColor/40"
                      }`}
                    >
                      Choose {tier.name}
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-primaryColor/20 bg-primaryColor/5 p-6 backdrop-blur-sm md:p-10">
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primaryColor/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accentGreen/10 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex flex-col gap-2 md:mb-8">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
                Outcomes
              </div>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                Results &amp; impact
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {solution.results.map((result) => (
                <div
                  key={result}
                  className="flex items-start gap-3 rounded-xl border border-darkBorder bg-darkSurface/60 p-4 backdrop-blur-sm md:p-5"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${solution.accentFrom}20` }}
                  >
                    <FaCircleCheck
                      className="h-4 w-4"
                      style={{ color: solution.accentFrom }}
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-textSecondary md:text-base">
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <div className="mb-6 flex flex-col gap-2 md:mb-8">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-primaryColor">
              Frequently asked
            </div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Common questions
            </h2>
          </div>
          <SolutionFAQ faq={solution.faq} accentFrom={solution.accentFrom} />
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/70 p-8 text-center backdrop-blur-sm md:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(31,38,54,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,38,54,0.45) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-[90%] -translate-x-1/2 rounded-full bg-primaryColor/15 blur-[100px]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              Your project, next
            </div>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Ready to build something like{" "}
              <span className="text-gradient-accent">{solution.name}</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-textSecondary md:text-lg">
              We turn ambitious product ideas into live, revenue-generating
              software — from discovery to deployment. Let&apos;s talk about
              yours.
            </p>
            <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 font-semibold text-accentContrast shadow-glowSoft transition-all hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow"
              >
                Start a project
                <MdOutlineMailOutline className="h-5 w-5" />
              </Link>
              <Link
                href="/#solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface"
              >
                See other solutions
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
