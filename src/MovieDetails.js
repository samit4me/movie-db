import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import MovieAPI, { imageBaseURL } from './MovieAPI';
import './MovieDetails.css';

const convertMinsToHrsAndMins = (minutes) => {
  var hrs = Math.floor(minutes / 60);
  var mins = minutes % 60;
  return `${hrs ? `${hrs}h` : ''} ${mins ? `${mins} min` : ''}`.trim();
}

function MovieDetails({ match, history }) {
  const movieId = match.params.id;
  const imageSize = 'w500';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [backdrops, setBackdrops] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [movie, { backdrops }] = await Promise.all([
          MovieAPI.movie.details(movieId),
          MovieAPI.movie.images(movieId)
        ]);
        setMovie(movie);
        setBackdrops(backdrops.sort((a, b) => b.vote_average - a.vote_average));
      } catch(error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="MovieDetailsLoading">Loading...</div>;
  }
  if (error) {
    return <div className="MovieDetailsError">Failed to load movie.</div>
  }
  return (
    <div className="MovieDetails">
      {/* TODO: show best responsive image, maybe rotate through images */}
      <div className="Backdrop">
        <img
          alt=""
          src={`${imageBaseURL}original${backdrops[0].file_path}`}
        />
        <div className="Overlay" />
        <i className="GoBack" onClick={(event) => history.goBack()}/>
      </div>
      <main className="Content">
        <div className="HeadingContainer">
          <img
            alt={movie.title}
            src={`${imageBaseURL}${imageSize}${movie.poster_path}`}
          />
          <div className="HeadingText">
            <h2>{movie.title}</h2>
            <div className="Meta">
              <div>
                {format(new Date(movie.release_date), 'YYYY')}
                <span> &#183; </span>
                {movie.vote_average * 10}% User Score
              </div>
              <div>{convertMinsToHrsAndMins(movie.runtime)}</div>
            </div>
          </div>
        </div>

        <h4>Overview</h4>
        <p>{movie.overview}</p>
      </main>
    </div>
  )
;
}

export default MovieDetails;
