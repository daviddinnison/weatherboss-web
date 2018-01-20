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
  currentForecastData: {},
  extendedForecastData: { forecastday: [{ date: {}, high: {}, low: {} }] },
  alert: [{}],
  locationError: null
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
        loading: true
      });
    }
    case "GET_EXTENDED_FORECAST_SUCCESS": {
      return Object.assign({}, state, {
        extendedForecastData: action.data,
        loading: false
      });
    }
    case "GET_EXTENDED_FORECAST_ERROR": {
      return Object.assign({}, state, {
        message: action.message,
        loading: false
      });
    }
    case "GET_ALERT_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "GET_ALERT_SUCCESS": {
      console.log(action, "action in reducer");
      return Object.assign({}, state, {
        alert: action.data,
        loading: false
      });
    }
    case "GET_ALERT_ERROR": {
      return Object.assign({}, state, {
        message: action.message,
        loading: false
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
  }
  return state;
}
