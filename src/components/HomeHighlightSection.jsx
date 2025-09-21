import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaShippingFast, FaAward } from "react-icons/fa";

const HomeHighlightSection = () => {
  return (
    <section className=" bg-gradient-to-r from-orange-100  to-orange-200 py-16 px-6 md:px-20 mx-3 md:mx-8 rounded-2xl shadow-md">
      <div className=" mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-orange-500">KOA Dry Fruits</span>?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We bring you handpicked, premium-quality dry fruits & delicacies
            with freshness and taste that your family deserves.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <FaLeaf className="text-orange-500 text-xl" />
              <p className="text-gray-700 font-medium">
                100% Natural & Freshly Packed
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaShippingFast className="text-orange-500 text-xl" />
              <p className="text-gray-700 font-medium">
                Fast & Safe Delivery Across India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaAward className="text-orange-500 text-xl" />
              <p className="text-gray-700 font-medium">
                Premium Quality with Trusted Certifications
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="/logoBG.png" // replace with your image
            alt="KOA Dry Fruits"
            className="rounded-2xl w-full max-w-md object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHighlightSection;
