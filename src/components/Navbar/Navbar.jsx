import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useUserAuth } from "../../context/userAuthContext";
import { useCart } from "../../context/CartContext";
import useScrollLock from "../../hooks/useScrollLock";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("nuts");
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUserAuth();

  // FIX 1: Use cart item count for icon
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categories = {
    nuts: [
      "Almonds",
      "Cashews",
      "Walnuts",
      "Pistachios",
      "Hazelnuts",
      "Pecans",
      "Brazil Nuts",
      "Macadamia",
    ],
    driedFruits: [
      "Raisins",
      "Dates",
      "Apricots",
      "Figs",
      "Prunes",
      "Cranberries",
      "Mango",
      "Pineapple",
    ],
    seeds: [
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Chia Seeds",
      "Flax Seeds",
      "Sesame Seeds",
      "Watermelon Seeds",
    ],
    mixes: [
      "Trail Mix",
      "Student Mix",
      "Energy Mix",
      "Protein Mix",
      "Premium Mix",
      "Custom Mix",
    ],
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useScrollLock(mobileMenuOpen || desktopMenuOpen);

  const renderCategoryList = (items) => (
    <motion.ul
      className="mt-6 flex flex-col space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.05 }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          className="flow-root"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to={`/products/${item.toLowerCase().replace(/\s+/g, "-")}`}
            className="-m-2 block p-2 text-gray-700 hover:text-orange-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const desktopMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative border-b z-50" data-aos="fade-down">
      <header className="relative mx-auto sm:px-3">
        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left side - mobile menu and logo */}
            <div className="flex items-center">
              <button
                type="button"
                className="rounded-md p-2 text-gray-500 hover:text-orange-500 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <FiMenu className="h-6 w-6 text-orange-600" />
              </button>
              {/* Logo */}
              <motion.div
                className="ml-4 flex lg:ml-0"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/" className="flex items-center gap-1 md:gap-4">
                  <img
                    src="/KOALogo.jpeg"
                    alt=""
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                  <p className="text-2xl md:text-3xl font-bold text-orange-600 tracking-wider">
                    K<span className="text-black">O</span>A
                  </p>
                </Link>
              </motion.div>
            </div>

            {/* Centered Navigation */}
            <div className="hidden flex-1 lg:flex lg:items-center lg:justify-center ">
              <div className="flex space-x-8 ">
                <Link
                  to="/"
                  className="text-md font-medium text-gray-900 hover:text-orange-500 hover:-translate-y-1 transition-all duration-200"
                >
                  Home
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                    className="text-md font-medium text-gray-900 hover:text-orange-500 flex items-center hover:-translate-y-1 transition-all"
                  >
                    Products
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        desktopMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {desktopMenuOpen && (
                      <motion.div
                        className="absolute left-0 top-full mt-2 w-[60vw] max-w-md md:max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-md z-50 border border-gray-200 lg:transform lg:-translate-x-1/4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={desktopMenuVariants}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                          {Object.entries(categories).map(
                            ([category, items]) => (
                              <div
                                key={category}
                                className="space-y-3 md:space-y-4"
                              >
                                <h3 className="text-base md:text-lg font-semibold text-gray-900 border-b pb-1 md:pb-2">
                                  {category.charAt(0).toUpperCase() +
                                    category
                                      .slice(1)
                                      .replace(/([A-Z])/g, " $1")}
                                </h3>
                                <ul className="space-y-1 md:space-y-2">
                                  {items.map((item) => (
                                    <li key={item}>
                                      <Link
                                        to={`/products/${item
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        onClick={() =>
                                          setDesktopMenuOpen(false)
                                        }
                                        className="text-sm md:text-md text-gray-700 hover:text-orange-500 transition-colors"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/about-us"
                  className="text-md font-medium text-gray-900 hover:text-orange-500 hover:-translate-y-1 transition-all"
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  className="text-md font-medium text-gray-900 hover:text-orange-500 hover:-translate-y-1 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center">
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                <div className="relative inline-block">
                  {!user && (
                    <Link
                      to="/login"
                      className="text-md font-medium text-gray-900 hover:text-orange-500 flex items-center"
                    >
                      <FiUser size={18} className="mr-1" /> Log In
                    </Link>
                  )}

                  {user && (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <button className="text-md font-medium text-gray-900 hover:text-orange-500 flex items-center focus:outline-none">
                        <FiUser size={18} className="mr-1" />{" "}
                        {user?.displayName}
                      </button>
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-sm font-medium text-gray-900">
                                {user.displayName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                            <button
                              // onClick={handleProfile}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <FiSettings size={16} className="mr-2" />
                              Profile
                            </button>
                            <button
                              onClick={logout}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <FiLogOut size={16} className="mr-2" />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-4 flow-root lg:ml-6">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <FiShoppingCart className="h-6 w-6 shrink-0 text-gray-500 group-hover:text-orange-500" />
                    <span
                      className={`ml-2 text-sm font-medium ${
                        cartCount > 0
                          ? "bg-orange-600 text-white px-2 py-0.5 rounded-full"
                          : "text-gray-400"
                      }`}
                    >
                      {cartCount}
                    </span>
                    <span className="sr-only">items in cart</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 h-screen"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex h-screen flex-col overflow-y-auto pb-12 z-50 bg-white">
                <div className="flex justify-between">
                  <div className="flex px-4 pb-2 pt-5 justify-start">
                    <Link
                      to="/"
                      className="flex items-center gap-2 md:gap-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src="/KOALogo.jpeg"
                        alt=""
                        className="h-6 w-6 md:h-8 md:w-8"
                      />
                      <p className="text-2xl md:text-3xl font-bold text-orange-500">
                        K<span className="text-black">O</span>A
                      </p>
                    </Link>
                  </div>
                  <div className="flex px-4 pb-2 pt-5 justify-end">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-orange-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <FiX className="h-6 w-6 text-orange-500" />
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="border-b border-gray-200">
                    <div className="-mb-px flex space-x-8 px-4 overflow-x-auto">
                      {Object.keys(categories).map((category) => (
                        <button
                          key={category}
                          className={`whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium flex items-center ${
                            activeTab === category
                              ? "border-orange-500 text-orange-500"
                              : "border-transparent text-gray-500"
                          }`}
                          onClick={() => setActiveTab(category)}
                        >
                          {category.charAt(0).toUpperCase() +
                            category.slice(1).replace(/([A-Z])/g, " $1")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Show product category links (like tabs) */}
                  <motion.div
                    className="space-y-6 px-4 pb-8 pt-6"
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderCategoryList(categories[activeTab])}
                  </motion.div>
                </div>

                {/* FIX 2: Add About Us, Contact Us, Login links outside product tabs */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-3">
                  <div className="flow-root">
                    <Link
                      to="/about-us"
                      className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/contact-us"
                      className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-500 flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiUser className="mr-2" /> Log In
                    </Link>
                  </div>
                  {/* <div className="flow-root">
                    <Link
                      to="/cart"
                      className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-500 flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiShoppingCart className="mr-2" />
                      Cart{" "}
                      <span className="ml-2 text-orange-600 font-semibold">
                        {cartCount}
                      </span>
                    </Link>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
