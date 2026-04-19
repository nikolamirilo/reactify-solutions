const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className="bg-primaryColor mr-3 mb-3 inline-flex items-center justify-center rounded-full bg-opacity-10 py-2 px-4 text-textColor duration-300 hover:bg-opacity-100 hover:text-white hover:shadow-md"
    >
      {text}
    </a>
  );
};

export default TagButton;
