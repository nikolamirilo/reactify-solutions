//@ts-nocheck
"use client";
import SectionTitle from "../Common/SectionTitle";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import solutionsData from "./solutionsData";

const Solutions = () => {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-28">
      <div className="container flex flex-col items-center justify-center">
        <SectionTitle
          title="Our Solutions"
          paragraph="We offer specialized solutions that can help your business digitalize and grow. Contact us for more information."
          center
        />

        {/* ① aspect-video on the outer wrapper, not on Carousel */}
        <div className="aspect-[20/10] w-full max-w-[1000px] overflow-hidden rounded-xl md:w-9/12">
          <Carousel
            className="h-full w-full" // ② Carousel fills the wrapper
            autoplay={true}
            autoplayDelay={10000}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className={`!absolute left-4 top-2/4 -translate-y-2/4 rounded-full bg-primaryColor hover:bg-primaryColor ${
                  solutionsData.length > 1 ? "" : "hidden"
                }`}
              >
                <MdOutlineKeyboardArrowLeft size={45} />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className={`!absolute !right-4 top-2/4 -translate-y-2/4 rounded-full bg-primaryColor hover:bg-primaryColor ${
                  solutionsData.length > 1 ? "" : "hidden"
                }`}
              >
                <MdOutlineKeyboardArrowRight size={45} />
              </IconButton>
            )}
            loop={true}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i
                        ? "w-8 bg-primaryColor"
                        : "w-4 bg-gray-400"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {solutionsData.map((solution, index) => (
              // ③ slides use h-full - they fill the carousel, not redefine it
              <Link
                href={`/solutions/${solution.id}`}
                key={index}
                className="group relative block h-full w-full"
              >
                <Image
                  src={solution.images[0]}
                  alt={solution.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
                  className="rounded-xl object-cover object-center"
                  quality={100} // ④ full quality
                  priority={index === 0} // ⑤ eager-load first slide
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end rounded-xl bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:p-10">
                  <h3 className="mb-2 translate-y-4 transform text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-y-0 md:mb-4 md:text-4xl">
                    {solution.name}
                  </h3>
                  <p className="mb-4 max-w-2xl translate-y-4 transform text-sm text-white/90 transition-transform delay-75 duration-500 group-hover:translate-y-0 md:mb-6 md:text-base">
                    {solution.briefDescription}
                  </p>
                  <button className="flex w-fit translate-y-4 transform items-center gap-2 rounded-lg bg-primaryColor px-6 py-3 font-semibold text-white transition-all delay-150 duration-500 hover:bg-primaryColor/90 group-hover:translate-y-0">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
