"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  node?: ReactNode;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
}

const LogoLoop = ({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor = "#0a0e1a",
  scaleOnHover = true,
  className = "",
  ariaLabel = "Partner logos",
}: LogoLoopProps) => {
  const duration = `${Math.max(logos.length * (60 / speed), 10)}s`;
  const animName =
    direction === "left" ? "logoloop-left" : "logoloop-right";

  const renderLogo = (logo: LogoItem, i: number) => {
    const content = logo.node ?? (
      <div
        className="relative flex items-center justify-center"
        style={{ height: logoHeight, width: logoHeight }}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logoHeight}
          height={logoHeight}
          className="object-contain"
        />
      </div>
    );

    const inner = (
      <div
        className={`logoloop-item flex items-center justify-center ${
          scaleOnHover ? "transition-transform duration-300 hover:scale-110" : ""
        }`}
        style={{ marginRight: gap }}
        title={logo.alt}
      >
        {content}
      </div>
    );

    if (logo.href) {
      return (
        <a
          key={`logo-${i}`}
          href={logo.href}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0"
        >
          {inner}
        </a>
      );
    }
    return (
      <div key={`logo-${i}`} className="flex-shrink-0">
        {inner}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
      className={`logoloop relative overflow-hidden ${
        pauseOnHover ? "logoloop-pauseable" : ""
      } ${className}`}
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}
      <div
        className="logoloop-track flex w-max"
        style={{
          animation: `${animName} ${duration} linear infinite`,
        }}
      >
        {logos.map(renderLogo)}
        {logos.map((l, i) => renderLogo(l, i + logos.length))}
        {logos.map((l, i) => renderLogo(l, i + logos.length * 2))}
      </div>
    </motion.div>
  );
};

export default LogoLoop;
