import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { Link } from "react-router-dom";
import { getCurrentForecast } from "../../../actions/forecast";
import "./styles/rendered-location.css";

export class RenderedLocation extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCurrentForecast(this.props.name));
  }

  render() {
    return (
      <Link
        to={`/forecast/${this.props.name}`}
        className="rendered-location-link"
      >
        <div className="rendered-location-box">
          <h1 className="rendered-location-name">{this.props.name}</h1>
          <span className="rendered-location-temperature">
            {this.props.currentForecastData.temp_f}
            <span>°F</span>
          </span>
        </div>
        <div className="rendered-location-box">
          <span className="rendered-location-condition">
            {this.props.currentForecastData.weather}
          </span>
          <img src={this.props.currentForecastData.icon_url} />
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
    currentForecastData: state.forecast.currentForecastData
  };
};

export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));
