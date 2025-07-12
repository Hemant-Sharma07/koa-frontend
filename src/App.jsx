// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Dashboard from './components/Dashboard';
import { UserAuthProvider,useUserAuth } from './context/userAuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';

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

  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <UserAuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </UserAuthProvider>
  );
}

export default App;