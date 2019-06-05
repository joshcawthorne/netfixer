import React, { Component } from "react";
import styles from "../show.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "../assets/Arrow.svg";

class relatedShows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedData: [],
      relatedLoaded: false
    };
  }

  componentWillMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "/similar?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ relatedData: data });
        this.setState({ relatedLoaded: true });
      });
    });
  }

  render() {
    if (this.state.relatedLoaded) {
      return (
        <div className={styles.relatedShows}>
          <div className={styles.relatedSectionTitle}>You Might Also Like</div>
          <div className={styles.relatedItemsContainer}>
            {this.state.relatedData.results.slice(0, 6).map(relatedItem => (
              <Link to={"/show/" + relatedItem.id}>
                <button
                  onClick={() => {
                    this.props.updateShow(relatedItem.id);
                  }}
                >
                  TEST
                </button>
                <div className={styles.relatedContainer}>
                  <div className={styles.relatedMetaDataContainer}>
                    <div className={styles.relatedTitle}>
                      {relatedItem.name}
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
      );
    } else {
      return <div>Loading Related Shows...</div>;
    }
  }
}

export default withRouter(relatedShows);
