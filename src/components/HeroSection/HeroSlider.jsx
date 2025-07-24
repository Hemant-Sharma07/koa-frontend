import { useState, useEffect } from "react";

const images = [
  "https://img.freepik.com/premium-photo/assortment-spices-herbs-bowls_84485-180.jpg?w=2000",
  "https://img.freepik.com/premium-photo/nuts-dried-fruits-gray-background-top-view_185193-19222.jpg?w=996",
  "https://cdn.dotpe.in/longtail/additional_pages/7651759/FIAon8mH.jpeg",
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div
      className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8"
      data-aos="fade-right"
    >
      <div className="relative h-[20vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] transition-all duration-700 ease-in-out">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className={`absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-700 ease-in-out rounded-md ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute z-10 flex space-x-3 bottom-5 left-1/2 -translate-x-1/2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 md:left-10 -translate-y-1/2 bg-white p-2 rounded-full"
      >
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 md:right-10 -translate-y-1/2 bg-white p-2 rounded-full"
      >
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroSlider;
