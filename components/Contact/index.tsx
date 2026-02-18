//@ts-nocheck
"use client";
import { sendEmail } from "@/actions";
import { fetchData } from "@/helpers/client";
import { useState } from "react";
import InfoModal from "../Modal/InfoModal";
import { ImSpinner9 } from "react-icons/im";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !message || !subject) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    if (subject === "Custom" && !customSubject) {
      alert("Please enter your custom subject.");
      return;
    }

    setIsLoading(true);

    const finalSubject = subject === "Custom" ? customSubject : subject;

    const res = await sendEmail({
      name,
      email,
      message,
      subject: finalSubject
    });

    if (res == true) {
      setIsOpen(true);
      setIsLoading(false);
      setName("");
      setMessage("");
      setEmail("");
      setSubject("");
      setCustomSubject("");
    } else {
      setIsLoading(false);
      alert("Error occurred, please contact support");
    }
  }

  const inputClasses =
    "w-full rounded-xl border-none bg-white/80 dark:bg-white/5 backdrop-blur-sm py-3.5 px-5 text-base text-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(27,153,139,0.3),0_4px_16px_rgba(27,153,139,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]";

  const selectClasses =
    `${inputClasses} bg-white dark:bg-[#1e293b] [&>option]:bg-white [&>option]:dark:bg-[#1e293b] [&>option]:text-dark [&>option]:dark:text-white`;

  const labelClasses =
    "mb-2 block text-sm font-semibold text-dark/80 dark:text-white/90 tracking-wide";

  return (
    <section id="contact" className="overflow-hidden pt-5 pb-16">
      {isOpen ? (
        <InfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="Thank you for reaching out! We have received your message and will respond to you via email shortly."
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
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter your name"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e: any) => setSubject(e.target.value)}
                      className={selectClasses}
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="General Question">General Question</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>

                  {/* Custom Subject (conditional) */}
                  {subject === "Custom" && (
                    <div>
                      <label htmlFor="customSubject" className={labelClasses}>
                        Custom Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customSubject"
                        value={customSubject}
                        onChange={(e: any) => setCustomSubject(e.target.value)}
                        type="text"
                        placeholder="Enter custom subject"
                        required
                        className={inputClasses}
                      />
                    </div>
                  )}
                </div>

                {/* Right column — message */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <label htmlFor="message" className={labelClasses}>
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    name="message"
                    placeholder="Enter your message"
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
                  {isLoading ? <ImSpinner9 size={20} className="animate-spin" /> : null}
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

export default Contact;
