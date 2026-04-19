const SectionTitle = ({
  title,
  paragraph,
  width = "600px",
  center,
  mb = "30px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`wow fadeInUp w-full  ${
          center ? "mx-auto text-center" : ""
        }`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className="font-display mb-4 text-3xl font-semibold !leading-[1.08] text-white sm:text-4xl md:text-[44px]">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-textSecondary md:text-lg">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
