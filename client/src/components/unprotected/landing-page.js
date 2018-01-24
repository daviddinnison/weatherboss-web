import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import LoginForm from "./forms/login-form";

import "./styles/landing-page.css";

import globe from "./images/globe.svg";
// commerical freeuse image from https://pixabay.com/en/globe-mesh-sphere-1293295/

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing-page container">
      <div className="row">
        <div className="col-sm-6 landing-info">
          <h1>WeatherBoss</h1>
          <h2>Be the boss of your own weather</h2>
          <ul>
            <li>
              <span
                className="glyphicon glyphicon-cloud landing-glyphicon"
                aria-hidden="true"
              />
              up to the minute current and extended forecasts
            </li>
            <li>
              <span
                className="glyphicon glyphicon-exclamation-sign landing-glyphicon"
                aria-hidden="true"
              />alerts for special conditions
            </li>
            <li>
              <span
                className="glyphicon glyphicon-map-marker landing-glyphicon"
                aria-hidden="true"
              />locations from all around the world
            </li>
          </ul>
          <img src={globe} className="globe-img" />
        </div>
        <div className="col-sm-6 landing-login">
          <LoginForm />
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
