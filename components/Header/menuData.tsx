import { Menu } from "@/types";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Products",
    path: "/products",
    newTab: false,
  },
  {
    id: 3,
    title: "Services",
    path: "#services",
    newTab: false,
  },
  {
    id: 5,
    title: "Articles",
    path: "/articles",
    newTab: false,
  },
  {
    id: 6,
    title: "Reach Out",
    path: "/contact",
    newTab: false,
    highlighted: true
  },
];
export default menuData;
