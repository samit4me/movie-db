import React from 'react';
import { format } from 'date-fns';
import { imageBaseURL } from './MovieAPI';
import './Movie.css';

export const computeRatingClassName = (rating) => {
  let className = '';
  if (rating > 0) className = 'Poor';
  if (rating >= 50) className = 'Average';
  if (rating >= 80) className = 'High';
  return className ? `${className}Rating` : '';
};

function Movie({ movie }) {
  const imageSize = 'w500';
  const movieRating = movie.vote_count > 0 ? movie.vote_average * 10 : 0;

  return (
    <div className="Movie">
      <div
        className={`Poster ${computeRatingClassName(movieRating)}`}
        {...(movieRating ? { 'data-rating': `${movieRating}%` } : {})}
      >
        <img
          alt={movie.title}
          src={`${imageBaseURL}${imageSize}${movie.poster_path}`}
        />
      </div>
      <div className="Title">{movie.title}</div>
      <div className="Date">{format(new Date(movie.release_date), 'MMMM YYYY')}</div>
    </div>
  );
}

export default Movie;
