//@ts-nocheck
import { BsBrowserEdge, BsSearch } from "react-icons/bs";
import { MdBusiness, MdManageSearch } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { IoLogoAppleAr } from "react-icons/io5";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { TbListSearch } from "react-icons/tb";

const servicesData = [
  {
    id: 1,
    icon: <BsBrowserEdge size={40} />,
    title: "Web Development",
    paragraph:
      "We specialize in building high-performance, reliable Progressive Web Applications (PWA) that deliver seamless experiences across all devices. Our PWAs are fast, secure, and engaging, ensuring users can access your services anywhere, anytime.",
  },
  {
    id: 2,
    icon: <MdManageSearch size={50} />,
    title: "Digital Marketing",
    paragraph:
      "We provide services of Search Engine Optimization, Pay-Per-Click Advertising, Social Media Marketing, and Content Marketing to help you reach and engage your target audience effectively. Our strategies are data-driven and tailored to your business goals.",
  },

  {
    id: 3,
    icon: <MdBusiness size={40} />,
    title: "Business Consulting",
    paragraph:
      "Our consulting services help you optimize operations, streamline processes, and create strategies that support long-term growth. We work closely with your team to align technology, workflows, and business goals.",
  },

  {
    id: 4,
    icon: <SiGoogleanalytics size={40} />,
    title: "Data Analytics",
    paragraph:
      "We deliver end-to-end data analytics solutions, from building full dataflows using Microsoft Fabric to creating insightful dashboards in Power BI. Our analytics turn raw information into actionable insights that power smarter decisions.",
  },

  {
    id: 5,
    icon: <IoLogoAppleAr size={40} />,
    title: "Mobile Development",
    paragraph:
      "We build modern mobile applications for both iOS and Android. Our apps are crafted for performance, usability, and long-term scalability, ensuring a smooth and intuitive experience for your users.",
  },

  {
    id: 6,
    icon: <AiOutlineCodeSandbox size={50} />,
    title: "AI Development",
    paragraph:
      "We build AI-powered solutions that automate processes, analyze data, and create intelligent user experiences. Our services include LLM integration, AI agents, chatbots, and custom automation tailored to your business needs.",
  },
];

export default servicesData;
