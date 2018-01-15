import React from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import requiresLogin from '../requires-login';
import NewLocationForm from './forms/new-location-form'

export class NewLocationPage extends React.Component {
    render() {
        return (
            <div>
                <Link to="/dashboard">Go back</Link>
                <h2>Add location</h2>
                <NewLocationForm/>
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

export default requiresLogin()(connect(mapStateToProps)(NewLocationPage));