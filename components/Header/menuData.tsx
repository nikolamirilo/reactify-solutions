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
    title: "Services",
    path: "#services",
    newTab: false,
  },
  {
    id: 3,
    title: "Add Testimonial",
    path: "/add-testimonial",
    newTab: false,
  },
  {
    id: 4,
    title: "Blogs",
    path: "/blogs",
    newTab: false,
  },
  {
    id: 5,
    title: "Reach Out",
    path: "/contact",
    newTab: false,
    highlighted: true
  },
];
export default menuData;
