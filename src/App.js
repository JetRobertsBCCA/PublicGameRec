// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import Search from './components/Search';
import Recommendations from './components/Recommendations';
import Favorites from './components/Favorites';
import './App.css'; // Optional: Create CSS for global styling

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
        <Route path="/recommendations" element={user ? <Recommendations /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/profile" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
