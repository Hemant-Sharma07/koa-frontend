// components/Routes/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
import LoadingSpinner from "../LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUserAuth();

  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
