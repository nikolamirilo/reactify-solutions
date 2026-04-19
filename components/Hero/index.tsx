//@ts-nocheck
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { RiStackLine } from "react-icons/ri";
import { LuSend } from "react-icons/lu";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px]"
    >
      <div className="absolute inset-x-0 top-0 h-[720px] radial-fade-top pointer-events-none z-[-1]" />
      <div className="absolute inset-0 bg-grid-faint opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_75%)] pointer-events-none z-[-1]" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-primaryColor/10 blur-[120px] z-[-1]" />
      <div className="pointer-events-none absolute top-32 right-48 h-[260px] w-[260px] rounded-full bg-accentGreen/10 blur-[90px] z-[-1]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-primaryColor/[0.07] blur-[100px] z-[-1]" />

      {/* Concentric rings — top right */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-4 hidden opacity-40 lg:block z-[-1]"
        width="560"
        height="560"
        viewBox="0 0 560 560"
        fill="none"
      >
        <defs>
          <linearGradient id="ringFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4c8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4c8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="280" r="120" stroke="url(#ringFade)" strokeWidth="1" />
        <circle cx="280" cy="280" r="180" stroke="url(#ringFade)" strokeWidth="1" />
        <circle cx="280" cy="280" r="240" stroke="url(#ringFade)" strokeWidth="1" />
        <circle cx="280" cy="280" r="4" fill="#00d4c8" />
      </svg>

      {/* Flowing lines — bottom left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-10 hidden opacity-50 lg:block z-[-1]"
        width="440"
        height="240"
        viewBox="0 0 440 240"
        fill="none"
      >
        <defs>
          <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4c8" stopOpacity="0" />
            <stop offset="60%" stopColor="#00d4c8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M-20 200 C 80 130, 180 190, 260 140 S 420 80, 520 110" stroke="url(#lineFade)" strokeWidth="1" />
        <path d="M-20 170 C 90 110, 200 160, 280 120 S 430 60, 520 90" stroke="url(#lineFade)" strokeWidth="1" />
        <path d="M-20 140 C 100 90, 220 130, 300 100 S 440 40, 520 70" stroke="url(#lineFade)" strokeWidth="1" />
      </svg>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-dark z-[-1]" />

      <div className="container">
        <div className="mx-auto max-w-[860px] text-center">
          <div
            className="wow fadeInUp inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm"
            data-wow-delay=".1s"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primaryColor shadow-[0_0_10px_rgba(0,212,200,0.8)] animate-pulse" />
            <span>now shipping · cutting-edge builds</span>
          </div>

          <h1
            className="wow fadeInUp font-display mt-6 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
            data-wow-delay=".2s"
          >
            Accelerate your growth with{" "}
            <span className="text-gradient-accent">innovative solutions.</span>
          </h1>

          <p
            className="wow fadeInUp mx-auto mt-6 max-w-[680px] text-base leading-relaxed text-textSecondary sm:text-lg"
            data-wow-delay=".3s"
          >
            We provide cutting-edge digital solutions by utilizing the latest
            technologies to develop innovative and intuitive software that
            enhances your online presence and drives substantial growth.
          </p>

          <div
            className="wow fadeInUp mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            data-wow-delay=".4s"
          >
            <Link
              href="#services"
              className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
            >
              <RiStackLine className="h-5 w-5" />
              Services

            </Link>
            <Link
              href="/contact"
              className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primaryColor/40 hover:bg-darkSurface"
            >
              <LuSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Reach out
            </Link>
          </div>

          <div
            className="wow fadeInUp mx-auto mt-14 grid max-w-[640px] grid-cols-3 gap-3 sm:gap-4"
            data-wow-delay=".5s"
          >
            {[
              { k: "reply window", v: "within 24h" },
              { k: "who you'll meet", v: "a named partner" },
              { k: "based in", v: "EU · remote-first" },
            ].map(({ k, v }) => (
              <div
                key={k}
                className="rounded-xl border border-darkBorder bg-darkSurface/60 px-4 py-3 text-left backdrop-blur-sm"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                  {k}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
