"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import SectionTitle from "../Common/SectionTitle";
import productsData from "./productsData";
import ProductShowcaseCard from "./ProductShowcaseCard";
import ProductSelector from "./ProductSelector";
import AutoRotateProgress from "./AutoRotateProgress";

const ROTATE_MS = 7000;

const Products = () => {
  const products = useMemo(
    () => productsData.filter((product) => product.visible),
    []
  );
  const count = products.length;

  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

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
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (count === 0) return null;

  const activeProduct = products[active];
  const autoplay = !prefersReducedMotion && count > 1;

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
    >
      {/* Static radial glow - cheaper than a large blur filter on weak GPUs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[880px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--color-accent) / 0.10), transparent)",
        }}
      />

      <div className="container relative flex flex-col items-center justify-center">
        <SectionTitle
          title="Our Products"
          paragraph="We don't just ship client work - we build and run our own production-grade products. Explore the platforms we've launched, the problems they solve, and the impact they deliver."
          center
        />

        <div
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
                <ProductShowcaseCard
                  product={activeProduct}
                  priority={active === 0}
                />
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

        <Link
          href="/products"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-darkBorder bg-darkSurface/60 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-primaryColor/40 hover:bg-darkSurface md:mt-10"
        >
          Browse all products
          <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default Products;
