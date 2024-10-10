// src/components/GameCard.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { addFavoriteGame, removeFavoriteGame } from '../services/userService';
import './GameCard.css'; // Optional: Create CSS for styling

const GameCard = ({ game }) => {
  const [user] = useAuthState(auth);

  const handleAddFavorite = () => {
    if (user) {
      addFavoriteGame(user.uid, {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
      });
    }
  };

  const handleRemoveFavorite = () => {
    if (user) {
      removeFavoriteGame(user.uid, game.id);
    }
  };

  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} />
      <div className="game-info">
        <h3>{game.name}</h3>
        <p><strong>Release Date:</strong> {game.released}</p>
        <p><strong>Rating:</strong> {game.rating}</p>
        {user && (
          <>
            <button onClick={handleAddFavorite}>Add to Favorites</button>
            <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
