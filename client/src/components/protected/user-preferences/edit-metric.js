import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";

import { getMetricData, editMetricData } from "../../../actions/users";

export class EditMetric extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMetricData(this.props.id));
  }
  setMetric() {
      console.log('METRIC DATA', this.props.metric)
      console.log('OPPOSITE OF METRIC DATA', !this.props.metric)
    this.props.dispatch(editMetricData(this.props.id, !this.props.metric));
  }
  render() {
    return (
      <div className="edit-metric">
        <h1>metric component</h1>
        <button onClick={() => this.setMetric()}>{this.props.metric ? "set fahrenheigh" : "set celsius"}</button>
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
