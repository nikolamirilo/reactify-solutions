"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  separator?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  startOnView?: boolean;
  once?: boolean;
  /**
   * External gate - animation only runs while `start` is true.
   * Default true. Use this to defer start until e.g. a preloader has finished.
   */
  start?: boolean;
}

const formatNumber = (value: number, decimals: number, separator: string) => {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withSep = separator
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : intPart;
  return decPart ? `${withSep}.${decPart}` : withSep;
};

const CountUp = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  separator = ",",
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  startOnView = true,
  once = true,
  start = true,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(
    formatNumber(from, decimals, separator),
  );

  useEffect(() => {
    if (!start) return;
    if (startOnView && !inView) return;

    if (prefersReducedMotion) {
      setDisplay(formatNumber(to, decimals, separator));
      return;
    }

    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatNumber(v, decimals, separator)),
    });

    return () => controls.stop();
  }, [
    inView,
    from,
    to,
    duration,
    delay,
    decimals,
    separator,
    prefersReducedMotion,
    startOnView,
    start,
  ]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
