import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import requiresLogin from "../requires-login";

import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";



import "./styles/nav-bar.css";

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <div className="main-nav">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/preferences">Settings</Link>
          </li>
          <li onClick={() => this.logOut()}><a href="#">Log out</a></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(NavBar));
