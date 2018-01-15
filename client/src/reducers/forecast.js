import {
    TEST
} from '../actions/forecast';

const initialState = {
    test: 'xXtest_stringXx'
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'TEST': {
            console.log('------you are in the reducer------', action.data)
            return Object.assign({}, state, {
                // authToken: action.authToken
            });
        }
    }
    return state;

} 