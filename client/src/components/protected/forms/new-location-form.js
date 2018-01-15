import React from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import requiresLogin from '../../requires-login';

export class NewLocationForm extends React.Component {
    render() {
        return (
            <div>
                <p>WELCOME TO THE NEW LOCATION FORM!!!!</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations
    };
};

export default requiresLogin()(connect(mapStateToProps)(NewLocationForm));