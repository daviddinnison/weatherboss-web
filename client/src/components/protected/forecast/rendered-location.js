import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { Link } from "react-router-dom";
import "./styles/rendered-location.css";

const API_KEY = "b20a7be72cb0b77a";

export class RenderedLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: null,
      // isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
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
            isLoaded: true,
            items: result.current_observation
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const current = this.state.items;
    return (
      <Link
        to={`/forecast/${this.props.name}`}
        className="rendered-location-link"
      >
        <div className="row">
          <div className="primary-location-box col-xs-3">
            <span className="rendered-location-name">{this.props.name}</span>
            <span className="rendered-location-temperature">
              {this.props.metric ? current.temp_c : current.temp_f}
              <span>{this.props.metric ? "°C" : "°F"}</span>
            </span>
            <span className="last-updated">{current.observation_time}</span>
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="rendered-location-condition">
              {current.weather}
            </span>
            <img src={current.icon_url} className="weather-icon" />
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="rendered-location-precipitation">
              precipitation:{" "}
              {this.props.metric
                ? current.precip_today_metric
                : current.precip_today_in}
              <span> {this.props.metric ? "mm" : "in"}</span>
            </span>
            <span className="rendered-location-winds">
              winds: {current.wind_dir}{" "}
              {this.props.metric ? current.wind_kph : current.wind_mph}{" "}
              {this.props.metric ? "kph" : "mph"}
            </span>
            <span className="rendered-location-visibility">
              visibility:{" "}
              {this.props.metric
                ? current.visibility_km
                : current.visibility_mi}
              <span> {this.props.metric ? "km" : "mi"}</span>
            </span>
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="rendered-location-humidity">
              humidity: {current.relative_humidity}
            </span>
            <span className="rendered-location-pressure">
              air pressure:{" "}
              {this.props.metric ? current.pressure_mb : current.pressure_in}
              <span> {this.props.metric ? "mb" : "in"}</span>
            </span>
            <span className="rendered-location-dewpoint">
              dewpoint:{" "}
              {this.props.metric ? current.dewpoint_c : current.dewpoint_f}
              <span> {this.props.metric ? "°C" : "°F"}</span>
            </span>
            <span className="rendered-location-uv">UV index: {current.UV}</span>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));
