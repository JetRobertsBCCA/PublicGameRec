// src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getUserFavorites } from '../services/userService';
import GameList from './GameList';
import './Favorites.css'; // Optional: Create CSS for styling

const Favorites = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const favs = await getUserFavorites(user.uid);
          setFavorites(favs);
        } catch (err) {
          setError("Failed to fetch favorites.");
        }
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  if (!user) return null;

  return (
    <div className="favorites-container">
      <h2>Your Favorite Games</h2>
      {loading ? <p>Loading...</p> : <GameList games={favorites} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Favorites;
