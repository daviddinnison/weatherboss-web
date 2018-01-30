import React from "react";
import { connect } from "react-redux";
import Loader from "halogen/ClipLoader";

import requiresLogin from "../../requires-login";
import ApiAttribution from "../../unprotected/api-attribution";

import { getExtendedForecast } from "../../../actions/forecast";

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
          <li className="individual-day gradient row" key={index}>
            <div className="col-xs-12 col-sm-3">
              <span className="extended-time">
                {item.date.weekday}, {item.date.monthname} {item.date.day}
              </span>
              <span className="extended-inner">
                <span className="extended-heading">High:</span>{" "}
                {this.props.metric ? item.high.celsius : item.high.fahrenheit}
                {this.props.metric ? "°C" : "°F"}
              </span>
              <span className="extended-temp-inner">
                <span className="extended-heading">Low:</span>{" "}
                {this.props.metric ? item.low.celsius : item.low.fahrenheit}
                {this.props.metric ? "°C" : "°F"}
              </span>
            </div>
            <div className="col-xs-12 col-sm-2">
              <div className="extended-temp">
                <span className="extended-heading extended-conditions">
                  {item.conditions}
                </span>
                <img src={item.icon_url} alt="weather icon representing forecast" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-3">
              <span className="extended-inner">
                <span className="extended-heading">chance of precip: </span>{" "}
                {item.pop}%
              </span>
              <span className="extended-inner">
                <span className="extended-heading">wind: </span>
                {item.avewind.dir}{" "}
                {this.props.metric ? item.avewind.kph : item.avewind.mph}{" "}
                {this.props.metric ? "kph" : "mph"}
              </span>
              <span className="extended-inner">
                <span className="extended-heading">humidity: </span>
                {item.avehumidity}%
              </span>
            </div>
          </li>
        )
      );
      return (
        <div className="extended-forecast">
          <ul>{tenDayData}</ul>
          <ApiAttribution/>
        </div>
      );
    } else if (this.props.extendedLoading === true) {
      return (
        <div className="loader">
          <Loader color="#5a5a5a" size="50px" margin="4px" />
        </div>
      );
    }
  }

  render() {
    return <div className="extended-wrapper">{this.renderDays()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    extendedForecastData: state.forecast.extendedForecastData,
    extendedLoading: state.forecast.extendedLoading,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(ExtendedForecast));
