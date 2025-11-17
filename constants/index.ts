import { Client, Technology } from "@/types";
import { Resend } from "resend";

export const APP_URL = process.env.APP_URL!;
export const resend = new Resend(process.env.RESEND_API_KEY!);

export const technologiesData: Technology[] = [
  {
    name: "React.js",
    image: "/images/technologies/react.png",
  },
  {
    name: "Node.js",
    image: "/images/technologies/node.png",
  },
  {
    name: "Next.js",
    image: "/images/technologies/next.png",
  },
  {
    name: "Nest.js",
    image: "/images/technologies/nestjs.svg",
  },
  {
    name: "SQL",
    image: "/images/technologies/sql.png",
  },
  {
    name: "Tailwind",
    image: "/images/technologies/tailwind.png",
  },
  {
    name: "Python",
    image: "/images/technologies/python.png",
  },
  {
    name: "Cldouflare",
    image: "/images/technologies/cloudflare.png",
  },
  {
    name: "Wix",
    image: "/images/technologies/wix.png",
  },
  {
    name: "Shopify",
    image: "/images/technologies/shopify.png",
  },
  {
    name: "Microsoft Fabric",
    image: "/images/technologies/fabric.png",
  },
  {
    name: "Microsoft Power BI",
    image: "/images/technologies/powerbi.png",
  },
];
