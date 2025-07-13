// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';

// import Dashboard from './components/Dashboard';
import { UserAuthProvider,useUserAuth } from './context/userAuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';

import Main from './layout/Main';

import LoadingSpinner from './components/LoadingSpinner';
import router from './router/router';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useUserAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={router}/>
    </UserAuthProvider>
  );
}

export default App;