import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";



export const searchGames = async (query) =>{
    try{
        const response = await axios.get(`${BASE_URL}/games`,{
            params:{
                key: API_KEY,
                search: query,
                page_size: 20,
            },
        });
        return response.data.results;
    }   catch(error){
        console.error("Error fetching games:", error);
        return[];
    }
};

export const getRecommendedGames = async (preferences)=>{
    try{
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,
                genres: preferences.genres.join(','),
                platforms: preferences.platforms.join(','),
                ordering: '-rating',
                page_size: 20,
            },
        });
        return response.data.results;
    }   catch(error){
        console.error("error fetching recommended games", error);
        return[];
    }
};

export const getGenres = async ()=>{
    try{
        const response = await axios.get(`${BASE_URL}/genres`, {
            params: {key: API_KEY},
        });
        return response.data.results;
    }   catch(error){
        console.error("error fetching genres", error);
        return[];
    }
};

export const getPlatforms = async ()=>{
    try{
        const response = await axios.get(`${BASE_URL}/platforms`, {
            params:{key: API_KEY},
        });
        return response.data.results;
    }   catch(error){
        console.error("error fetching platforms", error);
        return[];
    }
};