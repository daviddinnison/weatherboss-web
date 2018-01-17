import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../../requires-login';
import { Link } from 'react-router-dom';

import { getCurrentForecast } from '../../../actions/forecast';

import './styles/rendered-location.css';


export class RenderedLocation extends React.Component {
    componentDidMount() {
        this.props.dispatch(getCurrentForecast(this.props.name))
    }

    render() {

        return (
            <div className="rendered-location">
                <Link to={`/forecast/${this.props.name}`}>
                    <h1 className="rendered-location-name">{this.props.name}</h1>
                    <p>{this.props.currentForecastData.weather}</p>
                </Link>
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

export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));