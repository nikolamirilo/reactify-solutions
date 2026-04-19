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
    <section
      className="overflow-hidden py-16 md:py-20 lg:py-28"
      id="technologies"
    >
      <div className="container flex flex-col items-center justify-center">
        <SectionTitle
          title="Technologies Stack"
          paragraph="We continuously strive to stay at the forefront of technology, always adopting the latest advancements to deliver the best solutions."
          center
        />
      </div>

      {/* Marquee Row 1 - scrolls left */}
      <div className="relative mb-4 mt-6">
        {/* Fade edges */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-dark to-transparent md:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-dark to-transparent md:w-40" />

        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1, ...row1].map((brand, i) => (
            <TechCard key={`row1-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - scrolls right */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-dark to-transparent md:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-dark to-transparent md:w-40" />

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
    <div className="mx-3 flex-shrink-0 md:mx-4">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-darkBorder bg-darkSurface/70 px-6 py-5 backdrop-blur-sm
        transition-all duration-300 hover:-translate-y-1 hover:border-primaryColor/40 hover:bg-darkElevated hover:shadow-[0_0_30px_rgba(0,212,200,0.15)]
        md:px-8 md:py-6
        ${image.includes("next") ? "" : ""}`}
      >
        <div
          className={`relative flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16 ${
            image.includes("next")
              ? "rounded-full border border-darkBorder bg-white p-1"
              : ""
          }`}
        >
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <span className="whitespace-nowrap text-xs font-medium text-textColor transition-colors duration-300 group-hover:text-primaryColor md:text-sm">
          {name}
        </span>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-primaryColor/0 transition-colors duration-300 group-hover:bg-primaryColor/[0.03]" />
      </a>
    </div>
  );
};
