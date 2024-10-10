// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getUserPreferences, saveUserPreferences } from '../services/userService';
import { getGenres, getPlatforms } from '../services/api/rawg';
import './Profile.css'; // Optional: Create CSS for styling

const Profile = () => {
  const [user] = useAuthState(auth);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        const prefs = await getUserPreferences(user.uid);
        if (prefs) {
          setSelectedGenres(prefs.genres || []);
          setSelectedPlatforms(prefs.platforms || []);
        }
      }
    };
    fetchPreferences();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
      const platformsData = await getPlatforms();
      setPlatforms(platformsData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUserPreferences(user.uid, {
      genres: selectedGenres,
      platforms: selectedPlatforms,
    });
    setMessage("Preferences saved successfully!");
    setTimeout(() => setMessage(''), 3000);
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let option of options) {
      if (option.selected) selected.push(option.value);
    }
    setSelectedGenres(selected);
  };

  const handlePlatformChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let option of options) {
      if (option.selected) selected.push(option.value);
    }
    setSelectedPlatforms(selected);
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.email}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Preferred Genres:</label>
          <select multiple value={selectedGenres} onChange={handleGenreChange}>
            {genres.map(genre => (
              <option key={genre.id} value={genre.slug}>{genre.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Preferred Platforms:</label>
          <select multiple value={selectedPlatforms} onChange={handlePlatformChange}>
            {platforms.map(platform => (
              <option key={platform.id} value={platform.slug}>{platform.name}</option>
            ))}
          </select>
        </div>
        {message && <p className="success">{message}</p>}
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default Profile;
