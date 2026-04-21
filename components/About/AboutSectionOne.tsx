"use client";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const items = [
    "Delivery on time, budget & scope",
    "Customer-centric approach",
    "Innovative solutions",
    "Premium quality",
    "Continuous development & integration",
    "Modern technologies",
  ];

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="pb-16 md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Our Commitment"
                paragraph="We are Reactify Solutions, a company oriented on delivering exceptional digital solutions. We guarantee innovative and reliable services tailored to meet our clients' unique needs and drive their success. We can guarantee:"
              />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
                className="mb-12 max-w-[570px] lg:mb-0"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    {items.slice(0, 3).map((text) => (
                      <motion.p
                        key={text}
                        variants={{
                          hidden: { opacity: 0, x: -24 },
                          show: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        className="mb-5 flex items-center text-lg font-medium text-textColor"
                      >
                        <span className="bg-primaryColor text-primaryColor mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-opacity-10">
                          {checkIcon}
                        </span>
                        {text}
                      </motion.p>
                    ))}
                  </div>
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    {items.slice(3).map((text) => (
                      <motion.p
                        key={text}
                        variants={{
                          hidden: { opacity: 0, x: -24 },
                          show: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        className="mb-5 flex items-center text-lg font-medium text-textColor"
                      >
                        <span className="bg-primaryColor text-primaryColor mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-opacity-10">
                          {checkIcon}
                        </span>
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-[500px] lg:mr-0"
              >
                <DotLottieReact
                  src="https://lottie.host/a4ddbe4f-088f-45cc-b280-5ea643602553/wUNBZAJlCy.lottie"
                  loop
                  autoplay
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
