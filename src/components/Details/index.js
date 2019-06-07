import React, { Component } from "react";
import styles from "./details.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Person from "./modules/person";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: this.props.details
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.showId !== this.props.match.params.showId) {
      this.setState({
        details: this.props.details
      });
    }
  }

  render() {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.detailsStarringTitle}>Starring:</div>
        <div className={styles.actorsContainer}>
          {this.props.details.cast.slice(0, 5).map(person => (
            <Person person={person} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
