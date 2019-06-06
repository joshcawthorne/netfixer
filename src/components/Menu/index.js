import React, { Component } from "react";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Search from "../Search/index";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "#000"
    };
  }

  componentDidMount() {
    if (
      this.props.location.pathname !== "/" &&
      !this.props.location.pathname.includes("search") &&
      this.props.location.pathname !== "/trending_movies"
    ) {
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
    if (
      this.props.location.pathname !== "/" &&
      !this.props.location.pathname.includes("search") &&
      this.props.location.pathname !== "/trending_movies"
    ) {
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
    return (
      <div className={styles.menuBar}>
        <Link to={"/"} className={styles.menuLogoLink}>
          <div className={styles.menuLogo}>Netfixer</div>
        </Link>
        <Link to={"/"}>
          <div className={styles.menuItem} style={{ color: this.state.theme }}>
            Popular TV
          </div>
        </Link>
        <Link to={"/trending_movies"}>
          <div className={styles.menuItem} style={{ color: this.state.theme }}>
            Popular Movies
          </div>
        </Link>
        <Search />
      </div>
    );
  }
}

export default withRouter(Menu);
