import { FaStore, FaGlobe, FaBoxOpen, FaStar } from "react-icons/fa";
import { Button, TransparentBtn } from "../Atoms/AllButtons";
import { motion } from "framer-motion";

const OurVision = () => {
  const stats = [
    {
      id: 1,
      icon: <FaStore className="text-4xl text-orange-300" />,
      number: "200+",
      label: "Number of stores",
    },
    {
      id: 2,
      icon: <FaGlobe className="text-4xl text-orange-300" />,
      number: "2",
      label: "Countries",
    },
    {
      id: 3,
      icon: <FaBoxOpen className="text-4xl text-orange-300" />,
      number: "5000+",
      label: "Products",
    },
    {
      id: 4,
      icon: <FaStar className="text-4xl text-orange-300" />,
      number: "50",
      label: "Varieties of Premium dates",
    },
  ];

  // Faster animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced from 0.2
        delayChildren: 0.1, // Reduced from 0.2
      },
    },
  };

  const item = {
    hidden: { y: 10, opacity: 0 }, // Reduced y from 20
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Increased stiffness
        damping: 8, // Adjusted damping
        duration: 0.4, // Added duration for consistency
      },
    },
  };

  const slideInFromLeft = {
    hidden: { x: -30, opacity: 0 }, // Reduced x from -50
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 8,
        duration: 0.4,
      },
    },
  };

  const hoverEffect = {
    scale: 1.03,
    transition: { duration: 0.15 }, // Faster hover
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Reduced margin
      variants={container}
      className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white p-4 md:px-10 md:py-10 mx-auto rounded-md"
    >
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8" variants={container}>
            <motion.div className="space-y-6" variants={item}>
              <motion.h1
                variants={slideInFromLeft}
                className="text-xl md:text-3xl font-bold leading-tight"
              >
                Our Vision: A Legacy of Quality and Excellence
              </motion.h1>
            </motion.div>

            <motion.div
              variants={container}
              className="space-y-6 text-md md:text-lg leading-relaxed text-orange-100"
            >
              <motion.p variants={item}>
                KOA Dry fruits and spices envisions becoming a leading global
                choice regarding premium quality dry fruits and spices, catering
                to the diverse needs of customers worldwide. KOA's main vision
                lies with finest quality, customer satisfaction and sustainable
                growth.
              </motion.p>
              <motion.p variants={item}>
                KOA source finest quality of dry fruits and spices from origin
                where they are grown in natural conditions like India, Iran,
                Afghanistan and United States of America. The best quality
                saffron from Pampore valley(Kashmir) is offered to our customers
                in India.
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.div variants={item}>
                <Button title="Shop Now" variant="white" />
              </motion.div>
              <motion.div variants={item}>
                <TransparentBtn />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div variants={container} className="grid grid-cols-2 gap-6">
            {stats.map((item) => (
              <motion.div
                key={item.id}
                variants={item}
                whileHover={hoverEffect}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-200" // Faster transition
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <motion.div
                  initial={{ scale: 0.95 }} // Slightly less initial scale
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }} // Faster animation
                  className="text-xl md:text-3xl font-bold text-orange-200 mb-2"
                >
                  {item.number}
                </motion.div>
                <div className="text-sm md:text-base text-orange-100">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurVision;
