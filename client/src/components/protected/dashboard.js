import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";
import Locations from "./locations";

import { clearRedirect } from "../../actions/protected-data";
import { getMetricData } from "../../actions/users";

import "./styles/dashboard.css";

export class Dashboard extends React.Component {
  componentDidMount() {
    //if user added a location this clears the reducer of redirection props so the user can add another location
    if (this.props.redirect) {
      this.props.dispatch(clearRedirect());
    } else {
      this.props.dispatch(getMetricData(this.props.id));
    }
  }
  render() {
    return (
      <div className="dashboard container">
        <div className="dashboard-username">Welcome, {this.props.username}</div>
        <Locations />
        <Link to="/newlocation" className="dashboard-add-location">
          Add location
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    redirect: state.protectedData.redirect,
    id: state.auth.currentUser.id
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
