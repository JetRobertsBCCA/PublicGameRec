import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch })=>{
    const [query, setQuery] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(query.trim() !== ''){
            onSearch(query);
        }
    };

    return(
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for games..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;