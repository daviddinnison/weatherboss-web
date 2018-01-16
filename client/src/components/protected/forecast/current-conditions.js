import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from '../../requires-login';

import {getCurrentForecast} from '../../../actions/forecast';

export class CurrentConditions extends React.Component {
    componentDidMount() {
        const location = 'New York, NY';
        this.props.dispatch(getCurrentForecast(location))
    }

    render() {
        // console.log('CURRENT FORECAST PROPS', this.props.currentForecastData)
        return (
            <div>
                <h3>current conditions</h3>
                <p>current temp</p>
                <p>high</p>
                <p>low</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations,
        currentForecastData: state.forecast.currentForecastData,
        test: state.forecast.test
    };
};

export default requiresLogin()(connect(mapStateToProps)(CurrentConditions));