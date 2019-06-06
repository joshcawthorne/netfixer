import React, { Component } from "react";
import styles from "./actor.module.css";
import { withRouter } from "react-router-dom";

class Actor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actorData: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/person/" +
        this.props.match.params.actorId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ actorData: data });
        this.setState({ dataLoaded: true });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.actorId !== this.props.match.params.actorId) {
      fetch(
        "https://api.themoviedb.org/3/person/" +
          this.props.match.params.actorId +
          "?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ actorData: data });
          this.setState({ dataLoaded: true });
        });
      });
    }
  }

  render() {
    let imdbLink = "https://www.imdb.com/name/" + this.state.actorData.imdb_id;
    if (this.state.dataLoaded) {
      return (
        <div className={styles.actorContainer}>
          <div className={styles.actorName}>{this.state.actorData.name}</div>
          <div className={styles.actorDescription}>
            {this.state.actorData.biography}
          </div>
          <div className={styles.actorBirthplace}>
            Born on {this.state.actorData.birthday} in{" "}
            {this.state.actorData.place_of_birth}
          </div>
          <div className={styles.imdbLink}>
            <a href={imdbLink}>View IMDB Profile</a>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(Actor);
