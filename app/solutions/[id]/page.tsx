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
import { MdOutlineMailOutline } from "react-icons/md";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const solution = solutionsData.find((s) => s.id === id);

  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: solution.name,
    description: solution.briefDescription,
    openGraph: {
      title: `${solution.name} - Reactify Solutions`,
      description: solution.briefDescription,
      images: [solution.images[0]],
      url: `/solutions/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.name} - Reactify Solutions`,
      description: solution.briefDescription,
      images: [solution.images[0]],
    },
  };
}

export default async function SolutionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const solution = solutionsData.find((s) => s.id === id);
  if (!solution) {
    notFound();
  }

  return (
    <div className="pb-16 pt-[120px] md:pt-[150px]">
      <div className="container max-w-6xl">
        {/* Hero Card */}
        <div className="dark:bg-transparent! mb-12 rounded-2xl bg-gradient-to-br py-8 dark:text-white md:py-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {solution.name}
          </h1>
          <p className="mb-8 text-xl opacity-90">{solution.tagline}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={solution.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-6 py-3 font-semibold text-white transition-colors hover:bg-primaryColor/90"
            >
              Visit Website
              <FaExternalLinkAlt className="h-4 w-4" />
            </Link>
            {solution.productUrl && solution.name == "Quicktalog" && (
              <Link
                href={`${solution.productUrl}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Pricing
                <FaShoppingCart className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {solution.stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-textColor/10 p-6 text-center transition-colors hover:border-primaryColor dark:border-white/10"
            >
              <div className="mb-2 text-3xl font-bold text-primaryColor md:text-4xl">
                {stat.value}
              </div>
              <div className="mb-1 text-lg font-semibold text-black dark:text-white">
                {stat.label}
              </div>
              <div className="text-base text-textColor/70 dark:text-white/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Image & Description */}
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-textColor/10 dark:border-white/10">
              <ImageCarousel
                images={solution.images}
                solutionName={solution.name}
              />
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
                About This Solution
              </h2>
              <p className="mb-6 text-base !leading-relaxed text-textColor dark:text-white/80 md:text-lg">
                {solution.fullDescription}
              </p>

              {/* Challenge & Solution */}
              <div className="space-y-6">
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                    The Challenge
                  </h3>
                  <p className="text-base !leading-relaxed text-textColor dark:text-white/80">
                    {solution.challenge}
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
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
            <div className="rounded-xl border border-textColor/10 p-6 dark:border-white/10">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Key Features
              </h3>
              <ul className="space-y-3">
                {solution.keyFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-base text-textColor dark:text-white/80"
                  >
                    <span className="mt-1 text-primaryColor">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="rounded-xl border border-textColor/10 p-6 dark:border-white/10">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {solution.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primaryColor/10 px-3 py-1.5 text-sm font-semibold text-primaryColor"
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
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">
            Core Functionalities
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {solution.functionalities.map((functionality, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-textColor/10 p-4 transition-colors hover:border-primaryColor dark:border-white/10"
              >
                <span className="mt-0.5 text-primaryColor">✓</span>
                <span className="text-base text-textColor dark:text-white/80">
                  {functionality}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-12 rounded-xl border border-primaryColor/20 bg-primaryColor/5 p-8 dark:bg-primaryColor/10 md:p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white md:text-4xl">
            Results & Impact
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {solution.results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg bg-white/50 p-4 dark:bg-black/20"
              >
                <span className="mt-0.5 flex-shrink-0 text-xl font-bold text-primaryColor">
                  ✓
                </span>
                <span className="text-base leading-relaxed text-textColor dark:text-white/90">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border-2 border-primaryColor/20 p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
            Ready to Build Your Own Solution?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base !leading-relaxed text-textColor dark:text-white/80 md:text-lg">
            Let's create something amazing together. Contact us to discuss your
            project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-8 py-3 font-semibold text-white transition-colors hover:bg-primaryColor/80"
          >
            Contact us
            <MdOutlineMailOutline className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
