"use client";

import { CSSProperties } from "react";

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
  baseColor?: string;
  shineColor?: string;
}

const ShinyText = ({
  text,
  speed = 4,
  className = "",
  baseColor,
  shineColor = "rgba(255, 255, 255, 0.9)",
}: ShinyTextProps) => {
  const style = {
    "--shiny-duration": `${speed}s`,
    "--shiny-shine": shineColor,
    ...(baseColor ? { color: baseColor } : {}),
  } as CSSProperties;

  return (
    <span
      className={`shiny-text inline-block bg-clip-text ${className}`}
      style={style}
    >
      {text}
    </span>
  );
};

export default ShinyText;
