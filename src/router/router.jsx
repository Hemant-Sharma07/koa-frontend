import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../components/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      // {
      //     path: "/",
      //     element: <Home/>
      // },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
