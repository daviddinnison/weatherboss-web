import React from "react";
import { connect } from "react-redux";
import Loader from "halogen/ClipLoader";

import requiresLogin from "../requires-login";
import RenderedLocation from "./forecast/rendered-location";
import ApiAttribution from "../unprotected/api-attribution";
import NewUser from "./new-user";

import { fetchLocations } from "../../actions/forecast";

import "./styles/locations.css";

export class Locations extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations(this.props.id));
  }

  renderLocations() {
    if (this.props.fetchLocationLoading) {
      return (
        <div className="location-loader">
          <Loader color="#5a5a5a" size="50px" margin="4px" />
        </div>
      );
    } else if (this.props.locations.length === 0) {
      return <NewUser />;
    } else {
      const locationsData = this.props.locations.map((item, index) => (
        <li key={item._id} className="single-location gradient">
          <RenderedLocation name={item.name} locationId={item._id} />
        </li>
      ));
      return (
        <div className="locations">
          <ul>{locationsData}</ul>
          <ApiAttribution />
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderLocations()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    id: state.auth.currentUser.id,
    locations: state.forecast.locations,
    fetchLocationLoading: state.forecast.fetchLocationLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(Locations));
