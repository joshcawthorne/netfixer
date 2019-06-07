import React, { Component } from "react";
import styles from "../mediaDetails.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class RelatedToActorBlock extends Component {
  render() {
    console.log("Refreshed: " + this.props.actorDetails);
    return (
      <Link
        to={"/media/" + this.props.mediaType + "/" + this.props.actorDetails.id}
      >
        <div className={styles.relatedContainer}>
          <div className={styles.relatedMetaDataContainer}>
            <div className={styles.relatedTitle}>
              {this.props.actorDetails.title}
            </div>
          </div>
          <div className={styles.relatedItemPoster}>
            <img
              src={
                "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" +
                this.props.actorDetails.poster_path
              }
              alt="Related Poster"
              className={styles.relatedPoster}
            />
          </div>
        </div>
      </Link>
    );
  }
}
export default withRouter(RelatedToActorBlock);
