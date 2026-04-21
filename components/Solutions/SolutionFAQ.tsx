"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { Solution } from "./solutionsData";

interface Props {
  faq: Solution["faq"];
  accentFrom: string;
}

const SolutionFAQ = ({ faq, accentFrom }: Props) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faq.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.05, duration: 0.45 }}
            className={`overflow-hidden rounded-2xl border bg-darkSurface/60 backdrop-blur-sm transition-colors ${
              isOpen ? "border-primaryColor/40" : "border-darkBorder"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-darkSurface md:px-6 md:py-5"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 text-base font-semibold text-white md:text-lg">
                <span
                  className="font-mono text-xs"
                  style={{ color: accentFrom }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-darkBorder bg-darkElevated"
              >
                <HiChevronDown className="h-4 w-4 text-textSecondary" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-textSecondary md:px-6 md:pb-6 md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SolutionFAQ;
