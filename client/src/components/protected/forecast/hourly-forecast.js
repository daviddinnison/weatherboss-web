import React from "react";
import { connect } from "react-redux";

import requiresLogin from "../../requires-login";
import ApiAttribution from "../../unprotected/api-attribution";

import { getHourlyForecast } from "../../../actions/forecast";
import Loader from "halogen/ClipLoader";

import "./styles/hourly-forecast.css";

export class HourlyForecast extends React.Component {
  componentDidMount() {
    const location = this.props.name;
    this.props.dispatch(getHourlyForecast(location));
  }
  renderHours() {
    if (this.props.hourlyLoading === false) {
      const hourlyData = this.props.hourlyForecastData.map((item, index) => (
        <li className="hourly gradient row" key={index}>
          <div className="col-xs-12 col-sm-2">
            {item.FCTTIME.civil === "12:00 AM" ? (
              <span className="hourly-time-midnight">
                {item.FCTTIME.weekday_name},
              </span>
            ) : (
              ""
            )}
            <span className="hourly-time">{item.FCTTIME.civil}</span>
            <div className="hourly-temp">
              <span>
                {this.props.metric ? item.temp.metric : item.temp.english}
                <span className="hourly-temp-degrees">
                  {this.props.metric ? "°C" : "°F"}
                </span>
              </span>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            <span className="hourly-heading hourly-condition">
              {item.condition}
            </span>
            <img src={item.icon_url} alt="weather icon representing forecast" className="hourly-img"/>
          </div>
          <div className="col-xs-12 col-sm-3">
            <span className="hourly-inner">
              <span className="hourly-heading">chance of precip: </span>{" "}
              {item.pop}%
            </span>
            <span className="hourly-inner">
              <span className="hourly-heading">wind: </span>
              {item.wdir.dir}{" "}
              {this.props.metric ? item.wspd.metric : item.wspd.english}{" "}
              {this.props.metric ? "kph" : "mph"}
            </span>

            <span className="hourly-inner">
              <span className="hourly-heading">cloud cover: </span>
              {item.sky}%
            </span>
          </div>
          <div className="col-xs-12 col-sm-3">
            <span className="hourly-inner">
              <span className="hourly-heading">humidity: </span>
              {item.humidity}%
            </span>

            <span className="hourly-inner">
              <span className="hourly-heading">air pressure: </span>
              {this.props.metric ? item.mslp.metric : item.mslp.english}{" "}
              {this.props.metric ? "mb" : "in"}
            </span>

            <span className="hourly-inner">
              <span className="hourly-heading">UV index: </span>
              {item.uvi}%
            </span>
            <span className="hourly-inner">
              <span className="hourly-heading">dewpoint: </span>
              {this.props.metric
                ? item.dewpoint.metric
                : item.dewpoint.english}{" "}
              {this.props.metric ? "°C" : "°F"}
            </span>
          </div>
        </li>
      ));
      return (
        <div>
          <ul>{hourlyData}</ul>
          <ApiAttribution/>
        </div>
      );
    } else if (this.props.hourlyLoading === true) {
      return (
        <div className="loader">
          <Loader color="#5a5a5a" size="50px" margin="4px" />
        </div>
      );
    }
  }

  render() {
    return <div className="hourly-wrapper">{this.renderHours()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    hourlyForecastData: state.forecast.hourlyForecastData,
    hourlyLoading: state.forecast.hourlyLoading,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(HourlyForecast));
