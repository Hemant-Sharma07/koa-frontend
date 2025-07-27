// components/LoadingSpinner.jsx
import React, { useState, useEffect } from "react";
import { GiAlmond, GiPeanut, GiFruitBowl } from "react-icons/gi";
import { PiNutFill } from "react-icons/pi"; // Phosphor Icons
import { TbDropletFilled } from "react-icons/tb"; // Tabler Icons

const dryFruits = [
  { icon: <GiAlmond />, name: "Almond", color: "text-amber-700" },
  { icon: <PiNutFill />, name: "Cashew (Kaju)", color: "text-yellow-600" },
  { icon: <GiFruitBowl />, name: "Raisin (Kismis)", color: "text-purple-500" },
  { icon: <GiPeanut />, name: "Peanut", color: "text-orange-600" },
  { icon: <TbDropletFilled />, name: "Dates", color: "text-amber-900" },
];

const LoadingSpinner = () => {
  const [currentFruit, setCurrentFruit] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFruit((prev) => (prev + 1) % dryFruits.length);
      setProgress((prev) => (prev + 10) % 100); // Simulated progress
    }, 600); // Faster cycle for engagement

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-filter backdrop-blur-md">
      <div className="text-center space-y-4">
        <div className="relative h-24 w-24 mx-auto">
          {dryFruits.map((fruit, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-7xl transition-all duration-500 transform ${
                fruit.color
              } ${
                index === currentFruit
                  ? "opacity-100 scale-110"
                  : "opacity-0 scale-90"
              }`}
            >
              {fruit.icon}
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading Dry Fruits...
        </p>
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
