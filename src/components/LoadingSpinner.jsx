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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFruit((prev) => (prev + 1) % dryFruits.length);
    }, 800); // Change every 0.8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center space-y-6">
        <div className="relative h-24 w-24 mx-auto">
          {dryFruits.map((fruit, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-7xl transition-opacity duration-500 ${
                fruit.color
              } ${index === currentFruit ? "opacity-100" : "opacity-0"}`}
            >
              {fruit.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
