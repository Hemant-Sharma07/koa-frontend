import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      linkName: "Home",
      path: "/",
      key: "1",
    },
    {
      linkName: "About Us",
      path: "/about-us",
      key: "2",
    },
    {
      linkName: "Cart",
      path: "/cart",
      key: "3",
    },
    {
      linkName: "Contact Us",
      path: "/contact-us",
      key: "4",
    },
  ];

  const socialLinks = [
    {
      href: "#",
      icon: <FaFacebookF />,
      name: "Facebook",
    },
    // {
    //   href: "https://x.com/AdonearthMedia",
    //   icon: <FaTwitter />,
    //   name: "Twitter",
    // },
    {
      href: "#",
      icon: <FaInstagram />,
      name: "Instagram",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-center text-center md:items-start py-10 space-y-10 md:space-y-0 md:space-x-10">
        {/* Logo Section */}
        <motion.div
          className="w-full md:w-1/4 "
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/logoBG.png"
            alt="Logo"
            className="h-40 w-full object-contain mx-auto mb-4"
          />
          <p className="capitalize text-gray-100 text-md">
            straight from nature
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="w-full md:w-1/4 text-left px-6"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4   text-orange-50">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {footerLinks.map(({ linkName, path, key }) => (
              <li key={key}>
                <Link
                  to={path}
                  className="text-white transition-colors duration-300"
                >
                  {linkName}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          className="w-full md:w-1/4 text-left px-6"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-orange-50">
            Store Address
          </h2>
          <p className="text-white/90 mb-2 ">
            G-31-A, Sector 2, VIDHYADHAR ENCLAVE–II, Central Spine, Vidyadhar
            Nagar, Jaipur, Rajasthan 302039
          </p>
          <p className="mb-2">Tel: +91-6367465206</p>
          <p className="mb-2">Mail: koadryfruits2025@gmail.com</p>
        </motion.div>

        {/* Social Icons Section */}
        <motion.div
          className="w-full md:w-1/4 text-left px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-orange-100">
            Let's Get Social
          </h2>
          <div className="flex space-x-4 justify-start  items-center mt-auto mb-4">
            <div className="flex space-x-4 justify-center items-center mt-auto mb-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:bg-white hover:text-orange-600 p-2 rounded-full text-2xl transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <div className=" text-center py-4 border-t border-orange-300/20">
        <p className="text-orange-100 text-sm">
          © {new Date().getFullYear()} KOA Dry Fruits All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
