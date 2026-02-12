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
    <>
      <section
        id="services"
        className="bg-primaryColor/[.03] border-b border-textColor/[.15] py-16 dark:border-white/[.15] md:py-20 lg:py-28"
      >
        <div className="container flex flex-col items-center justify-center">
          <SectionTitle
            title="Our Solutions"
            paragraph="We offer specialized solutions that can help your business digitalize and grow. Contact us for more information."
            center
          />

          <Carousel
            className="aspect-video w-[98vw] max-w-[1000px] rounded-xl md:w-9/12"
            autoplay={true}
            autoplayDelay={10000}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="bg-primaryColor hover:bg-primaryColor !absolute top-2/4 left-4 -translate-y-2/4 rounded-full"
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
                className="bg-primaryColor hover:bg-primaryColor !absolute top-2/4 !right-4 -translate-y-2/4 rounded-full"
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
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i
                      ? "bg-primaryColor w-8"
                      : "w-4 bg-gray-400"
                      }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {solutionsData.map((solution, index) => {
              return (
                <Link
                  href={`/solutions/${solution.id}`}
                  key={index}
                  className="group relative h-full w-full rounded-xl bg-cover bg-center block"
                >
                  <Image
                    src={solution.images[0]}
                    alt={solution.name}
                    fill
                    className="object-cover object-center rounded-xl"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-xl flex flex-col justify-end p-6 md:p-10">
                    <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {solution.name}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base mb-4 md:mb-6 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {solution.briefDescription}
                    </p>
                    <button className="bg-primaryColor hover:bg-primaryColor/90 text-white px-6 py-3 rounded-lg font-semibold w-fit transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 flex items-center gap-2">
                      View Details
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Solutions;
