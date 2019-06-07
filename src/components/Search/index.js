import React, { Component } from "react";
import styles from "./search.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      theme: "#000"
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let searchString = this.state.search.replace(" ", "+").toLowerCase();
    this.props.history.push(`/search/${searchString}`);
    this.setState({
      search: ""
    });
  }

  componentDidMount() {
    if (this.props.location.pathname.includes("/media/")) {
      this.setState({
        theme: "#fff"
      });
    } else {
      this.setState({
        theme: "#000"
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    if (this.props.location.pathname.includes("/media/")) {
      this.setState({
        theme: "#fff"
      });
    } else {
      this.setState({
        theme: "#000"
      });
    }
  }

  render() {
    let mediaPage;
    if (this.props.location.pathname.includes("/media/")) {
      mediaPage = true;
    } else {
      mediaPage = false;
    }
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleInput}
          className={mediaPage ? styles.searchLight : styles.searchDark}
          style={{
            borderColor: this.state.theme,
            color: this.state.theme
          }}
          placeholder="Search..."
          autocomplete="off"
        />
      </form>
    );
  }
}

export default withRouter(Search);
