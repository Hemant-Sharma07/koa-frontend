import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const UserLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
