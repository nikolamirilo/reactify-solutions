"use client";
import { clientsData } from "@/constants/client";
import { useState } from "react";

const SectionTitle = ({ title, paragraph, center }) => (
  <div className={`mb-12 max-w-3xl ${center ? "text-center" : ""}`}>
    <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl">
      {title}
    </h2>
    <p className="text-base text-textColor dark:text-textColor/80 sm:text-lg">
      {paragraph}
    </p>
  </div>
);

const SingleClient = ({ client, delay }) => {
  const { href, image, name } = client;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group p-2"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="
          relative flex h-40 w-56 items-center justify-center
          overflow-hidden rounded-3xl border border-primaryColor/20
          bg-white p-8 shadow-one transition-all duration-500
          hover:-translate-y-2 hover:shadow-xl
          dark:border-white/10 dark:bg-dark
          sm:h-44 sm:w-64 lg:h-48 lg:w-72
        "
        aria-label={`Visit ${name} website`}
      >
        {/* Hover primary tint */}
        <div
          className={`
            absolute inset-0 rounded-3xl bg-primaryColor
            opacity-0 transition-opacity duration-500
            ${isHovered ? "opacity-[0.08]" : ""}
          `}
        />

        {/* Logo */}
        <div
          className={`
            relative z-10 transition-all duration-500
            ${
              isHovered
                ? "scale-105 opacity-100"
                : "scale-100 opacity-70 grayscale"
            }
          `}
        >
          <img
            src={image}
            alt={name}
            width={name === "Minexa.ai" ? 140 : 200}
            height={140}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Shine */}
        <div
          className={`
            absolute inset-0 -translate-x-full transform
            rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent
            transition-transform duration-700
            ${isHovered ? "translate-x-full" : ""}
          `}
        />

        {/* Bottom highlight */}
        <div
          className="
            absolute bottom-0 left-0 right-0 h-1
            bg-primaryColor/60 opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        />
      </a>
    </div>
  );
};

const Clients = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-primaryColor/[.05] py-16  md:py-20 lg:px-12 lg:py-28">
          <div className="relative flex flex-col items-center justify-center">
            <SectionTitle
              title="Our Clients"
              paragraph="We collaborate with companies that value quality engineering, clean design, and long-term digital solutions."
              center
            />

            <div className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                {clientsData.map((client, idx) => (
                  <SingleClient key={idx} client={client} delay={idx * 100} />
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-10 text-center opacity-80">
              <div>
                <p className="text-3xl font-bold text-dark dark:text-white">
                  50+
                </p>
                <p className="text-sm text-textColor">Clients</p>
              </div>

              <div className="h-12 w-px bg-primaryColor/20" />

              <div>
                <p className="text-3xl font-bold text-dark dark:text-white">
                  200+
                </p>
                <p className="text-sm text-textColor">Delivered Projects</p>
              </div>

              <div className="h-12 w-px bg-primaryColor/20" />

              <div>
                <p className="text-3xl font-bold text-dark dark:text-white">
                  98%
                </p>
                <p className="text-sm text-textColor">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
