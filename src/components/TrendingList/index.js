import React, { Component } from "react";
import styles from "./trending.module.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class TrendingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trends: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=0892b357978ad214e2798df9d45b276e"
    )
      .then(response => response.json())
      .then(data => this.setState({ trends: data.results }))
      .then(this.setState({ dataLoaded: true }));
  }

  render() {
    return (
      <div className={styles.trendingModuleContainer}>
        <div className={styles.trendingTitle}>Popular Shows</div>
        <div className={styles.trendingCardsContainer}>
          {this.state.trends.map(trend => (
            <Link to={"/media/tv/" + trend.id}>
              <div className={styles.trendingCard} key={trend.id} id={trend.id}>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" +
                    trend.poster_path
                  }
                  alt="Poster"
                  className={styles.posterImg}
                />
                <div className={styles.dataContainer}>
                  <div className={styles.name}>{trend.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(TrendingList);
