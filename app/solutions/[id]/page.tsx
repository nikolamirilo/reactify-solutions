//@ts-nocheck
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import solutionsData from "@/components/Solutions/solutionsData";
import ImageCarousel from "@/components/Solutions/ImageCarousel";
import { Metadata } from "next";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaExternalLinkAlt,
    FaShoppingCart,
} from "react-icons/fa";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const solution = solutionsData.find((s) => s.id === params.id);

    if (!solution) {
        return {
            title: "Solution Not Found",
        };
    }

    return {
        title: `${solution.name} - Reactify Solutions`,
        description: solution.briefDescription,
        openGraph: {
            title: `${solution.name} - Reactify Solutions`,
            description: solution.briefDescription,
            images: [solution.image],
        },
    };
}

export default function SolutionDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const solution = solutionsData.find((s) => s.id === params.id);

    if (!solution) {
        notFound();
    }

    return (
        <div className="pt-[120px] pb-16 md:pt-[150px]">
            <div className="container max-w-6xl">
                {/* Hero Card */}
                <div className="mb-12 rounded-2xl bg-gradient-to-br py-8 md:py-12 dark:bg-transparent! dark:text-white">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        {solution.name}
                    </h1>
                    <p className="mb-8 text-xl opacity-90">{solution.tagline}</p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={solution.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-6 py-3 font-semibold text-white hover:bg-primaryColor/90 transition-colors"
                        >
                            Visit Website
                            <FaExternalLinkAlt className="w-4 h-4" />
                        </Link>
                        {solution.productUrl && solution.name == "Quicktalog" && (
                            <Link
                                href={`${solution.productUrl}/pricing`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
                            >
                                Pricing
                                <FaShoppingCart className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {solution.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-textColor/10 dark:border-white/10 p-6 text-center hover:border-primaryColor transition-colors"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-primaryColor mb-2">
                                {stat.value}
                            </div>
                            <div className="text-lg font-semibold text-black dark:text-white mb-1">
                                {stat.label}
                            </div>
                            <div className="text-base text-textColor/70 dark:text-white/60">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column - Image & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-xl overflow-hidden border border-textColor/10 dark:border-white/10">
                            <ImageCarousel images={solution.images} solutionName={solution.name} />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                                About This Solution
                            </h2>
                            <p className="text-base !leading-relaxed text-textColor dark:text-white/80 md:text-lg mb-6">
                                {solution.fullDescription}
                            </p>

                            {/* Challenge & Solution */}
                            <div className="space-y-6">
                                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 border-l-4 border-red-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                        The Challenge
                                    </h3>
                                    <p className="text-base !leading-relaxed text-textColor dark:text-white/80">
                                        {solution.challenge}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 border-l-4 border-green-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                        Our Solution
                                    </h3>
                                    <p className="text-base !leading-relaxed text-textColor dark:text-white/80">
                                        {solution.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Features & Tech */}
                    <div className="space-y-8">
                        {/* Key Features */}
                        <div className="rounded-xl border border-textColor/10 dark:border-white/10 p-6">
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {solution.keyFeatures.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-base text-textColor dark:text-white/80"
                                    >
                                        <span className="text-primaryColor mt-1">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technologies */}
                        <div className="rounded-xl border border-textColor/10 dark:border-white/10 p-6">
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {solution.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-full bg-primaryColor/10 text-primaryColor text-sm font-semibold"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        {/* <div className="rounded-xl border border-textColor/10 dark:border-white/10 p-6">
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                                Connect
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {solution.socialMedia.facebook && (
                                    <Link
                                        href={solution.socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-colors"
                                    >
                                        <FaFacebook className="w-5 h-5" />
                                    </Link>
                                )}
                                {solution.socialMedia.instagram && (
                                    <Link
                                        href={solution.socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white transition-opacity"
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </Link>
                                )}
                                {solution.socialMedia.linkedin && (
                                    <Link
                                        href={solution.socialMedia.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white transition-colors"
                                    >
                                        <FaLinkedin className="w-5 h-5" />
                                    </Link>
                                )}
                                {solution.socialMedia.twitter && (
                                    <Link
                                        href={solution.socialMedia.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white transition-colors"
                                    >
                                        <FaTwitter className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Functionalities */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
                        Core Functionalities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {solution.functionalities.map((functionality, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 rounded-lg border border-textColor/10 dark:border-white/10 hover:border-primaryColor transition-colors"
                            >
                                <span className="text-primaryColor mt-0.5">✓</span>
                                <span className="text-base text-textColor dark:text-white/80">
                                    {functionality}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="rounded-xl bg-primaryColor/5 dark:bg-primaryColor/10 p-8 md:p-12 mb-12 border border-primaryColor/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8 text-center">
                        Results & Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {solution.results.map((result, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-black/20">
                                <span className="text-primaryColor text-xl font-bold mt-0.5 flex-shrink-0">✓</span>
                                <span className="text-base text-textColor dark:text-white/90 leading-relaxed">
                                    {result}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center rounded-2xl border-2 border-primaryColor/20 p-8">
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                        Ready to Build Your Own Solution?
                    </h2>
                    <p className="text-base !leading-relaxed text-textColor dark:text-white/80 md:text-lg mb-6 max-w-2xl mx-auto">
                        Let's create something amazing together. Contact us to discuss your
                        project.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primaryColor hover:bg-primaryColor/80 rounded-lg px-8 py-3 font-semibold text-white transition-colors"
                    >
                        Reach out

                    </Link>
                </div>
            </div>
        </div>
    );
}
