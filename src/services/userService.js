// src/services/userService.js
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

// Save or update user preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    await setDoc(doc(db, 'users', userId), { preferences }, { merge: true });
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
};

// Get user preferences
export const getUserPreferences = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().preferences;
    }
    return null;
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return null;
  }
};

// Add a game to favorites
export const addFavoriteGame = async (userId, game) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      favorites: arrayUnion(game),
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

// Remove a game from favorites
export const removeFavoriteGame = async (userId, gameId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const favorites = userDoc.data().favorites || [];
      const updatedFavorites = favorites.filter(g => g.id !== gameId);
      await setDoc(doc(db, 'users', userId), { favorites: updatedFavorites }, { merge: true });
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

// Get user's favorite games
export const getUserFavorites = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().favorites || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
