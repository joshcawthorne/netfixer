import React, { Component } from "react";
import styles from "../mediaDetails.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import RelatedToActorBlock from "./relatedToActorBlock";

class relatedToActor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personData: [],
      dataLoaded: false,
      mediaType: "movie"
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/person/" +
        this.props.person.id +
        "/" +
        this.props.mediaType +
        "_credits?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ personData: data });
        this.setState({ dataLoaded: true });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemId !== this.props.match.params.itemId) {
      fetch(
        "https://api.themoviedb.org/3/person/" +
          this.props.person.id +
          "/" +
          this.props.mediaType +
          "_credits?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ personData: data });
          this.setState({ dataLoaded: true });
        });
      });
    }
  }

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
    if (this.state.dataLoaded) {
      return (
        <div className={styles.relatedShows}>
          <div className={styles.relatedSectionTitle}>
            More{" "}
            <span className={styles.titleMediaType}>{mediaTypePretty}</span>{" "}
            featuring{" "}
            <span className={styles.mediaTitle}>{this.props.person.name}</span>
          </div>
          <div className={styles.relatedItemsContainer}>
            <div className={styles.relatedItemsContainerInner}>
              {this.state.personData.cast.slice(0, 6).map(relatedItem => (
                <RelatedToActorBlock
                  actorDetails={relatedItem}
                  mediaType={mediaType}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading ... </div>;
    }
  }
}

export default withRouter(relatedToActor);
