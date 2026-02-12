//@ts-nocheck
"use client";
import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

const InfoModal = ({ message = "We received your answer", setIsOpen, isOpen }: { message?: string, setIsOpen: any, isOpen: boolean }) => {
    return (
        <div className='w-full top-0 left-0 h-screen absolute bg-black/60 flex items-center justify-center z-10 '>
            <div className="relative dark:bg-dark bg-white rounded-lg shadow min-w-72">
                <div className="p-4 md:p-5 text-center">
                    <FaRegCheckCircle size={40} className='text-primaryColor mx-auto my-4' />
                    <h3 className="mb-5 text-lg font-normal dark:text-white text-dark max-w-[98vw] md:max-w-[500px]">{message}</h3>
                    <button type="button" className="text-white bg-primaryColor font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={() => {
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