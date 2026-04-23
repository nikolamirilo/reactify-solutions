"use client";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { technologiesData } from "@/constants";
import LogoLoop, { LogoItem } from "../react-bits/LogoLoop";
import { Technology } from "@/types";

const Technologies = () => {
  const midpoint = Math.ceil(technologiesData.length / 2);
  const row1 = technologiesData.slice(0, midpoint);
  const row2 = technologiesData.slice(midpoint);

  const toLogoItems = (items: Technology[]): LogoItem[] =>
    items.map((brand) => ({
      src: brand.image,
      alt: brand.name,
      href: brand.url,
      node: <TechCardNode brand={brand} />,
    }));

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

      {/* react-bits LogoLoop — row 1 scrolls left */}
      <LogoLoop
        logos={toLogoItems(row1)}
        direction="left"
        speed={30}
        gap={24}
        logoHeight={64}
        pauseOnHover
        fadeOut
        fadeOutColor="#0a0e1a"
        scaleOnHover={false}
        className="mb-4 mt-6"
        ariaLabel="Technologies we use — row 1"
      />

      {/* react-bits LogoLoop — row 2 scrolls right */}
      <LogoLoop
        logos={toLogoItems(row2)}
        direction="right"
        speed={28}
        gap={24}
        logoHeight={64}
        pauseOnHover
        fadeOut
        fadeOutColor="#0a0e1a"
        scaleOnHover={false}
        ariaLabel="Technologies we use — row 2"
      />
    </section>
  );
};

export default Technologies;

const TechCardNode = ({ brand }: { brand: Technology }) => {
  const { image, name } = brand;
  const isNextLogo = image.includes("next");

  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-darkBorder bg-darkSurface/70 px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primaryColor/40 hover:bg-darkElevated hover:shadow-[0_0_30px_rgba(0,212,200,0.15)] md:px-8 md:py-6"
    >
      <div
        className={`relative flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16 ${
          isNextLogo ? "rounded-full border border-darkBorder bg-white p-1" : ""
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
      <div className="absolute inset-0 rounded-xl bg-primaryColor/0 transition-colors duration-300 group-hover:bg-primaryColor/[0.03]" />
    </div>
  );
};
