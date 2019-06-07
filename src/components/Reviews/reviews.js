import React, { Component } from "react";
import styles from "./reviews.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Review from "./review";

class reviews extends Component {
  render() {
    if (this.props.reviewData.results.length > 0) {
      return (
        <div className={styles.reviewsModuleContainer}>
          <div className={styles.reviewsTitleContainer}>
            <div className={styles.reviewsTitle}>
              {this.props.title} Reviews
            </div>
          </div>
          <div className={styles.reviewsContainer}>
            {this.props.reviewData.results.slice(0, 6).map(review => (
              <Review author={review.author} content={review.content} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.relatedShows}>
          <div className={styles.relatedSectionTitle}>
            {this.props.title} Reviews:
          </div>
          <div className={styles.reviewsContainer}>
            <p>Sorry, there aren't any reviews for {this.props.title}.</p>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(reviews);
