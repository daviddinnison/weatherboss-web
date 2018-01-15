import {
    GET_EXTENDED_FORECAST_REQUEST,
    GET_EXTENDED_FORECAST_SUCCESS,
    GET_EXTENDED_FORECAST_ERROR
} from '../actions/forecast';

const initialState = {
    extendedForecastData: {}
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_EXTENDED_FORECAST_REQUEST': {
            console.log('------request in reducer------')
            return Object.assign({}, state, {
                loading: true
            });
        }
        case 'GET_EXTENDED_FORECAST_SUCCESS': {
            console.log('------success in reducer------', action.data)
            return Object.assign({}, state, {
                extendedForecastData: action.data,
                loading: false
            });
        }
        case 'GET_EXTENDED_FORECAST_ERROR': {
            console.log('------error in reducer------', action.message)
            return Object.assign({}, state, {
                message: action.message,
                loading: false
            });
        }
    }
    return state;

} 