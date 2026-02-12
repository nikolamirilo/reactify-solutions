"use client";
import React, { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";

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
        <section>
            <div className="gap-8 items-center py-8 px-4 mx-auto xl:gap-16 lg:grid lg:grid-cols-[32%,68%] sm:py-16 lg:px-6 !max-w-[90vw] lg:max-w-screen-xl">
                <img
                    className="w-full rounded-lg hidden lg:block"
                    src="/images/development.png"
                    alt="dashboard image"
                />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white max-w-[600px]">
                        Want to Build Something Amazing? Let&apos;s Bring It to Life!
                    </h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400 max-w-[600px]">
                        At Reactify Solutions, we turn your ideas into exceptional
                        applications. From concept to deployment, we are here to make your
                        vision a reality.
                    </p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center text-white bg-primaryColor font-medium rounded-lg text-lg px-5 py-2.5 text-center hover:bg-opacity-90 transition-all"
                    >
                        Schedule a Call
                        <svg
                            className="ml-2 -mr-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
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