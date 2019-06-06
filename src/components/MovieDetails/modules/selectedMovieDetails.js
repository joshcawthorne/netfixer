import React, { Component } from "react";
import styles from "../movie.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";

class selectedMovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: [],

      dataLoaded: false
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
  }
  render() {
    if (this.state.dataLoaded) {
      let year = this.props.movieData.release_date;
      year = year.split("-");
      year = year[0];
      return (
        <div className={styles.showContainer}>
          <div
            className={styles.back}
            onClick={() => this.props.history.goBack()}
          >
            <img src={arrow} alt="Go Back" />
          </div>
          <div className={styles.headerContainer}>
            <div className={styles.headerInfoOuter}>
              <div className={styles.headerInfoContainer}>
                <div className={styles.headerInfoInner}>
                  <div className={styles.showMetaData}>
                    {this.props.movieData.vote_average} / {year}
                  </div>
                  <div className={styles.showNameContainer}>
                    <div className={styles.showName}>
                      {this.props.movieData.title}
                    </div>
                  </div>
                  <div className={styles.showOverview}>
                    {this.props.movieData.overview}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backgroundImgContainer}>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  this.props.movieData.backdrop_path
                }
                alt="Poster"
                className={styles.backgroundImg}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(selectedMovieDetails);
