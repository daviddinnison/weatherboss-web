import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../../requires-login";
import BackButton from "../../reusable/back-button";
import ExtendedForecast from "./extended-forecast";
import CurrentConditions from "./current-conditions";
import ForecastAlert from "./forecast-alert";
import HourlyForecast from "./hourly-forecast";

import "./styles/forecast-page.css";

export class ForecastPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hourly: true,
      extended: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      hourly: !this.state.hourly,
      extended: !this.state.extended
    });
  }
  componentDidMount() {
    const location = this.props.location.pathname.replace("/forecast/", "");
  }

  render() {
    const location = this.props.location.pathname.replace("/forecast/", "");
    return (
      <div className="container forecast-page">
        <BackButton />
        <h2>{location}</h2>
        <ForecastAlert name={location} />

        <span onClick={this.handleClick} className="toggle-forecast">
          {this.state.hourly && "extended forecast"}
          {this.state.extended && "hourly forecast"}
        </span>
        {this.state.hourly && <HourlyForecast name={location}/>}
        {this.state.extended && <ExtendedForecast name={location} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    test: state.forecast.test
  };
};

export default requiresLogin()(connect(mapStateToProps)(ForecastPage));
