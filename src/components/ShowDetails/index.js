import React, { Component } from "react";
import styles from "./show.module.css";
import { withRouter } from "react-router-dom";
import SelectedShowDetails from "./modules/selectedShowDetails";
import RelatedShows from "./modules/relatedShows";
import Reviews from "../Reviews/reviews";

class ShowDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showData: [],
      dataLoaded: false,
      relatedData: [],
      relatedLoaded: false,
      reviewData: [],
      reviewLoaded: false,
      reviewDisplay: true,
      relatedDisplay: false
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ showData: data });
        this.setState({ dataLoaded: true });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "/similar?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ relatedData: data });
        this.setState({ relatedLoaded: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ reviewData: data });
        this.setState({ reviewLoaded: true });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.showId !== this.props.match.params.showId) {
      fetch(
        "https://api.themoviedb.org/3/tv/" +
          this.props.match.params.showId +
          "?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ showData: data });
          this.setState({ dataLoaded: true });
        });
      });
      fetch(
        "https://api.themoviedb.org/3/tv/" +
          this.props.match.params.showId +
          "/similar?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ relatedData: data });
          this.setState({ relatedLoaded: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
      fetch(
        "https://api.themoviedb.org/3/tv/" +
          this.props.match.params.showId +
          "/reviews?api_key=0892b357978ad214e2798df9d45b276e"
      ).then(response => {
        response.json().then(data => {
          this.setState({ reviewData: data });
          this.setState({ reviewLoaded: true });
        });
      });
    }
  }

  updateShow = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.showId +
        "?api_key=0892b357978ad214e2798df9d45b276e"
    ).then(response => {
      response.json().then(data => {
        this.setState({ showData: data });
        this.setState({ dataLoaded: true });
        this.props.history.push("/show/" + this.props.match.params.showId);
      });
    });
  };

  selectRelated = () => {
    this.setState({
      relatedDisplay: true,
      reviewDisplay: false
    });
  };

  selectReviews = () => {
    this.setState({
      reviewDisplay: true,
      relatedDisplay: false
    });
  };

  render() {
    const reviewDisplay = this.state.reviewDisplay;
    const relatedDisplay = this.state.relatedDisplay;
    if (
      this.state.dataLoaded &&
      this.state.relatedLoaded &&
      this.state.reviewLoaded
    ) {
      return (
        <div>
          <SelectedShowDetails showData={this.state.showData} />
          <div className={styles.detailBoxSelector}>
            <div className={styles.detailBoxItem} onClick={this.selectRelated}>
              Related
            </div>
            <div className={styles.detailBoxItem} onClick={this.selectReviews}>
              Reviews
            </div>
          </div>
          <div className={styles.detailBoxContainer}>
            <div className={styles.relatedOuterContainer}>
              {reviewDisplay ? (
                <div className={styles.reviewOuterContainer}>
                  <Reviews
                    reviewData={this.state.reviewData}
                    title={this.state.showData.name}
                  />
                </div>
              ) : (
                <div />
              )}

              {relatedDisplay ? (
                <RelatedShows
                  relatedData={this.state.relatedData}
                  updateShow={this.updateShow}
                />
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(ShowDetails);
