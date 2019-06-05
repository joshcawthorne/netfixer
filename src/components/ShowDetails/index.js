import React, { Component } from "react";
import styles from "./show.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import arrow from "./assets/Arrow.svg";
import SelectedShowDetails from "./modules/selectedShowDetails";
import RelatedShows from "./modules/relatedShows";

class ShowDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showData: [],
      dataLoaded: false
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
      });
    });
  };

  render() {
    return (
      <div>
        <SelectedShowDetails showData={this.state.showData} />
        <RelatedShows updateShow={this.updateShow} />
      </div>
    );
  }
}

export default withRouter(ShowDetails);
