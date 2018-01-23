import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { getHourlyForecast } from "../../../actions/forecast";
import Loader from "halogen/SyncLoader";

export class HourlyForecast extends React.Component {
  componentDidMount() {
    const location = this.props.name;
    this.props.dispatch(getHourlyForecast(location));
  }
  renderHours() {
    if (this.props.hourlyLoading === false) {
      const hourlyData = this.props.hourlyForecastData.map(
        (item, index) => (
          <li className="individual-day" key={index}>
            <p>{item.FCTTIME.civil} {item.FCTTIME.mday} {item.FCTTIME.month_name}</p>
            <p>{item.condition}</p>
            <img src={item.icon_url} />

            {/* new box */}
            <p>{item.temp.english}° F</p>
            <p>feels like {item.feelslike.english}° F</p>

            {/* new box */}
            <p>precip: {item.qpf.english} in</p>
            <p>humidity: {item.humidity}%</p>
          </li>
        )
      );
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
    console.log('HOURLY DATA PROPS', this.props.hourlyForecastData)
    return (
      <div>
        {this.renderHours()}
      </div>
    );
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
