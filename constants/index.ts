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

export const clientsData: Client[] = [
  {
    name: "Montre Shop",
    href: "https://www.montre-shop.com/",
    image: "/images/clients/Montre-removebg-preview.png",
  },
  {
    name: "Minexa.ai",
    href: "https://www.minexa.ai/",
    image: "/images/clients/Minexa.png",
  },
  {
    name: "Beauty By Claire",
    href: "https://beautybyclaire.rs/",
    image: "/images/clients/Claire-removebg-preview.png",
  },
  {
    name: "We Buy In Dubai",
    href: "https://webuyindubai.com/",
    image: "/images/clients/WeBuyInDubai-removebg-preview.png",
  },
  {
    name: "Swapabee",
    href: "https://play.google.com/store/apps/details?id=com.swapabee_20&hl=en_US&pli=1",
    image: "/images/clients/Swapabee-removebg-preview.png",
  },
  {
    name: "TicketFlow",
    href: "https://ticketflow.rs/",
    image: "/images/clients/TicketFlow-removebg-preview.png",
  },
  {
    name: "Arioso Investment AG",
    href: "https://arioso-investment-ag.netlify.app/",
    image: "/images/clients/Arioso_Investment-removebg-preview.png",
  },
];
