const Button = ({ title = "View All", onClick, variant = "filled" }) => {
  let baseClasses =
    "font-medium shadow px-3 py-2 sm:px-5 sm:py-3 text-sm sm:text-md rounded-md transition-all duration-200";

  let variantClasses = "";

  switch (variant) {
    case "white":
      variantClasses = "bg-white text-orange-600 border border-orange-600 ";
      break;
    case "outline":
      variantClasses =
        "bg-transparent text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white";
      break;
    default: // 'filled'
      variantClasses =
        "bg-orange-600 text-white hover:bg-white hover:text-orange-600 hover:border hover:border-orange-600";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} hover:-translate-y-1`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const TransparentBtn = ({ title = "Learn More", onClick }) => {
  return (
    <button
      className="border-2 border-white text-white px-4 py-1 md:px-5 md:py-2 rounded-md font-semibold hover:bg-white hover:text-orange-700 transition-all duration-200  hover:-translate-y-1"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export { Button, TransparentBtn };
