"use client";

import { motion } from "framer-motion";

const SectionTitle = ({
  title,
  paragraph,
  width = "600px",
  center,
  mb = "30px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className="font-display mb-4 text-3xl font-semibold !leading-[1.08] text-white sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      <p className="text-base !leading-relaxed text-textSecondary md:text-lg">
        {paragraph}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
