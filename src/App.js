import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MovieHomepage from './MovieHomepage';
import MovieDetails from './MovieDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={MovieHomepage} />
        <Route path="/movie/:id" component={MovieDetails} />
      </Router>
    );
  }
}

export default App;
