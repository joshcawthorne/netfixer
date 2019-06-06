import React, { Component } from "react";
import styles from "./movie.module.css";
import { withRouter } from "react-router-dom";
import SelectedMovieDetails from "./modules/selectedMovieDetails";
import RelatedMovies from "./modules/relatedMovies";
import Reviews from "../Reviews/reviews";

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: [],
      dataLoaded: false,
      relatedData: [],
      relatedLoaded: false,
      reviewData: [],
      reviewLoaded: false,
      reviewDisplay: false,
      relatedDisplay: true,
      detailsData: [],
      detailsDisplay: false,
      detailsLoaded: false
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
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.movieId +
        "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ reviewData: data });
        this.setState({ reviewLoaded: true });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.movieId +
        "/credits?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ detailsData: data });
        this.setState({ detailsLoaded: true });
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

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.movieId +
          "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ reviewData: data });
          this.setState({ reviewLoaded: true });
        });
      });

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.props.match.params.movieId +
          "/credits?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ detailsData: data });
          this.setState({ detailsLoaded: true });
        });
      });
    }
  }

  selectRelated = () => {
    this.setState({
      relatedDisplay: true,
      reviewDisplay: false,
      detailsDisplay: false
    });
  };

  selectReviews = () => {
    this.setState({
      reviewDisplay: true,
      relatedDisplay: false,
      detailsDisplay: false
    });
  };

  selectDetails = () => {
    this.setState({
      reviewDisplay: false,
      relatedDisplay: false,
      detailsDisplay: true
    });
  };

  render() {
    const reviewDisplay = this.state.reviewDisplay;
    const relatedDisplay = this.state.relatedDisplay;
    const detailsDisplay = this.state.detailsDisplay;
    if (
      this.state.dataLoaded &&
      this.state.relatedLoaded &&
      this.state.reviewLoaded &&
      this.state.detailsLoaded
    ) {
      return (
        <div className={styles.selectedItemDetailContainer}>
          <SelectedMovieDetails
            movieData={this.state.movieData}
            extraDetails={this.state.detailsData}
          />

          <div className={styles.detailBoxSelector}>
            <div
              className={
                detailsDisplay
                  ? styles.detailBoxItemSelected
                  : styles.detailBoxItem
              }
              onClick={this.selectDetails}
            >
              Details
            </div>

            <div
              className={
                reviewDisplay
                  ? styles.detailBoxItemSelected
                  : styles.detailBoxItem
              }
              onClick={this.selectReviews}
            >
              Reviews
            </div>
            <div
              className={
                relatedDisplay
                  ? styles.detailBoxItemSelected
                  : styles.detailBoxItem
              }
              onClick={this.selectRelated}
            >
              Related
            </div>
          </div>
          <div className={styles.detailBoxContainer}>
            <div className={styles.relatedOuterContainer}>
              {reviewDisplay ? (
                <div className={styles.reviewOuterContainer}>
                  <Reviews
                    reviewData={this.state.reviewData}
                    title={this.state.movieData.title}
                  />
                </div>
              ) : (
                <div />
              )}

              {relatedDisplay ? (
                <RelatedMovies
                  relatedmovieData={this.state.relatedData}
                  updateShow={this.updateShow}
                />
              ) : (
                <div />
              )}

              {detailsDisplay ? <div /> : <div />}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(MovieDetails);
