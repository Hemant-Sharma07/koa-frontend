// components/Admin/Sidebar.js
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Settings, User, LogOut } from "lucide-react";

const Sidebar = () => (
  <div className="w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen shadow-2xl border-r border-gray-700/50 backdrop-blur-sm">
    {/* Header Section */}
    <div className="p-6 border-b border-gray-700/50">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Settings className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 font-medium">Management Console</p>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </div>

    {/* Navigation Section */}
    <nav className="p-6 space-y-2">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          Navigation
        </h3>
        
        <Link 
          to="/admin" 
          className="group flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:shadow-lg hover:shadow-blue-500/25 hover:transform hover:translate-x-1 active:scale-95 border border-transparent hover:border-blue-500/30"
        >
          <div className="relative">
            <LayoutDashboard className="w-5 h-5 text-blue-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" strokeWidth={2} />
            <div className="absolute -inset-1 bg-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <span className="ml-4 font-medium text-gray-200 group-hover:text-white transition-colors duration-300">Dashboard</span>
          <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
        </Link>
        
        <Link 
          to="/admin/products" 
          className="group flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 hover:shadow-lg hover:shadow-green-500/25 hover:transform hover:translate-x-1 active:scale-95 border border-transparent hover:border-green-500/30"
        >
          <div className="relative">
            <Package className="w-5 h-5 text-green-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" strokeWidth={2} />
            <div className="absolute -inset-1 bg-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <span className="ml-4 font-medium text-gray-200 group-hover:text-white transition-colors duration-300">Products</span>
          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
        </Link>
        
        <Link 
          to="/admin/orders" 
          className="group flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-red-600/20 hover:shadow-lg hover:shadow-orange-500/25 hover:transform hover:translate-x-1 active:scale-95 border border-transparent hover:border-orange-500/30"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-orange-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" strokeWidth={2} />
            <div className="absolute -inset-1 bg-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <span className="ml-4 font-medium text-gray-200 group-hover:text-white transition-colors duration-300">Orders</span>
          <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
        </Link>
      </div>
    </nav>

    {/* User Profile Section */}
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50 bg-gradient-to-t from-gray-900/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
          <User className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">Admin User</p>
          <p className="text-xs text-gray-400">System Administrator</p>
        </div>
        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-300" strokeWidth={2} />
      </div>
    </div>
  </div>
);

export default Sidebar;