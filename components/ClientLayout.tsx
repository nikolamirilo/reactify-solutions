"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "@/providers";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
        </Providers>
    );
}
