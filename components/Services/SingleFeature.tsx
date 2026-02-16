import { Service } from "@/types";

const SingleService = ({ service }: { service: Service }) => {
  const { icon, title, paragraph } = service;
  return (
    <div className="w-full">
      <div
        className="wow fadeInUp flex flex-col items-center sm:items-start justify-center"
        data-wow-delay=".15s"
      >
        <div className="bg-primaryColor text-primaryColor mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-opacity-10">
          {icon}
        </div>
        <h3 className="mb-5 text-center sm:text-left text-xl font-bold text-black dark:text-white sm:text-2xl max-w-md lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-center sm:text-left text-base font-medium leading-relaxed text-textColor">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleService;
