//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const CTA = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Wait for the component to be mounted before setting the root element
        if (typeof window !== "undefined") {
            setRootElement(document.getElementById("root") || document.body);
        }
    }, []);

    return (
        <section className="mb-16 overflow-hidden bg-base-300 bg-opacity-5">
            <div className="gap-8 items-center py-8 px-4 mx-auto xl:gap-16 lg:grid lg:grid-cols-[32%,68%] sm:py-8 lg:px-6 max-w-[90vw] xl:max-w-screen-xl">
                <div className="max-w-[280px] mx-auto lg:mx-0 lg:max-w-[600px]">
                    <DotLottieReact
                        src="/animations/launch.lottie"
                        loop
                        autoplay
                    />
                </div>

                <div className="mt-6 lg:mt-0">
                    <h2 className="mb-4 text-center lg:text-left text-2xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white max-w-[600px] mx-auto lg:mx-0">
                        Want to Build Something Amazing? Let&apos;s Bring It to Life!
                    </h2>
                    <p className="mb-6 text-center lg:text-left font-light text-gray-500 md:text-lg dark:text-gray-400 max-w-[600px] mx-auto lg:mx-0">
                        At Reactify Solutions, we turn your ideas into exceptional
                        applications. From concept to deployment, we are here to make your
                        vision a reality.
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center text-white bg-primaryColor font-medium rounded-lg text-lg px-5 py-2.5 text-center hover:bg-opacity-90 transition-all"
                        >
                            Schedule a Call
                            <FaRegCalendarAlt className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
            {rootElement && (
                <PopupModal
                    url="https://calendly.com/reactify-developer/30min"
                    onModalClose={() => setIsOpen(false)}
                    open={isOpen}
                    rootElement={rootElement}
                    pageSettings={{
                        backgroundColor: "#ffff",
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: "1B998B",
                        textColor: "1D2144",
                    }}
                />
            )}
        </section>
    );
};

export default CTA;