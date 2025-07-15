import React from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaStore,
  FaGithub,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const Footer = () => {
  const footerLinks = [
    {
      title: "Resources",
      links: [
        { name: "Store Store", url: "#", icon: <FaStore className="mr-2" /> },
        {
          name: "Tailwind CSS",
          url: "https://tailwindcss.com/",
          icon: <SiTailwindcss className="mr-2" />,
        },
      ],
    },
    // {
    //   title: "Follow Us",
    //   links: [
    //     { name: "GitHub", url: "#", icon: <FaGithub className="mr-2" /> },
    //     { name: "Instagram", url: "#", icon: <FaInstagram className="mr-2" /> },
    //   ],
    // },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy Policy",
          url: "#",
          icon: <FaShieldAlt className="mr-2" />,
        },
        {
          name: "Terms & Conditions",
          url: "#",
          icon: <FaFileContract className="mr-2" />,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy Policy",
          url: "#",
          icon: <FaShieldAlt className="mr-2" />,
        },
        {
          name: "Terms & Conditions",
          url: "#",
          icon: <FaFileContract className="mr-2" />,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          name: "Privacy Policy",
          url: "#",
          icon: <FaShieldAlt className="mr-2" />,
        },
        {
          name: "Terms & Conditions",
          url: "#",
          icon: <FaFileContract className="mr-2" />,
        },
      ],
    },
  ];

  const socialIcons = [
    {
      label: "Facebook",
      icon: <FaFacebook />,
      url: "#",
    },
    {
      label: "Instagram",
      icon: <FaInstagram />,
      url: "#",
    },
    {
      label: "Twitter",
      icon: <FaTwitter />,
      url: "#",
    },
    {
      label: "YouTube",
      icon: <FaYoutube />,
      url: "#",
    },
  ];

  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const tapEffect = {
    scale: 0.95,
  };

  return (
    <footer className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white ">
      <motion.div
        className="w-full p-4 md:px-12 md:py-10 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ always: true }} // This ensures animation only happens once
        variants={containerVariants}
      >
        <div className="md:flex md:justify-between">
          <motion.div className="mb-10 md:mb-0" variants={itemVariants}>
            <motion.a
              href="#"
              className="relative"
              whileHover={hoverEffect}
              whileTap={tapEffect}
            >
              <img
                src="/KOALogo.jpeg"
                className="h-32 w-32"
                alt="Company Logo"
              />
              {/* <span className="self-center text-2xl font-bold whitespace-nowrap text-orange-100">
                KOA
              </span> */}
            </motion.a>
            {/* <motion.p
              className="self-center text-2xl font-bold whitespace-nowrap text-orange-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              KOA Dry Fruits
            </motion.p> */}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4"
            variants={containerVariants}
          >
            {footerLinks.map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-orange-100">
                  {section.title}
                </h2>
                <ul className="font-medium">
                  {section.links.map((link, idx) => (
                    <motion.li
                      key={idx}
                      className="mb-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href={link.url}
                        className="flex items-center hover:text-orange-200 transition-colors duration-200"
                      >
                        {link.icon}
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.hr
          className="my-6 border-orange-300 opacity-50"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="sm:flex sm:items-center sm:justify-between">
          <motion.span
            className="text-sm text-orange-100 block mb-4 sm:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:underline font-medium">
              KOA™
            </a>
            . All Rights Reserved.
          </motion.span>

          <motion.div
            className="flex mt-4 sm:justify-center sm:mt-0 space-x-6"
            variants={containerVariants}
          >
            {socialIcons.map((item, idx) => (
              <motion.a
                href={item.url}
                key={idx}
                className="text-orange-100 hover:text-white text-xl"
                variants={itemVariants}
                whileHover={{
                  scale: 1.2,
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={item.label}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
