"use client";

import { motion } from "framer-motion";
import { Solution } from "./solutionsData";
import CountUp from "../react-bits/CountUp";

interface Props {
  stats: Solution["stats"];
  accentFrom: string;
  accentTo: string;
}

const NUM_PATTERN = /^([^\d-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/;

const parseStatValue = (value: string) => {
  const match = value.match(NUM_PATTERN);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const hasSeparator = numStr.includes(",");
  const numeric = Number(numStr.replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;
  const decimals = numStr.includes(".")
    ? numStr.split(".")[1]?.length ?? 0
    : 0;
  return {
    prefix,
    numeric,
    suffix,
    separator: hasSeparator ? "," : "",
    decimals,
  };
};

const AnimatedValue = ({ value }: { value: string }) => {
  const parsed = parseStatValue(value);
  if (!parsed) return <>{value}</>;
  return (
    <>
      {parsed.prefix}
      <CountUp
        to={parsed.numeric}
        duration={2}
        separator={parsed.separator}
        decimals={parsed.decimals}
      />
      {parsed.suffix}
    </>
  );
};

const SolutionStats = ({ stats, accentFrom, accentTo }: Props) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="mb-12 grid grid-cols-2 gap-4 md:mb-14 md:grid-cols-4 md:gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="group relative overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primaryColor/40 md:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
            }}
          />
          <div
            className="font-display text-3xl font-semibold md:text-4xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            <AnimatedValue value={stat.value} />
          </div>
          <div className="mt-1 text-sm font-semibold text-white md:text-base">
            {stat.label}
          </div>
          <div className="mt-2 text-xs leading-relaxed text-textColor md:text-sm">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SolutionStats;
