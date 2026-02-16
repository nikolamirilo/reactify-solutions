const Footer = () => {
  return (
    <footer className="bg-base-300 bg-opacity-5 text-base-content wow fadeInUp relative z-10 flex items-center justify-center  p-4 py-5">
      <aside>
        <p className="text-center">
          Copyright ©{new Date().getFullYear()} - All rights reserved by
          Reactify Solutions
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
