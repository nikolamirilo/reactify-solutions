"use client";

import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

interface ImageCarouselProps {
  images: string[];
  solutionName: string;
}

export default function ImageCarousel({
  images,
  solutionName,
}: ImageCarouselProps) {
  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={images[0]}
          alt={solutionName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-cover"
          quality={100}
          priority
        />
      </div>
    );
  }

  return (
    // ① aspect-video lives HERE so the carousel inherits a defined height
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <Carousel
        // ② fill the outer wrapper completely - no internal padding/margin
        className="h-full w-full"
        autoplay={true}
        autoplayDelay={5000}
        loop={true}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <button
            onClick={handlePrev}
            className="!absolute left-4 top-2/4 -translate-y-2/4 rounded-full bg-white/80 p-2 transition-colors hover:bg-white dark:bg-black/80 dark:hover:bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 text-black dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button
            onClick={handleNext}
            className="!absolute right-4 top-2/4 -translate-y-2/4 rounded-full bg-white/80 p-2 transition-colors hover:bg-white dark:bg-black/80 dark:hover:bg-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 text-black dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      >
        {images.map((img, index) => (
          // ③ slides are h-full/w-full - they fill the carousel, not re-define it
          <div key={index} className="relative h-full w-full">
            <Image
              src={img}
              alt={`${solutionName} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain"
              quality={100}
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
