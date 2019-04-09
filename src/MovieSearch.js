import React from 'react';
import MovieAPI from './MovieAPI';
import './MovieSearch.css';

function MovieSearch({ onSearch, onResult, onTextChange }) {
  const handleChange = async (event) => {
    const searchQuery = event.target.value;
    try {
      // TODO: debounce search
      onSearch(true);
      onTextChange(searchQuery);
      const { results } = await MovieAPI.movie.search(searchQuery);
      onResult(results);
    } catch(error) {
      // TODO: handle error
    } finally {
      onSearch(false);
    }
  };

  return (
    <div className="MovieSearch">
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
}

export default MovieSearch;
