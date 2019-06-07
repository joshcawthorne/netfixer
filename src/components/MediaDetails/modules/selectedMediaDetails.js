import React, { Component } from "react";
import styles from "../mediaDetails.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";
import Details from "../../Details";
import getAverageColor from "get-average-color";
import ColorTheif from "color-thief";

class selectedMovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      dataLoaded: false,
      themeColour: ""
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

  handleImageLoaded() {
    console.log("Loaded");
    //this.themeGenerator();
  }

  themeGenerator() {
    var colorTheif = new ColorTheif();
    var test = colorTheif.getColor(
      document.getElementById("backgroundImageMedia")
    );
    console.log(test);
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
      let genreLength = this.props.mediaData.genres.length;
      return (
        <div className={styles.showContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerInfoOuter}>
              <div className={styles.headerInfoContainer}>
                <div className={styles.headerInfoInner}>
                  <div className={styles.showNameContainer}>
                    <div className={styles.showName}>{title}</div>
                  </div>
                  <div className={styles.showMetaData}>
                    <div className={styles.genreContainer}>
                      {this.props.mediaData.genres.map((genre, i) => {
                        if (genreLength === i + 1) {
                          return (
                            <div className={styles.genreItem}>{genre.name}</div>
                          );
                        } else {
                          return (
                            <div className={styles.genreItem}>
                              {genre.name} | &nbsp;
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className={styles.statsContainer}>
                      <div className={styles.ratingContainer}>
                        {this.props.mediaData.vote_average}
                        {this.state.themeColour}
                      </div>
                      <div className={styles.yearContainer}>{year}</div>
                    </div>
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
                onLoad={this.handleImageLoaded.bind(this)}
                id="backgroundImageMedia"
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
