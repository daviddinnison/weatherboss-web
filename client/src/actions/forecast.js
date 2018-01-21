const API_KEY = "b20a7be72cb0b77a";

export const GET_CURRENT_FORECAST_REQUEST = "GET_CURRENT_FORECAST_REQUEST";
export const getCurrentForecastRequest = () => ({
  type: GET_CURRENT_FORECAST_REQUEST
});

export const GET_CURRENT_FORECAST_SUCCESS = "GET_CURRENT_FORECAST_SUCCESS";
export const getCurrentForecastSuccess = data => ({
  type: GET_CURRENT_FORECAST_SUCCESS,
  data
});

export const GET_CURRENT_FORECAST_ERROR = "GET_CURRENT_FORECAST_ERROR";
export const getCurrentForecastError = message => ({
  type: GET_CURRENT_FORECAST_ERROR,
  message
});

export const getCurrentForecast = userInput => dispatch => {
  dispatch(getCurrentForecastRequest());
  fetch(
    `http://api.wunderground.com/api/${API_KEY}/conditions/q/${userInput}.json`,
    {}
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(getCurrentForecastSuccess(data.current_observation));
    })
    .catch(err => {
      dispatch(getCurrentForecastError(err));
    });
};

export const GET_EXTENDED_FORECAST_REQUEST = "GET_EXTENDED_FORECAST_REQUEST";
export const getExtendedForecastRequest = () => ({
  type: GET_EXTENDED_FORECAST_REQUEST
});

export const GET_EXTENDED_FORECAST_SUCCESS = "GET_EXTENDED_FORECAST_SUCCESS";
export const getExtendedForecastSuccess = data => ({
  type: GET_EXTENDED_FORECAST_SUCCESS,
  data
});

export const GET_EXTENDED_FORECAST_ERROR = "GET_EXTENDED_FORECAST_ERROR";
export const getExtendedForecastError = message => ({
  type: GET_EXTENDED_FORECAST_ERROR,
  message
});

export const getExtendedForecast = userInput => dispatch => {
  dispatch(getExtendedForecastRequest());
  fetch(
    `http://api.wunderground.com/api/${API_KEY}/forecast10day/q/${userInput}.json`,
    {}
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
        // Actions.error();
      }
      return res.json();
    })
    .then(data => {
      dispatch(getExtendedForecastSuccess(data.forecast.simpleforecast));
    })

    .catch(err => {
      dispatch(getExtendedForecastError(err));
    });
};

export const GET_ALERT_REQUEST = "GET_ALERT_REQUEST";
export const getAlertRequest = () => ({
  type: GET_ALERT_REQUEST
});

export const GET_ALERT_SUCCESS = "GET_ALERT_SUCCESS";
export const getAlertSuccess = data => ({
  type: GET_ALERT_SUCCESS,
  data
});

export const GET_ALERT_ERROR = "GET_ALERT_ERROR";
export const getAlertError = message => ({
  type: GET_ALERT_ERROR,
  message
});

export const getAlert = userInput => dispatch => {
  dispatch(getAlertRequest());
  fetch(
    `http://api.wunderground.com/api/${API_KEY}/alerts/q/${userInput}.json`,
    {}
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(getAlertSuccess(data.alerts));
    })

    .catch(err => {
      dispatch(getAlertError(err));
    });
};
