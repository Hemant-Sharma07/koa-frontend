import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserAuthProvider, useUserAuth } from "./context/userAuthContext";
import Login from "./components/Auth/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { ProductProvider } from "./context/productContext";
import ProductManager from "./pages/ProductManager";
import Footer from "./components/footer/Footer";


import LoadingSpinner from './components/LoadingSpinner';
import { ToastContainer } from "react-toastify";

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
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductManager />} />

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
              fontSize: '14px',
            }}
          />
      </Router>
      </ProductProvider>
    </UserAuthProvider>
  );
}

export default App;
