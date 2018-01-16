import {
    GET_CURRENT_FORECAST_REQUEST,
    GET_CURRENT_FORECAST_SUCCESS,
    GET_CURRENT_FORECAST_ERROR,
    GET_EXTENDED_FORECAST_REQUEST,
    GET_EXTENDED_FORECAST_SUCCESS,
    GET_EXTENDED_FORECAST_ERROR
} from '../actions/forecast';

const initialState = {
    currentForecastData: {},
    extendedForecastData: {forecastday: [{date: {},high: {},low: {},}]}
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_CURRENT_FORECAST_REQUEST': {

            return Object.assign({}, state, {
                loading: true
            });
        }
        case 'GET_CURRENT_FORECAST_SUCCESS': {

            return Object.assign({}, state, {
                currentForecastData: action.data,
                loading: false
            });
        }
        case 'GET_CURRENT_FORECAST_ERROR': {
            return Object.assign({}, state, {
                message: action.message,
                loading: false
            });
        }
        case 'GET_EXTENDED_FORECAST_REQUEST': {
            console.log('......extended request.......')
            return Object.assign({}, state, {
                loading: true
            });
        }
        case 'GET_EXTENDED_FORECAST_SUCCESS': {
            console.log('......extended success.......', action)
            return Object.assign({}, state, {
                extendedForecastData: action.data,
                loading: false
            });
        }
        case 'GET_EXTENDED_FORECAST_ERROR': {
            console.log('......extended error.......')
            return Object.assign({}, state, {
                message: action.message,
                loading: false
            });
        }
    }
    return state;

} 