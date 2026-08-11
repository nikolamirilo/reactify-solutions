"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "@/providers";
import { useEffect } from "react";
import { clearStaleAssetRecovery } from "@/components/Common/ChunkErrorRecovery";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We got here, so the current deployment's assets loaded. Reset the
    // one-shot reload guard used by the error boundaries.
    useEffect(clearStaleAssetRecovery, []);

    return (
        <Providers>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
            <ScrollToTop />
        </Providers>
    );
}
