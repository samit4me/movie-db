import React from 'react';
import { Link } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import './LandingPageLayout.css';

function LandingPageLayout({ children, onSearching, onSearchResults, onSearchTextChange }) {
  return (
    <div className="LandingPageLayout">
      <header className="Header">
        <div className="Content">
          <Link to="/" className="Logo" />
          <div className="SearchContainer">
            <MovieSearch
              onSearch={onSearching}
              onResult={onSearchResults}
              onTextChange={onSearchTextChange}
            />
          </div>
        </div>
      </header>
      <main className="Content">
        {children}
      </main>
    </div>
  );
}

export default LandingPageLayout;
