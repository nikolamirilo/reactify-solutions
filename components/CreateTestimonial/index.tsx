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
    <section id="testimonial" className="overflow-hidden pb-16 pt-5">
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
            className="wow fadeInUp rounded-2xl border border-gray-200 bg-white/60 px-8 py-10 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] sm:p-[50px]"
            data-wow-delay=".15s"
          >
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* Left column - short fields */}
                <div className="flex w-full flex-col gap-5 lg:w-1/2">
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

                {/* Right column - testimonial message */}
                <div className="flex w-full flex-col lg:w-1/2">
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
                    className={`${inputClasses} min-h-[200px] flex-1 resize-none`}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-xl bg-primaryColor px-9 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
                >
                  {isLoading ? (
                    <ImSpinner9
                      size={20}
                      className="mr-2 inline animate-spin"
                    />
                  ) : null}
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
