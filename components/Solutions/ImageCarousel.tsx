"use client";

import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

interface ImageCarouselProps {
    images: string[];
    solutionName: string;
}

export default function ImageCarousel({ images, solutionName }: ImageCarouselProps) {
    if (images.length === 1) {
        return (
            <div className="relative aspect-video w-full">
                <Image
                    src={images[0]}
                    alt={solutionName}
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />
            </div>
        );
    }

    return (
        <Carousel
            className="rounded-xl"
            autoplay={true}
            autoplayDelay={5000}
            loop={true}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            prevArrow={({ handlePrev }) => (
                <button
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full bg-white/80 dark:bg-black/80 p-2 hover:bg-white dark:hover:bg-black transition-colors"
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
                    className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full bg-white/80 dark:bg-black/80 p-2 hover:bg-white dark:hover:bg-black transition-colors"
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
                <div key={index} className="relative aspect-video w-full">
                    <Image
                        src={img}
                        alt={`${solutionName} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={100}
                        priority={index === 0}
                    />
                </div>
            ))}
        </Carousel>
    );
}
