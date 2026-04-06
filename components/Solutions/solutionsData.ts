export interface Solution {
  id: string;
  name: string;
  tagline: string;
  briefDescription: string;
  fullDescription: string;
  images: string[];
  productUrl?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  technologies: string[];
  functionalities: string[];
  keyFeatures: string[];
  challenge: string;
  solution: string;
  results: string[];
}

const solutionsData: Solution[] = [
  {
    id: "quicktalog",
    name: "Quicktalog",
    tagline: "Create a Stunning Digital Catalog in Minutes",
    briefDescription:
      "AI-powered digital catalog platform that helps businesses create, share, and track mobile-friendly product catalogs instantly.",
    fullDescription:
      "Quicktalog is a comprehensive digital catalog platform designed for small and medium-sized businesses. It combines AI-powered content generation, OCR technology, and customizable templates to transform how businesses showcase their products. With real-time engagement tracking and seamless sharing capabilities, Quicktalog empowers businesses to improve sales efficiency and enhance customer experience.",
    images: [
      "/images/solutions/quicktalog/quicktalog-banner.png",
      "/images/solutions/quicktalog/quicktalog.png",
      "/images/solutions/quicktalog/quicktalog-builder.png",
      "/images/solutions/quicktalog/quicktalog-dashboard.png",
      "/images/solutions/quicktalog/quicktalog-analytics.png",
    ],
    productUrl: "https://www.quicktalog.app",
    socialMedia: {},
    stats: [
      {
        label: "Total Users",
        value: "1,400+",
        description: "Businesses and individuals using Quicktalog",
      },
      {
        label: "Catalogs Created",
        value: "400+",
        description: "Digital catalogs generated",
      },
      {
        label: "Catalogue Views",
        value: "100,000+",
        description: "Total views across all catalogs",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "OpenAI API",
      "Tesseract OCR",
      "AWS S3",
      "Vercel",
    ],
    functionalities: [
      "AI-powered content generation for product descriptions",
      "OCR technology for digitizing existing printed materials",
      "Drag-and-drop catalog builder with real-time preview",
      "Customizable templates with brand colors and logos",
      "Multi-channel sharing (WhatsApp, Email, Social Media, QR codes)",
      "Real-time engagement analytics and tracking",
      "Mobile-responsive catalog viewing experience",
      "Product categorization and search functionality",
      "Instant catalog updates without reprinting",
      "Export catalogs as PDF or shareable links",
    ],
    keyFeatures: [
      "AI-powered automatic content generation",
      "OCR for adding existing materials",
      "Customizable templates and branding",
      "Real-time engagement tracking",
      "Mobile-friendly catalog viewing",
      "Multi-channel sharing capabilities",
      "Instant updates and modifications",
      "Analytics dashboard",
    ],
    challenge:
      "Small and medium-sized businesses struggled with expensive and time-consuming traditional catalog printing. Updating product information required costly reprints, and businesses had no way to track customer engagement or measure catalog effectiveness. The lack of digital presence limited their reach and made it difficult to compete in an increasingly online marketplace.",
    solution:
      "We developed Quicktalog as an all-in-one digital catalog platform that eliminates printing costs and enables instant updates. By integrating AI-powered content generation, businesses can create professional product descriptions in seconds. The OCR feature allows them to digitize existing materials effortlessly. Customizable templates ensure brand consistency, while real-time analytics provide valuable insights into customer behavior and product popularity.",
    results: [
      "Reduced catalog creation time from hours to minutes",
      "Eliminated printing costs, saving businesses up to 90% on catalog expenses",
      "Increased customer engagement by 85% through mobile-friendly catalogs",
      "Enabled real-time product updates, improving sales efficiency",
      "Provided actionable analytics, helping businesses optimize their product offerings",
      "Expanded market reach through multi-channel digital sharing",
    ],
  },
  {
    id: "unbg",
    name: "unbg",
    tagline: "Remove Image Backgrounds Instantly & for Free",
    briefDescription:
      "AI-powered background removal tool that runs 100% in the browser. No uploads, no sign-ups, no watermarks - just instant transparent PNGs.",
    fullDescription:
      "unbg is a free, privacy-first background removal tool powered by AI that runs entirely in the user's browser. Unlike cloud-based alternatives like remove.bg, unbg never uploads images to any server - all processing happens locally using an ONNX neural network model. It supports batch processing, a before/after comparison slider, manual brush editing (erase & restore), and high-resolution PNG downloads. Built with Next.js 16 and React 19, it delivers a premium, responsive experience on desktop and mobile.",
    images: [
      "/images/solutions/unbg/unbg-banner.png",
      "/images/solutions/unbg/unbg-processing.png",
      "/images/solutions/unbg/unbg-edit.png",
    ],
    productUrl: "https://unbg.tech",
    socialMedia: {},
    stats: [
      {
        label: "Processing",
        value: "100%",
        description: "Runs entirely in the browser - zero server uploads",
      },
      {
        label: "Cost",
        value: "$0",
        description: "Completely free with no limits or watermarks",
      },
      {
        label: "Privacy",
        value: "Total",
        description: "Images never leave the user's device",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "@imgly/background-removal",
      "ONNX Runtime Web",
      "WebAssembly",
      "Canvas API",
      "Vercel",
    ],
    functionalities: [
      "AI-powered background removal running locally in the browser",
      "Batch processing - upload and process multiple images at once",
      "Before/after comparison slider with reveal animation",
      "Manual brush editor with erase and restore modes",
      "Adjustable brush size for fine-tuning results",
      "High-resolution transparent PNG downloads",
      "Batch download all processed images",
      "Drag-and-drop and gallery upload support",
      "Mobile-optimized with full touch support",
      "HEIC/HEIF auto-conversion for mobile gallery photos",
    ],
    keyFeatures: [
      "100% browser-based - no server uploads",
      "AI-powered precision with ONNX neural network",
      "Free forever with no watermarks or limits",
      "Batch processing for multiple images",
      "Before/after comparison slider",
      "Manual erase & restore brush editor",
      "Mobile-first responsive design",
      "PWA-ready with offline model caching",
    ],
    challenge:
      "Existing background removal tools like remove.bg require uploading images to external servers, raising privacy concerns. Free tiers are heavily limited - low resolution, watermarks, or daily caps. Mobile users face additional friction with unsupported formats (HEIC) and poor touch experiences. Businesses and individuals needed a truly free, private, and unlimited solution.",
    solution:
      "We built unbg to run AI background removal entirely in the browser using WebAssembly and the ONNX Runtime. The AI model downloads once (~80MB) and is cached for instant subsequent use. Images never leave the device, guaranteeing complete privacy. We added a full editing suite with a comparison slider and brush tools for manual refinement, batch processing for efficiency, and universal mobile support including automatic HEIC conversion.",
    results: [
      "Eliminated all server-side image processing - 100% client-side",
      "Zero cost to users - no subscriptions, credits, or watermarks",
      "Full-resolution output with no quality degradation",
      "Reduced background removal workflow from minutes to seconds",
      "Universal mobile compatibility across all browsers and devices",
      "Complete user privacy - images never transmitted over the network",
    ],
  },
];

export default solutionsData;
