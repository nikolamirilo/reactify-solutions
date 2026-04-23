"use client";
import { useEffect, useState } from "react";
import {
  PRELOAD_DONE_EVENT,
  PRELOAD_DURATION_MS,
} from "@/components/Common/PreLoader";

/**
 * Returns true once the PreLoader overlay has hidden.
 * Uses a custom window event, with a timer fallback in case the listener
 * attaches after the event was already dispatched (e.g., late mount).
 */
export const usePreloadReady = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    // If preloader already fired before we mounted, the event won't come again.
    // Timer fallback catches that case.
    const fallbackDelay = PRELOAD_DURATION_MS + 50;
    const fallback = setTimeout(markReady, fallbackDelay);

    window.addEventListener(PRELOAD_DONE_EVENT, markReady);

    return () => {
      cancelled = true;
      window.removeEventListener(PRELOAD_DONE_EVENT, markReady);
      clearTimeout(fallback);
    };
  }, []);

  return ready;
};
