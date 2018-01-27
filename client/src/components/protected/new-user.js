import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../requires-login";
import { Link, Redirect } from "react-router-dom";

import NewUserPresetLocations from "./forms/new-user-preset-locations";

// import { fetchLocations } from "../../../actions/forecast";

import {
    validateLocation,
    clearValidateLocationError
  } from "../../actions/users";

export class NewUser extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchLocations(this.props.id));
  // }

  addPresetLocations(input) {
    let locations = [];
    switch (input) {
      case "usa":
        locations = ["New York, NY", "Washington, DC"];
        break;
      case "europe":
        locations = ["London, England", "Berlin, Germany"];
        break;
    }
    for (let i = 0; i < locations.length; i++) {
      console.log(locations[i])
      // this.props.dispatch(validateLocation(this.props.id, locations[i]));
    }
    this.props.dispatch(validateLocation(this.props.id, "Berlin, Germany"))
  }

  render() {
    if (this.props.locations.length !== 0) {
        return <Redirect to="/dashboard" />;
      }
    return (
        
      <div className="new-user">
        <p>
          Welcome to WeatherBoss! Add new locations below with the plus button,
          or if you are curious to see what the weather is like around the world
          select prefered locations!
        </p>
        <NewUserPresetLocations/>
        
        <Link to="/newlocation" className="dashboard-add-location">
        <span
                className="glyphicon glyphicon-plus"
                aria-hidden="true"
              />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
      id: state.auth.currentUser.id,
      locations: state.forecast.locations,
      redirect: state.protectedData.redirect
    };
  };
  
  export default requiresLogin()(connect(mapStateToProps)(NewUser));