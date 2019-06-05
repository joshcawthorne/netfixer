import React, { Component } from "react";
import styles from "./show.module.css";
import { withRouter } from "react-router-dom";
import SelectedShowDetails from "./modules/selectedShowDetails";
import RelatedShows from "./modules/relatedShows";

class ShowDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showData: [],
      dataLoaded: false,
      relatedData: [],
      relatedLoaded: false
    };
  }

  componentWillMount() {
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

  render() {
    if (this.state.dataLoaded && this.state.relatedLoaded) {
      return (
        <div>
          <SelectedShowDetails showData={this.state.showData} />
          <RelatedShows
            relatedShowData={this.state.relatedData}
            updateShow={this.updateShow}
          />
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

export default withRouter(ShowDetails);
