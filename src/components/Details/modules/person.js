import React, { Component } from "react";
import styles from "../details.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
        this.props.person.profile_path
      })`
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.showId !== this.props.match.params.showId) {
      this.setState({
        backgroundImage: this.props.person.profile_path
      });
    }
  }

  render() {
    return (
      <Link to={`/person/${this.props.person.id}`}>
        <div className={styles.actorContainer}>
          <div className={styles.actorImageContainer}>
            <div
              style={{
                backgroundImage: this.state.backgroundImage
              }}
              className={styles.actorImage}
            />
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(review);
