"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Children, ReactNode } from "react";

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  offset?: number;
  once?: boolean;
  amount?: number;
  direction?: "up" | "down" | "left" | "right";
}

const AnimatedList = ({
  children,
  className = "",
  itemClassName = "",
  stagger = 0.07,
  delay = 0,
  duration = 0.5,
  offset = 16,
  once = true,
  amount = 0.15,
  direction = "up",
}: AnimatedListProps) => {
  const prefersReducedMotion = useReducedMotion();
  const items = Children.toArray(children);

  const offsets: Record<typeof direction, { x?: number; y?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: prefersReducedMotion ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, ...offsets[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={container}
      className={className}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={item} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;
