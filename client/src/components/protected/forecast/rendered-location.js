import React from "react";
import { connect } from "react-redux";
import Loader from "halogen/ClipLoader";
import { Link } from "react-router-dom";

import requiresLogin from "../../requires-login";

import "./styles/rendered-location.css";

const API_KEY = "b20a7be72cb0b77a";

export class RenderedLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      items: []
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(
      `http://api.wunderground.com/api/${API_KEY}/conditions/q/${
        this.props.name
      }.json`,
      {}
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(
        result => {
          this.setState({
            loading: false,
            items: result.current_observation
          });
        },
        error => {
          this.setState({
            loading: false,
            error
          });
        }
      );
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="rendered-location-loader">
          <Loader color="#5a5a5a" size="40px" margin="4px" />
        </div>
      );
    } else {
      const current = this.state.items;
      return (
        <Link
          to={`/forecast/${this.props.name}`}
          className="rendered-location-link"
        >
          <div className="row rendered-location-data">
            <div className="primary-location-box col-xs-12 col-sm-3">
              <span className="rendered-location-name">{this.props.name}</span>
              <span className="rendered-location-temperature">
                {this.props.metric ? current.temp_c : current.temp_f}
                <span>{this.props.metric ? "°C" : "°F"}</span>
              </span>
              <span className="last-updated">{current.observation_time}</span>
            </div>
            <div className="rendered-location-box col-xs-12 col-sm-3">
              <span className="rendered-location-heading">
                {current.weather}
              </span>
              <img
                src={current.icon_url}
                className="weather-icon"
                alt="phone"
              />
            </div>
            <div className="rendered-location-box col-xs-12 col-sm-3">
              <span className="rendered-location-inner">
                <span className="rendered-location-heading">
                  precipitation:
                </span>{" "}
                {this.props.metric
                  ? current.precip_today_metric
                  : current.precip_today_in}
                <span> {this.props.metric ? "mm" : "in"}</span>
              </span>
              <span className="rendered-location-inner">
                <span className="rendered-location-heading">winds:</span>{" "}
                {current.wind_dir}{" "}
                {this.props.metric ? current.wind_kph : current.wind_mph}{" "}
                {this.props.metric ? "kph" : "mph"}
              </span>
              <span className="rendered-location-inner">
                <span className="rendered-location-heading">visibility:</span>{" "}
                {this.props.metric
                  ? current.visibility_km
                  : current.visibility_mi}
                <span> {this.props.metric ? "km" : "mi"}</span>
              </span>
              <span className="rendered-location-inner">
                <span className="rendered-location-heading">humidity:</span>{" "}
                {current.relative_humidity}
              </span>
            </div>
          </div>
        </Link>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));
