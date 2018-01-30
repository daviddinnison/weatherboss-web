import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import requiresLogin from "../requires-login";
import NewLocationForm from "./forms/new-location-form";

// (free commercial use image) courtesy of https://pixabay.com/en/compass-trip-travel-directions-2384365/
import compass from "./images/compass.svg";

import "./styles/new-location-page.css";

export class NewLocationPage extends React.Component {
  render() {
    if (this.props.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container new-location-page">
        <div className="row">
          <div className="col-sm-6">
            <img src={compass} className="compass-img" alt="compass"/>
          </div>
          <div className="col-sm-6  new-location-info">
            <p>
              add a location to gain access to weather data from all over the
              world!
            </p>
            <NewLocationForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    locations: state.forecast.locations,
    redirect: state.protectedData.redirect
  };
};

export default requiresLogin()(connect(mapStateToProps)(NewLocationPage));
