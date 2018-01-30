/*eslint-disable */
import {
  GET_EXTENDED_FORECAST_REQUEST,
  GET_EXTENDED_FORECAST_SUCCESS,
  GET_EXTENDED_FORECAST_ERROR,
  GET_ALERT_REQUEST,
  GET_ALERT_SUCCESS,
  GET_ALERT_ERROR,
  CLEAR_VALIDATE_LOCATION_ERROR,
  VALIDATE_LOCATION_REQUEST,
  VALIDATE_LOCATION_SUCCESS,
  VALIDATE_LOCATION_ERROR
} from "../actions/forecast";

import {
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR,
  GET_METRIC_REQUEST,
  GET_METRIC_SUCCESS,
  GET_METRIC_ERROR,
  EDIT_METRIC_REQUEST,
  EDIT_METRIC_SUCCESS,
  EDIT_METRIC_ERROR
} from "../actions/users";
/*eslint-enable */

const initialState = {
  alert: [{}],
  alertLoading: false,
  extendedForecastData: {
    forecastday: [{ date: {}, high: {}, low: {}, qpf_allday: {}, avewind: {} }]
  },
  extendedLoading: false,
  fetchLocationLoading: false,
  hourlyLoading: false,
  hourlyForecastData: [{ FCTTIME: {}, feelslike: {}, temp: {}, qpf: {}, wdir:{}, wspd: {}, dewpoint: {}, mslp: {} }],
  locations: [],
  locationError: null,
  metric: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_HOURLY_FORECAST_REQUEST": {
      return Object.assign({}, state, {
        hourlyLoading: true
      });
    }
    case "GET_HOURLY_FORECAST_SUCCESS": {
      return Object.assign({}, state, {
        hourlyForecastData: action.data,
        hourlyLoading: false
      });
    }
    case "GET_HOURLY_FORECAST_ERROR": {
      return Object.assign({}, state, {
        message: action.message,
        hourlyLoading: false
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
    case "DELETE_LOCATION_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "DELETE_LOCATION_SUCCESS": {
      return Object.assign({}, state, {
        locations: action.locations.locations,
        loading: false
      });
    }
    case "DELETE_LOCATION_ERROR": {
      return Object.assign({}, state, {
        loading: false,
        message: action.message
      });
    }
    case "GET_METRIC_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "GET_METRIC_SUCCESS": {
      return Object.assign({}, state, {
        metric: action.data,
        loading: false
      });
    }
    case "GET_METRIC_ERROR": {
      return Object.assign({}, state, {
        loading: false,
        message: action.message
      });
    }
    case "EDIT_METRIC_REQUEST": {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case "EDIT_METRIC_SUCCESS": {
      return Object.assign({}, state, {
        metric: action.data.metric,
        loading: false
      });
    }
    case "EDIT_METRIC_ERROR": {
      return Object.assign({}, state, {
        loading: false,
        message: action.message
      });
    }
    default: return state;
  }
}
