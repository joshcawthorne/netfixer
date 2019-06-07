import React, { Component } from "react";
import styles from "../mediaDetails.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";

class relatedMovies extends Component {
  render() {
    let mediaTypeMovie;
    let mediaType = "movie";
    let mediaTypePretty = "Movies";
    if (this.props.match.params.mediaType === "movie") {
      mediaTypeMovie = true;
      mediaType = "movie";
      mediaTypePretty = "Movies";
    } else {
      mediaTypeMovie = false;
      mediaType = "tv";
      mediaTypePretty = "TV Shows";
    }
    return (
      <div className={styles.relatedShows}>
        <div className={styles.relatedSectionTitle}>
          More <span className={styles.titleMediaType}>{mediaTypePretty}</span>{" "}
          like{" "}
          <span className={styles.mediaTitle}>
            {" "}
            {mediaTypeMovie ? this.props.title : this.props.showName}
          </span>
        </div>
        <div className={styles.relatedItemsContainer}>
          <div className={styles.relatedItemsContainerInner}>
            {this.props.relatedmediaData.results
              .slice(0, 6)
              .map(relatedItem => (
                <Link to={"/media/" + mediaType + "/" + relatedItem.id}>
                  <div className={styles.relatedContainer}>
                    <div className={styles.relatedMetaDataContainer}>
                      <div className={styles.relatedTitle}>
                        {mediaTypeMovie ? relatedItem.title : relatedItem.name}
                      </div>
                    </div>
                    <div className={styles.relatedItemPoster}>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" +
                          relatedItem.poster_path
                        }
                        alt="Related Poster"
                        className={styles.relatedPoster}
                      />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(relatedMovies);
