"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AtomLoader from "./AtomLoader";

export const PRELOAD_DURATION_MS = 1200;
export const PRELOAD_DONE_EVENT = "reactify:preload:done";

const PreLoader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(PRELOAD_DONE_EVENT));
      }
    }, PRELOAD_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0e1a]"
        >
          <AtomLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
