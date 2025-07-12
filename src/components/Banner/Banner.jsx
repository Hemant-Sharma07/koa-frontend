import React, { useState } from "react";
import { MdLocationOn, MdOutlineEmail, MdPhone } from "react-icons/md";
import logo from "../../assets/KOAlogo.jpeg";

export default function KoaLaunchPage() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setShowToast(true);
      setEmail("");
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-orange-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Logo in Top Left */}
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-100">
          <img src={logo} alt="" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4">
        <div className="max-w-7xl w-full text-center mx-auto">
          {/* Brand Name with Enhanced Typography */}
          <div className="relative mb-6 lg:mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 tracking-wider relative">
              KOA
            </h1>
            <div className="absolute inset-0 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif text-amber-900 opacity-20 blur-sm tracking-wider">
              KOA
            </div>
          </div>

          {/* Subtitle with Animation */}
          <div className="relative mb-8 lg:mb-12">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-amber-800 font-light tracking-[0.3em] uppercase relative">
              <span className="relative z-10">DRY FRUITS</span>
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 lg:w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-700 mb-8 lg:mb-12 font-light leading-relaxed max-w-4xl mx-auto">
            Staright From <span className="italic text-amber-800">Nature</span>.
          </p>

          {/* Launch Message with Cool Effect */}
          <div className="relative mb-8 lg:mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-amber-900 font-serif leading-tight relative">
              <span className="relative z-10">We're launching</span>
              <br />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 animate-pulse">
                soon!
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="capitalize text-lg sm:text-xl lg:text-2xl text-amber-700 mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Premium quality dry fruits delivered fresh to your doorstep.
          </p>

          {/* Enhanced Email Subscription */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-amber-200">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for exclusive updates"
                    className="flex-1 px-6 py-4 lg:px-8 lg:py-6 text-amber-900 bg-transparent border-0 rounded-xl focus:outline-none placeholder-amber-600 text-base lg:text-lg font-light"
                  />
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`px-8 py-4 lg:px-12 lg:py-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-amber-50 font-semibold rounded-xl transition-all duration-300 text-base lg:text-lg shadow-lg hover:shadow-xl transform ${
                      isHovered ? "animate-pulse" : ""
                    }`}
                  >
                    Notify Me ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">✅</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Success!</p>
                <p className="text-xs opacity-90">
                  We'll notify you when we launch
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Contact Info at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-amber-900 bg-opacity-90 backdrop-blur-sm">
        <div className="px-4 py-3 text-white">
          {/* Contact Info Block */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-around sm:items-start">
            {/* Email */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <MdOutlineEmail className="w-5 h-5 flex-shrink-0" />
              <span className="break-words">koadryfruits2025@gmail.com</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <MdPhone className="w-5 h-5 flex-shrink-0" />
              <span>+91-6367465206</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm sm:text-base">
              <MdLocationOn className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="leading-tight text-left sm:text-start">
                GG-31-A, Sector 2, VIDHYADHAR ENCLAVE –II,
                <br />
                Central Spine, Vidyadhar Nagar, Jaipur, Rajasthan 302039
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
