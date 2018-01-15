const API_KEY = "b20a7be72cb0b77a";

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