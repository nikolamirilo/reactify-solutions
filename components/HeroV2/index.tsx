//@ts-nocheck
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "../react-bits/CountUp";
import Magnet from "../react-bits/Magnet";
import { usePreloadReady } from "@/hooks/usePreloadReady";
import { FaRegCalendarAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const steps = [
  {
    cmd: '$ reactify scope --idea "your product"',
    result: "✓ scope & timeline locked - no sales call",
  },
  {
    cmd: "$ reactify build --stack web,mobile,ai,data",
    result: "✓ senior team · weekly increments",
  },
  {
    cmd: "$ reactify ship --to production",
    result: "✓ live in weeks, not months",
  },
];

const stats = [
  { to: 5, suffix: "", label: "inhouse products shipped" },
  { to: 3000, suffix: "+", separator: ",", label: "users on our platforms reached" },
  { to: 50, suffix: "+", label: "technologies mastered" },
  { display: "weeks", label: "from idea to launch" },
];

const HeroV2 = () => {
  const ready = usePreloadReady();

  return (
    <motion.section
      id="home-v2"
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-[100px]"
    >
      {/* Backgrounds */}
      <div className="bg-grid-faint pointer-events-none absolute inset-0 z-[-1] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="radial-fade-top pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[600px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-56 bg-gradient-to-b from-transparent to-dark" />

      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={stagger}
        className="container"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accentGreen shadow-[0_0_8px_rgba(74,222,128,0.85)]" />
            no sales · talk to builders
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">

          {/* Left: headline + CTA */}
          <motion.div variants={stagger} className="flex-1">
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-[54px] xl:text-[62px]"
            >
              Tell us the problem.{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-accent">We ship</span>{" "}
              the product.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[500px] text-base leading-relaxed text-textSecondary sm:text-lg"
            >
              We are the software and AI partner that turns your problem
              into a shipped product. Take the full build, or embed our engineers in
              your team. Web, mobile, AI, and data, from idea to production in weeks.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Magnet padding={60} magnetStrength={4}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 hover:bg-primaryDark hover:shadow-glow"
                >
                  <FaRegCalendarAlt />
                  Book a scoping call
                </Link>
              </Magnet>
              <Magnet padding={60} magnetStrength={4}>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-primaryColor/40 hover:bg-darkSurface"
                >
                  How we work
                </Link>
              </Magnet>
            </motion.div>
          </motion.div>

          {/* Right: terminal pipeline */}
          <motion.div
            variants={fadeUp}
            className="w-full lg:max-w-[48%]"
          >
            <div className="overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/90 shadow-[0_0_80px_rgba(0,212,200,0.07)] backdrop-blur-md">

              {/* macOS-style title bar */}
              <div className="flex items-center gap-2 border-b border-darkBorder bg-dark/50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-auto font-mono text-xs text-textColor">
                  reactify - ~/ship
                </span>
              </div>

              {/* Pipeline nodes body */}
              <div className="p-5 pb-6">
                <div className="mb-4 font-mono text-sm text-textColor">
                  # what we do
                </div>

                <div className="flex flex-col">
                  {steps.map((step, i) => {
                    const isLast = i === steps.length - 1;
                    return (
                      <div key={i} className="flex gap-4">
                        {/* Node dot + vertical connector */}
                        <div className="flex flex-col items-center">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primaryColor/40 bg-primaryColor/10 shadow-[0_0_10px_rgba(0,212,200,0.2)]">
                            <div className="h-1.5 w-1.5 rounded-full bg-primaryColor" />
                          </div>
                          {!isLast && (
                            <div className="mt-1.5 flex-1 w-px bg-gradient-to-b from-primaryColor/25 via-primaryColor/10 to-transparent" />
                          )}
                        </div>

                        {/* Command text + result */}
                        <div className={isLast ? "pb-0 min-w-0" : "pb-5 min-w-0"}>
                          <div className="font-mono text-sm leading-relaxed text-primaryColor">
                            {step.cmd}
                          </div>
                          <div className="mt-1 font-mono text-xs text-accentGreen">
                            {step.result}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Blinking cursor row */}
                  <div className="mt-4 flex gap-4 items-center">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primaryColor/20 bg-darkElevated">
                      <div className="h-1.5 w-1.5 rounded-full bg-primaryColor/30" />
                    </div>
                    <div className="flex items-center font-mono text-sm text-primaryColor">
                      <span>$&nbsp;</span>
                      <span className="cursor-blink inline-block h-[1.1em] w-2 bg-primaryColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl border border-darkBorder bg-gradient-to-b from-darkSurface to-dark px-5 py-6"
            >
              {/* accent top line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primaryColor/50 to-transparent" />

              <div className="text-gradient-accent font-display text-3xl font-bold leading-none">
                {s.display ? (
                  s.display
                ) : (
                  <CountUp
                    from={0}
                    to={s.to}
                    suffix={s.suffix}
                    separator={s.separator ?? ""}
                    duration={2}
                    startOnView
                    once
                  />
                )}
              </div>
              <div className="mt-2 text-xs leading-snug text-textColor">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroV2;
