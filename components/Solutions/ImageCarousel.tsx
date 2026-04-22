"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface ImageCarouselProps {
  images: string[];
  solutionName: string;
  accentFrom?: string;
}

export default function ImageCarousel({
  images,
  solutionName,
  accentFrom = "#00d4c8",
}: ImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, images.length, paused]);

  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated">
        <Image
          src={images[0]}
          alt={solutionName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-cover"
          quality={75}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${solutionName} - slide ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover"
              quality={75}
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:-translate-y-[calc(50%+2px)] hover:bg-black/80 md:h-12 md:w-12"
        >
          <HiChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:-translate-y-[calc(50%+2px)] hover:bg-black/80 md:h-12 md:w-12"
        >
          <HiChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`block h-1.5 rounded-full transition-all ${
                active === i ? "w-7" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              style={active === i ? { backgroundColor: accentFrom } : {}}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:mt-4 md:gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all md:h-16 md:w-28 ${
              active === i
                ? "border-primaryColor/60 opacity-100"
                : "border-darkBorder opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
