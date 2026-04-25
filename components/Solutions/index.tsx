"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import SectionTitle from "../Common/SectionTitle";
import solutionsData, { Solution } from "./solutionsData";

const Solutions = () => {
  return (
    <section id="solutions" className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[880px] -translate-x-1/2 rounded-full bg-primaryColor/[0.07] blur-[140px]" />

      <div className="container relative flex flex-col items-center justify-center">
        <SectionTitle
          title="Our Solutions"
          paragraph="We don't just ship client work - we build and run our own production-grade products. Explore the platforms we've launched, the problems they solve, and the impact they deliver."
          center
        />

        <div className="mt-6 flex w-full flex-col gap-12 md:mt-10 md:gap-16 lg:gap-24">
          {solutionsData.map((solution, idx) => (
            <SolutionCard key={solution.id} solution={solution} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) => {
  const reverse = index % 2 === 1;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const previewStats = solution.stats.slice(0, 3);
  const previewFeatures = solution.keyFeatures.slice(0, 4);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/70 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primaryColor/40 hover:shadow-[0_30px_80px_-30px_rgba(0,212,200,0.35)] sm:p-6 md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${solution.accentFrom}55, transparent 60%)`,
        }}
      />

      <div
        className={`grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-5 lg:items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Link
          href={`/solutions/${solution.id}`}
          aria-label={`View ${solution.name} details`}
          className="relative block overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated lg:col-span-3"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 h-[108%] w-full"
            >
              <Image
                src={solution.images[0]}
                alt={solution.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 820px"
                className="object-cover object-center"
                quality={95}
                priority={index === 0}
              />
            </motion.div>

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent"
            />

            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: solution.accentFrom }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: solution.accentFrom }}
                  />
                </span>
                {solution.status === "live" ? "live · in production" : solution.status}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 inline-flex translate-y-1 items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-sm">
              View case study <HiArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              {solution.category}
            </div>
            <h3 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              {solution.name}
            </h3>
            <p
              className="mt-2 text-base font-medium md:text-lg"
              style={{
                backgroundImage: `linear-gradient(90deg, ${solution.accentFrom} 0%, ${solution.accentTo} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {solution.tagline}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-textSecondary md:text-base">
            {solution.briefDescription}
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {previewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-darkBorder bg-darkElevated/60 px-3 py-2.5 text-center"
              >
                <div className="text-base font-semibold text-white sm:text-lg md:text-xl">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-textColor sm:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-1.5 text-sm text-textSecondary sm:grid-cols-2">
            {previewFeatures.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <FaCircleCheck
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                  style={{ color: solution.accentFrom }}
                />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href={`/solutions/${solution.id}`}
              className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-primaryColor px-5 py-3 text-sm font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow md:text-base"
            >
              View case study
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            {solution.productUrl && (
              <Link
                href={solution.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface md:text-base"
              >
                Visit site
                <FaExternalLinkAlt className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Solutions;
