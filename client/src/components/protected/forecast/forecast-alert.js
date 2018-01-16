import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../../requires-login';
import { Link } from 'react-router-dom';

import { getCurrentForecast } from '../../../actions/forecast';



export class ForecastAlert extends React.Component {
    componentDidMount() {
        // this.props.dispatch(getAlerts(this.props.name))
    }
    renderAlert() {
        const location = this.props.name;
        alert(location)
    }

    render() {

        return (
            <div className="alert">
                {this.renderAlert()}
                <p>this would also be the alert for {this.props.name}</p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations,
        currentForecastData: state.forecast.currentForecastData
    };
};

export default requiresLogin()(connect(mapStateToProps)(ForecastAlert));