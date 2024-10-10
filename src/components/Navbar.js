// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Navbar.css';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="navbar">
      <h1>Game Recommendation Engine</h1>
      <ul>
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/search">Search Games</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
