import React from 'react';
import { Link } from 'react-router-dom';
import Movie from './Movie';
import './MovieList.css';

function MovieList({
  heading,
  loading,
  loadingMsg = 'Loading...',
  error,
  movies,
  noMovieMsg = 'There are no movies available',
}) {
  const formattedHeading = heading.toLowerCase()
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(' ');

  function renderMovies() {
    if (loading) {
      return <div>{loadingMsg}</div>;
    }
    if (error) {
      return <div>Failed to load movies.</div>
    }
    if (!movies || !movies.length) {
      return <div>{noMovieMsg}</div>
    }
    return (
      <div className="MovieList">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <Movie movie={movie} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>{formattedHeading}</h2>
      {renderMovies()}
    </div>
  );
}

export default MovieList;
