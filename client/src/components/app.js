import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

// components
import HeaderBar from "./unprotected/header-bar";
import NavBar from "./protected/nav-bar";
import LandingPage from "./unprotected/landing-page";
import Dashboard from "./protected/dashboard";
import RegistrationPage from "./unprotected/registration-page";
import NewLocationPage from "./protected/new-location-page";
import ForecastPage from "./protected/forecast/forecast-page";
import UserPreferencesPage from "./protected/user-preferences/user-preferences-page";
import NewUser from "./protected/new-user";

// actions
import { refreshAuthToken } from "../actions/auth";

export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <HeaderBar />
        <NavBar/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/newlocation" component={NewLocationPage} />
        <Route exact path="/forecast/:name" component={ForecastPage} />
        <Route exact path="/preferences" component={UserPreferencesPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
