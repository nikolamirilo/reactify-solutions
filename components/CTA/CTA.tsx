//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        <section className="mb-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[90vw] xl:max-w-screen-xl">
                <div className="relative overflow-hidden rounded-3xl border border-darkBorder bg-darkSurface/60 px-6 py-10 backdrop-blur-sm sm:px-10 sm:py-14 lg:grid lg:grid-cols-[32%,68%] lg:items-center lg:gap-12">
                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primaryColor/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accentGreen/10 blur-3xl pointer-events-none" />

                    <div className="relative max-w-[280px] mx-auto lg:mx-0 lg:max-w-[600px]">
                        <DotLottieReact
                            src="/animations/launch.lottie"
                            loop
                            autoplay
                        />
                    </div>

                    <div className="relative mt-6 lg:mt-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primaryColor shadow-[0_0_8px_rgba(0,212,200,0.8)]" />
                            ready when you are
                        </div>
                        <h2 className="font-display mt-4 mb-4 text-center lg:text-left text-3xl md:text-[40px] leading-[1.08] font-semibold text-white max-w-[600px] mx-auto lg:mx-0">
                            Want to build something amazing?{" "}
                            <span className="text-gradient-accent">Let&apos;s bring it to life.</span>
                        </h2>
                        <p className="mb-8 text-center lg:text-left text-textSecondary md:text-lg max-w-[600px] mx-auto lg:mx-0">
                            At Reactify Solutions, we turn your ideas into exceptional
                            applications. From concept to deployment, we are here to make your
                            vision a reality.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-8 py-4 text-lg font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
                            >
                                <FaRegCalendarAlt />
                                Schedule a call
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
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
                        primaryColor: "00d4c8",
                        textColor: "0a0e1a",
                    }}
                />
            )}
        </section>
    );
};

export default CTA;