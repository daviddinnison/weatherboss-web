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
        <li className="hourly row" key={index}>
          <div className="col-xs-2 hourly-time">
            <p>{item.FCTTIME.civil}</p>
          </div>
          <div className="col-xs-3 hourly-temp">
            <p>
              {item.temp.english} <span className="hourly-temp-degrees">°F</span>
            </p>
            <p>
              <span className="feels-like">feels like {item.feelslike.english}</span>
            
              <span className="feels-like-degrees">°F</span>
            </p>
          </div>
          <div className="col-xs-4 hourly-condition">
            <img src={item.icon_url} />
            <p>{item.condition}</p>
          </div>
          <div className="col-xs-3">
            <p>precip: {item.qpf.english} in</p>
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
    console.log("HOURLY DATA PROPS", this.props.hourlyForecastData);
    return <div>{this.renderHours()}</div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    hourlyForecastData: state.forecast.hourlyForecastData,
    hourlyLoading: state.forecast.hourlyLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(HourlyForecast));
