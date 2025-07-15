// routes/AdminRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

const AdminRoute = () => {
  const { user, userRole, loading } = useUserAuth();

  if (loading) return null;

  return user?.email === "admin@gmail.com" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
