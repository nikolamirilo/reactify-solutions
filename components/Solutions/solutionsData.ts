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
        images: ["/images/solutions/quicktalog/quicktalog.png", "/images/solutions/quicktalog/quicktalog-builder.png", "/images/solutions/quicktalog/quicktalog-dashboard.png", "/images/solutions/quicktalog/quicktalog-analytics.png"],
        productUrl: "https://www.quicktalog.app",
        socialMedia: {
        },
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
            "Reduced catalog creation time from weeks to hours",
            "Eliminated printing costs, saving businesses up to 90% on catalog expenses",
            "Increased customer engagement by 85% through mobile-friendly catalogs",
            "Enabled real-time product updates, improving sales efficiency",
            "Provided actionable analytics, helping businesses optimize their product offerings",
            "Expanded market reach through multi-channel digital sharing",
        ],
    },

];

export default solutionsData;
