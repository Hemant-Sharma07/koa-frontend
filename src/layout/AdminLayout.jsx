// layouts/AdminLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import Header from "../pages/admin/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
