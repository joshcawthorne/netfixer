import React, { Component } from "react";
import styles from "../show.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";

class relatedShows extends Component {
  render() {
    return (
      <div className={styles.relatedShows}>
        <div className={styles.relatedSectionTitle}>You Might Also Like</div>
        <div className={styles.relatedItemsContainer}>
          {this.props.relatedData.results.slice(0, 6).map(relatedItem => (
            <Link
              to={"/show/" + relatedItem.id}
              onClick={() => {
                this.props.updateShow(relatedItem.id);
              }}
            >
              <div className={styles.relatedContainer}>
                <div className={styles.relatedMetaDataContainer}>
                  <div className={styles.relatedTitle}>{relatedItem.name}</div>
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
    );
  }
}

export default withRouter(relatedShows);
