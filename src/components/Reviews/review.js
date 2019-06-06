import React, { Component } from "react";
import styles from "./reviews.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    };
  }

  toggleExpand = () => {
    if (this.state.expand) {
      this.setState({
        expand: false
      });
    } else {
      this.setState({
        expand: true
      });
    }
    console.log(this.state.expand);
  };

  render() {
    const expand = this.state.expand;
    if (this.props.content.length > 836) {
      return (
        <div className={styles.reviewCardContainer}>
          <div className={styles.reviewAuthor}>
            A review by <b>{this.props.author}</b>
          </div>
          <div
            className={
              expand ? styles.reviewContainerExpanded : styles.reviewContainer
            }
          >
            <div className={styles.reviewContent}>{this.props.content}</div>
          </div>
          <div className={styles.expand} onClick={this.toggleExpand}>
            {expand ? "Hide" : "Show All"}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.reviewCardContainer}>
          <div className={styles.reviewAuthor}>
            A review by <b>{this.props.author}</b>
          </div>
          <div
            className={
              expand ? styles.reviewContainerExpanded : styles.reviewContainer
            }
          >
            <div className={styles.reviewContent}>{this.props.content}</div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(reviews);
