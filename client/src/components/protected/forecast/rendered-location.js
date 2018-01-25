import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { Link } from "react-router-dom";
import { getCurrentForecast } from "../../../actions/forecast";
import "./styles/rendered-location.css";

export class RenderedLocation extends React.Component {
  componentDidMount() {
    console.log("metric props......", this.props.metric);
    this.props.dispatch(
      getCurrentForecast(this.props.name, this.props.locationId)
    );
  }

  render() {
    const current = this.props.currentForecastData;

    return (
      <Link
        to={`/forecast/${this.props.name}`}
        className="rendered-location-link"
      >
        <div className="row">
          <div className="rendered-location-box col-xs-3">
            <h1 className="rendered-location-name">{this.props.name}</h1>
            <span className="rendered-location-temperature">
              {this.props.metric ? current.temp_c : current.temp_f}
              <span>{this.props.metric ? "°C" : "°F"}</span>
            </span>
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="rendered-location-condition">
              {current.weather}
            </span>
            <img src={current.icon_url} />
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="">{current.relative_humidity} humidity</span>
          </div>
          <div className="rendered-location-box col-xs-3">
            <span className="">
              winds: {current.wind_dir}{" "}
              {this.props.metric ? current.wind_kph : current.wind_mph} {this
                .props.metric
                ? "kph"
                : "mph"}
            </span>
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
    currentForecastData: state.forecast.currentForecastData,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));
