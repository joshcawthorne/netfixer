import React, { Component } from "react";
import styles from "../searchResults.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import NoArtwork from "../assets/no_artwork.jpg";

class SearchOutput extends Component {
  render() {
    return (
      <div className={styles.searchResultsContainer}>
        {this.props.searchResults.map(search => {
          if (search.name) {
            if (search.poster_path) {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" +
                        search.poster_path
                      }
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.name}</div>
                    </div>
                  </div>
                </Link>
              );
            } else if (search.backdrop_path) {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        search.backdrop_path
                      }
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.name}</div>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={NoArtwork}
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.name}</div>
                    </div>
                  </div>
                </Link>
              );
            }
          } else if (search.title) {
            if (search.poster_path) {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" +
                        search.poster_path
                      }
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.title}</div>
                    </div>
                  </div>
                </Link>
              );
            } else if (search.backdrop_path) {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        search.backdrop_path
                      }
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.title}</div>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link to={"/media/" + search.media_type + "/" + search.id}>
                  <div
                    className={styles.searchCard}
                    key={search.id}
                    id={search.id}
                  >
                    <img
                      src={NoArtwork}
                      alt="Poster"
                      className={styles.posterImg}
                    />
                    <div className={styles.dataContainer}>
                      <div className={styles.name}>{search.title}</div>
                    </div>
                  </div>
                </Link>
              );
            }
          }
        })}
      </div>
    );
  }
}

export default withRouter(SearchOutput);
