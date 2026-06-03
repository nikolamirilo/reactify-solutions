"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    tag: "scope",
    title: "Scope",
    description:
      "A free call to pin down the problem, the scope and a realistic timeline. No sales pitch - you talk to the people who build.",
  },
  {
    number: "02",
    tag: "build",
    title: "Build",
    description:
      "A senior team - outsourced or embedded with yours - ships in weekly increments you can actually see and use.",
  },
  {
    number: "03",
    tag: "ship",
    title: "Ship & iterate",
    description:
      "We deploy to production and keep improving. Beyond the build, we challenge your assumptions and push the product further.",
  },
];

const Methodology = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

          {/* Left: label + heading */}
          <div className="lg:w-5/12 lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono mb-5 text-xs uppercase tracking-[0.2em] text-textDim"
            >
              / HOW WE WORK
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="font-display text-4xl font-semibold !leading-[1.08] text-textPrimary sm:text-5xl md:text-[48px]"
            >
              Idea to production in weeks, not months.
            </motion.h2>
          </div>

          {/* Right: vertical node steps */}
          <div className="lg:w-7/12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.13,
                }}
                className="flex gap-6"
              >
                {/* Node + connector */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primaryColor bg-accentContrast ring-4 ring-primaryColor/10">
                    <span className="font-mono text-[10px] font-semibold text-primaryColor">
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="mt-3 w-px flex-1 bg-gradient-to-b from-primaryColor/40 to-darkBorder"
                      style={{ minHeight: "56px" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={i < steps.length - 1 ? "pb-14 pt-1.5" : "pt-1.5"}>
                  <p className="font-mono mb-3 text-xs tracking-wider text-textDim">
                    {step.tag}
                  </p>
                  <h3 className="font-display mb-2 text-2xl font-semibold text-textPrimary">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-textColor">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Methodology;
