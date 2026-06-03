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
      subject: finalSubject,
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
    "w-full rounded-xl border-none bg-white/5 backdrop-blur-sm py-3.5 px-5 text-base text-white placeholder-textColor shadow-[0_2px_10px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(27,153,139,0.3),0_4px_16px_rgba(27,153,139,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]";

  const selectClasses = `${inputClasses} bg-darkElevated [&>option]:bg-darkElevated [&>option]:text-white`;

  const labelClasses =
    "mb-2 block text-sm font-semibold text-textSecondary tracking-wide";

  return (
    <section id="contact" className="overflow-hidden pb-16 pt-5">
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
            className="wow fadeInUp rounded-2xl border border-darkBorder bg-darkSurface/40 px-8 py-10 shadow-lg backdrop-blur-md sm:p-[50px]"
            data-wow-delay=".15s"
          >
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* Left column - short fields */}
                <div className="flex w-full flex-col gap-5 lg:w-1/2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Your Name <span className="text-error">*</span>
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
                      Your Email <span className="text-error">*</span>
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
                      Subject <span className="text-error">*</span>
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e: any) => setSubject(e.target.value)}
                      className={selectClasses}
                      required
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
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
                        Custom Subject <span className="text-error">*</span>
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

                {/* Right column - message */}
                <div className="flex w-full flex-col lg:w-1/2">
                  <label htmlFor="message" className={labelClasses}>
                    Your Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    name="message"
                    placeholder="Enter your message"
                    required
                    className={`${inputClasses} min-h-[200px] flex-1 resize-none`}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primaryColor px-9 py-4 text-base font-semibold text-accentContrast shadow-glowSoft transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0"
                >
                  {isLoading ? (
                    <ImSpinner9 size={20} className="animate-spin" />
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

export default Contact;
