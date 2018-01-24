import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import RegistrationForm from "./forms/registration-form";

import laptop from "./images/laptop.svg";
// (free commercial use image) courtesy of https://pixabay.com/en/laptop-computer-portable-pc-2298286/

import "./styles/registration-page.css";

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <img src={laptop} className="laptop-img" />
        </div>
        <div className="col-sm-6">
          <h2>Become a WeatherBoss</h2>
          <RegistrationForm />
          <Link to="/">Go back</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
