//@ts-nocheck
"use client";
import { sendEmail } from "@/actions";
import { useState } from "react";
import InfoModal from "../Modal/InfoModal";
import { ImSpinner9 } from "react-icons/im";
import { HiArrowRight } from "react-icons/hi2";
import { FiMail, FiCalendar, FiBookOpen } from "react-icons/fi";

const QUICK_PICKS = [
  "Project quote",
  "Discovery sprint",
  "AI feature",
  "Data platform",
  "Partnership",
  "Just a question",
];

const REPLY_PROMISE = [
  {
    title: "A written reply, < 1 business day",
    body: "From a named partner, during EU business hours. Weekends we wait.",
  },
  {
    title: "An honest read on fit",
    body: "If it's not for us, we'll suggest two teams we trust that might be.",
  },
  {
    title: "Next steps in plain English",
    body: "A call, a discovery sprint, or a link to a case study that answers your question.",
  },
];

const PARTNERS = [
  {
    initials: "NM",
    name: "Nikola Mirilo",
    role: "partner · eng",
    color: "#00d4c8",
  },
  {
    initials: "RS",
    name: "Reactify team",
    role: "partner · product",
    color: "#4ade80",
  },
];

const HERO_METRICS = [
  { k: "reply window", v: "within 24h", dot: true },
  { k: "who reads it", v: "a named partner" },
  { k: "based in", v: "EU · remote-first" },
];

const CHANNELS = [
  {
    icon: <FiMail className="h-4 w-4" />,
    title: "Email a partner directly",
    sub: "reactify.developer@gmail.com",
    href: "mailto:reactify.developer@gmail.com",
  },
  {
    icon: <FiCalendar className="h-4 w-4" />,
    title: "Book a 30-min intro call",
    sub: "calendly.com/reactify-developer",
    href: "https://calendly.com/reactify-developer/30min",
  },
  {
    icon: <FiBookOpen className="h-4 w-4" />,
    title: "Read us on our blog",
    sub: "fresh engineering write-ups",
    href: "/blogs",
  },
];

const ReachOut = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messageLen = message.length;
  const fieldsComplete = [email, subject, message].filter(Boolean).length;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !subject || !message) {
      alert("Please fill in email, subject, and message.");
      return;
    }
    setIsLoading(true);
    const res = await sendEmail({
      name: email.split("@")[0] || "Friend",
      email,
      subject,
      message,
    });
    if (res === true) {
      setIsOpen(true);
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      alert("Error occurred, please contact support");
    }
    setIsLoading(false);
  }

  return (
    <section className="relative z-10 overflow-hidden pb-20 pt-[120px] md:pb-28 md:pt-[150px]">
      <div className="radial-fade-top pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[720px]" />
      <div className="bg-grid-faint pointer-events-none absolute inset-0 z-[-1] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

      {isOpen && (
        <InfoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="Thank you for reaching out. A partner will reply from their inbox, usually within one business day."
        />
      )}

      <div className="container">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primaryColor opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primaryColor shadow-[0_0_10px_rgba(0,212,200,0.9)]" />
              </span>
              written reply · &lt; 1 business day
            </div>
            <h1 className="mt-5 font-display text-[42px] font-semibold leading-[1.03] text-white sm:text-[56px] lg:text-[68px]">
              Tell us what you&apos;re building.
              <br />
              <span className="text-gradient-accent">
                We&apos;ll reply within a day.
              </span>
            </h1>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-textSecondary sm:text-lg">
              Three fields. A real partner reads every message - not a bot, not
              a sales rep - and writes back within one business day. Even if
              it&apos;s to say we&apos;re not the right fit.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {HERO_METRICS.map((m) => (
              <div
                key={m.k}
                className="flex items-center justify-between rounded-xl border border-darkBorder bg-darkSurface/70 px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
                  {m.dot && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accentGreen shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  )}
                  {m.k}
                </span>
                <span className="font-mono text-[13px] font-semibold text-white">
                  {m.v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          {/* Form card */}
          <div className="overflow-hidden rounded-2xl border border-darkBorder bg-darkSurface/80 backdrop-blur-sm">
            {/* Terminal bar */}
            <div className="flex items-center justify-between border-b border-darkBorder px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primaryColor/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primaryColor/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primaryColor/80" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
                  contact.form
                </span>
              </div>
              <div className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor sm:flex">
                <span>encrypted · tls 1.3</span>
                <span className="text-primaryColor">draft auto-saved</span>
              </div>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    Start the conversation.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-textSecondary sm:text-base">
                    Three fields. Leave an email, a subject line that hints at
                    the work, and a short note on what you&apos;re building.
                  </p>
                </div>
                <div className="hidden shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-textColor md:block">
                  fields
                  <div className="text-base font-semibold text-white">
                    {fieldsComplete} / 3{" "}
                    <span className="text-textColor">complete</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <label
                    htmlFor="ro-email"
                    className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor"
                  >
                    <span className="text-primaryColor">01</span>
                    <span>email address</span>
                    <span className="text-primaryColor">*</span>
                  </label>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                    we&apos;ll reply here
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-darkBorder bg-darkSurface px-4 py-3.5 transition-colors focus-within:border-primaryColor/50 focus-within:shadow-[0_0_0_3px_rgba(0,212,200,0.12)]">
                  <FiMail className="h-4 w-4 text-textColor" />
                  <input
                    id="ro-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full bg-transparent font-mono text-[14px] text-white placeholder-textDim outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <label
                    htmlFor="ro-subject"
                    className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor"
                  >
                    <span className="text-primaryColor">02</span>
                    <span>subject</span>
                    <span className="text-primaryColor">*</span>
                  </label>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                    one line, be specific
                  </span>
                </div>
                <input
                  id="ro-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. AI copilot for our underwriting team"
                  required
                  className="mt-2 w-full rounded-xl border border-darkBorder bg-darkSurface px-4 py-3.5 font-mono text-[14px] text-white placeholder-textDim outline-none transition-colors focus:border-primaryColor/50 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.12)]"
                />
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                    quick-pick →
                  </span>
                  {QUICK_PICKS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setSubject(q)}
                      className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-all ${
                        subject === q
                          ? "border-primaryColor/50 bg-primaryColor/10 text-primaryColor"
                          : "border-darkBorder bg-darkSurface text-textSecondary hover:border-primaryColor/40 hover:text-white"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <label
                    htmlFor="ro-message"
                    className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor"
                  >
                    <span className="text-primaryColor">03</span>
                    <span>message</span>
                    <span className="text-primaryColor">*</span>
                  </label>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-textColor">
                    min. 30 chars
                  </span>
                </div>
                <div className="relative mt-2">
                  <textarea
                    id="ro-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={7}
                    placeholder="A few sentences on the problem, what you've already tried, and what success looks like. Rough and messy is fine - this isn't a pitch, and you don't need to know the answer yet. Just tell us where you're stuck."
                    required
                    minLength={30}
                    maxLength={2000}
                    className="w-full resize-none rounded-xl border border-darkBorder bg-darkSurface px-4 py-3.5 font-mono text-[14px] leading-relaxed text-white placeholder-textDim outline-none transition-colors focus:border-primaryColor/50 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.12)]"
                  />
                  <span className="absolute bottom-3 right-4 font-mono text-[11px] text-textColor">
                    {messageLen} / 2000
                  </span>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-6 flex flex-col gap-4 border-t border-darkBorder pt-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
                  <kbd className="rounded border border-darkBorder bg-darkElevated px-1.5 py-0.5 text-[10px] text-textSecondary">
                    ⌘
                  </kbd>
                  <span>+</span>
                  <kbd className="rounded border border-darkBorder bg-darkElevated px-1.5 py-0.5 text-[10px] text-textSecondary">
                    ↵
                  </kbd>
                  <span>to send</span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primaryColor px-7 py-3.5 font-semibold text-accentContrast shadow-glowSoft transition-all hover:-translate-y-0.5 hover:bg-primaryDark hover:shadow-glow active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading && <ImSpinner9 className="animate-spin" />}
                  {isLoading ? "Sending..." : "Send message"}
                  {!isLoading && (
                    <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-textColor">
                We write <span className="text-white">once</span>, you decide.
                No newsletter, no drip, no BDR follow-ups. If you want an NDA
                first, just say so in the message.
              </p>
            </form>
          </div>

          {/* Right column */}
          <aside className="flex flex-col gap-6">
            {/* Reply promise */}
            <div className="rounded-2xl border border-darkBorder bg-darkSurface/80 p-6 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-primaryColor/30 bg-primaryColor/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primaryColor">
                our reply promise
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                What you&apos;ll get back.
              </h3>
              <ul className="mt-5 space-y-4">
                {REPLY_PROMISE.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-darkBorder bg-darkElevated">
                      <svg
                        className="h-3.5 w-3.5 text-primaryColor"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 10l3 3 7-7"
                        />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {p.title}
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-textSecondary">
                        {p.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2 border-t border-darkBorder pt-5">
                {PARTNERS.map((p) => (
                  <div
                    key={p.initials}
                    className="flex flex-1 items-center gap-2.5 rounded-xl border border-darkBorder bg-darkElevated px-3 py-2"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-accentContrast"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-white">
                        {p.name}
                      </div>
                      <div className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-textColor">
                        {p.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="rounded-2xl border border-darkBorder bg-darkSurface/80 p-6 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkElevated px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-textSecondary">
                prefer a different channel?
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                Reach us directly.
              </h3>
              <div className="mt-5 flex flex-col gap-2">
                {CHANNELS.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-darkBorder bg-darkElevated px-3.5 py-3 transition-all hover:border-primaryColor/40 hover:bg-darkSurface"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-darkBorder bg-darkSurface text-primaryColor">
                      {c.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white">
                        {c.title}
                      </div>
                      <div className="truncate font-mono text-[11px] text-textColor">
                        {c.sub}
                      </div>
                    </div>
                    <HiArrowRight className="h-4 w-4 shrink-0 text-textColor transition-transform group-hover:translate-x-1 group-hover:text-primaryColor" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ReachOut;
