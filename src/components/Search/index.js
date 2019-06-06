import React, { Component } from "react";
import styles from "./search.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
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

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleInput}
          className={styles.search}
          placeholder="Search for a Film, Movie or Actor..."
          autocomplete="off"
        />
      </form>
    );
  }
}

export default withRouter(Search);
