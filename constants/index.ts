import { Client, Technology } from "@/types";
// import { Resend } from "resend";

export const APP_URL = process.env.APP_URL!;
// export const resend = new Resend(process.env.RESEND_API_KEY!);

export const technologiesData: Technology[] = [
  // ── Languages ──
  {
    name: "JavaScript",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Python",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg",
    url: "https://www.python.org/",
  },
  // ── Markup & Styling ──
  {
    name: "HTML5",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/HTML5",
  },
  {
    name: "CSS3",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg",
    url: "https://www.w3.org/TR/CSS/#css",
  },
  {
    name: "Sass",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/sass-colored.svg",
    url: "https://sass-lang.com/",
  },
  // ── Frontend Frameworks ──
  {
    name: "React",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg",
    url: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg",
    url: "https://nextjs.org/docs",
  },
  {
    name: "Svelte",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/svelte-colored.svg",
    url: "https://svelte.dev/",
  },
  {
    name: "Solid",
    image: "https://www.solidjs.com/img/logo/without-wordmark/logo.svg",
    url: "https://www.solidjs.com/",
  },
  // ── CSS Frameworks & UI Libraries ──
  {
    name: "Tailwind CSS",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Bootstrap",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg",
    url: "https://getbootstrap.com/",
  },
  {
    name: "Material UI",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/materialui-colored.svg",
    url: "https://mui.com/",
  },
  // ── Backend Frameworks ──
  {
    name: "Node.js",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg",
    url: "https://nodejs.org/en/",
  },
  {
    name: "NestJS",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nestjs-colored.svg",
    url: "https://nestjs.com/",
  },
  {
    name: "FastAPI",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/fastapi-colored.svg",
    url: "https://fastapi.tiangolo.com/",
  },
  // ── Databases & BaaS ──
  {
    name: "MongoDB",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg",
    url: "https://www.mongodb.com/",
  },
  {
    name: "MySQL",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg",
    url: "https://www.mysql.com/",
  },
  {
    name: "PostgreSQL",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg",
    url: "https://www.postgresql.org/",
  },
  {
    name: "Redis",
    image: "https://www.svgrepo.com/show/303460/redis-logo.svg",
    url: "https://redis.io/",
  },
  {
    name: "Supabase",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/supabase-colored.svg",
    url: "https://supabase.io/",
  },
  {
    name: "Neon",
    image: "https://avatars.githubusercontent.com/u/77690634?v=4",
    url: "https://neon.com/",
  },
  {
    name: "Firebase",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/firebase-colored.svg",
    url: "https://firebase.google.com/",
  },
  // ── Cloud & Hosting ──
  {
    name: "AWS",
    image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/aws-icon.png",
    url: "https://aws.amazon.com",
  },
  {
    name: "Google Cloud",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/googlecloud-colored.svg",
    url: "https://cloud.google.com/",
  },
  {
    name: "Azure",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/azure-colored.svg",
    url: "https://azure.microsoft.com/",
  },
  {
    name: "Cloudflare",
    image: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/cloudflare.webp",
    url: "https://www.cloudflare.com/",
  },
  {
    name: "Railway",
    image: "https://railway.com/brand/logo-light.svg",
    url: "https://railway.app/",
  },
  // ── AI & ML ──
  {
    name: "OpenAI",
    image: "https://app.archbee.com/api/optimize/PL8X94efBsjvhfQV3wyyj-UUjn5uUTngOmDCOl0lrvW-20250814-103121.png",
    url: "https://openai.com/",
  },
  {
    name: "Gemini",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    url: "https://gemini.google.com/",
  },
  {
    name: "DeepSeek",
    image: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png",
    url: "https://www.deepseek.com/",
  },
  {
    name: "LangChain",
    image: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langsmith-color.png",
    url: "https://www.langchain.com/",
  },
  {
    name: "LangGraph",
    image: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png",
    url: "https://langchain-ai.github.io/langgraph/",
  },
  {
    name: "Vercel AI SDK",
    image: "https://ai-sdk.dev/apple-icon.png?6cd1287311014dd7",
    url: "https://ai-sdk.dev/",
  },
  {
    name: "Vertex AI",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Vertex_AI_Logo.svg/3840px-Vertex_AI_Logo.svg.png",
    url: "https://cloud.google.com/vertex-ai",
  },
  // ── Data & Analytics ──
  {
    name: "Power BI",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    url: "https://powerbi.microsoft.com/",
  },
  {
    name: "Microsoft Fabric",
    image: "https://static.wikia.nocookie.net/logopedia/images/a/aa/Microsoft_Fabric_2023.svg/revision/latest/scale-to-width-down/200?cb=20230528223239",
    url: "https://www.microsoft.com/en-us/microsoft-fabric",
  },
  {
    name: "Google Analytics",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg",
    url: "https://analytics.google.com/",
  },
  {
    name: "Hotjar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcByf7jTv3Ro7HN3y3ITLU1aRDEFUZYvvFBg&s",
    url: "https://www.hotjar.com/",
  },
  // ── Blockchain ──
  {
    name: "MetaMask",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/metamask-colored.svg",
    url: "https://metamask.io/",
  },
  // ── Design & Animation ──
  {
    name: "Figma",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/figma-colored.svg",
    url: "https://www.figma.com/",
  },
  {
    name: "Framer",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/framer-colored.svg",
    url: "https://framer.com",
  },
  {
    name: "Lottie",
    image: "https://cdn.iconscout.com/icon/free/png-256/free-lottiefiles-logo-icon-svg-download-png-4674917.png",
    url: "https://lottiefiles.com/",
  },
];
