"use client";

import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import CountUp from "../react-bits/CountUp";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

const stats: Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: "Clients",
    description: "Startups & SMBs we've shipped for.",
  },
  {
    value: 200,
    suffix: "+",
    label: "Projects",
    description: "Delivered on time, budget & scope.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "Clients who'd hire us again.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Monitoring & response on critical paths.",
  },
];

type Pillar = {
  step: string;
  title: string;
  paragraph: string;
};

const pillars: Pillar[] = [
  {
    step: "01",
    title: "Discovery & strategy",
    paragraph:
      "Every engagement starts with deep alignment on your goals, users, and constraints - so what we ship actually moves the business forward.",
  },
  {
    step: "02",
    title: "Iterative delivery",
    paragraph:
      "Working software in short cycles. You see progress weekly, give feedback continuously, and never wait months for a reveal.",
  },
  {
    step: "03",
    title: "Long-term partnership",
    paragraph:
      "From launch to scale: hands-on support, transparent communication, and code documented so your team can own it later.",
  },
];

const AboutSectionTwo = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[640px] -translate-y-1/2 rounded-full bg-primaryColor/[0.06] blur-[140px]"
      />

      <div className="container relative">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-5/12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="mx-auto mb-12 grid max-w-[500px] grid-cols-2 gap-4 sm:gap-5 lg:my-0 lg:ml-auto lg:mr-0 lg:max-w-[440px]"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/60 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primaryColor/40 hover:shadow-glowSoft sm:p-6"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primaryColor to-accentGreen opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    className="font-display text-3xl font-semibold sm:text-4xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #00d4c8, #4ade80)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <CountUp to={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-textColor sm:text-sm">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="w-full px-4 lg:w-7/12 lg:pl-16 xl:pl-24">
            <div className="max-w-[560px]">
              <SectionTitle
                title="How we build"
                paragraph="A clear, repeatable process that turns ambitious ideas into production software - without surprises along the way."
                mb="40px"
              />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.12 } },
                }}
                className="flex flex-col gap-6"
              >
                {pillars.map((pillar) => (
                  <motion.div
                    key={pillar.step}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-all duration-500 hover:border-darkBorder hover:bg-darkSurface/40 sm:gap-5 sm:p-4"
                  >
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-darkBorder bg-darkSurface/80 font-mono text-sm font-semibold text-primaryColor transition-all duration-500 group-hover:border-primaryColor/40 group-hover:bg-primaryColor group-hover:text-accentContrast group-hover:shadow-glowSoft sm:h-12 sm:w-12 sm:text-base">
                        {pillar.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-2 font-display text-xl font-semibold text-white sm:text-2xl lg:text-xl xl:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="text-base leading-relaxed text-textSecondary">
                        {pillar.paragraph}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
