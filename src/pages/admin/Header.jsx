// components/Admin/Header.js
import { Bell, Search, Settings, User, ChevronDown, Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(3);

  return (
    <header className="bg-white/95 backdrop-blur-md  border-b border-gray-200/50 p-4  top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95">
            <Menu className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Online
              </span>
            </div>
          </div>
        </div>

        
      </div>
    </header>
  );
};

export default Header;