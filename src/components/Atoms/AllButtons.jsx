const Button = ({ title = "View All" }) => {
  return (
    <button className="bg-orange-600 text-white font-medium shadow px-2 py-1.5 md:px-3 md:py-2 rounded-md hover:bg-white hover:border border-orange-600 hover:text-orange-600 hover:-translate-y-1 transition-all duration-200">
      {title}
    </button>
  );
};

export { Button };
