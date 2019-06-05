import React, { Component } from "react";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "#000"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    if (this.props.location.pathname !== "/") {
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
        <div
          className={styles.menuItem}
          style={{ color: this.state.theme, cursor: "not-allowed" }}
        >
          Popular Movies
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
