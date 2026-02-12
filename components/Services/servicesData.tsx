import {
  MonitorSmartphone,
  BrainCircuit,
  BarChart2,
  Zap,
  Briefcase,
  Smartphone,
} from "lucide-react";

const servicesData = [
  {
    id: 1,
    icon: <MonitorSmartphone size={40} />,
    title: "Web & Mobile Development",
    paragraph:
      "We specialize in building high-performance, reliable Progressive Web and Mobile Applications that deliver seamless experiences across all devices. Our PWAs are fast, secure, and engaging, ensuring users can access your services anywhere, anytime.",
  },
  {
    id: 2,
    icon: <BrainCircuit size={40} />,
    title: "AI Development",
    paragraph:
      "We build AI-powered solutions that automate processes, analyze data, and create intelligent user experiences. Our services include LLM integration, AI agents, chatbots, and custom automation tailored to your business needs.",
  },

  {
    id: 3,
    icon: <BarChart2 size={40} />,
    title: "Data Analytics",
    paragraph:
      "We deliver end-to-end data analytics solutions, from building full dataflows using Microsoft Fabric to creating insightful dashboards in Power BI. Our analytics turn raw information into actionable insights that power smarter decisions.",
  },
  {
    id: 4,
    icon: <Zap size={40} />,
    title: "Automations",
    paragraph:
      "We streamline operations through workflow automation, system integrations, and data synchronization. Our solutions reduce manual work, minimize errors, and improve operational efficiency.",
  },
  {
    id: 5,
    icon: <Briefcase size={40} />,
    title: "Business Consulting",
    paragraph:
      "Our consulting services help you optimize operations, streamline processes, and create strategies that support long-term growth. We work closely with your team to align technology, workflows, and business goals.",
  },
  {
    id: 6,
    icon: <Smartphone size={40} />,
    title: "Mobile Development",
    paragraph:
      "We build modern mobile applications for both iOS and Android. Our apps are crafted for performance, usability, and long-term scalability, ensuring a smooth and intuitive experience for your users.",
  },
];

export default servicesData;
