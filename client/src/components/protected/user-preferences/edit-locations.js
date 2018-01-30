import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "halogen/ClipLoader";

import requiresLogin from "../../requires-login";

import { fetchLocations } from "../../../actions/forecast";
import { deleteLocation } from "../../../actions/users";

import "./styles/edit-locations.css";

export class EditLocations extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations(this.props.id));
  }

  deleteItem(locationId) {
    this.props.dispatch(deleteLocation(this.props.id, locationId));
  }

  renderLocationsEdit() {
    if (this.props.fetchLocationLoading) {
      return (<div className="edit-location-loader">
      <Loader color="#5a5a5a" size="20px" margin="4px" />
    </div>);
    } else {
      const locationsData = this.props.locations.map((item, index) => (
        <li key={item._id}>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you wish to delete ${
                    item.name
                  } from your list of saved locations?`
                )
              )
                this.deleteItem(item._id);
            }}
          >
            <span className="glyphicon glyphicon-trash" aria-hidden="true" />
          </button>
          <span className="edit-locations-location-name">{item.name}</span>
        </li>
      ));

      return (
        <div>
          <ul>{locationsData}</ul>
        </div>
      );
    }
  }

  render() {
    const link = (
      <Link to="/newlocation" className="edit-add-location">
        Add locations
      </Link>
    );
    return (
      <div className="edit-locations">
        {this.props.locations.length > 0 ? <h1>Edit locations</h1> : link}
        {this.renderLocationsEdit()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.forecast.locations,
    id: state.auth.currentUser.id,
    fetchLocationLoading: state.forecast.fetchLocationLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditLocations));
