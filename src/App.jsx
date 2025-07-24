import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserAuthProvider, useUserAuth } from "./context/userAuthContext";
import { ProductProvider } from "./context/productContext";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

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
        <Router>
          <div className="App">
            <Suspense
              fallback={
                <div className="text-center mt-10">
                  <LoadingSpinner />
                </div>
              }
            >
              <Routes>
                <Route element={<UserLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                </Route>

                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductManager />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={5000}
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
      </ProductProvider>
    </UserAuthProvider>
  );
}

export default App;
