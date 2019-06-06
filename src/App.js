import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AnimatedSwitch } from "react-router-transition";

import Menu from "./components/Menu";
import SearchResults from "./components/SearchResults";
import TrendingList from "./components/TrendingList";
import TrendingMovieList from "./components/TrendingMovieList";
import Show from "./components/ShowDetails";
import Movie from "./components/MovieDetails";
import Actor from "./components/Actor";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />

        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route exact path="/" component={TrendingList} />
          <Route exact path="/trending_movies" component={TrendingMovieList} />
          <Route exact path="/show/:showId" component={Show} />
          <Route exact path="/movie/:movieId" component={Movie} />
        </AnimatedSwitch>
        <Route exact path="/actor/:actorId" component={Actor} />
        <Route exact path="/search/:searchQuery" component={SearchResults} />
      </div>
    </Router>
  );
}

export default App;
