"use client";

import { CSSProperties } from "react";

interface AuroraProps {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

const Aurora = ({
  colorStops = ["#00d4c8", "#4ade80", "#00a89e"],
  amplitude = 1,
  blend = 0.5,
  speed = 1,
  className = "",
}: AuroraProps) => {
  const [c1, c2, c3] = colorStops;
  const duration = `${18 / speed}s`;
  const spread = 40 * amplitude;

  const style = {
    "--aurora-c1": c1,
    "--aurora-c2": c2,
    "--aurora-c3": c3,
    "--aurora-duration": duration,
    "--aurora-blend": blend,
    "--aurora-spread": `${spread}%`,
  } as CSSProperties;

  return (
    <div
      aria-hidden
      className={`aurora-root pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={style}
    >
      <div className="aurora-ribbon aurora-ribbon-1" />
      <div className="aurora-ribbon aurora-ribbon-2" />
      <div className="aurora-ribbon aurora-ribbon-3" />
    </div>
  );
};

export default Aurora;
