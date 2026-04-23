"use client";

import {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  sparkRadius?: number;
  sparkSize?: number;
  duration?: number;
  className?: string;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

const ClickSpark = ({
  children,
  sparkColor = "#00d4c8",
  sparkCount = 8,
  sparkRadius = 18,
  sparkSize = 6,
  duration = 0.55,
  className = "",
}: ClickSparkProps) => {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      setBursts((prev) => [...prev, { id, x, y }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, duration * 1000 + 50);
    },
    [prefersReducedMotion, duration],
  );

  const angles = Array.from({ length: sparkCount }, (_, i) =>
    (i * 360) / sparkCount,
  );

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block ${className}`}
    >
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="pointer-events-none absolute"
            style={{ left: burst.x, top: burst.y }}
            aria-hidden
          >
            {angles.map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const tx = Math.cos(rad) * sparkRadius;
              const ty = Math.sin(rad) * sparkRadius;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: tx, y: ty, scale: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    width: sparkSize,
                    height: sparkSize,
                    borderRadius: 9999,
                    background: sparkColor,
                    boxShadow: `0 0 10px ${sparkColor}`,
                  }}
                />
              );
            })}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickSpark;
