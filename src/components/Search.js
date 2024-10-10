// src/components/Search.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import GameList from './GameList';
import { searchGames } from '../services/api/rawg';
import './Search.css'; // Optional: Create CSS for styling

const Search = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchGames(query);
      setGames(results);
    } catch (err) {
      setError("Failed to fetch games. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <h2>Search Games</h2>
      <SearchBar onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <GameList games={games} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
