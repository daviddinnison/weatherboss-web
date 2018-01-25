import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../../requires-login";
import EditLocations from "./edit-locations";
import EditMetric from "./edit-metric";
import BackButton from "../../reusable/back-button";

export class UserPreferencesPage extends React.Component {
  render() {
    return (
      <div className="user-preferences-page container">
        <BackButton />
        <p>
          welcome and please make yourself at home in the user preferences page
          component.
        </p>
        <EditMetric />
        <EditLocations />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    locations: state.forecast.locations,
    id: state.auth.currentUser.id
  };
};

export default requiresLogin()(connect(mapStateToProps)(UserPreferencesPage));
