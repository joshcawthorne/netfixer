import React, { Component } from "react";
import styles from "../mediaDetails.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";
import Details from "../../Details";

class selectedMovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.itemId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ mediaData: data });
        this.setState({ dataLoaded: true });
      });
    });
  }

  render() {
    if (this.state.dataLoaded) {
      let year;
      let title;
      if (this.props.match.params.mediaType === "movie") {
        year = this.props.mediaData.release_date;
        year = year.split("-");
        year = year[0];
        title = this.props.mediaData.title;
      } else {
        year = this.props.mediaData.first_air_date;
        year = year.split("-");
        year = year[0];
        title = this.props.mediaData.name;
      }

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
                    {this.props.mediaData.vote_average} / {year}
                  </div>
                  <div className={styles.showNameContainer}>
                    <div className={styles.showName}>{title}</div>
                  </div>
                  <div className={styles.showOverview}>
                    <p>{this.props.mediaData.overview}</p>
                  </div>
                  <div className={styles.extraDetailsContainer}>
                    <Details details={this.props.extraDetails} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backgroundImgContainer}>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  this.props.mediaData.backdrop_path
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
