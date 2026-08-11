"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProductShowcaseCard from "./ProductShowcaseCard";
import ProductSelector from "./ProductSelector";
import AutoRotateProgress from "./AutoRotateProgress";
import type { ProductPreview } from "./productPreview";

const ROTATE_MS = 7000;

/**
 * The interactive half of the products section. Receives plain preview objects
 * from the server component so the full product catalogue stays out of the
 * browser bundle.
 */
const ProductsCarousel = ({ products }: { products: ProductPreview[] }) => {
  const count = products.length;

  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const next = useCallback(
    () => setActive((index) => (index + 1) % count),
    [count]
  );
  const prev = useCallback(
    () => setActive((index) => (index - 1 + count) % count),
    [count]
  );
  const goTo = useCallback(
    (index: number) => setActive(((index % count) + count) % count),
    [count]
  );

  // Only auto-rotate while the section is on screen - saves work on low-end
  // devices and avoids advancing slides the visitor can't see.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const activeProduct = products[active];
  const autoplay = !prefersReducedMotion && count > 1;

  return (
    <div
      ref={containerRef}
      className="mt-6 w-full md:mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative"
        role="group"
        aria-roledescription="carousel"
        aria-label="Our products"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeProduct.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductShowcaseCard product={activeProduct} priority={active === 0} />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <ProductSelector
          products={products}
          active={active}
          onSelect={goTo}
          onPrev={prev}
          onNext={next}
          progressSlot={
            autoplay ? (
              <AutoRotateProgress
                duration={ROTATE_MS}
                paused={paused || !inView}
                resetKey={active}
                onComplete={next}
              />
            ) : null
          }
        />
      )}
    </div>
  );
};

export default ProductsCarousel;
