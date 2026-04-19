const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="w-full relative z-10 overflow-hidden pt-32 pb-8 lg:pt-[150px] lg:pb-4">
      <div className="absolute inset-x-0 top-0 h-[420px] radial-fade-top pointer-events-none z-[-1]" />
      <div className="absolute inset-0 bg-grid-faint opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] pointer-events-none z-[-1]" />

      <div className="container">
        <div className="inline-flex items-center gap-2 rounded-full border border-darkBorder bg-darkSurface/60 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-textSecondary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primaryColor shadow-[0_0_8px_rgba(0,212,200,0.8)]" />
          <span>reactify · {pageName.toLowerCase()}</span>
        </div>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-[56px]">
          {pageName}
        </h1>
        <p className="mt-5 max-w-[720px] text-base leading-relaxed text-textSecondary md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Breadcrumb;
