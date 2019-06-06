import React, { Component } from "react";
import styles from "./searchResults.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SearchOutput from "./modules/searchOutput";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=0892b357978ad214e2798df9d45b276e&type=all&query=${
        this.props.match.params.searchQuery
      }`
    )
      .then(response => response.json())
      .then(data => this.setState({ searchResults: data.results }))
      .then(this.setState({ dataLoaded: true }));
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.searchQuery !== this.props.match.params.searchQuery
    ) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0892b357978ad214e2798df9d45b276e&type=all&query=${
          this.props.match.params.searchQuery
        }`
      )
        .then(response => response.json())
        .then(data => this.setState({ searchResults: data.results }))
        .then(this.setState({ dataLoaded: true }));
    }
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <div className={styles.searchModuleContainer}>
          <div className={styles.searchTitle}>Search Results: </div>
          <SearchOutput searchResults={this.state.searchResults} />
        </div>
      );
    } else {
      return <div>Loading Search...</div>;
    }
  }
}

export default withRouter(SearchResults);
