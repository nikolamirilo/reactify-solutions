export type ContactData = {
  message: string;
  email: string;
  name: string;
  subject: string;
};
export type Client = {
  name: string;
  href: string;
  image: string;
  description?: string;
};
export type FetchOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  cache?: "force-cache" | "no-cache" | "no-store";
  body?: BodyInit;
  revalidate?: number;
};
export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};
export type Technology = {
  name: string;
  image: string;
};
export type Testimonial = {
  id: number;
  fullname: string;
  rate: number;
  content: string;
  profession: string;
};
export type Service = {
  id: number;
  icon: JSX.Element;
  title: string;
  paragraph: string;
};

type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
};
