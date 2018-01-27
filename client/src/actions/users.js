import { SubmissionError } from "redux-form";

import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

const API_KEY = "b20a7be72cb0b77a";

export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const CLEAR_VALIDATE_LOCATION_ERROR = "CLEAR_VALIDATE_LOCATION_ERROR";
export const clearValidateLocationError = () => ({
  type: CLEAR_VALIDATE_LOCATION_ERROR
});

export const VALIDATE_LOCATION_REQUEST = "VALIDATE_LOCATION_REQUEST";
export const validateLocationRequest = () => ({
  type: VALIDATE_LOCATION_REQUEST
});

export const VALIDATE_LOCATION_SUCCESS = "VALIDATE_LOCATION_SUCCESS";
export const validateLocationSuccess = locations => ({
  type: VALIDATE_LOCATION_SUCCESS
});

export const VALIDATE_LOCATION_ERROR = "VALIDATE_LOCATION_ERROR";
export const validateLocationError = err => ({
  type: VALIDATE_LOCATION_ERROR,
  err
});

export const validateLocation = (id, userInput) => dispatch => {
  fetch(
    `http://api.wunderground.com/api/${API_KEY}/geolookup/q/${userInput}.json`,
    {}
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      if (data.response.error) {
        const err = data.response.error.description;
        dispatch(validateLocationError(err));
        throw new Error(err);
      } else {
        //if the input isnt specific and returns multiple results we ask the user to be more specific
        if (data.response.results) {
          const err = "Please include a state or country name in search";
          dispatch(validateLocationError(err));
        }

        let formattedLocation;
        //this formats the location if it is in the us
        if (data.location.type === "CITY") {
          formattedLocation = `${data.location.city}, ${data.location.state}`;
        } else if (data.location.type === "INTLCITY") {
          //this formats the location if it is outside the us
          formattedLocation = `${data.location.city}, ${
            data.location.country_name
          }`;
        } else {
          //any other situations throws an error
          const err =
            "This location is invalid. Please enter a city/US state or city/country.";
          dispatch(validateLocationError(err));
        }
        dispatch(addLocation(id, formattedLocation));
      }
    })
    .catch(err => {
      const message =
        "This location is invalid. Please enter a city/state or city/country.";
      dispatch(validateLocationError(message));
    });
};

export const ADD_LOCATION_REQUEST = "ADD_LOCATION_REQUEST";
export const addLocationRequest = () => ({
  type: ADD_LOCATION_REQUEST
});

export const ADD_LOCATION_SUCCESS = "ADD_LOCATION_SUCCESS";
export const addLocationSuccess = locations => ({
  type: ADD_LOCATION_SUCCESS
});

export const ADD_LOCATION_ERROR = "ADD_LOCATION_ERROR";
export const addLocationError = message => ({
  type: ADD_LOCATION_ERROR,
  message
});

//addlocations
export const addLocation = (id, input) => dispatch => {
  dispatch(addLocationRequest());
  const formattedInput = { name: input };
  fetch(`${API_BASE_URL}/users/newlocation/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formattedInput),
    method: "POST"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(locations => {
      dispatch(addLocationSuccess());
    })
    .catch(err => {
      dispatch(addLocationError(err));
    });
};

export const DELETE_LOCATION_REQUEST = "DELETE_LOCATION_REQUEST";
export const deleteLocationRequest = () => ({
  type: DELETE_LOCATION_REQUEST
});

export const DELETE_LOCATION_SUCCESS = "DELETE_LOCATION_SUCCESS";
export const deleteLocationSuccess = locations => ({
  type: DELETE_LOCATION_SUCCESS,
  locations
});

export const DELETE_LOCATION_ERROR = "DELETE_LOCATION_ERROR";
export const deleteLocationError = message => ({
  type: DELETE_LOCATION_ERROR,
  message
});

export const deleteLocation = (id, locationId) => dispatch => {
  dispatch(deleteLocationRequest());
  const formattedLocationId = { locationId: locationId };
  fetch(`${API_BASE_URL}/users/deletelocation/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formattedLocationId),
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(deleteLocationSuccess(data));
    })
    .catch(err => {
      dispatch(deleteLocationError(err));
    });
};

export const GET_METRIC_REQUEST = "GET_METRIC_REQUEST";
export const getMetricRequest = () => ({
  type: GET_METRIC_REQUEST
});

export const GET_METRIC_SUCCESS = "GET_METRIC_SUCCESS";
export const getMetricSuccess = data => ({
  type: GET_METRIC_SUCCESS,
  data
});

export const GET_METRIC_ERROR = "GET_METRIC_ERROR";
export const getMetricError = message => ({
  type: GET_METRIC_ERROR,
  message
});

export const getMetricData = (id) => dispatch => {
  dispatch(getMetricRequest());
  fetch(`${API_BASE_URL}/users/metric/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(getMetricSuccess(data));
    })
    .catch(err => {
      console.log(err)
      dispatch(getMetricError(err));
    });
};


export const EDIT_METRIC_REQUEST = "EDIT_METRIC_REQUEST";
export const editMetricRequest = () => ({
  type: EDIT_METRIC_REQUEST
});

export const EDIT_METRIC_SUCCESS = "EDIT_METRIC_SUCCESS";
export const editMetricSuccess = data => ({
  type: EDIT_METRIC_SUCCESS,
  data
});

export const EDIT_METRIC_ERROR = "EDIT_METRIC_ERROR";
export const editMetricError = message => ({
  type: EDIT_METRIC_ERROR,
  message
});


export const editMetricData = (id, metricInput) => dispatch => {
  // dispatch(editMetricRequest());
  const formattedRequest = {
    metric: metricInput
  }
  fetch(`${API_BASE_URL}/users/metric/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formattedRequest),
    method: "PUT"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(editMetricSuccess(data));
    })
    .catch(err => {
      dispatch(editMetricError(err));
    });
};
