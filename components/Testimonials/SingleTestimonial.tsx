//@ts-nocheck
import { Testimonial } from "@/types";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  let ratingIcons = [];
  for (let index = 0; index < testimonial.rate; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>
    );
  }

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp bg-primaryColor relative min-h-[350px] md:min-h-[400px] rounded-md bg-opacity-5 p-8 shadow-one lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <BiSolidQuoteAltLeft
          size={40}
          color="#D3D3D3"
          className="-z-1 absolute top-1 right-5"
        />
        <p className="relative mb-8 min-h-[8rem] border-b border-textColor border-opacity-10 pt-2 pb-8 text-base leading-relaxed text-textColor dark:border-white dark:border-opacity-10 dark:text-white">
          {testimonial.content}
        </p>
        <div className="flex items-center">
          <div className="w-full">
            <div className="mb-3 flex items-center space-x-1">
              {ratingIcons}
            </div>
            <h5 className="ml-1 mb-2 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
              {testimonial.fullname}
            </h5>
            <p className="ml-1 text-base text-textColor">
              {testimonial.profession}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
