"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const offsets = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
} as const;

/**
 * Page-level section reveal - outer wrapper that fades a whole section in
 * as it enters the viewport. Meant to compose above inner staggers, not
 * replace them. amount is tuned (0.08) so the reveal fires the moment the
 * section crosses into view, before inner staggers start playing.
 */
const RevealOnScroll = ({
  children,
  className = "",
  distance = 32,
  duration = 0.7,
  delay = 0,
  amount = 0.08,
  once = true,
  direction = "up",
}: RevealOnScrollProps) => {
  const prefersReducedMotion = useReducedMotion();

  const base =
    direction === "up"
      ? { y: distance }
      : direction === "down"
      ? { y: -distance }
      : direction === "left"
      ? { x: distance }
      : direction === "right"
      ? { x: -distance }
      : {};

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...base }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
