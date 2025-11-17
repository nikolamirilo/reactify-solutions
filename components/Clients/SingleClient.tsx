import { Client } from "@/types";
import Image from "next/image";

const SingleClient = ({ client }: { client: Client }) => {
  const { href, image, name } = client;

  return (
    <div className="mx-3 flex w-fit items-center justify-center py-[15px] sm:mx-4 xl:mx-6 2xl:mx-8">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative flex max-w-[7rem] cursor-pointer items-center justify-center rounded-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100 lg:max-w-[8rem] 2xl:max-w-[10rem]"
      >
        <Image
          src={image}
          alt={name}
          width={name == "Minexa.ai" ? 100 : 160}
          height={100}
        />
      </a>
    </div>
  );
};

export default SingleClient;
