"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  className?: string;
  disabled?: boolean;
}

const Magnet = ({
  children,
  padding = 80,
  magnetStrength = 3,
  className = "",
  disabled = false,
}: MagnetProps) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 18, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const inactive = disabled || prefersReducedMotion;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (inactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const distX = e.clientX - (rect.left + rect.width / 2);
    const distY = e.clientY - (rect.top + rect.height / 2);
    const maxDist = Math.max(rect.width, rect.height) / 2 + padding;
    const dist = Math.hypot(distX, distY);
    if (dist < maxDist) {
      const factor = (1 - dist / maxDist) / magnetStrength;
      x.set(distX * factor);
      y.set(distY * factor);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={inactive ? undefined : { x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
