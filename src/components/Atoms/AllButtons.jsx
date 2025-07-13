const Button = (title, bgColor, textColor) => {
  return (
    <button className="relative z-[1] inline-block w-24 h-[2.6em] leading-[2.5em] overflow-hidden cursor-pointer m-5 text-[17px] text-[#0077ff] border-2 border-[#0077ff] rounded-md font-inherit group">
      <span className="relative z-10">Button</span>
      <span
        className="absolute w-[150px] h-[200px] bg-[#0077ff] rounded-full z-[-1] transition-all duration-300 group-hover:top-[-30px] group-hover:left-[-30px]"
        style={{
          top: "100%",
          left: "100%",
        }}
      ></span>
    </button>
  );
};

const ShopNowButton = () => {
  return (
    <button className="group border-none bg-transparent cursor-pointer flex items-center">
      <span className="relative pb-[20px] pr-[15px] tracking-[4px] text-[14px] uppercase text-black after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
        Shop now
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="10"
        viewBox="0 0 46 16"
        className="transform -translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0 active:scale-90"
      >
        <path
          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
          transform="translate(30)"
          fill="black"
        />
      </svg>
    </button>
  );
};

export { Button, ShopNowButton };
