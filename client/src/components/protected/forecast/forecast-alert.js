import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../../requires-login';
import { Link } from 'react-router-dom';

import { getAlert } from '../../../actions/forecast';

import './styles/forecast-alert.css';


export class ForecastAlert extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAlert(this.props.name))
    }

    renderAlert() {
        console.log('--------props---------PROPS-----', this.props.alert)
        if (this.props.alert.length > 0) {
            const alerts = this.props.alert.map((item, index) =>
                <li key={index}>
                    <p>{item.description}</p>
                    <p>{item.message}</p>
                </li>
            );
            return (
                <div>
                    <ul>
                        {alerts}
                    </ul>
                </div>
            );
        } else {
            return (<li>no alerts.</li>)
        }
    }
    render() {

        return (
            <div className="alert-container">
                {this.renderAlert()}
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
        alert: state.forecast.alert
    };
};

export default requiresLogin()(connect(mapStateToProps)(ForecastAlert));