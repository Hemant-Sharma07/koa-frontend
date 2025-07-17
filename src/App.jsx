import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserAuthProvider, useUserAuth } from "./context/userAuthContext";
import Login from "./components/Auth/Login";
import Home from "./pages/Home/Home";
import { ProductProvider } from "./context/productContext";
import ProductManager from "./pages/ProductManager";

import { ToastContainer } from "react-toastify";
import AdminRoute from "./router/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import ShoppingCart from "./pages/Cart/ShoppingCart";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();

  if (loading) {
    // return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useUserAuth();

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return user ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <UserAuthProvider>
      <ProductProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<ShoppingCart />} />
              </Route>

              <Route path="/admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ProductManager />} />
                </Route>
              </Route>
            </Routes>
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
            style={{
              fontSize: "14px",
            }}
          />
        </Router>
      </ProductProvider>
    </UserAuthProvider>
  );
}

export default App;
