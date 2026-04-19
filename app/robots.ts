import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.APP_URL || "https://www.reactify-solutions.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/signin", "/signup", "/error", "/reach-out"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
