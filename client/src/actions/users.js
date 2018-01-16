import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

const API_KEY = "b20a7be72cb0b77a";


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

export const ADD_LOCATION_REQUEST = 'ADD_LOCATION_REQUEST';
export const addLocationRequest = () => ({
    type: ADD_LOCATION_REQUEST
});

export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const addLocationSuccess = locations => ({
    type: ADD_LOCATION_SUCCESS,
});

export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';
export const addLocationError = message => ({
    type: ADD_LOCATION_ERROR,
    message
});


export const validateLocation = (id, userInput) => dispatch => {
    console.log('ID', id)
    console.log('input', userInput);
    // dispatch(getCurrentForecastRequest());
    fetch(`http://api.wunderground.com/api/${API_KEY}/geolookup/q/${userInput}.json`, {})
        .then(res => {
            console.log('res......', res)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log('data......', data)
            if (data.response.error) {
                console.log('this is the data error response', data.response.error.description)
                throw new Error(data.response.error.description);
            } else {
                console.log('THIS DATA IS VALID and ready to be sent to addLocation', data)

                //if the input isnt specific and returns multiple results we ask the user to be more specific
                if (data.response.results) {
                    throw new Error('Please include a state or country name in search');
                }

                let formattedLocation;
                //this formats the location if it is in the us
                if (data.location.type === "CITY") {
                    formattedLocation = `${data.location.city}, ${data.location.state}`;
                    console.log('THIS LOCATION IS IN THE USA.formatted is looks like: ', formattedLocation)
                }
                //this formats the location if it is outside the us
                else if (data.location.type === "INTLCITY") {
                    formattedLocation = `${data.location.city}, ${data.location.country_name}`;
                    console.log('THIS LOCATION IS OUTSIDE THE US.formatted is looks like: ', formattedLocation)
                }
                //any other situations throws an error
                else {
                    console.log('DIFFERENT TYPE?', data.location.type)
                    throw new Error('This location is not valid');
                }
                console.log(formattedLocation, 'THIS WILL BE SENT')
            }

        })
        .catch(err => {

            console.log('error.....', err);
        });
}




//addlocations
export const addLocation = (id, input) => dispatch => {
    dispatch(addLocationRequest());
    const formattedInput = { 'name': input };
    //if location is not valid, break and pass error to catch

    console.log('INPUT INSIDE addLocation', formattedInput)
    fetch(`${API_BASE_URL}/users/newlocation/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedInput),
        method: 'POST',
    })
        .then(res => {
            console.log('THE RES', res)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(locations => {
            console.log('LOCATIONS RETURNED SUCCESSFULLY', locations)
            dispatch(addLocationSuccess());
        })
        .catch(err => {
            console.log('final catch error')
            dispatch(addLocationError(err));
        });
};