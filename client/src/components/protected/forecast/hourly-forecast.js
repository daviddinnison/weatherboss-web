import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { getHourlyForecast } from "../../../actions/forecast";
import Loader from "halogen/SyncLoader";
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
          <div className="col-xs-2 hourly-time">
            <p>{item.FCTTIME.civil}</p>
          </div>
          <div className="col-xs-3 hourly-condition">
            <p>{item.condition}</p>
            <img src={item.icon_url} />
          </div>
          <div className="col-xs-3 hourly-temp">
            <p>
              {this.props.metric ? item.temp.metric : item.temp.english}
              <span className="hourly-temp-degrees">
                {this.props.metric ? "°C" : "°F"}
              </span>
            </p>
            <p>
              <span className="feels-like">
                feels like{" "}
                {this.props.metric
                  ? item.feelslike.metric
                  : item.feelslike.english}
              </span>
              <span className="feels-like-degrees">
                {this.props.metric ? "°C" : "°F"}
              </span>
            </p>
          </div>
          <div className="col-xs-4">
            <p>
              precip: {this.props.metric ? item.qpf.metric : item.qpf.english}{" "}
              {this.props.metric ? "mm" : "in"}
            </p>
            <p>humidity: {item.humidity}%</p>
          </div>
        </li>
      ));
      return (
        <div className="extended-forecast">
          <ul>{hourlyData}</ul>
        </div>
      );
    } else if (this.props.hourlyLoading === true) {
      return <Loader color="#1E1E1E" size="10px" margin="4px" />;
    }
  }

  render() {
    return <div>{this.renderHours()}</div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    hourlyForecastData: state.forecast.hourlyForecastData,
    hourlyLoading: state.forecast.hourlyLoading,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(HourlyForecast));
