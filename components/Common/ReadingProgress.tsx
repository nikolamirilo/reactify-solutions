"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressProps {
  colorFrom?: string;
  colorTo?: string;
  height?: number;
  className?: string;
}

const ReadingProgress = ({
  colorFrom = "#00d4c8",
  colorTo = "#4ade80",
  height = 2,
  className = "",
}: ReadingProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        height,
        background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
        boxShadow: `0 0 12px ${colorFrom}66`,
      }}
      className={`fixed inset-x-0 top-0 z-[10000] ${className}`}
    />
  );
};

export default ReadingProgress;
