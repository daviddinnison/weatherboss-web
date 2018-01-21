import {
  GET_CURRENT_FORECAST_REQUEST,
  GET_CURRENT_FORECAST_SUCCESS,
  GET_CURRENT_FORECAST_ERROR,
  GET_EXTENDED_FORECAST_REQUEST,
  GET_EXTENDED_FORECAST_SUCCESS,
  GET_EXTENDED_FORECAST_ERROR,
  GET_ALERT_REQUEST,
  GET_ALERT_SUCCESS,
  GET_ALERT_ERROR
} from "../actions/forecast";

import {
  CLEAR_VALIDATE_LOCATION_ERROR,
  VALIDATE_LOCATION_REQUEST,
  VALIDATE_LOCATION_SUCCESS,
  VALIDATE_LOCATION_ERROR
} from "../actions/forecast";

const initialState = {
  alert: [{}],
  alertLoading: false,
  currentForecastData: {},
  extendedForecastData: { forecastday: [{ date: {}, high: {}, low: {} }] },
  extendedLoading: false,
  fetchLocationLoading: false,
  locations: [],
  locationError: null,
  test: "THIS IS A TEST"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CURRENT_FORECAST_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "GET_CURRENT_FORECAST_SUCCESS": {
      return Object.assign({}, state, {
        currentForecastData: action.data,
        loading: false
      });
    }
    case "GET_CURRENT_FORECAST_ERROR": {
      return Object.assign({}, state, {
        message: action.message,
        loading: false
      });
    }
    case "GET_EXTENDED_FORECAST_REQUEST": {
      return Object.assign({}, state, {
        extendedLoading: true
      });
    }
    case "GET_EXTENDED_FORECAST_SUCCESS": {
      return Object.assign({}, state, {
        extendedForecastData: action.data,
        extendedLoading: false
      });
    }
    case "GET_EXTENDED_FORECAST_ERROR": {
      return Object.assign({}, state, {
        message: action.message,
        extendedLoading: false
      });
    }
    case "GET_ALERT_REQUEST": {
      return Object.assign({}, state, {
        alertLoading: true
      });
    }
    case "GET_ALERT_SUCCESS": {
      return Object.assign({}, state, {
        alertLoading: false,
        alert: action.data
      });
    }
    case "GET_ALERT_ERROR": {
      return Object.assign({}, state, {
        alertLoading: false,
        message: action.message
      });
    }
    case "CLEAR_VALIDATE_LOCATION_ERROR": {
      return Object.assign({}, state, {
        locationError: null
      });
    }
    case "VALIDATE_LOCATION_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "VALIDATE_LOCATION_SUCCESS": {
      return Object.assign({}, state, {
        loading: false
      });
    }
    case "VALIDATE_LOCATION_ERROR": {
      return Object.assign({}, state, {
        locationError: action.err,
        loading: false
      });
    }
    case "FETCH_LOCATIONS_REQUEST": {
      return Object.assign({}, state, {
        fetchLocationLoading: true
      });
    }

    case "FETCH_LOCATIONS_SUCCESS": {
      return Object.assign({}, state, {
        locations: action.locations,
        fetchLocationLoading: false
      });
    }
    case "FETCH_LOCATIONS_ERROR": {
      return Object.assign({}, state, {
        error: action.message,
        fetchLocationLoading: false
      });
    }
  }
  return state;
}
