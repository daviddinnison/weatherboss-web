import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import { getHourlyForecast } from "../../../actions/forecast";

export class HourlyForecast extends React.Component {
  componentDidMount() {
    const location = this.props.name;
    this.props.dispatch(getHourlyForecast(location));
  }

  render() {
    return (
      <div>
        <p>Welcome to the humble hourly forecast component.</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations
  };
};

export default requiresLogin()(connect(mapStateToProps)(HourlyForecast));
