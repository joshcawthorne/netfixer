import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AnimatedSwitch } from "react-router-transition";

import Menu from "./components/Menu";
import TrendingList from "./components/TrendingList";
import Show from "./components/ShowDetails";

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
          <Route exact path="/show/:showId" component={Show} />
        </AnimatedSwitch>
      </div>
    </Router>
  );
}

export default App;
