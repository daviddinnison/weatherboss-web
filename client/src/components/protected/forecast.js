import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from '../requires-login';
import BackButton from '../reusable/back-button';
import {getExtendedForecast} from '../../actions/forecast';

export class Forecast extends React.Component {
    componentDidMount() {
        const location = this.props.location.pathname.replace('/forecast/','');
        this.props.dispatch(getExtendedForecast(location))
    }

    render() {
        
        const location = this.props.location.pathname.replace('/forecast/','');
        return (
            <div>
                <BackButton/>
                <h2>THIS IS THE FORECAST PAGE for {location}!!!!!</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations,
        test: state.forecast.test
    };
};

export default requiresLogin()(connect(mapStateToProps)(Forecast));