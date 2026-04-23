"use client";
import { Service } from "@/types";
import SpotlightCard from "../react-bits/SpotlightCard";
import ClickSpark from "../react-bits/ClickSpark";

const SingleService = ({ service }: { service: Service }) => {
  const { icon, title, paragraph } = service;
  return (
    <ClickSpark
      sparkColor="#00d4c8"
      sparkCount={10}
      sparkRadius={22}
      sparkSize={5}
      className="w-full"
    >
      <SpotlightCard
        spotlightColor="rgba(0, 212, 200, 0.22)"
        spotlightSize={360}
        className="group flex h-full flex-col items-center rounded-2xl border border-darkBorder bg-darkSurface/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-primaryColor/30 sm:items-start sm:p-8"
      >
        <div
          className="relative mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-2xl border border-darkBorder bg-darkSurface/80 text-primaryColor transition-all duration-500 ease-out group-hover:border-primaryColor/40 group-hover:bg-primaryColor group-hover:text-accentContrast group-hover:shadow-glow group-hover:-translate-y-1"
          style={{ animation: "iconPulse 3s ease-in-out infinite" }}
        >
          <span className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 inline-flex">
            {icon}
          </span>
        </div>
        <h3 className="font-display mb-3 text-center sm:text-left text-xl font-semibold text-white sm:text-2xl max-w-md lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-center sm:text-left text-base leading-relaxed text-textSecondary">
          {paragraph}
        </p>
      </SpotlightCard>
    </ClickSpark>
  );
};

export default SingleService;
