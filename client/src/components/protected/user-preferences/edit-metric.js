import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";

import { getMetricData, editMetricData } from "../../../actions/users";

import "./styles/edit-metric.css";

export class EditMetric extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMetricData(this.props.id));
  }
  setMetric() {
    this.props.dispatch(editMetricData(this.props.id, !this.props.metric));
  }
  render() {
    return (
      <div className="edit-metric">
        <p>
          You are currently using{" "}
          <span className="emphasis">
            {this.props.metric ? "metric" : "imperial"}
          </span>{" "}
          units.
        </p>
        <ul>
          <li>temperature: {this.props.metric ? "celsius" : "fahrenheit"}</li>
          <li>wind speed: {this.props.metric ? "kilometers per hour" : "mph"}</li>
          <li>precipitation: {this.props.metric ? "millimeters" : "inches"}</li>
          <li>air pressure: {this.props.metric ? "mb" : "in"}</li>
        </ul>
        <button onClick={() => this.setMetric()}>
          {this.props.metric ? "enable imperial units" : "enable metric units"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    locations: state.forecast.locations,
    id: state.auth.currentUser.id,
    metric: state.forecast.metric
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditMetric));
