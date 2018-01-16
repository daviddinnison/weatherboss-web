import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from '../../requires-login';
import BackButton from '../../reusable/back-button';
import {getExtendedForecast} from '../../../actions/forecast';

export class ExtendedForecast extends React.Component {
    componentDidMount() {
        const location = 'New York, NY';
        this.props.dispatch(getExtendedForecast(location))
    }

    render() {

        return (
            <div>
                <h3>EXTENDED FORECAST</h3>
                <p>this will contain really cool extended forecast data. </p>
                <p>plz make yourself at home while david makes this.</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations,
        extendedForecastData: state.forecast.extendedForecastData
    };
};

export default requiresLogin()(connect(mapStateToProps)(ExtendedForecast));