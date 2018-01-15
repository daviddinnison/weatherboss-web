const API_KEY = "b20a7be72cb0b77a";


export const GET_CURRENT_FORECAST_REQUEST = 'GET_CURRENT_FORECAST_REQUEST';
export const getCurrentForecastRequest = () => ({
    type: GET_CURRENT_FORECAST_REQUEST,
});

export const GET_CURRENT_FORECAST_SUCCESS = 'GET_CURRENT_FORECAST_SUCCESS';
export const getCurrentForecastSuccess = data => ({
    type: GET_CURRENT_FORECAST_SUCCESS,
    data
});

export const GET_CURRENT_FORECAST_ERROR = 'GET_CURRENT_FORECAST_ERROR';
export const getCurrentForecastError = message => ({
    type: GET_CURRENT_FORECAST_ERROR,
    message
});

export const getCurrentForecast = (userInput) => dispatch => {
    dispatch(getCurrentForecastRequest());
    fetch(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${userInput}.json`, {})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data, 'CURRENT FORCAST DATA')
            dispatch(getCurrentForecastSuccess(data.current_observation));
        })
        .catch(err => {
            dispatch(getCurrentForecastError(err));
        });
}


export const GET_EXTENDED_FORECAST_REQUEST = 'GET_EXTENDED_FORECAST_REQUEST';
export const getExtendedForecastRequest = () => ({
    type: GET_EXTENDED_FORECAST_REQUEST,
});

export const GET_EXTENDED_FORECAST_SUCCESS = 'GET_EXTENDED_FORECAST_SUCCESS';
export const getExtendedForecastSuccess = data => ({
    type: GET_EXTENDED_FORECAST_SUCCESS,
    data
});

export const GET_EXTENDED_FORECAST_ERROR = 'GET_EXTENDED_FORECAST_ERROR';
export const getExtendedForecastError = message => ({
    type: GET_EXTENDED_FORECAST_ERROR,
    message
});

export const getExtendedForecast = (userInput) => dispatch => {
    dispatch(getExtendedForecastRequest());
    fetch(`http://api.wunderground.com/api/${API_KEY}/forecast10day/q/${userInput}.json`, {})
        .then(res => {
            console.log('INSIDE FIRST .THEN. this is the response:::', res)
            if (!res.ok) {
                throw new Error(res.statusText);
                // Actions.error();
            }
            return res.json();
        })
        .then(data => {
            console.log(data, 'data received from server-----')
            dispatch(getExtendedForecastSuccess(data.forecast.simpleforecast));
        })

        .catch(err => {
            console.log(err, '------error from server')
            dispatch(getExtendedForecastError(err));
        });
}