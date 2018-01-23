import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import requiresLogin from "../requires-login";
import NewLocationForm from "./forms/new-location-form";
import BackButton from "../reusable/back-button";

import "./styles/new-location-page.css";

export class NewLocationPage extends React.Component {
  // conditionalBackButton(){
  //     if(this.props.locations.length!==0) {
  //         return <BackButton/>
  //     }
  // }

  render() {
    if (this.props.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container new-location-page">
        <BackButton />
        <h2>Add location</h2>
        <NewLocationForm />
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

export default requiresLogin()(connect(mapStateToProps)(NewLocationPage));
