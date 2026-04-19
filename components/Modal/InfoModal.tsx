//@ts-nocheck
"use client";
import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

const InfoModal = ({ message = "We received your answer", setIsOpen, isOpen }: { message?: string, setIsOpen: any, isOpen: boolean }) => {
    return (
        <div className='w-full top-0 left-0 h-screen fixed bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]'>
            <div className="relative bg-darkSurface border border-darkBorder rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-w-72 max-w-md">
                <div className="p-6 md:p-8 text-center">
                    <div className="mx-auto my-4 flex h-14 w-14 items-center justify-center rounded-full border border-primaryColor/30 bg-primaryColor/10">
                      <FaRegCheckCircle size={28} className='text-primaryColor' />
                    </div>
                    <h3 className="mb-6 text-base font-medium text-textSecondary max-w-[98vw] md:max-w-[460px]">{message}</h3>
                    <button type="button" className="w-full rounded-xl bg-primaryColor text-accentContrast font-semibold text-sm inline-flex items-center justify-center px-5 py-3 text-center transition-colors hover:bg-primaryDark" onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InfoModal