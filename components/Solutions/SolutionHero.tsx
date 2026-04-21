"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt, FaShoppingCart } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { Solution } from "./solutionsData";

interface Props {
  solution: Solution;
}

const SolutionHero = ({ solution }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-10 overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/60 px-6 py-10 backdrop-blur-sm sm:px-10 sm:py-14 md:mb-14 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, ${solution.accentFrom}35, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, ${solution.accentTo}25, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,38,54,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,38,54,0.45) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
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
              {solution.status === "live"
                ? "live · in production"
                : solution.status}
            </span>
            <span className="rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              {solution.category}
            </span>
            <span className="rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
              since {solution.launchYear}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display mb-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl"
          >
            {solution.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mb-2 text-xl font-medium md:text-2xl"
            style={{
              backgroundImage: `linear-gradient(90deg, ${solution.accentFrom} 0%, ${solution.accentTo} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {solution.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.6 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-textSecondary md:text-lg"
          >
            {solution.briefDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {solution.productUrl && (
              <Link
                href={solution.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-primaryColor px-6 py-3 font-semibold text-accentContrast shadow-glowSoft transition-all hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow"
              >
                Visit website
                <FaExternalLinkAlt className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
            {solution.productUrl && solution.name === "Quicktalog" && (
              <Link
                href={`${solution.productUrl}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface"
              >
                See pricing
                <FaShoppingCart className="h-4 w-4" />
              </Link>
            )}
            <Link
              href="#case-study"
              className="inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface"
            >
              Read case study
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {solution.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-darkBorder bg-darkSurface/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SolutionHero;
