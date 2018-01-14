import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

import {FETCH_LOCATIONS_SUCCESS} from '../actions/users';
const initialState = {
    data: '',
    error: null,
    locations: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PROTECTED_DATA_SUCCESS': {
            console.log(action, 'RESPONSE IN REDUCER')
            return Object.assign({}, state, {
                data: action.data,
                error: null
            });
        }
        case 'FETCH_PROTECTED_DATA_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'FETCH_LOCATIONS_SUCCESS': {
            return Object.assign({}, state, {
                locations: action.locations
            });
        }
    }
    
    return state;
};