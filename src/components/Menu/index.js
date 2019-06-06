import React, { Component } from "react";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Search from "../Search/index";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "#000",
      logoTheme: "#000",
      tvMenu: "#000",
      filmMenu: "#000"
    };
  }

  componentDidMount() {
    if (
      this.props.location.pathname !== "/" &&
      !this.props.location.pathname.includes("search") &&
      this.props.location.pathname !== "/trending_movies" &&
      !this.props.location.pathname.includes("actor")
    ) {
      this.setState({
        theme: "#fff",
        tvMenu: "#fff",
        filmMenu: "#fff",
        logoTheme: "rgba(255, 255, 255, 0)"
      });
    } else {
      this.setState({
        theme: "#000",
        logoTheme: "#000"
      });
    }
    if (this.props.location.pathname === "/") {
      this.setState({
        tvMenu: "rgb(128, 128, 128)",
        filmMenu: "#000"
      });
    } else if (this.props.location.pathname === "/trending_movies") {
      this.setState({
        filmMenu: "rgb(128, 128, 128)",
        tvMenu: "#000"
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
      this.props.location.pathname !== "/trending_movies" &&
      !this.props.location.pathname.includes("actor")
    ) {
      this.setState({
        theme: "#fff",
        tvMenu: "#fff",
        filmMenu: "#fff",
        logoTheme: "rgba(255, 255, 255, 0)"
      });
    } else {
      this.setState({
        theme: "#000",
        logoTheme: "#000"
      });
    }
    if (this.props.location.pathname === "/") {
      this.setState({
        tvMenu: "rgb(128, 128, 128)",
        filmMenu: "#000"
      });
    } else if (this.props.location.pathname === "/trending_movies") {
      this.setState({
        filmMenu: "rgb(128, 128, 128)",
        tvMenu: "#000"
      });
    }
  }

  render() {
    return (
      <div className={styles.menuBar}>
        <Link to={"/"} className={styles.menuLogoLink}>
          <div
            className={styles.menuLogo}
            style={{ backgroundColor: this.state.logoTheme }}
          >
            Netfixer
          </div>
        </Link>
        <Link to={"/"}>
          <div className={styles.menuItem} style={{ color: this.state.tvMenu }}>
            Popular TV
          </div>
        </Link>
        <Link to={"/trending_movies"}>
          <div
            className={styles.menuItem}
            style={{ color: this.state.filmMenu }}
          >
            Popular Movies
          </div>
        </Link>
        <Search />
      </div>
    );
  }
}

export default withRouter(Menu);
