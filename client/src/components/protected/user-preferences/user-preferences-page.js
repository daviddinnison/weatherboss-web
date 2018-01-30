import React from "react";
import { connect } from "react-redux";

import requiresLogin from "../../requires-login";
import EditLocations from "./edit-locations";
import EditMetric from "./edit-metric";

export class UserPreferencesPage extends React.Component {
  render() {
    return (
      <div className="user-preferences-page container">
        <div className="row">
          <div className="col-sm-4">
            <EditMetric />
          </div>
          <div className="col-sm-8">
            <EditLocations />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.forecast.locations,
    id: state.auth.currentUser.id
  };
};

export default requiresLogin()(connect(mapStateToProps)(UserPreferencesPage));
