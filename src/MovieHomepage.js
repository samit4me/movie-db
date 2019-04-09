import React, { useState, useEffect } from 'react';
import MovieAPI from './MovieAPI';
import MovieList from './MovieList';
import LandingPageLayout from './LandingPageLayout';

function MovieHomepage({ category = 'popular' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState(null);
  const [searching, setSearching] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { results } = await MovieAPI.movie[category]();
        setMovies(results);
      } catch(error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function renderMovies() {
    if (searchQuery) {
      return (
        <MovieList
          heading="Search Results"
          loading={searching}
          loadingMsg="Searching..."
          movies={searchResults}
          noMovieMsg="There are no movies that matched your search."
        />
      );
    }
    return (
      <MovieList
        heading={`${category} Movies`}
        loading={loading}
        movies={movies}
        error={error}
      />
    );
  }

  return (
    <LandingPageLayout
      onSearching={setSearching}
      onSearchResults={setSearchResults}
      onSearchTextChange={setSearchQuery}
    >
      {renderMovies()}
    </LandingPageLayout>
  );
}

export default MovieHomepage;
