import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

import {
    FETCH_LOCATIONS_REQUEST,
    FETCH_LOCATIONS_SUCCESS,
    FETCH_LOCATIONS_ERROR,
    ADD_LOCATION_REQUEST,
    ADD_LOCATION_SUCCESS,
    ADD_LOCATION_ERROR
} from '../actions/users';
const initialState = {
    data: '',
    error: null,
    redirect: false,
    locations: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PROTECTED_DATA_SUCCESS': {
            return Object.assign({}, state, {
                data: action.data,
                error: null
            });
        }
        case 'FETCH_PROTECTED_DATA_ERROR': {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case 'FETCH_LOCATIONS_REQUEST': {
            return Object.assign({}, state, {
                loading: true
            });
        }
        
        case 'FETCH_LOCATIONS_SUCCESS': {
            return Object.assign({}, state, {
                locations: action.locations,
                loading: false
            });
        }
        case 'FETCH_LOCATIONS_ERROR': {
            return Object.assign({}, state, {
                error: action.message,
                loading: false
            });
        }
        case 'ADD_LOCATION_REQUEST': {
            return Object.assign({}, state, {
                loading: true
            });
        }
        
        case 'ADD_LOCATION_SUCCESS': {
            return Object.assign({}, state, {
                redirect: true,
                loading: false
            });
        }
        case 'ADD_LOCATION_ERROR': {
            return Object.assign({}, state, {
                error: action.message,
                loading: false
            });
        }
        case 'CLEAR_REDIRECT': {
            return Object.assign({}, state, {
                redirect: false
            });
        }
    }
    
    return state;
};