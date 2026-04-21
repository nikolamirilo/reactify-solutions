"use client";

import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface MotionFadeProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "aside";
}

const buildVariants = (
  direction: Direction,
  distance: number,
  duration: number,
  delay: number,
): Variants => {
  const offsets: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...offsets[direction],
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export const MotionFade = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 32,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}: MotionFadeProps) => {
  const Component = motion[as];
  const variants = buildVariants(direction, distance, duration, delay);

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default MotionFade;
