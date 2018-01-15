import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from '../requires-login';
import BackButton from '../reusable/back-button';


export class Forecast extends React.Component {
    render() {
        return (
            <div>
                <BackButton/>
                <h2>THIS IS THE FORECAST PAGE!!!!!</h2>
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

export default requiresLogin()(connect(mapStateToProps)(Forecast));