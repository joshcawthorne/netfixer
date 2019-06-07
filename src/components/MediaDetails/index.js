import React, { Component } from "react";
import styles from "./mediaDetails.module.css";
import { withRouter } from "react-router-dom";
import SelectedMediaDetails from "./modules/selectedMediaDetails";
import RelatedMedia from "./modules/relatedMedia";
import RelatedToActor from "./modules/relatedToActor";
import Reviews from "../Reviews/reviews";

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      dataLoaded: false,
      relatedData: [],
      relatedLoaded: false,
      reviewData: [],
      reviewLoaded: false,
      reviewDisplay: false,
      relatedDisplay: true,
      detailsData: [],
      detailsDisplay: false,
      detailsLoaded: false,
      mediaType: "movie"
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/" +
        this.props.match.params.mediaType +
        "/" +
        this.props.match.params.itemId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ mediaData: data });
        this.setState({ dataLoaded: true });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/" +
        this.props.match.params.mediaType +
        "/" +
        this.props.match.params.itemId +
        "/recommendations?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ relatedData: data });
        this.setState({ relatedLoaded: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/" +
        this.props.match.params.mediaType +
        "/" +
        this.props.match.params.itemId +
        "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ reviewData: data });
        this.setState({ reviewLoaded: true });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/" +
        this.props.match.params.mediaType +
        "/" +
        this.props.match.params.itemId +
        "/credits?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ detailsData: data });
        this.setState({ detailsLoaded: true });
      });
    });

    if (this.props.match.params.mediaType === "movie") {
      this.setState({
        mediaType: "movie"
      });
    } else {
      this.setState({
        mediaType: "tv"
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemId !== this.props.match.params.itemId) {
      fetch(
        "https://api.themoviedb.org/3/" +
          this.props.match.params.mediaType +
          "/" +
          this.props.match.params.itemId +
          "?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ mediaData: data });
          this.setState({ dataLoaded: true });
        });
      });
      fetch(
        "https://api.themoviedb.org/3/" +
          this.props.match.params.mediaType +
          "/" +
          this.props.match.params.itemId +
          "/recommendations?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ relatedData: data });
          this.setState({ relatedLoaded: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });

      fetch(
        "https://api.themoviedb.org/3/" +
          this.props.match.params.mediaType +
          "/" +
          this.props.match.params.itemId +
          "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ reviewData: data });
          this.setState({ reviewLoaded: true });
        });
      });

      fetch(
        "https://api.themoviedb.org/3/" +
          this.props.match.params.mediaType +
          "/" +
          this.props.match.params.itemId +
          "/credits?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ detailsData: data });
          this.setState({ detailsLoaded: true });
        });
      });
      if (this.props.match.params.mediaType === "movie") {
        this.setState({
          mediaType: "movie"
        });
      } else {
        this.setState({
          mediaType: "tv"
        });
      }
    }
  }

  selectRelated = () => {
    this.setState({
      relatedDisplay: true,
      reviewDisplay: false,
      detailsDisplay: false
    });
  };

  selectReviews = () => {
    this.setState({
      reviewDisplay: true,
      relatedDisplay: false,
      detailsDisplay: false
    });
  };

  selectDetails = () => {
    this.setState({
      reviewDisplay: false,
      relatedDisplay: false,
      detailsDisplay: true
    });
  };

  render() {
    const reviewDisplay = this.state.reviewDisplay;
    const relatedDisplay = this.state.relatedDisplay;
    const detailsDisplay = this.state.detailsDisplay;
    if (
      this.state.dataLoaded &&
      this.state.relatedLoaded &&
      this.state.reviewLoaded &&
      this.state.detailsLoaded
    ) {
      return (
        <div className={styles.selectedItemDetailContainer}>
          <SelectedMediaDetails
            mediaData={this.state.mediaData}
            extraDetails={this.state.detailsData}
          />

          <div className={styles.detailBoxSelector}>
            <div
              className={
                reviewDisplay
                  ? styles.detailBoxItemSelected
                  : styles.detailBoxItem
              }
              onClick={this.selectReviews}
            >
              Reviews
            </div>
            <div
              className={
                relatedDisplay
                  ? styles.detailBoxItemSelected
                  : styles.detailBoxItem
              }
              onClick={this.selectRelated}
            >
              Related
            </div>
          </div>
          <div className={styles.detailBoxContainer}>
            <div className={styles.relatedOuterContainer}>
              {reviewDisplay ? (
                <div className={styles.reviewOuterContainer}>
                  <Reviews
                    reviewData={this.state.reviewData}
                    title={this.state.mediaData.title}
                  />
                </div>
              ) : (
                <div />
              )}

              {relatedDisplay ? (
                <div className={styles.relatedMediaOuterContainer}>
                  <RelatedMedia
                    relatedmediaData={this.state.relatedData}
                    updateShow={this.updateShow}
                    title={this.state.mediaData.title}
                    showName={this.state.mediaData.name}
                  />

                  {this.state.detailsData.cast.slice(0, 3).map(person => (
                    <RelatedToActor
                      relatedmediaData={this.state.relatedData}
                      person={person}
                      mediaType={this.state.mediaType}
                      updateShow={this.updateShow}
                      title={this.state.mediaData.title}
                      showName={this.state.mediaData.name}
                    />
                  ))}
                </div>
              ) : (
                <div />
              )}

              {detailsDisplay ? <div /> : <div />}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(MovieDetails);
