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
        <button onClick={() => this.setMetric()}>
          <span className="glyphicon glyphicon-transfer" aria-hidden="true" />
          {this.props.metric
            ? "switch to imperial units"
            : "switch to metric units"}
        </button>
        <p>
          You are using {this.props.metric ? "metric" : "imperial"} units. You
          will see temperature in {this.props.metric ? "Celsius" : "Fahrenheit"},
          wind speed in {this.props.metric ? "kph" : "mph"}, and precipitation in{" "}
          {this.props.metric ? "millimeters" : "inches"}.
        </p>
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
