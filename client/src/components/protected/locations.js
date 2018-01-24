import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../requires-login";
import { Link, Redirect } from "react-router-dom";
import { fetchLocations } from "../../actions/forecast";
import RenderedLocation from "./forecast/rendered-location";

import "./styles/locations.css";

export class Locations extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations(this.props.id));
  }

  renderLocations() {
    const locationsData = this.props.locations.map((item, index) => (
      <li key={item._id} className="single-location gradient">
        <RenderedLocation name={item.name} locationId={item._id} />
        {/* <Link to={`/forecast/${item.name}`}>{item.name}</Link> */}
      </li>
    ));
    return (
      <div className="locations">
        <ul>{locationsData}</ul>
      </div>
    );
  }
  render() {
    return <div>{this.renderLocations()}</div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    id: state.auth.currentUser.id,
    locations: state.forecast.locations
  };
};

export default requiresLogin()(connect(mapStateToProps)(Locations));
