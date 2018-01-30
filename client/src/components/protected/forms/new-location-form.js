import React from "react";
import { connect } from "react-redux";
import Loader from "halogen/ClipLoader";

import requiresLogin from "../../requires-login";

import {
  validateLocation,
  clearValidateLocationError
} from "../../../actions/users";

import "./styles/new-location-form.css";

export class NewLocationForm extends React.Component {
  componentDidMount() {
    //clears any existing errors
    this.props.dispatch(clearValidateLocationError());
  }

  submitForm(event) {
    event.preventDefault();
    const input = this.userInput.value;

    this.props.dispatch(validateLocation(this.props.id, input));
  }

  render() {
    const placeholders = [
      "Washington DC",
      "San Diego, CA",
      "London, England",
      "Auckland, NZ",
      "Seoul, Korea",
      "Cairo, Egypt",
      "Dallas, TX",
      "New York, NY",
      "Orlando, FL",
      "Berlin, Germany",
      "Lima, Peru",
      "Dubai, UAE",
      "Chicago, IL",
      "Moscow, Russia",
      "Boston, MA",
      "Asheville, NC",
      "Lagos, Nigeria",
      "Oaxaca, Mexico",
      "Paris, France",
      "Melbourne, Australia",
      "Kyoto, Japan",
      "Charleston, SC",
      "Salt Lake City, UT",
      "Seattle, WA"
    ];
    const randomItem =
      placeholders[Math.floor(Math.random() * placeholders.length)];
    return (
      <form
        className="location-form"
        onSubmit={event => this.submitForm(event)}
      >
        <input
          type="text"
          name="location-input"
          className="location-input"
          required
          placeholder={randomItem}
          id="userInput"
          ref={input => (this.userInput = input)}
        />
        <button type="submit" className="location-submit">
          Submit
        </button>
        <p>{this.props.locationError}</p>
        {this.props.addLocationLoading ? (
          <div className="location-loader">
            <Loader color="#5a5a5a" size="50px" margin="4px" />
          </div>
        ) : (
          ""
        )}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    locationError: state.forecast.locationError,
    addLocationLoading: state.protectedData.addLocationLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(NewLocationForm));
