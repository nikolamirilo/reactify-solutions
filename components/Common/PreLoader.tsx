"use client";
import React, { useEffect, useState } from "react";
import AtomLoader from "./AtomLoader";

const PreLoader = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
            <AtomLoader />
        </div>
    );
};

export default PreLoader;
