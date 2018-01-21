import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../../requires-login";
import BackButton from "../../reusable/back-button";
import { getExtendedForecast } from "../../../actions/forecast";

import Loader from "halogen/SyncLoader";

import "./styles/extended-forecast.css";

export class ExtendedForecast extends React.Component {
  componentDidMount() {
    const location = this.props.name;
    this.props.dispatch(getExtendedForecast(location));
  }
  renderDays() {
    if (this.props.extendedLoading === false) {
      const tenDayData = this.props.extendedForecastData.forecastday.map(
        (item, index) => (
          <li className="individual-day" key={index}>
            <h4>
              {item.date.weekday}, {item.date.monthname} {item.date.day}
            </h4>
            <img src={item.icon_url} />
            <p>{item.conditions}</p>
            <p>high: {item.high.fahrenheit}° F</p>
            <p>low: {item.low.fahrenheit}° F</p>
          </li>
        )
      );
      return (
        <div className="extended-forecast">
          <ul>{tenDayData}</ul>
        </div>
      );
    } else if (this.props.extendedLoading === true) {
      return <Loader color="#1E1E1E" size="10px" margin="4px" />;
    }
  }

  render() {
    return <div>{this.renderDays()}</div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    extendedForecastData: state.forecast.extendedForecastData,
    extendedLoading: state.forecast.extendedLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(ExtendedForecast));
