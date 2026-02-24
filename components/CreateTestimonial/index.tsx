//@ts-nocheck
"use client";
import React, { useState } from "react";
import StarRatings from "../../node_modules/react-star-ratings";
import { addNewTestimonial } from "@/actions";
import { revalidateData } from "@/helpers/server";
import InfoModal from "../Modal/InfoModal";
import { ImSpinner9 } from "react-icons/im";

const CreateTestimonial = () => {
  const [rate, setRate] = useState(0);
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!fullName || !profession || !content || rate === 0) {
      alert("Please fill in all mandatory fields and provide a rating.");
      return;
    }

    setIsLoading(true);
    const res = await addNewTestimonial(fullName, profession, content, rate);
    if (res) {
      revalidateData();
      setIsOpen(true);
      setIsLoading(false);
      setFullName("");
      setRate(0);
      setProfession("");
      setContent("");
    } else {
      setIsLoading(false);
      alert("Error occurred, please contact support");
    }
  }

  const inputClasses =
    "w-full rounded-xl border-none bg-white/80 dark:bg-white/5 backdrop-blur-sm py-3.5 px-5 text-base text-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(27,153,139,0.3),0_4px_16px_rgba(27,153,139,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]";

  const labelClasses =
    "mb-2 block text-sm font-semibold text-dark/80 dark:text-white/90 tracking-wide";

  return (
    <section id="testimonial" className="overflow-hidden pt-5 pb-16">
      {isOpen ? (
        <InfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="Thank you for your testimonial! We have received your feedback and appreciate you taking the time to share your experience."
        />
      ) : null}
      <div className="container">
        <div className="w-full max-w-[70rem]">
          <div
            className="wow fadeInUp rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-gray-200 dark:border-white/10 py-10 px-8 sm:p-[50px] shadow-lg"
            data-wow-delay=".15s"
          >
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left column — short fields */}
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      value={fullName}
                      onChange={(e: any) => setFullName(e.target.value)}
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Profession */}
                  <div>
                    <label htmlFor="profession" className={labelClasses}>
                      Your Profession <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="profession"
                      value={profession}
                      onChange={(e: any) => setProfession(e.target.value)}
                      type="text"
                      placeholder="Enter your profession"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className={labelClasses}>
                      Your Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="py-1">
                      <StarRatings
                        starRatedColor="#fbb040"
                        starHoverColor="#fbb040"
                        starDimension="32px"
                        starSpacing="3px"
                        rating={rate}
                        changeRating={(e: any) => setRate(e)}
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                  </div>
                </div>

                {/* Right column — testimonial message */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <label htmlFor="content" className={labelClasses}>
                    Your Testimonial <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e: any) => setContent(e.target.value)}
                    name="content"
                    placeholder="Share your experience..."
                    required
                    className={`${inputClasses} resize-none flex-1 min-h-[200px]`}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-primaryColor to-[#158C7E] py-4 px-9 text-base font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_10px_30px_0px_rgba(27,153,139,0.5)] hover:bg-opacity-80 hover:scale-105 active:scale-95 shadow-[0_4px_20px_0px_rgba(27,153,139,0.3)]"
                >
                  {isLoading ? <ImSpinner9 size={20} className="animate-spin inline mr-2" /> : null}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTestimonial;
