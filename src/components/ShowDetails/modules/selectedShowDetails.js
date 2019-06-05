import React, { Component } from "react";
import styles from "../show.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";

class selectedShowDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showData: [],

      dataLoaded: false
    };
  }

  componentWillMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ showData: data });
        this.setState({ dataLoaded: true });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("news props or new state", prevProps);
  }

  render() {
    if (this.state.dataLoaded) {
      let year = this.state.showData.first_air_date;
      let seasonText = "Seasons";
      year = year.split("-");
      year = year[0];
      if (this.state.showData.number_of_seasons === 1) {
        seasonText = "Season";
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
                    {this.state.showData.number_of_seasons}{" "}
                    <span>{seasonText}</span> /{" "}
                    {this.state.showData.vote_average} / {year}
                  </div>
                  <div className={styles.showNameContainer}>
                    <div className={styles.showName}>
                      {this.state.showData.name}
                    </div>
                  </div>
                  <div className={styles.showOverview}>
                    {this.state.showData.overview}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backgroundImgContainer}>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  this.state.showData.backdrop_path
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

export default withRouter(selectedShowDetails);
