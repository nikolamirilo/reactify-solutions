"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export interface StepperItem {
  title: string;
  description?: ReactNode;
  label?: string;
}

interface StepperProps {
  steps: StepperItem[];
  accentFrom?: string;
  accentTo?: string;
  className?: string;
  active?: number;
}

const Stepper = ({
  steps,
  accentFrom = "#00d4c8",
  accentTo = "#4ade80",
  className = "",
  active,
}: StepperProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol className={`relative flex flex-col ${className}`}>
      {steps.map((step, idx) => {
        const isActive = active !== undefined ? idx <= active : true;
        const isLast = idx === steps.length - 1;

        return (
          <motion.li
            key={step.title + idx}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : idx * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex gap-4 pb-8 md:gap-6 md:pb-10"
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-[15px] top-10 h-[calc(100%-32px)] w-px md:left-[19px]"
                style={{
                  background: `linear-gradient(to bottom, ${accentFrom}, ${accentTo}33 60%, transparent)`,
                  opacity: isActive ? 1 : 0.3,
                }}
              />
            )}

            <div
              className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dark font-display text-sm font-semibold text-accentContrast md:h-10 md:w-10 md:text-base"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${accentFrom}, ${accentTo})`
                  : "#111726",
                color: isActive ? "#062a27" : "#8892a6",
                boxShadow: isActive
                  ? `0 0 24px ${accentFrom}55`
                  : "none",
              }}
            >
              {idx + 1}
            </div>

            <div className="flex-1 pt-0.5 md:pt-1">
              {step.label && (
                <div
                  className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: accentFrom }}
                >
                  {step.label}
                </div>
              )}
              <div className="font-display text-lg font-semibold text-white md:text-xl">
                {step.title}
              </div>
              {step.description && (
                <div className="mt-2 text-sm leading-relaxed text-textSecondary md:text-base">
                  {step.description}
                </div>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
};

export default Stepper;
