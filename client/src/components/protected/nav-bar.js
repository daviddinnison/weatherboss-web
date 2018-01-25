import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";

import "./styles/nav-bar.css";

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  conditionalRender() {
    if (this.props.loggedIn) {
      return (
        <div className="main-nav">
          <ul>
            <Link to="/dashboard">
              <li>Home</li>
            </Link>
            <Link to="/preferences">
              <li>Settings</li>
            </Link>
            <li onClick={() => this.logOut()} className="logout-button">
              <a href="#">Log out</a>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.conditionalRender()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);
