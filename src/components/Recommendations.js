// src/components/Recommendations.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getUserPreferences } from '../services/userService';
import { getRecommendedGames } from '../services/api/rawg';
import GameList from './GameList';
import './Recommendations.css'; // Optional: Create CSS for styling

const Recommendations = () => {
  const [user] = useAuthState(auth);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        const preferences = await getUserPreferences(user.uid);
        if (preferences && preferences.genres && preferences.platforms) {
          try {
            const recommended = await getRecommendedGames(preferences);
            setRecommendations(recommended);
          } catch (err) {
            setError("Failed to fetch recommendations.");
          }
        } else {
          setError("Please set your preferences first.");
        }
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [user]);

  if (!user) return null;

  return (
    <div className="recommendations-container">
      <h2>Recommended Games</h2>
      {loading ? <p>Loading...</p> : <GameList games={recommendations} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Recommendations;
