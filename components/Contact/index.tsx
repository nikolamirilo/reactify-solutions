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
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true)
    const res = await sendEmail({ name, email, message, subject: 'New message from Reactify Solutions website' });
    if (res == true) {
      setIsOpen(true)
      setIsLoading(false)
      setName("");
      setMessage("");
      setEmail("");
    } else {
      alert("Error occured, please contact support");
    }
  }
  return (
    <section id="contact" className="overflow-hidden pt-5 pb-16">
      {isOpen ? <InfoModal isOpen={isOpen} setIsOpen={setIsOpen} message="Thank you for reaching out! We have received your message and will respond to you via email shortly." /> : null}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full max-w-[70rem] px-4">
            <div
              className="wow fadeInUp bg-opacity-5 bg-primaryColor mb-12 rounded-md py-11 px-8 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <form action="submit" onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter your name"
                        className="focus:border-primaryColor w-full rounded-md border border-transparent py-3 px-6 text-base text-dark placeholder-dark shadow-one outline-none focus-visible:shadow-none bg-gray-200 dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="focus:border-primaryColor w-full rounded-md border border-transparent py-3 px-6 text-base text-dark placeholder-dark shadow-one outline-none focus-visible:shadow-none bg-gray-200 dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e: any) => setMessage(e.target.value)}
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="focus:border-primaryColor w-full resize-none rounded-md border border-transparent placeholder-dark py-3 px-6 text-base text-dark shadow-one outline-none focus-visible:shadow-none bg-gray-200 dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="bg-primaryColor rounded-md flex flex-row gap-1 py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
                      {isLoading ? <ImSpinner9 size={20} className="animate-spin" /> : null}
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="h-full w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
