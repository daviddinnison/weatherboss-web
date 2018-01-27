import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import requiresLogin from "../../requires-login";
import {
  validateLocation,
  clearValidateLocationError
} from "../../../actions/users";

export class NewUserPresetLocations extends React.Component {
  componentDidMount() {
    //clears any existing errors
    this.props.dispatch(clearValidateLocationError());
  }

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
      console.log(locations[i]);
      // this.props.dispatch(validateLocation(this.props.id, locations[i]));
      this.props.dispatch(validateLocation(this.props.id, locations[i]));
    }
    console.log('heloooooo')
    // return <Redirect to="/dashboard" />;
  }

  render() {
    return (
      <ul>
        <li onClick={() => this.addPresetLocations("usa")}>USA</li>
        <li onClick={() => this.addPresetLocations("europe")}>Europe</li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locationError: state.forecast.locationError
  };
};

export default requiresLogin()(
  connect(mapStateToProps)(NewUserPresetLocations)
);
