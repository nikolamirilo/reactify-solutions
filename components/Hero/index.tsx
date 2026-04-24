//@ts-nocheck
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiStackLine } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import Aurora from "../react-bits/Aurora";
import SplitText from "../react-bits/SplitText";
import ShinyText from "../react-bits/ShinyText";
import CountUp from "../react-bits/CountUp";
import Magnet from "../react-bits/Magnet";
import { usePreloadReady } from "@/hooks/usePreloadReady";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const ready = usePreloadReady();
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]"
    >
      {/* react-bits Aurora — signature WebGL-style backdrop (CSS variant) */}
      <Aurora
        colorStops={["#00d4c8", "#4ade80", "#00a89e"]}
        amplitude={0.7}
        blend={0.3}
        speed={0.7}
        className="z-[-2] opacity-50"
      />

      <div className="radial-fade-top pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[720px]" />
      <div className="bg-grid-faint pointer-events-none absolute inset-0 z-[-1] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      {/* Concentric rings - top right (preserved) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-4 z-[-1] hidden opacity-40 lg:block"
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
        <circle
          cx="280"
          cy="280"
          r="120"
          stroke="url(#ringFade)"
          strokeWidth="1"
        />
        <circle
          cx="280"
          cy="280"
          r="180"
          stroke="url(#ringFade)"
          strokeWidth="1"
        />
        <circle
          cx="280"
          cy="280"
          r="240"
          stroke="url(#ringFade)"
          strokeWidth="1"
        />
        <circle cx="280" cy="280" r="4" fill="#00d4c8" />
      </svg>

      {/* Flowing lines - bottom left (preserved) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-10 z-[-1] hidden opacity-50 lg:block"
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
        <path
          d="M-20 200 C 80 130, 180 190, 260 140 S 420 80, 520 110"
          stroke="url(#lineFade)"
          strokeWidth="1"
        />
        <path
          d="M-20 170 C 90 110, 200 160, 280 120 S 430 60, 520 90"
          stroke="url(#lineFade)"
          strokeWidth="1"
        />
        <path
          d="M-20 140 C 100 90, 220 130, 300 100 S 440 40, 520 70"
          stroke="url(#lineFade)"
          strokeWidth="1"
        />
      </svg>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-56 bg-gradient-to-b from-transparent to-dark" />

      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="container"
      >
        <div className="mx-auto max-w-[860px] text-center">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primaryColor shadow-[0_0_10px_rgba(0,212,200,0.8)]" />
            <span>now shipping · cutting-edge builds</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Accelerate your growth with{" "}
            <SplitText
              text="innovative solutions"
              splitType="chars"
              charClassName="text-gradient-accent"
              trigger="preload"
              delay={0.35}
              stagger={0.03}
              duration={0.6}
              animationFrom={{ opacity: 0, y: 36 }}
              animationTo={{ opacity: 1, y: 0 }}
              ariaLabel="innovative solutions"
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[680px] text-base leading-relaxed text-textSecondary sm:text-lg"
          >
            We provide{" "}
            <ShinyText
              text="cutting-edge digital solutions"
              speed={5}
              baseColor="#c9d1e0"
              shineColor="rgba(0, 212, 200, 0.95)"
            />{" "}
            by utilizing the latest technologies to develop innovative and
            intuitive software that enhances your online presence and drives
            substantial growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Magnet padding={60} magnetStrength={4}>
              <Link
                href="#services"
                className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:bg-primaryDark hover:shadow-glow"
              >
                <RiStackLine className="h-5 w-5" />
                Services
              </Link>
            </Magnet>
            <Magnet padding={60} magnetStrength={4}>
              <Link
                href="/contact"
                className="group inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-primaryColor/40 hover:bg-darkSurface"
              >
                <LuSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Reach out
              </Link>
            </Magnet>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 grid max-w-[640px] grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              {
                k: "no sales",
                render: "talk to builders",
              },
              {
                k: "idea → product",
                render: "weeks, not months",
              },
              {
                k: "beyond build",
                render: "we challenge you",
              },
            ].map(({ k, render }) => (
              <div
                key={k}
                className="rounded-xl border border-darkBorder bg-darkSurface/60 px-4 py-3 text-left backdrop-blur-sm"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                  {k}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {render}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
