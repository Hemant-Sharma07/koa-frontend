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

// import LoadingSpinner from './components/LoadingSpinner';

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

  if (loading) {
    // return <LoadingSpinner />;
  }

  return user ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <UserAuthProvider>
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
          </Routes>
        </div>
      </Router>
    </UserAuthProvider>
  );
}

export default App;
