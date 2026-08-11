"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Segment-level error boundary. Purely a safety net - it is not expected to
 * render in normal use. Without it Next.js falls back to its bare
 * "Application error: a client-side exception has occurred" screen, which gives
 * a visitor no way forward and logs nothing useful.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error boundary caught:", error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-32 pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] radial-fade-top z-[-1]" />

      <div className="container max-w-xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/60 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primaryColor shadow-[0_0_8px_rgba(0,212,200,0.8)]" />
          <span>reactify · error</span>
        </div>

        <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-5 text-base leading-relaxed text-textSecondary md:text-lg">
          This page didn&apos;t load properly. Try again, or head back home.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 font-semibold text-accentContrast shadow-glowSoft transition-all hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface"
          >
            Back to home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono text-xs text-textColor">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
