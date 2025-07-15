// components/Admin/Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
    <nav className="space-y-4">
      <Link to="/admin" className="block hover:text-yellow-400">Dashboard</Link>
      <Link to="/admin/products" className="block hover:text-yellow-400">Products</Link>
      {/* Add more links as needed */}
    </nav>
  </div>
);

export default Sidebar;
