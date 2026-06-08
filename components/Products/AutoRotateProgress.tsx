"use client";

import { useEffect, useRef } from "react";

interface AutoRotateProgressProps {
  /** Total time for one full cycle, in milliseconds. */
  duration: number;
  /** When true, the timer freezes without losing its place. */
  paused: boolean;
  /** Changing this value restarts the cycle from zero. */
  resetKey: string | number;
  /** Fired once the bar fills - the parent should advance the slide. */
  onComplete: () => void;
  className?: string;
}

/**
 * Drives both the auto-advance timer and its visual progress bar from a single
 * requestAnimationFrame loop. The bar is updated by writing `transform` straight
 * to the DOM, so a full cycle costs zero React re-renders - deliberately light
 * for low-end devices. Pausing freezes elapsed time without a jump on resume.
 */
const AutoRotateProgress = ({
  duration,
  paused,
  resetKey,
  onComplete,
  className = "",
}: AutoRotateProgressProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const pausedRef = useRef(paused);

  onCompleteRef.current = onComplete;
  pausedRef.current = paused;

  useEffect(() => {
    const bar = barRef.current;
    let raf = 0;
    let elapsed = 0;
    let last = performance.now();

    if (bar) bar.style.transform = "scaleX(0)";

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      if (!pausedRef.current) {
        elapsed += delta;
        const progress = Math.min(elapsed / duration, 1);
        if (bar) bar.style.transform = `scaleX(${progress})`;
        if (progress >= 1) {
          onCompleteRef.current();
          return; // resetKey change re-runs this effect with a fresh cycle
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, resetKey]);

  return (
    <span className={`block h-full w-full overflow-hidden ${className}`}>
      <span
        ref={barRef}
        className="block h-full w-full origin-left bg-primaryColor"
        style={{ transform: "scaleX(0)" }}
      />
    </span>
  );
};

export default AutoRotateProgress;
