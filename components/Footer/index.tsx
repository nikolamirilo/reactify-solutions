const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-darkBorder bg-darkSurface/40 py-8 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
          © {new Date().getFullYear()} Reactify Solutions · all rights reserved
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-textColor">
          made in EU · remote-first
        </p>
      </div>
    </footer>
  );
};

export default Footer;
