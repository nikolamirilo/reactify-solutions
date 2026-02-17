"use client";
import { Technology } from "@/types";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { technologiesData } from "@/constants";

const Technologies = () => {
  // Split data into two rows for the marquee
  const midpoint = Math.ceil(technologiesData.length / 2);
  const row1 = technologiesData.slice(0, midpoint);
  const row2 = technologiesData.slice(midpoint);

  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-hidden" id="technologies">
      <div className="container flex flex-col items-center justify-center">
        <SectionTitle
          title="Technologies Stack"
          paragraph="We continuously strive to stay at the forefront of technology, always adopting the latest advancements to deliver the best solutions."
          center
        />
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="relative mt-6 mb-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white dark:from-[#1D2144] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white dark:from-[#1D2144] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1, ...row1].map((brand, i) => (
            <TechCard key={`row1-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white dark:from-[#1D2144] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white dark:from-[#1D2144] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2, ...row2].map((brand, i) => (
            <TechCard key={`row2-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;

const TechCard = ({ brand }: { brand: Technology }) => {
  const { image, name, url } = brand;

  return (
    <div className="flex-shrink-0 mx-3 md:mx-4">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-5 md:px-8 md:py-6 transition-all duration-300
        bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-dark/5 dark:border-white/10
        hover:bg-white dark:hover:bg-white/10 hover:shadow-[0_0_30px_rgba(27,153,139,0.15)] hover:border-primaryColor/30 hover:scale-105
        ${image.includes("next") ? "" : ""}`}
      >
        <div className={`relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${image.includes("next") ? "bg-white rounded-full p-1 border border-dark/10" : ""}`}>
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <span className="text-xs md:text-sm font-medium text-textColor group-hover:text-primaryColor transition-colors duration-300 whitespace-nowrap">
          {name}
        </span>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-primaryColor/0 group-hover:bg-primaryColor/[0.03] transition-colors duration-300" />
      </a>
    </div>
  );
};
