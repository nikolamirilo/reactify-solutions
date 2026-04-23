"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usePreloadReady } from "@/hooks/usePreloadReady";

type Trigger = "mount" | "inView" | "preload";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  animationFrom?: { opacity?: number; y?: number; x?: number };
  animationTo?: { opacity?: number; y?: number; x?: number };
  stagger?: number;
  once?: boolean;
  amount?: number;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
  ariaLabel?: string;
  children?: ReactNode;
  /**
   * "mount" (default): fire on client mount — reliable for above-the-fold.
   * "inView": fire when viewport intersection observed — use for below-the-fold.
   * "preload": fire after the PreLoader overlay hides — use for hero-area content.
   */
  trigger?: Trigger;
}

const SplitText = ({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  duration = 0.6,
  splitType = "chars",
  animationFrom = { opacity: 0, y: 32 },
  animationTo = { opacity: 1, y: 0 },
  stagger = 0.04,
  once = true,
  amount = 0.3,
  as = "span",
  ariaLabel,
  children,
  trigger = "mount",
}: SplitTextProps) => {
  const prefersReducedMotion = useReducedMotion();
  const units = splitType === "words" ? text.split(" ") : Array.from(text);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { ...animationFrom },
    show: {
      ...animationTo,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const Wrapper: any = motion[as as keyof typeof motion];

  // Mount trigger — reliable for above-the-fold elements.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Viewport trigger — only used when trigger="inView".
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -10% 0px",
  });

  // Preload trigger — only used when trigger="preload".
  const preloadReady = usePreloadReady();

  const shouldAnimate =
    trigger === "inView"
      ? inView
      : trigger === "preload"
        ? preloadReady
        : mounted;

  return (
    <Wrapper
      ref={ref}
      aria-label={ariaLabel ?? text}
      initial="hidden"
      animate={shouldAnimate ? "show" : "hidden"}
      variants={container}
      className={`inline-block ${className}`}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={item}
          className={`inline-block will-change-transform ${charClassName}`}
          style={{ whiteSpace: unit === " " ? "pre" : undefined }}
        >
          {unit === " " ? "\u00A0" : unit}
          {splitType === "words" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
      {children}
    </Wrapper>
  );
};

export default SplitText;
