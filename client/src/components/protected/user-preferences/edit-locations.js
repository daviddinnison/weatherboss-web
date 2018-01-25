import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";

import { fetchLocations } from "../../../actions/forecast";
import { deleteLocation } from "../../../actions/users";

export class EditLocations extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations(this.props.id));
  }

  deleteItem(locationId) {
    this.props.dispatch(deleteLocation(this.props.id, locationId));
  }

  renderLocationsEdit() {
    const locationsData = this.props.locations.map((item, index) => (
      <li key={item._id} onClick={() => this.deleteItem(item._id)}>
        {item.name}
      </li>
    ));

    return (
      <div>
        <ul>{locationsData}</ul>
      </div>
    );
  }

  render() {
    return (
      <div className="edit-locations">
        <h1>Edit locations</h1>
        {this.renderLocationsEdit()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    locations: state.forecast.locations,
    id: state.auth.currentUser.id
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditLocations));
