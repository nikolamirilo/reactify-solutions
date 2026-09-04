export default function InOneMinute({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-9 rounded-xl border border-darkBorder border-l-2 border-l-primaryColor bg-darkElevated px-5 py-5 [&_.handbook-ul]:mb-0 [&_.handbook-ul]:max-w-none [&_p]:m-0">
      <div className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-primaryColor">
        In one minute
      </div>
      {children}
    </div>
  );
}
