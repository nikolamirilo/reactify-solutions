import { Client, Technology } from "@/types";
// import { Resend } from "resend";

export const APP_URL = process.env.APP_URL!;
// export const resend = new Resend(process.env.RESEND_API_KEY!);

export const technologiesData: Technology[] = [
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
  {
    name: "Java",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/java-colored.svg",
    url: "https://www.oracle.com/java/",
  },
  {
    name: "HTML5",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/HTML5",
  },
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
    name: "CSS3",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg",
    url: "https://www.w3.org/TR/CSS/#css",
  },
  {
    name: "Sass",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/sass-colored.svg",
    url: "https://sass-lang.com/",
  },
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
  {
    name: "Redis",
    image: "https://www.svgrepo.com/show/303460/redis-logo.svg",
    url: "https://redis.io/",
  },
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
    name: "LangChain",
    image: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langsmith-color.png",
    url: "https://www.langchain.com/",
  },
  {
    name: "Vercel AI SDK",
    image: "https://ai-sdk.dev/apple-icon.png?6cd1287311014dd7",
    url: "https://ai-sdk.dev/",
  },
  {
    name: "LangGraph",
    image: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/langgraph-color.png",
    url: "https://langchain-ai.github.io/langgraph/",
  },
  {
    name: "Vertex AI",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Vertex_AI_Logo.svg/3840px-Vertex_AI_Logo.svg.png",
    url: "https://cloud.google.com/vertex-ai",
  },
  {
    name: "MetaMask",
    image: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/metamask-colored.svg",
    url: "https://metamask.io/",
  },
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
];
