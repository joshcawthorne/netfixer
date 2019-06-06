import React, { Component } from "react";
import styles from "./movie.module.css";
import { withRouter } from "react-router-dom";
import SelectedMovieDetails from "./modules/selectedMovieDetails";
import RelatedMovies from "./modules/relatedMovies";

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: [],
      dataLoaded: false,
      relatedData: [],
      relatedLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.movieId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ movieData: data });
        this.setState({ dataLoaded: true });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.movieId +
        "/recommendations?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ relatedData: data });
        this.setState({ relatedLoaded: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.movieId !== this.props.match.params.movieId) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.movieId +
          "?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ movieData: data });
          this.setState({ dataLoaded: true });
        });
      });
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.movieId +
          "/recommendations?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ relatedData: data });
          this.setState({ relatedLoaded: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
    }
  }

  updateShow = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.movieId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ movieData: data });
        this.setState({ dataLoaded: true });
        this.props.history.push("/movie/" + this.props.match.params.movieId);
      });
    });
  };

  render() {
    if (this.state.dataLoaded && this.state.relatedLoaded) {
      return (
        <div>
          <SelectedMovieDetails movieData={this.state.movieData} />
          <RelatedMovies
            relatedmovieData={this.state.relatedData}
            updateShow={this.updateShow}
          />
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(MovieDetails);
