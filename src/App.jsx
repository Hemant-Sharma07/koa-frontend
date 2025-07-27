import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserAuthProvider, useUserAuth } from "./context/userAuthContext";
import { ProductProvider } from "./context/productContext";
import { OrderProvider } from "./context/OrderContext";

import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import UserOrderHistory from "./pages/checkout/UserOrderHistory";
import { useEffect, lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductOverview from "./components/Atoms/ProductOverview";
import NotFound from "./components/Atoms/NotFound";
import OrderManagement from "./pages/admin/OrderManagement";

// Lazy-loaded components
const Login = lazy(() => import("./components/Auth/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const AboutUs = lazy(() => import("./pages/about-us/AboutUs"));
const ContactUs = lazy(() => import("./pages/contact-us/ContactUs"));
const ShoppingCart = lazy(() => import("./pages/Cart/ShoppingCart"));
const ProductManager = lazy(() => import("./pages/ProductManager"));
const AdminRoute = lazy(() => import("./router/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const UserLayout = lazy(() => import("./layout/UserLayout"));

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  if (loading) return null;
  return user ? <Navigate to="/" /> : children;
};

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <UserAuthProvider>
      <ProductProvider>
        <OrderProvider>
        <Router>
          <div className="App">
            <Suspense>
            <Routes>
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/orders" element={<UserOrderHistory />} />
                 <Route path="/product-overview/:id" element={<ProductOverview />} />
                <Route path="/cart" element={
                    // <ProtectedRoute>
                    <ShoppingCart />
                    // </ProtectedRoute>
                  }
                />
              </Route>

                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductManager />} />
                     <Route path="orders" element={<OrderManagement />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ fontSize: "14px" }}
          />
        </Router>
        </OrderProvider>
      </ProductProvider>
    </UserAuthProvider>
  );
}

export default App;
