"use client";

import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useRef,
} from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  as?: "div" | "article" | "section";
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 212, 200, 0.22)",
  spotlightSize = 380,
  as = "div",
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  const style = {
    "--spotlight-color": spotlightColor,
    "--spotlight-size": `${spotlightSize}px`,
  } as CSSProperties;

  const Tag: any = as;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
