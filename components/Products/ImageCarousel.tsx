"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface ImageCarouselProps {
  images: string[];
  productName: string;
  accentFrom?: string;
  orientation?: "landscape" | "portrait";
}

export default function ImageCarousel({
  images,
  productName,
  accentFrom = "#00d4c8",
  orientation = "landscape",
}: ImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isPortrait = orientation === "portrait";

  // In portrait mode the carousel is sized to the phone screenshot itself,
  // not stretched to the column width.
  const wrapperClass = isPortrait
    ? "relative mx-auto w-full max-w-[260px] sm:max-w-[280px]"
    : "relative w-full";
  const stageClass = isPortrait
    ? "relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated"
    : "relative aspect-video w-full overflow-hidden rounded-2xl border border-darkBorder bg-darkElevated";

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

  const slideSizes = isPortrait
    ? "(max-width: 640px) 70vw, 280px"
    : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw";

  const renderSlide = (src: string, alt: string, priority = false) => (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={slideSizes}
      className="object-cover"
      quality={isPortrait ? 95 : 75}
      priority={priority}
    />
  );

  if (images.length === 1) {
    return (
      <div className={wrapperClass}>
        <div className={stageClass}>
          {renderSlide(images[0], productName, true)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={stageClass}
        style={
          isPortrait
            ? {
                boxShadow: `0 30px 80px -30px ${accentFrom}55, 0 20px 50px -20px rgba(0,0,0,0.55)`,
              }
            : undefined
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {renderSlide(
              images[active],
              `${productName} - slide ${active + 1}`,
              active === 0,
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className={`absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:-translate-y-[calc(50%+2px)] hover:bg-black/80 ${
            isPortrait
              ? "left-2 h-8 w-8 md:h-9 md:w-9"
              : "left-3 h-10 w-10 md:h-12 md:w-12"
          }`}
        >
          <HiChevronLeft className={isPortrait ? "h-4 w-4" : "h-5 w-5 md:h-6 md:w-6"} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className={`absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:-translate-y-[calc(50%+2px)] hover:bg-black/80 ${
            isPortrait
              ? "right-2 h-8 w-8 md:h-9 md:w-9"
              : "right-3 h-10 w-10 md:h-12 md:w-12"
          }`}
        >
          <HiChevronRight className={isPortrait ? "h-4 w-4" : "h-5 w-5 md:h-6 md:w-6"} />
        </button>

        <div
          className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm ${
            isPortrait ? "bottom-3" : "bottom-4"
          }`}
        >
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

      {!isPortrait && (
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
      )}
    </div>
  );
}
