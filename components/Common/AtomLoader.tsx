
import React from 'react';

const AtomLoader = () => {
    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Center Core */}
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_#00d8ff] z-10"></div>

            <div className="absolute w-full h-full atom-spinner">
                {/* Orbit 1 */}
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: 'rotateZ(0deg) rotateX(66deg)', transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute w-full h-full border-[3px] border-[#00d8ff] rounded-full opacity-80"></div>
                    <div className="absolute w-full h-full rounded-full" style={{ animation: 'electron-orbit 3s linear infinite' }}>
                        <div
                            className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00d8ff]"
                            style={{ transform: 'rotateX(-66deg)' }}
                        ></div>
                    </div>
                </div>

                {/* Orbit 2 */}
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: 'rotateZ(60deg) rotateX(66deg)', transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute w-full h-full border-[3px] border-[#00d8ff] rounded-full opacity-80"></div>
                    <div className="absolute w-full h-full rounded-full" style={{ animation: 'electron-orbit 3s linear infinite', animationDelay: '-1s' }}>
                        <div
                            className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00d8ff]"
                            style={{ transform: 'rotateX(-66deg)' }}
                        ></div>
                    </div>
                </div>

                {/* Orbit 3 */}
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: 'rotateZ(120deg) rotateX(66deg)', transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute w-full h-full border-[3px] border-[#00d8ff] rounded-full opacity-80"></div>
                    <div className="absolute w-full h-full rounded-full" style={{ animation: 'electron-orbit 3s linear infinite', animationDelay: '-2s' }}>
                        <div
                            className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00d8ff]"
                            style={{ transform: 'rotateX(-66deg)' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtomLoader;
