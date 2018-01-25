import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../../requires-login";
import { getExtendedForecast } from "../../../actions/forecast";

import Loader from "halogen/SyncLoader";

import "./styles/extended-forecast.css";

export class ExtendedForecast extends React.Component {
  componentDidMount() {
    const location = this.props.name;
    this.props.dispatch(getExtendedForecast(location));
  }
  renderDays() {
    console.log(this.props.extendedForecastData.forecastday);
    if (this.props.extendedLoading === false) {
      const tenDayData = this.props.extendedForecastData.forecastday.map(
        (item, index) => (
          <li className="individual-day gradient row" key={index}>
            <div className="col-xs-3">
              <h4>
                {item.date.weekday}, {item.date.monthname} {item.date.day}
              </h4>
            </div>
            <div className="col-xs-3 extended-conditions">
              <p>{item.conditions}</p>
              <img src={item.icon_url} />
            </div>
            <div className="col-xs-3 extended-temp">
              <p>
                H:{" "}
                {this.props.metric ? item.high.celsius : item.high.fahrenheit}
                {this.props.metric ? "°C" : "°F"}
              </p>
              <p>
                L: {this.props.metric ? item.low.celsius : item.low.fahrenheit}
                {this.props.metric ? "°C" : "°F"}
              </p>
            </div>
            <div className="col-xs-3 extended-precip">
              <p>
                {this.props.metric ? item.qpf_allday.mm : item.qpf_allday.in}{" "}
                {this.props.metric ? "mm" : "in"} precipitation
              </p>
              <p>{item.avehumidity}% avg humidity</p>
            </div>
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
    extendedLoading: state.forecast.extendedLoading,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(ExtendedForecast));
