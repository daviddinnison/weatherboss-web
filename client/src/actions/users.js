import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const fetchLocationsRequest = () => ({
    type: FETCH_LOCATIONS_REQUEST
});

export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const fetchLocationsSuccess = locations => ({
    type: FETCH_LOCATIONS_SUCCESS,
    locations
}); 

export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';
export const fetchLocationsError = message => ({
    type: FETCH_LOCATIONS_ERROR,
    message
});


export const fetchLocations = (id) => dispatch => {
    dispatch(fetchLocationsRequest());
    fetch(`${API_BASE_URL}/users/locations/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(locations => {

            dispatch(fetchLocationsSuccess(locations));
        })
        .catch(err => {
            dispatch(fetchLocationsError(err));
        });
};

