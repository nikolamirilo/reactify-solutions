export interface SolutionStat {
  label: string;
  value: string;
  description: string;
}

export interface SolutionPricingTier {
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
}

export interface SolutionUseCase {
  title: string;
  description: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionTimelineStep {
  phase: string;
  detail: string;
}

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: "live" | "beta" | "coming-soon";
  launchYear: string;
  briefDescription: string;
  fullDescription: string;
  images: string[];
  productUrl?: string;
  accentFrom: string;
  accentTo: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats: SolutionStat[];
  technologies: string[];
  functionalities: string[];
  keyFeatures: string[];
  targetAudience: string[];
  useCases: SolutionUseCase[];
  pricing?: SolutionPricingTier[];
  timeline: SolutionTimelineStep[];
  challenge: string;
  solution: string;
  results: string[];
  faq: SolutionFaq[];
}

const solutionsData: Solution[] = [
  {
    id: "quicktalog",
    name: "Quicktalog",
    tagline: "Create a Stunning Digital Catalog in Minutes",
    category: "SaaS · AI Catalog Builder",
    status: "live",
    launchYear: "2024",
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
    accentFrom: "#00d4c8",
    accentTo: "#4ade80",
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
        value: "100K+",
        description: "Total views across all catalogs",
      },
      {
        label: "Time To Launch",
        value: "< 5 min",
        description: "From idea to live, shareable catalog",
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
    targetAudience: [
      "Restaurants and cafes replacing printed menus",
      "Retailers running weekly promotions",
      "Service providers showcasing packages",
      "Event organizers and pop-up vendors",
      "Wholesalers with constantly changing pricing",
    ],
    useCases: [
      {
        title: "Restaurant menus",
        description:
          "Update prices and daily specials instantly, share via QR code on tables.",
      },
      {
        title: "Retail price lists",
        description:
          "Distribute via WhatsApp to customers and track which items drive the most views.",
      },
      {
        title: "Service packages",
        description:
          "Present tiered offerings with rich media, testimonials, and instant contact actions.",
      },
      {
        title: "Event catalogs",
        description:
          "Build vendor or schedule catalogs that update in real time as things change.",
      },
    ],
    pricing: [
      {
        name: "Starter",
        price: "Free",
        features: [
          "1 catalog",
          "3 categories · 15 items",
          "500 monthly views",
          "No credit card required",
        ],
      },
      {
        name: "Pro",
        price: "Paid",
        highlight: true,
        features: [
          "6 catalogs",
          "15 categories · 100 items",
          "5,000 monthly views",
          "10 AI generations",
        ],
      },
      {
        name: "Premium",
        price: "Paid",
        features: [
          "50 catalogs",
          "50 categories · 300 items",
          "40,000 monthly views",
          "Unlimited AI generations",
        ],
      },
    ],
    timeline: [
      {
        phase: "Discovery",
        detail:
          "Interviewed 40+ SMB owners to map friction around printed catalogs and last-minute price changes.",
      },
      {
        phase: "Design",
        detail:
          "Designed a drag-and-drop builder optimised for non-technical users, with mobile-first previews.",
      },
      {
        phase: "Build",
        detail:
          "Shipped an AI content generator, OCR pipeline, and analytics dashboard on Next.js + PostgreSQL.",
      },
      {
        phase: "Scale",
        detail:
          "Grew to 1,400+ users and 100K catalog views with zero paid acquisition.",
      },
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
    faq: [
      {
        question: "How is this different from a website?",
        answer:
          "Quicktalog is purpose-built for catalogs and price lists. You can launch in minutes, update prices in real time, and share via QR code or link — no hosting, domains, or web design required.",
      },
      {
        question: "Do I need any technical skills to use it?",
        answer:
          "No. The drag-and-drop builder and AI content generator are designed for non-technical users. If you can write an email, you can build a catalog.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most customers go from sign-up to a live, shareable catalog in under five minutes.",
      },
      {
        question: "How do my customers open the catalog?",
        answer:
          "They simply tap a shared link or scan a QR code. No app downloads, no sign-ups, fully mobile-optimised.",
      },
    ],
  },
  {
    id: "unbg",
    name: "unbg",
    tagline: "Remove Image Backgrounds Instantly & for Free",
    category: "Privacy-First AI Tool",
    status: "live",
    launchYear: "2025",
    briefDescription:
      "AI-powered background removal tool that runs 100% in the browser. No uploads, no sign-ups, no watermarks — just instant transparent PNGs.",
    fullDescription:
      "unbg is a free, privacy-first background removal tool powered by AI that runs entirely in the user's browser. Unlike cloud-based alternatives like remove.bg, unbg never uploads images to any server — all processing happens locally using an ONNX neural network model. It supports batch processing, a before/after comparison slider, manual brush editing (erase & restore), and high-resolution PNG downloads. Built with Next.js 16 and React 19, it delivers a premium, responsive experience on desktop and mobile.",
    images: [
      "/images/solutions/unbg/unbg-banner.png",
      "/images/solutions/unbg/unbg-processing.png",
      "/images/solutions/unbg/unbg-edit.png",
    ],
    productUrl: "https://unbg.tech",
    accentFrom: "#4ade80",
    accentTo: "#00d4c8",
    socialMedia: {},
    stats: [
      {
        label: "Processing",
        value: "100%",
        description: "Runs entirely in the browser — zero server uploads",
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
      {
        label: "Max File Size",
        value: "20 MB",
        description: "Supports PNG, JPG, WEBP, HEIC uploads",
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
      "Batch processing — upload and process multiple images at once",
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
      "100% browser-based — no server uploads",
      "AI-powered precision with ONNX neural network",
      "Free forever with no watermarks or limits",
      "Batch processing for multiple images",
      "Before/after comparison slider",
      "Manual erase & restore brush editor",
      "Mobile-first responsive design",
      "PWA-ready with offline model caching",
    ],
    targetAudience: [
      "E-commerce sellers needing fast product shots",
      "Content creators on Instagram, TikTok, YouTube",
      "Designers working in Figma, Canva or Photoshop",
      "Photographers building composites",
      "Real estate agents staging listings",
    ],
    useCases: [
      {
        title: "E-commerce listings",
        description:
          "Clean product shots for Amazon, Shopify, Etsy and eBay in seconds — no subscription required.",
      },
      {
        title: "Social content",
        description:
          "Cut out subjects for Instagram Reels, TikTok thumbnails, and YouTube covers without leaving the browser.",
      },
      {
        title: "Design workflows",
        description:
          "Drop transparent PNGs straight into Figma, Canva or presentation decks.",
      },
      {
        title: "Photography",
        description:
          "Headshots, passport photos, and composites with pixel-level brush refinement.",
      },
    ],
    timeline: [
      {
        phase: "Research",
        detail:
          "Benchmarked cloud-based tools for speed, privacy, and cost. Identified ONNX Runtime Web as a viable local alternative.",
      },
      {
        phase: "Prototype",
        detail:
          "Built a WASM pipeline that downloaded and cached an 80MB AI model entirely on the client.",
      },
      {
        phase: "Launch",
        detail:
          "Added batch processing, brush tools, comparison slider and mobile HEIC conversion.",
      },
      {
        phase: "Polish",
        detail:
          "Shipped a PWA with offline model caching, full touch support, and drag-and-drop batch uploads.",
      },
    ],
    challenge:
      "Existing background removal tools like remove.bg require uploading images to external servers, raising privacy concerns. Free tiers are heavily limited — low resolution, watermarks, or daily caps. Mobile users face additional friction with unsupported formats (HEIC) and poor touch experiences. Businesses and individuals needed a truly free, private, and unlimited solution.",
    solution:
      "We built unbg to run AI background removal entirely in the browser using WebAssembly and the ONNX Runtime. The AI model downloads once (~80MB) and is cached for instant subsequent use. Images never leave the device, guaranteeing complete privacy. We added a full editing suite with a comparison slider and brush tools for manual refinement, batch processing for efficiency, and universal mobile support including automatic HEIC conversion.",
    results: [
      "Eliminated all server-side image processing — 100% client-side",
      "Zero cost to users — no subscriptions, credits, or watermarks",
      "Full-resolution output with no quality degradation",
      "Reduced background removal workflow from minutes to seconds",
      "Universal mobile compatibility across all browsers and devices",
      "Complete user privacy — images never transmitted over the network",
    ],
    faq: [
      {
        question: "Is it really free, with no catch?",
        answer:
          "Yes. There are no credit systems, daily limits, or watermarks. All processing happens in your browser, which is why we can offer it completely free.",
      },
      {
        question: "Where do my images go?",
        answer:
          "Nowhere. They never leave your device. The AI runs locally using WebAssembly — we have no servers that receive your images.",
      },
      {
        question: "Why does the first image take longer?",
        answer:
          "On first use, the browser downloads the ~80MB AI model and caches it. After that, every subsequent image is processed in seconds, even offline.",
      },
      {
        question: "Does it work on mobile?",
        answer:
          "Yes. unbg is fully mobile-optimised with touch support and automatic HEIC/HEIF conversion for photos taken on iPhone.",
      },
    ],
  },
];

export default solutionsData;
