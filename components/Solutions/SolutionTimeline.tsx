"use client";

import { motion } from "framer-motion";
import { Solution } from "./solutionsData";

interface Props {
  timeline: Solution["timeline"];
  accentFrom: string;
  accentTo: string;
}

const SolutionTimeline = ({ timeline, accentFrom, accentTo }: Props) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute left-4 top-2 hidden h-[calc(100%-16px)] w-px md:left-1/2 md:block md:-translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, ${accentFrom}, ${accentTo}, transparent)`,
        }}
      />

      <div className="flex flex-col gap-6 md:gap-10">
        {timeline.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={step.phase}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`relative flex flex-col gap-3 pl-10 md:gap-0 md:pl-0 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                aria-hidden
                className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-dark md:left-1/2 md:-translate-x-1/2"
                style={{ backgroundColor: accentFrom }}
              >
                <span className="font-display text-sm font-semibold text-accentContrast">
                  {idx + 1}
                </span>
              </div>

              <div className={`md:w-1/2 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
                <div className="rounded-2xl border border-darkBorder bg-darkSurface/60 p-5 backdrop-blur-sm md:p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-primaryColor">
                    Phase {idx + 1}
                  </div>
                  <div className="font-display mt-1 text-xl font-semibold text-white">
                    {step.phase}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-textSecondary md:text-base">
                    {step.detail}
                  </p>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SolutionTimeline;
